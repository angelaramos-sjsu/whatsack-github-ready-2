import React, { useState, useRef, useEffect } from 'react';
import { Language, Persona, DemonstrationResource } from '../types';
import { translations } from '../data/translations';
import { fictionalPersonas } from '../data/personas';
import { demonstrationResources } from '../data/resources';
import { answerSofiaEducationQuestion, isSofiaEducationQuestion } from '../data/sofiaAssistant';
import { answerDanielQuestion, isDanielQuestion } from '../data/danielAssistant';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  User, 
  FileText, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  MessageSquare,
  HelpCircle,
  PhoneCall,
  Activity,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'llm' | 'system';
  personaName?: string;
  text: string;
  timestamp: string;
  ragTrace?: {
    intent: string;
    retrievedResources: string[];
    guardrailsPassed: string[];
    confidence: number;
  };
  recommendedResourceIds?: string[];
  suggestedFollowUps?: string[];
  officialSources?: Array<{title: string; url: string}>;
  responseMode?: 'live' | 'demo';
}

interface AILLMConsoleProps {
  currentLanguage: Language;
  userProfile?: any;
  onOpenInsights: (resource: DemonstrationResource) => void;
  onOpenArchitectureModal: () => void;
  onOpenDecoderModal: () => void;
  initialQuestion?: string;
}

