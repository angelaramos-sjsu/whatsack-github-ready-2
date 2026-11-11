import type { ScriptedAnswer } from './types';

/** Follow-up answers for mental health, senior services and roleplay practice. */
export const supportFollowUpAnswers: ScriptedAnswer[] = [
  {
    id: 'ans-mental-school-privacy',
    topic: 'mental',
    question: {
      en: 'Will my school find out if I text this number?',
      es: '¿Se enterará mi escuela si envío un mensaje?'
    },
    answer: {
      en: `I can't guarantee that a school will never learn about a service you use; privacy depends on the provider, service, and circumstances. California Health & Safety Code § 124260 allows a minor age 12 or older to consent to certain outpatient mental health treatment only when the professional determines the minor is mature enough, and parent or guardian involvement is generally included unless the professional finds it inappropriate. Ask the provider how confidentiality and its limits apply before sharing personal information.`,
      es: `No puedo garantizar que la escuela nunca se entere de un servicio que uses; la privacidad depende del proveedor, el servicio y las circunstancias. El Código de Salud y Seguridad de California § 124260 permite que un menor de 12 años o más dé su consentimiento para ciertos tratamientos ambulatorios de salud mental solo cuando el profesional determina que tiene madurez suficiente; por lo general se incluye a los padres o tutores, salvo que el profesional considere que no es apropiado. Pregunta al proveedor cómo se aplican la confidencialidad y sus límites antes de compartir información personal.`
    },
    context: [
      { en: 'Sunnyvale', es: 'Sunnyvale' },
      { en: 'Confidential care', es: 'Atención confidencial' },
      { en: 'Youth & teen support', es: 'Apoyo para jóvenes' }
    ],
    links: [
      {
        label: { en: 'Health & Safety Code § 124260 (minor consent)', es: 'Código de Salud y Seguridad § 124260 (consentimiento de menores)' },
        source: { en: 'California Legislative Information', es: 'Información Legislativa de California' },
        url: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=HSC&sectionNum=124260'
      },
      {
        label: { en: '988 Suicide & Crisis Lifeline', es: 'Línea 988 de Prevención del Suicidio y Crisis' },
        source: { en: '988 Lifeline', es: 'Línea 988' },
        url: 'https://988lifeline.org/'
      }
    ],
    nextStep: {
      title: { en: 'Ask the provider about confidentiality', es: 'Pregunta al proveedor sobre la confidencialidad' },
      detail: {
        en: 'Privacy practices vary; ask about records, school contact, and exceptions before beginning care.',
        es: 'Las prácticas de privacidad varían; pregunta sobre expedientes, contacto con la escuela y excepciones antes de comenzar la atención.'
      },
      actions: [
        {
          id: 'mental-school-save',
          kind: 'save-plan',
          label: { en: 'Save mental health resources to my plan', es: 'Guardar recursos de salud mental en mi plan' },
          resourceId: 'res-mental-2'
        },
        {
          id: 'mental-school-link',
          kind: 'open-link',
          label: { en: 'Open 988 Lifeline', es: 'Abrir la Línea 988' },
          url: 'https://988lifeline.org/'
        }
      ]
    },
    resourceIds: ['res-mental-2'],
    followUpIds: ['ans-mental-drop-in-what-happens', 'ans-mental-text-practice']
  },
  {
    id: 'ans-mental-drop-in-what-happens',
    topic: 'mental',
    question: {
      en: 'What happens during a drop-in session?',
      es: '¿Qué ocurre al visitar el centro juvenil?'
    },
    answer: {
      en: `I can't verify the hours, check-in process, services, or confidentiality practices of a specific drop-in center from this information. These details vary by provider. Contact the center or Santa Clara County Behavioral Health Services using the official resource below, and ask about age range, appointments, cost, and privacy before visiting.`,
      es: `No puedo confirmar los horarios, el proceso de registro, los servicios ni las prácticas de confidencialidad de un centro específico con esta información. Estos detalles varían según el proveedor. Comunícate con el centro o con los Servicios de Salud Conductual del Condado de Santa Clara mediante el recurso oficial de abajo y pregunta sobre edades, citas, costos y privacidad antes de ir.`
    },
    context: [
      { en: 'Sunnyvale', es: 'Sunnyvale' },
      { en: 'After school hours', es: 'Después de clases' },
      { en: 'Confidential care', es: 'Atención confidencial' }
    ],
    links: [
      {
        label: { en: 'Santa Clara County Behavioral Health Services', es: 'Servicios de Salud Conductual del Condado de Santa Clara' },
        source: { en: 'County of Santa Clara', es: 'Condado de Santa Clara' },
        url: 'https://bhsd.sccgov.org/'
      },
      {
        label: { en: '988 Suicide & Crisis Lifeline', es: 'Línea 988 de Prevención del Suicidio y Crisis' },
        source: { en: '988 Lifeline', es: 'Línea 988' },
        url: 'https://988lifeline.org/'
      }
    ],
    nextStep: {
      title: { en: 'Confirm the center’s current details before visiting', es: 'Confirma los detalles actuales del centro antes de ir' },
      detail: {
        en: 'Ask the provider about hours, eligibility, available services, and confidentiality.',
        es: 'Pregunta al proveedor sobre horarios, requisitos, servicios disponibles y confidencialidad.'
      },
      actions: [
        {
          id: 'mental-dropin-save',
          kind: 'save-plan',
          label: { en: 'Save wellness hub to my plan', es: 'Guardar el centro en mi plan' },
          resourceId: 'res-mental-1'
        },
        {
          id: 'mental-dropin-link',
          kind: 'open-link',
          label: { en: 'Open county behavioral health site', es: 'Abrir el sitio del condado' },
          url: 'https://bhsd.sccgov.org/'
        }
      ]
    },
    resourceIds: ['res-mental-1'],
    followUpIds: ['ans-mental-school-privacy', 'ans-mental-text-practice']
  },
  {
    id: 'ans-mental-text-practice',
    topic: 'mental',
    question: {
      en: 'Can I practice a simulated text chat?',
      es: '¿Puedo ensayar un mensaje de prueba?'
    },
    answer: {
      en: `This is a fictional practice exchange, not a real text conversation or service. For a real text conversation with the 988 Suicide & Crisis Lifeline, use the official contact options at the link below; do not send a practice message to an unverified number.

**You:** I feel stressed and would like someone to listen.
**Listener:** Hi, I’m glad you texted. How are you feeling right now?
**You:** Stressed. Finals, and my family is arguing a lot.
**Listener:** That sounds heavy. Do you want to vent, or would a coping idea help more?
**You:** Something to calm down.
**Listener:** Let’s try one: breathe in for 4, hold for 4, out for 6 — three times. Want to try it with me?

You control the conversation: you can stop, change the subject, or ask for a different kind of support at any point.`,
      es: `Este es un intercambio ficticio para practicar; no es una conversación ni un servicio real. Para conversar por mensaje de texto con la Línea 988 de Prevención del Suicidio y Crisis, usa las opciones oficiales del enlace de abajo; no envíes un mensaje de práctica a un número no verificado.

**Tú:** Me siento estresado y quisiera que alguien me escuchara.
**Oyente:** Hola, me alegra que escribieras. ¿Cómo te sientes en este momento?
**Tú:** Estresado. Exámenes finales y mi familia discute mucho.
**Oyente:** Suena pesado. ¿Quieres desahogarte o prefieres una idea para calmarte?
**Tú:** Algo para calmarme.
**Oyente:** Probemos una: inhala 4, sostén 4, exhala 6, tres veces. ¿Lo intentamos juntos?

Tú controlas la conversación: puedes parar, cambiar de tema o pedir otro tipo de apoyo en cualquier momento.`
    },
    context: [
      { en: 'Youth & teen support', es: 'Apoyo para jóvenes' },
      { en: 'Practice text chat', es: 'Mensaje de práctica' },
      { en: 'Confidential care', es: 'Atención confidencial' }
    ],
    links: [
      {
        label: { en: '988 Suicide & Crisis Lifeline — text & chat', es: 'Línea 988 — texto y chat' },
        source: { en: '988 Lifeline', es: 'Línea 988' },
        url: 'https://988lifeline.org/'
      }
    ],
    nextStep: {
      title: { en: 'Rehearse once before you need it', es: 'Ensaya una vez antes de necesitarlo' },
      detail: {
        en: 'This example is only for practice. Use the official 988 website to confirm how to contact the service.',
        es: 'Este ejemplo es solo para practicar. Usa el sitio oficial de 988 para confirmar cómo comunicarte con el servicio.'
      },
      actions: [
        {
          id: 'mental-practice-save',
          kind: 'save-plan',
          label: { en: 'Save peer line to my plan', es: 'Guardar la línea en mi plan' },
          resourceId: 'res-mental-2'
        },
        {
          id: 'mental-practice-link',
          kind: 'open-link',
          label: { en: 'Open 988 chat options', es: 'Abrir las opciones de chat de 988' },
          url: 'https://988lifeline.org/'
        }
      ]
    },
    resourceIds: ['res-mental-2'],
    followUpIds: ['ans-mental-school-privacy', 'ans-mental-drop-in-what-happens']
  },
  {
    id: 'ans-senior-redi-wheels',
    topic: 'senior',
    question: {
      en: 'How does the door-to-door van work?',
      es: '¿Cómo funciona la camioneta puerta a puerta?'
    },
    answer: {
      en: `SamTrans offers Redi-Wheels paratransit on the bayside and RediCoast on the coastside for people who cannot use some or all fixed-route transit because of a disability. Eligibility and service areas apply, and trips generally need to be scheduled at least one day ahead. I can't promise door pickup or approval; review SamTrans' current service and eligibility information at the official link below.`,
      es: `SamTrans ofrece transporte adaptado Redi-Wheels en la zona de la bahía y RediCoast en la zona costera para personas que no pueden usar parte o todo el transporte de rutas fijas debido a una discapacidad. Aplican requisitos de elegibilidad y zonas de servicio, y por lo general los viajes deben programarse con al menos un día de anticipación. No puedo garantizar recogida en la puerta ni aprobación; consulta la información oficial actual de SamTrans en el enlace de abajo.`
    },
    context: [
      { en: 'Redwood City & North Fair Oaks', es: 'Redwood City y North Fair Oaks' },
      { en: 'Older adults', es: 'Adultos mayores' },
      { en: 'Transportation', es: 'Transporte' }
    ],
    links: [
      {
        label: { en: 'SamTrans Redi-Wheels paratransit', es: 'Transporte Redi-Wheels de SamTrans' },
        source: { en: 'SamTrans', es: 'SamTrans' },
        url: 'https://www.samtrans.com/accessibility/paratransit'
      }
    ],
    nextStep: {
      title: { en: 'Start the Redi-Wheels application by phone', es: 'Inicia la solicitud de Redi-Wheels por teléfono' },
      detail: {
        en: 'Review SamTrans’ current service area, eligibility, and trip-scheduling information before making plans.',
        es: 'Revisa la zona de servicio, elegibilidad e información para programar viajes de SamTrans antes de hacer planes.'
      },
      actions: [
        {
          id: 'senior-van-link',
          kind: 'open-link',
          label: { en: 'Open Redi-Wheels page', es: 'Abrir la página de Redi-Wheels' },
          url: 'https://www.samtrans.com/accessibility/paratransit'
        },
        {
          id: 'senior-van-save',
          kind: 'save-plan',
          label: { en: 'Save senior circle to my plan', es: 'Guardar el círculo en mi plan' },
          resourceId: 'res-comm-1'
        }
      ]
    },
    resourceIds: ['res-comm-1'],
    followUpIds: ['ans-senior-caregiver-companion', 'ans-senior-lunch-menu']
  },
  {
    id: 'ans-senior-caregiver-companion',
    topic: 'senior',
    question: {
      en: 'Can a daughter or caregiver accompany my mother?',
      es: '¿Puede acompañarme mi hija o cuidador?'
    },
    answer: {
      en: `Whether a family member can accompany an older adult depends on the specific program, transportation provider, and visit arrangements. Contact the organization before going to ask about guests, accessibility, transportation, and privacy; I can't confirm the policies of an unverified senior circle.`,
      es: `Que un familiar pueda acompañar a una persona mayor depende del programa, el proveedor de transporte y los arreglos de la visita. Comunícate con la organización antes de ir para preguntar sobre acompañantes, accesibilidad, transporte y privacidad; no puedo confirmar las políticas de un círculo para adultos mayores no verificado.`
    },
    context: [
      { en: 'Older adults', es: 'Adultos mayores' },
      { en: 'Caregiver support', es: 'Apoyo al cuidador' },
      { en: 'Redwood City & North Fair Oaks', es: 'Redwood City y North Fair Oaks' }
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
      title: { en: 'Ask about caregiver accompaniment when you call', es: 'Pregunta por el acompañamiento al llamar' },
      detail: {
        en: 'Ask the program and any transportation provider whether a caregiver may accompany the older adult.',
        es: 'Pregunta al programa y al proveedor de transporte si un cuidador puede acompañar a la persona mayor.'
      },
      actions: [
        {
          id: 'senior-caregiver-save',
          kind: 'save-plan',
          label: { en: 'Save senior circle to my plan', es: 'Guardar el círculo en mi plan' },
          resourceId: 'res-comm-1'
        },
        {
          id: 'senior-caregiver-link',
          kind: 'open-link',
          label: { en: 'Open Redi-Wheels page', es: 'Abrir la página de Redi-Wheels' },
          url: 'https://www.samtrans.com/accessibility/paratransit'
        }
      ]
    },
    resourceIds: ['res-comm-1'],
    followUpIds: ['ans-senior-redi-wheels', 'ans-senior-lunch-menu']
  },
  {
    id: 'ans-senior-lunch-menu',
    topic: 'senior',
    question: {
      en: 'Is there a hot lunch menu available?',
      es: '¿Qué días sirven almuerzo caliente?'
    },
    answer: {
      en: `I can't confirm a menu, meal time, reservation policy, or dietary options for a particular site. Meal services and schedules vary. Contact the local program through the official county resource below to ask whether congregate meals or home-delivered meals are available and what requirements apply.`,
      es: `No puedo confirmar un menú, horario de comida, política de reservaciones ni opciones dietéticas para un lugar específico. Los servicios y horarios varían. Comunícate con el programa local mediante el recurso oficial del condado de abajo para preguntar si hay comidas en grupo o a domicilio y qué requisitos aplican.`
    },
    context: [
      { en: 'Older adults', es: 'Adultos mayores' },
      { en: 'Hot meals', es: 'Almuerzos calientes' },
      { en: 'Spanish-speaking', es: 'En español' }
    ],
    links: [
      {
        label: { en: 'San Mateo County — Food Resources', es: 'Condado de San Mateo — Recursos de alimentos' },
        source: { en: 'San Mateo County', es: 'Condado de San Mateo' },
        url: 'https://www.smcgov.org/hsa/food-resources'
      },
      {
        label: { en: 'Meals on Wheels America — how to find a local program', es: 'Meals on Wheels America — cómo encontrar un programa local' },
        source: { en: 'Meals on Wheels America', es: 'Meals on Wheels America' },
        url: 'https://www.mealsonwheelsamerica.org/'
      }
    ],
    nextStep: {
      title: { en: 'Ask the county about current meal options', es: 'Pregunta al condado sobre opciones de comida actuales' },
      detail: {
        en: 'Confirm current services, schedules, and any requirements directly with the county program.',
        es: 'Confirma directamente con el programa del condado los servicios, horarios y requisitos actuales.'
      },
      actions: [
        {
          id: 'senior-lunch-link',
          kind: 'open-link',
          label: { en: 'Open senior nutrition page', es: 'Abrir la página de nutrición' },
          url: 'https://www.smcgov.org/hsa/food-resources'
        },
        {
          id: 'senior-lunch-save',
          kind: 'save-plan',
          label: { en: 'Save senior lunch to my plan', es: 'Guardar el almuerzo en mi plan' },
          resourceId: 'res-food-3'
        }
      ]
    },
    resourceIds: ['res-food-3'],
    followUpIds: ['ans-senior-redi-wheels', 'ans-senior-caregiver-companion']
  },
  {
    id: 'ans-roleplay-east-sj-groceries',
    topic: 'roleplay',
    question: {
      en: '"I am calling from East San Jose and need groceries for my children"',
      es: '"Llamo del Este de San José y necesito despensa para mis hijos"'
    },
    answer: {
      en: `**[Elena, Intake Specialist]**

*"Thank you — East San Jose, and groceries for your children. That is exactly what our Saturday pantry is for. Let me ask three quick things so I can prepare your bag.*

*First, how many people are in your household? Second, are there any food allergies I should write down? Third, can you come Saturday between 9 and 1, or do you need a weekday option?"*

Try answering in your own words — or ask me what to do if Saturday does not work.`,
      es: `**[Elena, Especialista de Registro]**

*"Gracias: Este de San José y despensa para sus hijos. Eso es precisamente para lo que sirve nuestra despensa del sábado. Permítame tres preguntas rápidas para preparar su bolsa.*

*Primero, ¿cuántas personas hay en su hogar? Segundo, ¿alguna alergia alimentaria que deba anotar? Tercero, ¿puede venir el sábado entre 9 y 1, o necesita una opción entre semana?"*

Intenta responder con tus propias palabras o pregúntame qué hacer si el sábado no te funciona.`
    },
    context: [
      { en: 'Practice call', es: 'Llamada de práctica' },
      { en: 'East San Jose', es: 'Este de San José' },
      { en: 'Food access', es: 'Acceso a alimentos' }
    ],
    links: [
      {
        label: { en: 'Sacred Heart Community Service', es: 'Sacred Heart Community Service' },
        source: { en: 'Sacred Heart Community Service', es: 'Sacred Heart Community Service' },
        url: 'https://www.sacredheartcs.org/'
      }
    ],
    nextStep: {
      title: { en: 'Save the pantry you just rehearsed for', es: 'Guarda la despensa que acabas de ensayar' },
      detail: {
        en: 'With the address in your plan, the practice call turns into a real visit.',
        es: 'Con la dirección en tu plan, la llamada de práctica se convierte en una visita real.'
      },
      actions: [
        {
          id: 'roleplay-food-save',
          kind: 'save-plan',
          label: { en: 'Save pantry to my plan', es: 'Guardar despensa en mi plan' },
          resourceId: 'res-food-1'
        },
        {
          id: 'roleplay-food-link',
          kind: 'open-link',
          label: { en: 'Open pantry website', es: 'Abrir el sitio de la despensa' },
          url: 'https://www.sacredheartcs.org/'
        }
      ]
    },
    resourceIds: ['res-food-1'],
    followUpIds: ['ans-food-proof-of-address', 'ans-food-diapers-formula']
  },
  {
    id: 'ans-roleplay-milpitas-layoff',
    topic: 'roleplay',
    question: {
      en: '"I was laid off from my job in Milpitas and need to learn computers"',
      es: '"Me despidieron de mi trabajo en Milpitas y busco estudiar computación"'
    },
    answer: {
      en: `**[Elena, Intake Specialist]**

*"I am sorry about the layoff — that happens to many people here, and calling was the right step. Milpitas puts you close to our workforce programs.*

*Can I ask two things: when was your last day of work, and are you already receiving unemployment benefits? That tells me whether we can connect your training to California Training Benefits so your weekly check continues while you study."*

Answer however feels natural — there is no wrong way to practice.`,
      es: `**[Elena, Especialista de Registro]**

*"Siento mucho el despido: le pasa a mucha gente aquí y llamar fue el paso correcto. Milpitas está cerca de nuestros programas de empleo.*

*¿Puedo preguntarle dos cosas: cuándo fue su último día de trabajo y si ya recibe beneficios de desempleo? Eso me dice si podemos vincular su capacitación con California Training Benefits para que su cheque semanal continúe mientras estudia."*

Responde como te salga natural: no hay forma incorrecta de practicar.`
    },
    context: [
      { en: 'Practice call', es: 'Llamada de práctica' },
      { en: 'Milpitas', es: 'Milpitas' },
      { en: 'Recent layoff', es: 'Despido reciente' }
    ],
    links: [
      {
        label: { en: 'NOVAworks career centers', es: 'Centros de carrera NOVAworks' },
        source: { en: 'NOVAworks', es: 'NOVAworks' },
        url: 'https://www.novaworks.org/'
      },
      {
        label: { en: 'EDD — California Training Benefits', es: 'EDD — Beneficios de Capacitación de California' },
        source: { en: 'California Employment Development Department', es: 'Departamento de Desarrollo del Empleo de California' },
        url: 'https://edd.ca.gov/en/unemployment/california_training_benefits/'
      }
    ],
    nextStep: {
      title: { en: 'Save the retraining program to your plan', es: 'Guarda el programa de capacitación en tu plan' },
      detail: {
        en: 'The practice call becomes a real application once you have the program details saved.',
        es: 'La llamada de práctica se convierte en solicitud real cuando guardas los datos del programa.'
      },
      actions: [
        {
          id: 'roleplay-work-save',
          kind: 'save-plan',
          label: { en: 'Save retraining program to my plan', es: 'Guardar el programa en mi plan' },
          resourceId: 'res-work-1'
        },
        {
          id: 'roleplay-work-link',
          kind: 'open-link',
          label: { en: 'Open NOVAworks site', es: 'Abrir el sitio de NOVAworks' },
          url: 'https://www.novaworks.org/'
        }
      ]
    },
    resourceIds: ['res-work-1'],
    followUpIds: ['ans-work-edd-impact', 'ans-work-evening-classes']
  },
  {
    id: 'ans-roleplay-nervous-start',
    topic: 'roleplay',
    question: {
      en: '"I feel really nervous and don\'t know where to start"',
      es: '"Estoy nervioso y no sé por dónde empezar"'
    },
    answer: {
      en: `**[Elena, Intake Specialist]**

*"Thank you for telling me that — it is a very common feeling, and nothing about this call is a test. You do not need documents or the right words today.*

*Let's start with one easy question: what is the main thing you need this week — food, someone to talk to, or help with work? We can take the next step from there, at your pace."*

That pause is the technique: name the feeling, remove the pressure, ask one small question.`,
      es: `**[Elena, Especialista de Registro]**

*"Gracias por decírmelo: es una sensación muy común y nada de esta llamada es un examen. Hoy no necesita documentos ni las palabras perfectas.*

*Empecemos con una pregunta sencilla: ¿qué es lo más importante que necesita esta semana: alimentos, alguien con quien hablar o ayuda con el trabajo? De ahí damos el siguiente paso, a su ritmo."*

Esa pausa es la técnica: nombrar la emoción, quitar la presión y hacer una pregunta pequeña.`
    },
    context: [
      { en: 'Practice call', es: 'Llamada de práctica' },
      { en: 'No wrong answers', es: 'Sin respuestas incorrectas' }
    ],
    links: [
      {
        label: { en: '211 — local community services', es: '211 — servicios comunitarios locales' },
        source: { en: 'United Way 211', es: 'United Way 211' },
        url: 'https://www.211.org/'
      }
    ],
    nextStep: {
      title: { en: 'Write down your one question', es: 'Escribe tu única pregunta' },
      detail: {
        en: 'One sentence is enough: what do we need most this week?',
        es: 'Una frase es suficiente: ¿qué necesitamos más esta semana?'
      },
      actions: [
        {
          id: 'roleplay-nervous-save',
          kind: 'save-plan',
          label: { en: 'Save pantry to my plan', es: 'Guardar despensa en mi plan' },
          resourceId: 'res-food-1'
        },
        {
          id: 'roleplay-nervous-link',
          kind: 'open-link',
          label: { en: 'Open 211 services', es: 'Abrir servicios 211' },
          url: 'https://www.211.org/'
        }
      ]
    },
    resourceIds: ['res-food-1'],
    followUpIds: ['ans-roleplay-intake-open', 'ans-mental-school-privacy']
  }
];
