import React from 'react';
import { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Bot, 
  Brain, 
  Mic, 
  SidebarOpen, 
  BookmarkCheck, 
  Eye, 
  AlertTriangle,
  FileText,
  Type,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenVoiceModal: () => void;
  onToggleExtensionView: () => void;
  onOpenSavedDrawer: () => void;
  onOpenDisclaimer: () => void;
  onOpenArchitectureModal: () => void;
  onOpenDecoderModal: () => void;
  onOpenIntroductionForm: () => void;
  userProfile: any;
  savedCount: number;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  textSize: 'normal' | 'large' | 'xlarge';
  onCycleTextSize: () => void;
  activeView: 'home' | 'copilot' | 'extension';
  setActiveView: (view: 'home' | 'copilot' | 'extension') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenVoiceModal,
  onToggleExtensionView,
  onOpenSavedDrawer,
  onOpenDisclaimer,
  onOpenArchitectureModal,
  onOpenDecoderModal,
  onOpenIntroductionForm,
  userProfile,
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

  const goHome = () => {
    setActiveView('home');
    setIsMenuOpen(false);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
  };

  const goToSection = (id: string) => {
    setActiveView('home');
    setIsMenuOpen(false);
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* WCAG Skip to Main Content Link */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-emerald-800 focus:text-white focus:rounded-xl focus:font-extrabold focus:shadow-xl focus:ring-4 focus:ring-emerald-400"
      >
        {t.a11y.skipToContent}
      </a>

      {/* Top Academic & Accessibility Banner */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wider">
              {t.app.prototypeBadge}
            </span>
            <span className="text-slate-300 font-medium hidden md:inline">
              {t.app.prototypeNotice}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenArchitectureModal}
              className="text-xs text-emerald-300 hover:text-emerald-200 font-bold flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md px-1"
            >
              <Brain className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{currentLanguage === 'en' ? 'AI Architecture' : 'Arquitectura IA'}</span>
            </button>
            <span className="text-slate-600" aria-hidden="true">•</span>
            <button
              onClick={onOpenDisclaimer}
              className="text-xs text-amber-300 hover:text-amber-200 font-bold underline flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md px-1"
            >
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{currentLanguage === 'en' ? 'Safety Notice' : 'Aviso de Seguridad'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav aria-label="Main Navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={goHome}
            className="flex items-center gap-3 text-left group focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-2xl p-1"
            aria-label="WhatSack Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-emerald-600/30">
              <span className="text-xl" role="img" aria-label="Sprout">🌱</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900">
                  {t.app.name}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  SV 2026
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium hidden md:block">
                {t.app.subname}
              </p>
            </div>
          </button>
        </div>

        {/* Center Navigation Links: Clean, spacious tabs */}
        <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold" role="tablist">
          <button
            onClick={() => setActiveView('home')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeView === 'home'
                ? 'bg-white text-emerald-900 shadow-xs border border-slate-200'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
            aria-current={activeView === 'home' ? 'page' : undefined}
          >
            {t.nav.explore}
          </button>

          <button
            onClick={() => setActiveView('copilot')}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeView === 'copilot'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-700 hover:text-emerald-800 hover:bg-slate-200/60'
            }`}
            aria-current={activeView === 'copilot' ? 'page' : undefined}
          >
            <Bot className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>{t.nav.aiCopilot}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          </button>

          <button
            onClick={onOpenDecoderModal}
            className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 transition-all flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-slate-600" aria-hidden="true" />
            <span>{t.nav.docDecoder}</span>
          </button>

          <button
            onClick={onOpenIntroductionForm}
            className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              userProfile
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <span>📋</span>
            <span>
              {userProfile 
                ? `${userProfile.name} (${userProfile.city})`
                : (currentLanguage === 'en' ? 'Introduction Form' : 'Formulario de Inicio')}
            </span>
          </button>
        </div>

        {/* Action Controls & Accessibility Tools */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          {/* Text Size Scaler (WCAG Accessibility Tool) */}
          <button
            onClick={onCycleTextSize}
            className="p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 flex items-center gap-1 transition-colors"
            title={`${t.a11y.textSize}: ${textSize.toUpperCase()}`}
            aria-label={`${t.a11y.textSize}: currently ${textSize}`}
          >
            <Type className="w-4 h-4 text-slate-700" aria-hidden="true" />
            <span className="font-mono text-[11px] font-extrabold">
              {textSize === 'normal' ? '1x' : textSize === 'large' ? '1.2x' : '1.4x'}
            </span>
          </button>

          {/* High Contrast AAA Toggle */}
          <button
            onClick={onToggleHighContrast}
            className={`p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1 ${
              highContrast
                ? 'bg-black text-white border-black ring-2 ring-yellow-400'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
            }`}
            title={t.a11y.highContrast}
            aria-label={t.a11y.highContrast}
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
            <span className="hidden xl:inline text-[11px]">
              {highContrast ? 'AAA On' : 'Contrast'}
            </span>
          </button>

          {/* Simulated Browser Extension Toggle */}
          <button
            onClick={onToggleExtensionView}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              activeView === 'extension'
                ? 'bg-indigo-700 text-white shadow-indigo-200'
                : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100 border border-indigo-200'
            }`}
            title="Simulate WhatSack browser companion extension"
          >
            <SidebarOpen className="w-4 h-4" aria-hidden="true" />
            <span className="hidden md:inline">{t.nav.extension}</span>
            <span className="md:hidden">Extension</span>
          </button>

          {/* Voice Mode Button */}
          <button
            onClick={onOpenVoiceModal}
            className="px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-300 transition-all shadow-xs"
            title="Simulated Voice Assistant"
            aria-label={t.a11y.voiceInput}
          >
            <Mic className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            <span className="hidden sm:inline">{t.nav.voice}</span>
          </button>

          {/* Saved Items */}
          <button
            onClick={onOpenSavedDrawer}
            className="relative px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 transition-all"
            title="Saved resources and checklists"
            aria-label={`${t.nav.saved}: ${savedCount} items`}
          >
            <BookmarkCheck className="w-4 h-4 text-slate-700" aria-hidden="true" />
            <span className="hidden xl:inline">{t.nav.saved}</span>
            {savedCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-[11px] font-extrabold text-white bg-emerald-700 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* Language Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200" role="group" aria-label={t.nav.language}>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currentLanguage === 'en'
                  ? 'bg-white text-emerald-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-pressed={currentLanguage === 'en'}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('es')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currentLanguage === 'es'
                  ? 'bg-white text-emerald-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              aria-pressed={currentLanguage === 'es'}
            >
              ES
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-sm font-bold">
            <button onClick={goHome} className="rounded-xl bg-emerald-700 px-3 py-3 text-white text-left">Explore resources</button>
            <button onClick={() => { setActiveView('copilot'); setIsMenuOpen(false); }} className="rounded-xl bg-slate-900 px-3 py-3 text-white text-left">AI Copilot</button>
            <button onClick={() => goToSection('categories-heading')} className="rounded-xl bg-slate-100 px-3 py-3 text-slate-900 text-left">Categories</button>
            <button onClick={() => { onOpenIntroductionForm(); setIsMenuOpen(false); }} className="rounded-xl bg-slate-100 px-3 py-3 text-slate-900 text-left">My introduction</button>
            <button onClick={() => { onToggleExtensionView(); setIsMenuOpen(false); }} className="rounded-xl bg-indigo-50 px-3 py-3 text-indigo-950 text-left">Browser companion</button>
            <button onClick={() => { onOpenSavedDrawer(); setIsMenuOpen(false); }} className="rounded-xl bg-slate-100 px-3 py-3 text-slate-900 text-left">Saved resources ({savedCount})</button>
          </div>
        </div>
      )}
    </header>
  );
};
