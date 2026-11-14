import type { BilingualText, OfficialResourceLink, ScriptedAnswer, ScriptedNextStep } from './types';

/**
 * Small, reviewable rules for WhatSack's scripted classroom demonstration.
 * These are not natural-language understanding or eligibility determinations.
 */
export type SupportedNeed = 'food' | 'college' | 'work' | 'mental' | 'community';

const bilingual = (en: string, es: string): BilingualText => ({ en, es });
const normalize = (value: string): string =>
  value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'").replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

export const isSpanishResourceQuestion = (text: string): boolean =>
  /\b(necesito|busco|buscar|quisiera|solicitar|solicitud|quiero|puedo|puedes|ayuda|comida|alimentos|escuela|universidad|educacion|capacitacion|laboral|consejeria|terapia|califico|elegible|ingresos|renta|alquiler|vivienda|hacerlo|tengo|donde|como|sabados|familia)\b/.test(normalize(text)) &&
  !/\b(i need|i want|i can|looking for|college|i have|what can)\b/.test(normalize(text));

const calFreshTerms = /\b(calfresh|cal fresh|food stamps|snap benefits|estampillas de comida|cupones de alimentos|benefitscal)\b/;
export const mentionsCalFresh = (text: string): boolean => calFreshTerms.test(normalize(text));

/** Explicitly refused needs are not treated as requested needs. */
const removeNegatedNeeds = (value: string): string =>
  value
    .replace(/\b(?:i don t need|i dont need|i do not need|i don t want|i do not want|not looking for|no need for)\s+(?:any\s+)?(?:food|groceries|counseling|therapy|mental health|job training|education|school|community support)\b/g, '')
    .replace(/\b(?:no necesito|no quiero|no busco)\s+(?:ayuda con\s+)?(?:comida|alimentos|despensa|consejeria|terapia|salud mental|capacitacion|trabajo|educacion|escuela|comunidad)\b/g, '');

const foodTerms = /\b(food|grocer(?:y|ies)|pantry|pantries|calfresh|food stamps|benefitscal|comida|alimentos|despensa|estampillas)\b/;
const workTerms = /\b(workforce|job|jobs|job training|employment|unemployed|laid off|layoff|retraining|retrain|training|career|certificates?|work|trabajo|empleo|laboral|capacitacion|desemplead[oa])\b/;
const collegeTerms = /\b(education|school|schools|college|university|tuition|fafsa|cadaa|degree|student|educacion|escuela|universidad|colegio|becas|estudios|estudiar)\b/;
const mentalTerms = /\b(mental health|counseling|counsell?or|therapist|therapy|psychologist|anxiety|salud mental|consejeria|consejero|terapia|terapeuta|ansiedad)\b/;
const communityTerms = /\b(community|community groups|social activities|social group|friends|friendship|lonely|isolation|comunidad|actividades comunitarias|amistades|amigos|soledad)\b/;

export const detectSupportedNeeds = (question: string): SupportedNeed[] => {
  const q = removeNegatedNeeds(normalize(question));
  const needs: SupportedNeed[] = [];
  if (foodTerms.test(q)) needs.push('food');
  // Workforce and college are subpaths of one WhatSack Education & Workforce category.
  if (workTerms.test(q)) needs.push('work');
  else if (collegeTerms.test(q)) needs.push('college');
  if (mentalTerms.test(q)) needs.push('mental');
  if (communityTerms.test(q)) needs.push('community');
  return needs;
};

export const mentionsHousing = (question: string): boolean =>
  /\b(housing|rent|rental assistance|paying rent|eviction|landlord|alquiler|renta|vivienda|desalojo)\b/.test(normalize(question));

export const isApplicationDelegationRequest = (question: string): boolean => {
  const q = normalize(question);
  return /\b(can you do it for me|can you do this for me|can you apply for me|can you fill (?:it|this|out my application) out|can you fill it out|can you fill out my application|will you submit|can you submit|submit (?:it|my application) for me|do the application for me|puedes hacerlo por mi|puede hacerlo por mi|puedes solicitarlo por mi|puedes llenar mi solicitud|puedes enviar mi solicitud|puedes presentar mi solicitud)\b/.test(q);
};

