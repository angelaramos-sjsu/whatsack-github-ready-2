import React, { useEffect, useRef, useState } from 'react';
import { ACCESS_LABELS, connectorCopy, INTAKE_QUESTIONS, labelFor } from '../../community/copy';
import { INTAKE_QUESTION_IDS, answeredCount } from '../../community/intake';
import { languageLabel } from '../../community/languages';
import {
  AccessNeed,
  ActivityInterest,
  ConnectorGoal,
  IntakeAnswers,
  IntakeQuestionId,
  IntakeState,
  LanguagePreference,
  LocationPreference,
  NextStepChoice,
  TimePreference,
  UiLanguage
} from '../../community/types';
import { LanguageSelector } from './LanguageSelector';
import { ArrowLeft, ArrowRight, Check, Pencil, RotateCcw, SkipForward } from 'lucide-react';

interface IntakeWizardProps {
  state: IntakeState;
  uiLanguage: UiLanguage;
  onAnswer: (value: IntakeAnswers[IntakeQuestionId]) => void;
  onSkip: () => void;
  onBack: () => void;
  onEdit: (id: IntakeQuestionId) => void;
  onRestart: () => void;
}

type Draft = string | string[] | LocationPreference | LanguagePreference | null;

function initialDraft(id: IntakeQuestionId, answers: IntakeAnswers): Draft {
  const value = answers[id];
  if (id === 'goals') return ((value as ConnectorGoal[] | undefined) ?? [])[0] ?? null;
  if (id === 'interests' || id === 'access') return (value as string[] | undefined) ?? [];
  if (id === 'location') return (value as LocationPreference | undefined) ?? { virtual: false };
  if (id === 'language') return (value as LanguagePreference | undefined) ?? null;
  return (value as string | undefined) ?? null;
}

function summarizeAnswer(id: IntakeQuestionId, answers: IntakeAnswers, language: UiLanguage): string {
  const value = answers[id];
  if (value === undefined) return connectorCopy[language].answerNotSet;
  if (id === 'location') {
    const location = value as LocationPreference;
    if (location.virtual && !location.city && !location.zip) {
      return language === 'en' ? 'Virtual' : 'Virtual';
    }
    return [location.city, location.zip].filter(Boolean).join(' · ') || connectorCopy[language].answerNotSet;
  }
  if (id === 'language') {
    return languageLabel(value as LanguagePreference, language);
  }
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        id === 'access' ? ACCESS_LABELS[item as string]?.[language] ?? item : labelFor(item as string, language)
      )
      .join(', ');
  }
  return labelFor(value as string, language);
}

const CITIES = [
  'San Jose',
  'Santa Clara',
  'Sunnyvale',
  'Cupertino',
  'Campbell',
  'Milpitas',
  'Mountain View',
  'Palo Alto',
  'Redwood City',
  'Gilroy',
  'Morgan Hill',
  'Los Gatos',
  'Los Altos'
];

