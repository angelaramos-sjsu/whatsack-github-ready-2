import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Phone, ShieldCheck } from 'lucide-react';
import { buildAssistantReply, applyAdaptiveSignals, nextIntakeQuestion } from '../adaptive';
import { detectAdaptiveSignals, detectCommunityIntent } from '../intent';
import { copy, pick } from '../i18n';
import { matchCommunityResources } from '../matching';
import { createDefaultProfile, hasSearchBasis, mergeProfilePatch } from '../profile';
import { CommunityChat, type CommunityMessage } from './CommunityChat';
import { CommunityResults } from './CommunityResults';
import { IntakeWizard } from './IntakeWizard';
import { LanguageSelector } from './LanguageSelector';
import type {
  Bi,
  CommunityIntentId,
  CommunityProfile,
  QuickReply,
  UiLanguage
} from '../types';

const STORAGE_KEY = 'whatsack-community-session';

const primaryIntentOrder: CommunityIntentId[] = [
  'meet-people',
  'community-events',
  'clubs-groups',
  'senior-activities',
  'volunteering',
  'explore',
  'language-culture',
  'accessibility',
  'register-help',
  'cost-question',
  'contact-organization'
];

const titleCase = (value: string): string =>
  value.replace(/(^|\s)\w/g, (letter) => letter.toUpperCase());

const welcomeMessage = (language: UiLanguage): CommunityMessage => {
  const first = nextIntakeQuestion(createDefaultProfile());
  const intro = pick(
    {
      en: "Hi, I'm the community guide. Answer one question at a time, or just tell me in your own words.",
      es: 'Hola, soy la guía comunitaria. Responda una pregunta a la vez o dígame con sus propias palabras.'
    },
    language
  );
  return {
    id: 'welcome',
    role: 'assistant',
    text: first ? `${intro} ${pick(first.question, language)}` : intro,
    quickReplies: first?.quickReplies
  };
};

const stripQuickReplies = (messages: CommunityMessage[]): CommunityMessage[] =>
  messages.map(({ quickReplies, ...rest }) => rest);

interface CommunityConnectorProps {
  currentLanguage: UiLanguage;
  onBackToHome?: () => void;
}

/**
 * Community & Social Connection guide.
 *
 * Two ways into the same profile: free-text chat and the seven-question
 * wizard. Whatever the person has already told us is never asked twice.
 */
