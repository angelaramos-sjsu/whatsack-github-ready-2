export interface EducationChatSource {
  label: string;
  url: string;
}

export interface EducationChatResponse {
  intent: string;
  text: string;
  nextStepInsights: string[];
  followUps: string[];
  sources: EducationChatSource[];
}

type Language = 'en' | 'es';

const sourceLinks: Record<string, EducationChatSource> = {
  fafsa: { label: 'Federal Student Aid: FAFSA', url: 'https://studentaid.gov/h/apply-for-aid/fafsa' },
  deadlines: { label: 'Federal Student Aid: FAFSA deadlines', url: 'https://studentaid.gov/apply-for-aid/fafsa/fafsa-deadlines' },
  csac: { label: 'California Student Aid Commission: Apply for aid', url: 'https://www.csac.ca.gov/apply' },
  transfer: { label: 'California Community Colleges: Associate Degree for Transfer', url: 'https://icangotocollege.com/associate-degree-for-transfer' },
  edd: { label: 'California EDD: Training resources for job seekers', url: 'https://edd.ca.gov/en/jobs_and_training/Resources_for_Job_Seekers/' },
  etpl: { label: 'California EDD: Eligible Training Provider List', url: 'https://edd.ca.gov/en/jobs_and_training/Eligible_Training_Provider_List/' },
  ajcc: { label: 'America’s Job Center of California', url: 'https://edd.ca.gov/ajcc' },
};

