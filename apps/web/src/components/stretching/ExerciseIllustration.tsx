const ILLUSTRATION_BG = '#9ED8A3'

const MUSCLE_EMOJI: Record<string, string> = {
  hip_flexors: '🦵',
  hamstrings: '🦵',
  quadriceps: '🦵',
  calves: '🦵',
  shoulders: '💪',
  upper_back: '💪',
  chest: '💪',
  back: '🙇',
  lower_back: '🙇',
  neck: '🙆',
  ankles: '🦶',
}

// Stick figure SVG poses (120×120 viewBox, white on colored bg)
const S = { stroke: 'white', strokeWidth: 4.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }
const HEAD = { fill: 'white', stroke: 'none' }

function Lunge() {
  return (
    <g {...S}>
      <circle cx="42" cy="14" r="9" {...HEAD} />
      {/* body leaning forward */}
      <line x1="42" y1="23" x2="48" y2="52" />
      {/* front leg (left) */}
      <line x1="48" y1="52" x2="28" y2="70" />
      <line x1="28" y1="70" x2="22" y2="108" />
      <line x1="14" y1="108" x2="30" y2="108" />
      {/* back leg (right, kneeling) */}
      <line x1="48" y1="52" x2="72" y2="66" />
      <line x1="72" y1="66" x2="76" y2="108" />
      {/* arms raised */}
      <line x1="44" y1="36" x2="25" y2="46" />
      <line x1="44" y1="36" x2="60" y2="28" />
    </g>
  )
}

function PigeonPose() {
  return (
    <g {...S}>
      <circle cx="60" cy="12" r="9" {...HEAD} />
      {/* torso upright */}
      <line x1="60" y1="21" x2="58" y2="52" />
      {/* front leg (rotated out, pigeon) */}
      <line x1="58" y1="52" x2="35" y2="62" />
      <line x1="35" y1="62" x2="28" y2="80" />
      <line x1="28" y1="80" x2="55" y2="85" />
      {/* back leg extended behind */}
      <line x1="58" y1="52" x2="80" y2="62" />
      <line x1="80" y1="62" x2="90" y2="96" />
      {/* arms for balance */}
      <line x1="58" y1="35" x2="35" y2="50" />
      <line x1="58" y1="35" x2="80" y2="50" />
    </g>
  )
}

function ForwardFold() {
  return (
    <g {...S}>
      {/* side view: person bending forward */}
      <circle cx="90" cy="32" r="9" {...HEAD} />
      {/* spine horizontal */}
      <line x1="82" y1="38" x2="42" y2="50" />
      {/* hip at left */}
      {/* legs straight down */}
      <line x1="42" y1="50" x2="38" y2="108" />
      <line x1="42" y1="50" x2="55" y2="108" />
      {/* arms hanging toward feet */}
      <line x1="65" y1="45" x2="58" y2="92" />
      <line x1="72" y1="43" x2="68" y2="92" />
      {/* feet on ground */}
      <line x1="30" y1="108" x2="45" y2="108" />
      <line x1="48" y1="108" x2="63" y2="108" />
    </g>
  )
}

function ChildsPose() {
  return (
    <g {...S}>
      {/* low crouching, arms extended forward */}
      <circle cx="90" cy="62" r="9" {...HEAD} />
      {/* body goes down and forward */}
      <line x1="82" y1="65" x2="55" y2="72" />
      {/* hips/butt up */}
      <line x1="55" y1="72" x2="50" y2="55" />
      <line x1="50" y1="55" x2="58" y2="40" />
      {/* knees on ground */}
      <line x1="55" y1="72" x2="52" y2="96" />
      <line x1="52" y1="96" x2="65" y2="104" />
      <line x1="65" y1="104" x2="80" y2="104" />
      {/* arms stretched forward */}
      <line x1="75" y1="65" x2="40" y2="68" />
      <line x1="40" y1="68" x2="20" y2="70" />
    </g>
  )
}

