import type { ScriptedAnswer } from './types';

/**
 * "Where can I find a consultation?" — lists only the mental health
 * specialists that already exist on the resources page (category
 * `mental-health`). Each card opens its full NextStep Insights details.
 */
export const bayAreaSpecialistAnswers: ScriptedAnswer[] = [
  {
    id: 'ans-mental-bay-area-consultation',
    topic: 'mental',
    question: {
      en: 'Where can I find a mental health specialist in the Bay Area?',
      es: '¿Dónde puedo encontrar un especialista en salud mental en el Área de la Bahía?'
    },
    answer: {
      en: `Here's a list of mental health specialists in the Bay Area.

Tap a specialist to see languages, cost, hours and how to reach them.`,
      es: `Aquí tiene una lista de especialistas en salud mental del Área de la Bahía.

Toque un especialista para ver idiomas, costo, horario y cómo comunicarse.`
    },
    context: [
      { en: 'Bay Area', es: 'Área de la Bahía' },
      { en: 'Mental health specialists', es: 'Especialistas en salud mental' },
      { en: 'Cost & languages', es: 'Costo e idiomas' }
    ],
    resourceIds: ['res-mental-1', 'res-mental-2', 'res-mental-3', 'res-mental-4'],
    resourceListLabel: {
      en: 'Mental health specialists in the Bay Area',
      es: 'Especialistas en salud mental del Área de la Bahía'
    },
    followUpIds: ['ans-mental-session-cost', 'ans-mental-medi-cal-therapist']
  }
];
