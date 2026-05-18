import { useState, useEffect, useMemo, useRef } from 'react'
import { useAudioStore } from '../../store/audioStore'

type Lang = 'de' | 'en' | 'es'
type MeditationType = 'breathing' | 'box_breathing' | 'body_scan' | 'focus' | 'open_awareness'
type Mode = 'config' | 'active' | 'done'

interface Phase {
  label: string
  duration: number  // 0 = runs until timer ends
  instruction: string
}

const PHASES: Record<MeditationType, Phase[]> = {
  breathing: [
    { label: 'Einatmen',  duration: 4, instruction: 'Atme tief durch die Nase ein' },
    { label: 'Halten',    duration: 4, instruction: 'Halte den Atem sanft an' },
    { label: 'Ausatmen',  duration: 4, instruction: 'Atme langsam durch den Mund aus' },
    { label: 'Pause',     duration: 4, instruction: '' },
  ],
  box_breathing: [
    { label: 'Einatmen',  duration: 4, instruction: '4 Sekunden einatmen' },
    { label: 'Halten',    duration: 4, instruction: '4 Sekunden halten' },
    { label: 'Ausatmen',  duration: 4, instruction: '4 Sekunden ausatmen' },
    { label: 'Halten',    duration: 4, instruction: '4 Sekunden halten' },
  ],
  body_scan: [
    { label: 'Füsse & Beine',      duration: 60, instruction: 'Richte deine Aufmerksamkeit auf Füsse und Unterschenkel' },
    { label: 'Bauch & Rücken',     duration: 60, instruction: 'Spüre deinen Bauch und Rücken' },
    { label: 'Brust & Schultern',  duration: 60, instruction: 'Nimm Brust und Schultern wahr' },
    { label: 'Arme & Hände',       duration: 60, instruction: 'Spüre deine Arme bis in die Fingerspitzen' },
    { label: 'Gesicht & Kopf',     duration: 60, instruction: 'Entspanne Gesicht, Kiefer und Stirn' },
  ],
  focus: [
    { label: 'Ankommen',         duration: 30, instruction: 'Lass dich nieder, schliesse die Augen' },
    { label: 'Atem beobachten',  duration: 0,  instruction: 'Beobachte deinen natürlichen Atemrhythmus' },
  ],
  open_awareness: [
    { label: 'Ankommen',               duration: 30, instruction: 'Komm zur Ruhe' },
    { label: 'Geräusche wahrnehmen',   duration: 60, instruction: 'Höre ohne zu bewerten' },
    { label: 'Gedanken beobachten',    duration: 0,  instruction: 'Lass Gedanken kommen und gehen' },
  ],
}

const TYPE_LABELS: Record<MeditationType, Record<Lang, string>> = {
  breathing:      { de: 'Atemübung',          en: 'Breathing',      es: 'Respiración' },
  box_breathing:  { de: 'Box Breathing',       en: 'Box Breathing',  es: 'Respiración cuadrada' },
  body_scan:      { de: 'Body Scan',           en: 'Body Scan',      es: 'Escaneo corporal' },
  focus:          { de: 'Fokus',               en: 'Focus',          es: 'Enfoque' },
  open_awareness: { de: 'Offene Achtsamkeit',  en: 'Open Awareness', es: 'Conciencia abierta' },
}

const DUR_OPTIONS = [5, 10, 15, 20] as const
type Duration = typeof DUR_OPTIONS[number]
const PILLAR_COLOR = '#9B7FD4'
const CYCLING: MeditationType[] = ['breathing', 'box_breathing']

