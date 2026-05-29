import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SlidePillar {
  label: string
  color: string
  emoji: string
}

interface Slide {
  id: string
  emoji: string
  title: string
  subtitle: string
  subtitleExtra?: string
  pillarColor: string | null
  pillars?: SlidePillar[]
}

const SKIP_LABEL: Record<string, string>  = { de: 'Überspringen', en: 'Skip', es: 'Omitir' }
const NEXT_LABEL: Record<string, string>  = { de: 'Weiter', en: 'Next', es: 'Siguiente' }
const START_LABEL: Record<string, string> = { de: "Los geht's!", en: "Let's go!", es: '¡Vamos!' }

export function OnboardingSlides({ lang = 'de' }: { lang?: string }) {
  const navigate = useNavigate()
  const [slides, setSlides]   = useState<Slide[]>([])
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('carveout_tour_done') === 'true') return
    fetch('/onboarding-slides.json')
      .then((r) => r.json())
      .then((data: Slide[]) => {
        if (data.length > 0) {
          setSlides(data)
          setVisible(true)
        }
      })
      .catch(() => {})
  }, [])

  if (!visible || slides.length === 0) return null

  const slide  = slides[current]
  const isLast = current === slides.length - 1
  const accent = slide.pillarColor ?? '#E8642A'

  const finish = () => {
    localStorage.setItem('carveout_tour_done', 'true')
    setVisible(false)
    navigate('/home', { replace: true })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Skip */}
      <div className="flex justify-end p-4">
        <button
          onClick={finish}
          className="text-sm font-medium px-3 py-1.5 rounded-full"
          style={{ color: 'var(--color-text-muted)', backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          {SKIP_LABEL[lang] ?? SKIP_LABEL.de}
        </button>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
          style={{ backgroundColor: `${accent}18`, border: `2px solid ${accent}30` }}
        >
          {slide.emoji}
        </div>

        <div className="space-y-4 w-full">
          <h1 className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>
            {slide.title}
          </h1>

          {slide.pillars ? (
            <>
              <div className="flex flex-wrap justify-center gap-2">
                {slide.pillars.map(p => (
                  <span
                    key={p.label}
                    className="px-3 py-1.5 rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: `${p.color}22`,
                      color: p.color,
                      border: `1.5px solid ${p.color}55`,
                    }}
                  >
                    {p.emoji} {p.label}
                  </span>
                ))}
              </div>
              <p className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
                {slide.subtitle}
              </p>
            </>
          ) : slide.subtitleExtra ? (
            <>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {slide.subtitle}
              </p>
              <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {slide.subtitleExtra}
              </p>
            </>
          ) : (
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 pb-4">
        {slides.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width:  i === current ? 20 : 6,
              height: 6,
              backgroundColor: i === current ? accent : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="px-6 pb-10 flex flex-col gap-3">
        <button
          onClick={isLast ? finish : () => setCurrent((c) => c + 1)}
          className="w-full py-4 rounded-2xl font-bold text-white text-base"
          style={{ backgroundColor: accent }}
        >
          {isLast ? (START_LABEL[lang] ?? START_LABEL.de) : (NEXT_LABEL[lang] ?? NEXT_LABEL.de)}
        </button>
        {current > 0 && (
          <button
            onClick={() => setCurrent((c) => c - 1)}
            className="w-full py-2.5 rounded-2xl text-sm font-medium"
            style={{ color: 'var(--color-text-muted)', backgroundColor: 'rgba(255,255,255,0.05)' }}
          >
            ←
          </button>
        )}
      </div>
    </div>
  )
}
