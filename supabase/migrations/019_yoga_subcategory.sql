-- Yoga-Subcategory für Stretching-Übungen setzen (keyword-basiert)
UPDATE stretching_exercises
SET subcategory = 'yoga'
WHERE LOWER(name) SIMILAR TO
  '%(warrior|downward|cobra|child|pigeon|cat cow|sun salutation|mountain pose|tree pose|triangle|bridge|seated|supine|savasana|lotus|chaturanga|upward dog|eagle|half moon|chair pose|yoga)%'
  AND (subcategory IS NULL OR subcategory != 'yoga');

-- Exercises die schon "yoga" im Namen haben
UPDATE stretching_exercises
SET subcategory = 'yoga'
WHERE LOWER(name) LIKE '%yoga%'
  AND (subcategory IS NULL OR subcategory != 'yoga');
