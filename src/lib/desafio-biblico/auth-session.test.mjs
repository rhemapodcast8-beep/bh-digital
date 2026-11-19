import assert from 'node:assert/strict';
import { AuthApiError, AuthSessionMissingError } from '@supabase/supabase-js';
import { resolveChallengeAuth } from './auth-session.ts';

const cases = [
  {
    name: 'visitor without a session',
    actual: resolveChallengeAuth(null, new AuthSessionMissingError()),
    expected: {
      userId: null,
      failed: false,
    },
  },
  {
    name: 'authenticated user',
    actual: resolveChallengeAuth({ id: 'user-123' }, null),
    expected: {
      userId: 'user-123',
      failed: false,
    },
  },
  {
    name: 'real authentication error',
    actual: resolveChallengeAuth(null, new AuthApiError('Auth service unavailable', 503, 'server_error')),
    expected: {
      userId: null,
      failed: true,
    },
  },
];

for (const scenario of cases) {
  assert.deepEqual(scenario.actual, scenario.expected, scenario.name);
}
