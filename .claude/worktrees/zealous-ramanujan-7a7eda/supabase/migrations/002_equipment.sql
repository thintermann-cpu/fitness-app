ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS equipment TEXT[] DEFAULT ARRAY[]::TEXT[];
