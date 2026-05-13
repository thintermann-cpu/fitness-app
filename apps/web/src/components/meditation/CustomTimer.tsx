import { useState, useEffect, useCallback, useRef } from 'react'
import type { SoundKey } from '../../hooks/useAudio'
import { useAudio } from '../../hooks/useAudio'
import { useMeditationLogs } from '../../hooks/useMeditationLogs'

const PILLAR_COLOR = '#9B7FD4'

const T = {
  de: {
    title:       'Eigener Timer',
    duration:    'Dauer',
    min:         'Min',
    prep:        'Vorbereitungszeit',
    sec:         'Sek',
    interval:    'Intervall-Ton',
    noInterval:  'Kein',
    everyX:      'Alle',
    sound:       'Hintergrundklang',
    start:       'Starten',
    pause:       'Pausieren',
    resume:      'Fortsetzen',
    finish:      'Beenden',
    done:        'Zeit ist um!',
    doneMsg:     'Deine Meditation ist abgeschlossen.',
    back:        'Zurück',
    preparing:   'Vorbereitung…',
    sounds: {
      silence:    'Stille',
      rain:       'Regen',
      forest:     'Wald',
      waves:      'Wellen',
      white_noise:'Weißes Rauschen',
      bowl:       'Klangschale',
    },
  },
  en: {
    title:       'Custom Timer',
    duration:    'Duration',
    min:         'min',
    prep:        'Preparation time',
    sec:         'sec',
    interval:    'Interval tone',
    noInterval:  'None',
    everyX:      'Every',
    sound:       'Background sound',
    start:       'Start',
    pause:       'Pause',
    resume:      'Resume',
    finish:      'Finish',
    done:        'Time is up!',
    doneMsg:     'Your meditation is complete.',
    back:        'Back',
    preparing:   'Preparing…',
    sounds: {
      silence:    'Silence',
      rain:       'Rain',
      forest:     'Forest',
      waves:      'Waves',
      white_noise:'White Noise',
      bowl:       'Singing Bowl',
    },
  },
  es: {
    title:       'Temporizador',
    duration:    'Duración',
    min:         'min',
    prep:        'Tiempo de preparación',
    sec:         'seg',
    interval:    'Tono de intervalo',
    noInterval:  'Ninguno',
    everyX:      'Cada',
    sound:       'Sonido de fondo',
    start:       'Iniciar',
    pause:       'Pausar',
    resume:      'Reanudar',
    finish:      'Finalizar',
    done:        '¡Tiempo!',
    doneMsg:     'Tu meditación ha concluido.',
    back:        'Volver',
    preparing:   'Preparando…',
    sounds: {
      silence:    'Silencio',
      rain:       'Lluvia',
      forest:     'Bosque',
      waves:      'Olas',
      white_noise:'Ruido blanco',
      bowl:       'Cuenco',
    },
  },
}

const SOUNDS: SoundKey[] = ['silence', 'rain', 'forest', 'waves', 'white_noise', 'bowl']
const SOUND_ICONS: Record<SoundKey, string> = {
  silence:    '🔇',
  rain:       '🌧',
  forest:     '🌲',
  waves:      '🌊',
  white_noise:'〰',
  bowl:       '🔔',
}
const INTERVAL_OPTIONS = [0, 5, 10, 15, 20] // 0 = off
const PREP_OPTIONS     = [0, 5, 10, 15, 30]

type Lang   = 'de' | 'en' | 'es'
type Status = 'setup' | 'prep' | 'running' | 'paused' | 'done'

