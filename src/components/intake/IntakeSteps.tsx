import React from 'react';
import { Check } from 'lucide-react';
import type { CategoryId, IntakeProfile, Language } from '../../types';

export type NeedChoice = CategoryId | 'housing';
export type UrgencyChoice = 'today' | 'this-week' | 'exploring';

const needOptions: Array<{
  id: NeedChoice;
  en: string;
  es: string;
  hintEn: string;
  hintEs: string;
}> = [
  { id: 'food', en: 'Food', es: 'Comida', hintEn: 'Groceries, pantry items, meals', hintEs: 'Despensa, comida y comidas' },
  { id: 'mental-health', en: 'Mental health', es: 'Salud mental', hintEn: 'Counseling, peer support, crisis help', hintEs: 'Consejería, apoyo entre pares y ayuda' },
  { id: 'workforce', en: 'Education & workforce', es: 'Educación y trabajo', hintEn: 'School, classes, job training', hintEs: 'Escuela, clases y capacitación' },
  { id: 'community', en: 'Community connection', es: 'Conexión comunitaria', hintEn: 'Groups, senior programs, local events', hintEs: 'Grupos, programas para mayores y eventos' },
  { id: 'housing', en: 'Housing / bills / transportation', es: 'Vivienda / pagos / transporte', hintEn: 'Rent, utility help, rides, buses', hintEs: 'Renta, ayuda de servicios y transporte' },
];

const urgencyOptions: Array<{ value: UrgencyChoice; en: string; es: string }> = [
  { value: 'today', en: 'Today', es: 'Hoy' },
  { value: 'this-week', en: 'This week', es: 'Esta semana' },
  { value: 'exploring', en: 'Just exploring', es: 'Solo estoy explorando' },
];

const cityOptions = [
  'Anywhere in Silicon Valley',
  'East San Jose',
  'San Jose',
  'Sunnyvale',
  'Mountain View',
  'Redwood City',
  'Milpitas / Sunnyvale',
  'Cupertino / Los Altos Hills',
  'Other Silicon Valley',
];

interface StepNeedsProps {
  currentLanguage: Language;
  selected: NeedChoice[];
  urgency: UrgencyChoice;
  onToggleNeed: (need: NeedChoice) => void;
  onUrgencyChange: (value: UrgencyChoice) => void;
  error?: string;
  onErrorClear?: () => void;
}

export const StepNeeds: React.FC<StepNeedsProps> = ({
  currentLanguage,
  selected,
  urgency,
  onToggleNeed,
  onUrgencyChange,
  error,
  onErrorClear,
}) => (
  <div className="space-y-6">
    <fieldset className="space-y-4" aria-describedby={error ? 'needs-error' : undefined}>
      <legend className="text-base font-bold text-slate-900">
        {currentLanguage === 'en' ? 'What do you need help with?' : '¿Con qué necesita ayuda?'}
      </legend>
      {error && (
        <p id="needs-error" role="alert" tabIndex={-1} className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-red-800">
          {error}
        </p>
      )}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {needOptions.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-3 transition-colors min-h-[68px] focus-within:ring-2 focus-within:ring-emerald-700 focus-within:ring-offset-2 ${
                isSelected
                  ? 'border-emerald-700 bg-emerald-50 shadow-sm'
                  : 'border-slate-300 bg-white hover:border-emerald-500'
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => {
                  if (error) onErrorClear?.();
                  onToggleNeed(option.id);
                }}
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                  isSelected ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-400 bg-white text-transparent'
                }`}
              >
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-slate-900">
                  {currentLanguage === 'en' ? option.en : option.es}
                </span>
                <span className="mt-0.5 block text-xs text-slate-600">
                  {currentLanguage === 'en' ? option.hintEn : option.hintEs}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>

    <fieldset className="space-y-3">
      <legend className="text-base font-bold text-slate-900">
        {currentLanguage === 'en' ? 'How soon do you need help?' : '¿Con qué rapidez necesita ayuda?'}
      </legend>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {urgencyOptions.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center justify-center rounded-xl border-2 p-3 text-sm font-bold min-h-[48px] focus-within:ring-2 focus-within:ring-emerald-700 focus-within:ring-offset-2 ${
              urgency === option.value
                ? 'border-emerald-700 bg-emerald-50 text-slate-900'
                : 'border-slate-300 bg-white text-slate-800'
            }`}
          >
            <input
              type="radio"
              name="intake-urgency"
              className="sr-only"
              checked={urgency === option.value}
              onChange={() => onUrgencyChange(option.value)}
            />
            <span>{currentLanguage === 'en' ? option.en : option.es}</span>
          </label>
        ))}
      </div>
    </fieldset>

    {selected.includes('housing') || urgency === 'today' ? (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-slate-800">
        <p className="font-bold text-slate-900">
          {currentLanguage === 'en' ? 'External referral' : 'Referencia externa'}
        </p>
        <p className="mt-1">
          {currentLanguage === 'en'
            ? 'We can connect you with 211 Bay Area for urgent support with rent, bills, or transportation.'
            : 'Podemos conectarle con 211 Bay Area para apoyo urgente con renta, pagos o transporte.'}
        </p>
        <a
          href="https://211bayarea.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center font-bold text-emerald-800 underline underline-offset-2"
        >
          {currentLanguage === 'en' ? 'Open 211 Bay Area' : 'Abrir 211 Bay Area'}
        </a>
      </div>
    ) : null}
  </div>
);

