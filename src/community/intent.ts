import {
  AccessNeed,
  ActivityInterest,
  AdaptiveSignal,
  AgeGroupPreference,
  ConnectorGoal,
  ConnectorPreferences,
  IntentId,
  LanguagePreference,
  RecognizedIntent,
  RegionVariety,
  TimePreference
} from './types';

/**
 * Rule-based intent recognition.
 *
 * This prototype has no language model behind it. Recognition is deterministic
 * phrase matching over normalized (lower-cased, accent-stripped) text so the
 * behaviour is testable and explainable. Spanish and English phrasings are
 * covered; Portuguese phrases are included where they are common.
 */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matches(haystack: string, term: string): boolean {
  const needle = normalize(term);
  if (!needle) return false;
  if (needle.includes(' ')) return haystack.includes(needle);
  return new RegExp(`(^|[^a-z0-9])${escapeRegex(needle)}([^a-z0-9]|$)`).test(haystack);
}

function anyMatch(haystack: string, terms: string[]): boolean {
  return terms.some((term) => matches(haystack, term));
}

const INTENT_TERMS: Record<IntentId, string[]> = {
  social: [
    'meet new people',
    'meet people',
    'meet others',
    'make friends',
    'new friends',
    'social activities',
    'socialize',
    'socialise',
    'lonely',
    'alone during the week',
    'feel alone',
    'local clubs',
    'clubs or groups',
    'join a group',
    'new to the area',
    'just moved',
    'new in town',
    'conocer gente',
    'conocer personas',
    'conocer a otras personas',
    'hacer amigos',
    'nuevos amigos',
    'actividades sociales',
    'socializar',
    'me siento sola',
    'me siento solo',
    'me siento un poco sola',
    'me siento un poco solo',
    'nuevo en la zona',
    'nueva en la zona',
    'acabo de llegar',
    'recien llegado',
    'recien llegada',
    'grupos locales'
  ],
  'older-adults': [
    'senior',
    'seniors',
    'older adult',
    'older adults',
    'elderly',
    'retired',
    'retiree',
    'senior center',
    'senior centres',
    'daytime activities',
    '55 and older',
    '55+',
    '60+',
    '65+',
    'adultos mayores',
    'adulto mayor',
    'personas mayores',
    'tercera edad',
    'jubilado',
    'jubilada',
    'centro de dia',
    'centros para mayores',
    'actividades de dia'
  ],
  'language-culture': [
    'spanish speaking',
    'spanish-speaking',
    'spanish speaking groups',
    'portuguese is spoken',
    'portuguese speaking',
    'in spanish',
    'in portuguese',
    'language group',
    'language exchange',
    'cultural',
    'culture',
    'heritage',
    'idioma',
    'en espanol',
    'hablen espanol',
    'habla espanol',
    'portugues',
    'cultural',
    'cultura',
    'intercambio de idiomas'
  ],
  accessibility: [
    'wheelchair',
    'wheelchair accessible',
    'wheelchair-accessible',
    'accessible',
    'accessibility',
    'disability',
    'disabilities',
    'disabled',
    'mobility',
    'silla de ruedas',
    'accesible',
    'accesibilidad',
    'discapacidad',
    'movilidad'
  ],
  transport: [
    "don't drive",
    'do not drive',
    'dont drive',
    'no car',
    'without a car',
    'public transportation',
    'public transit',
    'transportation assistance',
    'transport',
    'transit',
    'bus route',
    'vta',
    'samtrans',
    'no manejo',
    'no conduzco',
    'no tengo carro',
    'no tengo coche',
    'transporte publico',
    'autobus',
    'transporte'
  ],
  virtual: ['virtual', 'online', 'zoom', 'remote', 'from home', 'en linea', 'desde casa', 'remoto'],
  volunteering: [
    'volunteer',
    'volunteering',
    'community garden',
    'community gardens',
    'give back',
    'help out',
    'voluntario',
    'voluntaria',
    'voluntariado',
    'jardin comunitario',
    'jardines comunitarios'
  ],
  contact: [
    'how do i sign up',
    'sign up',
    'register',
    'is this free',
    'how much',
    'who can i call',
    'can i call',
    'phone number',
    'contact',
    'speak to someone',
    'talk to a person',
    'speak with a person',
    'someone in my preferred language',
    'como me inscribo',
    'inscribirme',
    'registrarme',
    'es gratis',
    'cuanto cuesta',
    'a quien llamo',
    'puedo llamar',
    'telefono',
    'contactar',
    'hablar con alguien',
    'hablar con una persona',
    'persona que hable'
  ],
  caregiver: [
    'caregiver',
    'caretaker',
    'bring a caregiver',
    'bring my caregiver',
    'with my caregiver',
    'cuidador',
    'cuidadora',
    'acompanante',
    'traer a mi cuidador'
  ],
  newcomer: [
    'new to the area',
    'just moved',
    'newcomer',
    'immigrant',
    'refugee',
    'new in town',
    'acabo de llegar',
    'recien llegado',
    'recien llegada',
    'nuevo en el pais'
  ],
  affordability: [
    'free',
    'no cost',
    'low cost',
    'cheap',
    "can't afford",
    'cannot afford',
    'afford',
    'gratis',
    'sin costo',
    'no puedo pagar',
    'economico',
    'barato'
  ]
};

