/** WhatSack education demo. Reviewed starting points, not live eligibility checks. */
export type SofiaConversationAnswer = {
  text: string;
  followUps: string[];
  resourceIds: string[];
  sources: Array<{title: string; url: string}>;
  topic: string;
};

const sources = {
  cc: { title: 'California Community Colleges', url: 'https://icangotocollege.com/frequently-asked-questions' },
  ohlone: { title: 'Ohlone College Admissions', url: 'https://www.ohlone.edu/admissions' },
  aid: { title: 'Federal Student Aid (FAFSA)', url: 'https://studentaid.gov/' },
  csac: { title: 'California Student Aid Commission', url: 'https://www.csac.ca.gov/' },
  cost: { title: 'U.S. Department of Education Net Price Calculator', url: 'https://collegecost.ed.gov/net-price' },
  transfer: { title: 'ASSIST California Transfer Agreements', url: 'https://assist.org/' },
  csu: { title: 'California State University Admissions', url: 'https://www.calstate.edu/apply' },
  uc: { title: 'University of California Admissions', url: 'https://admission.universityofcalifornia.edu/' },
  ohloneAid: { title: 'Ohlone College Financial Aid', url: 'https://www.ohlone.edu/financialaid' },
} as const;

type SourceKey = keyof typeof sources;
function make(topic: string, text: string, followUps: string[], keys: SourceKey[], resourceIds: string[] = ['res-work-3']): SofiaConversationAnswer {
  return {topic, text, followUps, sources: keys.map(key => sources[key]), resourceIds};
}

export function isSofiaEducationQuestion(message: string, educationContext = false): boolean {
  const q = message.toLowerCase();
  // Explicitly unrelated new subjects override an earlier college conversation.
  const otherTopic = /(?:food pantry|groceries|calfresh|mental health|anxiety|crisis|senior club|senior activities|job training|job retrain|retraining|laid.off worker|career training)/i.test(q);
  if (otherTopic && !/(?:college|university|student aid|financial aid|fafsa|cal grant|scholarship|tuition)/i.test(q)) return false;
  const explicit = /(?:\bsofia\b|\bcollege\b|\buniversity\b|\buniversities\b|\btuition\b|\bscholarship|\bfinancial aid\b|\bfafsa\b|\bcadaa\b|\bcal grant|\bpromise grant|\bfee waiver|\btransfer pathway|\btransfer to|\bcsu\b|\buc\b|\bcal state\b|\bfirst.generation student\b|\bcuatro.años\b|\buniversidad\b|\bmatrícula\b|\bbeca|\bayuda financiera\b)/i.test(q);
  return explicit || educationContext;
}

