import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const resendApiKey = Deno.env.get('RESEND_API_KEY')
  const notifyTo     = Deno.env.get('NOTIFY_TO')   ?? 't.hintermann@gmail.com'
  const notifyFrom   = Deno.env.get('NOTIFY_FROM') ?? 'onboarding@resend.dev'

  if (!resendApiKey) {
    console.error('[notify-feedback] RESEND_API_KEY not configured')
    return new Response(JSON.stringify({ error: 'RESEND_API_KEY not configured' }), { status: 500 })
  }

  let payload: Record<string, unknown>
  try {
    payload = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  // Supabase DB Webhook wraps the row in payload.record
  const record = (payload.record as Record<string, unknown>) ?? payload
  const { kategorie, message, user_id, created_at } = record as {
    kategorie?: string
    message?: string
    user_id?: string
    created_at?: string
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: notifyFrom,
      to:   [notifyTo],
      subject: `CarveOut Feedback — ${kategorie ?? 'unbekannt'}`,
      html: `
        <h2 style="color:#E8642A">Neues Feedback in CarveOut</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0;color:#888">Kategorie</td><td><strong>${kategorie ?? '—'}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888">Nachricht</td><td>${message ?? '—'}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888">User</td><td>${user_id ?? 'anonym'}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#888">Zeit</td><td>${created_at ?? '—'}</td></tr>
        </table>
      `,
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('[notify-feedback] Resend error:', error)
    return new Response(JSON.stringify({ error }), { status: 502 })
  }

  return new Response(JSON.stringify({ sent: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
