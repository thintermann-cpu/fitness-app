import { useState } from 'react'
import { createPortal } from 'react-dom'
import { equipmentById, lookupExerciseName } from '../../lib/exerciseCatalog'
import { exerciseBlurb, exerciseVideoSearchUrl, type BlurbLang } from '../../lib/exerciseBlurbs'
import { trainingFramePaths } from '../../lib/trainingFrames'
import { usePoseFigure } from '../../lib/poseFigure'
import { useAuthStore } from '../../store/authStore'
import { ExerciseKeyframes } from '../shared/ExerciseKeyframes'

const VIDEO_LABEL: Record<BlurbLang, string> = {
  de: 'Auf YouTube suchen',
  en: 'Search on YouTube',
  es: 'Buscar en YouTube',
}

interface Props {
  name: string
  detail?: string
}

export function ExerciseInfoButton({ name, detail }: Props) {
  const [open, setOpen] = useState(false)
  const lang = (useAuthStore((s) => s.profile?.language) ?? 'de') as BlurbLang
  const figure = usePoseFigure()
  const hit = lookupExerciseName(name)
  const gear = (hit?.equipment ?? [])
    .map((id) => equipmentById(id)?.name)
    .filter((label): label is string => !!label)
  const blurb = exerciseBlurb(hit?.name ?? name, lang)
  const frames = trainingFramePaths(hit?.name ?? name, figure)
  const videoHref = exerciseVideoSearchUrl(hit?.name ?? name)

  return (
    <>
      <button
        type="button"
        aria-label={`Info zu ${name}`}
        onClick={(event) => {
          event.stopPropagation()
          setOpen(true)
        }}
        className="w-6 h-6 shrink-0 rounded-full text-[11px] font-bold leading-none"
        style={{
          backgroundColor: 'rgba(255,255,255,0.08)',
          color: 'var(--color-text-muted)',
          border: 'none',
        }}
      >
        i
      </button>
      {open && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-end"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />
          <div
            role="dialog"
            aria-label={name}
            className="relative w-full rounded-t-3xl px-5 pt-5 pb-8"
            style={{ backgroundColor: 'var(--color-bg-card)' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-black" style={{ color: 'var(--color-text)' }}>{name}</h3>
              <button
                type="button"
                aria-label="Schliessen"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full text-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'var(--color-text-muted)', border: 'none' }}
              >
                ✕
              </button>
            </div>
            {detail && (
              <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--color-pillar-workout)' }}>
                {detail}
              </p>
            )}
            {gear.length > 0 && (
              <p className="mt-2 text-sm" style={{ color: 'var(--color-text)' }}>
                {gear.join(' · ')}
              </p>
            )}
            {frames.length > 0 && (
              <div className="relative mt-4 h-44 w-full overflow-hidden rounded-2xl">
                <ExerciseKeyframes exerciseId={hit?.id ?? name} frames={frames} interval={1600} />
              </div>
            )}
            {blurb && (
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {blurb}
              </p>
            )}
            <a
              href={videoHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold"
              style={{ color: 'var(--color-pillar-workout)' }}
            >
              {VIDEO_LABEL[lang] ?? VIDEO_LABEL.de}
            </a>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
