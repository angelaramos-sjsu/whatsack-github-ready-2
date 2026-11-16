import { IntakeQuestionId, LocalizedText, UiLanguage } from './types';

export interface ConnectorCopy {
  badge: string;
  title: string;
  subtitle: string;
  intro: string;
  privacyTitle: string;
  privacyBody: string;
  privacyDetail: string;
  resetNote: string;
  saveToggle: string;
  savedSession: string;
  restart: string;
  resetAll: string;
  startIntake: string;
  back: string;
  skip: string;
  next: string;
  finish: string;
  edit: string;
  reviewTitle: string;
  questionOf: string;
  answerNotSet: string;
  skipped: string;
  requiredNote: string;
  chatTitle: string;
  chatPlaceholder: string;
  send: string;
  voiceInput: string;
  voiceUnsupported: string;
  readAloud: string;
  readAloudOn: string;
  readAloudOff: string;
  listening: string;
  demoPrompt: string;
  rosaButton: string;
  resultsTitle: string;
  resultsSubtitle: string;
  showResults: string;
  talkToPerson: string;
  changePreferences: string;
  matchesFound: string;
  noResultsTitle: string;
  noResultsBody: string;
  noResultsTips: string[];
  notConfirmed: string;
  verified: string;
  demoRecord: string;
  realOrg: string;
  samplePhone: string;
  viewSource: string;
  call: string;
  noVerifiedPhone: string;
  reviewDetails: string;
  hideDetails: string;
  lastVerified: string;
  organization: string;
  location: string;
  schedule: string;
  cost: string;
  languages: string;
  accessibility: string;
  transportation: string;
  contact: string;
  source: string;
  description: string;
  daysAndTimes: string;
  howToJoin: string;
  caregiver: string;
  wheelchair: string;
  transit: string;
  transportationAssistance: string;
  notAvailableForLanguage: string;
  talkingToPersonTitle: string;
  talkingToPersonBody: string;
  twoOneOne: string;
  warnings: string;
  warming: string;
  contactFirstTitle: string;
  detailsFor: string;
  close: string;
  liveRegion: string;
  unknown: string;
  clearConversation: string;
  transcriptSaved: string;
  quickIdeas: string;
  exampleTitle: string;
}

const en: ConnectorCopy = {
  badge: 'Community & social connection',
  title: 'Sprout Community Connector',
  subtitle:
    'Find verified community programs, social groups and volunteer opportunities near you — with a real organization or person to contact.',
  intro:
    'Tell me what you are looking for in your own words. I can help find social groups, senior activities, cultural organizations, volunteering, and accessible events.',
  privacyTitle: 'Your privacy',
  privacyBody:
    'To browse you only need an activity interest and a city or ZIP code. Please do not enter your full name, date of birth, street address, or contact details.',
  privacyDetail:
    'Nothing you type is saved by default. This conversation stays in this browser tab only unless you choose to save it on this device.',
  resetNote: 'You can clear this conversation and every preference at any time.',
  saveToggle: 'Save this conversation on this device',
  savedSession: 'A saved conversation was restored from this device.',
  restart: 'Restart questions',
  resetAll: 'Clear everything',
  startIntake: 'Use the guided questions',
  back: 'Back',
  skip: 'Skip',
  next: 'Continue',
  finish: 'See matches',
  edit: 'Edit',
  reviewTitle: 'Your answers so far',
  questionOf: 'Question',
  answerNotSet: 'Not answered',
  skipped: 'Skipped',
  requiredNote: 'Only the city or ZIP code and what you want to find are needed.',
  chatTitle: 'Ask Sprout',
  chatPlaceholder: 'For example: “I want to meet new people near me”',
  send: 'Send',
  voiceInput: 'Speak instead of typing',
  voiceUnsupported: 'Voice input is not available in this browser. You can type your answer.',
  readAloud: 'Read replies aloud',
  readAloudOn: 'Read aloud on',
  readAloudOff: 'Read aloud off',
  listening: 'Listening…',
  demoPrompt: 'Try an example',
  rosaButton: 'Try Rosa’s situation',
  resultsTitle: 'Possible matches',
  resultsSubtitle:
    'These are demonstration records unless marked as a real organization. Always confirm details with the organization before you go.',
  showResults: 'Show matching activities',
  talkToPerson: 'Speak with a person',
  changePreferences: 'Change preferences',
  matchesFound: 'matches shown',
  noResultsTitle: 'No confirmed matches yet',
  noResultsBody:
    'I could not find a program that matches all of your preferences. I will not invent a result. You can widen the search or ask to speak with a person.',
  noResultsTips: [
    'Try a nearby city or “virtual” instead of a specific ZIP code.',
    'Remove a time or accessibility preference to see more options.',
    'Ask to speak with a person who can check by phone.'
  ],
  notConfirmed: 'Not confirmed.',
  verified: 'Demo record reviewed',
  demoRecord: 'Sample record — fictional organization',
  realOrg: 'Real organization — program details not confirmed',
  samplePhone: 'Sample number — not a real phone line',
  viewSource: 'View official source',
  call: 'Call',
  noVerifiedPhone: 'No verified phone number',
  reviewDetails: 'Review details',
  hideDetails: 'Hide details',
  lastVerified: 'Last verified',
  organization: 'Organization',
  location: 'Location',
  schedule: 'Days and times',
  cost: 'Cost',
  languages: 'Languages',
  accessibility: 'Accessibility',
  transportation: 'Transportation',
  contact: 'Contact',
  source: 'Official source',
  description: 'Activity',
  daysAndTimes: 'Days and times',
  howToJoin: 'How to sign up',
  caregiver: 'Caregiver welcome',
  wheelchair: 'Wheelchair accessible',
  transit: 'Public transportation nearby',
  transportationAssistance: 'Transportation assistance',
  notAvailableForLanguage:
    'Automated explanations are currently available in English and Spanish. I can help you arrange a person who speaks your preferred language.',
  talkingToPersonTitle: 'Talk with a person',
  talkingToPersonBody:
    'Here is how to reach the organizations above. If a program has no confirmed phone number, use its official website, or call 2-1-1 for free local navigation.',
  twoOneOne:
    'Call 2-1-1 for free community services navigation in Santa Clara County. Interpreters are available.',
  warnings: 'Things to confirm',
  warming: '',
  contactFirstTitle: 'Talk to the organizer first',
  detailsFor: 'Details for',
  close: 'Close',
  liveRegion: 'New assistant message',
  unknown: 'Not confirmed.',
  clearConversation: 'Clear conversation',
  transcriptSaved: 'Saved on this device',
  quickIdeas: 'Quick answers',
  exampleTitle: 'Example requests'
};

