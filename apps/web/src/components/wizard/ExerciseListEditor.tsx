import { useState } from 'react'
import type { WizardExercise } from '../../lib/customWorkouts'
import { acceptExerciseQuery, searchExercises } from '../../lib/exerciseCatalog'

interface Props {
  items: WizardExercise[]
  onChange: (items: WizardExercise[]) => void
  placeholder?: string
  showAddInput?: boolean
  /** Suggestions stay catalog matches. A unique hit uses the catalog name. Otherwise the typed name can be added. */
  fromCatalog?: boolean
}

export function ExerciseListEditor({
  items,
  onChange,
  placeholder = 'Übung hinzufügen…',
  showAddInput = true,
  fromCatalog = false,
}: Props) {
  const [input, setInput] = useState('')
  const query = input.trim().slice(0, 80)
  const suggestions = fromCatalog && query ? searchExercises(query, 6) : []
  const accepted = fromCatalog && query ? acceptExerciseQuery(query) : null
  const canAddFree = Boolean(query) && !accepted && suggestions.length === 0
  const canAdd = fromCatalog ? Boolean(accepted) || canAddFree : Boolean(query)
  const showAnyway = Boolean(query) && (!accepted || accepted.name.toLowerCase() !== query.toLowerCase())

  const addName = (name: string) => {
    const trimmed = name.trim().slice(0, 80)
    if (!trimmed) return
    onChange([...items, { id: crypto.randomUUID(), name: trimmed }])
    setInput('')
  }

  const add = () => {
    if (accepted) {
      addName(accepted.name)
      return
    }
    if (!fromCatalog || canAddFree) addName(query)
  }

  const updateDetail = (id: string, detail: string) => {
    onChange(items.map((item) => (item.id === id ? { ...item, detail: detail || undefined } : item)))
  }

  const updateNote = (id: string, note: string) => {
    onChange(items.map((item) => (item.id === id ? { ...item, note: note.trim() ? note : undefined } : item)))
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
          <div className="flex-1 min-w-0">
            <span className="block text-sm truncate" style={{ color: 'var(--color-text)' }}>
              {ex.name}
            </span>
            {fromCatalog ? (
              <>
                <input
                  type="text"
                  value={ex.detail ?? ''}
                  onChange={(e) => updateDetail(ex.id, e.target.value)}
                  placeholder="Reps, Distanz…"
                  aria-label={`Angabe zu ${ex.name}`}
                  className="w-full bg-transparent text-xs outline-none mt-0.5"
                  style={{ color: 'var(--color-text-muted)' }}
                />
                <input
                  type="text"
                  value={ex.note ?? ''}
                  maxLength={140}
                  onChange={(e) => updateNote(ex.id, e.target.value)}
                  placeholder="Form, Tempo (optional)"
                  aria-label={`Hinweis zu ${ex.name}`}
                  className="w-full bg-transparent text-xs outline-none mt-0.5"
                  style={{ color: 'var(--color-text-subtle)' }}
                />
              </>
            ) : ex.detail ? (
              <span className="block text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{ex.detail}</span>
            ) : null}
          </div>
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
            placeholder={fromCatalog ? 'Übung suchen oder frei eingeben…' : placeholder}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: 'var(--color-text)' }}
            aria-autocomplete={fromCatalog ? 'list' : undefined}
          />
          <button
            onClick={add}
            disabled={!canAdd}
            className="text-sm font-bold px-2 py-0.5 rounded-lg transition-opacity"
            style={{ color: '#E8642A', opacity: canAdd ? 1 : 0.35 }}
            aria-label="Hinzufügen"
          >
            +
          </button>
        </div>
      )}
      {fromCatalog && query && (
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
          {suggestions.length === 0 ? (
            <p className="px-3 py-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Nicht im Katalog
            </p>
          ) : (
            suggestions.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => addName(ex.name)}
                className="w-full text-left px-3 py-2 text-sm"
                style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text)' }}
              >
                {ex.name}
              </button>
            ))
          )}
          {showAnyway && (
            <button
              type="button"
              onClick={() => addName(query)}
              className="w-full text-left px-3 py-2 text-sm font-semibold"
              style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text)' }}
            >
              Trotzdem „{query}“ hinzufügen
            </button>
          )}
        </div>
      )}
    </div>
  )
}
