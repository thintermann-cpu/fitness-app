import { useState } from 'react'
import type { WizardExercise } from '../../lib/customWorkouts'

interface Props {
  items: WizardExercise[]
  onChange: (items: WizardExercise[]) => void
  placeholder?: string
  showAddInput?: boolean
}

export function ExerciseListEditor({
  items,
  onChange,
  placeholder = 'Übung hinzufügen…',
  showAddInput = true,
}: Props) {
  const [input, setInput] = useState('')

  const add = () => {
    const name = input.trim()
    if (!name) return
    onChange([...items, { id: crypto.randomUUID(), name }])
    setInput('')
  }

  const remove = (id: string) => onChange(items.filter((e) => e.id !== id))

  const moveUp = (i: number) => {
    if (i === 0) return
    const next = [...items]
    ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
    onChange(next)
  }

  const moveDown = (i: number) => {
    if (i === items.length - 1) return
    const next = [...items]
    ;[next[i], next[i + 1]] = [next[i + 1], next[i]]
    onChange(next)
  }

  return (
    <div className="space-y-2">
      {items.map((ex, i) => (
        <div
          key={ex.id}
          className="flex items-center gap-2 rounded-xl px-3 py-2.5"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        >
          <span
            className="text-xs font-bold w-5 text-center flex-shrink-0"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {i + 1}
          </span>
          <span className="flex-1 text-sm truncate" style={{ color: 'var(--color-text)' }}>
            {ex.name}
          </span>
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <button
              onClick={() => moveUp(i)}
              disabled={i === 0}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-xs transition-colors"
              style={{ color: i === 0 ? 'rgba(255,255,255,0.15)' : 'var(--color-text-muted)' }}
              aria-label="Nach oben"
            >
              ↑
            </button>
            <button
              onClick={() => moveDown(i)}
              disabled={i === items.length - 1}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-xs transition-colors"
              style={{
                color: i === items.length - 1 ? 'rgba(255,255,255,0.15)' : 'var(--color-text-muted)',
              }}
              aria-label="Nach unten"
            >
              ↓
            </button>
            <button
              onClick={() => remove(ex.id)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-xs ml-0.5"
              style={{ color: '#ef4444' }}
              aria-label="Entfernen"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      {showAddInput && (
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--color-text)' }}
          />
          <button
            onClick={add}
            disabled={!input.trim()}
            className="text-sm font-bold px-2 py-0.5 rounded-lg transition-opacity"
            style={{ color: '#E8642A', opacity: input.trim() ? 1 : 0.35 }}
            aria-label="Hinzufügen"
          >
            +
          </button>
        </div>
      )}
    </div>
  )
}