function fmt(s: number): string {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function scaledPhases(type: MeditationType, totalSeconds: number): Phase[] {
  const base = PHASES[type]
  if (type !== 'body_scan') return base
  const sum = base.reduce((a, p) => a + p.duration, 0)
  return base.map((p) => ({ ...p, duration: Math.round((p.duration / sum) * totalSeconds) }))
}

function computePhase(
  elapsed: number,
  phases: Phase[],
  isCycling: boolean,
): { phase: Phase; phaseElapsed: number; phaseTotal: number | null } {
  if (isCycling) {
    const len = phases.reduce((a, p) => a + p.duration, 0)
    const pos = len > 0 ? elapsed % len : 0
    let acc = 0
    for (const p of phases) {
      if (pos < acc + p.duration) return { phase: p, phaseElapsed: pos - acc, phaseTotal: p.duration }
      acc += p.duration
    }
    const last = phases[phases.length - 1]
    return { phase: last, phaseElapsed: 0, phaseTotal: last.duration }
  }
  let acc = 0
  for (let i = 0; i < phases.length; i++) {
    const p = phases[i]
    if (p.duration === 0 || i === phases.length - 1) {
      return { phase: p, phaseElapsed: elapsed - acc, phaseTotal: null }
    }
    if (elapsed < acc + p.duration) {
      return { phase: p, phaseElapsed: elapsed - acc, phaseTotal: p.duration }
    }
    acc += p.duration
  }
  const last = phases[phases.length - 1]
  return { phase: last, phaseElapsed: elapsed - acc, phaseTotal: null }
}

function playPing(isMuted: boolean) {
  if (isMuted) return
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const g   = ctx.createGain()
    osc.connect(g); g.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(528, ctx.currentTime)
    g.gain.setValueAtTime(0.28, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 1.4)
  } catch {}
}

function playGong(isMuted: boolean) {
  if (isMuted) return
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const g   = ctx.createGain()
    osc.connect(g); g.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(432, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 3.2)
    g.gain.setValueAtTime(0.6, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 4.5)
  } catch {}
}

interface Props {
  lang: Lang
  onFinish: () => void
}

