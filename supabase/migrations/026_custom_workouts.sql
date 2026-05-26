CREATE TABLE IF NOT EXISTS public.custom_workouts (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,
  mode        TEXT        NOT NULL,
  config      JSONB       NOT NULL DEFAULT '{}'::jsonb,
  exercises   JSONB       NOT NULL DEFAULT '[]'::jsonb,
  with_warmup BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX custom_workouts_user_idx ON public.custom_workouts(user_id);

ALTER TABLE public.custom_workouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own custom workouts"
  ON public.custom_workouts
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
