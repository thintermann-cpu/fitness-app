import type { Meditation } from '../../hooks/useMeditations'

const PILLAR_COLOR = '#9B7FD4'

const CATEGORY_LABELS: Record<string, { de: string; en: string; es: string }> = {
  mindfulness:  { de: 'Achtsamkeit',    en: 'Mindfulness',   es: 'Atención plena' },
  body_scan:    { de: 'Körper-Scan',    en: 'Body Scan',     es: 'Escaneo corporal' },
  sleep:        { de: 'Schlaf',         en: 'Sleep',         es: 'Sueño' },
  focus:        { de: 'Fokus',          en: 'Focus',         es: 'Enfoque' },
  stress_relief:{ de: 'Stressabbau',    en: 'Stress Relief', es: 'Alivio del estrés' },
  morning:      { de: 'Morgen',         en: 'Morning',       es: 'Mañana' },
  visualization:{ de: 'Visualisierung', en: 'Visualization', es: 'Visualización' },
  movement:     { de: 'Bewegung',       en: 'Movement',      es: 'Movimiento' },
  breathwork:   { de: 'Atemarbeit',     en: 'Breathwork',    es: 'Respiración' },
}

const DIFFICULTY_DOTS: Record<string, number> = {
  beginner:     1,
  intermediate: 2,
  advanced:     3,
}

const SOUND_ICON: Record<string, string> = {
  rain:        '🌧',
  forest:      '🌲',
  waves:       '🌊',
  white_noise: '〰',
  bowl:        '🔔',
  silence:     '🔇',
}

type Lang = 'de' | 'en' | 'es'

interface Props {
  meditation: Meditation
  lang: Lang
  onClick: () => void
}

export function MeditationCard({ meditation, lang, onClick }: Props) {
  const catLabels = CATEGORY_LABELS[meditation.category]
  const catLabel  = catLabels ? catLabels[lang] : meditation.category
  const dots      = DIFFICULTY_DOTS[meditation.difficulty] ?? 1
  const soundIcon = meditation.background_sound ? (SOUND_ICON[meditation.background_sound] ?? '') : ''

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-white/5 p-4 active:scale-[0.98] transition-transform"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-semibold text-[var(--color-text)] text-base leading-tight">
          {meditation.name}
        </span>
        <span
          className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${PILLAR_COLOR}22`, color: PILLAR_COLOR }}
        >
          {catLabel}
        </span>
      </div>

      <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-3">
        {meditation.description}
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
          {meditation.difficulty}
        </span>
        <span className="text-[var(--color-text-subtle)] text-xs">·</span>
        <span className="text-xs text-[var(--color-text-subtle)]">
          {meditation.duration_min} min
        </span>
        {soundIcon && (
          <>
            <span className="text-[var(--color-text-subtle)] text-xs">·</span>
            <span className="text-xs">{soundIcon}</span>
          </>
        )}
      </div>
    </button>
  )
}
