import React from 'react';
import {
  copy,
  languageLabels,
  regionLabels,
  regionOptionsFor
} from '../i18n';
import type {
  CommunityLanguageCode,
  RegionalVariety,
  UiLanguage
} from '../types';

interface LanguageSelectorProps {
  language: UiLanguage;
  value: CommunityLanguageCode;
  region: RegionalVariety;
  onChange: (value: CommunityLanguageCode) => void;
  onRegionChange: (region: RegionalVariety) => void;
  /** Compact styling for the always-visible preferences bar. */
  compact?: boolean;
}

const languageOrder: CommunityLanguageCode[] = [
  'en',
  'es',
  'pt',
  'zh-Hans',
  'zh-Hant',
  'vi',
  'tl',
  'ko',
  'other'
];

/**
 * Language preference plus regional variety.
 *
 * The variety select only appears for Spanish and Portuguese, and only because
 * the person chose that language — it is never inferred for them.
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  value,
  region,
  onChange,
  onRegionChange,
  compact = false
}) => {
  const c = copy[language];
  const regions = regionOptionsFor(value);
  const labelClass = compact ? 'block text-xs font-bold text-slate-700' : 'block text-base font-bold text-slate-900';
  const selectClass =
    'mt-1 w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-emerald-700 focus:outline-none';

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={compact ? 'community-language-compact' : 'community-language'} className={labelClass}>
          {c.languageLabel}
        </label>
        <select
          id={compact ? 'community-language-compact' : 'community-language'}
          value={value}
          onChange={(event) => {
            const next = event.target.value as CommunityLanguageCode;
            onChange(next);
            if (regionOptionsFor(next).length === 0) onRegionChange('no-preference');
          }}
          className={selectClass}
        >
          {languageOrder.map((code) => (
            <option key={code} value={code}>
              {languageLabels[code][language]}
            </option>
          ))}
        </select>
      </div>

      {regions.length > 0 && (
        <div>
          <label htmlFor={compact ? 'community-region-compact' : 'community-region'} className={labelClass}>
            {c.regionLabel}
          </label>
          <select
            id={compact ? 'community-region-compact' : 'community-region'}
            value={region}
            onChange={(event) => onRegionChange(event.target.value as RegionalVariety)}
            className={selectClass}
            aria-describedby="community-region-hint"
          >
            {regions.map((option) => (
              <option key={option} value={option}>
                {regionLabels[option][language]}
              </option>
            ))}
          </select>
          <p id="community-region-hint" className="mt-1 text-sm text-slate-600">
            {c.regionHint}
          </p>
        </div>
      )}
    </div>
  );
};
