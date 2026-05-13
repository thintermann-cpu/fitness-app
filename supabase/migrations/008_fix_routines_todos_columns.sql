-- Fix column names in routines and todos to match app code expectations.

-- routines: time_of_day → time, weekdays → active_days, add category
ALTER TABLE public.routines RENAME COLUMN time_of_day TO time;
ALTER TABLE public.routines RENAME COLUMN weekdays TO active_days;

ALTER TABLE public.routines
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'day';
ALTER TABLE public.routines
  DROP CONSTRAINT IF EXISTS routines_category_check;
ALTER TABLE public.routines
  ADD CONSTRAINT routines_category_check
  CHECK (category IN ('morning', 'day', 'evening'));

-- todos: title → text, is_completed → completed
ALTER TABLE public.todos RENAME COLUMN title TO text;
ALTER TABLE public.todos RENAME COLUMN is_completed TO completed;
