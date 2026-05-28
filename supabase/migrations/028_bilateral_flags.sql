-- Set bilateral=true for all exercises that are performed one side at a time.
-- Applied directly to production 2026-05-28; this migration documents the change.

UPDATE stretching_exercises
SET bilateral = true
WHERE id IN (
  -- BACK
  '070bd7db-cf49-432b-967e-f3371454c4ec',  -- Nadel einfaedeln
  '1eb2eacc-a5b1-4ab5-980c-29e24a62218e',  -- Sitzende Wirbelsaeulendrehung
  '5ec23935-4268-4391-9cd6-7afdf73e1fa6',  -- Knie zur Brust
  -- CALVES
  '749a99c3-9f51-4645-b31c-3e66018cb3cc',  -- Stehende Wadendehnung
  '9ef99aa2-b861-4bf2-9fe6-030ffc9b8c86',  -- Stufen-Wadendehnung
  '429484a3-61d8-4d83-9e14-a737a7a4e989',  -- Wand-Wadendehnung
  -- CHEST
  'ef0b97e9-94a0-4e7a-a644-7734f33990de',  -- Seitliches Liegen Brustdehnung
  'ad267d8f-113a-48eb-a5f6-3662d9e0fec0',  -- Sitzende Drehung Brustöffnung
  -- FULL_BODY
  '9afe977b-0729-4d1a-a3e2-71a6459badf9',  -- Brustwirbel-Rotation
  'fae4375d-32d4-4794-a2df-c006adf12285',  -- Hüftbeuger Brustwirbeldrehung
  '46edba60-5961-4de9-9cae-1f59172350e4',  -- Liegende Wirbelsaeulendrehung
  '034e3a7b-dfbc-47e7-bacd-10543141637a',  -- Stehende Seitenstreckung
  '2511e2ce-7298-46cb-b749-97dd626d410c',  -- Weltbeste Dehnung
  -- HAMSTRINGS
  '59cc2f80-87c0-4c83-83a9-fdd5781bdb10',  -- Halber Spagat
  '3ffcff30-3d6b-4ed0-a43c-46df5a476b5c',  -- Liegende Beinhebung
  '9a5b19bd-075d-472d-bbe6-09d89349fae5',  -- Liegende Oberschenkel-Dehnung
  '4fa4f3ea-a0a5-4e9d-b6b0-dcd992d6f694',  -- Stehende Oberschenkel-Dehnung
  -- HIPS
  'd0c8d661-af4a-4aee-9e83-7fe1a8461814',  -- 90/90-Hueftdehnung
  '8476ac11-02d9-45a0-b52e-9558f77c1e7b',  -- Hueftbeuger-Ausfallschritt
  'dc2fd0f7-f319-41b6-91ba-830885cd236e',  -- Sitzende Hueftrotation
  '68220c38-ccdb-4afd-93ec-16fecf67a005',  -- Taubenhaltung
  '50bf2a83-24a5-49a4-ad49-875fedc659c4',  -- Tiefer Ausfallschritt
  'e50b7a1c-34f6-4f08-b4ae-e73d415e0ef0',  -- Vier-Figur-Dehnung
  -- NECK
  '5d780eb3-ac64-4990-b4c8-034bdd5038b8',  -- Nackendrehung
  'f20abec7-f01d-4499-968f-c13a9c8576e1',  -- Oberer Trapezius-Stretch
  '554f975b-757a-4c46-824e-3e63127faf54',  -- Seitliche Nackendehnung
  -- SHOULDERS
  'ccfe1a08-13d2-4b38-91fe-68660404abbf',  -- Adlerarm-Dehnung
  'f1a47ed5-d871-467b-84a1-fd67a0f8387b',  -- Schlaf-Dehnung
  'd8438f44-10a6-459a-8560-3a41f00ea612',  -- Schulterquer-Dehnung
  '3008c5f9-7b3f-4499-91e4-45212c14b283',  -- Trizeps-Ueberkopf-Dehnung
  'af55df99-1ed0-4e78-8d3d-2537795d80f5'   -- Wand-Schulterdehnung
);
