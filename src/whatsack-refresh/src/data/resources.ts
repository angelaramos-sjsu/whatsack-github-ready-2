export type Category = 'food' | 'education' | 'mental' | 'community';

export type Resource = {
  id: string;
  title: string;
  category: Category;
  organization: string;
  description: string;
  descriptionEs?: string;
  location: string;
  url: string;
  tags: string[];
  why: string;
  whyEs?: string;
  nextSteps: string[];
  nextStepsEs?: string[];
  cost: string;
  eligibility: string;
  contact: string;
  hours: string;
  languages: string;
  accessibility: string;
};

// Demo reference records, not a live or continuously verified services directory.
// Links point to organizations/public information pages cited in the team's proposal,
// plus a few established government resources. Details must be reconfirmed at source.
export const resources: Resource[] = [
  {
    id: 'second-harvest-food', title: 'Find food near you', category: 'food',
    organization: 'Second Harvest of Silicon Valley',
    description: 'Explore food distribution locations and ways to get groceries through Second Harvest.',
    descriptionEs: 'Explora lugares de distribución de alimentos y formas de recibir comestibles.',
    location: 'Santa Clara & San Mateo counties', url: 'https://www.shfb.org/get-food/',
    tags: ['groceries', 'food', 'pantry', 'distribution', 'hunger', 'free', 'family', 'food bank'],
    why: 'A starting point for finding local food assistance while other benefits are being explored.',
    whyEs: 'Un punto de partida para encontrar alimentos mientras exploras otras opciones de ayuda.',
    nextSteps: ['Open the food locator on the official site.', 'Confirm the current location, hours and pickup requirements directly with the provider.'],
    nextStepsEs: ['Abre el buscador de alimentos del sitio oficial.', 'Confirma los horarios y requisitos directamente con el proveedor.'],
    cost: 'Check program details', eligibility: 'Varies by distribution', contact: 'Contact through official website', hours: 'Confirm with individual location', languages: 'Confirm by location', accessibility: 'Confirm by location',
  },
  {
    id: 'calfresh-help', title: 'Get help with CalFresh', category: 'food',
    organization: 'Second Harvest of Silicon Valley',
    description: 'Learn about CalFresh food benefits and find guidance on applying or updating your information.',
    descriptionEs: 'Infórmate sobre CalFresh y encuentra orientación sobre cómo solicitar beneficios.',
    location: 'Santa Clara & San Mateo counties', url: 'https://www.shfb.org/get-food/calfresh/',
    tags: ['calfresh', 'benefits', 'snap', 'application', 'job loss', 'income', 'family', 'groceries'],
    why: 'A household income change can make it useful to ask about CalFresh eligibility again; only the agency determines eligibility.',
    whyEs: 'Un cambio en los ingresos puede ser motivo para consultar los requisitos de CalFresh; la agencia decide la elegibilidad.',
    nextSteps: ['Read the CalFresh assistance information.', 'Ask an application-assistance specialist how to report a recent income change.'],
    nextStepsEs: ['Lee la información de asistencia de CalFresh.', 'Pregunta cómo informar un cambio reciente de ingresos.'],
    cost: 'Check official eligibility information', eligibility: 'Determined by responsible agency', contact: 'Official assistance page', hours: 'Check official page', languages: 'Ask about language assistance', accessibility: 'Ask provider',
  },
  {
    id: 'benefitscal', title: 'Apply for California benefits', category: 'food',
    organization: 'BenefitsCal',
    description: 'Official California portal to explore, apply for, and manage eligible public benefits.',
    location: 'California', url: 'https://benefitscal.com/',
    tags: ['calfresh', 'apply', 'benefits', 'assistance', 'income', 'family', 'food stamps'],
    why: 'The official application portal is a practical next step after reviewing CalFresh information.',
    nextSteps: ['Open the official BenefitsCal portal.', 'Review the information required and check with the county if you have questions.'],
    cost: 'Check official program details', eligibility: 'Determined by county/agency', contact: 'BenefitsCal portal', hours: 'Online portal; service hours vary', languages: 'See official portal', accessibility: 'See official portal',
  },
  {
    id: '211-food', title: 'Find additional basic-needs support', category: 'food',
    organization: '211 Bay Area',
    description: 'Explore community referrals for food and related essential services.',
    location: 'Bay Area', url: 'https://211bayarea.org/',
    tags: ['food', '211', 'referral', 'rent', 'community', 'basic needs', 'family'],
    why: 'Useful when a household has more than one need and wants help identifying local organizations.',
    nextSteps: ['Visit the official 211 site.', 'Describe your needs and ask for resources serving your specific location.'],
    cost: 'Confirm with referred program', eligibility: 'Depends on referred resource', contact: 'See official website', hours: 'See official website', languages: 'Ask about interpretation', accessibility: 'Varies by provider',
  },
  {
    id: 'fafsa', title: 'Understand federal financial aid', category: 'education',
    organization: 'Federal Student Aid',
    description: 'Official information about FAFSA, eligibility basics, and applying for federal student aid.',
    location: 'United States', url: 'https://studentaid.gov/h/apply-for-aid/fafsa',
    tags: ['college', 'fafsa', 'financial aid', 'scholarship', 'student', 'tuition', 'school', 'first generation', 'university'],
    why: 'A starting point for understanding federal student aid before comparing the cost of colleges.',
    nextSteps: ['Review the FAFSA process on the official website.', 'Confirm the current filing deadlines and seek help from a school counselor or financial-aid office.'],
    cost: 'FAFSA form is free', eligibility: 'Federal aid eligibility varies', contact: 'Official Federal Student Aid website', hours: 'Online information', languages: 'See official website', accessibility: 'See official website',
  },
  {
    id: 'calgrant', title: 'Explore California student aid', category: 'education',
    organization: 'California Student Aid Commission',
    description: 'Learn about California financial aid programs, including Cal Grants, and application guidance.',
    location: 'California', url: 'https://www.csac.ca.gov/',
    tags: ['college', 'cal grant', 'financial aid', 'student', 'scholarship', 'tuition', 'affordable'],
    why: 'State aid may be relevant when planning for the full cost of college.',
    nextSteps: ['Review the current California financial aid programs.', 'Confirm eligibility criteria and deadlines with the commission or a college financial-aid office.'],
    cost: 'See specific program', eligibility: 'Program-specific requirements apply', contact: 'Official CSAC website', hours: 'See official website', languages: 'See official website', accessibility: 'See official website',
  },
  {
    id: 'ohlone-college', title: 'Explore community college pathways', category: 'education',
    organization: 'Ohlone College',
    description: 'Explore academic programs, certificates, student services and transfer-focused education.',
    location: 'Fremont & Newark, California', url: 'https://www.ohlone.edu/',
    tags: ['college', 'community college', 'transfer', 'certificate', 'training', 'career', 'student', 'university'],
    why: 'Community college can offer different education and transfer pathways to compare.',
    nextSteps: ['Explore programs and student services.', 'Contact admissions or counseling for current requirements and available support.'],
    cost: 'See current tuition and financial-aid information', eligibility: 'Program-specific', contact: 'Official college website', hours: 'See official website', languages: 'Ask college', accessibility: 'See disability services on official website',
  },
  {
    id: 'edd-workforce', title: 'Find job training and career support', category: 'education',
    organization: 'California Employment Development Department (EDD)',
    description: 'Explore California job-search services, career guidance, and workforce training information.',
    location: 'California', url: 'https://edd.ca.gov/en/jobs_and_training/',
    tags: ['job', 'laid off', 'unemployed', 'career', 'workforce', 'retraining', 'training', 'certificate', 'employment', 'wioa'],
    why: 'A helpful starting point after a layoff for exploring training and workforce support options.',
    nextSteps: ['Review official jobs and training resources.', 'Ask a workforce professional about local training options and eligibility for funding.'],
    cost: 'Varies by service or training provider', eligibility: 'Program-specific', contact: 'Official EDD website', hours: 'See official website', languages: 'See official website', accessibility: 'See official website',
  },
  {
    id: 'scc-bhs', title: 'Navigate county behavioral health services', category: 'mental',
    organization: 'Santa Clara County Behavioral Health Services',
    description: 'Explore county information about behavioral health support and ways to connect with services.',
    location: 'Santa Clara County', url: 'https://bhsd.santaclaracounty.gov/',
    tags: ['mental health', 'anxiety', 'counseling', 'youth', 'teen', 'therapist', 'behavioral health', 'support', 'low cost'],
    why: 'A county-level starting point for learning what types of support may be available.',
    nextSteps: ['Review county behavioral health resource information.', 'Ask which youth services or referral options may fit your situation.'],
    cost: 'Confirm program-specific costs and coverage', eligibility: 'Program-specific', contact: 'See official county website', hours: 'See official website', languages: 'Ask about language access', accessibility: 'Ask about accommodations',
  },
  {
    id: '988', title: 'Talk with a crisis support counselor', category: 'mental',
    organization: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential crisis support in the United States via call, text, and chat.',
    location: 'United States', url: 'https://988lifeline.org/',
    tags: ['988', 'crisis', 'urgent', 'anxiety', 'suicide', 'mental health', 'talk', 'support', 'teen'],
    why: 'If someone is in emotional distress or facing a crisis, a crisis-support service can provide immediate human support.',
    nextSteps: ['Visit the official website to learn about 988.', 'Call or text 988 for crisis support; call 911 for an immediate life-threatening emergency.'],
    cost: 'Free crisis support', eligibility: 'Available to people in the United States', contact: 'Call or text 988', hours: '24/7 crisis service', languages: 'See official language access information', accessibility: 'See official accessibility information',
  },
  {
    id: 'nami-sc', title: 'Learn about support and education', category: 'mental',
    organization: 'NAMI Santa Clara County',
    description: 'Explore mental health education, community support, and local information resources.',
    location: 'Santa Clara County', url: 'https://namisantaclara.org/',
    tags: ['mental health', 'family', 'peer', 'group', 'counseling', 'support', 'anxiety', 'education'],
    why: 'Community education and peer-oriented support may be useful alongside professional care.',
    nextSteps: ['Explore available programs on the official site.', 'Ask the organization which programs are appropriate for the user’s age and situation.'],
    cost: 'Check program details', eligibility: 'Depends on program', contact: 'Official NAMI website', hours: 'Check program details', languages: 'Confirm with organization', accessibility: 'Confirm with organization',
  },
  {
    id: '211-mental', title: 'Explore local mental health referrals', category: 'mental',
    organization: '211 Bay Area',
    description: 'Find information and referrals for community support and local services.',
    location: 'Bay Area', url: 'https://211bayarea.org/',
    tags: ['counseling', 'mental health', 'resources', '211', 'referrals', 'support', 'family'],
    why: 'A referral service can help identify other local options if a listed organization is not a good fit.',
    nextSteps: ['Visit 211 Bay Area.', 'Ask about local mental health navigation and confirm service details with each organization.'],
    cost: 'Depends on referred program', eligibility: 'Depends on referred program', contact: 'Official 211 website', hours: 'See official website', languages: 'Ask about interpretation', accessibility: 'Varies by provider',
  },
  {
    id: 'aaci-seniors', title: 'Explore culturally responsive senior programs', category: 'community',
    organization: 'AACI Senior Wellness',
    description: 'Learn about senior wellness and community programs offered through AACI.',
    descriptionEs: 'Conoce los programas de bienestar y comunidad para personas mayores que ofrece AACI.',
    location: 'Santa Clara County', url: 'https://aaci.org/wellness/senior/',
    tags: ['seniors', 'older adults', 'activities', 'community', 'social', 'language', 'wellness', 'spanish', 'amigos', 'personas mayores'],
    why: 'Community-based programs may offer opportunities to connect with others and learn about supportive services.',
    whyEs: 'Los programas comunitarios pueden ofrecer oportunidades para conocer a otras personas y encontrar apoyo.',
    nextSteps: ['Review the senior wellness program page.', 'Ask about current activities, language availability, accessibility, and transportation.'],
    nextStepsEs: ['Consulta la página de bienestar para personas mayores.', 'Pregunta por actividades actuales, idiomas, accesibilidad y transporte.'],
    cost: 'Confirm program-specific costs', eligibility: 'Confirm with organization', contact: 'Official AACI website', hours: 'Confirm activity schedule', languages: 'Ask about Spanish-language activities', accessibility: 'Ask about accommodations',
  },
  {
    id: 'sjpl', title: 'Find library events and community activities', category: 'community',
    organization: 'San José Public Library',
    description: 'Browse library programs, events, learning opportunities, and community activities.',
    descriptionEs: 'Explora eventos de bibliotecas, oportunidades de aprendizaje y actividades comunitarias.',
    location: 'San José, California', url: 'https://www.sjpl.org/',
    tags: ['library', 'seniors', 'older adults', 'community', 'social', 'activities', 'classes', 'spanish', 'biblioteca'],
    why: 'Local libraries can be a convenient place to discover classes, activities, and in-person events.',
    whyEs: 'Las bibliotecas locales pueden ayudar a encontrar clases, actividades y eventos presenciales.',
    nextSteps: ['Look for the current event calendar.', 'Check location, registration, language, and accessibility details before attending.'],
    nextStepsEs: ['Busca el calendario de eventos actual.', 'Confirma el lugar, la inscripción, el idioma y la accesibilidad antes de asistir.'],
    cost: 'Varies by activity', eligibility: 'Varies by event', contact: 'Official library website', hours: 'Location/event-specific', languages: 'Check event information', accessibility: 'Check event and location',
  },
  {
    id: 'sj-community', title: 'Explore neighborhood community centers', category: 'community',
    organization: 'City of San José',
    description: 'Find local community centers and browse city recreation and neighborhood services.',
    descriptionEs: 'Encuentra centros comunitarios y explora los servicios recreativos de la ciudad.',
    location: 'San José, California', url: 'https://www.sanjoseca.gov/your-government/departments-offices/parks-recreation-neighborhood-services',
    tags: ['community center', 'senior', 'activities', 'classes', 'connection', 'spanish', 'community', 'recreation', 'amigos'],
    why: 'Community centers are a useful starting place for in-person activities close to home.',
    whyEs: 'Los centros comunitarios son un punto de partida para buscar actividades cerca de casa.',
    nextSteps: ['Browse city community and recreation resources.', 'Contact a nearby center to ask about current classes and language availability.'],
    nextStepsEs: ['Explora los recursos recreativos de la ciudad.', 'Llama a un centro cercano para preguntar por clases e idiomas.'],
    cost: 'Depends on activity', eligibility: 'Depends on activity', contact: 'Official city website', hours: 'Varies by center', languages: 'Confirm by program', accessibility: 'Confirm by center',
  },
  {
    id: '211-community', title: 'Discover more community connections', category: 'community',
    organization: '211 Bay Area',
    description: 'Find referrals to local services and organizations, including community support.',
    descriptionEs: 'Encuentra referencias a servicios y organizaciones comunitarias locales.',
    location: 'Bay Area', url: 'https://211bayarea.org/',
    tags: ['community', 'senior', 'older adult', 'transportation', 'social', 'spanish', 'resources', 'activities'],
    why: 'If a local activity is not suitable, a community referral service can help identify alternatives.',
    whyEs: 'Si una actividad no es adecuada, un servicio de referencias puede ayudar a encontrar alternativas.',
    nextSteps: ['Visit the official 211 website.', 'Ask for older-adult and language-accessible options serving your area.'],
    nextStepsEs: ['Visita el sitio oficial de 211.', 'Pregunta por actividades para personas mayores y servicios en tu idioma.'],
    cost: 'Varies by referred program', eligibility: 'Varies by referred program', contact: 'Official 211 website', hours: 'See official website', languages: 'Ask about interpretation', accessibility: 'Varies by provider',
  },
];

