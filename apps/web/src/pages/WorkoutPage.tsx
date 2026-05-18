import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import type { WorkoutLocation } from '../store/authStore'
import { DEFAULT_EQUIPMENT_BY_LOCATION } from '../store/authStore'
import { WodList } from '../components/workout/WodList'
import { WodDetail } from '../components/workout/WodDetail'
import { TimerView } from '../components/workout/TimerView'
import { KraftTimerView } from '../components/workout/KraftTimerView'
import { WodHistoryList } from '../components/workout/WodHistoryList'
import { FreeTimerWizard, type KraftConfig } from '../components/workout/FreeTimerWizard'
import { WarmupTimer } from '../components/workout/WarmupTimer'
import {
  loadCustomWorkouts,
  deleteCustomWorkout,
  type CustomWorkout,
  type WizardExercise,
} from '../lib/customWorkouts'
import { type TimerMode } from '../lib/timerLabels'
import { WOD_CATEGORY_LABELS } from '../lib/categoryLabels'

type Tab = 'wods' | 'timer' | 'history'

const TABS: { id: Tab; label: string }[] = [
  { id: 'wods',    label: 'Workouts' },
  { id: 'timer',   label: 'Timer' },
  { id: 'history', label: 'History' },
]

const WOD_CATEGORIES: { id: string; label: string }[] = [
  { id: '',                label: 'Alle' },
  { id: 'crossfit',        label: 'CrossFit' },
  { id: 'hiit',            label: 'HIIT' },
  { id: 'kraft_ausdauer',  label: 'Kraft-Ausdauer' },
  { id: 'kraft_wenig_zeit', label: 'Kraft - Wenig Zeit' },
  { id: 'krafttraining',   label: 'Krafttraining' },
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

export function WorkoutPage() {
  const { wodName } = useParams<{ wodName: string }>()
  const navigate    = useNavigate()
  const { profile } = useAuthStore()

  const [tab, setTab]                     = useState<Tab>('wods')
  const [location, setLocation]           = useState<WorkoutLocation | null>(getSavedLocation())
  const [wizardOpen, setWizardOpen]       = useState(false)
  const [adhocOpen, setAdhocOpen]         = useState(false)
  const [showAllEquipment, setShowAllEquipment] = useState(false)
  const [timerConfig, setTimerConfig] = useState<{ mode: TimerMode; minutes: number; kraftConfig?: KraftConfig; exercises?: WizardExercise[] } | null>(null)
  const [showWarmupTimer, setShowWarmupTimer] = useState(false)
  const [wodCategory, setWodCategory] = useState('')
  const [tooltipCat, setTooltipCat] = useState<string | null>(null)
  const [savedWorkouts, setSavedWorkouts] = useState<CustomWorkout[]>(() => loadCustomWorkouts())
  const silentMode = localStorage.getItem('carveout_silent_mode') === 'true'

  // When returning from WodDetail back to the list, always land on WODs tab
  useEffect(() => {
    if (!wodName) setTab('wods')
  }, [wodName])

  function handleWizardStart(mode: TimerMode, minutes: number, _withWarmup?: boolean, kraftConfig?: KraftConfig, exercises?: WizardExercise[]) {
    setTimerConfig({ mode, minutes, kraftConfig, exercises })
    setTab('timer')
  }

  function handleAdhocStart(mode: TimerMode, minutes: number, withWarmup?: boolean, kraftConfig?: KraftConfig, exercises?: WizardExercise[]) {
    setTimerConfig({ mode, minutes, kraftConfig, exercises })
    if (withWarmup) setShowWarmupTimer(true)
  }

  function handleDeleteSaved(id: string) {
    deleteCustomWorkout(id)
    setSavedWorkouts(loadCustomWorkouts())
  }

  function handleStartSaved(w: CustomWorkout) {
    const kraftConfig: KraftConfig | undefined = w.mode === 'krafttraining'
      ? { exercises: w.exercises, restBetweenSets: w.restBetweenSets ?? 90, restBetweenExercises: w.restBetweenExercises ?? 60 }
      : undefined
    setTimerConfig({ mode: w.mode, minutes: w.minutes, kraftConfig })
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
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              tab === t.id
                ? 'bg-[#E8642A] text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 pb-24 max-w-lg mx-auto w-full">
        {tab === 'wods' && (
          <>
            {/* Custom workouts section */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Eigene Workouts
                </span>
                <button
                  onClick={() => { setSavedWorkouts(loadCustomWorkouts()); setWizardOpen(true) }}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{ backgroundColor: '#E8642A18', color: '#E8642A' }}
                >
                  + Neu
                </button>
              </div>
              {savedWorkouts.length === 0 ? (
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Noch keine gespeicherten Workouts.
                </p>
              ) : (
                <div className="space-y-2">
                  {savedWorkouts.map((w) => (
                    <div
                      key={w.id}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5"
                      style={{ backgroundColor: 'var(--color-bg-card)' }}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>
                          {w.name}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {w.mode.toUpperCase()} · {w.minutes} min
                          {w.exercises.length > 0 ? ` · ${w.exercises.length} Übungen` : ''}
                        </p>
                      </div>
                      <button
                        onClick={() => handleStartSaved(w)}
                        className="text-xs font-bold px-2.5 py-1.5 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: '#E8642A20', color: '#E8642A' }}
                        aria-label="Starten"
                      >
                        ▶
                      </button>
                      <button
                        onClick={() => handleDeleteSaved(w.id)}
                        className="text-xs flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg"
                        style={{ color: 'rgba(255,255,255,0.3)' }}
                        aria-label="Löschen"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
            {/* Category chips */}
            <div className="flex gap-2 mb-1 overflow-x-auto pb-1 scrollbar-none">
              {WOD_CATEGORIES.map((cat) => (
                <div key={cat.id} className="flex-shrink-0 flex items-center gap-0.5">
                  <button
                    onClick={() => setWodCategory(cat.id)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: wodCategory === cat.id ? '#E8642A' : 'var(--color-bg-card)',
                      color: wodCategory === cat.id ? 'white' : 'var(--color-text-muted)',
                    }}
                  >
                    {cat.label}
                  </button>
                  {cat.id && WOD_CATEGORY_LABELS[cat.id] && (
                    <button
                      onClick={() => setTooltipCat(tooltipCat === cat.id ? null : cat.id)}
                      className="w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold flex-shrink-0"
                      style={{ color: tooltipCat === cat.id ? '#E8642A' : 'var(--color-text-muted)', backgroundColor: 'transparent' }}
                      aria-label={`Info zu ${cat.label}`}
                    >
                      ℹ
                    </button>
                  )}
                </div>
              ))}
            </div>
            {tooltipCat && WOD_CATEGORY_LABELS[tooltipCat] && (
              <div
                className="mb-3 px-3 py-2 rounded-xl text-xs"
                style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
              >
                {WOD_CATEGORY_LABELS[tooltipCat].description}
              </div>
            )}
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
              wodCategory={wodCategory || undefined}
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
                    onComplete={() => setTimerConfig(null)}
                  />
                ) : (
                  <TimerView
                    adHocLog
                    initialMode={timerConfig.mode as Exclude<typeof timerConfig.mode, 'krafttraining'>}
                    initialMinutes={timerConfig.minutes}
                    exercises={timerConfig.exercises}
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
      />
    </div>
  )
}
