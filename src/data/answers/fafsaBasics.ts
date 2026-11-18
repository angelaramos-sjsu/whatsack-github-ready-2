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
      "ans-fafsa-pell-cal",
      "ans-fafsa-workstudy"
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
      "es": "**Pell Grant federal:** apoyo federal principalmente para estudiantes de licenciatura elegibles con necesidad económica. **FSEOG:** subvención federal adicional para estudiantes con necesidad económica excepcional en instituciones participantes; los fondos son limitados. **Cal Grants:** subvenciones estatales de California con distintos tipos y requisitos. California también ofrece **Chafee Grants** a jóvenes elegibles que están o estuvieron en cuidado de crianza. La **FAFSA o CADAA**, según corresponda, ayuda a evaluar requisitos, pero **presentar la solicitud no garantiza ayuda**."
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
  }
];

/** Narrow routing for common introductory FAFSA/aid questions; detailed cases go to existing scripts. */
export const routeFafsaBasicsQuestion = (input: string): string | undefined => {
  const q = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const rules: Array<[RegExp, string]> = [
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