const eligibilityTerms = /\b(qualify|qualifies|qualified|eligible|eligibility|income limit|income limits|income threshold|do i meet|can i get calfresh|can college students get|can college students receive|can students get|can students receive|would i qualify|califico|califica|calificar|elegible|elegibilidad|limite de ingresos|requisitos para calificar|si gano)\b/;
export const isCalFreshEligibilityQuestion = (question: string, previousUserQuestion?: string): boolean => {
  const q = normalize(question);
  if (!eligibilityTerms.test(q)) return false;
  if (mentionsCalFresh(question)) return true;
  // A direct "income limit" question in this specific navigation prototype can
  // receive cautious guidance, without assuming or calculating eligibility.
  if (/\bincome limit\b|\blimite de ingresos\b/.test(q)) return true;
  return Boolean(previousUserQuestion && mentionsCalFresh(previousUserQuestion)
    && detectSupportedNeeds(previousUserQuestion).length === 1);
};

export const routeFoodEnhancement = (question: string, previousUserQuestion?: string): string | undefined => {
  const previousOnlyCalFresh = Boolean(previousUserQuestion && mentionsCalFresh(previousUserQuestion)
    && detectSupportedNeeds(previousUserQuestion).length === 1);
  if (isApplicationDelegationRequest(question)) {
    return mentionsCalFresh(question) || previousOnlyCalFresh
      ? 'ans-food-calfresh-no-submission'
      : 'ans-food-application-clarify';
  }
  if (isCalFreshEligibilityQuestion(question, previousUserQuestion)) {
    return 'ans-food-calfresh-eligibility';
  }
  return undefined;
};

const secondHarvest = 'https://www.shfb.org/get-food/calfresh/';
const benefitsCal = 'https://benefitscal.com/';
const cdss = 'https://www.cdss.ca.gov/food';

const officialLink = (en: string, es: string, source: string, url: string): OfficialResourceLink =>
  ({ label: bilingual(en, es), source: bilingual(source, source), url });

const links: OfficialResourceLink[] = [
  officialLink('California Department of Social Services — CalFresh', 'Departamento de Servicios Sociales de California — CalFresh', 'California Department of Social Services', cdss),
  officialLink('BenefitsCal — apply for benefits', 'BenefitsCal — solicitar beneficios', 'BenefitsCal / California Counties', benefitsCal),
  officialLink('Second Harvest — CalFresh application help', 'Second Harvest — ayuda con la solicitud de CalFresh', 'Second Harvest of Silicon Valley', secondHarvest)
];

const nextStep = (key: string, title: BilingualText, detail: BilingualText, url: string): ScriptedNextStep => ({
  title, detail,
  actions: [{
    id: key + '-official',
    kind: 'open-link',
    label: bilingual('Open official resource', 'Abrir recurso oficial'),
    url
  }]
});

const script = (
  id: string, question: BilingualText, answer: BilingualText, officialLinks: OfficialResourceLink[],
  step: ScriptedNextStep | undefined, followUpIds: string[] = []
): ScriptedAnswer => ({
  id, topic: 'food', question, answer, context: [],
  links: officialLinks,
  ...(step ? { nextStep: step } : {}),
  followUpIds
});

