import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { brasiliaDate, questionById, questionsForChallenge, withoutAnswers, QUESTION_COUNT } from '@/lib/desafio-biblico/engine';
import { CHALLENGE_CATEGORIES, isChallengeCategory } from '@/lib/desafio-biblico/types';
import type { ChallengeCategory, ChallengeDifficulty, ChallengeMode } from '@/lib/desafio-biblico/types';

const difficulties: ChallengeDifficulty[] = ['facil', 'intermediario', 'avancado'];
const modes: ChallengeMode[] = ['rapido', 'completo'];
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const sessionIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type AdminClient = ReturnType<typeof createSupabaseAdminClient>;

interface ChallengeSession {
  id: string;
  user_id: string | null;
  challenge_id: string;
  mode: ChallengeMode;
  difficulty: ChallengeDifficulty;
  categories: ChallengeCategory[];
  question_ids: string[];
  is_daily: boolean;
  expires_at: string;
  completed_at: string | null;
}

interface SessionAnswer {
  session_id: string;
  question_id: string;
  selected_index: number;
  answered_at: string;
}

function parseCategories(value: unknown): ChallengeCategory[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.length > CHALLENGE_CATEGORIES.length || !value.every(isChallengeCategory)) return null;
  const categories = value as ChallengeCategory[];
  return new Set(categories).size === categories.length ? categories : null;
}

function hasPublicSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
  );
}

function getAdminClient(): AdminClient | null {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createSupabaseAdminClient();
}

async function getValidatedUserId(): Promise<{ userId: string | null; failed: boolean }> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) return { userId: null, failed: true };
    return { userId: data.user?.id ?? null, failed: false };
  } catch {
    return { userId: null, failed: true };
  }
}

function feedbackFor(questionId: string, selectedIndex: number) {
  const question = questionById(questionId);
  if (!question) return null;
  return {
    correct: selectedIndex === question.correctIndex,
    correctIndex: question.correctIndex,
    explanation: question.explanation,
    reference: question.reference,
  };
}

async function fetchSession(admin: AdminClient, sessionId: string) {
  return admin
    .from('bible_challenge_sessions')
    .select('id, user_id, challenge_id, mode, difficulty, categories, question_ids, is_daily, expires_at, completed_at')
    .eq('id', sessionId)
    .maybeSingle();
}

async function fetchSessionAnswers(admin: AdminClient, sessionId: string) {
  return admin
    .from('bible_challenge_session_answers')
    .select('session_id, question_id, selected_index, answered_at')
    .eq('session_id', sessionId)
    .order('answered_at', { ascending: true });
}

function sessionAccessError(session: ChallengeSession, userId: string | null) {
  if (session.user_id !== userId) {
    return NextResponse.json({ error: 'Esta sessão pertence a outro usuário ou navegador.' }, { status: 403 });
  }
  if (new Date(session.expires_at).getTime() <= Date.now()) {
    return NextResponse.json({ error: 'Esta sessão expirou. Inicie um novo desafio.' }, { status: 409 });
  }
  if (session.is_daily && session.challenge_id !== `daily:${brasiliaDate()}`) {
    return NextResponse.json({ error: 'O desafio diário expirou no horário de Brasília.' }, { status: 409 });
  }
  return null;
}

function scoredSessionAnswers(session: ChallengeSession, rows: SessionAnswer[]) {
  const answersByQuestion = new Map(rows.map((row) => [row.question_id, row]));
  return session.question_ids.map((questionId) => {
    const row = answersByQuestion.get(questionId);
    const question = questionById(questionId);
    if (!row || !question || question.difficulty !== session.difficulty) return null;
    return {
      questionId,
      selectedIndex: row.selected_index,
      correctIndex: question.correctIndex,
      correct: row.selected_index === question.correctIndex,
      explanation: question.explanation,
      reference: question.reference,
    };
  });
}

