-- Set bilateral=TRUE for known unilateral exercises (each side done separately)
UPDATE public.stretching_exercises
SET bilateral = TRUE
WHERE (name->>'en') ILIKE ANY (ARRAY[
  '%hip flexor%',
  '%pigeon%',
  '%lizard%',
  '%quad%',
  '%quadricep%',
  '%calf%',
  '%IT band%',
  '%figure 4%',
  '%figure-4%',
  '%hip opener%',
  '%standing hamstring%',
  '%lateral%'
]);

-- Set image_key based on exercise name + muscle_group
UPDATE public.stretching_exercises
SET image_key = CASE
  WHEN (name->>'en') ILIKE '%hip flexor%'                          THEN 'hip_flexor'
  WHEN (name->>'en') ILIKE '%pigeon%'                               THEN 'pigeon_pose'
  WHEN (name->>'en') ILIKE '%lizard%'                               THEN 'lizard_pose'
  WHEN (name->>'en') ILIKE '%quad%' OR (name->>'en') ILIKE '%quadricep%' THEN 'quad_stretch'
  WHEN (name->>'en') ILIKE '%calf%'                                 THEN 'calf_stretch'
  WHEN (name->>'en') ILIKE '%hamstring%'                            THEN 'hamstring'
  WHEN (name->>'en') ILIKE '%shoulder%'                             THEN 'shoulder'
  WHEN (name->>'en') ILIKE '%chest%'                                THEN 'chest'
  WHEN (name->>'en') ILIKE '%child%'                                THEN 'childs_pose'
  WHEN (name->>'en') ILIKE '%back%' OR (name->>'en') ILIKE '%spine%' THEN 'back'
  WHEN muscle_group = 'hip_flexors'                                 THEN 'hip_flexor'
  WHEN muscle_group = 'hamstrings'                                  THEN 'hamstring'
  WHEN muscle_group = 'quadriceps'                                  THEN 'quad_stretch'
  WHEN muscle_group = 'calves'                                      THEN 'calf_stretch'
  WHEN muscle_group = 'shoulders'                                   THEN 'shoulder'
  WHEN muscle_group = 'chest'                                       THEN 'chest'
  WHEN muscle_group IN ('back', 'lower_back')                       THEN 'back'
  WHEN muscle_group = 'upper_back'                                  THEN 'shoulder'
  ELSE 'generic'
END
WHERE image_key IS NULL;
