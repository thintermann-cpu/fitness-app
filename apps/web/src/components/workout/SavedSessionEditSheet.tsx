import { useEffect, useState } from 'react'
import type { CustomWorkout } from '../../lib/customWorkouts'
import { isWorkBlock, seedFromBlock, type WorkoutBlock } from '../../lib/workoutBlocks'
import { ImportSessionEditor, sessionDraftReady } from './ImportSessionEditor'

interface Props {
  workout: CustomWorkout | null
  onClose: () => void
  onSave: (workout: CustomWorkout) => void
}

export function SavedSessionEditSheet({ workout, onClose, onSave }: Props) {
  const [name, setName] = useState('')
  const [blocks, setBlocks] = useState<WorkoutBlock[]>([])

  useEffect(() => {
    if (!workout) return
    setName(workout.name)
    setBlocks(workout.blocks ?? [])
  }, [workout])

  if (!workout) return null

  const ready = sessionDraftReady(blocks) && !!name.trim()
  const first = blocks.find(isWorkBlock)

  function handleSave() {
    if (!workout || !ready || !first) return
    const seed = seedFromBlock(first)
    const mode = seed.mode === 'krafttraining' ? 'krafttraining' as const : seed.mode
    onSave({
      id: workout.id,
      createdAt: workout.createdAt,
      equipment: workout.equipment,
      name: name.trim(),
      mode,
      minutes: seed.minutes,
      exercises: seed.exercises,
      restBetweenSets: seed.restBetweenSets,
      restBetweenExercises: seed.restBetweenExercises,
      emomInterval: seed.emomInterval,
      emomRounds: seed.emomRounds,
      tabataWork: seed.tabataWork,
      tabataRest: seed.tabataRest,
      tabataRounds: seed.tabataRounds,
      scheme: seed.scheme,
      blocks,
      directStart: true,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <button type="button" className="absolute inset-0 bg-black/60" aria-label="Schliessen" onClick={onClose} />
      <div
        className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-2xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
          <h2 className="text-base font-bold">Session bearbeiten</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-sm"
            style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3">
          <ImportSessionEditor name={name} blocks={blocks} onName={setName} onBlocks={setBlocks} />
        </div>
        <div className="px-4 py-3 border-t border-white/8 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
          >
            Abbrechen
          </button>
          <button
            type="button"
            disabled={!ready}
            onClick={handleSave}
            className="flex-1 py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40"
            style={{ backgroundColor: '#E8642A' }}
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  )
}
