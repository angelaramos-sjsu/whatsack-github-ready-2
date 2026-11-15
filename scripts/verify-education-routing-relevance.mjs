/**
 * Complete 72-question Education & Workforce routing and follow-up audit.
 *
 * Run from the repository root on Node 22+:
 *   node --experimental-strip-types scripts/verify-education-routing-relevance.mjs
 *
 * This is a script/data regression check, not a replacement for the Vite build
 * or browser accessibility and interaction testing.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { educationWorkforceAnswers, routeEducationWorkforceQuestion } from '../src/data/answers/educationWorkforce.ts';
import { educationGoalPathwayAnswers, routeGoalDetailQuestion, routeGoalExplorationQuestion } from '../src/data/answers/educationGoalPathways.ts';
import { saraCollegePathwayAnswers } from '../src/data/answers/saraCollegePathway.ts';
import { entryAnswers } from '../src/data/answers/entry.ts';
import { programFollowUpAnswers } from '../src/data/answers/followUpsPrograms.ts';
import { supportFollowUpAnswers } from '../src/data/answers/followUpsSupport.ts';
import { bilingualFoodAnswers } from '../src/data/answers/foodBilingual.ts';
import { foodEnhancementAnswers, buildCombinedNeedsAnswer, detectSupportedNeeds } from '../src/data/answers/foodEnhancements.ts';
import { getRelevantFollowUpIds } from '../src/data/answers/relevantFollowUps.ts';

const all = [
  ...entryAnswers,
  ...educationWorkforceAnswers,
  ...educationGoalPathwayAnswers,
  ...programFollowUpAnswers,
  ...supportFollowUpAnswers,
  ...bilingualFoodAnswers,
  ...foodEnhancementAnswers,
  ...saraCollegePathwayAnswers
];
const normalize = (q) => q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[’‘]/g, "'").replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
const allById = new Map(all.map((answer) => [answer.id, answer]));
const allByQuestion = new Map();

assert.equal(allById.size, all.length, 'All scripted IDs must be unique');
assert.equal(all.length, 107, 'Expected 107 registered scripts');
for (const answer of all) {
  for (const lang of ['en', 'es']) {
    const norm = normalize(answer.question[lang]);
    const prior = allByQuestion.get(norm);
    // We only test unique exact English/Spanish texts when they are actually
    // distinct. Translation pairs may normalize to the same string.
    if (norm && prior && prior.id !== answer.id)
      throw Error('Different scripts share exact question: ' + answer.question[lang]);
    if (norm) allByQuestion.set(norm, answer);
  }
}
const education = all.filter((answer) => ['college', 'work'].includes(answer.topic));
assert.equal(education.length, 72, 'Expected 39 education and 33 workforce scripts');
assert.equal(education.filter((answer) => answer.topic === 'college').length, 39);
assert.equal(education.filter((answer) => answer.topic === 'work').length, 33);

let matchedQuestions = 0;
for (const answer of education) {
  assert.equal(allByQuestion.get(normalize(answer.question.en))?.id, answer.id,
    'Wrong exact-answer selection: ' + answer.question.en);
  matchedQuestions++;
  const followUps = getRelevantFollowUpIds(answer);
  assert(followUps.length <= 3, 'Too many next questions on: ' + answer.id);
  assert.equal(new Set(followUps).size, followUps.length, 'Repeated follow-up: ' + answer.id);
  assert(!followUps.includes(answer.id), 'Answer suggests itself: ' + answer.id);
  for (const id of followUps) {
    assert(allById.has(id), 'Broken follow-up: ' + answer.id + ' -> ' + id);
    assert(['college', 'work'].includes(allById.get(id).topic),
      'Unrelated topic suggested from Education & Workforce: ' + answer.id + ' -> ' + id);
  }
  if (!answer.pathwayChoices?.length)
    assert(followUps.length >= 1, 'Missing relevant next question: ' + answer.id);
  if (answer.pathwayChoices?.length)
    assert.equal(followUps.length, 0, 'Goal choosers must not duplicate their own six buttons');
}
const wrongEarlier = [
  "What happens after I apply to community college? How do I register for classes?",
  "Do I have to start at community college, or can I go straight to a university?",
  "What's the difference between attending a community college, CSU, UC, or private university?",
  "Can I go directly to a four-year university instead of community college?",
  "If I start at a community college, can I transfer to San José State or a UC?",
  "Is community college actually free? What about books and everything else?"
];
for (const q of wrongEarlier) {
  assert.equal(detectSupportedNeeds(q).length, 1, '"community college" triggered multiple needs: ' + q);
  assert(allByQuestion.has(normalize(q)), 'Exact answer missing: ' + q);
}
assert.deepEqual(detectSupportedNeeds('I need education and food resources.'), ['food', 'college']);
assert.deepEqual(detectSupportedNeeds('I need food and job training resources.'), ['food', 'work']);
assert.deepEqual(detectSupportedNeeds('I need counseling and job training resources.'), ['work', 'mental']);
assert.deepEqual(detectSupportedNeeds("I don't need food, just counseling."), ['mental']);

const foodEducation = buildCombinedNeedsAnswer(
  detectSupportedNeeds('I need education and food resources.'),
  (id) => allById.get(id)
);
assert.deepEqual(foodEducation.needSuggestions.map(({ id }) => id), ['food', 'college']);
assert(foodEducation.needSuggestions.every((suggestion) => suggestion.links.length && suggestion.nextStep),
  'Multi-need support must retain one separately sourced and saveable step per area');

assert.equal(routeGoalExplorationQuestion("I'm thinking about what to do after high school. What are my options?"), 'ans-goal-sofia-entry');
assert.equal(routeGoalExplorationQuestion("I recently lost my job. What options do I have for my next career move?"), 'ans-goal-daniel-entry');
assert.equal(routeEducationWorkforceQuestion("I need a job right away. Where can I get help before I enroll in training?"), 'ans-ew-d7');
assert.equal(routeGoalDetailQuestion("Can I go straight to university from high school?"), 'ans-pathway-sofia-s1');

const consoleCode = readFileSync('src/components/AILLMConsole.tsx', 'utf8');
const routeBlock = consoleCode.slice(consoleCode.indexOf('    const answer = mateoAnswerId'),
  consoleCode.indexOf('    // No approved answer exists'));
const idx = (piece) => {
  const i = routeBlock.indexOf(piece);
  assert(i !== -1, 'Missing routed answer branch: ' + piece);
  return i;
};
assert(idx('const answer = mateoAnswerId') < idx(': enhancedId'), 'Safety route first');
assert(idx(': enhancedId') < idx(': exactScriptedAnswer'), 'CalFresh delegation/eligibility before exact lookup');
assert(idx(': exactScriptedAnswer') < idx(': combinedAnswer'), 'Exact reviewed script must beat category composition');
assert(idx(': educationAnswerId') < idx(': goalExplorationId'), 'Specific education answers beat broad exploration');
assert(consoleCode.includes('getRelevantFollowUpIds(msg.scriptedAnswer)'), 'Render curated suggestions for each answer');
assert(consoleCode.includes('isLatestReply && !msg.scriptedAnswer?.pathwayChoices?.length'),
  'Avoid redundant intake buttons on older answers and active goal choosers');
assert(consoleCode.includes('&& /(?:text|message|sms|988|hotline'),
  'School messaging privacy needs a messaging/counseling context');

const fia = getRelevantFollowUpIds(allById.get('ans-pathway-sofia-s3'));
assert(fia.includes('ans-college-fafsa-vs-cadaa'), 'University affordability must lead to relevant aid questions');
const job = getRelevantFollowUpIds(allById.get('ans-ew-d7'));
assert(job.includes('ans-ew-support-resume') && job.includes('ans-ew-support-ajcc'),
  'Immediate employment must lead to job-center and résumé support');
const med = getRelevantFollowUpIds(allById.get('ans-ew-s4'));
assert(!med.includes('ans-ew-s5'), 'College registration must not suggest high-school dual enrollment by default');

console.log('PASS: 107 registered scripts, all 72 exact Education & Workforce questions,');
console.log('      correct routing priority, six former community-college false matches,');
console.log('      curated, valid, relevant next questions, approved multi-need cards,');
console.log('      school privacy scope and preserved goal-based pathways.');
