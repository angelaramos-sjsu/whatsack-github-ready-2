import React from 'react';
import { Language, IntakeProfile } from '../types';
import { translations } from '../data/translations';
import { 
  Search, 
  Mic, 
  Sparkles, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  ClipboardList,
  Bot,
  Brain,
  ListChecks,
  ArrowUpRight
} from 'lucide-react';

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
  userProfile: IntakeProfile | null;
  matchedCount: number;
  onClearSearch: () => void;
}

export const HeroConversationalSearch: React.FC<HeroConversationalSearchProps> = ({
  currentLanguage,
  searchQuery,
  onSearchChange,
  onExecuteSearch,
  onOpenVoiceModal,
  onSelectPrompt,
  onOpenCopilot,
  onOpenArchitecture,
  onOpenIntroductionForm,
  userProfile,
  matchedCount,
  onClearSearch
}) => {
  const t = translations[currentLanguage];

  const quickPrompts = [
  {
    label: currentLanguage === 'en' ? '🎓 College options & costs' : '🎓 Opciones y costos universitarios',
    query: currentLanguage === 'en'
      ? 'I want to go to college, but my family does not have much money. What are my options?'
      : 'Quiero ir a la universidad, pero mi familia no tiene mucho dinero. ¿Qué opciones tengo?'
  },
  {
    label: currentLanguage === 'en' ? '💼 Affordable career training' : '💼 Capacitación laboral asequible',
    query: currentLanguage === 'en'
      ? 'I just lost my job and want to explore a new career. Are there affordable training programs that could help me find work?'
      : 'Perdí mi trabajo y quiero explorar una nueva carrera. ¿Hay programas de capacitación asequibles que puedan ayudarme a encontrar trabajo?'
  },
  {
    label: currentLanguage === 'en' ? '🍏 Groceries without ID' : '🍏 Despensa sin identificación',
    query: currentLanguage === 'en'
      ? 'Where can I get groceries in East San Jose without showing an ID or SSN?'
      : '¿Dónde puedo conseguir despensa en el Este de San José sin mostrar identificación ni Seguro Social?'
  },
  {
    label: currentLanguage === 'en' ? '🧠 Confidential youth text line' : '🧠 Línea de texto para jóvenes',
    query: currentLanguage === 'en'
      ? 'Is there a free confidential text line for teens feeling overwhelmed in Sunnyvale?'
      : '¿Hay una línea de texto gratuita y confidencial para jóvenes en Sunnyvale?'
  },
  {
    label: currentLanguage === 'en' ? '👵 Spanish senior hot lunches' : '👵 Almuerzos para adultos mayores',
    query: currentLanguage === 'en'
      ? 'Where are Spanish-language senior clubs with hot lunch in Redwood City?'
      : '¿Dónde hay clubes para adultos mayores con almuerzo caliente en Redwood City?'
  }
];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onExecuteSearch(searchQuery);
    }
  };

  return (
    <section aria-labelledby="hero-title" className="hero-section relative overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="max-w-4xl mx-auto text-center">
        {/* Civic Tagline */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 mb-4 text-xs font-bold text-emerald-900 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
          <span>{currentLanguage === 'en' ? 'Silicon Valley Community Navigator' : 'Navegador Comunitario de Silicon Valley'}</span>
        </div>

        {/* Main Headline */}
        <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto mb-7 leading-relaxed font-normal">
          {t.hero.subtitle}
        </p>

        <div className="max-w-3xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          {[
            { icon: <MessageSquare className="w-5 h-5" />, title: currentLanguage === 'en' ? 'Tell us what you need' : 'Díganos qué necesita', body: currentLanguage === 'en' ? 'Ask naturally—no special keywords needed.' : 'Pregunte naturalmente, sin palabras especiales.' },
            { icon: <ListChecks className="w-5 h-5" />, title: currentLanguage === 'en' ? 'Compare local options' : 'Compare opciones locales', body: currentLanguage === 'en' ? 'Review cost, location, transit, and requirements.' : 'Revise costo, ubicación, transporte y requisitos.' },
            { icon: <ArrowUpRight className="w-5 h-5" />, title: currentLanguage === 'en' ? 'Take your next step' : 'Tome el siguiente paso', body: currentLanguage === 'en' ? 'Save a plan or open a helpful checklist.' : 'Guarde un plan o abra una lista útil.' }
          ].map((step, index) => (
            <div key={step.title} className="hero-step-card group rounded-2xl border border-purple-200/80 bg-white/85 p-4 shadow-sm backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3">
                  {step.icon}
                </div>
                <div>
                  <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.16em] text-purple-700">0{index + 1}</span>
                  <h2 className="text-sm font-extrabold text-slate-900">{step.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Intake Assessment Card (Clean, accessible, high contrast) */}
        <div className="max-w-2xl mx-auto mb-7">
          {userProfile ? (
            <div className="p-4 rounded-2xl bg-white border-2 border-emerald-600 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm sm:text-base text-slate-900">
                      {userProfile.name}
                    </span>
                    <span className="text-xs bg-emerald-100 text-emerald-900 font-bold px-2.5 py-0.5 rounded-full border border-emerald-300">
                      {userProfile.city}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-0.5 font-medium">
                    {currentLanguage === 'en' 
                      ? `Monthly Income: ${userProfile.monthlyIncome} • Household of ${userProfile.householdSize}`
                      : `Ingreso Mensual: ${userProfile.monthlyIncome} • Hogar de ${userProfile.householdSize}`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenIntroductionForm}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold border border-slate-300 transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                {currentLanguage === 'en' ? 'Update Details' : 'Modificar Datos'}
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                  <ClipboardList className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {currentLanguage === 'en' ? 'Get Matched to Local Programs' : 'Reciba Recursos Personalizados'}
                  </h2>
                  <p className="text-xs text-slate-700 mt-0.5 font-medium">
                    {currentLanguage === 'en' 
                      ? 'Share your household income, city, and needs to see verified programs with zero paperwork hassle.'
                      : 'Indique ingresos, ciudad y necesidades para ver programas verificados sin complicaciones de papeleo.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenIntroductionForm}
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md shadow-emerald-700/20 transition-all hover:scale-105 shrink-0 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-900"
              >
                <span>{currentLanguage === 'en' ? 'Quick Introduction Form' : 'Formulario Rápido'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* Conversational Search Form (Accessible, sleek, clear contrast) */}
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto mb-5" role="search">
          <div className="relative flex items-center bg-white rounded-2xl shadow-md border-2 border-slate-300 focus-within:border-emerald-700 transition-all p-2">
            <div className="pl-3 pr-2 text-slate-700">
              <Search className="w-5 h-5" aria-hidden="true" />
            </div>

            <label htmlFor="search-input" className="sr-only">
              {t.hero.inputPlaceholder}
            </label>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.hero.inputPlaceholder}
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-500 text-sm sm:text-base font-medium focus:outline-hidden py-2"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={onClearSearch}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 mr-1"
                title="Clear input"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}

            {/* Simulated Voice Mic Button */}
            <button
              type="button"
              onClick={onOpenVoiceModal}
              className="p-2.5 sm:px-3 sm:py-2.5 rounded-xl text-emerald-800 hover:bg-emerald-50 font-bold text-xs flex items-center gap-1.5 border border-emerald-300 transition-colors mr-2 shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-600"
              title="Search using voice input"
              aria-label="Search using voice input"
            >
              <Mic className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span className="hidden sm:inline">
                {currentLanguage === 'en' ? 'Voice' : 'Voz'}
              </span>
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 shrink-0 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-emerald-900"
            >
              <span className="hidden sm:inline">{t.hero.searchButton}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </form>

        {/* Live Screen Reader Announcement */}
        <div aria-live="polite" className="sr-only">
          {matchedCount} {t.filters.resultsCount}
        </div>

        {/* Quick Topic Prompts: Clean, Accessible Buttons */}
        <div className="text-left max-w-3xl mx-auto mb-5">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {currentLanguage === 'en' ? 'Common Resident Inquiries:' : 'Consultas Comunitarias Frecuentes:'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPrompt(p.query)}
                className={`text-xs px-3.5 py-2 rounded-xl font-semibold transition-all text-left flex items-center gap-1.5 border min-h-[40px] ${
                  searchQuery === p.query
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                    : 'bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-950 border-slate-300 hover:border-emerald-400 shadow-2xs'
                }`}
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Clean Tools Bar: AI LLM & Architecture */}
        <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenCopilot}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <Bot className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>{currentLanguage === 'en' ? 'Open Civic-LLM Chat Copilot' : 'Abrir Copiloto de Chat Civic-LLM'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenArchitecture}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center gap-2 border border-slate-300 transition-colors focus-visible:ring-2 focus-visible:ring-slate-600"
          >
            <Brain className="w-4 h-4 text-indigo-700" aria-hidden="true" />
            <span>{currentLanguage === 'en' ? 'AI Architecture & RAG Pipeline' : 'Arquitectura RAG de IA'}</span>
          </button>
        </div>

        {/* Active Search Context Card */}
        {searchQuery && (
          <div className="mt-6 p-4 rounded-2xl bg-white border border-emerald-300 text-left shadow-xs max-w-3xl mx-auto animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-900 rounded-xl mt-0.5">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                      {currentLanguage === 'en' ? 'Search Synthesis' : 'Síntesis de Búsqueda'}
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md font-bold border border-slate-300">
                      {matchedCount} {t.filters.resultsCount}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                    {currentLanguage === 'en'
                      ? `Filtering verified Silicon Valley community services matching: "${searchQuery}" with zero required state ID and accessible public transit routes.`
                      : `Filtrando programas de Silicon Valley que coinciden con: "${searchQuery}" sin requisito de ID estatal y con acceso por transporte público.`}
                  </p>
                </div>
              </div>
              <button
                onClick={onClearSearch}
                className="text-slate-600 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100"
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
