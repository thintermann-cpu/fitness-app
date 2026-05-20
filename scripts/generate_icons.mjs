import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const svgPath = join(__dirname, '../apps/web/public/icon-source.svg')
const outDir  = join(__dirname, '../apps/web/public')

const svg = readFileSync(svgPath, 'utf-8')

const SIZES = [
  { name: 'icon-192.png',        size: 192 },
  { name: 'icon-512.png',        size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
]

for (const { name, size } of SIZES) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
  })
  const pngData = resvg.render()
  const png = pngData.asPng()
  writeFileSync(join(outDir, name), png)
  console.log(`✓ ${name} (${size}×${size})`)
}
