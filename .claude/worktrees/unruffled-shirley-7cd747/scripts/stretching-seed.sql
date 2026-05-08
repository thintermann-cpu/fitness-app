-- Stretching seed: 65 exercises + 18 routines (idempotent)
DO $$
DECLARE
  -- HIPS (8)
  ex01 UUID; ex02 UUID; ex03 UUID; ex04 UUID;
  ex05 UUID; ex06 UUID; ex07 UUID; ex08 UUID;
  -- BACK (10)
  ex09 UUID; ex10 UUID; ex11 UUID; ex12 UUID; ex13 UUID;
  ex14 UUID; ex15 UUID; ex16 UUID; ex17 UUID; ex18 UUID;
  -- SHOULDERS (8)
  ex19 UUID; ex20 UUID; ex21 UUID; ex22 UUID;
  ex23 UUID; ex24 UUID; ex25 UUID; ex26 UUID;
  -- HAMSTRINGS (8)
  ex27 UUID; ex28 UUID; ex29 UUID; ex30 UUID;
  ex31 UUID; ex32 UUID; ex33 UUID; ex34 UUID;
  -- CHEST (5)
  ex35 UUID; ex36 UUID; ex37 UUID; ex38 UUID; ex39 UUID;
  -- CALVES (5)
  ex40 UUID; ex41 UUID; ex42 UUID; ex43 UUID; ex44 UUID;
  -- NECK (5)
  ex45 UUID; ex46 UUID; ex47 UUID; ex48 UUID; ex49 UUID;
  -- FULL BODY (16)
  ex50 UUID; ex51 UUID; ex52 UUID; ex53 UUID;
  ex54 UUID; ex55 UUID; ex56 UUID; ex57 UUID;
  ex58 UUID; ex59 UUID; ex60 UUID; ex61 UUID;
  ex62 UUID; ex63 UUID; ex64 UUID; ex65 UUID;
