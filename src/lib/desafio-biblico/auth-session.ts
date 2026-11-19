import { isAuthSessionMissingError } from '@supabase/supabase-js';

export interface ChallengeAuthResolution {
  userId: string | null;
  failed: boolean;
}

export function resolveChallengeAuth(
  user: { id: string } | null | undefined,
  error: unknown,
): ChallengeAuthResolution {
  if (isAuthSessionMissingError(error)) return { userId: null, failed: false };
  if (error) return { userId: null, failed: true };
  return { userId: user?.id ?? null, failed: false };
}
