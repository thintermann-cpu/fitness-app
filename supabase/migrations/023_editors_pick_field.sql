-- Migration 023: is_editors_pick Spalte + Index sicherstellen
-- Spalte existiert bereits via Migration 010; IF NOT EXISTS macht es idempotent
ALTER TABLE wods ADD COLUMN IF NOT EXISTS is_editors_pick boolean DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_wods_editors_pick ON wods(is_editors_pick) WHERE is_editors_pick = true;
