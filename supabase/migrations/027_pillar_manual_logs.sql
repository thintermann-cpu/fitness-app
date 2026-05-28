CREATE TABLE IF NOT EXISTS public.pillar_manual_logs (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pillar     TEXT        NOT NULL CHECK (pillar IN ('workout', 'routine', 'stretching', 'meditation')),
  date       TEXT        NOT NULL,
  source     TEXT        NOT NULL DEFAULT 'manual',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, pillar, date)
);

ALTER TABLE public.pillar_manual_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own pillar_manual_logs" ON public.pillar_manual_logs;
CREATE POLICY "Users manage own pillar_manual_logs" ON public.pillar_manual_logs
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
