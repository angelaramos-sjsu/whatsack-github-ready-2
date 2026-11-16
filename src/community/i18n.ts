import type {
  AccessibilityPreference,
  ActivityInterest,
  AgeGroup,
  Bi,
  CommunityIntentId,
  CommunityLanguageCode,
  CommunityProfile,
  RegionalVariety,
  TimePreference,
  UiLanguage
} from './types';

/** The one string every missing field must show, in both site languages. */
export const notConfirmed = (language: UiLanguage): string =>
  language === 'en' ? 'Not confirmed.' : 'No confirmado.';

export const pick = (value: Bi, language: UiLanguage): string => value[language];

export const languageLabels: Record<CommunityLanguageCode, Bi> = {
  en: { en: 'English', es: 'Inglés' },
  es: { en: 'Spanish', es: 'Español' },
  pt: { en: 'Portuguese', es: 'Portugués' },
  'zh-Hans': { en: 'Mandarin', es: 'Mandarín' },
  'zh-Hant': { en: 'Cantonese', es: 'Cantonés' },
  vi: { en: 'Vietnamese', es: 'Vietnamita' },
  tl: { en: 'Tagalog', es: 'Tagalo' },
  ko: { en: 'Korean', es: 'Coreano' },
  other: { en: 'Other / no preference', es: 'Otro / sin preferencia' }
};

export const regionLabels: Record<RegionalVariety, Bi> = {
  'no-preference': { en: 'No preference', es: 'Sin preferencia' },
  mexico: { en: 'Mexico', es: 'México' },
  spain: { en: 'Spain', es: 'España' },
  'latin-america': { en: 'Latin America', es: 'Latinoamérica' },
  brazil: { en: 'Brazil', es: 'Brasil' },
  portugal: { en: 'Portugal', es: 'Portugal' }
};

/** Only these two languages offer a regional variety, as the intake requires. */
export const regionOptionsFor = (code: CommunityLanguageCode): RegionalVariety[] => {
  if (code === 'es') return ['no-preference', 'mexico', 'spain', 'latin-america'];
  if (code === 'pt') return ['no-preference', 'brazil', 'portugal'];
  return [];
};

export const intentLabels: Record<CommunityIntentId, Bi> = {
  'meet-people': { en: 'Meet new people', es: 'Conocer gente nueva' },
  'community-events': { en: 'Community events', es: 'Eventos comunitarios' },
  'clubs-groups': { en: 'Clubs or groups', es: 'Clubes o grupos' },
  'senior-activities': { en: 'Senior activities', es: 'Actividades para mayores' },
  volunteering: { en: 'Volunteering', es: 'Voluntariado' },
  explore: { en: 'Explore options', es: 'Explorar opciones' },
  'contact-organization': { en: 'Talk to an organization', es: 'Hablar con una organización' },
  'language-culture': { en: 'Language and culture', es: 'Idioma y cultura' },
  accessibility: { en: 'Accessibility', es: 'Accesibilidad' },
  'register-help': { en: 'Help signing up', es: 'Ayuda para inscribirse' },
  'cost-question': { en: 'Cost and payment', es: 'Costo y pago' }
};

export const interestLabels: Record<ActivityInterest, Bi> = {
  arts: { en: 'Arts and crafts', es: 'Artes y manualidades' },
  music: { en: 'Music or dancing', es: 'Música o baile' },
  exercise: { en: 'Exercise or walking', es: 'Ejercicio o caminatas' },
  cultural: { en: 'Cultural events', es: 'Eventos culturales' },
  games: { en: 'Games or social gatherings', es: 'Juegos o reuniones sociales' },
  learning: { en: 'Learning new skills', es: 'Aprender cosas nuevas' },
  other: { en: 'Other', es: 'Otro' }
};

export const accessLabels: Record<AccessibilityPreference, Bi> = {
  wheelchair: { en: 'Wheelchair accessible', es: 'Accesible en silla de ruedas' },
  'transit-nearby': { en: 'Public transportation nearby', es: 'Transporte público cerca' },
  'transportation-help': { en: 'Transportation assistance', es: 'Ayuda con transporte' },
  virtual: { en: 'Virtual activities', es: 'Actividades virtuales' }
};

export const timingLabels: Record<TimePreference, Bi> = {
  'weekday-morning': { en: 'Weekday mornings', es: 'Mañanas entre semana' },
  'weekday-afternoon': { en: 'Weekday afternoons', es: 'Tardes entre semana' },
  evening: { en: 'Evenings', es: 'Noches' },
  weekend: { en: 'Weekends', es: 'Fines de semana' },
  anytime: { en: 'Anytime', es: 'Cualquier momento' }
};

export const ageLabels: Record<AgeGroup, Bi> = {
  youth: { en: 'Young people', es: 'Personas jóvenes' },
  adults: { en: 'Adults', es: 'Adultos' },
  'older-adults': { en: 'Older adults', es: 'Adultos mayores' },
  'any-age': { en: 'All ages', es: 'Todas las edades' },
  'no-preference': { en: 'No preference', es: 'Sin preferencia' }
};

