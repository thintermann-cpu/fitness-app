import type { Routine } from '../../hooks/useRoutines'

const PILLAR_COLORS: Record<string, string> = {
  workout:    '#E8642A',
  routine:    '#4A90D9',
  stretching: '#7BC67E',
  meditation: '#9B7FD4',
}

interface Props {
  routine: Routine
  isCompleted: boolean
  onToggle: () => void
  onEdit: () => void
  onPillarNavigate?: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  isFirst: boolean
  isLast: boolean
}

function linkIcon(url: string): string {
  if (url.includes('spotify')) return '🎵'
  if (url.includes('youtube')) return '▶'
  return '🔗'
}

export function RoutineItem({
  routine,
  isCompleted,
  onToggle,
  onEdit,
  onPillarNavigate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: Props) {
  const hasLink   = !!routine.link_url
  const pillar    = routine.linked_pillar ?? null
  const pillarColor = pillar ? (PILLAR_COLORS[pillar] ?? '#9a9288') : null
  const mainAction = pillar && onPillarNavigate ? onPillarNavigate : onEdit

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '11px 13px',
        background: isCompleted ? 'rgba(74,144,217,0.12)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${isCompleted ? 'rgba(74,144,217,0.36)' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 12,
        transition: 'all 0.2s',
        borderLeft: pillarColor ? `3px solid ${pillarColor}` : undefined,
      }}
    >
      {/* Move up/down arrows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, flexShrink: 0 }}>
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          style={{
            background: 'none',
            border: 'none',
            color: isFirst ? 'rgba(255,255,255,0.1)' : '#5a5248',
            cursor: isFirst ? 'default' : 'pointer',
            fontSize: 9,
            padding: '2px 4px',
            lineHeight: 1,
          }}
        >
          ▲
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          style={{
            background: 'none',
            border: 'none',
            color: isLast ? 'rgba(255,255,255,0.1)' : '#5a5248',
            cursor: isLast ? 'default' : 'pointer',
            fontSize: 9,
            padding: '2px 4px',
            lineHeight: 1,
          }}
        >
          ▼
        </button>
      </div>

      {/* Main content — navigates to pillar if linked, else opens edit */}
      <div
        onClick={mainAction}
        style={{ display: 'flex', alignItems: 'center', gap: 11, flex: 1, cursor: 'pointer' }}
      >
        <span style={{ fontSize: 19, opacity: isCompleted ? 1 : 0.5 }}>{routine.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: isCompleted ? '#a8c8f0' : '#9a9288' }}>
            {routine.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
            {routine.time && (
              <span style={{ fontSize: 11, color: '#5a5248' }}>⏰ {routine.time}</span>
            )}
            {pillarColor && (
              <span
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  backgroundColor: pillarColor, flexShrink: 0,
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {/* Edit button — always available when pillar nav is active */}
        {pillar && (
          <button
            onClick={(e) => { e.stopPropagation(); onEdit() }}
            style={{
              background: 'none',
              border: 'none',
              color: '#5a5248',
              fontSize: 13,
              cursor: 'pointer',
              padding: '4px 6px',
              lineHeight: 1,
            }}
            title="Bearbeiten"
          >
            ✎
          </button>
        )}
        {hasLink && (
          <a
            href={routine.link_url!}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              padding: '4px 9px',
              background: 'rgba(74,144,217,0.12)',
              border: '1px solid rgba(74,144,217,0.25)',
              borderRadius: 6,
              color: '#4A90D9',
              fontSize: 13,
              textDecoration: 'none',
            }}
          >
            {linkIcon(routine.link_url!)}
          </a>
        )}
        {/* Checkbox */}
        <button
          onClick={e => { e.stopPropagation(); onToggle() }}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 44,
            minHeight: 44,
            flexShrink: 0,
            touchAction: 'manipulation',
          }}
        >
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: isCompleted ? 'none' : '2px solid rgba(255,255,255,0.15)',
              background: isCompleted ? '#4A90D9' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              color: 'white',
            }}
          >
            {isCompleted && '✓'}
          </span>
        </button>
      </div>
    </div>
  )
}
