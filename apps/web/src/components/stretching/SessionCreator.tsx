import { useState, useMemo } from 'react'
import type { StretchingExercise, StretchingRoutine } from '../../hooks/useStretching'
import type { WizardExercise } from '../../lib/customWorkouts'
import { saveCustomSession } from '../../lib/customWorkouts'
import { WizardShell } from '../wizard/WizardShell'
import { ExerciseListEditor } from '../wizard/ExerciseListEditor'

const PILLAR_COLOR = '#7BC67E'

interface Props {
  isOpen: boolean
  onClose: () => void
  exercises: StretchingExercise[]
  onStart: (routine: StretchingRoutine) => void
}

export function SessionCreator({ isOpen, onClose, exercises, onStart }: Props) {
  const [step,     setStep]     = useState(0)
  const [search,   setSearch]   = useState('')
  const [selected, setSelected] = useState<WizardExercise[]>([])
  const [name,     setName]     = useState('')

  const reset = () => { setStep(0); setSearch(''); setSelected([]); setName('') }
  const handleClose = () => { reset(); onClose() }

  // Step 0: exercise list filtered by search
  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return q
      ? exercises.filter(
          (e) => e.name.toLowerCase().includes(q) || e.muscle_group.toLowerCase().includes(q),
        )
      : exercises
  }, [exercises, search])

  const selectedIds = useMemo(() => new Set(selected.map((e) => e.id)), [selected])

  const toggleExercise = (ex: StretchingExercise) => {
    if (selectedIds.has(ex.id)) {
      setSelected((s) => s.filter((e) => e.id !== ex.id))
    } else {
      setSelected((s) => [...s, { id: ex.id, name: ex.name }])
    }
  }

  // Group by muscle_group for step 0
  const grouped = useMemo(() => {
    const map = new Map<string, StretchingExercise[]>()
    for (const ex of filtered) {
      const g = ex.muscle_group || 'Sonstige'
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(ex)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  const handleNext = () => {
    if (step < 2) { setStep((s) => s + 1); return }

    const exerciseIds   = selected.map((e) => e.id)
    const exerciseNames = selected.map((e) => e.name)
    const durationMin   = Math.max(5, Math.ceil((selected.length * 35) / 60))

    if (name.trim()) {
      saveCustomSession({
        id: crypto.randomUUID(),
        name: name.trim(),
        exerciseIds,
        exerciseNames,
        createdAt: new Date().toISOString(),
      })
    }

    const virtualRoutine: StretchingRoutine = {
      id:           `custom-${crypto.randomUUID()}`,
      name:         name.trim() || 'Eigene Session',
      description:  '',
      goal:         'custom',
      difficulty:   'medium',
      duration_min: durationMin,
      exercise_ids: exerciseIds,
      subcategory:  null,
    }

    reset()
    onClose()
    onStart(virtualRoutine)
  }

  const canNext =
    (step === 0 && selected.length > 0) ||
    step === 1 ||
    step === 2

  return (
    <WizardShell
      isOpen={isOpen}
      onClose={handleClose}
      title="Eigene Session"
      stepCount={3}
      currentStep={step}
      onBack={() => setStep((s) => s - 1)}
      onNext={handleNext}
      nextLabel={step === 2 ? '▶ Start' : 'Weiter'}
      canNext={canNext}
    >
      {/* Step 0: Select exercises */}
      {step === 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
              Übungen auswählen
            </p>
            {selected.length > 0 && (
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${PILLAR_COLOR}22`, color: PILLAR_COLOR }}
              >
                {selected.length} gewählt
              </span>
            )}
          </div>

          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2.5"
            style={{ backgroundColor: 'var(--color-bg-card)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>🔍</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Suchen…"
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: 'var(--color-text)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ color: 'var(--color-text-muted)' }}>
                ✕
              </button>
            )}
          </div>

          {/* Loading / empty state */}
          {exercises.length === 0 && (
            <div className="text-center py-8" style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>
              Übungen werden geladen…
            </div>
          )}
          {exercises.length > 0 && grouped.length === 0 && (
            <div className="text-center py-8" style={{ color: 'var(--color-text-muted)', fontSize: 13 }}>
              Keine Treffer
            </div>
          )}

          {/* Exercise groups */}
          {grouped.map(([group, exs]) => (
            <div key={group}>
              <p
                className="text-[10px] font-semibold uppercase tracking-wider mb-1.5 px-1"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {group}
              </p>
              <div className="space-y-1.5">
                {exs.map((ex) => {
                  const isSelected = selectedIds.has(ex.id)
                  return (
                    <button
                      key={ex.id}
                      onClick={() => toggleExercise(ex)}
                      className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all"
                      style={{
                        backgroundColor: isSelected ? `${PILLAR_COLOR}18` : 'var(--color-bg-card)',
                        border: `1.5px solid ${isSelected ? PILLAR_COLOR : 'transparent'}`,
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                        style={{
                          borderColor: isSelected ? PILLAR_COLOR : 'rgba(255,255,255,0.2)',
                          backgroundColor: isSelected ? PILLAR_COLOR : 'transparent',
                          color: 'white',
                        }}
                      >
                        {isSelected ? '✓' : ''}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-medium truncate"
                          style={{ color: isSelected ? PILLAR_COLOR : 'var(--color-text)' }}
                        >
                          {ex.name}
                        </p>
                        {ex.duration_sec > 0 && (
                          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {ex.duration_sec}s
                          </p>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 1: Reorder */}
      {step === 1 && (
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
            Reihenfolge anpassen
          </p>
          <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
            {selected.length} Übung{selected.length !== 1 ? 'en' : ''} · Dauer kannst du beim Start einstellen
          </p>
          <ExerciseListEditor
            items={selected}
            onChange={setSelected}
            showAddInput={false}
          />
        </div>
      )}

      {/* Step 2: Name */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Summary */}
          <div
            className="rounded-xl px-4 py-3"
            style={{ backgroundColor: `${PILLAR_COLOR}12`, border: `1px solid ${PILLAR_COLOR}35` }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: PILLAR_COLOR }}>
              {selected.length} Übungen ausgewählt
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {selected.slice(0, 3).map((e) => e.name).join(' · ')}
              {selected.length > 3 ? ` +${selected.length - 3} weitere` : ''}
            </p>
          </div>

          {/* Name input */}
          <div
            className="rounded-xl px-4 py-3"
            style={{ backgroundColor: 'var(--color-bg-card)' }}
          >
            <p className="text-xs font-semibold mb-2 tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              NAME <span className="font-normal">(optional, zum Speichern)</span>
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z. B. Morgen-Stretching"
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: 'var(--color-text)' }}
            />
          </div>
        </div>
      )}
    </WizardShell>
  )
}
