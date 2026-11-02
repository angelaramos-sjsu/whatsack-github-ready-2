/**
 * Daniel Delgado scripted demonstration knowledge base.
 * Source links are official starting points, NOT real-time eligibility, benefits, job offers, or openings.
 * No API key, LLM, database, or user-data collection is required.
 */
export interface DanielSource { title: string; url: string; }
export interface DanielReply {
  topic: string;
  text: string;
  followUps: string[];
  sources: DanielSource[];
  recommendedResourceIds: string[];
}

export const danielSources = {
  tesla: { title: 'Tesla — Manufacturing Development Program', url: 'https://www.tesla.com/careers/manufacturing-development-program' },
  teslaFremont: { title: 'Tesla — Fremont Manufacturing Development Program', url: 'https://www.tesla.com/careers/search/job/manufacturing-development-program-270081' },
  ohloneMdp: { title: 'Ohlone College — Tesla MDP', url: 'https://www.ohlone.edu/tesla-mdp' },
  ssba: { title: 'Ohlone College — Semiconductor Skills Bridge Academy', url: 'https://www.ohlone.edu/ssba' },
  ohlone: { title: 'Ohlone College — Career Education', url: 'https://www.ohlone.edu/career-education' },
  fremont: { title: 'City of Fremont — Workforce Training Resources', url: 'https://www.fremont.gov/government/departments/human-services/human-services-in-the-community/sparkpoint/workforce-training-resources' },
  nova: { title: 'NOVAworks — Career Seeker Services', url: 'https://novaworks.org/career-seekers/' },
  wioa: { title: 'California EDD — WIOA', url: 'https://edd.ca.gov/en/Jobs_and_Training/Workforce_Innovation_and_Opportunity_Act' },
  etpl: { title: 'California EDD — Eligible Training Provider List', url: 'https://edd.ca.gov/TrainingPrograms' },
  ctb: { title: 'California EDD — California Training Benefits', url: 'https://edd.ca.gov/CTB/' },
  jobseekers: { title: 'California EDD — Job-Seeker Resources', url: 'https://edd.ca.gov/en/jobs_and_training/Resources_for_Job_Seekers/' },
  careeronestop: { title: 'CareerOneStop — Skills Matcher', url: 'https://www.careeronestop.org/toolkit/Skills/skills-matcher.aspx' },
  bls: { title: 'U.S. BLS — Occupational Outlook Handbook', url: 'https://www.bls.gov/ooh/' },
  alameda: { title: 'Alameda County Workforce Development Board — Job Seekers', url: 'https://acwdb.org/job-seekers/' },
  food: { title: 'California Benefits — CalFresh', url: 'https://www.cdss.ca.gov/calfresh' },
} satisfies Record<string, DanielSource>;

type Key = keyof typeof danielSources;
const make = (topic: string, text: string, followUps: string[], keys: Key[], recommendedResourceIds: string[] = []) : DanielReply => ({
  topic, text, followUps, sources: keys.map(key => danielSources[key]), recommendedResourceIds,
});

export function isDanielQuestion(input: string, continuing = false): boolean {
  const q = input.toLowerCase();
  const clearlyOtherTopic = /(?:groceries|food pantry|calfresh|mental health|suicid|teen counsel|senior lunch|high.school senior|college admission|university admission|fafsa|cadaa)/i.test(q);
  const clearDanielSignal = /(?:\bdaniel\b|\btesla\b|\bmdp\b|\bssba\b|semiconductor skills bridge|manufacturing development|manufacturing program|semiconductor training|\bwioa\b|\betpl\b|\bctb\b|\bedd\b|job train|career train|laid off|layoff|retrain|dislocated worker|lost my job|lost his job|unemployment benefit|workforce center|paid while training|employer.connected training|employment pathway)/i.test(q);
  if (clearlyOtherTopic && !clearDanielSignal) return false;
  return clearDanielSignal || continuing;
}

