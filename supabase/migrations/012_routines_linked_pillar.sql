-- Add optional pillar link to routine items
ALTER TABLE routines ADD COLUMN IF NOT EXISTS linked_pillar VARCHAR NULL;
