import React, { useEffect, useRef } from 'react';
import {
  BookmarkCheck,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  Home,
  Layers,
  Minimize2,
  PanelRight,
  Sparkles,
  X
} from 'lucide-react';
import { CategoryId, Language } from '../types';
import { translations } from '../data/translations';
import { DirectoryCategoryId, directoryCategoryLabels, directoryCategoryOrder } from './CategoryTabs';
import { categoryIcons } from './categoryIcons';

export type CompanionState = 'closed' | 'open' | 'minimized';

interface ExtensionSidebarProps {
  currentLanguage: Language;
  state: CompanionState;
  expanded: boolean;
  onOpen: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onRestore: () => void;
  onToggleExpanded: () => void;
  /** Shared with the website's resource search, not a separate search. */
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  selectedCategory: DirectoryCategoryId;
  onSelectCategory: (category: DirectoryCategoryId) => void;
  counts: Record<CategoryId, number>;
  totalCount: number;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenCopilot: () => void;
  onOpenExtensionDemo: () => void;
  onNavigateHome: () => void;
}

const COMPACT_QUERY = '(max-width: 1079px)';

/**
 * "WhatSack Companion" — a UI simulation of a browser-extension sidebar.
 * It is a fixed panel over the website (a bottom sheet on phones and tablets)
 * and reuses the site's own search, category, saved-items, copilot and
 * navigation state. Nothing here creates a real extension or new data.
 */
