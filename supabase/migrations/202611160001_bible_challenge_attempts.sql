create table if not exists public.bible_challenge_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_id text not null,
  mode text not null check (mode in ('rapido', 'completo')),
  difficulty text not null check (difficulty in ('facil', 'intermediario', 'avancado')),
  score integer not null check (score >= 0),
  correct_count integer not null check (correct_count >= 0),
  question_count integer not null,
  completed_at timestamptz not null default now(),
  completion_date date not null,
  is_daily boolean not null default false,
  answers jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  constraint bible_challenge_attempts_user_challenge_unique unique (user_id, challenge_id),
  constraint bible_challenge_attempts_question_count_check check (
    (mode = 'rapido' and question_count between 1 and 5)
    or (mode = 'completo' and question_count between 1 and 10)
  ),
  constraint bible_challenge_attempts_score_count_check check (correct_count <= question_count and score = correct_count * 100)
);

create index if not exists bible_challenge_attempts_user_completed_idx
  on public.bible_challenge_attempts (user_id, completed_at desc);

create index if not exists bible_challenge_attempts_user_daily_idx
  on public.bible_challenge_attempts (user_id, completion_date desc)
  where is_daily = true;

create table if not exists public.bible_challenge_sessions (
  id uuid primary key,
  user_id uuid references auth.users(id) on delete cascade,
  challenge_id text not null,
  mode text not null check (mode in ('rapido', 'completo')),
  difficulty text not null check (difficulty in ('facil', 'intermediario', 'avancado')),
  categories text[] not null default '{}',
  question_ids text[] not null,
  is_daily boolean not null default false,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  completed_at timestamptz,
  constraint bible_challenge_sessions_question_count_check check (
    (mode = 'rapido' and cardinality(question_ids) between 1 and 5)
    or (mode = 'completo' and cardinality(question_ids) between 1 and 10)
  )
);

create index if not exists bible_challenge_sessions_expiry_idx
  on public.bible_challenge_sessions (expires_at);

create unique index if not exists bible_challenge_sessions_one_active_daily_idx
  on public.bible_challenge_sessions (user_id, challenge_id)
  where user_id is not null and is_daily = true and completed_at is null;

create table if not exists public.bible_challenge_session_answers (
  session_id uuid not null references public.bible_challenge_sessions(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  challenge_id text not null,
  question_id text not null,
  selected_index smallint not null check (selected_index between 0 and 3),
  answered_at timestamptz not null default now(),
  constraint bible_challenge_session_answers_session_question_unique unique (session_id, question_id)
);

create unique index if not exists bible_challenge_session_answers_daily_once_idx
  on public.bible_challenge_session_answers (user_id, challenge_id, question_id)
  where user_id is not null and challenge_id like 'daily:%';

alter table public.bible_challenge_sessions enable row level security;
alter table public.bible_challenge_session_answers enable row level security;
revoke all on public.bible_challenge_sessions from anon, authenticated;
revoke all on public.bible_challenge_session_answers from anon, authenticated;
grant all on public.bible_challenge_sessions to service_role;
grant all on public.bible_challenge_session_answers to service_role;

alter table public.bible_challenge_attempts enable row level security;

drop policy if exists "Users can read their own challenge progress" on public.bible_challenge_attempts;
create policy "Users can read their own challenge progress"
  on public.bible_challenge_attempts for select to authenticated
  using ((select auth.uid()) = user_id);

revoke all on public.bible_challenge_attempts from anon;
revoke insert, update, delete on public.bible_challenge_attempts from authenticated;
grant select on public.bible_challenge_attempts to authenticated;
grant all on public.bible_challenge_attempts to service_role;
