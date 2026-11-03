import React, { useState } from 'react';
import { CategoryId, Language } from '../types';
import { directoryEntries } from '../data/directory';
import { MapPin, ExternalLink, Building2, FileText } from 'lucide-react';
import { OhloneFinancialAidDialog } from './OhloneFinancialAidDialog';

interface CommunityDirectoryProps {
  currentLanguage: Language;
  selectedCategory: CategoryId | 'all';
  selectedCity: string;
  searchQuery: string;
}

const categoryLabels: Record<CategoryId, { en: string; es: string }> = {
  food: { en: 'Food', es: 'Alimentos' },
  'mental-health': { en: 'Mental Health', es: 'Salud Mental' },
  workforce: { en: 'Education & Workforce', es: 'Educación y Trabajo' },
  community: { en: 'Community Support', es: 'Apoyo Comunitario' }
};

const categoryBadgeClass: Record<CategoryId, string> = {
  food: 'bg-emerald-100 text-emerald-950 border-emerald-300',
  'mental-health': 'bg-purple-100 text-purple-950 border-purple-300',
  workforce: 'bg-indigo-100 text-indigo-950 border-indigo-300',
  community: 'bg-amber-100 text-amber-950 border-amber-300'
};

const displayAddress = (address: string, language: Language) => {
  if (/^\d/.test(address)) return address;
  if (address === 'California community colleges' || address === 'Participating community colleges') {
    return language === 'en' ? 'Participating California community colleges' : 'Colegios comunitarios participantes de California';
  }
  return address;
};

export const CommunityDirectory: React.FC<CommunityDirectoryProps> = ({
  currentLanguage,
  selectedCategory,
  selectedCity,
  searchQuery
}) => {
  const [isOhloneAidOpen, setIsOhloneAidOpen] = useState(false);
  const words = searchQuery.toLowerCase().trim().split(/\s+/).filter((w) => w.length > 2);

  const matches = directoryEntries.filter((entry) => {
    if (selectedCategory !== 'all' && entry.categoryId !== selectedCategory) return false;
    if (selectedCity !== 'all' && entry.city !== selectedCity) return false;
    if (words.length) {
      const haystack = [
        entry.name,
        entry.address,
        entry.city,
        categoryLabels[entry.categoryId].en,
        categoryLabels[entry.categoryId].es
      ].join(' ').toLowerCase();
      return words.some((word) => haystack.includes(word));
    }
    return true;
  });

  return (
    <section aria-labelledby="directory-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-slate-700" aria-hidden="true" />
            </div>
            <div>
              <h2 id="directory-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentLanguage === 'en' ? 'Community Resource Directory' : 'Directorio de Recursos Comunitarios'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                {currentLanguage === 'en'
                  ? 'Direct links to local organizations and public agencies. Visit each website for current programs and eligibility.'
                  : 'Enlaces directos a organizaciones locales y agencias públicas. Consulte cada sitio para programas y requisitos vigentes.'}
              </p>
            </div>
          </div>
          <span aria-live="polite" className="text-xs font-extrabold text-slate-800 bg-slate-100 border border-slate-300 rounded-xl px-3 py-1.5">
            {matches.length} {currentLanguage === 'en' ? 'listings' : 'registros'}
          </span>
        </div>

        {matches.length === 0 ? (
          <p className="text-sm text-slate-700 font-medium py-6 text-center">
            {currentLanguage === 'en'
              ? 'No directory listings match these filters yet.'
              : 'Ningún registro del directorio coincide con estos filtros.'}
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 list-none p-0 m-0">
            {matches.map((entry) => (
              <li key={entry.id} className="flex flex-col gap-2">
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col flex-1 rounded-2xl border-2 border-slate-200 hover:border-emerald-600 transition-colors p-4 bg-white"
                >
                  <span className={`self-start text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border mb-2 ${categoryBadgeClass[entry.categoryId]}`}>
                    {categoryLabels[entry.categoryId][currentLanguage]}
                  </span>
                  <span className="font-bold text-sm text-slate-900 leading-snug">{entry.name}</span>
                  <span className="flex items-start gap-1.5 text-xs text-slate-700 mt-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{displayAddress(entry.address, currentLanguage)}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 group-hover:text-emerald-950 mt-auto pt-3">
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    {currentLanguage === 'en' ? 'Visit website' : 'Visitar sitio web'}
                  </span>
                </a>
                {entry.id === 'dir-ohlone-college-24' && (
                  <button
                    type="button"
                    onClick={() => setIsOhloneAidOpen(true)}
                    aria-haspopup="dialog"
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-700 text-emerald-900 hover:bg-emerald-50 font-extrabold text-xs min-h-[44px] px-3 transition-colors focus-visible:ring-3 focus-visible:ring-emerald-950"
                  >
                    <FileText className="w-4 h-4" aria-hidden="true" />
                    {currentLanguage === 'en' ? 'Financial aid guide, contacts & hours' : 'Guía de ayuda financiera, contactos y horario'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {isOhloneAidOpen && (
        <OhloneFinancialAidDialog currentLanguage={currentLanguage} onClose={() => setIsOhloneAidOpen(false)} />
      )}
    </section>
  );
};
