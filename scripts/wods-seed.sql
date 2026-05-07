-- WOD seed data — generated 2026-05-07T11:45:09.232Z
-- Source: C:\Projects\fitness_app\.claude\worktrees\infallible-austin-c1fd22\apps\web\public\wods.json

BEGIN;

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  1,
  'Fran',
  'Girl WOD',
  'ForTime',
  '21-15-9 Reps für Zeit',
  'Thrusters, Pull-ups',
  'Barbell, Pull-up Bar',
  10,
  3,
  '21-15-9',
  '43',
  'Intermediate',
  '15-12-9 / Ring Rows',
  '21-15-9 / Chest-to-Bar',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  2,
  'Cindy',
  'Girl WOD',
  'AMRAP',
  'So viele Runden wie möglich in 20 Min',
  'Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  20,
  NULL,
  '5/10/15',
  NULL,
  'Beginner',
  '3/6/9 / Ring Rows / Knie-Push-ups',
  '7/14/21 / Chest-to-Bar',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  3,
  'Grace',
  'Girl WOD',
  'ForTime',
  '30 Clean & Jerks für Zeit',
  'Clean & Jerk',
  'Barbell',
  10,
  NULL,
  '30',
  '61',
  'Advanced',
  '15-20 Reps / leichteres Gewicht',
  '30 / schwereres Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  4,
  'Helen',
  'Girl WOD',
  'ForTime',
  '3 Runden für Zeit',
  'Run 400m, Kettlebell Swings, Pull-ups',
  'Kettlebell, Pull-up Bar',
  12,
  3,
  '21 KB Swings, 12 Pull-ups',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows',
  'Heavier KB / C2B',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  5,
  'Annie',
  'Girl WOD',
  'ForTime',
  '50-40-30-20-10 für Zeit',
  'Double Unders, Sit-ups',
  'Jump Rope, Bodyweight',
  15,
  NULL,
  '50-40-30-20-10',
  NULL,
  'Intermediate',
  'Single Unders (2x)',
  'Unbroken Sets',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  6,
  'Karen',
  'Girl WOD',
  'ForTime',
  '150 Wall Ball Shots für Zeit',
  'Wall Ball',
  'Wall Ball',
  15,
  NULL,
  '150',
  '9',
  'Intermediate',
  '100 Reps / leichterer Ball',
  '150 / schwererer Ball',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  7,
  'Barbara',
  'Girl WOD',
  'ForTime',
  '5 Runden mit 3 Min Pause',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  30,
  5,
  '20/30/40/50',
  NULL,
  'Intermediate',
  '15/20/30/40',
  '25/40/50/60',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  8,
  'Angie',
  'Girl WOD',
  'ForTime',
  '100 Reps jeder Übung für Zeit',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  30,
  NULL,
  '100/100/100/100',
  NULL,
  'Intermediate',
  '50 Reps / Ring Rows',
  'Chest-to-Bar Pull-ups',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  9,
  'Chelsea',
  'Girl WOD',
  'EMOM',
  '30 Min EMOM',
  'Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  30,
  30,
  '5/10/15',
  NULL,
  'Intermediate',
  '3/6/9',
  '7/14/21',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  10,
  'Diane',
  'Girl WOD',
  'ForTime',
  '21-15-9 für Zeit',
  'Deadlift, Handstand Push-ups',
  'Barbell, Wall',
  10,
  3,
  '21-15-9',
  '102',
  'Advanced',
  'Ring/Box HSPU / weniger Gewicht',
  'Deficit HSPU / mehr Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  11,
  'Elizabeth',
  'Girl WOD',
  'ForTime',
  '21-15-9 für Zeit',
  'Clean, Ring Dips',
  'Barbell, Rings',
  10,
  3,
  '21-15-9',
  '61',
  'Advanced',
  'Leichteres Gewicht / Box Dips',
  'Schwereres Gewicht / MU',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  12,
  'Isabel',
  'Girl WOD',
  'ForTime',
  '30 Snatches für Zeit',
  'Snatch',
  'Barbell',
  10,
  NULL,
  '30',
  '61',
  'Advanced',
  'Leichteres Gewicht / Hang Power Snatch',
  'Schwereres Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  13,
  'Jackie',
  'Girl WOD',
  'ForTime',
  'Für Zeit',
  'Row 1000m, Thrusters, Pull-ups',
  'Rower, Barbell, Pull-up Bar',
  15,
  NULL,
  '1000m/45 Thrusters/30 Pull-ups',
  '20',
  'Intermediate',
  '750m / leichter / Ring Rows',
  'Schwereres Gewicht / C2B',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  14,
  'Linda',
  'Girl WOD',
  'ForTime',
  '10-9-8...1 Runden',
  'Deadlift, Bench Press, Clean',
  'Barbell',
  30,
  10,
  '10 bis 1',
  NULL,
  'Advanced',
  'Leichtere Gewichte',
  'Schwerere Gewichte',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  15,
  'Mary',
  'Girl WOD',
  'AMRAP',
  '20 Min AMRAP',
  'Handstand Push-ups, Pistols, Pull-ups',
  'Pull-up Bar, Bodyweight',
  20,
  NULL,
  '5/10/15',
  NULL,
  'Advanced',
  'Box HSPU / Assisted Pistols / Ring Rows',
  'Deficit HSPU / Weighted',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  16,
  'Nancy',
  'Girl WOD',
  'ForTime',
  '5 Runden für Zeit',
  'Run 400m, Overhead Squat',
  'Barbell',
  20,
  5,
  '15 OHS',
  '43',
  'Intermediate',
  'Leichteres Gewicht / PVC',
  'Schwereres Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  17,
  'Amanda',
  'Girl WOD',
  'ForTime',
  '9-7-5 für Zeit',
  'Muscle-ups, Squat Snatches',
  'Rings, Barbell',
  10,
  3,
  '9-7-5',
  '61',
  'Advanced',
  'Ring/Box MU / leichterer Snatch',
  'Schwereres Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  18,
  'Eva',
  'Girl WOD',
  'ForTime',
  '5 Runden für Zeit',
  'Run 800m, KB Swings, Pull-ups',
  'Kettlebell, Pull-up Bar',
  45,
  5,
  '30 KB / 30 Pull-ups',
  '32',
  'Advanced',
  '400m / leichter / Ring Rows',
  'Schwereres Gewicht',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  19,
  'Kelly',
  'Girl WOD',
  'ForTime',
  '5 Runden für Zeit',
  'Run 400m, Box Jumps, Wall Balls',
  'Box, Wall Ball',
  30,
  5,
  '30 BJ / 30 WB',
  '9',
  'Intermediate',
  'Kleinere Box / leichterer Ball',
  'Höhere Box / schwererer Ball',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  20,
  'Nicole',
  'Girl WOD',
  'ForTime',
  '20 Min AMRAP + Max Pull-ups',
  'Run 400m, Max Pull-ups',
  'Pull-up Bar, Bodyweight',
  20,
  NULL,
  'Max Reps',
  NULL,
  'Intermediate',
  'Ring Rows',
  'Gewichtete Pull-ups',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  21,
  'Murph',
  'Hero WOD',
  'ForTime',
  'Für Zeit (mit Gewichtsweste optional)',
  'Run 1 Mile, Pull-ups, Push-ups, Air Squats, Run 1 Mile',
  'Pull-up Bar, Bodyweight',
  45,
  NULL,
  '100/200/300',
  NULL,
  'Advanced',
  'Ohne Weste / partitioniert',
  'Mit 20lb Weste / unpartitioniert',
  'Hero WOD - Lt. Michael Murphy'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  22,
  'DT',
  'Hero WOD',
  'ForTime',
  '5 Runden für Zeit',
  'Deadlift, Hang Power Clean, Push Jerk',
  'Barbell',
  20,
  5,
  '12/9/6',
  '70',
  'Advanced',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'Hero WOD - USAF SSgt Timothy P. Davis'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  23,
  'The Chief',
  'Hero WOD',
  'AMRAP',
  '5x3 Min AMRAP mit 1 Min Pause',
  'Power Clean, Push-ups, Air Squats',
  'Barbell',
  20,
  5,
  '3/6/9',
  '61',
  'Intermediate',
  'Leichteres Gewicht / Knie-Push-ups',
  'Schwereres Gewicht',
  'Hero WOD - Major Mark Matthews'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  24,
  'Josh',
  'Hero WOD',
  'ForTime',
  '21-15-9 für Zeit',
  'Overhead Squat, Pull-ups',
  'Barbell, Pull-up Bar',
  15,
  3,
  '21-15-9',
  '43',
  'Intermediate',
  'Leichteres Gewicht / Ring Rows',
  'Schwereres Gewicht / C2B',
  'Hero WOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  25,
  'JT',
  'Hero WOD',
  'ForTime',
  '21-15-9 für Zeit',
  'Handstand Push-ups, Ring Dips, Push-ups',
  'Rings, Wall',
  20,
  3,
  '21-15-9',
  NULL,
  'Advanced',
  'Box/Knie Varianten',
  'Deficit HSPU / Weighted Dips',
  'Hero WOD - PO1 Jeff Taylor'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  26,
  'Badger',
  'Hero WOD',
  'ForTime',
  '3 Runden für Zeit',
  'Run 800m, Squat Clean, Pull-ups',
  'Barbell, Pull-up Bar',
  40,
  3,
  '30 SC / 30 Pull-ups',
  '43',
  'Advanced',
  'Leichteres Gewicht / Ring Rows',
  'Schwereres Gewicht / C2B',
  'Hero WOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  27,
  'Nate',
  'Hero WOD',
  'AMRAP',
  '20 Min AMRAP',
  'Muscle-ups, Handstand Push-ups, KB Swings',
  'Rings, Kettlebell',
  20,
  NULL,
  '2/4/8',
  '32',
  'Advanced',
  'Ring/Box MU / Box HSPU / leichter',
  'Gewichtete Varianten',
  'Hero WOD - Chief Petty Officer Nate Hardy'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  28,
  'Whitten',
  'Hero WOD',
  'ForTime',
  '5 Runden für Zeit',
  'Run 400m, Farmers Carry, OHS, Pull-ups',
  'Barbell, Pull-up Bar',
  45,
  5,
  'Variiert',
  NULL,
  'Advanced',
  'Leichteres Gewicht / Ring Rows',
  'Schwereres Gewicht',
  'Hero WOD - Capt. Dan Whitten'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  29,
  'Lazar',
  'Hero WOD',
  'ForTime',
  '3+3 Runden mit Pause',
  'Row 30 Cal, Bar Muscle-ups / HSPU',
  'Rower, Pull-up Bar',
  45,
  6,
  '30 Cal / 10-15 Reps',
  NULL,
  'Advanced',
  'Rudern / Ring MU / Box HSPU',
  'RX als Standard',
  'Hero WOD - Lazar Đukić'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  30,
  'Filthy Fifty',
  'Other Benchmark',
  'ForTime',
  '50 Reps von 10 Übungen',
  'Box Jumps, Jumping Pull-ups, KB Swings, Walking Lunges, Knees-to-Elbows, Push Press, Back Extensions, Wall Balls, Burpees, Double Unders',
  'Box, Pull-up Bar, Kettlebell, Barbell, Wall Ball, Jump Rope',
  30,
  NULL,
  '50 jede',
  '24',
  'Intermediate',
  '25 Reps / Skalierte Bewegungen',
  '75 Reps',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  31,
  'Tabata Something Else',
  'Other Benchmark',
  'Tabata',
  'Tabata (8x20/10) jeder Übung',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  16,
  NULL,
  '8 Runden à 20 Sek',
  NULL,
  'Beginner',
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Varianten',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  32,
  'Fight Gone Bad',
  'Other Benchmark',
  'ForTime',
  '3 Runden à 1 Min pro Station',
  'Wall Ball, SDLHP, Box Jumps, Push Press, Row',
  'Wall Ball, Barbell, Box, Rower',
  17,
  3,
  'Max Reps',
  '20',
  'Intermediate',
  'Leichtere Gewichte / kleinere Box',
  'Schwerere Gewichte',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  33,
  'Death by Pull-ups',
  'Other Benchmark',
  'EMOM',
  'EMOM bis zum Versagen',
  'Pull-ups',
  'Pull-up Bar',
  NULL,
  NULL,
  '1 mehr pro Minute',
  NULL,
  'Intermediate',
  'Ring Rows',
  'Gewichtete Pull-ups',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  34,
  'Cindy XXX',
  'Other Benchmark',
  'AMRAP',
  '30 Min AMRAP',
  'Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  30,
  NULL,
  '5/10/15',
  NULL,
  'Advanced',
  'Standard Cindy (20 Min)',
  'Gewichtete Weste',
  'CrossFit Variation'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  35,
  'Pukie',
  'Other Benchmark',
  'ForTime',
  'Für Zeit',
  'Thrusters, Pull-ups',
  'Barbell, Pull-up Bar',
  10,
  NULL,
  '21-15-9',
  '43',
  'Advanced',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Variation'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  36,
  'Open 12.1',
  'CrossFit Open',
  'AMRAP',
  '7 Min AMRAP',
  'Burpee to Target',
  'Bodyweight',
  7,
  NULL,
  'Max Reps',
  NULL,
  'Beginner',
  'Niedrigeres Ziel',
  'Höheres Ziel',
  'CrossFit Open 2012'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  37,
  'Open 11.1',
  'CrossFit Open',
  'AMRAP',
  '10 Min AMRAP',
  'Double Unders, Snatches',
  'Jump Rope, Barbell',
  10,
  NULL,
  '30 DU / 15 Snatch',
  '34',
  'Intermediate',
  'Single Unders / leichter',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  38,
  'Bergeron Beep Test',
  'Other Benchmark',
  'EMOM',
  'EMOM so lange wie möglich',
  'Thrusters, Pull-ups, Burpees',
  'Barbell, Pull-up Bar',
  NULL,
  NULL,
  '7/7/7 pro Minute',
  '43',
  'Advanced',
  'Leichteres Gewicht / weniger Reps',
  'RX',
  'CrossFit Benchmark'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  39,
  'Death by OHS & C2B',
  'Eigenes WOD',
  'EMOM',
  'Every 3 min: 2 Runden, steigende Reps bis Versagen',
  'Overhead Squats, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  NULL,
  NULL,
  '2 Runden: 10/10 → 12/12 → ...',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  40,
  'Farmers & Squats',
  'Eigenes WOD',
  'ForTime',
  'For Time – 15min Cap',
  'Farmers Carry, Back Squats, Double Unders, Deadlifts, Row',
  'Kettlebell/Dumbbell, Barbell, Jump Rope, Rower',
  15,
  NULL,
  '60m FC / 20 BS / 100 DU / 20 DL / 60m FC / 40 Cal',
  '80',
  'Advanced',
  'Leichteres Gewicht / Singles statt DU',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  41,
  'DB Overhead Lunges & T2B',
  'Eigenes WOD',
  'ForTime',
  '3 Rounds For Time',
  'Double Unders, DB Overhead Lunges, Toes-to-Bar',
  'Dumbbell, Jump Rope, Pull-up Bar',
  NULL,
  3,
  '50 DU / 15+15 Lunges / 15 T2B',
  '22.5',
  'Intermediate',
  'Singles statt DU / weniger Gewicht',
  'Schwereres Gewicht / mehr Reps',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  42,
  'Farmers & Row Ladder',
  'Eigenes WOD',
  'ForTime',
  'For Time – absteigende Runden',
  'Double Unders, Row, Air Squats, Farmers Carry',
  'Jump Rope, Rower, Kettlebell/Dumbbell',
  NULL,
  3,
  '60 DU / 27-21-15 Cal / 27-21-15 Squats / 40m FC',
  '24',
  'Intermediate',
  'Singles statt DU / leichteres Gewicht',
  'Mehr Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  43,
  'Assault Bike & Farmers',
  'Eigenes WOD',
  'ForTime',
  'For Time – absteigende Runden',
  'Double Unders, Assault Bike, Farmers Carry',
  'Jump Rope, Assault Bike, Kettlebell/Dumbbell',
  NULL,
  3,
  '100 DU / 27-21-15 Cal / 60m FC',
  '22.5',
  'Advanced',
  'Singles statt DU / leichteres Gewicht',
  'Mehr Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  44,
  'KB EMOM 18',
  'Eigenes WOD',
  'EMOM',
  '18 Min EMOM – alles Kettlebells',
  'KB Rotation Swings, KB Swing Button Up, Burpee Sumo Jump Squat, Gorilla Row, KB Snatch Trunk Rotation, Squat Clean & Press',
  'Kettlebell',
  18,
  18,
  '1 Übung pro Minute',
  NULL,
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  45,
  'Lead Foot',
  'Eigenes WOD',
  'AMRAP',
  '3x AMRAP 4 mit 4 Min Pause – absteigende Reps',
  'Row, Burpees, Chest-to-Bar Pull-ups, Toes-to-Bar, Pull-ups',
  'Rower, Pull-up Bar',
  24,
  3,
  '27/21/15 Cal / 27/21/15 Burpees / C2B/T2B/PU',
  NULL,
  'Advanced',
  'Weniger Reps / Pull-ups statt C2B',
  'Mehr Reps / gewichtete Weste',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  46,
  'Ab Circuit',
  'Eigenes WOD',
  'ForTime',
  '3 Rounds For Time – Core Focus',
  'Sit-ups, Leg Raises, Jack Knife Sit-ups, Leg Pull-in, Toe Touches, Crunches, Reverse Crunches',
  'Bodyweight',
  NULL,
  3,
  '15 Reps jede Übung',
  NULL,
  'Beginner',
  '10 Reps',
  '20 Reps',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  47,
  'Row & Mixed',
  'Eigenes WOD',
  'ForTime',
  'For Time – absteigende Cals',
  'Air Squats, Row, KB Swings, Sit-ups, Push-ups, Burpees',
  'Rower, Kettlebell, Bodyweight',
  NULL,
  NULL,
  '50-25-30-20-10 / Cal Row',
  NULL,
  'Intermediate',
  'Leichtere KB / weniger Reps',
  'Mehr Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  48,
  'DB Complex 4 Rounds',
  'Eigenes WOD',
  'ForTime',
  '4 Rounds For Time',
  'Tuck Jumps, DB Hang Power Cleans, DB Push Press R/L, KB Lunges R/L',
  'Dumbbell, Kettlebell',
  NULL,
  4,
  '8 Reps jede Übung',
  NULL,
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  49,
  'Power Clean Ladder',
  'Eigenes WOD',
  'ForTime',
  'For Time – absteigende Runden mit Power Cleans',
  'Double Unders, Sit-ups, Power Cleans',
  'Jump Rope, Barbell, Bodyweight',
  NULL,
  NULL,
  '60-40-20 DU / Sit-ups / 5 PC',
  NULL,
  'Intermediate',
  'Singles statt DU / leichteres Gewicht',
  'Mehr Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  50,
  '666',
  'Eigenes WOD',
  'ForTime',
  '6 Rounds For Time',
  'Front Squats, Pull-ups, Bench Press, Deadlifts, Barbell Rows, Shoulder-to-Overhead',
  'Barbell, Pull-up Bar',
  NULL,
  6,
  '6 Reps jede Übung',
  NULL,
  'Advanced',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  51,
  'Blake',
  'Hero WOD',
  'ForTime',
  '4 Rounds For Time',
  'Overhead Walking Lunges, Box Jumps, Wall Ball, Handstand Push-ups',
  'Plate, Box, Wall Ball, Bodyweight',
  NULL,
  4,
  '100ft OWL / 30 BJ / 20 WB / 10 HSPU',
  '20',
  'Advanced',
  'Box HSPU / weniger Gewicht / kleinere Box',
  'Deficit HSPU / höhere Box',
  'WOD_Pläne.xlsx / Hero WOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  52,
  'Man Makers',
  'Eigenes WOD',
  'ForTime',
  '3-7 Rounds For Time',
  'Man Makers, DB Deadlifts, Single-Arm DB Snatches, Single-Arm Overhead Lunges, DB Swings',
  'Dumbbell',
  NULL,
  7,
  '10/20/30/40/50 Reps',
  NULL,
  'Advanced',
  'Leichteres Gewicht / weniger Runden',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  53,
  'KB Ski Chipper',
  'Eigenes WOD',
  'ForTime',
  'For Time – 4 Stationen mit Ski',
  'KB Snatches, Ski Erg, KB Goblet Squats, KB Clean & Press, KB Swings',
  'Kettlebell, Ski Erg',
  NULL,
  NULL,
  '40/20 Cal / 40 Reps je Station',
  '24',
  'Advanced',
  'Leichteres Gewicht / weniger Reps',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  54,
  'Jumping Lunges Ladder',
  'Eigenes WOD',
  'ForTime',
  'For Time – absteigende Runden',
  'Jumping Lunges, Sit-ups, Double Unders',
  'Jump Rope, Bodyweight',
  NULL,
  NULL,
  '50-40-30-20-10',
  NULL,
  'Intermediate',
  'Singles statt DU / normale Lunges',
  'Gewichtete Varianten',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  55,
  'Box Burpee AMRAP',
  'Eigenes WOD',
  'AMRAP',
  '10 Min AMRAP',
  'Burpees over Box, Sit-ups, Double Unders',
  'Box, Jump Rope, Bodyweight',
  10,
  NULL,
  '10 / 20 / 40',
  NULL,
  'Intermediate',
  'Singles statt DU / normale Burpees',
  'Höhere Box / mehr Reps',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  56,
  '8min AMRAP HSPU KB GHD',
  'Eigenes WOD',
  'AMRAP',
  '8 Min AMRAP',
  'Handstand Push-ups, KB Swings, GHD Sit-ups',
  'Kettlebell, GHD, Bodyweight',
  8,
  NULL,
  '4 / 8 / 12',
  '32',
  'Advanced',
  'Box HSPU / leichtere KB',
  'Deficit HSPU / schwerere KB',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  57,
  'Step-up Burpee Sit-up',
  'Eigenes WOD',
  'ForTime',
  '3 Rounds For Time',
  'Weighted Box Step-ups, Burpees, Sit-ups, Double Unders',
  'Box, Dumbbell, Jump Rope, Bodyweight',
  NULL,
  3,
  '20/20/20/60',
  '15',
  'Intermediate',
  'Leichteres Gewicht / Singles',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  58,
  'OHS C2B T2B Ladder',
  'Eigenes WOD',
  'ForTime',
  'For Time – steigende Runden',
  'Overhead Squats, Chest-to-Bar Pull-ups, Toes-to-Bar',
  'Barbell, Pull-up Bar',
  NULL,
  NULL,
  '10-8-6-4-2 OHS / 2-4-6-8-10 C2B & T2B',
  '65',
  'Advanced',
  'Leichteres Gewicht / Pull-ups / K2E',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  59,
  'Push-up Lunge Farmers',
  'Eigenes WOD',
  'ForTime',
  '5 Rounds For Time',
  'Push-ups, Front Rack Walking Lunges, Farmers Carry',
  'Barbell/Dumbbell, Kettlebell',
  NULL,
  5,
  '10 PU / 20 Lunges / 100m FC',
  NULL,
  'Intermediate',
  'Knie-Push-ups / leichteres Gewicht',
  'Gewichtete Push-ups / schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  60,
  'Parallette & Rope',
  'Eigenes WOD',
  'ForTime',
  '4 Rounds For Time',
  'Parallette HSPU, Over-the-Box Jumps, Rope Climbs, Double Unders, Squat Cleans',
  'Parallettes, Box, Rope, Jump Rope, Barbell',
  NULL,
  4,
  '10/20/4/60 DU/8 SC',
  '85',
  'Advanced',
  'Box HSPU / niedrigere Box / leichteres Gewicht',
  'Höheres Deficit / schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  61,
  'Jumping Jacks Pull-up Complex',
  'Eigenes WOD',
  'ForTime',
  '4 Rounds For Time',
  'Jumping Jacks, Pull-ups, Front Rack Lunges, Push-ups, KB Snatches',
  'Pull-up Bar, Barbell, Kettlebell, Bodyweight',
  NULL,
  4,
  '40/10/20/15/10',
  NULL,
  'Intermediate',
  'Ring Rows / leichteres Gewicht',
  'C2B / schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  62,
  'KB Swings Goblet 30-20-10',
  'Eigenes WOD',
  'ForTime',
  'For Time',
  'KB Swings, Goblet Squats, Sit-ups',
  'Kettlebell, Bodyweight',
  NULL,
  NULL,
  '30-20-10 KB / 60-40-20 Sit-ups',
  NULL,
  'Beginner',
  'Leichtere KB',
  'Schwerere KB',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  63,
  'Pull-up T2B Push-up Squat AMRAP',
  'Eigenes WOD',
  'AMRAP',
  '10 Min AMRAP',
  'Pull-ups, Toes-to-Bar, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  10,
  NULL,
  '10/10/15/20',
  NULL,
  'Intermediate',
  'Ring Rows / K2E / Knie-Push-ups',
  'C2B / gewichtete Varianten',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  64,
  'Bell',
  'Hero WOD',
  'ForTime',
  '3 Rounds For Time',
  'Deadlifts, Pull-ups, Front Squats',
  'Barbell, Pull-up Bar',
  NULL,
  3,
  '21/15/9',
  '85',
  'Advanced',
  'Leichteres Gewicht / Ring Rows',
  'Schwereres Gewicht / C2B',
  'WOD_Pläne.xlsx / Hero WOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  65,
  'Jump Squat DB Complex',
  'Eigenes WOD',
  'ForTime',
  '7 Rounds For Time',
  'Jump Squats, DB Hang Power Cleans, DB Push Press R/L',
  'Dumbbell, Bodyweight',
  NULL,
  7,
  '7 Reps je Übung',
  NULL,
  'Intermediate',
  'Leichteres Gewicht / normale Squats',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  66,
  'Dumbbell DT',
  'Other Benchmark',
  'ForTime',
  '5 Rounds For Time – Dumbbell Version von DT',
  'DB Deadlifts, DB Hang Power Cleans, DB Shoulder-to-Overhead',
  'Dumbbell',
  NULL,
  5,
  '12/9/6',
  '22.5',
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  67,
  'HSPU Deadlift Pull-up DU',
  'Eigenes WOD',
  'ForTime',
  '10 Rounds For Time',
  'Handstand Push-ups, Deadlifts, Pull-ups, Double Unders',
  'Barbell, Pull-up Bar, Bodyweight',
  NULL,
  10,
  '3/6/12/24',
  '100',
  'Advanced',
  'Box HSPU / leichteres Gewicht / Singles',
  'Deficit HSPU / schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  68,
  'Burpee Back Squat Row',
  'Eigenes WOD',
  'ForTime',
  '3 Rounds For Time',
  'Burpees, Back Squats, Row',
  'Barbell, Rower, Bodyweight',
  NULL,
  3,
  '15/10/25 Cal',
  '60',
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  69,
  'Dumbbell Fran',
  'Other Benchmark',
  'ForTime',
  '21-15-9 – Dumbbell Version',
  'DB Thrusters, Pull-ups',
  'Dumbbell, Pull-up Bar',
  NULL,
  3,
  '21-15-9',
  '20',
  'Intermediate',
  'Ring Rows / leichteres Gewicht',
  'Schwereres Gewicht / C2B',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  70,
  'Black and Blue',
  'Eigenes WOD',
  'ForTime',
  '5 Rounds For Time',
  'Power Cleans, Burpees',
  'Barbell, Bodyweight',
  NULL,
  5,
  '10/10',
  '60',
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  71,
  'Copey',
  'Other Benchmark',
  'ForTime',
  '21-15-9 Reps For Time',
  'Bench Presses, Deadlifts, Ring Dips',
  'Barbell, Rings',
  NULL,
  3,
  '21-15-9 (Bodyweight)',
  NULL,
  'Advanced',
  'Leichteres Gewicht / Box Dips',
  'Schwereres Gewicht / Weighted Dips',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  72,
  'T2B DU Squat Clean AMRAP',
  'Eigenes WOD',
  'AMRAP',
  '20 Min AMRAP',
  'Toes-to-Bar, Double Unders, Squat Cleans',
  'Pull-up Bar, Jump Rope, Barbell',
  20,
  NULL,
  '25/50/15',
  '60',
  'Advanced',
  'K2E / Singles / leichteres Gewicht',
  'Mehr Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  73,
  'KB Box T2B HSPU AMRAP 7',
  'Eigenes WOD',
  'AMRAP',
  '7 Min AMRAP',
  'KB Swings, Box Jumps, Toes-to-Bar, Strict HSPU',
  'Kettlebell, Box, Pull-up Bar, Bodyweight',
  7,
  NULL,
  '15/12/9/6',
  '24',
  'Advanced',
  'Leichtere KB / K2E / Box HSPU',
  'Schwerere KB / Deficit HSPU',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  74,
  'DB Cluster Burpee Plank Row',
  'Eigenes WOD',
  'AMRAP',
  '12 Min AMRAP',
  'DB Clusters, Burpees, DB Plank Rows',
  'Dumbbell, Bodyweight',
  12,
  NULL,
  '6/12/12',
  '12.5',
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  75,
  'Cindy Beginner',
  'Other Benchmark',
  'AMRAP',
  '10 Min AMRAP',
  'Kipping Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  10,
  NULL,
  '5/10/15',
  NULL,
  'Beginner',
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Varianten',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  76,
  'DB Thruster Burpee 21-15-9',
  'Eigenes WOD',
  'ForTime',
  'For Time: 21-15-9',
  'DB Thrusters, Burpees',
  'Dumbbell, Bodyweight',
  NULL,
  3,
  '21-15-9',
  NULL,
  'Intermediate',
  'Leichteres Gewicht / weniger Reps',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  77,
  'DB Power Snatch Jumping Jack',
  'Eigenes WOD',
  'ForTime',
  '3 Rounds For Time',
  'Jumping Jacks, DB Power Snatches',
  'Dumbbell, Bodyweight',
  NULL,
  3,
  '50/25',
  NULL,
  'Beginner',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  78,
  '10 Rounds Pull Push Squat',
  'Eigenes WOD',
  'ForTime',
  '10 Rounds For Time',
  'Jumping Jacks, Push-ups, Pull-ups',
  'Pull-up Bar, Bodyweight',
  NULL,
  10,
  '15/10/5',
  NULL,
  'Beginner',
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Varianten',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  79,
  'Thruster Pull-up 21-15-9',
  'Other Benchmark',
  'ForTime',
  'For Time: 21-15-9 (Fran-Variante)',
  '(DB) Thrusters, Pull-ups',
  'Barbell/Dumbbell, Pull-up Bar',
  NULL,
  3,
  '21-15-9',
  NULL,
  'Intermediate',
  'Ring Rows / leichteres Gewicht',
  'Schwereres Gewicht / C2B',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  80,
  'Back Squat Push-up EMOM 14',
  'Eigenes WOD',
  'EMOM',
  '14 Min EMOM',
  'Back Squats, Push-ups',
  'Barbell, Bodyweight',
  14,
  14,
  '3 Squats / 15 Push-ups',
  NULL,
  'Intermediate',
  'Leichteres Gewicht / Knie-Push-ups',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  81,
  'Row KB T2B AMRAP 10',
  'Eigenes WOD',
  'AMRAP',
  '10 Min AMRAP',
  'Row, KB Swings, Toes-to-Bar',
  'Rower, Kettlebell, Pull-up Bar',
  10,
  NULL,
  '15 Cal / 12 KB / 9 T2B',
  '24',
  'Intermediate',
  'Leichtere KB / K2E',
  'Schwerere KB',
  'WOD_Pläne.xlsx'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  82,
  'DB Thruster Burpee Lunge Press',
  'HomeWOD',
  'ForTime',
  '4 Rounds For Time',
  'DB Thrusters, DB Burpees, DB Lunges, DB Push Press',
  'Dumbbell, Bodyweight',
  NULL,
  4,
  '20 je Übung',
  NULL,
  'Intermediate',
  'Leichteres Gewicht / weniger Reps',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  83,
  'Row Wall Ball Devil Press',
  'HomeWOD',
  'ForTime',
  'For Time',
  'Row, Wall Ball, Devil Press',
  'Rower, Wall Ball, Dumbbell',
  NULL,
  NULL,
  '45-30-15 Cal / 30-30 WB / 15 DP',
  NULL,
  'Intermediate',
  'Leichteres Gewicht / weniger Cals',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  84,
  'Deadlift HSPU Ladder + Step-ups',
  'HomeWOD',
  'ForTime',
  '1-2-3...10 + Step-ups nach jeder Runde',
  'Deadlifts, HSPU, Box Step-ups',
  'Barbell, Box, Bodyweight',
  NULL,
  10,
  '1-10 / 5 Step-ups',
  NULL,
  'Advanced',
  'Box HSPU / leichteres Gewicht',
  'Deficit HSPU / schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  85,
  'Full Body Bodyweight 2 Rounds',
  'HomeWOD',
  'ForTime',
  '2 Rounds For Time',
  'Jumping Jacks, Push-ups, Sit-ups, Burpees, Air Squats, Leg Raises',
  'Bodyweight',
  NULL,
  2,
  '100/25/25/25/25/25',
  NULL,
  'Beginner',
  'Weniger Reps',
  'Mehr Reps / gewichtete Varianten',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  86,
  'Run Air Squat Lunge Burpee',
  'HomeWOD',
  'ForTime',
  'For Time',
  'Run, Air Squats, Lunges, Burpees, Toe Taps',
  'Bodyweight',
  NULL,
  NULL,
  '500m Run / 50/50/50/50 / 500m Run',
  NULL,
  'Beginner',
  '250m Run / weniger Reps',
  'Mehr Reps / schwerere Varianten',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  87,
  'Burpee Lunge Jumping Jack',
  'HomeWOD',
  'ForTime',
  'For Time',
  'Burpees, Reverse Lunges, Jumping Jacks',
  'Bodyweight',
  NULL,
  NULL,
  '32-42-52-42-32',
  NULL,
  'Beginner',
  'Weniger Reps',
  'Mehr Reps',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  88,
  'Burpee Sit-up Ski Ladder',
  'HomeWOD',
  'ForTime',
  '21-18-15-12-9 Reps',
  'Burpees, Sit-ups, Ski Erg',
  'Bodyweight, Ski Erg',
  NULL,
  NULL,
  '21-18-15-12-9',
  NULL,
  'Intermediate',
  'Weniger Reps / Row statt Ski',
  'Mehr Reps',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  89,
  'KB Horn Curl EMOM 10',
  'HomeWOD',
  'EMOM',
  '10 Min EMOM',
  'KB Horn Curls, KB Offset Push-ups, Russian Twists',
  'Kettlebell, Bodyweight',
  10,
  10,
  '8/6/8',
  NULL,
  'Beginner',
  'Leichtere KB',
  'Schwerere KB',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  90,
  'Burpee Jumping Jack Squat AMRAP',
  'HomeWOD',
  'AMRAP',
  '10 Min AMRAP',
  'Burpees, Jumping Jacks, Air Squats',
  'Bodyweight',
  10,
  NULL,
  '5/10/15',
  NULL,
  'Beginner',
  'Weniger Reps',
  'Mehr Reps / schwerere Varianten',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  91,
  'KB Swing Snatch Deadlift',
  'HomeWOD',
  'ForTime',
  '4 Rounds For Time',
  'KB Swings, Alternating KB Snatches, DB Deadlifts',
  'Kettlebell, Dumbbell',
  NULL,
  4,
  '20/20/20',
  NULL,
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  92,
  'T2B DB Clean Jerk Burpee AMRAP',
  'HomeWOD',
  'AMRAP',
  '21 Min AMRAP',
  'Toes-to-Bar, DB Hang Clean & Jerk, Burpees',
  'Pull-up Bar, Dumbbell, Bodyweight',
  21,
  NULL,
  '8/10/12',
  NULL,
  'Intermediate',
  'K2E / leichteres Gewicht',
  'Schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  93,
  'Burpee Lunge Sit-up AMRAP 12',
  'HomeWOD',
  'AMRAP',
  '12 Min AMRAP',
  'Burpees, Reverse Lunges, Sit-ups',
  'Bodyweight',
  12,
  NULL,
  '7/10/7',
  NULL,
  'Beginner',
  'Weniger Reps',
  'Mehr Reps / gewichtete Varianten',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  94,
  'Air Squat Push-up Plank',
  'HomeWOD',
  'ForTime',
  '3 Rounds For Time',
  'Air Squats, Push-ups, Plank',
  'Bodyweight',
  NULL,
  3,
  '70/30/1min',
  NULL,
  'Beginner',
  'Knie-Push-ups / kürzeres Plank',
  'Gewichtete Push-ups / längeres Plank',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  95,
  'Run DB Burpee Thruster Deadlift',
  'HomeWOD',
  'ForTime',
  '5 Rounds For Time',
  'Run, DB Burpees, DB Thrusters, DB Deadlifts',
  'Dumbbell, Bodyweight',
  NULL,
  5,
  '200m / 20/20/20',
  NULL,
  'Intermediate',
  '100m / leichteres Gewicht',
  'Schwereres Gewicht / mehr Reps',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  96,
  'Lunge V-up Dip',
  'HomeWOD',
  'ForTime',
  '5 Rounds For Time',
  'Reverse Lunges, Single Leg V-ups, Dips',
  'Bodyweight',
  NULL,
  5,
  '30/8/30/8',
  NULL,
  'Intermediate',
  'Normale V-ups / Box Dips',
  'Gewichtete Dips',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  97,
  'Run Burpee Squat Jump Sit-up 10 Rounds',
  'HomeWOD',
  'ForTime',
  '10 Rounds For Time',
  'Run, Burpees, Squat Jumps, Sit-ups',
  'Bodyweight',
  NULL,
  10,
  '100m / 10/10/10',
  NULL,
  'Intermediate',
  '50m / weniger Reps',
  'Mehr Reps / längere Distanz',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  98,
  'Pull-up DB Thruster Burpee 21-15-9',
  'HomeWOD',
  'ForTime',
  'For Time: 21-15-9',
  'Pull-ups, DB Thrusters, Burpees',
  'Pull-up Bar, Dumbbell, Bodyweight',
  NULL,
  3,
  '21-15-9',
  NULL,
  'Intermediate',
  'Ring Rows / leichteres Gewicht',
  'C2B / schwereres Gewicht',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  99,
  'Lunge Pull-up Push-up V-up Ladder',
  'HomeWOD',
  'ForTime',
  '10-9-8...1 Reps',
  'Lunges, Pull-ups, Push-ups, V-ups',
  'Pull-up Bar, Bodyweight',
  NULL,
  10,
  '10-1 jede Übung',
  NULL,
  'Intermediate',
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Varianten',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  100,
  'Row T2B Burpee 3 Rounds',
  'HomeWOD',
  'ForTime',
  '3 Rounds (3 Min Pause)',
  'Row, Toes-to-Bar, Burpees',
  'Rower, Pull-up Bar, Bodyweight',
  NULL,
  3,
  '40 Cal / 30 T2B / 20 Burpees',
  NULL,
  'Advanced',
  'Weniger Cals / K2E',
  'Mehr Cals / C2B',
  'WOD_Pläne.xlsx / HomeWOD'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  101,
  'Durante Core',
  'Core WOD',
  'ForTime',
  '5 Rounds ASAP mit 1 Min Pause',
  'Hollow Rocks, V-ups, Tuck-ups, Hollow Hold',
  'Bodyweight',
  NULL,
  5,
  '10/10/10/10sec',
  NULL,
  'Intermediate',
  'Weniger Reps / kürzerer Hold',
  'Mehr Reps',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  102,
  'Annie Core',
  'Core WOD',
  'ForTime',
  '50-40-30-20-10 For Time',
  'Double Unders, Sit-ups',
  'Jump Rope, Bodyweight',
  NULL,
  NULL,
  '50-40-30-20-10',
  NULL,
  'Intermediate',
  'Singles statt DU',
  'Unbroken Sets',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  103,
  'V-up Tuck Crunch Set',
  'Core WOD',
  'ForTime',
  '5 Sets, nicht auf Zeit',
  'V-ups, Tuck Crunches, Hollow Hold, Arch Hold',
  'Bodyweight',
  NULL,
  5,
  '20/15/20sec/20sec',
  NULL,
  'Beginner',
  'Weniger Reps / kürzere Holds',
  'Mehr Reps',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  104,
  'Handstand Plank Side Plank EMOM',
  'Core WOD',
  'EMOM',
  '5 Rounds – Handstand & Plank Holds',
  'Handstand Hold, Plank, Side Plank L/R',
  'Bodyweight',
  NULL,
  5,
  '20 Sek je Position',
  NULL,
  'Intermediate',
  'Kürzere Holds / Box HS',
  'Längere Holds / freier HS',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  105,
  'L-Sit Hollow Rock EMOM 10',
  'Core WOD',
  'EMOM',
  '10 Min EMOM',
  'L-Sit Hold, Hollow Rocks, Sit-ups',
  'Bodyweight',
  10,
  10,
  '20 Sek L-Sit / 20 Rocks / 20 Sit-ups',
  NULL,
  'Intermediate',
  'Kürzere Holds / Box L-Sit',
  'Längere Holds / gewichtet',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  106,
  'V-up Russian Twist Plank Set',
  'Core WOD',
  'ForTime',
  '4 Sets, nicht auf Zeit',
  'V-ups, Russian Twists, Plank, Hollow Hold, Arch Hold, L-Sit',
  'Bodyweight, Medball',
  NULL,
  4,
  '20/20/20sec/20sec/20sec/20sec',
  NULL,
  'Intermediate',
  'Weniger Reps / kürzere Holds',
  'Mehr Reps / längere Holds',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  107,
  'Russian Twist Around the World',
  'Core WOD',
  'ForTime',
  'For Time',
  'Russian Twists, Around the World with Plate',
  'Plate, Bodyweight',
  NULL,
  NULL,
  'Max Reps',
  NULL,
  'Beginner',
  'Leichtere Platte / ohne Gewicht',
  'Schwerere Platte',
  'WOD_Pläne.xlsx / Core WODs'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_11_1',
  '11.1',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 10 Min',
  'Double Unders, Power Snatches',
  'Jump Rope, Barbell',
  10,
  NULL,
  '30 DU / 15 Snatches',
  '34',
  'Intermediate',
  'Singles statt DU',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_11_2',
  '11.2',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 15 Min',
  'Deadlifts, Push-ups, Box Jumps',
  'Barbell, Box',
  15,
  NULL,
  '9/12/15',
  '70',
  'Intermediate',
  'Leichteres Gewicht / Knie-Push-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_11_3',
  '11.3',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 5 Min',
  'Squat Clean & Jerk',
  'Barbell',
  5,
  NULL,
  'Max Reps',
  '75',
  'Advanced',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_11_4',
  '11.4',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 10 Min',
  'Bar-facing Burpees, Overhead Squats, Muscle-ups',
  'Barbell, Rings',
  10,
  NULL,
  '60 BFB / 30 OHS / 10 MU',
  '54',
  'Advanced',
  'Box MU / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_11_5',
  '11.5',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 20 Min – Power Snatch Ladder',
  'Power Snatches, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  20,
  NULL,
  'Steigende Reps 3/6/9...',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_11_6',
  '11.6',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 7 Min – Thrusters & C2B',
  'Thrusters, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  7,
  NULL,
  '3 Runden, dann +3 Reps',
  '45',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2011'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_12_1',
  '12.1',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 7 Min',
  'Burpees to Target',
  'Bodyweight',
  7,
  NULL,
  'Max Reps',
  NULL,
  'Beginner',
  'Niedrigeres Ziel',
  'Höheres Ziel',
  'CrossFit Open 2012'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_12_2',
  '12.2',
  'CrossFit Open',
  'EMOM',
  'EMOM bis Versagen – OHS & C2B',
  'Overhead Squats, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  NULL,
  NULL,
  '10/10 → 12/12 → +2',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2012'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_12_3',
  '12.3',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 18 Min',
  'Box Jumps, Push Press, Toes-to-Bar',
  'Box, Barbell, Pull-up Bar',
  18,
  NULL,
  '15/12/9',
  '52',
  'Intermediate',
  'Leichteres Gewicht / K2E',
  'Schwereres Gewicht',
  'CrossFit Open 2012'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_12_4',
  '12.4',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 12 Min',
  'Wall Balls, Box Jumps, Muscle-ups',
  'Wall Ball, Box, Rings',
  12,
  NULL,
  '150 WB / 90 DU / 30 MU',
  '9',
  'Advanced',
  'Leichteres Gewicht / Box MU',
  'Schwereres Gewicht',
  'CrossFit Open 2012'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_12_5',
  '12.5',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 7 Min – Thrusters & C2B',
  'Thrusters, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  7,
  NULL,
  'Steigende Reps 3+3',
  '45',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2012'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_13_1',
  '13.1',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 17 Min',
  'Snatches, Burpees over Bar',
  'Barbell, Bodyweight',
  17,
  NULL,
  '30/30/30 Snatch / 30 Burpees',
  '34',
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2013'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_13_2',
  '13.2',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 10 Min',
  'Shoulder-to-Overhead, Deadlifts, Box Jumps',
  'Barbell, Box',
  10,
  NULL,
  '5/10/15',
  '52',
  'Intermediate',
  'Leichteres Gewicht / kleinere Box',
  'Schwereres Gewicht',
  'CrossFit Open 2013'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_13_3',
  '13.3',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 12 Min',
  'Wall Balls, Double Unders, Muscle-ups',
  'Wall Ball, Jump Rope, Rings',
  12,
  NULL,
  '150 WB / 90 DU / 30 MU',
  '9',
  'Advanced',
  'Leichteres Gewicht / Box MU / Singles',
  'Schwereres Gewicht',
  'CrossFit Open 2013'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_13_4',
  '13.4',
  'CrossFit Open',
  'ForTime',
  '7 Min AMRAP – Clean & Jerk Ladder',
  'Clean & Jerks',
  'Barbell',
  7,
  NULL,
  'Steigende Gewichte',
  '61',
  'Advanced',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2013'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_13_5',
  '13.5',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 4 Min erweiterbar',
  'Thrusters, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  4,
  NULL,
  '15/15 → verlängert',
  '45',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2013'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_14_1',
  '14.1',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 10 Min',
  'Double Unders, Power Snatches',
  'Jump Rope, Barbell',
  10,
  NULL,
  '30 DU / 15 Snatches',
  '34',
  'Intermediate',
  'Singles / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2014'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_14_2',
  '14.2',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 3 Min erweiterbar – OHS & C2B',
  'Overhead Squats, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  NULL,
  NULL,
  '10/10 → 12/12 → +2',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2014'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_14_3',
  '14.3',
  'CrossFit Open',
  'ForTime',
  '8 Min – Deadlift & Box Jump Ladder',
  'Deadlifts, Box Jumps',
  'Barbell, Box',
  8,
  NULL,
  '10-15-20-25-30-35 DL / 15 BJ',
  '61',
  'Advanced',
  'Leichteres Gewicht / kleinere Box',
  'Schwereres Gewicht',
  'CrossFit Open 2014'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_14_4',
  '14.4',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 14 Min',
  'Row, Toes-to-Bar, Wall Balls, Cleans, Muscle-ups',
  'Rower, Pull-up Bar, Wall Ball, Barbell, Rings',
  14,
  NULL,
  '60 Cal / 50 T2B / 40 WB / 30 PC / 20 MU',
  '61',
  'Advanced',
  'Leichteres Gewicht / Box MU / K2E',
  'Schwereres Gewicht',
  'CrossFit Open 2014'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_14_5',
  '14.5',
  'CrossFit Open',
  'ForTime',
  '21-18-15-12-9-6-3 Für Zeit',
  'Thrusters, Bar-facing Burpees',
  'Barbell, Bodyweight',
  NULL,
  NULL,
  '21-18-15-12-9-6-3',
  '43',
  'Advanced',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2014'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_15_1',
  '15.1',
  'CrossFit Open',
  'AMRAP',
  '9 Min AMRAP + 6 Min 1RM C&J',
  'Toes-to-Bar, Deadlifts, Snatches, Clean & Jerk',
  'Barbell, Pull-up Bar',
  15,
  NULL,
  '15 T2B / 10 DL / 5 Snatch',
  '52',
  'Advanced',
  'K2E / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2015'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_15_2',
  '15.2',
  'CrossFit Open',
  'AMRAP',
  'AMRAP 3 Min erweiterbar – OHS & C2B',
  'Overhead Squats, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  NULL,
  NULL,
  '10/10 → 12/12 → +2',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2015'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_15_3',
  '15.3',
  'CrossFit Open',
  'AMRAP',
  '14 Min AMRAP',
  'Muscle-ups, Squat Snatches, Wall Balls',
  'Rings, Barbell, Wall Ball',
  14,
  NULL,
  '7 MU / 50 WB / 100 DU',
  '61',
  'Advanced',
  'Box MU / leichteres Gewicht / Singles',
  'Schwereres Gewicht',
  'CrossFit Open 2015'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_15_4',
  '15.4',
  'CrossFit Open',
  'ForTime',
  '8 Min – C2B & Cleans Ladder',
  'Chest-to-Bar Pull-ups, Cleans',
  'Pull-up Bar, Barbell',
  8,
  NULL,
  '3/3 → 6/3 → 9/3 steigende Gewichte',
  '61',
  'Advanced',
  'Pull-ups / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2015'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_15_5',
  '15.5',
  'CrossFit Open',
  'ForTime',
  '21-18-15-12-9-6-3 Für Zeit',
  'Thrusters, Bar-facing Burpees',
  'Barbell, Bodyweight',
  NULL,
  NULL,
  '21-18-15-12-9-6-3',
  '43',
  'Advanced',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2015'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_16_1',
  '16.1',
  'CrossFit Open',
  'AMRAP',
  '20 Min AMRAP',
  'Overhead Walking Lunges, Bar-facing Burpees, C2B Pull-ups',
  'Barbell, Pull-up Bar',
  20,
  NULL,
  '25ft OWL / 8 BFB / 8 C2B',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2016'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_16_2',
  '16.2',
  'CrossFit Open',
  'AMRAP',
  '4 Min erweiterbar – T2B & DU & Squat Cleans',
  'Toes-to-Bar, Double Unders, Squat Cleans',
  'Pull-up Bar, Jump Rope, Barbell',
  4,
  NULL,
  '25 T2B / 50 DU / 15 SC',
  '61',
  'Advanced',
  'K2E / Singles / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2016'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_16_3',
  '16.3',
  'CrossFit Open',
  'AMRAP',
  '7 Min AMRAP',
  'Power Snatches, Bar-facing Burpees',
  'Barbell, Bodyweight',
  7,
  NULL,
  '10 Snatch / 10 BFB',
  '43',
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2016'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_16_4',
  '16.4',
  'CrossFit Open',
  'AMRAP',
  '13 Min AMRAP',
  'Deadlifts, Wall Balls, Row, HSPU',
  'Barbell, Wall Ball, Rower, Bodyweight',
  13,
  NULL,
  '55 DL / 55 WB / 55 Cal / 55 HSPU',
  '70',
  'Advanced',
  'Leichteres Gewicht / Box HSPU',
  'Schwereres Gewicht / Deficit HSPU',
  'CrossFit Open 2016'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_16_5',
  '16.5',
  'CrossFit Open',
  'ForTime',
  '21-18-15-12-9-6-3 Für Zeit',
  'Thrusters, Bar-facing Burpees',
  'Barbell, Bodyweight',
  NULL,
  NULL,
  '21-18-15-12-9-6-3',
  '43',
  'Advanced',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2016'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_17_1',
  '17.1',
  'CrossFit Open',
  'ForTime',
  '10 Rounds For Time',
  'Dumbbell Snatches, Box Jump-overs',
  'Dumbbell, Box',
  20,
  10,
  '10 DB Snatch / 15 BJO',
  '22',
  'Intermediate',
  'Leichteres Gewicht / kleinere Box',
  'Schwereres Gewicht',
  'CrossFit Open 2017'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_17_2',
  '17.2',
  'CrossFit Open',
  'AMRAP',
  '12 Min AMRAP',
  'DB Lunges, Bar Muscle-ups, Pull-ups',
  'Dumbbell, Pull-up Bar',
  12,
  NULL,
  '6 DB OHL / 4 BJ / 2 MU',
  '22',
  'Advanced',
  'Leichteres Gewicht / Pull-ups / Box MU',
  'Schwereres Gewicht',
  'CrossFit Open 2017'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_17_3',
  '17.3',
  'CrossFit Open',
  'AMRAP',
  '8 Min erweiterbar – C2B & Snatches',
  'Chest-to-Bar Pull-ups, Squat Snatches',
  'Pull-up Bar, Barbell',
  8,
  NULL,
  '3/3 → 3/3 steigende Gewichte',
  '43',
  'Advanced',
  'Pull-ups / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2017'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_17_4',
  '17.4',
  'CrossFit Open',
  'ForTime',
  '13 Min – 55 reps chipper',
  'Deadlifts, Wall Balls, Row, HSPU',
  'Barbell, Wall Ball, Rower, Bodyweight',
  13,
  NULL,
  '55/55/55 Cal/55',
  '70',
  'Advanced',
  'Leichteres Gewicht / Box HSPU',
  'Schwereres Gewicht',
  'CrossFit Open 2017'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_17_5',
  '17.5',
  'CrossFit Open',
  'ForTime',
  '33-27-21-15-9 Für Zeit',
  'Thrusters, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  NULL,
  NULL,
  '33-27-21-15-9',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2017'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_18_1',
  '18.1',
  'CrossFit Open',
  'AMRAP',
  '20 Min AMRAP',
  'Toes-to-Bar, DB Hang Clean & Jerk, Cal Row',
  'Pull-up Bar, Dumbbell, Rower',
  20,
  NULL,
  '8 T2B / 10 HCJ / 14 Cal',
  '22',
  'Intermediate',
  'K2E / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2018'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_18_2',
  '18.2',
  'CrossFit Open',
  'ForTime',
  '1-2-3-4-5-6-7-8-9-10-9-8...1 Für Zeit',
  'Deadlifts, Bar-facing Burpees',
  'Barbell, Bodyweight',
  10,
  NULL,
  '1-10-1 Ladder',
  '102',
  'Advanced',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2018'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_18_3',
  '18.3',
  'CrossFit Open',
  'AMRAP',
  '14 Min AMRAP',
  'Double Unders, OHS, Pull-ups, C2B, MU, Squat Snatches',
  'Jump Rope, Barbell, Pull-up Bar, Rings',
  14,
  NULL,
  '100 DU / 20 OHS / 100 DU / 12 BJ...',
  '43',
  'Advanced',
  'Singles / leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2018'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_18_4',
  '18.4',
  'CrossFit Open',
  'ForTime',
  '9 Min – Deadlifts & HSPU Chipper',
  'Deadlifts, Handstand Push-ups, Handstand Walk',
  'Barbell, Bodyweight',
  9,
  NULL,
  '21/21 → 15/15 → 9/9',
  '102',
  'Advanced',
  'Leichteres Gewicht / Box HSPU',
  'Deficit HSPU / Handstand Walk',
  'CrossFit Open 2018'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_18_5',
  '18.5',
  'CrossFit Open',
  'AMRAP',
  '7 Min erweiterbar – Thrusters & C2B',
  'Thrusters, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  7,
  NULL,
  'Steigende Reps 3+3',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2018'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_19_1',
  '19.1',
  'CrossFit Open',
  'AMRAP',
  '15 Min AMRAP',
  'Wall Balls, Cal Row',
  'Wall Ball, Rower',
  15,
  NULL,
  '19 WB / 19 Cal',
  '9',
  'Beginner',
  'Leichteres Gewicht / kleineres Ziel',
  'Schwereres Gewicht',
  'CrossFit Open 2019'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_19_2',
  '19.2',
  'CrossFit Open',
  'AMRAP',
  '4 Min erweiterbar – T2B & DU & Squat Cleans',
  'Toes-to-Bar, Double Unders, Squat Cleans',
  'Pull-up Bar, Jump Rope, Barbell',
  4,
  NULL,
  '25/50/15 → 25/50/13',
  '61',
  'Advanced',
  'K2E / Singles / leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2019'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_19_3',
  '19.3',
  'CrossFit Open',
  'ForTime',
  '200ft DB OHL, 50 Box Step-ups, 50 Strict HSPU, 200ft HS Walk',
  'DB Overhead Lunges, Box Step-ups, Strict HSPU, Handstand Walk',
  'Dumbbell, Box, Bodyweight',
  NULL,
  NULL,
  '200ft / 50 / 50 / 200ft',
  '22',
  'Advanced',
  'Leichteres Gewicht / Box HSPU / Knie-Push-ups',
  'Handstand Walk',
  'CrossFit Open 2019'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_19_4',
  '19.4',
  'CrossFit Open',
  'ForTime',
  '3 Rounds + 3 Rounds For Time',
  'Snatches, Bar-facing Burpees, OHS, C2B',
  'Barbell, Pull-up Bar',
  12,
  NULL,
  '3+3 Rounds steigende Gewichte',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2019'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_19_5',
  '19.5',
  'CrossFit Open',
  'ForTime',
  '33-27-21-15-9 Für Zeit',
  'Thrusters, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  NULL,
  NULL,
  '33-27-21-15-9',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2019'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_20_1',
  '20.1',
  'CrossFit Open',
  'ForTime',
  '10 Rounds For Time',
  'Ground-to-Overhead, Bar-facing Burpees',
  'Barbell, Bodyweight',
  15,
  10,
  '10 GTO / 10 BFB',
  '34',
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2020'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_20_2',
  '20.2',
  'CrossFit Open',
  'AMRAP',
  '20 Min AMRAP',
  'DB Thrusters, Toes-to-Bar, Box Jumps, Cal Row, Handstand Push-ups',
  'Dumbbell, Pull-up Bar, Box, Rower',
  20,
  NULL,
  '4/4/4/3',
  '22',
  'Advanced',
  'Leichteres Gewicht / K2E / Box HSPU',
  'Schwereres Gewicht / Deficit HSPU',
  'CrossFit Open 2020'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_20_3',
  '20.3',
  'CrossFit Open',
  'ForTime',
  '9 Min – Deadlifts & HSPU',
  'Deadlifts, Handstand Push-ups, Handstand Walk',
  'Barbell, Bodyweight',
  9,
  NULL,
  '21/21 → 15/15 → 9/9',
  '102',
  'Advanced',
  'Leichteres Gewicht / Box HSPU',
  'Handstand Walk',
  'CrossFit Open 2020'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_20_4',
  '20.4',
  'CrossFit Open',
  'ForTime',
  '20 Min – Box Jumps & Clean & Jerks Ladder',
  'Box Jumps, Clean & Jerks',
  'Box, Barbell',
  20,
  NULL,
  '30 BJ / 15 C&J steigende Gewichte',
  '43',
  'Advanced',
  'Leichteres Gewicht / Box Step-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2020'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_20_5',
  '20.5',
  'CrossFit Open',
  'AMRAP',
  '7 Min erweiterbar – Thrusters & C2B',
  'Thrusters, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  7,
  NULL,
  'Steigende Reps 3+3',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2020'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_21_1',
  '21.1',
  'CrossFit Open',
  'ForTime',
  '15 Min – Wall Walks & Double Unders Ladder',
  'Wall Walks, Double Unders',
  'Bodyweight, Jump Rope',
  15,
  NULL,
  '1/10 → 3/30 → 6/60 → 9/90 → 15/150 → 21/210',
  NULL,
  'Intermediate',
  'Weniger Reps / Singles',
  'Mehr Reps',
  'CrossFit Open 2021'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_21_2',
  '21.2',
  'CrossFit Open',
  'ForTime',
  '20 Min – DB Snatches & Box Jump-overs',
  'Dumbbell Snatches, Box Jump-overs',
  'Dumbbell, Box',
  20,
  NULL,
  '21/21 → 15/15 → 9/9',
  '22',
  'Intermediate',
  'Leichteres Gewicht / Step-overs',
  'Schwereres Gewicht',
  'CrossFit Open 2021'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_21_3',
  '21.3',
  'CrossFit Open',
  'ForTime',
  'Thrusters & Gymnastics Chipper',
  'Front Squats, Thrusters, Bar Muscle-ups, C2B, Pull-ups',
  'Barbell, Pull-up Bar',
  NULL,
  NULL,
  'Komplexe Ladder',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2021'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_22_1',
  '22.1',
  'CrossFit Open',
  'AMRAP',
  '15 Min AMRAP',
  'Wall Walks, DB Snatches, Box Jump-overs',
  'Dumbbell, Box, Bodyweight',
  15,
  NULL,
  '3/12/15',
  '22',
  'Intermediate',
  'Weniger Reps / leichteres Gewicht / kleinere Box',
  'Schwereres Gewicht',
  'CrossFit Open 2022'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_22_2',
  '22.2',
  'CrossFit Open',
  'ForTime',
  'Deadlifts & Bar-facing Burpees Ladder',
  'Deadlifts, Bar-facing Burpees',
  'Barbell, Bodyweight',
  NULL,
  NULL,
  '1-10-1 Ladder',
  '102',
  'Advanced',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2022'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_22_3',
  '22.3',
  'CrossFit Open',
  'ForTime',
  '12 Min – Gymnastics & Barbell Chipper',
  'Pull-ups, Box Jumps, Thrusters, C2B, Barbell Lunges, Bar MU',
  'Pull-up Bar, Box, Barbell',
  12,
  NULL,
  '12/12/6 → steigende Schwierigkeit',
  '43',
  'Advanced',
  'Pull-ups / leichteres Gewicht / Box MU',
  'Schwereres Gewicht',
  'CrossFit Open 2022'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_23_1',
  '23.1',
  'CrossFit Open',
  'AMRAP',
  '14 Min AMRAP',
  'Row, Toes-to-Bar, Wall Balls, Cleans, Muscle-ups',
  'Rower, Pull-up Bar, Wall Ball, Barbell, Rings',
  14,
  NULL,
  '60 Cal / 50 T2B / 40 WB / 30 PC / 20 MU',
  '61',
  'Advanced',
  'Leichteres Gewicht / K2E / Box MU',
  'Schwereres Gewicht',
  'CrossFit Open 2023'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_23_2',
  '23.2',
  'CrossFit Open',
  'ForTime',
  '15 Min – Thrusters & C2B Ladder',
  'Thrusters, Chest-to-Bar Pull-ups',
  'Barbell, Pull-up Bar',
  15,
  NULL,
  '21/21 → 15/15 → 9/9',
  '43',
  'Advanced',
  'Leichteres Gewicht / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2023'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_23_3',
  '23.3',
  'CrossFit Open',
  'ForTime',
  'Wall Walks, DB Snatches, Box Jump-overs Chipper',
  'Wall Walks, Dumbbell Snatches, Box Jump-overs',
  'Dumbbell, Box, Bodyweight',
  NULL,
  NULL,
  '5/10/20 → steigende Reps',
  '22',
  'Intermediate',
  'Weniger Reps / leichteres Gewicht',
  'Mehr Reps / schwereres Gewicht',
  'CrossFit Open 2023'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_24_1',
  '24.1',
  'CrossFit Open',
  'ForTime',
  '15 Min – DB Snatches & Burpees',
  'Dumbbell Snatches, Lateral Burpees over DB',
  'Dumbbell, Bodyweight',
  15,
  NULL,
  '21/21 → 15/15 → 9/9',
  '22',
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2024'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_24_2',
  '24.2',
  'CrossFit Open',
  'ForTime',
  '20 Min – Rower & Gymnastics Chipper',
  'Row, Chest-to-Bar Pull-ups, HSPUs, Barbell',
  'Rower, Pull-up Bar, Barbell',
  20,
  NULL,
  'Chipper mit steigenden Gewichten',
  '61',
  'Advanced',
  'Leichteres Gewicht / Box HSPU / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2024'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_24_3',
  '24.3',
  'CrossFit Open',
  'ForTime',
  '30 Min – OHS & Snatches Chipper',
  'Overhead Squats, Snatches, Bar Muscle-ups',
  'Barbell, Pull-up Bar',
  30,
  NULL,
  '30/20/10 steigende Gewichte',
  '43',
  'Advanced',
  'Leichteres Gewicht / C2B / Pull-ups',
  'Schwereres Gewicht',
  'CrossFit Open 2024'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_25_1',
  '25.1',
  'CrossFit Open',
  'AMRAP',
  '15 Min AMRAP – Burpees & DB Clean-to-OH',
  'Lateral Burpees over DB, DB Hang Clean-to-Overhead, Walking Lunges',
  'Dumbbell, Bodyweight',
  15,
  NULL,
  '3/3/30ft → +3 pro Runde',
  '22',
  'Intermediate',
  'Leichteres Gewicht',
  'Schwereres Gewicht',
  'CrossFit Open 2025'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_25_2',
  '25.2',
  'CrossFit Open',
  'ForTime',
  '12 Min – Pull-ups, DU, Thrusters Chipper',
  'Pull-ups, Double Unders, Thrusters, C2B, Bar Muscle-ups',
  'Pull-up Bar, Jump Rope, Barbell',
  12,
  NULL,
  '21/42/21 → 18/36/18 → 15/30/15',
  '43',
  'Advanced',
  'Pull-ups / Singles / leichteres Gewicht',
  'C2B / Bar MU / schwereres Gewicht',
  'CrossFit Open 2025'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  'open_25_3',
  '25.3',
  'CrossFit Open',
  'ForTime',
  'Heavy Chipper – Barbell & Gymnastics',
  'Thrusters, Bar Muscle-ups, Squat Snatches',
  'Barbell, Pull-up Bar',
  NULL,
  NULL,
  'Steigende Gewichte',
  '61',
  'Advanced',
  'Leichteres Gewicht / Pull-ups / C2B',
  'Schwereres Gewicht',
  'CrossFit Open 2025'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  174,
  'King Kong KB',
  'Home Gym',
  'ForTime',
  '4 Rounds For Time',
  'KB Deadlifts, KB Muscle Cleans, KB Front Squat, KB Jerk',
  'Kettlebell',
  20,
  4,
  '3/1/3/1',
  '32',
  'Advanced',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  175,
  'KB Bear Complex',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – KB Bear Complex',
  'KB Power Clean, KB Front Squat, KB Push Press, KB Back Squat, KB Push Press',
  'Kettlebell',
  20,
  5,
  '7 Komplexe pro Runde',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Runden',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  176,
  'Double KB Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – Double KB Version',
  'Double KB Front Squat, Double KB Push Press, Pull-ups',
  'Kettlebell, Pull-up Bar',
  20,
  NULL,
  '5/10/15',
  '16',
  'Intermediate',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  177,
  'KB Isabel',
  'Home Gym',
  'ForTime',
  '30 KB Snatches alternierend für Zeit',
  'Alternating KB Snatches',
  'Kettlebell',
  10,
  NULL,
  '30',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  178,
  'KB DT',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – KB Version von DT',
  'KB Deadlifts, KB Hang Cleans, KB Push Jerks',
  'Kettlebell',
  20,
  5,
  '12/9/6',
  '24',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB / beidseitig',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  179,
  'KB Grace',
  'Home Gym',
  'ForTime',
  '30 KB Clean & Jerk für Zeit',
  'KB Clean & Jerk alternierend',
  'Kettlebell',
  10,
  NULL,
  '30',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  180,
  'KB Hell',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time',
  'KB Swings, KB Goblet Squats, KB Push Press',
  'Kettlebell',
  20,
  5,
  '21/15/9',
  '24',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  181,
  'Kettlebell Mary',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – KB Version',
  'KB HSPU (Pike), KB Pistols, KB Swings',
  'Kettlebell, Bodyweight',
  20,
  NULL,
  '5/10/15',
  '24',
  'Advanced',
  'Box HSPU / Assisted Pistols / leichtere KB',
  'Deficit HSPU / echte Pistols / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  182,
  'KB Fran',
  'Home Gym',
  'ForTime',
  '21-15-9 KB Thrusters & Pull-ups',
  'KB Thrusters, Pull-ups',
  'Kettlebell, Pull-up Bar',
  10,
  3,
  '21-15-9',
  '16',
  'Intermediate',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  183,
  'KB Annie',
  'Home Gym',
  'ForTime',
  '50-40-30-20-10 KB Swings & Sit-ups',
  'KB Swings, Sit-ups',
  'Kettlebell, Bodyweight',
  15,
  NULL,
  '50-40-30-20-10',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  184,
  'KB Karen',
  'Home Gym',
  'ForTime',
  '150 KB Goblet Squats für Zeit',
  'KB Goblet Squats',
  'Kettlebell',
  15,
  NULL,
  '150',
  '24',
  'Intermediate',
  '100 Reps / leichtere KB',
  '200 Reps / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  185,
  'KB Nate',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – KB Version',
  'KB Clean & Jerk, Push-ups, Pull-ups',
  'Kettlebell, Pull-up Bar, Bodyweight',
  20,
  NULL,
  '2/4/8',
  '32',
  'Intermediate',
  'Leichtere KB / Ring Rows / Knie-Push-ups',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  186,
  'KB Death By',
  'Home Gym',
  'EMOM',
  'EMOM bis zum Versagen – KB Swing',
  'KB Swings',
  'Kettlebell',
  NULL,
  NULL,
  '1 mehr pro Minute starten bei 3',
  '24',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  187,
  'KB Helen',
  'Home Gym',
  'ForTime',
  '3 Rounds For Time – KB Version',
  'Run 400m / 50 KB Swings, KB Swings, Pull-ups',
  'Kettlebell, Pull-up Bar',
  15,
  3,
  '400m / 21 KB / 12 Pull-ups',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows / 200m',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  188,
  'KB Diane',
  'Home Gym',
  'ForTime',
  '21-15-9 KB Deadlifts & Push-ups',
  'KB Deadlifts (double), Push-ups',
  'Kettlebell, Bodyweight',
  10,
  3,
  '21-15-9',
  '32',
  'Intermediate',
  'Leichtere KB / Knie-Push-ups',
  'Schwerere KB / HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  189,
  'KB EMOM 20',
  'Home Gym',
  'EMOM',
  '20 Min EMOM – abwechselnd',
  'KB Swings, Push-ups',
  'Kettlebell, Bodyweight',
  20,
  20,
  'Ungerade: 15 KB / Gerade: 20 Push-ups',
  '24',
  'Beginner',
  'Leichtere KB / Knie-Push-ups',
  'Schwerere KB / HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  190,
  'KB Complex Chipper',
  'Home Gym',
  'ForTime',
  'For Time – KB Chipper',
  'KB Deadlifts, KB Hang Cleans, KB Front Squats, KB Push Press, KB Swings',
  'Kettlebell',
  20,
  NULL,
  '20 je Übung',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  191,
  'KB Elizabeth',
  'Home Gym',
  'ForTime',
  '21-15-9 KB Cleans & Pull-ups',
  'KB Cleans, Pull-ups',
  'Kettlebell, Pull-up Bar',
  10,
  3,
  '21-15-9',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  192,
  'KB Chipper 100',
  'Home Gym',
  'ForTime',
  'For Time – 100 Reps Chipper',
  'KB Swings, KB Goblet Squats, KB Push Press, KB Snatch',
  'Kettlebell',
  20,
  NULL,
  '25 je Übung',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  193,
  'Double KB DT',
  'Home Gym',
  'ForTime',
  '5 Rounds – Double KB DT',
  'Double KB Deadlifts, Double KB Hang Cleans, Double KB Push Jerks',
  'Kettlebell',
  20,
  5,
  '12/9/6',
  '16',
  'Advanced',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  194,
  'DB Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – Dumbbell Version',
  'DB Hang Power Cleans, DB Front Squats, Pull-ups',
  'Dumbbell, Pull-up Bar',
  20,
  NULL,
  '5/10/15',
  '15',
  'Intermediate',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  195,
  'DB Elizabeth',
  'Home Gym',
  'ForTime',
  '21-15-9 DB Cleans & Pull-ups',
  'DB Squat Cleans, Pull-ups',
  'Dumbbell, Pull-up Bar',
  10,
  3,
  '21-15-9',
  '22.5',
  'Intermediate',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  196,
  'DB Nancy',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – DB Version',
  'Run 400m, DB Overhead Squats',
  'Dumbbell, Bodyweight',
  20,
  5,
  '200m + 15 DB OHS',
  '15',
  'Intermediate',
  'Leichtere DB / weniger Reps / 200m',
  'Schwerere DB / 400m',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  197,
  'DB Diane',
  'Home Gym',
  'ForTime',
  '21-15-9 DB Deadlifts & HSPU',
  'DB Deadlifts, Handstand Push-ups',
  'Dumbbell, Bodyweight',
  10,
  3,
  '21-15-9',
  '22.5',
  'Advanced',
  'Leichtere DB / Box/Knie HSPU',
  'Schwerere DB / Deficit HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  198,
  'DB Isabel',
  'Home Gym',
  'ForTime',
  '30 DB Snatches alternierend für Zeit',
  'Alternating DB Snatches',
  'Dumbbell',
  10,
  NULL,
  '30',
  '22.5',
  'Intermediate',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  199,
  'DB Helen',
  'Home Gym',
  'ForTime',
  '3 Rounds For Time – DB Version',
  'Run 400m, DB Swings, Pull-ups',
  'Dumbbell, Pull-up Bar',
  15,
  3,
  '400m / 21 DB Swings / 12 Pull-ups',
  '22.5',
  'Intermediate',
  '200m / Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  200,
  'DB Kelly',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – DB Version',
  'Run 400m, DB Step-ups, DB Thrusters',
  'Dumbbell, Bodyweight',
  30,
  5,
  '400m / 24 Step-ups / 20 Thrusters',
  '15',
  'Intermediate',
  '200m / Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  201,
  'DB Mary',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – DB Version',
  'DB HSPU (Pike Push-ups), DB Pistols, Pull-ups',
  'Dumbbell, Pull-up Bar, Bodyweight',
  20,
  NULL,
  '5/10/15',
  '15',
  'Advanced',
  'Box HSPU / Assisted Pistols / Ring Rows',
  'Deficit HSPU / echte Pistols / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  202,
  'Dumbbell Bear',
  'Home Gym',
  'ForTime',
  '5 Rounds – DB Bear Complex',
  'DB Power Clean, DB Front Squat, DB Push Press, DB Back Squat, DB Push Press',
  'Dumbbell',
  20,
  5,
  '7 Komplexe pro Runde',
  '15',
  'Intermediate',
  'Leichtere DB / weniger Runden',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  203,
  'DB Nate',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – DB Version',
  'DB Clean & Jerk, Push-ups, Pull-ups',
  'Dumbbell, Pull-up Bar, Bodyweight',
  20,
  NULL,
  '2/4/8',
  '22.5',
  'Intermediate',
  'Leichtere DB / Ring Rows / Knie-Push-ups',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  204,
  'DB Annie',
  'Home Gym',
  'ForTime',
  '50-40-30-20-10 DB Snatches & Sit-ups',
  'Alternating DB Snatches, Sit-ups',
  'Dumbbell, Bodyweight',
  15,
  NULL,
  '50-40-30-20-10',
  '22.5',
  'Intermediate',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  205,
  'DB Murph',
  'Home Gym',
  'ForTime',
  'For Time – DB Murph',
  'Run 1 Mile, DB Thrusters, Pull-ups, Run 1 Mile',
  'Dumbbell, Pull-up Bar, Bodyweight',
  45,
  NULL,
  '50 DB Thrusters / 100 Pull-ups',
  '15',
  'Advanced',
  '500m / leichtere DB / Ring Rows',
  'Gewichtsweste / schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  206,
  'DB DT',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – DB Version',
  'DB Deadlifts, DB Hang Cleans, DB Shoulder-to-Overhead',
  'Dumbbell',
  20,
  5,
  '12/9/6',
  '22.5',
  'Intermediate',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  207,
  'DB Barbara',
  'Home Gym',
  'ForTime',
  '5 Rounds mit Pause – DB Version',
  'DB Deadlifts, DB Push Press, Sit-ups, Air Squats',
  'Dumbbell, Bodyweight',
  30,
  5,
  '20/20/30/40 + 3 Min Pause',
  '15',
  'Intermediate',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  208,
  'DB Karen',
  'Home Gym',
  'ForTime',
  '150 DB Goblet Squats für Zeit',
  'DB Goblet Squats',
  'Dumbbell',
  15,
  NULL,
  '150',
  '22.5',
  'Intermediate',
  '100 Reps / leichtere DB',
  '200 Reps / schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  209,
  'DB Angie',
  'Home Gym',
  'ForTime',
  '100 Reps je Übung für Zeit',
  'Pull-ups, DB Push Press, Sit-ups, DB Squats',
  'Dumbbell, Pull-up Bar, Bodyweight',
  30,
  NULL,
  '100/100/100/100',
  '15',
  'Intermediate',
  '50 Reps / Ring Rows / Leichtere DB',
  'C2B / Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  210,
  'Strict Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – Strict Version',
  'Strict Pull-ups, Strict Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  20,
  NULL,
  '5/10/15',
  NULL,
  'Intermediate',
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Pull-ups / Archer Push-ups',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  211,
  'Weighted Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – mit Gewichtsweste',
  'Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  20,
  NULL,
  '5/10/15',
  NULL,
  'Advanced',
  'Ohne Weste / Ring Rows',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  212,
  'Pull-up Pyramid',
  'Home Gym',
  'ForTime',
  '1-2-3-4-5-6-7-8-9-10-9-8-7-6-5-4-3-2-1 Pull-ups',
  'Pull-ups',
  'Pull-up Bar',
  20,
  NULL,
  'Pyramide 1-10-1',
  NULL,
  'Intermediate',
  'Ring Rows',
  'Gewichtete Pull-ups / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  213,
  'Strict Press Ladder',
  'Home Gym',
  'EMOM',
  'EMOM 10 Min – Pull-ups & Push-ups',
  'Strict Pull-ups, Strict Push-ups',
  'Pull-up Bar, Bodyweight',
  10,
  10,
  '5 Pull-ups / 10 Push-ups',
  NULL,
  'Intermediate',
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Pull-ups / Archer Push-ups',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  214,
  'C2B EMOM',
  'Home Gym',
  'EMOM',
  'EMOM 12 Min – Chest-to-Bar',
  'Chest-to-Bar Pull-ups, Push-ups',
  'Pull-up Bar, Bodyweight',
  12,
  12,
  '5 C2B / 15 Push-ups',
  NULL,
  'Advanced',
  'Pull-ups / Knie-Push-ups',
  'Gewichtete C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  215,
  'Angie Modified',
  'Home Gym',
  'ForTime',
  '100-75-50-25 Reps For Time',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  25,
  NULL,
  '100/75/50/25',
  NULL,
  'Advanced',
  'Weniger Reps / Ring Rows',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  216,
  'Murph Scaled',
  'Home Gym',
  'ForTime',
  'Partitionierter Murph',
  'Run 800m, Pull-ups, Push-ups, Air Squats, Run 800m',
  'Pull-up Bar, Bodyweight',
  40,
  NULL,
  '50/100/150',
  NULL,
  'Intermediate',
  '400m / weniger Reps / Ring Rows',
  'Voller Murph mit Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  217,
  'Murph Vest',
  'Hero WOD',
  'ForTime',
  'Murph mit Gewichtsweste',
  'Run 1 Mile, Pull-ups, Push-ups, Air Squats, Run 1 Mile',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  60,
  NULL,
  '100/200/300',
  NULL,
  'Advanced',
  'Ohne Weste / partitioniert',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  218,
  'Pull-up Burpee Chipper',
  'Home Gym',
  'ForTime',
  'For Time',
  'Pull-ups, Burpees, Sit-ups',
  'Pull-up Bar, Bodyweight',
  15,
  NULL,
  '30/30/30',
  NULL,
  'Intermediate',
  'Ring Rows / weniger Reps',
  'C2B / Burpee Pull-ups',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  219,
  'HSPU Ladder',
  'Home Gym',
  'ForTime',
  '10-9-8-7-6-5-4-3-2-1 HSPU & Pull-ups',
  'Handstand Push-ups, Pull-ups',
  'Pull-up Bar, Bodyweight',
  15,
  NULL,
  '10-1 Ladder',
  NULL,
  'Advanced',
  'Box HSPU / Ring Rows',
  'Deficit HSPU / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  220,
  'Weighted Murph',
  'Hero WOD',
  'ForTime',
  'Murph – 10kg Gewichtsweste',
  'Run 1 Mile, Pull-ups, Push-ups, Air Squats, Run 1 Mile',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  60,
  NULL,
  '100/200/300',
  '10',
  'Advanced',
  'Ohne Weste / partitioniert',
  'Schwerere Weste / unpartitioniert',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  221,
  'Vest Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – 10kg Weste',
  'Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  20,
  NULL,
  '5/10/15',
  '10',
  'Advanced',
  'Leichtere Weste / ohne Weste',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  222,
  'Vest Angie',
  'Home Gym',
  'ForTime',
  '100 je Übung mit Weste',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  30,
  NULL,
  '100/100/100/100',
  '10',
  'Advanced',
  'Ohne Weste / 50 Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  223,
  'Heavy Barbara',
  'Home Gym',
  'ForTime',
  '5 Rounds mit Weste & Pause',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  35,
  5,
  '20/30/40/50 + 3 Min Pause',
  '10',
  'Advanced',
  'Ohne Weste / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  224,
  'Vest Nicole',
  'Home Gym',
  'ForTime',
  '20 Min AMRAP – 400m + Max Pull-ups mit Weste',
  'Run 400m, Max Pull-ups',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  20,
  NULL,
  'Max Reps',
  '10',
  'Advanced',
  'Ohne Weste / 200m',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  225,
  'Tactical Chipper',
  'Home Gym',
  'ForTime',
  'For Time – Taktischer Chipper',
  'Pull-ups, Push-ups, Sit-ups, Air Squats, Burpees',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  20,
  NULL,
  '20/40/60/80/100',
  '10',
  'Advanced',
  'Ohne Weste / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  226,
  'Vest Fran',
  'Home Gym',
  'ForTime',
  '21-15-9 mit Gewichtsweste',
  'Pull-ups, Push-ups',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  10,
  3,
  '21-15-9',
  '10',
  'Advanced',
  'Ohne Weste / leichtere Bewegungen',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  227,
  'Grunt Work',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – mit Weste',
  'Burpees, Pull-ups, Air Squats',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  20,
  5,
  '10/10/20',
  '10',
  'Advanced',
  'Ohne Weste / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  228,
  'Sandbag Murph',
  'Home Gym',
  'ForTime',
  'Murph mit Sandbag',
  'Run 1 Mile, Sandbag Cleans, Push-ups, Air Squats, Run 1 Mile',
  'Sandbag, Bodyweight',
  50,
  NULL,
  '50/200/300',
  '20',
  'Advanced',
  '500m / leichterer Sandbag',
  'Schwererer Sandbag / Pull-ups',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  229,
  'Sandbag Fran',
  'Home Gym',
  'ForTime',
  '21-15-9 Sandbag Thrusters & Pull-ups',
  'Sandbag Thrusters, Pull-ups',
  'Sandbag, Pull-up Bar',
  12,
  3,
  '21-15-9',
  '20',
  'Intermediate',
  'Leichterer Sandbag / Ring Rows',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  230,
  'Sandbag DT',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – Sandbag Version',
  'Sandbag Deadlifts, Sandbag Cleans, Sandbag Shoulder-to-Overhead',
  'Sandbag',
  20,
  5,
  '12/9/6',
  '20',
  'Intermediate',
  'Leichterer Sandbag',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  231,
  'Sandbag Chipper',
  'Home Gym',
  'ForTime',
  'For Time – Sandbag Chipper',
  'Sandbag Carries, Sandbag Cleans, Sandbag Squats, Burpees',
  'Sandbag, Bodyweight',
  20,
  NULL,
  '100m Carry / 20 Cleans / 20 Squats / 20 Burpees',
  '20',
  'Intermediate',
  'Leichterer Sandbag / weniger Reps',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  232,
  'Sandbag Carry Ladder',
  'Home Gym',
  'ForTime',
  '10 Rounds For Time',
  'Sandbag Bear Hug Carry, Burpees',
  'Sandbag, Bodyweight',
  20,
  10,
  '50m Carry + 5 Burpees',
  '20',
  'Intermediate',
  'Leichterer Sandbag / weniger Runden',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  233,
  'Sandbag Grace',
  'Home Gym',
  'ForTime',
  '30 Sandbag Clean & Jerks für Zeit',
  'Sandbag Clean & Jerks',
  'Sandbag',
  12,
  NULL,
  '30',
  '20',
  'Intermediate',
  'Leichterer Sandbag / weniger Reps',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  234,
  'Sandbag EMOM',
  'Home Gym',
  'EMOM',
  '16 Min EMOM',
  'Sandbag Cleans, Burpees',
  'Sandbag, Bodyweight',
  16,
  16,
  'Ungerade: 5 Cleans / Gerade: 10 Burpees',
  '20',
  'Intermediate',
  'Leichterer Sandbag / weniger Reps',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  235,
  'Sandbag Helen',
  'Home Gym',
  'ForTime',
  '3 Rounds For Time – Sandbag Version',
  'Run 400m, Sandbag Cleans, Pull-ups',
  'Sandbag, Pull-up Bar',
  15,
  3,
  '400m / 21 Cleans / 12 Pull-ups',
  '20',
  'Intermediate',
  '200m / leichterer Sandbag / Ring Rows',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  236,
  'Sandbag Bear Complex',
  'Home Gym',
  'ForTime',
  '5 Rounds – Sandbag Bear Complex',
  'Sandbag Power Clean, Sandbag Front Squat, Sandbag Push Press, Sandbag Back Squat, Sandbag Push Press',
  'Sandbag',
  20,
  5,
  '7 Komplexe pro Runde',
  '20',
  'Advanced',
  'Leichterer Sandbag / weniger Runden',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  237,
  'Sandbag Karen',
  'Home Gym',
  'ForTime',
  '150 Sandbag Front Squats für Zeit',
  'Sandbag Front Squats',
  'Sandbag',
  15,
  NULL,
  '150',
  '20',
  'Intermediate',
  '100 Reps / leichterer Sandbag',
  '200 Reps / schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  238,
  'Sandbag Carry AMRAP',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP',
  'Sandbag Carry, Sandbag Cleans, Push-ups',
  'Sandbag, Bodyweight',
  12,
  NULL,
  '50m Carry / 5 Cleans / 10 Push-ups',
  '20',
  'Intermediate',
  'Leichterer Sandbag / Knie-Push-ups',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  239,
  'Sand & Steel',
  'Home Gym',
  'ForTime',
  '4 Rounds For Time',
  'Sandbag Cleans, Pull-ups, Burpees',
  'Sandbag, Pull-up Bar, Bodyweight',
  20,
  4,
  '10/10/15',
  '20',
  'Intermediate',
  'Leichterer Sandbag / Ring Rows',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  240,
  'KB & Pull-up Chipper',
  'Home Gym',
  'ForTime',
  'For Time',
  'KB Swings, Pull-ups, KB Goblet Squats, Push-ups, KB Snatches',
  'Kettlebell, Pull-up Bar, Bodyweight',
  20,
  NULL,
  '40/30/30/40/20',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows / Knie-Push-ups',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  241,
  'KB DB Couplet',
  'Home Gym',
  'AMRAP',
  '16 Min AMRAP',
  'KB Swings, DB Push Press',
  'Kettlebell, Dumbbell',
  16,
  NULL,
  '15 KB / 12 DB',
  '24/15',
  'Intermediate',
  'Leichtere Gewichte',
  'Schwerere Gewichte',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  242,
  'Home Gym Hero',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time',
  'KB Cleans, Pull-ups, DB Thrusters, Burpees',
  'Kettlebell, Dumbbell, Pull-up Bar, Bodyweight',
  25,
  5,
  '8/8/8/8',
  '24/15',
  'Advanced',
  'Leichtere Gewichte / Ring Rows / weniger Reps',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  243,
  'Vest KB AMRAP',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – mit Weste',
  'KB Swings, Pull-ups, KB Goblet Squats',
  'Kettlebell, Pull-up Bar, Gewichtsweste',
  20,
  NULL,
  '15/10/15',
  '24',
  'Advanced',
  'Ohne Weste / leichtere KB / Ring Rows',
  'Schwerere Weste / schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  244,
  'Triple Threat',
  'Home Gym',
  'ForTime',
  '3 Rounds For Time',
  'KB Snatches, DB Thrusters, Pull-ups',
  'Kettlebell, Dumbbell, Pull-up Bar',
  15,
  3,
  '15/12/9',
  '24/15',
  'Intermediate',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  245,
  'Sandbag & Pull-up',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Sandbag Cleans, Pull-ups, Push-ups',
  'Sandbag, Pull-up Bar, Bodyweight',
  15,
  NULL,
  '6/6/12',
  '20',
  'Intermediate',
  'Leichterer Sandbag / Ring Rows / Knie-Push-ups',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  246,
  'Home Gym Filthy',
  'Home Gym',
  'ForTime',
  '50 Reps von 10 Übungen',
  'Burpees, Pull-ups, KB Swings, Lunges, K2E, DB Push Press, Sit-ups, KB Goblet Squats, Push-ups, Double Unders',
  'Kettlebell, Dumbbell, Pull-up Bar, Jump Rope, Bodyweight',
  30,
  NULL,
  '50 jede',
  '24',
  'Intermediate',
  '25 Reps / leichtere Gewichte',
  '75 Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  247,
  'Full House',
  'Home Gym',
  'ForTime',
  'For Time – Alles dabei',
  'KB Deadlifts, DB Snatches, Pull-ups, Sandbag Cleans, Burpees',
  'Kettlebell, Dumbbell, Pull-up Bar, Sandbag, Bodyweight',
  20,
  NULL,
  '15/15/15/10/20',
  '24/22.5/20',
  'Advanced',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  248,
  '100 Burpees',
  'Other Benchmark',
  'ForTime',
  '100 Burpees für Zeit',
  'Burpees',
  'Bodyweight',
  15,
  NULL,
  '100',
  NULL,
  'Intermediate',
  '50 Burpees',
  '150 Burpees / Vest',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  249,
  'Fight Gone Bad BW',
  'Other Benchmark',
  'ForTime',
  '3 Rounds à 1 Min pro Station',
  'Burpees, Air Squats, Push-ups, Sit-ups, Jumping Jacks',
  'Bodyweight',
  17,
  3,
  'Max Reps je Station',
  NULL,
  'Beginner',
  'Weniger Runden',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  250,
  'Bodyweight DT',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – Bodyweight Version',
  'Good Mornings, Clapping Push-ups, Air Squats',
  'Bodyweight',
  15,
  5,
  '12/9/6',
  NULL,
  'Intermediate',
  'Knie-Push-ups / weniger Reps',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  251,
  'Air Squat Century',
  'Home Gym',
  'ForTime',
  '100 Air Squats für Zeit',
  'Air Squats',
  'Bodyweight',
  5,
  NULL,
  '100',
  NULL,
  'Beginner',
  '50 Squats',
  '150 Squats / Vest',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  252,
  'Burpee Mile',
  'Home Gym',
  'ForTime',
  '1 Meile Burpee Broad Jumps',
  'Burpee Broad Jumps',
  'Bodyweight',
  60,
  NULL,
  'Max Distance',
  NULL,
  'Advanced',
  '400m',
  'Mit Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  253,
  'Push-up Century',
  'Home Gym',
  'ForTime',
  '100 Push-ups für Zeit',
  'Push-ups',
  'Bodyweight',
  10,
  NULL,
  '100',
  NULL,
  'Beginner',
  '50 Knie Push-ups',
  'Archer Push-ups',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  254,
  'Strict Gymnastics EMOM',
  'Home Gym',
  'EMOM',
  '10 Min EMOM',
  'Strict Pull-ups, Strict Dips',
  'Pull-up Bar, Bodyweight',
  10,
  10,
  '5 Pull-ups / 10 Dips',
  NULL,
  'Intermediate',
  'Ring Rows / Box Dips',
  'Gewichtete Pull-ups / Gewichtete Dips',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  255,
  'L-Sit Tabata',
  'Home Gym',
  'Tabata',
  'Tabata L-Sit & Push-ups',
  'L-Sit Hold, Push-ups',
  'Pull-up Bar, Bodyweight',
  8,
  16,
  '20 Sek / 10 Sek',
  NULL,
  'Intermediate',
  'Tuck Hold / Knie-Push-ups',
  'Längeres Hold / Archer Push-ups',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  256,
  'Calisthenic Chipper',
  'Home Gym',
  'ForTime',
  'For Time – Bodyweight Chipper',
  'Pull-ups, Dips, Push-ups, Sit-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  20,
  NULL,
  '25/50/75/100/125',
  NULL,
  'Intermediate',
  'Ring Rows / Box Dips / weniger Reps',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  257,
  'HSPU Karen',
  'Home Gym',
  'ForTime',
  '150 Handstand Push-ups für Zeit',
  'Handstand Push-ups',
  'Bodyweight',
  20,
  NULL,
  '150',
  NULL,
  'Advanced',
  '75 Box/Knie HSPU',
  'Deficit HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  258,
  'Pistol & Pull Couplet',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Pistol Squats, Pull-ups',
  'Pull-up Bar, Bodyweight',
  15,
  NULL,
  '5/10',
  NULL,
  'Advanced',
  'Assisted Pistols / Ring Rows',
  'Gewichtete Pistols / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  259,
  'Burpee Box Jump BW',
  'Home Gym',
  'ForTime',
  '10 Rounds For Time',
  'Burpees, Jump Squats',
  'Bodyweight',
  15,
  10,
  '10/10',
  NULL,
  'Intermediate',
  'Weniger Reps / Knie-Burpees',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  260,
  'Tabata This BW',
  'Home Gym',
  'Tabata',
  'Tabata 8 Stationen',
  'Burpees, Air Squats, Push-ups, Sit-ups',
  'Bodyweight',
  16,
  32,
  '8x20/10 je Übung',
  NULL,
  'Beginner',
  'Knie-Push-ups / Knie-Burpees',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  261,
  'Bodyweight Baseline',
  'Home Gym',
  'ForTime',
  'For Time – Basis Test',
  'Run 500m, 40 Air Squats, 30 Sit-ups, 20 Push-ups, 10 Pull-ups',
  'Pull-up Bar, Bodyweight',
  10,
  NULL,
  '500m/40/30/20/10',
  NULL,
  'Beginner',
  '250m / Ring Rows / Knie-Push-ups',
  'Mit Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  262,
  'Griff',
  'Hero WOD',
  'ForTime',
  'Run 800m vorwärts, Run 400m rückwärts, Run 800m vorwärts, Run 400m rückwärts',
  'Run',
  'Bodyweight',
  25,
  NULL,
  '800m/400m/800m/400m',
  NULL,
  'Intermediate',
  'Kürzere Distanz',
  'Mit Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  263,
  'Ryan',
  'Hero WOD',
  'ForTime',
  '5 Rounds For Time',
  'Burpees über die Linie, Pull-ups',
  'Pull-up Bar, Bodyweight',
  20,
  5,
  '7 Bar Muscle-ups / 21 Burpees',
  NULL,
  'Advanced',
  'Pull-ups / Knie-Burpees',
  'Mit Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  264,
  'Lumberjack 20',
  'Hero WOD',
  'ForTime',
  '20 Reps von 8 Übungen',
  'KB Deadlifts, Burpees, KB Swings, Pull-ups, Sit-ups, KB Cleans, Push-ups, Air Squats',
  'Kettlebell, Pull-up Bar, Bodyweight',
  30,
  NULL,
  '20 jede',
  '32',
  'Advanced',
  'Leichtere KB / Ring Rows / weniger Reps',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  265,
  'Daniel',
  'Hero WOD',
  'ForTime',
  '50 Pull-ups, 400m Run, 21 KB Thrusters, 800m Run, 21 KB Thrusters, 400m Run, 50 Pull-ups',
  'Pull-ups, Run, KB Thrusters',
  'Kettlebell, Pull-up Bar, Bodyweight',
  35,
  NULL,
  '50/400m/21/800m/21/400m/50',
  '24',
  'Advanced',
  'Ring Rows / Leichtere KB / kürzere Distanz',
  'C2B / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  266,
  'Hansen',
  'Hero WOD',
  'ForTime',
  '5 Rounds For Time',
  'KB Swings, Burpees, Pull-ups',
  'Kettlebell, Pull-up Bar, Bodyweight',
  30,
  5,
  '30/30/30',
  '24',
  'Advanced',
  'Leichtere KB / Ring Rows / weniger Reps',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  267,
  'Severin',
  'Hero WOD',
  'AMRAP',
  '7 Min AMRAP',
  'KB Swings, Pull-ups, Push-ups',
  'Kettlebell, Pull-up Bar, Bodyweight',
  7,
  NULL,
  '10/5/15',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows / Knie-Push-ups',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  268,
  'Klepto',
  'Hero WOD',
  'ForTime',
  '5 Rounds For Time',
  'KB Swings, Pull-ups',
  'Kettlebell, Pull-up Bar',
  20,
  5,
  '25/25',
  '32',
  'Advanced',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  269,
  'McGhee',
  'Hero WOD',
  'AMRAP',
  '30 Min AMRAP',
  'KB Deadlifts, Burpees',
  'Kettlebell, Bodyweight',
  30,
  NULL,
  '5 KB Deadlifts / 13 Burpees',
  '70',
  'Advanced',
  'Leichtere KB / weniger Runden',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  270,
  'Tommy Mac',
  'Hero WOD',
  'AMRAP',
  '20 Min AMRAP',
  'DB Hang Squat Cleans, Pull-ups',
  'Dumbbell, Pull-up Bar',
  20,
  NULL,
  '8/10',
  '22.5',
  'Intermediate',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  271,
  'Josh K',
  'Hero WOD',
  'ForTime',
  '5 Rounds For Time',
  'Pull-ups, KB Swings, Burpees',
  'Kettlebell, Pull-up Bar, Bodyweight',
  20,
  5,
  '15/20/10',
  '24',
  'Intermediate',
  'Ring Rows / leichtere KB / weniger Reps',
  'C2B / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  272,
  'Ghost',
  'Hero WOD',
  'ForTime',
  '6 Rounds For Time',
  'Run 400m, Max Pull-ups, Max KB Swings',
  'Kettlebell, Pull-up Bar, Bodyweight',
  30,
  6,
  '400m / Max Reps',
  '24',
  'Advanced',
  '200m / Ring Rows / leichtere KB',
  'Gewichtsweste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  273,
  'KB Pyramid AMRAP',
  'Home Gym',
  'AMRAP',
  '16 Min AMRAP',
  'KB Swings, KB Cleans, KB Push Press',
  'Kettlebell',
  16,
  NULL,
  '5/5/5',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  274,
  'Pull & Push AMRAP',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  15,
  NULL,
  '7/14/21',
  NULL,
  'Intermediate',
  'Ring Rows / Knie-Push-ups',
  'C2B / Archer Push-ups',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  275,
  'DB AMRAP 12',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP',
  'DB Hang Power Cleans, DB Push Press, Sit-ups',
  'Dumbbell, Bodyweight',
  12,
  NULL,
  '8/8/16',
  '15',
  'Intermediate',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  276,
  'KB & BW AMRAP',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP',
  'KB Goblet Squats, Push-ups, KB Snatches, Sit-ups',
  'Kettlebell, Bodyweight',
  20,
  NULL,
  '10/15/5/20',
  '24',
  'Intermediate',
  'Leichtere KB / Knie-Push-ups',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  277,
  'Vest AMRAP',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP – mit Weste',
  'Pull-ups, Burpees, Air Squats',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  15,
  NULL,
  '5/10/15',
  '10',
  'Advanced',
  'Ohne Weste / Ring Rows / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  278,
  'Home AMRAP 10',
  'Home Gym',
  'AMRAP',
  '10 Min AMRAP – klassisch',
  'Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  10,
  NULL,
  '5/10/15',
  NULL,
  'Beginner',
  'Ring Rows / Knie-Push-ups',
  'Gewichtsweste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  279,
  'DB Snatch AMRAP',
  'Home Gym',
  'AMRAP',
  '10 Min AMRAP',
  'Alternating DB Snatches, Burpees',
  'Dumbbell, Bodyweight',
  10,
  NULL,
  '10/5',
  '22.5',
  'Intermediate',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  280,
  'KB Triple AMRAP',
  'Home Gym',
  'AMRAP',
  '18 Min AMRAP',
  'KB Swings, KB Cleans, KB Snatches',
  'Kettlebell',
  18,
  NULL,
  '10/8/6',
  '24',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB / Double KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  281,
  'BW Classics AMRAP',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP',
  'Burpees, Sit-ups, Push-ups, Air Squats',
  'Bodyweight',
  20,
  NULL,
  '5/10/15/20',
  NULL,
  'Beginner',
  'Weniger Reps / Knie-Push-ups',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  282,
  'Sandbag AMRAP 15',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Sandbag Cleans, Pull-ups, Burpees',
  'Sandbag, Pull-up Bar, Bodyweight',
  15,
  NULL,
  '5/5/10',
  '20',
  'Intermediate',
  'Leichterer Sandbag / Ring Rows',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  283,
  'KB EMOM 30',
  'Home Gym',
  'EMOM',
  '30 Min EMOM – 3 Stationen',
  'KB Swings, Push-ups, Air Squats',
  'Kettlebell, Bodyweight',
  30,
  30,
  'Min 1: 20 KB / Min 2: 15 Push-ups / Min 3: 20 Squats',
  '24',
  'Intermediate',
  'Leichtere KB / Knie-Push-ups / weniger Reps',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  284,
  'Pull-up EMOM 10',
  'Home Gym',
  'EMOM',
  '10 Min EMOM',
  'Pull-ups, Burpees',
  'Pull-up Bar, Bodyweight',
  10,
  10,
  '5 Pull-ups / 5 Burpees',
  NULL,
  'Beginner',
  'Ring Rows / weniger Reps',
  'C2B / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  285,
  'DB EMOM 16',
  'Home Gym',
  'EMOM',
  '16 Min EMOM – 4 Stationen',
  'DB Deadlifts, DB Push Press, DB Rows, DB Squats',
  'Dumbbell',
  16,
  16,
  '8 Reps je Station',
  '15',
  'Intermediate',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  286,
  'Sandbag EMOM 12',
  'Home Gym',
  'EMOM',
  '12 Min EMOM',
  'Sandbag Cleans, Push-ups',
  'Sandbag, Bodyweight',
  12,
  12,
  'Ungerade: 5 Cleans / Gerade: 15 Push-ups',
  '20',
  'Intermediate',
  'Leichterer Sandbag / Knie-Push-ups',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  287,
  'Vest EMOM 20',
  'Home Gym',
  'EMOM',
  '20 Min EMOM – mit Weste',
  'Pull-ups, Air Squats',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  20,
  20,
  'Ungerade: 7 Pull-ups / Gerade: 20 Squats',
  '10',
  'Advanced',
  'Ohne Weste / Ring Rows / weniger Reps',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  288,
  'KB DB EMOM',
  'Home Gym',
  'EMOM',
  '12 Min EMOM – KB & DB',
  'KB Swings, DB Push Press, Pull-ups',
  'Kettlebell, Dumbbell, Pull-up Bar',
  12,
  12,
  'Min 1: 15 KB / Min 2: 12 DB / Min 3: 8 Pull-ups',
  '24/15',
  'Intermediate',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  289,
  'Death By KB',
  'Home Gym',
  'EMOM',
  'EMOM bis Versagen – KB Snatch',
  'KB Snatches alternierend',
  'Kettlebell',
  NULL,
  NULL,
  '1 mehr pro Minute starten bei 2',
  '24',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  290,
  'Death By Pull-ups & Burpees',
  'Home Gym',
  'EMOM',
  'EMOM bis Versagen – 2 Bewegungen',
  'Pull-ups, Burpees',
  'Pull-up Bar, Bodyweight',
  NULL,
  NULL,
  '1 Pull-up + 1 Burpee mehr pro Minute',
  NULL,
  'Intermediate',
  'Ring Rows',
  'C2B / Mit Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  291,
  'Strict EMOM 20',
  'Home Gym',
  'EMOM',
  '20 Min EMOM – Strict Gymnastics',
  'Strict Pull-ups, Strict Push-ups, L-Sit Hold',
  'Pull-up Bar, Bodyweight',
  20,
  20,
  'Min 1: 5 / Min 2: 10 / Min 3: 20 Sek L-Sit',
  NULL,
  'Intermediate',
  'Ring Rows / Knie-Push-ups / Tuck Hold',
  'Gewichtete Pull-ups',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  292,
  'KB EMOM komplexer',
  'Home Gym',
  'EMOM',
  '24 Min EMOM – 4 Stationen',
  'KB Swings, KB Cleans, KB Snatches, KB Thrusters',
  'Kettlebell',
  24,
  24,
  '10 Reps je Station rotierend',
  '24',
  'Advanced',
  'Leichtere KB / weniger Reps',
  'Schwerere KB / Double KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  293,
  '10 Rounds Grind',
  'Home Gym',
  'ForTime',
  '10 Rounds For Time',
  'KB Swings, Pull-ups, Burpees',
  'Kettlebell, Pull-up Bar, Bodyweight',
  20,
  10,
  '10/5/10',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows / weniger Reps',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  294,
  'The Pyramid',
  'Home Gym',
  'ForTime',
  '1-2-3-4-5-6-7-8-9-10 Reps',
  'Pull-ups, DB Thrusters',
  'Dumbbell, Pull-up Bar',
  15,
  NULL,
  'Pyramide 1-10',
  '15',
  'Intermediate',
  'Ring Rows / leichtere DB',
  'C2B / schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  295,
  'Vest Chipper',
  'Home Gym',
  'ForTime',
  'For Time – mit Gewichtsweste',
  'Pull-ups, Burpees, Air Squats, Sit-ups, Push-ups',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  20,
  NULL,
  '30/40/50/60/70',
  '10',
  'Advanced',
  'Ohne Weste / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  296,
  'KB Descending',
  'Home Gym',
  'ForTime',
  '21-18-15-12-9-6-3 Für Zeit',
  'KB Swings, Burpees',
  'Kettlebell, Bodyweight',
  20,
  NULL,
  '21-18-15-12-9-6-3',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Runden',
  'Schwerere KB / Vest',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  297,
  'Pull Push Squat',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time',
  'Pull-ups, Push-ups, Air Squats, KB Swings',
  'Kettlebell, Pull-up Bar, Bodyweight',
  20,
  5,
  '10/20/30/15',
  '24',
  'Intermediate',
  'Ring Rows / Knie-Push-ups / leichtere KB',
  'C2B / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  298,
  'Double Under Alt',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – ohne Rope',
  'Jumping Jacks, Burpees, Pull-ups',
  'Pull-up Bar, Bodyweight',
  15,
  5,
  '50/10/10',
  NULL,
  'Beginner',
  'Weniger Jumping Jacks / Ring Rows',
  'Mehr Reps / Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  299,
  'KB 21-15-9 Triplet',
  'Home Gym',
  'ForTime',
  '21-15-9 – KB Triplet',
  'KB Deadlifts, KB Cleans, KB Front Squats',
  'Kettlebell',
  12,
  3,
  '21-15-9',
  '24',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB / Double KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  300,
  'DB Ascending',
  'Home Gym',
  'ForTime',
  '3-6-9-12-15 Für Zeit',
  'DB Hang Cleans, DB Push Press, Pull-ups',
  'Dumbbell, Pull-up Bar',
  15,
  NULL,
  '3-6-9-12-15',
  '15',
  'Intermediate',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  301,
  'Sandbag 5x5',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – 5 Übungen',
  'Sandbag Cleans, Sandbag Squats, Pull-ups, Push-ups, Burpees',
  'Sandbag, Pull-up Bar, Bodyweight',
  20,
  5,
  '5 je Übung',
  '20',
  'Intermediate',
  'Leichterer Sandbag / Ring Rows / weniger Reps',
  'Schwererer Sandbag / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  302,
  'Couplet Sprint',
  'Home Gym',
  'ForTime',
  '10 Rounds For Time – Couplet',
  'Burpees, Air Squats',
  'Bodyweight',
  10,
  10,
  '5/15',
  NULL,
  'Beginner',
  'Weniger Reps',
  'Gewichtsweste / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  303,
  'KB 100s',
  'Home Gym',
  'ForTime',
  '100 Reps von 4 Übungen',
  'KB Swings, KB Goblet Squats, KB Push Press, KB Snatches',
  'Kettlebell',
  20,
  NULL,
  '100 je Übung',
  '16',
  'Advanced',
  '50 Reps / leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  304,
  'Iron Mike',
  'Home Gym',
  'ForTime',
  '10-8-6-4-2 Für Zeit',
  'KB Snatches, Pull-ups, Burpees',
  'Kettlebell, Pull-up Bar, Bodyweight',
  15,
  NULL,
  '10-2 je Übung',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  305,
  'KB Tabata',
  'Home Gym',
  'Tabata',
  'Tabata KB Swings & Goblet Squats',
  'KB Swings, KB Goblet Squats',
  'Kettlebell',
  8,
  16,
  '8 Runden à 20/10 Sek',
  '24',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  306,
  'Pull-up Tabata',
  'Home Gym',
  'Tabata',
  'Tabata Pull-ups & Push-ups',
  'Pull-ups, Push-ups',
  'Pull-up Bar, Bodyweight',
  8,
  16,
  '8 Runden à 20/10 Sek',
  NULL,
  'Intermediate',
  'Ring Rows / Knie-Push-ups',
  'Gewichtete Pull-ups',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  307,
  'Burpee Tabata',
  'Home Gym',
  'Tabata',
  'Tabata Burpees & Sit-ups',
  'Burpees, Sit-ups',
  'Bodyweight',
  8,
  16,
  '8 Runden à 20/10 Sek',
  NULL,
  'Beginner',
  'Knie-Burpees',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  308,
  'DB Tabata',
  'Home Gym',
  'Tabata',
  'Tabata DB Snatches & Thrusters',
  'DB Snatches, DB Thrusters',
  'Dumbbell',
  8,
  16,
  '8 Runden à 20/10 Sek',
  '15',
  'Intermediate',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  309,
  'Full Body Tabata',
  'Home Gym',
  'Tabata',
  'Tabata – 4 Stationen à 8 Runden',
  'Air Squats, Push-ups, Sit-ups, Burpees',
  'Bodyweight',
  16,
  32,
  '8 Runden à 20/10 Sek je Übung',
  NULL,
  'Beginner',
  'Weniger Stationen / Knie-Push-ups',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  310,
  'KB Pull Tabata',
  'Home Gym',
  'Tabata',
  'Tabata KB Swings & Pull-ups',
  'KB Swings, Pull-ups',
  'Kettlebell, Pull-up Bar',
  8,
  16,
  '8 Runden à 20/10 Sek',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  311,
  'Vest Tabata',
  'Home Gym',
  'Tabata',
  'Tabata mit Gewichtsweste',
  'Burpees, Air Squats',
  'Bodyweight, Gewichtsweste',
  8,
  16,
  '8 Runden à 20/10 Sek',
  '10',
  'Advanced',
  'Ohne Weste',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  312,
  'Sandbag Tabata',
  'Home Gym',
  'Tabata',
  'Tabata Sandbag Cleans & Squats',
  'Sandbag Cleans, Sandbag Front Squats',
  'Sandbag',
  8,
  16,
  '8 Runden à 20/10 Sek',
  '20',
  'Intermediate',
  'Leichterer Sandbag',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  313,
  '20.1 Home',
  'CrossFit Open',
  'ForTime',
  '10 Rounds For Time – Home Version',
  'Burpees, DB Snatches alternierend',
  'Dumbbell, Bodyweight',
  15,
  10,
  '10 Burpees / 10 DB Snatches',
  '22.5',
  'Intermediate',
  'Leichtere DB / weniger Runden',
  'Schwerere DB',
  'CrossFit Open 2020'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  314,
  '21.1 Home',
  'CrossFit Open',
  'ForTime',
  '15 Min – Wall Walks & Double Unders Alt',
  'Wall Walks, Jumping Jacks',
  'Bodyweight',
  15,
  NULL,
  '1/10 → 3/30 → 6/60 → ...',
  NULL,
  'Intermediate',
  'Weniger Reps',
  'Mehr Reps',
  'CrossFit Open 2021'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  315,
  '22.1 Home',
  'CrossFit Open',
  'AMRAP',
  '15 Min AMRAP – Home Version',
  'Wall Walks, DB Snatches, Box Jump-overs Alt',
  'Dumbbell, Bodyweight',
  15,
  NULL,
  '3/12/15',
  '22.5',
  'Intermediate',
  'Weniger Reps / leichtere DB',
  'Schwerere DB',
  'CrossFit Open 2022'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  316,
  '24.1 Home',
  'CrossFit Open',
  'ForTime',
  '15 Min – Home Version',
  'DB Snatches, Lateral Burpees',
  'Dumbbell, Bodyweight',
  15,
  NULL,
  '21/21 → 15/15 → 9/9',
  '22.5',
  'Intermediate',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit Open 2024'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  317,
  '25.1 Home',
  'CrossFit Open',
  'AMRAP',
  '15 Min AMRAP – Home Version',
  'Burpees, DB Hang Clean-to-OH, Walking Lunges',
  'Dumbbell, Bodyweight',
  15,
  NULL,
  '3/3/30ft → +3 pro Runde',
  '22.5',
  'Intermediate',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit Open 2025'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  318,
  'KB Swing & Snatch Ladder',
  'Home Gym',
  'ForTime',
  '10-9-8-7-6-5-4-3-2-1 KB Swings & Snatches',
  'KB Swings, KB Snatches',
  'Kettlebell',
  15,
  NULL,
  '10-1 Ladder',
  '24',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  319,
  'KB Press Complex',
  'Home Gym',
  'EMOM',
  'EMOM 15 Min',
  'KB Push Press, KB Push Jerk, KB Snatch',
  'Kettlebell',
  15,
  15,
  '3/3/3 je Minute',
  '24',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  320,
  'KB Flow',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP – KB Flow',
  'KB Clean, KB Front Squat, KB Push Press, KB Snatch',
  'Kettlebell',
  15,
  NULL,
  '5 Komplexe',
  '24',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB / Double KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  321,
  'KB Swing Century',
  'Home Gym',
  'ForTime',
  '100 KB Swings für Zeit',
  'KB Swings',
  'Kettlebell',
  7,
  NULL,
  '100',
  '32',
  'Intermediate',
  'Leichtere KB / 50 Swings',
  'Schwerere KB / 150 Swings',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  322,
  'KB Two-Hand Angie',
  'Home Gym',
  'ForTime',
  '100 je Übung – KB Version',
  'KB Deadlifts, KB Push Press, KB Front Squats, KB Swings',
  'Kettlebell',
  25,
  NULL,
  '100/100/100/100',
  '24',
  'Advanced',
  '50 Reps / leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  323,
  'Double KB Fran',
  'Home Gym',
  'ForTime',
  '21-15-9 Double KB',
  'Double KB Thrusters, Pull-ups',
  'Kettlebell, Pull-up Bar',
  12,
  3,
  '21-15-9',
  '16',
  'Advanced',
  'Single KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  324,
  'KB Swing Tabata',
  'Home Gym',
  'Tabata',
  'Tabata KB Swings',
  'KB Swings',
  'Kettlebell',
  4,
  8,
  '8 Runden à 20/10 Sek',
  '32',
  'Intermediate',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  325,
  'KB 300',
  'Home Gym',
  'ForTime',
  '300 Reps KB Chipper',
  'KB Swings, KB Goblet Squats, KB Cleans, KB Push Press, KB Snatches, KB Thrusters',
  'Kettlebell',
  25,
  NULL,
  '50 je Übung',
  '16',
  'Advanced',
  '150 Reps / leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  326,
  'KB Grace & Kelly',
  'Home Gym',
  'ForTime',
  'KB Grace dann KB Kelly',
  'KB Clean & Jerks, Run 800m, KB Goblet Squats, Pull-ups',
  'Kettlebell, Pull-up Bar',
  25,
  NULL,
  '21 C&J / 800m / 30 Squats / 12 Pull-ups',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows / 400m',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  327,
  'KB Row Sub',
  'Home Gym',
  'ForTime',
  'Fight Gone Bad – KB Version',
  'KB Swings, KB Thrusters, KB Box Step-ups, KB Push Press, KB Snatches',
  'Kettlebell',
  17,
  3,
  'Max Reps je Station à 1 Min',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Runden',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  328,
  'DB Complex 5',
  'Home Gym',
  'ForTime',
  '5 Rounds – DB 5-Übungen-Komplex',
  'DB Deadlifts, DB Hang Cleans, DB Front Squats, DB Push Press, DB Romanian DL',
  'Dumbbell',
  20,
  5,
  '5 je Übung',
  '22.5',
  'Intermediate',
  'Leichtere DB / weniger Runden',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  329,
  'DB Swing & Snatch',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP',
  'DB Swings, DB Snatches alternierend, DB Push Press',
  'Dumbbell',
  12,
  NULL,
  '12/6/12',
  '15',
  'Intermediate',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  330,
  'DB Lunges EMOM',
  'Home Gym',
  'EMOM',
  'EMOM 10 Min',
  'DB Overhead Lunges, DB Push Press',
  'Dumbbell',
  10,
  10,
  '10 Lunges / 12 Push Press',
  '15',
  'Intermediate',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  331,
  'DB Ascending Ladder',
  'Home Gym',
  'ForTime',
  '2-4-6-8-10-12 Für Zeit',
  'DB Thrusters, Burpees',
  'Dumbbell, Bodyweight',
  15,
  NULL,
  'Aufsteigende Reps',
  '15',
  'Intermediate',
  'Leichtere DB / weniger Runden',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  332,
  'DB Cluster AMRAP',
  'Home Gym',
  'AMRAP',
  '10 Min AMRAP',
  'DB Clusters, Pull-ups, Burpees',
  'Dumbbell, Pull-up Bar, Bodyweight',
  10,
  NULL,
  '5/5/10',
  '15',
  'Intermediate',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  333,
  'DB Floor Press Circuit',
  'Home Gym',
  'ForTime',
  '4 Rounds For Time',
  'DB Floor Press, DB Bent-over Rows, DB Squats',
  'Dumbbell',
  15,
  4,
  '15/15/20',
  '15',
  'Beginner',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  334,
  'DB Man Maker AMRAP',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP',
  'DB Man Makers, Pull-ups',
  'Dumbbell, Pull-up Bar',
  12,
  NULL,
  '5/10',
  '15',
  'Intermediate',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  335,
  'DB Devil Press AMRAP',
  'Home Gym',
  'AMRAP',
  '10 Min AMRAP',
  'DB Devil Press, DB Front Squats',
  'Dumbbell',
  10,
  NULL,
  '5/10',
  '15',
  'Advanced',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  336,
  'DB 21s',
  'Home Gym',
  'ForTime',
  '21-15-9 DB Chipper',
  'DB Deadlifts, DB Hang Power Cleans, DB Push Jerks, DB Front Squats',
  'Dumbbell',
  15,
  NULL,
  '21-15-9 je',
  '15',
  'Intermediate',
  'Leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  337,
  'DB Cindy Plus',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – erweiterte Version',
  'Pull-ups, Push-ups, DB Front Squats, DB Push Press',
  'Dumbbell, Pull-up Bar, Bodyweight',
  20,
  NULL,
  '5/10/10/10',
  '15',
  'Intermediate',
  'Ring Rows / Knie-Push-ups / leichtere DB',
  'C2B / schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  338,
  'Kipping Practice',
  'Home Gym',
  'EMOM',
  'EMOM 10 Min – Kipping Pull-ups',
  'Kipping Pull-ups, Hanging Knee Raises',
  'Pull-up Bar',
  10,
  10,
  '7 Pull-ups / 10 HKR',
  NULL,
  'Intermediate',
  'Ring Rows / weniger Reps',
  'C2B / Toes-to-Bar',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  339,
  'Strict Gymnastics 5x5',
  'Home Gym',
  'ForTime',
  '5 Sets – Strict Gymnastics',
  'Strict Pull-ups, Strict HSPU, L-Sit Hold',
  'Pull-up Bar, Bodyweight',
  20,
  5,
  '5/5/10 Sek',
  NULL,
  'Advanced',
  'Ring Rows / Box HSPU / Tuck Hold',
  'Gewichtete Pull-ups / Deficit HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  340,
  'Bar Complex',
  'Home Gym',
  'EMOM',
  'EMOM 12 Min – Bar Komplexe',
  'Pull-ups, Hanging Knee Raises, Dead Hangs',
  'Pull-up Bar',
  12,
  12,
  '5 Pull-ups / 10 HKR / 15 Sek Hang',
  NULL,
  'Beginner',
  'Ring Rows / weniger Reps',
  'C2B / Toes-to-Bar',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  341,
  'Pull-up 100',
  'Home Gym',
  'ForTime',
  '100 Pull-ups für Zeit',
  'Pull-ups',
  'Pull-up Bar',
  10,
  NULL,
  '100',
  NULL,
  'Intermediate',
  '50 Ring Rows',
  '100 Gewichtete Pull-ups',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  342,
  'Strict Pull & HSPU',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time',
  'Strict Pull-ups, Strict HSPU',
  'Pull-up Bar, Bodyweight',
  15,
  5,
  '10/10',
  NULL,
  'Advanced',
  'Ring Rows / Box HSPU',
  'Gewichtete Pull-ups / Deficit HSPU',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  343,
  'V-up & Pull-up Couplet',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'V-ups, Pull-ups',
  'Pull-up Bar, Bodyweight',
  15,
  NULL,
  '15/7',
  NULL,
  'Intermediate',
  'Sit-ups / Ring Rows',
  'Toes-to-Bar / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  344,
  'Jump & Grind',
  'Home Gym',
  'ForTime',
  '10 Rounds For Time',
  'Tuck Jumps, Push-ups, Sit-ups',
  'Bodyweight',
  15,
  10,
  '10/10/10',
  NULL,
  'Beginner',
  'Weniger Reps / Knie-Push-ups',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  345,
  'BW Triplet AMRAP',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Burpees, Sit-ups, Air Squats',
  'Bodyweight',
  15,
  NULL,
  '5/10/20',
  NULL,
  'Beginner',
  'Weniger Reps',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  346,
  'Hollow Rock Tabata',
  'Home Gym',
  'Tabata',
  'Tabata Hollow Rocks & V-ups',
  'Hollow Rocks, V-ups',
  'Bodyweight',
  8,
  16,
  '8 Runden à 20/10 Sek',
  NULL,
  'Intermediate',
  'Tuck Rocks / Sit-ups',
  'Gewichte halten',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  347,
  'Run & Ruck',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time',
  'Run 400m, Burpees',
  'Bodyweight, Gewichtsweste',
  20,
  5,
  '400m / 10 Burpees',
  '10',
  'Intermediate',
  '200m / weniger Burpees / ohne Weste',
  'Schwerere Weste / mehr Burpees',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  348,
  'BW 300',
  'Other Benchmark',
  'ForTime',
  '300 Reps Bodyweight Chipper',
  'Pull-ups, Push-ups, Box Jumps, Floor Wipers, Dips, Clapping Push-ups, Tuck Jumps',
  'Pull-up Bar, Bodyweight',
  20,
  NULL,
  'Verschiedene Reps = 300 total',
  NULL,
  'Advanced',
  '150 Reps / Skalierte Bewegungen',
  'Mit Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  349,
  'Sandbag EMOM 20',
  'Home Gym',
  'EMOM',
  '20 Min EMOM – 4 Stationen',
  'Sandbag Cleans, Sandbag Carries, Push-ups, Air Squats',
  'Sandbag, Bodyweight',
  20,
  20,
  '5/20m/15/20 rotierend',
  '20',
  'Intermediate',
  'Leichterer Sandbag / Knie-Push-ups',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  350,
  'Sandbag Over Shoulder',
  'Home Gym',
  'ForTime',
  '100 Sandbag Over Shoulder für Zeit',
  'Sandbag Over Shoulder',
  'Sandbag',
  10,
  NULL,
  '100',
  '20',
  'Intermediate',
  '50 Reps / leichterer Sandbag',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  351,
  'Sandbag Step-ups',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP',
  'Sandbag Bear Hug Step-ups, Push-ups, Sandbag Squats',
  'Sandbag, Bodyweight',
  15,
  NULL,
  '10/15/10',
  '20',
  'Intermediate',
  'Leichterer Sandbag / Knie-Push-ups',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  352,
  'Sandbag Runs',
  'Home Gym',
  'ForTime',
  '6 Rounds For Time',
  'Sandbag Carry Run 200m, Sandbag Cleans',
  'Sandbag',
  20,
  6,
  '200m Carry / 10 Cleans',
  '20',
  'Intermediate',
  '100m / leichterer Sandbag / weniger Runden',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  353,
  'Sandbag Get-ups',
  'Home Gym',
  'EMOM',
  '10 Min EMOM',
  'Sandbag Turkish Get-ups alternierend',
  'Sandbag',
  10,
  10,
  '2 je Seite',
  '10',
  'Beginner',
  'Leichterer Sandbag / 1 je Seite',
  'Schwererer Sandbag',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  354,
  'KB DB Snatch Couplet',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP',
  'KB Snatches, DB Snatches alternierend',
  'Kettlebell, Dumbbell',
  12,
  NULL,
  '10 KB / 10 DB',
  '24/15',
  'Intermediate',
  'Leichtere Gewichte',
  'Schwerere Gewichte',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  355,
  'Home Gym DT Plus',
  'Home Gym',
  'ForTime',
  '5 Rounds – 4 Bewegungen',
  'KB Deadlifts, KB Cleans, DB Push Press, Pull-ups',
  'Kettlebell, Dumbbell, Pull-up Bar',
  20,
  5,
  '12/9/6/6',
  '24/15',
  'Advanced',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  356,
  'Sandbag KB Couplet',
  'Home Gym',
  'ForTime',
  '4 Rounds For Time',
  'Sandbag Cleans, KB Swings',
  'Sandbag, Kettlebell',
  15,
  4,
  '10/20',
  '20/24',
  'Intermediate',
  'Leichtere Gewichte',
  'Schwerere Gewichte',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  357,
  'The Home Trifecta',
  'Home Gym',
  'AMRAP',
  '18 Min AMRAP – 3 Stationen',
  'KB Swings, DB Thrusters, Pull-ups',
  'Kettlebell, Dumbbell, Pull-up Bar',
  18,
  NULL,
  '15/12/9',
  '24/15',
  'Intermediate',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  358,
  'Vest & Bells',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – mit Weste',
  'KB Swings, Pull-ups, Push-ups',
  'Kettlebell, Pull-up Bar, Bodyweight, Gewichtsweste',
  20,
  5,
  '20/10/20',
  '24',
  'Advanced',
  'Ohne Weste / leichtere KB / Ring Rows',
  'Schwerere Weste / schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  359,
  'Sandbag Vest Chipper',
  'Home Gym',
  'ForTime',
  'For Time – mit Weste & Sandbag',
  'Sandbag Cleans, Pull-ups, Burpees, Air Squats',
  'Sandbag, Pull-up Bar, Bodyweight, Gewichtsweste',
  20,
  NULL,
  '20/20/20/40',
  '20',
  'Advanced',
  'Ohne Weste / leichterer Sandbag / Ring Rows',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  360,
  'Zembiec',
  'Hero WOD',
  'ForTime',
  'For Time – Hero WOD',
  'Burpees, Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  20,
  NULL,
  '8 Rounds: 8/8/8/8',
  NULL,
  'Intermediate',
  'Ring Rows / Knie-Push-ups / weniger Runden',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  361,
  'Loredo',
  'Hero WOD',
  'ForTime',
  '6 Rounds For Time',
  'Run 400m, 24 Air Squats, 24 Push-ups, 24 Walking Lunges',
  'Bodyweight',
  30,
  6,
  '400m/24/24/24',
  NULL,
  'Intermediate',
  '200m / weniger Reps / Knie-Push-ups',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  362,
  'Nutts',
  'Hero WOD',
  'ForTime',
  '10 Rounds For Time',
  '10 Burpees, 10 KB Swings, 10 Pull-ups',
  'Kettlebell, Pull-up Bar, Bodyweight',
  30,
  10,
  '10/10/10',
  '32',
  'Advanced',
  'Leichtere KB / Ring Rows / weniger Runden',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  363,
  'Chuck',
  'Hero WOD',
  'ForTime',
  '3 Rounds For Time',
  'KB Swings, Pull-ups, Push-ups, Sit-ups, Air Squats',
  'Kettlebell, Pull-up Bar, Bodyweight',
  20,
  3,
  '21/15/9/21/21',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows / Knie-Push-ups',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  364,
  'Spehar',
  'Hero WOD',
  'ForTime',
  '5 Rounds For Time',
  'KB Swings, Burpees, Pull-ups',
  'Kettlebell, Pull-up Bar, Bodyweight',
  20,
  5,
  '9/15/9',
  '32',
  'Advanced',
  'Leichtere KB / Ring Rows / weniger Reps',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  365,
  'Core KB Circuit',
  'Core WOD',
  'ForTime',
  '4 Rounds For Time',
  'KB Russian Twists, KB Windmills, Hollow Holds, V-ups',
  'Kettlebell, Bodyweight',
  15,
  4,
  '20/10/20Sek/15',
  '16',
  'Intermediate',
  'Leichtere KB / Tuck Hold',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  366,
  'Pull-up Core EMOM',
  'Core WOD',
  'EMOM',
  '10 Min EMOM',
  'Toes-to-Bar, L-Sit Hold',
  'Pull-up Bar',
  10,
  10,
  '7 T2B / 15 Sek L-Sit',
  NULL,
  'Intermediate',
  'K2E / Tuck Hold',
  'Mehr Reps / längerer Hold',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  367,
  'DB Core Circuit',
  'Core WOD',
  'ForTime',
  '3 Rounds For Time',
  'DB Russian Twists, DB Plank Rows, DB Sit-ups',
  'Dumbbell, Bodyweight',
  12,
  3,
  '20/12/20',
  '10',
  'Intermediate',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  368,
  'KB Filthy Fifty',
  'Other Benchmark',
  'ForTime',
  '50 Reps von 10 Übungen – KB Version',
  'KB Swings, Pull-ups, KB Goblet Squats, Lunges, Hanging Knee Raises, KB Push Press, Sit-ups, KB Deadlifts, Burpees, Jumping Jacks',
  'Kettlebell, Pull-up Bar, Bodyweight',
  30,
  NULL,
  '50 jede',
  '24',
  'Intermediate',
  '25 Reps / leichtere KB / Ring Rows',
  '75 Reps / schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  369,
  'DB Fight Gone Bad',
  'Other Benchmark',
  'ForTime',
  '3 Rounds à 1 Min – DB Version',
  'DB Thrusters, Jumping Pull-ups, DB Step-ups, DB Push Press, Burpees',
  'Dumbbell, Pull-up Bar, Bodyweight',
  17,
  3,
  'Max Reps je Station',
  '15',
  'Intermediate',
  'Leichtere DB / weniger Runden',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  370,
  'Home Gym Open 1',
  'Home Gym',
  'AMRAP',
  '12 Min AMRAP – Home Gym Open Style',
  'KB Swings, Pull-ups, Burpees, DB Thrusters',
  'Kettlebell, Dumbbell, Pull-up Bar, Bodyweight',
  12,
  NULL,
  '10/5/10/8',
  '24/15',
  'Intermediate',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  371,
  'Home Gym Open 2',
  'Home Gym',
  'ForTime',
  '21-15-9 – Home Gym Open Style',
  'DB Snatches, Pull-ups, KB Swings',
  'Dumbbell, Kettlebell, Pull-up Bar',
  15,
  3,
  '21-15-9',
  '22.5/24',
  'Intermediate',
  'Leichtere Gewichte / Ring Rows',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  372,
  'Home Gym Open 3',
  'Home Gym',
  'AMRAP',
  '15 Min AMRAP – Home Gym Style',
  'Wall Walks, KB Snatches, Burpees',
  'Kettlebell, Bodyweight',
  15,
  NULL,
  '3/10/15',
  '24',
  'Intermediate',
  'Weniger Reps / leichtere KB',
  'Mehr Reps / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  373,
  '20lb Vest Cindy',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – 20lb Vest',
  'Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  20,
  NULL,
  '5/10/15',
  '9',
  'Advanced',
  'Leichtere Weste / ohne Weste',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  374,
  'Vest Run & Pull',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – mit Weste',
  'Run 400m, Pull-ups',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  25,
  5,
  '400m / 15 Pull-ups',
  '10',
  'Advanced',
  '200m / Ring Rows / ohne Weste',
  'Schwerere Weste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  375,
  'Vest Barbara',
  'Home Gym',
  'ForTime',
  '5 Rounds mit Pause – mit Weste',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  'Pull-up Bar, Bodyweight, Gewichtsweste',
  40,
  5,
  '20/30/40/50 + 3 Min Pause',
  '10',
  'Advanced',
  'Ohne Weste / weniger Reps',
  'Schwerere Weste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  376,
  'Jackie Home',
  'Home Gym',
  'ForTime',
  'For Time – Home Version von Jackie',
  '200m Farmers Carry, DB Thrusters, Pull-ups',
  'Dumbbell, Kettlebell, Pull-up Bar',
  15,
  NULL,
  '200m Carry / 45 Thrusters / 30 Pull-ups',
  '15',
  'Intermediate',
  '100m / leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  377,
  'Chelsea Home',
  'Home Gym',
  'EMOM',
  '30 Min EMOM – Home Version',
  'Pull-ups, Push-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  30,
  30,
  '5/10/15',
  NULL,
  'Intermediate',
  '3/6/9 / Ring Rows / Knie-Push-ups',
  '7/14/21 / Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  378,
  'Barbara Home',
  'Home Gym',
  'ForTime',
  '5 Rounds mit Pause – Adaptiert',
  'Pull-ups, Push-ups, Sit-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  30,
  5,
  '20/30/40/50 + 3 Min Pause',
  NULL,
  'Intermediate',
  '15/20/30/40 / Ring Rows / Knie-Push-ups',
  '25/40/50/60 / Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  379,
  'Annie Home',
  'Home Gym',
  'ForTime',
  '50-40-30-20-10 – Home Version',
  'Jumping Jacks, Sit-ups',
  'Bodyweight',
  12,
  NULL,
  '50-40-30-20-10',
  NULL,
  'Beginner',
  'Singles / Knie-Sit-ups',
  'Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  380,
  'Mary Home',
  'Home Gym',
  'AMRAP',
  '20 Min AMRAP – Home Version',
  'Pike Push-ups, Pistol Squats, Pull-ups',
  'Pull-up Bar, Bodyweight',
  20,
  NULL,
  '5/10/15',
  NULL,
  'Intermediate',
  'Knie-Pike / Assisted Pistols / Ring Rows',
  'Deficit HSPU / echte Pistols / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  381,
  'Nancy Home',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – Home Version',
  'Run 400m, DB Overhead Squats',
  'Dumbbell, Bodyweight',
  20,
  5,
  '400m / 15 DB OHS',
  '15',
  'Intermediate',
  '200m / leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  382,
  'Kelly Home',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – Home Version',
  'Run 400m, Tuck Jumps, DB Thrusters',
  'Dumbbell, Bodyweight',
  25,
  5,
  '400m / 30 Tucks / 20 Thrusters',
  '15',
  'Intermediate',
  '200m / weniger Reps / leichtere DB',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  383,
  'Nicole Home',
  'Home Gym',
  'ForTime',
  '20 Min AMRAP + Max Pull-ups',
  'Run 400m, Max Pull-ups',
  'Pull-up Bar, Bodyweight',
  20,
  NULL,
  'Max Reps',
  NULL,
  'Intermediate',
  '200m / Ring Rows',
  'Gewichtsweste / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  384,
  'Eva Home',
  'Home Gym',
  'ForTime',
  '5 Rounds For Time – Home Version',
  'Run 800m, KB Swings, Pull-ups',
  'Kettlebell, Pull-up Bar',
  40,
  5,
  '800m / 30 KB / 30 Pull-ups',
  '24',
  'Advanced',
  '400m / leichtere KB / Ring Rows',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  385,
  'Grace Home',
  'Home Gym',
  'ForTime',
  '30 DB Clean & Jerks für Zeit',
  'DB Clean & Jerks alternierend',
  'Dumbbell',
  10,
  NULL,
  '30',
  '22.5',
  'Intermediate',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  386,
  'Isabel Home',
  'Home Gym',
  'ForTime',
  '30 DB Snatches alternierend für Zeit',
  'Alternating DB Snatches',
  'Dumbbell',
  10,
  NULL,
  '30',
  '22.5',
  'Intermediate',
  'Leichtere DB / weniger Reps',
  'Schwerere DB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  387,
  'Linda Home',
  'Home Gym',
  'ForTime',
  '10-9-8...1 – Home Version',
  'KB Deadlifts, DB Bench Alt, DB Cleans',
  'Kettlebell, Dumbbell',
  30,
  NULL,
  '10-1 Ladder',
  '32/15',
  'Advanced',
  'Leichtere Gewichte',
  'Schwerere Gewichte',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  388,
  'Diane Home',
  'Home Gym',
  'ForTime',
  '21-15-9 – Home Version',
  'KB Deadlifts, Pike Push-ups',
  'Kettlebell, Bodyweight',
  10,
  3,
  '21-15-9',
  '32',
  'Intermediate',
  'Leichtere KB / Knie-Pike',
  'Schwerere KB / Deficit Pike',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  389,
  'Elizabeth Home',
  'Home Gym',
  'ForTime',
  '21-15-9 – Home Version',
  'KB Cleans, Dips',
  'Kettlebell, Bodyweight',
  10,
  3,
  '21-15-9',
  '24',
  'Intermediate',
  'Leichtere KB / Box Dips',
  'Schwerere KB / Gewichtete Dips',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  390,
  'Amanda Home',
  'Home Gym',
  'ForTime',
  '9-7-5 – Home Version',
  'DB Squat Snatches, Pull-ups',
  'Dumbbell, Pull-up Bar',
  10,
  3,
  '9-7-5',
  '22.5',
  'Advanced',
  'Leichtere DB / Ring Rows',
  'Schwerere DB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  391,
  'KB Breathing Ladder',
  'Home Gym',
  'ForTime',
  'Breathing Ladder – KB Swings',
  'KB Swings, Burpees',
  'Kettlebell, Bodyweight',
  15,
  NULL,
  '1 KB + 1 Burpee → 10 KB + 10 Burpees',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Runden',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  392,
  'Pull-up Breathing Ladder',
  'Home Gym',
  'ForTime',
  'Breathing Ladder – Pull-ups',
  'Pull-ups, Air Squats',
  'Pull-up Bar, Bodyweight',
  15,
  NULL,
  '1 Pull-up + 10 Squats → 10 + 10',
  NULL,
  'Intermediate',
  'Ring Rows',
  'Gewichtete Pull-ups / Gewichtsweste',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  393,
  'KB Sprint EMOM',
  'Home Gym',
  'EMOM',
  'EMOM 8 Min – Sprint Intervalle',
  'KB Swings, Burpees',
  'Kettlebell, Bodyweight',
  8,
  8,
  '20 KB / 10 Burpees',
  '24',
  'Intermediate',
  'Leichtere KB / weniger Reps',
  'Schwerere KB / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  394,
  'Posterior Chain',
  'Home Gym',
  'ForTime',
  '4 Rounds For Time – Posterior Chain',
  'KB Deadlifts, KB Swings, Good Mornings, Glute Bridges',
  'Kettlebell, Bodyweight',
  15,
  4,
  '12/15/15/20',
  '24',
  'Beginner',
  'Leichtere KB',
  'Schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  395,
  'Upper Body EMOM',
  'Home Gym',
  'EMOM',
  '12 Min EMOM – Oberkörper',
  'Pull-ups, Push-ups, KB Press',
  'Kettlebell, Pull-up Bar, Bodyweight',
  12,
  12,
  '5/10/8 rotierend',
  '16',
  'Intermediate',
  'Ring Rows / Knie-Push-ups / leichtere KB',
  'C2B / Archer Push-ups / schwerere KB',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  396,
  'Lower Body EMOM',
  'Home Gym',
  'EMOM',
  '12 Min EMOM – Unterkörper',
  'Air Squats, KB Goblet Squats, Lunges',
  'Kettlebell, Bodyweight',
  12,
  12,
  '20/10/20 rotierend',
  '24',
  'Beginner',
  'Leichtere KB / weniger Reps',
  'Schwerere KB / Pistols',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  397,
  'Full Body EMOM 30',
  'Home Gym',
  'EMOM',
  '30 Min EMOM – 5 Stationen',
  'KB Swings, Pull-ups, Push-ups, Air Squats, Sit-ups',
  'Kettlebell, Pull-up Bar, Bodyweight',
  30,
  30,
  '15/7/15/20/15 rotierend',
  '24',
  'Intermediate',
  'Leichtere KB / Ring Rows / Knie-Push-ups / weniger Reps',
  'Schwerere KB / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  398,
  'Home Hustle',
  'Home Gym',
  'ForTime',
  'For Time – Alles ausm Weg',
  'KB Swings, Pull-ups, DB Thrusters, Burpees, Sit-ups',
  'Kettlebell, Dumbbell, Pull-up Bar, Bodyweight',
  20,
  NULL,
  '30/20/15/20/30',
  '24/15',
  'Intermediate',
  'Leichtere Gewichte / Ring Rows / weniger Reps',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  399,
  'The Home Games',
  'Home Gym',
  'ForTime',
  '5 Events – Home Games',
  'KB Snatch Max, Pull-up Max, DB Thruster 21-15-9, Burpee 100, KB Swing 150',
  'Kettlebell, Dumbbell, Pull-up Bar, Bodyweight',
  40,
  5,
  'Max/Max/21-15-9/100/150',
  '24/15',
  'Advanced',
  'Leichtere Gewichte / Ring Rows / weniger Reps',
  'Schwerere Gewichte / C2B',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  400,
  'Arnie',
  'Hero WOD',
  'ForTime',
  'Arnie - For Time',
  '21 Turkish Get-ups, 50 Pull-ups, 21 Thrusters, 50 Pull-ups, 21 OHS, 50 Pull-ups',
  'Barbell, Pull-up Bar',
  20,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  401,
  'Brad',
  'Hero WOD',
  'ForTime',
  'Brad - For Time',
  '5 Rounds: 12 Front Squats, 21 Pull-ups, Run 400m',
  'Barbell, Pull-up Bar',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  402,
  'Bradshaw',
  'Hero WOD',
  'ForTime',
  'Bradshaw - For Time',
  '3 Rounds: 22 KB Swings, 22 Box Jumps, 22 Burpees, 22 Wall Balls, 22 DU, 10 Hang Squat Cleans',
  'Barbell, Jump Rope',
  35,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  403,
  'Bull',
  'Hero WOD',
  'ForTime',
  'Bull - For Time',
  '21-15-9: Deadlift, Hang Power Clean, Front Squat, Push Jerk, Pull-ups, OHS',
  'Barbell, Pull-up Bar',
  25,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  404,
  'Coe',
  'Hero WOD',
  'ForTime',
  'Coe - For Time',
  '3 Rounds: 15 L-Pull-ups, 30 KB Swings, 1 Mile Run',
  'Kettlebell, Pull-up Bar',
  20,
  3,
  '21-15-9',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  405,
  'Danny',
  'Hero WOD',
  'AMRAP',
  'Danny - AMRAP 20 Min',
  '20 Min AMRAP: 30 Box Jumps, 20 Push Press, 30 Pull-ups',
  'Barbell, Box',
  20,
  1,
  'Max Reps',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  406,
  'Desforges',
  'Hero WOD',
  'ForTime',
  'Desforges - For Time',
  '5 Rounds: 7 Muscle-ups, 155lb Squat Clean, 11 Box Jumps',
  'Barbell, Pull-up Bar',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  407,
  'Forrest',
  'Hero WOD',
  'ForTime',
  'Forrest - For Time',
  '20 L-Pull-ups, 30 Back Extensions, 20 L-Pull-ups, 30 Hip Ext, Run 800m, 21 Burpees',
  'Barbell, Pull-up Bar',
  25,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  408,
  'Gator',
  'Hero WOD',
  'ForTime',
  'Gator - For Time',
  '5 Rounds: 10 Pull-ups, 10 Burpees, 10 KB Swings, Run 400m',
  'Kettlebell, Pull-up Bar',
  30,
  5,
  '21-15-9',
  '24/16',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  409,
  'Glen',
  'Hero WOD',
  'ForTime',
  'Glen - For Time',
  '30 Clean & Jerks, 1 Mile Run, 10 Rope Climbs, 1 Mile Run, 100 Burpees',
  'Barbell, Pull-up Bar',
  40,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  410,
  'Hollywood',
  'Hero WOD',
  'ForTime',
  'Hollywood - For Time',
  '5 Rounds: 5 Power Cleans, 10 Front Squats, 5 Jerks, 10 Box Jumps',
  'Barbell, Box',
  25,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  411,
  'Jake',
  'Hero WOD',
  'ForTime',
  'Jake - For Time',
  '1 Mile Run, 100 Pull-ups, 200 Push-ups, 300 Air Squats, 1 Mile Run',
  'Bodyweight',
  35,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  412,
  'Jason',
  'Hero WOD',
  'ForTime',
  'Jason - For Time',
  '100 Squats, 5 Muscle-ups, 75 Squats, 10 Muscle-ups, 50 Squats, 15 Muscle-ups, 25 Squats, 20 Muscle-ups',
  'Barbell, Pull-up Bar',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  413,
  'Khan',
  'Hero WOD',
  'ForTime',
  'Khan - For Time',
  '5 Rounds: 15 Deadlifts, 15 Hang Power Cleans, 15 Front Squats, 15 Push Jerks',
  'Barbell',
  35,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  414,
  'Luce',
  'Hero WOD',
  'ForTime',
  'Luce - For Time',
  '5 Rounds: 12 Deadlifts, 9 Hang Power Cleans, 6 Push Jerks, 3 Bar Muscle-ups',
  'Barbell, Pull-up Bar',
  20,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  415,
  'Mac',
  'Hero WOD',
  'ForTime',
  'Mac - For Time',
  '4 Rounds: 400m Run, 25 OHS, 25 Sit-ups',
  'Barbell, Bodyweight',
  25,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  416,
  'Manion',
  'Hero WOD',
  'ForTime',
  'Manion - For Time',
  '7 Rounds: 1 Mile Run, 29 Back Squats',
  'Barbell, Bodyweight',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  417,
  'Michael',
  'Hero WOD',
  'ForTime',
  'Michael - For Time',
  '3 Rounds: 800m Run, 50 Back Ext, 50 Sit-ups',
  'Bodyweight',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  418,
  'Moore',
  'Hero WOD',
  'ForTime',
  'Moore - For Time',
  '2 Rounds: 1 Mile Run, 100 Pull-ups, 200 Push-ups, 300 Air Squats',
  'Pull-up Bar, Barbell',
  25,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  419,
  'Nick',
  'Hero WOD',
  'ForTime',
  'Nick - For Time',
  '6 Rounds: 10 Deadlifts, 10 Burpees, 10 Box Jumps, Run 400m',
  'Barbell, Box',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  420,
  'Omar',
  'Hero WOD',
  'ForTime',
  'Omar - For Time',
  '10 Muscle-ups, 15 Push Press, 20 Box Jumps — 7 Rounds',
  'Barbell, Pull-up Bar',
  25,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  421,
  'Patrick',
  'Hero WOD',
  'ForTime',
  'Patrick - For Time',
  '5 Rounds: 25 Chin-ups, 50 Push-ups, 50 Sit-ups, 50 Air Squats',
  'Bodyweight',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  422,
  'Pheezy',
  'Hero WOD',
  'ForTime',
  'Pheezy - For Time',
  '6 Rounds: 15 OHS, 15 Box Jumps, 15 Pull-ups, 15 Burpees',
  'Barbell, Box',
  35,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  423,
  'Tosh',
  'Hero WOD',
  'ForTime',
  'Tosh - For Time',
  '5 Rounds: 20 DB Thrusters, 20 KB Swings, 20 Burpees',
  'Barbell, Kettlebell',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  424,
  'Tucker',
  'Hero WOD',
  'ForTime',
  'Tucker - For Time',
  '5 Rounds: 10 Deadlifts, 10 Ring Dips, 10 Pull-ups, 10 Sit-ups, Run 400m',
  'Barbell, Pull-up Bar',
  25,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  425,
  'Tyler',
  'Hero WOD',
  'ForTime',
  'Tyler - For Time',
  '5 Rounds: 7 Muscle-ups, 21 Burpees, 400m Run',
  'Bodyweight',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  426,
  'Van Dam',
  'Hero WOD',
  'ForTime',
  'Van Dam - For Time',
  '4 Rounds: 400m Run, 25 Back Squats, 25 Push-ups',
  'Barbell',
  25,
  5,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  427,
  'Wes',
  'Hero WOD',
  'ForTime',
  'Wes - For Time',
  '20 Min: 5 Power Cleans, 10 Toes-to-Bar, 15 Wall Balls — AMRAP',
  'Barbell, Pull-up Bar',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  428,
  'Willy',
  'Hero WOD',
  'ForTime',
  'Willy - For Time',
  '5 Rounds: 15 KB Swings, 15 Sit-ups, 15 Box Jumps, Run 400m',
  'Kettlebell, Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  429,
  'Rankel',
  'Hero WOD',
  'ForTime',
  'Rankel - For Time',
  '6 Rounds: 24 Air Squats, 24 Push-ups, 24 Walking Lunges, 12 Deadlifts, 12 Push Press, 12 Power Cleans',
  'Barbell, Pull-up Bar',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  430,
  'Wittman',
  'Hero WOD',
  'ForTime',
  'Wittman - For Time',
  '7 Rounds: 15 Deadlifts, 15 Hang Power Cleans, 15 Push Jerks',
  'Barbell',
  35,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  431,
  'Holleyman',
  'Hero WOD',
  'ForTime',
  'Holleyman - For Time',
  '30 Rounds: 5 Wall Balls, 3 HSPU, 1 Power Clean',
  'Barbell, Box',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  432,
  'Holbrook',
  'Hero WOD',
  'ForTime',
  'Holbrook - For Time',
  '10 Rounds: 3 Muscle-ups, 5 Power Cleans, 7 Kettlebell Swings',
  'Barbell, Pull-up Bar',
  35,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  433,
  'Litzen',
  'Hero WOD',
  'ForTime',
  'Litzen - For Time',
  '1000m Row, 25 Squat Cleans, 50 Pull-ups, 25 Squat Cleans, 1000m Row',
  'Barbell, Bodyweight',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  434,
  'Riggins',
  'Hero WOD',
  'ForTime',
  'Riggins - For Time',
  '5 Rounds: 10 OHS, 10 Deadlifts, 10 Lateral Burpees',
  'Barbell, Bodyweight',
  25,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  435,
  'Payton',
  'Hero WOD',
  'ForTime',
  'Payton - For Time',
  '4 Rounds: 10 Deadlifts, 10 Hang Power Cleans, 10 Front Squats, 10 Push Jerks, 10 Box Jumps',
  'Barbell, Box',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  436,
  'Kalsu',
  'Hero WOD',
  'ForTime',
  'Kalsu - For Time',
  'EMOM 100 Thrusters: 5 Burpees every min start',
  'Barbell',
  45,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  437,
  'Rahoi',
  'Hero WOD',
  'AMRAP',
  'Rahoi - AMRAP 12 Min',
  '12 Min AMRAP: 12 Box Jumps, 6 Thruster, 6 Bar-facing Burpees',
  'Box, Barbell',
  12,
  1,
  'Max Reps',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  438,
  'Hammer',
  'Hero WOD',
  'ForTime',
  'Hammer - For Time',
  '5 Rounds: 5 Power Cleans, 10 Front Squats, 5 Push Jerks, 10 Pull-ups, 5 Power Cleans',
  'Barbell, Pull-up Bar',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  439,
  'Tisdale',
  'Hero WOD',
  'ForTime',
  'Tisdale - For Time',
  '5 Rounds: 11 Deadlifts, 2 Rope Climbs, 35 DU',
  'Barbell, Bodyweight',
  25,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  440,
  'Wilson',
  'Hero WOD',
  'ForTime',
  'Wilson - For Time',
  '5 Rounds: 20 Pull-ups, 30 Push-ups, 40 Sit-ups, 50 Squats',
  'Kettlebell, Pull-up Bar',
  30,
  5,
  '21-15-9',
  '24/16',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  441,
  'Ship',
  'Hero WOD',
  'ForTime',
  'Ship - For Time',
  '5 Rounds: 400m Run, 15 OHS, 20 Toes-to-Bar',
  'Barbell, Bodyweight',
  25,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  442,
  'Hicks',
  'Hero WOD',
  'ForTime',
  'Hicks - For Time',
  '3 Rounds: 800m Run, 50 Deadlifts, 50 Box Jumps',
  'Barbell, Box',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  443,
  'Brenton',
  'Hero WOD',
  'ForTime',
  'Brenton - For Time',
  '10 Rounds: 100m Sprint, 10 Push-ups, 10 Sit-ups, 10 Squats',
  'Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  444,
  'Taylor',
  'Hero WOD',
  'ForTime',
  'Taylor - For Time',
  '21 OHS, 42 Pull-ups, 15 OHS, 30 Pull-ups, 9 OHS, 18 Pull-ups',
  'Barbell, Pull-up Bar',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  445,
  'Scott',
  'Hero WOD',
  'ForTime',
  'Scott - For Time',
  '5 Rounds: 400m Run, 10 Pull-ups, 25 Push-ups, 25 Air Squats',
  'Bodyweight',
  25,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  446,
  'Strong',
  'Hero WOD',
  'ForTime',
  'Strong - For Time',
  '5 Rounds: 15 Deadlifts, 12 Hang Power Cleans, 9 Push Jerks, 6 Muscle-ups',
  'Barbell, Pull-up Bar',
  35,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  447,
  'Thompson',
  'Hero WOD',
  'ForTime',
  'Thompson - For Time',
  '150 Wall Balls — OHS, Squat Cleans, Thrusters, Back Squats in sets',
  'Barbell',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  448,
  'Zimmerman',
  'Hero WOD',
  'ForTime',
  'Zimmerman - For Time',
  '11 Rounds: 3 Deadlifts, 6 Burpees, 9 Double-unders, 12 Air Squats',
  'Barbell, Pull-up Bar, Box',
  35,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  449,
  'Hotshots 19',
  'Hero WOD',
  'ForTime',
  'Hotshots 19 - For Time',
  '6 Rounds: 30 Air Squats, 19 Power Cleans, 7 Strict Pull-ups, 400m Run',
  'Barbell, Bodyweight',
  40,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  450,
  'Lobo',
  'Hero WOD',
  'ForTime',
  'Lobo - For Time',
  '5 Rounds: 10 Power Cleans, 10 KB Swings, 10 Box Jumps, Run 400m',
  'Barbell, Kettlebell',
  25,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  451,
  'Webb',
  'Hero WOD',
  'ForTime',
  'Webb - For Time',
  '5 Rounds: 7 Muscle-ups, 5 Squat Cleans, 10 Box Jumps',
  'Barbell, Pull-up Bar',
  30,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  452,
  'Sweeney',
  'Hero WOD',
  'ForTime',
  'Sweeney - For Time',
  '5 Rounds: 5 Back Squats, 10 Deadlifts, 5 Power Cleans, 10 Push Jerks',
  'Barbell',
  25,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  453,
  'Gonzalez',
  'Hero WOD',
  'AMRAP',
  'Gonzalez - AMRAP 15 Min',
  '15 Min AMRAP: 5 Pull-ups, 10 Push-ups, 15 Air Squats — weighted vest',
  'Barbell, Pull-up Bar',
  15,
  1,
  'Max Reps',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  454,
  'Price',
  'Hero WOD',
  'ForTime',
  'Price - For Time',
  '4 Rounds: 400m Run, 25 KB Swings, 25 Push-ups',
  'Kettlebell, Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit HQ'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  455,
  'EMOM KB Swing Squat',
  'EMOM',
  'EMOM',
  'EMOM KB Swing Squat - EMOM 10 Min',
  '10 KB Swings, 10 Air Squats',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  456,
  'EMOM Push Pull Squat',
  'EMOM',
  'EMOM',
  'EMOM Push Pull Squat - EMOM 12 Min',
  'Min 1: 10 Push-ups | Min 2: 10 Pull-ups | Min 3: 15 Squats',
  'Bodyweight',
  12,
  12,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  457,
  'EMOM Barbell Complex',
  'EMOM',
  'EMOM',
  'EMOM Barbell Complex - EMOM 10 Min',
  '3 Power Cleans + 3 Front Squats + 3 Push Jerks',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  458,
  'EMOM Deadlift Sprint',
  'EMOM',
  'EMOM',
  'EMOM Deadlift Sprint - EMOM 8 Min',
  '5 Deadlifts + 10 Cal Row',
  'Barbell',
  8,
  8,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  459,
  'EMOM Thruster Pull',
  'EMOM',
  'EMOM',
  'EMOM Thruster Pull - EMOM 10 Min',
  'Min 1: 7 Thrusters | Min 2: 7 Chest-to-Bar',
  'Barbell, Pull-up Bar',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  460,
  'EMOM KB Clean Press',
  'EMOM',
  'EMOM',
  'EMOM KB Clean Press - EMOM 12 Min',
  '5 KB Clean & Press each arm',
  'Kettlebell',
  12,
  12,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  461,
  'EMOM Wall Ball Box',
  'EMOM',
  'EMOM',
  'EMOM Wall Ball Box - EMOM 10 Min',
  'Min 1: 15 Wall Balls | Min 2: 10 Box Jumps',
  'Wall Ball, Box',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  462,
  'EMOM Burpee Squat',
  'EMOM',
  'EMOM',
  'EMOM Burpee Squat - EMOM 8 Min',
  '5 Burpees + 10 Air Squats',
  'Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  463,
  'EMOM OHS Pull-up',
  'EMOM',
  'EMOM',
  'EMOM OHS Pull-up - EMOM 10 Min',
  'Min 1: 5 OHS | Min 2: 10 Pull-ups',
  'Barbell, Pull-up Bar',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  464,
  'EMOM Snatch Balance',
  'EMOM',
  'EMOM',
  'EMOM Snatch Balance - EMOM 8 Min',
  '3 Snatch + 3 Overhead Squats',
  'Barbell',
  8,
  8,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  465,
  'EMOM Row KB',
  'EMOM',
  'EMOM',
  'EMOM Row KB - EMOM 10 Min',
  'Min 1: 15 Cal Row | Min 2: 20 KB Swings',
  'Rowing Machine, Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  466,
  'EMOM T2B Push Press',
  'EMOM',
  'EMOM',
  'EMOM T2B Push Press - EMOM 12 Min',
  'Min 1: 8 T2B | Min 2: 8 Push Press',
  'Barbell, Pull-up Bar',
  12,
  12,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  467,
  'EMOM Double Under Squat',
  'EMOM',
  'EMOM',
  'EMOM Double Under Squat - EMOM 10 Min',
  '30 DU + 10 Air Squats',
  'Jump Rope',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  468,
  'EMOM Cluster',
  'EMOM',
  'EMOM',
  'EMOM Cluster - EMOM 8 Min',
  '5 Clusters (Squat Clean Thruster)',
  'Barbell',
  8,
  8,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  469,
  'EMOM Muscle-up Practice',
  'EMOM',
  'EMOM',
  'EMOM Muscle-up Practice - EMOM 10 Min',
  '3 Ring Muscle-ups',
  'Rings',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  470,
  'EMOM Handstand Push-up',
  'EMOM',
  'EMOM',
  'EMOM Handstand Push-up - EMOM 8 Min',
  '5 HSPU + 10 Push-ups',
  'Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  471,
  'EMOM KB Snatch',
  'EMOM',
  'EMOM',
  'EMOM KB Snatch - EMOM 10 Min',
  '10 KB Snatches (5 each arm)',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  472,
  'EMOM Back Squat',
  'EMOM',
  'EMOM',
  'EMOM Back Squat - EMOM 10 Min',
  '5 Back Squats at 70%',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  473,
  'EMOM Clean Jerk',
  'EMOM',
  'EMOM',
  'EMOM Clean Jerk - EMOM 10 Min',
  '1 Clean & Jerk (heavy)',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  474,
  'EMOM Row Burpee',
  'EMOM',
  'EMOM',
  'EMOM Row Burpee - EMOM 10 Min',
  'Min 1: 12 Cal Row | Min 2: 8 Burpees',
  'Rowing Machine, Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  475,
  'EMOM Dumbbell Complex',
  'EMOM',
  'EMOM',
  'EMOM Dumbbell Complex - EMOM 12 Min',
  '6 DB Hang Power Cleans + 6 DB Push Press',
  'Dumbbell',
  12,
  12,
  '10-15 Reps/Min',
  '22.5/15',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  476,
  'EMOM Pull-up Push-up',
  'EMOM',
  'EMOM',
  'EMOM Pull-up Push-up - EMOM 10 Min',
  'Min 1: 8 Pull-ups | Min 2: 15 Push-ups',
  'Pull-up Bar, Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  477,
  'EMOM Squat Clean',
  'EMOM',
  'EMOM',
  'EMOM Squat Clean - EMOM 10 Min',
  '3 Squat Cleans',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  478,
  'EMOM KB Goblet',
  'EMOM',
  'EMOM',
  'EMOM KB Goblet - EMOM 10 Min',
  '15 Goblet Squats + 10 KB Swings',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  479,
  'EMOM Bike Abs',
  'EMOM',
  'EMOM',
  'EMOM Bike Abs - EMOM 12 Min',
  'Min 1: 12 Cal Bike | Min 2: 15 Sit-ups',
  'Assault Bike, Bodyweight',
  12,
  12,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  480,
  'EMOM Deadlift HSPU',
  'EMOM',
  'EMOM',
  'EMOM Deadlift HSPU - EMOM 10 Min',
  'Min 1: 5 Deadlifts | Min 2: 5 HSPU',
  'Barbell, Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  481,
  'EMOM Hang Power Clean',
  'EMOM',
  'EMOM',
  'EMOM Hang Power Clean - EMOM 10 Min',
  '5 Hang Power Cleans',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  482,
  'EMOM Jump Rope Squat',
  'EMOM',
  'EMOM',
  'EMOM Jump Rope Squat - EMOM 8 Min',
  '40 Singles + 15 Air Squats',
  'Jump Rope',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  483,
  'EMOM Power Snatch',
  'EMOM',
  'EMOM',
  'EMOM Power Snatch - EMOM 10 Min',
  '3 Power Snatches',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  484,
  'EMOM Wall Ball Pull-up',
  'EMOM',
  'EMOM',
  'EMOM Wall Ball Pull-up - EMOM 10 Min',
  'Min 1: 15 Wall Balls | Min 2: 8 Pull-ups',
  'Wall Ball, Pull-up Bar',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  485,
  'EMOM KB Turkish',
  'EMOM',
  'EMOM',
  'EMOM KB Turkish - EMOM 10 Min',
  '2 Turkish Get-ups (1 each side)',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  486,
  'EMOM Box Jump DU',
  'EMOM',
  'EMOM',
  'EMOM Box Jump DU - EMOM 10 Min',
  'Min 1: 10 Box Jumps | Min 2: 30 DU',
  'Box, Jump Rope',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  487,
  'EMOM Front Squat',
  'EMOM',
  'EMOM',
  'EMOM Front Squat - EMOM 8 Min',
  '5 Front Squats at 70%',
  'Barbell',
  8,
  8,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  488,
  'EMOM Strict Pull Push',
  'EMOM',
  'EMOM',
  'EMOM Strict Pull Push - EMOM 10 Min',
  'Min 1: 5 Strict Pull-ups | Min 2: 10 Dips',
  'Pull-up Bar, Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  489,
  'EMOM Row KB Sprint',
  'EMOM',
  'EMOM',
  'EMOM Row KB Sprint - EMOM 16 Min',
  'Min 1: 20 Cal Row | Min 2: 15 KB Swings | Min 3: 10 Burpees | Min 4: Rest',
  'Rowing Machine, Kettlebell',
  16,
  16,
  '10-15 Reps/Min',
  '24/16',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  490,
  'EMOM Snatch Grip DL',
  'EMOM',
  'EMOM',
  'EMOM Snatch Grip DL - EMOM 8 Min',
  '5 Snatch Grip Deadlifts',
  'Barbell',
  8,
  8,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  491,
  'EMOM Jumping Lunge',
  'EMOM',
  'EMOM',
  'EMOM Jumping Lunge - EMOM 10 Min',
  '20 Jumping Lunges + 10 Push-ups',
  'Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  492,
  'EMOM KB Press',
  'EMOM',
  'EMOM',
  'EMOM KB Press - EMOM 10 Min',
  '8 KB Strict Press each arm',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  493,
  'EMOM Thruster Row',
  'EMOM',
  'EMOM',
  'EMOM Thruster Row - EMOM 12 Min',
  'Min 1: 7 Thrusters | Min 2: 12 Cal Row',
  'Barbell, Rowing Machine',
  12,
  12,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  494,
  'EMOM Pistol Squat',
  'EMOM',
  'EMOM',
  'EMOM Pistol Squat - EMOM 10 Min',
  '5 Pistol Squats each leg',
  'Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  495,
  'EMOM DB Snatch',
  'EMOM',
  'EMOM',
  'EMOM DB Snatch - EMOM 10 Min',
  '10 DB Snatches (5 each arm)',
  'Dumbbell',
  10,
  10,
  '10-15 Reps/Min',
  '22.5/15',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  496,
  'EMOM Clean Complex',
  'EMOM',
  'EMOM',
  'EMOM Clean Complex - EMOM 12 Min',
  '2 Hang Power Clean + 2 Power Clean + 2 Clean',
  'Barbell',
  12,
  12,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  497,
  'EMOM T2B KB',
  'EMOM',
  'EMOM',
  'EMOM T2B KB - EMOM 10 Min',
  'Min 1: 10 T2B | Min 2: 15 KB Swings',
  'Pull-up Bar, Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  498,
  'EMOM Bike Row',
  'EMOM',
  'EMOM',
  'EMOM Bike Row - EMOM 14 Min',
  'Min 1-7: 10 Cal Bike | Min 8-14: 12 Cal Row',
  'Assault Bike, Rowing Machine',
  14,
  14,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  499,
  'EMOM Strict HSPU',
  'EMOM',
  'EMOM',
  'EMOM Strict HSPU - EMOM 8 Min',
  '5 Strict HSPU',
  'Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  500,
  'EMOM Plank Complex',
  'EMOM',
  'EMOM',
  'EMOM Plank Complex - EMOM 10 Min',
  '30s Plank + 10 Mountain Climbers',
  'Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  501,
  'EMOM Squat Snatch',
  'EMOM',
  'EMOM',
  'EMOM Squat Snatch - EMOM 10 Min',
  '2 Squat Snatches',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  502,
  'EMOM Air Squat Sprint',
  'EMOM',
  'EMOM',
  'EMOM Air Squat Sprint - EMOM 8 Min',
  '20 Air Squats',
  'Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  503,
  'EMOM V-up KB',
  'EMOM',
  'EMOM',
  'EMOM V-up KB - EMOM 10 Min',
  'Min 1: 15 V-ups | Min 2: 20 KB Swings',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  504,
  'EMOM Lunge KB Press',
  'EMOM',
  'EMOM',
  'EMOM Lunge KB Press - EMOM 10 Min',
  '10 Walking Lunges + 8 KB Press',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  505,
  'EMOM Bike Burpee',
  'EMOM',
  'EMOM',
  'EMOM Bike Burpee - EMOM 12 Min',
  'Min 1: 10 Cal Bike | Min 2: 8 Burpees',
  'Assault Bike, Bodyweight',
  12,
  12,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  506,
  'EMOM Ring Row Push',
  'EMOM',
  'EMOM',
  'EMOM Ring Row Push - EMOM 10 Min',
  'Min 1: 10 Ring Rows | Min 2: 15 Push-ups',
  'Rings, Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  507,
  'EMOM KB Deadlift Row',
  'EMOM',
  'EMOM',
  'EMOM KB Deadlift Row - EMOM 10 Min',
  '10 KB Deadlifts + 10 KB Rows each side',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  508,
  'EMOM Jump Squat',
  'EMOM',
  'EMOM',
  'EMOM Jump Squat - EMOM 8 Min',
  '15 Jump Squats',
  'Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  509,
  'EMOM Hang Snatch',
  'EMOM',
  'EMOM',
  'EMOM Hang Snatch - EMOM 10 Min',
  '3 Hang Snatches',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  510,
  'EMOM GHD Sit-up',
  'EMOM',
  'EMOM',
  'EMOM GHD Sit-up - EMOM 10 Min',
  '15 GHD Sit-ups',
  'GHD Machine',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  511,
  'EMOM Back Extension',
  'EMOM',
  'EMOM',
  'EMOM Back Extension - EMOM 10 Min',
  '15 Back Extensions',
  'GHD Machine',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  512,
  'EMOM KB Windmill',
  'EMOM',
  'EMOM',
  'EMOM KB Windmill - EMOM 10 Min',
  '5 Windmills each side',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  513,
  'EMOM Sumo DL High Pull',
  'EMOM',
  'EMOM',
  'EMOM Sumo DL High Pull - EMOM 10 Min',
  '10 Sumo Deadlift High Pulls',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  514,
  'EMOM Box Step KB',
  'EMOM',
  'EMOM',
  'EMOM Box Step KB - EMOM 12 Min',
  'Min 1: 10 Box Step-ups | Min 2: 15 KB Swings',
  'Box, Kettlebell',
  12,
  12,
  '10-15 Reps/Min',
  '24/16',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  515,
  'EMOM Ring Push-up',
  'EMOM',
  'EMOM',
  'EMOM Ring Push-up - EMOM 8 Min',
  '15 Ring Push-ups',
  'Rings',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  516,
  'EMOM Overhead Walk',
  'EMOM',
  'EMOM',
  'EMOM Overhead Walk - EMOM 10 Min',
  '20m Overhead Carry each arm',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  517,
  'EMOM Power Clean T2B',
  'EMOM',
  'EMOM',
  'EMOM Power Clean T2B - EMOM 10 Min',
  'Min 1: 5 Power Cleans | Min 2: 8 T2B',
  'Barbell, Pull-up Bar',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  518,
  'EMOM Ski Row Bike',
  'EMOM',
  'EMOM',
  'EMOM Ski Row Bike - EMOM 15 Min',
  'Min 1: 15 Cal Ski | Min 2: 15 Cal Row | Min 3: 15 Cal Bike',
  'Ski Erg, Rowing Machine, Assault Bike',
  15,
  15,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  519,
  'EMOM Dip Lunge',
  'EMOM',
  'EMOM',
  'EMOM Dip Lunge - EMOM 10 Min',
  'Min 1: 10 Dips | Min 2: 20 Lunges',
  'Pull-up Bar, Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  520,
  'EMOM Bear Complex',
  'EMOM',
  'EMOM',
  'EMOM Bear Complex - EMOM 7 Min',
  '1 Bear Complex (PC + FS + PP + BS + PP)',
  'Barbell',
  7,
  7,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  521,
  'EMOM KB Flow',
  'EMOM',
  'EMOM',
  'EMOM KB Flow - EMOM 10 Min',
  '5 KB Clean + 5 KB Press + 5 KB Squat (each arm)',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  522,
  'EMOM Hollow Body',
  'EMOM',
  'EMOM',
  'EMOM Hollow Body - EMOM 8 Min',
  '30s Hollow Body Hold',
  'Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  523,
  'EMOM Broad Jump Burpee',
  'EMOM',
  'EMOM',
  'EMOM Broad Jump Burpee - EMOM 8 Min',
  '5 Broad Jumps + 5 Burpees',
  'Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  524,
  'EMOM Sandbag Clean',
  'EMOM',
  'EMOM',
  'EMOM Sandbag Clean - EMOM 10 Min',
  '5 Sandbag Cleans + 5 Shoulder-to-OH',
  'Sandbag',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  525,
  'EMOM KB Farmers Carry',
  'EMOM',
  'EMOM',
  'EMOM KB Farmers Carry - EMOM 10 Min',
  '40m KB Farmers Carry + 10 KB Swings',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  526,
  'EMOM Push Jerk',
  'EMOM',
  'EMOM',
  'EMOM Push Jerk - EMOM 8 Min',
  '5 Push Jerks at 70%',
  'Barbell',
  8,
  8,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  527,
  'EMOM Assault Row Sit',
  'EMOM',
  'EMOM',
  'EMOM Assault Row Sit - EMOM 12 Min',
  '4 Rounds: 10 Cal Bike, 10 Cal Row, 10 Sit-ups',
  'Assault Bike, Rowing Machine, Bodyweight',
  12,
  12,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  528,
  'EMOM Deficit Push-up',
  'EMOM',
  'EMOM',
  'EMOM Deficit Push-up - EMOM 8 Min',
  '10 Deficit Push-ups',
  'Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  529,
  'EMOM Pause Squat',
  'EMOM',
  'EMOM',
  'EMOM Pause Squat - EMOM 8 Min',
  '3 Pause Back Squats (3s hold)',
  'Barbell',
  8,
  8,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  530,
  'EMOM KB Complex 3',
  'EMOM',
  'EMOM',
  'EMOM KB Complex 3 - EMOM 10 Min',
  '5 KB Swings + 5 KB Cleans + 5 KB Press (each arm)',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  531,
  'EMOM Bike Sprint',
  'EMOM',
  'EMOM',
  'EMOM Bike Sprint - EMOM 10 Min',
  '10 Cal Assault Bike sprint',
  'Assault Bike',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  532,
  'EMOM T2B DU',
  'EMOM',
  'EMOM',
  'EMOM T2B DU - EMOM 10 Min',
  'Min 1: 10 T2B | Min 2: 30 DU',
  'Pull-up Bar, Jump Rope',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  533,
  'EMOM Hang Clean',
  'EMOM',
  'EMOM',
  'EMOM Hang Clean - EMOM 10 Min',
  '3 Hang Squat Cleans',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  534,
  'EMOM Wall Sit KB',
  'EMOM',
  'EMOM',
  'EMOM Wall Sit KB - EMOM 8 Min',
  '30s Wall Sit + 10 KB Swings',
  'Kettlebell, Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  535,
  'EMOM Ring Muscle-up Dip',
  'EMOM',
  'EMOM',
  'EMOM Ring Muscle-up Dip - EMOM 10 Min',
  'Min 1: 3 Ring Muscle-ups | Min 2: 10 Ring Dips',
  'Rings',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  536,
  'EMOM Bar Muscle-up',
  'EMOM',
  'EMOM',
  'EMOM Bar Muscle-up - EMOM 8 Min',
  '3 Bar Muscle-ups',
  'Pull-up Bar',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  537,
  'EMOM KB Halo',
  'EMOM',
  'EMOM',
  'EMOM KB Halo - EMOM 8 Min',
  '8 KB Halos + 10 KB Swings',
  'Kettlebell',
  8,
  8,
  '10-15 Reps/Min',
  '24/16',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  538,
  'EMOM Thruster Complex',
  'EMOM',
  'EMOM',
  'EMOM Thruster Complex - EMOM 10 Min',
  '3 Thrusters (heavy)',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  539,
  'EMOM Push-up Squat Run',
  'EMOM',
  'EMOM',
  'EMOM Push-up Squat Run - EMOM 12 Min',
  'Min 1: 15 Push-ups | Min 2: 20 Squats | Min 3: 200m Run',
  'Bodyweight',
  12,
  12,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  540,
  'EMOM Ski Burpee',
  'EMOM',
  'EMOM',
  'EMOM Ski Burpee - EMOM 10 Min',
  'Min 1: 15 Cal Ski | Min 2: 8 Burpees',
  'Ski Erg, Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  541,
  'EMOM RDL Row',
  'EMOM',
  'EMOM',
  'EMOM RDL Row - EMOM 10 Min',
  '8 Romanian Deadlifts + 8 Bent-over Rows',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  542,
  'EMOM Seated Press',
  'EMOM',
  'EMOM',
  'EMOM Seated Press - EMOM 8 Min',
  '10 Seated DB Press',
  'Dumbbell',
  8,
  8,
  '10-15 Reps/Min',
  '22.5/15',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  543,
  'EMOM DU Sit-up',
  'EMOM',
  'EMOM',
  'EMOM DU Sit-up - EMOM 10 Min',
  'Min 1: 30 DU | Min 2: 20 Sit-ups',
  'Jump Rope, Bodyweight',
  10,
  10,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  544,
  'EMOM Step-up Press',
  'EMOM',
  'EMOM',
  'EMOM Step-up Press - EMOM 10 Min',
  '10 Box Step-ups + 10 DB Press',
  'Box, Dumbbell',
  10,
  10,
  '10-15 Reps/Min',
  '22.5/15',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  545,
  'EMOM Jerk Drive',
  'EMOM',
  'EMOM',
  'EMOM Jerk Drive - EMOM 8 Min',
  '3 Split Jerks',
  'Barbell',
  8,
  8,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  546,
  'EMOM Hip Thrust',
  'EMOM',
  'EMOM',
  'EMOM Hip Thrust - EMOM 8 Min',
  '10 Hip Thrusts',
  'Barbell, Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  547,
  'EMOM KB Single Leg',
  'EMOM',
  'EMOM',
  'EMOM KB Single Leg - EMOM 10 Min',
  '8 Single-leg KB Deadlifts each leg',
  'Kettlebell',
  10,
  10,
  '10-15 Reps/Min',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  548,
  'EMOM Assault Bike Max',
  'EMOM',
  'EMOM',
  'EMOM Assault Bike Max - EMOM 5 Min',
  'Max Cal Assault Bike each minute',
  'Assault Bike',
  5,
  5,
  '10-15 Reps/Min',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  549,
  'EMOM Overhead Squat',
  'EMOM',
  'EMOM',
  'EMOM Overhead Squat - EMOM 10 Min',
  '5 Overhead Squats',
  'Barbell',
  10,
  10,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  550,
  'EMOM Push-up Plank',
  'EMOM',
  'EMOM',
  'EMOM Push-up Plank - EMOM 8 Min',
  '10 Push-ups + 20s Plank Hold',
  'Bodyweight',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  551,
  'EMOM Box Burpee KB',
  'EMOM',
  'EMOM',
  'EMOM Box Burpee KB - EMOM 12 Min',
  'Min 1: 8 Box Jumps | Min 2: 15 KB Swings | Min 3: 5 Burpees',
  'Box, Kettlebell, Bodyweight',
  12,
  12,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  552,
  'EMOM Banded Pull-apart',
  'EMOM',
  'EMOM',
  'EMOM Banded Pull-apart - EMOM 8 Min',
  '15 Band Pull-aparts + 10 OH Band Press',
  'Resistance Band',
  8,
  8,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  553,
  'Tabata Air Squat',
  'Tabata',
  'Tabata',
  'Tabata Air Squat - Tabata (20s on / 10s off)',
  'Air Squats',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  554,
  'Tabata Push-up',
  'Tabata',
  'Tabata',
  'Tabata Push-up - Tabata (20s on / 10s off)',
  'Push-ups',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  555,
  'Tabata Burpee',
  'Tabata',
  'Tabata',
  'Tabata Burpee - Tabata (20s on / 10s off)',
  'Burpees',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  556,
  'Tabata KB Swing',
  'Tabata',
  'Tabata',
  'Tabata KB Swing - Tabata (20s on / 10s off)',
  'KB Swings',
  'Kettlebell',
  4,
  8,
  '20s on / 10s off',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  557,
  'Tabata Sit-up',
  'Tabata',
  'Tabata',
  'Tabata Sit-up - Tabata (20s on / 10s off)',
  'Sit-ups',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  558,
  'Tabata Row',
  'Tabata',
  'Tabata',
  'Tabata Row - Tabata (20s on / 10s off)',
  'Row (Cals)',
  'Rowing Machine',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  559,
  'Tabata Wall Ball',
  'Tabata',
  'Tabata',
  'Tabata Wall Ball - Tabata (20s on / 10s off)',
  'Wall Balls',
  'Wall Ball',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  560,
  'Tabata Box Jump',
  'Tabata',
  'Tabata',
  'Tabata Box Jump - Tabata (20s on / 10s off)',
  'Box Jumps',
  'Box',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  561,
  'Tabata Double Under',
  'Tabata',
  'Tabata',
  'Tabata Double Under - Tabata (20s on / 10s off)',
  'Double Unders',
  'Jump Rope',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  562,
  'Tabata Thruster',
  'Tabata',
  'Tabata',
  'Tabata Thruster - Tabata (20s on / 10s off)',
  'Thrusters',
  'Barbell',
  4,
  8,
  '20s on / 10s off',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  563,
  'Tabata Pull-up',
  'Tabata',
  'Tabata',
  'Tabata Pull-up - Tabata (20s on / 10s off)',
  'Pull-ups',
  'Pull-up Bar',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  564,
  'Tabata Ring Row',
  'Tabata',
  'Tabata',
  'Tabata Ring Row - Tabata (20s on / 10s off)',
  'Ring Rows',
  'Rings',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  565,
  'Tabata Mountain Climber',
  'Tabata',
  'Tabata',
  'Tabata Mountain Climber - Tabata (20s on / 10s off)',
  'Mountain Climbers',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  566,
  'Tabata Lunge',
  'Tabata',
  'Tabata',
  'Tabata Lunge - Tabata (20s on / 10s off)',
  'Alternating Lunges',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  567,
  'Tabata Jumping Lunge',
  'Tabata',
  'Tabata',
  'Tabata Jumping Lunge - Tabata (20s on / 10s off)',
  'Jumping Lunges',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  568,
  'Tabata KB Goblet Squat',
  'Tabata',
  'Tabata',
  'Tabata KB Goblet Squat - Tabata (20s on / 10s off)',
  'KB Goblet Squats',
  'Kettlebell',
  4,
  8,
  '20s on / 10s off',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  569,
  'Tabata DB Snatch',
  'Tabata',
  'Tabata',
  'Tabata DB Snatch - Tabata (20s on / 10s off)',
  'DB Snatches (alternating)',
  'Dumbbell',
  4,
  8,
  '20s on / 10s off',
  '22.5/15',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  570,
  'Tabata Assault Bike',
  'Tabata',
  'Tabata',
  'Tabata Assault Bike - Tabata (20s on / 10s off)',
  'Max Cal Assault Bike',
  'Assault Bike',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  571,
  'Tabata V-up',
  'Tabata',
  'Tabata',
  'Tabata V-up - Tabata (20s on / 10s off)',
  'V-ups',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  572,
  'Tabata T2B',
  'Tabata',
  'Tabata',
  'Tabata T2B - Tabata (20s on / 10s off)',
  'Toes-to-Bar',
  'Pull-up Bar',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  573,
  'Tabata HSPU',
  'Tabata',
  'Tabata',
  'Tabata HSPU - Tabata (20s on / 10s off)',
  'Handstand Push-ups',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  574,
  'Tabata Ring Dip',
  'Tabata',
  'Tabata',
  'Tabata Ring Dip - Tabata (20s on / 10s off)',
  'Ring Dips',
  'Rings',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  575,
  'Tabata Hollow Rock',
  'Tabata',
  'Tabata',
  'Tabata Hollow Rock - Tabata (20s on / 10s off)',
  'Hollow Rocks',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  576,
  'Tabata Push-up Squat',
  'Tabata',
  'Tabata',
  'Tabata Push-up Squat - Tabata (20s on / 10s off)',
  'Push-up + Air Squat combo',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  577,
  'Tabata KB Snatch',
  'Tabata',
  'Tabata',
  'Tabata KB Snatch - Tabata (20s on / 10s off)',
  'KB Snatches (alternating arms)',
  'Kettlebell',
  4,
  8,
  '20s on / 10s off',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  578,
  'Tabata Jump Squat',
  'Tabata',
  'Tabata',
  'Tabata Jump Squat - Tabata (20s on / 10s off)',
  'Jump Squats',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  579,
  'Tabata Dip',
  'Tabata',
  'Tabata',
  'Tabata Dip - Tabata (20s on / 10s off)',
  'Bar Dips',
  'Pull-up Bar',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  580,
  'Tabata Wall Sit',
  'Tabata',
  'Tabata',
  'Tabata Wall Sit - Tabata (20s on / 10s off)',
  'Wall Sit hold',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  581,
  'Tabata Broad Jump',
  'Tabata',
  'Tabata',
  'Tabata Broad Jump - Tabata (20s on / 10s off)',
  'Broad Jumps',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  582,
  'Tabata Ski Erg',
  'Tabata',
  'Tabata',
  'Tabata Ski Erg - Tabata (20s on / 10s off)',
  'Ski Erg Max Cals',
  'Ski Erg',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  583,
  'Tabata Plank',
  'Tabata',
  'Tabata',
  'Tabata Plank - Tabata (20s on / 10s off)',
  'Plank Hold',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  584,
  'Tabata Superman',
  'Tabata',
  'Tabata',
  'Tabata Superman - Tabata (20s on / 10s off)',
  'Superman Hold / Back Extensions',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  585,
  'Tabata Glute Bridge',
  'Tabata',
  'Tabata',
  'Tabata Glute Bridge - Tabata (20s on / 10s off)',
  'Glute Bridge',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  586,
  'Tabata High Knees',
  'Tabata',
  'Tabata',
  'Tabata High Knees - Tabata (20s on / 10s off)',
  'High Knees',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  587,
  'Tabata Push-up Burpee',
  'Tabata',
  'Tabata',
  'Tabata Push-up Burpee - Tabata (20s on / 10s off)',
  'Push-up + Burpee (alt)',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  588,
  'Tabata Squat Jump Sit-up',
  'Tabata',
  'Tabata',
  'Tabata Squat Jump Sit-up - Tabata (20s on / 10s off)',
  'Alt: Jump Squats & Sit-ups',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  589,
  'Tabata DB Thruster',
  'Tabata',
  'Tabata',
  'Tabata DB Thruster - Tabata (20s on / 10s off)',
  'DB Thrusters',
  'Dumbbell',
  4,
  8,
  '20s on / 10s off',
  '22.5/15',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  590,
  'Tabata KB Deadlift',
  'Tabata',
  'Tabata',
  'Tabata KB Deadlift - Tabata (20s on / 10s off)',
  'KB Deadlifts',
  'Kettlebell',
  4,
  8,
  '20s on / 10s off',
  '24/16',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  591,
  'Tabata Ring Push-up',
  'Tabata',
  'Tabata',
  'Tabata Ring Push-up - Tabata (20s on / 10s off)',
  'Ring Push-ups',
  'Rings',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  592,
  'Tabata Box Step-up',
  'Tabata',
  'Tabata',
  'Tabata Box Step-up - Tabata (20s on / 10s off)',
  'Box Step-ups',
  'Box',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  593,
  'Tabata Power Clean',
  'Tabata',
  'Tabata',
  'Tabata Power Clean - Tabata (20s on / 10s off)',
  'Power Cleans (light)',
  'Barbell',
  4,
  8,
  '20s on / 10s off',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  594,
  'Tabata Strict Press',
  'Tabata',
  'Tabata',
  'Tabata Strict Press - Tabata (20s on / 10s off)',
  'Strict Press (light)',
  'Barbell',
  4,
  8,
  '20s on / 10s off',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  595,
  'Tabata Hang Power Clean',
  'Tabata',
  'Tabata',
  'Tabata Hang Power Clean - Tabata (20s on / 10s off)',
  'Hang Power Cleans',
  'Barbell',
  4,
  8,
  '20s on / 10s off',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  596,
  'Tabata DU Squat',
  'Tabata',
  'Tabata',
  'Tabata DU Squat - Tabata (20s on / 10s off)',
  '20s DU / 10s Air Squat',
  'Jump Rope',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  597,
  'Tabata KB Row',
  'Tabata',
  'Tabata',
  'Tabata KB Row - Tabata (20s on / 10s off)',
  'KB Bent-over Rows',
  'Kettlebell',
  4,
  8,
  '20s on / 10s off',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  598,
  'Tabata Jumping Jack',
  'Tabata',
  'Tabata',
  'Tabata Jumping Jack - Tabata (20s on / 10s off)',
  'Jumping Jacks',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  599,
  'Tabata Sprint',
  'Tabata',
  'Tabata',
  'Tabata Sprint - Tabata (20s on / 10s off)',
  '20s Sprint / 10s Rest',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  600,
  'Tabata Deadlift',
  'Tabata',
  'Tabata',
  'Tabata Deadlift - Tabata (20s on / 10s off)',
  'Deadlifts (moderate weight)',
  'Barbell',
  4,
  8,
  '20s on / 10s off',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  601,
  'Tabata Push-up Pull-up',
  'Tabata',
  'Tabata',
  'Tabata Push-up Pull-up - Tabata (20s on / 10s off)',
  'Alt: Push-ups / Pull-ups',
  'Pull-up Bar, Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  602,
  'Tabata Step-up Burpee',
  'Tabata',
  'Tabata',
  'Tabata Step-up Burpee - Tabata (20s on / 10s off)',
  'Alt: Box Step-ups / Burpees',
  'Box, Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  603,
  'Tabata KB Press Row',
  'Tabata',
  'Tabata',
  'Tabata KB Press Row - Tabata (20s on / 10s off)',
  'Alt: KB Press / KB Row',
  'Kettlebell',
  4,
  8,
  '20s on / 10s off',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  604,
  'Tabata Squat Jump Pull',
  'Tabata',
  'Tabata',
  'Tabata Squat Jump Pull - Tabata (20s on / 10s off)',
  'Alt: Jump Squats / Pull-ups',
  'Pull-up Bar, Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  605,
  'Tabata Full Body 1',
  'Tabata',
  'Tabata',
  'Tabata Full Body 1 - Tabata (20s on / 10s off)',
  '4 Exercises: Squats, Push-ups, Sit-ups, Burpees — 2 rounds each',
  'Bodyweight',
  16,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  606,
  'Tabata Full Body 2',
  'Tabata',
  'Tabata',
  'Tabata Full Body 2 - Tabata (20s on / 10s off)',
  '4 Exercises: Thrusters, Pull-ups, Deadlifts, Burpees',
  'Barbell, Pull-up Bar',
  16,
  8,
  '20s on / 10s off',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  607,
  'Tabata KB Full',
  'Tabata',
  'Tabata',
  'Tabata KB Full - Tabata (20s on / 10s off)',
  '3 Exercises: KB Swings, KB Goblet Squat, KB Push Press',
  'Kettlebell',
  12,
  8,
  '20s on / 10s off',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  608,
  'Tabata Cardio Blast',
  'Tabata',
  'Tabata',
  'Tabata Cardio Blast - Tabata (20s on / 10s off)',
  'Alt: Burpees / Mountain Climbers',
  'Bodyweight',
  8,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  609,
  'Tabata Core 1',
  'Tabata',
  'Tabata',
  'Tabata Core 1 - Tabata (20s on / 10s off)',
  'Alt: Sit-ups / Hollow Rocks',
  'Bodyweight',
  8,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  610,
  'Tabata Core 2',
  'Tabata',
  'Tabata',
  'Tabata Core 2 - Tabata (20s on / 10s off)',
  'Alt: V-ups / Plank',
  'Bodyweight',
  8,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  611,
  'Tabata Legs 1',
  'Tabata',
  'Tabata',
  'Tabata Legs 1 - Tabata (20s on / 10s off)',
  'Alt: Air Squats / Lunges',
  'Bodyweight',
  8,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  612,
  'Tabata Legs 2',
  'Tabata',
  'Tabata',
  'Tabata Legs 2 - Tabata (20s on / 10s off)',
  'Alt: Jump Squats / Jumping Lunges',
  'Bodyweight',
  8,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  613,
  'Tabata Upper Body',
  'Tabata',
  'Tabata',
  'Tabata Upper Body - Tabata (20s on / 10s off)',
  'Alt: Push-ups / Ring Rows',
  'Pull-up Bar, Bodyweight',
  8,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  614,
  'Tabata Bike Row',
  'Tabata',
  'Tabata',
  'Tabata Bike Row - Tabata (20s on / 10s off)',
  'Alt: Max Cal Bike / Max Cal Row',
  'Assault Bike, Rowing Machine',
  8,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  615,
  'Tabata Snatch Squat',
  'Tabata',
  'Tabata',
  'Tabata Snatch Squat - Tabata (20s on / 10s off)',
  'Power Snatch + OHS combo',
  'Barbell',
  4,
  8,
  '20s on / 10s off',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  616,
  'Tabata Bear Crawl',
  'Tabata',
  'Tabata',
  'Tabata Bear Crawl - Tabata (20s on / 10s off)',
  'Bear Crawl 20m / Rest',
  'Bodyweight',
  4,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  617,
  'Push Pull 21-15-9',
  'HomeWOD',
  'ForTime',
  'Push Pull 21-15-9 - For Time',
  '21-15-9: Pull-ups, Push-ups',
  'Bodyweight',
  12,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  618,
  'Bodyweight 100s',
  'HomeWOD',
  'ForTime',
  'Bodyweight 100s - For Time',
  '100 Pull-ups, 100 Push-ups, 100 Sit-ups, 100 Squats — partition as needed',
  'Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  619,
  'AMRAP Burpee Squat 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Squat 10 - AMRAP 10 Min',
  '10 Min AMRAP: 10 Burpees, 20 Air Squats',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  620,
  'AMRAP Push Lunge 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Push Lunge 12 - AMRAP 12 Min',
  '12 Min AMRAP: 12 Push-ups, 12 Lunges each leg',
  'Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  621,
  'Chipper 50-40-30-20-10',
  'HomeWOD',
  'ForTime',
  'Chipper 50-40-30-20-10 - For Time',
  '50 Jumping Jacks, 40 Sit-ups, 30 Squats, 20 Push-ups, 10 Burpees',
  'Bodyweight',
  25,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  622,
  'AMRAP Sit Squat Lunge 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Sit Squat Lunge 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Sit-ups, 15 Squats, 15 Lunges',
  'Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  623,
  '10 Rounds Push Squat',
  'HomeWOD',
  'ForTime',
  '10 Rounds Push Squat - For Time',
  '10 Rounds: 10 Push-ups, 10 Squats',
  'Bodyweight',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  624,
  'AMRAP Burpee Pull 8',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Pull 8 - AMRAP 8 Min',
  '8 Min AMRAP: 5 Burpees, 5 Pull-ups',
  'Pull-up Bar',
  8,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  625,
  'Death by Push-up',
  'HomeWOD',
  'EMOM',
  'Death by Push-up - EMOM 20 Min',
  'Min 1: 1 Push-up, min 2: 2, continue until failure',
  'Bodyweight',
  20,
  20,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  626,
  'AMRAP Mountain Climber Squat 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Mountain Climber Squat 10 - AMRAP 10 Min',
  '10 Min AMRAP: 20 Mountain Climbers, 15 Air Squats',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  627,
  'Bodyweight Ladder 1-10',
  'HomeWOD',
  'ForTime',
  'Bodyweight Ladder 1-10 - For Time',
  '1-10 Ladder: Push-ups + Sit-ups',
  'Bodyweight',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  628,
  'AMRAP V-up Push Burpee 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP V-up Push Burpee 12 - AMRAP 12 Min',
  '12 Min AMRAP: 10 V-ups, 10 Push-ups, 5 Burpees',
  'Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  629,
  'Sprint Squat 8 Rounds',
  'HomeWOD',
  'ForTime',
  'Sprint Squat 8 Rounds - For Time',
  '8 Rounds: 200m Sprint, 20 Air Squats',
  'Bodyweight',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  630,
  'AMRAP Lunge Sit Jump 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Lunge Sit Jump 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 Lunges, 20 Sit-ups, 20 Jump Squats',
  'Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  631,
  'Bodyweight Cindy',
  'HomeWOD',
  'AMRAP',
  'Bodyweight Cindy - AMRAP 20 Min',
  '20 Min AMRAP: 5 Pull-ups, 10 Push-ups, 15 Squats',
  'Pull-up Bar, Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  632,
  'Push Sit Run Chipper',
  'HomeWOD',
  'ForTime',
  'Push Sit Run Chipper - For Time',
  '100 Push-ups, 100 Sit-ups, 1 Mile Run',
  'Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  633,
  'AMRAP Burpee Jump 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Jump 15 - AMRAP 15 Min',
  '15 Min AMRAP: 8 Burpees, 12 Jump Squats',
  'Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  634,
  'Full Body Ladder 5-10-15',
  'HomeWOD',
  'ForTime',
  'Full Body Ladder 5-10-15 - For Time',
  '5 Rounds: 5 Pull-ups, 10 Push-ups, 15 Squats, 20 Sit-ups',
  'Bodyweight',
  18,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  635,
  'AMRAP HC Plank Push 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Plank Push 10 - AMRAP 10 Min',
  '10 Min AMRAP: 20 HC, 30s Plank, 10 Push-ups',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  636,
  'Bodyweight 300',
  'HomeWOD',
  'ForTime',
  'Bodyweight 300 - For Time',
  '25 Pull-ups, 50 DL, 50 Push-ups, 50 Box Jumps, 50 Floor Wipers, 50 Clean & Press, 25 Pull-ups',
  'Pull-up Bar, Bodyweight',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  637,
  'AMRAP Burpee Sit Squat 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Sit Squat 20 - AMRAP 20 Min',
  '20 Min AMRAP: 5 Burpees, 10 Sit-ups, 15 Squats',
  'Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  638,
  '10 Rounds Pull Push Sit',
  'HomeWOD',
  'ForTime',
  '10 Rounds Pull Push Sit - For Time',
  '10 Rounds: 5 Pull-ups, 10 Push-ups, 15 Sit-ups',
  'Pull-up Bar, Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  639,
  'AMRAP Jump Lunge V-up 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Jump Lunge V-up 12 - AMRAP 12 Min',
  '12 Min AMRAP: 15 Jump Squats, 15 Lunges, 10 V-ups',
  'Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  640,
  'Tabata Something Bodyweight',
  'HomeWOD',
  'Tabata',
  'Tabata Something Bodyweight - Tabata (20s on / 10s off)',
  '4 Exercises Tabata: Squats, Push-ups, Sit-ups, Burpees',
  'Bodyweight',
  16,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  641,
  'Push-up Pyramid 1-10-1',
  'HomeWOD',
  'ForTime',
  'Push-up Pyramid 1-10-1 - For Time',
  'Pyramid up and down: 1-2-3...10-9...1 Push-ups',
  'Bodyweight',
  12,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  642,
  'AMRAP Climb Push Squat 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Climb Push Squat 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Mountain Climbers, 10 Push-ups, 20 Squats',
  'Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  643,
  'Sprint Lunge Push 6 Rounds',
  'HomeWOD',
  'ForTime',
  'Sprint Lunge Push 6 Rounds - For Time',
  '6 Rounds: 200m Sprint, 15 Lunges, 15 Push-ups',
  'Bodyweight',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  644,
  'AMRAP Burpee HC V-up 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee HC V-up 10 - AMRAP 10 Min',
  '10 Min AMRAP: 8 Burpees, 20 HC, 10 V-ups',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  645,
  'AMRAP Double Push Squat 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Double Push Squat 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 Push-ups, 30 Squats',
  'Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  646,
  '100 Burpee Challenge',
  'HomeWOD',
  'ForTime',
  '100 Burpee Challenge - For Time',
  '100 Burpees for time',
  'Bodyweight',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  647,
  'AMRAP Sit Lunge Push 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Sit Lunge Push 12 - AMRAP 12 Min',
  '12 Min AMRAP: 12 Sit-ups, 12 Lunges, 12 Push-ups',
  'Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  648,
  'Bodyweight Tabata 4x',
  'HomeWOD',
  'Tabata',
  'Bodyweight Tabata 4x - Tabata (20s on / 10s off)',
  'Tabata: Push-ups / Squats / Sit-ups / Burpees',
  'Bodyweight',
  16,
  8,
  '20s on / 10s off',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  649,
  '8 Rounds Sprint Squat Sit',
  'HomeWOD',
  'ForTime',
  '8 Rounds Sprint Squat Sit - For Time',
  '8 Rounds: 100m Sprint, 15 Squats, 15 Sit-ups',
  'Bodyweight',
  16,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  650,
  'AMRAP Burpee Pull Jump 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Pull Jump 15 - AMRAP 15 Min',
  '15 Min AMRAP: 5 Burpees, 5 Pull-ups, 10 Jump Squats',
  'Pull-up Bar, Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  651,
  'Push-up Sit-up 21-15-9',
  'HomeWOD',
  'ForTime',
  'Push-up Sit-up 21-15-9 - For Time',
  '21-15-9: Push-ups, Sit-ups',
  'Bodyweight',
  8,
  1,
  '21-15-9',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  652,
  'AMRAP HC Squat Lunge 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Squat Lunge 10 - AMRAP 10 Min',
  '10 Min AMRAP: 20 HC, 20 Squats, 20 Lunges',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  653,
  'Box Jump Burpee Sit 5 Rounds',
  'HomeWOD',
  'ForTime',
  'Box Jump Burpee Sit 5 Rounds - For Time',
  '5 Rounds: 15 Box Jumps, 10 Burpees, 20 Sit-ups',
  'Box, Bodyweight',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  654,
  'AMRAP Pull Push Sit Squat 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Pull Push Sit Squat 20 - AMRAP 20 Min',
  '20 Min AMRAP: 5 Pull-ups, 10 Push-ups, 15 Sit-ups, 20 Squats',
  'Pull-up Bar, Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  655,
  'Bodyweight Hurricane',
  'HomeWOD',
  'ForTime',
  'Bodyweight Hurricane - For Time',
  '3 Rounds: 400m Sprint, 20 Burpees, 30 Push-ups, 40 Sit-ups, 50 Squats',
  'Bodyweight',
  25,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  656,
  'AMRAP Plank Push V 8',
  'HomeWOD',
  'AMRAP',
  'AMRAP Plank Push V 8 - AMRAP 8 Min',
  '8 Min AMRAP: 30s Plank, 10 Push-ups, 10 V-ups',
  'Bodyweight',
  8,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  657,
  '10x10 Push Pull',
  'HomeWOD',
  'ForTime',
  '10x10 Push Pull - For Time',
  '10 Sets of 10 Push-ups + 10 Pull-ups',
  'Pull-up Bar, Bodyweight',
  18,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  658,
  'AMRAP Jump HC Squat 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Jump HC Squat 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Jump Squats, 20 HC, 15 Sit-ups',
  'Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  659,
  '5x5 Sprint Burpee',
  'HomeWOD',
  'ForTime',
  '5x5 Sprint Burpee - For Time',
  '5 Rounds: 100m Sprint, 5 Burpees, 5 Burpees again',
  'Bodyweight',
  12,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  660,
  'AMRAP Lunge Push Jump 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Lunge Push Jump 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 Lunges, 15 Push-ups, 15 Jump Squats',
  'Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  661,
  'AMRAP Burpee Jump Sit 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Jump Sit 10 - AMRAP 10 Min',
  '10 Min AMRAP: 5 Burpees, 10 Jump Squats, 15 Sit-ups',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  662,
  'Push Squat Run 4 Miles',
  'HomeWOD',
  'ForTime',
  'Push Squat Run 4 Miles - For Time',
  '1 Mile Run, 100 Push-ups, 1 Mile Run, 100 Squats',
  'Bodyweight',
  35,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  663,
  'AMRAP HC Lunge Jump 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Lunge Jump 12 - AMRAP 12 Min',
  '12 Min AMRAP: 20 HC, 20 Lunges, 20 Jump Squats',
  'Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  664,
  'Death by Burpee',
  'HomeWOD',
  'EMOM',
  'Death by Burpee - EMOM 15 Min',
  'Min 1: 1 Burpee, min 2: 2, continue until failure',
  'Bodyweight',
  15,
  15,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  665,
  'AMRAP Push Pull Squat 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Push Pull Squat 20 - AMRAP 20 Min',
  '20 Min AMRAP: 10 Push-ups, 5 Pull-ups, 20 Squats',
  'Pull-up Bar, Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  666,
  'Bodyweight Pyramid Full',
  'HomeWOD',
  'ForTime',
  'Bodyweight Pyramid Full - For Time',
  'Pyramid 1-10: Burpees / 10-1: Squats',
  'Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  667,
  'AMRAP Sit HC Push 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Sit HC Push 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Sit-ups, 20 HC, 15 Push-ups',
  'Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  668,
  'Run Push Squat 5k',
  'HomeWOD',
  'ForTime',
  'Run Push Squat 5k - For Time',
  '5k Run with 50 Push-ups and 50 Squats at 2.5k mark',
  'Bodyweight',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  669,
  'AMRAP Burpee Lunge V 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Lunge V 10 - AMRAP 10 Min',
  '10 Min AMRAP: 8 Burpees, 16 Lunges, 10 V-ups',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  670,
  '50-40-30-20-10 Bodyweight',
  'HomeWOD',
  'ForTime',
  '50-40-30-20-10 Bodyweight - For Time',
  '50-40-30-20-10 of each: Squats, Push-ups, Sit-ups',
  'Bodyweight',
  25,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  671,
  'AMRAP Pull Push Lunge 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Pull Push Lunge 15 - AMRAP 15 Min',
  '15 Min AMRAP: 5 Pull-ups, 10 Push-ups, 20 Lunges',
  'Pull-up Bar, Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  672,
  'Jump Squat Sit Sprint 6',
  'HomeWOD',
  'ForTime',
  'Jump Squat Sit Sprint 6 - For Time',
  '6 Rounds: 20 Jump Squats, 20 Sit-ups, 200m Sprint',
  'Bodyweight',
  14,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  673,
  'AMRAP HC Climb Squat 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Climb Squat 12 - AMRAP 12 Min',
  '12 Min AMRAP: 20 HC, 20 Mountain Climbers, 15 Squats',
  'Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  674,
  'Bodyweight Gauntlet',
  'HomeWOD',
  'ForTime',
  'Bodyweight Gauntlet - For Time',
  '10 Pull-ups, 20 Push-ups, 30 Sit-ups, 40 Squats — 5 Rounds',
  'Pull-up Bar, Bodyweight',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  675,
  'AMRAP Burpee Sit Pull 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Sit Pull 12 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Burpees, 10 Sit-ups, 5 Pull-ups',
  'Pull-up Bar, Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  676,
  'Push-up Lunge 5 Rounds',
  'HomeWOD',
  'ForTime',
  'Push-up Lunge 5 Rounds - For Time',
  '5 Rounds: 20 Push-ups, 20 Alternating Lunges',
  'Bodyweight',
  12,
  3,
  '21-15-9',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  677,
  'AMRAP V-up Lunge Sprint 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP V-up Lunge Sprint 10 - AMRAP 10 Min',
  '10 Min AMRAP: 10 V-ups, 20 Lunges, 100m Sprint',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  678,
  '400m Run + 50 Each',
  'HomeWOD',
  'ForTime',
  '400m Run + 50 Each - For Time',
  '3 Rounds: 400m Run, 50 Squats, 50 Sit-ups',
  'Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  679,
  'AMRAP Push Jump HC 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Push Jump HC 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Push-ups, 15 Jump Squats, 20 HC',
  'Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  680,
  '5 Rounds Core Power',
  'HomeWOD',
  'ForTime',
  '5 Rounds Core Power - For Time',
  '5 Rounds: 10 Pull-ups, 10 HSPU, 20 Sit-ups, 20 Squats',
  'Pull-up Bar, Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  681,
  'AMRAP Burpee Pull Squat 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee Pull Squat 20 - AMRAP 20 Min',
  '20 Min AMRAP: 10 Burpees, 10 Pull-ups, 20 Squats',
  'Pull-up Bar, Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  682,
  'Bodyweight Fran Alt',
  'HomeWOD',
  'ForTime',
  'Bodyweight Fran Alt - For Time',
  '21-15-9: Jump Squats, Pull-ups',
  'Pull-up Bar, Bodyweight',
  8,
  1,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  683,
  'AMRAP Lunge Push Sit 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Lunge Push Sit 20 - AMRAP 20 Min',
  '20 Min AMRAP: 30 Lunges, 20 Push-ups, 20 Sit-ups',
  'Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  684,
  'Bodyweight 400',
  'HomeWOD',
  'ForTime',
  'Bodyweight 400 - For Time',
  '400 Reps: 100 Push-ups, 100 Sit-ups, 100 Squats, 100 Lunges',
  'Bodyweight',
  25,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  685,
  'AMRAP Jump HC Lunge 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Jump HC Lunge 12 - AMRAP 12 Min',
  '12 Min AMRAP: 20 Jump Squats, 20 HC, 20 Lunges',
  'Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  686,
  '10 Rounds Sit Push Sprint',
  'HomeWOD',
  'ForTime',
  '10 Rounds Sit Push Sprint - For Time',
  '10 Rounds: 15 Sit-ups, 10 Push-ups, 100m Sprint',
  'Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  687,
  'AMRAP Pull Burpee 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Pull Burpee 10 - AMRAP 10 Min',
  '10 Min AMRAP: 10 Pull-ups, 5 Burpees',
  'Pull-up Bar, Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  688,
  'Triple 3',
  'HomeWOD',
  'ForTime',
  'Triple 3 - For Time',
  '3 Mile Run, 300 Push-ups, 300 Squats — partition as needed',
  'Pull-up Bar, Bodyweight',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  689,
  'AMRAP HC Sit Squat Jump 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Sit Squat Jump 15 - AMRAP 15 Min',
  '15 Min AMRAP: 20 HC, 15 Sit-ups, 15 Squats, 10 Jump Squats',
  'Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  690,
  'Push Pull Squat 5x5',
  'HomeWOD',
  'ForTime',
  'Push Pull Squat 5x5 - For Time',
  '5 Rounds: 5 Pull-ups, 10 Push-ups, 20 Squats',
  'Pull-up Bar, Bodyweight',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  691,
  'AMRAP Burpee V Lunge 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee V Lunge 12 - AMRAP 12 Min',
  '12 Min AMRAP: 6 Burpees, 12 V-ups, 18 Lunges',
  'Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  692,
  'Bodyweight Total',
  'HomeWOD',
  'ForTime',
  'Bodyweight Total - For Time',
  '50 Burpees, 100 Push-ups, 150 Squats, 200 Sit-ups',
  'Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  693,
  'AMRAP Squat Push V 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP Squat Push V 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 Squats, 15 Push-ups, 10 V-ups',
  'Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  694,
  'Bodyweight SWOD',
  'HomeWOD',
  'ForTime',
  'Bodyweight SWOD - For Time',
  '21-15-9: Squat Jumps, Push-ups, V-ups',
  'Bodyweight',
  12,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  695,
  'AMRAP HC Squat Sprint 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Squat Sprint 10 - AMRAP 10 Min',
  '10 Min AMRAP: 20 HC, 20 Squats, 100m Sprint',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  696,
  '5 Rounds Bodyweight Classic',
  'HomeWOD',
  'ForTime',
  '5 Rounds Bodyweight Classic - For Time',
  '5 Rounds: 20 Pull-ups, 30 Push-ups, 40 Sit-ups, 50 Squats',
  'Pull-up Bar, Bodyweight',
  18,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  697,
  'Barbell Complex A',
  'Other Benchmark',
  'ForTime',
  'Barbell Complex A - For Time',
  '5 Rounds: 5 Deadlifts, 5 Hang Power Cleans, 5 Front Squats, 5 Push Press',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  698,
  'Strength Chipper',
  'Other Benchmark',
  'ForTime',
  'Strength Chipper - For Time',
  '30 Deadlifts, 20 Power Cleans, 15 Front Squats, 10 Push Jerks, 5 Squat Cleans',
  'Barbell',
  20,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  699,
  'Bear Complex 5x5',
  'Other Benchmark',
  'ForTime',
  'Bear Complex 5x5 - For Time',
  '5 Sets of 7 Bear Complex (PC+FS+PP+BS+PP)',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  700,
  'Deadlift 21-15-9',
  'Other Benchmark',
  'ForTime',
  'Deadlift 21-15-9 - For Time',
  '21-15-9: Deadlifts, Pull-ups',
  'Barbell, Pull-up Bar',
  12,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  701,
  'Push Jerk Complex',
  'Other Benchmark',
  'ForTime',
  'Push Jerk Complex - For Time',
  '5 Rounds: 5 Push Jerks, 5 Split Jerks, 5 Push Press',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  702,
  'Front Squat + T2B',
  'Other Benchmark',
  'ForTime',
  'Front Squat + T2B - For Time',
  '5 Rounds: 5 Front Squats, 10 T2B',
  'Barbell, Pull-up Bar',
  12,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  703,
  'Squat Clean Thruster',
  'Other Benchmark',
  'ForTime',
  'Squat Clean Thruster - For Time',
  '3 Rounds: 10 Squat Cleans, 10 Thrusters',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  704,
  'Power Clean AMRAP 10',
  'Other Benchmark',
  'AMRAP',
  'Power Clean AMRAP 10 - AMRAP 10 Min',
  '10 Min AMRAP: 5 Power Cleans, 10 Burpees',
  'Barbell',
  10,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  705,
  'Snatch Balance 5x3',
  'Other Benchmark',
  'ForTime',
  'Snatch Balance 5x3 - For Time',
  '5 Sets of 3 Snatch Balance',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  706,
  'OHS Complex',
  'Other Benchmark',
  'ForTime',
  'OHS Complex - For Time',
  '5 Sets: 5 OHS + 5 Snatch Balance',
  'Barbell',
  12,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  707,
  '5×3 Back Squat',
  'Other Benchmark',
  'ForTime',
  '5×3 Back Squat - For Time',
  '5 Sets of 3 Back Squats (heavy)',
  'Barbell',
  20,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  708,
  'Barbell Cycling',
  'Other Benchmark',
  'AMRAP',
  'Barbell Cycling - AMRAP 8 Min',
  '8 Min AMRAP: 3 Squat Cleans + 3 Jerks',
  'Barbell',
  8,
  1,
  'Max Reps',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  709,
  'Snatch Ladder',
  'Other Benchmark',
  'ForTime',
  'Snatch Ladder - For Time',
  '10-8-6-4-2: Power Snatches (increasing weight)',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  710,
  'Clean & Jerk AMRAP',
  'Other Benchmark',
  'AMRAP',
  'Clean & Jerk AMRAP - AMRAP 7 Min',
  '7 Min AMRAP: 1 Clean & Jerk (heavy)',
  'Barbell',
  7,
  1,
  'Max Reps',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  711,
  'Deadlift Density',
  'Other Benchmark',
  'ForTime',
  'Deadlift Density - For Time',
  '10 Min: Max Deadlifts at 80% 1RM',
  'Barbell',
  10,
  1,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  712,
  'Push Press + Row',
  'Other Benchmark',
  'ForTime',
  'Push Press + Row - For Time',
  '5 Rounds: 10 Push Press, 250m Row',
  'Barbell, Rowing Machine',
  12,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  713,
  'Overhead Complex',
  'Other Benchmark',
  'ForTime',
  'Overhead Complex - For Time',
  '5 Sets: 3 Push Press + 3 Push Jerk + 3 Split Jerk',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  714,
  'Front Squat AMRAP',
  'Other Benchmark',
  'AMRAP',
  'Front Squat AMRAP - AMRAP 10 Min',
  '10 Min AMRAP: 5 Front Squats, 5 Pull-ups',
  'Barbell',
  10,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  715,
  'Hang Power Snatch Complex',
  'Other Benchmark',
  'ForTime',
  'Hang Power Snatch Complex - For Time',
  '5 Sets: 3 HPS + 3 OHS',
  'Barbell',
  12,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  716,
  'Thrusters 30-20-10',
  'Other Benchmark',
  'ForTime',
  'Thrusters 30-20-10 - For Time',
  '30-20-10: Thrusters, Burpees',
  'Barbell',
  12,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  717,
  'Squat Clean Ladder',
  'Other Benchmark',
  'ForTime',
  'Squat Clean Ladder - For Time',
  '1-2-3-4-5: Squat Cleans (add weight each round)',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  718,
  'Power Snatch Density',
  'Other Benchmark',
  'ForTime',
  'Power Snatch Density - For Time',
  '12 Min: Every 90s — 3 Power Snatches',
  'Barbell',
  12,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  719,
  'AMRAP Clean Pull Squat',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Clean Pull Squat - AMRAP 12 Min',
  '12 Min AMRAP: 3 Squat Cleans, 6 Pull-ups, 9 Squats',
  'Barbell',
  12,
  1,
  'Max Reps',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  720,
  'Barbell Fran',
  'Other Benchmark',
  'ForTime',
  'Barbell Fran - For Time',
  '21-15-9: Thrusters, Chest-to-Bar',
  'Barbell, Pull-up Bar',
  10,
  1,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  721,
  'Triple Clean',
  'Other Benchmark',
  'ForTime',
  'Triple Clean - For Time',
  '3 Rounds: 10 HPC, 10 Power Clean, 10 Squat Clean',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  722,
  'Jerk & Squat',
  'Other Benchmark',
  'ForTime',
  'Jerk & Squat - For Time',
  '5 Rounds: 3 Jerks, 5 Front Squats, 3 OHS',
  'Barbell',
  12,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  723,
  'Barbell Conditioning 1',
  'Other Benchmark',
  'AMRAP',
  'Barbell Conditioning 1 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Deadlifts, 5 Hang Power Cleans, 5 Box Jumps',
  'Barbell, Box',
  12,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  724,
  'Power Clean Ladder 10-1',
  'Other Benchmark',
  'ForTime',
  'Power Clean Ladder 10-1 - For Time',
  '10-9-8-7-6-5-4-3-2-1: Power Cleans',
  'Barbell',
  12,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  725,
  'Back Squat 10x3',
  'Other Benchmark',
  'ForTime',
  'Back Squat 10x3 - For Time',
  '10 Sets of 3 Back Squats at 75%',
  'Barbell',
  20,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  726,
  'Barbell Conditioning 2',
  'Other Benchmark',
  'AMRAP',
  'Barbell Conditioning 2 - AMRAP 10 Min',
  '10 Min AMRAP: 3 DL, 3 HPC, 3 FS, 3 PP, 5 Pull-ups',
  'Barbell, Pull-up Bar',
  10,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  727,
  'Snatch Complex',
  'Other Benchmark',
  'ForTime',
  'Snatch Complex - For Time',
  '5 Sets: Snatch + Hang Snatch + OHS',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  728,
  'DL Row Complex',
  'Other Benchmark',
  'ForTime',
  'DL Row Complex - For Time',
  '5 Rounds: 5 Deadlifts, 5 Pendlay Rows, 5 Power Cleans',
  'Barbell',
  12,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  729,
  'Overhead Squat 5x5',
  'Other Benchmark',
  'ForTime',
  'Overhead Squat 5x5 - For Time',
  '5 Sets of 5 OHS',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  730,
  'KB Barbell Chipper',
  'Other Benchmark',
  'ForTime',
  'KB Barbell Chipper - For Time',
  '21 KB Swings, 21 DL, 15 KB Swings, 15 Power Cleans, 9 KB Swings, 9 Thrusters',
  'Barbell, Kettlebell',
  20,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  731,
  'Barbell Cycling 2',
  'Other Benchmark',
  'AMRAP',
  'Barbell Cycling 2 - AMRAP 10 Min',
  '10 Min AMRAP: 2 Squat Cleans + 2 Jerks (heavy)',
  'Barbell',
  10,
  1,
  'Max Reps',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  732,
  'Clean & Press Ladder',
  'Other Benchmark',
  'ForTime',
  'Clean & Press Ladder - For Time',
  '5-5-5-5-5: Clean & Press (increasing weight)',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  733,
  'RDL + Row',
  'Other Benchmark',
  'ForTime',
  'RDL + Row - For Time',
  '4 Rounds: 10 RDL, 10 Bent-over Row, 10 Upright Row',
  'Barbell',
  12,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  734,
  'Barbell Conditioning 3',
  'Other Benchmark',
  'AMRAP',
  'Barbell Conditioning 3 - AMRAP 15 Min',
  '15 Min AMRAP: 5 Hang Power Cleans, 250m Row',
  'Barbell, Rowing Machine',
  15,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  735,
  'Strict Press 5x5',
  'Other Benchmark',
  'ForTime',
  'Strict Press 5x5 - For Time',
  '5 Sets of 5 Strict Press (increasing weight)',
  'Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  736,
  'Front Squat 8x3',
  'Other Benchmark',
  'ForTime',
  'Front Squat 8x3 - For Time',
  '8 Sets of 3 Front Squats at 80%',
  'Barbell',
  20,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  737,
  'Row & Run 5K',
  'Other Benchmark',
  'ForTime',
  'Row & Run 5K - For Time',
  '2500m Row + 2500m Run',
  'Rowing Machine, Bodyweight',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  738,
  'Chipper 10 Rounds',
  'Other Benchmark',
  'ForTime',
  'Chipper 10 Rounds - For Time',
  '10 Rounds: 10 DL, 10 HPC, 10 FS, 10 PP, 10 Squats',
  'Barbell, Pull-up Bar',
  25,
  5,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  739,
  'AMRAP 3-6-9 KB',
  'Other Benchmark',
  'AMRAP',
  'AMRAP 3-6-9 KB - AMRAP 15 Min',
  '15 Min AMRAP: 3-6-9 KB Swing, Burpee, Sit-up (add 3 each round)',
  'Kettlebell, Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  740,
  'Ladder 1-2-3-4-5',
  'Other Benchmark',
  'ForTime',
  'Ladder 1-2-3-4-5 - For Time',
  'Ladder 1-5: Squat Cleans + Pull-ups',
  'Barbell, Pull-up Bar',
  12,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  741,
  '5 Rounds Row Push',
  'Other Benchmark',
  'ForTime',
  '5 Rounds Row Push - For Time',
  '5 Rounds: 500m Row, 20 Push-ups',
  'Rowing Machine, Bodyweight',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  742,
  'AMRAP Wall Ball Pull-up 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Wall Ball Pull-up 12 - AMRAP 12 Min',
  '12 Min AMRAP: 12 Wall Balls, 12 Pull-ups',
  'Wall Ball, Pull-up Bar',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  743,
  'Ski Erg Chipper',
  'Other Benchmark',
  'ForTime',
  'Ski Erg Chipper - For Time',
  '2000m Ski, 30 Power Cleans, 2000m Ski',
  'Ski Erg, Barbell',
  20,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  744,
  'Rowing Intervals 10x250',
  'Other Benchmark',
  'ForTime',
  'Rowing Intervals 10x250 - For Time',
  '10x250m Row — 1min rest between',
  'Rowing Machine',
  25,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  745,
  'AMRAP Row KB DL 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Row KB DL 15 - AMRAP 15 Min',
  '15 Min AMRAP: 500m Row, 15 KB Swings, 10 Deadlifts',
  'Rowing Machine, Kettlebell, Barbell',
  15,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  746,
  'Assault Bike 30 Min',
  'Other Benchmark',
  'ForTime',
  'Assault Bike 30 Min - For Time',
  '30 Min Assault Bike for max cals',
  'Assault Bike',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  747,
  'Death by Box Jump',
  'HomeWOD',
  'EMOM',
  'Death by Box Jump - EMOM 15 Min',
  'Min 1: 1 Box Jump, min 2: 2, continue until failure',
  'Box',
  15,
  15,
  '10-15 Reps/Min',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  748,
  'Death by Squat',
  'HomeWOD',
  'EMOM',
  'Death by Squat - EMOM 15 Min',
  'Min 1: 1 Squat, min 2: 2, continue until failure',
  'Bodyweight',
  15,
  15,
  '10-15 Reps/Min',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  749,
  'Death by Thruster',
  'HomeWOD',
  'EMOM',
  'Death by Thruster - EMOM 15 Min',
  'Min 1: 1 Thruster, min 2: 2, continue until failure',
  'Barbell',
  15,
  15,
  '10-15 Reps/Min',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  750,
  'AMRAP HC Push Lunge 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Push Lunge 15 - AMRAP 15 Min',
  '15 Min AMRAP: 20 HC, 15 Push-ups, 20 Lunges',
  'Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  751,
  'Bodyweight Century',
  'HomeWOD',
  'ForTime',
  'Bodyweight Century - For Time',
  '100 Reps in as few sets as possible: Push-ups or Squats',
  'Bodyweight',
  10,
  1,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  752,
  'AMRAP Burpee V Sprint 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Burpee V Sprint 12 - AMRAP 12 Min',
  '12 Min AMRAP: 6 Burpees, 12 V-ups, 100m Sprint',
  'Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  753,
  'Sit-up Squat 200 Reps',
  'HomeWOD',
  'ForTime',
  'Sit-up Squat 200 Reps - For Time',
  '100 Sit-ups + 100 Air Squats — for time',
  'Bodyweight',
  10,
  1,
  '21-15-9',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  754,
  'AMRAP Push HC Box 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Push HC Box 10 - AMRAP 10 Min',
  '10 Min AMRAP: 10 Push-ups, 20 HC, 10 Box Step-ups',
  'Box, Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  755,
  'Bodyweight Hurricane 2',
  'HomeWOD',
  'ForTime',
  'Bodyweight Hurricane 2 - For Time',
  '5 Rounds: 200m Run, 10 Burpees, 20 Squats, 20 Sit-ups',
  'Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  756,
  'AMRAP Jump Sit Lunge 10',
  'HomeWOD',
  'AMRAP',
  'AMRAP Jump Sit Lunge 10 - AMRAP 10 Min',
  '10 Min AMRAP: 15 Jump Squats, 15 Sit-ups, 15 Lunges',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  757,
  'Bodyweight Blaster',
  'HomeWOD',
  'ForTime',
  'Bodyweight Blaster - For Time',
  '50 Burpees, 50 Squats, 50 Push-ups, 50 Sit-ups — for time',
  'Bodyweight',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  758,
  'AMRAP HC Pull Push 20',
  'HomeWOD',
  'AMRAP',
  'AMRAP HC Pull Push 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 HC, 10 Pull-ups, 20 Push-ups',
  'Pull-up Bar, Bodyweight',
  20,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  759,
  'Lunge Sprint 400',
  'HomeWOD',
  'ForTime',
  'Lunge Sprint 400 - For Time',
  '400m Walking Lunge + 400m Sprint',
  'Bodyweight',
  12,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  760,
  'AMRAP V Push Squat 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP V Push Squat 15 - AMRAP 15 Min',
  '15 Min AMRAP: 10 V-ups, 15 Push-ups, 20 Squats',
  'Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  761,
  'Push-up Test Max',
  'HomeWOD',
  'ForTime',
  'Push-up Test Max - For Time',
  'Max unbroken Push-ups',
  'Bodyweight',
  5,
  1,
  '21-15-9',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  762,
  'AMRAP Mountain HC Jump 12',
  'HomeWOD',
  'AMRAP',
  'AMRAP Mountain HC Jump 12 - AMRAP 12 Min',
  '12 Min AMRAP: 20 Mountain Climbers, 20 HC, 15 Jump Squats',
  'Bodyweight',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  763,
  'AMRAP Pull Dip Squat 15',
  'HomeWOD',
  'AMRAP',
  'AMRAP Pull Dip Squat 15 - AMRAP 15 Min',
  '15 Min AMRAP: 8 Pull-ups, 8 Dips, 20 Squats',
  'Pull-up Bar, Bodyweight',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  764,
  'Bodyweight Open 1',
  'HomeWOD',
  'AMRAP',
  'Bodyweight Open 1 - AMRAP 10 Min',
  '10 Min AMRAP: 10 Burpees, 15 Squats, 20 Sit-ups',
  'Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  765,
  'AMRAP Push Jump Sit 8',
  'HomeWOD',
  'AMRAP',
  'AMRAP Push Jump Sit 8 - AMRAP 8 Min',
  '8 Min AMRAP: 10 Push-ups, 10 Jump Squats, 10 Sit-ups',
  'Bodyweight',
  8,
  1,
  'Max Reps',
  'Bodyweight',
  'Beginner',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  766,
  'KB Barbell Blend A',
  'Other Benchmark',
  'ForTime',
  'KB Barbell Blend A - For Time',
  '3 Rounds: 15 KB Swings, 12 Hang Power Cleans, 9 Push Jerks',
  'Kettlebell, Barbell',
  18,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  767,
  'KB Barbell Blend B',
  'Other Benchmark',
  'ForTime',
  'KB Barbell Blend B - For Time',
  '5 Rounds: 20 KB Swings, 15 Pull-ups, 10 Thrusters',
  'Kettlebell, Barbell, Pull-up Bar',
  20,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  768,
  'Row Wall Ball Chipper',
  'Other Benchmark',
  'ForTime',
  'Row Wall Ball Chipper - For Time',
  '1000m Row, 50 Wall Balls, 1000m Row, 50 Wall Balls',
  'Rowing Machine, Wall Ball',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  769,
  'AMRAP Burpee Box Pull 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Burpee Box Pull 12 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Burpee Box Jumps, 5 Pull-ups',
  'Box, Pull-up Bar',
  12,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  770,
  'Bike Barbell Combo',
  'Other Benchmark',
  'ForTime',
  'Bike Barbell Combo - For Time',
  '5 Rounds: 15 Cal Bike, 10 Power Cleans, 10 Front Squats',
  'Assault Bike, Barbell',
  15,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  771,
  'Ski KB Row Mix',
  'Other Benchmark',
  'AMRAP',
  'Ski KB Row Mix - AMRAP 15 Min',
  '15 Min AMRAP: 500m Ski, 20 KB Swings, 250m Row',
  'Ski Erg, Kettlebell, Rowing Machine',
  15,
  1,
  'Max Reps',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  772,
  'AMRAP Wall Ball T2B Box 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Wall Ball T2B Box 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Wall Balls, 10 T2B, 10 Box Jumps',
  'Wall Ball, Pull-up Bar, Box',
  15,
  1,
  'Max Reps',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  773,
  'Row Thruster Chipper',
  'Other Benchmark',
  'ForTime',
  'Row Thruster Chipper - For Time',
  '2000m Row, 50 Thrusters, 2000m Row',
  'Rowing Machine, Barbell',
  20,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  774,
  'AMRAP DL Box KB 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP DL Box KB 12 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Deadlifts, 10 Box Jumps, 15 KB Swings',
  'Barbell, Box, Kettlebell',
  12,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  775,
  'Triple Modal 3 Rounds',
  'Other Benchmark',
  'ForTime',
  'Triple Modal 3 Rounds - For Time',
  '3 Rounds: 500m Row, 15 Power Cleans, 20 Burpees',
  'Rowing Machine, Barbell, Bodyweight',
  20,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  776,
  'Assault Intervals 5x',
  'Other Benchmark',
  'ForTime',
  'Assault Intervals 5x - For Time',
  '5x: 1 Min Max Effort / 1 Min Rest on Assault Bike',
  'Assault Bike',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  777,
  'AMRAP PC Box T2B 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP PC Box T2B 12 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Power Cleans, 10 Box Jumps, 10 T2B',
  'Barbell, Box, Pull-up Bar',
  12,
  1,
  'Max Reps',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  778,
  'Row KB AMRAP 20',
  'Other Benchmark',
  'AMRAP',
  'Row KB AMRAP 20 - AMRAP 20 Min',
  '20 Min AMRAP: 300m Row, 20 KB Swings, 10 Burpees',
  'Rowing Machine, Kettlebell',
  20,
  1,
  'Max Reps',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  779,
  'Bike Run KB',
  'Other Benchmark',
  'ForTime',
  'Bike Run KB - For Time',
  '4 Rounds: 10 Cal Bike, 400m Run, 20 KB Swings',
  'Assault Bike, Kettlebell',
  20,
  3,
  '21-15-9',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  780,
  'AMRAP WB DL Box 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP WB DL Box 15 - AMRAP 15 Min',
  '15 Min AMRAP: 15 Wall Balls, 10 Deadlifts, 10 Box Jumps',
  'Wall Ball, Barbell, Box',
  15,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  781,
  'Snatch + Row',
  'Other Benchmark',
  'ForTime',
  'Snatch + Row - For Time',
  '5 Rounds: 5 Squat Snatches, 250m Row',
  'Barbell, Rowing Machine',
  15,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  782,
  'KB Swing 10x10',
  'Other Benchmark',
  'ForTime',
  'KB Swing 10x10 - For Time',
  '10 Sets of 10 KB Swings (EMOM style)',
  'Kettlebell',
  10,
  1,
  '21-15-9',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  783,
  'Pull-up 10x10',
  'Other Benchmark',
  'ForTime',
  'Pull-up 10x10 - For Time',
  '10 Sets of 10 Pull-ups (every 90s)',
  'Pull-up Bar',
  12,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  784,
  'AMRAP Burpee Thruster 10',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Burpee Thruster 10 - AMRAP 10 Min',
  '10 Min AMRAP: 5 Thrusters, 10 Burpees',
  'Barbell',
  10,
  1,
  'Max Reps',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  785,
  'Row Deadlift 5 Rounds',
  'Other Benchmark',
  'ForTime',
  'Row Deadlift 5 Rounds - For Time',
  '5 Rounds: 500m Row, 10 Deadlifts',
  'Rowing Machine, Barbell',
  18,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  786,
  'AMRAP C2B KB Box 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP C2B KB Box 15 - AMRAP 15 Min',
  '15 Min AMRAP: 5 C2B, 10 KB Swings, 10 Box Jumps',
  'Pull-up Bar, Kettlebell, Box',
  15,
  1,
  'Max Reps',
  '24/16',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  787,
  'Ski Pull-up Chipper',
  'Other Benchmark',
  'ForTime',
  'Ski Pull-up Chipper - For Time',
  '100 Cal Ski, 50 Pull-ups, 50 Cal Ski, 25 Pull-ups',
  'Ski Erg, Pull-up Bar',
  15,
  3,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  788,
  'AMRAP WB PC DU 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP WB PC DU 12 - AMRAP 12 Min',
  '12 Min AMRAP: 15 WB, 10 PC, 30 DU',
  'Wall Ball, Barbell, Jump Rope',
  12,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  789,
  'Barbell Bias WOD 1',
  'Other Benchmark',
  'ForTime',
  'Barbell Bias WOD 1 - For Time',
  '10 Rounds: 3 Squat Cleans, 3 Jerks, 5 Bar Muscle-ups',
  'Barbell, Pull-up Bar',
  20,
  3,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  790,
  'Barbell Bias WOD 2',
  'Other Benchmark',
  'ForTime',
  'Barbell Bias WOD 2 - For Time',
  '5 Rounds: 10 Deadlifts, 10 HPC, 10 FS, 10 PP, 10 Burpees',
  'Barbell, Bodyweight',
  18,
  3,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  791,
  'AMRAP DL T2B Burpee 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP DL T2B Burpee 15 - AMRAP 15 Min',
  '15 Min AMRAP: 5 Deadlifts, 10 T2B, 5 Burpees',
  'Barbell, Pull-up Bar',
  15,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  792,
  'Row Bike Run Tri',
  'Other Benchmark',
  'ForTime',
  'Row Bike Run Tri - For Time',
  '1000m Row, 20 Cal Bike, 800m Run — 3 Rounds',
  'Rowing Machine, Assault Bike',
  30,
  5,
  '21-15-9',
  'Bodyweight',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  793,
  'KB Swing 500',
  'Other Benchmark',
  'ForTime',
  'KB Swing 500 - For Time',
  '500 KB Swings for time — partition as needed',
  'Kettlebell',
  25,
  5,
  '21-15-9',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  794,
  'AMRAP HSPU PC Box 10',
  'Other Benchmark',
  'AMRAP',
  'AMRAP HSPU PC Box 10 - AMRAP 10 Min',
  '10 Min AMRAP: 5 HSPU, 5 Power Cleans, 10 Box Jumps',
  'Barbell, Box, Bodyweight',
  10,
  1,
  'Max Reps',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  795,
  'Run KB Barbell 3x',
  'Other Benchmark',
  'ForTime',
  'Run KB Barbell 3x - For Time',
  '3 Rounds: 800m Run, 20 KB Swings, 10 Hang Power Cleans',
  'Kettlebell, Barbell',
  20,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  796,
  'AMRAP C2B WB DL 15',
  'Other Benchmark',
  'AMRAP',
  'AMRAP C2B WB DL 15 - AMRAP 15 Min',
  '15 Min AMRAP: 5 C2B Pull-ups, 15 Wall Balls, 5 Deadlifts',
  'Pull-up Bar, Wall Ball, Barbell',
  15,
  1,
  'Max Reps',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  797,
  'Box Jump Barbell 5 Rounds',
  'Other Benchmark',
  'ForTime',
  'Box Jump Barbell 5 Rounds - For Time',
  '5 Rounds: 15 Box Jumps, 10 Power Cleans, 5 Push Jerks',
  'Box, Barbell',
  18,
  3,
  '21-15-9',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  798,
  'Bike KB Pull Chipper',
  'Other Benchmark',
  'ForTime',
  'Bike KB Pull Chipper - For Time',
  '50 Cal Bike, 50 KB Swings, 50 Pull-ups, 50 Cal Bike',
  'Assault Bike, Kettlebell, Pull-up Bar',
  20,
  3,
  '21-15-9',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  799,
  'AMRAP Row PC Burpee 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP Row PC Burpee 12 - AMRAP 12 Min',
  '12 Min AMRAP: 250m Row, 5 Power Cleans, 5 Burpees',
  'Rowing Machine, Barbell',
  12,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  800,
  'KB Barbell Full Chipper',
  'Other Benchmark',
  'ForTime',
  'KB Barbell Full Chipper - For Time',
  '30 KB Swings, 20 Pull-ups, 30 Thrusters, 20 Pull-ups, 30 KB Swings',
  'Kettlebell, Barbell, Pull-up Bar',
  25,
  5,
  '21-15-9',
  '60/40',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  801,
  'AMRAP WB Box KB 20',
  'Other Benchmark',
  'AMRAP',
  'AMRAP WB Box KB 20 - AMRAP 20 Min',
  '20 Min AMRAP: 20 Wall Balls, 15 Box Jumps, 15 KB Swings',
  'Wall Ball, Box, Kettlebell',
  20,
  1,
  'Max Reps',
  '24/16',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  802,
  'Endurance Chipper',
  'Other Benchmark',
  'ForTime',
  'Endurance Chipper - For Time',
  '2000m Row, 50 Thrusters, 30 Pull-ups, 30 Burpees, 2000m Row',
  'Rowing Machine, Barbell, Bodyweight',
  40,
  5,
  '21-15-9',
  'Bodyweight',
  'Advanced',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

INSERT INTO wods (id, name, kategorie, typ, beschreibung, uebungen, equipment, dauer, runden, reps, gewicht, schwierigkeit, skal_leicht, skal_schwer, quelle) VALUES (
  803,
  'AMRAP DL Pull Box 12',
  'Other Benchmark',
  'AMRAP',
  'AMRAP DL Pull Box 12 - AMRAP 12 Min',
  '12 Min AMRAP: 5 Deadlifts, 10 Pull-ups, 15 Box Jumps',
  'Barbell, Pull-up Bar, Box',
  12,
  1,
  'Max Reps',
  '60/40',
  'Intermediate',
  'Gewicht reduzieren / Ring Rows / weniger Reps',
  'Gewicht erhöhen / Chest-to-Bar / mehr Reps',
  'CrossFit Community'
);

COMMIT;
