import React from 'react';
import { CategoryId } from '../types';

/**
 * Line icons for the four directory categories, shared by the homepage cards
 * and the WhatSack Companion sidebar so both show the same symbols.
 */
export const categoryIcons: Record<CategoryId, React.ReactNode> = {
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
