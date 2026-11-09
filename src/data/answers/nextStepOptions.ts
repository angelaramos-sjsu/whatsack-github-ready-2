import nextStepOptions from './nextStepOptions.json';
import type { BilingualText, OfficialResourceLink, ScriptedAnswer, ScriptedNextStep } from './types';
import { nextStepTranslations, type OptionTranslation } from './nextStepTranslations';
import { saraCollegeStageIds } from './saraCollegePathway';

interface SourceOption {
  label: string;
  why: string;
  who: string;
  area: string;
  contact: string;
  deadline: string;
  cost: string;
  language: string;
  prepare?: string;
  source: string;
  source2?: string;
}

interface SourceNode {
  id: string;
  keep_in_mind: string[];
  options: SourceOption[];
}

interface SourceData {
  lastReviewed: string;
  personas: Record<'sofia' | 'daniel', { nodes: SourceNode[] }>;
}

interface NodeTarget {
  answerId: string;
  optionIndexes?: number[];
}

interface NodeMapping {
  persona: 'sofia' | 'daniel';
  nodeId: string;
  targets: NodeTarget[];
}

const sourceData = nextStepOptions as SourceData;

const mappings: NodeMapping[] = [
  { persona: 'sofia', nodeId: 'a', targets: [{ answerId: saraCollegeStageIds.start }, { answerId: saraCollegeStageIds.nextSteps }] },
  { persona: 'sofia', nodeId: 'b', targets: [{ answerId: saraCollegeStageIds.majors }] },
  { persona: 'sofia', nodeId: 'c', targets: [{ answerId: saraCollegeStageIds.affordability, optionIndexes: [0, 1, 3] }, { answerId: saraCollegeStageIds.nearby, optionIndexes: [2] }] },
  { persona: 'sofia', nodeId: 'f', targets: [{ answerId: saraCollegeStageIds.transfer }] },
  { persona: 'sofia', nodeId: 'd', targets: [{ answerId: saraCollegeStageIds.fafsa }] },
  { persona: 'sofia', nodeId: 'e', targets: [{ answerId: saraCollegeStageIds.familyIncome }] },
  { persona: 'sofia', nodeId: 'g', targets: [{ answerId: saraCollegeStageIds.firstGeneration }] },
  { persona: 'sofia', nodeId: 'h', targets: [{ answerId: saraCollegeStageIds.afterGraduation }] },
  { persona: 'sofia', nodeId: 'x', targets: [{ answerId: saraCollegeStageIds.affordability, optionIndexes: [0] }, { answerId: saraCollegeStageIds.familyIncome, optionIndexes: [1] }] },
  { persona: 'daniel', nodeId: 'a', targets: [{ answerId: 'ans-roleplay-milpitas-layoff' }] },
  { persona: 'daniel', nodeId: 'b', targets: [{ answerId: 'ans-work-edd-impact' }] },
  { persona: 'daniel', nodeId: 'c', targets: [{ answerId: 'ans-work-tech-certificates' }] },
  { persona: 'daniel', nodeId: 'd', targets: [{ answerId: 'ans-work-evening-classes' }] },
  { persona: 'daniel', nodeId: 'e', targets: [{ answerId: 'ans-work-interview-practice' }] },
  { persona: 'daniel', nodeId: 'x', targets: [{ answerId: 'ans-roleplay-milpitas-layoff', optionIndexes: [0] }, { answerId: 'ans-work-tech-certificates', optionIndexes: [1] }] }
];

const bilingual = (en: string, es: string): BilingualText => ({ en, es });

