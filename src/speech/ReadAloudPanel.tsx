import React from 'react';
import { Pause, Play, RotateCcw, Square, Volume2, X } from 'lucide-react';
import type { Language } from '../types';
import { speechKindLabels, useSpeech } from './SpeechProvider';
import type { SpeechKind } from './SpeechProvider';

interface ReadAloudPanelProps {
  language: Language;
  onClose: () => void;
  panelRef: React.RefObject<HTMLElement>;
  /** Extra placement class, e.g. when the launcher sits inside the header. */
  className?: string;
}

const kindOrder: SpeechKind[] = ['heading', 'instructions', 'chat', 'resource', 'navigation'];

const CONTROLS = (language: Language) =>
  language === 'es'
    ? { play: 'Reproducir', pause: 'Pausar', resume: 'Reanudar', stop: 'Detener', restart: 'Reiniciar' }
    : { play: 'Play', pause: 'Pause', resume: 'Resume', stop: 'Stop', restart: 'Restart' };

/**
 * The compact read-aloud panel: choose a passage, then play, pause, resume,
 * stop or restart it. The spoken text is repeated here as a visible text
 * alternative for people who cannot or do not want audio.
 */
export const ReadAloudPanel: React.FC<ReadAloudPanelProps> = ({ language, onClose, panelRef, className = '' }) => {
  const { supported, status, current, items, problem, play, pause, resume, stop, restart, speakItem } = useSpeech();
  const copy = CONTROLS(language);
  const isSpanish = language === 'es';

  const grouped = kindOrder
    .map((kind) => ({ kind, entries: items.filter((item) => item.kind === kind) }))
    .filter((group) => group.entries.length > 0);

  const statusText = current
    ? problem
      ? problem
      : `${status === 'paused' ? (isSpanish ? 'En pausa' : 'Paused') : (isSpanish ? 'Leyendo' : 'Reading')}: ${current.label}`
    : isSpanish
      ? 'Nada seleccionado.'
      : 'Nothing selected yet.';

  return (
    <section
      id="read-aloud-panel"
      ref={panelRef}
      tabIndex={-1}
      role="region"
      aria-labelledby="read-aloud-panel-title"
      className={`qc-ral-panel ${className}`.trim()}
    >
      <div className="qc-ral-panel__head">
        <Volume2 className="qc-ral-panel__icon" aria-hidden="true" />
        <h2 id="read-aloud-panel-title" className="qc-ral-panel__title">
          {isSpanish ? 'Leer en voz alta' : 'Read aloud'}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="qc-ral-panel__close"
          aria-label={isSpanish ? 'Cerrar controles de lectura' : 'Close read aloud controls'}
          title={isSpanish ? 'Cerrar' : 'Close'}
        >
          <X aria-hidden="true" size={20} />
        </button>
      </div>

      {supported ? (
        <>
          <div>
            <label htmlFor="read-aloud-choice" className="qc-ral-panel__label">
              {isSpanish ? 'Elegir qué leer' : 'Choose what to read'}
            </label>
            <select
              id="read-aloud-choice"
              className="qc-ral-panel__select"
              value={current?.id ?? ''}
              onChange={(event) => {
                const selected = items.find((item) => item.id === event.target.value);
                if (selected) {
                  // Read the chosen passage from its beginning; the provider
                  // cancels the previous voice first.
                  speakItem(selected);
                } else {
                  stop();
                }
              }}
            >
              <option value="">{isSpanish ? 'Seleccione contenido…' : 'Select content…'}</option>
              {grouped.map((group) => (
                <optgroup key={group.kind} label={speechKindLabels[group.kind][language]}>
                  {group.entries.map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      {entry.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div
            role="group"
            aria-label={isSpanish ? 'Controles de lectura' : 'Read aloud controls'}
            className="qc-ral-panel__controls"
          >
            <button type="button" onClick={play} disabled={!current || status === 'playing'} className="qc-ral-panel__btn">
              <Play className="qc-read__icon" aria-hidden="true" />
              <span>{copy.play}</span>
            </button>
            <button type="button" onClick={pause} disabled={status !== 'playing'} className="qc-ral-panel__btn">
              <Pause className="qc-read__icon" aria-hidden="true" />
              <span>{copy.pause}</span>
            </button>
            <button type="button" onClick={resume} disabled={status !== 'paused'} className="qc-ral-panel__btn">
              <Volume2 className="qc-read__icon" aria-hidden="true" />
              <span>{copy.resume}</span>
            </button>
            <button type="button" onClick={stop} disabled={!current} className="qc-ral-panel__btn">
              <Square className="qc-read__icon" aria-hidden="true" />
              <span>{copy.stop}</span>
            </button>
            <button type="button" onClick={restart} disabled={!current} className="qc-ral-panel__btn">
              <RotateCcw className="qc-read__icon" aria-hidden="true" />
              <span>{copy.restart}</span>
            </button>
          </div>

          <p className="qc-ral-panel__status" role="status" aria-live="polite">
            {statusText}
          </p>

          {current && (
            <div className="qc-ral-panel__text">
              <span className="qc-ral-panel__text-label">
                {isSpanish ? 'Texto que se está leyendo' : 'Text being read aloud'}
              </span>
              <p className="qc-ral-panel__text-body">{current.text}</p>
            </div>
          )}
        </>
      ) : (
        <p className="qc-ral-panel__status">
          {isSpanish
            ? 'La lectura en voz alta no está disponible en este navegador. Todo el contenido permanece visible como texto.'
            : 'Read aloud is not available in this browser. All content stays visible as text.'}
        </p>
      )}
    </section>
  );
};
