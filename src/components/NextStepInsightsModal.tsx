import React, { useState, useEffect } from 'react';
import { DemonstrationResource, Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Sparkles, 
  CheckSquare, 
  Square, 
  FileCheck, 
  ShieldAlert, 
  ExternalLink, 
  Printer, 
  Copy, 
  Check, 
  Clock, 
  Accessibility, 
  HelpCircle, 
  Phone,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NextStepInsightsModalProps {
  resource: DemonstrationResource | null;
  currentLanguage: Language;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const NextStepInsightsModal: React.FC<NextStepInsightsModalProps> = ({
  resource,
  currentLanguage,
  onClose,
  isSaved,
  onToggleSave
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!resource) return null;

  const t = translations[currentLanguage];
  const insight = resource.nextStepInsight;
  const actionItems = insight.actionItems;

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = { ...prev, [stepId]: !prev[stepId] };
      
      // Check if all steps are completed
      const total = actionItems.length;
      const completedCount = Object.values(next).filter(Boolean).length;
      if (completedCount === total && total > 0) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      return next;
    });
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const progressPercent = actionItems.length > 0 
    ? Math.round((completedCount / actionItems.length) * 100) 
    : 0;

  const handleCopyChecklist = () => {
    const lines = [
      `WhatSack NextStep Checklist: ${resource.title[currentLanguage]}`,
      `Location: ${resource.location.addressSimulated}`,
      '',
      'DOCUMENTS NEEDED:',
      ...insight.documentsNeeded.map((d) => `- ${d[currentLanguage]}`),
      '',
      'ACTION STEPS:',
      ...actionItems.map((a, i) => `${i + 1}. [${completedSteps[a.id] ? 'X' : ' '}] ${a.title[currentLanguage]}: ${a.description[currentLanguage]}`),
      '',
      `Simulated Intake: ${resource.contactSimulated.phone} | ${resource.contactSimulated.intakeMethod[currentLanguage]}`
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="insights-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-slate-300 relative flex flex-col focus:outline-hidden">
        {/* Top Header */}
        <div className="p-6 sm:p-7 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-t-3xl relative">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.insights.title}</span>
                </span>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-100 border border-emerald-400/30">
                  {resource.officialUrl ? (currentLanguage === 'en' ? 'Check current program details' : 'Confirme detalles del programa') : insight.confidenceRating + '% prototype match'}
                </span>
              </div>
              <h2 id="insights-modal-title" className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {resource.title[currentLanguage]}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 font-bold mt-1">
                {resource.organization[currentLanguage]}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onToggleSave(resource.id)}
                className="p-2.5 text-white/90 hover:text-white rounded-xl hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white"
                title={isSaved ? `${t.resourceCard.saved}: ${resource.title[currentLanguage]}` : `${t.resourceCard.save}: ${resource.title[currentLanguage]}`}
                aria-label={isSaved ? `${t.resourceCard.saved}: ${resource.title[currentLanguage]}` : `${t.resourceCard.save}: ${resource.title[currentLanguage]}`}
              >
                {isSaved ? (
                  <BookmarkCheck className="w-5 h-5 text-emerald-300" aria-hidden="true" />
                ) : (
                  <Bookmark className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2.5 text-white/90 hover:text-white rounded-xl hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white"
                aria-label={currentLanguage === 'en' ? 'Close insights dialog' : 'Cerrar ventana de detalles'}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Explanation: Why Recommended */}
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>{t.insights.whyRecommended}</span>
            </h3>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-semibold">
              {insight.explanation[currentLanguage]}
            </p>
          </div>

          {/* Action Steps Checklist */}
          <fieldset className="border-0 p-0 m-0">
            <legend className="sr-only">{t.insights.actionChecklist}</legend>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                  <span>{t.insights.actionChecklist}</span>
                </h3>
                <span className="text-xs font-bold text-slate-700">
                  {completedCount} of {actionItems.length} {currentLanguage === 'en' ? 'steps completed' : 'pasos completados'}
                </span>
              </div>

              {/* Progress Bar */}
              <div 
                className="w-32 bg-slate-200 rounded-full h-3 overflow-hidden border border-slate-300"
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={currentLanguage === 'en' ? 'Checklist completion progress' : 'Progreso de la lista de pasos'}
              >
                <div
                  className="bg-emerald-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {actionItems.map((item, idx) => {
                const isDone = !!completedSteps[item.id];

                return (
                  <label
                    key={item.id}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer min-h-[56px] ${
                      isDone
                        ? 'bg-emerald-50/80 border-emerald-400 text-slate-700'
                        : 'bg-white hover:bg-slate-50 border-slate-300 shadow-2xs'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleStep(item.id)}
                      className="mt-1 w-5 h-5 rounded-md text-emerald-700 focus:ring-2 focus:ring-emerald-600 border-slate-400 shrink-0"
                      aria-label={`${idx + 1}. ${item.title[currentLanguage]}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-xs sm:text-sm font-extrabold ${
                          isDone ? 'line-through text-slate-700' : 'text-slate-900'
                        }`}>
                          {idx + 1}. {item.title[currentLanguage]}
                        </h4>
                        {item.estimatedMinutes && (
                          <span className="text-xs text-slate-600 font-bold shrink-0 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                            <Clock className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                            <span>~{item.estimatedMinutes} min</span>
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-1 leading-relaxed ${
                        isDone ? 'text-slate-600 font-medium' : 'text-slate-700 font-normal'
                      }`}>
                        {item.description[currentLanguage]}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>

            {progressPercent === 100 && (
              <div 
                role="status" 
                className="mt-3.5 p-3.5 rounded-2xl bg-emerald-100 text-emerald-950 text-xs sm:text-sm font-extrabold text-center border-2 border-emerald-400 animate-in zoom-in-95 duration-200"
              >
                🎉 {t.insights.allDone}
              </div>
            )}
          </fieldset>

          {/* Documents Needed */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-300">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-emerald-700" aria-hidden="true" />
              <span>{t.insights.docsNeeded}</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-800 font-medium">
              {insight.documentsNeeded.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1" aria-hidden="true" />
                  <span>{doc[currentLanguage]}</span>
                </li>
              ))}
            </ul>
            {resource.noIdRequired && (
              <p className="mt-3 text-xs text-emerald-950 font-bold bg-emerald-100 p-2.5 rounded-xl border border-emerald-300">
                ✓ {t.insights.noDocsNote}
              </p>
            )}
          </div>

          {/* Common Misconceptions (if any) */}
          {insight.commonMisconceptions && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-amber-950">
              <h4 className="font-extrabold uppercase tracking-wider text-xs text-amber-950 mb-1 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-700" aria-hidden="true" />
                <span>{t.insights.misconceptionTitle}</span>
              </h4>
              <p className="leading-relaxed font-medium">
                {insight.commonMisconceptions[currentLanguage]}
              </p>
            </div>
          )}

          {/* Accessibility & Accommodations */}
          <div className="p-4 bg-slate-100 rounded-2xl border border-slate-300 text-xs text-slate-800 flex items-start gap-2.5">
            <Accessibility className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong className="block text-xs text-slate-950 uppercase tracking-wider font-extrabold mb-0.5">
                {t.insights.accessibilityTitle}
              </strong>
              <span className="font-medium text-slate-800">{insight.accessibilityNotes[currentLanguage]}</span>
            </div>
          </div>

          {/* Source Provenance & Simulated Verification */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-300 text-xs text-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 uppercase tracking-wider text-xs">
                {t.insights.sourceInfo}
              </span>
              <span className="text-xs bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-md font-bold border border-slate-300">
                {resource.officialUrl ? (currentLanguage === 'en' ? 'Review status' : 'Estado de revisión') : t.insights.simulatedVerified}: {insight.simulatedVerificationDate}
              </span>
            </div>
            <p className="text-xs text-slate-700">
              <strong className="text-slate-900">{currentLanguage === 'en' ? 'Source Organization: ' : 'Organización Fuente: '}</strong>
              {insight.sourceOrganization[currentLanguage]}
            </p>
            <p className="text-xs text-slate-700">
              <strong className="text-slate-900">{currentLanguage === 'en' ? 'Catalog Benchmark: ' : 'Índice de Referencia: '}</strong>
              {insight.dataSourceLabel[currentLanguage]}
            </p>
          </div>

          {resource.officialUrl && (
            <a href={resource.officialUrl} target="_blank" rel="noopener noreferrer"
              className="block rounded-xl border border-indigo-300 bg-indigo-50 p-3 text-center text-sm font-extrabold text-indigo-900 hover:bg-indigo-100">
              {currentLanguage === 'en' ? 'Open official program information' : 'Abrir información oficial del programa'} ↗
            </a>
          )}

          {/* Simulated Contact Caution */}
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 text-xs text-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
              <span>
                <strong className="text-slate-900">{t.resourceCard.simulatedContact}:</strong> {resource.contactSimulated.phone}
              </span>
            </div>
            <span className="text-xs text-slate-700 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block w-fit">
              {resource.contactSimulated.intakeMethod[currentLanguage]}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyChecklist}
              className="min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-colors flex items-center gap-2 shadow-2xs focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                  <span className="text-emerald-900">{t.insights.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-700" aria-hidden="true" />
                  <span>{t.insights.printChecklist}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-300 bg-white flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-600"
              title="Print checklist"
              aria-label="Print checklist"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {currentLanguage === 'en' ? 'Done' : 'Listo'}
          </button>
        </div>
      </div>
    </div>
  );
};
