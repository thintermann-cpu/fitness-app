# CarveOut — Technische Zusammenfassung

**Intern / Stand: Mai 2026**

---

## 1. App-Überblick

CarveOut ist eine mobile-first Web-App für strukturierte Selbstoptimierung. Zielgruppe: Erwachsene (25–45), die Fitness, Tagesroutinen und mentale Balance in einer App zusammenführen wollen — ohne Abo-Chaos oder Datensilos.

Das Produkt basiert auf **4 Pillars** (Domänen), die einzeln freischaltbar sind:

| Pillar | Farbe | Funktion |
|---|---|---|
| **Workout** | `#E8642A` Orange | WOD-Datenbank (796 lokale / bis zu 981 Supabase-WODs), Timer (AMRAP/ForTime/EMOM/Tabata), Krafttraining-Modus (Satz-basierter Flow mit Gewichts-/Rep-Tracking), History, Highscores |
| **Routine** | `#4A90D9` Blau | Tagesroutinen, To-dos, Wochenübersicht; MoodCheck jetzt auf HomePage |
| **Mobilität** (Stretching) | `#7BC67E` Grün | 65 dreisprachige Übungen, 18 Routinen, Guided Session mit Progress-Ring + Timer, bilateral support, History + Supabase-Sync; Nav-Label: DE Mobilität / EN Mobility / ES Movilidad — DB-ID `stretching` unverändert |
| **Achtsamkeit** (Meditation) | `#9B7FD4` Lila | 20 geführte Meditationen (7 Kategorien), 8 Breathwork-Techniken, Custom Presets, Web Audio API (Gong, Klangschale, Regen, Wellen), Custom Timer, Screen Wake Lock, Gong am Session-Ende; Ambient-Sound-Dateien unter `public/audio/ambient/`; Nav-Label: DE Achtsamkeit / EN Mindfulness / ES Atención — DB-ID `meditation` unverändert |

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
├── scripts/
│   ├── generate_icons.mjs  # Generiert icon-192.png / icon-512.png / apple-touch-icon.png aus icon-source.svg via @resvg/resvg-js
│   └── generate_ping.mjs   # Generiert meditation-ping.wav (528 Hz Sinus, 1,4 s Decay) via Node
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
│   ├── adaptiveSuggestion.ts  # Pure Funktion `getSuggestedPillar(goal?: string | null): Pillar` — Empfehlung nach Uhrzeit (05–10 immer routine); Tiebreaker per goal: Mittag (10–17): `beweglichkeit`→stretching, `entspannen` ab 14h→meditation, sonst workout; Abend (17–21): `kraft`/`abnehmen`→workout, `entspannen`→meditation, sonst stretching; Nacht→meditation; **Loading-Fix**: `AdaptiveSuggestion` rendert erst wenn `profile` nicht null ist (Supabase-Delay-Guard); **TodayPillarTracker-Buttons**: Chip-Tap navigiert direkt zur Pillar-Route (nicht nur visuell)
│   ├── customWorkouts.ts      # CustomWorkout + CustomSession Typen; localStorage-Fallback-Funktionen: `loadLocalWorkouts` / `saveLocalWorkout` / `deleteLocalWorkout` (Key: carveout_custom_workouts); CustomSession bleibt localStorage-only (loadCustomSessions / saveCustomSession / deleteCustomSession; Key: carveout_custom_sessions)
│   └── timerLabels.ts         # TimerMode, TimerLabel, TIMER_LABELS (name/desc/emoji/color pro Modus), TIMER_MODE_LIST, WOD_TYPE_TO_MODE (DB-Typ → TimerMode)
├── store/
│   ├── authStore.ts           # Zustand-Store: user, session, loading, profile; signIn/signUp/signOut/initialize/fetchProfile/updateProfile; WorkoutLocation + DEFAULT_EQUIPMENT_BY_LOCATION + equipment_by_location
│   ├── audioStore.ts          # Zustand-Store (persist: 'audio-mute'): isMuted: boolean, toggleMute()
│   ├── sessionStore.ts        # Zustand-Store (kein persist): isSessionActive: boolean; setSessionActive(v: boolean); genutzt von TimerView + KraftTimerView um laufende Session app-weit zu tracken (Swipe-Sperre während Timer läuft oder Completion-Screen aktiv)
│   └── toastStore.ts          # Zustand-Store: toasts[], addToast(), removeToast(); ToastType: success|error|info|warning; max. 3 gleichzeitig
├── pages/
│   ├── LandingPage.tsx            # Marketing-Landingpage DE/EN; inline `useLang` (localStorage + Browser-Fallback, Default DE); 8 Sektionen (LandingNav, Hero, PersonaSection, PillarSection, HowItWorks, ResultsTimeline, PricingSection, CtaSection, LandingFooter); Fade-in on scroll via IntersectionObserver; öffentliche Route `/`
│   ├── ImpressumPage.tsx          # Impressum DE/EN; inline `useLang` (localStorage + Browser-Fallback, Default DE); nutzt LandingNav + LandingFooter; öffentliche Route `/impressum`
│   ├── DatenschutzPage.tsx        # Datenschutzerklärung DE/EN; inline `useLang`; nutzt LandingNav + LandingFooter; Abschnitte: Verantwortlicher, Daten, Zweck, Dritte, Rechte, Speicherdauer; öffentliche Route `/datenschutz`
│   ├── HomePage.tsx               # Dashboard: Greeting + i18n-Datum, OnboardingSlides-Overlay, WhatsNewBanner, AdaptiveSuggestion (nur wenn `carveout_show_motivation !== 'false'`), TodayPillarTracker, MoodCheck (useDailyLog), TodaysWod, **WeekStrip** (ans Ende — nach TodaysWod); `showMotivation` als `useState(() => localStorage.getItem(...) !== 'false')` (robuster als direkter Aufruf); WeekStats + RecentActivity entfernt
│   ├── HistoryPage.tsx            # Kombinierter Verlauf: Workout / Mobilität / Achtsamkeit; Filter nach Pillar (Alle + 3 Chips); chronologisch neueste zuerst; Eintrag: Pillar-Farbe, Name, Dauer/Score, Datum; nutzt useWodHistory + useStretchingLogs + useMeditationLogs; Route `/history`
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── OnboardingPage.tsx     # 3 Schritte: Sprache → Ziel → Equipment; Ziel (6 Optionen, `goal`-Feld, überspringbar); Equipment (14 Optionen, Mehrfachauswahl, überspringbar); Pillar-Auswahl entfernt — alle 4 Pillars immer aktiv (`primary_pillar: 'workout'`, `active_pillars: ALL_PILLARS`); Primary Pillar wird intern als 'workout' gesetzt (kein UI-Schritt — Änderung über Settings möglich); speichert language/goal/equipment/primary_pillar/active_pillars
│   ├── WorkoutPage.tsx        # Tabs: Workouts / Timer / Eigene / History (Tab-Label geändert: "WODs" → "Workouts"); Kategorie-Chips (Alle/CrossFit/HIIT/Kraft-Ausdauer/Kraft - Wenig Zeit/Krafttraining) als `flex flex-wrap` (kein overflow-x-scroll) über WodList; `wodCategory`-State → WodList-Prop; **Equipment-Filter**: wenn `profile.equipment` gesetzt → `userEquipment`-Prop an WodList; Toggle-Button "Equipment-Filter aktiv — Alle anzeigen" / "Equipment-Filter aus — aktivieren" (`showAllEquipment`-State); Timer-Tab idle-Zustand öffnet FreeTimerWizard (variant=adhoc) via "Timer konfigurieren"-Button; Krafttraining-Tab öffnet KrafttrainingView; timerConfig enthält exercises?: WizardExercise[]; handleWizardStart/handleAdhocStart nehmen 5. Param exercises auf; TimerView bekommt exercises={timerConfig.exercises}; `onShowHistory={() => setTab('history')}` an TimerView weitergegeben; Eigene-Tab zeigt CustomWorkoutsPage; **Tab-Sperre während Warmup**: `showWarmupTimer`-State sperrt Tab-Wechsel; `handleAdhocStart` setzt aktiven Tab explizit auf 'timer' (verhindert TimerView-Unmount + unterbrochene adHocLog-Kette)
│   ├── RoutinePage.tsx        # Titel: Routinen; Tabs: Routinen / Todo / Woche (kein WaterTracker, kein MoodCheck); hört auf `carveout:workout-completed` CustomEvent — auto-completed offene Todos deren Text `/workout|training|sport/i` matcht; TodoList via `display:none` gemountet statt konditionellem Unmount → activeList-State bleibt beim Tab-Wechsel erhalten; `todosLoading`-Prop an TodoList weitergereicht
│   ├── StretchingPage.tsx     # Stretching-Pillar (Phase 4); FilterBottomSheet (Goal/Kategorie inkl. Yoga-Subcategory + yoga_flow, Dauer); 5 Yoga Flows (YOGA_FLOWS-Array: Morgen-Flow/Hüft-Öffner/Rücken-Relief/Power-Flow/Schlaf-Flow) als clientseitige virtuelle Routinen — Exercises per Name-Hint-Match aus DB gelöst; `resolvedYogaFlows` useMemo; Flow-Cards mit Level-Badge + holdTime-Prop an GuidedSession
│   ├── MeditationPage.tsx     # Meditation-Pillar (Phase 5); Sub-Tabs im Meditieren-Tab: Ungeführt (UnguidedTimer) / Geführt (GuidedPlayer + DB-Sessions + Freie Meditation); FilterBottomSheet (Kategorie + Dauer) nur im Geführt-Sub-Tab; view=free_meditation (Quick-Select 5/10/20 min via AdHocMeditationTimer)
│   ├── FavoritesPage.tsx      # Drei Sektionen (Workouts / Stretch & Yoga / Meditationen), URL-Param ?section=
│   ├── CheckoutSuccessPage.tsx  # Bestätigungsseite nach Stripe-Checkout; liest `?session_id=`; zeigt Erfolgs-Meldung + Link zu /home; öffentliche Route `/checkout/success`
│   ├── CheckoutCancelPage.tsx   # Abbruch-Seite; zeigt Meldung + Link zurück zu `/`; öffentliche Route `/checkout/cancel`
│   ├── ProfilePage.tsx        # **entfernt als eigenständige Route** — Route `/profile` redirectet auf `/settings`; Passwort-Reset + E-Mail-Anzeige in SettingsPage (Allgemein-Submenu) integriert; Abo-Sektion in SettingsPage (parallel zu früherer ProfilePage)
│   ├── SettingsPage.tsx       # Submenüs: Allgemein (Sprache, Ziel, Equipment, E-Mail-Anzeige + Passwort-Reset via `supabase.auth.resetPasswordForEmail`), Pillar-Toggle (aktive Pillars + Primary Pillar Hinweis), Benachrichtigungen (Push), Training (Substitution-Toggle, Silent-Mode, **Toggle "Motivationstext anzeigen"** — localStorage Key: `carveout_show_motivation`, default on; steuert AdaptiveSuggestion auf HomePage), Weitere (Feedback); Abo-Status als zusätzliches Submenu; **Toggle "Inaktive Bereiche ausblenden"** (localStorage Key: `hide_inactive_pillars`; CustomEvent `hide_inactive_changed` → Sync zu BottomNav + Sidebar); SaveButton als Outline-Button (border accent, transparent background); liest `user` (zusätzlich zu `profile`) aus authStore; **Push-Fixes (Session AI)**: Permission-denied Check beim Mount → `pushError` sofort gesetzt wenn `Notification.permission === 'denied'`; Push-Präferenzen laden via `maybeSingle()` statt `single()` (kein 406-Fehler wenn Zeile fehlt)
│   └── admin/
│       ├── AdminDashboardPage.tsx
│       ├── AdminUsersPage.tsx
│       ├── AdminTasksPage.tsx
│       └── AdminPlaceholderPage.tsx
├── components/
│   ├── landing/
│   │   ├── LandingNav.tsx      # Sticky Header; Anchor-Links #features / #pricing; DE/EN-Toggle; Login + Start-CTA
│   │   ├── Hero.tsx            # Hero-Sektion mit Headline, Subline, Start-CTA; Pillar-Erwähnung als "Routine" (nicht Ritual)
│   │   ├── PersonaSection.tsx  # Zielgruppen-Karten (3 Personas)
│   │   ├── PillarSection.tsx   # 4 Pillar-Karten mit Farbe + Feature-Liste; Routine-Karte mit Label "Routine" (nicht Ritual)
│   │   ├── HowItWorks.tsx      # 3-Schritt-Erklärung
│   │   ├── ResultsTimeline.tsx # Timeline „Was du in 4 Wochen erreichst"
│   │   ├── PricingSection.tsx  # Pricing-Cards mit Stripe-Checkout-Links; Plan-Auswahl → `/api/stripe/checkout` (POST); Erfolg → `/checkout/success?session_id=`; Abbruch → `/checkout/cancel`
│   │   ├── CtaSection.tsx      # Bottom-CTA mit Start-Button
│   │   └── LandingFooter.tsx   # Footer mit DE/EN-Toggle + Links
│   ├── layout/
│   │   ├── AppShell.tsx       # Layout mit <Outlet />, aktiver Pillar als Context; Mobile-Header (52px, bg: --color-bg-card + border): Links: CarveOut-Logo + Name; Rechts: Vorname als Link zu /settings (max-[360px]:hidden, aria-label "Einstellungen") · Mute · Favoriten · Settings-Link; MAIN_ROUTES-Reihenfolge: /home · /routine · /workout · /stretching · /meditation; Swipe-Navigation (TouchEvent, 50px-Threshold, 30px vertikale Drift-Grenze, active_pillars-aware Route-Reihenfolge)
│   │   ├── BottomNav.tsx      # Tab-Navigation (versteckt ab lg); Reihenfolge: Home · Routine · Workout · Stretching · Meditation; alle 5 Tabs immer sichtbar — inaktive Pillars gedimmt + Alert-Modal beim Antippen; bei `hide_inactive_pillars=true` (localStorage) werden inaktive Tabs ausgeblendet; aktive Pillars aus `user_profiles.active_pillars` (CustomEvent-Sync via `hide_inactive_changed` + `active_pillars_changed`); erstes Item: Home `/home` (de: Mein Tag, en: My Day, es: Mi Día); Routine-Item (de: Routinen, en: Routines, es: Rutinas)
│   │   ├── Sidebar.tsx        # Desktop-Sidebar (240px, sichtbar ab lg-Breakpoint); Reihenfolge: Home · Routine · Workout · Stretching · Meditation; alle Items immer sichtbar — inaktive Pillars gedimmt + Alert-Modal beim Antippen; aktive Pillars aus `user_profiles.active_pillars` (CustomEvent-Sync via `hide_inactive_changed` + `active_pillars_changed`); `hide_inactive_pillars` blendet inaktive Items aus; erstes Item: Home `/home`; isActive-Fix für exakten `/home`-Match
│   │   └── AdminLayout.tsx    # Layout-Wrapper für /admin/*
│   ├── home/
│   │   ├── TodayPillarTracker.tsx  # 4 Chips (Done/Open) aus useTodayPillars; dreisprachig; Header-Label: "Aktueller Stand von heute · N von 4" (de/en/es); Chip-Reihenfolge: Routine · Workout · Mobilität · Achtsamkeit; kurzer Tap → Pillar-Route (useNavigate); **Long-Press (500ms)** → Bottom-Sheet Context-Menu "Heute erledigt ✓" / "Already done" — schreibt in `pillar_manual_logs` via Supabase Upsert; zeigt "Bereits erledigt" wenn Pillar schon done; `longFiredRef` verhindert Navigation nach Long-Press
│   │   ├── AdaptiveSuggestion.tsx  # Empfehlungskarte nach Tageszeit; übergibt `profile.goal` + bereits erledigte Pillars (aus `useTodayPillars`) an `getSuggestedPillar()`; wenn `pillar === null` (alle Pillars erledigt) → "Alle Einheiten für heute erledigt 🎉"-Card (dreisprachig); sonst Pillar-Headline + Sub; kein separater Loading-Guard (profile-null wird von getSuggestedPillar als kein Ziel behandelt)
│   │   ├── TodaysWod.tsx           # Deterministischer Tages-WOD aus Editor's-Pick-Pool (`pickByDate`: Index = dayOfYear % pool.length); staleTime 1 h; Fallback auf `EDITORS_PICK_IDS`-Set wenn Supabase-Pool leer; **Mood-adaptive Logik**: liest letztes Mood (heute oder gestern) via Query `recent_mood_wod` aus `daily_logs` (auth-gated); LOW_MOODS={Müde, Gestresst} → Erholungs-Karte mit Navigation zu /stretching + /meditation statt WOD; HIGH_MOODS={Super} → normales WOD + "Push Hard 🔥"-Badge; kein Mood / anon → normales WOD; dreisprachig (DE/EN/ES)
│   │   ├── OnboardingSlides.tsx    # Fullscreen Produkttour (z-50 Overlay); lädt Slides aus `public/onboarding-slides.json`; guard: `carveout_tour_done` localStorage-Flag — zeigt sich nur einmalig; **Slide-Interface**: id/emoji/title/subtitle/pillarColor + `pillars?: SlidePillar[]` (farbige Pillar-Chips) + `subtitleExtra?: string` (prominente zweite Zeile, text-lg font-bold); Rendering: wenn `pillars` gesetzt → Chip-Reihe statt subtitle; wenn `subtitleExtra` gesetzt → subtitle + subtitleExtra; sonst nur subtitle (text-base); Navigation: Weiter/Zurück/Überspringen/"Los geht's!"; dreisprachig (SKIP/NEXT/START_LABEL); Props: lang (default 'de'); montiert in HomePage als erstes Element
│   │   ├── WhatsNewBanner.tsx      # Dismissible What's-New-Banner auf HomePage; lädt `public/whats-new.json` (Felder: version/emoji/title/text); localStorage Key: `carveout_whats_new_dismissed_v<version>` (pro Version einmalig); Styling: Routine-Blau (`#4A90D9`)
│   │   ├── WeekStrip.tsx           # 7-Tage-Aktivitäts-Widget auf Mein Tag (unter Pillar-Kacheln); farbige Dots (4 Pillars) pro Tag; Link zu `/history`; nutzt `useWeekPillars`; dreisprachig (DE: "Letzte 7 Tage", EN: "Last 7 Days"); ersetzt WeekStats + RecentActivity
│   │   ├── WeekStats.tsx           # **Entfernt aus HomePage** — ersetzt durch WeekStrip; Datei im Repo, nicht mehr gerendert
│   │   └── RecentActivity.tsx      # **Entfernt aus HomePage** — ersetzt durch WeekStrip; Datei im Repo, nicht mehr gerendert
│   ├── workout/
│   │   ├── WodCard.tsx        # zeigt `⭐` (title "Editor's Pick") wenn `wod.is_editors_pick = true`
│   │   ├── WodList.tsx        # sessionStorage-Persistenz für Suchbegriff (Key: wod_search) **und Filter-State** (Key: wod_filters — Typ/Kategorie/Schwierigkeit/Dauer/Equipment werden beim Verlassen der Seite erhalten); FilterBottomSheet (Typ, Kategorie, Schwierigkeit, Dauer Von-Bis, Equipment Exclude — Editor's-Pick-Filter **entfernt**); Würfel-Button für Random-WOD; empfängt `userEquipment`-Prop (→ useWods); `editorsPick`-State intern entfernt, nur noch `editorsPickProp` als externer Prop
│   │   ├── WodDetail.tsx      # enthält FavoriteButton (contentType="wod", color="#E8642A"); "Warmup-Timer starten"-Button im Warmup-Akkordeon; nutzt WOD_TYPE_TO_MODE aus timerLabels.ts; feuert `carveout:workout-completed` CustomEvent bei Timer-Ende; `setShowScore(true)` aus `onComplete` entfernt — Completion-Screen wird von TimerView selbst gehandelt
│   │   ├── TimerView.tsx      # Nutzt timer.worker.js; AMRAP/ForTime/EMOM/Tabata konfigurierbar; adHocLog-Prop: auto-Log in wod_history ohne WOD aus DB; CountdownOverlay: 3-2-1-Go Einblendung vor Timer-Start (SVG-Puls-Animation); exercises-Prop (WizardExercise[]): zeigt Übungsliste unterhalb Timer-Controls (Nummer, Name, optional Detail); Reset-useEffect prüft `isComplete` — kein Reset nach Timer-Ende (Restart-Bug-Fix); **EMOM/Tabata Übungsrotation**: aktueller Übungsname prominent + `NextExercisePreview` (EMOM: letzte 10s des Intervalls; Tabata Work: letzte 10s; Tabata Rest: gesamte Phase); **autoStart**: wenn `initialMode` gesetzt → `autoStart=true` → Config-UI + Modus-Selektor ausgeblendet, Countdown startet direkt beim Mount (useEffect on []); **Beep 10s vor Ende**: Web Audio API, kurzer Warnton (880 Hz) bei `timeLeft === 10` (nur ForTime/AMRAP); **Completion-Screen**: `isComplete` → eigener Screen (Emoji, "Gut gemacht!" / "Well done!", Score, Buttons: Schliessen + "In History anzeigen"); `onShowHistory`-Prop; `isComplete` in `setSessionActive` eingeschlossen (Swipe auch während Completion-Screen gesperrt)
│   │   ├── FreeTimerWizard.tsx  # Wizard; variant='save' (3 Steps: Modus → Übungen → Konfiguration/Name, speichert via customWorkouts.ts) | variant='adhoc' (4 Steps: Modus → Übungen → Konfiguration → Warmup-Frage); onStart(mode, minutes, withWarmup?, kraftConfig?, exercises?: WizardExercise[], workoutName?, timerConfig?) → triggert TimerView; bei nicht-Kraft-Modi werden exercises übergeben (wenn nicht leer); Modus-Auswahl via TIMER_LABELS aus timerLabels.ts; **Step 2 Slider**: AMRAP/ForTime: `<input type="range" min=0/1 max=60>` neben +/−-Buttons; **Tabata Runden-Slider**: range 1–20 neben +/−-Buttons; **EMOM Runden-Slider**: range 1–30 neben +/−-Buttons; alle Slider mit `accentColor` der Modus-Farbe; `TimerInitConfig` Interface (tabataWork/tabataRest/tabataRounds/emomInterval/emomRounds); gespeicherte Workouts erscheinen in CustomWorkoutsPage
│   │   ├── WarmupTimer.tsx    # Fullscreen-Overlay (fixed inset-0, bg: --color-bg, overflow-y-auto); Presets 3/5/10 min + manuellem Input; Countdown-Ring (SVG, w-36); CountdownOverlay: 3-2-1-Go vor Timer-Start; Wake Lock; playGong + vibrate + Toast bei Ende; **Beep 10s vor Ende** (Web Audio API, kurzer 880 Hz Ton); **Übungsliste während Timer**: DEFAULT_EXERCISES-Array sichtbar, aktuell laufende Übung hervorgehoben (elapsed % TOTAL_EXERCISE_CYCLE_SEC → Index); eingebettet in WodDetail
│   │   ├── KrafttrainingView.tsx  # Satz-basierter Krafttraining-Flow; Übungsauswahl aus FreeTimerWizard-Übungsliste; pro Satz: Gewicht (kg) + Wiederholungen; Satz-Abschluss per Tap; Rest-Timer zwischen Sätzen; Session-Log am Ende; **Completion-Screen** (phase=done): zeigt "Gut gemacht!" / "Well done!" (DE/EN); `setSessionActive(phase !== 'idle')` → Swipe auch im Done-Screen gesperrt
│   │   ├── CustomWorkoutsPage.tsx  # Liste gespeicherter Custom Workouts; nutzt `useCustomWorkouts` (Supabase + localStorage Fallback); Loading-State; Start-Button → FreeTimerWizard (variant=adhoc, vorausgefüllt); Löschen mit Bestätigungs-Prompt; leerer State mit CTA zum Wizard
│   │   ├── WodHistoryList.tsx
│   │   └── ScoreInput.tsx
│   ├── routine/
│   │   ├── RoutineItem.tsx    # farbige Left-Border + Punkt-Indikator bei linked_pillar; Tap → Pillar-Navigation; Bleistift öffnet Edit
│   │   ├── RoutineList.tsx    # inkl. Routine-Create-Modal (RoutineEditModal); Vorschläge-Label "Vorgeschlagene Routinen"; Dismiss-Button pro Vorschlags-Item (localStorage Key: dismissed_suggestions); Drag & Drop via @dnd-kit/core+sortable (sort_order Supabase-Sync via onReorder-Prop)
│   │   ├── RoutineEditModal.tsx  # Felder: Name, Beschreibung, Wochentage, Uhrzeit (type=time, time: string|null), Pillar-Selektor (4 farbige Chips + Keine); Toast nach Speichern (erster aktiver Wochentag)
│   │   ├── WaterTracker.tsx
│   │   ├── MoodCheck.tsx
│   │   ├── TodoList.tsx       # Bug-Fix Session L: leere Todo-Liste zeigte Fehler statt Empty-State; Null-Guard ergänzt; Loading-Spinner wenn todosLoading && todos.length === 0 (kein falsches "Keine Aufgaben" während initialem Fetch)
│   │   └── WeekView.tsx
│   ├── stretching/            # Alle Stretching-Komponenten
│   │   ├── GuidedSession.tsx   # (bestehend) + `defaultExerciseDuration`-Prop (überschreibt config-Default, genutzt von Yoga Flows mit flow.holdTime); Yoga-Atemhinweis (subcategory=yoga_flow); ExerciseKeyframes integriert (Bild-Crossfade pro Übung); per-exercise `duration_sec` überschreibt globales `exerciseDuration` (Fallback wenn 0); Duration-Default wenn kein `defaultExerciseDuration`: Median der `duration_sec`-Werte der Übungen (Fallback 30s); Übungsname in `text-2xl`; Next-Up-Banner via `NextExercisePreview`: letzte 10s der Exercise-Phase + gesamte Rest-Phase (wenn `pauseDuration >= 5`); **Bilateral-Fix**: jede Seite nutzt volle `exerciseDuration` (nicht mehr `Math.floor(total/2)`); Phasenlogik (switch: left→right→pause) bleibt intakt
│   │   └── SessionCreator.tsx  # 3-Step Wizard (Auswählen nach muscle_group → Reihenfolge → Name); erstellt virtuelle StretchingRoutine; speichert benannte Sessions via customWorkouts.ts
│   ├── wizard/
│   │   ├── WizardShell.tsx    # Generischer 3-Step Full-Screen Modal-Wrapper; Progress-Bars, Back/Next/Close, canNext-Guard, body-overflow-lock
│   │   └── ExerciseListEditor.tsx  # Reorderable Liste (↑/↓/✕) + optionales Add-Input-Feld; Props: items, onChange, placeholder, showAddInput
│   ├── meditation/            # Alle Meditation-Komponenten (inkl. AdHocMeditationTimer.tsx — circular progress, gong, vibrate, wake lock, session-log); **UnguidedTimer.tsx** (Phasen-Timer: 5 Typen breathing/box_breathing/body_scan/focus/open_awareness, 5–20 min, dreisprachig TYPE_LABELS, PHASES-Map); **GuidedPlayer.tsx** (lädt `public/audio/sessions/sessions.json`, MP3-Player mit Progress, `available`-Flag — Placeholder bis Audiodateien vorhanden); **AmbientPlayer.tsx** (10 Ambient-Sounds, Lautstärke-Slider, localStorage-Persist `meditation_ambient_sound`, trackt `ambient_sound_selected` via useAnalytics; kein `unavailable`-State — Buttons immer klickbar, Fehler stoppt nur Playback)
│   ├── shared/
│   │   ├── ExerciseKeyframes.tsx  # Bild-Crossfade-Komponente (interval-basierter Opacity-Wechsel, Props: exerciseId, frames, interval=2000ms); gibt null zurück wenn frames leer — kein Render bis Bilder vorhanden
│   │   └── NextExercisePreview.tsx  # Opacity-Fade-Banner "Als nächstes: <Name>"; Props: name, visible, color; opacity-Transition 0.3s; rendert immer (opacity 0 wenn nicht visible/kein name)
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── FavoriteButton.tsx # SVG-Herz, 44×44 Touch-Target, Pillar-Farbe
│   │   ├── FilterBottomSheet.tsx # Generisches Filter-Sheet (Draft-State, CSS-Transition, Apply/Reset/Backdrop-Close)
│   │   └── FeedbackModal.tsx  # Bottom-Sheet: Bug/Idee/Lob Chips + Textarea; schreibt in feedback-Tabelle; geöffnet via SettingsPage
│   └── AdminRoute.tsx         # Role-Guard (admin/moderator)
├── hooks/
│   ├── useTodayPillars.ts     # 5 parallele Supabase-Queries (wod_history/stretching_logs/meditation_logs/routine_logs + pillar_manual_logs) → TodayPillars { workout, routine, stretching, meditation, total }; OR-Logik pro Pillar (DB-Eintrag ODER manueller Log); staleTime 5 min
│   ├── useRoutines.ts         # CRUD Routinen
│   ├── useRoutineLogs.ts      # Completion-Logs
│   ├── useDailyLog.ts         # Tages-Mood, Wasser; **auth-gated**: `enabled: !!userId`; queryKey `['daily_log', userId ?? 'anon', date]`; userId aus Store; **setMood.onSuccess** invalidiert zusätzlich `['recent_mood_wod']` → TodaysWod reagiert sofort auf Mood-Änderung
│   ├── useTodos.ts            # To-do-Liste; staleTime 0 (refetcht bei jedem Window-Focus → Cross-Device-Sync); retry: 1 (transiente Netzwerkfehler erholen sich automatisch)
│   ├── useWods.ts             # Supabase oder /wods.json Fallback; Filter: equipmentFilter, silentMode, editorsPick, excludeEquipment, **userEquipment** (profile.equipment — zeigt nur WODs deren equipment_tags ⊆ userEquipment; Fallback auf altes `equipment`-Feld für lokales JSON; Normalisierung via `normEq()`: lowercase + Mapping dumbbells→dumbbell, resistance bands→resistance band, rowing machine→rower, assault bike→bike; bodyweight immer in allowed-Set (sowohl `equipmentFilter` als auch `userEquipment`); `mapRawToWod` splittet `equipment`-String mit `.filter(Boolean)` — leere Strings werden entfernt), minDuration, maxDuration, wodCategory (crossfit|hiit|kraft_ausdauer|kraft_wenig_zeit|krafttraining); Supabase-Query mit `.eq('is_visible', true)`; pickRandomWod() (gecachte lokale WODs + alle Filter); **pickByDate(wods)** (deterministisch: Index = dayOfYear % pool.length — genutzt von TodaysWod)
│   ├── useCustomWorkouts.ts   # TanStack Query + Supabase Dual-Write für Custom Workouts (Supabase primary, localStorage Fallback); **auth-gated**: `enabled: isSupabaseConfigured ? !!userId : true` (kein leerer Cache für unauthenticated State); queryKey enthält userId; Mutations: addWorkout / updateWorkout / deleteWorkout; dbToWorkout / workoutToDb Mapping; staleTime 5 min
│   ├── useWodHistory.ts       # localStorage + Supabase Dual-Write, personalBest; **auth-gated**: `enabled: isSupabaseConfigured ? !!userId : true`; queryKey 3-teilig `['wod_history', userScope, wodName ?? '_all']` (userScope = userId oder 'anon' oder 'local'); userId aus Store (nicht mehr via `getSession()`); onSuccess: setQueryData auf _all + wod_name Keys für sofortige Cache-Aktualisierung; **_fromLocal-Pattern**: bei lokalem Fallback wird `{ _fromLocal: true }` an Entry gehängt → `invalidateQueries` wird übersprungen; Duplikat-Guard in setQueryData (`.filter(e => e.id !== data.id)` vor Prepend)
│   ├── useHighscores.ts       # Top-10 pro WOD (Supabase oder local)
│   ├── useWeekPillars.ts      # letzte 7 Tage: 5 Supabase-Queries (wod_history, stretching_logs, meditation_logs, routine_logs, pillar_manual_logs) → Map\<dateKey, Set\<PillarId\>\>; genutzt von WeekStrip
│   ├── useStretching.ts       # Stretching-Übungen, Routinen, Logs; `useStretchingExercises` + `useStretchingRoutines`: userId in queryKey (verhindert stale-empty-Cache-Poisoning beim Auth-Race auf erstem Mount); staleTime 5 min (war: 30 min)
│   ├── useStretchingLogs.ts   # localStorage + Supabase Dual-Write für Stretching-Sessions; **auth-gated**: `enabled: !!user`; **_fromLocal-Pattern** (wie useWodHistory): lokaler Fallback markiert Entry mit `_fromLocal: true` → `invalidateQueries` übersprungen; **UUID-Validierung** vor FK-Insert (`routine_id`): Custom-Session-IDs ohne gültiges UUID-Format → routine_id auf null gesetzt (verhindert FK-Fehler); `setQueryData` statt nur `invalidateQueries` bei lokalem Fallback (sofortige Cache-Aktualisierung)
│   ├── useMeditations.ts      # Meditationen, Session-Logs; **auth-gated** in useMeditationLogs: `enabled: !!user`
│   ├── useBreathworkTechniques.ts  # Breathwork-Techniken
│   ├── useFavorites.ts        # localStorage + Supabase Dual-Write, optimistic UI; content_type: wod | stretching_routine | meditation
│   ├── useSubscription.ts     # Liest `subscription_status` + `trial_ends_at` aus `user_profiles` (authStore); gibt zurück: `status`, `isActive`, `isTrial`, `isExpired`, `trialDaysLeft`, `startCheckout(priceId)` (POST `/api/stripe/checkout` → redirect)
│   ├── useAudio.ts            # Web Audio API; isMuted-Check via audioStore in allen play*-Funktionen + startBackground
│   ├── useAnalytics.ts        # Wrapper um posthog.capture: track(event, props?) — Events: meditation_started, yoga_flow_started, workout_completed, ambient_sound_selected
│   └── useToast.ts            # Wrapper um toastStore: toast.success/error/info/warning/show
├── sw.ts                      # Service Worker (Workbox injectManifest; **NavigationRoute+NetworkFirst vor precacheAndRoute registriert** → kein Blank-Screen nach Cache-Clear; precaching + Push-Handler; gebaut zu dist/sw.js via vite-plugin-pwa)
└── public/
    ├── wods.json              # 796 WODs lokal (aus wod-tracker migriert, 7 Duplikate bereinigt)
    ├── timer.worker.js        # Drift-korrigierter Web Worker
    ├── favicon.svg            # SVG C-Bogen (Pfeil entfernt seit Session P)
    ├── icon-source.svg        # Master-SVG für Icon-Generierung (C-Logo, Hintergrund #0D0D14)
    ├── icon-192.png           # PWA-Icon 192×192 (generiert via scripts/generate_icons.mjs)
    ├── icon-512.png           # PWA-Icon 512×512 (generiert via scripts/generate_icons.mjs)
    ├── apple-touch-icon.png   # Apple Touch Icon 180×180 (generiert via scripts/generate_icons.mjs)
    ├── icons.svg
    ├── manifest.json          # PWA-Manifest (name/short_name CarveOut, theme_color #0D0D14, SVG-Icon)
    ├── onboarding-slides.json  # 5 Produkttour-Slides; Felder: id/emoji/title/subtitle/pillarColor + `pillars[]` (SlidePillar: label/color/emoji — Slide 2) + `subtitleExtra` (Slides 3+4); JSON-Datei, von OnboardingSlides.tsx geladen
    ├── whats-new.json          # What's-New-Daten (version/emoji/title/text); pro Release manuell aktualisieren
    └── audio/
        ├── ambient/           # Slot für Ambient-Sound-Dateien (Meditation); aktuell manuell befüllt — kein Build-Step
        └── sessions/
            ├── sessions.json  # 7 Placeholder-Sessions (body_scan/breathing/focus/sleep/morning/stress_relief); alle available=false bis MP3s vorhanden; Felder: id, title, duration, type, file, available
            └── meditation-ping.wav  # 528 Hz Sinus-Ping (1,4 s Decay), generiert via scripts/generate_ping.mjs
