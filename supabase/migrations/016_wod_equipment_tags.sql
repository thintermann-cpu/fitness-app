-- Equipment-Tags für WODs (wird via Auto-Tagging-Skript befüllt)
ALTER TABLE wods ADD COLUMN IF NOT EXISTS equipment_tags text[] NOT NULL DEFAULT '{}';
CREATE INDEX IF NOT EXISTS idx_wods_equipment_tags ON wods USING GIN(equipment_tags);
