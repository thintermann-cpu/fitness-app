import { useState } from 'react'
import type { Routine, Category } from '../../hooks/useRoutines'

type Lang = 'de' | 'en' | 'es'

const PILLAR_COLOR = '#4A90D9'
const CATEGORIES: Category[] = ['morning', 'day', 'evening']
// Day order: Mo(1), Di(2), Mi(3), Do(4), Fr(5), Sa(6), So(0)
const DAYS_ORDER = [1, 2, 3, 4, 5, 6, 0]

const T = {
  de: {
    back: '← Zurück',
    title: 'Routine bearbeiten',
    iconLabel: 'Icon (Emoji)',
    nameLabel: 'Name',
    timeLabel: 'Tageszeit',
    daysLabel: 'Aktive Tage',
    linkLabel: 'Link URL (optional)',
    save: 'Speichern',
    deleteBtn: 'Routine löschen',
    confirmMsg: 'Diese Routine wirklich löschen?',
    cancel: 'Abbrechen',
    confirmDel: 'Löschen',
    morning: '🌅 Morgen',
    day: '☀️ Tag',
    evening: '🌙 Abend',
    dayLabels: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
  },
  en: {
    back: '← Back',
    title: 'Edit Routine',
    iconLabel: 'Icon (Emoji)',
    nameLabel: 'Name',
    timeLabel: 'Time of Day',
    daysLabel: 'Active Days',
    linkLabel: 'Link URL (optional)',
    save: 'Save',
    deleteBtn: 'Delete Routine',
    confirmMsg: 'Really delete this routine?',
    cancel: 'Cancel',
    confirmDel: 'Delete',
    morning: '🌅 Morning',
    day: '☀️ Day',
    evening: '🌙 Evening',
    dayLabels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  },
  es: {
    back: '← Volver',
    title: 'Editar rutina',
    iconLabel: 'Icono (Emoji)',
    nameLabel: 'Nombre',
    timeLabel: 'Momento del día',
    daysLabel: 'Días activos',
    linkLabel: 'URL de enlace (opcional)',
    save: 'Guardar',
    deleteBtn: 'Eliminar rutina',
    confirmMsg: '¿Eliminar esta rutina?',
    cancel: 'Cancelar',
    confirmDel: 'Eliminar',
    morning: '🌅 Mañana',
    day: '☀️ Día',
    evening: '🌙 Tarde',
    dayLabels: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'],
  },
} as const

interface Props {
  routine: Routine
  lang: Lang
  onSave: (updates: Partial<Routine> & { id: string }) => void
  onDelete?: (id: string) => void
  onBack: () => void
}

