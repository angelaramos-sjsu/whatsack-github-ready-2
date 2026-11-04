import React, { useState, useMemo, useEffect } from 'react';
import { 
  Language, 
  CategoryId, 
  DemonstrationResource, 
  IntakeProfile 
} from './types';
import { demonstrationResources } from './data/resources';
import { directoryEntries } from './data/directory';
import { translations } from './data/translations';

// Components
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { HeroConversationalSearch } from './components/HeroConversationalSearch';
import { IntroductionForm } from './components/IntroductionForm';
import { ResourceCard } from './components/ResourceCard';
import { CommunityDirectory } from './components/CommunityDirectory';
import { NextStepInsightsModal } from './components/NextStepInsightsModal';
import { SimulatedExtensionSidebar } from './components/SimulatedExtensionSidebar';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { SavedResourcesDrawer } from './components/SavedResourcesDrawer';
import { AILLMConsole } from './components/AILLMConsole';
import { AIEngineInspectorModal } from './components/AIEngineInspectorModal';
import { AIDocumentDecoderModal } from './components/AIDocumentDecoderModal';
import { Footer } from './components/Footer';

import { Bot } from 'lucide-react';

export function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<'home' | 'copilot' | 'extension'>('home');
  // A question submitted from the homepage opens the copilot already answered.
  const [copilotQuestion, setCopilotQuestion] = useState<{ text: string; key: number } | null>(null);
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
  const [savedDirectoryIds, setSavedDirectoryIds] = useState<string[]>([]);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const t = translations[currentLanguage];

  // The homepage question seeds the copilot once, then clears when you leave it.
  useEffect(() => {
    if (activeView !== 'copilot') setCopilotQuestion(null);
  }, [activeView]);

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

  const handleToggleDirectorySave = (entryId: string) => {
    setSavedDirectoryIds((prev) =>
      prev.includes(entryId)
        ? prev.filter((id) => id !== entryId)
        : [...prev, entryId]
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

  // Saved resources list
  const savedResourcesList = useMemo(() => {
    return demonstrationResources.filter((r) => savedResourceIds.includes(r.id));
  }, [savedResourceIds]);

  const savedDirectoryList = useMemo(() => {
    return directoryEntries.filter((entry) => savedDirectoryIds.includes(entry.id));
  }, [savedDirectoryIds]);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedCity('all');
    setFreeOnly(false);
    setNoIdRequiredOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="qc min-h-screen flex flex-col selection:bg-[#4C1D95] selection:text-white">
      {/* Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        savedCount={savedResourceIds.length + savedDirectoryIds.length}
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
          savedResourceIds={savedResourceIds}
          onSavePlanAction={(resourceId) =>
            setSavedResourceIds((prev) =>
              prev.includes(resourceId) ? prev : [...prev, resourceId]
            )
          }
          onOpenInsights={(res) => setSelectedResourceForInsights(res)}
          onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
          onOpenDecoderModal={() => setIsDecoderModalOpen(true)}
          initialQuestion={copilotQuestion}
        />
      ) : activeView === 'extension' ? (
        <SimulatedExtensionSidebar
          currentLanguage={currentLanguage}
          onClose={() => setActiveView('home')}
          onNavigateHome={() => setActiveView('home')}
        />
      ) : (
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
          {/* Conversational AI Search Hero */}
          <HeroConversationalSearch
            currentLanguage={currentLanguage}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onExecuteSearch={(q) => {
              setSearchQuery(q);
              setCopilotQuestion({ text: q, key: Date.now() });
              setActiveView('copilot');
            }}
            onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            onSelectPrompt={(p) => setSearchQuery((currentQuery) => currentQuery === p ? '' : p)}
            onOpenCopilot={() => setActiveView('copilot')}
            onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
            onOpenIntroductionForm={() => setIsIntroductionFormOpen(true)}
            onClearProfile={handleClearProfile}
            userProfile={userProfile}
            matchedCount={filteredResources.length}
            onClearSearch={() => setSearchQuery('')}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* Community resource directory with filters */}
          <CommunityDirectory
            currentLanguage={currentLanguage}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
            availableCities={availableCities}
            searchQuery={searchQuery}
            freeOnly={freeOnly}
            onToggleFreeOnly={() => setFreeOnly(!freeOnly)}
            noIdRequiredOnly={noIdRequiredOnly}
            onToggleNoIdRequired={() => setNoIdRequiredOnly(!noIdRequiredOnly)}
            onResetFilters={resetAllFilters}
            demonstrationCount={filteredResources.length}
            isEntrySaved={(entryId) => savedDirectoryIds.includes(entryId)}
            onToggleEntrySave={handleToggleDirectorySave}
          />

          {/* Demonstration resources */}
          <section id="resources" aria-labelledby="resources-heading" className="qc-shell pt-16 scroll-mt-28">
            <h2 id="resources-heading" className="sr-only">
              {currentLanguage === 'en' ? 'Community resources' : 'Recursos comunitarios'}
            </h2>
            {filteredResources.length === 0 ? (
              <div className="border-t border-[#f0eef8] py-16 text-center">
                <h3 className="text-[18px] font-medium text-[#1A1A24]">
                  {currentLanguage === 'en' ? 'No matching demonstration resources found' : 'No se encontraron recursos de demostración'}
                </h3>
                <p className="mt-2 text-[14px] text-[#5a5870]">
                  {currentLanguage === 'en'
                    ? 'Try broadening your search filters or resetting your inquiry.'
                    : 'Intente ampliar los filtros de búsqueda o restablecer la consulta.'}
                </p>
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="qc-btn-sm mt-6"
                >
                  {t.filters.reset}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

          {/* Advanced prototype tools */}
          <section aria-labelledby="advanced-heading" className="qc-adv qc-shell">
            <div className="qc-eyebrow">{currentLanguage === 'en' ? 'Advanced' : 'Avanzado'}</div>
            <h2 id="advanced-heading" className="sr-only">
              {currentLanguage === 'en' ? 'Advanced prototype tools' : 'Herramientas avanzadas del prototipo'}
            </h2>
            <div className="qc-advg">
              <button type="button" className="min-h-0" onClick={() => setIsArchitectureModalOpen(true)}>
                {currentLanguage === 'en' ? 'AI Architecture' : 'Arquitectura IA'}
              </button>
              <button type="button" className="min-h-0" onClick={() => setIsDecoderModalOpen(true)}>
                {t.nav.docDecoder}
              </button>
              <button
                type="button"
                className="min-h-0"
                onClick={() => setActiveView('extension')}
              >
                {t.nav.extension}
              </button>
              <button type="button" className="min-h-0" onClick={() => setIsVoiceModalOpen(true)}>
                {t.nav.voice}
              </button>
              <button type="button" className="min-h-0" onClick={() => setIsIntroductionFormOpen(true)}>
                {currentLanguage === 'en' ? 'Personalize My Search' : 'Personalizar mi búsqueda'}
              </button>
            </div>
          </section>

        </main>
      )}

      {/* Floating AI Copilot summon pill */}
      {activeView === 'home' && (
        <aside aria-label="AI Assistant" className="fixed bottom-6 right-6 z-30">
          <button
            type="button"
            onClick={() => setActiveView('copilot')}
            className="flex items-center gap-2 rounded-full border border-[#e6e0fb] bg-white px-4 py-3 text-[13px] font-medium text-[#1A1A24] shadow-[0_10px_30px_rgba(76,29,149,0.12)] transition-colors hover:border-[#4C1D95] hover:text-[#4C1D95]"
            title="Open WhatSack Civic-LLM Chat Assistant"
          >
            <Bot className="h-4 w-4 text-[#4C1D95]" aria-hidden="true" />
            <span>{currentLanguage === 'en' ? 'Ask Civic-LLM Copilot' : 'Preguntar al Copiloto IA'}</span>
          </button>
        </aside>
      )}

      {/* Footer */}
      {activeView !== 'extension' && (
        <Footer
          currentLanguage={currentLanguage}
          onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          onNavigateCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveView('home');
            window.setTimeout(() => document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
          }}
          onOpenExtension={() => setActiveView('extension')}
          onOpenDecoderModal={() => setIsDecoderModalOpen(true)}
          onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        />
      )}

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
        savedDirectoryEntries={savedDirectoryList}
        onRemoveDirectoryEntry={handleToggleDirectorySave}
        onRemoveSaved={handleToggleSave}
        onClearAll={() => {
          setSavedResourceIds([]);
          setSavedDirectoryIds([]);
        }}
        onOpenInsights={(res) => setSelectedResourceForInsights(res)}
      />
    </div>
  );
}

export default App;
