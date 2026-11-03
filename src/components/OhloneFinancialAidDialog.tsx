import React, { useEffect, useRef } from 'react';
import { X, Phone, Mail, MapPin, Clock, CalendarDays, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { ohloneAid } from '../data/ohloneFinancialAid';

interface OhloneFinancialAidDialogProps {
  currentLanguage: Language;
  onClose: () => void;
}

const sectionHeading = 'text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2';

export const OhloneFinancialAidDialog: React.FC<OhloneFinancialAidDialogProps> = ({ currentLanguage, onClose }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const en = currentLanguage === 'en';

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Move focus into the dialog on open and return it to the opener on close (runs once)
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    headingRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      opener?.focus();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ohlone-aid-heading"
        className="bg-white rounded-3xl border-2 border-slate-300 shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4 shrink-0">
          <div>
            <h2
              id="ohlone-aid-heading"
              ref={headingRef}
              tabIndex={-1}
              className="text-xl sm:text-2xl font-extrabold tracking-tight focus:outline-hidden"
            >
              {en ? 'Ohlone College Financial Aid' : 'Ayuda Financiera de Ohlone College'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">{ohloneAid.intro}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={en ? 'Close financial aid guide (Esc)' : 'Cerrar guía de ayuda financiera (Esc)'}
            className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto p-5 sm:p-7 space-y-7 text-slate-900">
          <section aria-labelledby="aid-what">
            <h3 id="aid-what" className={sectionHeading}>{en ? 'What is financial aid?' : '¿Qué es la ayuda financiera?'}</h3>
            <p className="text-sm leading-relaxed">{ohloneAid.whatIs}</p>
            <a
              href={ohloneAid.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-sm font-extrabold text-emerald-800 hover:text-emerald-950 underline min-h-[44px]"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              {en ? `Policies, deadlines & disbursement schedules: ${ohloneAid.website}` : `Políticas, fechas límite y calendarios de pago: ${ohloneAid.website}`}
            </a>
          </section>

          <section aria-labelledby="aid-deadline" className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300">
            <h3 id="aid-deadline" className={`${sectionHeading} flex items-center gap-2`}>
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              {en ? 'When to apply' : 'Cuándo solicitar'}
            </h3>
            <p className="text-sm leading-relaxed">{ohloneAid.deadline}</p>
            <p className="text-sm font-extrabold mt-2">
              {en ? "Ohlone's Federal College Code:" : 'Código federal de Ohlone College:'} {ohloneAid.collegeCode}
            </p>
          </section>

          <section aria-labelledby="aid-apply">
            <h3 id="aid-apply" className={sectionHeading}>{en ? 'How to apply' : 'Cómo solicitar'}</h3>
            <p className="text-sm mb-3">
              {en
                ? 'In California, you may apply for aid from several sources by completing a single application:'
                : 'En California, puede solicitar ayuda de varias fuentes con una sola solicitud:'}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
              {ohloneAid.applications.map((app) => (
                <li key={app.name} className="p-4 rounded-2xl border-2 border-slate-200">
                  <p className="text-sm font-extrabold">{app.name}</p>
                  <p className="text-sm mt-1 leading-relaxed">{app.description}</p>
                </li>
              ))}
            </ul>
          </section>

          {ohloneAid.groups.map((group, groupIndex) => (
            <section key={group.title} aria-labelledby={`aid-group-${groupIndex}`}>
              <h3 id={`aid-group-${groupIndex}`} className={sectionHeading}>{group.title}</h3>
              <ul className="space-y-3 list-none p-0 m-0">
                {group.programs.map((program) => (
                  <li key={program.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-sm font-extrabold">{program.name}</p>
                    <p className="text-sm mt-1 leading-relaxed">{program.description}</p>
                    {program.points && (
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                        {program.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section aria-labelledby="aid-maintain">
            <h3 id="aid-maintain" className={sectionHeading}>
              {en ? 'How to maintain financial aid eligibility' : 'Cómo mantener la elegibilidad'}
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {ohloneAid.maintain.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="aid-contact">
            <h3 id="aid-contact" className={sectionHeading}>{en ? 'Contact us' : 'Contáctenos'}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0 m-0">
              {ohloneAid.campuses.map((campus) => (
                <li key={campus.name} className="p-4 rounded-2xl border-2 border-slate-200 text-sm space-y-1.5">
                  <p className="font-extrabold">{campus.name}</p>
                  <p className="flex items-start gap-2">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0 text-slate-600" aria-hidden="true" />
                    <span>
                      <span className="sr-only">{en ? 'Phone: ' : 'Teléfono: '}</span>
                      <a href={`tel:${campus.phone}`} className="font-bold text-emerald-800 underline">{campus.phone}</a>
                      <span className="text-slate-700"> · {en ? 'Fax' : 'Fax'} {campus.fax}</span>
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Mail className="w-4 h-4 mt-0.5 shrink-0 text-slate-600" aria-hidden="true" />
                    <span>
                      <span className="sr-only">Email: </span>
                      <a href={`mailto:${campus.email}`} className="font-bold text-emerald-800 underline break-all">{campus.email}</a>
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-slate-600" aria-hidden="true" />
                    <span>
                      <span className="sr-only">{en ? 'Location: ' : 'Ubicación: '}</span>
                      {campus.location}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="aid-hours">
            <h3 id="aid-hours" className={`${sectionHeading} flex items-center gap-2`}>
              <Clock className="w-4 h-4" aria-hidden="true" />
              {en ? 'Financial aid office hours' : 'Horario de la oficina'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ohloneAid.hours.map((block) => (
                <div key={block.season} className="p-4 rounded-2xl border-2 border-slate-200 text-sm">
                  <p className="font-extrabold">{block.season}</p>
                  <ul className="list-none p-0 mt-1 space-y-0.5">
                    {block.times.map((time) => (
                      <li key={time}>{time}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-700 font-medium mt-2">{ohloneAid.hoursNote}</p>
          </section>

          <p className="text-xs text-slate-600 font-medium border-t border-slate-200 pt-4">
            {en
              ? 'Source: Ohlone College Financial Aid brochure. Confirm current details with the Financial Aid office.'
              : 'Fuente: folleto de Ayuda Financiera de Ohlone College. Confirme los detalles vigentes con la oficina de Ayuda Financiera.'}
          </p>
        </div>

        <div className="shrink-0 border-t-2 border-slate-200 p-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl min-h-[48px] focus-visible:ring-3 focus-visible:ring-emerald-950"
          >
            {en ? 'Close' : 'Cerrar'}
          </button>
        </div>
      </div>
    </div>
  );
};
