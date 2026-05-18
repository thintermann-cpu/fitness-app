# CarveOut — Technische Zusammenfassung

**Intern / Stand: Mai 2026**

---

## 1. App-Überblick

CarveOut ist eine mobile-first Web-App für strukturierte Selbstoptimierung. Zielgruppe: Erwachsene (25–45), die Fitness, Tagesroutinen und mentale Balance in einer App zusammenführen wollen — ohne Abo-Chaos oder Datensilos.

Das Produkt basiert auf **4 Pillars** (Domänen), die einzeln freischaltbar sind:

| Pillar | Farbe | Funktion |
|---|---|---|
| **Workout** | `#E8642A` Orange | WOD-Datenbank (796 lokale / bis zu 981 Supabase-WODs), Timer (AMRAP/ForTime/EMOM/Tabata), Krafttraining-Modus (Satz-basierter Flow mit Gewichts-/Rep-Tracking), History, Highscores |
| **Routine** (Ritual) | `#4A90D9` Blau | Tagesrituale, To-dos, Wochenübersicht; MoodCheck jetzt auf HomePage |
| **Stretching** | `#7BC67E` Grün | 65 dreisprachige Übungen, 18 Routinen, Guided Session mit Progress-Ring + Timer, bilateral support, History + Supabase-Sync |
| **Meditation** | `#9B7FD4` Lila | 20 geführte Meditationen (7 Kategorien), 8 Breathwork-Techniken, Custom Presets, Web Audio API (Gong, Klangschale, Regen, Wellen), Custom Timer, Screen Wake Lock, Gong am Session-Ende |

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
│   ├── push.ts                # Push Notification Helpers (subscribeToPush, unsubscribeFromPush)
│   ├── adaptiveSuggestion.ts  # Pure Funktion `getSuggestedPillar(goal?: string | null): Pillar` — Empfehlung nach Uhrzeit (05–10 immer routine); Tiebreaker per goal: Mittag (10–17): `beweglichkeit`→stretching, `entspannen` ab 14h→meditation, sonst workout; Abend (17–21): `kraft`/`abnehmen`→workout, `entspannen`→meditation, sonst stretching; Nacht→meditation
│   ├── customWorkouts.ts      # CustomWorkout + CustomSession Typen; localStorage CRUD (save/load/delete); Keys: carveout_custom_workouts / carveout_custom_sessions
│   └── timerLabels.ts         # TimerMode, TimerLabel, TIMER_LABELS (name/desc/emoji/color pro Modus), TIMER_MODE_LIST, WOD_TYPE_TO_MODE (DB-Typ → TimerMode)
├── store/
│   ├── authStore.ts           # Zustand-Store: user, session, loading, profile; signIn/signUp/signOut/initialize/fetchProfile/updateProfile; WorkoutLocation + DEFAULT_EQUIPMENT_BY_LOCATION + equipment_by_location
│   ├── audioStore.ts          # Zustand-Store (persist: 'audio-mute'): isMuted: boolean, toggleMute()
│   └── toastStore.ts          # Zustand-Store: toasts[], addToast(), removeToast(); ToastType: success|error|info|warning; max. 3 gleichzeitig
├── pages/
│   ├── HomePage.tsx               # Dashboard: Greeting + i18n-Datum, TodayPillarTracker, MoodCheck (useDailyLog), AdaptiveSuggestion, TodaysWod, WeekStats, RecentActivity
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── OnboardingPage.tsx     # 4 Schritte: Sprache → Ziel → Equipment → Pillars; Ziel (6 Optionen, `goal`-Feld, überspringbar); Equipment (14 Optionen, Mehrfachauswahl, überspringbar); Pillars (multi-select, min. 1 Pflicht); speichert language/goal/equipment/primary_pillar/active_pillars
│   ├── WorkoutPage.tsx        # Tabs: Workouts / Timer / History (Tab-Label geändert: "WODs" → "Workouts"); Kategorie-Chips (Alle/CrossFit/HIIT/Kraft-Ausdauer/Kraft - Wenig Zeit/Krafttraining) über WodList; `wodCategory`-State → WodList-Prop; **Equipment-Filter**: wenn `profile.equipment` gesetzt → `userEquipment`-Prop an WodList; Toggle-Button "Equipment-Filter aktiv — Alle anzeigen" / "Equipment-Filter aus — aktivieren" (`showAllEquipment`-State); Timer-Tab idle-Zustand öffnet FreeTimerWizard (variant=adhoc) via "Timer konfigurieren"-Button; Krafttraining-Tab öffnet KrafttrainingView; timerConfig enthält exercises?: WizardExercise[]; handleWizardStart/handleAdhocStart nehmen 5. Param exercises auf; TimerView bekommt exercises={timerConfig.exercises}
│   ├── RoutinePage.tsx        # Titel: Rituale; Tabs: Rituale / Todo / Woche (kein WaterTracker, kein MoodCheck)
│   ├── StretchingPage.tsx     # Stretching-Pillar (Phase 4); FilterBottomSheet (Goal/Kategorie inkl. Yoga-Subcategory, Dauer)
│   ├── MeditationPage.tsx     # Meditation-Pillar (Phase 5); FilterBottomSheet (Kategorie + Dauer); view=free_meditation (Quick-Select 5/10/20 min via AdHocMeditationTimer)
│   ├── FavoritesPage.tsx      # Drei Sektionen (Workouts / Stretch & Yoga / Meditationen), URL-Param ?section=
│   ├── ProfilePage.tsx        # Name + Sprache bearbeiten, Passwort-Reset (E-Mail), Abo-Placeholder, Abmelden; Route /profile
│   ├── SettingsPage.tsx       # Pillar-Auswahl, Push-Einstellungen, Substitution-Toggle, Silent-Mode; **Toggle "Inaktive Bereiche ausblenden"** (localStorage Key: `hide_inactive_pillars`; CustomEvent `hide_inactive_changed` → Sync zu BottomNav + Sidebar)
│   └── admin/
│       ├── AdminDashboardPage.tsx
│       ├── AdminUsersPage.tsx
│       ├── AdminTasksPage.tsx
│       └── AdminPlaceholderPage.tsx
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx       # Layout mit <Outlet />, aktiver Pillar als Context; Mobile-Header (52px, bg: --color-bg-card + border): Links: CarveOut-Logo + Name; Rechts: Vorname als Link zu /profile (max-[360px]:hidden) · Mute · Favoriten · Settings-Link; MAIN_ROUTES-Reihenfolge: / · /routine · /workout · /stretching · /meditation; Swipe-Navigation (TouchEvent, 50px-Threshold, 30px vertikale Drift-Grenze, active_pillars-aware Route-Reihenfolge)
│   │   ├── BottomNav.tsx      # Tab-Navigation (versteckt ab lg); Reihenfolge: Home · Ritual · Workout · Stretching · Meditation; alle 5 Tabs immer sichtbar — inaktive Pillars gedimmt + Alert-Modal beim Antippen; bei `hide_inactive_pillars=true` (localStorage) werden inaktive Tabs ausgeblendet (CustomEvent-Sync); erstes Item: Home `/` (de: Mein Tag, en: My Day, es: Mi Día); Routine-Item (de: Rituale, en: Rituals, es: Rituales)
│   │   ├── Sidebar.tsx        # Desktop-Sidebar (240px, sichtbar ab lg-Breakpoint); Reihenfolge: Home · Ritual · Workout · Stretching · Meditation; alle Items immer sichtbar — inaktive Pillars gedimmt + Alert-Modal beim Antippen; `hide_inactive_pillars` CustomEvent-Sync; erstes Item: Home `/`; isActive-Fix für exakten `/`-Match
│   │   └── AdminLayout.tsx    # Layout-Wrapper für /admin/*
│   ├── home/
│   │   ├── TodayPillarTracker.tsx  # 4 Chips (Done/Open) aus useTodayPillars; dreisprachig; Header-Label: "Aktueller Stand von heute · N von 4" (de/en/es); Chip-Reihenfolge: Ritual · Workout · Stretching · Meditation
│   │   ├── AdaptiveSuggestion.tsx  # Empfehlungskarte nach Tageszeit; übergibt `profile.goal` an `getSuggestedPillar()`; zeigt Ziel-Hinweis-Zeile wenn Pillar zum Nutzer-Ziel passt (`GOAL_HINT` + `GOAL_PILLAR` Maps, dreisprachig); Pillar-Farbe + CTA → Navigation
│   │   ├── TodaysWod.tsx           # Deterministischer Tages-WOD aus Editor's-Pick-Pool (pickByDate); staleTime 1 h
│   │   ├── WeekStats.tsx           # Session-Counts letzte 7 Tage: Workout / Stretching / Meditation (3 parallele Count-Queries)
│   │   └── RecentActivity.tsx      # Letzte 3 WOD-Einträge aus wod_history; relatives Datum (Heute/Gestern/vor N Tagen)
│   ├── workout/
│   │   ├── WodCard.tsx
│   │   ├── WodList.tsx        # sessionStorage-Persistenz für Suchbegriff (Key: wod_search); FilterBottomSheet (Typ, Kategorie, Schwierigkeit, Editor's Pick, Dauer Von-Bis, Equipment Exclude); Würfel-Button für Random-WOD; empfängt `userEquipment`-Prop (→ useWods)
│   │   ├── WodDetail.tsx      # enthält FavoriteButton (contentType="wod", color="#E8642A"); "Warmup-Timer starten"-Button im Warmup-Akkordeon; nutzt WOD_TYPE_TO_MODE aus timerLabels.ts
│   │   ├── TimerView.tsx      # Nutzt timer.worker.js; AMRAP/ForTime/EMOM/Tabata konfigurierbar; adHocLog-Prop: auto-Log in wod_history ohne WOD aus DB; CountdownOverlay: 3-2-1-Go Einblendung vor Timer-Start (SVG-Puls-Animation); exercises-Prop (WizardExercise[]): zeigt Übungsliste unterhalb Timer-Controls (Nummer, Name, optional Detail)
│   │   ├── FreeTimerWizard.tsx  # Wizard; variant='save' (3 Steps: Modus → Übungen → Konfiguration/Name, speichert via customWorkouts.ts) | variant='adhoc' (4 Steps: Modus → Übungen → Konfiguration → Warmup-Frage); onStart(mode, minutes, withWarmup?, kraftConfig?, exercises?: WizardExercise[]) → triggert TimerView; bei nicht-Kraft-Modi werden exercises übergeben (wenn nicht leer); Dauer 1–120 min, 1-min-Schritte; Modus-Auswahl via TIMER_LABELS aus timerLabels.ts
│   │   ├── WarmupTimer.tsx    # Bottom-Sheet mit Presets 3/5/10 min + manuellem Input; Countdown-Ring (SVG); CountdownOverlay: 3-2-1-Go vor Timer-Start; Wake Lock; playGong + vibrate + Toast bei Ende; eingebettet in WodDetail
│   │   ├── KrafttrainingView.tsx  # Satz-basierter Krafttraining-Flow; Übungsauswahl aus FreeTimerWizard-Übungsliste; pro Satz: Gewicht (kg) + Wiederholungen; Satz-Abschluss per Tap; Rest-Timer zwischen Sätzen; Session-Log am Ende
│   │   ├── WodHistoryList.tsx
│   │   └── ScoreInput.tsx
│   ├── routine/
│   │   ├── RoutineItem.tsx    # farbige Left-Border + Punkt-Indikator bei linked_pillar; Tap → Pillar-Navigation; Bleistift öffnet Edit
│   │   ├── RoutineList.tsx    # inkl. Routine-Create-Modal (RoutineEditModal); Vorschläge-Label "Vorgeschlagene Rituale"; Dismiss-Button pro Vorschlags-Item (localStorage Key: dismissed_suggestions); Drag & Drop via @dnd-kit/core+sortable (sort_order Supabase-Sync via onReorder-Prop)
│   │   ├── RoutineEditModal.tsx  # Felder: Name, Beschreibung, Wochentage, Uhrzeit (type=time, time: string|null), Pillar-Selektor (4 farbige Chips + Keine); Toast nach Speichern (erster aktiver Wochentag)
│   │   ├── WaterTracker.tsx
│   │   ├── MoodCheck.tsx
│   │   ├── TodoList.tsx       # Bug-Fix Session L: leere Todo-Liste zeigte Fehler statt Empty-State; Null-Guard ergänzt
│   │   └── WeekView.tsx
│   ├── stretching/            # Alle Stretching-Komponenten
│   │   └── SessionCreator.tsx  # 3-Step Wizard (Auswählen nach muscle_group → Reihenfolge → Name); erstellt virtuelle StretchingRoutine; speichert benannte Sessions via customWorkouts.ts
│   ├── wizard/
│   │   ├── WizardShell.tsx    # Generischer 3-Step Full-Screen Modal-Wrapper; Progress-Bars, Back/Next/Close, canNext-Guard, body-overflow-lock
│   │   └── ExerciseListEditor.tsx  # Reorderable Liste (↑/↓/✕) + optionales Add-Input-Feld; Props: items, onChange, placeholder, showAddInput
│   ├── meditation/            # Alle Meditation-Komponenten (inkl. AdHocMeditationTimer.tsx — circular progress, gong, vibrate, wake lock, session-log)
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── FavoriteButton.tsx # SVG-Herz, 44×44 Touch-Target, Pillar-Farbe
│   │   ├── FilterBottomSheet.tsx # Generisches Filter-Sheet (Draft-State, CSS-Transition, Apply/Reset/Backdrop-Close)
│   │   └── FeedbackModal.tsx  # Bottom-Sheet: Bug/Idee/Lob Chips + Textarea; schreibt in feedback-Tabelle; geöffnet via SettingsPage
│   └── AdminRoute.tsx         # Role-Guard (admin/moderator)
├── hooks/
│   ├── useTodayPillars.ts     # 4 parallele Supabase-Count-Queries (wod_history/stretching_logs/meditation_logs/routine_logs) → TodayPillars { workout, routine, stretching, meditation, total }; staleTime 5 min
│   ├── useRoutines.ts         # CRUD Routinen
│   ├── useRoutineLogs.ts      # Completion-Logs
│   ├── useDailyLog.ts         # Tages-Mood, Wasser
│   ├── useTodos.ts            # To-do-Liste
│   ├── useWods.ts             # Supabase oder /wods.json Fallback; Filter: equipmentFilter, silentMode, editorsPick, excludeEquipment, **userEquipment** (profile.equipment — zeigt nur WODs deren equipment_tags ⊆ userEquipment; Fallback auf altes `equipment`-Feld für lokales JSON; Normalisierung: lowercase + Mapping dumbbells→dumbbell; bodyweight immer in allowed-Set), minDuration, maxDuration, wodCategory (crossfit|hiit|kraft_ausdauer|kraft_wenig_zeit|krafttraining); Supabase-Query mit `.eq('is_visible', true)`; pickRandomWod() (gecachte lokale WODs + alle Filter)
│   ├── useWodHistory.ts       # localStorage + Supabase Dual-Write, personalBest
│   ├── useHighscores.ts       # Top-10 pro WOD (Supabase oder local)
│   ├── useStretching.ts       # Stretching-Übungen, Routinen, Logs
│   ├── useMeditations.ts      # Meditationen, Session-Logs
│   ├── useBreathworkTechniques.ts  # Breathwork-Techniken
│   ├── useFavorites.ts        # localStorage + Supabase Dual-Write, optimistic UI; content_type: wod | stretching_routine | meditation
│   ├── useAudio.ts            # Web Audio API; isMuted-Check via audioStore in allen play*-Funktionen + startBackground
│   └── useToast.ts            # Wrapper um toastStore: toast.success/error/info/warning/show
├── sw.ts                      # Service Worker (Workbox injectManifest; precaching + Push-Handler; gebaut zu dist/sw.js via vite-plugin-pwa)
└── public/
    ├── wods.json              # 796 WODs lokal (aus wod-tracker migriert, 7 Duplikate bereinigt)
    ├── timer.worker.js        # Drift-korrigierter Web Worker
    ├── favicon.svg
    ├── icons.svg
    └── manifest.json          # PWA-Manifest (name/short_name CarveOut, theme_color #0D0D14, SVG-Icon)
