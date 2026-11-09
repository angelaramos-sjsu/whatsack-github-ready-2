import type { ScriptedAnswer } from './types';

/**
 * Sara's nine-stage college affordability conversation.
 *
 * Every stage is one approved scripted answer. Each follow-up button on a stage
 * points at exactly one other stage here, so a click continues the same
 * conversation with its own matching reply — never a generic fallback.
 * The final stage closes the journey with three NextStep Insight actions and
 * official resource links.
 */
export const saraCollegeStageIds = {
  start: 'ans-sara-college-start',
  nearby: 'ans-sara-nearby-colleges',
  majors: 'ans-sara-majors',
  transfer: 'ans-sara-transfer',
  affordability: 'ans-sara-affordability',
  fafsa: 'ans-sara-fafsa-cadaa',
  familyIncome: 'ans-sara-family-income',
  firstGeneration: 'ans-sara-first-generation',
  afterGraduation: 'ans-sara-after-graduation',
  nextSteps: 'ans-sara-next-steps'
} as const;

export const saraCollegePathwayAnswers: ScriptedAnswer[] = [
  {
    id: saraCollegeStageIds.start,
    topic: 'college',
    question: {
      en: "I want to go to college, but my family doesn't have a lot of money. Where do I start?",
      es: 'Quiero ir a la universidad, pero mi familia no tiene mucho dinero. ¿Por dónde empiezo?'
    },
    answer: {
      en: `**You have more options than you might think, and cost does not have to decide this alone.**

Two things are usually true at the same time:

- A **California community college** is the lowest-cost place to start, and the California College Promise Grant can waive enrollment fees for eligible students.
- **Financial aid** can also help with the cost of a four-year university, so starting nearby does not close that door.

Three questions are worth answering first: what is near you, how you would pay for it, and whether you can transfer later. You don't need to solve all of it today. Which one would you like to look at first?`,
      es: `**Tiene más opciones de las que quizá imagina, y el costo no tiene que decidirlo todo por sí solo.**

Dos cosas suelen ser ciertas a la vez:

- Un **community college de California** es el punto de partida más económico, y el California College Promise Grant puede eximir las cuotas de inscripción a estudiantes elegibles.
- La **ayuda financiera** también puede ayudar con el costo de una universidad de cuatro años, así que empezar cerca no cierra esa puerta.

Vale la pena responder tres preguntas primero: qué hay cerca de usted, cómo lo pagaría y si podría transferirse después. No necesita resolverlo todo hoy. ¿Cuál le gustaría revisar primero?`
    },
    context: [
      { en: 'Cost is the main concern', es: 'El costo es la principal preocupación' },
      { en: 'First time planning for college', es: 'Primera vez planeando la universidad' }
    ],
    resourceIds: ['res-work-3'],
    followUpIds: [
      saraCollegeStageIds.nearby,
      saraCollegeStageIds.affordability,
      saraCollegeStageIds.transfer,
      saraCollegeStageIds.fafsa
    ]
  },
  {
    id: saraCollegeStageIds.nearby,
    topic: 'college',
    question: {
      en: "What colleges are near me that aren't super expensive?",
      es: '¿Qué universidades hay cerca que no sean muy caras?'
    },
    answer: {
      en: `**Nearby, lower-cost places to start:**

- **Ohlone College** is in Fremont, so it is the closest community college if you live in the Tri-City area.
- **Chabot College** in Hayward is another community college option a little farther north.
- **De Anza College** in Cupertino and **Mission College** in Santa Clara are farther away, but worth comparing if a specific program matters to you.

Because cost matters to you, compare more than tuition: transportation, books, supplies, and what financial aid each college can offer. Community college fees are usually the smallest part of the bill.

Do you have a career or major in mind? That makes the comparison much easier.`,
      es: `**Opciones cercanas y de menor costo para empezar:**

- **Ohlone College** está en Fremont, así que es el community college más cercano si vive en la zona de Tri-City.
- **Chabot College** en Hayward es otra opción de community college un poco más al norte.
- **De Anza College** en Cupertino y **Mission College** en Santa Clara están más lejos, pero vale compararlas si algún programa específico le importa.

Como el costo le importa, compare más que la matrícula: transporte, libros, útiles y la ayuda financiera que cada colegio puede ofrecer. Las cuotas del community college suelen ser la parte más pequeña de la cuenta.

¿Tiene en mente alguna carrera o especialidad? Eso hace la comparación mucho más fácil.`
    },
    context: [
      { en: 'Fremont', es: 'Fremont' },
      { en: 'Cost is the main concern', es: 'El costo es la principal preocupación' },
      { en: 'Comparing local colleges', es: 'Comparando colegios cercanos' }
    ],
    links: [
      {
        label: { en: 'Ohlone College — programs and admissions', es: 'Ohlone College — programas y admisiones' },
        source: { en: 'Ohlone College', es: 'Ohlone College' },
        url: 'https://www.ohlone.edu/'
      },
      {
        label: { en: 'California Colleges — compare campuses and programs', es: 'California Colleges — comparar campus y programas' },
        source: { en: 'CaliforniaColleges.edu', es: 'CaliforniaColleges.edu' },
        url: 'https://www.californiacolleges.edu/'
      }
    ],
    followUpIds: [
      saraCollegeStageIds.majors,
      saraCollegeStageIds.transfer,
      saraCollegeStageIds.affordability
    ]
  },
  {
    id: saraCollegeStageIds.majors,
    topic: 'college',
    question: {
      en: 'I like biology and maybe something in healthcare, but I am not completely sure.',
      es: 'Me gusta la biología y quizá algo de salud, pero no estoy del todo segura.'
    },
    answer: {
      en: `**That's a useful starting point, not a decision you have to make today.**

Biology keeps several pathways open, but healthcare careers are not interchangeable:

- **Nursing and allied health programs** have their own prerequisites and admission processes, and some are competitive.
- **Transfer-focused biology** follows a different course sequence, aimed at a four-year major.
- A counselor can show you which classes count for both, so an early choice does not box you in.

The practical move is to pick the first two or three classes that work for either direction, then confirm the sequence with a counselor.

Would you like to see how those classes transfer?`,
      es: `**Es un buen punto de partida, no una decisión que deba tomar hoy.**

La biología mantiene varias rutas abiertas, pero las carreras de salud no son intercambiables:

- **Los programas de enfermería y ciencias de la salud** tienen sus propios requisitos previos y procesos de admisión, y algunos son competitivos.
- **La biología orientada a transferencia** sigue una secuencia de cursos distinta, pensada para una especialidad de cuatro años.
- Un consejero puede mostrarle qué clases cuentan para ambas rutas, para que una decisión temprana no la encierre.

Lo práctico es elegir las primeras dos o tres clases que sirvan para cualquiera de las dos direcciones y luego confirmar la secuencia con un consejero.

¿Le gustaría ver cómo se transfieren esas clases?`
    },
    context: [
      { en: 'Fremont', es: 'Fremont' },
      { en: 'Biology and healthcare interest', es: 'Interés en biología y salud' },
      { en: 'Major still undecided', es: 'Especialidad aún sin definir' }
    ],
    links: [
      {
        label: { en: 'California Colleges — explore majors and careers', es: 'California Colleges — explorar especialidades y carreras' },
        source: { en: 'CaliforniaColleges.edu', es: 'CaliforniaColleges.edu' },
        url: 'https://www.californiacolleges.edu/'
      }
    ],
    followUpIds: [
      saraCollegeStageIds.transfer,
      saraCollegeStageIds.affordability,
      saraCollegeStageIds.fafsa
    ]
  },
  {
    id: saraCollegeStageIds.transfer,
    topic: 'college',
    question: {
      en: 'If I start at a community college, can I transfer to San José State or a UC?',
      es: 'Si empiezo en un community college, ¿puedo transferirme a San José State o a una UC?'
    },
    answer: {
      en: `**Yes, that is a real pathway — transfer is not guaranteed, so planning matters.**

California community college students can apply to transfer to CSU and UC campuses. What decides most of it:

- **The courses you take.** They must match the requirements of your intended major at the destination campus.
- **Official course agreements.** ASSIST.org shows, campus by campus, which community college courses satisfy which university requirements.
- **A transfer counselor.** They build the sequence with you so you are not guessing.

Starting nearby and transferring later is normal, and it is often the lowest-cost route to a four-year degree.

Want to see what the money side looks like at each step?`,
      es: `**Sí, es una ruta real — la transferencia no está garantizada, por eso importa planear.**

Los estudiantes de community colleges de California pueden solicitar transferencia a campus de CSU y UC. Lo que más lo define:

- **Las clases que toma.** Deben coincidir con los requisitos de su especialidad en el campus de destino.
- **Los acuerdos oficiales de cursos.** ASSIST.org muestra, campus por campus, qué clases del community college cumplen qué requisitos universitarios.
- **Un consejero de transferencia.** Arma la secuencia con usted para que no esté adivinando.

Empezar cerca y transferirse después es normal, y suele ser la ruta más económica hacia un título de cuatro años.

¿Quiere ver cómo se ve el lado del dinero en cada paso?`
    },
    context: [
      { en: 'Fremont', es: 'Fremont' },
      { en: 'Biology and healthcare interest', es: 'Interés en biología y salud' },
      { en: 'Transfer to SJSU or a UC', es: 'Transferencia a SJSU o una UC' }
    ],
    links: [
      {
        label: { en: 'ASSIST — official course transfer agreements', es: 'ASSIST — acuerdos oficiales de transferencia de cursos' },
        source: { en: 'ASSIST', es: 'ASSIST' },
        url: 'https://assist.org/'
      }
    ],
    nextStep: {
      title: { en: 'Check one major agreement on ASSIST', es: 'Revise un acuerdo de especialidad en ASSIST' },
      detail: {
        en: 'Pick biology or a healthcare major, choose Ohlone as your community college, then SJSU or a UC campus. Save the course list it generates — a counselor can confirm it with you.',
        es: 'Elija biología o una carrera de salud, seleccione Ohlone como community college y luego SJSU o un campus de UC. Guarde la lista de cursos que genera — un consejero puede confirmarla con usted.'
      },
      actions: [
        {
          id: 'sara-transfer-assist',
          kind: 'open-link',
          label: { en: 'Open ASSIST.org', es: 'Abrir ASSIST.org' },
          url: 'https://assist.org/'
        }
      ]
    },
    followUpIds: [saraCollegeStageIds.affordability, saraCollegeStageIds.firstGeneration]
  },
  {
    id: saraCollegeStageIds.affordability,
    topic: 'college',
    question: {
      en: 'Is community college actually free? What about books and everything else?',
      es: '¿El community college es realmente gratis? ¿Y los libros y todo lo demás?'
    },
    answer: {
      en: `**Tuition can be waived. The rest is a real budget, so plan for it.**

- **California College Promise Grant** waives community college enrollment fees for eligible California residents. It does not automatically cover books, supplies, or transportation.
- **College Promise programs** at individual colleges can add more — for example, the Foothill & De Anza College Promise covers tuition and mandatory fees for eligible students and adds book support.
- **Books, food, transit, and supplies** are usually paid for through financial aid, campus programs, and Promise benefits rather than tuition waivers.

So "free" is accurate for enrollment fees if you qualify, and the rest is what financial aid and campus support are for.

The next step is figuring out which aid application fits your situation.`,
      es: `**La matrícula puede eximirse. El resto es un presupuesto real, conviene planearlo.**

- **El California College Promise Grant** exime las cuotas de inscripción del community college a residentes de California elegibles. No cubre automáticamente libros, útiles ni transporte.
- **Los programas College Promise** de cada colegio pueden sumar más — por ejemplo, el Foothill & De Anza College Promise cubre la matrícula y las cuotas obligatorias a estudiantes elegibles y agrega apoyo para libros.
- **Libros, comida, transporte y útiles** suelen pagarse con ayuda financiera, programas del campus y beneficios Promise, no con la exención de matrícula.

Así que "gratis" es correcto para las cuotas de inscripción si cumple los requisitos, y el resto es justamente para lo que sirven la ayuda financiera y el apoyo del campus.

El siguiente paso es ver qué solicitud de ayuda corresponde a su situación.`
    },
    context: [
      { en: 'Fremont', es: 'Fremont' },
      { en: 'Cost is the main concern', es: 'El costo es la principal preocupación' },
      { en: 'Tuition vs. books and living costs', es: 'Matrícula frente a libros y gastos' }
    ],
    links: [
      {
        label: { en: 'De Anza College Promise — tuition and fee coverage', es: 'De Anza College Promise — cobertura de matrícula y cuotas' },
        source: { en: 'De Anza College', es: 'De Anza College' },
        url: 'https://www.deanza.edu/promise/'
      },
      {
        label: { en: 'California Student Aid Commission', es: 'Comisión de Ayuda Estudiantil de California' },
        source: { en: 'California Student Aid Commission', es: 'California Student Aid Commission' },
        url: 'https://www.csac.ca.gov/'
      }
    ],
    resourceIds: ['res-work-3'],
    followUpIds: [
      saraCollegeStageIds.fafsa,
      saraCollegeStageIds.nearby,
      saraCollegeStageIds.firstGeneration
    ]
  },
  {
    id: saraCollegeStageIds.fafsa,
    topic: 'college',
    question: {
      en: "I've never applied for financial aid — do I fill out FAFSA or the Dream Act?",
      es: 'Nunca he solicitado ayuda financiera. ¿Lleno la FAFSA o la Dream Act?'
    },
    answer: {
      en: `**It depends on which aid you are eligible for. Both applications are free, and you only file one.**

- **FAFSA** is generally the route for U.S. citizens and eligible noncitizens. It is also the application that unlocks most federal and state aid.
- **CADAA (California Dream Act Application)** serves students who qualify for California aid but are not eligible for federal aid, including many undocumented students. It includes guidance for mixed-status families.
- **You submit one, not both.** Filing the wrong one costs you time, so confirm eligibility before you start.

**Before you file:** create your account, have your (or your parents') tax and income information ready, and list every college you are considering. You can add campuses later, but the earlier you file, the more aid is still available.

If your family's income changed recently, that matters here too.`,
      es: `**Depende de para qué ayuda sea elegible. Ambas solicitudes son gratuitas y solo se presenta una.**

- **FAFSA** es generalmente la vía para ciudadanos estadounidenses y no ciudadanos elegibles. También es la solicitud que abre la mayor parte de la ayuda federal y estatal.
- **CADAA (California Dream Act Application)** es para estudiantes que califican para ayuda de California pero no para ayuda federal, incluyendo a muchos estudiantes indocumentados. Incluye orientación para familias de estatus mixto.
- **Se presenta una, no las dos.** Presentar la equivocada cuesta tiempo, así que confirme su elegibilidad antes de empezar.

**Antes de presentarla:** cree su cuenta, tenga a la mano la información fiscal y de ingresos suya (o de sus padres) y anote todos los colegios que está considerando. Puede agregar campus después, pero mientras antes presente, más ayuda estará disponible.

Si el ingreso de su familia cambió hace poco, eso también importa aquí.`
    },
    context: [
      { en: 'Fremont', es: 'Fremont' },
      { en: 'Never applied for aid before', es: 'Nunca ha solicitado ayuda' },
      { en: 'FAFSA vs. CADAA', es: 'FAFSA frente a CADAA' }
    ],
    links: [
      {
        label: { en: 'FAFSA — start the federal application', es: 'FAFSA — iniciar la solicitud federal' },
        source: { en: 'Federal Student Aid', es: 'Ayuda Estudiantil Federal' },
        url: 'https://studentaid.gov/h/apply-for-aid/fafsa'
      },
      {
        label: { en: 'CADAA — California Dream Act Application', es: 'CADAA — Solicitud del California Dream Act' },
        source: { en: 'California Student Aid Commission', es: 'California Student Aid Commission' },
        url: 'https://dream.csac.ca.gov/'
      }
    ],
    nextStep: {
      title: { en: 'Confirm which application is yours', es: 'Confirme cuál solicitud le corresponde' },
      detail: {
        en: 'Read the eligibility page for the application you think applies, and if it is still unclear, ask the college financial aid office before you create an account. Submitting the wrong one delays your aid.',
        es: 'Lea la página de elegibilidad de la solicitud que cree que le corresponde y, si sigue sin estar claro, pregunte a la oficina de ayuda financiera del colegio antes de crear la cuenta. Presentar la equivocada retrasa su ayuda.'
      },
      actions: [
        {
          id: 'sara-fafsa-csac',
          kind: 'open-link',
          label: { en: 'Open California Student Aid Commission', es: 'Abrir la Comisión de Ayuda Estudiantil' },
          url: 'https://www.csac.ca.gov/'
        }
      ]
    },
    followUpIds: [saraCollegeStageIds.familyIncome, saraCollegeStageIds.firstGeneration]
  },
  {
    id: saraCollegeStageIds.familyIncome,
    topic: 'college',
    question: {
      en: 'My dad lost his job recently. Does that change anything?',
      es: 'Mi papá perdió su trabajo hace poco. ¿Eso cambia algo?'
    },
    answer: {
      en: `**It might, and there is an official process for it.**

- **File the application as instructed first.** Aid applications use earlier tax information, so a recent job loss often does not show up in the numbers they review.
- **Then ask the college financial aid office about a special-circumstances or income-change review.** This is a normal request, not a complaint — offices handle it every year.
- **Expect to document it.** They may ask for a termination letter, recent pay stubs, or a signed statement. An adjustment is possible but not guaranteed.

Do this at every college you are considering, because each office decides for its own aid package.

You do not have to do this alone — there is free help with these forms.`,
      es: `**Puede cambiar, y existe un proceso oficial para eso.**

- **Primero presente la solicitud como se indica.** Las solicitudes usan información fiscal anterior, así que una pérdida reciente de empleo muchas veces no aparece en los números que revisan.
- **Después pregunte a la oficina de ayuda financiera del colegio por una revisión de circunstancias especiales o de cambio de ingreso.** Es una solicitud normal, no un reclamo — las oficinas la manejan cada año.
- **Cuente con documentarlo.** Pueden pedir una carta de despido, talones de pago recientes o una declaración firmada. Un ajuste es posible, pero no está garantizado.

Hágalo en cada colegio que esté considerando, porque cada oficina decide para su propio paquete de ayuda.

No tiene que hacerlo sola — existe ayuda gratuita para estos formularios.`
    },
    context: [
      { en: 'Fremont', es: 'Fremont' },
      { en: "Father's recent job loss", es: 'Despido reciente del papá' },
      { en: 'Income-change review', es: 'Revisión por cambio de ingreso' }
    ],
    links: [
      {
        label: { en: 'Federal Student Aid — ask about a special-circumstances review', es: 'Ayuda Estudiantil Federal — preguntar por una revisión especial' },
        source: { en: 'Federal Student Aid', es: 'Ayuda Estudiantil Federal' },
        url: 'https://studentaid.gov/'
      },
      {
        label: { en: 'California Student Aid Commission', es: 'Comisión de Ayuda Estudiantil de California' },
        source: { en: 'California Student Aid Commission', es: 'California Student Aid Commission' },
        url: 'https://www.csac.ca.gov/'
      }
    ],
    nextStep: {
      title: { en: 'Ask one aid office about your income drop', es: 'Pregunte a una oficina de ayuda por la caída de ingreso' },
      detail: {
        en: 'Call or visit the financial aid office at the college closest to you, say your family income dropped recently, and ask what documentation they need for a review. Write down the answer and the name of who helped you.',
        es: 'Llame o visite la oficina de ayuda financiera del colegio más cercano, diga que el ingreso familiar bajó hace poco y pregunte qué documentación piden para una revisión. Anote la respuesta y el nombre de quien le atendió.'
      },
      actions: [
        {
          id: 'sara-income-help',
          kind: 'open-link',
          label: { en: 'Find free application help', es: 'Buscar ayuda gratuita con la solicitud' },
          url: 'https://www.10000degrees.org/'
        }
      ]
    },
    followUpIds: [saraCollegeStageIds.firstGeneration, saraCollegeStageIds.nextSteps]
  },
  {
    id: saraCollegeStageIds.firstGeneration,
    topic: 'college',
    question: {
      en: "My parents never went to college, so I feel like I'm figuring this out by myself. Is there someone who can actually help me?",
      es: 'Mis papás nunca fueron a la universidad, así que siento que estoy averiguándolo todo sola. ¿Hay alguien que de verdad me ayude?'
    },
    answer: {
      en: `**Yes — first-generation students are expected on every campus, and the help is free.**

- **Your high school counselor** can help with applications, deadlines, and fee waivers. You are not bothering them; this is their job.
- **The college's admissions and financial aid offices** will walk you through forms and can tell you which documents they need.
- **First-generation and transfer centers** on community college campuses offer advising, study space, and peer mentors.
- **10,000 Degrees** provides free college-access advising in participating communities.

You do not need to know the vocabulary to ask. "I'm the first in my family to do this — what do I do next?" is a complete question.

Ready to turn this into a plan?`,
      es: `**Sí — los estudiantes de primera generación son esperados en cada campus, y la ayuda es gratuita.**

- **Su consejero de la preparatoria** puede ayudar con solicitudes, fechas límite y exenciones de cuotas. No está molestando; es parte de su trabajo.
- **Las oficinas de admisiones y ayuda financiera del colegio** le explican los formularios y le dicen qué documentos piden.
- **Los centros de primera generación y de transferencia** en los campus ofrecen asesoría, espacio de estudio y mentores.
- **10,000 Degrees** ofrece asesoría gratuita para entrar a la universidad en comunidades participantes.

No necesita saber el vocabulario para preguntar. "Soy la primera en mi familia en hacer esto, ¿qué sigue?" es una pregunta completa.

¿Lista para convertirlo en un plan?`
    },
    context: [
      { en: 'Fremont', es: 'Fremont' },
      { en: 'First-generation student', es: 'Estudiante de primera generación' },
      { en: 'Wants a person to ask', es: 'Quiere alguien a quién preguntar' }
    ],
    links: [
      {
        label: { en: '10,000 Degrees — free college access advising', es: '10,000 Degrees — asesoría gratuita para la universidad' },
        source: { en: '10,000 Degrees', es: '10,000 Degrees' },
        url: 'https://www.10000degrees.org/'
      },
      {
        label: { en: 'California Community Colleges — student support programs', es: 'California Community Colleges — programas de apoyo estudiantil' },
        source: { en: 'California Community Colleges', es: 'California Community Colleges' },
        url: 'https://www.cccco.edu/'
      }
    ],
    resourceIds: ['res-work-3'],
    followUpIds: [saraCollegeStageIds.nextSteps, saraCollegeStageIds.afterGraduation]
  },
  // TODO: Spanish review — this new stage was translated for the sourced summer-transition options.
  {
    id: saraCollegeStageIds.afterGraduation,
    topic: 'college',
    question: {
      en: 'What should I do after graduating high school?',
      es: '¿Qué debo hacer después de graduarme de la preparatoria?'
    },
    answer: {
      en: `The summer after graduation can feel like a gap, but a few small steps can make starting college easier. Check your financial aid messages, finish orientation and placement, and send your final transcript before fall classes begin. You do not have to track every deadline alone: ask a college counselor or Cash for College advisor to review your list with you.`,
      es: `El verano después de graduarse puede sentirse como una pausa, pero unos pasos pequeños pueden facilitar el comienzo del colegio. Revise sus mensajes de ayuda financiera, complete la orientación y ubicación, y envíe su expediente final antes de que empiecen las clases de otoño. No tiene que llevar todas las fechas por su cuenta: pida a un consejero del colegio o a un asesor de Cash for College que revise la lista con usted.`
    },
    context: [
      { en: 'Finishing high school', es: 'Terminando la preparatoria' },
      { en: 'Planning for the first college term', es: 'Preparándose para el primer semestre' }
    ],
    followUpIds: []
  },
  {
    id: saraCollegeStageIds.nextSteps,
    topic: 'college',
    question: {
      en: 'What are the first three things I should do?',
      es: '¿Cuáles son las primeras tres cosas que debo hacer?'
    },
    answer: {
      en: `**Based on what you've shared — Fremont, biology or healthcare, cost as the main worry, a recent income drop, and being first in your family — here are your three NextStep actions.**

1. **Compare two nearby colleges for a biology or healthcare pathway.** Ohlone in Fremont plus one alternative is enough to start.
2. **Settle the aid application, then flag the income change.** Confirm whether FAFSA or CADAA applies to you, file it, and ask the aid office about a special-circumstances review.
3. **Book one conversation with a counselor.** Bring the transfer question and the first-generation support question to the same appointment.

You do not need to solve everything in one day. Do these three in order, and each one makes the next easier.`,
      es: `**Con base en lo que me compartió — Fremont, biología o salud, el costo como principal preocupación, una caída reciente de ingreso y ser la primera en su familia — estos son sus tres pasos a seguir.**

1. **Comparar dos colegios cercanos para una ruta de biología o salud.** Ohlone en Fremont más una alternativa es suficiente para empezar.
2. **Resolver la solicitud de ayuda y luego señalar el cambio de ingreso.** Confirme si le corresponde FAFSA o CADAA, preséntela y pregunte a la oficina de ayuda por una revisión de circunstancias especiales.
3. **Agendar una conversación con un consejero.** Lleve la pregunta de transferencia y la de apoyo para primera generación a la misma cita.

No necesita resolverlo todo en un día. Haga estos tres pasos en orden, y cada uno facilita el siguiente.`
    },
    context: [
      { en: 'Fremont', es: 'Fremont' },
      { en: 'Biology and healthcare interest', es: 'Interés en biología y salud' },
      { en: 'Cost and income change', es: 'Costo y cambio de ingreso' },
      { en: 'First-generation student', es: 'Estudiante de primera generación' }
    ],
    links: [
      {
        label: { en: 'Ohlone College — programs, admissions, financial aid', es: 'Ohlone College — programas, admisiones y ayuda financiera' },
        source: { en: 'Ohlone College', es: 'Ohlone College' },
        url: 'https://www.ohlone.edu/'
      },
      {
        label: { en: 'ASSIST — transfer course agreements', es: 'ASSIST — acuerdos de transferencia de cursos' },
        source: { en: 'ASSIST', es: 'ASSIST' },
        url: 'https://assist.org/'
      },
      {
        label: { en: 'California Student Aid Commission — FAFSA and CADAA guidance', es: 'Comisión de Ayuda Estudiantil — guía de FAFSA y CADAA' },
        source: { en: 'California Student Aid Commission', es: 'California Student Aid Commission' },
        url: 'https://www.csac.ca.gov/'
      }
    ],
    resourceIds: ['res-work-3'],
    nextSteps: [
      {
        title: { en: 'Compare two nearby colleges', es: 'Comparar dos colegios cercanos' },
        detail: {
          en: 'Look at Ohlone in Fremont and one alternative for a biology or healthcare pathway. Check program requirements and the transit cost to each campus, not just tuition.',
          es: 'Revise Ohlone en Fremont y una alternativa para una ruta de biología o salud. Comparta requisitos del programa y el costo de transporte a cada campus, no solo la matrícula.'
        },
        actions: [
          {
            id: 'sara-plan-compare',
            kind: 'open-link',
            label: { en: 'Open Ohlone programs', es: 'Abrir programas de Ohlone' },
            url: 'https://www.ohlone.edu/'
          },
          {
            id: 'sara-plan-save-promise',
            kind: 'save-plan',
            label: { en: 'Save College Promise to my plan', es: 'Guardar College Promise en mi plan' },
            resourceId: 'res-work-3'
          }
        ]
      },
      {
        title: { en: 'File the right aid application', es: 'Presentar la solicitud de ayuda correcta' },
        detail: {
          en: 'Confirm whether FAFSA or CADAA applies, submit it, then tell the financial aid office your family income dropped and ask what they need for a review.',
          es: 'Confirme si le corresponde FAFSA o CADAA, preséntela y luego avise a la oficina de ayuda financiera que el ingreso familiar bajó y pregunte qué necesitan para una revisión.'
        },
        actions: [
          {
            id: 'sara-plan-aid',
            kind: 'open-link',
            label: { en: 'Open aid application guidance', es: 'Abrir la guía de solicitud de ayuda' },
            url: 'https://www.csac.ca.gov/'
          }
        ]
      },
      {
        title: { en: 'Book one counselor conversation', es: 'Agendar una cita con un consejero' },
        detail: {
          en: 'Bring both questions to one appointment: which classes keep SJSU or a UC open, and what first-generation support the campus offers.',
          es: 'Lleve ambas preguntas a una sola cita: qué clases mantienen abierta la opción de SJSU o una UC, y qué apoyo de primera generación ofrece el campus.'
        },
        actions: [
          {
            id: 'sara-plan-transfer',
            kind: 'open-link',
            label: { en: 'Check transfer agreements', es: 'Revisar acuerdos de transferencia' },
            url: 'https://assist.org/'
          },
          {
            id: 'sara-plan-advising',
            kind: 'open-link',
            label: { en: 'Find free advising help', es: 'Buscar asesoría gratuita' },
            url: 'https://www.10000degrees.org/'
          }
        ]
      }
    ],
    followUpIds: [saraCollegeStageIds.afterGraduation]
  }
];

