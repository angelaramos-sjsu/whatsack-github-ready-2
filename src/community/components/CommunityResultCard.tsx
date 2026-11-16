import React, { useState } from 'react';
import {
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Users
} from 'lucide-react';
import { copy, explainMatch, languageLabels, notConfirmed, pick } from '../i18n';
import { formatVerifiedDate } from '../matching';
import type { CommunityMatch, CommunityProfile, UiLanguage } from '../types';

interface CommunityResultCardProps {
  language: UiLanguage;
  profile: CommunityProfile;
  match: CommunityMatch;
  onEditPreferences: () => void;
}

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <dt className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">{label}</dt>
    <dd className="mt-0.5 text-base text-slate-900">{children}</dd>
  </div>
);

export const CommunityResultCard: React.FC<CommunityResultCardProps> = ({
  language,
  profile,
  match,
  onEditPreferences
}) => {
  const c = copy[language];
  const { resource, flags } = match;
  const [showDetails, setShowDetails] = useState(false);

  const wheelchair =
    resource.accessibility.wheelchair === true
      ? pick({ en: 'Wheelchair accessible', es: 'Accesible en silla de ruedas' }, language)
      : resource.accessibility.wheelchair === false
        ? pick({ en: 'Not wheelchair accessible', es: 'No accesible en silla de ruedas' }, language)
        : notConfirmed(language);

  const cost =
    resource.costStatus === 'free'
      ? pick({ en: 'Free', es: 'Gratis' }, language)
      : resource.costStatus === 'low-cost'
        ? pick({ en: 'Low cost', es: 'Costo bajo' }, language)
        : notConfirmed(language);

  const verified = formatVerifiedDate(resource.lastVerified, language);
  const telHref = resource.contact.phone ? `tel:${resource.contact.phone.replace(/[^\d+]/g, '')}` : null;

  const detailId = `community-details-${resource.id}`;

  return (
    <article
      className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
      aria-labelledby={`community-resource-${resource.id}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
          {c.mockBadge}
        </span>
        {flags.includes('outdated') && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            {c.outdatedBadge}
          </span>
        )}
      </div>

      <h3 id={`community-resource-${resource.id}`} className="mt-3 text-lg font-extrabold leading-snug text-slate-900">
        {pick(resource.programName, language)}
      </h3>
      <p className="mt-1 text-sm font-semibold text-emerald-800">{resource.organizationName}</p>
      <p className="mt-2 text-base leading-relaxed text-slate-700">
        {pick(resource.description, language)}
      </p>

      <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-slate-800">
        <span className="font-bold">{c.whyMatches}: </span>
        {explainMatch(profile, resource, language)}
      </p>

      {(flags.includes('language-not-confirmed') || flags.includes('wheelchair-not-confirmed')) && (
        <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-slate-900">
          {flags.includes('language-not-confirmed') ? c.relaxedLanguage : c.relaxedAccessibility}
        </p>
      )}

      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label={pick({ en: 'Location', es: 'Ubicación' }, language)}>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
            {resource.virtual
              ? pick({ en: 'Online', es: 'En línea' }, language)
              : [resource.city, resource.zip].filter(Boolean).join(' ') || notConfirmed(language)}
          </span>
        </Field>
        <Field label={pick({ en: 'Cost', es: 'Costo' }, language)}>
          {cost}
          {resource.costNote && ` — ${pick(resource.costNote, language)}`}
        </Field>
        <Field label={pick({ en: 'Days', es: 'Días' }, language)}>
          {resource.days ? pick(resource.days, language) : notConfirmed(language)}
        </Field>
        <Field label={pick({ en: 'Times', es: 'Horarios' }, language)}>
          {resource.times ? pick(resource.times, language) : notConfirmed(language)}
        </Field>
        <Field label={pick({ en: 'Languages', es: 'Idiomas' }, language)}>
          {resource.languages.length > 0
            ? resource.languages.map((code) => languageLabels[code][language]).join(', ')
            : notConfirmed(language)}
        </Field>
        <Field label={pick({ en: 'Accessibility', es: 'Accesibilidad' }, language)}>
          {wheelchair}
          {resource.accessibility.notes && (
            <span className="mt-1 block text-sm text-slate-700">
              {pick(resource.accessibility.notes, language)}
            </span>
          )}
        </Field>
        <Field label={pick({ en: 'Transportation', es: 'Transporte' }, language)}>
          {resource.transportation
            ? pick(resource.transportation, language)
            : notConfirmed(language)}
        </Field>
        <Field label={c.notVerified}>
          {verified ?? c.unverifiedDate}
        </Field>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        {telHref ? (
          <a
            href={telHref}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {c.call}: {resource.contact.phone}
          </a>
        ) : (
          <span className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {c.callMissing}
          </span>
        )}

        {resource.officialSourceUrl ? (
          <a
            href={resource.officialSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border-2 border-emerald-700 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            {c.officialSource}
          </a>
        ) : (
          <span className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            {c.officialSourceMissing}
          </span>
        )}

        <button
          type="button"
          onClick={() => setShowDetails((open) => !open)}
          aria-expanded={showDetails}
          aria-controls={detailId}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
          {showDetails ? c.hideDetails : c.details}
        </button>

        <button
          type="button"
          onClick={onEditPreferences}
          className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
        >
          <Users className="h-4 w-4" aria-hidden="true" />
          {c.changePreferences}
        </button>
      </div>

      {showDetails && (
        <div id={detailId} className="mt-4 space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          {profile.wantsOrganizerFirst && (
            <p className="rounded-xl bg-white p-3 text-sm text-slate-800">{c.organizerLead}</p>
          )}
          <Field label={pick({ en: 'Service area', es: 'Zona de servicio' }, language)}>
            {resource.serviceArea ? pick(resource.serviceArea, language) : notConfirmed(language)}
          </Field>
          <Field label={pick({ en: 'Language notes', es: 'Notas de idioma' }, language)}>
            {resource.languageNote ? pick(resource.languageNote, language) : notConfirmed(language)}
          </Field>
          <Field label={pick({ en: 'Caregiver welcome', es: 'Acompañante bienvenido' }, language)}>
            {resource.accessibility.caregiverWelcome === true
              ? pick({ en: 'Yes', es: 'Sí' }, language)
              : resource.accessibility.caregiverWelcome === false
                ? pick({ en: 'No', es: 'No' }, language)
                : notConfirmed(language)}
          </Field>
          <Field label={c.email}>
            {resource.contact.email ? (
              <a className="inline-flex items-center gap-1 font-semibold text-emerald-800 underline" href={`mailto:${resource.contact.email}`}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                {resource.contact.email}
              </a>
            ) : (
              c.emailMissing
            )}
          </Field>
          <p className="text-sm text-slate-700">{c.confirmNote}</p>
        </div>
      )}
    </article>
  );
};
