import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../apps/web/public/audio/sessions')
mkdirSync(outDir, { recursive: true })

const SAMPLE_RATE = 44100
const DURATION = 5.5
const PEAK_AMP = 0.55

// Inharmonic partials ≈ large bowl / soft gong
const PARTIALS = [
  { f: 110, a: 1.00, decay: 2.8 },
  { f: 220.5, a: 0.55, decay: 2.2 },
  { f: 329.8, a: 0.32, decay: 1.8 },
  { f: 441.2, a: 0.18, decay: 1.4 },
  { f: 562.0, a: 0.12, decay: 1.1 },
  { f: 783.5, a: 0.07, decay: 0.9 },
]

const numSamples = Math.floor(SAMPLE_RATE * DURATION)
const samples = new Float32Array(numSamples)

for (let i = 0; i < numSamples; i++) {
  const t = i / SAMPLE_RATE
  // Soft attack (~35ms) so it doesn't click
  const attack = Math.min(1, t / 0.035)
  let v = 0
  for (const p of PARTIALS) {
    const env = Math.exp(-t / p.decay)
    // Slight beating via tiny FM for metal character
    const mod = 1 + 0.0015 * Math.sin(2 * Math.PI * 1.7 * t)
    v += Math.sin(2 * Math.PI * p.f * mod * t) * p.a * env
  }
  samples[i] = v * PEAK_AMP * attack
}

// Normalize soft peak
let peak = 0
for (let i = 0; i < numSamples; i++) peak = Math.max(peak, Math.abs(samples[i]))
const norm = peak > 0 ? 0.9 / peak : 1

const dataBytes = numSamples * 2
const buf = Buffer.alloc(44 + dataBytes)
buf.write('RIFF', 0)
buf.writeUInt32LE(36 + dataBytes, 4)
buf.write('WAVE', 8)
buf.write('fmt ', 12)
buf.writeUInt32LE(16, 16)
buf.writeUInt16LE(1, 20)
buf.writeUInt16LE(1, 22)
buf.writeUInt32LE(SAMPLE_RATE, 24)
buf.writeUInt32LE(SAMPLE_RATE * 2, 28)
buf.writeUInt16LE(2, 32)
buf.writeUInt16LE(16, 34)
buf.write('data', 36)
buf.writeUInt32LE(dataBytes, 40)

for (let i = 0; i < numSamples; i++) {
  const s = Math.max(-1, Math.min(1, samples[i] * norm))
  buf.writeInt16LE(Math.round(s * 32767), 44 + i * 2)
}

writeFileSync(join(outDir, 'meditation-gong.wav'), buf)
console.log(`✓ meditation-gong.wav (${DURATION}s @ ${SAMPLE_RATE}Hz, ${PARTIALS.length} partials)`)
