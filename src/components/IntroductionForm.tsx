import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, X } from 'lucide-react';
import type { AccessPreference, CategoryId, IntakeProfile, Language, OtherBasicNeed } from '../types';
import { StepLocation, StepNeeds, StepOptionalDetails, StepPreferences, type NeedChoice, type UrgencyChoice } from './intake/IntakeSteps';

interface IntroductionFormProps {
  currentLanguage: Language;
  existingProfile: IntakeProfile | null;
  onSaveProfile: (profile: IntakeProfile) => void;
  onClose?: () => void;
  isModal?: boolean;
  source?: string;
  restoreFocusTarget?: React.MutableRefObject<HTMLElement | null>;
}

interface DraftState {
  name: string;
  ageRange: IntakeProfile['ageRange'];
  city: string;
  householdSize: number;
  hasChildren: boolean;
  hasSeniors: boolean;
  includeHouseholdDetails: boolean;
  monthlyIncome: IntakeProfile['monthlyIncome'];
  employmentStatus: IntakeProfile['employmentStatus'];
  servicePriorities: NeedChoice[];
  preferredLanguage: string;
  noIdRequiredPreference: boolean;
  transitDependent: boolean;
  preferPhoneOrOnline: boolean;
  needEveningWeekend: boolean;
  needAccessibilitySupport: boolean;
  urgency: UrgencyChoice;
}

const STORAGE_KEY = 'whatsack-intake-draft';

const makeDefaultDraft = (existingProfile: IntakeProfile | null): DraftState => ({
  name: existingProfile?.name ?? '',
  ageRange: existingProfile?.ageRange ?? 'prefer-not-to-say',
  city: existingProfile?.city ?? 'Other Silicon Valley',
  householdSize: existingProfile?.householdSize ?? 2,
  hasChildren: existingProfile?.hasChildren ?? false,
  hasSeniors: existingProfile?.hasSeniors ?? false,
  monthlyIncome: existingProfile?.monthlyIncome ?? 'prefer-not-to-say',
  employmentStatus: existingProfile?.employmentStatus ?? 'prefer-not-to-say',
  servicePriorities: (existingProfile?.servicePriorities ?? []).map((item) => item as NeedChoice),
  preferredLanguage: existingProfile?.preferredLanguage ?? 'No preference',
  noIdRequiredPreference: existingProfile?.noIdRequiredPreference ?? false,
  transitDependent: existingProfile?.transitDependent ?? false,
  preferPhoneOrOnline: existingProfile?.accessPreferences?.includes('remote') ?? false,
  needEveningWeekend: existingProfile?.accessPreferences?.includes('evenings') ?? false,
  needAccessibilitySupport: existingProfile?.accessPreferences?.includes('accessible') ?? false,
  urgency: existingProfile?.urgency === 'today'
    ? 'today'
    : existingProfile?.urgency === 'soon'
      ? 'this-week'
      : 'exploring',
  includeHouseholdDetails: Boolean(
    existingProfile?.householdSize !== undefined
      || existingProfile?.hasChildren !== undefined
      || existingProfile?.hasSeniors !== undefined
      || (existingProfile?.monthlyIncome && existingProfile.monthlyIncome !== 'prefer-not-to-say')
      || (existingProfile?.employmentStatus && existingProfile.employmentStatus !== 'prefer-not-to-say')
  ),
});

const normalizeNeeds = (needs: NeedChoice[]): CategoryId[] => {
  const categories = new Set<CategoryId>();
  needs.forEach((need) => {
    if (need === 'housing') {
      return;
    }
    categories.add(need as CategoryId);
  });
  return Array.from(categories);
};

const stepTitles = {
  en: [
    'What do you need help with?',
    'Where are you looking?',
    'What would make this easier for you?',
    'You can skip this.',
  ],
  es: [
    '¿Con qué necesita ayuda?',
    '¿Dónde está buscando?',
    '¿Qué haría esto más fácil para usted?',
    'Puede omitir esto.',
  ],
};

const stepHelpers = {
  en: [
    'Choose one or more kinds of help. We use this to show the right resources.',
    'Choose a city or look across Silicon Valley. Age is optional.',
    'These are preferences we use to sort options. They are not guarantees.',
    'Share only what you want. You can skip these details.',
  ],
  es: [
    'Elija una o más opciones de ayuda. Las usamos para mostrar recursos adecuados.',
    'Elija una ciudad o busque en todo Silicon Valley. La edad es opcional.',
    'Estas son preferencias que usamos para ordenar opciones. No son garantías.',
    'Comparta solo lo que quiera. Puede omitir estos datos.',
  ],
};