```

### PWA-Konfiguration

`apps/web/index.html`:
- `<title>CarveOut</title>`
- `<link rel="manifest" href="/manifest.json" />`
- `<meta name="theme-color" content="#0D0D14" />`
- Apple-Meta-Tags: `mobile-web-app-capable (ersetzt deprecated apple-mobile-web-app-capable)`, `apple-mobile-web-app-status-bar-style` (black-translucent), `apple-mobile-web-app-title` (CarveOut)

`apps/web/public/manifest.json`:
- `name` / `short_name`: CarveOut
- `display`: standalone
- `background_color` / `theme_color`: `#0D0D14`
- Icon: `/favicon.svg` (type `image/svg+xml`, sizes `any`)

### Routing (App.tsx)

```
/                              → LandingPublicRoute (nicht-auth: LandingPage; auth: Redirect /home)
/impressum                     → ImpressumPage (öffentlich, kein Auth nötig)
/datenschutz                   → DatenschutzPage (öffentlich, kein Auth nötig)
/checkout/success              → CheckoutSuccessPage (öffentlich; liest `?session_id=`; zeigt Bestätigung + Link zu /home)
/checkout/cancel               → CheckoutCancelPage (öffentlich; zeigt Abbruch-Meldung + Link zurück zu /)
/login, /register              → AuthLayout (kein Auth nötig; auth: Redirect /home)
/home → AppShell (ProtectedLayout)
  /home                        → HomePage (Dashboard)
  /onboarding
  /workout
  /workout/:wodName
  /routine
  /stretching
  /meditation
  /favorites
  /history
  /settings
  /profile                      → Navigate to="/settings" replace (kein eigener Render)
/admin → AdminLayout (AdminRoute: role admin/moderator)
  /admin
  /admin/users
  /admin/tasks
  /admin/push
  /admin/emails
  /admin/feedback
  /admin/wods
```

