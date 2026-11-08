import React, { useMemo, useState } from 'react';
import { Bookmark, Layers, SearchX } from 'lucide-react';
import { CategoryId, Language, SourceTypeId } from '../types';
import { translations } from '../data/translations';
import { DirectoryEntry, directoryEntries } from '../data/directory';
import { categoryDescription, categoryLabel, directoryCategories } from '../data/categories';
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
  isLoading?: boolean;
  savedCount?: number;
  onOpenSaved?: () => void;
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
  onToggleEntrySave,
  isLoading = false,
  savedCount = 0,
  onOpenSaved
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

  const isFiltered =
    selectedCategory !== 'all' ||
    selectedSourceType !== 'all' ||
    selectedCity !== 'all' ||
    freeOnly ||
    noIdRequiredOnly ||
    searchQuery.trim() !== '';

  const eyebrow = selectedCategory === 'all' ? (en ? 'All Silicon Valley' : 'Todo Silicon Valley') : categoryLabel(selectedCategory, currentLanguage);

  const resetDirectoryFilters = () => {
    setSelectedSourceType('all');
    onResetFilters();
  };

  const otherCategories = directoryCategories
    .filter((category) => category.id !== selectedCategory && (categoryCounts.get(category.id) || 0) > 0)
    .slice(0, 3);

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

      {/* Selected category context */}
      {selectedCategory !== 'all' && (
        <div className="qc-cathead">
          <div>
            <h3>{categoryLabel(selectedCategory, currentLanguage)}</h3>
            <p>{categoryDescription(selectedCategory, currentLanguage)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="qc-cathead-count">
              {categoryCounts.get(selectedCategory) || 0} {en ? 'listings' : 'registros'}
            </span>
            <button type="button" className="qc-btn-ghost" onClick={() => onSelectCategory('all')}>
              <Layers className="h-4 w-4" aria-hidden="true" />
              {en ? 'All categories' : 'Todas las categorías'}
            </button>
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="qc-tabs" role="tablist" aria-label={en ? 'Filter by resource category' : 'Filtrar por categoría'}>
        <button
          type="button"
          role="tab"
          aria-selected={selectedCategory === 'all'}
          onClick={() => onSelectCategory('all')}
          className={`qc-t min-h-0 ${selectedCategory === 'all' ? 'on' : ''}`}
        >
          {en ? 'All' : 'Todas'} ({directoryEntries.length})
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
      </div>

      {/* Result summary & compare */}
      <div className="qc-countline">
        <span aria-live="polite">
          {isLoading ? (
            en ? 'Searching listings…' : 'Buscando registros…'
          ) : (
            <>
              {en ? 'Showing' : 'Mostrando'} <b>{matches.length}</b>{' '}
              {en ? `of ${directoryEntries.length} listings` : `de ${directoryEntries.length} registros`}
              {searchQuery.trim() && (
                <> {en ? `for “${searchQuery.trim()}”` : `para “${searchQuery.trim()}”`}</>
              )}
            </>
          )}
        </span>
        {onOpenSaved && (
          <button
            type="button"
            onClick={onOpenSaved}
            className="qc-btn-ghost ml-auto"
            disabled={savedCount === 0}
            aria-label={en ? `Compare ${savedCount} saved resources` : `Comparar ${savedCount} recursos guardados`}
            style={savedCount === 0 ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
          >
            <Bookmark className="h-4 w-4" aria-hidden="true" />
            {en ? `Compare saved (${savedCount})` : `Comparar guardados (${savedCount})`}
          </button>
        )}
      </div>

      {/* Listings */}
      {isLoading ? (
        <div aria-busy="true" aria-label={en ? 'Loading listings' : 'Cargando registros'}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="qc-skel-row">
              <div className="space-y-3">
                <span className="qc-skel w60" />
                <span className="qc-skel w40" />
                <span className="qc-skel w80" />
              </div>
              <div className="flex gap-3">
                <span className="qc-skel w40" />
              </div>
            </div>
          ))}
          <p className="sr-only" role="status">
            {en ? 'Loading community listings' : 'Cargando registros comunitarios'}
          </p>
        </div>
      ) : matches.length === 0 ? (
        <div className="qc-empty">
          <SearchX aria-hidden="true" />
          <h3>{en ? 'No listings match these filters' : 'Ningún registro coincide'}</h3>
          <p>
            {searchQuery.trim()
              ? en
                ? `Nothing matched “${searchQuery.trim()}”. Try a broader word or clear the filters.`
                : `Nada coincidió con “${searchQuery.trim()}”. Pruebe una palabra más general o borre los filtros.`
              : en
                ? 'Try removing a filter, or explore a different category below.'
                : 'Intente quitar un filtro o explore otra categoría.'}
          </p>
          <div className="qc-empty-actions">
            <button type="button" className="qc-btn-sm" onClick={resetDirectoryFilters}>
              {t.filters.reset}
            </button>
            {otherCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="qc-btn-secondary"
                onClick={() => onSelectCategory(category.id)}
              >
                {category.name[currentLanguage]} ({categoryCounts.get(category.id) || 0})
              </button>
            ))}
          </div>
        </div>
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
