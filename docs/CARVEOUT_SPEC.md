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
| **Stretching** | `#7BC67E` Grün | 65 dreisprachige Übungen, 18 Routinen, Guided Session mit Progress-Ring + Timer, bilateral support, History + Supabase-Sync |
| **Meditation** | `#9B7FD4` Lila | 20 geführte Meditationen (7 Kategorien), 8 Breathwork-Techniken, Custom Presets, Web Audio API, Custom Timer |

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
├── App.tsx                    # Routing + Route Guards (ProtectedLayout / AuthLayout / AdminRoute)
├── main.tsx                   # React-Root
├── index.css                  # Tailwind-Import + @theme-Block
├── styles/tokens.css          # CSS Custom Properties (Pillar-Farben, Spacing, Radius)
├── lib/
│   ├── supabase.ts            # Supabase-Client + isSupabaseConfigured()
│   └── push.ts                # Push Notification Helpers (subscribeToPush, unsubscribeFromPush)
├── store/
│   └── authStore.ts           # Zustand-Store: user, session, loading, profile; signIn/signUp/signOut/initialize/fetchProfile/updateProfile; WorkoutLocation + DEFAULT_EQUIPMENT_BY_LOCATION + equipment_by_location
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── OnboardingPage.tsx     # Pillar-Auswahl, Primary Pillar, Theme
│   ├── WorkoutPage.tsx        # Tabs: WODs / Timer / History
│   ├── RoutinePage.tsx        # Tabs: Routinen / Todo / Woche
│   ├── StretchingPage.tsx     # Stretching-Pillar (Phase 4)
│   ├── MeditationPage.tsx     # Meditation-Pillar (Phase 5)
│   └── admin/
│       ├── AdminDashboardPage.tsx
│       ├── AdminUsersPage.tsx
│       ├── AdminTasksPage.tsx
│       └── AdminPlaceholderPage.tsx
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx       # Layout mit <Outlet />, aktiver Pillar als Context
│   │   ├── BottomNav.tsx      # Tab-Navigation, hebt aktiven Pillar hervor (versteckt ab lg)
│   │   ├── Sidebar.tsx        # Desktop-Sidebar (240px, sichtbar ab lg-Breakpoint)
│   │   └── AdminLayout.tsx    # Layout-Wrapper für /admin/*
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── workout/
│   │   ├── WodCard.tsx
│   │   ├── WodList.tsx
│   │   ├── WodDetail.tsx
│   │   ├── TimerView.tsx      # Nutzt timer.worker.js; AMRAP/ForTime/EMOM/Tabata konfigurierbar
│   │   ├── WodHistoryList.tsx
│   │   └── ScoreInput.tsx
│   ├── routine/
│   │   ├── RoutineItem.tsx
│   │   ├── RoutineList.tsx
│   │   ├── WaterTracker.tsx
│   │   ├── MoodCheck.tsx
│   │   ├── TodoList.tsx
│   │   └── WeekView.tsx
│   ├── stretching/            # Alle Stretching-Komponenten
│   ├── meditation/            # Alle Meditation-Komponenten
│   └── AdminRoute.tsx         # Role-Guard (admin/moderator)
├── hooks/
│   ├── useRoutines.ts         # CRUD Routinen
│   ├── useRoutineLogs.ts      # Completion-Logs
│   ├── useDailyLog.ts         # Tages-Mood, Wasser
│   ├── useTodos.ts            # To-do-Liste
│   ├── useWods.ts             # Supabase oder /wods.json Fallback
│   ├── useWodHistory.ts       # localStorage + Supabase Dual-Write, personalBest
│   ├── useHighscores.ts       # Top-10 pro WOD (Supabase oder local)
│   ├── useStretching.ts       # Stretching-Übungen, Routinen, Logs
│   ├── useMeditations.ts      # Meditationen, Session-Logs
│   └── useBreathworkTechniques.ts  # Breathwork-Techniken
└── public/
    ├── wods.json              # 803 WODs (aus wod-tracker migriert)
    ├── timer.worker.js        # Drift-korrigierter Web Worker
    ├── favicon.svg
    ├── icons.svg
    └── sw.js                  # Service Worker (Push Notifications)
