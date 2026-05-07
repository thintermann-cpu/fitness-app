import { useEffect, useRef, useState, useCallback } from 'react'

type TimerMode = 'fortime' | 'amrap' | 'emom' | 'tabata'

interface Props {
  initialMode?: TimerMode
  initialMinutes?: number
  onComplete?: () => void
}

interface TickData {
  elapsed: number
  remaining: number
  phase: 'work' | 'rest'
  interval: number
}

const MODE_INFO: Record<TimerMode, { label: string; description: string; color: string }> = {
  fortime: { label: 'For Time', description: 'Count up — stop when done', color: '#E8642A' },
  amrap:   { label: 'AMRAP',    description: 'Count down — as many rounds as possible', color: '#F59E0B' },
  emom:    { label: 'EMOM',     description: 'Every minute on the minute', color: '#3B82F6' },
  tabata:  { label: 'Tabata',   description: '20s work / 10s rest × 8 rounds', color: '#8B5CF6' },
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

export function TimerView({ initialMode, initialMinutes, onComplete }: Props) {
  const [mode, setMode]           = useState<TimerMode>(initialMode ?? 'fortime')
  const [minutes, setMinutes]     = useState(initialMinutes ?? 20)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused]   = useState(false)
  const [tick, setTick]           = useState<TickData>({ elapsed: 0, remaining: 0, phase: 'work', interval: 1 })
  const [isComplete, setIsComplete] = useState(false)

  const workerRef = useRef<Worker | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const worker = new Worker('/timer.worker.js')

    worker.onmessage = (e: MessageEvent<{ type: string } & Partial<TickData> & { beepType?: string }>) => {
      const { type } = e.data
      if (type === 'tick') {
        setTick({
          elapsed: e.data.elapsed ?? 0,
          remaining: e.data.remaining ?? 0,
          phase: e.data.phase ?? 'work',
          interval: e.data.interval ?? 1,
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

  // Reset when mode or minutes change
  useEffect(() => {
    if (!isRunning && !isPaused) {
      setTick({ elapsed: 0, remaining: mode === 'tabata' ? 240_000 : minutes * 60_000, phase: 'work', interval: 1 })
      setIsComplete(false)
    }
  }, [mode, minutes, isRunning, isPaused])

  const handleStart = useCallback(() => {
    const durationMs = mode === 'tabata' ? 240_000 : minutes * 60_000
    workerRef.current?.postMessage({ type: 'start', mode, durationMs })
    setIsRunning(true)
    setIsPaused(false)
    setIsComplete(false)
  }, [mode, minutes])

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
  const displayMs = mode === 'fortime' ? tick.elapsed : tick.remaining
  const isTabata = mode === 'tabata'
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

      {/* Duration input (not for tabata, not while running) */}
      {mode !== 'tabata' && !isRunning && !isPaused && (
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMinutes((m) => Math.max(1, m - 1))}
            className="w-10 h-10 rounded-full bg-white/10 text-[var(--color-text)] text-xl font-bold flex items-center justify-center active:bg-white/20"
          >
            −
          </button>
          <div className="text-center min-w-[80px]">
            <p className="text-3xl font-bold text-[var(--color-text)]">{minutes}</p>
            <p className="text-xs text-[var(--color-text-muted)]">minutes</p>
          </div>
          <button
            onClick={() => setMinutes((m) => Math.min(120, m + 1))}
            className="w-10 h-10 rounded-full bg-white/10 text-[var(--color-text)] text-xl font-bold flex items-center justify-center active:bg-white/20"
          >
            +
          </button>
        </div>
      )}

      {/* Mode description */}
      {!isRunning && !isPaused && (
        <p className="text-sm text-[var(--color-text-muted)] text-center">{modeInfo.description}</p>
      )}

      {/* Main time display */}
      <div className="flex flex-col items-center gap-1">
        {isTabata && (isRunning || isPaused) && (
          <div
            className="px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
            style={{ backgroundColor: `${phaseColor}30`, color: phaseColor }}
          >
            {tick.phase === 'work' ? 'Work' : 'Rest'} · Round {tick.interval}/8
          </div>
        )}
        {mode === 'emom' && (isRunning || isPaused) && (
          <div className="px-4 py-1 rounded-full text-sm font-bold text-blue-400 bg-blue-400/15">
            Interval {tick.interval}
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
            {mode === 'fortime' ? `Finished in ${formatMs(tick.elapsed)}` : 'Time\'s up!'}
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
          {Array.from({ length: 8 }).map((_, i) => (
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
