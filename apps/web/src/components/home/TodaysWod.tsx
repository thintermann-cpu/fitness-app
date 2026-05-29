import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { EDITORS_PICK_IDS } from '../../hooks/useWods'
import { useAuthStore } from '../../store/authStore'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

type Lang = 'de' | 'en' | 'es'

interface RawWod {
  id: string
  name: string
  typ: string
  dauer: string
  beschreibung: string
  schwierigkeit?: string
  is_editors_pick?: boolean | null
}

const LABELS: Record<Lang, {
  badge: string; cta: string; header: string
  headerAdapted: string; pushBadge: string
  relaxHeading: string; relaxSub: string
  mobilityBtn: string; mindfulBtn: string
}> = {
  de: {
    badge:         "Editor's Pick ⭐",
    cta:           'Workout starten',
    header:        'Workout des Tages',
    headerAdapted: 'Workout des Tages · angepasst',
    pushBadge:     'Push Hard 🔥',
    relaxHeading:  'Gönn dir heute Erholung',
    relaxSub:      'Dein letztes Mood zeigt Erschöpfung oder Stress. Eine sanfte Session ist jetzt wertvoller als hartes Training.',
    mobilityBtn:   '🤸 Mobilität',
    mindfulBtn:    '🧘 Achtsamkeit',
  },
  en: {
    badge:         "Editor's Pick ⭐",
    cta:           'Start WOD',
    header:        "Today's WOD",
    headerAdapted: "Today's WOD · adapted",
    pushBadge:     'Push Hard 🔥',
    relaxHeading:  'Take it easy today',
    relaxSub:      'Your recent mood shows tiredness or stress. A gentle session is more valuable than pushing hard right now.',
    mobilityBtn:   '🤸 Mobility',
    mindfulBtn:    '🧘 Mindfulness',
  },
  es: {
    badge:         "Editor's Pick ⭐",
    cta:           'Empezar WOD',
    header:        'WOD del día',
    headerAdapted: 'WOD del día · adaptado',
    pushBadge:     '¡Empuja fuerte! 🔥',
    relaxHeading:  'Tómatelo con calma hoy',
    relaxSub:      'Tu estado de ánimo muestra cansancio o estrés. Una sesión suave es más valiosa ahora.',
    mobilityBtn:   '🤸 Movilidad',
    mindfulBtn:    '🧘 Atención',
  },
}

const LOW_MOODS  = new Set(['Müde', 'Gestresst'])
const HIGH_MOODS = new Set(['Super'])

function pickByDate<T>(list: T[]): T {
  const d = new Date()
  const seed = parseInt(
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`,
    10,
  )
  return list[seed % list.length]
}

function dateStr(offset = 0): string {
  const d = new Date()
  d.setDate(d.getDate() - offset)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function TodaysWod() {
  const navigate       = useNavigate()
  const { profile, user } = useAuthStore()
  const lang           = (profile?.language ?? 'de') as Lang
  const labels         = LABELS[lang]
  const userId         = user?.id ?? null

  const { data: wod } = useQuery({
    queryKey: ['todays_wod'],
    staleTime: 60 * 60 * 1000,
    queryFn: async () => {
      const resp = await fetch('/wods.json')
      const all: RawWod[] = await resp.json()
      const picks = all.filter(
        (w) => w.is_editors_pick === true || EDITORS_PICK_IDS.has(w.id),
      )
      if (picks.length === 0) return null
      return pickByDate(picks)
    },
  })

  const { data: recentMood } = useQuery({
    queryKey: ['recent_mood_wod', userId ?? 'anon'],
    enabled: !!userId && isSupabaseConfigured,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data } = await supabase
        .from('daily_logs')
        .select('mood, date')
        .eq('user_id', userId!)
        .in('date', [dateStr(0), dateStr(1)])
        .not('mood', 'is', null)
        .order('date', { ascending: false })
        .limit(1)
        .maybeSingle()
      return (data?.mood as string | null) ?? null
    },
  })

  if (!wod) return null

  const isLowMood  = recentMood !== undefined && LOW_MOODS.has(recentMood ?? '')
  const isHighMood = recentMood !== undefined && HIGH_MOODS.has(recentMood ?? '')

  // ── Low mood: relaxing session card ─────────────────────────────────────────
  if (isLowMood) {
    return (
      <section
        className="rounded-2xl p-4"
        style={{ backgroundColor: 'var(--color-bg-card)' }}
      >
        <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-text-muted)' }}>
          {labels.headerAdapted}
        </p>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🌿</span>
          <div>
            <h3 className="font-bold text-base leading-tight" style={{ color: 'var(--color-text)' }}>
              {labels.relaxHeading}
            </h3>
          </div>
        </div>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {labels.relaxSub}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/stretching')}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: '#7BC67E22', color: '#7BC67E' }}
          >
            {labels.mobilityBtn}
          </button>
          <button
            onClick={() => navigate('/meditation')}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: '#9B7FD422', color: '#9B7FD4' }}
          >
            {labels.mindfulBtn}
          </button>
        </div>
      </section>
    )
  }

  // ── Normal / high-mood WOD card ──────────────────────────────────────────────
  const duration = parseInt(wod.dauer) || 0
  const preview  = (wod.beschreibung ?? '').slice(0, 80)

  return (
    <section
      className="rounded-2xl p-4"
      style={{ backgroundColor: 'var(--color-bg-card)' }}
    >
      <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-muted)' }}>
        {labels.header}
      </p>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-bold text-base leading-tight" style={{ color: 'var(--color-text)' }}>
          {wod.name}
        </h3>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: '#E8642A20', color: '#E8642A' }}
        >
          {wod.typ}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#E8642A15', color: '#E8642A' }}>
          {labels.badge}
        </span>
        {isHighMood && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#E8642A30', color: '#E8642A' }}>
            {labels.pushBadge}
          </span>
        )}
        {duration > 0 && (
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            ⏱ {duration} min
          </span>
        )}
      </div>
      {preview && (
        <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          {preview}{wod.beschreibung.length > 80 ? '…' : ''}
        </p>
      )}
      <button
        onClick={() => navigate(`/workout/${encodeURIComponent(wod.name)}`)}
        className="px-4 py-2 rounded-xl text-sm font-semibold transition-opacity active:opacity-70"
        style={{ backgroundColor: '#E8642A22', color: '#E8642A' }}
      >
        {labels.cta}
      </button>
    </section>
  )
}
