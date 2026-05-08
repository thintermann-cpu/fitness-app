const STEP_ML = 400
const GOAL_ML = 2800

interface Props {
  waterMl: number
  onAdd: () => void
  onRemove: () => void
}

export function WaterTracker({ waterMl, onAdd, onRemove }: Props) {
  const pct = Math.min((waterMl / GOAL_ML) * 100, 100)
  const glasses = Math.round(waterMl / STEP_ML)
  const maxGlasses = Math.round(GOAL_ML / STEP_ML)
  const goalReached = pct >= 100

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: '10px 11px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        height: '100%',
      }}
    >
      <div style={{ fontSize: 9, letterSpacing: 2, color: '#6a6258', textTransform: 'uppercase' }}>
        💧 Wasser
      </div>

      <div style={{ fontSize: 15, color: goalReached ? '#6fcf6f' : '#4A90D9', lineHeight: 1 }}>
        {(waterMl / 1000).toFixed(1)}
        <span style={{ fontSize: 10, color: '#5a5248' }}>/{(GOAL_ML / 1000).toFixed(1)}L</span>
      </div>

      <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 2,
            transition: 'width 0.4s',
            background: goalReached
              ? 'linear-gradient(90deg,#6fcf6f,#a0e8a0)'
              : 'linear-gradient(90deg,#2e86c1,#4A90D9)',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {Array.from({ length: maxGlasses }).map((_, i) => (
          <span key={i} style={{ fontSize: 10, opacity: i < glasses ? 1 : 0.15 }}>
            🥛
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 5, marginTop: 'auto' }}>
        <button
          onClick={onRemove}
          disabled={waterMl === 0}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: 6,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#9a9288',
            fontSize: 14,
            cursor: waterMl === 0 ? 'default' : 'pointer',
            touchAction: 'manipulation',
          }}
        >
          −
        </button>
        <button
          onClick={onAdd}
          style={{
            flex: 1,
            padding: '8px 0',
            borderRadius: 6,
            background: 'rgba(74,144,217,0.2)',
            border: '1px solid rgba(74,144,217,0.4)',
            color: '#4A90D9',
            fontSize: 16,
            cursor: 'pointer',
            touchAction: 'manipulation',
          }}
        >
          +
        </button>
      </div>

      {goalReached && (
        <div style={{ fontSize: 9, color: '#6fcf6f', textAlign: 'center' }}>Ziel erreicht 🎉</div>
      )}
    </div>
  )
}
