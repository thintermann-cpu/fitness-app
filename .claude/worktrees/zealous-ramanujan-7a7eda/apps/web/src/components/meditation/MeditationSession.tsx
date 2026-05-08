import { useState, useEffect, useCallback, useRef } from 'react'
import type { Meditation } from '../../hooks/useMeditations'
import type { SoundKey } from '../../hooks/useAudio'
import { useAudio } from '../../hooks/useAudio'
import { useMeditationLogs } from '../../hooks/useMeditationLogs'

const PILLAR_COLOR = '#9B7FD4'

const T = {
  de: {
    pause: 'Pausieren',
    resume: 'Fortsetzen',
    finish: 'Beenden',
    done: 'Fertig!',
    doneMsg: 'Deine Meditation ist abgeschlossen.',
    back: 'Zurück',
    sound: 'Klang',
    instructions: 'Anleitung',
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
    pause: 'Pause',
    resume: 'Resume',
    finish: 'Finish',
    done: 'Done!',
    doneMsg: 'Your meditation is complete.',
    back: 'Back',
    sound: 'Sound',
    instructions: 'Guidance',
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
    pause: 'Pausar',
    resume: 'Reanudar',
    finish: 'Finalizar',
    done: '¡Listo!',
    doneMsg: 'Tu meditación ha concluido.',
    back: 'Volver',
    sound: 'Sonido',
    instructions: 'Guía',
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

type Lang = 'de' | 'en' | 'es'

interface Props {
  meditation: Meditation
  lang: Lang
  onFinish: () => void
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function MeditationSession({ meditation, lang, onFinish }: Props) {
  const t         = T[lang]
  const { addLog } = useMeditationLogs()
  const audio     = useAudio()

  const totalSec  = meditation.duration_min * 60
  const [timeLeft, setTimeLeft] = useState(totalSec)
  const [paused,   setPaused]   = useState(false)
  const [finished, setFinished] = useState(false)
  const [started,  setStarted]  = useState(false)
  const [sound,    setSound]    = useState<SoundKey>(
    (meditation.background_sound as SoundKey | null) ?? 'silence'
  )
  const startTimeRef = useRef(Date.now())

  // Start session: gong + background
  const handleStart = useCallback(() => {
    setStarted(true)
    void audio.playGong()
    void audio.startBackground(sound)
    startTimeRef.current = Date.now()
  }, [audio, sound])

  // Switch background sound mid-session
  const handleSoundChange = useCallback((s: SoundKey) => {
    setSound(s)
    if (started && !paused) {
      void audio.startBackground(s)
    }
  }, [audio, started, paused])

  // Countdown
  useEffect(() => {
    if (!started || paused || finished) return
    if (timeLeft <= 0) {
      setFinished(true)
      audio.stopBackground()
      audio.playComplete()
      const durationMin = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000))
      addLog.mutate({
        meditation_id: meditation.id,
        session_type:  'meditation',
        duration_min:  durationMin,
      })
      return
    }
    const id = window.setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [started, paused, finished, timeLeft, audio, addLog, meditation.id])

  // Cleanup audio on unmount
  useEffect(() => () => { audio.cleanup() }, [audio])

  const circumference = 2 * Math.PI * 44
  const strokeOffset  = circumference - (timeLeft / totalSec) * circumference

  if (finished) {
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
          {meditation.name} · {meditation.duration_min} min
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
    <div className="space-y-5">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-[var(--color-text)]">{meditation.name}</h2>
        <p className="text-sm text-[var(--color-text-muted)] mt-0.5">{meditation.duration_min} min</p>
      </div>

      {/* Timer ring */}
      <div className="flex justify-center py-2">
        <div className="relative w-36 h-36">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-[var(--color-text)]">{formatTime(timeLeft)}</span>
          </div>
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
              onClick={() => handleSoundChange(s)}
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

      {/* Instructions */}
      {meditation.instructions.length > 0 && (
        <div
          className="rounded-[var(--radius-md)] p-4 border border-white/5"
          style={{ backgroundColor: 'var(--color-bg-card)' }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: PILLAR_COLOR }}>
            {t.instructions}
          </p>
          <div className="space-y-1.5">
            {meditation.instructions.map((step, i) => (
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
      {!started ? (
        <button
          onClick={handleStart}
          className="w-full py-4 rounded-[var(--radius-md)] font-bold text-white"
          style={{ backgroundColor: PILLAR_COLOR }}
        >
          ▶ Start
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() => {
              const next = !paused
              setPaused(next)
              if (next) {
                audio.stopBackground()
              } else {
                void audio.startBackground(sound)
              }
            }}
            className="flex-1 py-3 rounded-[var(--radius-md)] text-sm font-semibold border border-white/10 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            {paused ? t.resume : t.pause}
          </button>
          <button
            onClick={() => {
              audio.stopBackground()
              audio.playComplete()
              setFinished(true)
              const durationMin = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000))
              addLog.mutate({
                meditation_id: meditation.id,
                session_type:  'meditation',
                duration_min:  durationMin,
              })
            }}
            className="flex-[2] py-3 rounded-[var(--radius-md)] text-sm font-bold text-white transition-opacity active:opacity-80"
            style={{ backgroundColor: PILLAR_COLOR }}
          >
            {t.finish}
          </button>
        </div>
      )}
    </div>
  )
}
