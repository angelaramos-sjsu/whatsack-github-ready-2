import { describe, expect, it } from 'vitest';
import { communityPrograms } from '../../data/communityPrograms';
import { detectIntent, seedPreferencesFromIntent } from '../intent';
import { emptyPreferences } from '../intake';
import { findMatchingPrograms, getMissingFields, isStale } from '../match';
import { ConnectorPreferences } from '../types';

const ROSA_MESSAGE =
  'Me siento un poco sola durante la semana. Me gustaría encontrar actividades donde pueda conocer a otras personas que hablen español.';

const rosaPreferences: ConnectorPreferences = seedPreferencesFromIntent(
  {
    ...emptyPreferences,
    location: { city: 'San Jose', virtual: false },
    language: { code: 'es', variety: 'latin-america' },
    goals: ['meet-people']
  },
  detectIntent(ROSA_MESSAGE)
);

describe('preference filtering', () => {
  it('returns 3–5 matches with Rosa’s Spanish senior circle first', () => {
    const matches = findMatchingPrograms(communityPrograms, rosaPreferences);

    expect(matches.length).toBeGreaterThanOrEqual(3);
    expect(matches.length).toBeLessThanOrEqual(5);
    expect(matches[0].program.id).toBe('demo-casa-vecina');
    expect(matches[0].reasons).toContain('language-variety');
    expect(matches[0].program.audiences).toContain('older-adults');
  });

  it('only returns programs in the requested city', () => {
    const matches = findMatchingPrograms(communityPrograms, rosaPreferences);
    for (const match of matches) {
      expect(match.program.city).toBe('San Jose');
      expect(match.program.virtual).toBe(false);
    }
  });

  it('only returns programs that list the requested language (or leave it unconfirmed)', () => {
    const matches = findMatchingPrograms(communityPrograms, rosaPreferences);
    for (const match of matches) {
      const languages = match.program.languages;
      expect(languages === null || languages?.some((language) => language.code === 'es')).toBe(true);
    }
  });

  it('filters out programs that are not wheelchair accessible', () => {
    const preferences: ConnectorPreferences = {
      ...emptyPreferences,
      location: { city: 'San Jose', virtual: false },
      access: ['wheelchair']
    };
    const matches = findMatchingPrograms(communityPrograms, preferences, { limit: 20 });
    const ids = matches.map((match) => match.program.id);

    expect(ids).not.toContain('demo-manana-activa');
    expect(ids).not.toContain('demo-food-packing');
    expect(ids).toContain('demo-arte-accesible');

    const unknownAccessibility = matches.find((match) => match.program.id === 'demo-clube-brasileiro');
    expect(unknownAccessibility?.warnings).toContain('accessibility-unconfirmed');
  });

  it('honours a free-only request and drops unconfirmed costs', () => {
    const preferences: ConnectorPreferences = {
      ...emptyPreferences,
      location: { city: 'San Jose', virtual: false },
      freeOnly: true
    };
    const matches = findMatchingPrograms(communityPrograms, preferences, { limit: 20 });

    expect(matches.length).toBeGreaterThan(0);
    for (const match of matches) {
      expect(match.program.cost.free).toBe(true);
    }
    expect(matches.map((match) => match.program.id)).not.toContain('demo-clube-brasileiro');
  });

  it('honours time-of-day and interest preferences', () => {
    const preferences: ConnectorPreferences = {
      ...emptyPreferences,
      interests: ['arts'],
      time: 'weekday-afternoons'
    };
    const matches = findMatchingPrograms(communityPrograms, preferences);

    expect(matches.length).toBeGreaterThan(0);
    for (const match of matches) {
      expect(match.program.interests).toContain('arts');
      expect(match.program.time.timeSlots).toContain('weekday-afternoons');
    }
  });

  it('prefers virtual programs when the user asks for virtual', () => {
    const preferences: ConnectorPreferences = {
      ...emptyPreferences,
      location: { virtual: true }
    };
    const matches = findMatchingPrograms(communityPrograms, preferences);

    expect(matches.length).toBeGreaterThan(0);
    for (const match of matches) {
      expect(match.program.virtual).toBe(true);
    }
  });

  it('shows unconfirmed language support instead of guessing', () => {
    const preferences: ConnectorPreferences = {
      ...emptyPreferences,
      location: { city: 'Cupertino', virtual: false },
      language: { code: 'ko' }
    };
    const matches = findMatchingPrograms(communityPrograms, preferences);

    expect(matches).toHaveLength(1);
    expect(matches[0].program.organization).toBe('Cupertino Senior Center');
    expect(matches[0].warnings).toContain('language-unconfirmed');
  });
});

describe('missing or unreliable resource information', () => {
  it('lists every missing field for an incomplete record', () => {
    const program = communityPrograms.find((item) => item.id === 'demo-games-afternoon')!;
    const missing = getMissingFields(program);

    expect(missing).toEqual(
      expect.arrayContaining([
        'description',
        'schedule',
        'cost',
        'languages',
        'wheelchair',
        'transit',
        'contact',
        'officialSource',
        'lastVerified'
      ])
    );
  });

  it('never returns a resource marked inaccessible', () => {
    const matches = findMatchingPrograms(communityPrograms, emptyPreferences, { limit: 100 });
    expect(matches.map((match) => match.program.id)).not.toContain('demo-paused-social-hall');
  });

  it('flags outdated records and keeps them behind fresher ones', () => {
    const preferences: ConnectorPreferences = {
      ...emptyPreferences,
      location: { city: 'Sunnyvale', virtual: false },
      language: { code: 'es' }
    };
    const matches = findMatchingPrograms(communityPrograms, preferences, { limit: 20 });
    const outdated = matches.find((match) => match.program.id === 'demo-outdated-friendship-club');

    expect(outdated).toBeDefined();
    expect(outdated?.warnings).toContain('outdated');
    expect(outdated?.program.verification).toBe('outdated');
    expect(matches[0].program.id).not.toBe('demo-outdated-friendship-club');
  });

  it('detects stale verification dates', () => {
    expect(isStale('2023-04-11')).toBe(true);
    expect(isStale('2026-10-01')).toBe(false);
    expect(isStale(null)).toBe(false);
  });

  it('labels demonstration records and real organizations honestly', () => {
    const matches = findMatchingPrograms(communityPrograms, emptyPreferences, { limit: 100 });
    for (const match of matches) {
      if (match.program.recordType === 'demonstration') {
        expect(match.warnings).toContain('demo-record');
      } else {
        expect(match.warnings).toContain('real-org-details-unconfirmed');
      }
    }
  });
});

describe('no-result responses', () => {
  it('returns an empty list instead of inventing a match', () => {
    const preferences: ConnectorPreferences = {
      ...emptyPreferences,
      location: { city: 'Mountain View', virtual: false },
      interests: ['arts']
    };
    expect(findMatchingPrograms(communityPrograms, preferences)).toEqual([]);
  });

  it('returns nothing for an age group with no suitable programs', () => {
    const preferences: ConnectorPreferences = {
      ...emptyPreferences,
      ageGroup: 'under-18'
    };
    expect(findMatchingPrograms(communityPrograms, preferences)).toEqual([]);
  });
});
