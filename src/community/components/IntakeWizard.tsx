import React, { useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Phone, RotateCcw, Users } from 'lucide-react';
import {
  accessLabels,
  copy,
  interestLabels,
  intentLabels,
  languageLabels,
  pick,
  timingLabels
} from '../i18n';
import { LanguageSelector } from './LanguageSelector';
import type {
  AccessibilityPreference,
  ActivityInterest,
  CommunityIntentId,
  CommunityProfile,
  TimePreference,
  UiLanguage
} from '../types';

const TOTAL_QUESTIONS = 7;

const intentOrder: CommunityIntentId[] = [
  'meet-people',
  'community-events',
  'clubs-groups',
  'senior-activities',
  'volunteering',
  'explore'
];

const interestOrder: ActivityInterest[] = ['arts', 'music', 'exercise', 'cultural', 'games', 'learning', 'other'];
const accessOrder: AccessibilityPreference[] = ['wheelchair', 'transit-nearby', 'transportation-help', 'virtual'];
const timingOrder: TimePreference[] = ['weekday-morning', 'weekday-afternoon', 'evening', 'weekend', 'anytime'];

interface ChoiceButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  hint?: string;
}

const ChoiceButton: React.FC<ChoiceButtonProps> = ({ selected, onClick, children, hint }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`flex w-full min-h-[52px] items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 ${
      selected
        ? 'border-emerald-700 bg-emerald-50 text-slate-900'
        : 'border-slate-300 bg-white text-slate-800 hover:border-emerald-500'
    }`}
  >
    <span>
      {children}
      {hint && <span className="mt-0.5 block text-sm font-normal text-slate-600">{hint}</span>}
    </span>
    <span
      aria-hidden="true"
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
        selected ? 'border-emerald-700 bg-emerald-700' : 'border-slate-400 bg-white'
      }`}
    >
      {selected && <span className="h-2 w-2 rounded-full bg-white" />}
    </span>
  </button>
);

interface IntakeWizardProps {
  language: UiLanguage;
  profile: CommunityProfile;
  step: number;
  canFinish: boolean;
  onStepChange: (step: number) => void;
  onChange: (patch: Partial<CommunityProfile>) => void;
  onFinish: () => void;
  onRestart: () => void;
  onSpeakToPerson: () => void;
}

/**
 * Seven questions, one at a time, with skip, back, edit and restart.
 * Every answer is optional except that "show matching activities" needs a
 * starting point (what they want and where), which the helper text explains.
 */
export const IntakeWizard: React.FC<IntakeWizardProps> = ({
  language,
  profile,
  step,
  canFinish,
  onStepChange,
  onChange,
  onFinish,
  onRestart,
  onSpeakToPerson
}) => {
  const c = copy[language];
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const safeStep = Math.min(Math.max(step, 0), TOTAL_QUESTIONS - 1);

  useEffect(() => {
    headingRef.current?.focus();
  }, [safeStep]);

  const toggleInterest = (interest: ActivityInterest) => {
    const next = profile.interests.includes(interest)
      ? profile.interests.filter((item) => item !== interest)
      : [...profile.interests, interest];
    onChange({ interests: next });
  };

  const toggleAccess = (value: AccessibilityPreference) => {
    const next = profile.access.includes(value)
      ? profile.access.filter((item) => item !== value)
      : [...profile.access, value];
    onChange({ access: next });
  };

  const setStep = (next: number) => onStepChange(Math.min(Math.max(next, 0), TOTAL_QUESTIONS - 1));

  const updateArea = (value: string) => {
    const trimmed = value;
    const kind = trimmed.trim() === '' ? 'skip' : /^\d{5}$/.test(trimmed.trim()) ? 'zip' : 'city';
    onChange({ location: { kind, value: trimmed } });
  };

  const summaryRows: Array<{ label: string; value: string; step: number }> = [
    {
      label: pick({ en: 'Looking for', es: 'Busca' }, language),
      value: profile.intent ? intentLabels[profile.intent][language] : c.notAnswered,
      step: 0
    },
    {
      label: pick({ en: 'Activities', es: 'Actividades' }, language),
      value:
        profile.interests.length > 0
          ? profile.interests.map((interest) => interestLabels[interest][language]).join(', ')
          : c.notAnswered,
      step: 1
    },
    {
      label: pick({ en: 'Area', es: 'Zona' }, language),
      value:
        profile.location.kind === 'virtual'
          ? pick({ en: 'Virtual activities', es: 'Actividades virtuales' }, language)
          : profile.location.value || c.notAnswered,
      step: 2
    },
    {
      label: pick({ en: 'Language', es: 'Idioma' }, language),
      value:
        profile.language === 'other'
          ? c.notAnswered
          : languageLabels[profile.language][language],
      step: 3
    },
    {
      label: pick({ en: 'Access and transport', es: 'Acceso y transporte' }, language),
      value:
        profile.access.length > 0
          ? profile.access.map((item) => accessLabels[item][language]).join(', ')
          : c.notAnswered,
      step: 4
    },
    {
      label: pick({ en: 'When', es: 'Cuándo' }, language),
      value: timingLabels[profile.timing][language],
      step: 5
    }
  ];

  const renderQuestion = () => {
    switch (safeStep) {
      case 0:
        return (
          <div className="grid gap-2">
            {intentOrder.map((intent) => (
              <ChoiceButton
                key={intent}
                selected={profile.intent === intent}
                onClick={() => {
                  onChange({ intent });
                  setStep(1);
                }}
              >
                {intentLabels[intent][language]}
              </ChoiceButton>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="grid gap-2">
            {interestOrder.map((interest) => (
              <ChoiceButton
                key={interest}
                selected={profile.interests.includes(interest)}
                onClick={() => toggleInterest(interest)}
              >
                {interestLabels[interest][language]}
              </ChoiceButton>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="community-area" className="block text-base font-bold text-slate-900">
                {c.areaLabel}
              </label>
              <input
                id="community-area"
                type="text"
                value={profile.location.kind === 'virtual' ? '' : profile.location.value}
                onChange={(event) => updateArea(event.target.value)}
                placeholder={c.areaPlaceholder}
                autoComplete="postal-code"
                className="mt-1 w-full min-h-[52px] rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-emerald-700 focus:outline-none"
              />
              <p className="mt-1 text-sm text-slate-600">
                {pick(
                  {
                    en: 'A city or ZIP code is enough. We never ask for a street address.',
                    es: 'Con una ciudad o código postal es suficiente. Nunca pedimos una dirección exacta.'
                  },
                  language
                )}
              </p>
            </div>
            <ChoiceButton
              selected={profile.location.kind === 'virtual'}
              onClick={() =>
                onChange({
                  location:
                    profile.location.kind === 'virtual'
                      ? { kind: 'skip', value: '' }
                      : { kind: 'virtual', value: 'Online' }
                })
              }
            >
              {c.areaVirtual}
            </ChoiceButton>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <LanguageSelector
              language={language}
              value={profile.language}
              region={profile.region}
              onChange={(value) => onChange({ language: value })}
              onRegionChange={(region) => onChange({ region })}
            />
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-slate-800">
              {c.languageNotice}
            </p>
          </div>
        );
      case 4:
        return (
          <div className="grid gap-2">
            {accessOrder.map((item) => (
              <ChoiceButton
                key={item}
                selected={profile.access.includes(item)}
                onClick={() => toggleAccess(item)}
              >
                {accessLabels[item][language]}
              </ChoiceButton>
            ))}
            <ChoiceButton selected={profile.access.length === 0} onClick={() => onChange({ access: [] })}>
              {pick({ en: 'No preference', es: 'Sin preferencia' }, language)}
            </ChoiceButton>
          </div>
        );
      case 5:
        return (
          <div className="grid gap-2">
            {timingOrder.map((timing) => (
              <ChoiceButton
                key={timing}
                selected={profile.timing === timing}
                onClick={() => onChange({ timing })}
              >
                {timingLabels[timing][language]}
              </ChoiceButton>
            ))}
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <button
                type="button"
                onClick={onFinish}
                disabled={!canFinish}
                className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-base font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                {c.showMatches}
              </button>
              <button
                type="button"
                onClick={onSpeakToPerson}
                className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-emerald-700 bg-white px-4 py-3 text-base font-bold text-slate-900 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {c.speakToPerson}
              </button>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-bold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                <Users className="h-5 w-5" aria-hidden="true" />
                {c.changePreferences}
              </button>
            </div>

            {!canFinish && (
              <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-slate-800">
                {pick(
                  {
                    en: 'Choose what you are looking for and an area (or virtual) to see options.',
                    es: 'Elija qué busca y una zona (o virtual) para ver opciones.'
                  },
                  language
                )}
              </p>
            )}

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-bold text-slate-900">{c.knownAnswers}</h3>
              <dl className="mt-2 space-y-2">
                {summaryRows.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-3 text-sm">
                    <div>
                      <dt className="font-bold text-slate-700">{row.label}</dt>
                      <dd className="text-slate-800">{row.value}</dd>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(row.step)}
                      className="shrink-0 rounded-lg px-2 py-1 font-bold text-emerald-800 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                    >
                      {c.edit}
                    </button>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        );
    }
  };

  return (
    <section
      aria-labelledby="community-intake-heading"
      className="w-full min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-emerald-800">
            {c.question(safeStep + 1, TOTAL_QUESTIONS)}
          </p>
          <h2
            id="community-intake-heading"
            ref={headingRef}
            tabIndex={-1}
            className="mt-1 text-xl font-extrabold tracking-[-0.02em] text-slate-900 outline-none"
          >
            {[
              pick({ en: 'What would you like help finding today?', es: '¿Qué le gustaría encontrar hoy?' }, language),
              pick({ en: 'What kinds of activities interest you?', es: '¿Qué tipo de actividades le interesan?' }, language),
              pick({ en: 'Where would you like to find activities?', es: '¿Dónde le gustaría encontrar actividades?' }, language),
              pick({ en: 'What language would you prefer?', es: '¿Qué idioma prefiere?' }, language),
              pick({ en: 'Do you have accessibility or transportation preferences?', es: '¿Tiene preferencias de accesibilidad o transporte?' }, language),
              pick({ en: 'When would you like to participate?', es: '¿Cuándo le gustaría participar?' }, language),
              pick({ en: 'What would you like to do next?', es: '¿Qué le gustaría hacer ahora?' }, language)
            ][safeStep]}
          </h2>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {c.restart}
        </button>
      </div>

      <div className="mt-3">
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={TOTAL_QUESTIONS}
          aria-valuenow={safeStep + 1}
          aria-valuetext={c.question(safeStep + 1, TOTAL_QUESTIONS)}
          className="h-2 overflow-hidden rounded-full bg-emerald-100"
        >
          <div
            className="h-full rounded-full bg-emerald-700 transition-all duration-200"
            style={{ width: `${((safeStep + 1) / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-5">{renderQuestion()}</div>

      {safeStep < TOTAL_QUESTIONS - 1 && (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
          <button
            type="button"
            onClick={() => setStep(safeStep - 1)}
            disabled={safeStep === 0}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {c.back}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStep(safeStep + 1)}
              className="inline-flex min-h-[48px] items-center rounded-xl border-2 border-emerald-700 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              {c.skip}
            </button>
            <button
              type="button"
              onClick={() => setStep(safeStep + 1)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              {c.next}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
