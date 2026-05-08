import { useState, useEffect, useCallback, useRef } from 'react'
import type { BreathworkTechnique } from '../../hooks/useMeditations'
import { useAudio } from '../../hooks/useAudio'
import { useMeditationLogs } from '../../hooks/useMeditationLogs'

const PILLAR_COLOR = '#9B7FD4'

const T = {
  de: {
    ready:    'Bereit',
    inhale:   'Einatmen',
    hold_in:  'Halten',
    exhale:   'Ausatmen',
    hold_out: 'Pause',
    done:     'Fertig!',
    doneMsg:  'Atemübung abgeschlossen.',
    back:     'Zurück',
    cycle:    'Zyklus',
    of:       'von',
    cycles:   'Zyklen',
    start:    'Starten',
    pause:    'Pausieren',
    resume:   'Fortsetzen',
  },
  en: {
    ready:    'Ready',
    inhale:   'Inhale',
    hold_in:  'Hold',
    exhale:   'Exhale',
    hold_out: 'Pause',
    done:     'Done!',
    doneMsg:  'Breathwork complete.',
    back:     'Back',
    cycle:    'Cycle',
    of:       'of',
    cycles:   'cycles',
    start:    'Start',
    pause:    'Pause',
    resume:   'Resume',
  },
  es: {
    ready:    'Listo',
    inhale:   'Inhala',
    hold_in:  'Retén',
    exhale:   'Exhala',
    hold_out: 'Pausa',
    done:     '¡Listo!',
    doneMsg:  'Ejercicio completado.',
    back:     'Volver',
    cycle:    'Ciclo',
    of:       'de',
    cycles:   'ciclos',
    start:    'Iniciar',
    pause:    'Pausar',
    resume:   'Reanudar',
  },
}

type Lang  = 'de' | 'en' | 'es'
type Phase = 'ready' | 'inhale' | 'hold_in' | 'exhale' | 'hold_out' | 'done'

const PHASE_COLOR: Record<Phase, string> = {
  ready:    PILLAR_COLOR,
  inhale:   '#A0E8AF',
  hold_in:  '#FFD580',
  exhale:   '#7EC8E3',
  hold_out: '#C0A0E8',
  done:     PILLAR_COLOR,
}

interface Props {
  technique: BreathworkTechnique
  lang: Lang
  onFinish: () => void
}

