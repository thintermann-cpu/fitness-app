/**
 * tag-wod-equipment.ts
 *
 * One-time script: reads the comma-separated `equipment` column of every WOD
 * and populates the new `equipment_tags` array column.
 *
 * Usage (requires Deno or ts-node + SERVICE_ROLE_KEY env var):
 *   SUPABASE_SERVICE_ROLE_KEY=... npx ts-node scripts/tag-wod-equipment.ts
 *   or
 *   SUPABASE_SERVICE_ROLE_KEY=... deno run --allow-env --allow-net scripts/tag-wod-equipment.ts
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL      = 'https://ipkazxttlkiufgsdyjdw.supabase.co'
const SERVICE_ROLE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''

if (!SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY env var')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

async function run() {
  console.log('Fetching all WODs…')
  const { data: wods, error } = await supabase
    .from('wods')
    .select('id, equipment')

  if (error) { console.error(error); process.exit(1) }

  console.log(`Processing ${wods.length} WODs…`)

  let updated = 0
  for (const wod of wods) {
    const tags: string[] = wod.equipment
      ? (wod.equipment as string).split(',').map((s: string) => s.trim()).filter(Boolean)
      : []

    const { error: upErr } = await supabase
      .from('wods')
      .update({ equipment_tags: tags })
      .eq('id', wod.id)

    if (upErr) {
      console.warn(`  WOD ${wod.id}: ${upErr.message}`)
    } else {
      updated++
    }
  }

  console.log(`Done. Updated ${updated}/${wods.length} WODs.`)
}

run().catch((e) => { console.error(e); process.exit(1) })
