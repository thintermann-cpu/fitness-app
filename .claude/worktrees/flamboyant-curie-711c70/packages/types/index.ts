export type PillarId = 'workout' | 'routine' | 'stretching' | 'meditation';
export type Language = 'en' | 'de' | 'es';
export type SubscriptionStatus = 'trial' | 'active' | 'expired' | 'cancelled';

export interface UserProfile {
  id: string;
  email: string;
  language: Language;
  activePillars: PillarId[];
  primaryPillar: PillarId;
  colorTheme: string;
  subscriptionStatus: SubscriptionStatus;
  trialEndsAt: string | null;
  createdAt: string;
}

export interface WOD {
  id: number;
  name: string;
  kategorie: string;
  typ: string;
  dauer: number;
  schwierigkeit: string;
  equipment: string[];
  beschreibung: string;
}