export const categories: Array<{ id: Category; label: string; es: string; line: string; lineEs: string }> = [
  {id:'food', label:'Food & basic needs', es:'Alimentos y necesidades',line:'Food programs and everyday essentials',lineEs:'Alimentos y ayuda para necesidades básicas'},
  {id:'education',label:'Education & careers',es:'Educación y trabajo',line:'College, financial aid and training',lineEs:'Universidad, ayuda financiera y formación'},
  {id:'mental',label:'Mental health',es:'Salud mental',line:'Find supportive people and services',lineEs:'Encuentra personas y servicios de apoyo'},
  {id:'community',label:'Community & connection',es:'Comunidad y conexión',line:'Activities, belonging and senior services',lineEs:'Actividades y servicios para personas mayores'},
];

export type DemoPersona = {id:string; name:string; age:number; label:string; category:Category; question:string; questionEs?:string; note:string;};
export const demoPersonas: DemoPersona[] = [
  {id:'sofia',name:'Sofia Delgado',age:17,label:'First-generation college student',category:'education',question:'I want to go to college, but my family does not have much money. What are my options?',note:'College pathways, FAFSA, Cal Grants and advising'},
  {id:'daniel',name:'Daniel Delgado',age:45,label:'Recently laid-off worker',category:'education',question:'I just lost my job. Are there affordable retraining programs that could help me find work?',note:'Job training, certificates and workforce guidance'},
  {id:'maria',name:'Maria Delgado',age:42,label:'Parent navigating food assistance',category:'food',question:'My husband was laid off. Could we qualify for CalFresh now, and where can we get groceries?',note:'CalFresh reassessment and immediate food access'},
  {id:'mateo',name:'Mateo Delgado',age:14,label:'Student looking for support',category:'mental',question:'I feel anxious and overwhelmed. Where can I find affordable youth mental health support?',note:'Youth programs, trusted adults and crisis referrals'},
  {id:'rosa',name:'Rosa Martinez',age:72,label:'Older adult seeking connection',category:'community',question:'Where can I meet other Spanish-speaking older adults at community activities?',questionEs:'Me gustaría encontrar actividades donde pueda conocer a otras personas que hablen español.',note:'Community activities, Spanish-language services and accessibility'},
];

