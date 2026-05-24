import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import type { WorkoutLocation } from '../store/authStore'
import { DEFAULT_EQUIPMENT_BY_LOCATION } from '../store/authStore'
import { useSessionStore } from '../store/sessionStore'
import { WodList } from '../components/workout/WodList'
import { WodDetail } from '../components/workout/WodDetail'
import { TimerView } from '../components/workout/TimerView'
import { KraftTimerView } from '../components/workout/KraftTimerView'
import { WodHistoryList } from '../components/workout/WodHistoryList'
import { FreeTimerWizard, type KraftConfig, type TimerInitConfig } from '../components/workout/FreeTimerWizard'
import { WarmupTimer } from '../components/workout/WarmupTimer'
import {
  loadCustomWorkouts,
  saveCustomWorkout,
  type CustomWorkout,
  type WizardExercise,
} from '../lib/customWorkouts'
import { type TimerMode } from '../lib/timerLabels'

type Tab = 'wods' | 'timer' | 'history'

const TABS: { id: Tab; label: string }[] = [
  { id: 'wods',    label: 'Workouts' },
  { id: 'timer',   label: 'Timer' },
  { id: 'history', label: 'History' },
]

const LOCATIONS: { id: WorkoutLocation; label: string; emoji: string }[] = [
  { id: 'home',       label: 'Home',       emoji: '🏠' },
  { id: 'gym',        label: 'Gym',        emoji: '🏋️' },
  { id: 'bodyweight', label: 'Bodyweight', emoji: '🤸' },
  { id: 'outdoor',    label: 'Outdoor',    emoji: '🌲' },
]

const LOCATION_STORAGE_KEY = 'carveout_workout_location'

function getSavedLocation(): WorkoutLocation | null {
  try {
    const v = localStorage.getItem(LOCATION_STORAGE_KEY)
    if (v && ['home', 'gym', 'bodyweight', 'outdoor'].includes(v)) return v as WorkoutLocation
  } catch {}
  return null
}

type TimerConfig = {
  mode: TimerMode; minutes: number
  kraftConfig?: KraftConfig; exercises?: WizardExercise[]; workoutName?: string
  tabataWork?: number; tabataRest?: number; tabataRounds?: number
  emomInterval?: number; emomRounds?: number
}