const INTEREST_TERMS: Record<Exclude<ActivityInterest, 'other'>, string[]> = {
  arts: [
    'arts',
    'art',
    'crafts',
    'craft',
    'painting',
    'pottery',
    'knitting',
    'sewing',
    'manualidades',
    'pintura',
    'tejer',
    'ceramica',
    'arte'
  ],
  music: [
    'music',
    'dancing',
    'dance',
    'singing',
    'choir',
    'band',
    'musica',
    'baile',
    'bailar',
    'canto',
    'coro'
  ],
  exercise: [
    'exercise',
    'walking',
    'walking group',
    'yoga',
    'fitness',
    'gym',
    'swimming',
    'tai chi',
    'ejercicio',
    'caminar',
    'gimnasio',
    'natacion'
  ],
  cultural: [
    'cultural events',
    'cultural',
    'culture',
    'heritage',
    'festival',
    'history',
    'cultura',
    'eventos culturales',
    'festival',
    'historia'
  ],
  games: [
    'games',
    'cards',
    'bingo',
    'board games',
    'mahjong',
    'chess',
    'social gatherings',
    'social gathering',
    'juegos',
    'cartas',
    'ajedrez',
    'reuniones'
  ],
  learning: [
    'learning new skills',
    'learn new skills',
    'learn',
    'classes',
    'class',
    'workshop',
    'computer',
    'technology',
    'skills',
    'aprender',
    'clases',
    'taller',
    'computacion',
    'tecnologia'
  ]
};

const SIGNAL_TERMS: Record<AdaptiveSignal, string[]> = {
  loneliness: [
    'lonely',
    'alone',
    'isolated',
    'no one to talk to',
    'feel alone',
    'me siento sola',
    'me siento solo',
    'me siento un poco sola',
    'me siento un poco solo',
    'soledad',
    'aislada',
    'aislado',
    'sola durante la semana',
    'solo durante la semana'
  ],
  'age-peer': [
    'my age',
    'people my age',
    'same age',
    'gente de mi edad',
    'personas de mi edad',
    'de mi edad'
  ],
  'language-barrier': [
    "don't speak much english",
    'do not speak much english',
    'dont speak much english',
    "don't speak english",
    'little english',
    'no hablo mucho ingles',
    'no hablo ingles',
    'hablo poco ingles',
    'language barrier'
  ],
  'no-drive': [
    "don't drive",
    'do not drive',
    'dont drive',
    'no car',
    'without a car',
    'no manejo',
    'no conduzco',
    'no tengo carro',
    'no tengo coche'
  ],
  'nervous-alone': [
    'nervous',
    'anxious',
    'attending alone',
    'go alone',
    'going alone',
    'by myself',
    'nerviosa',
    'nervioso',
    'ir sola',
    'ir solo',
    'sola al evento'
  ],
  'no-interests': [
    "don't know what interests me",
    'do not know what interests me',
    "don't know what i like",
    'not sure what i like',
    'no se que me interesa',
    'no se que me gusta'
  ],
  cost: [
    "can't afford",
    'cannot afford',
    'too expensive',
    'money is tight',
    'no puedo pagar',
    'muy caro',
    'no tengo dinero'
  ],
  'tech-trouble': [
    'trouble using websites',
    'hard to use websites',
    'not good with computers',
    'not good with technology',
    'cannot use the website',
    "can't use the website",
    'no se usar la computadora',
    'no puedo usar el sitio web',
    'dificultad con la computadora',
    'no se usar el internet'
  ]
};