export const CommunityConnector: React.FC<CommunityConnectorProps> = ({
  currentLanguage,
  onBackToHome
}) => {
  const c = copy[currentLanguage];
  const [profile, setProfile] = useState<CommunityProfile>(createDefaultProfile);
  const [messages, setMessages] = useState<CommunityMessage[]>(() => [welcomeMessage(currentLanguage)]);
  const [isThinking, setIsThinking] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [showPerson, setShowPerson] = useState(false);
  const [saveTranscript, setSaveTranscript] = useState(false);
  const [liveMessage, setLiveMessage] = useState('');
  const idRef = useRef(0);
  const nextId = () => {
    idRef.current += 1;
    return `community-${idRef.current}`;
  };

  // The greeting follows the site language toggle.
  useEffect(() => {
    setMessages((prev) =>
      prev.map((message) => (message.id === 'welcome' ? welcomeMessage(currentLanguage) : message))
    );
  }, [currentLanguage]);

  // Optional saving: nothing is written unless the person opts in.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!saveTranscript) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ profile, messages }));
    } catch {
      // A full or blocked storage should never break the guide.
    }
  }, [saveTranscript, profile, messages]);

  const outcome = useMemo(() => matchCommunityResources(profile), [profile]);
  const canFinish = hasSearchBasis(profile) && profile.intent !== null;

  const applyIntentHints = (base: CommunityProfile, intents: CommunityIntentId[], hints: ReturnType<typeof detectCommunityIntent>['hints']): CommunityProfile => {
    const patch: Partial<CommunityProfile> = {};

    if (hints.language) {
      patch.language = hints.language;
      if (hints.region && base.region === 'no-preference') patch.region = hints.region;
    } else if (hints.region && base.region === 'no-preference') {
      patch.region = hints.region;
    }

    if (hints.city) patch.location = { kind: 'city', value: titleCase(hints.city) };
    if (hints.zip) patch.location = { kind: 'zip', value: hints.zip };
    if (hints.virtual) patch.location = { kind: 'virtual', value: 'Online' };

    if (hints.wheelchair) patch.access = [...base.access, 'wheelchair'];
    if (hints.noDrive) patch.access = [...base.access, 'transportation-help'];
    if (hints.free) patch.affordability = true;

    if (!base.intent && intents.length > 0) {
      const primary = primaryIntentOrder.find((intent) => intents.includes(intent));
      if (primary) patch.intent = primary;
    }

    return mergeProfilePatch(base, patch);
  };

  const extraNotes = (hints: ReturnType<typeof detectCommunityIntent>['hints']): Bi[] => {
    const notes: Bi[] = [];
    if (hints.wantsRegisterHelp) {
      notes.push({
        en: 'Most groups take a sign-up by phone. Ask to speak with the person who registers new members.',
        es: 'Casi todos los grupos aceptan inscripción por teléfono. Pida hablar con la persona que inscribe a nuevos miembros.'
      });
    }
    if (hints.wantsContact) {
      notes.push({
        en: 'Each option lists a phone number only when the source confirmed one.',
        es: 'Cada opción muestra un teléfono solo cuando la fuente lo confirmó.'
      });
    }
    if (hints.caregiver) {
      notes.push({
        en: 'You can ask whether a family member or caregiver can come with you; that detail is on each card.',
        es: 'Puede preguntar si un familiar o acompañante puede entrar con usted; ese dato está en cada tarjeta.'
      });
    }
    return notes;
  };

  const runTurn = (text: string) => {
    const intent = detectCommunityIntent(text);
    const signals = detectAdaptiveSignals(text);
    const hinted = applyIntentHints(profile, intent.intents, intent.hints);
    const applied = applyAdaptiveSignals(hinted, signals);
    const nextProfile = applied.profile;
    const hasResults = hasSearchBasis(nextProfile);

    const reply = buildAssistantReply({
      profile: nextProfile,
      intents: intent.intents,
      notes: [...extraNotes(intent.hints), ...applied.notes],
      prompts: applied.prompts,
      hasResults,
      language: currentLanguage
    });

    setMessages((prev) => [
      ...stripQuickReplies(prev),
      { id: nextId(), role: 'user', text }
    ]);
    setProfile(nextProfile);
    setIsThinking(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: 'assistant', text: reply.text, quickReplies: reply.quickReplies }
      ]);
      setIsThinking(false);
      setLiveMessage(reply.text);
      if (hasResults) setResultsVisible(true);
    }, 350);
  };

  const handleQuickReply = (reply: QuickReply) => {
    const nextProfile = mergeProfilePatch(profile, reply.patch);
    const said = reply.said ? reply.said[currentLanguage] : reply.label[currentLanguage];
    const followUp = nextIntakeQuestion(nextProfile);
    const hasResults = hasSearchBasis(nextProfile);

    setMessages((prev) => [
      ...stripQuickReplies(prev),
      { id: nextId(), role: 'user', text: said }
    ]);
    setProfile(nextProfile);

    const acknowledgement = pick(reply.label, currentLanguage);
    const text = followUp
      ? `${acknowledgement}. ${pick(followUp.question, currentLanguage)}`
      : hasResults
        ? `${acknowledgement}. ${
            currentLanguage === 'en'
              ? 'Here are a few options — each one ends with a real organization.'
              : 'Aquí hay algunas opciones; cada una termina en una organización real.'
          }`
        : acknowledgement;

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          text,
          quickReplies: followUp?.quickReplies
        }
      ]);
      setLiveMessage(text);
      if (!followUp && hasResults) setResultsVisible(true);
    }, 200);
  };

  const scrollTo = (id: string) => {
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const openResults = () => {
    setResultsVisible(true);
    setLiveMessage(c.resultsCount(outcome.matches.length));
    scrollTo('community-results');
  };

  const restart = () => {
    setProfile(createDefaultProfile());
    setMessages([welcomeMessage(currentLanguage)]);
    setResultsVisible(false);
    setWizardStep(0);
    setShowPerson(false);
    setSaveTranscript(false);
    setLiveMessage(c.resetDone);
    if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY);
    scrollTo('community-top');
  };

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 qc-page">
      <div id="community-top" className="qc-shell py-8 sm:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="qc-eyebrow">
              {pick({ en: 'Community & social connection', es: 'Comunidad y conexión social' }, currentLanguage)}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl">
              {c.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-slate-700">{c.subtitle}</p>
          </div>
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {c.backToHome}
            </button>
          )}
        </div>

        <p className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-slate-900">
          {c.mockNotice}
        </p>

        <p role="status" aria-live="polite" className="sr-only">
          {liveMessage}
        </p>

        <section
          aria-labelledby="community-preferences-heading"
          className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 id="community-preferences-heading" className="text-lg font-extrabold text-slate-900">
            {c.yourPreferences}
          </h2>
          <div className="mt-3 grid gap-5 sm:grid-cols-2">
            <LanguageSelector
              language={currentLanguage}
              value={profile.language}
              region={profile.region}
              onChange={(value) => setProfile((prev) => ({ ...prev, language: value }))}
              onRegionChange={(region) => setProfile((prev) => ({ ...prev, region }))}
            />
            <div>
              <label htmlFor="community-area-bar" className="block text-base font-bold text-slate-900">
                {c.areaLabel}
              </label>
              <input
                id="community-area-bar"
                type="text"
                value={profile.location.kind === 'virtual' ? '' : profile.location.value}
                onChange={(event) => {
                  const value = event.target.value;
                  setProfile((prev) => ({
                    ...prev,
                    location: {
                      kind: value.trim() === '' ? 'skip' : /^\d{5}$/.test(value.trim()) ? 'zip' : 'city',
                      value
                    }
                  }));
                }}
                placeholder={c.areaPlaceholder}
                className="mt-1 w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-emerald-700 focus:outline-none"
              />
              <button
                type="button"
                onClick={() =>
                  setProfile((prev) => ({
                    ...prev,
                    location:
                      prev.location.kind === 'virtual'
                        ? { kind: 'skip', value: '' }
                        : { kind: 'virtual', value: 'Online' }
                  }))
                }
                aria-pressed={profile.location.kind === 'virtual'}
                className={`mt-2 inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border-2 px-3 py-2.5 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                  profile.location.kind === 'virtual'
                    ? 'border-emerald-700 bg-emerald-50 text-slate-900'
                    : 'border-slate-300 bg-white text-slate-800'
                }`}
              >
                {c.areaVirtual}
              </button>
              <p className="mt-2 text-sm text-slate-600">
                {profile.location.kind === 'skip'
                  ? pick({ en: 'No area chosen yet.', es: 'Todavía no eligió una zona.' }, currentLanguage)
                  : profile.location.kind === 'virtual'
                    ? pick({ en: 'Looking at virtual options.', es: 'Buscando opciones virtuales.' }, currentLanguage)
                    : c.areaSelected(profile.location.value)}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <CommunityChat
            language={currentLanguage}
            messages={messages}
            onSend={runTurn}
            onQuickReply={handleQuickReply}
            isThinking={isThinking}
          />

          <IntakeWizard
            language={currentLanguage}
            profile={profile}
            step={wizardStep}
            canFinish={canFinish}
            onStepChange={setWizardStep}
            onChange={(patch) => setProfile((prev) => mergeProfilePatch(prev, patch))}
            onFinish={openResults}
            onRestart={restart}
            onSpeakToPerson={() => {
              setShowPerson(true);
              scrollTo('community-person');
            }}
          />
        </div>

        <div id="community-results" className="mt-10 scroll-mt-24">
          {resultsVisible ? (
            <CommunityResults
              language={currentLanguage}
              profile={profile}
              outcome={outcome}
              onEditPreferences={() => {
                setWizardStep(0);
                scrollTo('community-intake-heading');
              }}
              onSpeakToPerson={() => {
                setShowPerson(true);
                scrollTo('community-person');
              }}
            />
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-extrabold text-slate-900">{c.resultsHeading}</h2>
              <p className="mt-1 text-base text-slate-700">
                {pick(
                  {
                    en: 'Answer a question or two and matching options appear here. Nothing is saved unless you ask.',
                    es: 'Responda una o dos preguntas y las opciones aparecerán aquí. Nada se guarda salvo que lo pida.'
                  },
                  currentLanguage
                )}
              </p>
            </div>
          )}
        </div>

        {showPerson && (
          <section
            id="community-person"
            aria-labelledby="community-person-heading"
            className="mt-10 scroll-mt-24 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
          >
            <h2 id="community-person-heading" className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
              <Phone className="h-5 w-5 text-emerald-800" aria-hidden="true" />
              {c.personHeading}
            </h2>
            <p className="mt-2 max-w-3xl text-base text-slate-800">{c.personBody}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="tel:211"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {c.call211}
              </a>
              <a
                href="https://211bayarea.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-emerald-700 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-white/60"
              >
                {c.visit211}
              </a>
            </div>
          </section>
        )}

        <section
          aria-labelledby="community-privacy-heading"
          className="mt-10 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <h2 id="community-privacy-heading" className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
            <ShieldCheck className="h-5 w-5 text-emerald-800" aria-hidden="true" />
            {c.privacyHeading}
          </h2>
          <p className="mt-2 max-w-3xl text-base text-slate-700">{c.privacyBody}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-sm font-bold text-slate-800">
              <input
                type="checkbox"
                checked={saveTranscript}
                onChange={(event) => setSaveTranscript(event.target.checked)}
                className="h-5 w-5 accent-emerald-700"
              />
              {c.saveConversation}
            </label>
            <button
              type="button"
              onClick={restart}
              className="inline-flex min-h-[48px] items-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              {c.resetConversation}
            </button>
          </div>
          {saveTranscript && (
            <p className="mt-2 text-sm font-semibold text-emerald-800">{c.savedNotice}</p>
          )}
        </section>
      </div>
    </main>
  );
};
