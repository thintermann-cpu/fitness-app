import { useState, useMemo } from 'react'
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
import { AdHocMeditationTimer }  from '../components/meditation/AdHocMeditationTimer'
import { AmbientPlayer }         from '../components/meditation/AmbientPlayer'
import { FilterBottomSheet }     from '../components/ui/FilterBottomSheet'

const PILLAR_COLOR = '#9B7FD4'

type Lang     = 'de' | 'en' | 'es'
type Tab      = 'meditate' | 'breathwork' | 'history'
type View     = 'list' | 'session' | 'breathwork_session' | 'custom_timer' | 'custom_breathwork_session' | 'free_meditation'
type Category  = 'all' | 'mindfulness' | 'body_scan' | 'sleep' | 'focus' | 'stress_relief' | 'morning' | 'visualization' | 'movement'
type DurFilter = 0 | 5 | 10 | 15 | 20 | 30

const DUR_OPTIONS: DurFilter[] = [0, 5, 10, 15, 20, 30]

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
    freeTitle:      'Freie Meditation',
    freeStart:      'Starten',
    filterCat:      'Kategorie',
    filterDur:      'Dauer',
    filterApply:    'Anwenden',
    filterReset:    'Zurücksetzen',
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
    freeTitle:      'Free Meditation',
    freeStart:      'Start',
    filterCat:      'Category',
    filterDur:      'Duration',
    filterApply:    'Apply',
    filterReset:    'Reset',
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
    freeTitle:      'Meditación libre',
    freeStart:      'Iniciar',
    filterCat:      'Categoría',
    filterDur:      'Duración',
    filterApply:    'Aplicar',
    filterReset:    'Restablecer',
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

  const [tab,          setTab]          = useState<Tab>('meditate')
  const [view,         setView]         = useState<View>('list')
  const [catFilter,    setCatFilter]    = useState<Category>('all')
  const [durFilter,    setDurFilter]    = useState<DurFilter>(0)
  const [freeDuration, setFreeDuration] = useState(10)
  const [filterOpen,   setFilterOpen]   = useState(false)
  const [draftCat,     setDraftCat]     = useState<Category>('all')
  const [draftDur,     setDraftDur]     = useState<DurFilter>(0)

  const activeFilterCount = (catFilter !== 'all' ? 1 : 0) + (durFilter !== 0 ? 1 : 0)

  const openFilter = () => { setDraftCat(catFilter); setDraftDur(durFilter); setFilterOpen(true) }
  const applyFilter = () => { setCatFilter(draftCat); setDurFilter(draftDur); setFilterOpen(false) }
  const resetFilter = () => { setCatFilter('all'); setDurFilter(0); setFilterOpen(false) }

  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null)
  const [selectedTechnique,  setSelectedTechnique]  = useState<BreathworkTechnique | null>(null)

  const { data: meditations = [], isLoading: medsLoading, isError: medsError }   = useMeditations()
  const { data: techniques  = [], isLoading: techsLoading, isError: techsError }  = useBreathworkTechniques()

  const isLoading = medsLoading || techsLoading
  const isError   = medsError   || techsError

  const catFiltered = useMemo(
    () => catFilter === 'all' ? meditations : meditations.filter((m) => m.category === catFilter),
    [meditations, catFilter],
  )

  const filtered = useMemo(
    () => durFilter === 0 ? catFiltered : catFiltered.filter((m) => m.duration_min > 0 && m.duration_min <= durFilter),
    [catFiltered, durFilter],
  )

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
      <div className="min-h-svh bg-[var(--color-bg)] flex flex-col overflow-x-hidden">
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
      <div className="min-h-svh bg-[var(--color-bg)] flex flex-col overflow-x-hidden">
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
      <div className="min-h-svh bg-[var(--color-bg)] flex flex-col overflow-x-hidden">
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
      <div className="min-h-svh bg-[var(--color-bg)] flex flex-col overflow-x-hidden">
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

  if (view === 'free_meditation') {
    return (
      <div className="min-h-svh bg-[var(--color-bg)] flex flex-col overflow-x-hidden">
        <div className="flex-1 px-4 py-6 pb-24 max-w-lg mx-auto w-full overflow-y-auto">
          <button
            onClick={handleBackFromSession}
            className="mb-6 flex items-center gap-1 text-sm font-semibold"
            style={{ color: PILLAR_COLOR }}
          >
            ← {t.tabMeditate}
          </button>
          <AdHocMeditationTimer duration={freeDuration} lang={lang} onFinish={handleFinishSession} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-[var(--color-bg)] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-4 lg:pt-10 pb-2 flex items-end justify-between">
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
            {/* Ambient Sound */}
            <div className="px-4 pt-4 pb-2">
              <AmbientPlayer />
            </div>

            {/* Quick meditation */}
            <div className="px-4 pt-2 pb-2">
              <div
                className="rounded-[var(--radius-md)] p-4 border"
                style={{ backgroundColor: `${PILLAR_COLOR}10`, borderColor: `${PILLAR_COLOR}30` }}
              >
                <p className="text-sm font-semibold mb-3" style={{ color: PILLAR_COLOR }}>
                  🧘 {t.freeTitle}
                </p>
                <div className="flex gap-2 mb-3">
                  {([5, 10, 20] as const).map((min) => (
                    <button
                      key={min}
                      onClick={() => setFreeDuration(min)}
                      className="flex-1 py-2 rounded-xl text-sm font-semibold transition-colors"
                      style={
                        freeDuration === min
                          ? { backgroundColor: PILLAR_COLOR, color: 'white' }
                          : { backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-muted)' }
                      }
                    >
                      {min} min
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setView('free_meditation')}
                  className="w-full py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ backgroundColor: PILLAR_COLOR }}
                >
                  ▶ {t.freeStart}
                </button>
              </div>
            </div>

            {/* Filter button bar */}
            <div className="px-4 pt-3 pb-2 flex items-center justify-between">
              <span className="text-xs text-[var(--color-text-muted)]">
                {filtered.length}
              </span>
              <button
                onClick={openFilter}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                style={
                  activeFilterCount > 0
                    ? { backgroundColor: `${PILLAR_COLOR}25`, color: PILLAR_COLOR, border: `1px solid ${PILLAR_COLOR}60` }
                    : { backgroundColor: 'var(--color-bg-card)', color: 'var(--color-text-muted)', border: '1px solid transparent' }
                }
              >
                <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M1 2h10L7 6.5V10l-2-1V6.5L1 2z"/>
                </svg>
                {activeFilterCount > 0 ? `Filter · ${activeFilterCount}` : 'Filter'}
              </button>
            </div>

            <div className="px-4 space-y-3">
              {isLoading ? (
                <>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-white/5 p-4 animate-pulse">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="h-4 rounded bg-white/10 flex-1" />
                        <div className="h-5 w-20 rounded-full bg-white/10" />
                      </div>
                      <div className="h-3 rounded bg-white/10 mb-1.5 w-full" />
                      <div className="h-3 rounded bg-white/10 w-2/3" />
                      <div className="mt-3 flex gap-2">
                        <div className="h-2.5 w-14 rounded bg-white/10" />
                        <div className="h-2.5 w-10 rounded bg-white/10" />
                      </div>
                    </div>
                  ))}
                </>
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
              <>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-[var(--radius-md)] bg-[var(--color-bg-card)] border border-white/5 p-4 animate-pulse">
                    <div className="h-4 rounded bg-white/10 mb-2 w-3/4" />
                    <div className="h-3 rounded bg-white/10 w-full mb-1.5" />
                    <div className="h-3 rounded bg-white/10 w-1/2" />
                  </div>
                ))}
              </>
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

      <FilterBottomSheet
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={applyFilter}
        onReset={resetFilter}
        pillarColor={PILLAR_COLOR}
        activeCount={activeFilterCount}
        applyLabel={t.filterApply}
        resetLabel={t.filterReset}
      >
        {/* Category group */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, color: '#6a6258', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            {t.filterCat}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES.map((cat) => {
              const label = (t as Record<string, string>)[cat] ?? cat
              return (
                <button
                  key={cat}
                  onClick={() => setDraftCat(cat)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 20,
                    border: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: draftCat === cat ? PILLAR_COLOR : 'rgba(255,255,255,0.07)',
                    color: draftCat === cat ? 'white' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Duration group */}
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontSize: 11, color: '#6a6258', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
            {t.filterDur}
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {DUR_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDraftDur(d)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 20,
                  border: 'none',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: draftDur === d ? PILLAR_COLOR : 'rgba(255,255,255,0.07)',
                  color: draftDur === d ? 'white' : 'rgba(255,255,255,0.5)',
                }}
              >
                {d === 0 ? t.all : `≤${d} min`}
              </button>
            ))}
          </div>
        </div>
      </FilterBottomSheet>
    </div>
  )
}
