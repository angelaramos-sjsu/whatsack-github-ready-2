import {
  ActivityInterest,
  CommunityProgram,
  ConnectorPreferences,
  MatchReason,
  MatchWarning,
  MissingFieldId,
  ProgramMatch
} from './types';

const MAX_RESULTS = 5;
const STALE_AFTER_MONTHS = 18;

function normalized(value: string | null | undefined): string {
  return (value ?? '').trim().toLowerCase();
}

function hasLanguage(program: CommunityProgram, code: string): boolean {
  return (program.languages ?? []).some((language) => language.code === code);
}

function hasVariety(program: CommunityProgram, code: string, variety: string): boolean {
  return (program.languages ?? []).some(
    (language) => language.code === code && language.variety === variety
  );
}

export function getMissingFields(program: CommunityProgram): MissingFieldId[] {
  const missing: MissingFieldId[] = [];
  if (!program.description) missing.push('description');
  if (!program.virtual && !program.city) missing.push('location');
  if (!program.time.days && !program.time.detail && !program.time.timeSlots) missing.push('schedule');
  if (program.cost.free === null && !program.cost.detail) missing.push('cost');
  if (!program.languages) missing.push('languages');
  if (program.accessibility.wheelchair === null) missing.push('wheelchair');
  if (program.accessibility.transit === null) missing.push('transit');
  if (program.accessibility.transportationAssistance === null) {
    missing.push('transportation-assistance');
  }
  if (!program.contact.phone && !program.contact.email && !program.contact.contactPerson) {
    missing.push('contact');
  }
  if (!program.officialSource) missing.push('officialSource');
  if (!program.lastVerified) missing.push('lastVerified');
  return missing;
}

export function isStale(lastVerified: string | null, now: Date = new Date()): boolean {
  if (!lastVerified) return false;
  const date = new Date(lastVerified);
  if (Number.isNaN(date.getTime())) return false;
  const months = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  return months > STALE_AFTER_MONTHS;
}

interface Candidate {
  score: number;
  reasons: MatchReason[];
  warnings: MatchWarning[];
}

