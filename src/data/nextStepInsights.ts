/**
 * NextStep Insights catalog transcribed from WhatSack_103_NextStep_Insights.csv
 * (103 source-backed entries, prepared for the academic demonstration in October 2026).
 * A source URL is a starting point, not a live verification of eligibility, cost or deadlines.
 * Keep this file scripted and local: no model, API key, network lookup or personal-data collection.
 */
export type InsightPersona = 'Sofia' | 'Daniel';
export interface InsightSource { title: string; url: string; }
export interface NextStepInsightEntry {
  id: string;
  persona: InsightPersona;
  branchId: string;
  branch: string;
  question: string;
  insight: string;
  actionLabel: string;
  sources: InsightSource[];
}

export const nextStepInsightEntries: NextStepInsightEntry[] = [
  {
    "id": "S0.1",
    "persona": "Sofia",
    "branchId": "S0",
    "branch": "Opening questions",
    "question": "I want to go to college but my family doesn't have much money. What are my options?",
    "insight": "A low sticker price is not the same as a low total cost; books, transportation and housing matter too.",
    "actionLabel": "Compare total cost, not just tuition",
    "sources": [
      {
        "title": "Federal College Net Price Calculator Center",
        "url": "https://collegecost.ed.gov/net-price"
      },
      {
        "title": "Ohlone Financial Aid",
        "url": "https://www.ohlone.edu/financialaid"
      }
    ]
  },
  {
    "id": "S0.2",
    "persona": "Sofia",
    "branchId": "S0",
    "branch": "Opening questions",
    "question": "is college even worth it if i'm gonna be in debt",
    "insight": "A school's value depends on the degree, actual debt and career fit; there is no single right choice for everyone.",
    "actionLabel": "Compare two debt-aware pathways",
    "sources": [
      {
        "title": "Federal College Net Price Calculator Center",
        "url": "https://collegecost.ed.gov/net-price"
      },
      {
        "title": "CSU Associate Degree for Transfer",
        "url": "https://www.calstate.edu/apply/transfer/pages/ccc-associate-degree-for-transfer.aspx"
      }
    ]
  },
  {
    "id": "S0.3",
    "persona": "Sofia",
    "branchId": "S0",
    "branch": "Opening questions",
    "question": "how do people afford college when their parents cant help",
    "insight": "A lack of family contributions does not automatically rule out grants, fee waivers, campus aid or work-study.",
    "actionLabel": "See the financial-aid starting checklist",
    "sources": [
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      },
      {
        "title": "California Student Aid Commission",
        "url": "https://www.csac.ca.gov/"
      }
    ]
  },
  {
    "id": "S0.4",
    "persona": "Sofia",
    "branchId": "S0",
    "branch": "Opening questions",
    "question": "whats the cheapest way to get a bachelor's degree in california",
    "insight": "An inexpensive bachelor’s pathway may be community college plus transfer, but major-specific course planning is essential to avoid extra semesters.",
    "actionLabel": "Check an Ohlone-to-CSU major pathway",
    "sources": [
      {
        "title": "ASSIST transfer agreements",
        "url": "https://assist.org/"
      },
      {
        "title": "CSU Associate Degree for Transfer",
        "url": "https://www.calstate.edu/apply/transfer/pages/ccc-associate-degree-for-transfer.aspx"
      }
    ]
  },
  {
    "id": "S0.5",
    "persona": "Sofia",
    "branchId": "S0",
    "branch": "Opening questions",
    "question": "I'm a senior and I haven't started anything. Is it too late?",
    "insight": "For fall 2027, UC's first-year filing period closes November 30, 2026; other programs may use different deadlines. Avoid waiting for every form to be perfect.",
    "actionLabel": "Open the official deadlines checklist",
    "sources": [
      {
        "title": "UC application dates and deadlines",
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html"
      },
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      }
    ]
  },
  {
    "id": "S0.6",
    "persona": "Sofia",
    "branchId": "S0",
    "branch": "Opening questions",
    "question": "do I have to pick a major before I apply",
    "insight": "Some majors have selective entry requirements even when a campus permits an undeclared application.",
    "actionLabel": "Compare two majors with a counselor",
    "sources": [
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      },
      {
        "title": "UC application dates and deadlines",
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html"
      }
    ]
  },
  {
    "id": "S1.1",
    "persona": "Sofia",
    "branchId": "S1",
    "branch": "Finding affordable colleges",
    "question": "Is Ohlone actually free? Like zero dollars?",
    "insight": "Even with an enrollment-fee waiver, books, transit, supplies and living expenses can remain; campus Promise programs may have different coverage.",
    "actionLabel": "Ask Ohlone for a total-cost breakdown",
    "sources": [
      {
        "title": "Ohlone Financial Aid",
        "url": "https://www.ohlone.edu/financialaid"
      },
      {
        "title": "Federal College Net Price Calculator Center",
        "url": "https://collegecost.ed.gov/net-price"
      }
    ]
  },
  {
    "id": "S1.2",
    "persona": "Sofia",
    "branchId": "S1",
    "branch": "Finding affordable colleges",
    "question": "If I go to Ohlone will people think I couldn't get into a real college?",
    "insight": "Community college can be an intentional transfer route, not evidence of academic ability. A transfer plan makes that route more concrete.",
    "actionLabel": "Explore a transferable major at Ohlone",
    "sources": [
      {
        "title": "ASSIST transfer agreements",
        "url": "https://assist.org/"
      },
      {
        "title": "CSU Associate Degree for Transfer",
        "url": "https://www.calstate.edu/apply/transfer/pages/ccc-associate-degree-for-transfer.aspx"
      }
    ]
  },
  {
    "id": "S1.3",
    "persona": "Sofia",
    "branchId": "S1",
    "branch": "Finding affordable colleges",
    "question": "How far is Ohlone from Fremont BART? Can I get there without a car?",
    "insight": "A campus shuttle or bus schedule may not match evening classes. Compare the last return trip before registering.",
    "actionLabel": "Check today's transit route and class time",
    "sources": [
      {
        "title": "Ohlone College Admissions",
        "url": "https://www.ohlone.edu/admissions"
      }
    ]
  },
  {
    "id": "S1.4",
    "persona": "Sofia",
    "branchId": "S1",
    "branch": "Finding affordable colleges",
    "question": "What about San Jose State or Cal State East Bay? Are those cheap?",
    "insight": "Compare SJSU and CSU East Bay using each school's net price and commute—not tuition alone.",
    "actionLabel": "Open two campus net price calculators",
    "sources": [
      {
        "title": "Federal College Net Price Calculator Center",
        "url": "https://collegecost.ed.gov/net-price"
      },
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      }
    ]
  },
  {
    "id": "S1.5",
    "persona": "Sofia",
    "branchId": "S1",
    "branch": "Finding affordable colleges",
    "question": "Can I work full time and still go to school?",
    "insight": "Working full time may require a lighter course load, which can change aid and time to graduation.",
    "actionLabel": "Ask about part-time aid and degree timing",
    "sources": [
      {
        "title": "Ohlone Financial Aid",
        "url": "https://www.ohlone.edu/financialaid"
      },
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      }
    ]
  },
  {
    "id": "S1.6",
    "persona": "Sofia",
    "branchId": "S1",
    "branch": "Finding affordable colleges",
    "question": "I'm interested in nursing. Where's the cheapest place to start?",
    "insight": "Nursing programs can be competitive; affordable prerequisites alone do not guarantee a place in a nursing cohort.",
    "actionLabel": "Request a pre-nursing course map",
    "sources": [
      {
        "title": "ASSIST transfer agreements",
        "url": "https://assist.org/"
      },
      {
        "title": "Ohlone College Admissions",
        "url": "https://www.ohlone.edu/admissions"
      }
    ]
  },
  {
    "id": "S1.7",
    "persona": "Sofia",
    "branchId": "S1",
    "branch": "Finding affordable colleges",
    "question": "What if I pick a major and AI takes those jobs?",
    "insight": "AI may change tasks within occupations; no source can guarantee that a major will be future-proof.",
    "actionLabel": "Compare two occupations' training and outlook",
    "sources": [
      {
        "title": "BLS Occupational Outlook Handbook",
        "url": "https://www.bls.gov/ooh/"
      }
    ]
  },
  {
    "id": "S1.8",
    "persona": "Sofia",
    "branchId": "S1",
    "branch": "Finding affordable colleges",
    "question": "Would a trade or apprenticeship be smarter than college for me?",
    "insight": "Apprenticeships, certificates and degrees can overlap. Compare actual entry requirements, paid training and future transferability.",
    "actionLabel": "Compare a trade route and a degree route",
    "sources": [
      {
        "title": "Ohlone College career education",
        "url": "https://www.ohlone.edu/career-education"
      },
      {
        "title": "Tesla Manufacturing Development Program",
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      }
    ]
  },
  {
    "id": "S2.1",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "Is the FAFSA open yet? When is it due?",
    "insight": "State and campus aid deadlines may be much earlier than the federal final submission deadline. Save separate reminders.",
    "actionLabel": "Review aid deadlines for each chosen school",
    "sources": [
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      },
      {
        "title": "California Student Aid Commission",
        "url": "https://www.csac.ca.gov/"
      }
    ]
  },
  {
    "id": "S2.2",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "What's the difference between FAFSA and the California Dream Act one? Which one do I fill out?",
    "insight": "Your parents' citizenship or SSN situation does not alone determine which student aid form you should use; do not disclose family status to WhatSack.",
    "actionLabel": "Get confidential guidance about the right form",
    "sources": [
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      },
      {
        "title": "California Student Aid Commission",
        "url": "https://www.csac.ca.gov/"
      }
    ]
  },
  {
    "id": "S2.3",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "My parents don't have Social Security numbers. Is it safe for me to do the FAFSA?",
    "insight": "Parents without SSNs can follow official contributor-account instructions. Privacy and immigration questions warrant a trusted human adviser; avoid sharing those details here.",
    "actionLabel": "Read official contributor instructions",
    "sources": [
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      },
      {
        "title": "Federal Student Aid — FAFSA application steps",
        "url": "https://studentaid.gov/articles/things-you-need-for-fafsa/"
      }
    ]
  },
  {
    "id": "S2.4",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "I don't know how much my parents make. Can I still start?",
    "insight": "You can begin preparing without knowing exact household income. The official form explains when tax data can be transferred.",
    "actionLabel": "Open the FAFSA preparation checklist",
    "sources": [
      {
        "title": "Federal Student Aid — FAFSA application steps",
        "url": "https://studentaid.gov/articles/things-you-need-for-fafsa/"
      }
    ]
  },
  {
    "id": "S2.5",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "What's a Cal Grant and do I automatically get it?",
    "insight": "Cal Grant consideration involves more than submitting an aid form; verify that the required GPA information reaches CSAC.",
    "actionLabel": "Ask your school about GPA submission",
    "sources": [
      {
        "title": "California Student Aid Commission",
        "url": "https://www.csac.ca.gov/"
      }
    ]
  },
  {
    "id": "S2.6",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "My dad's hours got cut this year. The FAFSA uses 2025 taxes, so does that even count?",
    "insight": "Aid forms may use older tax information. Significant current-year pay cuts can be reviewed through a college's special-circumstances process.",
    "actionLabel": "Ask for a special-circumstances review",
    "sources": [
      {
        "title": "Federal Student Aid — financial-aid changes",
        "url": "https://studentaid.gov/articles/financial-aid-not-enough/"
      }
    ]
  },
  {
    "id": "S2.7",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "Can my parents take out loans for me? How much?",
    "insight": "A parent loan belongs to the parent and creates repayment obligations. Compare grants and net cost before considering borrowing; check current loan terms directly.",
    "actionLabel": "Compare borrowing versus grant aid",
    "sources": [
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      },
      {
        "title": "Federal College Net Price Calculator Center",
        "url": "https://collegecost.ed.gov/net-price"
      }
    ]
  },
  {
    "id": "S2.8",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "Are there scholarships for first-gen Latina students in the Bay Area?",
    "insight": "Look for free school or community scholarship lists and check award renewal rules. Never pay someone to hold or release a scholarship.",
    "actionLabel": "Open verified scholarship-scam guidance",
    "sources": [
      {
        "title": "FTC — Avoid scholarship and aid scams",
        "url": "https://consumer.ftc.gov/articles/how-avoid-scholarship-and-financial-aid-scams"
      },
      {
        "title": "Ohlone Financial Aid",
        "url": "https://www.ohlone.edu/financialaid"
      }
    ]
  },
  {
    "id": "S2.9",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "What's a net price calculator and why is every school different?",
    "insight": "Net price is an estimate after typical grant aid, not a financial-aid offer. Assumptions about living arrangements can change the result.",
    "actionLabel": "Use the same living assumptions in each estimate",
    "sources": [
      {
        "title": "Federal College Net Price Calculator Center",
        "url": "https://collegecost.ed.gov/net-price"
      }
    ]
  },
  {
    "id": "S2.10",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "How much will I actually pay at Ohlone vs SJSU vs a UC after aid?",
    "insight": "One campus can cost less than expected after aid. Use comparable family and housing assumptions rather than ranking campuses by sticker price.",
    "actionLabel": "Build a side-by-side net-price comparison",
    "sources": [
      {
        "title": "Federal College Net Price Calculator Center",
        "url": "https://collegecost.ed.gov/net-price"
      },
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      },
      {
        "title": "UC application dates and deadlines",
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html"
      }
    ]
  },
  {
    "id": "S2.11",
    "persona": "Sofia",
    "branchId": "S2",
    "branch": "Understanding financial aid",
    "question": "I got a scholarship email asking for my bank info. Is that legit?",
    "insight": "An unsolicited award demanding bank details or an advance fee is a warning sign. Do not click the payment link.",
    "actionLabel": "Check FTC scholarship fraud signs",
    "sources": [
      {
        "title": "FTC — Avoid scholarship and aid scams",
        "url": "https://consumer.ftc.gov/articles/how-avoid-scholarship-and-financial-aid-scams"
      }
    ]
  },
  {
    "id": "S3.1",
    "persona": "Sofia",
    "branchId": "S3",
    "branch": "Comparing college pathways",
    "question": "If I start at Ohlone, am I guaranteed to get into a UC or CSU later?",
    "insight": "Transfer guarantees have conditions: an ADT offers CSU-system admission protections, not admission to every campus or major. UC routes differ.",
    "actionLabel": "Check the exact transfer agreement",
    "sources": [
      {
        "title": "CSU Associate Degree for Transfer",
        "url": "https://www.calstate.edu/apply/transfer/pages/ccc-associate-degree-for-transfer.aspx"
      },
      {
        "title": "ASSIST transfer agreements",
        "url": "https://assist.org/"
      }
    ]
  },
  {
    "id": "S3.2",
    "persona": "Sofia",
    "branchId": "S3",
    "branch": "Comparing college pathways",
    "question": "Does transferring take longer than four years total?",
    "insight": "The shortest transfer route depends on major prerequisites, course availability, and how many units actually apply.",
    "actionLabel": "Make a semester-by-semester transfer plan",
    "sources": [
      {
        "title": "ASSIST transfer agreements",
        "url": "https://assist.org/"
      },
      {
        "title": "CSU Associate Degree for Transfer",
        "url": "https://www.calstate.edu/apply/transfer/pages/ccc-associate-degree-for-transfer.aspx"
      }
    ]
  },
  {
    "id": "S3.3",
    "persona": "Sofia",
    "branchId": "S3",
    "branch": "Comparing college pathways",
    "question": "If I live at home, how much do I actually save?",
    "insight": "Living at home may cut housing expenses but still create transportation, meals and scheduling costs.",
    "actionLabel": "Compare commuter and residential budgets",
    "sources": [
      {
        "title": "Federal College Net Price Calculator Center",
        "url": "https://collegecost.ed.gov/net-price"
      }
    ]
  },
  {
    "id": "S3.4",
    "persona": "Sofia",
    "branchId": "S3",
    "branch": "Comparing college pathways",
    "question": "My friend says community college credits don't transfer. Is that true?",
    "insight": "Some classes transfer, some count only as electives, and others do not satisfy major requirements. Check each specific course.",
    "actionLabel": "Verify a course on ASSIST",
    "sources": [
      {
        "title": "ASSIST transfer agreements",
        "url": "https://assist.org/"
      }
    ]
  },
  {
    "id": "S3.5",
    "persona": "Sofia",
    "branchId": "S3",
    "branch": "Comparing college pathways",
    "question": "Is a UC worth the extra money over a CSU?",
    "insight": "A UC is not necessarily more expensive after aid; compare net price, program fit and graduation plans for specific campuses.",
    "actionLabel": "Compare one UC and one CSU net price",
    "sources": [
      {
        "title": "Federal College Net Price Calculator Center",
        "url": "https://collegecost.ed.gov/net-price"
      },
      {
        "title": "UC application dates and deadlines",
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html"
      }
    ]
  },
  {
    "id": "S3.6",
    "persona": "Sofia",
    "branchId": "S3",
    "branch": "Comparing college pathways",
    "question": "What if I want to be a nurse or an engineer — does the path change?",
    "insight": "Selective nursing and engineering pathways may require specific prerequisites and sequencing before transfer.",
    "actionLabel": "Ask for the major-specific transfer map",
    "sources": [
      {
        "title": "ASSIST transfer agreements",
        "url": "https://assist.org/"
      },
      {
        "title": "CSU Associate Degree for Transfer",
        "url": "https://www.calstate.edu/apply/transfer/pages/ccc-associate-degree-for-transfer.aspx"
      }
    ]
  },
  {
    "id": "S4.1",
    "persona": "Sofia",
    "branchId": "S4",
    "branch": "Applying to college",
    "question": "When is the CSU application due for fall 2027?",
    "insight": "Deadlines may differ by campus and major. Save the official CSU deadline for every selected program, not just a general date.",
    "actionLabel": "Open CSU's current application calendar",
    "sources": [
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      }
    ]
  },
  {
    "id": "S4.2",
    "persona": "Sofia",
    "branchId": "S4",
    "branch": "Applying to college",
    "question": "Is the UC application due the same day?",
    "insight": "For fall 2027, the UC filing window ends November 30, 2026. Other parts of the application may still have later requirements.",
    "actionLabel": "See UC's dated application checklist",
    "sources": [
      {
        "title": "UC application dates and deadlines",
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html"
      }
    ]
  },
  {
    "id": "S4.3",
    "persona": "Sofia",
    "branchId": "S4",
    "branch": "Applying to college",
    "question": "What are A-G requirements and how do I know if I meet them?",
    "insight": "A–G course names do not always match a school's local titles. A counselor can review the student's actual transcript before submission.",
    "actionLabel": "Request an A–G course review",
    "sources": [
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      }
    ]
  },
  {
    "id": "S4.4",
    "persona": "Sofia",
    "branchId": "S4",
    "branch": "Applying to college",
    "question": "Cal State Apply costs $70 per campus. Can I get that waived?",
    "insight": "Cal State Apply evaluates some fee waivers after the application is completed. Eligible applicants may receive waivers for up to four campuses.",
    "actionLabel": "Check automatic fee-waiver eligibility",
    "sources": [
      {
        "title": "CSU application fee waivers",
        "url": "https://www.calstate.edu/apply/paying-for-college/Pages/fee-waiver.aspx"
      }
    ]
  },
  {
    "id": "S4.5",
    "persona": "Sofia",
    "branchId": "S4",
    "branch": "Applying to college",
    "question": "What's EOP and should I apply?",
    "insight": "EOP support and applications can have campus-specific eligibility and deadlines separate from admission.",
    "actionLabel": "Check EOP for each selected CSU",
    "sources": [
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      }
    ]
  },
  {
    "id": "S4.6",
    "persona": "Sofia",
    "branchId": "S4",
    "branch": "Applying to college",
    "question": "Can I apply to community college now or do I wait?",
    "insight": "Community college admission dates and registration priority are not identical. Apply early enough to complete orientation and placement steps.",
    "actionLabel": "Review Ohlone's new-student enrollment steps",
    "sources": [
      {
        "title": "Ohlone College Admissions",
        "url": "https://www.ohlone.edu/admissions"
      }
    ]
  },
  {
    "id": "S4.7",
    "persona": "Sofia",
    "branchId": "S4",
    "branch": "Applying to college",
    "question": "Who can look at my application before I hit submit?",
    "insight": "Ask a counselor to check for missing sections and unsupported claims, not to write personal responses for the student.",
    "actionLabel": "Book an application review",
    "sources": [
      {
        "title": "Ohlone College Admissions",
        "url": "https://www.ohlone.edu/admissions"
      },
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      }
    ]
  },
  {
    "id": "S4.8",
    "persona": "Sofia",
    "branchId": "S4",
    "branch": "Applying to college",
    "question": "Can I do this on my phone?",
    "insight": "Phone applications may be possible but long forms can be difficult on mobile; save progress and use a trusted device to review before submitting.",
    "actionLabel": "Check your submission on a larger screen",
    "sources": [
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      },
      {
        "title": "UC application dates and deadlines",
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html"
      }
    ]
  },
  {
    "id": "S4.9",
    "persona": "Sofia",
    "branchId": "S4",
    "branch": "Applying to college",
    "question": "What happens after I apply? When do I hear back?",
    "insight": "Submitting an application is not the end: watch campus portals, financial-aid tasks and requests for transcripts.",
    "actionLabel": "Make a post-submission portal checklist",
    "sources": [
      {
        "title": "UC application dates and deadlines",
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html"
      },
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      }
    ]
  },
  {
    "id": "S5.1",
    "persona": "Sofia",
    "branchId": "S5",
    "branch": "Trust, privacy and language",
    "question": "Is this information from this year?",
    "insight": "The latest source date is not proof that a program or deadline is still available. Check the official page before acting.",
    "actionLabel": "Open the source and review date",
    "sources": [
      {
        "title": "CSU first-year admission",
        "url": "https://www.calstate.edu/apply/freshman"
      },
      {
        "title": "UC application dates and deadlines",
        "url": "https://admission.universityofcalifornia.edu/how-to-apply/applying-as-a-first-year/dates-and-deadlines.html"
      }
    ]
  },
  {
    "id": "S5.2",
    "persona": "Sofia",
    "branchId": "S5",
    "branch": "Trust, privacy and language",
    "question": "Do you save what I tell you about my family?",
    "insight": "Avoid entering SSNs, exact income, immigration details or private documents into a class prototype. Use official applications for sensitive information.",
    "actionLabel": "Review WhatSack's demo privacy explanation",
    "sources": [
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      }
    ]
  },
  {
    "id": "S5.3",
    "persona": "Sofia",
    "branchId": "S5",
    "branch": "Trust, privacy and language",
    "question": "Can my mom read this in Spanish?",
    "insight": "A Spanish explanation can help a family review choices, but official application requirements still control. Ask for bilingual human assistance when needed.",
    "actionLabel": "Open official family information",
    "sources": [
      {
        "title": "California Student Aid Commission",
        "url": "https://www.csac.ca.gov/"
      },
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      }
    ]
  },
  {
    "id": "S5.4",
    "persona": "Sofia",
    "branchId": "S5",
    "branch": "Trust, privacy and language",
    "question": "Can you just tell me what to do?",
    "insight": "When everything feels urgent, choose one first action and finish it before adding more tasks.",
    "actionLabel": "Pick one task for this week",
    "sources": [
      {
        "title": "Ohlone College Admissions",
        "url": "https://www.ohlone.edu/admissions"
      },
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      }
    ]
  },
  {
    "id": "D0.1",
    "persona": "Daniel",
    "branchId": "D0",
    "branch": "Layoff and first decisions",
    "question": "I just lost my job and want to explore a new career. Are there affordable training programs that could help me find work?",
    "insight": "A layoff creates several tracks at once: benefits, immediate income, job-search support and retraining. Start with the most urgent.",
    "actionLabel": "Choose the first priority: benefits, work or training",
    "sources": [
      {
        "title": "California EDD — unemployment benefits",
        "url": "https://edd.ca.gov/unemployment"
      },
      {
        "title": "California EDD — Rapid Response layoff services",
        "url": "https://edd.ca.gov/en/jobs_and_training/rapid-response-services-for-business/Layoff_Services/"
      }
    ]
  },
  {
    "id": "D0.2",
    "persona": "Daniel",
    "branchId": "D0",
    "branch": "Layoff and first decisions",
    "question": "got laid off friday. what do i do first",
    "insight": "If you were just laid off, keep your separation paperwork and review EDD's instructions for filing an unemployment claim promptly.",
    "actionLabel": "Open the EDD new-claim checklist",
    "sources": [
      {
        "title": "California EDD — unemployment benefits",
        "url": "https://edd.ca.gov/unemployment"
      }
    ]
  },
  {
    "id": "D0.3",
    "persona": "Daniel",
    "branchId": "D0",
    "branch": "Layoff and first decisions",
    "question": "My plant is closing because they're automating. Is there special help for that?",
    "insight": "Plant closures and layoffs may trigger employer Rapid Response help. Ask the employer or local workforce center what services were arranged.",
    "actionLabel": "Find local layoff and Rapid Response services",
    "sources": [
      {
        "title": "California EDD — Rapid Response layoff services",
        "url": "https://edd.ca.gov/en/jobs_and_training/rapid-response-services-for-business/Layoff_Services/"
      },
      {
        "title": "NOVAworks — career seekers",
        "url": "https://novaworks.org/career-seekers/"
      }
    ]
  },
  {
    "id": "D0.4",
    "persona": "Daniel",
    "branchId": "D0",
    "branch": "Layoff and first decisions",
    "question": "I'm 45 with 20 years in manufacturing. Who's going to hire me?",
    "insight": "Long experience can be described in current employer language: equipment troubleshooting, quality assurance, safety and process improvement.",
    "actionLabel": "Translate experience into résumé skills",
    "sources": [
      {
        "title": "CareerOneStop Skills Matcher",
        "url": "https://www.careeronestop.org/toolkit/Skills/skills-matcher.aspx"
      },
      {
        "title": "NOVAworks — career seekers",
        "url": "https://novaworks.org/career-seekers/"
      }
    ]
  },
  {
    "id": "D0.5",
    "persona": "Daniel",
    "branchId": "D0",
    "branch": "Layoff and first decisions",
    "question": "My employer said something about rapid response and a workforce board. What does that mean?",
    "insight": "Rapid Response is a workforce assistance service, not an automatic grant. An AJCC can explain benefits and job-search workshops.",
    "actionLabel": "Find the relevant workforce center",
    "sources": [
      {
        "title": "California EDD — Rapid Response layoff services",
        "url": "https://edd.ca.gov/en/jobs_and_training/rapid-response-services-for-business/Layoff_Services/"
      }
    ]
  },
  {
    "id": "D0.6",
    "persona": "Daniel",
    "branchId": "D0",
    "branch": "Layoff and first decisions",
    "question": "I need money coming in by next month. Training can wait.",
    "insight": "If cash is urgently needed, do not wait for course enrollment to begin applications. Look at job-search help and income support in parallel.",
    "actionLabel": "Open CalJOBS and unemployment guidance",
    "sources": [
      {
        "title": "CalJOBS job search",
        "url": "https://www.caljobs.ca.gov/"
      },
      {
        "title": "California EDD — unemployment benefits",
        "url": "https://edd.ca.gov/unemployment"
      }
    ]
  },
  {
    "id": "D1.1",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "Does Tesla MDP lead to a job offer?",
    "insight": "Ask for the current written offer conditions and how completing training relates to employment. The pathway is not a personal job guarantee.",
    "actionLabel": "Review Tesla's current MDP terms",
    "sources": [
      {
        "title": "Tesla Manufacturing Development Program",
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      }
    ]
  },
  {
    "id": "D1.2",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "Tesla's page says it's for graduating high school seniors and early professionals. Am I even allowed to apply at 45?",
    "insight": "Tesla describes MDP for graduating seniors and early-career individuals; Daniel's age means current cohort eligibility needs confirmation.",
    "actionLabel": "Ask Tesla about mid-career eligibility",
    "sources": [
      {
        "title": "Tesla Manufacturing Development Program",
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      }
    ]
  },
  {
    "id": "D1.3",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "Can I physically do it? I've got a bad back.",
    "insight": "Factory duties can involve prolonged standing, lifting and shifts. Compare posted essential duties with needed accommodations before applying.",
    "actionLabel": "Check duties and accommodation process",
    "sources": [
      {
        "title": "Tesla Manufacturing Development Program",
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      }
    ]
  },
  {
    "id": "D1.4",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "Are they going to make me work nights and weekends?",
    "insight": "Training hours and post-training production shifts may differ. A schedule that works for classes may not work for the resulting job.",
    "actionLabel": "Ask for both training and job shift schedules",
    "sources": [
      {
        "title": "Tesla Manufacturing Development Program",
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      }
    ]
  },
  {
    "id": "D1.5",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "How long is the Tesla program and do they pay me during it?",
    "insight": "Program length, trainee pay and tuition arrangements depend on the specific site and cohort. Avoid using figures from another Tesla location.",
    "actionLabel": "Check the current Fremont posting",
    "sources": [
      {
        "title": "Tesla Manufacturing Development Program",
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      }
    ]
  },
  {
    "id": "D1.6",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "What's a Production Associate actually paid? Is it less than what I made?",
    "insight": "An older salary may not be comparable to a new job's total compensation. Look at current posted pay, benefits and shift differentials.",
    "actionLabel": "Request current compensation and benefits",
    "sources": [
      {
        "title": "Tesla Manufacturing Development Program",
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      },
      {
        "title": "BLS Occupational Outlook Handbook",
        "url": "https://www.bls.gov/ooh/"
      }
    ]
  },
  {
    "id": "D1.7",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "What does SSBA train people to do?",
    "insight": "SSBA is a bridge into semiconductor manufacturing; check which entry-level job duties and certifications the current cohort emphasizes.",
    "actionLabel": "Ask for SSBA curriculum and employer outcomes",
    "sources": [
      {
        "title": "Ohlone Semiconductor Skills Bridge Academy",
        "url": "https://www.ohlone.edu/ssba"
      }
    ]
  },
  {
    "id": "D1.8",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "Does SSBA still give the $1,500 stipend?",
    "insight": "The $1,500 was advertised for certain completion-based SSBA cohorts. Check whether it is funded, when it is paid and whether attendance rules apply.",
    "actionLabel": "Confirm the current stipend in writing",
    "sources": [
      {
        "title": "Ohlone Semiconductor Skills Bridge Academy",
        "url": "https://www.ohlone.edu/ssba"
      }
    ]
  },
  {
    "id": "D1.9",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "Is there a program that gives priority to people who got laid off?",
    "insight": "A laid-off worker may receive priority or separate workforce funding in some programs; do not infer that priority from the course title.",
    "actionLabel": "Ask Ohlone which cohorts prioritize displaced workers",
    "sources": [
      {
        "title": "Ohlone College career education",
        "url": "https://www.ohlone.edu/career-education"
      },
      {
        "title": "NOVAworks — training scholarship process",
        "url": "https://novaworks.org/career-seekers/training/"
      }
    ]
  },
  {
    "id": "D1.10",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "Will I be the oldest person in the class?",
    "insight": "Age mix varies by cohort. Ask about instructional pace, prior-experience credit and adult learner support rather than guessing.",
    "actionLabel": "Ask for a program adviser conversation",
    "sources": [
      {
        "title": "Ohlone Semiconductor Skills Bridge Academy",
        "url": "https://www.ohlone.edu/ssba"
      },
      {
        "title": "Tesla Manufacturing Development Program",
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      }
    ]
  },
  {
    "id": "D1.11",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "Compare Tesla MDP and SSBA.",
    "insight": "Compare not only stipend or employment pathway, but eligibility, required hours, physical demands, costs and transferability.",
    "actionLabel": "Open the two-program comparison",
    "sources": [
      {
        "title": "Tesla Manufacturing Development Program",
        "url": "https://www.tesla.com/careers/manufacturing-development-program"
      },
      {
        "title": "Ohlone Semiconductor Skills Bridge Academy",
        "url": "https://www.ohlone.edu/ssba"
      }
    ]
  },
  {
    "id": "D1.12",
    "persona": "Daniel",
    "branchId": "D1",
    "branch": "Employer-connected training: Tesla MDP, SSBA",
    "question": "Is semiconductor work steady or will it get cut too?",
    "insight": "Industry investment does not guarantee any one worker a stable job. Compare duties, occupational outlook and employers hiring in the area.",
    "actionLabel": "Review semiconductor-related job outlook",
    "sources": [
      {
        "title": "BLS Occupational Outlook Handbook",
        "url": "https://www.bls.gov/ooh/"
      },
      {
        "title": "CalJOBS job search",
        "url": "https://www.caljobs.ca.gov/"
      }
    ]
  },
  {
    "id": "D2.1",
    "persona": "Daniel",
    "branchId": "D2",
    "branch": "Affordable certificates and adult learning",
    "question": "What's the fastest certificate that gets me back to work?",
    "insight": "Shortest is not always most useful: verify whether the certificate matches actual job-posting requirements and available employment support.",
    "actionLabel": "Compare certificate outcomes with job descriptions",
    "sources": [
      {
        "title": "EDD — eligible training programs",
        "url": "https://edd.ca.gov/TrainingPrograms"
      },
      {
        "title": "CalJOBS job search",
        "url": "https://www.caljobs.ca.gov/"
      }
    ]
  },
  {
    "id": "D2.2",
    "persona": "Daniel",
    "branchId": "D2",
    "branch": "Affordable certificates and adult learning",
    "question": "Can I get a forklift or CDL certification quickly around here?",
    "insight": "Forklift, CDL and other credentials differ in training cost, licensing, age and health requirements. Check approved providers before paying.",
    "actionLabel": "Find legitimate local training providers",
    "sources": [
      {
        "title": "EDD — eligible training programs",
        "url": "https://edd.ca.gov/TrainingPrograms"
      },
      {
        "title": "NOVAworks — career seekers",
        "url": "https://novaworks.org/career-seekers/"
      }
    ]
  },
  {
    "id": "D2.3",
    "persona": "Daniel",
    "branchId": "D2",
    "branch": "Affordable certificates and adult learning",
    "question": "Is there an 8-week program I could get a Pell Grant for? I heard that changed.",
    "insight": "Workforce Pell became possible for approved short workforce programs, not every eight-week course. Ask whether a specific program is approved.",
    "actionLabel": "Ask whether the program has Workforce Pell approval",
    "sources": [
      {
        "title": "Federal Student Aid — Workforce Pell implementation",
        "url": "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-06-04/effective-dates-workforce-pell-and-federal-pell-grant-ineligibility-provisions"
      },
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      }
    ]
  },
  {
    "id": "D2.4",
    "persona": "Daniel",
    "branchId": "D2",
    "branch": "Affordable certificates and adult learning",
    "question": "I never finished college. Can I still enroll at Ohlone?",
    "insight": "Adults can explore many community-college courses without a completed degree; prerequisites and certificate admissions may differ.",
    "actionLabel": "Check Ohlone adult applicant requirements",
    "sources": [
      {
        "title": "Ohlone College Admissions",
        "url": "https://www.ohlone.edu/admissions"
      }
    ]
  },
  {
    "id": "D2.5",
    "persona": "Daniel",
    "branchId": "D2",
    "branch": "Affordable certificates and adult learning",
    "question": "Do I need to take placement tests or math again?",
    "insight": "Placement and skills-support practices vary. Previous work experience can inform a counselor conversation about math or digital refresher courses.",
    "actionLabel": "Ask for placement and refresher options",
    "sources": [
      {
        "title": "Ohlone College Admissions",
        "url": "https://www.ohlone.edu/admissions"
      }
    ]
  },
  {
    "id": "D2.6",
    "persona": "Daniel",
    "branchId": "D2",
    "branch": "Affordable certificates and adult learning",
    "question": "Can I do classes online at night while my kid is at school?",
    "insight": "An online listing is not proof the certificate is self-paced or available at night. Match class meetings to childcare and employment plans.",
    "actionLabel": "Verify real weekly hours before enrolling",
    "sources": [
      {
        "title": "EDD — eligible training programs",
        "url": "https://edd.ca.gov/TrainingPrograms"
      },
      {
        "title": "Ohlone College career education",
        "url": "https://www.ohlone.edu/career-education"
      }
    ]
  },
  {
    "id": "D2.7",
    "persona": "Daniel",
    "branchId": "D2",
    "branch": "Affordable certificates and adult learning",
    "question": "Do I need to know AI or computers for these jobs now?",
    "insight": "Many jobs require ordinary workplace software skills, not advanced AI expertise. Start from the digital tasks in actual listings.",
    "actionLabel": "Identify two basic skills from job listings",
    "sources": [
      {
        "title": "CareerOneStop Skills Matcher",
        "url": "https://www.careeronestop.org/toolkit/Skills/skills-matcher.aspx"
      },
      {
        "title": "CalJOBS job search",
        "url": "https://www.caljobs.ca.gov/"
      }
    ]
  },
  {
    "id": "D3.1",
    "persona": "Daniel",
    "branchId": "D3",
    "branch": "Funding, EDD benefits and stipends",
    "question": "How much is unemployment and how long does it last?",
    "insight": "EDD calculates benefit eligibility from a claim; an advertised maximum is not a personal estimate. Compare household expenses with the official award notice.",
    "actionLabel": "Open EDD benefit and claim information",
    "sources": [
      {
        "title": "California EDD — unemployment benefits",
        "url": "https://edd.ca.gov/unemployment"
      }
    ]
  },
  {
    "id": "D3.2",
    "persona": "Daniel",
    "branchId": "D3",
    "branch": "Funding, EDD benefits and stipends",
    "question": "Can I keep unemployment while training?",
    "insight": "CTB approval can change work-search rules, but it is separate from a tuition grant and must be decided by EDD.",
    "actionLabel": "Check CTB eligibility before enrolling",
    "sources": [
      {
        "title": "California EDD — training benefits",
        "url": "https://edd.ca.gov/ctb"
      }
    ]
  },
  {
    "id": "D3.3",
    "persona": "Daniel",
    "branchId": "D3",
    "branch": "Funding, EDD benefits and stipends",
    "question": "If I'm in school do I still have to apply for jobs every week?",
    "insight": "People approved for CTB may be exempt from job search, while other trainees must follow normal UI rules. Continue certifying as EDD requires.",
    "actionLabel": "Read the CTB reporting rules",
    "sources": [
      {
        "title": "California EDD — training benefits",
        "url": "https://edd.ca.gov/ctb"
      }
    ]
  },
  {
    "id": "D3.4",
    "persona": "Daniel",
    "branchId": "D3",
    "branch": "Funding, EDD benefits and stipends",
    "question": "Is there a deadline to tell EDD I'm going to school?",
    "insight": "Contact EDD before the 16th week of benefit payments to preserve possible training-extension eligibility—or sooner if the claim exhausts earlier.",
    "actionLabel": "Contact EDD about a training extension",
    "sources": [
      {
        "title": "California EDD — training extension",
        "url": "https://edd.ca.gov/en/unemployment/qualifying_for_a_training_extension/"
      }
    ]
  },
  {
    "id": "D3.5",
    "persona": "Daniel",
    "branchId": "D3",
    "branch": "Funding, EDD benefits and stipends",
    "question": "Does WIOA pay tuition, or is it a loan?",
    "insight": "WIOA is potential training assistance, not a student loan or universal voucher. The workforce center decides eligibility and funding.",
    "actionLabel": "Ask an adviser to review WIOA funding",
    "sources": [
      {
        "title": "NOVAworks — training scholarship process",
        "url": "https://novaworks.org/career-seekers/training/"
      },
      {
        "title": "EDD — eligible training programs",
        "url": "https://edd.ca.gov/TrainingPrograms"
      }
    ]
  },
  {
    "id": "D3.6",
    "persona": "Daniel",
    "branchId": "D3",
    "branch": "Funding, EDD benefits and stipends",
    "question": "How do I know a program is approved so my funding counts?",
    "insight": "A program's presence on ETPL does not automatically make its tuition payable by Daniel's local workforce center.",
    "actionLabel": "Check the school and specific program with an adviser",
    "sources": [
      {
        "title": "EDD — eligible training programs",
        "url": "https://edd.ca.gov/TrainingPrograms"
      },
      {
        "title": "NOVAworks — training scholarship process",
        "url": "https://novaworks.org/career-seekers/training/"
      }
    ]
  },
  {
    "id": "D3.7",
    "persona": "Daniel",
    "branchId": "D3",
    "branch": "Funding, EDD benefits and stipends",
    "question": "What's the difference between a grant, a stipend, and a benefit?",
    "insight": "Grant money, stipends and unemployment benefits serve different purposes and have different approval and reporting rules.",
    "actionLabel": "Compare what each payment covers",
    "sources": [
      {
        "title": "California EDD — training benefits",
        "url": "https://edd.ca.gov/ctb"
      },
      {
        "title": "Ohlone Semiconductor Skills Bridge Academy",
        "url": "https://www.ohlone.edu/ssba"
      },
      {
        "title": "NOVAworks — training scholarship process",
        "url": "https://novaworks.org/career-seekers/training/"
      }
    ]
  },
  {
    "id": "D3.8",
    "persona": "Daniel",
    "branchId": "D3",
    "branch": "Funding, EDD benefits and stipends",
    "question": "Can I get a Pell Grant at 45 for a short program?",
    "insight": "Adult Pell eligibility depends on the person and an eligible training program. Short duration alone does not qualify a course.",
    "actionLabel": "Check the program's Pell eligibility",
    "sources": [
      {
        "title": "Federal Student Aid — Workforce Pell implementation",
        "url": "https://fsapartners.ed.gov/knowledge-center/library/electronic-announcements/2026-06-04/effective-dates-workforce-pell-and-federal-pell-grant-ineligibility-provisions"
      },
      {
        "title": "Federal Student Aid — FAFSA",
        "url": "https://studentaid.gov/"
      }
    ]
  },
  {
    "id": "D3.9",
    "persona": "Daniel",
    "branchId": "D3",
    "branch": "Funding, EDD benefits and stipends",
    "question": "If I take a part-time job, do I lose my benefits?",
    "insight": "Part-time earnings must be reported according to EDD rules; an automated estimate of benefit reductions could be wrong.",
    "actionLabel": "Ask EDD how to report wages",
    "sources": [
      {
        "title": "California EDD — unemployment benefits",
        "url": "https://edd.ca.gov/unemployment"
      }
    ]
  },
  {
    "id": "D4.1",
    "persona": "Daniel",
    "branchId": "D4",
    "branch": "Career transition and skills",
    "question": "What jobs could I pursue with manufacturing experience?",
    "insight": "Use job listings to name transferable duties—machine operations, quality control, troubleshooting—before paying for a new certificate.",
    "actionLabel": "Match your prior tasks to two occupations",
    "sources": [
      {
        "title": "CareerOneStop Skills Matcher",
        "url": "https://www.careeronestop.org/toolkit/Skills/skills-matcher.aspx"
      },
      {
        "title": "BLS Occupational Outlook Handbook",
        "url": "https://www.bls.gov/ooh/"
      }
    ]
  },
  {
    "id": "D4.2",
    "persona": "Daniel",
    "branchId": "D4",
    "branch": "Career transition and skills",
    "question": "What are my skills even called? I ran a line, fixed jams, did quality checks.",
    "insight": "Describe accomplishments using specific tasks or improvements, even without recent formal education. Employers need to see skill evidence.",
    "actionLabel": "Draft three skills-based résumé bullets",
    "sources": [
      {
        "title": "CareerOneStop Skills Matcher",
        "url": "https://www.careeronestop.org/toolkit/Skills/skills-matcher.aspx"
      },
      {
        "title": "EDD — returning to work and job search",
        "url": "https://edd.ca.gov/returnwork"
      }
    ]
  },
  {
    "id": "D4.3",
    "persona": "Daniel",
    "branchId": "D4",
    "branch": "Career transition and skills",
    "question": "Which of these jobs won't get automated in five years?",
    "insight": "No reliable source can guarantee a job will resist automation. Focus on transferable skills, safety and troubleshooting that apply across employers.",
    "actionLabel": "Compare realistic occupation outlooks",
    "sources": [
      {
        "title": "BLS Occupational Outlook Handbook",
        "url": "https://www.bls.gov/ooh/"
      }
    ]
  },
  {
    "id": "D4.4",
    "persona": "Daniel",
    "branchId": "D4",
    "branch": "Career transition and skills",
    "question": "Is it realistic to switch into IT at my age?",
    "insight": "A move into IT may require a portfolio or practical fundamentals alongside a certificate. Check entry-level job requirements first.",
    "actionLabel": "Compare entry-level IT listings and training",
    "sources": [
      {
        "title": "CalJOBS job search",
        "url": "https://www.caljobs.ca.gov/"
      },
      {
        "title": "CareerOneStop Skills Matcher",
        "url": "https://www.careeronestop.org/toolkit/Skills/skills-matcher.aspx"
      }
    ]
  },
  {
    "id": "D4.5",
    "persona": "Daniel",
    "branchId": "D4",
    "branch": "Career transition and skills",
    "question": "Should I just take a warehouse job for now and train later?",
    "insight": "A temporary job may stabilize income while you research retraining, but report new earnings to EDD and consider schedule conflicts.",
    "actionLabel": "Review benefits reporting before accepting work",
    "sources": [
      {
        "title": "California EDD — unemployment benefits",
        "url": "https://edd.ca.gov/unemployment"
      }
    ]
  },
  {
    "id": "D4.6",
    "persona": "Daniel",
    "branchId": "D4",
    "branch": "Career transition and skills",
    "question": "How do I explain the layoff in an interview?",
    "insight": "A short factual description of a layoff is enough for many interviews; then redirect to skills and what the applicant can contribute.",
    "actionLabel": "Practice a 20-second layoff explanation",
    "sources": [
      {
        "title": "EDD — returning to work and job search",
        "url": "https://edd.ca.gov/returnwork"
      },
      {
        "title": "NOVAworks — career seekers",
        "url": "https://novaworks.org/career-seekers/"
      }
    ]
  },
  {
    "id": "D4.7",
    "persona": "Daniel",
    "branchId": "D4",
    "branch": "Career transition and skills",
    "question": "Do employers really discriminate by age, and what can I do about it?",
    "insight": "If you suspect age discrimination, document what occurred and ask an appropriate employment-rights professional; do not treat every rejection as proof.",
    "actionLabel": "Review workplace discrimination help options",
    "sources": [
      {
        "title": "EDD — returning to work and job search",
        "url": "https://edd.ca.gov/returnwork"
      }
    ]
  },
  {
    "id": "D5.1",
    "persona": "Daniel",
    "branchId": "D5",
    "branch": "Immediate job search",
    "question": "I need a job right away. Where can I get résumé help?",
    "insight": "Workforce centers may provide no-cost résumé help and job-search workshops before training begins.",
    "actionLabel": "Look for a résumé workshop this week",
    "sources": [
      {
        "title": "NOVAworks — career seekers",
        "url": "https://novaworks.org/career-seekers/"
      },
      {
        "title": "EDD — returning to work and job search",
        "url": "https://edd.ca.gov/returnwork"
      }
    ]
  },
  {
    "id": "D5.2",
    "persona": "Daniel",
    "branchId": "D5",
    "branch": "Immediate job search",
    "question": "Where is the closest workforce center to Milpitas?",
    "insight": "The nearest center is not necessarily the right funding jurisdiction; verify which workforce area serves your residence.",
    "actionLabel": "Find a center that serves your area",
    "sources": [
      {
        "title": "NOVAworks — career seekers",
        "url": "https://novaworks.org/career-seekers/"
      },
      {
        "title": "Alameda County workforce services",
        "url": "https://acwdb.org/job-seekers/"
      }
    ]
  },
  {
    "id": "D5.3",
    "persona": "Daniel",
    "branchId": "D5",
    "branch": "Immediate job search",
    "question": "Is NOVAworks free?",
    "insight": "General career counseling may be free, but funded training is limited and subject to review.",
    "actionLabel": "Check no-cost career services separately",
    "sources": [
      {
        "title": "NOVAworks — career seekers",
        "url": "https://novaworks.org/career-seekers/"
      },
      {
        "title": "NOVAworks — training scholarship process",
        "url": "https://novaworks.org/career-seekers/training/"
      }
    ]
  },
  {
    "id": "D5.4",
    "persona": "Daniel",
    "branchId": "D5",
    "branch": "Immediate job search",
    "question": "What's CalJOBS and do I have to use it?",
    "insight": "CalJOBS supports job search and workforce services; EDD may have registration and work-search instructions specific to a claim.",
    "actionLabel": "Review CalJOBS and claim instructions",
    "sources": [
      {
        "title": "CalJOBS job search",
        "url": "https://www.caljobs.ca.gov/"
      },
      {
        "title": "California EDD — unemployment benefits",
        "url": "https://edd.ca.gov/unemployment"
      }
    ]
  },
  {
    "id": "D5.5",
    "persona": "Daniel",
    "branchId": "D5",
    "branch": "Immediate job search",
    "question": "Can someone help me build a LinkedIn? I've never had one.",
    "insight": "A short profile with past roles and two concrete manufacturing skills is enough to begin networking; a professional can help polish it.",
    "actionLabel": "Draft a basic LinkedIn headline",
    "sources": [
      {
        "title": "EDD — returning to work and job search",
        "url": "https://edd.ca.gov/returnwork"
      },
      {
        "title": "NOVAworks — career seekers",
        "url": "https://novaworks.org/career-seekers/"
      }
    ]
  },
  {
    "id": "D5.6",
    "persona": "Daniel",
    "branchId": "D5",
    "branch": "Immediate job search",
    "question": "Are there manufacturing jobs hiring right now in Fremont or San Jose?",
    "insight": "Job postings change quickly. Do not treat an unverified listing or old salary as a current opportunity.",
    "actionLabel": "Open today's CalJOBS manufacturing search",
    "sources": [
      {
        "title": "CalJOBS job search",
        "url": "https://www.caljobs.ca.gov/"
      }
    ]
  },
  {
    "id": "D5.7",
    "persona": "Daniel",
    "branchId": "D5",
    "branch": "Immediate job search",
    "question": "Can I train and job search at the same time without losing benefits?",
    "insight": "Training and job search can overlap, but CTB approval determines whether work-search requirements change.",
    "actionLabel": "Review EDD rules for training plus job search",
    "sources": [
      {
        "title": "California EDD — training benefits",
        "url": "https://edd.ca.gov/ctb"
      }
    ]
  },
  {
    "id": "D6.1",
    "persona": "Daniel",
    "branchId": "D6",
    "branch": "Household and Maria pathway",
    "question": "Can my family get food assistance while I'm unemployed?",
    "insight": "Unemployment may change household eligibility, but a CalFresh application is decided from household circumstances by the county.",
    "actionLabel": "Open official CalFresh eligibility information",
    "sources": [
      {
        "title": "California CDSS — CalFresh",
        "url": "https://www.cdss.ca.gov/calfresh"
      }
    ]
  },
  {
    "id": "D6.2",
    "persona": "Daniel",
    "branchId": "D6",
    "branch": "Household and Maria pathway",
    "question": "I'm 45 and I don't have little kids at home. I heard CalFresh has new work rules. Do they apply to me?",
    "insight": "CalFresh work rules can apply to some adults ages 18–64, with important exemptions. Sofia is 17, not automatically a child under 14 for this rule.",
    "actionLabel": "Check exemptions with the county, not the demo",
    "sources": [
      {
        "title": "California CDSS — CalFresh work requirements",
        "url": "https://www.cdss.ca.gov/inforesources/calfresh/abawd"
      }
    ]
  },
  {
    "id": "D6.3",
    "persona": "Daniel",
    "branchId": "D6",
    "branch": "Household and Maria pathway",
    "question": "If I'm in a training program, does that count toward the CalFresh hours?",
    "insight": "Training may count toward some CalFresh work requirements if it meets the rule; hours, program type and exemptions must be checked by the county.",
    "actionLabel": "Ask whether this training meets CalFresh requirements",
    "sources": [
      {
        "title": "California CDSS — CalFresh work requirements",
        "url": "https://www.cdss.ca.gov/inforesources/calfresh/abawd"
      }
    ]
  },
  {
    "id": "D6.4",
    "persona": "Daniel",
    "branchId": "D6",
    "branch": "Household and Maria pathway",
    "question": "Does unemployment count as income for CalFresh?",
    "insight": "Unemployment benefits are generally considered in benefit screening. Do not enter exact award amounts into the demo.",
    "actionLabel": "Ask the county how UI income is counted",
    "sources": [
      {
        "title": "California CDSS — CalFresh",
        "url": "https://www.cdss.ca.gov/calfresh"
      }
    ]
  },
  {
    "id": "D6.5",
    "persona": "Daniel",
    "branchId": "D6",
    "branch": "Household and Maria pathway",
    "question": "Can I keep my health insurance?",
    "insight": "Losing employer insurance may trigger a special enrollment opportunity. Timing matters if coverage is ending soon.",
    "actionLabel": "Check health coverage enrollment timelines",
    "sources": [
      {
        "title": "Covered California — qualifying life events",
        "url": "https://www.coveredca.com/support/before-you-buy/qualifying-life-events/"
      }
    ]
  },
  {
    "id": "D6.6",
    "persona": "Daniel",
    "branchId": "D6",
    "branch": "Household and Maria pathway",
    "question": "My wife still works. Does that disqualify us?",
    "insight": "A working spouse does not automatically rule a family in or out. Eligibility depends on household details and current rules.",
    "actionLabel": "Use an official benefits eligibility check",
    "sources": [
      {
        "title": "California CDSS — CalFresh",
        "url": "https://www.cdss.ca.gov/calfresh"
      }
    ]
  },
  {
    "id": "D7.1",
    "persona": "Daniel",
    "branchId": "D7",
    "branch": "Trust, privacy and access",
    "question": "Is this a government site? Who runs this?",
    "insight": "WhatSack is a student-created demonstration, not an EDD or government portal. Links should identify the real agency and what is simulated.",
    "actionLabel": "Show project identity and official source",
    "sources": [
      {
        "title": "California EDD — unemployment benefits",
        "url": "https://edd.ca.gov/unemployment"
      }
    ]
  },
  {
    "id": "D7.2",
    "persona": "Daniel",
    "branchId": "D7",
    "branch": "Trust, privacy and access",
    "question": "Are you going to report what I say to EDD?",
    "insight": "Do not enter claim numbers, SSNs, immigration information or detailed household finances here. Use EDD directly for benefits questions.",
    "actionLabel": "Open the official EDD portal",
    "sources": [
      {
        "title": "California EDD — unemployment benefits",
        "url": "https://edd.ca.gov/unemployment"
      }
    ]
  },
  {
    "id": "D7.3",
    "persona": "Daniel",
    "branchId": "D7",
    "branch": "Trust, privacy and access",
    "question": "Can I talk to a real person?",
    "insight": "For high-stakes eligibility or time-sensitive questions, a real workforce adviser is the appropriate next step.",
    "actionLabel": "Find a human workforce contact",
    "sources": [
      {
        "title": "NOVAworks — career seekers",
        "url": "https://novaworks.org/career-seekers/"
      },
      {
        "title": "Alameda County workforce services",
        "url": "https://acwdb.org/job-seekers/"
      }
    ]
  },
  {
    "id": "D7.4",
    "persona": "Daniel",
    "branchId": "D7",
    "branch": "Trust, privacy and access",
    "question": "Is this in Spanish? My wife handles the paperwork.",
    "insight": "Offer Spanish-language summaries where available, but check the official Spanish-language application and request an interpreter if needed.",
    "actionLabel": "Request language assistance from the provider",
    "sources": [
      {
        "title": "California EDD — unemployment benefits",
        "url": "https://edd.ca.gov/unemployment"
      },
      {
        "title": "California CDSS — CalFresh",
        "url": "https://www.cdss.ca.gov/calfresh"
      }
    ]
  },
  {
    "id": "D7.5",
    "persona": "Daniel",
    "branchId": "D7",
    "branch": "Trust, privacy and access",
    "question": "Can I print this or text it to myself?",
    "insight": "A printable summary can help, but it should omit private information and display the date and source for each program.",
    "actionLabel": "Copy a privacy-safe action checklist",
    "sources": [
      {
        "title": "NOVAworks — career seekers",
        "url": "https://novaworks.org/career-seekers/"
      },
      {
        "title": "Ohlone Semiconductor Skills Bridge Academy",
        "url": "https://www.ohlone.edu/ssba"
      }
    ]
  }
];

export const nextStepById: Readonly<Record<string, NextStepInsightEntry>> =
  Object.fromEntries(nextStepInsightEntries.map(entry => [entry.id, entry]));

export function getNextStepInsight(id: string): NextStepInsightEntry | undefined {
  return nextStepById[id];
}