export function UnguidedTimer({ lang, onFinish }: Props) {
  const isMuted = useAudioStore((s) => s.isMuted)

  const [meditationType, setMeditationType] = useState<MeditationType>('breathing')
  const [duration,       setDuration]       = useState<Duration>(10)
  const [mode,           setMode]           = useState<Mode>('config')
  const [elapsed,        setElapsed]        = useState(0)
  const [paused,         setPaused]         = useState(false)

  const totalSeconds = duration * 60
  const phases       = useMemo(() => scaledPhases(meditationType, totalSeconds), [meditationType, totalSeconds])
  const isCycling    = CYCLING.includes(meditationType)
  const timeLeft     = totalSeconds - elapsed

  const { phase, phaseElapsed, phaseTotal } = useMemo(
    () => computePhase(elapsed, phases, isCycling),
    [elapsed, phases, isCycling],
  )

  const lastPhaseLabel = useRef<string | null>(null)

  // Ping on phase change
  useEffect(() => {
    if (mode !== 'active' || elapsed === 0) { lastPhaseLabel.current = phase.label; return }
    if (lastPhaseLabel.current !== null && lastPhaseLabel.current !== phase.label) {
      playPing(isMuted)
    }
    lastPhaseLabel.current = phase.label
  }, [phase.label, mode, elapsed, isMuted])

  // Main countdown
  useEffect(() => {
    if (mode !== 'active' || paused) return
    const id = setInterval(() => setElapsed((e) => Math.min(e + 1, totalSeconds)), 1000)
    return () => clearInterval(id)
  }, [mode, paused, totalSeconds])

  // Done detection
  useEffect(() => {
    if (mode === 'active' && elapsed >= totalSeconds) {
      setMode('done')
      playGong(isMuted)
    }
  }, [elapsed, totalSeconds, mode, isMuted])

  function start() {
    setElapsed(0)
    lastPhaseLabel.current = null
    setPaused(false)
    setMode('active')
    playGong(isMuted)
  }

  const phaseProgress = phaseTotal != null && phaseTotal > 0
    ? Math.min(1, phaseElapsed / phaseTotal)
    : null

  // ── Config ──────────────────────────────────────────────────────────────────
  if (mode === 'config') {
    return (
      <div className="space-y-5">
        {/* Type chips */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide mb-2.5"
             style={{ color: 'var(--color-text-muted)' }}>
            Meditationstyp
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(TYPE_LABELS) as MeditationType[]).map((t) => (
              <button
                key={t}
                onClick={() => setMeditationType(t)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                style={{
                  backgroundColor: meditationType === t ? PILLAR_COLOR : `${PILLAR_COLOR}18`,
                  color:           meditationType === t ? 'white' : PILLAR_COLOR,
                }}
              >
                {TYPE_LABELS[t][lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Duration chips */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide mb-2.5"
             style={{ color: 'var(--color-text-muted)' }}>
            Dauer
          </p>
          <div className="flex gap-2">
            {DUR_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-colors"
                style={{
                  backgroundColor: duration === d ? PILLAR_COLOR : `${PILLAR_COLOR}18`,
                  color:           duration === d ? 'white' : PILLAR_COLOR,
                }}
              >
                {d} min
              </button>
            ))}
          </div>
        </div>

        {/* Phase preview */}
        <div className="rounded-xl p-3" style={{ backgroundColor: `${PILLAR_COLOR}10` }}>
          <p className="text-[10px] font-semibold uppercase tracking-wide mb-2"
             style={{ color: PILLAR_COLOR }}>
            Ablauf
          </p>
          <div className="space-y-1.5">
            {phases.map((p, i) => (
              <div key={i} className="flex justify-between text-xs"
                   style={{ color: 'var(--color-text-muted)' }}>
                <span>{p.label}</span>
                <span className="tabular-nums">
                  {p.duration === 0 ? 'bis Ende' : `${p.duration}s`}
                </span>
              </div>
            ))}
            {isCycling && (
              <p className="text-xs italic mt-1" style={{ color: 'var(--color-text-muted)' }}>
                Zyklisch für {duration} min
              </p>
            )}
          </div>
        </div>

        <button
          onClick={start}
          className="w-full py-4 rounded-2xl font-bold text-white text-base transition-opacity active:opacity-80"
          style={{ backgroundColor: PILLAR_COLOR }}
        >
          ▶ Meditation starten
        </button>
      </div>
    )
  }

  // ── Done ────────────────────────────────────────────────────────────────────
  if (mode === 'done') {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 text-center px-8"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <span style={{ fontSize: 72 }}>🧘</span>
        <div>
          <p className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
            Meditation abgeschlossen
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            {duration} Minuten · {TYPE_LABELS[meditationType][lang]}
          </p>
        </div>
        <button
          onClick={() => { setMode('config'); onFinish() }}
          className="px-8 py-3.5 rounded-2xl font-bold text-white text-base"
          style={{ backgroundColor: PILLAR_COLOR }}
        >
          Fertig
        </button>
      </div>
    )
  }

  // ── Active (fullscreen overlay) ─────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-8 pb-4">
        <button
          onClick={() => setPaused((p) => !p)}
          className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-base"
          style={{ color: 'var(--color-text-muted)' }}
          aria-label={paused ? 'Fortsetzen' : 'Pausieren'}
        >
          {paused ? '▶' : '⏸'}
        </button>
        <span className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
          {TYPE_LABELS[meditationType][lang]}
        </span>
        <button
          onClick={() => { setPaused(true); setMode('config') }}
          className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center text-base"
          style={{ color: 'var(--color-text-muted)' }}
          aria-label="Beenden"
        >
          ✕
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-4">
        {/* Phase name */}
        <p
          className="font-black text-center leading-none"
          style={{
            fontSize: 'clamp(40px, 14vw, 60px)',
            color: paused ? 'var(--color-text-muted)' : PILLAR_COLOR,
            transition: 'color 0.3s ease',
          }}
        >
          {paused ? '⏸' : phase.label}
        </p>

        {/* Instruction */}
        {!paused && phase.instruction && (
          <p
            className="text-base text-center leading-relaxed"
            style={{ color: 'var(--color-text-muted)', maxWidth: 280 }}
          >
            {phase.instruction}
          </p>
        )}

        {/* Phase progress bar */}
        {phaseProgress !== null && !paused && (
          <div
            className="w-40 h-1 rounded-full mt-2 overflow-hidden"
            style={{ backgroundColor: `${PILLAR_COLOR}20` }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${phaseProgress * 100}%`,
                backgroundColor: PILLAR_COLOR,
                transition: 'width 1s linear',
              }}
            />
          </div>
        )}

        {/* Phase countdown for timed phases */}
        {phaseTotal !== null && !paused && (
          <p className="text-sm tabular-nums" style={{ color: `${PILLAR_COLOR}80` }}>
            {phaseTotal - phaseElapsed}s
          </p>
        )}
      </div>

      {/* Total timer */}
      <div className="flex flex-col items-center pb-16">
        <span
          className="font-mono font-black tabular-nums"
          style={{
            fontSize: 'clamp(52px, 16vw, 72px)',
            color: 'var(--color-text)',
            opacity: paused ? 0.4 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {fmt(timeLeft)}
        </span>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
          verbleibend
        </p>
      </div>
    </div>
  )
}
