import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import type { WorkoutLocation } from '../store/authStore'
import { DEFAULT_EQUIPMENT_BY_LOCATION } from '../store/authStore'
import { WodList } from '../components/workout/WodList'
import { WodDetail } from '../components/workout/WodDetail'
import { TimerView } from '../components/workout/TimerView'
import { WodHistoryList } from '../components/workout/WodHistoryList'
import { FreeTimerWizard } from '../components/workout/FreeTimerWizard'
import { WarmupTimer } from '../components/workout/WarmupTimer'
import {
  loadCustomWorkouts,
  deleteCustomWorkout,
  type CustomWorkout,
} from '../lib/customWorkouts'

type Tab = 'wods' | 'timer' | 'history'
type TimerMode = 'fortime' | 'amrap' | 'emom' | 'tabata'

const TABS: { id: Tab; label: string }[] = [
  { id: 'wods',    label: 'WODs' },
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

export function WorkoutPage() {
  const { wodName } = useParams<{ wodName: string }>()
  const navigate    = useNavigate()
  const { profile } = useAuthStore()

  const [tab, setTab]               = useState<Tab>('wods')
  const [location, setLocation]     = useState<WorkoutLocation | null>(getSavedLocation())
  const [wizardOpen, setWizardOpen] = useState(false)
  const [adhocOpen, setAdhocOpen]   = useState(false)
  const [timerConfig, setTimerConfig] = useState<{ mode: TimerMode; minutes: number } | null>(null)
  const [showWarmupTimer, setShowWarmupTimer] = useState(false)
  const [savedWorkouts, setSavedWorkouts] = useState<CustomWorkout[]>(() => loadCustomWorkouts())
  const silentMode = localStorage.getItem('carveout_silent_mode') === 'true'

  // When returning from WodDetail back to the list, always land on WODs tab
  useEffect(() => {
    if (!wodName) setTab('wods')
  }, [wodName])

  function handleWizardStart(mode: TimerMode, minutes: number) {
    setTimerConfig({ mode, minutes })
    setTab('timer')
  }

  function handleAdhocStart(mode: TimerMode, minutes: number, withWarmup?: boolean) {
    setTimerConfig({ mode, minutes })
    if (withWarmup) setShowWarmupTimer(true)
  }

  function handleDeleteSaved(id: string) {
    deleteCustomWorkout(id)
    setSavedWorkouts(loadCustomWorkouts())
  }

  function handleStartSaved(w: CustomWorkout) {
    setTimerConfig({ mode: w.mode, minutes: w.minutes })
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
            <WodList
              onSelectWod={(name) => navigate(`/workout/${encodeURIComponent(name)}`)}
              equipmentFilter={equipmentForLocation}
              silentMode={silentMode}
            />
          </>
        )}
        {tab === 'timer' && (
          <div className="py-4">
            {timerConfig ? (
              <>
                <TimerView
                  adHocLog
                  initialMode={timerConfig.mode}
                  initialMinutes={timerConfig.minutes}
                />
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
