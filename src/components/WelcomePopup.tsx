import React, { useEffect, useRef } from 'react';
import { Language } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface WelcomePopupProps {
  currentLanguage: Language;
  onClose: () => void;
}

/**
 * First-visit welcome popup. Dismissed with its single call-to-action button
 * (or the Escape key / a click on the backdrop).
 */
export const WelcomePopup: React.FC<WelcomePopupProps> = ({ currentLanguage, onClose }) => {
  const en = currentLanguage === 'en';
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Focus the action button on open and allow Escape to dismiss
  useEffect(() => {
    buttonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-title"
      aria-describedby="welcome-popup-message"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-300 relative overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent Top Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-500" />

        <div className="w-14 h-14 mx-auto mt-2 mb-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-center justify-center">
          <Sparkles className="w-7 h-7" aria-hidden="true" />
        </div>

        <h2 id="welcome-popup-title" className="text-2xl font-extrabold tracking-tight text-slate-900">
          {en ? 'Welcome to WhatSack' : 'Bienvenido a WhatSack'}
        </h2>
        <p id="welcome-popup-message" className="mt-2 text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
          {en
            ? 'What can we help you with today?'
            : '¿Con qué podemos ayudarte hoy?'}
        </p>

        <button
          ref={buttonRef}
          type="button"
          onClick={onClose}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          <span>{en ? 'Get started' : 'Comenzar'}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
