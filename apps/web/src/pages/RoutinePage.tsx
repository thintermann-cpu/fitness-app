import { useState } from 'react'
import { useRoutines } from '../hooks/useRoutines'
import type { Routine, Category } from '../hooks/useRoutines'
import { useRoutineLogs, useWeekLogs, useToggleRoutineLog } from '../hooks/useRoutineLogs'
import { useDailyLog } from '../hooks/useDailyLog'
import { useTodos } from '../hooks/useTodos'
import { useAuthStore } from '../store/authStore'
import { RoutineList } from '../components/routine/RoutineList'
import { RoutineEditModal } from '../components/routine/RoutineEditModal'
import { WaterTracker } from '../components/routine/WaterTracker'
import { MoodCheck } from '../components/routine/MoodCheck'
import { TodoList } from '../components/routine/TodoList'
import { WeekView } from '../components/routine/WeekView'

type Tab = 'routinen' | 'todo' | 'woche'
type Lang = 'de' | 'en' | 'es'

function toLocalDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getCurrentWeekDates(): string[] {
  const today = new Date()
  const dow = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (dow === 0 ? 6 : dow - 1))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return toLocalDateStr(d)
  })
}

const DAYS_SHORT = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
const DAYS_FULL  = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

const WATER_STEP = 400
const WATER_MAX  = 5600

const TABS: Record<Lang, Array<[Tab, string]>> = {
  de: [['routinen', '📋 Routinen'], ['todo', '✅ To-Do'], ['woche', '📊 Woche']],
  en: [['routinen', '📋 Routines'], ['todo', '✅ To-Do'], ['woche', '📊 Week']],
  es: [['routinen', '📋 Rutinas'], ['todo', '✅ Tareas'], ['woche', '📊 Semana']],
}

