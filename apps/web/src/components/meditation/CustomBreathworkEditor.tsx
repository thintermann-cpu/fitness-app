import { useState, useCallback } from 'react'
import type { BreathworkTechnique } from '../../hooks/useMeditations'

const PILLAR_COLOR = '#9B7FD4'
const STORAGE_KEY  = 'carveout_custom_breathwork'

const T = {
  de: {
    title:      'Eigene Technik',
    inhale:     'Einatmen',
    holdIn:     'Halten (ein)',
    exhale:     'Ausatmen',
    holdOut:    'Pause (aus)',
    cycles:     'Zyklen',
    duration:   'Gesamtdauer',
    save:       'Als Preset speichern',
    saved:      'Gespeichert',
    start:      'Starten',
    sec:        's',
    min:        'min',
    name:       'Name der Technik',
    savedPresets: 'Gespeicherte Presets',
    delete:     'Löschen',
  },
  en: {
    title:      'Custom Technique',
    inhale:     'Inhale',
    holdIn:     'Hold (in)',
    exhale:     'Exhale',
    holdOut:    'Pause (out)',
    cycles:     'Cycles',
    duration:   'Total duration',
    save:       'Save as preset',
    saved:      'Saved',
    start:      'Start',
    sec:        's',
    min:        'min',
    name:       'Technique name',
    savedPresets: 'Saved presets',
    delete:     'Delete',
  },
  es: {
    title:      'Técnica propia',
    inhale:     'Inhalar',
    holdIn:     'Retener (entrada)',
    exhale:     'Exhalar',
    holdOut:    'Pausa (salida)',
    cycles:     'Ciclos',
    duration:   'Duración total',
    save:       'Guardar como preset',
    saved:      'Guardado',
    start:      'Iniciar',
    sec:        's',
    min:        'min',
    name:       'Nombre de técnica',
    savedPresets: 'Presets guardados',
    delete:     'Eliminar',
  },
}

type Lang = 'de' | 'en' | 'es'

interface SavedPreset {
  id: string
  name: string
  inhale_sec: number
  hold_in_sec: number
  exhale_sec: number
  hold_out_sec: number
  cycles: number
}

function loadPresets(): SavedPreset[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as SavedPreset[]
  } catch {
    return []
  }
}

function savePresets(presets: SavedPreset[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets))
}

interface Props {
  lang: Lang
  onStart: (technique: BreathworkTechnique) => void
}

function StepperField({
  label,
  value,
  min,
  max,
  onChange,
  suffix,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  suffix: string
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold active:scale-90 transition-transform"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text)' }}
        >
          −
        </button>
        <span className="w-12 text-center text-sm font-bold text-[var(--color-text)]">
          {value}{suffix}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold active:scale-90 transition-transform"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text)' }}
        >
          +
        </button>
      </div>
    </div>
  )
}

