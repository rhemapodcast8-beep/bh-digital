import assert from 'node:assert/strict';
import { AuthApiError, AuthSessionMissingError } from '@supabase/supabase-js';
import { resolveChallengeAuth } from './auth-session.ts';

const cases = [
  {
    name: 'visitor missing-session object with undefined code',
    actual: resolveChallengeAuth(null, {
      name: 'AuthSessionMissingError',
      code: undefined,
      message: 'Auth session missing!',
    }),
    expected: {
      userId: null,
      failed: false,
    },
  },
  {
    name: 'visitor with the Supabase AuthSessionMissingError instance',
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
  {
    name: 'generic errors with a similar message stay failures',
    actual: resolveChallengeAuth(null, new Error('Auth session missing!')),
    expected: {
      userId: null,
      failed: true,
    },
  },
  {
    name: 'missing-session name with a different message stays a failure',
    actual: resolveChallengeAuth(null, {
      name: 'AuthSessionMissingError',
      code: undefined,
      message: 'A different authentication error',
    }),
    expected: {
      userId: null,
      failed: true,
    },
  },
];

for (const scenario of cases) {
  assert.deepEqual(scenario.actual, scenario.expected, scenario.name);
}
