import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import type { WorkoutLocation } from '../store/authStore'
import { DEFAULT_EQUIPMENT_BY_LOCATION } from '../store/authStore'
import { Input } from '../components/ui/Input'
import { supabase } from '../lib/supabase'
import { subscribeToPush, unsubscribeFromPush, getPushSubscriptionStatus } from '../lib/push'
import { FeedbackModal } from '../components/ui/FeedbackModal'
import { useSubscription } from '../hooks/useSubscription'

type View = 'main' | 'profile' | 'equipment' | 'pillars' | 'training' | 'notifications' | 'abo'

const ALL_PILLARS = ['workout', 'routine', 'stretching', 'meditation']

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

const PILLAR_ITEMS = [
  { id: 'workout',    emoji: '💪', label: 'Training',       color: '#E8642A' },
  { id: 'routine',    emoji: '📋', label: 'Mein Tag',       color: '#4A90D9' },
  { id: 'stretching', emoji: '🤸', label: 'Stretch & Yoga', color: '#7BC67E' },
  { id: 'meditation', emoji: '🧘', label: 'Meditation',     color: '#9B7FD4' },
] as const

type PushEnabledKey = 'morning_enabled' | 'evening_enabled' | 'wod_enabled' | 'inactivity_enabled'
type PushTimeKey    = 'morning_time' | 'evening_time' | 'wod_time'
type PushPrefs = {
  morning_enabled:    boolean
  evening_enabled:    boolean
  wod_enabled:        boolean
  inactivity_enabled: boolean
  morning_time:       string
  evening_time:       string
  wod_time:           string
}

const PUSH_REMINDERS: {
  id: string; emoji: string; label: string; description: string
  enabledKey: PushEnabledKey; timeKey: PushTimeKey | null
}[] = [
  { id: 'morning',    emoji: '🌅', label: 'Morgen-Routine',       description: 'Start in den Tag',            enabledKey: 'morning_enabled',    timeKey: 'morning_time' },
  { id: 'evening',    emoji: '🌙', label: 'Abend-Routine',         description: 'Tagesabschluss',              enabledKey: 'evening_enabled',    timeKey: 'evening_time' },
  { id: 'wod',        emoji: '💪', label: 'WOD Reminder',          description: 'Workout of the Day',          enabledKey: 'wod_enabled',        timeKey: 'wod_time'    },
  { id: 'inactivity', emoji: '⏰', label: 'Inaktivitäts-Reminder', description: 'Nach 2 Tagen ohne Aktivität', enabledKey: 'inactivity_enabled', timeKey: null          },
]

const DEFAULT_PUSH_PREFS: PushPrefs = {
  morning_enabled: true, evening_enabled: true, wod_enabled: false, inactivity_enabled: true,
  morning_time: '07:00', evening_time: '21:00', wod_time: '12:00',
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function SaveButton({ loading, saved, onClick }: { loading: boolean; saved: boolean; onClick: () => void }) {
  const accent = saved ? 'var(--color-success)' : 'var(--color-primary)'
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full py-3 rounded-xl text-sm font-semibold transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: 'transparent',
        border: `1.5px solid ${accent}`,
        color: accent,
        cursor: loading ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
      }}
    >
      {loading ? 'Speichert…' : saved ? 'Gespeichert ✓' : 'Speichern'}
    </button>
  )
}

function TogglePill({ on, color = '#E8642A' }: { on: boolean; color?: string }) {
  return (
    <div
      style={{
        width: 44, height: 24, borderRadius: 12, flexShrink: 0,
        background: on ? color : 'rgba(255,255,255,0.1)',
        transition: 'background 0.2s', position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: '50%',
        background: 'white', transition: 'left 0.2s',
      }} />
    </div>
  )
}

function SubHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 pb-5">
      <button
        onClick={onBack}
        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 22, cursor: 'pointer', padding: '4px 8px 4px 0', lineHeight: 1 }}
        aria-label="Zurück"
      >
        ←
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{title}</h1>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export function SettingsPage() {
  const navigate = useNavigate()
  const { profile, user, updateProfile, signOut } = useAuthStore()
  const [view, setView] = useState<View>('main')
  const [feedbackOpen, setFeedbackOpen] = useState(false)

  // Profile
  const [displayName,   setDisplayName]   = useState(profile?.display_name ?? '')
  const [language,      setLanguage]      = useState(profile?.language ?? 'de')
  const [savingProfile, setSavingProfile] = useState(false)
  const [savedProfile,  setSavedProfile]  = useState(false)
  const [pwSending,     setPwSending]     = useState(false)
  const [pwSent,        setPwSent]        = useState(false)

  // Equipment — locations
  const [equipment,   setEquipment]   = useState<string[]>(profile?.equipment ?? [])
  const [savingEquip, setSavingEquip] = useState(false)
  const [savedEquip,  setSavedEquip]  = useState(false)

  // Equipment — per location
  const [equipByLoc,     setEquipByLoc]     = useState<Record<WorkoutLocation, string[]>>(
    profile?.equipment_by_location ?? DEFAULT_EQUIPMENT_BY_LOCATION
  )
  const [activeLocTab,   setActiveLocTab]   = useState<WorkoutLocation>('home')
  const [savingEquipLoc, setSavingEquipLoc] = useState(false)
  const [savedEquipLoc,  setSavedEquipLoc]  = useState(false)

  // Pillars
  const [activePillars,  setActivePillars]  = useState<string[]>(
    profile?.active_pillars?.length ? profile.active_pillars : ALL_PILLARS
  )
  const [savingPillars,  setSavingPillars]  = useState(false)
  const [savedPillars,   setSavedPillars]   = useState(false)

  // Training (localStorage — instant, no Save button)
  const [substitutionEnabled, setSubstitutionEnabled] = useState(() => {
    const s = localStorage.getItem('carveout_substitution_enabled')
    return s === null ? true : s === 'true'
  })
  const [silentMode, setSilentMode] = useState(() =>
    localStorage.getItem('carveout_silent_mode') === 'true'
  )

  // Push
  const [pushEnabled,   setPushEnabled]   = useState(false)
  const [pushLoading,   setPushLoading]   = useState(false)
  const [pushSupported, setPushSupported] = useState(false)
  const [pushError,     setPushError]     = useState<string | null>(null)
  const [pushPrefs,     setPushPrefs]     = useState<PushPrefs>(DEFAULT_PUSH_PREFS)
  const [savingPush,    setSavingPush]    = useState(false)
  const [savedPush,     setSavedPush]     = useState(false)

  // Abo
  const { status: subStatus, isActive: subActive, endDate, loading: subLoading, startCheckout } = useSubscription()
  const [currency, setCurrency] = useState<'chf' | 'eur'>('chf')

  // Sync from profile
  useEffect(() => {
    if (!profile) return
    setDisplayName(profile.display_name ?? '')
    setLanguage(profile.language ?? 'de')
    setEquipment(profile.equipment ?? [])
    setActivePillars(profile.active_pillars?.length ? profile.active_pillars : ALL_PILLARS)
    setEquipByLoc(profile.equipment_by_location ?? DEFAULT_EQUIPMENT_BY_LOCATION)
  }, [profile])

  // Push init
  useEffect(() => {
    const supported = 'serviceWorker' in navigator && 'PushManager' in window
    setPushSupported(supported)
    if (!supported) return
    getPushSubscriptionStatus().then(setPushEnabled)
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      supabase.from('push_preferences').select('*').eq('user_id', user.id).single()
        .then(({ data }) => {
          if (data) setPushPrefs({
            morning_enabled:    data.morning_enabled    ?? true,
            evening_enabled:    data.evening_enabled    ?? true,
            wod_enabled:        data.wod_enabled        ?? false,
            inactivity_enabled: data.inactivity_enabled ?? true,
            morning_time:       data.morning_time       ?? '07:00',
            evening_time:       data.evening_time       ?? '21:00',
            wod_time:           data.wod_time           ?? '12:00',
          })
        })
    })
  }, [])

  // ── Save handlers ────────────────────────────────────────────────────────────

  const handleSaveProfile = async () => {
    setSavingProfile(true)
    try {
      await updateProfile({ display_name: displayName.trim() || null, language })
      setSavedProfile(true)
      setTimeout(() => setSavedProfile(false), 2000)
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!user?.email) return
    setPwSending(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/login`,
      })
      if (error) throw error
      setPwSent(true)
      setTimeout(() => setPwSent(false), 4000)
    } finally {
      setPwSending(false)
    }
  }

  const handleSaveEquip = async () => {
    setSavingEquip(true)
    try {
      await updateProfile({ equipment })
      setSavedEquip(true)
      setTimeout(() => setSavedEquip(false), 2000)
    } finally {
      setSavingEquip(false)
    }
  }

  const handleSaveEquipLoc = async () => {
    setSavingEquipLoc(true)
    try {
      await updateProfile({ equipment_by_location: equipByLoc })
      setSavedEquipLoc(true)
      setTimeout(() => setSavedEquipLoc(false), 2000)
    } finally {
      setSavingEquipLoc(false)
    }
  }

  const handleSavePillars = async () => {
    setSavingPillars(true)
    try {
      await updateProfile({ active_pillars: activePillars })
      setSavedPillars(true)
      setTimeout(() => setSavedPillars(false), 2000)
    } finally {
      setSavingPillars(false)
    }
  }

  const handleTogglePush = async () => {
    setPushLoading(true)
    setPushError(null)
    try {
      if (pushEnabled) {
        await unsubscribeFromPush()
        setPushEnabled(false)
      } else {
        const ok = await subscribeToPush()
        if (ok) {
          setPushEnabled(true)
        } else {
          const denied = typeof Notification !== 'undefined' && Notification.permission === 'denied'
          setPushError(denied
            ? 'Benachrichtigungen sind im Browser blockiert. Bitte in den Browser-Einstellungen erlauben.'
            : 'Push-Aktivierung fehlgeschlagen. Bitte prüfe die Browser-Berechtigungen.')
        }
      }
    } catch (e) {
      console.error('[push] toggle error:', e)
      setPushError('Push-Aktivierung fehlgeschlagen. Bitte prüfe die Browser-Berechtigungen.')
    } finally {
      setPushLoading(false)
    }
  }

  const handleSavePushPrefs = async () => {
    if (!pushEnabled) return
    setSavingPush(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('push_preferences').upsert(
          { user_id: user.id, ...pushPrefs, updated_at: new Date().toISOString() },
          { onConflict: 'user_id' }
        )
      }
      setSavedPush(true)
      setTimeout(() => setSavedPush(false), 2000)
    } catch (e) {
      console.error('[push] save prefs error:', e)
    } finally {
      setSavingPush(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const toggleEquipment    = (id: string) =>
    setEquipment(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id])

  const toggleEquipByLoc   = (loc: WorkoutLocation, item: string) =>
    setEquipByLoc(prev => ({
      ...prev,
      [loc]: prev[loc].includes(item) ? prev[loc].filter(e => e !== item) : [...prev[loc], item],
    }))

  const togglePillar = (id: string) => {
    if (activePillars.length === 1 && activePillars.includes(id)) return
    setActivePillars(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id])
  }

  const back = () => setView('main')

  const VIEW_TITLES: Record<Exclude<View, 'main'>, string> = {
    profile: 'Profil', equipment: 'Equipment', pillars: 'Pillars',
    training: 'Training', notifications: 'Benachrichtigungen', abo: 'Abo',
  }

  // ── MAIN LIST ────────────────────────────────────────────────────────────────

  if (view === 'main') return (
    <div className="p-4 max-w-md mx-auto" style={{ color: 'var(--color-text)' }}>
      <h1 className="text-xl font-bold pt-2 pb-5">Einstellungen</h1>

      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-bg-card)' }}>
        {([
          { id: 'profile'       as View, emoji: '👤', label: 'Profil',             desc: 'Name, Sprache' },
          { id: 'equipment'     as View, emoji: '⚙️', label: 'Equipment',          desc: 'Trainingsort & Geräte' },
          { id: 'pillars'       as View, emoji: '🏛️', label: 'Pillars',            desc: 'Aktive Bereiche' },
          { id: 'training'      as View, emoji: '🎯', label: 'Training',           desc: 'Skalierungen, Silent Mode' },
          { id: 'notifications' as View, emoji: '🔔', label: 'Benachrichtigungen', desc: 'Push Reminders' },
          { id: 'abo'           as View, emoji: '⭐', label: 'Abo',                desc: subActive ? 'Premium aktiv' : 'Kein aktives Abo' },
        ] as const).map((item, idx, arr) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className="w-full flex items-center gap-4 px-4 py-3.5 text-left transition-opacity active:opacity-60"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}
          >
            <span className="text-xl w-7 flex-shrink-0 text-center">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{item.label}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</div>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>›</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => setFeedbackOpen(true)}
        className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl mt-3 transition-opacity active:opacity-60"
        style={{ backgroundColor: 'var(--color-bg-card)', border: 'none', cursor: 'pointer' }}
      >
        <span className="text-xl w-7 flex-shrink-0 text-center">💬</span>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Feedback</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Feedback geben</div>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 18 }}>›</span>
      </button>

      <button
        onClick={handleSignOut}
        className="w-full px-4 py-3.5 rounded-2xl mt-3 text-sm font-semibold"
        style={{ background: 'transparent', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', cursor: 'pointer' }}
      >
        Abmelden
      </button>

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
    </div>
  )

  // ── SUB-VIEWS ────────────────────────────────────────────────────────────────

  return (
    <div className="p-4 max-w-md mx-auto" style={{ color: 'var(--color-text)' }}>
      <SubHeader title={VIEW_TITLES[view]} onBack={back} />

      {/* ── PROFIL ── */}
      {view === 'profile' && (
        <div className="space-y-4">
          <Input
            placeholder="Dein Name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
          <div className="flex gap-2">
            {LANGUAGES.map(l => {
              const sel = language === l.id
              return (
                <button
                  key={l.id}
                  onClick={() => setLanguage(l.id)}
                  className="flex-1 rounded-xl py-3 flex flex-col items-center gap-1 transition-transform active:scale-95"
                  style={{
                    backgroundColor: sel ? 'var(--color-primary)22' : 'var(--color-bg-card)',
                    border: `2px solid ${sel ? 'var(--color-primary)' : 'transparent'}`,
                    color: 'var(--color-text)',
                  }}
                >
                  <span className="text-xl">{l.flag}</span>
                  <span className="text-xs font-medium">{l.label}</span>
                </button>
              )
            })}
          </div>
          <SaveButton loading={savingProfile} saved={savedProfile} onClick={handleSaveProfile} />

          {user?.email && (
            <div
              className="rounded-2xl px-4 py-3 space-y-2"
              style={{ backgroundColor: 'var(--color-bg-card)' }}
            >
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{user.email}</p>
              <button
                onClick={() => void handlePasswordReset()}
                disabled={pwSending || pwSent}
                className="w-full py-2.5 rounded-xl text-sm font-medium transition-opacity disabled:opacity-50"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: pwSent ? 'var(--color-success)' : 'var(--color-text-muted)',
                  cursor: pwSending || pwSent ? 'not-allowed' : 'pointer',
                }}
              >
                {pwSending ? 'Sendet…' : pwSent ? '✓ Link gesendet' : '🔑 Passwort zurücksetzen'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── EQUIPMENT ── */}
      {view === 'equipment' && (
        <div className="space-y-6">
          {/* Location selector */}
          <div className="space-y-4">
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Wo trainierst du?</p>
            <div className="grid grid-cols-2 gap-3">
              {LOCATION_OPTIONS.map(opt => {
                const sel = equipment.includes(opt.id)
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleEquipment(opt.id)}
                    className="rounded-2xl px-4 py-4 flex items-center gap-3 transition-transform active:scale-95 text-left"
                    style={{
                      backgroundColor: sel ? 'var(--color-primary)22' : 'var(--color-bg-card)',
                      border: `2px solid ${sel ? 'var(--color-primary)' : 'transparent'}`,
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
          </div>

          {/* Equipment per location */}
          <div className="space-y-4">
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Equipment pro Trainingsort</p>
            <div className="flex gap-1">
              {LOCATION_OPTIONS.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocTab(loc.id)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor: activeLocTab === loc.id ? '#E8642A' : 'var(--color-bg-card)',
                    color:           activeLocTab === loc.id ? 'white'   : 'var(--color-text-muted)',
                  }}
                >
                  {loc.emoji} {loc.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {EQUIPMENT_ITEMS.map(item => {
                const sel = (equipByLoc[activeLocTab] ?? []).includes(item)
                return (
                  <button
                    key={item}
                    onClick={() => toggleEquipByLoc(activeLocTab, item)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                    style={{
                      backgroundColor: sel ? '#E8642A20' : 'var(--color-bg-card)',
                      border:          `1.5px solid ${sel ? '#E8642A' : 'transparent'}`,
                      color:           sel ? '#E8642A' : 'var(--color-text-muted)',
                    }}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
            <SaveButton loading={savingEquipLoc} saved={savedEquipLoc} onClick={handleSaveEquipLoc} />
          </div>
        </div>
      )}

      {/* ── PILLARS ── */}
      {view === 'pillars' && (
        <div className="space-y-3">
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            Mindestens 1 Pillar muss aktiv bleiben.
          </p>
          {PILLAR_ITEMS.map(p => {
            const isOn   = activePillars.includes(p.id)
            const isLast = activePillars.length === 1 && isOn
            return (
              <button
                key={p.id}
                onClick={() => togglePillar(p.id)}
                disabled={isLast}
                className="w-full flex items-center gap-4 rounded-2xl px-4 py-3 text-left"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border:  `2px solid ${isOn ? p.color : 'transparent'}`,
                  color:   'var(--color-text)',
                  opacity: isLast ? 0.5 : 1,
                  cursor:  isLast ? 'default' : 'pointer',
                }}
              >
                <span className="text-2xl">{p.emoji}</span>
                <span className="flex-1 font-semibold text-sm">{p.label}</span>
                <TogglePill on={isOn} color={p.color} />
              </button>
            )
          })}
          <div className="pt-1">
            <SaveButton loading={savingPillars} saved={savedPillars} onClick={handleSavePillars} />
          </div>
        </div>
      )}

      {/* ── TRAINING ── */}
      {view === 'training' && (
        <div className="space-y-3">
          {[
            {
              label: 'Skalierungen anzeigen',
              desc:  'Zeigt leichte und schwere Varianten bei jedem WOD an.',
              on:    substitutionEnabled,
              toggle: () => {
                const next = !substitutionEnabled
                setSubstitutionEnabled(next)
                localStorage.setItem('carveout_substitution_enabled', String(next))
              },
            },
            {
              label: '🤫 Silent Mode',
              desc:  'Blendet WODs mit Sprungübungen aus (für geräuscharmes Training).',
              on:    silentMode,
              toggle: () => {
                const next = !silentMode
                setSilentMode(next)
                localStorage.setItem('carveout_silent_mode', String(next))
              },
            },
          ].map(item => (
            <button
              key={item.label}
              onClick={item.toggle}
              className="w-full flex items-center gap-4 rounded-2xl px-4 py-3 text-left"
              style={{ backgroundColor: 'var(--color-bg-card)', border: 'none', cursor: 'pointer' }}
            >
              <div className="flex-1">
                <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{item.label}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</div>
              </div>
              <TogglePill on={item.on} />
            </button>
          ))}
        </div>
      )}

      {/* ── BENACHRICHTIGUNGEN ── */}
      {view === 'notifications' && (
        <div className="space-y-4">
          {!pushSupported ? (
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Dein Browser unterstützt keine Push-Benachrichtigungen.
            </p>
          ) : (
            <>
              <button
                onClick={handleTogglePush}
                disabled={pushLoading}
                className="w-full flex items-center gap-4 rounded-2xl px-4 py-3 text-left"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  border:  `2px solid ${pushEnabled ? '#E8642A' : 'transparent'}`,
                  color:   'var(--color-text)',
                  opacity: pushLoading ? 0.6 : 1,
                  cursor:  'pointer',
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
                <TogglePill on={pushEnabled} />
              </button>

              {pushError && (
                <p className="text-xs text-center" style={{ color: '#ef4444' }}>{pushError}</p>
              )}

              {pushEnabled && (
                <>
                  {PUSH_REMINDERS.map(reminder => {
                    const isOn = pushPrefs[reminder.enabledKey]
                    return (
                      <div
                        key={reminder.id}
                        className="rounded-2xl px-4 py-3 space-y-2"
                        style={{ backgroundColor: 'var(--color-bg-card)' }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{reminder.emoji}</span>
                          <div className="flex-1">
                            <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{reminder.label}</div>
                            <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{reminder.description}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setPushPrefs(p => ({ ...p, [reminder.enabledKey]: !p[reminder.enabledKey] }))}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          >
                            <TogglePill on={isOn} />
                          </button>
                        </div>
                        {reminder.timeKey && isOn && (
                          <input
                            type="time"
                            value={pushPrefs[reminder.timeKey]}
                            onChange={e => setPushPrefs(p => ({ ...p, [reminder.timeKey!]: e.target.value }))}
                            className="w-full rounded-xl px-3 py-2 text-sm"
                            style={{
                              backgroundColor: 'var(--color-bg)',
                              color:  'var(--color-text)',
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
        </div>
      )}

      {/* ── ABO ── */}
      {view === 'abo' && (
        <div className="space-y-4">
          {subActive ? (
            <div className="rounded-2xl px-4 py-4 space-y-1" style={{ backgroundColor: 'var(--color-bg-card)' }}>
              <div className="flex items-center gap-2">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7BC67E', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#7BC67E' }}>CarveOut Premium aktiv</span>
              </div>
              {endDate && (
                <p style={{ margin: 0, fontSize: 12, color: '#5a5248', paddingLeft: 16 }}>
                  Verlängert am {new Date(endDate).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </p>
              )}
            </div>
          ) : subStatus === 'canceled' ? (
            <div className="rounded-2xl px-4 py-4 space-y-1" style={{ backgroundColor: 'var(--color-bg-card)' }}>
              <div className="flex items-center gap-2">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#ef4444' }}>Abo gekündigt</span>
              </div>
              {endDate && (
                <p style={{ margin: 0, fontSize: 12, color: '#5a5248', paddingLeft: 16 }}>
                  Zugang bis {new Date(endDate).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </p>
              )}
            </div>
          ) : subStatus === 'past_due' ? (
            <div className="rounded-2xl px-4 py-4" style={{ backgroundColor: 'var(--color-bg-card)' }}>
              <div className="flex items-center gap-2">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#f59e0b' }}>Zahlung ausstehend</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p style={{ fontSize: 13, color: '#5a5248' }}>Kein aktives Abo</p>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['chf', 'eur'] as const).map(c => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    style={{
                      padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                      fontFamily: 'inherit', cursor: 'pointer', border: 'none',
                      background: currency === c ? '#E8642A' : 'rgba(255,255,255,0.06)',
                      color: currency === c ? '#fff' : 'var(--color-text-muted)',
                    }}
                  >
                    {c.toUpperCase()}
                  </button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <button
                  onClick={() => startCheckout(`monthly_${currency}` as const)}
                  disabled={subLoading}
                  style={{ padding: '10px 8px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', opacity: subLoading ? 0.5 : 1 }}
                >
                  {currency === 'chf' ? 'CHF' : 'EUR'} 8.– / Monat
                </button>
                <button
                  onClick={() => startCheckout(`annual_${currency}` as const)}
                  disabled={subLoading}
                  style={{ padding: '10px 8px', borderRadius: 10, background: '#E8642A', border: 'none', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: subLoading ? 0.5 : 1 }}
                >
                  {currency === 'chf' ? 'CHF' : 'EUR'} 60.– / Jahr
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
