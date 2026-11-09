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
import type { SavedScriptedStep } from './data/answers';

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
import { SproutAssistant } from './components/SproutAssistant';

export function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<'home' | 'copilot' | 'extension' | 'resources' | 'about'>('home');
  // A question submitted from the homepage opens the copilot already answered.
  const [copilotQuestion, setCopilotQuestion] = useState<{ text: string; key: number } | null>(null);
  const [showSproutGreeting, setShowSproutGreeting] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  
  // Secondary Filters
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [freeOnly, setFreeOnly] = useState<boolean>(false);

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
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>([]);
  const [savedDirectoryIds, setSavedDirectoryIds] = useState<string[]>([]);
  const [savedScriptedSteps, setSavedScriptedSteps] = useState<SavedScriptedStep[]>([]);
  const [completedScriptedIds, setCompletedScriptedIds] = useState<string[]>([]);
  const [completedActionIds, setCompletedActionIds] = useState<string[]>([]);

  const toggleCompletedAction = (id: string) => setCompletedActionIds(prev =>
    prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
  );
  const toggleCompletedScriptedStep = (id: string) => setCompletedScriptedIds(prev =>
    prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
  );
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const t = translations[currentLanguage];

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // After a page change, read the destination heading before its controls.
  useEffect(() => {
    if (activeView === 'extension') return;
    const destination = activeView === 'resources' ? 'directory-page-heading'
      : activeView === 'about' ? 'about-heading'
      : activeView === 'home' ? 'hero-title' : 'main-content';
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.getElementById(destination)?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeView]);

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
    // Apply category and location preferences, without hidden ID restrictions.
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
    directoryEntries.forEach((r) => { if (!['Online', 'Statewide', 'Multiple campuses'].includes(r.city)) cities.add(r.city); });
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
    setSearchQuery('');
  };

  return (
    <div className="qc min-h-screen flex flex-col selection:bg-[#047857] selection:text-white">
      {/* Navbar */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        savedCount={savedResourceIds.length + savedDirectoryIds.length + savedScriptedSteps.length}
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
          savedResourceIds={savedResourceIds}
          savedScriptedSteps={savedScriptedSteps}
          onSaveScriptedStep={(step) => setSavedScriptedSteps(prev =>
            prev.some(item => item.id === step.id) ? prev : [...prev, step]
          )}
          onSavePlanAction={(resourceId) =>
            setSavedResourceIds((prev) =>
              prev.includes(resourceId) ? prev : [...prev, resourceId]
            )
          }
          onOpenInsights={(res) => setSelectedResourceForInsights(res)}
          initialQuestion={copilotQuestion}
        />
      ) : activeView === 'extension' ? (
        <SimulatedExtensionSidebar
          currentLanguage={currentLanguage}
          onClose={() => setActiveView('home')}
          onNavigateHome={() => setActiveView('home')}
        />
      ) : activeView === 'about' ? (
        <main id="main-content" tabIndex={-1} className="flex-1 qc-shell qc-page" aria-labelledby="about-heading">
          <div className="qc-eyebrow">{currentLanguage === 'en' ? 'About WhatSack' : 'Acerca de WhatSack'}</div>
          <h1 id="about-heading" tabIndex={-1} className="qc-h2 qc-page-title">
            {currentLanguage === 'en' ? 'About WhatSack' : 'Acerca de WhatSack'}
          </h1>
          <p className="qc-dsub">
            {currentLanguage === 'en'
              ? 'WhatSack is a student-made website that helps people explore support for school, work, food, mental health, and community life in Silicon Valley.'
              : 'WhatSack es un sitio creado por estudiantes para explorar ayuda con estudios, trabajo, comida, salud mental y servicios comunitarios en Silicon Valley.'}
          </p>
          <h2 className="qc-about-h2">{currentLanguage === 'en' ? 'How it works' : 'Cómo funciona'}</h2>
          <p className="qc-dsub">
            {currentLanguage === 'en'
              ? 'Ask a question or choose a category. Open the resource directory to view organization websites. Save useful items in My Next Steps.'
              : 'Haga una pregunta o elija una categoría. Visite el directorio para ver sitios de organizaciones. Guarde recursos en Mis Próximos Pasos.'}
          </p>
          <h2 className="qc-about-h2">{currentLanguage === 'en' ? 'What is real?' : '¿Qué es real?'}</h2>
          <p className="qc-dsub">
            {currentLanguage === 'en'
              ? 'Organization listings link to real websites, but details can change. Sample programs and chat answers are for class testing only. Check the organization website before making plans.'
              : 'El directorio enlaza a sitios reales, pero los datos pueden cambiar. Los programas y respuestas de ejemplo son solo para pruebas de clase. Revise el sitio oficial antes de hacer planes.'}
          </p>
          <button type="button" className="qc-btn-sm mt-8" onClick={() => setIsDisclaimerOpen(true)}>
            {currentLanguage === 'en' ? 'Read the safety notice' : 'Leer el aviso de seguridad'}
          </button>
        </main>
      ) : (
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-hidden">
          {/* Home presents one search question and four category paths. */}
          {activeView === 'home' && (<>
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
            onSelectCategory={(cat) => { setSelectedCategory(cat); setActiveView('resources'); }}
          />
          <section className="qc-shell qc-home-start" aria-labelledby="start-here-heading">
            <div className="qc-home-start-card">
              <div className="qc-home-start-copy">
                <p className="qc-home-start-eyebrow">
                  {currentLanguage === 'en' ? 'Start here' : 'Empiece aquí'}
                </p>
                <h2 id="start-here-heading" className="qc-home-start-title">
                  {currentLanguage === 'en'
                    ? 'Prefer to browse instead of ask?'
                    : '¿Prefiere explorar en vez de preguntar?'}
                </h2>
                <p className="qc-home-start-text">
                  {currentLanguage === 'en'
                    ? 'Explore local organizations by category and city. Find useful links at your own pace.'
                    : 'Explore organizaciones locales por categoría y ciudad. Encuentre enlaces a su propio ritmo.'}
                </p>
              </div>
              <div className="qc-home-start-actions">
                <button
                  type="button"
                  className="qc-home-start-button"
                  onClick={() => { resetAllFilters(); setActiveView('resources'); }}
                >
                  <span>{currentLanguage === 'en' ? 'Browse all resources' : 'Ver todos los recursos'}</span>
                  <span aria-hidden="true" className="qc-home-start-arrow">→</span>
                </button>
              </div>
            </div>
          </section>
          </>)}

          {activeView === 'resources' && (<>
          <div className="qc-shell qc-page-heading">
            <div className="qc-eyebrow">{currentLanguage === 'en' ? 'Find Resources' : 'Buscar Recursos'}</div>
            <h1 id="directory-page-heading" tabIndex={-1} className="qc-h2 qc-page-title">{currentLanguage === 'en' ? 'Find Resources' : 'Buscar Recursos'}</h1>
            <p className="qc-dsub">{currentLanguage === 'en' ? 'Browse organizations and sample programs. Check each organization website for current details.' : 'Explore organizaciones y programas de ejemplo. Consulte cada sitio oficial para ver datos actuales.'}</p>
          </div>

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
            demonstrationCount={filteredResources.length}
            isEntrySaved={(entryId) => savedDirectoryIds.includes(entryId)}
            onToggleEntrySave={handleToggleDirectorySave}
          />

          {/* Demonstration resources */}
          <section id="resources" aria-labelledby="resources-heading" className="qc-shell pt-16 scroll-mt-28">
            <h2 id="resources-heading" className="qc-h2">
              {currentLanguage === 'en' ? 'Sample programs (class examples)' : 'Programas de ejemplo (para clase)'}
            </h2>
            <p className="qc-dsub mb-8">
              {currentLanguage === 'en'
                ? `${filteredResources.length} sample programs. These are not live services; do not use the sample phone numbers or addresses.`
                : `${filteredResources.length} programas de ejemplo. No son servicios reales; no use los números ni las direcciones de ejemplo.`}
            </p>
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

          </>)}



        </main>
      )}

      {/* Sprout is a user-invoked, accessible companion to Ask WhatSack. */}
      {['home', 'resources', 'about'].includes(activeView) && (
        <SproutAssistant
          currentLanguage={currentLanguage}
          showGreeting={showSproutGreeting}
          onDismissGreeting={() => setShowSproutGreeting(false)}
          onOpenChat={() => {
            setShowSproutGreeting(false);
            setActiveView('copilot');
          }}
        />
      )}

      {/* Footer */}
      {activeView !== 'extension' && (
        <Footer
          currentLanguage={currentLanguage}
          onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
          onNavigateCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveView('resources');
          }}
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
        completedActionIds={completedActionIds}
        onToggleAction={toggleCompletedAction}
      />

      <SavedResourcesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        currentLanguage={currentLanguage}
        savedResources={savedResourcesList}
        savedDirectoryEntries={savedDirectoryList}
        savedScriptedSteps={savedScriptedSteps}
        completedScriptedIds={completedScriptedIds}
        onToggleScriptedStep={toggleCompletedScriptedStep}
        onRemoveScriptedStep={(id) => {
          setSavedScriptedSteps(prev => prev.filter(item => item.id !== id));
          setCompletedScriptedIds(prev => prev.filter(item => item !== id));
        }}
        completedActionIds={completedActionIds}
        onToggleAction={toggleCompletedAction}
        onRemoveDirectoryEntry={handleToggleDirectorySave}
        onRemoveSaved={handleToggleSave}
        onClearAll={() => {
          setSavedResourceIds([]);
          setSavedDirectoryIds([]);
          setSavedScriptedSteps([]);
          setCompletedScriptedIds([]);
          setCompletedActionIds([]);
        }}
        onOpenInsights={(res) => setSelectedResourceForInsights(res)}
      />
    </div>
  );
}

export default App;
