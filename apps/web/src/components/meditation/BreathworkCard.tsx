import type { BreathworkTechnique } from '../../hooks/useMeditations'

const PILLAR_COLOR = '#9B7FD4'

const DIFFICULTY_DOTS: Record<string, number> = {
  beginner:     1,
  intermediate: 2,
  advanced:     3,
}

const T = {
  de: { cycles: 'Zyklen', inhale: 'Ein', hold: 'Halt', exhale: 'Aus' },
  en: { cycles: 'cycles', inhale: 'In',  hold: 'Hold', exhale: 'Out' },
  es: { cycles: 'ciclos', inhale: 'Entr', hold: 'Ret', exhale: 'Sal' },
}

type Lang = 'de' | 'en' | 'es'

interface Props {
  technique: BreathworkTechnique
  lang: Lang
  onClick: () => void
}

export function BreathworkCard({ technique, lang, onClick }: Props) {
  const t    = T[lang]
  const dots = DIFFICULTY_DOTS[technique.difficulty] ?? 1

  const pattern = [
    `${technique.inhale_sec} ${t.inhale}`,
    technique.hold_in_sec > 0  ? `${technique.hold_in_sec} ${t.hold}` : null,
    `${technique.exhale_sec} ${t.exhale}`,
    technique.hold_out_sec > 0 ? `${technique.hold_out_sec} ${t.hold}` : null,
  ].filter(Boolean).join(' – ')

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-white/5 p-4 active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-semibold text-[var(--color-text)] text-base leading-tight">
          {technique.name}
        </span>
        <span
          className="shrink-0 text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${PILLAR_COLOR}22`, color: PILLAR_COLOR }}
        >
          {pattern}
        </span>
      </div>

      <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-3">
        {technique.description}
      </p>

      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: i < dots ? PILLAR_COLOR : 'rgba(255,255,255,0.15)' }}
            />
          ))}
        </div>
        <span className="text-xs text-[var(--color-text-subtle)] capitalize">
          {technique.difficulty}
        </span>
        <span className="text-[var(--color-text-subtle)] text-xs">·</span>
        <span className="text-xs text-[var(--color-text-subtle)]">
          {technique.cycles} {t.cycles}
        </span>
      </div>
    </button>
  )
}
