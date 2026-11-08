import React from 'react';
import { CategoryId, IntakeProfile, Language } from '../types';
import { translations } from '../data/translations';
import { categoryDescription, directoryCategories } from '../data/categories';
import { CategoryGlyph } from './CategoryGlyph';
import { ArrowRight, Mic, Sparkles, UserRound, X } from 'lucide-react';

interface HeroConversationalSearchProps {
  currentLanguage: Language;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExecuteSearch: (query: string) => void;
  onOpenVoiceModal: () => void;
  onSelectPrompt: (promptText: string) => void;
  onOpenCopilot: () => void;
  onOpenArchitecture: () => void;
  onOpenIntroductionForm: () => void;
  onClearProfile: () => void;
  onOpenSidebar: () => void;
  userProfile: IntakeProfile | null;
  matchedCount: number;
  onClearSearch: () => void;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  categoryCounts: Record<CategoryId, number>;
}

export const HeroConversationalSearch: React.FC<HeroConversationalSearchProps> = ({
  currentLanguage,
  searchQuery,
  onSearchChange,
  onExecuteSearch,
  onOpenVoiceModal,
  onSelectPrompt,
  onOpenIntroductionForm,
  onClearProfile,
  onOpenSidebar,
  userProfile,
  matchedCount,
  onClearSearch,
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  const t = translations[currentLanguage];
  const en = currentLanguage === 'en';
  const totalListings = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onExecuteSearch(searchQuery);
    }
  };

  const handleCategory = (id: CategoryId | 'all') => {
    onSelectCategory(id);
    window.setTimeout(() => {
      document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const quickPrompts = en
    ? ['Food for my family today', 'Free job training', 'Counseling without insurance']
    : ['Comida para mi familia hoy', 'Capacitación gratuita', 'Terapia sin seguro'];

  return (
    <section aria-labelledby="hero-title" className="qc-hero overflow-hidden">
      <div className="qc-pool" aria-hidden="true" />

      <div className="qc-shell">
        <div className="qc-eyebrow qc-rise" style={{ animationDelay: '.15s' }}>
          {en ? 'Free · Bilingual · Silicon Valley' : 'Gratis · Bilingüe · Silicon Valley'}
        </div>

        <h1 id="hero-title" className="qc-h1 qc-rise" style={{ animationDelay: '.25s' }}>
          {t.hero.title}
        </h1>

        <p className="qc-sub qc-rise" style={{ animationDelay: '.45s' }}>
          {t.hero.subtitle}
        </p>

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
              className="min-h-0 p-2 mr-1 rounded-full text-[#6b6880] hover:text-[#4C1D95] transition-colors"
              title={en ? 'Clear input' : 'Borrar texto'}
              aria-label={en ? 'Clear search input' : 'Borrar búsqueda'}
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          <button type="submit" className="qc-btn">
            {t.hero.searchButton} →
          </button>
        </form>

        <div className="qc-prompts qc-rise" style={{ animationDelay: '.68s' }}>
          {quickPrompts.map((prompt) => (
            <button key={prompt} type="button" className="qc-prompt" onClick={() => onSelectPrompt(prompt)}>
              {prompt}
            </button>
          ))}
        </div>

        <div className="qc-actions qc-rise" style={{ animationDelay: '.72s' }}>
          <button type="button" className="qc-btn-secondary" onClick={onOpenIntroductionForm}>
            <UserRound className="h-4 w-4" aria-hidden="true" />
            {en ? 'Personalize my search' : 'Personalizar mi búsqueda'}
          </button>
          <button type="button" className="qc-btn-ghost" onClick={onOpenVoiceModal}>
            <Mic className="h-4 w-4" aria-hidden="true" />
            {en ? 'Talk instead' : 'Hablar en su lugar'}
          </button>
          <button type="button" className="qc-btn-ghost" onClick={onOpenSidebar}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {en ? 'Open the companion sidebar' : 'Abrir barra lateral'}
          </button>
        </div>

        {userProfile && (
          <div className="qc-profile">
            <span>
              {en ? 'Personalized for' : 'Personalizado para'} <b>{userProfile.name}</b>
              {' · '}
              {userProfile.servicePriorities
                .map((id) => directoryCategories.find((category) => category.id === id)?.name[currentLanguage])
                .filter(Boolean)
                .join(', ')}
            </span>
            <button type="button" className="qc-btn-ghost ml-auto" onClick={onClearProfile}>
              {en ? 'Clear personalization' : 'Borrar personalización'}
            </button>
          </div>
        )}

        <div aria-live="polite" className="sr-only">
          {matchedCount} {t.filters.resultsCount}
        </div>

        {/* Browse by category */}
        <div className="mt-14 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#1A1A24]">
              {en ? 'Browse by what you need' : 'Explore por necesidad'}
            </h2>
            <p className="mt-1 text-[14px] text-[#55526b]">
              {en
                ? `${totalListings} verified local listings across ${directoryCategories.length} categories.`
                : `${totalListings} registros locales en ${directoryCategories.length} categorías.`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleCategory('all')}
            className="qc-btn-ghost"
          >
            {en ? 'See all resources' : 'Ver todos los recursos'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="qc-cats qc-rise" style={{ animationDelay: '.78s' }}>
          {directoryCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategory(category.id)}
              className={`qc-cat ${selectedCategory === category.id ? 'on' : ''}`}
              aria-current={selectedCategory === category.id ? 'true' : undefined}
            >
              <span className="qc-cat-ic">
                <CategoryGlyph id={category.id} />
              </span>
              <b>{category.name[currentLanguage]}</b>
              <span className="qc-cat-desc">{categoryDescription(category.id, currentLanguage)}</span>
              <span className="qc-cat-count">
                {(categoryCounts[category.id] || 0)} {en ? 'listings' : 'registros'}
              </span>
            </button>
          ))}
        </div>

        {/* Active search synthesis */}
        {searchQuery && (
          <div className="qc-sheet">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="qc-eyebrow">
                    {en ? 'Search Synthesis' : 'Síntesis de Búsqueda'}
                  </span>
                  <span className="qc-chip">
                    {matchedCount} {t.filters.resultsCount}
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1A1A24]">
                  {en
                    ? `Filtering verified Silicon Valley community services matching: "${searchQuery}" with zero required state ID and accessible public transit routes.`
                    : `Filtrando programas de Silicon Valley que coinciden con: "${searchQuery}" sin requisito de ID estatal y con acceso por transporte público.`}
                </p>
              </div>
              <button
                type="button"
                onClick={onClearSearch}
                className="min-h-0 p-1.5 text-[#55526b] hover:text-[#4C1D95] transition-colors"
                title={en ? 'Reset search query' : 'Restablecer búsqueda'}
                aria-label={en ? 'Reset search query' : 'Restablecer búsqueda'}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="qc-steps" aria-label={en ? 'How WhatSack works' : 'Cómo funciona WhatSack'}>
          <div className="qc-step">
            <span className="qc-step-n" aria-hidden="true">1</span>
            <div>
              <h2>{en ? 'Tell us what you need' : 'Díganos qué necesita'}</h2>
              <p>{en ? 'Type a question or pick a category. No account or ID needed.' : 'Escriba una pregunta o elija una categoría. Sin cuenta ni identificación.'}</p>
            </div>
          </div>
          <div className="qc-step">
            <span className="qc-step-n" aria-hidden="true">2</span>
            <div>
              <h2>{en ? 'Compare local programs' : 'Compare programas locales'}</h2>
              <p>{en ? 'Filter by city, cost and source type, then open details to compare.' : 'Filtre por ciudad, costo y tipo de fuente, y compare los detalles.'}</p>
            </div>
          </div>
          <div className="qc-step">
            <span className="qc-step-n" aria-hidden="true">3</span>
            <div>
              <h2>{en ? 'Leave with next steps' : 'Salga con pasos claros'}</h2>
              <p>{en ? 'Save listings to your plan and bring a clear checklist to your visit.' : 'Guarde recursos en su plan y lleve una lista clara a su visita.'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
