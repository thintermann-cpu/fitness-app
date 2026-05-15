import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { useAuthStore } from '../../store/authStore'

type Lang = 'de' | 'en' | 'es'

const HEADER: Record<Lang, string> = {
  de: 'Zuletzt gemacht',
  en: 'Recently done',
  es: 'Hecho recientemente',
}

function relativeDay(dateStr: string, lang: Lang): string {
  const today = new Date()
  const d     = new Date(dateStr)
  const diffMs = today.setHours(0, 0, 0, 0) - d.setHours(0, 0, 0, 0)
  const diffDays = Math.round(diffMs / 86_400_000)

  if (diffDays <= 0) return { de: 'Heute', en: 'Today',     es: 'Hoy'        }[lang]
  if (diffDays === 1) return { de: 'Gestern', en: 'Yesterday', es: 'Ayer'    }[lang]
  return { de: `vor ${diffDays} Tagen`, en: `${diffDays} days ago`, es: `hace ${diffDays} días` }[lang]
}

interface HistoryEntry {
  id: string
  wod_name: string
  score_value: string
  score_type: string
  completed_at: string
}

export function RecentActivity() {
  const user        = useAuthStore((s) => s.user)
  const { profile } = useAuthStore()
  const lang        = (profile?.language ?? 'de') as Lang

  const { data: entries = [] } = useQuery({
    queryKey: ['recent_activity', user?.id ?? 'anon'],
    staleTime: 5 * 60 * 1000,
    enabled: !!user,
    queryFn: async (): Promise<HistoryEntry[]> => {
      const { data, error } = await supabase
        .from('wod_history')
        .select('id, wod_name, score_value, score_type, completed_at')
        .order('completed_at', { ascending: false })
        .limit(3)

      if (error) return []
      return (data ?? []) as HistoryEntry[]
    },
  })

  if (entries.length === 0) return null

  return (
    <section
      className="rounded-2xl p-4"
      style={{ backgroundColor: 'var(--color-bg-card)' }}
    >
      <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-text-muted)' }}>
        {HEADER[lang]}
      </p>
      <div className="space-y-2.5">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p
                className="text-sm font-semibold truncate"
                style={{ color: 'var(--color-text)' }}
              >
                {entry.wod_name}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {relativeDay(entry.completed_at, lang)}
              </p>
            </div>
            {entry.score_value && (
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: '#E8642A15', color: '#E8642A' }}
              >
                {entry.score_value}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
