import { getNextStepInsight, nextStepInsightEntries, type InsightPersona, type NextStepInsightEntry } from './nextStepInsights';

/**
 * Deterministic prototype matching: no live AI, network calls or stored user data.
 * Exact matrix questions are guaranteed to match. Paraphrases require multiple
 * distinctive overlapping terms; uncertain wording shows normal scripted guidance.
 */
export function normalizeInsightQuestion(value: string): string {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'").replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

const stop = new Set(
  'a an and are as at be been but by can could do does for from get got had has have how i in into is it its me my of on or our should so than that the them there these they this to us was were what when where which who why will with would you your if im ive am not just now ever about any all real even'.split(' ')
);

const aliases: Record<string,string> = {
  fafsa: 'fafsa',
  ssn: 'social',
  ui: 'unemployment',
  mdp: 'tesla',
  ssba: 'semiconductor',
  ctb: 'training',
  jobs: 'job',
  classes: 'class',
  applications: 'application',
  colleges: 'college',
  scholarships: 'scholarship',
  loans: 'loan',
  costs: 'cost',
  grants: 'grant',
  certificates: 'certificate',
  parents: 'parent',
  seniors: 'senior',
  workers: 'worker',
  benefits: 'benefit',
  programs: 'program',
  requirements: 'requirement'
};

function tokens(value: string): Set<string> {
  const all = normalizeInsightQuestion(value).split(' ').filter(Boolean);
  const found = new Set<string>();
  for (const word of all) {
    if (word.length < 3 || stop.has(word)) continue;
    const canonical = aliases[word] || (word.endsWith('s') && word.length > 4 ? word.slice(0,-1) : word);
    if (!stop.has(canonical)) found.add(canonical);
  }
  return found;
}

export interface MatchedInsight {
  entry: NextStepInsightEntry;
  score: number;
}

export function findNextStepInsight(question: string, persona?: InsightPersona): MatchedInsight | null {
  const normalized = normalizeInsightQuestion(question);
  if (!normalized) return null;
  const pool = persona ? nextStepInsightEntries.filter(entry => entry.persona === persona) : nextStepInsightEntries;

  const exact = pool.find(entry => normalizeInsightQuestion(entry.question) === normalized);
  if (exact) return { entry: exact, score: 1 };

  // The guided Copilot passes a longer selected-pathway description. Recognize
  // an intact original question within that context, but never trust it as live verification.
  const embedded = pool.find(entry => {
    const target = normalizeInsightQuestion(entry.question);
    return target.length >= 36 && normalized.includes(target);
  });
  if (embedded) return { entry: embedded, score: 0.99 };

  const inputTokens = tokens(question);
  if (inputTokens.size < 2) return null;
  let best: MatchedInsight | null = null;
  for (const entry of pool) {
    const candidate = tokens(entry.question);
    const overlap = [...inputTokens].filter(word => candidate.has(word)).length;
    if (overlap < 2) continue;
    const coverage = overlap / inputTokens.size;
    const specificity = overlap / candidate.size;
    // Favor user-intent coverage over the length of the original research question.
    const score = 0.82 * coverage + 0.18 * specificity;
    if (!best || score > best.score) best = { entry, score };
  }
  return best && best.score >= 0.69 ? best : null;
}

/** Show up to three meaningfully different suggestions for the answers actually chosen. */
export function selectGuidedInsights(
  persona: InsightPersona,
  track: string,
  answers: Record<string, string>
): NextStepInsightEntry[] {
  const ids: string[] = [];
  const add = (id: string | undefined) => { if (id && !ids.includes(id)) ids.push(id); };

  if (persona === 'Sofia') {
    if (track === 'colleges') {
      add(answers.location === 'fremont' ? 'S1.3' : 'S1.4');
      add(({community:'S1.1',university:'S1.4',both:'S3.1',unsure:'S0.4'} as Record<string,string>)[answers.pathway] || 'S0.4');
      add(({health:'S1.6',stem:'S1.7',undecided:'S0.6',other:'S0.6'} as Record<string,string>)[answers.interests]);
    } else if (track === 'aid') {
      add(({applications:'S2.2',grants:'S2.5',scholarships:'S2.8',netprice:'S2.9',unsure:'S0.3'} as Record<string,string>)[answers.aidTopic] || 'S0.3');
      add(answers.incomeChange === 'layoff' || answers.incomeChange === 'other' ? 'S2.6' : 'S2.1');
    } else if (track === 'compare') {
      add(({types:'S3.5',transfer:'S3.1',universities:'S3.5',unsure:'S3.4'} as Record<string,string>)[answers.comparison] || 'S3.4');
      add(answers.housing === 'home' ? 'S3.3' : 'S2.9');
      add(answers.bachelors === 'yes' || answers.bachelors === 'maybe' ? 'S3.2' : 'S0.6');
    } else if (track === 'apply') {
      add(answers.start === 'fall2027' ? 'S4.1' : 'S4.6');
      add(({community:'S4.6',csu:'S4.4',uc:'S4.2',multiple:'S4.1'} as Record<string,string>)[answers.schoolType] || 'S4.6');
      add(({requirements:'S4.3',deadlines:'S4.1',aid:'S2.1',counselor:'S4.7'} as Record<string,string>)[answers.applicationHelp] || 'S4.7');
    }
  } else {
    if (track === 'employer') {
      add(({tesla:'D1.2',ssba:'D1.8',both:'D1.11',unsure:'D1.11'} as Record<string,string>)[answers.program] || 'D1.11');
      add(answers.schedule === 'evening' || answers.schedule === 'flexible' ? 'D2.6' : 'D1.4');
      add(answers.eligibility === 'benefits' ? (answers.program === 'ssba' ? 'D1.8' : 'D1.1') : answers.eligibility === 'dates' ? 'D1.5' : 'D1.2');
    } else if (track === 'training') {
      add(answers.experience === 'manufacturing' ? 'D4.2' : answers.experience === 'it' ? 'D4.4' : 'D4.1');
      add(({semiconductor:'D1.7',tesla:'D1.2',it:'D4.4',unsure:'D2.1'} as Record<string,string>)[answers.interest] || 'D2.1');
      add(answers.format === 'parttime' || answers.format === 'online' ? 'D2.6' : 'D2.1');
    } else if (track === 'funding') {
      add(answers.unemployment === 'yes' ? 'D3.2' : 'D3.1');
      add(answers.budget === 'stipend' ? 'D1.8' : 'D3.5');
      add(({wioa:'D3.5',ctb:'D3.4',stipend:'D1.8',all:'D3.7'} as Record<string,string>)[answers.fundingType] || 'D3.7');
    } else if (track === 'career') {
      add(answers.skills === 'equipment' || answers.skills === 'quality' ? 'D4.2' : 'D4.1');
      add(answers.priority === 'quick' ? 'D5.1' : answers.priority === 'new' ? 'D4.4' : 'D4.1');
      add(answers.duration === 'weeks' ? 'D2.1' : 'D2.6');
    } else if (track === 'family') {
      if (answers.groceries === 'yes' || answers.groceries === 'maybe') {
        add('D6.1');
        add('D6.4');
      } else {
        add('D0.6');
      }
    } else if (track === 'immediate') {
      add(answers.urgency === 'resume' ? 'D5.1' : answers.urgency === 'advisor' ? 'D5.2' : answers.urgency === 'training' ? 'D5.7' : 'D0.6');
      add(answers.location === 'milpitas' ? 'D5.2' : 'D5.6');
      add(answers.support === 'assessment' ? 'D4.2' : answers.support === 'adviser' ? 'D5.2' : answers.support === 'training' ? 'D1.11' : 'D5.1');
    }
  }

  return ids.map(id => getNextStepInsight(id)).filter((entry): entry is NextStepInsightEntry => Boolean(entry)).slice(0, 3);
}
