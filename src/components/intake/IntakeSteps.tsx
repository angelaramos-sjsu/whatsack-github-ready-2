import React from 'react';
import { Language, IntakeProfile, CategoryId, IntakeUrgency, OtherBasicNeed, AccessPreference } from '../../types';
import { Lock } from 'lucide-react';

const CITIES = [
  'East San Jose',
  'San Jose',
  'Fremont',
  'Union City',
  'Newark',
  'Santa Clara',
  'Sunnyvale',
  'Mountain View',
  'Redwood City',
  'Milpitas / Sunnyvale',
  'Cupertino / Los Altos Hills',
  'Other Silicon Valley'
];

const AGE_OPTIONS: Array<{ value: IntakeProfile['ageRange']; en: string; es: string }> = [
  { value: 'prefer-not-to-say', en: 'Prefer not to say', es: 'Prefiero no decirlo' },
  { value: 'under-18', en: 'Youth (Under 18)', es: 'Jóvenes (Menores de 18)' },
  { value: '18-24', en: '18 – 24 (Young Adult)', es: '18 – 24 (Adulto Joven)' },
  { value: '25-49', en: '25 – 49 (Adult)', es: '25 – 49 (Adulto)' },
  { value: '50-64', en: '50 – 64 (Older Adult)', es: '50 – 64 (Adulto Mayor)' },
  { value: '65+', en: '65+ (Senior Citizen)', es: '65+ (Adulto Mayor)' }
];

const INCOME_OPTIONS: Array<{ value: IntakeProfile['monthlyIncome']; en: string; es: string }> = [
  { value: '< $2,500', en: 'Under $2,500 / month', es: 'Menos de $2,500 / mes' },
  { value: '$2,500 - $4,500', en: '$2,500 – $4,500 / month', es: '$2,500 – $4,500 / mes' },
  { value: '$4,500 - $7,000', en: '$4,500 – $7,000 / month', es: '$4,500 – $7,000 / mes' },
  { value: '$7,000+', en: '$7,000+ / month', es: '$7,000+ / mes' },
  { value: 'prefer-not-to-say', en: 'Prefer not to say', es: 'Prefiero no especificar' }
];

const EMPLOYMENT_OPTIONS: Array<{ value: IntakeProfile['employmentStatus']; en: string; es: string }> = [
  { value: 'prefer-not-to-say', en: 'Prefer not to say', es: 'Prefiero no decirlo' },
  { value: 'part-time', en: 'Part-Time / Shift Worker', es: 'Medio Tiempo / Turnos' },
  { value: 'laid-off', en: 'Recently Laid-Off / Unemployed', es: 'Despedido Reciente / Desempleado' },
  { value: 'employed', en: 'Employed Full-Time', es: 'Empleado Tiempo Completo' },
  { value: 'seeking-work', en: 'Seeking Work', es: 'Buscando Empleo' },
  { value: 'student', en: 'Student', es: 'Estudiante' },
  { value: 'retired', en: 'Retired', es: 'Jubilado' }
];

const SERVICE_OPTIONS: Array<{ id: CategoryId; en: string; es: string; subEn: string; subEs: string }> = [
  { id: 'food', en: '🍏 Food Access', es: '🍏 Despensa y Comida', subEn: 'Pantries, groceries', subEs: 'Despensas y comida' },
  { id: 'mental-health', en: '🧠 Mental Health', es: '🧠 Salud Mental', subEn: 'Counseling, peer chat', subEs: 'Consejería y apoyo' },
  { id: 'workforce', en: '💼 Workforce & College', es: '💼 Capacitación y Becas', subEn: 'IT certs, free tuition', subEs: 'Cursos IT y matrícula' },
  { id: 'community', en: '🤝 Community Connection', es: '🤝 Conexión Comunitaria', subEn: 'Senior clubs, youth hubs', subEs: 'Clubes y centros' }
];

