import React from 'react';
import { CommunityProgram, UiLanguage } from '../../community/types';
import { connectorCopy } from '../../community/copy';
import { ExternalLink, Phone, SlidersHorizontal, FileText, PhoneOff } from 'lucide-react';

interface ContactActionsProps {
  program: CommunityProgram;
  uiLanguage: UiLanguage;
  detailsOpen: boolean;
  detailsId?: string;
  onToggleDetails: () => void;
  onChangePreferences: () => void;
}

export const ContactActions: React.FC<ContactActionsProps> = ({
  program,
  uiLanguage,
  detailsOpen,
  detailsId,
  onToggleDetails,
  onChangePreferences
}) => {
  const c = connectorCopy[uiLanguage];
  const verifiedPhone = program.contact.phone && program.contact.phoneStatus === 'verified';
  const demoPhone = program.contact.phone && program.contact.phoneStatus === 'demo';

  return (
    <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-wrap items-center gap-2">
        {program.officialSource ? (
          <a
            href={program.officialSource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 border-purple-700 px-3 py-2 text-xs font-extrabold text-purple-900 hover:bg-purple-50"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span>{c.viewSource}</span>
            <span className="sr-only">({program.organization})</span>
          </a>
        ) : (
          <span className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-3 py-2 text-xs font-bold text-slate-700">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span>
              {c.source}: {c.notConfirmed}
            </span>
          </span>
        )}

        {verifiedPhone ? (
          <a
            href={`tel:${program.contact.phone?.replace(/[^0-9+]/g, '')}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-purple-700 px-3 py-2 text-xs font-extrabold text-white hover:bg-purple-800"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>
              {c.call} {program.contact.phone}
            </span>
          </a>
        ) : demoPhone ? (
          <span className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-950">
            <PhoneOff className="h-4 w-4" aria-hidden="true" />
            <span>
              {program.contact.phone} — {c.samplePhone}
            </span>
          </span>
        ) : (
          <span className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700">
            <PhoneOff className="h-4 w-4" aria-hidden="true" />
            <span>{c.noVerifiedPhone}</span>
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onToggleDetails}
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-3 py-2 text-xs font-extrabold text-slate-900 hover:bg-slate-100"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>{detailsOpen ? c.hideDetails : c.reviewDetails}</span>
        </button>
        <button
          type="button"
          onClick={onChangePreferences}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl px-3 py-2 text-xs font-extrabold text-slate-800 underline hover:text-purple-900"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          <span>{c.changePreferences}</span>
        </button>
      </div>

      <p className="sr-only">
        {program.contact.contactPerson ? program.contact.contactPerson : ''}
        {program.contact.email ? program.contact.email : ''}
      </p>
    </div>
  );
};
