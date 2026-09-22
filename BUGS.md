# CarveOut Bug-Queue

Format je Zeile: `- [Prio] Beschreibung`. Prio ist `Hoch`, `Mittel` oder `Niedrig` (ohne Tag = `Mittel`).

## Offen
- [Niedrig] `useWods`: `wods`-Query feuert beim Laden von `/workout` teils doppelt (Profil lädt nach, `userEquipment` ändert den Query-Key).
- [Mittel] Bestehende Ein-Übungs-Workouts aus der Datenbank bereinigen — destruktiv, braucht Freigabe von Tim. Erstellung von Ein-Übungs-Workouts bleibt erlaubt.
- [Niedrig] Workout-Liste zeigt bei mehreren Aufrufen identische Top-Einträge (`order('name')`). Würfel ist live; die Liste selbst bleibt namenssortiert.

## In Bearbeitung

## Erledigt
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