const conditionalCopy = (value: string): string =>
  value
    .replace('An Associate Degree for Transfer guarantees priority admission to the CSU system', 'An Associate Degree for Transfer may provide priority admission to the CSU system')
    .replace('60 units, 2.0 GPA, guaranteed priority admission to the CSU system with junior standing and a bachelor\'s in 60 more units', 'With 60 units and a 2.0 GPA, an ADT may provide priority consideration for the CSU system, junior standing, and a path to a bachelor\'s degree in 60 more units')
    .replace('for a guaranteed campus and major', 'for a campus and major pathway')
    .replace('CalWORKs, SSI/SSP, or General Assistance qualifies the student for the fee waiver automatically', 'CalWORKs, SSI/SSP, or General Assistance may allow the student to qualify for the fee waiver automatically')
    .replace('the student qualifies for the California College Promise Grant without an income test', 'the student may qualify for the California College Promise Grant without an income test')
    .replace('Community college certificates still qualify for the fee waiver and Cal Grant C', 'Community college certificates may qualify for the fee waiver and Cal Grant C')
    .replace('Adults qualify for the fee waiver and Cal Grant C', 'Adults may qualify for the fee waiver and Cal Grant C')
    .replace('Receiving CalWORKs or General Assistance qualifies a student for the fee waiver automatically', 'Receiving CalWORKs or General Assistance may allow a student to qualify for the fee waiver automatically');

const organizationNamesEs: Record<string, string> = {
  'Federal Student Aid (FAFSA) or California Student Aid Commission (CADAA)': 'Federal Student Aid (FAFSA) o California Student Aid Commission (CADAA)',
  'Your high school counseling or college & career center': 'Consejería de su preparatoria o centro de carreras y universidad',
  'Ohlone College Admissions & Records': 'Admisiones y Registros de Ohlone College',
  'College counseling office (e.g., Ohlone Counseling)': 'Oficina de consejería del colegio (por ejemplo, Ohlone Counseling)',
  'Your college financial aid office (state program)': 'Oficina de ayuda financiera de su colegio (programa estatal)',
  'Your college transfer center': 'Centro de transferencia de su colegio',
  'CSAC Cash for College (in person and webinars)': 'CSAC Cash for College (en persona y seminarios web)',
  'CSAC / your high school registrar': 'CSAC / registro de su preparatoria',
  'College financial aid office (professional judgment)': 'Oficina de ayuda financiera del colegio (criterio profesional)',
  'College financial aid office': 'Oficina de ayuda financiera del colegio',
  'Alameda County Social Services via GetCalFresh / Ohlone Basic Needs': 'Servicios Sociales del Condado de Alameda por GetCalFresh / Necesidades Básicas de Ohlone',
  'College counseling / student success center': 'Consejería del colegio / centro de éxito estudiantil',
  'High school registrar → college Admissions & Records': 'Registro de la preparatoria → Admisiones y Registros del colegio',
  'College bookstore / class schedule ZTC filter': 'Librería del colegio / filtro ZTC del horario de clases',
  'work2future or NOVAworks': 'work2future o NOVAworks',
  'EDD publication': 'Publicación de EDD',
  'Local community college financial aid office': 'Oficina de ayuda financiera del community college local',
  'work2future / NOVAworks career advisor': 'Asesor laboral de work2future / NOVAworks',
  'County social services via GetCalFresh / campus Basic Needs Center': 'Servicios Sociales del condado por GetCalFresh / Centro de Necesidades Básicas del campus',
  'College EOPS / CalWORKs office (e.g., Ohlone)': 'Oficina EOPS / CalWORKs del colegio (por ejemplo, Ohlone)'
};

const organizationNameEs = (name: string): string => organizationNamesEs[name] ?? name;

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const getNode = (persona: NodeMapping['persona'], nodeId: string): SourceNode => {
  const node = sourceData.personas[persona].nodes.find((item) => item.id === nodeId);
  if (!node) throw new Error(`Missing ${persona} NextStep source node "${nodeId}".`);
  return node;
};

