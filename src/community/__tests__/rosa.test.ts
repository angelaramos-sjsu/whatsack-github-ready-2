import { describe, expect, it } from 'vitest';
import { applyAdaptiveSignals, buildAssistantReply } from '../adaptive';
import { detectAdaptiveSignals, detectCommunityIntent } from '../intent';
import { matchCommunityResources } from '../matching';
import { createDefaultProfile, hasSearchBasis, mergeProfilePatch } from '../profile';

const ROSA_SENTENCE =
  'Me siento un poco sola durante la semana. Me gustaría encontrar actividades donde pueda conocer a otras personas que hablen español.';

/**
 * Rosa Martinez: 72, Spanish-speaking, San Jose. She chooses Spanish (Latin
 * America) and describes feeling lonely during the week.
 */
const buildRosaState = () => {
  const intent = detectCommunityIntent(ROSA_SENTENCE);
  const signals = detectAdaptiveSignals(ROSA_SENTENCE);

  // Her own selections: Spanish (Latin America) and San Jose.
  const chosen = mergeProfilePatch(createDefaultProfile(), {
    language: 'es',
    region: 'latin-america',
    location: { kind: 'city', value: 'San Jose' }
  });

  const applied = applyAdaptiveSignals(chosen, signals);
  return { intent, signals, applied, profile: applied.profile };
};

describe('Rosa Martinez persona journey', () => {
  it('understands her language, area and wish to meet people', () => {
    const { intent, signals, profile } = buildRosaState();
    expect(intent.hints.language).toBe('es');
    expect(signals).toContain('lonely');
    expect(profile.language).toBe('es');
    expect(profile.region).toBe('latin-america');
    expect(profile.intent).toBe('meet-people');
    expect(hasSearchBasis(profile)).toBe(true);
  });

  it('finds Spanish-language options in San Jose', () => {
    const { profile } = buildRosaState();
    const outcome = matchCommunityResources(profile);

    expect(outcome.matches.length).toBeGreaterThanOrEqual(3);
    expect(outcome.matches.length).toBeLessThanOrEqual(5);
    expect(outcome.relaxed).not.toContain('language');
    outcome.matches.forEach((match) => {
      expect(match.resource.languages).toContain('es');
      expect(match.resource.programName.es.length).toBeGreaterThan(0);
      expect(match.resource.description.es.length).toBeGreaterThan(0);
    });
  });

  it('explains the options in Spanish and points to a person to call', () => {
    const { intent, applied, profile } = buildRosaState();
    const outcome = matchCommunityResources(profile);

    // Her activity interests are the one thing still unanswered.
    const withInterests = mergeProfilePatch(profile, { interests: ['games', 'music'] });
    const reply = buildAssistantReply({
      profile: withInterests,
      intents: intent.intents,
      notes: applied.notes,
      prompts: applied.prompts,
      hasResults: hasSearchBasis(withInterests),
      language: 'es'
    });

    expect(reply.text).toMatch(/Gracias/);
    expect(reply.text).toMatch(/opciones/i);
    expect(reply.quickReplies).toHaveLength(0);
    expect(outcome.matches[0].resource.contact.phone).toBeTruthy();
    expect(outcome.matches[0].resource.organizationName.length).toBeGreaterThan(0);
  });

  it('does not ask a question she has already answered', () => {
    const { profile } = buildRosaState();
    const next = applyAdaptiveSignals(profile, ['same-age']);
    // Her age group is still unknown, so this one follow-up is legitimate.
    expect(next.prompts.map((prompt) => prompt.signal)).toContain('same-age');

    // But loneliness is already handled: no repeated "how do you feel" prompt.
    expect(next.prompts.map((prompt) => prompt.signal)).not.toContain('lonely');
  });
});
