import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onSelectVoiceQuery: (query: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectVoiceQuery
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingResponse, setIsSpeakingResponse] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiSpokenResponse, setAiSpokenResponse] = useState('');

  const t = translations[currentLanguage];

  const simulatedVoiceOptions = [
    {
      label: currentLanguage === 'en' ? 'Maria (Food)' : 'María (Alimentos)',
      spoken: currentLanguage === 'en'
        ? 'Where can I get groceries in East San Jose without showing an ID or SSN?'
        : '¿Dónde puedo conseguir despensa en el Este de San José sin mostrar identificación ni Seguro Social?',
      response: currentLanguage === 'en'
        ? 'I found Sacred Heart Community Service Saturday pantry and Second Harvest Mobile Produce in East San Jose. Neither requires state ID, SSN, or income verification. You can walk in this Saturday at 9:00 AM.'
        : 'Encontré la despensa de los sábados de Sacred Heart y el Mercado Móvil de Second Harvest en el Este de San José. Ninguno pide ID estatal, Seguro Social ni comprobante de ingresos. Puede acudir este sábado a las 9:00 AM.'
    },
    {
      label: currentLanguage === 'en' ? 'Mateo (Mental Health)' : 'Mateo (Salud Mental)',
      spoken: currentLanguage === 'en'
        ? 'Is there a free confidential text line for teens feeling overwhelmed in Sunnyvale?'
        : '¿Hay una línea de texto gratuita y confidencial para jóvenes en Sunnyvale?',
      response: currentLanguage === 'en'
        ? 'Yes. You can text HOPE to 844-555-TEEN 24/7. It is 100% free, anonymous, and California law protects your privacy without notifying your school or parents.'
        : 'Sí. Puedes enviar un mensaje de texto con la palabra HOPE al 844-555-TEEN las 24 horas. Es gratuito, anónimo y la ley de California protege tu privacidad sin avisar a tu escuela.'
    },
    {
      label: currentLanguage === 'en' ? 'Daniel (Workforce)' : 'Daniel (Trabajo)',
      spoken: currentLanguage === 'en'
        ? 'How can a laid-off manufacturing worker get free cloud IT certificates in Santa Clara County?'
        : '¿Cómo puede un trabajador manufacturero despedido obtener cursos de IT gratuitos en Santa Clara?',
      response: currentLanguage === 'en'
        ? 'Under the WIOA dislocated worker program at NOVAworks in Sunnyvale, you qualify for up to $8,000 in tuition vouchers for CompTIA or AWS cloud certificates, while keeping your EDD unemployment benefits.'
        : 'Bajo el programa de trabajadores desplazados de NOVAworks en Sunnyvale, usted califica para un vale de hasta $8,000 para certificados CompTIA o AWS, manteniendo sus cheques de desempleo del EDD.'
    },
    {
      label: currentLanguage === 'en' ? 'Rosa (Senior Program)' : 'Rosa (Adultos Mayores)',
      spoken: currentLanguage === 'en'
        ? 'Where are Spanish-language senior clubs with hot lunch in Redwood City?'
        : '¿Dónde hay clubes de la tercera edad en español con almuerzo caliente en Redwood City?',
      response: currentLanguage === 'en'
        ? 'Casa Círculo Cultural in Redwood City has a Spanish senior circle on Tuesdays and Thursdays with hot lunch, chair yoga, and free door-to-door Redi-Wheels van rides.'
        : 'Casa Círculo Cultural en Redwood City tiene un círculo de abuelitos en español los martes y jueves con almuerzo caliente, yoga en silla y transporte en camioneta Redi-Wheels gratis.'
    }
  ];

  // Stop speech if modal closes or handle Escape key
  useEffect(() => {
    if (!isOpen) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsListening(false);
      setIsSpeakingResponse(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSimulateVoiceInput = (option: typeof simulatedVoiceOptions[0]) => {
    setIsListening(true);
    setTranscript('');
    setAiSpokenResponse('');

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setTimeout(() => {
      setTranscript(option.spoken);
      setIsListening(false);
      setAiSpokenResponse(option.response);

      // Play audio TTS
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(option.response);
        utterance.lang = currentLanguage === 'es' ? 'es-US' : 'en-US';
        utterance.rate = 1.0;
        utterance.onstart = () => setIsSpeakingResponse(true);
        utterance.onend = () => setIsSpeakingResponse(false);
        utterance.onerror = () => setIsSpeakingResponse(false);
        window.speechSynthesis.speak(utterance);
      }
    }, 1200);
  };

  const handleToggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    // Attempt real Web Speech API if supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = currentLanguage === 'es' ? 'es-US' : 'en-US';
        recognition.interimResults = true;
        recognition.onstart = () => {
          setIsListening(true);
          setTranscript(currentLanguage === 'en' ? 'Listening to your voice...' : 'Escuchando su voz...');
        };
        recognition.onresult = (event: any) => {
          const currentTranscript = event.results[0][0].transcript;
          setTranscript(currentTranscript);
        };
        recognition.onend = () => {
          setIsListening(false);
          if (transcript) {
            setAiSpokenResponse(
              currentLanguage === 'en'
                ? `I analyzed your inquiry: "${transcript}". Connecting you to verified Silicon Valley resources with zero required ID.`
                : `Analicé su consulta: "${transcript}". Conectándolo con recursos verificados en Silicon Valley sin requisito de identificación.`
            );
          }
        };
        recognition.onerror = () => {
          setIsListening(false);
          // Fallback to simulation
          handleSimulateVoiceInput(simulatedVoiceOptions[0]);
        };
        recognition.start();
        return;
      } catch (err) {
        console.warn('SpeechRecognition failed, falling back to simulated voice', err);
      }
    }

    // Default simulation fallback
    handleSimulateVoiceInput(simulatedVoiceOptions[0]);
  };

  const handleApplyToSearch = () => {
    if (transcript) {
      onSelectVoiceQuery(transcript);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-300 relative overflow-hidden flex flex-col focus:outline-hidden">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-2xl border border-emerald-300">
              <Mic className="w-6 h-6 text-emerald-700" aria-hidden="true" />
            </div>
            <div>
              <h2 id="voice-modal-title" className="text-xl font-extrabold text-slate-900">
                {t.voice.modalTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-0.5 font-medium">
                {t.voice.modalSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600"
            aria-label={currentLanguage === 'en' ? 'Close voice assistant' : 'Cerrar asistente de voz'}
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Dynamic Soundwave Visualizer / Microphone Center */}
        <div className="flex flex-col items-center justify-center py-6 bg-slate-50 rounded-2xl border border-slate-300 mb-6">
          <div className="relative mb-4">
            <button
              type="button"
              onClick={handleToggleListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-105 min-h-[44px] min-w-[44px] focus-visible:ring-4 focus-visible:ring-emerald-400 ${
                isListening
                  ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-200'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800 ring-8 ring-emerald-100'
              }`}
              title={isListening ? 'Stop listening' : 'Start listening'}
              aria-label={isListening ? 'Stop microphone' : 'Start microphone simulation'}
            >
              {isListening ? (
                <MicOff className="w-8 h-8" aria-hidden="true" />
              ) : (
                <Mic className="w-8 h-8" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Soundwave Bars */}
          <div className="flex items-center gap-1.5 h-8" aria-hidden="true">
            {[4, 12, 24, 16, 28, 8, 20, 14, 26, 6].map((h, idx) => (
              <span
                key={idx}
                className={`w-1.5 rounded-full transition-all duration-200 ${
                  isListening || isSpeakingResponse
                    ? 'bg-emerald-600 soundwave-bar'
                    : 'bg-slate-300'
                }`}
                style={{
                  height: isListening || isSpeakingResponse ? `${h}px` : '4px',
                  animationDelay: `${idx * 0.1}s`
                }}
              />
            ))}
          </div>

          <p className="text-xs font-bold text-slate-700 mt-3" aria-live="polite">
            {isListening ? t.voice.listeningState : t.voice.clickToTalk}
          </p>
        </div>

        {/* Transcript Box */}
        {transcript && (
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 text-xs sm:text-sm text-slate-900 mb-4">
            <span className="font-extrabold text-slate-700 uppercase tracking-wider text-xs block mb-1">
              {currentLanguage === 'en' ? 'Your Spoken Query:' : 'Su Consulta Hablada:'}
            </span>
            <p className="font-bold text-slate-950">"{transcript}"</p>
          </div>
        )}

        {/* AI Spoken Audio Response Box */}
        {aiSpokenResponse && (
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-xs sm:text-sm text-emerald-950 mb-6" aria-live="polite">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-extrabold text-emerald-950 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span>{t.voice.simulatedResponse}</span>
              </span>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 border border-emerald-300">
                {isSpeakingResponse ? t.voice.playing : 'Ready'}
              </span>
            </div>
            <p className="leading-relaxed font-semibold">
              {aiSpokenResponse}
            </p>
          </div>
        )}

        {/* Sample Voice Prompts (Simulated presets) */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
            {t.voice.sampleVoicePrompts}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
            {simulatedVoiceOptions.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSimulateVoiceInput(opt)}
                className="p-3 rounded-2xl border border-slate-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/60 text-left text-xs transition-colors shadow-2xs min-h-[48px] focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <div className="font-extrabold text-emerald-900 text-xs mb-0.5 flex items-center gap-1">
                  <span>🎙️</span>
                  <span>{opt.label}</span>
                </div>
                <div className="text-xs text-slate-700 font-medium line-clamp-1">
                  "{opt.spoken}"
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {transcript && (
          <button
            type="button"
            onClick={handleApplyToSearch}
            className="w-full min-h-[44px] py-3 px-5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-900"
          >
            <span>{currentLanguage === 'en' ? 'Search WhatSack with this Voice Query' : 'Buscar en WhatSack con esta Consulta'}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};
