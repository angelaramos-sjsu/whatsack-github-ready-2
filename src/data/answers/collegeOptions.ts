import type { ScriptedAnswer } from './types';

/**
 * Reviewed "I want to go to college" options prompt and the official places to
 * check application dates for California's three public systems (CCC, CSU, UC).
 * Dates and links were checked against the systems' own pages on November 16, 2026.
 * Nothing here determines eligibility or guarantees admission; always verify with
 * the college's admissions office.
 */
export const collegeOptionIds = {
  start: 'ans-college-options-start',
  ccc: 'ans-college-deadlines-ccc',
  csu: 'ans-college-deadlines-csu',
  uc: 'ans-college-deadlines-uc'
} as const;

export const collegeOptionAnswers: ScriptedAnswer[] = [
  {
    id: collegeOptionIds.start,
    topic: 'college',
    question: {
      en: 'I want to go to college. What are my options?',
      es: 'Quiero ir a la universidad. ¿Cuáles son mis opciones?'
    },
    answer: {
      en: `**California has three public college systems, and each one has its own application.** In short:

- **Community colleges (CCC)** — 115 colleges, open admission, certificates, associate degrees and transfer preparation. Apply through CCCApply/OpenCCC.
- **California State University (CSU)** — 22 campuses, one Cal State Apply application.
- **University of California (UC)** — nine undergraduate campuses, one UC application.

Private and out-of-state colleges each run their own application. **Which system would you like to look at?** I can show you the official page for its application dates and deadlines.`,
      es: `**California tiene tres sistemas públicos de educación superior y cada uno usa su propia solicitud.** En resumen:

- **Colegios comunitarios (CCC)** — 115 colegios, admisión abierta, certificados, títulos de asociado y preparación para transferirse. Se solicita por CCCApply/OpenCCC.
- **California State University (CSU)** — 22 campus, una sola solicitud de Cal State Apply.
- **University of California (UC)** — nueve campus de licenciatura, una sola solicitud de UC.

Las universidades privadas y las de otros estados tienen su propia solicitud. **¿Qué sistema le gustaría revisar?** Puedo mostrarle la página oficial con sus fechas y plazos de solicitud.`
    },
    context: [],
    followUpIds: [],
    pathwayChoices: [
      {
        id: 'college-choice-ccc',
        label: {
          en: 'Community college (CCC): dates & deadlines',
          es: 'Colegio comunitario (CCC): fechas y plazos'
        },
        answerId: collegeOptionIds.ccc
      },
      {
        id: 'college-choice-csu',
        label: {
          en: 'CSU: dates & deadlines',
          es: 'CSU: fechas y plazos'
        },
        answerId: collegeOptionIds.csu
      },
      {
        id: 'college-choice-uc',
        label: {
          en: 'UC: dates & deadlines',
          es: 'UC: fechas y plazos'
        },
        answerId: collegeOptionIds.uc
      },
      {
        id: 'college-choice-compare',
        label: {
          en: 'Compare the three systems',
          es: 'Comparar los tres sistemas'
        },
        answerId: 'ans-pathway-sofia-s2'
      },
      {
        id: 'college-choice-transfer',
        label: {
          en: 'Start at community college, then transfer',
          es: 'Empezar en un colegio comunitario y transferirme'
        },
        answerId: 'ans-sara-transfer'
      }
    ]
  },
  {
    id: collegeOptionIds.ccc,
    topic: 'college',
    question: {
      en: 'Where can I find application dates and deadlines for California community colleges (CCC)?',
      es: '¿Dónde encuentro las fechas y plazos de solicitud de los colegios comunitarios (CCC)?'
    },
    answer: {
      en: `**Community colleges (CCC).** There is no single statewide deadline: each of the 115 community colleges sets its own application period, and many accept applications close to the start of the term.

- **Where to apply:** one free CCCApply/OpenCCC account works for every college.
- **Where to check dates:** open the college on the California Community Colleges "Find a College" page, then use that college's own admissions and registration calendar. Selective programs such as nursing usually close much earlier than general admission.
- **Transferring later:** if you plan to finish at a UC or CSU, that system's deadline applies to the transfer application, not to the community college one.

Confirm the term, program and deadline with the college's admissions office.`,
      es: `**Colegios comunitarios (CCC).** No hay un solo plazo estatal: cada uno de los 115 colegios comunitarios fija su propio periodo de solicitud, y muchos aceptan solicitudes poco antes del inicio del semestre.

- **Dónde solicitar:** una cuenta gratuita de CCCApply/OpenCCC sirve para todos los colegios.
- **Dónde revisar las fechas:** abra el colegio en la página "Find a College" de California Community Colleges y luego use el calendario de admisiones y registro de ese colegio. Los programas selectivos, como enfermería, suelen cerrar mucho antes que la admisión general.
- **Si se transferirá después:** si piensa terminar en una UC o CSU, el plazo de ese sistema aplica a la solicitud de transferencia, no a la del colegio comunitario.

Confirme el semestre, el programa y el plazo con la oficina de admisiones del colegio.`
    },
    context: [],
    links: [
      {
        label: {
          en: 'CCCApply — California Community Colleges application',
          es: 'CCCApply — solicitud de California Community Colleges'
        },
        source: { en: 'California Community Colleges', es: 'California Community Colleges' },
        url: 'https://www.cccapply.org/'
      },
      {
        label: {
          en: 'Find a College — California Community Colleges',
          es: 'Find a College — California Community Colleges'
        },
        source: {
          en: "California Community Colleges Chancellor's Office",
          es: "California Community Colleges Chancellor's Office"
        },
        url: 'https://www.cccco.edu/Students/Find-a-College'
      }
    ],
    nextStep: {
      title: { en: 'Your NextStep Insight', es: 'Tu siguiente paso' },
      detail: {
        en: 'Pick two community colleges near you and note the application deadline and start date for the term you want.',
        es: 'Elija dos colegios comunitarios cerca de usted y anote el plazo de solicitud y la fecha de inicio del semestre que quiere.'
      },
      actions: [
        {
          id: 'action-ans-college-deadlines-ccc',
          kind: 'open-link',
          label: { en: 'Open CCCApply', es: 'Abrir CCCApply' },
          url: 'https://www.cccapply.org/'
        }
      ]
    },
    followUpIds: [collegeOptionIds.csu, collegeOptionIds.uc, collegeOptionIds.start]
  },
  {
    id: collegeOptionIds.csu,
    topic: 'college',
    question: {
      en: 'Where can I find application dates and deadlines for the CSU?',
      es: '¿Dónde encuentro las fechas y plazos de solicitud de la CSU?'
    },
    answer: {
      en: `**California State University (CSU).** All 22 campuses share one **Cal State Apply** application. The CSU publishes priority filing periods, and an individual campus or major can close earlier.

Priority periods the CSU lists as of November 2026:

- **Fall 2027:** August 1 – November 30, 2026
- **Spring 2027:** July 1 – August 31, 2026
- **Summer 2027:** February 1 – February 28, 2027

Many campuses accept applications after the priority period, but impacted campuses and majors may not. Check the campus page for your major before counting on a later date.`,
      es: `**California State University (CSU).** Los 22 campus comparten una sola solicitud de **Cal State Apply**. La CSU publica los periodos prioritarios, y un campus o una carrera en particular puede cerrar antes.

Periodos prioritarios que la CSU indica a noviembre de 2026:

- **Otoño 2027:** 1 de agosto – 30 de noviembre de 2026
- **Primavera 2027:** 1 de julio – 31 de agosto de 2026
- **Verano 2027:** 1 – 28 de febrero de 2027

Muchos campus aceptan solicitudes después del periodo prioritario, pero los campus y las carreras con alta demanda pueden no hacerlo. Revise la página de su campus y su carrera antes de contar con una fecha posterior.`
    },
    context: [],
    links: [
      {
        label: {
          en: 'CSU — Application dates and deadlines',
          es: 'CSU — Fechas y plazos de solicitud'
        },
        source: { en: 'California State University', es: 'California State University' },
        url: 'https://www.calstate.edu/apply/Pages/application-dates-deadlines.aspx'
      },
      {
        label: { en: 'Cal State Apply', es: 'Cal State Apply' },
        source: { en: 'California State University', es: 'California State University' },
        url: 'https://www.calstate.edu/apply'
      }
    ],
    nextStep: {
      title: { en: 'Your NextStep Insight', es: 'Tu siguiente paso' },
      detail: {
        en: 'List the CSU campuses you want and check each one for an earlier major deadline.',
        es: 'Haga una lista de los campus de CSU que le interesan y revise si alguna carrera tiene un plazo más temprano.'
      },
      actions: [
        {
          id: 'action-ans-college-deadlines-csu',
          kind: 'open-link',
          label: { en: 'Open CSU deadlines', es: 'Abrir plazos de la CSU' },
          url: 'https://www.calstate.edu/apply/Pages/application-dates-deadlines.aspx'
        }
      ]
    },
    followUpIds: [collegeOptionIds.uc, collegeOptionIds.ccc, collegeOptionIds.start]
  },
  {
    id: collegeOptionIds.uc,
    topic: 'college',
    question: {
      en: 'Where can I find application dates and deadlines for the UC?',
      es: '¿Dónde encuentro las fechas y plazos de solicitud de la UC?'
    },
    answer: {
      en: `**University of California (UC).** One **UC application** covers all nine undergraduate campuses.

Dates UC lists for the 2026–27 cycle:

- **Fall 2027:** the application opens August 1, 2026, and the filing period is **October 1 – November 30, 2026**.
- **Winter/spring 2027:** July 1 – 31, 2026, select campuses only.
- **Financial aid:** the FAFSA or California Dream Act application and the Cal Grant GPA verification form are due **March 2, 2027**.

The fall filing period closes November 30, so submit before then. Transfer applicants use a separate UC transfer deadline page.`,
      es: `**University of California (UC).** Una sola **solicitud de UC** cubre los nueve campus de licenciatura.

Fechas que la UC indica para el ciclo 2026–27:

- **Otoño 2027:** la solicitud abre el 1 de agosto de 2026 y el periodo de envío es del **1 de octubre al 30 de noviembre de 2026**.
- **Invierno/primavera 2027:** 1 – 31 de julio de 2026, solo campus seleccionados.
- **Ayuda financiera:** la FAFSA o la solicitud del California Dream Act y el formulario de verificación de GPA para Cal Grant vencen el **2 de marzo de 2027**.

El periodo de otoño cierra el 30 de noviembre, así que envíe la solicitud antes de esa fecha. Quienes se transfieren usan una página aparte con los plazos de transferencia de la UC.`
    },
    context: [],
    links: [
      {
        label: {
          en: 'UC — First-year dates and deadlines',
          es: 'UC — Fechas y plazos para primer año'
        },
        source: { en: 'University of California', es: 'University of California' },
        url: 'https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html'
      },
      {
        label: {
          en: 'UC — Transfer dates and deadlines',
          es: 'UC — Fechas y plazos de transferencia'
        },
        source: { en: 'University of California', es: 'University of California' },
        url: 'https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-transfer/dates-and-deadlines.html'
      }
    ],
    nextStep: {
      title: { en: 'Your NextStep Insight', es: 'Tu siguiente paso' },
      detail: {
        en: 'Start the UC application before November 30 and note the March 2 financial aid deadline.',
        es: 'Empiece la solicitud de UC antes del 30 de noviembre y anote el plazo de ayuda financiera del 2 de marzo.'
      },
      actions: [
        {
          id: 'action-ans-college-deadlines-uc',
          kind: 'open-link',
          label: { en: 'Open UC deadlines', es: 'Abrir plazos de la UC' },
          url: 'https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html'
        }
      ]
    },
    followUpIds: [collegeOptionIds.csu, collegeOptionIds.ccc, collegeOptionIds.start]
  }
];

