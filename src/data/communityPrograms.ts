import { CommunityProgram } from '../community/types';

/**
 * Community connector data.
 *
 * Two kinds of records live here:
 *
 * 1. `directory` records — real organizations copied from `src/data/directory.ts`.
 *    Only published name, city, address and website are known, so every other
 *    field is left `null` and the UI shows “Not confirmed.”.
 *
 * 2. `demonstration` records — clearly labeled fictional sample programs used to
 *    exercise the assistant, filters and result cards. They must never be
 *    presented as verified real-world organizations: their phone numbers are
 *    fake sample numbers, they have no official source link, and every card
 *    carries a “Sample record” badge.
 */

const sampleNote = {
  en: 'Sample record for this prototype. Not a real organization or phone number.',
  es: 'Registro de ejemplo para este prototipo. No es una organización ni un teléfono real.'
};

const unknownAccessibility = {
  wheelchair: null,
  transit: null,
  transportationAssistance: null,
  caregiverWelcome: null,
  notes: null
};

const noTime = { timeSlots: null, days: null, detail: null };
const noContact = {
  phone: null,
  phoneStatus: 'unconfirmed' as const,
  contactPerson: null,
  email: null,
  howToJoin: null
};

export const communityPrograms: CommunityProgram[] = [
  // ---------------------------------------------------------------------------
  // Demonstration records (fictional)
  // ---------------------------------------------------------------------------
  {
    id: 'demo-casa-vecina',
    recordType: 'demonstration',
    organization: 'Casa Vecina Community Center (demonstration record)',
    activityName: {
      en: 'Spanish-speaking senior social circle',
      es: 'Círculo social para adultos mayores que hablan español'
    },
    description: {
      en: 'A relaxed weekly gathering for Spanish-speaking older adults: conversation, coffee, lotería and a shared lunch. Newcomers are welcome and no membership is required.',
      es: 'Una reunión semanal tranquila para adultos mayores que hablan español: conversación, café, lotería y un almuerzo compartido. Las personas nuevas son bienvenidas y no se requiere membresía.'
    },
    city: 'San Jose',
    zip: '95116',
    address: 'Sample location, San Jose (no street address collected)',
    virtual: false,
    interests: ['games', 'cultural', 'music'],
    audiences: ['older-adults', 'all-ages'],
    offersVolunteering: false,
    languages: [
      { code: 'es', variety: 'latin-america' },
      { code: 'es', variety: 'mexico' },
      { code: 'en' }
    ],
    time: {
      timeSlots: ['weekday-mornings', 'weekday-afternoons'],
      days: 'Tuesdays and Thursdays',
      detail: {
        en: 'Tuesdays and Thursdays, 10:00 AM – 1:00 PM',
        es: 'Martes y jueves, 10:00 AM – 1:00 PM'
      }
    },
    cost: {
      free: true,
      detail: { en: 'Free. Lunch included.', es: 'Gratis. Almuerzo incluido.' }
    },
    accessibility: {
      wheelchair: true,
      transit: true,
      transportationAssistance: true,
      caregiverWelcome: true,
      notes: {
        en: 'Ground-floor room, ramp entrance. Staff can help arrange a ride.',
        es: 'Salón en planta baja con rampa. El personal puede ayudar a coordinar transporte.'
      }
    },
    contact: {
      phone: '(408) 555-0142',
      phoneStatus: 'demo',
      contactPerson: 'Sample coordinator: Lucía',
      email: 'sample-casavecina@example.org',
      howToJoin: {
        en: 'Call the sample coordinator to say you are coming, or arrive 15 minutes early.',
        es: 'Llame a la coordinadora de ejemplo para avisar que vendrá, o llegue 15 minutos antes.'
      }
    },
    officialSource: null,
    lastVerified: '2026-10-02',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-manana-activa',
    recordType: 'demonstration',
    organization: 'Vecinos Activos (demonstration record)',
    activityName: { en: 'Morning walking group', es: 'Grupo de caminatas por la mañana' },
    description: {
      en: 'A gentle 30–45 minute walk in a local park followed by coffee. Spanish and English spoken.',
      es: 'Una caminata suave de 30 a 45 minutos en un parque local, seguida de café. Se habla español e inglés.'
    },
    city: 'San Jose',
    zip: '95116',
    address: null,
    virtual: false,
    interests: ['exercise'],
    audiences: ['older-adults', 'all-ages'],
    offersVolunteering: false,
    languages: [{ code: 'es', variety: 'latin-america' }, { code: 'en' }],
    time: {
      timeSlots: ['weekday-mornings'],
      days: 'Wednesdays',
      detail: { en: 'Wednesdays, 9:00 – 10:00 AM', es: 'Miércoles, 9:00 – 10:00 AM' }
    },
    cost: { free: true, detail: { en: 'Free.', es: 'Gratis.' } },
    accessibility: {
      wheelchair: false,
      transit: true,
      transportationAssistance: false,
      caregiverWelcome: true,
      notes: {
        en: 'Paved park path, but the route is not marked as wheelchair accessible. Call to ask about the surface.',
        es: 'Sendero pavimentado, pero la ruta no está marcada como accesible para sillas de ruedas. Llame para preguntar por el suelo.'
      }
    },
    contact: {
      phone: '(408) 555-0119',
      phoneStatus: 'demo',
      contactPerson: 'Sample coordinator: Ana',
      email: null,
      howToJoin: {
        en: 'Just arrive at the park entrance on Wednesday morning.',
        es: 'Solo llegue a la entrada del parque el miércoles por la mañana.'
      }
    },
    officialSource: null,
    lastVerified: '2026-09-18',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-jardines',
    recordType: 'demonstration',
    organization: 'Jardines de la Cuadra (demonstration record)',
    activityName: { en: 'Community garden work mornings', es: 'Mañanas de trabajo en el jardín comunitario' },
    description: {
      en: 'Help plant and harvest vegetables. Tools, gloves and training are provided. Good for first-time volunteers.',
      es: 'Ayude a plantar y cosechar verduras. Se proporcionan herramientas, guantes y capacitación. Ideal para quien nunca ha sido voluntario.'
    },
    city: 'San Jose',
    zip: '95112',
    address: null,
    virtual: false,
    interests: ['exercise', 'learning', 'other'],
    audiences: ['all-ages', 'families'],
    offersVolunteering: true,
    languages: [{ code: 'es', variety: 'latin-america' }, { code: 'en' }],
    time: {
      timeSlots: ['weekends'],
      days: 'Saturdays',
      detail: { en: 'Saturdays, 8:30 – 11:30 AM', es: 'Sábados, 8:30 – 11:30 AM' }
    },
    cost: { free: true, detail: { en: 'Free to volunteer.', es: 'Gratis para participar.' } },
    accessibility: {
      wheelchair: true,
      transit: true,
      transportationAssistance: false,
      caregiverWelcome: true,
      notes: {
        en: 'Raised garden beds and a paved path. Some tasks happen on grass.',
        es: 'Huertos elevados y sendero pavimentado. Algunas tareas son sobre césped.'
      }
    },
    contact: {
      phone: '(408) 555-0164',
      phoneStatus: 'demo',
      contactPerson: 'Sample volunteer lead: Marco',
      email: 'sample-jardines@example.org',
      howToJoin: {
        en: 'Call or email the volunteer lead to reserve a spot for a Saturday.',
        es: 'Llame o escriba al líder de voluntarios para reservar un lugar un sábado.'
      }
    },
    officialSource: null,
    lastVerified: '2026-09-20',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-arte-accesible',
    recordType: 'demonstration',
    organization: 'Taller Abierto (demonstration record)',
    activityName: { en: 'Open art studio circle', es: 'Círculo de arte abierto' },
    description: {
      en: 'A supported art and crafts session for adults with disabilities and older adults. Materials supplied.',
      es: 'Una sesión de arte y manualidades con apoyo para adultos con discapacidades y adultos mayores. Se incluyen materiales.'
    },
    city: 'San Jose',
    zip: '95126',
    address: null,
    virtual: false,
    interests: ['arts'],
    audiences: ['older-adults', 'all-ages'],
    offersVolunteering: false,
    languages: [{ code: 'en' }, { code: 'es', variety: 'mexico' }],
    time: {
      timeSlots: ['weekday-afternoons'],
      days: 'Fridays',
      detail: { en: 'Fridays, 1:00 – 3:00 PM', es: 'Viernes, 1:00 – 3:00 PM' }
    },
    cost: { free: true, detail: { en: 'Free, materials included.', es: 'Gratis, materiales incluidos.' } },
    accessibility: {
      wheelchair: true,
      transit: true,
      transportationAssistance: true,
      caregiverWelcome: true,
      notes: {
        en: 'Step-free entrance, accessible restroom, quiet break room.',
        es: 'Entrada sin escalones, baño accesible y sala de descanso tranquila.'
      }
    },
    contact: {
      phone: '(408) 555-0177',
      phoneStatus: 'demo',
      contactPerson: 'Sample coordinator: Doris',
      email: null,
      howToJoin: {
        en: 'Drop in. A caregiver may attend at no extra cost.',
        es: 'Puede llegar sin cita. Un acompañante puede entrar sin costo adicional.'
      }
    },
    officialSource: null,
    lastVerified: '2026-10-14',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-nuevos-horizontes',
    recordType: 'demonstration',
    organization: 'Nuevos Horizontes Meetup (demonstration record)',
    activityName: { en: 'Newcomer games and conversation night', es: 'Noche de juegos y conversación para recién llegados' },
    description: {
      en: 'Board games, snacks and conversation for people aged 18–34 who are new to the area.',
      es: 'Juegos de mesa, bocadillos y conversación para personas de 18 a 34 años que acaban de llegar a la zona.'
    },
    city: 'Santa Clara',
    zip: '95050',
    address: null,
    virtual: false,
    interests: ['games', 'cultural'],
    audiences: ['young-adults', 'newcomers'],
    offersVolunteering: false,
    languages: [{ code: 'en' }, { code: 'es' }, { code: 'pt', variety: 'brazil' }],
    time: {
      timeSlots: ['evenings'],
      days: 'Every other Thursday',
      detail: { en: 'Every other Thursday, 6:30 – 8:30 PM', es: 'Jueves alternos, 6:30 – 8:30 PM' }
    },
    cost: { free: true, detail: { en: 'Free.', es: 'Gratis.' } },
    accessibility: {
      wheelchair: null,
      transit: true,
      transportationAssistance: false,
      caregiverWelcome: null,
      notes: {
        en: 'Transit stop is one block away; accessibility of the room has not been confirmed.',
        es: 'La parada de transporte está a una cuadra; no se ha confirmado la accesibilidad del salón.'
      }
    },
    contact: {
      phone: '(408) 555-0188',
      phoneStatus: 'demo',
      contactPerson: 'Sample host: Priya',
      email: 'sample-horizontes@example.org',
      howToJoin: {
        en: 'Message the host to be added to the guest list.',
        es: 'Escriba al anfitrión para que le agregue a la lista de invitados.'
      }
    },
    officialSource: null,
    lastVerified: '2026-09-30',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-intercambio-virtual',
    recordType: 'demonstration',
    organization: 'Intercambio Virtual (demonstration record)',
    activityName: { en: 'Online Spanish–English conversation exchange', es: 'Intercambio de conversación español–inglés en línea' },
    description: {
      en: 'Small online groups practice Spanish and English together. Join from home with a phone or computer.',
      es: 'Grupos pequeños en línea practican español e inglés juntos. Participe desde casa con teléfono o computadora.'
    },
    city: null,
    zip: null,
    address: null,
    virtual: true,
    interests: ['learning', 'cultural'],
    audiences: ['all-ages', 'newcomers'],
    offersVolunteering: false,
    languages: [{ code: 'es' }, { code: 'en' }],
    time: {
      timeSlots: ['evenings'],
      days: 'Mondays and Wednesdays',
      detail: { en: 'Mondays and Wednesdays, 7:00 – 8:00 PM', es: 'Lunes y miércoles, 7:00 – 8:00 PM' }
    },
    cost: { free: true, detail: { en: 'Free.', es: 'Gratis.' } },
    accessibility: {
      wheelchair: true,
      transit: true,
      transportationAssistance: false,
      caregiverWelcome: true,
      notes: {
        en: 'No travel needed. Captions available on request.',
        es: 'No se necesita viajar. Subtítulos disponibles si los pide.'
      }
    },
    contact: {
      phone: null,
      phoneStatus: 'unconfirmed',
      contactPerson: 'Sample host: Elena',
      email: 'sample-intercambio@example.org',
      howToJoin: {
        en: 'Email the host for the link.',
        es: 'Escriba a la anfitriona para recibir el enlace.'
      }
    },
    officialSource: null,
    lastVerified: '2026-10-06',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-clube-brasileiro',
    recordType: 'demonstration',
    organization: 'Clube da Comunidade (demonstration record)',
    activityName: { en: 'Brazilian music and food gathering', es: 'Reunión de música y comida brasileña' },
    description: {
      en: 'Monthly family gathering with Brazilian Portuguese conversation, music and a potluck table.',
      es: 'Reunión familiar mensual con conversación en portugués de Brasil, música y una mesa compartida.'
    },
    city: 'San Jose',
    zip: '95122',
    address: null,
    virtual: false,
    interests: ['music', 'cultural', 'games'],
    audiences: ['all-ages', 'families'],
    offersVolunteering: false,
    languages: [{ code: 'pt', variety: 'brazil' }, { code: 'es' }, { code: 'en' }],
    time: {
      timeSlots: ['weekends'],
      days: 'Second Saturday of each month',
      detail: { en: 'Second Saturday monthly, 12:00 – 3:00 PM', es: 'Segundo sábado de cada mes, 12:00 – 3:00 PM' }
    },
    cost: { free: false, detail: { en: 'Free to attend; bring a dish to share.', es: 'Gratis; traiga un platillo para compartir.' } },
    accessibility: {
      wheelchair: null,
      transit: true,
      transportationAssistance: null,
      caregiverWelcome: true,
      notes: null
    },
    contact: {
      phone: '(408) 555-0133',
      phoneStatus: 'demo',
      contactPerson: 'Sample organizer: Joana',
      email: null,
      howToJoin: {
        en: 'Call the organizer to confirm the monthly date.',
        es: 'Llame a la organizadora para confirmar la fecha del mes.'
      }
    },
    officialSource: null,
    lastVerified: '2026-08-22',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-vietnamese-community',
    recordType: 'demonstration',
    organization: 'Hội Người Việt Sample (demonstration record)',
    activityName: { en: 'Vietnamese community afternoon', es: 'Tarde comunitaria vietnamita' },
    description: {
      en: 'Cards, tea and conversation in Vietnamese for older adults.',
      es: 'Juegos de cartas, té y conversación en vietnamita para adultos mayores.'
    },
    city: 'San Jose',
    zip: '95122',
    address: null,
    virtual: false,
    interests: ['games', 'cultural'],
    audiences: ['older-adults'],
    offersVolunteering: false,
    languages: [{ code: 'vi' }, { code: 'en' }],
    time: {
      timeSlots: ['weekday-afternoons'],
      days: 'Thursdays',
      detail: { en: 'Thursdays, 2:00 – 4:00 PM', es: 'Jueves, 2:00 – 4:00 PM' }
    },
    cost: { free: true, detail: { en: 'Free.', es: 'Gratis.' } },
    accessibility: { ...unknownAccessibility, transit: true },
    contact: {
      phone: '(408) 555-0155',
      phoneStatus: 'demo',
      contactPerson: 'Sample coordinator: Minh',
      email: null,
      howToJoin: null
    },
    officialSource: null,
    lastVerified: '2026-07-15',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-caregiver-circle',
    recordType: 'demonstration',
    organization: 'Caregiver Circle (demonstration record)',
    activityName: { en: 'Caregiver conversation circle', es: 'Círculo de conversación para cuidadores' },
    description: {
      en: 'A support group for people caring for a parent or partner. Learn local resources and talk with others.',
      es: 'Un grupo de apoyo para quienes cuidan a un padre, madre o pareja. Conozca recursos locales y converse con otras personas.'
    },
    city: 'Sunnyvale',
    zip: '94086',
    address: null,
    virtual: false,
    interests: ['learning', 'games'],
    audiences: ['caregivers', 'all-ages'],
    offersVolunteering: false,
    languages: [{ code: 'en' }, { code: 'es' }],
    time: {
      timeSlots: ['weekday-mornings'],
      days: 'First Tuesday of each month',
      detail: { en: 'First Tuesday monthly, 10:00 – 11:30 AM', es: 'Primer martes de cada mes, 10:00 – 11:30 AM' }
    },
    cost: { free: true, detail: { en: 'Free.', es: 'Gratis.' } },
    accessibility: {
      wheelchair: true,
      transit: true,
      transportationAssistance: null,
      caregiverWelcome: true,
      notes: { en: 'Care recipients may attend with you.', es: 'La persona a su cuidado puede acompañarle.' }
    },
    contact: {
      phone: null,
      phoneStatus: 'unconfirmed',
      contactPerson: 'Sample facilitator: Ruth',
      email: 'sample-caregivers@example.org',
      howToJoin: {
        en: 'Email to join the next meeting.',
        es: 'Escriba por correo para unirse a la próxima reunión.'
      }
    },
    officialSource: null,
    lastVerified: '2026-09-11',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-tech-help',
    recordType: 'demonstration',
    organization: 'Ayuda Digital (demonstration record)',
    activityName: { en: 'One-to-one computer and phone help', es: 'Ayuda individual con computadora y teléfono' },
    description: {
      en: 'A patient volunteer helps you use email, video calls or a website. No question is too basic.',
      es: 'Un voluntario paciente le ayuda a usar correo electrónico, videollamadas o un sitio web. Ninguna pregunta es demasiado básica.'
    },
    city: 'Milpitas',
    zip: '95035',
    address: null,
    virtual: false,
    interests: ['learning'],
    audiences: ['older-adults', 'all-ages'],
    offersVolunteering: false,
    languages: [{ code: 'en' }, { code: 'es' }],
    time: {
      timeSlots: ['weekday-mornings', 'weekday-afternoons'],
      days: 'Mondays and Wednesdays',
      detail: { en: 'Mondays and Wednesdays, 10:00 AM – 3:00 PM', es: 'Lunes y miércoles, 10:00 AM – 3:00 PM' }
    },
    cost: { free: true, detail: { en: 'Free.', es: 'Gratis.' } },
    accessibility: { ...unknownAccessibility, wheelchair: true, transit: true },
    contact: {
      phone: '(408) 555-0166',
      phoneStatus: 'demo',
      contactPerson: 'Sample volunteer: Ken',
      email: null,
      howToJoin: {
        en: 'Phone the desk to book a 30-minute slot. Staff can read the steps to you.',
        es: 'Llame al escritorio para reservar 30 minutos. El personal puede leerle los pasos.'
      }
    },
    officialSource: null,
    lastVerified: '2026-10-01',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-food-packing',
    recordType: 'demonstration',
    organization: 'Weekend Food Packing Crew (demonstration record)',
    activityName: { en: 'Weekend food packing volunteer shift', es: 'Turno de voluntariado para empacar alimentos' },
    description: {
      en: 'Pack grocery boxes for neighbors. Families with children 12+ welcome. Training on arrival.',
      es: 'Empaque cajas de despensa para vecinos. Familias con niños de 12 años o más son bienvenidas. Capacitación al llegar.'
    },
    city: 'San Jose',
    zip: '95112',
    address: null,
    virtual: false,
    interests: ['exercise', 'other'],
    audiences: ['all-ages', 'families'],
    offersVolunteering: true,
    languages: [{ code: 'en' }, { code: 'es', variety: 'latin-america' }],
    time: {
      timeSlots: ['weekends'],
      days: 'Saturday and Sunday',
      detail: { en: 'Saturdays and Sundays, 9:00 AM – 12:00 PM', es: 'Sábados y domingos, 9:00 AM – 12:00 PM' }
    },
    cost: { free: true, detail: { en: 'Free to volunteer.', es: 'Gratis para participar.' } },
    accessibility: {
      wheelchair: false,
      transit: true,
      transportationAssistance: false,
      caregiverWelcome: true,
      notes: {
        en: 'The packing floor is not wheelchair accessible. Desk and check-in tasks are available.',
        es: 'El área de empaque no es accesible para sillas de ruedas. Hay tareas de escritorio y registro.'
      }
    },
    contact: {
      phone: '(408) 555-0190',
      phoneStatus: 'demo',
      contactPerson: 'Sample shift lead: Teresa',
      email: null,
      howToJoin: {
        en: 'Call the shift lead the week before to sign up.',
        es: 'Llame a la líder del turno la semana anterior para inscribirse.'
      }
    },
    officialSource: null,
    lastVerified: '2026-10-12',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-music-jam',
    recordType: 'demonstration',
    organization: 'Open Music Jam (demonstration record)',
    activityName: { en: 'All-ages open music jam', es: 'Encuentro de música abierto para todas las edades' },
    description: {
      en: 'Bring an instrument or just listen. Acoustic instruments only, easy songs, no experience needed.',
      es: 'Traiga un instrumento o solo escuche. Solo instrumentos acústicos, canciones sencillas, no se necesita experiencia.'
    },
    city: 'Mountain View',
    zip: '94040',
    address: null,
    virtual: false,
    interests: ['music'],
    audiences: ['all-ages'],
    offersVolunteering: false,
    languages: [{ code: 'en' }, { code: 'es' }],
    time: {
      timeSlots: ['evenings'],
      days: 'Fridays',
      detail: { en: 'Fridays, 6:30 – 8:00 PM', es: 'Viernes, 6:30 – 8:00 PM' }
    },
    cost: { free: true, detail: { en: 'Free.', es: 'Gratis.' } },
    accessibility: {
      wheelchair: true,
      transit: true,
      transportationAssistance: null,
      caregiverWelcome: true,
      notes: null
    },
    contact: {
      phone: null,
      phoneStatus: 'unconfirmed',
      contactPerson: null,
      email: 'sample-music@example.org',
      howToJoin: null
    },
    officialSource: null,
    lastVerified: '2026-09-05',
    verification: 'demo',
    verificationNote: sampleNote
  },
  {
    id: 'demo-games-afternoon',
    recordType: 'demonstration',
    organization: 'Neighborhood Games Afternoon (demonstration record)',
    activityName: { en: 'Drop-in games afternoon', es: 'Tarde de juegos sin cita' },
    description: null,
    city: 'Sunnyvale',
    zip: '94086',
    address: null,
    virtual: false,
    interests: ['games'],
    audiences: ['all-ages'],
    offersVolunteering: false,
    languages: null,
    time: noTime,
    cost: { free: null, detail: null },
    accessibility: unknownAccessibility,
    contact: noContact,
    officialSource: null,
    lastVerified: null,
    verification: 'demo',
    verificationNote: {
      en: 'Intentionally incomplete sample record used to show “Not confirmed.” handling.',
      es: 'Registro de ejemplo incompleto a propósito para mostrar el manejo de “No confirmado”.'
    }
  },
  {
    id: 'demo-outdated-friendship-club',
    recordType: 'demonstration',
    organization: 'Sunnyvale Friendship Club (demonstration record)',
    activityName: { en: 'Afternoon friendship club', es: 'Club de amistad por la tarde' },
    description: {
      en: 'Cards, coffee and conversation for Spanish-speaking older adults.',
      es: 'Cartas, café y conversación para adultos mayores que hablan español.'
    },
    city: 'Sunnyvale',
    zip: '94086',
    address: null,
    virtual: false,
    interests: ['games', 'cultural'],
    audiences: ['older-adults'],
    offersVolunteering: false,
    languages: [{ code: 'es', variety: 'latin-america' }],
    time: {
      timeSlots: ['weekday-afternoons'],
      days: 'Wednesdays',
      detail: { en: 'Wednesdays, 2:00 – 4:00 PM', es: 'Miércoles, 2:00 – 4:00 PM' }
    },
    cost: { free: null, detail: null },
    accessibility: { ...unknownAccessibility, wheelchair: true },
    contact: {
      phone: '(408) 555-0121',
      phoneStatus: 'demo',
      contactPerson: 'Sample coordinator: Gloria',
      email: null,
      howToJoin: null
    },
    officialSource: null,
    lastVerified: '2023-04-11',
    verification: 'outdated',
    verificationNote: {
      en: 'This record has not been checked since 2023. Confirm before travelling.',
      es: 'Este registro no se ha verificado desde 2023. Confirme antes de viajar.'
    }
  },
  {
    id: 'demo-paused-social-hall',
    recordType: 'demonstration',
    organization: 'East Side Social Hall (demonstration record)',
    activityName: { en: 'Neighborhood social evening', es: 'Noche social del vecindario' },
    description: {
      en: 'A monthly social evening. The organization reports this program is paused.',
      es: 'Una noche social mensual. La organización informa que este programa está pausado.'
    },
    city: 'San Jose',
    zip: '95116',
    address: null,
    virtual: false,
    interests: ['games', 'music'],
    audiences: ['all-ages'],
    offersVolunteering: false,
    languages: [{ code: 'es' }, { code: 'en' }],
    time: {
      timeSlots: ['evenings'],
      days: 'Last Friday of the month',
      detail: null
    },
    cost: { free: true, detail: null },
    accessibility: unknownAccessibility,
    contact: {
      phone: null,
      phoneStatus: 'unconfirmed',
      contactPerson: null,
      email: null,
      howToJoin: null
    },
    officialSource: null,
    lastVerified: '2025-02-01',
    verification: 'inaccessible',
    verificationNote: {
      en: 'The program is paused and the organization’s website no longer works. Excluded from results.',
      es: 'El programa está pausado y el sitio web de la organización ya no funciona. Se excluye de los resultados.'
    }
  },

  // ---------------------------------------------------------------------------
  // Real organizations from the repository directory (published name/address/
  // website only). Program details are intentionally unconfirmed.
  // ---------------------------------------------------------------------------
  {
    id: 'dir-cupertino-senior-center',
    recordType: 'directory',
    organization: 'Cupertino Senior Center',
    activityName: { en: 'Senior center drop-in programs', es: 'Programas abiertos del centro para mayores' },
    description: {
      en: 'The City of Cupertino lists a senior center at this address. Activities, hours, cost and language support are not confirmed in this prototype — check the official website or call before visiting.',
      es: 'La Ciudad de Cupertino indica un centro para adultos mayores en esta dirección. Las actividades, horarios, costos e idiomas no están confirmados en este prototipo; consulte el sitio oficial o llame antes de ir.'
    },
    city: 'Cupertino',
    zip: '95014',
    address: '21251 Stevens Creek Blvd., Cupertino, CA 95014',
    virtual: false,
    interests: ['other'],
    audiences: ['older-adults'],
    offersVolunteering: false,
    languages: null,
    time: noTime,
    cost: { free: null, detail: null },
    accessibility: unknownAccessibility,
    contact: noContact,
    officialSource: 'https://cupertino.gov/Parks-Recreation/Senior-Center',
    lastVerified: null,
    verification: 'unconfirmed',
    verificationNote: {
      en: 'Real organization from the project directory. Program details not confirmed in this prototype.',
      es: 'Organización real del directorio del proyecto. Los detalles del programa no están confirmados en este prototipo.'
    }
  },
  {
    id: 'dir-mountain-view-senior-center',
    recordType: 'directory',
    organization: 'Mountain View Senior Center',
    activityName: { en: 'Senior center drop-in programs', es: 'Programas abiertos del centro para mayores' },
    description: {
      en: 'The City of Mountain View lists a senior center at this address. Activities, hours, cost and language support are not confirmed in this prototype — check the official website or call before visiting.',
      es: 'La Ciudad de Mountain View indica un centro para adultos mayores en esta dirección. Las actividades, horarios, costos e idiomas no están confirmados en este prototipo; consulte el sitio oficial o llame antes de ir.'
    },
    city: 'Mountain View',
    zip: '94040',
    address: '266 Escuela Ave., Mountain View, CA 94040',
    virtual: false,
    interests: ['other'],
    audiences: ['older-adults'],
    offersVolunteering: false,
    languages: null,
    time: noTime,
    cost: { free: null, detail: null },
    accessibility: unknownAccessibility,
    contact: noContact,
    officialSource: 'https://mountainview.gov/senior-center',
    lastVerified: null,
    verification: 'unconfirmed',
    verificationNote: {
      en: 'Real organization from the project directory. Program details not confirmed in this prototype.',
      es: 'Organización real del directorio del proyecto. Los detalles del programa no están confirmados en este prototipo.'
    }
  },
  {
    id: 'dir-barbara-lee-senior-center',
    recordType: 'directory',
    organization: 'Barbara Lee Senior Center',
    activityName: { en: 'Senior center drop-in programs', es: 'Programas abiertos del centro para mayores' },
    description: {
      en: 'The City of Milpitas lists a senior center at this address. Activities, hours, cost and language support are not confirmed in this prototype — check the official website or call before visiting.',
      es: 'La Ciudad de Milpitas indica un centro para adultos mayores en esta dirección. Las actividades, horarios, costos e idiomas no están confirmados en este prototipo; consulte el sitio oficial o llame antes de ir.'
    },
    city: 'Milpitas',
    zip: '95035',
    address: '40 N. Milpitas Blvd., Milpitas, CA 95035',
    virtual: false,
    interests: ['other'],
    audiences: ['older-adults'],
    offersVolunteering: false,
    languages: null,
    time: noTime,
    cost: { free: null, detail: null },
    accessibility: unknownAccessibility,
    contact: noContact,
    officialSource: 'https://milpitas.gov/797/Adult-Programs',
    lastVerified: null,
    verification: 'unconfirmed',
    verificationNote: {
      en: 'Real organization from the project directory. Program details not confirmed in this prototype.',
      es: 'Organización real del directorio del proyecto. Los detalles del programa no están confirmados en este prototipo.'
    }
  },
  {
    id: 'dir-avenidas-bryant',
    recordType: 'directory',
    organization: 'Avenidas @450 Bryant',
    activityName: { en: 'Older adult programs and services', es: 'Programas y servicios para adultos mayores' },
    description: {
      en: 'Avenidas is listed in the project directory at this address. Specific activities, hours, cost and language support are not confirmed in this prototype — check the official website or call before visiting.',
      es: 'Avenidas aparece en el directorio del proyecto en esta dirección. Las actividades específicas, horarios, costos e idiomas no están confirmados en este prototipo; consulte el sitio oficial o llame antes de ir.'
    },
    city: 'Palo Alto',
    zip: '94301',
    address: '450 Bryant St., Palo Alto, CA 94301',
    virtual: false,
    interests: ['other'],
    audiences: ['older-adults'],
    offersVolunteering: false,
    languages: null,
    time: noTime,
    cost: { free: null, detail: null },
    accessibility: unknownAccessibility,
    contact: noContact,
    officialSource: 'https://avenidas.org',
    lastVerified: null,
    verification: 'unconfirmed',
    verificationNote: {
      en: 'Real organization from the project directory. Program details not confirmed in this prototype.',
      es: 'Organización real del directorio del proyecto. Los detalles del programa no están confirmados en este prototipo.'
    }
  },
  {
    id: 'dir-campbell-adult-center',
    recordType: 'directory',
    organization: 'Campbell Adult Center',
    activityName: { en: 'Adult center programs', es: 'Programas del centro para adultos' },
    description: {
      en: 'The City of Campbell lists an adult center at this address. Activities, hours, cost and language support are not confirmed in this prototype — check the official website or call before visiting.',
      es: 'La Ciudad de Campbell indica un centro para adultos en esta dirección. Las actividades, horarios, costos e idiomas no están confirmados en este prototipo; consulte el sitio oficial o llame antes de ir.'
    },
    city: 'Campbell',
    zip: '95008',
    address: '1 W. Campbell Ave., C-33, Campbell, CA 95008',
    virtual: false,
    interests: ['other'],
    audiences: ['older-adults', 'all-ages'],
    offersVolunteering: false,
    languages: null,
    time: noTime,
    cost: { free: null, detail: null },
    accessibility: unknownAccessibility,
    contact: noContact,
    officialSource: 'https://campbellca.gov/adultcenter',
    lastVerified: null,
    verification: 'unconfirmed',
    verificationNote: {
      en: 'Real organization from the project directory. Program details not confirmed in this prototype.',
      es: 'Organización real del directorio del proyecto. Los detalles del programa no están confirmados en este prototipo.'
    }
  },
  {
    id: 'dir-los-altos-adult-50',
    recordType: 'directory',
    organization: 'Los Altos Adult 50+ Program',
    activityName: { en: 'Adult 50+ programs', es: 'Programas para adultos de 50 años o más' },
    description: {
      en: 'The City of Los Altos lists an Adult 50+ program at this address. Activities, hours, cost and language support are not confirmed in this prototype — check the official website or call before visiting.',
      es: 'La Ciudad de Los Altos indica un programa para adultos de 50 años o más en esta dirección. Las actividades, horarios, costos e idiomas no están confirmados en este prototipo; consulte el sitio oficial o llame antes de ir.'
    },
    city: 'Los Altos',
    zip: '94022',
    address: '97 Hillview Ave., Los Altos, CA 94022',
    virtual: false,
    interests: ['other'],
    audiences: ['older-adults'],
    offersVolunteering: false,
    languages: null,
    time: noTime,
    cost: { free: null, detail: null },
    accessibility: unknownAccessibility,
    contact: noContact,
    officialSource: 'https://losaltosca.gov/664/Adult-50-Program',
    lastVerified: null,
    verification: 'unconfirmed',
    verificationNote: {
      en: 'Real organization from the project directory. Program details not confirmed in this prototype.',
      es: 'Organización real del directorio del proyecto. Los detalles del programa no están confirmados en este prototipo.'
    }
  }
];

export const DEMO_DATA_NOTICE =
  'Community connector records marked “Sample record” are fictional demonstration data. Real organization entries only contain published name, address and website; program details must be confirmed with the organization.';
