import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Language, 
  CategoryId, 
  DemonstrationResource, 
  IntakeProfile,
  TextSize
} from './types';
import { demonstrationResources } from './data/resources';
import { directoryEntries } from './data/directory';
import { translations } from './data/translations';
import type { SavedScriptedStep } from './data/answers';

// Components
import { Navbar } from './components/Navbar';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { HeroConversationalSearch } from './components/HeroConversationalSearch';
import { HomeCategoryGrid } from './components/HomeCategoryGrid';
import { HomeHowItWorks } from './components/HomeHowItWorks';
import type { DirectoryCategoryId } from './components/CategoryTabs';
import { IntroductionForm } from './components/IntroductionForm';
import { ResourceCard } from './components/ResourceCard';
import { CommunityDirectory } from './components/CommunityDirectory';
import { NextStepInsightsModal } from './components/NextStepInsightsModal';
import { SimulatedExtensionSidebar } from './components/SimulatedExtensionSidebar';
import { ExtensionSidebar } from './components/ExtensionSidebar';
import type { CompanionState } from './components/ExtensionSidebar';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { SavedResourcesDrawer } from './components/SavedResourcesDrawer';
import { AILLMConsole } from './components/AILLMConsole';
import { AIEngineInspectorModal } from './components/AIEngineInspectorModal';
import { AIDocumentDecoderModal } from './components/AIDocumentDecoderModal';
import { Footer } from './components/Footer';
import { SproutAssistant } from './components/SproutAssistant';
import { CommunityConnector } from './community/components/CommunityConnector';
import { SpeechProvider } from './speech/SpeechProvider';
import { ReadAloudButton } from './speech/ReadAloudButton';

