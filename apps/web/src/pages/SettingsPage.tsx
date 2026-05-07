import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/ui/Button'

const EQUIPMENT_OPTIONS = [
  { id: 'home',       label: 'Home',       emoji: '🏠' },
  { id: 'gym',        label: 'Gym',        emoji: '🏋️' },
  { id: 'bodyweight', label: 'Bodyweight', emoji: '🤸' },
  { id: 'outdoor',    label: 'Outdoor',    emoji: '🌲' },
] as const

export function SettingsPage() {
  const { profile, updateProfile } = useAuthStore()

  const [equipment, setEquipment] = useState<string[]>(profile?.equipment ?? [])
  const [saving, setSaving]       = useState(false)
  const [saved, setSaved]         = useState(false)

  useEffect(() => {
    if (profile?.equipment) setEquipment(profile.equipment)
  }, [profile])

  const toggleEquipment = (id: string) => {
    setEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    )
  }

  const handleSave = async () => {
    setSaving(true)
    await updateProfile({ equipment })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div
      className="p-4 max-w-md mx-auto space-y-8"
      style={{ color: 'var(--color-text)' }}
    >
      <h1 className="text-xl font-bold pt-2">Einstellungen</h1>

      {/* Equipment section */}
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
                    ? 'var(--color-primary)' + '22'
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

        <Button
          className="w-full"
          loading={saving}
          onClick={handleSave}
          style={saved ? { backgroundColor: 'var(--color-success)' } : undefined}
        >
          {saved ? 'Gespeichert ✓' : 'Speichern'}
        </Button>
      </section>
    </div>
  )
}
