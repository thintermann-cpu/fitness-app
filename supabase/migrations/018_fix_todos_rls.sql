-- Defensive Re-Apply der todos-RLS (analog 013 für user_profiles)
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own todos" ON public.todos;

CREATE POLICY "Users manage own todos" ON public.todos
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
