import { DemonstrationResource, CategoryInfo } from '../types';

export const categoriesData: CategoryInfo[] = [
  {
    id: 'food',
    name: { en: 'Food Access', es: 'Acceso a Alimentos' },
    tagline: { en: 'Groceries, emergency pantries & culturally familiar staples', es: 'Despensas, mercados móviles y canasta básica' },
    icon: 'Utensils',
    badgeColor: 'emerald',
    count: 4
  },
  {
    id: 'mental-health',
    name: { en: 'Mental Health', es: 'Salud Mental' },
    tagline: { en: 'Sliding-scale therapy, youth peer support & confidential counseling', es: 'Terapia accesible, apoyo entre jóvenes y consejería bilingüe' },
    icon: 'HeartHandshake',
    badgeColor: 'violet',
    count: 4
  },
  {
    id: 'workforce',
    name: { en: 'Education & Workforce', es: 'Educación y Trabajo' },
    tagline: { en: 'Tech retraining, community college grants & FAFSA assistance', es: 'Becas de capacitación, colegio comunitario y ayuda estudiantil' },
    icon: 'GraduationCap',
    badgeColor: 'indigo',
    count: 4
  },
  {
    id: 'community',
    name: { en: 'Community Connection', es: 'Conexión Comunitaria' },
    tagline: { en: 'Senior social clubs, youth recreation & tenant rights clinics', es: 'Programas de adultos mayores, espacios juveniles y derechos comunitarios' },
    icon: 'Users',
    badgeColor: 'amber',
    count: 4
  }
];