export function BreathworkSession({ technique, lang, onFinish }: Props) {
  const t          = T[lang]
  const { addLog } = useMeditationLogs()
  const audio      = useAudio()

  const [phase,          setPhase]          = useState<Phase>('ready')
  const [phaseRemaining, setPhaseRemaining] = useState(0)
  const [cyclesDone,     setCyclesDone]     = useState(0)
  const [paused,         setPaused]         = useState(false)

  // Refs to avoid stale closures in the effect
  const phaseRef     = useRef<Phase>('ready')
  const cyclesRef    = useRef(0)
  const startTimeRef = useRef(Date.now())

  phaseRef.current  = phase
  cyclesRef.current = cyclesDone

  const endSession = useCallback(() => {
    audio.playComplete()
    const durationMin = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 60000))
    addLog.mutate({
      technique_id: technique.id,
      session_type: 'breathwork',
      duration_min: durationMin,
    })
    setPhase('done')
  }, [audio, addLog, technique.id])

  const handleStart = useCallback(() => {
    audio.playBeep()
    startTimeRef.current = Date.now()
    setCyclesDone(0)
    setPhaseRemaining(technique.inhale_sec)
    setPhase('inhale')
  }, [audio, technique.inhale_sec])

  // Single effect drives the entire state machine
  useEffect(() => {
    if (phase === 'ready' || phase === 'done' || paused) return

    if (phaseRemaining > 0) {
      const id = window.setTimeout(() => setPhaseRemaining((r) => r - 1), 1000)
      return () => clearTimeout(id)
    }

    // phaseRemaining === 0: advance to next phase
    if (phase === 'inhale') {
      if (technique.hold_in_sec > 0) {
        setPhase('hold_in')
        setPhaseRemaining(technique.hold_in_sec)
        return
      }
      setPhase('exhale')
      setPhaseRemaining(technique.exhale_sec)
      return
    }

    if (phase === 'hold_in') {
      setPhase('exhale')
      setPhaseRemaining(technique.exhale_sec)
      return
    }

    if (phase === 'exhale') {
      if (technique.hold_out_sec > 0) {
        setPhase('hold_out')
        setPhaseRemaining(technique.hold_out_sec)
        return
      }
    }

    // End of cycle (from 'exhale' with no hold_out, or from 'hold_out')
    const nextCycles = cyclesRef.current + 1
    if (nextCycles >= technique.cycles) {
      endSession()
    } else {
      setCyclesDone(nextCycles)
      audio.playBeep()
      setPhase('inhale')
      setPhaseRemaining(technique.inhale_sec)
    }
  }, [phase, phaseRemaining, paused, technique, audio, endSession])

  useEffect(() => () => { audio.cleanup() }, [audio])

  // Circle: expand during inhale/hold_in, contract during exhale/hold_out
  const isExpanded  = phase === 'inhale' || phase === 'hold_in'
  const circleScale = isExpanded ? 1 : 0.35
  const transitionMs = phase === 'inhale'  ? technique.inhale_sec  * 1000
                     : phase === 'exhale'  ? technique.exhale_sec  * 1000
                     : 500

  const phaseLabel = (t as Record<string, string>)[phase] ?? ''
  const phaseColor = PHASE_COLOR[phase]

  if (phase === 'done') {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6 text-center">
        <div className="text-6xl">🌬</div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text)]">{t.done}</h2>
          <p className="text-[var(--color-text-muted)] mt-1">{t.doneMsg}</p>
        </div>
        <div
          className="rounded-2xl px-6 py-3 text-sm"
          style={{ backgroundColor: `${PILLAR_COLOR}22`, color: PILLAR_COLOR }}
        >
          {technique.name} · {technique.cycles} {t.cycles}
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
      {/* Title + cycle counter */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-[var(--color-text)]">{technique.name}</h2>
        {phase !== 'ready' && (
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            {t.cycle} {cyclesDone + 1} {t.of} {technique.cycles}
          </p>
        )}
      </div>

      {/* Animated breath circle */}
      <div className="flex justify-center py-4">
        <div className="relative w-56 h-56 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: `2px solid ${phaseColor}33` }}
          />
          <div
            className="rounded-full absolute inset-0"
            style={{
              backgroundColor: `${phaseColor}18`,
              border: `3px solid ${phaseColor}`,
              transform: `scale(${circleScale})`,
              transition: `transform ${transitionMs}ms ease-in-out, background-color 0.5s, border-color 0.5s`,
            }}
          />
          <div className="relative flex flex-col items-center justify-center">
            <span className="text-lg font-bold" style={{ color: phaseColor }}>
              {phaseLabel}
            </span>
            {phase !== 'ready' && phaseRemaining > 0 && (
              <span className="text-3xl font-black text-[var(--color-text)] mt-1">
                {phaseRemaining}
              </span>
            )}
          </div>
        </div>
      </div>

      {technique.description && (
        <p className="text-sm text-center text-[var(--color-text-muted)] px-2">
          {technique.description}
        </p>
      )}

      {phase === 'ready' ? (
        <button
          onClick={handleStart}
          className="w-full py-4 rounded-[var(--radius-md)] font-bold text-white"
          style={{ backgroundColor: PILLAR_COLOR }}
        >
          ▶ {t.start}
        </button>
      ) : (
        <button
          onClick={() => setPaused((p) => !p)}
          className="w-full py-3 rounded-[var(--radius-md)] text-sm font-semibold border border-white/10 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          {paused ? t.resume : t.pause}
        </button>
      )}
    </div>
  )
}
