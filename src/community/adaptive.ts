import { interestLabels, intentLabels, languageLabels, pick } from './i18n';
import { mergeProfilePatch } from './profile';
import type {
  AdaptiveSignalId,
  Bi,
  CommunityIntentId,
  CommunityProfile,
  QuickReply,
  UiLanguage
} from './types';

export interface AdaptivePrompt {
  signal: AdaptiveSignalId;
  question: Bi;
  quickReplies: QuickReply[];
}

export interface AppliedSignals {
  profile: CommunityProfile;
  prompts: AdaptivePrompt[];
  /** Short acknowledgements the assistant says before asking its next question. */
  notes: Bi[];
}

const intentQuickReplies = (): QuickReply[] =>
  (
    [
      'meet-people',
      'community-events',
      'clubs-groups',
      'senior-activities',
      'volunteering',
      'explore'
    ] as CommunityIntentId[]
  ).map((intent) => ({
    id: `pick-intent-${intent}`,
    label: intentLabels[intent],
    said: intentLabels[intent],
    patch: { intent }
  }));

const interestQuickReplies = (): QuickReply[] =>
  (['arts', 'music', 'exercise', 'cultural', 'games', 'learning'] as const).map((interest) => ({
    id: `pick-interest-${interest}`,
    label: interestLabels[interest],
    said: interestLabels[interest],
    patch: { interests: [interest] }
  }));

/**
 * Apply what the person just told us, and decide which follow-up (if any) is
 * still genuinely needed. Anything already answered is never asked again.
 */
export const applyAdaptiveSignals = (
  profile: CommunityProfile,
  signals: AdaptiveSignalId[]
): AppliedSignals => {
  let next = profile;
  const prompts: AdaptivePrompt[] = [];
  const notes: Bi[] = [];

  signals.forEach((signal) => {
    switch (signal) {
      case 'lonely':
        notes.push({
          en: 'Thank you for telling me. Feeling alone during the week is a real reason to look for a group — these are places where people talk with each other.',
          es: 'Gracias por decírmelo. Sentirse sola o solo durante la semana es una razón real para buscar un grupo: son lugares donde la gente conversa.'
        });
        if (!next.intent) next = { ...next, intent: 'meet-people' };
        break;
      case 'same-age':
        if (next.ageGroup === 'no-preference') {
          prompts.push({
            signal,
            question: {
              en: 'Which age group would you like to meet?',
              es: '¿Con qué grupo de edad le gustaría reunirse?'
            },
            quickReplies: [
              { id: 'age-youth', label: { en: 'Young people', es: 'Personas jóvenes' }, patch: { ageGroup: 'youth' } },
              { id: 'age-adults', label: { en: 'Adults', es: 'Adultos' }, patch: { ageGroup: 'adults' } },
              { id: 'age-older', label: { en: 'Older adults', es: 'Adultos mayores' }, patch: { ageGroup: 'older-adults' } },
              { id: 'age-any', label: { en: 'Any age', es: 'Cualquier edad' }, patch: { ageGroup: 'any-age' } }
            ]
          });
        }
        if (!next.intent) next = { ...next, intent: 'meet-people' };
        break;
      case 'limited-english':
        if (next.language === 'other' || next.language === 'en') {
          prompts.push({
            signal,
            question: {
              en: 'Which language would you like the activities in? We can also ask about a regional variety, if you want.',
              es: '¿En qué idioma prefiere las actividades? También podemos preguntar por una variedad regional, si lo desea.'
            },
            quickReplies: (['es', 'pt', 'vi', 'zh-Hans', 'zh-Hant', 'tl', 'ko'] as const).map((code) => ({
              id: `lang-${code}`,
              label: languageLabels[code],
              patch: { language: code }
            }))
          });
        }
        if (!next.intent) next = { ...next, intent: 'language-culture' };
        break;
      case 'no-drive':
        if (next.access.length === 0) {
          prompts.push({
            signal,
            question: {
              en: 'Would public transportation, help getting a ride, or a virtual group work best for you?',
              es: '¿Le sirve más el transporte público, ayuda con un viaje o un grupo virtual?'
            },
            quickReplies: [
              { id: 'access-transit', label: { en: 'Public transportation nearby', es: 'Transporte público cerca' }, patch: { access: ['transit-nearby'] } },
              { id: 'access-rides', label: { en: 'Transportation assistance', es: 'Ayuda con transporte' }, patch: { access: ['transportation-help'] } },
              { id: 'access-virtual', label: { en: 'Virtual activities', es: 'Actividades virtuales' }, patch: { access: ['virtual'] } }
            ]
          });
        }
        notes.push({
          en: 'We will look for places on a bus or train line, places with rides, or online groups.',
          es: 'Buscaremos lugares en una ruta de autobús o tren, lugares con transportación, o grupos en línea.'
        });
        break;
      case 'nervous-alone':
        if (!next.nervousAlone) {
          next = { ...next, nervousAlone: true };
          prompts.push({
            signal,
            question: {
              en: 'Would you like the organizer’s phone number so you can talk with someone before your first visit?',
              es: '¿Quiere el teléfono de quien organiza el grupo para hablar con alguien antes de su primera visita?'
            },
            quickReplies: [
              { id: 'organizer-yes', label: { en: 'Yes, show me the organizer', es: 'Sí, muéstreme a quien organiza' }, patch: { wantsOrganizerFirst: true } },
              { id: 'organizer-no', label: { en: 'No, that is okay', es: 'No, está bien' }, patch: { wantsOrganizerFirst: false } }
            ]
          });
        } else {
          next = { ...next, wantsOrganizerFirst: true };
        }
        break;
      case 'unsure-interests':
        if (next.interests.length === 0) {
          prompts.push({
            signal,
            question: {
              en: 'No problem. These are easy places to start — pick any that sound okay.',
              es: 'No hay problema. Estas son fáciles para empezar: elija las que le parezcan bien.'
            },
            quickReplies: interestQuickReplies()
          });
        }
        if (!next.intent) next = { ...next, intent: 'explore' };
        break;
      case 'cannot-afford':
        if (!next.affordability) {
          next = { ...next, affordability: true };
        }
        notes.push({
          en: 'We will put free options first.',
          es: 'Pondremos primero las opciones gratuitas.'
        });
        break;
      case 'hard-to-use-websites':
        if (!next.prefersPhoneHelp) {
          next = { ...next, prefersPhoneHelp: true };
        }
        notes.push({
          en: 'We will show phone numbers first. Someone at the organization can explain things by phone, without a website.',
          es: 'Mostraremos los teléfonos primero. Alguien en la organización puede explicarle por teléfono, sin usar un sitio web.'
        });
        break;
      default:
        break;
    }
  });

  return { profile: next, prompts, notes };
};