interface StepLocationProps {
  currentLanguage: Language;
  city: string;
  onCityChange: (value: string) => void;
  ageRange: IntakeProfile['ageRange'];
  onAgeRangeChange: (value: IntakeProfile['ageRange']) => void;
}

export const StepLocation: React.FC<StepLocationProps> = ({
  currentLanguage,
  city,
  onCityChange,
  ageRange,
  onAgeRangeChange,
}) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <label htmlFor="intake-city" className="block text-base font-bold text-slate-900">
        {currentLanguage === 'en' ? 'Where are you looking?' : '¿Dónde está buscando?'}
      </label>
      <select
        id="intake-city"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        className="w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-emerald-700 focus:outline-none"
      >
        {cityOptions.map((option) => (
          <option key={option} value={option === 'Anywhere in Silicon Valley' ? 'Other Silicon Valley' : option}>
            {option}
          </option>
        ))}
      </select>
    </div>

    <fieldset className="space-y-3">
      <legend className="text-base font-bold text-slate-900">
        {currentLanguage === 'en' ? 'Age group (optional)' : 'Grupo de edad (opcional)'}
      </legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {[
          { value: 'prefer-not-to-say', en: 'Prefer not to say', es: 'Prefiero no decirlo' },
          { value: 'under-18', en: 'Under 18', es: 'Menor de 18' },
          { value: '18-24', en: '18 to 24', es: '18 a 24' },
          { value: '25-49', en: '25 to 49', es: '25 a 49' },
          { value: '50-64', en: '50 to 64', es: '50 a 64' },
          { value: '65+', en: '65 and up', es: '65 o más' },
        ].map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 text-sm font-bold min-h-[48px] ${
              ageRange === option.value ? 'border-emerald-700 bg-emerald-50' : 'border-slate-300 bg-white'
            }`}
          >
            <input
              type="radio"
              name="intake-age"
              className="h-4 w-4 accent-emerald-700"
              checked={ageRange === option.value}
              onChange={() => onAgeRangeChange(option.value as IntakeProfile['ageRange'])}
            />
            <span>{currentLanguage === 'en' ? option.en : option.es}</span>
          </label>
        ))}
      </div>
    </fieldset>
  </div>
);

interface StepPreferencesProps {
  currentLanguage: Language;
  noIdRequiredPreference: boolean;
  onNoIdRequiredPreferenceChange: (value: boolean) => void;
  transitDependent: boolean;
  onTransitDependentChange: (value: boolean) => void;
  preferPhoneOrOnline: boolean;
  onPreferPhoneOrOnlineChange: (value: boolean) => void;
  needEveningWeekend: boolean;
  onNeedEveningWeekendChange: (value: boolean) => void;
  needAccessibilitySupport: boolean;
  onNeedAccessibilitySupportChange: (value: boolean) => void;
  preferredLanguage: string;
  onPreferredLanguageChange: (value: string) => void;
}

export const StepPreferences: React.FC<StepPreferencesProps> = ({
  currentLanguage,
  noIdRequiredPreference,
  onNoIdRequiredPreferenceChange,
  transitDependent,
  onTransitDependentChange,
  preferPhoneOrOnline,
  onPreferPhoneOrOnlineChange,
  needEveningWeekend,
  onNeedEveningWeekendChange,
  needAccessibilitySupport,
  onNeedAccessibilitySupportChange,
  preferredLanguage,
  onPreferredLanguageChange,
}) => (
  <div className="space-y-6">
    <fieldset className="space-y-3">
      <legend className="text-base font-bold text-slate-900">
        {currentLanguage === 'en' ? 'What would make this easier for you?' : '¿Qué haría esto más fácil para usted?'}
      </legend>
      <div className="space-y-3">
        {[
          {
            checked: noIdRequiredPreference,
            onChange: onNoIdRequiredPreferenceChange,
            labelEn: 'I need options that do not require an ID or SSN.',
            labelEs: 'Necesito opciones que no requieran identificación ni Seguro Social.',
          },
          {
            checked: transitDependent,
            onChange: onTransitDependentChange,
            labelEn: 'I rely on public transit.',
            labelEs: 'Dependo del transporte público.',
          },
          {
            checked: preferPhoneOrOnline,
            onChange: onPreferPhoneOrOnlineChange,
            labelEn: 'I prefer online or phone help.',
            labelEs: 'Prefiero ayuda por teléfono o en línea.',
          },
          {
            checked: needEveningWeekend,
            onChange: onNeedEveningWeekendChange,
            labelEn: 'I need evening or weekend hours.',
            labelEs: 'Necesito horarios por la noche o los fines de semana.',
          },
          {
            checked: needAccessibilitySupport,
            onChange: onNeedAccessibilitySupportChange,
            labelEn: 'I need accessibility accommodations.',
            labelEs: 'Necesito apoyos de accesibilidad.',
          },
        ].map((item) => (
          <label
            key={item.labelEn}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 text-sm font-bold min-h-[48px] ${
              item.checked ? 'border-emerald-700 bg-emerald-50' : 'border-slate-300 bg-white'
            }`}
          >
            <input
              type="checkbox"
              className="h-4 w-4 accent-emerald-700"
              checked={item.checked}
              onChange={(e) => item.onChange(e.target.checked)}
            />
            <span>{currentLanguage === 'en' ? item.labelEn : item.labelEs}</span>
          </label>
        ))}
      </div>
    </fieldset>

    <div className="space-y-2">
      <label htmlFor="intake-language" className="block text-base font-bold text-slate-900">
        {currentLanguage === 'en' ? 'Language preference' : 'Preferencia de idioma'}
      </label>
      <select
        id="intake-language"
        value={preferredLanguage}
        onChange={(e) => onPreferredLanguageChange(e.target.value)}
        className="w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-emerald-700 focus:outline-none"
      >
        <option value="No preference">{currentLanguage === 'en' ? 'No preference' : 'Sin preferencia'}</option>
        <option value="English">English</option>
        <option value="Español">Español</option>
        <option value="Vietnamese">Tiếng Việt</option>
        <option value="Mandarin">中文</option>
      </select>
    </div>

    <p className="text-sm text-slate-700">
      {currentLanguage === 'en'
        ? 'These choices help show better results. They are preferences we use to sort options, not guarantees about any organization’s policies.'
        : 'Estas preferencias ayudan a mostrar mejores resultados. Son opciones que usamos para ordenar recursos, no garantías sobre las políticas de ninguna organización.'}
    </p>
  </div>
);

