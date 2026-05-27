import { useState, useEffect, useRef } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useToastStore } from '../../store/toastStore'
import { CountdownOverlay } from '../shared/CountdownOverlay'

const PRESETS = [3, 5, 10]

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const DEFAULT_EXERCISES = [
  { name: 'Jumping Jacks', desc: 'Arme und Beine gleichzeitig spreizen',       sek: 40 },
  { name: 'High Knees',    desc: 'Knie hoch ziehen, schnelles Tempo',           sek: 40 },
  { name: 'Burpees',       desc: 'Langsam und kontrolliert – Körper aufwärmen', sek: 40 },
  { name: 'Leg Swings',    desc: 'Bein vor und zurück schwingen, je Seite',     sek: 30 },
  { name: 'Arm Circles',   desc: 'Große Kreise mit beiden Armen',               sek: 30 },
  { name: 'Air Squats',    desc: 'Tief in die Knie, Brust hoch',                sek: 40 },
]

const TOTAL_EXERCISE_CYCLE_SEC = DEFAULT_EXERCISES.reduce((sum, ex) => sum + ex.sek, 0)

interface Props {
  isOpen: boolean
  onClose: () => void
  onStartWorkout?: () => void
}

export function WarmupTimer({ isOpen, onClose, onStartWorkout }: Props) {
  const [selectedMin, setSelectedMin]   = useState(5)
  const [customMin,   setCustomMin]     = useState('')
  const [running,     setRunning]       = useState(false)
  const [timeLeft,    setTimeLeft]      = useState(0)
  const [warmupDone,  setWarmupDone]    = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const audio = useAudio()
  const addToast = useToastStore((s) => s.addToast)

  const activeMins = customMin ? parseInt(customMin, 10) || selectedMin : selectedMin

  // Wake Lock
  const wakeLockRef = useRef<{ release: () => Promise<void> } | null>(null)
  useEffect(() => {
    type WakeLockNav = Navigator & { wakeLock?: { request(t: string): Promise<{ release(): Promise<void> }> } }
    const nav = navigator as WakeLockNav
    if (!nav.wakeLock) return
    if (running) {
      nav.wakeLock.request('screen').then((s) => { wakeLockRef.current = s }).catch(() => {})
    } else {
      wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
    return () => { wakeLockRef.current?.release().catch(() => {}); wakeLockRef.current = null }
  }, [running])

  // Countdown beep: last 3 seconds
  useEffect(() => {
    if (!running || timeLeft <= 0 || timeLeft > 3) return
    void audio.playBeep()
  }, [running, timeLeft, audio])

  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current ?? undefined)
      setRunning(false)
      setWarmupDone(true)
      if ('vibrate' in navigator) navigator.vibrate([500, 100, 500])
      void audio.playGong()
      addToast({ type: 'success', message: '🔥 Warmup abgeschlossen!' })
      return
    }
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1))
    }, 1000)
    return () => clearInterval(intervalRef.current ?? undefined)
  }, [running, timeLeft, audio, addToast, onClose])

  if (!isOpen) return null

  const startTimer = () => {
    const mins = activeMins
    if (!mins || mins < 1) return
    setTimeLeft(mins * 60)
    setRunning(true)
    void audio.playBeep()
  }

  const handleStart = () => {
    if (!activeMins || activeMins < 1) return
    setShowCountdown(true)
  }

  const handleStop = () => {
    clearInterval(intervalRef.current ?? undefined)
    setRunning(false)
    setTimeLeft(0)
    setWarmupDone(false)
  }

  const handleClose = () => {
    handleStop()
    onClose()
  }

  const total = activeMins * 60
  const progress = running && total > 0 ? timeLeft / total : 1

  const currentExIdx = (() => {
    if (!running || total <= 0) return 0
    const elapsed = total - timeLeft
    const posInCycle = elapsed % TOTAL_EXERCISE_CYCLE_SEC
    let cumSek = 0
    for (let i = 0; i < DEFAULT_EXERCISES.length; i++) {
      cumSek += DEFAULT_EXERCISES[i].sek
      if (posInCycle < cumSek) return i
    }
    return DEFAULT_EXERCISES.length - 1
  })()
  const circumference = 2 * Math.PI * 70
  const dashOffset = circumference * (1 - progress)

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <CountdownOverlay
        isOpen={showCountdown}
        onComplete={() => { setShowCountdown(false); startTimer() }}
      />
      <div
        className="flex-1 w-full max-w-sm mx-auto px-4 pt-8 pb-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>🔥 Warmup-Timer</p>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }}
          >
            ✕
          </button>
        </div>

        {warmupDone ? (
          <div className="flex flex-col items-center gap-5 py-2">
            <span className="text-5xl">🔥</span>
            <div className="text-center">
              <p className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>Warmup abgeschlossen!</p>
              <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Bereit fürs Workout?</p>
            </div>
            <button
              onClick={() => { onStartWorkout?.(); onClose() }}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-base active:scale-[0.98] transition-transform"
              style={{ backgroundColor: '#E8642A' }}
            >
              ▶ Workout starten
            </button>
            <button
              onClick={handleClose}
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Schließen
            </button>
          </div>
        ) : !running ? (
          <>
            {/* Exercise list */}
            <div className="mb-4 rounded-xl px-3 py-2.5" style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  Übungen
                </p>
                <div className="space-y-1.5">
                  {DEFAULT_EXERCISES.map((ex) => (
                    <div key={ex.name} className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>{ex.name}</span>
                        <p className="text-[10px] leading-tight" style={{ color: 'var(--color-text-muted)' }}>{ex.desc}</p>
                      </div>
                      <span className="text-xs tabular-nums flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>{ex.sek}s</span>
                    </div>
                  ))}
                </div>
            </div>

            {/* Preset chips */}
            <div className="flex gap-2 mb-4">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => { setSelectedMin(p); setCustomMin('') }}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: selectedMin === p && !customMin ? '#E8642A' : 'var(--color-bg-elevated)',
                    color: selectedMin === p && !customMin ? 'white' : 'var(--color-text-muted)',
                  }}
                >
                  {p} min
                </button>
              ))}
            </div>

            {/* Custom input */}
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-5"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                border: customMin ? '1.5px solid #E8642A' : '1.5px solid transparent',
              }}
            >
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Manuell:</span>
              <input
                type="number"
                value={customMin}
                onChange={(e) => setCustomMin(e.target.value.replace(/\D/g, ''))}
                placeholder="—"
                min={1}
                max={30}
                className="flex-1 bg-transparent text-sm text-right outline-none w-12"
                style={{ color: 'var(--color-text)' }}
              />
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>min</span>
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-base active:scale-[0.98] transition-transform"
              style={{ backgroundColor: '#E8642A' }}
            >
              ▶ Warmup starten
            </button>
          </>
        ) : (
          <>
            {/* Countdown ring */}
            <div className="flex flex-col items-center mb-4">
              <div className="relative w-36 h-36">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                  <circle
                    cx="80" cy="80" r="70"
                    fill="none"
                    stroke="#E8642A"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono font-black text-3xl" style={{ color: 'var(--color-text)' }}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>

            {/* Exercise list with current exercise highlighted */}
            <div className="w-full rounded-xl px-3 py-2 mb-4" style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
              <div className="space-y-0.5">
                {DEFAULT_EXERCISES.map((ex, i) => (
                  <div
                    key={ex.name}
                    className="flex items-start gap-2 px-2 py-1.5 rounded-lg transition-colors"
                    style={i === currentExIdx ? { backgroundColor: 'rgba(232,100,42,0.12)' } : {}}
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs font-medium"
                        style={{ color: i === currentExIdx ? '#E8642A' : 'var(--color-text-muted)' }}
                      >
                        {i === currentExIdx && '▶ '}{ex.name}
                      </p>
                      {i === currentExIdx && (
                        <p className="text-[10px] leading-tight mt-0.5" style={{ color: 'rgba(232,100,42,0.65)' }}>
                          {ex.desc}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-[10px] tabular-nums flex-shrink-0 mt-0.5"
                      style={{ color: i === currentExIdx ? '#E8642A' : 'rgba(255,255,255,0.2)' }}
                    >
                      {ex.sek}s
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleStop}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--color-text-muted)',
              }}
            >
              Stopp
            </button>
          </>
        )}
      </div>
    </div>
  )
}
