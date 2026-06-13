import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'
import { getWodTypeLabel } from '../../lib/wodTypeLabels'
import { useWodHistory } from '../../hooks/useWodHistory'
import { useSessionStore } from '../../store/sessionStore'
import { CountdownOverlay } from '../shared/CountdownOverlay'
import { NextExercisePreview } from '../shared/NextExercisePreview'
import type { WizardExercise } from '../../lib/customWorkouts'

type TimerMode = 'fortime' | 'amrap' | 'emom' | 'tabata'

interface Props {
  initialMode?: TimerMode
  initialMinutes?: number
  onComplete?: () => void
  onShowHistory?: () => void
  bilateral?: boolean
  adHocLog?: boolean
  exercises?: WizardExercise[]
  warmupPending?: boolean
  workoutName?: string
  initialTabataWork?: number
  initialTabataRest?: number
  initialTabataRounds?: number
  initialEmomInterval?: number
  initialEmomRounds?: number
}

interface TickData {
  elapsed: number
  remaining: number
  phase: 'work' | 'rest'
  interval: number
}

const MODE_COLOR: Record<TimerMode, string> = {
  fortime: '#E8642A',
  amrap:   '#F59E0B',
  emom:    '#3B82F6',
  tabata:  '#8B5CF6',
}

const MODE_TO_WOD_TYPE: Record<TimerMode, string> = {
  fortime: 'ForTime',
  amrap:   'AMRAP',
  emom:    'EMOM',
  tabata:  'Tabata',
}