async function challengeResponse(admin: AdminClient, session: ChallengeSession) {
  const questions = session.question_ids.map(questionById);
  if (questions.some((question) => !question || question.difficulty !== session.difficulty)) {
    return NextResponse.json({ error: 'A sessão contém perguntas inválidas.' }, { status: 500 });
  }

  const { data: rows, error } = await fetchSessionAnswers(admin, session.id);
  if (error) {
    console.error('Erro ao recuperar respostas do desafio:', error.message);
    return NextResponse.json({ error: 'Não foi possível recuperar o desafio.' }, { status: 503 });
  }
  const answered = (rows ?? []).flatMap((row: SessionAnswer) => {
    const feedback = feedbackFor(row.question_id, row.selected_index);
    return feedback ? [{ questionId: row.question_id, selectedIndex: row.selected_index, feedback }] : [];
  });

  return NextResponse.json({
    sessionId: session.id,
    challengeId: session.challenge_id,
    date: session.is_daily ? session.challenge_id.slice('daily:'.length) : null,
    daily: session.is_daily,
    mode: session.mode,
    difficulty: session.difficulty,
    categories: session.categories,
    requestedCount: QUESTION_COUNT[session.mode],
    questions: withoutAnswers(questions as NonNullable<typeof questions[number]>[]),
    answers: answered,
  });
}

async function startChallenge(body: Record<string, unknown>) {
  const mode = modes.find((item) => item === body.mode);
  const difficulty = difficulties.find((item) => item === body.difficulty);
  const categories = parseCategories(body.categories);
  const daily = body.daily;
  if (!mode || !difficulty || !categories || typeof daily !== 'boolean' || (daily && categories.length > 0)) {
    return NextResponse.json({ error: 'Nível, formato, categorias ou tipo de desafio inválidos.' }, { status: 400 });
  }
  if (!hasPublicSupabaseConfig()) {
    return NextResponse.json({ error: 'O serviço de desafios ainda não está configurado.' }, { status: 503 });
  }

  const admin = getAdminClient();
  if (!admin) {
    return NextResponse.json({ error: 'O serviço seguro de desafios ainda não está configurado.' }, { status: 503 });
  }

  const { userId, failed } = await getValidatedUserId();
  if (failed) return NextResponse.json({ error: 'Não foi possível validar a sessão do usuário.' }, { status: 503 });

  const date = daily ? brasiliaDate() : null;
  const challengeId = date ? `daily:${date}` : '';
  const now = new Date();

  if (date && userId) {
    const { data: completedAttempt, error: attemptError } = await admin
      .from('bible_challenge_attempts')
      .select('id')
      .eq('user_id', userId)
      .eq('challenge_id', challengeId)
      .maybeSingle();
    if (attemptError) {
      console.error('Erro ao verificar o desafio diário:', attemptError.message);
      return NextResponse.json({ error: 'Não foi possível verificar o desafio diário.' }, { status: 503 });
    }
    if (completedAttempt) {
      return NextResponse.json({ error: 'Este desafio diário já foi concluído nesta conta.', duplicate: true }, { status: 409 });
    }

    const { data: activeSession, error: sessionError } = await admin
      .from('bible_challenge_sessions')
      .select('id, user_id, challenge_id, mode, difficulty, categories, question_ids, is_daily, expires_at, completed_at')
      .eq('user_id', userId)
      .eq('challenge_id', challengeId)
      .eq('is_daily', true)
      .is('completed_at', null)
      .gt('expires_at', now.toISOString())
      .order('expires_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (sessionError) {
      console.error('Erro ao recuperar a sessão diária:', sessionError.message);
      return NextResponse.json({ error: 'Não foi possível recuperar o desafio diário.' }, { status: 503 });
    }
    if (activeSession) return challengeResponse(admin, activeSession as ChallengeSession);
  }

  const questions = questionsForChallenge(difficulty, mode, date ?? undefined, categories);
  if (!questions.length) return NextResponse.json({ error: 'Não há perguntas disponíveis para essa seleção.' }, { status: 400 });

  const sessionId = crypto.randomUUID();
  const issuedChallengeId = date ? `daily:${date}` : `practice:${sessionId}`;
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

  const { error: cleanupError } = await admin
    .from('bible_challenge_sessions')
    .delete()
    .lt('expires_at', now.toISOString());
  if (cleanupError) console.error('Limpeza de sessões expiradas falhou:', cleanupError.message);

  const { error: insertError } = await admin.from('bible_challenge_sessions').insert({
    id: sessionId,
    user_id: userId,
    challenge_id: issuedChallengeId,
    mode,
    difficulty,
    categories,
    question_ids: questions.map((question) => question.id),
    is_daily: daily,
    expires_at: expiresAt,
  });

  if (insertError?.code === '23505' && daily && userId) {
    const { data: activeSession, error: sessionError } = await admin
      .from('bible_challenge_sessions')
      .select('id, user_id, challenge_id, mode, difficulty, categories, question_ids, is_daily, expires_at, completed_at')
      .eq('user_id', userId)
      .eq('challenge_id', issuedChallengeId)
      .eq('is_daily', true)
      .is('completed_at', null)
      .gt('expires_at', now.toISOString())
      .limit(1)
      .maybeSingle();
    if (!sessionError && activeSession) return challengeResponse(admin, activeSession as ChallengeSession);
  }
  if (insertError) {
    console.error('Erro ao criar sessão do desafio:', insertError.message);
    return NextResponse.json({ error: 'Não foi possível iniciar o desafio. Tente novamente.' }, { status: 503 });
  }

  const session: ChallengeSession = {
    id: sessionId,
    user_id: userId,
    challenge_id: issuedChallengeId,
    mode,
    difficulty,
    categories,
    question_ids: questions.map((question) => question.id),
    is_daily: daily,
    expires_at: expiresAt,
    completed_at: null,
  };
  return challengeResponse(admin, session);
}

