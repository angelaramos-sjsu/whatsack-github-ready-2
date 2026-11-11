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
      en: `**No.** A peer crisis text line is not connected to your school, and texting it does not generate a school record. California’s minor-consent law (Health & Safety Code § 124260) also lets youth 12 and older consent to outpatient mental health counseling confidentially.

The one limit is immediate safety: if a listener believes you are in danger, they are required to act to keep you safe, and they will tell you that plainly instead of reporting quietly.`,
      es: `**No.** Una línea de texto de apoyo entre pares no está conectada con tu escuela y escribirle no genera un expediente escolar. La ley de consentimiento de menores de California (Código de Salud y Seguridad § 124260) también permite que jóvenes de 12 años en adelante consientan consejería ambulatoria de forma confidencial.

El único límite es la seguridad inmediata: si quien te escucha cree que estás en peligro, tiene la obligación de actuar para protegerte y te lo dirá con claridad, sin reportarlo en silencio.`
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
      title: { en: 'Save the line under a neutral name', es: 'Guarda la línea con un nombre neutro' },
      detail: {
        en: 'A name like “Peer Line” keeps the message private if someone else picks up your phone.',
        es: 'Un nombre como “Apoyo Amigo” mantiene el mensaje privado si alguien más toma tu teléfono.'
      },
      actions: [
        {
          id: 'mental-school-save',
          kind: 'save-plan',
          label: { en: 'Save peer line to my plan', es: 'Guardar la línea en mi plan' },
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
      en: `A drop-in session is designed to be low-pressure. A typical visit:

1. **Check in at the front desk** — a first name is enough; no insurance card, no school paperwork.
2. **Choose your room** — art and music space, a quiet sensory pod, or a 1-on-1 talk with a peer listener.
3. **Leave whenever you want** — most visits run 30–60 minutes.

Staff are trained youth workers, the 1-on-1 conversation is confidential, and you do not need a diagnosis or a reason to be there.`,
      es: `Una visita sin cita está pensada para ser de baja presión. Así suele ser:

1. **Regístrate en recepción** — basta un nombre; no piden seguro médico ni papeles de la escuela.
2. **Elige tu espacio** — sala de arte y música, zona sensorial tranquila o una charla individual con un oyente par.
3. **Sal cuando quieras** — la mayoría de las visitas duran entre 30 y 60 minutos.

El personal está capacitado para trabajar con jóvenes, la conversación individual es confidencial y no necesitas un diagnóstico ni una razón para estar ahí.`
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
      title: { en: 'Pick an after-school time and walk in', es: 'Elige un horario después de clases y entra' },
      detail: {
        en: 'Drop-in hours are usually 3:00–7:30 PM. Going with a friend can make the first visit easier.',
        es: 'El horario sin cita suele ser de 3:00 a 7:30 PM. Ir con alguien de confianza puede facilitar la primera visita.'
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
      en: `Yes — here is a practice exchange you can rehearse:

**You:** HOPE
**Listener:** Hi, I’m glad you texted. How are you feeling right now?
**You:** Stressed. Finals, and my family is arguing a lot.
**Listener:** That sounds heavy. Do you want to vent, or would a coping idea help more?
**You:** Something to calm down.
**Listener:** Let’s try one: breathe in for 4, hold for 4, out for 6 — three times. Want to try it with me?

You control the conversation: you can stop, change the subject, or ask for a different kind of support at any point.`,
      es: `Sí, aquí tienes un intercambio para ensayar:

**Tú:** HOPE
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
        en: 'Sending a practice message lowers the barrier on a hard day.',
        es: 'Enviar un mensaje de práctica reduce la barrera en un día difícil.'
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
      en: `**SamTrans Redi-Wheels** is a shared-ride paratransit van for people who cannot reliably use regular buses. How it works:

- You apply once by phone and complete an eligibility interview — a family member or the senior center can be on the call with you.
- Once approved, you call to reserve each ride, usually at least one day ahead.
- The van picks you up at your door and drops you at the address you gave.

It is not a taxi: rides are shared and pickup times come in a window. What it solves is the walk to the bus stop.`,
      es: `**SamTrans Redi-Wheels** es una camioneta de transporte compartido para personas que no pueden usar el autobús regular de forma confiable. Así funciona:

- Se solicita una vez por teléfono y se hace una entrevista de elegibilidad; un familiar o el centro de adultos mayores puede acompañarte en la llamada.
- Una vez aprobado, llamas para reservar cada viaje, normalmente con al menos un día de anticipación.
- La camioneta te recoge en la puerta de tu casa y te deja en la dirección que indiques.

No es un taxi: los viajes son compartidos y la hora de recogida es dentro de un rango. Lo que resuelve es el camino hasta la parada.`
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
        url: 'https://www.samtrans.com/accessibility/rediwheels'
      }
    ],
    nextStep: {
      title: { en: 'Start the Redi-Wheels application by phone', es: 'Inicia la solicitud de Redi-Wheels por teléfono' },
      detail: {
        en: 'The application and eligibility interview happen by phone, and someone can join the call to help.',
        es: 'La solicitud y la entrevista de elegibilidad son por teléfono, y alguien puede acompañarte en la llamada.'
      },
      actions: [
        {
          id: 'senior-van-link',
          kind: 'open-link',
          label: { en: 'Open Redi-Wheels page', es: 'Abrir la página de Redi-Wheels' },
          url: 'https://www.samtrans.com/accessibility/rediwheels'
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
      en: `Yes. Family members and caregivers are welcome at senior circles, and being accompanied is common on a first visit. Two useful jobs for you that day:

1. Help with check-in and the transportation application.
2. Stay for the first hour so the visit feels familiar, then step out.

If your mother prefers attending alone, staff can call you at pickup time. Ask staff before sharing medical details — the center keeps attendance and health information private.`,
      es: `Sí. Los familiares y cuidadores son bienvenidos en los círculos de adultos mayores, y acompañar a alguien en su primera visita es muy común. Dos tareas útiles ese día:

1. Ayudar con el registro y con la solicitud de transporte.
2. Quedarte la primera hora para que la visita se sienta familiar y luego retirarte.

Si tu mamá prefiere asistir sola, el personal puede llamarte a la hora de la salida. Pregunta al personal antes de compartir datos médicos: el centro mantiene privada la información de asistencia y salud.`
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
        url: 'https://www.samtrans.com/accessibility/rediwheels'
      },
      {
        label: { en: 'Santa Clara County Aging & Adult Services', es: 'Servicios para Personas Mayores y Adultos del Condado de Santa Clara' },
        source: { en: 'County of Santa Clara', es: 'Condado de Santa Clara' },
        url: 'https://ssa.sccgov.org/'
      }
    ],
    nextStep: {
      title: { en: 'Ask about caregiver accompaniment when you call', es: 'Pregunta por el acompañamiento al llamar' },
      detail: {
        en: 'Staff can confirm guest seating, accessibility, and whether a caregiver may ride along.',
        es: 'El personal puede confirmar los asientos para acompañantes, la accesibilidad y si un cuidador puede viajar con la persona.'
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
          url: 'https://www.samtrans.com/accessibility/rediwheels'
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
      en: `Senior circles usually serve a hot lunch at midday, and menus rotate weekly. Expect simple, culturally familiar meals — soups, rice and beans, chicken or fish, fruit, and coffee.

Ask two things when you call: whether lunch needs a reservation, and whether a vegetarian or low-sodium plate is available. Many county senior nutrition programs also deliver to homebound seniors, with eligibility based on age and mobility rather than income alone.`,
      es: `Los círculos de adultos mayores suelen servir un almuerzo caliente al mediodía y los menús cambian cada semana. Son comidas sencillas y familiares: sopas, arroz con frijoles, pollo o pescado, fruta y café.

Pregunta dos cosas al llamar: si el almuerzo requiere reservación y si hay plato vegetariano o bajo en sodio. Muchos programas de nutrición para adultos mayores también entregan a domicilio a personas que no pueden salir; la elegibilidad depende de la edad y la movilidad, no solo del ingreso.`
    },
    context: [
      { en: 'Older adults', es: 'Adultos mayores' },
      { en: 'Hot meals', es: 'Almuerzos calientes' },
      { en: 'Spanish-speaking', es: 'En español' }
    ],
    links: [
      {
        label: { en: 'Santa Clara County Senior Nutrition Program', es: 'Programa de Nutrición para Adultos Mayores del Condado de Santa Clara' },
        source: { en: 'County of Santa Clara', es: 'Condado de Santa Clara' },
        url: 'https://ssa.sccgov.org/'
      },
      {
        label: { en: 'Meals on Wheels America — how to find a local program', es: 'Meals on Wheels America — cómo encontrar un programa local' },
        source: { en: 'Meals on Wheels America', es: 'Meals on Wheels America' },
        url: 'https://www.mealsonwheelsamerica.org/'
      }
    ],
    nextStep: {
      title: { en: 'Reserve a lunch plate before the first visit', es: 'Reserva un almuerzo antes de la primera visita' },
      detail: {
        en: 'Some sites cap lunch counts; a same-week call reserves a plate.',
        es: 'Algunos sitios tienen cupo limitado; una llamada en la misma semana reserva el plato.'
      },
      actions: [
        {
          id: 'senior-lunch-link',
          kind: 'open-link',
          label: { en: 'Open senior nutrition page', es: 'Abrir la página de nutrición' },
          url: 'https://ssa.sccgov.org/'
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

*"Thank you — East San Jose, and groceries for your children. Let me ask three quick things so I can help you find the right site.*

*First, how many people are in your household? Second, are there any food allergies I should write down? Third, which days and times work for you, so I can check the current distributions near you?"*

Try answering in your own words — or ask me what to do if a site asks for documents.`,
      es: `**[Elena, Especialista de Registro]**

*"Gracias: Este de San José y despensa para sus hijos. Permítame tres preguntas rápidas para ayudarle a encontrar el sitio adecuado.*

*Primero, ¿cuántas personas hay en su hogar? Segundo, ¿alguna alergia alimentaria que deba anotar? Tercero, ¿qué días y horarios le funcionan, para revisar las distribuciones actuales cerca de usted?"*

Intenta responder con tus propias palabras o pregúntame qué hacer si un sitio pide documentos.`
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
