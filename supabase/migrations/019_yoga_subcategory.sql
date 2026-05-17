-- Yoga-Subcategory für Stretching-Übungen setzen (keyword-basiert)
-- name ist JSONB (dreisprachig) → ::text castet das gesamte JSON-Objekt als String
UPDATE stretching_exercises
SET subcategory = 'yoga'
WHERE LOWER(name::text) SIMILAR TO
  '%(warrior|downward|cobra|child|pigeon|cat cow|sun salutation|mountain pose|tree pose|triangle|bridge|seated|supine|savasana|lotus|chaturanga|upward dog|eagle|half moon|chair pose|yoga)%'
  AND (subcategory IS NULL OR subcategory != 'yoga');
