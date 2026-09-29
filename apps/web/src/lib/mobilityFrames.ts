/** Drawn mobility frames, keyed by the English exercise name. Missing keys keep the stick figure. */
const FRAMES: Record<string, string[]> = {
  'hip-flexor-lunge': frames('hip-flexor-lunge'),
  'pigeon-pose': frames('pigeon-pose'),
  'figure-four-stretch': frames('figure-four-stretch'),
  'butterfly-stretch': frames('butterfly-stretch'),
  'low-lunge-hip-opener': frames('low-lunge-hip-opener'),
  'seated-hip-rotation': frames('seated-hip-rotation'),
  '90-90-hip-stretch': frames('90-90-hip-stretch'),
  'standing-hip-circle': frames('standing-hip-circle'),
}

function frames(slug: string): string[] {
  return [1, 2, 3].map((n) => `/exercises/mobility/${slug}/${n}.webp`)
}

/** English catalog name → folder slug. Apostrophes drop, 90/90 becomes 90-90. */
export function mobilitySlug(nameEn: string): string {
  return nameEn
    .normalize('NFKD')
    .replace(/['’]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Frame URLs for one mobility exercise. Empty until those drawings exist. */
export function mobilityFramePaths(nameEn: string | null | undefined): string[] {
  if (!nameEn) return []
  return FRAMES[mobilitySlug(nameEn)] ?? []
}
