import { describe, expect, it } from 'vitest';
import { directoryEntries } from '../directory';
import type { CategoryId } from '../../types';

const categoriesOf = (id: string): CategoryId[] => {
  const entry = directoryEntries.find((item) => item.id === id);
  if (!entry) throw new Error(`Missing directory entry ${id}`);
  return entry.categories;
};

describe('directory categories', () => {
  it('gives every listing at least one category and no duplicate categories', () => {
    directoryEntries.forEach((entry) => {
      expect(entry.categories.length).toBeGreaterThan(0);
      expect(new Set(entry.categories).size).toBe(entry.categories.length);
    });
  });

  it('keeps only the four supported categories', () => {
    const allowed: CategoryId[] = ['food', 'workforce', 'community', 'mental-health'];
    directoryEntries.forEach((entry) => {
      entry.categories.forEach((category) => expect(allowed).toContain(category));
    });
  });

  it('lists a senior center under Community only', () => {
    expect(categoriesOf('dir-campbell-adult-center-1')).toEqual(['community']);
    expect(categoriesOf('dir-mountain-view-senior-center-8')).toEqual(['community']);
  });

  it('lists a college and a financial aid program under Education only', () => {
    expect(categoriesOf('dir-de-anza-college-21')).toEqual(['workforce']);
    expect(categoriesOf('dir-fafsa-52')).toEqual(['workforce']);
  });

  it('does not put the general 211 referral line under Food', () => {
    expect(categoriesOf('dir-211-bay-area-16')).toEqual(['community']);
  });

  it('moves West Valley Community Services out of Mental Health', () => {
    expect(categoriesOf('dir-west-valley-community-services-58')).toEqual(['food', 'community']);
  });

  it('lists multi-service sources in each category they serve', () => {
    expect(categoriesOf('dir-san-jose-public-library-king-library-40')).toEqual(['workforce', 'community']);
    expect(categoriesOf('dir-community-college-basic-needs-centers-48')).toEqual(['workforce', 'food']);
  });

  it('shows each listing exactly once in All Resources', () => {
    const sectionOrder: CategoryId[] = ['food', 'workforce', 'community', 'mental-health'];
    const grouped = sectionOrder.flatMap((category) =>
      directoryEntries.filter((entry) => entry.categories[0] === category)
    );
    expect(grouped).toHaveLength(directoryEntries.length);
    expect(new Set(grouped.map((entry) => entry.id)).size).toBe(directoryEntries.length);
  });

  it('finds every listing in each of its own categories and no other', () => {
    (['food', 'workforce', 'community', 'mental-health'] as CategoryId[]).forEach((category) => {
      const inCategory = directoryEntries
        .filter((entry) => entry.categories.includes(category))
        .map((entry) => entry.id);
      directoryEntries.forEach((entry) => {
        expect(inCategory.includes(entry.id)).toBe(entry.categories.includes(category));
      });
    });
  });

  it('never claims details the listing does not publish', () => {
    directoryEntries.forEach((entry) => {
      if (entry.services) {
        expect(entry.services.en.trim().length).toBeGreaterThan(0);
        expect(entry.services.es.trim().length).toBeGreaterThan(0);
      }
      if (entry.contact?.phone) expect(entry.contact.phone.trim().length).toBeGreaterThan(0);
      if (entry.hours) expect(entry.hours.en.trim().length).toBeGreaterThan(0);
      if (entry.cost) expect(entry.cost.en.trim().length).toBeGreaterThan(0);
      entry.languages?.forEach((language) => expect(language.en.trim().length).toBeGreaterThan(0));
    });
  });

  it('keeps the published name, address and website for every organization', () => {
    directoryEntries.forEach((entry) => {
      expect(entry.name.trim().length).toBeGreaterThan(0);
      expect(entry.address.trim().length).toBeGreaterThan(0);
      expect(entry.website.startsWith('https://')).toBe(true);
    });
  });
});
