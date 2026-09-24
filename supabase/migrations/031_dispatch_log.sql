CREATE TABLE IF NOT EXISTS public.dispatch_log (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind        text NOT NULL,
  title       text,
  body        text,
  sent_count  integer NOT NULL DEFAULT 0,
  error_count integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.dispatch_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins read dispatch_log" ON public.dispatch_log;
CREATE POLICY "Admins read dispatch_log"
  ON public.dispatch_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'moderator')
    )
  );

DROP POLICY IF EXISTS "Admins read all feedback" ON public.feedback;
CREATE POLICY "Admins read all feedback"
  ON public.feedback FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.user_profiles p
      WHERE p.id = auth.uid() AND p.role IN ('admin', 'moderator')
    )
  );
