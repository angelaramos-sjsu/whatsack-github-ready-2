import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Language } from '../types';
import {
  DirectoryCategoryId,
  directoryCategoryLabels,
  directoryCategoryOrder
} from './CategoryTabs';

interface CategoryMenuProps {
  label: string;
  currentLanguage: Language;
  active: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCategory: (category: DirectoryCategoryId) => void;
}

/**
 * The "Find Resources" navigation item opens a short list of the four
 * categories plus All Resources, so every category is one step from the
 * main navigation.
 */
export const CategoryMenu: React.FC<CategoryMenuProps> = ({
  label,
  currentLanguage,
  active,
  open,
  onOpenChange,
  onSelectCategory
}) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const isEnglish = currentLanguage === 'en';

  const choose = (category: DirectoryCategoryId) => {
    onOpenChange(false);
    onSelectCategory(category);
  };

  return (
    <details
      ref={detailsRef}
      className="qc-catmenu"
      open={open}
      onToggle={(event) => onOpenChange(event.currentTarget.open)}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !open) return;
        event.preventDefault();
        onOpenChange(false);
        detailsRef.current?.querySelector('summary')?.focus();
      }}
    >
      <summary className={`qc-link qc-catmenu-summary ${active ? 'on' : ''}`}>
        {label}
        <ChevronDown className="qc-catmenu-caret" aria-hidden="true" />
      </summary>
      <div className="qc-catmenu-panel">
        <span className="qc-catmenu-title">{isEnglish ? 'Resource categories' : 'Categorías de recursos'}</span>
        {directoryCategoryOrder.map((id) => (
          <button key={id} type="button" onClick={() => choose(id)}>
            <span>{directoryCategoryLabels[id][currentLanguage]}</span>
          </button>
        ))}
      </div>
    </details>
  );
};
