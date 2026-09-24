-- Formal record of push_preferences.
-- The table was created manually in the dashboard and also sketched in
-- add_push_subscriptions.sql. This migration is the numbered source of truth.

CREATE TABLE IF NOT EXISTS public.push_preferences (
  id                 UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            UUID        REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  morning_enabled    BOOLEAN     DEFAULT TRUE,
  evening_enabled    BOOLEAN     DEFAULT TRUE,
  wod_enabled        BOOLEAN     DEFAULT FALSE,
  inactivity_enabled BOOLEAN     DEFAULT TRUE,
  morning_time       TEXT        DEFAULT '07:00',
  evening_time       TEXT        DEFAULT '21:00',
  wod_time           TEXT        DEFAULT '12:00',
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.push_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own push preferences" ON public.push_preferences;
CREATE POLICY "Users manage own push preferences"
  ON public.push_preferences
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
