const WOD_TYPE_LABELS: Record<string, Record<string, string>> = {
  de: {
    AMRAP:   'Zeit-Challenge (AMRAP)',
    ForTime: 'Auf Zeit (For Time)',
    EMOM:    'Intervall-Routine (EMOM)',
    Tabata:  'Tabata-Intervall',
  },
  en: {
    AMRAP:   'Time Challenge (AMRAP)',
    ForTime: 'For Time',
    EMOM:    'Interval Routine (EMOM)',
    Tabata:  'Tabata Interval',
  },
  es: {
    AMRAP:   'Reto de Tiempo (AMRAP)',
    ForTime: 'Contra el Reloj',
    EMOM:    'Rutina de Intervalo (EMOM)',
    Tabata:  'Intervalo Tabata',
  },
}

export function getWodTypeLabel(type: string, lang = 'de'): string {
  return WOD_TYPE_LABELS[lang]?.[type] ?? WOD_TYPE_LABELS['de']?.[type] ?? type
}
