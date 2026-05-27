import { useState, useEffect, useRef } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useToastStore } from '../../store/toastStore'
import { CountdownOverlay } from '../shared/CountdownOverlay'

const REST_SEC = 4
const RING_RADIUS = 70
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

const DEFAULT_EXERCISES = [
  { name: 'Jumping Jacks', desc: 'Arme und Beine gleichzeitig spreizen',       sek: 40 },
  { name: 'High Knees',    desc: 'Knie hoch ziehen, schnelles Tempo',           sek: 40 },
  { name: 'Burpees',       desc: 'Langsam und kontrolliert – Körper aufwärmen', sek: 40 },
  { name: 'Leg Swings',    desc: 'Bein vor und zurück schwingen, je Seite',     sek: 30 },
  { name: 'Arm Circles',   desc: 'Große Kreise mit beiden Armen',               sek: 30 },
  { name: 'Air Squats',    desc: 'Tief in die Knie, Brust hoch',                sek: 40 },
]

type Phase = 'idle' | 'exercise' | 'rest' | 'done'

interface Props {
  isOpen: boolean
  onClose: () => void
  onStartWorkout?: () => void
}

export function WarmupTimer({ isOpen, onClose, onStartWorkout }: Props) {
  const [phase, setPhase]           = useState<Phase>('idle')
  const [showCountdown, setShowCountdown] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [timeLeft, setTimeLeft]     = useState(0)
  const [paused, setPaused]         = useState(false)
  const [done, setDone]             = useState<boolean[]>(() => new Array(DEFAULT_EXERCISES.length).fill(false))

  const audio    = useAudio()
  const addToast = useToastStore((s) => s.addToast)

  // Wake Lock
  const wakeLockRef = useRef<{ release: () => Promise<void> } | null>(null)
  const isTimerActive = (phase === 'exercise' || phase === 'rest') && !paused
  useEffect(() => {
    type WakeLockNav = Navigator & { wakeLock?: { request(t: string): Promise<{ release(): Promise<void> }> } }
    const nav = navigator as WakeLockNav
    if (!nav.wakeLock) return
    if (isTimerActive) {
      nav.wakeLock.request('screen').then((s) => { wakeLockRef.current = s }).catch(() => {})
    } else {
      wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
    return () => { wakeLockRef.current?.release().catch(() => {}); wakeLockRef.current = null }
  }, [isTimerActive])

  const current      = DEFAULT_EXERCISES[currentIdx]
  const phaseTotal   = phase === 'rest' ? REST_SEC : (current?.sek ?? 0)
  const progress     = phaseTotal > 0 ? timeLeft / phaseTotal : 1
  const dashOffset   = CIRCUMFERENCE * (1 - progress)
  const ringColor    = phase === 'rest' ? '#60A5FA' : '#E8642A'

  function startFirst() {
    setCurrentIdx(0)
    setDone(new Array(DEFAULT_EXERCISES.length).fill(false))
    setPhase('exercise')
    setTimeLeft(DEFAULT_EXERCISES[0].sek)
    setPaused(false)
    void audio.playGong()
  }

  function resetToIdle() {
    setPhase('idle')
    setCurrentIdx(0)
    setTimeLeft(0)
    setPaused(false)
    setDone(new Array(DEFAULT_EXERCISES.length).fill(false))
  }

  function handleClose() {
    resetToIdle()
    onClose()
  }

  // Countdown beep last 3 seconds of exercise
  useEffect(() => {
    if (phase !== 'exercise' || paused || timeLeft <= 0 || timeLeft > 3) return
    void audio.playBeep()
  }, [phase, paused, timeLeft, audio])

  // Main timer
  useEffect(() => {
    if (paused || phase === 'idle' || phase === 'done') return

    if (timeLeft <= 0) {
      if ('vibrate' in navigator) navigator.vibrate([200, 100, 200])

      if (phase === 'exercise') {
        setDone((d) => { const n = [...d]; n[currentIdx] = true; return n })
        if (currentIdx < DEFAULT_EXERCISES.length - 1) {
          void audio.playBeep()
          setPhase('rest')
          setTimeLeft(REST_SEC)
        } else {
          setPhase('done')
          if ('vibrate' in navigator) navigator.vibrate([500, 100, 500])
          void audio.playGong()
          addToast({ type: 'success', message: '🔥 Warmup abgeschlossen!' })
        }
      } else if (phase === 'rest') {
        void audio.playBeep()
        const next = currentIdx + 1
        setCurrentIdx(next)
        setPhase('exercise')
        setTimeLeft(DEFAULT_EXERCISES[next].sek)
      }
      return
    }

    const id = window.setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timeLeft, paused, phase, currentIdx, audio, addToast])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <CountdownOverlay
        isOpen={showCountdown}
        onComplete={() => { setShowCountdown(false); startFirst() }}
      />

      <div className="flex-1 w-full max-w-sm mx-auto px-4 pt-8 pb-10 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>🔥 Warmup</p>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)' }}
          >
            ✕
          </button>
        </div>

        {/* ── Done ── */}
        {phase === 'done' && (
          <div className="flex flex-col items-center gap-5 flex-1 justify-center">
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
            <button onClick={handleClose} className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Schließen
            </button>
          </div>
        )}

        {/* ── Idle / start screen ── */}
        {phase === 'idle' && (
          <div className="flex flex-col gap-4 flex-1">
            <div className="rounded-xl px-3 py-2.5" style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
              <p
                className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
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
            <button
              onClick={() => setShowCountdown(true)}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-base active:scale-[0.98] transition-transform mt-auto"
              style={{ backgroundColor: '#E8642A' }}
            >
              ▶ Warmup starten
            </button>
          </div>
        )}

        {/* ── Active session ── */}
        {(phase === 'exercise' || phase === 'rest') && (
          <div className="flex flex-col items-center gap-4 flex-1">
            {/* Progress dots */}
            <div className="flex gap-1.5">
              {DEFAULT_EXERCISES.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-colors"
                  style={{
                    backgroundColor:
                      done[i] ? '#E8642A'
                      : i === currentIdx ? '#E8642A'
                      : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            {/* Ring timer */}
            <div className="relative w-40 h-40">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 160 160"
                style={{ transform: 'rotate(-90deg)' }}
              >
                <circle cx="80" cy="80" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <circle
                  cx="80" cy="80" r={RING_RADIUS}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {phase === 'rest' ? (
                  <span className="text-3xl">⏱</span>
                ) : (
                  <span className="font-mono font-black text-3xl" style={{ color: 'var(--color-text)' }}>
                    {timeLeft}
                  </span>
                )}
              </div>
            </div>

            {/* Label */}
            {phase === 'rest' ? (
              <div className="text-center">
                <p className="text-sm font-semibold" style={{ color: '#60A5FA' }}>Kurze Pause</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  Nächste: {DEFAULT_EXERCISES[currentIdx + 1]?.name}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{current.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{current.desc}</p>
              </div>
            )}

            {/* Next preview — last 10s */}
            {phase === 'exercise' && timeLeft <= 10 && currentIdx < DEFAULT_EXERCISES.length - 1 && (
              <div
                className="rounded-lg px-3 py-2 w-full text-center"
                style={{ backgroundColor: 'rgba(232,100,42,0.1)', border: '1px solid rgba(232,100,42,0.2)' }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'rgba(232,100,42,0.6)' }}>Nächste</p>
                <p className="text-xs font-medium" style={{ color: '#E8642A' }}>{DEFAULT_EXERCISES[currentIdx + 1].name}</p>
              </div>
            )}

            {/* Exercise list with checkmarks */}
            <div className="w-full rounded-xl px-3 py-2" style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
              <div className="space-y-0.5">
                {DEFAULT_EXERCISES.map((ex, i) => (
                  <div
                    key={ex.name}
                    className="flex items-center gap-2 px-1 py-1 rounded-lg transition-colors"
                    style={i === currentIdx && phase === 'exercise' ? { backgroundColor: 'rgba(232,100,42,0.1)' } : {}}
                  >
                    <span
                      className="text-[10px] w-3 text-center"
                      style={{ color: done[i] ? '#E8642A' : 'rgba(255,255,255,0.2)' }}
                    >
                      {done[i] ? '✓' : '○'}
                    </span>
                    <p
                      className="text-xs flex-1"
                      style={{
                        color:
                          i === currentIdx && phase === 'exercise' ? '#E8642A'
                          : done[i] ? 'rgba(255,255,255,0.35)'
                          : 'var(--color-text-muted)',
                      }}
                    >
                      {ex.name}
                    </p>
                    <span className="text-[10px] tabular-nums" style={{ color: 'rgba(255,255,255,0.2)' }}>
                      {ex.sek}s
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-3 w-full mt-auto">
              <button
                onClick={() => setPaused((p) => !p)}
                className="flex-1 py-3 rounded-xl font-semibold text-white text-sm active:scale-[0.98] transition-transform"
                style={{ backgroundColor: '#E8642A' }}
              >
                {paused ? '▶ Weiter' : '⏸ Pause'}
              </button>
              <button
                onClick={resetToIdle}
                className="py-3 px-4 rounded-xl text-sm"
                style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
              >
                Stopp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
