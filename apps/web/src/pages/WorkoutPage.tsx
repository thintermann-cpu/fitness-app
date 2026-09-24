import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import type { WorkoutLocation } from '../store/authStore'
import { DEFAULT_EQUIPMENT_BY_LOCATION } from '../store/authStore'
import { useSessionStore } from '../store/sessionStore'
import { WodList } from '../components/workout/WodList'
import { WodDetail } from '../components/workout/WodDetail'
import { TimerView } from '../components/workout/TimerView'
import { KraftTimerView } from '../components/workout/KraftTimerView'
import { WodHistoryList } from '../components/workout/WodHistoryList'
import { FreeTimerWizard, type KraftConfig, type TimerInitConfig, type WizardInitialValues } from '../components/workout/FreeTimerWizard'
import { WarmupTimer, type WarmupRoutineId } from '../components/workout/WarmupTimer'
import { WorkoutCountdown } from '../components/shared/WorkoutCountdown'
import { useCustomWorkouts } from '../hooks/useCustomWorkouts'
import { type CustomWorkout, type WizardExercise } from '../lib/customWorkouts'
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
  adHocLog?: boolean
  tabataWork?: number; tabataRest?: number; tabataRounds?: number
  emomInterval?: number; emomRounds?: number
  scheme?: string
}

