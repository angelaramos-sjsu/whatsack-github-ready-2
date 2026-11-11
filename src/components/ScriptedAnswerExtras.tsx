import React from 'react';
import { Language } from '../types';
import { ScriptedAnswer, ScriptedNextStep } from '../data/answers';
import { BookmarkPlus, Check, ExternalLink, Sparkles } from 'lucide-react';

interface ScriptedAnswerExtrasProps {
  answer: ScriptedAnswer;
  currentLanguage: Language;
  savedResourceIds: string[];
  onSavePlan: (resourceId: string) => void;
}

interface NextStepCardProps {
  step: ScriptedNextStep;
  index?: number;
  currentLanguage: Language;
  savedResourceIds: string[];
  onSavePlan: (resourceId: string) => void;
}

/** One NextStep Insight: its title, detail and actions. */
const NextStepCard: React.FC<NextStepCardProps> = ({
  step,
  index,
  currentLanguage,
  savedResourceIds,
  onSavePlan
}) => {
  const lang = currentLanguage;
  const isEn = currentLanguage === 'en';

  return (
    <div className="cp-step">
      <p className="cp-step-title">
        {typeof index === 'number' && <span className="cp-step-idx">{index + 1}.</span>}
        {step.title[lang]}
      </p>
      <p className="cp-step-detail">{step.detail[lang]}</p>

      <div className="cp-step-actions">
        {step.actions.map((action) => {
          if (action.kind === 'open-link') {
            return (
              <a
                key={action.id}
                href={action.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cp-act"
              >
                <ExternalLink aria-hidden="true" />
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
              className={`cp-act ${isSaved ? '' : 'cp-act--solid'}`}
            >
              {isSaved ? <Check aria-hidden="true" /> : <BookmarkPlus aria-hidden="true" />}
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
  onSavePlan
}) => {
  const lang = currentLanguage;
  const isEn = currentLanguage === 'en';
  const links = answer.links ?? [];
  const nextStep = answer.nextStep;
  const nextSteps = answer.nextSteps ?? [];

  if (links.length === 0 && !nextStep && nextSteps.length === 0 && answer.context.length === 0) return null;

  return (
    <div className="cp-extras">
      {/* Context carried into this answer */}
      {answer.context.length > 0 && (
        <p className="cp-context">
          {isEn ? 'Context kept in view' : 'Contexto en cuenta'}:{' '}
          <span>{answer.context.map((tag) => tag[lang]).join(' · ')}</span>
        </p>
      )}

      {/* Official resource links */}
      {links.length > 0 && (
        <div className="cp-links">
          <span className="cp-links-label">
            {isEn ? 'Official resources' : 'Recursos oficiales'}
          </span>
          <ul>
            {links.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink aria-hidden="true" />
                  <span>
                    {link.label[lang]}
                    <small>
                      {link.source[lang]} · {isEn ? 'opens in a new tab' : 'abre en una pestaña nueva'}
                    </small>
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
          <div className="cp-step-label">
            <Sparkles aria-hidden="true" />
            <span>{isEn ? 'NextStep Insight' : 'Siguiente paso'}</span>
          </div>
          <NextStepCard
            step={nextStep}
            currentLanguage={currentLanguage}
            savedResourceIds={savedResourceIds}
            onSavePlan={onSavePlan}
          />
        </div>
      )}

      {/* Closing set of NextStep Insights */}
      {nextSteps.length > 0 && (
        <div>
          <div className="cp-step-label">
            <Sparkles aria-hidden="true" />
            <span>{isEn ? 'Your NextStep Insights' : 'Sus siguientes pasos'}</span>
          </div>
          {nextSteps.map((step, index) => (
            <NextStepCard
              key={step.title.en}
              step={step}
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
