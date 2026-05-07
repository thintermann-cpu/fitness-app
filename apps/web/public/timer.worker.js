// Accurate interval timer using drift-corrected setTimeout scheduling.
// Messages in:  { type: 'start', mode, durationMs }
//               { type: 'pause' } | { type: 'resume' } | { type: 'reset' }
// Messages out: { type: 'tick', elapsed, remaining, phase, interval }
//               { type: 'complete' }
//               { type: 'beep', beepType: 'start'|'interval'|'end' }
//               { type: 'reset' }

const TABATA_WORK_MS  = 20_000
const TABATA_REST_MS  = 10_000
const TABATA_CYCLE_MS = TABATA_WORK_MS + TABATA_REST_MS
const TABATA_ROUNDS   = 8
const TABATA_TOTAL_MS = TABATA_CYCLE_MS * TABATA_ROUNDS

let state         = 'idle'  // idle | running | paused
let mode          = 'fortime'
let durationMs    = 0
let startTime     = 0       // Date.now() when run began (offset by paused time)
let pausedElapsed = 0
let tickId        = null

// Track previous tick values for edge detection (beep on transitions)
let prevInterval  = 0
let prevPhase     = 'work'

self.onmessage = ({ data }) => {
  switch (data.type) {
    case 'start':
      mode          = data.mode
      durationMs    = data.durationMs
      startTime     = Date.now()
      pausedElapsed = 0
      prevInterval  = 0
      prevPhase     = 'work'
      state         = 'running'
      clearTimeout(tickId)
      scheduleTick()
      self.postMessage({ type: 'beep', beepType: 'start' })
      break

    case 'pause':
      if (state === 'running') {
        pausedElapsed = Date.now() - startTime
        state = 'paused'
        clearTimeout(tickId)
      }
      break

    case 'resume':
      if (state === 'paused') {
        startTime = Date.now() - pausedElapsed
        state = 'running'
        scheduleTick()
      }
      break

    case 'reset':
      state = 'idle'
      clearTimeout(tickId)
      self.postMessage({ type: 'reset' })
      break
  }
}

function scheduleTick() {
  if (state !== 'running') return

  const elapsed = Date.now() - startTime
  const info    = computeTick(elapsed)

  // Detect interval/phase transitions and emit beep signals
  if (prevInterval !== 0 && info.interval !== prevInterval) {
    self.postMessage({ type: 'beep', beepType: 'interval' })
  }
  prevInterval = info.interval
  prevPhase    = info.phase

  self.postMessage({ type: 'tick', ...info })

  if (info.complete) {
    self.postMessage({ type: 'beep', beepType: 'end' })
    self.postMessage({ type: 'complete' })
    state = 'idle'
    return
  }

  // Schedule next tick aligned to the next 100 ms boundary
  const drift   = elapsed % 100
  const nextMs  = drift === 0 ? 100 : 100 - drift
  tickId = setTimeout(scheduleTick, nextMs)
}

function computeTick(elapsed) {
  if (mode === 'tabata') {
    const remaining = Math.max(0, TABATA_TOTAL_MS - elapsed)
    const pos       = elapsed % TABATA_CYCLE_MS
    const phase     = pos < TABATA_WORK_MS ? 'work' : 'rest'
    const interval  = Math.min(Math.floor(elapsed / TABATA_CYCLE_MS) + 1, TABATA_ROUNDS)
    const complete  = elapsed >= TABATA_TOTAL_MS
    return { elapsed, remaining, phase, interval, complete }
  }

  if (mode === 'emom') {
    const remaining = Math.max(0, durationMs - elapsed)
    const interval  = Math.floor(elapsed / 60_000) + 1
    const complete  = elapsed >= durationMs
    return { elapsed, remaining, phase: 'work', interval, complete }
  }

  if (mode === 'amrap') {
    const remaining = Math.max(0, durationMs - elapsed)
    const complete  = elapsed >= durationMs
    return { elapsed, remaining, phase: 'work', interval: 1, complete }
  }

  // fortime — count up, user stops manually
  return { elapsed, remaining: 0, phase: 'work', interval: 1, complete: false }
}
