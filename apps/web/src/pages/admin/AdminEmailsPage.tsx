import { useState, type CSSProperties } from 'react'
import { supabase } from '../../lib/supabase'

export function AdminEmailsPage() {
  const [subject, setSubject] = useState('CarveOut')
  const [text, setText] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function send() {
    setStatus('Senden…')
    const { data, error } = await supabase.functions.invoke('send-dispatch', {
      body: { mode: 'email', subject, body: text },
    })
    setStatus(error ? error.message : JSON.stringify(data))
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)' }}>Emails</h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 14, marginTop: 8 }}>
        Geht über Resend an alle Konten mit E-Mail. Absender ist das Secret NOTIFY_FROM.
      </p>
      <label style={{ display: 'block', marginTop: 20, fontSize: 13, color: 'var(--color-text-muted)' }}>Betreff</label>
      <input value={subject} onChange={(e) => setSubject(e.target.value)} style={field} />
      <label style={{ display: 'block', marginTop: 12, fontSize: 13, color: 'var(--color-text-muted)' }}>Text</label>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} style={field} />
      <button type="button" onClick={send} style={btn}>An alle senden</button>
      {status && <p style={{ marginTop: 12, fontSize: 13, color: 'var(--color-text)' }}>{status}</p>}
    </div>
  )
}

const field: CSSProperties = {
  width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 10,
  background: 'var(--color-bg-card)', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.08)',
}
const btn: CSSProperties = { marginTop: 12, background: '#E8642A', color: 'white', border: 'none', borderRadius: 10, padding: '10px 14px', fontWeight: 700 }
