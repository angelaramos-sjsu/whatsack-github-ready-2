import { CategoryId, SourceTypeId } from '../types';

export interface DirectoryEntry {
  id: string;
  name: string;
  categoryId: CategoryId;
  sourceType: SourceTypeId;
  city: string;
  address?: string;
  website: string;
  description?: string;
}

// Silicon Valley community resource listings supplied by the project team
// (ResourceList1 spreadsheet). Only the details present in that listing are
// shown: no phone numbers, hours, costs or eligibility are invented, and
// missing fields are left out instead of filled with placeholders.
export const directoryEntries: DirectoryEntry[] = [
  {
    id: 'dir-campbell-adult-center-1',
    name: 'Campbell Adult Center',
    categoryId: 'community',
    sourceType: 'community-center',
    city: 'Campbell',
    address: '1 W. Campbell Ave., C-33, Campbell, CA 95008',
    website: 'https://campbellca.gov/adultcenter'
  },
  {
    id: 'dir-cupertino-senior-center-2',
    name: 'Cupertino Senior Center',
    categoryId: 'community',
    sourceType: 'community-center',
    city: 'Cupertino',
    address: '21251 Stevens Creek Blvd., Cupertino, CA 95014',
    website: 'https://cupertino.gov/Parks-Recreation/Senior-Center'
  },
  {
    id: 'dir-gilroy-senior-center-3',
    name: 'Gilroy Senior Center',
    categoryId: 'community',
    sourceType: 'community-center',
    city: 'Gilroy',
    address: '7371 Hanna St., Gilroy, CA 95020',
    website: 'https://cityofgilroy.org'
  },
  {
    id: 'dir-los-altos-adult-50-program-4',
    name: 'Los Altos Adult 50+ Program',
    categoryId: 'community',
    sourceType: 'community-center',
    city: 'Los Altos',
    address: '97 Hillview Ave., Los Altos, CA 94022',
    website: 'https://losaltosca.gov/664/Adult-50-Program'
  },
  {
    id: 'dir-los-gatos-adult-recreation-5',
    name: 'Los Gatos Adult Recreation',
    categoryId: 'community',
    sourceType: 'community-center',
    city: 'Los Gatos',
    address: '208 E. Main St., Los Gatos, CA 95030',
    website: 'https://lgsrecreation.org/adults/55-plus'
  },
  {
    id: 'dir-barbara-lee-senior-center-6',
    name: 'Barbara Lee Senior Center',
    categoryId: 'community',
    sourceType: 'community-center',
    city: 'Milpitas',
    address: '40 N. Milpitas Blvd., Milpitas, CA 95035',
    website: 'https://milpitas.gov/797/Adult-Programs'
  },
  {
    id: 'dir-morgan-hill-senior-center-7',
    name: 'Morgan Hill Senior Center',
    categoryId: 'community',
    sourceType: 'community-center',
    city: 'Morgan Hill',
    address: '171 W. Edmundson Ave., Morgan Hill, CA 95037',
    website: 'https://morganhill.ca.gov/259/Senior-Center'
  },
  {
    id: 'dir-mountain-view-senior-center-8',
    name: 'Mountain View Senior Center',
    categoryId: 'community',
    sourceType: 'community-center',
    city: 'Mountain View',
    address: '266 Escuela Ave., Mountain View, CA 94040',
    website: 'https://mountainview.gov/senior-center'
  },
  {
    id: 'dir-avenidas-450-bryant-9',
    name: 'Avenidas @450 Bryant',
    categoryId: 'community',
    sourceType: 'nonprofit',
    city: 'Palo Alto',
    address: '450 Bryant St., Palo Alto, CA 94301',
    website: 'https://avenidas.org'
  },
  {
    id: 'dir-second-harvest-of-silicon-valley-10',
    name: 'Second Harvest of Silicon Valley',
    categoryId: 'food',
    sourceType: 'food-bank',
    city: 'San Jose',
    address: '750 Curtner Avenue, San Jose, CA 95125',
    website: 'https://www.shfb.org/get-food/'
  },
  {
    id: 'dir-second-harvest-of-silicon-valley-calfresh-assistance-11',
    name: 'Second Harvest of Silicon Valley - calfresh assistance',
    categoryId: 'food',
    sourceType: 'food-bank',
    city: 'San Jose',
    address: '750 Curtner Avenue, San Jose, CA 95125',
    website: 'https://www.shfb.org/get-food/calfresh/'
  },
  {
    id: 'dir-benefitscal-12',
    name: 'BenefitsCal',
    categoryId: 'food',
    sourceType: 'government',
    city: 'Statewide',
    address: 'Online statewide',
    website: 'https://benefitscal.com/'
  },
  {
    id: 'dir-santa-clara-county-social-services-agency-13',
    name: 'Santa Clara County Social Services Agency',
    categoryId: 'food',
    sourceType: 'government',
    city: 'San Jose',
    address: '1867 Senter Road, San Jose, CA 95112',
    website: 'https://ssa.santaclaracounty.gov/apply-public-benefits'
  },
  {
    id: 'dir-california-department-of-social-services-14',
    name: 'California Department of Social Services',
    categoryId: 'food',
    sourceType: 'government',
    city: 'Statewide',
    address: '744 P Street Sacramentio, CA 95814',
    website: 'https://cdss.ca.gov/food'
  },
  {
    id: 'dir-san-mateo-county-human-services-agency-15',
    name: 'San Mateo County Human Services Agency',
    categoryId: 'food',
    sourceType: 'government',
    city: 'Redwood City',
    address: '5200 Middlefield Road, Redwood City, CA 94063',
    website: 'https://www.smcgov.org/hsa/apply-calfresh'
  },
  {
    id: 'dir-211-bay-area-16',
    name: '211 Bay Area',
    categoryId: 'food',
    sourceType: 'hotline',
    city: 'San Francisco',
    address: '550 Kearny Street, Suite 1000, San Francisco, CA 94108',
    website: 'https://211bayarea.org/'
  },
  {
    id: 'dir-california-association-of-food-banks-17',
    name: 'California Association of Food Banks',
    categoryId: 'food',
    sourceType: 'online-directory',
    city: 'Oakland',
    address: '1616 Franklin Street, Suite 300, Oakland, CA 946112',
    website: 'https://www.cafoodbanks.org/find-food/'
  },
  {
    id: 'dir-san-jose-city-college-18',
    name: 'San José City College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'San Jose',
    address: '2100 Moorpark Ave, San Jose, CA 95128',
    website: 'https://sjcc.edu'
  },
  {
    id: 'dir-evergreen-valley-college-19',
    name: 'Evergreen Valley College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'San Jose',
    address: '3095 Yerba Buena Rd, San Jose, CA 95135',
    website: 'https://www.evc.edu'
  },
  {
    id: 'dir-mission-college-20',
    name: 'Mission College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Santa Clara',
    address: '3000 Mission College Blvd, Santa Clara, CA 95054',
    website: 'https://missioncollege.edu'
  },
  {
    id: 'dir-de-anza-college-21',
    name: 'De Anza College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Cupertino',
    address: '21250 Stevens Creek Blvd, Cupertino, CA 95014',
    website: 'https://www.deanza.edu'
  },
  {
    id: 'dir-foothill-college-22',
    name: 'Foothill College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Los Altos Hills',
    address: '12345 El Monte Rd, Los Altos Hills, CA 94022',
    website: 'https://foothill.edu'
  },
  {
    id: 'dir-west-valley-college-23',
    name: 'West Valley College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Saratoga',
    address: '14000 Fruitvale Ave, Saratoga, CA 95070',
    website: 'https://www.westvalley.edu'
  },
  {
    id: 'dir-ohlone-college-24',
    name: 'Ohlone College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Fremont',
    address: '43600 Mission Blvd, Fremont, CA 94539',
    website: 'https://www.ohlone.edu'
  },
  {
    id: 'dir-gavilan-college-25',
    name: 'Gavilan College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Gilroy',
    address: '5055 Santa Teresa Blvd, Gilroy, CA 95020',
    website: 'https://www.gavilan.edu'
  },
  {
    id: 'dir-canada-college-26',
    name: 'Cañada College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Redwood City',
    address: '4200 Farm Hill Blvd, Redwood City, CA 94061',
    website: 'https://canadacollege.edu'
  },
  {
    id: 'dir-college-of-san-mateo-27',
    name: 'College of San Mateo',
    categoryId: 'education',
    sourceType: 'school',
    city: 'San Mateo',
    address: '1700 W Hillsdale Blvd, San Mateo, CA 94402',
    website: 'https://collegeofsanmateo.edu'
  },
  {
    id: 'dir-skyline-college-28',
    name: 'Skyline College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'San Bruno',
    address: '3300 College Dr, San Bruno, CA 94066',
    website: 'https://skylinecollege.edu'
  },
  {
    id: 'dir-chabot-college-29',
    name: 'Chabot College',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Hayward',
    address: '25555 Hesperian Blvd, Hayward, CA 94545',
    website: 'https://www.chabotcollege.edu'
  },
  {
    id: 'dir-10-000-degrees-30',
    name: '10,000 Degrees',
    categoryId: 'education',
    sourceType: 'nonprofit',
    city: 'San Rafael',
    address: '1401 Los Gamos Dr, Suite 205, San Rafael, CA 94903 (main office)',
    website: 'https://10000degrees.org',
    description: 'Provides college preparation, scholarships, financial aid guidance, and mentoring.'
  },
  {
    id: 'dir-college-track-east-palo-alto-31',
    name: 'College Track — East Palo Alto',
    categoryId: 'education',
    sourceType: 'nonprofit',
    city: 'East Palo Alto',
    address: '1877 Bay Rd, East Palo Alto, CA 94303',
    website: 'https://collegetrack.org/communities/east-palo-alto-ca/',
    description: 'Provides long-term college preparation and college completion support for eligible students.'
  },
  {
    id: 'dir-year-up-united-silicon-valley-32',
    name: 'Year Up United — Silicon Valley',
    categoryId: 'workforce',
    sourceType: 'workforce',
    city: 'San Jose',
    address: '2600 N First St, San Jose, CA 95134',
    website: 'https://www.yearup.org',
    description: 'Introduces tuition-free career training and internship opportunities for eligible young adults seeking alternatives to traditional four-year degrees.'
  },
  {
    id: 'dir-novaworks-sunnyvale-33',
    name: 'NOVAworks — Sunnyvale',
    categoryId: 'workforce',
    sourceType: 'workforce',
    city: 'Sunnyvale',
    address: '456 W Olive Ave, Sunnyvale, CA 94086',
    website: 'https://novaworks.org',
    description: 'Provides career counseling, job-search assistance, and potential retraining funding for eligible displaced workers in northern Santa Clara County.'
  },
  {
    id: 'dir-novaworks-san-mateo-34',
    name: 'NOVAworks — San Mateo',
    categoryId: 'workforce',
    sourceType: 'workforce',
    city: 'San Mateo',
    address: '1777 Borel Pl, Suite 500, San Mateo, CA',
    website: 'https://novaworks.org',
    description: 'Expands access to career counseling, employment assistance, and workforce training opportunities for San Mateo County residents.'
  },
  {
    id: 'dir-work2future-san-jose-job-center-35',
    name: 'work2future — San José Job Center',
    categoryId: 'workforce',
    sourceType: 'workforce',
    city: 'San Jose',
    address: '1608 Las Plumas Ave, San Jose, CA',
    website: 'https://www.work2future.org',
    description: 'Connects unemployed and underemployed San José residents to career coaching, job-search assistance, and potential training funding.'
  },
  {
    id: 'dir-work2future-north-san-jose-job-center-36',
    name: 'work2future — North San José Job Center',
    categoryId: 'workforce',
    sourceType: 'workforce',
    city: 'San Jose',
    address: '1901 Zanker Rd, San Jose, CA',
    website: 'https://www.work2future.org',
    description: 'Provides a geographically convenient workforce resource for North San José residents seeking employment and career transition support.'
  },
  {
    id: 'dir-work2future-gilroy-job-center-37',
    name: 'work2future — Gilroy Job Center',
    categoryId: 'workforce',
    sourceType: 'workforce',
    city: 'Gilroy',
    address: '379 Tomkins Ct, Gilroy, CA',
    website: 'https://www.work2future.org',
    description: 'Expands workforce resource coverage to South County residents seeking job placement, career counseling, and retraining opportunities.'
  },
  {
    id: 'dir-silicon-valley-adult-education-metroed-38',
    name: 'Silicon Valley Adult Education (MetroED)',
    categoryId: 'education',
    sourceType: 'school',
    city: 'San Jose',
    address: '760 Hillsdale Ave, San Jose, CA 95136',
    website: 'https://svae.metroed.net',
    description: 'Offers adult education and foundational skills development to help workers prepare for new careers or additional technical training.'
  },
  {
    id: 'dir-open-doors-south-bay-39',
    name: 'Open Doors South Bay',
    categoryId: 'education',
    sourceType: 'other',
    city: 'San Jose',
    address: '625 Educational Park Dr, San Jose, CA 95133',
    website: 'https://opendoorssouthbay.org'
  },
  {
    id: 'dir-san-jose-public-library-king-library-40',
    name: 'San José Public Library — King Library',
    categoryId: 'education',
    sourceType: 'government',
    city: 'San Jose',
    address: '150 E San Fernando St, San Jose, CA 95112',
    website: 'https://www.sjpl.org',
    description: 'Provides free access to computers, educational materials, digital learning resources, and career exploration tools.'
  },
  {
    id: 'dir-california-edd-eligible-training-provider-list-41',
    name: 'California EDD — Eligible Training Provider List',
    categoryId: 'workforce',
    sourceType: 'workforce',
    city: 'Online',
    address: 'Online statewide directory',
    website: 'https://edd.ca.gov/TrainingPrograms',
    description: 'Helps users identify eligible training providers and explore programs that may qualify for workforce development funding.'
  },
  {
    id: 'dir-apprenticeship-gov-apprenticeship-finder-42',
    name: 'Apprenticeship.gov — Apprenticeship Finder',
    categoryId: 'workforce',
    sourceType: 'workforce',
    city: 'Online',
    address: 'Online nationwide directory',
    website: 'https://www.apprenticeship.gov',
    description: 'Helps users discover paid apprenticeship opportunities that combine structured education with hands-on career training.'
  },
  {
    id: 'dir-extended-opportunity-programs-and-services-eops-43',
    name: 'Extended Opportunity Programs and Services (EOPS)',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Multiple campuses',
    address: 'California community colleges',
    website: 'https://www.cccco.edu',
    description: 'Connects eligible community college students to academic counseling, educational support, and services that promote college success.'
  },
  {
    id: 'dir-cooperative-agencies-resources-for-education-care-44',
    name: 'Cooperative Agencies Resources for Education (CARE)',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Multiple campuses',
    address: 'Participating community colleges',
    website: 'https://www.cccco.edu',
    description: 'Provides additional educational support for eligible parenting students receiving qualifying public assistance.'
  },
  {
    id: 'dir-nextup-foster-youth-support-45',
    name: 'NextUp / Foster Youth Support',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Multiple campuses',
    address: 'Participating community colleges',
    website: 'https://www.cccco.edu',
    description: 'Connects eligible current and former foster youth to specialized academic, financial, and student success services.'
  },
  {
    id: 'dir-disabled-students-programs-and-services-dsps-46',
    name: 'Disabled Students Programs and Services (DSPS)',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Multiple campuses',
    address: 'California community colleges',
    website: 'https://www.cccco.edu',
    description: 'Helps students with disabilities access academic accommodations and support services while pursuing college or career training.'
  },
  {
    id: 'dir-california-college-promise-grant-47',
    name: 'California College Promise Grant',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Multiple campuses',
    address: 'California community colleges',
    website: 'https://www.cccco.edu',
    description: 'Helps eligible community college students reduce educational costs through enrollment fee waivers.'
  },
  {
    id: 'dir-community-college-basic-needs-centers-48',
    name: 'Community College Basic Needs Centers',
    categoryId: 'education',
    sourceType: 'school',
    city: 'Multiple campuses',
    address: 'California community colleges',
    website: 'https://www.cccco.edu'
  },
  {
    id: 'dir-california-dream-act-application-cadaa-49',
    name: 'California Dream Act Application (CADAA)',
    categoryId: 'education',
    sourceType: 'government',
    city: 'Online',
    address: 'Online statewide application',
    website: 'https://dream.csac.ca.gov',
    description: 'Helps eligible students apply for California state financial aid when FAFSA is not the appropriate application.'
  },
  {
    id: 'dir-cal-grant-program-50',
    name: 'Cal Grant Program',
    categoryId: 'education',
    sourceType: 'government',
    city: 'Statewide',
    address: 'Statewide financial aid program',
    website: 'https://csac.ca.gov',
    description: 'Helps eligible students access California state grants to reduce the financial burden of pursuing higher education.'
  },
  {
    id: 'dir-california-training-benefits-ctb-51',
    name: 'California Training Benefits (CTB)',
    categoryId: 'workforce',
    sourceType: 'government',
    city: 'Statewide',
    address: 'Statewide EDD program',
    website: 'https://edd.ca.gov',
    description: 'Explains how approved education or training programs may interact with unemployment benefits and what requirements participants must follow.'
  },
  {
    id: 'dir-fafsa-52',
    name: 'FAFSA',
    categoryId: 'education',
    sourceType: 'government',
    city: 'Statewide',
    address: 'Online statewide',
    website: 'https://studentaid.gov',
    description: 'Connects students to the official federal financial aid application and information about grants, loans, and work-study opportunities.'
  },
  {
    id: 'dir-san-jose-mental-health-53',
    name: 'San Jose Mental Health',
    categoryId: 'mental-health',
    sourceType: 'healthcare',
    city: 'San Jose',
    address: '1261 Lincoln Ave, San Jose, CA 95125',
    website: 'https://sanjosementalhealth.org'
  },
  {
    id: 'dir-santa-clara-county-mental-health-54',
    name: 'Santa Clara County Mental Health — Behavioral Health Services',
    categoryId: 'mental-health',
    sourceType: 'government',
    city: 'San Jose',
    address: '1650 Las Plumas Ave # K, San Jose, CA 95133',
    website: 'https://bhsd.santaclaracounty.gov'
  },
  {
    id: 'dir-monterrey-health-55',
    name: 'Monterrey Health',
    categoryId: 'mental-health',
    sourceType: 'healthcare',
    city: 'San Jose',
    address: '1660 Hamilton Ave #100, San Jose, CA 95125',
    website: 'https://www.monterreyhealth.com'
  },
  {
    id: 'dir-harmony-place-san-jose-56',
    name: 'Harmony Place San Jose',
    categoryId: 'mental-health',
    sourceType: 'healthcare',
    city: 'San Jose',
    address: '79 Devine St #100, San Jose, CA 95110',
    website: 'https://harmonytreatmentcenters.com/our-centers/san-jose-ca/'
  },
  {
    id: 'dir-trauma-healing-therapy-57',
    name: 'Trauma Healing Therapy',
    categoryId: 'mental-health',
    sourceType: 'healthcare',
    city: 'Cupertino',
    address: '21710 Stevens Creek Blvd Ste 140, Cupertino, CA 95014',
    website: 'https://www.traumahealingtherapy.com'
  },
  {
    id: 'dir-west-valley-community-services-58',
    name: 'West Valley Community Services',
    categoryId: 'mental-health',
    sourceType: 'nonprofit',
    city: 'Cupertino',
    address: '10104 Vista Dr, Cupertino, CA 95014',
    website: 'https://www.wvcommunityservices.org'
  },
  {
    id: 'dir-bay-area-mental-health-59',
    name: 'Bay Area Mental Health',
    categoryId: 'mental-health',
    sourceType: 'healthcare',
    city: 'Campbell',
    address: '1925 Winchester Blvd #204, Campbell, CA 95008',
    website: 'https://www.bayareamh.com'
  },
  {
    id: 'dir-riva-mental-health-60',
    name: 'Riva Mental Health',
    categoryId: 'mental-health',
    sourceType: 'healthcare',
    city: 'Redwood City',
    address: '1775 Woodside Rd, Suite 301, Redwood City, CA 94061',
    website: 'https://rivamh.com'
  }
];
