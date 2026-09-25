import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { TodayPillarTracker } from '../components/home/TodayPillarTracker'
import { AdaptiveSuggestion } from '../components/home/AdaptiveSuggestion'
import { OnboardingSlides } from '../components/home/OnboardingSlides'
import { WhatsNewBanner } from '../components/home/WhatsNewBanner'
import { MoodCheck } from '../components/routine/MoodCheck'
import { WaterTracker } from '../components/routine/WaterTracker'
import { RoutineList } from '../components/routine/RoutineList'
import { RoutineEditModal } from '../components/routine/RoutineEditModal'
import { TodoList } from '../components/routine/TodoList'
import { WeekView } from '../components/routine/WeekView'
import { useDailyLog } from '../hooks/useDailyLog'
import { useRoutines } from '../hooks/useRoutines'
import type { Routine, Category } from '../hooks/useRoutines'
import { useRoutineLogs, useWeekLogs, useToggleRoutineLog } from '../hooks/useRoutineLogs'
import { useTodos } from '../hooks/useTodos'

type Tab = 'routinen' | 'todo' | 'woche'
type Lang = 'de' | 'en' | 'es'

const LOCALE_MAP: Record<string, string> = { de: 'de-DE', en: 'en-US', es: 'es-ES' }

const TABS: Record<Lang, Array<[Tab, string]>> = {
  de: [['routinen', 'Routinen'], ['todo', 'To-Do'], ['woche', 'Woche']],
  en: [['routinen', 'Routines'], ['todo', 'To-Do'], ['woche', 'Week']],
  es: [['routinen', 'Rutinas'], ['todo', 'Tareas'], ['woche', 'Semana']],
}

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

