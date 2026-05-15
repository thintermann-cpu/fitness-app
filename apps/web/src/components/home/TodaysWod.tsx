import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { EDITORS_PICK_IDS } from '../../hooks/useWods'
import { useAuthStore } from '../../store/authStore'

type Lang = 'de' | 'en' | 'es'

interface RawWod {
  id: string
  name: string
  typ: string
  dauer: string
  beschreibung: string
  is_editors_pick?: boolean | null
}

const LABELS: Record<Lang, { badge: string; cta: string; header: string }> = {
  de: { badge: "Editor's Pick ⭐", cta: 'WOD starten', header: 'WOD des Tages' },
  en: { badge: "Editor's Pick ⭐", cta: 'Start WOD',   header: "Today's WOD"   },
  es: { badge: "Editor's Pick ⭐", cta: 'Empezar WOD', header: 'WOD del día'   },
}

function pickByDate<T>(list: T[]): T {
  const d = new Date()
  const seed = parseInt(
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`,
    10,
  )
  return list[seed % list.length]
}

export function TodaysWod() {
  const navigate    = useNavigate()
  const { profile } = useAuthStore()
  const lang        = (profile?.language ?? 'de') as Lang
  const labels      = LABELS[lang]

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

  if (!wod) return null

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
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#E8642A15', color: '#E8642A' }}>
          {labels.badge}
        </span>
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
