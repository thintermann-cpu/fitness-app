-- wods full seed — idempotent, run this once in Supabase SQL editor
-- Generated: 2026-05-07T12:44:35.094Z

BEGIN;

DROP TABLE IF EXISTS public.wods CASCADE;

CREATE TABLE public.wods (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL UNIQUE,
  type              TEXT,
  category          TEXT,
  description       TEXT,
  exercises         TEXT,
  equipment         TEXT[],
  difficulty        TEXT,
  estimated_minutes INT,
  runden            TEXT,
  reps              TEXT,
  gewicht           TEXT,
  skal_leicht       TEXT,
  skal_schwer       TEXT,
  quelle            TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.wods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "wods are public read" ON public.wods
  FOR SELECT USING (true);

-- 803 WODs
INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Fran',
  'Girl WOD',
  'ForTime',
  '21-15-9 Reps für Zeit',
  'Thrusters, Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Intermediate',
  10,
  '3',
  '21-15-9',
  '43',
  '15-12-9 / Ring Rows',
  '21-15-9 / Chest-to-Bar',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Cindy',
  'Girl WOD',
  'AMRAP',
  'So viele Runden wie möglich in 20 Min',
  'Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Beginner',
  20,
  NULL,
  '5/10/15',
  NULL,
  '3/6/9 / Ring Rows / Knie-Push-ups',
  '7/14/21 / Chest-to-Bar',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Grace',
  'Girl WOD',
  'ForTime',
  '30 Clean & Jerks für Zeit',
  'Clean & Jerk',
  ARRAY['Barbell'],
  'Advanced',
  10,
  NULL,
  '30',
  '61',
  '15-20 Reps / leichteres Gewicht',
  '30 / schwereres Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Helen',
  'Girl WOD',
  'ForTime',
  '3 Runden für Zeit',
  'Run 400m, Kettlebell Swings, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Intermediate',
  12,
  '3',
  '21 KB Swings, 12 Pull-ups',
  '24',
  'Leichtere KB / Ring Rows',
  'Heavier KB / C2B',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Annie',
  'Girl WOD',
  'ForTime',
  '50-40-30-20-10 für Zeit',
  'Double Unders, Sit-ups',
  ARRAY['Jump Rope','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '50-40-30-20-10',
  NULL,
  'Single Unders (2x)',
  'Unbroken Sets',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Karen',
  'Girl WOD',
  'ForTime',
  '150 Wall Ball Shots für Zeit',
  'Wall Ball',
  ARRAY['Wall Ball'],
  'Intermediate',
  15,
  NULL,
  '150',
  '9',
  '100 Reps / leichterer Ball',
  '150 / schwererer Ball',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbara',
  'Girl WOD',
  'ForTime',
  '5 Runden mit 3 Min Pause',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  30,
  '5',
  '20/30/40/50',
  NULL,
  '15/20/30/40',
  '25/40/50/60',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Angie',
  'Girl WOD',
  'ForTime',
  '100 Reps jeder Übung für Zeit',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  30,
  NULL,
  '100/100/100/100',
  NULL,
  '50 Reps / Ring Rows',
  'Chest-to-Bar Pull-ups',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Chelsea',
  'Girl WOD',
  'EMOM',
  '30 Min EMOM',
  'Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  30,
  '30',
  '5/10/15',
  NULL,
  '3/6/9',
  '7/14/21',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Diane',
  'Girl WOD',
  'ForTime',
  '21-15-9 für Zeit',
  'Deadlift, Handstand Push-ups',
  ARRAY['Barbell','Wall'],
  'Advanced',
  10,
  '3',
  '21-15-9',
  '102',
  'Ring/Box HSPU / weniger Gewicht',
  'Deficit HSPU / mehr Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Elizabeth',
  'Girl WOD',
  'ForTime',
  '21-15-9 für Zeit',
  'Clean, Ring Dips',
  ARRAY['Barbell','Rings'],
  'Advanced',
  10,
  '3',
  '21-15-9',
  '61',
  'Leichteres Gewicht / Box Dips',
  'Schwereres Gewicht / MU',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Isabel',
  'Girl WOD',
  'ForTime',
  '30 Snatches für Zeit',
  'Snatch',
  ARRAY['Barbell'],
  'Advanced',
  10,
  NULL,
  '30',
  '61',
  'Leichteres Gewicht / Hang Power Snatch',
  'Schwereres Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Jackie',
  'Girl WOD',
  'ForTime',
  'Für Zeit',
  'Row 1000m, Thrusters, Pull-ups',
  ARRAY['Rower','Barbell','Pull-up Bar'],
  'Intermediate',
  15,
  NULL,
  '1000m/45 Thrusters/30 Pull-ups',
  '20',
  '750m / leichter / Ring Rows',
  'Schwereres Gewicht / C2B',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Linda',
  'Girl WOD',
  'ForTime',
  '10-9-8...1 Runden',
  'Deadlift, Bench Press, Clean',
  ARRAY['Barbell'],
  'Advanced',
  30,
  '10',
  '10 bis 1',
  NULL,
  'Leichtere Gewichte',
  'Schwerere Gewichte',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Mary',
  'Girl WOD',
  'AMRAP',
  '20 Min AMRAP',
  'Handstand Push-ups, Pistols, Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  20,
  NULL,
  '5/10/15',
  NULL,
  'Box HSPU / Assisted Pistols / Ring Rows',
  'Deficit HSPU / Weighted',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Nancy',
  'Girl WOD',
  'ForTime',
  '5 Runden für Zeit',
  'Run 400m, Overhead Squat',
  ARRAY['Barbell'],
  'Intermediate',
  20,
  '5',
  '15 OHS',
  '43',
  'Leichteres Gewicht / PVC',
  'Schwereres Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Amanda',
  'Girl WOD',
  'ForTime',
  '9-7-5 für Zeit',
  'Muscle-ups, Squat Snatches',
  ARRAY['Rings','Barbell'],
  'Advanced',
  10,
  '3',
  '9-7-5',
  '61',
  'Ring/Box MU / leichterer Snatch',
  'Schwereres Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Eva',
  'Girl WOD',
  'ForTime',
  '5 Runden für Zeit',
  'Run 800m, KB Swings, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Advanced',
  45,
  '5',
  '30 KB / 30 Pull-ups',
  '32',
  '400m / leichter / Ring Rows',
  'Schwereres Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Kelly',
  'Girl WOD',
  'ForTime',
  '5 Runden für Zeit',
  'Run 400m, Box Jumps, Wall Balls',
  ARRAY['Box','Wall Ball'],
  'Intermediate',
  30,
  '5',
  '30 BJ / 30 WB',
  '9',
  'Kleinere Box / leichterer Ball',
  'Höhere Box / schwererer Ball',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Nicole',
  'Girl WOD',
  'ForTime',
  '20 Min AMRAP + Max Pull-ups',
  'Run 400m, Max Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  'Max Reps',
  NULL,
  'Ring Rows',
  'Gewichtete Pull-ups',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Murph',
  'Hero WOD',
  'ForTime',
  'Für Zeit (mit Gewichtsweste optional)',
  'Run 1 Mile, Pull-ups, Push-ups, Air Squats, Run 1 Mile',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  45,
  NULL,
  '100/200/300',
  NULL,
  'Ohne Weste / partitioniert',
  'Mit 20lb Weste / unpartitioniert',
  'Hero WOD - Lt. Michael Murphy'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DT',
  'Hero WOD',
  'ForTime',
  '5 Runden für Zeit',
  'Deadlift, Hang Power Clean, Push Jerk',
  ARRAY['Barbell'],
  'Advanced',
  20,
  '5',
  '12/9/6',
  '70',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'Hero WOD - USAF SSgt Timothy P. Davis'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'The Chief',
  'Hero WOD',
  'AMRAP',
  '5x3 Min AMRAP mit 1 Min Pause',
  'Power Clean, Push-ups, Air Squats',
  ARRAY['Barbell'],
  'Intermediate',
  20,
  '5',
  '3/6/9',
  '61',
  'Leichteres Gewicht / Knie-Push-ups',
  'Schwereres Gewicht',
  'Hero WOD - Major Mark Matthews'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Josh',
  'Hero WOD',
  'ForTime',
  '21-15-9 für Zeit',
  'Overhead Squat, Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  '43',
  'Leichteres Gewicht / Ring Rows',
  'Schwereres Gewicht / C2B',
  'Hero WOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'JT',
  'Hero WOD',
  'ForTime',
  '21-15-9 für Zeit',
  'Handstand Push-ups, Ring Dips, Push-ups',
  ARRAY['Rings','Wall'],
  'Advanced',
  20,
  '3',
  '21-15-9',
  NULL,
  'Box/Knie Varianten',
  'Deficit HSPU / Weighted Dips',
  'Hero WOD - PO1 Jeff Taylor'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Badger',
  'Hero WOD',
  'ForTime',
  '3 Runden für Zeit',
  'Run 800m, Squat Clean, Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  40,
  '3',
  '30 SC / 30 Pull-ups',
  '43',
  'Leichteres Gewicht / Ring Rows',
  'Schwereres Gewicht / C2B',
  'Hero WOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Nate',
  'Hero WOD',
  'AMRAP',
  '20 Min AMRAP',
  'Muscle-ups, Handstand Push-ups, KB Swings',
  ARRAY['Rings','Kettlebell'],
  'Advanced',
  20,
  NULL,
  '2/4/8',
  '32',
  'Ring/Box MU / Box HSPU / leichter',
  'Gewichtete Varianten',
  'Hero WOD - Chief Petty Officer Nate Hardy'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Whitten',
  'Hero WOD',
  'ForTime',
  '5 Runden für Zeit',
  'Run 400m, Farmers Carry, OHS, Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  45,
  '5',
  'Variiert',
  NULL,
  'Leichteres Gewicht / Ring Rows',
  'Schwereres Gewicht',
  'Hero WOD - Capt. Dan Whitten'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Lazar',
  'Hero WOD',
  'ForTime',
  '3+3 Runden mit Pause',
  'Row 30 Cal, Bar Muscle-ups / HSPU',
  ARRAY['Rower','Pull-up Bar'],
  'Advanced',
  45,
  '6',
  '30 Cal / 10-15 Reps',
  NULL,
  'Rudern / Ring MU / Box HSPU',
  'RX als Standard',
  'Hero WOD - Lazar Đukić'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Filthy Fifty',
  'Other Benchmark',
  'ForTime',
  '50 Reps von 10 Übungen',
  'Box Jumps, Jumping Pull-ups, KB Swings, Walking Lunges, Knees-to-Elbows, Push Press, Back Extensions, Wall Balls, Burpees, Double Unders',
  ARRAY['Box','Pull-up Bar','Kettlebell','Barbell','Wall Ball','Jump Rope'],
  'Intermediate',
  30,
  NULL,
  '50 jede',
  '24',
  '25 Reps / Skalierte Bewegungen',
  '75 Reps',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Something Else',
  'Other Benchmark',
  'Tabata',
  'Tabata (8x20/10) jeder Übung',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Beginner',
  16,
  NULL,
  '8 Runden à 20 Sek',
  NULL,
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Varianten',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Fight Gone Bad',
  'Other Benchmark',
  'ForTime',
  '3 Runden à 1 Min pro Station',
  'Wall Ball, SDLHP, Box Jumps, Push Press, Row',
  ARRAY['Wall Ball','Barbell','Box','Rower'],
  'Intermediate',
  17,
  '3',
  'Max Reps',
  '20',
  'Leichtere Gewichte / kleinere Box',
  'Schwerere Gewichte',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Death by Pull-ups',
  'Other Benchmark',
  'EMOM',
  'EMOM bis zum Versagen',
  'Pull-ups',
  ARRAY['Pull-up Bar'],
  'Intermediate',
  NULL,
  NULL,
  '1 mehr pro Minute',
  NULL,
  'Ring Rows',
  'Gewichtete Pull-ups',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Cindy XXX',
  'Other Benchmark',
  'AMRAP',
  '30 Min AMRAP',
  'Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  30,
  NULL,
  '5/10/15',
  NULL,
  'Standard Cindy (20 Min)',
  'Gewichtete Weste',
  'CrossFit Variation'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pukie',
  'Other Benchmark',
  'ForTime',
  'Für Zeit',
  'Thrusters, Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  10,
  NULL,
  '21-15-9',
  '43',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Variation'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Open 12.1',
  'CrossFit Open',
  'AMRAP',
  '7 Min AMRAP',
  'Burpee to Target',
  ARRAY['Bodyweight'],
  'Beginner',
  7,
  NULL,
  'Max Reps',
  NULL,
  'Niedrigeres Ziel',
  'Höheres Ziel',
  'CrossFit Open 2012'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Open 11.1',
  'CrossFit Open',
  'AMRAP',
  '10 Min AMRAP',
  'Double Unders, Snatches',
  ARRAY['Jump Rope','Barbell'],
  'Intermediate',
  10,
  NULL,
  '30 DU / 15 Snatch',
  '34',
  'Single Unders / leichter',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bergeron Beep Test',
  'Other Benchmark',
  'EMOM',
  'EMOM so lange wie möglich',
  'Thrusters, Pull-ups, Burpees',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  NULL,
  '7/7/7 pro Minute',
  '43',
  'Leichteres Gewicht / weniger Reps',
  'RX',
  'CrossFit Benchmark'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Death by OHS & C2B',
  'Eigenes WOD',
  'EMOM',
  'Every 3 min: 2 Runden, steigende Reps bis Versagen',
  'Overhead Squats, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  NULL,
  '2 Runden: 10/10 → 12/12 → ...',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Farmers & Squats',
  'Eigenes WOD',
  'ForTime',
  'For Time – 15min Cap',
  'Farmers Carry, Back Squats, Double Unders, Deadlifts, Row',
  ARRAY['Kettlebell/Dumbbell','Barbell','Jump Rope','Rower'],
  'Advanced',
  15,
  NULL,
  '60m FC / 20 BS / 100 DU / 20 DL / 60m FC / 40 Cal',
  '80',
  'Leichteres Gewicht / Singles statt DU',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Overhead Lunges & T2B',
  'Eigenes WOD',
  'ForTime',
  '3 Rounds For Time',
  'Double Unders, DB Overhead Lunges, Toes-to-Bar',
  ARRAY['Dumbbell','Jump Rope','Pull-up Bar'],
  'Intermediate',
  NULL,
  '3',
  '50 DU / 15+15 Lunges / 15 T2B',
  '22.5',
  'Singles statt DU / weniger Gewicht',
  'Schwereres Gewicht / mehr Reps',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Farmers & Row Ladder',
  'Eigenes WOD',
  'ForTime',
  'For Time – absteigende Runden',
  'Double Unders, Row, Air Squats, Farmers Carry',
  ARRAY['Jump Rope','Rower','Kettlebell/Dumbbell'],
  'Intermediate',
  NULL,
  '3',
  '60 DU / 27-21-15 Cal / 27-21-15 Squats / 40m FC',
  '24',
  'Singles statt DU / leichteres Gewicht',
  'Mehr Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Assault Bike & Farmers',
  'Eigenes WOD',
  'ForTime',
  'For Time – absteigende Runden',
  'Double Unders, Assault Bike, Farmers Carry',
  ARRAY['Jump Rope','Assault Bike','Kettlebell/Dumbbell'],
  'Advanced',
  NULL,
  '3',
  '100 DU / 27-21-15 Cal / 60m FC',
  '22.5',
  'Singles statt DU / leichteres Gewicht',
  'Mehr Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB EMOM 18',
  'Eigenes WOD',
  'EMOM',
  '18 Min EMOM – alles Kettlebells',
  'KB Rotation Swings, KB Swing Button Up, Burpee Sumo Jump Squat, Gorilla Row, KB Snatch Trunk Rotation, Squat Clean & Press',
  ARRAY['Kettlebell'],
  'Intermediate',
  18,
  '18',
  '1 Übung pro Minute',
  NULL,
  'Leichtere KB',
  'Schwerere KB',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Lead Foot',
  'Eigenes WOD',
  'AMRAP',
  '3x AMRAP 4 mit 4 Min Pause – absteigende Reps',
  'Row, Burpees, Chest-to-Bar Pull-ups, Toes-to-Bar, Pull-ups',
  ARRAY['Rower','Pull-up Bar'],
  'Advanced',
  24,
  '3',
  '27/21/15 Cal / 27/21/15 Burpees / C2B/T2B/PU',
  NULL,
  'Weniger Reps / Pull-ups statt C2B',
  'Mehr Reps / gewichtete Weste',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Ab Circuit',
  'Eigenes WOD',
  'ForTime',
  '3 Rounds For Time – Core Focus',
  'Sit-ups, Leg Raises, Jack Knife Sit-ups, Leg Pull-in, Toe Touches, Crunches, Reverse Crunches',
  ARRAY['Bodyweight'],
  'Beginner',
  NULL,
  '3',
  '15 Reps jede Übung',
  NULL,
  '10 Reps',
  '20 Reps',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Row & Mixed',
  'Eigenes WOD',
  'ForTime',
  'For Time – absteigende Cals',
  'Air Squats, Row, KB Swings, Sit-ups, Push-ups, Burpees',
  ARRAY['Rower','Kettlebell','Bodyweight'],
  'Intermediate',
  NULL,
  NULL,
  '50-25-30-20-10 / Cal Row',
  NULL,
  'Leichtere KB / weniger Reps',
  'Mehr Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Complex 4 Rounds',
  'Eigenes WOD',
  'ForTime',
  '4 Rounds For Time',
  'Tuck Jumps, DB Hang Power Cleans, DB Push Press R/L, KB Lunges R/L',
  ARRAY['Dumbbell','Kettlebell'],
  'Intermediate',
  NULL,
  '4',
  '8 Reps jede Übung',
  NULL,
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Power Clean Ladder',
  'Eigenes WOD',
  'ForTime',
  'For Time – absteigende Runden mit Power Cleans',
  'Double Unders, Sit-ups, Power Cleans',
  ARRAY['Jump Rope','Barbell','Bodyweight'],
  'Intermediate',
  NULL,
  NULL,
  '60-40-20 DU / Sit-ups / 5 PC',
  NULL,
  'Singles statt DU / leichteres Gewicht',
  'Mehr Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '666',
  'Eigenes WOD',
  'ForTime',
  '6 Rounds For Time',
  'Front Squats, Pull-ups, Bench Press, Deadlifts, Barbell Rows, Shoulder-to-Overhead',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  '6',
  '6 Reps jede Übung',
  NULL,
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Blake',
  'Hero WOD',
  'ForTime',
  '4 Rounds For Time',
  'Overhead Walking Lunges, Box Jumps, Wall Ball, Handstand Push-ups',
  ARRAY['Plate','Box','Wall Ball','Bodyweight'],
  'Advanced',
  NULL,
  '4',
  '100ft OWL / 30 BJ / 20 WB / 10 HSPU',
  '20',
  'Box HSPU / weniger Gewicht / kleinere Box',
  'Deficit HSPU / höhere Box',
  'WOD_Pläne.xlsx / Hero WOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Man Makers',
  'Eigenes WOD',
  'ForTime',
  '3-7 Rounds For Time',
  'Man Makers, DB Deadlifts, Single-Arm DB Snatches, Single-Arm Overhead Lunges, DB Swings',
  ARRAY['Dumbbell'],
  'Advanced',
  NULL,
  '7',
  '10/20/30/40/50 Reps',
  NULL,
  'Leichteres Gewicht / weniger Runden',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Ski Chipper',
  'Eigenes WOD',
  'ForTime',
  'For Time – 4 Stationen mit Ski',
  'KB Snatches, Ski Erg, KB Goblet Squats, KB Clean & Press, KB Swings',
  ARRAY['Kettlebell','Ski Erg'],
  'Advanced',
  NULL,
  NULL,
  '40/20 Cal / 40 Reps je Station',
  '24',
  'Leichteres Gewicht / weniger Reps',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Jumping Lunges Ladder',
  'Eigenes WOD',
  'ForTime',
  'For Time – absteigende Runden',
  'Jumping Lunges, Sit-ups, Double Unders',
  ARRAY['Jump Rope','Bodyweight'],
  'Intermediate',
  NULL,
  NULL,
  '50-40-30-20-10',
  NULL,
  'Singles statt DU / normale Lunges',
  'Gewichtete Varianten',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Box Burpee AMRAP',
  'Eigenes WOD',
  'AMRAP',
  '10 Min AMRAP',
  'Burpees over Box, Sit-ups, Double Unders',
  ARRAY['Box','Jump Rope','Bodyweight'],
  'Intermediate',
  10,
  NULL,
  '10 / 20 / 40',
  NULL,
  'Singles statt DU / normale Burpees',
  'Höhere Box / mehr Reps',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '8min AMRAP HSPU KB GHD',
  'Eigenes WOD',
  'AMRAP',
  '8 Min AMRAP',
  'Handstand Push-ups, KB Swings, GHD Sit-ups',
  ARRAY['Kettlebell','GHD','Bodyweight'],
  'Advanced',
  8,
  NULL,
  '4 / 8 / 12',
  '32',
  'Box HSPU / leichtere KB',
  'Deficit HSPU / schwerere KB',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Step-up Burpee Sit-up',
  'Eigenes WOD',
  'ForTime',
  '3 Rounds For Time',
  'Weighted Box Step-ups, Burpees, Sit-ups, Double Unders',
  ARRAY['Box','Dumbbell','Jump Rope','Bodyweight'],
  'Intermediate',
  NULL,
  '3',
  '20/20/20/60',
  '15',
  'Leichteres Gewicht / Singles',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'OHS C2B T2B Ladder',
  'Eigenes WOD',
  'ForTime',
  'For Time – steigende Runden',
  'Overhead Squats, Chest-to-Bar Pull-ups, Toes-to-Bar',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  NULL,
  '10-8-6-4-2 OHS / 2-4-6-8-10 C2B & T2B',
  '65',
  'Leichteres Gewicht / Pull-ups / K2E',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push-up Lunge Farmers',
  'Eigenes WOD',
  'ForTime',
  '5 Rounds For Time',
  'Push-ups, Front Rack Walking Lunges, Farmers Carry',
  ARRAY['Barbell/Dumbbell','Kettlebell'],
  'Intermediate',
  NULL,
  '5',
  '10 PU / 20 Lunges / 100m FC',
  NULL,
  'Knie-Push-ups / leichteres Gewicht',
  'Gewichtete Push-ups / schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Parallette & Rope',
  'Eigenes WOD',
  'ForTime',
  '4 Rounds For Time',
  'Parallette HSPU, Over-the-Box Jumps, Rope Climbs, Double Unders, Squat Cleans',
  ARRAY['Parallettes','Box','Rope','Jump Rope','Barbell'],
  'Advanced',
  NULL,
  '4',
  '10/20/4/60 DU/8 SC',
  '85',
  'Box HSPU / niedrigere Box / leichteres Gewicht',
  'Höheres Deficit / schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Jumping Jacks Pull-up Complex',
  'Eigenes WOD',
  'ForTime',
  '4 Rounds For Time',
  'Jumping Jacks, Pull-ups, Front Rack Lunges, Push-ups, KB Snatches',
  ARRAY['Pull-up Bar','Barbell','Kettlebell','Bodyweight'],
  'Intermediate',
  NULL,
  '4',
  '40/10/20/15/10',
  NULL,
  'Ring Rows / leichteres Gewicht',
  'C2B / schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Swings Goblet 30-20-10',
  'Eigenes WOD',
  'ForTime',
  'For Time',
  'KB Swings, Goblet Squats, Sit-ups',
  ARRAY['Kettlebell','Bodyweight'],
  'Beginner',
  NULL,
  NULL,
  '30-20-10 KB / 60-40-20 Sit-ups',
  NULL,
  'Leichtere KB',
  'Schwerere KB',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull-up T2B Push-up Squat AMRAP',
  'Eigenes WOD',
  'AMRAP',
  '10 Min AMRAP',
  'Pull-ups, Toes-to-Bar, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  10,
  NULL,
  '10/10/15/20',
  NULL,
  'Ring Rows / K2E / Knie-Push-ups',
  'C2B / gewichtete Varianten',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bell',
  'Hero WOD',
  'ForTime',
  '3 Rounds For Time',
  'Deadlifts, Pull-ups, Front Squats',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  '3',
  '21/15/9',
  '85',
  'Leichteres Gewicht / Ring Rows',
  'Schwereres Gewicht / C2B',
  'WOD_Pläne.xlsx / Hero WOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Jump Squat DB Complex',
  'Eigenes WOD',
  'ForTime',
  '7 Rounds For Time',
  'Jump Squats, DB Hang Power Cleans, DB Push Press R/L',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  NULL,
  '7',
  '7 Reps je Übung',
  NULL,
  'Leichteres Gewicht / normale Squats',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Dumbbell DT',
  'Other Benchmark',
  'ForTime',
  '5 Rounds For Time – Dumbbell Version von DT',
  'DB Deadlifts, DB Hang Power Cleans, DB Shoulder-to-Overhead',
  ARRAY['Dumbbell'],
  'Intermediate',
  NULL,
  '5',
  '12/9/6',
  '22.5',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'HSPU Deadlift Pull-up DU',
  'Eigenes WOD',
  'ForTime',
  '10 Rounds For Time',
  'Handstand Push-ups, Deadlifts, Pull-ups, Double Unders',
  ARRAY['Barbell','Pull-up Bar','Bodyweight'],
  'Advanced',
  NULL,
  '10',
  '3/6/12/24',
  '100',
  'Box HSPU / leichteres Gewicht / Singles',
  'Deficit HSPU / schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Burpee Back Squat Row',
  'Eigenes WOD',
  'ForTime',
  '3 Rounds For Time',
  'Burpees, Back Squats, Row',
  ARRAY['Barbell','Rower','Bodyweight'],
  'Intermediate',
  NULL,
  '3',
  '15/10/25 Cal',
  '60',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Dumbbell Fran',
  'Other Benchmark',
  'ForTime',
  '21-15-9 – Dumbbell Version',
  'DB Thrusters, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar'],
  'Intermediate',
  NULL,
  '3',
  '21-15-9',
  '20',
  'Ring Rows / leichteres Gewicht',
  'Schwereres Gewicht / C2B',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Black and Blue',
  'Eigenes WOD',
  'ForTime',
  '5 Rounds For Time',
  'Power Cleans, Burpees',
  ARRAY['Barbell','Bodyweight'],
  'Intermediate',
  NULL,
  '5',
  '10/10',
  '60',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Copey',
  'Other Benchmark',
  'ForTime',
  '21-15-9 Reps For Time',
  'Bench Presses, Deadlifts, Ring Dips',
  ARRAY['Barbell','Rings'],
  'Advanced',
  NULL,
  '3',
  '21-15-9 (Bodyweight)',
  NULL,
  'Leichteres Gewicht / Box Dips',
  'Schwereres Gewicht / Weighted Dips',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'T2B DU Squat Clean AMRAP',
  'Eigenes WOD',
  'AMRAP',
  '20 Min AMRAP',
  'Toes-to-Bar, Double Unders, Squat Cleans',
  ARRAY['Pull-up Bar','Jump Rope','Barbell'],
  'Advanced',
  20,
  NULL,
  '25/50/15',
  '60',
  'K2E / Singles / leichteres Gewicht',
  'Mehr Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Box T2B HSPU AMRAP 7',
  'Eigenes WOD',
  'AMRAP',
  '7 Min AMRAP',
  'KB Swings, Box Jumps, Toes-to-Bar, Strict HSPU',
  ARRAY['Kettlebell','Box','Pull-up Bar','Bodyweight'],
  'Advanced',
  7,
  NULL,
  '15/12/9/6',
  '24',
  'Leichtere KB / K2E / Box HSPU',
  'Schwerere KB / Deficit HSPU',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Cluster Burpee Plank Row',
  'Eigenes WOD',
  'AMRAP',
  '12 Min AMRAP',
  'DB Clusters, Burpees, DB Plank Rows',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  12,
  NULL,
  '6/12/12',
  '12.5',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Cindy Beginner',
  'Other Benchmark',
  'AMRAP',
  '10 Min AMRAP',
  'Kipping Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Beginner',
  10,
  NULL,
  '5/10/15',
  NULL,
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Varianten',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Thruster Burpee 21-15-9',
  'Eigenes WOD',
  'ForTime',
  'For Time: 21-15-9',
  'DB Thrusters, Burpees',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  NULL,
  '3',
  '21-15-9',
  NULL,
  'Leichteres Gewicht / weniger Reps',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Power Snatch Jumping Jack',
  'Eigenes WOD',
  'ForTime',
  '3 Rounds For Time',
  'Jumping Jacks, DB Power Snatches',
  ARRAY['Dumbbell','Bodyweight'],
  'Beginner',
  NULL,
  '3',
  '50/25',
  NULL,
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '10 Rounds Pull Push Squat',
  'Eigenes WOD',
  'ForTime',
  '10 Rounds For Time',
  'Jumping Jacks, Push-ups, Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Beginner',
  NULL,
  '10',
  '15/10/5',
  NULL,
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Varianten',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Thruster Pull-up 21-15-9',
  'Other Benchmark',
  'ForTime',
  'For Time: 21-15-9 (Fran-Variante)',
  '(DB) Thrusters, Pull-ups',
  ARRAY['Barbell/Dumbbell','Pull-up Bar'],
  'Intermediate',
  NULL,
  '3',
  '21-15-9',
  NULL,
  'Ring Rows / leichteres Gewicht',
  'Schwereres Gewicht / C2B',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Back Squat Push-up EMOM 14',
  'Eigenes WOD',
  'EMOM',
  '14 Min EMOM',
  'Back Squats, Push-ups',
  ARRAY['Barbell','Bodyweight'],
  'Intermediate',
  14,
  '14',
  '3 Squats / 15 Push-ups',
  NULL,
  'Leichteres Gewicht / Knie-Push-ups',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Row KB T2B AMRAP 10',
  'Eigenes WOD',
  'AMRAP',
  '10 Min AMRAP',
  'Row, KB Swings, Toes-to-Bar',
  ARRAY['Rower','Kettlebell','Pull-up Bar'],
  'Intermediate',
  10,
  NULL,
  '15 Cal / 12 KB / 9 T2B',
  '24',
  'Leichtere KB / K2E',
  'Schwerere KB',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Thruster Burpee Lunge Press',
  'HomeWOD',
  'ForTime',
  '4 Rounds For Time',
  'DB Thrusters, DB Burpees, DB Lunges, DB Push Press',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  NULL,
  '4',
  '20 je Übung',
  NULL,
  'Leichteres Gewicht / weniger Reps',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Row Wall Ball Devil Press',
  'HomeWOD',
  'ForTime',
  'For Time',
  'Row, Wall Ball, Devil Press',
  ARRAY['Rower','Wall Ball','Dumbbell'],
  'Intermediate',
  NULL,
  NULL,
  '45-30-15 Cal / 30-30 WB / 15 DP',
  NULL,
  'Leichteres Gewicht / weniger Cals',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Deadlift HSPU Ladder + Step-ups',
  'HomeWOD',
  'ForTime',
  '1-2-3...10 + Step-ups nach jeder Runde',
  'Deadlifts, HSPU, Box Step-ups',
  ARRAY['Barbell','Box','Bodyweight'],
  'Advanced',
  NULL,
  '10',
  '1-10 / 5 Step-ups',
  NULL,
  'Box HSPU / leichteres Gewicht',
  'Deficit HSPU / schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Full Body Bodyweight 2 Rounds',
  'HomeWOD',
  'ForTime',
  '2 Rounds For Time',
  'Jumping Jacks, Push-ups, Sit-ups, Burpees, Air Squats, Leg Raises',
  ARRAY['Bodyweight'],
  'Beginner',
  NULL,
  '2',
  '100/25/25/25/25/25',
  NULL,
  'Weniger Reps',
  'Mehr Reps / gewichtete Varianten',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Run Air Squat Lunge Burpee',
  'HomeWOD',
  'ForTime',
  'For Time',
  'Run, Air Squats, Lunges, Burpees, Toe Taps',
  ARRAY['Bodyweight'],
  'Beginner',
  NULL,
  NULL,
  '500m Run / 50/50/50/50 / 500m Run',
  NULL,
  '250m Run / weniger Reps',
  'Mehr Reps / schwerere Varianten',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Burpee Lunge Jumping Jack',
  'HomeWOD',
  'ForTime',
  'For Time',
  'Burpees, Reverse Lunges, Jumping Jacks',
  ARRAY['Bodyweight'],
  'Beginner',
  NULL,
  NULL,
  '32-42-52-42-32',
  NULL,
  'Weniger Reps',
  'Mehr Reps',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Burpee Sit-up Ski Ladder',
  'HomeWOD',
  'ForTime',
  '21-18-15-12-9 Reps',
  'Burpees, Sit-ups, Ski Erg',
  ARRAY['Bodyweight','Ski Erg'],
  'Intermediate',
  NULL,
  NULL,
  '21-18-15-12-9',
  NULL,
  'Weniger Reps / Row statt Ski',
  'Mehr Reps',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Horn Curl EMOM 10',
  'HomeWOD',
  'EMOM',
  '10 Min EMOM',
  'KB Horn Curls, KB Offset Push-ups, Russian Twists',
  ARRAY['Kettlebell','Bodyweight'],
  'Beginner',
  10,
  '10',
  '8/6/8',
  NULL,
  'Leichtere KB',
  'Schwerere KB',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Burpee Jumping Jack Squat AMRAP',
  'HomeWOD',
  'AMRAP',
  '10 Min AMRAP',
  'Burpees, Jumping Jacks, Air Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  NULL,
  '5/10/15',
  NULL,
  'Weniger Reps',
  'Mehr Reps / schwerere Varianten',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Swing Snatch Deadlift',
  'HomeWOD',
  'ForTime',
  '4 Rounds For Time',
  'KB Swings, Alternating KB Snatches, DB Deadlifts',
  ARRAY['Kettlebell','Dumbbell'],
  'Intermediate',
  NULL,
  '4',
  '20/20/20',
  NULL,
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'T2B DB Clean Jerk Burpee AMRAP',
  'HomeWOD',
  'AMRAP',
  '21 Min AMRAP',
  'Toes-to-Bar, DB Hang Clean & Jerk, Burpees',
  ARRAY['Pull-up Bar','Dumbbell','Bodyweight'],
  'Intermediate',
  21,
  NULL,
  '8/10/12',
  NULL,
  'K2E / leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Burpee Lunge Sit-up AMRAP 12',
  'HomeWOD',
  'AMRAP',
  '12 Min AMRAP',
  'Burpees, Reverse Lunges, Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  12,
  NULL,
  '7/10/7',
  NULL,
  'Weniger Reps',
  'Mehr Reps / gewichtete Varianten',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Air Squat Push-up Plank',
  'HomeWOD',
  'ForTime',
  '3 Rounds For Time',
  'Air Squats, Push-ups, Plank',
  ARRAY['Bodyweight'],
  'Beginner',
  NULL,
  '3',
  '70/30/1min',
  NULL,
  'Knie-Push-ups / kürzeres Plank',
  'Gewichtete Push-ups / längeres Plank',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Run DB Burpee Thruster Deadlift',
  'HomeWOD',
  'ForTime',
  '5 Rounds For Time',
  'Run, DB Burpees, DB Thrusters, DB Deadlifts',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  NULL,
  '5',
  '200m / 20/20/20',
  NULL,
  '100m / leichteres Gewicht',
  'Schwereres Gewicht / mehr Reps',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Lunge V-up Dip',
  'HomeWOD',
  'ForTime',
  '5 Rounds For Time',
  'Reverse Lunges, Single Leg V-ups, Dips',
  ARRAY['Bodyweight'],
  'Intermediate',
  NULL,
  '5',
  '30/8/30/8',
  NULL,
  'Normale V-ups / Box Dips',
  'Gewichtete Dips',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Run Burpee Squat Jump Sit-up 10 Rounds',
  'HomeWOD',
  'ForTime',
  '10 Rounds For Time',
  'Run, Burpees, Squat Jumps, Sit-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  NULL,
  '10',
  '100m / 10/10/10',
  NULL,
  '50m / weniger Reps',
  'Mehr Reps / längere Distanz',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull-up DB Thruster Burpee 21-15-9',
  'HomeWOD',
  'ForTime',
  'For Time: 21-15-9',
  'Pull-ups, DB Thrusters, Burpees',
  ARRAY['Pull-up Bar','Dumbbell','Bodyweight'],
  'Intermediate',
  NULL,
  '3',
  '21-15-9',
  NULL,
  'Ring Rows / leichteres Gewicht',
  'C2B / schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Lunge Pull-up Push-up V-up Ladder',
  'HomeWOD',
  'ForTime',
  '10-9-8...1 Reps',
  'Lunges, Pull-ups, Push-ups, V-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  NULL,
  '10',
  '10-1 jede Übung',
  NULL,
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Varianten',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Row T2B Burpee 3 Rounds',
  'HomeWOD',
  'ForTime',
  '3 Rounds (3 Min Pause)',
  'Row, Toes-to-Bar, Burpees',
  ARRAY['Rower','Pull-up Bar','Bodyweight'],
  'Advanced',
  NULL,
  '3',
  '40 Cal / 30 T2B / 20 Burpees',
  NULL,
  'Weniger Cals / K2E',
  'Mehr Cals / C2B',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Durante Core',
  'Core WOD',
  'ForTime',
  '5 Rounds ASAP mit 1 Min Pause',
  'Hollow Rocks, V-ups, Tuck-ups, Hollow Hold',
  ARRAY['Bodyweight'],
  'Intermediate',
  NULL,
  '5',
  '10/10/10/10sec',
  NULL,
  'Weniger Reps / kürzerer Hold',
  'Mehr Reps',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Annie Core',
  'Core WOD',
  'ForTime',
  '50-40-30-20-10 For Time',
  'Double Unders, Sit-ups',
  ARRAY['Jump Rope','Bodyweight'],
  'Intermediate',
  NULL,
  NULL,
  '50-40-30-20-10',
  NULL,
  'Singles statt DU',
  'Unbroken Sets',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'V-up Tuck Crunch Set',
  'Core WOD',
  'ForTime',
  '5 Sets, nicht auf Zeit',
  'V-ups, Tuck Crunches, Hollow Hold, Arch Hold',
  ARRAY['Bodyweight'],
  'Beginner',
  NULL,
  '5',
  '20/15/20sec/20sec',
  NULL,
  'Weniger Reps / kürzere Holds',
  'Mehr Reps',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Handstand Plank Side Plank EMOM',
  'Core WOD',
  'EMOM',
  '5 Rounds – Handstand & Plank Holds',
  'Handstand Hold, Plank, Side Plank L/R',
  ARRAY['Bodyweight'],
  'Intermediate',
  NULL,
  '5',
  '20 Sek je Position',
  NULL,
  'Kürzere Holds / Box HS',
  'Längere Holds / freier HS',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'L-Sit Hollow Rock EMOM 10',
  'Core WOD',
  'EMOM',
  '10 Min EMOM',
  'L-Sit Hold, Hollow Rocks, Sit-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  10,
  '10',
  '20 Sek L-Sit / 20 Rocks / 20 Sit-ups',
  NULL,
  'Kürzere Holds / Box L-Sit',
  'Längere Holds / gewichtet',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'V-up Russian Twist Plank Set',
  'Core WOD',
  'ForTime',
  '4 Sets, nicht auf Zeit',
  'V-ups, Russian Twists, Plank, Hollow Hold, Arch Hold, L-Sit',
  ARRAY['Bodyweight','Medball'],
  'Intermediate',
  NULL,
  '4',
  '20/20/20sec/20sec/20sec/20sec',
  NULL,
  'Weniger Reps / kürzere Holds',
  'Mehr Reps / längere Holds',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Russian Twist Around the World',
  'Core WOD',
  'ForTime',
  'For Time',
  'Russian Twists, Around the World with Plate',
  ARRAY['Plate','Bodyweight'],
  'Beginner',
  NULL,
  NULL,
  'Max Reps',
  NULL,
  'Leichtere Platte / ohne Gewicht',
  'Schwerere Platte',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '11.1',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 10 Min',
  'Double Unders, Power Snatches',
  ARRAY['Jump Rope','Barbell'],
  'Intermediate',
  10,
  NULL,
  '30 DU / 15 Snatches',
  '34',
  'Singles statt DU',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '11.2',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 15 Min',
  'Deadlifts, Push-ups, Box Jumps',
  ARRAY['Barbell','Box'],
  'Intermediate',
  15,
  NULL,
  '9/12/15',
  '70',
  'Leichteres Gewicht / Knie-Push-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '11.3',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 5 Min',
  'Squat Clean & Jerk',
  ARRAY['Barbell'],
  'Advanced',
  5,
  NULL,
  'Max Reps',
  '75',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '11.4',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 10 Min',
  'Bar-facing Burpees, Overhead Squats, Muscle-ups',
  ARRAY['Barbell','Rings'],
  'Advanced',
  10,
  NULL,
  '60 BFB / 30 OHS / 10 MU',
  '54',
  'Box MU / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '11.5',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 20 Min – Power Snatch Ladder',
  'Power Snatches, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  20,
  NULL,
  'Steigende Reps 3/6/9...',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '11.6',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 7 Min – Thrusters & C2B',
  'Thrusters, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  7,
  NULL,
  '3 Runden, dann +3 Reps',
  '45',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '12.1',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 7 Min',
  'Burpees to Target',
  ARRAY['Bodyweight'],
  'Beginner',
  7,
  NULL,
  'Max Reps',
  NULL,
  'Niedrigeres Ziel',
  'Höheres Ziel',
  'CrossFit Open 2012'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '12.2',
  'CrossFit Open',
  'EMOM',
  'EMOM bis Versagen – OHS & C2B',
  'Overhead Squats, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  NULL,
  '10/10 → 12/12 → +2',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2012'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '12.3',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 18 Min',
  'Box Jumps, Push Press, Toes-to-Bar',
  ARRAY['Box','Barbell','Pull-up Bar'],
  'Intermediate',
  18,
  NULL,
  '15/12/9',
  '52',
  'Leichteres Gewicht / K2E',
  'Schwereres Gewicht',
  'CrossFit Open 2012'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '12.4',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 12 Min',
  'Wall Balls, Box Jumps, Muscle-ups',
  ARRAY['Wall Ball','Box','Rings'],
  'Advanced',
  12,
  NULL,
  '150 WB / 90 DU / 30 MU',
  '9',
  'Leichteres Gewicht / Box MU',
  'Schwereres Gewicht',
  'CrossFit Open 2012'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '12.5',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 7 Min – Thrusters & C2B',
  'Thrusters, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  7,
  NULL,
  'Steigende Reps 3+3',
  '45',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2012'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '13.1',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 17 Min',
  'Snatches, Burpees over Bar',
  ARRAY['Barbell','Bodyweight'],
  'Intermediate',
  17,
  NULL,
  '30/30/30 Snatch / 30 Burpees',
  '34',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2013'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '13.2',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 10 Min',
  'Shoulder-to-Overhead, Deadlifts, Box Jumps',
  ARRAY['Barbell','Box'],
  'Intermediate',
  10,
  NULL,
  '5/10/15',
  '52',
  'Leichteres Gewicht / kleinere Box',
  'Schwereres Gewicht',
  'CrossFit Open 2013'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '13.3',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 12 Min',
  'Wall Balls, Double Unders, Muscle-ups',
  ARRAY['Wall Ball','Jump Rope','Rings'],
  'Advanced',
  12,
  NULL,
  '150 WB / 90 DU / 30 MU',
  '9',
  'Leichteres Gewicht / Box MU / Singles',
  'Schwereres Gewicht',
  'CrossFit Open 2013'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '13.4',
  'CrossFit Open',
  'ForTime',
  '7 Min AMRAP – Clean & Jerk Ladder',
  'Clean & Jerks',
  ARRAY['Barbell'],
  'Advanced',
  7,
  NULL,
  'Steigende Gewichte',
  '61',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2013'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '13.5',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 4 Min erweiterbar',
  'Thrusters, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  4,
  NULL,
  '15/15 → verlängert',
  '45',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2013'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '14.1',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 10 Min',
  'Double Unders, Power Snatches',
  ARRAY['Jump Rope','Barbell'],
  'Intermediate',
  10,
  NULL,
  '30 DU / 15 Snatches',
  '34',
  'Singles / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2014'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '14.2',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 3 Min erweiterbar – OHS & C2B',
  'Overhead Squats, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  NULL,
  '10/10 → 12/12 → +2',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2014'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '14.3',
  'CrossFit Open',
  'ForTime',
  '8 Min – Deadlift & Box Jump Ladder',
  'Deadlifts, Box Jumps',
  ARRAY['Barbell','Box'],
  'Advanced',
  8,
  NULL,
  '10-15-20-25-30-35 DL / 15 BJ',
  '61',
  'Leichteres Gewicht / kleinere Box',
  'Schwereres Gewicht',
  'CrossFit Open 2014'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '14.4',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 14 Min',
  'Row, Toes-to-Bar, Wall Balls, Cleans, Muscle-ups',
  ARRAY['Rower','Pull-up Bar','Wall Ball','Barbell','Rings'],
  'Advanced',
  14,
  NULL,
  '60 Cal / 50 T2B / 40 WB / 30 PC / 20 MU',
  '61',
  'Leichteres Gewicht / Box MU / K2E',
  'Schwereres Gewicht',
  'CrossFit Open 2014'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '14.5',
  'CrossFit Open',
  'ForTime',
  '21-18-15-12-9-6-3 Für Zeit',
  'Thrusters, Bar-facing Burpees',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  NULL,
  NULL,
  '21-18-15-12-9-6-3',
  '43',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2014'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '15.1',
  'CrossFit Open',
  'AMRAP',
  '9 Min AMRAP + 6 Min 1RM C&J',
  'Toes-to-Bar, Deadlifts, Snatches, Clean & Jerk',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  15,
  NULL,
  '15 T2B / 10 DL / 5 Snatch',
  '52',
  'K2E / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2015'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '15.2',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 3 Min erweiterbar – OHS & C2B',
  'Overhead Squats, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  NULL,
  '10/10 → 12/12 → +2',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2015'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '15.3',
  'CrossFit Open',
  'AMRAP',
  '14 Min AMRAP',
  'Muscle-ups, Squat Snatches, Wall Balls',
  ARRAY['Rings','Barbell','Wall Ball'],
  'Advanced',
  14,
  NULL,
  '7 MU / 50 WB / 100 DU',
  '61',
  'Box MU / leichteres Gewicht / Singles',
  'Schwereres Gewicht',
  'CrossFit Open 2015'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '15.4',
  'CrossFit Open',
  'ForTime',
  '8 Min – C2B & Cleans Ladder',
  'Chest-to-Bar Pull-ups, Cleans',
  ARRAY['Pull-up Bar','Barbell'],
  'Advanced',
  8,
  NULL,
  '3/3 → 6/3 → 9/3 steigende Gewichte',
  '61',
  'Pull-ups / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2015'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '15.5',
  'CrossFit Open',
  'ForTime',
  '21-18-15-12-9-6-3 Für Zeit',
  'Thrusters, Bar-facing Burpees',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  NULL,
  NULL,
  '21-18-15-12-9-6-3',
  '43',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2015'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '16.1',
  'CrossFit Open',
  'AMRAP',
  '20 Min AMRAP',
  'Overhead Walking Lunges, Bar-facing Burpees, C2B Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  20,
  NULL,
  '25ft OWL / 8 BFB / 8 C2B',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2016'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '16.2',
  'CrossFit Open',
  'AMRAP',
  '4 Min erweiterbar – T2B & DU & Squat Cleans',
  'Toes-to-Bar, Double Unders, Squat Cleans',
  ARRAY['Pull-up Bar','Jump Rope','Barbell'],
  'Advanced',
  4,
  NULL,
  '25 T2B / 50 DU / 15 SC',
  '61',
  'K2E / Singles / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2016'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '16.3',
  'CrossFit Open',
  'AMRAP',
  '7 Min AMRAP',
  'Power Snatches, Bar-facing Burpees',
  ARRAY['Barbell','Bodyweight'],
  'Intermediate',
  7,
  NULL,
  '10 Snatch / 10 BFB',
  '43',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2016'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '16.4',
  'CrossFit Open',
  'AMRAP',
  '13 Min AMRAP',
  'Deadlifts, Wall Balls, Row, HSPU',
  ARRAY['Barbell','Wall Ball','Rower','Bodyweight'],
  'Advanced',
  13,
  NULL,
  '55 DL / 55 WB / 55 Cal / 55 HSPU',
  '70',
  'Leichteres Gewicht / Box HSPU',
  'Schwereres Gewicht / Deficit HSPU',
  'CrossFit Open 2016'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '16.5',
  'CrossFit Open',
  'ForTime',
  '21-18-15-12-9-6-3 Für Zeit',
  'Thrusters, Bar-facing Burpees',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  NULL,
  NULL,
  '21-18-15-12-9-6-3',
  '43',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2016'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '17.1',
  'CrossFit Open',
  'ForTime',
  '10 Rounds For Time',
  'Dumbbell Snatches, Box Jump-overs',
  ARRAY['Dumbbell','Box'],
  'Intermediate',
  20,
  '10',
  '10 DB Snatch / 15 BJO',
  '22',
  'Leichteres Gewicht / kleinere Box',
  'Schwereres Gewicht',
  'CrossFit Open 2017'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '17.2',
  'CrossFit Open',
  'AMRAP',
  '12 Min AMRAP',
  'DB Lunges, Bar Muscle-ups, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar'],
  'Advanced',
  12,
  NULL,
  '6 DB OHL / 4 BJ / 2 MU',
  '22',
  'Leichteres Gewicht / Pull-ups / Box MU',
  'Schwereres Gewicht',
  'CrossFit Open 2017'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '17.3',
  'CrossFit Open',
  'AMRAP',
  '8 Min erweiterbar – C2B & Snatches',
  'Chest-to-Bar Pull-ups, Squat Snatches',
  ARRAY['Pull-up Bar','Barbell'],
  'Advanced',
  8,
  NULL,
  '3/3 → 3/3 steigende Gewichte',
  '43',
  'Pull-ups / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2017'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '17.4',
  'CrossFit Open',
  'ForTime',
  '13 Min – 55 reps chipper',
  'Deadlifts, Wall Balls, Row, HSPU',
  ARRAY['Barbell','Wall Ball','Rower','Bodyweight'],
  'Advanced',
  13,
  NULL,
  '55/55/55 Cal/55',
  '70',
  'Leichteres Gewicht / Box HSPU',
  'Schwereres Gewicht',
  'CrossFit Open 2017'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '17.5',
  'CrossFit Open',
  'ForTime',
  '33-27-21-15-9 Für Zeit',
  'Thrusters, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  NULL,
  '33-27-21-15-9',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2017'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '18.1',
  'CrossFit Open',
  'AMRAP',
  '20 Min AMRAP',
  'Toes-to-Bar, DB Hang Clean & Jerk, Cal Row',
  ARRAY['Pull-up Bar','Dumbbell','Rower'],
  'Intermediate',
  20,
  NULL,
  '8 T2B / 10 HCJ / 14 Cal',
  '22',
  'K2E / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2018'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '18.2',
  'CrossFit Open',
  'ForTime',
  '1-2-3-4-5-6-7-8-9-10-9-8...1 Für Zeit',
  'Deadlifts, Bar-facing Burpees',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  10,
  NULL,
  '1-10-1 Ladder',
  '102',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2018'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '18.3',
  'CrossFit Open',
  'AMRAP',
  '14 Min AMRAP',
  'Double Unders, OHS, Pull-ups, C2B, MU, Squat Snatches',
  ARRAY['Jump Rope','Barbell','Pull-up Bar','Rings'],
  'Advanced',
  14,
  NULL,
  '100 DU / 20 OHS / 100 DU / 12 BJ...',
  '43',
  'Singles / leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2018'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '18.4',
  'CrossFit Open',
  'ForTime',
  '9 Min – Deadlifts & HSPU Chipper',
  'Deadlifts, Handstand Push-ups, Handstand Walk',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  9,
  NULL,
  '21/21 → 15/15 → 9/9',
  '102',
  'Leichteres Gewicht / Box HSPU',
  'Deficit HSPU / Handstand Walk',
  'CrossFit Open 2018'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '18.5',
  'CrossFit Open',
  'AMRAP',
  '7 Min erweiterbar – Thrusters & C2B',
  'Thrusters, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  7,
  NULL,
  'Steigende Reps 3+3',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2018'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '19.1',
  'CrossFit Open',
  'AMRAP',
  '15 Min AMRAP',
  'Wall Balls, Cal Row',
  ARRAY['Wall Ball','Rower'],
  'Beginner',
  15,
  NULL,
  '19 WB / 19 Cal',
  '9',
  'Leichteres Gewicht / kleineres Ziel',
  'Schwereres Gewicht',
  'CrossFit Open 2019'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '19.2',
  'CrossFit Open',
  'AMRAP',
  '4 Min erweiterbar – T2B & DU & Squat Cleans',
  'Toes-to-Bar, Double Unders, Squat Cleans',
  ARRAY['Pull-up Bar','Jump Rope','Barbell'],
  'Advanced',
  4,
  NULL,
  '25/50/15 → 25/50/13',
  '61',
  'K2E / Singles / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2019'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '19.3',
  'CrossFit Open',
  'ForTime',
  '200ft DB OHL, 50 Box Step-ups, 50 Strict HSPU, 200ft HS Walk',
  'DB Overhead Lunges, Box Step-ups, Strict HSPU, Handstand Walk',
  ARRAY['Dumbbell','Box','Bodyweight'],
  'Advanced',
  NULL,
  NULL,
  '200ft / 50 / 50 / 200ft',
  '22',
  'Leichteres Gewicht / Box HSPU / Knie-Push-ups',
  'Handstand Walk',
  'CrossFit Open 2019'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '19.4',
  'CrossFit Open',
  'ForTime',
  '3 Rounds + 3 Rounds For Time',
  'Snatches, Bar-facing Burpees, OHS, C2B',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  12,
  NULL,
  '3+3 Rounds steigende Gewichte',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2019'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '19.5',
  'CrossFit Open',
  'ForTime',
  '33-27-21-15-9 Für Zeit',
  'Thrusters, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  NULL,
  '33-27-21-15-9',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2019'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '20.1',
  'CrossFit Open',
  'ForTime',
  '10 Rounds For Time',
  'Ground-to-Overhead, Bar-facing Burpees',
  ARRAY['Barbell','Bodyweight'],
  'Intermediate',
  15,
  '10',
  '10 GTO / 10 BFB',
  '34',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2020'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '20.2',
  'CrossFit Open',
  'AMRAP',
  '20 Min AMRAP',
  'DB Thrusters, Toes-to-Bar, Box Jumps, Cal Row, Handstand Push-ups',
  ARRAY['Dumbbell','Pull-up Bar','Box','Rower'],
  'Advanced',
  20,
  NULL,
  '4/4/4/3',
  '22',
  'Leichteres Gewicht / K2E / Box HSPU',
  'Schwereres Gewicht / Deficit HSPU',
  'CrossFit Open 2020'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '20.3',
  'CrossFit Open',
  'ForTime',
  '9 Min – Deadlifts & HSPU',
  'Deadlifts, Handstand Push-ups, Handstand Walk',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  9,
  NULL,
  '21/21 → 15/15 → 9/9',
  '102',
  'Leichteres Gewicht / Box HSPU',
  'Handstand Walk',
  'CrossFit Open 2020'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '20.4',
  'CrossFit Open',
  'ForTime',
  '20 Min – Box Jumps & Clean & Jerks Ladder',
  'Box Jumps, Clean & Jerks',
  ARRAY['Box','Barbell'],
  'Advanced',
  20,
  NULL,
  '30 BJ / 15 C&J steigende Gewichte',
  '43',
  'Leichteres Gewicht / Box Step-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2020'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '20.5',
  'CrossFit Open',
  'AMRAP',
  '7 Min erweiterbar – Thrusters & C2B',
  'Thrusters, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  7,
  NULL,
  'Steigende Reps 3+3',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2020'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '21.1',
  'CrossFit Open',
  'ForTime',
  '15 Min – Wall Walks & Double Unders Ladder',
  'Wall Walks, Double Unders',
  ARRAY['Bodyweight','Jump Rope'],
  'Intermediate',
  15,
  NULL,
  '1/10 → 3/30 → 6/60 → 9/90 → 15/150 → 21/210',
  NULL,
  'Weniger Reps / Singles',
  'Mehr Reps',
  'CrossFit Open 2021'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '21.2',
  'CrossFit Open',
  'ForTime',
  '20 Min – DB Snatches & Box Jump-overs',
  'Dumbbell Snatches, Box Jump-overs',
  ARRAY['Dumbbell','Box'],
  'Intermediate',
  20,
  NULL,
  '21/21 → 15/15 → 9/9',
  '22',
  'Leichteres Gewicht / Step-overs',
  'Schwereres Gewicht',
  'CrossFit Open 2021'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '21.3',
  'CrossFit Open',
  'ForTime',
  'Thrusters & Gymnastics Chipper',
  'Front Squats, Thrusters, Bar Muscle-ups, C2B, Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  NULL,
  'Komplexe Ladder',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2021'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '22.1',
  'CrossFit Open',
  'AMRAP',
  '15 Min AMRAP',
  'Wall Walks, DB Snatches, Box Jump-overs',
  ARRAY['Dumbbell','Box','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '3/12/15',
  '22',
  'Weniger Reps / leichteres Gewicht / kleinere Box',
  'Schwereres Gewicht',
  'CrossFit Open 2022'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '22.2',
  'CrossFit Open',
  'ForTime',
  'Deadlifts & Bar-facing Burpees Ladder',
  'Deadlifts, Bar-facing Burpees',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  NULL,
  NULL,
  '1-10-1 Ladder',
  '102',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2022'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '22.3',
  'CrossFit Open',
  'ForTime',
  '12 Min – Gymnastics & Barbell Chipper',
  'Pull-ups, Box Jumps, Thrusters, C2B, Barbell Lunges, Bar MU',
  ARRAY['Pull-up Bar','Box','Barbell'],
  'Advanced',
  12,
  NULL,
  '12/12/6 → steigende Schwierigkeit',
  '43',
  'Pull-ups / leichteres Gewicht / Box MU',
  'Schwereres Gewicht',
  'CrossFit Open 2022'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '23.1',
  'CrossFit Open',
  'AMRAP',
  '14 Min AMRAP',
  'Row, Toes-to-Bar, Wall Balls, Cleans, Muscle-ups',
  ARRAY['Rower','Pull-up Bar','Wall Ball','Barbell','Rings'],
  'Advanced',
  14,
  NULL,
  '60 Cal / 50 T2B / 40 WB / 30 PC / 20 MU',
  '61',
  'Leichteres Gewicht / K2E / Box MU',
  'Schwereres Gewicht',
  'CrossFit Open 2023'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '23.2',
  'CrossFit Open',
  'ForTime',
  '15 Min – Thrusters & C2B Ladder',
  'Thrusters, Chest-to-Bar Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  15,
  NULL,
  '21/21 → 15/15 → 9/9',
  '43',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2023'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '23.3',
  'CrossFit Open',
  'ForTime',
  'Wall Walks, DB Snatches, Box Jump-overs Chipper',
  'Wall Walks, Dumbbell Snatches, Box Jump-overs',
  ARRAY['Dumbbell','Box','Bodyweight'],
  'Intermediate',
  NULL,
  NULL,
  '5/10/20 → steigende Reps',
  '22',
  'Weniger Reps / leichteres Gewicht',
  'Mehr Reps / schwereres Gewicht',
  'CrossFit Open 2023'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '24.1',
  'CrossFit Open',
  'ForTime',
  '15 Min – DB Snatches & Burpees',
  'Dumbbell Snatches, Lateral Burpees over DB',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '21/21 → 15/15 → 9/9',
  '22',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2024'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '24.2',
  'CrossFit Open',
  'ForTime',
  '20 Min – Rower & Gymnastics Chipper',
  'Row, Chest-to-Bar Pull-ups, HSPUs, Barbell',
  ARRAY['Rower','Pull-up Bar','Barbell'],
  'Advanced',
  20,
  NULL,
  'Chipper mit steigenden Gewichten',
  '61',
  'Leichteres Gewicht / Box HSPU / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2024'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '24.3',
  'CrossFit Open',
  'ForTime',
  '30 Min – OHS & Snatches Chipper',
  'Overhead Squats, Snatches, Bar Muscle-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  30,
  NULL,
  '30/20/10 steigende Gewichte',
  '43',
  'Leichteres Gewicht / C2B / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2024'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '25.1',
  'CrossFit Open',
  'AMRAP',
  '15 Min AMRAP – Burpees & DB Clean-to-OH',
  'Lateral Burpees over DB, DB Hang Clean-to-Overhead, Walking Lunges',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '3/3/30ft → +3 pro Runde',
  '22',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2025'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '25.2',
  'CrossFit Open',
  'ForTime',
  '12 Min – Pull-ups, DU, Thrusters Chipper',
  'Pull-ups, Double Unders, Thrusters, C2B, Bar Muscle-ups',
  ARRAY['Pull-up Bar','Jump Rope','Barbell'],
  'Advanced',
  12,
  NULL,
  '21/42/21 → 18/36/18 → 15/30/15',
  '43',
  'Pull-ups / Singles / leichteres Gewicht',
  'C2B / Bar MU / schwereres Gewicht',
  'CrossFit Open 2025'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '25.3',
  'CrossFit Open',
  'ForTime',
  'Heavy Chipper – Barbell & Gymnastics',
  'Thrusters, Bar Muscle-ups, Squat Snatches',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  NULL,
  NULL,
  'Steigende Gewichte',
  '61',
  'Leichteres Gewicht / Pull-ups / C2B',
  'Schwereres Gewicht',
  'CrossFit Open 2025'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'King Kong KB',
  'Home Gym',
  'ForTime',
  '4 Rounds For Time',
  'KB Deadlifts, KB Muscle Cleans, KB Front Squat, KB Jerk',
  ARRAY['Kettlebell'],
  'Advanced',
  20,
  '4',
  '3/1/3/1',
  '32',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Bear Complex',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – KB Bear Complex',
  'KB Power Clean, KB Front Squat, KB Push Press, KB Back Squat, KB Push Press',
  ARRAY['Kettlebell'],
  'Intermediate',
  20,
  '5',
  '7 Komplexe pro Runde',
  '24',
  'Leichtere KB / weniger Runden',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Double KB Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – Double KB Version',
  'Double KB Front Squat, Double KB Push Press, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Intermediate',
  20,
  NULL,
  '5/10/15',
  '16',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Isabel',
  'Home Gym',
  'ForTime',
  '30 KB Snatches alternierend für Zeit',
  'Alternating KB Snatches',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  NULL,
  '30',
  '24',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB DT',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – KB Version von DT',
  'KB Deadlifts, KB Hang Cleans, KB Push Jerks',
  ARRAY['Kettlebell'],
  'Intermediate',
  20,
  '5',
  '12/9/6',
  '24',
  'Leichtere KB',
  'Schwerere KB / beidseitig',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Grace',
  'Home Gym',
  'ForTime',
  '30 KB Clean & Jerk für Zeit',
  'KB Clean & Jerk alternierend',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  NULL,
  '30',
  '24',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Hell',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time',
  'KB Swings, KB Goblet Squats, KB Push Press',
  ARRAY['Kettlebell'],
  'Intermediate',
  20,
  '5',
  '21/15/9',
  '24',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Kettlebell Mary',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – KB Version',
  'KB HSPU (Pike), KB Pistols, KB Swings',
  ARRAY['Kettlebell','Bodyweight'],
  'Advanced',
  20,
  NULL,
  '5/10/15',
  '24',
  'Box HSPU / Assisted Pistols / leichtere KB',
  'Deficit HSPU / echte Pistols / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Fran',
  'Home Gym',
  'ForTime',
  '21-15-9 KB Thrusters & Pull-ups',
  'KB Thrusters, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Intermediate',
  10,
  '3',
  '21-15-9',
  '16',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Annie',
  'Home Gym',
  'ForTime',
  '50-40-30-20-10 KB Swings & Sit-ups',
  'KB Swings, Sit-ups',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '50-40-30-20-10',
  '24',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Karen',
  'Home Gym',
  'ForTime',
  '150 KB Goblet Squats für Zeit',
  'KB Goblet Squats',
  ARRAY['Kettlebell'],
  'Intermediate',
  15,
  NULL,
  '150',
  '24',
  '100 Reps / leichtere KB',
  '200 Reps / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Nate',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – KB Version',
  'KB Clean & Jerk, Push-ups, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '2/4/8',
  '32',
  'Leichtere KB / Ring Rows / Knie-Push-ups',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Death By',
  'Home Gym',
  'EMOM',
  'EMOM bis zum Versagen – KB Swing',
  'KB Swings',
  ARRAY['Kettlebell'],
  'Intermediate',
  NULL,
  NULL,
  '1 mehr pro Minute starten bei 3',
  '24',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Helen',
  'Home Gym',
  'ForTime',
  '3 Rounds For Time – KB Version',
  'Run 400m / 50 KB Swings, KB Swings, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Intermediate',
  15,
  '3',
  '400m / 21 KB / 12 Pull-ups',
  '24',
  'Leichtere KB / Ring Rows / 200m',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Diane',
  'Home Gym',
  'ForTime',
  '21-15-9 KB Deadlifts & Push-ups',
  'KB Deadlifts (double), Push-ups',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  10,
  '3',
  '21-15-9',
  '32',
  'Leichtere KB / Knie-Push-ups',
  'Schwerere KB / HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB EMOM 20',
  'Home Gym',
  'EMOM',
  '20 Min EMOM – abwechselnd',
  'KB Swings, Push-ups',
  ARRAY['Kettlebell','Bodyweight'],
  'Beginner',
  20,
  '20',
  'Ungerade: 15 KB / Gerade: 20 Push-ups',
  '24',
  'Leichtere KB / Knie-Push-ups',
  'Schwerere KB / HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Complex Chipper',
  'Home Gym',
  'ForTime',
  'For Time – KB Chipper',
  'KB Deadlifts, KB Hang Cleans, KB Front Squats, KB Push Press, KB Swings',
  ARRAY['Kettlebell'],
  'Intermediate',
  20,
  NULL,
  '20 je Übung',
  '24',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Elizabeth',
  'Home Gym',
  'ForTime',
  '21-15-9 KB Cleans & Pull-ups',
  'KB Cleans, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Intermediate',
  10,
  '3',
  '21-15-9',
  '24',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Chipper 100',
  'Home Gym',
  'ForTime',
  'For Time – 100 Reps Chipper',
  'KB Swings, KB Goblet Squats, KB Push Press, KB Snatch',
  ARRAY['Kettlebell'],
  'Intermediate',
  20,
  NULL,
  '25 je Übung',
  '24',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Double KB DT',
  'Home Gym',
  'ForTime',
  '5 Rounds – Double KB DT',
  'Double KB Deadlifts, Double KB Hang Cleans, Double KB Push Jerks',
  ARRAY['Kettlebell'],
  'Advanced',
  20,
  '5',
  '12/9/6',
  '16',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – Dumbbell Version',
  'DB Hang Power Cleans, DB Front Squats, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar'],
  'Intermediate',
  20,
  NULL,
  '5/10/15',
  '15',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Elizabeth',
  'Home Gym',
  'ForTime',
  '21-15-9 DB Cleans & Pull-ups',
  'DB Squat Cleans, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar'],
  'Intermediate',
  10,
  '3',
  '21-15-9',
  '22.5',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Nancy',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – DB Version',
  'Run 400m, DB Overhead Squats',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  20,
  '5',
  '200m + 15 DB OHS',
  '15',
  'Leichtere DB / weniger Reps / 200m',
  'Schwerere DB / 400m',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Diane',
  'Home Gym',
  'ForTime',
  '21-15-9 DB Deadlifts & HSPU',
  'DB Deadlifts, Handstand Push-ups',
  ARRAY['Dumbbell','Bodyweight'],
  'Advanced',
  10,
  '3',
  '21-15-9',
  '22.5',
  'Leichtere DB / Box/Knie HSPU',
  'Schwerere DB / Deficit HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Isabel',
  'Home Gym',
  'ForTime',
  '30 DB Snatches alternierend für Zeit',
  'Alternating DB Snatches',
  ARRAY['Dumbbell'],
  'Intermediate',
  10,
  NULL,
  '30',
  '22.5',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Helen',
  'Home Gym',
  'ForTime',
  '3 Rounds For Time – DB Version',
  'Run 400m, DB Swings, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar'],
  'Intermediate',
  15,
  '3',
  '400m / 21 DB Swings / 12 Pull-ups',
  '22.5',
  '200m / Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Kelly',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – DB Version',
  'Run 400m, DB Step-ups, DB Thrusters',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  30,
  '5',
  '400m / 24 Step-ups / 20 Thrusters',
  '15',
  '200m / Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Mary',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – DB Version',
  'DB HSPU (Pike Push-ups), DB Pistols, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar','Bodyweight'],
  'Advanced',
  20,
  NULL,
  '5/10/15',
  '15',
  'Box HSPU / Assisted Pistols / Ring Rows',
  'Deficit HSPU / echte Pistols / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Dumbbell Bear',
  'Home Gym',
  'ForTime',
  '5 Rounds – DB Bear Complex',
  'DB Power Clean, DB Front Squat, DB Push Press, DB Back Squat, DB Push Press',
  ARRAY['Dumbbell'],
  'Intermediate',
  20,
  '5',
  '7 Komplexe pro Runde',
  '15',
  'Leichtere DB / weniger Runden',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Nate',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – DB Version',
  'DB Clean & Jerk, Push-ups, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '2/4/8',
  '22.5',
  'Leichtere DB / Ring Rows / Knie-Push-ups',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Annie',
  'Home Gym',
  'ForTime',
  '50-40-30-20-10 DB Snatches & Sit-ups',
  'Alternating DB Snatches, Sit-ups',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '50-40-30-20-10',
  '22.5',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Murph',
  'Home Gym',
  'ForTime',
  'For Time – DB Murph',
  'Run 1 Mile, DB Thrusters, Pull-ups, Run 1 Mile',
  ARRAY['Dumbbell','Pull-up Bar','Bodyweight'],
  'Advanced',
  45,
  NULL,
  '50 DB Thrusters / 100 Pull-ups',
  '15',
  '500m / leichtere DB / Ring Rows',
  'Gewichtsweste / schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB DT',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – DB Version',
  'DB Deadlifts, DB Hang Cleans, DB Shoulder-to-Overhead',
  ARRAY['Dumbbell'],
  'Intermediate',
  20,
  '5',
  '12/9/6',
  '22.5',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Barbara',
  'Home Gym',
  'ForTime',
  '5 Rounds mit Pause – DB Version',
  'DB Deadlifts, DB Push Press, Sit-ups, Air Squats',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  30,
  '5',
  '20/20/30/40 + 3 Min Pause',
  '15',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Karen',
  'Home Gym',
  'ForTime',
  '150 DB Goblet Squats für Zeit',
  'DB Goblet Squats',
  ARRAY['Dumbbell'],
  'Intermediate',
  15,
  NULL,
  '150',
  '22.5',
  '100 Reps / leichtere DB',
  '200 Reps / schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Angie',
  'Home Gym',
  'ForTime',
  '100 Reps je Übung für Zeit',
  'Pull-ups, DB Push Press, Sit-ups, DB Squats',
  ARRAY['Dumbbell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  30,
  NULL,
  '100/100/100/100',
  '15',
  '50 Reps / Ring Rows / Leichtere DB',
  'C2B / Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Strict Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – Strict Version',
  'Strict Pull-ups, Strict Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '5/10/15',
  NULL,
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Pull-ups / Archer Push-ups',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Weighted Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – mit Gewichtsweste',
  'Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  20,
  NULL,
  '5/10/15',
  NULL,
  'Ohne Weste / Ring Rows',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull-up Pyramid',
  'Home Gym',
  'ForTime',
  '1-2-3-4-5-6-7-8-9-10-9-8-7-6-5-4-3-2-1 Pull-ups',
  'Pull-ups',
  ARRAY['Pull-up Bar'],
  'Intermediate',
  20,
  NULL,
  'Pyramide 1-10-1',
  NULL,
  'Ring Rows',
  'Gewichtete Pull-ups / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Strict Press Ladder',
  'Home Gym',
  'EMOM',
  'EMOM 10 Min – Pull-ups & Push-ups',
  'Strict Pull-ups, Strict Push-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  10,
  '10',
  '5 Pull-ups / 10 Push-ups',
  NULL,
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Pull-ups / Archer Push-ups',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'C2B EMOM',
  'Home Gym',
  'EMOM',
  'EMOM 12 Min – Chest-to-Bar',
  'Chest-to-Bar Pull-ups, Push-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  12,
  '12',
  '5 C2B / 15 Push-ups',
  NULL,
  'Pull-ups / Knie-Push-ups',
  'Gewichtete C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Angie Modified',
  'Home Gym',
  'ForTime',
  '100-75-50-25 Reps For Time',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  25,
  NULL,
  '100/75/50/25',
  NULL,
  'Weniger Reps / Ring Rows',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Murph Scaled',
  'Home Gym',
  'ForTime',
  'Partitionierter Murph',
  'Run 800m, Pull-ups, Push-ups, Air Squats, Run 800m',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  40,
  NULL,
  '50/100/150',
  NULL,
  '400m / weniger Reps / Ring Rows',
  'Voller Murph mit Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Murph Vest',
  'Hero WOD',
  'ForTime',
  'Murph mit Gewichtsweste',
  'Run 1 Mile, Pull-ups, Push-ups, Air Squats, Run 1 Mile',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  60,
  NULL,
  '100/200/300',
  NULL,
  'Ohne Weste / partitioniert',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull-up Burpee Chipper',
  'Home Gym',
  'ForTime',
  'For Time',
  'Pull-ups, Burpees, Sit-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '30/30/30',
  NULL,
  'Ring Rows / weniger Reps',
  'C2B / Burpee Pull-ups',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'HSPU Ladder',
  'Home Gym',
  'ForTime',
  '10-9-8-7-6-5-4-3-2-1 HSPU & Pull-ups',
  'Handstand Push-ups, Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  15,
  NULL,
  '10-1 Ladder',
  NULL,
  'Box HSPU / Ring Rows',
  'Deficit HSPU / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Weighted Murph',
  'Hero WOD',
  'ForTime',
  'Murph – 10kg Gewichtsweste',
  'Run 1 Mile, Pull-ups, Push-ups, Air Squats, Run 1 Mile',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  60,
  NULL,
  '100/200/300',
  '10',
  'Ohne Weste / partitioniert',
  'Schwerere Weste / unpartitioniert',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – 10kg Weste',
  'Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  20,
  NULL,
  '5/10/15',
  '10',
  'Leichtere Weste / ohne Weste',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest Angie',
  'Home Gym',
  'ForTime',
  '100 je Übung mit Weste',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  30,
  NULL,
  '100/100/100/100',
  '10',
  'Ohne Weste / 50 Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Heavy Barbara',
  'Home Gym',
  'ForTime',
  '5 Rounds mit Weste & Pause',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  35,
  '5',
  '20/30/40/50 + 3 Min Pause',
  '10',
  'Ohne Weste / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest Nicole',
  'Home Gym',
  'ForTime',
  '20 Min AMRAP – 400m + Max Pull-ups mit Weste',
  'Run 400m, Max Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  20,
  NULL,
  'Max Reps',
  '10',
  'Ohne Weste / 200m',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tactical Chipper',
  'Home Gym',
  'ForTime',
  'For Time – Taktischer Chipper',
  'Pull-ups, Push-ups, Sit-ups, Air Squats, Burpees',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  20,
  NULL,
  '20/40/60/80/100',
  '10',
  'Ohne Weste / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest Fran',
  'Home Gym',
  'ForTime',
  '21-15-9 mit Gewichtsweste',
  'Pull-ups, Push-ups',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  10,
  '3',
  '21-15-9',
  '10',
  'Ohne Weste / leichtere Bewegungen',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Grunt Work',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – mit Weste',
  'Burpees, Pull-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  20,
  '5',
  '10/10/20',
  '10',
  'Ohne Weste / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Murph',
  'Home Gym',
  'ForTime',
  'Murph mit Sandbag',
  'Run 1 Mile, Sandbag Cleans, Push-ups, Air Squats, Run 1 Mile',
  ARRAY['Sandbag','Bodyweight'],
  'Advanced',
  50,
  NULL,
  '50/200/300',
  '20',
  '500m / leichterer Sandbag',
  'Schwererer Sandbag / Pull-ups',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Fran',
  'Home Gym',
  'ForTime',
  '21-15-9 Sandbag Thrusters & Pull-ups',
  'Sandbag Thrusters, Pull-ups',
  ARRAY['Sandbag','Pull-up Bar'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  '20',
  'Leichterer Sandbag / Ring Rows',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag DT',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – Sandbag Version',
  'Sandbag Deadlifts, Sandbag Cleans, Sandbag Shoulder-to-Overhead',
  ARRAY['Sandbag'],
  'Intermediate',
  20,
  '5',
  '12/9/6',
  '20',
  'Leichterer Sandbag',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Chipper',
  'Home Gym',
  'ForTime',
  'For Time – Sandbag Chipper',
  'Sandbag Carries, Sandbag Cleans, Sandbag Squats, Burpees',
  ARRAY['Sandbag','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '100m Carry / 20 Cleans / 20 Squats / 20 Burpees',
  '20',
  'Leichterer Sandbag / weniger Reps',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Carry Ladder',
  'Home Gym',
  'ForTime',
  '10 Rounds For Time',
  'Sandbag Bear Hug Carry, Burpees',
  ARRAY['Sandbag','Bodyweight'],
  'Intermediate',
  20,
  '10',
  '50m Carry + 5 Burpees',
  '20',
  'Leichterer Sandbag / weniger Runden',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Grace',
  'Home Gym',
  'ForTime',
  '30 Sandbag Clean & Jerks für Zeit',
  'Sandbag Clean & Jerks',
  ARRAY['Sandbag'],
  'Intermediate',
  12,
  NULL,
  '30',
  '20',
  'Leichterer Sandbag / weniger Reps',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag EMOM',
  'Home Gym',
  'EMOM',
  '16 Min EMOM',
  'Sandbag Cleans, Burpees',
  ARRAY['Sandbag','Bodyweight'],
  'Intermediate',
  16,
  '16',
  'Ungerade: 5 Cleans / Gerade: 10 Burpees',
  '20',
  'Leichterer Sandbag / weniger Reps',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Helen',
  'Home Gym',
  'ForTime',
  '3 Rounds For Time – Sandbag Version',
  'Run 400m, Sandbag Cleans, Pull-ups',
  ARRAY['Sandbag','Pull-up Bar'],
  'Intermediate',
  15,
  '3',
  '400m / 21 Cleans / 12 Pull-ups',
  '20',
  '200m / leichterer Sandbag / Ring Rows',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Bear Complex',
  'Home Gym',
  'ForTime',
  '5 Rounds – Sandbag Bear Complex',
  'Sandbag Power Clean, Sandbag Front Squat, Sandbag Push Press, Sandbag Back Squat, Sandbag Push Press',
  ARRAY['Sandbag'],
  'Advanced',
  20,
  '5',
  '7 Komplexe pro Runde',
  '20',
  'Leichterer Sandbag / weniger Runden',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Karen',
  'Home Gym',
  'ForTime',
  '150 Sandbag Front Squats für Zeit',
  'Sandbag Front Squats',
  ARRAY['Sandbag'],
  'Intermediate',
  15,
  NULL,
  '150',
  '20',
  '100 Reps / leichterer Sandbag',
  '200 Reps / schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Carry AMRAP',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP',
  'Sandbag Carry, Sandbag Cleans, Push-ups',
  ARRAY['Sandbag','Bodyweight'],
  'Intermediate',
  12,
  NULL,
  '50m Carry / 5 Cleans / 10 Push-ups',
  '20',
  'Leichterer Sandbag / Knie-Push-ups',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sand & Steel',
  'Home Gym',
  'ForTime',
  '4 Rounds For Time',
  'Sandbag Cleans, Pull-ups, Burpees',
  ARRAY['Sandbag','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '4',
  '10/10/15',
  '20',
  'Leichterer Sandbag / Ring Rows',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB & Pull-up Chipper',
  'Home Gym',
  'ForTime',
  'For Time',
  'KB Swings, Pull-ups, KB Goblet Squats, Push-ups, KB Snatches',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '40/30/30/40/20',
  '24',
  'Leichtere KB / Ring Rows / Knie-Push-ups',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB DB Couplet',
  'Home Gym',
  'AMRAP',
  '16 Min AMRAP',
  'KB Swings, DB Push Press',
  ARRAY['Kettlebell','Dumbbell'],
  'Intermediate',
  16,
  NULL,
  '15 KB / 12 DB',
  '24/15',
  'Leichtere Gewichte',
  'Schwerere Gewichte',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Home Gym Hero',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time',
  'KB Cleans, Pull-ups, DB Thrusters, Burpees',
  ARRAY['Kettlebell','Dumbbell','Pull-up Bar','Bodyweight'],
  'Advanced',
  25,
  '5',
  '8/8/8/8',
  '24/15',
  'Leichtere Gewichte / Ring Rows / weniger Reps',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest KB AMRAP',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – mit Weste',
  'KB Swings, Pull-ups, KB Goblet Squats',
  ARRAY['Kettlebell','Pull-up Bar','Gewichtsweste'],
  'Advanced',
  20,
  NULL,
  '15/10/15',
  '24',
  'Ohne Weste / leichtere KB / Ring Rows',
  'Schwerere Weste / schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Triple Threat',
  'Home Gym',
  'ForTime',
  '3 Rounds For Time',
  'KB Snatches, DB Thrusters, Pull-ups',
  ARRAY['Kettlebell','Dumbbell','Pull-up Bar'],
  'Intermediate',
  15,
  '3',
  '15/12/9',
  '24/15',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag & Pull-up',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Sandbag Cleans, Pull-ups, Push-ups',
  ARRAY['Sandbag','Pull-up Bar','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '6/6/12',
  '20',
  'Leichterer Sandbag / Ring Rows / Knie-Push-ups',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Home Gym Filthy',
  'Home Gym',
  'ForTime',
  '50 Reps von 10 Übungen',
  'Burpees, Pull-ups, KB Swings, Lunges, K2E, DB Push Press, Sit-ups, KB Goblet Squats, Push-ups, Double Unders',
  ARRAY['Kettlebell','Dumbbell','Pull-up Bar','Jump Rope','Bodyweight'],
  'Intermediate',
  30,
  NULL,
  '50 jede',
  '24',
  '25 Reps / leichtere Gewichte',
  '75 Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Full House',
  'Home Gym',
  'ForTime',
  'For Time – Alles dabei',
  'KB Deadlifts, DB Snatches, Pull-ups, Sandbag Cleans, Burpees',
  ARRAY['Kettlebell','Dumbbell','Pull-up Bar','Sandbag','Bodyweight'],
  'Advanced',
  20,
  NULL,
  '15/15/15/10/20',
  '24/22.5/20',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '100 Burpees',
  'Other Benchmark',
  'ForTime',
  '100 Burpees für Zeit',
  'Burpees',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '100',
  NULL,
  '50 Burpees',
  '150 Burpees / Vest',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Fight Gone Bad BW',
  'Other Benchmark',
  'ForTime',
  '3 Rounds à 1 Min pro Station',
  'Burpees, Air Squats, Push-ups, Sit-ups, Jumping Jacks',
  ARRAY['Bodyweight'],
  'Beginner',
  17,
  '3',
  'Max Reps je Station',
  NULL,
  'Weniger Runden',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight DT',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – Bodyweight Version',
  'Good Mornings, Clapping Push-ups, Air Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '5',
  '12/9/6',
  NULL,
  'Knie-Push-ups / weniger Reps',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Air Squat Century',
  'Home Gym',
  'ForTime',
  '100 Air Squats für Zeit',
  'Air Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  5,
  NULL,
  '100',
  NULL,
  '50 Squats',
  '150 Squats / Vest',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Burpee Mile',
  'Home Gym',
  'ForTime',
  '1 Meile Burpee Broad Jumps',
  'Burpee Broad Jumps',
  ARRAY['Bodyweight'],
  'Advanced',
  60,
  NULL,
  'Max Distance',
  NULL,
  '400m',
  'Mit Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push-up Century',
  'Home Gym',
  'ForTime',
  '100 Push-ups für Zeit',
  'Push-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  NULL,
  '100',
  NULL,
  '50 Knie Push-ups',
  'Archer Push-ups',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Strict Gymnastics EMOM',
  'Home Gym',
  'EMOM',
  '10 Min EMOM',
  'Strict Pull-ups, Strict Dips',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  10,
  '10',
  '5 Pull-ups / 10 Dips',
  NULL,
  'Ring Rows / Box Dips',
  'Gewichtete Pull-ups / Gewichtete Dips',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'L-Sit Tabata',
  'Home Gym',
  'Tabata',
  'Tabata L-Sit & Push-ups',
  'L-Sit Hold, Push-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  8,
  '16',
  '20 Sek / 10 Sek',
  NULL,
  'Tuck Hold / Knie-Push-ups',
  'Längeres Hold / Archer Push-ups',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Calisthenic Chipper',
  'Home Gym',
  'ForTime',
  'For Time – Bodyweight Chipper',
  'Pull-ups, Dips, Push-ups, Sit-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '25/50/75/100/125',
  NULL,
  'Ring Rows / Box Dips / weniger Reps',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'HSPU Karen',
  'Home Gym',
  'ForTime',
  '150 Handstand Push-ups für Zeit',
  'Handstand Push-ups',
  ARRAY['Bodyweight'],
  'Advanced',
  20,
  NULL,
  '150',
  NULL,
  '75 Box/Knie HSPU',
  'Deficit HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pistol & Pull Couplet',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Pistol Squats, Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  15,
  NULL,
  '5/10',
  NULL,
  'Assisted Pistols / Ring Rows',
  'Gewichtete Pistols / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Burpee Box Jump BW',
  'Home Gym',
  'ForTime',
  '10 Rounds For Time',
  'Burpees, Jump Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '10',
  '10/10',
  NULL,
  'Weniger Reps / Knie-Burpees',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata This BW',
  'Home Gym',
  'Tabata',
  'Tabata 8 Stationen',
  'Burpees, Air Squats, Push-ups, Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  16,
  '32',
  '8x20/10 je Übung',
  NULL,
  'Knie-Push-ups / Knie-Burpees',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Baseline',
  'Home Gym',
  'ForTime',
  'For Time – Basis Test',
  'Run 500m, 40 Air Squats, 30 Sit-ups, 20 Push-ups, 10 Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Beginner',
  10,
  NULL,
  '500m/40/30/20/10',
  NULL,
  '250m / Ring Rows / Knie-Push-ups',
  'Mit Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Griff',
  'Hero WOD',
  'ForTime',
  'Run 800m vorwärts, Run 400m rückwärts, Run 800m vorwärts, Run 400m rückwärts',
  'Run',
  ARRAY['Bodyweight'],
  'Intermediate',
  25,
  NULL,
  '800m/400m/800m/400m',
  NULL,
  'Kürzere Distanz',
  'Mit Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Ryan',
  'Hero WOD',
  'ForTime',
  '5 Rounds For Time',
  'Burpees über die Linie, Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  20,
  '5',
  '7 Bar Muscle-ups / 21 Burpees',
  NULL,
  'Pull-ups / Knie-Burpees',
  'Mit Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Lumberjack 20',
  'Hero WOD',
  'ForTime',
  '20 Reps von 8 Übungen',
  'KB Deadlifts, Burpees, KB Swings, Pull-ups, Sit-ups, KB Cleans, Push-ups, Air Squats',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Advanced',
  30,
  NULL,
  '20 jede',
  '32',
  'Leichtere KB / Ring Rows / weniger Reps',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Daniel',
  'Hero WOD',
  'ForTime',
  '50 Pull-ups, 400m Run, 21 KB Thrusters, 800m Run, 21 KB Thrusters, 400m Run, 50 Pull-ups',
  'Pull-ups, Run, KB Thrusters',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Advanced',
  35,
  NULL,
  '50/400m/21/800m/21/400m/50',
  '24',
  'Ring Rows / Leichtere KB / kürzere Distanz',
  'C2B / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Hansen',
  'Hero WOD',
  'ForTime',
  '5 Rounds For Time',
  'KB Swings, Burpees, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Advanced',
  30,
  '5',
  '30/30/30',
  '24',
  'Leichtere KB / Ring Rows / weniger Reps',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Severin',
  'Hero WOD',
  'AMRAP',
  '7 Min AMRAP',
  'KB Swings, Pull-ups, Push-ups',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  7,
  NULL,
  '10/5/15',
  '24',
  'Leichtere KB / Ring Rows / Knie-Push-ups',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Klepto',
  'Hero WOD',
  'ForTime',
  '5 Rounds For Time',
  'KB Swings, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Advanced',
  20,
  '5',
  '25/25',
  '32',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'McGhee',
  'Hero WOD',
  'AMRAP',
  '30 Min AMRAP',
  'KB Deadlifts, Burpees',
  ARRAY['Kettlebell','Bodyweight'],
  'Advanced',
  30,
  NULL,
  '5 KB Deadlifts / 13 Burpees',
  '70',
  'Leichtere KB / weniger Runden',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tommy Mac',
  'Hero WOD',
  'AMRAP',
  '20 Min AMRAP',
  'DB Hang Squat Cleans, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar'],
  'Intermediate',
  20,
  NULL,
  '8/10',
  '22.5',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Josh K',
  'Hero WOD',
  'ForTime',
  '5 Rounds For Time',
  'Pull-ups, KB Swings, Burpees',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '5',
  '15/20/10',
  '24',
  'Ring Rows / leichtere KB / weniger Reps',
  'C2B / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Ghost',
  'Hero WOD',
  'ForTime',
  '6 Rounds For Time',
  'Run 400m, Max Pull-ups, Max KB Swings',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Advanced',
  30,
  '6',
  '400m / Max Reps',
  '24',
  '200m / Ring Rows / leichtere KB',
  'Gewichtsweste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Pyramid AMRAP',
  'Home Gym',
  'AMRAP',
  '16 Min AMRAP',
  'KB Swings, KB Cleans, KB Push Press',
  ARRAY['Kettlebell'],
  'Intermediate',
  16,
  NULL,
  '5/5/5',
  '24',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull & Push AMRAP',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '7/14/21',
  NULL,
  'Ring Rows / Knie-Push-ups',
  'C2B / Archer Push-ups',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB AMRAP 12',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP',
  'DB Hang Power Cleans, DB Push Press, Sit-ups',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  12,
  NULL,
  '8/8/16',
  '15',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB & BW AMRAP',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP',
  'KB Goblet Squats, Push-ups, KB Snatches, Sit-ups',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '10/15/5/20',
  '24',
  'Leichtere KB / Knie-Push-ups',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest AMRAP',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP – mit Weste',
  'Pull-ups, Burpees, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  15,
  NULL,
  '5/10/15',
  '10',
  'Ohne Weste / Ring Rows / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Home AMRAP 10',
  'Home Gym',
  'AMRAP',
  '10 Min AMRAP – klassisch',
  'Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Beginner',
  10,
  NULL,
  '5/10/15',
  NULL,
  'Ring Rows / Knie-Push-ups',
  'Gewichtsweste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Snatch AMRAP',
  'Home Gym',
  'AMRAP',
  '10 Min AMRAP',
  'Alternating DB Snatches, Burpees',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  10,
  NULL,
  '10/5',
  '22.5',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Triple AMRAP',
  'Home Gym',
  'AMRAP',
  '18 Min AMRAP',
  'KB Swings, KB Cleans, KB Snatches',
  ARRAY['Kettlebell'],
  'Intermediate',
  18,
  NULL,
  '10/8/6',
  '24',
  'Leichtere KB',
  'Schwerere KB / Double KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'BW Classics AMRAP',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP',
  'Burpees, Sit-ups, Push-ups, Air Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  20,
  NULL,
  '5/10/15/20',
  NULL,
  'Weniger Reps / Knie-Push-ups',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag AMRAP 15',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Sandbag Cleans, Pull-ups, Burpees',
  ARRAY['Sandbag','Pull-up Bar','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '5/5/10',
  '20',
  'Leichterer Sandbag / Ring Rows',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB EMOM 30',
  'Home Gym',
  'EMOM',
  '30 Min EMOM – 3 Stationen',
  'KB Swings, Push-ups, Air Squats',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  30,
  '30',
  'Min 1: 20 KB / Min 2: 15 Push-ups / Min 3: 20 Squats',
  '24',
  'Leichtere KB / Knie-Push-ups / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull-up EMOM 10',
  'Home Gym',
  'EMOM',
  '10 Min EMOM',
  'Pull-ups, Burpees',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Beginner',
  10,
  '10',
  '5 Pull-ups / 5 Burpees',
  NULL,
  'Ring Rows / weniger Reps',
  'C2B / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB EMOM 16',
  'Home Gym',
  'EMOM',
  '16 Min EMOM – 4 Stationen',
  'DB Deadlifts, DB Push Press, DB Rows, DB Squats',
  ARRAY['Dumbbell'],
  'Intermediate',
  16,
  '16',
  '8 Reps je Station',
  '15',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag EMOM 12',
  'Home Gym',
  'EMOM',
  '12 Min EMOM',
  'Sandbag Cleans, Push-ups',
  ARRAY['Sandbag','Bodyweight'],
  'Intermediate',
  12,
  '12',
  'Ungerade: 5 Cleans / Gerade: 15 Push-ups',
  '20',
  'Leichterer Sandbag / Knie-Push-ups',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest EMOM 20',
  'Home Gym',
  'EMOM',
  '20 Min EMOM – mit Weste',
  'Pull-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  20,
  '20',
  'Ungerade: 7 Pull-ups / Gerade: 20 Squats',
  '10',
  'Ohne Weste / Ring Rows / weniger Reps',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB DB EMOM',
  'Home Gym',
  'EMOM',
  '12 Min EMOM – KB & DB',
  'KB Swings, DB Push Press, Pull-ups',
  ARRAY['Kettlebell','Dumbbell','Pull-up Bar'],
  'Intermediate',
  12,
  '12',
  'Min 1: 15 KB / Min 2: 12 DB / Min 3: 8 Pull-ups',
  '24/15',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Death By KB',
  'Home Gym',
  'EMOM',
  'EMOM bis Versagen – KB Snatch',
  'KB Snatches alternierend',
  ARRAY['Kettlebell'],
  'Intermediate',
  NULL,
  NULL,
  '1 mehr pro Minute starten bei 2',
  '24',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Death By Pull-ups & Burpees',
  'Home Gym',
  'EMOM',
  'EMOM bis Versagen – 2 Bewegungen',
  'Pull-ups, Burpees',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  NULL,
  NULL,
  '1 Pull-up + 1 Burpee mehr pro Minute',
  NULL,
  'Ring Rows',
  'C2B / Mit Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Strict EMOM 20',
  'Home Gym',
  'EMOM',
  '20 Min EMOM – Strict Gymnastics',
  'Strict Pull-ups, Strict Push-ups, L-Sit Hold',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '20',
  'Min 1: 5 / Min 2: 10 / Min 3: 20 Sek L-Sit',
  NULL,
  'Ring Rows / Knie-Push-ups / Tuck Hold',
  'Gewichtete Pull-ups',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB EMOM komplexer',
  'Home Gym',
  'EMOM',
  '24 Min EMOM – 4 Stationen',
  'KB Swings, KB Cleans, KB Snatches, KB Thrusters',
  ARRAY['Kettlebell'],
  'Advanced',
  24,
  '24',
  '10 Reps je Station rotierend',
  '24',
  'Leichtere KB / weniger Reps',
  'Schwerere KB / Double KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '10 Rounds Grind',
  'Home Gym',
  'ForTime',
  '10 Rounds For Time',
  'KB Swings, Pull-ups, Burpees',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '10',
  '10/5/10',
  '24',
  'Leichtere KB / Ring Rows / weniger Reps',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'The Pyramid',
  'Home Gym',
  'ForTime',
  '1-2-3-4-5-6-7-8-9-10 Reps',
  'Pull-ups, DB Thrusters',
  ARRAY['Dumbbell','Pull-up Bar'],
  'Intermediate',
  15,
  NULL,
  'Pyramide 1-10',
  '15',
  'Ring Rows / leichtere DB',
  'C2B / schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest Chipper',
  'Home Gym',
  'ForTime',
  'For Time – mit Gewichtsweste',
  'Pull-ups, Burpees, Air Squats, Sit-ups, Push-ups',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  20,
  NULL,
  '30/40/50/60/70',
  '10',
  'Ohne Weste / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Descending',
  'Home Gym',
  'ForTime',
  '21-18-15-12-9-6-3 Für Zeit',
  'KB Swings, Burpees',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '21-18-15-12-9-6-3',
  '24',
  'Leichtere KB / weniger Runden',
  'Schwerere KB / Vest',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull Push Squat',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time',
  'Pull-ups, Push-ups, Air Squats, KB Swings',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '5',
  '10/20/30/15',
  '24',
  'Ring Rows / Knie-Push-ups / leichtere KB',
  'C2B / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Double Under Alt',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – ohne Rope',
  'Jumping Jacks, Burpees, Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Beginner',
  15,
  '5',
  '50/10/10',
  NULL,
  'Weniger Jumping Jacks / Ring Rows',
  'Mehr Reps / Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB 21-15-9 Triplet',
  'Home Gym',
  'ForTime',
  '21-15-9 – KB Triplet',
  'KB Deadlifts, KB Cleans, KB Front Squats',
  ARRAY['Kettlebell'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  '24',
  'Leichtere KB',
  'Schwerere KB / Double KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Ascending',
  'Home Gym',
  'ForTime',
  '3-6-9-12-15 Für Zeit',
  'DB Hang Cleans, DB Push Press, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar'],
  'Intermediate',
  15,
  NULL,
  '3-6-9-12-15',
  '15',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag 5x5',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – 5 Übungen',
  'Sandbag Cleans, Sandbag Squats, Pull-ups, Push-ups, Burpees',
  ARRAY['Sandbag','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '5',
  '5 je Übung',
  '20',
  'Leichterer Sandbag / Ring Rows / weniger Reps',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Couplet Sprint',
  'Home Gym',
  'ForTime',
  '10 Rounds For Time – Couplet',
  'Burpees, Air Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '10',
  '5/15',
  NULL,
  'Weniger Reps',
  'Gewichtsweste / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB 100s',
  'Home Gym',
  'ForTime',
  '100 Reps von 4 Übungen',
  'KB Swings, KB Goblet Squats, KB Push Press, KB Snatches',
  ARRAY['Kettlebell'],
  'Advanced',
  20,
  NULL,
  '100 je Übung',
  '16',
  '50 Reps / leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Iron Mike',
  'Home Gym',
  'ForTime',
  '10-8-6-4-2 Für Zeit',
  'KB Snatches, Pull-ups, Burpees',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '10-2 je Übung',
  '24',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Tabata',
  'Home Gym',
  'Tabata',
  'Tabata KB Swings & Goblet Squats',
  'KB Swings, KB Goblet Squats',
  ARRAY['Kettlebell'],
  'Intermediate',
  8,
  '16',
  '8 Runden à 20/10 Sek',
  '24',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull-up Tabata',
  'Home Gym',
  'Tabata',
  'Tabata Pull-ups & Push-ups',
  'Pull-ups, Push-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  8,
  '16',
  '8 Runden à 20/10 Sek',
  NULL,
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Pull-ups',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Burpee Tabata',
  'Home Gym',
  'Tabata',
  'Tabata Burpees & Sit-ups',
  'Burpees, Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '16',
  '8 Runden à 20/10 Sek',
  NULL,
  'Knie-Burpees',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Tabata',
  'Home Gym',
  'Tabata',
  'Tabata DB Snatches & Thrusters',
  'DB Snatches, DB Thrusters',
  ARRAY['Dumbbell'],
  'Intermediate',
  8,
  '16',
  '8 Runden à 20/10 Sek',
  '15',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Full Body Tabata',
  'Home Gym',
  'Tabata',
  'Tabata – 4 Stationen à 8 Runden',
  'Air Squats, Push-ups, Sit-ups, Burpees',
  ARRAY['Bodyweight'],
  'Beginner',
  16,
  '32',
  '8 Runden à 20/10 Sek je Übung',
  NULL,
  'Weniger Stationen / Knie-Push-ups',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Pull Tabata',
  'Home Gym',
  'Tabata',
  'Tabata KB Swings & Pull-ups',
  'KB Swings, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Intermediate',
  8,
  '16',
  '8 Runden à 20/10 Sek',
  '24',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest Tabata',
  'Home Gym',
  'Tabata',
  'Tabata mit Gewichtsweste',
  'Burpees, Air Squats',
  ARRAY['Bodyweight','Gewichtsweste'],
  'Advanced',
  8,
  '16',
  '8 Runden à 20/10 Sek',
  '10',
  'Ohne Weste',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Tabata',
  'Home Gym',
  'Tabata',
  'Tabata Sandbag Cleans & Squats',
  'Sandbag Cleans, Sandbag Front Squats',
  ARRAY['Sandbag'],
  'Intermediate',
  8,
  '16',
  '8 Runden à 20/10 Sek',
  '20',
  'Leichterer Sandbag',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '20.1 Home',
  'CrossFit Open',
  'ForTime',
  '10 Rounds For Time – Home Version',
  'Burpees, DB Snatches alternierend',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  15,
  '10',
  '10 Burpees / 10 DB Snatches',
  '22.5',
  'Leichtere DB / weniger Runden',
  'Schwerere DB',
  'CrossFit Open 2020'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '21.1 Home',
  'CrossFit Open',
  'ForTime',
  '15 Min – Wall Walks & Double Unders Alt',
  'Wall Walks, Jumping Jacks',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '1/10 → 3/30 → 6/60 → ...',
  NULL,
  'Weniger Reps',
  'Mehr Reps',
  'CrossFit Open 2021'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '22.1 Home',
  'CrossFit Open',
  'AMRAP',
  '15 Min AMRAP – Home Version',
  'Wall Walks, DB Snatches, Box Jump-overs Alt',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '3/12/15',
  '22.5',
  'Weniger Reps / leichtere DB',
  'Schwerere DB',
  'CrossFit Open 2022'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '24.1 Home',
  'CrossFit Open',
  'ForTime',
  '15 Min – Home Version',
  'DB Snatches, Lateral Burpees',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '21/21 → 15/15 → 9/9',
  '22.5',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit Open 2024'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '25.1 Home',
  'CrossFit Open',
  'AMRAP',
  '15 Min AMRAP – Home Version',
  'Burpees, DB Hang Clean-to-OH, Walking Lunges',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '3/3/30ft → +3 pro Runde',
  '22.5',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit Open 2025'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Swing & Snatch Ladder',
  'Home Gym',
  'ForTime',
  '10-9-8-7-6-5-4-3-2-1 KB Swings & Snatches',
  'KB Swings, KB Snatches',
  ARRAY['Kettlebell'],
  'Intermediate',
  15,
  NULL,
  '10-1 Ladder',
  '24',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Press Complex',
  'Home Gym',
  'EMOM',
  'EMOM 15 Min',
  'KB Push Press, KB Push Jerk, KB Snatch',
  ARRAY['Kettlebell'],
  'Intermediate',
  15,
  '15',
  '3/3/3 je Minute',
  '24',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Flow',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP – KB Flow',
  'KB Clean, KB Front Squat, KB Push Press, KB Snatch',
  ARRAY['Kettlebell'],
  'Intermediate',
  15,
  NULL,
  '5 Komplexe',
  '24',
  'Leichtere KB',
  'Schwerere KB / Double KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Swing Century',
  'Home Gym',
  'ForTime',
  '100 KB Swings für Zeit',
  'KB Swings',
  ARRAY['Kettlebell'],
  'Intermediate',
  7,
  NULL,
  '100',
  '32',
  'Leichtere KB / 50 Swings',
  'Schwerere KB / 150 Swings',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Two-Hand Angie',
  'Home Gym',
  'ForTime',
  '100 je Übung – KB Version',
  'KB Deadlifts, KB Push Press, KB Front Squats, KB Swings',
  ARRAY['Kettlebell'],
  'Advanced',
  25,
  NULL,
  '100/100/100/100',
  '24',
  '50 Reps / leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Double KB Fran',
  'Home Gym',
  'ForTime',
  '21-15-9 Double KB',
  'Double KB Thrusters, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Advanced',
  12,
  '3',
  '21-15-9',
  '16',
  'Single KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Swing Tabata',
  'Home Gym',
  'Tabata',
  'Tabata KB Swings',
  'KB Swings',
  ARRAY['Kettlebell'],
  'Intermediate',
  4,
  '8',
  '8 Runden à 20/10 Sek',
  '32',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB 300',
  'Home Gym',
  'ForTime',
  '300 Reps KB Chipper',
  'KB Swings, KB Goblet Squats, KB Cleans, KB Push Press, KB Snatches, KB Thrusters',
  ARRAY['Kettlebell'],
  'Advanced',
  25,
  NULL,
  '50 je Übung',
  '16',
  '150 Reps / leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Grace & Kelly',
  'Home Gym',
  'ForTime',
  'KB Grace dann KB Kelly',
  'KB Clean & Jerks, Run 800m, KB Goblet Squats, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Intermediate',
  25,
  NULL,
  '21 C&J / 800m / 30 Squats / 12 Pull-ups',
  '24',
  'Leichtere KB / Ring Rows / 400m',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Row Sub',
  'Home Gym',
  'ForTime',
  'Fight Gone Bad – KB Version',
  'KB Swings, KB Thrusters, KB Box Step-ups, KB Push Press, KB Snatches',
  ARRAY['Kettlebell'],
  'Intermediate',
  17,
  '3',
  'Max Reps je Station à 1 Min',
  '24',
  'Leichtere KB / weniger Runden',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Complex 5',
  'Home Gym',
  'ForTime',
  '5 Rounds – DB 5-Übungen-Komplex',
  'DB Deadlifts, DB Hang Cleans, DB Front Squats, DB Push Press, DB Romanian DL',
  ARRAY['Dumbbell'],
  'Intermediate',
  20,
  '5',
  '5 je Übung',
  '22.5',
  'Leichtere DB / weniger Runden',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Swing & Snatch',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP',
  'DB Swings, DB Snatches alternierend, DB Push Press',
  ARRAY['Dumbbell'],
  'Intermediate',
  12,
  NULL,
  '12/6/12',
  '15',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Lunges EMOM',
  'Home Gym',
  'EMOM',
  'EMOM 10 Min',
  'DB Overhead Lunges, DB Push Press',
  ARRAY['Dumbbell'],
  'Intermediate',
  10,
  '10',
  '10 Lunges / 12 Push Press',
  '15',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Ascending Ladder',
  'Home Gym',
  'ForTime',
  '2-4-6-8-10-12 Für Zeit',
  'DB Thrusters, Burpees',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  'Aufsteigende Reps',
  '15',
  'Leichtere DB / weniger Runden',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Cluster AMRAP',
  'Home Gym',
  'AMRAP',
  '10 Min AMRAP',
  'DB Clusters, Pull-ups, Burpees',
  ARRAY['Dumbbell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  10,
  NULL,
  '5/5/10',
  '15',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Floor Press Circuit',
  'Home Gym',
  'ForTime',
  '4 Rounds For Time',
  'DB Floor Press, DB Bent-over Rows, DB Squats',
  ARRAY['Dumbbell'],
  'Beginner',
  15,
  '4',
  '15/15/20',
  '15',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Man Maker AMRAP',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP',
  'DB Man Makers, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar'],
  'Intermediate',
  12,
  NULL,
  '5/10',
  '15',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Devil Press AMRAP',
  'Home Gym',
  'AMRAP',
  '10 Min AMRAP',
  'DB Devil Press, DB Front Squats',
  ARRAY['Dumbbell'],
  'Advanced',
  10,
  NULL,
  '5/10',
  '15',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB 21s',
  'Home Gym',
  'ForTime',
  '21-15-9 DB Chipper',
  'DB Deadlifts, DB Hang Power Cleans, DB Push Jerks, DB Front Squats',
  ARRAY['Dumbbell'],
  'Intermediate',
  15,
  NULL,
  '21-15-9 je',
  '15',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Cindy Plus',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – erweiterte Version',
  'Pull-ups, Push-ups, DB Front Squats, DB Push Press',
  ARRAY['Dumbbell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '5/10/10/10',
  '15',
  'Ring Rows / Knie-Push-ups / leichtere DB',
  'C2B / schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Kipping Practice',
  'Home Gym',
  'EMOM',
  'EMOM 10 Min – Kipping Pull-ups',
  'Kipping Pull-ups, Hanging Knee Raises',
  ARRAY['Pull-up Bar'],
  'Intermediate',
  10,
  '10',
  '7 Pull-ups / 10 HKR',
  NULL,
  'Ring Rows / weniger Reps',
  'C2B / Toes-to-Bar',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Strict Gymnastics 5x5',
  'Home Gym',
  'ForTime',
  '5 Sets – Strict Gymnastics',
  'Strict Pull-ups, Strict HSPU, L-Sit Hold',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  20,
  '5',
  '5/5/10 Sek',
  NULL,
  'Ring Rows / Box HSPU / Tuck Hold',
  'Gewichtete Pull-ups / Deficit HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bar Complex',
  'Home Gym',
  'EMOM',
  'EMOM 12 Min – Bar Komplexe',
  'Pull-ups, Hanging Knee Raises, Dead Hangs',
  ARRAY['Pull-up Bar'],
  'Beginner',
  12,
  '12',
  '5 Pull-ups / 10 HKR / 15 Sek Hang',
  NULL,
  'Ring Rows / weniger Reps',
  'C2B / Toes-to-Bar',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull-up 100',
  'Home Gym',
  'ForTime',
  '100 Pull-ups für Zeit',
  'Pull-ups',
  ARRAY['Pull-up Bar'],
  'Intermediate',
  10,
  NULL,
  '100',
  NULL,
  '50 Ring Rows',
  '100 Gewichtete Pull-ups',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Strict Pull & HSPU',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time',
  'Strict Pull-ups, Strict HSPU',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  15,
  '5',
  '10/10',
  NULL,
  'Ring Rows / Box HSPU',
  'Gewichtete Pull-ups / Deficit HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'V-up & Pull-up Couplet',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'V-ups, Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '15/7',
  NULL,
  'Sit-ups / Ring Rows',
  'Toes-to-Bar / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Jump & Grind',
  'Home Gym',
  'ForTime',
  '10 Rounds For Time',
  'Tuck Jumps, Push-ups, Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  15,
  '10',
  '10/10/10',
  NULL,
  'Weniger Reps / Knie-Push-ups',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'BW Triplet AMRAP',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Burpees, Sit-ups, Air Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  15,
  NULL,
  '5/10/20',
  NULL,
  'Weniger Reps',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Hollow Rock Tabata',
  'Home Gym',
  'Tabata',
  'Tabata Hollow Rocks & V-ups',
  'Hollow Rocks, V-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  8,
  '16',
  '8 Runden à 20/10 Sek',
  NULL,
  'Tuck Rocks / Sit-ups',
  'Gewichte halten',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Run & Ruck',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time',
  'Run 400m, Burpees',
  ARRAY['Bodyweight','Gewichtsweste'],
  'Intermediate',
  20,
  '5',
  '400m / 10 Burpees',
  '10',
  '200m / weniger Burpees / ohne Weste',
  'Schwerere Weste / mehr Burpees',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'BW 300',
  'Other Benchmark',
  'ForTime',
  '300 Reps Bodyweight Chipper',
  'Pull-ups, Push-ups, Box Jumps, Floor Wipers, Dips, Clapping Push-ups, Tuck Jumps',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  20,
  NULL,
  'Verschiedene Reps = 300 total',
  NULL,
  '150 Reps / Skalierte Bewegungen',
  'Mit Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag EMOM 20',
  'Home Gym',
  'EMOM',
  '20 Min EMOM – 4 Stationen',
  'Sandbag Cleans, Sandbag Carries, Push-ups, Air Squats',
  ARRAY['Sandbag','Bodyweight'],
  'Intermediate',
  20,
  '20',
  '5/20m/15/20 rotierend',
  '20',
  'Leichterer Sandbag / Knie-Push-ups',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Over Shoulder',
  'Home Gym',
  'ForTime',
  '100 Sandbag Over Shoulder für Zeit',
  'Sandbag Over Shoulder',
  ARRAY['Sandbag'],
  'Intermediate',
  10,
  NULL,
  '100',
  '20',
  '50 Reps / leichterer Sandbag',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Step-ups',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Sandbag Bear Hug Step-ups, Push-ups, Sandbag Squats',
  ARRAY['Sandbag','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '10/15/10',
  '20',
  'Leichterer Sandbag / Knie-Push-ups',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Runs',
  'Home Gym',
  'ForTime',
  '6 Rounds For Time',
  'Sandbag Carry Run 200m, Sandbag Cleans',
  ARRAY['Sandbag'],
  'Intermediate',
  20,
  '6',
  '200m Carry / 10 Cleans',
  '20',
  '100m / leichterer Sandbag / weniger Runden',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Get-ups',
  'Home Gym',
  'EMOM',
  '10 Min EMOM',
  'Sandbag Turkish Get-ups alternierend',
  ARRAY['Sandbag'],
  'Beginner',
  10,
  '10',
  '2 je Seite',
  '10',
  'Leichterer Sandbag / 1 je Seite',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB DB Snatch Couplet',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP',
  'KB Snatches, DB Snatches alternierend',
  ARRAY['Kettlebell','Dumbbell'],
  'Intermediate',
  12,
  NULL,
  '10 KB / 10 DB',
  '24/15',
  'Leichtere Gewichte',
  'Schwerere Gewichte',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Home Gym DT Plus',
  'Home Gym',
  'ForTime',
  '5 Rounds – 4 Bewegungen',
  'KB Deadlifts, KB Cleans, DB Push Press, Pull-ups',
  ARRAY['Kettlebell','Dumbbell','Pull-up Bar'],
  'Advanced',
  20,
  '5',
  '12/9/6/6',
  '24/15',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag KB Couplet',
  'Home Gym',
  'ForTime',
  '4 Rounds For Time',
  'Sandbag Cleans, KB Swings',
  ARRAY['Sandbag','Kettlebell'],
  'Intermediate',
  15,
  '4',
  '10/20',
  '20/24',
  'Leichtere Gewichte',
  'Schwerere Gewichte',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'The Home Trifecta',
  'Home Gym',
  'AMRAP',
  '18 Min AMRAP – 3 Stationen',
  'KB Swings, DB Thrusters, Pull-ups',
  ARRAY['Kettlebell','Dumbbell','Pull-up Bar'],
  'Intermediate',
  18,
  NULL,
  '15/12/9',
  '24/15',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest & Bells',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – mit Weste',
  'KB Swings, Pull-ups, Push-ups',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  20,
  '5',
  '20/10/20',
  '24',
  'Ohne Weste / leichtere KB / Ring Rows',
  'Schwerere Weste / schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sandbag Vest Chipper',
  'Home Gym',
  'ForTime',
  'For Time – mit Weste & Sandbag',
  'Sandbag Cleans, Pull-ups, Burpees, Air Squats',
  ARRAY['Sandbag','Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  20,
  NULL,
  '20/20/20/40',
  '20',
  'Ohne Weste / leichterer Sandbag / Ring Rows',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Zembiec',
  'Hero WOD',
  'ForTime',
  'For Time – Hero WOD',
  'Burpees, Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '8 Rounds: 8/8/8/8',
  NULL,
  'Ring Rows / Knie-Push-ups / weniger Runden',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Loredo',
  'Hero WOD',
  'ForTime',
  '6 Rounds For Time',
  'Run 400m, 24 Air Squats, 24 Push-ups, 24 Walking Lunges',
  ARRAY['Bodyweight'],
  'Intermediate',
  30,
  '6',
  '400m/24/24/24',
  NULL,
  '200m / weniger Reps / Knie-Push-ups',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Nutts',
  'Hero WOD',
  'ForTime',
  '10 Rounds For Time',
  '10 Burpees, 10 KB Swings, 10 Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Advanced',
  30,
  '10',
  '10/10/10',
  '32',
  'Leichtere KB / Ring Rows / weniger Runden',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Chuck',
  'Hero WOD',
  'ForTime',
  '3 Rounds For Time',
  'KB Swings, Pull-ups, Push-ups, Sit-ups, Air Squats',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21/15/9/21/21',
  '24',
  'Leichtere KB / Ring Rows / Knie-Push-ups',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Spehar',
  'Hero WOD',
  'ForTime',
  '5 Rounds For Time',
  'KB Swings, Burpees, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Advanced',
  20,
  '5',
  '9/15/9',
  '32',
  'Leichtere KB / Ring Rows / weniger Reps',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Core KB Circuit',
  'Core WOD',
  'ForTime',
  '4 Rounds For Time',
  'KB Russian Twists, KB Windmills, Hollow Holds, V-ups',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  15,
  '4',
  '20/10/20Sek/15',
  '16',
  'Leichtere KB / Tuck Hold',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull-up Core EMOM',
  'Core WOD',
  'EMOM',
  '10 Min EMOM',
  'Toes-to-Bar, L-Sit Hold',
  ARRAY['Pull-up Bar'],
  'Intermediate',
  10,
  '10',
  '7 T2B / 15 Sek L-Sit',
  NULL,
  'K2E / Tuck Hold',
  'Mehr Reps / längerer Hold',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Core Circuit',
  'Core WOD',
  'ForTime',
  '3 Rounds For Time',
  'DB Russian Twists, DB Plank Rows, DB Sit-ups',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  12,
  '3',
  '20/12/20',
  '10',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Filthy Fifty',
  'Other Benchmark',
  'ForTime',
  '50 Reps von 10 Übungen – KB Version',
  'KB Swings, Pull-ups, KB Goblet Squats, Lunges, Hanging Knee Raises, KB Push Press, Sit-ups, KB Deadlifts, Burpees, Jumping Jacks',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  30,
  NULL,
  '50 jede',
  '24',
  '25 Reps / leichtere KB / Ring Rows',
  '75 Reps / schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DB Fight Gone Bad',
  'Other Benchmark',
  'ForTime',
  '3 Rounds à 1 Min – DB Version',
  'DB Thrusters, Jumping Pull-ups, DB Step-ups, DB Push Press, Burpees',
  ARRAY['Dumbbell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  17,
  '3',
  'Max Reps je Station',
  '15',
  'Leichtere DB / weniger Runden',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Home Gym Open 1',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP – Home Gym Open Style',
  'KB Swings, Pull-ups, Burpees, DB Thrusters',
  ARRAY['Kettlebell','Dumbbell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  12,
  NULL,
  '10/5/10/8',
  '24/15',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Home Gym Open 2',
  'Home Gym',
  'ForTime',
  '21-15-9 – Home Gym Open Style',
  'DB Snatches, Pull-ups, KB Swings',
  ARRAY['Dumbbell','Kettlebell','Pull-up Bar'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  '22.5/24',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Home Gym Open 3',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP – Home Gym Style',
  'Wall Walks, KB Snatches, Burpees',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '3/10/15',
  '24',
  'Weniger Reps / leichtere KB',
  'Mehr Reps / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '20lb Vest Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – 20lb Vest',
  'Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  20,
  NULL,
  '5/10/15',
  '9',
  'Leichtere Weste / ohne Weste',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest Run & Pull',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – mit Weste',
  'Run 400m, Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  25,
  '5',
  '400m / 15 Pull-ups',
  '10',
  '200m / Ring Rows / ohne Weste',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Vest Barbara',
  'Home Gym',
  'ForTime',
  '5 Rounds mit Pause – mit Weste',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight','Gewichtsweste'],
  'Advanced',
  40,
  '5',
  '20/30/40/50 + 3 Min Pause',
  '10',
  'Ohne Weste / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Jackie Home',
  'Home Gym',
  'ForTime',
  'For Time – Home Version von Jackie',
  '200m Farmers Carry, DB Thrusters, Pull-ups',
  ARRAY['Dumbbell','Kettlebell','Pull-up Bar'],
  'Intermediate',
  15,
  NULL,
  '200m Carry / 45 Thrusters / 30 Pull-ups',
  '15',
  '100m / leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Chelsea Home',
  'Home Gym',
  'EMOM',
  '30 Min EMOM – Home Version',
  'Pull-ups, Push-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  30,
  '30',
  '5/10/15',
  NULL,
  '3/6/9 / Ring Rows / Knie-Push-ups',
  '7/14/21 / Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbara Home',
  'Home Gym',
  'ForTime',
  '5 Rounds mit Pause – Adaptiert',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  30,
  '5',
  '20/30/40/50 + 3 Min Pause',
  NULL,
  '15/20/30/40 / Ring Rows / Knie-Push-ups',
  '25/40/50/60 / Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Annie Home',
  'Home Gym',
  'ForTime',
  '50-40-30-20-10 – Home Version',
  'Jumping Jacks, Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  12,
  NULL,
  '50-40-30-20-10',
  NULL,
  'Singles / Knie-Sit-ups',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Mary Home',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – Home Version',
  'Pike Push-ups, Pistol Squats, Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '5/10/15',
  NULL,
  'Knie-Pike / Assisted Pistols / Ring Rows',
  'Deficit HSPU / echte Pistols / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Nancy Home',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – Home Version',
  'Run 400m, DB Overhead Squats',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  20,
  '5',
  '400m / 15 DB OHS',
  '15',
  '200m / leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Kelly Home',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – Home Version',
  'Run 400m, Tuck Jumps, DB Thrusters',
  ARRAY['Dumbbell','Bodyweight'],
  'Intermediate',
  25,
  '5',
  '400m / 30 Tucks / 20 Thrusters',
  '15',
  '200m / weniger Reps / leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Nicole Home',
  'Home Gym',
  'ForTime',
  '20 Min AMRAP + Max Pull-ups',
  'Run 400m, Max Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  'Max Reps',
  NULL,
  '200m / Ring Rows',
  'Gewichtsweste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Eva Home',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – Home Version',
  'Run 800m, KB Swings, Pull-ups',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Advanced',
  40,
  '5',
  '800m / 30 KB / 30 Pull-ups',
  '24',
  '400m / leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Grace Home',
  'Home Gym',
  'ForTime',
  '30 DB Clean & Jerks für Zeit',
  'DB Clean & Jerks alternierend',
  ARRAY['Dumbbell'],
  'Intermediate',
  10,
  NULL,
  '30',
  '22.5',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Isabel Home',
  'Home Gym',
  'ForTime',
  '30 DB Snatches alternierend für Zeit',
  'Alternating DB Snatches',
  ARRAY['Dumbbell'],
  'Intermediate',
  10,
  NULL,
  '30',
  '22.5',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Linda Home',
  'Home Gym',
  'ForTime',
  '10-9-8...1 – Home Version',
  'KB Deadlifts, DB Bench Alt, DB Cleans',
  ARRAY['Kettlebell','Dumbbell'],
  'Advanced',
  30,
  NULL,
  '10-1 Ladder',
  '32/15',
  'Leichtere Gewichte',
  'Schwerere Gewichte',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Diane Home',
  'Home Gym',
  'ForTime',
  '21-15-9 – Home Version',
  'KB Deadlifts, Pike Push-ups',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  10,
  '3',
  '21-15-9',
  '32',
  'Leichtere KB / Knie-Pike',
  'Schwerere KB / Deficit Pike',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Elizabeth Home',
  'Home Gym',
  'ForTime',
  '21-15-9 – Home Version',
  'KB Cleans, Dips',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  10,
  '3',
  '21-15-9',
  '24',
  'Leichtere KB / Box Dips',
  'Schwerere KB / Gewichtete Dips',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Amanda Home',
  'Home Gym',
  'ForTime',
  '9-7-5 – Home Version',
  'DB Squat Snatches, Pull-ups',
  ARRAY['Dumbbell','Pull-up Bar'],
  'Advanced',
  10,
  '3',
  '9-7-5',
  '22.5',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Breathing Ladder',
  'Home Gym',
  'ForTime',
  'Breathing Ladder – KB Swings',
  'KB Swings, Burpees',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '1 KB + 1 Burpee → 10 KB + 10 Burpees',
  '24',
  'Leichtere KB / weniger Runden',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull-up Breathing Ladder',
  'Home Gym',
  'ForTime',
  'Breathing Ladder – Pull-ups',
  'Pull-ups, Air Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  15,
  NULL,
  '1 Pull-up + 10 Squats → 10 + 10',
  NULL,
  'Ring Rows',
  'Gewichtete Pull-ups / Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Sprint EMOM',
  'Home Gym',
  'EMOM',
  'EMOM 8 Min – Sprint Intervalle',
  'KB Swings, Burpees',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  8,
  '8',
  '20 KB / 10 Burpees',
  '24',
  'Leichtere KB / weniger Reps',
  'Schwerere KB / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Posterior Chain',
  'Home Gym',
  'ForTime',
  '4 Rounds For Time – Posterior Chain',
  'KB Deadlifts, KB Swings, Good Mornings, Glute Bridges',
  ARRAY['Kettlebell','Bodyweight'],
  'Beginner',
  15,
  '4',
  '12/15/15/20',
  '24',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Upper Body EMOM',
  'Home Gym',
  'EMOM',
  '12 Min EMOM – Oberkörper',
  'Pull-ups, Push-ups, KB Press',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  12,
  '12',
  '5/10/8 rotierend',
  '16',
  'Ring Rows / Knie-Push-ups / leichtere KB',
  'C2B / Archer Push-ups / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Lower Body EMOM',
  'Home Gym',
  'EMOM',
  '12 Min EMOM – Unterkörper',
  'Air Squats, KB Goblet Squats, Lunges',
  ARRAY['Kettlebell','Bodyweight'],
  'Beginner',
  12,
  '12',
  '20/10/20 rotierend',
  '24',
  'Leichtere KB / weniger Reps',
  'Schwerere KB / Pistols',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Full Body EMOM 30',
  'Home Gym',
  'EMOM',
  '30 Min EMOM – 5 Stationen',
  'KB Swings, Pull-ups, Push-ups, Air Squats, Sit-ups',
  ARRAY['Kettlebell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  30,
  '30',
  '15/7/15/20/15 rotierend',
  '24',
  'Leichtere KB / Ring Rows / Knie-Push-ups / weniger Reps',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Home Hustle',
  'Home Gym',
  'ForTime',
  'For Time – Alles ausm Weg',
  'KB Swings, Pull-ups, DB Thrusters, Burpees, Sit-ups',
  ARRAY['Kettlebell','Dumbbell','Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  NULL,
  '30/20/15/20/30',
  '24/15',
  'Leichtere Gewichte / Ring Rows / weniger Reps',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'The Home Games',
  'Home Gym',
  'ForTime',
  '5 Events – Home Games',
  'KB Snatch Max, Pull-up Max, DB Thruster 21-15-9, Burpee 100, KB Swing 150',
  ARRAY['Kettlebell','Dumbbell','Pull-up Bar','Bodyweight'],
  'Advanced',
  40,
  '5',
  'Max/Max/21-15-9/100/150',
  '24/15',
  'Leichtere Gewichte / Ring Rows / weniger Reps',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Arnie',
  'Hero WOD',
  'ForTime',
  'Arnie - For Time',
  '21 Turkish Get-ups, 50 Pull-ups, 21 Thrusters, 50 Pull-ups, 21 OHS, 50 Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Brad',
  'Hero WOD',
  'ForTime',
  'Brad - For Time',
  '5 Rounds: 12 Front Squats, 21 Pull-ups, Run 400m',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bradshaw',
  'Hero WOD',
  'ForTime',
  'Bradshaw - For Time',
  '3 Rounds: 22 KB Swings, 22 Box Jumps, 22 Burpees, 22 Wall Balls, 22 DU, 10 Hang Squat Cleans',
  ARRAY['Barbell','Jump Rope'],
  'Advanced',
  35,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bull',
  'Hero WOD',
  'ForTime',
  'Bull - For Time',
  '21-15-9: Deadlift, Hang Power Clean, Front Squat, Push Jerk, Pull-ups, OHS',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Coe',
  'Hero WOD',
  'ForTime',
  'Coe - For Time',
  '3 Rounds: 15 L-Pull-ups, 30 KB Swings, 1 Mile Run',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Danny',
  'Hero WOD',
  'AMRAP',
  'Danny - AMRAP 20 Min',
  '20 Min AMRAP: 30 Box Jumps, 20 Push Press, 30 Pull-ups',
  ARRAY['Barbell','Box'],
  'Advanced',
  20,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Desforges',
  'Hero WOD',
  'ForTime',
  'Desforges - For Time',
  '5 Rounds: 7 Muscle-ups, 155lb Squat Clean, 11 Box Jumps',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Forrest',
  'Hero WOD',
  'ForTime',
  'Forrest - For Time',
  '20 L-Pull-ups, 30 Back Extensions, 20 L-Pull-ups, 30 Hip Ext, Run 800m, 21 Burpees',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Gator',
  'Hero WOD',
  'ForTime',
  'Gator - For Time',
  '5 Rounds: 10 Pull-ups, 10 Burpees, 10 KB Swings, Run 400m',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Glen',
  'Hero WOD',
  'ForTime',
  'Glen - For Time',
  '30 Clean & Jerks, 1 Mile Run, 10 Rope Climbs, 1 Mile Run, 100 Burpees',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  40,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Hollywood',
  'Hero WOD',
  'ForTime',
  'Hollywood - For Time',
  '5 Rounds: 5 Power Cleans, 10 Front Squats, 5 Jerks, 10 Box Jumps',
  ARRAY['Barbell','Box'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Jake',
  'Hero WOD',
  'ForTime',
  'Jake - For Time',
  '1 Mile Run, 100 Pull-ups, 200 Push-ups, 300 Air Squats, 1 Mile Run',
  ARRAY['Bodyweight'],
  'Advanced',
  35,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Jason',
  'Hero WOD',
  'ForTime',
  'Jason - For Time',
  '100 Squats, 5 Muscle-ups, 75 Squats, 10 Muscle-ups, 50 Squats, 15 Muscle-ups, 25 Squats, 20 Muscle-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Khan',
  'Hero WOD',
  'ForTime',
  'Khan - For Time',
  '5 Rounds: 15 Deadlifts, 15 Hang Power Cleans, 15 Front Squats, 15 Push Jerks',
  ARRAY['Barbell'],
  'Advanced',
  35,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Luce',
  'Hero WOD',
  'ForTime',
  'Luce - For Time',
  '5 Rounds: 12 Deadlifts, 9 Hang Power Cleans, 6 Push Jerks, 3 Bar Muscle-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Mac',
  'Hero WOD',
  'ForTime',
  'Mac - For Time',
  '4 Rounds: 400m Run, 25 OHS, 25 Sit-ups',
  ARRAY['Barbell','Bodyweight'],
  'Intermediate',
  25,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Manion',
  'Hero WOD',
  'ForTime',
  'Manion - For Time',
  '7 Rounds: 1 Mile Run, 29 Back Squats',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Michael',
  'Hero WOD',
  'ForTime',
  'Michael - For Time',
  '3 Rounds: 800m Run, 50 Back Ext, 50 Sit-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Moore',
  'Hero WOD',
  'ForTime',
  'Moore - For Time',
  '2 Rounds: 1 Mile Run, 100 Pull-ups, 200 Push-ups, 300 Air Squats',
  ARRAY['Pull-up Bar','Barbell'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Nick',
  'Hero WOD',
  'ForTime',
  'Nick - For Time',
  '6 Rounds: 10 Deadlifts, 10 Burpees, 10 Box Jumps, Run 400m',
  ARRAY['Barbell','Box'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Omar',
  'Hero WOD',
  'ForTime',
  'Omar - For Time',
  '10 Muscle-ups, 15 Push Press, 20 Box Jumps — 7 Rounds',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Patrick',
  'Hero WOD',
  'ForTime',
  'Patrick - For Time',
  '5 Rounds: 25 Chin-ups, 50 Push-ups, 50 Sit-ups, 50 Air Squats',
  ARRAY['Bodyweight'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pheezy',
  'Hero WOD',
  'ForTime',
  'Pheezy - For Time',
  '6 Rounds: 15 OHS, 15 Box Jumps, 15 Pull-ups, 15 Burpees',
  ARRAY['Barbell','Box'],
  'Advanced',
  35,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tosh',
  'Hero WOD',
  'ForTime',
  'Tosh - For Time',
  '5 Rounds: 20 DB Thrusters, 20 KB Swings, 20 Burpees',
  ARRAY['Barbell','Kettlebell'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tucker',
  'Hero WOD',
  'ForTime',
  'Tucker - For Time',
  '5 Rounds: 10 Deadlifts, 10 Ring Dips, 10 Pull-ups, 10 Sit-ups, Run 400m',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tyler',
  'Hero WOD',
  'ForTime',
  'Tyler - For Time',
  '5 Rounds: 7 Muscle-ups, 21 Burpees, 400m Run',
  ARRAY['Bodyweight'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Van Dam',
  'Hero WOD',
  'ForTime',
  'Van Dam - For Time',
  '4 Rounds: 400m Run, 25 Back Squats, 25 Push-ups',
  ARRAY['Barbell'],
  'Intermediate',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Wes',
  'Hero WOD',
  'ForTime',
  'Wes - For Time',
  '20 Min: 5 Power Cleans, 10 Toes-to-Bar, 15 Wall Balls — AMRAP',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Willy',
  'Hero WOD',
  'ForTime',
  'Willy - For Time',
  '5 Rounds: 15 KB Swings, 15 Sit-ups, 15 Box Jumps, Run 400m',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Rankel',
  'Hero WOD',
  'ForTime',
  'Rankel - For Time',
  '6 Rounds: 24 Air Squats, 24 Push-ups, 24 Walking Lunges, 12 Deadlifts, 12 Push Press, 12 Power Cleans',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Wittman',
  'Hero WOD',
  'ForTime',
  'Wittman - For Time',
  '7 Rounds: 15 Deadlifts, 15 Hang Power Cleans, 15 Push Jerks',
  ARRAY['Barbell'],
  'Advanced',
  35,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Holleyman',
  'Hero WOD',
  'ForTime',
  'Holleyman - For Time',
  '30 Rounds: 5 Wall Balls, 3 HSPU, 1 Power Clean',
  ARRAY['Barbell','Box'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Holbrook',
  'Hero WOD',
  'ForTime',
  'Holbrook - For Time',
  '10 Rounds: 3 Muscle-ups, 5 Power Cleans, 7 Kettlebell Swings',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  35,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Litzen',
  'Hero WOD',
  'ForTime',
  'Litzen - For Time',
  '1000m Row, 25 Squat Cleans, 50 Pull-ups, 25 Squat Cleans, 1000m Row',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Riggins',
  'Hero WOD',
  'ForTime',
  'Riggins - For Time',
  '5 Rounds: 10 OHS, 10 Deadlifts, 10 Lateral Burpees',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Payton',
  'Hero WOD',
  'ForTime',
  'Payton - For Time',
  '4 Rounds: 10 Deadlifts, 10 Hang Power Cleans, 10 Front Squats, 10 Push Jerks, 10 Box Jumps',
  ARRAY['Barbell','Box'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Kalsu',
  'Hero WOD',
  'ForTime',
  'Kalsu - For Time',
  'EMOM 100 Thrusters: 5 Burpees every min start',
  ARRAY['Barbell'],
  'Advanced',
  45,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Rahoi',
  'Hero WOD',
  'AMRAP',
  'Rahoi - AMRAP 12 Min',
  '12 Min AMRAP: 12 Box Jumps, 6 Thruster, 6 Bar-facing Burpees',
  ARRAY['Box','Barbell'],
  'Advanced',
  12,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Hammer',
  'Hero WOD',
  'ForTime',
  'Hammer - For Time',
  '5 Rounds: 5 Power Cleans, 10 Front Squats, 5 Push Jerks, 10 Pull-ups, 5 Power Cleans',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tisdale',
  'Hero WOD',
  'ForTime',
  'Tisdale - For Time',
  '5 Rounds: 11 Deadlifts, 2 Rope Climbs, 35 DU',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Wilson',
  'Hero WOD',
  'ForTime',
  'Wilson - For Time',
  '5 Rounds: 20 Pull-ups, 30 Push-ups, 40 Sit-ups, 50 Squats',
  ARRAY['Kettlebell','Pull-up Bar'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Ship',
  'Hero WOD',
  'ForTime',
  'Ship - For Time',
  '5 Rounds: 400m Run, 15 OHS, 20 Toes-to-Bar',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Hicks',
  'Hero WOD',
  'ForTime',
  'Hicks - For Time',
  '3 Rounds: 800m Run, 50 Deadlifts, 50 Box Jumps',
  ARRAY['Barbell','Box'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Brenton',
  'Hero WOD',
  'ForTime',
  'Brenton - For Time',
  '10 Rounds: 100m Sprint, 10 Push-ups, 10 Sit-ups, 10 Squats',
  ARRAY['Bodyweight'],
  'Advanced',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Taylor',
  'Hero WOD',
  'ForTime',
  'Taylor - For Time',
  '21 OHS, 42 Pull-ups, 15 OHS, 30 Pull-ups, 9 OHS, 18 Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Scott',
  'Hero WOD',
  'ForTime',
  'Scott - For Time',
  '5 Rounds: 400m Run, 10 Pull-ups, 25 Push-ups, 25 Air Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  25,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Strong',
  'Hero WOD',
  'ForTime',
  'Strong - For Time',
  '5 Rounds: 15 Deadlifts, 12 Hang Power Cleans, 9 Push Jerks, 6 Muscle-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  35,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Thompson',
  'Hero WOD',
  'ForTime',
  'Thompson - For Time',
  '150 Wall Balls — OHS, Squat Cleans, Thrusters, Back Squats in sets',
  ARRAY['Barbell'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Zimmerman',
  'Hero WOD',
  'ForTime',
  'Zimmerman - For Time',
  '11 Rounds: 3 Deadlifts, 6 Burpees, 9 Double-unders, 12 Air Squats',
  ARRAY['Barbell','Pull-up Bar','Box'],
  'Advanced',
  35,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Hotshots 19',
  'Hero WOD',
  'ForTime',
  'Hotshots 19 - For Time',
  '6 Rounds: 30 Air Squats, 19 Power Cleans, 7 Strict Pull-ups, 400m Run',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  40,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Lobo',
  'Hero WOD',
  'ForTime',
  'Lobo - For Time',
  '5 Rounds: 10 Power Cleans, 10 KB Swings, 10 Box Jumps, Run 400m',
  ARRAY['Barbell','Kettlebell'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Webb',
  'Hero WOD',
  'ForTime',
  'Webb - For Time',
  '5 Rounds: 7 Muscle-ups, 5 Squat Cleans, 10 Box Jumps',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sweeney',
  'Hero WOD',
  'ForTime',
  'Sweeney - For Time',
  '5 Rounds: 5 Back Squats, 10 Deadlifts, 5 Power Cleans, 10 Push Jerks',
  ARRAY['Barbell'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Gonzalez',
  'Hero WOD',
  'AMRAP',
  'Gonzalez - AMRAP 15 Min',
  '15 Min AMRAP: 5 Pull-ups, 10 Push-ups, 15 Air Squats — weighted vest',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  15,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Price',
  'Hero WOD',
  'ForTime',
  'Price - For Time',
  '4 Rounds: 400m Run, 25 KB Swings, 25 Push-ups',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Swing Squat',
  'EMOM',
  'EMOM',
  'EMOM KB Swing Squat - EMOM 10 Min',
  '10 KB Swings, 10 Air Squats',
  ARRAY['Kettlebell'],
  'Beginner',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Push Pull Squat',
  'EMOM',
  'EMOM',
  'EMOM Push Pull Squat - EMOM 12 Min',
  'Min 1: 10 Push-ups | Min 2: 10 Pull-ups | Min 3: 15 Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  12,
  '12',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Barbell Complex',
  'EMOM',
  'EMOM',
  'EMOM Barbell Complex - EMOM 10 Min',
  '3 Power Cleans + 3 Front Squats + 3 Push Jerks',
  ARRAY['Barbell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Deadlift Sprint',
  'EMOM',
  'EMOM',
  'EMOM Deadlift Sprint - EMOM 8 Min',
  '5 Deadlifts + 10 Cal Row',
  ARRAY['Barbell'],
  'Intermediate',
  8,
  '8',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Thruster Pull',
  'EMOM',
  'EMOM',
  'EMOM Thruster Pull - EMOM 10 Min',
  'Min 1: 7 Thrusters | Min 2: 7 Chest-to-Bar',
  ARRAY['Barbell','Pull-up Bar'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Clean Press',
  'EMOM',
  'EMOM',
  'EMOM KB Clean Press - EMOM 12 Min',
  '5 KB Clean & Press each arm',
  ARRAY['Kettlebell'],
  'Intermediate',
  12,
  '12',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Wall Ball Box',
  'EMOM',
  'EMOM',
  'EMOM Wall Ball Box - EMOM 10 Min',
  'Min 1: 15 Wall Balls | Min 2: 10 Box Jumps',
  ARRAY['Wall Ball','Box'],
  'Beginner',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Burpee Squat',
  'EMOM',
  'EMOM',
  'EMOM Burpee Squat - EMOM 8 Min',
  '5 Burpees + 10 Air Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM OHS Pull-up',
  'EMOM',
  'EMOM',
  'EMOM OHS Pull-up - EMOM 10 Min',
  'Min 1: 5 OHS | Min 2: 10 Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Snatch Balance',
  'EMOM',
  'EMOM',
  'EMOM Snatch Balance - EMOM 8 Min',
  '3 Snatch + 3 Overhead Squats',
  ARRAY['Barbell'],
  'Advanced',
  8,
  '8',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Row KB',
  'EMOM',
  'EMOM',
  'EMOM Row KB - EMOM 10 Min',
  'Min 1: 15 Cal Row | Min 2: 20 KB Swings',
  ARRAY['Rowing Machine','Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM T2B Push Press',
  'EMOM',
  'EMOM',
  'EMOM T2B Push Press - EMOM 12 Min',
  'Min 1: 8 T2B | Min 2: 8 Push Press',
  ARRAY['Barbell','Pull-up Bar'],
  'Intermediate',
  12,
  '12',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Double Under Squat',
  'EMOM',
  'EMOM',
  'EMOM Double Under Squat - EMOM 10 Min',
  '30 DU + 10 Air Squats',
  ARRAY['Jump Rope'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Cluster',
  'EMOM',
  'EMOM',
  'EMOM Cluster - EMOM 8 Min',
  '5 Clusters (Squat Clean Thruster)',
  ARRAY['Barbell'],
  'Advanced',
  8,
  '8',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Muscle-up Practice',
  'EMOM',
  'EMOM',
  'EMOM Muscle-up Practice - EMOM 10 Min',
  '3 Ring Muscle-ups',
  ARRAY['Rings'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Handstand Push-up',
  'EMOM',
  'EMOM',
  'EMOM Handstand Push-up - EMOM 8 Min',
  '5 HSPU + 10 Push-ups',
  ARRAY['Bodyweight'],
  'Advanced',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Snatch',
  'EMOM',
  'EMOM',
  'EMOM KB Snatch - EMOM 10 Min',
  '10 KB Snatches (5 each arm)',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Back Squat',
  'EMOM',
  'EMOM',
  'EMOM Back Squat - EMOM 10 Min',
  '5 Back Squats at 70%',
  ARRAY['Barbell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Clean Jerk',
  'EMOM',
  'EMOM',
  'EMOM Clean Jerk - EMOM 10 Min',
  '1 Clean & Jerk (heavy)',
  ARRAY['Barbell'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Row Burpee',
  'EMOM',
  'EMOM',
  'EMOM Row Burpee - EMOM 10 Min',
  'Min 1: 12 Cal Row | Min 2: 8 Burpees',
  ARRAY['Rowing Machine','Bodyweight'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Dumbbell Complex',
  'EMOM',
  'EMOM',
  'EMOM Dumbbell Complex - EMOM 12 Min',
  '6 DB Hang Power Cleans + 6 DB Push Press',
  ARRAY['Dumbbell'],
  'Intermediate',
  12,
  '12',
  '10-15 Reps/Min',
  '22.5/15',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Pull-up Push-up',
  'EMOM',
  'EMOM',
  'EMOM Pull-up Push-up - EMOM 10 Min',
  'Min 1: 8 Pull-ups | Min 2: 15 Push-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Beginner',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Squat Clean',
  'EMOM',
  'EMOM',
  'EMOM Squat Clean - EMOM 10 Min',
  '3 Squat Cleans',
  ARRAY['Barbell'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Goblet',
  'EMOM',
  'EMOM',
  'EMOM KB Goblet - EMOM 10 Min',
  '15 Goblet Squats + 10 KB Swings',
  ARRAY['Kettlebell'],
  'Beginner',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Bike Abs',
  'EMOM',
  'EMOM',
  'EMOM Bike Abs - EMOM 12 Min',
  'Min 1: 12 Cal Bike | Min 2: 15 Sit-ups',
  ARRAY['Assault Bike','Bodyweight'],
  'Intermediate',
  12,
  '12',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Deadlift HSPU',
  'EMOM',
  'EMOM',
  'EMOM Deadlift HSPU - EMOM 10 Min',
  'Min 1: 5 Deadlifts | Min 2: 5 HSPU',
  ARRAY['Barbell','Bodyweight'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Hang Power Clean',
  'EMOM',
  'EMOM',
  'EMOM Hang Power Clean - EMOM 10 Min',
  '5 Hang Power Cleans',
  ARRAY['Barbell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Jump Rope Squat',
  'EMOM',
  'EMOM',
  'EMOM Jump Rope Squat - EMOM 8 Min',
  '40 Singles + 15 Air Squats',
  ARRAY['Jump Rope'],
  'Beginner',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Power Snatch',
  'EMOM',
  'EMOM',
  'EMOM Power Snatch - EMOM 10 Min',
  '3 Power Snatches',
  ARRAY['Barbell'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Wall Ball Pull-up',
  'EMOM',
  'EMOM',
  'EMOM Wall Ball Pull-up - EMOM 10 Min',
  'Min 1: 15 Wall Balls | Min 2: 8 Pull-ups',
  ARRAY['Wall Ball','Pull-up Bar'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Turkish',
  'EMOM',
  'EMOM',
  'EMOM KB Turkish - EMOM 10 Min',
  '2 Turkish Get-ups (1 each side)',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Box Jump DU',
  'EMOM',
  'EMOM',
  'EMOM Box Jump DU - EMOM 10 Min',
  'Min 1: 10 Box Jumps | Min 2: 30 DU',
  ARRAY['Box','Jump Rope'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Front Squat',
  'EMOM',
  'EMOM',
  'EMOM Front Squat - EMOM 8 Min',
  '5 Front Squats at 70%',
  ARRAY['Barbell'],
  'Intermediate',
  8,
  '8',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Strict Pull Push',
  'EMOM',
  'EMOM',
  'EMOM Strict Pull Push - EMOM 10 Min',
  'Min 1: 5 Strict Pull-ups | Min 2: 10 Dips',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Row KB Sprint',
  'EMOM',
  'EMOM',
  'EMOM Row KB Sprint - EMOM 16 Min',
  'Min 1: 20 Cal Row | Min 2: 15 KB Swings | Min 3: 10 Burpees | Min 4: Rest',
  ARRAY['Rowing Machine','Kettlebell'],
  'Advanced',
  16,
  '16',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Snatch Grip DL',
  'EMOM',
  'EMOM',
  'EMOM Snatch Grip DL - EMOM 8 Min',
  '5 Snatch Grip Deadlifts',
  ARRAY['Barbell'],
  'Advanced',
  8,
  '8',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Jumping Lunge',
  'EMOM',
  'EMOM',
  'EMOM Jumping Lunge - EMOM 10 Min',
  '20 Jumping Lunges + 10 Push-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Press',
  'EMOM',
  'EMOM',
  'EMOM KB Press - EMOM 10 Min',
  '8 KB Strict Press each arm',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Thruster Row',
  'EMOM',
  'EMOM',
  'EMOM Thruster Row - EMOM 12 Min',
  'Min 1: 7 Thrusters | Min 2: 12 Cal Row',
  ARRAY['Barbell','Rowing Machine'],
  'Intermediate',
  12,
  '12',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Pistol Squat',
  'EMOM',
  'EMOM',
  'EMOM Pistol Squat - EMOM 10 Min',
  '5 Pistol Squats each leg',
  ARRAY['Bodyweight'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM DB Snatch',
  'EMOM',
  'EMOM',
  'EMOM DB Snatch - EMOM 10 Min',
  '10 DB Snatches (5 each arm)',
  ARRAY['Dumbbell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '22.5/15',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Clean Complex',
  'EMOM',
  'EMOM',
  'EMOM Clean Complex - EMOM 12 Min',
  '2 Hang Power Clean + 2 Power Clean + 2 Clean',
  ARRAY['Barbell'],
  'Advanced',
  12,
  '12',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM T2B KB',
  'EMOM',
  'EMOM',
  'EMOM T2B KB - EMOM 10 Min',
  'Min 1: 10 T2B | Min 2: 15 KB Swings',
  ARRAY['Pull-up Bar','Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Bike Row',
  'EMOM',
  'EMOM',
  'EMOM Bike Row - EMOM 14 Min',
  'Min 1-7: 10 Cal Bike | Min 8-14: 12 Cal Row',
  ARRAY['Assault Bike','Rowing Machine'],
  'Intermediate',
  14,
  '14',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Strict HSPU',
  'EMOM',
  'EMOM',
  'EMOM Strict HSPU - EMOM 8 Min',
  '5 Strict HSPU',
  ARRAY['Bodyweight'],
  'Advanced',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Plank Complex',
  'EMOM',
  'EMOM',
  'EMOM Plank Complex - EMOM 10 Min',
  '30s Plank + 10 Mountain Climbers',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Squat Snatch',
  'EMOM',
  'EMOM',
  'EMOM Squat Snatch - EMOM 10 Min',
  '2 Squat Snatches',
  ARRAY['Barbell'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Air Squat Sprint',
  'EMOM',
  'EMOM',
  'EMOM Air Squat Sprint - EMOM 8 Min',
  '20 Air Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM V-up KB',
  'EMOM',
  'EMOM',
  'EMOM V-up KB - EMOM 10 Min',
  'Min 1: 15 V-ups | Min 2: 20 KB Swings',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Lunge KB Press',
  'EMOM',
  'EMOM',
  'EMOM Lunge KB Press - EMOM 10 Min',
  '10 Walking Lunges + 8 KB Press',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Bike Burpee',
  'EMOM',
  'EMOM',
  'EMOM Bike Burpee - EMOM 12 Min',
  'Min 1: 10 Cal Bike | Min 2: 8 Burpees',
  ARRAY['Assault Bike','Bodyweight'],
  'Intermediate',
  12,
  '12',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Ring Row Push',
  'EMOM',
  'EMOM',
  'EMOM Ring Row Push - EMOM 10 Min',
  'Min 1: 10 Ring Rows | Min 2: 15 Push-ups',
  ARRAY['Rings','Bodyweight'],
  'Beginner',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Deadlift Row',
  'EMOM',
  'EMOM',
  'EMOM KB Deadlift Row - EMOM 10 Min',
  '10 KB Deadlifts + 10 KB Rows each side',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Jump Squat',
  'EMOM',
  'EMOM',
  'EMOM Jump Squat - EMOM 8 Min',
  '15 Jump Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Hang Snatch',
  'EMOM',
  'EMOM',
  'EMOM Hang Snatch - EMOM 10 Min',
  '3 Hang Snatches',
  ARRAY['Barbell'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM GHD Sit-up',
  'EMOM',
  'EMOM',
  'EMOM GHD Sit-up - EMOM 10 Min',
  '15 GHD Sit-ups',
  ARRAY['GHD Machine'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Back Extension',
  'EMOM',
  'EMOM',
  'EMOM Back Extension - EMOM 10 Min',
  '15 Back Extensions',
  ARRAY['GHD Machine'],
  'Beginner',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Windmill',
  'EMOM',
  'EMOM',
  'EMOM KB Windmill - EMOM 10 Min',
  '5 Windmills each side',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Sumo DL High Pull',
  'EMOM',
  'EMOM',
  'EMOM Sumo DL High Pull - EMOM 10 Min',
  '10 Sumo Deadlift High Pulls',
  ARRAY['Barbell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Box Step KB',
  'EMOM',
  'EMOM',
  'EMOM Box Step KB - EMOM 12 Min',
  'Min 1: 10 Box Step-ups | Min 2: 15 KB Swings',
  ARRAY['Box','Kettlebell'],
  'Beginner',
  12,
  '12',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Ring Push-up',
  'EMOM',
  'EMOM',
  'EMOM Ring Push-up - EMOM 8 Min',
  '15 Ring Push-ups',
  ARRAY['Rings'],
  'Intermediate',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Overhead Walk',
  'EMOM',
  'EMOM',
  'EMOM Overhead Walk - EMOM 10 Min',
  '20m Overhead Carry each arm',
  ARRAY['Barbell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Power Clean T2B',
  'EMOM',
  'EMOM',
  'EMOM Power Clean T2B - EMOM 10 Min',
  'Min 1: 5 Power Cleans | Min 2: 8 T2B',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Ski Row Bike',
  'EMOM',
  'EMOM',
  'EMOM Ski Row Bike - EMOM 15 Min',
  'Min 1: 15 Cal Ski | Min 2: 15 Cal Row | Min 3: 15 Cal Bike',
  ARRAY['Ski Erg','Rowing Machine','Assault Bike'],
  'Intermediate',
  15,
  '15',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Dip Lunge',
  'EMOM',
  'EMOM',
  'EMOM Dip Lunge - EMOM 10 Min',
  'Min 1: 10 Dips | Min 2: 20 Lunges',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Beginner',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Bear Complex',
  'EMOM',
  'EMOM',
  'EMOM Bear Complex - EMOM 7 Min',
  '1 Bear Complex (PC + FS + PP + BS + PP)',
  ARRAY['Barbell'],
  'Advanced',
  7,
  '7',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Flow',
  'EMOM',
  'EMOM',
  'EMOM KB Flow - EMOM 10 Min',
  '5 KB Clean + 5 KB Press + 5 KB Squat (each arm)',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Hollow Body',
  'EMOM',
  'EMOM',
  'EMOM Hollow Body - EMOM 8 Min',
  '30s Hollow Body Hold',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Broad Jump Burpee',
  'EMOM',
  'EMOM',
  'EMOM Broad Jump Burpee - EMOM 8 Min',
  '5 Broad Jumps + 5 Burpees',
  ARRAY['Bodyweight'],
  'Intermediate',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Sandbag Clean',
  'EMOM',
  'EMOM',
  'EMOM Sandbag Clean - EMOM 10 Min',
  '5 Sandbag Cleans + 5 Shoulder-to-OH',
  ARRAY['Sandbag'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Farmers Carry',
  'EMOM',
  'EMOM',
  'EMOM KB Farmers Carry - EMOM 10 Min',
  '40m KB Farmers Carry + 10 KB Swings',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Push Jerk',
  'EMOM',
  'EMOM',
  'EMOM Push Jerk - EMOM 8 Min',
  '5 Push Jerks at 70%',
  ARRAY['Barbell'],
  'Intermediate',
  8,
  '8',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Assault Row Sit',
  'EMOM',
  'EMOM',
  'EMOM Assault Row Sit - EMOM 12 Min',
  '4 Rounds: 10 Cal Bike, 10 Cal Row, 10 Sit-ups',
  ARRAY['Assault Bike','Rowing Machine','Bodyweight'],
  'Intermediate',
  12,
  '12',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Deficit Push-up',
  'EMOM',
  'EMOM',
  'EMOM Deficit Push-up - EMOM 8 Min',
  '10 Deficit Push-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Pause Squat',
  'EMOM',
  'EMOM',
  'EMOM Pause Squat - EMOM 8 Min',
  '3 Pause Back Squats (3s hold)',
  ARRAY['Barbell'],
  'Intermediate',
  8,
  '8',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Complex 3',
  'EMOM',
  'EMOM',
  'EMOM KB Complex 3 - EMOM 10 Min',
  '5 KB Swings + 5 KB Cleans + 5 KB Press (each arm)',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Bike Sprint',
  'EMOM',
  'EMOM',
  'EMOM Bike Sprint - EMOM 10 Min',
  '10 Cal Assault Bike sprint',
  ARRAY['Assault Bike'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM T2B DU',
  'EMOM',
  'EMOM',
  'EMOM T2B DU - EMOM 10 Min',
  'Min 1: 10 T2B | Min 2: 30 DU',
  ARRAY['Pull-up Bar','Jump Rope'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Hang Clean',
  'EMOM',
  'EMOM',
  'EMOM Hang Clean - EMOM 10 Min',
  '3 Hang Squat Cleans',
  ARRAY['Barbell'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Wall Sit KB',
  'EMOM',
  'EMOM',
  'EMOM Wall Sit KB - EMOM 8 Min',
  '30s Wall Sit + 10 KB Swings',
  ARRAY['Kettlebell','Bodyweight'],
  'Beginner',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Ring Muscle-up Dip',
  'EMOM',
  'EMOM',
  'EMOM Ring Muscle-up Dip - EMOM 10 Min',
  'Min 1: 3 Ring Muscle-ups | Min 2: 10 Ring Dips',
  ARRAY['Rings'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Bar Muscle-up',
  'EMOM',
  'EMOM',
  'EMOM Bar Muscle-up - EMOM 8 Min',
  '3 Bar Muscle-ups',
  ARRAY['Pull-up Bar'],
  'Advanced',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Halo',
  'EMOM',
  'EMOM',
  'EMOM KB Halo - EMOM 8 Min',
  '8 KB Halos + 10 KB Swings',
  ARRAY['Kettlebell'],
  'Beginner',
  8,
  '8',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Thruster Complex',
  'EMOM',
  'EMOM',
  'EMOM Thruster Complex - EMOM 10 Min',
  '3 Thrusters (heavy)',
  ARRAY['Barbell'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Push-up Squat Run',
  'EMOM',
  'EMOM',
  'EMOM Push-up Squat Run - EMOM 12 Min',
  'Min 1: 15 Push-ups | Min 2: 20 Squats | Min 3: 200m Run',
  ARRAY['Bodyweight'],
  'Intermediate',
  12,
  '12',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Ski Burpee',
  'EMOM',
  'EMOM',
  'EMOM Ski Burpee - EMOM 10 Min',
  'Min 1: 15 Cal Ski | Min 2: 8 Burpees',
  ARRAY['Ski Erg','Bodyweight'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM RDL Row',
  'EMOM',
  'EMOM',
  'EMOM RDL Row - EMOM 10 Min',
  '8 Romanian Deadlifts + 8 Bent-over Rows',
  ARRAY['Barbell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Seated Press',
  'EMOM',
  'EMOM',
  'EMOM Seated Press - EMOM 8 Min',
  '10 Seated DB Press',
  ARRAY['Dumbbell'],
  'Intermediate',
  8,
  '8',
  '10-15 Reps/Min',
  '22.5/15',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM DU Sit-up',
  'EMOM',
  'EMOM',
  'EMOM DU Sit-up - EMOM 10 Min',
  'Min 1: 30 DU | Min 2: 20 Sit-ups',
  ARRAY['Jump Rope','Bodyweight'],
  'Beginner',
  10,
  '10',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Step-up Press',
  'EMOM',
  'EMOM',
  'EMOM Step-up Press - EMOM 10 Min',
  '10 Box Step-ups + 10 DB Press',
  ARRAY['Box','Dumbbell'],
  'Beginner',
  10,
  '10',
  '10-15 Reps/Min',
  '22.5/15',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Jerk Drive',
  'EMOM',
  'EMOM',
  'EMOM Jerk Drive - EMOM 8 Min',
  '3 Split Jerks',
  ARRAY['Barbell'],
  'Advanced',
  8,
  '8',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Hip Thrust',
  'EMOM',
  'EMOM',
  'EMOM Hip Thrust - EMOM 8 Min',
  '10 Hip Thrusts',
  ARRAY['Barbell','Bodyweight'],
  'Beginner',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM KB Single Leg',
  'EMOM',
  'EMOM',
  'EMOM KB Single Leg - EMOM 10 Min',
  '8 Single-leg KB Deadlifts each leg',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '10',
  '10-15 Reps/Min',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Assault Bike Max',
  'EMOM',
  'EMOM',
  'EMOM Assault Bike Max - EMOM 5 Min',
  'Max Cal Assault Bike each minute',
  ARRAY['Assault Bike'],
  'Advanced',
  5,
  '5',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Overhead Squat',
  'EMOM',
  'EMOM',
  'EMOM Overhead Squat - EMOM 10 Min',
  '5 Overhead Squats',
  ARRAY['Barbell'],
  'Advanced',
  10,
  '10',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Push-up Plank',
  'EMOM',
  'EMOM',
  'EMOM Push-up Plank - EMOM 8 Min',
  '10 Push-ups + 20s Plank Hold',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Box Burpee KB',
  'EMOM',
  'EMOM',
  'EMOM Box Burpee KB - EMOM 12 Min',
  'Min 1: 8 Box Jumps | Min 2: 15 KB Swings | Min 3: 5 Burpees',
  ARRAY['Box','Kettlebell','Bodyweight'],
  'Intermediate',
  12,
  '12',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'EMOM Banded Pull-apart',
  'EMOM',
  'EMOM',
  'EMOM Banded Pull-apart - EMOM 8 Min',
  '15 Band Pull-aparts + 10 OH Band Press',
  ARRAY['Resistance Band'],
  'Beginner',
  8,
  '8',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Air Squat',
  'Tabata',
  'Tabata',
  'Tabata Air Squat - Tabata (20s on / 10s off)',
  'Air Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Push-up',
  'Tabata',
  'Tabata',
  'Tabata Push-up - Tabata (20s on / 10s off)',
  'Push-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Burpee',
  'Tabata',
  'Tabata',
  'Tabata Burpee - Tabata (20s on / 10s off)',
  'Burpees',
  ARRAY['Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata KB Swing',
  'Tabata',
  'Tabata',
  'Tabata KB Swing - Tabata (20s on / 10s off)',
  'KB Swings',
  ARRAY['Kettlebell'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Sit-up',
  'Tabata',
  'Tabata',
  'Tabata Sit-up - Tabata (20s on / 10s off)',
  'Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Row',
  'Tabata',
  'Tabata',
  'Tabata Row - Tabata (20s on / 10s off)',
  'Row (Cals)',
  ARRAY['Rowing Machine'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Wall Ball',
  'Tabata',
  'Tabata',
  'Tabata Wall Ball - Tabata (20s on / 10s off)',
  'Wall Balls',
  ARRAY['Wall Ball'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Box Jump',
  'Tabata',
  'Tabata',
  'Tabata Box Jump - Tabata (20s on / 10s off)',
  'Box Jumps',
  ARRAY['Box'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Double Under',
  'Tabata',
  'Tabata',
  'Tabata Double Under - Tabata (20s on / 10s off)',
  'Double Unders',
  ARRAY['Jump Rope'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Thruster',
  'Tabata',
  'Tabata',
  'Tabata Thruster - Tabata (20s on / 10s off)',
  'Thrusters',
  ARRAY['Barbell'],
  'Advanced',
  4,
  '8',
  '20s on / 10s off',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Pull-up',
  'Tabata',
  'Tabata',
  'Tabata Pull-up - Tabata (20s on / 10s off)',
  'Pull-ups',
  ARRAY['Pull-up Bar'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Ring Row',
  'Tabata',
  'Tabata',
  'Tabata Ring Row - Tabata (20s on / 10s off)',
  'Ring Rows',
  ARRAY['Rings'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Mountain Climber',
  'Tabata',
  'Tabata',
  'Tabata Mountain Climber - Tabata (20s on / 10s off)',
  'Mountain Climbers',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Lunge',
  'Tabata',
  'Tabata',
  'Tabata Lunge - Tabata (20s on / 10s off)',
  'Alternating Lunges',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Jumping Lunge',
  'Tabata',
  'Tabata',
  'Tabata Jumping Lunge - Tabata (20s on / 10s off)',
  'Jumping Lunges',
  ARRAY['Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata KB Goblet Squat',
  'Tabata',
  'Tabata',
  'Tabata KB Goblet Squat - Tabata (20s on / 10s off)',
  'KB Goblet Squats',
  ARRAY['Kettlebell'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata DB Snatch',
  'Tabata',
  'Tabata',
  'Tabata DB Snatch - Tabata (20s on / 10s off)',
  'DB Snatches (alternating)',
  ARRAY['Dumbbell'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  '22.5/15',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Assault Bike',
  'Tabata',
  'Tabata',
  'Tabata Assault Bike - Tabata (20s on / 10s off)',
  'Max Cal Assault Bike',
  ARRAY['Assault Bike'],
  'Advanced',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata V-up',
  'Tabata',
  'Tabata',
  'Tabata V-up - Tabata (20s on / 10s off)',
  'V-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata T2B',
  'Tabata',
  'Tabata',
  'Tabata T2B - Tabata (20s on / 10s off)',
  'Toes-to-Bar',
  ARRAY['Pull-up Bar'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata HSPU',
  'Tabata',
  'Tabata',
  'Tabata HSPU - Tabata (20s on / 10s off)',
  'Handstand Push-ups',
  ARRAY['Bodyweight'],
  'Advanced',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Ring Dip',
  'Tabata',
  'Tabata',
  'Tabata Ring Dip - Tabata (20s on / 10s off)',
  'Ring Dips',
  ARRAY['Rings'],
  'Advanced',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Hollow Rock',
  'Tabata',
  'Tabata',
  'Tabata Hollow Rock - Tabata (20s on / 10s off)',
  'Hollow Rocks',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Push-up Squat',
  'Tabata',
  'Tabata',
  'Tabata Push-up Squat - Tabata (20s on / 10s off)',
  'Push-up + Air Squat combo',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata KB Snatch',
  'Tabata',
  'Tabata',
  'Tabata KB Snatch - Tabata (20s on / 10s off)',
  'KB Snatches (alternating arms)',
  ARRAY['Kettlebell'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Jump Squat',
  'Tabata',
  'Tabata',
  'Tabata Jump Squat - Tabata (20s on / 10s off)',
  'Jump Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Dip',
  'Tabata',
  'Tabata',
  'Tabata Dip - Tabata (20s on / 10s off)',
  'Bar Dips',
  ARRAY['Pull-up Bar'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Wall Sit',
  'Tabata',
  'Tabata',
  'Tabata Wall Sit - Tabata (20s on / 10s off)',
  'Wall Sit hold',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Broad Jump',
  'Tabata',
  'Tabata',
  'Tabata Broad Jump - Tabata (20s on / 10s off)',
  'Broad Jumps',
  ARRAY['Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Ski Erg',
  'Tabata',
  'Tabata',
  'Tabata Ski Erg - Tabata (20s on / 10s off)',
  'Ski Erg Max Cals',
  ARRAY['Ski Erg'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Plank',
  'Tabata',
  'Tabata',
  'Tabata Plank - Tabata (20s on / 10s off)',
  'Plank Hold',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Superman',
  'Tabata',
  'Tabata',
  'Tabata Superman - Tabata (20s on / 10s off)',
  'Superman Hold / Back Extensions',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Glute Bridge',
  'Tabata',
  'Tabata',
  'Tabata Glute Bridge - Tabata (20s on / 10s off)',
  'Glute Bridge',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata High Knees',
  'Tabata',
  'Tabata',
  'Tabata High Knees - Tabata (20s on / 10s off)',
  'High Knees',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Push-up Burpee',
  'Tabata',
  'Tabata',
  'Tabata Push-up Burpee - Tabata (20s on / 10s off)',
  'Push-up + Burpee (alt)',
  ARRAY['Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Squat Jump Sit-up',
  'Tabata',
  'Tabata',
  'Tabata Squat Jump Sit-up - Tabata (20s on / 10s off)',
  'Alt: Jump Squats & Sit-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata DB Thruster',
  'Tabata',
  'Tabata',
  'Tabata DB Thruster - Tabata (20s on / 10s off)',
  'DB Thrusters',
  ARRAY['Dumbbell'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  '22.5/15',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata KB Deadlift',
  'Tabata',
  'Tabata',
  'Tabata KB Deadlift - Tabata (20s on / 10s off)',
  'KB Deadlifts',
  ARRAY['Kettlebell'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Ring Push-up',
  'Tabata',
  'Tabata',
  'Tabata Ring Push-up - Tabata (20s on / 10s off)',
  'Ring Push-ups',
  ARRAY['Rings'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Box Step-up',
  'Tabata',
  'Tabata',
  'Tabata Box Step-up - Tabata (20s on / 10s off)',
  'Box Step-ups',
  ARRAY['Box'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Power Clean',
  'Tabata',
  'Tabata',
  'Tabata Power Clean - Tabata (20s on / 10s off)',
  'Power Cleans (light)',
  ARRAY['Barbell'],
  'Advanced',
  4,
  '8',
  '20s on / 10s off',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Strict Press',
  'Tabata',
  'Tabata',
  'Tabata Strict Press - Tabata (20s on / 10s off)',
  'Strict Press (light)',
  ARRAY['Barbell'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Hang Power Clean',
  'Tabata',
  'Tabata',
  'Tabata Hang Power Clean - Tabata (20s on / 10s off)',
  'Hang Power Cleans',
  ARRAY['Barbell'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata DU Squat',
  'Tabata',
  'Tabata',
  'Tabata DU Squat - Tabata (20s on / 10s off)',
  '20s DU / 10s Air Squat',
  ARRAY['Jump Rope'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata KB Row',
  'Tabata',
  'Tabata',
  'Tabata KB Row - Tabata (20s on / 10s off)',
  'KB Bent-over Rows',
  ARRAY['Kettlebell'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Jumping Jack',
  'Tabata',
  'Tabata',
  'Tabata Jumping Jack - Tabata (20s on / 10s off)',
  'Jumping Jacks',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Sprint',
  'Tabata',
  'Tabata',
  'Tabata Sprint - Tabata (20s on / 10s off)',
  '20s Sprint / 10s Rest',
  ARRAY['Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Deadlift',
  'Tabata',
  'Tabata',
  'Tabata Deadlift - Tabata (20s on / 10s off)',
  'Deadlifts (moderate weight)',
  ARRAY['Barbell'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Push-up Pull-up',
  'Tabata',
  'Tabata',
  'Tabata Push-up Pull-up - Tabata (20s on / 10s off)',
  'Alt: Push-ups / Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Step-up Burpee',
  'Tabata',
  'Tabata',
  'Tabata Step-up Burpee - Tabata (20s on / 10s off)',
  'Alt: Box Step-ups / Burpees',
  ARRAY['Box','Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata KB Press Row',
  'Tabata',
  'Tabata',
  'Tabata KB Press Row - Tabata (20s on / 10s off)',
  'Alt: KB Press / KB Row',
  ARRAY['Kettlebell'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Squat Jump Pull',
  'Tabata',
  'Tabata',
  'Tabata Squat Jump Pull - Tabata (20s on / 10s off)',
  'Alt: Jump Squats / Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Full Body 1',
  'Tabata',
  'Tabata',
  'Tabata Full Body 1 - Tabata (20s on / 10s off)',
  '4 Exercises: Squats, Push-ups, Sit-ups, Burpees — 2 rounds each',
  ARRAY['Bodyweight'],
  'Intermediate',
  16,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Full Body 2',
  'Tabata',
  'Tabata',
  'Tabata Full Body 2 - Tabata (20s on / 10s off)',
  '4 Exercises: Thrusters, Pull-ups, Deadlifts, Burpees',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  16,
  '8',
  '20s on / 10s off',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata KB Full',
  'Tabata',
  'Tabata',
  'Tabata KB Full - Tabata (20s on / 10s off)',
  '3 Exercises: KB Swings, KB Goblet Squat, KB Push Press',
  ARRAY['Kettlebell'],
  'Intermediate',
  12,
  '8',
  '20s on / 10s off',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Cardio Blast',
  'Tabata',
  'Tabata',
  'Tabata Cardio Blast - Tabata (20s on / 10s off)',
  'Alt: Burpees / Mountain Climbers',
  ARRAY['Bodyweight'],
  'Intermediate',
  8,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Core 1',
  'Tabata',
  'Tabata',
  'Tabata Core 1 - Tabata (20s on / 10s off)',
  'Alt: Sit-ups / Hollow Rocks',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Core 2',
  'Tabata',
  'Tabata',
  'Tabata Core 2 - Tabata (20s on / 10s off)',
  'Alt: V-ups / Plank',
  ARRAY['Bodyweight'],
  'Intermediate',
  8,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Legs 1',
  'Tabata',
  'Tabata',
  'Tabata Legs 1 - Tabata (20s on / 10s off)',
  'Alt: Air Squats / Lunges',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Legs 2',
  'Tabata',
  'Tabata',
  'Tabata Legs 2 - Tabata (20s on / 10s off)',
  'Alt: Jump Squats / Jumping Lunges',
  ARRAY['Bodyweight'],
  'Intermediate',
  8,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Upper Body',
  'Tabata',
  'Tabata',
  'Tabata Upper Body - Tabata (20s on / 10s off)',
  'Alt: Push-ups / Ring Rows',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  8,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Bike Row',
  'Tabata',
  'Tabata',
  'Tabata Bike Row - Tabata (20s on / 10s off)',
  'Alt: Max Cal Bike / Max Cal Row',
  ARRAY['Assault Bike','Rowing Machine'],
  'Advanced',
  8,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Snatch Squat',
  'Tabata',
  'Tabata',
  'Tabata Snatch Squat - Tabata (20s on / 10s off)',
  'Power Snatch + OHS combo',
  ARRAY['Barbell'],
  'Advanced',
  4,
  '8',
  '20s on / 10s off',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Bear Crawl',
  'Tabata',
  'Tabata',
  'Tabata Bear Crawl - Tabata (20s on / 10s off)',
  'Bear Crawl 20m / Rest',
  ARRAY['Bodyweight'],
  'Beginner',
  4,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push Pull 21-15-9',
  'HomeWOD',
  'ForTime',
  'Push Pull 21-15-9 - For Time',
  '21-15-9: Pull-ups, Push-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight 100s',
  'HomeWOD',
  'ForTime',
  'Bodyweight 100s - For Time',
  '100 Pull-ups, 100 Push-ups, 100 Sit-ups, 100 Squats — partition as needed',
  ARRAY['Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Squat 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Squat 10 - AMRAP 10 Min',
  '10 Min AMRAP: 10 Burpees, 20 Air Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Push Lunge 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Push Lunge 12 - AMRAP 12 Min',
  '12 Min AMRAP: 12 Push-ups, 12 Lunges each leg',
  ARRAY['Bodyweight'],
  'Beginner',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Chipper 50-40-30-20-10',
  'HomeWOD',
  'ForTime',
  'Chipper 50-40-30-20-10 - For Time',
  '50 Jumping Jacks, 40 Sit-ups, 30 Squats, 20 Push-ups, 10 Burpees',
  ARRAY['Bodyweight'],
  'Intermediate',
  25,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Sit Squat Lunge 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Sit Squat Lunge 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Sit-ups, 15 Squats, 15 Lunges',
  ARRAY['Bodyweight'],
  'Beginner',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '10 Rounds Push Squat',
  'HomeWOD',
  'ForTime',
  '10 Rounds Push Squat - For Time',
  '10 Rounds: 10 Push-ups, 10 Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Pull 8',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Pull 8 - AMRAP 8 Min',
  '8 Min AMRAP: 5 Burpees, 5 Pull-ups',
  ARRAY['Pull-up Bar'],
  'Intermediate',
  8,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Death by Push-up',
  'HomeWOD',
  'EMOM',
  'Death by Push-up - EMOM 20 Min',
  'Min 1: 1 Push-up, min 2: 2, continue until failure',
  ARRAY['Bodyweight'],
  'Intermediate',
  20,
  '20',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Mountain Climber Squat 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Mountain Climber Squat 10 - AMRAP 10 Min',
  '10 Min AMRAP: 20 Mountain Climbers, 15 Air Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Ladder 1-10',
  'HomeWOD',
  'ForTime',
  'Bodyweight Ladder 1-10 - For Time',
  '1-10 Ladder: Push-ups + Sit-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP V-up Push Burpee 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP V-up Push Burpee 12 - AMRAP 12 Min',
  '12 Min AMRAP: 10 V-ups, 10 Push-ups, 5 Burpees',
  ARRAY['Bodyweight'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sprint Squat 8 Rounds',
  'HomeWOD',
  'ForTime',
  'Sprint Squat 8 Rounds - For Time',
  '8 Rounds: 200m Sprint, 20 Air Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Lunge Sit Jump 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Lunge Sit Jump 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 Lunges, 20 Sit-ups, 20 Jump Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Cindy',
  'HomeWOD',
  'AMRAP',
  'Bodyweight Cindy - AMRAP 20 Min',
  '20 Min AMRAP: 5 Pull-ups, 10 Push-ups, 15 Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push Sit Run Chipper',
  'HomeWOD',
  'ForTime',
  'Push Sit Run Chipper - For Time',
  '100 Push-ups, 100 Sit-ups, 1 Mile Run',
  ARRAY['Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Jump 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Jump 15 - AMRAP 15 Min',
  '15 Min AMRAP: 8 Burpees, 12 Jump Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Full Body Ladder 5-10-15',
  'HomeWOD',
  'ForTime',
  'Full Body Ladder 5-10-15 - For Time',
  '5 Rounds: 5 Pull-ups, 10 Push-ups, 15 Squats, 20 Sit-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  18,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP HC Plank Push 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Plank Push 10 - AMRAP 10 Min',
  '10 Min AMRAP: 20 HC, 30s Plank, 10 Push-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight 300',
  'HomeWOD',
  'ForTime',
  'Bodyweight 300 - For Time',
  '25 Pull-ups, 50 DL, 50 Push-ups, 50 Box Jumps, 50 Floor Wipers, 50 Clean & Press, 25 Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Sit Squat 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Sit Squat 20 - AMRAP 20 Min',
  '20 Min AMRAP: 5 Burpees, 10 Sit-ups, 15 Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '10 Rounds Pull Push Sit',
  'HomeWOD',
  'ForTime',
  '10 Rounds Pull Push Sit - For Time',
  '10 Rounds: 5 Pull-ups, 10 Push-ups, 15 Sit-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Jump Lunge V-up 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Jump Lunge V-up 12 - AMRAP 12 Min',
  '12 Min AMRAP: 15 Jump Squats, 15 Lunges, 10 V-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Tabata Something Bodyweight',
  'HomeWOD',
  'Tabata',
  'Tabata Something Bodyweight - Tabata (20s on / 10s off)',
  '4 Exercises Tabata: Squats, Push-ups, Sit-ups, Burpees',
  ARRAY['Bodyweight'],
  'Intermediate',
  16,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push-up Pyramid 1-10-1',
  'HomeWOD',
  'ForTime',
  'Push-up Pyramid 1-10-1 - For Time',
  'Pyramid up and down: 1-2-3...10-9...1 Push-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Climb Push Squat 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Climb Push Squat 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Mountain Climbers, 10 Push-ups, 20 Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sprint Lunge Push 6 Rounds',
  'HomeWOD',
  'ForTime',
  'Sprint Lunge Push 6 Rounds - For Time',
  '6 Rounds: 200m Sprint, 15 Lunges, 15 Push-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee HC V-up 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee HC V-up 10 - AMRAP 10 Min',
  '10 Min AMRAP: 8 Burpees, 20 HC, 10 V-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Double Push Squat 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Double Push Squat 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 Push-ups, 30 Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '100 Burpee Challenge',
  'HomeWOD',
  'ForTime',
  '100 Burpee Challenge - For Time',
  '100 Burpees for time',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Sit Lunge Push 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Sit Lunge Push 12 - AMRAP 12 Min',
  '12 Min AMRAP: 12 Sit-ups, 12 Lunges, 12 Push-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Tabata 4x',
  'HomeWOD',
  'Tabata',
  'Bodyweight Tabata 4x - Tabata (20s on / 10s off)',
  'Tabata: Push-ups / Squats / Sit-ups / Burpees',
  ARRAY['Bodyweight'],
  'Beginner',
  16,
  '8',
  '20s on / 10s off',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '8 Rounds Sprint Squat Sit',
  'HomeWOD',
  'ForTime',
  '8 Rounds Sprint Squat Sit - For Time',
  '8 Rounds: 100m Sprint, 15 Squats, 15 Sit-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  16,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Pull Jump 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Pull Jump 15 - AMRAP 15 Min',
  '15 Min AMRAP: 5 Burpees, 5 Pull-ups, 10 Jump Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push-up Sit-up 21-15-9',
  'HomeWOD',
  'ForTime',
  'Push-up Sit-up 21-15-9 - For Time',
  '21-15-9: Push-ups, Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '1',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP HC Squat Lunge 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Squat Lunge 10 - AMRAP 10 Min',
  '10 Min AMRAP: 20 HC, 20 Squats, 20 Lunges',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Box Jump Burpee Sit 5 Rounds',
  'HomeWOD',
  'ForTime',
  'Box Jump Burpee Sit 5 Rounds - For Time',
  '5 Rounds: 15 Box Jumps, 10 Burpees, 20 Sit-ups',
  ARRAY['Box','Bodyweight'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Pull Push Sit Squat 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Pull Push Sit Squat 20 - AMRAP 20 Min',
  '20 Min AMRAP: 5 Pull-ups, 10 Push-ups, 15 Sit-ups, 20 Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Hurricane',
  'HomeWOD',
  'ForTime',
  'Bodyweight Hurricane - For Time',
  '3 Rounds: 400m Sprint, 20 Burpees, 30 Push-ups, 40 Sit-ups, 50 Squats',
  ARRAY['Bodyweight'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Plank Push V 8',
  'HomeWOD',
  'AMRAP',
  'AMRAP Plank Push V 8 - AMRAP 8 Min',
  '8 Min AMRAP: 30s Plank, 10 Push-ups, 10 V-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '10x10 Push Pull',
  'HomeWOD',
  'ForTime',
  '10x10 Push Pull - For Time',
  '10 Sets of 10 Push-ups + 10 Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  18,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Jump HC Squat 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Jump HC Squat 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Jump Squats, 20 HC, 15 Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '5x5 Sprint Burpee',
  'HomeWOD',
  'ForTime',
  '5x5 Sprint Burpee - For Time',
  '5 Rounds: 100m Sprint, 5 Burpees, 5 Burpees again',
  ARRAY['Bodyweight'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Lunge Push Jump 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Lunge Push Jump 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 Lunges, 15 Push-ups, 15 Jump Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Jump Sit 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Jump Sit 10 - AMRAP 10 Min',
  '10 Min AMRAP: 5 Burpees, 10 Jump Squats, 15 Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push Squat Run 4 Miles',
  'HomeWOD',
  'ForTime',
  'Push Squat Run 4 Miles - For Time',
  '1 Mile Run, 100 Push-ups, 1 Mile Run, 100 Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  35,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP HC Lunge Jump 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Lunge Jump 12 - AMRAP 12 Min',
  '12 Min AMRAP: 20 HC, 20 Lunges, 20 Jump Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Death by Burpee',
  'HomeWOD',
  'EMOM',
  'Death by Burpee - EMOM 15 Min',
  'Min 1: 1 Burpee, min 2: 2, continue until failure',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '15',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Push Pull Squat 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Push Pull Squat 20 - AMRAP 20 Min',
  '20 Min AMRAP: 10 Push-ups, 5 Pull-ups, 20 Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Pyramid Full',
  'HomeWOD',
  'ForTime',
  'Bodyweight Pyramid Full - For Time',
  'Pyramid 1-10: Burpees / 10-1: Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Sit HC Push 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Sit HC Push 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Sit-ups, 20 HC, 15 Push-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Run Push Squat 5k',
  'HomeWOD',
  'ForTime',
  'Run Push Squat 5k - For Time',
  '5k Run with 50 Push-ups and 50 Squats at 2.5k mark',
  ARRAY['Bodyweight'],
  'Intermediate',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Lunge V 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Lunge V 10 - AMRAP 10 Min',
  '10 Min AMRAP: 8 Burpees, 16 Lunges, 10 V-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '50-40-30-20-10 Bodyweight',
  'HomeWOD',
  'ForTime',
  '50-40-30-20-10 Bodyweight - For Time',
  '50-40-30-20-10 of each: Squats, Push-ups, Sit-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  25,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Pull Push Lunge 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Pull Push Lunge 15 - AMRAP 15 Min',
  '15 Min AMRAP: 5 Pull-ups, 10 Push-ups, 20 Lunges',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Jump Squat Sit Sprint 6',
  'HomeWOD',
  'ForTime',
  'Jump Squat Sit Sprint 6 - For Time',
  '6 Rounds: 20 Jump Squats, 20 Sit-ups, 200m Sprint',
  ARRAY['Bodyweight'],
  'Intermediate',
  14,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP HC Climb Squat 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Climb Squat 12 - AMRAP 12 Min',
  '12 Min AMRAP: 20 HC, 20 Mountain Climbers, 15 Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Gauntlet',
  'HomeWOD',
  'ForTime',
  'Bodyweight Gauntlet - For Time',
  '10 Pull-ups, 20 Push-ups, 30 Sit-ups, 40 Squats — 5 Rounds',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Sit Pull 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Sit Pull 12 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Burpees, 10 Sit-ups, 5 Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push-up Lunge 5 Rounds',
  'HomeWOD',
  'ForTime',
  'Push-up Lunge 5 Rounds - For Time',
  '5 Rounds: 20 Push-ups, 20 Alternating Lunges',
  ARRAY['Bodyweight'],
  'Beginner',
  12,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP V-up Lunge Sprint 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP V-up Lunge Sprint 10 - AMRAP 10 Min',
  '10 Min AMRAP: 10 V-ups, 20 Lunges, 100m Sprint',
  ARRAY['Bodyweight'],
  'Intermediate',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '400m Run + 50 Each',
  'HomeWOD',
  'ForTime',
  '400m Run + 50 Each - For Time',
  '3 Rounds: 400m Run, 50 Squats, 50 Sit-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Push Jump HC 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Push Jump HC 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Push-ups, 15 Jump Squats, 20 HC',
  ARRAY['Bodyweight'],
  'Beginner',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '5 Rounds Core Power',
  'HomeWOD',
  'ForTime',
  '5 Rounds Core Power - For Time',
  '5 Rounds: 10 Pull-ups, 10 HSPU, 20 Sit-ups, 20 Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Pull Squat 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Pull Squat 20 - AMRAP 20 Min',
  '20 Min AMRAP: 10 Burpees, 10 Pull-ups, 20 Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Fran Alt',
  'HomeWOD',
  'ForTime',
  'Bodyweight Fran Alt - For Time',
  '21-15-9: Jump Squats, Pull-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  8,
  '1',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Lunge Push Sit 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Lunge Push Sit 20 - AMRAP 20 Min',
  '20 Min AMRAP: 30 Lunges, 20 Push-ups, 20 Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight 400',
  'HomeWOD',
  'ForTime',
  'Bodyweight 400 - For Time',
  '400 Reps: 100 Push-ups, 100 Sit-ups, 100 Squats, 100 Lunges',
  ARRAY['Bodyweight'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Jump HC Lunge 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Jump HC Lunge 12 - AMRAP 12 Min',
  '12 Min AMRAP: 20 Jump Squats, 20 HC, 20 Lunges',
  ARRAY['Bodyweight'],
  'Beginner',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '10 Rounds Sit Push Sprint',
  'HomeWOD',
  'ForTime',
  '10 Rounds Sit Push Sprint - For Time',
  '10 Rounds: 15 Sit-ups, 10 Push-ups, 100m Sprint',
  ARRAY['Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Pull Burpee 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Pull Burpee 10 - AMRAP 10 Min',
  '10 Min AMRAP: 10 Pull-ups, 5 Burpees',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Triple 3',
  'HomeWOD',
  'ForTime',
  'Triple 3 - For Time',
  '3 Mile Run, 300 Push-ups, 300 Squats — partition as needed',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Advanced',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP HC Sit Squat Jump 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Sit Squat Jump 15 - AMRAP 15 Min',
  '15 Min AMRAP: 20 HC, 15 Sit-ups, 15 Squats, 10 Jump Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push Pull Squat 5x5',
  'HomeWOD',
  'ForTime',
  'Push Pull Squat 5x5 - For Time',
  '5 Rounds: 5 Pull-ups, 10 Push-ups, 20 Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee V Lunge 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee V Lunge 12 - AMRAP 12 Min',
  '12 Min AMRAP: 6 Burpees, 12 V-ups, 18 Lunges',
  ARRAY['Bodyweight'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Total',
  'HomeWOD',
  'ForTime',
  'Bodyweight Total - For Time',
  '50 Burpees, 100 Push-ups, 150 Squats, 200 Sit-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Squat Push V 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Squat Push V 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 Squats, 15 Push-ups, 10 V-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight SWOD',
  'HomeWOD',
  'ForTime',
  'Bodyweight SWOD - For Time',
  '21-15-9: Squat Jumps, Push-ups, V-ups',
  ARRAY['Bodyweight'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP HC Squat Sprint 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Squat Sprint 10 - AMRAP 10 Min',
  '10 Min AMRAP: 20 HC, 20 Squats, 100m Sprint',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '5 Rounds Bodyweight Classic',
  'HomeWOD',
  'ForTime',
  '5 Rounds Bodyweight Classic - For Time',
  '5 Rounds: 20 Pull-ups, 30 Push-ups, 40 Sit-ups, 50 Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  18,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbell Complex A',
  'Other Benchmark',
  'ForTime',
  'Barbell Complex A - For Time',
  '5 Rounds: 5 Deadlifts, 5 Hang Power Cleans, 5 Front Squats, 5 Push Press',
  ARRAY['Barbell'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Strength Chipper',
  'Other Benchmark',
  'ForTime',
  'Strength Chipper - For Time',
  '30 Deadlifts, 20 Power Cleans, 15 Front Squats, 10 Push Jerks, 5 Squat Cleans',
  ARRAY['Barbell'],
  'Advanced',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bear Complex 5x5',
  'Other Benchmark',
  'ForTime',
  'Bear Complex 5x5 - For Time',
  '5 Sets of 7 Bear Complex (PC+FS+PP+BS+PP)',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Deadlift 21-15-9',
  'Other Benchmark',
  'ForTime',
  'Deadlift 21-15-9 - For Time',
  '21-15-9: Deadlifts, Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push Jerk Complex',
  'Other Benchmark',
  'ForTime',
  'Push Jerk Complex - For Time',
  '5 Rounds: 5 Push Jerks, 5 Split Jerks, 5 Push Press',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Front Squat + T2B',
  'Other Benchmark',
  'ForTime',
  'Front Squat + T2B - For Time',
  '5 Rounds: 5 Front Squats, 10 T2B',
  ARRAY['Barbell','Pull-up Bar'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Squat Clean Thruster',
  'Other Benchmark',
  'ForTime',
  'Squat Clean Thruster - For Time',
  '3 Rounds: 10 Squat Cleans, 10 Thrusters',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Power Clean AMRAP 10',
  'Other Benchmark',
  'AMRAP',
  'Power Clean AMRAP 10 - AMRAP 10 Min',
  '10 Min AMRAP: 5 Power Cleans, 10 Burpees',
  ARRAY['Barbell'],
  'Intermediate',
  10,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Snatch Balance 5x3',
  'Other Benchmark',
  'ForTime',
  'Snatch Balance 5x3 - For Time',
  '5 Sets of 3 Snatch Balance',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'OHS Complex',
  'Other Benchmark',
  'ForTime',
  'OHS Complex - For Time',
  '5 Sets: 5 OHS + 5 Snatch Balance',
  ARRAY['Barbell'],
  'Advanced',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '5×3 Back Squat',
  'Other Benchmark',
  'ForTime',
  '5×3 Back Squat - For Time',
  '5 Sets of 3 Back Squats (heavy)',
  ARRAY['Barbell'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbell Cycling',
  'Other Benchmark',
  'AMRAP',
  'Barbell Cycling - AMRAP 8 Min',
  '8 Min AMRAP: 3 Squat Cleans + 3 Jerks',
  ARRAY['Barbell'],
  'Advanced',
  8,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Snatch Ladder',
  'Other Benchmark',
  'ForTime',
  'Snatch Ladder - For Time',
  '10-8-6-4-2: Power Snatches (increasing weight)',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Clean & Jerk AMRAP',
  'Other Benchmark',
  'AMRAP',
  'Clean & Jerk AMRAP - AMRAP 7 Min',
  '7 Min AMRAP: 1 Clean & Jerk (heavy)',
  ARRAY['Barbell'],
  'Advanced',
  7,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Deadlift Density',
  'Other Benchmark',
  'ForTime',
  'Deadlift Density - For Time',
  '10 Min: Max Deadlifts at 80% 1RM',
  ARRAY['Barbell'],
  'Intermediate',
  10,
  '1',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push Press + Row',
  'Other Benchmark',
  'ForTime',
  'Push Press + Row - For Time',
  '5 Rounds: 10 Push Press, 250m Row',
  ARRAY['Barbell','Rowing Machine'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Overhead Complex',
  'Other Benchmark',
  'ForTime',
  'Overhead Complex - For Time',
  '5 Sets: 3 Push Press + 3 Push Jerk + 3 Split Jerk',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Front Squat AMRAP',
  'Other Benchmark',
  'AMRAP',
  'Front Squat AMRAP - AMRAP 10 Min',
  '10 Min AMRAP: 5 Front Squats, 5 Pull-ups',
  ARRAY['Barbell'],
  'Intermediate',
  10,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Hang Power Snatch Complex',
  'Other Benchmark',
  'ForTime',
  'Hang Power Snatch Complex - For Time',
  '5 Sets: 3 HPS + 3 OHS',
  ARRAY['Barbell'],
  'Advanced',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Thrusters 30-20-10',
  'Other Benchmark',
  'ForTime',
  'Thrusters 30-20-10 - For Time',
  '30-20-10: Thrusters, Burpees',
  ARRAY['Barbell'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Squat Clean Ladder',
  'Other Benchmark',
  'ForTime',
  'Squat Clean Ladder - For Time',
  '1-2-3-4-5: Squat Cleans (add weight each round)',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Power Snatch Density',
  'Other Benchmark',
  'ForTime',
  'Power Snatch Density - For Time',
  '12 Min: Every 90s — 3 Power Snatches',
  ARRAY['Barbell'],
  'Advanced',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Clean Pull Squat',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Clean Pull Squat - AMRAP 12 Min',
  '12 Min AMRAP: 3 Squat Cleans, 6 Pull-ups, 9 Squats',
  ARRAY['Barbell'],
  'Advanced',
  12,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbell Fran',
  'Other Benchmark',
  'ForTime',
  'Barbell Fran - For Time',
  '21-15-9: Thrusters, Chest-to-Bar',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  10,
  '1',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Triple Clean',
  'Other Benchmark',
  'ForTime',
  'Triple Clean - For Time',
  '3 Rounds: 10 HPC, 10 Power Clean, 10 Squat Clean',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Jerk & Squat',
  'Other Benchmark',
  'ForTime',
  'Jerk & Squat - For Time',
  '5 Rounds: 3 Jerks, 5 Front Squats, 3 OHS',
  ARRAY['Barbell'],
  'Advanced',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbell Conditioning 1',
  'Other Benchmark',
  'AMRAP',
  'Barbell Conditioning 1 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Deadlifts, 5 Hang Power Cleans, 5 Box Jumps',
  ARRAY['Barbell','Box'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Power Clean Ladder 10-1',
  'Other Benchmark',
  'ForTime',
  'Power Clean Ladder 10-1 - For Time',
  '10-9-8-7-6-5-4-3-2-1: Power Cleans',
  ARRAY['Barbell'],
  'Advanced',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Back Squat 10x3',
  'Other Benchmark',
  'ForTime',
  'Back Squat 10x3 - For Time',
  '10 Sets of 3 Back Squats at 75%',
  ARRAY['Barbell'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbell Conditioning 2',
  'Other Benchmark',
  'AMRAP',
  'Barbell Conditioning 2 - AMRAP 10 Min',
  '10 Min AMRAP: 3 DL, 3 HPC, 3 FS, 3 PP, 5 Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Intermediate',
  10,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Snatch Complex',
  'Other Benchmark',
  'ForTime',
  'Snatch Complex - For Time',
  '5 Sets: Snatch + Hang Snatch + OHS',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'DL Row Complex',
  'Other Benchmark',
  'ForTime',
  'DL Row Complex - For Time',
  '5 Rounds: 5 Deadlifts, 5 Pendlay Rows, 5 Power Cleans',
  ARRAY['Barbell'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Overhead Squat 5x5',
  'Other Benchmark',
  'ForTime',
  'Overhead Squat 5x5 - For Time',
  '5 Sets of 5 OHS',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Barbell Chipper',
  'Other Benchmark',
  'ForTime',
  'KB Barbell Chipper - For Time',
  '21 KB Swings, 21 DL, 15 KB Swings, 15 Power Cleans, 9 KB Swings, 9 Thrusters',
  ARRAY['Barbell','Kettlebell'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbell Cycling 2',
  'Other Benchmark',
  'AMRAP',
  'Barbell Cycling 2 - AMRAP 10 Min',
  '10 Min AMRAP: 2 Squat Cleans + 2 Jerks (heavy)',
  ARRAY['Barbell'],
  'Advanced',
  10,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Clean & Press Ladder',
  'Other Benchmark',
  'ForTime',
  'Clean & Press Ladder - For Time',
  '5-5-5-5-5: Clean & Press (increasing weight)',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'RDL + Row',
  'Other Benchmark',
  'ForTime',
  'RDL + Row - For Time',
  '4 Rounds: 10 RDL, 10 Bent-over Row, 10 Upright Row',
  ARRAY['Barbell'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbell Conditioning 3',
  'Other Benchmark',
  'AMRAP',
  'Barbell Conditioning 3 - AMRAP 15 Min',
  '15 Min AMRAP: 5 Hang Power Cleans, 250m Row',
  ARRAY['Barbell','Rowing Machine'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Strict Press 5x5',
  'Other Benchmark',
  'ForTime',
  'Strict Press 5x5 - For Time',
  '5 Sets of 5 Strict Press (increasing weight)',
  ARRAY['Barbell'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Front Squat 8x3',
  'Other Benchmark',
  'ForTime',
  'Front Squat 8x3 - For Time',
  '8 Sets of 3 Front Squats at 80%',
  ARRAY['Barbell'],
  'Advanced',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Row & Run 5K',
  'Other Benchmark',
  'ForTime',
  'Row & Run 5K - For Time',
  '2500m Row + 2500m Run',
  ARRAY['Rowing Machine','Bodyweight'],
  'Intermediate',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Chipper 10 Rounds',
  'Other Benchmark',
  'ForTime',
  'Chipper 10 Rounds - For Time',
  '10 Rounds: 10 DL, 10 HPC, 10 FS, 10 PP, 10 Squats',
  ARRAY['Barbell','Pull-up Bar'],
  'Intermediate',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP 3-6-9 KB',
  'Other Benchmark',
  'AMRAP',
  'AMRAP 3-6-9 KB - AMRAP 15 Min',
  '15 Min AMRAP: 3-6-9 KB Swing, Burpee, Sit-up (add 3 each round)',
  ARRAY['Kettlebell','Bodyweight'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Ladder 1-2-3-4-5',
  'Other Benchmark',
  'ForTime',
  'Ladder 1-2-3-4-5 - For Time',
  'Ladder 1-5: Squat Cleans + Pull-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  '5 Rounds Row Push',
  'Other Benchmark',
  'ForTime',
  '5 Rounds Row Push - For Time',
  '5 Rounds: 500m Row, 20 Push-ups',
  ARRAY['Rowing Machine','Bodyweight'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Wall Ball Pull-up 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Wall Ball Pull-up 12 - AMRAP 12 Min',
  '12 Min AMRAP: 12 Wall Balls, 12 Pull-ups',
  ARRAY['Wall Ball','Pull-up Bar'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Ski Erg Chipper',
  'Other Benchmark',
  'ForTime',
  'Ski Erg Chipper - For Time',
  '2000m Ski, 30 Power Cleans, 2000m Ski',
  ARRAY['Ski Erg','Barbell'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Rowing Intervals 10x250',
  'Other Benchmark',
  'ForTime',
  'Rowing Intervals 10x250 - For Time',
  '10x250m Row — 1min rest between',
  ARRAY['Rowing Machine'],
  'Intermediate',
  25,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Row KB DL 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Row KB DL 15 - AMRAP 15 Min',
  '15 Min AMRAP: 500m Row, 15 KB Swings, 10 Deadlifts',
  ARRAY['Rowing Machine','Kettlebell','Barbell'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Assault Bike 30 Min',
  'Other Benchmark',
  'ForTime',
  'Assault Bike 30 Min - For Time',
  '30 Min Assault Bike for max cals',
  ARRAY['Assault Bike'],
  'Intermediate',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Death by Box Jump',
  'HomeWOD',
  'EMOM',
  'Death by Box Jump - EMOM 15 Min',
  'Min 1: 1 Box Jump, min 2: 2, continue until failure',
  ARRAY['Box'],
  'Intermediate',
  15,
  '15',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Death by Squat',
  'HomeWOD',
  'EMOM',
  'Death by Squat - EMOM 15 Min',
  'Min 1: 1 Squat, min 2: 2, continue until failure',
  ARRAY['Bodyweight'],
  'Beginner',
  15,
  '15',
  '10-15 Reps/Min',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Death by Thruster',
  'HomeWOD',
  'EMOM',
  'Death by Thruster - EMOM 15 Min',
  'Min 1: 1 Thruster, min 2: 2, continue until failure',
  ARRAY['Barbell'],
  'Advanced',
  15,
  '15',
  '10-15 Reps/Min',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP HC Push Lunge 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Push Lunge 15 - AMRAP 15 Min',
  '15 Min AMRAP: 20 HC, 15 Push-ups, 20 Lunges',
  ARRAY['Bodyweight'],
  'Beginner',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Century',
  'HomeWOD',
  'ForTime',
  'Bodyweight Century - For Time',
  '100 Reps in as few sets as possible: Push-ups or Squats',
  ARRAY['Bodyweight'],
  'Intermediate',
  10,
  '1',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee V Sprint 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee V Sprint 12 - AMRAP 12 Min',
  '12 Min AMRAP: 6 Burpees, 12 V-ups, 100m Sprint',
  ARRAY['Bodyweight'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Sit-up Squat 200 Reps',
  'HomeWOD',
  'ForTime',
  'Sit-up Squat 200 Reps - For Time',
  '100 Sit-ups + 100 Air Squats — for time',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Push HC Box 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Push HC Box 10 - AMRAP 10 Min',
  '10 Min AMRAP: 10 Push-ups, 20 HC, 10 Box Step-ups',
  ARRAY['Box','Bodyweight'],
  'Intermediate',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Hurricane 2',
  'HomeWOD',
  'ForTime',
  'Bodyweight Hurricane 2 - For Time',
  '5 Rounds: 200m Run, 10 Burpees, 20 Squats, 20 Sit-ups',
  ARRAY['Bodyweight'],
  'Advanced',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Jump Sit Lunge 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Jump Sit Lunge 10 - AMRAP 10 Min',
  '10 Min AMRAP: 15 Jump Squats, 15 Sit-ups, 15 Lunges',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Blaster',
  'HomeWOD',
  'ForTime',
  'Bodyweight Blaster - For Time',
  '50 Burpees, 50 Squats, 50 Push-ups, 50 Sit-ups — for time',
  ARRAY['Bodyweight'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP HC Pull Push 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Pull Push 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 HC, 10 Pull-ups, 20 Push-ups',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  20,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Lunge Sprint 400',
  'HomeWOD',
  'ForTime',
  'Lunge Sprint 400 - For Time',
  '400m Walking Lunge + 400m Sprint',
  ARRAY['Bodyweight'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP V Push Squat 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP V Push Squat 15 - AMRAP 15 Min',
  '15 Min AMRAP: 10 V-ups, 15 Push-ups, 20 Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Push-up Test Max',
  'HomeWOD',
  'ForTime',
  'Push-up Test Max - For Time',
  'Max unbroken Push-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  5,
  '1',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Mountain HC Jump 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Mountain HC Jump 12 - AMRAP 12 Min',
  '12 Min AMRAP: 20 Mountain Climbers, 20 HC, 15 Jump Squats',
  ARRAY['Bodyweight'],
  'Beginner',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Pull Dip Squat 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Pull Dip Squat 15 - AMRAP 15 Min',
  '15 Min AMRAP: 8 Pull-ups, 8 Dips, 20 Squats',
  ARRAY['Pull-up Bar','Bodyweight'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bodyweight Open 1',
  'HomeWOD',
  'AMRAP',
  'Bodyweight Open 1 - AMRAP 10 Min',
  '10 Min AMRAP: 10 Burpees, 15 Squats, 20 Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Push Jump Sit 8',
  'HomeWOD',
  'AMRAP',
  'AMRAP Push Jump Sit 8 - AMRAP 8 Min',
  '8 Min AMRAP: 10 Push-ups, 10 Jump Squats, 10 Sit-ups',
  ARRAY['Bodyweight'],
  'Beginner',
  8,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Barbell Blend A',
  'Other Benchmark',
  'ForTime',
  'KB Barbell Blend A - For Time',
  '3 Rounds: 15 KB Swings, 12 Hang Power Cleans, 9 Push Jerks',
  ARRAY['Kettlebell','Barbell'],
  'Intermediate',
  18,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Barbell Blend B',
  'Other Benchmark',
  'ForTime',
  'KB Barbell Blend B - For Time',
  '5 Rounds: 20 KB Swings, 15 Pull-ups, 10 Thrusters',
  ARRAY['Kettlebell','Barbell','Pull-up Bar'],
  'Advanced',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Row Wall Ball Chipper',
  'Other Benchmark',
  'ForTime',
  'Row Wall Ball Chipper - For Time',
  '1000m Row, 50 Wall Balls, 1000m Row, 50 Wall Balls',
  ARRAY['Rowing Machine','Wall Ball'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Box Pull 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Burpee Box Pull 12 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Burpee Box Jumps, 5 Pull-ups',
  ARRAY['Box','Pull-up Bar'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bike Barbell Combo',
  'Other Benchmark',
  'ForTime',
  'Bike Barbell Combo - For Time',
  '5 Rounds: 15 Cal Bike, 10 Power Cleans, 10 Front Squats',
  ARRAY['Assault Bike','Barbell'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Ski KB Row Mix',
  'Other Benchmark',
  'AMRAP',
  'Ski KB Row Mix - AMRAP 15 Min',
  '15 Min AMRAP: 500m Ski, 20 KB Swings, 250m Row',
  ARRAY['Ski Erg','Kettlebell','Rowing Machine'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Wall Ball T2B Box 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Wall Ball T2B Box 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Wall Balls, 10 T2B, 10 Box Jumps',
  ARRAY['Wall Ball','Pull-up Bar','Box'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Row Thruster Chipper',
  'Other Benchmark',
  'ForTime',
  'Row Thruster Chipper - For Time',
  '2000m Row, 50 Thrusters, 2000m Row',
  ARRAY['Rowing Machine','Barbell'],
  'Advanced',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP DL Box KB 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP DL Box KB 12 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Deadlifts, 10 Box Jumps, 15 KB Swings',
  ARRAY['Barbell','Box','Kettlebell'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Triple Modal 3 Rounds',
  'Other Benchmark',
  'ForTime',
  'Triple Modal 3 Rounds - For Time',
  '3 Rounds: 500m Row, 15 Power Cleans, 20 Burpees',
  ARRAY['Rowing Machine','Barbell','Bodyweight'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Assault Intervals 5x',
  'Other Benchmark',
  'ForTime',
  'Assault Intervals 5x - For Time',
  '5x: 1 Min Max Effort / 1 Min Rest on Assault Bike',
  ARRAY['Assault Bike'],
  'Intermediate',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP PC Box T2B 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP PC Box T2B 12 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Power Cleans, 10 Box Jumps, 10 T2B',
  ARRAY['Barbell','Box','Pull-up Bar'],
  'Advanced',
  12,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Row KB AMRAP 20',
  'Other Benchmark',
  'AMRAP',
  'Row KB AMRAP 20 - AMRAP 20 Min',
  '20 Min AMRAP: 300m Row, 20 KB Swings, 10 Burpees',
  ARRAY['Rowing Machine','Kettlebell'],
  'Intermediate',
  20,
  '1',
  'Max Reps',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bike Run KB',
  'Other Benchmark',
  'ForTime',
  'Bike Run KB - For Time',
  '4 Rounds: 10 Cal Bike, 400m Run, 20 KB Swings',
  ARRAY['Assault Bike','Kettlebell'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP WB DL Box 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP WB DL Box 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Wall Balls, 10 Deadlifts, 10 Box Jumps',
  ARRAY['Wall Ball','Barbell','Box'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Snatch + Row',
  'Other Benchmark',
  'ForTime',
  'Snatch + Row - For Time',
  '5 Rounds: 5 Squat Snatches, 250m Row',
  ARRAY['Barbell','Rowing Machine'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Swing 10x10',
  'Other Benchmark',
  'ForTime',
  'KB Swing 10x10 - For Time',
  '10 Sets of 10 KB Swings (EMOM style)',
  ARRAY['Kettlebell'],
  'Intermediate',
  10,
  '1',
  '21-15-9',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Pull-up 10x10',
  'Other Benchmark',
  'ForTime',
  'Pull-up 10x10 - For Time',
  '10 Sets of 10 Pull-ups (every 90s)',
  ARRAY['Pull-up Bar'],
  'Intermediate',
  12,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Burpee Thruster 10',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Burpee Thruster 10 - AMRAP 10 Min',
  '10 Min AMRAP: 5 Thrusters, 10 Burpees',
  ARRAY['Barbell'],
  'Advanced',
  10,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Row Deadlift 5 Rounds',
  'Other Benchmark',
  'ForTime',
  'Row Deadlift 5 Rounds - For Time',
  '5 Rounds: 500m Row, 10 Deadlifts',
  ARRAY['Rowing Machine','Barbell'],
  'Intermediate',
  18,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP C2B KB Box 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP C2B KB Box 15 - AMRAP 15 Min',
  '15 Min AMRAP: 5 C2B, 10 KB Swings, 10 Box Jumps',
  ARRAY['Pull-up Bar','Kettlebell','Box'],
  'Advanced',
  15,
  '1',
  'Max Reps',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Ski Pull-up Chipper',
  'Other Benchmark',
  'ForTime',
  'Ski Pull-up Chipper - For Time',
  '100 Cal Ski, 50 Pull-ups, 50 Cal Ski, 25 Pull-ups',
  ARRAY['Ski Erg','Pull-up Bar'],
  'Advanced',
  15,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP WB PC DU 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP WB PC DU 12 - AMRAP 12 Min',
  '12 Min AMRAP: 15 WB, 10 PC, 30 DU',
  ARRAY['Wall Ball','Barbell','Jump Rope'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbell Bias WOD 1',
  'Other Benchmark',
  'ForTime',
  'Barbell Bias WOD 1 - For Time',
  '10 Rounds: 3 Squat Cleans, 3 Jerks, 5 Bar Muscle-ups',
  ARRAY['Barbell','Pull-up Bar'],
  'Advanced',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Barbell Bias WOD 2',
  'Other Benchmark',
  'ForTime',
  'Barbell Bias WOD 2 - For Time',
  '5 Rounds: 10 Deadlifts, 10 HPC, 10 FS, 10 PP, 10 Burpees',
  ARRAY['Barbell','Bodyweight'],
  'Intermediate',
  18,
  '3',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP DL T2B Burpee 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP DL T2B Burpee 15 - AMRAP 15 Min',
  '15 Min AMRAP: 5 Deadlifts, 10 T2B, 5 Burpees',
  ARRAY['Barbell','Pull-up Bar'],
  'Intermediate',
  15,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Row Bike Run Tri',
  'Other Benchmark',
  'ForTime',
  'Row Bike Run Tri - For Time',
  '1000m Row, 20 Cal Bike, 800m Run — 3 Rounds',
  ARRAY['Rowing Machine','Assault Bike'],
  'Intermediate',
  30,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Swing 500',
  'Other Benchmark',
  'ForTime',
  'KB Swing 500 - For Time',
  '500 KB Swings for time — partition as needed',
  ARRAY['Kettlebell'],
  'Intermediate',
  25,
  '5',
  '21-15-9',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP HSPU PC Box 10',
  'Other Benchmark',
  'AMRAP',
  'AMRAP HSPU PC Box 10 - AMRAP 10 Min',
  '10 Min AMRAP: 5 HSPU, 5 Power Cleans, 10 Box Jumps',
  ARRAY['Barbell','Box','Bodyweight'],
  'Advanced',
  10,
  '1',
  'Max Reps',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Run KB Barbell 3x',
  'Other Benchmark',
  'ForTime',
  'Run KB Barbell 3x - For Time',
  '3 Rounds: 800m Run, 20 KB Swings, 10 Hang Power Cleans',
  ARRAY['Kettlebell','Barbell'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP C2B WB DL 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP C2B WB DL 15 - AMRAP 15 Min',
  '15 Min AMRAP: 5 C2B Pull-ups, 15 Wall Balls, 5 Deadlifts',
  ARRAY['Pull-up Bar','Wall Ball','Barbell'],
  'Advanced',
  15,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Box Jump Barbell 5 Rounds',
  'Other Benchmark',
  'ForTime',
  'Box Jump Barbell 5 Rounds - For Time',
  '5 Rounds: 15 Box Jumps, 10 Power Cleans, 5 Push Jerks',
  ARRAY['Box','Barbell'],
  'Intermediate',
  18,
  '3',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Bike KB Pull Chipper',
  'Other Benchmark',
  'ForTime',
  'Bike KB Pull Chipper - For Time',
  '50 Cal Bike, 50 KB Swings, 50 Pull-ups, 50 Cal Bike',
  ARRAY['Assault Bike','Kettlebell','Pull-up Bar'],
  'Intermediate',
  20,
  '3',
  '21-15-9',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP Row PC Burpee 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Row PC Burpee 12 - AMRAP 12 Min',
  '12 Min AMRAP: 250m Row, 5 Power Cleans, 5 Burpees',
  ARRAY['Rowing Machine','Barbell'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'KB Barbell Full Chipper',
  'Other Benchmark',
  'ForTime',
  'KB Barbell Full Chipper - For Time',
  '30 KB Swings, 20 Pull-ups, 30 Thrusters, 20 Pull-ups, 30 KB Swings',
  ARRAY['Kettlebell','Barbell','Pull-up Bar'],
  'Advanced',
  25,
  '5',
  '21-15-9',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP WB Box KB 20',
  'Other Benchmark',
  'AMRAP',
  'AMRAP WB Box KB 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 Wall Balls, 15 Box Jumps, 15 KB Swings',
  ARRAY['Wall Ball','Box','Kettlebell'],
  'Intermediate',
  20,
  '1',
  'Max Reps',
  '24/16',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'Endurance Chipper',
  'Other Benchmark',
  'ForTime',
  'Endurance Chipper - For Time',
  '2000m Row, 50 Thrusters, 30 Pull-ups, 30 Burpees, 2000m Row',
  ARRAY['Rowing Machine','Barbell','Bodyweight'],
  'Advanced',
  40,
  '5',
  '21-15-9',
  'Bodyweight',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (name, category, type, description, exercises, equipment, difficulty, estimated_minutes, runden, reps, gewicht, skal_leicht, skal_schwer, quelle) VALUES (
  'AMRAP DL Pull Box 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP DL Pull Box 12 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Deadlifts, 10 Pull-ups, 15 Box Jumps',
  ARRAY['Barbell','Pull-up Bar','Box'],
  'Intermediate',
  12,
  '1',
  'Max Reps',
  '60/40',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

COMMIT;
