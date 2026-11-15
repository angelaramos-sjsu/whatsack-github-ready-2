import React, { useId, useState } from 'react';
import { ChevronDown, ChevronUp, Compass } from 'lucide-react';
import type { Language } from '../types';
import type { SupportAreaOption } from '../data/answers/crossCategoryDiscovery';

/**
 * User-led discovery only: no cross-category needs are assumed or inferred.
 * This section is intentionally collapsed until someone opts to explore.
 */
export const ExploreOtherSupport: React.FC<{
  areas: SupportAreaOption[];
  currentLanguage: Language;
  onSelect: (answerId: string, areaLabel: string) => void;
  disabled?: boolean;
}> = ({ areas, currentLanguage, onSelect, disabled = false }) => {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const isEn = currentLanguage === 'en';

  if (areas.length === 0) return null;

  return (
    <section className="mt-4 border-t border-slate-700/60 pt-3" aria-label={
      isEn ? 'Explore other WhatSack support' : 'Explorar otras áreas de apoyo de WhatSack'
    }>
      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
        <Compass aria-hidden="true" className="h-4 w-4" />
        <span>{isEn ? 'Explore other support' : 'Explora otros recursos de apoyo'}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">
        {isEn
          ? 'WhatSack also connects people with other community resources. Explore another area only if it would be useful to you.'
          : 'WhatSack también conecta a las personas con otros recursos comunitarios. Explora otra área solo si te resulta útil.'}
      </p>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        disabled={disabled}
        onClick={() => setExpanded((value) => !value)}
        className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-500 bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:border-emerald-300 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-wait disabled:opacity-60"
      >
        {isEn
          ? (expanded ? 'Hide other areas' : 'See other support areas')
          : (expanded ? 'Ocultar otras áreas' : 'Ver otras áreas de apoyo')}
        {expanded
          ? <ChevronUp aria-hidden="true" className="h-4 w-4" />
          : <ChevronDown aria-hidden="true" className="h-4 w-4" />}
      </button>
      <div id={panelId} hidden={!expanded}>
        {expanded && (
          <div className="mt-3">
            <p className="mb-2 text-sm text-slate-300">
              {isEn ? 'Choose an area to see an approved overview and official resources.' : 'Elige un área para ver información revisada y recursos oficiales.'}
            </p>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <button
                  type="button"
                  key={area.id}
                  disabled={disabled}
                  onClick={() => onSelect(area.answerId, area.label[currentLanguage])}
                  className="min-h-[44px] rounded-lg border border-emerald-500/70 bg-emerald-950/50 px-3 py-2.5 text-left text-sm font-semibold text-white hover:border-emerald-300 hover:bg-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-wait disabled:opacity-60"
                >
                  {area.label[currentLanguage]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
