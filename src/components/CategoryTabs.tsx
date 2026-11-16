import React, { useRef } from 'react';
import { CategoryId, Language } from '../types';

export type DirectoryCategoryId = CategoryId | 'all';

/** Tabs shown in the resource directory, in reading order. */
export const directoryCategoryOrder: DirectoryCategoryId[] = [
  'all',
  'food',
  'workforce',
  'community',
  'mental-health'
];

export const directoryCategoryLabels: Record<DirectoryCategoryId, { en: string; es: string }> = {
  all: { en: 'All Resources', es: 'Todos los recursos' },
  food: { en: 'Food', es: 'Comida' },
  workforce: { en: 'Education', es: 'Educación' },
  community: { en: 'Community', es: 'Comunidad' },
  'mental-health': { en: 'Mental Health', es: 'Salud Mental' }
};

interface CategoryTabsProps {
  currentLanguage: Language;
  selectedCategory: DirectoryCategoryId;
  counts: Record<DirectoryCategoryId, number>;
  onSelectCategory: (category: DirectoryCategoryId) => void;
  panelId: string;
}

/**
 * Accessible tab list for the resource directory. Arrow keys, Home and End
 * move between tabs (automatic activation), and only the selected tab is in
 * the page tab order.
 */
export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  currentLanguage,
  selectedCategory,
  counts,
  onSelectCategory,
  panelId
}) => {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const focusTab = (id: DirectoryCategoryId) => {
    onSelectCategory(id);
    tabRefs.current[id]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = directoryCategoryOrder.length - 1;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusTab(directoryCategoryOrder[index === last ? 0 : index + 1]);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTab(directoryCategoryOrder[index === 0 ? last : index - 1]);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTab(directoryCategoryOrder[0]);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTab(directoryCategoryOrder[last]);
    }
  };

  return (
    <div
      className="qc-tabs"
      role="tablist"
      aria-label={currentLanguage === 'en' ? 'Resource categories' : 'Categorías de recursos'}
    >
      {directoryCategoryOrder.map((id, index) => {
        const selected = selectedCategory === id;
        const label = directoryCategoryLabels[id][currentLanguage];
        const count = counts[id];
        return (
          <button
            key={id}
            ref={(element) => {
              tabRefs.current[id] = element;
            }}
            type="button"
            role="tab"
            id={`directory-tab-${id}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            className={`qc-tab ${selected ? 'on' : ''}`}
            onClick={() => onSelectCategory(id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span>{label}</span>
            <span className="qc-tab-count">
              {count}
              <span className="sr-only">
                {currentLanguage === 'en' ? ' listings' : ' registros'}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
};