export function RoutinePage() {
  const today    = new Date()
  const todayStr = toLocalDateStr(today)
  const todayDow = today.getDay()

  const { profile } = useAuthStore()
  const lang = ((profile?.language ?? 'de') as Lang)

  const [tab, setTab]               = useState<Tab>('routinen')
  const [selectedDay, setSelDay]    = useState(todayDow)
  const [editingRoutine, setEditingRoutine]   = useState<Routine | null>(null)
  const [isCreatingRoutine, setIsCreatingRoutine] = useState(false)
  const [newCategory, setNewCategory] = useState<Category>('morning')

  const weekDates = getCurrentWeekDates()

  const { routines, isLoading, create, update, remove, createError, createErrorMsg } = useRoutines()
  const { data: logsRaw }     = useRoutineLogs(todayStr)
  const { log: dailyLog, setWater, setMood } = useDailyLog(todayStr)
  const { todos, add: addTodo, complete: completeTodo, remove: removeTodo, clearDone, addError, addErrorMsg } = useTodos()
  const { data: weekLogsRaw } = useWeekLogs(weekDates)
  const toggleLog             = useToggleRoutineLog(todayStr)

  const todayLogs = logsRaw     ?? []
  const weekLogs  = weekLogsRaw ?? []
  const waterMl   = dailyLog?.water_ml ?? 0

  const weekPcts = DAYS_SHORT.map((_, i) => {
    const dateIdx = weekDates.findIndex(d => new Date(d + 'T00:00:00').getDay() === i)
    if (dateIdx < 0) return 0
    const date   = weekDates[dateIdx]
    const active = routines.filter(r => r.active_days.includes(i))
    if (active.length === 0) return 0
    const doneIds = new Set(weekLogs.filter(l => l.date === date && l.completed).map(l => l.routine_id))
    return Math.round(active.filter(r => doneIds.has(r.id)).length / active.length * 100)
  })

  const todayActive  = routines.filter(r => r.active_days.includes(todayDow))
  const todayDoneIds = new Set(todayLogs.filter(l => l.completed).map(l => l.routine_id))
  const todayDone    = todayActive.filter(r => todayDoneIds.has(r.id)).length

  const streak = (() => {
    let s = 0
    for (let i = todayDow; i >= 0; i--) {
      if (weekPcts[i] === 100) s++
      else break
    }
    return s
  })()

  const handleSwapOrder = (a: Routine, b: Routine) => {
    update({ id: a.id, sort_order: b.sort_order })
    update({ id: b.id, sort_order: a.sort_order })
  }

  const tabs = TABS[lang] ?? TABS.de

  return (
    <div
      style={{
        minHeight: '100svh',
        background: 'linear-gradient(135deg,#0D0D14 0%,#13131e 50%,#0f1622 100%)',
        fontFamily: 'var(--font-sans)',
        color: 'var(--color-text)',
        maxWidth: 480,
        margin: '0 auto',
      }}
    >
      {/* Edit modal */}
      {editingRoutine && (
        <RoutineEditModal
          routine={editingRoutine}
          lang={lang}
          onSave={update}
          onDelete={remove}
          onBack={() => setEditingRoutine(null)}
        />
      )}

      {/* Create modal */}
      {isCreatingRoutine && (
        <RoutineEditModal
          routine={{ id: 'new', category: newCategory, name: '', icon: '📋', time: null, link_url: null, active_days: [1, 2, 3, 4, 5], sort_order: 0 }}
          lang={lang}
          onSave={({ id: _id, ...rest }) => {
            create({
              name: rest.name ?? '',
              icon: rest.icon ?? '📋',
              category: rest.category ?? newCategory,
              active_days: rest.active_days ?? [1, 2, 3, 4, 5],
              time: rest.time ?? null,
              link_url: rest.link_url ?? null,
              sort_order: 0,
            })
          }}
          onBack={() => setIsCreatingRoutine(false)}
        />
      )}

      {/* Header */}
      <div
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '18px 18px 0',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: '#6a6258', textTransform: 'uppercase' }}>
              {DAYS_FULL[todayDow]}
            </div>
            <h1 style={{ margin: '2px 0 0', fontSize: 21, fontWeight: 400, color: '#f0e8d8' }}>
              Mein Tag
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            {streak > 0 && (
              <div
                style={{
                  background: 'rgba(74,144,217,0.15)',
                  border: '1px solid rgba(74,144,217,0.3)',
                  borderRadius: 20,
                  padding: '5px 11px',
                  fontSize: 11,
                  color: '#4A90D9',
                }}
              >
                🔥{streak}T
              </div>
            )}
            {!isLoading && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 20,
                  padding: '5px 11px',
                  fontSize: 11,
                  color: '#4A90D9',
                }}
              >
                {todayDone}/{todayActive.length}
              </div>
            )}
          </div>
        </div>

        {/* Day strip */}
        <div style={{ display: 'flex', gap: 3 }}>
          {DAYS_SHORT.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelDay(i)}
              style={{
                flex: 1,
                padding: '5px 1px 7px',
                background: 'transparent',
                border: 'none',
                borderBottom: selectedDay === i ? '2px solid #4A90D9' : '2px solid transparent',
                color: selectedDay === i ? '#4A90D9' : i === todayDow ? '#a09080' : '#5a5248',
                fontSize: 11,
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: selectedDay === i ? 600 : 400,
              }}
            >
              <div>{d}</div>
              <div
                style={{
                  marginTop: 2,
                  height: 3,
                  borderRadius: 2,
                  background: `linear-gradient(90deg,#4A90D9 ${weekPcts[i]}%,rgba(255,255,255,0.06) ${weekPcts[i]}%)`,
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main tabs */}
      <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', marginTop: 0 }}>
        {tabs.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              flex: 1,
              padding: 12,
              background: 'transparent',
              border: 'none',
              borderBottom: tab === key ? '2px solid #4A90D9' : '2px solid transparent',
              color: tab === key ? '#4A90D9' : '#6a6258',
              fontSize: 11,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding: 18 }}>

        {/* ── Routinen ── */}
        {tab === 'routinen' && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'stretch' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <MoodCheck
                  mood={dailyLog?.mood ?? null}
                  moodComment={dailyLog?.mood_comment ?? null}
                  onSave={(mood, comment) => setMood({ mood, mood_comment: comment })}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <WaterTracker
                  waterMl={waterMl}
                  onAdd={() => setWater(Math.min(waterMl + WATER_STEP, WATER_MAX))}
                  onRemove={() => setWater(Math.max(waterMl - WATER_STEP, 0))}
                />
              </div>
            </div>

            <RoutineList
              routines={routines}
              logs={todayLogs}
              onToggle={(routineId, isCompleted) => toggleLog.mutate({ routineId, isCompleted })}
              onEdit={setEditingRoutine}
              onSwapOrder={handleSwapOrder}
              onCreateSuggested={create}
              onCreateAll={suggestions => suggestions.forEach(s => create(s))}
              selectedDay={selectedDay}
              lang={lang}
              isLoading={isLoading}
              createError={createError}
              createErrorMsg={createErrorMsg}
              onCreateNew={(cat) => { setNewCategory(cat); setIsCreatingRoutine(true) }}
            />
          </>
        )}

        {/* ── To-Do ── */}
        {tab === 'todo' && (
          <TodoList
            todos={todos}
            onAdd={(listName, text) => addTodo({ list_name: listName, text })}
            onComplete={(id, completed) => completeTodo({ id, completed })}
            onDelete={id => removeTodo(id)}
            onClearDone={listName => clearDone(listName)}
            addError={addError}
            addErrorMsg={addErrorMsg}
          />
        )}

        {/* ── Woche ── */}
        {tab === 'woche' && (
          <WeekView
            routines={routines}
            weekLogs={weekLogs}
            weekDates={weekDates}
          />
        )}

      </div>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(7px) } to { opacity: 1; transform: translateY(0) } }
        input::placeholder { color: #3a3228 }
        button { box-sizing: border-box; }
      `}</style>
    </div>
  )
}
