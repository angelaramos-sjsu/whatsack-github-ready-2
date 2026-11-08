import React, { useMemo, useState } from 'react';
import { CategoryId, Language, SourceTypeId } from '../types';
import { translations } from '../data/translations';
import { DirectoryEntry, directoryEntries } from '../data/directory';
import { categoryLabel, directoryCategories } from '../data/categories';
import { sourceTypeLabel, sourceTypes } from '../data/sourceTypes';
import { OhloneFinancialAidDialog } from './OhloneFinancialAidDialog';
import { DirectoryEntryDialog } from './DirectoryEntryDialog';

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
  isEntrySaved: (entryId: string) => boolean;
  onToggleEntrySave: (entryId: string) => void;
}

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
  isEntrySaved,
  onToggleEntrySave
}) => {
  const t = translations[currentLanguage];
  const en = currentLanguage === 'en';
  const [isOhloneAidOpen, setIsOhloneAidOpen] = useState(false);
  const [selectedSourceType, setSelectedSourceType] = useState<SourceTypeId | 'all'>('all');
  const [detailEntry, setDetailEntry] = useState<DirectoryEntry | null>(null);
  const words = searchQuery.toLowerCase().trim().split(/\s+/).filter((w) => w.length > 2);

  const categoryCounts = useMemo(() => {
    const counts = new Map<CategoryId, number>();
    directoryEntries.forEach((entry) => {
      counts.set(entry.categoryId, (counts.get(entry.categoryId) || 0) + 1);
    });
    return counts;
  }, []);

  // Only offer source types that actually appear in the directory.
  const availableSourceTypes = useMemo(
    () => sourceTypes.filter((type) => directoryEntries.some((entry) => entry.sourceType === type.id)),
    []
  );

  const matches = directoryEntries.filter((entry) => {
    if (selectedCategory !== 'all' && entry.categoryId !== selectedCategory) return false;
    if (selectedSourceType !== 'all' && entry.sourceType !== selectedSourceType) return false;
    if (selectedCity !== 'all' && entry.city !== selectedCity) return false;
    if (words.length) {
      const haystack = [
        entry.name,
        entry.address || '',
        entry.city,
        entry.description || '',
        categoryLabel(entry.categoryId, 'en'),
        categoryLabel(entry.categoryId, 'es'),
        sourceTypeLabel(entry.sourceType, 'en'),
        sourceTypeLabel(entry.sourceType, 'es')
      ].join(' ').toLowerCase();
      return words.some((word) => haystack.includes(word));
    }
    return true;
  });

  const eyebrow = selectedCategory === 'all' ? t.filters.allCities : categoryLabel(selectedCategory, currentLanguage);

  const resetDirectoryFilters = () => {
    setSelectedSourceType('all');
    onResetFilters();
  };

  return (
    <section id="directory" aria-labelledby="directory-heading" className="qc-sec qc-shell scroll-mt-28">
      <div className="qc-eyebrow">{eyebrow}</div>
      <h2 id="directory-heading" className="qc-h2">
        {en ? 'Community Resource Directory' : 'Directorio de Recursos Comunitarios'}
      </h2>
      <p className="qc-dsub">
        {en
          ? 'Direct links to local organizations and public agencies. Visit each website for current programs and eligibility.'
          : 'Enlaces directos a organizaciones locales y agencias públicas. Consulte cada sitio para programas y requisitos vigentes.'}
      </p>

      {/* Category tabs */}
      <div className="qc-tabs" role="tablist" aria-label={en ? 'Filter by resource category' : 'Filtrar por categoría'}>
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === 'all'}
          onClick={() => onSelectCategory('all')}
          className={`qc-t min-h-0 ${selectedCategory === 'all' ? 'on' : ''}`}
        >
          {en ? 'All' : 'Todas'}
        </button>
        {directoryCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={selectedCategory === category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`qc-t min-h-0 ${selectedCategory === category.id ? 'on' : ''}`}
          >
            {category.name[currentLanguage]} ({categoryCounts.get(category.id) || 0})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="qc-fs">
        <span>{t.filters.filterBy}:</span>

        <label htmlFor="city-filter-dropdown" className="!cursor-pointer">
          <span>{t.filters.city}:</span>
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
        </label>

        <label htmlFor="source-type-filter" className="!cursor-pointer">
          <span>{en ? 'Source Type' : 'Tipo de fuente'}:</span>
          <select
            id="source-type-filter"
            value={selectedSourceType}
            onChange={(e) => setSelectedSourceType(e.target.value as SourceTypeId | 'all')}
            className="qc-select"
          >
            <option value="all">{en ? 'All source types' : 'Todos los tipos'}</option>
            {availableSourceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name[currentLanguage]}
              </option>
            ))}
          </select>
        </label>

        <label>
          <input type="checkbox" checked={freeOnly} onChange={onToggleFreeOnly} />
          <span>{t.filters.freeOnly}</span>
        </label>

        <label>
          <input type="checkbox" checked={noIdRequiredOnly} onChange={onToggleNoIdRequired} />
          <span>{t.filters.noId}</span>
        </label>

        <button type="button" onClick={resetDirectoryFilters} className="qc-t min-h-0">
          {t.filters.reset}
        </button>

        <span className="qc-cnt" aria-live="polite">
          {matches.length} {en ? 'listings' : 'registros'}
        </span>
      </div>

      {/* Listings */}
      {matches.length === 0 ? (
        <p className="py-10 text-[15px] text-[#5a5870]">
          {en
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
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="qc-chip">{sourceTypeLabel(entry.sourceType, currentLanguage)}</span>
                    <span className="qc-chip">{categoryLabel(entry.categoryId, currentLanguage)}</span>
                  </div>
                  <div className="qc-mt">
                    <span>{entry.city}</span>
                    {entry.address && <span>{displayAddress(entry.address, currentLanguage)}</span>}
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
                      {en ? 'Financial aid guide' : 'Guía de ayuda financiera'}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setDetailEntry(entry)}
                    aria-haspopup="dialog"
                    className="min-h-0"
                  >
                    {en ? 'Details' : 'Detalles'}
                  </button>
                  <a href={entry.website} target="_blank" rel="noopener noreferrer">
                    {en ? 'Visit website' : 'Visitar sitio web'}
                  </a>
                  <button
                    type="button"
                    onClick={() => onToggleEntrySave(entry.id)}
                    aria-pressed={saved}
                    className="qc-primary min-h-0"
                    aria-label={saved ? `${en ? 'Saved' : 'Guardado'}: ${entry.name}` : `${en ? 'Save' : 'Guardar'}: ${entry.name}`}
                  >
                    {saved ? (en ? 'Saved' : 'Guardado') : t.resourceCard.save}
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

      {detailEntry && (
        <DirectoryEntryDialog
          entry={detailEntry}
          currentLanguage={currentLanguage}
          isSaved={isEntrySaved(detailEntry.id)}
          onToggleSave={onToggleEntrySave}
          onClose={() => setDetailEntry(null)}
        />
      )}
    </section>
  );
};
