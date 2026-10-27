import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CheckCircle2, ExternalLink, GraduationCap, RotateCcw, ShieldCheck, Sparkles, X } from 'lucide-react';
import { danielSources } from '../data/danielAssistant';
import { selectGuidedInsights } from '../data/nextStepInsightsRouting';
import { NextStepInsightCard } from './NextStepInsightCard';

type Track = 'employer' | 'training' | 'funding' | 'career' | 'immediate' | 'family';
type Question = { id: string; prompt: string; detail?: string; options: Array<{value: string; label: string}> };
type SourceKey = keyof typeof danielSources;

const options = (values: Array<[string, string]>) => values.map(([value, label]) => ({ value, label }));
const tracks: Array<{ id: Track; label: string; description: string }> = [
  { id: 'employer', label: 'Find training connected to employers', description: 'Explore Tesla MDP and Ohlone’s Semiconductor Skills Bridge Academy.' },
  { id: 'training', label: 'Find affordable training', description: 'Compare skills, schedules and local programs.' },
  { id: 'funding', label: 'Find help paying for training', description: 'Explore workforce funding and California EDD resources.' },
  { id: 'career', label: 'Explore a new career', description: 'Build on your previous manufacturing experience.' },
  { id: 'immediate', label: 'Find work as soon as possible', description: 'Start with job-search help, résumé workshops and local workforce centers.' },
  { id: 'family', label: 'Find support for my household', description: 'Optional connection to Maria’s food-assistance journey.' },
];
const questions: Record<Track, Question[]> = {
  employer: [
    { id: 'program', prompt: 'Which kind of employer-connected program interests you?', options: options([
      ['tesla', 'Tesla MDP — manufacturing pathway with a potential full-time role after completion'],
      ['ssba', 'SSBA — semiconductor training with a stipend in documented cohorts'],
      ['both', 'Compare Tesla MDP and SSBA'],
      ['unsure', 'Help me understand the differences'],
    ]) },
    { id: 'schedule', prompt: 'Which training schedule would work for your household?', options: options([
      ['weekday', 'Weekday / full-time training'], ['evening', 'Evenings or weekends'],
      ['flexible', 'Online or flexible training if available'], ['unsure', 'I need to check schedules'],
    ]) },
    { id: 'eligibility', prompt: 'What should we check before you consider applying?', detail: 'Daniel is 45. Tesla describes MDP as aimed at high-school graduates and early-career individuals, so confirm adult applicant eligibility with the program.', options: options([
      ['adult', 'Whether mid-career adults can apply'],
      ['benefits', 'Job-offer or stipend conditions'],
      ['dates', 'Next cohort and requirements'],
      ['all', 'All of the above'],
    ]) },
  ],
  training: [
    { id: 'experience', prompt: 'What experience would you like to build on?', options: options([
      ['manufacturing', 'Manufacturing / assembly / equipment'],
      ['it', 'Computers or IT'], ['operations', 'Operations or team leadership'],
      ['other', 'I want to explore new skills'],
    ]) },
    { id: 'interest', prompt: 'Which direction sounds interesting?', options: options([
      ['semiconductor', 'Semiconductor manufacturing'],
      ['tesla', 'Vehicle and advanced manufacturing'],
      ['it', 'IT or cloud support'], ['unsure', 'Show me a comparison'],
    ]) },
    { id: 'format', prompt: 'What type of training could you attend?', options: options([
      ['fulltime', 'Full time'], ['parttime', 'Part time / evenings'],
      ['online', 'Online / self-paced'], ['unsure', 'Flexible'],
    ]) },
  ],
  funding: [
    { id: 'unemployment', prompt: 'Are you receiving California unemployment benefits?', detail: 'You can skip this; no claim records or financial details are collected.', options: options([
      ['yes', 'Yes'], ['waiting', 'I applied but am waiting'],
      ['no', 'No'], ['skip', 'Prefer not to say'],
    ]) },
    { id: 'budget', prompt: 'What training cost would be manageable?', options: options([
      ['nocost', 'I need no-cost options'], ['lowcost', 'Some costs may work'],
      ['stipend', 'Training with a stipend interests me'], ['unsure', 'Show me the options'],
    ]) },
    { id: 'fundingType', prompt: 'Which type of support would you like to explore?', options: options([
      ['wioa', 'Workforce funding (WIOA)'], ['ctb', 'EDD training while unemployed (CTB)'],
      ['stipend', 'SSBA completion stipend'], ['all', 'Compare all'],
    ]) },
  ],
  career: [
    { id: 'skills', prompt: 'Which skills describe your previous work?', options: options([
      ['equipment', 'Equipment / mechanical troubleshooting'],
      ['quality', 'Production and quality checks'], ['computers', 'Computer operations'],
      ['unsure', 'Help me identify transferable skills'],
    ]) },
    { id: 'priority', prompt: 'What matters most for your next job?', options: options([
      ['experience', 'Use my existing experience'],
      ['new', 'Train for a new industry'], ['quick', 'Return to work soon'],
      ['schedule', 'A schedule that fits family responsibilities'],
    ]) },
    { id: 'duration', prompt: 'How long could you realistically train?', options: options([
      ['weeks', 'A few weeks'], ['months', 'Three to six months'],
      ['year', 'Six to twelve months'], ['flexible', 'I am still deciding'],
    ]) },
  ],
  immediate: [
    { id: 'urgency', prompt: 'What is your immediate priority?', options: options([
      ['apply', 'Apply for jobs now'], ['resume', 'Improve my résumé or interviewing skills'],
      ['advisor', 'Find a career counselor'], ['training', 'Train while looking for jobs'],
    ]) },
    { id: 'location', prompt: 'Where could you work or attend services?', options: options([
      ['milpitas', 'Milpitas / North San Jose'], ['santaclara', 'Other Santa Clara County cities'],
      ['fremont', 'Fremont / Alameda County'], ['remote', 'Remote or flexible'],
    ]) },
    { id: 'support', prompt: 'What would help you most this week?', options: options([
      ['workshop', 'Free job-search or résumé workshop'], ['assessment', 'Skills assessment'],
      ['training', 'Explore employer-connected training'], ['adviser', 'Speak to a career adviser'],
    ]) },
  ],
  family: [
    { id: 'groceries', prompt: 'Would you like to explore household food-support options while looking for work?', detail: 'This is a separate optional branch connected to Maria’s fictional scenario.', options: options([
      ['yes', 'Yes, show food assistance options'],
      ['maybe', 'Maybe, I would like information'],
      ['no', 'No, continue with workforce training'],
      ['skip', 'Skip this question'],
    ]) },
  ],
};

