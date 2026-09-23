const WOD_TYPE_LABELS: Record<string, Record<string, string>> = {
  de: {
    AMRAP:   'Zeit-Challenge (AMRAP)',
    ForTime: 'Auf Zeit (For Time)',
    EMOM:    'Intervall (EMOM)',
    Tabata:  'Tabata-Intervall (Tabata)',
    krafttraining: 'Krafttraining (Sätze)',
  },
  en: {
    AMRAP:   'Time Challenge (AMRAP)',
    ForTime: 'For Time',
    EMOM:    'Interval (EMOM)',
    Tabata:  'Tabata Interval (Tabata)',
    krafttraining: 'Strength (sets)',
  },
  es: {
    AMRAP:   'Reto de Tiempo (AMRAP)',
    ForTime: 'Contra el Reloj',
    EMOM:    'Intervalo (EMOM)',
    Tabata:  'Intervalo Tabata (Tabata)',
    krafttraining: 'Fuerza (series)',
  },
}

export function getWodTypeLabel(type: string, lang = 'de'): string {
  return WOD_TYPE_LABELS[lang]?.[type] ?? WOD_TYPE_LABELS['de']?.[type] ?? type
}
