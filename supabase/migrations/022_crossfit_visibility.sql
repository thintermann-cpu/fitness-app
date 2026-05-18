-- Migration 022: CrossFit WODs — nur Girls und Heroes sichtbar lassen
-- Alle anderen CrossFit WODs (Open, Benchmark, HomeWOD, etc.) auf is_visible = false

UPDATE wods
SET is_visible = false
WHERE wod_category = 'crossfit'
  AND name NOT IN (
    -- Girl WODs
    'Fran','Cindy','Grace','Helen','Annie','Karen','Barbara','Angie','Chelsea',
    'Diane','Elizabeth','Isabel','Jackie','Linda','Mary','Nancy','Amanda','Eva',
    'Kelly','Nicole',
    -- Hero WODs
    'Murph','DT','The Chief','Josh','JT','Badger','Nate','Whitten','Lazar',
    'Blake','Bell','Murph Vest','Weighted Murph','Griff','Ryan','Lumberjack 20',
    'Daniel','Hansen','Severin','Klepto','McGhee','Tommy Mac','Josh K','Ghost',
    'Zembiec','Loredo','Nutts','Chuck','Spehar','Arnie','Brad','Bradshaw','Bull',
    'Coe','Danny','Desforges','Forrest','Gator','Glen','Hollywood','Jake','Jason',
    'Khan','Luce','Mac','Manion','Michael','Moore','Nick','Omar','Patrick','Pheezy',
    'Tosh','Tucker','Tyler','Van Dam','Wes','Willy','Rankel','Wittman','Holleyman',
    'Holbrook','Litzen','Riggins','Payton','Kalsu','Rahoi','Hammer','Tisdale',
    'Wilson','Ship','Hicks','Brenton','Taylor','Scott','Strong','Thompson',
    'Zimmerman','Hotshots 19','Lobo','Webb','Sweeney','Gonzalez','Price'
  );
