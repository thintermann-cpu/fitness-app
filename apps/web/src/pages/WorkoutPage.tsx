import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import type { WorkoutLocation } from '../store/authStore'
import { DEFAULT_EQUIPMENT_BY_LOCATION } from '../store/authStore'
import { WodList } from '../components/workout/WodList'
import { WodDetail } from '../components/workout/WodDetail'
import { TimerView } from '../components/workout/TimerView'
import { WodHistoryList } from '../components/workout/WodHistoryList'

type Tab = 'wods' | 'timer' | 'history'

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

  const [tab, setTab]             = useState<Tab>('wods')
  const [location, setLocation]   = useState<WorkoutLocation | null>(getSavedLocation())
  const silentMode = localStorage.getItem('carveout_silent_mode') === 'true'

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
      <div className="px-4 pt-10 pb-2">
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
            <TimerView />
          </div>
        )}
        {tab === 'history' && <WodHistoryList />}
      </div>
    </div>
  )
}