const responses: Record<string, Omit<EducationChatResponse, 'sources'>> = {
  sofiaStart: {
    intent: 'Sofia: explore college options and affordability',
    text: 'You have a few possible routes, and you do not have to choose one today. You can compare starting at a community college, applying directly to a four-year university, or beginning at community college and transferring later. Costs and financial-aid options vary by school and by your circumstances, so I can help you compare them without predicting what aid you will receive.',
    nextStepInsights: ['Compare total cost after aid, including books, housing, and transportation.', 'Consider location, programs, student support, and whether a transfer route fits your goals.'],
    followUps: ['What’s the difference between community college and a university?', 'Can I start at community college and transfer later?', 'What should I know about FAFSA and the Cal Grant?'],
  },
  compare: {
    intent: 'Sofia: compare community college and university pathways',
    text: 'A community college can be a lower-cost place to begin college, complete general education, and explore a major. A four-year university lets you start in a bachelor’s-degree program, but tuition and living costs vary widely. Compare the full cost, programs, commute or housing, advising, and student support before deciding.',
    nextStepInsights: ['Look at each school’s net-price estimate, not tuition alone.', 'Ask whether your intended major has a transfer pathway and which courses count.'],
    followUps: ['Can I start at community college and transfer later?', 'What financial-aid applications should I check?', 'Where can I talk to a college adviser?'],
  },
  transfer: {
    intent: 'Sofia: understand transfer pathways',
    text: 'Yes. Many students begin at a California community college and transfer to complete a bachelor’s degree. An Associate Degree for Transfer can provide a pathway to a participating CSU when its requirements are met. It does not guarantee a particular campus or major, and other transfer routes have their own rules. A counselor can help you plan courses for your intended major.',
    nextStepInsights: ['Choose a possible major and transfer destination before selecting classes.', 'Ask a counselor which transfer agreement and course plan apply to that destination.'],
    followUps: ['How do I compare transfer destinations?', 'What application deadlines should I check?', 'Where can I talk to a transfer adviser?'],
  },
  aid: {
    intent: 'Sofia: learn about FAFSA, Cal Grant, and scholarships',
    text: 'The FAFSA is the free application for federal student aid. California uses the FAFSA or the California Dream Act Application (CADAA) for state-aid consideration, including Cal Grant; which form is appropriate depends on your eligibility. The 2027–28 FAFSA is available for students attending between July 1, 2027, and June 30, 2028. Scholarships may have separate applications and deadlines. Completing a form does not guarantee an award.',
    nextStepInsights: ['Use the official Student Aid and CSAC sites to confirm which application fits your situation.', 'Ask your high-school counselor whether your GPA needs to be sent to CSAC for Cal Grant consideration.'],
    followUps: ['What deadlines should I check first?', 'Where can I get help completing an application?', 'What should I do this week to get started?'],
  },
  deadlines: {
    intent: 'Sofia: identify financial-aid deadlines',
    text: 'For 2027–28 California state aid, CSAC currently lists March 2, 2027, as the priority deadline. California community-college students have a later September 2, 2027, deadline for state aid. Colleges and scholarships may set earlier dates, so check each school’s current calendar. Deadlines can change; confirm them on the official pages before submitting.',
    nextStepInsights: ['Put the state-aid date and each college’s admission and scholarship dates on one calendar.', 'Apply early when possible, and ask each college whether it has an earlier priority date.'],
    followUps: ['What should I know about FAFSA and the Cal Grant?', 'Where can I get help with financial aid?', 'Can I start at community college and transfer later?'],
  },
  sofiaWeek: {
    intent: 'Sofia: choose a first college-planning step',
    text: 'This week, you could write down a few subjects or careers that interest you, then choose two or three colleges to explore. Compare their programs, application dates, estimated costs, and student support. You can start with general questions; you do not need to have a final college choice or share sensitive details here.',
    nextStepInsights: ['Book time with your high-school counselor or college-and-career center.', 'Make a short list of questions about costs, aid, majors, and deadlines.'],
    followUps: ['What’s the difference between community college and a university?', 'What should I know about FAFSA and the Cal Grant?', 'Where can I talk to a college adviser?'],
  },
  sofiaAdviser: {
    intent: 'Sofia: connect with college and financial-aid support',
    text: 'A good first contact is your high-school counselor or college-and-career center. You can also contact the admissions, outreach, transfer, or financial-aid office at a college you are considering. They can answer school-specific questions about applications, transfer plans, forms, and deadlines.',
    nextStepInsights: ['Bring your questions about programs, cost, deadlines, and support services.', 'Ask whether the school offers free application or financial-aid workshops.'],
    followUps: ['What deadlines should I check first?', 'What should I know about FAFSA and the Cal Grant?', 'Can I start at community college and transfer later?'],
  },
  danielStart: {
    intent: 'Daniel: explore affordable retraining after a layoff',
    text: 'I’m sorry you’re dealing with a layoff. Possible routes include community-college certificates, workforce training, and apprenticeship programs. Which options fit depends on your interests, schedule, location, program requirements, and funding availability. A California workforce professional can help you check fit and possible support; training or a job outcome is not guaranteed.',
    nextStepInsights: ['Start by naming a few fields you would like to explore and the schedule you need.', 'Ask a workforce professional about program cost, duration, funding, and career services before enrolling.'],
    followUps: ['What training programs are available near me?', 'Could workforce funding help pay for training?', 'Who can help me compare programs and funding?'],
  },
  programs: {
    intent: 'Daniel: find nearby training options',
    text: 'You can search community-college certificates, apprenticeships, and workforce-approved training. California’s Eligible Training Provider List is one place to check approved providers. America’s Job Center of California offers no-cost job and training services and can help you explore local options. Tell me a field or commute area if you want to narrow the search.',
    nextStepInsights: ['Check whether the exact program and provider appear on the current EDD list.', 'Contact a local AJCC to discuss local options and possible funding.'],
    followUps: ['How long do programs take, and what do they cost?', 'Could workforce funding help pay for training?', 'What requirements should I check before applying?'],
  },
  cost: {
    intent: 'Daniel: compare program length and cost',
    text: 'Program length and cost depend on the school and credential. Compare tuition and fees, books or equipment, exam costs, class schedule, and the time needed to finish. I do not have a verified cost or completion estimate for a specific program yet, so the training provider should confirm those details.',
    nextStepInsights: ['Ask each provider for the full cost and expected schedule in writing.', 'Check whether prior coursework or work experience can count toward program requirements.'],
    followUps: ['What training programs are available near me?', 'Could workforce funding help pay for training?', 'Who can help me compare programs and funding?'],
  },
  funding: {
    intent: 'Daniel: explore possible workforce funding',
    text: 'Workforce funding may be available for some job seekers and some training programs, but eligibility, funding, and approved programs depend on your circumstances and local availability. EDD’s Eligible Training Provider List identifies approved providers, and an America’s Job Center of California can explain local steps. A counselor would need to confirm whether a specific program is covered.',
    nextStepInsights: ['Contact an AJCC before enrolling and ask whether the exact program is eligible for funding.', 'If you receive unemployment benefits, ask EDD how training may affect your claim.'],
    followUps: ['What training programs are available near me?', 'What requirements should I check before applying?', 'Who can help me compare programs and funding?'],
  },
  requirements: {
    intent: 'Daniel: check training program requirements',
    text: 'Requirements vary by program. Check prerequisites, application steps, required documents, schedule, and any equipment or technology you will need. If you are seeking workforce funding, ask the AJCC whether the exact program and provider meet its current rules. The school or workforce office makes the official decision.',
    nextStepInsights: ['Make a checklist for each program and confirm details with its provider.', 'Ask whether the program is on the current EDD approved-provider list before relying on funding.'],
    followUps: ['How long do programs take, and what do they cost?', 'Could workforce funding help pay for training?', 'Where can I find nearby training options?'],
  },
  danielAdviser: {
    intent: 'Daniel: connect with workforce and training support',
    text: 'An America’s Job Center of California can provide no-cost job and training services and help you explore workforce options. A college counselor or program adviser can explain course requirements, schedules, and costs. Use EDD’s office locator to find a nearby center and confirm its services before visiting.',
    nextStepInsights: ['Ask about training length, full cost, possible funding, and career services.', 'Compare answers from the workforce center and the training provider before enrolling.'],
    followUps: ['What training programs are available near me?', 'Could workforce funding help pay for training?', 'What requirements should I check before applying?'],
  },
  danielWeek: {
    intent: 'Daniel: choose a first retraining step',
    text: 'This week, you could list skills you want to use and two or three fields you would like to explore. Then compare a couple of training programs and contact an AJCC to ask about local services and possible funding. You can get advice before choosing or enrolling in a program.',
    nextStepInsights: ['Write down your preferred schedule, commute, and budget range.', 'Ask for written program costs and confirm funding eligibility before enrolling.'],
    followUps: ['What training programs are available near me?', 'How long do programs take, and what do they cost?', 'Who can help me compare programs and funding?'],
  },
};

