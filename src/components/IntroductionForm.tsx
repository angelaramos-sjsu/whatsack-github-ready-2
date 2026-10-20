import React, { useState, useEffect } from 'react';
import { Language, IntakeProfile, CategoryId } from '../types';
import { translations } from '../data/translations';
import { 
  ClipboardCheck, 
  User, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  Lock,
  RotateCcw
} from 'lucide-react';

interface IntroductionFormProps {
  currentLanguage: Language;
  existingProfile: IntakeProfile | null;
  onSaveProfile: (profile: IntakeProfile) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const IntroductionForm: React.FC<IntroductionFormProps> = ({
  currentLanguage,
  existingProfile,
  onSaveProfile,
  onClose,
  isModal = false
}) => {
  const t = translations[currentLanguage];

  const [name, setName] = useState(existingProfile?.name || '');
  const [ageRange, setAgeRange] = useState<IntakeProfile['ageRange']>(existingProfile?.ageRange || '25-49');
  const [city, setCity] = useState(existingProfile?.city || 'East San Jose');
  const [householdSize, setHouseholdSize] = useState(existingProfile?.householdSize || 3);
  const [hasChildren, setHasChildren] = useState(existingProfile?.hasChildren ?? true);
  const [hasSeniors, setHasSeniors] = useState(existingProfile?.hasSeniors ?? false);
  const [monthlyIncome, setMonthlyIncome] = useState<IntakeProfile['monthlyIncome']>(existingProfile?.monthlyIncome || '< $2,500');
  const [employmentStatus, setEmploymentStatus] = useState<IntakeProfile['employmentStatus']>(existingProfile?.employmentStatus || 'part-time');
  const [servicePriorities, setServicePriorities] = useState<CategoryId[]>(
    existingProfile?.servicePriorities || ['food', 'workforce']
  );
  const [preferredLanguage, setPreferredLanguage] = useState(existingProfile?.preferredLanguage || (currentLanguage === 'es' ? 'Español' : 'English'));
  const [noIdRequiredPreference, setNoIdRequiredPreference] = useState(existingProfile?.noIdRequiredPreference ?? true);
  const [transitDependent, setTransitDependent] = useState(existingProfile?.transitDependent ?? true);

  // Close on Escape key (WCAG 2.1.1)
  useEffect(() => {
    if (!isModal || !onClose) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModal, onClose]);

  const togglePriority = (catId: CategoryId) => {
    setServicePriorities((prev) => 
      prev.includes(catId) 
        ? prev.filter((c) => c !== catId) 
        : [...prev, catId]
    );
  };

  const handleApplyPreset = (presetType: 'family' | 'worker' | 'senior' | 'youth') => {
    if (presetType === 'family') {
      setName('Maria');
      setAgeRange('25-49');
      setCity('East San Jose');
      setHouseholdSize(4);
      setHasChildren(true);
      setHasSeniors(false);
      setMonthlyIncome('< $2,500');
      setEmploymentStatus('part-time');
      setServicePriorities(['food']);
      setNoIdRequiredPreference(true);
      setTransitDependent(true);
      setPreferredLanguage('Español');
    } else if (presetType === 'worker') {
      setName('Daniel');
      setAgeRange('25-49');
      setCity('Milpitas / Sunnyvale');
      setHouseholdSize(2);
      setHasChildren(false);
      setHasSeniors(false);
      setMonthlyIncome('$2,500 - $4,500');
      setEmploymentStatus('laid-off');
      setServicePriorities(['workforce']);
      setNoIdRequiredPreference(false);
      setTransitDependent(false);
      setPreferredLanguage('English');
    } else if (presetType === 'senior') {
      setName('Rosa');
      setAgeRange('65+');
      setCity('Redwood City');
      setHouseholdSize(1);
      setHasChildren(false);
      setHasSeniors(true);
      setMonthlyIncome('< $2,500');
      setEmploymentStatus('retired');
      setServicePriorities(['community', 'food']);
      setNoIdRequiredPreference(true);
      setTransitDependent(true);
      setPreferredLanguage('Español');
    } else if (presetType === 'youth') {
      setName('Mateo');
      setAgeRange('under-18');
      setCity('Sunnyvale');
      setHouseholdSize(3);
      setHasChildren(true);
      setHasSeniors(false);
      setMonthlyIncome('prefer-not-to-say');
      setEmploymentStatus('student');
      setServicePriorities(['mental-health']);
      setNoIdRequiredPreference(true);
      setTransitDependent(true);
      setPreferredLanguage('English');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: IntakeProfile = {
      name: name.trim() || (currentLanguage === 'en' ? 'Neighbor' : 'Vecino'),
      ageRange,
      city,
      householdSize,
      hasChildren,
      hasSeniors,
      monthlyIncome,
      employmentStatus,
      servicePriorities: servicePriorities.length > 0 ? servicePriorities : ['food'],
      preferredLanguage,
      noIdRequiredPreference,
      transitDependent,
      submittedAt: new Date().toISOString()
    };

    onSaveProfile(profile);
    if (onClose) onClose();
  };

  const citiesList = [
    'East San Jose',
    'San Jose',
    'Sunnyvale',
    'Mountain View',
    'Redwood City',
    'Milpitas / Sunnyvale',
    'Cupertino / Los Altos Hills',
    'Other Silicon Valley'
  ];

  return (
    <div 
      role={isModal ? 'dialog' : 'region'}
      aria-modal={isModal ? 'true' : undefined}
      aria-labelledby="intake-form-heading"
      className={`bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden ${
        isModal ? 'max-w-2xl w-full max-h-[90vh] overflow-y-auto' : 'max-w-4xl mx-auto my-6'
      }`}
    >
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-7 relative border-b border-slate-800">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-2xl shrink-0">
              📋
            </div>
            <div>
              <h2 id="intake-form-heading" className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {currentLanguage === 'en' ? 'Community Introduction Assessment' : 'Evaluación de Introducción Comunitaria'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-normal leading-relaxed">
                {currentLanguage === 'en'
                  ? 'Help us match you with the right free programs. No SSN, legal status, or sensitive documents are requested or saved.'
                  : 'Ayúdenos a conectarle con los recursos adecuados. No se solicita ni guarda Seguro Social ni estatus legal.'}
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label={t.a11y.closeModal}
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Quick Example Presets (Accessible buttons) */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            {currentLanguage === 'en' ? 'Quick Test Scenarios:' : 'Ejemplos Rápidos:'}
          </span>
          <button
            type="button"
            onClick={() => handleApplyPreset('family')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors shrink-0 border border-slate-700"
          >
            🍎 {currentLanguage === 'en' ? 'Working Family' : 'Familia Trabajadora'}
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('worker')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors shrink-0 border border-slate-700"
          >
            💼 {currentLanguage === 'en' ? 'Dislocated Worker' : 'Desempleado'}
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('senior')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors shrink-0 border border-slate-700"
          >
            👵 {currentLanguage === 'en' ? 'Senior Resident' : 'Adulto Mayor'}
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('youth')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors shrink-0 border border-slate-700"
          >
            🧠 {currentLanguage === 'en' ? 'Youth' : 'Joven'}
          </button>
        </div>
      </div>

      {/* Form Fields with Semantic Fieldsets and Proper Label IDs */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {/* Fieldset 1: Identity & Location */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">
            1. {currentLanguage === 'en' ? 'Identity & Location' : 'Identidad y Ubicación'}
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="intake-name" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                {currentLanguage === 'en' ? 'Name or Preferred Nickname *' : 'Nombre o Apodo *'}
              </label>
              <input
                id="intake-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={currentLanguage === 'en' ? 'e.g. Maria or Daniel' : 'ej. María o Daniel'}
                className="w-full text-sm p-3 rounded-xl border-2 border-slate-300 focus:border-emerald-700 focus:outline-hidden text-slate-900"
              />
            </div>

            <div>
              <label htmlFor="intake-city" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                {currentLanguage === 'en' ? 'City / Area in Silicon Valley *' : 'Ciudad / Zona en Silicon Valley *'}
              </label>
              <select
                id="intake-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border-2 border-slate-300 focus:border-emerald-700 focus:outline-hidden bg-white text-slate-900 font-medium"
              >
                {citiesList.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="intake-age" className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                {currentLanguage === 'en' ? 'Age Group *' : 'Grupo de Edad *'}
              </label>
              <select
                id="intake-age"
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value as any)}
                className="w-full text-sm p-3 rounded-xl border-2 border-slate-300 focus:border-emerald-700 focus:outline-hidden bg-white text-slate-900 font-medium"
              >
                <option value="under-18">{currentLanguage === 'en' ? 'Youth (Under 18)' : 'Jóvenes (Menores de 18)'}</option>
                <option value="18-24">18 – 24 (Young Adult)</option>
                <option value="25-49">25 – 49 (Adult)</option>
                <option value="50-64">50 – 64 (Older Adult)</option>
                <option value="65+">65+ (Senior Citizen)</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Fieldset 2: Household & Income Bracket */}
        <fieldset className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-4">
          <legend className="text-sm font-extrabold text-slate-900 uppercase tracking-wider px-2">
            2. {currentLanguage === 'en' ? 'Household Composition & Monthly Income' : 'Composición del Hogar e Ingreso'}
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="intake-income" className="block text-xs font-bold text-slate-900 mb-1">
                {currentLanguage === 'en' ? 'Estimated Monthly Income:' : 'Ingreso Mensual Estimado:'}
              </label>
              <select
                id="intake-income"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value as any)}
                className="w-full text-sm p-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-medium"
              >
                <option value="< $2,500">{currentLanguage === 'en' ? 'Under $2,500 / month' : 'Menos de $2,500 / mes'}</option>
                <option value="$2,500 - $4,500">$2,500 – $4,500 / {currentLanguage === 'en' ? 'month' : 'mes'}</option>
                <option value="$4,500 - $7,000">$4,500 – $7,000 / {currentLanguage === 'en' ? 'month' : 'mes'}</option>
                <option value="$7,000+">$7,000+ / {currentLanguage === 'en' ? 'month' : 'mes'}</option>
                <option value="prefer-not-to-say">{currentLanguage === 'en' ? 'Prefer not to say' : 'Prefiero no especificar'}</option>
              </select>
            </div>

            <div>
              <label htmlFor="intake-employment" className="block text-xs font-bold text-slate-900 mb-1">
                {currentLanguage === 'en' ? 'Employment Situation:' : 'Situación Laboral:'}
              </label>
              <select
                id="intake-employment"
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value as any)}
                className="w-full text-sm p-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 font-medium"
              >
                <option value="part-time">{currentLanguage === 'en' ? 'Part-Time / Shift Worker' : 'Medio Tiempo / Turnos'}</option>
                <option value="laid-off">{currentLanguage === 'en' ? 'Recently Laid-Off / Unemployed' : 'Despedido Reciente / Desempleado'}</option>
                <option value="employed">{currentLanguage === 'en' ? 'Employed Full-Time' : 'Empleado Tiempo Completo'}</option>
                <option value="seeking-work">{currentLanguage === 'en' ? 'Seeking Work' : 'Buscando Empleo'}</option>
                <option value="student">{currentLanguage === 'en' ? 'Student' : 'Estudiante'}</option>
                <option value="retired">{currentLanguage === 'en' ? 'Retired' : 'Jubilado'}</option>
              </select>
            </div>

            <div>
              <label htmlFor="intake-size" className="block text-xs font-bold text-slate-900 mb-1">
                {currentLanguage === 'en' ? 'Total Household Size:' : 'Personas en el Hogar:'}
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="intake-size"
                  type="number"
                  min="1"
                  max="12"
                  value={householdSize}
                  onChange={(e) => setHouseholdSize(parseInt(e.target.value) || 1)}
                  className="w-20 text-sm p-3 rounded-xl border-2 border-slate-300 bg-white text-center font-extrabold text-slate-900"
                />
                <div className="space-y-1.5 text-xs font-semibold text-slate-900">
                  <label className="flex items-center gap-2 cursor-pointer min-h-[28px]">
                    <input
                      type="checkbox"
                      checked={hasChildren}
                      onChange={(e) => setHasChildren(e.target.checked)}
                      className="w-4 h-4 accent-emerald-700 rounded"
                    />
                    <span>{currentLanguage === 'en' ? 'Children under 18' : 'Hijos menores de 18'}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer min-h-[28px]">
                    <input
                      type="checkbox"
                      checked={hasSeniors}
                      onChange={(e) => setHasSeniors(e.target.checked)}
                      className="w-4 h-4 accent-emerald-700 rounded"
                    />
                    <span>{currentLanguage === 'en' ? 'Seniors 60+' : 'Adultos mayores 60+'}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Fieldset 3: Priority Service Areas */}
        <fieldset>
          <legend className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">
            3. {currentLanguage === 'en' ? 'Immediate Service Areas of Need' : 'Áreas de Interés Inmediato'}
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'food', labelEn: '🍏 Food Access', labelEs: '🍏 Despensa y Comida', subEn: 'Pantries, groceries', subEs: 'Despensas y comida' },
              { id: 'mental-health', labelEn: '🧠 Mental Health', labelEs: '🧠 Salud Mental', subEn: 'Counseling, peer chat', subEs: 'Consejería y apoyo' },
              { id: 'workforce', labelEn: '💼 Workforce & College', labelEs: '💼 Capacitación y Becas', subEn: 'IT certs, free tuition', subEs: 'Cursos IT y matrícula' },
              { id: 'community', labelEn: '🤝 Community Connection', labelEs: '🤝 Conexión Comunitaria', subEn: 'Senior clubs, youth hubs', subEs: 'Clubes y centros' },
            ].map((item) => {
              const isSelected = servicePriorities.includes(item.id as CategoryId);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => togglePriority(item.id as CategoryId)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all min-h-[50px] ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-700 shadow-sm ring-2 ring-emerald-700/20'
                      : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span className="font-extrabold text-sm block text-slate-900 mb-0.5">
                    {currentLanguage === 'en' ? item.labelEn : item.labelEs}
                  </span>
                  <span className="text-xs text-slate-600">
                    {currentLanguage === 'en' ? item.subEn : item.subEs}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Fieldset 4: Comfort Preferences */}
        <fieldset className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 space-y-2">
          <legend className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider px-2">
            4. {currentLanguage === 'en' ? 'Comfort & Transportation Preferences' : 'Preferencias de Transporte y Confort'}
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-900">
            <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-200 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={noIdRequiredPreference}
                onChange={(e) => setNoIdRequiredPreference(e.target.checked)}
                className="w-5 h-5 accent-emerald-700 rounded shrink-0"
              />
              <span className="text-xs sm:text-sm font-bold">
                {currentLanguage === 'en' ? 'Prefer No-ID or zero-documentation programs' : 'Prefiero programas sin requisito de ID estatal'}
              </span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-200 cursor-pointer min-h-[44px]">
              <input
                type="checkbox"
                checked={transitDependent}
                onChange={(e) => setTransitDependent(e.target.checked)}
                className="w-5 h-5 accent-emerald-700 rounded shrink-0"
              />
              <span className="text-xs sm:text-sm font-bold">
                {currentLanguage === 'en' ? 'Rely on VTA buses / SamTrans public transit' : 'Me traslado en autobuses VTA o SamTrans'}
              </span>
            </label>
          </div>
        </fieldset>

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
            <span>
              {currentLanguage === 'en' ? 'Private & secure: Stays on your device only' : 'Privado: Se guarda únicamente en su dispositivo'}
            </span>
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md shadow-emerald-700/25 flex items-center gap-2 transition-all hover:scale-105 min-h-[48px] focus-visible:ring-3 focus-visible:ring-emerald-950"
          >
            <span>{currentLanguage === 'en' ? 'Save & View Matched Resources' : 'Guardar y Ver Recursos Compatibles'}</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
};
