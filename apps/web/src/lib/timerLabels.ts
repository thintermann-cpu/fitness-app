export type TimerMode = 'fortime' | 'amrap' | 'emom' | 'tabata'

export interface TimerLabel {
  name:  string
  desc:  string
  emoji: string
  color: string
}

export const TIMER_LABELS: Record<TimerMode, TimerLabel> = {
  fortime: {
    name:  'So schnell wie möglich',
    desc:  'Alle Runden so schnell du kannst',
    emoji: '⏱',
    color: '#E8642A',
  },
  amrap: {
    name:  'So viel wie möglich (AMRAP)',
    desc:  'Möglichst viele Runden in der Zeit',
    emoji: '🔁',
    color: '#F59E0B',
  },
  emom: {
    name:  'Jede Minute eine neue Runde',
    desc:  'Jede Minute startest du die Übungen neu',
    emoji: '📶',
    color: '#3B82F6',
  },
  tabata: {
    name:  'Tabata',
    desc:  '20s Arbeit, 10s Pause — 8 Runden',
    emoji: '⚡',
    color: '#8B5CF6',
  },
}

export const TIMER_MODE_LIST: TimerMode[] = ['fortime', 'amrap', 'emom', 'tabata']

/** Maps WOD type strings (from DB) to TimerMode */
export const WOD_TYPE_TO_MODE: Record<string, TimerMode> = {
  ForTime: 'fortime',
  AMRAP:   'amrap',
  EMOM:    'emom',
  Tabata:  'tabata',
}
