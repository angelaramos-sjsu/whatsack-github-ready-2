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
  ['My dad is 74 and has trouble leaving home. Are there home-delivered meal options?', 'ans-food-es-home-delivery'],
  ['I need formula for my baby. Where can I ask for help?', 'ans-food-es-infant-formula'],
  ['I work weekdays. How do I find food on Saturdays?', 'ans-food-es-saturday']
];
const expectedUrls = {
  'ans-food-es-family-groceries': ['https://www.shfb.org/get-food/'],
  'ans-food-es-calfresh-help': ['https://www.shfb.org/get-food/calfresh/', 'https://benefitscal.com/'],
  'ans-food-es-calfresh-self': ['https://benefitscal.com/', 'https://www.shfb.org/get-food/calfresh/'],
  'ans-food-es-no-id': ['https://www.shfb.org/get-food/'],
  'ans-food-es-home-delivery': [
    'https://ssa.santaclaracounty.gov/food-assistance/meals-older-adults/get-meals-delivered-your-home',
    'https://www.smcgov.org/hsa/food-resources'
  ],
  'ans-food-es-infant-formula': ['https://publichealth.sccgov.org/services/women-infants-and-children-wic'],
  'ans-food-es-saturday': ['https://www.shfb.org/get-food/']
};
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
  assert.equal(isSpanishBilingualFoodQuestion(question), false, 'English questions should remain English');
}
for (const answer of bilingualFoodAnswers) {
  assert(answer.answer.en && answer.answer.es, `Missing translation: ${answer.id}`);
  assert.deepEqual(
    answer.links?.map((link) => link.url),
    expectedUrls[answer.id],
    `Unexpected/missing official resource URLs: ${answer.id}`
  );
  assert(answer.nextStep?.actions.some((action) => action.kind === 'open-link'), `Missing clickable NextStep: ${answer.id}`);
  for (const followUp of answer.followUpIds) {
    assert(ids.has(followUp), `Broken follow-up: ${answer.id} -> ${followUp}`);
  }
}

const byId = new Map(bilingualFoodAnswers.map((answer) => [answer.id, answer]));
for (const [question, expectedId] of [...cases, ...englishCases]) {
  const answer = byId.get(routeBilingualFoodQuestion(question));
  assert(answer, `No answer record for: ${question}`);
  assert.equal(answer.id, expectedId, `Wrong answer record for: ${question}`);
  for (const url of expectedUrls[expectedId]) {
    assert(answer.links.some((link) => link.url === url), `Required visible resource link missing for ${question}: ${url}`);
  }
}

const variations = [
  ['Vivo en San Jose y necesito comida para mi familia, ¿dónde consigo ayuda?', 'ans-food-es-family-groceries'],
  ['Can somebody help me apply for CalFresh for the first time?', 'ans-food-es-calfresh-help'],
  ['I want to apply for CalFresh on my own', 'ans-food-es-calfresh-self'],
  ["I don't have ID; can I get food?", 'ans-food-es-no-id'],
  ['My father cannot leave home. Are meals delivered?', 'ans-food-es-home-delivery'],
  ['Necesito WIC y formula para mi bebe', 'ans-food-es-infant-formula'],
  ['I need a Saturday food distribution', 'ans-food-es-saturday']
];
for (const [question, expectedId] of variations) {
  assert.equal(routeBilingualFoodQuestion(question), expectedId, `Wording variation failed: ${question}`);
}

assert.match(byId.get('ans-food-es-no-id').answer.en, /some locations may not require ID/i);
assert.match(byId.get('ans-food-es-no-id').answer.es, /algunos sitios pueden no pedir identificación/i);
assert.match(byId.get('ans-food-es-infant-formula').answer.en, /eligible families with infants and young children/i);
assert.match(byId.get('ans-food-es-infant-formula').answer.es, /familias elegibles con bebés y niños pequeños/i);
assert.match(byId.get('ans-food-es-home-delivery').answer.es, /¿En qué condado vive tu papá: Santa Clara o San Mateo\?/);
assert.equal(routeBilingualFoodQuestion('How do I transfer to a UC?'), undefined);
console.log('Passed: 7 exact Spanish + 7 exact English prompts, wording variations, answer content, official URLs, and NextStep/follow-up references.');
