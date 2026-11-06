import React, { useState } from 'react';
import { CategoryId, Language } from '../types';
import { translations } from '../data/translations';
import { directoryEntries } from '../data/directory';
import { OhloneFinancialAidDialog } from './OhloneFinancialAidDialog';

interface CommunityDirectoryProps {
  currentLanguage: Language;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (category: CategoryId | 'all') => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  availableCities: string[];
  searchQuery: string;
  freeOnly: boolean;
  onToggleFreeOnly: () => void;
  noIdRequiredOnly: boolean;
  onToggleNoIdRequired: () => void;
  onResetFilters: () => void;
  demonstrationCount: number;
  isEntrySaved: (entryId: string) => boolean;
  onToggleEntrySave: (entryId: string) => void;
}

const categoryLabels: Record<CategoryId, { en: string; es: string }> = {
  food: { en: 'Food', es: 'Alimentos' },
  'mental-health': { en: 'Mental Health', es: 'Salud Mental' },
  workforce: { en: 'Education & Workforce', es: 'Educación y Trabajo' },
  community: { en: 'Community Support', es: 'Apoyo Comunitario' }
};

const displayAddress = (address: string, language: Language) => {
  if (/^\d/.test(address)) return address;
  if (address === 'California community colleges' || address === 'Participating community colleges') {
    return language === 'en' ? 'Participating California community colleges' : 'Colegios comunitarios participantes de California';
  }
  return address;
};

export const CommunityDirectory: React.FC<CommunityDirectoryProps> = ({
  currentLanguage,
  selectedCategory,
  onSelectCategory,
  selectedCity,
  onSelectCity,
  availableCities,
  searchQuery,
  freeOnly,
  onToggleFreeOnly,
  noIdRequiredOnly,
  onToggleNoIdRequired,
  onResetFilters,
  demonstrationCount,
  isEntrySaved,
  onToggleEntrySave
}) => {
  const t = translations[currentLanguage];
  const [isOhloneAidOpen, setIsOhloneAidOpen] = useState(false);
  const words = searchQuery.toLowerCase().trim().split(/\s+/).filter((w) => w.length > 2);

  const matches = directoryEntries.filter((entry) => {
    if (selectedCategory !== 'all' && entry.categoryId !== selectedCategory) return false;
    if (selectedCity !== 'all' && entry.city !== selectedCity) return false;
    if (words.length) {
      const haystack = [
        entry.name,
        entry.address,
        entry.city,
        categoryLabels[entry.categoryId].en,
        categoryLabels[entry.categoryId].es
      ].join(' ').toLowerCase();
      return words.some((word) => haystack.includes(word));
    }
    return true;
  });

  const eyebrow =
    selectedCategory === 'all'
      ? t.filters.allCities
      : categoryLabels[selectedCategory][currentLanguage];

  return (
    <section id="directory" aria-labelledby="directory-heading" className="qc-sec qc-shell scroll-mt-28">
      <div className="qc-eyebrow">{eyebrow}</div>
      <h2 id="directory-heading" className="qc-h2">
        {currentLanguage === 'en' ? 'Community Resource Directory' : 'Directorio de Recursos Comunitarios'}
      </h2>

      {/* Filters */}
      <div className="qc-fs">
        <span>{t.filters.filterBy}:</span>

        <button
          type="button"
          onClick={() => {
            onSelectCategory('all');
            onSelectCity('all');
          }}
          aria-pressed={selectedCategory === 'all' && selectedCity === 'all'}
          className={`qc-t min-h-0 ${selectedCategory === 'all' && selectedCity === 'all' ? 'on' : ''}`}
        >
          {t.filters.allCities}
        </button>

        <label>
          <input type="checkbox" checked={freeOnly} onChange={onToggleFreeOnly} />
          <span>{t.filters.freeOnly}</span>
        </label>

        <label>
          <input type="checkbox" checked={noIdRequiredOnly} onChange={onToggleNoIdRequired} />
          <span>{t.filters.noId}</span>
        </label>

        <button type="button" onClick={onResetFilters} className="qc-t min-h-0">
          {t.filters.reset}
        </button>

        <span className="qc-cnt" aria-live="polite">
          {matches.length} {currentLanguage === 'en' ? 'listings' : 'registros'} · {demonstrationCount}{' '}
          {t.filters.resultsCount}
        </span>
      </div>

      {/* City selector (kept from the existing filter set) */}
      <div className="mt-4 text-[14px] text-[#5a5870]">
        <label htmlFor="city-filter-dropdown" className="mr-2">
          {t.filters.city}:
        </label>
        <select
          id="city-filter-dropdown"
          value={selectedCity}
          onChange={(e) => onSelectCity(e.target.value)}
          className="qc-select"
        >
          <option value="all">{t.filters.allCities}</option>
          {availableCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Listings */}
      {matches.length === 0 ? (
        <p className="py-10 text-[15px] text-[#5a5870]">
          {currentLanguage === 'en'
            ? 'No directory listings match these filters yet.'
            : 'Ningún registro del directorio coincide con estos filtros.'}
        </p>
      ) : (
        <div>
          {matches.map((entry) => {
            const saved = isEntrySaved(entry.id);
            return (
              <div key={entry.id} className="qc-row">
                <div>
                  <div className="qc-nm">{entry.name}</div>
                  <div className="qc-mt">
                    <span>{displayAddress(entry.address, currentLanguage)}</span>
                    <span>{categoryLabels[entry.categoryId][currentLanguage]}</span>
                  </div>
                </div>
                <div className="qc-ac">
                  {entry.id === 'dir-ohlone-college-24' && (
                    <button
                      type="button"
                      onClick={() => setIsOhloneAidOpen(true)}
                      aria-haspopup="dialog"
                      className="min-h-0"
                    >
                      {currentLanguage === 'en' ? 'Financial aid guide' : 'Guía de ayuda financiera'}
                    </button>
                  )}
                  <a href={entry.website} target="_blank" rel="noopener noreferrer">
                    {currentLanguage === 'en' ? 'Visit website' : 'Visitar sitio web'}
                  </a>
                  <button
                    type="button"
                    onClick={() => onToggleEntrySave(entry.id)}
                    aria-pressed={saved}
                    className="qc-primary min-h-0"
                    aria-label={saved
                      ? `${currentLanguage === 'en' ? 'Saved' : 'Guardado'}: ${entry.name}`
                      : `${currentLanguage === 'en' ? 'Save' : 'Guardar'}: ${entry.name}`}
                  >
                    {saved
                      ? (currentLanguage === 'en' ? 'Saved' : 'Guardado')
                      : t.resourceCard.save}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isOhloneAidOpen && (
        <OhloneFinancialAidDialog currentLanguage={currentLanguage} onClose={() => setIsOhloneAidOpen(false)} />
      )}
    </section>
  );
};
