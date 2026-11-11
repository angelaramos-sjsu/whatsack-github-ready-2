import type { ScriptedAnswer } from './types';

/**
 * Entry answers: the approved reply for each conversation topic.
 * Free-text questions are routed to one of these by topic, and every
 * follow-up chain starts and returns here.
 */
export const entryAnswers: ScriptedAnswer[] = [
  {
    id: 'ans-food-east-sj-groceries',
    topic: 'food',
    question: {
      en: 'Where can I get groceries in East San Jose without an ID?',
      es: '¿Dónde consigo despensa en el Este de San José sin identificación?'
    },
    answer: {
      en: `Food distribution requirements vary by location. I can't confirm that a particular pantry in East San Jose is open on a specific day or that it does not require identification. Use Second Harvest's Food Locator to search by ZIP code, review the location details, and contact the organization to confirm current hours and requirements before visiting.`,
      es: `Los requisitos de distribución de alimentos varían según el lugar. No puedo confirmar que una despensa específica del Este de San José esté abierta un día determinado ni que no pida identificación. Usa el Localizador de Alimentos de Second Harvest para buscar por código postal, revisar los detalles y comunicarte con la organización para confirmar los horarios y requisitos actuales antes de ir.`
    },
    context: [
      { en: 'East San Jose', es: 'Este de San José' },
      { en: 'Food access', es: 'Acceso a alimentos' },
      { en: 'Confirm site requirements', es: 'Confirma los requisitos del lugar' }
    ],
    links: [
      {
        label: { en: 'Second Harvest of Silicon Valley — get food', es: 'Second Harvest of Silicon Valley — obtener alimentos' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/'
      }
    ],
    nextStep: {
      title: { en: 'Check the Food Locator and confirm requirements', es: 'Consulta el Localizador de Alimentos y confirma los requisitos' },
      detail: {
        en: 'Search for a nearby distribution location, then check its current hours and requirements directly with the organization.',
        es: 'Busca un lugar de distribución cercano y confirma sus horarios y requisitos actuales directamente con la organización.'
      },
      actions: [
        {
          id: 'food-entry-save',
          kind: 'open-link',
          label: { en: 'Open Second Harvest Food Locator', es: 'Abrir el Localizador de Alimentos de Second Harvest' },
          url: 'https://www.shfb.org/get-food/'
        },
        {
          id: 'food-entry-site',
          kind: 'open-link',
          label: { en: 'Open Second Harvest site', es: 'Abrir el sitio de Second Harvest' },
          url: 'https://www.shfb.org/get-food/'
        }
      ]
    },
    resourceIds: [],
    followUpIds: ['ans-food-proof-of-address', 'ans-food-diapers-formula', 'ans-food-greeting-desk-roleplay']
  },
  {
    id: 'ans-work-tech-certificates',
    topic: 'work',
    question: {
      en: 'How can laid-off workers get free tech certificates in Milpitas?',
      es: '¿Cómo recibir cursos de tecnología gratuitos tras un despido en Milpitas?'
    },
    answer: {
      en: `NOVAworks is a local workforce resource where you can ask about current technology training and career services. I can't confirm that a particular certificate is free, that funding is available, or that you qualify; programs and requirements can change. Contact NOVAworks to ask what training is currently accepting participants and whether assistance may apply to your situation.

If you receive unemployment benefits, California Training Benefits (CTB) is a separate EDD program. Do not assume training is approved or that benefits will continue unchanged. Review EDD's rules and contact EDD about your claim.`,
      es: `NOVAworks es un recurso laboral local donde puedes preguntar por capacitación tecnológica y servicios de carrera actuales. No puedo confirmar que un certificado específico sea gratuito, que haya fondos disponibles o que califiques; los programas y requisitos pueden cambiar. Comunícate con NOVAworks para preguntar qué capacitación acepta participantes actualmente y si podrías recibir asistencia.

Si recibes beneficios de desempleo, California Training Benefits (CTB) es un programa separado del EDD. No des por sentado que la capacitación esté aprobada ni que los beneficios continúen sin cambios. Revisa las reglas del EDD y comunícate con el EDD sobre tu reclamo.`
    },
    context: [
      { en: 'Milpitas', es: 'Milpitas' },
      { en: 'Recent layoff', es: 'Despido reciente' },
      { en: 'Free retraining', es: 'Capacitación gratuita' }
    ],
    links: [
      {
        label: { en: 'NOVAworks — dislocated worker services', es: 'NOVAworks — servicios para trabajadores desplazados' },
        source: { en: 'NOVAworks Career Center', es: 'Centro de Carreras NOVAworks' },
        url: 'https://www.novaworks.org/'
      },
      {
        label: { en: 'EDD — California Training Benefits', es: 'EDD — Beneficios de Capacitación de California' },
        source: { en: 'California Employment Development Department', es: 'Departamento de Desarrollo del Empleo de California' },
        url: 'https://edd.ca.gov/en/unemployment/california_training_benefits/'
      }
    ],
    nextStep: {
      title: { en: 'Ask NOVAworks about current training and funding', es: 'Pregunta a NOVAworks por capacitación y fondos actuales' },
      detail: {
        en: 'Confirm available programs, funding, eligibility, schedules, and any documents directly with NOVAworks.',
        es: 'Confirma directamente con NOVAworks los programas, fondos, requisitos, horarios y documentos disponibles.'
      },
      actions: [
        {
          id: 'work-entry-save',
          kind: 'save-plan',
          label: { en: 'Save retraining program to my plan', es: 'Guardar el programa en mi plan' },
          resourceId: 'res-work-1'
        },
        {
          id: 'work-entry-site',
          kind: 'open-link',
          label: { en: 'Open NOVAworks site', es: 'Abrir el sitio de NOVAworks' },
          url: 'https://www.novaworks.org/'
        }
      ]
    },
    resourceIds: ['res-work-1'],
    followUpIds: ['ans-work-edd-impact', 'ans-work-evening-classes', 'ans-work-interview-practice']
  },
  {
    id: 'ans-college-tuition-free',
    topic: 'college',
    question: {
      en: 'What tuition help exists for college in Silicon Valley?',
      es: '¿Qué ayuda hay para pagar la universidad en Silicon Valley?'
    },
    answer: {
      en: `College aid depends on your school, program, and circumstances. Students may explore federal aid through FAFSA, California aid through CADAA when eligible, and campus programs such as College Promise. These programs have different requirements and may not cover every cost, such as books or living expenses. I can't determine eligibility or promise a specific award.

Start with the official aid pages and ask the college financial aid office which programs apply to your campus and entry year.`,
      es: `La ayuda universitaria depende de la institución, el programa y tus circunstancias. Puedes consultar la ayuda federal mediante FAFSA, la ayuda de California mediante CADAA si eres elegible y programas del campus como College Promise. Estos programas tienen distintos requisitos y quizá no cubran todos los gastos, como libros o vivienda. No puedo determinar tu elegibilidad ni prometer una cantidad específica.

Empieza con las páginas oficiales de ayuda y pregunta en la oficina de ayuda financiera qué programas corresponden a tu campus y año de ingreso.`
    },
    context: [
      { en: 'Silicon Valley', es: 'Silicon Valley' },
      { en: 'College goal', es: 'Meta universitaria' },
      { en: 'Cost & financial aid', es: 'Costo y ayuda financiera' }
    ],
    links: [
      {
        label: { en: 'Federal Student Aid — FAFSA', es: 'Ayuda Federal para Estudiantes — FAFSA' },
        source: { en: 'U.S. Department of Education', es: 'Departamento de Educación de EE. UU.' },
        url: 'https://studentaid.gov/'
      },
      {
        label: { en: 'California Student Aid Commission — CADAA', es: 'Comisión de Ayuda Estudiantil de California — CADAA' },
        source: { en: 'California Student Aid Commission', es: 'Comisión de Ayuda Estudiantil de California' },
        url: 'https://dream.csac.ca.gov/'
      },
      {
        label: { en: 'De Anza College Promise requirements', es: 'Requisitos de De Anza College Promise' },
        source: { en: 'De Anza College', es: 'De Anza College' },
        url: 'https://www.deanza.edu/promise/'
      },
      {
        label: { en: 'Foothill College Promise requirements', es: 'Requisitos de Foothill College Promise' },
        source: { en: 'Foothill College', es: 'Foothill College' },
        url: 'https://www.foothill.edu/promise/'
      }
    ],
    nextStep: {
      title: { en: 'Check the aid options for your college', es: 'Consulta las opciones de ayuda de tu colegio' },
      detail: {
        en: 'Review FAFSA, CADAA, and any campus Promise program rules with the official sources or your financial aid office.',
        es: 'Revisa las reglas de FAFSA, CADAA y cualquier programa Promise del campus con las fuentes oficiales o la oficina de ayuda financiera.'
      },
      actions: [
        {
          id: 'college-entry-save',
          kind: 'save-plan',
          label: { en: 'Save college aid information to my plan', es: 'Guardar información de ayuda universitaria en mi plan' },
          resourceId: 'res-work-3'
        },
        {
          id: 'college-entry-site',
          kind: 'open-link',
          label: { en: 'Open De Anza College Promise', es: 'Abrir De Anza College Promise' },
          url: 'https://www.deanza.edu/promise/'
        }
      ]
    },
    resourceIds: ['res-work-3'],
    followUpIds: ['ans-college-fafsa-vs-cadaa', 'ans-college-campus-help', 'ans-college-promise-requirements']
  },
  {
    id: 'ans-mental-confidential-teens',
    topic: 'mental',
    question: {
      en: 'What mental health support is confidential for teens in Sunnyvale?',
      es: '¿Qué apoyo emocional para jóvenes es confidencial en Sunnyvale?'
    },
    answer: {
      en: `I can't confirm the privacy practices, hours, or services of a specific youth center from this information. California Health & Safety Code § 124260 allows a minor age 12 or older to consent to certain outpatient mental health treatment only when a professional determines the minor is mature enough; parent or guardian involvement is generally included unless the professional finds it inappropriate. This is not a blanket guarantee of confidentiality.

For support, contact Santa Clara County Behavioral Health Services or use the official 988 website to review available crisis support and contact options. Ask any provider about cost, eligibility, privacy, and its limits before sharing personal information.`,
      es: `No puedo confirmar las prácticas de privacidad, los horarios ni los servicios de un centro juvenil específico con esta información. El Código de Salud y Seguridad de California § 124260 permite que un menor de 12 años o más dé su consentimiento para ciertos tratamientos ambulatorios de salud mental solo cuando un profesional determina que tiene madurez suficiente; por lo general se incluye a los padres o tutores, salvo que el profesional considere que no es apropiado. Esto no es una garantía general de confidencialidad.

Para obtener apoyo, comunícate con los Servicios de Salud Conductual del Condado de Santa Clara o consulta el sitio oficial de 988 para revisar las opciones de apoyo en crisis y cómo contactarlas. Antes de compartir información personal, pregunta a cualquier proveedor sobre costos, requisitos, privacidad y sus límites.`
    },
    context: [
      { en: 'Sunnyvale', es: 'Sunnyvale' },
      { en: 'Youth & teen support', es: 'Apoyo para jóvenes' },
      { en: 'Confidential care', es: 'Atención confidencial' }
    ],
    links: [
      {
        label: { en: '988 Suicide & Crisis Lifeline', es: 'Línea 988 de Prevención del Suicidio y Crisis' },
        source: { en: '988 Lifeline', es: 'Línea 988' },
        url: 'https://988lifeline.org/'
      },
      {
        label: { en: 'Santa Clara County Behavioral Health Services', es: 'Servicios de Salud Conductual del Condado de Santa Clara' },
        source: { en: 'County of Santa Clara', es: 'Condado de Santa Clara' },
        url: 'https://bhsd.sccgov.org/'
      }
    ],
    nextStep: {
      title: { en: 'Review official support options', es: 'Revisa opciones oficiales de apoyo' },
      detail: {
        en: 'Contact the county or review 988 options, and ask providers about privacy and eligibility.',
        es: 'Comunícate con el condado o revisa las opciones de 988 y pregunta a los proveedores sobre privacidad y requisitos.'
      },
      actions: [
        {
          id: 'mental-entry-save',
          kind: 'save-plan',
          label: { en: 'Save mental health resources to my plan', es: 'Guardar recursos de salud mental en mi plan' },
          resourceId: 'res-mental-2'
        },
        {
          id: 'mental-entry-site',
          kind: 'open-link',
          label: { en: 'Open 988 Lifeline', es: 'Abrir la Línea 988' },
          url: 'https://988lifeline.org/'
        }
      ]
    },
    resourceIds: ['res-mental-1', 'res-mental-2'],
    followUpIds: ['ans-mental-school-privacy', 'ans-mental-drop-in-what-happens', 'ans-mental-text-practice']
  },
  {
    id: 'ans-community-connections',
    topic: 'community',
    question: {
      en: 'I feel lonely. Where can I meet people or join community activities?',
      es: 'Me siento sola. ¿Dónde puedo conocer gente o participar en actividades de mi comunidad?'
    },
    answer: {
      en: `**Looking for company or activities in your community?**

You can explore local organizations without creating an account or sharing personal information.

1. Select **Find Resources** in the navigation.
2. Choose **Community Connection** and select your city.
3. Open an organization's official website to check current events, languages, accessibility, costs, and how to join.

**Important:** WhatSack does not verify live event schedules. Check directly with each organization before visiting. 211 Bay Area can help connect residents with local health and human services; ask for community activities and social-connection options in your city.

**For older adults near Redwood City:** Use the suggested question below to find official county food-resource information and ask providers about current activities, meal options, language access, and transportation.`,
      es: `**¿Busca compañía o actividades para conocer a otras personas?**

Puede explorar organizaciones locales sin crear una cuenta ni compartir datos personales.

1. Seleccione **Buscar Recursos** en el menú.
2. Elija **Conexión comunitaria** y seleccione su ciudad.
3. Abra el sitio oficial de cada organización para confirmar actividades, idiomas, accesibilidad, costos y cómo participar.

**Importante:** WhatSack no verifica los horarios de eventos en vivo. Confirme directamente con cada organización antes de ir. 211 Bay Area puede conectar a residentes con servicios locales de salud y humanos; pregunta por actividades comunitarias y opciones de conexión social en tu ciudad.

**Para adultos mayores cerca de Redwood City:** Use la pregunta sugerida a continuación para encontrar información oficial del condado sobre recursos de alimentos y preguntar a los proveedores sobre actividades, comidas, atención en español y transporte actuales.`
    },
    context: [
      { en: 'Community activities and social connection', es: 'Actividades comunitarias y conexión social' },
      { en: 'Ask the organization for current details', es: 'Confirme los detalles actuales con la organización' }
    ],
    links: [
      {
        label: { en: '211 Bay Area — local service directory', es: '211 Bay Area — directorio de servicios locales' },
        source: { en: '211 Bay Area Information & Referral Services', es: 'Servicios de Información y Referencia de 211 Bay Area' },
        url: 'https://211bayarea.org/'
      },
      {
        label: { en: '211 Bay Area — Español', es: '211 Bay Area — Español' },
        source: { en: '211 Bay Area Information & Referral Services', es: 'Servicios de Información y Referencia de 211 Bay Area' },
        url: 'https://211bayarea.org/es/inicio/'
      }
    ],
    nextStep: {
      title: { en: 'Ask 211 about community activities near you', es: 'Pregunta a 211 por actividades comunitarias cercanas' },
      detail: {
        en: 'Share your city and ask about current community groups, accessible activities, and language options. Verify details with the organization before attending.',
        es: 'Indica tu ciudad y pregunta por grupos comunitarios actuales, actividades accesibles e idiomas disponibles. Confirma los detalles con la organización antes de asistir.'
      },
      actions: [
        {
          id: 'community-211-link',
          kind: 'open-link',
          label: { en: 'Open 211 Bay Area', es: 'Abrir 211 Bay Area' },
          url: 'https://211bayarea.org/'
        }
      ]
    },
    followUpIds: ['ans-senior-cultural-circles']
  },
  {
    id: 'ans-senior-cultural-circles',
    topic: 'senior',
    question: {
      en: 'Where are Spanish-speaking senior gatherings near Redwood City?',
      es: '¿Dónde hay convivencias para adultos mayores en español cerca de Redwood City?'
    },
    answer: {
      en: `I can't verify a particular Spanish-speaking senior gathering, its schedule, cost, or availability near Redwood City. San Mateo County says adults age 60 and older may qualify for congregate or home-delivered meals; contact the county or local provider to ask what is currently offered, including language access and eligibility. For accessible transit, review SamTrans' official paratransit information; eligibility and service areas apply, so confirm details directly.`,
      es: `No puedo confirmar una convivencia específica en español, su horario, costo o disponibilidad cerca de Redwood City. El Condado de San Mateo indica que las personas de 60 años o más pueden calificar para comidas en grupo o a domicilio; comunícate con el condado o proveedor local para preguntar qué se ofrece actualmente, incluso atención en español y requisitos. Para transporte accesible, revisa la información oficial de paratransit de SamTrans; aplican requisitos y zonas de servicio, así que confirma los detalles directamente.`
    },
    context: [
      { en: 'Redwood City & North Fair Oaks', es: 'Redwood City y North Fair Oaks' },
      { en: 'Spanish-speaking', es: 'En español' },
      { en: 'Older adults', es: 'Adultos mayores' }
    ],
    links: [
      {
        label: { en: 'SamTrans Redi-Wheels paratransit', es: 'Transporte Redi-Wheels de SamTrans' },
        source: { en: 'SamTrans', es: 'SamTrans' },
        url: 'https://www.samtrans.com/accessibility/paratransit'
      },
      {
        label: { en: 'San Mateo County — Food Resources', es: 'Condado de San Mateo — Recursos de alimentos' },
        source: { en: 'San Mateo County', es: 'Condado de San Mateo' },
        url: 'https://www.smcgov.org/hsa/food-resources'
      }
    ],
    nextStep: {
      title: { en: 'Check official service and transportation information', es: 'Consulte la información oficial de servicios y transporte' },
      detail: {
        en: 'Ask the county about current meal programs, eligibility, and language access; confirm transit eligibility and area with SamTrans.',
        es: 'Pregunta al condado sobre programas de comidas actuales, requisitos y atención en español; confirma con SamTrans la elegibilidad y zona de transporte.'
      },
      actions: [
        {
          id: 'senior-entry-save',
          kind: 'save-plan',
          label: { en: 'Save senior food resources to my plan', es: 'Guardar recursos de alimentos para adultos mayores' },
          resourceId: 'res-comm-1'
        },
        {
          id: 'senior-entry-site',
          kind: 'open-link',
          label: { en: 'Open Redi-Wheels page', es: 'Abrir la página de Redi-Wheels' },
          url: 'https://www.samtrans.com/accessibility/paratransit'
        }
      ]
    },
    resourceIds: ['res-food-3'],
    followUpIds: ['ans-senior-redi-wheels', 'ans-senior-caregiver-companion', 'ans-senior-lunch-menu']
  },
  {
    id: 'ans-roleplay-intake-open',
    topic: 'roleplay',
    question: {
      en: 'Practice intake call for food pantry',
      es: 'Practicar llamada para pedir despensa'
    },
    answer: {
      en: `**[Intake Specialist Roleplay Mode Active]**

*"Good morning! Welcome to the Silicon Valley Community Support Desk. My name is Elena. Thank you for calling today — please take your time, we are here to support you without any judgment.*

*Could you share with me what neighborhood you are calling from, and whether you are looking for groceries, job training, or health support today?"*

*(Notice how warm and straightforward the intake is? Reply to me as you would on the phone to practice!)*`,
      es: `**[Modo de Ensayo de Registro Activo]**

*"¡Buenos días! Bienvenido a la Mesa de Apoyo Comunitario de Silicon Valley. Mi nombre es Elena. Gracias por comunicarse con nosotros hoy — tómese todo su tiempo, estamos aquí para servirle con respeto y sin juzgar.*

*¿Podría decirme desde qué área nos llama y si busca alimentos, capacitación o apoyo emocional hoy?"*

*(¿Ve qué sencillo y cálido es el trato? Respóndame como si estuviera en la llamada para seguir practicando).*`
    },
    context: [
      { en: 'Practice call', es: 'Llamada de práctica' },
      { en: 'No wrong answers', es: 'Sin respuestas incorrectas' }
    ],
    links: [
      {
        label: { en: 'Sacred Heart Community Service — what to expect', es: 'Sacred Heart Community Service — qué esperar' },
        source: { en: 'Sacred Heart Community Service', es: 'Sacred Heart Community Service' },
        url: 'https://www.sacredheartcs.org/'
      }
    ],
    nextStep: {
      title: { en: 'Save the pantry you are rehearsing for', es: 'Guarda la despensa para la que ensayas' },
      detail: {
        en: 'Having the address in your plan makes the practice call turn into a real visit.',
        es: 'Tener la dirección en tu plan convierte la llamada de práctica en una visita real.'
      },
      actions: [
        {
          id: 'roleplay-entry-save',
          kind: 'save-plan',
          label: { en: 'Save pantry to my plan', es: 'Guardar despensa en mi plan' },
          resourceId: 'res-food-1'
        },
        {
          id: 'roleplay-entry-site',
          kind: 'open-link',
          label: { en: 'Open pantry website', es: 'Abrir el sitio de la despensa' },
          url: 'https://www.sacredheartcs.org/'
        }
      ]
    },
    resourceIds: ['res-food-1'],
    followUpIds: ['ans-roleplay-east-sj-groceries', 'ans-roleplay-milpitas-layoff', 'ans-roleplay-nervous-start']
  }
];
