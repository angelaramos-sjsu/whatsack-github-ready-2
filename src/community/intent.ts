import type {
  AdaptiveSignalId,
  CommunityIntentId,
  CommunityLanguageCode,
  IntentResult,
  RegionalVariety
} from './types';

/** Lowercase and drop accents so "Español", "espanol" and "ESPAÑOL" all match. */
export const normalizeCommunityText = (text: string): string =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Whole-word/phrase match, so "club" never matches inside "clubhouse". */
const matchesPhrase = (haystack: string, phrase: string): boolean =>
  new RegExp(`(^|[^a-z0-9])${escapeRegExp(normalizeCommunityText(phrase))}([^a-z0-9]|$)`).test(haystack);

const INTENT_PHRASES: Record<CommunityIntentId, string[]> = {
  'meet-people': [
    'meet new people', 'meet people', 'meet others', 'meet neighbors', 'meet neighbours',
    'make friends', 'new friends', 'social activities', 'socialize', 'socialise',
    'people who share my interests', 'share my interests', 'people with similar interests',
    'i feel lonely', 'feel lonely', 'i am lonely', 'lonely', 'feel alone', 'feel isolated',
    'new to the area', 'new in town', 'just moved', 'get involved', 'connect with people',
    'conocer gente', 'conocer personas', 'conocer a personas', 'conocer a otras personas',
    'conocer vecinos', 'hacer amigos', 'hacer amigas', 'hacer amistades', 'nuevas amistades',
    'me siento sola', 'me siento solo', 'me siento aislada', 'me siento aislado',
    'soledad', 'compania', 'soy nuevo', 'soy nueva', 'nuevo en la zona', 'nueva en la zona',
    'nuevo en el area', 'nueva en el area', 'integrarme', 'convivir',
    'conhecer pessoas', 'fazer amigos', 'me sinto so', 'sozinho', 'sozinha'
  ],
  'community-events': [
    'community events', 'free community events', 'local events', 'events near me',
    'events in my area', 'what is happening', 'things to do', 'family events',
    'eventos comunitarios', 'eventos gratis', 'eventos gratuitos', 'eventos locales',
    'eventos cerca', 'que hay cerca', 'actividades gratis', 'actividades gratuitas',
    'cosas que hacer', 'eventos comunitarios', 'eventos gratuitos'
  ],
  'clubs-groups': [
    'clubs', 'club', 'groups i can join', 'join a group', 'local clubs', 'groups near me',
    'community groups', 'activity group', 'meetup', 'social club',
    'clubes', 'grupos', 'unirme a un grupo', 'grupos cerca', 'grupos comunitarios',
    'grupos locales', 'grupo de la comunidad'
  ],
  'senior-activities': [
    'senior center', 'senior centers', 'senior program', 'senior programs', 'for seniors',
    'older adults', 'older adult', 'retired', 'retirement', 'daytime activities',
    'elderly', 'grandparents', 'people my parents age',
    'centro para mayores', 'centros para mayores', 'adultos mayores', 'adulto mayor',
    'personas mayores', 'tercera edad', 'jubilado', 'jubilada', 'jubilados', 'jubiladas',
    'pensionado', 'pensionada', 'actividades de dia', 'actividades diurnas',
    'programa para mayores', 'abuelos', 'abuelas',
    'idosos', 'terceira idade', 'aposentado', 'aposentada'
  ],
  volunteering: [
    'volunteer', 'volunteering', 'volunteer opportunities', 'volunteer work',
    'community garden', 'community gardens', 'neighborhood projects', 'help out',
    'give back', 'clean up', 'cleanup',
    'voluntariado', 'voluntario', 'voluntaria', 'voluntarios', 'huerto comunitario',
    'huertos comunitarios', 'proyectos del vecindario', 'ayudar en la comunidad',
    'limpieza del vecindario', 'trabajo voluntario',
    'voluntariado', 'trabalho voluntario'
  ],
  explore: [
    'explore options', 'not sure', 'anything', 'what do you suggest', 'show me options',
    'i don\'t know what interests me', 'no se que me gusta', 'no se que intereses',
    'explorar opciones', 'no estoy seguro', 'no estoy segura', 'muestrame opciones'
  ],
  'contact-organization': [
    'who can i call', 'who do i call', 'phone number', 'speak with someone',
    'talk to someone', 'talk to a person', 'speak with a person', 'how do i contact',
    'reach someone', 'contact the organization', 'call them',
    'a quien llamo', 'quien puedo llamar', 'numero de telefono', 'telefono',
    'hablar con alguien', 'hablar con una persona', 'contactar', 'como contacto',
    'comunicarme', 'con quien hablo'
  ],
  'language-culture': [
    'spanish-speaking', 'spanish speaking', 'speak spanish', 'in spanish',
    'portuguese is spoken', 'speak portuguese', 'vietnamese-speaking', 'speak vietnamese',
    'cantonese speaking', 'mandarin speaking', 'korean speaking', 'tagalog speaking',
    'cultural events', 'culture', 'language group', 'bilingual', 'interpretation',
    'hablan espanol', 'se habla espanol', 'grupos en espanol', 'en espanol',
    'personas que hablen', 'que hablen espanol', 'donde se habla portugues',
    'idioma', 'cultura', 'cultural', 'eventos culturales', 'interpretacion'
  ],
  accessibility: [
    'wheelchair', 'wheelchair accessible', 'wheelchair-accessible', 'accessible activities',
    'accessibility', 'mobility', 'i don\'t drive', 'i do not drive', 'cannot drive',
    'can not drive', 'no car', 'public transportation', 'transportation',
    'transportation assistance', 'virtual', 'online', 'caregiver', 'caregivers',
    'family member', 'bring my family', 'bring a caregiver',
    'silla de ruedas', 'accesible', 'accesibilidad', 'movilidad', 'no manejo',
    'no conduzco', 'no tengo carro', 'no tengo coche', 'transporte publico',
    'transporte', 'ayuda con transporte', 'virtual', 'en linea', 'acompanante',
    'cuidador', 'cuidadora', 'familiar', 'llevar a un familiar'
  ],
  'register-help': [
    'how do i sign up', 'how to sign up', 'sign up', 'sign me up', 'register',
    'registration', 'enroll', 'help me register', 'how to join', 'apply for a program',
    'como me inscribo', 'inscribirme', 'inscripcion', 'registrarme', 'registro',
    'como me registro', 'apuntarme', 'ayuda para inscribirme', 'como participo'
  ],
  'cost-question': [
    'is it free', 'is this free', 'is the program free', 'cost', 'how much does it cost',
    'how much', 'i can\'t afford', 'i cannot afford', 'cannot afford', 'can\'t afford',
    'cheap', 'low cost', 'no money', 'free',
    'es gratis', 'cuanto cuesta', 'cuanto cobran', 'costo', 'precio',
    'no puedo pagar', 'no tengo dinero', 'gratis', 'economico'
  ]
};

