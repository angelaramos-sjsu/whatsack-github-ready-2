import React from 'react';
import { Language, IntakeProfile, CategoryId } from '../../types';
import { Lock } from 'lucide-react';

const CITIES = [
  'East San Jose',
  'San Jose',
  'Sunnyvale',
  'Mountain View',
  'Redwood City',
  'Milpitas / Sunnyvale',
  'Cupertino / Los Altos Hills',
  'Other Silicon Valley'
];

const AGE_OPTIONS: Array<{ value: IntakeProfile['ageRange']; en: string; es: string }> = [
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

const labelClass = 'block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5';
const fieldClass = 'w-full text-sm p-3 rounded-xl border-2 border-slate-300 focus:border-emerald-700 focus:outline-hidden text-slate-900 min-h-[48px]';
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
        {currentLanguage === 'en' ? 'Name or Preferred Nickname *' : 'Nombre o Apodo *'}
      </label>
      <input
        id="intake-name"
        ref={nameInputRef}
        type="text"
        required
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
        {currentLanguage === 'en' ? 'City / Area in Silicon Valley *' : 'Ciudad / Zona en Silicon Valley *'}
      </label>
      <select id="intake-city" value={city} onChange={(e) => onCityChange(e.target.value)} className={selectClass}>
        {CITIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="intake-age" className={labelClass}>
        {currentLanguage === 'en' ? 'Age Group *' : 'Grupo de Edad *'}
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
}

export const StepNeeds: React.FC<StepNeedsProps> = ({ currentLanguage, servicePriorities, onTogglePriority }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    {SERVICE_OPTIONS.map((item) => {
      const isSelected = servicePriorities.includes(item.id);
      return (
        <button
          key={item.id}
          type="button"
          onClick={() => onTogglePriority(item.id)}
          className={`p-4 rounded-2xl border-2 text-left transition-all min-h-[64px] flex items-center gap-3 ${
            isSelected
              ? 'bg-emerald-50 border-emerald-700 shadow-sm ring-2 ring-emerald-700/20'
              : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
          }`}
          aria-pressed={isSelected}
        >
          <span className="flex-1">
            <span className="font-extrabold text-sm block text-slate-900 mb-0.5">
              {currentLanguage === 'en' ? item.en : item.es}
            </span>
            <span className="text-xs text-slate-600">{currentLanguage === 'en' ? item.subEn : item.subEs}</span>
          </span>
          <span
            aria-hidden="true"
            className={`w-5 h-5 rounded-md border-2 shrink-0 flex items-center justify-center text-[11px] font-black ${
              isSelected ? 'bg-emerald-700 border-emerald-700 text-white' : 'border-slate-400 text-transparent'
            }`}
          >
            ✓
          </span>
        </button>
      );
    })}
  </div>
);

interface StepPreferencesProps {
  currentLanguage: Language;
  noIdRequiredPreference: boolean;
  onNoIdRequiredPreferenceChange: (value: boolean) => void;
  transitDependent: boolean;
  onTransitDependentChange: (value: boolean) => void;
}

export const StepPreferences: React.FC<StepPreferencesProps> = ({
  currentLanguage,
  noIdRequiredPreference,
  onNoIdRequiredPreferenceChange,
  transitDependent,
  onTransitDependentChange
}) => (
  <div className="space-y-3">
    <div className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 space-y-3">
      <div className="grid grid-cols-1 gap-3 text-slate-900">
        <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-200 cursor-pointer min-h-[52px]">
          <input
            type="checkbox"
            checked={noIdRequiredPreference}
            onChange={(e) => onNoIdRequiredPreferenceChange(e.target.checked)}
            className="w-5 h-5 accent-emerald-700 rounded shrink-0"
          />
          <span className="text-xs sm:text-sm font-bold">
            {currentLanguage === 'en'
              ? 'Prefer No-ID or zero-documentation programs'
              : 'Prefiero programas sin requisito de ID estatal'}
          </span>
        </label>

        <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-200 cursor-pointer min-h-[52px]">
          <input
            type="checkbox"
            checked={transitDependent}
            onChange={(e) => onTransitDependentChange(e.target.checked)}
            className="w-5 h-5 accent-emerald-700 rounded shrink-0"
          />
          <span className="text-xs sm:text-sm font-bold">
            {currentLanguage === 'en'
              ? 'Rely on VTA buses / SamTrans public transit'
              : 'Me traslado en autobuses VTA o SamTrans'}
          </span>
        </label>
      </div>
    </div>

    <p className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
      <Lock className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
      <span>
        {currentLanguage === 'en'
          ? 'Private & secure: Stays on your device only'
          : 'Privado: Se guarda únicamente en su dispositivo'}
      </span>
    </p>
  </div>
);
