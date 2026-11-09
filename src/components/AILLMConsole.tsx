import React, { useState, useRef, useEffect } from 'react';
import { Language, DemonstrationResource } from '../types';
import { translations } from '../data/translations';
import { demonstrationResources } from '../data/resources';
import { ScriptedAnswerExtras } from './ScriptedAnswerExtras';
import { SproutMascot } from './SproutAssistant';
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
} from 'lucide-react';

/**
 * Render the simple **bold** markers used in reviewed, scripted answers.
 * The content remains ordinary React text (never raw HTML), and the chat
 * container's pre-wrap style preserves line breaks and numbered steps.
 */
const renderScriptedAnswer = (value: string): React.ReactNode =>
  value.split(/(\*\*[\s\S]+?\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') && part.length > 4
      ? <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong>
      : part
  );

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
  onOpenIntroductionForm?: (source?: string) => void;
  /** A question submitted from the homepage; the copilot opens already answered. */
  initialQuestion?: { text: string; key: number } | null;
}

const topicIntents: Record<AnswerTopic, string> = {
  food: 'Food Access & Stigma-Free Groceries',
  work: 'Workforce Retraining & WIOA Dislocated Worker Grants',
  college: 'Higher Education Grants & College Promise',
  mental: 'Youth Mental Health & Confidential Minor Consent',
  senior: 'Senior Cultural Circles & Nutrition Programs',
  community: 'Community Activities & Social Connection',
  roleplay: 'Intake Rehearsal & Anxiety De-escalation'
};

const shouldOfferQuickQuestions = (question: string | undefined): boolean => {
  if (!question) return false;
  const normalized = question.trim();
  if (!normalized) return false;

  const words = normalized.split(/\s+/).filter(Boolean);
  if (words.length < 4) return true;

  const vagueTerms = [
    'help',
    'anything',
    'not sure',
    'lost my job',
    'no money',
    'need support',
    'necesito ayuda',
    'no se',
    'no estoy seguro',
    'perdi mi trabajo',
    'sin dinero',
    'necesito apoyo'
  ];

  const lower = normalized.toLowerCase();
  return vagueTerms.some((term) => lower.includes(term));
};

/**
 * Route common bilingual phrases to existing approved, scripted answers.
 * Accent normalization helps Spanish users write naturally or omit accents.
 * A person asking for companionship is NOT assumed to be an older adult.
 */
const detectTopic = (question: string): AnswerTopic | null => {
  const normalized = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const has = (...phrases: string[]) => phrases.some((phrase) => normalized.includes(phrase));

  if (has('food', 'grocer', 'despensa', 'alimento', 'comida', 'maria')) return 'food';
  if (has('work', 'retrain', 'job', 'daniel', 'despido', 'capacita', 'empleo', 'trabajo')) return 'work';
  if (has('college', 'sofia', 'de anza', 'tuition', 'universidad', 'matricula', 'colegiatura', 'fafsa', 'cadaa', 'promise', 'becas')) return 'college';
  if (has('teen', 'anxiety', 'mateo', 'mental', 'joven', 'estres', 'confidencial', 'ansiedad')) return 'mental';
  // Rosa's example is specific to older adults; generic social questions are not.
  if (/\b(rosa|seniors?|abuel[oa]s?|adult[oa]s? mayores?|personas? mayores?|tercera edad|jubilad[oa]s?|pensionad[oa]s?)\b/.test(normalized)) return 'senior';
  if (has(
    'me siento sola', 'me siento solo', 'me siento aislada', 'me siento aislado',
    'soledad', 'compania', 'conocer gente', 'conocer personas', 'conocer a personas',
    'hacer amigos', 'hacer amigas', 'hacer amistades', 'actividades sociales',
    'actividades comunitarias', 'conexion comunitaria', 'centro comunitario',
    'community activities', 'community connection', 'social activities',
    'meet people', 'make friends', 'lonely', 'community groups'
  )) return 'community';
  if (has('roleplay', 'practice', 'ensayar', 'practicar')) return 'roleplay';
  return null;
};

