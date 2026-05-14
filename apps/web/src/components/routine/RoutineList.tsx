import { useState } from 'react'
import type { Routine, Category } from '../../hooks/useRoutines'
import { SUGGESTED_ROUTINES } from '../../hooks/useRoutines'
import type { RoutineLog } from '../../hooks/useRoutineLogs'
import { RoutineItem } from './RoutineItem'

type Lang = 'de' | 'en' | 'es'

interface Props {
  routines: Routine[]
  logs: RoutineLog[]
  onToggle: (routineId: string, isCompleted: boolean) => void
  onEdit: (routine: Routine) => void
  onSwapOrder: (a: Routine, b: Routine) => void
  onCreateSuggested: (routine: Omit<Routine, 'id'>) => void
  onCreateAll: (routines: Array<Omit<Routine, 'id'>>) => void
  selectedDay: number
  lang: Lang
  isLoading: boolean
  createError?: boolean
  createErrorMsg?: string
  onCreateNew: (category: Category) => void
}

const CATEGORIES: Category[] = ['morning', 'day', 'evening']

const T = {
  de: {
    morning: '🌅 Morgen',
    day: '☀️ Tag',
    evening: '🌙 Abend',
    noItems: 'Keine Aufgaben für heute',
    loading: 'Lädt…',
    suggestions: 'Vorgeschlagene Routinen',
    addAll: 'Alle hinzufügen',
    add: 'Hinzufügen',
    daily: 'täglich',
    monFri: 'Mo-Fr',
    monWedFri: 'Mo/Mi/Fr',
  },
  en: {
    morning: '🌅 Morning',
    day: '☀️ Day',
    evening: '🌙 Evening',
    noItems: 'No tasks for today',
    loading: 'Loading…',
    suggestions: 'Suggested Routines',
    addAll: 'Add all',
    add: 'Add',
    daily: 'daily',
    monFri: 'Mon-Fri',
    monWedFri: 'Mon/Wed/Fri',
  },
  es: {
    morning: '🌅 Mañana',
    day: '☀️ Día',
    evening: '🌙 Tarde',
    noItems: 'Sin tareas para hoy',
    loading: 'Cargando…',
    suggestions: 'Rutinas sugeridas',
    addAll: 'Agregar todo',
    add: 'Agregar',
    daily: 'diario',
    monFri: 'Lun-Vie',
    monWedFri: 'Lun/Mié/Vie',
  },
} as const

const DAY_LABELS: Record<Lang, string[]> = {
  de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  es: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
}

interface DayFormatStrings { daily: string; monFri: string; monWedFri: string }

function formatActiveDays(days: number[], lang: Lang, t: DayFormatStrings): string {
  if (days.length === 7) return t.daily
  if (days.length === 5 && [1, 2, 3, 4, 5].every(d => days.includes(d))) return t.monFri
  if (days.length === 3 && [1, 3, 5].every(d => days.includes(d))) return t.monWedFri
  return [...days].sort((a, b) => a - b).map(d => DAY_LABELS[lang][d]).join('/')
}

