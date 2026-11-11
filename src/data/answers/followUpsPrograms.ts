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
      en: `Requirements vary by food distribution site, so I can't say that proof of address is never needed. Use Second Harvest's Food Locator to find a current location, then check its listing or contact the organization directly to ask what, if anything, to bring before visiting.`,
      es: `Los requisitos varían según el lugar de distribución, así que no puedo decir que nunca se necesite comprobante de domicilio. Usa el Localizador de Alimentos de Second Harvest para encontrar un lugar y revisa su información o comunícate directamente con la organización para preguntar qué debes llevar, si acaso, antes de ir.`
    },
    context: [
      { en: 'East San Jose', es: 'Este de San José' },
      { en: 'Food access', es: 'Acceso a alimentos' },
      { en: 'Confirm site requirements', es: 'Confirma los requisitos del lugar' }
    ],
    links: [
      {
        label: { en: 'Second Harvest — find food near you', es: 'Second Harvest — encuentra alimentos cerca' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/'
      }
    ],
    nextStep: {
      title: { en: 'Confirm the document policy before you go', es: 'Confirma la política de documentos antes de ir' },
      detail: {
        en: 'Requirements differ by site. Confirm them with the organization before you visit.',
        es: 'Los requisitos varían según el lugar. Confírmalos con la organización antes de ir.'
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
          label: { en: 'Open Second Harvest Food Locator', es: 'Abrir el Localizador de Alimentos de Second Harvest' },
          url: 'https://www.shfb.org/get-food/'
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
      en: `I can't verify whether a particular pantry has diapers or infant formula, and availability can vary. **WIC provides nutrition assistance to eligible families with infants and young children.** Contact Santa Clara County WIC to ask about eligibility and current services; do not rely on a pantry having formula in stock.`,
      es: `No puedo confirmar si una despensa específica tiene pañales o fórmula infantil, y la disponibilidad puede variar. **WIC ofrece asistencia de nutrición a familias elegibles con bebés y niños pequeños.** Comunícate con WIC del Condado de Santa Clara para preguntar sobre los requisitos y servicios actuales; no cuentes con que una despensa tenga fórmula disponible.`
    },
    context: [
      { en: 'East San Jose', es: 'Este de San José' },
      { en: 'Children under 5', es: 'Niños menores de 5 años' },
      { en: 'Food access', es: 'Acceso a alimentos' }
    ],
    links: [
      {
        label: { en: 'Santa Clara County WIC', es: 'WIC del Condado de Santa Clara' },
        source: { en: 'Santa Clara County Public Health', es: 'Salud Pública del Condado de Santa Clara' },
        url: 'https://publichealth.sccgov.org/services/women-infants-and-children-wic'
      }
    ],
    nextStep: {
      title: { en: 'Ask WIC about eligibility and services', es: 'Pregunta a WIC sobre requisitos y servicios' },
      detail: {
        en: 'Contact Santa Clara County WIC to ask about eligibility and current nutrition services.',
        es: 'Comunícate con WIC del Condado de Santa Clara para preguntar sobre requisitos y servicios de nutrición actuales.'
      },
      actions: [
        {
          id: 'food-baby-wic',
          kind: 'open-link',
          label: { en: 'Open Santa Clara County WIC', es: 'Abrir WIC del Condado de Santa Clara' },
          url: 'https://publichealth.sccgov.org/services/women-infants-and-children-wic'
        }
      ]
    },
    resourceIds: [],
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
      en: `This is a fictional practice script, not a confirmed pantry intake process or policy. When contacting a real food distribution site, ask what is currently available, whether identification or other documents are requested, and what hours apply:

**You:** “Hello, I’m looking for food assistance for my household. Could you tell me what is available and what I need to know before visiting?”
**Staff:** “I can explain the current details for this location.”
**You:** “Do you require identification or other documents, and what are your current hours?”

You can adapt the wording. Confirm the answers with the organization; this example does not promise that any location has food or accepts a particular document.`,
      es: `Este es un guion ficticio para practicar; no es un proceso ni una política confirmada de una despensa. Cuando te comuniques con un lugar real de distribución de alimentos, pregunta qué hay disponible actualmente, si solicitan identificación u otros documentos y cuáles son los horarios:

**Tú:** “Hola, busco ayuda de alimentos para mi hogar. ¿Podrían decirme qué hay disponible y qué debo saber antes de ir?”
**Personal:** “Puedo explicarte los detalles actuales de este lugar.”
**Tú:** “¿Piden identificación u otros documentos y cuáles son sus horarios actuales?”

Puedes adaptar las palabras. Confirma la información con la organización; este ejemplo no garantiza que haya comida en un lugar ni que acepten un documento específico.`
    },
    context: [
      { en: 'Practice call', es: 'Llamada de práctica' },
      { en: 'East San Jose', es: 'Este de San José' },
      { en: 'Confirm site requirements', es: 'Confirma los requisitos del lugar' }
    ],
    links: [
      {
        label: { en: 'Second Harvest — Food Locator', es: 'Second Harvest — Localizador de Alimentos' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/'
      }
    ],
    nextStep: {
      title: { en: 'Prepare questions for the distribution site', es: 'Prepara preguntas para el lugar de distribución' },
      detail: {
        en: 'Ask about current availability, hours, and requirements; this practice example does not confirm a specific site’s process.',
        es: 'Pregunta sobre disponibilidad, horarios y requisitos actuales; este ejemplo no confirma el proceso de un lugar específico.'
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
          label: { en: 'Open Second Harvest Food Locator', es: 'Abrir el Localizador de Alimentos de Second Harvest' },
          url: 'https://www.shfb.org/get-food/'
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
      en: `**It depends on EDD's decision about California Training Benefits (CTB).** If approved, you must continue certifying for benefits, and EDD says you may not have to be available for work or look for work while in approved training. Contact EDD as soon as possible if interested; report your training start during the week it begins and follow any EDD requests. A training extension has an additional deadline, so check EDD's current rules. Do not assume approval or continued payments.`,
      es: `**Depende de la decisión del EDD sobre California Training Benefits (CTB).** Si te aprueban, debes seguir certificando tus beneficios; el EDD indica que quizá no tengas que estar disponible para trabajar ni buscar trabajo mientras participas en capacitación aprobada. Comunícate con el EDD lo antes posible si te interesa; informa cuándo comienza la capacitación durante la semana de inicio y responde a cualquier solicitud del EDD. La extensión de capacitación tiene un plazo adicional; consulta las reglas actuales. No des por sentada la aprobación ni la continuidad de pagos.`
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
        en: 'Only EDD can determine whether CTB applies to your claim. Review the current rules and contact EDD promptly.',
        es: 'Solo el EDD puede determinar si CTB aplica a tu reclamo. Revisa las reglas actuales y comunícate con el EDD pronto.'
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
      en: `I can't verify that NOVAworks or a particular training provider currently offers evening classes. Schedules depend on the program and cohort. Check NOVAworks' current training information and ask the provider directly about evening or weekend options before enrolling.`,
      es: `No puedo confirmar que NOVAworks o un proveedor específico ofrezca clases nocturnas actualmente. Los horarios dependen del programa y la cohorte. Revisa la información vigente de capacitación de NOVAworks y pregunta directamente al proveedor si hay opciones nocturnas o de fin de semana antes de inscribirte.`
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
        en: 'Ask NOVAworks and the training provider which schedules are currently offered; do not rely on an old cohort listing.',
        es: 'Pregunta a NOVAworks y al proveedor qué horarios ofrecen actualmente; no te bases en una lista antigua de cohortes.'
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
    resourceIds: ['res-work-1'],
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
      en: `This is a **practice exercise**, not a confirmed NOVAworks appointment or official interview format. You can rehearse a brief introduction, one example of a problem you solved, and how you handle a busy or stressful situation:

**Navigator:** “Tell me about yourself.”
**You:** “I worked six years in warehouse operations and was recently laid off. I’m training in IT support, and I’m reliable with schedules and inventory accuracy.”
**Navigator:** “Tell me about a time you fixed a problem.”
**You:** “Our scanner system went down before a shipment. I switched the team to paper counts and reconciled everything before the truck left.”

Keep each answer concise and finish with what you want next. Contact NOVAworks directly to ask whether a career navigator offers interview practice.`,
      es: `Este es un **ejercicio de práctica**, no una cita confirmada con NOVAworks ni un formato oficial de entrevista. Puedes ensayar una breve presentación, un ejemplo de un problema que resolviste y cómo manejas una situación ocupada o estresante:

**Asesor:** “Cuéntame sobre ti.”
**Tú:** “Trabajé seis años en operaciones de almacén y hace poco me despidieron. Estoy capacitándome en soporte técnico y soy confiable con los horarios y la exactitud del inventario.”
**Asesor:** “Cuéntame de una vez que resolviste un problema.”
**Tú:** “El sistema de escaneo falló antes de un envío. Pasé al equipo a conteos en papel y cuadré todo antes de que saliera el camión.”

Mantén cada respuesta breve y cierra con lo que quieres como siguiente paso. Comunícate directamente con NOVAworks para preguntar si ofrecen práctica de entrevistas con un asesor.`
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
      title: { en: 'Ask NOVAworks about interview practice', es: 'Pregunta a NOVAworks sobre práctica de entrevistas' },
      detail: {
        en: 'Ask whether this service is currently available and what to bring.',
        es: 'Pregunta si este servicio está disponible actualmente y qué debes llevar.'
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
      en: `The choice depends on the aid you may qualify for and your circumstances:

- **FAFSA** is used to apply for federal student aid and may also be used for state or campus aid.
- **CADAA (California Dream Act Application)** is for eligible students who cannot receive federal student aid but may qualify for California aid.

The rules can depend on immigration, residency, and other factors. I can't determine which application is right for you; check the official application guidance or ask a college financial aid office before filing.`,
      es: `La decisión depende de la ayuda para la que podrías calificar y de tus circunstancias:

- **FAFSA** se usa para solicitar ayuda federal para estudiantes y también puede servir para ayuda estatal o del campus.
- **CADAA (Solicitud de la Ley Dream de California)** es para estudiantes elegibles que no pueden recibir ayuda federal, pero quizá califiquen para ayuda de California.

Las reglas pueden depender de inmigración, residencia y otros factores. No puedo determinar qué solicitud te corresponde; revisa la guía oficial o pregunta en la oficina de ayuda financiera antes de presentarla.`
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
        en: 'Ask which application fits your circumstances; eligibility decisions come from the official aid program.',
        es: 'Pregunta cuál solicitud corresponde a tus circunstancias; la decisión de elegibilidad corresponde al programa oficial.'
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
      en: `If you mean one-on-one financial aid or counseling help, contact the college office directly; this is not a medical clinic. Appointment and drop-in formats vary by campus and date. De Anza currently posts its own office hours and appointment information on the official page below. Ask the college what to bring and whether help with FAFSA, CADAA, or Promise programs is available.`,
      es: `Si te refieres a asesoría individual de ayuda financiera o académica, comunícate directamente con la oficina del colegio; no es una clínica médica. Las citas y la atención sin cita varían según el campus y la fecha. De Anza publica sus horarios e información de citas en la página oficial de abajo. Pregunta qué debes llevar y si ofrecen ayuda con FAFSA, CADAA o programas Promise.`
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
      title: { en: 'Check the college office’s current help options', es: 'Revisa las opciones actuales de ayuda del colegio' },
      detail: {
        en: 'Use the official campus page to confirm whether appointments or drop-in help are currently available.',
        es: 'Usa la página oficial del campus para confirmar si actualmente hay citas o atención sin cita.'
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
    resourceIds: [],
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
      en: `There is no single GPA rule for every program called “Promise.” For the **De Anza College Promise beginning Fall 2026**, De Anza says students must maintain at least a **2.0 GPA** and remain enrolled in at least 12 units per quarter (with a stated disability accommodation). Foothill has its own cohort requirements, which can differ. These campus Promise programs are also distinct from the California College Promise Grant fee waiver. Check the official page for your college and entry year before relying on a GPA or eligibility rule.`,
      es: `No existe una sola regla de promedio para todos los programas llamados “Promise”. Para **De Anza College Promise desde otoño de 2026**, De Anza indica que los estudiantes deben mantener un promedio mínimo de **2.0** y seguir inscritos en al menos 12 unidades por trimestre (con una excepción indicada para adaptaciones por discapacidad). Foothill tiene requisitos propios que pueden ser distintos. Estos programas Promise del campus también son diferentes de la exención California College Promise Grant. Revisa la página oficial de tu colegio y año de ingreso antes de confiar en un requisito de promedio o elegibilidad.`
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
        en: 'For De Anza’s Fall 2026 cohort, the posted minimum is 2.0 to maintain eligibility. Confirm the rule for your own campus and cohort.',
        es: 'Para la cohorte de otoño de 2026 de De Anza, el mínimo publicado para mantener la elegibilidad es 2.0. Confirma la regla de tu campus y cohorte.'
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