export function WorkoutPage() {
  const { wodName }    = useParams<{ wodName: string }>()
  const navigate       = useNavigate()
  const routerLocation = useLocation()
  const isSessionActive = useSessionStore((s) => s.isSessionActive)

  const [tab, setTab]                     = useState<Tab>('wods')
  const [location, setLocation]           = useState<WorkoutLocation | null>(getSavedLocation())
  const [wizardOpen, setWizardOpen]       = useState(false)
  const [adhocPreset, setAdhocPreset]     = useState<WizardInitialValues | null>(null)
  const [adhocKey, setAdhocKey]           = useState(0)
  const [adhocOpen, setAdhocOpen]         = useState(false)
  const [equipmentSpecified, setEquipmentSpecified] = useState(false)
  const [clearEquipmentTick, setClearEquipmentTick] = useState(0)
  const [timerConfig, setTimerConfig]     = useState<TimerConfig | null>(null)
  const [timerKey, setTimerKey]           = useState(0)
  const [showWarmupTimer, setShowWarmupTimer] = useState(false)
  const [warmupRoutine, setWarmupRoutine] = useState<WarmupRoutineId>('standard')
  const [showWorkoutCountdown, setShowWorkoutCountdown] = useState(false)
  const { data: savedWorkouts = [], addWorkout } = useCustomWorkouts()
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

  function handleWizardStart(mode: TimerMode, minutes: number, withWarmup?: WarmupRoutineId | false, kraftConfig?: KraftConfig, exercises?: WizardExercise[], workoutName?: string, timerCfg?: TimerInitConfig) {
    if (workoutName) {
      addWorkout.mutate({
        id:        crypto.randomUUID(),
        name:      workoutName,
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
        scheme:       timerCfg?.scheme,
      })
    }
    setTimerConfig({ mode, minutes, kraftConfig, exercises, workoutName, adHocLog: true, ...timerCfg })
    setTimerKey((k) => k + 1)
    setTab('timer')
    if (withWarmup) {
      setWarmupRoutine(withWarmup)
      setShowWarmupTimer(true)
    }
  }

  function handleWizardSaveOnly(mode: TimerMode, minutes: number, kraftConfig: KraftConfig | undefined, exercises: WizardExercise[] | undefined, workoutName: string, timerCfg?: TimerInitConfig) {
    addWorkout.mutate({
      id:        crypto.randomUUID(),
      name:      workoutName,
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
      scheme:       timerCfg?.scheme,
    })
  }

  function handleAdhocStart(mode: TimerMode, minutes: number, withWarmup?: WarmupRoutineId | false, kraftConfig?: KraftConfig, exercises?: WizardExercise[], workoutName?: string, timerCfg?: TimerInitConfig) {
    setTimerConfig({ mode, minutes, kraftConfig, exercises, workoutName, adHocLog: true, ...timerCfg })
    setTimerKey((k) => k + 1)
    setTab('timer')
    if (withWarmup) {
      setWarmupRoutine(withWarmup)
      setShowWarmupTimer(true)
    }
  }

  function handleStartSaved(w: CustomWorkout) {
    setAdhocPreset({
      name: w.name,
      mode: w.mode,
      minutes: w.minutes,
      exercises: w.exercises,
      scheme: w.scheme,
      restBetweenSets: w.restBetweenSets,
      restBetweenExercises: w.restBetweenExercises,
      tabataWork: w.tabataWork,
      tabataRest: w.tabataRest,
      tabataRounds: w.tabataRounds,
      emomInterval: w.emomInterval,
      emomRounds: w.emomRounds,
    })
    setAdhocKey((key) => key + 1)
    setAdhocOpen(true)
    setTab('timer')
  }

  function handleLocationSelect(loc: WorkoutLocation) {
    if (equipmentSpecified) setClearEquipmentTick((tick) => tick + 1)
    const next = location === loc ? null : loc
    setLocation(next)
    try {
      if (next) localStorage.setItem(LOCATION_STORAGE_KEY, next)
      else localStorage.removeItem(LOCATION_STORAGE_KEY)
    } catch {}
  }

  // No tile and no equipment search: the full visible catalog.
  // A tile keeps workouts that can be done there. The same workout can match several tiles.
  const effectiveLocation = equipmentSpecified ? null : location
  const equipmentForLocation = effectiveLocation
    ? DEFAULT_EQUIPMENT_BY_LOCATION[effectiveLocation]
    : undefined

  // If a WOD name is in the URL, show WodDetail instead of the list
  if (wodName) {
    return (
      <div className={`bg-[var(--color-bg)] px-4 max-w-lg mx-auto ${isSessionActive ? 'h-full min-h-0 flex flex-col pt-2 pb-2' : 'min-h-full pt-10 pb-24'}`}>
        <WodDetail
          wodName={decodeURIComponent(wodName)}
          onBack={() => navigate('/workout')}
        />
      </div>
    )
  }

  return (
    <div className="min-h-full bg-[var(--color-bg)] flex flex-col">
      {/* Header — hidden while the timer tab is running */}
      {!(isSessionActive && tab === 'timer') && <div className="px-4 pt-4 lg:pt-10 pb-2 flex items-end justify-between">
        <h1 className="text-2xl font-black text-[var(--color-text)]">
          <span style={{ color: '#E8642A' }}>Workout</span>
        </h1>
      </div>}

      {/* Tab bar */}
      {!(isSessionActive && tab === 'timer') && <div className="px-4 flex gap-1 bg-[var(--color-bg)] sticky top-0 z-10 pt-2 pb-3 border-b border-white/5">
        {TABS.map((t) => {
          const locked = (isSessionActive || showWarmupTimer || showWorkoutCountdown) && t.id !== 'timer'
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
      </div>}

      {/* Content */}
      <div className={`flex-1 px-4 max-w-lg mx-auto w-full ${isSessionActive && tab === 'timer' ? 'py-2 pb-2' : 'py-4 pb-24'}`}>
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
                onClick={() => setWizardOpen(true)}
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
                    backgroundColor: effectiveLocation === loc.id ? '#E8642A20' : 'var(--color-bg-card)',
                    border:          `1.5px solid ${effectiveLocation === loc.id ? '#E8642A' : 'transparent'}`,
                    color:           effectiveLocation === loc.id ? '#E8642A' : 'var(--color-text-muted)',
                  }}
                >
                  <span className="text-base">{loc.emoji}</span>
                  <span>{loc.label}</span>
                </button>
              ))}
            </div>
            {equipmentSpecified && (
              <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
                Ort-Filter aus, solange Equipment gesucht wird.
              </p>
            )}
            <WodList
              onSelectWod={(name) => navigate(`/workout/${encodeURIComponent(name)}`)}
              equipmentFilter={equipmentForLocation}
              silentMode={silentMode}
              clearEquipmentTick={clearEquipmentTick}
              onEquipmentSpecifiedChange={setEquipmentSpecified}
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
                    onShowHistory={() => setTab('history')}
                  />
                ) : (
                  <TimerView key={timerKey}
                    adHocLog={!!timerConfig.adHocLog}
                    initialMode={timerConfig.mode as Exclude<typeof timerConfig.mode, 'krafttraining'>}
                    initialMinutes={timerConfig.minutes}
                    exercises={timerConfig.exercises}
                    workoutName={timerConfig.workoutName}
                    warmupPending={showWarmupTimer || showWorkoutCountdown}
                    initialTabataWork={timerConfig.tabataWork}
                    initialTabataRest={timerConfig.tabataRest}
                    initialTabataRounds={timerConfig.tabataRounds}
                    initialEmomInterval={timerConfig.emomInterval}
                    initialEmomRounds={timerConfig.emomRounds}
                    scheme={timerConfig.scheme}
                    onShowHistory={() => setTab('history')}
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
                  onClick={() => { setAdhocPreset(null); setAdhocKey((key) => key + 1); setAdhocOpen(true) }}
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
        onClose={() => setWizardOpen(false)}
        onStart={handleWizardStart}
        onSaveOnly={handleWizardSaveOnly}
        variant="save"
      />
      <FreeTimerWizard
        key={adhocKey}
        isOpen={adhocOpen}
        onClose={() => { setAdhocOpen(false); setAdhocPreset(null) }}
        onStart={handleAdhocStart}
        variant="adhoc"
        title={adhocPreset?.name}
        initialStep={adhocPreset ? 1 : 0}
        initialValues={adhocPreset ?? undefined}
      />
      <WarmupTimer
        isOpen={showWarmupTimer}
        routine={warmupRoutine}
        onClose={() => setShowWarmupTimer(false)}
        onStartWorkout={() => { setShowWarmupTimer(false); setShowWorkoutCountdown(true) }}
      />
      <WorkoutCountdown
        isOpen={showWorkoutCountdown}
        onComplete={() => setShowWorkoutCountdown(false)}
      />
    </div>
  )
}