export function RoutineList({
  routines,
  logs,
  onToggle,
  onEdit,
  onSwapOrder,
  onCreateSuggested,
  onCreateAll,
  selectedDay,
  lang,
  isLoading,
  createError,
  createErrorMsg,
  onCreateNew,
}: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>('morning')
  const t = T[lang] ?? T.de

  const completedIds = new Set(logs.filter(l => l.completed).map(l => l.routine_id))

  const getItems = (cat: Category) =>
    routines
      .filter(r => r.category === cat && r.active_days.includes(selectedDay))
      .sort((a, b) => a.sort_order - b.sort_order)

  if (isLoading) {
    return (
      <div>
        <div style={{ display: 'flex', gap: 7, marginBottom: 16 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ flex: 1, height: 52, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 13px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
              <div style={{ width: 12, height: 28, borderRadius: 4, background: 'rgba(255,255,255,0.06)' }} />
              <div style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 13, borderRadius: 4, background: 'rgba(255,255,255,0.09)', marginBottom: 6, width: `${55 + (i * 13) % 30}%` }} />
                <div style={{ height: 10, borderRadius: 4, background: 'rgba(255,255,255,0.06)', width: '35%' }} />
              </div>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  const catLabel: Record<Category, string> = { morning: t.morning, day: t.day, evening: t.evening }
  const suggestions = SUGGESTED_ROUTINES[lang] ?? SUGGESTED_ROUTINES.de

  const items = getItems(activeCategory)
  const doneCount = items.filter(r => completedIds.has(r.id)).length
  const pct = items.length > 0 ? Math.round((doneCount / items.length) * 100) : 0

  return (
    <div>
      {/* Category tabs — always visible */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 16, alignItems: 'stretch' }}>
        {CATEGORIES.map(cat => {
          const catItems = routines.length > 0 ? getItems(cat) : []
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
                touchAction: 'manipulation',
              }}
            >
              {catLabel[cat]}
              {complete && (
                <span style={{ position: 'absolute', top: 4, right: 6, fontSize: 9, color: '#6fcf6f' }}>
                  ✓
                </span>
              )}
              {routines.length > 0 && (
                <div style={{ fontSize: 10, opacity: 0.7, marginTop: 2 }}>
                  {catDone}/{catItems.length}
                </div>
              )}
            </button>
          )
        })}
          <button
            onClick={() => onCreateNew(activeCategory)}
            title="Neue Routine erstellen"
            style={{
              width: 40,
              flexShrink: 0,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: '#7a7268',
              fontSize: 20,
              lineHeight: 1,
              cursor: 'pointer',
              fontFamily: 'inherit',
              touchAction: 'manipulation',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            +
          </button>
        </div>

      {/* Suggestions (no routines yet) */}
      {routines.length === 0 && (
        <div>
          <div style={{ fontSize: 12, color: '#6a6258', marginBottom: 12, letterSpacing: 0.5 }}>
            {t.suggestions}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
            {suggestions.filter(s => s.category === activeCategory).map((s, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '13px 15px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12,
                }}
              >
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: '#c0b8a8' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: '#5a5248', marginTop: 2 }}>
                    {formatActiveDays(s.active_days, lang, t)}
                  </div>
                </div>
                <button
                  onClick={() => {
                    onCreateSuggested(s)
                  }}
                  style={{
                    padding: '6px 12px',
                    minHeight: 44,
                    background: 'rgba(74,144,217,0.15)',
                    border: '1px solid rgba(74,144,217,0.3)',
                    borderRadius: 8,
                    color: '#4A90D9',
                    fontSize: 12,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                    touchAction: 'manipulation',
                  }}
                >
                  {t.add}
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              onCreateAll(suggestions)
            }}
            style={{
              width: '100%',
              padding: 12,
              background: 'rgba(74,144,217,0.15)',
              border: '1px solid rgba(74,144,217,0.3)',
              borderRadius: 12,
              color: '#4A90D9',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              touchAction: 'manipulation',
            }}
          >
            {t.addAll}
          </button>
          {createError && (
            <div style={{ color: '#ef4444', fontSize: 12, marginTop: 10, textAlign: 'center' }}>
              Speichern fehlgeschlagen: {createErrorMsg ?? 'unbekannter Fehler'}
            </div>
          )}
        </div>
      )}

      {/* Routine items */}
      {routines.length > 0 && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 24, color: '#4a4238', fontSize: 13 }}>
                {t.noItems}
              </div>
            ) : (
              items.map((routine, idx) => (
                <RoutineItem
                  key={routine.id}
                  routine={routine}
                  isCompleted={completedIds.has(routine.id)}
                  onToggle={() => onToggle(routine.id, completedIds.has(routine.id))}
                  onEdit={() => onEdit(routine)}
                  onMoveUp={idx > 0 ? () => onSwapOrder(routine, items[idx - 1]) : undefined}
                  onMoveDown={idx < items.length - 1 ? () => onSwapOrder(routine, items[idx + 1]) : undefined}
                  isFirst={idx === 0}
                  isLast={idx === items.length - 1}
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

          {/* Remaining suggestions for current category */}
          {(() => {
            const addedNames = new Set(routines.map(r => r.name))
            const remaining = suggestions.filter(s => s.category === activeCategory && !addedNames.has(s.name))
            if (remaining.length === 0) return null
            return (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 12, color: '#6a6258', marginBottom: 10, letterSpacing: 0.5 }}>
                  {t.suggestions}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {remaining.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '11px 13px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: 12,
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{s.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, color: '#c0b8a8' }}>{s.name}</div>
                        <div style={{ fontSize: 11, color: '#5a5248', marginTop: 2 }}>
                          {formatActiveDays(s.active_days, lang, t)}
                        </div>
                      </div>
                      <button
                        onClick={() => onCreateSuggested(s)}
                        style={{
                          padding: '6px 12px',
                          minHeight: 44,
                          background: 'rgba(74,144,217,0.12)',
                          border: '1px solid rgba(74,144,217,0.25)',
                          borderRadius: 8,
                          color: '#4A90D9',
                          fontSize: 12,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          whiteSpace: 'nowrap',
                          touchAction: 'manipulation',
                        }}
                      >
                        {t.add}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </>
      )}
    </div>
  )
}
