import React from 'react';
import { LANGUAGE_OPTIONS } from '../../community/languages';
import { ConnectorLanguageCode, LanguagePreference, UiLanguage } from '../../community/types';
import { Globe2 } from 'lucide-react';

interface LanguageSelectorProps {
  value: LanguagePreference | null;
  onChange: (value: LanguagePreference | null) => void;
  uiLanguage: UiLanguage;
  idPrefix?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  uiLanguage,
  idPrefix = 'connector-language'
}) => {
  const currentOption = LANGUAGE_OPTIONS.find((option) => option.code === value?.code);
  const varieties = currentOption?.varieties ?? [];

  const handleCodeChange = (code: ConnectorLanguageCode) => {
    if (code === 'other') {
      onChange({ code: 'other', noPreference: true });
      return;
    }
    onChange({ code, variety: null });
  };

  return (
    <div className="space-y-3">
      <div>
        <label htmlFor={`${idPrefix}-code`} className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
          {uiLanguage === 'en' ? 'Preferred language' : 'Idioma preferido'}
        </label>
        <div className="relative">
          <Globe2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <select
            id={`${idPrefix}-code`}
            value={value?.noPreference ? 'other' : value?.code ?? ''}
            onChange={(event) => handleCodeChange(event.target.value as ConnectorLanguageCode)}
            className="w-full min-h-[52px] pl-10 pr-3 py-3 rounded-xl border-2 border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:border-purple-700"
          >
            <option value="" disabled>
              {uiLanguage === 'en' ? 'Choose a language' : 'Elija un idioma'}
            </option>
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.code} value={option.code}>
                {option.label[uiLanguage]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {varieties.length > 0 && (
        <div>
          <label htmlFor={`${idPrefix}-variety`} className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
            {uiLanguage === 'en' ? 'Regional variety (optional)' : 'Variedad regional (opcional)'}
          </label>
          <select
            id={`${idPrefix}-variety`}
            value={value?.variety ?? ''}
            onChange={(event) =>
              onChange({
                code: value?.code ?? 'es',
                variety: (event.target.value || null) as LanguagePreference['variety']
              })
            }
            className="w-full min-h-[52px] px-3 py-3 rounded-xl border-2 border-slate-300 bg-white text-sm font-semibold text-slate-900 focus:border-purple-700"
          >
            <option value="">{uiLanguage === 'en' ? 'No variety specified' : 'Sin variedad específica'}</option>
            {varieties.map((variety) => (
              <option key={variety.value} value={variety.value}>
                {variety.label[uiLanguage]}
              </option>
            ))}
          </select>
        </div>
      )}

      <p className="text-xs text-slate-600 font-medium">
        {uiLanguage === 'en'
          ? 'This is your choice. We never guess your language or variety from your name, ethnicity or city.'
          : 'Esta es su elección. Nunca adivinamos su idioma o variedad por su nombre, origen étnico o ciudad.'}
      </p>
    </div>
  );
};
