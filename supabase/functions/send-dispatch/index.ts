import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno'
import webpush from 'npm:web-push@3.6.7'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const ZONE = 'Europe/Zurich'

type Pref = {
  user_id: string
  morning_enabled: boolean
  evening_enabled: boolean
  wod_enabled: boolean
  inactivity_enabled: boolean
  morning_time: string
  evening_time: string
  wod_time: string
}

type Sub = { user_id: string; subscription: PushSubscriptionJSON }

function zurichNow() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date())
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return {
    hhmm: `${get('hour')}:${get('minute')}`,
    date: `${get('year')}-${get('month')}-${get('day')}`,
    weekday: weekdayMap[get('weekday')] ?? new Date().getDay(),
  }
}

function inWindow(now: string, target: string) {
  const [nh, nm] = now.split(':').map(Number)
  const [th, tm] = (target || '00:00').slice(0, 5).split(':').map(Number)
  const diff = (nh * 60 + nm) - (th * 60 + tm)
  return diff >= 0 && diff < 15
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )
  const publicKey = Deno.env.get('VAPID_PUBLIC_KEY') ?? ''
  const privateKey = Deno.env.get('VAPID_PRIVATE_KEY') ?? ''

  const authHeader = req.headers.get('Authorization') ?? ''
  const token = authHeader.replace('Bearer ', '')
  const { data: { user } } = await supabase.auth.getUser(token)
  let isAdmin = false
  if (user) {
    const { data: profile } = await supabase.from('user_profiles').select('role').eq('id', user.id).maybeSingle()
    isAdmin = profile?.role === 'admin' || profile?.role === 'moderator'
  }
  const cronSecret = Deno.env.get('DISPATCH_SECRET')
  const isCron = !!cronSecret && req.headers.get('x-dispatch-secret') === cronSecret
  if (!isAdmin && !isCron) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...CORS, 'Content-Type': 'application/json' } })
  }

  const body = await req.json().catch(() => ({})) as {
    mode?: 'tick' | 'broadcast' | 'email'
    title?: string
    body?: string
    subject?: string
  }
  const mode = body.mode ?? 'tick'

  // Newsletter, Zahlung, Konto. Tick und Broadcast schicken nur Push.
  if (mode === 'email') {
    const resendKey = Deno.env.get('RESEND_API_KEY')
    const from = Deno.env.get('NOTIFY_FROM') ?? 'onboarding@resend.dev'
    if (!resendKey) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY fehlt' }), { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } })
    }
    const { data: users } = await supabase.auth.admin.listUsers({ perPage: 1000 })
    const emails = (users?.users ?? []).map((u) => u.email).filter((e): e is string => !!e)
    let sent = 0
    let failed = 0
    for (const email of emails) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          to: [email],
          subject: body.subject || body.title || 'CarveOut',
          html: `<p>${body.body ?? ''}</p>`,
        }),
      })
      if (res.ok) sent += 1
      else failed += 1
    }
    await supabase.from('dispatch_log').insert({ kind: 'email', title: body.subject || body.title || 'Email', body: body.body ?? '', sent_count: sent, error_count: failed })
    return new Response(JSON.stringify({ sent, failed }), { headers: { ...CORS, 'Content-Type': 'application/json' } })
  }

  if (!publicKey || !privateKey) {
    return new Response(JSON.stringify({ error: 'VAPID_PUBLIC_KEY oder VAPID_PRIVATE_KEY fehlt' }), {
      status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
  webpush.setVapidDetails('mailto:t.hintermann@gmail.com', publicKey, privateKey)

  const { data: subs } = await supabase.from('push_subscriptions').select('user_id, subscription')
  const subscriptions = (subs ?? []) as Sub[]

  async function sendOne(sub: Sub, payload: { title: string; body: string; url?: string }) {
    try {
      await webpush.sendNotification(sub.subscription as unknown as webpush.PushSubscription, JSON.stringify(payload))
      return true
    } catch (err) {
      const status = (err as { statusCode?: number }).statusCode
      if (status === 404 || status === 410) {
        await supabase.from('push_subscriptions').delete().eq('user_id', sub.user_id)
      }
      return false
    }
  }

  if (mode === 'broadcast') {
    const payload = { title: body.title || 'CarveOut', body: body.body || '', url: '/home' }
    let sent = 0
    let failed = 0
    for (const sub of subscriptions) {
      if (await sendOne(sub, payload)) sent += 1
      else failed += 1
    }
    await supabase.from('dispatch_log').insert({ kind: 'broadcast', title: payload.title, body: payload.body, sent_count: sent, error_count: failed })
    return new Response(JSON.stringify({ sent, failed }), { headers: { ...CORS, 'Content-Type': 'application/json' } })
  }

  const now = zurichNow()
  const { data: prefs } = await supabase.from('push_preferences').select('*')
  const { data: already } = await supabase.from('dispatch_log').select('kind, title, created_at').gte('created_at', `${now.date}T00:00:00Z`)
  const sentKeys = new Set((already ?? []).map((row) => `${row.kind}`))
  const prefByUser = new Map(((prefs ?? []) as Pref[]).map((p) => [p.user_id, p]))

  let sent = 0
  let failed = 0
  const kindsSent = new Set<string>()

  for (const sub of subscriptions) {
    const pref = prefByUser.get(sub.user_id) ?? {
      user_id: sub.user_id,
      morning_enabled: true,
      evening_enabled: true,
      wod_enabled: false,
      inactivity_enabled: true,
      morning_time: '07:00',
      evening_time: '21:00',
      wod_time: '12:00',
    }
    const jobs: { kind: string; title: string; body: string }[] = []
    if (pref.morning_enabled && inWindow(now.hhmm, pref.morning_time) && !sentKeys.has('morning')) {
      const { data: routines } = await supabase.from('routines').select('name, active_days').eq('user_id', sub.user_id)
      const names = (routines ?? [])
        .filter((r) => ((r.active_days as number[] | null) ?? [0, 1, 2, 3, 4, 5, 6]).includes(now.weekday))
        .map((r) => r.name as string)
      const extra = names.length ? ` Heute: ${names.join(', ')}.` : ''
      jobs.push({ kind: 'morning', title: 'Guten Morgen', body: `Dein Tag bei CarveOut.${extra}` })
    }
    if (pref.evening_enabled && inWindow(now.hhmm, pref.evening_time) && !sentKeys.has('evening')) {
      jobs.push({ kind: 'evening', title: 'Abend', body: 'Kurz den Tag abschliessen?' })
    }
    if (pref.wod_enabled && inWindow(now.hhmm, pref.wod_time) && !sentKeys.has('wod')) {
      jobs.push({ kind: 'wod', title: 'Training', body: 'Dein Workout wartet.' })
    }
    for (const job of jobs) {
      if (await sendOne(sub, { title: job.title, body: job.body, url: '/home' })) {
        sent += 1
        kindsSent.add(job.kind)
      } else failed += 1
    }
  }

  for (const kind of kindsSent) {
    await supabase.from('dispatch_log').insert({ kind, title: kind, body: 'tick', sent_count: sent, error_count: failed })
  }

  return new Response(JSON.stringify({ sent, failed, zone: ZONE, time: now.hhmm }), {
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })
})
