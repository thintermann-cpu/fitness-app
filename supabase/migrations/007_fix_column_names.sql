-- Fix column names to match app code expectations.
-- daily_logs: log_date → date (TEXT)
-- routine_logs: completed_at → date (TEXT), add completed BOOLEAN

-- daily_logs
ALTER TABLE public.daily_logs RENAME COLUMN log_date TO date;
ALTER TABLE public.daily_logs ALTER COLUMN date TYPE TEXT USING date::TEXT;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'daily_logs' AND constraint_name = 'daily_logs_user_id_date_key'
  ) THEN
    ALTER TABLE public.daily_logs ADD CONSTRAINT daily_logs_user_id_date_key UNIQUE (user_id, date);
  END IF;
END $$;

-- routine_logs
ALTER TABLE public.routine_logs RENAME COLUMN completed_at TO date;
ALTER TABLE public.routine_logs ALTER COLUMN date TYPE TEXT USING date::TEXT;

ALTER TABLE public.routine_logs
  ADD COLUMN IF NOT EXISTS completed BOOLEAN NOT NULL DEFAULT FALSE;

-- existing rows represent completions
UPDATE public.routine_logs SET completed = TRUE WHERE date IS NOT NULL;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'routine_logs' AND constraint_name = 'routine_logs_user_id_routine_id_date_key'
  ) THEN
    ALTER TABLE public.routine_logs
      ADD CONSTRAINT routine_logs_user_id_routine_id_date_key UNIQUE (user_id, routine_id, date);
  END IF;
END $$;
