import React from 'react';
import { DemonstrationResource, Language } from '../types';
import { translations } from '../data/translations';
import { 
  MapPin, 
  Clock, 
  Languages, 
  Bookmark, 
  BookmarkCheck, 
  FileText, 
  ShieldCheck, 
  Bus, 
  Sparkles, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

interface ResourceCardProps {
  resource: DemonstrationResource;
  currentLanguage: Language;
  onOpenInsights: (resource: DemonstrationResource) => void;
  isSaved: boolean;
  onToggleSave: (resourceId: string) => void;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  currentLanguage,
  onOpenInsights,
  isSaved,
  onToggleSave
}) => {
  const t = translations[currentLanguage];

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'food':
        return 'bg-emerald-100 text-emerald-950 border-emerald-300';
      case 'mental-health':
        return 'bg-purple-100 text-purple-950 border-purple-300';
      case 'workforce':
        return 'bg-indigo-100 text-indigo-950 border-indigo-300';
      case 'community':
        return 'bg-amber-100 text-amber-950 border-amber-300';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300';
    }
  };

  const getCostBadgeClass = (costType: string) => {
    switch (costType) {
      case 'Free':
      case 'No Cost for Youth':
        return 'bg-emerald-50 text-emerald-900 border-emerald-300 font-extrabold';
      case 'Sliding Scale':
        return 'bg-blue-50 text-blue-900 border-blue-300 font-extrabold';
      default:
        return 'bg-amber-50 text-amber-900 border-amber-300 font-extrabold';
    }
  };

  const resourceTitle = resource.title[currentLanguage];
  const resourceOrg = resource.organization[currentLanguage];

  return (
    <article 
      aria-labelledby={`resource-title-${resource.id}`}
      className="bg-white rounded-3xl border-2 border-slate-200 hover:border-emerald-600 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden"
    >
      {/* Top Academic Record Indicator */}
      <div className="px-5 py-2 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between text-xs text-slate-700">
        <div className="flex items-center gap-1.5 font-bold">
          <Info className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
          <span>{currentLanguage === 'en' ? resource.officialUrl ? 'Source-linked training program' : 'Demonstration record' : resource.officialUrl ? 'Programa con fuente oficial' : 'Registro de demostración'}</span>
        </div>
        <span className="font-mono text-[11px] font-bold text-slate-600">
          {resource.location.city}
        </span>
      </div>

      {/* Main Body */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Badges & Save Action */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-extrabold px-3 py-1 rounded-lg border ${getCategoryBadgeClass(resource.categoryId)}`}>
              {t.categories[
                resource.categoryId === 'mental-health' 
                  ? 'mentalHealth' 
                  : resource.categoryId
              ] || resource.categoryId}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${getCostBadgeClass(resource.costType)}`}>
              {resource.costType}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onToggleSave(resource.id)}
            className={`p-2.5 rounded-xl transition-all border min-w-[44px] min-h-[44px] flex items-center justify-center ${
              isSaved
                ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-300'
            }`}
            title={isSaved ? `${t.resourceCard.saved}: ${resourceTitle}` : `${t.resourceCard.save}: ${resourceTitle}`}
            aria-label={isSaved ? `${t.resourceCard.saved}: ${resourceTitle}` : `${t.resourceCard.save}: ${resourceTitle}`}
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-emerald-700" aria-hidden="true" />
            ) : (
              <Bookmark className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Title & Organization */}
        <h3 id={`resource-title-${resource.id}`} className="font-extrabold text-lg text-slate-900 leading-snug mb-1">
          {resourceTitle}
        </h3>
        <p className="text-xs sm:text-sm font-bold text-slate-700 mb-3">
          {resourceOrg}
        </p>

        {/* Description (high-contrast text, clear line-height) */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
          {resource.description[currentLanguage]}
        </p>

        {/* Location & Transit Grid */}
        <div className="space-y-2 text-xs text-slate-800 mb-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="font-bold text-slate-900">{resource.location.city}, {resource.location.county}</span>
              <p className="text-xs text-slate-700 flex items-center gap-1.5 mt-0.5">
                <Bus className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden="true" />
                <span>{resource.location.transitNote[currentLanguage]}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-1 border-t border-slate-200/80">
            <Clock className="w-4 h-4 text-slate-600 shrink-0" aria-hidden="true" />
            <span className="font-medium text-slate-800">{resource.schedule[currentLanguage]}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Languages className="w-4 h-4 text-slate-600 shrink-0" aria-hidden="true" />
            <span className="font-medium text-slate-800">{resource.languagesSupported.join(', ')}</span>
          </div>
        </div>

        {/* No-ID & Confidential Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          {resource.noIdRequired && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-950 border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              {t.resourceCard.noIdBadge}
            </span>
          )}
          {resource.confidential && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-950 border border-blue-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
              {t.resourceCard.confidentialBadge}
            </span>
          )}
          <span className="text-xs text-slate-700 font-semibold ml-auto">
            {resource.officialUrl ? (currentLanguage === 'en' ? 'Confirm current details' : 'Confirme detalles actuales') : resource.nextStepInsight.confidenceRating + '% prototype match'}
          </span>
        </div>

        {/* NextStep Insight Preview Card */}
        <div className="mt-auto p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-950 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-700" aria-hidden="true" />
            <span>{t.insights.whyRecommended}</span>
          </div>
          <p className="text-xs text-emerald-950 leading-relaxed font-medium line-clamp-2">
            {resource.nextStepInsight.explanation[currentLanguage]}
          </p>
        </div>
      </div>

      {resource.officialUrl && (
        <div className="px-4 pt-3 bg-slate-50 border-t border-slate-200">
          <a href={resource.officialUrl} target="_blank" rel="noopener noreferrer"
            className="block rounded-xl border border-indigo-300 bg-white p-3 text-center text-sm font-bold text-indigo-800 hover:bg-indigo-50 hover:border-indigo-600">
            {currentLanguage === 'en' ? 'Official program information' : 'Información oficial del programa'} ↗
          </a>
        </div>
      )}

      {/* Primary Action Button (Generous touch target, high contrast) */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <button
          type="button"
          onClick={() => onOpenInsights(resource)}
          className="w-full min-h-[46px] py-3 px-5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-900"
          aria-label={`${t.resourceCard.viewInsights} for ${resourceTitle}`}
        >
          <FileText className="w-4 h-4" aria-hidden="true" />
          <span>{t.resourceCard.viewInsights}</span>
        </button>
      </div>
    </article>
  );
};
