import React, { useState } from 'react';
import { Persona, Language, DemonstrationResource } from '../types';
import { translations } from '../data/translations';
import { demonstrationResources } from '../data/resources';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  FileText,
  Volume2,
  BookmarkCheck
} from 'lucide-react';

interface PersonaJourneyModalProps {
  persona: Persona | null;
  currentLanguage: Language;
  onClose: () => void;
  onSelectResourceForInsights: (resource: DemonstrationResource) => void;
  onExecuteQuery: (query: string) => void;
}

export const PersonaJourneyModal: React.FC<PersonaJourneyModalProps> = ({
  persona,
  currentLanguage,
  onClose,
  onSelectResourceForInsights,
  onExecuteQuery
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!persona) return null;

  const t = translations[currentLanguage];
  const steps = persona.journeySteps;
  const currentStep = steps[activeStepIndex] || steps[0];

  const matchedResource = demonstrationResources.find(
    (r) => r.id === currentStep.recommendedResourceId
  );

  const handleSpeakNarrative = () => {
    if (!('speechSynthesis' in window)) {
      alert(currentLanguage === 'en' ? 'Speech synthesis not supported in this browser' : 'Síntesis de voz no soportada en este navegador');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const text = `${persona.name}. ${currentStep.title[currentLanguage]}. ${currentStep.narrative[currentLanguage]}. ${currentStep.keyTakeaway[currentLanguage]}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLanguage === 'es' ? 'es-US' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleApplySampleQuery = (q: string) => {
    onExecuteQuery(q);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-t-3xl relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-4">
              <img
                src={persona.avatarUrl}
                alt={persona.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/80 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                    {persona.name}, {persona.age}
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                    {t.personas.personaJourneyTitle}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-indigo-200 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{persona.location}</span>
                  <span>•</span>
                  <span>{persona.tagline[currentLanguage]}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (isSpeaking) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 text-white/70 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Tabs */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  activeStepIndex === idx
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span>{step.title[currentLanguage]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Journey Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Step Narrative Card */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>
                  {t.personas.step} {currentStep.stepNumber} of {steps.length}: {currentStep.title[currentLanguage]}
                </span>
              </span>

              {/* TTS Listen Button */}
              <button
                type="button"
                onClick={handleSpeakNarrative}
                className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-indigo-700 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1.5 shadow-2xs"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse text-emerald-600' : ''}`} />
                <span>{isSpeaking ? (currentLanguage === 'en' ? 'Stop Voice' : 'Detener') : (currentLanguage === 'en' ? 'Listen' : 'Escuchar')}</span>
              </button>
            </div>

            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium mb-4">
              {currentStep.narrative[currentLanguage]}
            </p>

            {/* Key Takeaway */}
            <div className="p-3 bg-white rounded-xl border border-indigo-200 text-xs text-indigo-950 flex items-start gap-2 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>{currentLanguage === 'en' ? 'Key Breakthrough: ' : 'Logro Clave: '}</strong>
                <span>{currentStep.keyTakeaway[currentLanguage]}</span>
              </div>
            </div>
          </div>

          {/* Recommended Resource for this Step */}
          {matchedResource && (
            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Connected Demonstration Resource' : 'Recurso de Demostración Vinculado'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  {matchedResource.costType}
                </span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-base mb-1">
                {matchedResource.title[currentLanguage]}
              </h4>
              <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                {matchedResource.description[currentLanguage]}
              </p>

              <button
                onClick={() => {
                  onSelectResourceForInsights(matchedResource);
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.resourceCard.viewInsights}</span>
              </button>
            </div>
          )}

          {/* Persona's Sample Inquiries */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {t.personas.sampleQuestionsTitle} {persona.name}:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {persona.sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplySampleQuery(q[currentLanguage])}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/60 text-left text-xs font-medium text-slate-700 hover:text-emerald-950 transition-colors flex items-center justify-between group"
                >
                  <span className="line-clamp-2">"{q[currentLanguage]}"</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex items-center justify-between">
          <button
            onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeStepIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{currentLanguage === 'en' ? 'Previous Step' : 'Paso Anterior'}</span>
          </button>

          <span className="text-xs font-semibold text-slate-500">
            {activeStepIndex + 1} / {steps.length}
          </span>

          <button
            onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={activeStepIndex === steps.length - 1}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-700 hover:bg-indigo-800 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs"
          >
            <span>{currentLanguage === 'en' ? 'Next Step' : 'Siguiente Paso'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
