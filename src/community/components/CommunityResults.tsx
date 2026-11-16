import React from 'react';
import { AlertTriangle, Phone, SlidersHorizontal } from 'lucide-react';
import { buildNoResultGuidance } from '../matching';
import { copy, pick } from '../i18n';
import { CommunityResultCard } from './CommunityResultCard';
import type { CommunityProfile, MatchOutcome, UiLanguage } from '../types';

interface CommunityResultsProps {
  language: UiLanguage;
  profile: CommunityProfile;
  outcome: MatchOutcome;
  onEditPreferences: () => void;
  onSpeakToPerson: () => void;
}

export const CommunityResults: React.FC<CommunityResultsProps> = ({
  language,
  profile,
  outcome,
  onEditPreferences,
  onSpeakToPerson
}) => {
  const c = copy[language];
  const { matches, relaxed } = outcome;
  const guidance = buildNoResultGuidance(profile);

  return (
    <section aria-labelledby="community-results-heading" className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="community-results-heading" className="text-2xl font-extrabold tracking-[-0.03em] text-slate-900">
            {c.resultsHeading}
          </h2>
          <p className="mt-1 text-base text-slate-700">
            {matches.length > 0 ? c.resultsCount(matches.length) : c.resultsEmptyTitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onEditPreferences}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          {c.changePreferences}
        </button>
      </div>

      {(relaxed.includes('language') || relaxed.includes('accessibility')) && (
        <p className="flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-base text-slate-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>
            {relaxed.includes('language') ? c.relaxedLanguage : c.relaxedAccessibility}
          </span>
        </p>
      )}

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {matches.map((match) => (
            <CommunityResultCard
              key={match.resource.id}
              language={language}
              profile={profile}
              match={match}
              onEditPreferences={onEditPreferences}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-amber-300 bg-amber-50 p-5">
          <h3 className="text-lg font-extrabold text-slate-900">{pick(guidance.title, language)}</h3>
          <p className="mt-2 text-base text-slate-800">{pick(guidance.body, language)}</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-base text-slate-800">
            {guidance.suggestions.map((suggestion) => (
              <li key={suggestion.en}>{pick(suggestion, language)}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={onEditPreferences} className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              {c.changePreferences}
            </button>
            <button type="button" onClick={onSpeakToPerson} className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-emerald-700 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {c.speakToPerson}
            </button>
            <a href="tel:211" className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50">
              {c.call211}
            </a>
          </div>
        </div>
      )}

      <p className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
        {c.confirmNote}
      </p>
    </section>
  );
};
