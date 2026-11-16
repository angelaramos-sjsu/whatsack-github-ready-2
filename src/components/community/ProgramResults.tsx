import React, { useState } from 'react';
import { connectorCopy } from '../../community/copy';
import { ProgramMatch, UiLanguage } from '../../community/types';
import { ProgramCard } from './ProgramCard';
import { Phone, SlidersHorizontal, SearchX } from 'lucide-react';

interface ProgramResultsProps {
  matches: ProgramMatch[];
  hasSearched: boolean;
  uiLanguage: UiLanguage;
  onChangePreferences: () => void;
  onTalkToPerson: () => void;
}

export const ProgramResults: React.FC<ProgramResultsProps> = ({
  matches,
  hasSearched,
  uiLanguage,
  onChangePreferences,
  onTalkToPerson
}) => {
  const c = connectorCopy[uiLanguage];
  const [openDetailsId, setOpenDetailsId] = useState<string | null>(null);

  return (
    <section aria-labelledby="connector-results-heading" className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="connector-results-heading" className="text-xl font-extrabold tracking-tight text-slate-900">
            {c.resultsTitle}
          </h2>
          <p className="mt-1 max-w-2xl text-sm font-medium text-slate-700">{c.resultsSubtitle}</p>
        </div>
        <span aria-live="polite" className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-extrabold text-slate-900">
          {matches.length} {c.matchesFound}
        </span>
      </div>

      {hasSearched && matches.length === 0 && (
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
              <SearchX className="h-6 w-6 text-slate-700" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">{c.noResultsTitle}</h3>
              <p className="mt-1 text-sm font-medium text-slate-700">{c.noResultsBody}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-800">
                {c.noResultsTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onChangePreferences}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-purple-700 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-purple-800"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              {c.changePreferences}
            </button>
            <button
              type="button"
              onClick={onTalkToPerson}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-4 py-2.5 text-sm font-extrabold text-slate-900 hover:bg-slate-100"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {c.talkToPerson}
            </button>
          </div>
        </div>
      )}

      {hasSearched && matches.length > 0 && (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {matches.map((match) => (
            <ProgramCard
              key={match.program.id}
              match={match}
              uiLanguage={uiLanguage}
              detailsOpen={openDetailsId === match.program.id}
              onToggleDetails={() =>
                setOpenDetailsId((current) => (current === match.program.id ? null : match.program.id))
              }
              onChangePreferences={onChangePreferences}
            />
          ))}
        </div>
      )}

      {!hasSearched && (
        <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-sm font-medium text-slate-700">
          {uiLanguage === 'en'
            ? 'Answer one or two questions, or type what you are looking for, and matches will appear here.'
            : 'Responda una o dos preguntas, o escriba lo que busca, y las opciones aparecerán aquí.'}
        </p>
      )}
    </section>
  );
};
