import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Language } from '../types';
import type { GoalPathwayChoice } from '../data/answers';

/**
 * Progressive-disclosure goal selector for reviewed Sofia/Daniel pathways.
 * This is a question within Ask Sackie, not the optional four-step intake form.
 * All controls remain native, keyboard-operable buttons with visible focus.
 */
export const PathwayChoiceList: React.FC<{
  choices: GoalPathwayChoice[];
  currentLanguage: Language;
  onSelect: (answerId: string, label: string) => void;
  disabled?: boolean;
}> = ({ choices, currentLanguage, onSelect, disabled = false }) => (
  <section className="mt-4 border-t border-slate-700/70 pt-4" aria-label={
    currentLanguage === 'en' ? 'Explore your education or career options' : 'Explore sus opciones de estudios o empleo'
  }>
    <p className="mb-3 text-sm font-semibold text-emerald-200">
      {currentLanguage === 'en'
        ? 'Choose one to see resources and your next step. You can explore other options later.'
        : 'Elija una opción para ver recursos y el siguiente paso. Puede explorar otras opciones después.'}
    </p>
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {choices.map((choice) => (
        <li key={choice.id} className="flex">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect(choice.answerId, choice.label[currentLanguage])}
            className="flex w-full min-h-[52px] items-center justify-between gap-2 rounded-xl border border-emerald-500/70 bg-slate-900/80 px-3 py-3 text-left text-sm font-medium leading-5 text-white transition-colors hover:bg-emerald-900/60 hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-wait disabled:opacity-50"
          >
            <span>{choice.label[currentLanguage]}</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-300" />
          </button>
        </li>
      ))}
    </ul>
  </section>
);
