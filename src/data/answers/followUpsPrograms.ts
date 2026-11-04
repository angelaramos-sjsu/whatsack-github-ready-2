import type { ScriptedAnswer } from './types';

/** Follow-up answers for food, workforce and college questions. */
export const programFollowUpAnswers: ScriptedAnswer[] = [
  {
    id: 'ans-food-proof-of-address',
    topic: 'food',
    question: {
      en: 'Do I need to show proof of address?',
      es: '¿Debo mostrar comprobante de domicilio?'
    },
    answer: {
      en: `**No.** The Sacred Heart Saturday Community Food Pantry does not ask for proof of address, a state ID, or an income document — households self-attest at the greeting desk. The Second Harvest Mobile Produce Market works the same way: walk up, give a first name if you are comfortable, and receive produce.

Pantries set their own rules, though. If a site does ask for a document, ask whether a piece of mail or a spoken address is enough — many accept that.`,
      es: `**No.** La Despensa Comunitaria de Sábados de Sacred Heart no pide comprobante de domicilio, identificación estatal ni documento de ingresos: las familias se autodeclaran en la mesa de bienvenida. El Mercado Móvil de Second Harvest funciona igual: llega, da tu nombre si te sientes cómodo y recibe productos.

Cada despensa fija sus propias reglas. Si un sitio sí pide un documento, pregunta si basta con una carta recibida o con decir tu dirección en voz alta: muchas lo aceptan.`
    },
    context: [
      { en: 'East San Jose', es: 'Este de San José' },
      { en: 'Food access', es: 'Acceso a alimentos' },
      { en: 'No ID required', es: 'Sin identificación' }
    ],
    links: [
      {
        label: { en: 'Sacred Heart Community Service', es: 'Sacred Heart Community Service' },
        source: { en: 'Sacred Heart Community Service', es: 'Sacred Heart Community Service' },
        url: 'https://www.sacredheartcs.org/'
      },
      {
        label: { en: 'Second Harvest — find food near you', es: 'Second Harvest — encuentra alimentos cerca' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/'
      }
    ],
    nextStep: {
      title: { en: 'Confirm the document policy before you go', es: 'Confirma la política de documentos antes de ir' },
      detail: {
        en: 'Pantry rules differ by site. A two-minute call tells you exactly what to bring — often nothing.',
        es: 'Las reglas cambian según el sitio. Una llamada de dos minutos te dice qué llevar: muchas veces nada.'
      },
      actions: [
        {
          id: 'food-address-save',
          kind: 'save-plan',
          label: { en: 'Save pantry to my plan', es: 'Guardar despensa en mi plan' },
          resourceId: 'res-food-1'
        },
        {
          id: 'food-address-site',
          kind: 'open-link',
          label: { en: 'Open Sacred Heart website', es: 'Abrir el sitio de Sacred Heart' },
          url: 'https://www.sacredheartcs.org/'
        }
      ]
    },
    resourceIds: ['res-food-1'],
    followUpIds: ['ans-food-diapers-formula', 'ans-food-greeting-desk-roleplay']
  },
  {
    id: 'ans-food-diapers-formula',
    topic: 'food',
    question: {
      en: 'Are diapers or infant formula available?',
      es: '¿Tienen pañales o leche infantil?'
    },
    answer: {
      en: `Pantry stock changes every week, and neither the Saturday pantry nor the produce market **guarantees** diapers or infant formula. Diapers usually appear as a separate baby-supplies table when donations allow, in limited sizes. Formula is rarer and may only be available through an infant-specific program.

For formula, the statewide **WIC** program is the reliable route: it provides infant formula and food benefits for pregnant people, new parents, and children under 5. It is a separate program from CalFresh.`,
      es: `El inventario de las despensas cambia cada semana, y ni la despensa del sábado ni el mercado de productos **garantizan** pañales o leche infantil. Los pañales suelen aparecer en una mesa aparte de artículos para bebé cuando hay donaciones, en tallas limitadas. La leche infantil es más escasa y a veces solo se consigue por un programa específico para bebés.

Para la leche infantil, el programa estatal **WIC** es la vía confiable: ofrece fórmula y beneficios de alimentos para personas embarazadas, madres y padres recientes y niños menores de 5 años. Es un programa distinto de CalFresh.`
    },
    context: [
      { en: 'East San Jose', es: 'Este de San José' },
      { en: 'Children under 5', es: 'Niños menores de 5 años' },
      { en: 'Food access', es: 'Acceso a alimentos' }
    ],
    links: [
      {
        label: { en: 'California WIC program', es: 'Programa WIC de California' },
        source: { en: 'California Department of Public Health', es: 'Departamento de Salud Pública de California' },
        url: 'https://www.cdph.ca.gov/Programs/CFH/DWICSN/Pages/Program-Landing1.aspx'
      },
      {
        label: { en: 'Second Harvest — get food', es: 'Second Harvest — obtener alimentos' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/'
      }
    ],
    nextStep: {
      title: { en: 'Mention your children’s ages at the greeting desk', es: 'Menciona las edades de tus hijos en la mesa de bienvenida' },
      detail: {
        en: 'Staff can point you to a baby-supplies table or an infant formula program faster than searching alone.',
        es: 'El personal puede orientarte hacia la mesa de artículos para bebé o a un programa de fórmula más rápido que buscando por tu cuenta.'
      },
      actions: [
        {
          id: 'food-baby-save',
          kind: 'save-plan',
          label: { en: 'Save pantry to my plan', es: 'Guardar despensa en mi plan' },
          resourceId: 'res-food-1'
        },
        {
          id: 'food-baby-wic',
          kind: 'open-link',
          label: { en: 'Open WIC program page', es: 'Abrir la página de WIC' },
          url: 'https://www.cdph.ca.gov/Programs/CFH/DWICSN/Pages/Program-Landing1.aspx'
        }
      ]
    },
    resourceIds: ['res-food-1', 'res-food-2'],
    followUpIds: ['ans-food-greeting-desk-roleplay', 'ans-food-proof-of-address']
  },
  {
    id: 'ans-food-greeting-desk-roleplay',
    topic: 'food',
    question: {
      en: 'Roleplay the greeting desk conversation with me',
      es: 'Ensayar la conversación en la mesa de bienvenida'
    },
    answer: {
      en: `Here is a short script you can say out loud before Saturday:

**Volunteer:** “Good morning! Is this your first time here?”
**You:** “Yes, it’s my first time. I’m here for groceries for my family.”
**Volunteer:** “How many people are in your household?”
**You:** “Four — two adults and two children.”
**Volunteer:** “Any allergies or dietary needs?”
**You:** “No allergies, but we’d use beans, rice, and fresh vegetables.”

You can also ask: “Do you have a baby-supplies table today?” You never need to explain **why** you need food, and you do not need to show ID.`,
      es: `Aquí tienes un guion corto para decirlo en voz alta antes del sábado:

**Voluntario:** “¡Buenos días! ¿Es su primera vez aquí?”
**Tú:** “Sí, es mi primera vez. Vengo por alimentos para mi familia.”
**Voluntario:** “¿Cuántas personas hay en su hogar?”
**Tú:** “Cuatro: dos adultos y dos niños.”
**Voluntario:** “¿Alguna alergia o necesidad alimentaria?”
**Tú:** “Sin alergias, pero nos sirven frijoles, arroz y verduras frescas.”

También puedes preguntar: “¿Hoy tienen mesa de artículos para bebé?” Nunca tienes que explicar **por qué** necesitas alimentos y no necesitas mostrar identificación.`
    },
    context: [
      { en: 'Practice call', es: 'Llamada de práctica' },
      { en: 'East San Jose', es: 'Este de San José' },
      { en: 'No ID required', es: 'Sin identificación' }
    ],
    links: [
      {
        label: { en: 'Sacred Heart Community Service', es: 'Sacred Heart Community Service' },
        source: { en: 'Sacred Heart Community Service', es: 'Sacred Heart Community Service' },
        url: 'https://www.sacredheartcs.org/'
      }
    ],
    nextStep: {
      title: { en: 'Note your household number in your phone', es: 'Apunta el número de personas de tu hogar en el teléfono' },
      detail: {
        en: 'It is the one question you will always be asked: how many people you are feeding.',
        es: 'Es la pregunta que siempre te harán: para cuántas personas son los alimentos.'
      },
      actions: [
        {
          id: 'food-roleplay-save',
          kind: 'save-plan',
          label: { en: 'Save pantry to my plan', es: 'Guardar despensa en mi plan' },
          resourceId: 'res-food-1'
        },
        {
          id: 'food-roleplay-site',
          kind: 'open-link',
          label: { en: 'Open Sacred Heart website', es: 'Abrir el sitio de Sacred Heart' },
          url: 'https://www.sacredheartcs.org/'
        }
      ]
    },
    resourceIds: ['res-food-1'],
    followUpIds: ['ans-food-diapers-formula', 'ans-roleplay-nervous-start']
  },
  {
    id: 'ans-work-edd-impact',
    topic: 'work',
    question: {
      en: 'Will this affect my weekly EDD unemployment check?',
      es: '¿Afectará mis cheques de desempleo semanales?'
    },
    answer: {
      en: `Training does not end unemployment benefits by itself, but you must keep certifying for benefits each week and report that you are in training. Under **California Training Benefits (CTB)**, an approved training program can let you keep weekly benefits while attending school, and you may be excused from the usual weekly job-search log.

The part people miss: approval matters. Ask EDD about CTB when you file or certify — not after the course starts — and keep a copy of the approval in case your certification is questioned later.`,
      es: `La capacitación no termina por sí sola con los beneficios de desempleo, pero debes seguir certificando cada semana e informar que estás en capacitación. Con **California Training Benefits (CTB)**, un programa de estudios aprobado te permite conservar los beneficios semanales mientras estudias y puede eximirte del registro semanal de búsqueda de empleo.

Lo que más se pasa por alto: la aprobación importa. Pregunta al EDD por CTB cuando presentes tu solicitud o tu certificación, no después de empezar el curso, y guarda una copia de la aprobación.`
    },
    context: [
      { en: 'Recent layoff', es: 'Despido reciente' },
      { en: 'EDD weekly benefits', es: 'Beneficios semanales del EDD' },
      { en: 'Free retraining', es: 'Capacitación gratuita' }
    ],
    links: [
      {
        label: { en: 'EDD — California Training Benefits', es: 'EDD — Beneficios de Capacitación de California' },
        source: { en: 'California Employment Development Department', es: 'Departamento de Desarrollo del Empleo de California' },
        url: 'https://edd.ca.gov/en/unemployment/california_training_benefits/'
      },
      {
        label: { en: 'EDD unemployment claims', es: 'Solicitudes de desempleo del EDD' },
        source: { en: 'California Employment Development Department', es: 'Departamento de Desarrollo del Empleo de California' },
        url: 'https://edd.ca.gov/en/unemployment/'
      }
    ],
    nextStep: {
      title: { en: 'Ask EDD about CTB before classes start', es: 'Pregunta al EDD por CTB antes de empezar clases' },
      detail: {
        en: 'CTB approval is what protects your weekly check while you study full time.',
        es: 'La aprobación de CTB es lo que protege tu cheque semanal mientras estudias tiempo completo.'
      },
      actions: [
        {
          id: 'work-edd-link',
          kind: 'open-link',
          label: { en: 'Open EDD training benefits page', es: 'Abrir la página de beneficios de capacitación' },
          url: 'https://edd.ca.gov/en/unemployment/california_training_benefits/'
        },
        {
          id: 'work-edd-save',
          kind: 'save-plan',
          label: { en: 'Save retraining program to my plan', es: 'Guardar el programa en mi plan' },
          resourceId: 'res-work-1'
        }
      ]
    },
    resourceIds: ['res-work-1'],
    followUpIds: ['ans-work-evening-classes', 'ans-work-interview-practice']
  },
  {
    id: 'ans-work-evening-classes',
    topic: 'work',
    question: {
      en: 'Are evening classes available for adults?',
      es: '¿Hay clases nocturnas para adultos?'
    },
    answer: {
      en: `Yes. Most NOVAworks-funded certificate cohorts include an evening or weekend track, because they are built for people working or job-searching during the day. Common evening options are IT support, cybersecurity fundamentals, and cloud operations.

Schedules rotate each quarter, so confirm the current cohort times at orientation rather than relying on an old flyer.`,
      es: `Sí. La mayoría de las cohortes de certificación financiadas por NOVAworks incluyen un horario nocturno o de fin de semana, porque están diseñadas para quienes trabajan o buscan empleo durante el día. Las opciones nocturnas más comunes son soporte técnico, fundamentos de ciberseguridad y operaciones en la nube.

Los horarios cambian cada trimestre, así que confirma las fechas de la cohorte actual en la orientación en lugar de basarte en un folleto antiguo.`
    },
    context: [
      { en: 'Milpitas', es: 'Milpitas' },
      { en: 'Working adults', es: 'Adultos que trabajan' },
      { en: 'Free retraining', es: 'Capacitación gratuita' }
    ],
    links: [
      {
        label: { en: 'NOVAworks career centers', es: 'Centros de carrera NOVAworks' },
        source: { en: 'NOVAworks', es: 'NOVAworks' },
        url: 'https://www.novaworks.org/'
      }
    ],
    nextStep: {
      title: { en: 'Ask for the evening cohort list', es: 'Pide la lista de cohortes nocturnas' },
      detail: {
        en: 'The Wednesday orientation ends with a cohort calendar — ask specifically for evening and weekend tracks.',
        es: 'La orientación del miércoles termina con un calendario de cohortes: pide específicamente los horarios nocturnos y de fin de semana.'
      },
      actions: [
        {
          id: 'work-evening-link',
          kind: 'open-link',
          label: { en: 'Open NOVAworks site', es: 'Abrir el sitio de NOVAworks' },
          url: 'https://www.novaworks.org/'
        },
        {
          id: 'work-evening-save',
          kind: 'save-plan',
          label: { en: 'Save retraining program to my plan', es: 'Guardar el programa en mi plan' },
          resourceId: 'res-work-1'
        }
      ]
    },
    resourceIds: ['res-work-1', 'res-work-2'],
    followUpIds: ['ans-work-interview-practice', 'ans-work-edd-impact']
  },
  {
    id: 'ans-work-interview-practice',
    topic: 'work',
    question: {
      en: 'Practice interview with a career navigator',
      es: 'Practicar entrevista con un asesor laboral'
    },
    answer: {
      en: `A navigator practice interview usually runs 30–45 minutes and covers three questions: a short self-introduction, one example of a problem you solved, and how you handle a busy or stressful shift.

Rehearse alone first:

**Navigator:** “Tell me about yourself.”
**You:** “I worked six years in warehouse operations and was recently laid off. I’m training in IT support, and I’m reliable with schedules and inventory accuracy.”
**Navigator:** “Tell me about a time you fixed a problem.”
**You:** “Our scanner system went down before a shipment. I switched the team to paper counts and reconciled everything before the truck left.”

Keep each answer near 60 seconds and finish with what you want next.`,
      es: `Una entrevista de práctica con un asesor suele durar entre 30 y 45 minutos y cubre tres preguntas: una presentación breve, un ejemplo de un problema que resolviste y cómo manejas un turno ocupado o estresante.

Primero ensaya solo:

**Asesor:** “Cuéntame sobre ti.”
**Tú:** “Trabajé seis años en operaciones de almacén y hace poco me despidieron. Estoy capacitándome en soporte técnico y soy confiable con los horarios y la exactitud del inventario.”
**Asesor:** “Cuéntame de una vez que resolviste un problema.”
**Tú:** “El sistema de escaneo falló antes de un envío. Pasé al equipo a conteos en papel y cuadré todo antes de que saliera el camión.”

Mantén cada respuesta cerca de 60 segundos y cierra con lo que quieres como siguiente paso.`
    },
    context: [
      { en: 'Recent layoff', es: 'Despido reciente' },
      { en: 'Interview practice', es: 'Práctica de entrevista' },
      { en: 'Career navigator', es: 'Asesor laboral' }
    ],
    links: [
      {
        label: { en: 'NOVAworks career services', es: 'Servicios de carrera NOVAworks' },
        source: { en: 'NOVAworks', es: 'NOVAworks' },
        url: 'https://www.novaworks.org/'
      }
    ],
    nextStep: {
      title: { en: 'Book the mock interview after orientation', es: 'Agenda la entrevista simulada después de la orientación' },
      detail: {
        en: 'NOVAworks schedules practice interviews with a navigator. Bring your resume even if it is rough.',
        es: 'NOVAworks agenda entrevistas de práctica con un asesor. Lleva tu currículum aunque esté poco pulido.'
      },
      actions: [
        {
          id: 'work-interview-save',
          kind: 'save-plan',
          label: { en: 'Save career center to my plan', es: 'Guardar el centro de carrera en mi plan' },
          resourceId: 'res-work-1'
        },
        {
          id: 'work-interview-link',
          kind: 'open-link',
          label: { en: 'Open NOVAworks site', es: 'Abrir el sitio de NOVAworks' },
          url: 'https://www.novaworks.org/'
        }
      ]
    },
    resourceIds: ['res-work-1'],
    followUpIds: ['ans-work-edd-impact']
  },
  {
    id: 'ans-college-fafsa-vs-cadaa',
    topic: 'college',
    question: {
      en: 'How do I know whether to submit CADAA or FAFSA?',
      es: '¿Cómo sé si me corresponde CADAA o FAFSA?'
    },
    answer: {
      en: `The choice follows your **federal aid eligibility**, not the school you pick:

- **FAFSA** — for U.S. citizens and eligible noncitizens. This is the application that reaches federal Pell Grants, and it feeds the Cal Grant.
- **CADAA (California Dream Act Application)** — for students who are undocumented or otherwise not eligible for federal aid, including many AB 540 students. It reaches state aid such as Cal Grant and the California College Promise Grant.

Submit **one**, never both. If you are unsure which fits your situation, ask the college financial aid office before you file — asking never affects your admission.`,
      es: `La decisión depende de tu **elegibilidad para ayuda federal**, no de la escuela que elijas:

- **FAFSA** — para ciudadanos estadounidenses y no ciudadanos elegibles. Es la solicitud que da acceso a las Becas Pell federales y alimenta la Beca Cal.
- **CADAA (Solicitud de la Ley Dream de California)** — para estudiantes indocumentados o que no son elegibles para ayuda federal, incluidas muchas personas con estatus AB 540. Da acceso a ayuda estatal como la Beca Cal y el California College Promise Grant.

Presenta **una**, nunca las dos. Si no sabes cuál corresponde a tu situación, pregunta a la oficina de ayuda financiera antes de enviarla: preguntar nunca afecta tu admisión.`
    },
    context: [
      { en: 'College goal', es: 'Meta universitaria' },
      { en: 'Cost & financial aid', es: 'Costo y ayuda financiera' },
      { en: 'Mixed-status family', es: 'Familia de estatus mixto' }
    ],
    links: [
      {
        label: { en: 'Federal Student Aid (FAFSA)', es: 'Ayuda Federal Estudiantil (FAFSA)' },
        source: { en: 'U.S. Department of Education', es: 'Departamento de Educación de EE. UU.' },
        url: 'https://studentaid.gov/'
      },
      {
        label: { en: 'California Dream Act Application', es: 'Solicitud de la Ley Dream de California' },
        source: { en: 'California Student Aid Commission', es: 'Comisión de Ayuda Estudiantil de California' },
        url: 'https://dream.csac.ca.gov/'
      }
    ],
    nextStep: {
      title: { en: 'Confirm your route with a financial aid advisor', es: 'Confirma tu ruta con un asesor de ayuda financiera' },
      detail: {
        en: 'One 15-minute conversation prevents filing the wrong application and losing state aid.',
        es: 'Una conversación de 15 minutos evita presentar la solicitud equivocada y perder ayuda estatal.'
      },
      actions: [
        {
          id: 'college-aid-link',
          kind: 'open-link',
          label: { en: 'Open CADAA application', es: 'Abrir la solicitud CADAA' },
          url: 'https://dream.csac.ca.gov/'
        },
        {
          id: 'college-aid-save',
          kind: 'save-plan',
          label: { en: 'Save College Promise to my plan', es: 'Guardar College Promise en mi plan' },
          resourceId: 'res-work-3'
        }
      ]
    },
    resourceIds: ['res-work-3'],
    followUpIds: ['ans-college-campus-help', 'ans-college-promise-requirements']
  },
  {
    id: 'ans-college-campus-help',
    topic: 'college',
    question: {
      en: 'Can I visit a campus clinic for 1-on-1 help?',
      es: '¿Hay asesoría personalizada en el campus?'
    },
    answer: {
      en: `Yes. Every California community college has a financial aid office with drop-in hours, and many run evening or weekend sessions before the March 2 Cal Grant deadline. Ask for three things:

1. Help submitting FAFSA or CADAA and a check that it was received.
2. A review of your Promise Grant eligibility.
3. A transfer-planning conversation if you already know your intended major.

You do **not** need to be admitted yet to ask questions. Bring an ID if you have one, your family’s income information, and your most recent tax return if available — staff can start without them.`,
      es: `Sí. Todos los community colleges de California tienen una oficina de ayuda financiera con horario de atención sin cita, y muchas abren sesiones vespertinas o de fin de semana antes de la fecha límite de la Beca Cal (2 de marzo). Pide tres cosas:

1. Ayuda para enviar la FAFSA o la CADAA y confirmación de que se recibió.
2. Una revisión de tu elegibilidad para el Promise Grant.
3. Una conversación sobre transferencia si ya sabes qué carrera quieres.

**No** necesitas estar admitido para preguntar. Lleva identificación si la tienes, la información de ingresos de tu familia y tu declaración de impuestos más reciente si está disponible; el personal puede empezar sin ellos.`
    },
    context: [
      { en: 'College goal', es: 'Meta universitaria' },
      { en: '1-on-1 advising', es: 'Asesoría personalizada' },
      { en: 'Cost & financial aid', es: 'Costo y ayuda financiera' }
    ],
    links: [
      {
        label: { en: 'De Anza College financial aid office', es: 'Oficina de ayuda financiera de De Anza College' },
        source: { en: 'De Anza College', es: 'De Anza College' },
        url: 'https://www.deanza.edu/financialaid/'
      },
      {
        label: { en: 'Foothill College financial aid office', es: 'Oficina de ayuda financiera de Foothill College' },
        source: { en: 'Foothill College', es: 'Foothill College' },
        url: 'https://www.foothill.edu/financialaid/'
      }
    ],
    nextStep: {
      title: { en: 'Book a 1-on-1 financial aid appointment', es: 'Agenda una cita individual de ayuda financiera' },
      detail: {
        en: 'Drop-in works, but an appointment gets you a full application review before the deadline.',
        es: 'Puedes llegar sin cita, pero con una cita revisan tu solicitud completa antes de la fecha límite.'
      },
      actions: [
        {
          id: 'college-campus-link',
          kind: 'open-link',
          label: { en: 'Open De Anza financial aid page', es: 'Abrir la página de ayuda financiera de De Anza' },
          url: 'https://www.deanza.edu/financialaid/'
        },
        {
          id: 'college-campus-save',
          kind: 'save-plan',
          label: { en: 'Save student support to my plan', es: 'Guardar apoyo estudiantil en mi plan' },
          resourceId: 'res-comm-2'
        }
      ]
    },
    resourceIds: ['res-work-3', 'res-comm-2'],
    followUpIds: ['ans-college-promise-requirements', 'ans-college-fafsa-vs-cadaa']
  },
  {
    id: 'ans-college-promise-requirements',
    topic: 'college',
    question: {
      en: 'What GPA is required for the Promise grant?',
      es: '¿Qué promedio de calificaciones se requiere?'
    },
    answer: {
      en: `The Foothill–De Anza **College Promise** does not use a GPA cutoff to get in. Its requirements are about residency, timing, and course load:

- California resident (or AB 540 / approved exempt status)
- First-time college student — or returning after a long break, which varies by cohort
- Enrolled **full time**, typically 12+ units per quarter
- FAFSA or CADAA completed, plus the Promise program application itself

To keep it, you need to meet the program’s academic progress standard and finish your units. If your grades slip you are usually asked to meet a counselor rather than dropped immediately — but the program office confirms that each quarter.`,
      es: `El **College Promise** de Foothill–De Anza no usa un promedio mínimo para entrar. Sus requisitos tienen que ver con residencia, momento y carga de cursos:

- Residente de California (o estatus AB 540 / exención aprobada)
- Estudiante de primera vez en la universidad, o de regreso tras un periodo largo (varía por cohorte)
- Inscripción de **tiempo completo**, normalmente 12+ créditos por trimestre
- FAFSA o CADAA completada, más la solicitud del programa Promise

Para conservarlo debes cumplir el estándar de progreso académico y terminar tus créditos. Si bajan tus calificaciones, normalmente te piden hablar con un consejero en lugar de retirarte de inmediato, pero la oficina del programa lo confirma cada trimestre.`
    },
    context: [
      { en: 'College goal', es: 'Meta universitaria' },
      { en: 'Cost & financial aid', es: 'Costo y ayuda financiera' },
      { en: 'Full-time enrollment', es: 'Inscripción de tiempo completo' }
    ],
    links: [
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
      title: { en: 'Check your Promise cohort eligibility before registering', es: 'Revisa tu elegibilidad antes de inscribirte' },
      detail: {
        en: 'Full-time enrollment is the requirement students miss most often. Confirm your unit count with a counselor.',
        es: 'La inscripción de tiempo completo es el requisito que más se pasa por alto. Confirma tu número de créditos con un consejero.'
      },
      actions: [
        {
          id: 'college-promise-link',
          kind: 'open-link',
          label: { en: 'Open De Anza Promise page', es: 'Abrir la página de De Anza Promise' },
          url: 'https://www.deanza.edu/promise/'
        },
        {
          id: 'college-promise-save',
          kind: 'save-plan',
          label: { en: 'Save College Promise to my plan', es: 'Guardar College Promise en mi plan' },
          resourceId: 'res-work-3'
        }
      ]
    },
    resourceIds: ['res-work-3'],
    followUpIds: ['ans-college-campus-help', 'ans-college-fafsa-vs-cadaa']
  }
];
