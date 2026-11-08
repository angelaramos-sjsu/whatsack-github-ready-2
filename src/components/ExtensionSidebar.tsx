import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Bot,
  ChevronRight,
  Layers,
  Maximize2,
  Minimize2,
  Minus,
  Search,
  Sparkles,
  X
} from 'lucide-react';
import { CategoryId, Language } from '../types';
import { categoryDescription, categoryLabel, directoryCategories } from '../data/categories';
import { CategoryGlyph } from './CategoryGlyph';

export type CompanionMode = 'closed' | 'open' | 'minimized';

interface ExtensionSidebarProps {
  mode: CompanionMode;
  expanded: boolean;
  currentLanguage: Language;
  categoryCounts: Record<CategoryId, number>;
  selectedCategory: CategoryId | 'all';
  searchQuery: string;
  savedCount: number;
  onOpen: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleExpand: () => void;
  onSelectCategory: (category: CategoryId | 'all') => void;
  onSearch: (query: string) => void;
  onOpenSaved: () => void;
  onOpenCopilot: () => void;
  onOpenFullDemo: () => void;
  onGoHome: () => void;
}

// Dockable browser-extension style companion. Closed it leaves a slim edge tab,
// minimized it becomes a compact pill, open it docks beside the page.
export const ExtensionSidebar: React.FC<ExtensionSidebarProps> = ({
  mode,
  expanded,
  currentLanguage,
  categoryCounts,
  selectedCategory,
  searchQuery,
  savedCount,
  onOpen,
  onClose,
  onMinimize,
  onToggleExpand,
  onSelectCategory,
  onSearch,
  onOpenSaved,
  onOpenCopilot,
  onOpenFullDemo,
  onGoHome
}) => {
  const en = currentLanguage === 'en';
  const panelRef = useRef<HTMLElement>(null);
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (mode !== 'open') return;
    panelRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, onClose]);

  if (mode === 'closed') {
    return (
      <button type="button" className="qc-ext-rail" onClick={onOpen} aria-label={en ? 'Open WhatSack companion sidebar' : 'Abrir barra lateral WhatSack'}>
        <Sparkles aria-hidden="true" />
        <span>Companion</span>
      </button>
    );
  }

  if (mode === 'minimized') {
    return (
      <button type="button" className="qc-ext-pill" onClick={onOpen} aria-label={en ? 'Restore WhatSack companion sidebar' : 'Restaurar barra lateral WhatSack'}>
        <Sparkles aria-hidden="true" />
        <span>{en ? 'Companion sidebar' : 'Barra lateral'}</span>
        <ChevronRight aria-hidden="true" style={{ transform: 'rotate(180deg)' }} />
      </button>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const totalListings = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);
  const blurb =
    selectedCategory === 'all'
      ? en
        ? 'Browse every verified local listing, or search in plain language.'
        : 'Explore todos los registros locales o busque en lenguaje sencillo.'
      : categoryDescription(selectedCategory, currentLanguage);

  return (
    <>
      <button type="button" className="qc-ext-scrim lg:hidden" aria-label={en ? 'Close companion sidebar' : 'Cerrar barra lateral'} onClick={onClose} />

      <aside
        ref={panelRef}
        tabIndex={-1}
        className={`qc-ext ${expanded ? 'qc-ext--wide' : ''}`}
        aria-label={en ? 'WhatSack companion extension sidebar' : 'Barra lateral de la extensión WhatSack'}
      >
        <div className="qc-ext-head">
          <span className="qc-ext-avatar" aria-hidden="true">
            <Sparkles />
          </span>
          <div className="qc-ext-title">
            <strong>
              WhatSack Companion
              <span className="qc-ext-dot" aria-hidden="true" />
            </strong>
            <span>{en ? 'Browser extension preview' : 'Vista previa de la extensión'}</span>
          </div>

          <div className="qc-ext-controls">
            <button type="button" onClick={onMinimize} title={en ? 'Minimize sidebar' : 'Minimizar barra'} aria-label={en ? 'Minimize sidebar' : 'Minimizar barra'}>
              <Minus aria-hidden="true" />
            </button>
            <div className="hidden sm:block">
              <button
                type="button"
                onClick={onToggleExpand}
                title={expanded ? (en ? 'Use standard width' : 'Ancho estándar') : en ? 'Expand sidebar' : 'Expandir barra'}
                aria-label={expanded ? (en ? 'Use standard width' : 'Ancho estándar') : en ? 'Expand sidebar' : 'Expandir barra'}
                aria-pressed={expanded}
              >
                {expanded ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
              </button>
            </div>
            <button type="button" onClick={onClose} title={en ? 'Close sidebar' : 'Cerrar barra'} aria-label={en ? 'Close sidebar' : 'Cerrar barra'}>
              <X aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="qc-ext-body">
          <form className="qc-ext-field" onSubmit={handleSearch} role="search">
            <label htmlFor="companion-search" className="sr-only">
              {en ? 'Search community resources' : 'Buscar recursos comunitarios'}
            </label>
            <Search aria-hidden="true" className="h-4 w-4 text-[#4C1D95]" />
            <input
              id="companion-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={en ? 'Search resources…' : 'Buscar recursos…'}
            />
            <button type="submit" aria-label={en ? 'Run search' : 'Buscar'}>
              <ArrowRight aria-hidden="true" />
            </button>
          </form>

          <div>
            <h3 className="qc-ext-heading">{en ? 'Resource categories' : 'Categorías de recursos'}</h3>
            <div className="qc-ext-list">
              <button
                type="button"
                className={`qc-ext-item ${selectedCategory === 'all' ? 'on' : ''}`}
                onClick={() => onSelectCategory('all')}
                aria-current={selectedCategory === 'all' ? 'true' : undefined}
              >
                <Layers aria-hidden="true" className="qc-ext-glyph" />
                <span>{en ? 'All resources' : 'Todos los recursos'}</span>
                <span className="qc-ext-count">{totalListings}</span>
              </button>

              {directoryCategories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`qc-ext-item ${selectedCategory === category.id ? 'on' : ''}`}
                  onClick={() => onSelectCategory(category.id)}
                  aria-current={selectedCategory === category.id ? 'true' : undefined}
                >
                  <CategoryGlyph id={category.id} className="qc-ext-glyph" />
                  <span>{category.name[currentLanguage]}</span>
                  <span className="qc-ext-count">{categoryCounts[category.id] || 0}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="qc-ext-note">
            <strong>
              <Sparkles aria-hidden="true" />
              {selectedCategory === 'all'
                ? en ? 'About this directory' : 'Sobre este directorio'
                : categoryLabel(selectedCategory, currentLanguage)}
            </strong>
            {blurb}
          </div>

          <div>
            <h3 className="qc-ext-heading">{en ? 'Quick actions' : 'Acciones rápidas'}</h3>
            <div className="qc-ext-actions">
              <button type="button" className="qc-ext-item" onClick={onOpenSaved}>
                <Bookmark aria-hidden="true" className="qc-ext-glyph" />
                <span>{en ? 'Saved items' : 'Elementos guardados'}</span>
                <span className="qc-ext-count">{savedCount}</span>
              </button>
              <button type="button" className="qc-ext-item" onClick={onOpenCopilot}>
                <Bot aria-hidden="true" className="qc-ext-glyph" />
                <span>{en ? 'Ask the copilot' : 'Preguntar al copiloto'}</span>
                <ChevronRight aria-hidden="true" className="ml-auto h-4 w-4 text-[#8a879f]" />
              </button>
              <button type="button" className="qc-ext-item" onClick={onOpenFullDemo}>
                <Layers aria-hidden="true" className="qc-ext-glyph" />
                <span>{en ? 'Open full extension demo' : 'Abrir demostración completa'}</span>
                <ChevronRight aria-hidden="true" className="ml-auto h-4 w-4 text-[#8a879f]" />
              </button>
            </div>
          </div>
        </div>

        <div className="qc-ext-foot">
          <span>{en ? 'Academic prototype' : 'Prototipo académico'}</span>
          <button type="button" onClick={onGoHome}>
            {en ? 'Full website' : 'Sitio completo'}
          </button>
        </div>
      </aside>
    </>
  );
};
