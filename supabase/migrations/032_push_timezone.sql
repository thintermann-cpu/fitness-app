-- City label plus IANA timezone for reminder clocks.
-- Existing rows stay on Europe/Zurich until the person picks a city.

ALTER TABLE public.push_preferences
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'Europe/Zurich';
