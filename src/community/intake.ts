import { INTAKE_QUESTIONS } from './copy';
import {
  AccessNeed,
  ActivityInterest,
  ConnectorGoal,
  ConnectorPreferences,
  IntakeAnswers,
  IntakeQuestionId,
  IntakeState,
  LanguagePreference,
  LocationPreference,
  NextStepChoice,
  TimePreference
} from './types';

export const INTAKE_QUESTION_IDS: IntakeQuestionId[] = INTAKE_QUESTIONS.map((question) => question.id);

export const emptyPreferences: ConnectorPreferences = {
  goals: [],
  interests: [],
  location: null,
  language: null,
  access: [],
  time: null,
  nextStep: null,
  ageGroup: null,
  freeOnly: false,
  contactFirst: false,
  prefersPhone: false
};

export function createIntakeState(seed: IntakeAnswers = {}): IntakeState {
  const firstUnanswered = INTAKE_QUESTION_IDS.findIndex((id) => !isAnswered(id, seed));
  return {
    answers: seed,
    currentQuestion: firstUnanswered === -1 ? INTAKE_QUESTION_IDS.length - 1 : firstUnanswered,
    skipped: [],
    completed: firstUnanswered === -1
  };
}

export function isAnswered(id: IntakeQuestionId, answers: IntakeAnswers): boolean {
  const value = answers[id];
  if (value === undefined || value === null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') {
    const location = value as LocationPreference;
    const language = value as LanguagePreference;
    return Boolean(location.city || location.zip || location.virtual || language.code);
  }
  return true;
}

export function questionById(id: IntakeQuestionId) {
  return INTAKE_QUESTIONS.find((question) => question.id === id)!;
}

/**
 * Next question that is neither answered nor skipped. Returning `null` means
 * there is nothing left to ask, so the wizard is complete.
 */
function nextOpenQuestion(
  answers: IntakeAnswers,
  skipped: IntakeQuestionId[],
  from: number
): number | null {
  for (let index = from + 1; index < INTAKE_QUESTION_IDS.length; index += 1) {
    const id = INTAKE_QUESTION_IDS[index];
    if (skipped.includes(id)) continue;
    if (isAnswered(id, answers)) continue;
    return index;
  }
  return null;
}

/** Store an answer for the current question and move to the next open one. */
export function answerCurrentQuestion(state: IntakeState, value: IntakeAnswers[IntakeQuestionId]): IntakeState {
  const id = INTAKE_QUESTION_IDS[state.currentQuestion];
  const answers: IntakeAnswers = { ...state.answers, [id]: value } as IntakeAnswers;
  const skipped = state.skipped.filter((item) => item !== id);
  const next = nextOpenQuestion(answers, skipped, state.currentQuestion);
  return {
    answers,
    currentQuestion: next ?? state.currentQuestion,
    skipped,
    completed: next === null
  };
}

export function skipCurrentQuestion(state: IntakeState): IntakeState {
  const id = INTAKE_QUESTION_IDS[state.currentQuestion];
  const answers = { ...state.answers };
  delete answers[id];
  const skipped = state.skipped.includes(id) ? state.skipped : [...state.skipped, id];
  const next = nextOpenQuestion(answers, skipped, state.currentQuestion);
  return {
    answers,
    currentQuestion: next ?? state.currentQuestion,
    skipped,
    completed: next === null
  };
}

export function goBack(state: IntakeState): IntakeState {
  return {
    ...state,
    currentQuestion: Math.max(0, state.currentQuestion - 1),
    completed: false
  };
}

export function editQuestion(state: IntakeState, id: IntakeQuestionId): IntakeState {
  const index = INTAKE_QUESTION_IDS.indexOf(id);
  if (index === -1) return state;
  return { ...state, currentQuestion: index, completed: false };
}

export function restartIntake(seed: IntakeAnswers = {}): IntakeState {
  return createIntakeState(seed);
}

export function answeredCount(state: IntakeState): number {
  return INTAKE_QUESTION_IDS.filter((id) => isAnswered(id, state.answers)).length;
}

/** Build connector preferences from wizard answers, preserving chat-derived flags. */
export function buildPreferences(
  answers: IntakeAnswers,
  base: ConnectorPreferences = emptyPreferences
): ConnectorPreferences {
  const access = (answers.access ?? []).filter((need): need is AccessNeed => Boolean(need));
  return {
    ...base,
    goals: (answers.goals ?? []) as ConnectorGoal[],
    interests: (answers.interests ?? []) as ActivityInterest[],
    location: answers.location ?? base.location,
    language: answers.language ?? base.language,
    access: access.includes('none') ? [] : access,
    time: (answers.time ?? base.time) as TimePreference | null,
    nextStep: (answers.nextStep ?? base.nextStep) as NextStepChoice | null
  };
}

/**
 * The next question worth asking. Skips anything the chat or the wizard already
 * answered, so the assistant never repeats known information.
 */
export function nextUsefulQuestion(
  preferences: ConnectorPreferences,
  skipped: IntakeQuestionId[] = []
): IntakeQuestionId | null {
  for (const id of INTAKE_QUESTION_IDS) {
    if (skipped.includes(id)) continue;
    if (id === 'nextStep') continue; // offered separately as an action
    if (!isPreferencesAnswered(id, preferences)) return id;
  }
  return null;
}

export function isPreferencesAnswered(id: IntakeQuestionId, preferences: ConnectorPreferences): boolean {
  switch (id) {
    case 'goals':
      return preferences.goals.length > 0;
    case 'interests':
      return preferences.interests.length > 0;
    case 'location':
      return Boolean(preferences.location);
    case 'language':
      return Boolean(preferences.language);
    case 'access':
      return preferences.access.length > 0;
    case 'time':
      return preferences.time !== null;
    case 'nextStep':
      return preferences.nextStep !== null;
    default:
      return false;
  }
}

/** Turn the chat-derived preferences into wizard answers so nothing is re-asked. */
export function answersFromPreferences(preferences: ConnectorPreferences): IntakeAnswers {
  return {
    goals: preferences.goals.length > 0 ? preferences.goals : undefined,
    interests: preferences.interests.length > 0 ? preferences.interests : undefined,
    location: preferences.location ?? undefined,
    language: preferences.language ?? undefined,
    access: preferences.access.length > 0 ? preferences.access : undefined,
    time: preferences.time ?? undefined,
    nextStep: preferences.nextStep ?? undefined
  };
}

export function formatZipOrCity(location: LocationPreference | null, language: 'en' | 'es'): string {
  if (!location) return language === 'en' ? 'Not confirmed.' : 'No confirmado.';
  if (location.virtual && !location.city && !location.zip) {
    return language === 'en' ? 'Virtual' : 'Virtual';
  }
  const parts = [location.city, location.zip].filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : language === 'en' ? 'Virtual' : 'Virtual';
}
