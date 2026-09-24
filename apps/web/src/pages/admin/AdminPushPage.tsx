import { useEffect, useState, type CSSProperties } from 'react'
import { supabase } from '../../lib/supabase'

interface LogRow {
  id: string
  kind: string
  title: string | null
  body: string | null
  sent_count: number
  error_count: number
  created_at: string
}

export function AdminPushPage() {
  const [title, setTitle] = useState('CarveOut')
  const [text, setText] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [logs, setLogs] = useState<LogRow[]>([])

  async function load() {
    const { data } = await supabase.from('dispatch_log').select('*').order('created_at', { ascending: false }).limit(20)
    setLogs((data ?? []) as LogRow[])
  }

  useEffect(() => { void load() }, [])

  async function send(mode: 'broadcast' | 'tick') {
    setStatus('Senden…')
    const { data, error } = await supabase.functions.invoke('send-dispatch', {
      body: mode === 'tick' ? { mode } : { mode, title, body: text },
    })
    if (error) setStatus(error.message)
    else setStatus(JSON.stringify(data))
    await load()
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)' }}>Push Reminders</h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: 14, marginTop: 8 }}>
        Nur Push: Erinnerungen aus den Einstellungen und eine Nachricht an alle Abos. Keine E-Mail.
        Die Uhrzeit gilt in der Stadt aus den Benachrichtigungen. Ohne Stadt: Europe/Zurich. Der private VAPID-Schlüssel liegt in den Supabase-Secrets.
      </p>
      <label style={{ display: 'block', marginTop: 20, fontSize: 13, color: 'var(--color-text-muted)' }}>Titel</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} style={field} />
      <label style={{ display: 'block', marginTop: 12, fontSize: 13, color: 'var(--color-text-muted)' }}>Text</label>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} style={field} />
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button type="button" onClick={() => send('broadcast')} style={btn}>An alle Abos</button>
        <button type="button" onClick={() => send('tick')} style={btnMuted}>Erinnerungen jetzt prüfen</button>
      </div>
      {status && <p style={{ marginTop: 12, fontSize: 13, color: 'var(--color-text)' }}>{status}</p>}
      <h2 style={{ marginTop: 28, fontSize: 16, color: 'var(--color-text)' }}>Letzte Sendungen</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {logs.map((row) => (
          <li key={row.id} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 13, color: 'var(--color-text-muted)' }}>
            {row.kind} · {row.title} · {row.sent_count} ok / {row.error_count} fehler · {new Date(row.created_at).toLocaleString('de-CH')}
          </li>
        ))}
        {logs.length === 0 && <li style={{ color: 'var(--color-text-subtle)', fontSize: 13 }}>Noch nichts verschickt.</li>}
      </ul>
    </div>
  )
}

const field: CSSProperties = {
  width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 10,
  background: 'var(--color-bg-card)', color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.08)',
}
const btn: CSSProperties = { background: '#E8642A', color: 'white', border: 'none', borderRadius: 10, padding: '10px 14px', fontWeight: 700 }
const btnMuted: CSSProperties = { background: 'var(--color-bg-card)', color: 'var(--color-text)', border: 'none', borderRadius: 10, padding: '10px 14px', fontWeight: 600 }
