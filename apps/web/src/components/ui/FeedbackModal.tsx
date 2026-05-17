import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'

type Category = 'bug' | 'idee' | 'lob'

const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: 'bug',  label: 'Bug',  emoji: '🐛' },
  { id: 'idee', label: 'Idee', emoji: '💡' },
  { id: 'lob',  label: 'Lob',  emoji: '🙌' },
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function FeedbackModal({ isOpen, onClose }: Props) {
  const { user } = useAuthStore()
  const { addToast } = useToastStore()
  const [category, setCategory] = useState<Category>('idee')
  const [message, setMessage]   = useState('')
  const [sending, setSending]   = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!message.trim()) return
    setSending(true)
    try {
      const record = {
        user_id:    user?.id ?? null,
        category,
        message:    message.trim(),
        created_at: new Date().toISOString(),
      }
      const { error } = await supabase.from('feedback').insert({
        user_id:  record.user_id,
        category: record.category,
        message:  record.message,
      })
      if (error) throw error
      void fetch('https://ipkazxttlkiufgsdyjdw.supabase.co/functions/v1/notify-feedback', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ record }),
      })
      addToast({ type: 'success', message: 'Danke für dein Feedback! 🙏' })
      setMessage('')
      onClose()
    } catch (err) {
      const detail = err instanceof Error ? err.message : JSON.stringify(err)
      addToast({ type: 'error', message: `Fehler: ${detail}` })
    } finally {
      setSending(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'flex-end',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          margin: '0 auto',
          background: 'var(--color-bg-elevated)',
          borderRadius: '20px 20px 0 0',
          padding: '24px 20px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--color-text)' }}>
            Feedback
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 20, cursor: 'pointer', padding: '4px 8px' }}
          >
            ✕
          </button>
        </div>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: 8 }}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              style={{
                flex: 1,
                padding: '9px 4px',
                borderRadius: 10,
                background: category === c.id ? 'rgba(74,144,217,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1.5px solid ${category === c.id ? '#4A90D9' : 'transparent'}`,
                color: category === c.id ? '#4A90D9' : 'var(--color-text-muted)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Was liegt dir auf dem Herzen?"
          rows={5}
          style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            color: 'var(--color-text)',
            fontSize: 14,
            fontFamily: 'inherit',
            outline: 'none',
            resize: 'none',
            boxSizing: 'border-box',
          }}
        />

        <button
          onClick={handleSubmit}
          disabled={!message.trim() || sending}
          style={{
            padding: '14px',
            background: message.trim() && !sending ? '#4A90D9' : 'rgba(74,144,217,0.3)',
            border: 'none',
            borderRadius: 12,
            color: 'white',
            fontSize: 15,
            fontWeight: 700,
            cursor: message.trim() && !sending ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
          }}
        >
          {sending ? 'Sendet…' : 'Abschicken'}
        </button>
      </div>
    </div>
  )
}
