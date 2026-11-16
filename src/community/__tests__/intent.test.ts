import { describe, expect, it } from 'vitest';
import { detectAdaptiveSignals, detectCommunityIntent } from '../intent';
import type { CommunityIntentId } from '../types';

const intentCases: Array<[string, CommunityIntentId]> = [
  ['I want to meet new people near me.', 'meet-people'],
  ['Where can I find people who share my interests?', 'meet-people'],
  ["I'm new to the area. How can I get involved?", 'meet-people'],
  ['Are there free community events in my area?', 'community-events'],
  ['Are there local clubs or groups I can join?', 'clubs-groups'],
  ['Are there senior centers near me?', 'senior-activities'],
  ['Where can I meet people my age?', 'meet-people'],
  ['Are there daytime activities for retired people?', 'senior-activities'],
  ['Can someone help me register for a senior program?', 'register-help'],
  ['Are there Spanish-speaking community groups near me?', 'language-culture'],
  ['I want to meet people who speak Vietnamese.', 'language-culture'],
  ['Can I find activities where Portuguese is spoken?', 'language-culture'],
  ['Can you explain this event in Spanish from Mexico?', 'language-culture'],
  ['Are there wheelchair-accessible community activities?', 'accessibility'],
  ["I don't drive. What activities can I attend?", 'accessibility'],
  ['Are there virtual community groups?', 'accessibility'],
  ['Can I bring a caregiver or family member?', 'accessibility'],
  ['Where can I volunteer?', 'volunteering'],
  ['Are there volunteer opportunities for older adults?', 'volunteering'],
  ['Are there community gardens or neighborhood projects?', 'volunteering'],
  ['How do I sign up?', 'register-help'],
  ['Who can I call?', 'contact-organization'],
  ['Is this program free?', 'cost-question']
];

describe('detectCommunityIntent', () => {
  it.each(intentCases)('recognizes "%s" as %s', (question, expected) => {
    expect(detectCommunityIntent(question).intents).toContain(expected);
  });

  it('maps different phrasings of the same intent together', () => {
    const phrasings = [
      'Where can I volunteer?',
      'I want to do volunteer work',
      'Are there community gardens near me?',
      '¿Dónde puedo ser voluntario?',
      'Quiero ayudar en la comunidad'
    ];
    phrasings.forEach((question) => {
      expect(detectCommunityIntent(question).intents).toContain('volunteering');
    });
  });

  it('does not assume an older adult from a generic social request', () => {
    const result = detectCommunityIntent('I want to meet new people near me');
    expect(result.intents).toContain('meet-people');
    expect(result.intents).not.toContain('senior-activities');
  });

  it('picks up a stated language and regional variety', () => {
    const spanish = detectCommunityIntent('Can you explain this event in Spanish from Mexico?');
    expect(spanish.hints.language).toBe('es');
    expect(spanish.hints.region).toBe('mexico');

    const portuguese = detectCommunityIntent('I want to meet people who speak Portuguese from Brazil');
    expect(portuguese.hints.language).toBe('pt');
    expect(portuguese.hints.region).toBe('brazil');
  });

  it('never infers a language from a place name alone', () => {
    const result = detectCommunityIntent('Are there activities in San Jose?');
    expect(result.hints.language).toBeUndefined();
    expect(result.hints.region).toBeUndefined();
    expect(result.hints.city).toBe('san jose');
  });

  it('reads accessibility and transport signals', () => {
    const wheelchair = detectCommunityIntent('Are there wheelchair-accessible community activities?');
    expect(wheelchair.hints.wheelchair).toBe(true);

    const noDrive = detectCommunityIntent("I don't drive. What activities can I attend?");
    expect(noDrive.hints.noDrive).toBe(true);

    const virtual = detectCommunityIntent('Are there virtual community groups?');
    expect(virtual.hints.virtual).toBe(true);
  });

  it('handles unaccented Spanish as well as accented Spanish', () => {
    expect(detectCommunityIntent('Busco grupos donde hablen espanol').hints.language).toBe('es');
    expect(detectCommunityIntent('¿Hay centros para adultos mayores?').intents).toContain('senior-activities');
  });

  it('extracts a ZIP code without needing a street address', () => {
    expect(detectCommunityIntent('Are there clubs near 95116?').hints.zip).toBe('95116');
  });
});

describe('detectAdaptiveSignals', () => {
  it.each([
    ['I feel lonely during the week', 'lonely'],
    ['I want to meet people my age', 'same-age'],
    ["I don't speak much English", 'limited-english'],
    ["I don't drive", 'no-drive'],
    ["I'm nervous about attending alone", 'nervous-alone'],
    ["I don't know what interests me", 'unsure-interests'],
    ["I can't afford activities", 'cannot-afford'],
    ['I have trouble using websites', 'hard-to-use-websites']
  ] as const)('detects "%s" as %s', (text, signal) => {
    expect(detectAdaptiveSignals(text)).toContain(signal);
  });

  it('detects the Rosa persona signals from Spanish text', () => {
    const signals = detectAdaptiveSignals(
      'Me siento un poco sola durante la semana. Me gustaría encontrar actividades donde pueda conocer a otras personas que hablen español.'
    );
    expect(signals).toContain('lonely');
  });
});
