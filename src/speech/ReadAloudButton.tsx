import React, { useEffect, useMemo } from 'react';
import { Pause, Play, Volume2 } from 'lucide-react';
import type { Language } from '../types';
import { useSpeech } from './SpeechProvider';
import type { SpeechKind } from './SpeechProvider';

interface ReadAloudButtonProps {
  /** Stable id for this passage, unique on the page. */
  id: string;
  /** Short name shown in the read-aloud picker and status line. */
  label: string;
  /** The exact words that will be spoken. */
  text: string;
  kind?: SpeechKind;
  language?: Language;
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * A labelled Read aloud control placed next to the content it speaks.
 * Registering the passage also adds it to the page's read-aloud picker.
 */
export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({
  id,
  label,
  text,
  kind = 'instructions',
  language = 'en',
  tone = 'light',
  className = ''
}) => {
  const { supported, status, current, registerItem, unregisterItem, toggleItem } = useSpeech();
  const item = useMemo(() => ({ id, label, text, kind }), [id, label, text, kind]);

  useEffect(() => {
    registerItem(item);
    return () => unregisterItem(item.id);
  }, [item, registerItem, unregisterItem]);

  const isCurrent = current?.id === id;
  const isPlaying = isCurrent && status === 'playing';

  const copy = language === 'es'
    ? {
        read: 'Leer en voz alta',
        pause: 'Pausar',
        resume: 'Reanudar',
        unavailable: 'La lectura en voz alta no está disponible en este navegador'
      }
    : {
        read: 'Read aloud',
        pause: 'Pause',
        resume: 'Resume',
        unavailable: 'Read aloud is not available in this browser'
      };

  const actionLabel = isPlaying ? copy.pause : isCurrent && status === 'paused' ? copy.resume : copy.read;

  return (
    <button
      type="button"
      className={`qc-read ${tone === 'dark' ? 'qc-read--dark' : ''} ${className}`.trim()}
      onClick={() => toggleItem(item)}
      disabled={!supported}
      aria-pressed={isPlaying}
      aria-label={`${actionLabel}: ${label}`}
      title={supported ? `${actionLabel}: ${label}` : copy.unavailable}
    >
      {isPlaying ? (
        <Pause className="qc-read__icon" aria-hidden="true" />
      ) : isCurrent && status === 'paused' ? (
        <Play className="qc-read__icon" aria-hidden="true" />
      ) : (
        <Volume2 className="qc-read__icon" aria-hidden="true" />
      )}
      <span className="qc-read__label">{actionLabel}</span>
    </button>
  );
};
