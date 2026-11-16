import { useCallback, useRef } from 'react';
import { useState } from 'react';

type Lang = 'en' | 'es';

function speechRecognitionCtor(): any {
  if (typeof window === 'undefined') return null;
  const anyWindow = window as any;
  return anyWindow.SpeechRecognition ?? anyWindow.webkitSpeechRecognition ?? null;
}

/**
 * Optional voice input/output. Every voice feature has a text equivalent: the
 * textarea always works, and replies are always rendered as text.
 */
export function useSpeech(language: Lang) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const speechSupported = typeof window !== 'undefined' && Boolean(speechRecognitionCtor());
  const synthesisSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const listen = useCallback(
    (onResult: (text: string) => void) => {
      const Ctor = speechRecognitionCtor();
      if (!Ctor) return;
      if (isListening) {
        recognitionRef.current?.stop();
        setIsListening(false);
        return;
      }
      const recognition = new Ctor();
      recognition.lang = language === 'es' ? 'es-ES' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onresult = (event: any) => {
        const text = event?.results?.[0]?.[0]?.transcript ?? '';
        if (text) onResult(text);
      };
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    },
    [isListening, language]
  );

  const speak = useCallback(
    (text: string) => {
      if (!synthesisSupported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    },
    [language, synthesisSupported]
  );

  const stopSpeaking = useCallback(() => {
    if (!synthesisSupported) return;
    window.speechSynthesis.cancel();
  }, [synthesisSupported]);

  return { isListening, speechSupported, synthesisSupported, listen, speak, stopSpeaking };
}