export function App() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<'home' | 'copilot' | 'extension' | 'resources' | 'about' | 'community'>('home');
  // The simulated browser-extension companion: a closed tab, an open panel or
  // a floating pill. The app shell shifts left while the panel is open.
  const [companionState, setCompanionState] = useState<CompanionState>('closed');
  const [companionExpanded, setCompanionExpanded] = useState(false);
  // A question submitted from the homepage opens the copilot already answered.
  const [copilotQuestion, setCopilotQuestion] = useState<{ text: string; key: number } | null>(null);
  const [showSproutGreeting, setShowSproutGreeting] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [intakeSelectedNeeds, setIntakeSelectedNeeds] = useState<CategoryId[]>([]);
  
  // Secondary Filters
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [freeOnly, setFreeOnly] = useState<boolean>(false);

  // Resident Introduction Profile State
  const [userProfile, setUserProfile] = useState<IntakeProfile | null>(null);
  const [isIntroductionFormOpen, setIsIntroductionFormOpen] = useState<boolean>(false);
  const [introductionSource, setIntroductionSource] = useState<string>('hero');
  const introTriggerRef = useRef<HTMLElement | null>(null);
  const [resultsBannerDismissed, setResultsBannerDismissed] = useState(false);

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
  const [textSize, setTextSize] = useState<TextSize>('medium');

  // Short confirmation message shared by every save control.
  const [saveNotice, setSaveNotice] = useState<string>('');
  const saveNoticeTimer = useRef<number | null>(null);
  const announceSave = (message: string) => {
    setSaveNotice(message);
    if (saveNoticeTimer.current) window.clearTimeout(saveNoticeTimer.current);
    saveNoticeTimer.current = window.setTimeout(() => setSaveNotice(''), 3200);
  };

  useEffect(() => () => {
    if (saveNoticeTimer.current) window.clearTimeout(saveNoticeTimer.current);
  }, []);

  const t = translations[currentLanguage];

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  useEffect(() => {
    const savedBannerState = sessionStorage.getItem('whatsack-results-banner-dismissed');
    if (savedBannerState === 'true') setResultsBannerDismissed(true);
  }, []);

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

  // Text scaling mode: one class scales every rem-based size on the page.
  const handleTextSizeChange = (size: TextSize) => {
    setTextSize(size);
    const root = document.documentElement;
    root.classList.remove('text-small', 'text-large', 'text-xlarge');
    if (size !== 'medium') root.classList.add(`text-${size}`);
  };

  const handleToggleSave = (resourceId: string) => {
    const wasSaved = savedResourceIds.includes(resourceId);
    setSavedResourceIds((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId]
    );
    const title = demonstrationResources.find((resource) => resource.id === resourceId)?.title[currentLanguage];
    announceSave(
      wasSaved
        ? (currentLanguage === 'en' ? 'Removed from My Next Steps' : 'Eliminado de Mis Próximos Pasos') + (title ? `: ${title}` : '')
        : (currentLanguage === 'en' ? 'Saved to My Next Steps' : 'Guardado en Mis Próximos Pasos') + (title ? `: ${title}` : '')
    );
  };

  const handleToggleDirectorySave = (entryId: string) => {
    const wasSaved = savedDirectoryIds.includes(entryId);
    setSavedDirectoryIds((prev) =>
      prev.includes(entryId)
        ? prev.filter((id) => id !== entryId)
        : [...prev, entryId]
    );
    const name = directoryEntries.find((entry) => entry.id === entryId)?.name;
    announceSave(
      wasSaved
        ? (currentLanguage === 'en' ? 'Removed from My Next Steps' : 'Eliminado de Mis Próximos Pasos') + (name ? `: ${name}` : '')
        : (currentLanguage === 'en' ? 'Saved to My Next Steps' : 'Guardado en Mis Próximos Pasos') + (name ? `: ${name}` : '')
    );
  };

  // One shared category entry point for the homepage cards, the navigation
  // menu and the extension sidebar.
  const openCategory = (category: DirectoryCategoryId) => {
    setIntakeSelectedNeeds([]);
    setSelectedCategory(category);
    setActiveView('resources');
  };

  // Handle saving introduction profile
  const openIntroductionForm = (source = 'hero') => {
    introTriggerRef.current = document.activeElement as HTMLElement | null;
    setIntroductionSource(source);
    setIsIntroductionFormOpen(true);
  };

  const handleSaveProfile = (profile: IntakeProfile) => {
    setUserProfile(profile);
    // Preserve every selected need; do not silently drop multi-category selections.
    // No-ID, transit, language and timing preferences are reminders, not
    // hidden filters: organization eligibility and document rules are unverified.
    setIntakeSelectedNeeds(profile.servicePriorities);
    setSelectedCategory('all');
    setSelectedCity(profile.city && profile.city !== 'Other Silicon Valley' ? profile.city : 'all');
    setSearchQuery('');
    setFreeOnly(false);
    setActiveView('resources');
    requestAnimationFrame(() => {
      document.getElementById('directory-page-heading')?.focus();
    });
  };

  const handleClearProfile = () => {
    setUserProfile(null);
    resetAllFilters();
  };

  // Counts for the homepage category cards, taken from the same data the
  // directory and sample-program sections use.
  const categoryCounts = useMemo(() => {
    const directoryCounts: Record<CategoryId, number> = { food: 0, workforce: 0, community: 0, 'mental-health': 0 };
    directoryEntries.forEach((entry) => {
      entry.categories.forEach((category) => { directoryCounts[category] += 1; });
    });
    const sampleCounts: Record<CategoryId, number> = { food: 0, workforce: 0, community: 0, 'mental-health': 0 };
    demonstrationResources.forEach((resource) => { sampleCounts[resource.categoryId] += 1; });
    return { directoryCounts, sampleCounts };
  }, []);

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
      if (intakeSelectedNeeds.length > 0 && !intakeSelectedNeeds.includes(resource.categoryId)) return false;
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
    intakeSelectedNeeds,
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
    setIntakeSelectedNeeds([]);
    setSelectedCategory('all');
    setSelectedCity('all');
    setFreeOnly(false);
    setSearchQuery('');
  };

  return (
    <SpeechProvider language={currentLanguage} resetKey={activeView}>
    <div
      className={`qc min-h-screen flex flex-col selection:bg-[#047857] selection:text-white ${
        companionState === 'open' ? 'qc-companion-open' : ''
      } ${companionState === 'open' && companionExpanded ? 'qc-companion-expanded' : ''}`}
    >
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
        onTextSizeChange={handleTextSizeChange}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCategory={openCategory}
        onOpenExtension={() => setActiveView('extension')}
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
          onOpenIntroductionForm={(source) => openIntroductionForm(source ?? 'assistant-chip')}
          initialQuestion={copilotQuestion}
        />
      ) : activeView === 'extension' ? (
        <SimulatedExtensionSidebar
          currentLanguage={currentLanguage}
          onClose={() => setActiveView('home')}
          onNavigateHome={() => setActiveView('home')}
          onOpenCategory={openCategory}
        />
      ) : activeView === 'community' ? (
        <CommunityConnector
          currentLanguage={currentLanguage}
          onBackToHome={() => setActiveView('home')}
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
          <ReadAloudButton
            id="about-intro"
            kind="heading"
            language={currentLanguage}
            label={currentLanguage === 'en' ? 'About page introduction' : 'Introducción de la página Acerca de'}
            text={currentLanguage === 'en'
              ? 'About WhatSack. WhatSack is a student-made website that helps people explore support for school, work, food, mental health, and community life in Silicon Valley. Ask a question or choose a category. Open the resource directory to view organization websites. Save useful items in My Next Steps. Organization listings link to real websites, but details can change. Sample programs and chat answers are for class testing only. Check the organization website before making plans.'
              : 'Acerca de WhatSack. WhatSack es un sitio creado por estudiantes para explorar ayuda con estudios, trabajo, comida, salud mental y servicios comunitarios en Silicon Valley. Haga una pregunta o elija una categoría. Visite el directorio para ver sitios de organizaciones. Guarde recursos en Mis Próximos Pasos. El directorio enlaza a sitios reales, pero los datos pueden cambiar. Los programas y respuestas de ejemplo son solo para pruebas de clase. Revise el sitio oficial antes de hacer planes.'}
            className="mt-5"
          />
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
            onOpenIntroductionForm={(source) => openIntroductionForm(source ?? 'hero')}
            onClearProfile={handleClearProfile}
            userProfile={userProfile}
            matchedCount={filteredResources.length}
            onClearSearch={() => setSearchQuery('')}
          />
          <HomeHowItWorks
            currentLanguage={currentLanguage}
            onFocusSearch={() => {
              const input = document.getElementById('search-input') as HTMLInputElement | null;
              input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              input?.focus({ preventScroll: true });
            }}
            onBrowseCategories={() => {
              document.getElementById('home-categories-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
          />
          <HomeCategoryGrid
            currentLanguage={currentLanguage}
            directoryCounts={categoryCounts.directoryCounts}
            sampleCounts={categoryCounts.sampleCounts}
            onOpenCategory={openCategory}
          />
          <section className="qc-shell qc-home-start" aria-labelledby="start-here-heading">
            <div className="qc-home-start-card">
              <div className="qc-home-start-copy">
                <p className="qc-home-start-eyebrow">
                  {currentLanguage === 'en' ? 'Not sure where to start?' : '¿No sabe por dónde empezar?'}
                </p>
                <h2 id="start-here-heading" className="qc-home-start-title">
                  {currentLanguage === 'en'
                    ? 'Four quick questions. Skip any you like.'
                    : 'Cuatro preguntas rápidas. Omitir las que quiera.'}
                </h2>
                <p className="qc-home-start-text">
                  {currentLanguage === 'en'
                    ? 'We show what fits.'
                    : 'Mostramos lo que encaja.'}
                </p>
              </div>
              <div className="qc-home-start-actions">
                <button
                  type="button"
                  className="qc-home-start-button qc-home-start-button-outline"
                  onClick={() => openIntroductionForm('start-here')}
                >
                  <span>{currentLanguage === 'en' ? 'Find my support' : 'Encuentra mi apoyo'}</span>
                </button>
              </div>
            </div>

            <div className="qc-home-start-card">
              <div className="qc-home-start-copy">
                <p className="qc-home-start-eyebrow">
                  {currentLanguage === 'en' ? 'Community & social connection' : 'Comunidad y conexión social'}
                </p>
                <h2 id="community-connections-heading" className="qc-home-start-title">
                  {currentLanguage === 'en' ? 'Meet people nearby' : 'Conozca gente cerca de usted'}
                </h2>
                <p className="qc-home-start-text">
                  {currentLanguage === 'en'
                    ? 'Clubs, classes, senior programs, volunteering and cultural groups.'
                    : 'Clubes, clases, programas para mayores, voluntariado y grupos culturales.'}
                </p>
              </div>
              <div className="qc-home-start-actions">
                <button
                  type="button"
                  className="qc-home-start-button qc-home-start-button-outline"
                  onClick={() => setActiveView('community')}
                >
                  <span>{currentLanguage === 'en' ? 'Open community connections' : 'Abrir conexiones comunitarias'}</span>
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

          {/* Context from the optional intake; never imply benefits eligibility. */}
          {userProfile && (
            <section className="qc-shell pb-6" aria-label={currentLanguage === 'en' ? 'Your search preferences' : 'Sus preferencias de búsqueda'}>
              <div className="rounded-2xl border border-[#cdeedd] bg-[#f7fdfa] p-4 sm:p-5 space-y-3 text-sm text-[#1a1a24]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-bold text-lg">{currentLanguage === 'en' ? 'Your support preferences' : 'Sus preferencias de ayuda'}</h2>
                    <p className="mt-1">
                      {currentLanguage === 'en'
                        ? 'These choices help narrow the categories and area you can explore; they are not an eligibility check.'
                        : 'Estas elecciones ayudan a limitar las categorías y la zona que puede explorar; no determinan elegibilidad.'}
                    </p>
                  </div>
                  <button type="button" onClick={handleClearProfile} className="min-h-[44px] rounded-lg border border-emerald-700 px-3 py-2 font-semibold text-[#03543b] hover:bg-white">
                    {currentLanguage === 'en' ? 'Clear my preferences' : 'Borrar mis preferencias'}
                  </button>
                </div>
                {userProfile.noIdRequiredPreference && (
                  <p className="rounded-xl border border-emerald-300 bg-white p-3">
                    <strong>{currentLanguage === 'en' ? 'No ID / SSN preferred:' : 'Prefiere opciones sin identificación ni Seguro Social:'}</strong>{' '}
                    {currentLanguage === 'en'
                      ? 'You do not need to give WhatSack an ID or SSN. We cannot confirm every organization’s documentation requirements; ask them directly before visiting.'
                      : 'No necesita dar identificación ni Seguro Social a WhatSack. No podemos confirmar los requisitos de cada organización; consúltelos antes de visitar.'}
                  </p>
                )}
                {userProfile.urgency === 'today' && (
                  <p>
                    {currentLanguage === 'en'
                      ? 'Need help today? Call 211 for local assistance without waiting for this directory.'
                      : '¿Necesita ayuda hoy? Llame al 211 para encontrar asistencia local sin esperar este directorio.'}
                    {' '}<a href="tel:211" className="font-bold text-[#03543b] underline">{currentLanguage === 'en' ? 'Call 211' : 'Llamar al 211'}</a>
                  </p>
                )}
                {(userProfile.otherNeeds?.length ?? 0) > 0 && (
                  <p>
                    {currentLanguage === 'en'
                      ? 'For housing, utilities, or transportation assistance, WhatSack does not yet have reviewed listings in those categories. Use a local human referral service instead:'
                      : 'Para vivienda, servicios públicos o transporte, WhatSack aún no cuenta con listados revisados en esas categorías. Consulte un servicio de referencia local:'}
                    {' '}<a className="font-bold text-[#03543b] underline" href="https://211bayarea.org/" target="_blank" rel="noopener noreferrer">{currentLanguage === 'en' ? '211 Bay Area (opens new tab)' : '211 Bay Area (abre otra pestaña)'}</a>
                  </p>
                )}
                {(userProfile.transitDependent || (userProfile.accessPreferences?.length ?? 0) > 0 || (userProfile.preferredLanguage !== 'No preference' && userProfile.preferredLanguage)) && (
                  <p>
                    <strong>{currentLanguage === 'en' ? 'Before visiting:' : 'Antes de visitar:'}</strong>{' '}
                    {currentLanguage === 'en'
                      ? 'Please confirm transportation, language availability, appointment format, hours and accessibility with each organization. These preferences have not been verified against its current services.'
                      : 'Confirme con cada organización el transporte, idioma, modalidad de atención, horarios y accesibilidad. Estas preferencias no se han verificado con los servicios actuales.'}
                  </p>
                )}
              </div>
            </section>
          )}

          {filteredResources.length >= 15 && !resultsBannerDismissed && (
            <div className="qc-shell">
              <div className="flex flex-col gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-slate-800 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-base text-slate-800">
                  <a
                    href="#find-my-support"
                    onClick={(event) => {
                      event.preventDefault();
                      openIntroductionForm('results-banner');
                    }}
                    className="font-semibold text-[#047857] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047857] focus-visible:ring-offset-2"
                  >
                    {currentLanguage === 'en' ? 'Narrow these with 4 quick questions' : 'Reducir esto con 4 preguntas rápidas'}
                  </a>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setResultsBannerDismissed(true);
                    sessionStorage.setItem('whatsack-results-banner-dismissed', 'true');
                  }}
                  className="self-start rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047857] focus-visible:ring-offset-2"
                >
                  {currentLanguage === 'en' ? 'Dismiss' : 'Cerrar'}
                </button>
              </div>
            </div>
          )}

          {/* Community resource directory with filters */}
          <CommunityDirectory
            currentLanguage={currentLanguage}
            selectedCategory={selectedCategory}
            selectedNeeds={intakeSelectedNeeds}
            onSelectCategory={(category) => { setIntakeSelectedNeeds([]); setSelectedCategory(category); }}
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
            availableCities={availableCities}
            searchQuery={searchQuery}
            freeOnly={freeOnly}
            onToggleFreeOnly={() => setFreeOnly(!freeOnly)}
            onResetFilters={resetAllFilters}
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
              <div className="qc-empty">
                <h3 className="qc-empty-title">
                  {currentLanguage === 'en' ? 'No matching demonstration resources found' : 'No se encontraron recursos de demostración'}
                </h3>
                <p className="qc-empty-text">
                  {currentLanguage === 'en'
                    ? 'Try broadening your search filters or resetting your inquiry.'
                    : 'Intente ampliar los filtros de búsqueda o restablecer la consulta.'}
                </p>
                <div className="qc-empty-actions">
                  <button type="button" onClick={resetAllFilters} className="qc-btn-sm">
                    {t.filters.reset}
                  </button>
                </div>
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

      {/* Keep the Sprout launcher available alongside the homepage search. */}
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
          onOpenExtension={() => setActiveView('extension')}
        />
      )}

      {/* Simulated browser-extension companion, available on every view. */}
      <ExtensionSidebar
        currentLanguage={currentLanguage}
        state={companionState}
        expanded={companionExpanded}
        onOpen={() => setCompanionState('open')}
        onClose={() => setCompanionState('closed')}
        onMinimize={() => setCompanionState('minimized')}
        onRestore={() => setCompanionState('open')}
        onToggleExpanded={() => setCompanionExpanded((value) => !value)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => setActiveView('resources')}
        selectedCategory={selectedCategory}
        onSelectCategory={openCategory}
        counts={categoryCounts.directoryCounts}
        totalCount={directoryEntries.length}
        savedCount={savedResourceIds.length + savedDirectoryIds.length + savedScriptedSteps.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenCopilot={() => setActiveView('copilot')}
        onOpenExtensionDemo={() => setActiveView('extension')}
        onNavigateHome={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Find my support modal */}
      {isIntroductionFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-0 backdrop-blur-xs animate-in fade-in duration-200 sm:p-4">
          <IntroductionForm
            currentLanguage={currentLanguage}
            existingProfile={userProfile}
            onSaveProfile={handleSaveProfile}
            onClose={() => setIsIntroductionFormOpen(false)}
            isModal={true}
            source={introductionSource}
            restoreFocusTarget={introTriggerRef}
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

      {/* Short confirmation after saving or removing an item. */}
      <div className="qc-save-toast" role="status" aria-live="polite" aria-atomic="true">
        {saveNotice}
      </div>
    </div>
    </SpeechProvider>
  );
}

export default App;
