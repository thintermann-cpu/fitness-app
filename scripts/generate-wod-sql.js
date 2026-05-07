'use strict';

const fs = require('fs');
const path = require('path');

const JSON_PATHS = [
  path.join(__dirname, '..', 'apps', 'web', 'public', 'wods.json'),
  path.join(__dirname, '..', 'wod-tracker', 'data', 'wods.json'),
];

const OUTPUT_PATH = path.join(__dirname, 'wods-seed.sql');

function esc(value) {
  if (value === null || value === undefined || value === '') return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function numOrNull(value) {
  if (value === null || value === undefined || value === '') return 'NULL';
  const n = Number(value);
  return isNaN(n) ? esc(value) : String(n);
}

let jsonPath = null;
for (const p of JSON_PATHS) {
  if (fs.existsSync(p)) { jsonPath = p; break; }
}
if (!jsonPath) {
  console.error('wods.json not found in any expected location.');
  process.exit(1);
}

console.log(`Reading: ${jsonPath}`);
const wods = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log(`Found ${wods.length} WODs`);

const header = `-- WOD seed data — generated ${new Date().toISOString()}
-- Source: ${jsonPath}

BEGIN;

`;

const footer = `
COMMIT;
`;

const statements = wods.map((w) => {
  return (
    `INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (\n` +
    `  ${numOrNull(w.id)},\n` +
    `  ${esc(w.name)},\n` +
    `  ${esc(w.kategorie)},\n` +
    `  ${esc(w.typ)},\n` +
    `  ${esc(w.beschreibung)},\n` +
    `  ${esc(w.uebungen)},\n` +
    `  ${esc(w.equipment)},\n` +
    `  ${numOrNull(w.dauer)},\n` +
    `  ${numOrNull(w.runden)},\n` +
    `  ${esc(w.reps)},\n` +
    `  ${esc(w.gewicht)},\n` +
    `  ${esc(w.schwierigkeit)},\n` +
    `  ${esc(w.skal_leicht)},\n` +
    `  ${esc(w.skal_schwer)},\n` +
    `  ${esc(w.quelle)}\n` +
    `);\n`
  );
});

const sql = header + statements.join('\n') + footer;
fs.writeFileSync(OUTPUT_PATH, sql, 'utf8');
console.log(`Written: ${OUTPUT_PATH}`);
console.log(`Statements: ${statements.length}`);

// Preview
console.log('\n--- First 5 INSERT statements ---\n');
statements.slice(0, 5).forEach((s, i) => console.log(`[${i + 1}]\n${s}`));
console.log('--- Last 3 INSERT statements ---\n');
statements.slice(-3).forEach((s, i) => console.log(`[${wods.length - 2 + i}]\n${s}`));
