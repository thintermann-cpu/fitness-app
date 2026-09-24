import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface Row {
  id: string
  category: string
  message: string
  created_at: string
  user_id: string | null
}

export function AdminFeedbackPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    supabase.from('feedback').select('id, category, message, created_at, user_id').order('created_at', { ascending: false }).limit(50)
      .then(({ data, error: err }) => {
        if (err) setError(err.message)
        else setRows((data ?? []) as Row[])
      })
  }, [])

  return (
    <div style={{ maxWidth: 720 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text)' }}>Feedback</h1>
      {error && <p style={{ color: '#E8642A' }}>{error}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {rows.map((row) => (
          <li key={row.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <p style={{ margin: 0, fontSize: 12, color: '#E8642A' }}>{row.category} · {new Date(row.created_at).toLocaleString('de-CH')}</p>
            <p style={{ margin: '4px 0 0', color: 'var(--color-text)', fontSize: 14 }}>{row.message}</p>
          </li>
        ))}
        {rows.length === 0 && !error && <li style={{ color: 'var(--color-text-subtle)' }}>Kein Feedback.</li>}
      </ul>
    </div>
  )
}
