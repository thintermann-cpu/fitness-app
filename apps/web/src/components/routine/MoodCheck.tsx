import { useState } from 'react'

const MOODS = [
  { emoji: '😄', label: 'Super',     color: '#6fcf6f' },
  { emoji: '🙂', label: 'Gut',       color: '#a8d87a' },
  { emoji: '😐', label: 'Ok',        color: '#d4af37' },
  { emoji: '😔', label: 'Müde',      color: '#e08c50' },
  { emoji: '😤', label: 'Gestresst', color: '#e06060' },
]

interface Props {
  mood: string | null
  moodComment: string | null
  onSave: (mood: string, comment: string) => void
}

export function MoodCheck({ mood, moodComment, onSave }: Props) {
  const [selected, setSelected] = useState<string | null>(mood)
  const [comment, setComment] = useState(moodComment ?? '')
  const [saved, setSaved] = useState(!!mood)

  const handleSave = () => {
    if (!selected) return
    onSave(selected, comment)
    setSaved(true)
  }

  const savedMood = MOODS.find(m => m.label === mood)

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '10px 11px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        height: '100%',
      }}
    >
      <div style={{ fontSize: 9, letterSpacing: 2, color: '#6a6258', textTransform: 'uppercase' }}>
        😊 Befinden
      </div>

      <div style={{ display: 'flex', gap: 3 }}>
        {MOODS.map(m => (
          <button
            key={m.label}
            onClick={() => { setSelected(m.label); setSaved(false) }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              padding: '5px 2px',
              borderRadius: 7,
              cursor: 'pointer',
              background: selected === m.label ? `${m.color}22` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${selected === m.label ? `${m.color}88` : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            <span style={{ fontSize: 14 }}>{m.emoji}</span>
            <span style={{ fontSize: 8, color: selected === m.label ? m.color : '#4a4238' }}>
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {selected && !saved && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <input
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Kommentar..."
            style={{
              width: '100%',
              padding: '6px 8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: '#e8e0d4',
              fontSize: 11,
              fontFamily: 'inherit',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: '6px',
              width: '100%',
              background: 'rgba(74,144,217,0.18)',
              border: '1px solid rgba(74,144,217,0.36)',
              borderRadius: 6,
              color: '#4A90D9',
              fontSize: 11,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            OK ↓
          </button>
        </div>
      )}

      {saved && savedMood && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: 11, color: '#7a7268' }}>
            {savedMood.emoji} {savedMood.label}
            {moodComment && (
              <div style={{ fontSize: 10, color: '#5a5248', marginTop: 1 }}>{moodComment}</div>
            )}
          </span>
          <button
            onClick={() => setSaved(false)}
            style={{ background: 'none', border: 'none', color: '#4a4238', fontSize: 10, cursor: 'pointer' }}
          >
            ✎
          </button>
        </div>
      )}
    </div>
  )
}
