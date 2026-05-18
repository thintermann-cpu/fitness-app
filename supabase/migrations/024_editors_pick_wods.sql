-- Migration 024: Neue Editor's Pick WODs markieren
-- Die ursprüngliche Liste (Migration 010) ist bereits gesetzt.
-- Hier kommen Ergänzungen: IDs 254, 288 und WOD '25.1' per Name.
UPDATE wods SET is_editors_pick = true
WHERE id::text IN ('254', '288')
   OR name = '25.1';
