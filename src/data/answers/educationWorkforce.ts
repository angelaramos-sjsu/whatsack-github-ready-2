import type { ScriptedAnswer } from './types';

/** Research-informed California-wide Sofia / Daniel question pathways (2026 working paper).
 * All follow-up ids resolve to implemented answers. Program eligibility and scholarship
 * deadlines are deliberately conditional. Spanish copy is scripted, not generated at runtime.
 */
export const educationWorkforceAnswers: ScriptedAnswer[] = [
  {
    "id": "ans-ew-s1",
    "topic": "college",
    "question": {
      "en": "I'm the first person in my family going to college. Is there extra support for students like me?",
      "es": "Soy la primera persona de mi familia que va a la universidad. ¿Hay apoyo para mí?"
    },
    "answer": {
      "en": "Yes! Colleges offer counseling, financial-aid help and academic planning. At **California community colleges**, eligible students can explore **EOPS (Extended Opportunity Programs and Services)**. **CSU and UC campuses** offer **EOP (Educational Opportunity Program)** or comparable services. Eligibility and applications vary; being first-generation does not automatically qualify you. You can also ask any college counselor about general support.",
      "es": "¡Sí! Los colegios ofrecen orientación académica, ayuda financiera y asesoría. En los colegios comunitarios de California, estudiantes elegibles pueden explorar **EOPS**. Los campus de **CSU y UC** ofrecen **EOP** o servicios similares. Ser la primera persona de la familia en estudiar no garantiza la elegibilidad; consulte los requisitos de cada institución."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Community Colleges — EOPS",
          "es": "California Community Colleges — EOPS"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/"
      },
      {
        "label": {
          "en": "CSU Educational Opportunity Program",
          "es": "CSU Educational Opportunity Program"
        },
        "source": {
          "en": "California State University",
          "es": "California State University"
        },
        "url": "https://www.calstate.edu/attend/student-services/eop"
      },
      {
        "label": {
          "en": "UC Educational Opportunity Program",
          "es": "UC Educational Opportunity Program"
        },
        "source": {
          "en": "University of California",
          "es": "University of California"
        },
        "url": "https://admission.universityofcalifornia.edu/campuses-majors/campus-programs-and-support-services/educational-opportunity-program-eop.html"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Compare EOPS and EOP student support",
        "es": "Compare el apoyo EOPS y EOP"
      },
      "detail": {
        "en": "Compare EOPS/EOP services at two colleges or universities you are considering. Record eligibility criteria, application steps and deadlines.",
        "es": "Compare los servicios EOPS/EOP de dos instituciones y anote los requisitos, solicitudes y fechas límite."
      },
      "actions": [
        {
          "id": "ew-open-s1",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.cccco.edu/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-s3",
      "ans-ew-support-classes",
      "ans-ew-support-transfer"
    ]
  },
  {
    "id": "ans-ew-s2",
    "topic": "college",
    "question": {
      "en": "My family doesn't have a lot of money. How can I afford college?",
      "es": "Mi familia tiene poco dinero. ¿Cómo puedo pagar los estudios?"
    },
    "answer": {
      "en": "You have several options. Complete the **FAFSA or California Dream Act Application**, whichever applies to you, to learn about grants and other aid. Eligible community college students may receive an enrollment-fee waiver through the **California College Promise Grant**; universities have separate aid packages. You can also search actual scholarship opportunities through **Silicon Valley Community Foundation** and **Scholarship America**, or browse **BigFuture's scholarship directory**. The Gates Scholarship is an option only if you meet its selective four-year-college criteria. Compare housing, books, transportation and supplies—not just tuition.",
      "es": "Puede solicitar ayuda mediante **FAFSA o CADAA**, según corresponda. Algunos estudiantes de community college califican para la exención de cuotas **California College Promise Grant**. También puede buscar becas en **Silicon Valley Community Foundation**, **Scholarship America** y el directorio **BigFuture**. The Gates Scholarship tiene requisitos específicos para estudios de cuatro años. Compare también vivienda, libros, transporte y materiales."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Student Aid Commission",
          "es": "California Student Aid Commission"
        },
        "source": {
          "en": "CSAC",
          "es": "CSAC"
        },
        "url": "https://www.csac.ca.gov/"
      },
      {
        "label": {
          "en": "Federal Student Aid / FAFSA",
          "es": "Federal Student Aid / FAFSA"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://studentaid.gov/"
      },
      {
        "label": {
          "en": "Silicon Valley Community Foundation — find scholarships",
          "es": "Silicon Valley Community Foundation — find scholarships"
        },
        "source": {
          "en": "Silicon Valley Community Foundation",
          "es": "Silicon Valley Community Foundation"
        },
        "url": "https://www.svcf.org/scholarships/find-scholarships"
      },
      {
        "label": {
          "en": "Scholarship America — browse applications",
          "es": "Scholarship America — browse applications"
        },
        "source": {
          "en": "Scholarship America",
          "es": "Scholarship America"
        },
        "url": "https://scholarshipamerica.org/students/browse-scholarships/"
      },
      {
        "label": {
          "en": "BigFuture Scholarship Directory",
          "es": "BigFuture Scholarship Directory"
        },
        "source": {
          "en": "College Board",
          "es": "College Board"
        },
        "url": "https://bigfuture.collegeboard.org/pay-for-college/scholarship-directory"
      },
      {
        "label": {
          "en": "The Gates Scholarship — eligibility",
          "es": "The Gates Scholarship — eligibility"
        },
        "source": {
          "en": "The Gates Scholarship",
          "es": "The Gates Scholarship"
        },
        "url": "https://www.thegatesscholarship.org/scholarship/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Compare total college costs and financial aid",
        "es": "Compare costos y ayuda financiera"
      },
      "detail": {
        "en": "Compare the total estimated costs of two colleges after financial aid; shortlist two scholarships that fit your actual education pathway.",
        "es": "Compare el costo total de dos instituciones después de la ayuda financiera y elija dos becas apropiadas."
      },
      "actions": [
        {
          "id": "ew-open-s2",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.csac.ca.gov/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-s3",
      "ans-ew-support-supplies",
      "ans-ew-s6"
    ]
  },
  {
    "id": "ans-ew-s3",
    "topic": "college",
    "question": {
      "en": "Can I get money for college that I don't have to pay back?",
      "es": "¿Puedo recibir dinero para estudiar que no tenga que devolver?"
    },
    "answer": {
      "en": "Yes. **Scholarships and grants** generally do not require repayment if you meet their conditions. **Silicon Valley Community Foundation** lists high-school, college, re-entry and vocational awards; **Scholarship America** links to individual applications; **College Board BigFuture** helps you search other organizations' awards. If you're eligible, check the **Taco Bell Foundation's Live Más Scholarship** too. A scholarship is not the same as a Pell Grant, Cal Grant, fee waiver or loan. Complete the appropriate FAFSA or CADAA to explore grants; always check each scholarship's deadline, age and enrollment criteria.",
      "es": "Sí. Las **becas y subvenciones** normalmente no se devuelven si cumple sus condiciones. Consulte becas de **Silicon Valley Community Foundation**, solicitudes de **Scholarship America** y el buscador **BigFuture**. También puede revisar **Live Más Scholarship** si cumple sus requisitos. Las becas son diferentes de Pell Grants, Cal Grants, exenciones de cuotas y préstamos. Revise fechas límite y elegibilidad, y complete FAFSA o CADAA según corresponda."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Silicon Valley Community Foundation — find scholarships",
          "es": "Silicon Valley Community Foundation — find scholarships"
        },
        "source": {
          "en": "Silicon Valley Community Foundation",
          "es": "Silicon Valley Community Foundation"
        },
        "url": "https://www.svcf.org/scholarships/find-scholarships"
      },
      {
        "label": {
          "en": "Scholarship America — browse applications",
          "es": "Scholarship America — browse applications"
        },
        "source": {
          "en": "Scholarship America",
          "es": "Scholarship America"
        },
        "url": "https://scholarshipamerica.org/students/browse-scholarships/"
      },
      {
        "label": {
          "en": "BigFuture Scholarship Directory",
          "es": "BigFuture Scholarship Directory"
        },
        "source": {
          "en": "College Board",
          "es": "College Board"
        },
        "url": "https://bigfuture.collegeboard.org/pay-for-college/scholarship-directory"
      },
      {
        "label": {
          "en": "Live Más Scholarship eligibility",
          "es": "Live Más Scholarship eligibility"
        },
        "source": {
          "en": "Taco Bell Foundation",
          "es": "Taco Bell Foundation"
        },
        "url": "https://tacobellfoundation.org/live-mas-scholarship/"
      },
      {
        "label": {
          "en": "Federal Student Aid / FAFSA",
          "es": "Federal Student Aid / FAFSA"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://studentaid.gov/"
      },
      {
        "label": {
          "en": "California Student Aid Commission",
          "es": "California Student Aid Commission"
        },
        "source": {
          "en": "CSAC",
          "es": "CSAC"
        },
        "url": "https://www.csac.ca.gov/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Shortlist three scholarship applications",
        "es": "Seleccione tres becas para solicitar"
      },
      "detail": {
        "en": "Find three scholarships whose age, location and school requirements match your plans. Save each application link, deadline and required documents.",
        "es": "Busque tres becas que correspondan a su edad, localidad y estudios. Guarde enlaces, fechas y documentos requeridos."
      },
      "actions": [
        {
          "id": "ew-open-s3",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.svcf.org/scholarships/find-scholarships"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-support-firstgen-scholar",
      "ans-ew-support-highschool-scholar",
      "ans-college-fafsa-vs-cadaa"
    ]
  },
  {
    "id": "ans-ew-s4",
    "topic": "college",
    "question": {
      "en": "What happens after I apply to community college? How do I register for classes?",
      "es": "¿Qué ocurre después de solicitar ingreso al community college? ¿Cómo me inscribo?"
    },
    "answer": {
      "en": "After applying, check your college's **new-student enrollment instructions** and student account. Common steps include orientation, placement or assessment, counseling, an education plan and class registration. Each college has its own deadlines and requirements. If you plan to transfer to a CSU or UC, verify major-specific coursework with a counselor and **ASSIST** before selecting classes.",
      "es": "Después de solicitar ingreso, revise su cuenta y las instrucciones para estudiantes nuevos. Los pasos habituales incluyen orientación, evaluación académica, consejería, plan educativo e inscripción. Las fechas varían por institución. Si planea transferirse a CSU o UC, revise los cursos con un consejero y **ASSIST**."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Community Colleges — Student FAQs",
          "es": "California Community Colleges — Student FAQs"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/Students/student-faq/"
      },
      {
        "label": {
          "en": "California Community Colleges — Find Your Path",
          "es": "California Community Colleges — Find Your Path"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://icangotocollege.com/"
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
        "en": "Create an enrollment checklist",
        "es": "Prepare una lista de inscripción"
      },
      "detail": {
        "en": "Open your chosen college's new-student checklist and write down remaining orientation, counseling and registration tasks and dates.",
        "es": "Abra la lista de requisitos de su institución y anote los pasos de orientación, consejería e inscripción."
      },
      "actions": [
        {
          "id": "ew-open-s4",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.cccco.edu/Students/student-faq/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-support-classes",
      "ans-ew-support-transfer",
      "ans-ew-s5"
    ]
  },
  {
    "id": "ans-ew-s5",
    "topic": "college",
    "question": {
      "en": "Can I take college classes while I'm still in high school?",
      "es": "¿Puedo tomar clases universitarias mientras estoy en la preparatoria?"
    },
    "answer": {
      "en": "Yes! Eligible high school students may take community college courses through **dual or concurrent enrollment**. Depending on the partnership and course, tuition may be reduced or waived. These are real college courses and grades become part of your college record. Ask your high school and college counselors about permissions, fees, course workload and how a class might count toward your future degree or CSU/UC transfer goals.",
      "es": "¡Sí! Estudiantes de preparatoria elegibles pueden tomar cursos en community college mediante **inscripción dual o concurrente**. Según el programa, las cuotas podrían reducirse o eximirse. Son cursos universitarios reales y las calificaciones quedan en su expediente. Pregunte sobre permisos, costos y cómo los créditos cuentan para un título o transferencia."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Community Colleges — Dual Enrollment",
          "es": "California Community Colleges — Dual Enrollment"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/About-Us/Chancellors-Office/Divisions/Educational-Services-and-Support/What-we-do/Dual-Enrollment/"
      },
      {
        "label": {
          "en": "California Community Colleges — Student FAQs",
          "es": "California Community Colleges — Student FAQs"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/Students/student-faq/"
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
        "en": "Check dual enrollment and future credits",
        "es": "Revise créditos de inscripción dual"
      },
      "detail": {
        "en": "Ask your counselor about two available dual-enrollment courses. Confirm their costs, transcript impact and potential transfer application before registering.",
        "es": "Pregunte por dos cursos de inscripción dual y confirme costos, expediente y posibles créditos de transferencia."
      },
      "actions": [
        {
          "id": "ew-open-s5",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.cccco.edu/About-Us/Chancellors-Office/Divisions/Educational-Services-and-Support/What-we-do/Dual-Enrollment/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-support-transfer",
      "ans-ew-support-withdraw",
      "ans-ew-s4"
    ]
  },
  {
    "id": "ans-ew-s6",
    "topic": "college",
    "question": {
      "en": "Can I work while attending college and still receive financial aid?",
      "es": "¿Puedo trabajar mientras estudio y seguir recibiendo ayuda financiera?"
    },
    "answer": {
      "en": "Yes. Having a job does not automatically make you ineligible for financial aid. Eligibility and award amounts vary by aid type, financial information and how many units you take. Eligible students may also consider **Federal Work-Study**, a part-time paid employment program. If you plan to reduce your class load to work more hours, ask the financial-aid office how that affects your specific aid before changing enrollment.",
      "es": "Sí. Trabajar no le descalifica automáticamente para ayuda financiera. Los montos dependen del tipo de ayuda, sus ingresos y las unidades cursadas. Algunos estudiantes califican para **Federal Work-Study**, un programa de empleo remunerado a tiempo parcial. Consulte con ayuda financiera antes de reducir sus clases."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid / FAFSA",
          "es": "Federal Student Aid / FAFSA"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://studentaid.gov/"
      },
      {
        "label": {
          "en": "Federal Student Aid — Work-Study",
          "es": "Federal Student Aid — Work-Study"
        },
        "source": {
          "en": "Federal Student Aid",
          "es": "Federal Student Aid"
        },
        "url": "https://studentaid.gov/articles/8-things-federal-work-study/"
      },
      {
        "label": {
          "en": "California Student Aid Commission",
          "es": "California Student Aid Commission"
        },
        "source": {
          "en": "CSAC",
          "es": "CSAC"
        },
        "url": "https://www.csac.ca.gov/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Check financial aid before changing course load",
        "es": "Consulte la ayuda antes de reducir clases"
      },
      "detail": {
        "en": "Compare full-time and part-time class schedules with your likely work hours and request a financial-aid estimate for each.",
        "es": "Compare horarios de estudio con su trabajo y pida un cálculo de ayuda financiera para cada opción."
      },
      "actions": [
        {
          "id": "ew-open-s6",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://studentaid.gov/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-support-parttime",
      "ans-ew-support-workstudy",
      "ans-ew-s3"
    ]
  },
  {
    "id": "ans-ew-d1",
    "topic": "work",
    "question": {
      "en": "I recently lost my manufacturing job. Are there training programs that could help me get hired again?",
      "es": "Perdí mi empleo en manufactura. ¿Hay capacitación que me ayude a encontrar trabajo?"
    },
    "answer": {
      "en": "Yes. Your experience may translate to advanced manufacturing, semiconductor production, equipment maintenance and other technical roles. **California community colleges** and workforce centers offer career certificates and training. **Tesla's Manufacturing Development Program (MDP)** is one employer-college example, but it is designed for graduating high school seniors and early-career professionals; at 45, **confirm eligibility rather than assuming you qualify**. Compare other manufacturing and semiconductor programs, including regional college academies such as Ohlone's SSBA, and talk to a workforce adviser about programs suited to experienced workers.",
      "es": "Sí. Su experiencia puede servir para manufactura avanzada, semiconductores y mantenimiento técnico. Los colegios comunitarios y centros laborales ofrecen capacitación. **Tesla MDP** es un ejemplo de alianza con instituciones educativas, pero se dirige principalmente a recién graduados y profesionales al comienzo de su carrera; **confirme si cumple sus requisitos**. Compare otras academias, certificados y servicios laborales para adultos con experiencia."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Tesla — Manufacturing Development Program",
          "es": "Tesla — Manufacturing Development Program"
        },
        "source": {
          "en": "Tesla",
          "es": "Tesla"
        },
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      },
      {
        "label": {
          "en": "Semiconductor Skills Bridge Academy — local example",
          "es": "Semiconductor Skills Bridge Academy — local example"
        },
        "source": {
          "en": "Ohlone College",
          "es": "Ohlone College"
        },
        "url": "https://www.ohlone.edu/ssba"
      },
      {
        "label": {
          "en": "California EDD — eligible training programs",
          "es": "California EDD — eligible training programs"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/TrainingPrograms"
      },
      {
        "label": {
          "en": "NOVAworks — regional workforce services",
          "es": "NOVAworks — regional workforce services"
        },
        "source": {
          "en": "NOVAworks",
          "es": "NOVAworks"
        },
        "url": "https://novaworks.org/career-seekers/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Compare two suitable training programs",
        "es": "Compare dos programas de capacitación"
      },
      "detail": {
        "en": "Compare two training options for adult eligibility, cost, schedule and actual job connections; check written program terms before relying on employment claims.",
        "es": "Compare dos programas según requisitos para adultos, costo, horario y conexiones laborales; confirme sus condiciones por escrito."
      },
      "actions": [
        {
          "id": "ew-open-d1",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.tesla.com/careers/manufacturing-development-program"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-support-employer",
      "ans-ew-d5",
      "ans-ew-d7"
    ]
  },
  {
    "id": "ans-ew-d2",
    "topic": "work",
    "question": {
      "en": "I want to learn new technical skills. Where should I start?",
      "es": "Quiero aprender nuevas habilidades técnicas. ¿Por dónde empiezo?"
    },
    "answer": {
      "en": "Start with skills you already have: equipment operation, troubleshooting, quality checks, production and teamwork may transfer to other jobs. Use **CareerOneStop's Skills Matcher** and the **Bureau of Labor Statistics Occupational Outlook Handbook** to explore related occupations. Then compare community college certificates or workforce courses by prerequisites, duration, flexibility, cost and the actual jobs they prepare you for.",
      "es": "Empiece con sus habilidades actuales: equipos, resolución de problemas, calidad, producción y trabajo en equipo. Use **Skills Matcher de CareerOneStop** y el **Manual de perspectivas ocupacionales del BLS** para explorar empleos. Compare certificados y cursos por requisitos, duración, horario, costo y posibles trabajos."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "CareerOneStop — Skills Matcher",
          "es": "CareerOneStop — Skills Matcher"
        },
        "source": {
          "en": "U.S. Department of Labor",
          "es": "U.S. Department of Labor"
        },
        "url": "https://www.careeronestop.org/toolkit/Skills/skills-matcher.aspx"
      },
      {
        "label": {
          "en": "Occupational Outlook Handbook",
          "es": "Occupational Outlook Handbook"
        },
        "source": {
          "en": "Bureau of Labor Statistics",
          "es": "Bureau of Labor Statistics"
        },
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "label": {
          "en": "California Community Colleges — Find Your Path",
          "es": "California Community Colleges — Find Your Path"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://icangotocollege.com/"
      },
      {
        "label": {
          "en": "NOVAworks — regional workforce services",
          "es": "NOVAworks — regional workforce services"
        },
        "source": {
          "en": "NOVAworks",
          "es": "NOVAworks"
        },
        "url": "https://novaworks.org/career-seekers/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Match your existing skills to new careers",
        "es": "Relacione sus habilidades con nuevas carreras"
      },
      "detail": {
        "en": "Write down three tasks you performed at work, identify two related occupations, and compare their required training.",
        "es": "Anote tres tareas de su empleo, identifique dos ocupaciones relacionadas y compare la capacitación necesaria."
      },
      "actions": [
        {
          "id": "ew-open-d2",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.careeronestop.org/toolkit/Skills/skills-matcher.aspx"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d6",
      "ans-ew-support-shortcert",
      "ans-ew-d1"
    ]
  },
  {
    "id": "ans-ew-d3",
    "topic": "work",
    "question": {
      "en": "I'm 45 and haven't attended school in years. Can I still go back?",
      "es": "Tengo 45 años y hace mucho que no estudio. ¿Puedo regresar?"
    },
    "answer": {
      "en": "Yes! California community colleges do not have a general upper age limit. You can explore certificates, associate degrees, noncredit classes and other career training without committing to a full degree. Ask whether previous coursework can transfer and whether relevant professional experience might qualify for **Credit for Prior Learning (CPL)**. A counselor can help compare schedules and enrollment requirements.",
      "es": "¡Sí! Los colegios comunitarios de California no tienen un límite general de edad máxima. Puede estudiar certificados, títulos, cursos sin crédito y capacitación. Pregunte si cuentan sus cursos anteriores o si su experiencia califica para **Crédito por Aprendizaje Previo (CPL)**. Un consejero puede ayudarle con horarios y requisitos."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Community Colleges — Find Your Path",
          "es": "California Community Colleges — Find Your Path"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://icangotocollege.com/"
      },
      {
        "label": {
          "en": "California Community Colleges — Student FAQs",
          "es": "California Community Colleges — Student FAQs"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/Students/student-faq/"
      },
      {
        "label": {
          "en": "Credit for Prior Learning — student FAQs",
          "es": "Credit for Prior Learning — student FAQs"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/Students/student-faq/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Check steps for returning to college",
        "es": "Revise los pasos para regresar a estudiar"
      },
      "detail": {
        "en": "Pick one program, gather old transcripts if available, and ask the college about re-entry and prior-credit evaluation.",
        "es": "Elija un programa, reúna expedientes previos y pregunte por los pasos de retorno y evaluación de créditos."
      },
      "actions": [
        {
          "id": "ew-open-d3",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://icangotocollege.com/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d6",
      "ans-ew-d4",
      "ans-work-evening-classes"
    ]
  },
  {
    "id": "ans-ew-d4",
    "topic": "work",
    "question": {
      "en": "Are there scholarships or grants for adults returning to college or career training?",
      "es": "¿Hay becas o subvenciones para adultos que regresan a estudiar o capacitarse?"
    },
    "answer": {
      "en": "Yes. **Silicon Valley Community Foundation** lists re-entry, nontraditional and vocational awards; **Scholarship America** offers individual applications, while **BigFuture** is a directory of other organizations' scholarships. Review each award's age, school and certificate eligibility. Depending on your prior education and program, you may qualify for a **federal Pell Grant**. If you've been laid off, ask an **America's Job Center** about possible **WIOA** funding, which is a separate program—not a scholarship. Not all awards cover short-term or noncredit training.",
      "es": "Sí. **Silicon Valley Community Foundation** incluye becas para estudiantes de reingreso y educación vocacional; **Scholarship America** muestra solicitudes y **BigFuture** es un directorio de otras becas. Revise requisitos de edad, institución y certificados. Podría calificar para **Pell Grant** o ayuda de **WIOA** según su situación; son apoyos diferentes. No todas las becas cubren cursos cortos o sin crédito."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Silicon Valley Community Foundation — find scholarships",
          "es": "Silicon Valley Community Foundation — find scholarships"
        },
        "source": {
          "en": "Silicon Valley Community Foundation",
          "es": "Silicon Valley Community Foundation"
        },
        "url": "https://www.svcf.org/scholarships/find-scholarships"
      },
      {
        "label": {
          "en": "Scholarship America — browse applications",
          "es": "Scholarship America — browse applications"
        },
        "source": {
          "en": "Scholarship America",
          "es": "Scholarship America"
        },
        "url": "https://scholarshipamerica.org/students/browse-scholarships/"
      },
      {
        "label": {
          "en": "BigFuture Scholarship Directory",
          "es": "BigFuture Scholarship Directory"
        },
        "source": {
          "en": "College Board",
          "es": "College Board"
        },
        "url": "https://bigfuture.collegeboard.org/pay-for-college/scholarship-directory"
      },
      {
        "label": {
          "en": "Federal Pell Grant information",
          "es": "Federal Pell Grant information"
        },
        "source": {
          "en": "Federal Student Aid",
          "es": "Federal Student Aid"
        },
        "url": "https://studentaid.gov/understand-aid/types/grants/pell"
      },
      {
        "label": {
          "en": "WIOA training assistance",
          "es": "WIOA training assistance"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/en/Jobs_and_Training/Workforce_Innovation_and_Opportunity_Act/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Find two returning-adult scholarships",
        "es": "Encuentre dos becas para adultos"
      },
      "detail": {
        "en": "Identify two scholarships for returning adults, verify that your exact program qualifies, and save application deadlines.",
        "es": "Identifique dos becas para adultos, confirme que cubran su programa y anote las fechas límite."
      },
      "actions": [
        {
          "id": "ew-open-d4",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.svcf.org/scholarships/find-scholarships"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-support-pell",
      "ans-ew-support-wioa",
      "ans-ew-support-scholar-costs"
    ]
  },
  {
    "id": "ans-ew-d5",
    "topic": "work",
    "question": {
      "en": "Are there free or low-cost training programs available?",
      "es": "¿Existen programas de capacitación gratuitos o de bajo costo?"
    },
    "answer": {
      "en": "Possibly. Community colleges may offer low-cost certificates or noncredit courses; workforce centers can discuss available training assistance. If you're pursuing an eligible certificate or degree, explore scholarships through **Scholarship America** and **Silicon Valley Community Foundation**, as well as federal aid. **WIOA** may help with approved training if you qualify, but funding and no-cost enrollment are not guaranteed. Confirm tuition, tools, books, travel costs, schedules and program eligibility before enrolling.",
      "es": "Es posible. Los colegios comunitarios ofrecen algunos certificados económicos y cursos sin crédito. Los centros laborales pueden orientar sobre ayuda para capacitación. Si estudia un programa elegible, busque becas en **Scholarship America** y **Silicon Valley Community Foundation** y consulte ayuda federal o **WIOA**. La gratuidad no está garantizada: confirme cuotas, libros, herramientas, transporte y requisitos."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Community Colleges — Find Your Path",
          "es": "California Community Colleges — Find Your Path"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://icangotocollege.com/"
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
          "en": "Scholarship America — browse applications",
          "es": "Scholarship America — browse applications"
        },
        "source": {
          "en": "Scholarship America",
          "es": "Scholarship America"
        },
        "url": "https://scholarshipamerica.org/students/browse-scholarships/"
      },
      {
        "label": {
          "en": "Silicon Valley Community Foundation — find scholarships",
          "es": "Silicon Valley Community Foundation — find scholarships"
        },
        "source": {
          "en": "Silicon Valley Community Foundation",
          "es": "Silicon Valley Community Foundation"
        },
        "url": "https://www.svcf.org/scholarships/find-scholarships"
      },
      {
        "label": {
          "en": "WIOA training assistance",
          "es": "WIOA training assistance"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/en/Jobs_and_Training/Workforce_Innovation_and_Opportunity_Act/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Calculate the full costs of training",
        "es": "Calcule el costo total de capacitación"
      },
      "detail": {
        "en": "Compare two programs using total costs—tuition, fees, tools, books, transportation—and all funding you may qualify for.",
        "es": "Compare dos programas por costo total: matrícula, cuotas, herramientas, libros, transporte y posibles ayudas."
      },
      "actions": [
        {
          "id": "ew-open-d5",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://icangotocollege.com/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d4",
      "ans-ew-support-wioa",
      "ans-ew-d2"
    ]
  },
  {
    "id": "ans-ew-d6",
    "topic": "work",
    "question": {
      "en": "Can I get college credit for skills I learned at work?",
      "es": "¿Puedo obtener créditos universitarios por habilidades que aprendí trabajando?"
    },
    "answer": {
      "en": "Possibly. **Credit for Prior Learning (CPL)** lets participating California community colleges assess college-level skills learned through employment, apprenticeships, certifications or other experience. Schools may use examinations, portfolios or recognized credentials. Years worked alone do not guarantee credit, and any award may affect your degree or transfer plan. Ask a counselor or CPL coordinator how your college evaluates specific courses.",
      "es": "Posiblemente. El **Crédito por Aprendizaje Previo (CPL)** permite evaluar conocimientos adquiridos en trabajos, aprendizaje laboral o certificaciones. El colegio puede usar exámenes, portafolios o credenciales. Los años trabajados no garantizan créditos; consulte con un consejero cómo afectan su programa."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Credit for Prior Learning — student FAQs",
          "es": "Credit for Prior Learning — student FAQs"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/Students/student-faq/"
      },
      {
        "label": {
          "en": "California Community Colleges — Student FAQs",
          "es": "California Community Colleges — Student FAQs"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/Students/student-faq/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Prepare a Credit for Prior Learning review",
        "es": "Prepare la evaluación de experiencia previa"
      },
      "detail": {
        "en": "Gather relevant employment training records and certifications. Ask which specific courses offer CPL and how credits would apply to your goal.",
        "es": "Reúna certificados y registros de capacitación. Pregunte qué materias aceptan CPL y cómo se aplicarían a su programa."
      },
      "actions": [
        {
          "id": "ew-open-d6",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.cccco.edu/Students/student-faq/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-support-cpl-evidence",
      "ans-ew-d3",
      "ans-ew-d2"
    ]
  },
  {
    "id": "ans-ew-d7",
    "topic": "work",
    "question": {
      "en": "I need a job right away. Where can I get help before I enroll in training?",
      "es": "Necesito trabajo pronto. ¿Dónde consigo ayuda antes de inscribirme a cursos?"
    },
    "answer": {
      "en": "You **don't have to enroll in training first**. America's Job Center of California locations and regional organizations offer job-search services, résumé support, interview workshops and career advising. **NOVAworks** is one regional example for parts of Silicon Valley; a different center may serve your city. Begin looking for work now and consider training later if it matches your needs.",
      "es": "**No necesita inscribirse en capacitación primero**. Los centros America's Job Center of California y organizaciones regionales ofrecen búsqueda de empleo, ayuda con currículum, entrevistas y orientación laboral. **NOVAworks** es un ejemplo regional; otro centro puede servir a su ciudad. Busque trabajo ahora y explore capacitación después si le conviene."
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
          "en": "California EDD — Job-seeker resources",
          "es": "California EDD — Job-seeker resources"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/en/jobs_and_training/Resources_for_Job_Seekers/"
      },
      {
        "label": {
          "en": "NOVAworks — regional workforce services",
          "es": "NOVAworks — regional workforce services"
        },
        "source": {
          "en": "NOVAworks",
          "es": "NOVAworks"
        },
        "url": "https://novaworks.org/career-seekers/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Find your local job center",
        "es": "Busque su centro de empleo local"
      },
      "detail": {
        "en": "Use the American Job Center locator for your ZIP code, then choose a résumé or job-search workshop. Bring a summary of your recent work.",
        "es": "Busque un centro laboral por código postal, elija un taller de currículum o empleo y lleve un resumen de su experiencia."
      },
      "actions": [
        {
          "id": "ew-open-d7",
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
      "ans-ew-support-ajcc",
      "ans-ew-support-resume",
      "ans-ew-d8"
    ]
  },
  {
    "id": "ans-ew-d8",
    "topic": "work",
    "question": {
      "en": "If I return to school for training, what happens to my unemployment benefits?",
      "es": "Si regreso a estudiar o capacitarme, ¿qué pasa con el desempleo?"
    },
    "answer": {
      "en": "School or training **does not automatically end your unemployment benefits**. California Training Benefits (CTB) may let eligible people continue receiving unemployment insurance while completing approved training. **Report your training to EDD in the week it begins.** Ask EDD whether training-extension rules apply; the **before-week-16 notification** is specifically for potential extensions, not a universal deadline to report training. CTB **does not pay tuition, books or supplies**. EDD determines eligibility.",
      "es": "Estudiar **no termina automáticamente los beneficios de desempleo**. **California Training Benefits (CTB)** puede permitir continuar con beneficios durante capacitación aprobada. **Informe al EDD la semana en que inicia**. La regla de avisar antes de la semana 16 corresponde a posibles extensiones, no a todo aviso de capacitación. CTB **no paga matrícula, libros ni materiales**. EDD decide elegibilidad."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Training Benefits",
          "es": "California Training Benefits"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/CTB/"
      },
      {
        "label": {
          "en": "How to report school or training",
          "es": "How to report school or training"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/en/unemployment/how_to_report_school_or_training/"
      },
      {
        "label": {
          "en": "WIOA training assistance",
          "es": "WIOA training assistance"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/en/Jobs_and_Training/Workforce_Innovation_and_Opportunity_Act/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Report training and review CTB eligibility",
        "es": "Informe la capacitación y revise CTB"
      },
      "detail": {
        "en": "Check CTB requirements before training begins and report school to EDD in the starting week. Ask if the extension timing rule applies to your claim.",
        "es": "Revise CTB antes de empezar y reporte los estudios al EDD en la semana inicial. Pregunte por plazos de extensión según su caso."
      },
      "actions": [
        {
          "id": "ew-open-d8",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://edd.ca.gov/CTB/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-support-reportedd",
      "ans-ew-d4",
      "ans-ew-support-ctb-search"
    ]
  },
  {
    "id": "ans-ew-support-classes",
    "topic": "college",
    "question": {
      "en": "Who can help me choose my classes?",
      "es": "¿Quién me ayuda a elegir clases?"
    },
    "answer": {
      "en": "Ask a college academic counselor about a course plan, your intended major and transfer requirements. Counseling is generally available even without EOPS or EOP eligibility.",
      "es": "Pida a un consejero académico ayuda con su especialidad, plan educativo y transferencia. Puede recibir consejería aunque no califique para EOPS o EOP."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Community Colleges — Find Your Path",
          "es": "California Community Colleges — Find Your Path"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://icangotocollege.com/"
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
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-classes",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://icangotocollege.com/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-s4",
      "ans-ew-s1"
    ]
  },
  {
    "id": "ans-ew-support-transfer",
    "topic": "college",
    "question": {
      "en": "Can I receive extra support if I transfer to a university?",
      "es": "¿Puedo recibir apoyo adicional si me transfiero a una universidad?"
    },
    "answer": {
      "en": "Yes. CSU and UC campuses have EOP or comparable services with their own application rules. Participation in community-college EOPS does not automatically transfer eligibility to university EOP. Ask the receiving campus about deadlines and transfer-student services.",
      "es": "Sí. Los campus CSU y UC tienen EOP u otros servicios con solicitudes propias. EOPS en community college no garantiza entrada a EOP universitario. Consulte al campus receptor."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "CSU Educational Opportunity Program",
          "es": "CSU Educational Opportunity Program"
        },
        "source": {
          "en": "California State University",
          "es": "California State University"
        },
        "url": "https://www.calstate.edu/attend/student-services/eop"
      },
      {
        "label": {
          "en": "UC Educational Opportunity Program",
          "es": "UC Educational Opportunity Program"
        },
        "source": {
          "en": "University of California",
          "es": "University of California"
        },
        "url": "https://admission.universityofcalifornia.edu/campuses-majors/campus-programs-and-support-services/educational-opportunity-program-eop.html"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-transfer",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.calstate.edu/attend/student-services/eop"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-s1",
      "ans-ew-s4"
    ]
  },
  {
    "id": "ans-ew-support-supplies",
    "topic": "college",
    "question": {
      "en": "Are there programs that help with textbooks and supplies?",
      "es": "¿Hay programas que ayudan con libros y materiales?"
    },
    "answer": {
      "en": "Yes, some scholarships and financial aid can support eligible educational expenses. Community-college EOPS may offer textbook support for qualifying participants. Check your college's aid office and each award's permitted costs; fee waivers usually do not cover everything.",
      "es": "Sí, ciertas becas y ayudas cubren gastos educativos. EOPS puede ofrecer apoyo con libros a estudiantes elegibles. Pregunte en ayuda financiera y confirme qué cubre cada programa."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Community Colleges — EOPS",
          "es": "California Community Colleges — EOPS"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/"
      },
      {
        "label": {
          "en": "California Student Aid Commission",
          "es": "California Student Aid Commission"
        },
        "source": {
          "en": "CSAC",
          "es": "CSAC"
        },
        "url": "https://www.csac.ca.gov/"
      },
      {
        "label": {
          "en": "Silicon Valley Community Foundation — find scholarships",
          "es": "Silicon Valley Community Foundation — find scholarships"
        },
        "source": {
          "en": "Silicon Valley Community Foundation",
          "es": "Silicon Valley Community Foundation"
        },
        "url": "https://www.svcf.org/scholarships/find-scholarships"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-supplies",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.cccco.edu/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-s3",
      "ans-ew-s2"
    ]
  },
  {
    "id": "ans-ew-support-firstgen-scholar",
    "topic": "college",
    "question": {
      "en": "Are there scholarships for first-generation college students?",
      "es": "¿Hay becas para estudiantes universitarios de primera generación?"
    },
    "answer": {
      "en": "Yes. Check Silicon Valley Community Foundation's scholarship filters and Scholarship America's individual applications. Some awards consider first-generation status, financial need, intended school or other factors; confirm each requirement.",
      "es": "Sí. Revise las becas de Silicon Valley Community Foundation y Scholarship America. Algunas consideran ser primera generación, necesidad económica y otras condiciones."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Silicon Valley Community Foundation — find scholarships",
          "es": "Silicon Valley Community Foundation — find scholarships"
        },
        "source": {
          "en": "Silicon Valley Community Foundation",
          "es": "Silicon Valley Community Foundation"
        },
        "url": "https://www.svcf.org/scholarships/find-scholarships"
      },
      {
        "label": {
          "en": "Scholarship America — browse applications",
          "es": "Scholarship America — browse applications"
        },
        "source": {
          "en": "Scholarship America",
          "es": "Scholarship America"
        },
        "url": "https://scholarshipamerica.org/students/browse-scholarships/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-firstgen-scholar",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.svcf.org/scholarships/find-scholarships"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-s3"
    ]
  },
  {
    "id": "ans-ew-support-highschool-scholar",
    "topic": "college",
    "question": {
      "en": "Can I apply for scholarships while I'm still in high school?",
      "es": "¿Puedo solicitar becas mientras estoy en preparatoria?"
    },
    "answer": {
      "en": "Yes. Many awards accept graduating seniors. Use the Silicon Valley Community Foundation high-school filter and check Live Más eligibility if your age and circumstances fit. Follow each award's deadline and instructions.",
      "es": "Sí. Muchas becas aceptan estudiantes que están por graduarse. Revise el filtro para preparatoria de SVCF y los requisitos de Live Más. Confirme cada fecha límite."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Silicon Valley Community Foundation — find scholarships",
          "es": "Silicon Valley Community Foundation — find scholarships"
        },
        "source": {
          "en": "Silicon Valley Community Foundation",
          "es": "Silicon Valley Community Foundation"
        },
        "url": "https://www.svcf.org/scholarships/find-scholarships"
      },
      {
        "label": {
          "en": "Live Más Scholarship eligibility",
          "es": "Live Más Scholarship eligibility"
        },
        "source": {
          "en": "Taco Bell Foundation",
          "es": "Taco Bell Foundation"
        },
        "url": "https://tacobellfoundation.org/live-mas-scholarship/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-highschool-scholar",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.svcf.org/scholarships/find-scholarships"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-s3",
      "ans-ew-s5"
    ]
  },
  {
    "id": "ans-ew-support-withdraw",
    "topic": "college",
    "question": {
      "en": "What happens if I fail or withdraw from a college course?",
      "es": "¿Qué ocurre si repruebo o me retiro de un curso universitario?"
    },
    "answer": {
      "en": "A college grade or withdrawal can appear on your permanent college transcript. It may affect academic standing or financial aid, and transfer institutions apply their own rules. Speak with your high-school counselor and college before dropping a dual-enrollment course.",
      "es": "Una calificación o retiro puede quedar en su expediente universitario y afectar ayuda o progreso académico. Consulte con consejeros antes de dejar un curso de inscripción dual."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Community Colleges — Student FAQs",
          "es": "California Community Colleges — Student FAQs"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/Students/student-faq/"
      },
      {
        "label": {
          "en": "California Community Colleges — Dual Enrollment",
          "es": "California Community Colleges — Dual Enrollment"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/About-Us/Chancellors-Office/Divisions/Educational-Services-and-Support/What-we-do/Dual-Enrollment/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-withdraw",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.cccco.edu/Students/student-faq/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-s5"
    ]
  },
  {
    "id": "ans-ew-support-parttime",
    "topic": "college",
    "question": {
      "en": "Can part-time students receive financial aid?",
      "es": "¿Los estudiantes a tiempo parcial pueden obtener ayuda financiera?"
    },
    "answer": {
      "en": "Often yes, but some awards require a minimum course load and the amount may change with enrollment intensity. Ask the college financial-aid office for a calculation based on your planned units.",
      "es": "En muchos casos sí, pero ciertas ayudas requieren una carga mínima y el monto puede cambiar. Consulte el cálculo de ayuda con la oficina financiera."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid / FAFSA",
          "es": "Federal Student Aid / FAFSA"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://studentaid.gov/"
      },
      {
        "label": {
          "en": "California Student Aid Commission",
          "es": "California Student Aid Commission"
        },
        "source": {
          "en": "CSAC",
          "es": "CSAC"
        },
        "url": "https://www.csac.ca.gov/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-parttime",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://studentaid.gov/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-s6"
    ]
  },
  {
    "id": "ans-ew-support-workstudy",
    "topic": "college",
    "question": {
      "en": "What is Federal Work-Study?",
      "es": "¿Qué es Federal Work-Study?"
    },
    "answer": {
      "en": "Federal Work-Study is a federal student-aid program that provides part-time paid employment to eligible students. A job is not automatic; review your aid offer and ask your college about open positions.",
      "es": "Federal Work-Study ofrece empleo remunerado a tiempo parcial a estudiantes elegibles. No garantiza un puesto; revise su ayuda y pregunte por vacantes."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Federal Student Aid — Work-Study",
          "es": "Federal Student Aid — Work-Study"
        },
        "source": {
          "en": "Federal Student Aid",
          "es": "Federal Student Aid"
        },
        "url": "https://studentaid.gov/articles/8-things-federal-work-study/"
      },
      {
        "label": {
          "en": "Federal Student Aid / FAFSA",
          "es": "Federal Student Aid / FAFSA"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://studentaid.gov/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-workstudy",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://studentaid.gov/articles/8-things-federal-work-study/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-s6"
    ]
  },
  {
    "id": "ans-ew-support-employer",
    "topic": "work",
    "question": {
      "en": "Are there programs where training could lead to employment?",
      "es": "¿Hay programas de capacitación conectados con empleo?"
    },
    "answer": {
      "en": "Some employer-college programs connect training to possible jobs, but no training program should be described as a guaranteed offer. Tesla MDP is an example with an early-career target; check current age/experience eligibility and compare other regional employer partnerships.",
      "es": "Algunas alianzas entre empresas y colegios conectan capacitación con posibles empleos, sin garantizar ofertas. Tesla MDP se enfoca en carreras iniciales; confirme requisitos y compare alternativas."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Tesla — Manufacturing Development Program",
          "es": "Tesla — Manufacturing Development Program"
        },
        "source": {
          "en": "Tesla",
          "es": "Tesla"
        },
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      },
      {
        "label": {
          "en": "California EDD — eligible training programs",
          "es": "California EDD — eligible training programs"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/TrainingPrograms"
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
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-employer",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.tesla.com/careers/manufacturing-development-program"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d1",
      "ans-ew-d7"
    ]
  },
  {
    "id": "ans-ew-support-shortcert",
    "topic": "work",
    "question": {
      "en": "Are there short-term technical certificates?",
      "es": "¿Existen certificados técnicos de corta duración?"
    },
    "answer": {
      "en": "Yes. Community colleges and training providers offer certificates of different lengths, as well as noncredit options. Compare completion time, program prerequisites, total costs and whether financial aid applies before deciding.",
      "es": "Sí. Hay certificados de distinta duración y opciones sin crédito. Compare tiempo, requisitos, costos y elegibilidad para ayuda."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Community Colleges — Find Your Path",
          "es": "California Community Colleges — Find Your Path"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://icangotocollege.com/"
      },
      {
        "label": {
          "en": "California EDD — eligible training programs",
          "es": "California EDD — eligible training programs"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/TrainingPrograms"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-shortcert",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://icangotocollege.com/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d2",
      "ans-ew-d5"
    ]
  },
  {
    "id": "ans-ew-support-pell",
    "topic": "work",
    "question": {
      "en": "Can I receive a Pell Grant at 45?",
      "es": "¿Puedo recibir Pell Grant a los 45 años?"
    },
    "answer": {
      "en": "Age alone does not disqualify you from a Federal Pell Grant. Eligibility depends on factors such as financial need, prior degrees, enrollment and the specific program's federal-aid eligibility. Ask the school's financial-aid office to review your circumstances.",
      "es": "La edad por sí sola no impide recibir Pell Grant. Depende de necesidad económica, títulos previos, matrícula y elegibilidad del programa. Consulte ayuda financiera."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Federal Pell Grant information",
          "es": "Federal Pell Grant information"
        },
        "source": {
          "en": "Federal Student Aid",
          "es": "Federal Student Aid"
        },
        "url": "https://studentaid.gov/understand-aid/types/grants/pell"
      },
      {
        "label": {
          "en": "Federal Student Aid / FAFSA",
          "es": "Federal Student Aid / FAFSA"
        },
        "source": {
          "en": "U.S. Department of Education",
          "es": "U.S. Department of Education"
        },
        "url": "https://studentaid.gov/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-pell",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://studentaid.gov/understand-aid/types/grants/pell"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d4"
    ]
  },
  {
    "id": "ans-ew-support-wioa",
    "topic": "work",
    "question": {
      "en": "Can workforce funding help pay for my certificate?",
      "es": "¿Puede WIOA ayudar a pagar mi certificado?"
    },
    "answer": {
      "en": "Possibly. An American Job Center career planner can explain eligibility, approved training providers and funding availability under WIOA. Do not assume every certificate or applicant qualifies.",
      "es": "Posiblemente. Un asesor de centro laboral puede explicar requisitos, proveedores aprobados y fondos WIOA. No todos los certificados o personas califican."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "WIOA training assistance",
          "es": "WIOA training assistance"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/en/Jobs_and_Training/Workforce_Innovation_and_Opportunity_Act/"
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
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-wioa",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://edd.ca.gov/en/Jobs_and_Training/Workforce_Innovation_and_Opportunity_Act/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d4",
      "ans-ew-d5"
    ]
  },
  {
    "id": "ans-ew-support-scholar-costs",
    "topic": "work",
    "question": {
      "en": "Do scholarships cover books or tools?",
      "es": "¿Las becas cubren libros o herramientas?"
    },
    "answer": {
      "en": "Some awards allow eligible books, tools or supplies and others only cover certain school expenses. Check the scholarship's permitted uses and your chosen program's costs before relying on the award.",
      "es": "Algunas becas cubren libros, herramientas o materiales; otras tienen restricciones. Revise las condiciones y gastos del programa."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Silicon Valley Community Foundation — find scholarships",
          "es": "Silicon Valley Community Foundation — find scholarships"
        },
        "source": {
          "en": "Silicon Valley Community Foundation",
          "es": "Silicon Valley Community Foundation"
        },
        "url": "https://www.svcf.org/scholarships/find-scholarships"
      },
      {
        "label": {
          "en": "Scholarship America — browse applications",
          "es": "Scholarship America — browse applications"
        },
        "source": {
          "en": "Scholarship America",
          "es": "Scholarship America"
        },
        "url": "https://scholarshipamerica.org/students/browse-scholarships/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-scholar-costs",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.svcf.org/scholarships/find-scholarships"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d4"
    ]
  },
  {
    "id": "ans-ew-support-cpl-evidence",
    "topic": "work",
    "question": {
      "en": "What records could demonstrate my work experience?",
      "es": "¿Qué documentos pueden demostrar mi experiencia laboral?"
    },
    "answer": {
      "en": "Gather industry certifications, apprenticeship completion papers, employer training records, portfolios and any prior college transcripts. Ask the college which forms of evidence it accepts for a specific CPL evaluation.",
      "es": "Reúna certificaciones, constancias de aprendizaje, registros de capacitación, portafolios y expedientes. Consulte qué pruebas acepta el colegio para CPL."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "Credit for Prior Learning — student FAQs",
          "es": "Credit for Prior Learning — student FAQs"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/Students/student-faq/"
      },
      {
        "label": {
          "en": "California Community Colleges — Student FAQs",
          "es": "California Community Colleges — Student FAQs"
        },
        "source": {
          "en": "California Community Colleges",
          "es": "California Community Colleges"
        },
        "url": "https://www.cccco.edu/Students/student-faq/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-cpl-evidence",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://www.cccco.edu/Students/student-faq/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d6"
    ]
  },
  {
    "id": "ans-ew-support-ajcc",
    "topic": "work",
    "question": {
      "en": "Where is a workforce center near me?",
      "es": "¿Dónde hay un centro laboral cerca de mí?"
    },
    "answer": {
      "en": "Use the American Job Center locator and enter your city or ZIP code. The correct regional provider depends on where you live; NOVAworks is only one example in Silicon Valley.",
      "es": "Use el localizador American Job Center con su ciudad o código postal. La organización regional depende de dónde viva; NOVAworks es solo un ejemplo."
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
          "en": "California EDD — Job-seeker resources",
          "es": "California EDD — Job-seeker resources"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/en/jobs_and_training/Resources_for_Job_Seekers/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-ajcc",
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
      "ans-ew-d7"
    ]
  },
  {
    "id": "ans-ew-support-resume",
    "topic": "work",
    "question": {
      "en": "Can someone help update my résumé?",
      "es": "¿Alguien me puede ayudar con mi currículum?"
    },
    "answer": {
      "en": "Yes. America's Job Centers and regional workforce organizations may offer free résumé guidance, job-search workshops and interview practice. Find the provider serving your location before visiting.",
      "es": "Sí. Los centros laborales pueden ofrecer apoyo con currículum, entrevistas y búsqueda de empleo. Busque el centro de su zona."
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
          "en": "NOVAworks — regional workforce services",
          "es": "NOVAworks — regional workforce services"
        },
        "source": {
          "en": "NOVAworks",
          "es": "NOVAworks"
        },
        "url": "https://novaworks.org/career-seekers/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-resume",
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
      "ans-ew-d7"
    ]
  },
  {
    "id": "ans-ew-support-reportedd",
    "topic": "work",
    "question": {
      "en": "How do I report training to EDD?",
      "es": "¿Cómo informo al EDD que empezaré capacitación?"
    },
    "answer": {
      "en": "Report school or training during the week you begin attending when certifying for unemployment benefits, or follow EDD instructions when opening or reopening a claim. EDD decides CTB eligibility; reporting is not the same as approval.",
      "es": "Informe sus estudios al EDD la semana en que comienzan al certificar beneficios, o siga las instrucciones al abrir su solicitud. Informar no significa aprobación CTB."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "How to report school or training",
          "es": "How to report school or training"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/en/unemployment/how_to_report_school_or_training/"
      },
      {
        "label": {
          "en": "California Training Benefits",
          "es": "California Training Benefits"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/CTB/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-reportedd",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://edd.ca.gov/en/unemployment/how_to_report_school_or_training/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d8"
    ]
  },
  {
    "id": "ans-ew-support-ctb-search",
    "topic": "work",
    "question": {
      "en": "Do I still need to search for work while attending school?",
      "es": "¿Debo seguir buscando trabajo mientras estudio?"
    },
    "answer": {
      "en": "If EDD approves you for California Training Benefits, work-search and availability requirements may be waived during approved training. If not approved, you generally must meet the usual unemployment conditions. EDD decides for your claim.",
      "es": "Si EDD aprueba CTB, podrían eximirse ciertos requisitos de búsqueda y disponibilidad durante capacitación aprobada. Sin aprobación, siguen los requisitos habituales. EDD decide en su caso."
    },
    "context": [],
    "links": [
      {
        "label": {
          "en": "California Training Benefits",
          "es": "California Training Benefits"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/CTB/"
      },
      {
        "label": {
          "en": "How to report school or training",
          "es": "How to report school or training"
        },
        "source": {
          "en": "California EDD",
          "es": "California EDD"
        },
        "url": "https://edd.ca.gov/en/unemployment/how_to_report_school_or_training/"
      }
    ],
    "nextStep": {
      "title": {
        "en": "Verify the next step",
        "es": "Verifique el siguiente paso"
      },
      "detail": {
        "en": "Review the official guidance and ask the responsible organization to confirm current requirements.",
        "es": "Revise la información oficial y confirme los requisitos actuales con la organización."
      },
      "actions": [
        {
          "id": "ew-open-support-ctb-search",
          "kind": "open-link",
          "label": {
            "en": "Open official guidance",
            "es": "Abrir información oficial"
          },
          "url": "https://edd.ca.gov/CTB/"
        }
      ]
    },
    "followUpIds": [
      "ans-ew-d8"
    ]
  }
];

/** Conservative routing for common variations, after exact-match resolution. */
export const routeEducationWorkforceQuestion = (input: string): string | undefined => {
  const q = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  const rules: Array<[RegExp,string]> = [
    [/(first (person|one) in my family|first generation).*(college|school|support|help)/, 'ans-ew-s1'],
    [/(family.*(little|much|not much) money|afford college|pay for college)/, 'ans-ew-s2'],
    [/(money for college.*(pay back|repay)|scholarships? for (college|school)|scholarship applications?)/, 'ans-ew-s3'],
    [/(after i apply.*(community college|college)|register for (college )?classes)/, 'ans-ew-s4'],
    [/(college classes.*(high school|still in school)|dual enrollment)/, 'ans-ew-s5'],
    [/(work while.*(college|financial aid)|working.*financial aid)/, 'ans-ew-s6'],
    [/(lost.*manufacturing job.*(training|hired|retrain)|laid off.*manufacturing.*(program|training))/, 'ans-ew-d1'],
    [/(learn new technical skills|update my technical skills)/, 'ans-ew-d2'],
    [/(45.*(school|college)|haven t attended school in years|return to college after.*years)/, 'ans-ew-d3'],
    [/(scholarships? or grants? for adults|scholarships?.*(returning|adult|career training))/, 'ans-ew-d4'],
    [/(free or low cost training|affordable training programs?)/, 'ans-ew-d5'],
    [/(college credit for.*(skills|work|experience)|credit for prior learning)/, 'ans-ew-d6'],
    [/(job right away|find a job before.*training|job help before.*training)/, 'ans-ew-d7'],
    [/(unemployment benefits.*(training|school)|training.*unemployment benefits)/, 'ans-ew-d8'],
    // High-confidence paraphrases of the already reviewed Education & Workforce
    // follow-ups. Answer them directly, not through a generic tuition/job entry.
    [/(?:who|where|someone|counselor).*(?:help|advise).*(?:choose|pick|select).*(?:classes|courses)|(?:help|counselor).*(?:choose|pick|select).*(?:classes|courses)/, 'ans-ew-support-classes'],
    [/(?:extra support|eop|eops|support services).*(?:transfer|university)|(?:transfer|university).*(?:eop|eops|support services)/, 'ans-ew-support-transfer'],
    [/(?:textbooks?|books|supplies).*(?:help|aid|support|free|pay|afford)|(?:help|aid|support|free).*(?:textbooks?|books|supplies)/, 'ans-ew-support-supplies'],
    [/(?:scholarships?).*(?:first gen|first generation)|(?:first gen|first generation).*(?:scholarships?)/, 'ans-ew-support-firstgen-scholar'],
    [/(?:scholarships?).*(?:high school|graduating senior)|(?:high school|graduating senior).*(?:scholarships?)/, 'ans-ew-support-highschool-scholar'],
    [/(?:fail|failed|withdraw|drop).*(?:college |dual enrollment )?(?:class|course)|(?:college|dual enrollment).*(?:withdraw|drop|failed)/, 'ans-ew-support-withdraw'],
    [/(?:part time|parttime).*(?:financial aid|grants|student aid|pell)|(?:financial aid|grants|student aid|pell).*(?:part time|parttime)/, 'ans-ew-support-parttime'],
    [/(?:what is|how does|eligible for|apply for).*(?:federal )?work study|\bwork study\b/, 'ans-ew-support-workstudy'],
    [/(?:employer|company).*(?:training).*(?:job|hire|employment)|(?:training).*(?:lead to|result in).*(?:job|employment)/, 'ans-ew-support-employer'],
    [/(?:short term|short|technical).*(?:certificates?|credential|job training)|(?:certificate).*(?:how long|fast|short term)/, 'ans-ew-support-shortcert'],
    [/(?:pell grant).*(?:45|age|older|adult)|(?:45|age|older|adult).*(?:pell grant)/, 'ans-ew-support-pell'],
    [/(?:wioa|workforce funding|job center funding).*(?:pay|certificate|training|eligible|qualify)|(?:fund|pay).*(?:certificate|training).*(?:wioa|workforce)/, 'ans-ew-support-wioa'],
    [/(?:scholarships?).*(?:tools?|equipment)|(?:tools?|equipment).*(?:scholarships?)/, 'ans-ew-support-scholar-costs'],
    [/(?:documents?|records?|proof|evidence).*(?:work experience|prior learning|employment history)|(?:work experience).*(?:documents?|records?|proof|evidence)/, 'ans-ew-support-cpl-evidence'],
    [/(?:where|find|locate|near me).*(?:job center|workforce center|american job center)|(?:workforce|job) center.*(?:near|local)/, 'ans-ew-support-ajcc'],
    [/(?:help|review|update|write|improve).*(?:resume|cv)|(?:resume|cv).*(?:help|review|update)/, 'ans-ew-support-resume'],
    [/(?:edd).*(?:report|notify|tell).*(?:training|school|classes)|(?:report|notify|tell).*(?:training|school|classes).*(?:edd)/, 'ans-ew-support-reportedd'],
    [/(?:look|search).*(?:for )?(?:work|job).*(?:while|during).*(?:training|school|classes)|(?:while|during).*(?:training|school|classes).*(?:need to|have to).*(?:search|look).*(?:work|job)/, 'ans-ew-support-ctb-search'],
    [/(?:work|working|job).*(?:attend|taking|in).*(?:college|school|classes).*(?:financial aid|aid)|(?:financial aid|aid).*(?:while|and).*(?:working|work).*(?:college|school)/, 'ans-ew-s6'],
    [/(?:where|how).*(?:start|begin|find).*(?:new technical skills|technical training)|(?:learn|learning).*(?:technical|computer).*(?:skills)/, 'ans-ew-d2'],
    [/(?:free|low cost|affordable).*(?:job training|workforce training|career training)|(?:job training|workforce training).*(?:free|affordable|low cost)/, 'ans-ew-d5']
  ];
  return rules.find(([pattern])=>pattern.test(q))?.[1];
};