interface Props {
  lang: Lang
  onFinish: () => void
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function CustomTimer({ lang, onFinish }: Props) {
  const t          = T[lang]
  const { addLog } = useMeditationLogs()
  const audio      = useAudio()

  const [durationMin,  setDurationMin]  = useState(10)
  const [prepSec,      setPrepSec]      = useState(5)
  const [intervalMin,  setIntervalMin]  = useState(0)
  const [sound,        setSound]        = useState<SoundKey>('silence')
  const [status,       setStatus]       = useState<Status>('setup')
  const [timeLeft,     setTimeLeft]     = useState(0)
  const [prepLeft,     setPrepLeft]     = useState(0)

  const startTimeRef      = useRef(Date.now())
  const lastIntervalRef   = useRef(0)
  const totalSecRef       = useRef(durationMin * 60)
  const wakeLockRef       = useRef<{ release: () => Promise<void> } | null>(null)

  const isTimerActive = status === 'running' || status === 'prep'
  useEffect(() => {
    type WakeLockNav = Navigator & { wakeLock?: { request(t: string): Promise<{ release(): Promise<void> }> } }
    const nav = navigator as WakeLockNav
    if (!nav.wakeLock) return
    if (isTimerActive) {
      nav.wakeLock.request('screen').then(s => { wakeLockRef.current = s }).catch(() => {})
    } else {
      wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
    return () => {
      wakeLockRef.current?.release().catch(() => {})
      wakeLockRef.current = null
    }
  }, [isTimerActive])

  const circumference = 2 * Math.PI * 44

  const handleStart = useCallback(() => {
    const total = durationMin * 60
    totalSecRef.current    = total
    lastIntervalRef.current = 0

    void audio.playGong()

    if (prepSec > 0) {
      setPrepLeft(prepSec)
      setTimeLeft(total)
      setStatus('prep')
    } else {
      setTimeLeft(total)
      setStatus('running')
      void audio.startBackground(sound)
      startTimeRef.current = Date.now()
    }
  }, [durationMin, prepSec, sound, audio])

  // Countdown effect
  useEffect(() => {
    if (status === 'setup' || status === 'done' || status === 'paused') return

    if (status === 'prep') {
      if (prepLeft <= 0) {
        setStatus('running')
        void audio.startBackground(sound)
        startTimeRef.current = Date.now()
        return
      }
      const id = window.setTimeout(() => setPrepLeft((p) => p - 1), 1000)
      return () => clearTimeout(id)
    }

    if (status === 'running') {
      if (timeLeft <= 0) {
        audio.stopBackground()
        void audio.playComplete()
        void audio.playGong()
        const durationMinActual = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000))
        addLog.mutate({ session_type: 'custom_timer', duration_min: durationMinActual })
        setStatus('done')
        return
      }

      // Interval beep check
      if (intervalMin > 0) {
        const elapsed = totalSecRef.current - timeLeft
        const nextBeat = lastIntervalRef.current + intervalMin * 60
        if (elapsed >= nextBeat && elapsed > 0) {
          void audio.playBeep()
          lastIntervalRef.current = nextBeat
        }
      }

      const id = window.setTimeout(() => setTimeLeft((t) => t - 1), 1000)
      return () => clearTimeout(id)
    }
  }, [status, timeLeft, prepLeft, sound, intervalMin, audio, addLog])

  useEffect(() => () => { audio.cleanup() }, [audio])

  const strokeOffset = timeLeft > 0
    ? circumference - (timeLeft / totalSecRef.current) * circumference
    : circumference

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
          {durationMin} {t.min}
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

