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
      en: 'Find groceries',
      es: 'Encontrar despensa'
    },
    answer: {
      en: `**Free groceries — two official starting points:**

1. **Second Harvest of Silicon Valley — Food Locator.** Search by ZIP code or location for free groceries and ready-to-eat meals across Santa Clara and San Mateo counties. Each listing shows the site's days and times, and you can filter for sites marked “No documents required.” You can also call the Food Connection team at **1-800-984-3663**.

2. **Sacred Heart Community Service — Food Program**, 1381 South First Street, San Jose. Food is distributed Monday, Wednesday and Thursday 9:00 AM–4:00 PM, Tuesday 9:00 AM–6:00 PM, and Friday 9:00 AM–12:00 PM; closed weekends. Santa Clara County residents register online first, and the form is available in Spanish.

Schedules and site rules change. Confirm the details on the official page before you go.`,
      es: `**Alimentos gratuitos — dos puntos de partida oficiales:**

1. **Second Harvest of Silicon Valley — Localizador de Alimentos.** Busca por código postal o ubicación alimentos gratuitos y comidas listas para llevar en los condados de Santa Clara y San Mateo. Cada listado muestra los días y horarios del sitio, y puedes filtrar los sitios marcados como “No documents required”. También puedes llamar al equipo Food Connection al **1-800-984-3663**.

2. **Sacred Heart Community Service — Programa de Alimentos**, 1381 South First Street, San José. Los alimentos se distribuyen lunes, miércoles y jueves de 9:00 AM a 4:00 PM, martes de 9:00 AM a 6:00 PM y viernes de 9:00 AM a 12:00 PM; cerrado los fines de semana. Los residentes del Condado de Santa Clara se registran en línea primero, y hay formulario en español.

Los horarios y las reglas de cada sitio cambian. Confirma los detalles en la página oficial antes de ir.`
    },
    context: [
      { en: 'Santa Clara & San Mateo counties', es: 'Condados de Santa Clara y San Mateo' },
      { en: 'Free groceries', es: 'Alimentos gratuitos' },
      { en: 'Verify hours before visiting', es: 'Confirma el horario antes de ir' }
    ],
    links: [
      {
        label: { en: 'Second Harvest — Food Locator', es: 'Second Harvest — Localizador de Alimentos' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/'
      },
      {
        label: { en: 'Sacred Heart Community Service — Food Program', es: 'Sacred Heart Community Service — Programa de Alimentos' },
        source: { en: 'Sacred Heart Community Service', es: 'Sacred Heart Community Service' },
        url: 'https://www.sacredheartcs.org/programs-food-clothing'
      }
    ],
    nextStep: {
      title: { en: 'Check the official listing before you go', es: 'Revisa el listado oficial antes de ir' },
      detail: {
        en: 'The Food Locator shows current days, times, and whether a site asks for documents. Sacred Heart publishes its food hours and online registration on its own page.',
        es: 'El Localizador de Alimentos muestra días, horarios y si el sitio pide documentos. Sacred Heart publica su horario de alimentos y el registro en línea en su propia página.'
      },
      actions: [
        {
          id: 'food-entry-save',
          kind: 'save-plan',
          label: { en: 'Save the Sacred Heart food program', es: 'Guardar el programa de alimentos de Sacred Heart' },
          resourceId: 'res-food-1'
        },
        {
          id: 'food-entry-site',
          kind: 'open-link',
          label: { en: 'Open the Food Locator', es: 'Abrir el Localizador de Alimentos' },
          url: 'https://www.shfb.org/get-food/'
        }
      ]
    },
    resourceIds: ['res-food-1', 'res-food-2'],
    followUpIds: ['ans-food-calfresh-help', 'ans-food-proof-of-address', 'ans-food-diapers-formula', 'ans-food-greeting-desk-roleplay']
  },
  {
    id: 'ans-work-tech-certificates',
    topic: 'work',
    question: {
      en: 'How can laid-off workers get free tech certificates in Milpitas?',
      es: '¿Cómo recibir cursos de tecnología gratuitos tras un despido en Milpitas?'
    },
    answer: {
      en: `**If you experienced a recent layoff or workforce reduction in Silicon Valley, you have access to substantial state retraining funds:**

- **NOVAworks Dislocated Worker Program:** Offers vouchers up to **$8,000** for approved certificates in CompTIA Security+, Cloud Operations (AWS), and Network Support.
- **Crucial Protection:** Enrolling in approved California Training Benefits (CTB) allows you to continue receiving weekly EDD unemployment benefits without having to submit weekly job search logs.

**Actionable Next Step:** Sign up for the 45-minute virtual WIOA orientation held every Wednesday at 10:00 AM. Bring your EDD determination letter.`,
      es: `**Si recientemente fue despedido o redujeron su jornada en Silicon Valley, tiene acceso a importantes becas estatales:**

- **Programa NOVAworks para Trabajadores Desplazados:** Otorga vales de hasta **$8,000** para certificaciones en CompTIA Security+, Nube (AWS) y Soporte de Redes.
- **Protección Clave:** Al inscribirse en cursos avalados por California Training Benefits (CTB), continúa recibiendo sus cheques de desempleo del EDD sin la obligación de buscar empleo semanalmente.

**Siguiente Paso Recomendado:** Inscríbase a la orientación virtual de 45 minutos que se realiza todos los miércoles a las 10:00 AM. Tenga a la mano su carta del EDD.`
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
      title: { en: 'Attend the Wednesday WIOA orientation', es: 'Asista a la orientación WIOA del miércoles' },
      detail: {
        en: 'The virtual session is 45 minutes and ends with the current cohort list. Bring your EDD letter so a navigator can check training-benefit eligibility.',
        es: 'La sesión virtual dura 45 minutos y termina con la lista de cohortes vigentes. Lleve su carta del EDD para que un asesor revise la elegibilidad de beneficios de capacitación.'
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
    resourceIds: ['res-work-1', 'res-work-2'],
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
      en: `**Here is the exact breakdown for tuition-free college in Silicon Valley:**

- **Foothill & De Anza College Promise (AB 19):** Covers **100% of tuition and mandatory fees for 2 full academic years** for California residents enrolled in 12+ units.
- **AB 540 / Dream Act Safety:** Undocumented students submit the California Dream Act Application (CADAA). Under California state law, your financial aid records are confidential and never shared with federal immigration agencies.
- **Book Support:** First-generation students can ask the Student Success Center about bookstore and supplies assistance.

**Actionable Next Step:** Complete your OpenCCC admissions application first to generate your student CWID, then submit CADAA/FAFSA.`,
      es: `**Aquí tiene el desglose exacto para estudiar la universidad sin costo en Silicon Valley:**

- **Foothill y De Anza College Promise (Ley AB 19):** Cubre el **100% de la colegiatura y cuotas durante 2 años completos** para residentes de California inscritos en 12+ créditos.
- **Seguridad AB 540 / Dream Act:** Estudiantes indocumentados llenan la solicitud CADAA. Por ley de California, sus datos escolares son confidenciales y nunca se comparten con autoridades migratorias.
- **Apoyo para Libros:** Estudiantes de 1ra generación pueden preguntar en el Centro de Éxito Estudiantil por apoyo para libros y útiles.

**Siguiente Paso Recomendado:** Llene primero la solicitud de admisión en OpenCCC para obtener su número estudiantil CWID, y después envíe su CADAA o FAFSA.`
    },
    context: [
      { en: 'Silicon Valley', es: 'Silicon Valley' },
      { en: 'College goal', es: 'Meta universitaria' },
      { en: 'Cost & financial aid', es: 'Costo y ayuda financiera' }
    ],
    links: [
      {
        label: { en: 'De Anza College Promise', es: 'De Anza College Promise' },
        source: { en: 'De Anza College', es: 'De Anza College' },
        url: 'https://www.deanza.edu/promise/'
      },
      {
        label: { en: 'California Student Aid Commission — CADAA', es: 'Comisión de Ayuda Estudiantil de California — CADAA' },
        source: { en: 'California Student Aid Commission', es: 'Comisión de Ayuda Estudiantil de California' },
        url: 'https://dream.csac.ca.gov/'
      }
    ],
    nextStep: {
      title: { en: 'Start with OpenCCC, then the aid application', es: 'Empiece con OpenCCC y luego la solicitud de ayuda' },
      detail: {
        en: 'OpenCCC generates the student ID that every later form asks for. Submit CADAA or FAFSA once you have it.',
        es: 'OpenCCC genera el número estudiantil que piden todos los trámites siguientes. Envíe CADAA o FAFSA cuando lo tenga.'
      },
      actions: [
        {
          id: 'college-entry-save',
          kind: 'save-plan',
          label: { en: 'Save College Promise to my plan', es: 'Guardar College Promise en mi plan' },
          resourceId: 'res-work-3'
        },
        {
          id: 'college-entry-site',
          kind: 'open-link',
          label: { en: 'Open De Anza Promise page', es: 'Abrir la página de De Anza Promise' },
          url: 'https://www.deanza.edu/promise/'
        }
      ]
    },
    resourceIds: ['res-work-3', 'res-comm-2'],
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
      en: `**You have full legal rights to confidential support in California:**

- **California Health & Safety Code § 124260:** Youth aged 12 and older can consent to outpatient mental health and peer counseling confidentially without parental notification.
- **California Youth Crisis Text Line:** Text **HOPE** to **844-555-TEEN** (Simulated). 100% free, 24/7, anonymous. Texts are answered by trained young listeners who understand academic pressure.
- **Sunnyvale Youth Wellness Hub:** Drop in after school (3:00 PM – 7:30 PM) for art therapy, quiet sensory pods, and peer listeners without insurance cards or school reporting.

**Actionable Next Step:** Save the text code in your phone as "Peer Line". Reach out anytime you feel overwhelmed.`,
      es: `**Tienes plenos derechos legales a recibir apoyo confidencial en California:**

- **Código de Salud de California § 124260:** Jóvenes de 12 años en adelante tienen derecho legal a solicitar consejería ambulatoria de forma confidencial sin aviso obligatorio a los padres.
- **Línea de Texto de Crisis Juvenil de California:** Envía la palabra **HOPE** al **844-555-TEEN** (Simulado). 100% gratuito, anónimo y disponible 24/7 con jóvenes capacitados.
- **Centro de Bienestar Juvenil de Sunnyvale:** Espacio libre después de clases (3:00 PM a 7:30 PM) con arte, zonas sensoriales y apoyo entre compañeros sin pedir seguro médico.

**Siguiente Paso Recomendado:** Guarda el número como "Apoyo Amigo" en tu celular. Escribe en cualquier momento de estrés.`
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
      title: { en: 'Save the peer line under a neutral name', es: 'Guarda la línea con un nombre neutro' },
      detail: {
        en: 'A neutral contact name keeps the thread private if someone sees your phone.',
        es: 'Un nombre neutro mantiene el mensaje privado si alguien ve tu teléfono.'
      },
      actions: [
        {
          id: 'mental-entry-save',
          kind: 'save-plan',
          label: { en: 'Save confidential support to my plan', es: 'Guardar apoyo confidencial en mi plan' },
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
    id: 'ans-senior-cultural-circles',
    topic: 'senior',
    question: {
      en: 'Where are Spanish-speaking senior gatherings near Redwood City?',
      es: '¿Dónde hay convivencias para adultos mayores en español cerca de Redwood City?'
    },
    answer: {
      en: `**Here are wonderful Spanish-speaking senior gatherings in Redwood City & the Peninsula:**

- **Casa Círculo Cultural Senior Circle:** Meets every Tuesday & Thursday (10:00 AM – 1:30 PM) in North Fair Oaks. Features traditional crafts, chair yoga, warm Mexican hot lunches, and music.
- **Door-to-Door Transit Assistance:** Staff helps register you for **SamTrans Redi-Wheels**, which picks you up directly at your home and brings you to the center.
- **Cost:** 100% Free. No fees, no membership requirements.

**Actionable Next Step:** Call bilingual coordinator Carmen at (650) 555-CASA (Simulated) or arrive this Tuesday at 10:00 AM. Free welcome coffee and apron provided!`,
      es: `**Aquí tiene excelentes opciones de convivencia para adultos mayores en español en Redwood City:**

- **Círculo de Adultos Mayores de Casa Círculo Cultural:** Se reúnen martes y jueves (10:00 AM a 1:30 PM) en North Fair Oaks. Disfrutan de manualidades, yoga en silla, música y un rico almuerzo caliente.
- **Transporte Puerta a Puerta:** El personal le ayuda a tramitar **SamTrans Redi-Wheels**, una camioneta que pasa por usted hasta la puerta de su casa.
- **Costo:** 100% Gratuito. Sin membresías ni mensualidades.

**Siguiente Paso Recomendado:** Llame a la coordinadora Doña Carmen al (650) 555-CASA (Simulado) o llegue el martes a las 10:00 AM. ¡Recibirá café caliente y un mandil de bienvenida!`
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
        url: 'https://www.samtrans.com/accessibility/rediwheels'
      },
      {
        label: { en: 'Santa Clara County Senior Nutrition Program', es: 'Programa de Nutrición para Adultos Mayores del Condado de Santa Clara' },
        source: { en: 'County of Santa Clara', es: 'Condado de Santa Clara' },
        url: 'https://ssa.sccgov.org/'
      }
    ],
    nextStep: {
      title: { en: 'Call the bilingual coordinator before Tuesday', es: 'Llame a la coordinadora bilingüe antes del martes' },
      detail: {
        en: 'One call reserves a lunch plate and starts the Redi-Wheels application, so the first visit needs no walking.',
        es: 'Una llamada reserva el almuerzo e inicia la solicitud de Redi-Wheels, para que la primera visita no requiera caminar.'
      },
      actions: [
        {
          id: 'senior-entry-save',
          kind: 'save-plan',
          label: { en: 'Save senior circle to my plan', es: 'Guardar el círculo en mi plan' },
          resourceId: 'res-comm-1'
        },
        {
          id: 'senior-entry-site',
          kind: 'open-link',
          label: { en: 'Open Redi-Wheels page', es: 'Abrir la página de Redi-Wheels' },
          url: 'https://www.samtrans.com/accessibility/rediwheels'
        }
      ]
    },
    resourceIds: ['res-comm-1', 'res-food-3'],
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
