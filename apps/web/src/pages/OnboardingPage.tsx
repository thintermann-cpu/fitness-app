import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/ui/Button'

const TOTAL_STEPS = 4

const LANGUAGES = [
  { id: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { id: 'en', label: 'English',  flag: '🇬🇧' },
  { id: 'es', label: 'Español',  flag: '🇪🇸' },
] as const

const GOALS = [
  { id: 'abnehmen',    label: 'Gewicht reduzieren',          emoji: '🔥' },
  { id: 'muskel',      label: 'Kraft & Muskeln aufbauen',    emoji: '💪' },
  { id: 'kondition',   label: 'Kondition verbessern',        emoji: '❤️' },
  { id: 'beweglich',   label: 'Beweglichkeit verbessern',    emoji: '🤸' },
  { id: 'stress',      label: 'Stress abbauen & Erholen',    emoji: '🧘' },
  { id: 'gesundheit',  label: 'Allgemeine Gesundheit',       emoji: '🌱' },
] as const

const EQUIPMENT_OPTIONS = [
  { id: 'Bodyweight',       label: 'Kein Equipment',      emoji: '🤸' },
  { id: 'Barbell',          label: 'Langhantel',           emoji: '🏋️' },
  { id: 'Dumbbells',        label: 'Kurzhanteln',          emoji: '🪣' },
  { id: 'Kettlebell',       label: 'Kettlebell',           emoji: '⚙️' },
  { id: 'Pull-up Bar',      label: 'Klimmzugstange',       emoji: '🔝' },
  { id: 'Rings',            label: 'Ringe',                emoji: '⭕' },
  { id: 'Rower',            label: 'Rudergerät',           emoji: '🚣' },
  { id: 'Bike',             label: 'Fahrrad / Assault',    emoji: '🚴' },
  { id: 'Box',              label: 'Box (Plyo)',            emoji: '📦' },
  { id: 'Jump Rope',        label: 'Sprungseil',            emoji: '🪢' },
  { id: 'Resistance Bands', label: 'Widerstandsbänder',    emoji: '🎀' },
  { id: 'Medicine Ball',    label: 'Medizinball',           emoji: '⚾' },
  { id: 'Laufen',           label: 'Laufen / Outdoor',     emoji: '🏃' },
  { id: 'Wall Ball',        label: 'Wall Ball',             emoji: '🎯' },
] as const

const PILLARS = [
  { id: 'workout',    label: 'Workout',         emoji: '🏋️', color: '#E8642A' },
  { id: 'routine',    label: 'Ritual',          emoji: '📋', color: '#4A90D9' },
  { id: 'stretching', label: 'Stretch & Yoga',  emoji: '🤸', color: '#7BC67E' },
  { id: 'meditation', label: 'Meditation',      emoji: '🧘', color: '#9B7FD4' },
] as const

export function OnboardingPage() {
  const navigate = useNavigate()
  const { user, fetchProfile } = useAuthStore()

  const [step, setStep]       = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const [language,  setLanguage]  = useState('de')
  const [goal,      setGoal]      = useState<string | null>(null)
  const [equipment, setEquipment] = useState<string[]>([])
  const [pillars,   setPillars]   = useState<string[]>([])

  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState<string | null>(null)

  const advance = () => {
    setStep((s) => s + 1)
    setAnimKey((k) => k + 1)
  }

  const toggleEquipment = (id: string) =>
    setEquipment((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id])

  const togglePillar = (id: string) =>
    setPillars((prev) => prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id])

  const handleFinish = async () => {
    if (!user || pillars.length === 0) return
    setSaving(true)
    setError(null)

    const { error: dbErr } = await supabase
      .from('user_profiles')
      .upsert({
        id: user.id,
        language,
        goal,
        equipment,
        primary_pillar: pillars[0],
        active_pillars: pillars,
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)' }}>
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

          {/* ── Step 0: Language ── */}
          {step === 0 && (
            <>
              <div className="text-center space-y-3">
                <div className="text-5xl">🌍</div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  Willkommen bei CarveOut!
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
                        backgroundColor: selected ? 'var(--color-primary)22' : 'var(--color-bg-card)',
                        border: `2px solid ${selected ? 'var(--color-primary)' : 'transparent'}`,
                        color: 'var(--color-text)',
                      }}
                    >
                      <span className="text-3xl">{lang.flag}</span>
                      <span className="font-semibold">{lang.label}</span>
                      {selected && (
                        <span className="ml-auto text-sm" style={{ color: 'var(--color-primary)' }}>✓</span>
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

          {/* ── Step 1: Goal ── */}
          {step === 1 && (
            <>
              <div className="text-center space-y-3">
                <div className="text-5xl">🎯</div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  Dein Ziel
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Was treibt dich an?
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                {GOALS.map((g) => {
                  const selected = goal === g.id
                  return (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className="rounded-2xl px-5 py-3.5 flex items-center gap-4 transition-transform active:scale-[0.98]"
                      style={{
                        backgroundColor: selected ? 'var(--color-primary)22' : 'var(--color-bg-card)',
                        border: `2px solid ${selected ? 'var(--color-primary)' : 'transparent'}`,
                        color: 'var(--color-text)',
                      }}
                    >
                      <span className="text-2xl">{g.emoji}</span>
                      <span className="font-semibold text-sm">{g.label}</span>
                      {selected && (
                        <span className="ml-auto text-sm" style={{ color: 'var(--color-primary)' }}>✓</span>
                      )}
                    </button>
                  )
                })}
              </div>

              <Button className="w-full" onClick={advance}>
                {goal ? 'Weiter' : 'Überspringen'}
              </Button>
            </>
          )}

          {/* ── Step 2: Equipment ── */}
          {step === 2 && (
            <>
              <div className="text-center space-y-3">
                <div className="text-5xl">⚙️</div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  Dein Equipment
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Was steht dir zur Verfügung? Mehrfachauswahl möglich.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {EQUIPMENT_OPTIONS.map((opt) => {
                  const selected = equipment.includes(opt.id)
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleEquipment(opt.id)}
                      className="rounded-2xl p-4 text-left transition-transform active:scale-95"
                      style={{
                        backgroundColor: selected ? 'var(--color-primary)22' : 'var(--color-bg-card)',
                        border: `2px solid ${selected ? 'var(--color-primary)' : 'transparent'}`,
                        color: 'var(--color-text)',
                      }}
                    >
                      <div className="text-2xl mb-1.5">{opt.emoji}</div>
                      <div className="font-semibold text-xs leading-tight">{opt.label}</div>
                    </button>
                  )
                })}
              </div>

              <Button className="w-full" onClick={advance}>
                {equipment.length > 0 ? `Weiter (${equipment.length} gewählt)` : 'Überspringen'}
              </Button>
            </>
          )}

          {/* ── Step 3: Pillars ── */}
          {step === 3 && (
            <>
              <div className="text-center space-y-3">
                <div className="text-5xl">✨</div>
                <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                  Deine Bereiche
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Was möchtest du in CarveOut nutzen?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {PILLARS.map((p) => {
                  const selected = pillars.includes(p.id)
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePillar(p.id)}
                      className="rounded-2xl p-5 text-left transition-transform active:scale-95"
                      style={{
                        backgroundColor: selected ? `${p.color}22` : 'var(--color-bg-card)',
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

              {error && (
                <p className="text-sm text-center" style={{ color: 'var(--color-error)' }}>
                  {error}
                </p>
              )}

              <Button
                className="w-full"
                loading={saving}
                disabled={pillars.length === 0}
                onClick={handleFinish}
              >
                Los geht's 🚀
              </Button>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
