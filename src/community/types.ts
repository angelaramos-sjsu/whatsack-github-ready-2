/**
 * Community & Social Connection Chatbot — shared types.
 *
 * This feature is intentionally self-contained: it never mutates WhatSack's
 * existing resource, intake or chat contracts. All records it searches are
 * clearly labelled mock data (see data/communityResources.mock.ts).
 */

export type UiLanguage = 'en' | 'es';

/** Bilingual copy, matching the repo's existing `{ en, es }` convention. */
export interface Bi {
  en: string;
  es: string;
}

export type CommunityLanguageCode =
  | 'en'
  | 'es'
  | 'pt'
  | 'zh-Hans'
  | 'zh-Hant'
  | 'vi'
  | 'tl'
  | 'ko'
  | 'other';

/**
 * Regional variety is only offered for languages that have one in the intake
 * (Spanish and Portuguese). It is always chosen by the person, never inferred
 * from a city, surname or the language they typed in.
 */
export type RegionalVariety =
  | 'no-preference'
  | 'mexico'
  | 'spain'
  | 'latin-america'
  | 'brazil'
  | 'portugal';

export type CommunityIntentId =
  | 'meet-people'
  | 'community-events'
  | 'clubs-groups'
  | 'senior-activities'
  | 'volunteering'
  | 'explore'
  | 'contact-organization'
  | 'language-culture'
  | 'accessibility'
  | 'register-help'
  | 'cost-question';

export type ActivityInterest =
  | 'arts'
  | 'music'
  | 'exercise'
  | 'cultural'
  | 'games'
  | 'learning'
  | 'other';

export type AccessibilityPreference =
  | 'wheelchair'
  | 'transit-nearby'
  | 'transportation-help'
  | 'virtual';

export type TimePreference =
  | 'weekday-morning'
  | 'weekday-afternoon'
  | 'evening'
  | 'weekend'
  | 'anytime';

export type AgeGroup = 'youth' | 'adults' | 'older-adults' | 'any-age' | 'no-preference';

export interface LocationChoice {
  kind: 'city' | 'zip' | 'virtual' | 'skip';
  value: string;
}

export interface CommunityProfile {
  intent: CommunityIntentId | null;
  interests: ActivityInterest[];
  location: LocationChoice;
  language: CommunityLanguageCode;
  region: RegionalVariety;
  access: AccessibilityPreference[];
  timing: TimePreference;
  ageGroup: AgeGroup;
  /** Set by "I can't afford activities": free options are ranked first. */
  affordability: boolean;
  /** Set by "I have trouble using websites": lead with phone contact. */
  prefersPhoneHelp: boolean;
  /** Set by "I'm nervous about attending alone": offer organizer contact first. */
  nervousAlone: boolean;
  wantsOrganizerFirst: boolean;
}

export type CostStatus = 'free' | 'low-cost' | 'unknown';

/**
 * A community listing. `null` on a field means the source did not confirm it —
 * the UI must render "Not confirmed." rather than guessing.
 */
export interface CommunityResource {
  id: string;
  organizationName: string;
  programName: Bi;
  description: Bi;
  city: string;
  zip: string;
  serviceArea: Bi | null;
  days: Bi | null;
  times: Bi | null;
  costStatus: CostStatus;
  costNote: Bi | null;
  languages: CommunityLanguageCode[];
  languageRegions: RegionalVariety[];
  languageNote: Bi | null;
  accessibility: {
    wheelchair: boolean | null;
    caregiverWelcome: boolean | null;
    notes: Bi | null;
  };
  transportation: Bi | null;
  contact: {
    phone: string | null;
    email: string | null;
  };
  officialSourceUrl: string | null;
  /** ISO date (YYYY-MM-DD) of the last check, or null when unknown. */
  lastVerified: string | null;
  /** `mock` = fictional development record. `outdated` = past review window. */
  verification: 'mock' | 'outdated';
  intents: CommunityIntentId[];
  interests: ActivityInterest[];
  ageFocus: AgeGroup[];
  virtual: boolean;
  timing: TimePreference[];
}

export type ResultFlag =
  | 'language-not-confirmed'
  | 'wheelchair-not-confirmed'
  | 'cost-not-confirmed'
  | 'outdated'
  | 'freshness-unknown';

export interface CommunityMatch {
  resource: CommunityResource;
  score: number;
  flags: ResultFlag[];
}

export type Relaxation = 'accessibility' | 'language';

export interface MatchOutcome {
  matches: CommunityMatch[];
  /** Constraints that had to be loosened to reach three results. */
  relaxed: Relaxation[];
}

export type AdaptiveSignalId =
  | 'lonely'
  | 'same-age'
  | 'limited-english'
  | 'no-drive'
  | 'nervous-alone'
  | 'unsure-interests'
  | 'cannot-afford'
  | 'hard-to-use-websites';

export interface IntentResult {
  intents: CommunityIntentId[];
  matchedPhrases: string[];
  hints: {
    language?: CommunityLanguageCode;
    region?: RegionalVariety;
    city?: string;
    zip?: string;
    virtual?: boolean;
    wheelchair?: boolean;
    noDrive?: boolean;
    free?: boolean;
    caregiver?: boolean;
    senior?: boolean;
    wantsRegisterHelp?: boolean;
    wantsContact?: boolean;
  };
}

export interface QuickReply {
  id: string;
  label: Bi;
  patch: Partial<CommunityProfile>;
  /** Text the person would have said, shown as their message when picked. */
  said?: Bi;
}
