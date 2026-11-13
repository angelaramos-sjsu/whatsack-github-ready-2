import type { ScriptedAnswer } from './types';

/**
 * "What do I do after a session?" — the follow-through steps a resident needs
 * once a consultation or counseling visit is over.
 */
export const afterSessionAnswers: ScriptedAnswer[] = [
  {
    id: 'ans-mental-after-session',
    topic: 'mental',
    question: {
      en: 'What should I do after a mental health session?',
      es: '¿Qué debo hacer después de una sesión de salud mental?'
    },
    answer: {
      en: `**After a session, three small steps do most of the work.**

1. **Book the next visit before you leave.** Ask for the date and save it in your phone. Weekly at first is common.
2. **Write down two things while they are fresh:** the one idea you want to try, and the coping step you practiced.
3. **Handle the practical part.** Ask for a visit summary or a receipt for insurance, and confirm the copay at the front desk.

**Between sessions:** try that one step once. If it does not fit, tell your therapist next time — that is useful information, not failure.

**If things get worse before the next visit,** you can call or text 988 any time, or call the office and ask to move your appointment sooner. You can also switch to a different therapist if the fit is not right; asking for a change is normal and does not hurt your care.`,
      es: `**Después de una sesión, tres pasos pequeños hacen la mayor parte del trabajo.**

1. **Agende la próxima visita antes de salir.** Pida la fecha y guárdela en su teléfono. Al principio es común cada semana.
2. **Anote dos cosas mientras las tiene frescas:** la idea que quiere probar y la técnica de calma que practicó.
3. **Resuelva la parte práctica.** Pida un resumen de la visita o un recibo para el seguro, y confirme el copago en recepción.

**Entre sesiones:** pruebe ese paso una vez. Si no le funciona, dígaselo a su terapeuta la próxima vez: es información útil, no un fracaso.

**Si las cosas empeoran antes de la próxima visita,** puede llamar o enviar un mensaje al 988 en cualquier momento, o llamar a la oficina y pedir una cita más pronto. También puede cambiar de terapeuta si no hay buena conexión; pedir un cambio es normal y no afecta su atención.`
    },
    context: [
      { en: 'After a session', es: 'Después de una sesión' },
      { en: 'Next appointment', es: 'Próxima cita' },
      { en: 'Between sessions', es: 'Entre sesiones' }
    ],
    links: [
      {
        label: { en: '988 Suicide & Crisis Lifeline', es: 'Línea 988 de Prevención del Suicidio y Crisis' },
        source: { en: '988 Lifeline', es: 'Línea 988' },
        url: 'https://988lifeline.org/'
      },
      {
        label: { en: 'Santa Clara County Behavioral Health Services', es: 'Servicios de Salud Conductual del Condado de Santa Clara' },
        source: { en: 'County of Santa Clara', es: 'Condado de Santa Clara' },
        url: 'https://bhsd.sccgov.org/'
      }
    ],
    nextStep: {
      title: { en: 'Book the next visit before you leave', es: 'Agende la próxima visita antes de salir' },
      detail: {
        en: 'One date in your phone makes the follow-through much more likely.',
        es: 'Una fecha en su teléfono hace mucho más probable que continúe.'
      },
      actions: [
        {
          id: 'mental-after-session-save',
          kind: 'save-plan',
          label: { en: 'Save counseling to my plan', es: 'Guardar consejería en mi plan' },
          resourceId: 'res-mental-3'
        },
        {
          id: 'mental-after-session-link',
          kind: 'open-link',
          label: { en: 'Open 988 Lifeline', es: 'Abrir la Línea 988' },
          url: 'https://988lifeline.org/'
        }
      ]
    },
    resourceIds: ['res-mental-3'],
    followUpIds: ['ans-mental-session-cost', 'ans-mental-medi-cal-therapist', 'ans-mental-drop-in-what-happens']
  }
];
