import React, { useEffect, useRef, useState } from 'react';
import { Mic, Send, Volume2 } from 'lucide-react';
import { copy } from '../i18n';
import type { QuickReply, UiLanguage } from '../types';

export interface CommunityMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  quickReplies?: QuickReply[];
}

interface CommunityChatProps {
  language: UiLanguage;
  messages: CommunityMessage[];
  onSend: (text: string) => void;
  onQuickReply: (reply: QuickReply) => void;
  isThinking?: boolean;
}

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
};

export const CommunityChat: React.FC<CommunityChatProps> = ({
  language,
  messages,
  onSend,
  onQuickReply,
  isThinking = false
}) => {
  const c = copy[language];
  const [input, setInput] = useState('');
  const [notice, setNotice] = useState('');
  const [listening, setListening] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isThinking]);

  const speechCtor =
    typeof window !== 'undefined'
      ? ((window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike })
          .SpeechRecognition ??
        (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition)
      : undefined;
  const speechOutputSupported =
    typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined';

  const startListening = () => {
    if (!speechCtor) {
      setNotice(c.voiceUnavailable);
      return;
    }
    try {
      const recognition = new speechCtor();
      recognition.lang = language === 'es' ? 'es-US' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event) => {
        const transcript = event.results[0]?.[0]?.transcript ?? '';
        // Voice fills the text box; the person can edit before sending, so a
        // microphone is never the only way to use the guide.
        setInput(transcript);
        setNotice('');
      };
      recognition.onerror = () => {
        setNotice(c.voiceUnavailable);
        setListening(false);
      };
      recognition.onend = () => setListening(false);
      recognition.start();
      setListening(true);
      setNotice('');
    } catch {
      setNotice(c.voiceUnavailable);
      setListening(false);
    }
  };

  const speak = (text: string) => {
    if (!speechOutputSupported) {
      setNotice(c.voiceUnavailable);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'es' ? 'es-US' : 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setNotice('');
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    onSend(value);
    setInput('');
  };

  return (
    <section
      aria-labelledby="community-chat-heading"
      className="flex h-full w-full min-w-0 flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div>
        <h2 id="community-chat-heading" className="text-xl font-extrabold tracking-[-0.02em] text-slate-900">
          {c.chatTitle}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{c.chatHint}</p>
      </div>

      <div
        className="mt-4 max-h-[26rem] min-w-0 flex-1 space-y-4 overflow-y-auto overflow-x-hidden pr-1"
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {messages.map((message) => (
          <div key={message.id} className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div
              className={`max-w-[36rem] rounded-2xl px-4 py-3 text-base leading-relaxed ${
                message.role === 'user'
                  ? 'bg-emerald-700 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-900'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{message.text}</p>

              {message.role === 'assistant' && speechOutputSupported && (
                <button
                  type="button"
                  onClick={() => speak(message.text)}
                  className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-1.5 py-2 text-sm font-bold text-emerald-800 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                >
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                  {c.voiceOutput}
                </button>
              )}

              {message.quickReplies && message.quickReplies.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.quickReplies.map((reply) => (
                    <button
                      key={reply.id}
                      type="button"
                      onClick={() => onQuickReply(reply)}
                      className="min-h-[44px] rounded-xl border border-emerald-700 bg-white px-3 py-2 text-left text-sm font-bold text-emerald-900 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                    >
                      {reply.label[language]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <p className="text-sm font-semibold text-slate-600" role="status">
            {language === 'en' ? 'Looking through community options…' : 'Buscando opciones comunitarias…'}
          </p>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={submit} className="mt-4 border-t border-slate-200 pt-4">
        <label htmlFor="community-chat-input" className="sr-only">
          {c.placeholder}
        </label>
        <div className="flex items-center gap-2">
          <input
            id="community-chat-input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={c.placeholder}
            autoComplete="off"
            className="min-w-0 flex-1 min-h-[48px] rounded-2xl border-2 border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-500 focus:border-emerald-700 focus:outline-none"
          />
          {speechCtor && (
            <button
              type="button"
              onClick={startListening}
              aria-pressed={listening}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-emerald-700 bg-white text-emerald-800 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              aria-label={c.voiceInput}
              title={c.voiceInput}
            >
              <Mic className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            aria-label={c.send}
            title={c.send}
            className="inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            <span className="hidden sm:inline">{c.send}</span>
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        {listening && (
          <p className="mt-2 text-sm font-semibold text-emerald-800" role="status">
            {c.listening}
          </p>
        )}
        {notice && (
          <p className="mt-2 text-sm text-slate-700" role="status">
            {notice}
          </p>
        )}
      </form>
    </section>
  );
};
