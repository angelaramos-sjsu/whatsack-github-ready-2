export type AnswerTopic = 'food' | 'work' | 'college' | 'mental' | 'senior' | 'roleplay';

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

export interface ScriptedNextStep {
  title: BilingualText;
  detail: BilingualText;
  actions: ScriptedAction[];
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
  /** Grounded demonstration resources rendered under the answer. */
  resourceIds?: string[];
  /** Only ids that resolve to another implemented answer are displayed. */
  followUpIds: string[];
}
