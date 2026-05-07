import { useState } from 'react'
import type { WodHistoryEntry } from '../../hooks/useWodHistory'

type ScoreType = WodHistoryEntry['score_type']

interface Props {
  wodName: string
  isOpen: boolean
  onClose: () => void
  onSave: (entry: Omit<WodHistoryEntry, 'id' | 'completed_at'>) => void
  isPending?: boolean
}

const SCORE_TYPES: { value: ScoreType; label: string; placeholder: string }[] = [
  { value: 'time', label: 'Time', placeholder: 'e.g. 7:42' },
  { value: 'rounds', label: 'Rounds', placeholder: 'e.g. 12' },
  { value: 'reps', label: 'Reps', placeholder: 'e.g. 150' },
  { value: 'weight', label: 'Weight (kg)', placeholder: 'e.g. 80' },
]

export function ScoreInput({ wodName, isOpen, onClose, onSave, isPending }: Props) {
  const [scoreType, setScoreType] = useState<ScoreType>('time')
  const [scoreValue, setScoreValue] = useState('')
  const [notes, setNotes] = useState('')

  if (!isOpen) return null

  function handleSave() {
    if (!scoreValue.trim()) return
    onSave({ wod_name: wodName, score_type: scoreType, score_value: scoreValue.trim(), notes: notes.trim() || undefined })
    setScoreValue('')
    setNotes('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-[var(--color-bg-elevated)] rounded-t-2xl sm:rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--color-text)]">Log Result</h3>
          <button
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <p className="text-sm text-[var(--color-text-muted)]">{wodName}</p>

        <div>
          <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
            Score type
          </label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {SCORE_TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setScoreType(t.value)}
                className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                  scoreType === t.value
                    ? 'bg-[#E8642A] text-white'
                    : 'bg-white/8 text-[var(--color-text-muted)] hover:bg-white/12'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
            Score
          </label>
          <input
            type="text"
            value={scoreValue}
            onChange={(e) => setScoreValue(e.target.value)}
            placeholder={SCORE_TYPES.find((t) => t.value === scoreType)?.placeholder}
            className="mt-2 w-full bg-white/8 border border-white/10 rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[#E8642A]"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did it feel? Any scaling?"
            rows={2}
            className="mt-2 w-full bg-white/8 border border-white/10 rounded-lg px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[#E8642A] resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!scoreValue.trim() || isPending}
          className="w-full py-3.5 rounded-xl bg-[#E8642A] text-white font-semibold text-base disabled:opacity-50 active:scale-[0.98] transition-transform"
        >
          {isPending ? 'Saving…' : 'Save Result'}
        </button>
      </div>
    </div>
  )
}
