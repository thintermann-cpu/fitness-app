/** All 65 mobility exercises. Three frames each. Unknown names keep the stick figure. */
const SLUGS = [
  'hip-flexor-lunge',
  'pigeon-pose',
  'figure-four-stretch',
  'butterfly-stretch',
  'low-lunge-hip-opener',
  'seated-hip-rotation',
  '90-90-hip-stretch',
  'standing-hip-circle',
  'cat-cow-stretch',
  'childs-pose',
  'seated-spinal-twist',
  'cobra-stretch',
  'knees-to-chest',
  'thoracic-extension',
  'foam-roll-back',
  'standing-back-bend',
  'superman-stretch',
  'thread-the-needle',
  'cross-body-shoulder-stretch',
  'doorway-chest-stretch',
  'overhead-triceps-stretch',
  'shoulder-circles',
  'shoulder-blade-squeeze',
  'wall-shoulder-stretch',
  'sleeper-stretch',
  'eagle-arms-stretch',
  'standing-hamstring-stretch',
  'seated-forward-fold',
  'supine-hamstring-stretch',
  'downward-dog',
  'standing-forward-fold',
  'half-split',
  'lying-hamstring-lift',
  'wide-legged-forward-fold',
  'doorway-chest-opener',
  'lying-chest-stretch',
  'clasped-hands-pec-stretch',
  'seated-twist-chest-open',
  'side-lying-chest-stretch',
  'standing-calf-stretch',
  'seated-calf-stretch',
  'downward-dog-calf-walk',
  'step-calf-stretch',
  'wall-calf-stretch',
  'neck-side-stretch',
  'neck-rotation',
  'chin-tuck',
  'shoulder-shrug-release',
  'upper-trap-stretch',
  'standing-side-stretch',
  'worlds-greatest-stretch',
  'inchworm-stretch',
  'sun-salutation',
  'bear-hug-stretch',
  'lying-spinal-twist',
  'happy-baby-pose',
  'legs-up-the-wall',
  'reclined-bound-angle',
  'forward-fold-with-arm-swing',
  'dynamic-arm-circles',
  'hip-flexor-thoracic-rotation',
  't-spine-rotation',
  'reverse-prayer-stretch',
  'sumo-squat-hold',
  'malasana-low-squat',
]

function frames(slug: string): string[] {
  return [1, 2, 3].map((n) => `/exercises/mobility/${slug}/${n}.webp`)
}

const FRAMES: Record<string, string[]> = Object.fromEntries(SLUGS.map((slug) => [slug, frames(slug)]))

/** English catalog name → folder slug. Apostrophes drop, 90/90 becomes 90-90. */
export function mobilitySlug(nameEn: string): string {
  return nameEn
    .normalize('NFKD')
    .replace(/['’]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Frame URLs for one mobility exercise. Empty when the name is not in the catalog. */
export function mobilityFramePaths(nameEn: string | null | undefined): string[] {
  if (!nameEn) return []
  return FRAMES[mobilitySlug(nameEn)] ?? []
}
