import { ACCESS_LABELS, connectorCopy, INTAKE_QUESTIONS, OPTION_LABELS } from './copy';
import { languageLabel } from './languages';
import { CommunityProgram, ConnectorPreferences, IntakeQuestionId, ProgramMatch, RecognizedIntent } from './types';

type Lang = 'en' | 'es';

export interface AssistantReply {
  text: string;
  chips: string[];
}

function joinList(items: string[], language: Lang): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  const conjunction = language === 'en' ? ' and ' : ' y ';
  return `${items.slice(0, -1).join(', ')}${conjunction}${items[items.length - 1]}`;
}

function label(value: string, language: Lang): string {
  return OPTION_LABELS[value]?.[language] ?? value;
}

function accessLabel(value: string, language: Lang): string {
  return ACCESS_LABELS[value]?.[language] ?? value;
}

export function describePreferences(preferences: ConnectorPreferences, language: Lang): string[] {
  const items: string[] = [];
  if (preferences.goals.length > 0) {
    items.push(joinList(preferences.goals.map((goal) => label(goal, language)), language));
  }
  if (preferences.interests.length > 0) {
    items.push(joinList(preferences.interests.map((interest) => label(interest, language)), language));
  }
  if (preferences.location) {
    if (preferences.location.virtual) {
      items.push(language === 'en' ? 'virtual activities' : 'actividades virtuales');
    } else if (preferences.location.city || preferences.location.zip) {
      const place = [preferences.location.city, preferences.location.zip].filter(Boolean).join(', ');
      items.push(language === 'en' ? `near ${place}` : `cerca de ${place}`);
    }
  }
  if (preferences.language && !preferences.language.noPreference) {
    items.push(languageLabel(preferences.language, language));
  }
  const access = preferences.access.filter((need) => need !== 'none').map((need) => accessLabel(need, language));
  if (access.length > 0) items.push(joinList(access, language));
  if (preferences.time) items.push(label(preferences.time, language));
  if (preferences.freeOnly) items.push(language === 'en' ? 'free activities only' : 'solo actividades gratuitas');
  if (preferences.ageGroup && preferences.ageGroup !== 'any') {
    items.push(language === 'en' ? `people aged ${preferences.ageGroup}` : `personas de ${preferences.ageGroup} años`);
  }
  return items;
}

function costText(program: CommunityProgram, language: Lang): string {
  if (program.cost.free === true) return language === 'en' ? 'Free' : 'Gratis';
  if (program.cost.detail) return program.cost.detail[language];
  return language === 'en' ? 'Not confirmed.' : 'No confirmado.';
}

function scheduleText(program: CommunityProgram, language: Lang): string {
  return (
    program.time.detail?.[language] ??
    program.time.days ??
    (language === 'en' ? 'Not confirmed.' : 'No confirmado.')
  );
}

function contactText(program: CommunityProgram, language: Lang): string | null {
  const c = connectorCopy[language];
  if (program.contact.phone && program.contact.phoneStatus === 'verified') {
    return `${c.call}: ${program.contact.phone}`;
  }
  if (program.contact.phone && program.contact.phoneStatus === 'demo') {
    return `${program.contact.phone} (${c.samplePhone})`;
  }
  if (program.contact.contactPerson) return program.contact.contactPerson;
  return null;
}

