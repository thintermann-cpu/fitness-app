import { useState } from 'react'
import { WizardShell } from '../wizard/WizardShell'
import { ExerciseListEditor } from '../wizard/ExerciseListEditor'
import type { WizardExercise } from '../../lib/customWorkouts'
import { saveCustomWorkout } from '../../lib/customWorkouts'
import { TIMER_LABELS, TIMER_MODE_LIST } from '../../lib/timerLabels'
import type { TimerMode } from '../../lib/timerLabels'

export type { TimerMode }

export interface KraftConfig {
  exercises: WizardExercise[]
  restBetweenSets: number
  restBetweenExercises: number
}

interface Props {
  isOpen: boolean
  onClose: () => void
  /** 'save' = incl. name field + localStorage save; 'adhoc' = no save, adds warmup step */
  variant?: 'save' | 'adhoc'
  onStart: (mode: TimerMode, minutes: number, withWarmup?: boolean, kraftConfig?: KraftConfig) => void
}

const REST_BETWEEN_SETS_OPTIONS    = [45, 60, 90, 120]
const REST_BETWEEN_EXERCISE_OPTIONS = [30, 60, 90]

function MiniStepper({
  value, onChange, min, max,
}: { value: number; onChange: (v: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-6 h-6 rounded-lg text-sm font-bold flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
      >−</button>
      <span className="w-7 text-center text-sm font-bold" style={{ color: 'var(--color-text)' }}>
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-6 h-6 rounded-lg text-sm font-bold flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
      >+</button>
    </div>
  )
}

export function FreeTimerWizard({ isOpen, onClose, variant = 'save', onStart }: Props) {
  const isAdhoc   = variant === 'adhoc'
  const stepCount = isAdhoc ? 4 : 3

  const [step,      setStep]      = useState(0)
  const [mode,      setMode]      = useState<TimerMode>('fortime')
  const [exercises, setExercises] = useState<WizardExercise[]>([])
  const [minutes,   setMinutes]   = useState(20)
  const [name,      setName]      = useState('')
  const [warmup,    setWarmup]    = useState<boolean | null>(null)

  // Krafttraining config
  const [restBetweenSets,      setRestBetweenSets]      = useState(90)
  const [restBetweenExercises, setRestBetweenExercises] = useState(60)

  const isKraft = mode === 'krafttraining'

  const reset = () => {
    setStep(0); setMode('fortime'); setExercises([])
    setMinutes(20); setName(''); setWarmup(null)
    setRestBetweenSets(90); setRestBetweenExercises(60)
  }

  const handleClose = () => { reset(); onClose() }

  const lastStep = stepCount - 1

  const handleNext = () => {
    if (step < lastStep) { setStep((s) => s + 1); return }

    const kraftCfg: KraftConfig | undefined = isKraft
      ? { exercises, restBetweenSets, restBetweenExercises }
      : undefined

    if (!isAdhoc && name.trim()) {
      saveCustomWorkout({
        id: crypto.randomUUID(),
        name: name.trim(),
        mode,
        minutes: isKraft ? 0 : minutes,
        exercises,
        createdAt: new Date().toISOString(),
        restBetweenSets:      isKraft ? restBetweenSets      : undefined,
        restBetweenExercises: isKraft ? restBetweenExercises : undefined,
      })
    }

    const m   = mode
    const min = isKraft ? 0 : minutes
    const w   = warmup ?? false
    reset()
    onClose()
    onStart(m, min, w, kraftCfg)
  }

  const canNext = (() => {
    if (isAdhoc && step === lastStep) return warmup !== null
    if (isKraft && step === 1) return exercises.length > 0
    return true
  })()

  const modeInfo = TIMER_LABELS[mode]

  const updateExercise = (id: string, patch: Partial<WizardExercise>) =>
    setExercises((prev) => prev.map((e) => e.id === id ? { ...e, ...patch } : e))

  const estimatedKraftMin = isKraft
    ? Math.ceil(
        exercises.reduce((acc, ex) => {
          const sets = ex.sets ?? 3
          return acc + sets * 1 + (sets - 1) * (restBetweenSets / 60)
        }, 0) + (exercises.length - 1) * (restBetweenExercises / 60),
      )
    : 0

  return (
    <WizardShell
      isOpen={isOpen}
      onClose={handleClose}
      title={isAdhoc ? 'Ad-hoc Timer' : 'Eigenes Workout'}
      stepCount={stepCount}
      currentStep={step}
      onBack={() => setStep((s) => s - 1)}
      onNext={handleNext}
      nextLabel={step < lastStep ? 'Weiter' : '▶ Start'}
      canNext={canNext}
    >
      {/* Step 0: Mode */}
      {step === 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Timer-Modus wählen
          </p>
          {TIMER_MODE_LIST.map((id) => {
            const m = TIMER_LABELS[id]
            return (
              <button
                key={id}
                onClick={() => setMode(id)}
                className="w-full flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all text-left"
                style={{
                  backgroundColor: mode === id ? `${m.color}18` : 'var(--color-bg-card)',
                  border: `1.5px solid ${mode === id ? m.color : 'transparent'}`,
                }}
              >
                <span className="text-2xl">{m.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-bold" style={{ color: mode === id ? m.color : 'var(--color-text)' }}>
                    {m.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    {m.desc}
                  </p>
                </div>
                {mode === id && (
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Step 1: Exercises */}
      {step === 1 && !isKraft && (
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Übungen</p>
          <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Optional — füge hinzu, was du vorhast
          </p>
          <ExerciseListEditor
            items={exercises}
            onChange={setExercises}
            placeholder="z. B. 10 Pull-ups, 20 Burpees…"
          />
        </div>
      )}

      {/* Step 1 (Kraft): Exercise editor with sets/reps/weight */}
      {step === 1 && isKraft && (
        <div className="space-y-3">
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>Übungen</p>
          <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
            Mindestens 1 Übung — Sätze, Reps und Gewicht pro Übung einstellen
          </p>

          {exercises.map((ex, i) => (
            <div
              key={ex.id}
              className="rounded-xl px-3 py-3 space-y-2.5"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              {/* Name row */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold w-5 text-center flex-shrink-0"
                  style={{ color: 'var(--color-text-muted)' }}>
                  {i + 1}
                </span>
                <span className="flex-1 text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {ex.name}
                </span>
                <button
                  onClick={() => setExercises((prev) => prev.filter((e) => e.id !== ex.id))}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-xs"
                  style={{ color: '#ef4444' }}
                >✕</button>
              </div>

              {/* Sätze + Reps */}
              <div className="flex items-center gap-4 pl-7">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase tracking-wider"
                    style={{ color: 'var(--color-text-muted)' }}>Sätze</span>
                  <MiniStepper
                    value={ex.sets ?? 3}
                    onChange={(v) => updateExercise(ex.id, { sets: v })}
                    min={1} max={10}
                  />
                </div>
                <span style={{ color: 'var(--color-text-muted)' }}>×</span>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] uppercase tracking-wider"
                    style={{ color: 'var(--color-text-muted)' }}>Reps</span>
                  <MiniStepper
                    value={ex.rep_count ?? 8}
                    onChange={(v) => updateExercise(ex.id, { rep_count: v })}
                    min={1} max={30}
                  />
                </div>
              </div>

              {/* Gewicht chips */}
              <div className="flex gap-2 pl-7">
                {(['leicht', 'mittel', 'schwer'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => updateExercise(ex.id, {
                      weight_level: ex.weight_level === w ? undefined : w,
                    })}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: ex.weight_level === w ? '#10B98120' : 'var(--color-bg-elevated)',
                      color: ex.weight_level === w ? '#10B981' : 'var(--color-text-muted)',
                    }}
                  >
                    {w.charAt(0).toUpperCase() + w.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Add exercise input */}
          <ExerciseListEditor
            items={[]}
            onChange={(newItems) => {
              if (newItems.length > 0) {
                setExercises((prev) => [
                  ...prev,
                  { ...newItems[newItems.length - 1], sets: 3, rep_count: 8 },
                ])
              }
            }}
            placeholder="Übung hinzufügen…"
          />
        </div>
      )}

      {/* Step 2 (Standard): Duration + name */}
      {step === 2 && !isKraft && (
        <div className="space-y-4">
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{
              backgroundColor: `${modeInfo.color}12`,
              border: `1px solid ${modeInfo.color}35`,
            }}
          >
            <span className="text-xl">{modeInfo.emoji}</span>
            <span className="font-bold text-sm" style={{ color: modeInfo.color }}>{modeInfo.name}</span>
            {exercises.length > 0 && (
              <span className="text-xs ml-auto" style={{ color: 'var(--color-text-muted)' }}>
                {exercises.length} Übung{exercises.length !== 1 ? 'en' : ''}
              </span>
            )}
          </div>

          <div className="rounded-xl px-4 py-4" style={{ backgroundColor: 'var(--color-bg-card)' }}>
            <p className="text-xs font-semibold mb-3 tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              DAUER
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMinutes((m) => Math.max(1, m - 1))}
                className="w-11 h-11 rounded-xl font-bold text-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text)' }}
              >−</button>
              <div className="flex-1 text-center">
                <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>{minutes}</span>
                <span className="text-sm font-medium ml-1.5" style={{ color: 'var(--color-text-muted)' }}>min</span>
              </div>
              <button
                onClick={() => setMinutes((m) => Math.min(120, m + 1))}
                className="w-11 h-11 rounded-xl font-bold text-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text)' }}
              >+</button>
            </div>
          </div>

          {!isAdhoc && (
            <div className="rounded-xl px-4 py-3" style={{ backgroundColor: 'var(--color-bg-card)' }}>
              <p className="text-xs font-semibold mb-2 tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                NAME <span className="font-normal">(optional, zum Speichern)</span>
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z. B. Monday AMRAP"
                className="w-full bg-transparent text-sm outline-none"
                style={{ color: 'var(--color-text)' }}
              />
            </div>
          )}
        </div>
      )}

      {/* Step 2 (Kraft): Rest config + summary */}
      {step === 2 && isKraft && (
        <div className="space-y-5">
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ backgroundColor: '#10B98112', border: '1px solid #10B98135' }}
          >
            <span className="text-xl">💪</span>
            <div>
              <span className="font-bold text-sm" style={{ color: '#10B981' }}>Krafttraining</span>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {exercises.length} Übungen · {exercises.reduce((a, e) => a + (e.sets ?? 3), 0)} Sätze
                {estimatedKraftMin > 0 && ` · ~${estimatedKraftMin} min`}
              </p>
            </div>
          </div>

          {/* Rest between sets */}
          <div className="rounded-xl px-4 py-4" style={{ backgroundColor: 'var(--color-bg-card)' }}>
            <p className="text-xs font-semibold mb-3 tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              PAUSE ZWISCHEN SÄTZEN
            </p>
            <div className="flex gap-2 flex-wrap">
              {REST_BETWEEN_SETS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setRestBetweenSets(s)}
                  className="px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: restBetweenSets === s ? '#10B981' : 'var(--color-bg-elevated)',
                    color: restBetweenSets === s ? 'white' : 'var(--color-text-muted)',
                  }}
                >
                  {s}s
                </button>
              ))}
            </div>
          </div>

          {/* Rest between exercises */}
          <div className="rounded-xl px-4 py-4" style={{ backgroundColor: 'var(--color-bg-card)' }}>
            <p className="text-xs font-semibold mb-3 tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              PAUSE ZWISCHEN ÜBUNGEN
            </p>
            <div className="flex gap-2 flex-wrap">
              {REST_BETWEEN_EXERCISE_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setRestBetweenExercises(s)}
                  className="px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: restBetweenExercises === s ? '#10B981' : 'var(--color-bg-elevated)',
                    color: restBetweenExercises === s ? 'white' : 'var(--color-text-muted)',
                  }}
                >
                  {s}s
                </button>
              ))}
            </div>
          </div>

          {!isAdhoc && (
            <div className="rounded-xl px-4 py-3" style={{ backgroundColor: 'var(--color-bg-card)' }}>
              <p className="text-xs font-semibold mb-2 tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                NAME <span className="font-normal">(optional, zum Speichern)</span>
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="z. B. Beine & Schultern"
                className="w-full bg-transparent text-sm outline-none"
                style={{ color: 'var(--color-text)' }}
              />
            </div>
          )}
        </div>
      )}

      {/* Step 3 (adhoc only): Warmup? */}
      {isAdhoc && step === 3 && (
        <div>
          <p className="text-lg font-black mb-2" style={{ color: 'var(--color-text)' }}>🔥 Warmup zuerst?</p>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            Ein kurzes Warmup senkt das Verletzungsrisiko und verbessert die Performance.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setWarmup(true)}
              className="flex-1 py-4 rounded-xl font-semibold text-base transition-all"
              style={{
                backgroundColor: warmup === true ? '#E8642A' : 'var(--color-bg-card)',
                color: warmup === true ? 'white' : 'var(--color-text)',
                border: `1.5px solid ${warmup === true ? '#E8642A' : 'transparent'}`,
              }}
            >
              🔥 Ja, Warmup
            </button>
            <button
              onClick={() => setWarmup(false)}
              className="flex-1 py-4 rounded-xl font-semibold text-base transition-all"
              style={{
                backgroundColor: warmup === false ? 'var(--color-bg-elevated)' : 'var(--color-bg-card)',
                color: warmup === false ? 'var(--color-text)' : 'var(--color-text-muted)',
                border: `1.5px solid ${warmup === false ? 'rgba(255,255,255,0.2)' : 'transparent'}`,
              }}
            >
              Nein, direkt starten
            </button>
          </div>
        </div>
      )}
    </WizardShell>
  )
}
