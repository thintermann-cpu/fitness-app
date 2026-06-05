ALTER TABLE public.wod_history
  ADD COLUMN IF NOT EXISTS exercises JSONB NOT NULL DEFAULT '[]'::jsonb;
