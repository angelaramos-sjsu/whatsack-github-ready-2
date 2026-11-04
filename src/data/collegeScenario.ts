export interface CollegeScenarioOption {
  en: string;
  es: string;
  /** id of the step this option advances to, or null to end the demo */
  next: string | null;
}

export interface CollegeScenarioStep {
  id: string;
  title: { en: string; es: string };
  sara: { en: string; es: string };
  whatsack: { en: string; es: string };
  options: CollegeScenarioOption[];
}

export const collegeScenarioSteps: CollegeScenarioStep[] = [
  {
    id: 's00',
    title: { en: 'Getting started', es: 'Para empezar' },
    sara: {
      en: "I want to go to college, but my family doesn't have a lot of money. I don't really know where to start.",
      es: 'Quiero ir a la universidad, pero mi familia no tiene mucho dinero. La verdad no sé por dónde empezar.'
    },
    whatsack: {
      en: "You have more options than you might think. Community colleges can be an affordable place to start, and financial aid may also help with the cost of a four-year university. We can look at what's near you, how to pay for college, or how transferring works. What would be most helpful right now?",
      es: 'Tiene más opciones de las que quizá imagina. Los community colleges pueden ser un punto de partida económico, y la ayuda financiera también puede ayudar con el costo de una universidad de cuatro años. Podemos ver qué hay cerca de usted, cómo pagar la universidad o cómo funciona una transferencia. ¿Qué le ayudaría más ahora mismo?'
    },
    options: [
      { en: 'Find colleges near me', es: 'Buscar universidades cerca de mí', next: 's01' },
      { en: 'How can I afford college?', es: '¿Cómo puedo pagar la universidad?', next: 's04' },
      { en: 'Compare my options', es: 'Comparar mis opciones', next: 's03' }
    ]
  },
  {
    id: 's01',
    title: { en: 'Finding local colleges', es: 'Buscar universidades locales' },
    sara: {
      en: "I live in Fremont. What colleges are nearby that aren't super expensive?",
      es: 'Vivo en Fremont. ¿Qué universidades hay cerca que no sean muy caras?'
    },
    whatsack: {
      en: "Ohlone College is right in Fremont. You could also look at Chabot College in Hayward or compare options farther away, like De Anza and Mission College. Since cost matters to you, I'd compare transportation expenses, programs, and financial aid—not just tuition. Do you have a career or major in mind?",
      es: 'Ohlone College está en Fremont. También podría considerar Chabot College en Hayward o comparar opciones más lejos, como De Anza y Mission College. Como el costo le importa, yo compararía gastos de transporte, programas y ayuda financiera, no solo la matrícula. ¿Tiene en mente alguna carrera o especialidad?'
    },
    options: [
      { en: "I'm interested in healthcare", es: 'Me interesa la salud', next: 's02' },
      { en: 'Can I transfer later?', es: '¿Puedo transferirme después?', next: 's03' },
      { en: 'How much will college cost?', es: '¿Cuánto costará la universidad?', next: 's04' }
    ]
  },
  {
    id: 's02',
    title: { en: 'Exploring interests', es: 'Explorar intereses' },
    sara: {
      en: 'I like biology, and maybe something in healthcare, but I am not completely sure.',
      es: 'Me gusta la biología, y quizá algo relacionado con la salud, pero no estoy del todo segura.'
    },
    whatsack: {
      en: "That's a useful starting point. Biology can lead to several pathways, but healthcare careers such as nursing have their own specific prerequisites and admission requirements. You don't have to choose a final career today. A counselor can help you compare majors and see which classes will keep your transfer options open.",
      es: 'Es un buen punto de partida. La biología puede llevar a varias rutas, pero carreras de salud como enfermería tienen sus propios requisitos previos y criterios de admisión. No tiene que elegir una carrera definitiva hoy. Un consejero puede ayudarle a comparar especialidades y ver qué clases mantienen abiertas sus opciones de transferencia.'
    },
    options: [
      { en: 'Can I transfer to SJSU or a UC?', es: '¿Puedo transferirme a SJSU o a una UC?', next: 's03' },
      { en: 'Help me explore majors', es: 'Ayúdame a explorar especialidades', next: 's03' },
      { en: 'What about financial aid?', es: '¿Y la ayuda financiera?', next: 's04' }
    ]
  },
  {
    id: 's03',
    title: { en: 'Understanding transfer', es: 'Entender la transferencia' },
    sara: {
      en: 'If I start at Ohlone, can I still transfer to San José State or a UC?',
      es: 'Si empiezo en Ohlone, ¿puedo transferirme después a San José State o a una UC?'
    },
    whatsack: {
      en: "Yes, that's a possible pathway. California community college students can apply to transfer to CSU and UC campuses, although admission isn't guaranteed. The important part is planning courses around your intended major and destination. ASSIST.org can show official course agreements, and a transfer counselor can help you use them.",
      es: 'Sí, es una ruta posible. Los estudiantes de community colleges de California pueden solicitar transferencia a campus de CSU y UC, aunque la admisión no está garantizada. Lo importante es planear las clases según su especialidad y la universidad de destino. ASSIST.org muestra los acuerdos oficiales de cursos, y un consejero de transferencia puede ayudarle a usarlos.'
    },
    options: [
      { en: 'Show transfer requirements', es: 'Ver requisitos de transferencia', next: 's04' },
      { en: 'How much will this cost?', es: '¿Cuánto costará esto?', next: 's04' },
      { en: 'Help me find a counselor', es: 'Ayúdame a encontrar un consejero', next: 's07' }
    ]
  },
  {
    id: 's04',
    title: { en: 'College affordability', es: 'Cuánto cuesta la universidad' },
    sara: {
      en: 'Is community college actually free? What about books and everything else?',
      es: '¿El community college es realmente gratis? ¿Y los libros y todo lo demás?'
    },
    whatsack: {
      en: 'You may qualify for the California College Promise Grant, which waives community college enrollment fees for eligible students. Some colleges also have their own Promise programs. But books, transportation, food, and supplies can still cost money. Financial aid and campus support services may help with those expenses.',
      es: 'Es posible que califique para el California College Promise Grant, que exime las cuotas de inscripción del community college para estudiantes elegibles. Algunos colegios también tienen sus propios programas Promise. Pero los libros, el transporte, la comida y los útiles siguen costando. La ayuda financiera y los servicios de apoyo del campus pueden ayudar con esos gastos.'
    },
    options: [
      { en: 'How do I apply for aid?', es: '¿Cómo solicito ayuda?', next: 's05' },
      { en: 'What is a Promise Grant?', es: '¿Qué es un Promise Grant?', next: 's05' },
      { en: 'Find additional student support', es: 'Buscar más apoyo estudiantil', next: 's07' }
    ]
  },
  {
    id: 's05',
    title: { en: 'FAFSA or CADAA', es: 'FAFSA o CADAA' },
    sara: {
      en: "Okay, I've never applied for financial aid before. Am I supposed to fill out FAFSA or the Dream Act?",
      es: 'Nunca he solicitado ayuda financiera. ¿Debo llenar la FAFSA o la Dream Act?'
    },
    whatsack: {
      en: "That depends on your eligibility for federal financial aid and California state financial aid. FAFSA is generally the route for U.S. citizens and eligible noncitizens; CADAA serves qualifying students who aren't eligible for federal aid, with additional guidance for mixed-status families. You can check the California Student Aid Commission's guidance or speak with a financial aid advisor before submitting.",
      es: 'Depende de su elegibilidad para ayuda federal y para ayuda estatal de California. La FAFSA es generalmente la vía para ciudadanos estadounidenses y no ciudadanos elegibles; la CADAA es para estudiantes que califican y no son elegibles para ayuda federal, con orientación adicional para familias de estatus mixto. Puede revisar la guía de la California Student Aid Commission o hablar con un asesor de ayuda financiera antes de enviarla.'
    },
    options: [
      { en: "What if my family's income changed?", es: '¿Y si el ingreso de mi familia cambió?', next: 's06' },
      { en: 'Where can I get application help?', es: '¿Dónde puedo recibir ayuda con la solicitud?', next: 's07' },
      { en: 'Show the official applications', es: 'Mostrar las solicitudes oficiales', next: 's06' }
    ]
  },
  {
    id: 's06',
    title: { en: 'Family financial situation', es: 'La situación económica familiar' },
    sara: {
      en: 'My dad actually lost his job recently. Does that change anything?',
      es: 'Mi papá perdió su trabajo hace poco. ¿Eso cambia algo?'
    },
    whatsack: {
      en: "It might. If your family's income has dropped significantly, the financial aid office may be able to review your current situation. For FAFSA applicants, the usual process is to submit the application as instructed and then ask the college about a special-circumstances review. They may request documentation, and an adjustment isn't guaranteed.",
      es: 'Puede cambiar. Si el ingreso de su familia bajó de forma significativa, la oficina de ayuda financiera podría revisar su situación actual. Para quienes presentan la FAFSA, lo habitual es enviar la solicitud según las indicaciones y luego preguntar al colegio por una revisión de circunstancias especiales. Pueden pedir documentación, y el ajuste no está garantizado.'
    },
    options: [
      { en: 'What should I tell financial aid?', es: '¿Qué le digo a ayuda financiera?', next: 's07' },
      { en: 'Find someone who can help', es: 'Buscar a alguien que me ayude', next: 's07' },
      { en: 'Make my action plan', es: 'Hacer mi plan de acción', next: 's08' }
    ]
  },
  {
    id: 's07',
    title: { en: 'First-generation support', es: 'Apoyo para primera generación' },
    sara: {
      en: "My parents never went to college, so I feel like I'm figuring this all out by myself. Is there someone who can actually help me?",
      es: 'Mis papás nunca fueron a la universidad, así que siento que estoy averiguándolo todo sola. ¿Hay alguien que de verdad me ayude?'
    },
    whatsack: {
      en: 'Yes. Your high school counselor and the admissions or financial aid offices at colleges you are considering are good places to start. Organizations such as 10,000 Degrees also offer college-access guidance for students in participating communities. Once you are enrolled, you can ask about campus programs such as EOPS if you are eligible. Would a short checklist make this easier?',
      es: 'Sí. Su consejero de la preparatoria y las oficinas de admisiones o de ayuda financiera de los colegios que esté considerando son buenos puntos de partida. Organizaciones como 10,000 Degrees también ofrecen orientación para entrar a la universidad a estudiantes de comunidades participantes. Una vez inscrita, puede preguntar por programas del campus como EOPS si cumple los requisitos. ¿Le ayudaría una lista breve de pasos?'
    },
    options: [
      { en: 'Yes, make my checklist', es: 'Sí, hazme la lista', next: 's08' },
      { en: 'Show college support services', es: 'Mostrar servicios de apoyo universitario', next: 's08' },
      { en: 'Help me prepare questions', es: 'Ayúdame a preparar preguntas', next: 's08' }
    ]
  },
  {
    id: 's08',
    title: { en: 'Personalized next steps', es: 'Siguientes pasos personalizados' },
    sara: {
      en: 'Yes please. What are the first three things I should do?',
      es: 'Sí, por favor. ¿Cuáles son las primeras tres cosas que debo hacer?'
    },
    whatsack: {
      en: "Based on what you've shared, I'd start with three things: (1) Compare Ohlone and another nearby college for biology or healthcare-related pathways. (2) Determine which financial aid application fits your situation and ask a financial aid office about your family's recent income change. (3) Schedule time with a counselor to discuss transfer planning and first-generation support. You don't need to solve everything in one day.",
      es: 'Con base en lo que me compartió, empezaría con tres cosas: (1) Comparar Ohlone con otro colegio cercano en rutas de biología o salud. (2) Determinar qué solicitud de ayuda financiera corresponde a su situación y preguntar a la oficina de ayuda financiera por el cambio reciente de ingreso familiar. (3) Agendar tiempo con un consejero para hablar de transferencia y apoyo para estudiantes de primera generación. No necesita resolverlo todo en un día.'
    },
    options: [
      { en: 'Explore Ohlone College', es: 'Explorar Ohlone College', next: null },
      { en: 'Start financial aid', es: 'Comenzar ayuda financiera', next: null },
      { en: 'Find college advising help', es: 'Buscar asesoría universitaria', next: null }
    ]
  }
];
