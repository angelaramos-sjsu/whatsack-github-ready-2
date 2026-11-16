import React from 'react';
import { useState } from 'react';
import { Language, TextSize } from '../types';
import { translations } from '../data/translations';
import { Menu, X } from 'lucide-react';
import { ReadAloudButton } from '../speech/ReadAloudButton';
import { CategoryMenu } from './CategoryMenu';
import { DirectoryCategoryId, directoryCategoryLabels, directoryCategoryOrder } from './CategoryTabs';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSavedDrawer: () => void;
  onOpenDisclaimer: () => void;
  savedCount: number;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  textSize: TextSize;
  onTextSizeChange: (size: TextSize) => void;
  activeView: 'home' | 'copilot' | 'extension' | 'resources' | 'about' | 'community';
  setActiveView: (view: 'home' | 'copilot' | 'extension' | 'resources' | 'about' | 'community') => void;
  onOpenCategory: (category: DirectoryCategoryId) => void;
  onOpenExtension: () => void;
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
  onTextSizeChange,
  activeView,
  setActiveView,
  onOpenCategory,
  onOpenExtension
}) => {
  const t = translations[currentLanguage];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccOpen, setIsAccOpen] = useState(false);
  const [isCatOpen, setIsCatOpen] = useState(false);

  const goHome = () => {
    setActiveView('home');
    setIsMenuOpen(false);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  const navigate = (view: 'home' | 'copilot' | 'resources' | 'about' | 'community') => {
    setActiveView(view);
    setIsMenuOpen(false);
  };

  const textSizeOptions: { id: TextSize; label: string }[] = currentLanguage === 'en'
    ? [
        { id: 'small', label: 'Small' },
        { id: 'medium', label: 'Medium' },
        { id: 'large', label: 'Large' },
        { id: 'xlarge', label: 'Extra large' }
      ]
    : [
        { id: 'small', label: 'Pequeña' },
        { id: 'medium', label: 'Mediana' },
        { id: 'large', label: 'Grande' },
        { id: 'xlarge', label: 'Muy grande' }
      ];

  const navLinks = [
    { id: 'home' as const, label: t.nav.home, onClick: goHome, active: activeView === 'home' },
    {
      id: 'copilot' as const,
      label: currentLanguage === 'en' ? 'Ask WhatSack' : 'Preguntar a WhatSack',
      onClick: () => { setActiveView('copilot'); setIsMenuOpen(false); },
      active: activeView === 'copilot'
    },
    {
      id: 'resources' as const,
      label: currentLanguage === 'en' ? 'Find Resources' : 'Buscar Recursos',
      onClick: () => navigate('resources'),
      active: activeView === 'resources'
    },
    {
      id: 'community' as const,
      label: currentLanguage === 'en' ? 'Community' : 'Comunidad',
      onClick: () => navigate('community'),
      active: activeView === 'community'
    },
    {
      id: 'saved' as const,
      label: currentLanguage === 'en' ? 'My Next Steps' : 'Mis Próximos Pasos',
      onClick: () => { onOpenSavedDrawer(); setIsMenuOpen(false); },
      active: false
    },
    {
      id: 'about' as const,
      label: currentLanguage === 'en' ? 'About' : 'Acerca de',
      onClick: () => navigate('about'),
      active: activeView === 'about'
    }
  ];

  const navigationSpeech = currentLanguage === 'en'
    ? `Main menu: ${navLinks.map((link) => link.label).join(', ')}. Find Resources opens the four resource categories. Website language: English or Español. Accessibility menu: text size, high contrast, saved items. Read aloud controls open from the Read aloud button at the side of the page.`
    : `Menú principal: ${navLinks.map((link) => link.label).join(', ')}. Buscar Recursos abre las cuatro categorías de recursos. Idioma del sitio: English o Español. Menú de accesibilidad: tamaño de letra, alto contraste, guardados. Los controles de lectura en voz alta se abren con el botón Leer en voz alta al lado de la página.`;

  return (
    <header className="relative z-40 bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#047857] focus:text-white focus:rounded-md focus:font-semibold"
      >
        {t.a11y.skipToContent}
      </a>

      {/* Academic prototype strip */}
      <div className="qc-ban qc-rise" style={{ animationDelay: '0s' }}>
        <div className="qc-shell qc-ban-inner">
          <b>{t.app.prototypeBadge}</b>
          <span>{t.app.prototypeNotice}</span>
          <button
            type="button"
            onClick={onOpenDisclaimer}
            className="qc-link min-h-0 ml-auto text-[0.75rem] text-[#047857]"
          >
            {currentLanguage === 'en' ? 'Safety Notice' : 'Aviso de Seguridad'}
          </button>
        </div>
      </div>

      <div className="qc-shell">
        <nav aria-label="Main Navigation" className="qc-nav qc-rise" style={{ animationDelay: '.1s' }}>
          <div className="qc-nav-l">
            <button
              type="button"
              onClick={goHome}
              className="qc-brand min-h-0"
              aria-label="WhatSack Home"
            >
              {t.app.name}
            </button>

            <div className="qc-nav-links hidden lg:flex">
              {navLinks.map((link) =>
                link.id === 'resources' ? (
                  <CategoryMenu
                    key={link.id}
                    label={link.label}
                    currentLanguage={currentLanguage}
                    active={link.active}
                    open={isCatOpen}
                    onOpenChange={(open) => {
                      setIsCatOpen(open);
                      if (open) setIsAccOpen(false);
                    }}
                    onSelectCategory={(category) => {
                      setIsCatOpen(false);
                      onOpenCategory(category);
                    }}
                  />
                ) : (
                  <button
                    key={link.id}
                    type="button"
                    onClick={link.onClick}
                    aria-current={link.active ? 'page' : undefined}
                    className={`qc-link min-h-0 ${link.active ? 'on' : ''}`}
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="qc-nav-tools">
            <div className="qc-header-language" role="group" aria-label={currentLanguage === 'en' ? 'Website language' : 'Idioma del sitio'}>
              <button type="button" lang="en" onClick={() => onLanguageChange('en')} aria-pressed={currentLanguage === 'en'}>EN</button>
              <button type="button" lang="es" onClick={() => onLanguageChange('es')} aria-pressed={currentLanguage === 'es'}>Español</button>
            </div>
            <details
              className="qc-acc"
              open={isAccOpen}
              onToggle={(e) => {
                setIsAccOpen(e.currentTarget.open);
                if (e.currentTarget.open) setIsCatOpen(false);
              }}
            >
              <summary>{currentLanguage === 'en' ? 'Accessibility' : 'Accesibilidad'}</summary>
              <div className="qc-accp">
                <div className="qc-accp-group" role="group" aria-label={currentLanguage === 'en' ? 'Text size' : 'Tamaño de letra'}>
                  <span className="qc-accp-label">{currentLanguage === 'en' ? 'Text Size' : 'Tamaño de Letra'}</span>
                  {textSizeOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        onTextSizeChange(option.id);
                        setIsAccOpen(false);
                      }}
                      aria-pressed={textSize === option.id}
                      title={`${currentLanguage === 'en' ? 'Text size' : 'Tamaño de letra'}: ${option.label}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <ReadAloudButton
                  id="nav-navigation"
                  kind="navigation"
                  language={currentLanguage}
                  label={currentLanguage === 'en' ? 'Menu and accessibility controls' : 'Menú y controles de accesibilidad'}
                  text={navigationSpeech}
                  className="qc-read--popover"
                />
                <button
                  type="button"
                  onClick={onToggleHighContrast}
                  aria-pressed={highContrast}
                  title={t.a11y.highContrast}
                >
                  {currentLanguage === 'en' ? 'High Contrast' : 'Alto Contraste'}{highContrast ? ' · On' : ''}
                </button>
                <button type="button" onClick={onOpenSavedDrawer} title={t.nav.saved}>
                  {currentLanguage === 'en' ? 'Saved Items' : 'Guardados'} ({savedCount})
                </button>
              </div>
            </details>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="qc-link min-h-0 lg:hidden flex items-center gap-1.5"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMenuOpen ? (currentLanguage === 'en' ? 'Close navigation menu' : 'Cerrar menú') : (currentLanguage === 'en' ? 'Open navigation menu' : 'Abrir menú')}
            >
              {isMenuOpen ? <X className="w-4 h-4" aria-hidden="true" /> : <Menu className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden border-t border-[#e3f3ea] bg-white">
          <div className="qc-shell py-5 flex flex-col gap-3 text-[0.875rem] tracking-[.06em]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={link.onClick}
                aria-current={link.active ? 'page' : undefined}
                className={`qc-link min-h-0 self-start ${link.active ? 'on' : ''}`}
              >
                {link.label}
              </button>
            ))}

            <div className="qc-m-cats" role="group" aria-label={currentLanguage === 'en' ? 'Resource categories' : 'Categorías de recursos'}>
              <span className="qc-m-cats-title">{currentLanguage === 'en' ? 'Categories' : 'Categorías'}</span>
              {directoryCategoryOrder.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="qc-m-cat"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenCategory(category);
                  }}
                >
                  {directoryCategoryLabels[category][currentLanguage]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onOpenExtension();
              }}
              className="qc-link min-h-0 self-start"
            >
              {currentLanguage === 'en' ? 'Browser extension demo' : 'Demostración de la extensión'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
