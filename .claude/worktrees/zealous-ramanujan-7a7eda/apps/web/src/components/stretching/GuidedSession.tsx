import { useState, useEffect, useCallback } from 'react'
import type { StretchingRoutine, StretchingExercise } from '../../hooks/useStretching'
import { useStretchingLogs } from '../../hooks/useStretchingLogs'

const PILLAR_COLOR = '#7BC67E'

const T = {
  de: {
    exercise: 'Übung',
    of: 'von',
    next: 'Weiter →',
    finish: 'Abschließen',
    skip: 'Überspringen',
    done: 'Geschafft!',
    doneMsg: 'Du hast die Session abgeschlossen.',
    backToRoutines: 'Zurück zu Routinen',
    instructions: 'Anleitung',
    paused: 'Pausiert',
    resume: 'Fortsetzen',
    pause: 'Pausieren',
  },
  en: {
    exercise: 'Exercise',
    of: 'of',
    next: 'Next →',
    finish: 'Finish',
    skip: 'Skip',
    done: 'Done!',
    doneMsg: 'You completed the session.',
    backToRoutines: 'Back to Routines',
    instructions: 'Instructions',
    paused: 'Paused',
    resume: 'Resume',
    pause: 'Pause',
  },
  es: {
    exercise: 'Ejercicio',
    of: 'de',
    next: 'Siguiente →',
    finish: 'Finalizar',
    skip: 'Saltar',
    done: '¡Listo!',
    doneMsg: 'Completaste la sesión.',
    backToRoutines: 'Volver a rutinas',
    instructions: 'Instrucciones',
    paused: 'Pausado',
    resume: 'Reanudar',
    pause: 'Pausar',
  },
}

type Lang = 'de' | 'en' | 'es'

interface Props {
  routine: StretchingRoutine
  exercises: StretchingExercise[]
  lang: Lang
  onFinish: () => void
}

export function GuidedSession({ routine, exercises, lang, onFinish }: Props) {
  const t = T[lang]
  const { addLog } = useStretchingLogs()

  const orderedExercises = routine.exercise_ids
    .map((id) => exercises.find((e) => e.id === id))
    .filter((e): e is StretchingExercise => e !== undefined)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(orderedExercises[0]?.duration_sec ?? 30)
  const [paused, setPaused] = useState(false)
  const [finished, setFinished] = useState(false)
  const [startTime] = useState(() => Date.now())

  const current = orderedExercises[currentIndex]
  const total = orderedExercises.length
  const progress = total > 0 ? ((currentIndex) / total) * 100 : 0

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) {
      const next = orderedExercises[currentIndex + 1]
      setCurrentIndex((i) => i + 1)
      setTimeLeft(next?.duration_sec ?? 30)
      setPaused(false)
    } else {
      setFinished(true)
      const durationMin = Math.round((Date.now() - startTime) / 60000)
      addLog.mutate({ routine_id: routine.id, duration_min: durationMin || 1 })
    }
  }, [currentIndex, total, orderedExercises, addLog, routine.id, startTime])

  useEffect(() => {
    if (paused || finished || !current) return
    if (timeLeft <= 0) {
      goNext()
      return
    }
    const id = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [timeLeft, paused, finished, current, goNext])

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
        <div className="text-6xl">🎉</div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)]">{t.done}</h2>
          <p className="text-[var(--color-text-muted)] mt-1">{t.doneMsg}</p>
        </div>
        <div
          className="rounded-2xl px-6 py-3 text-sm"
          style={{ backgroundColor: `${PILLAR_COLOR}22`, color: PILLAR_COLOR }}
        >
          {routine.name} · {routine.duration_min} min
        </div>
        <button
          onClick={onFinish}
          className="w-full max-w-xs py-4 rounded-[var(--radius-md)] font-bold text-white"
          style={{ backgroundColor: PILLAR_COLOR }}
        >
          {t.backToRoutines}
        </button>
      </div>
    )
  }

  if (!current) return null

  const circumference = 2 * Math.PI * 44
  const strokeDash = circumference - (timeLeft / current.duration_sec) * circumference

  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
          <span>{t.exercise} {currentIndex + 1} {t.of} {total}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, backgroundColor: PILLAR_COLOR }}
          />
        </div>
      </div>

      {/* Timer circle */}
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative w-28 h-28">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="44" fill="none"
              stroke={PILLAR_COLOR} strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-[var(--color-text)]">{timeLeft}</span>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-[var(--color-text)]">{current.name}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5 capitalize">
            {current.muscle_group.replace('_', ' ')}
          </p>
        </div>
      </div>

      {/* Instructions */}
      {current.instructions.length > 0 && (
        <div
          className="rounded-[var(--radius-md)] p-4 border border-white/5"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide mb-2"
            style={{ color: PILLAR_COLOR }}>
            {t.instructions}
          </p>
          <div className="space-y-1.5">
            {current.instructions.map((step, i) => (
              <div key={i} className="flex gap-2 text-sm text-[var(--color-text-muted)]">
                <span className="shrink-0 font-bold text-xs mt-0.5" style={{ color: PILLAR_COLOR }}>
                  {i + 1}.
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-3">
        <button
          onClick={() => setPaused((p) => !p)}
          className="flex-1 py-3 rounded-[var(--radius-md)] text-sm font-semibold border border-white/10 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          {paused ? t.resume : t.pause}
        </button>
        <button
          onClick={goNext}
          className="flex-[2] py-3 rounded-[var(--radius-md)] text-sm font-bold text-white transition-opacity active:opacity-80"
          style={{ backgroundColor: PILLAR_COLOR }}
        >
          {currentIndex < total - 1 ? t.next : t.finish}
        </button>
      </div>
    </div>
  )
}
