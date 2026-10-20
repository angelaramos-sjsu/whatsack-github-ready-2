import React, { useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { AlertCircle, X, ShieldAlert, CheckCircle2, PhoneCall } from 'lucide-react';

interface DisclaimerBannerProps {
  currentLanguage: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  currentLanguage,
  isOpen,
  onClose
}) => {
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-300 relative overflow-hidden focus:outline-hidden">
        {/* Accent Top Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-emerald-500 to-teal-500" />

        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-800 rounded-2xl border border-amber-300">
              <ShieldAlert className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id="disclaimer-modal-title" className="text-xl font-extrabold text-slate-900">
                {t.disclaimer.title}
              </h2>
              <span className="inline-block text-xs font-bold text-amber-950 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full mt-1">
                {t.disclaimer.simulatedNoticeBadge} • Academic Prototype
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600"
            aria-label={currentLanguage === 'en' ? 'Close safety notice' : 'Cerrar aviso de seguridad'}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
          <p className="bg-slate-50 p-4 rounded-2xl border border-slate-300 text-slate-900 font-medium">
            {t.disclaimer.body}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-emerald-50 text-emerald-950 rounded-2xl border border-emerald-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="font-medium">
                {currentLanguage === 'en'
                  ? 'No sensitive information, social security numbers, or credentials are requested or stored.'
                  : 'No se solicita ni almacena información personal delicada, Seguro Social ni contraseñas.'}
              </span>
            </div>
            <div className="p-3.5 bg-blue-50 text-blue-950 rounded-2xl border border-blue-300 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" aria-hidden="true" />
              <span className="font-medium">
                {currentLanguage === 'en'
                  ? 'Organizations and contact numbers are realistic demonstration placeholders for Silicon Valley research.'
                  : 'Los recursos y teléfonos son simulaciones realistas diseñadas para investigación en Silicon Valley.'}
              </span>
            </div>
          </div>

          <div className="p-3.5 bg-red-50 rounded-2xl border-2 border-red-300 text-red-950 text-xs flex items-center gap-3">
            <PhoneCall className="w-5 h-5 text-red-700 shrink-0" aria-hidden="true" />
            <p>
              <strong className="font-extrabold">{currentLanguage === 'en' ? 'In real emergency: ' : 'En emergencia real: '}</strong>
              {currentLanguage === 'en'
                ? 'Call 911 for medical/fire crises, or 988 for the National Suicide & Crisis Lifeline.'
                : 'Llame al 911 para emergencias médicas/fuego o al 988 para la Línea de Prevención del Suicidio y Crisis.'}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-7 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 focus-visible:ring-2 focus-visible:ring-emerald-900"
          >
            {t.disclaimer.understood}
          </button>
        </div>
      </div>
    </div>
  );
};
