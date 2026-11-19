import type { ChallengeAttempt } from './types';

export const LOCAL_PROGRESS_KEY = 'bh-digital:bible-challenge:v1';

export function loadLocalAttempts(): ChallengeAttempt[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(LOCAL_PROGRESS_KEY) || '[]');
    return Array.isArray(value) ? value as ChallengeAttempt[] : [];
  } catch {
    return [];
  }
}

export function saveLocalAttempt(attempt: ChallengeAttempt): boolean {
  try {
    const attempts = loadLocalAttempts();
    if (attempts.some((item) => item.challengeId === attempt.challengeId)) return false;
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify([attempt, ...attempts].slice(0, 100)));
    return true;
  } catch {
    return false;
  }
}

function previousDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  const previous = new Date(Date.UTC(year, month - 1, day - 1));
  return `${previous.getUTCFullYear()}-${String(previous.getUTCMonth() + 1).padStart(2, '0')}-${String(previous.getUTCDate()).padStart(2, '0')}`;
}

export function summarizeAttempts(attempts: ChallengeAttempt[], today: string) {
  const questions = attempts.reduce((sum, attempt) => sum + attempt.total, 0);
  const correct = attempts.reduce((sum, attempt) => sum + attempt.correct, 0);
  const dailyDates = new Set(attempts.filter((attempt) => attempt.isDaily).map((attempt) => attempt.completionDate));
  let date = dailyDates.has(today) ? today : previousDate(today);
  let streak = 0;
  while (dailyDates.has(date)) {
    streak += 1;
    date = previousDate(date);
  }
  return {
    completed: attempts.length,
    questions,
    correct,
    percent: questions ? Math.round((correct / questions) * 100) : 0,
    best: attempts.reduce((best, attempt) => Math.max(best, attempt.score), 0),
    streak,
  };
}