export function CustomBreathworkEditor({ lang, onStart }: Props) {
  const t = T[lang]

  const [inhale,  setInhale]  = useState(4)
  const [holdIn,  setHoldIn]  = useState(0)
  const [exhale,  setExhale]  = useState(4)
  const [holdOut, setHoldOut] = useState(0)
  const [cycles,  setCycles]  = useState(10)
  const [name,    setName]    = useState('')
  const [justSaved, setJustSaved] = useState(false)
  const [presets, setPresets] = useState<SavedPreset[]>(loadPresets)

  const cycleSec    = inhale + holdIn + exhale + holdOut
  const totalSec    = cycleSec * cycles
  const totalMinStr = totalSec < 60
    ? `${totalSec}${t.sec}`
    : `${Math.floor(totalSec / 60)}${t.min} ${totalSec % 60 > 0 ? `${totalSec % 60}${t.sec}` : ''}`

  const buildTechnique = useCallback((): BreathworkTechnique => ({
    id:           'custom',
    name:         name.trim() || t.title,
    description:  '',
    inhale_sec:   inhale,
    hold_in_sec:  holdIn,
    exhale_sec:   exhale,
    hold_out_sec: holdOut,
    cycles,
    difficulty:   'custom',
  }), [name, t.title, inhale, holdIn, exhale, holdOut, cycles])

  const handleSavePreset = () => {
    const preset: SavedPreset = {
      id:           crypto.randomUUID(),
      name:         name.trim() || t.title,
      inhale_sec:   inhale,
      hold_in_sec:  holdIn,
      exhale_sec:   exhale,
      hold_out_sec: holdOut,
      cycles,
    }
    const updated = [preset, ...presets].slice(0, 8)
    setPresets(updated)
    savePresets(updated)
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2000)
  }

  const handleLoadPreset = (p: SavedPreset) => {
    setInhale(p.inhale_sec)
    setHoldIn(p.hold_in_sec)
    setExhale(p.exhale_sec)
    setHoldOut(p.hold_out_sec)
    setCycles(p.cycles)
    setName(p.name)
  }

  const handleDeletePreset = (id: string) => {
    const updated = presets.filter(p => p.id !== id)
    setPresets(updated)
    savePresets(updated)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-[var(--color-text)]">{t.title}</h3>

      {/* Stepper fields */}
      <div
        className="rounded-[var(--radius-md)] px-4 border border-white/5"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <StepperField label={t.inhale}  value={inhale}  min={1} max={10} onChange={setInhale}  suffix={t.sec} />
        <StepperField label={t.holdIn}  value={holdIn}  min={0} max={10} onChange={setHoldIn}  suffix={t.sec} />
        <StepperField label={t.exhale}  value={exhale}  min={1} max={10} onChange={setExhale}  suffix={t.sec} />
        <StepperField label={t.holdOut} value={holdOut} min={0} max={10} onChange={setHoldOut} suffix={t.sec} />
        <StepperField label={t.cycles}  value={cycles}  min={5} max={40} onChange={setCycles}  suffix="" />
      </div>

      {/* Duration preview */}
      <div
        className="flex items-center justify-between rounded-[var(--radius-md)] px-4 py-3"
        style={{ backgroundColor: `${PILLAR_COLOR}15`, border: `1px solid ${PILLAR_COLOR}33` }}
      >
        <span className="text-sm text-[var(--color-text-muted)]">{t.duration}</span>
        <span className="text-sm font-bold" style={{ color: PILLAR_COLOR }}>{totalMinStr}</span>
      </div>

      {/* Name + save as preset */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder={t.name}
          value={name}
          onChange={e => setName(e.target.value)}
          className="flex-1 bg-[var(--color-bg-card)] border border-white/8 rounded-xl px-3 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-subtle)] focus:outline-none focus:border-[#9B7FD4]"
        />
        <button
          onClick={handleSavePreset}
          className="px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
          style={{
            backgroundColor: justSaved ? '#4CAF5020' : `${PILLAR_COLOR}20`,
            border:          `1.5px solid ${justSaved ? '#4CAF50' : PILLAR_COLOR}`,
            color:           justSaved ? '#4CAF50' : PILLAR_COLOR,
          }}
        >
          {justSaved ? t.saved : t.save}
        </button>
      </div>

      {/* Start button */}
      <button
        onClick={() => onStart(buildTechnique())}
        className="w-full py-4 rounded-[var(--radius-md)] font-bold text-white"
        style={{ backgroundColor: PILLAR_COLOR }}
      >
        ▶ {t.start}
      </button>

      {/* Saved presets */}
      {presets.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            {t.savedPresets}
          </p>
          {presets.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-[var(--radius-md)] px-4 py-3 border border-white/5"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              <button
                onClick={() => handleLoadPreset(p)}
                className="flex-1 text-left"
              >
                <p className="text-sm font-semibold text-[var(--color-text)]">{p.name}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {p.inhale_sec}–{p.hold_in_sec}–{p.exhale_sec}–{p.hold_out_sec} · {p.cycles}×
                </p>
              </button>
              <button
                onClick={() => handleDeletePreset(p.id)}
                className="text-xs text-[var(--color-text-subtle)] hover:text-red-400 transition-colors px-2 py-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
