import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useMeditations, useBreathworkTechniques } from '../hooks/useMeditations'
import type { Meditation, BreathworkTechnique } from '../hooks/useMeditations'
import { MeditationCard }         from '../components/meditation/MeditationCard'
import { MeditationSession }      from '../components/meditation/MeditationSession'
import { BreathworkCard }         from '../components/meditation/BreathworkCard'
import { BreathworkSession }      from '../components/meditation/BreathworkSession'
import { CustomTimer }            from '../components/meditation/CustomTimer'
import { CustomBreathworkEditor } from '../components/meditation/CustomBreathworkEditor'
import { MeditationHistory }      from '../components/meditation/MeditationHistory'

const PILLAR_COLOR = '#9B7FD4'

type Lang     = 'de' | 'en' | 'es'
type Tab      = 'meditate' | 'breathwork' | 'history'
type View     = 'list' | 'session' | 'breathwork_session' | 'custom_timer' | 'custom_breathwork_session'
type Category = 'all' | 'mindfulness' | 'body_scan' | 'sleep' | 'focus' | 'stress_relief' | 'morning' | 'visualization' | 'movement'

const T = {
  de: {
    title:          'Meditation',
    tabMeditate:    'Meditieren',
    tabBreathwork:  'Breathwork',
    tabHistory:     'Verlauf',
    all:            'Alle',
    mindfulness:    'Achtsamkeit',
    body_scan:      'Körper-Scan',
    sleep:          'Schlaf',
    focus:          'Fokus',
    stress_relief:  'Stressabbau',
    morning:        'Morgen',
    visualization:  'Visualisierung',
    movement:       'Bewegung',
    loading:        'Laden…',
    emptyMeditate:  'Keine Meditationen gefunden.',
    emptyBreath:    'Keine Techniken gefunden.',
    customTimer:    'Eigene Frequenz',
    customTimerSub: 'Freier Timer mit eigenem Klang',
  },
  en: {
    title:          'Meditation',
    tabMeditate:    'Meditate',
    tabBreathwork:  'Breathwork',
    tabHistory:     'History',
    all:            'All',
    mindfulness:    'Mindfulness',
    body_scan:      'Body Scan',
    sleep:          'Sleep',
    focus:          'Focus',
    stress_relief:  'Stress Relief',
    morning:        'Morning',
    visualization:  'Visualization',
    movement:       'Movement',
    loading:        'Loading…',
    emptyMeditate:  'No meditations found.',
    emptyBreath:    'No techniques found.',
    customTimer:    'Custom Frequency',
    customTimerSub: 'Free timer with your own sound',
  },
  es: {
    title:          'Meditación',
    tabMeditate:    'Meditar',
    tabBreathwork:  'Respiración',
    tabHistory:     'Historial',
    all:            'Todas',
    mindfulness:    'Atención plena',
    body_scan:      'Escaneo corporal',
    sleep:          'Sueño',
    focus:          'Enfoque',
    stress_relief:  'Alivio del estrés',
    morning:        'Mañana',
    visualization:  'Visualización',
    movement:       'Movimiento',
    loading:        'Cargando…',
    emptyMeditate:  'No se encontraron meditaciones.',
    emptyBreath:    'No se encontraron técnicas.',
    customTimer:    'Frecuencia propia',
    customTimerSub: 'Temporizador libre con tu propio sonido',
  },
}

const CATEGORIES: Category[] = [
  'all', 'mindfulness', 'body_scan', 'sleep', 'focus',
  'stress_relief', 'morning', 'visualization', 'movement',
]

