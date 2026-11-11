/**
 * Check the bilingual food-answer routing without a paid AI API or test runner.
 * Run from the repository root with Node.js 22+:
 *   node --experimental-strip-types scripts/verify-bilingual-food.mjs
 */
import assert from 'node:assert/strict';
import {
  bilingualFoodAnswers,
  routeBilingualFoodQuestion,
  isSpanishBilingualFoodQuestion
} from '../src/data/answers/foodBilingual.ts';

const cases = [
  ['Vivo en San José y necesito comida para mi familia. ¿Dónde puedo conseguir ayuda?', 'ans-food-es-family-groceries'],
  ['Nunca he solicitado CalFresh. ¿Alguien puede ayudarme?', 'ans-food-es-calfresh-help'],
  ['Quiero solicitar CalFresh por mi cuenta. ¿Dónde empiezo?', 'ans-food-es-calfresh-self'],
  ['No tengo identificación. ¿Puedo recibir comida?', 'ans-food-es-no-id'],
  ['Mi papá tiene 74 años y le cuesta salir de casa. ¿Hay opciones de comida a domicilio?', 'ans-food-es-home-delivery'],
  ['Necesito fórmula para mi bebé. ¿Dónde puedo pedir ayuda?', 'ans-food-es-infant-formula'],
  ['Trabajo entre semana. ¿Cómo encuentro comida los sábados?', 'ans-food-es-saturday']
];
const englishCases = [
  ['I live in San Jose and need food for my family. Where can I get help?', 'ans-food-es-family-groceries'],
  ["I've never applied for CalFresh. Can someone help me?", 'ans-food-es-calfresh-help'],
  ['I want to apply for CalFresh myself. Where do I start?', 'ans-food-es-calfresh-self'],
  ["I don't have identification. Can I receive food?", 'ans-food-es-no-id'],
  ['My dad is 74 and has trouble leaving home. Are home-delivered meals available?', 'ans-food-es-home-delivery'],
  ['I need formula for my baby. Where can I ask for help?', 'ans-food-es-infant-formula'],
  ['I work weekdays. How can I find food on Saturdays?', 'ans-food-es-saturday']
];
const ids = new Set(bilingualFoodAnswers.map((answer) => answer.id));
assert.equal(bilingualFoodAnswers.length, 7, 'Expected exactly seven bilingual food journeys');
assert.equal(ids.size, bilingualFoodAnswers.length, 'Duplicate answer IDs');
for (const [question, expected] of cases) {
  assert.equal(routeBilingualFoodQuestion(question), expected, question);
  assert.equal(isSpanishBilingualFoodQuestion(question), true, 'Should reply in Spanish');
  // Accents should not be required for routing.
  const withoutAccents = question.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  assert.equal(routeBilingualFoodQuestion(withoutAccents), expected, 'Accent-insensitive routing');
}
for (const [question, expected] of englishCases) {
  assert.equal(routeBilingualFoodQuestion(question), expected, question);
}
for (const answer of bilingualFoodAnswers) {
  assert(answer.answer.en && answer.answer.es, `Missing translation: ${answer.id}`);
  assert(answer.links?.length, `Missing official link: ${answer.id}`);
  assert(answer.nextStep?.actions.length, `Missing actionable NextStep: ${answer.id}`);
  for (const followUp of answer.followUpIds) {
    assert(ids.has(followUp), `Broken follow-up: ${answer.id} -> ${followUp}`);
  }
}
assert.equal(routeBilingualFoodQuestion('How do I transfer to a UC?'), undefined);
console.log('Passed: 7 Spanish questions + 7 English equivalents, links, and follow-ups.');
