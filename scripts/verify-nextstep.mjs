/**
 * Zero-dependency validation for the 103 scripted NextStep Insights.
 * Run: npm run verify:insights (no API key or network required).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const file = read('src/data/nextStepInsights.ts');
const start = 'export const nextStepInsightEntries: NextStepInsightEntry[] = ';
const end = '\n\nexport const nextStepById';
const startIndex = file.indexOf(start);
const endIndex = file.indexOf(end, startIndex);
if (startIndex < 0 || endIndex < 0) throw Error('Could not locate the insight catalog.');
const raw = file.slice(startIndex + start.length, endIndex).trim().replace(/;$/, '');
const entries = JSON.parse(raw);
const errors = [];
const check = (condition, error) => { if (!condition) errors.push(error); };
check(entries.length === 103, 'Expected 103 research-backed question entries.');
check(entries.filter(x => x.persona === 'Sofia').length === 44, 'Expected 44 Sofia entries.');
check(entries.filter(x => x.persona === 'Daniel').length === 59, 'Expected 59 Daniel entries.');
const ids = new Set();
for (const entry of entries) {
  check(!ids.has(entry.id), 'Duplicate question ID ' + entry.id);
  ids.add(entry.id);
  check(entry.id && entry.persona && entry.question && entry.insight && entry.actionLabel, 'Missing fields for ' + entry.id);
  check(Array.isArray(entry.sources) && entry.sources.length > 0, 'Missing official starting sources for ' + entry.id);
  for (const source of entry.sources || []) {
    let valid = false;
    try { valid = new URL(source.url).protocol === 'https:'; } catch {}
    check(valid, 'Non-HTTPS source in ' + entry.id);
  }
}
const routing = read('src/data/nextStepInsightsRouting.ts');
for (const [,id] of routing.matchAll(/['"]([SD][0-7]\.\d+)['"]/g)) {
  check(ids.has(id), 'Unresolved routing ID: ' + id);
}
const main = read('src/components/AILLMConsole.tsx');
const sofia = read('src/components/SofiaCollegeGuide.tsx');
const daniel = read('src/components/DanielTrainingGuide.tsx');
const extension = read('src/components/SimulatedExtensionSidebar.tsx');
check(main.includes('findNextStepInsight') && main.includes('NextStepInsightCard'), 'Copilot is not wired to insights.');
check(main.includes("Try {persona}'s researched questions"), 'Copilot test question browser is missing.');
check(!main.includes("fetch('/api/sofia-chat'"), 'Copilot is attempting to call the optional paid LLM API.');
check(sofia.includes("selectGuidedInsights('Sofia'") && sofia.includes('NextStepInsightCard'), 'Sofia guided insights are missing.');
check(daniel.includes("selectGuidedInsights('Daniel'") && daniel.includes("id: 'immediate'"), 'Daniel guided insights or immediate employment branch are missing.');
check(extension.includes('activeExtensionInsight') && extension.includes('NextStepInsightCard'), 'Extension preview is missing insights.');
if (errors.length > 0) {
  for (const error of errors) console.error('ERROR: ' + error);
  process.exitCode = 1;
} else {
  const links = entries.reduce((count,entry) => count + entry.sources.length, 0);
  console.log('Passed: 103 distinct research-backed questions (44 Sofia, 59 Daniel), ' + links + ' source links, guided and Copilot wiring. No paid API required.');
}
