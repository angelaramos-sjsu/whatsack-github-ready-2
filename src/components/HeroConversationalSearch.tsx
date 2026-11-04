import React from 'react';
import { Language, IntakeProfile, CategoryId } from '../types';
import { translations } from '../data/translations';
import { X } from 'lucide-react';

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
  userProfile: IntakeProfile | null;
  matchedCount: number;
  onClearSearch: () => void;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
}

const categoryIcons: Record<CategoryId, React.ReactNode> = {
  workforce: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c3 2.5 9 2.5 12 0v-5" />
    </>
  ),
  food: (
    <>
      <path d="M5 11h14l-1.5 9h-11z" />
      <path d="M8 11c0-4 8-4 8 0" />
    </>
  ),
  'mental-health': (
    <path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6-8 11-8 11z" />
  ),
  community: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      <path d="M16 6a3 3 0 010 5" />
      <path d="M18 14c2 1 4 3 4 6" />
    </>
  )
};

export const HeroConversationalSearch: React.FC<HeroConversationalSearchProps> = ({
  currentLanguage,
  searchQuery,
  onSearchChange,
  onExecuteSearch,
  onOpenVoiceModal,
  onSelectPrompt,
  onOpenIntroductionForm,
  onClearProfile,
  userProfile,
  matchedCount,
  onClearSearch,
  selectedCategory,
  onSelectCategory
}) => {
  const t = translations[currentLanguage];

  const quickPrompts = [
    {
      label: currentLanguage === 'en' ? 'College options & costs' : 'Opciones y costos universitarios',
      query: currentLanguage === 'en'
        ? 'I want to go to college, but my family does not have much money. What are my options?'
        : 'Quiero ir a la universidad, pero mi familia no tiene mucho dinero. ¿Qué opciones tengo?'
    },
    {
      label: currentLanguage === 'en' ? 'Affordable career training' : 'Capacitación laboral asequible',
      query: currentLanguage === 'en'
        ? 'I just lost my job and want to explore a new career. Are there affordable training programs that could help me find work?'
        : 'Perdí mi trabajo y quiero explorar una nueva carrera. ¿Hay programas de capacitación asequibles que puedan ayudarme a encontrar trabajo?'
    },
    {
      label: currentLanguage === 'en' ? 'Groceries without ID' : 'Despensa sin identificación',
      query: currentLanguage === 'en'
        ? 'Where can I get groceries in East San Jose without showing an ID or SSN?'
        : '¿Dónde puedo conseguir despensa en el Este de San José sin mostrar identificación ni Seguro Social?'
    },
    {
      label: currentLanguage === 'en' ? 'Confidential youth text line' : 'Línea de texto para jóvenes',
      query: currentLanguage === 'en'
        ? 'Is there a free confidential text line for teens feeling overwhelmed in Sunnyvale?'
        : '¿Hay una línea de texto gratuita y confidencial para jóvenes en Sunnyvale?'
    },
    {
      label: currentLanguage === 'en' ? 'Spanish senior hot lunches' : 'Almuerzos para adultos mayores',
      query: currentLanguage === 'en'
        ? 'Where are Spanish-language senior clubs with hot lunch in Redwood City?'
        : '¿Dónde hay clubes para adultos mayores con almuerzo caliente en Redwood City?'
    }
  ];

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'workforce', label: t.categories.workforce },
    { id: 'food', label: t.categories.food },
    { id: 'mental-health', label: t.categories.mentalHealth },
    { id: 'community', label: t.categories.community }
  ];

  const steps = [
    {
      title: currentLanguage === 'en' ? 'Tell us what you need' : 'Díganos qué necesita',
      body: currentLanguage === 'en' ? 'Ask naturally—no special keywords needed.' : 'Pregunte naturalmente, sin palabras especiales.'
    },
    {
      title: currentLanguage === 'en' ? 'Compare local options' : 'Compare opciones locales',
      body: currentLanguage === 'en' ? 'Review cost, location, transit, and requirements.' : 'Revise costo, ubicación, transporte y requisitos.'
    },
    {
      title: currentLanguage === 'en' ? 'Take your next step' : 'Tome el siguiente paso',
      body: currentLanguage === 'en' ? 'Save a plan or open a helpful checklist.' : 'Guarde un plan o abra una lista útil.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onExecuteSearch(searchQuery);
    }
  };

  const handleCategory = (id: CategoryId) => {
    onSelectCategory(id);
    window.setTimeout(() => {
      document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
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
              className="min-h-0 p-2 mr-1 rounded-full text-[#7d7a94] hover:text-[#4C1D95] transition-colors"
              title="Clear input"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          <button type="submit" className="qc-btn">
            {t.hero.searchButton} →
          </button>
        </form>

        <div className="qc-top qc-rise" style={{ animationDelay: '.75s' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => handleCategory(category.id)}
              className="min-h-0"
              aria-current={selectedCategory === category.id ? 'true' : undefined}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">{categoryIcons[category.id]}</svg>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Personalization & voice */}
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-[15px] text-[#5a5870]">
          {userProfile ? (
            <span>
              {userProfile.name} · {userProfile.city} · {currentLanguage === 'en' ? 'Income' : 'Ingreso'}{' '}
              {userProfile.monthlyIncome} · {userProfile.householdSize}{' '}
              {currentLanguage === 'en' ? 'household members' : 'integrantes'}
            </span>
          ) : (
            <span>{currentLanguage === 'en' ? 'Want a personalized shortlist?' : '¿Desea una lista personalizada?'}</span>
          )}
          <button
            type="button"
            onClick={onOpenIntroductionForm}
            className="qc-link min-h-0 text-[#4C1D95]"
          >
            {userProfile
              ? (currentLanguage === 'en' ? 'Update details' : 'Actualizar datos')
              : (currentLanguage === 'en' ? 'Get matched to local programs' : 'Reciba programas locales')}
          </button>
          {userProfile && (
            <button
              type="button"
              onClick={onClearProfile}
              className="qc-link min-h-0"
              aria-label={currentLanguage === 'en' ? 'Clear active intake profile' : 'Borrar perfil de evaluación activo'}
            >
              {currentLanguage === 'en' ? 'Clear' : 'Borrar'}
            </button>
          )}
          <button type="button" onClick={onOpenVoiceModal} className="qc-link min-h-0">
            {t.nav.voice}
          </button>
        </div>

        {/* Common resident inquiries */}
        <div className="mt-8">
          <span className="qc-eyebrow">
            {currentLanguage === 'en' ? 'Common questions' : 'Consultas frecuentes'}
          </span>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onSelectPrompt(prompt.query)}
                className={`qc-link min-h-0 text-left ${searchQuery === prompt.query ? 'on' : ''}`}
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-11 grid gap-8 border-t border-[#ece9f7] pt-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title}>
              <span className="qc-eyebrow">0{index + 1}</span>
              <p className="mt-2 text-[16px] font-medium text-[#1A1A24]">{step.title}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#5a5870]">{step.body}</p>
            </div>
          ))}
        </div>

        <div aria-live="polite" className="sr-only">
          {matchedCount} {t.filters.resultsCount}
        </div>

        {/* Active search synthesis */}
        {searchQuery && (
          <div className="qc-sheet">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="qc-eyebrow">
                    {currentLanguage === 'en' ? 'Search Synthesis' : 'Síntesis de Búsqueda'}
                  </span>
                  <span className="qc-chip">
                    {matchedCount} {t.filters.resultsCount}
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1A1A24]">
                  {currentLanguage === 'en'
                    ? `Filtering verified Silicon Valley community services matching: "${searchQuery}" with zero required state ID and accessible public transit routes.`
                    : `Filtrando programas de Silicon Valley que coinciden con: "${searchQuery}" sin requisito de ID estatal y con acceso por transporte público.`}
                </p>
              </div>
              <button
                type="button"
                onClick={onClearSearch}
                className="min-h-0 p-1.5 text-[#5a5870] hover:text-[#4C1D95] transition-colors"
                title="Reset search query"
                aria-label="Reset search query"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
