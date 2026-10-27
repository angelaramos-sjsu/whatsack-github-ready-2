import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ExternalLink, GraduationCap, RotateCcw, ShieldCheck, Sparkles, X } from 'lucide-react';
import { selectGuidedInsights } from '../data/nextStepInsightsRouting';
import { NextStepInsightCard } from './NextStepInsightCard';

type Track = 'colleges' | 'aid' | 'compare' | 'apply';
type Answer = { value: string; label: string };
type Question = { id: string; prompt: string; detail?: string; options: Answer[] };
type Resource = { title: string; description: string; url: string };

const choices = (values: Array<[string, string]>): Answer[] => values.map(([value, label]) => ({ value, label }));

const tracks: { id: Track; label: string; description: string }[] = [
  { id: 'colleges', label: 'Find affordable colleges', description: 'Explore schools near home or elsewhere.' },
  { id: 'aid', label: 'Understand financial aid', description: 'Grants, scholarships, FAFSA, and college costs.' },
  { id: 'compare', label: 'Compare college pathways', description: 'Community college, university, and transfer.' },
  { id: 'apply', label: 'Learn how to apply', description: 'Find the application steps that fit your plans.' },
];

const questions: Record<Track, Question[]> = {
  colleges: [
    { id: 'location', prompt: 'Where would you prefer to attend college?', options: choices([
      ['fremont', 'Near Fremont'], ['bay', 'Anywhere in the Bay Area'],
      ['california', 'Anywhere in California'], ['unsure', 'I’m not sure yet'],
    ]) },
    { id: 'pathway', prompt: 'Which college pathway sounds most interesting?', options: choices([
      ['community', 'Community college'], ['university', 'Four-year university'],
      ['both', 'I want to compare both'], ['unsure', 'I’m not sure yet'],
    ]) },
    { id: 'interests', prompt: 'Do you already have an interest or career in mind?', detail: 'You do not need to have a major figured out.', options: choices([
      ['stem', 'Science, technology, engineering, or math'], ['health', 'Healthcare or helping people'],
      ['other', 'Another subject or career'], ['undecided', 'I’m still exploring'],
    ]) },
  ],
  aid: [
    { id: 'aidTopic', prompt: 'What do you most want to understand about paying for college?', options: choices([
      ['applications', 'FAFSA and California Dream Act Application'],
      ['grants', 'Cal Grants and community college fee waivers'],
      ['scholarships', 'Scholarships'], ['netprice', 'What my family might actually pay'],
      ['unsure', 'I’m not sure what these mean'],
    ]) },
    { id: 'incomeChange', prompt: 'Has your family’s financial situation changed significantly?', detail: 'This is optional. You do not need to share income amounts or any documents.', options: choices([
      ['layoff', 'Yes, because someone lost a job'], ['other', 'Yes, for another reason'],
      ['no', 'No significant change'], ['skip', 'Prefer not to say'],
    ]) },
  ],
  compare: [
    { id: 'comparison', prompt: 'What would you like to compare?', options: choices([
      ['types', 'Community college vs. four-year university'], ['transfer', 'Starting at community college, then transferring'],
      ['universities', 'Different universities'], ['unsure', 'I’m not sure'],
    ]) },
    { id: 'housing', prompt: 'Would you prefer to live at home or move for college?', options: choices([
      ['home', 'Live at home'], ['away', 'Move away'], ['unsure', 'Compare both possibilities'],
    ]) },
    { id: 'bachelors', prompt: 'Is earning a bachelor’s degree one of your goals?', options: choices([
      ['yes', 'Yes'], ['maybe', 'Maybe — I want to explore'], ['no', 'Not necessarily'],
      ['skip', 'Skip this question'],
    ]) },
  ],
  apply: [
    { id: 'start', prompt: 'When are you thinking of starting college?', options: choices([
      ['fall2027', 'Fall 2027, after high school'], ['later', 'Later than fall 2027'],
      ['unsure', 'I’m not sure yet'],
    ]) },
    { id: 'schoolType', prompt: 'What type of college application do you want help with?', options: choices([
      ['community', 'California community college'], ['csu', 'California State University (CSU)'],
      ['uc', 'University of California (UC)'], ['multiple', 'More than one type'],
    ]) },
    { id: 'applicationHelp', prompt: 'Which part of applying feels hardest?', options: choices([
      ['requirements', 'Understanding admission requirements'], ['deadlines', 'Finding deadlines'],
      ['aid', 'Applying for financial aid'], ['counselor', 'Finding a person who can help'],
    ]) },
  ],
};

