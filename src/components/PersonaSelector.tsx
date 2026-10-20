import React from 'react';
import { Persona, Language } from '../types';
import { fictionalPersonas } from '../data/personas';
import { translations } from '../data/translations';
import { 
  Compass, 
  MapPin, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  XCircle,
  MessageCircleQuestion
} from 'lucide-react';

interface PersonaSelectorProps {
  currentLanguage: Language;
  activePersonaId: string | null;
  onSelectPersona: (persona: Persona | null) => void;
  onSelectSampleQuestion: (question: string) => void;
  onOpenJourneyModal: (persona: Persona) => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  currentLanguage,
  activePersonaId,
  onSelectPersona,
  onSelectSampleQuestion,
  onOpenJourneyModal
}) => {
  const t = translations[currentLanguage];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>{currentLanguage === 'en' ? 'Community Stories & Navigation Pathways' : 'Historias Comunitarias y Rutas de Navegación'}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {t.personas.sectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1">
            {t.personas.sectionSubtitle}
          </p>
        </div>

        {activePersonaId && (
          <button
            onClick={() => onSelectPersona(null)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors self-start sm:self-auto"
          >
            <XCircle className="w-4 h-4" />
            <span>{t.personas.clearPersona}</span>
          </button>
        )}
      </div>

      {/* 5 Persona Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {fictionalPersonas.map((persona) => {
          const isActive = activePersonaId === persona.id;

          return (
            <div
              key={persona.id}
              className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                isActive
                  ? 'bg-indigo-50/50 border-indigo-600 shadow-lg ring-2 ring-indigo-500/30'
                  : 'bg-white hover:border-slate-300 border-slate-200 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Header with Avatar and Bio */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={persona.avatarUrl}
                    alt={persona.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-base text-slate-900">
                        {persona.name}
                      </h3>
                      <span className="text-xs font-semibold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {persona.age}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="truncate">{persona.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs font-semibold text-indigo-900 mb-2 leading-snug">
                  {persona.tagline[currentLanguage]}
                </p>

                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3 mb-3">
                  {persona.background[currentLanguage]}
                </p>

                {/* Primary Barrier Badge */}
                <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200/60 mb-3 text-[11px] text-amber-900 flex items-start gap-1.5">
                  <span className="font-bold shrink-0">⚠️ {currentLanguage === 'en' ? 'Barrier:' : 'Barrera:'}</span>
                  <span className="line-clamp-2">{persona.barriers[0][currentLanguage]}</span>
                </div>

                {/* Interactive Sample Inquiries */}
                <div className="space-y-1.5 mb-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <MessageCircleQuestion className="w-3 h-3" />
                    <span>{currentLanguage === 'en' ? 'Sample Questions' : 'Preguntas de Prueba'}</span>
                  </div>
                  {persona.sampleQuestions.slice(0, 2).map((q, qIdx) => (
                    <button
                      key={qIdx}
                      type="button"
                      onClick={() => {
                        onSelectPersona(persona);
                        onSelectSampleQuestion(q[currentLanguage]);
                      }}
                      className="w-full text-left text-[11px] p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200/80 text-slate-700 hover:text-emerald-900 transition-colors line-clamp-2"
                      title="Click to ask this question"
                    >
                      "{q[currentLanguage]}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectPersona(isActive ? null : persona)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs'
                  }`}
                >
                  {isActive ? t.personas.activePersona : t.personas.viewPersonaProfile}
                </button>

                <button
                  type="button"
                  onClick={() => onOpenJourneyModal(persona)}
                  className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-transform hover:scale-105"
                  title={t.personas.viewJourney}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
