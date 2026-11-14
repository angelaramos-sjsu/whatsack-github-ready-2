import type { ScriptedAnswer } from './types';

/** Follow-up answers for mental health, senior services and roleplay practice. */
export const supportFollowUpAnswers: ScriptedAnswer[] = [
  {
    "id": "ans-mental-parent-consent",
    "topic": "mental",
    "question": {
      "en": "Can I talk to a counselor without my parents knowing?",
      "es": "¿Puedo hablar con un consejero sin que mis padres lo sepan?"
    },
    "answer": {
      "en": "In California, a person age 12 or older may consent to certain outpatient mental health counseling if an attending professional decides they are mature enough to participate intelligently. They do not have to be in a crisis. Under Family Code § 6924, the provider generally involves a parent or guardian unless, after consulting the teen, the provider finds that involvement would be inappropriate. Privacy has limits and depends on the service and circumstances; this is not a promise of secrecy. Ask the provider what stays private, when a caregiver might be involved, and whether insurance notices could reach home. WhatSack is a student demonstration, not confidential counseling.",
      "es": "En California, una persona de 12 años o más puede dar su consentimiento para ciertos servicios ambulatorios de salud mental si un profesional considera que tiene la madurez suficiente para participar. No necesita estar en una crisis. Según el Código de Familia § 6924, el profesional generalmente involucra a la madre, el padre o el tutor, a menos que, tras consultar con el adolescente, considere inapropiada esa participación. La privacidad tiene límites y depende del servicio y las circunstancias; no se garantiza el secreto. Pregunta qué datos son privados, cuándo podrían contactar a un adulto responsable y si el seguro podría enviar avisos a casa. WhatSack es una demostración estudiantil, no un servicio de consejería confidencial."
    },
    "context": [
      {
        "en": "Youth mental health — academic demonstration",
        "es": "Salud mental juvenil — demostración académica"
      }
    ],
    "links": [
      {
        "label": {
          "en": "California Family Code § 6924",
          "es": "Código de Familia de California § 6924"
        },
        "source": {
          "en": "California Legislative Information",
          "es": "Información Legislativa de California"
        },
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=6924."
      },
      {
        "label": {
          "en": "Santa Clara County Behavioral Health Services",
          "es": "Servicios de Salud Conductual del Condado de Santa Clara"
        },
        "source": {
          "en": "County of Santa Clara",
          "es": "Condado de Santa Clara"
        },
        "url": "https://bhsd.santaclaracounty.gov/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "NextStep Insight",
        "es": "Próximo paso"
      },
      "detail": {
        "en": "Ask a qualified youth provider to explain minor consent and confidentiality before sharing sensitive details.",
        "es": "Pide a un profesional de salud mental juvenil que explique el consentimiento y la confidencialidad antes de compartir datos delicados."
      },
      "actions": [
        {
          "id": "ans-mental-parent-consent-link",
          "kind": "open-link",
          "label": {
            "en": "Open official resource",
            "es": "Abrir recurso oficial"
          },
          "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=6924."
        }
      ]
    },
    "followUpIds": [
      "ans-mental-affordable-care",
      "ans-mental-school-privacy",
      "ans-mental-medication-consent"
    ]
  },
  {
    "id": "ans-mental-affordable-care",
    "topic": "mental",
    "question": {
      "en": "Can I get mental health help without insurance?",
      "es": "¿Puedo recibir ayuda de salud mental sin seguro médico?"
    },
    "answer": {
      "en": "Some California youth services are offered at no cost, and eligible minors may be able to use limited-scope Medi-Cal Minor Consent Services for certain outpatient mental health care. Eligibility, provider participation, cost, and communications are not the same for everyone. Do not assume care is free or that no notices will be sent home. Ask the county Medi-Cal office or a qualified provider how to apply, what information is needed, and how confidential communications are handled. WhatSack does not determine eligibility or collect insurance identification. For information about California's minor-consent rules, see the official DHCS guidance linked below.",
      "es": "Algunos servicios para jóvenes en California no tienen costo. Además, ciertos menores que cumplan los requisitos pueden usar los Servicios de Consentimiento de Menores de Medi-Cal de alcance limitado para recibir atención ambulatoria de salud mental. La elegibilidad, los costos y las comunicaciones varían. No supongas que todo será gratuito o que nunca llegará un aviso al hogar. Pregunta a la oficina de Medi-Cal del condado o a un profesional cómo solicitar servicios, qué información se necesita y cómo se manejan las comunicaciones privadas. WhatSack no determina la elegibilidad ni pide datos del seguro. Consulta la guía oficial de DHCS."
    },
    "context": [
      {
        "en": "Youth mental health — academic demonstration",
        "es": "Salud mental juvenil — demostración académica"
      }
    ],
    "links": [
      {
        "label": {
          "en": "California DHCS — AB 665 implementation FAQ",
          "es": "DHCS de California — Preguntas frecuentes sobre AB 665"
        },
        "source": {
          "en": "California Department of Health Care Services",
          "es": "Departamento de Servicios de Atención Médica de California"
        },
        "url": "https://www.dhcs.ca.gov/fa/wp-content/uploads/2025/10/AB-665-FAQ.pdf"
      },
      {
        "label": {
          "en": "Santa Clara County Behavioral Health Services",
          "es": "Servicios de Salud Conductual del Condado de Santa Clara"
        },
        "source": {
          "en": "County of Santa Clara",
          "es": "Condado de Santa Clara"
        },
        "url": "https://bhsd.santaclaracounty.gov/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "NextStep Insight",
        "es": "Próximo paso"
      },
      "detail": {
        "en": "Contact the county or a qualified youth provider to confirm current eligibility, costs and private communication options.",
        "es": "Consulta al condado o a un proveedor de servicios juveniles sobre elegibilidad, costos y opciones de comunicación privada."
      },
      "actions": [
        {
          "id": "ans-mental-affordable-care-link",
          "kind": "open-link",
          "label": {
            "en": "Open official resource",
            "es": "Abrir recurso oficial"
          },
          "url": "https://www.dhcs.ca.gov/fa/wp-content/uploads/2025/10/AB-665-FAQ.pdf"
        }
      ]
    },
    "followUpIds": [
      "ans-mental-parent-consent"
    ]
  },
  {
    "id": "ans-mental-medication-consent",
    "topic": "mental",
    "question": {
      "en": "Can I get anxiety medication without my parents' consent?",
      "es": "¿Puedo obtener medicamentos para la ansiedad sin el consentimiento de mis padres?"
    },
    "answer": {
      "en": "California Family Code § 6924 lets some minors age 12 or older consent to certain outpatient mental health counseling after a professional assesses their maturity. That law does not authorize minors to consent on their own to psychotropic medication. Medication decisions and consent requirements must be discussed with a qualified healthcare professional. WhatSack cannot prescribe, recommend a medication, or determine whether someone can consent to a particular treatment. Ask a healthcare provider to explain the consent rules for the specific service.",
      "es": "El Código de Familia de California § 6924 permite a algunos menores de 12 años o más dar su consentimiento para ciertos servicios ambulatorios de salud mental después de que un profesional evalúe su madurez. Esa ley no autoriza a los menores a dar su consentimiento por sí solos para medicamentos psicotrópicos. Habla con un profesional de salud sobre los requisitos de consentimiento para cada tratamiento. WhatSack no receta medicamentos ni determina quién puede consentir a un tratamiento."
    },
    "context": [
      {
        "en": "Youth mental health — academic demonstration",
        "es": "Salud mental juvenil — demostración académica"
      }
    ],
    "links": [
      {
        "label": {
          "en": "California Family Code § 6924",
          "es": "Código de Familia de California § 6924"
        },
        "source": {
          "en": "California Legislative Information",
          "es": "Información Legislativa de California"
        },
        "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=6924."
      }
    ],
    "nextStep": {
      "title": {
        "en": "NextStep Insight",
        "es": "Próximo paso"
      },
      "detail": {
        "en": "Ask a qualified healthcare provider about consent requirements for medication and treatment options.",
        "es": "Consulta a un profesional de salud sobre los requisitos de consentimiento para medicamentos y otras opciones."
      },
      "actions": [
        {
          "id": "ans-mental-medication-consent-link",
          "kind": "open-link",
          "label": {
            "en": "Open official resource",
            "es": "Abrir recurso oficial"
          },
          "url": "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=6924."
        }
      ]
    },
    "followUpIds": [
      "ans-mental-parent-consent"
    ]
  },
  {
    "id": "ans-mental-crisis-support",
    "topic": "mental",
    "question": {
      "en": "I'm scared I might hurt myself. What do I do?",
      "es": "Tengo miedo de hacerme daño. ¿Qué hago?"
    },
    "answer": {
      "en": "I'm sorry you're feeling this way. WhatSack is a student-made resource guide, not a live counselor or emergency service. If you may hurt yourself or need help right now in the United States, call or text 988 to connect with a trained crisis counselor, or visit the official 988 website for chat options. If you are in immediate danger, call 911. If possible, tell a trusted adult or someone nearby who can stay with you while you reach out for help. You do not have to handle this alone.",
      "es": "Siento que estés pasando por esto. WhatSack es una guía de recursos creada por estudiantes; no es un consejero en vivo ni un servicio de emergencias. Si piensas que podrías hacerte daño o necesitas ayuda ahora en Estados Unidos, llama o envía un mensaje al 988 para hablar con un consejero de crisis; también hay opciones de chat en el sitio oficial. Si estás en peligro inmediato, llama al 911. Si puedes, habla con un adulto de confianza o alguien cercano que pueda acompañarte mientras pides ayuda."
    },
    "context": [
      {
        "en": "Youth mental health — academic demonstration",
        "es": "Salud mental juvenil — demostración académica"
      }
    ],
    "links": [
      {
        "label": {
          "en": "988 Suicide & Crisis Lifeline",
          "es": "Línea 988 de Prevención del Suicidio y Crisis"
        },
        "source": {
          "en": "988 Lifeline",
          "es": "Línea 988"
        },
        "url": "https://988lifeline.org/get-help/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "NextStep Insight",
        "es": "Próximo paso"
      },
      "detail": {
        "en": "Call or text 988 for immediate support, or call 911 if in immediate danger.",
        "es": "Llama o envía un mensaje al 988 para recibir apoyo; llama al 911 si hay peligro inmediato."
      },
      "actions": [
        {
          "id": "ans-mental-crisis-support-link",
          "kind": "open-link",
          "label": {
            "en": "Open official resource",
            "es": "Abrir recurso oficial"
          },
          "url": "https://988lifeline.org/get-help/"
        }
      ]
    },
    "followUpIds": []
  },
  {
    id: 'ans-mental-school-privacy',
    topic: 'mental',
    question: {
      en: 'Will my school find out if I text this number?',
      es: '¿Se enterará mi escuela si envío un mensaje?'
    },
    answer: {
      en: "I can't promise that a school, parent, or anyone else will never learn about a support service you use. Privacy depends on whether you contact a school counselor, healthcare provider, or crisis line, as well as the service's rules and legal duties. California Family Code § 6924 covers consent for some outpatient mental health services for teens 12 and older, but that does not automatically make school messages or this website confidential. Before texting or sharing personal details, ask what records are kept, who might be contacted, and whether you are using a school-managed device. WhatSack is only a fictional class demonstration.",
      es: "No puedo prometer que la escuela, tu familia u otras personas nunca se enteren de un servicio que uses. La privacidad depende de si contactas a un consejero escolar, un proveedor médico o una línea de crisis, y de las normas y obligaciones legales del servicio. El Código de Familia de California § 6924 trata del consentimiento para ciertos servicios ambulatorios de salud mental a partir de los 12 años, pero no significa que los mensajes escolares o este sitio sean confidenciales. Antes de compartir datos, pregunta qué registros se guardan, a quién podrían contactar y si usas un dispositivo administrado por la escuela. WhatSack es una demostración académica ficticia."
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
