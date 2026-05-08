import { useState, useEffect, useMemo } from 'react'
import type { StretchingRoutine, StretchingExercise } from '../../hooks/useStretching'
import { useStretchingLogs } from '../../hooks/useStretchingLogs'
import { ExerciseIllustration } from './ExerciseIllustration'

const PILLAR_COLOR = '#7BC67E'
const SWITCH_DURATION = 5
const RING_RADIUS = 98
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

type Lang = 'de' | 'en' | 'es'
type Phase = 'config' | 'exercise' | 'switch' | 'rest' | 'done'
type Side = 'left' | 'right'

const T = {
  de: {
    of: 'von',
    done: 'Geschafft!',
    doneMsg: 'Du hast die Session abgeschlossen.',
    backToRoutines: 'Zurück zu Routinen',
    instructions: 'Anleitung',
    configure: 'Session konfigurieren',
    exerciseDuration: 'Übungsdauer',
    pauseDuration: 'Pausendauer',
    startSession: 'Session starten',
    sideSwitch: 'Seiten\nwechseln',
    leftSide: 'Linke Seite',
    rightSide: 'Rechte Seite',
    pause: 'Pause',
    endSession: 'Session beenden',
  },
  en: {
    of: 'of',
    done: 'Done!',
    doneMsg: 'You completed the session.',
    backToRoutines: 'Back to Routines',
    instructions: 'Instructions',
    configure: 'Configure Session',
    exerciseDuration: 'Exercise duration',
    pauseDuration: 'Rest duration',
    startSession: 'Start Session',
    sideSwitch: 'Switch\nSides',
    leftSide: 'Left Side',
    rightSide: 'Right Side',
    pause: 'Rest',
    endSession: 'End Session',
  },
  es: {
    of: 'de',
    done: '¡Listo!',
    doneMsg: 'Completaste la sesión.',
    backToRoutines: 'Volver a rutinas',
    instructions: 'Instrucciones',
    configure: 'Configurar sesión',
    exerciseDuration: 'Duración del ejercicio',
    pauseDuration: 'Duración del descanso',
    startSession: 'Iniciar sesión',
    sideSwitch: 'Cambiar\nlado',
    leftSide: 'Lado izquierdo',
    rightSide: 'Lado derecho',
    pause: 'Descanso',
    endSession: 'Finalizar sesión',
  },
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

interface Props {
  routine: StretchingRoutine
  exercises: StretchingExercise[]
  lang: Lang
  onFinish: () => void
}

export function GuidedSession({ routine, exercises, lang, onFinish }: Props) {
  const t = T[lang]
  const { addLog } = useStretchingLogs()
  const [startTime] = useState(() => Date.now())

  const orderedExercises = useMemo(
    () =>
      routine.exercise_ids
        .map((id) => exercises.find((e) => e.id === id))
        .filter((e): e is StretchingExercise => e !== undefined),
    [routine.exercise_ids, exercises],
  )

  const total = orderedExercises.length

  // Session config
  const [exerciseDuration, setExerciseDuration] = useState(30)
  const [pauseDuration, setPauseDuration] = useState(5)

  // Session state
  const [phase, setPhase] = useState<Phase>('config')
  const [side, setSide] = useState<Side>('left')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [paused, setPaused] = useState(false)

  // UI state
  const [showInfo, setShowInfo] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const current = orderedExercises[currentIndex]

  // Progress ring
  const phaseTotal = (() => {
    if (phase === 'switch') return SWITCH_DURATION
    if (phase === 'rest') return pauseDuration
    if (phase === 'exercise') return current?.bilateral ? Math.floor(exerciseDuration / 2) : exerciseDuration
    return exerciseDuration
  })()
  const ringProgress = phaseTotal > 0 ? timeLeft / phaseTotal : 0
  const dashOffset = RING_CIRCUMFERENCE * (1 - ringProgress)
  const ringColor = phase === 'switch' ? '#F59E0B' : phase === 'rest' ? '#60A5FA' : PILLAR_COLOR

  // Start session
  function startSession() {
    const first = orderedExercises[0]
    if (!first) return
    setCurrentIndex(0)
    setSide('left')
    setPhase('exercise')
    setTimeLeft(first.bilateral ? Math.floor(exerciseDuration / 2) : exerciseDuration)
    setPaused(false)
  }

  function jumpToExercise(idx: number) {
    const ex = orderedExercises[idx]
    if (!ex) return
    setCurrentIndex(idx)
    setSide('left')
    setPhase('exercise')
    setTimeLeft(ex.bilateral ? Math.floor(exerciseDuration / 2) : exerciseDuration)
    setPaused(false)
  }

  function finishSession() {
    setPhase('done')
    const durationMin = Math.round((Date.now() - startTime) / 60000)
    addLog.mutate({ routine_id: routine.id, duration_min: durationMin || 1 })
  }

  function goBack() {
    if (currentIndex > 0) {
      jumpToExercise(currentIndex - 1)
    } else {
      jumpToExercise(0)
    }
  }

  function goNext() {
    if (currentIndex < total - 1) {
      jumpToExercise(currentIndex + 1)
    } else {
      finishSession()
    }
  }

  // Timer
  useEffect(() => {
    if (paused || phase === 'config' || phase === 'done' || !current) return

    if (timeLeft <= 0) {
      if (phase === 'exercise' && current.bilateral && side === 'left') {
        setPhase('switch')
        setTimeLeft(SWITCH_DURATION)
      } else if (phase === 'switch') {
        setSide('right')
        setPhase('exercise')
        setTimeLeft(Math.floor(exerciseDuration / 2))
      } else if (phase === 'rest') {
        if (currentIndex < total - 1) {
          jumpToExercise(currentIndex + 1)
        } else {
          finishSession()
        }
      } else {
        // exercise done (non-bilateral or right side)
        if (pauseDuration > 0) {
          setPhase('rest')
          setTimeLeft(pauseDuration)
        } else if (currentIndex < total - 1) {
          jumpToExercise(currentIndex + 1)
        } else {
          finishSession()
        }
      }
      return
    }

    const id = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1))
    }, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, paused, phase, side, current?.id, current?.bilateral, exerciseDuration, pauseDuration, currentIndex, total])

  // ── Config screen ──────────────────────────────────────────────────────────
  if (phase === 'config') {
    return (
      <div className="space-y-5">
        <h3 className="text-lg font-bold text-[var(--color-text)]">{t.configure}</h3>

        {/* Exercise duration slider */}
        <div
          className="rounded-[var(--radius-md)] p-4 border border-white/5"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        >
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-sm font-medium text-[var(--color-text)]">{t.exerciseDuration}</span>
            <span className="text-xl font-black" style={{ color: PILLAR_COLOR }}>
              {exerciseDuration}s
            </span>
          </div>
          <input
            type="range"
            min={15}
            max={120}
            step={5}
            value={exerciseDuration}
            onChange={(e) => setExerciseDuration(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: PILLAR_COLOR }}
          />
          <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1.5">
            <span>15s</span>
            <span>120s</span>
          </div>
        </div>

        {/* Pause duration stepper */}
        <div
          className="rounded-[var(--radius-md)] p-4 border border-white/5"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-[var(--color-text)]">{t.pauseDuration}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPauseDuration((p) => Math.max(0, p - 1))}
              className="w-11 h-11 rounded-full bg-white/10 text-xl font-bold text-[var(--color-text)] flex items-center justify-center active:bg-white/20"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <span className="text-3xl font-black text-[var(--color-text)]">{pauseDuration}</span>
              <span className="text-sm text-[var(--color-text-muted)] ml-1">s</span>
            </div>
            <button
              onClick={() => setPauseDuration((p) => Math.min(30, p + 1))}
              className="w-11 h-11 rounded-full bg-white/10 text-xl font-bold text-[var(--color-text)] flex items-center justify-center active:bg-white/20"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={startSession}
          className="w-full py-4 rounded-[var(--radius-md)] font-bold text-white text-base transition-opacity active:opacity-80"
          style={{ backgroundColor: PILLAR_COLOR }}
        >
          {t.startSession}
        </button>
      </div>
    )
  }

  // ── Done screen ────────────────────────────────────────────────────────────
  if (phase === 'done') {
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

  // ── Main session layout ────────────────────────────────────────────────────
  return (
    <div className="flex flex-col select-none">
      {/* Header: ✕  8 von 13  ≡ */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onFinish}
          className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-[var(--color-text-muted)] hover:bg-white/15 transition-colors"
          aria-label="Session beenden"
        >
          ✕
        </button>
        <span className="text-sm font-semibold text-[var(--color-text-muted)]">
          {currentIndex + 1} {t.of} {total}
        </span>
        <button
          onClick={() => setShowMenu((v) => !v)}
          className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-[var(--color-text-muted)] hover:bg-white/15 transition-colors"
          aria-label="Menü"
        >
          ≡
        </button>
      </div>

      {/* Menu overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setShowMenu(false)}
        >
          <div
            className="absolute top-16 right-4 rounded-[var(--radius-md)] p-2 min-w-[180px] border border-white/10"
            style={{ backgroundColor: 'var(--color-bg-card)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setShowMenu(false); onFinish() }}
              className="w-full text-left px-4 py-3 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] rounded-lg hover:bg-white/5 transition-colors"
            >
              {t.endSession}
            </button>
          </div>
        </div>
      )}

      {/* Large exercise circle with progress ring */}
      <div className="flex flex-col items-center">
        <div className="relative w-52 h-52">
          {/* SVG progress ring */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 208 208"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Track */}
            <circle
              cx="104"
              cy="104"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="8"
            />
            {/* Progress arc */}
            <circle
              cx="104"
              cy="104"
              r={RING_RADIUS}
              fill="none"
              stroke={ringColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
            />
          </svg>

          {/* Inner illustration / switch screen */}
          <div className="absolute inset-3 rounded-full overflow-hidden">
            {phase === 'switch' ? (
              <div
                className="w-full h-full flex flex-col items-center justify-center text-white text-center"
                style={{ backgroundColor: '#F59E0B' }}
              >
                <span className="text-4xl mb-1">⇄</span>
                <span className="text-sm font-bold leading-tight">Seiten</span>
                <span className="text-sm font-bold leading-tight">wechseln</span>
              </div>
            ) : phase === 'rest' ? (
              <div
                className="w-full h-full flex flex-col items-center justify-center text-white text-center"
                style={{ backgroundColor: '#3B82F6' }}
              >
                <span className="text-4xl mb-1">⏱</span>
                <span className="text-sm font-bold">{t.pause}</span>
              </div>
            ) : (
              <ExerciseIllustration
                imageKey={current?.image_key ?? null}
                muscleGroup={current?.muscle_group ?? ''}
              />
            )}
          </div>
        </div>

        {/* Bilateral side indicator */}
        {current?.bilateral && phase !== 'switch' && phase !== 'rest' && (
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-base" style={{ color: PILLAR_COLOR }}>⇄</span>
            <span className="text-xs font-medium text-[var(--color-text-muted)]">
              {side === 'left' ? t.leftSide : t.rightSide}
            </span>
          </div>
        )}

        {/* Exercise name + info button */}
        {phase !== 'rest' && (
          <div className="flex items-center gap-2 mt-4">
            <h2 className="text-xl font-bold text-[var(--color-text)] text-center">
              {current?.name}
            </h2>
            {(current?.instructions?.length ?? 0) > 0 && (
              <button
                onClick={() => setShowInfo(true)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs text-[var(--color-text-muted)] hover:bg-white/20 transition-colors shrink-0"
                aria-label={t.instructions}
              >
                ℹ
              </button>
            )}
          </div>
        )}

        {/* Large timer */}
        <div className="mt-5 mb-6">
          <span
            className="font-mono font-black leading-none tabular-nums"
            style={{ fontSize: 'clamp(52px, 16vw, 72px)', color: 'var(--color-text)' }}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Controls: ⏮  ⏸/▶  ⏭ */}
      <div
        className="flex items-center justify-around px-4 py-4 rounded-[var(--radius-md)] border border-white/5"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <button
          onClick={goBack}
          className="w-14 h-14 rounded-full bg-white/8 flex items-center justify-center text-2xl text-[var(--color-text-muted)] active:bg-white/15 transition-colors"
          aria-label="Zurück"
        >
          ⏮
        </button>
        <button
          onClick={() => setPaused((p) => !p)}
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white active:opacity-80 transition-opacity"
          style={{ backgroundColor: ringColor }}
          aria-label={paused ? 'Fortsetzen' : 'Pausieren'}
        >
          {paused ? '▶' : '⏸'}
        </button>
        <button
          onClick={goNext}
          className="w-14 h-14 rounded-full bg-white/8 flex items-center justify-center text-2xl text-[var(--color-text-muted)] active:bg-white/15 transition-colors"
          aria-label="Weiter"
        >
          ⏭
        </button>
      </div>

      {/* Instructions overlay */}
      {showInfo && current && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/60"
          onClick={() => setShowInfo(false)}
        >
          <div
            className="w-full max-h-[60vh] overflow-y-auto rounded-t-2xl p-6"
            style={{ backgroundColor: 'var(--color-bg-card)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[var(--color-text)]">{current.name}</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[var(--color-text-muted)]"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
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
        </div>
      )}
    </div>
  )
}
