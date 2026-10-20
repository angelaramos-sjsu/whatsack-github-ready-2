import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  FileSearch, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  FileText,
  Copy,
  Check
} from 'lucide-react';

interface AIDocumentDecoderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export const AIDocumentDecoderModal: React.FC<AIDocumentDecoderModalProps> = ({
  isOpen,
  onClose,
  currentLanguage
}) => {
  const t = translations[currentLanguage];
  const [inputText, setInputText] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodedResult, setDecodedResult] = useState<{
    bottomLine: string;
    panicCheck: string;
    actionSteps: string[];
    deadline: string;
  } | null>(null);

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

  const sampleNotices = [
    {
      title: currentLanguage === 'en' ? 'Santa Clara CalFresh SAR 7 Notice' : 'Aviso SAR 7 de CalFresh Santa Clara',
      text: currentLanguage === 'en'
        ? `COUNTY OF SANTA CLARA SOCIAL SERVICES AGENCY
NOTICE OF ACTION - REQUIRED SEMI-ANNUAL ELIGIBILITY REPORT (SAR 7)
Pursuant to MPP § 63-504.4, your household must submit Form SAR 7 with proof of gross non-exempt earned income and mandatory dependent care verification by the 5th day of the submit month. Failure to comply prior to the 10-day notice of discontinuance will result in termination of your CalFresh allotment under MPP § 63-504.42.`
        : `AGENCIA DE SERVICIOS SOCIALES DEL CONDADO DE SANTA CLARA
NOTIFICACIÓN DE ACCIÓN - INFORME SEMESTRAL REQUERIDO (SAR 7)
Conforme a MPP § 63-504.4, su hogar debe presentar el formulario SAR 7 con comprobantes de ingresos brutos y gastos de dependientes antes del día 5 del mes de envío. El incumplimiento antes del aviso de 10 días resultará en la cancelación de su asignación de CalFresh bajo MPP § 63-504.42.`
    },
    {
      title: currentLanguage === 'en' ? 'EDD Dislocated Worker Audit Request' : 'Solicitud de Auditoría EDD de Desempleo',
      text: currentLanguage === 'en'
        ? `STATE OF CALIFORNIA EMPLOYMENT DEVELOPMENT DEPARTMENT
NOTICE OF ELIGIBILITY DETERMINATION & CTB RETRAINING INQUIRY
Section 1269 of the California Unemployment Insurance Code requires verification of accredited dislocated worker certification prior to continuation of weekly benefit entitlement during enrolled vocational instruction.`
        : `DEPARTAMENTO DE DESARROLLO DEL EMPLEO DE CALIFORNIA
NOTIFICACIÓN DE DETERMINACIÓN DE ELEGIBILIDAD Y CONSULTA CTB
La Sección 1269 del Código de Seguro de Desempleo exige verificación de la certificación de trabajador desplazado antes de continuar con el pago de beneficios semanales durante el curso vocacional.`
    }
  ];

  const handleDecode = (textToUse?: string) => {
    const text = textToUse || inputText;
    if (!text.trim()) return;

    setIsDecoding(true);
    setDecodedResult(null);

    setTimeout(() => {
      setIsDecoding(false);
      if (text.toLowerCase().includes('sar 7') || text.toLowerCase().includes('calfresh')) {
        setDecodedResult({
          bottomLine: currentLanguage === 'en'
            ? 'This is your standard 6-month check-in for CalFresh food benefits. The county simply needs to confirm that you still live in Santa Clara County and see your most recent pay stub.'
            : 'Este es el informe de rutina cada 6 meses de CalFresh. El condado solo necesita confirmar que sigue viviendo en Santa Clara y ver un talón de cheque reciente.',
          panicCheck: currentLanguage === 'en'
            ? 'DO NOT PANIC: Your food card is NOT shut off today. You have an active grace period to submit this before any changes take effect.'
            : 'NO SE ALARME: Su tarjeta de alimentos NO ha sido cancelada hoy. Tiene un período de gracia para responder antes de cualquier cambio.',
          deadline: currentLanguage === 'en' ? 'Within 10 calendar days' : 'Dentro de los próximos 10 días naturales',
          actionSteps: currentLanguage === 'en'
            ? [
                'Take a photo of your most recent pay stub (or write a quick note if your income didn’t change).',
                'Upload it online via BenefitsCal.com or drop it off at the Julian St Social Services office.',
                'If you need free in-person help, visit Sacred Heart or Somos Mayfair where Spanish-speaking navigators fill this out with you in 15 minutes.'
              ]
            : [
                'Tome una foto de su talón de cheque más reciente (o escriba una nota si sus ingresos no cambiaron).',
                'Súbalo por internet en BenefitsCal.com o entréguelo en la oficina de Julian St.',
                'Si requiere ayuda gratuita en persona, acuda a Sacred Heart o Somos Mayfair; asesores bilingües le ayudan a llenarlo en 15 minutos.'
              ]
        });
      } else {
        setDecodedResult({
          bottomLine: currentLanguage === 'en'
            ? 'The state is confirming that your retraining program qualifies for California Training Benefits (CTB), which lets you collect unemployment checks without applying to other jobs.'
            : 'El estado está confirmando que sus clases califican para los Beneficios de Capacitación (CTB), lo que le permite cobrar desempleo sin buscar otros empleos.',
          panicCheck: currentLanguage === 'en'
            ? 'GOOD NEWS: This is a routine verification letter, not a penalty or fine.'
            : 'BUENAS NOTICIAS: Esta es una carta de rutina para verificar su escuela, no una multa ni sanción.',
          deadline: currentLanguage === 'en' ? 'Within 14 calendar days' : 'Dentro de los próximos 14 días naturales',
          actionSteps: currentLanguage === 'en'
            ? [
                'Ask your NOVAworks counselor or school registrar for your official "Training Enrollment Letter".',
                'Submit the letter back through your UI Online portal under the "Verification Upload" tab.',
                'Continue certifying your normal weekly claims as instructed.'
              ]
            : [
                'Pida a su asesor de NOVAworks o escuela la "Carta Oficial de Inscripción a Capacitación".',
                'Envíe la carta a través de su portal UI Online en la pestaña de documentos.',
                'Siga certificando sus semanas de desempleo con normalidad.'
              ]
        });
      }
    }, 900);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="decoder-modal-title"
    >
      <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-slate-700 flex flex-col focus:outline-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
              <FileSearch className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id="decoder-modal-title" className="text-lg sm:text-xl font-extrabold text-white">
                {t.aiDecoder.title}
              </h2>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {t.aiDecoder.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label={currentLanguage === 'en' ? 'Close document decoder' : 'Cerrar decodificador'}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Sample Prompts */}
          <div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              {t.aiDecoder.sampleNoticesLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleNotices.map((notice, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputText(notice.text);
                    handleDecode(notice.text);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-emerald-500 text-xs font-semibold transition-colors flex items-center gap-1.5 min-h-[42px]"
                >
                  <FileText className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  <span>{notice.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Paste Input Box */}
          <div className="space-y-2">
            <label htmlFor="decoder-input-textarea" className="text-xs font-bold text-slate-200 block">
              {t.aiDecoder.pasteLabel}
            </label>
            <textarea
              id="decoder-input-textarea"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={currentLanguage === 'en' ? 'Paste confusing government text or letters here...' : 'Pegue el texto confuso de su carta oficial aquí...'}
              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 text-xs sm:text-sm text-slate-100 rounded-2xl p-4 focus:outline-hidden transition-colors font-sans leading-relaxed"
            />
            <button
              type="button"
              onClick={() => handleDecode()}
              disabled={!inputText.trim() || isDecoding}
              className="min-h-[44px] px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{isDecoding ? (currentLanguage === 'en' ? 'Decoding...' : 'Decodificando...') : t.aiDecoder.analyzeButton}</span>
            </button>
          </div>

          {/* Decoded Result Box */}
          {decodedResult && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-4 animate-in fade-in duration-200">
              {/* Bottom Line */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>{t.aiDecoder.bottomLine}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-semibold">
                  {decodedResult.bottomLine}
                </p>
              </div>

              {/* Panic Check */}
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-100">
                <span className="font-extrabold block text-emerald-300 uppercase tracking-wider text-xs mb-1">
                  🛡️ {t.aiDecoder.panicCheck}
                </span>
                <span className="font-medium">{decodedResult.panicCheck}</span>
              </div>

              {/* 3 Action Steps */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                    {t.aiDecoder.actionPlan}
                  </h3>
                  <span className="text-xs bg-slate-700 text-slate-200 px-2.5 py-0.5 rounded font-mono font-bold">
                    Deadline: {decodedResult.deadline}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {decodedResult.actionSteps.map((step, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-200 flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 border border-emerald-500/30">
                        {sIdx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Free Human Advocate Referral */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <span>{t.aiDecoder.freeAdvocateNotice}</span>
                <span className="font-extrabold text-emerald-400">Somos Mayfair • Sacred Heart</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            {currentLanguage === 'en' ? 'Close' : 'Cerrar'}
          </button>
        </div>
      </div>
    </div>
  );
};
