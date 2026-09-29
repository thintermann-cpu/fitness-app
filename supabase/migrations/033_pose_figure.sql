-- Which drawn figure mobility sessions show. Existing rows stay on the male set.
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS pose_figure text NOT NULL DEFAULT 'male';

ALTER TABLE public.user_profiles
  DROP CONSTRAINT IF EXISTS user_profiles_pose_figure_check;

ALTER TABLE public.user_profiles
  ADD CONSTRAINT user_profiles_pose_figure_check
  CHECK (pose_figure IN ('male', 'female'));
