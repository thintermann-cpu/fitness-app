# CarveOut

Produkt- und Architektur-Kontext: `CLAUDE.md` und `docs/CARVEOUT_SPEC.md`. Spec zuerst lesen bei nicht-trivialen Aufgaben.

## Cursor Cloud specific instructions

- Monorepo: Abhängigkeiten immer in der Repo-Wurzel mit `npm install` (npm workspaces + Turborepo).
- Die App liegt in `apps/web` (Vite, Port 5173). `apps/landing` ist Platzhalter.
- Verifikation: `npm run build --workspace=@carveout/web` und ggf. `npm run lint --workspace=@carveout/web`.
- `wod-tracker/` und `mein-tag/` nicht anfassen.
- Env-Keys siehe `apps/web/.env.example`. Werte kommen aus dem Cursor-Secrets-Tab, nicht aus committeden Dateien. `.env` nie committen.
- Fallback: Ist beim Boot keine `VITE_SUPABASE_URL` gesetzt (Secrets-Tab leer) und keine `apps/web/.env` vorhanden, legt der `install`-Schritt automatisch eine `apps/web/.env` aus `.env.example` an (Platzhalter). Damit rendert die App out-of-the-box im Offline-/Frontend-Modus. Sind echte Supabase-Secrets gesetzt, haben sie Vorrang (Vite liest `VITE_*` aus den Prozess-Env-Variablen) und es wird keine `.env` geschrieben.
- Stripe Secret Key gehört in Supabase Edge Function Secrets, nicht in Cursor und nicht ins Repo.
- Tailwind v4: kein `tailwind.config.js`. Farben über CSS-Variablen `--color-pillar-*`.
