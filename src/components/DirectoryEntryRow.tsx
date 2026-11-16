import React, { useState } from 'react';
import { ChevronDown, ExternalLink, MapPin, Phone } from 'lucide-react';
import { DirectoryEntry } from '../data/directory';
import { CategoryId, Language } from '../types';
import { directoryCategoryLabels } from './CategoryTabs';
import { ReadAloudButton } from '../speech/ReadAloudButton';

interface DirectoryEntryRowProps {
  entry: DirectoryEntry;
  currentLanguage: Language;
  isSaved: boolean;
  onToggleSave: (entryId: string) => void;
  onOpenOhloneAid: () => void;
}

const notConfirmed = (language: Language) => (language === 'en' ? 'Not confirmed' : 'No confirmado');

/** "Service area" from the listing itself; never guessed from the address. */
export const serviceAreaLabel = (entry: DirectoryEntry, language: Language): string => {
  if (entry.city === 'Statewide') {
    return language === 'en' ? 'California (statewide)' : 'California (todo el estado)';
  }
  if (entry.city === 'Multiple campuses') {
    return language === 'en' ? 'California community colleges' : 'Colegios comunitarios de California';
  }
  if (entry.city === 'Online') {
    return language === 'en' ? 'Online' : 'En línea';
  }
  return entry.city;
};

const Detail: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <dt className="qc-detail-label">{label}</dt>
    <dd className="qc-detail-value">{children}</dd>
  </div>
);