function empathyFor(intent: RecognizedIntent | null | undefined, language: Lang): string | null {
  if (!intent || intent.signals.length === 0) return null;
  const lines: string[] = [];
  if (intent.signals.includes('loneliness')) {
    lines.push(
      language === 'en'
        ? 'Thank you for telling me that. Feeling alone during the week is a real reason to look for a group, and you are not the only person who feels this way.'
        : 'Gracias por decírmelo. Sentirse sola o solo durante la semana es una razón muy válida para buscar un grupo, y no es la única persona que se siente así.'
    );
  }
  if (intent.signals.includes('nervous-alone')) {
    lines.push(
      language === 'en'
        ? 'It is normal to feel nervous about walking in alone. We can contact the organizer first so you know what to expect.'
        : 'Es normal sentirse nerviosa o nervioso por llegar sola o solo. Podemos contactar primero a la organización para que sepa qué esperar.'
    );
  }
  if (intent.signals.includes('cost')) {
    lines.push(
      language === 'en'
        ? 'I will show free options first and mark anything whose cost is not confirmed.'
        : 'Le mostraré primero las opciones gratuitas y marcaré lo que no tenga costo confirmado.'
    );
  }
  if (intent.signals.includes('tech-trouble')) {
    lines.push(
      language === 'en'
        ? 'You do not need to use a website. I can point you to a phone number and read the steps out loud.'
        : 'No necesita usar un sitio web. Puedo darle un número de teléfono y leerle los pasos en voz alta.'
    );
  }
  if (intent.signals.includes('language-barrier')) {
    lines.push(
      language === 'en'
        ? 'You can search in the language you prefer. I will only show programs that state they offer it, and I will mark language details that are not confirmed.'
        : 'Puede buscar en el idioma que prefiera. Solo mostraré programas que indiquen que lo ofrecen y marcaré los idiomas que no estén confirmados.'
    );
  }
  if (intent.signals.includes('no-interests')) {
    lines.push(
      language === 'en'
        ? 'Not knowing what you like is completely fine. Here are a few easy categories to react to — you can pick “Explore options”.'
        : 'No saber qué le gusta está perfectamente bien. Aquí tiene algunas categorías sencillas para elegir, o puede escoger “Explorar opciones”.'
    );
  }
  if (lines.length === 0) return null;
  return lines.slice(0, 2).join('\n\n');
}

function matchSummaryLines(matches: ProgramMatch[], language: Lang): string[] {
  return matches.slice(0, 3).map((match, index) => {
    const program = match.program;
    const where = program.virtual
      ? language === 'en'
        ? 'Virtual'
        : 'Virtual'
      : program.city ?? (language === 'en' ? 'Not confirmed.' : 'No confirmado.');
    const parts = [
      `${index + 1}. ${program.organization}`,
      `${program.activityName[language]} — ${where}`,
      `${scheduleText(program, language)} · ${costText(program, language)}`
    ];
    const contact = contactText(program, language);
    if (contact) parts.push(contact);
    return parts.join('\n   ');
  });
}

function chipsForQuestion(questionId: IntakeQuestionId | null, language: Lang): string[] {
  if (!questionId) return [];
  const question = INTAKE_QUESTIONS.find((item) => item.id === questionId);
  if (!question) return [];
  if (question.kind === 'location') {
    return language === 'en' ? ['San Jose', 'Virtual', 'Use my ZIP code'] : ['San José', 'Virtual', 'Usar mi código postal'];
  }
  if (question.kind === 'language') {
    return language === 'en' ? ['English', 'Spanish', 'Portuguese', 'No preference'] : ['Español', 'Inglés', 'Portugués', 'Sin preferencia'];
  }
  return (question.options ?? []).slice(0, 4).map((option) => option.label[language]);
}

export interface ReplyInput {
  preferences: ConnectorPreferences;
  intent?: RecognizedIntent | null;
  matches?: ProgramMatch[] | null;
  language: Lang;
  nextQuestion?: IntakeQuestionId | null;
}