const labelClass = 'block text-sm font-semibold text-slate-900 mb-1.5';
const fieldClass = 'w-full text-base p-3 rounded-xl border-2 border-slate-300 focus:border-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700 text-slate-900 min-h-[48px]';
const selectClass = `${fieldClass} bg-white font-medium`;

interface StepIdentityProps {
  currentLanguage: Language;
  name: string;
  onNameChange: (value: string) => void;
  nameError: boolean;
  nameInputRef: React.RefObject<HTMLInputElement>;
  city: string;
  onCityChange: (value: string) => void;
  ageRange: IntakeProfile['ageRange'];
  onAgeRangeChange: (value: IntakeProfile['ageRange']) => void;
}

export const StepIdentity: React.FC<StepIdentityProps> = ({
  currentLanguage,
  name,
  onNameChange,
  nameError,
  nameInputRef,
  city,
  onCityChange,
  ageRange,
  onAgeRangeChange
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div>
      <label htmlFor="intake-name" className={labelClass}>
        {currentLanguage === 'en' ? 'Name or nickname (optional)' : 'Nombre o apodo (opcional)'}
      </label>
      <input
        id="intake-name"
        ref={nameInputRef}
        type="text"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder={currentLanguage === 'en' ? 'e.g. Maria or Daniel' : 'ej. María o Daniel'}
        aria-invalid={nameError || undefined}
        aria-describedby={nameError ? 'intake-name-error' : undefined}
        className={`${fieldClass} ${nameError ? 'border-red-700' : ''}`}
      />
      {nameError && (
        <p id="intake-name-error" role="alert" className="text-xs font-bold text-red-800 mt-1.5">
          {currentLanguage === 'en'
            ? 'Enter a name or nickname to continue.'
            : 'Ingrese un nombre o apodo para continuar.'}
        </p>
      )}
    </div>

    <div>
      <label htmlFor="intake-city" className={labelClass}>
        {currentLanguage === 'en' ? 'City / area (helps find local resources)' : 'Ciudad / zona (para buscar recursos locales)'}
      </label>
      <select id="intake-city" value={city} onChange={(e) => onCityChange(e.target.value)} className={selectClass}>
        {CITIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="intake-age" className={labelClass}>
        {currentLanguage === 'en' ? 'Age group (optional)' : 'Grupo de edad (opcional)'}
      </label>
      <select
        id="intake-age"
        value={ageRange}
        onChange={(e) => onAgeRangeChange(e.target.value as IntakeProfile['ageRange'])}
        className={selectClass}
      >
        {AGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {currentLanguage === 'en' ? option.en : option.es}
          </option>
        ))}
      </select>
    </div>
  </div>
);

interface StepHouseholdProps {
  currentLanguage: Language;
  monthlyIncome: IntakeProfile['monthlyIncome'];
  onMonthlyIncomeChange: (value: IntakeProfile['monthlyIncome']) => void;
  employmentStatus: IntakeProfile['employmentStatus'];
  onEmploymentStatusChange: (value: IntakeProfile['employmentStatus']) => void;
  householdSize: number;
  onHouseholdSizeChange: (value: number) => void;
  hasChildren: boolean;
  onHasChildrenChange: (value: boolean) => void;
  hasSeniors: boolean;
  onHasSeniorsChange: (value: boolean) => void;
}

