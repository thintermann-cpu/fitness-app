import type { Routine } from '../../hooks/useRoutines'

interface Props {
  routine: Routine
  isCompleted: boolean
  onToggle: () => void
  onEdit: () => void
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
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: Props) {
  const hasLink = !!routine.link_url

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

      {/* Main area — tap opens edit */}
      <div
        onClick={onEdit}
        style={{ display: 'flex', alignItems: 'center', gap: 11, flex: 1, cursor: 'pointer' }}
      >
        <span style={{ fontSize: 19, opacity: isCompleted ? 1 : 0.5 }}>{routine.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: isCompleted ? '#a8c8f0' : '#9a9288' }}>
            {routine.name}
          </div>
          {routine.time && (
            <div style={{ fontSize: 11, color: '#5a5248', marginTop: 1 }}>⏰ {routine.time}</div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
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
        {/* Checkbox — tap toggles completion */}
        <button
          onClick={e => { e.stopPropagation(); onToggle() }}
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            flexShrink: 0,
            cursor: 'pointer',
            border: isCompleted ? 'none' : '2px solid rgba(255,255,255,0.15)',
            background: isCompleted ? '#4A90D9' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            color: 'white',
            padding: 0,
            touchAction: 'manipulation',
          }}
        >
          {isCompleted && '✓'}
        </button>
      </div>
    </div>
  )
}
