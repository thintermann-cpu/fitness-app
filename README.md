# Fitness App

Eine modulare Fitness-Plattform, die verschiedene Trainings-Apps unter einem Dach vereint. Das Projekt entsteht schrittweise und folgt den vier Säulen eines ganzheitlichen Fitness-Ansatzes.

---

## Die 4 Pillars

| Pillar | Beschreibung |
|---|---|
| **WOD Tracker** | CrossFit Workouts verfolgen — 399 WODs, Timer, KI-Generierung, Multi-User, PWA |
| **Mein Tag** | Tagesplanung & Gewohnheiten — Schlaf, Ernährung, Stimmung, Fortschritt |
| **Ernährung** | Mahlzeiten & Makros tracken *(geplant)* |
| **Recovery** | Schlaf, HRV, Regeneration *(geplant)* |

---

## Projektstruktur

```
fitness-app/
├── wod-tracker/        # CrossFit WOD Tracker (Vanilla JS, PWA)
├── mein-tag/           # Mein Tag App (in Entwicklung)
├── app/                # Geplanter React/Vite Rebuild (leer)
└── README.md
```

---

## Tech Stack

### Aktuell
- **Vanilla JavaScript** (kein Framework, kein Build-Schritt)
- **React via CDN** (babel-standalone, direkt im Browser)
- **PWA** — Service Worker, Web App Manifest
- **Lokaler Speicher** — localStorage, kein Backend

### Geplant (Rebuild)
- **React + Vite** — modernes Build-System, schnelle Dev-Umgebung
- **Tailwind CSS** — Utility-First Styling
- **Supabase** — Backend as a Service (Auth, Datenbank, Realtime)
- **Netlify / Vercel** — Hosting & CI/CD

---

## Lokale Entwicklung

```bash
# WOD Tracker direkt im Browser öffnen
open wod-tracker/index.html

# Oder mit einem lokalen Dev-Server (z.B. VS Code Live Server)
```

---

## Features WOD Tracker

- 399 CrossFit WODs (AMRAP, EMOM, For Time, Tabata, …)
- Eingebauter Timer mit Countdown & Intervallen
- KI-generierte WODs via Claude API
- Multi-User mit PIN-Schutz
- Offline-fähig (PWA, installierbar)
- Backup & Restore
- Filter & Suche
