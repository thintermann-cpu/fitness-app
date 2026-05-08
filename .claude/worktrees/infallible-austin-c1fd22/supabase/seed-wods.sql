-- Run this in Supabase SQL editor to create and populate the wods table.
-- The wods.json at apps/web/public/wods.json contains the source data.

CREATE TABLE public.wods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type TEXT,
  category TEXT,
  description TEXT,
  exercises TEXT,
  equipment TEXT[],
  difficulty TEXT,
  estimated_minutes INT,
  runden TEXT,
  reps TEXT,
  gewicht TEXT,
  skal_leicht TEXT,
  skal_schwer TEXT,
  quelle TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.wods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "wods are public read" ON public.wods
  FOR SELECT USING (true);

-- wod_history table for user workout logs
CREATE TABLE public.wod_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  wod_name TEXT NOT NULL,
  score_type TEXT NOT NULL CHECK (score_type IN ('time', 'rounds', 'reps', 'weight')),
  score_value TEXT NOT NULL,
  notes TEXT,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.wod_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users see own history" ON public.wod_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users insert own history" ON public.wod_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users delete own history" ON public.wod_history
  FOR DELETE USING (auth.uid() = user_id);

-- To seed from the JSON, use the Supabase dashboard or run:
-- node -e "require('./seed-wods-runner.js')"
-- See docs/seeding.md for instructions.