BEGIN
  -- Skip if already seeded
  IF EXISTS (SELECT 1 FROM public.stretching_exercises LIMIT 1) THEN
    RAISE NOTICE 'Stretching data already seeded, skipping.';
    RETURN;
  END IF;

  -- ── HIPS ─────────────────────────────────────────────────────────────
  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Hüftbeuger-Ausfallschritt","en":"Hip Flexor Lunge","es":"Estocada para flexores de cadera"}',
    '{"de":"Öffnet die Hüftbeuger und streckt den vorderen Oberschenkel.","en":"Opens the hip flexors and stretches the front thigh.","es":"Abre los flexores de cadera y estira el muslo delantero."}',
    '{"de":"Mache einen großen Schritt nach vorne\nSenke die hintere Knie Richtung Boden\nSchiebe die Hüfte sanft nach vorne\nHalte den Oberkörper aufrecht\nWechsle die Seite","en":"Step one foot far forward\nLower the back knee toward the floor\nGently push hips forward\nKeep torso upright\nSwitch sides","es":"Da un gran paso hacia adelante\nBaja la rodilla trasera hacia el suelo\nEmpuja las caderas suavemente hacia adelante\nMantén el torso erguido\nCambia de lado"}',
    'hips', 'beginner', 30
  ) RETURNING id INTO ex01;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Taubenhaltung","en":"Pigeon Pose","es":"Postura del palomo"}',
    '{"de":"Intensive Hüftöffnung, die tiefe Außenrotatoren der Hüfte dehnt.","en":"Intensive hip opener targeting deep external hip rotators.","es":"Apertura intensa de cadera que trabaja los rotadores externos profundos."}',
    '{"de":"Beginne im Vierfüßlerstand\nBringe das rechte Knie hinter das rechte Handgelenk\nStrecke das linke Bein nach hinten\nSenke die Hüfte ab\nBeuge den Oberkörper nach vorne\nWechsle die Seite","en":"Start in tabletop position\nBring right knee behind right wrist\nExtend left leg straight back\nLower hips toward floor\nFold torso forward\nSwitch sides","es":"Comienza en posición de cuatro apoyos\nLleva la rodilla derecha detrás de la muñeca derecha\nExtiende la pierna izquierda hacia atrás\nBaja las caderas\nDobla el torso hacia adelante\nCambia de lado"}',
    'hips', 'intermediate', 45
  ) RETURNING id INTO ex02;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Vier-Figur-Dehnung","en":"Figure Four Stretch","es":"Estiramiento figura cuatro"}',
    '{"de":"Dehnt die Außenseite der Hüfte und den Gesäßmuskel liegend.","en":"Stretches the outer hip and glute while lying down.","es":"Estira la parte externa de la cadera y el glúteo en posición supina."}',
    '{"de":"Lege dich auf den Rücken\nWinkle beide Knie an\nLege den rechten Knöchel auf das linke Knie\nZiehe das linke Knie zur Brust\nHalte die Dehnung\nWechsle die Seite","en":"Lie on your back\nBend both knees\nPlace right ankle on left knee\nPull left knee toward chest\nHold the stretch\nSwitch sides","es":"Acuéstate boca arriba\nDobla ambas rodillas\nColoca el tobillo derecho sobre la rodilla izquierda\nJala la rodilla izquierda hacia el pecho\nMantén el estiramiento\nCambia de lado"}',
    'hips', 'beginner', 30
  ) RETURNING id INTO ex03;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Schmetterlingsdehnung","en":"Butterfly Stretch","es":"Estiramiento mariposa"}',
    '{"de":"Dehnt die Adduktoren und öffnet die Hüfte im Sitzen.","en":"Stretches the adductors and opens the hips while seated.","es":"Estira los aductores y abre las caderas en posición sentada."}',
    '{"de":"Setze dich aufrecht hin\nFühre die Fußsohlen zusammen\nLasse die Knie seitlich sinken\nHalte die Füße mit beiden Händen\nBeuge den Oberkörper sanft nach vorne\nAtme tief ein und aus","en":"Sit upright\nBring soles of feet together\nAllow knees to fall outward\nHold feet with both hands\nGently fold torso forward\nBreathe deeply","es":"Siéntate erguido\nJunta las plantas de los pies\nDeja caer las rodillas hacia los lados\nSujeta los pies con ambas manos\nDobla suavemente el torso hacia adelante\nRespira profundo"}',
    'hips', 'beginner', 30
  ) RETURNING id INTO ex04;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Tiefer Ausfallschritt Hüftöffner","en":"Low Lunge Hip Opener","es":"Apertura de cadera en estocada baja"}',
    '{"de":"Kombiniert einen tiefen Ausfallschritt mit seitlicher Rotation für maximale Hüftöffnung.","en":"Combines a deep lunge with lateral rotation for maximum hip opening.","es":"Combina una estocada profunda con rotación lateral para máxima apertura de cadera."}',
    '{"de":"Gehe in einen tiefen Ausfallschritt\nStütze die Hände auf den Boden\nDrehe den Oberkörper zur vorderen Seite\nHebe den Arm nach oben\nHalte 3 Atemzüge\nWechsle die Seite","en":"Step into a deep lunge\nPlace hands on floor\nRotate torso toward front leg\nRaise the arm upward\nHold for 3 breaths\nSwitch sides","es":"Da una estocada profunda\nApoya las manos en el suelo\nGira el torso hacia la pierna delantera\nLevanta el brazo hacia arriba\nMantén 3 respiraciones\nCambia de lado"}',
    'hips', 'intermediate', 45
  ) RETURNING id INTO ex05;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Sitzende Hüftrotation","en":"Seated Hip Rotation","es":"Rotación de cadera sentada"}',
    '{"de":"Mobilisiert das Hüftgelenk durch kontrollierte Kreisbewegungen.","en":"Mobilizes the hip joint through controlled circular movements.","es":"Moviliza la articulación de la cadera con movimientos circulares controlados."}',
    '{"de":"Setze dich auf einen Stuhl oder den Boden\nHebe ein Knie\nRotiere das Bein nach außen und innen\nMache langsame, kontrollierte Kreise\nWiederhole auf beiden Seiten","en":"Sit on a chair or floor\nLift one knee\nRotate the leg outward then inward\nMake slow controlled circles\nRepeat on both sides","es":"Siéntate en una silla o el suelo\nLevanta una rodilla\nRota la pierna hacia afuera y adentro\nHaz círculos lentos y controlados\nRepite en ambos lados"}',
    'hips', 'beginner', 20
  ) RETURNING id INTO ex06;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"90/90-Hüftdehnung","en":"90/90 Hip Stretch","es":"Estiramiento 90/90 de cadera"}',
    '{"de":"Dehnt beide Hüften gleichzeitig in der 90/90-Position – außen und innen.","en":"Stretches both hips simultaneously in the 90/90 position – external and internal.","es":"Estira ambas caderas simultáneamente en posición 90/90 – externa e interna."}',
    '{"de":"Setze dich auf den Boden\nWinkle das vordere Bein im 90° rechten Winkel an\nWinkle das hintere Bein ebenfalls im 90° Winkel an\nSitze aufrecht mit geradem Rücken\nBeuge dich über das vordere Bein\nWechsle nach 45 Sekunden die Seiten","en":"Sit on the floor\nAngle front leg at 90 degrees\nAngle back leg also at 90 degrees\nSit tall with straight back\nFold over front leg\nSwitch sides after 45 seconds","es":"Siéntate en el suelo\nAngula la pierna delantera a 90 grados\nAngula la pierna trasera también a 90 grados\nSiéntate erguido con la espalda recta\nDóblate sobre la pierna delantera\nCambia de lado después de 45 segundos"}',
    'hips', 'intermediate', 45
  ) RETURNING id INTO ex07;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Stehende Hüftkreise","en":"Standing Hip Circle","es":"Círculos de cadera de pie"}',
    '{"de":"Dynamische Hüftmobilisation im Stand – ideal als Aufwärmbewegung.","en":"Dynamic hip mobilization standing – ideal as a warm-up movement.","es":"Movilización dinámica de cadera de pie – ideal como movimiento de calentamiento."}',
    '{"de":"Stehe aufrecht mit schulterbreitem Stand\nLege die Hände auf die Hüften\nMache langsame, große Kreise mit der Hüfte\n5 Kreise nach links, dann 5 nach rechts\nHalte den Oberkörper stabil","en":"Stand upright with feet shoulder-width apart\nPlace hands on hips\nMake slow large circles with hips\n5 circles left then 5 right\nKeep upper body stable","es":"Párate erguido con pies separados al ancho de hombros\nPon las manos en las caderas\nHaz círculos lentos y grandes con las caderas\n5 círculos a la izquierda luego 5 a la derecha\nMantén el torso estable"}',
    'hips', 'beginner', 20
  ) RETURNING id INTO ex08;

  -- ── BACK ──────────────────────────────────────────────────────────────
  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Katze-Kuh-Dehnung","en":"Cat-Cow Stretch","es":"Estiramiento gato-vaca"}',
    '{"de":"Mobilisiert die gesamte Wirbelsäule durch abwechselnde Beuge- und Streckbewegungen.","en":"Mobilizes the entire spine through alternating flexion and extension movements.","es":"Moviliza toda la columna vertebral alternando flexión y extensión."}',
    '{"de":"Beginne im Vierfüßlerstand\nRunde den Rücken nach oben (Katze)\nHalte 2 Sekunden\nSenke den Bauch und hebe den Kopf (Kuh)\nHalte 2 Sekunden\nWiederhole 5-8 Mal","en":"Start on hands and knees\nRound back upward (cat)\nHold 2 seconds\nDrop belly and lift head (cow)\nHold 2 seconds\nRepeat 5-8 times","es":"Comienza en cuatro apoyos\nRedondea la espalda hacia arriba (gato)\nMantén 2 segundos\nBaja el abdomen y levanta la cabeza (vaca)\nMantén 2 segundos\nRepite 5-8 veces"}',
    'back', 'beginner', 30
  ) RETURNING id INTO ex09;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Kindeshaltung","en":"Child''s Pose","es":"Postura del niño"}',
    '{"de":"Sanfte Rückenentspannung, die die Lendenwirbelsäule und Hüften öffnet.","en":"Gentle back release that opens the lumbar spine and hips.","es":"Relajación suave de espalda que abre la columna lumbar y las caderas."}',
    '{"de":"Knie auf den Boden\nSetze dich auf die Fersen\nStrecke die Arme weit nach vorne\nLasse die Stirn zum Boden sinken\nAtme tief in den Rücken\nHalte die Position","en":"Kneel on the floor\nSit back onto heels\nExtend arms far forward\nAllow forehead to lower to floor\nBreathe deeply into the back\nHold position","es":"Arrodíllate en el suelo\nSiéntate sobre los talones\nExtiende los brazos hacia adelante\nDeja caer la frente al suelo\nRespira profundo hacia la espalda\nMantén la posición"}',
    'back', 'beginner', 45
  ) RETURNING id INTO ex10;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Sitzende Wirbelsäulendrehung","en":"Seated Spinal Twist","es":"Torsión espinal sentada"}',
    '{"de":"Mobilisiert die Brustwirbelsäule und dehnt die tiefen Rückenmuskeln.","en":"Mobilizes the thoracic spine and stretches deep back muscles.","es":"Moviliza la columna torácica y estira los músculos profundos de la espalda."}',
    '{"de":"Sitze aufrecht mit gestreckten Beinen\nWinkle das rechte Knie an\nDrehe den Oberkörper nach rechts\nLege den linken Ellbogen außen ans Knie\nSchaue über die rechte Schulter\nWechsle die Seite","en":"Sit upright with legs extended\nBend right knee\nRotate torso to the right\nPlace left elbow outside knee\nLook over right shoulder\nSwitch sides","es":"Siéntate erguido con piernas extendidas\nDobla la rodilla derecha\nGira el torso hacia la derecha\nColoca el codo izquierdo fuera de la rodilla\nMira sobre el hombro derecho\nCambia de lado"}',
    'back', 'beginner', 30
  ) RETURNING id INTO ex11;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Kobra-Dehnung","en":"Cobra Stretch","es":"Estiramiento cobra"}',
    '{"de":"Streckt die Lendenwirbelsäule und stärkt die Rückenmuskeln in der Verlängerung.","en":"Extends the lumbar spine and engages back muscles in elongation.","es":"Extiende la columna lumbar y activa los músculos de la espalda."}',
    '{"de":"Lege dich auf den Bauch\nPlatziere die Hände unter den Schultern\nDrücke dich sanft nach oben\nHalte die Hüften am Boden\nStrecke den Nacken lang\nHalte die Position","en":"Lie on your stomach\nPlace hands under shoulders\nGently press upward\nKeep hips on floor\nLengthen the neck\nHold position","es":"Acuéstate boca abajo\nColoca las manos bajo los hombros\nEmpuja suavemente hacia arriba\nMantén las caderas en el suelo\nAlarga el cuello\nMantén la posición"}',
    'back', 'beginner', 30
  ) RETURNING id INTO ex12;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Knie zur Brust","en":"Knees to Chest","es":"Rodillas al pecho"}',
    '{"de":"Entspannt die Lendenwirbelsäule durch sanftes Zusammenziehen der Knie.","en":"Relieves the lumbar spine by gently drawing knees in.","es":"Relaja la columna lumbar llevando suavemente las rodillas al pecho."}',
    '{"de":"Lege dich auf den Rücken\nZiehe beide Knie zur Brust\nUmschließe die Knie mit den Armen\nRolle sanft von Seite zu Seite\nAtme tief und entspanne den Rücken","en":"Lie on your back\nDraw both knees to chest\nWrap arms around knees\nGently rock side to side\nBreathe deeply and relax the back","es":"Acuéstate boca arriba\nLleva ambas rodillas al pecho\nEnvuelve las rodillas con los brazos\nBálancéate suavemente de lado a lado\nRespira profundo y relaja la espalda"}',
    'back', 'beginner', 30
  ) RETURNING id INTO ex13;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Brustwirbel-Streckung","en":"Thoracic Extension","es":"Extensión torácica"}',
    '{"de":"Verbessert die Brustwirbelsäulenbeweglichkeit durch gezielte Extension.","en":"Improves thoracic spine mobility through targeted extension.","es":"Mejora la movilidad de la columna torácica con extensión específica."}',
    '{"de":"Setze dich auf einen Stuhl\nVerschränke die Hände hinter dem Kopf\nBeuge dich über die Stuhllehne\nLasse die Brustwirbelsäule sich strecken\nHalte 5 Sekunden\nWiederhole 5 Mal","en":"Sit on a chair\nClasp hands behind head\nArch back over the chair back\nAllow thoracic spine to extend\nHold 5 seconds\nRepeat 5 times","es":"Siéntate en una silla\nEntrelaza las manos detrás de la cabeza\nDóblate sobre el respaldo de la silla\nDeja que la columna torácica se extienda\nMantén 5 segundos\nRepite 5 veces"}',
    'back', 'intermediate', 30
  ) RETURNING id INTO ex14;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec, equipment)
  VALUES (
    '{"de":"Rückenrolle","en":"Foam Roll Back","es":"Rodillo de espalda"}',
    '{"de":"Löst Verspannungen in der Brustwirbelsäule mit der Schaumstoffrolle.","en":"Releases tension in the thoracic spine using a foam roller.","es":"Libera tensión en la columna torácica con el rodillo de espuma."}',
    '{"de":"Lege die Schaumstoffrolle horizontal auf den Boden\nSetze dich davor und lasse dich zurückfallen\nPositioniere die Rolle unter der Brustwirbelsäule\nRolle langsam von oben nach unten\nVerweile an verspannten Stellen","en":"Place foam roller horizontally on floor\nSit in front and lean back onto it\nPosition roller under thoracic spine\nSlowly roll from upper to lower back\nPause at tight spots","es":"Coloca el rodillo horizontalmente en el suelo\nSiéntate delante y recuéstate sobre él\nPositiona el rodillo bajo la columna torácica\nRueda lentamente de arriba hacia abajo\nDetente en los puntos tensos"}',
    'back', 'beginner', 60, ARRAY['foam_roller']
  ) RETURNING id INTO ex15;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Stehende Rückbeuge","en":"Standing Back Bend","es":"Flexión trasera de pie"}',
    '{"de":"Streckt die gesamte Vorderseite des Körpers und dehnt die Wirbelsäule.","en":"Stretches the entire front of the body and extends the spine.","es":"Estira toda la parte frontal del cuerpo y extiende la columna."}',
    '{"de":"Stehe aufrecht mit schulterbreitem Stand\nLege die Hände auf den unteren Rücken\nBeuge dich langsam nach hinten\nSchaue zur Decke\nHalte und atme tief\nKomme langsam zurück","en":"Stand upright feet shoulder-width apart\nPlace hands on lower back\nSlowly arch backward\nLook toward ceiling\nHold and breathe deeply\nReturn slowly","es":"Párate erguido con pies separados al ancho de hombros\nPon las manos en la espalda baja\nDóblate lentamente hacia atrás\nMira hacia el techo\nMantén y respira profundo\nRegresa lentamente"}',
    'back', 'beginner', 20
  ) RETURNING id INTO ex16;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Superman-Dehnung","en":"Superman Stretch","es":"Estiramiento superman"}',
    '{"de":"Stärkt und dehnt die Rückenstrecker durch simultane Arm- und Beinhebung.","en":"Strengthens and lengthens back extensors through simultaneous arm and leg lift.","es":"Fortalece y estira los extensores de la espalda levantando brazos y piernas."}',
    '{"de":"Lege dich auf den Bauch\nStrecke Arme und Beine aus\nHebe gleichzeitig Arme und Beine vom Boden\nHalte 5 Sekunden\nSenke wieder ab\nWiederhole 8 Mal","en":"Lie on your stomach\nExtend arms and legs\nSimultaneously lift arms and legs off floor\nHold 5 seconds\nLower again\nRepeat 8 times","es":"Acuéstate boca abajo\nExtiende brazos y piernas\nLevanta simultáneamente brazos y piernas del suelo\nMantén 5 segundos\nBaja de nuevo\nRepite 8 veces"}',
    'back', 'beginner', 30
  ) RETURNING id INTO ex17;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Nadel einfädeln","en":"Thread the Needle","es":"Enhebrar la aguja"}',
    '{"de":"Dehnt die Schultern und Brustwirbelsäule durch eine rotierende Seitlage.","en":"Stretches shoulders and thoracic spine through a rotating side position.","es":"Estira hombros y columna torácica con una posición lateral giratoria."}',
    '{"de":"Beginne im Vierfüßlerstand\nSchiebe die rechte Hand unter dem Körper durch\nLasse die rechte Schulter zum Boden sinken\nHalte die linke Hand gestreckt\nHalte die Dehnung\nWechsle die Seite","en":"Start on hands and knees\nSlide right hand under body\nAllow right shoulder to lower to floor\nKeep left hand extended\nHold the stretch\nSwitch sides","es":"Comienza en cuatro apoyos\nDesliza la mano derecha bajo el cuerpo\nDeja que el hombro derecho baje al suelo\nMantén la mano izquierda extendida\nMantén el estiramiento\nCambia de lado"}',
    'back', 'beginner', 30
  ) RETURNING id INTO ex18;

  -- ── SHOULDERS ─────────────────────────────────────────────────────────
  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Schulterquer-Dehnung","en":"Cross-Body Shoulder Stretch","es":"Estiramiento de hombro cruzado"}',
    '{"de":"Dehnt den hinteren Deltamuskel und die Rotatorenmanschette.","en":"Stretches the posterior deltoid and rotator cuff.","es":"Estira el deltoides posterior y el manguito rotador."}',
    '{"de":"Stehe oder sitze aufrecht\nStrecke den rechten Arm waagerecht vor dir\nZiehe ihn mit der linken Hand über die Brust\nHalte den Ellbogen leicht gebeugt\nDrücke sanft gegen die Brust\nWechsle die Seite","en":"Stand or sit upright\nExtend right arm horizontally in front\nPull it across chest with left hand\nKeep elbow slightly bent\nPress gently against chest\nSwitch sides","es":"Párate o siéntate erguido\nExtiende el brazo derecho horizontalmente\nTíralo a través del pecho con la mano izquierda\nMantén el codo ligeramente doblado\nPresiona suavemente contra el pecho\nCambia de lado"}',
    'shoulders', 'beginner', 30
  ) RETURNING id INTO ex19;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Türrahmen-Brustdehnung","en":"Doorway Chest Stretch","es":"Estiramiento de pecho en puerta"}',
    '{"de":"Öffnet die Brust und dehnt den vorderen Deltamuskel und Pektoralis.","en":"Opens the chest and stretches anterior deltoid and pectoralis.","es":"Abre el pecho y estira el deltoides anterior y el pectoral."}',
    '{"de":"Stelle dich in einen Türrahmen\nHebe beide Arme auf 90° (wie ein T)\nLehne dich leicht nach vorne\nSpüre die Dehnung in der Brust\nHalte die Position\nAtme tief durch","en":"Stand in a doorframe\nRaise both arms to 90 degrees like a T\nLean slightly forward\nFeel the stretch across the chest\nHold position\nBreathe deeply","es":"Párate en un marco de puerta\nLevanta ambos brazos a 90 grados como una T\nInclínate ligeramente hacia adelante\nSiente el estiramiento en el pecho\nMantén la posición\nRespira profundo"}',
    'shoulders', 'beginner', 30
  ) RETURNING id INTO ex20;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Trizeps-Überkopf-Dehnung","en":"Overhead Triceps Stretch","es":"Estiramiento de tríceps sobre la cabeza"}',
    '{"de":"Dehnt den langen Trizepskopf und die hintere Schultermuskulatur.","en":"Stretches the long head of triceps and posterior shoulder muscles.","es":"Estira la cabeza larga del tríceps y los músculos posteriores del hombro."}',
    '{"de":"Stehe oder sitze aufrecht\nHebe den rechten Arm über den Kopf\nWinkle den Ellbogen an, Hand hinter den Kopf\nGreife den Ellbogen mit der linken Hand\nZiehe sanft nach links\nWechsle die Seite","en":"Stand or sit upright\nRaise right arm overhead\nBend elbow hand behind head\nGrasp elbow with left hand\nGently pull to the left\nSwitch sides","es":"Párate o siéntate erguido\nLevanta el brazo derecho sobre la cabeza\nDobla el codo mano detrás de la cabeza\nAgarra el codo con la mano izquierda\nJala suavemente hacia la izquierda\nCambia de lado"}',
    'shoulders', 'beginner', 30
  ) RETURNING id INTO ex21;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Schulterkreise","en":"Shoulder Circles","es":"Círculos de hombros"}',
    '{"de":"Dynamische Schultererwärmung durch kontrollierte Kreisbewegungen.","en":"Dynamic shoulder warm-up through controlled circular movements.","es":"Calentamiento dinámico de hombros con movimientos circulares controlados."}',
    '{"de":"Stehe aufrecht mit entspannten Armen\nHebe die Schultern nach oben\nRolle sie nach hinten\nSenke sie nach unten\nRolle sie nach vorne\n5 Kreise vorwärts und 5 rückwärts","en":"Stand upright with relaxed arms\nLift shoulders upward\nRoll them backward\nLower them downward\nRoll them forward\n5 circles forward and 5 backward","es":"Párate erguido con brazos relajados\nLevanta los hombros hacia arriba\nRódalos hacia atrás\nBájalos hacia abajo\nRódalos hacia adelante\n5 círculos adelante y 5 atrás"}',
    'shoulders', 'beginner', 20
  ) RETURNING id INTO ex22;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Schulterblatt-Zusammenziehen","en":"Shoulder Blade Squeeze","es":"Compresión de escápulas"}',
    '{"de":"Aktiviert die Rhomboiden und verbessert die Körperhaltung durch Retraktion.","en":"Activates the rhomboids and improves posture through retraction.","es":"Activa los romboides y mejora la postura mediante retracción."}',
    '{"de":"Sitze oder stehe aufrecht\nZiehe die Schulterblätter zusammen\nHalte 5 Sekunden\nLöse langsam\nWiederhole 10 Mal\nAtme während der Übung normal","en":"Sit or stand upright\nSqueeze shoulder blades together\nHold 5 seconds\nRelease slowly\nRepeat 10 times\nBreathe normally throughout","es":"Siéntate o párate erguido\nAprieta las escápulas\nMantén 5 segundos\nSuelta lentamente\nRepite 10 veces\nRespira normal durante el ejercicio"}',
    'shoulders', 'beginner', 20
  ) RETURNING id INTO ex23;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Wand-Schulterdehnung","en":"Wall Shoulder Stretch","es":"Estiramiento de hombro en pared"}',
    '{"de":"Dehnt die Schulter-Außenrotation durch Unterstützung an der Wand.","en":"Stretches shoulder external rotation with wall support.","es":"Estira la rotación externa del hombro con apoyo en la pared."}',
    '{"de":"Stelle dich seitlich zur Wand\nLege den angewinkelten Arm (90°) an die Wand\nDrehe den Körper sanft von der Wand weg\nSpüre die Dehnung in der vorderen Schulter\nHalte die Position\nWechsle die Seite","en":"Stand sideways to wall\nPlace bent arm at 90 degrees against wall\nGently rotate body away from wall\nFeel stretch in front of shoulder\nHold position\nSwitch sides","es":"Párate de lado a la pared\nColoca el brazo doblado a 90 grados contra la pared\nGira suavemente el cuerpo alejándote de la pared\nSiente el estiramiento en la parte frontal del hombro\nMantén la posición\nCambia de lado"}',
    'shoulders', 'beginner', 30
  ) RETURNING id INTO ex24;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Schlaf-Dehnung","en":"Sleeper Stretch","es":"Estiramiento durmiente"}',
    '{"de":"Verbessert die Innenrotation der Schulter – wichtig für Athleten.","en":"Improves shoulder internal rotation – important for athletes.","es":"Mejora la rotación interna del hombro – importante para atletas."}',
    '{"de":"Lege dich auf die rechte Seite\nStrecke den rechten Arm vor dir aus\nWinkle ihn auf 90° an\nDrücke den Unterarm mit der linken Hand sanft nach unten\nHalte bei moderater Dehnung\nWechsle die Seite","en":"Lie on right side\nExtend right arm in front\nBend to 90 degrees\nGently press forearm down with left hand\nHold at moderate stretch\nSwitch sides","es":"Acuéstate del lado derecho\nExtiende el brazo derecho al frente\nDóblalo a 90 grados\nPresiona suavemente el antebrazo hacia abajo con la mano izquierda\nMantén con estiramiento moderado\nCambia de lado"}',
    'shoulders', 'advanced', 30
  ) RETURNING id INTO ex25;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Adlerarm-Dehnung","en":"Eagle Arms Stretch","es":"Estiramiento brazos de águila"}',
    '{"de":"Dehnt tiefe Schulter- und Obere-Rücken-Muskeln durch Überkreuzung der Arme.","en":"Stretches deep shoulder and upper back muscles by crossing arms.","es":"Estira los músculos profundos del hombro y la espalda alta cruzando los brazos."}',
    '{"de":"Stehe oder sitze aufrecht\nKreuze den rechten Arm über den linken\nWinkle beide Ellbogen an\nHebe die Unterarme und wickle sie umeinander\nZiehe die Ellbogen nach oben\nWechsle nach 30 Sekunden die Seiten","en":"Stand or sit upright\nCross right arm over left\nBend both elbows\nLift forearms and wrap them around each other\nLift elbows upward\nSwitch sides after 30 seconds","es":"Párate o siéntate erguido\nCruza el brazo derecho sobre el izquierdo\nDobla ambos codos\nLevanta los antebrazos y enróllalos\nLevanta los codos hacia arriba\nCambia de lado después de 30 segundos"}',
    'shoulders', 'intermediate', 30
  ) RETURNING id INTO ex26;

  -- ── HAMSTRINGS ────────────────────────────────────────────────────────
  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Stehende Oberschenkel-Dehnung","en":"Standing Hamstring Stretch","es":"Estiramiento de isquiotibiales de pie"}',
    '{"de":"Einfache stehende Dehnung für die hintere Oberschenkelmuskulatur.","en":"Simple standing stretch for the posterior thigh muscles.","es":"Estiramiento simple de pie para los músculos posteriores del muslo."}',
    '{"de":"Stehe aufrecht\nStrecke das rechte Bein leicht nach vorne auf der Ferse\nBeuge leicht das linke Knie\nNeige den Oberkörper nach vorne mit geradem Rücken\nSpüre die Dehnung an der Rückseite des Oberschenkels\nWechsle die Seite","en":"Stand upright\nExtend right leg slightly forward on heel\nBend left knee slightly\nTilt torso forward with flat back\nFeel stretch along back of thigh\nSwitch sides","es":"Párate erguido\nExtiende la pierna derecha ligeramente al frente sobre el talón\nDobla ligeramente la rodilla izquierda\nInclina el torso hacia adelante con espalda recta\nSiente el estiramiento en la parte trasera del muslo\nCambia de lado"}',
    'hamstrings', 'beginner', 30
  ) RETURNING id INTO ex27;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Sitzende Vorwärtsbeuge","en":"Seated Forward Fold","es":"Flexión hacia adelante sentada"}',
    '{"de":"Dehnt die gesamte hintere Körperkette vom Nacken bis zu den Waden.","en":"Stretches the entire posterior chain from neck to calves.","es":"Estira toda la cadena posterior desde el cuello hasta las pantorrillas."}',
    '{"de":"Sitze mit gestreckten Beinen\nAtme aus und beuge dich nach vorne\nGreife zu den Füßen oder Schienbeinbeinen\nHalte den Rücken möglichst gerade\nVertiefe die Dehnung bei jeder Ausatmung\nHalte die Position","en":"Sit with legs extended\nExhale and fold forward\nReach toward feet or shins\nKeep back as flat as possible\nDeepen stretch with each exhale\nHold position","es":"Siéntate con piernas extendidas\nExhala y dóblate hacia adelante\nAlcanza los pies o las espinillas\nMantén la espalda lo más recta posible\nProfundiza el estiramiento con cada exhalación\nMantén la posición"}',
    'hamstrings', 'beginner', 45
  ) RETURNING id INTO ex28;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Liegende Oberschenkel-Dehnung","en":"Supine Hamstring Stretch","es":"Estiramiento de isquiotibiales supino"}',
    '{"de":"Dehnt die hinteren Oberschenkel im Liegen – schonend für den unteren Rücken.","en":"Stretches the hamstrings lying down – gentle on the lower back.","es":"Estira los isquiotibiales acostado – suave para la espalda baja."}',
    '{"de":"Lege dich auf den Rücken\nHebe das rechte Bein\nHalte es hinter dem Oberschenkel oder Wade\nStrecke das Bein so weit wie möglich\nHalte den unteren Rücken am Boden\nWechsle die Seite","en":"Lie on your back\nLift right leg\nHold behind thigh or calf\nStraighten leg as much as possible\nKeep lower back on floor\nSwitch sides","es":"Acuéstate boca arriba\nLevanta la pierna derecha\nSujeta por detrás del muslo o la pantorrilla\nEstira la pierna tanto como sea posible\nMantén la espalda baja en el suelo\nCambia de lado"}',
    'hamstrings', 'beginner', 30
  ) RETURNING id INTO ex29;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Herabschauender Hund","en":"Downward Dog","es":"Perro mirando hacia abajo"}',
    '{"de":"Dehnt Oberschenkel, Waden und Schultern in einer einzigen Yoga-Grundstellung.","en":"Stretches hamstrings, calves, and shoulders in one fundamental yoga position.","es":"Estira isquiotibiales, pantorrillas y hombros en una postura fundamental de yoga."}',
    '{"de":"Beginne im Vierfüßlerstand\nHebe die Knie vom Boden\nStrecke die Hüfte nach oben und hinten\nDrücke die Fersen Richtung Boden\nHalte den Rücken gerade\nHalte 5-8 Atemzüge","en":"Start on hands and knees\nLift knees off floor\nPush hips up and back\nPress heels toward floor\nKeep back straight\nHold for 5-8 breaths","es":"Comienza en cuatro apoyos\nLevanta las rodillas del suelo\nEmpuja las caderas hacia arriba y atrás\nPresiona los talones hacia el suelo\nMantén la espalda recta\nMantén 5-8 respiraciones"}',
    'hamstrings', 'beginner', 30
  ) RETURNING id INTO ex30;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Stehende Vorwärtsbeuge","en":"Standing Forward Fold","es":"Flexión hacia adelante de pie"}',
    '{"de":"Dehnt die gesamte Rückseite der Beine und dekomprimiert die Wirbelsäule.","en":"Stretches the entire back of the legs and decompresses the spine.","es":"Estira toda la parte trasera de las piernas y descomprime la columna."}',
    '{"de":"Stehe aufrecht mit leicht gebogenen Knien\nAtme aus und beuge dich nach vorne\nLasse den Kopf und die Arme hängen\nCorner nach unten durch die Knie absenken\nHalte und atme tief in den Rücken\nRolle langsam auf","en":"Stand upright with slightly bent knees\nExhale and fold forward\nLet head and arms hang\nRelax weight down through bent knees\nHold and breathe deeply into back\nSlowly roll up","es":"Párate erguido con rodillas ligeramente dobladas\nExhala y dóblate hacia adelante\nDeja que la cabeza y los brazos cuelguen\nRelaja el peso hacia abajo\nMantén y respira profundo\nSube lentamente"}',
    'hamstrings', 'beginner', 30
  ) RETURNING id INTO ex31;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Halber Spagat","en":"Half Split","es":"Medio espagat"}',
    '{"de":"Intensive Dehnung der hinteren Oberschenkel in einem halben Spagat.","en":"Intensive hamstring stretch in a half split position.","es":"Estiramiento intensivo de isquiotibiales en posición de medio espagat."}',
    '{"de":"Starte in einer tiefen Ausfallschrittposition\nSchiebe das vordere Bein nach vorne\nStrecke das vordere Bein so weit wie möglich\nBeuge dich über das gestreckte Bein\nHalte den Rücken gerade\nWechsle die Seite","en":"Start in a deep lunge position\nSlide front leg forward\nStraighten front leg as much as possible\nFold over the extended leg\nKeep back straight\nSwitch sides","es":"Comienza en posición de estocada profunda\nDesliza la pierna delantera hacia adelante\nEstira la pierna delantera tanto como sea posible\nDóblate sobre la pierna extendida\nMantén la espalda recta\nCambia de lado"}',
    'hamstrings', 'intermediate', 45
  ) RETURNING id INTO ex32;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Liegende Beinhebung","en":"Lying Hamstring Lift","es":"Elevación de pierna tumbado"}',
    '{"de":"Aktiviert und dehnt gleichzeitig den Oberschenkel durch aktive Beinhebung.","en":"Simultaneously activates and stretches the hamstring through active leg raising.","es":"Activa y estira simultáneamente el isquiotibial con elevación activa de pierna."}',
    '{"de":"Lege dich auf den Rücken\nStrecke beide Beine aus\nHebe das rechte Bein langsam hoch\nHalte das Bein für 3 Sekunden\nSenke es kontrolliert ab\nWiederhole 10 Mal pro Seite","en":"Lie on your back\nExtend both legs\nSlowly raise right leg\nHold leg for 3 seconds\nLower it in a controlled manner\nRepeat 10 times each side","es":"Acuéstate boca arriba\nExtiende ambas piernas\nLevanta lentamente la pierna derecha\nMantén la pierna 3 segundos\nBájala de forma controlada\nRepite 10 veces por lado"}',
    'hamstrings', 'intermediate', 30
  ) RETURNING id INTO ex33;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Weitbeinige Vorwärtsbeuge","en":"Wide-Legged Forward Fold","es":"Flexión hacia adelante con piernas abiertas"}',
    '{"de":"Dehnt Innen- und Rückseite der Oberschenkel durch eine breite Standstellung.","en":"Stretches inner and back thighs through a wide-stance fold.","es":"Estira la parte interna y posterior de los muslos en posición amplia."}',
    '{"de":"Stehe mit weit geöffneten Beinen\nDrehe die Zehen leicht nach innen\nBeuge dich langsam nach vorne\nLege die Hände auf den Boden\nLasse den Kopf hängen\nHalte und atme tief","en":"Stand with legs wide apart\nTurn toes slightly inward\nSlowly fold forward\nPlace hands on floor\nLet head hang\nHold and breathe deeply","es":"Párate con piernas bien separadas\nGira los dedos ligeramente hacia adentro\nDóblate lentamente hacia adelante\nColoca las manos en el suelo\nDeja que la cabeza cuelgue\nMantén y respira profundo"}',
    'hamstrings', 'intermediate', 45
  ) RETURNING id INTO ex34;

  -- ── CHEST ─────────────────────────────────────────────────────────────
  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Türrahmen-Brustöffner","en":"Doorway Chest Opener","es":"Apertura de pecho en puerta"}',
    '{"de":"Öffnet Brust und Schultern durch Nutzung eines Türrahmens als Stütze.","en":"Opens chest and shoulders using a doorframe as support.","es":"Abre el pecho y los hombros usando el marco de una puerta como apoyo."}',
    '{"de":"Stelle dich in einen Türrahmen\nLege einen oder beide Arme am Rahmen an\nNeige dich leicht nach vorne\nSpüre die Dehnung im Brustbereich\nHalte aufrechte Körperhaltung\nHalte 30 Sekunden","en":"Stand in a doorframe\nPlace one or both arms on frame\nLean slightly forward\nFeel stretch across chest\nMaintain upright posture\nHold 30 seconds","es":"Párate en un marco de puerta\nColoca uno o ambos brazos en el marco\nInclínate ligeramente hacia adelante\nSiente el estiramiento en el pecho\nMantén postura erguida\nMantén 30 segundos"}',
    'chest', 'beginner', 30
  ) RETURNING id INTO ex35;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Liegende Brustdehnung","en":"Lying Chest Stretch","es":"Estiramiento de pecho tumbado"}',
    '{"de":"Passives Öffnen des Brustkorbs in der Rückenlage mit Unterstützung.","en":"Passive chest opening in supine position with support.","es":"Apertura pasiva del pecho en posición supina con apoyo."}',
    '{"de":"Lege dich auf den Rücken\nBreite die Arme zu einem T aus\nLasse die Schwerkraft die Brust öffnen\nAtme tief ein und spüre die Dehnung\nHalte entspannt\nKomme langsam zurück","en":"Lie on your back\nSpread arms out to a T shape\nLet gravity open the chest\nBreathe deeply and feel the stretch\nStay relaxed\nReturn slowly","es":"Acuéstate boca arriba\nExtiende los brazos en forma de T\nDeja que la gravedad abra el pecho\nRespira profundo y siente el estiramiento\nRelájate\nRegresa lentamente"}',
    'chest', 'beginner', 30
  ) RETURNING id INTO ex36;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Pektoralis-Dehnung mit verschränkten Händen","en":"Clasped Hands Pec Stretch","es":"Estiramiento pectoral con manos entrelazadas"}',
    '{"de":"Dehnt den Brustmuskel durch Verschränken der Hände hinter dem Rücken.","en":"Stretches the pec by clasping hands behind the back.","es":"Estira el pectoral entrelazando las manos detrás de la espalda."}',
    '{"de":"Stehe aufrecht\nVerschränke die Hände hinter dem Rücken\nStrecke die Arme gerade\nHebe die Arme leicht nach hinten oben\nÖffne die Brust nach vorne\nHalte und atme tief","en":"Stand upright\nClasp hands behind back\nStraighten arms\nLift arms slightly upward and back\nOpen chest forward\nHold and breathe deeply","es":"Párate erguido\nEntrelaza las manos detrás de la espalda\nEstira los brazos\nLevanta los brazos ligeramente hacia atrás y arriba\nAbre el pecho hacia adelante\nMantén y respira profundo"}',
    'chest', 'beginner', 30
  ) RETURNING id INTO ex37;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Sitzende Drehung mit Brustöffnung","en":"Seated Twist Chest Open","es":"Apertura de pecho con torsión sentada"}',
    '{"de":"Kombiniert Rotation und Brustöffnung für eine dynamische Oberkörperdehnung.","en":"Combines rotation and chest opening for dynamic upper body stretch.","es":"Combina rotación y apertura de pecho para un estiramiento dinámico."}',
    '{"de":"Setze dich aufrecht hin\nDrehe den Oberkörper nach rechts\nÖffne den rechten Arm weit nach hinten\nSchaue über die rechte Schulter\nHalte 3 Atemzüge\nWechsle die Seite","en":"Sit upright\nRotate torso to the right\nOpen right arm wide behind you\nLook over right shoulder\nHold for 3 breaths\nSwitch sides","es":"Siéntate erguido\nGira el torso hacia la derecha\nAbre el brazo derecho ampliamente hacia atrás\nMira sobre el hombro derecho\nMantén 3 respiraciones\nCambia de lado"}',
    'chest', 'beginner', 30
  ) RETURNING id INTO ex38;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Seitliches Liegen Brustdehnung","en":"Side-Lying Chest Stretch","es":"Estiramiento de pecho lateral"}',
    '{"de":"Öffnet eine Seite des Brustkorbs intensiv durch Seitlage mit gespreiztem Arm.","en":"Intensively opens one side of the chest through side-lying with spread arm.","es":"Abre intensamente un lado del pecho en posición lateral con brazo extendido."}',
    '{"de":"Lege dich auf die linke Seite\nStrecke den rechten Arm zur Seite\nRolle leicht zurück auf die Schulter\nLasse den Arm zur Decke zeigen\nHalte die Dehnung\nWechsle die Seite","en":"Lie on left side\nExtend right arm to the side\nRoll slightly back onto shoulder\nLet arm point toward ceiling\nHold the stretch\nSwitch sides","es":"Acuéstate del lado izquierdo\nExtiende el brazo derecho hacia el lado\nRódate ligeramente hacia atrás sobre el hombro\nDeja que el brazo señale hacia el techo\nMantén el estiramiento\nCambia de lado"}',
    'chest', 'beginner', 30
  ) RETURNING id INTO ex39;

  -- ── CALVES ────────────────────────────────────────────────────────────
  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Stehende Wadendehnung","en":"Standing Calf Stretch","es":"Estiramiento de pantorrilla de pie"}',
    '{"de":"Klassische Wadendehnung im Stand gegen eine Wand oder freistehend.","en":"Classic standing calf stretch against a wall or freestanding.","es":"Estiramiento clásico de pantorrilla de pie contra una pared."}',
    '{"de":"Stehe vor einer Wand\nMache einen Schritt nach vorne mit dem linken Fuß\nStrecke das rechte Bein nach hinten\nDrücke die rechte Ferse in den Boden\nHalte die Körperhaltung aufrecht\nWechsle die Seite","en":"Stand facing a wall\nStep left foot forward\nExtend right leg back\nPress right heel into floor\nKeep posture upright\nSwitch sides","es":"Párate frente a una pared\nDa un paso al frente con el pie izquierdo\nExtiende la pierna derecha hacia atrás\nPresiona el talón derecho en el suelo\nMantén postura erguida\nCambia de lado"}',
    'calves', 'beginner', 30
  ) RETURNING id INTO ex40;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Sitzende Wadendehnung","en":"Seated Calf Stretch","es":"Estiramiento de pantorrilla sentado"}',
    '{"de":"Dehnt die Wadenmuskulatur im Sitzen mit einem Band oder Handtuch.","en":"Stretches calf muscles seated using a band or towel.","es":"Estira la pantorrilla sentado usando una banda o toalla."}',
    '{"de":"Sitze mit gestreckten Beinen\nLege ein Handtuch um den rechten Fuß\nZiehe die Fußspitze zu dir\nHalte den Zug für 30 Sekunden\nLöse und entspanne\nWechsle die Seite","en":"Sit with legs extended\nLoop a towel around right foot\nPull toes toward you\nHold the pull for 30 seconds\nRelease and relax\nSwitch sides","es":"Siéntate con piernas extendidas\nEnvuelve una toalla alrededor del pie derecho\nJala los dedos hacia ti\nMantén el jalón 30 segundos\nSuelta y relájate\nCambia de lado"}',
    'calves', 'beginner', 30
  ) RETURNING id INTO ex41;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Herabschauender Hund Wadengang","en":"Downward Dog Calf Walk","es":"Caminata de pantorrilla en perro mirando abajo"}',
    '{"de":"Dynamische Wadendehnung im Downward Dog durch abwechselndes Fersendrücken.","en":"Dynamic calf stretch in downward dog through alternating heel pressing.","es":"Estiramiento dinámico de pantorrilla en perro mirando abajo alternando talones."}',
    '{"de":"Gehe in den Herabschauenden Hund\nDrücke die rechte Ferse zum Boden\nHalte 3 Sekunden\nWechsle zur linken Ferse\nAlterniere langsam zwischen beiden Seiten\nWiederhole 10 Mal","en":"Come into Downward Dog\nPress right heel toward floor\nHold 3 seconds\nSwitch to left heel\nAlternate slowly between both sides\nRepeat 10 times","es":"Pasa al Perro mirando hacia abajo\nPresiona el talón derecho hacia el suelo\nMantén 3 segundos\nCambia al talón izquierdo\nAlterna lentamente entre ambos lados\nRepite 10 veces"}',
    'calves', 'beginner', 30
  ) RETURNING id INTO ex42;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Stufen-Wadendehnung","en":"Step Calf Stretch","es":"Estiramiento de pantorrilla en escalón"}',
    '{"de":"Intensive Wadendehnung durch Absenken der Ferse unter Treppenniveau.","en":"Intensive calf stretch by lowering heel below step level.","es":"Estiramiento intensivo de pantorrilla bajando el talón bajo el nivel del escalón."}',
    '{"de":"Stelle dich auf eine Treppenstufe\nPlaatze den Vorderfuß auf der Stufe\nLasse die Ferse langsam absinken\nHalte dich am Geländer fest\nHalte die gedehnte Position\nWechsle die Seite","en":"Stand on a step\nPlace the ball of foot on edge\nSlowly lower heel down\nHold onto railing for support\nHold the stretched position\nSwitch sides","es":"Párate en un escalón\nColoca la parte delantera del pie en el borde\nBaja lentamente el talón\nSujétate al pasamanos\nMantén la posición extendida\nCambia de lado"}',
    'calves', 'beginner', 30
  ) RETURNING id INTO ex43;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Wand-Wadendehnung","en":"Wall Calf Stretch","es":"Estiramiento de pantorrilla en pared"}',
    '{"de":"Dehnt Gastrocnemius und Soleus durch leichte Zehenhebeübung an der Wand.","en":"Stretches gastrocnemius and soleus with gentle toe lift against wall.","es":"Estira el gastrocnemio y sóleo con elevación de punta de pie contra la pared."}',
    '{"de":"Stehe nah vor einer Wand\nLege die Zehen des rechten Fußes an die Wand\nDrücke die Ferse in den Boden\nHalte die Hüfte gerade\nHalte 30 Sekunden\nWechsle die Seite","en":"Stand close to a wall\nPlace toes of right foot against wall\nPress heel into floor\nKeep hips straight\nHold 30 seconds\nSwitch sides","es":"Párate cerca de una pared\nColoca los dedos del pie derecho contra la pared\nPresiona el talón en el suelo\nMantén las caderas rectas\nMantén 30 segundos\nCambia de lado"}',
    'calves', 'beginner', 30
  ) RETURNING id INTO ex44;

  -- ── NECK ──────────────────────────────────────────────────────────────
  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Seitliche Nackendehnung","en":"Neck Side Stretch","es":"Estiramiento lateral de cuello"}',
    '{"de":"Dehnt die seitlichen Nackenmuskeln und den oberen Trapezius.","en":"Stretches the lateral neck muscles and upper trapezius.","es":"Estira los músculos laterales del cuello y el trapecio superior."}',
    '{"de":"Sitze oder stehe aufrecht\nNeige den Kopf zur rechten Seite\nLege die rechte Hand auf den linken Schläfe\nZiehe sanft nach rechts\nHalte 20 Sekunden\nWechsle die Seite","en":"Sit or stand upright\nTilt head to right side\nPlace right hand on left temple\nGently pull to right\nHold 20 seconds\nSwitch sides","es":"Siéntate o párate erguido\nInclina la cabeza hacia la derecha\nColoca la mano derecha en la sien izquierda\nJala suavemente hacia la derecha\nMantén 20 segundos\nCambia de lado"}',
    'neck', 'beginner', 20
  ) RETURNING id INTO ex45;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Nackendrehung","en":"Neck Rotation","es":"Rotación de cuello"}',
    '{"de":"Verbessert die Rotation des Halses durch sanfte Drehbewegungen.","en":"Improves neck rotation through gentle turning movements.","es":"Mejora la rotación del cuello con movimientos giratorios suaves."}',
    '{"de":"Sitze aufrecht\nDrehe den Kopf langsam nach rechts\nHalte 5 Sekunden\nKomme zur Mitte zurück\nDrehe nach links\nWiederhole 5 Mal pro Seite","en":"Sit upright\nSlowly turn head to the right\nHold 5 seconds\nReturn to center\nTurn to the left\nRepeat 5 times each side","es":"Siéntate erguido\nGira la cabeza lentamente hacia la derecha\nMantén 5 segundos\nRegresa al centro\nGira a la izquierda\nRepite 5 veces por lado"}',
    'neck', 'beginner', 20
  ) RETURNING id INTO ex46;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Kinn-Einzug","en":"Chin Tuck","es":"Retracción de mentón"}',
    '{"de":"Korrigiert die Vorwärtshaltung und stärkt die tiefen Nackenflexoren.","en":"Corrects forward head posture and strengthens deep neck flexors.","es":"Corrige la postura de cabeza adelantada y fortalece los flexores profundos del cuello."}',
    '{"de":"Sitze oder stehe aufrecht\nBlicke geradeaus\nZiehe das Kinn sanft ein (doppeltes Kinn)\nHalte 5 Sekunden\nLöse langsam\nWiederhole 10 Mal","en":"Sit or stand upright\nLook straight ahead\nGently pull chin in making a double chin\nHold 5 seconds\nRelease slowly\nRepeat 10 times","es":"Siéntate o párate erguido\nMira al frente\nJala suavemente el mentón hacia adentro\nMantén 5 segundos\nSuelta lentamente\nRepite 10 veces"}',
    'neck', 'beginner', 15
  ) RETURNING id INTO ex47;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Schulter-Entspannung","en":"Shoulder Shrug Release","es":"Liberación de hombros"}',
    '{"de":"Löst Verspannungen im oberen Trapezius durch bewusstes An- und Entspannen.","en":"Releases upper trapezius tension through conscious tensing and relaxing.","es":"Libera la tensión del trapecio superior con tensión y relajación consciente."}',
    '{"de":"Sitze oder stehe aufrecht\nZiehe die Schultern so weit wie möglich hoch\nHalte 3 Sekunden\nLasse sie fallen\nAtme aus\nWiederhole 5 Mal","en":"Sit or stand upright\nRaise shoulders as high as possible\nHold 3 seconds\nDrop them\nExhale\nRepeat 5 times","es":"Siéntate o párate erguido\nSube los hombros tan alto como puedas\nMantén 3 segundos\nDéjalos caer\nExhala\nRepite 5 veces"}',
    'neck', 'beginner', 20
  ) RETURNING id INTO ex48;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Oberer Trapezius-Stretch","en":"Upper Trap Stretch","es":"Estiramiento del trapecio superior"}',
    '{"de":"Dehnt gezielt den oberen Trapezius, der oft durch Stress verspannt ist.","en":"Specifically stretches the upper trapezius, often tight from stress.","es":"Estira específicamente el trapecio superior, frecuentemente tenso por el estrés."}',
    '{"de":"Sitze aufrecht auf einem Stuhl\nLege die rechte Hand hinter dem Rücken durch\nNeige den Kopf zur linken Seite\nLege die linke Hand auf den Kopf\nZiehe sanft nach links\nWechsle die Seite","en":"Sit upright on a chair\nPlace right hand behind your back\nTilt head to left side\nPlace left hand on head\nGently pull to the left\nSwitch sides","es":"Siéntate erguido en una silla\nPon la mano derecha detrás de la espalda\nInclina la cabeza hacia la izquierda\nColoca la mano izquierda en la cabeza\nJala suavemente hacia la izquierda\nCambia de lado"}',
    'neck', 'beginner', 30
  ) RETURNING id INTO ex49;

  -- ── FULL BODY ─────────────────────────────────────────────────────────
  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Stehende Seitenstreckung","en":"Standing Side Stretch","es":"Estiramiento lateral de pie"}',
    '{"de":"Dehnt die seitliche Körperfaszie und die Interkostalmuskeln.","en":"Stretches the lateral body fascia and intercostal muscles.","es":"Estira la fascia lateral del cuerpo y los músculos intercostales."}',
    '{"de":"Stehe aufrecht mit schulterbreitem Stand\nHebe den rechten Arm über den Kopf\nNeige dich langsam nach links\nHalte 20 Sekunden\nKomme zurück\nWechsle die Seite","en":"Stand upright feet shoulder-width\nRaise right arm overhead\nSlowly lean to the left\nHold 20 seconds\nReturn\nSwitch sides","es":"Párate erguido con pies al ancho de hombros\nLevanta el brazo derecho sobre la cabeza\nInclínate lentamente hacia la izquierda\nMantén 20 segundos\nRegresa\nCambia de lado"}',
    'full_body', 'beginner', 20
  ) RETURNING id INTO ex50;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Weltbeste Dehnung","en":"World''s Greatest Stretch","es":"El mejor estiramiento del mundo"}',
    '{"de":"Kombiniert Hüftbeuger, Brustwirbel-Rotation und Hamstring-Dehnung.","en":"Combines hip flexor, thoracic rotation, and hamstring stretch.","es":"Combina flexor de cadera, rotación torácica y estiramiento de isquiotibiales."}',
    '{"de":"Mache einen großen Schritt nach vorne (linkes Bein vorne)\nBringe die linke Hand zum Boden\nDrehe den rechten Arm nach oben\nHalte 3 Sekunden\nKomme zurück und wechsle die Seite\nWiederhole 5 Mal pro Seite","en":"Take a large step forward left leg\nBring left hand to floor\nRotate right arm upward\nHold 3 seconds\nReturn and switch sides\nRepeat 5 times each side","es":"Da un gran paso hacia adelante pierna izquierda\nLleva la mano izquierda al suelo\nGira el brazo derecho hacia arriba\nMantén 3 segundos\nRegresa y cambia de lado\nRepite 5 veces por lado"}',
    'full_body', 'intermediate', 45
  ) RETURNING id INTO ex51;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Raupendehnung","en":"Inchworm Stretch","es":"Estiramiento oruga"}',
    '{"de":"Dynamische Ganzkörperdehnung, die Hamstrings, Schultern und Core aktiviert.","en":"Dynamic full-body stretch that activates hamstrings, shoulders, and core.","es":"Estiramiento dinámico de cuerpo completo que activa isquiotibiales, hombros y core."}',
    '{"de":"Stehe aufrecht\nBeuge dich nach vorne und lege die Hände auf den Boden\nLaufe mit den Händen nach vorne bis zur Plank-Position\nHalte 2 Sekunden\nLaufe mit den Händen zurück\nRolle auf\nWiederhole 5-8 Mal","en":"Stand upright\nFold forward and place hands on floor\nWalk hands forward to plank position\nHold 2 seconds\nWalk hands back\nRoll up\nRepeat 5-8 times","es":"Párate erguido\nDóblate hacia adelante y coloca las manos en el suelo\nCamina con las manos hacia adelante hasta posición de plancha\nMantén 2 segundos\nCamina las manos de regreso\nSube\nRepite 5-8 veces"}',
    'full_body', 'intermediate', 45
  ) RETURNING id INTO ex52;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Sonnengruß","en":"Sun Salutation","es":"Saludo al sol"}',
    '{"de":"Die klassische Yoga-Sequenz, die den gesamten Körper mobilisiert und wärmt.","en":"The classic yoga sequence that mobilizes and warms the entire body.","es":"La secuencia clásica de yoga que moviliza y calienta todo el cuerpo."}',
    '{"de":"Stehe aufrecht, Hände zusammen\nHebe die Arme und beuge nach hinten\nBeuge nach vorne mit geraden Beinen\nGehe in Ausfallschritt links\nDrücke in den Herabschauenden Hund\nKomme in die Kobra\nGehe zurück durch Downward Dog\nWiederhole auf der rechten Seite","en":"Stand tall hands together\nLift arms and arch back\nFold forward straight legs\nStep into left lunge\nPress into Downward Dog\nCome into Cobra\nMove back through Downward Dog\nRepeat right side","es":"Párate con manos juntas\nLevanta los brazos y arquea hacia atrás\nDóblate hacia adelante con piernas rectas\nDa un paso a estocada izquierda\nPresiona hacia Perro mirando abajo\nPasa a Cobra\nRegresa por Perro mirando abajo\nRepite lado derecho"}',
    'full_body', 'beginner', 60
  ) RETURNING id INTO ex53;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Bärenhug-Dehnung","en":"Bear Hug Stretch","es":"Estiramiento abrazo de oso"}',
    '{"de":"Dehnt die Schultern und den oberen Rücken durch Selbstumarmung.","en":"Stretches shoulders and upper back through self-hugging.","es":"Estira hombros y espalda alta con un abrazo a uno mismo."}',
    '{"de":"Stehe aufrecht\nUmarme dich selbst so fest wie möglich\nGriffe über die Schulterblätter\nHalte 20 Sekunden\nLöse langsam\nWiederhole 3 Mal","en":"Stand upright\nHug yourself as tightly as possible\nGrab across shoulder blades\nHold 20 seconds\nRelease slowly\nRepeat 3 times","es":"Párate erguido\nAbrázate tan fuerte como puedas\nAgarra a través de las escápulas\nMantén 20 segundos\nSuelta lentamente\nRepite 3 veces"}',
    'full_body', 'beginner', 20
  ) RETURNING id INTO ex54;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Liegende Wirbelsäulendrehung","en":"Lying Spinal Twist","es":"Torsión espinal tumbada"}',
    '{"de":"Entspannt und mobilisiert die gesamte Wirbelsäule durch eine liegende Drehung.","en":"Relaxes and mobilizes the entire spine through a lying twist.","es":"Relaja y moviliza toda la columna con una torsión tumbada."}',
    '{"de":"Lege dich auf den Rücken\nZiehe das rechte Knie zur Brust\nFühre es über den Körper nach links\nStrecke den rechten Arm seitlich aus\nSchaue nach rechts\nHalte und wechsle die Seite","en":"Lie on your back\nDraw right knee to chest\nGuide it across body to left\nExtend right arm to side\nLook to the right\nHold and switch sides","es":"Acuéstate boca arriba\nLleva la rodilla derecha al pecho\nLlévala a través del cuerpo hacia la izquierda\nExtiende el brazo derecho al lado\nMira hacia la derecha\nMantén y cambia de lado"}',
    'full_body', 'beginner', 30
  ) RETURNING id INTO ex55;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Fröhliche Baby-Pose","en":"Happy Baby Pose","es":"Postura bebé feliz"}',
    '{"de":"Entspannende Hüftöffnung, die sanft die innere Leiste und den Rücken entlastet.","en":"Relaxing hip opener that gently relieves the inner groin and back.","es":"Apertura de cadera relajante que alivia suavemente la ingle interna y la espalda."}',
    '{"de":"Lege dich auf den Rücken\nZiehe beide Knie zur Brust\nGreife die Außenseiten der Füße\nÖffne die Knie Richtung Achseln\nZiehe die Fersen nach oben\nAtme tief und entspanne","en":"Lie on your back\nDraw both knees to chest\nGrab outer edges of feet\nOpen knees toward armpits\nPull heels upward\nBreathe deeply and relax","es":"Acuéstate boca arriba\nLleva ambas rodillas al pecho\nAgarra los bordes externos de los pies\nAbre las rodillas hacia las axilas\nJala los talones hacia arriba\nRespira profundo y relájate"}',
    'full_body', 'beginner', 30
  ) RETURNING id INTO ex56;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Beine an der Wand","en":"Legs Up the Wall","es":"Piernas en la pared"}',
    '{"de":"Restorative Umkehrposition, die Beine und Rücken passiv regeneriert.","en":"Restorative inversion that passively regenerates legs and back.","es":"Inversión restaurativa que regenera pasivamente piernas y espalda."}',
    '{"de":"Setze dich nahe an eine Wand\nLege dich auf den Rücken\nHebe die Beine an die Wand\nLasse die Arme entspannt zur Seite\nAtme tief und entspanne\nVerbleibe 1-2 Minuten","en":"Sit close to a wall\nLie on your back\nLift legs up the wall\nLet arms relax to sides\nBreathe deeply and relax\nStay 1-2 minutes","es":"Siéntate cerca de una pared\nAcuéstate boca arriba\nLevanta las piernas contra la pared\nDeja que los brazos se relajen a los lados\nRespira profundo y relájate\nPermanece 1-2 minutos"}',
    'full_body', 'beginner', 120
  ) RETURNING id INTO ex57;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Liegende gebundene Winkelpose","en":"Reclined Bound Angle","es":"Ángulo atado reclinado"}',
    '{"de":"Öffnet sanft die Leiste und Hüften in einer passiven Rückenlage.","en":"Gently opens the groin and hips in a passive supine position.","es":"Abre suavemente la ingle y las caderas en posición supina pasiva."}',
    '{"de":"Lege dich auf den Rücken\nFühre die Fußsohlen zusammen\nLasse die Knie seitlich sinken\nLege die Hände auf den Bauch\nSchließe die Augen\nHalte entspannt 1 Minute","en":"Lie on your back\nBring soles of feet together\nAllow knees to fall outward\nPlace hands on belly\nClose eyes\nRelax and hold 1 minute","es":"Acuéstate boca arriba\nJunta las plantas de los pies\nDeja caer las rodillas hacia afuera\nColoca las manos en el abdomen\nCierra los ojos\nRelájate y mantén 1 minuto"}',
    'full_body', 'beginner', 60
  ) RETURNING id INTO ex58;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Vorwärtsbeuge mit Armschwung","en":"Forward Fold with Arm Swing","es":"Flexión hacia adelante con balanceo de brazos"}',
    '{"de":"Dynamische Variante der Vorwärtsbeuge mit aktivem Armschwung zur Körperweckung.","en":"Dynamic forward fold variant with active arm swing to awaken the body.","es":"Variante dinámica de la flexión con balanceo activo de brazos para despertar el cuerpo."}',
    '{"de":"Stehe aufrecht mit leicht gebogenen Knien\nBeuge dich nach vorne\nSchwinge die Arme locker hin und her\nHalte 30 Sekunden\nRolle langsam auf\nWiederhole 3 Mal","en":"Stand upright with slightly bent knees\nFold forward\nSwing arms loosely side to side\nHold 30 seconds\nSlowly roll up\nRepeat 3 times","es":"Párate erguido con rodillas ligeramente dobladas\nDóblate hacia adelante\nBalancea los brazos sueltos de lado a lado\nMantén 30 segundos\nSube lentamente\nRepite 3 veces"}',
    'full_body', 'beginner', 30
  ) RETURNING id INTO ex59;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Dynamische Armkreise","en":"Dynamic Arm Circles","es":"Círculos de brazos dinámicos"}',
    '{"de":"Wärmt Schultergelenke auf und verbessert die Beweglichkeit der Schultern.","en":"Warms up shoulder joints and improves shoulder mobility.","es":"Calienta las articulaciones del hombro y mejora su movilidad."}',
    '{"de":"Stehe aufrecht\nStrecke die Arme seitlich aus\nMache kleine Kreise vorwärts\nVergrößere die Kreise langsam\n10 Kreise vorwärts, 10 rückwärts\nHalte Arme entspannt","en":"Stand upright\nExtend arms to the sides\nMake small circles forward\nSlowly enlarge circles\n10 circles forward 10 backward\nKeep arms relaxed","es":"Párate erguido\nExtiende los brazos a los lados\nHaz círculos pequeños hacia adelante\nAgranda los círculos lentamente\n10 círculos adelante 10 atrás\nMantén los brazos relajados"}',
    'full_body', 'beginner', 20
  ) RETURNING id INTO ex60;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Hüftbeuger mit Brustwirbeldrehung","en":"Hip Flexor Thoracic Rotation","es":"Flexor de cadera con rotación torácica"}',
    '{"de":"Kombinierte Dehnung für Hüftbeuger und Brustwirbelsäule in einem Ausfallschritt.","en":"Combined hip flexor and thoracic spine stretch in a lunge.","es":"Estiramiento combinado de flexores de cadera y columna torácica en estocada."}',
    '{"de":"Gehe in einen tiefen Ausfallschritt (linkes Bein vorne)\nLege die linke Hand auf den Boden\nDrehe den rechten Arm zur Decke\nHalte 3 Atemzüge\nKomme zurück\nWechsle die Seite","en":"Step into a deep lunge left leg forward\nPlace left hand on floor\nRotate right arm toward ceiling\nHold for 3 breaths\nReturn\nSwitch sides","es":"Da una estocada profunda pierna izquierda adelante\nColoca la mano izquierda en el suelo\nGira el brazo derecho hacia el techo\nMantén 3 respiraciones\nRegresa\nCambia de lado"}',
    'full_body', 'intermediate', 45
  ) RETURNING id INTO ex61;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Brustwirbel-Rotation","en":"T-Spine Rotation","es":"Rotación de columna torácica"}',
    '{"de":"Mobilisiert gezielt die Brustwirbelsäule durch kontrollierte Rotation.","en":"Specifically mobilizes the thoracic spine through controlled rotation.","es":"Moviliza específicamente la columna torácica con rotación controlada."}',
    '{"de":"Setze dich aufrecht auf den Boden, Knie gebeugt\nLege die Hände hinter dem Kopf\nDrehe den Oberkörper langsam nach rechts\nHalte 3 Sekunden\nKomme zurück und drehe nach links\nWiederhole 8 Mal pro Seite","en":"Sit upright on floor knees bent\nPlace hands behind head\nSlowly rotate torso to right\nHold 3 seconds\nReturn and rotate to left\nRepeat 8 times each side","es":"Siéntate erguido en el suelo con rodillas dobladas\nPon las manos detrás de la cabeza\nGira lentamente el torso hacia la derecha\nMantén 3 segundos\nRegresa y gira a la izquierda\nRepite 8 veces por lado"}',
    'full_body', 'intermediate', 30
  ) RETURNING id INTO ex62;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Umgekehrte Gebetsdehnung","en":"Reverse Prayer Stretch","es":"Estiramiento oración inversa"}',
    '{"de":"Dehnt Handgelenke, Unterarme und Schultern durch die umgekehrte Gebetsposition.","en":"Stretches wrists, forearms, and shoulders in reverse prayer position.","es":"Estira muñecas, antebrazos y hombros en posición de oración inversa."}',
    '{"de":"Stehe aufrecht\nFühre die Hände hinter dem Rücken zusammen\nRichte die Fingerspitzen nach oben\nDrücke die Handflächen zusammen\nHalte die Schultern entspannt\nHalte 30 Sekunden","en":"Stand upright\nBring hands together behind back\nPoint fingertips upward\nPress palms together\nKeep shoulders relaxed\nHold 30 seconds","es":"Párate erguido\nJunta las manos detrás de la espalda\nApunta los dedos hacia arriba\nPresiona las palmas juntas\nMantén los hombros relajados\nMantén 30 segundos"}',
    'full_body', 'intermediate', 30
  ) RETURNING id INTO ex63;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Sumo-Kniebeugehalte","en":"Sumo Squat Hold","es":"Mantener sentadilla sumo"}',
    '{"de":"Öffnet die Hüften und dehnt Adduktoren in einer tiefen Sumo-Kniebeugeposition.","en":"Opens the hips and stretches adductors in a deep sumo squat position.","es":"Abre las caderas y estira aductores en posición profunda de sentadilla sumo."}',
    '{"de":"Stehe breitbeinig, Zehen nach außen gedreht\nGehe in eine tiefe Kniebeuge\nDrücke die Ellbogen gegen die Innenseiten der Knie\nHalte den Rücken gerade\nHalte die Position\nAtme tief und entspanne","en":"Stand wide feet toes turned out\nLower into a deep squat\nPress elbows against inner knees\nKeep back straight\nHold position\nBreathe deeply and relax","es":"Párate con pies amplios y dedos hacia afuera\nBaja a una sentadilla profunda\nPresiona los codos contra la parte interna de las rodillas\nMantén la espalda recta\nMantén la posición\nRespira profundo y relájate"}',
    'full_body', 'beginner', 30
  ) RETURNING id INTO ex64;

  INSERT INTO public.stretching_exercises (name, description, instructions, muscle_group, difficulty, duration_sec)
  VALUES (
    '{"de":"Malasana (Tiefer Hocksitz)","en":"Malasana (Low Squat)","es":"Malasana (Sentadilla baja)"}',
    '{"de":"Yoga-Hockposition, die Hüften, Leiste und Knöchel intensiv dehnt.","en":"Yoga squat position that intensively stretches hips, groin, and ankles.","es":"Posición de cuclillas de yoga que estira intensamente caderas, ingle y tobillos."}',
    '{"de":"Stehe mit schulterbreitem Stand, Zehen nach außen\nGehe in eine tiefe Hocke\nFühre die Hände im Gebet zusammen\nDrücke die Ellbogen gegen die Knie\nHalte den Rücken lang\nVerbleibe 45 Sekunden","en":"Stand shoulder-width apart toes out\nLower into a deep squat\nBring hands together in prayer\nPress elbows against knees\nKeep back long\nStay 45 seconds","es":"Párate al ancho de hombros con dedos hacia afuera\nBaja a una sentadilla profunda\nJunta las manos en oración\nPresiona los codos contra las rodillas\nMantén la espalda larga\nPermanece 45 segundos"}',
    'full_body', 'intermediate', 45
  ) RETURNING id INTO ex65;

  -- ── ROUTINES ──────────────────────────────────────────────────────────

  -- 1. Morning Mobility
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Morgen-Mobilität","en":"Morning Mobility","es":"Movilidad matutina"}',
    '{"de":"Wecke deinen Körper sanft auf und bereite ihn auf den Tag vor.","en":"Gently wake your body up and prepare it for the day ahead.","es":"Despierta tu cuerpo suavemente y prepáralo para el día."}',
    'morning', 'beginner', 10,
    ARRAY[ex08, ex16, ex09, ex46, ex22, ex50, ex31, ex60]
  );

  -- 2. Post-Workout Recovery
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Post-Workout Erholung","en":"Post-Workout Recovery","es":"Recuperación post-entrenamiento"}',
    '{"de":"Beschleunige die Erholung und reduziere Muskelkater nach dem Training.","en":"Speed up recovery and reduce muscle soreness after training.","es":"Acelera la recuperación y reduce el dolor muscular después del entrenamiento."}',
    'post_workout', 'beginner', 15,
    ARRAY[ex01, ex10, ex28, ex19, ex29, ex13, ex11, ex03, ex40, ex45]
  );

  -- 3. Office Stretch
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Bürodehnung","en":"Office Stretch","es":"Estiramiento de oficina"}',
    '{"de":"Löse Verspannungen nach langem Sitzen – funktioniert am Schreibtisch.","en":"Release tension after long sitting – works at your desk.","es":"Libera tensiones después de estar sentado mucho tiempo – funciona en tu escritorio."}',
    'office', 'beginner', 10,
    ARRAY[ex47, ex45, ex23, ex11, ex37, ex50, ex27, ex22]
  );

  -- 4. Evening Wind-Down
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Abend-Entspannung","en":"Evening Wind-Down","es":"Relajación vespertina"}',
    '{"de":"Entspanne Körper und Geist nach einem langen Tag für besseren Schlaf.","en":"Relax body and mind after a long day for better sleep.","es":"Relaja cuerpo y mente después de un largo día para dormir mejor."}',
    'evening', 'beginner', 20,
    ARRAY[ex10, ex56, ex55, ex57, ex58, ex04, ex13, ex03, ex28, ex09]
  );

  -- 5. Hip Opener Deep
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Tiefe Hüftöffnung","en":"Hip Opener Deep","es":"Apertura profunda de cadera"}',
    '{"de":"Intensive Hüftarbeit für mehr Beweglichkeit und weniger Schmerzen.","en":"Intensive hip work for greater mobility and less pain.","es":"Trabajo intensivo de cadera para mayor movilidad y menos dolor."}',
    'lower_body', 'intermediate', 25,
    ARRAY[ex02, ex07, ex32, ex05, ex61, ex03, ex04, ex06, ex64, ex65, ex11, ex51]
  );

  -- 6. Thoracic Mobility
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Brustwirbel-Mobilität","en":"Thoracic Mobility","es":"Movilidad torácica"}',
    '{"de":"Verbessere die Brustwirbelbeweglichkeit für Haltung und Leistung.","en":"Improve thoracic mobility for posture and performance.","es":"Mejora la movilidad torácica para postura y rendimiento."}',
    'upper_body', 'intermediate', 15,
    ARRAY[ex14, ex62, ex18, ex09, ex11, ex20, ex23, ex26]
  );

  -- 7. Full Body Flexibility
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Ganzkörper-Flexibilität","en":"Full Body Flexibility","es":"Flexibilidad de cuerpo completo"}',
    '{"de":"Eine umfassende Dehnroutine für alle Muskelgruppen.","en":"A comprehensive stretching routine for all muscle groups.","es":"Una rutina integral de estiramiento para todos los grupos musculares."}',
    'full_body', 'intermediate', 30,
    ARRAY[ex51, ex30, ex02, ex28, ex11, ex14, ex19, ex01, ex33, ex12, ex56, ex55]
  );

  -- 8. Lower Body Focus
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Unterkörper-Fokus","en":"Lower Body Focus","es":"Enfoque en el tren inferior"}',
    '{"de":"Gezielte Dehnung für Hüfte, Oberschenkel und Waden.","en":"Targeted stretching for hips, thighs, and calves.","es":"Estiramiento específico para caderas, muslos y pantorrillas."}',
    'lower_body', 'intermediate', 20,
    ARRAY[ex28, ex32, ex34, ex02, ex40, ex03, ex07, ex04, ex29, ex42]
  );

  -- 9. Upper Body Release
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Oberkörper-Entspannung","en":"Upper Body Release","es":"Liberación del tren superior"}',
    '{"de":"Löst Verspannungen in Schultern, Nacken und oberem Rücken.","en":"Releases tension in shoulders, neck, and upper back.","es":"Libera tensiones en hombros, cuello y espalda alta."}',
    'upper_body', 'beginner', 15,
    ARRAY[ex45, ex19, ex21, ex35, ex22, ex26, ex11, ex49]
  );

  -- 10. Athletic Recovery
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Athleten-Erholung","en":"Athletic Recovery","es":"Recuperación atlética"}',
    '{"de":"Intensive Erholungsroutine für Hochleistungssportler.","en":"Intensive recovery routine for high-performance athletes.","es":"Rutina intensiva de recuperación para atletas de alto rendimiento."}',
    'recovery', 'advanced', 25,
    ARRAY[ex51, ex61, ex02, ex32, ex30, ex62, ex14, ex03, ex29, ex28, ex55, ex57]
  );

  -- 11. Spine Health Daily
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Wirbelsäulengesundheit täglich","en":"Spine Health Daily","es":"Salud espinal diaria"}',
    '{"de":"Tägliche Pflege der Wirbelsäule für langfristige Rückengesundheit.","en":"Daily spine care for long-term back health.","es":"Cuidado diario de la columna para una salud de espalda a largo plazo."}',
    'morning', 'beginner', 15,
    ARRAY[ex09, ex10, ex12, ex13, ex11, ex17, ex18, ex16]
  );

  -- 12. Shoulder & Neck Relief
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Schulter & Nacken Entlastung","en":"Shoulder & Neck Relief","es":"Alivio de hombros y cuello"}',
    '{"de":"Schnelle Entlastung bei Schulter- und Nackenverspannungen.","en":"Quick relief for shoulder and neck tension.","es":"Alivio rápido para tensiones de hombros y cuello."}',
    'office', 'beginner', 10,
    ARRAY[ex45, ex46, ex49, ex47, ex19, ex22, ex23, ex24]
  );

  -- 13. Hamstring Deep Stretch
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Tiefe Oberschenkel-Dehnung","en":"Hamstring Deep Stretch","es":"Estiramiento profundo de isquiotibiales"}',
    '{"de":"Intensive Dehnung der hinteren Oberschenkel für mehr Beweglichkeit.","en":"Intensive hamstring stretching for increased mobility.","es":"Estiramiento intensivo de isquiotibiales para mayor movilidad."}',
    'lower_body', 'intermediate', 20,
    ARRAY[ex27, ex28, ex29, ex33, ex32, ex34, ex30, ex59, ex31]
  );

  -- 14. Yoga Fundamentals
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Yoga Grundlagen","en":"Yoga Fundamentals","es":"Fundamentos de yoga"}',
    '{"de":"Entdecke die grundlegenden Yoga-Positionen für Körper und Geist.","en":"Discover the fundamental yoga positions for body and mind.","es":"Descubre las posiciones fundamentales de yoga para cuerpo y mente."}',
    'full_body', 'beginner', 30,
    ARRAY[ex53, ex30, ex10, ex12, ex02, ex28, ex11, ex56, ex55, ex31, ex65, ex57]
  );

  -- 15. Power Athlete Mobility
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Power-Athlet Mobilität","en":"Power Athlete Mobility","es":"Movilidad para atletas de potencia"}',
    '{"de":"Maximale Mobilitätsroutine für Kraft- und Schnellkraftathleten.","en":"Maximum mobility routine for strength and power athletes.","es":"Rutina de movilidad máxima para atletas de fuerza y potencia."}',
    'full_body', 'advanced', 30,
    ARRAY[ex52, ex51, ex61, ex62, ex02, ex07, ex32, ex30, ex14, ex25, ex03, ex16, ex59, ex65]
  );

  -- 16. Pre-Run Warmup
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Lauf-Aufwärmen","en":"Pre-Run Warmup","es":"Calentamiento pre-carrera"}',
    '{"de":"Bereite Hüfte, Beine und Waden dynamisch auf den Lauf vor.","en":"Dynamically prepare hips, legs, and calves for running.","es":"Prepara dinámicamente caderas, piernas y pantorrillas para correr."}',
    'morning', 'beginner', 10,
    ARRAY[ex08, ex01, ex27, ex40, ex31, ex60, ex52, ex44]
  );

  -- 17. Post-Run Recovery
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Lauf-Erholung","en":"Post-Run Recovery","es":"Recuperación post-carrera"}',
    '{"de":"Optimale Dehnung nach dem Laufen für schnelle Muskelregeneration.","en":"Optimal stretching after running for fast muscle regeneration.","es":"Estiramiento óptimo después de correr para rápida regeneración muscular."}',
    'post_workout', 'intermediate', 15,
    ARRAY[ex27, ex28, ex02, ex01, ex40, ex42, ex29, ex03]
  );

  -- 18. Desk Worker Special
  INSERT INTO public.stretching_routines (name, description, goal, difficulty, duration_min, exercise_ids)
  VALUES (
    '{"de":"Büroarbeiter-Spezial","en":"Desk Worker Special","es":"Especial para trabajadores de escritorio"}',
    '{"de":"Die perfekte Routine für alle, die täglich lange am Schreibtisch sitzen.","en":"The perfect routine for everyone who sits at a desk all day.","es":"La rutina perfecta para quienes se sientan en un escritorio todo el día."}',
    'office', 'beginner', 12,
    ARRAY[ex47, ex45, ex49, ex23, ex37, ex11, ex01, ex06, ex50, ex35]
  );

END $$;
