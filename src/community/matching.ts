import { mockCommunityResources } from './data/communityResources.mock';
import type {
  Bi,
  CommunityMatch,
  CommunityProfile,
  CommunityResource,
  MatchOutcome,
  Relaxation,
  ResultFlag,
  UiLanguage
} from './types';

const DAY_MS = 24 * 60 * 60 * 1000;
/** Listings older than this are shown with a warning, never silently trusted. */
export const STALE_AFTER_DAYS = 365;

export const isResourceOutdated = (resource: CommunityResource, now: Date = new Date()): boolean => {
  if (resource.verification === 'outdated') return true;
  if (!resource.lastVerified) return false;
  const time = new Date(resource.lastVerified).getTime();
  if (Number.isNaN(time)) return false;
  return now.getTime() - time > STALE_AFTER_DAYS * DAY_MS;
};

export const isFreshnessUnknown = (resource: CommunityResource): boolean => !resource.lastVerified;

export interface MatchOptions {
  limit?: number;
  now?: Date;
  /** Hard "free only" filter, e.g. from a "can I afford it" question. */
  freeOnly?: boolean;
  resources?: CommunityResource[];
}

/**
 * Rank community options against a profile.
 *
 * Two constraints are hard: a virtual-only search, and listings explicitly
 * marked as *not* wheelchair accessible. Everything else is a preference.
 * If fewer than three options pass, the language requirement is loosened
 * before the function returns, and every loosened result carries a flag so
 * the card can say "not confirmed" instead of pretending.
 */
export const matchCommunityResources = (
  profile: CommunityProfile,
  options: MatchOptions = {}
): MatchOutcome => {
  const {
    limit = 5,
    now = new Date(),
    freeOnly = false,
    resources = mockCommunityResources
  } = options;

  const languageRequired =
    profile.language !== 'other' && profile.language !== 'en' ? profile.language : null;
  const wheelchairRequired = profile.access.includes('wheelchair');
  const virtualOnly = profile.location.kind === 'virtual' || profile.access.includes('virtual');

  const scoreOf = (resource: CommunityResource): number => {
    let score = 0;
    if (profile.intent && resource.intents.includes(profile.intent)) score += 5;
    score += profile.interests.filter((interest) => resource.interests.includes(interest)).length * 2;
    if (profile.language !== 'other' && resource.languages.includes(profile.language)) score += 3;
    if (profile.region !== 'no-preference' && resource.languageRegions.includes(profile.region)) score += 2;
    if (
      profile.ageGroup !== 'no-preference' &&
      (resource.ageFocus.includes(profile.ageGroup) || resource.ageFocus.includes('any-age'))
    ) {
      score += 2;
    }
    if (profile.location.kind === 'city') {
      if (resource.city.toLowerCase() === profile.location.value.trim().toLowerCase()) score += 4;
    }
    if (profile.location.kind === 'zip' && profile.location.value.trim()) {
      const zip = profile.location.value.trim();
      if (resource.zip === zip) score += 4;
      else if (resource.zip && resource.zip.slice(0, 3) === zip.slice(0, 3)) score += 2;
    }
    if (
      profile.timing !== 'anytime' &&
      (resource.timing.includes(profile.timing) || resource.timing.includes('anytime'))
    ) {
      score += 2;
    }
    if (wheelchairRequired && resource.accessibility.wheelchair === true) score += 3;
    if (
      (profile.access.includes('transit-nearby') || profile.access.includes('transportation-help')) &&
      resource.transportation
    ) {
      score += 2;
    }
    if (profile.access.includes('virtual') && resource.virtual) score += 3;
    if (profile.affordability && resource.costStatus === 'free') score += 4;
    if (wheelchairRequired && resource.accessibility.wheelchair === null) score -= 2;
    if (isResourceOutdated(resource, now)) score -= 2;
    return score;
  };

  const flagsFor = (resource: CommunityResource): ResultFlag[] => {
    const flags: ResultFlag[] = [];
    if (languageRequired && !resource.languages.includes(languageRequired)) {
      flags.push('language-not-confirmed');
    }
    if (wheelchairRequired && resource.accessibility.wheelchair === null) {
      flags.push('wheelchair-not-confirmed');
    }
    if (profile.affordability && resource.costStatus === 'unknown') {
      flags.push('cost-not-confirmed');
    }
    if (isResourceOutdated(resource, now)) flags.push('outdated');
    if (isFreshnessUnknown(resource)) flags.push('freshness-unknown');
    return flags;
  };

  const select = (relaxLanguage: boolean, allowUnconfirmedAccess: boolean): CommunityMatch[] =>
    resources
      .filter((resource) => {
        if (virtualOnly && !resource.virtual) return false;
        if (freeOnly && resource.costStatus !== 'free') return false;
        if (wheelchairRequired) {
          if (resource.accessibility.wheelchair === false) return false;
          if (!allowUnconfirmedAccess && resource.accessibility.wheelchair !== true) return false;
        }
        if (languageRequired && !relaxLanguage && !resource.languages.includes(languageRequired)) return false;
        return true;
      })
      .map((resource) => ({ resource, score: scoreOf(resource), flags: flagsFor(resource) }))
      .sort(
        (a, b) =>
          b.score - a.score || a.resource.organizationName.localeCompare(b.resource.organizationName)
      );

  let matches = select(false, false);
  const relaxed = new Set<Relaxation>();

  if (matches.length < 3 && wheelchairRequired) {
    const looseAccess = select(false, true);
    if (looseAccess.length > matches.length) {
      matches = looseAccess;
      relaxed.add('accessibility');
    }
  }

  if (matches.length < 3 && languageRequired) {
    const looseLanguage = select(true, wheelchairRequired || relaxed.has('accessibility'));
    if (looseLanguage.length > matches.length) {
      matches = looseLanguage;
      if (wheelchairRequired) relaxed.add('accessibility');
      relaxed.add('language');
    }
  }

  return { matches: matches.slice(0, limit), relaxed: Array.from(relaxed) };
};