export function RoutineEditModal({ routine, lang, onSave, onDelete, onBack }: Props) {
  const t = T[lang] ?? T.de

  const [name, setName]           = useState(routine.name)
  const [icon, setIcon]           = useState(routine.icon)
  const [category, setCategory]   = useState<Category>(routine.category)
  const [activeDays, setActiveDays] = useState<number[]>(routine.active_days)
  const [time, setTime]           = useState(routine.time ?? '')
  const [linkUrl, setLinkUrl]     = useState(routine.link_url ?? '')
  const [confirmDelete, setConfirmDelete] = useState(false)

  const toggleDay = (day: number) =>
    setActiveDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])

  const handleSave = () => {
    onSave({
      id: routine.id,
      name: name.trim() || routine.name,
      icon: icon.trim() || routine.icon,
      category,
      active_days: activeDays,
      time: time || null,
      link_url: linkUrl.trim() || null,
    })
    onBack()
  }

  const handleDelete = () => {
    onDelete?.(routine.id)
    onBack()
  }

  const catLabel: Record<Category, string> = {
    morning: t.morning,
    day: t.day,
    evening: t.evening,
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '10px 12px',
    color: '#f0e8d8',
    fontSize: 15,
    fontFamily: 'var(--font-sans)',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    color: '#6a6258',
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: 'uppercase',
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'linear-gradient(135deg,#0D0D14 0%,#13131e 50%,#0f1622 100%)',
        zIndex: 50,
        overflowY: 'auto',
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-text)',
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      <div style={{ padding: '18px 18px 100px' }}>
        {/* Back */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: PILLAR_COLOR,
            fontSize: 14,
            cursor: 'pointer',
            fontFamily: 'inherit',
            padding: '8px 0',
            marginBottom: 16,
          }}
        >
          {t.back}
        </button>

        <h2 style={{ fontSize: 20, fontWeight: 600, color: '#f0e8d8', marginBottom: 20 }}>
          {t.title}
        </h2>

        {/* Icon preview */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 48 }}>{icon}</div>
        </div>

        {/* Icon input */}
        <label style={{ display: 'block', marginBottom: 14 }}>
          <div style={labelStyle}>{t.iconLabel}</div>
          <input
            value={icon}
            onChange={e => setIcon(e.target.value)}
            maxLength={4}
            style={{ ...inputStyle, fontSize: 22 }}
          />
        </label>

        {/* Name input */}
        <label style={{ display: 'block', marginBottom: 18 }}>
          <div style={labelStyle}>{t.nameLabel}</div>
          <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
        </label>

        {/* Category chips */}
        <div style={{ marginBottom: 18 }}>
          <div style={labelStyle}>{t.timeLabel}</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  flex: 1,
                  padding: '9px 4px',
                  background: category === cat ? 'rgba(74,144,217,0.18)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${category === cat ? 'rgba(74,144,217,0.5)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10,
                  color: category === cat ? '#4A90D9' : '#7a7268',
                  fontSize: 11,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {catLabel[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Day chips */}
        <div style={{ marginBottom: 18 }}>
          <div style={labelStyle}>{t.daysLabel}</div>
          <div style={{ display: 'flex', gap: 5 }}>
            {DAYS_ORDER.map((day, idx) => {
              const active = activeDays.includes(day)
              return (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  style={{
                    flex: 1,
                    padding: '8px 2px',
                    background: active ? 'rgba(74,144,217,0.18)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? 'rgba(74,144,217,0.5)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 8,
                    color: active ? '#4A90D9' : '#6a6258',
                    fontSize: 10,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {t.dayLabels[idx]}
                </button>
              )
            })}
          </div>
        </div>

        {/* Time */}
        <label style={{ display: 'block', marginBottom: 18 }}>
          <div style={labelStyle}>Uhrzeit (optional)</div>
          <input
            value={time}
            onChange={e => setTime(e.target.value)}
            type="time"
            style={{ ...inputStyle, colorScheme: 'dark' }}
          />
        </label>

        {/* Link URL */}
        <label style={{ display: 'block', marginBottom: 28 }}>
          <div style={labelStyle}>{t.linkLabel}</div>
          <input
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            placeholder="https://..."
            type="url"
            style={{ ...inputStyle, fontSize: 13 }}
          />
        </label>

        {/* Save */}
        <button
          onClick={handleSave}
          style={{
            width: '100%',
            padding: 13,
            background: PILLAR_COLOR,
            border: 'none',
            borderRadius: 12,
            color: 'white',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            marginBottom: 12,
          }}
        >
          {t.save}
        </button>

        {/* Delete */}
        {onDelete && !confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            style={{
              width: '100%',
              padding: 11,
              background: 'rgba(220,60,60,0.1)',
              border: '1px solid rgba(220,60,60,0.25)',
              borderRadius: 12,
              color: '#dc3c3c',
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {t.deleteBtn}
          </button>
        ) : onDelete && (
          <div
            style={{
              background: 'rgba(220,60,60,0.1)',
              border: '1px solid rgba(220,60,60,0.25)',
              borderRadius: 12,
              padding: 14,
            }}
          >
            <div style={{ fontSize: 13, color: '#dc6060', marginBottom: 10, textAlign: 'center' }}>
              {t.confirmMsg}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setConfirmDelete(false)}
                style={{
                  flex: 1,
                  padding: 9,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 9,
                  color: '#9a9288',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {t.cancel}
              </button>
              <button
                onClick={handleDelete}
                style={{
                  flex: 1,
                  padding: 9,
                  background: 'rgba(220,60,60,0.25)',
                  border: '1px solid rgba(220,60,60,0.4)',
                  borderRadius: 9,
                  color: '#dc3c3c',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {t.confirmDel}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`input::placeholder { color: #3a3228 }`}</style>
    </div>
  )
}
