import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CategoryId, Language } from '../types';
import { translations } from '../data/translations';

interface HomeCategoryGridProps {
  currentLanguage: Language;
  directoryCounts: Record<CategoryId, number>;
  sampleCounts: Record<CategoryId, number>;
  onOpenCategory: (category: CategoryId) => void;
}

/** Reading order matches the resource directory tabs. */
const categoryOrder: CategoryId[] = ['food', 'workforce', 'community', 'mental-health'];

const categoryIcons: Record<CategoryId, React.ReactNode> = {
  food: (
    <>
      <path d="M5 11h14l-1.5 9h-11z" />
      <path d="M8 11c0-4 8-4 8 0" />
    </>
  ),
  workforce: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c3 2.5 9 2.5 12 0v-5" />
    </>
  ),
  community: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
      <path d="M16 6a3 3 0 010 5" />
      <path d="M18 14c2 1 4 3 4 6" />
    </>
  ),
  'mental-health': <path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6-8 11-8 11z" />
};

/**
 * The homepage's four category paths. Each card opens the same resource
 * directory filtered to that category, so the homepage, the main navigation
 * and the extension sidebar all lead to one set of resources.
 */
export const HomeCategoryGrid: React.FC<HomeCategoryGridProps> = ({
  currentLanguage,
  directoryCounts,
  sampleCounts,
  onOpenCategory
}) => {
  const t = translations[currentLanguage];
  const isEnglish = currentLanguage === 'en';

  const copy: Record<CategoryId, { name: string; description: string }> = {
    food: { name: t.categories.food, description: t.categories.foodDesc },
    workforce: { name: t.categories.workforce, description: t.categories.workforceDesc },
    community: { name: t.categories.community, description: t.categories.communityDesc },
    'mental-health': { name: t.categories.mentalHealth, description: t.categories.mentalHealthDesc }
  };

  const shortLabels: Record<CategoryId, string> = {
    food: isEnglish ? 'Food' : 'Comida',
    workforce: isEnglish ? 'Education' : 'Educación',
    community: isEnglish ? 'Community' : 'Comunidad',
    'mental-health': isEnglish ? 'Mental health' : 'Salud mental'
  };

  return (
    <section aria-labelledby="home-categories-heading" className="qc-shell qc-catgrid-section">
      <div className="qc-catgrid-head">
        <p className="qc-eyebrow">{isEnglish ? 'Browse by category' : 'Explorar por categoría'}</p>
        <h2 id="home-categories-heading" className="qc-h2">
          {isEnglish ? 'Four kinds of local support' : 'Cuatro tipos de apoyo local'}
        </h2>
        <p className="qc-dsub">
          {isEnglish
            ? 'Pick a category to see organization listings and sample programs for that kind of support. You can change category any time.'
            : 'Elija una categoría para ver organizaciones y programas de ejemplo de ese tipo de apoyo. Puede cambiar de categoría cuando quiera.'}
        </p>
      </div>

      <ul className="qc-catgrid">
        {categoryOrder.map((id) => {
          const directoryCount = directoryCounts[id] ?? 0;
          const sampleCount = sampleCounts[id] ?? 0;
          return (
            <li key={id}>
              <button type="button" className="qc-catcard" onClick={() => onOpenCategory(id)}>
                <span className="qc-catcard__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{categoryIcons[id]}</svg>
                </span>
                <span className="qc-catcard__title">{copy[id].name}</span>
                <span className="qc-catcard__desc">{copy[id].description}</span>
                <span className="qc-catcard__meta">
                  {isEnglish
                    ? `${directoryCount} organization listings · ${sampleCount} sample programs`
                    : `${directoryCount} organizaciones · ${sampleCount} programas de ejemplo`}
                </span>
                <span className="qc-catcard__cta">
                  {isEnglish ? `Open ${shortLabels[id]}` : `Abrir ${shortLabels[id]}`}
                  <ArrowRight aria-hidden="true" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
