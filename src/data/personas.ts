import { Persona } from '../types';

export const fictionalPersonas: Persona[] = [
  {
    id: 'maria-42',
    name: 'Maria Elena',
    age: 42,
    tagline: {
      en: 'Mother of two seeking nutritious family groceries with flexible hours',
      es: 'Madre de dos buscando despensa familiar nutritiva con horarios flexibles'
    },
    location: 'East San Jose, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    categoryFocus: 'food',
    background: {
      en: 'Maria works two part-time hospitality shifts in downtown San Jose. Rising grocery bills have strained her family budget, but she fears asking for government assistance might impact immigration or require complex tax paperwork.',
      es: 'María trabaja dos turnos de medio tiempo en hotelería en el centro de San José. El alza en los alimentos ha apretado el presupuesto familiar, pero teme que pedir ayuda gubernamental afecte su estatus migratorio o requiera papeleo fiscal complejo.'
    },
    primaryGoals: [
      {
        en: 'Access fresh produce and pantry staples on weekends or late afternoons',
        es: 'Acceder a verduras frescas y despensa los fines de semana o tardes'
      },
      {
        en: 'Find neighborhood food distribution sites that do not require government ID or proof of legal status',
        es: 'Encontrar centros de distribución que no pidan identificación gubernamental ni estatus legal'
      },
      {
        en: 'Learn if CalFresh applies to her citizen children without public charge risk',
        es: 'Averiguar si CalFresh aplica para sus hijos nacidos aquí sin riesgo de carga pública'
      }
    ],
    barriers: [
      {
        en: 'Uncertainty regarding immigration rules and public charge',
        es: 'Incertidumbre sobre normas de inmigración y carga pública'
      },
      {
        en: 'Limited weekday hours due to split-shift work schedule',
        es: 'Horarios entre semana limitados debido a turnos partidos de trabajo'
      },
      {
        en: 'Transportation constraint relying primarily on VTA bus lines',
        es: 'Dependencia del transporte público de los autobuses de VTA'
      }
    ],
    sampleQuestions: [
      {
        en: 'Where can I get groceries in East San Jose without showing an ID or SSN?',
        es: '¿Dónde puedo conseguir despensa en el Este de San José sin mostrar identificación ni Seguro Social?'
      },
      {
        en: 'Are there weekend food pantries near the Alum Rock VTA light rail line?',
        es: '¿Hay despensas comunitarias los fines de semana cerca de la línea VTA de Alum Rock?'
      },
      {
        en: 'Can my kids receive food assistance even if I am undocumented?',
        es: '¿Pueden mis hijos recibir apoyo de comida aunque yo no tenga documentos?'
      }
    ],
    recommendedResourceIds: ['res-food-1', 'res-food-2', 'res-food-4'],
    journeySteps: [
      {
        stepNumber: 1,
        title: { en: 'Stigma-Free Inquiry', es: 'Consulta sin Estigma' },
        narrative: {
          en: 'Maria types a voice prompt asking if food pantries report visitors. WhatSack clarifies that charitable community pantries never share data or check legal status.',
          es: 'María pregunta por voz si las despensas reportan a los visitantes. WhatSack aclara que las despensas benéficas no comparten datos ni revisan estatus legal.'
        },
        recommendedResourceId: 'res-food-1',
        keyTakeaway: {
          en: 'Charitable food pantries in Santa Clara County are open to all community members regardless of immigration background.',
          es: 'Las despensas caritativas del Condado de Santa Clara son abiertas a toda la comunidad sin importar su situación migratoria.'
        }
      },
      {
        stepNumber: 2,
        title: { en: 'Schedule & Transit Alignment', es: 'Alineación de Horario y Transporte' },
        narrative: {
          en: 'WhatSack highlights the Saturday Morning Community Pantry at Sacred Heart Community Service, reachable via VTA Route 22 within 15 minutes of her home.',
          es: 'WhatSack destaca la Despensa Comunitaria de los Sábados en Sacred Heart, accesible en autobús VTA Línea 22 a 15 minutos de su casa.'
        },
        recommendedResourceId: 'res-food-1',
        keyTakeaway: {
          en: 'Weekend walk-in hours avoid her weekday work conflict completely.',
          es: 'El horario de sábados evita por completo el conflicto con sus turnos de trabajo.'
        }
      },
      {
        stepNumber: 3,
        title: { en: 'Preparation Checklist', es: 'Lista de Preparación' },
        narrative: {
          en: 'Maria saves the NextStep Insight checklist: bring 2 reusable grocery bags and arrive 20 minutes before 9:00 AM distribution.',
          es: 'María guarda la lista de SiguientePaso: llevar 2 bolsas reutilizables y llegar 20 minutos antes de las 9:00 AM.'
        },
        recommendedResourceId: 'res-food-1',
        keyTakeaway: {
          en: 'No paperwork or appointments required for walk-in pantry bags.',
          es: 'No se requiere papeleo ni citas previas para las despensas sin cita.'
        }
      }
    ]
  },
  {
    id: 'daniel-45',
    name: 'Daniel',
    age: 45,
    tagline: {
      en: 'Recently laid-off Silicon Valley adult exploring affordable retraining',
      es: 'Adulto de Silicon Valley recientemente despedido que explora capacitación asequible'
    },
    location: 'Silicon Valley, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    categoryFocus: 'workforce',
    background: {
      en: 'Daniel recently lost his job and wants to explore a new career. He is comparing affordable training options and needs clear information about program fit, cost, schedule, and possible funding.',
      es: 'Daniel perdió su trabajo recientemente y quiere explorar una nueva carrera. Compara opciones de capacitación asequibles y necesita información clara sobre la compatibilidad, el costo, el horario y los posibles fondos.'
    },
    primaryGoals: [
      {
        en: 'Enroll in free or state-subsidized WIOA workforce training programs',
        es: 'Inscribirse en programas de capacitación laboral WIOA gratuitos o subsidiados por el estado'
      },
      {
        en: 'Obtain CompTIA or Cloud Support certifications with evening or asynchronous options',
        es: 'Obtener certificaciones de soporte técnico (CompTIA/Nube) con horarios vespertinos'
      },
      {
        en: 'Receive resume remodeling tailored to mid-career tech transition',
        es: 'Recibir asesoría de currículum adaptada para profesionales en transición a mitad de carrera'
      }
    ],
    barriers: [
      {
        en: 'Uncertainty about eligibility for California WIOA retraining grants',
        es: 'Dudas sobre elegibilidad para becas de reentrenamiento WIOA de California'
      },
      {
        en: 'Apprehension about competing with younger tech graduates',
        es: 'Inseguridad al competir contra graduados universitarios jóvenes en tecnología'
      },
      {
        en: 'Need to balance unemployment benefits (EDD) reporting with study schedules',
        es: 'Necesidad de compaginar el seguro de desempleo (EDD) con las horas de estudio'
      }
    ],
    sampleQuestions: [
      {
        en: 'I just lost my job and want to explore a new career. Are there affordable training programs that could help me find work?',
        es: 'Perdí mi trabajo y quiero explorar una nueva carrera. ¿Hay programas de capacitación asequibles que puedan ayudarme a encontrar trabajo?'
      },
      {
        en: 'Where can I meet a WIOA career counselor in Milpitas or North San Jose?',
        es: '¿Dónde puedo consultar con un asesor de carreras WIOA en Milpitas o San José norte?'
      },
      {
        en: 'Are there tech apprenticeship programs accepting candidates over 40?',
        es: '¿Existen programas de pasantías tecnológicas que acepten a mayores de 40 años?'
      }
    ],
    recommendedResourceIds: ['res-work-1', 'res-work-2', 'res-work-3'],
    journeySteps: [
      {
        stepNumber: 1,
        title: { en: 'Grant Discovery', es: 'Descubrimiento de Becas' },
        narrative: {
          en: 'Daniel discovers the NOVAworks Workforce Board portal through WhatSack, decoding that recent layoffs qualify for up to $8,000 in federal training vouchers.',
          es: 'Daniel descubre el portal de NOVAworks a través de WhatSack, enterándose de que despidos recientes califican para hasta $8,000 en vales de capacitación.'
        },
        recommendedResourceId: 'res-work-1',
        keyTakeaway: {
          en: 'Dislocated worker status unlocks 100% tuition coverage for vetted tech certificates.',
          es: 'El estatus de trabajador desplazado desbloquea cobertura del 100% de colegiatura en certificaciones avaladas.'
        }
      },
      {
        stepNumber: 2,
        title: { en: 'Document Assembly', es: 'Recopilación de Documentos' },
        narrative: {
          en: 'WhatSack generates his document checklist: EDD notice letter, CA Driver License, and resume draft.',
          es: 'WhatSack genera su lista de documentos: carta de notificación de despido/EDD, licencia de conducir de CA y borrador de currículum.'
        },
        recommendedResourceId: 'res-work-1',
        keyTakeaway: {
          en: 'Having the EDD determination letter expedites WIOA enrollment by two weeks.',
          es: 'Tener la carta de EDD acelera el proceso de inscripción en WIOA por dos semanas.'
        }
      },
      {
        stepNumber: 3,
        title: { en: 'Intake Orientation Booking', es: 'Reserva de Orientación' },
        narrative: {
          en: 'He books a simulated virtual orientation session and starts reviewing the 16-week Cybersecurity Operations pathway.',
          es: 'Agenda una sesión de orientación virtual simulada y comienza a revisar el programa de 16 semanas en Operaciones de Ciberseguridad.'
        },
        recommendedResourceId: 'res-work-1',
        keyTakeaway: {
          en: 'Cohort classes feature dedicated 1-on-1 industry mentor pairings for career pivoters.',
          es: 'Los programas incluyen mentores individuales de la industria para personas cambiando de carrera.'
        }
      }
    ]
  },
  {
    id: 'sofia-17',
    name: 'Sofia',
    age: 17,
    tagline: {
      en: 'First-generation high school senior mapping college financial aid & transfer pathways',
      es: 'Estudiante de último año de preparatoria de 1ra generación explorando ayuda universitaria y transferencias'
    },
    location: 'Fremont, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    categoryFocus: 'workforce',
    background: {
      en: 'Sofia will be the first in her family to attend higher education. She excels in math and biology but is overwhelmed by the complexity of FAFSA vs. California Dream Act, community college fee waivers (California College Promise), and local scholarship deadlines.',
      es: 'Sofía será la primera de su familia en asistir a la universidad. Destaca en matemáticas y biología, pero la abruma la diferencia entre FAFSA y California Dream Act, las exenciones de matrícula y las becas locales.'
    },
    primaryGoals: [
      {
        en: 'Determine whether to submit FAFSA or California Dream Act (CADAA) safely',
        es: 'Determinar si debe llenar FAFSA o California Dream Act (CADAA) de forma segura'
      },
      {
        en: 'Explore Foothill & De Anza College Promise program (2 years tuition-free)',
        es: 'Explorar el programa Foothill & De Anza College Promise (2 años sin matrícula)'
      },
      {
        en: 'Connect with first-gen peer mentorship workshops in Mountain View / Sunnyvale',
        es: 'Conectar con talleres de mentoría para estudiantes de primera generación en la zona'
      }
    ],
    barriers: [
      {
        en: 'Fear of filling out incorrect tax sections on parent income forms',
        es: 'Temor a equivocarse en los formularios fiscales sobre ingresos de los padres'
      },
      {
        en: 'High cost of textbooks and transportation across Silicon Valley campuses',
        es: 'Alto costo de libros de texto y transporte en los campus del área'
      },
      {
        en: 'Lack of college navigation guidance at home',
        es: 'Falta de orientación previa sobre procesos universitarios en su hogar'
      }
    ],
    sampleQuestions: [
      {
        en: 'I want to go to college, but my family does not have much money. What are my options?',
        es: 'Quiero ir a la universidad, pero mi familia no tiene mucho dinero. ¿Qué opciones tengo?'
      },
      {
        en: 'Where can a high school senior get free 1-on-1 FAFSA / Dream Act help in Mountain View?',
        es: '¿Dónde puede una estudiante recibir ayuda gratuita para FAFSA/Dream Act en Mountain View?'
      },
      {
        en: 'Are there local Silicon Valley scholarships for first-generation STEM students?',
        es: '¿Hay becas locales de Silicon Valley para estudiantes de primera generación en STEM?'
      }
    ],
    recommendedResourceIds: ['res-work-3', 'res-comm-2', 'res-work-4'],
    journeySteps: [
      {
        stepNumber: 1,
        title: { en: 'Financial Aid Clarification', es: 'Clarificación de Ayuda Financiera' },
        narrative: {
          en: 'Sofia uses WhatSack to clarify whether CADAA or FAFSA applies to her mixed-status household, learning that California student aid is protected by state privacy statutes.',
          es: 'Sofía aclara con WhatSack si le corresponde CADAA o FAFSA en un hogar con estatus mixto, sabiendo que la ayuda estatal de CA protege su privacidad.'
        },
        recommendedResourceId: 'res-work-3',
        keyTakeaway: {
          en: 'California law guarantees confidentiality for state financial aid applicants.',
          es: 'La ley de California garantiza confidencialidad total a los solicitantes de ayuda estudiantil.'
        }
      },
      {
        stepNumber: 2,
        title: { en: 'Tuition-Free Promise Mapping', es: 'Ruta de Matrícula Gratuita' },
        narrative: {
          en: 'She reviews the Foothill-De Anza Promise NextStep Insight: covers 100% of tuition and mandatory fees for the first two academic years for full-time CA residents.',
          es: 'Revisa las perspectivas de Foothill-De Anza Promise: cubre el 100% de matrícula y cuotas escolares durante los dos primeros años.'
        },
        recommendedResourceId: 'res-work-3',
        keyTakeaway: {
          en: 'Enrolling in 12+ units preserves free tuition status across both colleges.',
          es: 'Inscribirse en al menos 12 créditos mantiene la matrícula 100% gratuita.'
        }
      },
      {
        stepNumber: 3,
        title: { en: 'Workshop Reservation', es: 'Reserva de Taller de Llenado' },
        narrative: {
          en: 'Sofia reserves a drop-in spot at the Mountain View Teen Center Financial Aid Clinic for Saturday morning.',
          es: 'Sofía aparta su lugar para el taller sabatino de ayuda financiera en el Centro Juvenil de Mountain View.'
        },
        recommendedResourceId: 'res-comm-2',
        keyTakeaway: {
          en: 'Volunteer counselors verify tax lines line-by-line before submission.',
          es: 'Consejeros voluntarios revisan los datos fiscales renglón por renglón antes del envío.'
        }
      }
    ]
  },
  {
    id: 'mateo-14',
    name: 'Mateo',
    age: 14,
    tagline: {
      en: '8th grader experiencing severe test anxiety and isolation seeking confidential youth support',
      es: 'Estudiante de 14 años con ansiedad escolar y aislamiento buscando apoyo juvenil confidencial'
    },
    location: 'Sunnyvale, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    categoryFocus: 'mental-health',
    background: {
      en: 'Mateo is feeling intense pressure around academic performance and social fit at school. He struggles with panic attacks before exams but feels ashamed talking to his parents or school teachers because he does not want to burden them or be labeled.',
      es: 'Mateo siente enorme presión académica y dificultad para encajar socialmente. Sufre episodios de ansiedad antes de los exámenes, pero siente vergüenza de hablar con sus padres o profesores para no preocuparlos ni ser etiquetado.'
    },
    primaryGoals: [
      {
        en: 'Access anonymous, confidential youth text or chat support that does not notify school administrators',
        es: 'Acceder a apoyo por chat anónimo y confidencial para jóvenes sin notificaciones a la escuela'
      },
      {
        en: 'Find no-cost, teen-friendly drop-in mental wellness spaces in Santa Clara County',
        es: 'Encontrar espacios juveniles de bienestar mental gratuitos y acogedores en Santa Clara'
      },
      {
        en: 'Learn actionable breathing and grounding techniques for classroom panic',
        es: 'Aprender técnicas de respiración y calma para momentos de pánico en clase'
      }
    ],
    barriers: [
      {
        en: 'Fear that seeking help will alert parents or appear on permanent school transcripts',
        es: 'Temor de que buscar apoyo alerte a sus padres o quede en su expediente escolar'
      },
      {
        en: 'Stigma and shame surrounding mental wellness discussions in his community',
        es: 'Estigma y vergüenza en torno a la salud emocional en su entorno'
      },
      {
        en: 'Zero personal budget and reliance on bicycle/public transit in Sunnyvale',
        es: 'Sin presupuesto personal y traslado exclusivo en bicicleta o transporte público'
      }
    ],
    sampleQuestions: [
      {
        en: 'Is there a free confidential text line for teens feeling overwhelmed in Sunnyvale?',
        es: '¿Hay una línea de texto gratuita y confidencial para jóvenes en Sunnyvale?'
      },
      {
        en: 'Can a 14-year-old talk to a counselor in California without parental permission?',
        es: '¿Puede un joven de 14 años hablar con un terapeuta en California sin permiso de sus padres?'
      },
      {
        en: 'Where can youth hang out with trained peer counselors after school?',
        es: '¿Dónde pueden los jóvenes convivir con consejeros juveniles después de clases?'
      }
    ],
    recommendedResourceIds: ['res-mental-1', 'res-mental-2', 'res-comm-2'],
    journeySteps: [
      {
        stepNumber: 1,
        title: { en: 'Privacy & Minor Consent Check', es: 'Verificación de Privacidad y Consentimiento' },
        narrative: {
          en: 'Mateo asks WhatSack if conversations are private. WhatSack explains California Health & Safety Code § 124260 allowing youth 12+ to consent to outpatient mental health services confidentially.',
          es: 'Mateo consulta la privacidad. WhatSack explica el Código de Salud de California § 124260, que permite a jóvenes de 12+ años consentir apoyo emocional ambulatorio de forma confidencial.'
        },
        recommendedResourceId: 'res-mental-1',
        keyTakeaway: {
          en: 'Youth aged 12 and older can access confidential counseling in California without parental notification.',
          es: 'Los jóvenes de 12 años en adelante tienen derecho legal a consejería confidencial en California.'
        }
      },
      {
        stepNumber: 2,
        title: { en: 'Immediate Teen Peer Text Line', es: 'Línea Inmediata de Texto entre Jóvenes' },
        narrative: {
          en: 'WhatSack provides the California Youth Crisis Line and teen-led chat: 100% free, 24/7, anonymous texting.',
          es: 'WhatSack conecta con la Línea de Crisis Juvenil de California: servicio de texto anónimo, gratuito y disponible 24/7.'
        },
        recommendedResourceId: 'res-mental-2',
        keyTakeaway: {
          en: 'Texts are answered by trained young peer counselors who understand Silicon Valley academic stress.',
          es: 'Los mensajes son atendidos por jóvenes capacitados que comprenden el estrés escolar local.'
        }
      },
      {
        stepNumber: 3,
        title: { en: 'Sunnyvale Youth Wellness Hub', es: 'Espacio de Bienestar Juvenil en Sunnyvale' },
        narrative: {
          en: 'Mateo saves the Sunnyvale Youth Wellness Drop-In, an informal space with art therapy, sensory corners, and study pods.',
          es: 'Mateo guarda el centro de bienestar juvenil de Sunnyvale, un espacio informal con arte, zonas sensoriales y áreas de estudio.'
        },
        recommendedResourceId: 'res-mental-1',
        keyTakeaway: {
          en: 'Drop-in sessions require no medical insurance card or co-pays.',
          es: 'Las visitas no requieren seguro médico ni pago de copagos.'
        }
      }
    ]
  },
  {
    id: 'rosa-72',
    name: 'Rosa',
    age: 72,
    tagline: {
      en: 'Redwood City abuela seeking Spanish-speaking social circles, hot lunches & gentle exercise',
      es: 'Abuela de Redwood City buscando convivencia en español, almuerzos nutritivos y ejercicio suave'
    },
    location: 'Redwood City / North San Mateo County, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=400&q=80',
    categoryFocus: 'community',
    background: {
      en: 'Rosa has lived in the Bay Area for over 35 years. Since her husband passed away and her grandchildren started high school, she has felt increasingly lonely at home. She loves gardening and conversation in Spanish, but struggles with complicated online portal registrations and English-only menus.',
      es: 'Rosa ha vivido en el Área de la Bahía por más de 35 años. Desde que enviudó y sus nietos crecieron, se ha sentido sola en casa. Le apasiona la jardinería y platicar en español, pero le cuesta navegar páginas de internet complejas en inglés.'
    },
    primaryGoals: [
      {
        en: 'Join free Spanish-speaking senior social groups with music, bingo, and chair yoga',
        es: 'Unirse a grupos de la tercera edad en español con música, lotería y yoga en silla'
      },
      {
        en: 'Access congregate hot lunch programs in Redwood City that accommodate dietary needs',
        es: 'Acceder a comedores comunitarios con almuerzos calientes en Redwood City'
      },
      {
        en: 'Learn about door-to-door community van transit (SamTrans Redi-Wheels / Senior Shopper)',
        es: 'Conocer el transporte accesible puerta a puerta (SamTrans Redi-Wheels) para personas mayores'
      }
    ],
    barriers: [
      {
        en: 'Limited digital comfort and difficulty filling out lengthy web forms',
        es: 'Poco manejo de herramientas digitales y dificultad con formularios web largos'
      },
      {
        en: 'Prefers 100% Spanish communication with warm, culturally respectful staff',
        es: 'Prefiere atención 100% en español con trato cálido y respetuoso'
      },
      {
        en: 'Reduced mobility requiring ramp access and close drop-off points',
        es: 'Movilidad reducida que requiere rampas y accesos cercanos'
      }
    ],
    sampleQuestions: [
      {
        en: 'Where are Spanish-language senior clubs with hot lunch in Redwood City?',
        es: '¿Dónde hay clubes de la tercera edad en español con almuerzo caliente en Redwood City?'
      },
      {
        en: 'How can a 72-year-old get free door-to-door ride assistance in San Mateo County?',
        es: '¿Cómo puede una persona de 72 años solicitar transporte puerta a puerta en San Mateo?'
      },
      {
        en: 'Are there free community gardens or gentle exercise classes for seniors near me?',
        es: '¿Hay huertos comunitarios o clases de ejercicio suave para adultos mayores cerca de mí?'
      }
    ],
    recommendedResourceIds: ['res-comm-1', 'res-food-3', 'res-comm-3'],
    journeySteps: [
      {
        stepNumber: 1,
        title: { en: 'Voice-Assisted Discovery', es: 'Búsqueda por Voz Asistida' },
        narrative: {
          en: 'Rosa uses WhatSack’s voice button in Spanish to ask about local clubs. WhatSack reads out the Casa Circulo Cultural Senior Circle in Redwood City in clear Spanish.',
          es: 'Rosa usa el botón de voz en español para preguntar por clubes locales. WhatSack le lee en voz alta las actividades del Círculo de Adultos Mayores de Casa Círculo Cultural.'
        },
        recommendedResourceId: 'res-comm-1',
        keyTakeaway: {
          en: 'Voice navigation completely eliminates typing barriers on smartphones.',
          es: 'La navegación por voz elimina por completo la barrera de escribir en pantallas pequeñas.'
        }
      },
      {
        stepNumber: 2,
        title: { en: 'Transit & Accessibility Preview', es: 'Revisión de Transporte y Accesibilidad' },
        narrative: {
          en: 'NextStep Insight shows the center has zero-step ramp access and coordinates free Redi-Wheels senior van pickups on Tuesdays and Thursdays.',
          es: 'La Perspectiva SiguientePaso muestra que el centro cuenta con rampas sin escalones y coordina camionetas Redi-Wheels los martes y jueves.'
        },
        recommendedResourceId: 'res-comm-1',
        keyTakeaway: {
          en: 'Door-to-door transit is free for registered participants 65+.',
          es: 'El transporte puerta a puerta es gratuito para participantes registrados de 65+ años.'
        }
      },
      {
        stepNumber: 3,
        title: { en: 'Simple Phone Connect', es: 'Contacto Telefónico Sencillo' },
        narrative: {
          en: 'Rosa clicks the simulated direct call button to reach the bilingual coordinator directly without entering emails or passwords.',
          es: 'Rosa pulsa el botón de llamada simulada para comunicarse directamente con la coordinadora bilingüe sin contraseñas ni correos.'
        },
        recommendedResourceId: 'res-comm-1',
        keyTakeaway: {
          en: 'In-person welcome orientation includes a free warm bowl of soup on first visit.',
          es: 'La bienvenida presencial incluye un plato de sopa caliente gratis en la primera visita.'
        }
      }
    ]
  }
];