export const AILLMConsole: React.FC<AILLMConsoleProps> = ({
  currentLanguage,
  savedResourceIds = [],
  savedScriptedSteps = [],
  onSaveScriptedStep,
  onSavePlanAction,
  onOpenInsights,
  onOpenIntroductionForm,
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
      ? "Hi! I'm WhatSack, your guide. I can help you explore local food, school, work, mental health, and community resources. What would you like help with today? This chat uses prepared example answers."
      : "¡Hola! Soy WhatSack, su guía. Puedo ayudarle a explorar recursos de comida, estudios, trabajo, salud mental y comunidad. ¿En qué necesita ayuda hoy? Este chat usa respuestas de ejemplo.",
    timestamp: currentLanguage === 'en' ? 'Welcome' : 'Bienvenida',
    followUpIds: [
      'ans-food-east-sj-groceries',
      'ans-work-tech-certificates',
      'ans-mental-confidential-teens',
      'ans-community-connections'
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
    const topic = detectTopic(text);
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
          <div aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-600/50 bg-emerald-50">
            <SproutMascot className="h-12 w-12" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold tracking-tight text-white">
              {currentLanguage === 'en' ? 'Ask WhatSack' : 'Preguntar a WhatSack'}
            </h1>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">
              {currentLanguage === 'en'
                ? 'Meet WhatSack, your friendly guide. This is a scripted demo.'
                : 'Conozca a WhatSack, su guía. Esta es una demostración con respuestas preparadas.'}
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
                <div aria-hidden="true" className="h-10 w-10 shrink-0 rounded-xl border border-emerald-300/50 bg-emerald-50 p-1">
                  <SproutMascot className="h-full w-full" />
                </div>
              )}

              <div className={`max-w-2xl w-full rounded-2xl p-4 sm:p-5 shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-emerald-700 text-white ml-8 rounded-tr-xs'
                  : 'bg-slate-800/90 text-slate-100 border border-slate-700/80 rounded-tl-xs'
              }`}>
                {/* Message Header */}
                <div className="flex flex-wrap items-center justify-between gap-1 mb-2 pb-2 border-b border-slate-700/40 text-sm">
                  <span className="font-bold flex items-center gap-1.5">
                    {msg.sender === 'user' ? (
                      <>
                        <User className="w-3.5 h-3.5 text-emerald-200" />
                        <span>{msg.personaName ? `${msg.personaName}` : (currentLanguage === 'en' ? 'Resident Inquiry' : 'Consulta Ciudadana')}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{currentLanguage === 'en' ? 'WhatSack guide' : 'Guía de WhatSack'}</span>
                      </>
                    )}
                  </span>
                  <span className="text-slate-400 text-sm">{msg.timestamp}</span>
                </div>

                {/* Message Text Content */}
                <div className="text-base leading-7 whitespace-pre-wrap font-sans space-y-2 break-words">
                  {msg.sender === 'llm'
                    ? renderScriptedAnswer(
                        msg.scriptedAnswer
                          ? msg.scriptedAnswer.answer[currentLanguage]
                          : msg.id === 'msg-init-1' ? greetingMessage.text : msg.text
                      )
                    : msg.text}
                </div>

                {/* Grounded Resource Cards Preview */}
                {isLlm && msg.recommendedResourceIds && msg.recommendedResourceIds.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-700/60 space-y-2">
                    <span className="text-sm font-bold uppercase tracking-wider text-slate-400 block">
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
                                <span className="text-sm font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400">
                                  {res.costType}
                                </span>
                                <span className="text-sm text-slate-400 font-mono">{res.location.city}</span>
                              </div>
                              <h5 className="font-bold text-base text-white">
                                {res.title[currentLanguage]}
                              </h5>
                              <p className="text-sm text-slate-300 mt-1">
                                {res.organization[currentLanguage]}
                              </p>
                            </div>

                            <button
                              onClick={() => onOpenInsights(res)}
                              className="mt-2 inline-flex min-h-[44px] items-center gap-2 rounded-lg py-2 text-sm font-bold text-emerald-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
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
                    <span className="text-sm font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      {currentLanguage === 'en' ? 'Follow-up Prompts:' : 'Preguntas Sugeridas:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {resolveFollowUps(msg.followUpIds).filter((followUp) => followUp.topic !== 'roleplay').map((followUp) => (
                        <button
                          key={followUp.id}
                          type="button"
                          onClick={() => handleFollowUpClick(followUp.id)}
                          className="min-h-[44px] text-sm px-3 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 hover:border-emerald-400 text-left leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                        >
                          💬 {followUp.question[currentLanguage]}
                        </button>
                      ))}
                      {shouldOfferQuickQuestions(messages.filter((message) => message.sender === 'user').slice(-1)[0]?.text) && (
                        <button
                          type="button"
                          onClick={() => onOpenIntroductionForm?.('assistant-chip')}
                          className="min-h-[44px] text-sm px-3 py-2.5 rounded-lg bg-emerald-900/60 text-white border border-emerald-500/80 hover:bg-emerald-800 text-left leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
                        >
                          {currentLanguage === 'en' ? 'Ask me a few quick questions instead' : 'Hazme algunas preguntas rápidas en su lugar'}
                        </button>
                      )}
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
            <div aria-hidden="true" className="h-10 w-10 shrink-0 rounded-xl border border-emerald-300/50 bg-emerald-50 p-1">
              <SproutMascot className="h-full w-full" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 text-sm text-slate-200 max-w-md space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Brain className="w-4 h-4 animate-pulse" />
                <span>{t.aiCopilot.thinking}</span>
              </div>
              <ul className="text-sm text-slate-400 space-y-1">
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
            className="min-w-0 flex-1 bg-slate-900 border border-slate-500 focus:border-emerald-400 text-white placeholder-slate-300 text-base rounded-2xl px-4 py-3 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-300 transition-colors min-h-[48px]"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className="min-h-[48px] px-4 sm:px-6 py-3 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base rounded-2xl flex items-center gap-2 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
            aria-label={t.aiCopilot.send}
          >
            <span className="hidden sm:inline">{t.aiCopilot.send}</span>
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>

        <p className="text-center text-sm leading-relaxed text-slate-300 font-medium mt-3">
          {currentLanguage === 'en'
            ? 'WhatSack uses scripted example answers for this class project. Check official sources before making decisions.'
            : 'WhatSack usa respuestas de ejemplo para este proyecto de clase. Consulte fuentes oficiales antes de tomar decisiones.'}
        </p>
      </div>
    </div>
  );
};
