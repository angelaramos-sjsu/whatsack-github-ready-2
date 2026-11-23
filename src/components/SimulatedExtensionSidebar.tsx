import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SidebarClose, Sparkles, AlertTriangle, FileText, ArrowRight, ExternalLink, Info, Send, Minimize2, Maximize2 } from 'lucide-react';

interface SimulatedExtensionSidebarProps {
  currentLanguage: Language;
  onClose: () => void;
  onNavigateHome: () => void;
}

export const SimulatedExtensionSidebar: React.FC<SimulatedExtensionSidebarProps> = ({
  currentLanguage,
  onClose,
  onNavigateHome
}) => {
  const t = translations[currentLanguage];
  const [selectedPortal, setSelectedPortal] = useState<'calfresh' | 'edd' | 'deanza'>('calfresh');
  const [extensionChatInput, setExtensionChatInput] = useState('');
  const [extensionMessages, setExtensionMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: currentLanguage === 'en'
        ? 'This classroom demonstration uses fictional pages. I cannot scan a website, confirm eligibility, or determine reporting rules. Please check the official source.'
        : 'Esta demostración académica usa páginas ficticias. No puedo analizar sitios web, confirmar elegibilidad ni determinar reglas para reportar. Consulte la fuente oficial.'
    }
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const portals = {
    calfresh: {
      url: "https://www.cdss.ca.gov/inforesources/calfresh/rights-and-responsibilities",
      name: currentLanguage === 'en' ? "California CalFresh" : "CalFresh de California",
      headline: currentLanguage === 'en' ? "Example: Understanding CalFresh notices" : "Ejemplo: Comprender los avisos de CalFresh",
      jargonSnippet: currentLanguage === 'en' ? "A county notice may ask for updated income or household information. The specific reporting rules and documents vary by case." : "Un aviso del condado puede solicitar información actualizada sobre ingresos o el hogar. Las reglas y los documentos dependen del caso.",
      decodedPlainEnglish: currentLanguage === 'en' ? "Check your own county notice for the reporting rules, documents, and deadlines that apply to you. This demo cannot determine eligibility or benefit amounts." : "Revise el aviso de su condado para confirmar los requisitos, documentos y plazos de su caso. Esta demostración no determina la elegibilidad ni los beneficios.",
      hiddenBarriers: [
        { label: currentLanguage === 'en' ? "Reporting changes" : "Reportar cambios", desc: currentLanguage === 'en' ? "Reporting requirements differ by case. Ask your county CalFresh office which changes to report and when." : "Los requisitos para reportar dependen del caso. Pregunte a su oficina de CalFresh qué cambios debe reportar y cuándo." },
        { label: currentLanguage === 'en' ? "Expedited benefits" : "Beneficios acelerados", desc: currentLanguage === 'en' ? "Some applicants may qualify for expedited processing. The county determines eligibility; a cash balance alone does not guarantee approval." : "Algunas personas pueden recibir un trámite acelerado. El condado determina la elegibilidad; la cantidad de dinero por sí sola no garantiza la aprobación." }
      ],
      requiredDocsSummary: currentLanguage === 'en' ? ["Review your own county notice","Ask which documents, if any, are required","Confirm deadlines and reporting rules with the county"] : ["Revise el aviso de su condado","Pregunte qué documentos necesita, si corresponde","Confirme los plazos y reglas para reportar"],
      chatGuidance: currentLanguage === 'en' ? "Ask your county CalFresh office about your notice and case requirements." : "Consulte con su oficina de CalFresh sobre su aviso y los requisitos de su caso."
    },
    edd: {
      url: "https://edd.ca.gov/ctb",
      name: currentLanguage === 'en' ? "California EDD" : "EDD de California",
      headline: currentLanguage === 'en' ? "Example: Training while receiving unemployment" : "Ejemplo: Capacitación durante el desempleo",
      jargonSnippet: currentLanguage === 'en' ? "Someone receiving unemployment may need to report school or training and ask EDD about California Training Benefits (CTB)." : "Una persona que recibe beneficios de desempleo podría necesitar reportar sus estudios o capacitación y consultar con EDD sobre CTB.",
      decodedPlainEnglish: currentLanguage === 'en' ? "California Training Benefits may allow eligible claimants to attend approved training while receiving unemployment benefits. EDD determines eligibility, reporting, and extension requirements." : "California Training Benefits puede permitir que ciertas personas asistan a capacitación mientras reciben desempleo. EDD determina la elegibilidad y los requisitos de reporte o extensión.",
      hiddenBarriers: [
        { label: currentLanguage === 'en' ? "Training and benefits" : "Capacitación y beneficios", desc: currentLanguage === 'en' ? "Training does not automatically guarantee continued unemployment benefits or exemption from work-search requirements. Confirm your circumstances with EDD." : "La capacitación no garantiza que continúen los beneficios ni una exención de búsqueda de empleo. Consulte con EDD sobre su caso." },
        { label: currentLanguage === 'en' ? "Workforce training funding" : "Fondos para capacitación", desc: currentLanguage === 'en' ? "Tuition, books, and other costs may or may not be funded. Check availability and eligibility directly with a workforce provider; there is no guaranteed grant amount." : "La matrícula, los libros y otros gastos podrían o no contar con fondos. Confirme la disponibilidad y los requisitos con un proveedor; no hay un monto garantizado." }
      ],
      requiredDocsSummary: currentLanguage === 'en' ? ["Ask EDD how to report school or training","Check whether your training qualifies for CTB","Ask the training provider about available funding"] : ["Pregunte a EDD cómo reportar sus estudios","Consulte si su capacitación cumple los requisitos de CTB","Pregunte al proveedor sobre los fondos disponibles"],
      chatGuidance: currentLanguage === 'en' ? "Read the EDD California Training Benefits page and contact EDD about your own claim." : "Consulte la página de California Training Benefits y comuníquese con EDD sobre su caso."
    },
    deanza: {
      url: "https://www.deanza.edu/promise/",
      name: currentLanguage === 'en' ? "De Anza College Promise" : "De Anza College Promise",
      headline: currentLanguage === 'en' ? "Example: Understanding Promise assistance" : "Ejemplo: Comprender la ayuda Promise",
      jargonSnippet: currentLanguage === 'en' ? "Promise programs, enrollment-fee waivers, and other financial aid have different eligibility and enrollment requirements." : "Los programas Promise, las exenciones de cuotas y otras ayudas tienen distintos requisitos de elegibilidad e inscripción.",
      decodedPlainEnglish: currentLanguage === 'en' ? "De Anza College Promise has program-specific rules and covered costs. Check the official page and financial-aid office; taking a certain number of classes does not make every college cost free." : "De Anza College Promise tiene requisitos y gastos cubiertos específicos. Confirme la información en la página oficial y la oficina de ayuda financiera; tomar cierto número de clases no hace que todos los gastos sean gratuitos.",
      hiddenBarriers: [
        { label: currentLanguage === 'en' ? "Promise versus fee waivers" : "Promise y exenciones", desc: currentLanguage === 'en' ? "Promise and enrollment-fee waivers are not interchangeable. Ask which one applies and what it covers." : "Promise y las exenciones de cuotas son distintos. Pregunte cuál corresponde y qué gastos cubre." },
        { label: currentLanguage === 'en' ? "Books and other expenses" : "Libros y otros gastos", desc: currentLanguage === 'en' ? "Book vouchers and other aid are not guaranteed. Verify current program rules and funding with the college." : "Los vales de libros y otras ayudas no están garantizados. Confirme los requisitos y fondos con el colegio." }
      ],
      requiredDocsSummary: currentLanguage === 'en' ? ["Check current Promise eligibility","Ask which expenses are covered","Confirm application and enrollment steps"] : ["Revise los requisitos actuales de Promise","Pregunte qué gastos se cubren","Confirme los pasos de solicitud e inscripción"],
      chatGuidance: currentLanguage === 'en' ? "Review the official De Anza College Promise page and ask its financial-aid office about current requirements." : "Revise la página oficial de De Anza College Promise y pregunte a su oficina de ayuda financiera sobre los requisitos actuales."
    }
  };

  const currentPortalData = portals[selectedPortal];

  const handleSendExtensionChat = (e: React.FormEvent) => {
    e.preventDefault();
    const question = extensionChatInput.trim();
    if (!question) return;
    setExtensionChatInput('');
    const response = currentLanguage === 'en'
      ? `This is a scripted demonstration, not a live answer to "${question}". ${currentPortalData.chatGuidance} Use the official source linked here to check current requirements.`
      : `Esta es una demostración con respuestas preparadas, no una respuesta en vivo a "${question}". ${currentPortalData.chatGuidance} Use la fuente oficial enlazada aquí para confirmar los requisitos actuales.`;
    setExtensionMessages((prev) => [...prev, { sender: 'user', text: question }, { sender: 'assistant', text: response }]);
  };

  return (
    <div className={`extension-shell bg-slate-900 min-h-screen text-slate-100 flex flex-col ${isMinimized ? 'extension-minimized' : ''} ${isExpanded ? 'extension-expanded' : ''}`}>
      {/* Top Extension Demo Header */}
      <div className="extension-header bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-brand-500" />
          </div>
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t.extension.title}</span>
            <span className="text-[10px] bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 rounded-full">
              Illustrative layout — not installed
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMinimized((value) => !value)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            title={isMinimized ? 'Restore extension preview' : 'Minimize extension preview'}
            aria-label={isMinimized ? 'Restore extension preview' : 'Minimize extension preview'}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsExpanded((value) => !value)}
            className="hidden sm:block p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            title={isExpanded ? 'Use compact extension layout' : 'Expand extension layout'}
            aria-label={isExpanded ? 'Use compact extension layout' : 'Expand extension layout'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onNavigateHome}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
          >
            <span>{t.extension.openFullWhatsack}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div role="note" className="px-4 sm:px-6 py-3 bg-amber-950 text-amber-100 border-b border-amber-700 flex items-start gap-2 text-sm">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
        <span>{currentLanguage === 'en'
          ? 'CLASSROOM DEMO — These are fictional sample pages. WhatSack does not scan live websites or determine eligibility. Check official sources and contact the relevant agency.'
          : 'DEMOSTRACIÓN ACADÉMICA — Estas páginas son ejemplos ficticios. WhatSack no analiza sitios web en vivo ni determina elegibilidad. Consulte las fuentes oficiales y la agencia correspondiente.'}</span>
      </div>

      {/* Three fictional sample scenarios: no page scraping or live analysis */}
      <div className="extension-portalbar bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-2 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
            {currentLanguage === 'en' ? 'Simulated Websites:' : 'Páginas Web Simuladas:'}
          </span>
          <button
            onClick={() => setSelectedPortal('calfresh')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedPortal === 'calfresh'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🍎 {currentLanguage === 'en' ? 'Santa Clara CalFresh' : 'Condado Santa Clara CalFresh'}
          </button>
          <button
            onClick={() => setSelectedPortal('edd')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedPortal === 'edd'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            💼 {currentLanguage === 'en' ? 'CA EDD Retraining' : 'Reentrenamiento EDD'}
          </button>
          <button
            onClick={() => setSelectedPortal('deanza')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedPortal === 'deanza'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🎓 {currentLanguage === 'en' ? 'De Anza College Promise' : 'De Anza Matrícula Gratuita'}
          </button>
        </div>

        <a
          href={currentPortalData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
        >
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{currentLanguage === 'en' ? 'Official source' : 'Fuente oficial'}</span>
        </a>
      </div>

      {/* Dual Workspace View: Simulated Website (Left 65%) + WhatSack Extension Sidebar (Right 35%) */}
      <div className="extension-workspace flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT PANE: Simulated Government Webpage */}
        <div className="flex-1 bg-white text-slate-900 p-6 sm:p-8 overflow-y-auto">
          {/* Simulated Browser Address Bar */}
          <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-xl mb-6 text-xs text-slate-600 border border-slate-200">
            <Info className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
            <span className="font-mono text-slate-700 truncate">{currentPortalData.url}</span>
            <span className="ml-auto text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
              {currentLanguage === 'en' ? 'Illustrative example' : 'Ejemplo ilustrativo'}
            </span>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {currentPortalData.name}
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
                {currentPortalData.headline}
              </h1>
            </div>

            {/* Bureaucratic Jargon Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <div className="flex items-center gap-1.5 text-slate-500 font-bold mb-1.5">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>{currentLanguage === 'en' ? 'Illustrative wording (not an official quotation):' : 'Texto ilustrativo (no es una cita oficial):'}</span>
              </div>
              <p className="font-serif italic text-slate-600">
                {currentPortalData.jargonSnippet}
              </p>
            </div>

            {/* Simulated Complex Form Inputs */}
            <div className="space-y-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-sm text-slate-800">
                {currentLanguage === 'en' ? 'Example of a complicated form' : 'Ejemplo de un formulario complicado'}
              </h3>
              
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-600">
                  {currentLanguage === 'en' ? 'Example question: What should I report?' : 'Pregunta de ejemplo: ¿Qué debo reportar?'}
                </label>
                <input
                  type="text"
                  disabled
                  value={currentLanguage === 'en' ? 'Check your own agency notice' : 'Consulte el aviso de su agencia'}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-600">
                  {currentLanguage === 'en' ? 'Example question: What documents should I provide?' : 'Pregunta de ejemplo: ¿Qué documentos debo presentar?'}
                </label>
                <input
                  type="text"
                  disabled
                  value={currentLanguage === 'en' ? 'Ask the organization about requirements' : 'Consulte los requisitos con la agencia'}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-500"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  {currentLanguage === 'en'
                    ? 'This is not an official form. Do not upload documents or enter sensitive information. Check your own agency notice for actual requirements and deadlines.'
                    : 'Este no es un formulario oficial. No suba documentos ni introduzca datos confidenciales. Consulte su aviso para conocer los requisitos y plazos.'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center italic">
              {currentLanguage === 'en'
                ? 'This fictional form illustrates how a guide could simplify complex information. No real webpage is being analyzed.'
                : 'Este formulario ficticio ilustra cómo una guía podría simplificar información. No se analiza ninguna página real.'}
            </p>
          </div>
        </div>

        {/* RIGHT PANE: The Simulated WhatSack Extension Sidebar */}
        <div className={`w-full ${isExpanded ? 'lg:w-[520px]' : 'lg:w-[420px]'} bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-full overflow-hidden transition-[width] duration-300`}>
          {/* Extension Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                🌱
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>WhatSack Extension</span>
                  <span className="text-[10px] font-semibold text-amber-300 border border-amber-700 px-1.5 py-0.5 rounded">DEMO</span>
                </h3>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {currentLanguage === 'en' ? 'Not a live browser extension' : 'No es una extensión activa'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              title="Close extension preview"
            >
              <SidebarClose className="w-4 h-4" />
            </button>
          </div>

          {/* Extension Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Status Card */}
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-bold mb-1">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{currentLanguage === 'en' ? 'Illustrative guidance (not live advice)' : 'Orientación ilustrativa, no asesoría en vivo'}</span>
              </div>
              <p className="text-emerald-100 leading-relaxed font-medium">
                {currentPortalData.decodedPlainEnglish}
              </p>
            </div>

            {/* Hidden Barriers & Myths Decoded */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentLanguage === 'en' ? 'Questions to confirm with the agency' : 'Preguntas para confirmar con la agencia'}</span>
              </span>

              {currentPortalData.hiddenBarriers.map((barrier, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs">
                  <h4 className="font-bold text-amber-300 mb-0.5">
                    💡 {barrier.label}
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    {barrier.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* What You Actually Need Today Checklist */}
            <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700">
              <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-400" />
                <span>{currentLanguage === 'en' ? 'Questions to ask the organization:' : 'Preguntas para la organización:'}</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {currentPortalData.requiredDocsSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Extension Chat */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {currentLanguage === 'en' ? 'Ask about this example (scripted)' : 'Preguntar sobre este ejemplo (guionizado)'}
                </span>
                <span className="text-[10px] text-amber-300 font-mono">DEMO</span>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {extensionMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-900/60 text-indigo-100 ml-4 border border-indigo-700/40 text-right'
                        : 'bg-slate-800 text-slate-200 mr-2 border border-slate-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendExtensionChat} className="flex gap-2">
                <label htmlFor="extension-chat-input" className="sr-only">
                  {currentLanguage === 'en' ? 'Ask a general question about the example' : 'Haga una pregunta general sobre el ejemplo'}
                </label>
                <input
                  id="extension-chat-input"
                  type="text"
                  value={extensionChatInput}
                  onChange={(e) => setExtensionChatInput(e.target.value)}
                  placeholder={currentLanguage === 'en' ? 'Ask generally; no personal details...' : 'Pregunte sin datos personales...'}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 min-h-[42px]"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors min-h-[42px] min-w-[42px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-400"
                  aria-label={currentLanguage === 'en' ? 'Send question' : 'Enviar pregunta'}
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
              <p className="text-[11px] text-slate-400">{currentLanguage === 'en' ? 'Do not enter personal, financial, or case information.' : 'No introduzca información personal, financiera ni de su caso.'}</p>
              <a href={currentPortalData.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-emerald-300 underline underline-offset-2 inline-flex items-center gap-1.5"><ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />{currentLanguage === 'en' ? 'Read the official source' : 'Consultar la fuente oficial'}</a>
            </div>
          </div>

          {/* Extension Footer */}
          <div className="extension-footer p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px]">{currentLanguage === 'en' ? 'WhatSack classroom demo' : 'Demostración académica de WhatSack'}</span>
            <button
              onClick={onNavigateHome}
              className="text-emerald-400 font-bold hover:underline text-[11px]"
            >
              {currentLanguage === 'en' ? 'Back to Full App' : 'Volver a la App'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
