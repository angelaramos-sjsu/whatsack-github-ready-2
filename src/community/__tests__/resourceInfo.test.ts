import { describe, expect, it } from 'vitest';
import { mockCommunityResources } from '../data/communityResources.mock';
import { explainMatch } from '../i18n';
import {
  buildNoResultGuidance,
  formatVerifiedDate,
  isFreshnessUnknown,
  isResourceOutdated,
  matchCommunityResources
} from '../matching';
import { createDefaultProfile, mergeProfilePatch } from '../profile';

const byId = (id: string) => {
  const resource = mockCommunityResources.find((item) => item.id === id);
  if (!resource) throw new Error(`Missing mock resource ${id}`);
  return resource;
};

describe('missing information', () => {
  it('keeps unknown fields null so the card can say "Not confirmed."', () => {
    const incomplete = byId('c-13');
    expect(incomplete.contact.phone).toBeNull();
    expect(incomplete.officialSourceUrl).toBeNull();
    expect(incomplete.times).toBeNull();
    expect(incomplete.transportation).toBeNull();
    expect(isFreshnessUnknown(incomplete)).toBe(true);
    expect(formatVerifiedDate(incomplete.lastVerified, 'en')).toBeNull();
  });

  it('formats a verification date when one exists', () => {
    expect(formatVerifiedDate('2026-08-14', 'en')).toMatch(/2026/);
    expect(formatVerifiedDate('not-a-date', 'en')).toBeNull();
  });

  it('never labels mock listings as verified real services', () => {
    mockCommunityResources.forEach((resource) => {
      expect(['mock', 'outdated']).toContain(resource.verification);
      if (resource.contact.phone) {
        expect(resource.contact.phone.startsWith('555-01')).toBe(true);
      }
      if (resource.officialSourceUrl) {
        expect(resource.officialSourceUrl.startsWith('https://example.org/')).toBe(true);
      }
    });
  });
});

describe('outdated and inaccessible resources', () => {
  it('flags a listing whose review is past the window', () => {
    const stale = { ...byId('c-01'), lastVerified: '2024-01-01', verification: 'mock' as const };
    expect(isResourceOutdated(stale, new Date('2026-11-01'))).toBe(true);
  });

  it('marks a listed-outdated record as outdated in the results', () => {
    const outcome = matchCommunityResources(
      mergeProfilePatch(createDefaultProfile(), {
        intent: 'clubs-groups',
        location: { kind: 'city', value: 'San Jose' },
        ageGroup: 'older-adults',
        interests: ['learning']
      })
    );
    const stale = outcome.matches.find((match) => match.resource.id === 'c-12');
    if (stale) expect(stale.flags).toContain('outdated');
  });

  it('relaxes an impossible combination and says what was not confirmed', () => {
    const outcome = matchCommunityResources(
      mergeProfilePatch(createDefaultProfile(), {
        intent: 'meet-people',
        location: { kind: 'city', value: 'San Jose' },
        language: 'ko',
        access: ['wheelchair']
      })
    );
    expect(outcome.relaxed).toContain('accessibility');
    expect(outcome.relaxed).toContain('language');
    expect(outcome.matches.length).toBeGreaterThan(0);
    expect(
      outcome.matches.some(
        (match) =>
          match.flags.includes('language-not-confirmed') ||
          match.flags.includes('wheelchair-not-confirmed')
      )
    ).toBe(true);
  });
});

describe('no-result guidance', () => {
  it('returns guidance instead of an empty list', () => {
    const profile = mergeProfilePatch(createDefaultProfile(), {
      intent: 'volunteering',
      location: { kind: 'city', value: 'Palo Alto' }
    });
    const outcome = matchCommunityResources(profile, { resources: [] });
    expect(outcome.matches).toEqual([]);

    const guidance = buildNoResultGuidance(profile);
    expect(guidance.humanPhone).toBe('211');
    expect(guidance.title.en.length).toBeGreaterThan(0);
    expect(guidance.suggestions.length).toBeGreaterThanOrEqual(3);
    expect(guidance.body.es.length).toBeGreaterThan(0);
  });
});

describe('explainMatch', () => {
  it('explains a Spanish-language option in Spanish', () => {
    const profile = mergeProfilePatch(createDefaultProfile(), {
      intent: 'meet-people',
      location: { kind: 'city', value: 'San Jose' },
      language: 'es'
    });
    const explanation = explainMatch(
      profile,
      { city: 'San Jose', languages: ['es'], virtual: false, intents: ['meet-people'] },
      'es'
    );
    expect(explanation).toContain('San Jose');
    expect(explanation).toContain('Español');
    expect(explanation).toContain('Conocer gente nueva');
  });
});