async function answerQuestion(body: Record<string, unknown>) {
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
  const questionId = typeof body.questionId === 'string' ? body.questionId : '';
  const selectedIndex = body.selectedIndex;
  if (!sessionIdPattern.test(sessionId) || !questionId || !Number.isInteger(selectedIndex) || Number(selectedIndex) < 0 || Number(selectedIndex) > 3) {
    return NextResponse.json({ error: 'Resposta inválida.' }, { status: 400 });
  }
  if (!hasPublicSupabaseConfig()) return NextResponse.json({ error: 'O serviço de desafios ainda não está configurado.' }, { status: 503 });
  const admin = getAdminClient();
  if (!admin) return NextResponse.json({ error: 'O serviço seguro de desafios ainda não está configurado.' }, { status: 503 });

  const { userId, failed } = await getValidatedUserId();
  if (failed) return NextResponse.json({ error: 'Não foi possível validar a sessão do usuário.' }, { status: 503 });
  const { data, error } = await fetchSession(admin, sessionId);
  if (error) {
    console.error('Erro ao consultar sessão do desafio:', error.message);
    return NextResponse.json({ error: 'Não foi possível validar o desafio.' }, { status: 503 });
  }
  if (!data) return NextResponse.json({ error: 'Desafio não encontrado.' }, { status: 404 });

  const session = data as ChallengeSession;
  const accessError = sessionAccessError(session, userId);
  if (accessError) return accessError;
  if (session.completed_at) return NextResponse.json({ error: 'Este desafio já foi concluído.' }, { status: 409 });

  const question = questionById(questionId);
  if (!question || question.difficulty !== session.difficulty || !session.question_ids.includes(questionId)) {
    return NextResponse.json({ error: 'A pergunta não pertence a este desafio.' }, { status: 400 });
  }

  const { error: insertError } = await admin.from('bible_challenge_session_answers').insert({
    session_id: session.id,
    user_id: session.user_id,
    challenge_id: session.challenge_id,
    question_id: questionId,
    selected_index: Number(selectedIndex),
  });
  if (insertError?.code === '23505') {
    const { data: priorAnswer, error: priorError } = await admin
      .from('bible_challenge_session_answers')
      .select('selected_index')
      .eq('session_id', session.id)
      .eq('question_id', questionId)
      .maybeSingle();
    if (priorError) return NextResponse.json({ error: 'Esta pergunta já foi respondida.' }, { status: 409 });
    if (!priorAnswer || Number(priorAnswer.selected_index) !== Number(selectedIndex)) {
      return NextResponse.json({ error: 'Esta pergunta já recebeu uma resposta nesta sessão.' }, { status: 409 });
    }
  } else if (insertError) {
    console.error('Erro ao salvar resposta do desafio:', insertError.message);
    return NextResponse.json({ error: 'Não foi possível registrar sua resposta.' }, { status: 503 });
  }

  const feedback = feedbackFor(questionId, Number(selectedIndex));
  if (!feedback) return NextResponse.json({ error: 'Pergunta não encontrada.' }, { status: 404 });
  return NextResponse.json(feedback);
}

