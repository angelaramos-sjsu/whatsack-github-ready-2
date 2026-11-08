import React, { useEffect, useRef, useState } from 'react';
import { Bookmark, ChevronDown, Menu, Sparkles, X } from 'lucide-react';
import { CategoryId, Language } from '../types';
import { translations } from '../data/translations';
import { directoryCategories } from '../data/categories';
import { CategoryGlyph } from './CategoryGlyph';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSavedDrawer: () => void;
  onOpenDisclaimer: () => void;
  savedCount: number;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  textSize: 'normal' | 'large' | 'xlarge';
  onCycleTextSize: () => void;
  activeView: 'home' | 'copilot' | 'extension';
  setActiveView: (view: 'home' | 'copilot' | 'extension') => void;
  onSelectCategory: (category: CategoryId | 'all') => void;
  categoryCounts: Record<CategoryId, number>;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenSavedDrawer,
  onOpenDisclaimer,
  savedCount,
  highContrast,
  onToggleHighContrast,
  textSize,
  onCycleTextSize,
  activeView,
  setActiveView,
  onSelectCategory,
  categoryCounts,
  isSidebarOpen,
  onToggleSidebar
}) => {
  const t = translations[currentLanguage];
  const en = currentLanguage === 'en';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccOpen, setIsAccOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDetailsElement>(null);

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false);
    if (resourcesRef.current) resourcesRef.current.open = false;
  };

  const goHome = () => {
    setActiveView('home');
    closeMenus();
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  const goToView = (view: 'home' | 'copilot') => {
    setActiveView(view);
    closeMenus();
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  const goToCategory = (category: CategoryId | 'all') => {
    onSelectCategory(category);
    closeMenus();
  };

  const toggleLanguage = () => onLanguageChange(currentLanguage === 'en' ? 'es' : 'en');
  const textSizeLabel = textSize === 'normal' ? '1x' : textSize === 'large' ? '1.2x' : '1.4x';

  // Escape closes any open navigation surface (WCAG 2.1.1).
  useEffect(() => {
    if (!isMenuOpen && !isResourcesOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenus();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isResourcesOpen]);

  return (
    <header className="relative z-40 bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4C1D95] focus:text-white focus:rounded-md focus:font-semibold"
      >
        {t.a11y.skipToContent}
      </a>

      {/* Academic prototype strip */}
      <div className="qc-ban">
        <div className="qc-shell qc-ban-inner">
          <b>{t.app.prototypeBadge}</b>
          <span>{t.app.prototypeNotice}</span>
          <button
            type="button"
            onClick={onOpenDisclaimer}
            className="qc-link min-h-0 ml-auto text-[12px] text-[#4C1D95]"
          >
            {en ? 'Safety Notice' : 'Aviso de Seguridad'}
          </button>
        </div>
      </div>

      <div className="qc-navbar">
        <div className="qc-shell">
          <nav aria-label={en ? 'Main navigation' : 'Navegación principal'} className="qc-nav">
            <div className="qc-nav-l">
              <button type="button" onClick={goHome} className="qc-brand qc-nav-brand min-h-0" aria-label={en ? 'WhatSack home' : 'Inicio de WhatSack'}>
                <span className="qc-brand-mark" aria-hidden="true">WS</span>
                <span>
                  {t.app.name}
                  <span className="hidden sm:block text-[10.5px] font-normal tracking-[0.12em] text-[#6b6880] uppercase">
                    {t.app.subname}
                  </span>
                </span>
              </button>

              <div className="qc-nav-links hidden lg:flex">
                <button
                  type="button"
                  onClick={goHome}
                  aria-current={activeView === 'home' ? 'page' : undefined}
                  className={`qc-link min-h-0 ${activeView === 'home' ? 'on' : ''}`}
                >
                  {t.nav.home}
                </button>

                <details
                  ref={resourcesRef}
                  className="qc-menu"
                  open={isResourcesOpen}
                  onToggle={(e) => setIsResourcesOpen(e.currentTarget.open)}
                >
                  <summary>
                    {en ? 'Resources' : 'Recursos'}
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  </summary>
                  <div className="qc-menu-panel">
                    {directoryCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => goToCategory(category.id)}
                        className="qc-menu-item"
                      >
                        <CategoryGlyph id={category.id} />
                        <span>{category.name[currentLanguage]}</span>
                        <span className="qc-menu-count">{categoryCounts[category.id] || 0}</span>
                      </button>
                    ))}
                    <div className="qc-menu-all">
                      <button type="button" onClick={() => goToCategory('all')} className="qc-menu-item">
                        <Sparkles aria-hidden="true" />
                        <span>{en ? 'Browse all resources' : 'Ver todos los recursos'}</span>
                      </button>
                    </div>
                  </div>
                </details>

                <button
                  type="button"
                  onClick={() => goToView('copilot')}
                  aria-current={activeView === 'copilot' ? 'page' : undefined}
                  className={`qc-link min-h-0 ${activeView === 'copilot' ? 'on' : ''}`}
                >
                  {en ? 'Ask WhatSack' : 'Preguntar a WhatSack'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenSavedDrawer();
                    closeMenus();
                  }}
                  className="qc-link min-h-0"
                >
                  {en ? 'My Next Steps' : 'Mis Próximos Pasos'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenDisclaimer();
                    closeMenus();
                  }}
                  className="qc-link min-h-0"
                >
                  {en ? 'About' : 'Acerca de'}
                </button>
              </div>
            </div>

            <div className="qc-nav-tools">
              <div className="hidden md:block">
                <button
                  type="button"
                  onClick={onToggleSidebar}
                  aria-pressed={isSidebarOpen}
                  className="qc-btn-secondary min-h-0"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>{en ? 'Companion' : 'Compañero'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={onOpenSavedDrawer}
                className="qc-link min-h-0 hidden sm:inline-flex items-center gap-1.5"
                aria-label={`${t.nav.saved} (${savedCount})`}
              >
                <Bookmark className="h-4 w-4" aria-hidden="true" />
                <span>{savedCount}</span>
              </button>

              <details
                className="qc-acc"
                open={isAccOpen}
                onToggle={(e) => setIsAccOpen(e.currentTarget.open)}
              >
                <summary>{en ? 'Accessibility' : 'Accesibilidad'}</summary>
                <div className="qc-accp">
                  <button type="button" onClick={toggleLanguage} title={t.nav.language}>
                    {en ? 'Language' : 'Idioma'} · {currentLanguage.toUpperCase()}
                  </button>
                  <button type="button" onClick={onCycleTextSize} title={t.a11y.textSize}>
                    {en ? 'Text Size' : 'Tamaño de Letra'} · {textSizeLabel}
                  </button>
                  <button
                    type="button"
                    onClick={onToggleHighContrast}
                    aria-pressed={highContrast}
                    title={t.a11y.highContrast}
                  >
                    {en ? 'High Contrast' : 'Alto Contraste'}{highContrast ? (en ? ' · On' : ' · Sí') : ''}
                  </button>
                  <button type="button" onClick={onOpenSavedDrawer} title={t.nav.saved}>
                    {t.nav.saved} ({savedCount})
                  </button>
                </div>
              </details>

              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="qc-link min-h-0 lg:hidden inline-flex items-center gap-1.5"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={isMenuOpen ? (en ? 'Close navigation menu' : 'Cerrar menú') : (en ? 'Open navigation menu' : 'Abrir menú')}
              >
                {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden border-t border-[#ece9f7] bg-white">
          <div className="qc-shell py-5 flex flex-col gap-3 text-[14px] tracking-[.06em]">
            <button type="button" onClick={goHome} className={`qc-link min-h-0 self-start ${activeView === 'home' ? 'on' : ''}`}>
              {t.nav.home}
            </button>
            <button type="button" onClick={() => goToView('copilot')} className={`qc-link min-h-0 self-start ${activeView === 'copilot' ? 'on' : ''}`}>
              {en ? 'Ask WhatSack' : 'Preguntar a WhatSack'}
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenSavedDrawer();
                closeMenus();
              }}
              className="qc-link min-h-0 self-start"
            >
              {en ? 'My Next Steps' : 'Mis Próximos Pasos'} ({savedCount})
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenDisclaimer();
                closeMenus();
              }}
              className="qc-link min-h-0 self-start"
            >
              {en ? 'About' : 'Acerca de'}
            </button>
            <button
              type="button"
              onClick={() => {
                onToggleSidebar();
                closeMenus();
              }}
              className="qc-link min-h-0 self-start inline-flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-[#4C1D95]" aria-hidden="true" />
              {en ? 'Companion sidebar' : 'Barra lateral'}
            </button>

            <div className="qc-mnav-label">{en ? 'Resource categories' : 'Categorías de recursos'}</div>
            <div className="qc-mnav-cats">
              {directoryCategories.map((category) => (
                <button key={category.id} type="button" onClick={() => goToCategory(category.id)}>
                  <CategoryGlyph id={category.id} />
                  <span>{category.name[currentLanguage]}</span>
                  <span className="ml-auto text-[12px] text-[#6b6880]">{categoryCounts[category.id] || 0}</span>
                </button>
              ))}
              <button type="button" onClick={() => goToCategory('all')}>
                <Sparkles className="h-[17px] w-[17px]" aria-hidden="true" />
                <span>{en ? 'All resources' : 'Todos los recursos'}</span>
              </button>
            </div>

            <div className="qc-mnav-label">{en ? 'Accessibility' : 'Accesibilidad'}</div>
            <div className="flex flex-wrap gap-4 pb-2">
              <button type="button" onClick={toggleLanguage} className="qc-btn-ghost">
                {en ? 'Language' : 'Idioma'} · {currentLanguage.toUpperCase()}
              </button>
              <button type="button" onClick={onCycleTextSize} className="qc-btn-ghost">
                {t.a11y.textSize} · {textSizeLabel}
              </button>
              <button type="button" onClick={onToggleHighContrast} aria-pressed={highContrast} className="qc-btn-ghost">
                {en ? 'High contrast' : 'Alto contraste'}{highContrast ? (en ? ' · On' : ' · Sí') : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
