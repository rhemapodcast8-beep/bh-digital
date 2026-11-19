import { BIBLE_QUESTIONS } from './questions';
import type { BibleQuestion, ChallengeCategory, ChallengeDifficulty, ChallengeMode, PublicQuestion } from './types';

export const QUESTION_COUNT: Record<ChallengeMode, number> = { rapido: 5, completo: 10 };

export function brasiliaDate(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const part = (type: string) => parts.find((item) => item.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function questionsForChallenge(
  difficulty: ChallengeDifficulty,
  mode: ChallengeMode,
  dailyDate?: string,
  categories: readonly ChallengeCategory[] = [],
): BibleQuestion[] {
  const seenIds = new Set<string>();
  const pool = BIBLE_QUESTIONS.filter((question) => (
    question.difficulty === difficulty && (categories.length === 0 || categories.includes(question.category))
  )).filter((question) => {
    if (seenIds.has(question.id)) return false;
    seenIds.add(question.id);
    return true;
  });
  let ordered: BibleQuestion[];
  if (dailyDate) {
    const [year, month, day] = dailyDate.split('-').map(Number);
    const dayNumber = Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
    const offset = dayNumber % pool.length;
    const stablePool = [...pool].sort((a, b) => a.id.localeCompare(b.id));
    ordered = [...stablePool.slice(offset), ...stablePool.slice(0, offset)];
  } else {
    ordered = [...pool];
    for (let i = ordered.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [ordered[i], ordered[j]] = [ordered[j], ordered[i]];
    }
  }
  return ordered.slice(0, QUESTION_COUNT[mode]);
}

export function withoutAnswers(questions: BibleQuestion[]): PublicQuestion[] {
  return questions.map(({ id, difficulty, category, question, options }) => ({
    id, difficulty, category, question, options,
  }));
}

export function questionById(id: string): BibleQuestion | undefined {
  return BIBLE_QUESTIONS.find((question) => question.id === id);
}

export function previousBrasiliaDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const previous = new Date(Date.UTC(year, month - 1, day - 1));
  return `${previous.getUTCFullYear()}-${String(previous.getUTCMonth() + 1).padStart(2, '0')}-${String(previous.getUTCDate()).padStart(2, '0')}`;
}
