import { describe, expect, it } from 'vitest';
import { communityPrograms } from '../../data/communityPrograms';
import { composeAssistantReply, composeContactReply, composeWelcome } from '../assistant';
import { connectorCopy } from '../copy';
import { detectIntent, seedPreferencesFromIntent } from '../intent';
import { emptyPreferences } from '../intake';
import { languageLabel } from '../languages';
import { findMatchingPrograms } from '../match';
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

describe('language personalization', () => {
  it('labels Spanish regional varieties', () => {
    expect(languageLabel({ code: 'es', variety: 'latin-america' }, 'en')).toBe(
      'Spanish (Latin America)'
    );
    expect(languageLabel({ code: 'es', variety: 'latin-america' }, 'es')).toBe(
      'Español (Latinoamérica)'
    );
    expect(languageLabel({ code: 'pt', variety: 'brazil' }, 'en')).toBe('Portuguese (Brazil)');
  });

  it('explains Rosa’s options in Spanish', () => {
    const matches = findMatchingPrograms(communityPrograms, rosaPreferences);
    const reply = composeAssistantReply({
      preferences: rosaPreferences,
      intent: detectIntent(ROSA_MESSAGE),
      matches,
      language: 'es'
    });

    expect(reply.text).toContain('Entendí');
    expect(reply.text).toContain('Casa Vecina');
    expect(reply.text).toContain('Español (Latinoamérica)');
    expect(reply.chips).toContain('Hablar con una persona');
  });

  it('says so when automated explanations are unavailable for a language', () => {
    const preferences: ConnectorPreferences = {
      ...emptyPreferences,
      language: { code: 'zh-Hans' }
    };
    const reply = composeAssistantReply({ preferences, matches: null, language: 'en' });
    expect(reply.text).toContain(connectorCopy.en.notAvailableForLanguage);
  });

  it('writes the welcome message in the interface language', () => {
    expect(composeWelcome('es')).toContain('solo necesitamos');
    expect(composeWelcome('en')).toContain('only need');
  });
});

describe('assistant result explanations', () => {
  it('shows “Not confirmed.” for missing resource details', () => {
    const matches = findMatchingPrograms(communityPrograms, emptyPreferences, { limit: 100 });
    const incomplete = matches.find((match) => match.program.id === 'demo-games-afternoon')!;

    const reply = composeAssistantReply({
      preferences: emptyPreferences,
      matches: [incomplete],
      language: 'en'
    });

    expect(reply.text).toContain('Not confirmed.');
    expect(reply.text).toContain('Neighborhood Games Afternoon');
  });

  it('does not invent a result when the search is empty', () => {
    const reply = composeAssistantReply({
      preferences: emptyPreferences,
      matches: [],
      language: 'en'
    });

    expect(reply.text).toContain(connectorCopy.en.noResultsTitle);
    expect(reply.text).toContain('2-1-1');
    expect(reply.text).not.toContain('Casa Vecina');
  });

  it('never presents a demo phone as a dialable contact', () => {
    const matches = findMatchingPrograms(communityPrograms, rosaPreferences);
    const reply = composeContactReply(matches, 'en');

    expect(reply.text).toContain('Sample number — not a real phone line');
    expect(reply.text).not.toContain('tel:');
    expect(reply.text).toContain('2-1-1');
  });

  it('offers organizer contact first when the user is nervous about attending alone', () => {
    const preferences: ConnectorPreferences = { ...rosaPreferences, contactFirst: true };
    const matches = findMatchingPrograms(communityPrograms, preferences);
    const reply = composeAssistantReply({
      preferences,
      matches,
      language: 'en'
    });

    expect(reply.text).toContain(connectorCopy.en.contactFirstTitle);
    expect(reply.chips).toContain('Show me a phone number');
  });
});
