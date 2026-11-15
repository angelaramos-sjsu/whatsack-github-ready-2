import type { AnswerTopic, BilingualText, ScriptedAnswer } from './types';

/**
 * Optional, user-led exploration across the four supported WhatSack categories.
 * Never infer a secondary need from someone's income, job loss, age or diagnosis.
 * Each category links to a reviewed, neutral scripted overview with official links.
 */
export const crossCategoryDiscoveryAnswers: ScriptedAnswer[] = [
  {
    "id": "ans-discovery-food",
    "topic": "food",
    "question": {
      "en": "Explore Food Access resources",
      "es": "Explorar recursos de alimentos"
    },
    "answer": {
      "en": "If you would like food assistance, Second Harvest of Silicon Valley's Food Locator is one place to search for nearby grocery distributions and meal programs. Check locations, schedules and requirements with each organization before visiting. You do not need to tell Sackie why you are exploring this area.",
      "es": "Si deseas explorar ayuda alimentaria, el Localizador de Alimentos de Second Harvest of Silicon Valley permite buscar distribuciones de alimentos y programas de comidas cercanos. Confirma ubicaciones, horarios y requisitos con cada organización antes de acudir. No necesitas explicar a Sackie por qué te interesa esta área."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Second Harvest — Food Locator",
          "es": "Second Harvest — Localizador de alimentos"
        },
        "source": {
          "en": "Second Harvest of Silicon Valley",
          "es": "Second Harvest of Silicon Valley"
        },
        "url": "https://www.shfb.org/get-food/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Check food options near you",
        "es": "Consulta opciones de alimentos cercanas"
      },
      "detail": {
        "en": "Open the Food Locator and check the current hours and requirements of a location that interests you.",
        "es": "Abre el localizador y confirma los horarios y requisitos actuales de un lugar que te interese."
      },
      "actions": [
        {
          "id": "ans-discovery-food-open-official",
          "kind": "open-link",
          "label": {
            "en": "Open official resource",
            "es": "Abrir recurso oficial"
          },
          "url": "https://www.shfb.org/get-food/"
        }
      ]
    },
    "followUpIds": [
      "ans-food-es-family-groceries",
      "ans-food-es-calfresh-help"
    ]
  },
  {
    "id": "ans-discovery-education-workforce",
    "topic": "college",
    "question": {
      "en": "Explore education and workforce resources",
      "es": "Explorar recursos educativos y laborales"
    },
    "answer": {
      "en": "You can explore a four-year university, community-college transfer, vocational certificates, paid apprenticeships or direct employment. You do not need to pick one yet. To compare colleges, use College Navigator. For job-search or training support, a local American Job Center can explain available services. Costs, admission requirements and eligibility vary; WhatSack does not verify current openings.",
      "es": "Puedes explorar universidades de cuatro años, transferencias desde colegios comunitarios, certificados técnicos, aprendizaje remunerado o empleo directo. No tienes que decidir ahora. Compara instituciones en College Navigator; un centro de empleo American Job Center puede orientarte sobre servicios de empleo y capacitación. Los costos y requisitos varían; WhatSack no verifica vacantes actuales."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "College Navigator — Explore colleges",
          "es": "College Navigator — Explorar instituciones"
        },
        "source": {
          "en": "National Center for Education Statistics",
          "es": "National Center for Education Statistics"
        },
        "url": "https://nces.ed.gov/collegenavigator/"
      },
      {
        "label": {
          "en": "CareerOneStop — Find a Job Center",
          "es": "CareerOneStop — Buscar un centro de empleo"
        },
        "source": {
          "en": "CareerOneStop",
          "es": "CareerOneStop"
        },
        "url": "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Compare one education or work option",
        "es": "Compara una opción de estudios o empleo"
      },
      "detail": {
        "en": "Use an official college or Job Center directory to find an option suited to your goals and check its current requirements.",
        "es": "Usa un directorio oficial de instituciones o centros de empleo para comparar opciones y confirmar sus requisitos actuales."
      },
      "actions": [
        {
          "id": "ans-discovery-education-workforce-open-official",
          "kind": "open-link",
          "label": {
            "en": "Open official resource",
            "es": "Abrir recurso oficial"
          },
          "url": "https://nces.ed.gov/collegenavigator/"
        }
      ]
    },
    "followUpIds": [
      "ans-goal-sofia-entry",
      "ans-goal-daniel-entry"
    ]
  },
  {
    "id": "ans-discovery-mental",
    "topic": "mental",
    "question": {
      "en": "Explore mental health support",
      "es": "Explorar apoyo de salud mental"
    },
    "answer": {
      "en": "If you would like to explore mental health support, Santa Clara County Behavioral Health Services offers information about available care and referrals. You can ask the provider about cost, age requirements, privacy and service availability before sharing personal information. WhatSack does not provide counseling, verify appointments or ask you to disclose a diagnosis.",
      "es": "Si deseas explorar apoyo de salud mental, los Servicios de Salud Conductual del Condado de Santa Clara ofrecen información sobre atención y referencias. Puedes preguntar directamente por costos, requisitos de edad, privacidad y disponibilidad antes de compartir información personal. WhatSack no ofrece terapia ni verifica citas y no te pide revelar un diagnóstico."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Santa Clara County Behavioral Health Services",
          "es": "Servicios de Salud Conductual del Condado de Santa Clara"
        },
        "source": {
          "en": "County of Santa Clara",
          "es": "County of Santa Clara"
        },
        "url": "https://bhsd.sccgov.org/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Explore county behavioral health options",
        "es": "Explora opciones de salud conductual del condado"
      },
      "detail": {
        "en": "Review the county's official support information and contact the provider directly if you want to learn more.",
        "es": "Consulta la información oficial del condado y comunícate directamente con un proveedor si deseas saber más."
      },
      "actions": [
        {
          "id": "ans-discovery-mental-open-official",
          "kind": "open-link",
          "label": {
            "en": "Open official resource",
            "es": "Abrir recurso oficial"
          },
          "url": "https://bhsd.sccgov.org/"
        }
      ]
    },
    "followUpIds": [
      "ans-mental-affordable-care",
      "ans-mental-drop-in-what-happens"
    ]
  },
  {
    "id": "ans-discovery-community",
    "topic": "community",
    "question": {
      "en": "Explore community connection resources",
      "es": "Explorar recursos de conexión comunitaria"
    },
    "answer": {
      "en": "If you would like to explore local activities or community groups, you can browse Community Connection in Find Resources. 211 Bay Area can also help identify services and activities. Ask providers about language, accessibility, schedules and any costs before attending. Exploring this area does not require you to describe your personal circumstances.",
      "es": "Si te interesan las actividades o los grupos comunitarios, explora Conexión comunitaria en Buscar Recursos. 211 Bay Area también puede ayudarte a identificar servicios y actividades. Consulta idiomas, accesibilidad, horarios y costos directamente con las organizaciones. No necesitas explicar tu situación personal para explorar esta área."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "211 Bay Area — Community services",
          "es": "211 Bay Area — Servicios comunitarios"
        },
        "source": {
          "en": "211 Bay Area",
          "es": "211 Bay Area"
        },
        "url": "https://211bayarea.org/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Find community activities in your area",
        "es": "Busca actividades comunitarias cercanas"
      },
      "detail": {
        "en": "Explore 211 Bay Area or Find Resources, then verify current activities directly with the organization.",
        "es": "Explora 211 Bay Area o Buscar Recursos y confirma las actividades actuales con cada organización."
      },
      "actions": [
        {
          "id": "ans-discovery-community-open-official",
          "kind": "open-link",
          "label": {
            "en": "Open official resource",
            "es": "Abrir recurso oficial"
          },
          "url": "https://211bayarea.org/"
        }
      ]
    },
    "followUpIds": [
      "ans-community-connections"
    ]
  }
];

