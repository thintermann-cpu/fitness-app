import { useState } from 'react'
import type { StretchingExercise } from '../../hooks/useStretching'

const PILLAR_COLOR = '#7BC67E'

const MUSCLE_LABELS: Record<string, string> = {
  hips:       '🦋 Hips',
  back:       '🏋️ Back',
  shoulders:  '💪 Shoulders',
  hamstrings: '🦵 Hamstrings',
  chest:      '🫁 Chest',
  calves:     '🦶 Calves',
  neck:       '🦒 Neck',
  full_body:  '🌐 Full Body',
}

interface Props {
  exercise: StretchingExercise
  index?: number
}

export function ExerciseCard({ exercise, index }: Props) {
  const [expanded, setExpanded] = useState(false)
  const muscleLabel = MUSCLE_LABELS[exercise.muscle_group] ?? exercise.muscle_group

  return (
    <div className="rounded-[var(--radius-md)] bg-[var(--color-bg-elevated)] border border-white/5 overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start gap-3">
          {index !== undefined && (
            <span
              className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
              style={{ backgroundColor: PILLAR_COLOR }}
            >
              {index + 1}
            </span>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm text-[var(--color-text)]">
                {exercise.name}
              </span>
              <span className="text-xs text-[var(--color-text-subtle)] bg-white/5 px-1.5 py-0.5 rounded">
                {muscleLabel}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-[var(--color-text-muted)]">
                {exercise.duration_sec}s
              </span>
              <span className="text-[var(--color-text-subtle)] text-xs">·</span>
              <span className="text-xs text-[var(--color-text-subtle)] capitalize">
                {exercise.difficulty}
              </span>
            </div>
          </div>
          <span
            className="shrink-0 text-xs transition-transform duration-200"
            style={{
              color: PILLAR_COLOR,
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              display: 'inline-block',
            }}
          >
            ▼
          </span>
        </div>
      </button>

      {expanded && exercise.instructions.length > 0 && (
        <div className="px-4 pb-4">
          <div className="border-t border-white/5 pt-3 space-y-1.5">
            {exercise.instructions.map((step, i) => (
              <div key={i} className="flex gap-2 text-sm text-[var(--color-text-muted)]">
                <span className="shrink-0 text-xs font-bold mt-0.5" style={{ color: PILLAR_COLOR }}>
                  {i + 1}.
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
