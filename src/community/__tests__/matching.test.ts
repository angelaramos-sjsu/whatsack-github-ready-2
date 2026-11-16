import { describe, expect, it } from 'vitest';
import { mockCommunityResources } from '../data/communityResources.mock';
import { matchCommunityResources } from '../matching';
import { createDefaultProfile, mergeProfilePatch } from '../profile';
import type { CommunityProfile } from '../types';

const profileFor = (patch: Partial<CommunityProfile>): CommunityProfile =>
  mergeProfilePatch(createDefaultProfile(), patch);

describe('matchCommunityResources', () => {
  it('returns between three and five options for a normal request', () => {
    const outcome = matchCommunityResources(
      profileFor({ intent: 'meet-people', location: { kind: 'city', value: 'San Jose' } })
    );
    expect(outcome.matches.length).toBeGreaterThanOrEqual(3);
    expect(outcome.matches.length).toBeLessThanOrEqual(5);
  });

  it('filters by a requested language without relaxing it when enough options exist', () => {
    const outcome = matchCommunityResources(
      profileFor({
        intent: 'meet-people',
        location: { kind: 'city', value: 'San Jose' },
        language: 'es'
      })
    );
    expect(outcome.matches.length).toBeGreaterThan(0);
    outcome.matches.forEach((match) => {
      expect(match.resource.languages).toContain('es');
      expect(match.flags).not.toContain('language-not-confirmed');
    });
    expect(outcome.relaxed).not.toContain('language');
  });

  it('honours a hard free-only filter', () => {
    const outcome = matchCommunityResources(
      profileFor({ intent: 'clubs-groups', location: { kind: 'city', value: 'San Jose' } }),
      { freeOnly: true }
    );
    expect(outcome.matches.length).toBeGreaterThan(0);
    outcome.matches.forEach((match) => {
      expect(match.resource.costStatus).toBe('free');
    });
  });

  it('ranks free options first when the person cannot afford activities', () => {
    const withAffordability = matchCommunityResources(
      profileFor({
        intent: 'clubs-groups',
        location: { kind: 'city', value: 'San Jose' },
        affordability: true
      })
    );
    expect(withAffordability.matches[0].resource.costStatus).toBe('free');
  });

  it('never returns a listing marked as not wheelchair accessible', () => {
    const outcome = matchCommunityResources(
      profileFor({
        intent: 'clubs-groups',
        location: { kind: 'city', value: 'San Jose' },
        access: ['wheelchair']
      })
    );
    expect(outcome.matches.length).toBeGreaterThan(0);
    outcome.matches.forEach((match) => {
      expect(match.resource.accessibility.wheelchair).not.toBe(false);
    });
  });

  it('marks unconfirmed wheelchair access instead of hiding it silently', () => {
    const outcome = matchCommunityResources(
      profileFor({
        intent: 'clubs-groups',
        location: { kind: 'city', value: 'San Jose' },
        access: ['wheelchair']
      })
    );
    outcome.matches
      .filter((match) => match.resource.accessibility.wheelchair === null)
      .forEach((match) => {
        expect(match.flags).toContain('wheelchair-not-confirmed');
      });
  });

  it('returns only virtual options for a virtual-only search', () => {
    const outcome = matchCommunityResources(
      profileFor({ intent: 'meet-people', location: { kind: 'virtual', value: 'Online' } })
    );
    expect(outcome.matches.length).toBeGreaterThan(0);
    outcome.matches.forEach((match) => {
      expect(match.resource.virtual).toBe(true);
    });
  });

  it('prefers older-adult programs for a senior activity request', () => {
    const outcome = matchCommunityResources(
      profileFor({
        intent: 'senior-activities',
        location: { kind: 'city', value: 'San Jose' },
        timing: 'weekday-morning'
      })
    );
    expect(outcome.matches[0].resource.ageFocus).toContain('older-adults');
  });

  it('keeps every listing inside the mock data set', () => {
    const outcome = matchCommunityResources(
      profileFor({ intent: 'meet-people', location: { kind: 'city', value: 'Sunnyvale' } })
    );
    const ids = new Set(mockCommunityResources.map((resource) => resource.id));
    outcome.matches.forEach((match) => expect(ids.has(match.resource.id)).toBe(true));
  });
});