```

### Routing (App.tsx)

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
/admin → AdminLayout (AdminRoute: role admin/moderator)
  /admin
  /admin/users
  /admin/tasks
  /admin/push
  /admin/emails
  /admin/feedback
  /admin/wods
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
| Audio | Web Audio API | nativ (Gong, Klangschale, Regen, Wellen) |
| Screen Wake Lock | Screen Wake Lock API | nativ (verhindert Display-Timeout während Timer läuft) |
| Push | Web Push API + Service Worker | nativ |
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
| `user_profiles` | Nutzer-Metadaten: language, activePillars, primaryPillar, colorTheme, subscriptionStatus, trialEndsAt, **role** (admin/moderator/user), **subscription_status**, **equipment** (string[]), **equipment_by_location** (JSONB: Record\<WorkoutLocation, string[]\>) |
| `routines` | Routinen eines Nutzers (Name, Beschreibung, Pillar, Uhrzeit, Wochentage) |
| `routine_logs` | Completion-Einträge pro Routine + Datum |
| `todos` | To-do-Liste pro Nutzer + Datum |
| `daily_logs` | Tageseinträge: Mood, Wasserkonsum, Notizen |
| `wods` | WOD-Stammdaten (803 Einträge, statisch, read-only für Users) |
| `wod_history` | Workout-Logs pro Nutzer (WOD, Score, Datum, Notizen) |
| `feedback` | In-App-Feedback / Bug-Reports |
| `stretching_exercises` | 65 Übungen (dreisprachig, bilateral_support, category) |
| `stretching_routines` | 18 Routinen mit exercise_ids |
| `stretching_logs` | Completion-Logs pro Nutzer |
| `meditations` | 20 Einträge (name/description/instructions als JSONB, category, duration_min, difficulty, background_sound) |
| `breathwork_techniques` | 8 Techniken (inhale_sec, hold_in_sec, exhale_sec, hold_out_sec, cycles) |
| `meditation_logs` | Session-Logs pro Nutzer |
| `push_subscriptions` | Web Push Subscription JSON pro User |
| `push_preferences` | Reminder-Einstellungen (morning/evening/wod/inactivity + Zeiten) |

DDL + RLS für `wods` und `wod_history`: `supabase/seed-wods.sql`

### TypeScript-Typen (packages/types)

```typescript
type PillarId = 'workout' | 'routine' | 'stretching' | 'meditation'
type Language = 'en' | 'de' | 'es'
type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled'
type UserRole = 'admin' | 'moderator' | 'user'

// packages/types — DbProfile (authStore)
interface DbProfile {
  id: string
  display_name: string | null
  language: Language
  primary_pillar: PillarId | null
  active_pillars: PillarId[]
  equipment: string[]
  equipment_by_location: Record<WorkoutLocation, string[]> | null
  role: UserRole | null
  subscription_status: SubscriptionStatus | null
  created_at: string
  updated_at: string
}

type WorkoutLocation = 'home' | 'gym' | 'bodyweight' | 'outdoor'
```

---

## 5. Equipment-Kategorien (WOD-Klassifikation)

| Kategorie | Farbe | Keywords |
|---|---|---|
| Barbell | `#E8642A` Orange | — |
| Bodyweight | `#7BC67E` Grün | — |
| Dumbbell | `#4A90D9` Blau | — |
| Kettlebell | `#F5A623` Gelb | — |
| Gymnastic | `#9B7FD4` Lila | — |
| **Laufen** | `#06b6d4` Cyan | run, meter, 400m, 800m, mile, 1km, lauf + Aufwärm-Routine |
| **Sandbag** | — | sandbag |
| **Gewichtsweste** | — | weighted vest, weight vest, gewichtsweste |

### Location-basierte Equipment-Presets (`DEFAULT_EQUIPMENT_BY_LOCATION`)

