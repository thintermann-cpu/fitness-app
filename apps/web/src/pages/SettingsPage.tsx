import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import type { WorkoutLocation } from '../store/authStore'
import { DEFAULT_EQUIPMENT_BY_LOCATION } from '../store/authStore'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { supabase } from '../lib/supabase'
import { subscribeToPush, unsubscribeFromPush, getPushSubscriptionStatus } from '../lib/push'

const ALL_PILLARS = ['workout', 'routine', 'stretching', 'meditation']

const PILLARS = [
  { id: 'workout',    label: 'Workout',    emoji: '🏋️', color: '#E8642A' },
  { id: 'routine',    label: 'Mein Tag',   emoji: '📋', color: '#4A90D9' },
  { id: 'stretching', label: 'Stretching', emoji: '🤸', color: '#7BC67E' },
  { id: 'meditation', label: 'Meditation', emoji: '🧘', color: '#9B7FD4' },
] as const

const LANGUAGES = [
  { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
  { id: 'es', label: 'Español', flag: '🇪🇸' },
] as const

const LOCATION_OPTIONS: { id: WorkoutLocation; label: string; emoji: string }[] = [
  { id: 'home',       label: 'Home',       emoji: '🏠' },
  { id: 'gym',        label: 'Gym',        emoji: '🏋️' },
  { id: 'bodyweight', label: 'Bodyweight', emoji: '🤸' },
  { id: 'outdoor',    label: 'Outdoor',    emoji: '🌲' },
]

const EQUIPMENT_ITEMS = [
  'Barbell', 'Dumbbells', 'Kettlebell', 'Pull-up Bar',
  'Rings', 'Rower', 'Bike', 'Resistance Bands', 'Jump Rope', 'Box',
  'Sandbag', 'Gewichtsweste', 'Laufen',
]

type PushEnabledKey = 'morning_enabled' | 'evening_enabled' | 'wod_enabled' | 'inactivity_enabled'
type PushTimeKey    = 'morning_time' | 'evening_time' | 'wod_time'

type PushPrefs = {
  morning_enabled: boolean
  evening_enabled: boolean
  wod_enabled: boolean
  inactivity_enabled: boolean
  morning_time: string
  evening_time: string
  wod_time: string
}

const PUSH_REMINDERS: {
  id: string
  emoji: string
  label: string
  description: string
  enabledKey: PushEnabledKey
  timeKey: PushTimeKey | null
}[] = [
  { id: 'morning',    emoji: '🌅', label: 'Morgen-Routine',       description: 'Start in den Tag',            enabledKey: 'morning_enabled',    timeKey: 'morning_time' },
  { id: 'evening',    emoji: '🌙', label: 'Abend-Routine',         description: 'Tagesabschluss',              enabledKey: 'evening_enabled',    timeKey: 'evening_time' },
  { id: 'wod',        emoji: '💪', label: 'WOD Reminder',          description: 'Workout of the Day',          enabledKey: 'wod_enabled',        timeKey: 'wod_time' },
  { id: 'inactivity', emoji: '⏰', label: 'Inaktivitäts-Reminder', description: 'Nach 2 Tagen ohne Aktivität', enabledKey: 'inactivity_enabled', timeKey: null },
]

const DEFAULT_PUSH_PREFS: PushPrefs = {
  morning_enabled: true,
  evening_enabled: true,
  wod_enabled: false,
  inactivity_enabled: true,
  morning_time: '07:00',
  evening_time: '21:00',
  wod_time: '12:00',
}

type Lang = 'de' | 'en' | 'es'

const T = {
  de: {
    activePillars: 'Aktive Pillars',
    activePillarsDesc: 'Welche Bereiche möchtest du nutzen?',
    alwaysActive: 'Immer aktiv',
  },
  en: {
    activePillars: 'Active Pillars',
    activePillarsDesc: 'Which areas do you want to use?',
    alwaysActive: 'Always active',
  },
  es: {
    activePillars: 'Pilares activos',
    activePillarsDesc: '¿Qué áreas quieres utilizar?',
    alwaysActive: 'Siempre activo',
  },
} as const

function SaveButton({
  loading,
  saved,
  onClick,
}: {
  loading: boolean
  saved: boolean
  onClick: () => void
}) {
  return (
    <Button
      className="w-full"
      loading={loading}
      onClick={onClick}
      style={saved ? { backgroundColor: 'var(--color-success)' } : undefined}
    >
      {saved ? 'Gespeichert ✓' : 'Speichern'}
    </Button>
  )
}

export function SettingsPage() {
  const { profile, updateProfile } = useAuthStore()

  // ── Profil section state ──
  const [displayName,   setDisplayName]   = useState(profile?.display_name ?? '')
  const [language,      setLanguage]      = useState(profile?.language ?? 'de')
  const [primaryPillar, setPrimaryPillar] = useState(profile?.primary_pillar ?? '')
  const [savingProfile, setSavingProfile] = useState(false)
  const [savedProfile,  setSavedProfile]  = useState(false)

  // ── Equipment section state ──
  const [equipment,   setEquipment]   = useState<string[]>(profile?.equipment ?? [])
  const [savingEquip, setSavingEquip] = useState(false)
  const [savedEquip,  setSavedEquip]  = useState(false)

  // ── Equipment per location state ──
  const [equipByLoc, setEquipByLoc] = useState<Record<WorkoutLocation, string[]>>(
    profile?.equipment_by_location ?? DEFAULT_EQUIPMENT_BY_LOCATION
  )
  const [activeLocTab, setActiveLocTab] = useState<WorkoutLocation>('home')
  const [savingEquipLoc, setSavingEquipLoc] = useState(false)
  const [savedEquipLoc,  setSavedEquipLoc]  = useState(false)

  // ── Active pillars section state ──
  const [activePillars,   setActivePillars]   = useState<string[]>(
    profile?.active_pillars?.length ? profile.active_pillars : ALL_PILLARS
  )
  const [savingPillars, setSavingPillars] = useState(false)
  const [savedPillars,  setSavedPillars]  = useState(false)

  // ── Push notifications state ──
  const [pushEnabled,   setPushEnabled]   = useState(false)
  const [pushLoading,   setPushLoading]   = useState(false)
  const [pushSupported, setPushSupported] = useState(false)
  const [pushPrefs,     setPushPrefs]     = useState<PushPrefs>(DEFAULT_PUSH_PREFS)
  const [savingPush,    setSavingPush]    = useState(false)
  const [savedPush,     setSavedPush]     = useState(false)

  useEffect(() => {
    if (!profile) return
    setDisplayName(profile.display_name ?? '')
    setLanguage(profile.language ?? 'de')
    setPrimaryPillar(profile.primary_pillar ?? '')
    setEquipment(profile.equipment ?? [])
    setActivePillars(profile.active_pillars?.length ? profile.active_pillars : ALL_PILLARS)
    setEquipByLoc(profile.equipment_by_location ?? DEFAULT_EQUIPMENT_BY_LOCATION)
  }, [profile])

  useEffect(() => {
    const supported = 'serviceWorker' in navigator && 'PushManager' in window
    setPushSupported(supported)
    if (!supported) return

    getPushSubscriptionStatus().then(setPushEnabled)

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase
        .from('push_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setPushPrefs({
              morning_enabled:    data.morning_enabled    ?? true,
              evening_enabled:    data.evening_enabled    ?? true,
              wod_enabled:        data.wod_enabled        ?? false,
              inactivity_enabled: data.inactivity_enabled ?? true,
              morning_time:       data.morning_time       ?? '07:00',
              evening_time:       data.evening_time       ?? '21:00',
              wod_time:           data.wod_time           ?? '12:00',
            })
          }
        })
    })
  }, [])

  const handleSaveProfile = async () => {
    setSavingProfile(true)
    await updateProfile({ display_name: displayName.trim() || null, language, primary_pillar: primaryPillar || null })
    setSavingProfile(false)
    setSavedProfile(true)
    setTimeout(() => setSavedProfile(false), 2000)
  }

  const toggleEquipment = (id: string) =>
    setEquipment(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id])

  const handleSaveEquip = async () => {
    setSavingEquip(true)
    await updateProfile({ equipment })
    setSavingEquip(false)
    setSavedEquip(true)
    setTimeout(() => setSavedEquip(false), 2000)
  }

  const toggleEquipByLoc = (loc: WorkoutLocation, item: string) =>
    setEquipByLoc(prev => ({
      ...prev,
      [loc]: prev[loc].includes(item) ? prev[loc].filter(e => e !== item) : [...prev[loc], item],
    }))

  const handleSaveEquipLoc = async () => {
    setSavingEquipLoc(true)
    await updateProfile({ equipment_by_location: equipByLoc })
    setSavingEquipLoc(false)
    setSavedEquipLoc(true)
    setTimeout(() => setSavedEquipLoc(false), 2000)
  }

  const togglePillar = (id: string) => {
    if (id === 'routine') return // always active
    setActivePillars(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  const handleSavePillars = async () => {
    setSavingPillars(true)
    const toSave = activePillars.includes('routine') ? activePillars : [...activePillars, 'routine']
    await updateProfile({ active_pillars: toSave })
    setSavingPillars(false)
    setSavedPillars(true)
    setTimeout(() => setSavedPillars(false), 2000)
  }

  const handleTogglePush = async () => {
    setPushLoading(true)
    if (pushEnabled) {
      await unsubscribeFromPush()
      setPushEnabled(false)
    } else {
      const success = await subscribeToPush()
      setPushEnabled(success)
    }
    setPushLoading(false)
  }

  const handleSavePushPrefs = async () => {
    setSavingPush(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase
        .from('push_preferences')
        .upsert({ user_id: user.id, ...pushPrefs, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
    }
    setSavingPush(false)
    setSavedPush(true)
    setTimeout(() => setSavedPush(false), 2000)
  }

  const lang = (language as Lang)
  const t = T[lang] ?? T.de

  return (
    <div
      className="p-4 max-w-md mx-auto space-y-8"
      style={{ color: 'var(--color-text)' }}
    >
      <h1 className="text-xl font-bold pt-2">Einstellungen</h1>

      {/* ── Profil ── */}
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold text-base">Profil</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            Name, Sprache und Fokus
          </p>
        </div>

        <Input
          placeholder="Dein Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <div className="flex gap-2">
          {LANGUAGES.map((l) => {
            const selected = language === l.id
            return (
              <button
                key={l.id}
                onClick={() => setLanguage(l.id)}
                className="flex-1 rounded-xl py-3 flex flex-col items-center gap-1 transition-transform active:scale-95"
                style={{
                  backgroundColor: selected ? 'var(--color-primary)22' : 'var(--color-bg-card)',
                  border: `2px solid ${selected ? 'var(--color-primary)' : 'transparent'}`,
                  color: 'var(--color-text)',
                }}
              >
                <span className="text-xl">{l.flag}</span>
                <span className="text-xs font-medium">{l.label}</span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {PILLARS.map((p) => {
            const selected = primaryPillar === p.id
            return (
              <button
                key={p.id}
                onClick={() => setPrimaryPillar(p.id)}
                className="rounded-2xl p-4 text-left transition-transform active:scale-95"
                style={{
                  backgroundColor: selected ? p.color + '22' : 'var(--color-bg-card)',
                  border: `2px solid ${selected ? p.color : 'transparent'}`,
                  color: 'var(--color-text)',
                }}
              >
                <div className="text-2xl mb-1">{p.emoji}</div>
                <div className="font-semibold text-sm">{p.label}</div>
              </button>
            )
          })}
        </div>

        <SaveButton loading={savingProfile} saved={savedProfile} onClick={handleSaveProfile} />
      </section>

      {/* ── Equipment ── */}
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold text-base">Equipment</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            Wo trainierst du?
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {LOCATION_OPTIONS.map((opt) => {
            const selected = equipment.includes(opt.id)
            return (
              <button
                key={opt.id}
                onClick={() => toggleEquipment(opt.id)}
                className="rounded-2xl px-4 py-4 flex items-center gap-3 transition-transform active:scale-95 text-left"
                style={{
                  backgroundColor: selected ? 'var(--color-primary)22' : 'var(--color-bg-card)',
                  border: `2px solid ${selected ? 'var(--color-primary)' : 'transparent'}`,
                  color: 'var(--color-text)',
                }}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="font-medium text-sm">{opt.label}</span>
              </button>
            )
          })}
        </div>

        <SaveButton loading={savingEquip} saved={savedEquip} onClick={handleSaveEquip} />
      </section>

      {/* ── Equipment pro Trainingsort ── */}
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold text-base">Equipment pro Trainingsort</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            Welches Equipment hast du pro Ort verfügbar?
          </p>
        </div>

        {/* Location tabs */}
        <div className="flex gap-1">
          {LOCATION_OPTIONS.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocTab(loc.id)}
              className="flex-1 py-2 rounded-xl text-xs font-semibold transition-colors"
              style={{
                backgroundColor: activeLocTab === loc.id ? '#E8642A' : 'var(--color-bg-card)',
                color:           activeLocTab === loc.id ? 'white' : 'var(--color-text-muted)',
              }}
            >
              {loc.emoji} {loc.label}
            </button>
          ))}
        </div>

        {/* Equipment checkboxes for active location */}
        <div className="flex flex-wrap gap-2">
          {EQUIPMENT_ITEMS.map((item) => {
            const selected = (equipByLoc[activeLocTab] ?? []).includes(item)
            return (
              <button
                key={item}
                onClick={() => toggleEquipByLoc(activeLocTab, item)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor: selected ? '#E8642A20' : 'var(--color-bg-card)',
                  border:          `1.5px solid ${selected ? '#E8642A' : 'transparent'}`,
                  color:           selected ? '#E8642A' : 'var(--color-text-muted)',
                }}
              >
                {item}
              </button>
            )
          })}
        </div>

        <SaveButton loading={savingEquipLoc} saved={savedEquipLoc} onClick={handleSaveEquipLoc} />
      </section>

      {/* ── Aktive Pillars ── */}
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold text-base">{t.activePillars}</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            {t.activePillarsDesc}
          </p>
        </div>

        <div className="space-y-3">
          {PILLARS.map((p) => {
            const isActive = activePillars.includes(p.id)
            const isLocked = p.id === 'routine'
            return (
              <button
                key={p.id}
                onClick={() => togglePillar(p.id)}
                className="w-full flex items-center gap-4 rounded-2xl px-4 py-3 text-left transition-transform active:scale-95"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border: `2px solid ${isActive ? p.color : 'transparent'}`,
                  color: 'var(--color-text)',
                  opacity: isLocked ? 0.7 : 1,
                  cursor: isLocked ? 'default' : 'pointer',
                }}
              >
                <span className="text-2xl">{p.emoji}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{p.label}</div>
                  {isLocked && (
                    <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      {t.alwaysActive}
                    </div>
                  )}
                </div>
                {/* Toggle pill */}
                <div
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    background: isActive ? p.color : 'rgba(255,255,255,0.1)',
                    transition: 'background 0.2s',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 3,
                      left: isActive ? 23 : 3,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: 'white',
                      transition: 'left 0.2s',
                    }}
                  />
                </div>
              </button>
            )
          })}
        </div>

        <SaveButton loading={savingPillars} saved={savedPillars} onClick={handleSavePillars} />
      </section>

      {/* ── Push Benachrichtigungen ── */}
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold text-base">Push Benachrichtigungen</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            Tägliche Reminder für deine aktiven Pillars
          </p>
        </div>

        {!pushSupported ? (
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Dein Browser unterstützt keine Push-Benachrichtigungen.
          </p>
        ) : (
          <>
            {/* Main enable/disable toggle */}
            <button
              onClick={handleTogglePush}
              disabled={pushLoading}
              className="w-full flex items-center gap-4 rounded-2xl px-4 py-3 text-left transition-transform active:scale-95"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                border: `2px solid ${pushEnabled ? '#E8642A' : 'transparent'}`,
                color: 'var(--color-text)',
                opacity: pushLoading ? 0.6 : 1,
              }}
            >
              <span className="text-2xl">🔔</span>
              <div className="flex-1">
                <div className="font-semibold text-sm">
                  {pushLoading ? 'Wird aktualisiert…' : pushEnabled ? 'Push aktiviert' : 'Push deaktiviert'}
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {pushEnabled ? 'Tippen zum Deaktivieren' : 'Tippen zum Aktivieren'}
                </div>
              </div>
              <div
                style={{
                  width: 44, height: 24, borderRadius: 12,
                  background: pushEnabled ? '#E8642A' : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.2s', position: 'relative', flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute', top: 3,
                    left: pushEnabled ? 23 : 3,
                    width: 18, height: 18, borderRadius: '50%',
                    background: 'white', transition: 'left 0.2s',
                  }}
                />
              </div>
            </button>

            {/* Per-reminder settings, visible only when push is enabled */}
            {pushEnabled && (
              <>
                {PUSH_REMINDERS.map((reminder) => {
                  const isEnabled = pushPrefs[reminder.enabledKey]
                  return (
                    <div
                      key={reminder.id}
                      className="rounded-2xl px-4 py-3 space-y-2"
                      style={{ backgroundColor: 'var(--color-bg-card)' }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{reminder.emoji}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
                            {reminder.label}
                          </div>
                          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {reminder.description}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setPushPrefs((p) => ({ ...p, [reminder.enabledKey]: !p[reminder.enabledKey] }))
                          }
                          style={{
                            width: 44, height: 24, borderRadius: 12,
                            background: isEnabled ? '#E8642A' : 'rgba(255,255,255,0.1)',
                            transition: 'background 0.2s', position: 'relative', flexShrink: 0,
                          }}
                        >
                          <div
                            style={{
                              position: 'absolute', top: 3,
                              left: isEnabled ? 23 : 3,
                              width: 18, height: 18, borderRadius: '50%',
                              background: 'white', transition: 'left 0.2s',
                            }}
                          />
                        </button>
                      </div>
                      {reminder.timeKey && isEnabled && (
                        <input
                          type="time"
                          value={pushPrefs[reminder.timeKey]}
                          onChange={(e) =>
                            setPushPrefs((p) => ({ ...p, [reminder.timeKey!]: e.target.value }))
                          }
                          className="w-full rounded-xl px-3 py-2 text-sm"
                          style={{
                            backgroundColor: 'var(--color-bg)',
                            color: 'var(--color-text)',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }}
                        />
                      )}
                    </div>
                  )
                })}

                <SaveButton loading={savingPush} saved={savedPush} onClick={handleSavePushPrefs} />
              </>
            )}
          </>
        )}
      </section>
    </div>
  )
}