export type ChallengeDifficulty = 'facil' | 'intermediario' | 'avancado';
export type ChallengeMode = 'rapido' | 'completo';

export const CHALLENGE_CATEGORIES = [
  'Personagens bíblicos',
  'Acontecimentos bíblicos',
  'Livros da Bíblia',
  'Ensinamentos de Jesus',
  'Antigo Testamento',
  'Novo Testamento',
  'Parábolas',
  'História da Igreja',
] as const;

export type ChallengeCategory = (typeof CHALLENGE_CATEGORIES)[number];

export function isChallengeCategory(value: unknown): value is ChallengeCategory {
  return typeof value === 'string' && CHALLENGE_CATEGORIES.some((category) => category === value);
}

export interface BibleQuestion {
  id: string;
  difficulty: ChallengeDifficulty;
  category: ChallengeCategory;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  reference: string;
}

export type PublicQuestion = Omit<BibleQuestion, 'correctIndex' | 'explanation' | 'reference'>;

export interface ChallengeAttempt {
  id: string;
  challengeId: string;
  mode: ChallengeMode;
  difficulty: ChallengeDifficulty;
  score: number;
  correct: number;
  total: number;
  completedAt: string;
  completionDate: string;
  isDaily: boolean;
  answers: { questionId: string; selectedIndex: number; correctIndex: number }[];
}