| Location | Standard-Equipment |
|---|---|
| **Home** | Dumbbells, Kettlebell, Pull-up Bar, Resistance Bands |
| **Gym** | Barbell, Dumbbells, Pull-up Bar, Rings, Rower, Bike, Kettlebell |
| **Bodyweight** | _(leer — nur Körpergewicht)_ |
| **Outdoor** | Bodyweight, Pull-up Bar, Laufen |

Nutzer können ihr Equipment pro Location in den Settings anpassen (`equipment_by_location` in `user_profiles`). `WorkoutPage` filtert die WOD-Liste anhand des aktiven Location-Presets.

---

## 6. Timer-Konfiguration

| Modus | Konfigurierbare Parameter |
|---|---|
| **AMRAP** | Gesamtzeit (frei wählbar) |
| **ForTime** | Optionaler Zeit-Cap |
| **EMOM** | Intervall-Dauer + Anzahl Runden |
| **Tabata** | Work-Zeit / Pause-Zeit / Anzahl Runden |

Alle Modi nutzen den drift-korrigierten `timer.worker.js` im Hintergrund.

**Screen Wake Lock:** Während der Timer läuft, aktiviert `TimerView.tsx` die Screen Wake Lock API (`navigator.wakeLock.request('screen')`), um zu verhindern, dass das Display während des Workouts ausgeht. Die Lock wird automatisch freigegeben, wenn der Timer pausiert, gestoppt oder die Komponente unmounted wird. Geräte ohne Wake-Lock-Support werden per Feature-Detection (`nav.wakeLock`-Check) still ignoriert.

---

## 7. Desktop Layout

Ab dem `lg`-Breakpoint (≥ 1024 px):
- `Sidebar.tsx` (240 px breit) ersetzt die `BottomNav`
- `BottomNav` wird ausgeblendet (`hidden lg:hidden`)
- AppShell passt den Content-Bereich entsprechend an

---

## 8. Admin-Bereich

Zugangsbedingung: `user_profiles.role IN ('admin', 'moderator')`, geprüft von `AdminRoute.tsx`.

| Route | Seite |
|---|---|
| `/admin` | AdminDashboardPage — Übersicht, KPIs |
| `/admin/users` | AdminUsersPage — Nutzerverwaltung |
| `/admin/tasks` | AdminTasksPage — Manuelle Aufgaben + Markdown-Export |
| `/admin/push` | AdminPlaceholderPage — Server-Side Push (offen) |
| `/admin/emails` | AdminPlaceholderPage — E-Mail-Verwaltung (offen) |
| `/admin/feedback` | AdminPlaceholderPage — Feedback-Übersicht (offen) |
| `/admin/wods` | AdminPlaceholderPage — WOD-Management (offen) |

Layout: `AdminLayout.tsx` mit eigenem Navigations-Wrapper.

---

## 9. Push Notifications (Client-Side)

Implementiert in `lib/push.ts`:
- Service Worker (`public/sw.js`) registriert + verwaltet
- `subscribeToPush()` — erzeugt Web Push Subscription, persistiert in `push_subscriptions`
- `unsubscribeFromPush()` — entfernt Subscription aus DB und Browser
- Settings-UI mit Toggles pro Reminder-Typ (morning / evening / wod / inactivity) inkl. Zeitauswahl
- Preferences gespeichert in `push_preferences` (Supabase)

Server-Side Broadcast (Admin → alle User) ist noch offen (siehe Roadmap).

---

## 10. Infrastruktur

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

## 11. Internationalisierung (packages/i18n)

Sprachen: `en`, `de`, `es`
Init: `initI18n(language: Language)` — konfiguriert i18next mit den passenden Ressourcen.

Namespace-Schlüssel: `app`, `nav`, `pillars`, `onboarding`, `common`

Stretching-Übungen sind vollständig dreisprachig (name/description/instructions als JSONB).
WODs (803 Einträge) aktuell nur Deutsch — Übersetzungen EN/ES offen (siehe Roadmap).

---

## 12. Roadmap-Status

### Abgeschlossen

