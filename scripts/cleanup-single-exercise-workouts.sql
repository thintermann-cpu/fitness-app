-- Cleanup: bestehende Ein-Übungs-Workouts aus custom_workouts entfernen
-- Freigabe: 2026-09-29. Erstellung neuer Ein-Übungs-Workouts bleibt erlaubt.
--
-- Cutoff ist derselbe Zeitpunkt wie SINGLE_EXERCISE_CLEANUP_BEFORE in
-- apps/web/src/lib/customWorkouts.ts. Die App löscht betroffene eigene
-- Zeilen beim nächsten Laden. Dieses Skript räumt dieselben Zeilen für
-- alle User in einem Schritt auf (SQL-Editor, Rolle mit Bypass-RLS).
-- Nicht als Migration: ein späterer Lauf würde nichts mehr treffen, und
-- neu angelegte Ein-Übungs-Workouts liegen nach dem Cutoff.

-- Vorschau
SELECT
  id,
  user_id,
  name,
  mode,
  jsonb_array_length(exercises) AS exercise_count,
  created_at
FROM public.custom_workouts
WHERE jsonb_typeof(exercises) = 'array'
  AND jsonb_array_length(exercises) = 1
  AND created_at < timestamptz '2026-09-29 05:00:00+00'
ORDER BY created_at DESC;

SELECT COUNT(*) AS betroffene_workouts
FROM public.custom_workouts
WHERE jsonb_typeof(exercises) = 'array'
  AND jsonb_array_length(exercises) = 1
  AND created_at < timestamptz '2026-09-29 05:00:00+00';

-- Einmalig ausführen, nachdem die Vorschau geprüft ist.
DELETE FROM public.custom_workouts
WHERE jsonb_typeof(exercises) = 'array'
  AND jsonb_array_length(exercises) = 1
  AND created_at < timestamptz '2026-09-29 05:00:00+00';
