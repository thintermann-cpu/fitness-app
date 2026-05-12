import { useAuthStore } from '../../store/authStore'
import { getWodTypeLabel } from '../../lib/wodTypeLabels'
import type { Wod } from '../../hooks/useWods'

const TYPE_COLORS: Record<string, string> = {
  AMRAP:   'bg-orange-500/20 text-orange-400',
  ForTime: 'bg-red-500/20 text-red-400',
  EMOM:    'bg-blue-500/20 text-blue-400',
  Tabata:  'bg-purple-500/20 text-purple-400',
}

const DIFFICULTY_DOTS: Record<string, number> = {
  Beginner:     1,
  Intermediate: 2,
  Advanced:     3,
  Elite:        4,
}

interface Props {
  wod: Wod
  onClick: () => void
}

export function WodCard({ wod, onClick }: Props) {
  const lang    = useAuthStore((s) => s.profile?.language ?? 'de')
  const typeCls = TYPE_COLORS[wod.type] ?? 'bg-white/10 text-white/60'
  const dots    = DIFFICULTY_DOTS[wod.difficulty] ?? 2
  const label   = getWodTypeLabel(wod.type, lang)

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-white/5 p-4 active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-[var(--color-text)] text-base leading-tight">
          {wod.name}
        </span>
        <span
          className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full max-w-[160px] truncate ${typeCls}`}
          title={label}
        >
          {label}
        </span>
      </div>

      <p className="mt-1 text-sm text-[var(--color-text-muted)] line-clamp-1">
        {wod.exercises}
      </p>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${i < dots ? 'bg-[#E8642A]' : 'bg-white/15'}`}
            />
          ))}
        </div>
        <span className="text-xs text-[var(--color-text-subtle)]">{wod.difficulty}</span>
        {wod.estimated_minutes > 0 && (
          <>
            <span className="text-[var(--color-text-subtle)] text-xs">·</span>
            <span className="text-xs text-[var(--color-text-subtle)]">~{wod.estimated_minutes} min</span>
          </>
        )}
        <span className="ml-auto text-xs text-[var(--color-text-subtle)] truncate max-w-[100px]">
          {wod.category}
        </span>
      </div>
    </button>
  )
}