export function answerDanielQuestion(input: string, continuing = false): DanielReply | null {
  if (!isDanielQuestion(input, continuing)) return null;
  const q = input.toLowerCase();

  if (/food pantry|grocer|calfresh|food assistance|family.*food|household.*grocer/i.test(q)) {
    return make('Optional household support',
      'A layoff can affect more than training plans. If you would like, WhatSack can connect you with the food-assistance pathway used in Maria’s fictional scenario. CalFresh eligibility is determined by the administering agency; this demo cannot make that decision. Would you like household support, or to return to training?',
      ['Show food assistance resources', 'Return to training programs', 'Can I compare Tesla MDP and SSBA?'], ['food','jobseekers']);
  }

  if (/(?:\btesla\b|\bmdp\b|manufacturing development)/i.test(q) && /(?:\bssba\b|semiconductor skills bridge|compare|both programs|which program|versus|vs\.?)/i.test(q)) {
    return make('Tesla MDP versus SSBA',
      'Two Ohlone-connected manufacturing pathways are worth comparing:\n\nTesla Manufacturing Development Program (MDP): an employer-connected advanced-manufacturing pathway. Tesla says successful participants may transition into full-time Production Associate roles; Ohlone has described job offers for successful completers in its cohorts. This is not a guaranteed offer for every applicant. Tesla generally describes the program as intended for graduating high-school seniors and early-career individuals, so Daniel (45) must ask whether he meets the current cohort criteria.\n\nSemiconductor Skills Bridge Academy (SSBA): training for entry-level semiconductor/smart-manufacturing work with job-readiness activities. Advertised cohorts offered a $1,500 stipend upon completion, but current cohort funding must be confirmed. SSBA does not promise employment.\n\nNext steps: confirm cohort availability, adult applicant eligibility, schedule, full costs, and the specific job-offer or stipend conditions with the program.',
      ['Can a 45-year-old apply for Tesla MDP?', 'Is the SSBA $1,500 stipend available now?', 'How do I contact Ohlone about both programs?'],
      ['tesla','teslaFremont','ohloneMdp','ssba','fremont'], ['res-work-mdp','res-work-ssba']);
  }

  if (/(?:\bssba\b|semiconductor skills bridge|semiconductor academy|stipend|semiconductor.*(?:training|certificate))/i.test(q)) {
    return make('SSBA stipend and training',
      'Ohlone College’s Semiconductor Skills Bridge Academy (SSBA) has provided smart-manufacturing and semiconductor career preparation, practical industry exposure, and job-readiness activities. Documented cohorts advertised a $1,500 stipend paid upon successful program completion. Ask Ohlone whether that stipend applies to the next cohort, what completion requires, and whether the training and schedule fit your needs. SSBA does not guarantee a job.',
      ['What does SSBA train you to do?', 'Is the stipend available to new students?', 'Compare SSBA with Tesla MDP'],
      ['ssba','ohlone','fremont'], ['res-work-ssba']);
  }

  if (/(?:\btesla\b|\bmdp\b|manufacturing development|full.time.*(?:offer|job)|job offer.*(?:completion|graduation)|production associate)/i.test(q)) {
    return make('Tesla MDP employment pathway',
      'Tesla’s Manufacturing Development Program combines partner-college coursework with advanced-manufacturing preparation. Tesla describes successful graduates as having an opportunity to transition to a full-time paid Production Associate role; Ohlone has publicized full-time job offers for successful completers in its cohorts. These descriptions should not be treated as an unconditional job guarantee. Importantly, Tesla describes its target audience as graduating high-school seniors and people early in their careers. Because Daniel is 45 with substantial industry experience, he should first ask whether his profile is eligible for the currently available Ohlone/Fremont cohort.',
      ['Can a mid-career worker apply at age 45?', 'Compare Tesla MDP and SSBA', 'What other manufacturing training can I explore?'],
      ['tesla','teslaFremont','ohloneMdp','fremont'], ['res-work-mdp']);
  }

  if (/(?:unemployment|weekly (?:edd |ui )?(?:check|benefit)|while (?:in |attending )?(?:training|school)|california training benefits|\bctb\b)/i.test(q)) {
    return make('Training while receiving unemployment',
      'California Training Benefits (CTB) may allow eligible unemployment claimants to continue benefits while attending approved training. CTB is not itself a tuition grant, and training may affect unemployment requirements if it is not approved. Daniel should consult EDD as soon as he is interested in training and follow current reporting instructions; do not assume benefits will continue unchanged.',
      ['Can WIOA help cover training costs?', 'Compare Tesla MDP and SSBA', 'Where can I talk to a workforce counselor?'],
      ['ctb','jobseekers','wioa']);
  }

  if (/(?:\bwioa\b|\betpl\b|voucher|grant|training fund|pay for (?:my |the )?training|free training|funding)/i.test(q)) {
    return make('Workforce training funding',
      'Workforce Innovation and Opportunity Act (WIOA) programs may support training for eligible job seekers, but funding depends on a workforce-center assessment, program approval, and availability. The Eligible Training Provider List is a place to investigate programs; appearing on the list does not automatically mean Daniel will receive funding. Ask a workforce counselor serving his residence or eligibility area about current options and whether employer-sponsored or college programs can be considered.',
      ['Does unemployment change when I start training?', 'Can I compare Tesla MDP and SSBA?', 'Where is my local workforce center?'],
      ['wioa','etpl','nova','alameda']);
  }

  if (/(?:40|45|older|age|eligible|qualif|requirements|apply to the program)/i.test(q)) {
    return make('Eligibility and cohort requirements',
      'Eligibility depends on each program. Tesla’s MDP is described as designed for graduating high-school seniors and early-career individuals; Daniel should not assume that being 45 makes him eligible or ineligible without checking the current application. SSBA eligibility, education prerequisites, available places, and stipend conditions must be confirmed directly with Ohlone. WhatSack cannot pre-approve anyone.',
      ['Compare Tesla MDP and SSBA', 'What other manufacturing training is available?', 'Where can I speak to a program adviser?'],
      ['tesla','ohloneMdp','ssba','ohlone']);
  }

  if (/(?:schedule|online|evening|weekend|part.time|full.time|duration|how long|how many weeks)/i.test(q)) {
    return make('Schedule and training format',
      'Course duration and schedule vary by cohort. Tesla’s MDP typically involves structured partner-college training and may lead into shifts at a factory. SSBA cohorts have offered hands-on coursework and employer activities. Daniel should verify the current class schedule, transportation, physical requirements when applicable, and whether participating would affect unemployment reporting or family responsibilities.',
      ['Can I receive unemployment while training?', 'Compare Tesla MDP and SSBA', 'Is there online training?'],
      ['teslaFremont','ssba','ctb','ohlone']);
  }

  if (/(?:where.*(?:center|counsel|advis|help)|near (?:milpitas|fremont|san jose)|career center|workforce professional|career navigator)/i.test(q)) {
    return make('Human workforce support',
      'A workforce professional can help Daniel review transferable skills, verify approved training options, and ask about funding. NOVAworks serves eligible residents in part of Santa Clara County, including Milpitas. For Fremont and nearby Alameda County residents, start with Alameda County workforce services. Confirm current service areas and make an appointment directly with the provider.',
      ['What questions should I ask about training funding?', 'Can I compare Tesla MDP and SSBA?', 'Could my family get food support too?'],
      ['nova','alameda','wioa','ohlone']);
  }

  if (/(?:skill|former job|18 years|manufactur|assembly|career change|another career|career path|job prospects|earnings|salary)/i.test(q)) {
    return make('Transferable manufacturing skills',
      'Daniel’s previous manufacturing and equipment experience could help him explore advanced manufacturing, semiconductor production, quality-related work, technical operations, or IT support, depending on role requirements. Use a skills assessment and occupational descriptions to compare training prerequisites, local openings, and typical duties. A certificate can improve preparation but is not a guarantee of employment or earnings.',
      ['Compare Tesla MDP and SSBA', 'Can WIOA pay for certification training?', 'How can I find a career counselor?'],
      ['careeronestop','bls','ssba','tesla','nova'], ['res-work-mdp','res-work-ssba']);
  }

  return make('Career retraining starting points',
    'A layoff can be a good time to compare several retraining routes without committing immediately: Ohlone’s Tesla Manufacturing Development Program (an employer-connected pathway with a potential full-time Production Associate transition after successful completion), Ohlone’s Semiconductor Skills Bridge Academy (a smart-manufacturing program with a $1,500 completion stipend in documented cohorts), community college certificates, and workforce-center support. Current cohorts, age or education eligibility, funding, schedules and any employment offer must be checked. What is most important right now: finding employer-connected training, paying for training, choosing a new career, or finding work quickly?',
    ['Compare Tesla MDP and SSBA', 'Could I receive a training stipend?', 'Can I get funding after a layoff?', 'Where can I meet a workforce counselor?'],
    ['tesla','ssba','ohlone','nova','wioa'], ['res-work-mdp','res-work-ssba']);
}
