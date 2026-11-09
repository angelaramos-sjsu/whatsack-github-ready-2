import React, { useState, useRef, useEffect } from 'react';
import { Language, DemonstrationResource } from '../types';
import { translations } from '../data/translations';
import { demonstrationResources } from '../data/resources';
import { ScriptedAnswerExtras } from './ScriptedAnswerExtras';
import type { SavedScriptedStep } from '../data/answers';
import {
  buildUnscriptedFallback,
  getScriptedAnswer,
  resolveFollowUps,
  routeSaraCollegeQuestion,
  topicEntryAnswerIds
} from '../data/answers';
import type { AnswerTopic, ScriptedAnswer } from '../data/answers';
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
  /** Follow-up buttons, always one unique answer id each. */
  followUpIds?: string[];
  /** The approved scripted answer behind this message. */
  scriptedAnswer?: ScriptedAnswer;
}

interface AILLMConsoleProps {
  currentLanguage: Language;
  savedResourceIds?: string[];
  savedScriptedSteps?: SavedScriptedStep[];
  onSaveScriptedStep?: (step: SavedScriptedStep) => void;
  onSavePlanAction?: (resourceId: string) => void;
  onOpenInsights: (resource: DemonstrationResource) => void;
  /** A question submitted from the homepage; the copilot opens already answered. */
  initialQuestion?: { text: string; key: number } | null;
}

const topicIntents: Record<AnswerTopic, string> = {
  food: 'Food Access & Stigma-Free Groceries',
  work: 'Workforce Retraining & WIOA Dislocated Worker Grants',
  college: 'Higher Education Grants & College Promise',
  mental: 'Youth Mental Health & Confidential Minor Consent',
  senior: 'Senior Cultural Circles & Nutrition Programs',
  roleplay: 'Intake Rehearsal & Anxiety De-escalation'
};

/** Free-text routing only picks a topic; the approved answer comes from its id. */
const detectTopic = (lower: string): AnswerTopic | null => {
  if (lower.includes('food') || lower.includes('grocer') || lower.includes('despensa') || lower.includes('alimento') || lower.includes('maria')) return 'food';
  if (lower.includes('work') || lower.includes('retrain') || lower.includes('job') || lower.includes('daniel') || lower.includes('despido') || lower.includes('capacita')) return 'work';
  if (lower.includes('college') || lower.includes('sofia') || lower.includes('de anza') || lower.includes('tuition') || lower.includes('universidad') || lower.includes('matrícula') || lower.includes('colegiatura') || lower.includes('fafsa') || lower.includes('cadaa') || lower.includes('promise')) return 'college';
  if (lower.includes('teen') || lower.includes('anxiety') || lower.includes('mateo') || lower.includes('mental') || lower.includes('joven') || lower.includes('estrés') || lower.includes('confidencial')) return 'mental';
  if (lower.includes('senior') || lower.includes('rosa') || lower.includes('abuela') || lower.includes('lunch') || lower.includes('almuerzo') || lower.includes('mayor')) return 'senior';
  if (lower.includes('roleplay') || lower.includes('practice') || lower.includes('ensayar') || lower.includes('practicar')) return 'roleplay';
  return null;
};

