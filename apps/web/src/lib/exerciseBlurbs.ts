import { lookupExerciseName } from './exerciseCatalog'
import { mobilitySlug } from './mobilityFrames'
import blurbs from '../data/exerciseBlurbs.json' with { type: 'json' }

export type BlurbLang = 'de' | 'en' | 'es'

type Blurb = { kind: 'mobility' | 'training'; de: string; en: string; es: string }

const BLURBS = blurbs as Record<string, Blurb>

export function exerciseBlurb(
  name: string | null | undefined,
  lang: BlurbLang,
): string | null {
  if (!name) return null
  const direct = BLURBS[mobilitySlug(name)]
  if (direct?.[lang]) return direct[lang]
  const hit = lookupExerciseName(name)
  const viaCatalog = hit ? BLURBS[mobilitySlug(hit.name)] : undefined
  return viaCatalog?.[lang] ?? null
}

/** Opens a YouTube search. No specific video is chosen. */
export function exerciseVideoSearchUrl(name: string): string {
  const query = `${name} exercise`
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
}