export function answerSofiaEducationQuestion(message: string, educationContext = false): SofiaConversationAnswer | null {
  if (!isSofiaEducationQuestion(message, educationContext)) return null;
  const q = message.toLowerCase();
  // Specific requests must run before broad keywords such as "college" or "aid".
  if (/(?:lost (?:his|her|their|my|a) job|laid off|layoff|income (?:changed|change)|family (?:finances|income) (?:changed|dropped)|special.circumstances|professional judgment|parent (?:lost|unemployed)|dad (?:lost|laid)|despedido|perdi[oó] su empleo)/i.test(q)) {
    return make('Financial aid after family income change',
      'A recent job loss or significant change in family finances may not appear in the tax-year information used on a financial-aid application. Submit the FAFSA or California Dream Act Application that applies to you, using its instructions. Then ask each college financial-aid office whether a special-circumstances or professional-judgment review is possible. The college decides whether any adjustment is appropriate; no increase in aid is guaranteed. You do not need to share your family’s income or documents in this demo.',
      ['How do I start FAFSA or CADAA?', 'Where can I talk to a financial-aid counselor?', 'How can I compare college costs after financial aid?'],
      ['aid','csac','ohloneAid']);
  }
  if (/(?:cad\s*aa|dream act|fafsa or|fafsa vs|which (?:form|application)|what is fafsa|submit fafsa|start fafsa|apply for aid|financial.aid application)/i.test(q)) {
    return make('FAFSA and CADAA',
      'FAFSA is the federal student-aid application; the California Dream Act Application (CADAA) is a different route to certain California financial-aid programs for eligible students. Which application to use depends on your circumstances. Do not share immigration status or Social Security information here. Start with official application guidance or speak with a college financial-aid counselor. Submitting a form does not guarantee grants or admission.',
      ['What are Cal Grants and the Promise Grant?', 'What if my parent recently lost a job?', 'Where can I get help filling out the application?'],
      ['aid','csac','ohloneAid']);
  }
  if (/(?:cal grant|promise grant|promise scholarship|fee waiver|tuition.free|free tuition|waiv(?:er|e) fees|government grant)/i.test(q)) {
    return make('Grants and community college fee waivers',
      'Cal Grants and the California College Promise Grant are different kinds of aid. The Promise Grant generally waives eligible California community-college enrollment fees; it does not automatically cover housing, transportation, books, or every campus fee. Other campus Promise programs may have different rules. Verify eligibility, deadlines, and what is covered with the school and California Student Aid Commission.',
      ['How do I apply for FAFSA or CADAA?', 'How much would college cost after aid?', 'Can I start at community college then transfer?'],
      ['csac','cc','ohloneAid']);
  }
  if (/(?:scholarship|merit.based|first.gen.*fund|pay for books|financial assistance for books)/i.test(q)) {
    return make('Scholarships',
      'Scholarships may help with tuition and other education costs, but requirements vary. Start with each college’s financial-aid office and official scholarship pages. Check application deadlines, eligibility, whether an award renews, and any conditions. You do not need to pay a third party to search for scholarships.',
      ['How do grants differ from loans?', 'How do I estimate my net price?', 'How can a financial-aid counselor help?'],
      ['csac','ohloneAid','aid']);
  }
  if (/(?:net price|actual(?:ly)? pay|family pay|compare (?:college )?costs|total cost|housing cost|living expenses|cost of attendance|books and transportation|commut|living at home|live at home|move away)/i.test(q)) {
    return make('Cost after financial aid',
      'Published tuition is not the same as the amount you might pay after grants and scholarships. Compare each college’s net price calculator and consider tuition, fees, books, transportation, housing, and food. Living at home may reduce housing costs but may add commuting expenses. An estimate is not a financial-aid offer.',
      ['Should I compare community college and university?', 'What aid can I apply for?', 'Can I attend college near Fremont?'],
      ['cost','cc','ohlone','csac']);
  }
  if (/(?:transfer|assist.org|associate degree|bachelor.s degree|bachelor degree|two.year|2.year)/i.test(q)) {
    return make('Community college transfer',
      'Starting at community college and later transferring can be a path to a bachelor’s degree. Transfer course and GPA requirements differ by intended university and major. Use ASSIST to explore official transfer agreements among California public colleges and meet with a college transfer counselor before choosing courses. Transfer or admission is not automatic.',
      ['What is the difference between community college and university?', 'What if I do not know my major yet?', 'Where can I find a counselor?'],
      ['transfer','ohlone','csu','uc'], ['res-work-3','res-comm-2']);
  }
  if (/(?:a.g (?:requirements|courses)|\bgpa\b|high school classes|admission requirements|eligible for (?:uc|csu)|can i get in)/i.test(q)) {
    return make('Admissions and readiness',
      'UC and CSU first-year applicants generally have specific high-school course and other admission requirements. California community colleges use different admission pathways. Check each campus’s official requirements, especially A–G coursework for UC/CSU, and ask your high-school counselor to review your options. WhatSack cannot determine admissions eligibility from a short chat.',
      ['When are college application deadlines?', 'What if I start at community college?', 'How can I find application help?'],
      ['uc','csu','cc']);
  }
  if (/(?:deadline|when (?:do|should) i apply|fall 2027|application timeline|application checklist|cal state apply|college application|admission application|how to apply)/i.test(q)) {
    return make('Applying to college',
      'College admission deadlines and financial-aid deadlines are separate, and exact dates can vary by campus, program, and term. For fall 2027, check the current admissions calendars for every school that interests you. Community colleges, CSU campuses, and UC campuses have different application processes. Make a checklist for each official application, required materials, financial-aid application, and a counselor check-in.',
      ['What are UC and CSU admission requirements?', 'How do I start FAFSA or CADAA?', 'What if I want to apply to community college?'],
      ['ohlone','csu','uc','aid','csac']);
  }
  if (/(?:counselor|advis(?:er|or|ing)|someone who can help|1.on.1 help|one.on.one|application help|workshop|first.gen.*support)/i.test(q)) {
    return make('Human college and financial-aid support',
      'A high-school counselor or college admissions/financial-aid office can explain application steps, review campus-specific requirements, and help you understand your aid options. Ask where to find free FAFSA/CADAA workshops, whether appointments are available, and what documents the office actually needs. WhatSack cannot book an appointment in this demo.',
      ['What are FAFSA and CADAA?', 'What should I compare when choosing a school?', 'What are the next admission steps?'],
      ['ohlone','ohloneAid','aid','csac'], ['res-work-3','res-comm-2']);
  }
  if (/(?:major|career interest|stem|science|healthcare|undecided|not sure what to study|subject)/i.test(q)) {
    return make('Exploring majors and interests',
      'You do not need to have your major decided to begin exploring college. Compare programs that interest you, their entry requirements, available advising, and—if you might transfer—how courses transfer. Career counseling and introductory classes can help you explore. Ask a counselor before committing to courses required for a particular transfer major.',
      ['Can I start at community college then transfer?', 'What would attending near Fremont cost?', 'How do I compare universities?'],
      ['ohlone','transfer','cc']);
  }
  if (/(?:near fremont|near me|bay area|location|where (?:would|should) i attend|which college|affordable college|school options|four.year|community college vs|compare both|not sure where to start|i want to go to college|options|college pathways|what pathways)/i.test(q)) {
    return make('College pathways and affordability',
      'You have several paths worth exploring: local community colleges such as Ohlone College, direct applications to four-year colleges, or a community-college-to-university transfer route. Compare the total cost after financial aid, admissions requirements, academic programs, and where you would live. If you are not sure yet, start with one nearby college and one university for comparison; this is not a ranking or an admission guarantee.',
      ['What is the difference between community college and university?', 'How can I afford college with financial aid?', 'Can I attend college near Fremont?'],
      ['ohlone','cc','csu','uc','cost'], ['res-work-3','res-comm-2']);
  }
  if (/(?:financial aid|afford|pay for college|grants|student loan|loans)/i.test(q)) {
    return make('Paying for college',
      'Financial aid may include grants, scholarships, work-study, and loans. Grants and scholarships generally do not need to be repaid; loans generally do. Your eligibility and actual cost depend on official applications and campus decisions. You can start by reviewing FAFSA/CADAA guidance and a school’s net price calculator without giving WhatSack private family details.',
      ['How do I choose FAFSA or CADAA?', 'What are Cal Grants and fee waivers?', 'What if my family income changed?'],
      ['aid','csac','cost']);
  }
  return make('College planning follow-up',
    'I can help with affordable colleges, FAFSA/CADAA, grants and scholarships, transfers, choosing a major, admissions, and college application steps. Which of these would you like to explore? I can share official starting points, but I cannot promise aid or admission.',
    ['How can I afford college?', 'Can I transfer from community college?', 'Where can I get help applying?'],
    ['cc','aid','ohlone']);
}