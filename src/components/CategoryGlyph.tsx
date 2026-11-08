import React from 'react';
import { CategoryId } from '../types';

interface CategoryGlyphProps {
  id: CategoryId;
  className?: string;
}

// Shared line icons for the five resource categories so the homepage,
// navigation and sidebar all use the same visual language.
export const CategoryGlyph: React.FC<CategoryGlyphProps> = ({ id, className = '' }) => {
  const paths: Record<CategoryId, React.ReactNode> = {
    workforce: (
      <>
        <path d="M2 9l10-5 10 5-10 5z" />
        <path d="M6 11v5c3 2.5 9 2.5 12 0v-5" />
      </>
    ),
    food: (
      <>
        <path d="M5 11h14l-1.5 9h-11z" />
        <path d="M8 11c0-4 8-4 8 0" />
      </>
    ),
    'mental-health': (
      <path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 9c0 6-8 11-8 11z" />
    ),
    education: (
      <>
        <path d="M4 5h6a2 2 0 012 2v12a2 2 0 00-2-2H4z" />
        <path d="M20 5h-6a2 2 0 00-2 2v12a2 2 0 012-2h6z" />
      </>
    ),
    community: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
        <path d="M16 6a3 3 0 010 5" />
        <path d="M18 14c2 1 4 3 4 6" />
      </>
    )
  };

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[id]}
    </svg>
  );
};
