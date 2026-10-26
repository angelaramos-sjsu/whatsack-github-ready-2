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
    count: 6
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
      en: 'Sacred Heart Saturday Community Food Pantry',
      es: 'Despensa Comunitaria de Sábados en Sacred Heart'
    },
    organization: {
      en: 'Sacred Heart Community Service (Simulated Index)',
      es: 'Sacred Heart Community Service (Índice Simulado)'
    },
    description: {
      en: 'Walk-in grocery distribution providing fresh vegetables, fruit, dairy, and pantry staples. No proof of legal status or social security number required.',
      es: 'Distribución de despensa sin cita con verduras frescas, frutas, lácteos y alimentos básicos. No requiere prueba de estatus legal ni Seguro Social.'
    },
    location: {
      city: 'San Jose',
      county: 'Santa Clara County',
      transitNote: {
        en: 'Accessible via VTA Bus Route 22 and 68; 3 blocks from Virginia light rail station',
        es: 'Accesible por autobús VTA Líneas 22 y 68; a 3 cuadras del tren ligero estación Virginia'
      },
      addressSimulated: '550 S 1st St, San Jose, CA 95113 (Simulated Academic Reference)'
    },
    schedule: {
      en: 'Every Saturday: 9:00 AM – 1:00 PM; Wednesdays 1:00 PM – 4:00 PM',
      es: 'Todos los sábados: 9:00 AM – 1:00 PM; Miércoles 1:00 PM – 4:00 PM'
    },
    costType: 'Free',
    languagesSupported: ['English', 'Español', 'Tiếng Việt'],
    eligibilityHighlight: {
      en: 'Self-declared residence in Santa Clara County. No tax returns or immigration checks.',
      es: 'Autodeclaración de residencia en Santa Clara. Sin revisión de impuestos ni migración.'
    },
    noIdRequired: true,
    confidential: true,
    tags: ['Fresh Produce', 'Weekend Hours', 'Spanish Staff', 'Walk-in'],
    nextStepInsight: {
      explanation: {
        en: 'This program was created specifically to eliminate barriers for shift workers and immigrant families who cannot visit food banks during standard 9-5 weekday hours.',
        es: 'Este programa fue diseñado para eliminar barreras en trabajadores con turnos rotativos y familias que no pueden acudir en horarios de oficina entre semana.'
      },
      confidenceRating: 98,
      sourceOrganization: {
        en: 'Silicon Valley Food Coalition Benchmark 2026',
        es: 'Alianza de Alimentos de Silicon Valley 2026'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Verified via Community Service Catalog Demonstration',
        es: 'Verificado mediante Catálogo de Demostración de Servicios'
      },
      documentsNeeded: [
        { en: 'No state identification required (self-attestation accepted)', es: 'No requiere ID estatal (se acepta autodeclaración verbal)' },
        { en: 'Bring 2-3 sturdy reusable shopping bags or a wheeled cart', es: 'Llevar 2-3 bolsas reutilizables resistentes o carrito de compras' }
      ],
      actionItems: [
        {
          id: 'food-act-1',
          title: { en: 'Arrive 20 minutes prior to open', es: 'Llegar 20 minutos antes de la apertura' },
          description: { en: 'Line begins forming at 8:40 AM; first-time visitors receive a quick welcoming number.', es: 'La fila inicia a las 8:40 AM; visitantes primerizos reciben número de turno.' },
          estimatedMinutes: 20
        },
        {
          id: 'food-act-2',
          title: { en: 'Provide family size at greeting desk', es: 'Indicar número de integrantes de familia' },
          description: { en: 'Volunteers assemble food boxes scaled to household count (diapers available upon request).', es: 'Los voluntarios arman las cajas según el tamaño del hogar (pañales disponibles previa solicitud).' },
          estimatedMinutes: 5
        },
        {
          id: 'food-act-3',
          title: { en: 'Optional: Inquire about CalFresh navigation', es: 'Opcional: Preguntar por asesoría de CalFresh' },
          description: { en: 'A Spanish-speaking navigator can screen eligible children without impacting parent immigration status.', es: 'Un asesor bilingüe puede evaluar a los hijos ciudadanos sin afectar a los padres.' },
          estimatedMinutes: 10
        }
      ],
      commonMisconceptions: {
        en: 'Using charitable food pantries does NOT count toward federal Public Charge determinations.',
        es: 'Recibir alimentos de despensas benéficas NO cuenta para determinaciones federales de Carga Pública.'
      },
      accessibilityNotes: {
        en: 'Wheelchair ramp at front entrance; priority seating available for pregnant mothers and elders.',
        es: 'Rampa para sillas de ruedas en la entrada principal; asientos prioritarios para embarazadas y adultos mayores.'
      }
    },
    contactSimulated: {
      phone: '(408) 555-0142 (Simulated)',
      intakeMethod: { en: 'Direct Walk-in on Distribution Days', es: 'Llegada directa en días de reparto' },
      websiteDomainSimulated: 'sacredheartcs-prototype.local'
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
      en: 'Peninsula Senior Congregate Lunch & Pantry Bags',
      es: 'Almuerzo Comunitario y Despensa para Adultos Mayores de la Península'
    },
    organization: {
      en: 'Peninsula Senior Alliances (Simulated)',
      es: 'Alianzas para Mayores de la Península (Simulado)'
    },
    description: {
      en: 'Nutritious chef-prepared hot lunches and weekly take-home grocery bags for adults 60+ in a lively, social community setting with Spanish-speaking staff.',
      es: 'Almuerzos calientes preparados y bolsas semanales de despensa para personas de 60+ años en un ambiente comunitario alegre con personal en español.'
    },
    location: {
      city: 'Redwood City',
      county: 'San Mateo County',
      transitNote: {
        en: 'Steps from Redwood City Transit Center (Caltrain & SamTrans ECR Route)',
        es: 'A pasos del Centro de Tránsito de Redwood City (Caltrain y SamTrans ECR)'
      },
      addressSimulated: '711 Middlefield Rd, Redwood City, CA 94063 (Simulated)'
    },
    schedule: {
      en: 'Monday through Friday: Lunch served at 11:45 AM; Pantry bags Thursdays at 1:00 PM',
      es: 'Lunes a viernes: Almuerzo servido a las 11:45 AM; Despensa los jueves a la 1:00 PM'
    },
    costType: 'Free',
    languagesSupported: ['Español', 'English'],
    eligibilityHighlight: {
      en: 'Adults aged 60 and older; voluntary contribution suggested but never required.',
      es: 'Personas de 60 años en adelante; cooperación voluntaria sugerida pero no obligatoria.'
    },
    noIdRequired: false,
    confidential: true,
    tags: ['Seniors 60+', 'Hot Lunch', 'Spanish Socializing', 'Transit Accessible'],
    nextStepInsight: {
      explanation: {
        en: 'Combines hot nutritional meals with social combat against isolation for elders across San Mateo and northern Santa Clara counties.',
        es: 'Combina nutrición balanceada caliente con convivencia comunitaria contra la soledad en personas mayores.'
      },
      confidenceRating: 95,
      sourceOrganization: {
        en: 'San Mateo County Aging & Adult Services Directory',
        es: 'Directorio de Servicios para Adultos Mayores del Condado de San Mateo'
      },
      simulatedVerificationDate: 'October 2026',
      dataSourceLabel: {
        en: 'Older Americans Act Title III Nutrition Program',
        es: 'Programa de Nutrición Título III Ley de Adultos Mayores'
      },
      documentsNeeded: [
        { en: 'Simple intake sheet with birth year (photo ID helpful but not strictly barred)', es: 'Hoja de registro con fecha de nacimiento (identificación con foto sugerida)' }
      ],
      actionItems: [
        {
          id: 'food-act-6',
          title: { en: 'Call or drop in for day-of meal ticket', es: 'Llamar o presentarse para boleto del día' },
          description: { en: 'Arrive by 11:15 AM to register at the Spanish welcome table.', es: 'Llegar a las 11:15 AM para registrarse en la mesa de bienvenida en español.' },
          estimatedMinutes: 10
        },
        {
          id: 'food-act-7',
          title: { en: 'Sign up for Thursday pantry box', es: 'Inscribirse para la caja de despensa del jueves' },
          description: { en: 'Receive shelf-stable beans, brown rice, low-sodium soups, and fresh fruit.', es: 'Recibe frijoles, arroz integral, sopas bajas en sodio y fruta fresca para llevar.' },
          estimatedMinutes: 5
        }
      ],
      commonMisconceptions: {
        en: 'No resident is ever turned away if they cannot afford the voluntary $3 suggested donation.',
        es: 'A ninguna persona se le niega el alimento si no puede aportar la donación sugerida de $3.'
      },
      accessibilityNotes: {
        en: 'Full wheelchair accessibility, ADA compliant restrooms, and Redi-Wheels drop-off slipway.',
        es: 'Accesibilidad total para sillas de ruedas, baños ADA y rampa de llegada para Redi-Wheels.'
      }
    },
    contactSimulated: {
      phone: '(650) 555-0188 (Simulated)',
      intakeMethod: { en: 'Drop-in before 11:30 AM or phone reservation', es: 'Llegada antes de las 11:30 AM o reserva telefónica' },
      websiteDomainSimulated: 'peninsulaseniors-demo.local'
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
    officialUrl: 'https://novaworks.org/career-seekers/training/',
    title: { en: 'NOVAworks Career Advising & Training Scholarship Process', es: 'NOVAworks: orientación profesional y proceso de becas para capacitación' },
    organization: { en: 'NOVAworks Workforce Development', es: 'NOVAworks: desarrollo de la fuerza laboral' },
    description: {
      en: 'Free career advice and workshops for eligible job seekers in NOVAworks service areas. A limited number of training scholarships may be available depending on eligibility, program approval, and available funding. There is no universal $8,000 voucher or automatic tuition guarantee.',
      es: 'Asesoría y talleres profesionales gratuitos. Algunas becas limitadas de capacitación pueden estar disponibles según requisitos, aprobación del programa y fondos; no se garantiza un monto fijo ni el pago de todos los costos.'
    },
    location: {
      city: 'Sunnyvale',
      county: 'Santa Clara County',
      transitNote: { en: 'Check NOVAworks for current accessibility, transportation and remote workshop arrangements.', es: 'Consulte con NOVAworks opciones de transporte, accesibilidad y talleres virtuales.' },
      addressSimulated: '456 West Olive Avenue, Sunnyvale, CA (official office address; confirm before visiting)'
    },
    schedule: { en: 'Office hours and orientation dates: check the official NOVAworks schedule.', es: 'Consulte horarios de atención y orientación en el sitio oficial de NOVAworks.' },
    costType: 'Subsidized',
    languagesSupported: ['English (ask about additional language assistance)'],
    eligibilityHighlight: {
      en: 'Service-area and scholarship eligibility are determined by NOVAworks. Training funds are limited and not automatic.',
      es: 'NOVAworks determina la elegibilidad y los fondos para capacitación son limitados.'
    },
    noIdRequired: false,
    confidential: false,
    tags: ['NOVAworks', 'Workforce training', 'WIOA', 'Career guidance', 'Training scholarships', 'Limited funding', 'Sunnyvale'],
    nextStepInsight: {
      explanation: {
        en: 'Start with free career advising, a skills assessment, and discussion of available approved training. A counselor must review funding options and fit; training benefits are not guaranteed.',
        es: 'Comience con asesoría gratuita, evaluación de habilidades y revisión de capacitación aprobada. Un asesor debe confirmar fondos y requisitos.'
      },
      confidenceRating: 0,
      sourceOrganization: { en: 'NOVAworks official Career Seekers and Training pages', es: 'Sitios oficiales de NOVAworks de servicios de carrera y capacitación' },
      simulatedVerificationDate: 'Source reviewed October 2026; scholarship funding can change',
      dataSourceLabel: { en: 'https://novaworks.org/career-seekers/training/', es: 'https://novaworks.org/career-seekers/training/' },
      documentsNeeded: [
        { en: 'Ask what proof of employment history, address, and eligibility is required.', es: 'Consulte qué pruebas de experiencia laboral y elegibilidad se requieren.' },
        { en: 'Prepare a summary of your previous work, skills, and training goals.', es: 'Prepare un resumen de su experiencia, habilidades y metas.' }
      ],
      actionItems: [
        {
          id: 'work-ask-adviser',
          title: { en: 'Register for NOVAworks career guidance', es: 'Inscribirse para recibir orientación laboral de NOVAworks' },
          description: { en: 'Ask about the initial career advising and training scholarship process.', es: 'Consulte la asesoría inicial y el proceso de becas para capacitación.' }
        },
        {
          id: 'work-check-etpl',
          title: { en: 'Explore the California Eligible Training Provider List', es: 'Explorar la lista de proveedores de capacitación elegibles' },
          description: { en: 'An ETPL listing alone does not guarantee funding. Confirm providers with the NOVAworks training adviser.', es: 'Aparecer en la lista no garantiza fondos; confirme con un asesor.' }
        },
        {
          id: 'work-check-edd',
          title: { en: 'Ask EDD about California Training Benefits if receiving unemployment', es: 'Consultar con EDD sobre beneficios de capacitación si recibe desempleo' },
          description: { en: 'CTB is about UI eligibility during training; it does not pay tuition or automatically waive reporting requirements.', es: 'CTB se refiere a la elegibilidad de beneficios durante capacitación; no paga matrícula.' }
        }
      ],
      commonMisconceptions: {
        en: 'Career advising may be free, but training scholarships and CTB approval are not automatic. California EDD does not pay tuition through CTB.',
        es: 'La orientación laboral puede ser gratuita, pero las becas y CTB no son automáticos; CTB no cubre matrícula.'
      },
      accessibilityNotes: {
        en: 'Contact NOVAworks for current accessibility and accommodation options.',
        es: 'Póngase en contacto con NOVAworks para consultar adaptaciones de accesibilidad.'
      }
    },
    contactSimulated: {
      phone: '408-730-7232 (official NOVAworks number; confirm current)',
      intakeMethod: { en: 'Register and contact an adviser through NOVAworks career-seeker pages.', es: 'Inscríbase y consulte con asesores a través de NOVAworks.' },
      websiteDomainSimulated: 'https://novaworks.org/career-seekers/training/'
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


  // Source-linked employer training examples. Current cohorts/eligibility/benefits are NOT verified.
  {
    id: 'res-work-mdp',
    categoryId: 'workforce',
    officialUrl: 'https://www.tesla.com/careers/manufacturing-development-program',
    title: { en: 'Tesla Manufacturing Development Program (MDP) — Ohlone pathway', es: 'Programa de Desarrollo de Manufactura de Tesla (MDP) — Ohlone' },
    organization: { en: 'Tesla / Ohlone College', es: 'Tesla / Ohlone College' },
    description: {
      en: 'Employer-connected advanced-manufacturing training. Tesla describes a pathway for successful graduates to transition into a full-time Production Associate role. Ohlone has described full-time job offers in its program cohorts. This is not a guaranteed offer for every applicant, and mid-career eligibility must be confirmed.',
      es: 'Capacitación de manufactura avanzada con conexión a Tesla. El programa describe una posible transición a un puesto de Asociado de Producción de tiempo completo tras completarlo con éxito. La oferta de empleo y la elegibilidad para adultos deben confirmarse directamente.'
    },
    location: {
      city: 'Fremont',
      county: 'Alameda County',
      transitNote: { en: 'Check program website for current campus, factory and transportation requirements.', es: 'Consulte el sitio oficial para confirmar instalaciones, ubicación y transporte.' },
      addressSimulated: 'Exact training location varies by cohort; check official program details.'
    },
    schedule: { en: 'Cohort dates, hours and application status: confirm with Tesla/Ohlone.', es: 'Fechas, horario y estado de solicitudes: confirme con Tesla/Ohlone.' },
    costType: 'Subsidized',
    languagesSupported: ['English (verify additional language support)'],
    eligibilityHighlight: {
      en: 'Tesla describes the target audience as graduating high-school seniors and early-career individuals. Daniel, 45, must confirm current mid-career eligibility.',
      es: 'Tesla describe un público de graduados de preparatoria y personas al inicio de su carrera. Daniel, de 45 años, debe confirmar los requisitos actuales.'
    },
    noIdRequired: false,
    confidential: false,
    tags: ['Tesla MDP', 'Manufacturing', 'Ohlone', 'Employer-connected training', 'Full-time Production Associate opportunity', 'Eligibility check required'],
    nextStepInsight: {
      explanation: {
        en: 'Potential Tesla employment pathway after successful completion. Verify that the current program admits experienced adult applicants and learn the exact employment-offer conditions before applying.',
        es: 'Posible trayectoria de empleo en Tesla al completar el programa. Verifique si admite a personas adultas con experiencia y las condiciones de contratación.'
      },
      confidenceRating: 0,
      sourceOrganization: { en: 'Tesla official Manufacturing Development Program', es: 'Sitio oficial del programa MDP de Tesla' },
      simulatedVerificationDate: 'Source reviewed October 2026; current cohort unverified',
      dataSourceLabel: { en: 'https://www.tesla.com/careers/manufacturing-development-program', es: 'https://www.tesla.com/careers/manufacturing-development-program' },
      documentsNeeded: [
        { en: 'Check the current application instructions for required information.', es: 'Consulte la solicitud actual para conocer los documentos necesarios.' },
        { en: 'Prepare questions about experience, age-related cohort criteria and prior manufacturing skills.', es: 'Prepare preguntas sobre experiencia y requisitos de admisión.' }
      ],
      actionItems: [
        {
          id: 'mdp-check-eligibility',
          title: { en: 'Ask whether mid-career adults are eligible for the current MDP cohort', es: 'Confirmar elegibilidad de personas adultas para MDP' },
          description: { en: 'Daniel is 45; do not assume that historical cohorts or broad marketing language guarantee access.', es: 'Daniel tiene 45 años; no se debe suponer su elegibilidad.' }
        },
        {
          id: 'mdp-check-offer',
          title: { en: 'Confirm the conditions of a full-time Production Associate job offer', es: 'Confirmar las condiciones de una oferta de empleo de tiempo completo' },
          description: { en: 'Ask what successful completion means and what employment transition or offer is currently provided.', es: 'Pregunte qué se considera completar el programa y cuáles son las condiciones de empleo.' }
        },
        {
          id: 'mdp-schedule',
          title: { en: 'Check current cohort dates, costs and time commitments', es: 'Confirmar fechas, costos y horarios de la cohorte' },
          description: { en: 'Verify training location and schedule before planning around household obligations.', es: 'Verifique lugar y horario antes de organizar sus responsabilidades familiares.' }
        }
      ],
      commonMisconceptions: {
        en: 'A program employment pathway does not mean every visitor or applicant is guaranteed enrollment or a job offer.',
        es: 'Una trayectoria laboral no garantiza la admisión ni una oferta de empleo para todos.'
      },
      accessibilityNotes: {
        en: 'Ask Tesla/Ohlone about current accessibility arrangements and accommodation procedures.',
        es: 'Consulte con Tesla/Ohlone sobre accesibilidad y adaptaciones.'
      }
    },
    contactSimulated: {
      phone: 'Not provided — use official program page',
      intakeMethod: { en: 'Use the official Tesla/Ohlone program pages; current application requirements vary.', es: 'Use los sitios oficiales de Tesla/Ohlone; los requisitos pueden variar.' },
      websiteDomainSimulated: 'https://www.tesla.com/careers/manufacturing-development-program'
    }
  },
  {
    id: 'res-work-ssba',
    categoryId: 'workforce',
    officialUrl: 'https://www.ohlone.edu/ssba',
    title: { en: 'Semiconductor Skills Bridge Academy (SSBA) — Ohlone College', es: 'Academia Puente de Habilidades de Semiconductores (SSBA) — Ohlone' },
    organization: { en: 'Ohlone College / Semiconductor Skills Bridge Academy', es: 'Ohlone College / Academia Puente de Semiconductores' },
    description: {
      en: 'Short-term semiconductor and smart-manufacturing skills training with hands-on and job-readiness activities. Documented cohorts advertised a $1,500 stipend after successful completion. Confirm whether that stipend is available for the next cohort. Employment is not guaranteed.',
      es: 'Capacitación en manufactura inteligente y semiconductores con preparación laboral. Algunas cohortes anunciaron un estipendio de $1,500 al completar el programa. Verifique la disponibilidad para la siguiente cohorte. No se garantiza empleo.'
    },
    location: {
      city: 'Fremont',
      county: 'Alameda County',
      transitNote: { en: 'Check Ohlone for current classroom locations and any hybrid or employer-training arrangements.', es: 'Confirme con Ohlone los salones de clase y posibles actividades híbridas o laborales.' },
      addressSimulated: 'Exact cohort location not confirmed; see official program details.'
    },
    schedule: { en: 'Dates, duration and class times vary by cohort; confirm before applying.', es: 'Fechas, duración y horarios sujetos a cada cohorte; confirme antes de solicitar.' },
    costType: 'Subsidized',
    languagesSupported: ['English (verify additional language support)'],
    eligibilityHighlight: {
      en: 'Current enrollment, applicant requirements and completion stipend availability must be confirmed with Ohlone College.',
      es: 'Se deben confirmar la inscripción, los requisitos y la disponibilidad del estipendio con Ohlone College.'
    },
    noIdRequired: false,
    confidential: false,
    tags: ['SSBA', 'Semiconductor', 'Smart Manufacturing', 'Ohlone', '$1500 completion stipend in prior cohorts', 'Job-readiness training'],
    nextStepInsight: {
      explanation: {
        en: 'SSBA may help Daniel build semiconductor-related skills. A $1,500 completion stipend was advertised for documented cohorts, not guaranteed for every future participant.',
        es: 'SSBA podría ayudar a Daniel a desarrollar habilidades en semiconductores. El estipendio de $1,500 se anunció para cohortes documentadas, pero no está garantizado en otras.'
      },
      confidenceRating: 0,
      sourceOrganization: { en: 'Ohlone College / City of Fremont workforce training references', es: 'Ohlone College / referencias de capacitación de Fremont' },
      simulatedVerificationDate: 'Source reviewed October 2026; current cohort stipend unverified',
      dataSourceLabel: { en: 'https://www.ohlone.edu/ssba', es: 'https://www.ohlone.edu/ssba' },
      documentsNeeded: [
        { en: 'Ask Ohlone what application and eligibility documents are needed.', es: 'Pregunte a Ohlone qué documentos requiere la solicitud.' },
        { en: 'Check whether stipend conditions require attendance or program completion.', es: 'Confirme las condiciones de asistencia y finalización del estipendio.' }
      ],
      actionItems: [
        {
          id: 'ssba-check-stipend',
          title: { en: 'Confirm the $1,500 stipend for the next cohort', es: 'Confirmar el estipendio de $1,500 para la próxima cohorte' },
          description: { en: 'Ask whether it is currently funded, how to qualify, and when it would be paid.', es: 'Pregunte si hay fondos, quién califica y cuándo se paga.' }
        },
        {
          id: 'ssba-check-training',
          title: { en: 'Review curriculum, schedule and entry requirements', es: 'Revisar materias, horario y requisitos de ingreso' },
          description: { en: 'Compare the training against Daniel’s manufacturing background and family schedule.', es: 'Compare el programa con la experiencia manufacturera y horarios familiares de Daniel.' }
        },
        {
          id: 'ssba-workforce-contact',
          title: { en: 'Ask about career advising and employer connections', es: 'Consultar asesoría profesional y contactos con empleadores' },
          description: { en: 'Learn what employment assistance is currently offered without assuming a job guarantee.', es: 'Conozca el apoyo para buscar empleo sin asumir una garantía de contratación.' }
        }
      ],
      commonMisconceptions: {
        en: 'A completion stipend and employer-connected workshops do not mean that SSBA guarantees admission, stipend eligibility, or employment.',
        es: 'Un estipendio y los talleres laborales no garantizan admisión, ayuda económica ni empleo.'
      },
      accessibilityNotes: {
        en: 'Ask Ohlone about available accessibility and language accommodations for this cohort.',
        es: 'Consulte con Ohlone sobre adaptaciones de accesibilidad e idioma.'
      }
    },
    contactSimulated: {
      phone: 'Not provided — use official Ohlone page',
      intakeMethod: { en: 'See Ohlone SSBA site or contact its Career Education office for current cohorts.', es: 'Visite SSBA o consulte con la oficina de Educación Profesional de Ohlone.' },
      websiteDomainSimulated: 'https://www.ohlone.edu/ssba'
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