const TIME_TERMS: Array<{ value: TimePreference; terms: string[] }> = [
  {
    value: 'weekday-mornings',
    terms: ['weekday mornings', 'weekday morning', 'mornings', 'morning', 'mananas', 'por la manana']
  },
  {
    value: 'weekday-afternoons',
    terms: ['weekday afternoons', 'afternoons', 'afternoon', 'tardes', 'por la tarde']
  },
  { value: 'evenings', terms: ['evenings', 'evening', 'at night', 'noches', 'por la noche'] },
  { value: 'weekends', terms: ['weekends', 'weekend', 'saturdays', 'sundays', 'fines de semana'] },
  { value: 'anytime', terms: ['anytime', 'any time', 'flexible', 'cualquier momento', 'cualquier horario'] }
];

const CITY_NAMES = [
  'san jose',
  'east san jose',
  'santa clara',
  'sunnyvale',
  'cupertino',
  'campbell',
  'milpitas',
  'mountain view',
  'palo alto',
  'redwood city',
  'gilroy',
  'morgan hill',
  'los gatos',
  'los altos',
  'saratoga',
  'menlo park',
  'san mateo',
  'fremont',
  'newark',
  'union city',
  'hayward',
  'oakland',
  'san francisco'
];

const CITY_CANONICAL: Record<string, string> = {
  'east san jose': 'San Jose',
  'san jose': 'San Jose',
  'santa clara': 'Santa Clara',
  sunnyvale: 'Sunnyvale',
  cupertino: 'Cupertino',
  campbell: 'Campbell',
  milpitas: 'Milpitas',
  'mountain view': 'Mountain View',
  'palo alto': 'Palo Alto',
  'redwood city': 'Redwood City',
  gilroy: 'Gilroy',
  'morgan hill': 'Morgan Hill',
  'los gatos': 'Los Gatos',
  'los altos': 'Los Altos',
  saratoga: 'Saratoga',
  'menlo park': 'Menlo Park',
  'san mateo': 'San Mateo',
  fremont: 'Fremont',
  newark: 'Newark',
  'union city': 'Union City',
  hayward: 'Hayward',
  oakland: 'Oakland',
  'san francisco': 'San Francisco'
};

const SPANISH_MARKERS = [
  'que',
  'de',
  'la',
  'el',
  'me',
  'mi',
  'gustaria',
  'quiero',
  'buscar',
  'busco',
  'actividades',
  'personas',
  'espanol',
  'hola',
  'gracias',
  'donde',
  'cerca',
  'para',
  'con',
  'una',
  'sola',
  'siento',
  'conocer',
  'hablen',
  'llamo',
  'necesito',
  'tambien'
];

const PORTUGUESE_MARKERS = [
  'quero',
  'procurar',
  'procurando',
  'atividades',
  'pessoas',
  'perto',
  'voce',
  'nao',
  'obrigado',
  'obrigada',
  'portugues',
  'gostaria',
  'encontrar',
  'comunidade'
];

const LANGUAGE_NAMES: Array<{ code: LanguagePreference['code']; terms: string[] }> = [
  { code: 'es', terms: ['spanish', 'espanol', 'castellano', 'hablen espanol', 'en espanol'] },
  { code: 'pt', terms: ['portuguese', 'portugues'] },
  { code: 'zh-Hans', terms: ['mandarin', 'putonghua'] },
  { code: 'zh-Hant', terms: ['cantonese'] },
  { code: 'vi', terms: ['vietnamese', 'vietnamita'] },
  { code: 'tl', terms: ['tagalog', 'filipino'] },
  { code: 'ko', terms: ['korean', 'coreano'] },
  { code: 'en', terms: ['english', 'ingles'] }
];

