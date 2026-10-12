# Session-Import

Futter für einen Chatbot. Die App liest genau dieses JSON. Ausgabe des Chatbots: nur das JSON-Objekt, ohne Markdown und ohne Erklärung.

In der App: Training → Timer → Session einfügen. Text einfügen oder die Datei laden. Die Vorschau zeigt die Teile. Fehler blockieren den Start. Ein unbekannter Übungsname ist nur eine Warnung: keine Abbildung, kein hinterlegter Kurztext. Der Hinweis aus `note` bleibt.

„Auch sichern“ speichert die Session. Der nächste Start läuft die Liste direkt ab, ohne den Wizard.

Nur die Teile aufnehmen, die die Session braucht. Das Beispiel unten zeigt jedes Feld einmal.

## Regeln

- `name`: optional, bis 80 Zeichen. Fehlt er, heisst die Session „Import“.
- `parts`: Liste, 1 bis 20 Teile. Reihenfolge ist die Ablauffolge.
- `kind`: `warmup`, `flow`, `kraft`, `pause`, `emom`, `amrap`, `fortime`, `tabata`, `mobility`.
- Warm-up ist ein `flow` mit `role: "warmup"`. Es schreibt keinen Verlauf und geht direkt in den nächsten Teil.
- `role: "flow"` ist ein Ablauf mit Sekunden und schreibt einen Workout-Verlauf.
- `role: "mobility"` spielt am Ende mit und hakt den Mobilitäts-Pillar ab.
- `kind: "warmup"` und `kind: "mobility"` sind Kurzformen und setzen die Rolle selbst.
- Zwischen zwei Arbeitsteilen ohne `pause` fragt die App nach 60 Sekunden, ob es weitergeht. Eine gesetzte Pause nutzt `seconds` und fragt ebenfalls. Das Warm-up ist die Ausnahme und geht direkt weiter.
- Namen frei. Katalognamen bekommen Abbildung und Kurztext, wenn der Name trifft.
- `note`: Ausführung, Tempo oder Form. Optional, bis 140 Zeichen.
- `sides`: nur bei Ablauf-Übungen. `1` oder `2`. Bei `2` läuft die Zeit ein zweites Mal mit „andere Seite“.
- Kraft: `sets` 1–20, `reps` 1–100, `weight` nur `leicht`, `mittel` oder `schwer`. `restBetweenSets` und `restBetweenExercises` in Sekunden, 0–600. Standard 90 und 60.
- `supersetWithPrevious: true` koppelt die Übung an die direkt davor. Die Sätze gelten für die ganze Gruppe, die Reps bleiben pro Übung. An der ersten Übung eines Teils wird das Flag ignoriert.
- Pause: `seconds` 1–3600.
- EMOM: `intervalMin` 1–10, `rounds` 1–60. Pro Übung `detail` für Reps oder Distanz.
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
        { "name": "Back Squats", "sets": 5, "reps": 5, "weight": "schwer", "note": "3-1-1, Pause unten" },
        { "name": "Romanian Deadlift", "sets": 3, "reps": 8, "weight": "mittel", "note": "Rücken lang" },
        { "name": "Bench Press", "sets": 3, "reps": 8, "weight": "schwer", "supersetWithPrevious": false },
        { "name": "Bent Over Row", "sets": 3, "reps": 8, "weight": "mittel", "supersetWithPrevious": true, "note": "Ellbogen eng" }
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

Kleine Session, nur Kraft und danach EMOM:

```json
{
  "name": "Kraft dann EMOM",
  "parts": [
    {
      "kind": "kraft",
      "restBetweenSets": 120,
      "exercises": [
        { "name": "Back Squats", "sets": 5, "reps": 5, "weight": "schwer" }
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
