import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

const TOTAL_STEPS = 4

const LANGUAGES = [
  { id: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { id: 'en', label: 'English',  flag: '🇬🇧' },
  { id: 'es', label: 'Español',  flag: '🇪🇸' },
] as const

const PILLARS = [
  { id: 'workout',    label: 'Workout',    emoji: '🏋️', color: '#E8642A' },
  { id: 'routine',    label: 'Mein Tag',   emoji: '📋', color: '#4A90D9' },
  { id: 'stretching', label: 'Stretching', emoji: '🤸', color: '#7BC67E' },
  { id: 'meditation', label: 'Meditation', emoji: '🧘', color: '#9B7FD4' },
] as const

const EQUIPMENT_OPTIONS = [
  { id: 'home',       label: 'Home',       emoji: '🏠' },
  { id: 'gym',        label: 'Gym',        emoji: '🏋️' },
  { id: 'bodyweight', label: 'Bodyweight', emoji: '🤸' },
  { id: 'outdoor',    label: 'Outdoor',    emoji: '🌲' },
] as const

export function OnboardingPage() {
  const navigate = useNavigate()
  const { user, fetchProfile } = useAuthStore()

  const [step, setStep]       = useState(0)
  const [animKey, setAnimKey] = useState(0)

  // Step data
  const [displayName,   setDisplayName]   = useState('')
  const [language,      setLanguage]      = useState('de')
  const [primaryPillar, setPrimaryPillar] = useState<string | null>(null)
  const [equipment,     setEquipment]     = useState<string[]>([])

  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState<string | null>(null)

  const advance = () => {
    setStep((s) => s + 1)
    setAnimKey((k) => k + 1)
  }

  const toggleEquipment = (id: string) =>
    setEquipment((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    )

  const handleFinish = async () => {
    if (!user || !primaryPillar) return
    setSaving(true)
    setError(null)

    const { error: dbErr } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.id,
        display_name: displayName.trim() || null,
        language,
        primary_pillar: primaryPillar,
        active_pillars: [primaryPillar],
        equipment,
        updated_at: new Date().toISOString(),
      })

    if (dbErr) {
      setError(dbErr.message)
      setSaving(false)
      return
    }

    await fetchProfile()
    navigate('/', { replace: true })
  }

  const firstName = displayName.trim().split(' ')[0] || 'du'

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Progress bar */}
      <div className="h-1 w-full" style={{ backgroundColor: 'var(--color-bg-elevated)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{
            backgroundColor: 'var(--color-primary)',
            width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
          }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-md mx-auto w-full">
        <div key={animKey} className="step-enter w-full space-y-8">

          {/* ── Step 0: Name ── */}
          {step === 0 && (
            <>
              <div className="text-center space-y-3">
                <div className="text-5xl">👋</div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  Willkommen bei CarveOut!
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Wie darf ich dich nennen?
                </p>
              </div>

              <Input
                placeholder="Dein Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && advance()}
              />

              <Button className="w-full" onClick={advance}>
                Weiter
              </Button>
            </>
          )}

          {/* ── Step 1: Language ── */}
          {step === 1 && (
            <>
              <div className="text-center space-y-3">
                <div className="text-5xl">🌍</div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  Hallo {firstName}!
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Welche Sprache bevorzugst du?
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {LANGUAGES.map((lang) => {
                  const selected = language === lang.id
                  return (
                    <button
                      key={lang.id}
                      onClick={() => setLanguage(lang.id)}
                      className="rounded-2xl px-5 py-4 flex items-center gap-4 transition-transform active:scale-[0.98]"
                      style={{
                        backgroundColor: selected
                          ? 'var(--color-primary)' + '22'
                          : 'var(--color-bg-card)',
                        border: `2px solid ${selected ? 'var(--color-primary)' : 'transparent'}`,
                        color: 'var(--color-text)',
                      }}
                    >
                      <span className="text-3xl">{lang.flag}</span>
                      <span className="font-semibold">{lang.label}</span>
                      {selected && (
                        <span className="ml-auto text-sm" style={{ color: 'var(--color-primary)' }}>
                          ✓
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <Button className="w-full" onClick={advance}>
                Weiter
              </Button>
            </>
          )}

          {/* ── Step 2: Primary Pillar ── */}
          {step === 2 && (
            <>
              <div className="text-center space-y-3">
                <div className="text-5xl">🎯</div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  Dein Hauptfokus
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Was treibt dich an?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {PILLARS.map((p) => {
                  const selected = primaryPillar === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPrimaryPillar(p.id)}
                      className="rounded-2xl p-5 text-left transition-transform active:scale-95"
                      style={{
                        backgroundColor: selected ? p.color + '22' : 'var(--color-bg-card)',
                        border: `2px solid ${selected ? p.color : 'transparent'}`,
                        color: 'var(--color-text)',
                      }}
                    >
                      <div className="text-3xl mb-2">{p.emoji}</div>
                      <div className="font-semibold text-sm">{p.label}</div>
                    </button>
                  )
                })}
              </div>

              <Button className="w-full" disabled={!primaryPillar} onClick={advance}>
                Weiter
              </Button>
            </>
          )}

          {/* ── Step 3: Equipment ── */}
          {step === 3 && (
            <>
              <div className="text-center space-y-3">
                <div className="text-5xl">⚙️</div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  Dein Equipment
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Wo trainierst du? Mehrfachauswahl möglich.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {EQUIPMENT_OPTIONS.map((opt) => {
                  const selected = equipment.includes(opt.id)
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleEquipment(opt.id)}
                      className="rounded-2xl p-5 text-left transition-transform active:scale-95"
                      style={{
                        backgroundColor: selected
                          ? 'var(--color-primary)22'
                          : 'var(--color-bg-card)',
                        border: `2px solid ${selected ? 'var(--color-primary)' : 'transparent'}`,
                        color: 'var(--color-text)',
                      }}
                    >
                      <div className="text-3xl mb-2">{opt.emoji}</div>
                      <div className="font-semibold text-sm">{opt.label}</div>
                    </button>
                  )
                })}
              </div>

              {error && (
                <p className="text-sm text-center" style={{ color: 'var(--color-error)' }}>
                  {error}
                </p>
              )}

              <Button className="w-full" loading={saving} onClick={handleFinish}>
                Los geht's 🚀
              </Button>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
