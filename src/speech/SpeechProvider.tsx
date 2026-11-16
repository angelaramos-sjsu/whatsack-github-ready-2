import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import type { Language } from '../types';

/** The kinds of content a visitor can choose to hear. */
export type SpeechKind = 'heading' | 'instructions' | 'chat' | 'resource' | 'navigation';

export interface SpeechItem {
  id: string;
  label: string;
  text: string;
  kind: SpeechKind;
}

export type SpeechStatus = 'idle' | 'playing' | 'paused';

export const speechKindLabels: Record<SpeechKind, { en: string; es: string }> = {
  heading: { en: 'Headings', es: 'Encabezados' },
  instructions: { en: 'Instructions', es: 'Instrucciones' },
  chat: { en: 'Chatbot responses', es: 'Respuestas del chat' },
  resource: { en: 'Resource information', es: 'Información de recursos' },
  navigation: { en: 'Buttons and navigation', es: 'Botones y navegación' }
};

interface SpeechContextValue {
  supported: boolean;
  status: SpeechStatus;
  current: SpeechItem | null;
  items: SpeechItem[];
  /** Set when the browser could not start speaking (for example, no voice installed). */
  problem: string | null;
  registerItem: (item: SpeechItem) => void;
  unregisterItem: (id: string) => void;
  toggleItem: (item: SpeechItem) => void;
  speakItem: (item: SpeechItem) => void;
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  restart: () => void;
}

const SpeechContext = createContext<SpeechContextValue | null>(null);

const supportsSpeech = (): boolean =>
  typeof window !== 'undefined' && 'speechSynthesis' in window;

/** Prefer the clearest installed voice, then any installed voice for the language. */
const PREFERRED_VOICE = /natural|neural|enhanced|premium|google|samantha|aria|jenny|guy|libby|sonia|allison|ava|serena|zoe|karen|moira|daniel|paulina|monica/i;

const pickVoice = (voices: SpeechSynthesisVoice[], lang: string): SpeechSynthesisVoice | null => {
  if (voices.length === 0) return null;
  const base = lang.slice(0, 2).toLowerCase();
  const matching = voices.filter((voice) => voice.lang.replace('_', '-').toLowerCase().startsWith(base));
  const pool = matching.length > 0 ? matching : voices;
  return (
    pool.find((voice) => PREFERRED_VOICE.test(voice.name) && voice.localService) ??
    pool.find((voice) => PREFERRED_VOICE.test(voice.name)) ??
    pool.find((voice) => voice.localService) ??
    pool[0] ??
    null
  );
};

interface SpeechProviderProps {
  language: Language;
  /** Changing this (for example a page change) stops any speech in progress. */
  resetKey?: string;
  children: React.ReactNode;
}

/**
 * One shared read-aloud controller: only one passage can play at a time, and
 * every control (play, pause, resume, stop, restart) acts on that passage.
 */
export const SpeechProvider: React.FC<SpeechProviderProps> = ({ language, resetKey, children }) => {
  const supported = supportsSpeech();
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [current, setCurrent] = useState<SpeechItem | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [items, setItems] = useState<SpeechItem[]>([]);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentRef = useRef<SpeechItem | null>(null);

  useEffect(() => {
    if (!supported) return;
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const available = synth.getVoices();
      if (available.length > 0) voicesRef.current = available;
    };
    loadVoices();
    synth.addEventListener('voiceschanged', loadVoices);
    return () => {
      synth.removeEventListener('voiceschanged', loadVoices);
      synth.cancel();
    };
  }, [supported]);

  const stop = useCallback(() => {
    utteranceRef.current = null;
    currentRef.current = null;
    setCurrent(null);
    setProblem(null);
    setStatus('idle');
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  const startItem = useCallback(
    (item: SpeechItem) => {
      if (!supported) return;
      const synth = window.speechSynthesis;
      // Never let two passages play over each other.
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(item.text);
      utterance.lang = language === 'es' ? 'es-US' : 'en-US';
      const voice = pickVoice(voicesRef.current, utterance.lang);
      if (voice) utterance.voice = voice;
      utterance.rate = 0.95;
      utterance.pitch = 1;

      const finish = () => {
        if (utteranceRef.current !== utterance) return;
        utteranceRef.current = null;
        currentRef.current = null;
        setCurrent(null);
        setProblem(null);
        setStatus('idle');
      };
      utterance.onend = finish;
      utterance.onerror = (event) => {
        if (utteranceRef.current !== utterance) return;
        // A failed start (often no installed voice) should say so, not go silent.
        utteranceRef.current = null;
        setStatus('idle');
        if (event.error === 'interrupted' || event.error === 'canceled') {
          finish();
          return;
        }
        setProblem(
          language === 'es'
            ? 'No se pudo iniciar la lectura en este navegador. El texto sigue visible abajo.'
            : 'Read aloud could not start in this browser. The text stays visible below.'
        );
      };

      utteranceRef.current = utterance;
      currentRef.current = item;
      setCurrent(item);
      setProblem(null);
      setStatus('playing');
      synth.speak(utterance);
    },
    [language, supported]
  );

  const pause = useCallback(() => {
    if (!supported || !utteranceRef.current) return;
    window.speechSynthesis.pause();
    setStatus('paused');
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported || !utteranceRef.current) return;
    window.speechSynthesis.resume();
    setStatus('playing');
  }, [supported]);

  const play = useCallback(() => {
    const item = currentRef.current;
    if (!item) return;
    if (status === 'paused') {
      resume();
      return;
    }
    startItem(item);
  }, [resume, startItem, status]);

  const restart = useCallback(() => {
    const item = currentRef.current;
    if (item) startItem(item);
  }, [startItem]);

  const toggleItem = useCallback(
    (item: SpeechItem) => {
      const activeItem = currentRef.current;
      if (activeItem?.id === item.id) {
        if (status === 'playing') {
          pause();
          return;
        }
        if (status === 'paused') {
          resume();
          return;
        }
      }
      startItem(item);
    },
    [pause, resume, startItem, status]
  );

  const registerItem = useCallback((item: SpeechItem) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing && existing.label === item.label && existing.text === item.text && existing.kind === item.kind) {
        return prev;
      }
      return [...prev.filter((entry) => entry.id !== item.id), item];
    });
  }, []);

  const unregisterItem = useCallback(
    (id: string) => {
      setItems((prev) => (prev.some((entry) => entry.id === id) ? prev.filter((entry) => entry.id !== id) : prev));
      if (currentRef.current?.id === id) stop();
    },
    [stop]
  );

  // A new page, view or language resets speech so nothing keeps reading stale content.
  const languageRef = useRef(language);
  const resetKeyRef = useRef(resetKey);
  useEffect(() => {
    const languageChanged = languageRef.current !== language;
    const pageChanged = resetKeyRef.current !== resetKey;
    languageRef.current = language;
    resetKeyRef.current = resetKey;
    if (languageChanged || pageChanged) stop();
  }, [language, resetKey, stop]);

  const value = useMemo<SpeechContextValue>(
    () => ({
      supported,
      status,
      current,
      items,
      problem,
      registerItem,
      unregisterItem,
      toggleItem,
      speakItem: startItem,
      play,
      pause,
      resume,
      stop,
      restart
    }),
    [
      supported,
      status,
      current,
      items,
      problem,
      registerItem,
      unregisterItem,
      toggleItem,
      startItem,
      play,
      pause,
      resume,
      stop,
      restart
    ]
  );

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
};

export const useSpeech = (): SpeechContextValue => {
  const context = useContext(SpeechContext);
  if (!context) throw new Error('useSpeech must be used inside SpeechProvider');
  return context;
};
