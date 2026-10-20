import React, { useState, useEffect } from 'react';
import { DemonstrationResource, Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  BookmarkCheck, 
  Trash2, 
  FileText, 
  Printer, 
  Copy, 
  Check, 
  MapPin, 
  Phone,
  Sparkles
} from 'lucide-react';

interface SavedResourcesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  savedResources: DemonstrationResource[];
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
  onOpenInsights: (resource: DemonstrationResource) => void;
}

export const SavedResourcesDrawer: React.FC<SavedResourcesDrawerProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  savedResources,
  onRemoveSaved,
  onClearAll,
  onOpenInsights
}) => {
  const [copied, setCopied] = useState(false);
  const t = translations[currentLanguage];

  // Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyAll = () => {
    if (savedResources.length === 0) return;

    const content = [
      `WhatSack Saved Community Resource Plan (${savedResources.length} items)`,
      `Academic Demonstration Reference - Silicon Valley`,
      '=========================================',
      '',
      ...savedResources.map((r, i) => [
        `${i + 1}. ${r.title[currentLanguage]} (${r.costType})`,
        `   Org: ${r.organization[currentLanguage]}`,
        `   Location: ${r.location.addressSimulated}`,
        `   Transit: ${r.location.transitNote[currentLanguage]}`,
        `   Schedule: ${r.schedule[currentLanguage]}`,
        `   Phone (Simulated): ${r.contactSimulated.phone}`,
        `   Next Steps:`,
        ...r.nextStepInsight.actionItems.map((a) => `     - ${a.title[currentLanguage]}`),
        ''
      ].join('\n'))
    ].join('\n');

    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="saved-drawer-title"
    >
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l-2 border-slate-300 focus:outline-hidden">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-900 rounded-xl border border-emerald-300">
              <BookmarkCheck className="w-5 h-5 text-emerald-700" aria-hidden="true" />
            </div>
            <div>
              <h2 id="saved-drawer-title" className="font-extrabold text-base sm:text-lg text-slate-900">
                {t.savedDrawer.title}
              </h2>
              <span className="text-xs text-slate-700 font-bold">
                {savedResources.length} {currentLanguage === 'en' ? 'saved programs' : 'programas guardados'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600"
            aria-label={currentLanguage === 'en' ? 'Close saved programs drawer' : 'Cerrar panel de recursos guardados'}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {savedResources.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-2xl text-slate-500">
                📑
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                {t.savedDrawer.empty}
              </p>
            </div>
          ) : (
            savedResources.map((resource) => (
              <div
                key={resource.id}
                className="p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-400 shadow-2xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-950 border border-emerald-300">
                      {resource.costType}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveSaved(resource.id)}
                      className="text-slate-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
                      title={currentLanguage === 'en' ? `Remove ${resource.title[currentLanguage]}` : `Quitar ${resource.title[currentLanguage]}`}
                      aria-label={currentLanguage === 'en' ? `Remove ${resource.title[currentLanguage]}` : `Quitar ${resource.title[currentLanguage]}`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1">
                    {resource.title[currentLanguage]}
                  </h3>
                  <p className="text-xs text-slate-700 font-bold mb-3">
                    {resource.organization[currentLanguage]}
                  </p>

                  <div className="text-xs text-slate-700 space-y-1.5 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden="true" />
                      <span className="truncate font-medium">{resource.location.city} • {resource.location.addressSimulated}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-600 shrink-0" aria-hidden="true" />
                      <span className="font-medium">{resource.contactSimulated.phone}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onOpenInsights(resource);
                    onClose();
                  }}
                  className="w-full min-h-[42px] py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-extrabold text-xs rounded-xl border border-emerald-300 flex items-center justify-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-700"
                >
                  <FileText className="w-4 h-4 text-emerald-800" aria-hidden="true" />
                  <span>{t.resourceCard.viewInsights}</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedResources.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2.5">
            <button
              type="button"
              onClick={handleCopyAll}
              className="w-full min-h-[44px] py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-emerald-900"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-200" aria-hidden="true" />
                  <span>{t.insights.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>{currentLanguage === 'en' ? 'Copy Plan to Clipboard' : 'Copiar Plan al Portapapeles'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClearAll}
              className="w-full min-h-[40px] py-2 text-xs font-bold text-slate-600 hover:text-red-700 transition-colors"
            >
              {t.savedDrawer.clearAll}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
