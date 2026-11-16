import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../../types';
import { communityPrograms } from '../../data/communityPrograms';
import { composeAssistantReply, composeContactReply, composeWelcome, describePreferences, AssistantReply } from '../../community/assistant';
import { connectorCopy } from '../../community/copy';
import {
  answerCurrentQuestion,
  buildPreferences,
  createIntakeState,
  editQuestion,
  emptyPreferences,
  goBack,
  restartIntake,
  skipCurrentQuestion,
  answersFromPreferences,
  nextUsefulQuestion
} from '../../community/intake';
import { detectIntent, seedPreferencesFromIntent } from '../../community/intent';
import { assistantLanguageFor, languageLabel } from '../../community/languages';
import { findMatchingPrograms } from '../../community/match';
import {
  ConnectorChatMessage,
  IntakeAnswers,
  IntakeQuestionId,
  IntakeState,
  ProgramMatch
} from '../../community/types';
import { useSpeech } from '../../community/useSpeech';
import { ChatPanel } from './ChatPanel';
import { IntakeWizard } from './IntakeWizard';
import { ProgramResults } from './ProgramResults';
import { Globe2, HeartHandshake, Lock, Phone, RotateCcw, Sparkles } from 'lucide-react';

interface CommunityConnectorProps {
  currentLanguage: Language;
}

const STORAGE_KEY = 'whatsack.sprout-community-v1';

interface SavedConversation {
  messages: ConnectorChatMessage[];
  preferences: typeof emptyPreferences;
  savedAt: string;
}