const LANGUAGE_PHRASES: Array<{ code: CommunityLanguageCode; phrases: string[] }> = [
  { code: 'es', phrases: ['spanish', 'espanol', 'espanola', 'castellano', 'espanol latino', 'espanol mexicano'] },
  { code: 'pt', phrases: ['portuguese', 'portugues', 'portuguesa', 'portugues brasileiro'] },
  { code: 'vi', phrases: ['vietnamese', 'vietnamita', 'tieng viet'] },
  { code: 'zh-Hans', phrases: ['mandarin', 'mandarin chinese', 'chino mandarin'] },
  { code: 'zh-Hant', phrases: ['cantonese', 'cantonés', 'cantones'] },
  { code: 'tl', phrases: ['tagalog', 'filipino'] },
  { code: 'ko', phrases: ['korean', 'coreano', 'coreana'] },
  { code: 'en', phrases: ['english', 'ingles'] }
];

const REGION_PHRASES: Array<{ region: RegionalVariety; phrases: string[] }> = [
  { region: 'mexico', phrases: ['from mexico', 'de mexico', 'mexican spanish', 'espanol de mexico', 'espanol mexicano', 'mexico'] },
  { region: 'spain', phrases: ['from spain', 'de espana', 'spain', 'espana', 'castellano de espana'] },
  { region: 'latin-america', phrases: ['latin america', 'latinoamerica', 'latino americano', 'latinoamericana', 'latam'] },
  { region: 'brazil', phrases: ['from brazil', 'de brasil', 'brazil', 'brasil', 'brazilian'] },
  { region: 'portugal', phrases: ['portugal'] }
];

const CITY_PHRASES = [
  'san jose', 'sunnyvale', 'mountain view', 'redwood city', 'santa clara',
  'palo alto', 'campbell', 'milpitas', 'cupertino', 'los altos', 'san mateo',
  'fremont', 'hayward'
];

const matched = (text: string, phrases: string[]): string[] =>
  phrases.filter((phrase) => matchesPhrase(text, phrase));

/**
 * Recognize the community intent(s) in a natural-language request.
 *
 * Phrasings repeat deliberately: people ask "where can I volunteer", "are there
 * volunteer opportunities for older adults" and "¿dónde puedo ser voluntario?"
 * for the same need, and all three must land on the same intent.
 */
