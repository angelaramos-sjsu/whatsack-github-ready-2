import React from 'react';
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

  return (
    <div className="rounded-xl border border-emerald-800/60 bg-emerald-950/40 p-3">
      <p className="text-xs font-bold text-slate-100">
        {typeof index === 'number' && <span className="text-emerald-400">{index + 1}. </span>}
        {step.title[lang]}
      </p>
      <p className="text-[11px] leading-relaxed text-slate-300 mt-0.5">{step.detail[lang]}</p>
      <button
        type="button"
        disabled={isStepSaved}
        onClick={() => onSaveStep({ id: stepId, title: step.title, detail: step.detail })}
        className="mt-3 inline-flex items-center gap-2 min-h-[44px] px-3 py-2 rounded-lg border border-emerald-500 bg-emerald-900/50 text-white text-xs font-semibold disabled:opacity-70 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
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
                className="inline-flex items-center gap-1.5 min-h-[32px] px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-300"
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
              className={`inline-flex items-center gap-1.5 min-h-[32px] px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-300 ${
                isSaved
                  ? 'bg-slate-800 text-emerald-300 border-emerald-700/70'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-600'
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

  if (links.length === 0 && !nextStep && nextSteps.length === 0 && answer.context.length === 0) return null;

  return (
    <div className="mt-4 space-y-3">
      {/* Context carried into this answer */}
      {answer.context.length > 0 && (
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {isEn ? 'Context kept in view:' : 'Contexto en cuenta:'}{' '}
          <span className="normal-case tracking-normal text-slate-300">
            {answer.context.map((tag) => tag[lang]).join(' · ')}
          </span>
        </p>
      )}

      {/* Official resource links */}
      {links.length > 0 && (
        <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            {isEn ? 'Official resources' : 'Recursos oficiales'}
          </span>
          <ul className="space-y-1.5">
            {links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2 text-[11px] sm:text-xs text-emerald-300 hover:text-emerald-200 underline underline-offset-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
                >
                  <ExternalLink className="w-3.5 h-3.5 mt-px shrink-0" aria-hidden="true" />
                  <span>
                    {link.label[lang]}
                    <span className="block text-[10px] text-slate-400 no-underline">
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              {isEn ? 'Your NextStep Insights' : 'Sus siguientes pasos'}
            </span>
          </div>
          {nextSteps.map((step, index) => (
            <NextStepCard
              key={step.title.en}
              step={step}
              stepId={`${answer.id}-next-steps-${index}`}
              savedSteps={savedSteps}
              onSaveStep={onSaveStep}
              index={index}
              currentLanguage={currentLanguage}
              savedResourceIds={savedResourceIds}
              onSavePlan={onSavePlan}
            />
          ))}
        </div>
      )}
    </div>
  );
};
