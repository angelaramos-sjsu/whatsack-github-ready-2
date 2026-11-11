import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import type { Language } from '../types';

/**
 * Sprout is WhatSack's own small, approachable helper character.
 * It is intentionally a seedling, not a copy of the Clippy paperclip.
 * SVG stays crisp at large text / high zoom and needs no external assets.
 */
export const SproutMascot: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 108"
    className={className}
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    {/* The two leaves make an expressive little "hairdo". */}
    <path d="M50 38C30 38 18 26 22 9C39 9 52 21 50 38Z" fill="#7DD3A2" stroke="#047857" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M50 38C50 19 63 7 82 10C82 29 69 39 50 38Z" fill="#34B97B" stroke="#047857" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M50 44V31" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
    {/* Rounded character body, rather than a paperclip silhouette. */}
    <path
      d="M20 67C20 47 33 37 50 37C67 37 80 47 80 67C80 87 67 99 50 99C33 99 20 87 20 67Z"
      fill="#EAFBF0"
      stroke="#047857"
      strokeWidth="3.5"
    />
    {/* Little arms, cheeks, and face. */}
    <path d="M20 66L11 61M80 66L89 61" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
    <circle cx="35" cy="73" r="5.5" fill="#F8C4C4" opacity=".85" />
    <circle cx="65" cy="73" r="5.5" fill="#F8C4C4" opacity=".85" />
    <ellipse cx="39" cy="63" rx="3.1" ry="4" fill="#1A1A24" />
    <ellipse cx="61" cy="63" rx="3.1" ry="4" fill="#1A1A24" />
    <path d="M44 75C47 79 53 79 56 75" stroke="#1A1A24" strokeWidth="3" strokeLinecap="round" />
    <path d="M39 99L34 104M61 99L66 104" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

interface SproutAssistantProps {
  currentLanguage: Language;
  onOpenChat: () => void;
  showGreeting: boolean;
  onDismissGreeting: () => void;
}

/** A nonintrusive, user-invoked launcher for the existing scripted chat. */
export const SproutAssistant: React.FC<SproutAssistantProps> = ({ currentLanguage, onOpenChat, showGreeting, onDismissGreeting }) => {
  const isEnglish = currentLanguage === 'en';

  return (
    <aside className="sprout-helper" aria-label={isEnglish ? 'Ask Sackie' : 'Preguntar a Sackie'}>
      {showGreeting && (
        <div className="sprout-helper-bubble">
          <button
            type="button"
            onClick={onDismissGreeting}
            className="sprout-helper-dismiss"
            aria-label={isEnglish ? 'Hide assistant introduction' : 'Ocultar introducción de ayuda'}
          >
            <X aria-hidden="true" size={16} />
          </button>
          <p className="sprout-helper-greeting">
            {isEnglish ? "Hi! I'm Sackie." : '¡Hola! Soy Sackie.'}
          </p>
          <p className="sprout-helper-description">
            {isEnglish
              ? 'Need help finding local support? Ask me.'
              : '¿Busca ayuda en su comunidad? Pregúnteme.'}
          </p>
        </div>
      )}
      <button
        type="button"
        onClick={onOpenChat}
        className="sprout-helper-button"
        aria-label={isEnglish ? 'Ask Sackie' : 'Preguntar a Sackie'}
        title={isEnglish ? 'Ask Sackie' : 'Preguntar a Sackie'}
      >
        <SproutMascot className="sprout-helper-character" />
        <span className="sprout-helper-chat-icon" aria-hidden="true"><MessageCircle size={18} /></span>
      </button>
      <span className="sprout-helper-label" aria-hidden="true">{isEnglish ? 'Ask Sackie' : 'Preguntar a Sackie'}</span>
    </aside>
  );
};