function makeResponse(key: string, language: Language, sources: EducationChatSource[]): EducationChatResponse {
  const response = responses[key];
  const localizedSources = language === 'es'
    ? sources.map((source) => {
        const labels: Record<string, string> = {
          'Federal Student Aid: FAFSA': 'Federal Student Aid: solicitud FAFSA',
          'Federal Student Aid: FAFSA deadlines': 'Federal Student Aid: fechas límite de FAFSA',
          'California Student Aid Commission: Apply for aid': 'Comisión de Ayuda Estudiantil de California: solicitar ayuda',
          'California Community Colleges: Associate Degree for Transfer': 'Colegios Comunitarios de California: título de transferencia',
          'California EDD: Training resources for job seekers': 'EDD de California: capacitación para personas que buscan empleo',
          'California EDD: Eligible Training Provider List': 'EDD de California: lista de proveedores de capacitación elegibles',
          'America’s Job Center of California': 'Centros de Empleo de California',
        };
        return { ...source, label: labels[source.label] || source.label };
      })
    : sources;
  const spanish: Record<string, Partial<EducationChatResponse>> = {
    sofiaStart: {
      intent: 'Sofía: explorar opciones universitarias y costos',
      text: 'Hay varias rutas posibles y no tienes que elegir una hoy. Puedes comparar comenzar en un colegio comunitario, solicitar ingreso directo a una universidad de cuatro años o empezar en un colegio comunitario y transferirte después. Los costos y las opciones de ayuda varían según la institución y tu situación; puedo ayudarte a compararlas, pero no puedo predecir cuánto apoyo recibirías.',
      nextStepInsights: ['Compara el costo total después de la ayuda, incluidos libros, vivienda y transporte.', 'Considera la ubicación, los programas, la asesoría y el apoyo estudiantil.'],
      followUps: ['¿Cuál es la diferencia entre un colegio comunitario y una universidad?', '¿Puedo comenzar en un colegio comunitario y transferirme después?', '¿Qué debo saber sobre FAFSA y Cal Grant?'],
    },
    compare: {
      intent: 'Sofía: comparar colegios comunitarios y universidades',
      text: 'Un colegio comunitario puede ser una opción de menor costo para comenzar, completar cursos generales y explorar una especialidad. Una universidad de cuatro años te permite comenzar en un programa de licenciatura, pero la matrícula y los gastos de vida varían mucho. Compara el costo total, los programas, el transporte o la vivienda, la asesoría y el apoyo estudiantil.',
      nextStepInsights: ['Consulta el costo neto estimado de cada institución, no solo la matrícula.', 'Pregunta qué cursos cuentan para la especialidad y las rutas de transferencia.'],
      followUps: ['¿Puedo comenzar en un colegio comunitario y transferirme después?', '¿Qué solicitudes de ayuda financiera debo revisar?', '¿Dónde puedo hablar con una persona asesora?'],
    },
    transfer: {
      intent: 'Sofía: conocer rutas de transferencia',
      text: 'Sí. Muchas personas comienzan en un colegio comunitario de California y luego se transfieren para completar una licenciatura. Un Associate Degree for Transfer puede ofrecer una ruta hacia una CSU participante si cumples los requisitos. No garantiza un campus o una especialidad específica, y otras rutas tienen sus propias reglas. Una persona asesora puede ayudarte a planificar tus cursos.',
      nextStepInsights: ['Elige una posible especialidad y destino antes de seleccionar cursos.', 'Pregunta qué acuerdo de transferencia y plan de cursos se aplican.'],
      followUps: ['¿Cómo comparo destinos de transferencia?', '¿Qué fechas límite debo revisar?', '¿Dónde puedo hablar con una persona asesora de transferencia?'],
    },
    aid: {
      intent: 'Sofía: conocer FAFSA, Cal Grant y becas',
      text: 'FAFSA es la solicitud gratuita de ayuda federal para estudiantes. California usa FAFSA o la California Dream Act Application (CADAA) para considerar ayuda estatal, incluido Cal Grant; el formulario apropiado depende de tu elegibilidad. FAFSA 2027–28 está disponible para estudios entre el 1 de julio de 2027 y el 30 de junio de 2028. Las becas pueden tener solicitudes y fechas separadas. Completar una solicitud no garantiza recibir ayuda.',
      nextStepInsights: ['Consulta los sitios oficiales de Federal Student Aid y CSAC para confirmar qué solicitud te corresponde.', 'Pregunta a tu consejería escolar si deben enviar tu promedio a CSAC para considerar Cal Grant.'],
      followUps: ['¿Qué fechas límite debo revisar primero?', '¿Dónde puedo recibir ayuda para completar una solicitud?', '¿Qué puedo hacer esta semana para comenzar?'],
    },
    deadlines: {
      intent: 'Sofía: identificar fechas límite de ayuda financiera',
      text: 'Para la ayuda estatal de California 2027–28, CSAC indica actualmente el 2 de marzo de 2027 como fecha prioritaria. Los estudiantes de colegios comunitarios de California tienen hasta el 2 de septiembre de 2027 para la ayuda estatal. Las universidades y becas pueden tener fechas anteriores; consulta el calendario actualizado de cada institución. Confirma las fechas en los sitios oficiales antes de enviar solicitudes.',
      nextStepInsights: ['Anota en un calendario la fecha de ayuda estatal y las fechas de admisión y becas de cada universidad.', 'Solicita temprano cuando sea posible y pregunta si cada universidad tiene una fecha prioritaria anterior.'],
      followUps: ['¿Qué debo saber sobre FAFSA y Cal Grant?', '¿Dónde puedo recibir ayuda con la ayuda financiera?', '¿Puedo comenzar en un colegio comunitario y transferirme después?'],
    },
    sofiaWeek: {
      intent: 'Sofía: elegir un primer paso para planificar la universidad',
      text: 'Esta semana puedes anotar algunas materias o carreras que te interesen y elegir dos o tres universidades para explorar. Compara sus programas, fechas de solicitud, costos estimados y apoyos estudiantiles. Puedes comenzar con preguntas generales; no necesitas decidir todavía ni compartir información delicada aquí.',
      nextStepInsights: ['Pide una cita con tu consejera escolar o el centro de orientación universitaria.', 'Prepara preguntas sobre costos, ayuda, especialidades y fechas límite.'],
      followUps: ['¿Cuál es la diferencia entre un colegio comunitario y una universidad?', '¿Qué debo saber sobre FAFSA y Cal Grant?', '¿Dónde puedo hablar con una persona asesora?'],
    },
    sofiaAdviser: {
      intent: 'Sofía: contactar apoyo universitario y de ayuda financiera',
      text: 'Puedes comenzar con tu consejera escolar o el centro de orientación universitaria. También puedes contactar admisiones, orientación, transferencia o ayuda financiera de las universidades que consideras. Pueden responder preguntas específicas sobre solicitudes, transferencia, formularios y fechas límite.',
      nextStepInsights: ['Lleva preguntas sobre programas, costos, fechas y servicios de apoyo.', 'Pregunta si ofrecen talleres gratuitos para solicitudes o ayuda financiera.'],
      followUps: ['¿Qué fechas límite debo revisar primero?', '¿Qué debo saber sobre FAFSA y Cal Grant?', '¿Puedo comenzar en un colegio comunitario y transferirme después?'],
    },
    danielStart: {
      intent: 'Daniel: explorar capacitación asequible después de un despido',
      text: 'Lamento que estés pasando por un despido. Algunas rutas posibles son certificados de colegios comunitarios, capacitación laboral y programas de aprendizaje. Las opciones adecuadas dependen de tus intereses, horario, ubicación, requisitos y fondos disponibles. Una persona profesional de empleo puede ayudarte a revisar las opciones; la capacitación o el empleo no están garantizados.',
      nextStepInsights: ['Comienza con algunas áreas que quisieras explorar y el horario que necesitas.', 'Antes de inscribirte, pregunta sobre costo, duración, fondos y servicios de empleo.'],
      followUps: ['¿Qué programas de capacitación hay cerca de mí?', '¿Podrían ayudarme fondos de capacitación laboral?', '¿Quién puede ayudarme a comparar programas y fondos?'],
    },
    programs: {
      intent: 'Daniel: encontrar capacitación cercana',
      text: 'Puedes buscar certificados de colegios comunitarios, programas de aprendizaje y capacitación aprobada por el sistema laboral. La Lista de Proveedores de Capacitación Elegibles de California ayuda a consultar proveedores aprobados. America’s Job Center of California ofrece servicios gratuitos de empleo y capacitación y puede ayudarte a explorar opciones locales. Dime qué campo o distancia te interesa para limitar la búsqueda.',
      nextStepInsights: ['Confirma que el programa y proveedor exactos aparezcan en la lista vigente de EDD.', 'Contacta un AJCC local para consultar opciones y posibles fondos.'],
      followUps: ['¿Cuánto duran los programas y cuánto cuestan?', '¿Podrían ayudarme fondos de capacitación laboral?', '¿Qué requisitos debo revisar antes de solicitar?'],
    },
    cost: {
      intent: 'Daniel: comparar duración y costo de programas',
      text: 'La duración y el costo dependen de la institución y la credencial. Compara matrícula y cuotas, libros o equipo, exámenes, horario y tiempo para terminar. Todavía no tengo un costo verificado para un programa específico; la institución debe confirmar esos detalles.',
      nextStepInsights: ['Pide por escrito el costo total y el horario esperado.', 'Pregunta si se pueden reconocer cursos anteriores o experiencia laboral.'],
      followUps: ['¿Qué programas de capacitación hay cerca de mí?', '¿Podrían ayudarme fondos de capacitación laboral?', '¿Quién puede ayudarme a comparar programas y fondos?'],
    },
    funding: {
      intent: 'Daniel: explorar posibles fondos de capacitación laboral',
      text: 'Puede haber fondos para algunas personas y algunos programas, pero la elegibilidad, los fondos y los programas aprobados dependen de tu situación y de la disponibilidad local. La lista de EDD identifica proveedores aprobados, y America’s Job Center of California puede explicar los pasos locales. Una persona asesora debe confirmar si un programa específico está cubierto.',
      nextStepInsights: ['Contacta un AJCC antes de inscribirte y pregunta si el programa exacto puede recibir fondos.', 'Si recibes beneficios por desempleo, pregunta a EDD cómo la capacitación podría afectar tu solicitud.'],
      followUps: ['¿Qué programas de capacitación hay cerca de mí?', '¿Qué requisitos debo revisar antes de solicitar?', '¿Quién puede ayudarme a comparar programas y fondos?'],
    },
    requirements: {
      intent: 'Daniel: revisar requisitos de capacitación',
      text: 'Los requisitos dependen del programa. Revisa los prerrequisitos, pasos de solicitud, documentos, horario y equipo o tecnología necesarios. Si buscas fondos laborales, pregunta al AJCC si el programa y proveedor exactos cumplen las reglas actuales. La institución o la oficina de empleo toma la decisión oficial.',
      nextStepInsights: ['Haz una lista de requisitos para cada programa y confírmala con la institución.', 'Antes de contar con fondos, confirma que el proveedor esté en la lista vigente de EDD.'],
      followUps: ['¿Cuánto duran los programas y cuánto cuestan?', '¿Podrían ayudarme fondos de capacitación laboral?', '¿Dónde encuentro capacitación cercana?'],
    },
    danielAdviser: {
      intent: 'Daniel: contactar apoyo de empleo y capacitación',
      text: 'America’s Job Center of California ofrece servicios gratuitos de empleo y capacitación y puede ayudarte a explorar opciones. Una persona asesora de un colegio puede explicarte requisitos, horarios y costos. Usa el localizador de EDD para encontrar un centro cercano y confirmar sus servicios antes de visitarlo.',
      nextStepInsights: ['Pregunta por duración, costo total, posibles fondos y servicios de empleo.', 'Compara la información del centro laboral con la de la institución antes de inscribirte.'],
      followUps: ['¿Qué programas de capacitación hay cerca de mí?', '¿Podrían ayudarme fondos de capacitación laboral?', '¿Qué requisitos debo revisar antes de solicitar?'],
    },
    danielWeek: {
      intent: 'Daniel: elegir un primer paso para volver a capacitarse',
      text: 'Esta semana puedes anotar las habilidades que quieres usar y dos o tres campos que te gustaría explorar. Después, compara algunos programas y contacta un AJCC para preguntar sobre servicios locales y posibles fondos. Puedes pedir orientación antes de elegir o inscribirte.',
      nextStepInsights: ['Anota el horario, distancia y presupuesto aproximados que te funcionarían.', 'Pide por escrito los costos y confirma cualquier fondo antes de inscribirte.'],
      followUps: ['¿Qué programas de capacitación hay cerca de mí?', '¿Cuánto duran los programas y cuánto cuestan?', '¿Quién puede ayudarme a comparar programas y fondos?'],
    },
    general: {
      intent: 'Education and workforce navigation',
      text: 'I can help you explore college, financial aid, transfer, and workforce-training information. To keep the guidance relevant, tell me which you want to focus on first. You can skip personal questions and still receive general information.',
      nextStepInsights: ['Choose one topic to start: college options, financial aid, transfer, or retraining.', 'For official decisions, check with the school, California Student Aid Commission, or workforce office.'],
      followUps: ['Compare college pathways', 'Explore FAFSA and Cal Grant', 'Explore workforce training'],
    },
  };

  if (language === 'es') {
    const localized = spanish[key] || {};
    return {
      ...response,
      intent: localized.intent || response.intent,
      text: localized.text || response.text,
      nextStepInsights: localized.nextStepInsights || response.nextStepInsights,
      followUps: localized.followUps || response.followUps,
      sources: localizedSources,
    };
  }
  return { ...response, sources: localizedSources };
}