export const demonstrationResources: DemonstrationResource[] = [
  // 1. Food Access Resources
  {
    id: 'res-food-1',
    categoryId: 'food',
    title: {
      en: 'Sacred Heart Community Service — Food Program',
      es: 'Sacred Heart Community Service — Programa de Alimentos'
    },
    organization: {
      en: 'Sacred Heart Community Service',
      es: 'Sacred Heart Community Service'
    },
    description: {
      en: 'Free groceries for Santa Clara County residents: a three-day supplemental supply of food, plus ready-to-eat food for members who are homeless. New members register online, and a Spanish registration form is available.',
      es: 'Despensa gratuita para residentes del Condado de Santa Clara: alimentos para tres días y comida lista para miembros sin hogar. Las personas nuevas se registran en línea y hay formulario de registro en español.'
    },
    location: {
      city: 'San Jose',
      county: 'Santa Clara County',
      transitNote: {
        en: '1381 South First Street, San Jose — corner of South First Street and Alma Avenue. Check VTA trip planning for your route.',
        es: '1381 South First Street, San José — esquina de South First Street y Alma Avenue. Consulta las rutas de VTA.'
      },
      addressSimulated: '1381 South First Street, San Jose, CA 95110'
    },
    schedule: {
      en: 'Food distribution: Monday, Wednesday, Thursday 9:00 AM–4:00 PM; Tuesday 9:00 AM–6:00 PM; Friday 9:00 AM–12:00 PM. Closed Saturday and Sunday.',
      es: 'Distribución de alimentos: lunes, miércoles y jueves de 9:00 AM a 4:00 PM; martes de 9:00 AM a 6:00 PM; viernes de 9:00 AM a 12:00 PM. Cerrado sábado y domingo.'
    },
    costType: 'Free',
    languagesSupported: ['English', 'Español'],
    eligibilityHighlight: {
      en: 'Santa Clara County residents; food is available once per week. Register online as a member before the first visit.',
      es: 'Residentes del Condado de Santa Clara; los alimentos se pueden recoger una vez por semana. Regístrate en línea como miembro antes de la primera visita.'
    },
    noIdRequired: false,
    confidential: false,
    tags: ['Food Pantry', 'Santa Clara County', 'Online Registration', 'Spanish Form'],
    nextStepInsight: {
      explanation: {
        en: 'Sacred Heart publishes its food program online: a three-day supply of groceries for county residents, with member registration available in English and Spanish.',
        es: 'Sacred Heart publica su programa de alimentos en línea: despensa para tres días para residentes del condado, con registro de miembros en inglés y español.'
      },
      confidenceRating: 98,
      sourceOrganization: {
        en: 'Sacred Heart Community Service',
        es: 'Sacred Heart Community Service'
      },
      simulatedVerificationDate: 'November 2026',
      dataSourceLabel: {
        en: 'Official Sacred Heart food program page',
        es: 'Página oficial del programa de alimentos de Sacred Heart'
      },
      documentsNeeded: [
        {
          en: 'Register online as a member first; ask the organization which documents, if any, it needs.',
          es: 'Primero regístrate en línea como miembro; pregunta a la organización qué documentos, si alguno, necesita.'
        }
      ],
      actionItems: [
        {
          id: 'food-act-1',
          title: { en: 'Register as a member online', es: 'Regístrate en línea como miembro' },
          description: { en: 'The official page links English and Spanish registration forms.', es: 'La página oficial enlaza formularios de registro en inglés y español.' },
          estimatedMinutes: 10
        },
        {
          id: 'food-act-2',
          title: { en: 'Confirm the hours before you go', es: 'Confirma el horario antes de ir' },
          description: { en: 'Distribution hours are published on the food program page and can change.', es: 'El horario de distribución se publica en la página del programa y puede cambiar.' },
          estimatedMinutes: 5
        }
      ],
      accessibilityNotes: {
        en: 'Call (408) 278-2160 to ask about accessibility and language support.',
        es: 'Llama al (408) 278-2160 para preguntar sobre accesibilidad y apoyo en español.'
      }
    },
    contactSimulated: {
      phone: '(408) 278-2160',
      intakeMethod: { en: 'Register online, then visit during food distribution hours', es: 'Regístrate en línea y luego visita durante el horario de distribución' },
      websiteDomainSimulated: 'sacredheartcs.org'
    }
  },
  {
    id: 'res-food-2',
    categoryId: 'food',
    title: {
      en: 'Second Harvest of Silicon Valley — Food Locator',
      es: 'Second Harvest of Silicon Valley — Localizador de Alimentos'
    },
    organization: {
      en: 'Second Harvest of Silicon Valley',
      es: 'Second Harvest of Silicon Valley'
    },
    description: {
      en: 'Free groceries and ready-to-eat meals across Santa Clara and San Mateo counties. Search the official locator by ZIP code or current location, filter by day and time, and look for sites marked “No documents required.”',
      es: 'Alimentos gratuitos y comidas listas para llevar en los condados de Santa Clara y San Mateo. Busca en el localizador oficial por código postal o ubicación, filtra por día y hora y busca los sitios marcados como “No documents required”.'
    },
    location: {
      city: 'San Jose',
      county: 'Santa Clara & San Mateo Counties',
      transitNote: {
        en: 'Online locator for sites across both counties; each listing includes its address and contact number.',
        es: 'Localizador en línea para sitios en ambos condados; cada listado incluye dirección y número de contacto.'
      },
      addressSimulated: 'Online locator; Second Harvest office: 750 Curtner Avenue, San Jose, CA 95125'
    },
    schedule: {
      en: 'Varies by site — the locator shows the current days and times for each distribution.',
      es: 'Varía según el sitio — el localizador muestra los días y horarios actuales de cada distribución.'
    },
    costType: 'Free',
    languagesSupported: ['English', 'Español', 'Tiếng Việt', '中文', 'Tagalog'],
    eligibilityHighlight: {
      en: 'Free food sites in both counties; each listing shows whether documents are required.',
      es: 'Sitios de alimentos gratuitos en ambos condados; cada listado indica si se requieren documentos.'
    },
    noIdRequired: false,
    confidential: false,
    tags: ['Food Locator', 'Santa Clara County', 'San Mateo County', 'No Documents Filter'],
    nextStepInsight: {
      explanation: {
        en: 'The official Second Harvest locator lists free grocery and meal sites in both counties with current schedules and a “No documents required” filter.',
        es: 'El localizador oficial de Second Harvest enumera sitios de alimentos y comidas gratuitas en ambos condados con horarios actuales y un filtro de “No documents required”.'
      },
      confidenceRating: 96,
      sourceOrganization: {
        en: 'Second Harvest of Silicon Valley',
        es: 'Second Harvest of Silicon Valley'
      },
      simulatedVerificationDate: 'November 2026',
      dataSourceLabel: {
        en: 'Official Second Harvest Get Food page',
        es: 'Página oficial Get Food de Second Harvest'
      },
      documentsNeeded: [
        {
          en: 'Requirements vary by site — use the “No documents required” filter in the locator, or call the Food Connection team.',
          es: 'Los requisitos varían por sitio — usa el filtro “No documents required” en el localizador o llama al equipo Food Connection.'
        }
      ],
      actionItems: [
        {
          id: 'food-act-3',
          title: { en: 'Open the Food Locator', es: 'Abre el Localizador de Alimentos' },
          description: { en: 'Search by ZIP code or location, then filter by day and time.', es: 'Busca por código postal o ubicación y filtra por día y hora.' },
          estimatedMinutes: 10
        },
        {
          id: 'food-act-4',
          title: { en: 'Call the Food Connection team', es: 'Llama al equipo Food Connection' },
          description: { en: '1-800-984-3663 — help finding food or applying for CalFresh.', es: '1-800-984-3663 — ayuda para encontrar alimentos o solicitar CalFresh.' },
          estimatedMinutes: 10
        }
      ],
      accessibilityNotes: {
        en: 'Call 1-800-984-3663 to ask about accessibility at a specific site.',
        es: 'Llama al 1-800-984-3663 para preguntar sobre accesibilidad en un sitio específico.'
      }
    },
    contactSimulated: {
      phone: '1-800-984-3663',
      intakeMethod: { en: 'Call the Food Connection team or use the online locator', es: 'Llama al equipo Food Connection o usa el localizador en línea' },
      websiteDomainSimulated: 'shfb.org'
    }
  },
  {
    id: 'res-food-3',
    categoryId: 'food',
    title: {
      en: 'San Mateo County Aging & Disability Services',
      es: 'Servicios para Personas Mayores y Discapacidades del Condado de San Mateo'
    },
    organization: {
      en: 'San Mateo County Health',
      es: 'San Mateo County Health'
    },
    description: {
      en: 'County office that connects older adults and caregivers with services. Call to ask about senior meal programs and home-delivered meals for adults 60 and older; spouses and caregivers may also be eligible depending on the location.',
      es: 'Oficina del condado que conecta a personas mayores y cuidadores con servicios. Llama para preguntar por programas de comidas para personas mayores y comidas a domicilio para adultos de 60 años o más; los cónyuges y cuidadores también pueden ser elegibles según el lugar.'
    },
    location: {
      city: 'Redwood City',
      county: 'San Mateo County',
      transitNote: {
        en: 'Countywide — the county page lists program offices and locations.',
        es: 'En todo el condado — la página del condado enumera oficinas y ubicaciones de los programas.'
      },
      addressSimulated: 'Countywide — see the county page for office and program locations'
    },
    schedule: {
      en: 'Varies by program — call the county or check the official page for current information.',
      es: 'Varía según el programa — llama al condado o consulta la página oficial para información actual.'
    },
    costType: 'Sliding Scale',
    languagesSupported: ['English'],
    eligibilityHighlight: {
      en: 'Adults 60 and older for senior meal programs; spouses and caregivers may also be eligible depending on the location.',
      es: 'Adultos de 60 años o más para los programas de comidas; los cónyuges y cuidadores también pueden ser elegibles según el lugar.'
    },
    noIdRequired: false,
    confidential: false,
    tags: ['Older Adults', 'Senior Meals', 'Caregivers', 'San Mateo County'],
    nextStepInsight: {
      explanation: {
        en: 'San Mateo County Health connects older adults and caregivers with services. Ask specifically about senior meal programs and home-delivered meals.',
        es: 'San Mateo County Health conecta a personas mayores y cuidadores con servicios. Pregunta específicamente por los programas de comidas y las comidas a domicilio.'
      },
      confidenceRating: 95,
      sourceOrganization: {
        en: 'San Mateo County Health',
        es: 'San Mateo County Health'
      },
      simulatedVerificationDate: 'November 2026',
      dataSourceLabel: {
        en: 'Official San Mateo County Health page',
        es: 'Página oficial de San Mateo County Health'
      },
      documentsNeeded: [
        {
          en: 'Ask the county what applies to the specific meal program; eligibility and paperwork vary by program.',
          es: 'Pregunta al condado qué aplica al programa de comidas específico; la elegibilidad y el papeleo varían según el programa.'
        }
      ],
      actionItems: [
        {
          id: 'food-act-5',
          title: { en: 'Open the county services page', es: 'Abre la página de servicios del condado' },
          description: { en: 'Find the contact number for Aging & Disability Services.', es: 'Encuentra el número de contacto de Servicios para Personas Mayores y Discapacidades.' },
          estimatedMinutes: 5
        }
      ],
      accessibilityNotes: {
        en: 'Call the county to ask about accessibility and language support.',
        es: 'Llama al condado para preguntar sobre accesibilidad y apoyo en español.'
      }
    },
    contactSimulated: {
      phone: 'See county website for phone numbers',
      intakeMethod: { en: 'Call the county or check the official page', es: 'Llama al condado o consulta la página oficial' },
      websiteDomainSimulated: 'smchealth.org'
    }
  },
  {
    id: 'res-food-4',
    categoryId: 'food',
    title: {
      en: 'Veggielution Farm Stand',
      es: 'Puesto de Granja Veggielution'
    },
    organization: {
      en: 'Veggielution',
      es: 'Veggielution'
    },
    description: {
      en: 'Weekly farm stand at Emma Prusch Farm Park in East San Jose with organic produce harvested by staff and volunteers. Produce is sold at affordable prices and EBT is accepted; it is not a free distribution.',
      es: 'Puesto de granja semanal en Emma Prusch Farm Park, en el Este de San José, con productos orgánicos cosechados por el equipo y voluntarios. Los productos se venden a precios accesibles y se acepta EBT; no es una distribución gratuita.'
    },
    location: {
      city: 'East San Jose',
      county: 'Santa Clara County',
      transitNote: {
        en: 'At Emma Prusch Farm Park; check VTA trip planning for bus routes.',
        es: 'En Emma Prusch Farm Park; consulta las rutas de autobús de VTA.'
      },
      addressSimulated: '647 S. King Road, San Jose, CA 95116 (Emma Prusch Farm Park)'
    },
    schedule: {
      en: 'Every Saturday, 10:00 AM–2:00 PM.',
      es: 'Todos los sábados, de 10:00 AM a 2:00 PM.'
    },
    costType: 'Sliding Scale',
    languagesSupported: ['English'],
    eligibilityHighlight: {
      en: 'Open to the public; cash, debit, credit and EBT accepted.',
      es: 'Abierto al público; se aceptan efectivo, débito, crédito y EBT.'
    },
    noIdRequired: false,
    confidential: false,
    tags: ['Farm Stand', 'Fresh Produce', 'EBT Accepted', 'East San Jose'],
    nextStepInsight: {
      explanation: {
        en: 'Veggielution publishes a weekly Saturday farm stand at Emma Prusch Farm Park, with organic produce and EBT accepted.',
        es: 'Veggielution publica un puesto de granja semanal los sábados en Emma Prusch Farm Park, con productos orgánicos y EBT aceptado.'
      },
      confidenceRating: 94,
      sourceOrganization: {
        en: 'Veggielution',
        es: 'Veggielution'
      },
      simulatedVerificationDate: 'November 2026',
      dataSourceLabel: {
        en: 'Official Veggielution Farm Stand page',
        es: 'Página oficial del Puesto de Granja de Veggielution'
      },
      documentsNeeded: [
        {
          en: 'No documents are described for shopping; bring a form of payment, including EBT.',
          es: 'No se describen documentos para comprar; lleva una forma de pago, incluido EBT.'
        }
      ],
      actionItems: [
        {
          id: 'food-act-6',
          title: { en: 'Open the Farm Stand page', es: 'Abre la página del Puesto de Granja' },
          description: { en: 'Confirm the current hours before you go.', es: 'Confirma el horario actual antes de ir.' },
          estimatedMinutes: 5
        },
        {
          id: 'food-act-7',
          title: { en: 'Call with questions', es: 'Llama si tienes preguntas' },
          description: { en: '(408) 256-0796 — the number published on the Veggielution website.', es: '(408) 256-0796 — el número publicado en el sitio de Veggielution.' },
          estimatedMinutes: 5
        }
      ],
      accessibilityNotes: {
        en: 'Call (408) 256-0796 to ask about accessibility at the farm stand.',
        es: 'Llama al (408) 256-0796 para preguntar sobre accesibilidad en el puesto de granja.'
      }
    },
    contactSimulated: {
      phone: '(408) 256-0796',
      intakeMethod: { en: 'Visit the Saturday farm stand; no appointment described', es: 'Visita el puesto de granja del sábado; no se describe cita' },
      websiteDomainSimulated: 'veggielution.org'
    }
  },

  // 2. Mental Health Resources
  {
    id: 'res-mental-1',
    categoryId: 'mental-health',
    title: {
      en: 'Sunnyvale Youth Wellness & Peer Support Hub',
      es: 'Centro Juvenil de Bienestar y Apoyo entre Pares de Sunnyvale'
    },
    organization: {
      en: 'Silicon Valley Youth Wellness Initiative (Simulated)',
      es: 'Iniciativa de Bienestar Juvenil de Silicon Valley (Simulado)'
    },
    description: {
      en: 'A confidential, stigma-free drop-in center designed specifically for teens aged 12-18 experiencing academic pressure, test anxiety, depression, and social loneliness.',
      es: 'Un centro sin estigma y confidencial para jóvenes de 12 a 18 años con estrés escolar, ansiedad ante exámenes, tristeza y aislamiento social.'
    },
    location: {
      city: 'Sunnyvale',
      county: 'Santa Clara County',
      transitNote: {
        en: 'Near Sunnyvale Public Library and Downtown Caltrain Station (5 min bike ride)',
        es: 'Cerca de la Biblioteca Pública de Sunnyvale y estación Caltrain (5 min en bicicleta)'
      },
      addressSimulated: '665 W Olive Ave, Sunnyvale, CA 94086 (Simulated)'
    },
    schedule: {
      en: 'Monday – Friday: 3:00 PM – 7:30 PM; Saturdays 11:00 AM – 4:00 PM',
      es: 'Lunes a viernes: 3:00 PM – 7:30 PM; Sábados 11:00 AM – 4:00 PM'
    },
    costType: 'No Cost for Youth',
    languagesSupported: ['English', 'Español', 'Mandarin'],
    eligibilityHighlight: {
      en: 'Teens 12-18. In California, youth aged 12+ can access confidential outpatient wellness services.',
      es: 'Jóvenes de 12 a 18 años. En California, jóvenes de 12+ pueden acceder a apoyo de forma confidencial.'
    },
    noIdRequired: true,
    confidential: true,
    tags: ['Youth Only (12-18)', 'Zero Cost', 'Confidential', 'No Parent Notice Required'],
    nextStepInsight: {
      explanation: {
        en: 'Created in response to high adolescent academic stress in Silicon Valley school districts. Focuses on low-barrier informal comfort, decompression, and peer listening rather than clinical pathology.',
        es: 'Creado para atender el alto estrés académico adolescente en Silicon Valley. Ofrece un espacio relajado, descompresión y escucha entre jóvenes sin juzgar.'
      },
      confidenceRating: 97,
      sourceOrganization: {
        en: 'Santa Clara County Youth Mental Health Taskforce 2026',
        es: 'Fuerza de Tarea de Salud Mental Juvenil de Santa Clara 2026'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'California Minor Consent Health Services Code § 124260',
        es: 'Código de Salud de California de Consentimiento de Menores § 124260'
      },
      documentsNeeded: [
        { en: 'None required (no insurance card, no student ID required)', es: 'Ninguno requerido (no necesita tarjeta de seguro ni credencial escolar)' }
      ],
      actionItems: [
        {
          id: 'mental-act-1',
          title: { en: 'Walk in during after-school hours (3-7 PM)', es: 'Llegar en horario después de clases (3-7 PM)' },
          description: { en: 'Greet the youth peer host at the check-in lounge; choose a chill study booth or sensory room.', es: 'Saluda al anfitrión juvenil en la sala; elige un cubículo de estudio o sala sensorial.' },
          estimatedMinutes: 5
        },
        {
          id: 'mental-act-2',
          title: { en: 'Optionally request a 1-on-1 private talk', es: 'Opcional: solicitar una plática privada 1 a 1' },
          description: { en: 'Meet with a licensed youth counselor or trained peer specialist to learn breathing and somatic grounding.', es: 'Habla con un consejero juvenil o especialista par para aprender técnicas de relajación física.' },
          estimatedMinutes: 30
        }
      ],
      commonMisconceptions: {
        en: 'Visiting this center does NOT alert your school or appear on academic records.',
        es: 'Asistir a este centro NO notifica a tu escuela ni aparece en tu historial escolar.'
      },
      accessibilityNotes: {
        en: 'Quiet sensory room with adjustable lighting and noise-canceling headphones for neurodivergent teens.',
        es: 'Sala sensorial tranquila con luces regulables y audífonos de cancelación de ruido.'
      }
    },
    contactSimulated: {
      phone: '(408) 555-TEEN (Simulated)',
      intakeMethod: { en: 'Drop-in or text "CONNECT" to simulated shortcode', es: 'Llegada directa o texto "CONNECT" a código corto simulado' },
      websiteDomainSimulated: 'sunnyvaleyouthwellness-demo.local'
    }
  },
  {
    id: 'res-mental-2',
    categoryId: 'mental-health',
    title: {
      en: 'California Youth Crisis & Teen Peer Text Line',
      es: 'Línea de Crisis y Mensajes de Texto para Jóvenes de California'
    },
    organization: {
      en: 'Statewide Youth Peer Alliance (Simulated Demonstration)',
      es: 'Alianza Estatal de Jóvenes de California (Demostración)'
    },
    description: {
      en: 'Free, confidential, 24/7 text and chat support for middle school, high school, and transition-age youth dealing with panic, heartbreak, family conflict, or overwhelming thoughts.',
      es: 'Apoyo gratuito y confidencial 24/7 por mensaje de texto para jóvenes con ataques de pánico, tristeza, problemas familiares o pensamientos abrumadores.'
    },
    location: {
      city: 'Virtual / Silicon Valley Wide',
      county: 'All Bay Area Counties',
      transitNote: {
        en: 'Remote digital service accessible on any mobile device or school Chromebook',
        es: 'Servicio digital remoto accesible en celulares o computadoras escolares'
      },
      addressSimulated: 'Digital Access (Simulated Phone/Chat)'
    },
    schedule: {
      en: '24 Hours / 7 Days a week; peak teen counselor staffing 4:00 PM – Midnight',
      es: '24 Horas / 7 Días a la semana; mayor atención entre jóvenes de 4:00 PM a medianoche'
    },
    costType: 'No Cost for Youth',
    languagesSupported: ['English', 'Español'],
    eligibilityHighlight: {
      en: 'Free for all youth under 25 across California; 100% anonymous.',
      es: 'Gratuito para jóvenes menores de 25 años en California; 100% anónimo.'
    },
    noIdRequired: true,
    confidential: true,
    tags: ['24/7 Text Line', 'Anonymous', 'Teens & Youth', 'Bilingual English/Spanish'],
    nextStepInsight: {
      explanation: {
        en: 'Texting eliminates the barrier of speaking aloud in a crowded home or classroom, allowing immediate de-escalation when feeling overwhelmed.',
        es: 'El texto elimina la dificultad de hablar en voz alta en una casa llena de gente, permitiendo alivio inmediato en momentos de tensión.'
      },
      confidenceRating: 99,
      sourceOrganization: {
        en: 'California Department of Public Health Mental Health Division',
        es: 'Departamento de Salud Pública de California'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Statewide Certified Crisis Peer Service',
        es: 'Servicio Certificado Estatal de Crisis'
      },
      documentsNeeded: [
        { en: 'None (no registration or sign-in needed)', es: 'Ninguno (no requiere registro ni cuenta)' }
      ],
      actionItems: [
        {
          id: 'mental-act-3',
          title: { en: 'Send a simulated text message "HOPE" to 844-863-TEEN', es: 'Enviar mensaje de texto simulado "HOPE" al 844-863-TEEN' },
          description: { en: 'An automated prompt asks your preferred language (English or Spanish).', es: 'Un mensaje automático pregunta si prefiere hablar en inglés o español.' },
          estimatedMinutes: 2
        },
        {
          id: 'mental-act-4',
          title: { en: 'Connect with a live trained listener', es: 'Conectar con un voluntario capacitado' },
          description: { en: 'Chat at your own pace without any pressure to share real names or addresses.', es: 'Platica a tu propio ritmo sin compromiso de dar tu nombre real ni dirección.' },
          estimatedMinutes: 15
        }
      ],
      commonMisconceptions: {
        en: 'You do not need to be in active life-or-death crisis to reach out; mild anxiety and exam stress are completely valid reasons.',
        es: 'No necesitas estar en peligro extremo para escribir; la ansiedad por exámenes o tristeza son motivos completamente válidos.'
      },
      accessibilityNotes: {
        en: 'Compatible with standard SMS and screen-reader accessibility tools.',
        es: 'Compatible con mensajes SMS regulares y lectores de pantalla.'
      }
    },
    contactSimulated: {
      phone: 'Text "HOPE" to (844) 555-TEEN (Simulated)',
      intakeMethod: { en: 'Instant Text Message 24/7', es: 'Mensaje de texto instantáneo 24/7' },
      websiteDomainSimulated: 'calyouthtext-prototype.local'
    }
  },
  {
    id: 'res-mental-3',
    categoryId: 'mental-health',
    title: {
      en: 'Alum Rock Family & Bilingual Community Counseling',
      es: 'Consejería Familiar y Comunitaria Bilingüe Alum Rock'
    },
    organization: {
      en: 'Alum Rock Community Services (Simulated Registry)',
      es: 'Servicios Comunitarios Alum Rock (Registro Simulado)'
    },
    description: {
      en: 'Culturally responsive, bilingual Spanish/English family and individual mental health counseling with sliding-scale and Medi-Cal coverage options.',
      es: 'Consejería psicológica individual y familiar bilingüe español/inglés, culturalmente sensible, con tarifas a escala y cobertura Medi-Cal.'
    },
    location: {
      city: 'East San Jose',
      county: 'Santa Clara County',
      transitNote: {
        en: 'Located on Alum Rock Ave; directly on VTA Rapid 522 and Route 23 lines',
        es: 'En Alum Rock Ave; con parada directa en autobuses VTA Rapid 522 y Línea 23'
      },
      addressSimulated: '1245 E Santa Clara St, San Jose, CA 95116 (Simulated)'
    },
    schedule: {
      en: 'Monday – Thursday: 9:00 AM – 8:00 PM; Fridays 9:00 AM – 5:00 PM',
      es: 'Lunes a jueves: 9:00 AM – 8:00 PM; Viernes 9:00 AM – 5:00 PM'
    },
    costType: 'Sliding Scale',
    languagesSupported: ['Español', 'English'],
    eligibilityHighlight: {
      en: 'Accepts Medi-Cal; sliding scale fees start at $0 for uninsured low-income families.',
      es: 'Acepta Medi-Cal; tarifas desde $0 para familias sin seguro y de bajos ingresos.'
    },
    noIdRequired: false,
    confidential: true,
    tags: ['Bilingual Counselors', 'Family Therapy', 'Sliding Scale $0+', 'Evening Appointments'],
    nextStepInsight: {
      explanation: {
        en: 'Helps families address multigenerational trauma, acculturation stress, and adolescent depression with therapists who share the community’s cultural background.',
        es: 'Ayuda a las familias a tratar estrés migratorio y retos emocionales con psicólogos que comparten la cultura y el idioma.'
      },
      confidenceRating: 94,
      sourceOrganization: {
        en: 'Santa Clara County Behavioral Health Services Network',
        es: 'Red de Salud Conductual del Condado de Santa Clara'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Community Behavioral Health Clinic Certification',
        es: 'Certificación de Clínica de Salud Conductual'
      },
      documentsNeeded: [
        { en: 'Medi-Cal benefits card (if enrolled)', es: 'Tarjeta de Medi-Cal (si cuenta con ella)' },
        { en: 'Or proof of household income (pay stub or simple affidavit for sliding scale fee of $0-$15)', es: 'O comprobante de ingresos (talón de cheque o carta simple para tarifa de $0-$15)' }
      ],
      actionItems: [
        {
          id: 'mental-act-5',
          title: { en: 'Request a bilingual phone intake', es: 'Solicitar registro telefónico bilingüe' },
          description: { en: 'Intake coordinator assesses needs in your preferred language and matches you with a therapist.', es: 'Un coordinador evalúa sus necesidades en español y le asigna un terapeuta compatible.' },
          estimatedMinutes: 20
        }
      ],
      accessibilityNotes: {
        en: 'ADA accessible parking directly in front of the building entrance.',
        es: 'Estacionamiento accesible ADA justo frente a la entrada del edificio.'
      }
    },
    contactSimulated: {
      phone: '(408) 555-0199 (Simulated)',
      intakeMethod: { en: 'Phone intake screening with Spanish coordinator', es: 'Evaluación telefónica en español' },
      websiteDomainSimulated: 'alumrockcounseling-demo.local'
    }
  },
  {
    id: 'res-mental-4',
    categoryId: 'mental-health',
    title: {
      en: 'Peninsula Adult Grief, Caregiver & Senior Support Circles',
      es: 'Círculos de Apoyo Emocional para Adultos Mayores y Cuidadores'
    },
    organization: {
      en: 'Peninsula Family Health Alliance (Simulated)',
      es: 'Alianza de Salud Familiar de la Península (Simulada)'
    },
    description: {
      en: 'Gentle, supportive weekly peer circles for older adults navigating the loss of a spouse, late-life transitions, or loneliness, held in Spanish and English.',
      es: 'Círculos semanales de apoyo mutuo para adultos mayores que enfrentan duelo por viudez, soledad o cambios de vida, en español e inglés.'
    },
    location: {
      city: 'Redwood City',
      county: 'San Mateo County',
      transitNote: {
        en: 'Near Hoover Park; accessible via SamTrans Route 270',
        es: 'Cerca del Parque Hoover; accesible por la ruta SamTrans 270'
      },
      addressSimulated: '2900 Spring St, Redwood City, CA 94063 (Simulated)'
    },
    schedule: {
      en: 'Spanish Circle: Tuesdays 10:00 AM – 11:30 AM; English Circle: Thursdays 2:00 PM – 3:30 PM',
      es: 'Círculo en Español: Martes 10:00 AM – 11:30 AM; En Inglés: Jueves 2:00 PM – 3:30 PM'
    },
    costType: 'Free',
    languagesSupported: ['Español', 'English'],
    eligibilityHighlight: {
      en: 'Seniors 55+ and family caregivers; free with coffee and light refreshments provided.',
      es: 'Adultos de 55+ años y cuidadores; gratis con café y refrigerio ligero incluido.'
    },
    noIdRequired: true,
    confidential: true,
    tags: ['Seniors 55+', 'Grief & Loss', 'Spanish Speaking', 'Warm Social Environment'],
    nextStepInsight: {
      explanation: {
        en: 'A safe, non-medicalized conversation space where elders share memories, overcome grief, and build lasting friendships in their native language.',
        es: 'Un espacio de conversación seguro y cálido donde los abuelos comparten recuerdos, superan el duelo y hacen nuevas amistades en su idioma.'
      },
      confidenceRating: 93,
      sourceOrganization: {
        en: 'San Mateo County Mental Health Collaborative',
        es: 'Colaborativa de Salud Mental de San Mateo'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Community Senior Wellness Network',
        es: 'Red de Bienestar para Personas Mayores'
      },
      documentsNeeded: [
        { en: 'None required', es: 'Ninguno requerido' }
      ],
      actionItems: [
        {
          id: 'mental-act-6',
          title: { en: 'Drop in on Tuesday morning at 9:45 AM', es: 'Llegar el martes por la mañana a las 9:45 AM' },
          description: { en: 'Enjoy a cup of coffee and meet group facilitator Doña Carmen.', es: 'Disfruta una taza de café y conoce a la facilitadora Doña Carmen.' },
          estimatedMinutes: 15
        }
      ],
      accessibilityNotes: {
        en: 'Single-story building with no stairs; comfortable armchairs with lumbar support.',
        es: 'Edificio de un solo piso sin escalones; sillones cómodos con soporte lumbar.'
      }
    },
    contactSimulated: {
      phone: '(650) 555-PEER (Simulated)',
      intakeMethod: { en: 'Drop-in or RSVP by phone', es: 'Llegada libre o confirmación por teléfono' },
      websiteDomainSimulated: 'peninsulacircles-demo.local'
    }
  },

  // 3. Education & Workforce Training Resources
  {
    id: 'res-work-1',
    categoryId: 'workforce',
    title: {
      en: 'NOVAworks Dislocated Worker & Tech Reskilling Program',
      es: 'Programa NOVAworks de Reconversión Laboral y Tecnología'
    },
    organization: {
      en: 'NOVAworks Workforce Board (Santa Clara & San Mateo Counties)',
      es: 'Junta de Desarrollo Laboral NOVAworks (Condados de Santa Clara y San Mateo)'
    },
    description: {
      en: 'Comprehensive federally funded retraining grants (WIOA) offering up to $8,000 for industry credentials in IT Support, Cloud Computing, Cybersecurity, and Data Analytics.',
      es: 'Becas federales de capacitación (WIOA) de hasta $8,000 para certificaciones en Soporte IT, Computación en la Nube, Ciberseguridad y Análisis de Datos.'
    },
    location: {
      city: 'Milpitas / Sunnyvale',
      county: 'Santa Clara County',
      transitNote: {
        en: 'Locations in Sunnyvale (near Mathilda Ave) and Milpitas Library Job Center',
        es: 'Sedes en Sunnyvale (cerca de Mathilda Ave) y Centro de Empleo en Biblioteca de Milpitas'
      },
      addressSimulated: '505 W Olive Ave, Suite 550, Sunnyvale, CA 94086 (Simulated)'
    },
    schedule: {
      en: 'Monday – Friday: 8:00 AM – 5:00 PM; Virtual orientations every Wednesday 10 AM',
      es: 'Lunes a viernes: 8:00 AM – 5:00 PM; Orientaciones virtuales cada miércoles 10 AM'
    },
    costType: 'Subsidized',
    languagesSupported: ['English', 'Español', 'Vietnamese', 'Tagalog'],
    eligibilityHighlight: {
      en: 'Individuals recently laid off, manufacturing workers impacted by reductions, or long-term unemployed.',
      es: 'Trabajadores despedidos recientemente, personal manufacturero afectado o desempleados.'
    },
    noIdRequired: false,
    confidential: true,
    tags: ['WIOA Grants up to $8k', 'Mid-Career Pivot', 'Certifications (CompTIA/AWS)', '1-on-1 Career Advisor'],
    nextStepInsight: {
      explanation: {
        en: 'Designed specifically to bridge mid-career manufacturing technicians into modern IT infrastructure and cloud operational roles without taking on student loan debt.',
        es: 'Diseñado específicamente para ayudar a técnicos con experiencia manufacturera a ingresar a roles en IT y nube sin deudas estudiantiles.'
      },
      confidenceRating: 98,
      sourceOrganization: {
        en: 'California Workforce Development Board Benchmark 2026',
        es: 'Junta de Desarrollo de la Fuerza Laboral de California 2026'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Federal Workforce Innovation and Opportunity Act (WIOA) Registry',
        es: 'Registro Federal de Innovación y Oportunidades Laborales (WIOA)'
      },
      documentsNeeded: [
        { en: 'Layoff notice letter / EDD Unemployment Insurance Determination Notice', es: 'Carta de despido o Notificación de Seguro de Desempleo EDD' },
        { en: 'California Driver License or State ID', es: 'Licencia de conducir de California o identificación estatal' },
        { en: 'Current resume draft detailing past manufacturing or technical experience', es: 'Borrador de currículum detallando experiencia previa' }
      ],
      actionItems: [
        {
          id: 'work-act-1',
          title: { en: 'Sign up for the 45-minute virtual WIOA orientation', es: 'Inscribirse a la orientación virtual de 45 minutos de WIOA' },
          description: { en: 'Orientations explain grant eligibility rules and approved IT training provider catalogs.', es: 'Explica los requisitos de las becas y el catálogo de escuelas de tecnología aprobadas.' },
          estimatedMinutes: 45
        },
        {
          id: 'work-act-2',
          title: { en: 'Schedule 1-on-1 intake interview with a Career Navigator', es: 'Agendar cita individual con un asesor laboral' },
          description: { en: 'Review certificate pathways (CompTIA Security+, AWS Cloud Practitioner, Google IT Support).', es: 'Revisar opciones de certificados (CompTIA Security+, AWS Cloud, Soporte Google IT).' },
          estimatedMinutes: 60
        },
        {
          id: 'work-act-3',
          title: { en: 'Submit training voucher paperwork for 100% tuition coverage', es: 'Enviar solicitud de vale de capacitación para 100% de colegiatura' },
          description: { en: 'Voucher pays training provider directly; no out-of-pocket tuition.', es: 'El vale paga directamente al instituto; sin desembolso de colegiatura.' },
          estimatedMinutes: 30
        }
      ],
      commonMisconceptions: {
        en: 'Enrolling in approved WIOA training does NOT cancel your weekly EDD unemployment benefits under California Training Benefits (CTB).',
        es: 'Inscribirse en capacitación WIOA aprobada NO cancela sus cheques de desempleo del EDD gracias al programa California Training Benefits.'
      },
      accessibilityNotes: {
        en: 'Assisted listening systems and screen reading workstations at both job center facilities.',
        es: 'Sistemas de apoyo auditivo y computadoras adaptadas para lectura en ambas sedes.'
      }
    },
    contactSimulated: {
      phone: '(408) 555-NOVA (Simulated)',
      intakeMethod: { en: 'Online orientation registration or phone intake', es: 'Registro en línea a orientación o llamada telefónica' },
      websiteDomainSimulated: 'novaworks-prototype.local'
    }
  },
  {
    id: 'res-work-2',
    categoryId: 'workforce',
    title: {
      en: 'Silicon Valley Adult Education Bilingual Computer & IT Academy',
      es: 'Academia de Computación e Informática Bilingüe para Adultos de Silicon Valley'
    },
    organization: {
      en: 'Metropolitan Education District (MetroED Simulated)',
      es: 'Distrito Educativo Metropolitano (MetroED Simulado)'
    },
    description: {
      en: 'Evening and weekend courses in computer fundamentals, Microsoft Office/Google Suite, bilingual customer support, and entry-level IT help desk preparation.',
      es: 'Cursos vespertinos y sabatinos de computación básica, paquetería de oficina, soporte al cliente bilingüe y preparación para mesa de ayuda en IT.'
    },
    location: {
      city: 'San Jose',
      county: 'Santa Clara County',
      transitNote: {
        en: 'At Central San Jose campus; VTA Light Rail Capitol station within walking distance',
        es: 'Campus en San José centro; estación de tren ligero VTA Capitol a corta distancia'
      },
      addressSimulated: '760 Hillsdale Ave, San Jose, CA 95136 (Simulated)'
    },
    schedule: {
      en: 'Evening classes: Tuesday & Thursday 6:00 PM – 8:30 PM; Saturday intensive 9 AM – 1 PM',
      es: 'Clases nocturnas: Martes y jueves 6:00 PM – 8:30 PM; Intensivo sábado 9 AM – 1 PM'
    },
    costType: 'Free',
    languagesSupported: ['Español', 'English', 'Vietnamese'],
    eligibilityHighlight: {
      en: 'California adults 18+; tuition is 100% free under California Adult Education Program funding.',
      es: 'Adultos de 18+ de California; 100% gratuito bajo el Programa de Educación para Adultos.'
    },
    noIdRequired: false,
    confidential: true,
    tags: ['Adult Education', 'Evening Classes', 'Free Tuition', 'Bilingual Instruction'],
    nextStepInsight: {
      explanation: {
        en: 'Ideal for older workers and career shifters needing foundational software confidence before entering specialized technical certifications.',
        es: 'Ideal para personas mayores y trabajadores que desean seguridad en el uso de computadoras antes de certificaciones técnicas avanzadas.'
      },
      confidenceRating: 95,
      sourceOrganization: {
        en: 'California Adult Education Program (CAEP) Directory',
        es: 'Directorio del Programa de Educación para Adultos de California'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'State Funded Adult Literacy & Vocational System',
        es: 'Sistema Estatal de Alfabetización y Formación Vocacional'
      },
      documentsNeeded: [
        { en: 'Proof of age 18+ (any government ID or foreign passport accepted)', es: 'Comprobante de mayoría de edad (cualquier identificación o pasaporte extranjero)' }
      ],
      actionItems: [
        {
          id: 'work-act-4',
          title: { en: 'Take the simple 15-minute digital skills placement check', es: 'Realizar la evaluación sencilla de 15 minutos de habilidades digitales' },
          description: { en: 'Ensures you are placed in the right difficulty level (Beginner vs. Intermediate).', es: 'Asegura que se le ubique en el nivel adecuado (Principiante o Intermedio).' },
          estimatedMinutes: 15
        }
      ],
      accessibilityNotes: {
        en: 'Free on-site parking and accessible computer lab benches with adaptive mice.',
        es: 'Estacionamiento gratuito en el plantel y mesas de cómputo adaptadas.'
      }
    },
    contactSimulated: {
      phone: '(408) 555-0155 (Simulated)',
      intakeMethod: { en: 'Walk-in registration at Student Services Building', es: 'Inscripción presencial en Servicios Estudiantiles' },
      websiteDomainSimulated: 'metroed-prototype.local'
    }
  },
  {
    id: 'res-work-3',
    categoryId: 'workforce',
    title: {
      en: 'Foothill & De Anza College Promise: Free Tuition & First-Gen Center',
      es: 'Foothill & De Anza College Promise: Matrícula Gratuita y Centro Primera Generación'
    },
    organization: {
      en: 'Foothill-De Anza Community College District (Simulated)',
      es: 'Distrito de Colegios Comunitarios Foothill-De Anza (Simulado)'
    },
    description: {
      en: 'Two years of 100% free college tuition and mandatory campus fees for eligible California high school graduates, plus $500 quarterly book vouchers and 1-on-1 first-gen mentoring.',
      es: 'Dos años de colegiatura 100% gratuita y cuotas escolares para graduados de preparatoria de California, más vales de libros de $500 y mentoría.'
    },
    location: {
      city: 'Cupertino / Los Altos Hills',
      county: 'Santa Clara County',
      transitNote: {
        en: 'Direct transit access via VTA Lines 23, 25, 51, and 53 to campus transit centers',
        es: 'Acceso directo en autobús VTA Líneas 23, 25, 51 y 53 a las terminales del campus'
      },
      addressSimulated: '21250 Stevens Creek Blvd, Cupertino, CA 95014 (Simulated)'
    },
    schedule: {
      en: 'Admissions & Financial Aid Help Desk: Monday – Thursday 8:30 AM – 5:00 PM',
      es: 'Módulo de Admisiones y Ayuda Financiera: Lunes a jueves 8:30 AM – 5:00 PM'
    },
    costType: 'Free',
    languagesSupported: ['English', 'Español', 'Mandarin', 'Vietnamese'],
    eligibilityHighlight: {
      en: 'California residents or AB 540 eligible non-residents enrolled in 12+ units per quarter.',
      es: 'Residentes de California o elegibles bajo ley AB 540 inscritos en al menos 12 créditos.'
    },
    noIdRequired: false,
    confidential: true,
    tags: ['2 Years Free Tuition', 'AB 540 Friendly', 'FAFSA & CADAA Help', 'First-Gen College'],
    nextStepInsight: {
      explanation: {
        en: 'Removes the financial barrier for first-generation students in Silicon Valley, providing a guaranteed transfer pathway to UC Berkeley, UCLA, UC Davis, and San Jose State University.',
        es: 'Elimina el costo de matrícula para estudiantes de primera generación y ofrece rutas garantizadas de transferencia a UC Berkeley, San Jose State y más.'
      },
      confidenceRating: 99,
      sourceOrganization: {
        en: 'California Community Colleges Chancellor’s Office',
        es: 'Oficina del Canciller de Colegios Comunitarios de California'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'California College Promise Grant (Assembly Bill 19/2) Official Registry',
        es: 'Registro Oficial de Becas California College Promise (Ley AB 19/2)'
      },
      documentsNeeded: [
        { en: 'High school graduation diploma or GED verification', es: 'Certificado de graduación de preparatoria o GED' },
        { en: 'FAFSA submission OR California Dream Act Application (CADAA for undocumented/AB 540 students)', es: 'Envío de FAFSA O solicitud California Dream Act (CADAA para estudiantes AB 540)' }
      ],
      actionItems: [
        {
          id: 'work-act-5',
          title: { en: 'Submit OpenCCC online college application for De Anza or Foothill', es: 'Llenar la solicitud en línea OpenCCC para De Anza o Foothill' },
          description: { en: 'Creates your student CWID identification number within 24 hours.', es: 'Genera su número de identificación de estudiante CWID en 24 horas.' },
          estimatedMinutes: 20
        },
        {
          id: 'work-act-6',
          title: { en: 'Complete FAFSA or CADAA financial aid application', es: 'Completar la solicitud de ayuda FAFSA o CADAA' },
          description: { en: 'Add De Anza College School Code (004480) or Foothill College School Code (001199).', es: 'Agregue el código escolar de De Anza (004480) o Foothill (001199).' },
          estimatedMinutes: 35
        },
        {
          id: 'work-act-7',
          title: { en: 'Book an appointment with the First-Gen Student Success Center', es: 'Agendar cita con el Centro de Éxito para Estudiantes de Primera Generación' },
          description: { en: 'A bilingual peer counselor checks that all Promise fee waivers are active on your portal account.', es: 'Un asesor bilingüe verifica que todas las exenciones de matrícula estén activadas en su portal.' },
          estimatedMinutes: 15
        }
      ],
      commonMisconceptions: {
        en: 'Undocumented students who attended 3+ years of California high schools qualify for AB 540 in-state tuition and state financial aid without risk.',
        es: 'Estudiantes indocumentados que asistieron 3+ años a preparatorias de CA califican para matrícula estatal bajo la ley AB 540 sin riesgo alguno.'
      },
      accessibilityNotes: {
        en: 'Comprehensive Disability Support Services (DSS) with note-taking accommodations and mobility transport carts on campus.',
        es: 'Servicios de Apoyo a la Discapacidad (DSS) con adaptaciones de apuntes y carritos de transporte en campus.'
      }
    },
    contactSimulated: {
      phone: '(408) 555-DEANZA (Simulated)',
      intakeMethod: { en: 'Virtual Financial Aid Drop-In or campus appointment', es: 'Módulo virtual de ayuda financiera o cita en campus' },
      websiteDomainSimulated: 'deanza-promise-prototype.local'
    }
  },
  {
    id: 'res-work-4',
    categoryId: 'workforce',
    title: {
      en: 'Year Up Bay Area: Tuition-Free Tech Apprenticeship & Stipend',
      es: 'Year Up Área de la Bahía: Pasantía de Tecnología Gratuita con Estipendio'
    },
    organization: {
      en: 'Year Up Greater Silicon Valley (Simulated Demonstration)',
      es: 'Year Up Greater Silicon Valley (Demostración)'
    },
    description: {
      en: 'One-year intensive training program for young adults aged 18-29, combining 6 months of college-level technical classroom learning with a 6-month paid internship at premier Silicon Valley tech employers.',
      es: 'Programa intensivo de 1 año para jóvenes de 18 a 29 años, combinando 6 meses de capacitación técnica con 6 meses de pasantía remunerada en empresas del área.'
    },
    location: {
      city: 'San Jose / Palo Alto',
      county: 'Santa Clara County',
      transitNote: {
        en: 'Convenient to Diridon Station (Caltrain, VTA Light Rail, Amtrak)',
        es: 'Cercano a la estación Diridon (Caltrain, tren ligero VTA, Amtrak)'
      },
      addressSimulated: '100 W San Fernando St, San Jose, CA 95113 (Simulated)'
    },
    schedule: {
      en: 'Full-time cohorts start twice per year (March and September); Monday – Friday 8:30 AM – 4:30 PM',
      es: 'Cohortes de tiempo completo inician dos veces al año (marzo y septiembre); Lun – Vie 8:30 AM – 4:30 PM'
    },
    costType: 'Free',
    languagesSupported: ['English', 'Español'],
    eligibilityHighlight: {
      en: 'Ages 18-29, high school diploma or GED, authorized to work in the US, motivated to enter technology.',
      es: 'Edades 18-29, certificado de preparatoria o GED, autorización para trabajar en EE.UU.'
    },
    noIdRequired: false,
    confidential: true,
    tags: ['Paid Internship', 'Ages 18-29', 'Software / Cloud / Data', 'Educational Stipend'],
    nextStepInsight: {
      explanation: {
        en: 'Bridges young talent from non-traditional backgrounds directly into corporate tech roles with corporate mentor pairings and professional wardrobe stipends.',
        es: 'Conecta talento joven con trayectorias no tradicionales a empleos corporativos en tecnología, ofreciendo mentores y apoyos.'
      },
      confidenceRating: 96,
      sourceOrganization: {
        en: 'Workforce Opportunity Benchmarks 2026',
        es: 'Indicadores de Oportunidades Laborales 2026'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Certified Apprenticeship Provider Directory',
        es: 'Directorio de Proveedores de Aprendizaje Certificados'
      },
      documentsNeeded: [
        { en: 'High School Diploma or GED certificate', es: 'Certificado de preparatoria o GED' },
        { en: 'Proof of work authorization (Green Card, DACA with EAD, or US Citizen passport/ID)', es: 'Autorización laboral (Residencia, DACA con permiso de trabajo o pasaporte/ID)' }
      ],
      actionItems: [
        {
          id: 'work-act-8',
          title: { en: 'Submit online student interest application', es: 'Completar la solicitud de interés estudiantil en línea' },
          description: { en: 'Takes 10 minutes; no essay or previous coding experience required.', es: 'Toma 10 minutos; no requiere ensayos ni experiencia previa en programación.' },
          estimatedMinutes: 10
        }
      ],
      accessibilityNotes: {
        en: 'Laptops and high-speed Wi-Fi hotspots provided to students for the duration of the program.',
        es: 'Se proporcionan computadoras portátiles y puntos de acceso a internet durante todo el curso.'
      }
    },
    contactSimulated: {
      phone: '(408) 555-YEAR (Simulated)',
      intakeMethod: { en: 'Online interest application and virtual interview', es: 'Solicitud en línea y entrevista virtual' },
      websiteDomainSimulated: 'yearup-sv-prototype.local'
    }
  },

  // 4. Community Connection Resources
  {
    id: 'res-comm-1',
    categoryId: 'community',
    title: {
      en: 'Casa Círculo Cultural: Senior Arts, Gentle Movement & Social Circle',
      es: 'Casa Círculo Cultural: Círculo de Arte, Movimiento y Convivencia para Adultos Mayores'
    },
    organization: {
      en: 'Casa Círculo Cultural (Simulated Community Index)',
      es: 'Casa Círculo Cultural (Índice Comunitario Simulado)'
    },
    description: {
      en: 'A warm, welcoming cultural community haven in Redwood City offering weekly Spanish-language social hours, traditional crafts, chair yoga, traditional music, and nutritious shared lunches.',
      es: 'Un espacio cultural acogedor en Redwood City que ofrece convivencia semanal en español, artesanías, yoga en silla, música tradicional y almuerzos compartidos nutritivos.'
    },
    location: {
      city: 'Redwood City',
      county: 'San Mateo County',
      transitNote: {
        en: 'In the North Fair Oaks neighborhood; SamTrans Route 270 and 296 stop 50 feet away',
        es: 'En el vecindario de North Fair Oaks; autobuses SamTrans 270 y 296 paran a 15 metros'
      },
      addressSimulated: '3090 Middlefield Rd, Redwood City, CA 94063 (Simulated)'
    },
    schedule: {
      en: 'Tuesdays and Thursdays: 10:00 AM – 1:30 PM (Lunch served at 12:15 PM)',
      es: 'Martes y jueves: 10:00 AM – 1:30 PM (Almuerzo servido a las 12:15 PM)'
    },
    costType: 'Free',
    languagesSupported: ['Español', 'English'],
    eligibilityHighlight: {
      en: 'Open to all elders 60+; zero membership fees. Caregivers and family members welcome to join.',
      es: 'Abierto a adultos mayores de 60+; sin cuotas de membresía. Familiares y cuidadores bienvenidos.'
    },
    noIdRequired: true,
    confidential: true,
    tags: ['Spanish Speaking', 'Seniors 60+', 'Art & Movement', 'Door-to-Door Transit Friendly'],
    nextStepInsight: {
      explanation: {
        en: 'Addresses social isolation among Spanish-speaking Latino elders in San Mateo County through dignity, cultural preservation, music, and peer storytelling.',
        es: 'Combate el aislamiento social en adultos mayores hispanohablantes a través de la cultura, la música, el respeto y la convivencia entre amigos.'
      },
      confidenceRating: 98,
      sourceOrganization: {
        en: 'San Mateo County Cultural Equity Benchmarks',
        es: 'Evaluaciones de Equidad Cultural del Condado de San Mateo'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Certified Nonprofit Community Hub Directory',
        es: 'Directorio de Centros Comunitarios sin Fines de Lucro'
      },
      documentsNeeded: [
        { en: 'None required (just your name and emergency family contact number for safety)', es: 'Ninguno requerido (solo su nombre y un número de emergencia familiar por seguridad)' }
      ],
      actionItems: [
        {
          id: 'comm-act-1',
          title: { en: 'Call or have a family member call coordinator Carmen', es: 'Llamar o pedir a un familiar que llame a la coordinadora Carmen' },
          description: { en: 'She will welcome you in Spanish and explain the Tuesday schedule.', es: 'Ella le responderá con gusto en español y le explicará el programa de los martes.' },
          estimatedMinutes: 5
        },
        {
          id: 'comm-act-2',
          title: { en: 'Request SamTrans Redi-Wheels door-to-door transit enrollment', es: 'Solicitar registro para transporte puerta a puerta Redi-Wheels de SamTrans' },
          description: { en: 'Staff will help fill out the 1-page form so a van picks you up directly at your home.', es: 'El equipo le ayudará a llenar la hoja sencilla para que una camioneta pase por usted a su domicilio.' },
          estimatedMinutes: 15
        },
        {
          id: 'comm-act-3',
          title: { en: 'Attend your first Tuesday morning coffee & crafts gathering', es: 'Asistir a su primer convivio de café y manualidades del martes' },
          description: { en: 'Arrive at 10:00 AM; free welcome apron and paints provided.', es: 'Llegue a las 10:00 AM; le obsequiarán un mandil de bienvenida y materiales.' },
          estimatedMinutes: 60
        }
      ],
      commonMisconceptions: {
        en: 'You do not need to be an artist or dancer to attend; sitting, listening to music, and drinking coffee is 100% welcomed.',
        es: 'No necesita saber pintar ni bailar para asistir; sentarse a escuchar la música y convivir con café es completamente bienvenido.'
      },
      accessibilityNotes: {
        en: 'Zero-step entrance ramps, wide doorways for walkers, and designated quiet relaxation alcoves.',
        es: 'Rampas sin escalones, puertas amplias para andaderas y sillones cómodos para descansar.'
      }
    },
    contactSimulated: {
      phone: '(650) 555-CASA (Simulated)',
      intakeMethod: { en: 'Drop-in or phone call in Spanish', es: 'Llegada libre o llamada en español' },
      websiteDomainSimulated: 'casacirculo-prototype.local'
    }
  },
  {
    id: 'res-comm-2',
    categoryId: 'community',
    title: {
      en: 'Mountain View Teen Center & First-Gen Youth Empowerment Hub',
      es: 'Centro Juvenil de Mountain View y Espacio de Empoderamiento Estudiantil'
    },
    organization: {
      en: 'City of Mountain View Community Services (Demonstration)',
      es: 'Servicios Comunitarios de la Ciudad de Mountain View (Demostración)'
    },
    description: {
      en: 'A state-of-the-art after-school community hub for middle and high school students featuring homework tutoring, free snacks, high-speed Wi-Fi, college essay workshops, and recreational esports.',
      es: 'Un centro comunitario de vanguardia para estudiantes de secundaria y preparatoria con asesoría de tareas, refrigerios gratis, internet rápido, talleres universitarios y recreación.'
    },
    location: {
      city: 'Mountain View',
      county: 'Santa Clara County',
      transitNote: {
        en: 'Next to Mountain View High School; 5-minute walk from El Camino Real & Castro St VTA stops',
        es: 'Junto a Mountain View High School; a 5 minutos a pie de paradas de autobús en El Camino y Castro'
      },
      addressSimulated: '263 Escuela Ave, Mountain View, CA 94040 (Simulated)'
    },
    schedule: {
      en: 'Monday – Friday: 2:30 PM – 7:00 PM; Saturdays 12:00 PM – 5:00 PM',
      es: 'Lunes a viernes: 2:30 PM – 7:00 PM; Sábados 12:00 PM – 5:00 PM'
    },
    costType: 'Free',
    languagesSupported: ['English', 'Español'],
    eligibilityHighlight: {
      en: 'Youth in grades 6-12 residing or attending school in Mountain View, Los Altos, or Sunnyvale.',
      es: 'Jóvenes de 6º a 12º grado que vivan o estudien en Mountain View, Los Altos o Sunnyvale.'
    },
    noIdRequired: true,
    confidential: true,
    tags: ['Grades 6-12', 'Free Wi-Fi & Snacks', 'FAFSA & Essay Clinics', 'No Fees'],
    nextStepInsight: {
      explanation: {
        en: 'Provides safe, supervised spaces for adolescents whose working parents are on late shifts, combining homework support with social friendships and first-gen college clinics.',
        es: 'Ofrece un espacio seguro y supervisado para jóvenes cuyos padres trabajan hasta tarde, combinando apoyo escolar con nuevas amistades.'
      },
      confidenceRating: 97,
      sourceOrganization: {
        en: 'Silicon Valley Youth Recreation Alliance',
        es: 'Alianza de Recreación Juvenil de Silicon Valley'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Municipal Youth Services Directory',
        es: 'Directorio Municipal de Servicios para la Juventud'
      },
      documentsNeeded: [
        { en: 'Free student registration card completed by student upon first entry', es: 'Tarjeta de registro gratuita llenada por el estudiante en su primera visita' }
      ],
      actionItems: [
        {
          id: 'comm-act-4',
          title: { en: 'Drop in after school bell (free fruit and snack bar)', es: 'Llegar después del horario escolar (barra libre de fruta y bocadillos)' },
          description: { en: 'Pick up your Teen Center keycard from the front desk.', es: 'Recoja su credencial del centro juvenil en recepción.' },
          estimatedMinutes: 5
        },
        {
          id: 'comm-act-5',
          title: { en: 'Reserve a Saturday 1-on-1 college & financial aid review desk', es: 'Reservar mesa de revisión universitaria los sábados' },
          description: { en: 'College mentors review financial aid line items and scholarship essays.', es: 'Mentores universitarios revisan formularios de ayuda y ensayos de becas.' },
          estimatedMinutes: 30
        }
      ],
      accessibilityNotes: {
        en: 'ADA accessible restrooms, elevator access to computer mezzanine, sensory quiet corner.',
        es: 'Baños accesibles ADA, elevador al área de cómputo y rincón silencioso.'
      }
    },
    contactSimulated: {
      phone: '(650) 555-MVTEEN (Simulated)',
      intakeMethod: { en: 'Drop-in with student card or simple form', es: 'Llegada libre con credencial o formato simple' },
      websiteDomainSimulated: 'mvteencenter-demo.local'
    }
  },
  {
    id: 'res-comm-3',
    categoryId: 'community',
    title: {
      en: 'Fair Oaks Senior Community Social & Nutrition Center',
      es: 'Centro Comunitario de Convivencia y Nutrición para Mayores Fair Oaks'
    },
    organization: {
      en: 'San Mateo County Community Care Hub (Simulated)',
      es: 'Centro de Atención Comunitaria del Condado de San Mateo (Simulado)'
    },
    description: {
      en: 'Multilingual gathering center offering bingo, gentle balance and mobility classes, health screenings, and bilingual digital literacy assistance for smartphones and tablets.',
      es: 'Espacio de convivencia con lotería, clases de equilibrio y movilidad suave, chequeos de salud y asesoría para aprender a usar celulares y tabletas.'
    },
    location: {
      city: 'Redwood City',
      county: 'San Mateo County',
      transitNote: {
        en: 'Direct stop on SamTrans Route 296 and 270; dedicated senior bus passenger bay',
        es: 'Parada directa en SamTrans 296 y 270; bahía para ascenso de adultos mayores'
      },
      addressSimulated: '2600 Middlefield Rd, Redwood City, CA 94063 (Simulated)'
    },
    schedule: {
      en: 'Monday – Friday: 8:30 AM – 3:30 PM; Smartphone workshops Wednesdays 10:00 AM',
      es: 'Lunes a viernes: 8:30 AM – 3:30 PM; Taller de celular los miércoles a las 10:00 AM'
    },
    costType: 'Free',
    languagesSupported: ['Español', 'English'],
    eligibilityHighlight: {
      en: 'Adults 55 and older. No fees, no membership requirements.',
      es: 'Adultos de 55 años en adelante. Sin cuotas ni membresías.'
    },
    noIdRequired: true,
    confidential: true,
    tags: ['Digital Literacy', 'Senior Health Screenings', 'Spanish Speaking', 'Redwood City'],
    nextStepInsight: {
      explanation: {
        en: 'Empowers older residents to master everyday technology (like telehealth video visits and public transit apps) in a patient, Spanish-first environment.',
        es: 'Capacita a los adultos mayores en el uso de tecnología cotidiana (citas médicas por video y apps de transporte) con paciencia y en español.'
      },
      confidenceRating: 95,
      sourceOrganization: {
        en: 'San Mateo County Digital Inclusion Initiative',
        es: 'Iniciativa de Inclusión Digital del Condado de San Mateo'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'County Senior Center Accreditation Record',
        es: 'Registro de Acreditación de Centros para Adultos Mayores'
      },
      documentsNeeded: [
        { en: 'None required', es: 'Ninguno requerido' }
      ],
      actionItems: [
        {
          id: 'comm-act-6',
          title: { en: 'Bring your smartphone or tablet to Wednesday drop-in', es: 'Traer su teléfono celular o tableta el miércoles' },
          description: { en: 'Youth volunteers sit with you 1-on-1 to configure large fonts and voice dictation.', es: 'Jóvenes voluntarios le ayudan 1 a 1 a poner letras grandes y dictado por voz.' },
          estimatedMinutes: 30
        }
      ],
      accessibilityNotes: {
        en: 'Automatic doors, handrails throughout hallways, and large-print signs in English and Spanish.',
        es: 'Puertas automáticas, pasamanos en pasillos y letreros con letra grande en ambos idiomas.'
      }
    },
    contactSimulated: {
      phone: '(650) 555-0172 (Simulated)',
      intakeMethod: { en: 'Walk-in Monday through Friday', es: 'Llegada libre de lunes a viernes' },
      websiteDomainSimulated: 'fairoaksseniors-prototype.local'
    }
  },
  {
    id: 'res-comm-4',
    categoryId: 'community',
    title: {
      en: 'Somos Mayfair Community Leadership & Tenant Rights Clinic',
      es: 'Clínica de Derechos de Inquilinos y Liderazgo Comunitario Somos Mayfair'
    },
    organization: {
      en: 'Somos Mayfair (Simulated Community Registry)',
      es: 'Somos Mayfair (Registro Comunitario Simulado)'
    },
    description: {
      en: 'Grassroots community defense network in East San Jose providing free tenant rights consultations, rent relief navigation, bilingual family leadership circles, and immigration know-your-rights clinics.',
      es: 'Red comunitaria en el Este de San José con asesoría gratuita en derechos de inquilinos, apoyos de renta, círculos familiares bilingües y talleres Conozca Sus Derechos.'
    },
    location: {
      city: 'East San Jose',
      county: 'Santa Clara County',
      transitNote: {
        en: 'Heart of the Mayfair neighborhood; 1 block from Alum Rock Ave VTA stops',
        es: 'En el corazón del barrio Mayfair; a 1 cuadra de las paradas VTA de Alum Rock Ave'
      },
      addressSimulated: '370 S King Rd, San Jose, CA 95116 (Simulated)'
    },
    schedule: {
      en: 'Monday – Thursday: 9:00 AM – 5:30 PM; Tenant clinic Tuesdays 5:30 PM – 7:30 PM',
      es: 'Lunes a jueves: 9:00 AM – 5:30 PM; Clínica de inquilinos martes 5:30 PM – 7:30 PM'
    },
    costType: 'Free',
    languagesSupported: ['Español', 'English'],
    eligibilityHighlight: {
      en: 'Open to all tenants, workers, and families in East San Jose; strictly confidential.',
      es: 'Abierto a todos los inquilinos y familias del Este de San José; confidencialidad estricta.'
    },
    noIdRequired: true,
    confidential: true,
    tags: ['Tenant Rights', 'East San Jose', 'Bilingual Promotores', 'Zero Cost'],
    nextStepInsight: {
      explanation: {
        en: 'Connects tenants with trained community promotores who understand local Santa Clara County rent ordinances and eviction protection laws without charging attorney fees.',
        es: 'Conecta a inquilinos con promotores comunitarios capacitados en leyes locales de protección contra desalojos sin cobrar honorarios.'
      },
      confidenceRating: 97,
      sourceOrganization: {
        en: 'East San Jose Community Resilience Benchmark 2026',
        es: 'Evaluación de Resiliencia Comunitaria del Este de San José 2026'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Community Advocacy Network Benchmark',
        es: 'Red de Apoyo Comunitario Certificada'
      },
      documentsNeeded: [
        { en: 'Rental agreement / lease or rent increase letter (if receiving legal consultation)', es: 'Contrato de arrendamiento o aviso de aumento de renta (para asesoría legal)' }
      ],
      actionItems: [
        {
          id: 'comm-act-7',
          title: { en: 'Sign up for Tuesday evening tenant legal clinic', es: 'Anotarse en la clínica legal de inquilinos de los martes' },
          description: { en: 'Meet with a volunteer housing attorney and bilingual interpreter.', es: 'Consulte con un abogado voluntario de vivienda y un intérprete bilingüe.' },
          estimatedMinutes: 25
        }
      ],
      accessibilityNotes: {
        en: 'Childcare provided on-site during evening clinic sessions so parents can participate freely.',
        es: 'Cuidado infantil gratuito durante las sesiones nocturnas para que los padres asistan con calma.'
      }
    },
    contactSimulated: {
      phone: '(408) 555-MAYS (Simulated)',
      intakeMethod: { en: 'Walk-in or call Spanish hotline', es: 'Llegada libre o llamada a línea en español' },
      websiteDomainSimulated: 'somosmayfair-demo.local'
    }
  }
];
