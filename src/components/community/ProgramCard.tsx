import React from 'react';
import { connectorCopy } from '../../community/copy';
import { languageLabel } from '../../community/languages';
import { CommunityProgram, MatchWarning, ProgramMatch, UiLanguage } from '../../community/types';
import { ContactActions } from './ContactActions';
import { AlertTriangle, Building2, CheckCircle2, Clock, Languages, MapPin, Wallet } from 'lucide-react';

const WARNING_LABELS: Record<MatchWarning, { en: string; es: string }> = {
  'demo-record': {
    en: 'Sample data — fictional organization, not a verified real-world result.',
    es: 'Datos de ejemplo — organización ficticia, no es un resultado real verificado.'
  },
  'real-org-details-unconfirmed': {
    en: 'Real organization, but program details are not confirmed. Check the official site or call.',
    es: 'Organización real, pero los detalles del programa no están confirmados. Consulte el sitio oficial o llame.'
  },
  outdated: {
    en: 'This record may be out of date. Confirm before you travel.',
    es: 'Este registro puede estar desactualizado. Confirme antes de viajar.'
  },
  'language-unconfirmed': {
    en: 'Language support is not confirmed.',
    es: 'No se confirmó el apoyo de idioma.'
  },
  'variety-unconfirmed': {
    en: 'The regional variety of the language is not confirmed.',
    es: 'No se confirmó la variedad regional del idioma.'
  },
  'accessibility-unconfirmed': {
    en: 'Accessibility is not confirmed. Ask the organization before you go.',
    es: 'No se confirmó la accesibilidad. Pregunte a la organización antes de ir.'
  },
  'cost-unconfirmed': {
    en: 'Cost is not confirmed.',
    es: 'No se confirmó el costo.'
  },
  'schedule-unconfirmed': {
    en: 'Days and times are not confirmed.',
    es: 'No se confirmaron los días y horarios.'
  },
  'contact-unconfirmed': {
    en: 'Contact details are not confirmed.',
    es: 'No se confirmaron los datos de contacto.'
  }
};

interface ProgramCardProps {
  match: ProgramMatch;
  uiLanguage: UiLanguage;
  detailsOpen: boolean;
  onToggleDetails: () => void;
  onChangePreferences: () => void;
}

function yesNo(value: boolean | null, language: UiLanguage): string {
  if (value === null) return connectorCopy[language].notConfirmed;
  return value ? (language === 'en' ? 'Yes' : 'Sí') : language === 'en' ? 'No' : 'No';
}

function fieldValue(value: string | null | undefined, language: UiLanguage): string {
  return value && value.trim().length > 0 ? value : connectorCopy[language].notConfirmed;
}

function languagesText(program: CommunityProgram, language: UiLanguage): string {
  if (!program.languages || program.languages.length === 0) return connectorCopy[language].notConfirmed;
  return program.languages
    .map((entry) => languageLabel({ code: entry.code, variety: entry.variety }, language))
    .join(', ');
}

function costText(program: CommunityProgram, language: UiLanguage): string {
  if (program.cost.free === true) {
    return program.cost.detail?.[language] ?? (language === 'en' ? 'Free' : 'Gratis');
  }
  return program.cost.detail?.[language] ?? connectorCopy[language].notConfirmed;
}

function scheduleText(program: CommunityProgram, language: UiLanguage): string {
  return (
    program.time.detail?.[language] ??
    program.time.days ??
    (program.time.timeSlots && program.time.timeSlots.length > 0
      ? program.time.timeSlots.map((slot) => connectorCopy[language].unknown).join(', ')
      : connectorCopy[language].notConfirmed)
  );
}

