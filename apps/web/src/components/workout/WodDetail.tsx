import { useState } from 'react'
import { useWod } from '../../hooks/useWods'
import { useWodHistory } from '../../hooks/useWodHistory'
import { TimerView } from './TimerView'
import { ScoreInput } from './ScoreInput'
import { WodHistoryList } from './WodHistoryList'

type TimerMode = 'fortime' | 'amrap' | 'emom' | 'tabata'

const TYPE_TO_TIMER_MODE: Record<string, TimerMode> = {
  ForTime: 'fortime',
  AMRAP: 'amrap',
  EMOM: 'emom',
  Tabata: 'tabata',
}

interface Props {
  wodName: string
  onBack: () => void
}

export function WodDetail({ wodName, onBack }: Props) {
  const { data: wod, isLoading } = useWod(wodName)
  const { personalBest, addEntry } = useWodHistory(wodName)
  const [showTimer, setShowTimer]   = useState(false)
  const [showScore, setShowScore]   = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="text-[var(--color-text-muted)]">Loading…</span>
      </div>
    )
  }

  if (!wod) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--color-text-muted)]">WOD not found.</p>
        <button onClick={onBack} className="mt-4 text-[#E8642A] underline text-sm">
          Go back
        </button>
      </div>
    )
  }

  const timerMode = TYPE_TO_TIMER_MODE[wod.type] ?? 'fortime'

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <button
          onClick={onBack}
          className="mt-0.5 text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-lg leading-none"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-black text-[var(--color-text)]">{wod.name}</h2>
          <div className="flex gap-2 mt-1 flex-wrap">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#E8642A]/20 text-[#E8642A]">
              {wod.type}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">{wod.category}</span>
            {wod.estimated_minutes > 0 && (
              <span className="text-xs text-[var(--color-text-muted)]">~{wod.estimated_minutes} min</span>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-md)] p-4 space-y-3">
        <p className="text-[var(--color-text)] text-sm leading-relaxed">{wod.description}</p>

        {wod.exercises && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              Exercises
            </p>
            <p className="text-sm text-[var(--color-text)]">{wod.exercises}</p>
          </div>
        )}

        {wod.reps && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              Reps / Scheme
            </p>
            <p className="text-sm text-[var(--color-text)] font-mono">{wod.reps}</p>
          </div>
        )}

        {wod.gewicht && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
              Weight
            </p>
            <p className="text-sm text-[var(--color-text)]">{wod.gewicht} kg</p>
          </div>
        )}

        {/* Equipment */}
        {wod.equipment.length > 0 && (
          <div>
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
              Equipment
            </p>
            <div className="flex flex-wrap gap-1.5">
              {wod.equipment.map((eq) => (
                <span
                  key={eq}
                  className="text-xs px-2 py-1 rounded-full bg-white/8 text-[var(--color-text-muted)]"
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scaling */}
      {(wod.skal_leicht || wod.skal_schwer) && (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-md)] p-4 space-y-3">
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
            Scaling
          </p>
          {wod.skal_leicht && (
            <div>
              <p className="text-xs text-green-400 mb-0.5">Easier</p>
              <p className="text-sm text-[var(--color-text)]">{wod.skal_leicht}</p>
            </div>
          )}
          {wod.skal_schwer && (
            <div>
              <p className="text-xs text-orange-400 mb-0.5">Harder</p>
              <p className="text-sm text-[var(--color-text)]">{wod.skal_schwer}</p>
            </div>
          )}
        </div>
      )}

      {/* Personal best */}
      {personalBest && (
        <div className="bg-[#E8642A]/10 border border-[#E8642A]/20 rounded-[var(--radius-md)] p-4 flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-xs text-[#E8642A] font-medium uppercase tracking-wide">Personal Best</p>
            <p className="text-lg font-bold text-[var(--color-text)]">
              {personalBest.score_value}{' '}
              <span className="text-sm font-normal text-[var(--color-text-muted)] capitalize">
                ({personalBest.score_type})
              </span>
            </p>
          </div>
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowTimer((v) => !v)}
          className="flex-1 py-3.5 rounded-xl bg-[#E8642A] text-white font-semibold text-base active:scale-[0.98] transition-transform"
        >
          {showTimer ? 'Hide Timer' : '▶ Start Timer'}
        </button>
        <button
          onClick={() => setShowScore(true)}
          className="px-5 py-3.5 rounded-xl border border-[#E8642A]/40 text-[#E8642A] font-semibold text-sm active:scale-[0.98] transition-transform"
        >
          Log
        </button>
      </div>

      {/* Embedded timer */}
      {showTimer && (
        <div className="bg-[var(--color-bg-card)] rounded-[var(--radius-lg)] p-4">
          <TimerView
            initialMode={timerMode}
            initialMinutes={wod.estimated_minutes || 20}
            onComplete={() => setShowScore(true)}
          />
        </div>
      )}

      {/* History toggle */}
      <button
        onClick={() => setShowHistory((v) => !v)}
        className="w-full text-left py-3 border-t border-white/8 flex items-center justify-between"
      >
        <span className="text-sm font-medium text-[var(--color-text-muted)]">My History</span>
        <span className="text-[var(--color-text-muted)]">{showHistory ? '▲' : '▼'}</span>
      </button>

      {showHistory && <WodHistoryList wodName={wodName} />}

      {/* Score input modal */}
      <ScoreInput
        wodName={wodName}
        isOpen={showScore}
        onClose={() => setShowScore(false)}
        onSave={(entry) => {
          addEntry.mutate(entry)
          setShowScore(false)
        }}
        isPending={addEntry.isPending}
      />
    </div>
  )
}