export function composeAssistantReply(input: ReplyInput): AssistantReply {
  const { preferences, intent, matches, language, nextQuestion } = input;
  const c = connectorCopy[language];
  const paragraphs: string[] = [];

  const empathy = empathyFor(intent, language);
  if (empathy) paragraphs.push(empathy);

  const understood = describePreferences(preferences, language);
  if (understood.length > 0) {
    paragraphs.push(
      language === 'en'
        ? `I understood: ${joinList(understood, language)}.`
        : `Entendí: ${joinList(understood, language)}.`
    );
  }

  if (matches && matches.length > 0) {
    paragraphs.push(
      language === 'en'
        ? `I found ${matches.length} possible ${matches.length === 1 ? 'match' : 'matches'}. ${c.resultsSubtitle}`
        : `Encontré ${matches.length} ${matches.length === 1 ? 'opción posible' : 'opciones posibles'}. ${c.resultsSubtitle}`
    );
    paragraphs.push(matchSummaryLines(matches, language).join('\n\n'));
    paragraphs.push(
      language === 'en'
        ? 'Open a card below for the full record, the official source, and contact options. Anything I could not confirm is marked “Not confirmed.”'
        : 'Abra una tarjeta abajo para ver el registro completo, la fuente oficial y las opciones de contacto. Todo lo que no pude confirmar aparece como “No confirmado”.'
    );
  } else if (matches && matches.length === 0) {
    paragraphs.push(`${c.noResultsTitle}\n${c.noResultsBody}`);
    paragraphs.push(c.noResultsTips.map((tip) => `• ${tip}`).join('\n'));
    paragraphs.push(c.twoOneOne);
  }

  if (preferences.contactFirst && matches && matches.length > 0) {
    const first = matches[0].program;
    const contact = contactText(first, language);
    const contactLine = contact
      ? language === 'en'
        ? `You can reach ${first.organization}: ${contact}`
        : `Puede comunicarse con ${first.organization}: ${contact}`
      : language === 'en'
        ? `${first.organization} does not publish a confirmed phone number in this prototype. Use “View official source” or call 2-1-1.`
        : `${first.organization} no publica un teléfono confirmado en este prototipo. Use “Ver fuente oficial” o llame al 2-1-1.`;
    paragraphs.push(`${c.contactFirstTitle}\n${contactLine}`);
  }

  if (preferences.language && !preferences.language.noPreference) {
    const code = preferences.language.code;
    if (code !== 'en' && code !== 'es' && code !== 'other') {
      paragraphs.push(c.notAvailableForLanguage);
    }
  }

  if (nextQuestion) {
    const question = INTAKE_QUESTIONS.find((item) => item.id === nextQuestion);
    if (question) {
      paragraphs.push(
        language === 'en'
          ? `Next question: ${question.title.en}`
          : `Siguiente pregunta: ${question.title.es}`
      );
    }
  }

  if (paragraphs.length === 0) {
    paragraphs.push(c.intro);
  }

  const chips: string[] = [];
  if (matches && matches.length > 0) {
    chips.push(c.talkToPerson, c.changePreferences);
    if (!preferences.freeOnly) chips.push(language === 'en' ? 'Free activities only' : 'Solo actividades gratuitas');
  } else {
    chips.push(...chipsForQuestion(nextQuestion ?? null, language));
  }
  if (preferences.contactFirst && matches && matches.length > 0) {
    chips.unshift(language === 'en' ? 'Show me a phone number' : 'Muéstreme un teléfono');
  }

  return { text: paragraphs.join('\n\n'), chips: Array.from(new Set(chips)).slice(0, 4) };
}

export function composeContactReply(matches: ProgramMatch[], language: Lang): AssistantReply {
  const c = connectorCopy[language];
  if (matches.length === 0) {
    return {
      text: `${c.talkingToPersonTitle}\n${c.noResultsBody}\n\n${c.twoOneOne}`,
      chips: [language === 'en' ? 'Show matching activities' : 'Mostrar actividades']
    };
  }

  const lines = matches.slice(0, 4).map((match) => {
    const program = match.program;
    const contact = contactText(program, language);
    const source = program.officialSource
      ? language === 'en'
        ? `Official source: ${program.officialSource}`
        : `Fuente oficial: ${program.officialSource}`
      : language === 'en'
        ? 'Official source: Not confirmed.'
        : 'Fuente oficial: No confirmado.';
    return [
      `${program.organization}`,
      `  ${program.activityName[language]}`,
      `  ${contact ?? (language === 'en' ? 'Phone: Not confirmed.' : 'Teléfono: No confirmado.')}`,
      `  ${source}`
    ].join('\n');
  });

  return {
    text: `${c.talkingToPersonTitle}\n${c.talkingToPersonBody}\n\n${lines.join('\n\n')}\n\n${c.twoOneOne}`,
    chips: [language === 'en' ? 'Show matching activities' : 'Mostrar actividades', c.changePreferences]
  };
}

export function composeWelcome(language: Lang): string {
  const c = connectorCopy[language];
  return `${c.intro}\n\n${c.privacyBody}`;
}
