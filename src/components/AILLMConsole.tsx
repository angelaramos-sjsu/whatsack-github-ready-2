import React, { useState, useRef, useEffect } from 'react';
import { Language, Persona, DemonstrationResource } from '../types';
import { translations } from '../data/translations';
import { fictionalPersonas } from '../data/personas';
import { demonstrationResources } from '../data/resources';
import { ScriptedAnswerExtras } from './ScriptedAnswerExtras';
import {
  buildUnscriptedFallback,
  getScriptedAnswer,
  resolveFollowUps,
  routeSaraCollegeQuestion,
  saraCollegeStageIds,
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
  BookmarkPlus,
  Check,
  Layers, 
  ArrowRight,
  MessageSquare,
  HelpCircle,
  PhoneCall,
  Activity,
  Sliders,
  X,
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
  userProfile?: any;
  savedResourceIds?: string[];
  onSavePlanAction?: (resourceId: string) => void;
  onOpenInsights: (resource: DemonstrationResource) => void;
  onOpenArchitectureModal: () => void;
  onOpenDecoderModal: () => void;
  /** A question submitted from the homepage; the copilot opens already answered. */
  initialQuestion?: { text: string; key: number } | null;
  /** Collapses the floating chat panel. */
  onClose?: () => void;
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
const detectTopic = (lower: string, isRoleplayMode: boolean): AnswerTopic | null => {
  if (isRoleplayMode) return 'roleplay';
  if (lower.includes('food') || lower.includes('grocer') || lower.includes('despensa') || lower.includes('alimento') || lower.includes('maria')) return 'food';
  if (lower.includes('work') || lower.includes('retrain') || lower.includes('job') || lower.includes('daniel') || lower.includes('despido') || lower.includes('capacita')) return 'work';
  if (lower.includes('college') || lower.includes('sofia') || lower.includes('de anza') || lower.includes('tuition') || lower.includes('universidad') || lower.includes('matrícula') || lower.includes('colegiatura') || lower.includes('fafsa') || lower.includes('cadaa') || lower.includes('promise')) return 'college';
  if (lower.includes('teen') || lower.includes('anxiety') || lower.includes('mateo') || lower.includes('mental') || lower.includes('joven') || lower.includes('estrés') || lower.includes('confidencial')) return 'mental';
  if (lower.includes('senior') || lower.includes('rosa') || lower.includes('abuela') || lower.includes('lunch') || lower.includes('almuerzo') || lower.includes('mayor')) return 'senior';
  if (lower.includes('roleplay') || lower.includes('practice') || lower.includes('ensayar') || lower.includes('practicar')) return 'roleplay';
  return null;
};

/** Approved answer copy uses **emphasis** and dash bullets; render it without raw markup. */
const formatAnswerText = (text: string) =>
  text.split('\n').map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return null;
    const isBullet = /^[-•]\s+/.test(trimmed);
    const content = trimmed.replace(/^[-•]\s+/, '');
    return (
      <span key={index} className={isBullet ? 'cp-li' : 'cp-line'}>
        {content.split(/(\*\*[^*]+\*\*)/g).map((part, partIndex) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={partIndex}>{part.slice(2, -2)}</strong>
          ) : (
            part
          )
        )}
      </span>
    );
  });

