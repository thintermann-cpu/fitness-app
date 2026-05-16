import { useState, useEffect, useRef } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useToastStore } from '../../store/toastStore'

const PRESETS = [3, 5, 10]

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function WarmupTimer({ isOpen, onClose }: Props) {
  const [selectedMin, setSelectedMin]   = useState(5)
  const [customMin,   setCustomMin]     = useState('')
  const [running,     setRunning]       = useState(false)
  const [timeLeft,    setTimeLeft]      = useState(0)
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

  useEffect(() => {
    if (!running) return
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current ?? undefined)
      setRunning(false)
      if ('vibrate' in navigator) navigator.vibrate([500, 100, 500])
      void audio.playGong()
      addToast({ type: 'success', message: '🔥 Warmup abgeschlossen!' })
      onClose()
      return
    }
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1))
    }, 1000)
    return () => clearInterval(intervalRef.current ?? undefined)
  }, [running, timeLeft, audio, addToast, onClose])

  if (!isOpen) return null

  const handleStart = () => {
    const mins = activeMins
    if (!mins || mins < 1) return
    setTimeLeft(mins * 60)
    setRunning(true)
    void audio.playBeep()
  }

  const handleStop = () => {
    clearInterval(intervalRef.current ?? undefined)
    setRunning(false)
    setTimeLeft(0)
  }

  const handleClose = () => {
    handleStop()
    onClose()
  }

  const total = activeMins * 60
  const progress = running && total > 0 ? timeLeft / total : 1
  const circumference = 2 * Math.PI * 70
  const dashOffset = circumference * (1 - progress)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm rounded-t-2xl p-6 pb-8"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
        onClick={(e) => e.stopPropagation()}
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

        {!running ? (
          <>
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
            <div className="flex flex-col items-center mb-5">
              <div className="relative w-40 h-40">
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
