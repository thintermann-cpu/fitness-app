import { useEffect, useRef, useState, useCallback } from 'react'

type TimerMode = 'fortime' | 'amrap' | 'emom' | 'tabata'

interface Props {
  initialMode?: TimerMode
  initialMinutes?: number
  onComplete?: () => void
  bilateral?: boolean
}

interface TickData {
  elapsed: number
  remaining: number
  phase: 'work' | 'rest'
  interval: number
}

const MODE_INFO: Record<TimerMode, { label: string; color: string }> = {
  fortime: { label: 'For Time', color: '#E8642A' },
  amrap:   { label: 'AMRAP',    color: '#F59E0B' },
  emom:    { label: 'EMOM',     color: '#3B82F6' },
  tabata:  { label: 'Tabata',   color: '#8B5CF6' },
}

function formatMs(ms: number): string {
  const totalSec = Math.floor(Math.abs(ms) / 1000)
  const m = Math.floor(totalSec / 60)
  const s = totalSec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

let audioCtx: AudioContext | null = null

function beep(type: 'start' | 'interval' | 'end') {
  try {
    if (!audioCtx) audioCtx = new AudioContext()
    if (audioCtx.state === 'suspended') void audioCtx.resume()
    const osc  = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.frequency.value = type === 'end' ? 880 : type === 'interval' ? 660 : 440
    osc.type = 'sine'
    const t = audioCtx.currentTime
    gain.gain.setValueAtTime(0.4, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + (type === 'end' ? 1.0 : 0.4))
    osc.start(t)
    osc.stop(t + (type === 'end' ? 1.0 : 0.4))
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

export function TimerView({ initialMode, initialMinutes, onComplete, bilateral }: Props) {
  const [mode, setMode]           = useState<TimerMode>(initialMode ?? 'fortime')
  const [minutes, setMinutes]     = useState(initialMinutes ?? 20)  // AMRAP total time

  // EMOM config
  const [emomInterval, setEmomInterval] = useState(1)   // minutes per interval
  const [emomRounds,   setEmomRounds]   = useState(10)
  // Tabata config
  const [tabataWork,   setTabataWork]   = useState(20)  // seconds
  const [tabataRest,   setTabataRest]   = useState(10)  // seconds
  const [tabataRounds, setTabataRounds] = useState(8)
  // ForTime cap (null = no cap, just count up)
  const [forTimeCap,   setForTimeCap]   = useState<number | null>(null)

  const [isRunning, setIsRunning] = useState(false)
  const [isPaused,  setIsPaused]  = useState(false)
  const [tick, setTick]           = useState<TickData>({ elapsed: 0, remaining: 0, phase: 'work', interval: 1 })
  const [isComplete, setIsComplete] = useState(false)
  const [showSideSwitch, setShowSideSwitch] = useState(false)
  const sideSwitchShownRef = useRef(false)

  const workerRef = useRef<Worker | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const wakeLockRef = useRef<{ release: () => Promise<void> } | null>(null)

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
        setIsRunning(false)
        setIsComplete(true)
        onCompleteRef.current?.()
      } else if (type === 'beep') {
        beep(e.data.beepType as 'start' | 'interval' | 'end')
      } else if (type === 'reset') {
        setTick({ elapsed: 0, remaining: 0, phase: 'work', interval: 1 })
      }
    }

    workerRef.current = worker
    return () => worker.terminate()
  }, [])

  // Reset displayed tick when config changes (not while running/paused)
  useEffect(() => {
    if (!isRunning && !isPaused) {
      let initialRemaining: number
      if (mode === 'tabata')      initialRemaining = (tabataWork + tabataRest) * 1000 * tabataRounds
      else if (mode === 'emom')   initialRemaining = emomInterval * 60_000 * emomRounds
      else if (mode === 'fortime') initialRemaining = (forTimeCap ?? 0) * 60_000
      else                        initialRemaining = minutes * 60_000
      setTick({ elapsed: 0, remaining: initialRemaining, phase: 'work', interval: 1 })
      setIsComplete(false)
    }
  }, [mode, minutes, tabataWork, tabataRest, tabataRounds, emomInterval, emomRounds, forTimeCap, isRunning, isPaused])

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

  const handleStart = useCallback(() => {
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
  }, [])

  const handleStop = useCallback(() => {
    // ForTime: manually stop (save the time)
    workerRef.current?.postMessage({ type: 'pause' })
    setIsRunning(false)
    setIsPaused(true)
    setIsComplete(true)
  }, [])

  const modeInfo = MODE_INFO[mode]
  const isForTimeWithCap = mode === 'fortime' && forTimeCap !== null
  const displayMs  = (mode === 'fortime' && !isForTimeWithCap) ? tick.elapsed : tick.remaining
  const isTabata   = mode === 'tabata'
  const phaseColor = tick.phase === 'rest' ? '#3B82F6' : modeInfo.color

  return (
    <div className="flex flex-col items-center gap-6 py-4">

      {/* Mode selector */}
      {!isRunning && !isPaused && (
        <div className="w-full grid grid-cols-4 gap-1.5 bg-white/5 rounded-xl p-1">
          {(Object.keys(MODE_INFO) as TimerMode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setIsComplete(false) }}
              className={`py-2 rounded-lg text-xs font-semibold transition-colors ${
                mode === m
                  ? 'bg-[#E8642A] text-white'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {MODE_INFO[m].label}
            </button>
          ))}
        </div>
      )}

      {/* Config section — shown before start */}
      {!isRunning && !isPaused && (
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
                      ? { backgroundColor: modeInfo.color, color: 'white' }
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
            style={{ backgroundColor: modeInfo.color }}
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
              style={{ backgroundColor: modeInfo.color }}
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
    </div>
  )
}
