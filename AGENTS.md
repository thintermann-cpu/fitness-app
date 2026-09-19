# CarveOut

Produkt- und Architektur-Kontext: `CLAUDE.md` und `docs/CARVEOUT_SPEC.md`. Spec zuerst lesen bei nicht-trivialen Aufgaben.

## Cursor Cloud specific instructions

- Monorepo: Abhängigkeiten immer in der Repo-Wurzel mit `npm install` (npm workspaces + Turborepo).
- Die App liegt in `apps/web` (Vite, Port 5173). `apps/landing` ist Platzhalter.
- Verifikation: `npm run build --workspace=@carveout/web` und ggf. `npm run lint --workspace=@carveout/web`.
- `wod-tracker/` und `mein-tag/` nicht anfassen.
- Env-Keys siehe `apps/web/.env.example`. Werte kommen aus dem Cursor-Secrets-Tab, nicht aus committeden Dateien. `.env` nie committen.
- Stripe Secret Key gehört in Supabase Edge Function Secrets, nicht in Cursor und nicht ins Repo.
- Tailwind v4: kein `tailwind.config.js`. Farben über CSS-Variablen `--color-pillar-*`.
