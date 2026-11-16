import React from 'react';
import { Pause, Play, RotateCcw, Square, Volume2 } from 'lucide-react';
import type { Language } from '../types';
import { speechKindLabels, useSpeech } from './SpeechProvider';
import type { SpeechKind } from './SpeechProvider';

interface SpeechBarProps {
  language: Language;
}

const kindOrder: SpeechKind[] = ['heading', 'instructions', 'chat', 'resource', 'navigation'];

const CONTROLS = (language: Language) =>
  language === 'es'
    ? { play: 'Reproducir', pause: 'Pausar', resume: 'Reanudar', stop: 'Detener', restart: 'Reiniciar' }
    : { play: 'Play', pause: 'Pause', resume: 'Resume', stop: 'Stop', restart: 'Restart' };

/**
 * Page-level read-aloud controls, directly under the site navigation:
 * choose a passage, then play, pause, resume, stop or restart it. The spoken
 * text is also shown here as a visible text alternative.
 */
export const SpeechBar: React.FC<SpeechBarProps> = ({ language }) => {
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
      ? 'Nada seleccionado. Elija un contenido o use “Leer en voz alta” junto a cualquier sección.'
      : 'Nothing selected yet. Choose content or use “Read aloud” next to any section.';

  return (
    <section className="qc-read-bar" aria-labelledby="read-aloud-heading">
      <div className="qc-shell qc-read-bar__inner">
        <div className="qc-read-bar__lead">
          <Volume2 className="qc-read-bar__icon" aria-hidden="true" />
          <h2 id="read-aloud-heading" className="qc-read-bar__title">
            {isSpanish ? 'Leer en voz alta' : 'Read aloud'}
          </h2>

          {supported ? (
            <>
              <label htmlFor="read-aloud-choice" className="qc-read-bar__label">
                {isSpanish ? 'Elegir qué leer' : 'Choose what to read'}
              </label>
              <select
                id="read-aloud-choice"
                className="qc-read-bar__select"
                value={current?.id ?? ''}
                onChange={(event) => {
                  const selected = items.find((item) => item.id === event.target.value);
                  if (selected) {
                    // Read the chosen passage from its beginning.
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
            </>
          ) : (
            <p className="qc-read-bar__status">
              {isSpanish
                ? 'La lectura en voz alta no está disponible en este navegador. Todo el contenido permanece visible como texto.'
                : 'Read aloud is not available in this browser. All content stays visible as text.'}
            </p>
          )}
        </div>

        {supported && (
          <div role="group" aria-label={isSpanish ? 'Controles de lectura' : 'Read aloud controls'} className="qc-read-bar__controls">
            <button type="button" onClick={play} disabled={!current || status === 'playing'} className="qc-read-btn">
              <Play className="qc-read__icon" aria-hidden="true" />
              <span>{copy.play}</span>
            </button>
            <button type="button" onClick={pause} disabled={status !== 'playing'} className="qc-read-btn">
              <Pause className="qc-read__icon" aria-hidden="true" />
              <span>{copy.pause}</span>
            </button>
            <button type="button" onClick={resume} disabled={status !== 'paused'} className="qc-read-btn">
              <Volume2 className="qc-read__icon" aria-hidden="true" />
              <span>{copy.resume}</span>
            </button>
            <button type="button" onClick={restart} disabled={!current} className="qc-read-btn">
              <RotateCcw className="qc-read__icon" aria-hidden="true" />
              <span>{copy.restart}</span>
            </button>
            <button type="button" onClick={stop} disabled={!current} className="qc-read-btn">
              <Square className="qc-read__icon" aria-hidden="true" />
              <span>{copy.stop}</span>
            </button>
          </div>
        )}

        {supported && (
          <p className="qc-read-bar__status" role="status" aria-live="polite">
            {statusText}
          </p>
        )}

        {supported && current && (
          <div className="qc-read-bar__text" aria-label={isSpanish ? 'Texto que se está leyendo' : 'Text being read aloud'}>
            {current.text}
          </div>
        )}
      </div>
    </section>
  );
};
