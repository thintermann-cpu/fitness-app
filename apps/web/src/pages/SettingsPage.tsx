import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

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
  const [savingProfile, setSavingProfile] = useState(false)
  const [savedProfile,  setSavedProfile]  = useState(false)

  // ── Equipment section state ──
  const [equipment,      setEquipment]      = useState<string[]>(profile?.equipment ?? [])
  const [savingEquip,    setSavingEquip]    = useState(false)
  const [savedEquip,     setSavedEquip]     = useState(false)

  useEffect(() => {
    if (!profile) return
    setDisplayName(profile.display_name ?? '')
    setLanguage(profile.language ?? 'de')
    setEquipment(profile.equipment ?? [])
  }, [profile])

  const handleSaveProfile = async () => {
    setSavingProfile(true)
    await updateProfile({ display_name: displayName.trim() || null, language })
    setSavingProfile(false)
    setSavedProfile(true)
    setTimeout(() => setSavedProfile(false), 2000)
  }

  const toggleEquipment = (id: string) =>
    setEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    )

  const handleSaveEquip = async () => {
    setSavingEquip(true)
    await updateProfile({ equipment })
    setSavingEquip(false)
    setSavedEquip(true)
    setTimeout(() => setSavedEquip(false), 2000)
  }

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
            Name und Sprache
          </p>
        </div>

        <Input
          placeholder="Dein Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <div className="flex gap-2">
          {LANGUAGES.map((lang) => {
            const selected = language === lang.id
            return (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className="flex-1 rounded-xl py-3 flex flex-col items-center gap-1 transition-transform active:scale-95"
                style={{
                  backgroundColor: selected
                    ? 'var(--color-primary)22'
                    : 'var(--color-bg-card)',
                  border: `2px solid ${selected ? 'var(--color-primary)' : 'transparent'}`,
                  color: 'var(--color-text)',
                }}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-xs font-medium">{lang.label}</span>
              </button>
            )
          })}
        </div>

        <SaveButton
          loading={savingProfile}
          saved={savedProfile}
          onClick={handleSaveProfile}
        />
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
                  backgroundColor: selected
                    ? 'var(--color-primary)22'
                    : 'var(--color-bg-card)',
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

        <SaveButton
          loading={savingEquip}
          saved={savedEquip}
          onClick={handleSaveEquip}
        />
      </section>
    </div>
  )
}
