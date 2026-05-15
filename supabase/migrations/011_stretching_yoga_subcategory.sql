-- Add subcategory to stretching tables
ALTER TABLE stretching_exercises ADD COLUMN IF NOT EXISTS subcategory VARCHAR NULL;
ALTER TABLE stretching_routines  ADD COLUMN IF NOT EXISTS subcategory VARCHAR NULL;

-- Seed: mark yoga routines (name contains "yoga" in any language)
UPDATE stretching_routines
SET subcategory = 'yoga'
WHERE
  name->>'de' ILIKE '%yoga%' OR
  name->>'en' ILIKE '%yoga%' OR
  name->>'es' ILIKE '%yoga%';