export const detectCommunityIntent = (input: string): IntentResult => {
  const text = normalizeCommunityText(input);
  const matchedPhrases: string[] = [];
  const intents: CommunityIntentId[] = [];

  (Object.keys(INTENT_PHRASES) as CommunityIntentId[]).forEach((intent) => {
    const hits = matched(text, INTENT_PHRASES[intent]);
    if (hits.length > 0) {
      intents.push(intent);
      matchedPhrases.push(...hits);
    }
  });

  const hints: IntentResult['hints'] = {};
  const languageHit = LANGUAGE_PHRASES.find((entry) => matched(text, entry.phrases).length > 0);
  if (languageHit) {
    hints.language = languageHit.code;
    if (!intents.includes('language-culture')) intents.push('language-culture');
  }

  const regionHit = REGION_PHRASES.find((entry) => matched(text, entry.phrases).length > 0);
  if (regionHit) {
    hints.region = regionHit.region;
    // "Portuguese from Brazil" also tells us the language, so the user is not
    // asked a second time. We still never infer a variety without their words.
    if (regionHit.region === 'brazil' || regionHit.region === 'portugal') hints.language = 'pt';
    if (regionHit.region === 'mexico' || regionHit.region === 'spain' || regionHit.region === 'latin-america') {
      if (!hints.language) hints.language = 'es';
    }
  }

  const cityHit = CITY_PHRASES.find((city) => matchesPhrase(text, city));
  if (cityHit) hints.city = cityHit;

  const zipHit = text.match(/\b9\d{4}\b/);
  if (zipHit) hints.zip = zipHit[0];

  if (matched(text, ['virtual', 'online', 'en linea', 'remote', 'remota', 'remoto']).length > 0) {
    hints.virtual = true;
  }
  if (matched(text, ['wheelchair', 'silla de ruedas', 'wheelchair accessible']).length > 0) {
    hints.wheelchair = true;
  }
  if (
    matched(text, [
      "don't drive", 'do not drive', 'cannot drive', 'can not drive', 'no car',
      'no manejo', 'no conduzco', 'no tengo carro', 'no tengo coche', 'sin carro'
    ]).length > 0
  ) {
    hints.noDrive = true;
  }
  if (
    matched(text, [
      'free', 'gratis', "can't afford", 'cannot afford', 'no puedo pagar',
      'no tengo dinero', 'too expensive', 'muy caro'
    ]).length > 0
  ) {
    hints.free = true;
  }
  if (matched(text, ['caregiver', 'acompanante', 'cuidador', 'cuidadora', 'family member', 'familiar']).length > 0) {
    hints.caregiver = true;
  }
  if (intents.includes('senior-activities')) hints.senior = true;
  if (intents.includes('register-help')) hints.wantsRegisterHelp = true;
  if (intents.includes('contact-organization')) hints.wantsContact = true;

  return { intents: Array.from(new Set(intents)), matchedPhrases: Array.from(new Set(matchedPhrases)), hints };
};

const SIGNAL_PHRASES: Record<AdaptiveSignalId, string[]> = {
  lonely: [
    'i feel lonely', 'feel lonely', 'i am lonely', 'lonely', 'feel alone', 'i feel isolated',
    'me siento sola', 'me siento solo', 'me siento aislada', 'me siento aislado',
    'me siento muy sola', 'me siento muy solo', 'soledad', 'sola durante la semana',
    'solo durante la semana', 'me siento triste', 'sozinho', 'sozinha'
  ],
  'same-age': [
    'people my age', 'my age', 'same age', 'people of my age',
    'personas de mi edad', 'gente de mi edad', 'de mi edad'
  ],
  'limited-english': [
    "don't speak much english", 'do not speak much english', 'little english',
    'not much english', 'no english', 'my english is not good', 'i speak spanish',
    'no hablo mucho ingles', 'no hablo ingles', 'poco ingles', 'mi ingles no es bueno'
  ],
  'no-drive': [
    "don't drive", 'do not drive', 'cannot drive', 'can not drive', 'no car', 'no license',
    'no manejo', 'no conduzco', 'no tengo carro', 'no tengo coche', 'no tengo licencia',
    'sin carro', 'sin coche'
  ],
  'nervous-alone': [
    'nervous', 'anxious', 'scared to go', 'afraid to go', 'going alone', 'attend alone',
    'nerviosa', 'nervioso', 'me da miedo', 'ir sola', 'ir solo', 'sola a la actividad',
    'solo a la actividad', 'ansiedad'
  ],
  'unsure-interests': [
    "don't know what interests me", 'do not know what interests me', 'not sure what i like',
    "i don't know what i'm interested in", 'no se que me gusta', 'no se que intereses',
    'no se que me interesa', 'no tengo intereses'
  ],
  'cannot-afford': [
    "can't afford", 'cannot afford', 'can not afford', 'no money', 'too expensive',
    'no puedo pagar', 'no tengo dinero', 'muy caro', 'sin dinero'
  ],
  'hard-to-use-websites': [
    'trouble using websites', 'hard to use websites', 'confusing website',
    'hard for me to use the internet', 'i have trouble using websites',
    'me cuesta usar', 'no se usar la computadora', 'no uso internet',
    'problemas con la pagina', 'dificil para mi usar'
  ]
};

/** Adaptive follow-ups triggered by how the person describes their situation. */
export const detectAdaptiveSignals = (input: string): AdaptiveSignalId[] => {
  const text = normalizeCommunityText(input);
  return (Object.keys(SIGNAL_PHRASES) as AdaptiveSignalId[]).filter(
    (signal) => matched(text, SIGNAL_PHRASES[signal]).length > 0
  );
};