/**
 * Free-text questions about college money and pathways enter Sara's conversation
 * at the stage that actually answers them. Anything unmatched stays on the
 * general college entry answer, so other personas keep their own replies.
 */
export const routeSaraCollegeQuestion = (lower: string): string | undefined => {
  const has = (...words: string[]) => words.some((word) => lower.includes(word));

  if (has('where do i start', 'where should i start', 'where to start', 'por donde empiezo', 'por dónde empiezo')) {
    return saraCollegeStageIds.start;
  }
  if (has('transfer', 'transferir', 'sjsu', 'csu', 'assist.org') || /\buc\b/.test(lower)) {
    return saraCollegeStageIds.transfer;
  }
  if (has('fafsa', 'cadaa', 'dream act', 'dreamer', 'undocumented', 'indocumentad')) {
    return saraCollegeStageIds.fafsa;
  }
  if (has('lost his job', 'lost her job', 'lost my job', 'lost a job', 'laid off', 'layoff', 'income changed', 'income dropped', 'job loss', 'despid', 'perdió su trabajo', 'cambio de ingreso')) {
    return saraCollegeStageIds.familyIncome;
  }
  if (has('first generation', 'first-generation', 'first gen', 'first in my family', 'parents never', 'primera generación', 'primer generación', 'nadie en mi familia')) {
    return saraCollegeStageIds.firstGeneration;
  }
  if (has('college near', 'colleges near', 'nearby college', 'community college near', 'ohlone', 'chabot', 'mission college', 'fremont')) {
    return saraCollegeStageIds.nearby;
  }
  if (has('major', 'majors', 'biolog', 'nursing', 'healthcare', 'enfermer', 'especialidad', 'carrera')) {
    return saraCollegeStageIds.majors;
  }
  if (has('afford', 'tuition', 'pay for college', 'cost of college', 'expensive', 'free', 'money', 'matrícula', 'colegiatura', 'pagar', 'gratis', 'dinero')) {
    return saraCollegeStageIds.affordability;
  }
  return undefined;
};