const es: ConnectorCopy = {
  badge: 'Comunidad y conexión social',
  title: 'Conector Comunitario Sprout',
  subtitle:
    'Encuentre programas comunitarios verificados, grupos sociales y oportunidades de voluntariado cerca de usted, con una organización o persona real para contactar.',
  intro:
    'Dígame qué busca con sus propias palabras. Puedo ayudarle a encontrar grupos sociales, actividades para adultos mayores, organizaciones culturales, voluntariado y eventos accesibles.',
  privacyTitle: 'Su privacidad',
  privacyBody:
    'Para buscar solo necesitamos un interés y una ciudad o código postal. Por favor no escriba su nombre completo, fecha de nacimiento, dirección exacta ni datos de contacto.',
  privacyDetail:
    'Nada de lo que escribe se guarda de forma predeterminada. Esta conversación permanece solo en esta pestaña, a menos que elija guardarla en este dispositivo.',
  resetNote: 'Puede borrar esta conversación y todas sus preferencias en cualquier momento.',
  saveToggle: 'Guardar esta conversación en este dispositivo',
  savedSession: 'Se restauró una conversación guardada en este dispositivo.',
  restart: 'Reiniciar preguntas',
  resetAll: 'Borrar todo',
  startIntake: 'Usar las preguntas guiadas',
  back: 'Atrás',
  skip: 'Omitir',
  next: 'Continuar',
  finish: 'Ver opciones',
  edit: 'Editar',
  reviewTitle: 'Sus respuestas hasta ahora',
  questionOf: 'Pregunta',
  answerNotSet: 'Sin responder',
  skipped: 'Omitida',
  requiredNote: 'Solo se necesitan la ciudad o el código postal y lo que desea encontrar.',
  chatTitle: 'Pregunte a Sprout',
  chatPlaceholder: 'Por ejemplo: “Quiero conocer gente nueva cerca de mí”',
  send: 'Enviar',
  voiceInput: 'Hablar en lugar de escribir',
  voiceUnsupported: 'La entrada de voz no está disponible en este navegador. Puede escribir su respuesta.',
  readAloud: 'Leer las respuestas en voz alta',
  readAloudOn: 'Lectura en voz alta activada',
  readAloudOff: 'Lectura en voz alta desactivada',
  listening: 'Escuchando…',
  demoPrompt: 'Ver un ejemplo',
  rosaButton: 'Probar la situación de Rosa',
  resultsTitle: 'Posibles opciones',
  resultsSubtitle:
    'Estos son registros de demostración, salvo que se indique que son una organización real. Confirme siempre los detalles con la organización antes de ir.',
  showResults: 'Mostrar actividades',
  talkToPerson: 'Hablar con una persona',
  changePreferences: 'Cambiar preferencias',
  matchesFound: 'opciones mostradas',
  noResultsTitle: 'Aún no hay opciones confirmadas',
  noResultsBody:
    'No encontré un programa que cumpla todas sus preferencias. No voy a inventar un resultado. Puede ampliar la búsqueda o pedir hablar con una persona.',
  noResultsTips: [
    'Pruebe una ciudad cercana o “virtual” en lugar de un código postal específico.',
    'Quite una preferencia de horario o accesibilidad para ver más opciones.',
    'Pida hablar con una persona que pueda verificar por teléfono.'
  ],
  notConfirmed: 'No confirmado.',
  verified: 'Registro de demostración revisado',
  demoRecord: 'Registro de ejemplo — organización ficticia',
  realOrg: 'Organización real — detalles del programa no confirmados',
  samplePhone: 'Número de ejemplo — no es una línea telefónica real',
  viewSource: 'Ver fuente oficial',
  call: 'Llamar',
  noVerifiedPhone: 'Sin teléfono verificado',
  reviewDetails: 'Revisar detalles',
  hideDetails: 'Ocultar detalles',
  lastVerified: 'Última verificación',
  organization: 'Organización',
  location: 'Ubicación',
  schedule: 'Días y horarios',
  cost: 'Costo',
  languages: 'Idiomas',
  accessibility: 'Accesibilidad',
  transportation: 'Transporte',
  contact: 'Contacto',
  source: 'Fuente oficial',
  description: 'Actividad',
  daysAndTimes: 'Días y horarios',
  howToJoin: 'Cómo inscribirse',
  caregiver: 'Se permite acompañante',
  wheelchair: 'Accesible en silla de ruedas',
  transit: 'Transporte público cerca',
  transportationAssistance: 'Apoyo de transporte',
  notAvailableForLanguage:
    'Las explicaciones automáticas están disponibles en inglés y español por ahora. Puedo ayudarle a coordinar una persona que hable su idioma preferido.',
  talkingToPersonTitle: 'Hablar con una persona',
  talkingToPersonBody:
    'Así puede comunicarse con las organizaciones anteriores. Si un programa no tiene teléfono confirmado, use su sitio web oficial o llame al 2-1-1 para recibir orientación local gratuita.',
  twoOneOne:
    'Llame al 2-1-1 para orientación gratuita sobre servicios comunitarios en el Condado de Santa Clara. Hay intérpretes disponibles.',
  warnings: 'Qué conviene confirmar',
  warming: '',
  contactFirstTitle: 'Hable primero con la organización',
  detailsFor: 'Detalles de',
  close: 'Cerrar',
  liveRegion: 'Nuevo mensaje del asistente',
  unknown: 'No confirmado.',
  clearConversation: 'Borrar conversación',
  transcriptSaved: 'Guardada en este dispositivo',
  quickIdeas: 'Respuestas rápidas',
  exampleTitle: 'Solicitudes de ejemplo'
};