export const IntakeWizard: React.FC<IntakeWizardProps> = ({
  state,
  uiLanguage,
  onAnswer,
  onSkip,
  onBack,
  onEdit,
  onRestart
}) => {
  const c = connectorCopy[uiLanguage];
  const question = INTAKE_QUESTIONS[state.currentQuestion];
  const [draft, setDraft] = useState<Draft>(() => initialDraft(question.id, state.answers));
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setDraft(initialDraft(question.id, state.answers));
    setError(null);
    headingRef.current?.focus();
    // Only react to moving to another question.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const total = INTAKE_QUESTION_IDS.length;
  const position = state.currentQuestion + 1;
  const isLast = state.currentQuestion === total - 1;

  const canContinue = (() => {
    if (question.kind === 'single') return typeof draft === 'string' && draft.length > 0;
    if (question.kind === 'multiple') return Array.isArray(draft) && draft.length > 0;
    if (question.kind === 'location') {
      const location = draft as LocationPreference;
      return Boolean(location?.virtual || location?.city?.trim() || location?.zip?.trim());
    }
    if (question.kind === 'language') {
      return Boolean((draft as LanguagePreference | null)?.code);
    }
    return false;
  })();

  const handleContinue = () => {
    if (!canContinue) {
      setError(
        uiLanguage === 'en'
          ? 'Choose an answer, or use Skip to move on.'
          : 'Elija una respuesta, o use Omitir para continuar.'
      );
      return;
    }
    setError(null);
    if (question.kind === 'single') {
      if (question.id === 'goals') {
        onAnswer([draft as string] as ConnectorGoal[]);
      } else if (question.id === 'time') {
        onAnswer(draft as TimePreference);
      } else {
        onAnswer(draft as NextStepChoice);
      }
      return;
    }
    if (question.kind === 'multiple') {
      onAnswer(question.id === 'access' ? (draft as AccessNeed[]) : (draft as ActivityInterest[]));
      return;
    }
    if (question.kind === 'location') {
      const location = draft as LocationPreference;
      onAnswer({
        virtual: Boolean(location.virtual),
        city: location.city?.trim() || undefined,
        zip: location.zip?.trim() || undefined
      });
      return;
    }
    if (question.kind === 'language') {
      onAnswer(draft as LanguagePreference);
    }
  };

  const toggleMultiple = (value: string) => {
    setDraft((current) => {
      const list = Array.isArray(current) ? current : [];
      if (value === 'none') return list.includes('none') ? [] : ['none'];
      const withoutNone = list.filter((item) => item !== 'none');
      return withoutNone.includes(value)
        ? withoutNone.filter((item) => item !== value)
        : [...withoutNone, value];
    });
  };

  const answeredEntries = INTAKE_QUESTION_IDS.filter(
    (id) => state.answers[id] !== undefined && !state.skipped.includes(id)
  );

  return (
    <section aria-labelledby="connector-intake-heading" className="rounded-3xl border-2 border-purple-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wider text-purple-800">
            {c.questionOf} {position} / {total}
          </p>
          <h2 id="connector-intake-heading" className="text-lg font-extrabold text-slate-900">
            {uiLanguage === 'en' ? 'Guided questions' : 'Preguntas guiadas'}
          </h2>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-xs font-extrabold text-slate-800 hover:bg-slate-100"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          {c.restart}
        </button>
      </div>

      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={position}
        aria-label={uiLanguage === 'en' ? 'Question progress' : 'Progreso de preguntas'}
        className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-purple-100"
      >
        <div className="h-full rounded-full bg-purple-700 transition-all" style={{ width: `${(position / total) * 100}%` }} />
      </div>

      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 text-xl font-extrabold leading-snug text-slate-900 focus:outline-none"
      >
        {question.title[uiLanguage]}
      </h3>
      <p className="mt-1 text-sm font-medium text-slate-700">{question.help[uiLanguage]}</p>

      <div className="mt-4">
        {question.kind === 'single' && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(question.options ?? []).map((option) => {
              const selected = draft === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setDraft(option.value);
                    setError(null);
                  }}
                  aria-pressed={selected}
                  className={`flex min-h-[56px] items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition-colors ${
                    selected
                      ? 'border-purple-700 bg-purple-50 text-purple-950 ring-2 ring-purple-700/20'
                      : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{option.label[uiLanguage]}</span>
                  {selected && <Check className="h-5 w-5 shrink-0 text-purple-800" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        )}

        {question.kind === 'multiple' && (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(question.options ?? []).map((option) => {
              const list = Array.isArray(draft) ? draft : [];
              const selected = list.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleMultiple(option.value)}
                  aria-pressed={selected}
                  className={`flex min-h-[56px] items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition-colors ${
                    selected
                      ? 'border-purple-700 bg-purple-50 text-purple-950 ring-2 ring-purple-700/20'
                      : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{option.label[uiLanguage]}</span>
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-[11px] font-black ${
                      selected ? 'border-purple-700 bg-purple-700 text-white' : 'border-slate-400 text-transparent'
                    }`}
                  >
                    ✓
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {question.kind === 'location' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="intake-city" className="mb-1 block text-xs font-extrabold uppercase tracking-wider text-slate-800">
                  {uiLanguage === 'en' ? 'City' : 'Ciudad'}
                </label>
                <input
                  id="intake-city"
                  list="connector-city-options"
                  value={(draft as LocationPreference)?.city ?? ''}
                  onChange={(event) =>
                    setDraft({ ...(draft as LocationPreference), city: event.target.value, virtual: false })
                  }
                  className="min-h-[52px] w-full rounded-xl border-2 border-slate-300 px-3 py-3 text-sm font-semibold text-slate-900"
                  placeholder={uiLanguage === 'en' ? 'e.g. San Jose' : 'ej. San José'}
                />
                <datalist id="connector-city-options">
                  {CITIES.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
              <div>
                <label htmlFor="intake-zip" className="mb-1 block text-xs font-extrabold uppercase tracking-wider text-slate-800">
                  {uiLanguage === 'en' ? 'or ZIP code' : 'o código postal'}
                </label>
                <input
                  id="intake-zip"
                  inputMode="numeric"
                  value={(draft as LocationPreference)?.zip ?? ''}
                  onChange={(event) =>
                    setDraft({ ...(draft as LocationPreference), zip: event.target.value, virtual: false })
                  }
                  className="min-h-[52px] w-full rounded-xl border-2 border-slate-300 px-3 py-3 text-sm font-semibold text-slate-900"
                  placeholder="95116"
                />
              </div>
            </div>

            <label className="flex min-h-[52px] cursor-pointer items-center gap-3 rounded-xl border-2 border-slate-300 bg-white px-3 py-2">
              <input
                type="checkbox"
                checked={Boolean((draft as LocationPreference)?.virtual)}
                onChange={(event) =>
                  setDraft({
                    ...(draft as LocationPreference),
                    virtual: event.target.checked,
                    city: event.target.checked ? undefined : (draft as LocationPreference)?.city,
                    zip: event.target.checked ? undefined : (draft as LocationPreference)?.zip
                  })
                }
                className="h-5 w-5 accent-purple-700"
              />
              <span className="text-sm font-bold text-slate-900">
                {uiLanguage === 'en' ? 'Virtual — I would rather join from home' : 'Virtual — prefiero participar desde casa'}
              </span>
            </label>

            <p className="text-xs font-semibold text-slate-600">{c.requiredNote}</p>
          </div>
        )}

        {question.kind === 'language' && (
          <LanguageSelector
            value={draft as LanguagePreference | null}
            onChange={(value) => setDraft(value)}
            uiLanguage={uiLanguage}
            idPrefix="intake"
          />
        )}
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm font-bold text-red-900">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onBack}
          disabled={state.currentQuestion === 0}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-900 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {c.back}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-extrabold text-slate-700 underline hover:text-slate-950"
        >
          <SkipForward className="h-4 w-4" aria-hidden="true" />
          {c.skip}
        </button>
        <button
          type="button"
          onClick={handleContinue}
          className="ml-auto inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-purple-700 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-purple-800"
        >
          <span>{isLast ? c.finish : c.next}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {answeredEntries.length > 0 && (
        <div className="mt-5 border-t border-slate-200 pt-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">{c.reviewTitle}</h4>
          <ul className="mt-2 space-y-2">
            {answeredEntries.map((id) => (
              <li key={id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {INTAKE_QUESTIONS.find((item) => item.id === id)?.title[uiLanguage]}
                  </p>
                  <p className="truncate text-sm font-bold text-slate-900">{summarizeAnswer(id, state.answers, uiLanguage)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onEdit(id)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-extrabold text-slate-800 hover:bg-white"
                >
                  <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  {c.edit}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs font-semibold text-slate-600">
        {answeredCount(state)} / {total} {uiLanguage === 'en' ? 'answered' : 'respondidas'}
      </p>
    </section>
  );
};