export interface NextQuestion {
  step: number;
  question: Bi;
  quickReplies: QuickReply[];
}

/** Ask one question at a time, skipping anything already answered. */
export const nextIntakeQuestion = (profile: CommunityProfile): NextQuestion | null => {
  if (!profile.intent) {
    return {
      step: 0,
      question: {
        en: 'What would you like help finding today?',
        es: '¿Qué le gustaría encontrar hoy?'
      },
      quickReplies: intentQuickReplies()
    };
  }
  if (profile.interests.length === 0) {
    return {
      step: 1,
      question: {
        en: 'What kinds of activities interest you?',
        es: '¿Qué tipo de actividades le interesan?'
      },
      quickReplies: interestQuickReplies()
    };
  }
  if (profile.location.kind === 'skip') {
    return {
      step: 2,
      question: {
        en: 'Where would you like to look? A city or ZIP code is enough, or we can look at virtual options.',
        es: '¿Dónde le gustaría buscar? Con una ciudad o código postal es suficiente, o podemos ver opciones virtuales.'
      },
      quickReplies: [
        {
          id: 'location-virtual',
          label: { en: 'Virtual activities', es: 'Actividades virtuales' },
          said: { en: 'I prefer virtual activities', es: 'Prefiero actividades virtuales' },
          patch: { location: { kind: 'virtual', value: 'Online' } }
        }
      ]
    };
  }
  return null;
};

export interface AssistantReply {
  text: string;
  quickReplies: QuickReply[];
}

/**
 * Compose the guide's reply from what it recognized, the acknowledgements it
 * owes the person, and the single question it still needs answered.
 */
export const buildAssistantReply = (params: {
  profile: CommunityProfile;
  intents: CommunityIntentId[];
  notes: Bi[];
  prompts: AdaptivePrompt[];
  hasResults: boolean;
  language: UiLanguage;
}): AssistantReply => {
  const { profile, intents, notes, prompts, hasResults, language } = params;
  const said: string[] = [];

  if (intents.length > 0) {
    const labels = intents
      .filter((intent) => intent !== 'explore')
      .map((intent) => intentLabels[intent][language].toLowerCase());
    if (labels.length > 0) {
      said.push(
        language === 'en'
          ? `I hear that you are looking for ${labels.join(' and ')}.`
          : `Entiendo que busca ${labels.join(' y ')}.`
      );
    }
  }

  notes.forEach((note) => said.push(pick(note, language)));

  const prompt = prompts[0];
  if (prompt) {
    said.push(pick(prompt.question, language));
    return { text: said.join(' '), quickReplies: prompt.quickReplies };
  }

  const next = nextIntakeQuestion(profile);
  if (next) {
    said.push(pick(next.question, language));
    return { text: said.join(' '), quickReplies: next.quickReplies };
  }

  said.push(
    hasResults
      ? language === 'en'
        ? 'Here are a few options to look at. Each one ends with a real organization you can call.'
        : 'Aquí hay algunas opciones para revisar. Cada una termina en una organización real a la que puede llamar.'
      : language === 'en'
        ? 'Let me search with what you have told me.'
        : 'Déjeme buscar con lo que me ha dicho.'
  );

  return { text: said.join(' '), quickReplies: [] };
};
