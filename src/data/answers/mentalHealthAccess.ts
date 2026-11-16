import type { ScriptedAnswer } from './types';

/**
 * Reviewed mental-health access answers for common Medi-Cal and counseling questions.
 * Wording and sources follow the California Department of Health Care Services (DHCS)
 * and Santa Clara County Behavioral Health Services public guidance. No diagnosis,
 * eligibility determination or clinical advice is given here.
 */
export const mentalHealthAccessAnswers: ScriptedAnswer[] = [
  {
    id: 'ans-mental-counseling-cost',
    topic: 'mental',
    question: {
      en: "What's the price for mental health counseling?",
      es: '¿Cuánto cuesta la consejería de salud mental?'
    },
    answer: {
      en: 'Counseling prices in the Bay Area can vary depending on your insurance and eligibility. If you are under 21 and enrolled in Medi-Cal, many medically necessary mental health services are covered at no cost through Medi-Cal for Kids & Teens. These services may include therapy, counseling, crisis care, and other behavioral-health support. You can also ask your health-care provider or your Medi-Cal plan about available services and costs. If you are experiencing a crisis, call or text 988 for immediate support.',
      es: 'Los precios de la consejería en el Área de la Bahía varían según tu seguro y tu elegibilidad. Si tienes menos de 21 años y estás inscrito en Medi-Cal, muchos servicios de salud mental médicamente necesarios están cubiertos sin costo a través de Medi-Cal para Niños y Adolescentes. Estos servicios pueden incluir terapia, consejería, atención en crisis y otros apoyos de salud conductual. También puedes preguntar a tu proveedor de salud o a tu plan de Medi-Cal sobre los servicios y costos disponibles. Si estás en una crisis, llama o envía un mensaje de texto al 988 para recibir apoyo inmediato.'
    },
    context: [
      { en: 'Bay Area', es: 'Área de la Bahía' },
      { en: 'Medi-Cal', es: 'Medi-Cal' },
      { en: 'Cost & coverage', es: 'Costo y cobertura' }
    ],
    links: [
      {
        label: { en: 'Medi-Cal for Kids & Teens', es: 'Medi-Cal para Niños y Adolescentes' },
        source: { en: 'California Department of Health Care Services (DHCS)', es: 'Departamento de Servicios de Salud de California (DHCS)' },
        url: 'https://www.dhcs.ca.gov/'
      },
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
      title: { en: 'County referral for services', es: 'Referencia del condado para servicios' },
      detail: {
        en: 'If you live in Santa Clara County and need help finding services, contact the Santa Clara County Behavioral Health Services Call Center at (800) 704-0900. They can help connect you with mental-health and substance-use services.',
        es: 'Si vives en el Condado de Santa Clara y necesitas ayuda para encontrar servicios, llama al Centro de Llamadas de Servicios de Salud Conductual del Condado de Santa Clara al (800) 704-0900. Pueden ayudarte a conectarte con servicios de salud mental y de uso de sustancias.'
      },
      actions: [
        {
          id: 'ans-mental-counseling-cost-link',
          kind: 'open-link',
          label: { en: 'Open Santa Clara County Behavioral Health Services', es: 'Abrir Servicios de Salud Conductual del Condado de Santa Clara' },
          url: 'https://bhsd.sccgov.org/'
        },
        {
          id: 'ans-mental-counseling-cost-save',
          kind: 'save-plan',
          label: { en: 'Save mental health resources to my plan', es: 'Guardar recursos de salud mental en mi plan' },
          resourceId: 'res-mental-1'
        }
      ]
    },
    resourceIds: ['res-mental-1', 'res-mental-2'],
    followUpIds: ['ans-mental-medi-cal-clinic', 'ans-mental-after-session', 'ans-mental-confidential-teens']
  },
  {
    id: 'ans-mental-medi-cal-clinic',
    topic: 'mental',
    question: {
      en: 'How do I find a clinic that accepts Medi-Cal in the Bay Area?',
      es: '¿Cómo encuentro una clínica que acepte Medi-Cal en el Área de la Bahía?'
    },
    answer: {
      en: 'Here are a few ways to find a mental-health clinic that accepts Medi-Cal in the Bay Area. First, call the Member Services number on your Medi-Cal health-plan card, or ask your primary-care provider for help finding a clinic. You can also contact your county mental-health plan and ask for its current provider directory. The directory can show where providers are located and what services they offer. Before making an appointment, ask whether the clinic accepts your specific Medi-Cal plan, is accepting new patients, and offers services in your preferred language or format.',
      es: 'Aquí hay varias formas de encontrar una clínica de salud mental que acepte Medi-Cal en el Área de la Bahía. Primero, llama al número de Servicios para Miembros que aparece en tu tarjeta del plan de salud de Medi-Cal, o pide ayuda a tu proveedor de atención primaria para encontrar una clínica. También puedes comunicarte con el plan de salud mental de tu condado y pedir su directorio actual de proveedores. El directorio puede mostrar dónde están los proveedores y qué servicios ofrecen. Antes de hacer una cita, pregunta si la clínica acepta tu plan específico de Medi-Cal, si está aceptando nuevos pacientes y si ofrece servicios en tu idioma o formato preferido.'
    },
    context: [
      { en: 'Bay Area', es: 'Área de la Bahía' },
      { en: 'Medi-Cal', es: 'Medi-Cal' },
      { en: 'Finding a provider', es: 'Encontrar un proveedor' }
    ],
    links: [
      {
        label: { en: 'Medi-Cal members: health plan and member services', es: 'Personas inscritas en Medi-Cal: plan de salud y servicios para miembros' },
        source: { en: 'California Department of Health Care Services (DHCS)', es: 'Departamento de Servicios de Salud de California (DHCS)' },
        url: 'https://www.medi-cal.ca.gov/'
      },
      {
        label: { en: 'Santa Clara County Behavioral Health Services', es: 'Servicios de Salud Conductual del Condado de Santa Clara' },
        source: { en: 'County of Santa Clara', es: 'Condado de Santa Clara' },
        url: 'https://bhsd.sccgov.org/'
      }
    ],
    nextStep: {
      title: { en: 'County referral and provider directory', es: 'Referencia del condado y directorio de proveedores' },
      detail: {
        en: 'If you live in Santa Clara County, call Behavioral Health Services at (800) 704-0900 for a mental-health referral, or use the provider directory on its website.',
        es: 'Si vives en el Condado de Santa Clara, llama a Behavioral Health Services al (800) 704-0900 para una referencia de salud mental, o usa el directorio de proveedores en su sitio web.'
      },
      actions: [
        {
          id: 'ans-mental-medi-cal-clinic-link',
          kind: 'open-link',
          label: { en: 'Open Santa Clara County Behavioral Health Services', es: 'Abrir Servicios de Salud Conductual del Condado de Santa Clara' },
          url: 'https://bhsd.sccgov.org/'
        },
        {
          id: 'ans-mental-medi-cal-clinic-save',
          kind: 'save-plan',
          label: { en: 'Save a Medi-Cal counseling listing to my plan', es: 'Guardar una opción de consejería con Medi-Cal en mi plan' },
          resourceId: 'res-mental-3'
        }
      ]
    },
    resourceIds: ['res-mental-3', 'res-mental-1'],
    followUpIds: ['ans-mental-counseling-cost', 'ans-mental-after-session', 'ans-mental-confidential-teens']
  },
  {
    id: 'ans-mental-after-session',
    topic: 'mental',
    question: {
      en: 'What do I do after a counseling session?',
      es: '¿Qué hago después de una sesión de consejería?'
    },
    answer: {
      en: 'After a counseling session, ask your provider when you should return and what steps you should take next. If you are receiving ongoing, non-urgent mental-health related counseling, DHCS says your county must offer a follow-up appointment within 10 business days of your previous appointment.',
      es: 'Después de una sesión de consejería, pregunta a tu proveedor cuándo deberías regresar y qué pasos deberías seguir. Si recibes consejería continua de salud mental que no es urgente, el DHCS indica que tu condado debe ofrecer una cita de seguimiento dentro de los 10 días hábiles posteriores a la cita anterior.'
    },
    context: [
      { en: 'Medi-Cal', es: 'Medi-Cal' },
      { en: 'Ongoing care', es: 'Atención continua' },
      { en: 'Mental health', es: 'Salud mental' }
    ],
    links: [
      {
        label: { en: 'Mental health services under Medi-Cal', es: 'Servicios de salud mental con Medi-Cal' },
        source: { en: 'California Department of Health Care Services (DHCS)', es: 'Departamento de Servicios de Salud de California (DHCS)' },
        url: 'https://www.dhcs.ca.gov/'
      },
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
      title: { en: 'Who to contact about your care', es: 'A quién contactar sobre tu atención' },
      detail: {
        en: 'If you have questions about your care or need help scheduling another appointment, contact your Medi-Cal health plan, primary-care provider, or county mental-health plan. They can help you access mental-health services. If you live in Santa Clara County, you can call Behavioral Health Services at (800) 704-0900 for support or referrals. If you are experiencing a mental-health crisis, call or text 988 for immediate help.',
        es: 'Si tienes preguntas sobre tu atención o necesitas ayuda para programar otra cita, comunícate con tu plan de salud de Medi-Cal, tu proveedor de atención primaria o el plan de salud mental de tu condado. Ellos pueden ayudarte a acceder a servicios de salud mental. Si vives en el Condado de Santa Clara, puedes llamar a Behavioral Health Services al (800) 704-0900 para apoyo o referencias. Si estás en una crisis de salud mental, llama o envía un mensaje de texto al 988 para recibir ayuda inmediata.'
      },
      actions: [
        {
          id: 'ans-mental-after-session-link',
          kind: 'open-link',
          label: { en: 'Open Santa Clara County Behavioral Health Services', es: 'Abrir Servicios de Salud Conductual del Condado de Santa Clara' },
          url: 'https://bhsd.sccgov.org/'
        },
        {
          id: 'ans-mental-after-session-save',
          kind: 'save-plan',
          label: { en: 'Save mental health resources to my plan', es: 'Guardar recursos de salud mental en mi plan' },
          resourceId: 'res-mental-1'
        }
      ]
    },
    resourceIds: ['res-mental-1', 'res-mental-2'],
    followUpIds: ['ans-mental-counseling-cost', 'ans-mental-medi-cal-clinic', 'ans-mental-confidential-teens']
  }
];

/**
 * Route natural phrasings of the three access questions to their reviewed answers.
 * Crisis language is deliberately excluded here so the crisis script still wins.
 */
export const routeMentalHealthAccessQuestion = (question: string): string | undefined => {
  const text = question.toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[’']/g, "'");

  const isCrisis = /(?:hurt myself|harm myself|kill myself|want to die|suicid|quitarme la vida|quiero morir|hacerme dano)/.test(text);
  if (isCrisis) return undefined;

  const mentionsCare = /(?:counsel|therap|psycholog|mental|consejer|terap|psicolog|salud mental)/.test(text);

  if (/(?:after|next|follow.?up|despues|siguiente)/.test(text)
    && /(?:session|appointment|cita|sesion)/.test(text)
    && mentionsCare) {
    return 'ans-mental-after-session';
  }
  if (/(?:price|cost|pay|fee|afford|cuanto (?:cuesta|sale)|costo|precio|tarifa)/.test(text) && mentionsCare) {
    return 'ans-mental-counseling-cost';
  }
  if (/(?:clinic|clinica|provider|proveedor|directory|directorio)/.test(text)
    && /(?:medi-?cal|medical)/.test(text)) {
    return 'ans-mental-medi-cal-clinic';
  }
  return undefined;
};