| Phase | Inhalt |
|---|---|
| **Phase 0** | Turborepo-Scaffold, packages/types, packages/i18n, packages/ui (Stub), CI/CD-Pipeline, Server-Setup-Skript |
| **Phase 1** | Supabase-Client, Zustand Auth-Store, Login/Register/Onboarding-Pages, AppShell + BottomNav, Button/Card/Input-Components, Route Guards |
| **Phase 2** | Routine-Pillar (RoutinePage, hooks: useRoutines/useRoutineLogs/useDailyLog/useTodos, Komponenten: RoutineList/WaterTracker/MoodCheck/TodoList/WeekView) |
| **Phase 3** | Workout-Pillar (WorkoutPage, 803 WODs, drift-korrigierter Web Worker Timer mit AMRAP/ForTime/EMOM/Tabata-Konfiguration, alle WOD-Komponenten, Supabase-DDL für wods + wod_history, Equipment-Kategorien Laufen/Sandbag/Gewichtsweste, Location-basierter Equipment-Filter mit `DEFAULT_EQUIPMENT_BY_LOCATION`, Screen Wake Lock während Timer-Lauf) |
| **Phase 4** | Stretching-Pillar — 65 dreisprachige Übungen, 18 Routinen, Guided Session mit Progress-Ring + Timer, bilateral support, History + Supabase-Sync |
| **Phase 5** | Meditation-Pillar — 20 geführte Meditationen (7 Kategorien), 8 Breathwork-Techniken, Custom Presets, Web Audio API (Gong, Klangschale, Regen, Wellen), Custom Timer |
| **Desktop Layout** | Sidebar (240px) ab lg-Breakpoint, BottomNav wird ausgeblendet |
| **Admin-Bereich** | /admin/* mit AdminRoute (role-guard), AdminLayout, Dashboard, Users, Manual Tasks + Markdown-Export |
| **Push Notifications (Client)** | Service Worker, subscribeToPush/unsubscribeFromPush, Settings-Toggles pro Reminder-Typ |

### Offen / Roadmap

| Bereich | Inhalt |
|---|---|
| **Logo / Brand Identity** | Finale Markenidentität für carveout.app |
| **Landingpage** | apps/landing — Marketing, Waitlist, Pricing |
| **Stripe** | Abo-Integration (7-Tage Trial); subscription_status bereits im Schema |
| **Bestätigungsemail** | Via Resend — wartet auf finales Logo |
| **Push (Server-Side)** | Admin-Broadcast an alle User |
| **GDPR** | Cookie-Banner, Privacy Policy, Daten-Export, Konto-Löschung |
| **WOD-Übersetzungen** | EN/ES für 803 WODs (aktuell nur DE) |
| **Integrationen (Phase 4+)** | Garmin Connect, Apple Health, Strava |
| **Analytics** | Plausible oder Umami (self-hosted) |
| **Error Tracking** | Sentry |
| **Supabase Redirect-URLs** | Konfigurieren für OAuth / Magic Link |
| **packages/ui** | Shared Component Library befüllen |
| **E2E-Tests** | Playwright o.ä. |
| **Warmup-Timer** | Echte Phasen via Timer-Worker (nicht nur Akkordeon-UI in WodDetail) |
| **Free-Timer-Wizard** | 3-Step-Flow: Typ → Übungen → Übersicht; eigene Workouts ohne WOD-DB |
| **Random-WOD-Picker** | Eigener Screen mit Filter + Würfel-Button |
| **Favorites-System** | toggleFav, persistent (localStorage / Supabase) |
| **Theme-Switcher** | Mind. Dark/Light; alte HTML-PWA hatte 8 Themes × 8 Accents |
| **Toast-Notifications** | Globales Feedback-System (Ersatz für fehlende showToast-Äquivalente) |
| **Home-Screen-Widgets** | Today's WOD, Woche-Stats, Recently Done auf Workout-Startansicht |
| **Virtual/Infinite Scroll** | WodList — Performance bei 803+ Einträgen (aktuell: Pagination + "Load more") |

---

*Letzte Aktualisierung: Mai 2026 — Tim (Session A Tier-1: equipment fix, wake lock, roadmap update)*
