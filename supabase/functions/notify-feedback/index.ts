/**
 * Supabase Edge Function: notify-feedback
 *
 * Called by a Database Webhook on INSERT to the `feedback` table.
 * Sends an email notification via Resend API.
 *
 * Required env vars (set in Supabase Dashboard → Edge Functions → Secrets):
 *   RESEND_API_KEY  — from resend.com
 *   NOTIFY_TO       — recipient email (e.g. t.hintermann@gmail.com)
 *   NOTIFY_FROM     — verified sender (e.g. noreply@carveout.app)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const NOTIFY_TO      = Deno.env.get('NOTIFY_TO')      ?? ''
const NOTIFY_FROM    = Deno.env.get('NOTIFY_FROM')    ?? 'noreply@carveout.app'

interface FeedbackPayload {
  type: 'INSERT'
  table: string
  record: {
    id: string
    user_id: string | null
    category: string
    message: string
    created_at: string
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  bug:  '🐛 Bug',
  idee: '💡 Idee',
  lob:  '👍 Lob',
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  let payload: FeedbackPayload
  try {
    payload = await req.json()
  } catch {
    return new Response('Bad Request', { status: 400 })
  }

  const { record } = payload
  const catLabel = CATEGORY_LABELS[record.category] ?? record.category
  const subject  = `[CarveOut Feedback] ${catLabel}`
  const html     = `
    <h2>Neues Feedback erhalten</h2>
    <p><strong>Kategorie:</strong> ${catLabel}</p>
    <p><strong>Nachricht:</strong></p>
    <blockquote>${record.message.replace(/\n/g, '<br>')}</blockquote>
    <hr>
    <p style="color:#888;font-size:12px">
      User ID: ${record.user_id ?? 'anonym'}<br>
      Zeit: ${record.created_at}
    </p>
  `

  if (!RESEND_API_KEY || !NOTIFY_TO) {
    console.warn('notify-feedback: missing RESEND_API_KEY or NOTIFY_TO — skipping email')
    return new Response(JSON.stringify({ skipped: true }), { status: 200 })
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: NOTIFY_FROM,
      to:   [NOTIFY_TO],
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    console.error('Resend error:', body)
    return new Response(JSON.stringify({ error: body }), { status: 500 })
  }

  return new Response(JSON.stringify({ sent: true }), { status: 200 })
})
