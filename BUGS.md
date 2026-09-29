# CarveOut Bug-Queue

Format je Zeile: `- [Prio] Beschreibung`. Prio ist `Hoch`, `Mittel` oder `Niedrig` (ohne Tag = `Mittel`).

## Offen

## In Bearbeitung

## Erledigt
- [Niedrig] `useWods`: `wods`-Query doppelt, weil `userEquipment` nach dem Profil den Key ändert. Query startet erst, wenn das Profil da ist; Equipment im Key ist sortiert. Branch `cursor/fix-open-bugs-841f`.
- [Mittel] Bestehende Ein-Übungs-Workouts vor dem 29.09.2026 05:00 UTC werden beim Laden der eigenen Workouts gelöscht. Neue Ein-Übungs-Workouts bleiben. Globales SQL liegt in `scripts/cleanup-single-exercise-workouts.sql` (dieses Environment hat keinen Zugriff auf die CarveOut-Datenbank). Branch `cursor/fix-open-bugs-841f`.
- [Niedrig] Workout-Liste immer dieselben Top-Einträge (`order('name')`). Liste ist pro Tab-Session gemischt (`wod_list_order_seed`), „Mehr laden“ bleibt in dieser Reihenfolge. Würfel bleibt zufällig. Branch `cursor/fix-open-bugs-841f`.
- [Mittel] Stripe Return-URL verloren — `success_url` jetzt `/settings?checkout=success`; `/profile` leitet Query mit. Branch `cursor/fix-stripe-dice-sidebar-toggle-a5fc`.
- [Niedrig] Würfel (`pickRandomWod`) nur lokales JSON — live Supabase via `fetchMatchingWods`. Branch `cursor/fix-stripe-dice-sidebar-toggle-a5fc`.
- [Niedrig] Sidebar nested `<a>` + Achtsamkeit 🧠 — ein Link `/settings`, Icon 🧘 (Sidebar + BottomNav). Branch `cursor/fix-stripe-dice-sidebar-toggle-a5fc`.
- [Mittel] Equipment-Toggle vs Home-Kachel — `effectiveLocation` bei „Alle anzeigen“. Branch `cursor/fix-stripe-dice-sidebar-toggle-a5fc`.
- [Mittel] Equipment-Filter auf dem Supabase-Programm-Pfad ignoriert (`forceSupabase`) — Fix: voller Programm-Satz, dann `applyLocalFilters`. Branch `cursor/fix-wod-detail-null-equipment-a5fc`.
- [Niedrig] `WodCard` `<button>` um `FavoriteButton` `<button>` — FavoriteButton sitzt nicht mehr im Card-Button.
- [Hoch] WOD-Detail crasht bei `equipment=null` — `mapRawToWod` Dual-Schema. Branch `cursor/fix-wod-detail-null-equipment-a5fc`.
- [Hoch] Custom Workout mit "mit Warmup" wird nicht gespeichert — live nicht mehr reproduzierbar (`1779794` / `dfc840b`).
- [Hoch] History-Tab lädt endlos — live nicht mehr reproduzierbar (`dfc840b`).
- [Hoch] Inkonsistente Filter-Trefferzahlen bei Programm-Filtern — Timeout 8s + kein stiller JSON-Fallback bei `forceSupabase`.
- [Hoch] Main-Thread-Freeze bei Workout-Detail — Auth-Lock Timeout, Commit `c45da68`.

## Spec-Updates ausstehend
- Keine (Session AV: Spec an Code angeglichen).
