import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { collegeScenarioSteps } from '../data/collegeScenario';
import { ArrowLeft, Bot, ListChecks, RotateCcw, User } from 'lucide-react';

interface CollegePathwayDemoProps {
  currentLanguage: Language;
  onExit: () => void;
}

const stepsById = new Map(collegeScenarioSteps.map((step) => [step.id, step]));

export const CollegePathwayDemo: React.FC<CollegePathwayDemoProps> = ({ currentLanguage, onExit }) => {
  const lang = currentLanguage;
  const isEn = currentLanguage === 'en';
  const [path, setPath] = useState<string[]>([collegeScenarioSteps[0].id]);
  const [finished, setFinished] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const activeStep = stepsById.get(path[path.length - 1]) ?? collegeScenarioSteps[0];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [path, finished]);

  const handleOption = (next: string | null) => {
    if (!next) {
      setFinished(true);
      return;
    }
    setPath((prev) => [...prev, next]);
  };

  const restart = () => {
    setPath([collegeScenarioSteps[0].id]);
    setFinished(false);
  };

  return (
    <div className="space-y-6">
      {/* Demo header */}
      <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            {isEn ? 'Scripted demo' : 'Demostración guionizada'}
          </span>
          <h3 className="text-sm font-extrabold text-white">
            {isEn ? "Sara's college pathway" : 'El camino universitario de Sara'}
          </h3>
          <p className="text-[11px] text-slate-400">
            {isEn
              ? 'A fixed scripted conversation. Choose a next-step option to continue.'
              : 'Una conversación guionizada y fija. Elija una opción para continuar.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-300 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1">
            {activeStep.id.toUpperCase()} · {path.length}/{collegeScenarioSteps.length}
          </span>
          <button
            onClick={restart}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label={isEn ? 'Restart demo' : 'Reiniciar demostración'}
            title={isEn ? 'Restart demo' : 'Reiniciar demostración'}
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={onExit}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isEn ? 'Back to Copilot' : 'Volver al Copiloto'}</span>
          </button>
        </div>
      </div>

      {/* Scripted transcript */}
      {path.map((id, index) => {
        const step = stepsById.get(id);
        if (!step) return null;
        const isActive = index === path.length - 1;

        return (
          <div key={`${id}-${index}`} className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <ListChecks className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{step.id.toUpperCase()}</span>
              <span aria-hidden="true">·</span>
              <span>{step.title[lang]}</span>
            </div>

            {/* Sara */}
            <div className="flex justify-end gap-3">
              <div className="max-w-lg rounded-2xl bg-slate-800 border border-slate-700 p-3.5 text-xs sm:text-sm leading-relaxed text-slate-100">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Sara
                </span>
                {step.sara[lang]}
              </div>
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
                <User className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>

            {/* WhatSack */}
            <div className="flex justify-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="max-w-xl rounded-2xl bg-emerald-950/50 border border-emerald-800/60 p-3.5 text-xs sm:text-sm leading-relaxed text-slate-100">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-1">
                  WhatSack
                </span>
                {step.whatsack[lang]}
              </div>
            </div>

            {/* Next-step options */}
            {isActive && !finished && (
              <div className="pl-11">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {isEn ? 'Next-step options' : 'Opciones de siguiente paso'}
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {step.options.map((option) => (
                    <button
                      key={option.en}
                      type="button"
                      onClick={() => handleOption(option.next)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-700 hover:border-indigo-500 text-xs font-semibold transition-colors text-left"
                    >
                      {option[lang]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {finished && (
        <div className="rounded-2xl border border-emerald-800/60 bg-emerald-950/40 p-4">
          <p className="text-xs sm:text-sm leading-relaxed text-slate-100">
            {isEn
              ? 'That is the end of this scripted demo. The resource directory below has the details on the colleges and programs mentioned above.'
              : 'Aquí termina esta demostración guionizada. El directorio de recursos tiene los detalles de los colegios y programas mencionados.'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={restart}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              {isEn ? 'Run demo again' : 'Repetir demostración'}
            </button>
            <button
              type="button"
              onClick={onExit}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
            >
              {isEn ? 'Back to Copilot' : 'Volver al Copiloto'}
            </button>
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
};
