import { useState } from 'react'
import { WizardShell } from '../wizard/WizardShell'
import { ExerciseListEditor } from '../wizard/ExerciseListEditor'
import type { WizardExercise } from '../../lib/customWorkouts'
import { saveCustomWorkout } from '../../lib/customWorkouts'

type TimerMode = 'fortime' | 'amrap' | 'emom' | 'tabata'

const MODES = [
  { id: 'fortime' as TimerMode, label: 'For Time',  emoji: '⏱', desc: 'So schnell wie möglich',       color: '#E8642A' },
  { id: 'amrap'   as TimerMode, label: 'AMRAP',      emoji: '🔁', desc: 'So viele Runden wie möglich',  color: '#F59E0B' },
  { id: 'emom'    as TimerMode, label: 'EMOM',       emoji: '📶', desc: 'Jede Minute eine Runde',        color: '#3B82F6' },
  { id: 'tabata'  as TimerMode, label: 'Tabata',     emoji: '⚡', desc: '20s Arbeit · 10s Pause',        color: '#8B5CF6' },
]

interface Props {
  isOpen: boolean
  onClose: () => void
  onStart: (mode: TimerMode, minutes: number) => void
}

export function FreeTimerWizard({ isOpen, onClose, onStart }: Props) {
  const [step,      setStep]      = useState(0)
  const [mode,      setMode]      = useState<TimerMode>('fortime')
  const [exercises, setExercises] = useState<WizardExercise[]>([])
  const [minutes,   setMinutes]   = useState(20)
  const [name,      setName]      = useState('')

  const reset = () => {
    setStep(0); setMode('fortime'); setExercises([])
    setMinutes(20); setName('')
  }

  const handleClose = () => { reset(); onClose() }

  const handleNext = () => {
    if (step < 2) { setStep((s) => s + 1); return }
    if (name.trim()) {
      saveCustomWorkout({
        id: crypto.randomUUID(),
        name: name.trim(),
        mode,
        minutes,
        exercises,
        createdAt: new Date().toISOString(),
      })
    }
    const m = mode
    const min = minutes
    reset()
    onClose()
    onStart(m, min)
  }

  const modeInfo = MODES.find((m) => m.id === mode)!

  return (
    <WizardShell
      isOpen={isOpen}
      onClose={handleClose}
      title="Eigenes Workout"
      stepCount={3}
      currentStep={step}
      onBack={() => setStep((s) => s - 1)}
      onNext={handleNext}
      nextLabel={step === 2 ? '▶ Start' : 'Weiter'}
    >
      {/* Step 0: Mode selection */}
      {step === 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Timer-Modus wählen
          </p>
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className="w-full flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all text-left"
              style={{
                backgroundColor: mode === m.id ? `${m.color}18` : 'var(--color-bg-card)',
                border: `1.5px solid ${mode === m.id ? m.color : 'transparent'}`,
              }}
            >
              <span className="text-2xl">{m.emoji}</span>
              <div className="flex-1">
                <p
                  className="text-sm font-bold"
                  style={{ color: mode === m.id ? m.color : 'var(--color-text)' }}
                >
                  {m.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {m.desc}
                </p>
              </div>
              {mode === m.id && (
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }} />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Step 1: Exercise list */}
      {step === 1 && (
        <div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
            Übungen
          </p>
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

      {/* Step 2: Config + name */}
      {step === 2 && (
        <div className="space-y-4">
          {/* Mode badge */}
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{
              backgroundColor: `${modeInfo.color}12`,
              border: `1px solid ${modeInfo.color}35`,
            }}
          >
            <span className="text-xl">{modeInfo.emoji}</span>
            <span className="font-bold text-sm" style={{ color: modeInfo.color }}>
              {modeInfo.label}
            </span>
            {exercises.length > 0 && (
              <span className="text-xs ml-auto" style={{ color: 'var(--color-text-muted)' }}>
                {exercises.length} Übung{exercises.length !== 1 ? 'en' : ''}
              </span>
            )}
          </div>

          {/* Duration stepper */}
          <div
            className="rounded-xl px-4 py-4"
            style={{ backgroundColor: 'var(--color-bg-card)' }}
          >
            <p className="text-xs font-semibold mb-3 tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              DAUER
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMinutes((m) => Math.max(5, m - 5))}
                className="w-11 h-11 rounded-xl font-bold text-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text)' }}
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>
                  {minutes}
                </span>
                <span className="text-sm font-medium ml-1.5" style={{ color: 'var(--color-text-muted)' }}>
                  min
                </span>
              </div>
              <button
                onClick={() => setMinutes((m) => Math.min(90, m + 5))}
                className="w-11 h-11 rounded-xl font-bold text-xl flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text)' }}
              >
                +
              </button>
            </div>
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
              placeholder="z. B. Monday AMRAP"
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: 'var(--color-text)' }}
            />
          </div>
        </div>
      )}
    </WizardShell>
  )
}