export const ExtensionSidebar: React.FC<ExtensionSidebarProps> = ({
  currentLanguage,
  state,
  expanded,
  onOpen,
  onClose,
  onMinimize,
  onRestore,
  onToggleExpanded,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  selectedCategory,
  onSelectCategory,
  counts,
  totalCount,
  savedCount,
  onOpenSaved,
  onOpenCopilot,
  onOpenExtensionDemo,
  onNavigateHome
}) => {
  const t = translations[currentLanguage];
  const copy = t.companion;
  const panelRef = useRef<HTMLElement | null>(null);
  const tabRef = useRef<HTMLButtonElement | null>(null);
  const pillRef = useRef<HTMLButtonElement | null>(null);
  const hasOpened = useRef(false);

  const isCompact = () =>
    typeof window !== 'undefined' && window.matchMedia(COMPACT_QUERY).matches;

  // On phones and tablets the sheet closes after a search or a navigation move.
  const closeIfCompact = () => {
    if (isCompact()) onClose();
  };

  // Move focus into the panel when it opens, and back to the control it
  // collapsed into when it minimizes or closes.
  useEffect(() => {
    if (state === 'open') {
      hasOpened.current = true;
      panelRef.current?.focus();
    } else if (state === 'minimized' && hasOpened.current) {
      pillRef.current?.focus();
    } else if (state === 'closed' && hasOpened.current) {
      tabRef.current?.focus();
    }
  }, [state]);

  // Escape closes the panel.
  useEffect(() => {
    if (state !== 'open') return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, onClose]);

  const categoryCopy: Record<CategoryId, { name: string; description: string }> = {
    food: { name: t.categories.food, description: t.categories.foodDesc },
    workforce: { name: t.categories.workforce, description: t.categories.workforceDesc },
    community: { name: t.categories.community, description: t.categories.communityDesc },
    'mental-health': { name: t.categories.mentalHealth, description: t.categories.mentalHealthDesc }
  };

  const infoTitle = selectedCategory === 'all'
    ? copy.aboutTitle
    : categoryCopy[selectedCategory].name;
  const infoText = selectedCategory === 'all'
    ? copy.aboutText
    : categoryCopy[selectedCategory].description;

  const chooseCategory = (category: DirectoryCategoryId) => {
    onSelectCategory(category);
    closeIfCompact();
  };

  return (
    <>
      {state === 'closed' && (
        <button
          ref={tabRef}
          type="button"
          className="qc-companion-tab"
          onClick={onOpen}
          aria-label={copy.openLabel}
        >
          <Sparkles aria-hidden="true" />
          <span aria-hidden="true">{copy.tabLabel}</span>
        </button>
      )}

      {state === 'minimized' && (
        <button
          ref={pillRef}
          type="button"
          className="qc-companion-pill"
          onClick={onRestore}
          aria-label={copy.restoreLabel}
        >
          <Sparkles aria-hidden="true" />
          <span>{copy.minimizedLabel}</span>
          <ChevronUp className="qc-companion-pill__up" aria-hidden="true" />
          <ChevronRight className="qc-companion-pill__right" aria-hidden="true" />
        </button>
      )}

      {state === 'open' && (
        <>
          <button
            type="button"
            className="qc-companion-scrim"
            aria-hidden="true"
            tabIndex={-1}
            onClick={onClose}
          />

          <aside
            id="whatsack-companion-panel"
            ref={panelRef}
            tabIndex={-1}
            aria-label={`${copy.title} — ${copy.subtitle}`}
            className={`qc-companion-panel ${expanded ? 'is-expanded' : ''}`}
          >
            <header className="qc-companion__head">
              <span className="qc-companion__spark" aria-hidden="true">
                <Sparkles />
              </span>
              <div className="qc-companion__titles">
                <h2 className="qc-companion__title">
                  {copy.title}
                  <span className="qc-companion__live">{copy.live}</span>
                </h2>
                <p className="qc-companion__sub">{copy.subtitle}</p>
              </div>
              <div className="qc-companion__actions">
                <button
                  type="button"
                  className="qc-companion__icon-btn"
                  onClick={onMinimize}
                  aria-label={copy.minimize}
                  title={copy.minimize}
                >
                  <Minimize2 aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="qc-companion__icon-btn qc-companion__expand"
                  onClick={onToggleExpanded}
                  aria-pressed={expanded}
                  aria-label={expanded ? copy.restoreWidth : copy.expand}
                  title={expanded ? copy.restoreWidth : copy.expand}
                >
                  {expanded ? <ChevronsLeft aria-hidden="true" /> : <ChevronsRight aria-hidden="true" />}
                </button>
                <button
                  type="button"
                  className="qc-companion__icon-btn"
                  onClick={onClose}
                  aria-label={copy.close}
                  title={copy.close}
                >
                  <X aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="qc-companion__body">
              <form
                role="search"
                className="qc-companion__search"
                onSubmit={(event) => {
                  event.preventDefault();
                  onSearchSubmit();
                  closeIfCompact();
                }}
              >
                <label htmlFor="companion-search-input" className="sr-only">
                  {copy.searchLabel}
                </label>
                <input
                  id="companion-search-input"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder={copy.searchPlaceholder}
                />
                <button type="submit" className="qc-companion__search-btn">
                  {copy.searchButton}
                </button>
              </form>

              <nav aria-label={copy.categoriesLabel}>
                <p className="qc-companion__label">{copy.categoriesLabel}</p>
                <ul className="qc-companion__cats">
                  <li>
                    <button
                      type="button"
                      className={`qc-companion__cat ${selectedCategory === 'all' ? 'is-active' : ''}`}
                      onClick={() => chooseCategory('all')}
                      aria-current={selectedCategory === 'all' ? 'true' : undefined}
                    >
                      <span className="qc-companion__cat-icon" aria-hidden="true">
                        <Layers />
                      </span>
                      <span className="qc-companion__cat-name">{copy.allResources}</span>
                      <span className="qc-companion__cat-count">{totalCount}</span>
                    </button>
                  </li>
                  {directoryCategoryOrder
                    .filter((id): id is CategoryId => id !== 'all')
                    .map((id) => {
                      const active = selectedCategory === id;
                      return (
                        <li key={id}>
                          <button
                            type="button"
                            className={`qc-companion__cat ${active ? 'is-active' : ''}`}
                            onClick={() => chooseCategory(id)}
                            aria-current={active ? 'true' : undefined}
                          >
                            <span className="qc-companion__cat-icon" aria-hidden="true">
                              <svg viewBox="0 0 24 24">{categoryIcons[id]}</svg>
                            </span>
                            <span className="qc-companion__cat-name">
                              {directoryCategoryLabels[id][currentLanguage]}
                            </span>
                            <span className="qc-companion__cat-count">{counts[id]}</span>
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </nav>

              <div className="qc-companion__info">
                <h3>{infoTitle}</h3>
                <p>{infoText}</p>
              </div>

              <div className="qc-companion__quick">
                <p className="qc-companion__label">{copy.quickActions}</p>
                <button
                  type="button"
                  onClick={() => {
                    onOpenSaved();
                    closeIfCompact();
                  }}
                >
                  <BookmarkCheck aria-hidden="true" />
                  <span>{copy.savedItems}</span>
                  <span className="qc-companion__cat-count">{savedCount}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenCopilot();
                    closeIfCompact();
                  }}
                >
                  <Sparkles aria-hidden="true" />
                  <span>{copy.askCopilot}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenExtensionDemo();
                    closeIfCompact();
                  }}
                >
                  <PanelRight aria-hidden="true" />
                  <span>{copy.openDemo}</span>
                </button>
              </div>
            </div>

            <footer className="qc-companion__foot">
              <p>{copy.prototype}</p>
              <button
                type="button"
                className="qc-btn-sm"
                onClick={() => {
                  onNavigateHome();
                  closeIfCompact();
                }}
              >
                <Home aria-hidden="true" />
                <span>{copy.fullWebsite}</span>
              </button>
            </footer>
          </aside>
        </>
      )}
    </>
  );
};

export default ExtensionSidebar;
