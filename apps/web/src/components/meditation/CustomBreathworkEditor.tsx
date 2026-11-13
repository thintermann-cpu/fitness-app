import { useState, useCallback } from 'react'
import type { BreathworkTechnique } from '../../hooks/useMeditations'
import { JsonExportSheet } from '../shared/JsonExportSheet'
import {
  sessionJsonFromBreathPreset,
  slugFilename,
  type BreathPresetExport,
} from '../../lib/sessionExport'

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
    update:     'Preset aktualisieren',
    saved:      'Gespeichert',
    start:      'Starten',
    sec:        's',
    min:        'min',
    name:       'Name der Technik',
    savedPresets: 'Gespeicherte Presets',
    delete:     'Löschen',
    edit:       'Bearbeiten',
    cancelEdit: 'Neu statt bearbeiten',
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
    update:     'Update preset',
    saved:      'Saved',
    start:      'Start',
    sec:        's',
    min:        'min',
    name:       'Technique name',
    savedPresets: 'Saved presets',
    delete:     'Delete',
    edit:       'Edit',
    cancelEdit: 'New instead of edit',
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
    update:     'Actualizar preset',
    saved:      'Guardado',
    start:      'Iniciar',
    sec:        's',
    min:        'min',
    name:       'Nombre de técnica',
    savedPresets: 'Presets guardados',
    delete:     'Eliminar',
    edit:       'Editar',
    cancelEdit: 'Nuevo en vez de editar',
  },
}

type Lang = 'de' | 'en' | 'es'
type SavedPreset = BreathPresetExport

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
  const [editingId, setEditingId] = useState<string | null>(null)
  const [justSaved, setJustSaved] = useState(false)
  const [presets, setPresets] = useState<SavedPreset[]>(loadPresets)
  const [exportPreset, setExportPreset] = useState<SavedPreset | null>(null)

  const cycleSec    = inhale + holdIn + exhale + holdOut
  const totalSec    = cycleSec * cycles
  const totalMinStr = totalSec < 60
    ? `${totalSec}${t.sec}`
    : `${Math.floor(totalSec / 60)}${t.min} ${totalSec % 60 > 0 ? `${totalSec % 60}${t.sec}` : ''}`

  const buildTechnique = useCallback((): BreathworkTechnique => ({
    id:           editingId ?? 'custom',
    name:         name.trim() || t.title,
    description:  '',
    inhale_sec:   inhale,
    hold_in_sec:  holdIn,
    exhale_sec:   exhale,
    hold_out_sec: holdOut,
    cycles,
    difficulty:   'custom',
  }), [editingId, name, t.title, inhale, holdIn, exhale, holdOut, cycles])

  const handleSavePreset = () => {
    const preset: SavedPreset = {
      id:           editingId ?? crypto.randomUUID(),
      name:         name.trim() || t.title,
      inhale_sec:   inhale,
      hold_in_sec:  holdIn,
      exhale_sec:   exhale,
      hold_out_sec: holdOut,
      cycles,
    }
    const without = presets.filter((p) => p.id !== preset.id)
    const updated = [preset, ...without].slice(0, 8)
    setPresets(updated)
    savePresets(updated)
    setEditingId(preset.id)
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2000)
  }

  const handleEditPreset = (p: SavedPreset) => {
    setInhale(p.inhale_sec)
    setHoldIn(p.hold_in_sec)
    setExhale(p.exhale_sec)
    setHoldOut(p.hold_out_sec)
    setCycles(p.cycles)
    setName(p.name)
    setEditingId(p.id)
  }

  const handleClearEdit = () => {
    setEditingId(null)
    setName('')
  }

  const handleDeletePreset = (id: string) => {
    const updated = presets.filter(p => p.id !== id)
    setPresets(updated)
    savePresets(updated)
    if (editingId === id) handleClearEdit()
  }

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-[var(--color-text)]">{t.title}</h3>

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

      <div
        className="flex items-center justify-between rounded-[var(--radius-md)] px-4 py-3"
        style={{ backgroundColor: `${PILLAR_COLOR}15`, border: `1px solid ${PILLAR_COLOR}33` }}
      >
        <span className="text-sm text-[var(--color-text-muted)]">{t.duration}</span>
        <span className="text-sm font-bold" style={{ color: PILLAR_COLOR }}>{totalMinStr}</span>
      </div>

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
          {justSaved ? t.saved : (editingId ? t.update : t.save)}
        </button>
      </div>

      {editingId && (
        <button
          type="button"
          onClick={handleClearEdit}
          className="text-xs underline"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {t.cancelEdit}
        </button>
      )}

      <button
        onClick={() => onStart(buildTechnique())}
        className="w-full py-4 rounded-[var(--radius-md)] font-bold text-white"
        style={{ backgroundColor: PILLAR_COLOR }}
      >
        ▶ {t.start}
      </button>

      {presets.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            {t.savedPresets}
          </p>
          {presets.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 rounded-[var(--radius-md)] px-3 py-3 border border-white/5"
              style={{
                backgroundColor: editingId === p.id ? `${PILLAR_COLOR}18` : 'var(--color-bg-card)',
                borderColor: editingId === p.id ? `${PILLAR_COLOR}55` : undefined,
              }}
            >
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-semibold text-[var(--color-text)] truncate">{p.name}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {p.inhale_sec}–{p.hold_in_sec}–{p.exhale_sec}–{p.hold_out_sec} · {p.cycles}×
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleEditPreset(p)}
                className="w-8 h-8 rounded-lg text-xs font-semibold"
                style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
                aria-label={t.edit}
              >
                ✎
              </button>
              <button
                type="button"
                onClick={() => setExportPreset(p)}
                className="w-8 h-8 rounded-lg text-[10px] font-bold"
                style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }}
                aria-label="JSON"
                title="JSON"
              >
                {'{ }'}
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

      <JsonExportSheet
        isOpen={exportPreset !== null}
        title={exportPreset?.name ?? 'Atem'}
        json={exportPreset ? sessionJsonFromBreathPreset(exportPreset) : ''}
        filename={exportPreset ? slugFilename(exportPreset.name) : undefined}
        accent={PILLAR_COLOR}
        onClose={() => setExportPreset(null)}
      />
    </div>
  )
}