const makeStep = (
  persona: NodeMapping['persona'],
  answerId: string,
  option: SourceOption,
  translation: OptionTranslation,
  lastReviewed: string
): ScriptedNextStep => {
  if (Boolean(option.prepare) !== Boolean(translation.prepare)) {
    throw new Error(`Preparation translation is missing for ${persona} option "${option.label}".`);
  }

  const title = bilingual(option.label, translation.label);
  const detail = bilingual(
    `${conditionalCopy(option.why)}${option.prepare ? `\n\nPrepare: ${option.prepare}` : ''}`,
    `${translation.why}${translation.prepare ? `\n\nPara prepararse: ${translation.prepare}` : ''}`
  );
  const stage = answerId.replace(/^ans-(sara-|work-)/, '');
  const optionSlug = slugify(option.label);
  const actionBase = `${persona === 'sofia' ? 'sara' : 'daniel'}-${stage}-${optionSlug}`;
  const actions: ScriptedNextStep['actions'] = [
    {
      id: `${actionBase}-source`,
      kind: 'open-link',
      label: bilingual(`Open ${option.who}`, `Abrir ${organizationNameEs(option.who)}`),
      url: option.source
    }
  ];

  if (option.source2) {
    actions.push({
      id: `${actionBase}-source-2`,
      kind: 'open-link',
      label: bilingual(`Open ${option.who}`, `Abrir ${organizationNameEs(option.who)}`),
      url: option.source2
    });
  }

  return {
    title,
    detail,
    actions,
    meta: {
      who: option.who,
      area: option.area,
      contact: option.contact,
      deadline: option.deadline,
      cost: option.cost,
      language: option.language,
      prepare: option.prepare,
      sourceUrl: option.source,
      sourceUrl2: option.source2,
      lastReviewed
    }
  };
};

const addOfficialLink = (links: OfficialResourceLink[], option: SourceOption, labelEs: string, url: string): void => {
  if (links.some((link) => link.url === url)) return;
  links.push({
    label: bilingual(option.label, labelEs),
    source: bilingual(option.who, organizationNameEs(option.who)),
    url
  });
};

export const attachSourcedNextSteps = (answers: ScriptedAnswer[]): ScriptedAnswer[] => {
  const answersById = new Map(answers.map((answer) => [answer.id, {
    ...answer,
    links: [...(answer.links ?? [])],
    nextSteps: [...(answer.nextSteps ?? [])],
    keepInMind: [...(answer.keepInMind ?? [])]
  }]));

  for (const mapping of mappings) {
    const node = getNode(mapping.persona, mapping.nodeId);
    const translations = nextStepTranslations[mapping.persona][mapping.nodeId];
    if (!translations || translations.options.length !== node.options.length || translations.keepInMind.length !== node.keep_in_mind.length) {
      throw new Error(`Spanish NextStep translations do not match ${mapping.persona} node "${mapping.nodeId}".`);
    }

    for (const target of mapping.targets) {
      const answer = answersById.get(target.answerId);
      if (!answer) throw new Error(`Missing scripted answer "${target.answerId}" for sourced NextSteps.`);

      const options = target.optionIndexes ?? node.options.map((_, index) => index);
      const links = answer.links ?? (answer.links = []);
      const sourcedSteps = options.map((index) => {
        const option = node.options[index];
        const translatedOption = translations.options[index];
        if (!option || !translatedOption) throw new Error(`Invalid option mapping for ${mapping.persona} node "${mapping.nodeId}".`);
        addOfficialLink(links, option, translatedOption.label, option.source);
        if (option.source2) addOfficialLink(links, option, translatedOption.label, option.source2);
        return makeStep(mapping.persona, answer.id, option, translatedOption, sourceData.lastReviewed);
      });

      const nodeInsights = node.keep_in_mind.map((insight, index) => bilingual(conditionalCopy(insight), translations.keepInMind[index]));
      answer.keepInMind = [
        ...(answer.keepInMind ?? []).filter((item) => !nodeInsights.some((newItem) => newItem.en === item.en)),
        ...nodeInsights
      ];

      const priorSteps = [...(answer.nextStep ? [answer.nextStep] : []), ...(answer.nextSteps ?? [])];
      answer.nextStep = undefined;
      answer.nextSteps = [...priorSteps, ...sourcedSteps];
    }
  }

  return answers.map((answer) => answersById.get(answer.id) ?? answer);
};
