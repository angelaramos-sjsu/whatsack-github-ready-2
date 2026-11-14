/**
 * Node 22+ scripted food/resource-routing checks (no AI API or paid tools).
 * Run from the repository root:
 *   node --experimental-strip-types scripts/verify-food-enhancements.mjs
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { entryAnswers } from '../src/data/answers/entry.ts';
import { bilingualFoodAnswers, routeBilingualFoodQuestion } from '../src/data/answers/foodBilingual.ts';
import {
  foodEnhancementAnswers, routeFoodEnhancement, detectSupportedNeeds,
  mentionsHousing, isSpanishResourceQuestion, buildCombinedNeedsAnswer
} from '../src/data/answers/foodEnhancements.ts';

const assertRoute = (question, expected, priorQuestion) =>
  assert.equal(routeFoodEnhancement(question, priorQuestion), expected, question);

assertRoute("Can you do it for me?", 'ans-food-application-clarify');
assertRoute("Can you do it for me?", 'ans-food-calfresh-no-submission',
  "I've never applied for CalFresh. Can someone help me?");
assertRoute("Can you apply for me?", 'ans-food-calfresh-no-submission',
  "Can someone help me apply for CalFresh?");
assertRoute("Can you do it for me?", 'ans-food-application-clarify',
  "I'm looking for CalFresh and job training.");
assertRoute("Will you submit my CalFresh application?", 'ans-food-calfresh-no-submission');
assertRoute("¿Puedes hacerlo por mí?", 'ans-food-calfresh-no-submission',
  "Nunca he solicitado CalFresh. ¿Alguien puede ayudarme?");

assertRoute('Do I qualify for CalFresh if I make $2,500 a month?', 'ans-food-calfresh-eligibility');
assertRoute('Am I eligible for food stamps?', 'ans-food-calfresh-eligibility');
assertRoute('Can college students receive CalFresh?', 'ans-food-calfresh-eligibility');
assertRoute("What's the income limit for a family of four?", 'ans-food-calfresh-eligibility');
assertRoute('¿Califico para CalFresh si gano $2,500?', 'ans-food-calfresh-eligibility');
assertRoute('Can someone help me apply for CalFresh?', undefined);
assert.equal(routeBilingualFoodQuestion('Can someone help me apply for CalFresh?'), 'ans-food-es-calfresh-help');

const expectedNeeds = [
  ['I need food and education resources.', ['food', 'college']],
  ["I'm looking for counseling and job training.", ['work', 'mental']],
  ['I need groceries and help finding a job.', ['food', 'work']],
  ['I need help with food and school.', ['food', 'college']],
  ["I don't need food, just counseling.", ['mental']],
  ['Necesito ayuda con CalFresh y capacitación laboral.', ['food', 'work']],
  ['No necesito comida, solo consejería.', ['mental']],
  ['I need help paying rent.', []],
  ['I need community activities and food.', ['food', 'community']]
];
for (const [question, expected] of expectedNeeds) {
  assert.deepEqual(detectSupportedNeeds(question), expected, question);
}
assert.equal(isSpanishResourceQuestion('Necesito ayuda con CalFresh y capacitación laboral.'), true);
assert.equal(isSpanishResourceQuestion('I need food and job training.'), false);
assert.equal(mentionsHousing('I need help paying rent.'), true);

const approved = new Map([...entryAnswers, ...bilingualFoodAnswers].map((answer) => [answer.id, answer]));
for (const needs of [['food', 'college'], ['food', 'work'], ['work', 'mental'], ['food', 'community']]) {
  const combined = buildCombinedNeedsAnswer(needs, (id) => approved.get(id));
  assert(combined, 'Missing approved source answer for ' + needs.join('/'));
  assert.equal(combined.nextSteps.length, 2, 'One saveable NextStep per supported category');
  assert.equal(combined.resourceIds.length, 0, 'Do not misrepresent demo placeholders as live official organizations');
  assert(combined.links.length >= 2, 'Missing official links for combined categories');
  assert(combined.answer.en.includes('**') && combined.answer.es.includes('**'), 'Missing category headings');
  assert(combined.nextSteps.every((step) => step.actions.some((action) => action.kind === 'open-link')));
}
const mixedHousing = buildCombinedNeedsAnswer(['food'], (id) => approved.get(id), true);
assert.match(mixedHousing.answer.en, /housing assistance is outside/i);
assert.match(mixedHousing.answer.es, /vivienda/i);
assert(mixedHousing.links.every((link) => !/housing|rent/i.test(link.label.en)));

const allIds = new Set([...entryAnswers, ...bilingualFoodAnswers, ...foodEnhancementAnswers].map((answer) => answer.id));
for (const answer of foodEnhancementAnswers) {
  assert(answer.answer.en && answer.answer.es, 'Bilingual text missing: ' + answer.id);
  assert.equal(answer.links?.every((link) => /^https:\/\//.test(link.url)), true);
  for (const id of answer.followUpIds) assert(allIds.has(id), 'Broken follow-up: ' + answer.id + ' -> ' + id);
}
assert.equal(allIds.size, entryAnswers.length + bilingualFoodAnswers.length + foodEnhancementAnswers.length, 'Duplicate IDs');

const consoleCode = readFileSync('src/components/AILLMConsole.tsx', 'utf8');
assert(consoleCode.indexOf('const answer = mateoAnswerId') < consoleCode.indexOf('      : enhancedId'), 'Mateo safety route must stay first');
assert.match(consoleCode, /const topic = excludesNeed && needs.length === 1 \? needs\[0\]/);
assert.match(consoleCode, /buildCombinedNeedsAnswer\(needs, getScriptedAnswer, housingRequested\)/);
assert.match(consoleCode, /prev\.filter\(\(msg\) => msg\.id !== userMsgId\)/);

console.log('PASS: CalFresh context and ambiguity, application boundaries, eligibility, bilingual routes,');
console.log('      negated needs, combined official sources, separate saveable NextSteps,');
console.log('      answered follow-ups and Mateo safety-routing precedence.');
