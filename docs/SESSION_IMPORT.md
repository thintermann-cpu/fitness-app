# Session-Import

Futter für einen Chatbot. Die App liest genau dieses JSON. Ausgabe des Chatbots: nur das JSON-Objekt, ohne Markdown und ohne Erklärung.

In der App: Training → neben „Neues Workout“, oder Timer → Session einfügen. Dieselbe Übersicht. Text einfügen oder die Datei laden. Name, Reihenfolge, Zeiten und Hinweise lassen sich danach ändern. Ein neues JSON ersetzt diese Änderungen. Fehler blockieren den Start. Ein unbekannter Übungsname ist nur eine Warnung: keine Abbildung, kein hinterlegter Kurztext. Der Hinweis aus `note` bleibt.

Öffentliche Erklärung: `/session-import` (auch im Footer der Startseite und im Newsletter-Text).

„Auch sichern“ speichert die Session. Der nächste Start läuft die Liste direkt ab, ohne den Wizard.

Nur die Teile aufnehmen, die die Session braucht. Das Beispiel unten zeigt jedes Feld einmal.

## Regeln

- `name`: optional, bis 80 Zeichen. Fehlt er, heisst die Session „Import“.
- `parts`: Liste, 1 bis 20 Teile. Reihenfolge ist die Ablauffolge.
- `kind`: `warmup`, `flow`, `kraft`, `pause`, `emom`, `amrap`, `fortime`, `tabata`, `mobility`, `breath`, `meditation`.
- `breath` (auch `atem`, `breathwork`, `atmung`): eine Vier-Phasen-Atmung. Box Breathing ist kein eigenes Feld, sondern `4-4-4-4`. `name` bis 80 Zeichen. `inhaleSec` und `exhaleSec` 1–30. `holdInSec` und `holdOutSec` 0–30, Standard 0. `cycles` 1–80. `note` optional, bis 140 Zeichen. Der Spieler hat eine Einatem-Phase. Ein zweiter Schluck (physiologischer Seufzer) steht im Hinweis.
- `meditation` (auch `achtsamkeit`, `mindfulness`): `name`, `minutes` 1–90, `sound` optional. Fehlt der Klang, bleibt es still. Bekannte Werte: `silence`, `bowl`, `rain`, `forest`, `waves`, `white_noise`, `fire`, `night`, `wind`, `harp`, `zen_guitar`, `deep_om`. Deutsche Namen gehen auch: `stille`, `schale`, `regen`, `wald`, `wellen`, `rauschen`, `feuer`, `nacht`, `wind`, `harfe`, `gitarre`, `om`. Ein unbekannter Klang ist ein Fehler.
- Atem und Sitzmeditation sind Arbeitsteile. Ohne gesetzte `pause` kommt dazwischen die 60-Sekunden-Frage. Beide haken Achtsamkeit ab. Der Atem schreibt `breathwork`, die Sitzmeditation `custom_timer`.
- Warm-up ist ein `flow` mit `role: "warmup"`. Es schreibt keinen Verlauf und geht direkt in den nächsten Teil.
- `role: "flow"` ist ein Ablauf mit Sekunden und schreibt einen Workout-Verlauf.
- `role: "mobility"` spielt am Ende mit und hakt den Mobilitäts-Pillar ab.
- `kind: "warmup"` und `kind: "mobility"` sind Kurzformen und setzen die Rolle selbst.
- Zwischen zwei Arbeitsteilen ohne `pause` fragt die App nach 60 Sekunden, ob es weitergeht. Eine gesetzte Pause nutzt `seconds` und fragt ebenfalls. Das Warm-up ist die Ausnahme und geht direkt weiter.
- Namen frei. Katalognamen bekommen Abbildung und Kurztext, wenn der Name trifft.
- `note`: Ausführung, Tempo oder Form. Optional, bis 140 Zeichen.
- `sides`: nur bei Ablauf-Übungen. `1` oder `2`. Bei `2` läuft die Zeit ein zweites Mal mit „andere Seite“.
- Kraft: `sets` 1–20, `reps` 1–100. `weight` ist eine kg-Angabe (`100`, `"22.5 kg"`, `"82,5 kg"`) oder ein kurzer Text bis 40 Zeichen (`"2x 20-22.5 kg"`, `"Bodyweight"`, `"60/70/80"`). `leicht`, `mittel` und `schwer` gehen weiter. `restBetweenSets` und `restBetweenExercises` in Sekunden, 0–600. Standard 90 und 60.
- `supersetWithPrevious: true` koppelt die Übung an die direkt davor. Die Sätze gelten für die ganze Gruppe, die Reps bleiben pro Übung. An der ersten Übung eines Teils wird das Flag ignoriert.
- Pause: `seconds` 1–3600.
- EMOM: `intervalMin` 1–10, `rounds` 1–60. `rounds` ist die Anzahl der Intervalle und läuft genau so, auch wenn die Zahl kein Vielfaches der Übungen ist. Drei Durchgänge bei vier Übungen sind `rounds` 12. Pro Übung `detail` für Reps oder Distanz.
- AMRAP und For Time: `minutes`. For Time erlaubt `0` und meint dann kein Zeitlimit. Sonst 1–90. `scheme` ist der Ablauftext, zum Beispiel `3 Runden · 21-15-9`.
- Tabata: `workSec` und `restSec` 5–180, `rounds` 1–40.
- Ablauf-Übungen: `seconds` 5–900. `restSec` am Teil ist die Pause zwischen den Übungen, 0–180, Standard 10.
- Höchstens 40 Übungen pro Teil.

