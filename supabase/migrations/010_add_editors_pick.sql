-- Add is_editors_pick column to wods table
ALTER TABLE wods ADD COLUMN IF NOT EXISTS is_editors_pick BOOLEAN DEFAULT false;

-- Allow admins and moderators to update wods (is_editors_pick toggle)
DROP POLICY IF EXISTS "Admins can update wods" ON wods;
CREATE POLICY "Admins can update wods"
  ON wods FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Seed: mark curated WODs as editors_pick
UPDATE wods SET is_editors_pick = true WHERE id::text IN (
  '63','75','89','90','93','105','213','214','255','258','267','274','275',
  '278','279','284','306','307','310','317','332','334','343','345','346',
  '370','372','395','396','619','628','633','639','644','650','656','661',
  '671','675','691','739','763','764','765','open_25_1','open_17_2'
);
