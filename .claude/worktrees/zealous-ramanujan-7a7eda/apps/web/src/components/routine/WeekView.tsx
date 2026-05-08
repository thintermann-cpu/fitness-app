import type { Routine } from '../../hooks/useRoutines'
import type { RoutineLog } from '../../hooks/useRoutineLogs'

interface Props {
  routines: Routine[]
  weekLogs: RoutineLog[]
  weekDates: string[]
}

const DAY_LABELS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
// weekDates[0] is always Monday, so day index 0=Mon=dow1, ..., 6=Sun=dow0
const DOW_FOR_INDEX = [1, 2, 3, 4, 5, 6, 0]

export function WeekView({ routines, weekLogs, weekDates }: Props) {
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const pcts = weekDates.map((date, idx) => {
    const dow = DOW_FOR_INDEX[idx]
    const activeRoutines = routines.filter(r => r.active_days.includes(dow))
    if (activeRoutines.length === 0) return 0
    const completed = weekLogs.filter(l => l.date === date && l.completed)
    const completedIds = new Set(completed.map(l => l.routine_id))
    const doneCount = activeRoutines.filter(r => completedIds.has(r.id)).length
    return Math.round((doneCount / activeRoutines.length) * 100)
  })

  const todayIdx = weekDates.indexOf(todayStr)

  let streak = 0
  for (let i = todayIdx >= 0 ? todayIdx : weekDates.length - 1; i >= 0; i--) {
    if (pcts[i] === 100) streak++
    else break
  }

  const best = Math.max(...pcts, 0)
  const todayPct = todayIdx >= 0 ? pcts[todayIdx] : 0
  const avg = Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length)

  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: 2, color: '#6a6258', textTransform: 'uppercase', marginBottom: 13 }}>
        Diese Woche
      </div>

      {/* Bar chart */}
      <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', height: 105, marginBottom: 22 }}>
        {weekDates.map((date, i) => {
          const p = pcts[i]
          const isToday = date === todayStr
          return (
            <div key={date} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ fontSize: 10, color: p === 100 ? '#4A90D9' : '#5a5248', minHeight: 13 }}>
                {p > 0 ? `${p}%` : ''}
              </div>
              <div
                style={{
                  width: '100%',
                  borderRadius: '4px 4px 0 0',
                  background: 'rgba(255,255,255,0.04)',
                  height: 68,
                  display: 'flex',
                  alignItems: 'flex-end',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    borderRadius: '4px 4px 0 0',
                    height: `${p}%`,
                    transition: 'height 0.5s',
                    background:
                      p === 100
                        ? 'linear-gradient(180deg,#7ab8f5,#4A90D9)'
                        : isToday
                          ? 'rgba(74,144,217,0.45)'
                          : 'rgba(74,144,217,0.22)',
                  }}
                />
              </div>
              <div style={{ fontSize: 11, color: isToday ? '#4A90D9' : '#5a5248', fontWeight: isToday ? 600 : 400 }}>
                {DAY_LABELS[i]}
              </div>
            </div>
          )
        })}
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 22 }}>
        {[
          ['🏆 Beste', `${best}%`],
          ['📅 Heute', `${todayPct}%`],
          ['🔥 Streak', `${streak} Tag${streak !== 1 ? 'e' : ''}`],
          ['📊 Ø Woche', `${avg}%`],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              padding: '13px 15px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 11,
            }}
          >
            <div style={{ fontSize: 11, color: '#6a6258', marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 21, color: '#4A90D9' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Per-day details */}
      <div style={{ fontSize: 11, letterSpacing: 2, color: '#6a6258', textTransform: 'uppercase', marginBottom: 9 }}>
        Details
      </div>
      {weekDates.map((date, i) => {
        const p = pcts[i]
        const dow = DOW_FOR_INDEX[i]
        const total = routines.filter(r => r.active_days.includes(dow)).length
        const done = Math.round((p / 100) * total)
        const isToday = date === todayStr
        return (
          <div
            key={date}
            style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 7 }}
          >
            <div style={{ width: 26, fontSize: 12, color: isToday ? '#4A90D9' : '#6a6258', fontWeight: isToday ? 600 : 400 }}>
              {DAY_LABELS[i]}
            </div>
            <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${p}%`,
                  background: p === 100 ? '#4A90D9' : 'rgba(74,144,217,0.4)',
                  borderRadius: 3,
                  transition: 'width 0.4s',
                }}
              />
            </div>
            <div style={{ fontSize: 12, color: '#5a5248', width: 36, textAlign: 'right' }}>
              {done}/{total}
            </div>
          </div>
        )
      })}
    </div>
  )
}
