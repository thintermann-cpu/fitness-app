CREATE TABLE public.stretching_exercises (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         JSONB NOT NULL,
  description  JSONB,
  instructions JSONB,
  muscle_group TEXT NOT NULL,
  difficulty   TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  duration_sec INT NOT NULL DEFAULT 30,
  equipment    TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.stretching_routines (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         JSONB NOT NULL,
  description  JSONB,
  goal         TEXT NOT NULL,
  difficulty   TEXT NOT NULL DEFAULT 'beginner',
  duration_min INT NOT NULL,
  exercise_ids UUID[],
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.stretching_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  routine_id   UUID REFERENCES public.stretching_routines(id),
  completed_at DATE NOT NULL DEFAULT CURRENT_DATE,
  duration_min INT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.stretching_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stretching_routines  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stretching_logs      ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read stretching_exercises"
  ON public.stretching_exercises FOR SELECT USING (true);

CREATE POLICY "Public read stretching_routines"
  ON public.stretching_routines FOR SELECT USING (true);

CREATE POLICY "Users own stretching logs"
  ON public.stretching_logs FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
