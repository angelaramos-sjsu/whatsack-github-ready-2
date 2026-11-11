import { entryAnswers } from './entry';
import { bilingualFoodAnswers, routeBilingualFoodQuestion, isSpanishBilingualFoodQuestion } from './foodBilingual';
import { programFollowUpAnswers } from './followUpsPrograms';
import { supportFollowUpAnswers } from './followUpsSupport';
import { routeSaraCollegeQuestion, saraCollegePathwayAnswers, saraCollegeStageIds } from './saraCollegePathway';
import { attachSourcedNextSteps } from './nextStepOptions';
import type { AnswerTopic, BilingualText, ScriptedAnswer } from './types';

export type { AnswerTopic, BilingualText, NextStepMeta, OfficialResourceLink, ScriptedAction, ScriptedAnswer, ScriptedNextStep, SavedScriptedStep } from './types';
export { routeSaraCollegeQuestion, saraCollegeStageIds };
export { routeBilingualFoodQuestion, isSpanishBilingualFoodQuestion };

/** Every approved scripted answer, keyed by its unique id. */
export const scriptedAnswers: ScriptedAnswer[] = attachSourcedNextSteps([
  ...entryAnswers,
  ...programFollowUpAnswers,
  ...bilingualFoodAnswers,
  ...supportFollowUpAnswers,
  ...saraCollegePathwayAnswers
]);

const answersById = new Map(scriptedAnswers.map((answer) => [answer.id, answer]));

export const getScriptedAnswer = (id: string): ScriptedAnswer | undefined => answersById.get(id);

const normalizeScriptedQuestion = (question: string): string =>
  question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'").replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');

/** Match a submitted question to a reviewed answer before broad topic detection. */
export const findScriptedAnswerByQuestion = (question: string): ScriptedAnswer | undefined => {
  const normalizedQuestion = normalizeScriptedQuestion(question);
  return scriptedAnswers.find((answer) =>
    normalizeScriptedQuestion(answer.question.en) === normalizedQuestion ||
    normalizeScriptedQuestion(answer.question.es) === normalizedQuestion
  );
};

/** The approved entry answer for each topic. */
export const topicEntryAnswerIds: Record<AnswerTopic, string> = {
  food: 'ans-food-east-sj-groceries',
  work: 'ans-work-tech-certificates',
  college: 'ans-college-tuition-free',
  mental: 'ans-mental-confidential-teens',
  senior: 'ans-senior-cultural-circles',
  community: 'ans-community-connections',
  roleplay: 'ans-roleplay-intake-open'
};

/**
 * Resolve follow-up ids to the answers that actually exist.
 * Anything without an implemented answer is silently left out, so the chatbot
 * never shows a button that leads nowhere.
 */
export const resolveFollowUps = (ids: string[]): ScriptedAnswer[] =>
  ids
    .map((id) => getScriptedAnswer(id))
    .filter((answer): answer is ScriptedAnswer => answer !== undefined);

/** Honest reply when the prototype has no approved answer for a question. */
export const buildUnscriptedFallback = (question: BilingualText): ScriptedAnswer => ({
  id: 'ans-fallback-unscripted',
  topic: 'fallback',
  question,
  answer: {
    en: `I don't have an approved scripted answer for that exact question yet, so I won't guess.

This prototype only replies with reviewed answers. Here is what I can answer reliably right now — choose one of the questions below.`,
    es: `Todavía no tengo una respuesta guionizada aprobada para esa pregunta exacta, así que no voy a adivinar.

Este prototipo solo responde con respuestas revisadas. Esto es lo que sí puedo responder con certeza ahora: elige una de las preguntas de abajo.`
  },
  context: [],
  followUpIds: [
    topicEntryAnswerIds.food,
    topicEntryAnswerIds.work,
    topicEntryAnswerIds.college,
    topicEntryAnswerIds.mental
  ]
});
