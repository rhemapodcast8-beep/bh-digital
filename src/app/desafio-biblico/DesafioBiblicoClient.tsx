'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, Clock3, Crown,
  Flame, History, Lightbulb, LockKeyhole, Medal, RotateCcw, Share2,
  Sparkles, Trophy, X, XCircle,
} from 'lucide-react';
import { CHALLENGE_CATEGORIES } from '@/lib/desafio-biblico/types';
import type { ChallengeAttempt, ChallengeCategory, ChallengeDifficulty, ChallengeMode, PublicQuestion } from '@/lib/desafio-biblico/types';
import { clearCategorySelection, selectAllCategories, toggleCategorySelection } from '@/lib/desafio-biblico/category-selection';
import { loadLocalAttempts, saveLocalAttempt, summarizeAttempts } from '@/lib/desafio-biblico/progress';

type Challenge = {
  sessionId: string;
  challengeId: string;
  date: string | null;
  daily: boolean;
  mode: ChallengeMode;
  difficulty: ChallengeDifficulty;
  categories: ChallengeCategory[];
  requestedCount: number;
  questions: PublicQuestion[];
  answers: AnswerEntry[];
};

type AnswerFeedback = { correct: boolean; correctIndex: number; explanation: string; reference: string };
type AnswerEntry = { questionId: string; selectedIndex: number; feedback: AnswerFeedback };
type ChallengeResult = { score: number; correct: number; total: number; percent: number };

const DIFFICULTIES: { id: ChallengeDifficulty; label: string; hint: string }[] = [
  { id: 'facil', label: 'Fácil', hint: 'Fundamentos e narrativas conhecidas' },
  { id: 'intermediario', label: 'Intermediário', hint: 'Textos e acontecimentos bíblicos' },
  { id: 'avancado', label: 'Avançado', hint: 'Contexto, conexões e interpretação' },
];
function todayInBrasilia() {
  return new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());
}

function currentDateKey() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function scoreLabel(percent: number) {
  if (percent >= 90) return 'Excelente';
  if (percent >= 70) return 'Muito bem';
  if (percent >= 50) return 'Bom caminho';
  return 'Continue aprendendo';
}