export const StepHousehold: React.FC<StepHouseholdProps> = ({
  currentLanguage,
  monthlyIncome,
  onMonthlyIncomeChange,
  employmentStatus,
  onEmploymentStatusChange,
  householdSize,
  onHouseholdSizeChange,
  hasChildren,
  onHasChildrenChange,
  hasSeniors,
  onHasSeniorsChange
}) => (
  <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label htmlFor="intake-income" className="block text-xs font-bold text-slate-900 mb-1">
          {currentLanguage === 'en' ? 'Estimated Monthly Income:' : 'Ingreso Mensual Estimado:'}
        </label>
        <select
          id="intake-income"
          value={monthlyIncome}
          onChange={(e) => onMonthlyIncomeChange(e.target.value as IntakeProfile['monthlyIncome'])}
          className={selectClass}
        >
          {INCOME_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {currentLanguage === 'en' ? option.en : option.es}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="intake-employment" className="block text-xs font-bold text-slate-900 mb-1">
          {currentLanguage === 'en' ? 'Employment Situation:' : 'Situación Laboral:'}
        </label>
        <select
          id="intake-employment"
          value={employmentStatus}
          onChange={(e) => onEmploymentStatusChange(e.target.value as IntakeProfile['employmentStatus'])}
          className={selectClass}
        >
          {EMPLOYMENT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {currentLanguage === 'en' ? option.en : option.es}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="intake-size" className="block text-xs font-bold text-slate-900 mb-1">
          {currentLanguage === 'en' ? 'Total Household Size:' : 'Personas en el Hogar:'}
        </label>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            id="intake-size"
            type="number"
            min="1"
            max="12"
            value={householdSize}
            onChange={(e) => onHouseholdSizeChange(parseInt(e.target.value) || 1)}
            className="w-20 text-sm p-3 rounded-xl border-2 border-slate-300 bg-white text-center font-extrabold text-slate-900 min-h-[48px]"
          />
          <div className="space-y-1.5 text-xs font-semibold text-slate-900">
            <label className="flex items-center gap-2 cursor-pointer min-h-[28px]">
              <input
                type="checkbox"
                checked={hasChildren}
                onChange={(e) => onHasChildrenChange(e.target.checked)}
                className="w-4 h-4 accent-emerald-700 rounded"
              />
              <span>{currentLanguage === 'en' ? 'Children under 18' : 'Hijos menores de 18'}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer min-h-[28px]">
              <input
                type="checkbox"
                checked={hasSeniors}
                onChange={(e) => onHasSeniorsChange(e.target.checked)}
                className="w-4 h-4 accent-emerald-700 rounded"
              />
              <span>{currentLanguage === 'en' ? 'Seniors 60+' : 'Adultos mayores 60+'}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface StepNeedsProps {
  currentLanguage: Language;
  servicePriorities: CategoryId[];
  onTogglePriority: (catId: CategoryId) => void;
  otherNeeds: OtherBasicNeed[];
  onToggleOtherNeed: (need: OtherBasicNeed) => void;
  urgency: IntakeUrgency;
  onUrgencyChange: (value: IntakeUrgency) => void;
}

const OTHER_NEED_OPTIONS: { id: OtherBasicNeed; en: string; es: string }[] = [
  { id: 'housing', en: 'Housing or a safe place to stay', es: 'Vivienda o un lugar seguro donde quedarse' },
  { id: 'utilities', en: 'Bills or utilities', es: 'Facturas o servicios públicos' },
  { id: 'transportation', en: 'Transportation assistance', es: 'Ayuda con el transporte' }
];

const URGENCY_OPTIONS: { id: IntakeUrgency; en: string; es: string }[] = [
  { id: 'today', en: 'Today / as soon as possible', es: 'Hoy / lo antes posible' },
  { id: 'soon', en: 'Within the next few days', es: 'En los próximos días' },
  { id: 'exploring', en: 'I am exploring my options', es: 'Estoy explorando mis opciones' },
  { id: 'prefer-not-to-say', en: 'Not sure / prefer not to say', es: 'No sé / prefiero no decirlo' }
];

export const StepNeeds: React.FC<StepNeedsProps> = ({
  currentLanguage, servicePriorities, onTogglePriority, otherNeeds, onToggleOtherNeed,
  urgency, onUrgencyChange
}) => (
  <div className="space-y-6">
    <div>
      <h4 className="text-base font-bold text-slate-900 mb-2">
        {currentLanguage === 'en' ? 'Choose as many areas as you need' : 'Elija todas las áreas donde necesita ayuda'}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICE_OPTIONS.map((item) => {
          const selected = servicePriorities.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTogglePriority(item.id)}
              aria-pressed={selected}
              className={`p-4 rounded-2xl border-2 text-left transition-colors min-h-[64px] flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                selected ? 'bg-emerald-50 border-emerald-700 text-slate-900' : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-900'
              }`}
            >
              <span className="flex-1">
                <span className="font-bold text-base block mb-1">{currentLanguage === 'en' ? item.en : item.es}</span>
                <span className="text-sm text-slate-700">{currentLanguage === 'en' ? item.subEn : item.subEs}</span>
              </span>
              <span aria-hidden="true" className={`w-6 h-6 shrink-0 rounded-md border-2 flex items-center justify-center font-bold ${
                selected ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-slate-500 text-transparent'
              }`}>✓</span>
            </button>
          );
        })}
      </div>
    </div>

    <fieldset>
      <legend className="text-base font-bold text-slate-900 mb-2">
        {currentLanguage === 'en' ? 'Other basic needs' : 'Otras necesidades básicas'}
      </legend>
      <p className="text-sm text-slate-700 mb-3">
        {currentLanguage === 'en'
          ? 'These needs currently lead to a 211 referral, not verified WhatSack matches.'
          : 'Estas necesidades ofrecen una referencia al 211; WhatSack aún no tiene resultados verificados para ellas.'}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {OTHER_NEED_OPTIONS.map((item) => {
          const selected = otherNeeds.includes(item.id);
          return (
            <label key={item.id} className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border border-slate-300 p-3 text-sm text-slate-900">
              <input
                type="checkbox"
                className="w-5 h-5 accent-emerald-700 shrink-0"
                checked={selected}
                onChange={() => onToggleOtherNeed(item.id)}
              />
              {currentLanguage === 'en' ? item.en : item.es}
            </label>
          );
        })}
      </div>
    </fieldset>

    <fieldset>
      <legend className="text-base font-bold text-slate-900 mb-2">
        {currentLanguage === 'en' ? 'How soon do you need help?' : '¿Qué tan pronto necesita ayuda?'}
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {URGENCY_OPTIONS.map((option) => (
          <label key={option.id} className="flex min-h-[48px] cursor-pointer items-center gap-3 rounded-xl border border-slate-300 p-3 text-sm text-slate-900">
            <input
              type="radio"
              name="intake-urgency"
              checked={urgency === option.id}
              onChange={() => onUrgencyChange(option.id)}
              className="h-5 w-5 shrink-0 accent-emerald-700"
            />
            {currentLanguage === 'en' ? option.en : option.es}
          </label>
        ))}
      </div>
      {urgency === 'today' && (
        <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-slate-900">
          {currentLanguage === 'en'
            ? 'Need help right away? You can call 211 for local services without finishing this form. For immediate danger, call 911.'
            : '¿Necesita ayuda ahora? Puede llamar al 211 para buscar servicios locales sin terminar este formulario. Si hay peligro inmediato, llame al 911.'}
        </p>
      )}
    </fieldset>
  </div>
);

