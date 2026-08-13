-- Cleanup: Ein-Übungs-Workouts aus custom_workouts entfernen
-- Bug-Queue-Eintrag: BUGS.md, "## Offen" (manueller DB-Eingriff, NICHT automatisiert)
--
-- Zweck: bestehende Custom Workouts mit genau 1 Übung löschen (Eintönigkeit
-- vermeiden). Erstellung neuer Ein-Übungs-Workouts bleibt weiterhin erlaubt —
-- dieses Skript räumt nur den aktuellen Datenbestand auf, es ist kein
-- Schema-Fix und keine Migration.
--
-- WICHTIG: Erst Schritt 1 ausführen und Ergebnis prüfen. Schritt 2 (DELETE)
-- nur nach expliziter Freigabe von Tim ausführen — betrifft ggf. Daten
-- mehrerer User.

-- ============================================================
-- Schritt 1: Vorschau — zeigt alle betroffenen Zeilen (read-only)
-- ============================================================
SELECT
  id,
  user_id,
  name,
  mode,
  jsonb_array_length(exercises) AS exercise_count,
  created_at
FROM public.custom_workouts
WHERE jsonb_array_length(exercises) = 1
ORDER BY created_at DESC;

-- Kurzfassung: nur die Anzahl
SELECT COUNT(*) AS betroffene_workouts
FROM public.custom_workouts
WHERE jsonb_array_length(exercises) = 1;

-- ============================================================
-- Schritt 2: Löschen — ERST NACH FREIGABE auskommentieren + ausführen
-- ============================================================
-- DELETE FROM public.custom_workouts
-- WHERE jsonb_array_length(exercises) = 1;
