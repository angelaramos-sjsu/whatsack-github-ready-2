import type { CommunityProfile } from './types';

/**
 * A blank profile. Language starts as "other / no preference" on purpose: the
 * guide never guesses a person's language or regional variety from their city
 * or the words they typed.
 */
export const createDefaultProfile = (): CommunityProfile => ({
  intent: null,
  interests: [],
  location: { kind: 'skip', value: '' },
  language: 'other',
  region: 'no-preference',
  access: [],
  timing: 'anytime',
  ageGroup: 'no-preference',
  affordability: false,
  prefersPhoneHelp: false,
  nervousAlone: false,
  wantsOrganizerFirst: false
});

/** True once there is something concrete to search with. */
export const hasSearchBasis = (profile: CommunityProfile): boolean =>
  profile.intent !== null && profile.location.kind !== 'skip';

export const mergeProfilePatch = (
  profile: CommunityProfile,
  patch: Partial<CommunityProfile>
): CommunityProfile => {
  const next: CommunityProfile = { ...profile, ...patch };
  if (patch.access) {
    next.access = Array.from(new Set([...profile.access, ...patch.access]));
  }
  if (patch.interests) {
    next.interests = Array.from(new Set([...profile.interests, ...patch.interests]));
  }
  return next;
};
