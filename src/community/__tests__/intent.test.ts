import { describe, expect, it } from 'vitest';
import { detectIntent, seedPreferencesFromIntent } from '../intent';
import { emptyPreferences } from '../intake';

const ROSA_MESSAGE =
  'Me siento un poco sola durante la semana. Me gustaría encontrar actividades donde pueda conocer a otras personas que hablen español.';

describe('intent recognition', () => {
  it('recognizes different phrasings of meeting new people', () => {
    const phrasings = [
      'I want to meet new people near me',
      'local clubs or groups I can join',
      "I'm new to the area",
      'Quiero conocer gente nueva cerca de mí'
    ];

    for (const phrasing of phrasings) {
      const intent = detectIntent(phrasing);
      expect(intent.intents).toContain('social');
      expect(intent.goals).toContain('meet-people');
    }
  });

  it('recognizes older-adult requests and registration help', () => {
    expect(detectIntent('senior centers near me').goals).toContain('senior-activities');
    expect(detectIntent('daytime activities for retired people').intents).toContain('older-adults');
    expect(detectIntent('can someone help me register').intents).toContain('contact');
    expect(detectIntent('centros para adultos mayores cerca de mí').goals).toContain(
      'senior-activities'
    );
  });

  it('detects an explicitly requested language and variety only when stated', () => {
    expect(detectIntent('Spanish-speaking community groups near me').language).toEqual({
      code: 'es',
      variety: null
    });
    expect(detectIntent('activities where Portuguese is spoken').language?.code).toBe('pt');
    expect(detectIntent('explain this event in Spanish from Mexico').language).toEqual({
      code: 'es',
      variety: 'mexico'
    });
    expect(detectIntent('Portuguese from Brazil, please').language).toEqual({
      code: 'pt',
      variety: 'brazil'
    });
  });

  it('never infers a variety from the city or a person’s background', () => {
    const intent = detectIntent('Vivo en San Jose y busco actividades en español');
    expect(intent.language?.code).toBe('es');
    expect(intent.language?.variety).toBeNull();
    expect(intent.location?.city).toBe('San Jose');
  });

  it('recognizes accessibility and transportation phrasings', () => {
    expect(detectIntent('wheelchair-accessible activities').access).toContain('wheelchair');
    expect(detectIntent('I do not drive').signals).toContain('no-drive');
    expect(detectIntent('virtual community groups').access).toContain('virtual');
    expect(detectIntent('can I bring a caregiver').intents).toContain('caregiver');
    expect(detectIntent('actividades accesibles en silla de ruedas').access).toContain('wheelchair');
  });

  it('recognizes volunteering requests', () => {
    expect(detectIntent('where can I volunteer').goals).toContain('volunteering');
    expect(detectIntent('community gardens near me').intents).toContain('volunteering');
    expect(detectIntent('¿dónde puedo ser voluntario?').intents).toContain('volunteering');
  });

  it('recognizes contact questions without turning them into a cost filter', () => {
    const signUp = detectIntent('how do I sign up');
    expect(signUp.intents).toContain('contact');

    const isFree = detectIntent('is this free');
    expect(isFree.intents).toContain('contact');
    expect(isFree.freeOnly).toBe(false);

    expect(detectIntent('who can I call').intents).toContain('contact');
    expect(detectIntent('someone in my preferred language').intents).toContain('contact');
  });

  it('treats affordability as a free-only preference', () => {
    expect(detectIntent('I can’t afford activities').freeOnly).toBe(true);
    expect(detectIntent('No puedo pagar mucho').signals).toContain('cost');
  });

  it('picks up Rosa’s language, loneliness and social goal', () => {
    const intent = detectIntent(ROSA_MESSAGE);
    expect(intent.detectedLanguage).toBe('es');
    expect(intent.language?.code).toBe('es');
    expect(intent.language?.variety).toBeNull();
    expect(intent.goals).toContain('meet-people');
    expect(intent.signals).toContain('loneliness');
    expect(intent.confidence).toBeGreaterThan(0.5);
  });

  it('does not treat “I don’t speak much English” as a request for English', () => {
    const intent = detectIntent("I don't speak much English and need help");
    expect(intent.language).toBeNull();
    expect(intent.signals).toContain('language-barrier');
  });

  it('surfaces the adaptive signals used for follow-up questions', () => {
    expect(detectIntent('I want to meet people my age').signals).toContain('age-peer');
    expect(detectIntent("I'm nervous about attending alone").signals).toContain('nervous-alone');
    expect(detectIntent("I don't know what interests me").signals).toContain('no-interests');
    expect(detectIntent('I have trouble using websites').signals).toContain('tech-trouble');
  });

  it('merges new information without overwriting known preferences', () => {
    const base = {
      ...emptyPreferences,
      language: { code: 'es' as const, variety: 'mexico' as const }
    };
    const merged = seedPreferencesFromIntent(base, detectIntent('I want to meet new people in San Jose'));

    expect(merged.language).toEqual({ code: 'es', variety: 'mexico' });
    expect(merged.location?.city).toBe('San Jose');
    expect(merged.goals).toContain('meet-people');
  });

  it('marks a nervous-alone user as preferring organizer contact first', () => {
    const merged = seedPreferencesFromIntent(
      emptyPreferences,
      detectIntent("I'm nervous about attending alone")
    );
    expect(merged.contactFirst).toBe(true);
  });
});