/** Approved, bounded answers rather than a live model or an eligibility calculator. */
export const foodEnhancementAnswers: ScriptedAnswer[] = [
  script(
    'ans-food-calfresh-no-submission',
    bilingual('Can you apply for CalFresh for me?', '¿Puedes solicitar CalFresh por mí?'),
    bilingual(
      "I can't complete or submit a CalFresh application for you, but I can help you find assistance. Second Harvest of Silicon Valley offers CalFresh application support, and BenefitsCal is California's online benefits portal where you can apply. WhatSack can guide you toward available resources, but it cannot submit or manage applications on your behalf.",
      'No puedo completar ni enviar una solicitud de CalFresh por ti, pero puedo ayudarte a encontrar asistencia. Second Harvest of Silicon Valley ofrece ayuda con la solicitud, y BenefitsCal es el portal en línea de California donde puedes solicitar beneficios. WhatSack te orienta hacia recursos disponibles, pero no puede enviar ni administrar solicitudes por ti.'
    ),
    [links[2], links[1]],
    nextStep('calfresh-application-help', bilingual('Find help with my CalFresh application', 'Buscar ayuda con mi solicitud de CalFresh'),
      bilingual('Contact Second Harvest about assistance; applications are submitted through authorized channels, not WhatSack.', 'Contacta a Second Harvest para pedir ayuda; las solicitudes se envían por los canales autorizados, no por WhatSack.'), secondHarvest),
    ['ans-food-es-calfresh-self', 'ans-food-calfresh-eligibility']
  ),
  script(
    'ans-food-application-clarify',
    bilingual('Can you do it for me?', '¿Puedes hacerlo por mí?'),
    bilingual(
      "I can explain steps and help you find resources, but WhatSack can't fill out, submit, or manage applications. Which application or service do you mean? I don't want to assume.",
      'Puedo explicar los pasos y ayudarte a encontrar recursos, pero WhatSack no puede completar, enviar ni administrar solicitudes. ¿A qué solicitud o servicio te refieres? No quiero asumir.'
    ),
    [], undefined, []
  ),
  script(
    'ans-food-calfresh-eligibility',
    bilingual('Do I qualify for CalFresh?', '¿Califico para CalFresh?'),
    bilingual(
      "CalFresh eligibility depends on several factors, including household size, income, and other program requirements. Your income or employment status alone does not automatically determine whether you qualify.\n\nWhatSack cannot approve or deny eligibility. You can review California's official CalFresh information, use BenefitsCal to explore applying, or contact Second Harvest of Silicon Valley for application assistance.",
      'La elegibilidad para CalFresh depende de varios factores, incluidos el tamaño del hogar, los ingresos y otros requisitos del programa. Los ingresos o la situación laboral por sí solos no determinan si calificas.\n\nWhatSack no puede aprobar ni rechazar la elegibilidad. Consulta la información oficial de CalFresh de California, utiliza BenefitsCal para explorar cómo solicitarlo o comunícate con Second Harvest of Silicon Valley para recibir ayuda.'
    ),
    links,
    nextStep('calfresh-eligibility', bilingual('Check CalFresh eligibility requirements', 'Consultar los requisitos de elegibilidad de CalFresh'),
      bilingual('Review California’s official CalFresh requirements or contact an application assistance provider to discuss your circumstances.', 'Consulta los requisitos oficiales de California o comunícate con un proveedor de asistencia para hablar sobre tus circunstancias.'), cdss),
    ['ans-food-calfresh-household-size', 'ans-food-calfresh-requirements-help', 'ans-food-calfresh-how-to-apply']
  ),
  script(
    'ans-food-calfresh-household-size',
    bilingual('Does household size affect CalFresh eligibility?', '¿El tamaño del hogar afecta la elegibilidad para CalFresh?'),
    bilingual(
      'Yes, household size is one factor considered in CalFresh eligibility and benefit calculations. Other program rules also matter, so household size alone cannot determine whether you qualify. Use California’s official CalFresh information or ask a qualified application assistance provider about current rules.',
      'Sí, el tamaño del hogar es uno de los factores que se consideran para la elegibilidad y los beneficios de CalFresh. También se aplican otras reglas, así que este dato por sí solo no determina si calificas. Consulta las normas oficiales de California o pide ayuda a un proveedor de asistencia.'
    ),
    [links[0], links[2]],
    nextStep('calfresh-household', bilingual('Review current household-size rules', 'Revisar las reglas sobre el tamaño del hogar'),
      bilingual('Use the official California guidance; do not rely on an estimate from WhatSack.', 'Consulta las normas oficiales de California; no dependas de una estimación de WhatSack.'), cdss)
  ),
  script(
    'ans-food-calfresh-requirements-help',
    bilingual('Where can I get help understanding CalFresh requirements?', '¿Dónde puedo pedir ayuda para entender los requisitos de CalFresh?'),
    bilingual(
      'Second Harvest of Silicon Valley offers CalFresh application assistance and can help explain the steps. The California Department of Social Services publishes official program information. WhatSack cannot decide eligibility; ask an authorized assistance provider about your specific circumstances.',
      'Second Harvest of Silicon Valley ofrece ayuda con las solicitudes de CalFresh y puede explicar los pasos. El Departamento de Servicios Sociales de California publica información oficial del programa. WhatSack no puede determinar la elegibilidad; consulta con un proveedor de asistencia autorizado.'
    ),
    [links[2], links[0]],
    nextStep('calfresh-requirements-help', bilingual('Ask Second Harvest about CalFresh requirements', 'Consultar a Second Harvest sobre los requisitos'),
      bilingual('Open Second Harvest’s CalFresh help page to learn how to request application assistance.', 'Abre la página de ayuda de Second Harvest para saber cómo pedir asistencia.'), secondHarvest)
  ),
  script(
    'ans-food-calfresh-how-to-apply',
    bilingual('How do I apply for CalFresh?', '¿Cómo solicito CalFresh?'),
    bilingual(
      'You can start a CalFresh application through BenefitsCal, California’s online benefits portal. If you would like help understanding the process, Second Harvest of Silicon Valley provides application assistance. WhatSack cannot fill out or submit the application for you, and the county decides eligibility.',
      'Puedes iniciar una solicitud de CalFresh mediante BenefitsCal, el portal de beneficios de California. Si necesitas ayuda para entender el proceso, Second Harvest of Silicon Valley ofrece asistencia. WhatSack no puede completar ni enviar la solicitud por ti; el condado determina la elegibilidad.'
    ),
    [links[1], links[2]],
    nextStep('calfresh-how-to-apply', bilingual('Open BenefitsCal to begin', 'Abrir BenefitsCal para comenzar'),
      bilingual('Follow the official application steps or contact Second Harvest if you need support.', 'Sigue los pasos oficiales o comunícate con Second Harvest si necesitas ayuda.'), benefitsCal)
  ),
  script(
    'ans-food-housing-out-of-scope',
    bilingual('I need help paying rent.', 'Necesito ayuda para pagar el alquiler.'),
    bilingual(
      'WhatSack currently supports Food Access, Education & Workforce, Mental Health, and Community Connection. Housing assistance is outside this classroom prototype, so I do not have an approved housing resource to recommend. You can ask about any of the four supported categories.',
      'WhatSack actualmente cubre Acceso a Alimentos, Educación y Trabajo, Salud Mental y Conexión Comunitaria. La ayuda para vivienda está fuera del alcance de este prototipo académico, así que no tengo recursos de vivienda aprobados para recomendar. Puedes consultar cualquiera de las cuatro categorías disponibles.'
    ),
    [], undefined, []
  )
];

