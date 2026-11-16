import React from 'react';
import { Language } from '../types';

interface HomeHowItWorksProps {
  currentLanguage: Language;
  onFocusSearch: () => void;
  onBrowseCategories: () => void;
  onOpenSavedDrawer: () => void;
}

/**
 * Three plain-language steps so a first-time visitor can see what the site
 * does and jump straight into it. Each step is a real entry point, not copy.
 */
export const HomeHowItWorks: React.FC<HomeHowItWorksProps> = ({
  currentLanguage,
  onFocusSearch,
  onBrowseCategories,
  onOpenSavedDrawer
}) => {
  const isEnglish = currentLanguage === 'en';

  const steps = [
    {
      title: isEnglish ? 'Ask a question' : 'Haga una pregunta',
      description: isEnglish
        ? 'Type what you need in everyday words. Ask WhatSack answers with steps you can check.'
        : 'Escriba lo que necesita en palabras sencillas. Ask WhatSack responde con pasos que puede revisar.',
      action: isEnglish ? 'Go to the question box' : 'Ir a la pregunta',
      onClick: onFocusSearch
    },
    {
      title: isEnglish ? 'Browse four categories' : 'Explore cuatro categorías',
      description: isEnglish
        ? 'Food, education, community and mental health. Each one opens the same resource directory.'
        : 'Comida, educación, comunidad y salud mental. Cada una abre el mismo directorio de recursos.',
      action: isEnglish ? 'See the categories' : 'Ver las categorías',
      onClick: onBrowseCategories
    },
    {
      title: isEnglish ? 'Keep your next steps' : 'Guarde sus próximos pasos',
      description: isEnglish
        ? 'Save listings and actions in My Next Steps, then come back when you are ready.'
        : 'Guarde recursos y acciones en Mis Próximos Pasos y vuelva cuando quiera.',
      action: isEnglish ? 'Open My Next Steps' : 'Abrir Mis Próximos Pasos',
      onClick: onOpenSavedDrawer
    }
  ];

  return (
    <section aria-labelledby="how-it-works-heading" className="qc-shell qc-how">
      <div className="qc-how-head">
        <p className="qc-eyebrow">{isEnglish ? 'How it works' : 'Cómo funciona'}</p>
        <h2 id="how-it-works-heading" className="qc-how-title">
          {isEnglish ? 'Three simple ways to start' : 'Tres formas sencillas de empezar'}
        </h2>
      </div>

      <ol className="qc-how-list">
        {steps.map((step, index) => (
          <li key={step.title} className="qc-how-step">
            <span className="qc-how-number" aria-hidden="true">{index + 1}</span>
            <h3 className="qc-how-step-title">{step.title}</h3>
            <p className="qc-how-step-text">{step.description}</p>
            <button type="button" className="qc-how-link" onClick={step.onClick}>
              {step.action} <span aria-hidden="true">→</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
};
