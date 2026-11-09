import React, { useState } from 'react';
import { Language } from '../types';
import { ScriptedAnswer, ScriptedNextStep, SavedScriptedStep } from '../data/answers';
import { BookmarkPlus, Check, ExternalLink, Sparkles } from 'lucide-react';

interface ScriptedAnswerExtrasProps {
  answer: ScriptedAnswer;
  currentLanguage: Language;
  savedResourceIds: string[];
  onSavePlan: (resourceId: string) => void;
  savedSteps: SavedScriptedStep[];
  onSaveStep: (step: SavedScriptedStep) => void;
}

interface NextStepCardProps {
  step: ScriptedNextStep;
  index?: number;
  currentLanguage: Language;
  savedResourceIds: string[];
  onSavePlan: (resourceId: string) => void;
  savedSteps: SavedScriptedStep[];
  onSaveStep: (step: SavedScriptedStep) => void;
  stepId: string;
}

/** One NextStep Insight: its title, detail and actions. */
const NextStepCard: React.FC<NextStepCardProps> = ({
  step,
  index,
  currentLanguage,
  savedResourceIds,
  onSavePlan,
  savedSteps,
  onSaveStep,
  stepId
}) => {
  const lang = currentLanguage;
  const isEn = currentLanguage === 'en';
  const isStepSaved = savedSteps.some(saved => saved.id === stepId);
  const meta = step.meta;
  const detailItems = [
    { key: 'deadline', label: isEn ? 'Deadline' : 'Fecha límite', value: meta?.deadline },
    { key: 'cost', label: isEn ? 'Cost' : 'Costo', value: meta?.cost },
    { key: 'language', label: isEn ? 'Language' : 'Idioma', value: meta?.language },
    { key: 'contact', label: isEn ? 'Contact' : 'Contacto', value: meta?.contact }
  ].filter((item): item is { key: string; label: string; value: string } => Boolean(item.value));
  const displayMetaValue = (value: string) => {
    const localized = value.replace(/\bunknown\b/gi, isEn ? 'Not stated by source' : 'No indicado en la fuente');
    if (isEn) return localized;
    return localized
      .replace(/\bschool-specific\b/gi, 'específico de la escuela')
      .replace(/No indicado en la fuente for /gi, 'No indicado en la fuente para ')
      .replace(/^Free to apply;/, 'Solicitud gratuita;')
      .replace(/^Usually free;/, 'Por lo general es gratis;');
  };

  return (
    <div className="rounded-xl border border-[#cdeedd] bg-[#eafaf1] p-3">
      <p className="text-base leading-relaxed font-bold text-[#1A1A24]">
        {typeof index === 'number' && <span>{index + 1}. </span>}
        {step.title[lang]}
      </p>
      <p className="text-base leading-relaxed text-[#1A1A24] mt-1">{step.detail[lang]}</p>
      {detailItems.length > 0 && (
        <dl className="mt-2 flex flex-wrap gap-2">
          {detailItems.map((item) => (
            <div key={item.key} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[#cdeedd] bg-white px-2.5 py-1 text-sm text-[#1A1A24]">
              <dt className="font-bold">{item.label}:</dt>
              <dd>{displayMetaValue(item.value)}</dd>
            </div>
          ))}
        </dl>
      )}
      {meta && (
        <p className="mt-2 text-sm text-[#1A1A24]">
          {isEn ? 'Source' : 'Fuente'} ·{' '}
          <a
            href={meta.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
          >
            {isEn ? 'Open official source' : 'Abrir fuente oficial'}
          </a>
          {' · '}
          {isEn ? 'last reviewed' : 'última revisión'} {meta.lastReviewed}
        </p>
      )}
      <button
        type="button"
        disabled={isStepSaved}
        onClick={() => onSaveStep({ id: stepId, title: step.title, detail: step.detail })}
        className="mt-3 inline-flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-lg border border-[#047857] bg-white text-[#1A1A24] text-sm font-semibold disabled:opacity-70 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
      >
        {isStepSaved ? <Check className="w-4 h-4" aria-hidden="true" /> : <BookmarkPlus className="w-4 h-4" aria-hidden="true" />}
        {isStepSaved
          ? (isEn ? 'Added to My Next Steps' : 'Guardado en Mis Próximos Pasos')
          : (isEn ? 'Add step to My Next Steps' : 'Agregar a Mis Próximos Pasos')}
      </button>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {step.actions.map((action) => {
          if (action.kind === 'open-link') {
            return (
              <a
                key={action.id}
                href={action.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-lg border border-[#047857] bg-white text-[#1A1A24] hover:bg-[#e3f3ea] text-sm font-bold transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#047857]"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{action.label[lang]}</span>
              </a>
            );
          }

          const isSaved = savedResourceIds.includes(action.resourceId);
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onSavePlan(action.resourceId)}
              aria-pressed={isSaved}
              className={`inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-lg text-sm font-bold border transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                isSaved
                  ? 'bg-[#e3f3ea] text-[#1A1A24] border-[#047857]'
                  : 'bg-white hover:bg-[#e3f3ea] text-[#1A1A24] border-slate-400'
              }`}
            >
              {isSaved ? (
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              ) : (
                <BookmarkPlus className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>
                {isSaved ? (isEn ? 'Saved to your plan' : 'Guardado en tu plan') : action.label[lang]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Renders the reviewed extras of a scripted answer: the context it carries,
 * official resource links, and its NextStep Insight actions.
 * Action buttons either open an official website or save to the user's plan —
 * they never feed another question back into the chatbot.
 */
export const ScriptedAnswerExtras: React.FC<ScriptedAnswerExtrasProps> = ({
  answer,
  currentLanguage,
  savedResourceIds,
  onSavePlan,
  savedSteps,
  onSaveStep
}) => {
  const lang = currentLanguage;
  const isEn = currentLanguage === 'en';
  const links = answer.links ?? [];
  const nextStep = answer.nextStep;
  const nextSteps = answer.nextSteps ?? [];
  const [showAllNextSteps, setShowAllNextSteps] = useState(false);
  const visibleNextSteps = showAllNextSteps ? nextSteps : nextSteps.slice(0, 3);

  if (links.length === 0 && !nextStep && nextSteps.length === 0 && answer.context.length === 0 && !answer.keepInMind?.length) return null;

  return (
    <div className="mt-4 space-y-3">
      {Boolean(answer.keepInMind?.length) && (
        <section className="rounded-xl border border-[#cdeedd] bg-[#e3f3ea] p-3 text-[#1A1A24]" aria-labelledby={`${answer.id}-keep-in-mind`}>
          <h3 id={`${answer.id}-keep-in-mind`} className="text-base font-bold">
            {isEn ? 'Things to keep in mind' : 'Cosas a tener en cuenta'}
          </h3>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-base leading-relaxed">
            {answer.keepInMind?.map((item, index) => <li key={`${answer.id}-keep-${index}`}>{item[lang]}</li>)}
          </ul>
        </section>
      )}

      {/* Context carried into this answer */}
      {answer.context.length > 0 && (
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          {isEn ? 'Context kept in view:' : 'Contexto en cuenta:'}{' '}
          <span className="normal-case tracking-normal text-slate-300">
            {answer.context.map((tag) => tag[lang]).join(' · ')}
          </span>
        </p>
      )}

      {/* Official resource links */}
      {links.length > 0 && (
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
          <span className="block text-sm font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            {isEn ? 'Official resources' : 'Recursos oficiales'}
          </span>
          <ul className="space-y-1.5">
            {links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[44px] items-start gap-2 py-2 text-base leading-relaxed text-emerald-200 hover:text-white underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 rounded"
                >
                  <ExternalLink className="w-3.5 h-3.5 mt-px shrink-0" aria-hidden="true" />
                  <span>
                    {link.label[lang]}
                    <span className="block text-sm text-slate-300 no-underline">
                      {link.source[lang]} · {isEn ? 'opens in a new tab' : 'abre en una pestaña nueva'}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* NextStep Insight */}
      {nextStep && (
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              {isEn ? 'NextStep Insight' : 'Siguiente paso'}
            </span>
          </div>
          <NextStepCard
            step={nextStep}
            stepId={`${answer.id}-next-step`}
            savedSteps={savedSteps}
            onSaveStep={onSaveStep}
            currentLanguage={currentLanguage}
            savedResourceIds={savedResourceIds}
            onSavePlan={onSavePlan}
          />
        </div>
      )}

      {/* Closing set of NextStep Insights */}
      {nextSteps.length > 0 && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              {isEn ? 'Your NextStep Insights' : 'Sus siguientes pasos'}
            </span>
          </div>
          <div id={`${answer.id}-next-steps`} role="list" className="space-y-1.5">
          {visibleNextSteps.map((step, index) => (
            <div role="listitem" key={step.title.en}>
              <NextStepCard
                step={step}
                stepId={`${answer.id}-next-steps-${index}`}
                savedSteps={savedSteps}
                onSaveStep={onSaveStep}
                index={index}
                currentLanguage={currentLanguage}
                savedResourceIds={savedResourceIds}
                onSavePlan={onSavePlan}
              />
            </div>
          ))}
          </div>
          {nextSteps.length > 3 && (
            <button
              type="button"
              aria-expanded={showAllNextSteps}
              aria-controls={`${answer.id}-next-steps`}
              onClick={() => setShowAllNextSteps((expanded) => !expanded)}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-[#047857] bg-white px-3 py-2 text-sm font-semibold text-[#1A1A24] underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#047857]"
            >
              {showAllNextSteps ? (isEn ? 'Show less' : 'Mostrar menos') : (isEn ? 'Show more' : 'Mostrar más')}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
