-- ============================================================
-- Migration: Add role column to user_profiles + Admin RLS
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. Add role column (safe: does nothing if already exists)
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS role TEXT
  DEFAULT 'user'
  CHECK (role IN ('admin', 'moderator', 'user'));

-- 2. Add subscription_status column if missing
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS subscription_status TEXT;

-- ============================================================
-- RLS Policies for admin access
-- ============================================================

-- Allow admins/moderators to read ALL user profiles
-- (normal users can only read their own row via existing policy)
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.user_profiles;
CREATE POLICY "Admins can read all profiles"
  ON public.user_profiles
  FOR SELECT
  USING (
    (
      SELECT role FROM public.user_profiles WHERE id = auth.uid()
    ) IN ('admin', 'moderator')
  );

-- ============================================================
-- Set your first admin user
-- Replace the email address below
-- ============================================================

-- UPDATE public.user_profiles
-- SET role = 'admin'
-- WHERE id = (
--   SELECT id FROM auth.users WHERE email = 'your-email@example.com'
-- );