async function submitChallenge(body: Record<string, unknown>) {
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
  if (!sessionIdPattern.test(sessionId)) return NextResponse.json({ error: 'Sessão de desafio inválida.' }, { status: 400 });
  if (!hasPublicSupabaseConfig()) return NextResponse.json({ error: 'O serviço de desafios ainda não está configurado.' }, { status: 503 });
  const admin = getAdminClient();
  if (!admin) return NextResponse.json({ error: 'O serviço seguro de desafios ainda não está configurado.' }, { status: 503 });

  const { userId, failed } = await getValidatedUserId();
  if (failed) return NextResponse.json({ error: 'Não foi possível validar a sessão do usuário.' }, { status: 503 });
  const { data, error } = await fetchSession(admin, sessionId);
  if (error) {
    console.error('Erro ao consultar sessão do desafio:', error.message);
    return NextResponse.json({ error: 'Não foi possível validar o desafio.' }, { status: 503 });
  }
  if (!data) return NextResponse.json({ error: 'Desafio não encontrado.' }, { status: 404 });

  const session = data as ChallengeSession;
  if (session.user_id !== userId) {
    return NextResponse.json({ error: 'Esta sessão pertence a outro usuário ou navegador.' }, { status: 403 });
  }
  const { data: answerRows, error: answersError } = await fetchSessionAnswers(admin, session.id);
  if (answersError) {
    console.error('Erro ao recuperar respostas do desafio:', answersError.message);
    return NextResponse.json({ error: 'Não foi possível validar as respostas.' }, { status: 503 });
  }
  const rows = (answerRows ?? []) as SessionAnswer[];
  const scored = scoredSessionAnswers(session, rows);
  if (scored.some((answer) => !answer) || rows.length !== session.question_ids.length) {
    return NextResponse.json({ error: 'Responda todas as perguntas antes de concluir.' }, { status: 409 });
  }
  const scoredAnswers = scored as NonNullable<typeof scored[number]>[];
  const correct = scoredAnswers.filter((answer) => answer.correct).length;
  const score = correct * 100;
  const completedAt = session.completed_at ?? new Date().toISOString();
  const completionDate = session.is_daily ? session.challenge_id.slice('daily:'.length) : brasiliaDate(new Date(completedAt));

  let duplicate = Boolean(session.completed_at);
  if (userId) {
    const accessError = session.completed_at ? null : sessionAccessError(session, userId);
    if (accessError) return accessError;
    const attempt = {
      user_id: userId,
      challenge_id: session.challenge_id,
      mode: session.mode,
      difficulty: session.difficulty,
      score,
      correct_count: correct,
      question_count: session.question_ids.length,
      completed_at: completedAt,
      completion_date: completionDate,
      is_daily: session.is_daily,
      answers: scoredAnswers.map(({ questionId, selectedIndex, correctIndex }) => ({ questionId, selectedIndex, correctIndex })),
    };
    const { error: attemptError } = await admin.from('bible_challenge_attempts').insert(attempt);
    if (attemptError?.code === '23505') {
      const { data: existingAttempt, error: existingAttemptError } = await admin
        .from('bible_challenge_attempts')
        .select('score, correct_count, question_count')
        .eq('user_id', userId)
        .eq('challenge_id', session.challenge_id)
        .maybeSingle();
      if (existingAttemptError) {
        console.error('Erro ao verificar a tentativa concluída:', existingAttemptError.message);
        return NextResponse.json({ error: 'Não foi possível recuperar o resultado.' }, { status: 503 });
      }
      if (
        !existingAttempt || existingAttempt.score !== score ||
        existingAttempt.correct_count !== correct || existingAttempt.question_count !== session.question_ids.length
      ) {
        return NextResponse.json({ error: 'Este desafio já foi contabilizado na sua conta.', duplicate: true }, { status: 409 });
      }
      duplicate = true;
    } else if (attemptError) {
      console.error('Erro ao salvar tentativa do desafio:', attemptError.message);
      return NextResponse.json({ error: 'Não foi possível sincronizar o resultado com a conta.' }, { status: 503 });
    }

    if (!session.completed_at) {
      const { error: completionError } = await admin
        .from('bible_challenge_sessions')
        .update({ completed_at: completedAt })
        .eq('id', session.id)
        .is('completed_at', null);
      if (completionError) console.error('Erro ao encerrar a sessão concluída:', completionError.message);
    }
  } else if (!session.completed_at) {
    const accessError = sessionAccessError(session, userId);
    if (accessError) return accessError;
    const { data: updatedSession, error: updateError } = await admin
      .from('bible_challenge_sessions')
      .update({ completed_at: completedAt })
      .eq('id', session.id)
      .is('completed_at', null)
      .select('id')
      .maybeSingle();
    if (updateError) {
      console.error('Erro ao finalizar sessão do desafio:', updateError.message);
      return NextResponse.json({ error: 'Não foi possível concluir o desafio.' }, { status: 503 });
    }
    if (!updatedSession) duplicate = true;
  }

  return NextResponse.json({
    persisted: Boolean(userId),
    duplicate,
    score,
    correct,
    total: session.question_ids.length,
    completedAt,
    completionDate,
    answers: scoredAnswers,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('type') !== 'progress') {
    return NextResponse.json({ error: 'Tipo de consulta inválido.' }, { status: 400 });
  }

  let supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>;
  let userId: string | null = null;
  try {
    supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Falha ao validar autenticação no progresso do Desafio Bíblico:', error.message);
      return NextResponse.json({ error: 'Não foi possível validar a sessão do usuário.' }, { status: 503 });
    }
    userId = data.user?.id ?? null;
  } catch {
    console.error('Falha ao validar autenticação no progresso do Desafio Bíblico.');
    return NextResponse.json({ error: 'Não foi possível validar a sessão do usuário.' }, { status: 503 });
  }
  if (!userId) return NextResponse.json({ authenticated: false, attempts: [] });

  const { data, error } = await supabase
    .from('bible_challenge_attempts')
    .select('id, challenge_id, mode, difficulty, score, correct_count, question_count, completed_at, completion_date, is_daily, answers')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Erro ao carregar progresso do Desafio Bíblico:', error.message);
    return NextResponse.json({ authenticated: true, error: 'A tabela de progresso ainda não está disponível.' }, { status: 503 });
  }

  const attempts = (data ?? []).map((row) => ({
    id: row.id,
    challengeId: row.challenge_id,
    mode: row.mode,
    difficulty: row.difficulty,
    score: row.score,
    correct: row.correct_count,
    total: row.question_count,
    completedAt: row.completed_at,
    completionDate: row.completion_date,
    isDaily: row.is_daily,
    answers: row.answers,
  }));
  return NextResponse.json({ authenticated: true, attempts });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!isRecord(parsed)) throw new Error('Expected object');
    body = parsed;
  } catch {
    return NextResponse.json({ error: 'Corpo da solicitação inválido.' }, { status: 400 });
  }

  if (body.type === 'start') return startChallenge(body);
  if (body.type === 'answer') return answerQuestion(body);
  if (body.type === 'submit') return submitChallenge(body);
  return NextResponse.json({ error: 'Tipo de solicitação inválido.' }, { status: 400 });
}