function ShoulderStretch() {
  return (
    <g {...S}>
      {/* front view, one arm across chest */}
      <circle cx="60" cy="14" r="9" {...HEAD} />
      {/* torso */}
      <line x1="60" y1="23" x2="60" y2="68" />
      {/* left arm crossing chest */}
      <line x1="60" y1="38" x2="90" y2="46" />
      <line x1="90" y1="46" x2="35" y2="50" />
      {/* right arm holding left */}
      <line x1="60" y1="38" x2="42" y2="42" />
      {/* legs */}
      <line x1="60" y1="68" x2="44" y2="108" />
      <line x1="60" y1="68" x2="76" y2="108" />
    </g>
  )
}

function QuadStretch() {
  return (
    <g {...S}>
      {/* standing, one foot grabbed behind */}
      <circle cx="55" cy="14" r="9" {...HEAD} />
      {/* body */}
      <line x1="55" y1="23" x2="55" y2="62" />
      {/* arms – one up for balance */}
      <line x1="55" y1="40" x2="35" y2="52" />
      <line x1="55" y1="40" x2="72" y2="30" />
      {/* standing leg */}
      <line x1="55" y1="62" x2="50" y2="108" />
      {/* bent leg */}
      <line x1="55" y1="62" x2="68" y2="80" />
      <line x1="68" y1="80" x2="60" y2="62" />
      {/* hand grabbing foot */}
      <line x1="72" y1="30" x2="65" y2="68" />
    </g>
  )
}

function Generic() {
  return (
    <g {...S}>
      {/* standing, arms out in T */}
      <circle cx="60" cy="14" r="9" {...HEAD} />
      <line x1="60" y1="23" x2="60" y2="68" />
      <line x1="60" y1="38" x2="30" y2="52" />
      <line x1="60" y1="38" x2="90" y2="52" />
      <line x1="60" y1="68" x2="44" y2="108" />
      <line x1="60" y1="68" x2="76" y2="108" />
    </g>
  )
}

const IMAGE_KEY_POSES: Record<string, () => JSX.Element> = {
  hip_flexor: Lunge,
  lizard_pose: Lunge,
  lunge: Lunge,
  pigeon_pose: PigeonPose,
  pigeon: PigeonPose,
  hip: PigeonPose,
  hamstring: ForwardFold,
  forward_fold: ForwardFold,
  back: ChildsPose,
  lower_back: ChildsPose,
  childs_pose: ChildsPose,
  shoulder: ShoulderStretch,
  chest: ShoulderStretch,
  upper_back: ShoulderStretch,
  quad_stretch: QuadStretch,
  quad: QuadStretch,
  calf_stretch: QuadStretch,
  generic: Generic,
}

const MUSCLE_POSES: Record<string, () => JSX.Element> = {
  hip_flexors: Lunge,
  hamstrings: ForwardFold,
  quadriceps: QuadStretch,
  calves: QuadStretch,
  shoulders: ShoulderStretch,
  upper_back: ShoulderStretch,
  chest: ShoulderStretch,
  back: ChildsPose,
  lower_back: ChildsPose,
}

interface Props {
  imageKey: string | null
  muscleGroup: string
}

export function ExerciseIllustration({ imageKey, muscleGroup }: Props) {
  const PoseComponent =
    (imageKey && IMAGE_KEY_POSES[imageKey]) ||
    MUSCLE_POSES[muscleGroup] ||
    null

  if (!PoseComponent) {
    const emoji = MUSCLE_EMOJI[muscleGroup] ?? '🤸'
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ backgroundColor: ILLUSTRATION_BG }}
      >
        <span style={{ fontSize: 64 }}>{emoji}</span>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: ILLUSTRATION_BG }}>
      <svg viewBox="0 0 120 120" width="80%" height="80%">
        <PoseComponent />
      </svg>
    </div>
  )
}