const links = {
  ohlone: { title: 'Ohlone College — Admissions', description: 'Explore a community college serving the Fremont area.', url: 'https://www.ohlone.edu/admissions' },
  cc: { title: 'California Community Colleges — FAQs', description: 'Admission, costs, transfer, and fee-waiver basics.', url: 'https://icangotocollege.com/frequently-asked-questions' },
  fafsa: { title: 'Federal Student Aid — FAFSA', description: 'Official federal student-aid application information.', url: 'https://studentaid.gov/h/apply-for-aid/fafsa' },
  csac: { title: 'California Student Aid Commission', description: 'California grants and financial-aid application guidance.', url: 'https://www.csac.ca.gov/' },
  net: { title: 'Net Price Calculator information', description: 'Find out how colleges estimate costs after grants and scholarships.', url: 'https://collegecost.ed.gov/net-price' },
  assist: { title: 'ASSIST — California transfer agreements', description: 'Explore official course transfer agreements for California public colleges.', url: 'https://assist.org/' },
  csu: { title: 'Cal State Apply', description: 'Official CSU first-year application guidance.', url: 'https://www.calstate.edu/apply' },
  uc: { title: 'UC Admissions', description: 'Official UC requirements, applications, and deadlines.', url: 'https://admission.universityofcalifornia.edu/' },
  ohloneAid: { title: 'Ohlone College — Financial Aid', description: 'Contact a financial-aid office for individual circumstances.', url: 'https://www.ohlone.edu/financialaid' },
};

function dedupeResources(resources: Resource[]): Resource[] {
  return resources.filter((r, i, all) => all.findIndex(x => x.url === r.url) === i);
}

function getRecommendations(track: Track, answers: Record<string, string>) {
  let intro = '';
  let insights: string[] = [];
  let resources: Resource[] = [];

  switch (track) {
    case 'colleges':
      intro = answers.pathway === 'community'
        ? 'Community colleges can offer degrees, certificates, and transfer pathways. You can explore local admission steps without deciding on a major yet.'
        : answers.pathway === 'university'
          ? 'Four-year universities have their own admission requirements, application timelines, and financial-aid options. Compare the total cost after potential aid.'
          : 'You can compare community college and four-year university routes before deciding. Each can lead to a bachelor’s degree, depending on your plan.';
      resources = [links.cc, links.ohlone, links.csac];
      if (answers.pathway !== 'community') resources.push(links.csu, links.uc);
      if (answers.pathway !== 'university') resources.push(links.assist);
      insights = [
        answers.location === 'fremont' ? 'Compare a local college option with nearby universities, including transportation and housing costs.' : 'Compare tuition, housing, transportation, and other expenses rather than tuition alone.',
        answers.interests === 'undecided' ? 'You can explore subjects with a counselor before choosing a major.' : 'Check the program and course requirements for any subjects that interest you.',
        'Ask a counselor about transfer requirements before selecting courses if a bachelor’s degree may be your goal.',
      ];
      break;
    case 'aid':
      intro = answers.aidTopic === 'netprice'
        ? 'The amount a family pays can differ from published tuition. A college’s net price calculator can help estimate costs after grants and scholarships.'
        : answers.aidTopic === 'scholarships'
          ? 'Scholarships may help with educational costs. Check eligibility, deadlines, and whether an award is renewable.'
          : 'FAFSA and the California Dream Act Application are different aid-application routes. Grants and fee waivers may be available to eligible students; colleges and agencies determine eligibility.';
      resources = [links.fafsa, links.csac, links.net, links.ohloneAid];
      insights = [
        'Grants and scholarships generally do not need repayment; most student loans do.',
        'The California College Promise Grant is primarily an enrollment-fee waiver, not a promise to cover all college costs.',
        'Check the current year’s application instructions and deadlines on official sites.',
      ];
      if (answers.incomeChange === 'layoff' || answers.incomeChange === 'other') {
        insights.unshift('A significant change in family finances may justify asking a college financial-aid office about a special-circumstances or professional-judgment review. Complete required aid forms as instructed first; an adjustment is not guaranteed.');
      }
      break;
    case 'compare':
      intro = answers.comparison === 'transfer'
        ? 'Starting at community college and transferring can be one path to a bachelor’s degree. Requirements vary by intended university and major.'
        : 'Community colleges and universities differ in admissions, degree options, costs, and transfer opportunities. You can compare paths before committing.';
      resources = [links.cc, links.ohlone, links.assist, links.csu, links.uc, links.net];
      insights = [
        answers.housing === 'home' ? 'Living at home may reduce housing costs, but compare commuting time and transportation expenses.' : 'Account for housing, food, books, transportation, and other costs in a total-cost comparison.',
        answers.bachelors === 'yes' ? 'If a bachelor’s degree is the goal, compare direct university entry with community college transfer requirements.' : 'You can start exploring certificates, associate degrees, and bachelor’s pathways without deciding today.',
        'Ask an admissions or transfer counselor to verify requirements for the specific school and major.',
      ];
      break;
    case 'apply':
      intro = answers.start === 'fall2027'
        ? 'For fall 2027, check each school’s current first-year admissions timeline separately from financial-aid deadlines. Deadlines vary by school, term, and student status.'
        : 'You can begin with a planning checklist and check the admission rules for the term and institutions that interest you.';
      resources = [links.cc, links.ohlone, links.csu, links.uc, links.fafsa, links.csac];
      insights = [
        answers.schoolType === 'uc' || answers.schoolType === 'csu' || answers.schoolType === 'multiple' ? 'Check high-school course requirements and how they apply to each university system.' : 'Review the community college’s new-student enrollment process and financial-aid steps.',
        answers.applicationHelp === 'counselor' ? 'Ask a high school or college counselor for help with forms, deadlines, and next steps.' : 'Create a checklist for admission applications, financial aid, and any required documents.',
        'Verify current deadlines directly with the institutions. WhatSack does not guarantee admission or aid.',
      ];
      break;
  }
  return { intro, insights, resources: dedupeResources(resources) };
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
  onAskCopilot?: (question: string) => void;
}

