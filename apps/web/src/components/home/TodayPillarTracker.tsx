import { useTodayPillars } from '../../hooks/useTodayPillars'
import { useAuthStore } from '../../store/authStore'

type Lang = 'de' | 'en' | 'es'

const PILLARS = [
  { id: 'workout',    label: { de: 'Training',       en: 'Workout',       es: 'Entrenamiento' }, emoji: '💪', color: '#E8642A' },
  { id: 'routine',    label: { de: 'Ritual',          en: 'Ritual',        es: 'Ritual'        }, emoji: '📋', color: '#4A90D9' },
  { id: 'stretching', label: { de: 'Stretch & Yoga',  en: 'Stretch & Yoga', es: 'Estiramiento'  }, emoji: '🤸', color: '#7BC67E' },
  { id: 'meditation', label: { de: 'Meditation',      en: 'Meditation',    es: 'Meditación'    }, emoji: '🧘', color: '#9B7FD4' },
] as const

const HEADER: Record<Lang, (n: number) => string> = {
  de: (n) => `Heute · ${n} von 4 Pillars`,
  en: (n) => `Today · ${n} of 4 pillars`,
  es: (n) => `Hoy · ${n} de 4 pilares`,
}

export function TodayPillarTracker() {
  const { profile }   = useAuthStore()
  const lang          = (profile?.language ?? 'de') as Lang
  const { data, isLoading } = useTodayPillars()

  const total = data?.total ?? 0

  return (
    <section
      className="rounded-2xl p-4"
      style={{ backgroundColor: 'var(--color-bg-card)' }}
    >
      <p className="text-xs font-semibold mb-3" style={{ color: 'var(--color-text-muted)' }}>
        {isLoading ? '…' : HEADER[lang](total)}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {PILLARS.map((p) => {
          const isDone = (data?.[p.id as keyof typeof data] as boolean | undefined) ?? false
          return (
            <div
              key={p.id}
              className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl transition-colors"
              style={{
                backgroundColor: isDone ? `${p.color}20` : 'var(--color-bg-elevated)',
                border: `1px solid ${isDone ? `${p.color}60` : 'transparent'}`,
              }}
            >
              <span className="text-lg leading-none">{p.emoji}</span>
              {isDone ? (
                <span className="text-xs font-bold leading-none" style={{ color: p.color }}>✓</span>
              ) : (
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--color-text-subtle)' }}
                />
              )}
              <span
                className="text-[9px] font-medium leading-tight text-center"
                style={{ color: isDone ? p.color : 'var(--color-text-muted)' }}
              >
                {p.label[lang]}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
