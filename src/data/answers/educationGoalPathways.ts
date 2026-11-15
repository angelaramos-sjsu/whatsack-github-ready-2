import type { ScriptedAnswer } from './types';

/**
 * Reviewed, goal-first Education & Workforce scripts.
 * Developed from the November 14, 2026 WhatSack Expanded Pathways research working paper.
 * Not a live eligibility, admissions, job-availability, or financial-aid service.
 * Every goal choice targets exactly one existing scripted answer.
 */
export const educationGoalPathwayAnswers: ScriptedAnswer[] = [
  {
    "id": "ans-goal-sofia-entry",
    "topic": "college",
    "question": {
      "en": "I'm thinking about what to do after high school. What are my options?",
      "es": "Estoy pensando qué hacer después de la preparatoria. ¿Cuáles son mis opciones?"
    },
    "answer": {
      "en": "You can explore a four-year university, community college and transfer, career programs, paid apprenticeships, working first, or taking time to plan. **What would you like to explore first?**",
      "es": "Puedes explorar una universidad de cuatro años, colegio comunitario y transferencia, programas profesionales, aprendizaje remunerado, trabajar primero o tomarte tiempo para planificar. **¿Qué te gustaría explorar primero?**"
    },
    "context": [],
    "links": [],
    "pathwayChoices": [
      {
        "id": "sofia-university",
        "label": {
          "en": "Attend a four-year university directly",
          "es": "Ir directamente a una universidad de cuatro años"
        },
        "answerId": "ans-pathway-sofia-s1"
      },
      {
        "id": "sofia-transfer",
        "label": {
          "en": "Start at community college and transfer",
          "es": "Comenzar en un colegio comunitario y transferirme"
        },
        "answerId": "ans-sara-transfer"
      },
      {
        "id": "sofia-compare",
        "label": {
          "en": "Compare colleges and universities",
          "es": "Comparar colegios y universidades"
        },
        "answerId": "ans-pathway-sofia-s2"
      },
      {
        "id": "sofia-careers",
        "label": {
          "en": "Explore career or apprenticeship programs",
          "es": "Explorar carreras o programas de aprendizaje"
        },
        "answerId": "ans-pathway-sofia-careers"
      },
      {
        "id": "sofia-work",
        "label": {
          "en": "Work or take time before college",
          "es": "Trabajar o tomarme un tiempo antes de estudiar"
        },
        "answerId": "ans-pathway-sofia-s8"
      },
      {
        "id": "sofia-unsure",
        "label": {
          "en": "I'm not sure yet",
          "es": "Todavía no estoy seguro/a"
        },
        "answerId": "ans-pathway-sofia-undecided"
      }
    ],
    "followUpIds": []
  },
  {
    "id": "ans-goal-daniel-entry",
    "topic": "work",
    "question": {
      "en": "I recently lost my job. What options do I have for my next career move?",
      "es": "Perdí mi empleo recientemente. ¿Qué opciones tengo para mi próximo paso profesional?"
    },
    "answer": {
      "en": "You can explore jobs using your existing experience, university, registered apprenticeships, shorter certificates, self-employment, or compare these options. You do not need to commit to training first. **What would you like help exploring?**",
      "es": "Puedes explorar empleos aprovechando tu experiencia, universidad, programas de aprendizaje remunerados, certificados cortos, trabajo independiente o comparar estas opciones. No tienes que elegir capacitación primero. **¿Qué te gustaría explorar?**"
    },
    "context": [],
    "links": [],
    "pathwayChoices": [
      {
        "id": "daniel-work",
        "label": {
          "en": "Find another job using my existing skills",
          "es": "Buscar otro empleo con mis habilidades actuales"
        },
        "answerId": "ans-pathway-daniel-d1"
      },
      {
        "id": "daniel-university",
        "label": {
          "en": "Attend a university or earn a degree",
          "es": "Ir a la universidad u obtener un título"
        },
        "answerId": "ans-pathway-daniel-d2"
      },
      {
        "id": "daniel-apprentice",
        "label": {
          "en": "Explore paid apprenticeships",
          "es": "Explorar programas de aprendizaje remunerados"
        },
        "answerId": "ans-pathway-daniel-d4"
      },
      {
        "id": "daniel-certificate",
        "label": {
          "en": "Earn a technical certificate",
          "es": "Obtener un certificado técnico"
        },
        "answerId": "ans-pathway-daniel-certificate"
      },
      {
        "id": "daniel-business",
        "label": {
          "en": "Explore self-employment or starting a business",
          "es": "Explorar el trabajo independiente o crear un negocio"
        },
        "answerId": "ans-pathway-daniel-d8"
      },
      {
        "id": "daniel-compare",
        "label": {
          "en": "Compare my options before deciding",
          "es": "Comparar mis opciones antes de decidir"
        },
        "answerId": "ans-pathway-daniel-compare"
      }
    ],
    "followUpIds": []
  },
  {
    "id": "ans-pathway-sofia-s1",
    "topic": "college",
    "question": {
      "en": "Do I have to start at community college, or can I go straight to a university?",
      "es": "¿Tengo que empezar en un colegio comunitario o puedo ir directamente a una universidad?"
    },
    "answer": {
      "en": "No. If you meet the admissions requirements, you can apply directly to a four-year university, including CSU, UC and private institutions. Starting at community college and transferring is another option, not a requirement. Compare your intended major, admissions rules, campus support and total estimated cost after financial aid. An application is not a guarantee of admission.",
      "es": "No. Si cumples los requisitos de admisión, puedes solicitar ingreso directamente a una universidad de cuatro años, como CSU, UC o una institución privada. Empezar en un colegio comunitario y transferirte es otra opción, no un requisito. Compara carrera, admisión, apoyo estudiantil y costo estimado después de ayudas. Solicitar no garantiza la admisión."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "UC — First-year admissions",
          "es": "UC — First-year admissions"
        },
        "source": {
          "en": "University of California",
          "es": "University of California"
        },
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/"
      },
      {
        "label": {
          "en": "CSU — First-time first-year admissions",
          "es": "CSU — First-time first-year admissions"
        },
        "source": {
          "en": "California State University",
          "es": "California State University"
        },
        "url": "https://www.calstate.edu/apply/freshman/getting_into_the_csu"
      },
      {
        "label": {
          "en": "ASSIST — California transfer agreements",
          "es": "ASSIST — California transfer agreements"
        },
        "source": {
          "en": "ASSIST",
          "es": "ASSIST"
        },
        "url": "https://assist.org/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare one direct-entry university with one community-college transfer route, including admission and aid requirements.",
        "es": "Compara una universidad de ingreso directo con una ruta de transferencia, incluyendo admisión y ayuda financiera."
      },
      "actions": [
        {
          "id": "action-ans-pathway-sofia-s1",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-sofia-s2",
      "ans-pathway-sofia-s6",
      "ans-goal-sofia-entry"
    ]
  },
  {
    "id": "ans-pathway-sofia-s2",
    "topic": "college",
    "question": {
      "en": "What's the difference between attending a community college, CSU, UC, or private university?",
      "es": "¿Qué diferencias hay entre un colegio comunitario, CSU, UC y una universidad privada?"
    },
    "answer": {
      "en": "Community colleges offer associate degrees, career programs and transfer preparation. CSU and UC campuses offer bachelor's degrees and other degrees; private universities differ in programs, prices and aid. Compare the major available, admissions eligibility, accessibility, location and **estimated net cost**, not just sticker tuition or prestige. A systemwide average is not your personal bill.",
      "es": "Los colegios comunitarios ofrecen títulos de asociado, formación profesional y preparación para transferirse. CSU y UC ofrecen licenciaturas y otros títulos; las universidades privadas varían en programas, precios y ayudas. Compara carreras, requisitos, accesibilidad, ubicación y **costo neto estimado**, no solo matrícula o prestigio. Un promedio no es tu costo personal."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "College Navigator",
          "es": "College Navigator"
        },
        "source": {
          "en": "National Center for Education Statistics",
          "es": "National Center for Education Statistics"
        },
        "url": "https://nces.ed.gov/collegenavigator/"
      },
      {
        "label": {
          "en": "Federal Net Price Calculator Center",
          "es": "Federal Net Price Calculator Center"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://collegecost.ed.gov/net-price"
      },
      {
        "label": {
          "en": "Is College Worth It? (2026)",
          "es": "Is College Worth It? (2026)"
        },
        "source": {
          "en": "Public Policy Institute of California",
          "es": "Public Policy Institute of California"
        },
        "url": "https://www.ppic.org/publication/is-college-worth-it/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare schools with the same assumptions about housing, transportation and financial aid.",
        "es": "Compara instituciones con los mismos supuestos de vivienda, transporte y ayuda financiera."
      },
      "actions": [
        {
          "id": "action-ans-pathway-sofia-s2",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://nces.ed.gov/collegenavigator/"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-sofia-s3",
      "ans-pathway-sofia-s5",
      "ans-goal-sofia-entry"
    ]
  },
  {
    "id": "ans-pathway-sofia-s3",
    "topic": "college",
    "question": {
      "en": "My family doesn't have much money. Could I still afford a four-year university?",
      "es": "Mi familia tiene pocos recursos. ¿Podría pagar una universidad de cuatro años?"
    },
    "answer": {
      "en": "Possibly. Four-year universities may offer grants, scholarships and other assistance. Your actual cost depends on the school, your situation and living expenses such as food and housing. Use each university's net-price calculator and review the appropriate financial-aid application. Do not assume you cannot afford university based only on its published tuition; aid is not guaranteed.",
      "es": "Es posible. Las universidades de cuatro años pueden ofrecer becas, subvenciones y otras ayudas. El costo real depende de la institución, tu situación y gastos de vida como comida y vivienda. Usa la calculadora de costo neto de cada universidad y revisa la solicitud de ayuda financiera correspondiente. La ayuda no está garantizada."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Federal Net Price Calculator Center",
          "es": "Federal Net Price Calculator Center"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://collegecost.ed.gov/net-price"
      },
      {
        "label": {
          "en": "UC — Estimate your financial aid",
          "es": "UC — Estimate your financial aid"
        },
        "source": {
          "en": "University of California",
          "es": "University of California"
        },
        "url": "https://admission.universityofcalifornia.edu/tuition-financial-aid/estimate-your-aid.html"
      },
      {
        "label": {
          "en": "Federal Student Aid — Scholarship tips",
          "es": "Federal Student Aid — Scholarship tips"
        },
        "source": {
          "en": "Federal Student Aid",
          "es": "Federal Student Aid"
        },
        "url": "https://studentaid.gov/articles/scholarship-tips/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Estimate the net price of two universities and compare the full cost of attendance.",
        "es": "Calcula el costo neto de dos universidades y compara el costo total de asistencia."
      },
      "actions": [
        {
          "id": "action-ans-pathway-sofia-s3",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://collegecost.ed.gov/net-price"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-sofia-s6",
      "ans-pathway-sofia-s2",
      "ans-goal-sofia-entry"
    ]
  },
  {
    "id": "ans-pathway-sofia-s4",
    "topic": "college",
    "question": {
      "en": "I'm interested in biology and healthcare. Which colleges or universities offer programs that could lead to those careers?",
      "es": "Me interesan la biología y la salud. ¿Qué estudios conducen a esas profesiones?"
    },
    "answer": {
      "en": "Healthcare careers require different qualifications: some use certificates or associate degrees; others need a bachelor's degree, clinical training or a license. Start with two occupations you find interesting, check their actual training requirements, and only then compare institutions and majors. A biology degree alone does not qualify someone for every regulated healthcare role.",
      "es": "Las profesiones de salud exigen distintas credenciales: algunas usan certificados o títulos de asociado; otras requieren licenciatura, práctica clínica o licencia. Primero investiga dos profesiones y sus requisitos; después compara instituciones y carreras. Un título en biología no habilita por sí solo para todos los trabajos regulados."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Occupational Outlook Handbook",
          "es": "Occupational Outlook Handbook"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": {
          "en": "College Navigator",
          "es": "College Navigator"
        },
        "source": {
          "en": "National Center for Education Statistics",
          "es": "National Center for Education Statistics"
        },
        "url": "https://nces.ed.gov/collegenavigator/"
      },
      {
        "label": {
          "en": "ASSIST — California transfer agreements",
          "es": "ASSIST — California transfer agreements"
        },
        "source": {
          "en": "ASSIST",
          "es": "ASSIST"
        },
        "url": "https://assist.org/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Choose two healthcare occupations and verify their current education and licensing requirements.",
        "es": "Elige dos profesiones sanitarias y confirma sus requisitos actuales de estudios y licencias."
      },
      "actions": [
        {
          "id": "action-ans-pathway-sofia-s4",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.bls.gov/ooh/"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-sofia-s1",
      "ans-pathway-sofia-s8",
      "ans-goal-sofia-entry"
    ]
  },
  {
    "id": "ans-pathway-sofia-s5",
    "topic": "college",
    "question": {
      "en": "What if I want to attend a university outside California?",
      "es": "¿Y si quiero estudiar en una universidad fuera de California?"
    },
    "answer": {
      "en": "You can also explore out-of-state public colleges and private universities. Review each school's admissions, nonresident tuition, housing, scholarships and disability-services information. Use its official net-price calculator. California-specific awards may not apply outside the state, so confirm the rules rather than assuming aid is portable.",
      "es": "También puedes explorar universidades públicas fuera de California y universidades privadas. Revisa admisiones, matrícula para no residentes, vivienda, becas y servicios de accesibilidad. Usa la calculadora oficial de costo neto. Algunas ayudas de California no se aplican fuera del estado; confirma las normas."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Common App — Explore colleges",
          "es": "Common App — Explore colleges"
        },
        "source": {
          "en": "Common App",
          "es": "Common App"
        },
        "url": "https://www.commonapp.org/explore/"
      },
      {
        "label": {
          "en": "College Navigator",
          "es": "College Navigator"
        },
        "source": {
          "en": "National Center for Education Statistics",
          "es": "National Center for Education Statistics"
        },
        "url": "https://nces.ed.gov/collegenavigator/"
      },
      {
        "label": {
          "en": "Federal Net Price Calculator Center",
          "es": "Federal Net Price Calculator Center"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://collegecost.ed.gov/net-price"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare one in-state and one out-of-state school, including estimated aid and housing costs.",
        "es": "Compara una institución dentro y otra fuera del estado, incluida la ayuda estimada y la vivienda."
      },
      "actions": [
        {
          "id": "action-ans-pathway-sofia-s5",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.commonapp.org/explore/"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-sofia-s2",
      "ans-pathway-sofia-s3",
      "ans-goal-sofia-entry"
    ]
  },
  {
    "id": "ans-pathway-sofia-s6",
    "topic": "college",
    "question": {
      "en": "Can I apply to universities and community colleges at the same time?",
      "es": "¿Puedo solicitar ingreso a universidades y colegios comunitarios al mismo tiempo?"
    },
    "answer": {
      "en": "Yes. You can apply to multiple types of institutions while comparing options. UC, CSU, community colleges and private schools may have separate applications, requirements, fees and deadlines. Keep a checklist for each school, including possible fee waivers and financial-aid tasks. Listing a college on the FAFSA is not the same as applying for admission.",
      "es": "Sí. Puedes solicitar ingreso a distintos tipos de instituciones al mismo tiempo. UC, CSU, colegios comunitarios y universidades privadas pueden tener solicitudes, requisitos, costos y fechas diferentes. Mantén una lista por institución con exenciones de tarifas y trámites de ayuda. Incluir una institución en la FAFSA no equivale a solicitar admisión."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "UC — First-year application guidance",
          "es": "UC — First-year application guidance"
        },
        "source": {
          "en": "University of California",
          "es": "University of California"
        },
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/filling-out-the-application.html"
      },
      {
        "label": {
          "en": "CSU — First-time first-year admissions",
          "es": "CSU — First-time first-year admissions"
        },
        "source": {
          "en": "California State University",
          "es": "California State University"
        },
        "url": "https://www.calstate.edu/apply/freshman/getting_into_the_csu"
      },
      {
        "label": {
          "en": "Federal Student Aid — FAFSA preparation",
          "es": "Federal Student Aid — FAFSA preparation"
        },
        "source": {
          "en": "Federal Student Aid",
          "es": "Federal Student Aid"
        },
        "url": "https://studentaid.gov/articles/things-you-need-for-fafsa/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Make an application checklist for at least two systems, and verify deadlines and fee waivers.",
        "es": "Prepara una lista de trámites para dos sistemas y confirma fechas y exenciones de tarifas."
      },
      "actions": [
        {
          "id": "action-ans-pathway-sofia-s6",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/filling-out-the-application.html"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-sofia-s3",
      "ans-pathway-sofia-s1",
      "ans-goal-sofia-entry"
    ]
  },
  {
    "id": "ans-pathway-sofia-s7",
    "topic": "college",
    "question": {
      "en": "If I have an IEP or disability accommodations in high school, can I still attend a CSU, UC, or private university?",
      "es": "Si tengo un IEP o adaptaciones por discapacidad en la preparatoria, ¿puedo ir a CSU, UC o una universidad privada?"
    },
    "answer": {
      "en": "Yes. A disability does not automatically prevent university attendance. Universities have disability/access offices where you can ask about academic adjustments and accepted documentation. High-school IEP or 504 supports do not automatically transfer into college in the same form. **You do not need to share a diagnosis with Sackie** to explore schools or ask about accessible options.",
      "es": "Sí. Una discapacidad no impide automáticamente estudiar en la universidad. Las instituciones cuentan con oficinas de accesibilidad donde puedes consultar ajustes y documentación requerida. Los apoyos IEP o del plan 504 no se transfieren automáticamente con las mismas reglas. **No necesitas compartir un diagnóstico con Sackie** para explorar opciones."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Postsecondary disability transition guide",
          "es": "Postsecondary disability transition guide"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://www.ed.gov/teaching-and-administration/supporting-students/transition-of-students-with-disabilities-to-postsecondary-education-a-guide-for-high-school-educators"
      },
      {
        "label": {
          "en": "Disability discrimination questions",
          "es": "Disability discrimination questions"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://www.ed.gov/laws-and-policy/civil-rights-laws/disability-discrimination/frequently-asked-questions-disability-discrimination"
      },
      {
        "label": {
          "en": "UC — First-year admissions",
          "es": "UC — First-year admissions"
        },
        "source": {
          "en": "University of California",
          "es": "University of California"
        },
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare accessibility-service information for two institutions and ask the appropriate office privately.",
        "es": "Compara los servicios de accesibilidad de dos instituciones y consulta de forma privada con la oficina correspondiente."
      },
      "actions": [
        {
          "id": "action-ans-pathway-sofia-s7",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.ed.gov/teaching-and-administration/supporting-students/transition-of-students-with-disabilities-to-postsecondary-education-a-guide-for-high-school-educators"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-sofia-s1",
      "ans-pathway-sofia-s2",
      "ans-goal-sofia-entry"
    ]
  },
  {
    "id": "ans-pathway-sofia-s8",
    "topic": "college",
    "question": {
      "en": "What if I don't want to attend college immediately after high school?",
      "es": "¿Qué pasa si no quiero ir a la universidad inmediatamente después de la preparatoria?"
    },
    "answer": {
      "en": "You can work, explore a paid apprenticeship, take time to plan or apply to college later. If you have an admission offer, ask whether you may defer it. Taking college courses after graduation can change how a university classifies you for first-year or transfer admissions, and postponing enrollment can affect financial aid. Confirm those rules before deciding.",
      "es": "Puedes trabajar, explorar un aprendizaje remunerado, tomar tiempo para planificar o solicitar ingreso más adelante. Si ya tienes una oferta de admisión, pregunta si puedes aplazarla. Estudiar materias universitarias después de graduarte puede cambiar tu clasificación de ingreso y la ayuda financiera. Confirma esas reglas antes de decidir."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Explore registered apprenticeships",
          "es": "Explore registered apprenticeships"
        },
        "source": {
          "en": "U.S. Department of Labor",
          "es": "U.S. Department of Labor"
        },
        "url": "https://www.apprenticeship.gov/career-seekers"
      },
      {
        "label": {
          "en": "UC — First-year application guidance",
          "es": "UC — First-year application guidance"
        },
        "source": {
          "en": "University of California",
          "es": "University of California"
        },
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/filling-out-the-application.html"
      },
      {
        "label": {
          "en": "UC — Transfer application guidance",
          "es": "UC — Transfer application guidance"
        },
        "source": {
          "en": "University of California",
          "es": "University of California"
        },
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-transfer/filling-out-the-application.html"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Investigate one work or apprenticeship route and confirm any impact on future admissions and aid.",
        "es": "Investiga una opción de empleo o aprendizaje y confirma sus efectos en admisión y ayudas futuras."
      },
      "actions": [
        {
          "id": "action-ans-pathway-sofia-s8",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.apprenticeship.gov/career-seekers"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-sofia-s4",
      "ans-pathway-sofia-s6",
      "ans-goal-sofia-entry"
    ]
  },
  {
    "id": "ans-pathway-daniel-d1",
    "topic": "work",
    "question": {
      "en": "I lost my job. Do I have to return to school to change careers?",
      "es": "Perdí mi trabajo. ¿Tengo que volver a estudiar para cambiar de profesión?"
    },
    "answer": {
      "en": "Not necessarily. Many jobs value transferable skills, while others require particular licenses or credentials. You can investigate direct employment, employer-sponsored training, paid apprenticeships or more education. Start by identifying your current skills and comparing real job requirements. A job center can help you plan without enrolling in training first; no opening or eligibility is guaranteed.",
      "es": "No necesariamente. Muchos empleos valoran habilidades transferibles, mientras que otros exigen licencias o credenciales. Puedes explorar empleo directo, capacitación del empleador, aprendizaje remunerado o más estudios. Identifica tus habilidades y compara requisitos reales. Un centro de empleo puede orientarte sin que te matricules primero; no hay vacantes ni elegibilidad garantizadas."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Find an American Job Center",
          "es": "Find an American Job Center"
        },
        "source": {
          "en": "CareerOneStop",
          "es": "CareerOneStop"
        },
        "url": "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx"
      },
      {
        "label": {
          "en": "Education and training by occupation",
          "es": "Education and training by occupation"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/emp/tables/education-and-training-by-occupation.htm"
      },
      {
        "label": {
          "en": "Quality control inspectors",
          "es": "Quality control inspectors"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/ooh/Production/Quality-control-inspectors.htm"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Choose two occupations and compare actual job requirements before paying for training.",
        "es": "Elige dos ocupaciones y compara sus requisitos reales antes de pagar capacitación."
      },
      "actions": [
        {
          "id": "action-ans-pathway-daniel-d1",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-daniel-d3",
      "ans-pathway-daniel-d4",
      "ans-goal-daniel-entry"
    ]
  },
  {
    "id": "ans-pathway-daniel-d2",
    "topic": "work",
    "question": {
      "en": "Can I go directly to a four-year university instead of community college?",
      "es": "¿Puedo ingresar directamente a una universidad de cuatro años sin pasar por un colegio comunitario?"
    },
    "answer": {
      "en": "Possibly, yes. Adults can explore four-year universities; your application route depends on prior college history and each institution's requirements, not your age alone. If you've attended college, gather transcripts and ask admissions whether you apply as a transfer student. Compare the program, schedule, accessibility, credit transfer and total cost.",
      "es": "Posiblemente sí. Las personas adultas pueden explorar universidades de cuatro años; el tipo de solicitud depende de sus estudios previos y los requisitos de cada institución, no solo de la edad. Si cursaste estudios universitarios, reúne certificados académicos y pregunta por la vía de transferencia. Compara programa, horarios, accesibilidad, créditos y costos."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "CSU — Upper-division transfer",
          "es": "CSU — Upper-division transfer"
        },
        "source": {
          "en": "California State University",
          "es": "California State University"
        },
        "url": "https://www.calstate.edu/apply/transfer/Pages/upper-division-transfer.aspx"
      },
      {
        "label": {
          "en": "UC — Transfer application guidance",
          "es": "UC — Transfer application guidance"
        },
        "source": {
          "en": "University of California",
          "es": "University of California"
        },
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-transfer/filling-out-the-application.html"
      },
      {
        "label": {
          "en": "College Navigator",
          "es": "College Navigator"
        },
        "source": {
          "en": "National Center for Education Statistics",
          "es": "National Center for Education Statistics"
        },
        "url": "https://nces.ed.gov/collegenavigator/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Identify a degree and two universities, then ask admissions how your previous study would count.",
        "es": "Identifica un título y dos universidades; pregunta a admisiones cómo contarían tus estudios previos."
      },
      "actions": [
        {
          "id": "action-ans-pathway-daniel-d2",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.calstate.edu/apply/transfer/Pages/upper-division-transfer.aspx"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-daniel-d5",
      "ans-pathway-daniel-d6",
      "ans-goal-daniel-entry"
    ]
  },
  {
    "id": "ans-pathway-daniel-d3",
    "topic": "work",
    "question": {
      "en": "I've worked in manufacturing for 20 years. Could I qualify for a higher-level position without earning another degree?",
      "es": "Llevo 20 años en manufactura. ¿Puedo optar a un puesto superior sin obtener otro título?"
    },
    "answer": {
      "en": "Possibly. Manufacturing experience may be relevant to supervision, quality, operations and technical coordination. Some employers require degrees or certifications, while others consider demonstrated experience. Review actual job descriptions and show relevant leadership, safety, equipment and problem-solving work on your résumé. Experience does not override a legal licensing requirement or guarantee hiring.",
      "es": "Es posible. Tu experiencia en manufactura puede servir en supervisión, calidad, operaciones o coordinación técnica. Algunos empleadores piden títulos o certificaciones; otros valoran la experiencia. Compara ofertas reales y muestra liderazgo, seguridad, equipos y resolución de problemas en tu currículo. La experiencia no sustituye licencias obligatorias ni garantiza empleo."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Industrial production managers",
          "es": "Industrial production managers"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/ooh/management/industrial-production-managers.htm"
      },
      {
        "label": {
          "en": "Occupational Outlook Handbook",
          "es": "Occupational Outlook Handbook"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": {
          "en": "Find an American Job Center",
          "es": "Find an American Job Center"
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
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare three job descriptions and identify genuine gaps before committing to another degree.",
        "es": "Compara tres descripciones de empleo e identifica requisitos pendientes antes de cursar otro título."
      },
      "actions": [
        {
          "id": "action-ans-pathway-daniel-d3",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.bls.gov/ooh/management/industrial-production-managers.htm"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-daniel-d1",
      "ans-pathway-daniel-d5",
      "ans-goal-daniel-entry"
    ]
  },
  {
    "id": "ans-pathway-daniel-d4",
    "topic": "work",
    "question": {
      "en": "Are there paid apprenticeships where I can learn new skills while earning money?",
      "es": "¿Hay programas de aprendizaje remunerados donde pueda aprender mientras gano dinero?"
    },
    "answer": {
      "en": "Yes. Registered apprenticeships combine paid work with structured instruction and may offer wage progression and a recognized credential. Availability, entry requirements and employers vary. Check current sponsor listings and compare hours, pay, training length, physical demands and accessibility. This is different from paying for a college certificate; a listed career area does not mean there is an opening today.",
      "es": "Sí. Los programas de aprendizaje registrados combinan trabajo remunerado con formación y pueden ofrecer aumentos salariales y credenciales reconocidas. Las vacantes y los requisitos varían. Revisa patrocinadores actuales y compara horarios, salario, duración, exigencias físicas y accesibilidad. No es lo mismo que pagar un certificado; una ocupación listada no garantiza vacantes hoy."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Explore registered apprenticeships",
          "es": "Explore registered apprenticeships"
        },
        "source": {
          "en": "U.S. Department of Labor",
          "es": "U.S. Department of Labor"
        },
        "url": "https://www.apprenticeship.gov/career-seekers"
      },
      {
        "label": {
          "en": "Find an American Job Center",
          "es": "Find an American Job Center"
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
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Use the official apprenticeship finder to compare two current sponsor opportunities and their entry requirements.",
        "es": "Usa el buscador oficial para comparar dos opciones de patrocinadores y sus requisitos."
      },
      "actions": [
        {
          "id": "action-ans-pathway-daniel-d4",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.apprenticeship.gov/career-seekers"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-daniel-d1",
      "ans-pathway-daniel-d5",
      "ans-goal-daniel-entry"
    ]
  },
  {
    "id": "ans-pathway-daniel-d5",
    "topic": "work",
    "question": {
      "en": "Would earning a bachelor's degree help me move into management or another industry?",
      "es": "¿Me ayudaría una licenciatura a pasar a gerencia o a otro sector?"
    },
    "answer": {
      "en": "Maybe. Some management or career-change roles require or prefer a bachelor's degree; others may accept equivalent experience. Start with specific occupations and compare actual employer requirements. Then weigh tuition, time, possible lost earnings and the benefit of a bachelor's degree against certificates, apprenticeships or applying with your current experience. No degree guarantees a particular salary or job.",
      "es": "Quizás. Algunos empleos de gerencia o cambio de sector requieren o prefieren licenciatura; otros aceptan experiencia equivalente. Primero revisa ocupaciones y requisitos reales. Después compara matrícula, tiempo, ingresos que podrías dejar de ganar y ventajas del título frente a certificados, aprendizaje o empleo directo. Ningún título garantiza sueldo o trabajo."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Education and training by occupation",
          "es": "Education and training by occupation"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/emp/tables/education-and-training-by-occupation.htm"
      },
      {
        "label": {
          "en": "Industrial production managers",
          "es": "Industrial production managers"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/ooh/management/industrial-production-managers.htm"
      },
      {
        "label": {
          "en": "Is College Worth It? (2026)",
          "es": "Is College Worth It? (2026)"
        },
        "source": {
          "en": "Public Policy Institute of California",
          "es": "Public Policy Institute of California"
        },
        "url": "https://www.ppic.org/publication/is-college-worth-it/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare the education requirements of two target occupations and the costs of degree and non-degree routes.",
        "es": "Compara los requisitos de dos profesiones y los costos de rutas con y sin licenciatura."
      },
      "actions": [
        {
          "id": "action-ans-pathway-daniel-d5",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.bls.gov/emp/tables/education-and-training-by-occupation.htm"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-daniel-d2",
      "ans-pathway-daniel-d6",
      "ans-goal-daniel-entry"
    ]
  },
  {
    "id": "ans-pathway-daniel-d6",
    "topic": "work",
    "question": {
      "en": "Are there online or hybrid university programs I can attend while working?",
      "es": "¿Hay programas universitarios en línea o híbridos que pueda cursar mientras trabajo?"
    },
    "answer": {
      "en": "Some accredited universities offer online, hybrid, part-time or evening degrees. Compare the actual course schedule, required campus attendance, transfer-credit policies, cost, aid and accessibility services. Online does **not** always mean self-paced or completely asynchronous. Verify accreditation and each program's delivery format in its official catalog.",
      "es": "Algunas universidades acreditadas ofrecen títulos en línea, híbridos, a tiempo parcial o nocturnos. Compara horarios reales, asistencia presencial, transferencia de créditos, costos, ayudas y accesibilidad. En línea **no** siempre significa a tu propio ritmo o totalmente asincrónico. Comprueba la acreditación y la modalidad en el catálogo oficial."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "College Navigator",
          "es": "College Navigator"
        },
        "source": {
          "en": "National Center for Education Statistics",
          "es": "National Center for Education Statistics"
        },
        "url": "https://nces.ed.gov/collegenavigator/"
      },
      {
        "label": {
          "en": "College accreditation guidance",
          "es": "College accreditation guidance"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://www.ed.gov/laws-and-policy/higher-education-laws-and-policy/college-accreditation"
      },
      {
        "label": {
          "en": "CSU — Upper-division transfer",
          "es": "CSU — Upper-division transfer"
        },
        "source": {
          "en": "California State University",
          "es": "California State University"
        },
        "url": "https://www.calstate.edu/apply/transfer/Pages/upper-division-transfer.aspx"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare two accredited programs, confirming schedules, required attendance and prior-credit rules.",
        "es": "Compara dos programas acreditados y confirma horarios, presencialidad y reconocimiento de créditos."
      },
      "actions": [
        {
          "id": "action-ans-pathway-daniel-d6",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://nces.ed.gov/collegenavigator/"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-daniel-d2",
      "ans-pathway-daniel-d7",
      "ans-goal-daniel-entry"
    ]
  },
  {
    "id": "ans-pathway-daniel-d7",
    "topic": "work",
    "question": {
      "en": "If I have a disability that affects the work I can do, could I still attend university or pursue another career?",
      "es": "Si tengo una discapacidad que afecta el trabajo que puedo hacer, ¿puedo estudiar o cambiar de carrera?"
    },
    "answer": {
      "en": "Yes. Disability does not automatically exclude you from university or a career change. Schools offer disability/access services and qualified applicants may ask employers for reasonable accommodations. California's Department of Rehabilitation may assist eligible people with career planning, training, assistive technology or employment. You can explore general options **without disclosing medical details to Sackie**. Services and accommodations depend on individual circumstances.",
      "es": "Sí. Una discapacidad no excluye automáticamente de la universidad ni de cambiar de profesión. Las universidades ofrecen servicios de accesibilidad y quienes cumplen requisitos pueden solicitar ajustes razonables a empleadores. El Departamento de Rehabilitación de California puede ayudar a personas elegibles con planificación, formación, tecnología de apoyo y empleo. Puedes explorar opciones **sin revelar datos médicos a Sackie**."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California job training and rehabilitation services",
          "es": "California job training and rehabilitation services"
        },
        "source": {
          "en": "California Department of Rehabilitation",
          "es": "California Department of Rehabilitation"
        },
        "url": "https://www.dor.ca.gov/Home/JobTrainingServices"
      },
      {
        "label": {
          "en": "Job applicants and the ADA",
          "es": "Job applicants and the ADA"
        },
        "source": {
          "en": "U.S. Equal Employment Opportunity Commission",
          "es": "U.S. Equal Employment Opportunity Commission"
        },
        "url": "https://www.eeoc.gov/laws/guidance/job-applicants-and-ada"
      },
      {
        "label": {
          "en": "Postsecondary disability transition guide",
          "es": "Postsecondary disability transition guide"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://www.ed.gov/teaching-and-administration/supporting-students/transition-of-students-with-disabilities-to-postsecondary-education-a-guide-for-high-school-educators"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Identify one career or study option and contact its accessibility office or California DOR privately.",
        "es": "Identifica una opción de estudio o empleo y consulta de forma privada con accesibilidad o el DOR de California."
      },
      "actions": [
        {
          "id": "action-ans-pathway-daniel-d7",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.dor.ca.gov/Home/JobTrainingServices"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-daniel-d2",
      "ans-pathway-daniel-d1",
      "ans-goal-daniel-entry"
    ]
  },
  {
    "id": "ans-pathway-daniel-d8",
    "topic": "work",
    "question": {
      "en": "What if I want to start my own business instead of working for another company?",
      "es": "¿Y si quiero iniciar mi propio negocio en lugar de trabajar para otra empresa?"
    },
    "answer": {
      "en": "Self-employment is an option, but it may take time to earn a reliable income. Explore a business idea, customer demand, startup costs, licenses, insurance and financing risks before relying on it for income. SBA partner organizations may offer free or low-cost counseling and training; counseling does not mean you will receive funding or that the business will succeed.",
      "es": "El trabajo independiente es una opción, pero los ingresos estables pueden tardar. Investiga una idea, clientes potenciales, costos iniciales, permisos, seguros y riesgos financieros antes de depender de ella. Organizaciones asociadas con la SBA pueden ofrecer asesoría y formación gratuitas o de bajo costo; recibir asesoría no garantiza fondos ni éxito."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Small-business counseling",
          "es": "Small-business counseling"
        },
        "source": {
          "en": "U.S. Small Business Administration",
          "es": "U.S. Small Business Administration"
        },
        "url": "https://www.sba.gov/counseling/"
      },
      {
        "label": {
          "en": "California job training and rehabilitation services",
          "es": "California job training and rehabilitation services"
        },
        "source": {
          "en": "California Department of Rehabilitation",
          "es": "California Department of Rehabilitation"
        },
        "url": "https://www.dor.ca.gov/Home/JobTrainingServices"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Outline a business idea and basic startup costs, then locate an SBA partner for advice.",
        "es": "Describe una idea comercial y costos iniciales, y busca asesoría de un socio de la SBA."
      },
      "actions": [
        {
          "id": "action-ans-pathway-daniel-d8",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.sba.gov/counseling/"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-daniel-d1",
      "ans-pathway-daniel-d4",
      "ans-goal-daniel-entry"
    ]
  },
  {
    "id": "ans-pathway-sofia-careers",
    "topic": "college",
    "question": {
      "en": "What education, career programs or apprenticeships can I explore after high school?",
      "es": "¿Qué programas de carreras o aprendizaje puedo explorar después de la preparatoria?"
    },
    "answer": {
      "en": "College is not the only route after high school. You can compare career certificates, degree programs, entry-level work and registered paid apprenticeships. First choose a few occupations that sound interesting, then check what education or licensing each requires. Apprenticeship openings vary, and some careers require college or a professional license.",
      "es": "La universidad no es la única ruta después de la preparatoria. Puedes comparar certificados profesionales, títulos, trabajos iniciales y programas de aprendizaje remunerados. Primero elige profesiones que te interesen y revisa sus estudios o licencias. Las vacantes de aprendizaje varían y algunas carreras exigen título o licencia."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Occupational Outlook Handbook",
          "es": "Occupational Outlook Handbook"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": {
          "en": "Explore registered apprenticeships",
          "es": "Explore registered apprenticeships"
        },
        "source": {
          "en": "U.S. Department of Labor",
          "es": "U.S. Department of Labor"
        },
        "url": "https://www.apprenticeship.gov/career-seekers"
      },
      {
        "label": {
          "en": "College Navigator",
          "es": "College Navigator"
        },
        "source": {
          "en": "National Center for Education Statistics",
          "es": "National Center for Education Statistics"
        },
        "url": "https://nces.ed.gov/collegenavigator/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare the requirements for two occupations and check official apprenticeship listings.",
        "es": "Compara requisitos de dos ocupaciones y revisa programas de aprendizaje oficiales."
      },
      "actions": [
        {
          "id": "action-ans-pathway-sofia-careers",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.bls.gov/ooh/"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-sofia-s4",
      "ans-pathway-sofia-s8",
      "ans-goal-sofia-entry"
    ]
  },
  {
    "id": "ans-pathway-sofia-undecided",
    "topic": "college",
    "question": {
      "en": "I'm not sure what I want to do after high school. Can I compare options?",
      "es": "No sé qué quiero hacer después de la preparatoria. ¿Puedo comparar opciones?"
    },
    "answer": {
      "en": "You don't have to choose a school or career immediately. Start with the outcomes you want: a particular occupation, a degree, earning income soon or taking time to decide. Then compare a university, community-college transfer, paid apprenticeship and employment based on cost, time, eligibility, location and access needs. None is automatically best for everyone.",
      "es": "No tienes que elegir una escuela o profesión de inmediato. Empieza por lo que quieres lograr: una profesión, un título, ingresos pronto o tiempo para decidir. Compara universidad, transferencia desde un colegio comunitario, aprendizaje remunerado y empleo según costo, duración, requisitos, ubicación y accesibilidad. Ninguna ruta es mejor para todas las personas."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "College Navigator",
          "es": "College Navigator"
        },
        "source": {
          "en": "National Center for Education Statistics",
          "es": "National Center for Education Statistics"
        },
        "url": "https://nces.ed.gov/collegenavigator/"
      },
      {
        "label": {
          "en": "Occupational Outlook Handbook",
          "es": "Occupational Outlook Handbook"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": {
          "en": "Explore registered apprenticeships",
          "es": "Explore registered apprenticeships"
        },
        "source": {
          "en": "U.S. Department of Labor",
          "es": "U.S. Department of Labor"
        },
        "url": "https://www.apprenticeship.gov/career-seekers"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Write down what matters most to you, then compare two paths without committing yet.",
        "es": "Anota lo que más te importa y compara dos rutas sin comprometerte todavía."
      },
      "actions": [
        {
          "id": "action-ans-pathway-sofia-undecided",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://nces.ed.gov/collegenavigator/"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-sofia-s2",
      "ans-pathway-sofia-s8",
      "ans-goal-sofia-entry"
    ]
  },
  {
    "id": "ans-pathway-daniel-certificate",
    "topic": "work",
    "question": {
      "en": "Could a technical certificate help me find a new kind of work?",
      "es": "¿Podría un certificado técnico ayudarme a encontrar otro tipo de empleo?"
    },
    "answer": {
      "en": "A technical certificate may help when the job you want requires specific skills, but not every job requires a new credential. Check job postings first, then compare certificate content, accreditation where relevant, tuition, schedule, possible workforce funding and realistic outcomes. Verify current provider and funding requirements; finishing a course never guarantees hiring.",
      "es": "Un certificado técnico puede ayudar si el trabajo deseado exige habilidades concretas, pero no todos los empleos requieren una nueva credencial. Revisa ofertas primero y luego compara contenidos, acreditación pertinente, costo, horarios, posible financiación y resultados realistas. Confirma requisitos vigentes; terminar un curso no garantiza empleo."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Education and training by occupation",
          "es": "Education and training by occupation"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/emp/tables/education-and-training-by-occupation.htm"
      },
      {
        "label": {
          "en": "Find an American Job Center",
          "es": "Find an American Job Center"
        },
        "source": {
          "en": "CareerOneStop",
          "es": "CareerOneStop"
        },
        "url": "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx"
      },
      {
        "label": {
          "en": "College Navigator",
          "es": "College Navigator"
        },
        "source": {
          "en": "National Center for Education Statistics",
          "es": "National Center for Education Statistics"
        },
        "url": "https://nces.ed.gov/collegenavigator/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare a certificate with a direct-employment or paid-training option for one target job.",
        "es": "Compara un certificado con empleo directo o formación remunerada para un trabajo concreto."
      },
      "actions": [
        {
          "id": "action-ans-pathway-daniel-certificate",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.bls.gov/emp/tables/education-and-training-by-occupation.htm"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-daniel-d1",
      "ans-pathway-daniel-d4",
      "ans-goal-daniel-entry"
    ]
  },
  {
    "id": "ans-pathway-daniel-compare",
    "topic": "work",
    "question": {
      "en": "I'm considering my career options after a layoff. How can I compare them?",
      "es": "Estoy considerando opciones profesionales después de perder mi empleo. ¿Cómo puedo compararlas?"
    },
    "answer": {
      "en": "You can compare direct employment using your existing experience, employer training, registered paid apprenticeships, short certificates, a university degree or self-employment. Start with your time and income needs, then check each route's cost, training duration, employer requirements, schedule, accessibility and possible outcomes. A job center can help without requiring enrollment.",
      "es": "Puedes comparar empleo directo con tu experiencia, formación del empleador, aprendizaje remunerado, certificados cortos, universidad o trabajo independiente. Empieza por el tiempo y los ingresos que necesitas; luego revisa costo, duración, requisitos, horarios, accesibilidad y posibles resultados. Un centro de empleo puede orientar sin exigir matrícula."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Find an American Job Center",
          "es": "Find an American Job Center"
        },
        "source": {
          "en": "CareerOneStop",
          "es": "CareerOneStop"
        },
        "url": "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx"
      },
      {
        "label": {
          "en": "Occupational Outlook Handbook",
          "es": "Occupational Outlook Handbook"
        },
        "source": {
          "en": "U.S. Bureau of Labor Statistics",
          "es": "U.S. Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": {
          "en": "Explore registered apprenticeships",
          "es": "Explore registered apprenticeships"
        },
        "source": {
          "en": "U.S. Department of Labor",
          "es": "U.S. Department of Labor"
        },
        "url": "https://www.apprenticeship.gov/career-seekers"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your NextStep Insight",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Choose two career options and compare time to income, costs and real entry requirements.",
        "es": "Elige dos opciones y compara tiempo hasta ingresos, costos y requisitos reales."
      },
      "actions": [
        {
          "id": "action-ans-pathway-daniel-compare",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx"
        }
      ]
    },
    "followUpIds": [
      "ans-pathway-daniel-d1",
      "ans-pathway-daniel-d4",
      "ans-goal-daniel-entry"
    ]
  }
];

/**
 * Only broad exploratory questions open the six-choice guide.
 * Specific requests are intentionally answered by the existing exact/question routes.
 * No personally identifying or disability-related information is collected.
 */
export const routeGoalExplorationQuestion = (input: string): string | undefined => {
  const q = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'").replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const sofiaGoal = /(?:after high school|after graduation|graduating soon|graduating (?:from )?high school|finish(?:ing)? high school|college or work|university or work|despues de (?:la )?(?:preparatoria|secundaria)|terminar (?:la )?preparatoria|universidad o trabajar)/;
  const sofiaExploration = /(?:what|which|options|choices|not sure|don t know|undecided|should i|could i|want to do|explore|start|decide|que|cuales|opciones|no se|no estoy seg)/;
  if (sofiaGoal.test(q) && sofiaExploration.test(q)) return 'ans-goal-sofia-entry';
  const danielGoal = /(?:lost my job|laid off|layoff|lost (?:a|the) job|recently unemployed|chang(?:e|ing) careers?|career change|next career move|new career|manufacturing experience|job or go back to school|find another job or go back to school|perdi (?:mi|el) (?:empleo|trabajo)|despidieron|cambiar de (?:carrera|profesion)|cambio de carrera)/;
  const danielExploration = /(?:what|which|options|choices|not sure|don t know|should i|could i|how|want to|help|explore|start|decide|career|work|school|job|que|cuales|opciones|ayuda|hacer|puedo|quiero)/;
  // A visitor who explicitly needs an immediate job should receive job help first.
  if (/(?:need (?:a|another) job (?:right away|immediately|now|today)|job right away|job asap|trabajo urgente|empleo urgente)/.test(q)) return undefined;
  if (danielGoal.test(q) && danielExploration.test(q)) return 'ans-goal-daniel-entry';
  return undefined;
};

/**
 * Conservative direct routing for paraphrases of the 16 researched questions.
 * Only unambiguous specific requests resolve here; broad options go to the chooser.
 * Crisis/privacy and multi-need routing still run first in the chat.
 */
export const routeGoalDetailQuestion = (input: string): string | undefined => {
  const q = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'").replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const rules: Array<[RegExp, string]> = [
    [/(?:adult|older|45).*(?:four year university|university)|(?:four year university|university).*(?:adult|older|at 45)/, 'ans-pathway-daniel-d2'],
    [/(?:straight|directly|right after high school).*(?:four year|university|csu|uc)|(?:four year|university).*(?:straight|directly).*high school/, 'ans-pathway-sofia-s1'],
    [/(?:difference|compare).*(?:community college|csu|uc|private universit)/, 'ans-pathway-sofia-s2'],
    [/(?:afford|pay for).*(?:four year|university)/, 'ans-pathway-sofia-s3'],
    [/(?:biology|healthcare).*(?:colleges|university|degrees|programs|careers)/, 'ans-pathway-sofia-s4'],
    [/(?:out of state|outside california).*(?:university|college)|(?:university|college).*(?:outside california|out of state)/, 'ans-pathway-sofia-s5'],
    [/apply.*(?:universit|csu|uc).*(?:community college)|apply.*(?:community college).*(?:universit|csu|uc)/, 'ans-pathway-sofia-s6'],
    [/(?:iep|504 plan|disability accommodations).*(?:college|university|csu|uc)/, 'ans-pathway-sofia-s7'],
    [/(?:gap year|wait before college|not.*college.*(?:right away|immediately))/, 'ans-pathway-sofia-s8'],
    [/(?:lost.*job.*(?:return to school|need.*training)|change careers without school)/, 'ans-pathway-daniel-d1'],
    [/(?:manufactur).*(?:supervisor|management|higher level).*(?:without.*degree)|(?:manufactur.*experience).*(?:higher position|advance)/, 'ans-pathway-daniel-d3'],
    [/(?:paid apprenticeship|apprenticeship.*(?:earn|paid|wage)|earn.*while.*learn)/, 'ans-pathway-daniel-d4'],
    [/(?:bachelor.*(?:management|another industry|change careers)|(?:management|another industry).*bachelor)/, 'ans-pathway-daniel-d5'],
    [/(?:online|hybrid).*(?:university|bachelor|degree).*(?:work|part time)|(?:university|bachelor).*(?:online|hybrid)/, 'ans-pathway-daniel-d6'],
    [/(?:disability).*(?:new career|work i can do|attend university)|(?:accommodations).*(?:job interview|career change)/, 'ans-pathway-daniel-d7'],
    [/(?:start (?:my|our|a) (?:own |small )?business|self employment|entrepreneurship)/, 'ans-pathway-daniel-d8']
  ];
  return rules.find(([pattern]) => pattern.test(q))?.[1];
};
