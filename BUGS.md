# CarveOut Bug-Queue

Format je Zeile: `- [Prio] Beschreibung`. Prio ist `Hoch`, `Mittel` oder `Niedrig` (ohne Tag = `Mittel`).

## Offen
- [ ] PRIORITÄT — Workout-Detail schwarz + instabile Filter-Ergebnisse gemeinsam untersuchen (vermutlich gleiche Root Cause): Öffnen von Workout-Details friert den Tab mehrere Sekunden ein (CDP "renderer unresponsive", kein Netzwerkfehler), UND Filter liefern bei identischem sichtbaren Zustand unterschiedliche Trefferzahlen (156 / 30 / 416 bei "Home" + "Kraft - Wenig Zeit"). Beides deutet auf eine teure/fehlerhafte Filter-Berechnung im Frontend hin, die synchron den Main Thread blockiert und dabei inkonsistente Ergebnisse produziert. Zuerst hier ansetzen, bevor Einzelsymptome unten gefixt werden.
- [ ] Equipment-Filter-Toggle inkonsistent — nach Klick auf "Alle anzeigen" wechselt Text zu "Equipment-Filter aus — aktivieren", Home-Tile bleibt aber visuell ausgewählt (orange Rahmen). Vermutlich Symptom desselben Root-Cause-Punkts oben.
- [ ] "Ohne Laufen" / Equipment-Pflichtfilter (z.B. Dumbbell) nicht zuverlässig angewendet — vermutlich ebenfalls Symptom des Root-Cause-Punkts oben.
- [ ] Custom Workout mit "mit Warmup" wird nicht gespeichert — bestätigt per Network-Log: Klick auf "Start" (mit Warmup) sendet KEINEN Insert an custom_workouts, auch nicht beim Start des Warmups. "Eigene Workouts"-Zähler blieb nach Testlauf bei 11. Speicherung passiert vermutlich erst am Ende des kompletten Flows statt beim Erstellen — bei Abbruch geht das Workout verloren.
- [ ] History-Tab lädt endlos — zeigt dauerhaft "Loading history...". Im Network-Log wird NIE ein Request an wod_history ausgelöst, kein Fehler/Timeout — Fetch wird gar nicht erst getriggert.
- [ ] Workouts mit nur 1 Übung weiterhin erstellbar — Schritt "Übungen" im Creation-Flow ist "Optional" markiert, kein Minimum. Erklärt vermutlich wiederkehrende Ein-Übungs-Workouts trotz Cleanup.
- [ ] Workout-Liste zeigt bei mehreren Aufrufen identische Top-Einträge in gleicher Reihenfolge — keine erkennbare Randomisierung trotz Dice-Icon-Button.
- [ ] Sidebar-Icon bei Achtsamkeit falsch — nutzt 🧠 (Hirn), sollte wie überall sonst in der App (Kacheln "Aktueller Stand", vermutlich Detailseiten) die sitzende Meditationsfigur sein. Referenz: Mein Tag → Aktueller-Stand-Kachel.

## In Bearbeitung

## Erledigt

## Spec-Updates ausstehend
