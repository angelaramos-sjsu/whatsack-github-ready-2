import { describe, expect, it } from 'vitest';
import {
  answerCurrentQuestion,
  buildPreferences,
  createIntakeState,
  editQuestion,
  emptyPreferences,
  goBack,
  nextUsefulQuestion,
  restartIntake,
  skipCurrentQuestion
} from '../intake';

describe('conversational intake', () => {
  it('starts at the first question', () => {
    const state = createIntakeState();
    expect(state.currentQuestion).toBe(0);
    expect(state.completed).toBe(false);
    expect(state.answers).toEqual({});
  });

  it('stores one answer and advances one question at a time', () => {
    const state = createIntakeState();
    const next = answerCurrentQuestion(state, ['meet-people']);

    expect(next.answers.goals).toEqual(['meet-people']);
    expect(next.currentQuestion).toBe(1);
    expect(next.completed).toBe(false);
  });

  it('skips a question and records that it was skipped', () => {
    const state = answerCurrentQuestion(createIntakeState(), ['meet-people']);
    const skipped = skipCurrentQuestion(state);

    expect(skipped.skipped).toContain('interests');
    expect(skipped.answers.interests).toBeUndefined();
    expect(skipped.currentQuestion).toBe(2);
  });

  it('goes back to the previous question', () => {
    const state = answerCurrentQuestion(createIntakeState(), ['meet-people']);
    const back = goBack(state);
    expect(back.currentQuestion).toBe(0);
    expect(back.completed).toBe(false);
  });

  it('edits any earlier answer without losing the others', () => {
    let state = createIntakeState();
    state = answerCurrentQuestion(state, ['meet-people']);
    state = answerCurrentQuestion(state, ['arts', 'music']);
    state = answerCurrentQuestion(state, { city: 'San Jose', virtual: false });

    const edited = editQuestion(state, 'interests');
    expect(edited.currentQuestion).toBe(1);
    expect(edited.answers.goals).toEqual(['meet-people']);
    expect(edited.answers.interests).toEqual(['arts', 'music']);
    expect(edited.answers.location).toEqual({ city: 'San Jose', virtual: false });
  });

  it('restarts with empty answers', () => {
    let state = answerCurrentQuestion(createIntakeState(), ['meet-people']);
    state = answerCurrentQuestion(state, ['arts']);
    const restarted = restartIntake();

    expect(restarted.answers).toEqual({});
    expect(restarted.currentQuestion).toBe(0);
    expect(restarted.skipped).toEqual([]);
  });

  it('completes after the last question', () => {
    let state = createIntakeState();
    state = answerCurrentQuestion(state, ['meet-people']);
    state = skipCurrentQuestion(state);
    state = skipCurrentQuestion(state);
    state = skipCurrentQuestion(state);
    state = skipCurrentQuestion(state);
    state = skipCurrentQuestion(state);
    state = answerCurrentQuestion(state, 'show-results');

    expect(state.completed).toBe(true);
    expect(state.answers.nextStep).toBe('show-results');
  });

  it('builds preferences and treats “no preference” accessibility as empty', () => {
    const preferences = buildPreferences({
      goals: ['meet-people'],
      interests: ['arts'],
      location: { city: 'San Jose', virtual: false },
      language: { code: 'es', variety: 'latin-america' },
      access: ['none'],
      time: 'weekends'
    });

    expect(preferences.goals).toEqual(['meet-people']);
    expect(preferences.access).toEqual([]);
    expect(preferences.language).toEqual({ code: 'es', variety: 'latin-america' });
    expect(preferences.time).toBe('weekends');
  });

  it('keeps existing chat-derived flags when building preferences', () => {
    const preferences = buildPreferences(
      { goals: ['meet-people'] },
      { ...emptyPreferences, contactFirst: true, prefersPhone: true }
    );
    expect(preferences.contactFirst).toBe(true);
    expect(preferences.prefersPhone).toBe(true);
  });

  it('asks only for information that is still missing', () => {
    expect(nextUsefulQuestion(emptyPreferences)).toBe('goals');

    const known = {
      ...emptyPreferences,
      goals: ['meet-people' as const],
      interests: ['arts' as const],
      location: { city: 'San Jose', virtual: false }
    };
    expect(nextUsefulQuestion(known)).toBe('language');

    const complete = {
      ...known,
      language: { code: 'es' as const },
      access: ['wheelchair' as const],
      time: 'weekends' as const
    };
    expect(nextUsefulQuestion(complete)).toBeNull();
  });

  it('does not re-ask a question the user chose to skip', () => {
    const skipped = ['interests' as const];
    const preferences = {
      ...emptyPreferences,
      goals: ['meet-people' as const],
      location: { city: 'San Jose', virtual: false }
    };
    expect(nextUsefulQuestion(preferences, skipped)).toBe('language');
  });
});
