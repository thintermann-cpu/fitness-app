import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomWorkouts } from '../hooks/useCustomWorkouts'
import { FreeTimerWizard, type KraftConfig, type TimerInitConfig, type WizardInitialValues } from '../components/workout/FreeTimerWizard'
import type { TimerMode } from '../lib/timerLabels'
import type { WizardExercise, CustomWorkout } from '../lib/customWorkouts'

const MODE_LABELS: Record<string, string> = {
  fortime: 'ForTime', amrap: 'AMRAP', emom: 'EMOM',
  tabata: 'Tabata', krafttraining: 'Kraft',
}

export function CustomWorkoutsPage() {
  const navigate = useNavigate()
  const { data: workouts = [], isLoading, updateWorkout, deleteWorkout } = useCustomWorkouts()
  const [editWorkout, setEditWorkout] = useState<CustomWorkout | null>(null)
  const [search, setSearch] = useState('')

  function handleDelete(id: string) {
    deleteWorkout.mutate(id)
  }

  function handleStart(w: CustomWorkout) {
    navigate('/workout', { state: { startWorkout: w } })
  }

  function handleEditSave(
    mode: TimerMode,
    minutes: number,
    _withWarmup?: boolean,
    kraftConfig?: KraftConfig,
    exercises?: WizardExercise[],
    workoutName?: string,
    timerCfg?: TimerInitConfig,
  ) {
    if (!editWorkout) return
    updateWorkout.mutate({
      id:        editWorkout.id,
      createdAt: editWorkout.createdAt,
      name:      workoutName ?? editWorkout.name,
      mode,
      minutes,
      equipment: editWorkout.equipment,
      exercises: exercises ?? kraftConfig?.exercises ?? [],
      restBetweenSets:      kraftConfig?.restBetweenSets,
      restBetweenExercises: kraftConfig?.restBetweenExercises,
      tabataWork:   timerCfg?.tabataWork,
      tabataRest:   timerCfg?.tabataRest,
      tabataRounds: timerCfg?.tabataRounds,
      emomInterval: timerCfg?.emomInterval,
      emomRounds:   timerCfg?.emomRounds,
    })
    setEditWorkout(null)
  }

  const query = search.trim().toLowerCase()
  const visible = query
    ? workouts.filter((w) => {
        const hay = [
          w.name,
          ...(w.equipment ?? []),
          ...w.exercises.map((e) => e.name),
        ].join(' ').toLowerCase()
        return hay.includes(query)
      })
    : workouts

  return (
    <div className="min-h-full bg-[var(--color-bg)] px-4 pt-4 pb-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/workout')}
          className="text-lg leading-none"
          style={{ color: 'var(--color-text-muted)' }}
        >
          ←
        </button>
        <h1 className="text-xl font-black" style={{ color: 'var(--color-text)' }}>
          Eigene Workouts
        </h1>
        <span className="ml-auto text-xs px-2 py-1 rounded-full"
          style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}>
          {workouts.length}
        </span>
      </div>

      {workouts.length > 0 && (
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Name oder Equipment"
          className="w-full mb-3 rounded-xl px-3 py-2.5 text-sm outline-none"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            color: 'var(--color-text)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
      )}

      {isLoading ? (
        <div className="flex justify-center py-16">
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Lädt…</span>
        </div>
      ) : workouts.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <span className="text-5xl">⏱</span>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Noch keine eigenen Workouts. Erstelle eines über "+ Neu" auf der Workout-Seite.
          </p>
        </div>
      ) : visible.length === 0 ? (
        <p className="text-sm py-10 text-center" style={{ color: 'var(--color-text-muted)' }}>
          Kein Treffer für „{search.trim()}“
        </p>
      ) : (
        <div className="space-y-1.5">
          {visible.map((w) => {
            const meta = [
              MODE_LABELS[w.mode] ?? w.mode,
              w.minutes > 0 ? `${w.minutes} min` : '',
              w.exercises.length > 0 ? `${w.exercises.length} Übungen` : '',
            ].filter(Boolean).join(' · ')
            return (
              <div
                key={w.id}
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ backgroundColor: 'var(--color-bg-card)' }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                    {w.name}
                  </p>
                  <p className="text-[11px] truncate" style={{ color: 'var(--color-text-muted)' }}>
                    {meta}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleStart(w)}
                    className="w-8 h-8 rounded-lg text-xs font-bold text-white"
                    style={{ backgroundColor: '#E8642A' }}
                    aria-label="Start"
                  >
                    ▶
                  </button>
                  <button
                    onClick={() => setEditWorkout(w)}
                    className="w-8 h-8 rounded-lg text-xs font-semibold"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
                    aria-label="Bearbeiten"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDelete(w.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-xs"
                    style={{ color: '#ef4444' }}
                    aria-label="Löschen"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Edit wizard */}
      <FreeTimerWizard
        key={editWorkout?.id ?? 'closed'}
        isOpen={editWorkout !== null}
        onClose={() => setEditWorkout(null)}
        variant="save"
        initialValues={editWorkout ? ({
          name:     editWorkout.name,
          mode:     editWorkout.mode as WizardInitialValues['mode'],
          minutes:  editWorkout.minutes,
          exercises: editWorkout.exercises,
          restBetweenSets:      editWorkout.restBetweenSets,
          restBetweenExercises: editWorkout.restBetweenExercises,
          tabataWork:   editWorkout.tabataWork,
          tabataRest:   editWorkout.tabataRest,
          tabataRounds: editWorkout.tabataRounds,
          emomInterval: editWorkout.emomInterval,
          emomRounds:   editWorkout.emomRounds,
        } satisfies WizardInitialValues) : undefined}
        onStart={handleEditSave}
      />
    </div>
  )
}