export interface NoResultGuidance {
  title: Bi;
  body: Bi;
  suggestions: Bi[];
  humanPhone: string;
}

/** What to say when nothing matches, instead of an empty list. */
export const buildNoResultGuidance = (profile: CommunityProfile): NoResultGuidance => {
  const suggestions: Bi[] = [
    {
      en: 'Try a nearby city or a ZIP code instead of a specific neighbourhood.',
      es: 'Pruebe una ciudad cercana o un código postal en lugar de un barrio específico.'
    },
    {
      en: 'Include virtual options, which have no travel.',
      es: 'Incluya opciones virtuales, que no requieren viajar.'
    },
    {
      en: 'Call the organization and ask about access, language or cost — some details are not published.',
      es: 'Llame a la organización y pregunte por acceso, idioma o costo: algunos datos no están publicados.'
    }
  ];
  if (profile.access.includes('wheelchair')) {
    suggestions.push({
      en: 'Ask whether a venue can accommodate a wheelchair even when the listing does not say so.',
      es: 'Pregunte si el lugar puede recibir una silla de ruedas aunque el listado no lo indique.'
    });
  }

  return {
    title: {
      en: 'No options match every preference yet',
      es: 'Ninguna opción cumple todas sus preferencias todavía'
    },
    body: {
      en: 'Nothing in the current development data fits all of your choices. Change one preference, or talk with a person who can look further.',
      es: 'Nada en los datos de desarrollo actuales cumple todas sus elecciones. Cambie una preferencia o hable con una persona que pueda buscar más.'
    },
    suggestions,
    humanPhone: '211'
  };
};

/** A date the card can show honestly, or null when the source gave none. */
export const formatVerifiedDate = (iso: string | null, language: UiLanguage): string | null => {
  if (!iso) return null;
  const time = new Date(iso).getTime();
  if (Number.isNaN(time)) return null;
  return new Date(time).toLocaleDateString(language === 'en' ? 'en-US' : 'es-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
