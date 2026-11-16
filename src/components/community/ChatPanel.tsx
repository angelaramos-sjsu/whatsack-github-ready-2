import React, { useEffect, useRef } from 'react';
import { ConnectorChatMessage, UiLanguage } from '../../community/types';
import { connectorCopy } from '../../community/copy';
import { Bot, CheckCircle2, Mic, MicOff, Send, Volume2, VolumeX } from 'lucide-react';

interface ChatPanelProps {
  uiLanguage: UiLanguage;
  messages: ConnectorChatMessage[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onChip: (chip: string) => void;
  onOpenIntake: () => void;
  readAloud: boolean;
  onToggleReadAloud: () => void;
  speechSupported: boolean;
  synthesisSupported: boolean;
  isListening: boolean;
  onToggleListening: () => void;
}

/**
 * Reusable chat surface for the community connector. It renders the transcript,
 * quick-answer chips and the text input; all behaviour is passed in, so the
 * component can be reused or tested with fixture messages.
 */
export const ChatPanel: React.FC<ChatPanelProps> = ({
  uiLanguage,
  messages,
  input,
  onInputChange,
  onSend,
  onChip,
  onOpenIntake,
  readAloud,
  onToggleReadAloud,
  speechSupported,
  synthesisSupported,
  isListening,
  onToggleListening
}) => {
  const c = connectorCopy[uiLanguage];
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [messages]);

  return (
    <section aria-labelledby="connector-chat-heading" className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <h2 id="connector-chat-heading" className="flex items-center gap-2 text-base font-extrabold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-700 text-white" aria-hidden="true">
            <Bot className="h-4 w-4" />
          </span>
          {c.chatTitle}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          {synthesisSupported && (
            <button
              type="button"
              onClick={onToggleReadAloud}
              aria-pressed={readAloud}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 px-3 py-2 text-xs font-extrabold ${
                readAloud
                  ? 'border-purple-700 bg-purple-50 text-purple-950'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
              }`}
            >
              {readAloud ? <Volume2 className="h-4 w-4" aria-hidden="true" /> : <VolumeX className="h-4 w-4" aria-hidden="true" />}
              {readAloud ? c.readAloudOn : c.readAloud}
            </button>
          )}
          <button
            type="button"
            onClick={onOpenIntake}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 border-purple-700 bg-white px-3 py-2 text-xs font-extrabold text-purple-900 hover:bg-purple-50"
          >
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {c.startIntake}
          </button>
        </div>
      </div>

      <div
        role="log"
        aria-live="polite"
        aria-relevant="additions text"
        aria-label={c.liveRegion}
        className="max-h-[460px] space-y-4 overflow-y-auto p-4 sm:p-5"
      >
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-2.5 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'assistant' && (
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-900" aria-hidden="true">
                🌱
              </span>
            )}
            <div
              className={`max-w-[52rem] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-purple-700 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-900'
              }`}
            >
              <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
              {message.chips && message.chips.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {message.chips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => onChip(chip)}
                      className="min-h-[40px] rounded-lg border border-purple-300 bg-white px-3 py-1.5 text-left text-xs font-bold text-purple-900 hover:bg-purple-50"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
        className="border-t border-slate-200 p-3 sm:p-4"
      >
        <label htmlFor="connector-chat-input" className="sr-only">
          {c.chatPlaceholder}
        </label>
        <div className="flex flex-wrap items-end gap-2">
          <input
            id="connector-chat-input"
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder={c.chatPlaceholder}
            className="min-h-[52px] flex-1 rounded-xl border-2 border-slate-300 px-3 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-500"
          />
          {speechSupported ? (
            <button
              type="button"
              onClick={onToggleListening}
              aria-pressed={isListening}
              className={`inline-flex min-h-[52px] items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-xs font-extrabold ${
                isListening
                  ? 'border-red-500 bg-red-50 text-red-800'
                  : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
              }`}
            >
              <Mic className="h-4 w-4" aria-hidden="true" />
              <span>{isListening ? c.listening : c.voiceInput}</span>
            </button>
          ) : (
            <span className="inline-flex min-h-[52px] max-w-[220px] items-center gap-2 rounded-xl border border-dashed border-slate-300 px-3 py-2 text-[11px] font-bold text-slate-600">
              <MicOff className="h-4 w-4" aria-hidden="true" />
              <span>{c.voiceUnsupported}</span>
            </span>
          )}
          <button
            type="submit"
            disabled={!input.trim()}
            className="inline-flex min-h-[52px] items-center gap-2 rounded-xl bg-purple-700 px-5 py-2.5 text-sm font-extrabold text-white hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {c.send}
          </button>
        </div>
        <p className="mt-2 text-xs font-semibold text-slate-600">
          {uiLanguage === 'en'
            ? 'You can type instead of speaking. Replies are always shown as text.'
            : 'Puede escribir en lugar de hablar. Las respuestas siempre se muestran como texto.'}
        </p>
      </form>
    </section>
  );
};
