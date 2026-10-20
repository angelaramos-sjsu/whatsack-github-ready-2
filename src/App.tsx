import React, { useState, useMemo, useEffect } from 'react';
import { 
  Language, 
  CategoryId, 
  DemonstrationResource, 
  IntakeProfile 
} from './types';
import { demonstrationResources } from './data/resources';
import { translations } from './data/translations';

// Components
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { HeroConversationalSearch } from './components/HeroConversationalSearch';
import { CategoryTabs } from './components/CategoryTabs';
import { IntroductionForm } from './components/IntroductionForm';
import { ResourceCard } from './components/ResourceCard';
import { NextStepInsightsModal } from './components/NextStepInsightsModal';
import { SimulatedExtensionSidebar } from './components/SimulatedExtensionSidebar';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { SavedResourcesDrawer } from './components/SavedResourcesDrawer';
import { AILLMConsole } from './components/AILLMConsole';
import { AIEngineInspectorModal } from './components/AIEngineInspectorModal';
import { AIDocumentDecoderModal } from './components/AIDocumentDecoderModal';
import { Footer } from './components/Footer';

import { 
  Filter, 
  RotateCcw, 
  CheckCircle, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  Bot,
  Sparkles,
  UserCheck,
  X
} from 'lucide-react';

export function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<'home' | 'copilot' | 'extension'>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  
  // Secondary Filters
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [freeOnly, setFreeOnly] = useState<boolean>(false);
  const [noIdRequiredOnly, setNoIdRequiredOnly] = useState<boolean>(false);

  // Resident Introduction Profile State
  const [userProfile, setUserProfile] = useState<IntakeProfile | null>(null);
  const [isIntroductionFormOpen, setIsIntroductionFormOpen] = useState<boolean>(false);

  // Modals & Drawers
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [isDecoderModalOpen, setIsDecoderModalOpen] = useState<boolean>(false);
  const [selectedResourceForInsights, setSelectedResourceForInsights] = useState<DemonstrationResource | null>(null);

  // Bookmarks & Accessibility
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(['res-food-1', 'res-work-1']);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const t = translations[currentLanguage];

  // High contrast mode effect
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Text scaling mode handler
  const handleCycleTextSize = () => {
    setTextSize((prev) => {
      const next = prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal';
      document.documentElement.classList.remove('text-large', 'text-xlarge');
      if (next === 'large') document.documentElement.classList.add('text-large');
      if (next === 'xlarge') document.documentElement.classList.add('text-xlarge');
      return next;
    });
  };

  const handleToggleSave = (resourceId: string) => {
    setSavedResourceIds((prev) => 
      prev.includes(resourceId) 
        ? prev.filter((id) => id !== resourceId) 
        : [...prev, resourceId]
    );
  };

  // Handle saving introduction profile
  const handleSaveProfile = (profile: IntakeProfile) => {
    setUserProfile(profile);
    // Apply relevant filters automatically
    if (profile.noIdRequiredPreference) {
      setNoIdRequiredOnly(true);
    }
    if (profile.servicePriorities.length === 1) {
      setSelectedCategory(profile.servicePriorities[0]);
    }
    if (profile.city && profile.city !== 'Other Silicon Valley') {
      setSelectedCity(profile.city);
    }
  };

  const handleClearProfile = () => {
    setUserProfile(null);
    resetAllFilters();
  };

  // Available unique cities for filtering
  const availableCities = useMemo(() => {
    const cities = new Set<string>();
    demonstrationResources.forEach((r) => cities.add(r.location.city));
    return Array.from(cities);
  }, []);

  // Filtered resources calculation
  const filteredResources = useMemo(() => {
    return demonstrationResources.filter((resource) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && resource.categoryId !== selectedCategory) {
        return false;
      }

      // 2. City Filter
      if (selectedCity !== 'all' && resource.location.city !== selectedCity) {
        return false;
      }

      // 3. Free Only Filter
      if (freeOnly && resource.costType !== 'Free' && resource.costType !== 'No Cost for Youth') {
        return false;
      }

      // 4. No ID Required Filter
      if (noIdRequiredOnly && !resource.noIdRequired) {
        return false;
      }

      // 5. Conversational Search Query Filter
      if (searchQuery.trim()) {
        const queryLower = searchQuery.toLowerCase().trim();
        const titleEn = resource.title.en.toLowerCase();
        const titleEs = resource.title.es.toLowerCase();
        const descEn = resource.description.en.toLowerCase();
        const descEs = resource.description.es.toLowerCase();
        const cityLower = resource.location.city.toLowerCase();
        const tagsJoined = resource.tags.join(' ').toLowerCase();
        const insightExpEn = resource.nextStepInsight.explanation.en.toLowerCase();
        const insightExpEs = resource.nextStepInsight.explanation.es.toLowerCase();

        const words = queryLower.split(/\s+/).filter((w) => w.length > 2);
        const matchesAnyWord = words.some((word) => 
          titleEn.includes(word) ||
          titleEs.includes(word) ||
          descEn.includes(word) ||
          descEs.includes(word) ||
          cityLower.includes(word) ||
          tagsJoined.includes(word) ||
          insightExpEn.includes(word) ||
          insightExpEs.includes(word)
        );

        return matchesAnyWord;
      }

      return true;
    });
  }, [
    selectedCategory, 
    selectedCity, 
    freeOnly, 
    noIdRequiredOnly, 
    searchQuery
  ]);

  // Resource Counts per Category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      food: 0,
      'mental-health': 0,
      workforce: 0,
      community: 0
    };
    demonstrationResources.forEach((r) => {
      counts[r.categoryId] = (counts[r.categoryId] || 0) + 1;
    });
    return counts;
  }, []);

  // Saved resources list
  const savedResourcesList = useMemo(() => {
    return demonstrationResources.filter((r) => savedResourceIds.includes(r.id));
  }, [savedResourceIds]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedCity('all');
    setFreeOnly(false);
    setNoIdRequiredOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-brand-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        onToggleExtensionView={() => setActiveView(activeView === 'extension' ? 'home' : 'extension')}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
        onOpenDecoderModal={() => setIsDecoderModalOpen(true)}
        onOpenIntroductionForm={() => setIsIntroductionFormOpen(true)}
        userProfile={userProfile}
        savedCount={savedResourceIds.length}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        textSize={textSize}
        onCycleTextSize={handleCycleTextSize}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main View Switching: Home Platform vs AI LLM Copilot vs Browser Extension */}
      {activeView === 'copilot' ? (
        <AILLMConsole
          currentLanguage={currentLanguage}
          userProfile={userProfile}
          onOpenInsights={(res) => setSelectedResourceForInsights(res)}
          onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
          onOpenDecoderModal={() => setIsDecoderModalOpen(true)}
        />
      ) : activeView === 'extension' ? (
        <SimulatedExtensionSidebar
          currentLanguage={currentLanguage}
          onClose={() => setActiveView('home')}
          onNavigateHome={() => setActiveView('home')}
        />
      ) : (
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
          {/* Conversational AI Search Hero (Simplified & Warm) */}
          <HeroConversationalSearch
            currentLanguage={currentLanguage}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onExecuteSearch={(q) => setSearchQuery(q)}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onSelectPrompt={(p) => setSearchQuery(p)}
            onOpenCopilot={() => setActiveView('copilot')}
            onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
            onOpenIntroductionForm={() => setIsIntroductionFormOpen(true)}
            userProfile={userProfile}
            matchedCount={filteredResources.length}
            onClearSearch={() => setSearchQuery('')}
          />

          {/* Active Intake Assessment Bar (When resident filled profile) */}
          {userProfile && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5 text-emerald-800" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 text-sm">
                      {currentLanguage === 'en' ? `Intake Assessment Active: ${userProfile.name}` : `Evaluación Activa de: ${userProfile.name}`}
                    </span>
                    <span className="text-slate-700 font-medium block sm:inline sm:ml-2">
                      ({userProfile.city} • {currentLanguage === 'en' ? 'Income' : 'Ingreso'}: {userProfile.monthlyIncome} • {userProfile.householdSize} {currentLanguage === 'en' ? 'household members' : 'integrantes'})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsIntroductionFormOpen(true)}
                    className="font-extrabold text-emerald-900 hover:text-emerald-950 underline px-2.5 py-1.5 rounded-lg hover:bg-emerald-100/60 transition-colors"
                  >
                    {currentLanguage === 'en' ? 'Update Form' : 'Actualizar'}
                  </button>
                  <button
                    onClick={handleClearProfile}
                    className="text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
                    title={currentLanguage === 'en' ? 'Clear profile' : 'Borrar perfil'}
                    aria-label={currentLanguage === 'en' ? 'Clear active intake profile' : 'Borrar perfil de evaluación activo'}
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4 Core Resource Categories */}
          <CategoryTabs
            currentLanguage={currentLanguage}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            resourceCounts={categoryCounts}
          />

          {/* Filter Bar & Results Header */}
          <section aria-labelledby="filters-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-2">
            <h2 id="filters-heading" className="sr-only">
              {t.filters.filterBy}
            </h2>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-wrap text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5 mr-1">
                  <SlidersHorizontal className="w-4 h-4 text-slate-600" aria-hidden="true" />
                  <span>{t.filters.filterBy}:</span>
                </span>

                {/* City Filter */}
                <div className="relative">
                  <label htmlFor="city-filter-dropdown" className="sr-only">
                    {t.filters.filterBy} {t.filters.allCities}
                  </label>
                  <select
                    id="city-filter-dropdown"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2 px-3 rounded-xl border border-slate-300 min-h-[42px] focus:outline-hidden focus:ring-2 focus:ring-emerald-600 transition-colors"
                  >
                    <option value="all">{t.filters.allCities}</option>
                    {availableCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Free Only Toggle */}
                <button
                  type="button"
                  onClick={() => setFreeOnly(!freeOnly)}
                  aria-pressed={freeOnly}
                  className={`min-h-[42px] py-2 px-3.5 rounded-xl font-bold transition-all border flex items-center gap-1.5 ${
                    freeOnly
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-600/30'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-300'
                  }`}
                >
                  <span>{t.filters.freeOnly}</span>
                </button>

                {/* No ID Required Toggle */}
                <button
                  type="button"
                  onClick={() => setNoIdRequiredOnly(!noIdRequiredOnly)}
                  aria-pressed={noIdRequiredOnly}
                  className={`min-h-[42px] py-2 px-3.5 rounded-xl font-bold transition-all border flex items-center gap-1.5 ${
                    noIdRequiredOnly
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-600/30'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-300'
                  }`}
                >
                  <span>{t.filters.noId}</span>
                </button>

                {/* Reset Filters */}
                {(selectedCategory !== 'all' || selectedCity !== 'all' || freeOnly || noIdRequiredOnly || searchQuery) && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="min-h-[42px] py-2 px-3.5 rounded-xl font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-transparent hover:border-slate-300 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-600" aria-hidden="true" />
                    <span>{t.filters.reset}</span>
                  </button>
                )}
              </div>

              {/* Counter with aria-live */}
              <div aria-live="polite" className="text-xs text-slate-700 font-medium ml-auto">
                <span className="font-extrabold text-slate-900 text-sm">{filteredResources.length}</span> {t.filters.resultsCount}
              </div>
            </div>
          </section>

          {/* Demonstration Resources Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {filteredResources.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-xl mx-auto my-8">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {currentLanguage === 'en' ? 'No matching demonstration resources found' : 'No se encontraron recursos de demostración'}
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  {currentLanguage === 'en'
                    ? 'Try broadening your search filters or resetting your inquiry.'
                    : 'Intente ampliar los filtros de búsqueda o restablecer la consulta.'}
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 bg-emerald-700 text-white font-bold text-xs rounded-xl hover:bg-emerald-800 transition-colors"
                >
                  {t.filters.reset}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    currentLanguage={currentLanguage}
                    onOpenInsights={(res) => setSelectedResourceForInsights(res)}
                    isSaved={savedResourceIds.includes(resource.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      )}

      {/* Floating AI Copilot summon pill */}
      {activeView !== 'copilot' && (
        <aside aria-label="AI Assistant" className="fixed bottom-6 right-6 z-30">
          <button
            onClick={() => setActiveView('copilot')}
            className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-xl shadow-emerald-900/30 hover:scale-105 transition-all ring-4 ring-emerald-500/20"
            title="Open WhatSack Civic-LLM Chat Assistant"
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span>{currentLanguage === 'en' ? 'Ask Civic-LLM Copilot' : 'Preguntar al Copiloto IA'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          </button>
        </aside>
      )}

      {/* Footer */}
      <Footer
        currentLanguage={currentLanguage}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        onNavigateCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveView('home');
          window.scrollTo({ top: 500, behavior: 'smooth' });
        }}
        onOpenExtension={() => setActiveView('extension')}
      />

      {/* Introduction Assessment Modal */}
      {isIntroductionFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <IntroductionForm
            currentLanguage={currentLanguage}
            existingProfile={userProfile}
            onSaveProfile={handleSaveProfile}
            onClose={() => setIsIntroductionFormOpen(false)}
            isModal={true}
          />
        </div>
      )}

      {/* Modals & Drawers */}
      <DisclaimerBanner
        currentLanguage={currentLanguage}
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        currentLanguage={currentLanguage}
        onSelectVoiceQuery={(query) => {
          setSearchQuery(query);
          setIsVoiceModalOpen(false);
        }}
      />

      <AIEngineInspectorModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
        currentLanguage={currentLanguage}
      />

      <AIDocumentDecoderModal
        isOpen={isDecoderModalOpen}
        onClose={() => setIsDecoderModalOpen(false)}
        currentLanguage={currentLanguage}
      />

      <NextStepInsightsModal
        resource={selectedResourceForInsights}
        currentLanguage={currentLanguage}
        onClose={() => setSelectedResourceForInsights(null)}
        isSaved={selectedResourceForInsights ? savedResourceIds.includes(selectedResourceForInsights.id) : false}
        onToggleSave={handleToggleSave}
      />

      <SavedResourcesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        currentLanguage={currentLanguage}
        savedResources={savedResourcesList}
        onRemoveSaved={handleToggleSave}
        onClearAll={() => setSavedResourceIds([])}
        onOpenInsights={(res) => setSelectedResourceForInsights(res)}
      />
    </div>
  );
}

export default App;
