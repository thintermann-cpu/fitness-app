export interface CategoryLabel {
  label: string
  description: string
}

export const WOD_CATEGORY_LABELS: Record<string, CategoryLabel> = {
  crossfit: {
    label: 'CrossFit',
    description: 'Klassische WODs, Girls & Heroes — funktionelle Bewegungen mit hoher Intensität.',
  },
  hiit: {
    label: 'HIIT',
    description: 'Work/Rest-Intervalle — maximale Intensität in kurzer Zeit, ideal für zuhause.',
  },
  kraft_ausdauer: {
    label: 'Kraft-Ausdauer',
    description: 'Ganzkörper-Circuits mit Körpergewicht — leise, gelenkschonend, perfekt für abends.',
  },
  kraft_wenig_zeit: {
    label: 'Kraft - Wenig Zeit',
    description: 'Dumbbell oder Kettlebell mit Zeitdruck — maximale Kraft in minimaler Zeit.',
  },
  krafttraining: {
    label: 'Krafttraining',
    description: 'Klassische Sätze und Wiederholungen mit Pause — für Muskelaufbau und maximale Kraft.',
  },
}