### Route Guards (App.tsx)

- `LandingPublicRoute` — öffentlich; eingeloggte User werden nach `/home` redirected
- `AuthLayout` — Login/Register; eingeloggte User werden nach `/home` redirected
- `ProtectedLayout` — alle App-Routen; nicht-eingeloggte User → `/login`; nicht-ongeboardete User → `/onboarding`

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
| Payments | Stripe JS + Stripe Node | Checkout Sessions, Webhooks (stripe-signature Verifikation), Portal-Link |
| Analytics | PostHog JS | EU-Cloud (`eu.i.posthog.com`), `person_profiles: 'never'`, `persistence: 'memory'` — kein Cookie-Banner nötig |
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
| `user_profiles` | Nutzer-Metadaten: language, activePillars, primaryPillar, colorTheme, subscriptionStatus, **trial_ends_at** (timestamptz NULL), **role** (admin/moderator/user), **subscription_status** (trial\|active\|expired\|cancelled), **stripe_customer_id** (text NULL), **stripe_subscription_id** (text NULL), **equipment** (string[]), **equipment_by_location** (JSONB: Record\<WorkoutLocation, string[]\>), **goal** text NULL (Migration 015) |
| `routines` | Rituale eines Nutzers (Name, Beschreibung, Pillar, Uhrzeit, Wochentage, `linked_pillar` VARCHAR NULL — Migration 012) |
| `routine_logs` | Completion-Einträge pro Routine + Datum |
| `todos` | To-do-Liste pro Nutzer + Datum |
| `daily_logs` | Tageseinträge: Mood, Wasserkonsum, Notizen; wird von `TodaysWod` für mood-adaptive Erholungs-Karte ausgelesen (Query `recent_mood_wod`); **bestätigt aktiv** (Screenshot 2026-05-30: Müde/Gestresst → "Gönn dir heute Erholung" + Mobilität/Achtsamkeit-CTA) |
| `wods` | WOD-Stammdaten (bis zu 981 Einträge, statisch, read-only für Users); `is_editors_pick` bool (Migration 010); `wod_category` text CHECK (crossfit\|hiit\|kraft_ausdauer\|kraft_wenig_zeit\|krafttraining), Default crossfit (Migration 015); `is_visible` bool NOT NULL DEFAULT true — Soft-Delete (Migration 015); `equipment_tags` text[] NOT NULL DEFAULT '{}', GIN-Index (Migration 016); lokaler Fallback: `EDITORS_PICK_IDS` Set in `useWods`; Migration 021: 183 neue WODs (hiit 60, kraft_ausdauer 50, kraft_wenig_zeit 30, krafttraining 43); Migration 022: CrossFit-WODs außer Girls/Heroes auf is_visible=false; **Migration 023**: partieller Index auf `is_editors_pick = true` (Spalte existiert seit Migration 010, Index neu für schnelle Editor's-Pick-Queries) |
| `wod_history` | Workout-Logs pro Nutzer (WOD, Score, Datum, Notizen) |
| `stretching_exercises` | 65 Übungen (dreisprachig, bilateral_support, category, `subcategory` VARCHAR NULL — Migration 011; Yoga-Tagging via keyword-basiertem UPDATE — Migration 019) |
| `stretching_routines` | 18 Routinen mit exercise_ids; `subcategory` VARCHAR NULL (Migration 011, Yoga-Seed) |
| `stretching_logs` | Completion-Logs pro Nutzer |
| `meditations` | 20 Einträge (name/description/instructions als JSONB, category, duration_min, difficulty, background_sound) |
| `breathwork_techniques` | 8 Techniken (inhale_sec, hold_in_sec, exhale_sec, hold_out_sec, cycles) |
| `meditation_logs` | Session-Logs pro Nutzer |
| `push_subscriptions` | Web Push Subscription JSON pro User; Migration: `add_push_subscriptions` (kein Nummern-Präfix — inkonsistent; sollte `029_push_subscriptions.sql` folgen) |
| `push_preferences` | Reminder-Einstellungen (morning/evening/wod/inactivity + Zeiten); **keine Migration vorhanden — manuell im Dashboard angelegt**; Migration 029 ausstehend |
| `favorites` | Favoriten pro Nutzer: `content_type` (wod \| stretching_routine \| meditation), `content_id` (string); DDL als Kommentar in `useFavorites.ts` |
| `feedback` | User-Feedback: `category` (bug \| idee \| lob), `message` text; RLS: User kann nur eigene Einträge einfügen + lesen (Migration 014); DB-Webhook auf INSERT → `notify-feedback` Edge Function (Migration 020) |
| `custom_workouts` | Custom Workouts pro Nutzer: `id` UUID PK, `user_id` UUID FK, `name` text, `mode` text, `config` JSONB (minutes/rest/tabata/emom-Parameter), `exercises` JSONB, `with_warmup` bool, `created_at`/`updated_at` timestamptz; RLS: User verwaltet nur eigene Einträge; GIN-Index auf user_id (Migration 026) |
| `pillar_manual_logs` | Manuelle Pillar-Completions: `user_id` UUID FK, `pillar` text, `date` date, `source` text ('manual'); RLS: User verwaltet nur eigene Einträge; Upsert-Schutz (Migration 027) |

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
  trial_ends_at: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
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

**Beep vor Ende:** `TimerView` (ForTime/AMRAP) und `WarmupTimer` spielen bei `timeLeft === 10` einen kurzen Warnton (880 Hz, Web Audio API). Kein Beep bei EMOM/Tabata (dort regelt der Intervall-Wechsel die Orientierung). Mute-Toggle (`audioStore.isMuted`) unterbindet auch den Beep.

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
- `subscribeToPush()` — erzeugt Web Push Subscription, persistiert in `push_subscriptions`; SW-Registrierung + pushManager.subscribe je in eigenem try/catch → return false statt throw (kein unhandled rejection)
- `unsubscribeFromPush()` — entfernt Subscription aus DB und Browser
- Settings-UI mit Toggles pro Reminder-Typ (morning / evening / wod / inactivity) inkl. Zeitauswahl
- `pushError: string | null` State in `SettingsPage` — zeigt Fehlermeldung wenn `subscribeToPush()` false zurückgibt (z.B. Permission denied); Toggle-Buttons mit `type="button"` + `cursor: pointer`; handleTogglePush + handleSavePushPrefs je try/catch/finally — setPushLoading(false) / setSavingPush(false) garantiert in finally; handleSavePushPrefs early-return wenn !pushEnabled
- Preferences gespeichert in `push_preferences` (Supabase)
- VAPID Public Key via `VITE_VAPID_PUBLIC_KEY` (GitHub Secret, im CI-Build-Env seit Session Y)

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
   Build-Env (Secrets): VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_POSTHOG_KEY, VITE_POSTHOG_HOST,
   VITE_STRIPE_PUBLISHABLE_KEY, VITE_STRIPE_PRICE_MONTHLY_CHF, VITE_STRIPE_PRICE_ANNUAL_CHF,
   VITE_STRIPE_PRICE_MONTHLY_EUR, VITE_STRIPE_PRICE_ANNUAL_EUR, VITE_VAPID_PUBLIC_KEY
5. rsync dist/ → Server:/var/www/carveout/
   (via DEPLOY_SSH_KEY + DEPLOY_HOST Secrets)
6. nginx -s reload (via SSH)
```

Kein Container, kein Docker — direktes rsync des Vite-Build-Outputs.

### MCP / Entwicklungs-Tools (Stand Mai 2026)

| Tool | Status | Verwendung |
|---|---|---|
| **Supabase MCP** | ✅ Verfügbar | Tabellenliste + Schema-Queries direkt aus Claude Code (Anon-Key in `apps/web/.env` eingetragen) |
| **Playwright / Puppeteer MCP** | ✅ Verfügbar | Screenshots via Python Playwright + System-Chrome (`C:\Program Files\Google\Chrome\Application\chrome.exe`); Chromium-Download via npm schlägt wegen SSL-Zertifikat fehl — System-Chrome als Workaround (`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`) |

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
| **Phase 7-9 Cleanup** | Zeit-Filter (`minDuration`/`maxDuration` in `useWods`), Substitution-Toggle (SettingsPage + WodDetail-Gate, localStorage), Silent Mode / Parent Mode (`is_jumping`-Flag auf WOD-Ebene, Keyword-Sweep 251 WODs, SettingsPage-Toggle + WodList-Filter), Stretching & Yoga Rebranding (i18n DE/EN/ES), Hybrid-Labels für WOD-Typen (`wodTypeLabels.ts`, WodCard + WodList + TimerView sprachabhängig), BottomNav i18n, LogoIcon SVG (C-Bogen + Pfeil, Sidebar + favicon.svg — Pfeil entfernt in Session P) |
| **Wake Lock (Stretching + Meditation)** | Screen Wake Lock in `GuidedSession`, `MeditationSession`, `CustomTimer` — selbes Pattern wie `TimerView` |
| **Gong am Session-Ende** | `GuidedSession`, `MeditationSession`, `CustomTimer` spielen Gong bei Timer-Ende und manuellem Beenden |
| **Routine-Create Modal** | Custom Routine direkt aus `RoutineList` erstellen via `RoutineEditModal`, optimistic Insert in `useRoutines` + `useTodos`; `useRoutines` (update + delete) und `useTodos` (complete) vollständig optimistic (onMutate/onError rollback/onSettled) |
| **Favoriten-System** | `useFavorites` (localStorage + Supabase Dual-Write), `FavoriteButton`, `FavoritesPage` (/favorites), drei Sektionen (Workouts / Stretch & Yoga / Meditationen), AppShell-Header-Badge + Sidebar-Eintrag |
| **PWA-Manifest** | `manifest.json` (standalone, theme `#0D0D14`, SVG-Icon), `index.html` Title + Apple-Meta-Tags |
| **Session D: Polish** | Duration-Filter-Chips in `WodList` (Alle/≤15/≤20/≤30 min) + `StretchingPage` (Alle/≤5/≤10/≤20 min); WOD-Suche sessionStorage-persistent (Key: `wod_search`); Push-Fehlerbehandlung (`pushError` State in `SettingsPage`); Optimistic Updates: `useRoutines` (update+delete) + `useTodos` (complete); 7 Duplikat-WODs aus lokalem JSON bereinigt (796 lokal / 798 Supabase) |
| **Session E: Polish II** | `audioStore` (Zustand persist: `isMuted`/`toggleMute`), Mute-Button im Mobile-Header (`AppShell`); Vibration-Feedback in `TimerView`/`GuidedSession`/`MeditationSession`/`CustomTimer`; `RoutineEditModal` Uhrzeit-Feld (`time: string\|null`); `FavoriteButton` in `WodDetail`; `MeditationPage` `duration_min > 0` Guard; `FavoriteButton` fix: Sichtbarkeit + Tag-Overflow-Schutz auf Cards |
| **Session F** | **Editor's Pick** (`is_editors_pick` auf `wods`, Migration 010, lokaler Fallback via `EDITORS_PICK_IDS`; `AdminWodsPage` mit Toggle); **Random-WOD-Picker** (Würfel-Button in `WodList`, `pickRandomWod()` mit allen aktiven Filtern, Toast); **FilterBottomSheet** (`components/ui/FilterBottomSheet.tsx`; Draft-State, Apply/Reset/Backdrop-Close; ersetzt Chip-Reihen in `WodList`/`StretchingPage`/`MeditationPage`; `WodList`: Typ/Kategorie/Schwierigkeit/Editor's Pick/Dauer Von-Bis/Equipment Exclude); **Yoga-Subcategory** (`subcategory` auf `stretching_exercises`+`stretching_routines`, Migration 011, `StretchingPage` filtert via `r.goal === filter \|\| r.subcategory === filter`); **Routine linked_pillar** (Migration 012, `RoutineEditModal` Pillar-Selektor, `RoutineItem` farbige Left-Border + Pillar-Navigation); **Workbox sw.ts** (`src/sw.ts` via `vite-plugin-pwa injectManifest`; precaching + NetworkFirst/StaleWhileRevalidate; `public/sw.js` gelöscht); **Toast-System** (`toastStore` + `useToast.ts`, kein Package); **Ad-hoc Timer-Log** (`TimerView.adHocLog`-Prop); **Freie Meditation** (`AdHocMeditationTimer`, `view=free_meditation` in `MeditationPage`) |
| **Session G** | **Dashboard-Familie** — Route `/` zeigt `HomePage` (kein Redirect mehr auf `/workout`); `TodayPillarTracker` (4 Chips Done/Open via `useTodayPillars`); `AdaptiveSuggestion` (Empfehlungskarte nach Tageszeit, `adaptiveSuggestion.ts`); `TodaysWod` (deterministisch aus Editor's-Pick-Pool via `pickByDate`); `WeekStats` (Session-Counts Workout/Stretching/Meditation letzte 7 Tage); `RecentActivity` (letzte 3 WOD-Einträge, relatives Datum); BottomNav + Sidebar: Home-Item als erstes Item; Sidebar `isActive`-Fix für `/` |
| **Session H** | **Rebrand + UX-Polish** — Home-Nav-Item umbenennen (de: Mein Tag / en: My Day / es: Mi Día); Routine-Pillar umbenannt zu Ritual/Rituale (i18n, RoutinePage-Titel, RoutineEditModal, RoutineList-Vorschläge-Label) — **rückgängig gemacht in Session W**: Label zurück zu Routine/Routinen; **Swipe-Navigation** in `AppShell` (TouchEvent 50px-Threshold, 30px vertikale Drift-Grenze, `active_pillars`-aware Route-Reihenfolge); **Dismiss-Funktion** für Vorschlags-Items in `RoutineList` (localStorage Key: `dismissed_suggestions`); **MoodCheck** von `RoutinePage` → `HomePage` (zwischen `TodayPillarTracker` und `AdaptiveSuggestion`); **WaterTracker** aus `RoutinePage` entfernt (UI only, DB unberührt) |
| **Session I** | **Nav-Reihenfolge** — `BottomNav` + `Sidebar` + `AppShell MAIN_ROUTES`: neue Reihenfolge Mein Tag · Routine · Workout · Stretching · Meditation; **Settings aus BottomNav entfernt** (jetzt nur noch im Mobile-Header als Icon); **Mobile-Header-Redesign** (52px, bg: `--color-bg-card` + border; Links: CarveOut-Logo + Name; Rechts: Vorname (max-[360px]:hidden) · Mute · Favoriten · Settings-Link); **TodayPillarTracker** — Header-Label geändert zu "Aktueller Stand von heute · N von 4" (de/en/es); Chip-Reihenfolge: Routine · Workout · Stretching · Meditation |
| **Session G2** | **Wizard-Framework + Custom Workouts** — `lib/customWorkouts.ts` (CustomWorkout + CustomSession Typen, localStorage CRUD); `wizard/WizardShell` (generischer 3-Step Full-Screen Wizard, Progress-Bars, canNext-Guard); `wizard/ExerciseListEditor` (reorderable Liste mit ↑/↓/✕ + Add-Input); **FreeTimerWizard** (3-Step: Modus → Übungen → Konfiguration/Name, speichert benannte Workouts, triggert TimerView); **SessionCreator** (3-Step: Auswählen → Reihenfolge → Name, erstellt virtuelle StretchingRoutine); **WarmupTimer** (Bottom-Sheet, Presets 3/5/10 min + manuell, Countdown-Ring, Wake Lock, Gong + Vibrate + Toast); `WorkoutPage` "Eigene Workouts"-Sektion; `StretchingPage` "Eigene Sessions"-Sektion; `WodDetail` Warmup-Timer-Button |
| **Session J** | **Bugfixes + neue Features** — Bug MoodCheck: localStorage-Cache + useEffect-Sync für async Supabase-Daten; **Drag & Drop RoutineList** (`@dnd-kit/core` + `@dnd-kit/sortable`, `sort_order` Supabase-Sync); Bug SessionCreator Step 0: Loading/Empty-State; **FreeTimerWizard** Schrittgröße 1 min (1–120 min), neuer `variant='adhoc'` (4. Schritt: Warmup-Frage); **Timer-Tab idle-Zustand** ("Timer konfigurieren"-Button öffnet Ad-hoc-Wizard); **ProfilePage** (`/profile`: Name + Sprache bearbeiten, Passwort-Reset via E-Mail, Abo-Placeholder, Abmelden); **FeedbackModal** (`components/ui/FeedbackModal.tsx`: Bug/Idee/Lob Chips + Textarea, schreibt in `feedback`-Tabelle); SettingsPage Feedback-Button; AppShell Vorname als Link zu `/profile`; **Migration 013**: `user_profiles` RLS defensive Re-Apply + `handle_new_user()`-Trigger; **Migration 014**: `feedback`-Tabelle mit RLS |
| **Session K** | **WOD-Katalog-Onboarding** — **Migration 015**: `wods.wod_category` (crossfit/hiit/kraft_ausdauer/kraft_wenig_zeit [ursprünglich kraft_auf_zeit, via Migration 017 umbenannt], Default crossfit) + `wods.is_visible` (Soft-Delete bool) + `user_profiles.goal` text; **Migration 016**: `wods.equipment_tags` text[] GIN-Index; **`timerLabels.ts`** (`lib/`): zentrale Quelle für Timer-Modus-Labels (TimerMode, TimerLabel, TIMER_LABELS, TIMER_MODE_LIST, WOD_TYPE_TO_MODE); `FreeTimerWizard` nutzt TIMER_LABELS statt altes MODES-Array; `WodDetail` nutzt `WOD_TYPE_TO_MODE`; **WorkoutPage** Kategorie-Chips (Alle/CrossFit/HIIT/Kraft-Ausdauer/Kraft - Wenig Zeit) + Tab-Label "WODs" → "Workouts"; **`WodList`** empfängt `wodCategory`-Prop; **`useWods`** `wodCategory`-Filter + Supabase-Query mit `is_visible=true`; **Onboarding-Overhaul**: 4 Schritte (Sprache/Ziel/Equipment/Pillars), 6 Ziel-Optionen, 14 Equipment-Optionen, Pillars multi-select, speichert `goal`; **`scripts/tag-wod-equipment.ts`**: One-time-Script zur Befüllung von `equipment_tags`; **`supabase/functions/notify-feedback`**: Deno Edge Function — DB-Webhook auf `feedback`-INSERT → Resend API E-Mail-Benachrichtigung |
| **Session L** | **Krafttraining-Modus** — `KrafttrainingView` (Satz-basierter Flow: Übungsauswahl, Gewicht/Rep-Tracking pro Satz, Rest-Timer, Session-Log); neues Kategorie-Chip "Krafttraining" in `WorkoutPage` + `wodCategory`-Filter in `useWods`; `wod_category` CHECK-Constraint erweitert um `krafttraining`; **Migration 017**: kraft_auf_zeit → kraft_wenig_zeit (ALTER TABLE DROP/ADD CONSTRAINT + UPDATE); **CountdownOverlay** in `TimerView` + `WarmupTimer` (3-2-1-Go SVG-Animation vor Timer-Start, Wake Lock bereits aktiv); **TodoList-Bug-Fix** (Null-Guard: leere Liste zeigte Fehler statt Empty-State) |
| **Session M** | **Pillar-Tabs immer sichtbar** — `BottomNav` + `Sidebar`: alle 5 Tabs sichtbar, inaktive Pillars gedimmt + Alert-Modal beim Antippen; **Toggle "Inaktive Bereiche ausblenden"** in `SettingsPage` (localStorage `hide_inactive_pillars`, CustomEvent `hide_inactive_changed`); aktive Pillars aus `user_profiles.active_pillars` — in Session Z in Settings editierbar gemacht; **userEquipment-Filter** — `useWods.WodFilters` + `userEquipment`-Prop in `WodList`/`WorkoutPage`; Toggle-Button "Equipment-Filter aktiv / aus" (`showAllEquipment`-State); **goal-aware Suggestion** — `getSuggestedPillar(goal?)` mit Tiebreaker-Logik; `AdaptiveSuggestion` zeigt dreisprachige Ziel-Hinweis-Zeile (`GOAL_HINT`/`GOAL_PILLAR`); **Yoga-Tagging** — Migration 019: keyword-basiertes UPDATE auf `stretching_exercises.subcategory='yoga'`; **Migration 020**: DB-Webhook auf `feedback`-INSERT verknüpft mit `notify-feedback` Edge Function |
| **Session N** | **WOD-Katalog-Erweiterung + Filter-Fixes** — Migration 021: 183 neue WODs (hiit 60, kraft_ausdauer 50, kraft_wenig_zeit 30, krafttraining 43; equipment_tags: bodyweight/dumbbell/kettlebell/barbell); Migration 022: CrossFit-WODs außer Girls (20) + Heroes (88) auf is_visible=false; **Equipment-Filter-Fix** in useWods: Normalisierung lowercase + Mapping dumbbells→dumbbell, bodyweight immer erlaubt; **Timer-Exercise-Anzeige**: FreeTimerWizard.onStart erhält 5. Parameter exercises?: WizardExercise[]; TimerView zeigt Übungsliste unterhalb Timer-Controls; WorkoutPage.timerConfig erweitert um exercises |
| **Session O** | **Loading-Fix + AdaptiveSuggestion + Editor's Pick + Ambient Sounds** — **AdaptiveSuggestion Loading-Guard**: `adaptiveSuggestion.ts` Hinweis + `AdaptiveSuggestion.tsx` rendert null solange `profile` null (Supabase-Delay beim ersten Render); **TodaysWod `pickByDate`**: deterministischer Index (dayOfYear % pool.length), Fallback auf `EDITORS_PICK_IDS` wenn DB-Pool leer; **Migration 023**: partieller Index auf `wods.is_editors_pick = true` (Spalte seit Migration 010, Index neu); **Ambient Sounds Slot**: `public/audio/ambient/` als manueller Ablageort für Meditation-Ambient-Dateien |
| **Session P** | **Meditation Sub-Tabs + Yoga Flows + ExerciseKeyframes** — **Logo-Fix**: Pfeil aus `LogoIcon.tsx` + `favicon.svg` entfernt, nur C-Bogen bleibt; **Meditation Ungeführt/Geführt**: `MeditationPage` hat Sub-Tabs im Meditieren-Tab; **UnguidedTimer**: Phasen-Timer (5 Typen: breathing/box_breathing/body_scan/focus/open_awareness, 5–20 min, dreisprachig); **GuidedPlayer**: lädt `sessions.json`, MP3-Player-Struktur mit `available`-Flag (7 Placeholder-Sessions); `public/audio/sessions/sessions.json` angelegt; **ExerciseKeyframes**: Shared-Komponente Bild-Crossfade, gibt null zurück bis Bilder vorhanden; **GuidedSession**: `defaultExerciseDuration`-Prop + Yoga-Atemhinweis + ExerciseKeyframes integriert; **Yoga Flows** in `StretchingPage`: 5 clientseitige virtuelle Flows (Morgen/Hüft/Rücken/Power/Schlaf), Exercises per Name-Hint aus DB gelöst, Filter `yoga_flow` zeigt Flow-Cards statt Routine-Liste |
| **Session Q** | **PostHog Analytics + PWA-Icons + Meditation-Ping** — **PostHog EU**: Init in `main.tsx` (`person_profiles: 'never'`, `persistence: 'memory'` — kein Cookie-Banner); **`useAnalytics.ts`**: schlanker Hook (`track(event, props?)`); Events: `meditation_started` (UnguidedTimer + GuidedPlayer), `yoga_flow_started` (GuidedSession), `workout_completed` (WodDetail), `ambient_sound_selected` (AmbientPlayer); **AmbientPlayer.tsx**: 10 Ambient-Sounds, Lautstärke-Slider, localStorage-Persist; **PWA-Icons neu generiert**: `icon-192.png` / `icon-512.png` / `apple-touch-icon.png` aus `icon-source.svg` via `scripts/generate_icons.mjs` (@resvg/resvg-js); **meditation-ping.wav**: 528 Hz Sinus (1,4 s Decay) via `scripts/generate_ping.mjs`; `.env.example` ergänzt um `VITE_POSTHOG_KEY` / `VITE_POSTHOG_HOST` |
| **Session R** | **Marketing Landing Page** — `LandingPage.tsx` (`pages/`) mit 8 Sektionen (LandingNav, Hero, PersonaSection, PillarSection, HowItWorks, ResultsTimeline, PricingSection, CtaSection, LandingFooter); inline `useLang` (localStorage + Browser-Fallback, Default DE); DE/EN-Toggle; Fade-in on scroll via IntersectionObserver; PricingSection mit disabled CTAs + Tooltip; **Route `/`** öffentlich via `LandingPublicRoute` (auth → Redirect `/home`); **HomePage verschoben auf `/home`**; alle internen Redirects (`AuthLayout`, `ProtectedLayout`, `AppShell`, `BottomNav`, `Sidebar`) aktualisiert |
| **Session T** | **Timer-Restart-Bug-Fix** — `TimerView` Reset-useEffect prüft zusätzlich `isComplete` (Guard: kein Reset nach Timer-Ende); **Equipment-Filter-Fix** — `useWods.mapRawToWod` ergänzt `.filter(Boolean)` beim `equipment`-Splitting; **Category-Chips Wrap** — `WorkoutPage` Chip-Reihe: `overflow-x-auto` → `flex flex-wrap`; **AmbientPlayer** — `unavailable`-State + `disabled`-Logik entfernt (Buttons immer klickbar, Fehler stoppt nur Playback); **Ritual Auto-Check** — `RoutinePage` hört auf `carveout:workout-completed` CustomEvent + auto-completed Todos deren Text `/workout\|training\|sport/i` matcht; **WodDetail** — feuert `carveout:workout-completed` CustomEvent bei Timer-Ende (`onComplete`-Callback); **GuidedSession per-exercise duration** — `duration_sec`-Feld pro Übung überschreibt globales `exerciseDuration` (Props-Default bleibt als Fallback); **GuidedSession Next-Up-Banner** — zeigt nächste Übung wenn `phase === 'exercise' && timeLeft <= 10` |
| **Session U** | **Equipment-Filter-Normalisierung** — `normEq()`-Funktion in `useWods` zentralisiert + erweitert (resistance bands→resistance band, rowing machine→rower, assault bike→bike); `equipmentFilter` nutzt jetzt ebenfalls `normEq` + bodyweight immer erlaubt; **GuidedSession Duration-Default** — kein `defaultExerciseDuration` → Median der `duration_sec`-Werte der Übungen (Fallback 30s); Übungsname auf `text-2xl`; **`NextExercisePreview.tsx`** — neue Shared-Komponente (opacity-Fade, Props: name/visible/color, rendert immer mit opacity 0 wenn inaktiv); **GuidedSession Next-Up via `NextExercisePreview`** — zeigt auch während gesamter Rest-Phase (wenn `pauseDuration >= 5`); **TimerView EMOM/Tabata Übungsrotation** — aktueller Übungsname + `NextExercisePreview` (EMOM letzte 10s; Tabata Work letzte 10s / Tabata Rest gesamte Phase) |
| **Session V** | **Legal Pages** — `ImpressumPage.tsx` + `DatenschutzPage.tsx` (je DE/EN, inline `useLang`, nutzen LandingNav + LandingFooter); öffentliche Routen `/impressum` + `/datenschutz` in `App.tsx` (kein Auth nötig) |
| **Session W** | **Ritual → Routine Rename** — Routine-Pillar-Label durchgängig zurück zu "Routine/Routinen" (rückgängig machen der Session-H-Umbenennung in Ritual/Rituale); betrifft: `BottomNav` (de: Routinen, en: Routines, es: Rutinas), `Sidebar`, `RoutinePage`-Titel, `RoutineList`-Vorschläge-Label, `TodayPillarTracker`-Chip, `OnboardingPage`-Pillar-Label, `PillarSection`-Karte, `Hero`-Erwähnung; i18n-Keys aktualisiert |
| **Session X** | **Stripe-Integration** — `useSubscription.ts` (Hook: status/isActive/isTrial/isExpired/trialDaysLeft/startCheckout); `PricingSection` CTAs live (Stripe-Checkout-Links); `ProfilePage` Abo-Sektion via `useSubscription` (Plan-Badge, Trial-Countdown, Upgrade-CTA); `CheckoutSuccessPage` + `CheckoutCancelPage` (öffentliche Routen `/checkout/success` + `/checkout/cancel`); `user_profiles` erweitert um `trial_ends_at`, `stripe_customer_id`, `stripe_subscription_id`; `DbProfile` + `SubscriptionStatus`-Typ aktualisiert; Stripe JS + Stripe Node im Tech-Stack |
| **Session Y** | **Onboarding Pillar-Removal** — Pillar-Auswahl-Schritt aus Onboarding entfernt; `TOTAL_STEPS` 4→3; alle 4 Pillars immer aktiv (`primary_pillar: 'workout'`, `active_pillars: ALL_PILLARS`); **TimerView autoStart** — wenn `initialMode` gesetzt: Config-UI + Modus-Selektor ausgeblendet, Countdown startet direkt beim Mount (useEffect on []); **Push VAPID-Key** — `VITE_VAPID_PUBLIC_KEY` als GitHub Secret in CI-Build-Env eingetragen (deploy.yml) |
| **Session Z** | **Settings-Umbau** — `SettingsPage` strukturiert in Submenüs (Allgemein, Pillar-Toggle, Benachrichtigungen, Weitere, Abo); **Pillar-Toggle** — `active_pillars` + `primary_pillar` in Settings editierbar; Primary-Pillar-Hinweis in Pillar-Toggle-Sektion; Abo-Status zusätzlich in Settings (parallel zu ProfilePage); **BottomNav + Sidebar Cleanup** — Pillar-Sichtbarkeit reagiert auf `active_pillars_changed` CustomEvent (zusätzlich zu `hide_inactive_changed`); aktive Pillars kommen aus `user_profiles.active_pillars` |
| **Session AA** | **ProfilePage entfernt + Settings-Polish** — Route `/profile` → `Navigate to="/settings" replace`; Passwort-Reset + E-Mail-Anzeige aus `ProfilePage` in `SettingsPage` (Allgemein-Submenu) integriert; `SaveButton` in SettingsPage als Outline-Button (transparent bg, border accent); `AppShell` Mobile-Header: Vorname-Link zeigt auf `/settings` statt `/profile`; **WodList FilterBottomSheet**: "Kuratiert / Editor's Pick"-Filter-Sektion entfernt (interner `editorsPick`-State entfernt — Filter nur noch per `editorsPickProp` von außen); **WodCard**: zeigt `⭐` wenn `is_editors_pick = true` |
| **Session AC** | **sessionStore** — neuer `sessionStore.ts` (Zustand, kein persist): `isSessionActive: boolean`; `setSessionActive(v)`; genutzt von `TimerView`, `KraftTimerView` für Swipe-Sperre während Timer + Completion-Screen |
| **Session AD** | **WarmupTimer Beep + TimerView Beep** — `WarmupTimer` und `TimerView` (ForTime/AMRAP) spielen bei `timeLeft === 10` kurzen Warnton (880 Hz, Web Audio API); EMOM/Tabata kein Beep (Intervall-Wechsel übernimmt Orientierung); Beep respektiert `audioStore.isMuted`; **Filter-Persistenz** in `WodList`: Filter-State (Typ/Kategorie/Schwierigkeit/Dauer/Equipment) wird in sessionStorage (Key: `wod_filters`) persistiert — Filter bleiben beim Seitenwechsel erhalten |
| **Session AE** | **CustomWorkoutsPage + AdaptiveSuggestion + TodayPillarTracker-Buttons** — `CustomWorkoutsPage.tsx` in `components/workout/`: Liste gespeicherter Custom Workouts; Start-Button → FreeTimerWizard (variant=adhoc, vorausgefüllt); Löschen mit Bestätigungs-Prompt; leerer State mit CTA; als neuer Tab "Eigene" in `WorkoutPage` eingebunden; **TodayPillarTracker**: Chip-Tap navigiert direkt zur Pillar-Route (useNavigate); **AdaptiveSuggestion** kein funktionaler Change (Loading-Guard bereits seit Session O aktiv) |
| **Sessions AF–AG** | **useWodHistory Cache-Fix + Push-Robustheit** — onSuccess setzt setQueryData für _all + wod_name-Keys (sofortige UI-Aktualisierung ohne Page-Refresh); INSERT-Payload user_id aus getSession(); subscribeToPush: SW-Registrierung + pushManager.subscribe je try/catch → return false statt throw; handleTogglePush + handleSavePushPrefs: try/catch/finally, Loading-States garantiert in finally; index.html: apple-mobile-web-app-capable → mobile-web-app-capable |
| **Session AH** | **Push-Settings-Fixes** — `SettingsPage`: Permission-denied Check beim Mount → `pushError` sofort gesetzt wenn `Notification.permission === 'denied'` (kein unnötiger Subscription-Versuch); Push-Präferenzen laden via `maybeSingle()` statt `single()` (kein 406-Fehler wenn noch keine Zeile in push_preferences vorhanden) |
| **Session AI** | **Custom Workouts Supabase-Migration** — neue Tabelle `custom_workouts` (Migration 026: UUID PK, user_id FK, name, mode, config JSONB, exercises JSONB, with_warmup, RLS); `lib/customWorkouts.ts`: Funktionen in `loadLocalWorkouts` / `saveLocalWorkout` / `deleteLocalWorkout` umbenannt (localStorage bleibt Fallback); neuer Hook `useCustomWorkouts.ts` (TanStack Query, Supabase primary, localStorage Fallback, Mutations: addWorkout/updateWorkout/deleteWorkout); `CustomWorkoutsPage` nutzt Hook statt direktem localStorage, Loading-State ergänzt |
| **Session AJ** | **Auth-Race-Fixes + Stretching-Robustheit** — `useCustomWorkouts`: auth-gated (`enabled: !!userId`), queryKey userId-abhängig (verhindert leeren Cache vor Auth); `WarmupTimer`: Fullscreen-Overlay statt Bottom-Sheet (fixed inset-0, bg: --color-bg, overflow-y-auto); `GuidedSession`: Progress-Ring + Timer nutzen immer `exerciseDuration` (kein per-exercise `duration_sec` mehr für Timing — nur als Fallback-Default); `useWodHistory`: `_fromLocal`-Pattern eingeführt (invalidateQueries nur bei DB-Erfolg, Duplikat-Guard in setQueryData) |
| **Session AK** | **6 Bug-Fixes** — (1) `WarmupTimer`: Übungsliste während Timer sichtbar, aktuell laufende Übung hervorgehoben (elapsed % TOTAL_EXERCISE_CYCLE_SEC); (2) `WorkoutPage`: Tab-Sperre während Warmup, `handleAdhocStart` setzt Tab explizit auf 'timer'; (3) `useStretching`: userId in queryKey + staleTime 30min→5min (Auth-Race-Fix); (4) `useStretchingLogs`: _fromLocal-Pattern, UUID-Validierung für routine_id, setQueryData bei lokalem Fallback; (5) `useWodHistory` Duplikat-Guard verfeinert; (6) `FreeTimerWizard` Step 2: Slider 1–60 min (range input, accentColor per Modus) neben +/−-Buttons für AMRAP/ForTime |
| **Session AL–AM** | **Well-Done-Screen + Bilateral-Fix + Long-Press + Hook-Guards** — (A1) `TodayPillarTracker`: Long-Press 500ms → Bottom-Sheet Context-Menu "Heute erledigt ✓"; schreibt in `pillar_manual_logs` via Upsert; `longFiredRef` verhindert Navigate nach Long-Press; Backdrop `onClick` entfernt → Overlay klickbar; (A2) `sessionStore` vereinfacht zu `isSessionActive: boolean` + `setSessionActive(v)`; `KraftTimerView` + `TimerView` setzen `setSessionActive(phase !== 'idle')` / `setSessionActive(!isComplete)` → Swipe auch im Done-Screen gesperrt; (A3) `WodDetail`: `setShowScore(true)` aus `onComplete` entfernt — Completion-Screen von TimerView selbst gehandelt; (A4) `FreeTimerWizard`: Tabata-Runden-Slider (1–20) + EMOM-Runden-Slider (1–30); `TimerInitConfig` Interface; (A5) Hook-Guards: `useDailyLog` `enabled: !!userId` + queryKey 3-teilig; `useWodHistory` queryKey 3-teilig + `enabled`-Guard + userId aus Store; `useMeditationLogs` + `useStretchingLogs`: `enabled: !!user`; (A6) `TimerView` + `KraftTimerView`: Completion-Screen "Gut gemacht!" DE (via `onShowHistory` + eigener isComplete-Screen); (A7) `GuidedSession` Bilateral-Fix: volle `exerciseDuration` pro Seite; `useTodayPillars`: 5. Query auf `pillar_manual_logs` + OR-Logik; Migration 027: `pillar_manual_logs`; `WorkoutPage`: `onShowHistory={() => setTab('history')}` |
| **Session AL** | **Todo-Robustheit** — `useTodos`: staleTime 5min→0 (Window-Focus-Refetch für Cross-Device-Sync) + retry false→1 (transiente Netzwerkfehler erholen sich automatisch); `RoutinePage`: TodoList via `display:none` statt konditionellem Unmount → activeList-State bleibt beim Tab-Wechsel erhalten; `todosLoading` an TodoList weitergereicht — Loading-Spinner wenn `todosLoading && todos.length === 0` (verhindert falsches "Keine Aufgaben" während initialem Fetch) |
| **Session AN** | **Pillar-Rename + WeekStrip + HistoryPage** — (1) Nav-Labels: Stretching→Mobilität/Mobility/Movilidad, Meditation→Achtsamkeit/Mindfulness/Atención in `BottomNav`, `Sidebar`, `TodayPillarTracker`, `SettingsPage`, `AdminDashboardPage`; DB-IDs `stretching` + `meditation` unverändert; (2) **WeekStrip** (`components/home/WeekStrip.tsx`): 7-Tage-Aktivitäts-Widget, farbige Dots pro Pillar + Tag, Link zu `/history`; **`useWeekPillars`** Hook (5 Queries: wod_history + stretching_logs + meditation_logs + routine_logs + pillar_manual_logs); auf `HomePage` eingebaut, ersetzt `WeekStats` + `RecentActivity`; (3) **HistoryPage** (`pages/HistoryPage.tsx`): kombinierter Verlauf Workout/Mobilität/Achtsamkeit, Pillar-Filter, chronologisch; Route `/history` in `App.tsx` ergänzt |
| **Session AO** | **OnboardingSlides + WhatsNewBanner + Mood-adaptive TodaysWod + showMotivation-Toggle** — (1) **OnboardingSlides** (`components/home/OnboardingSlides.tsx`): Fullscreen Produkttour (z-50), 5 Slides aus `public/onboarding-slides.json`; guard `carveout_tour_done` localStorage; montiert in `HomePage`; dreisprachig (Weiter/Überspringen/Los geht's!); (2) **WhatsNewBanner** (`components/home/WhatsNewBanner.tsx`): dismissible Banner oben auf `HomePage`; lädt `public/whats-new.json` (version/emoji/title/text); per-version localStorage Key `carveout_whats_new_dismissed_v<version>`; (3) **TodaysWod Mood-Adaptation**: liest letztes Mood aus `daily_logs` (Query `recent_mood_wod`, auth-gated); Müde/Gestresst → Erholungs-Karte (→ /stretching + /meditation); Super → Push-Hard-Badge auf normalem WOD; (4) **showMotivation-Toggle** in `SettingsPage` Training-Submenu (localStorage Key: `carveout_show_motivation`, default on); `HomePage` rendert `AdaptiveSuggestion` nur wenn Toggle aktiv |
| **Session AP** | **SW NavigationRoute-Fix + OnboardingSlides-Update + AdaptiveSuggestion-Umbau + useDailyLog Mood-Invalidierung + HomePage WeekStrip-Reihenfolge** — (1) **sw.ts NavigationRoute**: `NavigationRoute` + `NetworkFirst` (cacheName: 'pages', timeout 3s) vor `precacheAndRoute` registriert → kein Blank-Screen nach Cache-Clear; (2) **OnboardingSlides erweitertes Interface**: `pillars?: SlidePillar[]` (label/color/emoji) für farbige Pillar-Chips (Slide 2) + `subtitleExtra?: string` für prominente zweite Zeile (Slides 3+4); `subtitle` auf `text-base` angehoben; `onboarding-slides.json` entsprechend überarbeitet; (3) **AdaptiveSuggestion Umbau**: nutzt `useTodayPillars` → übergibt `completedPillars` an `getSuggestedPillar()`; wenn `pillar === null` → "Alle Einheiten für heute erledigt 🎉"-Card (dreisprachig); kein separater profile-null Loading-Guard mehr; (4) **useDailyLog `setMood.onSuccess`**: invalidiert zusätzlich `['recent_mood_wod']` → TodaysWod reagiert sofort auf Mood-Änderung; (5) **HomePage**: `showMotivation` als `useState(() => ...)` (robuster als direkter localStorage-Aufruf); WeekStrip ans Ende verschoben (Reihenfolge: AdaptiveSuggestion → TodayPillarTracker → MoodCheck → TodaysWod → WeekStrip) |

### Offen / Roadmap

| Bereich | Inhalt |
|---|---|
| **Landingpage (Erweiterung)** | Waitlist-Integration; Pricing-CTAs live (Stripe-Checkout aktiv) |
| **Stripe (Erweiterung)** | Customer Portal, Upgrade/Downgrade-Flow; Rechnungs-E-Mails via Stripe |
| **Bestätigungsemail** | Via Resend — wartet auf finales Logo |
| **Push (Server-Side)** | Admin-Broadcast an alle User |
| **GDPR** | Cookie-Banner, Privacy Policy, Daten-Export, Konto-Löschung |
| **WOD-Übersetzungen** | EN/ES für 798 WODs (aktuell nur DE) |
| **Health-Integration** | Apple Health + Google Fit: Workout-Sessions + Herzfrequenz-Daten lesen/schreiben; Capacitor-Bridge als Voraussetzung |
| **Capacitor (Native Shell)** | App Store-fähige iOS/Android-App via Capacitor; Voraussetzung für Health-Integration, native Push, Haptics |
| **Analytics** | PostHog EU aktiv (anonymes Event-Tracking, kein Cookie-Banner); Self-hosted Plausible/Umami offen |
| **Error Tracking** | Sentry |
| **Adaptive WOD** | Tages-WOD-Auswahl basierend auf Nutzer-History + Ziel + Equipment; ersetzt rein deterministischen `pickByDate`-Ansatz |
| **Morgenbriefing** | Push-Notification oder HomePage-Widget morgens: gestriges Summary + Tages-WOD + Motivation |
| **Wellness Score** | Aggregierter Score aus Aktivitäts-Streak, Mood, Schlaf (wenn verfügbar); auf HomePage als Zahl oder Ring |
| **Product Tour** | ~~Interaktiver Onboarding-Guide~~ — **abgeschlossen (Session AO)**: `OnboardingSlides.tsx`, Fullscreen 5-Slide Tour, guard `carveout_tour_done` |
| **Offline-Strategie** | Explizite Offline-Phase: welche Features offline laufen sollen (offen); aktuell: `isSupabaseConfigured()`-Fallbacks vorhanden, Custom-WOD Supabase-only |
| **Block-Timer** | Pomodoro-artiger Arbeits-/Pausen-Timer im Routine-Pillar; konfigurierbar (Fokus-Zeit, Pause, Runden) |
| **Migration 029** | `push_preferences`-Tabelle formal als Migration anlegen (aktuell nur manuell im Dashboard erstellt); `add_push_subscriptions.sql` + `add_role_and_admin_rls.sql` auf Nummern-Präfix umstellen (Konsistenz mit 001–028) |
| **Supabase Redirect-URLs** | Konfigurieren für OAuth / Magic Link |
| **packages/ui** | Shared Component Library befüllen |
| **E2E-Tests** | Playwright o.ä. |
| **Random-WOD-Picker (erweiterbar)** | Aktuell: Würfel-Button in WodList; offen: eigener Screen |
| **Theme-Switcher** | Mind. Dark/Light; alte HTML-PWA hatte 8 Themes × 8 Accents |
| **Virtual/Infinite Scroll** | WodList — Performance bei 798+ Einträgen (aktuell: Pagination + "Load more") |
| **weight_input_mode** | Krafttraining: Nutzer-Präferenz kg/lbs + Schritt-Größe (0.5/1/2.5 kg) — aktuell hardcoded kg |

---

*Letzte Aktualisierung: Mai 2026 — Tim (Session AP: SW NavigationRoute, OnboardingSlides-Update, AdaptiveSuggestion-Umbau, useDailyLog Mood-Invalidierung, HomePage WeekStrip-Reihenfolge; +MCP-Tools, DB-Auffälligkeiten push_preferences/push_subscriptions, TodaysWod Mood-Adaptation bestätigt)*
