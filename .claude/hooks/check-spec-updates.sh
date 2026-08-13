#!/bin/bash
BUGS="/c/Projects/fitness_app/BUGS.md"

if [ -f "$BUGS" ]; then
  count=$(awk '/^## Spec-Updates ausstehend/{f=1;next}/^## /{f=0}f' "$BUGS" | grep -c '[^[:space:]]')
  if [ "$count" -gt 0 ]; then
    printf '{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"BUGS.md enthaelt %s offene Zeile(n) unter der Sektion \\"## Spec-Updates ausstehend\\". Weise den User zu Beginn des Gespraechs proaktiv darauf hin, dass eine interaktive doc-keeper-Session aussteht, um docs/CARVEOUT_SPEC.md zu synchronisieren."}}\n' "$count"
  fi
fi
exit 0