const EXPLICIT_VARIETY_TERMS: Array<{ variety: RegionVariety; terms: string[] }> = [
  {
    variety: 'mexico',
    terms: ['spanish from mexico', 'mexican spanish', 'espanol de mexico', 'espanol mexicano']
  },
  {
    variety: 'spain',
    terms: ['spanish from spain', 'espanol de espana', 'castellano de espana']
  },
  {
    variety: 'latin-america',
    terms: [
      'spanish from latin america',
      'latin american spanish',
      'espanol latinoamericano',
      'espanol de latinoamerica'
    ]
  },
  {
    variety: 'brazil',
    terms: ['brazilian portuguese', 'portuguese from brazil', 'portugues de brasil']
  },
  {
    variety: 'portugal',
    terms: ['portuguese from portugal', 'european portuguese', 'portugues de portugal']
  }
];

function detectMessageLanguage(normalized: string): 'en' | 'es' | 'pt' | 'unknown' {
  const tokens = normalized.split(' ').filter(Boolean);
  const spanishScore = tokens.filter((token) => SPANISH_MARKERS.includes(token)).length;
  const portugueseScore = tokens.filter((token) => PORTUGUESE_MARKERS.includes(token)).length;
  if (portugueseScore >= 2 && portugueseScore > spanishScore) return 'pt';
  if (spanishScore >= 2 && spanishScore > portugueseScore) return 'es';
  return 'unknown';
}

function detectLanguagePreference(normalized: string): LanguagePreference | null {
  const hasLanguageBarrier = anyMatch(normalized, SIGNAL_TERMS['language-barrier']);

  const detected = LANGUAGE_NAMES.find((entry) => anyMatch(normalized, entry.terms));
  if (!detected) return null;

  // "I don't speak much English" is a barrier, not a request for English.
  if (detected.code === 'en' && hasLanguageBarrier) return null;

  const varietyEntry = EXPLICIT_VARIETY_TERMS.find((entry) => anyMatch(normalized, entry.terms));
  // Varieties are only taken from an explicit statement ("Spanish from Mexico").
  // They are never inferred from the user's city or ethnic background.
  const variety =
    varietyEntry && (detected.code === 'es' || detected.code === 'pt') ? varietyEntry.variety : null;

  return { code: detected.code, variety };
}

function detectLocation(normalized: string): RecognizedIntent['location'] {
  const virtual = anyMatch(normalized, INTENT_TERMS.virtual);
  const zipMatch = normalized.match(/\b9[45]\d{3}\b/);
  const city = CITY_NAMES.find((name) => matches(normalized, name));

  if (zipMatch) {
    return { zip: zipMatch[0], city: city ? CITY_CANONICAL[city] : undefined, virtual };
  }
  if (city) {
    return { city: CITY_CANONICAL[city], virtual };
  }
  if (virtual) {
    return { virtual: true };
  }
  return null;
}

function detectInterests(normalized: string): ActivityInterest[] {
  const found: ActivityInterest[] = [];
  (Object.keys(INTEREST_TERMS) as Array<Exclude<ActivityInterest, 'other'>>).forEach((interest) => {
    if (anyMatch(normalized, INTEREST_TERMS[interest])) found.push(interest);
  });
  return found;
}

function detectAccess(normalized: string): AccessNeed[] {
  const access: AccessNeed[] = [];
  if (anyMatch(normalized, INTENT_TERMS.accessibility)) access.push('wheelchair');
  if (
    anyMatch(normalized, [
      'transportation assistance',
      'ride service',
      'door to door',
      'pick me up',
      'transporte puerta a puerta',
      'me lleven'
    ])
  ) {
    access.push('transportation-assistance');
  }
  if (anyMatch(normalized, ['public transportation', 'public transit', 'bus route', 'vta', 'samtrans', 'transit', 'autobus', 'transporte publico'])) {
    access.push('transit');
  }
  if (anyMatch(normalized, INTENT_TERMS.virtual)) access.push('virtual');
  return Array.from(new Set(access));
}