export const connectorCopy: Record<UiLanguage, ConnectorCopy> = { en, es };

export type QuestionKind = 'single' | 'multiple' | 'location' | 'language';

export interface IntakeOption {
  value: string;
  label: LocalizedText;
  hint?: LocalizedText;
}

export interface IntakeQuestion {
  id: IntakeQuestionId;
  kind: QuestionKind;
  title: LocalizedText;
  help: LocalizedText;
  options?: IntakeOption[];
  skippable: boolean;
}

export const INTAKE_QUESTIONS: IntakeQuestion[] = [
  {
    id: 'goals',
    kind: 'single',
    title: { en: 'What would you like help finding today?', es: '¿Qué le gustaría encontrar hoy?' },
    help: {
      en: 'Choose one. You can change it later.',
      es: 'Elija una opción. Puede cambiarla después.'
    },
    skippable: true,
    options: [
      { value: 'meet-people', label: { en: 'Meet new people', es: 'Conocer gente nueva' } },
      { value: 'community-events', label: { en: 'Community events', es: 'Eventos comunitarios' } },
      { value: 'clubs-groups', label: { en: 'Clubs or groups', es: 'Clubes o grupos' } },
      { value: 'senior-activities', label: { en: 'Senior activities', es: 'Actividades para adultos mayores' } },
      { value: 'volunteering', label: { en: 'Volunteering', es: 'Voluntariado' } },
      { value: 'explore', label: { en: 'Explore options', es: 'Explorar opciones' } }
    ]
  },
  {
    id: 'interests',
    kind: 'multiple',
    title: { en: 'What kinds of activities interest you?', es: '¿Qué tipos de actividades le interesan?' },
    help: {
      en: 'Choose as many as you like, or skip if you are not sure.',
      es: 'Elija todas las que quiera, u omita si no está seguro.'
    },
    skippable: true,
    options: [
      { value: 'arts', label: { en: 'Arts and crafts', es: 'Arte y manualidades' } },
      { value: 'music', label: { en: 'Music or dancing', es: 'Música o baile' } },
      { value: 'exercise', label: { en: 'Exercise or walking', es: 'Ejercicio o caminatas' } },
      { value: 'cultural', label: { en: 'Cultural events', es: 'Eventos culturales' } },
      { value: 'games', label: { en: 'Games or social gatherings', es: 'Juegos o reuniones sociales' } },
      { value: 'learning', label: { en: 'Learning new skills', es: 'Aprender nuevas habilidades' } },
      { value: 'other', label: { en: 'Other', es: 'Otra cosa' } }
    ]
  },
  {
    id: 'location',
    kind: 'location',
    title: { en: 'Where should we look?', es: '¿Dónde buscamos?' },
    help: {
      en: 'A city or ZIP code is enough, or choose virtual. Please do not enter a street address.',
      es: 'Basta una ciudad o código postal, o elija virtual. Por favor no escriba una dirección exacta.'
    },
    skippable: true
  },
  {
    id: 'language',
    kind: 'language',
    title: { en: 'What language would you like to use?', es: '¿Qué idioma le gustaría usar?' },
    help: {
      en: 'This is your choice. We never guess your language from where you live or who you are.',
      es: 'Esta es su elección. Nunca adivinamos su idioma por dónde vive o quién es.'
    },
    skippable: true
  },
  {
    id: 'access',
    kind: 'multiple',
    title: {
      en: 'Do you need any accessibility or transportation support?',
      es: '¿Necesita apoyo de accesibilidad o transporte?'
    },
    help: {
      en: 'Choose all that apply, or “No preference”.',
      es: 'Elija todo lo que aplique, o “Sin preferencia”.'
    },
    skippable: true,
    options: [
      { value: 'wheelchair', label: { en: 'Wheelchair accessible', es: 'Accesible en silla de ruedas' } },
      { value: 'transit', label: { en: 'Public transportation nearby', es: 'Transporte público cerca' } },
      {
        value: 'transportation-assistance',
        label: { en: 'Transportation assistance', es: 'Apoyo de transporte' }
      },
      { value: 'virtual', label: { en: 'Virtual activities', es: 'Actividades virtuales' } },
      { value: 'none', label: { en: 'No preference', es: 'Sin preferencia' } }
    ]
  },
  {
    id: 'time',
    kind: 'single',
    title: { en: 'When works best for you?', es: '¿Cuándo le funciona mejor?' },
    help: { en: 'Choose one.', es: 'Elija una opción.' },
    skippable: true,
    options: [
      { value: 'weekday-mornings', label: { en: 'Weekday mornings', es: 'Mañanas entre semana' } },
      { value: 'weekday-afternoons', label: { en: 'Weekday afternoons', es: 'Tardes entre semana' } },
      { value: 'evenings', label: { en: 'Evenings', es: 'Noches' } },
      { value: 'weekends', label: { en: 'Weekends', es: 'Fines de semana' } },
      { value: 'anytime', label: { en: 'Anytime', es: 'Cualquier horario' } }
    ]
  },
  {
    id: 'nextStep',
    kind: 'single',
    title: { en: 'What would you like to do next?', es: '¿Qué le gustaría hacer ahora?' },
    help: {
      en: 'You can always change your preferences afterwards.',
      es: 'Siempre puede cambiar sus preferencias después.'
    },
    skippable: true,
    options: [
      { value: 'show-results', label: { en: 'Show matching activities', es: 'Mostrar actividades' } },
      { value: 'talk-to-person', label: { en: 'Speak with a person', es: 'Hablar con una persona' } },
      { value: 'change-preferences', label: { en: 'Change preferences', es: 'Cambiar preferencias' } }
    ]
  }
];

export const OPTION_LABELS: Record<string, LocalizedText> = Object.fromEntries(
  INTAKE_QUESTIONS.flatMap((question) =>
    (question.options ?? []).map((option) => [option.value, option.label])
  )
);

export const ACCESS_LABELS: Record<string, LocalizedText> = {
  wheelchair: { en: 'Wheelchair accessible', es: 'Accesible en silla de ruedas' },
  transit: { en: 'Public transportation nearby', es: 'Transporte público cerca' },
  'transportation-assistance': { en: 'Transportation assistance', es: 'Apoyo de transporte' },
  virtual: { en: 'Virtual activities', es: 'Actividades virtuales' },
  none: { en: 'No preference', es: 'Sin preferencia' }
};

export function labelFor(value: string, language: UiLanguage): string {
  return OPTION_LABELS[value]?.[language] ?? value;
}
