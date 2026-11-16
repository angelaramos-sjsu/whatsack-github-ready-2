import { CategoryId } from '../types';

export interface DirectoryText {
  en: string;
  es: string;
}

export interface DirectoryEntry {
  id: string;
  name: string;
  /**
   * Every category this source provides support in. A source that serves more
   * than one need is listed in each relevant category, never in unrelated ones.
   */
  categories: CategoryId[];
  city: string;
  address: string;
  website: string;
  /**
   * "What it provides" is only filled in where the listing itself makes the
   * service clear. Everything else is left out and shown as "Not confirmed."
   */
  services?: DirectoryText;
  audience?: DirectoryText;
  serviceArea?: DirectoryText;
  languages?: DirectoryText[];
  accessibility?: DirectoryText;
  cost?: DirectoryText;
  hours?: DirectoryText;
  contact?: { phone?: string; email?: string };
}

// Silicon Valley community resource listings supplied by the project team.
// These are real organizations: only published name, address and website are
// shown, so nothing here is invented. Service summaries restate the service in
// the organization's own name (a senior center's programs, a college's courses)
// and never add hours, fees, languages or eligibility the source did not publish.
export const directoryEntries: DirectoryEntry[] = [
  {
    id: 'dir-campbell-adult-center-1',
    name: 'Campbell Adult Center',
    categories: ['community'],
    city: 'Campbell',
    address: '1 W. Campbell Ave., C-33, Campbell, CA 95008',
    website: 'https://campbellca.gov/adultcenter',
    services: {
      en: 'Adult center programs and activities for older adults.',
      es: 'Programas y actividades del centro de adultos para personas mayores.'
    },
    audience: { en: 'Older adults', es: 'Personas mayores' }
  },
  {
    id: 'dir-cupertino-senior-center-2',
    name: 'Cupertino Senior Center',
    categories: ['community'],
    city: 'Cupertino',
    address: '21251 Stevens Creek Blvd., Cupertino, CA 95014',
    website: 'https://cupertino.gov/Parks-Recreation/Senior-Center',
    services: {
      en: 'Senior center programs, classes and social activities.',
      es: 'Programas, clases y actividades sociales del centro para personas mayores.'
    },
    audience: { en: 'Older adults', es: 'Personas mayores' }
  },
  {
    id: 'dir-gilroy-senior-center-3',
    name: 'Gilroy Senior Center',
    categories: ['community'],
    city: 'Gilroy',
    address: '7371 Hanna St., Gilroy, CA 95020',
    website: 'https://cityofgilroy.org',
    services: {
      en: 'Senior center programs and social activities.',
      es: 'Programas y actividades sociales del centro para personas mayores.'
    },
    audience: { en: 'Older adults', es: 'Personas mayores' }
  },
  {
    id: 'dir-los-altos-adult-50-program-4',
    name: 'Los Altos Adult 50+ Program',
    categories: ['community'],
    city: 'Los Altos',
    address: '97 Hillview Ave., Los Altos, CA 94022',
    website: 'https://losaltosca.gov/664/Adult-50-Program',
    services: {
      en: 'Programs and social activities for adults 50 and older.',
      es: 'Programas y actividades sociales para adultos de 50 años o más.'
    },
    audience: { en: 'Adults 50 and older', es: 'Adultos de 50 años o más' }
  },
  {
    id: 'dir-los-gatos-adult-recreation-5',
    name: 'Los Gatos Adult Recreation',
    categories: ['community'],
    city: 'Los Gatos',
    address: '208 E. Main St., Los Gatos, CA 95030',
    website: 'https://lgsrecreation.org/adults/55-plus',
    services: {
      en: 'Recreation and social programs for adults 55 and older.',
      es: 'Programas recreativos y sociales para adultos de 55 años o más.'
    },
    audience: { en: 'Adults 55 and older', es: 'Adultos de 55 años o más' }
  },
  {
    id: 'dir-barbara-lee-senior-center-6',
    name: 'Barbara Lee Senior Center',
    categories: ['community'],
    city: 'Milpitas',
    address: '40 N. Milpitas Blvd., Milpitas, CA 95035',
    website: 'https://milpitas.gov/797/Adult-Programs',
    services: {
      en: 'Senior center programs and social activities.',
      es: 'Programas y actividades sociales del centro para personas mayores.'
    },
    audience: { en: 'Older adults', es: 'Personas mayores' }
  },
  {
    id: 'dir-morgan-hill-senior-center-7',
    name: 'Morgan Hill Senior Center',
    categories: ['community'],
    city: 'Morgan Hill',
    address: '171 W. Edmundson Ave., Morgan Hill, CA 95037',
    website: 'https://morganhill.ca.gov/259/Senior-Center',
    services: {
      en: 'Senior center programs and social activities.',
      es: 'Programas y actividades sociales del centro para personas mayores.'
    },
    audience: { en: 'Older adults', es: 'Personas mayores' }
  },
  {
    id: 'dir-mountain-view-senior-center-8',
    name: 'Mountain View Senior Center',
    categories: ['community'],
    city: 'Mountain View',
    address: '266 Escuela Ave., Mountain View, CA 94040',
    website: 'https://mountainview.gov/senior-center',
    services: {
      en: 'Senior center programs, classes and social activities.',
      es: 'Programas, clases y actividades sociales del centro para personas mayores.'
    },
    audience: { en: 'Older adults', es: 'Personas mayores' }
  },
  {
    id: 'dir-avenidas-450-bryant-9',
    name: 'Avenidas @450 Bryant',
    categories: ['community'],
    city: 'Palo Alto',
    address: '450 Bryant St., Palo Alto, CA 94301',
    website: 'https://avenidas.org',
    services: {
      en: 'Older-adult programs, classes and support services.',
      es: 'Programas, clases y servicios de apoyo para personas mayores.'
    },
    audience: { en: 'Older adults', es: 'Personas mayores' }
  },
  {
    id: 'dir-second-harvest-of-silicon-valley-10',
    name: 'Second Harvest of Silicon Valley',
    categories: ['food'],
    city: 'San Jose',
    address: '750 Curtner Avenue, San Jose, CA 95125',
    website: 'https://www.shfb.org/get-food/',
    services: {
      en: 'Food distribution and help finding a food pantry.',
      es: 'Distribución de alimentos y ayuda para encontrar una despensa de alimentos.'
    }
  },
  {
    id: 'dir-second-harvest-of-silicon-valley-calfresh-assistance-11',
    name: 'Second Harvest of Silicon Valley — CalFresh Assistance',
    categories: ['food'],
    city: 'San Jose',
    address: '750 Curtner Avenue, San Jose, CA 95125',
    website: 'https://www.shfb.org/get-food/calfresh/',
    services: {
      en: 'Help applying for CalFresh food benefits.',
      es: 'Ayuda para solicitar los beneficios de alimentos CalFresh.'
    }
  },
  {
    id: 'dir-benefitscal-12',
    name: 'BenefitsCal',
    categories: ['food'],
    city: 'Statewide',
    address: 'Online statewide',
    website: 'https://benefitscal.com/',
    services: {
      en: 'Online application for CalFresh food benefits and other public benefits.',
      es: 'Solicitud en línea para beneficios de alimentos CalFresh y otros beneficios públicos.'
    }
  },
  {
    id: 'dir-santa-clara-county-social-services-agency-13',
    name: 'Santa Clara County Social Services Agency',
    categories: ['food'],
    city: 'San Jose',
    address: '1867 Senter Road, San Jose, CA 95112',
    website: 'https://ssa.santaclaracounty.gov/apply-public-benefits',
    services: {
      en: 'County public benefits applications, including CalFresh food assistance.',
      es: 'Solicitudes de beneficios públicos del condado, incluida la asistencia alimentaria CalFresh.'
    }
  },
  {
    id: 'dir-california-department-of-social-services-14',
    name: 'California Department of Social Services',
    categories: ['food'],
    city: 'Statewide',
    address: '744 P Street Sacramento, CA 95814',
    website: 'https://cdss.ca.gov/food',
    services: {
      en: 'State food assistance programs and CalFresh information.',
      es: 'Programas estatales de asistencia alimentaria e información sobre CalFresh.'
    }
  },
  {
    id: 'dir-san-mateo-county-human-services-agency-15',
    name: 'San Mateo County Human Services Agency',
    categories: ['food'],
    city: 'Redwood City',
    address: '5200 Middlefield Road, Redwood City, CA 94063',
    website: 'https://www.smcgov.org/hsa/apply-calfresh',
    services: {
      en: 'County CalFresh applications and human services.',
      es: 'Solicitudes de CalFresh y servicios humanos del condado.'
    }
  },
  {
    id: 'dir-211-bay-area-16',
    name: '211 Bay Area',
    categories: ['community'],
    city: 'San Francisco',
    address: '550 Kearny Street, Suite 1000, San Francisco, CA 94108',
    website: 'https://211bayarea.org/',
    services: {
      en: 'Information and referral line for local food, housing, health and community services.',
      es: 'Línea de información y referencias sobre alimentos, vivienda, salud y servicios comunitarios locales.'
    },
    audience: { en: 'Anyone in the Bay Area', es: 'Cualquier persona en el Área de la Bahía' }
  },
  {
    id: 'dir-california-association-of-food-banks-17',
    name: 'California Association of Food Banks',
    categories: ['food'],
    city: 'Oakland',
    address: '1616 Franklin Street, Suite 300, Oakland, CA 94612',
    website: 'https://www.cafoodbanks.org/find-food/',
    services: {
      en: 'Statewide food bank locator and food assistance information.',
      es: 'Buscador estatal de bancos de alimentos e información sobre asistencia alimentaria.'
    }
  },
  {
    id: 'dir-san-jose-city-college-18',
    name: 'San José City College',
    categories: ['workforce'],
    city: 'San Jose',
    address: '2100 Moorpark Ave, San Jose, CA 95128',
    website: 'https://sjcc.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-evergreen-valley-college-19',
    name: 'Evergreen Valley College',
    categories: ['workforce'],
    city: 'San Jose',
    address: '3095 Yerba Buena Rd, San Jose, CA 95135',
    website: 'https://www.evc.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-mission-college-20',
    name: 'Mission College',
    categories: ['workforce'],
    city: 'Santa Clara',
    address: '3000 Mission College Blvd, Santa Clara, CA 95054',
    website: 'https://missioncollege.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-de-anza-college-21',
    name: 'De Anza College',
    categories: ['workforce'],
    city: 'Cupertino',
    address: '21250 Stevens Creek Blvd, Cupertino, CA 95014',
    website: 'https://www.deanza.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-foothill-college-22',
    name: 'Foothill College',
    categories: ['workforce'],
    city: 'Los Altos Hills',
    address: '12345 El Monte Rd, Los Altos Hills, CA 94022',
    website: 'https://foothill.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-west-valley-college-23',
    name: 'West Valley College',
    categories: ['workforce'],
    city: 'Saratoga',
    address: '14000 Fruitvale Ave, Saratoga, CA 95070',
    website: 'https://www.westvalley.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-ohlone-college-24',
    name: 'Ohlone College',
    categories: ['workforce'],
    city: 'Fremont',
    address: '43600 Mission Blvd, Fremont, CA 94539',
    website: 'https://www.ohlone.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-gavilan-college-25',
    name: 'Gavilan College',
    categories: ['workforce'],
    city: 'Gilroy',
    address: '5055 Santa Teresa Blvd, Gilroy, CA 95020',
    website: 'https://www.gavilan.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-canada-college-26',
    name: 'Cañada College',
    categories: ['workforce'],
    city: 'Redwood City',
    address: '4200 Farm Hill Blvd, Redwood City, CA 94061',
    website: 'https://canadacollege.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-college-of-san-mateo-27',
    name: 'College of San Mateo',
    categories: ['workforce'],
    city: 'San Mateo',
    address: '1700 W Hillsdale Blvd, San Mateo, CA 94402',
    website: 'https://collegeofsanmateo.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-skyline-college-28',
    name: 'Skyline College',
    categories: ['workforce'],
    city: 'San Bruno',
    address: '3300 College Dr, San Bruno, CA 94066',
    website: 'https://skylinecollege.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-chabot-college-29',
    name: 'Chabot College',
    categories: ['workforce'],
    city: 'Hayward',
    address: '25555 Hesperian Blvd, Hayward, CA 94545',
    website: 'https://www.chabotcollege.edu',
    services: {
      en: 'Community college courses, career programs and student support.',
      es: 'Cursos de colegio comunitario, programas de carrera y apoyo estudiantil.'
    }
  },
  {
    id: 'dir-10-000-degrees-30',
    name: '10,000 Degrees',
    categories: ['workforce'],
    city: 'San Rafael',
    address: '1401 Los Gamos Dr, Suite 205, San Rafael, CA 94903 (main office)',
    website: 'https://10000degrees.org',
    services: {
      en: 'College advising, scholarships and financial aid help.',
      es: 'Asesoría universitaria, becas y ayuda con la ayuda financiera.'
    }
  },
  {
    id: 'dir-college-track-east-palo-alto-31',
    name: 'College Track — East Palo Alto',
    categories: ['workforce'],
    city: 'East Palo Alto',
    address: '1877 Bay Rd, East Palo Alto, CA 94303',
    website: 'https://collegetrack.org/communities/east-palo-alto-ca/',
    services: {
      en: 'Long-term college access and success program for students.',
      es: 'Programa de acceso y éxito universitario a largo plazo para estudiantes.'
    }
  },
  {
    id: 'dir-year-up-united-silicon-valley-32',
    name: 'Year Up United — Silicon Valley',
    categories: ['workforce'],
    city: 'San Jose',
    address: '2600 N First St, San Jose, CA 95134',
    website: 'https://www.yearup.org',
    services: {
      en: 'Career training and job placement for young adults.',
      es: 'Capacitación profesional y colocación laboral para adultos jóvenes.'
    },
    audience: { en: 'Young adults', es: 'Adultos jóvenes' }
  },
  {
    id: 'dir-novaworks-sunnyvale-33',
    name: 'NOVAworks — Sunnyvale',
    categories: ['workforce'],
    city: 'Sunnyvale',
    address: '456 W Olive Ave, Sunnyvale, CA 94086',
    website: 'https://novaworks.org',
    services: {
      en: 'Job search help, career training and employment services.',
      es: 'Ayuda para buscar empleo, capacitación profesional y servicios de empleo.'
    }
  },
  {
    id: 'dir-novaworks-san-mateo-34',
    name: 'NOVAworks — San Mateo',
    categories: ['workforce'],
    city: 'San Mateo',
    address: '1777 Borel Pl, Suite 500, San Mateo, CA',
    website: 'https://novaworks.org',
    services: {
      en: 'Job search help, career training and employment services.',
      es: 'Ayuda para buscar empleo, capacitación profesional y servicios de empleo.'
    }
  },
  {
    id: 'dir-work2future-san-jose-job-center-35',
    name: 'work2future — San José Job Center',
    categories: ['workforce'],
    city: 'San Jose',
    address: '1608 Las Plumas Ave, San Jose, CA',
    website: 'https://www.work2future.org',
    services: {
      en: 'Job center services including job search and career training.',
      es: 'Servicios de centro de empleo, incluida la búsqueda de empleo y la capacitación profesional.'
    }
  },
  {
    id: 'dir-work2future-north-san-jose-job-center-36',
    name: 'work2future — North San José Job Center',
    categories: ['workforce'],
    city: 'San Jose',
    address: '1901 Zanker Rd, San Jose, CA',
    website: 'https://www.work2future.org',
    services: {
      en: 'Job center services including job search and career training.',
      es: 'Servicios de centro de empleo, incluida la búsqueda de empleo y la capacitación profesional.'
    }
  },
  {
    id: 'dir-work2future-gilroy-job-center-37',
    name: 'work2future — Gilroy Job Center',
    categories: ['workforce'],
    city: 'Gilroy',
    address: '379 Tomkins Ct, Gilroy, CA',
    website: 'https://www.work2future.org',
    services: {
      en: 'Job center services including job search and career training.',
      es: 'Servicios de centro de empleo, incluida la búsqueda de empleo y la capacitación profesional.'
    }
  },
  {
    id: 'dir-silicon-valley-adult-education-metroed-38',
    name: 'Silicon Valley Adult Education (MetroED)',
    categories: ['workforce'],
    city: 'San Jose',
    address: '760 Hillsdale Ave, San Jose, CA 95136',
    website: 'https://svae.metroed.net',
    services: {
      en: 'Adult education and career training classes.',
      es: 'Clases de educación para adultos y capacitación profesional.'
    }
  },
  {
    id: 'dir-open-doors-south-bay-39',
    name: 'Open Doors South Bay',
    categories: ['workforce'],
    city: 'San Jose',
    address: '625 Educational Park Dr, San Jose, CA 95133',
    website: 'https://opendoorssouthbay.org'
  },
  {
    id: 'dir-san-jose-public-library-king-library-40',
    name: 'San José Public Library — King Library',
    categories: ['workforce', 'community'],
    city: 'San Jose',
    address: '150 E San Fernando St, San Jose, CA 95112',
    website: 'https://www.sjpl.org',
    services: {
      en: 'Public library services, computers and community programs.',
      es: 'Servicios de biblioteca pública, computadoras y programas comunitarios.'
    },
    audience: { en: 'Anyone with a library card', es: 'Cualquier persona con tarjeta de la biblioteca' }
  },
  {
    id: 'dir-california-edd-eligible-training-provider-list-41',
    name: 'California EDD — Eligible Training Provider List',
    categories: ['workforce'],
    city: 'Online',
    address: 'Online statewide directory',
    website: 'https://edd.ca.gov/TrainingPrograms',
    services: {
      en: 'State directory of approved training providers.',
      es: 'Directorio estatal de proveedores de capacitación aprobados.'
    }
  },
  {
    id: 'dir-apprenticeship-gov-apprenticeship-finder-42',
    name: 'Apprenticeship.gov — Apprenticeship Finder',
    categories: ['workforce'],
    city: 'Online',
    address: 'Online nationwide directory',
    website: 'https://www.apprenticeship.gov',
    services: {
      en: 'National directory of apprenticeship programs.',
      es: 'Directorio nacional de programas de aprendizaje.'
    }
  },
  {
    id: 'dir-extended-opportunity-programs-and-services-eops-43',
    name: 'Extended Opportunity Programs and Services (EOPS)',
    categories: ['workforce'],
    city: 'Multiple campuses',
    address: 'California community colleges',
    website: 'https://www.cccco.edu',
    services: {
      en: 'Support program for low-income community college students.',
      es: 'Programa de apoyo para estudiantes de bajos ingresos en colegios comunitarios.'
    },
    audience: { en: 'Low-income community college students', es: 'Estudiantes de bajos ingresos en colegios comunitarios' }
  },
  {
    id: 'dir-cooperative-agencies-resources-for-education-care-44',
    name: 'Cooperative Agencies Resources for Education (CARE)',
    categories: ['workforce'],
    city: 'Multiple campuses',
    address: 'Participating community colleges',
    website: 'https://www.cccco.edu',
    services: {
      en: 'Support for single parents attending community college.',
      es: 'Apoyo para madres y padres solteros que estudian en colegios comunitarios.'
    },
    audience: { en: 'Single parents in community college', es: 'Madres y padres solteros en colegios comunitarios' }
  },
  {
    id: 'dir-nextup-foster-youth-support-45',
    name: 'NextUp / Foster Youth Support',
    categories: ['workforce'],
    city: 'Multiple campuses',
    address: 'Participating community colleges',
    website: 'https://www.cccco.edu',
    services: {
      en: 'Support for current and former foster youth in community college.',
      es: 'Apoyo para jóvenes en cuidado de crianza, actuales y anteriores, en colegios comunitarios.'
    },
    audience: { en: 'Current and former foster youth', es: 'Jóvenes en cuidado de crianza, actuales y anteriores' }
  },
  {
    id: 'dir-disabled-students-programs-and-services-dsps-46',
    name: 'Disabled Students Programs and Services (DSPS)',
    categories: ['workforce'],
    city: 'Multiple campuses',
    address: 'California community colleges',
    website: 'https://www.cccco.edu',
    services: {
      en: 'Disability support services at community colleges.',
      es: 'Servicios de apoyo por discapacidad en colegios comunitarios.'
    },
    audience: { en: 'Students with disabilities', es: 'Estudiantes con discapacidad' }
  },
  {
    id: 'dir-california-college-promise-grant-47',
    name: 'California College Promise Grant',
    categories: ['workforce'],
    city: 'Multiple campuses',
    address: 'California community colleges',
    website: 'https://www.cccco.edu',
    services: {
      en: 'Fee waiver for California community college students.',
      es: 'Exención de cuotas para estudiantes de colegios comunitarios de California.'
    }
  },
  {
    id: 'dir-community-college-basic-needs-centers-48',
    name: 'Community College Basic Needs Centers',
    categories: ['workforce', 'food'],
    city: 'Multiple campuses',
    address: 'California community colleges',
    website: 'https://www.cccco.edu',
    services: {
      en: 'Campus food, housing and basic-needs support.',
      es: 'Apoyo en el campus para alimentos, vivienda y necesidades básicas.'
    },
    audience: { en: 'Community college students', es: 'Estudiantes de colegios comunitarios' }
  },
  {
    id: 'dir-california-dream-act-application-cadaa-49',
    name: 'California Dream Act Application (CADAA)',
    categories: ['workforce'],
    city: 'Online',
    address: 'Online statewide application',
    website: 'https://dream.csac.ca.gov',
    services: {
      en: 'Financial aid application for undocumented students.',
      es: 'Solicitud de ayuda financiera para estudiantes indocumentados.'
    },
    audience: { en: 'Undocumented and AB 540 students', es: 'Estudiantes indocumentados y AB 540' }
  },
  {
    id: 'dir-cal-grant-program-50',
    name: 'Cal Grant Program',
    categories: ['workforce'],
    city: 'Statewide',
    address: 'Statewide financial aid program',
    website: 'https://csac.ca.gov',
    services: {
      en: 'State financial aid grants for college.',
      es: 'Becas estatales de ayuda financiera para la universidad.'
    }
  },
  {
    id: 'dir-california-training-benefits-ctb-51',
    name: 'California Training Benefits (CTB)',
    categories: ['workforce'],
    city: 'Statewide',
    address: 'Statewide EDD program',
    website: 'https://edd.ca.gov',
    services: {
      en: 'Training benefits for eligible unemployment claimants.',
      es: 'Beneficios de capacitación para personas desempleadas elegibles.'
    },
    audience: { en: 'Eligible unemployment claimants', es: 'Personas desempleadas elegibles' }
  },
  {
    id: 'dir-fafsa-52',
    name: 'FAFSA',
    categories: ['workforce'],
    city: 'Statewide',
    address: 'Online statewide',
    website: 'https://studentaid.gov',
    services: {
      en: 'Federal student aid application for college.',
      es: 'Solicitud federal de ayuda estudiantil para la universidad.'
    }
  },
  {
    id: 'dir-san-jose-mental-health-53',
    name: 'San Jose Mental Health',
    categories: ['mental-health'],
    city: 'San Jose',
    address: '1261 Lincoln Ave, San Jose, CA 95125',
    website: 'https://sanjosementalhealth.org',
    services: {
      en: 'Mental health counseling and treatment services.',
      es: 'Servicios de consejería y tratamiento de salud mental.'
    }
  },
  {
    id: 'dir-santa-clara-county-mental-health-54',
    name: 'Santa Clara County Mental Health — Behavioral Health Services',
    categories: ['mental-health'],
    city: 'San Jose',
    address: '1650 Las Plumas Ave # K, San Jose, CA 95133',
    website: 'https://bhsd.santaclaracounty.gov',
    services: {
      en: 'County behavioral health services and mental health care.',
      es: 'Servicios de salud conductual y atención de salud mental del condado.'
    }
  },
  {
    id: 'dir-monterrey-health-55',
    name: 'Monterrey Health',
    categories: ['mental-health'],
    city: 'San Jose',
    address: '1660 Hamilton Ave #100, San Jose, CA 95125',
    website: 'https://www.monterreyhealth.com',
    services: {
      en: 'Mental health services and counseling.',
      es: 'Servicios de salud mental y consejería.'
    }
  },
  {
    id: 'dir-harmony-place-san-jose-56',
    name: 'Harmony Place San Jose',
    categories: ['mental-health'],
    city: 'San Jose',
    address: '79 Devine St #100, San Jose, CA 95110',
    website: 'https://harmonytreatmentcenters.com/our-centers/san-jose-ca/',
    services: {
      en: 'Mental health treatment services.',
      es: 'Servicios de tratamiento de salud mental.'
    }
  },
  {
    id: 'dir-trauma-healing-therapy-57',
    name: 'Trauma Healing Therapy',
    categories: ['mental-health'],
    city: 'Cupertino',
    address: '21710 Stevens Creek Blvd Ste 140, Cupertino, CA 95014',
    website: 'https://www.traumahealingtherapy.com',
    services: {
      en: 'Therapy for trauma and mental health.',
      es: 'Terapia para trauma y salud mental.'
    }
  },
  {
    id: 'dir-west-valley-community-services-58',
    name: 'West Valley Community Services',
    categories: ['food', 'community'],
    city: 'Cupertino',
    address: '10104 Vista Dr, Cupertino, CA 95014',
    website: 'https://www.wvcommunityservices.org',
    services: {
      en: 'Food pantry and community support services.',
      es: 'Despensa de alimentos y servicios de apoyo comunitario.'
    }
  },
  {
    id: 'dir-bay-area-mental-health-59',
    name: 'Bay Area Mental Health',
    categories: ['mental-health'],
    city: 'Campbell',
    address: '1925 Winchester Blvd #204, Campbell, CA 95008',
    website: 'https://www.bayareamh.com',
    services: {
      en: 'Mental health therapy and counseling.',
      es: 'Terapia y consejería de salud mental.'
    }
  },
  {
    id: 'dir-riva-mental-health-60',
    name: 'Riva Mental Health',
    categories: ['mental-health'],
    city: 'Redwood City',
    address: '1775 Woodside Rd, Suite 301, Redwood City, CA 94061',
    website: 'https://rivamh.com',
    services: {
      en: 'Mental health therapy and counseling.',
      es: 'Terapia y consejería de salud mental.'
    }
  }
];
