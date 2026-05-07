DO $$
BEGIN
  IF (SELECT COUNT(*) FROM public.meditations) = 0 THEN

    INSERT INTO public.meditations
      (name, description, instructions, category, duration_min, difficulty, background_sound)
    VALUES

      -- ── MINDFULNESS ────────────────────────────────────────────────────────
      (
        '{"de":"Achtsamer Atemraum","en":"Mindful Breathing Space","es":"Espacio de respiración consciente"}',
        '{"de":"Eine kurze Anker-Meditation, die dich im gegenwärtigen Moment verankert.","en":"A short anchor meditation to ground you in the present moment.","es":"Una meditación corta de anclaje para centrarte en el momento presente."}',
        '{"de":"Setze oder lege dich bequem hin\nSchließe sanft die Augen\nRichte die Aufmerksamkeit auf deinen Atem\nBeobachte das Ein- und Ausströmen ohne zu urteilen\nWenn Gedanken auftauchen, kehre sanft zum Atem zurück\nVerweile in dieser stillen Präsenz","en":"Sit or lie down comfortably\nGently close your eyes\nBring attention to your breath\nObserve the flow of breath without judgment\nWhen thoughts arise, gently return to the breath\nRest in this quiet presence","es":"Siéntate o acuéstate cómodamente\nCierra suavemente los ojos\nDirige la atención a tu respiración\nObserva el flujo sin juzgar\nCuando surjan pensamientos, vuelve suavemente a la respiración\nDescansa en esta presencia silenciosa"}',
        'mindfulness', 5, 'beginner', 'silence'
      ),
      (
        '{"de":"Gegenwärtiger Moment","en":"Present Moment","es":"Momento presente"}',
        '{"de":"Vertiefe deine Achtsamkeit und lerne, jeden Augenblick vollständig zu erleben.","en":"Deepen your mindfulness and learn to fully experience each moment.","es":"Profundiza tu atención plena y aprende a vivir cada momento plenamente."}',
        '{"de":"Nimm eine aufrechte, entspannte Sitzhaltung ein\nSpüre den Kontakt deines Körpers mit dem Untergrund\nAtme dreimal tief ein und aus\nRichte deine Aufmerksamkeit auf Geräusche in deiner Umgebung\nNimm dann Körperempfindungen wahr, ohne sie zu verändern\nZuletzt kehre zum natürlichen Atemfluss zurück\nBleibe offen für alles, was entsteht","en":"Take an upright, relaxed seated position\nFeel the contact of your body with the surface\nTake three deep breaths\nTurn attention to sounds around you\nNotice body sensations without changing them\nFinally return to the natural flow of breath\nStay open to whatever arises","es":"Adopta una postura sentada erguida y relajada\nSiente el contacto de tu cuerpo con la superficie\nRespira profundamente tres veces\nDirige la atención a los sonidos de tu entorno\nObserva las sensaciones corporales sin modificarlas\nVuelve finalmente al flujo natural de la respiración\nMantente abierto a lo que surja"}',
        'mindfulness', 10, 'beginner', 'bowl'
      ),
      (
        '{"de":"Gedanken beobachten","en":"Observing Thoughts","es":"Observar pensamientos"}',
        '{"de":"Lerne, Gedanken als vorübergehende Ereignisse zu sehen, ohne dich in ihnen zu verlieren.","en":"Learn to see thoughts as passing events without getting lost in them.","es":"Aprende a ver los pensamientos como eventos pasajeros sin perderte en ellos."}',
        '{"de":"Sitze ruhig und richte die Aufmerksamkeit auf den Atem\nStelle dir deinen Geist wie einen klaren Himmel vor\nGedanken sind wie Wolken, die hindurchziehen\nWenn ein Gedanke auftaucht, benenne ihn still: \"Planen\", \"Erinnern\", \"Urteilen\"\nLasse ihn dann weiterziehen und kehre zum Atem zurück\nBeobachte das Kommen und Gehen der Gedanken mit Neugier und Wohlwollen","en":"Sit quietly and direct attention to the breath\nImagine your mind as a clear sky\nThoughts are like clouds passing through\nWhen a thought arises, silently label it: ''planning'', ''remembering'', ''judging''\nLet it pass and return to the breath\nObserve the coming and going of thoughts with curiosity and kindness","es":"Siéntate tranquilamente y dirige la atención a la respiración\nImagina tu mente como un cielo despejado\nLos pensamientos son como nubes que pasan\nCuando surja un pensamiento, etiquétalo en silencio: ''planear'', ''recordar'', ''juzgar''\nDéjalo pasar y vuelve a la respiración\nObserva el ir y venir de los pensamientos con curiosidad y amabilidad"}',
        'mindfulness', 15, 'intermediate', 'rain'
      ),
      (
        '{"de":"Tiefe Achtsamkeit","en":"Deep Mindfulness","es":"Conciencia plena profunda"}',
        '{"de":"Eine ausgedehnte Praxis, die Konzentration und offenes Gewahrsein vereint.","en":"An extended practice combining focused concentration and open awareness.","es":"Una práctica extendida que combina concentración enfocada y conciencia abierta."}',
        '{"de":"Beginne mit zehn tiefen, bewussten Atemzügen\nFokussiere die Aufmerksamkeit auf die Nasenspitze\nHalte die Konzentration bei jeder Ein- und Ausatmung\nErweitere nach fünf Minuten das Gewahrsein auf den ganzen Körper\nNimm Empfindungen, Emotionen und Gedanken gleichermaßen wahr\nBeobachte, wie alles entsteht und vergeht\nKehre zu Konzentration zurück, wenn die Aufmerksamkeit abschweift\nBeende die Sitzung mit einem Moment der Dankbarkeit","en":"Begin with ten deep, conscious breaths\nFocus attention on the tip of the nose\nMaintain concentration with each breath\nAfter five minutes expand awareness to the whole body\nNotice sensations, emotions, and thoughts equally\nObserve how everything arises and passes away\nReturn to focus whenever attention drifts\nClose the session with a moment of gratitude","es":"Comienza con diez respiraciones profundas y conscientes\nEnfoca la atención en la punta de la nariz\nMantén la concentración con cada respiración\nDespués de cinco minutos expande la conciencia a todo el cuerpo\nObserva sensaciones, emociones y pensamientos por igual\nNota cómo todo surge y pasa\nVuelve al enfoque cuando la atención divague\nCierra la sesión con un momento de gratitud"}',
        'mindfulness', 20, 'intermediate', 'forest'
      ),
      (
        '{"de":"Offene Stille","en":"Open Awareness","es":"Conciencia abierta"}',
        '{"de":"Eine fortgeschrittene Praxis des reinen Gewahrseins ohne spezifischen Fokuspunkt.","en":"An advanced practice of pure awareness without a specific focus point.","es":"Una práctica avanzada de conciencia pura sin punto de enfoque específico."}',
        '{"de":"Setze dich in einer stabilen, aufrechten Position\nLasse die Augen halb geöffnet, den Blick weich nach unten gerichtet\nLasse alle Anstrengung los – sei einfach da\nKein Objekt der Konzentration, kein Ziel\nGewahrsein ist das natürliche Offensein für alles, was erscheint\nSei präsent für Klang, Stille, Empfindung und Gedanken gleichermaßen\nWenn du merkst, dass du gesucht oder erwartet hast, ruhe dich aus\nVertraue dem natürlichen Zustand des Geistes","en":"Sit in a stable, upright position\nLeave eyes half open, gaze soft and downward\nRelease all effort – simply be present\nNo object of concentration, no goal\nAwareness is the natural openness to whatever appears\nBe present to sound, silence, sensation, and thought equally\nWhen you notice you have been seeking or expecting, rest\nTrust the natural state of the mind","es":"Siéntate en posición estable y erguida\nDeja los ojos semicerrados, mirada suave hacia abajo\nSuelta todo esfuerzo – simplemente sé\nSin objeto de concentración, sin meta\nLa conciencia es la apertura natural a lo que aparece\nSé presente para sonido, silencio, sensación y pensamiento por igual\nCuando notes que has estado buscando o esperando, descansa\nConfía en el estado natural de la mente"}',
        'mindfulness', 30, 'advanced', 'waves'
      ),

      -- ── BODY SCAN ──────────────────────────────────────────────────────────
      (
        '{"de":"Körper-Scan Basis","en":"Body Scan Basics","es":"Exploración corporal básica"}',
        '{"de":"Wandere mit deiner Aufmerksamkeit durch den Körper und löse Anspannungen.","en":"Travel with your attention through the body and release tension.","es":"Recorre tu cuerpo con atención y libera tensiones."}',
        '{"de":"Lege dich flach auf den Rücken, Arme locker neben dem Körper\nSchließe die Augen und atme dreimal tief durch\nBeginne bei den Zehen des linken Fußes\nWandere langsam nach oben: Fußsohle, Knöchel, Unterschenkel, Knie\nWechsle zum rechten Bein und wiederhole\nSetze fort über Becken, Bauch, Brust, Hände, Arme, Schultern\nNimm das Gesicht und den Kopf wahr\nVerweile am Ende im Ganzkörpergefühl","en":"Lie flat on your back, arms loosely beside the body\nClose eyes and take three deep breaths\nBegin at the toes of the left foot\nSlowly travel upward: sole, ankle, lower leg, knee\nSwitch to the right leg and repeat\nContinue through pelvis, abdomen, chest, hands, arms, shoulders\nNotice the face and head\nEnd by resting in the whole-body sensation","es":"Acuéstate boca arriba, brazos relajados junto al cuerpo\nCierra los ojos y respira profundamente tres veces\nComienza en los dedos del pie izquierdo\nViaja lentamente hacia arriba: planta, tobillo, pantorrilla, rodilla\nPasa al pie derecho y repite\nContinúa por pelvis, abdomen, pecho, manos, brazos, hombros\nObserva el rostro y la cabeza\nTermina descansando en la sensación del cuerpo completo"}',
        'body_scan', 10, 'beginner', 'silence'
      ),
      (
        '{"de":"Tiefer Körper-Scan","en":"Deep Body Scan","es":"Exploración corporal profunda"}',
        '{"de":"Vertiefe die Verbindung zu deinem Körper durch achtsame Aufmerksamkeit.","en":"Deepen the connection to your body through mindful attention.","es":"Profundiza la conexión con tu cuerpo a través de la atención plena."}',
        '{"de":"Beginne im Liegen und atme in den Bauch\nScanne zunächst die gesamte Körperoberfläche grob\nGehe dann systematisch von den Fußsohlen nach oben\nHalte bei jeder Region inne und beobachte: Wärme, Kälte, Kribbeln, Schwere\nAtme bewusst in angespannte Stellen hinein\nStelle dir vor, wie die Ausatmung Spannung abtransportiert\nWende dich besonders dem Rücken, Nacken und Kieferbereich zu\nLasse den gesamten Körper am Ende weich und schwer werden","en":"Begin lying down, breathe into the belly\nFirst scan the whole body surface roughly\nThen systematically move from the soles upward\nPause at each region and notice: warmth, coolness, tingling, heaviness\nBreathe consciously into tense areas\nImagine the exhale carrying away tension\nGive special attention to the back, neck, and jaw\nLet the whole body become soft and heavy at the end","es":"Comienza acostado, respira hacia el abdomen\nEscanea primero la superficie completa del cuerpo brevemente\nLuego muévete sistemáticamente desde las plantas hacia arriba\nDetente en cada región y observa: calor, frío, hormigueo, pesadez\nRespira conscientemente hacia las zonas tensas\nImagina que la exhalación lleva la tensión consigo\nPresta especial atención a la espalda, el cuello y la mandíbula\nDeja que todo el cuerpo se vuelva suave y pesado al final"}',
        'body_scan', 20, 'intermediate', 'rain'
      ),
      (
        '{"de":"Vollständiger Körper-Scan","en":"Complete Body Scan","es":"Exploración corporal completa"}',
        '{"de":"Eine umfassende Übung, die jeden Teil des Körpers mit Achtsamkeit durchdringt.","en":"A comprehensive practice that penetrates every part of the body with mindfulness.","es":"Una práctica integral que impregna cada parte del cuerpo con atención plena."}',
        '{"de":"Lege dich in Shavasana, Handflächen nach oben\nAtme fünf Minuten bewusst und lass den Körper schwer werden\nScanne jede Körperregion in folgendem Rhythmus: einatmen, wahrnehmen, ausatmen, loslassen\nBeginn: Zehen → Fußsohlen → Spann → Knöchel → Unterschenkel → Knie → Oberschenkel\nWeiter: Gesäß → Becken → Unterbauch → Oberbauch → Rippenraum → Brust\nArme: Finger → Handflächen → Handgelenk → Unterarm → Ellbogen → Oberarm → Schultern\nKopf: Hals → Nacken → Hinterkopf → Schädeldecke → Stirn → Augen → Wangen → Kiefer → Mund\nAbschluss: Nehme den Körper als Ganzes wahr, verweile fünf Minuten in stiller Präsenz","en":"Lie in Shavasana, palms facing up\nBreathe consciously for five minutes, let the body become heavy\nScan each region in this rhythm: inhale, notice, exhale, release\nStart: toes → soles → instep → ankles → lower legs → knees → thighs\nContinue: glutes → pelvis → lower belly → upper belly → ribcage → chest\nArms: fingers → palms → wrists → forearms → elbows → upper arms → shoulders\nHead: throat → neck → back of head → crown → forehead → eyes → cheeks → jaw → mouth\nClose: sense the body as a whole, rest five minutes in silent presence","es":"Acuéstate en Shavasana, palmas hacia arriba\nRespira conscientemente cinco minutos, deja que el cuerpo se vuelva pesado\nEscanea cada región en este ritmo: inhala, observa, exhala, suelta\nInicia: dedos → plantas → empeine → tobillos → pantorrillas → rodillas → muslos\nContinúa: glúteos → pelvis → bajo abdomen → abdomen → costillas → pecho\nBrazos: dedos → palmas → muñecas → antebrazos → codos → brazos → hombros\nCabeza: garganta → cuello → nuca → coronilla → frente → ojos → mejillas → mandíbula → boca\nCierre: siente el cuerpo como un todo, descansa cinco minutos en presencia silenciosa"}',
        'body_scan', 30, 'advanced', 'white_noise'
      ),

      -- ── SLEEP ──────────────────────────────────────────────────────────────
      (
        '{"de":"Einschlaf-Meditation","en":"Sleep Induction","es":"Inducción al sueño"}',
        '{"de":"Bereite Körper und Geist sanft auf den Schlaf vor.","en":"Gently prepare body and mind for sleep.","es":"Prepara suavemente el cuerpo y la mente para dormir."}',
        '{"de":"Lege dich bequem ins Bett, decke dich zu\nAtme viermal tief durch Nase ein und durch Mund aus\nSpüre, wie der Körper schwerer wird bei jeder Ausatmung\nStelle dir vor, dass du in weiche Wärme sinkst\nZähle beim Einatmen bis 4, beim Ausatmen bis 6\nWenn Gedanken kommen, sage innerlich: ''Nicht jetzt – es ist Zeit zu schlafen''\nLasse das Bewusstsein sanft werden wie das Licht einer Kerze, das erlischt","en":"Lie comfortably in bed, cover yourself\nTake four deep breaths in through the nose and out through the mouth\nFeel the body becoming heavier with each exhale\nImagine sinking into soft warmth\nCount to 4 on the inhale, to 6 on the exhale\nWhen thoughts come, say inwardly: ''Not now – it is time to sleep''\nLet awareness soften like the light of a candle going out","es":"Acuéstate cómodamente en la cama, abrígate\nRespira profundamente cuatro veces: inhala por la nariz, exhala por la boca\nSiente cómo el cuerpo se vuelve más pesado con cada exhalación\nImagina que te hundes en una calidez suave\nCuenta hasta 4 al inhalar, hasta 6 al exhalar\nCuando lleguen pensamientos, di internamente: ''Ahora no – es hora de dormir''\nDeja que la conciencia se suavice como la luz de una vela que se apaga"}',
        'sleep', 15, 'beginner', 'rain'
      ),
      (
        '{"de":"Tiefe Entspannung","en":"Deep Relaxation","es":"Relajación profunda"}',
        '{"de":"Löse Muskeln und Gedanken auf dem Weg in den Schlaf.","en":"Release muscles and thoughts on the way into sleep.","es":"Libera músculos y pensamientos camino al sueño."}',
        '{"de":"Lege dich auf den Rücken, Arme leicht vom Körper entfernt\nAtme tief durch und lasse die Schultern fallen\nSpanne jede Muskelgruppe kurz an und lasse dann los: Füße → Beine → Gesäß → Bauch → Hände → Arme → Gesicht\nStelle dir einen stillen, dunklen See bei Nacht vor\nMit jeder Ausatmung sinkst du ein wenig tiefer\nLasse alle Überlegungen für die Nacht ruhen\nDein Körper weiß, wie er sich erholt – vertraue ihm","en":"Lie on your back, arms slightly away from the body\nBreathe deeply and let the shoulders drop\nBriefly tense each muscle group then release: feet → legs → glutes → belly → hands → arms → face\nImagine a quiet, dark lake at night\nWith each exhale you sink a little deeper\nLet all thoughts rest for the night\nYour body knows how to recover – trust it","es":"Acuéstate boca arriba, brazos ligeramente separados del cuerpo\nRespira profundamente y deja caer los hombros\nTensa brevemente cada grupo muscular y luego suelta: pies → piernas → glúteos → abdomen → manos → brazos → rostro\nImagina un lago tranquilo y oscuro por la noche\nCon cada exhalación te hundes un poco más\nDeja que todos los pensamientos descansen por esta noche\nTu cuerpo sabe cómo recuperarse – confía en él"}',
        'sleep', 20, 'beginner', 'waves'
      ),
      (
        '{"de":"Traumreise","en":"Dream Journey","es":"Viaje onírico"}',
        '{"de":"Eine geführte Visualisierung, die dich sanft in den Traumzustand führt.","en":"A guided visualization that gently leads you into the dream state.","es":"Una visualización guiada que te lleva suavemente al estado de sueño."}',
        '{"de":"Lege dich hin und schließe die Augen\nAtme ruhig und gleichmäßig\nStelle dir eine weiche Nebelwolke vor, die deinen Körper einhüllt\nDu schwebst langsam in eine friedliche Landschaft – Wald, Strand oder Bergwiese\nNimm die Farben, Gerüche und Geräusche dieses Ortes wahr\nEin sanfter Wind trägt dich weiter und weiter\nDein Körper wird immer leichter, dein Geist immer ruhiger\nLasse die Bilder fließen, ohne sie festzuhalten\nGleit sanft in den Schlaf hinüber","en":"Lie down and close your eyes\nBreathe calmly and evenly\nImagine a soft cloud of mist enveloping your body\nYou float slowly into a peaceful landscape – forest, beach, or mountain meadow\nNotice the colors, scents, and sounds of this place\nA gentle wind carries you further and further\nYour body becomes lighter and lighter, your mind quieter and quieter\nLet the images flow without holding on to them\nSlide gently into sleep","es":"Acuéstate y cierra los ojos\nRespira con calma y uniformidad\nImagina una suave nube de niebla que envuelve tu cuerpo\nFlotarás lentamente hacia un paisaje tranquilo: bosque, playa o prado de montaña\nObserva los colores, aromas y sonidos de este lugar\nUna brisa suave te lleva cada vez más lejos\nTu cuerpo se vuelve más y más ligero, tu mente más y más tranquila\nDeja fluir las imágenes sin aferrarte a ellas\nDeslízate suavemente hacia el sueño"}',
        'sleep', 30, 'intermediate', 'white_noise'
      ),

      -- ── FOCUS ──────────────────────────────────────────────────────────────
      (
        '{"de":"Fokus-Impuls","en":"Focus Boost","es":"Impulso de enfoque"}',
        '{"de":"Eine kurze Meditation, um die Konzentration für die nächste Aufgabe zu schärfen.","en":"A short meditation to sharpen concentration for the next task.","es":"Una meditación corta para agudizar la concentración para la próxima tarea."}',
        '{"de":"Setze dich aufrecht hin, Füße flach auf dem Boden\nSchließe die Augen und atme dreimal tief durch\nStelle dir einen hellen Lichtpunkt in deiner Stirnmitte vor\nKonzentriere alle Aufmerksamkeit auf diesen Punkt\nBei ablenkenden Gedanken: kehre sofort zum Lichtpunkt zurück\nAuf Ausatmung: lass Müdigkeit und Unruhe los\nÖffne die Augen nach 5 Minuten – du bist bereit","en":"Sit upright, feet flat on the floor\nClose eyes and take three deep breaths\nImagine a bright point of light at the center of your forehead\nFocus all attention on this point\nFor distracting thoughts: immediately return to the point of light\nOn exhale: release fatigue and restlessness\nOpen eyes after 5 minutes – you are ready","es":"Siéntate erguido, pies planos en el suelo\nCierra los ojos y respira profundamente tres veces\nImagina un punto de luz brillante en el centro de tu frente\nConcentra toda la atención en este punto\nSi vienen pensamientos distractores: vuelve inmediatamente al punto de luz\nAl exhalar: suelta el cansancio y la inquietud\nAbre los ojos después de 5 minutos – estás listo"}',
        'focus', 5, 'beginner', 'silence'
      ),
      (
        '{"de":"Konzentrations-Meditation","en":"Concentration Meditation","es":"Meditación de concentración"}',
        '{"de":"Schule den Fokus durch einfache, tiefe Konzentrationspraxis.","en":"Train focus through simple, deep concentration practice.","es":"Entrena el enfoque a través de una práctica simple de concentración profunda."}',
        '{"de":"Wähle ein einfaches Objekt als Fokuspunkt: Atemgefühl, Kerzenflamme oder mentales Bild\nSitze stabil und richte die volle Aufmerksamkeit auf das Objekt\nHalte den Fokus so lange wie möglich\nJedes Mal wenn die Aufmerksamkeit abweicht: bemerke es, ohne dich zu kritisieren\nFühre die Aufmerksamkeit ruhig zurück – dies ist der Kern des Trainings\nDie Qualität des Fokus verbessert sich mit jeder Rückkehr\nBeende die Sitzung mit drei ruhigen Atemzügen","en":"Choose a simple object as focus point: breath sensation, candle flame, or mental image\nSit stable and direct full attention to the object\nHold focus for as long as possible\nEach time attention wanders: notice it without self-criticism\nCalmly bring attention back – this is the core of the training\nThe quality of focus improves with each return\nEnd the session with three calm breaths","es":"Elige un objeto simple como punto de enfoque: sensación de respiración, llama de vela o imagen mental\nSiéntate estable y dirige toda la atención al objeto\nMantén el enfoque el mayor tiempo posible\nCada vez que la atención divague: nótalo sin criticarte\nDevuelve calmadamente la atención – esto es el núcleo del entrenamiento\nLa calidad del enfoque mejora con cada retorno\nTermina la sesión con tres respiraciones tranquilas"}',
        'focus', 10, 'intermediate', 'bowl'
      ),

      -- ── STRESS RELIEF ──────────────────────────────────────────────────────
      (
        '{"de":"Schnelle Stressreduktion","en":"Quick Stress Relief","es":"Alivio rápido del estrés"}',
        '{"de":"Senke Stresshormone in wenigen Minuten durch gezielte Atemarbeit.","en":"Lower stress hormones in minutes through targeted breathwork.","es":"Reduce las hormonas del estrés en minutos a través de respiración dirigida."}',
        '{"de":"Setze dich hin oder lege dich, egal wo du bist\nLege eine Hand auf die Brust, eine auf den Bauch\nAtme 4 Sekunden tief in den Bauch ein\nHalte 2 Sekunden an\nAtme 6 Sekunden vollständig aus\nSpüre, wie die Hand auf dem Bauch sich senkt\nWiederhole 5 Mal\nÖffne die Augen: du bist ruhiger","en":"Sit or lie down, wherever you are\nPlace one hand on the chest, one on the belly\nBreathe in deeply into the belly for 4 seconds\nHold for 2 seconds\nExhale fully for 6 seconds\nFeel the hand on the belly lower\nRepeat 5 times\nOpen your eyes: you are calmer","es":"Siéntate o acuéstate, donde sea que estés\nColoca una mano en el pecho, una en el abdomen\nRespira profundamente hacia el abdomen durante 4 segundos\nMantén 2 segundos\nExhala completamente durante 6 segundos\nSiente cómo la mano en el abdomen baja\nRepite 5 veces\nAbre los ojos: estás más tranquilo"}',
        'stress_relief', 5, 'beginner', 'bowl'
      ),
      (
        '{"de":"Stressabbau","en":"Stress Release","es":"Liberación del estrés"}',
        '{"de":"Verarbeite aufgestauten Stress durch Körperwahrnehmung und Loslassen.","en":"Process accumulated stress through body awareness and letting go.","es":"Procesa el estrés acumulado a través de la conciencia corporal y el soltar."}',
        '{"de":"Lege dich hin oder sitze komfortabel\nAtme tief durch und lasse die Ausatmung lang und vollständig sein\nScanne deinen Körper: wo sitzt gerade Anspannung?\nAtme gezielt in diese Stellen ein\nStelle dir vor, wie du die Spannung als dunkle Wolke ausatmest\nWiederhole bei jeder angespannten Stelle\nBenenne dann innerlich, was dich stresst: ''Ich sehe dich, und ich lasse dich los''\nBeende mit drei Atemzügen Dankbarkeit","en":"Lie down or sit comfortably\nBreathe deeply and let the exhale be long and complete\nScan your body: where is tension right now?\nBreathe deliberately into those areas\nImagine exhaling the tension as a dark cloud\nRepeat for each tense area\nThen name what stresses you inwardly: ''I see you, and I let you go''\nEnd with three breaths of gratitude","es":"Acuéstate o siéntate cómodamente\nRespira profundamente y deja que la exhalación sea larga y completa\nEscanea tu cuerpo: ¿dónde hay tensión ahora mismo?\nRespira intencionalmente hacia esas zonas\nImagina que exhalas la tensión como una nube oscura\nRepite para cada zona tensa\nLuego nombra en silencio lo que te estresa: ''Te veo, y te dejo ir''\nTermina con tres respiraciones de gratitud"}',
        'stress_relief', 15, 'intermediate', 'rain'
      ),

      -- ── MORNING ────────────────────────────────────────────────────────────
      (
        '{"de":"Morgenerwachen","en":"Morning Awakening","es":"Despertar matutino"}',
        '{"de":"Starte den Tag mit Klarheit, Dankbarkeit und Energie.","en":"Start the day with clarity, gratitude, and energy.","es":"Comienza el día con claridad, gratitud y energía."}',
        '{"de":"Setze dich noch im Bett oder auf einem Stuhl aufrecht\nAtme dreimal tief durch, strecke dabei die Arme nach oben\nRichte deine Aufmerksamkeit auf drei Dinge, für die du dankbar bist\nStelle dir vor, wie Licht in deinen Körper strömt\nSetze eine einfache Absicht für den Tag: Was ist dir heute wichtig?\nAtme diese Absicht ein und los\nÖffne die Augen mit einem Lächeln","en":"Sit upright still in bed or on a chair\nBreathe deeply three times, stretching arms overhead\nDirect attention to three things you are grateful for\nImagine light flowing into your body\nSet a simple intention for the day: what matters to you today?\nBreathe in this intention and release it\nOpen eyes with a smile","es":"Siéntate erguido aún en la cama o en una silla\nRespira profundamente tres veces, estirando los brazos hacia arriba\nDirige la atención a tres cosas por las que estás agradecido\nImagina que la luz fluye hacia tu cuerpo\nEstablece una intención simple para el día: ¿qué es importante para ti hoy?\nRespira esa intención y suéltala\nAbre los ojos con una sonrisa"}',
        'morning', 5, 'beginner', 'forest'
      ),
      (
        '{"de":"Energie für den Tag","en":"Energy for the Day","es":"Energía para el día"}',
        '{"de":"Aktiviere Körper und Geist für einen fokussierten, energiereichen Tag.","en":"Activate body and mind for a focused, energetic day.","es":"Activa el cuerpo y la mente para un día enfocado y lleno de energía."}',
        '{"de":"Sitze aufrecht, Rücken gerade, Hände auf den Knien\nAtme fünfmal tief durch, jedes Mal etwas tiefer\nVisualisiere einen goldenen Energiefluss, der bei jedem Einatmen entsteht\nSende diese Energie mit dem Ausatmen in alle Körperteile\nDenke an eine Person, der du heute Gutes wünschen möchtest\nErinnere dich an eine Stärke, die du in dir trägst\nBenenne deine wichtigste Aufgabe für heute\nBeende mit drei energetischen Atemzügen","en":"Sit upright, back straight, hands on knees\nBreathe deeply five times, each breath a little deeper\nVisualize a golden energy flow arising with each inhale\nSend this energy with the exhale into all parts of the body\nThink of a person you want to wish well today\nRemember a strength that you carry within you\nName your most important task for today\nClose with three energizing breaths","es":"Siéntate erguido, espalda recta, manos en las rodillas\nRespira profundamente cinco veces, cada vez un poco más profundo\nVisualiza un flujo de energía dorada que surge con cada inhalación\nEnvía esta energía con la exhalación a todas las partes del cuerpo\nPiensa en una persona a la que quieras desearle el bien hoy\nRecuerda una fortaleza que llevas dentro de ti\nNombra tu tarea más importante para hoy\nTermina con tres respiraciones energizantes"}',
        'morning', 10, 'beginner', 'forest'
      ),

      -- ── VISUALIZATION ──────────────────────────────────────────────────────
      (
        '{"de":"Innerer sicherer Ort","en":"Inner Safe Place","es":"Lugar seguro interior"}',
        '{"de":"Erschaffe einen inneren Rückzugsort, zu dem du jederzeit zurückkehren kannst.","en":"Create an inner refuge you can return to at any time.","es":"Crea un refugio interior al que puedes volver en cualquier momento."}',
        '{"de":"Lege oder setze dich bequem\nSchließe die Augen und atme tief durch\nStelle dir einen Ort vor, an dem du dich vollständig sicher und geborgen fühlst\nEs kann real oder imaginär sein: Strand, Wald, Bergwiese, gemütlicher Raum\nNimm die Details wahr: Was siehst, hörst, riechst du dort?\nSpüre das Gefühl von Sicherheit und Geborgenheit in deinem Körper\nWeile an diesem Ort und lass dich von ihm nähren\nNimm das Gefühl dieses Ortes mit in deinen Alltag","en":"Lie or sit comfortably\nClose eyes and breathe deeply\nImagine a place where you feel completely safe and sheltered\nIt can be real or imaginary: beach, forest, mountain meadow, cozy room\nNotice the details: what do you see, hear, smell there?\nFeel the sense of safety and security in your body\nLinger in this place and let it nourish you\nCarry the feeling of this place into your everyday life","es":"Acuéstate o siéntate cómodamente\nCierra los ojos y respira profundamente\nImagina un lugar donde te sientas completamente seguro y protegido\nPuede ser real o imaginario: playa, bosque, prado, habitación acogedora\nObserva los detalles: ¿qué ves, escuchas, hueles allí?\nSiente la sensación de seguridad y cobijo en tu cuerpo\nPermanece en este lugar y deja que te nutra\nLleva contigo el sentimiento de este lugar a tu vida cotidiana"}',
        'visualization', 15, 'intermediate', 'forest'
      ),
      (
        '{"de":"Ziel-Visualisierung","en":"Goal Visualization","es":"Visualización de metas"}',
        '{"de":"Nutze die Kraft der mentalen Vorstellung, um deine Ziele greifbar zu machen.","en":"Use the power of mental imagery to make your goals tangible.","es":"Usa el poder de la imaginación mental para hacer tangibles tus metas."}',
        '{"de":"Setze dich aufrecht und schließe die Augen\nAtme tief durch und entspanne den Körper vollständig\nRufe dir dein wichtigstes Ziel ins Bewusstsein\nStelle dir vor, wie es aussieht, wenn du dieses Ziel erreicht hast – in allen Details\nWie fühlt sich das an? Was denkst du? Was sagen andere?\nBeobachte, wie du die Schritte gehst, die dich dorthin führen\nSpüre die Motivation und den Glauben an dich\nNimm dieses Gefühl mit in deinen Tag\nErinnere dich: du trägst das Ziel bereits in dir","en":"Sit upright and close your eyes\nBreathe deeply and relax the body completely\nBring your most important goal to mind\nImagine what it looks like when you have achieved this goal – in all detail\nHow does it feel? What do you think? What do others say?\nObserve yourself taking the steps that lead you there\nFeel the motivation and belief in yourself\nCarry this feeling into your day\nRemember: you already carry the goal within you","es":"Siéntate erguido y cierra los ojos\nRespira profundamente y relaja el cuerpo por completo\nEvoca en tu mente tu meta más importante\nImagina cómo es cuando has alcanzado esta meta – con todos los detalles\n¿Cómo se siente? ¿Qué piensas? ¿Qué dicen los demás?\nObsérvate dando los pasos que te llevan allí\nSiente la motivación y la confianza en ti mismo\nLleva este sentimiento a tu día\nRecuerda: ya llevas la meta dentro de ti"}',
        'visualization', 20, 'advanced', 'waves'
      ),

      -- ── MOVEMENT ───────────────────────────────────────────────────────────
      (
        '{"de":"Achtsame Bewegung","en":"Mindful Movement","es":"Movimiento consciente"}',
        '{"de":"Verbinde sanfte Bewegung mit vollständiger Körperwahrnehmung.","en":"Connect gentle movement with complete body awareness.","es":"Conecta el movimiento suave con plena conciencia corporal."}',
        '{"de":"Stehe aufrecht, Füße hüftbreit auseinander\nAtme tief ein und strecke die Arme langsam nach oben\nBei Ausatmung: Arme fallen lassen, Körper leicht nach vorne biegen\nWiederhole fünf Mal, vollständig im Atem geerdet\nDrehe den Kopf langsam von rechts nach links: spüre jede Bewegung\nRolle die Schultern rückwärts: vier Mal langsam und bewusst\nStehe still: Spüre die Stille im bewegten Körper\nAtme fünfmal tief durch und kehre zur Ruhe zurück","en":"Stand upright, feet hip-width apart\nInhale deeply and slowly raise arms overhead\nOn exhale: let arms fall, body gently forward fold\nRepeat five times, fully grounded in the breath\nSlowly turn head right to left: feel every movement\nRoll shoulders backward: four times, slow and deliberate\nStand still: sense the stillness within the moving body\nBreathe deeply five times and return to rest","es":"De pie, erguido, pies separados al ancho de las caderas\nInhala profundamente y eleva lentamente los brazos sobre la cabeza\nAl exhalar: deja caer los brazos, inclina suavemente el cuerpo hacia adelante\nRepite cinco veces, completamente anclado en la respiración\nGira la cabeza lentamente de derecha a izquierda: siente cada movimiento\nRueda los hombros hacia atrás: cuatro veces, lento y deliberado\nQuédate quieto: siente la quietud dentro del cuerpo en movimiento\nRespira profundamente cinco veces y regresa al descanso"}',
        'movement', 10, 'beginner', 'silence'
      );

  END IF;

  -- ── BREATHWORK TECHNIQUES ──────────────────────────────────────────────────
  IF (SELECT COUNT(*) FROM public.breathwork_techniques) = 0 THEN

    INSERT INTO public.breathwork_techniques
      (name, description, inhale_sec, hold_in_sec, exhale_sec, hold_out_sec, cycles, difficulty)
    VALUES
      (
        '{"de":"Boxatmung","en":"Box Breathing","es":"Respiración en caja"}',
        '{"de":"Gleichmäßige 4-4-4-4 Technik für Balance und Fokus. Bekannt aus dem Navy SEAL Training.","en":"Balanced 4-4-4-4 technique for balance and focus. Known from Navy SEAL training.","es":"Técnica equilibrada 4-4-4-4 para el equilibrio y el enfoque. Conocida del entrenamiento Navy SEAL."}',
        4, 4, 4, 4, 10, 'beginner'
      ),
      (
        '{"de":"4-7-8 Methode","en":"4-7-8 Method","es":"Método 4-7-8"}',
        '{"de":"Dr. Weils Entspannungstechnik: langes Halten aktiviert das Parasympathikum und senkt Stress in Minuten.","en":"Dr. Weil''s relaxation technique: long holds activate the parasympathetic nervous system and lower stress in minutes.","es":"Técnica de relajación del Dr. Weil: las retenciones largas activan el sistema parasimpático y reducen el estrés en minutos."}',
        4, 7, 8, 0, 8, 'beginner'
      ),
      (
        '{"de":"Wim Hof Basis","en":"Wim Hof Basic","es":"Wim Hof básico"}',
        '{"de":"Aktivierende Hyperventilationstechnik, die Energie weckt und die Kältetoleranz erhöht.","en":"Activating hyperventilation technique that awakens energy and increases cold tolerance.","es":"Técnica de hiperventilación activadora que despierta energía y aumenta la tolerancia al frío."}',
        4, 0, 4, 0, 30, 'intermediate'
      ),
      (
        '{"de":"Kohärentes Atmen","en":"Coherent Breathing","es":"Respiración coherente"}',
        '{"de":"5-5 Rhythmus synchronisiert Herzrate und Atemrate für maximale Herzratenvariabilität.","en":"5-5 rhythm synchronizes heart rate and breathing rate for maximum heart rate variability.","es":"El ritmo 5-5 sincroniza la frecuencia cardíaca y la respiración para máxima variabilidad."}',
        5, 0, 5, 0, 15, 'beginner'
      ),
      (
        '{"de":"Aktivierendes Atmen","en":"Energizing Breath","es":"Respiración energizante"}',
        '{"de":"Kurze Einatmung, lange Ausatmung stimuliert das Nervensystem und steigert Wachheit.","en":"Short inhale, long exhale stimulates the nervous system and increases alertness.","es":"Inhalación corta, exhalación larga estimula el sistema nervioso y aumenta el estado de alerta."}',
        2, 0, 4, 0, 12, 'intermediate'
      ),
      (
        '{"de":"Beruhigendes Atmen","en":"Calming Breath","es":"Respiración calmante"}',
        '{"de":"Verlängerte Ausatmung aktiviert den Vagusnerv und senkt Herzrate und Blutdruck.","en":"Extended exhale activates the vagus nerve and lowers heart rate and blood pressure.","es":"La exhalación prolongada activa el nervio vago y reduce la frecuencia cardíaca y la presión arterial."}',
        4, 0, 6, 0, 10, 'beginner'
      ),
      (
        '{"de":"Dreiecksatmung","en":"Triangle Breathing","es":"Respiración triangular"}',
        '{"de":"3-Phasen-Rhythmus mit Halten nach dem Einatmen – ideal für Konzentration und innere Balance.","en":"3-phase rhythm with hold after inhale – ideal for concentration and inner balance.","es":"Ritmo de 3 fases con retención tras inhalar – ideal para concentración y equilibrio interior."}',
        4, 4, 4, 0, 12, 'beginner'
      ),
      (
        '{"de":"Benutzerdefiniert","en":"Custom","es":"Personalizado"}',
        '{"de":"Vorlage für deine eigene Atemfrequenz. Passe Einatmung, Halten und Ausatmung frei an.","en":"Template for your own breathing frequency. Freely adjust inhale, hold, and exhale.","es":"Plantilla para tu propia frecuencia respiratoria. Ajusta libremente la inhalación, la retención y la exhalación."}',
        4, 0, 4, 0, 10, 'beginner'
      );

  END IF;
END;
$$;