function formatMs(ms: number): string {
  const totalSec = Math.floor(Math.abs(ms) / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

let audioCtx: AudioContext | null = null

function beep(type: 'start' | 'interval' | 'end' | 'countdown') {
  if ('vibrate' in navigator) {
    if (type === 'end') navigator.vibrate([500, 100, 500])
    else if (type === 'interval') navigator.vibrate([200, 100, 200])
  }
  try {
    if (!audioCtx) audioCtx = new AudioContext()
    if (audioCtx.state === 'suspended') void audioCtx.resume()
    const osc  = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.type = 'sine'
    const t = audioCtx.currentTime
    if (type === 'countdown') {
      osc.frequency.value = 880
      gain.gain.setValueAtTime(0.55, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12)
      osc.start(t)
      osc.stop(t + 0.12)
    } else {
      osc.frequency.value = type === 'end' ? 880 : type === 'interval' ? 660 : 440
      gain.gain.setValueAtTime(0.8, t)
      gain.gain.exponentialRampToValueAtTime(0.001, t + (type === 'end' ? 1.0 : 0.4))
      osc.start(t)
      osc.stop(t + (type === 'end' ? 1.0 : 0.4))
    }
  } catch {
    // Audio not available
  }
}

function Stepper({
  label, value, onChange, min, max, unit,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  unit?: string
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">{label}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full bg-white/10 text-[var(--color-text)] font-bold flex items-center justify-center active:bg-white/20"
        >
          −
        </button>
        <div className="text-center min-w-[3rem]">
          <span className="text-2xl font-bold text-[var(--color-text)]">{value}</span>
          {unit && <span className="text-xs text-[var(--color-text-muted)] ml-0.5">{unit}</span>}
        </div>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-full bg-white/10 text-[var(--color-text)] font-bold flex items-center justify-center active:bg-white/20"
        >
          +
        </button>
      </div>
    </div>
  )
}

export function TimerView({
  initialMode, initialMinutes, onComplete, onShowHistory: _onShowHistory, bilateral, adHocLog, exercises,
  warmupPending, workoutName,
  initialTabataWork, initialTabataRest, initialTabataRounds,
  initialEmomInterval, initialEmomRounds,
}: Props) {
  const autoStart = !!initialMode

  const [mode, setMode]           = useState<TimerMode>(initialMode ?? 'fortime')
  const [minutes, setMinutes]     = useState(initialMinutes ?? 20)  // AMRAP total time

  // EMOM config
  const [emomInterval, setEmomInterval] = useState(initialEmomInterval ?? 1)
  const [emomRounds,   setEmomRounds]   = useState(initialEmomRounds   ?? 10)
  // Tabata config
  const [tabataWork,   setTabataWork]   = useState(initialTabataWork   ?? 20)
  const [tabataRest,   setTabataRest]   = useState(initialTabataRest   ?? 10)
  const [tabataRounds, setTabataRounds] = useState(initialTabataRounds ?? 8)
  // ForTime cap (null = no cap, just count up)
  const [forTimeCap,   setForTimeCap]   = useState<number | null>(null)

  const [isRunning, setIsRunning] = useState(false)
  const [isPaused,  setIsPaused]  = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const [tick, setTick]           = useState<TickData>({ elapsed: 0, remaining: 0, phase: 'work', interval: 1 })
  const [isComplete, setIsComplete] = useState(false)
  const [showSideSwitch, setShowSideSwitch] = useState(false)
  const sideSwitchShownRef = useRef(false)

  const workerRef = useRef<Worker | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const wakeLockRef = useRef<{ release: () => Promise<void> } | null>(null)
  const autoStartedRef = useRef(false)

  const navigate          = useNavigate()
  const { addEntry }      = useWodHistory()
  const loggedRef         = useRef(false)
  const finalElapsedRef   = useRef(0)
  const tickRef           = useRef(tick)
  tickRef.current         = tick
  const setSessionActive  = useSessionStore((s) => s.setSessionActive)

  useEffect(() => {
    const worker = new Worker('/timer.worker.js')

    worker.onmessage = (e: MessageEvent<{ type: string } & Partial<TickData> & { beepType?: string }>) => {
      const { type } = e.data
      if (type === 'tick') {
        setTick({
          elapsed:   e.data.elapsed   ?? 0,
          remaining: e.data.remaining ?? 0,
          phase:     e.data.phase     ?? 'work',
          interval:  e.data.interval  ?? 1,
        })
      } else if (type === 'complete') {
        finalElapsedRef.current = tickRef.current.elapsed
        setIsRunning(false)
        setIsComplete(true)
        onCompleteRef.current?.()
      } else if (type === 'beep') {
        beep(e.data.beepType as 'start' | 'interval' | 'end' | 'countdown')
      } else if (type === 'reset') {
        setTick({ elapsed: 0, remaining: 0, phase: 'work', interval: 1 })
      }
    }

    workerRef.current = worker
    return () => worker.terminate()
  }, [])

  // Reset displayed tick when config changes (not while running/paused/complete)
  useEffect(() => {
    if (isRunning || isPaused || isComplete) return
    let initialRemaining: number
    if (mode === 'tabata')      initialRemaining = (tabataWork + tabataRest) * 1000 * tabataRounds
    else if (mode === 'emom')   initialRemaining = emomInterval * 60_000 * emomRounds
    else if (mode === 'fortime') initialRemaining = (forTimeCap ?? 0) * 60_000
    else                        initialRemaining = minutes * 60_000
    setTick({ elapsed: 0, remaining: initialRemaining, phase: 'work', interval: 1 })
    setIsComplete(false)
  }, [mode, minutes, tabataWork, tabataRest, tabataRounds, emomInterval, emomRounds, forTimeCap, isRunning, isPaused, isComplete])

  // Bilateral side-switch: show overlay at halfway point (countdown modes only)
  useEffect(() => {
    if (!bilateral || !isRunning || mode === 'fortime' || sideSwitchShownRef.current) return
    let durationMs: number
    if (mode === 'tabata')    durationMs = (tabataWork + tabataRest) * 1000 * tabataRounds
    else if (mode === 'emom') durationMs = emomInterval * 60_000 * emomRounds
    else                      durationMs = minutes * 60_000
    const halfMs = durationMs / 2
    if (tick.remaining > 0 && tick.remaining <= halfMs) {
      sideSwitchShownRef.current = true
      setShowSideSwitch(true)
      const id = window.setTimeout(() => setShowSideSwitch(false), 3000)
      return () => clearTimeout(id)
    }
  }, [bilateral, isRunning, mode, minutes, tabataWork, tabataRest, tabataRounds, emomInterval, emomRounds, tick.remaining])

  // Reset side-switch flag on new run
  useEffect(() => {
    if (!isRunning) sideSwitchShownRef.current = false
  }, [isRunning])

  // Auto-start when initialMode is provided; waits for warmup to finish if warmupPending
  useEffect(() => {
    if (autoStart && !warmupPending && !autoStartedRef.current) {
      autoStartedRef.current = true
      setShowCountdown(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warmupPending])

  // Session active: block accidental swipe-navigation while timer is running/paused
  useEffect(() => {
    setSessionActive(isRunning || isPaused || isComplete)
    return () => setSessionActive(false)
  }, [isRunning, isPaused, isComplete, setSessionActive])

  // Ad-hoc history logging: uses ref so elapsed value is always current at fire time
  useEffect(() => {
    console.log('[TimerView] log-effect fired', JSON.stringify({ adHocLog, isComplete, logged: loggedRef.current, workoutName, mode }))
    if (!adHocLog || !isComplete || loggedRef.current) return
    loggedRef.current = true
    addEntry.mutate({
      wod_name: workoutName ?? `Ad-hoc ${MODE_TO_WOD_TYPE[mode]}`,
      score_type: 'time',
      score_value: formatMs(finalElapsedRef.current > 0 ? finalElapsedRef.current : tickRef.current.elapsed),
      exercises: exercises && exercises.length > 0 ? exercises : undefined,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete])

  // Wake Lock: keep screen on while timer is running
  useEffect(() => {
    type WakeLockNav = Navigator & { wakeLock?: { request(t: string): Promise<{ release(): Promise<void> }> } }
    const nav = navigator as WakeLockNav
    if (!nav.wakeLock) return
    if (isRunning) {
      nav.wakeLock.request('screen')
        .then(s => { wakeLockRef.current = s })
        .catch(() => {})
    } else {
      wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
    return () => {
      wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
  }, [isRunning])

  const startTimer = useCallback(() => {
    let durationMs: number
    const workerConfig: Record<string, number> = {}

    if (mode === 'tabata') {
      durationMs = (tabataWork + tabataRest) * 1000 * tabataRounds
      workerConfig.tabataWorkMs  = tabataWork  * 1000
      workerConfig.tabataRestMs  = tabataRest  * 1000
      workerConfig.tabataRounds  = tabataRounds
    } else if (mode === 'emom') {
      const intervalMs = emomInterval * 60_000
      durationMs = intervalMs * emomRounds
      workerConfig.emomIntervalMs = intervalMs
    } else if (mode === 'fortime') {
      durationMs = (forTimeCap ?? 0) * 60_000
    } else {
      durationMs = minutes * 60_000
    }

    workerRef.current?.postMessage({ type: 'start', mode, durationMs, ...workerConfig })
    setIsRunning(true)
    setIsPaused(false)
    setIsComplete(false)
  }, [mode, minutes, tabataWork, tabataRest, tabataRounds, emomInterval, emomRounds, forTimeCap])

  const handleStart = useCallback(() => {
    setShowCountdown(true)
  }, [])

  const handlePause = useCallback(() => {
    workerRef.current?.postMessage({ type: 'pause' })
    setIsRunning(false)
    setIsPaused(true)
  }, [])

  const handleResume = useCallback(() => {
    workerRef.current?.postMessage({ type: 'resume' })
    setIsRunning(true)
    setIsPaused(false)
  }, [])

  const handleReset = useCallback(() => {
    workerRef.current?.postMessage({ type: 'reset' })
    setIsRunning(false)
    setIsPaused(false)
    setIsComplete(false)
    loggedRef.current = false
  }, [])

  const handleStop = useCallback(() => {
    // ForTime: manually stop (save the time)
    workerRef.current?.postMessage({ type: 'pause' })
    setIsRunning(false)
    setIsPaused(true)
    setIsComplete(true)
  }, [])

  const lang       = useAuthStore((s) => s.profile?.language ?? 'de')
  const modeColor  = MODE_COLOR[mode]
  const modeLabel  = (m: TimerMode) => getWodTypeLabel(MODE_TO_WOD_TYPE[m], lang)
  const isForTimeWithCap = mode === 'fortime' && forTimeCap !== null
  const displayMs  = (mode === 'fortime' && !isForTimeWithCap) ? tick.elapsed : tick.remaining
  const isTabata   = mode === 'tabata'
  const phaseColor = tick.phase === 'rest' ? '#3B82F6' : modeColor

  // Current/next exercise tracking for EMOM and Tabata
  const hasExercises = (exercises?.length ?? 0) > 0
  const currentExIdx = hasExercises ? (tick.interval - 1) % exercises!.length : 0
  const nextExIdx    = hasExercises ? tick.interval % exercises!.length : 0
  const currentExName = hasExercises ? exercises![currentExIdx]?.name : undefined
  const nextExName    = hasExercises ? exercises![nextExIdx]?.name : undefined

  let showNextExercise = false
  if ((isRunning || isPaused) && hasExercises) {
    if (mode === 'emom') {
      const emomIntervalMs = emomInterval * 60_000
      const timeLeftInInterval = tick.remaining - (emomRounds - tick.interval) * emomIntervalMs
      showNextExercise = timeLeftInInterval <= 10_000 && tick.interval < emomRounds
    } else if (isTabata) {
      const cycleMs = (tabataWork + tabataRest) * 1_000
      if (tick.phase === 'work') {
        const timeLeftInWork = tick.remaining - (tabataRounds - tick.interval) * cycleMs - tabataRest * 1_000
        showNextExercise = timeLeftInWork <= 10_000 && tick.interval < tabataRounds
      } else {
        // Rest phase — entire rest serves as preview for next exercise
        showNextExercise = tick.interval < tabataRounds
      }
    }
  }

  if (isComplete) {
    const isDe = lang === 'de'
    const heading = isDe ? 'Gut gemacht!' : 'Well done!'
    const finishedPrefix = isDe ? 'Abgeschlossen in' : 'Finished in'
    const scoreText = mode === 'fortime'
      ? `${finishedPrefix} ${formatMs(tick.elapsed)}`
      : mode === 'emom'
      ? `${emomRounds} Intervals · ${formatMs(tick.elapsed)}`
      : mode === 'tabata'
      ? `${tabataRounds} Rounds · ${formatMs(tick.elapsed)}`
      : formatMs(tick.elapsed)

    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <p style={{ fontSize: 64, lineHeight: 1 }}>🎉</p>
        <div>
          <p className="text-2xl font-black" style={{ color: '#10B981' }}>{heading}</p>
          {workoutName && (
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>{workoutName}</p>
          )}
        </div>
        <p className="font-mono font-bold text-xl" style={{ color: 'var(--color-text)' }}>{scoreText}</p>
        <div className="flex flex-col gap-3 w-full mt-2">
          <button
            onClick={() => navigate('/home')}
            className="py-3.5 rounded-2xl font-bold text-base text-white"
            style={{ backgroundColor: '#E8642A' }}
          >
            {isDe ? 'Zurück zu Mein Tag' : 'Back to My Day'}
          </button>
          <button
            onClick={() => navigate('/history')}
            className="py-2.5 rounded-2xl font-semibold text-sm"
            style={{ backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }}
          >
            {isDe ? 'Verlauf anzeigen' : 'View History'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <CountdownOverlay
        isOpen={showCountdown}
        onComplete={() => { setShowCountdown(false); startTimer() }}
      />

      {/* Mode selector */}
      {!autoStart && !isRunning && !isPaused && (
        <div className="w-full grid grid-cols-4 gap-1.5 bg-white/5 rounded-xl p-1">
          {(Object.keys(MODE_COLOR) as TimerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setIsComplete(false) }}
              className={`py-2 rounded-lg text-xs font-semibold transition-colors ${
                mode === m
                  ? 'bg-[#E8642A] text-white'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {modeLabel(m)}
            </button>
          ))}
        </div>
      )}

      {/* Config section — shown before start */}
      {!autoStart && !isRunning && !isPaused && (
        <div className="w-full rounded-xl bg-white/5 p-4 space-y-4">

          {/* AMRAP: total time */}
          {mode === 'amrap' && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">Gesamtzeit</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMinutes((m) => Math.max(1, m - 1))}
                  className="w-10 h-10 rounded-full bg-white/10 text-[var(--color-text)] text-xl font-bold flex items-center justify-center active:bg-white/20"
                >−</button>
                <div className="text-center min-w-[80px]">
                  <p className="text-3xl font-bold text-[var(--color-text)]">{minutes}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">min</p>
                </div>
                <button
                  onClick={() => setMinutes((m) => Math.min(120, m + 1))}
                  className="w-10 h-10 rounded-full bg-white/10 text-[var(--color-text)] text-xl font-bold flex items-center justify-center active:bg-white/20"
                >+</button>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">Zählt rückwärts – so viele Runden wie möglich</p>
            </div>
          )}

          {/* ForTime: optional time cap */}
          {mode === 'fortime' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text)]">Zeit-Cap</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {forTimeCap !== null ? 'Timer stoppt automatisch' : 'Zählt aufwärts – stoppe wenn fertig'}
                  </p>
                </div>
                <button
                  onClick={() => setForTimeCap((fc) => fc === null ? 20 : null)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                  style={
                    forTimeCap !== null
                      ? { backgroundColor: modeColor, color: 'white' }
                      : { backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--color-text-muted)' }
                  }
                >
                  {forTimeCap !== null ? 'An' : 'Aus'}
                </button>
              </div>
              {forTimeCap !== null && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setForTimeCap((c) => Math.max(1, (c ?? 20) - 1))}
                    className="w-10 h-10 rounded-full bg-white/10 text-[var(--color-text)] text-xl font-bold flex items-center justify-center active:bg-white/20"
                  >−</button>
                  <div className="text-center min-w-[80px]">
                    <p className="text-3xl font-bold text-[var(--color-text)]">{forTimeCap}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">min</p>
                  </div>
                  <button
                    onClick={() => setForTimeCap((c) => Math.min(120, (c ?? 20) + 1))}
                    className="w-10 h-10 rounded-full bg-white/10 text-[var(--color-text)] text-xl font-bold flex items-center justify-center active:bg-white/20"
                  >+</button>
                </div>
              )}
            </div>
          )}

          {/* EMOM: interval length + rounds */}
          {mode === 'emom' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-6 justify-items-center">
                <Stepper label="Intervall" value={emomInterval} onChange={setEmomInterval} min={1} max={5} unit="min" />
                <Stepper label="Runden"    value={emomRounds}   onChange={setEmomRounds}   min={1} max={30} />
              </div>
              <p className="text-xs text-center text-[var(--color-text-muted)]">
                Gesamt: {emomInterval * emomRounds} min
              </p>
            </div>
          )}

          {/* Tabata: work / rest / rounds */}
          {mode === 'tabata' && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3 justify-items-center">
                <Stepper label="Work"   value={tabataWork}   onChange={setTabataWork}   min={5}  max={120} unit="s" />
                <Stepper label="Pause"  value={tabataRest}   onChange={setTabataRest}   min={5}  max={120} unit="s" />
                <Stepper label="Runden" value={tabataRounds} onChange={setTabataRounds} min={1}  max={20} />
              </div>
              <p className="text-xs text-center text-[var(--color-text-muted)]">
                Gesamt: {formatMs((tabataWork + tabataRest) * tabataRounds * 1000)}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Bilateral side-switch overlay */}
      {showSideSwitch && (
        <div className="flex flex-col items-center gap-1 animate-pulse">
          <span className="text-3xl">⇄</span>
          <span className="text-sm font-bold text-amber-400 tracking-wide uppercase">
            Seiten wechseln
          </span>
        </div>
      )}

      {/* Current exercise name (EMOM / Tabata with exercises) */}
      {(isRunning || isPaused) && hasExercises && (mode === 'emom' || isTabata) && currentExName && (
        <div className="flex flex-col items-center gap-2 w-full">
          <p className="text-2xl font-bold text-center" style={{ color: 'var(--color-text)' }}>
            {currentExName}
          </p>
          <NextExercisePreview
            name={nextExName}
            visible={showNextExercise}
            color={modeColor}
          />
        </div>
      )}

      {/* Main time display */}
      <div className="flex flex-col items-center gap-1">
        {isTabata && (isRunning || isPaused) && (
          <div
            className="px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
            style={{ backgroundColor: `${phaseColor}30`, color: phaseColor }}
          >
            {tick.phase === 'work' ? 'Work' : 'Rest'} · Round {tick.interval}/{tabataRounds}
          </div>
        )}
        {mode === 'emom' && (isRunning || isPaused) && (
          <div className="px-4 py-1 rounded-full text-sm font-bold text-blue-400 bg-blue-400/15">
            Interval {tick.interval} / {emomRounds}
          </div>
        )}

        <p
          className="font-mono font-black leading-none"
          style={{
            fontSize: 'clamp(64px, 20vw, 96px)',
            color: isComplete ? '#4CAF50' : (isRunning ? phaseColor : 'var(--color-text)'),
          }}
        >
          {formatMs(displayMs)}
        </p>

        {isComplete && (
          <p className="text-[var(--color-success)] font-semibold text-lg">
            {mode === 'fortime' && isPaused ? `Finished in ${formatMs(tick.elapsed)}` : 'Time\'s up!'}
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-2">
        {!isRunning && !isPaused && (
          <button
            onClick={handleStart}
            className="px-10 py-4 rounded-2xl font-bold text-lg text-white active:scale-95 transition-transform"
            style={{ backgroundColor: modeColor }}
          >
            Start
          </button>
        )}

        {isRunning && (
          <>
            {mode === 'fortime' ? (
              <button
                onClick={handleStop}
                className="px-8 py-4 rounded-2xl font-bold text-lg bg-[var(--color-success)] text-white active:scale-95 transition-transform"
              >
                Done
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="px-8 py-4 rounded-2xl font-bold text-lg bg-white/15 text-[var(--color-text)] active:scale-95 transition-transform"
              >
                Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="px-6 py-4 rounded-2xl font-bold text-lg bg-white/8 text-[var(--color-text-muted)] active:scale-95 transition-transform"
            >
              Reset
            </button>
          </>
        )}

        {isPaused && (
          <>
            <button
              onClick={handleResume}
              className="px-8 py-4 rounded-2xl font-bold text-lg text-white active:scale-95 transition-transform"
              style={{ backgroundColor: modeColor }}
            >
              Resume
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-4 rounded-2xl font-bold text-lg bg-white/8 text-[var(--color-text-muted)] active:scale-95 transition-transform"
            >
              Reset
            </button>
          </>
        )}
      </div>

      {/* Tabata visual progress */}
      {isTabata && (isRunning || isPaused) && (
        <div className="w-full flex gap-1.5 mt-2">
          {Array.from({ length: tabataRounds }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-2 rounded-full"
              style={{
                backgroundColor:
                  i + 1 < tick.interval
                    ? '#4CAF50'
                    : i + 1 === tick.interval
                    ? phaseColor
                    : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
      )}

      {/* Exercise list */}
      {exercises && exercises.length > 0 && (
        <div className="w-full mt-2 rounded-xl bg-white/5 px-4 py-3 space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
            Übungen
          </p>
          {exercises.map((ex, i) => (
            <div key={ex.id} className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-text-muted)] w-4 flex-shrink-0">{i + 1}.</span>
              <span className="text-sm text-[var(--color-text)] flex-1">{ex.name}</span>
              {ex.detail && (
                <span className="text-xs text-[var(--color-text-muted)]">{ex.detail}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
