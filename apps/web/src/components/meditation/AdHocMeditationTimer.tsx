import { useState, useEffect, useRef } from 'react'
import { useAudio } from '../../hooks/useAudio'
import { useMeditationLogs } from '../../hooks/useMeditationLogs'
import { useToast } from '../../hooks/useToast'

const PILLAR_COLOR = '#9B7FD4'
type Lang = 'de' | 'en' | 'es'
type Status = 'running' | 'paused' | 'done'

interface Props {
  duration: number
  lang: Lang
  onFinish: () => void
}

const T = {
  de: {
    pause: 'Pausieren', resume: 'Fortsetzen', finish: 'Beenden',
    done: 'Fertig!', doneMsg: 'Meditation abgeschlossen.', back: 'Zurück',
    toastMsg: (min: number) => `${min} Min Meditation abgeschlossen`,
  },
  en: {
    pause: 'Pause', resume: 'Resume', finish: 'Finish',
    done: 'Done!', doneMsg: 'Meditation complete.', back: 'Back',
    toastMsg: (min: number) => `${min} min meditation complete`,
  },
  es: {
    pause: 'Pausar', resume: 'Reanudar', finish: 'Finalizar',
    done: '¡Listo!', doneMsg: 'Meditación completada.', back: 'Volver',
    toastMsg: (min: number) => `${min} min de meditación`,
  },
} as const

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function AdHocMeditationTimer({ duration, lang, onFinish }: Props) {
  const t          = T[lang] ?? T.de
  const { addLog } = useMeditationLogs()
  const audio      = useAudio()
  const toast      = useToast()

  const totalSec      = duration * 60
  const [timeLeft, setTimeLeft] = useState(totalSec)
  const [status,   setStatus]   = useState<Status>('running')
  const startTimeRef  = useRef(Date.now())
  const wakeLockRef   = useRef<{ release: () => Promise<void> } | null>(null)
  const circumference = 2 * Math.PI * 44

  useEffect(() => { void audio.playGong() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    type WakeLockNav = Navigator & { wakeLock?: { request(t: string): Promise<{ release(): Promise<void> }> } }
    const nav = navigator as WakeLockNav
    if (!nav.wakeLock) return
    if (status === 'running') {
      nav.wakeLock.request('screen').then(s => { wakeLockRef.current = s }).catch(() => {})
    } else {
      wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
    return () => {
      wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
  }, [status])

  const logAndFinish = () => {
    if ('vibrate' in navigator) navigator.vibrate([500, 100, 500])
    void audio.playComplete()
    void audio.playGong()
    const elapsed = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000))
    addLog.mutate({ session_type: 'custom_timer', duration_min: elapsed })
    toast.success(t.toastMsg(elapsed))
    setStatus('done')
  }

  useEffect(() => {
    if (status !== 'running') return
    if (timeLeft <= 0) { logAndFinish(); return }
    const id = window.setTimeout(() => setTimeLeft(tl => tl - 1), 1000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, timeLeft])

  useEffect(() => () => { audio.cleanup() }, [audio])

  const strokeOffset = circumference - (timeLeft / totalSec) * circumference

  if (status === 'done') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
        <div className="text-6xl">🧘</div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)]">{t.done}</h2>
          <p className="text-[var(--color-text-muted)] mt-1">{t.doneMsg}</p>
        </div>
        <div
          className="rounded-2xl px-6 py-3 text-sm"
          style={{ backgroundColor: `${PILLAR_COLOR}22`, color: PILLAR_COLOR }}
        >
          {duration} min
        </div>
        <button
          onClick={onFinish}
          className="w-full max-w-xs py-4 rounded-[var(--radius-md)] font-bold text-white"
          style={{ backgroundColor: PILLAR_COLOR }}
        >
          {t.back}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 py-4">
      <div className="text-center">
        <h2 className="text-xl font-bold" style={{ color: PILLAR_COLOR }}>
          {duration} min
        </h2>
      </div>

      <div className="flex justify-center">
        <div className="relative w-44 h-44">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="44" fill="none"
              stroke={PILLAR_COLOR} strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span className="text-3xl font-black text-[var(--color-text)]">{formatTime(timeLeft)}</span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {status === 'paused' ? '⏸' : '▶'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStatus(status === 'paused' ? 'running' : 'paused')}
          className="flex-1 py-3 rounded-[var(--radius-md)] text-sm font-semibold border border-white/10 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          {status === 'paused' ? t.resume : t.pause}
        </button>
        <button
          onClick={logAndFinish}
          className="flex-[2] py-3 rounded-[var(--radius-md)] text-sm font-bold text-white"
          style={{ backgroundColor: PILLAR_COLOR }}
        >
          {t.finish}
        </button>
      </div>
    </div>
  )
}