export const AILLMConsole: React.FC<AILLMConsoleProps> = ({
  currentLanguage,
  savedResourceIds = [],
  savedScriptedSteps = [],
  onSaveScriptedStep,
  onSavePlanAction,
  onOpenInsights,
  initialQuestion
}) => {
  const t = translations[currentLanguage];
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const greetingMessage: ChatMessage = {
      id: 'msg-init-1',
      sender: 'llm',
      text: currentLanguage === 'en'
        ? `Hello! I am the **WhatSack Civic-LLM Copilot** — an AI navigator designed specifically for Silicon Valley residents.\n\nI can translate bureaucratic jargon, identify 100% free community programs across Santa Clara & San Mateo counties, clarify public charge rules, or help you practice an intake call. What situation can I assist you with today?`
        : `¡Hola! Soy el **Copiloto Civic-LLM de WhatSack** — un navegador con IA diseñado especialmente para residentes de Silicon Valley.\n\nPuedo traducir trámites burocráticos confusos, encontrar despensas y programas 100% gratuitos en Santa Clara y San Mateo, aclarar reglas de carga pública o ayudarle a ensayar una llamada. ¿En qué situación le puedo apoyar hoy?`,
      timestamp: 'Just now',
      followUpIds: [
        'ans-food-east-sj-groceries',
        'ans-work-tech-certificates',
        'ans-mental-confidential-teens'
      ]
  };

  /** Turn an approved scripted answer into a chat bubble. */
  const buildAnswerMessage = (answer: ScriptedAnswer): ChatMessage => ({
    id: `llm-${Date.now()}-${answer.id}`,
    sender: 'llm',
    text: answer.answer[currentLanguage],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ragTrace: {
      intent: answer.topic === 'fallback' ? 'Unscripted inquiry — no approved answer' : topicIntents[answer.topic],
      retrievedResources: answer.resourceIds ?? [],
      guardrailsPassed: ['PublicChargeSafetyFilter', 'MinorConsentProtection§124260', 'NoHallucinationPolicy', 'StigmaFreeToneAudit'],
      confidence: answer.topic === 'fallback' ? 0 : 100
    },
    recommendedResourceIds: answer.resourceIds,
    followUpIds: answer.followUpIds,
    scriptedAnswer: answer
  });

  /**
   * One approved answer per question. College questions enter Sara's scripted
   * college journey at the stage that answers them; persona questions keep
   * their own topic entry answer.
   */
  const resolveAnswer = (text: string, isPersonaQuestion = false): ScriptedAnswer => {
    const lower = text.toLowerCase();
    const topic = detectTopic(lower);
    const saraStageId =
      topic === 'college' && !isPersonaQuestion ? routeSaraCollegeQuestion(lower) : undefined;
    const answer = saraStageId
      ? getScriptedAnswer(saraStageId)
      : topic
        ? getScriptedAnswer(topicEntryAnswerIds[topic])
        : undefined;

    // No approved answer exists for this question: say so instead of inventing one.
    return answer ?? buildUnscriptedFallback({ en: text, es: text });
  };

  const [messages, setMessages] = useState<ChatMessage[]>([greetingMessage]);

  // A question submitted from the homepage opens the copilot already answered.
  const seededQuestionKeyRef = useRef<number | null>(null);
  useEffect(() => {
    const seededQuestion = initialQuestion?.text.trim();
    const seededKey = initialQuestion?.key;
    if (!seededQuestion || seededKey === undefined || seededQuestionKeyRef.current === seededKey) return;
    seededQuestionKeyRef.current = seededKey;

    setMessages(prev => [
      ...prev,
      {
        id: `usr-seed-${seededKey}`,
        sender: 'user',
        text: seededQuestion,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      buildAnswerMessage(resolveAnswer(seededQuestion))
    ]);
  }, [initialQuestion]);

  /**
   * A follow-up button replays its own approved answer by id, so two different
   * questions never collapse into one generic reply.
   */
  const handleFollowUpClick = (answerId: string) => {
    const answer = getScriptedAnswer(answerId);
    if (!answer) return;

    const questionMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: answer.question[currentLanguage],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, questionMessage, buildAnswerMessage(answer)]);
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSendMessage = (textToSend?: string, personaTag?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isGenerating) return;

    const userMsgId = `usr-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      personaName: personaTag,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsGenerating(true);

    // Scripted prototype: route the question to its approved answer, never a live model.
    setTimeout(() => {
      setMessages(prev => [...prev, buildAnswerMessage(resolveAnswer(text, Boolean(personaTag)))]);
      setIsGenerating(false);
    }, 900);
  };

  return (
    <div id="main-content" role="main" tabIndex={-1} className="bg-slate-900 min-h-screen text-slate-100 flex flex-col">
      {/* Simple chat heading. Demo menus and persona shortcuts were removed for clarity. */}
      <header className="border-b border-slate-800 bg-slate-950 px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-700/50 bg-emerald-900/40 text-emerald-300">
            <Bot className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight text-white">
              {currentLanguage === 'en' ? 'Ask WhatSack' : 'Preguntar a WhatSack'}
            </h1>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-300">
              {currentLanguage === 'en'
                ? 'Ask a question about local support. Answers are scripted examples.'
                : 'Pregunte sobre recursos locales. Las respuestas son ejemplos preparados.'}
            </p>
          </div>
        </div>
      </header>

      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {currentLanguage === 'en'
          ? `${messages.filter((message) => message.sender === 'llm').length} responses in the conversation.`
          : `${messages.filter((message) => message.sender === 'llm').length} respuestas en la conversación.`}
        {isGenerating ? (currentLanguage === 'en' ? ' Loading an answer.' : ' Cargando una respuesta.') : ''}
      </p>
      {/* Main Chat Stream Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 overflow-y-auto space-y-5">
        {messages.map((msg) => {
          const isLlm = msg.sender === 'llm';

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
                  {msg.sender === 'llm' && msg.scriptedAnswer
                    ? msg.scriptedAnswer.answer[currentLanguage]
                    : msg.id === 'msg-init-1'
                      ? (currentLanguage === 'en'
                        ? 'Hi! I am WhatSack, a scripted class prototype. Ask me about college, work, food, mental health, or community activities.'
                        : '¡Hola! Soy WhatSack, un prototipo de clase con respuestas preparadas. Pregúnteme sobre estudios, trabajo, comida, salud mental o actividades comunitarias.')
                      : msg.text}
                </div>

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

                {/* Approved answer extras: context, official links, NextStep actions */}
                {isLlm && msg.scriptedAnswer && (
                  <ScriptedAnswerExtras
                    answer={msg.scriptedAnswer}
                    currentLanguage={currentLanguage}
                    savedResourceIds={savedResourceIds}
                    onSavePlan={(resourceId) => onSavePlanAction?.(resourceId)}
                    savedSteps={savedScriptedSteps}
                    onSaveStep={(step) => onSaveScriptedStep?.(step)}
                  />
                )}

                {/* Suggested follow-ups — only answers that actually exist are shown */}
                {isLlm && !!msg.followUpIds?.length && (
                  <div className="mt-4 pt-3 border-t border-slate-700/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      {currentLanguage === 'en' ? 'Follow-up Prompts:' : 'Preguntas Sugeridas:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {resolveFollowUps(msg.followUpIds).filter((followUp) => followUp.topic !== 'roleplay').map((followUp) => (
                        <button
                          key={followUp.id}
                          type="button"
                          onClick={() => handleFollowUpClick(followUp.id)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 hover:border-emerald-400 text-left transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-400"
                        >
                          💬 {followUp.question[currentLanguage]}
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
            {t.aiCopilot.chatPlaceholder}
          </label>
          <input
            id="civic-copilot-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.aiCopilot.chatPlaceholder}
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
            ? 'WhatSack Civic-LLM grounds outputs strictly in demonstration records. No personal data collected or stored.'
            : 'El Civic-LLM de WhatSack fundamenta respuestas en registros demostrativos. No se recopilan datos personales.'}
        </p>
      </div>
    </div>
  );
};
