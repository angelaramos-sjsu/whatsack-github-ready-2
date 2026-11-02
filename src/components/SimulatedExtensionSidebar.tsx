import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { getNextStepInsight } from '../data/nextStepInsights';
import { findNextStepInsight } from '../data/nextStepInsightsRouting';
import { NextStepInsightCard } from './NextStepInsightCard';
import { 
  SidebarClose, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Search, 
  ArrowRight, 
  ExternalLink, 
  HelpCircle, 
  ShieldCheck, 
  RefreshCw,
  Send,
  Minimize2,
  Maximize2,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

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
  const [extensionMatchedInsightId, setExtensionMatchedInsightId] = useState<string | null>(null);
  const [extensionMessages, setExtensionMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: currentLanguage === 'en'
        ? 'Hi! This is a simulated browser-extension demonstration. Requirements depend on your specific situation. You can ask questions and open official guidance, but this preview does not verify benefits or forms.'
        : '¡Hola! Esta es una demostración simulada. Los requisitos dependen de cada caso. Consulte las instrucciones oficiales antes de presentar formularios.'
    }
  ]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const portals = {
    calfresh: {
      url: 'https://benefits.sccgov.org/calfresh-intake/application-v4',
      name: currentLanguage === 'en' ? 'Santa Clara County CalFresh & General Assistance' : 'Portal de CalFresh y Asistencia del Condado de Santa Clara',
      headline: currentLanguage === 'en' ? 'Application for CalFresh Food Benefits (Form CF 285 / SAR 7)' : 'Solicitud de Beneficios de Alimentos CalFresh (Formato CF 285 / SAR 7)',
      jargonSnippet: currentLanguage === 'en'
        ? 'Pursuant to Welfare and Institutions Code § 18901.3, gross income determinations require verification of all non-exempt earned income, dependent care deductions, and utility standard allowances (SUA).'
        : 'Conforme al Código de Bienestar § 18901.3, las determinaciones de ingreso bruto exigen verificación de ingresos ganados no exentos y deducciones de servicios públicos (SUA).',
      decodedPlainEnglish: currentLanguage === 'en'
        ? 'CalFresh may ask for income and household information. The documents and deductions that apply depend on the household. Confirm the current verification requirements and any deductions with your county benefits office.'
        : 'CalFresh puede pedir información sobre ingresos y personas en el hogar. Los documentos y deducciones dependen del caso. Confirme los requisitos actuales con el condado.',
      hiddenBarriers: [
        {
          label: currentLanguage === 'en' ? 'Public Charge Rumor' : 'Mito de Carga Pública',
          desc: currentLanguage === 'en'
            ? 'Public charge rules are complicated and can change. Check current USCIS guidance or speak with a qualified legal service provider rather than relying on a blanket assurance.'
            : 'Las reglas de carga pública son complejas. Revise las normas actuales de USCIS o consulte asesoría legal competente.'
        },
        {
          label: currentLanguage === 'en' ? 'Expedited 3-Day Service' : 'Servicio Urgente de 3 Días',
          desc: currentLanguage === 'en'
            ? 'Some households may qualify for expedited CalFresh processing within three days, but eligibility depends on multiple criteria. Ask the county about expedited service.'
            : 'Algunos hogares pueden calificar para CalFresh acelerado en tres días, según varios requisitos. Consulte con el condado.'
        }
      ],
      requiredDocsSummary: currentLanguage === 'en'
        ? ['Any ID with your photo or name', '1 pay stub or employer letter', 'Utility bill (PG&E or phone)']
        : ['Cualquier identificación con su foto o nombre', '1 talón de cheque o carta de trabajo', 'Recibo de servicios (PG&E o teléfono)']
    },
    edd: {
      url: 'https://edd.ca.gov/CTB/',
      name: currentLanguage === 'en' ? 'California EDD Unemployment & Retraining Portal' : 'Portal de Desempleo y Reentrenamiento EDD de California',
      headline: currentLanguage === 'en' ? 'California Training Benefits (CTB) & WIOA Dislocated Worker Program' : 'Beneficios de Capacitación de California (CTB) y Programa WIOA',
      jargonSnippet: currentLanguage === 'en'
        ? 'Claimants electing Title I-B training must establish eligibility under Section 1269 before exhausting 16th week of standard UI entitlement.'
        : 'Los solicitantes de capacitación Título I-B deben acreditar elegibilidad bajo la Sección 1269 antes de la semana 16 de beneficios UI.',
      decodedPlainEnglish: currentLanguage === 'en'
        ? 'California Training Benefits may permit an eligible unemployment claimant to continue receiving benefits during approved training. CTB does not pay tuition. Ask EDD about training rules, possible extension deadlines and reporting before enrolling.'
        : 'California Training Benefits puede permitir beneficios durante capacitación aprobada, si cumple los requisitos. CTB no paga matrícula. Consulte con EDD sobre plazos y reglas de declaración.',
      hiddenBarriers: [
        {
          label: currentLanguage === 'en' ? 'NOVAworks Grant Voucher' : 'Vales de Beca NOVAworks',
          desc: currentLanguage === 'en'
            ? 'WIOA may fund approved training when eligibility and funding are confirmed by a workforce counselor. There is no automatic fixed voucher or guaranteed full tuition coverage.'
            : 'WIOA puede financiar ciertos programas aprobados, según elegibilidad y fondos. No existe una beca fija automática ni garantía de cubrir todos los gastos.'
        }
      ],
      requiredDocsSummary: currentLanguage === 'en'
        ? ['EDD Notice of Unemployment Award', 'CA Driver License or State ID', 'Resume draft']
        : ['Carta de Concesión de Desempleo EDD', 'Licencia de CA o ID Estatal', 'Borrador de currículum']
    },
    deanza: {
      url: 'https://www.deanza.edu/financialaid/',
      name: currentLanguage === 'en' ? 'Foothill-De Anza College District Enrollment Portal' : 'Portal de Inscripción del Distrito Colegial Foothill-De Anza',
      headline: currentLanguage === 'en' ? 'AB 19 College Promise Tuition Waiver & AB 540 Nonresident Exemption' : 'Exención de Matrícula AB 19 College Promise y Ley AB 540',
      jargonSnippet: currentLanguage === 'en'
        ? 'Statutory compliance requires student certification of full-time quarter standing (>= 12.0 institutional units) and submission of FAFSA/CADAA prior to census date.'
        : 'El cumplimiento legal requiere acreditación de tiempo completo (>= 12 unidades) y envío de FAFSA/CADAA antes de la fecha de censo.',
      decodedPlainEnglish: currentLanguage === 'en'
        ? 'Community college fee waivers and Promise programs have different eligibility requirements. They may not cover books, housing and other expenses. Confirm the appropriate FAFSA or CADAA application route using official guidance.'
        : 'Las exenciones de inscripción y los programas Promise tienen requisitos distintos. No siempre cubren libros, vivienda u otros gastos. Consulte FAFSA o CADAA en fuentes oficiales.',
      hiddenBarriers: [
        {
          label: currentLanguage === 'en' ? 'Textbook Voucher Available' : 'Vales para Libros de Texto',
          desc: currentLanguage === 'en'
            ? 'Ask the college financial-aid office whether textbook grants, emergency aid, or other verified assistance is currently available.'
            : 'Pregunte a la oficina de ayuda financiera sobre apoyos actuales para libros u otras necesidades.'
        }
      ],
      requiredDocsSummary: currentLanguage === 'en'
        ? ['High school diploma / transcript', 'CADAA or FAFSA confirmation number', 'Class schedule showing 12 units']
        : ['Certificado de preparatoria', 'Número de confirmación CADAA o FAFSA', 'Horario con 12 unidades']
    }
  };

  const currentPortalData = portals[selectedPortal];
  const activeExtensionInsight = getNextStepInsight(
    extensionMatchedInsightId || (selectedPortal === 'edd' ? 'D3.2' : selectedPortal === 'deanza' ? 'S2.5' : 'D6.1')
  );

  const handleSendExtensionChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!extensionChatInput.trim()) return;

    const userText = extensionChatInput;
    const matched = findNextStepInsight(userText, selectedPortal === 'deanza' ? 'Sofia' : 'Daniel');
    setExtensionMatchedInsightId(matched?.entry.id || null);
    setExtensionMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setExtensionChatInput('');

    setTimeout(() => {
      let response = '';
      if (matched) {
        response = currentLanguage === 'en'
          ? 'I matched your question with a research-informed NextStep Insight below. Please use its official links to verify any requirements.'
          : 'Encontré una sugerencia relacionada con su pregunta. Consulte los enlaces oficiales para verificar los requisitos.';
      } else {
        response = currentLanguage === 'en'
          ? 'This is a scripted demonstration, not a live page scan. For an eligibility or document question, consult the official provider. You can also try a question from the Sofia or Daniel research matrix.'
          : 'Esta demostración es simulada, no revisa páginas en tiempo real. Para requisitos o documentos, consulte al proveedor oficial.';
      }
      setExtensionMessages((prev) => [...prev, { sender: 'assistant', text: response }]);
    }, 600);
  };

  const triggerAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 800);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 flex flex-col">
      {/* Top Extension Demo Header */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="h-4 w-px bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t.extension.title}</span>
            <span className="text-[10px] bg-indigo-900/60 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 rounded-full">
              Chrome & Safari Prototype Extension
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
          >
            <span>{t.extension.openFullWhatsack}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Portal Selection Tabs (Demonstrating WhatSack scanning different government pages) */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-2 flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
            {currentLanguage === 'en' ? 'Simulated Websites:' : 'Páginas Web Simuladas:'}
          </span>
          <button
            onClick={() => { setSelectedPortal('calfresh'); setExtensionMatchedInsightId(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedPortal === 'calfresh'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🍎 {currentLanguage === 'en' ? 'Santa Clara CalFresh' : 'Condado Santa Clara CalFresh'}
          </button>
          <button
            onClick={() => { setSelectedPortal('edd'); setExtensionMatchedInsightId(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedPortal === 'edd'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            💼 {currentLanguage === 'en' ? 'CA EDD Retraining' : 'Reentrenamiento EDD'}
          </button>
          <button
            onClick={() => { setSelectedPortal('deanza'); setExtensionMatchedInsightId(null); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedPortal === 'deanza'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🎓 {currentLanguage === 'en' ? 'De Anza College Promise' : 'De Anza Matrícula Gratuita'}
          </button>
        </div>

        <button
          onClick={triggerAnalyze}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin text-emerald-400' : ''}`} />
          <span>{currentLanguage === 'en' ? 'Re-scan Page' : 'Reescanear Página'}</span>
        </button>
      </div>

      {/* Dual Workspace View: Simulated Website (Left 65%) + WhatSack Extension Sidebar (Right 35%) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT PANE: Simulated Government Webpage */}
        <div className="flex-1 bg-white text-slate-900 p-6 sm:p-8 overflow-y-auto">
          {/* Simulated Browser Address Bar */}
          <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-xl mb-6 text-xs text-slate-600 border border-slate-200">
            <span className="text-slate-400">🔒</span>
            <span className="font-mono text-slate-700 truncate">{currentPortalData.url}</span>
            <span className="ml-auto text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
              {currentLanguage === 'en' ? 'Simulated Portal' : 'Portal Simulado'}
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
                <span>{currentLanguage === 'en' ? 'Official Regulatory Language:' : 'Lenguaje Normativo Oficial:'}</span>
              </div>
              <p className="font-serif italic text-slate-600">
                "{currentPortalData.jargonSnippet}"
              </p>
            </div>

            {/* Simulated Complex Form Inputs */}
            <div className="space-y-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-sm text-slate-800">
                {currentLanguage === 'en' ? 'Section 2: Verification Disclosures' : 'Sección 2: Declaraciones de Verificación'}
              </h3>
              
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-600">
                  {currentLanguage === 'en' ? 'Household Earned Gross Income Verification Method:' : 'Método de Verificación de Ingresos Brutos:'}
                </label>
                <input
                  type="text"
                  disabled
                  value={currentLanguage === 'en' ? 'Form SAR 7 / Paystub Schedule 2B' : 'Formato SAR 7 / Talón de Cheque'}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-600">
                  {currentLanguage === 'en' ? 'Dependent Deductions Standard Utility Schedule:' : 'Deducciones de Dependientes y Servicios Básicos:'}
                </label>
                <input
                  type="text"
                  disabled
                  value={currentLanguage === 'en' ? 'SUA Determination (Non-Shelter Utility Standard)' : 'Determinación SUA de Servicios Básicos'}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white text-slate-500"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  {currentLanguage === 'en'
                    ? 'Failure to attach mandatory supporting verification schedules within 10 business days may cause automatic denial of entitlement.'
                    : 'La omisión de comprobantes requeridos dentro de 10 días hábiles puede causar la denegación automática.'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center italic">
              {currentLanguage === 'en'
                ? 'Notice how confusing and stressful official government language can feel? Look at the WhatSack companion sidebar to the right to see how we decode it in real time.'
                : '¿Nota lo confuso y estresante que resulta el lenguaje oficial? Mire la barra lateral de WhatSack a la derecha para ver cómo lo traducimos en tiempo real.'}
            </p>
          </div>
        </div>

        {/* RIGHT PANE: The Simulated WhatSack Extension Sidebar */}
        <div className="w-full lg:w-[420px] bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-full overflow-hidden">
          {/* Extension Header */}
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                🌱
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <span>WhatSack Extension</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h3>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {currentLanguage === 'en' ? 'Active Web Companion' : 'Acompañante Web Activo'}
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
                <span>{t.extension.simplifiedSummary}</span>
              </div>
              <p className="text-emerald-100 leading-relaxed font-medium">
                {currentPortalData.decodedPlainEnglish}
              </p>
            </div>

            {/* Hidden Barriers & Myths Decoded */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.extension.identifiedBarriers}</span>
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

            {/* Source-linked NextStep Insight: matched question or sensible topic default */}
            {activeExtensionInsight && (
              <NextStepInsightCard entry={activeExtensionInsight} variant="chat" />
            )}

            {/* What You Actually Need Today Checklist */}
            <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700">
              <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{currentLanguage === 'en' ? 'What You Actually Need to Upload:' : 'Lo que Realmente Debe Subir Hoy:'}</span>
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
                  {currentLanguage === 'en' ? 'Ask Extension About This Page' : 'Preguntar a la Extensión'}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Scripted demo</span>
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
                  {currentLanguage === 'en' ? 'Ask extension about this form' : 'Pregunte a la extensión sobre este formulario'}
                </label>
                <input
                  id="extension-chat-input"
                  type="text"
                  value={extensionChatInput}
                  onChange={(e) => setExtensionChatInput(e.target.value)}
                  placeholder={currentLanguage === 'en' ? 'Ask a question about this form...' : 'Pregunte sobre este formulario...'}
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
            </div>
          </div>

          {/* Extension Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px]">WhatSack Browser Companion</span>
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
