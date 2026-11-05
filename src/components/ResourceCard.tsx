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
  CheckCircle2
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

  const resourceTitle = resource.title[currentLanguage];
  const resourceOrg = resource.organization[currentLanguage];

  return (
    <article
      aria-labelledby={`resource-title-${resource.id}`}
      className="qc-card flex flex-col justify-between overflow-hidden"
    >
      {/* Academic record indicator */}
      <div className="flex items-center justify-between gap-3 border-b border-[#ece9f7] px-5 py-2.5 text-[12px] uppercase tracking-[0.1em] text-[#6b6880]">
        <span>{currentLanguage === 'en' ? 'Verified Demonstration Record' : 'Registro de Demostración Verificado'}</span>
        <span>{resource.location.city}</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="qc-chip">
              {t.categories[
                resource.categoryId === 'mental-health'
                  ? 'mentalHealth'
                  : resource.categoryId
              ] || resource.categoryId}
            </span>
            <span className="text-[12px] tracking-[0.02em] text-[#6b6880]">{resource.costType}</span>
          </div>

          <button
            type="button"
            onClick={() => onToggleSave(resource.id)}
            className="min-h-0 rounded-lg p-2 text-[#8a879f] transition-colors hover:bg-[#F3F0FF] hover:text-[#4C1D95]"
            title={isSaved ? `${t.resourceCard.saved}: ${resourceTitle}` : `${t.resourceCard.save}: ${resourceTitle}`}
            aria-label={isSaved ? `${t.resourceCard.saved}: ${resourceTitle}` : `${t.resourceCard.save}: ${resourceTitle}`}
            aria-pressed={isSaved}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-[#4C1D95]" aria-hidden="true" />
            ) : (
              <Bookmark className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <h3
          id={`resource-title-${resource.id}`}
          className="text-[20px] font-medium leading-snug tracking-[-0.02em] text-[#1A1A24]"
        >
          {resourceTitle}
        </h3>
        <p className="mt-1 text-[13px] text-[#5a5870]">{resourceOrg}</p>

        <p className="mt-4 text-[14px] leading-relaxed text-[#5a5870]">
          {resource.description[currentLanguage]}
        </p>

        <div className="mt-5 space-y-2 border-t border-[#f0eef8] pt-4 text-[13px] text-[#5a5870]">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#8a879f]" aria-hidden="true" />
            <div>
              <span className="text-[#1A1A24]">{resource.location.city}, {resource.location.county}</span>
              <p className="mt-0.5 flex items-start gap-1.5">
                <Bus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8a879f]" aria-hidden="true" />
                <span>{resource.location.transitNote[currentLanguage]}</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#8a879f]" aria-hidden="true" />
            <span>{resource.schedule[currentLanguage]}</span>
          </div>

          <div className="flex items-start gap-2">
            <Languages className="mt-0.5 h-4 w-4 shrink-0 text-[#8a879f]" aria-hidden="true" />
            <span>{resource.languagesSupported.join(', ')}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {resource.noIdRequired && (
            <span className="qc-chip">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              {t.resourceCard.noIdBadge}
            </span>
          )}
          {resource.confidential && (
            <span className="qc-chip">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {t.resourceCard.confidentialBadge}
            </span>
          )}
          <span className="ml-auto text-[13px] text-[#6b6880]">
            {resource.nextStepInsight.confidenceRating}% match
          </span>
        </div>

        <div className="mt-5 rounded-xl border border-[#ece9f7] bg-[#FAF9FF] p-4">
          <div className="qc-eyebrow">{t.insights.whyRecommended}</div>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#5a5870]">
            {resource.nextStepInsight.explanation[currentLanguage]}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenInsights(resource)}
          className="qc-btn-sm mt-5 flex w-full items-center justify-center gap-2"
          aria-label={`${t.resourceCard.viewInsights} for ${resourceTitle}`}
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          <span>{t.resourceCard.viewInsights}</span>
        </button>
      </div>
    </article>
  );
};
