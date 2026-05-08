import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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

export function WorkoutPage() {
  const { wodName } = useParams<{ wodName: string }>()
  const navigate    = useNavigate()
  const [tab, setTab] = useState<Tab>('wods')

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
          <WodList
            onSelectWod={(name) => navigate(`/workout/${encodeURIComponent(name)}`)}
          />
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
