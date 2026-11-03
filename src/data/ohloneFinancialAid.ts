// Content from Ohlone College's "Financial Aid: Helping You Pay for College" brochure.
// Phone numbers, hours, deadlines and program descriptions are reproduced as published.

export interface AidCampus {
  name: string;
  phone: string;
  fax: string;
  email: string;
  location: string;
}

export interface AidProgram {
  name: string;
  description: string;
  points?: string[];
}

export interface AidGroup {
  title: string;
  programs: AidProgram[];
}

export const ohloneAid = {
  intro: 'Financial aid helps students afford their education through grants, scholarships, loans, and work-study.',
  whatIs:
    'Financial aid is money made available by federal, state, institutional and private sources in the form of grants, scholarships, loans, and wages. This aid makes it possible for you to continue your education beyond high school, even if you and your family cannot meet the full costs of the college/university you choose to attend.',
  website: 'ohlone.edu/finaid',
  websiteUrl: 'https://www.ohlone.edu/finaid',
  collegeCode: '004481',
  deadline:
    'Priority deadline for Financial Aid is March 2nd. Financial aid is awarded on a first-come, first-served basis; therefore, it is important that you complete your FAFSA/CADAA by March 2nd for the award year. Students are required to apply to FAFSA/CADAA to be considered for any types of aid.',
  campuses: [
    {
      name: 'Fremont Campus',
      phone: '510-659-6150',
      fax: '510-659-7309',
      email: 'financial_aid@ohlone.edu',
      location: 'Fremont Student Services Center, Building 7, Second Floor'
    },
    {
      name: 'Newark Campus',
      phone: '510-742-2341',
      fax: '510-659-7309',
      email: 'financial_aid@ohlone.edu',
      location: 'Newark Student Services Center, Wing 3, First Floor (NC1312)'
    }
  ] as AidCampus[],
  hours: [
    { season: 'Fall & Spring', times: ['Monday–Thursday: 8:30 am–4:45 pm', 'Friday: 8:30 am–12:00 pm'] },
    { season: 'Summer', times: ['Monday–Thursday: 8:30 am–5:00 pm', 'Friday: Closed'] }
  ],
  hoursNote: 'Our hours are subject to change.',
  applications: [
    {
      name: 'Free Application for Federal Student Aid (FAFSA)',
      description: 'Students who are US Citizens, permanent residents, or eligible noncitizens should complete the FAFSA.'
    },
    {
      name: 'CA Dream Act Application (CADAA)',
      description:
        'Undocumented students, DACA recipients (valid/expired), U Visa holders, students with Temporary Protected Status (TPS), and those who meet AB 540 requirements can complete the CA Dream Act Application.'
    }
  ] as AidProgram[],
  maintain: [
    'Maintain a 2.0 cumulative GPA or higher',
    'Completed 67% of attempted units overall',
    'Complete your certificate or degree within 150% of required units'
  ],
  groups: [
    {
      title: 'Federal Aid',
      programs: [
        {
          name: 'Pell Grant',
          description: 'A program funded by the federal government. To qualify, you must:',
          points: [
            'Be an undergraduate student',
            'Be a U.S. citizen or eligible non-citizen',
            'Be enrolled in an eligible degree program',
            'Demonstrate financial need',
            'Maintain satisfactory academic progress',
            'Consent to federal tax information being transferred directly into the FAFSA',
            'Not be in loan default',
            'Have graduated from high school or obtained an equivalent'
          ]
        },
        {
          name: 'Federal Supplemental Educational Opportunity Grant (FSEOG)',
          description:
            'Provide additional financial aid to students who have demonstrated significant financial need. Funding is limited and awarded on a first-come, first-served basis.'
        },
        {
          name: 'Federal Work-Study',
          description:
            'A need-based, federally funded program that offers eligible students part-time job opportunities on campus. Funding is limited and awarded on a first-come, first-served basis.'
        },
        {
          name: 'Federal Loans',
          description: 'Loans must be repaid. There are two federal Direct Loans:',
          points: [
            'Subsidized Loans: Need-based; government pays interest while enrolled at least half-time, during grace periods, and deferment.',
            'Unsubsidized Loans: Not need-based; interest accrues immediately and is capitalized if unpaid.'
          ]
        }
      ]
    },
    {
      title: 'State Aid',
      programs: [
        {
          name: 'California College Promise Grant (CCPG)',
          description: 'Covers class/enrollment fees for eligible CA residents or AB540 students. Non-monetary award.'
        },
        {
          name: 'CA College Promise Program (AB19/AB2)',
          description:
            'This award is available to eligible full-time students who do not qualify for the CCPG and is intended to help offset a portion of their educational expenses.'
        },
        {
          name: 'Cal Grant Program',
          description: 'State-funded and does not need to be repaid:',
          points: [
            'Cal Grant A: Not typically available at California Community Colleges, unless the student has dependent children.',
            'Cal Grant B: Access award for books, supplies, other college costs.',
            'Cal Grant C: For students in approved occupational/technical programs.'
          ]
        },
        {
          name: 'CA Chafee Grant',
          description: 'Provides grants to eligible current or former foster youth to help with college expenses.'
        }
      ]
    },
    {
      title: 'Institutional Aid',
      programs: [
        { name: 'Private Loans', description: 'Available to Ohlone students through private lenders.' },
        {
          name: 'Ohlone College Foundation Grant & Scholarship Programs',
          description: 'Various opportunities available based on merit, need, or field of study.'
        }
      ]
    }
  ] as AidGroup[]
};