function loadSaved(): SavedConversation | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SavedConversation;
    if (!parsed || !Array.isArray(parsed.messages)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function messageId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export const CommunityConnector: React.FC<CommunityConnectorProps> = ({ currentLanguage }) => {
  const uiLanguage: 'en' | 'es' = currentLanguage;
  const c = connectorCopy[uiLanguage];

  const [saved] = useState<SavedConversation | null>(() => loadSaved());
  const [messages, setMessages] = useState<ConnectorChatMessage[]>(() =>
    saved?.messages?.length
      ? saved.messages
      : [{ id: 'welcome', sender: 'assistant', text: composeWelcome(uiLanguage) }]
  );
  const [preferences, setPreferences] = useState(() => saved?.preferences ?? emptyPreferences);
  const [intake, setIntake] = useState<IntakeState>(() => createIntakeState(answersFromPreferences(saved?.preferences ?? emptyPreferences)));
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [matches, setMatches] = useState<ProgramMatch[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [input, setInput] = useState('');
  const [saveOnDevice, setSaveOnDevice] = useState(Boolean(saved));
  const [restoredSession] = useState(Boolean(saved));
  const [readAloud, setReadAloud] = useState(false);

  const assistantLanguage = assistantLanguageFor(preferences.language, uiLanguage);
  const { isListening, speechSupported, synthesisSupported, listen, speak, stopSpeaking } = useSpeech(assistantLanguage);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (saved?.messages?.length) return;
    setMessages((current) =>
      current.length <= 1 ? [{ id: 'welcome', sender: 'assistant', text: composeWelcome(uiLanguage) }] : current
    );
    // Re-translate the welcome message only; existing conversation is kept.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uiLanguage]);

  useEffect(() => {
    try {
      if (saveOnDevice) {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ messages, preferences, savedAt: new Date().toISOString() })
        );
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Storage can be unavailable (private mode); the conversation still works.
    }
  }, [saveOnDevice, messages, preferences]);

  const scrollToResults = () => {
    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const appendAssistant = (reply: AssistantReply) => {
    setMessages((current) => [
      ...current,
      { id: messageId('assistant'), sender: 'assistant', text: reply.text, chips: reply.chips }
    ]);
    if (readAloud) speak(reply.text);
  };

  const pushUser = (text: string) => {
    setMessages((current) => [...current, { id: messageId('user'), sender: 'user', text }]);
  };

  const openIntake = () => {
    setIntake(createIntakeState(answersFromPreferences(preferences)));
    setIsIntakeOpen(true);
  };

  const runSearch = (nextPreferences = preferences, intent = null as ReturnType<typeof detectIntent> | null) => {
    const found = findMatchingPrograms(communityPrograms, nextPreferences);
    setMatches(found);
    setHasSearched(true);
    const reply = composeAssistantReply({
      preferences: nextPreferences,
      intent,
      matches: found,
      language: assistantLanguageFor(nextPreferences.language, uiLanguage),
      nextQuestion: nextUsefulQuestion(nextPreferences, intake.skipped)
    });
    appendAssistant(reply);
    scrollToResults();
    return found;
  };

  const runContact = (nextPreferences = preferences) => {
    const found = findMatchingPrograms(communityPrograms, nextPreferences);
    setMatches(found);
    setHasSearched(true);
    appendAssistant(composeContactReply(found, assistantLanguageFor(nextPreferences.language, uiLanguage)));
  };

  const chipIs = (chip: string, key: 'talkToPerson' | 'changePreferences' | 'showResults') => {
    return normalize(chip) === normalize(connectorCopy.en[key]) || normalize(chip) === normalize(connectorCopy.es[key]);
  };

  const handleChip = (chip: string) => {
    if (chipIs(chip, 'talkToPerson')) {
      runContact();
      return;
    }
    if (chipIs(chip, 'changePreferences')) {
      openIntake();
      return;
    }
    if (chipIs(chip, 'showResults')) {
      runSearch();
      return;
    }
    const normalized = normalize(chip);
    if (normalized === normalize('Free activities only') || normalized === normalize('Solo actividades gratuitas')) {
      const nextPreferences = { ...preferences, freeOnly: true };
      setPreferences(nextPreferences);
      runSearch(nextPreferences);
      return;
    }
    if (
      normalized === normalize('Show me a phone number') ||
      normalized === normalize('Muéstreme un teléfono')
    ) {
      runContact();
      return;
    }
    if (normalized === normalize('Use my ZIP code') || normalized === normalize('Usar mi código postal')) {
      openIntake();
      return;
    }
    if (normalized === normalize('No preference') || normalized === normalize('Sin preferencia')) {
      const nextPreferences = { ...preferences, language: { code: 'other' as const, noPreference: true } };
      setPreferences(nextPreferences);
      appendAssistant(
        composeAssistantReply({
          preferences: nextPreferences,
          matches: null,
          language: uiLanguage,
          nextQuestion: undefined
        })
      );
      return;
    }
    handleSend(chip);
  };

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  function handleSend(rawText?: string) {
    const text = (rawText ?? input).trim();
    if (!text) return;
    setInput('');

    const intent = detectIntent(text);
    const nextPreferences = seedPreferencesFromIntent(preferences, intent);
    const language = assistantLanguageFor(nextPreferences.language, uiLanguage);
    const normalized = normalize(text);

    pushUser(text);
    setPreferences(nextPreferences);

    const asksForResults =
      /\b(show|see|find|options|results|recommend|buscar|mostrar|opciones|resultados)\b/.test(normalized);
    const asksForContact =
      intent.intents.includes('contact') && !asksForResults;
    const strongIntent = intent.intents.some((id) =>
      ['social', 'older-adults', 'language-culture', 'accessibility', 'volunteering'].includes(id)
    );
    const enoughToSearch =
      (nextPreferences.goals.length > 0 ||
        nextPreferences.interests.length > 0 ||
        strongIntent) &&
      Boolean(
        nextPreferences.location ||
          nextPreferences.language ||
          nextPreferences.interests.length > 0 ||
          nextPreferences.goals.length > 0
      );

    if (asksForContact) {
      runContact(nextPreferences);
      return;
    }

    if (asksForResults || enoughToSearch) {
      const found = findMatchingPrograms(communityPrograms, nextPreferences);
      setMatches(found);
      setHasSearched(true);
      const reply = composeAssistantReply({
        preferences: nextPreferences,
        intent,
        matches: found,
        language,
        nextQuestion: nextUsefulQuestion(nextPreferences, intake.skipped)
      });
      appendAssistant(reply);
      if (found.length > 0) scrollToResults();
      return;
    }

    const followUp = composeAssistantReply({
      preferences: nextPreferences,
      intent,
      matches: null,
      language,
      nextQuestion: undefined
    });
    appendAssistant(followUp);
  }

  const handleWizardAnswer = (value: IntakeAnswers[IntakeQuestionId]) => {
    const nextIntake = answerCurrentQuestion(intake, value);
    const nextPreferences = buildPreferences(nextIntake.answers, preferences);
    setIntake(nextIntake);
    setPreferences(nextPreferences);

    if (nextIntake.completed) {
      const choice = nextIntake.answers.nextStep ?? 'show-results';
      if (choice === 'talk-to-person') {
        runContact(nextPreferences);
      } else if (choice === 'change-preferences') {
        setIntake(editQuestion(nextIntake, 'goals'));
        return;
      } else {
        runSearch(nextPreferences);
      }
      setIsIntakeOpen(false);
    }
  };

  const handleWizardSkip = () => {
    const nextIntake = skipCurrentQuestion(intake);
    setIntake(nextIntake);
    setPreferences(buildPreferences(nextIntake.answers, preferences));
  };

  const handleWizardBack = () => setIntake(goBack(intake));

  const handleWizardEdit = (id: IntakeQuestionId) => setIntake(editQuestion(intake, id));

  const handleWizardRestart = () => {
    const nextIntake = restartIntake();
    setIntake(nextIntake);
    setPreferences({ ...emptyPreferences, language: preferences.language, prefersPhone: preferences.prefersPhone, contactFirst: preferences.contactFirst });
  };

  const handleResetAll = () => {
    stopSpeaking();
    setPreferences(emptyPreferences);
    setIntake(createIntakeState());
    setMatches([]);
    setHasSearched(false);
    setIsIntakeOpen(false);
    setSaveOnDevice(false);
    setInput('');
    setMessages([{ id: messageId('welcome'), sender: 'assistant', text: composeWelcome(uiLanguage) }]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const handleRosaExample = () => {
    const rosaMessage =
      'Me siento un poco sola durante la semana. Me gustaría encontrar actividades donde pueda conocer a otras personas que hablen español.';
    const seed = {
      ...emptyPreferences,
      location: { city: 'San Jose', virtual: false },
      language: { code: 'es' as const, variety: 'latin-america' as const },
      goals: ['meet-people' as const]
    };
    const intent = detectIntent(rosaMessage);
    const nextPreferences = seedPreferencesFromIntent(seed, intent);
    setPreferences(nextPreferences);
    setIntake(createIntakeState(answersFromPreferences(nextPreferences)));
    pushUser(rosaMessage);

    const found = findMatchingPrograms(communityPrograms, nextPreferences);
    setMatches(found);
    setHasSearched(true);
    appendAssistant(
      composeAssistantReply({
        preferences: nextPreferences,
        intent,
        matches: found,
        language: 'es',
        nextQuestion: null
      })
    );
    appendAssistant(composeContactReply(found, 'es'));
    scrollToResults();
  };

  const preferenceSummary = describePreferences(preferences, uiLanguage);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-gradient-to-b from-purple-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-300 bg-white px-3.5 py-1.5 text-xs font-extrabold text-purple-900">
            <HeartHandshake className="h-4 w-4" aria-hidden="true" />
            <span>{c.badge}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{c.title}</h1>
              <p className="mt-2 text-base font-medium leading-relaxed text-slate-700">{c.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleRosaExample}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-purple-800"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                {c.rosaButton}
              </button>
              <button
                type="button"
                onClick={handleResetAll}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-900 hover:bg-slate-100"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {c.resetAll}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <main className="space-y-6">
          <section aria-labelledby="connector-privacy-heading" className="rounded-2xl border border-purple-200 bg-white p-4">
            <h2 id="connector-privacy-heading" className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
              <Lock className="h-4 w-4 text-purple-700" aria-hidden="true" />
              {c.privacyTitle}
            </h2>
            <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{c.privacyBody}</p>
            <p className="mt-1 text-xs font-semibold text-slate-600">{c.privacyDetail}</p>
            {restoredSession && (
              <p className="mt-2 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-900">
                {c.savedSession}
              </p>
            )}
          </section>

          <ChatPanel
            uiLanguage={uiLanguage}
            messages={messages}
            input={input}
            onInputChange={setInput}
            onSend={() => handleSend()}
            onChip={handleChip}
            onOpenIntake={openIntake}
            readAloud={readAloud}
            onToggleReadAloud={() => {
              setReadAloud((current) => {
                if (current) stopSpeaking();
                return !current;
              });
            }}
            speechSupported={speechSupported}
            synthesisSupported={synthesisSupported}
            isListening={isListening}
            onToggleListening={() => listen((text) => setInput(text))}
          />

          {isIntakeOpen && (
            <IntakeWizard
              state={intake}
              uiLanguage={uiLanguage}
              onAnswer={handleWizardAnswer}
              onSkip={handleWizardSkip}
              onBack={handleWizardBack}
              onEdit={handleWizardEdit}
              onRestart={handleWizardRestart}
            />
          )}

          <div ref={resultsRef} className="scroll-mt-24">
            <ProgramResults
              matches={matches}
              hasSearched={hasSearched}
              uiLanguage={uiLanguage}
              onChangePreferences={openIntake}
              onTalkToPerson={() => runContact()}
            />
          </div>

          <section aria-labelledby="connector-about-data" className="rounded-2xl border border-amber-300 bg-amber-50 p-4">
            <h2 id="connector-about-data" className="text-sm font-extrabold text-amber-950">
              {uiLanguage === 'en' ? 'About this data' : 'Sobre estos datos'}
            </h2>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-amber-950">
              {uiLanguage === 'en'
                ? 'Records marked “Sample record” are fictional demonstration data and are never presented as verified real-world results. Real organization entries come from the project directory and contain only published name, address and website; program details must be confirmed with the organization.'
                : 'Los registros marcados “Registro de ejemplo” son datos ficticios de demostración y nunca se presentan como resultados reales verificados. Las organizaciones reales provienen del directorio del proyecto y solo contienen nombre, dirección y sitio web publicados; los detalles del programa deben confirmarse con la organización.'}
            </p>
          </section>
        </main>

        <aside className="space-y-4">
          <section aria-labelledby="connector-preferences-heading" className="rounded-3xl border-2 border-slate-200 bg-white p-5">
            <h2 id="connector-preferences-heading" className="flex items-center gap-2 text-base font-extrabold text-slate-900">
              <Globe2 className="h-4 w-4 text-purple-700" aria-hidden="true" />
              {uiLanguage === 'en' ? 'What Sprout knows' : 'Lo que Sprout sabe'}
            </h2>
            {preferenceSummary.length === 0 ? (
              <p className="mt-2 text-sm font-medium text-slate-700">
                {uiLanguage === 'en'
                  ? 'Nothing yet. Type a request or use the guided questions.'
                  : 'Todavía nada. Escriba una solicitud o use las preguntas guiadas.'}
              </p>
            ) : (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-medium text-slate-800">
                {preferenceSummary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {preferences.language && (
              <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800">
                {uiLanguage === 'en' ? 'Assistant language: ' : 'Idioma del asistente: '}
                {languageLabel(preferences.language, uiLanguage)}
              </p>
            )}

            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={openIntake}
                className="w-full min-h-[48px] rounded-xl bg-purple-700 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-purple-800"
              >
                {c.startIntake}
              </button>
              <button
                type="button"
                onClick={() => runSearch()}
                className="w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-900 hover:bg-slate-100"
              >
                {c.showResults}
              </button>
              <button
                type="button"
                onClick={() => runContact()}
                className="inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-900 hover:bg-slate-100"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {c.talkToPerson}
              </button>
            </div>
          </section>

          <section aria-labelledby="connector-saving-heading" className="rounded-3xl border-2 border-slate-200 bg-white p-5">
            <h2 id="connector-saving-heading" className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              {uiLanguage === 'en' ? 'Saving & reset' : 'Guardar y restablecer'}
            </h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{c.privacyDetail}</p>
            <label className="mt-3 flex cursor-pointer items-start gap-2.5 rounded-xl bg-slate-50 p-3">
              <input
                type="checkbox"
                checked={saveOnDevice}
                onChange={(event) => setSaveOnDevice(event.target.checked)}
                className="mt-0.5 h-5 w-5 accent-purple-700"
              />
              <span className="text-sm font-bold text-slate-900">{c.saveToggle}</span>
            </label>
            <p className="mt-2 text-xs font-semibold text-slate-600">{c.resetNote}</p>
            <button
              type="button"
              onClick={handleResetAll}
              className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-xs font-extrabold text-slate-800 underline hover:bg-slate-100"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {c.clearConversation}
            </button>
          </section>

          <section aria-labelledby="connector-examples-heading" className="rounded-3xl border-2 border-slate-200 bg-white p-5">
            <h2 id="connector-examples-heading" className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              {c.exampleTitle}
            </h2>
            <div className="mt-2 flex flex-col gap-1.5">
              {(uiLanguage === 'en'
                ? [
                    'I want to meet new people near me',
                    'senior centers near me',
                    'activities where Portuguese is spoken',
                    "I don't drive — are there virtual groups?",
                    'where can I volunteer in San Jose?',
                    'can I bring a caregiver?'
                  ]
                : [
                    'Quiero conocer gente nueva cerca de mí',
                    'centros para adultos mayores cerca de mí',
                    'actividades donde se hable portugués',
                    'no manejo, ¿hay grupos virtuales?',
                    '¿dónde puedo ser voluntario en San José?',
                    '¿puedo llevar a mi cuidador?'
                  ]
              ).map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => handleSend(example)}
                  className="rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-left text-xs font-bold text-purple-950 hover:bg-purple-100"
                >
                  {example}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>

    </div>
  );
};