export function WorkoutPage() {
  const { wodName }    = useParams<{ wodName: string }>()
  const navigate       = useNavigate()
  const routerLocation = useLocation()
  const { profile }    = useAuthStore()
  const isSessionActive = useSessionStore((s) => s.isSessionActive)

  const [tab, setTab]                     = useState<Tab>('wods')
  const [location, setLocation]           = useState<WorkoutLocation | null>(getSavedLocation())
  const [wizardOpen, setWizardOpen]       = useState(false)
  const [adhocOpen, setAdhocOpen]         = useState(false)
  const [showAllEquipment, setShowAllEquipment] = useState(false)
  const [timerConfig, setTimerConfig]     = useState<TimerConfig | null>(null)
  const [showWarmupTimer, setShowWarmupTimer] = useState(false)
  const [savedWorkouts, setSavedWorkouts] = useState<CustomWorkout[]>(() => loadCustomWorkouts())
  const silentMode = localStorage.getItem('carveout_silent_mode') === 'true'

  // When returning from WodDetail back to the list, always land on WODs tab
  useEffect(() => {
    if (!wodName) setTab('wods')
  }, [wodName])

  // Start a saved workout when navigated from CustomWorkoutsPage
  useEffect(() => {
    const sw = (routerLocation.state as { startWorkout?: CustomWorkout } | null)?.startWorkout
    if (sw) {
      handleStartSaved(sw)
      navigate('/workout', { replace: true, state: null })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleWizardStart(mode: TimerMode, minutes: number, withWarmup?: boolean, kraftConfig?: KraftConfig, exercises?: WizardExercise[], workoutName?: string, timerCfg?: TimerInitConfig) {
    if (workoutName) {
      saveCustomWorkout({
        id: crypto.randomUUID(),
        name: workoutName,
        mode,
        minutes,
        exercises: exercises ?? (kraftConfig?.exercises ?? []),
        createdAt: new Date().toISOString(),
        restBetweenSets:      kraftConfig?.restBetweenSets,
        restBetweenExercises: kraftConfig?.restBetweenExercises,
        tabataWork:   timerCfg?.tabataWork,
        tabataRest:   timerCfg?.tabataRest,
        tabataRounds: timerCfg?.tabataRounds,
        emomInterval: timerCfg?.emomInterval,
        emomRounds:   timerCfg?.emomRounds,
      })
      setSavedWorkouts(loadCustomWorkouts())
    }
    setTimerConfig({ mode, minutes, kraftConfig, exercises, workoutName, ...timerCfg })
    setTab('timer')
    if (withWarmup) setShowWarmupTimer(true)
  }

  function handleAdhocStart(mode: TimerMode, minutes: number, withWarmup?: boolean, kraftConfig?: KraftConfig, exercises?: WizardExercise[], _workoutName?: string, timerCfg?: TimerInitConfig) {
    setTimerConfig({ mode, minutes, kraftConfig, exercises, ...timerCfg })
    if (withWarmup) setShowWarmupTimer(true)
  }

  function handleStartSaved(w: CustomWorkout) {
    const kraftConfig: KraftConfig | undefined = w.mode === 'krafttraining'
      ? { exercises: w.exercises, restBetweenSets: w.restBetweenSets ?? 90, restBetweenExercises: w.restBetweenExercises ?? 60 }
      : undefined
    setTimerConfig({
      mode: w.mode, minutes: w.minutes, kraftConfig, workoutName: w.name,
      tabataWork: w.tabataWork, tabataRest: w.tabataRest, tabataRounds: w.tabataRounds,
      emomInterval: w.emomInterval, emomRounds: w.emomRounds,
    })
    setTab('timer')
  }

  function handleLocationSelect(loc: WorkoutLocation) {
    const next = location === loc ? null : loc
    setLocation(next)
    try {
      if (next) localStorage.setItem(LOCATION_STORAGE_KEY, next)
      else localStorage.removeItem(LOCATION_STORAGE_KEY)
    } catch {}
  }

  const equipmentForLocation = location
    ? (profile?.equipment_by_location?.[location] ?? DEFAULT_EQUIPMENT_BY_LOCATION[location])
    : undefined

  const hasProfileEquipment = (profile?.equipment?.length ?? 0) > 0
  const userEquipment = hasProfileEquipment && !showAllEquipment ? profile!.equipment : undefined

  // If a WOD name is in the URL, show WodDetail instead of the list
  if (wodName) {
    return (
      <div className="min-h-svh bg-[var(--color-bg)] px-4 pt-10 pb-24 max-w-lg mx-auto">
        <WodDetail
          wodName={decodeURIComponent(wodName)}
          onBack={() => navigate('/workout')}
        />
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-[var(--color-bg)] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 lg:pt-10 pb-2 flex items-end justify-between">
        <h1 className="text-2xl font-black text-[var(--color-text)]">
          <span style={{ color: '#E8642A' }}>Workout</span>
        </h1>
      </div>

      {/* Tab bar */}
      <div className="px-4 flex gap-1 bg-[var(--color-bg)] sticky top-0 z-10 pt-2 pb-3 border-b border-white/5">
        {TABS.map((t) => {
          const locked = isSessionActive && t.id !== 'timer'
          return (
            <button
              key={t.id}
              onClick={() => !locked && setTab(t.id)}
              disabled={locked}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                tab === t.id
                  ? 'bg-[#E8642A] text-white'
                  : locked
                  ? 'text-[var(--color-text-muted)] opacity-30 cursor-not-allowed'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 pb-24 max-w-lg mx-auto w-full">
        {tab === 'wods' && (
          <>
            {/* Custom workouts section — link to /workout/custom */}
            <div className="mb-5 flex items-center justify-between">
              <button
                onClick={() => navigate('/workout/custom')}
                className="text-sm font-semibold"
                style={{ color: '#E8642A' }}
              >
                Eigene Workouts{savedWorkouts.length > 0 ? ` (${savedWorkouts.length})` : ''} →
              </button>
              <button
                onClick={() => { setSavedWorkouts(loadCustomWorkouts()); setWizardOpen(true) }}
                className="text-xs font-bold px-2.5 py-1 rounded-lg"
                style={{ backgroundColor: '#E8642A18', color: '#E8642A' }}
              >
                + Neu
              </button>
            </div>

            {/* Location selector */}
            <div className="flex gap-2 mb-4">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handleLocationSelect(loc.id)}
                  className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: location === loc.id ? '#E8642A20' : 'var(--color-bg-card)',
                    border:          `1.5px solid ${location === loc.id ? '#E8642A' : 'transparent'}`,
                    color:           location === loc.id ? '#E8642A' : 'var(--color-text-muted)',
                  }}
                >
                  <span className="text-base">{loc.emoji}</span>
                  <span>{loc.label}</span>
                </button>
              ))}
            </div>
            {hasProfileEquipment && (
              <button
                onClick={() => setShowAllEquipment((v) => !v)}
                className="text-xs mb-3 flex items-center gap-1"
                style={{ color: showAllEquipment ? 'var(--color-text-muted)' : '#E8642A', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {showAllEquipment ? '⚡ Equipment-Filter aus — aktivieren' : '⚡ Equipment-Filter aktiv — Alle anzeigen'}
              </button>
            )}
            <WodList
              onSelectWod={(name) => navigate(`/workout/${encodeURIComponent(name)}`)}
              equipmentFilter={equipmentForLocation}
              userEquipment={userEquipment}
              silentMode={silentMode}
            />
          </>
        )}
        {tab === 'timer' && (
          <div className="py-4">
            {timerConfig ? (
              <>
                {timerConfig.mode === 'krafttraining' && timerConfig.kraftConfig ? (
                  <KraftTimerView
                    exercises={timerConfig.kraftConfig.exercises}
                    restBetweenSets={timerConfig.kraftConfig.restBetweenSets}
                    restBetweenExercises={timerConfig.kraftConfig.restBetweenExercises}
                    workoutName={timerConfig.workoutName}
                    onComplete={() => setTimerConfig(null)}
                  />
                ) : (
                  <TimerView
                    adHocLog
                    initialMode={timerConfig.mode as Exclude<typeof timerConfig.mode, 'krafttraining'>}
                    initialMinutes={timerConfig.minutes}
                    exercises={timerConfig.exercises}
                    workoutName={timerConfig.workoutName}
                    warmupPending={showWarmupTimer}
                    initialTabataWork={timerConfig.tabataWork}
                    initialTabataRest={timerConfig.tabataRest}
                    initialTabataRounds={timerConfig.tabataRounds}
                    initialEmomInterval={timerConfig.emomInterval}
                    initialEmomRounds={timerConfig.emomRounds}
                  />
                )}
                <button
                  onClick={() => setTimerConfig(null)}
                  className="mt-4 w-full py-2.5 rounded-xl text-xs"
                  style={{ color: 'var(--color-text-muted)', backgroundColor: 'var(--color-bg-card)' }}
                >
                  ← Neu konfigurieren
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-5 pt-16 pb-8">
                <div style={{ fontSize: 48 }}>⏱</div>
                <p className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
                  Wähle Modus, Dauer und optionale Übungen für deinen Timer.
                </p>
                <button
                  onClick={() => setAdhocOpen(true)}
                  className="px-8 py-3.5 rounded-2xl font-bold text-base"
                  style={{ backgroundColor: '#E8642A', color: 'white' }}
                >
                  Timer konfigurieren
                </button>
              </div>
            )}
          </div>
        )}
        {tab === 'history' && <WodHistoryList />}
      </div>

      <FreeTimerWizard
        isOpen={wizardOpen}
        onClose={() => { setWizardOpen(false); setSavedWorkouts(loadCustomWorkouts()) }}
        onStart={handleWizardStart}
        variant="save"
      />
      <FreeTimerWizard
        isOpen={adhocOpen}
        onClose={() => setAdhocOpen(false)}
        onStart={handleAdhocStart}
        variant="adhoc"
      />
      <WarmupTimer
        isOpen={showWarmupTimer}
        onClose={() => setShowWarmupTimer(false)}
        onStartWorkout={() => setShowWarmupTimer(false)}
        showExercises
      />
    </div>
  )
}
