ALTER TABLE public.stretching_exercises ADD COLUMN IF NOT EXISTS bilateral BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.stretching_exercises ADD COLUMN IF NOT EXISTS image_key TEXT;