function detectTime(normalized: string): TimePreference | null {
  const entry = TIME_TERMS.find((option) => anyMatch(normalized, option.terms));
  return entry ? entry.value : null;
}

function detectAgeGroup(normalized: string): AgeGroupPreference | null {
  if (anyMatch(normalized, ['my age', 'people my age', 'gente de mi edad', 'personas de mi edad'])) {
    return 'any';
  }
  if (anyMatch(normalized, ['under 18', 'teen', 'teens', 'youth'])) return 'under-18';
  if (anyMatch(normalized, ['65+', '65 and older', 'over 65', 'older adults', 'adultos mayores'])) {
    return '65-plus';
  }
  if (anyMatch(normalized, ['55+', '55 and older', 'retired', 'jubilado', 'jubilada'])) {
    return '55-64';
  }
  return null;
}

function detectSignals(normalized: string): AdaptiveSignal[] {
  return (Object.keys(SIGNAL_TERMS) as AdaptiveSignal[]).filter((signal) =>
    anyMatch(normalized, SIGNAL_TERMS[signal])
  );
}

function detectGoals(intents: IntentId[], normalized: string): ConnectorGoal[] {
  const goals = new Set<ConnectorGoal>();
  if (intents.includes('volunteering')) goals.add('volunteering');
  if (intents.includes('older-adults')) goals.add('senior-activities');
  if (intents.includes('social')) goals.add('meet-people');
  if (anyMatch(normalized, ['clubs or groups', 'local clubs', 'club', 'clubs', 'join a group', 'grupos', 'club'])) {
    goals.add('clubs-groups');
  }
  if (intents.includes('language-culture')) goals.add('community-events');
  if (anyMatch(normalized, ['event', 'events', 'festival', 'activity', 'activities', 'evento', 'eventos', 'actividad', 'actividades'])) {
    goals.add('community-events');
  }
  return Array.from(goals);
}

export function detectIntent(text: string): RecognizedIntent {
  const normalized = normalize(text);
  const intents = (Object.keys(INTENT_TERMS) as IntentId[]).filter((intent) =>
    anyMatch(normalized, INTENT_TERMS[intent])
  );

  const signals = detectSignals(normalized);
  const language = detectLanguagePreference(normalized);
  const location = detectLocation(normalized);
  const interests = detectInterests(normalized);
  const access = detectAccess(normalized);
  const freeOnly =
    signals.includes('cost') ||
    anyMatch(normalized, [
      'free activities',
      'only free',
      'no cost',
      'low cost',
      'cheap',
      'gratis',
      'sin costo',
      'economico',
      'barato'
    ]);

  const goals = detectGoals(intents, normalized);

  const scoreParts = [intents.length, interests.length, language ? 1 : 0, location ? 1 : 0];
  const confidence = scoreParts.reduce((sum, value) => sum + value, 0) === 0 ? 0.3 : Math.min(0.97, 0.55 + intents.length * 0.1 + (language ? 0.08 : 0) + (location ? 0.08 : 0));

  return {
    intents,
    goals,
    interests,
    access,
    language,
    detectedLanguage: detectMessageLanguage(normalized),
    location,
    freeOnly,
    time: detectTime(normalized),
    ageGroup: detectAgeGroup(normalized),
    signals,
    confidence
  };
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

/**
 * Merge what the user just said into their preferences. Existing answers win so
 * the assistant never re-asks or overwrites something already known.
 */
export function seedPreferencesFromIntent(
  preferences: ConnectorPreferences,
  intent: RecognizedIntent
): ConnectorPreferences {
  const access = unique([...preferences.access, ...intent.access]);
  return {
    ...preferences,
    goals: unique([...preferences.goals, ...intent.goals]),
    interests: unique([...preferences.interests, ...intent.interests]),
    access,
    language: preferences.language ?? intent.language,
    location: preferences.location ?? intent.location,
    time: preferences.time ?? intent.time,
    ageGroup: preferences.ageGroup ?? intent.ageGroup,
    freeOnly: preferences.freeOnly || intent.freeOnly,
    contactFirst: preferences.contactFirst || intent.signals.includes('nervous-alone'),
    prefersPhone: preferences.prefersPhone || intent.signals.includes('tech-trouble')
  };
}
