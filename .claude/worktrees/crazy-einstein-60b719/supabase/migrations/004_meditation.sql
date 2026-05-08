-- Meditationen (geführte Sessions)
CREATE TABLE public.meditations (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           JSONB NOT NULL,         -- {de, en, es}
  description    JSONB,                  -- {de, en, es}
  instructions   JSONB,                  -- {de, en, es} - Schritt-für-Schritt Text
  category       TEXT NOT NULL CHECK (category IN ('mindfulness', 'breathwork', 'body_scan', 'visualization', 'sleep', 'focus', 'stress_relief', 'morning', 'movement')),
  duration_min   INT NOT NULL,
  difficulty     TEXT NOT NULL DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  background_sound TEXT,                 -- key für Web Audio: 'rain', 'forest', 'waves', 'white_noise', 'bowl', 'silence'
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Breathwork Techniken
CREATE TABLE public.breathwork_techniques (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           JSONB NOT NULL,
  description    JSONB,
  inhale_sec     INT NOT NULL,
  hold_in_sec    INT NOT NULL DEFAULT 0,
  exhale_sec     INT NOT NULL,
  hold_out_sec   INT NOT NULL DEFAULT 0,
  cycles         INT NOT NULL DEFAULT 10,
  difficulty     TEXT NOT NULL DEFAULT 'beginner',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Meditation Logs
CREATE TABLE public.meditation_logs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meditation_id  UUID REFERENCES public.meditations(id),
  technique_id   UUID REFERENCES public.breathwork_techniques(id),
  session_type   TEXT NOT NULL CHECK (session_type IN ('meditation', 'breathwork', 'custom_timer')),
  duration_min   INT NOT NULL,
  completed_at   DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.meditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breathwork_techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditation_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read meditations" ON public.meditations FOR SELECT USING (true);
CREATE POLICY "Public read breathwork_techniques" ON public.breathwork_techniques FOR SELECT USING (true);
CREATE POLICY "Users own meditation logs" ON public.meditation_logs FOR ALL USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
