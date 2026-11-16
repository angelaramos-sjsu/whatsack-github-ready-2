import React, { useEffect, useRef, useState } from 'react';
import { CategoryId, Language } from '../types';
import { translations } from '../data/translations';
import { directoryEntries } from '../data/directory';
import { OhloneFinancialAidDialog } from './OhloneFinancialAidDialog';
import { CategoryTabs, DirectoryCategoryId, directoryCategoryLabels } from './CategoryTabs';
import { DirectoryEntryRow } from './DirectoryEntryRow';

interface CommunityDirectoryProps {
  currentLanguage: Language;
  selectedCategory: DirectoryCategoryId;
  selectedNeeds?: CategoryId[];
  onSelectCategory: (category: DirectoryCategoryId) => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  availableCities: string[];
  searchQuery: string;
  freeOnly: boolean;
  onToggleFreeOnly: () => void;
  demonstrationCount: number;
  isEntrySaved: (entryId: string) => boolean;
  onToggleEntrySave: (entryId: string) => void;
}

const PANEL_ID = 'directory-panel';

/** Category sections in reading order, used by the "All Resources" view. */
const sectionOrder: CategoryId[] = ['food', 'workforce', 'community', 'mental-health'];

const sectionTitles: Record<CategoryId, { en: string; es: string }> = {
  food: { en: 'Food resources', es: 'Recursos de comida' },
  workforce: { en: 'Education resources', es: 'Recursos de educación' },
  community: { en: 'Community resources', es: 'Recursos comunitarios' },
  'mental-health': { en: 'Mental Health resources', es: 'Recursos de salud mental' }
};

