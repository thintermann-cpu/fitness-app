import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

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

const EQUIPMENT_OPTIONS = [
  { id: 'home',       label: 'Home',       emoji: '🏠' },
  { id: 'gym',        label: 'Gym',        emoji: '🏋️' },
  { id: 'bodyweight', label: 'Bodyweight', emoji: '🤸' },
  { id: 'outdoor',    label: 'Outdoor',    emoji: '🌲' },
] as const

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

  // ── Active pillars section state ──
  const [activePillars,   setActivePillars]   = useState<string[]>(
    profile?.active_pillars?.length ? profile.active_pillars : ALL_PILLARS
  )
  const [savingPillars, setSavingPillars] = useState(false)
  const [savedPillars,  setSavedPillars]  = useState(false)

  useEffect(() => {
    if (!profile) return
    setDisplayName(profile.display_name ?? '')
    setLanguage(profile.language ?? 'de')
    setPrimaryPillar(profile.primary_pillar ?? '')
    setEquipment(profile.equipment ?? [])
    setActivePillars(profile.active_pillars?.length ? profile.active_pillars : ALL_PILLARS)
  }, [profile])

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
          {EQUIPMENT_OPTIONS.map((opt) => {
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
    </div>
  )
}
