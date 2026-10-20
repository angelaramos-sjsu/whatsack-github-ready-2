import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { ShieldCheck, Heart, Sparkles, AlertCircle } from 'lucide-react';

interface FooterProps {
  currentLanguage: Language;
  onOpenDisclaimer: () => void;
  onNavigateCategory: (cat: any) => void;
  onOpenExtension: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLanguage,
  onOpenDisclaimer,
  onNavigateCategory,
  onOpenExtension
}) => {
  const t = translations[currentLanguage];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white text-base">
              🌱
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">
              {t.app.name}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
              Silicon Valley 2026
            </span>
          </div>

          <p className="text-slate-400 max-w-md leading-relaxed text-xs">
            {t.app.slogan}
          </p>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] text-amber-300/90 flex items-start gap-2 max-w-lg">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <p>
              <strong>{currentLanguage === 'en' ? 'Research Prototype Disclaimer: ' : 'Aviso de Prototipo de Investigación: '}</strong>
              {t.disclaimer.body}
            </p>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            {currentLanguage === 'en' ? 'Core Categories' : 'Categorías'}
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={() => onNavigateCategory('food')} className="hover:text-emerald-400 transition-colors">
                {t.categories.food}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateCategory('mental-health')} className="hover:text-emerald-400 transition-colors">
                {t.categories.mentalHealth}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateCategory('workforce')} className="hover:text-emerald-400 transition-colors">
                {t.categories.workforce}
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateCategory('community')} className="hover:text-emerald-400 transition-colors">
                {t.categories.community}
              </button>
            </li>
          </ul>
        </div>

        {/* Innovations & Prototype Links */}
        <div>
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
            {currentLanguage === 'en' ? 'Interactive Tools' : 'Herramientas Interactivas'}
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={onOpenExtension} className="hover:text-emerald-400 transition-colors">
                {t.nav.extension}
              </button>
            </li>
            <li>
              <button onClick={onOpenDisclaimer} className="hover:text-emerald-400 transition-colors">
                {currentLanguage === 'en' ? 'Academic Ethics & Disclaimers' : 'Ética y Avisos Académicos'}
              </button>
            </li>
            <li>
              <span className="text-slate-500">
                {currentLanguage === 'en' ? 'WCAG 2.1 AA Accessible' : 'Accesibilidad WCAG 2.1 AA'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
        <p>
          © 2026 WhatSack Prototype Project. {currentLanguage === 'en' ? 'For Academic Research Purposes Only.' : 'Para Fines de Investigación Académica Únicamente.'}
        </p>
        <p className="flex items-center gap-1">
          <span>{currentLanguage === 'en' ? 'Built with human-centered AI for Silicon Valley communities' : 'Diseñado con IA centrada en el ser humano para comunidades de Silicon Valley'}</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
        </p>
      </div>
    </footer>
  );
};
