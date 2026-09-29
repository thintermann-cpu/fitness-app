import type { PoseFigure } from './poseFigure'
import { mobilitySlug } from './mobilityFrames'
import frameCounts from '../data/trainingFrameCounts.json' with { type: 'json' }
import frameReady from '../data/trainingFrameReady.json' with { type: 'json' }

const COUNTS = frameCounts as Record<string, number>
const READY = frameReady as Record<PoseFigure, string[]>

/** Frame URLs for a catalog exercise. Empty until that figure's frames are on disk. */
export function trainingFramePaths(
  name: string | null | undefined,
  figure: PoseFigure = 'male',
): string[] {
  if (!name) return []
  const slug = mobilitySlug(name)
  const count = COUNTS[slug]
  if (!count || !READY[figure]?.includes(slug)) return []
  const root = figure === 'female' ? '/exercises/training-f' : '/exercises/training'
  return Array.from({ length: count }, (_, index) => `${root}/${slug}/${index + 1}.webp`)
}
