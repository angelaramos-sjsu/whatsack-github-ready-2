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
      en: 'Second Harvest Food Locator',
      es: 'Localizador de Alimentos de Second Harvest'
    },
    organization: {
      en: 'Second Harvest of Silicon Valley',
      es: 'Second Harvest of Silicon Valley'
    },
    description: {
      en: 'Use the official locator to search for nearby food resources by location. Each site sets its own hours and requirements; confirm details directly before visiting.',
      es: 'Usa el localizador oficial para buscar recursos de alimentos cercanos por ubicación. Cada lugar establece sus propios horarios y requisitos; confirma los detalles directamente antes de ir.'
    },
    location: {
      city: 'Online',
      county: 'Multiple locations',
      transitNote: {
        en: 'Transit information varies by location; check with the individual provider.',
        es: 'La información de transporte varía según el lugar; consulta con cada proveedor.'
      },
      addressSimulated: 'Search by city or ZIP code; no single physical address.'
    },
    schedule: {
      en: 'Hours vary by location. Check the listing and confirm directly with the provider.',
      es: 'Los horarios varían según el lugar. Revisa la lista y confirma directamente con el proveedor.'
    },
    costType: 'Free',
    languagesSupported: ['English', 'Español'],
    eligibilityHighlight: {
      en: 'Requirements vary by location. Contact the provider to confirm.',
      es: 'Los requisitos varían según el lugar. Comunícate con el proveedor para confirmar.'
    },
    tags: ['Food Locator', 'Food Access'],
    nextStepInsight: {
      explanation: {
        en: 'This is a directory, not a specific food distribution site. Use it to find a nearby listing, then confirm current availability, hours, and requirements with that provider.',
        es: 'Este es un directorio, no un lugar específico de distribución de alimentos. Úsalo para encontrar una opción cercana y luego confirma la disponibilidad, los horarios y requisitos actuales con ese proveedor.'
      },
      confidenceRating: 100,
      sourceOrganization: {
        en: 'Second Harvest of Silicon Valley',
        es: 'Second Harvest of Silicon Valley'
      },
      simulatedVerificationDate: 'Directory information only; availability not checked',
      dataSourceLabel: {
        en: 'Official online food locator',
        es: 'Localizador oficial de alimentos en línea'
      },
      documentsNeeded: [
        { en: 'Check the individual listing or contact the provider to confirm any requirements.', es: 'Revisa la lista individual o comunícate con el proveedor para confirmar los requisitos.' }
      ],
      actionItems: [
        {
          id: 'food-act-1',
          title: { en: 'Search using a city or ZIP code', es: 'Busca por ciudad o código postal' },
          description: { en: 'Use the official locator to find nearby listings.', es: 'Usa el localizador oficial para encontrar opciones cercanas.' },
          estimatedMinutes: 5
        },
        {
          id: 'food-act-2',
          title: { en: 'Confirm details before visiting', es: 'Confirma los detalles antes de ir' },
          description: { en: 'Check the listing and ask the provider about current hours, availability, and requirements.', es: 'Revisa la lista y pregunta al proveedor sobre horarios, disponibilidad y requisitos actuales.' },
          estimatedMinutes: 5
        }
      ],
      accessibilityNotes: {
        en: 'Ask the individual provider about accessibility and accommodation options.',
        es: 'Pregunta al proveedor específico sobre accesibilidad y opciones de adaptación.'
      }
    },
    contactSimulated: {
      phone: 'See contact details in the official listing',
      intakeMethod: { en: 'Search the online locator', es: 'Busca en el localizador en línea' },
      websiteDomainSimulated: 'www.shfb.org/get-food'
    }
  },
  {
    id: 'res-food-2',
    categoryId: 'food',
    title: {
      en: 'Second Harvest Mobile Produce Pantry – East San Jose',
      es: 'Mercado Móvil de Vegetales Second Harvest – Este de San José'
    },
    organization: {
      en: 'Second Harvest of Silicon Valley (Demonstration Profile)',
      es: 'Second Harvest of Silicon Valley (Perfil Demostrativo)'
    },
    description: {
      en: 'Pop-up outdoor refrigerated market offering free seasonal fruits, greens, carrots, and whole grains directly at community school parking lots.',
      es: 'Mercado móvil al aire libre que ofrece frutas de temporada, verduras, zanahorias y granos enteros en estacionamientos escolares comunitarios.'
    },
    location: {
      city: 'East San Jose',
      county: 'Santa Clara County',
      transitNote: {
        en: 'Located near Story Rd & King Rd; VTA Lines 23, 73 within 2 minutes walk',
        es: 'Cerca de Story Rd y King Rd; autobuses VTA 23 y 73 a 2 minutos a pie'
      },
      addressSimulated: '1650 Story Rd, San Jose, CA 95122 (Simulated)'
    },
    schedule: {
      en: '1st and 3rd Tuesday of each month: 3:30 PM – 5:30 PM',
      es: '1er y 3er martes de cada mes: 3:30 PM – 5:30 PM'
    },
    costType: 'Free',
    languagesSupported: ['English', 'Español', 'Vietnamese'],
    eligibilityHighlight: {
      en: 'Open to all residents; no residency documentation or income verification required.',
      es: 'Abierto a todos los residentes; no requiere comprobante de domicilio ni ingresos.'
    },
    noIdRequired: true,
    confidential: true,
    tags: ['Fresh Vegetables', 'Drive-Thru / Walk-Up', 'East San Jose', 'Bilingual'],
    nextStepInsight: {
      explanation: {
        en: 'Mobile distribution sites bring healthy farmer-direct crops into neighborhoods with fewer grocery stores and higher transit times.',
        es: 'Los puntos móviles llevan alimentos frescos de cultivo directamente a vecindarios con menos supermercados y mayores distancias.'
      },
      confidenceRating: 96,
      sourceOrganization: {
        en: 'Second Harvest Demonstration Database',
        es: 'Base de Demostración Second Harvest'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Countywide Mobile Distribution Schedule',
        es: 'Horario Condal de Reparto Móvil'
      },
      documentsNeeded: [
        { en: 'None required (name and zip code requested verbally for count metrics)', es: 'Ninguno obligatorio (nombre y código postal verbal para conteo estadístico)' }
      ],
      actionItems: [
        {
          id: 'food-act-4',
          title: { en: 'Choose drive-up or walk-up lane', es: 'Elegir fila para auto o fila peatonal' },
          description: { en: 'Both lanes operate concurrently; walk-up lane typically moves faster.', es: 'Ambas filas avanzan simultáneamente; la fila peatonal suele ser más rápida.' },
          estimatedMinutes: 15
        },
        {
          id: 'food-act-5',
          title: { en: 'Request dietary substitutions if needed', es: 'Solicitar opciones dietéticas especiales' },
          description: { en: 'Diabetic-friendly produce bags and grain-free options available upon request.', es: 'Bolsas para personas con diabetes y opciones sin granos disponibles a solicitud.' },
          estimatedMinutes: 5
        }
      ],
      commonMisconceptions: {
        en: 'You do not need to have a child enrolled at the hosting school to receive produce.',
        es: 'No necesita tener hijos inscritos en la escuela anfitriona para recibir alimentos.'
      },
      accessibilityNotes: {
        en: 'Drive-thru volunteers load boxes straight into trunk for individuals with limited mobility.',
        es: 'Voluntarios colocan las cajas directamente en la cajuela para personas con movilidad reducida.'
      }
    },
    contactSimulated: {
      phone: '(800) 555-FOOD (Simulated)',
      intakeMethod: { en: 'Walk-up or Drive-through on distribution afternoon', es: 'Llegada en auto o a pie por la tarde' },
      websiteDomainSimulated: 'shfb-prototype.local'
    }
  },
  {
    id: 'res-food-3',
    categoryId: 'food',
    title: {
      en: 'San Mateo County — Food Resources',
      es: 'Condado de San Mateo — Recursos de alimentos'
    },
    organization: {
      en: 'San Mateo County Health',
      es: 'Salud del Condado de San Mateo'
    },
    description: {
      en: 'The county lists food resources, including congregate and home-delivered meal options that may be available to adults age 60 and older. Contact the county or local provider to confirm services and requirements.',
      es: 'El condado enumera recursos de alimentos, incluidas opciones de comidas en grupo y a domicilio que podrían estar disponibles para personas de 60 años o más. Comunícate con el condado o proveedor local para confirmar servicios y requisitos.'
    },
    location: {
      city: 'Online',
      county: 'San Mateo County',
      transitNote: {
        en: 'Transit details depend on the specific provider and service.',
        es: 'Los detalles de transporte dependen del proveedor y servicio específico.'
      },
      addressSimulated: 'Online county resource page; services have different locations.'
    },
    schedule: {
      en: 'Meal schedules vary by provider; confirm directly with the county or local program.',
      es: 'Los horarios de comidas varían según el proveedor; confirma directamente con el condado o programa local.'
    },
    costType: 'Free',
    languagesSupported: ['English'],
    eligibilityHighlight: {
      en: 'San Mateo County says adults age 60 and older may qualify for certain meal programs; confirm each program’s requirements.',
      es: 'El Condado de San Mateo indica que personas de 60 años o más podrían calificar para ciertos programas de comidas; confirma los requisitos de cada programa.'
    },
    tags: ['Older adults', 'Food resources', 'County directory'],
    nextStepInsight: {
      explanation: {
        en: 'This county resource page can help identify meal programs. It does not confirm a specific site’s current menu, hours, or availability.',
        es: 'Esta página del condado puede ayudar a encontrar programas de comidas. No confirma el menú, los horarios ni la disponibilidad actual de un lugar específico.'
      },
      confidenceRating: 100,
      sourceOrganization: {
        en: 'San Mateo County',
        es: 'Condado de San Mateo'
      },
      simulatedVerificationDate: 'Directory information only; availability not checked',
      dataSourceLabel: {
        en: 'Official county food-resource page',
        es: 'Página oficial de recursos de alimentos del condado'
      },
      documentsNeeded: [
        { en: 'Check requirements with the specific meal program.', es: 'Consulta los requisitos con el programa de comidas específico.' }
      ],
      actionItems: [
        {
          id: 'food-act-6',
          title: { en: 'Review county meal information', es: 'Revisa la información de comidas del condado' },
          description: { en: 'Use the official page to find a local meal service.', es: 'Usa la página oficial para buscar un servicio local de comidas.' },
          estimatedMinutes: 5
        },
        {
          id: 'food-act-7',
          title: { en: 'Confirm eligibility and current details', es: 'Confirma la elegibilidad y los detalles actuales' },
          description: { en: 'Contact the local provider to ask about schedules, language access, and requirements.', es: 'Comunícate con el proveedor local para preguntar sobre horarios, atención en otros idiomas y requisitos.' },
          estimatedMinutes: 5
        }
      ],
      accessibilityNotes: {
        en: 'Ask the specific provider about accessibility and accommodation options.',
        es: 'Pregunta al proveedor específico sobre accesibilidad y opciones de adaptación.'
      }
    },
    contactSimulated: {
      phone: 'See contact details on the county resource page',
      intakeMethod: { en: 'Use the county directory to contact a provider', es: 'Usa el directorio del condado para comunicarte con un proveedor' },
      websiteDomainSimulated: 'www.smcgov.org/hsa/food-resources'
    }
  },
  {
    id: 'res-food-4',
    categoryId: 'food',
    title: {
      en: 'Veggielution Community Farm Fresh Market & Farm Box',
      es: 'Mercado Comunitario y Cajas de Granja Veggielution'
    },
    organization: {
      en: 'Veggielution Community Farm at Emma Prusch Farm Park',
      es: 'Granja Comunitaria Veggielution en el Parque Emma Prusch'
    },
    description: {
      en: 'Culturally diverse fruits, medicinal herbs, nopales, tomatillos, and greens harvested directly in East San Jose. Offers market match incentives and zero-cost family bags.',
      es: 'Frutas y verduras de diversas culturas, hierbas medicinales, nopales, tomatillos y hortalizas cosechadas en el Este de San José con subsidios y cajas sin costo.'
    },
    location: {
      city: 'East San Jose',
      county: 'Santa Clara County',
      transitNote: {
        en: 'At Emma Prusch Farm Park; VTA Bus Lines 22, 23, and 64B stop directly outside',
        es: 'En el Parque Emma Prusch; autobuses VTA 22, 23 y 64B tienen parada justo enfrente'
      },
      addressSimulated: '647 S King Rd, San Jose, CA 95116 (Simulated)'
    },
    schedule: {
      en: 'Saturdays: 10:00 AM – 2:00 PM',
      es: 'Sábados: 10:00 AM – 2:00 PM'
    },
    costType: 'Free',
    languagesSupported: ['Español', 'English'],
    eligibilityHighlight: {
      en: 'All East San Jose and county neighbors welcome; youth gardening activities included.',
      es: 'Bienvenidos todos los vecinos del Este de San José; incluye actividades infantiles.'
    },
    noIdRequired: true,
    confidential: true,
    tags: ['Fresh Farm Produce', 'East San Jose', 'Youth Activities', 'Nopales & Herbs'],
    nextStepInsight: {
      explanation: {
        en: 'Offers fresh organic food grown right in the urban heart of East San Jose alongside community cooking demonstrations and children’s environmental play.',
        es: 'Ofrece alimentos orgánicos cultivados en el corazón urbano de San José, con talleres de cocina y juegos para niños.'
      },
      confidenceRating: 94,
      sourceOrganization: {
        en: 'Urban Agriculture Initiative Benchmark',
        es: 'Iniciativa de Agricultura Urbana 2026'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Community Partner Network',
        es: 'Red de Organizaciones Comunitarias'
      },
      documentsNeeded: [
        { en: 'None required', es: 'Ninguno requerido' }
      ],
      actionItems: [
        {
          id: 'food-act-8',
          title: { en: 'Visit the Farm Stand Welcome Tent', es: 'Visitar la carpa de bienvenida del huerto' },
          description: { en: 'Ask for the East San Jose Neighbor Produce Box.', es: 'Pregunte por la Caja de Verduras para Vecinos del Este de San José.' },
          estimatedMinutes: 5
        }
      ],
      accessibilityNotes: {
        en: 'Flat compacted dirt paths accessible to standard strollers and wheelchairs.',
        es: 'Senderos planos de tierra compacta transitables con carriolas y sillas de ruedas.'
      }
    },
    contactSimulated: {
      phone: '(408) 555-FARM (Simulated)',
      intakeMethod: { en: 'Walk-in Saturday Market', es: 'Visita libre el sábado al mercado' },
      websiteDomainSimulated: 'veggielution-prototype.local'
    }
  },

  // 2. Mental Health Resources
  {
    id: 'res-mental-1',
    categoryId: 'mental-health',
    title: {
      en: 'Santa Clara County Behavioral Health Services',
      es: 'Servicios de Salud Conductual del Condado de Santa Clara'
    },
    organization: {
      en: 'County of Santa Clara',
      es: 'Condado de Santa Clara'
    },
    description: {
      en: 'Use the county’s official site to review behavioral health information and current service contacts. Specific programs, eligibility, hours, and privacy practices must be confirmed with the provider.',
      es: 'Usa el sitio oficial del condado para consultar información de salud conductual y contactos actuales. Los programas, requisitos, horarios y prácticas de privacidad deben confirmarse con el proveedor.'
    },
    location: {
      city: 'Online',
      county: 'Santa Clara County',
      transitNote: {
        en: 'Contact the specific provider for location and transportation information.',
        es: 'Comunícate con el proveedor específico para obtener información sobre ubicación y transporte.'
      },
      addressSimulated: 'Online county resource page; services have different locations.'
    },
    schedule: {
      en: 'Service hours vary. Confirm current details with the provider.',
      es: 'Los horarios varían. Confirma los detalles actuales con el proveedor.'
    },
    costType: 'Free',
    languagesSupported: ['Check with provider'],
    eligibilityHighlight: {
      en: 'Program eligibility varies; ask the county or provider about the service you need.',
      es: 'Los requisitos varían; pregunta al condado o proveedor sobre el servicio que necesitas.'
    },
    tags: ['County resource', 'Behavioral health'],
    nextStepInsight: {
      explanation: {
        en: 'This county resource can direct you to official behavioral health information. It does not confirm a specific center, appointment, or service.',
        es: 'Este recurso del condado puede dirigirte a información oficial de salud conductual. No confirma un centro, cita o servicio específico.'
      },
      confidenceRating: 100,
      sourceOrganization: {
        en: 'County of Santa Clara',
        es: 'Condado de Santa Clara'
      },
      simulatedVerificationDate: 'Current availability not checked',
      dataSourceLabel: {
        en: 'Official county behavioral health website',
        es: 'Sitio oficial de salud conductual del condado'
      },
      documentsNeeded: [
        { en: 'Ask the provider whether documents are needed.', es: 'Pregunta al proveedor si se necesitan documentos.' }
      ],
      actionItems: [
        {
          id: 'mental-act-1',
          title: { en: 'Review county behavioral health information', es: 'Revisa la información de salud conductual del condado' },
          description: { en: 'Use the official county site to find current contact information.', es: 'Usa el sitio oficial del condado para encontrar información de contacto actual.' },
          estimatedMinutes: 5
        },
        {
          id: 'mental-act-2',
          title: { en: 'Ask the provider about services and privacy', es: 'Pregunta al proveedor sobre servicios y privacidad' },
          description: { en: 'Confirm eligibility, hours, cost, and confidentiality practices directly.', es: 'Confirma directamente los requisitos, horarios, costos y prácticas de confidencialidad.' },
          estimatedMinutes: 5
        }
      ],
      accessibilityNotes: {
        en: 'Ask the provider about accessibility and accommodation options.',
        es: 'Pregunta al proveedor sobre accesibilidad y opciones de adaptación.'
      }
    },
    contactSimulated: {
      phone: 'See current contacts on the county website',
      intakeMethod: { en: 'Use the official county website', es: 'Usa el sitio oficial del condado' },
      websiteDomainSimulated: 'bhsd.sccgov.org'
    }
  },
  {
    id: 'res-mental-2',
    categoryId: 'mental-health',
    title: {
      en: '988 Suicide & Crisis Lifeline',
      es: 'Línea 988 de Prevención del Suicidio y Crisis'
    },
    organization: {
      en: '988 Lifeline',
      es: 'Línea 988'
    },
    description: {
      en: 'Visit the official 988 website to review available call, text, and chat options. Do not assume a particular response time, language, or confidentiality outcome.',
      es: 'Visita el sitio oficial de 988 para consultar opciones disponibles de llamada, mensaje y chat. No des por sentado un tiempo de respuesta, idioma o resultado de confidencialidad específico.'
    },
    location: {
      city: 'Online',
      county: 'United States',
      transitNote: {
        en: 'Contact options are listed on the official website.',
        es: 'Las opciones de contacto aparecen en el sitio oficial.'
      },
      addressSimulated: 'Online resource; no physical location.'
    },
    schedule: {
      en: 'Review the official website for current contact options and availability.',
      es: 'Consulta el sitio oficial para ver las opciones de contacto y disponibilidad actuales.'
    },
    costType: 'Free',
    languagesSupported: ['See official contact options'],
    eligibilityHighlight: {
      en: 'Review the official website for information about who can use each contact option.',
      es: 'Consulta el sitio oficial para obtener información sobre quién puede usar cada opción de contacto.'
    },
    tags: ['988 Lifeline', 'Crisis support', 'Official resource'],
    nextStepInsight: {
      explanation: {
        en: 'The official 988 website provides current contact options. Privacy and response details depend on the service and situation.',
        es: 'El sitio oficial de 988 ofrece opciones de contacto actuales. La privacidad y los detalles de respuesta dependen del servicio y la situación.'
      },
      confidenceRating: 100,
      sourceOrganization: {
        en: '988 Lifeline',
        es: 'Línea 988'
      },
      simulatedVerificationDate: 'Current availability not checked',
      dataSourceLabel: {
        en: 'Official 988 Lifeline website',
        es: 'Sitio oficial de la Línea 988'
      },
      documentsNeeded: [
        { en: 'Review the official contact option for any instructions.', es: 'Revisa la opción oficial de contacto para ver si hay instrucciones.' }
      ],
      actionItems: [
        {
          id: 'mental-act-3',
          title: { en: 'Review official 988 contact options', es: 'Revisa las opciones oficiales de contacto de 988' },
          description: { en: 'Use only the current options shown on the 988 website.', es: 'Usa únicamente las opciones actuales que aparecen en el sitio de 988.' },
          estimatedMinutes: 2
        },
        {
          id: 'mental-act-4',
          title: { en: 'Ask about privacy and response details', es: 'Pregunta sobre privacidad y detalles de respuesta' },
          description: { en: 'Check the service’s information for relevant limits and practices.', es: 'Consulta la información del servicio sobre límites y prácticas aplicables.' },
          estimatedMinutes: 5
        }
      ],
      accessibilityNotes: {
        en: 'Check the official website for accessibility and language information.',
        es: 'Consulta el sitio oficial para obtener información sobre accesibilidad e idiomas.'
      }
    },
    contactSimulated: {
      phone: 'Use current options on 988lifeline.org',
      intakeMethod: { en: 'See the official website', es: 'Consulta el sitio oficial' },
      websiteDomainSimulated: '988lifeline.org'
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
      en: 'NOVAworks — Career and Training Information',
      es: 'NOVAworks — Información de empleo y capacitación'
    },
    organization: {
      en: 'NOVAworks',
      es: 'NOVAworks'
    },
    description: {
      en: 'Use NOVAworks’ official website to ask about current career services, technology training, and whether funding may be available. Program offerings and eligibility can change; confirm details directly.',
      es: 'Usa el sitio oficial de NOVAworks para preguntar sobre servicios de carrera, capacitación tecnológica y si podría haber fondos disponibles. Los programas y requisitos pueden cambiar; confirma los detalles directamente.'
    },
    location: {
      city: 'Online',
      county: 'Service area varies',
      transitNote: {
        en: 'Confirm current locations and transit options with NOVAworks.',
        es: 'Confirma con NOVAworks las ubicaciones y opciones de transporte actuales.'
      },
      addressSimulated: 'No single address; confirm the appropriate location with NOVAworks.'
    },
    schedule: {
      en: 'Hours and appointment options vary; confirm current details with NOVAworks.',
      es: 'Los horarios y opciones de citas varían; confirma los detalles actuales con NOVAworks.'
    },
    costType: 'Free',
    languagesSupported: ['Confirm with provider'],
    eligibilityHighlight: {
      en: 'Service and training eligibility vary; ask NOVAworks about your circumstances.',
      es: 'Los requisitos de servicios y capacitación varían; pregunta a NOVAworks sobre tu situación.'
    },
    tags: ['Career services', 'Training information', 'NOVAworks'],
    nextStepInsight: {
      explanation: {
        en: 'This is an official information source, not a guarantee of course availability, funding, eligibility, or outcomes.',
        es: 'Esta es una fuente oficial de información, no una garantía de disponibilidad de cursos, fondos, elegibilidad o resultados.'
      },
      confidenceRating: 100,
      sourceOrganization: {
        en: 'NOVAworks',
        es: 'NOVAworks'
      },
      simulatedVerificationDate: 'Current offerings not checked',
      dataSourceLabel: {
        en: 'Official NOVAworks website',
        es: 'Sitio oficial de NOVAworks'
      },
      documentsNeeded: [
        { en: 'Ask NOVAworks what, if any, documents are needed for the service you are seeking.', es: 'Pregunta a NOVAworks qué documentos, si acaso, se necesitan para el servicio que buscas.' }
      ],
      actionItems: [
        {
          id: 'work-act-1',
          title: { en: 'Review NOVAworks’ current services', es: 'Revisa los servicios actuales de NOVAworks' },
          description: { en: 'Check the official website for current career and training information.', es: 'Consulta el sitio oficial para obtener información actual de empleo y capacitación.' },
          estimatedMinutes: 5
        },
        {
          id: 'work-act-2',
          title: { en: 'Ask about training options and funding', es: 'Pregunta sobre capacitación y fondos' },
          description: { en: 'Confirm programs, eligibility, schedules, and funding with NOVAworks.', es: 'Confirma programas, requisitos, horarios y fondos con NOVAworks.' },
          estimatedMinutes: 5
        },
        {
          id: 'work-act-3',
          title: { en: 'Check with EDD if receiving unemployment benefits', es: 'Consulta con el EDD si recibes beneficios de desempleo' },
          description: { en: 'Ask whether California Training Benefits applies to your claim; do not assume approval.', es: 'Pregunta si California Training Benefits aplica a tu reclamo; no des por sentada la aprobación.' },
          estimatedMinutes: 5
        }
      ],
      accessibilityNotes: {
        en: 'Ask NOVAworks about accessibility and accommodation options.',
        es: 'Pregunta a NOVAworks sobre accesibilidad y opciones de adaptación.'
      }
    },
    contactSimulated: {
      phone: 'See current contact information on the official website',
      intakeMethod: { en: 'Use the official NOVAworks website', es: 'Usa el sitio oficial de NOVAworks' },
      websiteDomainSimulated: 'www.novaworks.org'
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
      en: 'California Student Aid and College Promise Information',
      es: 'Información de Ayuda Estudiantil y College Promise de California'
    },
    organization: {
      en: 'California Student Aid Commission',
      es: 'Comisión de Ayuda Estudiantil de California'
    },
    description: {
      en: 'Use official state and campus pages to review financial aid applications and College Promise programs. Requirements and covered costs differ by program, college, and entry year; confirm current details with the school.',
      es: 'Usa páginas oficiales del estado y del campus para revisar solicitudes de ayuda financiera y programas College Promise. Los requisitos y gastos cubiertos varían según el programa, colegio y año de ingreso; confirma los detalles actuales con la institución.'
    },
    location: {
      city: 'Online',
      county: 'California',
      transitNote: {
        en: 'For campus visits, confirm transportation details with the specific college.',
        es: 'Para visitar un campus, confirma los detalles de transporte con el colegio específico.'
      },
      addressSimulated: 'Online information; each college has its own locations.'
    },
    schedule: {
      en: 'Online information; office hours and appointments vary by campus.',
      es: 'Información en línea; los horarios y citas varían según el campus.'
    },
    costType: 'Free',
    languagesSupported: ['Check with each program'],
    eligibilityHighlight: {
      en: 'Eligibility varies by aid and campus program; verify with official sources.',
      es: 'La elegibilidad varía según la ayuda y el programa del campus; verifica con fuentes oficiales.'
    },
    tags: ['Financial aid', 'College Promise', 'Official information'],
    nextStepInsight: {
      explanation: {
        en: 'Official application and campus program information can help you compare options. This resource does not guarantee aid, admission, or a transfer outcome.',
        es: 'La información oficial de solicitudes y programas del campus puede ayudarte a comparar opciones. Este recurso no garantiza ayuda, admisión ni resultados de transferencia.'
      },
      confidenceRating: 100,
      sourceOrganization: {
        en: 'California Student Aid Commission',
        es: 'Comisión de Ayuda Estudiantil de California'
      },
      simulatedVerificationDate: 'Current program rules not checked',
      dataSourceLabel: {
        en: 'Official student aid and campus program websites',
        es: 'Sitios oficiales de ayuda estudiantil y programas del campus'
      },
      documentsNeeded: [
        { en: 'Ask the school or aid program which documents, if any, are required.', es: 'Pregunta a la institución o programa qué documentos se requieren, si acaso.' }
      ],
      actionItems: [
        {
          id: 'work-act-5',
          title: { en: 'Review the official aid application guidance', es: 'Revisa la guía oficial de solicitudes de ayuda' },
          description: { en: 'Compare FAFSA, CADAA, and campus options using official sources.', es: 'Compara FAFSA, CADAA y opciones del campus con fuentes oficiales.' },
          estimatedMinutes: 10
        },
        {
          id: 'work-act-6',
          title: { en: 'Check the Promise program at your college', es: 'Consulta el programa Promise de tu colegio' },
          description: { en: 'Requirements and covered costs vary; confirm the current rules for your campus and cohort.', es: 'Los requisitos y gastos cubiertos varían; confirma las reglas actuales de tu campus y cohorte.' },
          estimatedMinutes: 10
        },
        {
          id: 'work-act-7',
          title: { en: 'Ask a financial aid office about your circumstances', es: 'Pregunta en ayuda financiera sobre tu situación' },
          description: { en: 'Ask which application and programs apply to your campus and situation.', es: 'Pregunta qué solicitud y programas corresponden a tu campus y situación.' },
          estimatedMinutes: 10
        }
      ],
      accessibilityNotes: {
        en: 'Ask the specific school about accessible services and accommodations.',
        es: 'Pregunta en la institución específica sobre servicios y adaptaciones accesibles.'
      }
    },
    contactSimulated: {
      phone: 'See current contact information on the official website',
      intakeMethod: { en: 'Use official aid and campus program pages', es: 'Usa páginas oficiales de ayuda y programas del campus' },
      websiteDomainSimulated: 'www.csac.ca.gov'
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
    categoryId: 'food',
    title: {
      en: 'San Mateo County — Food Resources',
      es: 'Condado de San Mateo — Recursos de alimentos'
    },
    organization: {
      en: 'San Mateo County Health',
      es: 'Salud del Condado de San Mateo'
    },
    description: {
      en: 'The county lists food resources, including congregate and home-delivered meal options that may be available to adults age 60 and older. Contact the county or local provider to confirm services and requirements.',
      es: 'El condado enumera recursos de alimentos, incluidas opciones de comidas en grupo y a domicilio que podrían estar disponibles para personas de 60 años o más. Comunícate con el condado o proveedor local para confirmar servicios y requisitos.'
    },
    location: {
      city: 'Online',
      county: 'San Mateo County',
      transitNote: {
        en: 'Transit details depend on the specific provider and service.',
        es: 'Los detalles de transporte dependen del proveedor y servicio específico.'
      },
      addressSimulated: 'Online county resource page; services have different locations.'
    },
    schedule: {
      en: 'Meal schedules vary by provider; confirm directly with the county or local program.',
      es: 'Los horarios de comidas varían según el proveedor; confirma directamente con el condado o programa local.'
    },
    costType: 'Free',
    languagesSupported: ['English'],
    eligibilityHighlight: {
      en: 'San Mateo County says adults age 60 and older may qualify for certain meal programs; confirm each program’s requirements.',
      es: 'El Condado de San Mateo indica que personas de 60 años o más podrían calificar para ciertos programas de comidas; confirma los requisitos de cada programa.'
    },
    tags: ['Older adults', 'Food resources', 'County directory'],
    nextStepInsight: {
      explanation: {
        en: 'This county resource page can help identify meal programs. It does not confirm a specific site’s current menu, hours, or availability.',
        es: 'Esta página del condado puede ayudar a encontrar programas de comidas. No confirma el menú, los horarios ni la disponibilidad actual de un lugar específico.'
      },
      confidenceRating: 100,
      sourceOrganization: {
        en: 'San Mateo County',
        es: 'Condado de San Mateo'
      },
      simulatedVerificationDate: 'Directory information only; availability not checked',
      dataSourceLabel: {
        en: 'Official county food-resource page',
        es: 'Página oficial de recursos de alimentos del condado'
      },
      documentsNeeded: [
        { en: 'Check requirements with the specific meal program.', es: 'Consulta los requisitos con el programa de comidas específico.' }
      ],
      actionItems: [
        {
          id: 'comm-act-1',
          title: { en: 'Review county meal information', es: 'Revisa la información de comidas del condado' },
          description: { en: 'Use the official page to find a local meal service.', es: 'Usa la página oficial para buscar un servicio local de comidas.' },
          estimatedMinutes: 5
        },
        {
          id: 'comm-act-2',
          title: { en: 'Confirm eligibility and current details', es: 'Confirma la elegibilidad y los detalles actuales' },
          description: { en: 'Contact the local provider to ask about schedules, language access, and requirements.', es: 'Comunícate con el proveedor local para preguntar sobre horarios, atención en otros idiomas y requisitos.' },
          estimatedMinutes: 5
        },
        {
          id: 'comm-act-3',
          title: { en: 'Ask about language and accessibility support', es: 'Pregunta sobre apoyo de idioma y accesibilidad' },
          description: { en: 'Ask the county or provider what options are currently available.', es: 'Pregunta al condado o proveedor qué opciones hay actualmente.' },
          estimatedMinutes: 5
        }
      ],
      accessibilityNotes: {
        en: 'Ask the specific provider about accessibility and accommodation options.',
        es: 'Pregunta al proveedor específico sobre accesibilidad y opciones de adaptación.'
      }
    },
    contactSimulated: {
      phone: 'See contact details on the county resource page',
      intakeMethod: { en: 'Use the county directory to contact a provider', es: 'Usa el directorio del condado para comunicarte con un proveedor' },
      websiteDomainSimulated: 'www.smcgov.org/hsa/food-resources'
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
