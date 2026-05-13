-- Phase 2: Routines, Routine Logs, Daily Logs, Todos
-- Run in Supabase SQL Editor if these tables are missing.

CREATE TABLE IF NOT EXISTS public.routines (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category    TEXT        NOT NULL CHECK (category IN ('morning', 'day', 'evening')),
  name        TEXT        NOT NULL,
  icon        TEXT        NOT NULL DEFAULT '',
  time        TEXT,
  link_url    TEXT,
  active_days INTEGER[]   NOT NULL DEFAULT ARRAY[]::INTEGER[],
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.routines ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own routines" ON public.routines;
CREATE POLICY "Users manage own routines" ON public.routines
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.routine_logs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  routine_id  UUID        NOT NULL REFERENCES public.routines(id) ON DELETE CASCADE,
  date        TEXT        NOT NULL,
  completed   BOOLEAN     NOT NULL DEFAULT FALSE,
  UNIQUE (user_id, routine_id, date)
);
ALTER TABLE public.routine_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own routine_logs" ON public.routine_logs;
CREATE POLICY "Users manage own routine_logs" ON public.routine_logs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.daily_logs (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date         TEXT        NOT NULL,
  water_ml     INTEGER     NOT NULL DEFAULT 0,
  mood         TEXT,
  mood_comment TEXT,
  UNIQUE (user_id, date)
);
ALTER TABLE public.daily_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own daily_logs" ON public.daily_logs;
CREATE POLICY "Users manage own daily_logs" ON public.daily_logs
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS public.todos (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  list_name   TEXT        NOT NULL,
  text        TEXT        NOT NULL,
  completed   BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users manage own todos" ON public.todos;
CREATE POLICY "Users manage own todos" ON public.todos
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
