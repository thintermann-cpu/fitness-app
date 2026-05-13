-- The original time_of_day column had CHECK IN ('morning','day','evening')
-- because it served as the category field. After renaming to 'time' and adding
-- a separate 'category' column, this constraint must be dropped.
ALTER TABLE public.routines DROP CONSTRAINT IF EXISTS routines_time_of_day_check;
