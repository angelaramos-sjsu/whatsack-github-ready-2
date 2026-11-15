/**
 * Audits non-presumptive, opt-in cross-category discovery.
 *
 * Run: node --experimental-strip-types scripts/verify-cross-category-discovery.mjs
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  crossCategoryDiscoveryAnswers, canExploreOtherSupport,
  getOtherSupportAreas, supportAreaOptions
} from '../src/data/answers/crossCategoryDiscovery.ts';
import { entryAnswers } from '../src/data/answers/entry.ts';
import { educationGoalPathwayAnswers } from '../src/data/answers/educationGoalPathways.ts';
import { supportFollowUpAnswers } from '../src/data/answers/followUpsSupport.ts';

const byId = new Map([
  ...entryAnswers,
  ...educationGoalPathwayAnswers,
  ...supportFollowUpAnswers,
  ...crossCategoryDiscoveryAnswers
].map((answer) => [answer.id, answer]));
assert.equal(crossCategoryDiscoveryAnswers.length, 4);
assert.deepEqual(supportAreaOptions.map((area) => area.id), ['food', 'education', 'mental', 'community']);

for (const option of supportAreaOptions) {
  const answer = byId.get(option.answerId);
  assert(answer, 'Missing approved overview: ' + option.answerId);
  assert(option.label.en && option.label.es, 'Bilingual category labels are required');
  assert(answer.answer.en && answer.answer.es, 'Bilingual overview is required');
  assert(answer.links.length >= 1, 'Overview needs official resource links: ' + answer.id);
  assert(answer.links.every((link) => /^https:\/\//.test(link.url)), 'Invalid official link');
  assert(answer.nextStep.actions.some((action) => action.kind === 'open-link'),
    'Overview must provide an official next step: ' + answer.id);
  assert(!/you (must|should|need) (?:get|seek) (?:therapy|food|training)/i.test(answer.answer.en),
    'Overview must not assume a visitor needs a particular service');
}
const areas = (answer) => getOtherSupportAreas(answer).map((option) => option.id);
assert.deepEqual(areas(byId.get('ans-goal-sofia-entry')), ['food', 'mental', 'community']);
assert.deepEqual(areas(byId.get('ans-goal-daniel-entry')), ['food', 'mental', 'community']);
assert.deepEqual(areas(byId.get('ans-discovery-food')), ['education', 'mental', 'community']);
assert.deepEqual(areas(byId.get('ans-discovery-mental')), ['food', 'education', 'community']);
assert.deepEqual(areas(byId.get('ans-discovery-community')), ['food', 'education', 'mental']);
assert.deepEqual(areas(byId.get('ans-discovery-education-workforce')), ['food', 'mental', 'community']);

const both = {
  ...byId.get('ans-discovery-food'),
  needSuggestions: [{ id: 'food' }, { id: 'college' }]
};
assert.deepEqual(areas(both), ['mental', 'community'],
  'Multi-need answers must not re-offer either already requested category');
assert.deepEqual(areas({ ...both, needSuggestions: [{ id: 'food' }, { id: 'work' }, { id: 'mental' }] }),
  ['community'], 'All three requested categories should be omitted');
assert.equal(canExploreOtherSupport(byId.get('ans-goal-sofia-entry')), false,
  'Do not distract from the existing six-goal chooser');
assert.equal(canExploreOtherSupport(byId.get('ans-goal-daniel-entry')), false);
assert.equal(canExploreOtherSupport(byId.get('ans-mental-crisis-support')), false,
  'Never distract from a crisis response');
assert.equal(canExploreOtherSupport(byId.get('ans-mental-parent-consent')), false,
  'Do not insert unrelated resource navigation into a sensitive privacy response');
assert.equal(canExploreOtherSupport({ ...byId.get('ans-discovery-food'), topic: 'fallback' }), false,
  'An unrecognized question should not get an assumed resource match');
assert.equal(canExploreOtherSupport({ ...byId.get('ans-discovery-food'), topic: 'roleplay' }), false);
assert.equal(canExploreOtherSupport(byId.get('ans-discovery-food')), true);

const chat = readFileSync('src/components/AILLMConsole.tsx', 'utf8');
const panel = readFileSync('src/components/ExploreOtherSupport.tsx', 'utf8');
const registry = readFileSync('src/data/answers/index.ts', 'utf8');
assert(chat.includes('isLlm && isLatestReply && msg.scriptedAnswer && canExploreOtherSupport(msg.scriptedAnswer)'),
  'Only the latest approved normal reply should show other support');
assert(chat.includes('getOtherSupportAreas(msg.scriptedAnswer)'), 'Existing category must be excluded');
assert(chat.indexOf('getRelevantFollowUpIds(msg.scriptedAnswer)') < chat.indexOf('<ExploreOtherSupport'),
  'Cross-category discovery must follow relevant same-topic follow-up questions');
assert(chat.includes('getScriptedAnswer(answerId)'), 'Clicks must resolve real scripted answers');
assert(chat.includes('handleOtherSupportSelection(answerId, label'), 'Click must wire to a choice handler');
assert(registry.includes('...crossCategoryDiscoveryAnswers'), 'Overviews must be in the answer registry');
assert(panel.includes('aria-expanded={expanded}') && panel.includes('aria-controls={panelId}'),
  'The collapsed toggle must be keyboard/screen-reader accessible');
assert(panel.includes('hidden={!expanded}') && panel.includes('setExpanded(false)') === false,
  'The panel must initially remain collapsed until the user chooses to explore');
assert(panel.includes('onSelect(area.answerId, area.label[currentLanguage])'),
  'Each category option must link to the correct approved overview');

console.log('PASS: four bilingual neutral overviews, official sources, optional collapsed controls,');
console.log('      no crisis/safety interruption, no repeated needs, preserved same-topic follow-ups.');
