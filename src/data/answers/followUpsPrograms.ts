import type { ScriptedAnswer } from './types';

/** Follow-up answers for food, workforce and college questions. */
export const programFollowUpAnswers: ScriptedAnswer[] = [

  {
    id: 'ans-food-proof-of-address',
    topic: 'food',
    question: {
      en: 'Do I need an ID or proof of address?',
      es: '¿Necesito identificación o comprobante de domicilio?'
    },
    answer: {
      en: `**You can still get food. Not having a photo ID usually is not what stops a food pickup — but identification and proof of address are two different requests, so it helps to know which one a program is asking for.**

**Free groceries**
- Second Harvest's Food Locator lets you filter for sites marked **“No documents required,”** and every listing includes a phone number, so you can call and ask what that specific site wants before you go. Food Connection: **1-800-984-3663**.
- Sacred Heart asks Santa Clara County residents to **register online** before the first visit, with a form in Spanish. That page links the registration forms; it does not list documents you must bring, so ask when you register.

**CalFresh is a separate process**
- **Identification** answers “who are you.” During verification a county worker may ask for it — a driver's license, passport, or consular ID are common examples — along with proof of income.
- **Proof of address** answers “where do you live,” and it is a separate requirement. CalFresh asks about your household and housing costs, which is not the same as a photo ID.
- You can send documents after you apply, and if you cannot get one, tell your county worker: a signed, dated written statement explaining your situation is generally accepted.

**Next step:** open the Food Locator and filter for sites that ask for no documents, or use the CalFresh help page if your question is about an application.`,
      es: `**Usted sí puede recibir alimentos. Por lo general, no tener una identificación con foto no impide recoger comida, pero la identificación y el comprobante de domicilio son dos solicitudes distintas, así que conviene saber cuál pide cada programa.**

**Alimentos gratuitos**
- El Localizador de Alimentos de Second Harvest permite filtrar los sitios marcados como **“No documents required”** (no se requieren documentos), y cada listado incluye un teléfono para llamar y preguntar qué pide ese sitio antes de ir. Food Connection: **1-800-984-3663**.
- Sacred Heart pide a los residentes del Condado de Santa Clara **registrarse en línea** antes de la primera visita, con formulario en español. Esa página enlaza los formularios de registro y no presenta una lista de documentos que deba llevar; pregunta al registrarse.

**CalFresh es un trámite aparte**
- La **identificación** responde “quién es usted”. Durante la verificación, el condado puede pedirla —una licencia de conducir, un pasaporte o una matrícula consular son ejemplos comunes— junto con comprobante de ingresos.
- El **comprobante de domicilio** responde “dónde vive” y es un requisito aparte. CalFresh pregunta por su hogar y sus gastos de vivienda, lo cual no es lo mismo que una identificación con foto.
- Puede entregar documentos después de solicitar, y si no puede conseguir uno, dígaselo a su trabajador del condado: por lo general se acepta una declaración escrita, firmada y con fecha, que explique su situación.

**Siguiente paso:** abre el Localizador de Alimentos y filtra los sitios que no piden documentos, o usa la página de ayuda de CalFresh si su pregunta es sobre una solicitud.`
    },
    context: [
      { en: 'Food access', es: 'Acceso a alimentos' },
      { en: 'ID vs. proof of address', es: 'Identificación vs. domicilio' },
      { en: 'Santa Clara & San Mateo counties', es: 'Condados de Santa Clara y San Mateo' }
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
      },
      {
        label: { en: 'Second Harvest — CalFresh help and application', es: 'Second Harvest — ayuda y solicitud de CalFresh' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/calfresh/'
      }
    ],
    nextStep: {
      title: { en: 'Filter for sites that ask for no documents', es: 'Filtra los sitios que no piden documentos' },
      detail: {
        en: 'Open the Food Locator, turn on the “No documents required” filter, and call the number in the listing to confirm what that site asks for.',
        es: 'Abre el Localizador de Alimentos, activa el filtro de sitios que no piden documentos y llama al número del listado para confirmar qué pide ese sitio.'
      },
      actions: [
        {
          id: 'food-address-site',
          kind: 'open-link',
          label: { en: 'Open the Food Locator', es: 'Abrir el Localizador de Alimentos' },
          url: 'https://www.shfb.org/get-food/'
        },
        {
          id: 'food-address-save',
          kind: 'save-plan',
          label: { en: 'Save the Sacred Heart food program', es: 'Guardar el programa de alimentos de Sacred Heart' },
          resourceId: 'res-food-1'
        }
      ]
    },
    resourceIds: ['res-food-1'],
    followUpIds: ['ans-food-calfresh-help', 'ans-food-diapers-formula']
  },
  {
    id: 'ans-food-diapers-formula',
    topic: 'food',
    question: {
      en: 'Are diapers or infant formula available?',
      es: '¿Tienen pañales o leche infantil?'
    },
    answer: {
      en: `**No pantry guarantees diapers or infant formula.** Supplies depend on what was donated that week, so ask the site directly — the Food Locator lists a contact number for each distribution.

For infant formula, **WIC** is the reliable route. WIC serves pregnant and postpartum women, infants, and children up to age 5, and it is a separate program from CalFresh. Apply through your county WIC office.`,
      es: `**Ninguna despensa garantiza pañales ni leche infantil.** Los suministros dependen de lo que se donó esa semana, así que pregunta directamente en el sitio — el Localizador de Alimentos incluye un número de contacto para cada distribución.

Para la leche infantil, **WIC** es la vía confiable. WIC atiende a personas embarazadas y en posparto, bebés y niños hasta los 5 años, y es un programa distinto de CalFresh. Solicítalo en la oficina de WIC de tu condado.`
    },
    context: [
      { en: 'Children under 5', es: 'Niños menores de 5 años' },
      { en: 'Food access', es: 'Acceso a alimentos' },
      { en: 'WIC', es: 'WIC' }
    ],
    links: [
      {
        label: { en: 'Santa Clara County WIC', es: 'WIC del Condado de Santa Clara' },
        source: { en: 'Santa Clara County Public Health', es: 'Salud Pública del Condado de Santa Clara' },
        url: 'https://publichealth.sccgov.org/services/women-infants-and-children-wic'
      },
      {
        label: { en: 'San Mateo County WIC', es: 'WIC del Condado de San Mateo' },
        source: { en: 'San Mateo County Health', es: 'San Mateo County Health' },
        url: 'https://www.smchealth.org/wic'
      },
      {
        label: { en: 'Second Harvest — Food Locator', es: 'Second Harvest — Localizador de Alimentos' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/'
      }
    ],
    nextStep: {
      title: { en: 'Start with your county WIC office', es: 'Empieza en la oficina de WIC de tu condado' },
      detail: {
        en: 'WIC is separate from CalFresh and covers infant formula. The Food Locator listing tells you whom to ask about diapers at a specific site.',
        es: 'WIC es distinto de CalFresh y cubre la leche infantil. El listado del Localizador te dice a quién preguntar por pañales en un sitio específico.'
      },
      actions: [
        {
          id: 'food-baby-wic',
          kind: 'open-link',
          label: { en: 'Open Santa Clara County WIC', es: 'Abrir WIC del Condado de Santa Clara' },
          url: 'https://publichealth.sccgov.org/services/women-infants-and-children-wic'
        },
        {
          id: 'food-baby-save',
          kind: 'save-plan',
          label: { en: 'Save the Food Locator', es: 'Guardar el Localizador de Alimentos' },
          resourceId: 'res-food-2'
        }
      ]
    },
    resourceIds: ['res-food-2'],
    followUpIds: ['ans-food-greeting-desk-roleplay', 'ans-food-calfresh-help']
  },
  {
    id: 'ans-food-greeting-desk-roleplay',
    topic: 'food',
    question: {
      en: 'Roleplay the greeting desk conversation with me',
      es: 'Ensayar la conversación en la mesa de bienvenida'
    },
    answer: {
      en: `Here is a short script you can say out loud before your first pantry visit:

**Volunteer:** “Good morning! Is this your first time here?”
**You:** “Yes, it's my first time. I'm here for groceries for my family.”
**Volunteer:** “How many people are in your household?”
**You:** “Four — two adults and two children.”
**Volunteer:** “Any allergies or dietary needs?”
**You:** “No allergies, but we'd use beans, rice, and fresh vegetables.”

You can also ask: “What do I need to bring today?” You never have to explain why you need food. If a site asks for documents, ask what it accepts before your visit.`,
      es: `Aquí tienes un guion corto para decirlo en voz alta antes de tu primera visita a una despensa:

**Voluntario:** “¡Buenos días! ¿Es su primera vez aquí?”
**Tú:** “Sí, es mi primera vez. Vengo por alimentos para mi familia.”
**Voluntario:** “¿Cuántas personas hay en su hogar?”
**Tú:** “Cuatro: dos adultos y dos niños.”
**Voluntario:** “¿Alguna alergia o necesidad alimentaria?”
**Tú:** “Sin alergias, pero nos sirven frijoles, arroz y verduras frescas.”

También puedes preguntar: “¿Qué necesito traer hoy?” Nunca tienes que explicar por qué necesitas alimentos. Si un sitio pide documentos, pregunta qué acepta antes de tu visita.`
    },
    context: [
      { en: 'Practice call', es: 'Llamada de práctica' },
      { en: 'Food access', es: 'Acceso a alimentos' },
      { en: 'No need to explain why', es: 'No hace falta explicar por qué' }
    ],
    links: [
      {
        label: { en: 'Sacred Heart Community Service — Food Program', es: 'Sacred Heart Community Service — Programa de Alimentos' },
        source: { en: 'Sacred Heart Community Service', es: 'Sacred Heart Community Service' },
        url: 'https://www.sacredheartcs.org/programs-food-clothing'
      },
      {
        label: { en: 'Second Harvest — Food Locator', es: 'Second Harvest — Localizador de Alimentos' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/'
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
          label: { en: 'Save the Sacred Heart food program', es: 'Guardar el programa de alimentos de Sacred Heart' },
          resourceId: 'res-food-1'
        },
        {
          id: 'food-roleplay-site',
          kind: 'open-link',
          label: { en: 'Open the Sacred Heart food page', es: 'Abrir la página de alimentos de Sacred Heart' },
          url: 'https://www.sacredheartcs.org/programs-food-clothing'
        }
      ]
    },
    resourceIds: ['res-food-1'],
    followUpIds: ['ans-food-diapers-formula', 'ans-roleplay-nervous-start']
  },
  {
    id: 'ans-food-calfresh-help',
    topic: 'food',
    question: {
      en: 'Get CalFresh application help',
      es: 'Obtener ayuda con la solicitud de CalFresh'
    },
    answer: {
      en: `**CalFresh (also called SNAP, EBT or food stamps) puts money on an EBT card each month to buy food at most stores, farmers markets, and online.**

**First time applying?** There is no application fee and no deadline — you can apply at any point in the year, and it is fine to apply again if you were turned down before.

Second Harvest of Silicon Valley's CalFresh page explains who may qualify and offers free help with the application: you can request a call from their Food Connection team in your language, or apply on your own through BenefitsCal. Eligibility depends on household size and income, and U.S.-born children may qualify no matter where their parents were born. Second Harvest is not a government agency.`,
      es: `**CalFresh (también llamado SNAP, EBT o cupones de alimentos) deposita dinero cada mes en una tarjeta EBT para comprar comida en la mayoría de las tiendas, mercados de agricultores y en línea.**

**¿Es su primera solicitud?** No hay costo ni fecha límite: puede solicitar en cualquier momento del año, y no hay problema en volver a solicitar si antes le negaron el beneficio.

La página de CalFresh de Second Harvest of Silicon Valley explica quién puede calificar y ofrece ayuda gratuita con la solicitud: puedes pedir que te llame su equipo Food Connection en tu idioma o solicitar por tu cuenta a través de BenefitsCal. La elegibilidad depende del tamaño del hogar y de los ingresos, y los hijos nacidos en Estados Unidos pueden calificar sin importar dónde nacieron sus padres. Second Harvest no es una agencia de gobierno.`
    },
    context: [
      { en: 'CalFresh / SNAP', es: 'CalFresh / SNAP' },
      { en: 'Application help', es: 'Ayuda con la solicitud' },
      { en: 'Santa Clara & San Mateo counties', es: 'Condados de Santa Clara y San Mateo' }
    ],
    links: [
      {
        label: { en: 'Second Harvest — CalFresh help and application', es: 'Second Harvest — ayuda y solicitud de CalFresh' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/calfresh/'
      },
      {
        label: { en: 'BenefitsCal — apply for CalFresh', es: 'BenefitsCal — solicitar CalFresh' },
        source: { en: 'State of California', es: 'Estado de California' },
        url: 'https://benefitscal.com/'
      }
    ],
    nextStep: {
      title: { en: 'Use the free CalFresh help page', es: 'Usa la página gratuita de ayuda de CalFresh' },
      detail: {
        en: 'Second Harvest can answer questions and help you apply in your language. BenefitsCal is the official application site.',
        es: 'Second Harvest puede responder preguntas y ayudarte a solicitar en tu idioma. BenefitsCal es el sitio oficial de solicitud.'
      },
      actions: [
        {
          id: 'food-calfresh-site',
          kind: 'open-link',
          label: { en: 'Open CalFresh help', es: 'Abrir la ayuda de CalFresh' },
          url: 'https://www.shfb.org/get-food/calfresh/'
        },
        {
          id: 'food-calfresh-apply',
          kind: 'open-link',
          label: { en: 'Open BenefitsCal', es: 'Abrir BenefitsCal' },
          url: 'https://benefitscal.com/'
        }
      ]
    },
    followUpIds: ['ans-food-east-sj-groceries', 'ans-food-proof-of-address']
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