export function MeditationPage() {
  const profile = useAuthStore((s) => s.profile)
  const lang    = ((profile?.language ?? 'en') as Lang)
  const t       = T[lang]

  const [tab,      setTab]      = useState<Tab>('meditate')
  const [view,     setView]     = useState<View>('list')
  const [catFilter, setCatFilter] = useState<Category>('all')

  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null)
  const [selectedTechnique,  setSelectedTechnique]  = useState<BreathworkTechnique | null>(null)

  const { data: meditations = [], isLoading: medsLoading, isError: medsError }   = useMeditations()
  const { data: techniques  = [], isLoading: techsLoading, isError: techsError }  = useBreathworkTechniques()

  const isLoading = medsLoading || techsLoading
  const isError   = medsError   || techsError

  const filtered = catFilter === 'all'
    ? meditations
    : meditations.filter((m) => m.category === catFilter)

  const handleSelectMeditation = (m: Meditation) => {
    setSelectedMeditation(m)
    setView('session')
  }

  const handleSelectTechnique = (t: BreathworkTechnique) => {
    setSelectedTechnique(t)
    setView('breathwork_session')
  }

  const handleFinishSession = () => {
    setSelectedMeditation(null)
    setSelectedTechnique(null)
    setView('list')
    setTab('history')
  }

  const handleBackFromSession = () => {
    setSelectedMeditation(null)
    setSelectedTechnique(null)
    setView('list')
  }

  // Full-screen session views
  if (view === 'session' && selectedMeditation) {
    return (
      <div className="min-h-svh bg-[var(--color-bg)] flex flex-col">
        <div className="flex-1 px-4 py-6 pb-24 max-w-lg mx-auto w-full overflow-y-auto">
          {/* Back button */}
          <button
            onClick={handleBackFromSession}
            className="mb-4 flex items-center gap-1 text-sm font-semibold"
            style={{ color: PILLAR_COLOR }}
          >
            ← {t.tabMeditate}
          </button>
          <MeditationSession
            meditation={selectedMeditation}
            lang={lang}
            onFinish={handleFinishSession}
          />
        </div>
      </div>
    )
  }

  if (view === 'breathwork_session' && selectedTechnique) {
    return (
      <div className="min-h-svh bg-[var(--color-bg)] flex flex-col">
        <div className="flex-1 px-4 py-6 pb-24 max-w-lg mx-auto w-full overflow-y-auto">
          <button
            onClick={handleBackFromSession}
            className="mb-4 flex items-center gap-1 text-sm font-semibold"
            style={{ color: PILLAR_COLOR }}
          >
            ← {t.tabBreathwork}
          </button>
          <BreathworkSession
            technique={selectedTechnique}
            lang={lang}
            onFinish={handleFinishSession}
          />
        </div>
      </div>
    )
  }

  if (view === 'custom_breathwork_session' && selectedTechnique) {
    return (
      <div className="min-h-svh bg-[var(--color-bg)] flex flex-col">
        <div className="flex-1 px-4 py-6 pb-24 max-w-lg mx-auto w-full overflow-y-auto">
          <button
            onClick={handleBackFromSession}
            className="mb-4 flex items-center gap-1 text-sm font-semibold"
            style={{ color: PILLAR_COLOR }}
          >
            ← {t.tabBreathwork}
          </button>
          <BreathworkSession
            technique={selectedTechnique}
            lang={lang}
            onFinish={handleFinishSession}
          />
        </div>
      </div>
    )
  }

  if (view === 'custom_timer') {
    return (
      <div className="min-h-svh bg-[var(--color-bg)] flex flex-col">
        <div className="flex-1 px-4 py-6 pb-24 max-w-lg mx-auto w-full overflow-y-auto">
          <button
            onClick={handleBackFromSession}
            className="mb-4 flex items-center gap-1 text-sm font-semibold"
            style={{ color: PILLAR_COLOR }}
          >
            ← {t.tabBreathwork}
          </button>
          <CustomTimer lang={lang} onFinish={handleFinishSession} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-[var(--color-bg)] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-10 pb-2">
        <h1 className="text-2xl font-black" style={{ color: PILLAR_COLOR }}>
          {t.title}
        </h1>
      </div>

      {/* Tab bar */}
      <div className="px-4 flex gap-1 bg-[var(--color-bg)] sticky top-0 z-10 pt-2 pb-3 border-b border-white/5">
        {([
          ['meditate',   t.tabMeditate],
          ['breathwork', t.tabBreathwork],
          ['history',    t.tabHistory],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              tab === id
                ? 'text-white'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
            style={tab === id ? { backgroundColor: PILLAR_COLOR } : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 pb-24 max-w-lg mx-auto w-full">

        {/* ── MEDITATE TAB ─────────────────────────────────────── */}
        {tab === 'meditate' && (
          <>
            {/* Category filter chips */}
            <div className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat) => {
                const label = (t as Record<string, string>)[cat] ?? cat
                return (
                  <button
                    key={cat}
                    onClick={() => setCatFilter(cat)}
                    className="shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                    style={
                      catFilter === cat
                        ? { backgroundColor: PILLAR_COLOR, color: 'white' }
                        : { backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)' }
                    }
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            <div className="px-4 space-y-3">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <span className="text-sm text-[var(--color-text-muted)]">{t.loading}</span>
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <span className="text-4xl">⚠️</span>
                  <p className="text-sm text-[var(--color-text-muted)]">Daten konnten nicht geladen werden.</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <span className="text-4xl">🧘</span>
                  <p className="text-sm text-[var(--color-text-muted)]">{t.emptyMeditate}</p>
                </div>
              ) : (
                filtered.map((m) => (
                  <MeditationCard
                    key={m.id}
                    meditation={m}
                    lang={lang}
                    onClick={() => handleSelectMeditation(m)}
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* ── BREATHWORK TAB ───────────────────────────────────── */}
        {tab === 'breathwork' && (
          <div className="px-4 py-4 space-y-3">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <span className="text-sm text-[var(--color-text-muted)]">{t.loading}</span>
              </div>
            ) : isError ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <span className="text-4xl">⚠️</span>
                <p className="text-sm text-[var(--color-text-muted)]">Daten konnten nicht geladen werden.</p>
              </div>
            ) : (
              <>
                {/* Custom breathwork editor (inline) */}
                <CustomBreathworkEditor
                  lang={lang}
                  onStart={(technique) => {
                    setSelectedTechnique(technique)
                    setView('custom_breathwork_session')
                  }}
                />

                {/* Divider */}
                <div className="border-t border-white/8 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-3">
                    Techniken
                  </p>
                </div>

                {/* Custom timer CTA */}
                <button
                  onClick={() => setView('custom_timer')}
                  className="w-full text-left rounded-[var(--radius-md)] p-4 border active:scale-[0.98] transition-transform"
                  style={{ backgroundColor: `${PILLAR_COLOR}15`, borderColor: `${PILLAR_COLOR}44` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⏱</span>
                    <div>
                      <p className="font-semibold text-[var(--color-text)]">{t.customTimer}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{t.customTimerSub}</p>
                    </div>
                    <span className="ml-auto text-lg" style={{ color: PILLAR_COLOR }}>→</span>
                  </div>
                </button>

                {techniques.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <span className="text-4xl">🌬</span>
                    <p className="text-sm text-[var(--color-text-muted)]">{t.emptyBreath}</p>
                  </div>
                ) : (
                  techniques.map((tech) => (
                    <BreathworkCard
                      key={tech.id}
                      technique={tech}
                      lang={lang}
                      onClick={() => handleSelectTechnique(tech)}
                    />
                  ))
                )}
              </>
            )}
          </div>
        )}

        {/* ── HISTORY TAB ──────────────────────────────────────── */}
        {tab === 'history' && (
          <div className="px-4 py-4">
            <MeditationHistory
              meditations={meditations}
              techniques={techniques}
              lang={lang}
            />
          </div>
        )}
      </div>
    </div>
  )
}
