import { useState } from 'react'
import type { Routine, Category } from '../../hooks/useRoutines'
import type { RoutineLog } from '../../hooks/useRoutineLogs'
import { RoutineItem } from './RoutineItem'

interface Props {
  routines: Routine[]
  logs: RoutineLog[]
  onToggle: (routineId: string, isCompleted: boolean) => void
  selectedDay: number
}

const CATEGORIES: Category[] = ['morning', 'day', 'evening']
const CATEGORY_LABELS: Record<Category, string> = {
  morning: '🌅 Morgen',
  day: '☀️ Tag',
  evening: '🌙 Abend',
}

export function RoutineList({ routines, logs, onToggle, selectedDay }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>('morning')

  const completedIds = new Set(logs.filter(l => l.completed).map(l => l.routine_id))

  const getItems = (cat: Category) =>
    routines
      .filter(r => r.category === cat && r.active_days.includes(selectedDay))
      .sort((a, b) => (a.time ?? '99:99').localeCompare(b.time ?? '99:99'))

  const items = getItems(activeCategory)
  const doneCount = items.filter(r => completedIds.has(r.id)).length
  const pct = items.length > 0 ? Math.round((doneCount / items.length) * 100) : 0

  return (
    <div>
      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 16 }}>
        {CATEGORIES.map(cat => {
          const catItems = getItems(cat)
          const catDone = catItems.filter(r => completedIds.has(r.id)).length
          const isActive = activeCategory === cat
          const complete = catItems.length > 0 && catDone === catItems.length
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flex: 1,
                padding: '9px 4px',
                background: isActive ? 'rgba(74,144,217,0.12)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isActive ? 'rgba(74,144,217,0.36)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 12,
                color: isActive ? '#4A90D9' : complete ? '#6fcf6f' : '#7a7268',
                fontSize: 11,
                cursor: 'pointer',
                fontFamily: 'inherit',
                position: 'relative',
              }}
            >
              {CATEGORY_LABELS[cat]}
              {complete && (
                <span style={{ position: 'absolute', top: 4, right: 6, fontSize: 9, color: '#6fcf6f' }}>
                  ✓
                </span>
              )}
              <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>
                {catDone}/{catItems.length}
              </div>
            </button>
          )
        })}
      </div>

      {/* Routine items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 24, color: '#4a4238', fontSize: 13 }}>
            Keine Aufgaben für heute
          </div>
        ) : (
          items.map(routine => (
            <RoutineItem
              key={routine.id}
              routine={routine}
              isCompleted={completedIds.has(routine.id)}
              onToggle={() => onToggle(routine.id, completedIds.has(routine.id))}
            />
          ))
        )}
      </div>

      {/* Progress bar */}
      {items.length > 0 && (
        <div style={{ marginTop: 13, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
          <div
            style={{
              height: '100%',
              borderRadius: 2,
              transition: 'width 0.4s',
              background: 'linear-gradient(90deg,#4A90D9,#7ab8f5)',
              width: `${pct}%`,
            }}
          />
        </div>
      )}
    </div>
  )
}
