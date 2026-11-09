import React from 'react';
import { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Menu, X } from 'lucide-react';

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
  activeView: 'home' | 'copilot' | 'extension' | 'resources' | 'about';
  setActiveView: (view: 'home' | 'copilot' | 'extension' | 'resources' | 'about') => void;
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
  setActiveView
}) => {
  const t = translations[currentLanguage];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccOpen, setIsAccOpen] = useState(true);

  const goHome = () => {
    setActiveView('home');
    setIsMenuOpen(false);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  const navigate = (view: 'home' | 'copilot' | 'resources' | 'about') => {
    setActiveView(view);
    setIsMenuOpen(false);
  };

  const textSizeLabel = textSize === 'normal' ? '1x' : textSize === 'large' ? '1.2x' : '1.4x';

  const navLinks = [
    { label: t.nav.home, onClick: goHome, active: activeView === 'home' },
    {
      label: currentLanguage === 'en' ? 'Ask WhatSack' : 'Preguntar a WhatSack',
      onClick: () => { setActiveView('copilot'); setIsMenuOpen(false); },
      active: activeView === 'copilot'
    },
    {
      label: currentLanguage === 'en' ? 'Find Resources' : 'Buscar Recursos',
      onClick: () => navigate('resources'),
      active: activeView === 'resources'
    },
    {
      label: currentLanguage === 'en' ? 'My Next Steps' : 'Mis Próximos Pasos',
      onClick: () => { onOpenSavedDrawer(); setIsMenuOpen(false); },
      active: false
    },
    {
      label: currentLanguage === 'en' ? 'About' : 'Acerca de',
      onClick: () => navigate('about'),
      active: activeView === 'about'
    }
  ];

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
            className="qc-link min-h-0 ml-auto text-[12px] text-[#047857]"
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
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={link.onClick}
                  aria-current={link.active ? 'page' : undefined}
                  className={`qc-link min-h-0 ${link.active ? 'on' : ''}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-5">
            <details
              className="qc-acc"
              open={isAccOpen}
              onToggle={(e) => setIsAccOpen(e.currentTarget.open)}
            >
              <summary>{currentLanguage === 'en' ? 'Accessibility' : 'Accesibilidad'}</summary>
              <div className="qc-accp">
                <div className="qc-language" role="group" aria-label={currentLanguage === 'en' ? 'Language' : 'Idioma'}>
                  <span>{currentLanguage === 'en' ? 'Language' : 'Idioma'}</span>
                  <button type="button" onClick={() => onLanguageChange('en')} aria-pressed={currentLanguage === 'en'}><span lang="en">EN</span></button>
                  <button type="button" onClick={() => onLanguageChange('es')} aria-pressed={currentLanguage === 'es'}><span lang="es">Español</span></button>
                </div>
                <button type="button" onClick={onCycleTextSize} title={t.a11y.textSize}>
                  {currentLanguage === 'en' ? 'Text Size' : 'Tamaño de Letra'} · {textSizeLabel}
                </button>
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
          <div className="qc-shell py-5 flex flex-col gap-3 text-[14px] tracking-[.06em]">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={link.onClick}
                className={`qc-link min-h-0 self-start ${link.active ? 'on' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
