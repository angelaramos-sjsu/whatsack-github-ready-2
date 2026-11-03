import React, { useState, useEffect, useRef } from 'react';
import { Language, IntakeProfile, CategoryId } from '../types';
import { translations } from '../data/translations';
import { StepIdentity, StepHousehold, StepNeeds, StepPreferences } from './intake/IntakeSteps';
import { X, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

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

  // Wizard navigation state
  const [step, setStep] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    {
      title: currentLanguage === 'en' ? 'Identity & Location' : 'Identidad y Ubicación',
      summary: currentLanguage === 'en'
        ? 'Just a name or nickname, your area, and age group.'
        : 'Solo un nombre o apodo, su zona y grupo de edad.'
    },
    {
      title: currentLanguage === 'en' ? 'Household & Income' : 'Hogar e Ingresos',
      summary: currentLanguage === 'en'
        ? 'Used only to check program eligibility ranges.'
        : 'Se usa solo para verificar rangos de elegibilidad.'
    },
    {
      title: currentLanguage === 'en' ? 'Service Needs' : 'Necesidades',
      summary: currentLanguage === 'en'
        ? 'Select every area where you would like help.'
        : 'Seleccione todas las áreas en las que desea ayuda.'
    },
    {
      title: currentLanguage === 'en' ? 'Comfort & Transportation' : 'Confort y Transporte',
      summary: currentLanguage === 'en'
        ? 'Final step — tell us how you prefer to receive help.'
        : 'Último paso — indíquenos cómo prefiere recibir ayuda.'
    }
  ];
  const stepCount = steps.length;
  const isLastStep = step === stepCount - 1;

  // Move focus to the new step heading so screen readers announce the change (WCAG 2.4.3 / 4.1.3)
  useEffect(() => {
    if (!isModal && step === 0) return;
    stepHeadingRef.current?.focus();
  }, [step, isModal]);

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

  const handleNameChange = (value: string) => {
    setName(value);
    if (nameError && value.trim()) setNameError(false);
  };

  const goToNextStep = () => {
    if (step === 0 && !name.trim()) {
      setNameError(true);
      setStatusMessage(
        currentLanguage === 'en'
          ? 'Enter a name or nickname to continue.'
          : 'Ingrese un nombre o apodo para continuar.'
      );
      nameInputRef.current?.focus();
      return;
    }
    setStatusMessage('');
    setStep((prev) => Math.min(prev + 1, stepCount - 1));
  };

  const goToPreviousStep = () => {
    setStatusMessage('');
    setStep((prev) => Math.max(prev - 1, 0));
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
    setNameError(false);
    setStatusMessage(
      currentLanguage === 'en'
        ? 'Example scenario values filled in. Review each step before saving.'
        : 'Se completaron los valores del ejemplo. Revise cada paso antes de guardar.'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Enter key inside a text field advances steps instead of submitting mid-way
    if (!isLastStep) {
      goToNextStep();
      return;
    }

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

  return (
    <div
      role={isModal ? 'dialog' : 'region'}
      aria-modal={isModal ? 'true' : undefined}
      aria-labelledby="intake-form-heading"
      className={`bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden flex flex-col ${
        isModal ? 'max-w-2xl w-full max-h-[90vh]' : 'max-w-4xl mx-auto my-6'
      }`}
    >
      {/* Header */}
      <div className="bg-slate-900 text-white p-5 sm:p-7 relative border-b border-slate-800 shrink-0">
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
        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
            {currentLanguage === 'en' ? 'Quick Test Scenarios:' : 'Ejemplos Rápidos:'}
          </span>
          <button
            type="button"
            onClick={() => handleApplyPreset('family')}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors shrink-0 border border-slate-700 min-h-[40px]"
          >
            🍎 {currentLanguage === 'en' ? 'Working Family' : 'Familia Trabajadora'}
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('worker')}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors shrink-0 border border-slate-700 min-h-[40px]"
          >
            💼 {currentLanguage === 'en' ? 'Dislocated Worker' : 'Desempleado'}
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('senior')}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors shrink-0 border border-slate-700 min-h-[40px]"
          >
            👵 {currentLanguage === 'en' ? 'Senior Resident' : 'Adulto Mayor'}
          </button>
          <button
            type="button"
            onClick={() => handleApplyPreset('youth')}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors shrink-0 border border-slate-700 min-h-[40px]"
          >
            🧠 {currentLanguage === 'en' ? 'Youth' : 'Joven'}
          </button>
        </div>

        {/* Progress indicator */}
        <div className="mt-4">
          <p className="text-xs font-bold text-slate-300">
            {currentLanguage === 'en' ? `Step ${step + 1} of ${stepCount}` : `Paso ${step + 1} de ${stepCount}`}
          </p>
          <div className="mt-2 h-2 rounded-full bg-slate-800 overflow-hidden" aria-hidden="true">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${((step + 1) / stepCount) * 100}%` }}
            />
          </div>
          <ol className="mt-3 hidden sm:flex gap-2 list-none p-0 m-0">
            {steps.map((s, index) => {
              const state = index < step ? 'completed' : index === step ? 'current step' : 'not started';
              return (
                <li
                  key={s.title}
                  aria-current={index === step ? 'step' : undefined}
                  className={`flex-1 text-[11px] font-bold leading-tight border-t-2 pt-1.5 ${
                    index === step
                      ? 'text-white border-emerald-400'
                      : index < step
                        ? 'text-slate-300 border-emerald-700'
                        : 'text-slate-500 border-slate-700'
                  }`}
                >
                  <span className="sr-only">{`${currentLanguage === 'en' ? 'Step' : 'Paso'} ${index + 1}, ${state}: `}</span>
                  {index + 1}. {s.title}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-8">
          <p aria-live="polite" className="sr-only">
            {statusMessage}
          </p>

          <div className="mb-5">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="w-8 h-8 rounded-full bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0"
              >
                {step + 1}
              </span>
              <h3
                ref={stepHeadingRef}
                tabIndex={-1}
                id="intake-step-heading"
                className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight focus:outline-hidden"
              >
                <span className="sr-only">
                  {currentLanguage === 'en' ? `Step ${step + 1} of ${stepCount}: ` : `Paso ${step + 1} de ${stepCount}: `}
                </span>
                {steps[step].title}
              </h3>
            </div>
            <p id="intake-step-summary" className="text-xs sm:text-sm text-slate-700 font-medium mt-1.5">
              {steps[step].summary}
            </p>
          </div>

          <div role="group" aria-labelledby="intake-step-heading" aria-describedby="intake-step-summary">
            {step === 0 && (
              <StepIdentity
                currentLanguage={currentLanguage}
                name={name}
                onNameChange={handleNameChange}
                nameError={nameError}
                nameInputRef={nameInputRef}
                city={city}
                onCityChange={setCity}
                ageRange={ageRange}
                onAgeRangeChange={setAgeRange}
              />
            )}

            {step === 1 && (
              <StepHousehold
                currentLanguage={currentLanguage}
                monthlyIncome={monthlyIncome}
                onMonthlyIncomeChange={setMonthlyIncome}
                employmentStatus={employmentStatus}
                onEmploymentStatusChange={setEmploymentStatus}
                householdSize={householdSize}
                onHouseholdSizeChange={setHouseholdSize}
                hasChildren={hasChildren}
                onHasChildrenChange={setHasChildren}
                hasSeniors={hasSeniors}
                onHasSeniorsChange={setHasSeniors}
              />
            )}

            {step === 2 && (
              <StepNeeds
                currentLanguage={currentLanguage}
                servicePriorities={servicePriorities}
                onTogglePriority={togglePriority}
              />
            )}

            {step === 3 && (
              <StepPreferences
                currentLanguage={currentLanguage}
                noIdRequiredPreference={noIdRequiredPreference}
                onNoIdRequiredPreferenceChange={setNoIdRequiredPreference}
                transitDependent={transitDependent}
                onTransitDependentChange={setTransitDependent}
              />
            )}
          </div>
        </div>

        {/* Step navigation */}
        <div className="shrink-0 border-t-2 border-slate-200 bg-white p-4 sm:p-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goToPreviousStep}
            disabled={step === 0}
            className="px-4 sm:px-5 py-3 rounded-xl font-extrabold text-sm border-2 border-slate-300 text-slate-800 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors min-h-[48px] flex items-center gap-2 focus-visible:ring-3 focus-visible:ring-emerald-950"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{currentLanguage === 'en' ? 'Back' : 'Atrás'}</span>
          </button>

          <span className="text-xs font-bold text-slate-600 sm:hidden">
            {currentLanguage === 'en' ? `${step + 1} / ${stepCount}` : `${step + 1} / ${stepCount}`}
          </span>

          {isLastStep ? (
            <button
              type="submit"
              className="px-4 sm:px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-md shadow-emerald-700/25 flex items-center gap-2 transition-colors min-h-[48px] focus-visible:ring-3 focus-visible:ring-emerald-950"
            >
              <span>{currentLanguage === 'en' ? 'Save & View Matched Resources' : 'Guardar y Ver Recursos'}</span>
              <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={goToNextStep}
              className="px-4 sm:px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm rounded-xl shadow-md shadow-emerald-700/25 flex items-center gap-2 transition-colors min-h-[48px] focus-visible:ring-3 focus-visible:ring-emerald-950"
            >
              <span>{currentLanguage === 'en' ? 'Next' : 'Siguiente'}</span>
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