/**
 * Route the broad "I want to go to college" ask to the options prompt, and
 * application-date questions to the matching public system's official guidance.
 * Specific cost, transfer, major and financial-aid questions are left to the
 * existing reviewed routers.
 */
export const routeCollegeOptionsQuestion = (input: string): string | undefined => {
  const q = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[’‘]/g, "'").replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

  const deadlineAsk = /(?:deadlines?|due dates?|application dates?|application window|filing period|when (?:do|can|should|must) i (?:apply|submit)|when (?:are|is) (?:the )?applications?|fechas? (?:limite|de solicitud|de aplicacion)|plazo|cuando (?:puedo|debo|tengo que) (?:aplicar|solicitar))/;
  if (deadlineAsk.test(q)) {
    if (/(?:cal state|state university|universidad estatal|\bcsu\b)/.test(q)) return collegeOptionIds.csu;
    if (/(?:university of california|universidad de california|\buc\b)/.test(q)) return collegeOptionIds.uc;
    if (/(?:cccapply|community college|colegio comunitario|\bccc\b)/.test(q)) return collegeOptionIds.ccc;
    if (/(?:college|university|universidad|colegio)/.test(q)) return collegeOptionIds.start;
    return undefined;
  }

  const broadAsk = /(?:^| )(?:i|we) (?:also |really )?(?:want|would like|hope|plan|am planning|plan on|am thinking about) to (?:go|get|attend|apply|start|study)/.test(q)
    || /(?:^| )(?:quiero|me gustaria|planeo|pienso) (?:ir|asistir|estudiar|aplicar|empezar)/.test(q);
  const collegeMention = /(?:college|university|school|universidad|colegio|escuela)/.test(q);
  // Cost, transfer, career-training and financial-aid concerns keep their own reviewed answers.
  const specificFocus = /(?:money|afford|tuition|cost|expensive|pay for|dinero|pagar|costo|colegiatura|matricula|scholarship|beca|financial aid|fafsa|cadaa|transfer|first generation|primera generacion|certificate|trade school|apprentice|training|job|work|career)/.test(q);

  return broadAsk && collegeMention && !specificFocus ? collegeOptionIds.start : undefined;
};
