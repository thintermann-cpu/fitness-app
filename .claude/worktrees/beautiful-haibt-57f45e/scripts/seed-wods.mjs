import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (key && !(key in process.env)) process.env[key] = val;
    }
  } catch {
    // file not found — continue with process.env
  }
}

loadEnvFile(resolve(__dirname, '../apps/web/.env.local'));

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌  Missing environment variables.');
  console.error('    Make sure apps/web/.env.local contains:');
  console.error('      VITE_SUPABASE_URL=https://<project>.supabase.co');
  console.error('      SUPABASE_SERVICE_ROLE_KEY=<your-service-role-secret>');
  console.error();
  console.error('    Get the service_role key from:');
  console.error('    Supabase Dashboard → Settings → API → service_role (secret)');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

const wodsPath = resolve(__dirname, '../apps/web/public/wods.json');
const raw = JSON.parse(readFileSync(wodsPath, 'utf8'));

function mapWod(w) {
  const equipment = w.equipment
    ? w.equipment.split(',').map((e) => e.trim()).filter(Boolean)
    : [];

  return {
    name: w.name,
    type: w.typ || null,
    category: w.kategorie || null,
    description: w.beschreibung || null,
    exercises: w.uebungen || null,
    equipment,
    difficulty: w.schwierigkeit || null,
    estimated_minutes: w.dauer ? parseInt(w.dauer, 10) || null : null,
    runden: w.runden || null,
    reps: w.reps || null,
    gewicht: w.gewicht || null,
    skal_leicht: w.skal_leicht || null,
    skal_schwer: w.skal_schwer || null,
    quelle: w.quelle || null,
  };
}

const BATCH_SIZE = 100;
let totalInserted = 0;
let totalSkipped = 0;
const errors = [];

console.log(`Seeding ${raw.length} WODs into ${supabaseUrl}...\n`);

for (let i = 0; i < raw.length; i += BATCH_SIZE) {
  const batch = raw.slice(i, i + BATCH_SIZE).map(mapWod);
  const batchNum = Math.floor(i / BATCH_SIZE) + 1;

  const { data, error } = await supabase
    .from('wods')
    .upsert(batch, { onConflict: 'name', ignoreDuplicates: true })
    .select('id');

  if (error) {
    console.error(`  Batch ${batchNum}: ❌  ${error.message}`);
    errors.push({ batchNum, message: error.message });
    continue;
  }

  const inserted = data?.length ?? 0;
  const skipped = batch.length - inserted;
  totalInserted += inserted;
  totalSkipped += skipped;
  console.log(
    `  Batch ${batchNum}: ${inserted} inserted, ${skipped} skipped`
  );
}

console.log();
if (errors.length) {
  console.error(`❌  ${errors.length} batch(es) failed.`);
  process.exit(1);
} else {
  console.log(
    `✅  Done — ${totalInserted} inserted, ${totalSkipped} already existed.`
  );
}
