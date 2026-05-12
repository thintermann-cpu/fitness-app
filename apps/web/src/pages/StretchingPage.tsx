import { useState, useMemo } from 'react'
import { useAuthStore } from '../store/authStore'
import { useStretchingRoutines, useStretchingExercises } from '../hooks/useStretching'
import type { StretchingRoutine } from '../hooks/useStretching'
import { RoutineCard } from '../components/stretching/RoutineCard'
import { RoutineDetail } from '../components/stretching/RoutineDetail'
import { GuidedSession } from '../components/stretching/GuidedSession'
import { StretchingHistory } from '../components/stretching/StretchingHistory'

const PILLAR_COLOR = '#7BC67E'

type Lang = 'de' | 'en' | 'es'
type Tab = 'routines' | 'history'
type View = 'list' | 'detail' | 'session'

const T = {
  de: {
    title: 'Stretch & Yoga',
    tabRoutines: 'Routinen',
    tabHistory: 'Verlauf',
    all: 'Alle',
    morning: 'Morgen',
    post_workout: 'Post-Workout',
    office: 'Büro',
    evening: 'Abend',
    full_body: 'Ganzkörper',
    upper_body: 'Oberkörper',
    lower_body: 'Unterkörper',
    recovery: 'Erholung',
    loading: 'Laden…',
    empty: 'Keine Routinen gefunden.',
  },
  en: {
    title: 'Stretch & Yoga',
    tabRoutines: 'Routines',
    tabHistory: 'History',
    all: 'All',
    morning: 'Morning',
    post_workout: 'Post-Workout',
    office: 'Office',
    evening: 'Evening',
    full_body: 'Full Body',
    upper_body: 'Upper Body',
    lower_body: 'Lower Body',
    recovery: 'Recovery',
    loading: 'Loading…',
    empty: 'No routines found.',
  },
  es: {
    title: 'Estiramiento & Yoga',
    tabRoutines: 'Rutinas',
    tabHistory: 'Historial',
    all: 'Todas',
    morning: 'Mañana',
    post_workout: 'Post-entreno',
    office: 'Oficina',
    evening: 'Tarde',
    full_body: 'Cuerpo completo',
    upper_body: 'Tren superior',
    lower_body: 'Tren inferior',
    recovery: 'Recuperación',
    loading: 'Cargando…',
    empty: 'No se encontraron rutinas.',
  },
}

const GOAL_FILTERS = [
  'all', 'morning', 'post_workout', 'office', 'evening',
  'full_body', 'upper_body', 'lower_body', 'recovery',
] as const

type GoalFilter = typeof GOAL_FILTERS[number]

export function StretchingPage() {
  const profile = useAuthStore((s) => s.profile)
  const lang = ((profile?.language ?? 'en') as Lang)
  const t = T[lang]

  const [tab, setTab] = useState<Tab>('routines')
  const [goalFilter, setGoalFilter] = useState<GoalFilter>('all')
  const [view, setView] = useState<View>('list')
  const [selectedRoutine, setSelectedRoutine] = useState<StretchingRoutine | null>(null)

  const { data: routines = [], isLoading: routinesLoading } = useStretchingRoutines()
  const { data: exercises = [], isLoading: exercisesLoading } = useStretchingExercises()

  const isLoading = routinesLoading || exercisesLoading

  const filteredRoutines = useMemo(
    () => goalFilter === 'all' ? routines : routines.filter((r) => r.goal === goalFilter),
    [routines, goalFilter],
  )

  const handleSelectRoutine = (routine: StretchingRoutine) => {
    setSelectedRoutine(routine)
    setView('detail')
  }

  const handleStartSession = () => {
    setView('session')
  }

  const handleFinishSession = () => {
    setSelectedRoutine(null)
    setView('list')
    setTab('history')
  }

  const handleBack = () => {
    if (view === 'session') {
      setView('detail')
    } else {
      setSelectedRoutine(null)
      setView('list')
    }
  }

  // Detail / Session views (full-screen, no tab bar)
  if (view !== 'list' && selectedRoutine) {
    return (
      <div className="min-h-svh bg-[var(--color-bg)] flex flex-col overflow-x-hidden">
        <div className="flex-1 px-4 py-6 pb-24 max-w-lg mx-auto w-full overflow-y-auto">
          {view === 'detail' && (
            <RoutineDetail
              routine={selectedRoutine}
              exercises={exercises}
              lang={lang}
              onBack={handleBack}
              onStart={handleStartSession}
            />
          )}
          {view === 'session' && (
            <GuidedSession
              routine={selectedRoutine}
              exercises={exercises}
              lang={lang}
              onFinish={handleFinishSession}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-[var(--color-bg)] flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="px-4 pt-4 lg:pt-10 pb-2 flex items-end justify-between">
        <h1 className="text-2xl font-black" style={{ color: PILLAR_COLOR }}>
          {t.title}
        </h1>
      </div>

      {/* Tab bar */}
      <div className="px-4 flex gap-1 bg-[var(--color-bg)] sticky top-0 z-10 pt-2 pb-3 border-b border-white/5">
        {([['routines', t.tabRoutines], ['history', t.tabHistory]] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              tab === id
                ? 'text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
            style={tab === id ? { backgroundColor: PILLAR_COLOR } : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 pb-24 max-w-lg mx-auto w-full">
        {tab === 'routines' && (
          <>
            {/* Goal filter chips */}
            <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none">
              {GOAL_FILTERS.map((goal) => {
                const label = t[goal as keyof typeof t] as string
                const active = goalFilter === goal
                return (
                  <button
                    key={goal}
                    onClick={() => setGoalFilter(goal)}
                    className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                    style={
                      active
                        ? { backgroundColor: PILLAR_COLOR, color: 'white' }
                        : { backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }
                    }
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Routine list */}
            <div className="px-4 space-y-3">
              {isLoading ? (
                <>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-white/5 p-4 animate-pulse">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="h-4 rounded bg-white/10 flex-1" />
                        <div className="h-5 w-20 rounded-full bg-white/10" />
                      </div>
                      <div className="h-3 rounded bg-white/10 mb-1.5 w-full" />
                      <div className="h-3 rounded bg-white/10 w-2/3" />
                      <div className="mt-3 flex gap-2">
                        <div className="h-2.5 w-14 rounded bg-white/10" />
                        <div className="h-2.5 w-10 rounded bg-white/10" />
                      </div>
                    </div>
                  ))}
                </>
              ) : filteredRoutines.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <span className="text-4xl">🤸</span>
                  <p className="text-sm text-[var(--color-text-muted)]">{t.empty}</p>
                </div>
              ) : (
                filteredRoutines.map((routine) => (
                  <RoutineCard
                    key={routine.id}
                    routine={routine}
                    lang={lang}
                    onClick={() => handleSelectRoutine(routine)}
                  />
                ))
              )}
            </div>
          </>
        )}

        {tab === 'history' && (
          <div className="px-4 py-4">
            <StretchingHistory routines={routines} lang={lang} />
          </div>
        )}
      </div>
    </div>
  )
}