export type SupportAreaId = 'food' | 'education' | 'mental' | 'community';
export interface SupportAreaOption {
  id: SupportAreaId;
  label: BilingualText;
  answerId: string;
}

export const supportAreaOptions: SupportAreaOption[] = [
  { id: 'food', label: { en: 'Food Access', es: 'Acceso a Alimentos' }, answerId: 'ans-discovery-food' },
  { id: 'education', label: { en: 'Education & Workforce', es: 'Educación y Empleo' }, answerId: 'ans-discovery-education-workforce' },
  { id: 'mental', label: { en: 'Mental Health', es: 'Salud Mental' }, answerId: 'ans-discovery-mental' },
  { id: 'community', label: { en: 'Community Connection', es: 'Conexión Comunitaria' }, answerId: 'ans-discovery-community' }
];

const topicToArea = (topic: AnswerTopic | 'fallback'): SupportAreaId | undefined => {
  switch (topic) {
    case 'food': return 'food';
    case 'college':
    case 'work': return 'education';
    case 'mental': return 'mental';
    case 'community':
    case 'senior': return 'community';
    default: return undefined;
  }
};

/** Excludes every category the current answer already covers, including multi-need cards. */
export const getOtherSupportAreas = (answer: ScriptedAnswer): SupportAreaOption[] => {
  const excluded = new Set<SupportAreaId>();
  const primary = topicToArea(answer.topic);
  if (primary) excluded.add(primary);
  for (const item of answer.needSuggestions ?? []) {
    if (item.id === 'college' || item.id === 'work') excluded.add('education');
    else if (item.id === 'food' || item.id === 'mental' || item.id === 'community') excluded.add(item.id);
  }
  return supportAreaOptions.filter((option) => !excluded.has(option.id));
};

/**
 * Show only after a normal approved reply; do not add distracting resource exploration
 * during crisis/safety guidance, during role-play, or on a six-choice pathway entry.
 */
export const canExploreOtherSupport = (answer: ScriptedAnswer): boolean =>
  answer.topic !== 'fallback' && answer.topic !== 'roleplay'
  && !answer.pathwayChoices?.length
  && ![
    'ans-mental-crisis-support',
    'ans-mental-medication-consent',
    'ans-mental-parent-consent',
    'ans-mental-school-privacy'
  ].includes(answer.id);