export const CommunityDirectory: React.FC<CommunityDirectoryProps> = ({
  currentLanguage,
  selectedCategory,
  selectedNeeds = [],
  onSelectCategory,
  selectedCity,
  onSelectCity,
  availableCities,
  searchQuery,
  freeOnly,
  onToggleFreeOnly,
  demonstrationCount,
  isEntrySaved,
  onToggleEntrySave
}) => {
  const t = translations[currentLanguage];
  const [isOhloneAidOpen, setIsOhloneAidOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const focusNextRow = useRef<string | null>(null);
  const words = searchQuery.toLowerCase().trim().split(/\s+/).filter((w) => w.length > 2);

  const categoryLabels = (category: CategoryId) => directoryCategoryLabels[category][currentLanguage];

  // Everything that matches the non-category filters, so tab counts stay honest.
  const baseMatches = directoryEntries.filter((entry) => {
    if (selectedNeeds.length > 0 && !entry.categories.some((category) => selectedNeeds.includes(category))) {
      return false;
    }
    if (selectedCity !== 'all' && entry.city !== selectedCity) return false;
    if (words.length) {
      const haystack = [
        entry.name,
        entry.address,
        entry.city,
        entry.services?.en ?? '',
        entry.services?.es ?? '',
        entry.audience?.en ?? '',
        entry.audience?.es ?? '',
        ...entry.categories.map((category) => `${directoryCategoryLabels[category].en} ${directoryCategoryLabels[category].es}`)
      ].join(' ').toLowerCase();
      return words.some((word) => haystack.includes(word));
    }
    return true;
  });

  const matches = baseMatches.filter(
    (entry) => selectedCategory === 'all' || entry.categories.includes(selectedCategory)
  );

  const counts: Record<DirectoryCategoryId, number> = {
    all: baseMatches.length,
    food: baseMatches.filter((entry) => entry.categories.includes('food')).length,
    workforce: baseMatches.filter((entry) => entry.categories.includes('workforce')).length,
    community: baseMatches.filter((entry) => entry.categories.includes('community')).length,
    'mental-health': baseMatches.filter((entry) => entry.categories.includes('mental-health')).length
  };

  // "All Resources" lists each organization once, under the first category it
  // serves in tab order, so the groups agree with the category tabs.
  const sectionFor = (entry: { categories: CategoryId[] }): CategoryId =>
    sectionOrder.find((category) => entry.categories.includes(category)) ?? entry.categories[0];

  const orderedMatches =
    selectedCategory === 'all'
      ? [...matches].sort(
        (a, b) => sectionOrder.indexOf(sectionFor(a)) - sectionOrder.indexOf(sectionFor(b))
      )
      : matches;

  useEffect(() => { setVisibleCount(10); }, [selectedCategory, selectedNeeds.join(','), selectedCity, searchQuery, freeOnly]);

  useEffect(() => {
    if (!focusNextRow.current) return;
    const id = focusNextRow.current;
    focusNextRow.current = null;
    document.getElementById(id)?.focus();
  }, [visibleCount]);

  const visibleMatches = orderedMatches.slice(0, visibleCount);
  const organizationsLabel = currentLanguage === 'en' ? 'organization listings' : 'organizaciones';
  const samplesLabel = currentLanguage === 'en' ? 'sample programs' : 'programas de ejemplo';
  const eyebrow =
    selectedNeeds.length > 0
      ? (currentLanguage === 'en' ? 'Your selected needs' : 'Sus necesidades seleccionadas')
      : directoryCategoryLabels[selectedCategory][currentLanguage];

  const sections: { category: CategoryId; items: typeof visibleMatches }[] =
    selectedCategory === 'all'
      ? sectionOrder
        .map((category) => ({
          category,
          items: visibleMatches.filter((entry) => sectionFor(entry) === category)
        }))
        .filter((section) => section.items.length > 0)
      : [{
        category: selectedCategory as CategoryId,
        items: visibleMatches
      }];

  return (
    <section id="directory" aria-labelledby="directory-heading" className="qc-sec qc-shell scroll-mt-28">
      <div className="qc-eyebrow">{eyebrow}</div>
      <h2 id="directory-heading" className="qc-h2">
        {currentLanguage === 'en' ? 'Community Resource Directory' : 'Directorio de Recursos Comunitarios'}
      </h2>
      <p className="qc-dsub">
        {currentLanguage === 'en'
          ? 'Each organization appears under the categories it actually serves. Choose a category to see only those resources, or keep All Resources to see every organization once.'
          : 'Cada organización aparece en las categorías que realmente atiende. Elija una categoría para ver solo esos recursos o mantenga Todos los recursos para ver cada organización una vez.'}
      </p>

      <CategoryTabs
        currentLanguage={currentLanguage}
        selectedCategory={selectedCategory}
        counts={counts}
        onSelectCategory={onSelectCategory}
        panelId={PANEL_ID}
      />

      {/* Secondary filters */}
      <div className="qc-fs">
        <span>{t.filters.filterBy}:</span>

        <button
          type="button"
          onClick={() => {
            onSelectCategory('all');
            onSelectCity('all');
          }}
          className="qc-t min-h-0"
        >
          {t.filters.reset}
        </button>

        <label>
          <input type="checkbox" checked={freeOnly} onChange={onToggleFreeOnly} />
          <span>{t.filters.freeOnly}</span>
        </label>

        <span className="qc-cnt">{matches.length} {organizationsLabel} · {demonstrationCount} {samplesLabel}</span>
      </div>

      <p className="qc-filter-note">
        {currentLanguage === 'en'
          ? 'Organization websites are real. Check their details before visiting. The Free filter applies only to sample programs; organization fees are not checked here.'
          : 'Los sitios de organizaciones son reales. Revise sus datos antes de visitarlas. El filtro Gratis solo se aplica a programas de ejemplo; aquí no se verifican los costos de las organizaciones.'}
      </p>
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {currentLanguage === 'en'
          ? `${matches.length} organization listings in ${directoryCategoryLabels[selectedCategory].en} and ${demonstrationCount} sample programs found.`
          : `Se encontraron ${matches.length} organizaciones en ${directoryCategoryLabels[selectedCategory].es} y ${demonstrationCount} programas de ejemplo.`}
      </p>

      {/* City selector (kept from the existing filter set) */}
      <div className="mt-4 text-[0.875rem] text-[#5a5870]">
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

      {/* Listings, grouped by category */}
      <div
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`directory-tab-${selectedCategory}`}
        tabIndex={0}
        className="qc-dir-panel"
      >
        {matches.length === 0 ? (
          <p className="py-10 text-[0.9375rem] text-[#5a5870]">
            {currentLanguage === 'en'
              ? 'No directory listings match these filters yet. Try All Resources or another city.'
              : 'Ningún registro del directorio coincide con estos filtros. Pruebe Todos los recursos u otra ciudad.'}
          </p>
        ) : (
          <>
            {sections.map((section) => (
              <div
                key={section.category}
                className="qc-dir-section"
                role="group"
                aria-labelledby={`directory-section-${section.category}`}
              >
                <h3 id={`directory-section-${section.category}`} className="qc-dir-section-title">
                  {sectionTitles[section.category][currentLanguage]}
                  <span className="qc-dir-section-count">
                    {(() => {
                      const total = selectedCategory === 'all'
                        ? matches.filter((entry) => sectionFor(entry) === section.category).length
                        : matches.length;
                      const shown = section.items.length;
                      if (currentLanguage === 'en') {
                        return shown < total ? `${shown} of ${total} listings` : `${total} ${total === 1 ? 'listing' : 'listings'}`;
                      }
                      return shown < total ? `${shown} de ${total} registros` : `${total} ${total === 1 ? 'registro' : 'registros'}`;
                    })()}
                  </span>
                </h3>
                {section.items.map((entry) => (
                  <DirectoryEntryRow
                    key={entry.id}
                    entry={entry}
                    currentLanguage={currentLanguage}
                    isSaved={isEntrySaved(entry.id)}
                    onToggleSave={onToggleEntrySave}
                    onOpenOhloneAid={() => setIsOhloneAidOpen(true)}
                  />
                ))}
              </div>
            ))}

            {visibleCount < orderedMatches.length && (
              <button
                type="button"
                className="qc-btn-sm qc-load-more"
                onClick={() => {
                  focusNextRow.current = `directory-entry-${orderedMatches[visibleCount].id}`;
                  setVisibleCount((count) => count + 10);
                }}
              >
                {currentLanguage === 'en'
                  ? `Show ${Math.min(10, orderedMatches.length - visibleCount)} more organizations`
                  : `Mostrar ${Math.min(10, orderedMatches.length - visibleCount)} organizaciones más`}
              </button>
            )}
          </>
        )}
      </div>

      <p className="qc-filter-note">
        {currentLanguage === 'en'
          ? '“Not confirmed” means the organization does not publish that detail in this listing. Call them before you visit.'
          : '“No confirmado” significa que la organización no publica ese dato en este registro. Llame antes de visitarla.'}
      </p>

      {isOhloneAidOpen && (
        <OhloneFinancialAidDialog currentLanguage={currentLanguage} onClose={() => setIsOhloneAidOpen(false)} />
      )}
    </section>
  );
};
