export interface ChallengeAuthResolution {
  userId: string | null;
  failed: boolean;
}

export function resolveChallengeAuth(
  user: { id: string } | null | undefined,
  error: unknown,
): ChallengeAuthResolution {
  if (isMissingAuthSessionError(error)) return { userId: null, failed: false };
  if (error) return { userId: null, failed: true };
  return { userId: user?.id ?? null, failed: false };
}

function isMissingAuthSessionError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null) return false;
  const details = error as { name?: unknown; message?: unknown };
  return details.name === 'AuthSessionMissingError' && details.message === 'Auth session missing!';
}
