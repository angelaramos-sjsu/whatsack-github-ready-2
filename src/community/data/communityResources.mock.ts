import type { CommunityResource } from '../types';

/**
 * DEVELOPMENT MOCK DATA — NOT REAL SERVICES.
 *
 * Every record below is fictional and exists so the assistant's matching,
 * language and "Not confirmed." behaviour can be built and tested. The
 * organization names are invented, phone numbers use the reserved 555-01xx
 * range, and source links point at example.org. Nothing here may be presented
 * as a verified real-world program.
 */
export const mockCommunityResources: CommunityResource[] = [
  {
    id: 'c-01',
    organizationName: 'Casa Esperanza Senior Center (mock)',
    programName: { en: 'Spanish Conversation and Hot Lunch', es: 'Charla en español y almuerzo caliente' },
    description: {
      en: 'A daytime gathering for older adults with conversation, music, bingo and a hot lunch. Staff say visitors may come with a family member or caregiver.',
      es: 'Reunión de día para adultos mayores con charla, música, lotería y almuerzo caliente. El personal dice que puede venir con un familiar o acompañante.'
    },
    city: 'San Jose',
    zip: '95116',
    serviceArea: { en: 'San Jose, especially East San Jose', es: 'San Jose, especialmente el este de San Jose' },
    days: { en: 'Monday to Thursday', es: 'Lunes a jueves' },
    times: { en: '10:00 AM to 1:30 PM', es: '10:00 AM a 1:30 PM' },
    costStatus: 'free',
    costNote: { en: 'Free. Lunch included, no membership fee.', es: 'Gratis. Incluye almuerzo, sin cuota de membresía.' },
    languages: ['es', 'en'],
    languageRegions: ['latin-america', 'mexico'],
    languageNote: { en: 'Spanish-speaking staff on every shift.', es: 'Personal que habla español en cada turno.' },
    accessibility: {
      wheelchair: true,
      caregiverWelcome: true,
      notes: { en: 'Step-free entrance and accessible restroom.', es: 'Entrada sin escalones y baño accesible.' }
    },
    transportation: {
      en: 'On bus routes 22 and 68. Ask staff about the free volunteer driver list.',
      es: 'En rutas de autobús 22 y 68. Pregunte al personal por la lista de conductores voluntarios.'
    },
    contact: { phone: '555-0101', email: 'hello@example.org' },
    officialSourceUrl: 'https://example.org/mock/casa-esperanza',
    lastVerified: '2026-08-14',
    verification: 'mock',
    intents: ['meet-people', 'senior-activities', 'community-events', 'language-culture'],
    interests: ['games', 'music', 'cultural'],
    ageFocus: ['older-adults'],
    virtual: false,
    timing: ['weekday-morning', 'weekday-afternoon']
  },
  {
    id: 'c-02',
    organizationName: 'Riverside Community Garden Collective (mock)',
    programName: { en: 'Neighborhood Garden Work Days', es: 'Días de trabajo en el huerto comunitario' },
    description: {
      en: 'All-ages volunteer work days in a shared vegetable garden, with a shared lunch afterwards. Tools provided.',
      es: 'Días de voluntariado para todas las edades en un huerto compartido, con almuerzo comunitario después. Se prestan herramientas.'
    },
    city: 'San Jose',
    zip: '95126',
    serviceArea: { en: 'San Jose and Santa Clara', es: 'San Jose y Santa Clara' },
    days: { en: 'Saturdays', es: 'Sábados' },
    times: { en: '9:00 AM to 12:00 PM', es: '9:00 AM a 12:00 PM' },
    costStatus: 'free',
    costNote: { en: 'Free to join. No experience needed.', es: 'Gratis. No se necesita experiencia.' },
    languages: ['en', 'es'],
    languageRegions: ['mexico', 'latin-america'],
    languageNote: null,
    accessibility: {
      wheelchair: true,
      caregiverWelcome: true,
      notes: { en: 'Paved paths between raised beds.', es: 'Caminos pavimentados entre las camas elevadas.' }
    },
    transportation: {
      en: 'Two blocks from the Virginia light rail stop. Limited parking.',
      es: 'A dos cuadras de la estación Virginia del tren ligero. Estacionamiento limitado.'
    },
    contact: { phone: '555-0102', email: null },
    officialSourceUrl: 'https://example.org/mock/riverside-garden',
    lastVerified: '2026-09-02',
    verification: 'mock',
    intents: ['volunteering', 'meet-people', 'community-events', 'clubs-groups'],
    interests: ['exercise', 'other'],
    ageFocus: ['any-age'],
    virtual: false,
    timing: ['weekend', 'weekday-morning']
  },
  {
    id: 'c-03',
    organizationName: 'Vecinos Unidos Cultural Circle (mock)',
    programName: { en: 'Latin American Music and Dance Evenings', es: 'Noches de música y baile latinoamericano' },
    description: {
      en: 'An evening social circle with live music, dancing and a potluck table for people who want to meet neighbors.',
      es: 'Círculo social de noche con música en vivo, baile y mesa compartida para conocer vecinos.'
    },
    city: 'San Jose',
    zip: '95122',
    serviceArea: { en: 'San Jose', es: 'San Jose' },
    days: { en: 'Fridays', es: 'Viernes' },
    times: { en: '6:30 PM to 8:30 PM', es: '6:30 PM a 8:30 PM' },
    costStatus: 'free',
    costNote: { en: 'Free. Bring a dish only if you want to.', es: 'Gratis. Traiga un platillo solo si quiere.' },
    languages: ['es', 'en'],
    languageRegions: ['latin-america', 'mexico'],
    languageNote: { en: 'Hosted in Spanish, with English interpretation on request.', es: 'Se realiza en español, con interpretación al inglés si la pide.' },
    accessibility: {
      wheelchair: true,
      caregiverWelcome: true,
      notes: null
    },
    transportation: { en: 'Free parking lot behind the hall.', es: 'Estacionamiento gratis detrás del salón.' },
    contact: { phone: '555-0103', email: 'circle@example.org' },
    officialSourceUrl: 'https://example.org/mock/vecinos-unidos',
    lastVerified: '2026-07-21',
    verification: 'mock',
    intents: ['meet-people', 'clubs-groups', 'community-events', 'language-culture'],
    interests: ['music', 'cultural', 'games'],
    ageFocus: ['any-age', 'older-adults'],
    virtual: false,
    timing: ['evening']
  },
  {
    id: 'c-04',
    organizationName: 'Centro de Amistad Drop-In (mock)',
    programName: { en: 'Afternoon Games and Conversation', es: 'Juegos y conversación por la tarde' },
    description: {
      en: 'Drop in for cards, dominos and conversation in Spanish. No registration required according to the program flyer.',
      es: 'Llegue sin cita para juegos de cartas, dominó y conversación en español. Según el folleto, no se requiere inscripción.'
    },
    city: 'San Jose',
    zip: '95116',
    serviceArea: null,
    days: { en: 'Tuesdays and Thursdays', es: 'Martes y jueves' },
    times: { en: '2:00 PM to 4:30 PM', es: '2:00 PM a 4:30 PM' },
    costStatus: 'free',
    costNote: null,
    languages: ['es'],
    languageRegions: ['latin-america'],
    languageNote: null,
    accessibility: {
      wheelchair: null,
      caregiverWelcome: true,
      notes: null
    },
    transportation: null,
    contact: { phone: '555-0104', email: null },
    officialSourceUrl: 'https://example.org/mock/centro-de-amistad',
    lastVerified: '2026-06-05',
    verification: 'mock',
    intents: ['meet-people', 'clubs-groups', 'senior-activities'],
    interests: ['games', 'learning'],
    ageFocus: ['older-adults', 'adults'],
    virtual: false,
    timing: ['weekday-afternoon']
  },
  {
    id: 'c-05',
    organizationName: 'Northside Neighbors Club (mock)',
    programName: { en: 'Weekly Board Games and Coffee', es: 'Juegos de mesa y café cada semana' },
    description: {
      en: 'A small neighborhood club that meets for board games, coffee and conversation. A volunteer hosts each week.',
      es: 'Un club pequeño del vecindario que se reúne para juegos de mesa, café y conversación. Un voluntario organiza cada semana.'
    },
    city: 'Sunnyvale',
    zip: '94086',
    serviceArea: { en: 'Sunnyvale and Santa Clara', es: 'Sunnyvale y Santa Clara' },
    days: { en: 'Wednesdays', es: 'Miércoles' },
    times: { en: '1:00 PM to 3:00 PM', es: '1:00 PM a 3:00 PM' },
    costStatus: 'low-cost',
    costNote: { en: '$3 suggested contribution for coffee.', es: 'Contribución sugerida de $3 para el café.' },
    languages: ['en'],
    languageRegions: [],
    languageNote: null,
    accessibility: {
      wheelchair: true,
      caregiverWelcome: null,
      notes: { en: 'Ramp at the side entrance.', es: 'Rampa en la entrada lateral.' }
    },
    transportation: { en: 'Bus line 55 stops across the street.', es: 'La ruta 55 pasa frente al edificio.' },
    contact: { phone: '555-0105', email: null },
    officialSourceUrl: 'https://example.org/mock/northside-neighbors',
    lastVerified: '2026-09-19',
    verification: 'mock',
    intents: ['clubs-groups', 'meet-people', 'community-events'],
    interests: ['games', 'learning'],
    ageFocus: ['adults', 'older-adults'],
    virtual: false,
    timing: ['weekday-afternoon']
  },
  {
    id: 'c-06',
    organizationName: 'Newcomers Welcome Circle (mock)',
    programName: { en: 'New to the Area Meetup', es: 'Reunión para quienes son nuevos en la zona' },
    description: {
      en: 'A monthly evening meetup for people who recently moved to the area. Short introductions, snacks and a walk to a nearby cafe.',
      es: 'Reunión mensual por la noche para quienes se mudaron hace poco. Presentaciones breves, bocadillos y una caminata a un café cercano.'
    },
    city: 'Mountain View',
    zip: '94041',
    serviceArea: { en: 'Mountain View, Sunnyvale and Palo Alto', es: 'Mountain View, Sunnyvale y Palo Alto' },
    days: { en: 'Second Thursday of the month', es: 'Segundo jueves del mes' },
    times: { en: '6:00 PM to 7:30 PM', es: '6:00 PM a 7:30 PM' },
    costStatus: 'free',
    costNote: { en: 'Free.', es: 'Gratis.' },
    languages: ['en', 'zh-Hans'],
    languageRegions: [],
    languageNote: { en: 'A Mandarin-speaking volunteer attends most months.', es: 'Un voluntario que habla mandarín asiste casi todos los meses.' },
    accessibility: {
      wheelchair: null,
      caregiverWelcome: null,
      notes: null
    },
    transportation: { en: 'Ten-minute walk from the downtown transit center.', es: 'A diez minutos a pie del centro de transporte.' },
    contact: { phone: '555-0106', email: 'welcome@example.org' },
    officialSourceUrl: 'https://example.org/mock/newcomers-circle',
    lastVerified: '2026-10-01',
    verification: 'mock',
    intents: ['meet-people', 'clubs-groups', 'community-events'],
    interests: ['other', 'learning'],
    ageFocus: ['adults'],
    virtual: false,
    timing: ['evening']
  },
  {
    id: 'c-07',
    organizationName: 'Bay Area Portuguese Conversation Hour (mock)',
    programName: { en: 'Online Portuguese Conversation Hour', es: 'Hora de conversación en portugués en línea' },
    description: {
      en: 'A free weekly video call for Portuguese speakers of all levels. Join by phone or computer and just listen the first time.',
      es: 'Llamada de video semanal gratuita para personas que hablan portugués de todos los niveles. Puede unirse por teléfono o computadora y solo escuchar la primera vez.'
    },
    city: 'Online',
    zip: '',
    serviceArea: { en: 'Anyone in the Bay Area', es: 'Cualquier persona del Área de la Bahía' },
    days: { en: 'Mondays', es: 'Lunes' },
    times: { en: '7:00 PM to 8:00 PM', es: '7:00 PM a 8:00 PM' },
    costStatus: 'free',
    costNote: { en: 'Free. Phone dial-in available.', es: 'Gratis. Hay acceso por teléfono.' },
    languages: ['pt'],
    languageRegions: ['brazil', 'portugal'],
    languageNote: { en: 'Brazilian and European Portuguese speakers both host.', es: 'Hay anfitriones de portugués de Brasil y de Portugal.' },
    accessibility: {
      wheelchair: null,
      caregiverWelcome: true,
      notes: { en: 'Virtual only, so there is no physical venue.', es: 'Solo en línea, no hay lugar físico.' }
    },
    transportation: { en: 'No travel needed. Dial-in number provided after sign-up.', es: 'No necesita viajar. El número de acceso se da al inscribirse.' },
    contact: { phone: '555-0107', email: 'ola@example.org' },
    officialSourceUrl: 'https://example.org/mock/portuguese-hour',
    lastVerified: '2026-10-20',
    verification: 'mock',
    intents: ['meet-people', 'clubs-groups', 'language-culture'],
    interests: ['learning', 'cultural'],
    ageFocus: ['any-age'],
    virtual: true,
    timing: ['evening']
  },
  {
    id: 'c-08',
    organizationName: 'Vietnamese Friendship Group (mock)',
    programName: { en: 'Weekend Cultural Gatherings', es: 'Reuniones culturales de fin de semana' },
    description: {
      en: 'Weekend gatherings with Vietnamese food, music and conversation for families and older adults.',
      es: 'Reuniones de fin de semana con comida vietnamita, música y conversación para familias y adultos mayores.'
    },
    city: 'San Jose',
    zip: '95122',
    serviceArea: { en: 'San Jose', es: 'San Jose' },
    days: { en: 'Saturdays', es: 'Sábados' },
    times: { en: '11:00 AM to 2:00 PM', es: '11:00 AM a 2:00 PM' },
    costStatus: 'free',
    costNote: { en: 'Free.', es: 'Gratis.' },
    languages: ['vi', 'en'],
    languageRegions: [],
    languageNote: { en: 'Vietnamese-speaking volunteers lead the group.', es: 'Voluntarios que hablan vietnamita dirigen el grupo.' },
    accessibility: {
      wheelchair: true,
      caregiverWelcome: true,
      notes: null
    },
    transportation: { en: 'Parking available. Bus route 25 nearby.', es: 'Hay estacionamiento. Ruta 25 cerca.' },
    contact: { phone: '555-0108', email: null },
    officialSourceUrl: 'https://example.org/mock/vietnamese-friendship',
    lastVerified: '2026-08-30',
    verification: 'mock',
    intents: ['meet-people', 'community-events', 'language-culture', 'clubs-groups'],
    interests: ['cultural', 'music'],
    ageFocus: ['any-age', 'older-adults'],
    virtual: false,
    timing: ['weekend']
  },
  {
    id: 'c-09',
    organizationName: 'Accessible Arts Studio (mock)',
    programName: { en: 'Open Studio for All Abilities', es: 'Estudio abierto para todas las capacidades' },
    description: {
      en: 'A supported art studio session with adapted tables and tools. A caregiver may attend at no extra cost.',
      es: 'Sesión de arte con mesas y herramientas adaptadas. Un acompañante puede entrar sin costo adicional.'
    },
    city: 'Redwood City',
    zip: '94063',
    serviceArea: { en: 'San Mateo County', es: 'Condado de San Mateo' },
    days: { en: 'Tuesdays and Saturdays', es: 'Martes y sábados' },
    times: { en: '1:00 PM to 3:30 PM', es: '1:00 PM a 3:30 PM' },
    costStatus: 'low-cost',
    costNote: { en: '$10 materials fee, waived on request.', es: 'Cuota de materiales de $10, se puede exonerar si la pide.' },
    languages: ['en', 'es'],
    languageRegions: ['mexico', 'latin-america', 'spain'],
    languageNote: null,
    accessibility: {
      wheelchair: true,
      caregiverWelcome: true,
      notes: { en: 'Height-adjustable tables, quiet room, accessible parking.', es: 'Mesas ajustables, cuarto tranquilo y estacionamiento accesible.' }
    },
    transportation: {
      en: 'Volunteer rides can be requested one week ahead.',
      es: 'Se pueden pedir viajes con voluntarios con una semana de anticipación.'
    },
    contact: { phone: '555-0109', email: 'studio@example.org' },
    officialSourceUrl: 'https://example.org/mock/accessible-arts',
    lastVerified: '2026-09-12',
    verification: 'mock',
    intents: ['meet-people', 'clubs-groups', 'accessibility'],
    interests: ['arts', 'learning'],
    ageFocus: ['any-age'],
    virtual: false,
    timing: ['weekday-afternoon', 'weekend']
  },
  {
    id: 'c-10',
    organizationName: 'Cantonese Community Kitchen (mock)',
    programName: { en: 'Morning Tea and Cantonese Conversation', es: 'Té de la mañana y conversación en cantonés' },
    description: {
      en: 'Morning tea, light exercise and conversation in Cantonese for older adults. Staff can help with sign-up forms.',
      es: 'Té de la mañana, ejercicio suave y conversación en cantonés para adultos mayores. El personal puede ayudar con los formularios.'
    },
    city: 'San Jose',
    zip: '95112',
    serviceArea: { en: 'San Jose', es: 'San Jose' },
    days: { en: 'Monday to Friday', es: 'Lunes a viernes' },
    times: { en: '9:30 AM to 11:30 AM', es: '9:30 AM a 11:30 AM' },
    costStatus: 'free',
    costNote: { en: 'Free.', es: 'Gratis.' },
    languages: ['zh-Hant', 'zh-Hans', 'en'],
    languageRegions: [],
    languageNote: null,
    accessibility: {
      wheelchair: true,
      caregiverWelcome: true,
      notes: null
    },
    transportation: { en: 'Two blocks from the Japantown bus stop.', es: 'A dos cuadras de la parada de autobús de Japantown.' },
    contact: { phone: '555-0110', email: null },
    officialSourceUrl: 'https://example.org/mock/cantonese-kitchen',
    lastVerified: '2026-07-08',
    verification: 'mock',
    intents: ['senior-activities', 'meet-people', 'language-culture', 'register-help'],
    interests: ['games', 'cultural', 'exercise'],
    ageFocus: ['older-adults'],
    virtual: false,
    timing: ['weekday-morning']
  },
  {
    id: 'c-11',
    organizationName: 'Korean Senior Walking Club (mock)',
    programName: { en: 'Morning Park Walks', es: 'Caminatas matutinas en el parque' },
    description: {
      en: 'A gentle 30-minute walk in the park followed by tea. Led by Korean-speaking volunteers.',
      es: 'Caminata suave de 30 minutos en el parque seguida de té. Guiada por voluntarios que hablan coreano.'
    },
    city: 'San Jose',
    zip: '95124',
    serviceArea: { en: 'San Jose and Campbell', es: 'San Jose y Campbell' },
    days: { en: 'Tuesdays and Fridays', es: 'Martes y viernes' },
    times: { en: '8:30 AM to 9:30 AM', es: '8:30 AM a 9:30 AM' },
    costStatus: 'free',
    costNote: { en: 'Free.', es: 'Gratis.' },
    languages: ['ko'],
    languageRegions: [],
    languageNote: null,
    accessibility: {
      wheelchair: null,
      caregiverWelcome: null,
      notes: { en: 'Paved loop trail; benches along the route.', es: 'Sendero pavimentado; hay bancas en el camino.' }
    },
    transportation: null,
    contact: { phone: '555-0111', email: null },
    officialSourceUrl: 'https://example.org/mock/korean-walking-club',
    lastVerified: '2026-06-25',
    verification: 'mock',
    intents: ['meet-people', 'senior-activities', 'clubs-groups', 'language-culture'],
    interests: ['exercise'],
    ageFocus: ['older-adults'],
    virtual: false,
    timing: ['weekday-morning']
  },
  {
    id: 'c-12',
    organizationName: 'Downtown Learning Circle for Retired Adults (mock)',
    programName: { en: 'Afternoon Skill Shares', es: 'Talleres de habilidades por la tarde' },
    description: {
      en: 'Retired adults teach each other practical skills: phone photography, budgeting and basic computer help.',
      es: 'Adultos jubilados se enseñan habilidades prácticas: fotografía con el teléfono, presupuesto y ayuda básica con computadoras.'
    },
    city: 'San Jose',
    zip: '95113',
    serviceArea: { en: 'Downtown San Jose', es: 'Centro de San Jose' },
    days: { en: 'Thursdays', es: 'Jueves' },
    times: { en: '2:00 PM to 4:00 PM', es: '2:00 PM a 4:00 PM' },
    costStatus: 'low-cost',
    costNote: null,
    languages: ['en'],
    languageRegions: [],
    languageNote: null,
    accessibility: {
      wheelchair: true,
      caregiverWelcome: null,
      notes: null
    },
    transportation: { en: 'Near the Santa Clara light rail station.', es: 'Cerca de la estación Santa Clara del tren ligero.' },
    contact: { phone: '555-0112', email: null },
    officialSourceUrl: 'https://example.org/mock/downtown-learning-circle',
    lastVerified: '2024-02-10',
    verification: 'outdated',
    intents: ['clubs-groups', 'senior-activities', 'explore'],
    interests: ['learning'],
    ageFocus: ['older-adults'],
    virtual: false,
    timing: ['weekday-afternoon']
  },
  {
    id: 'c-13',
    organizationName: 'Teen Voice Volunteer Corps (mock)',
    programName: { en: 'Weekend Neighbourhood Clean-Up Crew', es: 'Equipo de limpieza del vecindario los fines de semana' },
    description: {
      en: 'A youth volunteer crew that cleans parks and paints over graffiti. School credit may be available — the program could not confirm this.',
      es: 'Equipo de jóvenes voluntarios que limpia parques y pinta sobre grafitis. Podría dar crédito escolar, pero el programa no lo confirmó.'
    },
    city: 'Sunnyvale',
    zip: '94085',
    serviceArea: { en: 'Sunnyvale', es: 'Sunnyvale' },
    days: { en: 'Saturdays', es: 'Sábados' },
    times: null,
    costStatus: 'free',
    costNote: { en: 'Free. Supplies provided.', es: 'Gratis. Se proporcionan materiales.' },
    languages: ['en'],
    languageRegions: [],
    languageNote: null,
    accessibility: {
      wheelchair: null,
      caregiverWelcome: true,
      notes: null
    },
    transportation: null,
    contact: { phone: null, email: null },
    officialSourceUrl: null,
    lastVerified: null,
    verification: 'mock',
    intents: ['volunteering', 'meet-people', 'community-events'],
    interests: ['other', 'exercise'],
    ageFocus: ['youth'],
    virtual: false,
    timing: ['weekend', 'weekday-morning']
  }
];
