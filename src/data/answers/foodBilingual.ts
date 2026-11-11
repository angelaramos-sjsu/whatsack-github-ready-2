import type { ScriptedAnswer } from './types';

/**
 * Seven bilingual food-assistance journeys proposed on the open-file branch.
 * Kept separate so new green-branch NextStep logic and older conversations remain intact.
 * This is scripted resource navigation, not live eligibility, stock or hours lookup.
 */
export const bilingualFoodAnswers: ScriptedAnswer[] = [
  {
    "id": "ans-food-es-family-groceries",
    "topic": "food",
    "question": {
      "en": "I live in San Jose and need food for my family. Where can I get help?",
      "es": "Vivo en San José y necesito comida para mi familia. ¿Dónde puedo conseguir ayuda?"
    },
    "answer": {
      "en": "**Start with Second Harvest of Silicon Valley's Food Locator.** Enter your ZIP code or city to find nearby free groceries or meal programs. Look at each location's posted schedule and contact details before visiting. The WhatSack prototype does not check live pantry inventory or opening hours.",
      "es": "**Empieza con el Localizador de Alimentos de Second Harvest of Silicon Valley.** Ingresa tu código postal o ciudad para buscar despensas gratuitas o programas de comidas cercanos. Revisa los horarios y datos de contacto de cada lugar antes de ir. El prototipo WhatSack no consulta inventarios ni horarios en tiempo real."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Second Harvest — Food Locator",
          "es": "Second Harvest — Localizador de Alimentos"
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
        "en": "Find food near your ZIP code",
        "es": "Busca alimentos cerca de tu código postal"
      },
      "detail": {
        "en": "Check the official resource before making arrangements; availability, rules and hours can change.",
        "es": "Consulta el recurso oficial antes de organizar una visita; la disponibilidad, los requisitos y los horarios pueden cambiar."
      },
      "actions": [
        {
          "id": "ans-food-es-family-groceries-official",
          "kind": "open-link",
          "label": {
            "en": "Open the Food Locator",
            "es": "Abrir el Localizador de Alimentos"
          },
          "url": "https://www.shfb.org/get-food/"
        }
      ]
    },
    "followUpIds": [
      "ans-food-es-no-id",
      "ans-food-es-saturday",
      "ans-food-es-calfresh-help"
    ]
  },
  {
    "id": "ans-food-es-calfresh-help",
    "topic": "food",
    "question": {
      "en": "I've never applied for CalFresh. Can someone help me?",
      "es": "Nunca he solicitado CalFresh. ¿Alguien puede ayudarme?"
    },
    "answer": {
      "en": "**Yes—Second Harvest offers information and help with CalFresh applications.** Visit its CalFresh assistance page to find support. You can also apply yourself through BenefitsCal, California's benefits portal. CalFresh eligibility and verification requirements are determined by the county; WhatSack cannot decide eligibility.",
      "es": "**Sí. Second Harvest ofrece información y ayuda para solicitar CalFresh.** Visita su página de asistencia de CalFresh para encontrar apoyo. También puedes solicitarlo por tu cuenta en BenefitsCal, el portal de beneficios de California. El condado determina la elegibilidad y los documentos necesarios; WhatSack no puede decidir si calificas."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Second Harvest — CalFresh application help",
          "es": "Second Harvest — Ayuda con CalFresh"
        },
        "source": {
          "en": "Second Harvest of Silicon Valley",
          "es": "Second Harvest of Silicon Valley"
        },
        "url": "https://www.shfb.org/get-food/calfresh/"
      },
      {
        "label": {
          "en": "BenefitsCal — California benefits application",
          "es": "BenefitsCal — Solicitud de beneficios de California"
        },
        "source": {
          "en": "State of California",
          "es": "State of California"
        },
        "url": "https://benefitscal.com/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Ask for help with the CalFresh application",
        "es": "Pide ayuda con la solicitud de CalFresh"
      },
      "detail": {
        "en": "Check the official resource before making arrangements; availability, rules and hours can change.",
        "es": "Consulta el recurso oficial antes de organizar una visita; la disponibilidad, los requisitos y los horarios pueden cambiar."
      },
      "actions": [
        {
          "id": "ans-food-es-calfresh-help-official",
          "kind": "open-link",
          "label": {
            "en": "Open Second Harvest CalFresh help",
            "es": "Abrir ayuda de Second Harvest con CalFresh"
          },
          "url": "https://www.shfb.org/get-food/calfresh/"
        }
      ]
    },
    "followUpIds": [
      "ans-food-es-calfresh-self",
      "ans-food-es-family-groceries"
    ]
  },
  {
    "id": "ans-food-es-calfresh-self",
    "topic": "food",
    "question": {
      "en": "I want to apply for CalFresh myself. Where do I start?",
      "es": "Quiero solicitar CalFresh por mi cuenta. ¿Dónde empiezo?"
    },
    "answer": {
      "en": "**Apply directly through BenefitsCal.** Choose CalFresh and follow the application steps. The county may request additional information or documents after you apply; check your account and respond to its messages. If you need guidance, Second Harvest has a separate free CalFresh assistance page.",
      "es": "**Puedes solicitar CalFresh directamente en BenefitsCal.** Selecciona CalFresh y sigue los pasos de la solicitud. Después, el condado podría pedirte datos o documentos adicionales; revisa tu cuenta y responde a sus mensajes. Si necesitas orientación, Second Harvest ofrece una página de ayuda gratuita para solicitar CalFresh."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "BenefitsCal — Apply for CalFresh",
          "es": "BenefitsCal — Solicitar CalFresh"
        },
        "source": {
          "en": "State of California",
          "es": "State of California"
        },
        "url": "https://benefitscal.com/"
      },
      {
        "label": {
          "en": "Second Harvest — CalFresh assistance",
          "es": "Second Harvest — Ayuda con CalFresh"
        },
        "source": {
          "en": "Second Harvest of Silicon Valley",
          "es": "Second Harvest of Silicon Valley"
        },
        "url": "https://www.shfb.org/get-food/calfresh/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Start the application on BenefitsCal",
        "es": "Empieza la solicitud en BenefitsCal"
      },
      "detail": {
        "en": "Check the official resource before making arrangements; availability, rules and hours can change.",
        "es": "Consulta el recurso oficial antes de organizar una visita; la disponibilidad, los requisitos y los horarios pueden cambiar."
      },
      "actions": [
        {
          "id": "ans-food-es-calfresh-self-official",
          "kind": "open-link",
          "label": {
            "en": "Open BenefitsCal",
            "es": "Abrir BenefitsCal"
          },
          "url": "https://benefitscal.com/"
        }
      ]
    },
    "followUpIds": [
      "ans-food-es-calfresh-help",
      "ans-food-es-no-id"
    ]
  },
  {
    "id": "ans-food-es-no-id",
    "topic": "food",
    "question": {
      "en": "I don't have identification. Can I receive food?",
      "es": "No tengo identificación. ¿Puedo recibir comida?"
    },
    "answer": {
      "en": "**You can still look for food assistance without a photo ID.** Each distribution site has its own intake and document rules. Use Second Harvest's Food Locator to find a nearby site and check whether it asks for identification or proof of address; contact that site to confirm. **Do not assume every pantry has the same rules.** CalFresh has a separate verification process.",
      "es": "**Puedes buscar ayuda alimentaria aunque no tengas identificación con foto.** Cada lugar tiene sus propios requisitos de registro y documentos. Usa el Localizador de Alimentos de Second Harvest para encontrar un lugar cercano y revisar si pide identificación o comprobante de domicilio; comunícate con ese lugar para confirmar. **No todas las despensas tienen las mismas reglas.** CalFresh tiene un proceso de verificación diferente."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Second Harvest — Food Locator",
          "es": "Second Harvest — Localizador de Alimentos"
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
        "en": "Check the document policy at a nearby site",
        "es": "Revisa los requisitos de documentos de un lugar cercano"
      },
      "detail": {
        "en": "Check the official resource before making arrangements; availability, rules and hours can change.",
        "es": "Consulta el recurso oficial antes de organizar una visita; la disponibilidad, los requisitos y los horarios pueden cambiar."
      },
      "actions": [
        {
          "id": "ans-food-es-no-id-official",
          "kind": "open-link",
          "label": {
            "en": "Find a food distribution site",
            "es": "Buscar un lugar que distribuya alimentos"
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
    "id": "ans-food-es-home-delivery",
    "topic": "food",
    "question": {
      "en": "My dad is 74 and has trouble leaving home. Are home-delivered meals available?",
      "es": "Mi papá tiene 74 años y le cuesta salir de casa. ¿Hay opciones de comida a domicilio?"
    },
    "answer": {
      "en": "**Home-delivered meal programs may help older adults who have difficulty leaving home.** Which county does your dad live in—Santa Clara or San Mateo? Use that county's official page below to find its meal-delivery program and enrollment details. Ask the provider about eligibility, assessments, service area, availability, and any contributions. We cannot guarantee an opening or delivery time.",
      "es": "**Los programas de comidas a domicilio pueden ayudar a las personas mayores que tienen dificultad para salir de casa.** ¿En qué condado vive tu papá: Santa Clara o San Mateo? Usa la página oficial de su condado a continuación para conocer el programa de entrega y cómo inscribirse. Pregunta al proveedor por la elegibilidad, evaluaciones, zona de servicio, disponibilidad y posibles contribuciones. No podemos garantizar cupos ni horarios de entrega."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Santa Clara County — Home-delivered meals",
          "es": "Condado de Santa Clara — Comidas a domicilio"
        },
        "source": {
          "en": "County of Santa Clara",
          "es": "County of Santa Clara"
        },
        "url": "https://ssa.santaclaracounty.gov/food-assistance/meals-older-adults/get-meals-delivered-your-home"
      },
      {
        "label": {
          "en": "San Mateo County — Food resources",
          "es": "Condado de San Mateo — Recursos alimentarios"
        },
        "source": {
          "en": "San Mateo County",
          "es": "San Mateo County"
        },
        "url": "https://www.smcgov.org/hsa/food-resources"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Start with the county where he lives",
        "es": "Empieza por el condado donde vive"
      },
      "detail": {
        "en": "Check the official resource before making arrangements; availability, rules and hours can change.",
        "es": "Consulta el recurso oficial antes de organizar una visita; la disponibilidad, los requisitos y los horarios pueden cambiar."
      },
      "actions": [
        {
          "id": "ans-food-es-home-delivery-official",
          "kind": "open-link",
          "label": {
            "en": "Open Santa Clara County meal-delivery guidance",
            "es": "Abrir guía de comidas a domicilio de Santa Clara"
          },
          "url": "https://ssa.santaclaracounty.gov/food-assistance/meals-older-adults/get-meals-delivered-your-home"
        }
      ]
    },
    "followUpIds": [
      "ans-food-es-family-groceries"
    ]
  },
  {
    "id": "ans-food-es-infant-formula",
    "topic": "food",
    "question": {
      "en": "I need formula for my baby. Where can I ask for help?",
      "es": "Necesito fórmula para mi bebé. ¿Dónde puedo pedir ayuda?"
    },
    "answer": {
      "en": "**Contact your county WIC program for infant-formula and nutrition assistance.** WIC has its own eligibility and enrollment process. If you live in Santa Clara County, start with the county WIC page linked below. If you live elsewhere, tell me your county so you can find the right local WIC office. A food pantry may sometimes have formula, but stock is not guaranteed.",
      "es": "**Comunícate con el programa WIC de tu condado para pedir ayuda con la fórmula infantil y la nutrición.** WIC tiene sus propios requisitos e inscripción. Si vives en el Condado de Santa Clara, comienza con la página de WIC que aparece abajo. Si vives en otro lugar, identifica tu condado para buscar la oficina de WIC correspondiente. Algunas despensas pueden tener fórmula, pero no se garantiza su disponibilidad."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Santa Clara County — WIC",
          "es": "Condado de Santa Clara — WIC"
        },
        "source": {
          "en": "Santa Clara County Public Health",
          "es": "Santa Clara County Public Health"
        },
        "url": "https://publichealth.sccgov.org/services/women-infants-and-children-wic"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Contact your county WIC office",
        "es": "Comunícate con la oficina de WIC de tu condado"
      },
      "detail": {
        "en": "Check the official resource before making arrangements; availability, rules and hours can change.",
        "es": "Consulta el recurso oficial antes de organizar una visita; la disponibilidad, los requisitos y los horarios pueden cambiar."
      },
      "actions": [
        {
          "id": "ans-food-es-infant-formula-official",
          "kind": "open-link",
          "label": {
            "en": "Open Santa Clara County WIC",
            "es": "Abrir WIC del Condado de Santa Clara"
          },
          "url": "https://publichealth.sccgov.org/services/women-infants-and-children-wic"
        }
      ]
    },
    "followUpIds": [
      "ans-food-es-family-groceries",
      "ans-food-es-calfresh-help"
    ]
  },
  {
    "id": "ans-food-es-saturday",
    "topic": "food",
    "question": {
      "en": "I work weekdays. How can I find food on Saturdays?",
      "es": "Trabajo entre semana. ¿Cómo encuentro comida los sábados?"
    },
    "answer": {
      "en": "**Use Second Harvest's Food Locator to look for food distribution near you.** Search by ZIP code and check the posted days and hours of each site. Choose a location with Saturday hours and confirm directly before traveling. WhatSack does **not** guarantee that a particular pantry is open every Saturday.",
      "es": "**Usa el Localizador de Alimentos de Second Harvest para buscar sitios cercanos.** Busca por código postal y revisa los días y horarios publicados de cada lugar. Elige uno que tenga atención los sábados y confirma directamente antes de ir. WhatSack **no garantiza** que alguna despensa específica abra todos los sábados."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Second Harvest — Food Locator",
          "es": "Second Harvest — Localizador de Alimentos"
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
        "en": "Check Saturday opening hours",
        "es": "Confirma los horarios de los sábados"
      },
      "detail": {
        "en": "Check the official resource before making arrangements; availability, rules and hours can change.",
        "es": "Consulta el recurso oficial antes de organizar una visita; la disponibilidad, los requisitos y los horarios pueden cambiar."
      },
      "actions": [
        {
          "id": "ans-food-es-saturday-official",
          "kind": "open-link",
          "label": {
            "en": "Open Second Harvest Food Locator",
            "es": "Abrir el Localizador de Alimentos de Second Harvest"
          },
          "url": "https://www.shfb.org/get-food/"
        }
      ]
    },
    "followUpIds": [
      "ans-food-es-family-groceries",
      "ans-food-es-no-id"
    ]
  }
];