export const AILLMConsole: React.FC<AILLMConsoleProps> = ({
  currentLanguage,
  userProfile,
  onOpenInsights,
  onOpenArchitectureModal,
  onOpenDecoderModal,
  initialQuestion = ''
}) => {
  const t = translations[currentLanguage];
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePersonaId, setActivePersonaId] = useState<string | null>(null);
  const [isRoleplayMode, setIsRoleplayMode] = useState(false);
  const [expandedTraceId, setExpandedTraceId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sofiaContextRef = useRef(false);
  const danielContextRef = useRef(false);

  useEffect(() => {
    if (initialQuestion.trim()) setInputText(initialQuestion);
  }, [initialQuestion]);

  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-init-1',
      sender: 'llm',
      text: currentLanguage === 'en'
        ? `Hello! I am the **WhatSack Civic-LLM Copilot** — an AI navigator designed specifically for Silicon Valley residents.\n\nI can translate bureaucratic jargon, identify 100% free community programs across Santa Clara & San Mateo counties, clarify public charge rules, or help you practice an intake call. What situation can I assist you with today?`
        : `¡Hola! Soy el **Copiloto Civic-LLM de WhatSack** — un navegador con IA diseñado especialmente para residentes de Silicon Valley.\n\nPuedo traducir trámites burocráticos confusos, encontrar despensas y programas 100% gratuitos en Santa Clara y San Mateo, aclarar reglas de carga pública o ayudarle a ensayar una llamada. ¿En qué situación le puedo apoyar hoy?`,
      timestamp: 'Just now',
      suggestedFollowUps: currentLanguage === 'en'
        ? [
            'Where can I get groceries in East San Jose without an ID?',
            'How can laid-off workers get free tech certificates in Milpitas?',
            'Compare Ohlone Tesla MDP and SSBA training options.',
            'I want to go to college but my family has little money. What are my options?',
            'What mental health support is confidential for teens in Sunnyvale?',
            'Practice intake call for food pantry'
          ]
        : [
            '¿Dónde consigo despensa en el Este de San José sin identificación?',
            '¿Cómo recibir cursos de tecnología gratuitos tras un despido en Milpitas?',
            '¿Qué apoyo emocional para jóvenes es confidencial en Sunnyvale?',
            'Practicar llamada para pedir despensa'
          ]
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Handle persona selection in Copilot
  const handleSelectPersona = (persona: Persona) => {
    setActivePersonaId(persona.id);
    const personaQuery = persona.sampleQuestions[0][currentLanguage];
    handleSendMessage(personaQuery, persona.name);
  };

  const handleSendMessage = (textToSend?: string, personaTag?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isGenerating) return;

    const userMsgId = `usr-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      personaName: personaTag || (activePersonaId ? fictionalPersonas.find(p => p.id === activePersonaId)?.name : undefined),
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsGenerating(true);

    // Daniel answers are intentionally scripted; no API call is made for his demo.
    // Explicit college admissions/aid questions can still start Sofia's pathway.
    const explicitDaniel = isDanielQuestion(text, false);
    const explicitSofia = isSofiaEducationQuestion(text, false);
    const danielQuestion = !/sofia/i.test(personaTag || '') &&
      ( /daniel/i.test(personaTag || '') || (
        isDanielQuestion(text, danielContextRef.current) &&
        (!explicitSofia || explicitDaniel)
      ));
    danielContextRef.current = danielQuestion;
    if (danielQuestion) {
      sofiaContextRef.current = false;
      const prepared = answerDanielQuestion(text, true);
      if (prepared) {
        setTimeout(() => {
          setMessages(previous => [...previous, {
            id: 'daniel-' + Date.now(),
            sender: 'llm',
            text: prepared.text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            recommendedResourceIds: prepared.recommendedResourceIds,
            suggestedFollowUps: prepared.followUps,
            officialSources: prepared.sources,
            responseMode: 'demo'
          }]);
          setIsGenerating(false);
        }, 300);
        return;
      }
    }

    // College questions keep their topic across follow-ups. Live AI is optional.
    const previousCollegeContext = sofiaContextRef.current;
    const collegeQuestion = isSofiaEducationQuestion(text, previousCollegeContext) ||
      /sofia/i.test(personaTag || '');
    sofiaContextRef.current = collegeQuestion;
    if (collegeQuestion) {
      const preparedAnswer = answerSofiaEducationQuestion(text, true);
      if (preparedAnswer) {
        const recentContext = messages.slice(-6)
          .map(message => (message.sender === 'user' ? 'Student: ' : 'WhatSack: ') + message.text.slice(0, 450))
          .join('\n');
        const requestAnswer = async (): Promise<{ answer: string; live: boolean }> => {
          try {
            const response = await fetch('/api/sofia-chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question: text, context: recentContext }),
              signal: AbortSignal.timeout(23000)
            });
            if (!response.ok) throw new Error('Optional AI service unavailable');
            const result = await response.json() as { mode?: string; answer?: string };
            if (result.mode !== 'live' || !result.answer?.trim()) throw new Error('Empty AI answer');
            return { answer: result.answer.trim(), live: true };
          } catch {
            return { answer: preparedAnswer.text, live: false };
          }
        };
        void requestAnswer().then(({ answer, live }) => {
          const response: ChatMessage = {
            id: 'sofia-' + Date.now(),
            sender: 'llm',
            text: answer,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            officialSources: preparedAnswer.sources,
            suggestedFollowUps: preparedAnswer.followUps,
            responseMode: live ? 'live' : 'demo'
          };
          setMessages(previous => [...previous, response]);
          setIsGenerating(false);
        }).catch(() => setIsGenerating(false));
        return;
      }
    }

    // Existing category responses remain scripted prototype interactions.
    setTimeout(() => {
      const lower = text.toLowerCase();
      let matchedResIds: string[] = [];
      let replyText = '';
      let intentCategory = 'Community Navigation';
      let followUps: string[] = [];

      // Detect topic & ground with demonstration data
      if (lower.includes('food') || lower.includes('grocer') || lower.includes('despensa') || lower.includes('alimento') || lower.includes('maria')) {
        matchedResIds = ['res-food-1', 'res-food-2'];
        intentCategory = 'Food Access & Stigma-Free Groceries';
        if (currentLanguage === 'en') {
          replyText = `**I found 2 immediate, stigma-free food resources in East San Jose that fit your inquiry:**\n\n1. **Sacred Heart Saturday Community Food Pantry** (550 S 1st St, San Jose)\n   - **Schedule:** Every Saturday, 9:00 AM – 1:00 PM\n   - **ID Policy:** Zero ID, SSN, or income verification required. Self-attestation accepted.\n   - **Public Charge Clarification:** Community food pantries do **NOT** count toward federal public charge determinations under USCIS rules.\n\n2. **Second Harvest Mobile Produce Market** (Story Rd & King Rd)\n   - Fresh vegetables, farmer produce boxes, walk-up or drive-thru lanes.\n\n**Actionable Next Step:** Arrive at Sacred Heart around 8:40 AM this Saturday with 2 sturdy reusable bags. No pre-registration needed.`;
          followUps = ['Do I need to show proof of address?', 'Are diapers or infant formula available?', 'Roleplay the greeting desk conversation with me'];
        } else {
          replyText = `**Encontré 2 opciones de despensa inmediata sin estigma en el Este de San José:**\n\n1. **Despensa Comunitaria de Sábados en Sacred Heart** (550 S 1st St, San José)\n   - **Horario:** Todos los sábados de 9:00 AM a 1:00 PM\n   - **Requisito de ID:** Cero identificación, sin Seguro Social ni comprobante de ingresos. Solo autodeclaración verbal.\n   - **Aclaración de Carga Pública:** Recibir alimentos de despensas comunitarias **NO** cuenta para la regla de carga pública de inmigración.\n\n2. **Mercado Móvil Second Harvest** (Story Rd y King Rd)\n   - Frutas y verduras frescas de temporada, fila peatonal y de autos.\n\n**Siguiente Paso Recomendado:** Llegue a Sacred Heart a las 8:40 AM este sábado con 2 bolsas reutilizables. No se requiere cita previa.`;
          followUps = ['¿Debo mostrar comprobante de domicilio?', '¿Tienen pañales o leche infantil?', 'Ensayar la conversación de llegada'];
        }
      } else if (lower.includes('work') || lower.includes('retrain') || lower.includes('job') || lower.includes('daniel') || lower.includes('despido') || lower.includes('capacita')) {
        matchedResIds = ['res-work-1', 'res-work-2'];
        intentCategory = 'Workforce Retraining & WIOA Dislocated Worker Grants';
        if (currentLanguage === 'en') {
          replyText = `**If you experienced a recent layoff or workforce reduction in Silicon Valley, you have access to substantial state retraining funds:**\n\n- **NOVAworks Dislocated Worker Program:** Offers vouchers up to **$8,000** for approved certificates in CompTIA Security+, Cloud Operations (AWS), and Network Support.\n- **Crucial Protection:** Enrolling in approved California Training Benefits (CTB) allows you to continue receiving weekly EDD unemployment benefits without having to submit weekly job search logs.\n\n**Actionable Next Step:** Sign up for the 45-minute virtual WIOA orientation held every Wednesday at 10:00 AM. Bring your EDD determination letter.`;
          followUps = ['Will this affect my weekly EDD unemployment check?', 'Are evening classes available for adults?', 'Practice interview with a career navigator'];
        } else {
          replyText = `**Si recientemente fue despedido o redujeron su jornada en Silicon Valley, tiene acceso a importantes becas estatales:**\n\n- **Programa NOVAworks para Trabajadores Desplazados:** Otorga vales de hasta **$8,000** para certificaciones en CompTIA Security+, Nube (AWS) y Soporte de Redes.\n- **Protección Clave:** Al inscribirse en cursos avalados por California Training Benefits (CTB), continúa recibiendo sus cheques de desempleo del EDD sin la obligación de buscar empleo semanalmente.\n\n**Siguiente Paso Recomendado:** Inscríbase a la orientación virtual de 45 minutos que se realiza todos los miércoles a las 10:00 AM. Tenga a la mano su carta del EDD.`;
          followUps = ['¿Afectará mis cheques de desempleo semanales?', '¿Hay clases nocturnas para adultos?', 'Practicar entrevista con un asesor laboral'];
        }
      } else if (lower.includes('college') || lower.includes('sofia') || lower.includes('de anza') || lower.includes('tuition') || lower.includes('universidad') || lower.includes('matrícula')) {
        matchedResIds = ['res-work-3', 'res-comm-2'];
        intentCategory = 'Higher Education Grants & College Promise';
        if (currentLanguage === 'en') {
          replyText = `**Here is the exact breakdown for tuition-free college in Silicon Valley:**\n\n- **Foothill & De Anza College Promise (AB 19):** Covers **100% of tuition and mandatory fees for 2 full academic years** for California residents enrolled in 12+ units.\n- **AB 540 / Dream Act Safety:** Undocumented students submit the California Dream Act Application (CADAA). Under California state law, your financial aid records are confidential and never shared with federal immigration agencies.\n- **Book Support:** First-generation students can request a $500 quarterly bookstore voucher at the Student Success Center.\n\n**Actionable Next Step:** Complete your OpenCCC admissions application first to generate your student CWID, then submit CADAA/FAFSA.`;
          followUps = ['How do I know whether to submit CADAA or FAFSA?', 'Can I visit a campus clinic for 1-on-1 help?', 'What GPA is required for the Promise grant?'];
        } else {
          replyText = `**Aquí tiene el desglose exacto para estudiar la universidad sin costo en Silicon Valley:**\n\n- **Foothill y De Anza College Promise (Ley AB 19):** Cubre el **100% de la colegiatura y cuotas durante 2 años completos** para residentes de California inscritos en 12+ créditos.\n- **Seguridad AB 540 / Dream Act:** Estudiantes indocumentados llenan la solicitud CADAA. Por ley de California, sus datos escolares son confidenciales y nunca se comparten con autoridades migratorias.\n- **Apoyo para Libros:** Estudiantes de 1ra generación pueden pedir un vale de $500 por trimestre para libros en el Centro de Éxito Estudiantil.\n\n**Siguiente Paso Recomendado:** Llene primero la solicitud de admisión en OpenCCC para obtener su número estudiantil CWID, y después envíe su CADAA o FAFSA.`;
          followUps = ['¿Cómo sé si me corresponde CADAA o FAFSA?', '¿Hay asesoría personalizada presencial?', '¿Qué promedio de calificaciones se requiere?'];
        }
      } else if (lower.includes('teen') || lower.includes('anxiety') || lower.includes('mateo') || lower.includes('mental') || lower.includes('joven') || lower.includes('estrés')) {
        matchedResIds = ['res-mental-1', 'res-mental-2'];
        intentCategory = 'Youth Mental Health & Confidential Minor Consent';
        if (currentLanguage === 'en') {
          replyText = `**You have full legal rights to confidential support in California:**\n\n- **California Health & Safety Code § 124260:** Youth aged 12 and older can consent to outpatient mental health and peer counseling confidentially without parental notification.\n- **California Youth Crisis Text Line:** Text **HOPE** to **844-555-TEEN** (Simulated). 100% free, 24/7, anonymous. Texts are answered by trained young listeners who understand academic pressure.\n- **Sunnyvale Youth Wellness Hub:** Drop in after school (3:00 PM – 7:30 PM) for art therapy, quiet sensory pods, and peer listeners without insurance cards or school reporting.\n\n**Actionable Next Step:** Save the text code in your phone as "Peer Line". Reach out anytime you feel overwhelmed.`;
          followUps = ['Will my school find out if I text this number?', 'What happens during a drop-in session?', 'Can I practice a simulated text chat?'];
        } else {
          replyText = `**Tienes plenos derechos legales a recibir apoyo confidencial en California:**\n\n- **Código de Salud de California § 124260:** Jóvenes de 12 años en adelante tienen derecho legal a solicitar consejería ambulatoria de forma confidencial sin aviso obligatorio a los padres.\n- **Línea de Texto de Crisis Juvenil de California:** Envía la palabra **HOPE** al **844-555-TEEN** (Simulado). 100% gratuito, anónimo y disponible 24/7 con jóvenes capacitados.\n- **Centro de Bienestar Juvenil de Sunnyvale:** Espacio libre después de clases (3:00 PM a 7:30 PM) con arte, zonas sensoriales y apoyo entre compañeros sin pedir seguro médico.\n\n**Siguiente Paso Recomendado:** Guarda el número como "Apoyo Amigo" en tu celular. Escribe en cualquier momento de estrés.`;
          followUps = ['¿Se enterará mi escuela si envío un mensaje?', '¿Qué ocurre al visitar el centro juvenil?', '¿Puedo ensayar un mensaje de prueba?'];
        }
      } else if (lower.includes('senior') || lower.includes('rosa') || lower.includes('abuela') || lower.includes('lunch') || lower.includes('almuerzo') || lower.includes('mayor')) {
        matchedResIds = ['res-comm-1', 'res-food-3'];
        intentCategory = 'Senior Cultural Circles & Nutrition Programs';
        if (currentLanguage === 'en') {
          replyText = `**Here are wonderful Spanish-speaking senior gatherings in Redwood City & the Peninsula:**\n\n- **Casa Círculo Cultural Senior Circle:** Meets every Tuesday & Thursday (10:00 AM – 1:30 PM) in North Fair Oaks. Features traditional crafts, chair yoga, warm Mexican hot lunches, and music.\n- **Door-to-Door Transit Assistance:** Staff helps register you for **SamTrans Redi-Wheels**, which picks you up directly at your home and brings you to the center.\n- **Cost:** 100% Free. No fees, no membership requirements.\n\n**Actionable Next Step:** Call bilingual coordinator Carmen at (650) 555-CASA (Simulated) or arrive this Tuesday at 10:00 AM. Free welcome coffee and apron provided!`;
          followUps = ['How does the door-to-door van work?', 'Can a daughter or caregiver accompany my mother?', 'Is there a hot lunch menu available?'];
        } else {
          replyText = `**Aquí tiene excelentes opciones de convivencia para adultos mayores en español en Redwood City:**\n\n- **Círculo de Adultos Mayores de Casa Círculo Cultural:** Se reúnen martes y jueves (10:00 AM a 1:30 PM) en North Fair Oaks. Disfrutan de manualidades, yoga en silla, música y un rico almuerzo caliente.\n- **Transporte Puerta a Puerta:** El personal le ayuda a tramitar **SamTrans Redi-Wheels**, una camioneta que pasa por usted hasta la puerta de su casa.\n- **Costo:** 100% Gratuito. Sin membresías ni mensualidades.\n\n**Siguiente Paso Recomendado:** Llame a la coordinadora Doña Carmen al (650) 555-CASA (Simulado) o llegue el martes a las 10:00 AM. ¡Recibirá café caliente y un mandil de bienvenida!`;
          followUps = ['¿Cómo funciona la camioneta puerta a puerta?', '¿Puede acompañarme mi hija o cuidador?', '¿Qué días sirven almuerzo caliente?'];
        }
      } else if (isRoleplayMode || lower.includes('roleplay') || lower.includes('practice') || lower.includes('ensayar') || lower.includes('practicar')) {
        intentCategory = 'Intake Rehearsal & Anxiety De-escalation';
        if (currentLanguage === 'en') {
          replyText = `**[Intake Specialist Roleplay Mode Active]**\n\n*"Good morning! Welcome to the Silicon Valley Community Support Desk. My name is Elena. Thank you for calling today — please take your time, we are here to support you without any judgment.* \n\n*Could you share with me what neighborhood you are calling from, and whether you are looking for groceries, job training, or health support today?"*\n\n*(Notice how warm and straightforward the intake is? Reply to me as you would on the phone to practice!)*`;
          followUps = ['"I am calling from East San Jose and need groceries for my children"', '"I was laid off from my job in Milpitas and need to learn computers"', '"I feel really nervous and don\'t know where to start"'];
        } else {
          replyText = `**[Modo de Ensayo de Registro Activo]**\n\n*"¡Buenos días! Bienvenido a la Mesa de Apoyo Comunitario de Silicon Valley. Mi nombre es Elena. Gracias por comunicarse con nosotros hoy — tómese todo su tiempo, estamos aquí para servirle con respeto y sin juzgar.* \n\n*¿Podría decirme desde qué área nos llama y si busca alimentos, capacitación o apoyo emocional hoy?"*\n\n*(¿Ve qué sencillo y cálido es el trato? Respóndame como si estuviera en la llamada para seguir practicando).*`;
          followUps = ['"Llamo del Este de San José y necesito despensa para mis hijos"', '"Me despidieron de mi trabajo en Milpitas y busco estudiar computación"', '"Estoy nervioso y no sé por dónde empezar"'];
        }
      } else {
        matchedResIds = ['res-food-1', 'res-work-1', 'res-mental-1', 'res-comm-1'];
        intentCategory = 'General Civic Resource Match';
        if (currentLanguage === 'en') {
          replyText = `I analyzed your inquiry: **"${text}"**.\n\nWhatSack's Civic-LLM index retrieved verified programs in Santa Clara and San Mateo counties with:\n- **No state ID or SSN barriers**\n- **Confidential intake protocols**\n- **High transit accessibility (VTA / SamTrans)**\n\nExplore the verified resource cards attached below, or let me know if you would like me to generate a personalized document checklist or simulate an intake call!`;
          followUps = ['Show food assistance programs', 'Show free job training grants', 'Practice what to say on the phone'];
        } else {
          replyText = `Analicé su consulta: **"${text}"**.\n\nEl índice Civic-LLM de WhatSack recuperó programas verificados en Santa Clara y San Mateo que cuentan con:\n- **Sin requisito de identificación estatal ni Seguro Social**\n- **Protocolos de registro confidenciales**\n- **Excelente conectividad en transporte público (VTA / SamTrans)**\n\nConsulte las opciones verificadas abajo o indíqueme si desea que preparemos una lista de documentos o ensayemos una llamada de registro.`;
          followUps = ['Ver despensas comunitarias', 'Ver becas de capacitación laboral', 'Ensayar qué decir en la llamada'];
        }
      }

      const llmMsg: ChatMessage = {
        id: `llm-${Date.now()}`,
        sender: 'llm',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ragTrace: {
          intent: intentCategory,
          retrievedResources: matchedResIds,
          guardrailsPassed: ['PublicChargeSafetyFilter', 'MinorConsentProtection§124260', 'NoHallucinationPolicy', 'StigmaFreeToneAudit'],
          confidence: 98
        },
        recommendedResourceIds: matchedResIds,
        suggestedFollowUps: followUps
      };

      setMessages(prev => [...prev, llmMsg]);
      setIsGenerating(false);
    }, 1100);
  };

  const handleExportChat = () => {
    const textContent = messages
      .map(m => `[${m.timestamp}] ${m.sender === 'user' ? (m.personaName || 'Resident') : 'WhatSack Civic-LLM'}:\n${m.text}\n`)
      .join('\n----------------------------------------\n\n');

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `whatsack-civic-copilot-plan-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 flex flex-col">
      {/* Top Copilot Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base text-white tracking-tight">
                {t.aiCopilot.title}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t.aiCopilot.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t.aiCopilot.systemStatus}
            </p>
          </div>
        </div>

        {/* Action Buttons: Architecture & Decoder */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenArchitectureModal}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">{t.aiCopilot.architectureButton}</span>
            <span className="sm:hidden">Architecture</span>
          </button>

          <button
            onClick={onOpenDecoderModal}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{t.aiCopilot.decoderButton}</span>
            <span className="sm:hidden">Decoder</span>
          </button>

          <button
            onClick={() => setIsRoleplayMode(!isRoleplayMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isRoleplayMode
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-amber-500/30'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t.aiCopilot.practiceRoleplay}</span>
          </button>

          <button
            onClick={handleExportChat}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            title={t.aiCopilot.exportChat}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Persona Quick Simulator Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <User className="w-3.5 h-3.5 text-indigo-400" />
          <span>{currentLanguage === 'en' ? 'Quick Profiles:' : 'Perfiles:'}</span>
        </span>

        {userProfile && (
          <button
            onClick={() => {
              setActivePersonaId(null);
              handleSendMessage(
                currentLanguage === 'en'
                  ? `Hello, my name is ${userProfile.name}. I live in ${userProfile.city} with a household of ${userProfile.householdSize}. Our monthly income is ${userProfile.monthlyIncome} and our priority needs are: ${userProfile.servicePriorities.join(', ')}. What immediate programs are available for us?`
                  : `Hola, mi nombre es ${userProfile.name}. Vivo en ${userProfile.city} en un hogar de ${userProfile.householdSize} personas. Nuestro ingreso es ${userProfile.monthlyIncome} y buscamos: ${userProfile.servicePriorities.join(', ')}. ¿Qué programas inmediatos tenemos disponibles?`,
                userProfile.name
              );
            }}
            className="px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 bg-emerald-600 text-white border border-emerald-500 shadow-xs"
          >
            <span>👤</span>
            <span>{currentLanguage === 'en' ? `Ask as ${userProfile.name}` : `Consultar como ${userProfile.name}`}</span>
          </button>
        )}

        {fictionalPersonas.map((persona) => (
          <button
            key={persona.id}
            onClick={() => handleSelectPersona(persona)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 border ${
              activePersonaId === persona.id
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <img src={persona.avatarUrl} alt={persona.name} className="w-4 h-4 rounded-full object-cover" />
            <span>{persona.name} ({persona.age})</span>
          </button>
        ))}

        {activePersonaId && (
          <button
            onClick={() => setActivePersonaId(null)}
            className="text-[11px] font-bold text-slate-400 hover:text-white underline ml-1 shrink-0"
          >
            {currentLanguage === 'en' ? 'Reset persona' : 'Quitar persona'}
          </button>
        )}
      </div>

      {/* Main Chat Stream Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 overflow-y-auto space-y-5">
        {messages.map((msg) => {
          const isLlm = msg.sender === 'llm';
          const isTraceExpanded = expandedTraceId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {isLlm && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-2xl w-full rounded-2xl p-4 sm:p-5 shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white ml-8 rounded-tr-xs'
                  : 'bg-slate-800/90 text-slate-100 border border-slate-700/80 rounded-tl-xs'
              }`}>
                {/* Message Header */}
                <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-700/40 text-[11px]">
                  <span className="font-bold flex items-center gap-1.5">
                    {msg.sender === 'user' ? (
                      <>
                        <User className="w-3.5 h-3.5 text-emerald-200" />
                        <span>{msg.personaName ? `${msg.personaName}` : (currentLanguage === 'en' ? 'Resident Inquiry' : 'Consulta Ciudadana')}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatSack Civic-LLM</span>
                      </>
                    )}
                  </span>
                  <span className="text-slate-400 text-[10px]">{msg.timestamp}</span>
                </div>

                {/* Message Text Content */}
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-2">
                  {msg.text}
                </div>

                {isLlm && msg.responseMode && (
                  <div role="status" className="mt-3 text-xs text-amber-200 font-semibold">
                    {msg.responseMode === 'live'
                      ? 'AI-generated draft • Verify facts on official websites. This question and recent chat context were processed by an AI provider.'
                      : 'Scripted college demo • No live AI or real-time verification is being used.'}
                  </div>
                )}

                {isLlm && msg.officialSources && msg.officialSources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-700/60">
                    <p className="text-[11px] text-slate-300 font-bold mb-2">Official starting points — check current details</p>
                    <div className="flex flex-col gap-2">
                      {msg.officialSources.map(source => (
                        <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer"
                          className="text-sm text-emerald-300 underline underline-offset-2 hover:text-emerald-100">
                          {source.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Simulation-only reasoning trace for legacy responses */}
                {isLlm && msg.ragTrace && (
                  <div className="mt-4 pt-3 border-t border-slate-700/60">
                    <button
                      onClick={() => setExpandedTraceId(isTraceExpanded ? null : msg.id)}
                      className="text-[11px] font-bold text-indigo-300 hover:text-indigo-200 flex items-center gap-1.5 transition-colors"
                    >
                      <Brain className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{currentLanguage === 'en' ? 'Simulated routing trace' : 'Traza de enrutamiento simulada'}</span>
                      {isTraceExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isTraceExpanded && (
                      <div className="mt-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-700 text-[11px] space-y-2 animate-in fade-in duration-150">
                        <div>
                          <strong className="text-slate-400 uppercase tracking-wider text-[10px] block">Identified Intent:</strong>
                          <span className="text-indigo-200">{msg.ragTrace.intent}</span>
                        </div>
                        <div>
                          <strong className="text-slate-400 uppercase tracking-wider text-[10px] block">Prototype guardrail labels (not independently tested):</strong>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {msg.ragTrace.guardrailsPassed.map((g, idx) => (
                              <span key={idx} className="bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-1.5 py-0.5 rounded text-[10px]">
                                ✓ {g}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Grounded Resource Cards Preview */}
                {isLlm && msg.recommendedResourceIds && msg.recommendedResourceIds.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-700/60 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {currentLanguage === 'en' ? 'Grounded Demonstration Resources:' : 'Recursos de Demostración Vinculados:'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.recommendedResourceIds.map((resId) => {
                        const res = demonstrationResources.find(r => r.id === resId);
                        if (!res) return null;

                        return (
                          <div
                            key={res.id}
                            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-emerald-500/50 transition-colors flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400">
                                  {res.costType}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">{res.location.city}</span>
                              </div>
                              <h5 className="font-bold text-xs text-white line-clamp-1">
                                {res.title[currentLanguage]}
                              </h5>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {res.organization[currentLanguage]}
                              </p>
                            </div>

                            <button
                              onClick={() => onOpenInsights(res)}
                              className="mt-2 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                            >
                              <span>{t.resourceCard.viewInsights}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Suggested Follow-up chips */}
                {isLlm && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-700/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      {currentLanguage === 'en' ? 'Follow-up Prompts:' : 'Preguntas Sugeridas:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSendMessage(prompt)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 hover:border-emerald-400 text-left transition-colors"
                        >
                          💬 {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Live Generating & Thinking Animation */}
        {isGenerating && (
          <div className="flex gap-3 items-start animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-xs text-slate-300 max-w-md space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <Brain className="w-4 h-4 animate-pulse" />
                <span>{t.aiCopilot.thinking}</span>
              </div>
              <ul className="text-[11px] text-slate-400 space-y-1">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t.aiCopilot.retrievalStep2}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  <span>{t.aiCopilot.retrievalStep3}</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar Form */}
      <div className="bg-slate-950 border-t border-slate-800 p-4 sm:p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="max-w-4xl mx-auto relative flex items-center gap-2"
        >
          <label htmlFor="civic-copilot-input" className="sr-only">
            {isRoleplayMode 
              ? (currentLanguage === 'en' ? 'Type your practice phone response' : 'Escriba su respuesta de práctica')
              : t.aiCopilot.chatPlaceholder}
          </label>
          <input
            id="civic-copilot-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isRoleplayMode 
              ? (currentLanguage === 'en' ? 'Type your practice phone response to Elena...' : 'Escriba su respuesta de práctica a Elena...')
              : t.aiCopilot.chatPlaceholder
            }
            className="flex-1 bg-slate-900 border border-slate-700 focus:border-emerald-500 text-white placeholder-slate-400 text-xs sm:text-sm rounded-2xl px-4 py-3 focus:outline-hidden transition-colors min-h-[46px]"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className="min-h-[46px] px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-xs sm:text-sm rounded-2xl flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20 focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label={t.aiCopilot.send}
          >
            <span className="hidden sm:inline">{t.aiCopilot.send}</span>
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 font-medium mt-2.5">
          {currentLanguage === 'en'
            ? 'College answers are scripted unless a server-side AI key is configured. With live AI enabled, your question and recent chat context go to the AI provider. Do not enter private details.'
            : 'Las respuestas son una demostración salvo que se configure IA en vivo. Si está activa, se envían las preguntas al proveedor de IA. No comparta datos personales.'}
        </p>
      </div>
    </div>
  );
};