interface StepPreferencesProps {
  currentLanguage: Language;
  noIdRequiredPreference: boolean;
  onNoIdRequiredPreferenceChange: (value: boolean) => void;
  transitDependent: boolean;
  onTransitDependentChange: (value: boolean) => void;
  preferredLanguage: string;
  onPreferredLanguageChange: (value: string) => void;
  accessPreferences: AccessPreference[];
  onToggleAccessPreference: (value: AccessPreference) => void;
}

const ACCESS_OPTIONS: { id: AccessPreference; en: string; es: string }[] = [
  { id: 'remote', en: 'Online or by phone', es: 'En línea o por teléfono' },
  { id: 'evenings', en: 'Evening or weekend hours', es: 'Por las tardes o fines de semana' },
  { id: 'accessible', en: 'Accessible location or other accommodations', es: 'Lugar accesible u otras adaptaciones' }
];

export const StepPreferences: React.FC<StepPreferencesProps> = ({
  currentLanguage,
  noIdRequiredPreference, onNoIdRequiredPreferenceChange,
  transitDependent, onTransitDependentChange,
  preferredLanguage, onPreferredLanguageChange,
  accessPreferences, onToggleAccessPreference
}) => (
  <div className="space-y-5">
    <fieldset>
      <legend className="text-base font-bold text-slate-900 mb-2">
        {currentLanguage === 'en' ? 'What would make getting help easier?' : '¿Qué facilitaría obtener ayuda?'}
      </legend>
      <div className="space-y-3">
        <label className="flex min-h-[56px] items-start gap-3 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-3 text-slate-900 cursor-pointer">
          <input
            type="checkbox"
            checked={noIdRequiredPreference}
            onChange={(e) => onNoIdRequiredPreferenceChange(e.target.checked)}
            className="mt-1 w-5 h-5 accent-emerald-700 shrink-0"
          />
          <span>
            <span className="block text-base font-bold">
              {currentLanguage === 'en' ? 'I need options that do not require an ID or SSN' : 'Necesito opciones que no pidan identificación ni número de Seguro Social'}
            </span>
            <span className="block text-sm text-slate-700 mt-1">
              {currentLanguage === 'en'
                ? 'You never need to give WhatSack an ID or SSN to browse. We have not verified document rules for every organization; confirm directly before visiting.'
                : 'No necesita dar identificación ni número de Seguro Social a WhatSack para explorar. No hemos verificado los requisitos de cada organización; confirme antes de ir.'}
            </span>
          </span>
        </label>
        <label className="flex min-h-[48px] items-center gap-3 rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 cursor-pointer">
          <input
            type="checkbox"
            checked={transitDependent}
            onChange={(e) => onTransitDependentChange(e.target.checked)}
            className="w-5 h-5 accent-emerald-700 shrink-0"
          />
          {currentLanguage === 'en' ? 'I rely on public transportation' : 'Dependo del transporte público'}
        </label>
        {ACCESS_OPTIONS.map((option) => (
          <label key={option.id} className="flex min-h-[48px] items-center gap-3 rounded-xl border border-slate-300 bg-white p-3 text-sm text-slate-900 cursor-pointer">
            <input
              type="checkbox"
              checked={accessPreferences.includes(option.id)}
              onChange={() => onToggleAccessPreference(option.id)}
              className="w-5 h-5 accent-emerald-700 shrink-0"
            />
            {currentLanguage === 'en' ? option.en : option.es}
          </label>
        ))}
      </div>
    </fieldset>
    <div>
      <label htmlFor="intake-language" className={labelClass}>
        {currentLanguage === 'en' ? 'Language for support (optional)' : 'Idioma para recibir ayuda (opcional)'}
      </label>
      <select id="intake-language" value={preferredLanguage} onChange={(e) => onPreferredLanguageChange(e.target.value)} className={selectClass}>
        <option value="No preference">{currentLanguage === 'en' ? 'No preference / not sure' : 'Sin preferencia / no sé'}</option>
        <option value="English">English</option>
        <option value="Español">Español</option>
        <option value="Other">{currentLanguage === 'en' ? 'Another language (ask organization)' : 'Otro idioma (consultar a la organización)'}</option>
      </select>
      <p className="mt-2 text-sm text-slate-700">
        {currentLanguage === 'en'
          ? 'Preferences help you know what to ask about. They do not guarantee availability or automatically filter unverified organization details.'
          : 'Estas preferencias le ayudan a saber qué preguntar. No garantizan disponibilidad ni filtran automáticamente información no verificada.'}
      </p>
    </div>
    <p className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
      <Lock className="w-5 h-5 text-emerald-700 shrink-0" aria-hidden="true" />
      <span>
        {currentLanguage === 'en'
          ? 'This class prototype keeps your choices in the current page session. It does not determine benefits eligibility.'
          : 'Este prototipo de clase conserva sus elecciones durante esta sesión. No determina si cumple requisitos para beneficios.'}
      </span>
    </p>
  </div>
);