## Beispiel

```json
{
  "name": "Unterkörper, Metcon, Mobilität",
  "parts": [
    {
      "kind": "flow",
      "role": "warmup",
      "restSec": 10,
      "exercises": [
        { "name": "Armkreisen", "seconds": 40, "note": "Große Kreise, locker" },
        { "name": "Air Squats", "seconds": 40, "note": "Tief, Brust hoch" },
        { "name": "Inchworms", "seconds": 40, "sides": 1 }
      ]
    },
    {
      "kind": "kraft",
      "restBetweenSets": 180,
      "restBetweenExercises": 90,
      "exercises": [
        { "name": "Back Squats", "sets": 5, "reps": 5, "weight": 100, "note": "3-1-1, Pause unten" },
        { "name": "Romanian Deadlift", "sets": 3, "reps": 8, "weight": "70 kg", "note": "Rücken lang" },
        { "name": "Bench Press", "sets": 3, "reps": 8, "weight": 80, "supersetWithPrevious": false },
        { "name": "Bent Over Row", "sets": 3, "reps": 8, "weight": "2×24 kg", "supersetWithPrevious": true, "note": "Ellbogen eng" }
      ]
    },
    { "kind": "pause", "seconds": 180 },
    {
      "kind": "emom",
      "intervalMin": 1,
      "rounds": 10,
      "scheme": "Gerade Minute Schwingen, ungerade Kniehebel",
      "exercises": [
        { "name": "KB Swings", "detail": "15", "note": "Hüfte explosiv" },
        { "name": "High Knees", "detail": "20" }
      ]
    },
    { "kind": "pause", "seconds": 60 },
    {
      "kind": "amrap",
      "minutes": 12,
      "scheme": "3 Runden, Rest danach selbst gewählt",
      "exercises": [
        { "name": "Burpees", "detail": "10" },
        { "name": "Air Squats", "detail": "15", "note": "Knie nach aussen" }
      ]
    },
    {
      "kind": "fortime",
      "minutes": 0,
      "scheme": "So schnell wie möglich, kein Cap",
      "exercises": [
        { "name": "Thrusters", "detail": "21-15-9" },
        { "name": "Pull-ups", "detail": "21-15-9", "note": "Band erlaubt" }
      ]
    },
    {
      "kind": "tabata",
      "workSec": 20,
      "restSec": 10,
      "rounds": 8,
      "exercises": [
        { "name": "Mountain Climbers", "note": "Hüfte tief" },
        { "name": "Plank", "note": "Bauch fest" }
      ]
    },
    {
      "kind": "flow",
      "role": "flow",
      "restSec": 5,
      "exercises": [
        { "name": "Jumping Jacks", "seconds": 30, "note": "Puls hochhalten" }
      ]
    },
    {
      "kind": "mobility",
      "restSec": 5,
      "exercises": [
        { "name": "Pigeon Stretch", "seconds": 45, "sides": 2, "note": "Hüfte sinken lassen, nicht ins Knie drücken" },
        { "name": "Hamstring Stretch", "seconds": 40, "sides": 2, "note": "Rücken lang" }
      ]
    }
  ]
}
```

`supersetWithPrevious: false` ist der Normalfall und kann wegfallen. Im Beispiel steht es einmal, damit klar ist, dass Bankdrücken nicht zum Rumänischen Kreuzheben gehört. Rudern hängt an der Bank.

Atem und Sitz in derselben Kette. Box Breathing, 4-7-8, kohärentes Atmen und der physiologische Seufzer sind derselbe Teil `breath`, nur mit anderen Zeiten:

```json
{
  "name": "Atem und Sitz",
  "parts": [
    {
      "kind": "breath",
      "name": "Box Breathing",
      "inhaleSec": 4,
      "holdInSec": 4,
      "exhaleSec": 4,
      "holdOutSec": 4,
      "cycles": 8
    },
    {
      "kind": "breath",
      "name": "4-7-8",
      "inhaleSec": 4,
      "holdInSec": 7,
      "exhaleSec": 8,
      "holdOutSec": 0,
      "cycles": 4
    },
    {
      "kind": "breath",
      "name": "Kohärentes Atmen",
      "inhaleSec": 6,
      "holdInSec": 0,
      "exhaleSec": 6,
      "holdOutSec": 0,
      "cycles": 20,
      "note": "Gleichmässig, ohne Pause"
    },
    {
      "kind": "breath",
      "name": "Physiologischer Seufzer",
      "inhaleSec": 4,
      "holdInSec": 1,
      "exhaleSec": 8,
      "holdOutSec": 0,
      "cycles": 3,
      "note": "Zweiter kleiner Schluck oben, dann lang aus"
    },
    {
      "kind": "meditation",
      "name": "Sitzmeditation",
      "minutes": 10,
      "sound": "rain",
      "note": "Auf den Atem achten"
    },
    {
      "kind": "meditation",
      "name": "Kurze Stille",
      "minutes": 5,
      "sound": "silence"
    }
  ]
}
```

Kleine Session, nur Kraft und danach EMOM:

```json
{
  "name": "Kraft dann EMOM",
  "parts": [
    {
      "kind": "kraft",
      "restBetweenSets": 120,
      "exercises": [
        { "name": "Back Squats", "sets": 5, "reps": 5, "weight": 100 }
      ]
    },
    {
      "kind": "emom",
      "intervalMin": 1,
      "rounds": 8,
      "exercises": [
        { "name": "KB Swings", "detail": "15" }
      ]
    }
  ]
}
```
