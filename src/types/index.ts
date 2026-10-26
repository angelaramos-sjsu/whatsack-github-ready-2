export type Language = 'en' | 'es';

export type CategoryId = 'food' | 'mental-health' | 'workforce' | 'community';

export interface CategoryInfo {
  id: CategoryId;
  name: { en: string; es: string };
  tagline: { en: string; es: string };
  icon: string;
  badgeColor: string;
  count: number;
}

export interface NextStepActionItem {
  id: string;
  title: { en: string; es: string };
  description: { en: string; es: string };
  estimatedMinutes?: number;
  completed?: boolean;
}

export interface NextStepInsight {
  explanation: { en: string; es: string };
  confidenceRating: number; // e.g. 98%
  sourceOrganization: { en: string; es: string };
  simulatedVerificationDate: string;
  dataSourceLabel: { en: string; es: string };
  documentsNeeded: { en: string; es: string }[];
  actionItems: NextStepActionItem[];
  commonMisconceptions?: { en: string; es: string };
  accessibilityNotes: { en: string; es: string };
}

export interface DemonstrationResource {
  id: string;
  categoryId: CategoryId;
  /** Direct official provider link, when available; never a simulated contact URL. */
  officialUrl?: string;
  title: { en: string; es: string };
  organization: { en: string; es: string };
  description: { en: string; es: string };
  location: {
    city: string;
    county: string;
    transitNote: { en: string; es: string };
    addressSimulated: string;
  };
  schedule: { en: string; es: string };
  costType: 'Free' | 'Sliding Scale' | 'No Cost for Youth' | 'Subsidized';
  languagesSupported: string[];
  eligibilityHighlight: { en: string; es: string };
  noIdRequired?: boolean;
  confidential?: boolean;
  tags: string[];
  nextStepInsight: NextStepInsight;
  contactSimulated: {
    phone: string;
    intakeMethod: { en: string; es: string };
    websiteDomainSimulated: string;
  };
}

export interface PersonaJourneyStep {
  stepNumber: number;
  title: { en: string; es: string };
  narrative: { en: string; es: string };
  recommendedResourceId: string;
  keyTakeaway: { en: string; es: string };
}

export interface Persona {
  id: string;
  name: string;
  age: number;
  tagline: { en: string; es: string };
  location: string;
  avatarUrl: string;
  categoryFocus: CategoryId;
  background: { en: string; es: string };
  primaryGoals: { en: string; es: string }[];
  barriers: { en: string; es: string }[];
  sampleQuestions: { en: string; es: string }[];
  recommendedResourceIds: string[];
  journeySteps: PersonaJourneyStep[];
}

export interface IntakeProfile {
  name: string;
  ageRange: 'under-18' | '18-24' | '25-49' | '50-64' | '65+';
  city: string;
  householdSize: number;
  hasChildren: boolean;
  hasSeniors: boolean;
  monthlyIncome: '< $2,500' | '$2,500 - $4,500' | '$4,500 - $7,000' | '$7,000+' | 'prefer-not-to-say';
  employmentStatus: 'employed' | 'part-time' | 'laid-off' | 'seeking-work' | 'student' | 'retired';
  servicePriorities: CategoryId[];
  preferredLanguage: string;
  noIdRequiredPreference: boolean;
  transitDependent: boolean;
  submittedAt?: string;
}

export interface SearchFilterState {
  categoryId: CategoryId | 'all';
  city: string;
  language: string;
  freeOnly: boolean;
  noIdRequired: boolean;
}
