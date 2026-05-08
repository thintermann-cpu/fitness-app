# CarveOut — Technische Zusammenfassung

**Intern / Stand: Mai 2026**

---

## 1. App-Überblick

CarveOut ist eine mobile-first Web-App für strukturierte Selbstoptimierung. Zielgruppe: Erwachsene (25–45), die Fitness, Tagesroutinen und mentale Balance in einer App zusammenführen wollen — ohne Abo-Chaos oder Datensilos.

Das Produkt basiert auf **4 Pillars** (Domänen), die einzeln freischaltbar sind:

| Pillar | Farbe | Funktion |
|---|---|---|
| **Workout** | `#E8642A` Orange | WOD-Datenbank (803 CrossFit-WODs), Timer (AMRAP/ForTime/EMOM/Tabata), History, Highscores |
| **Routine** (My Day) | `#4A90D9` Blau | Tagesroutinen, To-dos, Wochenübersicht, Wassertracker, Mood-Check |
| **Stretching** | `#7BC67E` Grün | geplant (Phase 4) |
| **Meditation** | `#9B7FD4` Lila | geplant (Phase 5) |

Migrations-Hintergrund: Rebuild aus zwei Vorgänger-Apps (`wod-tracker/` Vanilla-JS-PWA mit ServiceWorker, `mein-tag/` v1.4.0 HTML). Beide Ordner liegen noch im Repo und bleiben unberührt.

---

## 2. Architektur

### Monorepo (Turborepo + npm Workspaces)

```
carveout/
├── apps/
│   ├── web/          # Haupt-React-App (@carveout/web)
│   └── landing/      # Landingpage — Placeholder (Phase 6)
├── packages/
│   ├── types/        # Shared TypeScript-Typen (@carveout/types)
│   ├── i18n/         # i18next-Setup + Locales (@carveout/i18n)
│   └── ui/           # Shared Components — Placeholder (@carveout/ui)
├── turbo.json
├── package.json      # Root-Workspace-Config
├── setup-server.sh   # Server-Provisioning-Skript
└── .github/
    └── workflows/
        └── deploy.yml
```

**turbo.json Tasks:**
- `build` → abhängig von `^build`, Output: `dist/**`
- `dev` → kein Cache, persistent
- `lint` → abhängig von `^lint`

### apps/web — Interne Struktur

```
apps/web/src/
├── App.tsx                    # Routing + Route Guards (ProtectedLayout / AuthLayout)
├── main.tsx                   # React-Root
├── index.css                  # Tailwind-Import + @theme-Block
├── styles/tokens.css          # CSS Custom Properties (Pillar-Farben, Spacing, Radius)
├── lib/
│   └── supabase.ts            # Supabase-Client + isSupabaseConfigured()
├── store/
│   └── authStore.ts           # Zustand-Store: user, session, loading; signIn/signUp/signOut/initialize
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── OnboardingPage.tsx     # Pillar-Auswahl, Primary Pillar, Theme
│   ├── WorkoutPage.tsx        # Tabs: WODs / Timer / History
│   └── RoutinePage.tsx        # Tabs: Routinen / Todo / Woche
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx       # Layout mit <Outlet />, aktiver Pillar als Context
│   │   └── BottomNav.tsx      # Tab-Navigation, hebt aktiven Pillar hervor
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── workout/
│   │   ├── WodCard.tsx
│   │   ├── WodList.tsx
│   │   ├── WodDetail.tsx
│   │   ├── TimerView.tsx      # Nutzt timer.worker.js
│   │   ├── WodHistoryList.tsx
│   │   └── ScoreInput.tsx
│   └── routine/
│       ├── RoutineItem.tsx
│       ├── RoutineList.tsx
│       ├── WaterTracker.tsx
│       ├── MoodCheck.tsx
│       ├── TodoList.tsx
│       └── WeekView.tsx
├── hooks/
│   ├── useRoutines.ts         # CRUD Routinen
│   ├── useRoutineLogs.ts      # Completion-Logs
│   ├── useDailyLog.ts         # Tages-Mood, Wasser
│   ├── useTodos.ts            # To-do-Liste
│   ├── useWods.ts             # Supabase oder /wods.json Fallback
│   ├── useWodHistory.ts       # localStorage + Supabase Dual-Write, personalBest
│   └── useHighscores.ts       # Top-10 pro WOD (Supabase oder local)
└── public/
    ├── wods.json              # 803 WODs (aus wod-tracker migriert)
    ├── timer.worker.js        # Drift-korrigierter Web Worker
    ├── favicon.svg
    └── icons.svg
```

**Routing (App.tsx):**
```
/login, /register              → AuthLayout (kein Auth nötig)
/ → AppShell (ProtectedLayout)
  /onboarding
  /workout
  /workout/:wodName
  /routine
  /stretching
  /meditation
  /settings
```

### Fallback-Logik (`isSupabaseConfigured`)

Alle Data-Hooks prüfen `!supabaseUrl.includes('placeholder')`. Wenn Supabase nicht konfiguriert ist, laufen sie auf localStorage / statisches JSON zurück. Dadurch ist die App ohne Supabase-Setup lauffähig.

---

## 3. Tech Stack

| Bereich | Technologie | Version |
|---|---|---|
| Framework | React | 19.2.5 |
| Bundler | Vite | 8.0.10 |
| Sprache | TypeScript | ~6.0.2 |
| Styling | Tailwind CSS | 4.2.4 (kein `tailwind.config.js`, nutzt `@theme`) |
| Routing | React Router | 7.14.2 |
| State | Zustand | 5.0.13 |
| Async State | TanStack React Query | 5.100.9 |
| Backend | Supabase JS | 2.105.3 |
| i18n | i18next + react-i18next | 26.0.8 / 17.0.6 |
| Monorepo | Turborepo | 2.9.9 |
| Hintergrund-Timer | Web Workers | nativ |
| Linting | ESLint + TypeScript | — |
| Node.js | (CI/Server) | 20 LTS |

