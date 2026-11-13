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
      en: `**Two free food options in East San Jose match what you asked:**

- **Sacred Heart Saturday Community Food Pantry**, 550 S 1st St, San Jose.
  - **Hours:** Every Saturday, 9:00 AM to 1:00 PM.
  - **ID:** No ID, Social Security number or proof of income. Giving your name is enough.
  - **Immigration:** Food pantries do **NOT** count in the public charge test.

- **Second Harvest Mobile Produce Market**, Story Rd and King Rd.
  - Free fresh produce. Walk up or drive through.

**Next step:** Go to Sacred Heart this Saturday around 8:40 AM. Bring two strong bags. You do not need an appointment.`,
      es: `**Hay dos opciones gratis de comida en el Este de San José:**

- **Despensa Comunitaria de Sábados en Sacred Heart**, 550 S 1st St, San José.
  - **Horario:** Todos los sábados, de 9:00 AM a 1:00 PM.
  - **Identificación:** No piden ID, Seguro Social ni comprobante de ingresos. Basta con dar su nombre.
  - **Inmigración:** Las despensas de comida **NO** cuentan en la regla de carga pública.

- **Mercado Móvil Second Harvest**, Story Rd y King Rd.
  - Frutas y verduras frescas gratis. Puede ir caminando o en auto.

**Próximo paso:** Vaya a Sacred Heart este sábado a las 8:40 AM. Lleve dos bolsas fuertes. No necesita cita.`
    },
    context: [
      { en: 'East San Jose', es: 'Este de San José' },
      { en: 'Food access', es: 'Acceso a alimentos' },
      { en: 'No ID required', es: 'Sin identificación' }
    ],
    links: [
      {
        label: { en: 'Sacred Heart Community Service — food programs', es: 'Sacred Heart Community Service — programas de alimentos' },
        source: { en: 'Sacred Heart Community Service', es: 'Sacred Heart Community Service' },
        url: 'https://www.sacredheartcs.org/'
      },
      {
        label: { en: 'Second Harvest of Silicon Valley — get food', es: 'Second Harvest of Silicon Valley — obtener alimentos' },
        source: { en: 'Second Harvest of Silicon Valley', es: 'Second Harvest of Silicon Valley' },
        url: 'https://www.shfb.org/get-food/'
      }
    ],
    nextStep: {
      title: { en: 'Go this Saturday with two bags', es: 'Vaya este sábado con dos bolsas' },
      detail: {
        en: 'The pantry opens at 9:00 AM and does not require pre-registration. Arriving around 8:40 AM keeps the line short.',
        es: 'La despensa abre a las 9:00 AM y no pide registro previo. Llegar a las 8:40 AM mantiene la fila corta.'
      },
      actions: [
        {
          id: 'food-entry-save',
          kind: 'save-plan',
          label: { en: 'Save pantry to my plan', es: 'Guardar despensa en mi plan' },
          resourceId: 'res-food-1'
        },
        {
          id: 'food-entry-site',
          kind: 'open-link',
          label: { en: 'Open Second Harvest site', es: 'Abrir el sitio de Second Harvest' },
          url: 'https://www.shfb.org/get-food/'
        }
      ]
    },
    resourceIds: ['res-food-1', 'res-food-2'],
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
      en: `**Your layoff may pay for free job training.**

- **NOVAworks Dislocated Worker Program:** Vouchers up to **$8,000** for certificates in CompTIA Security+, AWS Cloud and network support.
- **California Training Benefits (CTB):** While you study an approved course, you can keep your weekly EDD payments. You do not need to send weekly job search logs.

**Next step:** Join the free online WIOA orientation. It runs every Wednesday at 10:00 AM and takes 45 minutes. Bring your EDD letter.`,
      es: `**Su despido puede pagar capacitación gratis.**

- **Programa NOVAworks para Trabajadores Desplazados:** Vales de hasta **$8,000** para certificados en CompTIA Security+, Nube (AWS) y Soporte de Redes.
- **California Training Benefits (CTB):** Mientras estudia un curso aprobado, sigue recibiendo sus pagos semanales del EDD. No necesita enviar registros de búsqueda de empleo.

**Próximo paso:** Inscríbase a la orientación virtual gratuita de WIOA. Es cada miércoles a las 10:00 AM y dura 45 minutos. Lleve su carta del EDD.`
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
      en: `**You can study at these colleges with no tuition.**

- **Foothill and De Anza College Promise (AB 19):** Pays **100% of tuition and fees for 2 full years** if you live in California and take 12 or more units.
- **Undocumented students:** Fill out the California Dream Act Application (CADAA). State law keeps your financial aid records private from federal immigration agencies.
- **Books:** First-generation students can ask the Student Success Center for help with books and supplies.

**Next step:** First apply to the college on OpenCCC to get your student ID. Then send your CADAA or FAFSA.`,
      es: `**Puede estudiar en estas universidades sin pagar colegiatura.**

- **Foothill y De Anza College Promise (Ley AB 19):** Paga el **100% de la colegiatura y cuotas por 2 años completos** si vive en California y toma 12 o más créditos.
- **Estudiantes indocumentados:** Llenen la solicitud CADAA (California Dream Act). La ley estatal mantiene sus datos escolares privados y no los comparte con autoridades migratorias.
- **Libros:** Estudiantes de primera generación pueden pedir ayuda para libros y útiles en el Centro de Éxito Estudiantil.

**Próximo paso:** Primero solicite admisión en OpenCCC para obtener su número estudiantil. Después envíe su CADAA o FAFSA.`
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
      en: `**In California, teens can get private mental health support.**

- **Health and Safety Code § 124260:** If you are 12 or older, you can agree to outpatient counseling without telling your parents.
- **California Youth Crisis Text Line:** Text **HOPE** to **844-555-TEEN** (simulated). It is free, private and open 24/7. Trained young listeners answer.
- **Sunnyvale Youth Wellness Hub:** Drop in after school, 3:00 PM to 7:30 PM. There is art, quiet rooms and peer listeners. No insurance card and no school report.

**Next step:** Save the number in your phone as "Peer Line". Text any time you feel stressed.`,
      es: `**En California, los jóvenes pueden recibir apoyo emocional privado.**

- **Código de Salud y Seguridad § 124260:** Si tienes 12 años o más, puedes aceptar consejería sin avisar a tus padres.
- **Línea de Texto de Crisis Juvenil de California:** Envía **HOPE** al **844-555-TEEN** (simulado). Es gratis, privada y responde 24/7. Contestan jóvenes capacitados.
- **Centro de Bienestar Juvenil de Sunnyvale:** Entra después de clases, de 3:00 PM a 7:30 PM. Hay arte, salas tranquilas y apoyo entre jóvenes. No piden seguro médico ni reportan a la escuela.

**Próximo paso:** Guarda el número como "Apoyo Amigo" en tu celular. Escribe cuando te sientas con estrés.`
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
    followUpIds: ['ans-mental-school-privacy', 'ans-mental-drop-in-what-happens', 'ans-mental-text-practice', 'ans-mental-session-cost', 'ans-mental-medi-cal-therapist', 'ans-mental-bay-area-consultation']
  },
  {
    id: 'ans-senior-cultural-circles',
    topic: 'senior',
    question: {
      en: 'Where are Spanish-speaking senior gatherings near Redwood City?',
      es: '¿Dónde hay convivencias para adultos mayores en español cerca de Redwood City?'
    },
    answer: {
      en: `**Free Spanish-speaking gatherings for older adults are close by.**

- **Casa Círculo Cultural Senior Circle:** Meets Tuesday and Thursday, 10:00 AM to 1:30 PM, in North Fair Oaks. There are crafts, chair yoga, music and a hot lunch.
- **Ride help:** Staff can sign you up for **SamTrans Redi-Wheels**. The van picks you up at your home.
- **Cost:** Free. No fees and no membership.

**Next step:** Call the bilingual coordinator Carmen at (650) 555-CASA (simulated), or come this Tuesday at 10:00 AM. Coffee is free.`,
      es: `**Hay convivencias gratis en español para adultos mayores cerca de usted.**

- **Círculo de Adultos Mayores de Casa Círculo Cultural:** Se reúnen martes y jueves, de 10:00 AM a 1:30 PM, en North Fair Oaks. Hay manualidades, yoga en silla, música y almuerzo caliente.
- **Transporte:** El personal le ayuda a inscribirse en **SamTrans Redi-Wheels**. La camioneta pasa por usted a su casa.
- **Costo:** Gratis. Sin cuotas ni membresías.

**Próximo paso:** Llame a la coordinadora bilingüe Carmen al (650) 555-CASA (simulado), o llegue el martes a las 10:00 AM. El café es gratis.`
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
      en: `**[Practice call is on]**

*"Good morning! This is the Silicon Valley Community Support Desk. My name is Elena. Take your time. We are here to help and we do not judge.*

*Which neighborhood are you calling from? And are you looking for food, job training or health support today?"*

*That is how a real intake call sounds. Reply the way you would on the phone, and we will keep practicing.*`,
      es: `**[La llamada de práctica está activa]**

*"¡Buenos días! Habla la Mesa de Apoyo Comunitario de Silicon Valley. Mi nombre es Elena. Tómese su tiempo. Estamos aquí para ayudar y no juzgamos.*

*¿Desde qué barrio nos llama? ¿Y busca comida, capacitación o apoyo emocional hoy?"*

*Así suena una llamada de registro real. Respóndame como lo haría por teléfono y seguimos practicando.*`
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