  if (status === 'prep' || status === 'running' || status === 'paused') {
    return (
      <div className="space-y-5">
        <div className="text-center">
          <h2 className="text-xl font-bold" style={{ color: PILLAR_COLOR }}>{t.title}</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{durationMin} {t.min}</p>
        </div>

        <div className="flex justify-center py-2">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              {status !== 'prep' && (
                <circle
                  cx="50" cy="50" r="44" fill="none"
                  stroke={PILLAR_COLOR} strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {status === 'prep' ? (
                <>
                  <span className="text-xs text-[var(--color-text-muted)]">{t.preparing}</span>
                  <span className="text-3xl font-black text-[var(--color-text)]">{prepLeft}</span>
                </>
              ) : (
                <span className="text-2xl font-black text-[var(--color-text)]">{formatTime(timeLeft)}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              const next = status === 'paused' ? 'running' : 'paused'
              if (next === 'paused') {
                audio.stopBackground()
              } else {
                void audio.startBackground(sound)
              }
              setStatus(next)
            }}
            className="flex-1 py-3 rounded-[var(--radius-md)] text-sm font-semibold border border-white/10 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            disabled={status === 'prep'}
          >
            {status === 'paused' ? t.resume : t.pause}
          </button>
          <button
            onClick={() => {
              audio.stopBackground()
              void audio.playComplete()
              void audio.playGong()
              const durationMinActual = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000))
              addLog.mutate({ session_type: 'custom_timer', duration_min: durationMinActual })
              setStatus('done')
            }}
            className="flex-[2] py-3 rounded-[var(--radius-md)] text-sm font-bold text-white"
            style={{ backgroundColor: PILLAR_COLOR }}
          >
            {t.finish}
          </button>
        </div>
      </div>
    )
  }

  // Setup screen
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold text-center" style={{ color: PILLAR_COLOR }}>{t.title}</h2>

      {/* Duration */}
      <div
        className="rounded-[var(--radius-md)] p-4 border border-white/5"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: PILLAR_COLOR }}>
            {t.duration}
          </p>
          <span className="text-sm font-bold text-[var(--color-text)]">{durationMin} {t.min}</span>
        </div>
        <input
          type="range" min={5} max={60} step={5}
          value={durationMin}
          onChange={(e) => setDurationMin(Number(e.target.value))}
          className="w-full accent-[#9B7FD4]"
        />
        <div className="flex justify-between text-xs text-[var(--color-text-subtle)] mt-1">
          <span>5 {t.min}</span><span>60 {t.min}</span>
        </div>
      </div>

      {/* Prep time */}
      <div
        className="rounded-[var(--radius-md)] p-4 border border-white/5"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: PILLAR_COLOR }}>
          {t.prep}
        </p>
        <div className="flex gap-2 flex-wrap">
          {PREP_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setPrepSec(s)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={
                prepSec === s
                  ? { backgroundColor: PILLAR_COLOR, color: 'white' }
                  : { backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }
              }
            >
              {s === 0 ? t.noInterval : `${s} ${t.sec}`}
            </button>
          ))}
        </div>
      </div>

      {/* Interval beep */}
      <div
        className="rounded-[var(--radius-md)] p-4 border border-white/5"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: PILLAR_COLOR }}>
          {t.interval}
        </p>
        <div className="flex gap-2 flex-wrap">
          {INTERVAL_OPTIONS.map((m) => (
            <button
              key={m}
              onClick={() => setIntervalMin(m)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={
                intervalMin === m
                  ? { backgroundColor: PILLAR_COLOR, color: 'white' }
                  : { backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }
              }
            >
              {m === 0 ? t.noInterval : `${t.everyX} ${m} ${t.min}`}
            </button>
          ))}
        </div>
      </div>

      {/* Sound selector */}
      <div
        className="rounded-[var(--radius-md)] p-4 border border-white/5"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: PILLAR_COLOR }}>
          {t.sound}
        </p>
        <div className="flex flex-wrap gap-2">
          {SOUNDS.map((s) => (
            <button
              key={s}
              onClick={() => setSound(s)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
              style={
                sound === s
                  ? { backgroundColor: PILLAR_COLOR, color: 'white' }
                  : { backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }
              }
            >
              <span>{SOUND_ICONS[s]}</span>
              <span>{t.sounds[s]}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        className="w-full py-4 rounded-[var(--radius-md)] font-bold text-white"
        style={{ backgroundColor: PILLAR_COLOR }}
      >
        ▶ {t.start}
      </button>
    </div>
  )
}