**WOD-Felder (Deutsch → Intern):** `typ→type`, `kategorie→category`, `beschreibung→description`, `uebungen→exercises`, `dauer→estimated_minutes`, `schwierigkeit→difficulty`

---

## 4. Backend — Supabase

**Projekt:** `ipkazxttlkiufgsdyjdw`  
**Region:** EU Frankfurt (`eu-central-1`)  
**Auth:** Supabase Auth (Email/Password; JWT)  
**Datenbank:** PostgreSQL mit Row Level Security (RLS) auf allen User-Tabellen

### Tabellen

| Tabelle | Beschreibung |
|---|---|
| `user_profiles` | Nutzer-Metadaten: language, activePillars, primaryPillar, colorTheme, subscriptionStatus, trialEndsAt |
| `routines` | Routinen eines Nutzers (Name, Beschreibung, Pillar, Uhrzeit, Wochentage) |
| `routine_logs` | Completion-Einträge pro Routine + Datum |
| `todos` | To-do-Liste pro Nutzer + Datum |
| `daily_logs` | Tageseinträge: Mood, Wasserkonsum, Notizen |
| `wods` | WOD-Stammdaten (803 Einträge, statisch, read-only für Users) |
| `wod_history` | Workout-Logs pro Nutzer (WOD, Score, Datum, Notizen) |
| `feedback` | In-App-Feedback / Bug-Reports |

DDL + RLS für `wods` und `wod_history`: `supabase/seed-wods.sql`

### TypeScript-Typen (packages/types)

```typescript
type PillarId = 'workout' | 'routine' | 'stretching' | 'meditation'
type Language = 'en' | 'de' | 'es'
type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled'

interface UserProfile {
  id: string
  email: string
  language: Language
  activePillars: PillarId[]
  primaryPillar: PillarId
  colorTheme: string
  subscriptionStatus: SubscriptionStatus
  trialEndsAt: string | null
  createdAt: string
}
```

---

## 5. Infrastruktur

### Server

| Eigenschaft | Wert |
|---|---|
| Anbieter | Hetzner Cloud |
| IP | `178.105.63.185` |
| OS | Ubuntu 24.04 LTS |
| Webserver | Nginx |
| SSL | Let's Encrypt (Certbot) |
| Domain | `carveout.app`, `www.carveout.app` |
| Webroot | `/var/www/carveout/` |

**Nginx-Konfiguration:**
- SPA-Routing: `try_files $uri $uri/ /index.html`
- Asset-Caching: 1 Jahr für `*.js`, `*.css`, `*.woff2`, Bilder
- Gzip-Kompression aktiviert

**Firewall (UFW):** SSH, HTTP (80), HTTPS (443)

### CI/CD (.github/workflows/deploy.yml)

Trigger: `push` auf `main`

```
1. Checkout
2. Node.js 20 setup (npm cache)
3. npm ci (root)
4. cd apps/web && npm run build
5. rsync dist/ → Server:/var/www/carveout/
   (via DEPLOY_SSH_KEY + DEPLOY_HOST Secrets)
6. nginx -s reload (via SSH)
```

Kein Container, kein Docker — direktes rsync des Vite-Build-Outputs.

---

## 6. Internationalisierung (packages/i18n)

Sprachen: `en`, `de`, `es`  
Init: `initI18n(language: Language)` — konfiguriert i18next mit den passenden Ressourcen.

Namespace-Schlüssel: `app`, `nav`, `pillars`, `onboarding`, `common`

---

## 7. Geplante Integrationen

| Integration | Zweck | Status |
|---|---|---|
| **Garmin Connect API** | Sync Workout-Daten, HRV, Recovery | geplant |
| **Apple Health** | Read/Write für Workouts, Activity, Schlaf | geplant |
| **Stripe Subscriptions** | Freemium → Pro-Upgrade, Trial-Management | geplant |
| **Push Notifications** | Routine-Erinnerungen, WOD of the Day | geplant |

---

## 8. Roadmap-Status

### Abgeschlossen

| Phase | Inhalt |
|---|---|
| **Phase 0** | Turborepo-Scaffold, packages/types, packages/i18n, packages/ui (Stub), CI/CD-Pipeline, Server-Setup-Skript |
| **Phase 1** | Supabase-Client, Zustand Auth-Store, Login/Register/Onboarding-Pages, AppShell + BottomNav, Button/Card/Input-Components, Route Guards |
| **Phase 2** | Routine-Pillar (RoutinePage, hooks: useRoutines/useRoutineLogs/useDailyLog/useTodos, Komponenten: RoutineList/WaterTracker/MoodCheck/TodoList/WeekView) |
| **Phase 3** | Workout-Pillar (WorkoutPage, 803 WODs, drift-korrigierter Web Worker Timer, alle WOD-Komponenten, Supabase-DDL für wods + wod_history) |

### Offen

| Phase | Inhalt |
|---|---|
| **Phase 4** | Stretching-Pillar — Grün `#7BC67E` |
| **Phase 5** | Meditation-Pillar — Lila `#9B7FD4` |
| **Phase 6** | apps/landing — Landingpage |
| **Phase 7** | Garmin Connect, Apple Health, Stripe, Push Notifications |
| **laufend** | packages/ui befüllen, packages/types erweitern, E2E-Tests |

---

*Letzte Aktualisierung: Mai 2026 — Tim*
