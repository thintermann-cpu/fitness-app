import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../apps/web/public/audio/sessions')

mkdirSync(outDir, { recursive: true })

const SAMPLE_RATE = 44100
const FREQ = 528        // Hz — focus/meditation frequency
const DURATION = 1.4    // seconds
const PEAK_AMP = 0.28

const numSamples = Math.floor(SAMPLE_RATE * DURATION)
const samples = new Float32Array(numSamples)

for (let i = 0; i < numSamples; i++) {
  const t = i / SAMPLE_RATE
  const env = Math.exp(-t / 0.4)  // exponential decay
  samples[i] = Math.sin(2 * Math.PI * FREQ * t) * PEAK_AMP * env
}

// PCM 16-bit WAV
const dataBytes = numSamples * 2
const buf = Buffer.alloc(44 + dataBytes)

buf.write('RIFF', 0)
buf.writeUInt32LE(36 + dataBytes, 4)
buf.write('WAVE', 8)
buf.write('fmt ', 12)
buf.writeUInt32LE(16, 16)        // chunk size
buf.writeUInt16LE(1, 20)         // PCM
buf.writeUInt16LE(1, 22)         // mono
buf.writeUInt32LE(SAMPLE_RATE, 24)
buf.writeUInt32LE(SAMPLE_RATE * 2, 28)  // byte rate
buf.writeUInt16LE(2, 32)         // block align
buf.writeUInt16LE(16, 34)        // bits per sample
buf.write('data', 36)
buf.writeUInt32LE(dataBytes, 40)

for (let i = 0; i < numSamples; i++) {
  const s = Math.max(-1, Math.min(1, samples[i]))
  buf.writeInt16LE(Math.round(s * 32767), 44 + i * 2)
}

writeFileSync(join(outDir, 'meditation-ping.wav'), buf)
console.log(`✓ meditation-ping.wav (${DURATION}s @ ${SAMPLE_RATE}Hz, ${FREQ}Hz sine)`)