export const AILLMConsole: React.FC<AILLMConsoleProps> = ({
  currentLanguage,
  userProfile,
  savedResourceIds = [],
  onSavePlanAction,
  onOpenInsights,
  onOpenArchitectureModal,
  onOpenDecoderModal,
  initialQuestion,
  onClose
}) => {
  const t = translations[currentLanguage];
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePersonaId, setActivePersonaId] = useState<string | null>(null);
  const [isRoleplayMode, setIsRoleplayMode] = useState(false);
  const streamRef = useRef<HTMLDivElement>(null);

  const greetingMessage: ChatMessage = {
      id: 'msg-init-1',
      sender: 'llm',
      text: currentLanguage === 'en'
        ? `Hi, I am the Web Assistant.\n\nI help Silicon Valley residents find free local programs. I can also explain confusing letters and help you practice a phone call. What do you need help with today?`
        : `Hola, soy el Copiloto Civic-LLM de WhatSack.\n\nAyudo a residentes de Silicon Valley a encontrar programas gratuitos. También explico cartas confusas y le ayudo a practicar una llamada. ¿En qué le puedo ayudar hoy?`,
      timestamp: 'Just now',
      followUpIds: [
        'ans-food-east-sj-groceries',
        'ans-work-tech-certificates',
        'ans-mental-confidential-teens',
        'ans-roleplay-intake-open'
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
    const topic = detectTopic(lower, isRoleplayMode);
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

  /** The message at the end of the feed — always the answer you just asked for. */
  const newestMessageRef = useRef<HTMLDivElement | null>(null);
  const newestMessageId = messages[messages.length - 1]?.id;

  /** Plan items the newest answer offers to save — kept in reach by the footer button. */
  const newestAnswer = [...messages].reverse().find((m) => m.sender === 'llm')?.scriptedAnswer;
  const newestSaveIds = newestAnswer
    ? Array.from(
        new Set(
          [newestAnswer.nextStep, ...(newestAnswer.nextSteps ?? [])]
            .flatMap((step) => step?.actions ?? [])
            .map((action) => (action.kind === 'save-plan' ? action.resourceId : null))
            .filter((id): id is string => Boolean(id))
        )
      )
    : [];
  const newestPlanSaved =
    newestSaveIds.length > 0 && newestSaveIds.every((id) => savedResourceIds.includes(id));

  const handleSaveCurrentPlan = () => {
    newestSaveIds.forEach((id) => {
      if (!savedResourceIds.includes(id)) onSavePlanAction?.(id);
    });
  };

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

  // Jump to the newest answer, so a question never leaves you reading the older reply.
  useEffect(() => {
    const stream = streamRef.current;
    const newest = newestMessageRef.current;
    if (!stream || !newest) return;

    const align = () => {
      const offset = newest.getBoundingClientRect().top - stream.getBoundingClientRect().top;
      stream.scrollTop = Math.max(0, stream.scrollTop + offset - 12);
    };

    align();
    // Cards and web fonts settle a moment later; keep the newest answer in place.
    const frame = requestAnimationFrame(align);
    const settle = window.setTimeout(align, 180);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
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

    // Scripted prototype: route the question to its approved answer, never a live model.
    setTimeout(() => {
      setMessages(prev => [...prev, buildAnswerMessage(resolveAnswer(text, Boolean(personaTag)))]);
      setIsGenerating(false);
    }, 900);
  };

  const handleExportChat = () => {
    const textContent = messages
      .map(m => `[${m.timestamp}] ${m.sender === 'user' ? (m.personaName || 'Resident') : 'Web Assistant'}:\n${m.text}\n`)
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
    <div className="cp">
      {/* Copilot bar */}
      <div className="cp-bar">
        <div className="qc-shell cp-bar-in">
          <div className="cp-id">
            <span className="cp-mark" aria-hidden="true">
              <Bot />
            </span>
            <div>
              <div className="cp-title-row">
                <h2 className="cp-title">{t.aiCopilot.title}</h2>
                <span className="cp-tag">{t.aiCopilot.badge}</span>
              </div>
              <p className="cp-status">{t.aiCopilot.systemStatus}</p>
            </div>
          </div>

          <div className="cp-actions">
            <button type="button" onClick={onOpenArchitectureModal} className="cp-ghost">
              <Brain aria-hidden="true" />
              <span className="hidden sm:inline">{t.aiCopilot.architectureButton}</span>
              <span className="sm:hidden">How it works</span>
            </button>

            <button type="button" onClick={onOpenDecoderModal} className="cp-ghost">
              <FileText aria-hidden="true" />
              <span className="hidden sm:inline">{t.aiCopilot.decoderButton}</span>
              <span className="sm:hidden">Decode letter</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRoleplayMode(!isRoleplayMode)}
              aria-pressed={isRoleplayMode}
              className={`cp-ghost ${isRoleplayMode ? 'on' : ''}`}
            >
              <PhoneCall aria-hidden="true" />
              <span>{t.aiCopilot.practiceRoleplay}</span>
            </button>

            <button
              type="button"
              onClick={handleExportChat}
              className="cp-icon"
              title={t.aiCopilot.exportChat}
              aria-label={t.aiCopilot.exportChat}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
            </button>

          </div>
        </div>
      </div>

      {/* Quick profile strip */}
      <div className="cp-profiles">
        <div className="qc-shell cp-profiles-in">
        <button
          type="button"
          onClick={() => handleFollowUpClick(saraCollegeStageIds.start)}
          className="cp-chip cp-chip--gold"
        >
          <Sparkles aria-hidden="true" />
          <span>{currentLanguage === 'en' ? "Start Sara's college story" : 'Iniciar la historia de Sara'}</span>
        </button>

        <span className="cp-profiles-label">
          {currentLanguage === 'en' ? 'Examples' : 'Ejemplos'}
        </span>

        {userProfile && (
          <button
            onClick={() => {
              setActivePersonaId(null);
              handleSendMessage(
                currentLanguage === 'en'
                  ? `My name is ${userProfile.name}. I live in ${userProfile.city}. ${userProfile.householdSize} people live in my home. We earn ${userProfile.monthlyIncome} a month. We need help with: ${userProfile.servicePriorities.join(', ')}. What programs can help us soon?`
                  : `Me llamo ${userProfile.name}. Vivo en ${userProfile.city}. En mi casa vivimos ${userProfile.householdSize} personas. Ganamos ${userProfile.monthlyIncome} al mes. Necesitamos ayuda con: ${userProfile.servicePriorities.join(', ')}. ¿Qué programas nos pueden ayudar pronto?`,
                userProfile.name
              );
            }}
            className="cp-chip cp-chip--solid"
          >
            <User aria-hidden="true" />
            <span>{currentLanguage === 'en' ? `Ask as ${userProfile.name}` : `Consultar como ${userProfile.name}`}</span>
          </button>
        )}

        {fictionalPersonas.map((persona) => (
          <button
            key={persona.id}
            type="button"
            onClick={() => handleSelectPersona(persona)}
            className={`cp-chip ${activePersonaId === persona.id ? 'on' : ''}`}
          >
            <img src={persona.avatarUrl} alt="" />
            <span>{persona.name} ({persona.age})</span>
          </button>
        ))}

        {activePersonaId && (
          <button type="button" onClick={() => setActivePersonaId(null)} className="cp-reset">
            {currentLanguage === 'en' ? 'Clear' : 'Quitar'}
          </button>
        )}
        </div>
      </div>

      {/* Conversation */}
      <div ref={streamRef} className="qc-shell cp-stream">
        <div className="cp-feed">
        {messages.map((msg) => {
          const isLlm = msg.sender === 'llm';

          return (
            <div
              key={msg.id}
              ref={msg.id === newestMessageId ? newestMessageRef : undefined}
              className={`cp-msg ${msg.sender === 'user' ? 'cp-msg--user' : 'cp-msg--llm'}`}
            >
              <div className="cp-meta">
                <span className="cp-who">
                  {msg.sender === 'user'
                    ? (msg.personaName || (currentLanguage === 'en' ? 'You' : 'Usted'))
                    : 'Web Assistant'}
                </span>
                <span className="cp-time">{msg.timestamp}</span>
              </div>

              <div className="cp-bubble">
                <p className="cp-text">{formatAnswerText(msg.text)}</p>

                {/* Grounded Resource Cards Preview */}
                {isLlm && msg.recommendedResourceIds && msg.recommendedResourceIds.length > 0 && (
                  <div className="cp-block">
                    <span className="cp-block-label">
                      {currentLanguage === 'en' ? 'Programs that match' : 'Programas relacionados'}
                    </span>
                    <div className="cp-res-grid">
                      {msg.recommendedResourceIds.map((resId) => {
                        const res = demonstrationResources.find(r => r.id === resId);
                        if (!res) return null;

                        return (
                          <div key={res.id} className="cp-res">
                            <div>
                              <div className="cp-res-top">
                                <span className="cp-res-cost">{res.costType}</span>
                                <span className="cp-res-city">{res.location.city}</span>
                              </div>
                              <h5 className="cp-res-title line-clamp-1">
                                {res.title[currentLanguage]}
                              </h5>
                              <p className="cp-res-org line-clamp-1">
                                {res.organization[currentLanguage]}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => onOpenInsights(res)}
                              className="cp-res-link"
                            >
                              <span>{t.resourceCard.viewInsights}</span>
                              <ArrowRight aria-hidden="true" />
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
                    hideSaveActions={msg.id === newestMessageId}
                  />
                )}

                {/* Suggested follow-ups — only answers that actually exist are shown */}
                {isLlm && !!msg.followUpIds?.length && (
                  <div className="cp-block">
                    <span className="cp-block-label">
                      {currentLanguage === 'en' ? 'Ask next' : 'Pregunte ahora'}
                    </span>
                    <div className="cp-sugg">
                      {resolveFollowUps(msg.followUpIds).map((followUp) => (
                        <button
                          key={followUp.id}
                          type="button"
                          onClick={() => handleFollowUpClick(followUp.id)}
                        >
                          {followUp.question[currentLanguage]}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Live generating state */}
        {isGenerating && (
          <div className="cp-think" role="status">
            <span className="cp-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>{t.aiCopilot.thinking}</span>
          </div>
        )}
        </div>
      </div>

      {/* Composer */}
      <div className="cp-composer">
        <div className="qc-shell">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="cp-form"
        >
          <label htmlFor="civic-copilot-input" className="sr-only">
            {isRoleplayMode 
              ? (currentLanguage === 'en' ? 'Type what you would say on the phone' : 'Escriba lo que diría por teléfono')
              : t.aiCopilot.chatPlaceholder}
          </label>
          <input
            id="civic-copilot-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isRoleplayMode 
              ? (currentLanguage === 'en' ? 'Type what you would say on the phone...' : 'Escriba lo que diría por teléfono...')
              : t.aiCopilot.chatPlaceholder
            }
            className="cp-input"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isGenerating}
            className="cp-send"
            aria-label={t.aiCopilot.send}
          >
            <span className="hidden sm:inline">{t.aiCopilot.send}</span>
            <Send aria-hidden="true" />
          </button>
        </form>

        <div className="cp-foot">
          <p className="cp-note">
            {currentLanguage === 'en'
              ? 'Answers come from demonstration records only. No personal data is collected or stored.'
              : 'Las respuestas vienen solo de registros de demostración. No se recopilan ni guardan datos personales.'}
          </p>

          {/* Lower-right corner controls: always in view, never scroll with the chat. */}
          {onSavePlanAction && (
            <button
              type="button"
              onClick={handleSaveCurrentPlan}
              disabled={newestSaveIds.length === 0 || newestPlanSaved}
              aria-pressed={newestPlanSaved}
              className="cp-icon cp-close--foot cp-save--foot"
              title={newestPlanSaved ? 'Saved to your plan' : 'Save to my plan'}
              aria-label={newestPlanSaved ? 'Saved to your plan' : 'Save to my plan'}
            >
              {newestPlanSaved ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <BookmarkPlus className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="cp-icon cp-close cp-close--foot"
              title={t.a11y.closeModal}
              aria-label={currentLanguage === 'en' ? 'Close the assistant' : 'Cerrar el asistente'}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};