/** Scripted research prototype: no LLM, backend, or personal-data storage. */
export function SofiaCollegeGuide({ isOpen, onClose, initialQuestion = '', onAskCopilot }: Props) {
  const [track, setTrack] = useState<Track | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const previousFocus = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    setTrack(null);
    setStep(0);
    setAnswers({});
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onEscape);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusId = window.setTimeout(() => panel.current?.focus(), 0);
    return () => {
      window.clearTimeout(focusId);
      document.removeEventListener('keydown', onEscape);
      document.body.style.overflow = oldOverflow;
      previousFocus.current?.focus();
    };
  }, [isOpen, onClose]);

  const activeQuestions = track ? questions[track] : [];
  const finished = track !== null && step >= activeQuestions.length;
  const recommendation = useMemo(() => track ? getRecommendations(track, answers) : null, [track, answers]);
  const guidedInsights = useMemo(() => track ? selectGuidedInsights('Sofia', track, answers) : [], [track, answers]);
  if (!isOpen) return null;

  const selectTrack = (selected: Track) => { setTrack(selected); setStep(0); setAnswers({}); };
  const choose = (value: string) => {
    if (!track || finished) return;
    const question = activeQuestions[step];
    setAnswers(previous => ({ ...previous, [question.id]: value }));
    setStep(previous => previous + 1);
  };
  const back = () => {
    if (step > 0) setStep(previous => previous - 1);
    else { setTrack(null); setAnswers({}); }
  };
  const askCopilotAboutResults = () => {
    if (!track || !onAskCopilot) return;
    const selections = questions[track]
      .filter(question => Boolean(answers[question.id]) && answers[question.id] !== 'skip')
      .map(question => {
        const selected = question.options.find(option => option.value === answers[question.id]);
        return question.prompt + ' ' + (selected?.label || 'Not specified');
      });
    const context = [
      'I am exploring college as Sofia, a fictional 17-year-old first-generation high-school senior near Fremont.',
      initialQuestion.trim() || 'My family has limited money, and I want to understand my college options.',
      'My topic: ' + (tracks.find(option => option.id === track)?.label || 'College planning') + '.',
      ...selections,
      'Please explain my next steps clearly, offer official starting points, and tell me what to verify with a counselor.'
    ].join(' ');
    onAskCopilot(context);
  };

  return (
    <div className="fixed inset-0 z-[90] bg-slate-950/70 p-3 sm:p-6 flex items-center justify-center" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="college-guide-title" className="bg-white text-slate-900 rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl outline-none">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 rounded-t-3xl px-5 sm:px-8 py-4 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-800"><GraduationCap size={21}/> WhatSack / College guidance</div>
          <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100" aria-label="Close guided college search"><X size={20}/></button>
        </div>
        <div className="px-5 sm:px-8 py-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 uppercase tracking-wider text-xs font-extrabold mb-3"><Sparkles size={15}/> Interactive guided-search demonstration</div>
            <h2 id="college-guide-title" className="text-2xl sm:text-3xl font-extrabold leading-tight">Find a clearer path to college</h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">You can get useful information without completing a full intake. Answer a few optional questions, or skip a question to see general guidance.</p>
            {initialQuestion.trim() && <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm"><span className="text-emerald-800 font-bold">Your question:</span> {initialQuestion}</div>}
          </div>

          {!track && (
            <section aria-label="Choose what to explore" className="space-y-3">
              <h3 className="font-bold text-lg">What would you like help with first?</h3>
              {tracks.map(option => (
                <button key={option.id} type="button" onClick={() => selectTrack(option.id)} className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-700 flex items-center justify-between gap-3">
                  <span><span className="block font-bold">{option.label}</span><span className="block text-sm text-slate-600 mt-1">{option.description}</span></span><ArrowRight size={19} className="shrink-0 text-emerald-700"/>
                </button>
              ))}
              <button type="button" className="text-sm font-semibold text-emerald-800 underline mt-2" onClick={() => selectTrack('compare')}>I’m not sure where to start — explain the options</button>
            </section>
          )}

          {track && !finished && (
            <section aria-live="polite" className="space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600"><span>{tracks.find(item => item.id === track)?.label}</span><span>Question {step + 1} of {activeQuestions.length}</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2" aria-hidden="true"><div className="bg-emerald-600 h-2 rounded-full transition-all" style={{ width: `${((step + 1) / activeQuestions.length) * 100}%` }}/></div>
              <h3 className="text-xl sm:text-2xl font-extrabold">{activeQuestions[step].prompt}</h3>
              {activeQuestions[step].detail && <p className="text-sm text-slate-600">{activeQuestions[step].detail}</p>}
              <div className="space-y-2">
                {activeQuestions[step].options.map(option => (
                  <button key={option.value} type="button" onClick={() => choose(option.value)} className="w-full flex items-center justify-between text-left gap-3 rounded-xl border border-slate-300 p-4 hover:bg-emerald-50 hover:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-700">
                    <span className="font-semibold text-sm sm:text-base">{option.label}</span><ArrowRight size={17} className="shrink-0 text-emerald-700"/>
                  </button>
                ))}
              </div>
              <div className="flex justify-between gap-3 pt-2">
                <button type="button" onClick={back} className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700"><ArrowLeft size={17}/> Back</button>
                <button type="button" onClick={() => choose('skip')} className="text-sm font-bold text-emerald-800 underline">Skip this question</button>
              </div>
            </section>
          )}

          {track && finished && recommendation && (
            <section className="space-y-5" aria-live="polite">
              <div className="flex items-center gap-2 font-bold text-emerald-800"><CheckCircle2 size={21}/> Your starting points</div>
              <p className="text-slate-700">{recommendation.intro}</p>
              <div>
                <h3 className="font-extrabold text-lg mb-3">Official resources to explore</h3>
                <div className="space-y-2">
                  {recommendation.resources.map(resource => (
                    <a key={resource.url} href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-4 hover:border-emerald-600 hover:bg-emerald-50">
                      <span><span className="font-bold block">{resource.title}</span><span className="text-sm text-slate-600 block mt-1">{resource.description}</span></span><ExternalLink size={17} className="shrink-0 text-emerald-700" aria-hidden="true"/>
                    </a>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="flex items-center gap-2 text-emerald-950 font-extrabold"><BookOpen size={20}/> NextStep Insights — based on your choices</h3>
                {guidedInsights.length > 0 ? guidedInsights.map(insight => (
                  <NextStepInsightCard key={insight.id} entry={insight} variant="sofia" />
                )) : (
                  <ul className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-2">
                    {recommendation.insights.map((item,index) => <li key={index} className="text-sm">{item}</li>)}
                  </ul>
                )}
              </div>
              <p className="flex items-start gap-2 text-xs text-slate-600"><ShieldCheck size={17} className="shrink-0"/> This is a scripted academic prototype, not a live AI system. Links are to official starting points; check current requirements, dates, program status, and eligibility directly with each provider. No answers are saved or sent to a server.</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {onAskCopilot && (
                  <button type="button" onClick={askCopilotAboutResults} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white font-bold px-4 py-3 hover:bg-slate-800">
                    <Sparkles size={17}/> Ask the Copilot about these results
                  </button>
                )}
                <button type="button" onClick={() => { setTrack(null); setStep(0); setAnswers({}); }} className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 text-white font-bold px-4 py-3 hover:bg-emerald-800"><RotateCcw size={17}/> Explore another pathway</button>
                <button type="button" onClick={back} className="rounded-xl border border-slate-300 px-4 py-3 font-bold text-sm">Change last answer</button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}