interface StepOptionalDetailsProps {
  currentLanguage: Language;
  name: string;
  onNameChange: (value: string) => void;
  householdSize: number;
  onHouseholdSizeChange: (value: number) => void;
  hasChildren: boolean;
  onHasChildrenChange: (value: boolean) => void;
  hasSeniors: boolean;
  onHasSeniorsChange: (value: boolean) => void;
  includeHouseholdDetails: boolean;
  onIncludeHouseholdDetailsChange: (value: boolean) => void;
  monthlyIncome: IntakeProfile['monthlyIncome'];
  onMonthlyIncomeChange: (value: IntakeProfile['monthlyIncome']) => void;
  employmentStatus: IntakeProfile['employmentStatus'];
  onEmploymentStatusChange: (value: IntakeProfile['employmentStatus']) => void;
}

export const StepOptionalDetails: React.FC<StepOptionalDetailsProps> = ({
  currentLanguage,
  name,
  onNameChange,
  householdSize,
  onHouseholdSizeChange,
  hasChildren,
  onHasChildrenChange,
  hasSeniors,
  onHasSeniorsChange,
  includeHouseholdDetails,
  onIncludeHouseholdDetailsChange,
  monthlyIncome,
  onMonthlyIncomeChange,
  employmentStatus,
  onEmploymentStatusChange,
}) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <label htmlFor="intake-name" className="block text-base font-bold text-slate-900">
        {currentLanguage === 'en' ? 'Name or nickname (optional)' : 'Nombre o apodo (opcional)'}
      </label>
      <input
        id="intake-name"
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        className="w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-emerald-700 focus:outline-none"
        placeholder={currentLanguage === 'en' ? 'e.g. Maria or Daniel' : 'ej. María o Daniel'}
      />
    </div>

    <label className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-3 text-base font-semibold text-slate-900 focus-within:ring-2 focus-within:ring-emerald-700 focus-within:ring-offset-2">
      <input
        type="checkbox"
        checked={includeHouseholdDetails}
        onChange={(event) => onIncludeHouseholdDetailsChange(event.target.checked)}
        className="h-5 w-5 shrink-0 accent-emerald-700"
      />
      {currentLanguage === 'en' ? 'I want to share optional household details' : 'Quiero compartir datos opcionales del hogar'}
    </label>

    {includeHouseholdDetails && <div className="space-y-6">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <label htmlFor="intake-household-size" className="block text-base font-bold text-slate-900">
          {currentLanguage === 'en' ? 'Household size (optional)' : 'Tamaño del hogar (opcional)'}
        </label>
        <input
          id="intake-household-size"
          type="number"
          min={1}
          max={12}
          value={householdSize}
          onChange={(e) => onHouseholdSizeChange(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
          className="w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-emerald-700 focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="intake-income" className="block text-base font-bold text-slate-900">
          {currentLanguage === 'en' ? 'Monthly income band (optional)' : 'Rango de ingreso mensual (opcional)'}
        </label>
        <select
          id="intake-income"
          value={monthlyIncome}
          onChange={(e) => onMonthlyIncomeChange(e.target.value as IntakeProfile['monthlyIncome'])}
          className="w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-emerald-700 focus:outline-none"
        >
          <option value="prefer-not-to-say">{currentLanguage === 'en' ? 'Prefer not to say' : 'Prefiero no decirlo'}</option>
          <option value="< $2,500">{currentLanguage === 'en' ? 'Under $2,500 / month' : 'Menos de $2,500 / mes'}</option>
          <option value="$2,500 - $4,500">{currentLanguage === 'en' ? '$2,500 – $4,500 / month' : '$2,500 – $4,500 / mes'}</option>
          <option value="$4,500 - $7,000">{currentLanguage === 'en' ? '$4,500 – $7,000 / month' : '$4,500 – $7,000 / mes'}</option>
          <option value="$7,000+">{currentLanguage === 'en' ? '$7,000+ / month' : '$7,000+ / mes'}</option>
        </select>
      </div>
    </div>

    <div className="space-y-3">
      <fieldset className="space-y-2">
        <legend className="text-base font-bold text-slate-900">
          {currentLanguage === 'en' ? 'Children under 18?' : '¿Tiene hijos menores de 18 años?'}
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: true, labelEn: 'Yes', labelEs: 'Sí' },
            { value: false, labelEn: 'No', labelEs: 'No' },
          ].map((option) => (
            <label
              key={String(option.value)}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-3 text-sm font-bold min-h-[48px] ${
                hasChildren === option.value ? 'border-emerald-700 bg-emerald-50' : 'border-slate-300 bg-white'
              }`}
            >
              <input
                type="radio"
                name="intake-has-children"
                className="h-4 w-4 accent-emerald-700"
                checked={hasChildren === option.value}
                onChange={() => onHasChildrenChange(option.value)}
              />
              <span>{currentLanguage === 'en' ? option.labelEn : option.labelEs}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-base font-bold text-slate-900">
          {currentLanguage === 'en' ? 'Adults 60 or older in your home?' : '¿Hay adultos mayores de 60 en su hogar?'}
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: true, labelEn: 'Yes', labelEs: 'Sí' },
            { value: false, labelEn: 'No', labelEs: 'No' },
          ].map((option) => (
            <label
              key={String(option.value)}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 p-3 text-sm font-bold min-h-[48px] ${
                hasSeniors === option.value ? 'border-emerald-700 bg-emerald-50' : 'border-slate-300 bg-white'
              }`}
            >
              <input
                type="radio"
                name="intake-has-seniors"
                className="h-4 w-4 accent-emerald-700"
                checked={hasSeniors === option.value}
                onChange={() => onHasSeniorsChange(option.value)}
              />
              <span>{currentLanguage === 'en' ? option.labelEn : option.labelEs}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>

    <div className="space-y-2">
      <label htmlFor="intake-employment" className="block text-base font-bold text-slate-900">
        {currentLanguage === 'en' ? 'Employment situation (optional)' : 'Situación laboral (opcional)'}
      </label>
      <select
        id="intake-employment"
        value={employmentStatus}
        onChange={(e) => onEmploymentStatusChange(e.target.value as IntakeProfile['employmentStatus'])}
        className="w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus:border-emerald-700 focus:outline-none"
      >
        <option value="prefer-not-to-say">{currentLanguage === 'en' ? 'Prefer not to say' : 'Prefiero no decirlo'}</option>
        <option value="employed">{currentLanguage === 'en' ? 'Employed full-time' : 'Empleado a tiempo completo'}</option>
        <option value="part-time">{currentLanguage === 'en' ? 'Part-time or shift work' : 'Medio tiempo o turnos'}</option>
        <option value="laid-off">{currentLanguage === 'en' ? 'Recently laid off' : 'Despedido recientemente'}</option>
        <option value="seeking-work">{currentLanguage === 'en' ? 'Seeking work' : 'Buscando trabajo'}</option>
        <option value="student">{currentLanguage === 'en' ? 'Student' : 'Estudiante'}</option>
        <option value="retired">{currentLanguage === 'en' ? 'Retired' : 'Jubilado'}</option>
      </select>
    </div>
    </div>}
  </div>
);