export const DirectoryEntryRow: React.FC<DirectoryEntryRowProps> = ({
  entry,
  currentLanguage,
  isSaved,
  onToggleSave,
  onOpenOhloneAid
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const t = (en: string, es: string) => (currentLanguage === 'en' ? en : es);
  const detailId = `directory-details-${entry.id}`;
  const websiteIsHomepage = (() => {
    try {
      return new URL(entry.website).pathname === '/';
    } catch {
      return false;
    }
  })();

  const categoriesLabel = (category: CategoryId) => directoryCategoryLabels[category][currentLanguage];

  const phone = entry.contact?.phone;
  const email = entry.contact?.email;

  const entrySpeech = [
    entry.name,
    entry.services ? entry.services[currentLanguage] : notConfirmed(currentLanguage),
    `${t('Categories', 'Categorías')}: ${entry.categories.map(categoriesLabel).join(', ')}`,
    `${t('Location', 'Ubicación')}: ${entry.address}, ${serviceAreaLabel(entry, currentLanguage)}`,
    entry.audience ? entry.audience[currentLanguage] : '',
    entry.languages && entry.languages.length > 0 ? entry.languages.map((item) => item[currentLanguage]).join(', ') : '',
    entry.hours ? entry.hours[currentLanguage] : '',
    t('Check the organization website for current details.', 'Consulte el sitio de la organización para datos actuales.')
  ].filter(Boolean).join('. ');

  return (
    <article
      id={`directory-entry-${entry.id}`}
      tabIndex={-1}
      className="qc-row"
      aria-labelledby={`directory-name-${entry.id}`}
    >
      <div>
        <h3 id={`directory-name-${entry.id}`} className="qc-nm">{entry.name}</h3>
        <p className="qc-org-badge">
          {t('Organization website — check details', 'Sitio de la organización — confirme los datos')}
        </p>
        <p className="qc-entry-services">
          {entry.services ? entry.services[currentLanguage] : notConfirmed(currentLanguage)}
        </p>
        <ul
          className="qc-cat-chips"
          aria-label={t('Connected categories', 'Categorías relacionadas')}
        >
          {entry.categories.map((category) => (
            <li key={category} className="qc-cat-chip">{categoriesLabel(category)}</li>
          ))}
        </ul>
        <div className="qc-mt">
          <span>{entry.address}</span>
          <span>{serviceAreaLabel(entry, currentLanguage)}</span>
        </div>
        <div className="mt-3">
          <ReadAloudButton
            id={`directory-${entry.id}`}
            kind="resource"
            language={currentLanguage}
            label={entry.name}
            text={entrySpeech}
            className="min-h-0"
          />
        </div>
      </div>

      <div className="qc-ac">
        {entry.id === 'dir-ohlone-college-24' && (
          <button type="button" onClick={onOpenOhloneAid} aria-haspopup="dialog" className="min-h-0">
            {t('Financial aid guide', 'Guía de ayuda financiera')}
          </button>
        )}
        <a href={entry.website} target="_blank" rel="noopener noreferrer">
          {t('Visit ', 'Visitar ')}
          {entry.name}
          {websiteIsHomepage
            ? t(' homepage', ' (inicio)')
            : t(' page', ' (información)')}
          {t(' (opens new tab)', ' (abre otra pestaña)')}
        </a>
        <button
          type="button"
          onClick={() => setShowDetails((open) => !open)}
          aria-expanded={showDetails}
          aria-controls={detailId}
          className="min-h-0"
        >
          <ChevronDown
            className={`qc-chevron ${showDetails ? 'open' : ''}`}
            aria-hidden="true"
          />
          {showDetails ? t('Hide details', 'Ocultar detalles') : t('Details', 'Detalles')}
        </button>
        <button
          type="button"
          onClick={() => onToggleSave(entry.id)}
          aria-pressed={isSaved}
          className="qc-primary min-h-0"
          aria-label={isSaved ? `${t('Saved', 'Guardado')}: ${entry.name}` : `${t('Save', 'Guardar')}: ${entry.name}`}
        >
          {isSaved ? t('Saved', 'Guardado') : t('Save', 'Guardar')}
        </button>
      </div>

      {showDetails && (
        <div id={detailId} className="qc-entry-details">
          <dl className="qc-entry-meta">
            <Detail label={t('What it provides', 'Qué ofrece')}>
              {entry.services ? entry.services[currentLanguage] : notConfirmed(currentLanguage)}
            </Detail>
            <Detail label={t('Categories', 'Categorías')}>
              {entry.categories.map(categoriesLabel).join(', ')}
            </Detail>
            <Detail label={t('Who can use it', 'Quién puede usarlo')}>
              {entry.audience ? entry.audience[currentLanguage] : notConfirmed(currentLanguage)}
            </Detail>
            <Detail label={t('Location', 'Ubicación')}>
              <span className="inline-flex items-start gap-1">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                {entry.address}
              </span>
            </Detail>
            <Detail label={t('Service area', 'Zona de servicio')}>
              {entry.serviceArea ? entry.serviceArea[currentLanguage] : serviceAreaLabel(entry, currentLanguage)}
            </Detail>
            <Detail label={t('Languages', 'Idiomas')}>
              {entry.languages && entry.languages.length > 0
                ? entry.languages.map((language) => language[currentLanguage]).join(', ')
                : notConfirmed(currentLanguage)}
            </Detail>
            <Detail label={t('Accessibility', 'Accesibilidad')}>
              {entry.accessibility ? entry.accessibility[currentLanguage] : notConfirmed(currentLanguage)}
            </Detail>
            <Detail label={t('Contact', 'Contacto')}>
              {phone || email ? (
                <span className="flex flex-col gap-1">
                  {phone && (
                    <a className="qc-detail-link" href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {phone}
                    </a>
                  )}
                  {email && (
                    <a className="qc-detail-link" href={`mailto:${email}`}>{email}</a>
                  )}
                </span>
              ) : (
                notConfirmed(currentLanguage)
              )}
            </Detail>
            <Detail label={t('Cost', 'Costo')}>
              {entry.cost ? entry.cost[currentLanguage] : notConfirmed(currentLanguage)}
            </Detail>
            <Detail label={t('Hours or appointments', 'Horarios o citas')}>
              {entry.hours ? entry.hours[currentLanguage] : notConfirmed(currentLanguage)}
            </Detail>
            <Detail label={t('Official source', 'Fuente oficial')}>
              <a className="qc-detail-link" href={entry.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {t('Open organization website (new tab)', 'Abrir el sitio de la organización (otra pestaña)')}
              </a>
            </Detail>
          </dl>
          <p className="qc-detail-note">
            {t(
              '“Not confirmed” means this listing does not publish that detail. Call the organization before you visit.',
              '“No confirmado” significa que este registro no publica ese dato. Llame a la organización antes de visitarla.'
            )}
          </p>
        </div>
      )}
    </article>
  );
};