const groupHints: Record<Category, string[]> = {
  food: ['food', 'grocer', 'hungry', 'meal', 'calfresh', 'pantry', 'benefit', 'foodbank', 'comida', 'alimento'],
  education: ['college', 'school', 'fafsa', 'financial', 'aid', 'grant', 'tuition', 'transfer', 'career', 'job', 'laid', 'retrain', 'workforce', 'employment', 'universidad', 'empleo', 'educacion'],
  mental: ['mental', 'anxious', 'anxiety', 'stress', 'counsel', 'therap', 'sad', 'crisis', 'help', 'teen', 'salud', 'ansiedad'],
  community: ['senior', 'older', 'friends', 'social', 'community', 'lonely', 'activities', 'spanish', 'meet', 'club', 'personas', 'amigos', 'actividades', 'sola', 'conocer', 'personas', 'espanol', 'hablen'],
};

const stopwords = new Set(['a','an','the','to','and','or','in','on','for','is','are','i','we','my','me','you','your','they','of','it','do','can','where','what','there','with','have','find','get','about','help','need','want','how','our','now','could','would','like','am','been','just','que','una','las','los','por','para','con','donde','como','quiero','puedo','hay']);
function words(text:string):string[]{return (text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').match(/[a-z0-9]+/g)||[]).filter(t=>t.length>2&&!stopwords.has(t));}

export function matchResources(query:string, selected:Category|'all' = 'all'):Resource[] {
  let list = selected==='all'?resources:resources.filter(r=>r.category===selected);
  if(!query.trim()) return list;
  const terms=words(query);
  if(!terms.length) return list;
  const inferred=Object.entries(groupHints).map(([cat,hints])=>({cat:cat as Category,score:hints.filter(h=>terms.some(t=>t.startsWith(h)||h.startsWith(t))).length})).sort((a,b)=>b.score-a.score);
  const matchingCategory=inferred[0]?.score>0?inferred[0].cat:null;
  const scored=list.map(r=>{
    const body=words([r.title,r.organization,r.description,r.descriptionEs||'',...r.tags,r.location].join(' '));
    let score=terms.reduce((n,t)=>n+(body.some(w=>w===t||w.startsWith(t)||t.startsWith(w)&&t.length>4)?3:0),0);
    if(r.category===matchingCategory) score+=5;
    if(r.id==='988' && !terms.some(t=>/^(crisis|suicid|urgent|emergency|988)$/.test(t))) score-=8;
    if(r.id==='988' && terms.some(t=>/^(crisis|suicid|urgent|emergency|988)$/.test(t))) score+=10;
    if(r.id==='calfresh-help' && terms.some(t=>t==='calfresh'||t==='qualify')) score+=4;
    if(terms.some(t=>r.title.toLowerCase().includes(t)))score+=2;
    return {r,score};
  }).sort((a,b)=>b.score-a.score);
  const matched=scored.filter(x=>x.score>0).map(x=>x.r);
  return matched;
}