const programCards = [
  {
    id: 'tesla',
    title: 'Tesla Manufacturing Development Program (MDP)',
    summary: 'Ohlone-connected advanced manufacturing pathway with a potential full-time Production Associate transition following successful completion.',
    benefit: 'Full-time employment pathway',
    caution: 'Tesla targets high-school seniors and early-career individuals. Daniel must confirm that the current cohort accepts mid-career applicants. Do not promise a job.',
    source: danielSources.tesla,
    extra: danielSources.ohloneMdp,
  },
  {
    id: 'ssba',
    title: 'Semiconductor Skills Bridge Academy (SSBA)',
    summary: 'Ohlone semiconductor and smart-manufacturing training with job-readiness support and industry exposure.',
    benefit: '$1,500 stipend in documented completion-based cohorts',
    caution: 'Confirm whether the stipend applies to the next cohort, current eligibility, cost and schedule. No guaranteed employment.',
    source: danielSources.ssba,
    extra: danielSources.fremont,
  },
];

function getResults(track: Track, answers: Record<string, string>) {
  const names: SourceKey[] = ['ohlone', 'nova'];
  let intro = 'Daniel can compare options before making an enrollment commitment.';
  let insights: string[] = [];
  let recommendedPrograms: string[] = [];
  if (track === 'employer') {
    const chosen = answers.program;
    recommendedPrograms = chosen === 'tesla' ? ['tesla'] : chosen === 'ssba' ? ['ssba'] : ['tesla','ssba'];
    names.push('tesla', 'ssba', 'fremont');
    intro = 'These programs take different approaches: MDP is connected to a potential Tesla employment pathway; SSBA has offered a completion stipend and semiconductor-focused training.';
    insights = [
      'Ask Ohlone and Tesla which cohorts are open and whether a 45-year-old experienced worker can apply.',
      'Confirm the exact conditions for any Tesla employment offer or SSBA stipend.',
      'Verify class dates, schedule, training costs, location and job requirements before applying.',
    ];
  } else if (track === 'training') {
    recommendedPrograms = ['tesla', 'ssba'];
    names.push('careeronestop', 'bls', 'fremont');
    intro = 'Your prior experience can help you compare semiconductor, advanced manufacturing, and other technology training routes.';
    insights = [
      'Compare training prerequisites and duration against your experience and goals.',
      'Review official program pages to check current costs and schedules.',
      'Ask a career counselor about employer-linked and college certificate options.',
    ];
  } else if (track === 'funding') {
    recommendedPrograms = answers.fundingType === 'stipend' || answers.budget === 'stipend' ? ['ssba'] : ['tesla','ssba'];
    names.push('wioa', 'etpl', 'ctb', 'ssba');
    intro = 'WIOA funding, California Training Benefits, and program stipends are different forms of assistance, and none is automatic.';
    insights = [
      'Ask an appropriate workforce center whether funding is available for an approved training plan.',
      'If receiving unemployment benefits, ask EDD about California Training Benefits before assuming training is covered.',
      'Ask SSBA if the $1,500 completion stipend applies to the upcoming cohort.',
    ];
  } else if (track === 'career') {
    recommendedPrograms = ['ssba', 'tesla'];
    names.push('careeronestop', 'bls', 'fremont');
    intro = 'Manufacturing experience can translate into multiple technical careers; compare specific job duties and training requirements rather than relying on job titles.';
    insights = [
      'Complete an occupational skills comparison or talk with a workforce adviser.',
      'Check employer requirements, schedules and local demand for roles of interest.',
      'Compare a short bridge program with a longer certificate or degree pathway.',
    ];
  } else if (track === 'immediate') {
    names.push('jobseekers', 'nova', 'alameda', 'careeronestop');
    intro = 'If income or employment is urgent, you can begin job searching and ask a workforce center for free career help while deciding whether training fits your timing.';
    insights = [
      'Check California EDD unemployment guidance and report new earnings as required.',
      'Contact a workforce center serving your area for current résumé workshops, job-search resources, and referrals.',
      'Use current official job listings to explore roles before committing to paid training.',
    ];
  } else {
    names.push('food', 'jobseekers', 'alameda');
    intro = answers.groceries === 'no' || answers.groceries === 'skip'
      ? 'You can stay focused on training and return to household resources later.'
      : 'Daniel may explore food-support information alongside retraining without sharing personal household details in this demonstration.';
    insights = [
      'If food assistance would help, review the separate Maria pathway and official CalFresh guidance.',
      'Contact local benefit providers for current eligibility and service locations.',
      'Continue Daniel’s training plan whenever you are ready.',
    ];
  }
  return {
    intro,
    insights,
    programs: programCards.filter(program => recommendedPrograms.includes(program.id)),
    sources: names.filter((key, i, arr) => arr.indexOf(key) === i).map(key => danielSources[key]),
  };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAskCopilot?: (question: string) => void;
  initialQuestion?: string;
}
export function DanielTrainingGuide({ isOpen, onClose, onAskCopilot, initialQuestion = '' }: Props) {
  const [track, setTrack] = useState<Track | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    setTrack(null);
    setStep(0);
    setAnswers({});
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onEscape);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const id = window.setTimeout(() => dialogRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('keydown', onEscape);
      window.clearTimeout(id);
      document.body.style.overflow = originalOverflow;
      previousFocus.current?.focus();
    };
  }, [isOpen, onClose]);

  const activeQuestions = track ? questions[track] : [];
  const finished = Boolean(track) && step >= activeQuestions.length;
  const result = useMemo(() => track ? getResults(track, answers) : null, [track, answers]);
  const guidedInsights = useMemo(() => track ? selectGuidedInsights('Daniel', track, answers) : [], [track, answers]);
  if (!isOpen) return null;

  const choose = (value: string) => {
    if (!track || finished) return;
    const question = activeQuestions[step];
    setAnswers(prev => ({ ...prev, [question.id]: value }));
    setStep(prev => prev + 1);
  };
  const back = () => {
    if (step > 0) setStep(prev => prev - 1);
    else { setTrack(null); setAnswers({}); }
  };
  const ask = () => {
    if (!track || !onAskCopilot) return;
    const selectionDetails = questions[track]
      .filter(question => Boolean(answers[question.id]) && answers[question.id] !== 'skip')
      .map(question => {
        const option = question.options.find(item => item.value === answers[question.id]);
        return question.prompt + ' ' + (option?.label || 'Not specified');
      });
    onAskCopilot([
      'I am Daniel Delgado, a fictional 45-year-old recently laid-off manufacturing worker in Milpitas/North San Jose.',
      initialQuestion.trim() || 'I just lost my job and want to explore a new career. Are there affordable training programs that could help me find work?',
      'My topic is: ' + (tracks.find(item => item.id === track)?.label || 'workforce retraining') + '.',
      ...selectionDetails,
      'What are the next steps for the program or concern I selected? Explain eligibility and current details to verify. Do not guarantee employment, funding or stipends.',
    ].join(' '));
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 p-3 sm:p-6" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="daniel-guide-title" tabIndex={-1}
        className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white text-slate-900 shadow-2xl outline-none">
        <div className="sticky top-0 z-10 flex justify-between items-center gap-3 bg-white border-b border-slate-200 px-5 sm:px-8 py-4 rounded-t-3xl">
          <div className="flex gap-2 items-center font-bold text-sm text-indigo-800"><BriefcaseBusiness size={20}/> WhatSack / Workforce guidance</div>
          <button type="button" onClick={onClose} aria-label="Close Daniel's guided search" className="p-2 rounded-xl hover:bg-slate-100"><X size={20}/></button>
        </div>
        <div className="px-5 sm:px-8 py-7 space-y-6">
          <div>
            <p className="flex items-center gap-2 text-indigo-700 uppercase tracking-wide text-xs font-extrabold mb-3"><Sparkles size={16}/> Interactive scripted demonstration</p>
            <h2 id="daniel-guide-title" className="text-2xl sm:text-3xl font-extrabold">Find a path into your next career</h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">Daniel is 45 and has been laid off from manufacturing. Choose a topic and answer a few optional questions to compare training, financial support and next steps.</p>
            {initialQuestion.trim() && <p className="mt-3 rounded-xl bg-indigo-50 border border-indigo-200 p-3 text-sm"><strong>Your question:</strong> {initialQuestion}</p>}
          </div>
          {!track && (
            <section aria-label="Daniel's starting choices" className="space-y-3">
              <h3 className="font-extrabold text-lg">What would you like help with first?</h3>
              {tracks.map(item => (
                <button key={item.id} type="button" onClick={() => { setTrack(item.id); setStep(0); setAnswers({}); }}
                  className="w-full rounded-2xl border-2 border-slate-200 p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-indigo-50 hover:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-700">
                  <span><strong className="block">{item.label}</strong><span className="block text-sm text-slate-600 mt-1">{item.description}</span></span>
                  <ArrowRight size={18} className="shrink-0 text-indigo-700"/>
                </button>
              ))}
            </section>
          )}
          {track && !finished && (
            <section aria-live="polite" className="space-y-4">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-600">
                <span>{tracks.find(item => item.id === track)?.label}</span>
                <span>Question {step+1} of {activeQuestions.length}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100"><div className="bg-indigo-600 h-2 rounded-full" style={{width: (((step+1)/activeQuestions.length)*100) + '%'}}/></div>
              <h3 className="font-extrabold text-xl sm:text-2xl">{activeQuestions[step].prompt}</h3>
              {activeQuestions[step].detail && <p className="text-sm text-slate-600">{activeQuestions[step].detail}</p>}
              <div className="space-y-2">
                {activeQuestions[step].options.map(choice => (
                  <button key={choice.value} type="button" onClick={() => choose(choice.value)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left border border-slate-300 hover:border-indigo-600 hover:bg-indigo-50 rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-700">
                    <span className="font-semibold text-sm sm:text-base">{choice.label}</span><ArrowRight size={17} className="shrink-0 text-indigo-700"/>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-2 gap-3">
                <button type="button" onClick={back} className="flex items-center gap-1.5 font-bold text-sm text-slate-700"><ArrowLeft size={17}/> Back</button>
                <button type="button" onClick={() => choose('skip')} className="text-sm font-bold underline text-indigo-800">Skip this question</button>
              </div>
            </section>
          )}
          {track && finished && result && (
            <section className="space-y-5" aria-live="polite">
              <div className="flex items-center gap-2 font-extrabold text-indigo-800"><CheckCircle2 size={20}/> Daniel's starting points</div>
              <p className="text-slate-700">{result.intro}</p>
              {result.programs.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-lg">Compare employer-connected training</h3>
                  {result.programs.map(program => (
                    <article key={program.id} className="rounded-2xl border border-indigo-200 p-4 space-y-2">
                      <div className="flex items-start gap-2"><GraduationCap size={18} className="shrink-0 text-indigo-700 mt-1"/><h4 className="font-extrabold text-base">{program.title}</h4></div>
                      <p className="text-sm text-slate-700">{program.summary}</p>
                      <p className="text-sm font-bold text-indigo-900">{program.benefit}</p>
                      <p className="text-xs text-amber-900 bg-amber-50 rounded-lg border border-amber-200 p-3">{program.caution}</p>
                      <div className="flex flex-wrap gap-4 text-xs font-bold text-indigo-800">
                        <a href={program.source.url} target="_blank" rel="noopener noreferrer" className="underline inline-flex gap-1 items-center">Official starting page <ExternalLink size={13}/></a>
                        <a href={program.extra.url} target="_blank" rel="noopener noreferrer" className="underline inline-flex gap-1 items-center">Additional source <ExternalLink size={13}/></a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
              <div className="rounded-2xl border border-slate-200 p-4">
                <h3 className="font-extrabold text-lg mb-3">Other official starting points</h3>
                <div className="space-y-2">
                  {result.sources.map(source => (
                    <a href={source.url} key={source.url} target="_blank" rel="noopener noreferrer"
                      className="flex justify-between items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 p-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-50 hover:border-indigo-500">
                      <span>{source.title}</span><ExternalLink size={16} className="shrink-0"/>
                    </a>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-extrabold">NextStep Insights — based on your choices</h3>
                {guidedInsights.length > 0 ? guidedInsights.map(insight => (
                  <NextStepInsightCard key={insight.id} entry={insight} variant="daniel" />
                )) : (
                  <ul className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 space-y-2">
                    {result.insights.map((item,index) => <li key={index} className="text-sm">{item}</li>)}
                  </ul>
                )}
              </div>
              <p className="text-xs text-slate-600 flex items-start gap-2"><ShieldCheck size={17} className="shrink-0"/> Scripted academic demonstration, not a live AI search. Current program dates, fees, eligibility, job offers, stipends, and funding must be confirmed with the provider. Your answers stay in this browser session.</p>
              <div className="flex gap-2 flex-wrap pt-1">
                {onAskCopilot && <button type="button" onClick={ask} className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-3 rounded-xl flex items-center gap-2"><Sparkles size={17}/> Ask the Copilot about these results</button>}
                <button type="button" onClick={() => { setTrack(null); setStep(0); setAnswers({}); }} className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-4 py-3 rounded-xl flex items-center gap-2"><RotateCcw size={17}/> Explore another pathway</button>
                <button type="button" onClick={back} className="font-bold text-sm border border-slate-300 px-4 py-3 rounded-xl">Change last answer</button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
