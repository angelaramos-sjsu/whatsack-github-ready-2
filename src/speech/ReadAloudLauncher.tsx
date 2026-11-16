import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
import type { Language } from '../types';
import { useSpeech } from './SpeechProvider';
import { ReadAloudPanel } from './ReadAloudPanel';

interface ReadAloudLauncherProps {
  language: Language;
  /** Changing this (for example a page change) closes the panel and stops speech. */
  resetKey?: string;
}

/**
 * One always-visible "Read aloud" button that opens the compact read-aloud
 * panel, so the top of the page stays free of controls and instructions.
 */
export const ReadAloudLauncher: React.FC<ReadAloudLauncherProps> = ({ language, resetKey }) => {
  const { stop } = useSpeech();
  const [isOpen, setIsOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const close = useCallback(
    (returnFocus = true) => {
      setIsOpen(false);
      // Closing the panel ends the reading so no voice keeps talking.
      stop();
      if (returnFocus) launcherRef.current?.focus();
    },
    [stop]
  );

  const toggle = () => {
    if (isOpen) {
      close();
      return;
    }
    setIsOpen(true);
  };

  // Move focus into the panel, and let Escape close it and return focus.
  useEffect(() => {
    if (!isOpen) return;
    panelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) {
        event.preventDefault();
        close();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, close]);

  // A new page or language closes the panel without stealing focus.
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    setIsOpen(false);
    stop();
  }, [language, resetKey, stop]);

  const label = language === 'es' ? 'Leer en voz alta' : 'Read aloud';

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="qc-ral"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="read-aloud-panel"
        title={label}
      >
        <Volume2 className="qc-ral__icon" aria-hidden="true" />
        <span className="qc-ral__label">{label}</span>
      </button>

      {isOpen && <ReadAloudPanel language={language} panelRef={panelRef} onClose={() => close()} />}
    </>
  );
};