const entryId: Record<SupportedNeed, string> = {
  food: 'ans-food-es-family-groceries',
  college: 'ans-college-tuition-free',
  work: 'ans-work-tech-certificates',
  mental: 'ans-mental-confidential-teens',
  community: 'ans-community-connections'
};

const headings: Record<SupportedNeed, BilingualText> = {
  food: bilingual('Food Access', 'Acceso a Alimentos'),
  college: bilingual('Education & Workforce — College', 'Educación y Trabajo — Universidad'),
  work: bilingual('Education & Workforce — Jobs and training', 'Educación y Trabajo — Empleo y capacitación'),
  mental: bilingual('Mental Health', 'Salud Mental'),
  community: bilingual('Community Connection', 'Conexión Comunitaria')
};

/** Short approved-topic summaries; the official links/NextSteps come from existing answers. */
const summaries: Record<SupportedNeed, BilingualText> = {
  food: bilingual(
    "Use Second Harvest of Silicon Valley's Food Locator to explore food assistance. Confirm current location requirements and hours with the organization.",
    'Usa el Localizador de Alimentos de Second Harvest of Silicon Valley para explorar opciones de alimentos. Confirma los requisitos y horarios directamente con la organización.'
  ),
  college: bilingual(
    'For college financial aid, explore FAFSA, CADAA when applicable, and college financial aid offices. Programs have eligibility requirements and may not cover every cost.',
    'Para ayuda financiera universitaria, consulta FAFSA, CADAA cuando corresponda y las oficinas de ayuda financiera. Los programas tienen requisitos y pueden no cubrir todos los gastos.'
  ),
  work: bilingual(
    'Ask NOVAworks about current workforce training and career services. Funding, schedules, and eligibility must be confirmed with the provider.',
    'Pregunta a NOVAworks sobre capacitación laboral y servicios de carrera actuales. Confirma con el proveedor los fondos, horarios y requisitos.'
  ),
  mental: bilingual(
    'Santa Clara County Behavioral Health Services can provide information about support options. Ask the provider about privacy, age requirements, and availability. WhatSack is not a counseling service.',
    'Los Servicios de Salud Conductual del Condado de Santa Clara ofrecen información sobre opciones de apoyo. Pregunta por la privacidad, los requisitos de edad y la disponibilidad. WhatSack no ofrece consejería.'
  ),
  community: bilingual(
    'Explore community activities through the resource directory and 211 Bay Area. Confirm schedules, location, and accessibility directly with each organization.',
    'Explora actividades comunitarias en el directorio y 211 Bay Area. Confirma los horarios, la ubicación y la accesibilidad directamente con cada organización.'
  )
};

