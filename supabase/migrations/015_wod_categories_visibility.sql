-- WOD Kategorien, Sichtbarkeit + User Goal

-- wods: neues Kategorie-Feld (Trainings-Stil)
ALTER TABLE wods ADD COLUMN IF NOT EXISTS wod_category text DEFAULT 'crossfit';
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'wods_wod_category_check'
  ) THEN
    ALTER TABLE wods ADD CONSTRAINT wods_wod_category_check
      CHECK (wod_category IN ('crossfit', 'hiit', 'kraft_ausdauer', 'kraft_auf_zeit'));
  END IF;
END $$;

-- wods: Soft-Delete Flag
ALTER TABLE wods ADD COLUMN IF NOT EXISTS is_visible boolean NOT NULL DEFAULT true;

-- Performance-Indizes
CREATE INDEX IF NOT EXISTS idx_wods_wod_category ON wods(wod_category);
CREATE INDEX IF NOT EXISTS idx_wods_is_visible    ON wods(is_visible);

-- user_profiles: Ziel-Feld
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS goal text;
