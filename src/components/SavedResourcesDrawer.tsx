import React, { useState, useEffect, useRef } from 'react';
import { DemonstrationResource, Language } from '../types';
import { DirectoryEntry } from '../data/directory';
import type { SavedScriptedStep } from '../data/answers';
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
  savedDirectoryEntries?: DirectoryEntry[];
  onRemoveDirectoryEntry?: (id: string) => void;
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
  onOpenInsights: (resource: DemonstrationResource) => void;
  savedScriptedSteps: SavedScriptedStep[];
  completedScriptedIds: string[];
  onToggleScriptedStep: (id: string) => void;
  onRemoveScriptedStep: (id: string) => void;
  completedActionIds: string[];
  onToggleAction: (id: string) => void;
}

export const SavedResourcesDrawer: React.FC<SavedResourcesDrawerProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  savedResources,
  savedDirectoryEntries = [],
  onRemoveDirectoryEntry,
  onRemoveSaved,
  onClearAll,
  onOpenInsights,
  savedScriptedSteps,
  completedScriptedIds,
  onToggleScriptedStep,
  onRemoveScriptedStep,
  completedActionIds,
  onToggleAction
}) => {
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const t = translations[currentLanguage];
  const totalSaved = savedResources.length + savedDirectoryEntries.length + savedScriptedSteps.length;

  // Keyboard users start at the dialog close control.
  useEffect(() => { if (isOpen) closeButtonRef.current?.focus(); }, [isOpen]);

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
    if (totalSaved === 0) return;

    const content = [
      `WhatSack Saved Community Resource Plan (${totalSaved} items)`,
      `Academic Demonstration Reference - Silicon Valley`,
      ...savedScriptedSteps.map((item,i) => `${i+1}. [${completedScriptedIds.includes(item.id) ? 'X' : ' '}] ${item.title[currentLanguage]}: ${item.detail[currentLanguage]}`),
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
        ...r.nextStepInsight.actionItems.map((a) => `     - [${completedActionIds.includes(`${r.id}:${a.id}`) ? 'X' : ' '}] ${a.title[currentLanguage]}`),
        ''
      ].join('\n')),
      ...savedDirectoryEntries.map((entry, i) => [
        `${savedResources.length + i + 1}. ${entry.name}`,
        `   Address: ${entry.address}`,
        `   Website: ${entry.website}`,
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
                {currentLanguage === 'en' ? 'My Next Steps' : 'Mis Próximos Pasos'}
              </h2>
              <span className="text-xs text-slate-700 font-bold">
                {totalSaved} {currentLanguage === 'en' ? 'saved items' : 'elementos guardados'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            ref={closeButtonRef}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600"
            aria-label={currentLanguage === 'en' ? 'Close saved programs drawer' : 'Cerrar panel de recursos guardados'}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {totalSaved === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-2xl text-slate-500">
                📑
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-semibold">
                {currentLanguage === 'en' ? 'No steps or resources saved yet. Save a step from Ask WhatSack or a resource from Find Resources.' : 'Aún no hay pasos ni recursos guardados. Guarde un paso desde Preguntar a WhatSack o un recurso desde Buscar Recursos.'}
              </p>
            </div>
          ) : (
            <>
            {savedScriptedSteps.length > 0 && (
              <section aria-label={currentLanguage === 'en' ? 'Steps saved from Ask WhatSack' : 'Pasos guardados de Preguntar a WhatSack'} className="space-y-3">
                <h3 className="font-bold text-slate-900 text-base">{currentLanguage === 'en' ? 'Steps from Ask WhatSack' : 'Pasos de Preguntar a WhatSack'}</h3>
                {savedScriptedSteps.map((step) => (
                  <div key={step.id} className="p-4 rounded-xl border border-emerald-300 bg-emerald-50">
                    <label className="flex gap-3 items-start text-slate-900">
                      <input type="checkbox" checked={completedScriptedIds.includes(step.id)} onChange={() => onToggleScriptedStep(step.id)} className="w-5 h-5 mt-1 shrink-0 accent-emerald-700" />
                      <span>
                        <strong className={completedScriptedIds.includes(step.id) ? 'line-through' : ''}>{step.title[currentLanguage]}</strong>
                        <span className="block text-sm mt-1">{step.detail[currentLanguage]}</span>
                      </span>
                    </label>
                    <button type="button" onClick={() => onRemoveScriptedStep(step.id)} className="mt-2 text-sm min-h-[44px] text-emerald-900 underline">
                      {currentLanguage === 'en' ? 'Remove step' : 'Quitar paso'}
                    </button>
                  </div>
                ))}
              </section>
            )}
            {savedResources.map((resource) => (
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

                <fieldset className="border-t border-slate-200 mt-3 pt-3 mb-3">
                  <legend className="text-sm font-bold text-slate-900">{currentLanguage === 'en' ? 'Action steps (sample)' : 'Pasos (ejemplo)'}</legend>
                  {resource.nextStepInsight.actionItems.map((action) => (
                    <label key={action.id} className="flex gap-2 items-start py-2 text-sm text-slate-900">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 shrink-0 accent-emerald-700"
                        checked={completedActionIds.includes(`${resource.id}:${action.id}`)}
                        onChange={() => onToggleAction(`${resource.id}:${action.id}`)} />
                      <span>{action.title[currentLanguage]}</span>
                    </label>
                  ))}
                </fieldset>
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
            ))}

            {savedDirectoryEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-400 shadow-2xs transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-300">
                    {currentLanguage === 'en' ? 'Directory listing' : 'Registro del directorio'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveDirectoryEntry?.(entry.id)}
                    className="text-slate-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors"
                    title={currentLanguage === 'en' ? `Remove ${entry.name}` : `Quitar ${entry.name}`}
                    aria-label={currentLanguage === 'en' ? `Remove ${entry.name}` : `Quitar ${entry.name}`}
                  >
                    <Trash2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-1">
                  {entry.name}
                </h3>
                <p className="text-xs text-slate-700 mb-3">{entry.address}</p>

                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-900 underline"
                >
                  {currentLanguage === 'en' ? `Visit ${entry.name} website (opens new tab)` : `Visitar ${entry.name} (abre otra pestaña)`}
                </a>
              </div>
            ))}
            </>
          )}
        </div>

        {/* Drawer Footer */}
        {totalSaved > 0 && (
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