export function getEducationResponse(input: string, language: Language, personaName?: string): EducationChatResponse | null {
  const q = input.toLowerCase();
  const persona = (personaName || '').toLowerCase();
  const personaIsSofia = persona.includes('sofia');
  const personaIsDaniel = persona.includes('daniel');
  const isSofia = personaIsSofia || (!personaIsDaniel && /\bsofia\b|\bcollege\b|\buniversity\b|\bfafsa\b|\bcal grant\b|\btransfer\b|\bscholarship\b|\bfinancial aid\b|\bcommunity college\b|\buniversidad\b|\bcolegio\b|\bmatr[ií]cula\b|\bbeca\b|\btransferencia\b/.test(q));
  const isDaniel = personaIsDaniel || (!personaIsSofia && /\bdaniel\b|\bla[id] off\b|\bretrain\w*\b|\btraining\b|\bworkforce\b|\bjob\b|\bcareer\b|\bcapacitaci[oó]n\b|\bempleo\b|\bdespido\b|\bcarrera\b/.test(q));
  if (!isSofia && !isDaniel) return null;

  if (/this week|start this week|first step|qué puedo hacer esta semana|esta semana|primer paso|comenzar esta semana/.test(q)) {
    return makeResponse(isSofia ? 'sofiaWeek' : 'danielWeek', language,
      isSofia ? [sourceLinks.csac, sourceLinks.fafsa] : [sourceLinks.ajcc, sourceLinks.edd]);
  }
  if (/who can help|where can i talk|talk to.*(advis|counsel)|advis|counsel|asesor|consejer|orientaci[oó]n/.test(q)) {
    return makeResponse(isSofia ? 'sofiaAdviser' : 'danielAdviser', language,
      isSofia ? [sourceLinks.csac, sourceLinks.fafsa] : [sourceLinks.ajcc, sourceLinks.edd]);
  }
  if (/deadline|due date|when.*(apply|submit)|fechas? l[ií]mite|plazo|cu[aá]ndo.*(solicitar|enviar)/.test(q) && isSofia) {
    return makeResponse('deadlines', language, [sourceLinks.deadlines, sourceLinks.csac]);
  }
  if (/fafsa|cal grant|dream act|cadaa|financial aid|scholarship|beca|ayuda financiera/.test(q) && isSofia) {
    return makeResponse('aid', language, [sourceLinks.fafsa, sourceLinks.csac]);
  }
  if (/transfer|transferencia|adt|associate degree for transfer/.test(q) && isSofia) {
    return makeResponse('transfer', language, [sourceLinks.transfer]);
  }
  if (/difference|versus|\bvs\b|community college and a university|community college or a university|colegio comunitario y una universidad|diferencia/.test(q) && isSofia) {
    return makeResponse('compare', language, [sourceLinks.transfer, sourceLinks.csac]);
  }
  if (/how long|duration|what do they cost|how much.*(cost|tuition)|cost.*(program|training)|cu[aá]nto.*(dura|cuesta)|duraci[oó]n/.test(q) && isDaniel) {
    return makeResponse('cost', language, [sourceLinks.etpl, sourceLinks.edd]);
  }
  if (/funding|pay for training|financial support|wioa|help pay|fondos|financiamiento|pagar.*capacitaci[oó]n/.test(q) && isDaniel) {
    return makeResponse('funding', language, [sourceLinks.edd, sourceLinks.etpl, sourceLinks.ajcc]);
  }
  if (/requirement|prerequisite|before applying|before i apply|requisito|prerrequisito|antes de solicitar/.test(q) && isDaniel) {
    return makeResponse('requirements', language, [sourceLinks.etpl, sourceLinks.edd]);
  }
  if (/near me|available near|nearby|programs are available|training program|training options|cerca de m[ií]|cercan[oa]|programas.*(disponible|capacitaci[oó]n)/.test(q) && isDaniel && !/just lost my job|laid off|retraining|perd[ií] mi trabajo|me despidieron|nueva carrera|quiero explorar/.test(q)) {
    return makeResponse('programs', language, [sourceLinks.etpl, sourceLinks.ajcc]);
  }
  if (isSofia && (/what are my options|how to pay|family.*money|don't have much money|do not have much money|quiero ir a la universidad|no tenemos mucho dinero|opciones/.test(q))) {
    return makeResponse('sofiaStart', language, [sourceLinks.csac, sourceLinks.transfer]);
  }
  if (isDaniel && (/just lost my job|laid off|retrain|new career|affordable training|find work|me despidieron|perd[ií] mi trabajo|nueva carrera/.test(q))) {
    return makeResponse('danielStart', language, [sourceLinks.edd, sourceLinks.etpl, sourceLinks.ajcc]);
  }
  if (isSofia) return makeResponse('sofiaStart', language, [sourceLinks.csac, sourceLinks.transfer]);
  if (isDaniel) return makeResponse('danielStart', language, [sourceLinks.edd, sourceLinks.etpl, sourceLinks.ajcc]);
  return makeResponse('general', language, [sourceLinks.fafsa, sourceLinks.edd]);
}
