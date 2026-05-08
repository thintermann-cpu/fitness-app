// Accurate interval timer using drift-corrected setTimeout scheduling.
// Messages in:  { type: 'start', mode, durationMs, tabataWorkMs?, tabataRestMs?, tabataRounds?, emomIntervalMs? }
//               { type: 'pause' } | { type: 'resume' } | { type: 'reset' }
// Messages out: { type: 'tick', elapsed, remaining, phase, interval }
//               { type: 'complete' }
//               { type: 'beep', beepType: 'start'|'interval'|'end' }
//               { type: 'reset' }

let state         = 'idle'  // idle | running | paused
let mode          = 'fortime'
let durationMs    = 0
let startTime     = 0       // Date.now() when run began (offset by paused time)
let pausedElapsed = 0
let tickId        = null

// Configurable params — set on each 'start' message
let tabataWorkMs   = 20_000
let tabataRestMs   = 10_000
let tabataRounds   = 8
let emomIntervalMs = 60_000

// Track previous tick values for edge detection (beep on transitions)
let prevInterval  = 0
let prevPhase     = 'work'

self.onmessage = ({ data }) => {
  switch (data.type) {
    case 'start':
      mode           = data.mode
      durationMs     = data.durationMs
      tabataWorkMs   = data.tabataWorkMs   ?? 20_000
      tabataRestMs   = data.tabataRestMs   ?? 10_000
      tabataRounds   = data.tabataRounds   ?? 8
      emomIntervalMs = data.emomIntervalMs ?? 60_000
      startTime      = Date.now()
      pausedElapsed  = 0
      prevInterval   = 0
      prevPhase      = 'work'
      state          = 'running'
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

  // Detect interval transitions and emit beep signals
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
  const drift  = elapsed % 100
  const nextMs = drift === 0 ? 100 : 100 - drift
  tickId = setTimeout(scheduleTick, nextMs)
}

function computeTick(elapsed) {
  if (mode === 'tabata') {
    const cycleMs   = tabataWorkMs + tabataRestMs
    const totalMs   = cycleMs * tabataRounds
    const remaining = Math.max(0, totalMs - elapsed)
    const pos       = elapsed % cycleMs
    const phase     = pos < tabataWorkMs ? 'work' : 'rest'
    const interval  = Math.min(Math.floor(elapsed / cycleMs) + 1, tabataRounds)
    const complete  = elapsed >= totalMs
    return { elapsed, remaining, phase, interval, complete }
  }

  if (mode === 'emom') {
    const remaining = Math.max(0, durationMs - elapsed)
    const interval  = Math.floor(elapsed / emomIntervalMs) + 1
    const complete  = elapsed >= durationMs
    return { elapsed, remaining, phase: 'work', interval, complete }
  }

  if (mode === 'amrap') {
    const remaining = Math.max(0, durationMs - elapsed)
    const complete  = elapsed >= durationMs
    return { elapsed, remaining, phase: 'work', interval: 1, complete }
  }

  // fortime — count up; durationMs > 0 means there's a cap
  const complete = durationMs > 0 && elapsed >= durationMs
  return {
    elapsed,
    remaining: durationMs > 0 ? Math.max(0, durationMs - elapsed) : 0,
    phase: 'work',
    interval: 1,
    complete,
  }
}
