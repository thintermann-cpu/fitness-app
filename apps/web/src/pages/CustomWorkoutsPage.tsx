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
  const [renamingId, setRenamingId]   = useState<string | null>(null)
  const [renameVal,  setRenameVal]    = useState('')

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

  function commitRename(id: string) {
    const val = renameVal.trim()
    if (val) {
      const w = workouts.find((x) => x.id === id)
      if (w) updateWorkout.mutate({ ...w, name: val })
    }
    setRenamingId(null)
  }

  return (
    <div className="min-h-svh bg-[var(--color-bg)] px-4 pt-4 pb-24 max-w-lg mx-auto">
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
      ) : (
        <div className="space-y-2.5">
          {workouts.map((w) => (
            <div
              key={w.id}
              className="rounded-xl px-3 py-3"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              {/* Name row */}
              <div className="flex items-center gap-2 mb-2">
                {renamingId === w.id ? (
                  <input
                    autoFocus
                    value={renameVal}
                    onChange={(e) => setRenameVal(e.target.value)}
                    onBlur={() => commitRename(w.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter') commitRename(w.id); if (e.key === 'Escape') setRenamingId(null) }}
                    className="flex-1 bg-transparent text-sm font-medium outline-none border-b"
                    style={{ color: 'var(--color-text)', borderColor: '#E8642A' }}
                  />
                ) : (
                  <p className="flex-1 text-sm font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                    {w.name}
                  </p>
                )}
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: '#E8642A20', color: '#E8642A' }}
                >
                  {MODE_LABELS[w.mode] ?? w.mode.toUpperCase()}
                </span>
              </div>

              {/* Subtitle */}
              <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
                {w.minutes > 0 ? `${w.minutes} min` : ''}
                {w.exercises.length > 0 ? ` · ${w.exercises.length} Übungen` : ''}
                {w.tabataWork ? ` · ${w.tabataWork}s/${w.tabataRest}s×${w.tabataRounds}` : ''}
                {w.emomInterval ? ` · ${w.emomInterval}min×${w.emomRounds}` : ''}
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleStart(w)}
                  className="flex-1 py-2 rounded-lg text-xs font-bold text-white"
                  style={{ backgroundColor: '#E8642A' }}
                >
                  ▶ Start
                </button>
                <button
                  onClick={() => setEditWorkout(w)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
                >
                  ✎ Bearbeiten
                </button>
                <button
                  onClick={() => { setRenamingId(w.id); setRenameVal(w.name) }}
                  className="px-3 py-2 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
                >
                  ✏ Name
                </button>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-xs flex-shrink-0"
                  style={{ color: '#ef4444' }}
                  aria-label="Löschen"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
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
