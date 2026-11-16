// Shared types for the community & social connection connector.
// Kept separate from the legacy WhatSack types so existing features are untouched.

export type UiLanguage = 'en' | 'es';

export interface LocalizedText {
  en: string;
  es: string;
}

export type ConnectorLanguageCode =
  | 'en'
  | 'es'
  | 'pt'
  | 'zh-Hans'
  | 'zh-Hant'
  | 'vi'
  | 'tl'
  | 'ko'
  | 'other';

export type RegionVariety =
  | 'mexico'
  | 'spain'
  | 'latin-america'
  | 'brazil'
  | 'portugal'
  | 'other';

export interface LanguagePreference {
  code: ConnectorLanguageCode;
  variety?: RegionVariety | null;
  noPreference?: boolean;
}

export type ConnectorGoal =
  | 'meet-people'
  | 'community-events'
  | 'clubs-groups'
  | 'senior-activities'
  | 'volunteering'
  | 'explore';

export type ActivityInterest =
  | 'arts'
  | 'music'
  | 'exercise'
  | 'cultural'
  | 'games'
  | 'learning'
  | 'other';

export type AccessNeed =
  | 'wheelchair'
  | 'transit'
  | 'transportation-assistance'
  | 'virtual'
  | 'none';

export type TimePreference =
  | 'weekday-mornings'
  | 'weekday-afternoons'
  | 'evenings'
  | 'weekends'
  | 'anytime';

export type AgeGroupPreference = 'under-18' | '18-34' | '35-54' | '55-64' | '65-plus' | 'any';

export type Audience =
  | 'older-adults'
  | 'young-adults'
  | 'newcomers'
  | 'caregivers'
  | 'families'
  | 'all-ages';

export type NextStepChoice = 'show-results' | 'talk-to-person' | 'change-preferences';

export type VerificationState = 'demo' | 'unconfirmed' | 'outdated' | 'inaccessible';

export interface LocationPreference {
  city?: string;
  zip?: string;
  virtual: boolean;
}

export interface ConnectorPreferences {
  goals: ConnectorGoal[];
  interests: ActivityInterest[];
  location: LocationPreference | null;
  language: LanguagePreference | null;
  access: AccessNeed[];
  time: TimePreference | null;
  nextStep: NextStepChoice | null;
  ageGroup: AgeGroupPreference | null;
  freeOnly: boolean;
  /** User is nervous about attending alone and would rather talk to an organizer first. */
  contactFirst: boolean;
  /** User has trouble using websites and prefers phone guidance. */
  prefersPhone: boolean;
}

export interface ProgramTime {
  /** Time-of-day slots the program runs. `null` means not confirmed. */
  timeSlots: TimePreference[] | null;
  /** Human-readable days, e.g. "Tuesdays and Thursdays". `null` means not confirmed. */
  days: string | null;
  detail: LocalizedText | null;
}

export interface ProgramContact {
  phone: string | null;
  /**
   * `verified` = published, dialable number (only for real directory organizations).
   * `demo` = clearly fake sample number; never rendered as a call link.
   */
  phoneStatus: 'verified' | 'demo' | 'unconfirmed';
  contactPerson: string | null;
  email: string | null;
  howToJoin: LocalizedText | null;
}

export interface ProgramAccessibility {
  wheelchair: boolean | null;
  transit: boolean | null;
  transportationAssistance: boolean | null;
  caregiverWelcome: boolean | null;
  notes: LocalizedText | null;
}

export interface CommunityProgram {
  id: string;
  /**
   * `directory` = real organization from the repository's published directory
   * (only name, city, address and website are known).
   * `demonstration` = clearly labeled fictional sample record.
   */
  recordType: 'directory' | 'demonstration';
  organization: string;
  activityName: LocalizedText;
  description: LocalizedText | null;
  city: string | null;
  zip: string | null;
  address: string | null;
  virtual: boolean;
  interests: ActivityInterest[];
  audiences: Audience[];
  offersVolunteering: boolean;
  languages: Array<{ code: ConnectorLanguageCode; variety?: RegionVariety }> | null;
  time: ProgramTime;
  cost: { free: boolean | null; detail: LocalizedText | null };
  accessibility: ProgramAccessibility;
  contact: ProgramContact;
  officialSource: string | null;
  lastVerified: string | null;
  verification: VerificationState;
  verificationNote: LocalizedText | null;
}

export type IntentId =
  | 'social'
  | 'older-adults'
  | 'language-culture'
  | 'accessibility'
  | 'transport'
  | 'virtual'
  | 'volunteering'
  | 'contact'
  | 'caregiver'
  | 'newcomer'
  | 'affordability';

export type AdaptiveSignal =
  | 'loneliness'
  | 'age-peer'
  | 'language-barrier'
  | 'no-drive'
  | 'nervous-alone'
  | 'no-interests'
  | 'cost'
  | 'tech-trouble';

export interface RecognizedIntent {
  intents: IntentId[];
  goals: ConnectorGoal[];
  interests: ActivityInterest[];
  access: AccessNeed[];
  language: LanguagePreference | null;
  detectedLanguage: 'en' | 'es' | 'pt' | 'unknown';
  location: LocationPreference | null;
  freeOnly: boolean;
  time: TimePreference | null;
  ageGroup: AgeGroupPreference | null;
  signals: AdaptiveSignal[];
  confidence: number;
}

export type IntakeQuestionId =
  | 'goals'
  | 'interests'
  | 'location'
  | 'language'
  | 'access'
  | 'time'
  | 'nextStep';

export interface IntakeAnswers {
  goals?: ConnectorGoal[];
  interests?: ActivityInterest[];
  location?: LocationPreference;
  language?: LanguagePreference;
  access?: AccessNeed[];
  time?: TimePreference;
  nextStep?: NextStepChoice;
}

export interface IntakeState {
  answers: IntakeAnswers;
  /** Index into INTAKE_QUESTION_IDS. */
  currentQuestion: number;
  skipped: IntakeQuestionId[];
  completed: boolean;
}

export type MatchReason =
  | 'language'
  | 'language-variety'
  | 'location'
  | 'virtual'
  | 'interest'
  | 'time'
  | 'wheelchair'
  | 'transit'
  | 'transportation-assistance'
  | 'cost'
  | 'goal'
  | 'contact';

export type MatchWarning =
  | 'demo-record'
  | 'language-unconfirmed'
  | 'variety-unconfirmed'
  | 'accessibility-unconfirmed'
  | 'cost-unconfirmed'
  | 'schedule-unconfirmed'
  | 'contact-unconfirmed'
  | 'outdated'
  | 'real-org-details-unconfirmed';

export type MissingFieldId =
  | 'description'
  | 'location'
  | 'schedule'
  | 'cost'
  | 'languages'
  | 'wheelchair'
  | 'transit'
  | 'transportation-assistance'
  | 'contact'
  | 'officialSource'
  | 'lastVerified';

export interface ConnectorChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  chips?: string[];
}

export interface ProgramMatch {
  program: CommunityProgram;
  score: number;
  reasons: MatchReason[];
  warnings: MatchWarning[];
  missingFields: MissingFieldId[];
}