/** Accent/quote/punctuation-insensitive matching, adapted from the open-file food routing work. */
export const normalizeBilingualFoodText = (text: string): string =>
  text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[\u2018\u2019]/g, "'").replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ').trim();

const anyPhrase = (text: string, patterns: string[]): boolean =>
  patterns.some((pattern) => text.includes(pattern));

/** Return an explicit answer id only for a food-specific supported intent. */
export const routeBilingualFoodQuestion = (question: string): string | undefined => {
  const q = normalizeBilingualFoodText(question);
  const isFood = anyPhrase(q, ['food', 'grocer', 'pantry', 'comida', 'alimento', 'despensa', 'comestible']);
  const isCalFresh = anyPhrase(q, ['calfresh', 'cal fresh', 'benefitscal', 'food stamps', 'estampillas']);
  if (isCalFresh) {
    if (anyPhrase(q, ['por mi cuenta', 'myself', 'on my own', 'do it myself', 'apply directly', 'aplicar directamente', 'quiero solicitar', 'where do i start', 'donde empiezo'])) {
      return 'ans-food-es-calfresh-self';
    }
    return 'ans-food-es-calfresh-help';
  }
  if (anyPhrase(q, ['formula', 'wic', 'leche infantil', 'leche para mi bebe', 'infant formula', 'baby formula'])) {
    return 'ans-food-es-infant-formula';
  }
  if (anyPhrase(q, ['le cuesta salir', 'no puede salir', 'cannot leave home', 'trouble leaving home', 'home delivered', 'home delivery', 'meal delivery', 'meals on wheels', 'comida a domicilio', 'comidas a domicilio']) &&
      (isFood || anyPhrase(q, ['dad', 'father', 'papa', 'madre', 'mom', 'abuelo', 'senior', '74', 'domicilio', 'meal', 'delivery']))) {
    return 'ans-food-es-home-delivery';
  }
  if (isFood && anyPhrase(q, ['sin identificacion', 'no tengo identificacion', 'no tengo id', 'no id', 'without id', 'without an id', 'dont have identification', 'dont have id', 'proof of address', 'documentos', 'comprobante de domicilio'])) {
    return 'ans-food-es-no-id';
  }
  if (isFood && anyPhrase(q, ['sabado', 'saturdays', 'saturday', 'weekend', 'fin de semana'])) {
    return 'ans-food-es-saturday';
  }
  if (isFood && anyPhrase(q, ['vivo en san jose', 'necesito comida', 'need food for my family', 'food for my family', 'donde puedo conseguir ayuda', 'where can i get help', 'where can i get food'])) {
    return 'ans-food-es-family-groceries';
  }
  return undefined;
};

/** Identify Spanish food inquiries so Sprout responds in Spanish even on the English UI. */
export const isSpanishBilingualFoodQuestion = (question: string): boolean =>
  /\b(vivo|necesito|nunca|solicitado|solicitar|quiero|alguien|puedo|tengo|papa|cuesta|sabados?|semana|donde|como|comida|ayuda|identificacion|mi|para|familia|bebe)\b/
    .test(normalizeBilingualFoodText(question));