export const IntroductionForm: React.FC<IntroductionFormProps> = ({
  currentLanguage,
  existingProfile,
  onSaveProfile,
  onClose,
  isModal = false,
  source,
  restoreFocusTarget,
}) => {
  const initialDraft = useMemo(() => makeDefaultDraft(existingProfile), [existingProfile]);
  const [draft, setDraft] = useState<DraftState>(initialDraft);
  const [step, setStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [liveMessage, setLiveMessage] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const showDemoScenarios = import.meta.env.DEV || (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === '1');

  const stepMeta = stepTitles[currentLanguage];
  const stepHelper = stepHelpers[currentLanguage];
  const progressValue = ((step + 1) / 4) * 100;
  const totalSteps = 4;

  useEffect(() => {
    const opener = restoreFocusTarget?.current ?? document.activeElement as HTMLElement | null;
    restoreFocusRef.current = opener;
    if (source) {
      console.info('find-my-support-open-source', source);
    }
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [restoreFocusTarget, source]);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as { draft?: Partial<DraftState>; step?: number; showSummary?: boolean };
      const restoredDraft = parsed.draft;
      if (restoredDraft) {
        setDraft((prev) => ({
          ...prev,
          ...restoredDraft,
          city: restoredDraft.city ?? prev.city,
          servicePriorities: restoredDraft.servicePriorities ?? prev.servicePriorities,
        }));
      }
      if (typeof parsed.step === 'number') setStep(parsed.step);
      if (typeof parsed.showSummary === 'boolean') setShowSummary(parsed.showSummary);
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const snapshot = JSON.stringify({ draft, step, showSummary });
    sessionStorage.setItem(STORAGE_KEY, snapshot);
    if (step === 0 && draft.servicePriorities.length === 0 && draft.city === 'Other Silicon Valley' && !draft.noIdRequiredPreference && !draft.transitDependent && !draft.preferPhoneOrOnline && !draft.needEveningWeekend && !draft.needAccessibilitySupport && !draft.name && !draft.hasChildren && !draft.hasSeniors && draft.monthlyIncome === 'prefer-not-to-say' && draft.employmentStatus === 'prefer-not-to-say') {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [draft, step, showSummary]);

  useEffect(() => {
    if (showSummary) {
      setLiveMessage(`Step 4 of 4: Review your choices.`);
      return;
    }
    const message = `Step ${step + 1} of 4: ${stepMeta[step]}`;
    setLiveMessage(message);
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
  }, [step, showSummary, stepMeta]);

  useEffect(() => {
    if (document.activeElement === document.body) {
      titleRef.current?.focus();
    }
  }, [showSummary]);

  useEffect(() => {
    const hasDirtyValues = JSON.stringify(draft) !== JSON.stringify(initialDraft);
    setHasStarted(hasDirtyValues);
  }, [draft, initialDraft]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModal || !dialogRef.current) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        handleCloseRequest();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModal, step, showSummary, draft, initialDraft]);

  const handleCloseRequest = () => {
    const shouldConfirm = hasStarted && !isSubmitted;
    const proceed = shouldConfirm ? window.confirm('Leave the form? Your answers are not saved.') : true;

    if (!proceed) return;
    sessionStorage.removeItem(STORAGE_KEY);
    onClose?.();

    requestAnimationFrame(() => {
      restoreFocusRef.current?.focus();
      restoreFocusTarget?.current?.focus();
    });
  };

  const toggleNeed = (need: NeedChoice) => {
    setDraft((current) => ({
      ...current,
      servicePriorities: current.servicePriorities.includes(need)
        ? current.servicePriorities.filter((item) => item !== need)
        : [...current.servicePriorities, need],
    }));
  };

  const updateDraftField = <K extends keyof DraftState>(field: K, value: DraftState[K]) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const saveProfile = () => {
    const profile: IntakeProfile = {
      name: draft.name.trim(),
      ageRange: draft.ageRange,
      city: draft.city === 'Other Silicon Valley' ? 'Other Silicon Valley' : draft.city,
      householdSize: draft.includeHouseholdDetails ? draft.householdSize : undefined,
      hasChildren: draft.includeHouseholdDetails ? draft.hasChildren : undefined,
      hasSeniors: draft.includeHouseholdDetails ? draft.hasSeniors : undefined,
      monthlyIncome: draft.includeHouseholdDetails ? draft.monthlyIncome : 'prefer-not-to-say',
      employmentStatus: draft.includeHouseholdDetails ? draft.employmentStatus : 'prefer-not-to-say',
      servicePriorities: normalizeNeeds(draft.servicePriorities),
      urgency: draft.urgency === 'this-week' ? 'soon' : draft.urgency,
      otherNeeds: draft.servicePriorities.includes('housing')
        ? ['housing', 'utilities', 'transportation'] satisfies OtherBasicNeed[]
        : [],
      accessPreferences: [
        ...(draft.preferPhoneOrOnline ? ['remote' as const] : []),
        ...(draft.needEveningWeekend ? ['evenings' as const] : []),
        ...(draft.needAccessibilitySupport ? ['accessible' as const] : []),
      ] satisfies AccessPreference[],
      preferredLanguage: draft.preferredLanguage,
      noIdRequiredPreference: draft.noIdRequiredPreference,
      transitDependent: draft.transitDependent,
      submittedAt: new Date().toISOString(),
    };

    onSaveProfile(profile);
    setIsSubmitted(true);
    sessionStorage.removeItem(STORAGE_KEY);
    onClose?.();
  };

  const handleNext = () => {
    if (step === 0 && draft.servicePriorities.length === 0) {
      setErrorMessage(currentLanguage === 'en' ? 'Choose at least one kind of help so we can show the right resources.' : 'Elija al menos un tipo de ayuda para ver los recursos correctos.');
      requestAnimationFrame(() => {
        document.getElementById('needs-error')?.focus();
      });
      return;
    }

    setErrorMessage('');
    if (step < totalSteps - 1) {
      setStep((current) => current + 1);
      return;
    }

    setShowSummary(true);
  };

  const handleSkip = () => {
    setErrorMessage('');
    if (showSummary) {
      saveProfile();
      return;
    }
    if (step < totalSteps - 1) {
      setStep((current) => current + 1);
      return;
    }
    setShowSummary(true);
  };

  const summaryRows = [
    { label: currentLanguage === 'en' ? 'Needs' : 'Necesidades', value: draft.servicePriorities.length ? draft.servicePriorities.map((item) => ({
        food: currentLanguage === 'en' ? 'Food' : 'Comida',
        'mental-health': currentLanguage === 'en' ? 'Mental health' : 'Salud mental',
        workforce: currentLanguage === 'en' ? 'Education & workforce' : 'Educación y trabajo',
        community: currentLanguage === 'en' ? 'Community connection' : 'Conexión comunitaria',
        housing: currentLanguage === 'en' ? 'Housing / bills / transportation' : 'Vivienda / pagos / transporte',
      })[item]).join(', ') : (currentLanguage === 'en' ? 'No need selected yet' : 'Todavía no eligió ninguna necesidad'), step: 0 },
    { label: currentLanguage === 'en' ? 'Area' : 'Zona', value: draft.city === 'Other Silicon Valley' ? (currentLanguage === 'en' ? 'Anywhere in Silicon Valley' : 'Cualquier lugar en Silicon Valley') : draft.city, step: 1 },
    { label: currentLanguage === 'en' ? 'Preferences' : 'Preferencias', value: [
        draft.noIdRequiredPreference ? (currentLanguage === 'en' ? 'No ID needed' : 'No requiere identificación') : null,
        draft.transitDependent ? (currentLanguage === 'en' ? 'Uses public transit' : 'Usa transporte público') : null,
        draft.preferPhoneOrOnline ? (currentLanguage === 'en' ? 'Prefers phone or online' : 'Prefiere teléfono o línea en línea') : null,
        draft.needEveningWeekend ? (currentLanguage === 'en' ? 'Needs evening or weekend hours' : 'Necesita horarios por la noche o fines de semana') : null,
        draft.needAccessibilitySupport ? (currentLanguage === 'en' ? 'Needs accessibility support' : 'Necesita apoyo de accesibilidad') : null,
      ].filter(Boolean).join(' • ') || (currentLanguage === 'en' ? 'No extra preferences selected' : 'No seleccionó preferencias adicionales'), step: 2 },
    { label: currentLanguage === 'en' ? 'Optional details' : 'Detalles opcionales', value: [
        draft.name || (currentLanguage === 'en' ? 'No name added' : 'Sin nombre agregado'),
        draft.includeHouseholdDetails
          ? `${draft.householdSize} ${currentLanguage === 'en' ? 'in home' : 'en el hogar'}`
          : (currentLanguage === 'en' ? 'Household details skipped' : 'Omitió los datos del hogar'),
      ].join(' • '), step: 3 },
  ];

  const renderStep = () => {
    if (showSummary) {
      return (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-xl font-extrabold text-slate-900">{currentLanguage === 'en' ? 'Here is what we found' : 'Esto es lo que encontramos'}</h2>
            <p className="mt-2 text-sm text-slate-700">
              {currentLanguage === 'en'
                ? 'We use this to sort resources that fit your needs and area.'
                : 'Usamos esto para ordenar recursos que se ajusten a sus necesidades y zona.'}
            </p>
          </div>

          <div className="space-y-3">
            {summaryRows.map((item) => (
              <div key={item.label} className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-800">{item.value}</p>
                </div>
                <button
                  type="button"
                  className="text-sm font-bold text-emerald-800 underline underline-offset-2"
                  onClick={() => {
                    setShowSummary(false);
                    setStep(item.step);
                  }}
                >
                  {currentLanguage === 'en' ? 'Edit' : 'Editar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    switch (step) {
      case 0:
        return (
          <StepNeeds
            currentLanguage={currentLanguage}
            selected={draft.servicePriorities}
            urgency={draft.urgency}
            onToggleNeed={toggleNeed}
            onUrgencyChange={(value) => updateDraftField('urgency', value)}
            error={errorMessage}
            onErrorClear={() => setErrorMessage('')}
          />
        );
      case 1:
        return (
          <StepLocation
            currentLanguage={currentLanguage}
            city={draft.city === 'Other Silicon Valley' ? 'Other Silicon Valley' : draft.city}
            onCityChange={(value) => updateDraftField('city', value)}
            ageRange={draft.ageRange}
            onAgeRangeChange={(value) => updateDraftField('ageRange', value)}
          />
        );
      case 2:
        return (
          <StepPreferences
            currentLanguage={currentLanguage}
            noIdRequiredPreference={draft.noIdRequiredPreference}
            onNoIdRequiredPreferenceChange={(value) => updateDraftField('noIdRequiredPreference', value)}
            transitDependent={draft.transitDependent}
            onTransitDependentChange={(value) => updateDraftField('transitDependent', value)}
            preferPhoneOrOnline={draft.preferPhoneOrOnline}
            onPreferPhoneOrOnlineChange={(value) => updateDraftField('preferPhoneOrOnline', value)}
            needEveningWeekend={draft.needEveningWeekend}
            onNeedEveningWeekendChange={(value) => updateDraftField('needEveningWeekend', value)}
            needAccessibilitySupport={draft.needAccessibilitySupport}
            onNeedAccessibilitySupportChange={(value) => updateDraftField('needAccessibilitySupport', value)}
            preferredLanguage={draft.preferredLanguage}
            onPreferredLanguageChange={(value) => updateDraftField('preferredLanguage', value)}
          />
        );
      default:
        return (
          <StepOptionalDetails
            currentLanguage={currentLanguage}
            name={draft.name}
            onNameChange={(value) => updateDraftField('name', value)}
            householdSize={draft.householdSize}
            onHouseholdSizeChange={(value) => updateDraftField('householdSize', value)}
            hasChildren={draft.hasChildren}
            onHasChildrenChange={(value) => updateDraftField('hasChildren', value)}
            hasSeniors={draft.hasSeniors}
            onHasSeniorsChange={(value) => updateDraftField('hasSeniors', value)}
            monthlyIncome={draft.monthlyIncome}
            onMonthlyIncomeChange={(value) => updateDraftField('monthlyIncome', value)}
            employmentStatus={draft.employmentStatus}
            onEmploymentStatusChange={(value) => updateDraftField('employmentStatus', value)}
            includeHouseholdDetails={draft.includeHouseholdDetails}
            onIncludeHouseholdDetailsChange={(value) => updateDraftField('includeHouseholdDetails', value)}
          />
        );
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="find-my-support-title"
      lang={currentLanguage}
      className={`mx-auto flex h-full w-full max-w-2xl flex-col overflow-hidden border border-slate-200 bg-white shadow-2xl ${
        isModal ? 'max-h-none rounded-none sm:h-auto sm:max-h-[90vh] sm:rounded-[28px]' : 'my-6 h-auto rounded-[28px]'
      }`}
    >
      <header className="border-b border-slate-200 bg-white px-5 pb-4 pt-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id="find-my-support-title" ref={titleRef} tabIndex={-1} className="text-2xl font-extrabold tracking-[-0.04em] text-slate-900 outline-none">
              {currentLanguage === 'en' ? 'Find My Support' : 'Encuentra mi apoyo'}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {currentLanguage === 'en'
                ? 'Tell us a little so we can suggest nearby options that fit your day.'
                : 'Cuéntenos un poco para sugerir opciones cercanas que se adapten a su día.'}
            </p>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={handleCloseRequest}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              aria-label={currentLanguage === 'en' ? 'Close the form' : 'Cerrar el formulario'}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {showDemoScenarios && (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setDraft({
                  ...draft,
                  name: 'Maria',
                  city: 'East San Jose',
                  ageRange: '25-49',
                  householdSize: 4,
                  hasChildren: true,
                  hasSeniors: false,
                  monthlyIncome: '< $2,500',
                  employmentStatus: 'part-time',
                  servicePriorities: ['food', 'community'],
                  preferredLanguage: 'Español',
                  noIdRequiredPreference: true,
                  transitDependent: true,
                  urgency: 'today',
                });
              }}
              className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800"
            >
              Demo: family
            </button>
          </div>
        )}
      </header>

      <div className="border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-slate-700">
          <span>
            {currentLanguage === 'en' ? `Step ${step + 1} of ${totalSteps}` : `Paso ${step + 1} de ${totalSteps}`}
          </span>
          <span className="text-slate-500">{Math.round(progressValue)}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={4}
          aria-valuenow={step + 1}
          aria-valuetext={currentLanguage === 'en' ? `Step ${step + 1} of 4: ${stepMeta[showSummary ? 3 : step]}` : `Paso ${step + 1} de 4: ${stepMeta[showSummary ? 3 : step]}`}
          className="h-2 overflow-hidden rounded-full bg-emerald-100"
        >
          <div className="h-full rounded-full bg-emerald-700 transition-all duration-200" style={{ width: `${progressValue}%` }} />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-slate-50 px-5 py-5 sm:px-6">
        <div aria-live="polite" className="sr-only">
          {liveMessage}
        </div>

        <div className="mb-5">
          <h2 ref={stepHeadingRef} tabIndex={-1} className="text-xl font-extrabold tracking-[-0.03em] text-slate-900 outline-none">
            {showSummary
              ? currentLanguage === 'en'
                ? 'Review your choices'
                : 'Revise sus opciones'
              : stepMeta[step]}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {showSummary
              ? currentLanguage === 'en'
                ? 'We use these details to sort the best options for you.'
                : 'Usamos estos detalles para ordenar las mejores opciones para usted.'
              : stepHelper[step]}
          </p>
        </div>

        {renderStep()}
      </div>

      {!showSummary && (
        <footer className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            disabled={step === 0}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {currentLanguage === 'en' ? 'Back' : 'Atrás'}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => step === totalSteps - 1 ? saveProfile() : handleSkip()}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-emerald-700 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              {step === totalSteps - 1
                ? (currentLanguage === 'en' ? 'Skip and see my results' : 'Omitir y ver mis resultados')
                : (currentLanguage === 'en' ? 'Skip this step' : 'Omitir este paso')}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              {step === totalSteps - 1 ? (currentLanguage === 'en' ? 'Next' : 'Siguiente') : (currentLanguage === 'en' ? 'Next' : 'Siguiente')}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </footer>
      )}

      {showSummary && (
        <footer className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => setShowSummary(false)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <ArrowLeft className="h-4 w-4" />
            {currentLanguage === 'en' ? 'Edit' : 'Editar'}
          </button>
          <button
            type="button"
            onClick={saveProfile}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            {currentLanguage === 'en' ? 'Save and see my results' : 'Guardar y ver mis resultados'}
          </button>
        </footer>
      )}
    </div>
  );
};