export function DesafioBiblicoClient() {
  const [difficulty, setDifficulty] = useState<ChallengeDifficulty>('intermediario');
  const [mode, setMode] = useState<ChallengeMode>('rapido');
  const [selectedCategories, setSelectedCategories] = useState<ChallengeCategory[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [answers, setAnswers] = useState<AnswerEntry[]>([]);
  const [challengeResult, setChallengeResult] = useState<ChallengeResult | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [attempts, setAttempts] = useState<ChallengeAttempt[]>([]);
  const [screen, setScreen] = useState<'home' | 'quiz' | 'result'>('home');
  const [loading, setLoading] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progressSource, setProgressSource] = useState<'supabase' | 'local' | 'unavailable'>('local');
  const [syncWarning, setSyncWarning] = useState('');

  const currentQuestion = challenge?.questions[activeIndex];
  const currentAnswer = answers[activeIndex];
  const todayChallengeId = `daily:${currentDateKey()}`;
  const completedToday = attempts.some((attempt) => attempt.challengeId === todayChallengeId);

  const loadProgress = useCallback(async () => {
    const localAttempts = loadLocalAttempts();
    try {
      const response = await fetch('/api/desafio-biblico?type=progress', { cache: 'no-store' });
      const data = await response.json();
      if (data.authenticated) setIsAuthenticated(true);
      if (!response.ok) throw new Error(data.error || 'Não foi possível sincronizar.');
      if (data.authenticated) {
        setIsAuthenticated(true);
        setAttempts(data.attempts as ChallengeAttempt[]);
        setProgressSource('supabase');
      } else {
        setIsAuthenticated(false);
        setAttempts(localAttempts);
        setProgressSource('local');
      }
      setSyncWarning('');
    } catch {
      setAttempts(localAttempts);
      setProgressSource('unavailable');
      setSyncWarning('O progresso está salvo neste dispositivo. Entre em contato com o suporte se a sincronização da conta não voltar.');
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadProgress(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadProgress]);

  const stats = useMemo(() => {
    return summarizeAttempts(attempts, currentDateKey());
  }, [attempts]);

  async function beginChallenge(daily: boolean) {
    if (daily && completedToday) {
      setNotice('O desafio de hoje já foi contabilizado. Volte amanhã para uma nova pontuação diária.');
      return;
    }
    setLoading(true);
    setNotice('');
    try {
      const response = await fetch('/api/desafio-biblico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'start', mode, difficulty, daily, categories: daily ? [] : selectedCategories }),
      });
      const data = await response.json().catch(() => null) as ({ error?: string } & Partial<Challenge>) | null;
      if (!response.ok) {
        throw new Error(data?.error || `Não foi possível iniciar o desafio (HTTP ${response.status}). Tente novamente.`);
      }
      if (!data) throw new Error('O servidor retornou uma resposta inválida ao iniciar o desafio.');
      const newChallenge = data as Challenge;
      if (!Array.isArray(newChallenge.questions) || newChallenge.questions.length === 0) {
        throw new Error('Não há perguntas disponíveis para essa combinação de categorias e dificuldade. Tente outra seleção.');
      }
      setChallenge(newChallenge);
      setChallengeResult(null);
      const savedAnswers = new Map(newChallenge.answers.map((answer) => [answer.questionId, answer]));
      const restoredAnswers = newChallenge.questions.map((question) => savedAnswers.get(question.id));
      setAnswers(restoredAnswers as AnswerEntry[]);
      const firstUnanswered = restoredAnswers.findIndex((answer) => !answer);
      setActiveIndex(firstUnanswered === -1 ? newChallenge.questions.length - 1 : firstUnanswered);
      if (newChallenge.questions.length < newChallenge.requestedCount) {
        setNotice(`Há apenas ${newChallenge.questions.length} perguntas disponíveis para essa seleção e nível. Este desafio usará as ${newChallenge.questions.length} disponíveis, em vez de ${newChallenge.requestedCount}.`);
      }
      setScreen('quiz');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Não foi possível iniciar o desafio.');
    } finally {
      setLoading(false);
    }
  }

  async function chooseAnswer(selectedIndex: number) {
    if (!challenge || !currentQuestion || currentAnswer || answerLoading) return;
    setAnswerLoading(true);
    try {
      const response = await fetch('/api/desafio-biblico', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'answer', sessionId: challenge.sessionId, questionId: currentQuestion.id, selectedIndex }),
      });
      const feedback = await response.json();
      if (!response.ok) throw new Error(feedback.error || 'Não foi possível validar a resposta.');
      setAnswers((previous) => {
        const next = [...previous];
        next[activeIndex] = { questionId: currentQuestion.id, selectedIndex, feedback };
        return next;
      });
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Não foi possível validar a resposta.');
    } finally {
      setAnswerLoading(false);
    }
  }

  async function finishChallenge() {
    if (!challenge || answers.length !== challenge.questions.length || answers.some((answer) => !answer)) return;
    if (challenge.daily && challenge.date !== currentDateKey()) {
      setScreen('home');
      setNotice('O desafio diário virou com o horário de Brasília. Inicie o novo desafio do dia para registrar sua pontuação.');
      return;
    }
    setLoading(true);
    setNotice('');
    try {
      const response = await fetch('/api/desafio-biblico', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'submit', sessionId: challenge.sessionId }),
      });
      const result = await response.json();
      if (response.status === 409 && result.duplicate) {
        await loadProgress();
        setScreen('home');
        setNotice('Este desafio já recebeu pontuação na sua conta. A tentativa duplicada não foi contabilizada.');
        return;
      }
      if (!response.ok) {
        setNotice(result.error || 'Não foi possível concluir o desafio.');
        return;
      }

      const completedAnswers: AnswerEntry[] = result.answers.map((answer: {
        questionId: string;
        selectedIndex: number;
        correct: boolean;
        correctIndex: number;
        explanation: string;
        reference: string;
      }) => ({
        questionId: answer.questionId,
        selectedIndex: answer.selectedIndex,
        feedback: {
          correct: answer.correct,
          correctIndex: answer.correctIndex,
          explanation: answer.explanation,
          reference: answer.reference,
        },
      }));
      setAnswers(completedAnswers);
      setChallengeResult({ score: result.score, correct: result.correct, total: result.total, percent: Math.round((result.correct / result.total) * 100) });

      const attempt: ChallengeAttempt = {
        id: result.persisted ? challenge.challengeId : `${challenge.challengeId}:${Date.now()}`,
        challengeId: challenge.challengeId,
        mode: challenge.mode,
        difficulty: challenge.difficulty,
        score: result.score,
        correct: result.correct,
        total: result.total,
        completedAt: result.completedAt,
        completionDate: result.completionDate,
        isDaily: challenge.daily,
        answers: result.answers.map((answer: { questionId: string; selectedIndex: number; correctIndex: number }) => ({
          questionId: answer.questionId,
          selectedIndex: answer.selectedIndex,
          correctIndex: answer.correctIndex,
        })),
      };
      if (!result.persisted) {
        const saved = saveLocalAttempt(attempt);
        if (!saved && challenge.daily && !result.duplicate) {
          await loadProgress();
          setScreen('home');
          setNotice('O desafio diário já foi contabilizado neste dispositivo.');
          return;
        }
        setSyncWarning(isAuthenticated
          ? 'Não foi possível acessar a tabela do Supabase. O resultado ficou salvo somente neste dispositivo; aplique a migration do módulo para sincronizá-lo na conta.'
          : 'Visitante: seu progresso fica salvo neste dispositivo e navegador.');
      }
      setAttempts((previous) => [attempt, ...previous.filter((item) => item.challengeId !== attempt.challengeId)]);
      setScreen('result');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Não foi possível concluir o desafio. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function advance() {
    if (!challenge || !currentAnswer) return;
    if (activeIndex < challenge.questions.length - 1) setActiveIndex((index) => index + 1);
    else await finishChallenge();
  }

  async function shareResult() {
    if (!challenge || !answers.length) return;
    const correct = challengeResult?.correct ?? answers.filter((answer) => answer?.feedback.correct).length;
    const total = challengeResult?.total ?? answers.length;
    const percent = challengeResult?.percent ?? Math.round((correct / total) * 100);
    const message = `Concluí o Desafio Bíblico BH com ${correct}/${total} acertos (${percent}%)! Você também pode participar: ${window.location.origin}/desafio-biblico`;
    try {
      if (navigator.share) await navigator.share({ title: 'Desafio Bíblico BH', text: message });
      else {
        await navigator.clipboard.writeText(message);
        setNotice('Resultado copiado para compartilhar.');
      }
    } catch {
      // O compartilhamento pode ser cancelado pelo próprio usuário.
    }
  }

  const correctCount = answers.filter((answer) => answer?.feedback.correct).length;
  const percent = answers.length ? Math.round((correctCount / answers.length) * 100) : 0;
  const resultCorrect = challengeResult?.correct ?? correctCount;
  const resultTotal = challengeResult?.total ?? answers.length;
  const resultPercent = challengeResult?.percent ?? percent;
  const resultScore = challengeResult?.score ?? correctCount * 100;
  const difficultyLabel = DIFFICULTIES.find((item) => item.id === (challenge?.difficulty ?? difficulty))?.label;

  return (
    <main className="min-h-screen bg-[#060B16] pb-20 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(30,58,138,0.24),transparent_66%)]" />
      <div className="relative mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Navegação estrutural" className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/ferramentas" className="inline-flex items-center gap-1 transition-colors hover:text-white"><ArrowLeft className="h-3.5 w-3.5" /> Ferramentas</Link>
          <span aria-hidden="true">/</span><span className="font-semibold text-[#E5C05B]">Desafio Bíblico BH</span>
        </nav>

        {notice && <div role="status" className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">{notice}</div>}
        {syncWarning && <div role="status" className="rounded-xl border border-blue-400/20 bg-blue-400/5 px-4 py-3 text-sm text-blue-100">{syncWarning}</div>}

        {screen === 'home' && (
          <>
            <section className="relative overflow-hidden rounded-[2rem] border border-[#D4AF37]/20 bg-gradient-to-br from-[#101B34] via-[#0A1121] to-[#080E1B] p-6 shadow-2xl shadow-black/30 sm:p-10 lg:p-14">
              <div className="absolute -right-10 -top-24 h-80 w-80 rounded-full border border-[#D4AF37]/10" />
              <div className="absolute -right-2 -top-16 h-64 w-64 rounded-full border border-[#D4AF37]/10" />
              <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5C05B]"><Sparkles className="h-3.5 w-3.5" /> Aprenda. Responda. Cresça.</div>
                  <div>
                    <p className="mb-2 text-sm font-bold uppercase tracking-[0.24em] text-slate-400">BH DIGITAL apresenta</p>
                    <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Desafio <span className="text-gold-gradient">Bíblico BH</span></h1>
                  </div>
                  <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Conheça as Escrituras pergunta por pergunta. Aprenda com explicações e referências bíblicas e acompanhe sua jornada de estudo.</p>
                  <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-300">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2"><BookOpen className="h-4 w-4 text-[#E5C05B]" /> {DIFFICULTIES.length} níveis</span>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2"><CheckCircle2 className="h-4 w-4 text-[#E5C05B]" /> 48 perguntas bíblicas</span>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-2"><Clock3 className="h-4 w-4 text-[#E5C05B]" /> 5 ou 10 questões</span>
                  </div>
                </div>
                <div className="relative mx-auto w-full max-w-md rounded-3xl border border-[#D4AF37]/25 bg-[#060B16]/70 p-6 shadow-xl backdrop-blur">
                  <div className="flex items-center justify-between"><span className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#E5C05B]"><Flame className="h-3.5 w-3.5" /> Desafio do dia</span><span className="text-xs text-slate-400">{todayInBrasilia()}</span></div>
                  <h2 className="mt-6 text-2xl font-bold text-white">Uma nova jornada começa hoje.</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">As perguntas do desafio diário mudam a cada dia, seguindo o horário de Brasília.</p>
                  <button onClick={() => void beginChallenge(true)} disabled={loading || completedToday} className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-3 font-bold text-[#070D18] transition hover:bg-[#E5C05B] disabled:cursor-not-allowed disabled:opacity-60">
                    {completedToday ? <><Check className="h-4 w-4" /> Desafio de hoje concluído</> : loading ? 'Preparando desafio…' : <>Começar desafio do dia <ArrowRight className="h-4 w-4" /></>}
                  </button>
                  {!completedToday && <p className="mt-3 text-center text-xs text-slate-500">Pontuação diária contabilizada uma vez por dia</p>}
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-slate-800 bg-[#080E1B] p-5 sm:p-7">
                <div className="mb-6 flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">Monte sua sessão</p><h2 className="mt-2 text-2xl font-bold text-white">Desafio personalizado</h2></div><div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-3 text-[#E5C05B]"><Trophy className="h-5 w-5" /></div></div>
                <div className="space-y-5">
                  <fieldset><legend className="mb-2 text-sm font-semibold text-slate-200">Quantidade de perguntas</legend><div className="grid grid-cols-2 gap-3">
                    {([{ id: 'rapido', title: 'Desafio rápido', count: 5, sub: 'Uma pausa de aprendizado' }, { id: 'completo', title: 'Desafio completo', count: 10, sub: 'Uma jornada mais profunda' }] as const).map((item) => <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => setMode(item.id)} className={`rounded-xl border p-4 text-left transition ${mode === item.id ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10' : 'border-slate-800 bg-[#060B16] hover:border-slate-700'}`}><span className="block font-bold text-white">{item.title}</span><span className="mt-1 block text-xs text-slate-400">{item.count} perguntas · {item.sub}</span></button>)}
                  </div></fieldset>
                  <fieldset><legend className="mb-2 text-sm font-semibold text-slate-200">Nível de dificuldade</legend><div className="grid gap-2 sm:grid-cols-3">
                    {DIFFICULTIES.map((item) => <button key={item.id} type="button" aria-pressed={difficulty === item.id} onClick={() => setDifficulty(item.id)} className={`rounded-xl border px-3 py-3 text-left transition ${difficulty === item.id ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10' : 'border-slate-800 bg-[#060B16] hover:border-slate-700'}`}><span className="block text-sm font-bold text-white">{item.label}</span><span className="mt-1 block text-[11px] leading-4 text-slate-400">{item.hint}</span></button>)}
                  </div></fieldset>
                  <button onClick={() => void beginChallenge(false)} disabled={loading} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/50 bg-transparent px-5 py-3 font-bold text-[#E5C05B] transition hover:bg-[#D4AF37]/10 disabled:opacity-60">{loading ? 'Preparando perguntas…' : <>Começar desafio <ArrowRight className="h-4 w-4" /></>}</button>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-[#080E1B] p-5 sm:p-7">
                <div className="flex items-center gap-3"><div className="rounded-xl bg-blue-500/10 p-3 text-blue-300"><BookOpen className="h-5 w-5" /></div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Banco de perguntas</p><h2 className="text-xl font-bold text-white">Categorias bíblicas</h2></div></div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-slate-300" aria-live="polite">{selectedCategories.length ? `${selectedCategories.length} de ${CHALLENGE_CATEGORIES.length} categorias selecionadas` : 'Todas as categorias serão usadas'}</p>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" aria-pressed={selectedCategories.length === CHALLENGE_CATEGORIES.length} onClick={() => setSelectedCategories(selectAllCategories())} className="rounded-lg border border-[#D4AF37]/30 px-3 py-2 text-xs font-semibold text-[#E5C05B] transition hover:bg-[#D4AF37]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5C05B]">Selecionar todas</button>
                    <button type="button" onClick={() => setSelectedCategories(clearCategorySelection())} disabled={selectedCategories.length === 0} className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5C05B] disabled:cursor-not-allowed disabled:opacity-40">Limpar seleção</button>
                  </div>
                </div>
                <fieldset className="mt-3">
                  <legend className="sr-only">Selecione uma ou mais categorias para o desafio personalizado</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {CHALLENGE_CATEGORIES.map((category) => {
                      const selected = selectedCategories.includes(category);
                      return (
                        <button
                          key={category}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setSelectedCategories((current) => toggleCategorySelection(current, category))}
                          className={`flex min-h-11 items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5C05B] ${selected ? 'border-[#D4AF37]/60 bg-[#D4AF37]/10 text-[#F1D676]' : 'border-slate-700/80 bg-slate-900/70 text-slate-300 hover:border-slate-600 hover:bg-slate-900'}`}
                        >
                          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${selected ? 'border-[#D4AF37] bg-[#D4AF37] text-[#070D18]' : 'border-slate-500'}`} aria-hidden="true">{selected && <Check className="h-3 w-3" />}</span>
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <p className="mt-5 text-sm leading-6 text-slate-400">As perguntas respeitam o nível e as categorias escolhidas no desafio personalizado. Sem seleção, o banco completo é usado. Se houver menos perguntas que o modo solicita, o desafio usa todas as disponíveis. O desafio diário mantém as perguntas próprias do dia.</p>
              </div>
            </section>

            <section aria-labelledby="progress-title" className="space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D4AF37]">Sua jornada</p><h2 id="progress-title" className="mt-1 text-2xl font-bold text-white">Evolução pessoal</h2></div><span className="text-xs text-slate-500">{progressSource === 'supabase' ? 'Sincronizado com sua conta' : progressSource === 'unavailable' ? 'Sincronização indisponível · exibindo dados locais' : 'Salvo neste dispositivo'}</span></div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
                {[
                  { label: 'Desafios', value: stats.completed, icon: Trophy },
                  { label: 'Perguntas', value: stats.questions, icon: BookOpen },
                  { label: 'Acertos', value: stats.correct, icon: CheckCircle2 },
                  { label: 'Aproveitamento', value: `${stats.percent}%`, icon: Medal },
                  { label: 'Melhor pontuação', value: stats.best, icon: Crown },
                  { label: 'Dias seguidos', value: stats.streak, icon: Flame },
                ].map((item) => <div key={item.label} className="rounded-2xl border border-slate-800 bg-[#080E1B] p-4"><item.icon className="h-4 w-4 text-[#E5C05B]" /><p className="mt-3 text-2xl font-extrabold text-white">{item.value}</p><p className="mt-1 text-xs text-slate-400">{item.label}</p></div>)}
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#080E1B]">
                <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4"><History className="h-4 w-4 text-[#E5C05B]" /><h3 className="font-bold text-white">Histórico de desafios</h3></div>
                {attempts.length ? <ul className="divide-y divide-slate-800/80">{attempts.slice(0, 5).map((attempt) => <li key={attempt.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"><div><p className="font-semibold text-slate-200">{attempt.isDaily ? 'Desafio do dia' : 'Desafio personalizado'} · {attempt.correct}/{attempt.total} acertos</p><p className="mt-1 text-xs text-slate-500">{new Date(attempt.completedAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })} · {attempt.difficulty === 'facil' ? 'Fácil' : attempt.difficulty === 'avancado' ? 'Avançado' : 'Intermediário'}</p></div><span className="rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1.5 text-sm font-bold text-[#E5C05B]">{attempt.score} pts</span></li>)}</ul> : <p className="px-5 py-8 text-center text-sm text-slate-500">Seu primeiro desafio ainda está esperando por você.</p>}
              </div>
              {!isAuthenticated && <p className="flex items-center gap-2 text-xs text-slate-500"><LockKeyhole className="h-3.5 w-3.5" /> Faça login para sincronizar seu progresso na conta e continuar em outros dispositivos.</p>}
              {!isAuthenticated && <Link href="/auth/login?redirectTo=/desafio-biblico" className="inline-flex items-center gap-2 text-sm font-semibold text-[#E5C05B] hover:text-white">Entrar na minha conta <ArrowRight className="h-4 w-4" /></Link>}
            </section>
          </>
        )}

        {screen === 'quiz' && challenge && currentQuestion && (
          <section className="mx-auto max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><button onClick={() => setScreen('home')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> Sair do desafio</button><div className="flex gap-2"><span className="rounded-full border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-3 py-1.5 text-xs font-semibold text-[#E5C05B]">{challenge.daily ? 'Desafio do dia' : 'Desafio personalizado'}</span><span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-300">{difficultyLabel}</span></div></div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800" role="progressbar" aria-label="Progresso do desafio" aria-valuemin={0} aria-valuemax={challenge.questions.length} aria-valuenow={activeIndex + (currentAnswer ? 1 : 0)}><div className="h-full rounded-full bg-gradient-to-r from-[#C59B27] to-[#E5C05B] transition-all duration-500" style={{ width: `${((activeIndex + (currentAnswer ? 1 : 0)) / challenge.questions.length) * 100}%` }} /></div>
            <div className="rounded-3xl border border-slate-800 bg-[#080E1B] p-5 shadow-xl sm:p-8">
              <div className="flex items-center justify-between gap-3 text-xs"><span className="font-bold uppercase tracking-[0.16em] text-[#E5C05B]">Pergunta {activeIndex + 1} de {challenge.questions.length}</span><span className="rounded-full bg-slate-900 px-3 py-1.5 text-slate-400">{currentQuestion.category}</span></div>
              <h1 className="mt-6 text-2xl font-bold leading-snug text-white sm:text-3xl">{currentQuestion.question}</h1>
              <fieldset className="mt-7 space-y-3" disabled={Boolean(currentAnswer) || answerLoading}><legend className="sr-only">Escolha uma alternativa</legend>
                {currentQuestion.options.map((option, index) => {
                  const selected = currentAnswer?.selectedIndex === index;
                  const isCorrect = currentAnswer?.feedback.correctIndex === index;
                  let style = 'border-slate-700 bg-[#060B16] hover:border-[#D4AF37]/50 hover:bg-slate-900';
                  if (currentAnswer && isCorrect) style = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-100';
                  else if (selected && currentAnswer && !currentAnswer.feedback.correct) style = 'border-rose-500/60 bg-rose-500/10 text-rose-100';
                  else if (currentAnswer) style = 'border-slate-800 bg-[#060B16] text-slate-500';
                  return <button type="button" key={option} onClick={() => void chooseAnswer(index)} disabled={Boolean(currentAnswer) || answerLoading} className={`flex min-h-14 w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium text-slate-200 transition disabled:cursor-default ${style}`}><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current/20 text-xs font-bold">{String.fromCharCode(65 + index)}</span><span className="flex-1">{option}</span>{currentAnswer && isCorrect && <Check className="h-4 w-4" />}{selected && currentAnswer && !currentAnswer.feedback.correct && <X className="h-4 w-4" />}</button>;
                })}
              </fieldset>
              {answerLoading && <p role="status" className="mt-4 text-center text-sm text-slate-400">Conferindo sua resposta…</p>}
              {currentAnswer && <div className={`mt-6 rounded-2xl border p-5 ${currentAnswer.feedback.correct ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'}`} role="status"><div className={`flex items-center gap-2 font-bold ${currentAnswer.feedback.correct ? 'text-emerald-300' : 'text-rose-300'}`}>{currentAnswer.feedback.correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}{currentAnswer.feedback.correct ? 'Resposta correta!' : 'Ainda não. Vamos aprender juntos.'}</div><p className="mt-3 text-sm leading-6 text-slate-200">{currentAnswer.feedback.explanation}</p><p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#E5C05B]"><BookOpen className="h-3.5 w-3.5" /> {currentAnswer.feedback.reference}</p></div>}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 pt-5"><p className="text-sm text-slate-400">Pontuação: <span className="font-bold text-[#E5C05B]">{correctCount * 100} pts</span></p><button onClick={() => void advance()} disabled={!currentAnswer || loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 py-2.5 text-sm font-bold text-[#070D18] transition hover:bg-[#E5C05B] disabled:cursor-not-allowed disabled:opacity-40">{activeIndex === challenge.questions.length - 1 ? loading ? 'Concluindo…' : 'Ver resultado' : 'Próxima pergunta'} <ArrowRight className="h-4 w-4" /></button></div>
            </div>
          </section>
        )}

        {screen === 'result' && challenge && (
          <section className="mx-auto max-w-4xl space-y-6">
            <div className="rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#111C34] to-[#080E1B] p-6 text-center shadow-2xl sm:p-10"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#E5C05B]"><Trophy className="h-8 w-8" /></div><p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#E5C05B]">Desafio concluído</p><h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">{scoreLabel(resultPercent)}</h1><p className="mt-3 text-slate-300">Você acertou {resultCorrect} de {resultTotal} perguntas ({resultPercent}% de aproveitamento).</p><p className="mt-5 text-5xl font-black text-gold-gradient">{resultScore} <span className="text-lg">pontos</span></p><div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3"><div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3"><p className="text-2xl font-bold text-emerald-300">{resultCorrect}</p><p className="text-xs text-slate-400">acertos</p></div><div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3"><p className="text-2xl font-bold text-rose-300">{resultTotal - resultCorrect}</p><p className="text-xs text-slate-400">erros</p></div></div><div className="mt-7 flex flex-wrap justify-center gap-3"><button onClick={() => void shareResult()} className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/40 px-4 py-3 text-sm font-semibold text-[#E5C05B] hover:bg-[#D4AF37]/10"><Share2 className="h-4 w-4" /> Compartilhar resultado</button><button onClick={() => setScreen('home')} className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-bold text-[#070D18] hover:bg-[#E5C05B]"><RotateCcw className="h-4 w-4" /> Tentar novamente</button></div></div>
            <div className="rounded-3xl border border-slate-800 bg-[#080E1B] p-5 sm:p-7"><div className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-[#E5C05B]" /><h2 className="text-xl font-bold text-white">Revisão do desafio</h2></div><ol className="mt-5 space-y-4">{challenge.questions.map((question, index) => { const answer = answers[index]; return <li key={question.id} className="rounded-2xl border border-slate-800 bg-[#060B16] p-4"><div className="flex gap-3"><span className={`mt-0.5 ${answer?.feedback.correct ? 'text-emerald-300' : 'text-rose-300'}`}>{answer?.feedback.correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}</span><div className="min-w-0 flex-1"><p className="font-semibold leading-6 text-white">{index + 1}. {question.question}</p><p className="mt-2 text-sm text-slate-400">Sua resposta: <span className="text-slate-200">{question.options[answer?.selectedIndex ?? -1] ?? '—'}</span></p>{!answer?.feedback.correct && <p className="mt-1 text-sm text-emerald-200">Resposta correta: {question.options[answer?.feedback.correctIndex ?? -1] ?? '—'}</p>}<p className="mt-3 text-sm leading-6 text-slate-300">{answer?.feedback.explanation}</p><p className="mt-2 text-xs font-semibold text-[#E5C05B]">{answer?.feedback.reference}</p></div></div></li>; })}</ol></div>
          </section>
        )}
      </div>
    </main>
  );
}
