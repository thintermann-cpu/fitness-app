-- Bestehende Constraints entfernen (beide mögliche Namen)
ALTER TABLE wods DROP CONSTRAINT IF EXISTS wods_wod_category_check;
ALTER TABLE wods DROP CONSTRAINT IF EXISTS wods_category_check;

-- Neuer CHECK-Constraint mit allen 5 Kategorien
ALTER TABLE wods ADD CONSTRAINT wods_wod_category_check
  CHECK (wod_category IN ('crossfit', 'hiit', 'kraft_ausdauer', 'kraft_wenig_zeit', 'krafttraining'));

-- Umbenennung: kraft_auf_zeit → kraft_wenig_zeit
UPDATE wods SET wod_category = 'kraft_wenig_zeit' WHERE wod_category = 'kraft_auf_zeit';