export function HomePage() {
  const navigate = useNavigate()
  const { profile } = useAuthStore()
  const lang = (profile?.language ?? 'de') as Lang
  const today = new Date()
  const todayStr = toLocalDateStr(today)
  const todayDow = today.getDay()
  const weekDates = getCurrentWeekDates()

  const { log: dailyLog, setMood, setWater } = useDailyLog(todayStr)
  const { routines, isLoading, create, update, remove, createError, createErrorMsg } = useRoutines()
  const { data: logsRaw } = useRoutineLogs(todayStr)
  const { data: weekLogsRaw } = useWeekLogs(weekDates)
  const toggleLog = useToggleRoutineLog(todayStr)
  const { todos, isLoading: todosLoading, add: addTodo, complete: completeTodo, remove: removeTodo, clearDone, addError, addErrorMsg } = useTodos()

  const [tab, setTab] = useState<Tab>('routinen')
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null)
  const [isCreatingRoutine, setIsCreatingRoutine] = useState(false)
  const [newCategory, setNewCategory] = useState<Category>('morning')
  const [showMotivation] = useState(() => localStorage.getItem('carveout_show_motivation') !== 'false')

  useEffect(() => {
    const KEYWORDS = /workout|training|sport/i
    const handler = () => {
      todos
        .filter((t) => !t.completed && KEYWORDS.test(t.text))
        .forEach((t) => completeTodo({ id: t.id, completed: true }))
    }
    window.addEventListener('carveout:workout-completed', handler)
    return () => window.removeEventListener('carveout:workout-completed', handler)
  }, [todos, completeTodo])

  const locale = LOCALE_MAP[lang] ?? 'de-DE'
  const dateLabel = new Intl.DateTimeFormat(locale, {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(today)
  const firstName = profile?.display_name?.trim().split(' ')[0]
  const greeting = useMemo(() => (firstName ? `Hi ${firstName}` : 'Hi'), [firstName])
  const tabs = TABS[lang] ?? TABS.de
  const todayLogs = logsRaw ?? []
  const weekLogs = weekLogsRaw ?? []
  const waterMl = dailyLog?.water_ml ?? 0

  const handleReorder = (updates: Array<{ id: string; sort_order: number }>) => {
    updates.forEach((u) => update({ id: u.id, sort_order: u.sort_order }))
  }

  return (
    <>
      <OnboardingSlides lang={lang} />
      <div className="p-4 space-y-4 max-w-md mx-auto" style={{ color: 'var(--color-text)' }}>
        <header className="pt-2 space-y-0.5">
          <h1 className="text-2xl font-bold">{greeting}</h1>
          <p className="text-sm capitalize" style={{ color: 'var(--color-text-muted)' }}>{dateLabel}</p>
        </header>

        <WhatsNewBanner />
        {showMotivation && <AdaptiveSuggestion />}
        <TodayPillarTracker />

        <div className="grid grid-cols-2 gap-2">
          <MoodCheck
            mood={dailyLog?.mood ?? null}
            moodComment={dailyLog?.mood_comment ?? null}
            onSave={(mood, comment) => setMood({ mood, mood_comment: comment })}
          />
          <WaterTracker
            waterMl={waterMl}
            onAdd={() => setWater(waterMl + 400)}
            onRemove={() => setWater(Math.max(0, waterMl - 400))}
          />
        </div>

        <div className="flex rounded-xl p-1" style={{ backgroundColor: 'var(--color-bg-card)' }}>
          {tabs.map(([key, label]) => {
            const on = tab === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold"
                style={{
                  background: on ? 'var(--color-pillar-routine)' : 'transparent',
                  color: on ? '#fff' : 'var(--color-text-muted)',
                  border: 'none',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {tab === 'routinen' && (
          <RoutineList
            routines={routines}
            logs={todayLogs}
            onToggle={(routineId, isCompleted) => toggleLog.mutate({ routineId, isCompleted })}
            onEdit={setEditingRoutine}
            onPillarNavigate={(pillar) => navigate(pillar === 'routine' ? '/' : `/${pillar}`)}
            onReorder={handleReorder}
            onCreateSuggested={create}
            onCreateAll={(suggestions) => suggestions.forEach((s) => create(s))}
            selectedDay={todayDow}
            lang={lang}
            isLoading={isLoading}
            createError={createError}
            createErrorMsg={createErrorMsg}
            onCreateNew={(cat) => { setNewCategory(cat); setIsCreatingRoutine(true) }}
          />
        )}

        {tab === 'todo' && (
          todosLoading && todos.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'var(--color-text-muted)' }}>Laden…</p>
          ) : (
            <TodoList
              todos={todos}
              onAdd={(listName, text) => addTodo({ list_name: listName, text })}
              onComplete={(id, completed) => completeTodo({ id, completed })}
              onDelete={(id) => removeTodo(id)}
              onClearDone={(listName) => clearDone(listName)}
              addError={addError}
              addErrorMsg={addErrorMsg}
            />
          )
        )}

        {tab === 'woche' && (
          <WeekView routines={routines} weekLogs={weekLogs} weekDates={weekDates} />
        )}

      </div>

      {editingRoutine && (
        <RoutineEditModal
          routine={editingRoutine}
          lang={lang}
          onSave={update}
          onDelete={remove}
          onBack={() => setEditingRoutine(null)}
        />
      )}
      {isCreatingRoutine && (
        <RoutineEditModal
          routine={{ id: 'new', category: newCategory, name: '', icon: '📋', time: null, link_url: null, linked_pillar: null, active_days: [1, 2, 3, 4, 5], sort_order: 0 }}
          lang={lang}
          onSave={({ id: _id, ...rest }) => {
            create({
              name: rest.name ?? '',
              icon: rest.icon ?? '📋',
              category: rest.category ?? newCategory,
              active_days: rest.active_days ?? [1, 2, 3, 4, 5],
              time: rest.time ?? null,
              link_url: rest.link_url ?? null,
              linked_pillar: rest.linked_pillar ?? null,
              sort_order: 0,
            })
          }}
          onBack={() => setIsCreatingRoutine(false)}
        />
      )}
    </>
  )
}
