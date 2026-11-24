import { entryAnswers } from './entry';
import { fafsaBasicsAnswers } from './fafsaBasics';
import { collegeOptionAnswers, routeCollegeOptionsQuestion } from './collegeOptions';
import { crossCategoryDiscoveryAnswers } from './crossCategoryDiscovery';
import { educationGoalPathwayAnswers, routeGoalExplorationQuestion, routeGoalDetailQuestion } from './educationGoalPathways';
import { educationWorkforceAnswers, routeEducationWorkforceQuestion } from './educationWorkforce';
import { bilingualFoodAnswers, routeBilingualFoodQuestion, isSpanishBilingualFoodQuestion } from './foodBilingual';
import { foodEnhancementAnswers } from './foodEnhancements';
import { mentalHealthAccessAnswers, routeMentalHealthAccessQuestion } from './mentalHealthAccess';
import { programFollowUpAnswers } from './followUpsPrograms';
import { supportFollowUpAnswers } from './followUpsSupport';
import { routeSaraCollegeQuestion, saraCollegePathwayAnswers, saraCollegeStageIds } from './saraCollegePathway';
import { attachSourcedNextSteps } from './nextStepOptions';
import type { AnswerTopic, BilingualText, ScriptedAnswer } from './types';

export type { AnswerTopic, BilingualText, NextStepMeta, OfficialResourceLink, ScriptedAction, ScriptedAnswer, ScriptedNextStep, SavedScriptedStep, GoalPathwayChoice } from './types';
export { routeSaraCollegeQuestion, saraCollegeStageIds, routeEducationWorkforceQuestion, routeGoalExplorationQuestion, routeGoalDetailQuestion };
export { routeBilingualFoodQuestion, isSpanishBilingualFoodQuestion };
export { routeMentalHealthAccessQuestion };
export { routeCollegeOptionsQuestion };

/** Every approved scripted answer, keyed by its unique id. */
export const scriptedAnswers: ScriptedAnswer[] = attachSourcedNextSteps([
  ...entryAnswers,
  ...crossCategoryDiscoveryAnswers,
  ...educationWorkforceAnswers,
  ...fafsaBasicsAnswers,
  ...educationGoalPathwayAnswers,
  ...programFollowUpAnswers,
  ...bilingualFoodAnswers,
  ...foodEnhancementAnswers,
  ...mentalHealthAccessAnswers,
  ...collegeOptionAnswers,
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
    en: "I don't have an answer to that question just yet, but I can still help you explore your options!\n\nTell me a little about what you need using our Find My Support form. We'll help you explore available resources.",
    es: "Todavía no tengo una respuesta a esa pregunta, ¡pero puedo ayudarte a explorar tus opciones!\n\nCuéntame un poco sobre lo que necesitas mediante nuestro formulario Encuentra mi apoyo. Te ayudaremos a explorar los recursos disponibles."
  },
  context: [],
  followUpIds: []
});