export const copy = {
  en: {
    title: 'Community connections',
    subtitle:
      'Find clubs, classes, senior programs, volunteer teams and cultural groups near you. This guide is a bridge: every option ends with a real organization you can contact.',
    mockNotice:
      'Development data: every listing on this page is a clearly labelled mock record with fictional organizations and 555 phone numbers. Nothing here is a verified real-world service.',
    backToHome: 'Back to WhatSack',
    startOver: 'Start over',
    yourPreferences: 'Your preferences',
    languageLabel: 'Language you prefer',
    regionLabel: 'Regional variety',
    regionHint: 'Optional. We never guess this from where you live.',
    areaLabel: 'City or ZIP code',
    areaPlaceholder: 'e.g. San Jose or 95116',
    areaUse: 'Use this area',
    areaVirtual: 'Show virtual options',
    areaAnywhere: 'Anywhere',
    areaSelected: (value: string) => `Searching around ${value}.`,
    chatTitle: 'Ask in your own words',
    chatHint: 'One question at a time. You can skip anything, go back, or start over.',
    placeholder: 'e.g. I want to meet people near me',
    send: 'Send',
    skip: 'Skip this question',
    back: 'Back',
    next: 'Next',
    question: (current: number, total: number) => `Question ${current} of ${total}`,
    restart: 'Restart',
    skipAll: 'Skip to results',
    showMatches: 'Show matching activities',
    speakToPerson: 'Speak with a person',
    changePreferences: 'Change preferences',
    resultsHeading: 'Community options for you',
    resultsCount: (count: number) => `${count} options found`,
    resultsEmptyTitle: 'No options match every preference yet',
    resultsEmptyBody:
      'Nothing in the current development data fits all of your choices. These are the closest options, or you can reach a person directly.',
    relaxedLanguage:
      'We could not confirm this option in your preferred language, so call before you go.',
    relaxedAccessibility:
      'Wheelchair access is not confirmed for this option. Call before you go.',
    notVerified: 'Last checked',
    unverifiedDate: 'Date not confirmed',
    outdatedBadge: 'Information may be out of date',
    mockBadge: 'Mock listing',
    details: 'Review details',
    hideDetails: 'Hide details',
    officialSource: 'View the official source',
    officialSourceMissing: 'Official source not confirmed',
    call: 'Call (mock number)',
    callMissing: 'Phone not confirmed',
    email: 'Email',
    emailMissing: 'Email not confirmed',
    openOrganizer: 'Ask the organizer first',
    aboutHeading: 'Before you go',
    confirmNote:
      'Hours, language, accessibility and transportation can change. Confirm with the organization before travelling.',
    privacyHeading: 'Privacy',
    privacyBody:
      'This guide keeps nothing by default. Your answers and this conversation live only in this browser tab until you close or reset it.',
    saveConversation: 'Save this conversation on this device',
    savedNotice: 'Saved on this device only. Use Reset to delete it.',
    resetConversation: 'Reset conversation and answers',
    resetDone: 'Conversation and answers cleared.',
    personHeading: 'Talk to a person',
    personBody:
      'For local help by phone in many languages, call 211. The organizations in your results can also answer questions directly.',
    call211: 'Call 211',
    visit211: 'Open 211 Bay Area',
    voiceInput: 'Use voice input',
    voiceOutput: 'Read this answer aloud',
    voiceUnavailable: 'Voice is not available in this browser. You can type instead.',
    listening: 'Listening…',
    knownAnswers: 'Your answers',
    edit: 'Edit',
    notAnswered: 'Not answered',
    organizerLead: 'This organizer can meet you or answer questions before your first visit.',
    liveResults: (count: number) => `${count} community options updated.`,
    languageNotice:
      'This guide speaks English and Spanish. We can still search options in other languages and give you the organization’s phone number.',
    whyMatches: 'Why this fits'
  },
  es: {
    title: 'Conexiones comunitarias',
    subtitle:
      'Encuentre clubes, clases, programas para mayores, equipos de voluntariado y grupos culturales cerca de usted. Esta guía es un puente: cada opción termina en una organización real a la que puede llamar.',
    mockNotice:
      'Datos de desarrollo: cada opción en esta página es un registro de ejemplo claramente marcado, con organizaciones ficticias y números 555. Nada aquí es un servicio real verificado.',
    backToHome: 'Volver a WhatSack',
    startOver: 'Empezar de nuevo',
    yourPreferences: 'Sus preferencias',
    languageLabel: 'Idioma que prefiere',
    regionLabel: 'Variedad regional',
    regionHint: 'Opcional. Nunca lo deducimos por el lugar donde vive.',
    areaLabel: 'Ciudad o código postal',
    areaPlaceholder: 'ej. San Jose o 95116',
    areaUse: 'Usar esta zona',
    areaVirtual: 'Ver opciones virtuales',
    areaAnywhere: 'Cualquier lugar',
    areaSelected: (value: string) => `Buscando cerca de ${value}.`,
    chatTitle: 'Pregunte con sus propias palabras',
    chatHint: 'Una pregunta a la vez. Puede omitir lo que quiera, regresar o empezar de nuevo.',
    placeholder: 'ej. Quiero conocer gente cerca de mí',
    send: 'Enviar',
    skip: 'Omitir esta pregunta',
    back: 'Atrás',
    next: 'Siguiente',
    question: (current: number, total: number) => `Pregunta ${current} de ${total}`,
    restart: 'Reiniciar',
    skipAll: 'Ir a los resultados',
    showMatches: 'Mostrar actividades',
    speakToPerson: 'Hablar con una persona',
    changePreferences: 'Cambiar preferencias',
    resultsHeading: 'Opciones comunitarias para usted',
    resultsCount: (count: number) => `${count} opciones encontradas`,
    resultsEmptyTitle: 'Ninguna opción cumple todas sus preferencias todavía',
    resultsEmptyBody:
      'Nada en los datos de desarrollo actuales cumple todas sus elecciones. Estas son las opciones más cercanas, o puede hablar con una persona directamente.',
    relaxedLanguage:
      'No pudimos confirmar este opción en su idioma preferido; llame antes de ir.',
    relaxedAccessibility:
      'No está confirmado el acceso en silla de ruedas. Llame antes de ir.',
    notVerified: 'Última revisión',
    unverifiedDate: 'Fecha no confirmada',
    outdatedBadge: 'La información puede estar desactualizada',
    mockBadge: 'Registro de ejemplo',
    details: 'Ver detalles',
    hideDetails: 'Ocultar detalles',
    officialSource: 'Ver la fuente oficial',
    officialSourceMissing: 'Fuente oficial no confirmada',
    call: 'Llamar (número de ejemplo)',
    callMissing: 'Teléfono no confirmado',
    email: 'Correo electrónico',
    emailMissing: 'Correo no confirmado',
    openOrganizer: 'Hablar primero con quien organiza',
    aboutHeading: 'Antes de ir',
    confirmNote:
      'Los horarios, el idioma, la accesibilidad y el transporte pueden cambiar. Confirme con la organización antes de viajar.',
    privacyHeading: 'Privacidad',
    privacyBody:
      'Esta guía no guarda nada por defecto. Sus respuestas y esta conversación solo existen en esta pestaña hasta que la cierre o la reinicie.',
    saveConversation: 'Guardar esta conversación en este dispositivo',
    savedNotice: 'Guardado solo en este dispositivo. Use Reiniciar para borrarlo.',
    resetConversation: 'Reiniciar conversación y respuestas',
    resetDone: 'Conversación y respuestas borradas.',
    personHeading: 'Hablar con una persona',
    personBody:
      'Para ayuda local por teléfono en varios idiomas, llame al 211. Las organizaciones de sus resultados también pueden responder preguntas directamente.',
    call211: 'Llamar al 211',
    visit211: 'Abrir 211 Bay Area',
    voiceInput: 'Usar entrada de voz',
    voiceOutput: 'Leer esta respuesta en voz alta',
    voiceUnavailable: 'La voz no está disponible en este navegador. Puede escribir.',
    listening: 'Escuchando…',
    knownAnswers: 'Sus respuestas',
    edit: 'Editar',
    notAnswered: 'Sin responder',
    organizerLead:
      'Esta organización puede reunirse con usted o responder preguntas antes de su primera visita.',
    liveResults: (count: number) => `${count} opciones comunitarias actualizadas.`,
    languageNotice:
      'Esta guía habla inglés y español. Podemos buscar opciones en otros idiomas y darle el teléfono de la organización.',
    whyMatches: 'Por qué encaja'
  }
} as const;

export type CommunityCopy = (typeof copy)['en'];

const languageList = (codes: CommunityLanguageCode[], language: UiLanguage): string =>
  codes.map((code) => languageLabels[code][language]).join(', ');

/** A short, human explanation of why a listing was returned. */
export const explainMatch = (
  profile: CommunityProfile,
  resource: {
    city: string;
    languages: CommunityLanguageCode[];
    virtual: boolean;
    intents: CommunityIntentId[];
  },
  language: UiLanguage
): string => {
  const parts: string[] = [];
  const place = resource.virtual
    ? language === 'en'
      ? 'Online'
      : 'En línea'
    : resource.city;
  parts.push(place);

  if (resource.languages.length > 0) {
    parts.push(languageList(resource.languages, language));
  }
  if (profile.intent && resource.intents.includes(profile.intent)) {
    parts.push(intentLabels[profile.intent][language]);
  }
  return parts.join(' · ');
};

export const describedLanguages = languageList;