/** Combine only already approved topic sources, with one separately saveable NextStep per need. */
export const buildCombinedNeedsAnswer = (
  needs: SupportedNeed[],
  lookup: (id: string) => ScriptedAnswer | undefined,
  withHousingNotice = false
): ScriptedAnswer | undefined => {
  const approved = needs.map((need) => ({ need, answer: lookup(entryId[need]) }))
    .filter((item): item is { need: SupportedNeed; answer: ScriptedAnswer } => Boolean(item.answer));
  if (approved.length !== needs.length || approved.length === 0) return undefined;

  const buildText = (lang: 'en' | 'es'): string =>
    approved.map(({ need }) => '**' + headings[need][lang] + '**\n' + summaries[need][lang]).join('\n\n')
    + (withHousingNotice
      ? (lang === 'en' ? '\n\nHousing assistance is outside the current WhatSack prototype; no housing recommendations are available.'
        : '\n\nLa ayuda para vivienda está fuera del alcance del prototipo WhatSack; no hay recomendaciones de vivienda.')
      : '');

  const uniqueLinks = new Map<string, OfficialResourceLink>();
  for (const { answer } of approved) {
    for (const link of (answer.links ?? []).slice(0, 2)) {
      if (!uniqueLinks.has(link.url)) uniqueLinks.set(link.url, link);
    }
  }
  const steps = approved.map(({ answer }) => answer.nextStep ?? answer.nextSteps?.[0])
    .filter((step): step is ScriptedNextStep => Boolean(step));
  const followUpIds = [...new Set(approved.flatMap(({ answer }) => answer.followUpIds.slice(0, 2)))].slice(0, 5);
  const id = 'ans-multi-' + approved.map(({ need }) => need).join('-') + (withHousingNotice ? '-housing-notice' : '');

  return {
    id,
    topic: approved[0].answer.topic,
    question: bilingual('Help with multiple resources', 'Ayuda con varios recursos'),
    answer: bilingual(buildText('en'), buildText('es')),
    context: approved.map(({ need }) => headings[need]),
    links: [...uniqueLinks.values()],
    nextSteps: steps,
    resourceIds: [],
    followUpIds
  };
};
