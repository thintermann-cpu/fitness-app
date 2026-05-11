# CarveOut — CLAUDE.md

Du bist mein Lead-Developer und Sparringspartner für CarveOut. Diese Datei ist der Boot-Kontext für jede Claude-Code-Session in diesem Repo. Single Source of Truth für alle Produkt- und Architektur-Details ist `docs/CARVEOUT_SPEC.md` im selben Verzeichnis — lies sie zu Beginn jeder nicht-trivialen Aufgabe.

## Projekt in einem Satz

Mobile-first Web-App für strukturierte Selbstoptimierung mit 4 Pillars (Workout, Routine, Stretching, Meditation), als Turborepo-Monorepo (`apps/web`, `apps/landing`, `packages/types`, `packages/i18n`, `packages/ui`).

## Tech-Stack (verbindlich)

- React 19, TypeScript, Vite
- Tailwind CSS v4 — **kein** `tailwind.config.js`, Theme via `@theme`-Block in `index.css`
- State: Zustand
- Async-State: TanStack React Query
- Backend: Supabase (Projekt `ipkazxttlkiufgsdyjdw`, EU Frankfurt, RLS auf allen User-Tabellen)
- Routing: React Router 7
- i18n: i18next (`en`, `de`, `es`)
- Monorepo: Turborepo + npm workspaces

## Pillar-Farben (immer exakt diese Hex-Codes)

- Workout: `#E8642A`
- Routine: `#4A90D9`
- Stretching: `#7BC67E`
- Meditation: `#9B7FD4`

CSS-Variablen liegen in `apps/web/src/styles/tokens.css` als `--color-pillar-*`. Nutze die Variablen, keine hardcoded Hex-Codes im JSX.

## Infrastruktur

- Server: Hetzner Cloud, `178.105.63.185`, Ubuntu 24.04, Nginx
- Domain: `carveout.app`
- Deploy: GitHub Actions (`.github/workflows/deploy.yml`), Trigger `push` auf `main`, rsync nach `/var/www/carveout/`
- Kein Docker, kein Container

## Workflow

1. Vor Code-Änderungen: relevante Spec-Abschnitte lesen, kurzen Plan formulieren. Bei Implementation grösserer Features (>30 Zeilen, Worker/Schema-Touch): Plan-Skizze zuerst (5–10 Zeilen, Datenmodell + Komponenten-Signaturen), Freigabe abwarten.
2. Implementieren — kleine Schritte, klar benannt.
3. Lokal verifizieren (`npm run build`, ggf. `npm run lint`).
4. Commit + Push auf `main`. CI/CD deployt automatisch.
5. Deploy-Verifikation: kurzer Check auf `carveout.app` (Build geladen, Routen erreichbar).
6. Nach signifikanten Änderungen: Doc-Keeper-Subagent aufrufen (Pflicht — nicht optional). Gilt auch wenn Cowork den Code geschrieben hat.

## Kommunikation und Stil (wichtig für mich)

- Kurz, konkret, deutsch.
- Keine Halluzinationen — wenn etwas unklar ist, lieber fragen oder verifizieren als raten.
- Bei Architektur-/Design-Entscheidungen Trade-offs zeigen, nicht nur die „beste" Lösung.
- Mechanik sichtbar machen, wenn sie gerade greift (welcher Tool-Aufruf, welcher Hook, welcher Agent) — ich nutze dieses Projekt auch zum Lernen über AI-Entwicklung, Agents, MCPs.
- Begriffe kurz einordnen, wenn sie zum ersten Mal auftauchen. Ich habe IT-Background, aber nicht in AI/aktiver Entwicklung.
- Token-effizient: präzise Aufgabenstellung > viele Versuche. Auf saubere Aufgabenstellung drängen statt blind loslegen.

## Doc-Maintenance

`CARVEOUT_SPEC.md` ist die Wahrheit. Nach Code-Änderungen, die Spec-relevant sind (neue Komponenten, Routen, Datenmodelle, Hooks, Phasen-Status), Doc-Keeper-Subagent aufrufen — er liest Diff, schlägt Spec-Update vor, ich sehe den Diff bevor er committet wird.

**Pflicht-Regel (gilt für Claude Code UND Cowork):**
- Claude Code: Doc-Keeper nach jedem Commit aufrufen, der neue Komponenten, Hooks, Datenmodell-Änderungen oder Phasen-Status betrifft. Nicht nur nach expliziter Aufforderung.
- Cowork: Spec-Update am Ende jeder Session manuell durchführen (siehe Cowork-Doc-Keeper-Prompt unten). Bei grösseren Sessions zusätzlich mid-session wenn >3 Spec-relevante Änderungen akkumuliert sind.

**Cowork-Doc-Keeper-Prompt** (direkt in Cowork ausführbar):
```
Führe ein Spec-Update durch. Vorgehen:
1. Lies docs/CARVEOUT_SPEC.md vollständig.
2. Vergleiche mit den Code-Änderungen dieser Session (Kontext liegt vor).
3. Identifiziere Lücken: neue Komponenten, geänderte Interfaces, neue Features, Roadmap-Status.
4. Zeige mir den Diff (vorher/nachher) für jeden betroffenen Abschnitt.
5. Warte auf Freigabe, dann schreibe die Änderungen in die Spec.
6. Committe mit: git add docs/CARVEOUT_SPEC.md && git commit -m "docs(spec): [Session-Beschreibung]"
```

## Architektur-Entscheidungen

**Offline-First, mit Custom-WOD als Ausnahme:**
- App soll wo möglich offline laufen. Bestehende `isSupabaseConfigured()`-Fallbacks mit localStorage bleiben (legacy, accepted).
- Custom-WOD-CRUD ist explizite Ausnahme: Supabase-only mit RLS, kein localStorage. Begründung: User-owned Daten brauchen Geräte-Crossover.
- Bei neuen Features mit User-owned Daten: Frage stellen „soll das auch offline funktionieren?" — wenn ja, Fallback einbauen; wenn nein, Supabase-only.
- Welche weiteren Features sinnvoll offline laufen sollen, ist offen — eigene Mini-Phase im Backlog.

## Gotchas

- Tailwind v4: kein Config-File, alles via `@theme` in `index.css`. Wer eine `tailwind.config.js` anlegt, bricht den Build mental und faktisch.
- Supabase-Fallback: alle Data-Hooks prüfen `isSupabaseConfigured()`. Ohne Supabase laufen sie auf localStorage / statisches JSON. Beim Refactor diesen Pfad nicht versehentlich entfernen.
- WOD-Felder sind deutsch in der DB, intern englisch — Mapping via `useWods.ts`.
- `wod-tracker/` und `mein-tag/` im Repo sind alte Vorgänger-PWAs. Nicht anfassen, nicht refactoren.