```

### PWA-Konfiguration

`apps/web/index.html`:
- `<title>CarveOut</title>`
- `<link rel="manifest" href="/manifest.json" />`
- `<meta name="theme-color" content="#0D0D14" />`
- Apple-Meta-Tags: `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style` (black-translucent), `apple-mobile-web-app-title` (CarveOut)

`apps/web/public/manifest.json`:
- `name` / `short_name`: CarveOut
- `display`: standalone
- `background_color` / `theme_color`: `#0D0D14`
- Icon: `/favicon.svg` (type `image/svg+xml`, sizes `any`)

### Routing (App.tsx)

```
/login, /register              → AuthLayout (kein Auth nötig)
/ → AppShell (ProtectedLayout)
  /                            → HomePage (Dashboard — kein Redirect mehr auf /workout)
  /onboarding
  /workout
  /workout/:wodName
  /routine
  /stretching
  /meditation
  /favorites
  /settings
  /profile
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
| Drag & Drop | @dnd-kit/core + @dnd-kit/sortable | — |
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

**Wod-Interface (useWods.ts) — zusätzliche Felder:**
- `wod_category?: string` — Trainings-Stil (crossfit | hiit | kraft_ausdauer | kraft_wenig_zeit | krafttraining)
- `equipment_tags?: string[]` — Auto-Tag-Array (befüllt via `scripts/tag-wod-equipment.ts`)

---

## 4. Backend — Supabase

**Projekt:** `ipkazxttlkiufgsdyjdw`
**Region:** EU Frankfurt (`eu-central-1`)
**Auth:** Supabase Auth (Email/Password; JWT)
**Datenbank:** PostgreSQL mit Row Level Security (RLS) auf allen User-Tabellen

### Tabellen

| Tabelle | Beschreibung |
|---|---|
| `user_profiles` | Nutzer-Metadaten: language, activePillars, primaryPillar, colorTheme, subscriptionStatus, trialEndsAt, **role** (admin/moderator/user), **subscription_status**, **equipment** (string[]), **equipment_by_location** (JSONB: Record\<WorkoutLocation, string[]\>), **goal** text NULL (Migration 015) |
| `routines` | Rituale eines Nutzers (Name, Beschreibung, Pillar, Uhrzeit, Wochentage, `linked_pillar` VARCHAR NULL — Migration 012) |
| `routine_logs` | Completion-Einträge pro Routine + Datum |
| `todos` | To-do-Liste pro Nutzer + Datum |
| `daily_logs` | Tageseinträge: Mood, Wasserkonsum, Notizen |
| `wods` | WOD-Stammdaten (bis zu 981 Einträge, statisch, read-only für Users); `is_editors_pick` bool (Migration 010); `wod_category` text CHECK (crossfit\|hiit\|kraft_ausdauer\|kraft_wenig_zeit\|krafttraining), Default crossfit (Migration 015); `is_visible` bool NOT NULL DEFAULT true — Soft-Delete (Migration 015); `equipment_tags` text[] NOT NULL DEFAULT '{}', GIN-Index (Migration 016); lokaler Fallback: `EDITORS_PICK_IDS` Set in `useWods`; Migration 021: 183 neue WODs (hiit 60, kraft_ausdauer 50, kraft_wenig_zeit 30, krafttraining 43); Migration 022: CrossFit-WODs außer Girls/Heroes auf is_visible=false |
| `wod_history` | Workout-Logs pro Nutzer (WOD, Score, Datum, Notizen) |
| `stretching_exercises` | 65 Übungen (dreisprachig, bilateral_support, category, `subcategory` VARCHAR NULL — Migration 011; Yoga-Tagging via keyword-basiertem UPDATE — Migration 019) |
| `stretching_routines` | 18 Routinen mit exercise_ids; `subcategory` VARCHAR NULL (Migration 011, Yoga-Seed) |
| `stretching_logs` | Completion-Logs pro Nutzer |
| `meditations` | 20 Einträge (name/description/instructions als JSONB, category, duration_min, difficulty, background_sound) |
| `breathwork_techniques` | 8 Techniken (inhale_sec, hold_in_sec, exhale_sec, hold_out_sec, cycles) |
| `meditation_logs` | Session-Logs pro Nutzer |
| `push_subscriptions` | Web Push Subscription JSON pro User |
| `push_preferences` | Reminder-Einstellungen (morning/evening/wod/inactivity + Zeiten) |
| `favorites` | Favoriten pro Nutzer: `content_type` (wod \| stretching_routine \| meditation), `content_id` (string); DDL als Kommentar in `useFavorites.ts` |
| `feedback` | User-Feedback: `category` (bug \| idee \| lob), `message` text; RLS: User kann nur eigene Einträge einfügen + lesen (Migration 014); DB-Webhook auf INSERT → `notify-feedback` Edge Function (Migration 020) |

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
  goal: string | null
  substitution_enabled: boolean
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

**CountdownOverlay:** `TimerView` und `WarmupTimer` zeigen vor Timer-Start eine 3-2-1-Go-Einblendung (SVG-Puls-Animation). Die Zählung läuft im selben Worker-Takt; Wake Lock ist während des Countdowns bereits aktiv.

**Screen Wake Lock:** Während der Timer läuft, aktivieren folgende Komponenten die Screen Wake Lock API (`navigator.wakeLock.request('screen')`), um Display-Timeout zu verhindern:
- `TimerView.tsx` (Workout) — aktiv solange Timer läuft (inkl. Countdown)
- `GuidedSession.tsx` (Stretching) — aktiv solange `isTimerActive`
- `MeditationSession.tsx` (Meditation) — aktiv wenn `started && !paused && !finished`
- `CustomTimer.tsx` (Meditation) — aktiv bei Status `running` | `prep`
- `WarmupTimer.tsx` (Workout) — aktiv solange Timer läuft (inkl. Countdown)

Die Lock wird automatisch freigegeben, wenn der Timer pausiert, gestoppt oder die Komponente unmounted wird. Geräte ohne Wake-Lock-Support werden per Feature-Detection still ignoriert.

**Gong am Session-Ende:** `GuidedSession.finishSession()` ruft nach `playComplete()` zusätzlich `playGong()` auf. `MeditationSession` und `CustomTimer` spielen `playGong()` sowohl am Timer-Ende als auch beim manuellen Beenden.

**Vibration:** `TimerView`, `GuidedSession`, `MeditationSession`, `CustomTimer`, `WarmupTimer` rufen `navigator.vibrate()` auf — Intervall: `[200,100,200]`, Ende: `[500,100,500]`. Geräte ohne Vibration-Support werden per Feature-Detection still ignoriert.

**Mute-Toggle:** `useAudioStore` (persist: `audio-mute`) hält `isMuted`-State. `useAudio.ts` prüft `isMuted` in allen `play*`-Funktionen und `startBackground` — bei `isMuted: true` kein Audio-Output. Mute-Button im Mobile-Header (`AppShell.tsx`) neben dem Favoriten-Button.

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
| `/admin/wods` | AdminWodsPage — Supabase-Tabelle + is_editors_pick Toggle pro WOD |

Layout: `AdminLayout.tsx` mit eigenem Navigations-Wrapper.

---

## 9. Push Notifications (Client-Side)

Implementiert in `lib/push.ts`:
- Service Worker (`src/sw.ts`, via vite-plugin-pwa zu `dist/sw.js` gebaut) registriert + verwaltet; Workbox precaching (6 Einträge) + NetworkFirst (Supabase) + StaleWhileRevalidate (lokale JSON-Dateien)
- `subscribeToPush()` — erzeugt Web Push Subscription, persistiert in `push_subscriptions`
- `unsubscribeFromPush()` — entfernt Subscription aus DB und Browser
- Settings-UI mit Toggles pro Reminder-Typ (morning / evening / wod / inactivity) inkl. Zeitauswahl
- `pushError: string | null` State in `SettingsPage` — zeigt Fehlermeldung wenn `subscribeToPush()` false zurückgibt (z.B. Permission denied); Toggle-Buttons mit `type="button"` + `cursor: pointer`
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
WODs (796 lokal / bis zu 981 Supabase; 7 Duplikate aus lokalem JSON bereinigt) aktuell nur Deutsch — Übersetzungen EN/ES offen (siehe Roadmap).

---

## 12. Roadmap-Status

### Abgeschlossen

| Phase | Inhalt |
|---|---|
| **Phase 0** | Turborepo-Scaffold, packages/types, packages/i18n, packages/ui (Stub), CI/CD-Pipeline, Server-Setup-Skript |
| **Phase 1** | Supabase-Client, Zustand Auth-Store, Login/Register/Onboarding-Pages, AppShell + BottomNav, Button/Card/Input-Components, Route Guards |
| **Phase 2** | Routine-Pillar (RoutinePage, hooks: useRoutines/useRoutineLogs/useDailyLog/useTodos, Komponenten: RoutineList/WaterTracker/MoodCheck/TodoList/WeekView) |
| **Phase 3** | Workout-Pillar (WorkoutPage, 796 WODs lokal / 798 Supabase, drift-korrigierter Web Worker Timer mit AMRAP/ForTime/EMOM/Tabata-Konfiguration, alle WOD-Komponenten, Supabase-DDL für wods + wod_history, Equipment-Kategorien Laufen/Sandbag/Gewichtsweste, Location-basierter Equipment-Filter mit `DEFAULT_EQUIPMENT_BY_LOCATION`, Screen Wake Lock während Timer-Lauf) |
| **Phase 4** | Stretching-Pillar — 65 dreisprachige Übungen, 18 Routinen, Guided Session mit Progress-Ring + Timer, bilateral support, History + Supabase-Sync |
| **Phase 5** | Meditation-Pillar — 20 geführte Meditationen (7 Kategorien), 8 Breathwork-Techniken, Custom Presets, Web Audio API (Gong, Klangschale, Regen, Wellen), Custom Timer |
| **Desktop Layout** | Sidebar (240px) ab lg-Breakpoint, BottomNav wird ausgeblendet |
| **Admin-Bereich** | /admin/* mit AdminRoute (role-guard), AdminLayout, Dashboard, Users, Manual Tasks + Markdown-Export |
| **Push Notifications (Client)** | Service Worker, subscribeToPush/unsubscribeFromPush, Settings-Toggles pro Reminder-Typ |
| **Phase 7-9 Cleanup** | Zeit-Filter (`minDuration`/`maxDuration` in `useWods`), Substitution-Toggle (SettingsPage + WodDetail-Gate, localStorage), Silent Mode / Parent Mode (`is_jumping`-Flag auf WOD-Ebene, Keyword-Sweep 251 WODs, SettingsPage-Toggle + WodList-Filter), Stretching & Yoga Rebranding (i18n DE/EN/ES), Hybrid-Labels für WOD-Typen (`wodTypeLabels.ts`, WodCard + WodList + TimerView sprachabhängig), BottomNav i18n, LogoIcon SVG (C-Bogen + Pfeil, Sidebar + favicon.svg) |
| **Wake Lock (Stretching + Meditation)** | Screen Wake Lock in `GuidedSession`, `MeditationSession`, `CustomTimer` — selbes Pattern wie `TimerView` |
| **Gong am Session-Ende** | `GuidedSession`, `MeditationSession`, `CustomTimer` spielen Gong bei Timer-Ende und manuellem Beenden |
| **Routine-Create Modal** | Custom Routine direkt aus `RoutineList` erstellen via `RoutineEditModal`, optimistic Insert in `useRoutines` + `useTodos`; `useRoutines` (update + delete) und `useTodos` (complete) vollständig optimistic (onMutate/onError rollback/onSettled) |
| **Favoriten-System** | `useFavorites` (localStorage + Supabase Dual-Write), `FavoriteButton`, `FavoritesPage` (/favorites), drei Sektionen (Workouts / Stretch & Yoga / Meditationen), AppShell-Header-Badge + Sidebar-Eintrag |
| **PWA-Manifest** | `manifest.json` (standalone, theme `#0D0D14`, SVG-Icon), `index.html` Title + Apple-Meta-Tags |
| **Session D: Polish** | Duration-Filter-Chips in `WodList` (Alle/≤15/≤20/≤30 min) + `StretchingPage` (Alle/≤5/≤10/≤20 min); WOD-Suche sessionStorage-persistent (Key: `wod_search`); Push-Fehlerbehandlung (`pushError` State in `SettingsPage`); Optimistic Updates: `useRoutines` (update+delete) + `useTodos` (complete); 7 Duplikat-WODs aus lokalem JSON bereinigt (796 lokal / 798 Supabase) |
| **Session E: Polish II** | `audioStore` (Zustand persist: `isMuted`/`toggleMute`), Mute-Button im Mobile-Header (`AppShell`); Vibration-Feedback in `TimerView`/`GuidedSession`/`MeditationSession`/`CustomTimer`; `RoutineEditModal` Uhrzeit-Feld (`time: string\|null`); `FavoriteButton` in `WodDetail`; `MeditationPage` `duration_min > 0` Guard; `FavoriteButton` fix: Sichtbarkeit + Tag-Overflow-Schutz auf Cards |
| **Session F** | **Editor's Pick** (`is_editors_pick` auf `wods`, Migration 010, lokaler Fallback via `EDITORS_PICK_IDS`; `AdminWodsPage` mit Toggle); **Random-WOD-Picker** (Würfel-Button in `WodList`, `pickRandomWod()` mit allen aktiven Filtern, Toast); **FilterBottomSheet** (`components/ui/FilterBottomSheet.tsx`; Draft-State, Apply/Reset/Backdrop-Close; ersetzt Chip-Reihen in `WodList`/`StretchingPage`/`MeditationPage`; `WodList`: Typ/Kategorie/Schwierigkeit/Editor's Pick/Dauer Von-Bis/Equipment Exclude); **Yoga-Subcategory** (`subcategory` auf `stretching_exercises`+`stretching_routines`, Migration 011, `StretchingPage` filtert via `r.goal === filter \|\| r.subcategory === filter`); **Routine linked_pillar** (Migration 012, `RoutineEditModal` Pillar-Selektor, `RoutineItem` farbige Left-Border + Pillar-Navigation); **Workbox sw.ts** (`src/sw.ts` via `vite-plugin-pwa injectManifest`; precaching + NetworkFirst/StaleWhileRevalidate; `public/sw.js` gelöscht); **Toast-System** (`toastStore` + `useToast.ts`, kein Package); **Ad-hoc Timer-Log** (`TimerView.adHocLog`-Prop); **Freie Meditation** (`AdHocMeditationTimer`, `view=free_meditation` in `MeditationPage`) |
| **Session G** | **Dashboard-Familie** — Route `/` zeigt `HomePage` (kein Redirect mehr auf `/workout`); `TodayPillarTracker` (4 Chips Done/Open via `useTodayPillars`); `AdaptiveSuggestion` (Empfehlungskarte nach Tageszeit, `adaptiveSuggestion.ts`); `TodaysWod` (deterministisch aus Editor's-Pick-Pool via `pickByDate`); `WeekStats` (Session-Counts Workout/Stretching/Meditation letzte 7 Tage); `RecentActivity` (letzte 3 WOD-Einträge, relatives Datum); BottomNav + Sidebar: Home-Item als erstes Item; Sidebar `isActive`-Fix für `/` |
| **Session H** | **Rebrand + UX-Polish** — Home-Nav-Item umbenennen (de: Mein Tag / en: My Day / es: Mi Día); Routine-Pillar umbenennen zu Ritual/Rituale (i18n, RoutinePage-Titel, RoutineEditModal, RoutineList-Vorschläge-Label); **Swipe-Navigation** in `AppShell` (TouchEvent 50px-Threshold, 30px vertikale Drift-Grenze, `active_pillars`-aware Route-Reihenfolge); **Dismiss-Funktion** für Vorschlags-Items in `RoutineList` (localStorage Key: `dismissed_suggestions`); **MoodCheck** von `RoutinePage` → `HomePage` (zwischen `TodayPillarTracker` und `AdaptiveSuggestion`); **WaterTracker** aus `RoutinePage` entfernt (UI only, DB unberührt) |
| **Session I** | **Nav-Reihenfolge** — `BottomNav` + `Sidebar` + `AppShell MAIN_ROUTES`: neue Reihenfolge Mein Tag · Ritual · Workout · Stretching · Meditation; **Settings aus BottomNav entfernt** (jetzt nur noch im Mobile-Header als Icon); **Mobile-Header-Redesign** (52px, bg: `--color-bg-card` + border; Links: CarveOut-Logo + Name; Rechts: Vorname (max-[360px]:hidden) · Mute · Favoriten · Settings-Link); **TodayPillarTracker** — Header-Label geändert zu "Aktueller Stand von heute · N von 4" (de/en/es); Chip-Reihenfolge: Ritual · Workout · Stretching · Meditation |
| **Session G2** | **Wizard-Framework + Custom Workouts** — `lib/customWorkouts.ts` (CustomWorkout + CustomSession Typen, localStorage CRUD); `wizard/WizardShell` (generischer 3-Step Full-Screen Wizard, Progress-Bars, canNext-Guard); `wizard/ExerciseListEditor` (reorderable Liste mit ↑/↓/✕ + Add-Input); **FreeTimerWizard** (3-Step: Modus → Übungen → Konfiguration/Name, speichert benannte Workouts, triggert TimerView); **SessionCreator** (3-Step: Auswählen → Reihenfolge → Name, erstellt virtuelle StretchingRoutine); **WarmupTimer** (Bottom-Sheet, Presets 3/5/10 min + manuell, Countdown-Ring, Wake Lock, Gong + Vibrate + Toast); `WorkoutPage` "Eigene Workouts"-Sektion; `StretchingPage` "Eigene Sessions"-Sektion; `WodDetail` Warmup-Timer-Button |
| **Session J** | **Bugfixes + neue Features** — Bug MoodCheck: localStorage-Cache + useEffect-Sync für async Supabase-Daten; **Drag & Drop RoutineList** (`@dnd-kit/core` + `@dnd-kit/sortable`, `sort_order` Supabase-Sync); Bug SessionCreator Step 0: Loading/Empty-State; **FreeTimerWizard** Schrittgröße 1 min (1–120 min), neuer `variant='adhoc'` (4. Schritt: Warmup-Frage); **Timer-Tab idle-Zustand** ("Timer konfigurieren"-Button öffnet Ad-hoc-Wizard); **ProfilePage** (`/profile`: Name + Sprache bearbeiten, Passwort-Reset via E-Mail, Abo-Placeholder, Abmelden); **FeedbackModal** (`components/ui/FeedbackModal.tsx`: Bug/Idee/Lob Chips + Textarea, schreibt in `feedback`-Tabelle); SettingsPage Feedback-Button; AppShell Vorname als Link zu `/profile`; **Migration 013**: `user_profiles` RLS defensive Re-Apply + `handle_new_user()`-Trigger; **Migration 014**: `feedback`-Tabelle mit RLS |
| **Session K** | **WOD-Katalog-Onboarding** — **Migration 015**: `wods.wod_category` (crossfit/hiit/kraft_ausdauer/kraft_wenig_zeit [ursprünglich kraft_auf_zeit, via Migration 017 umbenannt], Default crossfit) + `wods.is_visible` (Soft-Delete bool) + `user_profiles.goal` text; **Migration 016**: `wods.equipment_tags` text[] GIN-Index; **`timerLabels.ts`** (`lib/`): zentrale Quelle für Timer-Modus-Labels (TimerMode, TimerLabel, TIMER_LABELS, TIMER_MODE_LIST, WOD_TYPE_TO_MODE); `FreeTimerWizard` nutzt TIMER_LABELS statt altes MODES-Array; `WodDetail` nutzt `WOD_TYPE_TO_MODE`; **WorkoutPage** Kategorie-Chips (Alle/CrossFit/HIIT/Kraft-Ausdauer/Kraft - Wenig Zeit) + Tab-Label "WODs" → "Workouts"; **`WodList`** empfängt `wodCategory`-Prop; **`useWods`** `wodCategory`-Filter + Supabase-Query mit `is_visible=true`; **Onboarding-Overhaul**: 4 Schritte (Sprache/Ziel/Equipment/Pillars), 6 Ziel-Optionen, 14 Equipment-Optionen, Pillars multi-select, speichert `goal`; **`scripts/tag-wod-equipment.ts`**: One-time-Script zur Befüllung von `equipment_tags`; **`supabase/functions/notify-feedback`**: Deno Edge Function — DB-Webhook auf `feedback`-INSERT → Resend API E-Mail-Benachrichtigung |
| **Session L** | **Krafttraining-Modus** — `KrafttrainingView` (Satz-basierter Flow: Übungsauswahl, Gewicht/Rep-Tracking pro Satz, Rest-Timer, Session-Log); neues Kategorie-Chip "Krafttraining" in `WorkoutPage` + `wodCategory`-Filter in `useWods`; `wod_category` CHECK-Constraint erweitert um `krafttraining`; **Migration 017**: kraft_auf_zeit → kraft_wenig_zeit (ALTER TABLE DROP/ADD CONSTRAINT + UPDATE); **CountdownOverlay** in `TimerView` + `WarmupTimer` (3-2-1-Go SVG-Animation vor Timer-Start, Wake Lock bereits aktiv); **TodoList-Bug-Fix** (Null-Guard: leere Liste zeigte Fehler statt Empty-State) |
| **Session M** | **Pillar-Tabs immer sichtbar** — `BottomNav` + `Sidebar`: alle 5 Tabs sichtbar, inaktive Pillars gedimmt + Alert-Modal beim Antippen; **Toggle "Inaktive Bereiche ausblenden"** in `SettingsPage` (localStorage `hide_inactive_pillars`, CustomEvent `hide_inactive_changed`); **userEquipment-Filter** — `useWods.WodFilters` + `userEquipment`-Prop in `WodList`/`WorkoutPage`; Toggle-Button "Equipment-Filter aktiv / aus" (`showAllEquipment`-State); **goal-aware Suggestion** — `getSuggestedPillar(goal?)` mit Tiebreaker-Logik; `AdaptiveSuggestion` zeigt dreisprachige Ziel-Hinweis-Zeile (`GOAL_HINT`/`GOAL_PILLAR`); **Yoga-Tagging** — Migration 019: keyword-basiertes UPDATE auf `stretching_exercises.subcategory='yoga'`; **Migration 020**: DB-Webhook auf `feedback`-INSERT verknüpft mit `notify-feedback` Edge Function |
| **Session N** | **WOD-Katalog-Erweiterung + Filter-Fixes** — Migration 021: 183 neue WODs (hiit 60, kraft_ausdauer 50, kraft_wenig_zeit 30, krafttraining 43; equipment_tags: bodyweight/dumbbell/kettlebell/barbell); Migration 022: CrossFit-WODs außer Girls (20) + Heroes (88) auf is_visible=false; **Equipment-Filter-Fix** in useWods: Normalisierung lowercase + Mapping dumbbells→dumbbell, bodyweight immer erlaubt; **Timer-Exercise-Anzeige**: FreeTimerWizard.onStart erhält 5. Parameter exercises?: WizardExercise[]; TimerView zeigt Übungsliste unterhalb Timer-Controls; WorkoutPage.timerConfig erweitert um exercises |

### Offen / Roadmap

| Bereich | Inhalt |
|---|---|
| **Landingpage** | apps/landing — Marketing, Waitlist, Pricing |
| **Stripe** | Abo-Integration (7-Tage Trial); subscription_status bereits im Schema |
| **Bestätigungsemail** | Via Resend — wartet auf finales Logo |
| **Push (Server-Side)** | Admin-Broadcast an alle User |
| **GDPR** | Cookie-Banner, Privacy Policy, Daten-Export, Konto-Löschung |
| **WOD-Übersetzungen** | EN/ES für 798 WODs (aktuell nur DE) |
| **Integrationen (Phase 4+)** | Garmin Connect, Apple Health, Strava |
| **Analytics** | Plausible oder Umami (self-hosted) |
| **Error Tracking** | Sentry |
| **Supabase Redirect-URLs** | Konfigurieren für OAuth / Magic Link |
| **packages/ui** | Shared Component Library befüllen |
| **E2E-Tests** | Playwright o.ä. |
| **Random-WOD-Picker (erweiterbar)** | Aktuell: Würfel-Button in WodList; offen: eigener Screen |
| **Theme-Switcher** | Mind. Dark/Light; alte HTML-PWA hatte 8 Themes × 8 Accents |
| **Virtual/Infinite Scroll** | WodList — Performance bei 798+ Einträgen (aktuell: Pagination + "Load more") |
| **weight_input_mode** | Krafttraining: Nutzer-Präferenz kg/lbs + Schritt-Größe (0.5/1/2.5 kg) — aktuell hardcoded kg |

---

*Letzte Aktualisierung: Mai 2026 — Tim (Session N: WOD-Katalog 183 WODs, CrossFit-Visibility, Equipment-Filter, Timer-Exercise)*
