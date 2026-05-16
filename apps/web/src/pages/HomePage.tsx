import { useMemo } from 'react'
import { useAuthStore } from '../store/authStore'
import { TodayPillarTracker } from '../components/home/TodayPillarTracker'
import { AdaptiveSuggestion } from '../components/home/AdaptiveSuggestion'
import { TodaysWod } from '../components/home/TodaysWod'
import { WeekStats } from '../components/home/WeekStats'
import { RecentActivity } from '../components/home/RecentActivity'
import { MoodCheck } from '../components/routine/MoodCheck'
import { useDailyLog } from '../hooks/useDailyLog'

const LOCALE_MAP: Record<string, string> = {
  de: 'de-DE',
  en: 'en-US',
  es: 'es-ES',
}

function todayStr(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function HomePage() {
  const { profile } = useAuthStore()
  const { log: dailyLog, setMood } = useDailyLog(todayStr())

  const locale    = LOCALE_MAP[profile?.language ?? 'de'] ?? 'de-DE'
  const dateLabel = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
  }).format(new Date())

  const firstName = profile?.display_name?.trim().split(' ')[0]
  const greeting  = useMemo(() => (firstName ? `Hi ${firstName} 👋` : 'Hi 👋'), [firstName])

  return (
    <div
      className="p-4 space-y-4 max-w-md mx-auto"
      style={{ color: 'var(--color-text)' }}
    >
      {/* Header */}
      <header className="pt-2 space-y-0.5">
        <h1 className="text-2xl font-bold">{greeting}</h1>
        <p className="text-sm capitalize" style={{ color: 'var(--color-text-muted)' }}>
          {dateLabel}
        </p>
      </header>

      <TodayPillarTracker />
      <MoodCheck
        mood={dailyLog?.mood ?? null}
        moodComment={dailyLog?.mood_comment ?? null}
        onSave={(mood, comment) => setMood({ mood, mood_comment: comment })}
      />
      <AdaptiveSuggestion />
      <TodaysWod />
      <WeekStats />
      <RecentActivity />
    </div>
  )
}
