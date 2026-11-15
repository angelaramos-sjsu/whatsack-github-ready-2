/**
 * Static + pure-router regression checks for the goal-first, scripted WhatSack pathways.
 * Run from repository root: node scripts/verify-education-pathways.mjs
 * This does not replace npm run build or real browser/accessibility testing.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const source = read('src/data/answers/educationGoalPathways.ts');
const beginning = source.indexOf('export const educationGoalPathwayAnswers: ScriptedAnswer[] = [');
assert.ok(beginning >= 0, 'Pathway answer registry missing');
const start = source.indexOf('= [', beginning) + 2;
const end = source.indexOf('];', start) + 1;
assert.ok(start >= 2 && end > start, 'Pathway answer list is not parsable');
const answers = JSON.parse(source.slice(start, end));
const idSet = new Set(answers.map((answer) => answer.id));
const historic = read('src/data/answers/saraCollegePathway.ts');
const registry = read('src/data/answers/index.ts');
const consoleSource = read('src/components/AILLMConsole.tsx');
const choicesSource = read('src/components/PathwayChoiceList.tsx');

assert.equal(answers.length, 22, 'Expected two entry points, 16 research answers and four complementary answers');
assert.equal(idSet.size, answers.length, 'Duplicate pathway answer ID');
assert.ok(historic.includes("transfer: 'ans-sara-transfer'"), 'Existing transfer journey must stay available');
assert.ok(registry.includes('...educationWorkforceAnswers'), 'Preserve original Education & Workforce Q&A');
assert.ok(registry.includes('...educationGoalPathwayAnswers'), 'Register new answers');
assert.ok(consoleSource.includes('<PathwayChoiceList'), 'Chat must render pathway selector');
assert.ok(consoleSource.includes('getScriptedAnswer(answerId)'), 'Buttons must resolve by approved answer ID');
assert.ok(consoleSource.includes('routeMateoSupportQuestion(text)'), 'Safety-first routing must be preserved');
assert.ok(choicesSource.includes('focus-visible:outline'), 'Choices must retain visible keyboard focus');

for (const answer of answers) {
  assert.ok(answer.question.en && answer.question.es, 'Every question needs both languages: ' + answer.id);
  assert.ok(answer.answer.en && answer.answer.es, 'Every answer needs both languages: ' + answer.id);
  const choices = answer.pathwayChoices ?? [];
  if (choices.length) {
    assert.equal(choices.length, 6, 'Each entry must have six distinct goal choices: ' + answer.id);
    assert.equal(new Set(choices.map((choice) => choice.id)).size, 6, 'Choice IDs must be unique: ' + answer.id);
    for (const choice of choices) {
      assert.ok(choice.label.en && choice.label.es, 'Choice needs English and Spanish label');
      assert.ok(idSet.has(choice.answerId) || choice.answerId === 'ans-sara-transfer', 'Broken choice: ' + choice.answerId);
    }
  } else {
    assert.ok(answer.nextStep?.detail.en && answer.nextStep?.detail.es, 'Missing bilingual NextStep: ' + answer.id);
    assert.ok(answer.nextStep?.actions?.length, 'NextStep action missing: ' + answer.id);
    assert.ok(answer.links?.length, 'Official sources missing: ' + answer.id);
    assert.ok(answer.links.every((link) => link.url.startsWith('https://')), 'Unapproved link: ' + answer.id);
  }
  for (const id of answer.followUpIds) {
    assert.ok(idSet.has(id), 'Broken follow-up from ' + answer.id + ' to ' + id);
  }
}

/** Execute only the plain-JavaScript body of a checked-in, locally authored pure router. */
const router = (name) => {
  const header = 'export const ' + name + ' = (input: string): string | undefined => {';
  const start = source.indexOf(header);
  assert.ok(start >= 0, 'Missing router: ' + name);
  const finish = source.indexOf('\n};', start);
  const body = source.slice(start + header.length, finish)
    .replace('const rules: Array<[RegExp, string]> = [', 'const rules = [');
  return new Function('input', body);
};
const broad = router('routeGoalExplorationQuestion');
const direct = router('routeGoalDetailQuestion');
const cases = [
  [broad, "I'm thinking about what to do after high school. What are my options?", 'ans-goal-sofia-entry'],
  [broad, "I'm graduating soon and don't know what to do next", 'ans-goal-sofia-entry'],
  [broad, "I don't know if I should go to college or work", 'ans-goal-sofia-entry'],
  [broad, "I recently lost my job. What options do I have for my next career move?", 'ans-goal-daniel-entry'],
  [broad, "I'm considering changing careers, but I don't know where to start", 'ans-goal-daniel-entry'],
  [broad, "Should I find another job or go back to school?", 'ans-goal-daniel-entry'],
  [broad, "I lost my job and need a job right away", undefined],
  [broad, "My family needs help with groceries", undefined],
  [direct, "Can I go straight to university from high school?", 'ans-pathway-sofia-s1'],
  [direct, "I'm 45 and can I go straight to university?", 'ans-pathway-daniel-d2'],
  [direct, "I have an IEP and want to attend university", 'ans-pathway-sofia-s7'],
  [direct, "Is there a paid apprenticeship where I can earn and learn?", 'ans-pathway-daniel-d4'],
  [direct, "Can I start my own business?", 'ans-pathway-daniel-d8']
];
for (const [run, input, expected] of cases) {
  assert.equal(run(input), expected, 'Wrong routing for: ' + input);
}
console.log('Education pathway checks passed:', answers.length, 'answers,',
  answers.filter((a) => a.pathwayChoices).reduce((n, a) => n + a.pathwayChoices.length, 0),
  'linked choices,', cases.length, 'sample routing cases.');
