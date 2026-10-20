import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Brain, 
  Layers, 
  ShieldCheck, 
  Sliders, 
  Cpu, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  AlertTriangle,
  Database,
  ArrowRight
} from 'lucide-react';

interface AIEngineInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export const AIEngineInspectorModal: React.FC<AIEngineInspectorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage
}) => {
  const [selectedModel, setSelectedModel] = useState<'civic-70b' | 'civic-gemini' | 'civic-llama'>('civic-70b');
  const [temperature, setTemperature] = useState(0.2);
  const [strictCitations, setStrictCitations] = useState(true);
  const [activeTab, setActiveTab] = useState<'rag' | 'prompt' | 'guardrails' | 'settings'>('rag');

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

  const t = translations[currentLanguage];

  const systemPromptEnglish = `You are WhatSack, an empathetic, dignified, and highly accurate Civic AI Navigator for residents of Silicon Valley (Santa Clara and San Mateo counties).

CORE CIVIC DIRECTIVES:
1. Grounding: ONLY recommend community resources present in the verified civic knowledge base. NEVER invent phone numbers, addresses, hours, or eligibility criteria.
2. Stigma-Free Tone: Recognize that asking for food, mental health, or financial assistance takes courage. Use affirming, respectful, non-bureaucratic language.
3. Immigration & Public Charge Safety: Clearly reassure residents that using charitable food pantries, emergency community health, and AB 540 college tuition waivers does NOT count toward federal Public Charge determinations.
4. Youth & Minor Consent: Respect California Health & Safety Code § 124260. Youth aged 12+ can access outpatient mental wellness without parental notification.
5. Actionability: Formulate all recommendations into explicit "NextStep Insights" with required documents and estimated preparation times.
6. Language Equity: Maintain authentic Spanish and English phrasing with equal detail.`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-engine-modal-title"
    >
      <div className="bg-slate-900 text-slate-100 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-slate-700 flex flex-col focus:outline-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
              <Brain className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="ai-engine-modal-title" className="text-lg sm:text-xl font-extrabold text-white">
                  {t.aiEngine.title}
                </h2>
                <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full">
                  Architecture v2.6
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                {t.aiEngine.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400"
            aria-label={currentLanguage === 'en' ? 'Close architecture inspector' : 'Cerrar inspector de arquitectura'}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('rag')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'rag'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t.aiEngine.ragTitle}</span>
          </button>

          <button
            onClick={() => setActiveTab('guardrails')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'guardrails'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.aiEngine.guardrailsTitle}</span>
          </button>

          <button
            onClick={() => setActiveTab('prompt')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'prompt'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{t.aiEngine.systemPromptTitle}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Model Parameters</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {activeTab === 'rag' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
                <span className="font-bold uppercase tracking-wider text-[11px] block text-indigo-400 mb-1">
                  How WhatSack Civic-RAG Works:
                </span>
                <p className="leading-relaxed">
                  Unlike generic public LLMs that hallucinate outdated eligibility rules or closed community offices, WhatSack pairs a fine-tuned civic foundation model with a localized Santa Clara & San Mateo County resource embedding database.
                </p>
              </div>

              {/* RAG Pipeline Flowchart */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mb-3">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white mb-1">Resident Inquiry</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Accepts natural voice or text in English or Spanish. Tokenizes intent, city location, and emotional barriers.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs mb-3">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white mb-1">Dense Vector Search</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Retrieves top-K vetted programs from the Silicon Valley Community Index with zero-ID and transit tags.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs mb-3">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white mb-1">Policy Guardrails</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Checks public charge safety, minor consent laws (§ 124260), and crisis interception before generation.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-800 border border-emerald-500/40 flex flex-col justify-between bg-emerald-950/20">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mb-3">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white mb-1">Grounded Synthesis</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Generates plain-language advice, document requirements, and an actionable NextStep checklist.
                    </p>
                  </div>
                </div>
              </div>

              {/* Provenance & Metrics */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-2xl font-extrabold text-emerald-400 block">99.4%</span>
                  <span className="text-[11px] text-slate-400 font-medium">Grounding Precision (Simulated)</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-indigo-400 block">&lt; 180ms</span>
                  <span className="text-[11px] text-slate-400 font-medium">Vector Index Retrieval Latency</span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-amber-400 block">100% Zero</span>
                  <span className="text-[11px] text-slate-400 font-medium">PII Ingestion / Data Retention</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guardrails' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Public Charge Safety Protocol</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  The model automatically intercepts any inquiry involving food pantries, community clinics, or state college aid to clarify that under California and federal immigration laws, local charitable services and healthcare enrollment do NOT penalize green card applications.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-xs space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>California Minor Consent Protection (§ 124260)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  When youth under 18 inquire about anxiety, depression, or distress, the model guarantees privacy, reminding them that California law allows minors 12+ to receive confidential outpatient counseling without parental notification.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-xs space-y-2 text-red-200">
                <div className="flex items-center gap-2 font-bold text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{t.aiEngine.emergencyIntercept}</span>
                </div>
                <p className="leading-relaxed">
                  Any detected indicators of acute self-harm or violence immediately trigger high-priority display of 988 (National Suicide & Crisis Lifeline) and 911 alternatives.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'prompt' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Civic Model System Prompt (Read-Only Transparency):
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">EN/ES Dual Instruction</span>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {systemPromptEnglish}
              </pre>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-5 text-xs">
              <div>
                <label className="block text-slate-400 font-bold uppercase tracking-wider text-[11px] mb-2">
                  {t.aiEngine.modelSelector}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedModel('civic-70b')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedModel === 'civic-70b'
                        ? 'bg-indigo-600/30 border-indigo-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="font-bold block text-sm">WhatSack CivicLLM-70B</span>
                    <span className="text-[10px] text-slate-400">Optimized for public benefits reasoning</span>
                  </button>

                  <button
                    onClick={() => setSelectedModel('civic-gemini')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedModel === 'civic-gemini'
                        ? 'bg-indigo-600/30 border-indigo-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="font-bold block text-sm">Civic-Gemini-Flash</span>
                    <span className="text-[10px] text-slate-400">Sub-100ms multi-turn voice streaming</span>
                  </button>

                  <button
                    onClick={() => setSelectedModel('civic-llama')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedModel === 'civic-llama'
                        ? 'bg-indigo-600/30 border-indigo-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="font-bold block text-sm">Llama-3-Civic-8B-Local</span>
                    <span className="text-[10px] text-slate-400">Edge client-side privacy model</span>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="ai-temperature-slider" className="text-slate-300 font-bold uppercase tracking-wider text-xs">
                    {t.aiEngine.temperatureLabel}: {temperature}
                  </label>
                  <span className="text-xs text-indigo-300 font-mono font-bold">
                    {temperature <= 0.2 ? 'Strict Grounding' : 'Conversational'}
                  </span>
                </div>
                <input
                  id="ai-temperature-slider"
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800 border border-slate-700">
                <label htmlFor="ai-strict-citations-toggle" className="cursor-pointer pr-4">
                  <span className="font-extrabold text-white text-xs sm:text-sm block">Strict Civic Citation Enforcement</span>
                  <span className="text-xs text-slate-300 font-medium">Forces model to attach explicit verification sources to each recommendation</span>
                </label>
                <input
                  id="ai-strict-citations-toggle"
                  type="checkbox"
                  checked={strictCitations}
                  onChange={(e) => setStrictCitations(e.target.checked)}
                  className="w-5 h-5 rounded-md accent-emerald-500 cursor-pointer shrink-0"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {t.aiEngine.datasetProvenance}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {currentLanguage === 'en' ? 'Close Inspector' : 'Cerrar Inspector'}
          </button>
        </div>
      </div>
    </div>
  );
};
