import React from 'react';
import { Language, IntakeProfile } from '../types';
import { translations } from '../data/translations';
import { X } from 'lucide-react';
import { ReadAloudButton } from '../speech/ReadAloudButton';

interface HeroConversationalSearchProps {
  currentLanguage: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExecuteSearch: (query: string) => void;
  onOpenVoiceModal: () => void;
  onSelectPrompt: (promptText: string) => void;
  onOpenCopilot: () => void;
  onOpenArchitecture: () => void;
  onOpenIntroductionForm: (source?: string) => void;
  onClearProfile: () => void;
  userProfile: IntakeProfile | null;
  matchedCount: number;
  onClearSearch: () => void;
}

export const HeroConversationalSearch: React.FC<HeroConversationalSearchProps> = ({
  currentLanguage,
  searchQuery,
  onSearchChange,
  onExecuteSearch,
  onOpenIntroductionForm,
  matchedCount,
  onClearSearch
}) => {
  const t = translations[currentLanguage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onExecuteSearch(searchQuery);
    }
  };

  return (
    <section aria-labelledby="hero-title" className="qc-hero overflow-hidden">
      <div className="qc-pool" aria-hidden="true" />

      <div className="qc-shell">
        <h1 id="hero-title" className="qc-h1 qc-rise" style={{ animationDelay: '.25s' }}>
          {t.hero.title}
        </h1>

        <p className="qc-sub qc-rise" style={{ animationDelay: '.45s' }}>
          {t.hero.subtitle}
        </p>

        <ReadAloudButton
          id="home-hero"
          kind="heading"
          language={currentLanguage}
          label={currentLanguage === 'en' ? 'Page heading and introduction' : 'Título e introducción de la página'}
          text={`${t.hero.title}. ${t.hero.subtitle}`}
          className="mt-5 qc-rise"
        />

        <form
          onSubmit={handleSubmit}
          role="search"
          className="qc-sf qc-rise"
          style={{ animationDelay: '.6s' }}
        >
          <label htmlFor="search-input" className="sr-only">
            {t.hero.inputPlaceholder}
          </label>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.hero.inputPlaceholder}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={onClearSearch}
              className="min-h-0 p-2 mr-1 rounded-full text-[#7d7a94] hover:text-[#047857] transition-colors"
              title={currentLanguage === 'en' ? 'Clear search' : 'Borrar búsqueda'}
              aria-label={currentLanguage === 'en' ? 'Clear search' : 'Borrar búsqueda'}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          <button type="submit" className="qc-btn">
            {t.hero.searchButton} →
          </button>
        </form>

        <div className="qc-rise" style={{ marginTop: '16px', animationDelay: '.75s' }}>
          <p className="mb-2 text-sm text-slate-600">
            <span className="mr-2 text-slate-600">{currentLanguage === 'en' ? 'Not sure where to start?' : '¿No sabe por dónde empezar?'}</span>
            <a
              href="#quick-questions"
              onClick={(event) => {
                event.preventDefault();
                onOpenIntroductionForm('hero-link');
              }}
              className="inline-flex min-h-[44px] items-center gap-1 text-base font-semibold text-[#047857] underline decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047857] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {currentLanguage === 'en' ? 'Answer 4 quick questions (about 2 minutes) →' : 'Responda 4 preguntas rápidas (unos 2 minutos) →'}
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