function locationText(program: CommunityProgram, language: UiLanguage): string {
  if (program.virtual) return language === 'en' ? 'Virtual (join from home)' : 'Virtual (desde casa)';
  if (program.city) return [program.city, program.zip].filter(Boolean).join(' · ');
  return connectorCopy[language].notConfirmed;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  match,
  uiLanguage,
  detailsOpen,
  onToggleDetails,
  onChangePreferences
}) => {
  const c = connectorCopy[uiLanguage];
  const program = match.program;
  const isDemo = program.recordType === 'demonstration';
  const detailsId = `program-details-${program.id}`;
  const titleId = `program-title-${program.id}`;

  return (
    <article
      aria-labelledby={titleId}
      className="flex flex-col overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-sm"
    >
      <div className={`flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2 text-xs font-bold ${isDemo ? 'border-amber-200 bg-amber-50 text-amber-950' : 'border-slate-200 bg-slate-100 text-slate-800'}`}>
        <span className="inline-flex items-center gap-1.5">
          {isDemo ? (
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span>{isDemo ? c.demoRecord : c.realOrg}</span>
        </span>
        <span className="font-mono text-[11px]">{program.verification === 'outdated' ? (uiLanguage === 'en' ? 'Possibly outdated' : 'Posiblemente desactualizado') : (uiLanguage === 'en' ? 'Demo dataset' : 'Datos de demostración')}</span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 id={titleId} className="text-lg font-extrabold leading-snug text-slate-900">
          {program.organization}
        </h3>
        <p className="mt-0.5 text-sm font-bold text-slate-700">{program.activityName[uiLanguage]}</p>

        <dl className="mt-4 space-y-2.5 text-sm">
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">{c.location}</dt>
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-700" aria-hidden="true" />
            <dd className="font-medium text-slate-800">{locationText(program, uiLanguage)}</dd>
          </div>
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">{c.daysAndTimes}</dt>
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
            <dd className="font-medium text-slate-800">{scheduleText(program, uiLanguage)}</dd>
          </div>
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">{c.cost}</dt>
            <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
            <dd className="font-medium text-slate-800">{costText(program, uiLanguage)}</dd>
          </div>
          <div className="flex items-start gap-2.5">
            <dt className="sr-only">{c.languages}</dt>
            <Languages className="mt-0.5 h-4 w-4 shrink-0 text-slate-600" aria-hidden="true" />
            <dd className="font-medium text-slate-800">{languagesText(program, uiLanguage)}</dd>
          </div>
        </dl>

        {match.warnings.length > 0 && (
          <ul className="mt-4 space-y-1.5 rounded-2xl border border-amber-300 bg-amber-50 p-3 text-xs font-semibold text-amber-950">
            <li className="font-extrabold uppercase tracking-wider text-[11px]">{c.warnings}</li>
            {match.warnings.map((warning) => (
              <li key={warning} className="flex items-start gap-1.5">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{WARNING_LABELS[warning][uiLanguage]}</span>
              </li>
            ))}
          </ul>
        )}

        {detailsOpen && (
          <div id={detailsId} className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">{c.description}</h4>
              <p className="mt-1 leading-relaxed text-slate-800">
                {program.description?.[uiLanguage] ?? c.notConfirmed}
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-700">{c.wheelchair}</dt>
                <dd className="font-medium text-slate-900">{yesNo(program.accessibility.wheelchair, uiLanguage)}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-700">{c.transit}</dt>
                <dd className="font-medium text-slate-900">{yesNo(program.accessibility.transit, uiLanguage)}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-700">{c.transportationAssistance}</dt>
                <dd className="font-medium text-slate-900">
                  {yesNo(program.accessibility.transportationAssistance, uiLanguage)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-700">{c.caregiver}</dt>
                <dd className="font-medium text-slate-900">{yesNo(program.accessibility.caregiverWelcome, uiLanguage)}</dd>
              </div>
            </dl>

            {program.accessibility.notes && (
              <p className="leading-relaxed text-slate-800">{program.accessibility.notes[uiLanguage]}</p>
            )}

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">{c.contact}</h4>
              <p className="mt-1 text-slate-900">
                {program.contact.phone
                  ? `${program.contact.phone}${program.contact.phoneStatus === 'demo' ? ` (${c.samplePhone})` : ''}`
                  : program.contact.email ?? program.contact.contactPerson ?? c.notConfirmed}
              </p>
              {program.contact.phone && program.contact.email && (
                <p className="text-slate-800">{program.contact.email}</p>
              )}
              {program.contact.contactPerson && (
                <p className="text-slate-800">{program.contact.contactPerson}</p>
              )}
              <p className="mt-1 text-slate-800">
                <span className="font-bold">{c.howToJoin}: </span>
                {program.contact.howToJoin?.[uiLanguage] ?? c.notConfirmed}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">{c.lastVerified}</h4>
                <p className="font-medium text-slate-900">{fieldValue(program.lastVerified, uiLanguage)}</p>
              </div>
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">{c.source}</h4>
                {program.officialSource ? (
                  <a
                    href={program.officialSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all font-semibold text-purple-900 underline"
                  >
                    {program.officialSource}
                  </a>
                ) : (
                  <p className="font-medium text-slate-900">{c.notConfirmed}</p>
                )}
              </div>
            </div>

            {program.verificationNote && (
              <p className="flex items-start gap-1.5 border-t border-slate-200 pt-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{program.verificationNote[uiLanguage]}</span>
              </p>
            )}
          </div>
        )}
      </div>

      <ContactActions
        program={program}
        uiLanguage={uiLanguage}
        detailsOpen={detailsOpen}
        detailsId={detailsId}
        onToggleDetails={onToggleDetails}
        onChangePreferences={onChangePreferences}
      />
    </article>
  );
};
