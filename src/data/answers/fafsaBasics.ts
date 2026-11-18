import type { ScriptedAnswer } from './types';

/** Introductory financial-aid scripts based on official Federal Student Aid and California sources. No applications or eligibility decisions occur in WhatSack. */
export const fafsaBasicsAnswers: ScriptedAnswer[] = [
  {
    "id": "ans-fafsa-intro",
    "topic": "college",
    "question": {
      "en": "What is financial aid, and what can it help pay for?",
      "es": "¿Qué es la ayuda financiera y qué gastos puede cubrir?"
    },
    "answer": {
      "en": "Financial aid helps eligible students pay for college or career school. It can come from the federal government, California, a school, or private organizations. Depending on the award, it may help with tuition and fees, books and supplies, housing, food, or transportation. **Not every award covers every expense**, so compare the full cost of attendance and each program's rules.",
      "es": "La ayuda financiera ayuda a estudiantes elegibles a pagar sus estudios universitarios o de capacitación. Puede provenir del gobierno federal, California, la institución u organizaciones privadas. Según el apoyo, puede cubrir matrícula, cuotas, libros, materiales, vivienda, comida o transporte. **No todos los apoyos cubren todos los gastos**; compara los costos y requisitos."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — types of aid",
          "es": "Ayuda Federal — tipos de ayuda"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/understand-aid/types"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Review all costs at a school, not only tuition.",
        "es": "Revisa todos los gastos de una institución, no solo la matrícula."
      },
      "actions": [
        {
          "id": "fafsa-intro-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/understand-aid/types"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-fafsa",
      "ans-fafsa-aid-types",
      "ans-fafsa-compare"
    ]
  },
  {
    "id": "ans-fafsa-fafsa",
    "topic": "college",
    "question": {
      "en": "What is the FAFSA, and is it free?",
      "es": "¿Qué es la FAFSA y es gratuita?"
    },
    "answer": {
      "en": "**FAFSA** means **Free Application for Federal Student Aid**. You submit it at the official **StudentAid.gov** website to be considered for federal grants, work-study, and loans; states and colleges may also use it for their aid. **Submitting a FAFSA is free, but it does not guarantee a particular award.** If you may need California Dream Act Application (CADAA) instead, review the eligibility guidance before choosing.",
      "es": "**FAFSA** significa **Solicitud Gratuita de Ayuda Federal para Estudiantes**. Se presenta en **StudentAid.gov** para solicitar consideración para subvenciones federales, trabajo y estudio y préstamos; California y las instituciones también pueden usarla. **Es gratuita, pero no garantiza una cantidad de ayuda.** Si podría corresponderte CADAA, revisa los requisitos antes de elegir."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — start the FAFSA",
          "es": "Ayuda Federal — iniciar la FAFSA"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/h/apply-for-aid/fafsa"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Check the official FAFSA page and the correct aid application for your circumstances.",
        "es": "Revisa la página oficial de FAFSA y cuál solicitud corresponde a tu situación."
      },
      "actions": [
        {
          "id": "fafsa-fafsa-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/h/apply-for-aid/fafsa"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-apply",
      "ans-fafsa-aid-types",
      "ans-college-fafsa-vs-cadaa"
    ]
  },
  {
    "id": "ans-fafsa-apply",
    "topic": "college",
    "question": {
      "en": "How do I start and submit my first FAFSA?",
      "es": "¿Cómo empiezo y envío mi primera FAFSA?"
    },
    "answer": {
      "en": "Here is a **basic starting path**, not a substitute for the official form:\n1. Go to **StudentAid.gov** and create your own account.\n2. Choose **Start New Form** and the correct school year.\n3. Complete your student sections; invite a parent or spouse as a contributor **if the form requires it**. Each contributor uses their own account.\n4. Provide the requested information and consent for federal tax information transfer; add the schools you are considering.\n5. Review, sign, and make sure **all required contributors** finish their sections so the form can be submitted.\n6. Check your StudentAid.gov account for processing updates and any next steps.\n**WhatSack does not collect personal financial details or submit applications.**",
      "es": "Esta es una **guía básica para comenzar**, no un reemplazo del formulario oficial:\n1. Entra a **StudentAid.gov** y crea tu propia cuenta.\n2. Selecciona **Start New Form** y el año escolar correcto.\n3. Completa tus secciones; invita a un padre, madre o cónyuge **si es necesario**. Cada participante usa su propia cuenta.\n4. Proporciona los datos solicitados, autoriza la transferencia de información tributaria y agrega las instituciones que consideras.\n5. Revisa, firma y comprueba que **todos los participantes requeridos** completen sus secciones.\n6. Consulta tu cuenta de StudentAid.gov para ver el estado y los siguientes pasos.\n**WhatSack no recopila datos financieros personales ni envía solicitudes.**"
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — FAFSA steps for students",
          "es": "Ayuda Federal — pasos para estudiantes"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/articles/fafsa-student-steps/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Use the official step-by-step instructions while completing the form.",
        "es": "Usa las instrucciones oficiales mientras completas el formulario."
      },
      "actions": [
        {
          "id": "fafsa-apply-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/articles/fafsa-student-steps/"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-prepare",
      "ans-fafsa-parents",
      "ans-fafsa-after"
    ]
  },
  {
    "id": "ans-fafsa-prepare",
    "topic": "college",
    "question": {
      "en": "What should I have ready before filling out FAFSA?",
      "es": "¿Qué debo tener listo antes de completar la FAFSA?"
    },
    "answer": {
      "en": "Prepare your **own StudentAid.gov account**, a list of colleges or career schools, and access to the financial information requested by the form. Depending on your situation, that can include tax records, assets, and child support received. If a parent or spouse must contribute, they need their **own account** and may need financial records. Use the tax year the form asks for. **Do not share Social Security numbers, tax records, or account passwords in WhatSack.**",
      "es": "Prepara tu **propia cuenta de StudentAid.gov**, una lista de instituciones y acceso a la información financiera solicitada. Según tu situación, pueden hacer falta declaraciones de impuestos, datos sobre bienes y manutención recibida. Si un padre, madre o cónyuge debe participar, necesita **su propia cuenta** y posiblemente registros financieros. Usa el año fiscal indicado. **No compartas números de Seguro Social, documentos tributarios ni contraseñas con WhatSack.**"
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — FAFSA checklist",
          "es": "Ayuda Federal — lista para la FAFSA"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/articles/things-you-need-for-fafsa/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Review the official FAFSA checklist before you start.",
        "es": "Consulta la lista oficial de FAFSA antes de empezar."
      },
      "actions": [
        {
          "id": "fafsa-prepare-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/articles/things-you-need-for-fafsa/"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-apply",
      "ans-fafsa-parents",
      "ans-fafsa-after"
    ]
  },
  {
    "id": "ans-fafsa-parents",
    "topic": "college",
    "question": {
      "en": "Do my parents need to fill out part of my FAFSA?",
      "es": "¿Mis padres deben completar parte de mi FAFSA?"
    },
    "answer": {
      "en": "**Sometimes.** The FAFSA determines whether you are a dependent student under federal aid rules. If a parent is required, you invite the appropriate parent to complete their section as a **contributor**; each person signs in with a separate StudentAid.gov account. A parent can create an account even without a Social Security number. Providing information **does not make a parent responsible for student loans**. If you cannot safely contact a parent or have unusual circumstances, follow the official guidance and contact a financial aid office.",
      "es": "**A veces.** La FAFSA determina si dependes de tus padres según las reglas de ayuda federal. Si se requiere información de un padre o madre, se le invita como **participante**; cada persona usa su propia cuenta de StudentAid.gov. Un padre o madre puede crear una cuenta aunque no tenga número de Seguro Social. Proporcionar datos **no lo hace responsable de préstamos estudiantiles**. Si no puedes contactar a tus padres por razones de seguridad o tienes circunstancias especiales, consulta la guía oficial y una oficina de ayuda financiera."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — steps for parents",
          "es": "Ayuda Federal — pasos para padres"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/articles/fafsa-for-parents/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Check who, if anyone, must contribute to your FAFSA.",
        "es": "Verifica quién, si corresponde, debe participar en tu FAFSA."
      },
      "actions": [
        {
          "id": "fafsa-parents-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/articles/fafsa-for-parents/"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-prepare",
      "ans-fafsa-apply",
      "ans-fafsa-after"
    ]
  },
  {
    "id": "ans-fafsa-timing",
    "topic": "college",
    "question": {
      "en": "When should I apply for FAFSA, and do I apply every year?",
      "es": "¿Cuándo debo presentar la FAFSA y debo hacerlo cada año?"
    },
    "answer": {
      "en": "Complete a **new FAFSA for each academic year** you want federal aid. Select the year covering when you will attend school: for example, **2027–28** covers July 1, 2027, through June 30, 2028. **Federal, state, and individual school deadlines can differ.** Check the official deadline pages for your year and apply as early as practical; some aid programs have limited funding. If you are attending summer classes, ask the school's aid office which year to file.",
      "es": "Debes completar una **FAFSA nueva por cada año académico** en que quieras ayuda federal. Elige el año correspondiente: por ejemplo, **2027–28** cubre del 1 de julio de 2027 al 30 de junio de 2028. **Las fechas límite federales, estatales y de cada institución pueden ser distintas.** Verifica los plazos oficiales y solicita con anticipación; algunos fondos son limitados. Para cursos de verano, pregunta a la institución cuál año corresponde."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — start the FAFSA",
          "es": "Ayuda Federal — iniciar la FAFSA"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/h/apply-for-aid/fafsa"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Check federal, California, and school-specific deadlines for your enrollment year.",
        "es": "Verifica los plazos federales, estatales y de tu institución para el año de ingreso."
      },
      "actions": [
        {
          "id": "fafsa-timing-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/h/apply-for-aid/fafsa"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-apply",
      "ans-fafsa-after",
      "ans-fafsa-aid-types"
    ]
  },
  {
    "id": "ans-fafsa-after",
    "topic": "college",
    "question": {
      "en": "What happens after I submit my FAFSA?",
      "es": "¿Qué sucede después de enviar mi FAFSA?"
    },
    "answer": {
      "en": "After your FAFSA is **processed**, check your StudentAid.gov dashboard for your **FAFSA Submission Summary**. It shows the information reported, possible issues, your Student Aid Index, and **estimates** of federal aid—not a final award. Schools you listed may request additional information. Once admitted, review each school's **financial aid offer** for actual amounts and conditions. Check messages from StudentAid.gov and the school; correct errors using the official process.",
      "es": "Después de que se **procese** tu FAFSA, consulta el **FAFSA Submission Summary** en StudentAid.gov. Muestra los datos enviados, posibles problemas, tu índice de ayuda estudiantil y **estimaciones** de ayuda federal, no una oferta definitiva. Las instituciones pueden pedir documentos adicionales. Tras la admisión, revisa la **oferta de ayuda financiera** de cada institución para conocer montos y condiciones. Revisa los mensajes y corrige errores por los canales oficiales."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — after submitting",
          "es": "Ayuda Federal — después de presentar"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/articles/fafsa-submission-summary/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Review your Submission Summary, then compare your schools' aid offers.",
        "es": "Revisa tu resumen y luego compara las ofertas de ayuda de las instituciones."
      },
      "actions": [
        {
          "id": "fafsa-after-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/articles/fafsa-submission-summary/"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-compare",
      "ans-fafsa-aid-types",
      "ans-fafsa-income"
    ]
  },
  {
    "id": "ans-fafsa-income",
    "topic": "college",
    "question": {
      "en": "What if my family's income dropped after the tax year used for FAFSA?",
      "es": "¿Y si los ingresos de mi familia bajaron después del año fiscal usado para FAFSA?"
    },
    "answer": {
      "en": "Submit the FAFSA using the **tax year and information the form requests**, even if your family's income has changed because of unemployment or another circumstance. Then contact each school's financial aid office to ask about a **special-circumstances review** or adjustment. The school decides whether changes are appropriate; WhatSack cannot recalculate your aid or determine eligibility.",
      "es": "Presenta la FAFSA con **el año fiscal y los datos que solicita**, aunque los ingresos de tu familia hayan cambiado por desempleo u otra situación. Después pregunta en la oficina de ayuda financiera de cada institución por una **revisión de circunstancias especiales** o ajuste. La institución decide si corresponde modificar la ayuda; WhatSack no puede recalcularla ni determinar elegibilidad."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — FAFSA checklist",
          "es": "Ayuda Federal — lista para la FAFSA"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/articles/things-you-need-for-fafsa/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Ask a school financial aid office what documentation it needs for an income-change review.",
        "es": "Pregunta qué documentos necesita la oficina de ayuda financiera para revisar el cambio de ingresos."
      },
      "actions": [
        {
          "id": "fafsa-income-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/articles/things-you-need-for-fafsa/"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-after",
      "ans-fafsa-prepare",
      "ans-fafsa-compare"
    ]
  },
  {
    "id": "ans-fafsa-aid-types",
    "topic": "college",
    "question": {
      "en": "What types of financial aid can I receive?",
      "es": "¿Qué tipos de ayuda financiera puedo recibir?"
    },
    "answer": {
      "en": "**Four common types:**\n- **Grants:** usually do not need repayment if you meet their conditions (for example, Pell Grant, some California grants).\n- **Scholarships:** awards from schools or organizations that usually do not require repayment; you may need a separate application.\n- **Work-study:** eligible students earn wages by working at approved jobs; a job is not guaranteed.\n- **Loans:** borrowed funds that **must be repaid**, usually with interest.\nCalifornia community colleges may also offer an **enrollment-fee waiver** for eligible students. Aid depends on your school, program, and circumstances.",
      "es": "**Cuatro tipos comunes:**\n- **Subvenciones (grants):** normalmente no se devuelven si cumples sus condiciones (por ejemplo, Pell Grant o algunas ayudas de California).\n- **Becas:** apoyos de instituciones u organizaciones que normalmente no se devuelven; pueden requerir otra solicitud.\n- **Trabajo y estudio:** estudiantes elegibles ganan un salario trabajando; conseguir empleo no está garantizado.\n- **Préstamos:** dinero prestado que **se debe devolver**, generalmente con intereses.\nAlgunos colegios comunitarios de California también ofrecen **exenciones de cuotas de inscripción**. La ayuda depende de tu institución, programa y circunstancias."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — types of aid",
          "es": "Ayuda Federal — tipos de ayuda"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/understand-aid/types"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Identify whether each award is free aid, wages, a fee waiver, or a loan.",
        "es": "Identifica si cada apoyo es ayuda gratuita, salario, exención de cuotas o préstamo."
      },
      "actions": [
        {
          "id": "fafsa-aid-types-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/understand-aid/types"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-grants-v-scholarships",
      "ans-fafsa-workstudy",
      "ans-fafsa-loans"
    ]
  },
  {
    "id": "ans-fafsa-grants-v-scholarships",
    "topic": "college",
    "question": {
      "en": "What is the difference between a grant and a scholarship?",
      "es": "¿Cuál es la diferencia entre una subvención y una beca?"
    },
    "answer": {
      "en": "**Grants** are often based on financial need or other program requirements. **Scholarships** may consider academic performance, community activities, financial need, field of study, or other criteria. Both generally **do not need to be repaid**, as long as you meet the award's conditions; exceptions can apply. Some scholarships require **separate applications and deadlines** beyond FAFSA. Check the source and requirements of each award.",
      "es": "Las **subvenciones** suelen basarse en necesidad económica u otros requisitos. Las **becas** pueden considerar rendimiento académico, actividades comunitarias, necesidad económica, carrera u otros criterios. Por lo general, **no se devuelven** si cumples sus condiciones, aunque puede haber excepciones. Algunas becas requieren **solicitudes y plazos separados** de la FAFSA. Verifica los requisitos de cada apoyo."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — grants",
          "es": "Ayuda Federal — subvenciones"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/understand-aid/types/grants"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "List two grants or scholarships you want to investigate and verify their requirements.",
        "es": "Elige dos subvenciones o becas e investiga sus requisitos."
      },
      "actions": [
        {
          "id": "fafsa-grants-v-scholarships-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/understand-aid/types/grants"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-pell-cal",
      "ans-fafsa-aid-types",
      "ans-fafsa-compare"
    ]
  },
  {
    "id": "ans-fafsa-pell-cal",
    "topic": "college",
    "question": {
      "en": "What are Pell Grants, Cal Grants, and other grants?",
      "es": "¿Qué son Pell Grant, Cal Grant y otras subvenciones?"
    },
    "answer": {
      "en": "**Federal Pell Grant:** federal grant mainly for eligible undergraduate students with financial need. **Federal Supplemental Educational Opportunity Grant (FSEOG):** additional federal grant for students with exceptional financial need at participating schools; funds are limited. **Cal Grants:** California state grants with different award types and eligibility requirements. California also has programs such as **Chafee Grants** for eligible current or former foster youth. The **FAFSA or CADAA**, as applicable, helps schools and agencies assess eligibility, but **filing alone does not guarantee an award**.",
      "es": "**Pell Grant federal:** apoyo federal principalmente para estudiantes de pregrado elegibles con necesidad económica. **FSEOG:** subvención federal adicional para estudiantes con necesidad económica excepcional en instituciones participantes; los fondos son limitados. **Cal Grants:** subvenciones estatales de California con distintos tipos y requisitos. California también ofrece **Chafee Grants** a jóvenes elegibles que están o estuvieron en cuidado de crianza. La **FAFSA o CADAA**, según corresponda, ayuda a evaluar requisitos, pero **presentar la solicitud no garantiza ayuda**."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "California Student Aid Commission — programs",
          "es": "Comisión de Ayuda Estudiantil de California — programas"
        },
        "source": {
          "en": "California Student Aid Commission / California Community Colleges",
          "es": "California"
        },
        "url": "https://csac.ca.gov/programs"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare federal and California grant requirements on official pages.",
        "es": "Compara los requisitos de subvenciones federales y de California en páginas oficiales."
      },
      "actions": [
        {
          "id": "fafsa-pell-cal-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://csac.ca.gov/programs"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-grants-v-scholarships",
      "ans-fafsa-promise",
      "ans-college-fafsa-vs-cadaa"
    ]
  },
  {
    "id": "ans-fafsa-workstudy",
    "topic": "college",
    "question": {
      "en": "What is Federal Work-Study, and is it free money?",
      "es": "¿Qué es Federal Work-Study y es dinero gratuito?"
    },
    "answer": {
      "en": "**Federal Work-Study** is financial aid through **paid part-time work**, not a grant deposited automatically into your account. Eligible students must find and obtain a qualifying job to earn wages; the amount shown in an aid offer **is not guaranteed income**. Ask your school's financial aid or student employment office about eligibility, openings, pay, and how work might fit your schedule.",
      "es": "**Federal Work-Study** es ayuda por medio de **trabajo remunerado de medio tiempo**, no una subvención que se entrega automáticamente. Estudiantes elegibles deben conseguir un empleo aprobado para ganar el salario; la cantidad en una oferta de ayuda **no es ingreso garantizado**. Pregunta a tu institución sobre requisitos, vacantes, salario y horarios."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — work-study",
          "es": "Ayuda Federal — trabajo y estudio"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/understand-aid/types/work-study"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Contact the school's work-study or student employment office about actual openings.",
        "es": "Consulta a la oficina de empleo estudiantil sobre vacantes reales."
      },
      "actions": [
        {
          "id": "fafsa-workstudy-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/understand-aid/types/work-study"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-aid-types",
      "ans-fafsa-loans",
      "ans-fafsa-compare"
    ]
  },
  {
    "id": "ans-fafsa-loans",
    "topic": "college",
    "question": {
      "en": "Do I have to repay student loans or accept them if offered?",
      "es": "¿Debo pagar los préstamos estudiantiles o aceptarlos si me los ofrecen?"
    },
    "answer": {
      "en": "**Student loans must be repaid**, generally with interest; they are different from grants and scholarships. A school might offer **Direct Subsidized** loans (interest benefits for eligible students with financial need) or **Direct Unsubsidized** loans (interest generally accrues during school). **Filling out FAFSA does not force you to borrow or accept an offered loan.** Review the loan terms and speak with your financial aid office before deciding.",
      "es": "**Los préstamos estudiantiles se deben devolver**, generalmente con intereses; no son subvenciones ni becas. Una institución puede ofrecer préstamos **Direct Subsidized** (con beneficios de intereses para estudiantes elegibles con necesidad económica) o **Direct Unsubsidized** (los intereses normalmente se acumulan durante los estudios). **Completar la FAFSA no te obliga a pedir prestado ni aceptar préstamos ofrecidos.** Revisa las condiciones antes de decidir."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — student loans",
          "es": "Ayuda Federal — préstamos estudiantiles"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/understand-aid/types/loans"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Separate grants and scholarships from loans before comparing how much you will owe.",
        "es": "Separa subvenciones y becas de los préstamos antes de calcular lo que deberás."
      },
      "actions": [
        {
          "id": "fafsa-loans-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/understand-aid/types/loans"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-aid-types",
      "ans-fafsa-compare",
      "ans-fafsa-workstudy"
    ]
  },
  {
    "id": "ans-fafsa-promise",
    "topic": "college",
    "question": {
      "en": "What does the California College Promise Grant cover?",
      "es": "¿Qué cubre el California College Promise Grant?"
    },
    "answer": {
      "en": "The **California College Promise Grant (CCPG)** generally waives **enrollment fees** for eligible students at California community colleges. It is **not a cash scholarship** and does not automatically pay for housing, books, transportation, or every campus fee. The separate **College Promise** programs at individual campuses can have different requirements and benefits. Check the specific college's financial aid office for eligibility and application details.",
      "es": "El **California College Promise Grant (CCPG)** generalmente **exime de cuotas de inscripción** a estudiantes elegibles de colegios comunitarios de California. **No es una beca en efectivo** y no cubre automáticamente vivienda, libros, transporte ni todas las cuotas. Los programas **College Promise** de cada institución pueden tener otros requisitos y beneficios. Confirma los detalles en la oficina de ayuda financiera."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "California Student Aid Commission — programs",
          "es": "Comisión de Ayuda Estudiantil de California — programas"
        },
        "source": {
          "en": "California Student Aid Commission / California Community Colleges",
          "es": "California"
        },
        "url": "https://csac.ca.gov/programs"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Check your community college's CCPG and separate Promise program requirements.",
        "es": "Verifica los requisitos de CCPG y del programa Promise de tu colegio."
      },
      "actions": [
        {
          "id": "fafsa-promise-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://csac.ca.gov/programs"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-aid-types",
      "ans-fafsa-pell-cal",
      "ans-fafsa-compare"
    ]
  },
  {
    "id": "ans-fafsa-compare",
    "topic": "college",
    "question": {
      "en": "How do I compare financial aid offers from different colleges?",
      "es": "¿Cómo comparo las ofertas de ayuda financiera de distintas instituciones?"
    },
    "answer": {
      "en": "Start with each school's **total cost of attendance**, including housing, food, transportation, books, and fees. Subtract **grants and scholarships** to estimate your **net price**. Treat work-study as money you must earn through a job and **loans as debt**, not discounts. Compare the remaining cost, renewal conditions, and any separate application deadlines; ask each financial aid office to explain anything unclear.",
      "es": "Comienza con el **costo total de asistencia** de cada institución, incluido vivienda, comida, transporte, libros y cuotas. Resta **subvenciones y becas** para estimar el **precio neto**. Considera el trabajo y estudio como salario que debes ganar y **los préstamos como deuda**, no como descuentos. Compara costos restantes, condiciones de renovación y plazos; consulta cualquier duda con la oficina de ayuda financiera."
    },
    "context": [
      {
        "en": "Financial aid and college access",
        "es": "Ayuda financiera y acceso a estudios"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — compare aid offers",
          "es": "Ayuda Federal — comparar ofertas"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "Departamento de Educación de EE. UU."
        },
        "url": "https://studentaid.gov/articles/evaluating-financial-aid-offers/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare two colleges using total costs minus grants and scholarships, not loan amounts.",
        "es": "Compara dos instituciones usando costos totales menos subvenciones y becas, sin restar préstamos."
      },
      "actions": [
        {
          "id": "fafsa-compare-open",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir guía oficial"
          },
          "url": "https://studentaid.gov/articles/evaluating-financial-aid-offers/"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-aid-types",
      "ans-fafsa-loans",
      "ans-fafsa-after"
    ]
  },
  {
    "id": "ans-fafsa-ca-after",
    "topic": "college",
    "question": {
      "en": "What should I do after submitting FAFSA or CADAA in California?",
      "es": "¿Qué debo hacer después de enviar la FAFSA o CADAA en California?"
    },
    "answer": {
      "en": "**Submitting is only the beginning.** (1) Check your email and the original application portal for confirmation and processing updates. (2) Set up or access **WebGrants 4 Students (WG4S)** to check your California grant status and any to-do items. (3) Verify that the GPA information required for Cal Grant consideration was received, if it applies to you. (4) Monitor each college's financial aid portal and respond to requests for documents. **WG4S, StudentAid.gov/CADAA, and your college portal are separate accounts.**",
      "es": "**Enviar la solicitud es solo el comienzo.** (1) Revisa el correo y la solicitud original para confirmar el envío y procesamiento. (2) Entra a **WebGrants 4 Students (WG4S)** para revisar ayudas estatales y tareas pendientes. (3) Confirma que se haya recibido tu GPA para Cal Grant, si corresponde. (4) Revisa el portal de ayuda financiera de cada institución y responde a solicitudes de documentos. **WG4S, StudentAid.gov/CADAA y el portal de la institución son cuentas separadas.**"
    },
    "context": [
      {
        "en": "California financial aid",
        "es": "Ayuda financiera de California"
      }
    ],
    "links": [
      {
        "label": {
          "en": "CSAC — How to apply and what happens next",
          "es": "Guía oficial de California"
        },
        "source": {
          "en": "California Student Aid Commission",
          "es": "Comisión de Ayuda Estudiantil de California"
        },
        "url": "https://www.csac.ca.gov/apply"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Check your application status, California aid status, and college aid portal separately.",
        "es": "Verifica por separado tu solicitud, ayuda estatal y portal institucional."
      },
      "actions": [
        {
          "id": "fafsa-ca-after-open",
          "kind": "open-link",
          "label": {
            "en": "Open official instructions",
            "es": "Abrir instrucciones oficiales"
          },
          "url": "https://www.csac.ca.gov/apply"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-wg4s",
      "ans-fafsa-calgrant-gpa",
      "ans-fafsa-ca-problem"
    ]
  },
  {
    "id": "ans-fafsa-wg4s",
    "topic": "college",
    "question": {
      "en": "What is WebGrants 4 Students, and how do I create an account?",
      "es": "¿Qué es WebGrants 4 Students y cómo creo una cuenta?"
    },
    "answer": {
      "en": "**WebGrants 4 Students (WG4S)** is California's official portal for managing Cal Grant and some other state aid information. **FAFSA filers** should normally wait **7–10 days after submitting FAFSA** before creating a WG4S account. **CADAA filers** can sign in using the username and password associated with their CADAA account. After accessing WG4S, review your application status and to-do list. This portal does **not** replace StudentAid.gov or your college's financial aid account. Do not enter passwords or identity documents into WhatSack.",
      "es": "**WebGrants 4 Students (WG4S)** es el portal oficial de California para consultar Cal Grant y otras ayudas estatales. Quienes enviaron la **FAFSA** normalmente deben esperar **7–10 días** para crear la cuenta WG4S. Quienes enviaron la **CADAA** pueden iniciar sesión con los datos de su cuenta CADAA. Revisa el estado y las tareas pendientes. Este portal **no sustituye** StudentAid.gov ni el portal de ayuda financiera de tu institución. No compartas contraseñas ni documentos de identidad con WhatSack."
    },
    "context": [
      {
        "en": "California financial aid",
        "es": "Ayuda financiera de California"
      }
    ],
    "links": [
      {
        "label": {
          "en": "WebGrants 4 Students — official portal",
          "es": "Guía oficial de California"
        },
        "source": {
          "en": "California Student Aid Commission",
          "es": "Comisión de Ayuda Estudiantil de California"
        },
        "url": "https://mygrantinfo.csac.ca.gov/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Open WG4S on its official site and review your account status.",
        "es": "Abre WG4S en el sitio oficial y revisa el estado de tu cuenta."
      },
      "actions": [
        {
          "id": "fafsa-wg4s-open",
          "kind": "open-link",
          "label": {
            "en": "Open official instructions",
            "es": "Abrir instrucciones oficiales"
          },
          "url": "https://mygrantinfo.csac.ca.gov/"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-calgrant-gpa",
      "ans-fafsa-ca-after",
      "ans-fafsa-ca-problem"
    ]
  },
  {
    "id": "ans-fafsa-calgrant-gpa",
    "topic": "college",
    "question": {
      "en": "How do I check if my GPA was submitted for a Cal Grant?",
      "es": "¿Cómo verifico si enviaron mi promedio de calificaciones (GPA) para Cal Grant?"
    },
    "answer": {
      "en": "Some **Cal Grant** applications require a verified grade point average (**GPA**) in addition to the FAFSA or CADAA. Schools often submit GPA information electronically, but **do not assume yours was received**. Log in to **WebGrants 4 Students**, review your GPA/Cal Grant status and any outstanding requirements, and contact your high school, college, or financial aid office if your GPA is missing or incorrect. GPA requirements and verification pathways vary by program and applicant.",
      "es": "Algunas solicitudes de **Cal Grant** requieren un promedio de calificaciones (**GPA**) verificado además de la FAFSA o CADAA. Muchas instituciones envían el GPA electrónicamente, pero **no supongas que recibieron el tuyo**. Entra a **WebGrants 4 Students**, verifica el estado de tu GPA/Cal Grant y consulta con tu preparatoria o institución si falta información o es incorrecta. Los requisitos varían según el programa y solicitante."
    },
    "context": [
      {
        "en": "California financial aid",
        "es": "Ayuda financiera de California"
      }
    ],
    "links": [
      {
        "label": {
          "en": "WebGrants 4 Students — GPA and grant status",
          "es": "Guía oficial de California"
        },
        "source": {
          "en": "California Student Aid Commission",
          "es": "Comisión de Ayuda Estudiantil de California"
        },
        "url": "https://mygrantinfo.csac.ca.gov/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Confirm your Cal Grant GPA record and ask your school to correct or submit it if needed.",
        "es": "Confirma el registro de GPA y pide a tu escuela que lo envíe o corrija si hace falta."
      },
      "actions": [
        {
          "id": "fafsa-calgrant-gpa-open",
          "kind": "open-link",
          "label": {
            "en": "Open official instructions",
            "es": "Abrir instrucciones oficiales"
          },
          "url": "https://mygrantinfo.csac.ca.gov/"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-wg4s",
      "ans-fafsa-ca-after",
      "ans-fafsa-ca-problem"
    ]
  },
  {
    "id": "ans-fafsa-cash4college",
    "topic": "college",
    "question": {
      "en": "Where can I get free help completing FAFSA or CADAA?",
      "es": "¿Dónde puedo recibir ayuda gratuita para completar FAFSA o CADAA?"
    },
    "answer": {
      "en": "California's **Cash for College** program offers **free application workshops**, and some schools and community groups also provide financial aid assistance. Use the official workshop locator to check current in-person or virtual options; locations, dates, and availability change. A high school counselor or a college financial aid office may also help. You do not need to pay a third party to submit FAFSA or CADAA. **WhatSack provides general information, not live application assistance.**",
      "es": "El programa **Cash for College** de California ofrece **talleres gratuitos** para completar solicitudes; algunas escuelas y organizaciones también brindan orientación. Usa el localizador oficial para consultar talleres presenciales o virtuales, ya que fechas y lugares cambian. Un consejero escolar o la oficina de ayuda financiera también puede ayudarte. No necesitas pagar a terceros para enviar la FAFSA o CADAA. **WhatSack ofrece información general, no ayuda en vivo.**"
    },
    "context": [
      {
        "en": "California financial aid",
        "es": "Ayuda financiera de California"
      }
    ],
    "links": [
      {
        "label": {
          "en": "Cash for College — free workshop finder",
          "es": "Guía oficial de California"
        },
        "source": {
          "en": "California Student Aid Commission",
          "es": "Comisión de Ayuda Estudiantil de California"
        },
        "url": "https://cash4college.csac.ca.gov/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Look up a current workshop or contact a college financial aid office.",
        "es": "Busca un taller actual o comunícate con una oficina de ayuda financiera."
      },
      "actions": [
        {
          "id": "fafsa-cash4college-open",
          "kind": "open-link",
          "label": {
            "en": "Open official instructions",
            "es": "Abrir instrucciones oficiales"
          },
          "url": "https://cash4college.csac.ca.gov/"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-apply",
      "ans-fafsa-cadaa-apply",
      "ans-fafsa-ca-after"
    ]
  },
  {
    "id": "ans-fafsa-cadaa-apply",
    "topic": "college",
    "question": {
      "en": "How do I start the California Dream Act Application (CADAA)?",
      "es": "¿Cómo comienzo la solicitud California Dream Act (CADAA)?"
    },
    "answer": {
      "en": "**CADAA** is the free California application for certain students who may qualify for **state or institutional aid** but are not applying through FAFSA. First review CSAC's guidance to confirm which form fits your circumstances; **WhatSack cannot decide for you**. At **dream.csac.ca.gov**, create an account, complete the requested student and parent/spouse information when applicable, review the form, and provide required electronic signatures. After submitting, review the confirmation and watch for CSAC updates and instructions to use **WebGrants 4 Students**. **CADAA does not apply for federal student aid.**",
      "es": "**CADAA** es la solicitud gratuita de California para ciertos estudiantes que pueden calificar para **ayuda estatal o institucional**. Primero revisa la guía de CSAC para confirmar qué formulario corresponde; **WhatSack no puede decidirlo por ti**. En **dream.csac.ca.gov**, crea una cuenta, completa tus datos y la información de padre, madre o cónyuge si corresponde, revisa la solicitud y firma electrónicamente. Después del envío, revisa la confirmación y los avisos de CSAC para usar **WebGrants 4 Students**. **CADAA no solicita ayuda federal.**"
    },
    "context": [
      {
        "en": "California financial aid",
        "es": "Ayuda financiera de California"
      }
    ],
    "links": [
      {
        "label": {
          "en": "CSAC — California Dream Act Application FAQs",
          "es": "Guía oficial de California"
        },
        "source": {
          "en": "California Student Aid Commission",
          "es": "Comisión de Ayuda Estudiantil de California"
        },
        "url": "https://csac.ca.gov/cadaa-faq"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Read CSAC's eligibility guidance and open the official CADAA form if appropriate.",
        "es": "Lee los requisitos de CSAC y abre la solicitud oficial CADAA si corresponde."
      },
      "actions": [
        {
          "id": "fafsa-cadaa-apply-open",
          "kind": "open-link",
          "label": {
            "en": "Open official instructions",
            "es": "Abrir instrucciones oficiales"
          },
          "url": "https://csac.ca.gov/cadaa-faq"
        }
      ]
    },
    "followUpIds": [
      "ans-college-fafsa-vs-cadaa",
      "ans-fafsa-cadaa-after",
      "ans-fafsa-cash4college"
    ]
  },
  {
    "id": "ans-fafsa-cadaa-after",
    "topic": "college",
    "question": {
      "en": "What happens after I submit the California Dream Act Application?",
      "es": "¿Qué pasa después de enviar la solicitud California Dream Act?"
    },
    "answer": {
      "en": "After submitting **CADAA**, review the **confirmation page** for errors or missing details. CSAC explains that you will receive a **nine-digit Dream ID** by email; follow its instructions to access **WebGrants 4 Students** and review eligibility updates, California aid status, and pending tasks. The colleges listed on CADAA receive your application information and may request additional documents. Check your college portal too—submission **does not guarantee an award**.",
      "es": "Después de enviar la **CADAA**, revisa la **página de confirmación** para detectar errores. CSAC indica que recibirás por correo un **Dream ID de nueve dígitos**; sigue sus instrucciones para entrar a **WebGrants 4 Students** y revisar el estado de la ayuda y tareas pendientes. Las instituciones incluidas reciben información de tu solicitud y pueden pedir documentos. Revisa también el portal de la institución: el envío **no garantiza ayuda**."
    },
    "context": [
      {
        "en": "California financial aid",
        "es": "Ayuda financiera de California"
      }
    ],
    "links": [
      {
        "label": {
          "en": "CSAC — next steps after CADAA",
          "es": "Guía oficial de California"
        },
        "source": {
          "en": "California Student Aid Commission",
          "es": "Comisión de Ayuda Estudiantil de California"
        },
        "url": "https://csac.ca.gov/cadaa-faq"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Check your confirmation, Dream ID email, WG4S status, and college aid portal.",
        "es": "Revisa la confirmación, correo de Dream ID, WG4S y el portal institucional."
      },
      "actions": [
        {
          "id": "fafsa-cadaa-after-open",
          "kind": "open-link",
          "label": {
            "en": "Open official instructions",
            "es": "Abrir instrucciones oficiales"
          },
          "url": "https://csac.ca.gov/cadaa-faq"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-wg4s",
      "ans-fafsa-calgrant-gpa",
      "ans-fafsa-ca-problem"
    ]
  },
  {
    "id": "ans-fafsa-ca-problem",
    "topic": "college",
    "question": {
      "en": "What if my FAFSA or CADAA has an error or shows as incomplete?",
      "es": "¿Qué hago si mi FAFSA o CADAA tiene un error o aparece incompleta?"
    },
    "answer": {
      "en": "First check the **official application account** (StudentAid.gov for FAFSA or the California Dream Act portal for CADAA) for processing status, missing signatures, and messages. If corrections are needed, follow that application's official correction instructions. Also check **WebGrants 4 Students** for California-specific outstanding tasks and your college financial aid portal for document requests. Ask the relevant agency or school financial aid office if you're unsure. **Never upload your tax documents or identity information to WhatSack.**",
      "es": "Primero revisa la **cuenta oficial de tu solicitud** (StudentAid.gov para FAFSA o el portal de California Dream Act para CADAA) por mensajes, firmas faltantes y estado del trámite. Si hace falta corregir datos, sigue las instrucciones oficiales. Consulta también **WebGrants 4 Students** por tareas estatales y el portal de tu institución por documentos solicitados. Si tienes dudas, comunícate con la agencia o la oficina de ayuda financiera. **No subas datos fiscales o documentos de identidad a WhatSack.**"
    },
    "context": [
      {
        "en": "California financial aid",
        "es": "Ayuda financiera de California"
      }
    ],
    "links": [
      {
        "label": {
          "en": "CSAC — application and follow-up instructions",
          "es": "Guía oficial de California"
        },
        "source": {
          "en": "California Student Aid Commission",
          "es": "Comisión de Ayuda Estudiantil de California"
        },
        "url": "https://www.csac.ca.gov/apply"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Find the exact error or missing task in the official portal and contact the responsible office.",
        "es": "Identifica el error o tarea en el portal oficial y consulta con la oficina responsable."
      },
      "actions": [
        {
          "id": "fafsa-ca-problem-open",
          "kind": "open-link",
          "label": {
            "en": "Open official instructions",
            "es": "Abrir instrucciones oficiales"
          },
          "url": "https://www.csac.ca.gov/apply"
        }
      ]
    },
    "followUpIds": [
      "ans-fafsa-ca-after",
      "ans-fafsa-wg4s",
      "ans-fafsa-cash4college"
    ]
  },
  {
    "id": "ans-fafsa-mixedstatus",
    "topic": "college",
    "question": {
      "en": "What financial aid options do students from mixed-status families have in California?",
      "es": "¿Qué opciones de ayuda tienen estudiantes de familias con estatus migratorio mixto en California?"
    },
    "answer": {
      "en": "Students in **mixed-status families** may have more than one application pathway depending on their circumstances. CSAC states that **California colleges and universities must allow students from mixed-status families to use CADAA for state and institutional aid if they prefer**. However, **CADAA does not apply for federal aid**, so students who may qualify for federal aid should review the difference carefully. Check CSAC's published guidance or speak privately with a financial aid counselor; **do not share anyone's immigration status with WhatSack**.",
      "es": "Los estudiantes de **familias con estatus migratorio mixto** pueden tener distintas opciones según su situación. CSAC indica que **las instituciones de California deben permitir presentar CADAA para ayuda estatal e institucional si la familia lo prefiere**. Sin embargo, **CADAA no solicita ayuda federal**; quien pudiera ser elegible para ayuda federal debe revisar las diferencias. Consulta la guía de CSAC o habla en privado con un asesor; **no compartas el estatus migratorio de nadie con WhatSack**."
    },
    "context": [
      {
        "en": "California financial aid",
        "es": "Ayuda financiera de California"
      }
    ],
    "links": [
      {
        "label": {
          "en": "CSAC — student disclosures and mixed-status families",
          "es": "Guía oficial de California"
        },
        "source": {
          "en": "California Student Aid Commission",
          "es": "Comisión de Ayuda Estudiantil de California"
        },
        "url": "https://csac.ca.gov/student-disclosures"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Your next step",
        "es": "Tu siguiente paso"
      },
      "detail": {
        "en": "Compare FAFSA and CADAA through CSAC's official guidance before choosing an application.",
        "es": "Compara FAFSA y CADAA con la guía oficial de CSAC antes de elegir."
      },
      "actions": [
        {
          "id": "fafsa-mixedstatus-open",
          "kind": "open-link",
          "label": {
            "en": "Open official instructions",
            "es": "Abrir instrucciones oficiales"
          },
          "url": "https://csac.ca.gov/student-disclosures"
        }
      ]
    },
    "followUpIds": [
      "ans-college-fafsa-vs-cadaa",
      "ans-fafsa-cadaa-apply",
      "ans-fafsa-cash4college"
    ]
  }
];

/** Narrow routing for common introductory FAFSA/aid questions; detailed cases go to existing scripts. */
export const routeFafsaBasicsQuestion = (input: string): string | undefined => {
  const q = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const rules: Array<[RegExp, string]> = [
    [/(?:webgrants|web grants|wg4s|mygrantinfo).*(?:account|create|login|sign|what|status)|(?:how do i|what is).*(?:webgrants|wg4s)|(?:create.*webgrants|webgrants.*create)/, 'ans-fafsa-wg4s'],
    [/(?:cal grant|calgrant|gpa).*(?:gpa|submitted|verify|verification|received|missing|check)|(?:was|is).*(?:gpa).*(?:submitted|received)|(?:check|verify).*(?:gpa)/, 'ans-fafsa-calgrant-gpa'],
    [/(?:where|how|free|workshop|cash for college).*(?:help|assist|workshop|cash for college).*(?:fafsa|cadaa|financial aid)?|(?:fafsa|cadaa).*(?:free help|workshop|cash for college)/, 'ans-fafsa-cash4college'],
    [/(?:after|next steps|submitted|completed).*(?:fafsa or cadaa|financial aid).*(?:california)?|(?:fafsa or cadaa).*(?:after|submit|next)/, 'ans-fafsa-ca-after'],
    [/(?:after|what happens|next|submitted|process).*(?:california dream act|cadaa)|(?:cadaa).*(?:after|submitted|confirmation|dream id)/, 'ans-fafsa-cadaa-after'],
    [/(?:how|start|begin|submit|fill out|apply for|complete).*(?:california dream act|cadaa)|(?:cadaa).*(?:how to apply|how to start|fill out|apply)/, 'ans-fafsa-cadaa-apply'],
    [/(?:incorrect|incomplete|mistake|error|fix|correction|missing signature).*(?:fafsa|cadaa|financial aid)|(?:fafsa|cadaa).*(?:incomplete|error|mistake|correct|fix)/, 'ans-fafsa-ca-problem'],
    [/(?:mixed status|mixed status famil|undocumented parent).*(?:aid|fafsa|cadaa|college)|(?:fafsa|cadaa).*(?:mixed status|undocumented parent)/, 'ans-fafsa-mixedstatus'],
    [/(?:que es webgrants|como.*(?:webgrants|wg4s))/, 'ans-fafsa-wg4s'],
    [/(?:como.*(?:gpa|promedio).*(?:cal grant)|(?:cal grant).*(?:gpa|promedio))/, 'ans-fafsa-calgrant-gpa'],
    [/(?:taller.*(?:fafsa|cadaa)|ayuda gratuita.*(?:fafsa|cadaa)|cash for college)/, 'ans-fafsa-cash4college'],
    [/(?:despues.*(?:cadaa|dream act)|(?:cadaa).*(?:despues|enviarla))/, 'ans-fafsa-cadaa-after'],
    [/(?:como.*(?:solicitud california dream act|cadaa)|(?:cadaa).*(?:como se|como la))/, 'ans-fafsa-cadaa-apply'],
    [/(?:error|incompleta|corregir|correccion).*(?:fafsa|cadaa)/, 'ans-fafsa-ca-problem'],
    [/(?:familia.*estatus.*mixto|familia.*estatus migratorio mixto)/, 'ans-fafsa-mixedstatus'],
    [/(?:what (?:happens|do i do)|next steps?|after submitting|after i submit|after i file|submission summary).*(?:fafsa|financial aid)|(?:fafsa).*(?:submitted|processed|submission summary|after i submit|after i file)/, 'ans-fafsa-after'],
    [/(?:what (?:documents|information|records)|what do i need|have ready|prepare|checklist).*(?:fafsa|financial aid)|(?:fafsa).*(?:documents|checklist|prepare|what do i need)/, 'ans-fafsa-prepare'],
    [/(?:parents?|mother|father|mom|dad|contributor).*(?:fafsa|financial aid)|(?:fafsa).*(?:parent|contributor)/, 'ans-fafsa-parents'],
    [/(?:income (?:changed|dropped|decreased)|lost (?:my|a) job|family income).*(?:fafsa|financial aid)|(?:fafsa).*(?:income changed|job loss)/, 'ans-fafsa-income'],
    [/(?:when|deadline|every year|renew|how often).*(?:fafsa)|(?:fafsa).*(?:deadline|every year|renew|when should)/, 'ans-fafsa-timing'],
    [/(?:how (?:do|can) i|steps?|start|submit|fill out|apply for|complete|first time).*(?:fafsa)|(?:fafsa).*(?:how to apply|how to start|first time|apply for|fill out)/, 'ans-fafsa-apply'],
    [/(?:what is|tell me about|how does).*(?:fafsa)|(?:fafsa).*(?:free|cost)/, 'ans-fafsa-fafsa'],
    [/(?:what is|how does).*(?:financial aid)|(?:financial aid).*(?:mean|cover|pay for)/, 'ans-fafsa-intro'],
    [/(?:what (?:types|kinds)|types|kinds|options).*(?:financial aid|student aid)|(?:financial aid).*(?:types|kinds|options)/, 'ans-fafsa-aid-types'],
    [/(?:grants?).*(?:scholarships?)|(?:scholarships?).*(?:grants?)/, 'ans-fafsa-grants-v-scholarships'],
    [/(?:pell grant|cal grants?|fseog|chafee grant).*(?:what|difference|how|eligib|mean)|(?:what is|what are|difference between).*(?:pell grant|cal grant|fseog|chafee)/, 'ans-fafsa-pell-cal'],
    [/(?:federal )?work study.*(?:what is|how|money|paid)|(?:what is|how does).*(?:work study)/, 'ans-fafsa-workstudy'],
    [/(?:student loans?|subsidized|unsubsidized).*(?:repay|pay back|accept|what is|difference)|(?:do i have to|must i).*(?:accept|repay|pay back).*(?:loan)/, 'ans-fafsa-loans'],
    [/(?:california college promise grant|ccpg).*(?:cover|what is|pay|waiv)|(?:what is|what does).*(?:california college promise grant|ccpg)/, 'ans-fafsa-promise'],
    [/(?:compare|understand|read).*(?:aid offer|financial aid offer|aid package)|(?:net price).*(?:college|aid|school)/, 'ans-fafsa-compare'],
    [/(?:que es|que significa).*(?:fafsa)/, 'ans-fafsa-fafsa'],
    [/(?:como|donde).*(?:solicito|presento|completo|lleno|empiezo|empiece).*(?:fafsa)|(?:fafsa).*(?:como se|como la)/, 'ans-fafsa-apply'],
    [/(?:tipos de ayuda financiera|clases de ayuda financiera)/, 'ans-fafsa-aid-types'],
    [/(?:que es la ayuda financiera|que cubre la ayuda financiera)/, 'ans-fafsa-intro']
  ];
  return rules.find(([pattern]) => pattern.test(q))?.[1];
};