function evaluate(program: CommunityProgram, preferences: ConnectorPreferences, now: Date): Candidate | null {
  if (program.verification === 'inaccessible') return null;

  const reasons: MatchReason[] = [];
  const warnings: MatchWarning[] = [];
  let score = 0;

  if (program.recordType === 'demonstration') warnings.push('demo-record');
  if (program.recordType === 'directory') warnings.push('real-org-details-unconfirmed');
  if (program.verification === 'outdated' || isStale(program.lastVerified, now)) {
    warnings.push('outdated');
    score -= 20;
  }

  // Location: city / ZIP, or virtual.
  const location = preferences.location;
  if (location) {
    if (location.virtual) {
      if (!program.virtual) return null;
      reasons.push('virtual');
      score += 25;
    } else if (location.city || location.zip) {
      if (program.virtual) return null;
      const cityOk = location.city ? normalized(program.city) === normalized(location.city) : false;
      const zipOk = location.zip ? normalized(program.zip) === normalized(location.zip) : false;
      if (!cityOk && !zipOk) return null;
      reasons.push('location');
      score += 30;
    }
  }

  // Language: exclude programs that publish a different language set.
  const language = preferences.language;
  if (language && !language.noPreference && language.code !== 'other') {
    if (!program.languages) {
      warnings.push('language-unconfirmed');
      score -= 4;
    } else if (!hasLanguage(program, language.code)) {
      return null;
    } else {
      reasons.push('language');
      score += 30;
      if (language.variety) {
        if (hasVariety(program, language.code, language.variety)) {
          reasons.push('language-variety');
          score += 15;
        } else if ((program.languages ?? []).some((item) => item.code === language.code && item.variety)) {
          warnings.push('variety-unconfirmed');
        }
      }
    }
  }

  // Accessibility and transportation needs.
  for (const need of preferences.access) {
    if (need === 'none') continue;
    if (need === 'virtual') {
      if (!program.virtual) return null;
      reasons.push('virtual');
      continue;
    }
    if (need === 'wheelchair') {
      if (program.accessibility.wheelchair === false) return null;
      if (program.accessibility.wheelchair === true) {
        reasons.push('wheelchair');
        score += 12;
      } else {
        warnings.push('accessibility-unconfirmed');
      }
    }
    if (need === 'transit') {
      if (program.accessibility.transit === false) return null;
      if (program.accessibility.transit === true) {
        reasons.push('transit');
        score += 8;
      } else {
        warnings.push('accessibility-unconfirmed');
      }
    }
    if (need === 'transportation-assistance') {
      if (program.accessibility.transportationAssistance === false) return null;
      if (program.accessibility.transportationAssistance === true) {
        reasons.push('transportation-assistance');
        score += 10;
      } else {
        warnings.push('accessibility-unconfirmed');
      }
    }
  }

  // Goals.
  if (preferences.goals.includes('senior-activities')) {
    if (!program.audiences.includes('older-adults')) return null;
    reasons.push('goal');
    score += 15;
  }
  if (preferences.goals.includes('volunteering') && !program.offersVolunteering) {
    return null;
  }
  const wantsSocial = preferences.goals.includes('meet-people') || preferences.goals.includes('clubs-groups');
  if (wantsSocial) {
    if (program.offersVolunteering && !preferences.goals.includes('volunteering')) score -= 8;
    const socialInterests: string[] = ['games', 'cultural', 'music', 'arts'];
    if (program.interests.some((interest) => socialInterests.includes(interest))) {
      score += 8;
    }
  }
  if (preferences.goals.includes('community-events') && program.interests.includes('cultural')) {
    score += 4;
  }

  // Interests (the "Other" option is a wildcard).
  const interests: ActivityInterest[] = preferences.interests.filter((interest) => interest !== 'other');
  if (interests.length > 0) {
    const overlap = program.interests.filter((interest) => interests.includes(interest));
    if (overlap.length === 0) return null;
    reasons.push('interest');
    score += Math.min(24, overlap.length * 12);
  }

  // Free-only requests must be confirmed free.
  if (preferences.freeOnly && program.cost.free !== true) return null;

  // Time of day.
  if (preferences.time && preferences.time !== 'anytime') {
    if (!program.time.timeSlots) {
      warnings.push('schedule-unconfirmed');
    } else if (!program.time.timeSlots.includes(preferences.time)) {
      return null;
    } else {
      reasons.push('time');
      score += 8;
    }
  }

  // Age group, only when the user explicitly picked one.
  if (preferences.ageGroup && preferences.ageGroup !== 'any') {
    const audienceForAge: Record<string, string[]> = {
      'under-18': [],
      '18-34': ['young-adults', 'all-ages'],
      '35-54': ['all-ages'],
      '55-64': ['older-adults', 'all-ages'],
      '65-plus': ['older-adults', 'all-ages']
    };
    const allowed = audienceForAge[preferences.ageGroup] ?? [];
    if (allowed.length === 0) return null;
    if (!program.audiences.some((audience) => allowed.includes(audience))) return null;
  }

  if (program.contact.phone && program.contact.phoneStatus === 'verified') {
    reasons.push('contact');
    score += 8;
  }
  if (program.contact.contactPerson) score += 4;
  if (program.cost.free === true) {
    reasons.push('cost');
    score += 6;
  }
  if (program.lastVerified && !isStale(program.lastVerified, now)) score += 4;

  return { score, reasons: Array.from(new Set(reasons)), warnings: Array.from(new Set(warnings)) };
}

export interface MatchOptions {
  limit?: number;
  now?: Date;
}

/** Rank and filter programs against the user's stated preferences. */
export function findMatchingPrograms(
  programs: CommunityProgram[],
  preferences: ConnectorPreferences,
  options: MatchOptions = {}
): ProgramMatch[] {
  const limit = options.limit ?? MAX_RESULTS;
  const now = options.now ?? new Date();

  const matches: ProgramMatch[] = [];
  for (const program of programs) {
    const candidate = evaluate(program, preferences, now);
    if (!candidate) continue;
    matches.push({
      program,
      score: candidate.score,
      reasons: candidate.reasons,
      warnings: candidate.warnings,
      missingFields: getMissingFields(program)
    });
  }

  matches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const aDate = a.program.lastVerified ? new Date(a.program.lastVerified).getTime() : 0;
    const bDate = b.program.lastVerified ? new Date(b.program.lastVerified).getTime() : 0;
    if (bDate !== aDate) return bDate - aDate;
    return a.program.organization.localeCompare(b.program.organization);
  });

  return matches.slice(0, limit);
}

export function matchCountLabel(count: number, language: 'en' | 'es'): string {
  if (language === 'en') {
    return `${count} ${count === 1 ? 'match' : 'matches'}`;
  }
  return `${count} ${count === 1 ? 'opción' : 'opciones'}`;
}
