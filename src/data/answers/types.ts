export type AnswerTopic = 'food' | 'work' | 'college' | 'mental' | 'senior' | 'community' | 'roleplay';

export interface BilingualText {
  en: string;
  es: string;
}

export interface OfficialResourceLink {
  label: BilingualText;
  source: BilingualText;
  url: string;
}

export type ScriptedAction =
  | { id: string; kind: 'open-link'; label: BilingualText; url: string }
  | { id: string; kind: 'save-plan'; label: BilingualText; resourceId: string };

/** A reviewed scripted step saved into the resident's plan. */
export interface SavedScriptedStep {
  id: string;
  title: BilingualText;
  detail: BilingualText;
}

export interface ScriptedNextStep {
  title: BilingualText;
  detail: BilingualText;
  actions: ScriptedAction[];
  meta?: NextStepMeta;
}

export interface NextStepMeta {
  who?: string;
  area?: string;
  contact?: string;
  deadline?: string;
  cost?: string;
  language?: string;
  prepare?: string;
  sourceUrl: string;
  sourceUrl2?: string;
  lastReviewed: string;
}

/**
 * One reviewed, scripted chatbot answer.
 *
 * Every follow-up button in the WhatSack chatbot points at exactly one `id` here,
 * so a click always replays an approved answer instead of matching keywords.
 */
export interface ScriptedAnswer {
  /** Unique answer id — the only thing a follow-up button may reference. */
  id: string;
  topic: AnswerTopic | 'fallback';
  /** The question this answer replies to; also the label of its follow-up button. */
  question: BilingualText;
  answer: BilingualText;
  /** Context this answer keeps in view (place, interests, goals, money concerns). */
  context: BilingualText[];
  links?: OfficialResourceLink[];
  nextStep?: ScriptedNextStep;
  /** A closing set of NextStep Insights, shown as an ordered list. */
  nextSteps?: ScriptedNextStep[];
  /** Sourced details to consider, shown before the NextStep options. */
  keepInMind?: BilingualText[];
  /** Grounded demonstration resources rendered under the answer. */
  resourceIds?: string[];
  /** Only ids that resolve to another implemented answer are displayed. */
  followUpIds: string[];
}
