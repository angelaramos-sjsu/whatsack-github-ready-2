# Daniel Delgado — Ohlone Tesla MDP + SSBA simulated journey

This is a scripted academic demonstration, not a live LLM or currently verified eligibility checker.

## Where to open it
- On the ORIGINAL WhatSack homepage, select **Start guided career search**.
- Answer questions in any of five branches: employer-connected training, affordable training, paying for training, new career, or household support.
- At the end, view source-linked Tesla MDP and/or SSBA result cards, official starting links, and NextStep Insights.
- Choose **Ask the Copilot about these results** to place an assembled Daniel context question into the chat. Click **Send** to trigger a scripted demonstration reply.
- The **Education & Workforce** resource category also shows two new source-linked cards:
  - Tesla MDP: res-work-mdp
  - Semiconductor Skills Bridge Academy: res-work-ssba
- Existing Sofia and other areas remain.

## Facts and careful qualification
- **Tesla Manufacturing Development Program:** Tesla describes coursework, on-the-job preparation, and a potential full-time paid Production Associate transition after successful completion. Ohlone has described full-time offers in relevant MDP cohorts. Do not promise employment for every applicant. Tesla currently describes its audience as graduating high-school seniors and early-career individuals; Daniel is 45, and his eligibility must be checked directly.
- **Semiconductor Skills Bridge Academy:** Smart-manufacturing and semiconductor preparation with industry exposure and job readiness. Documented cohorts advertised a **$1,500 stipend on successful completion**. Confirm whether current cohorts offer the same stipend, eligibility rules and when payment is made. **No job guarantee.**
- **WIOA:** Funding depends on eligibility, assessment, approved training and funds available. Do not promise a specific voucher or 100% fee coverage.
- **California Training Benefits:** An unemployment-related program, not funding for tuition and books. EDD decides training eligibility and reporting requirements.
- **Maria connection:** Food-assistance exploration is optional and separate from Daniel's workforce questions. Do not assume CalFresh eligibility or collect personal information.

## Tested source starting points
- https://www.tesla.com/careers/manufacturing-development-program
- https://www.tesla.com/careers/search/job/manufacturing-development-program-270081
- https://www.ohlone.edu/tesla-mdp
- https://www.ohlone.edu/ssba
- https://www.fremont.gov/government/departments/human-services/human-services-in-the-community/sparkpoint/workforce-training-resources
- https://edd.ca.gov/CTB/
- https://edd.ca.gov/TrainingPrograms
- https://novaworks.org/career-seekers/
- https://acwdb.org/job-seekers/

The program-specific Ohlone landing pages may restrict automated crawlers. Verify these links manually in a normal browser before the group presentation.

## Sample test cases

1. Daniel guide → **Find training connected to employers** → **Compare both** → any schedule → **All of the above** → check BOTH Tesla and SSBA cards, disclaimers, and official links.
2. Guide → **Find help paying for training** → **Yes** receiving EDD → **Training with a stipend** → **SSBA** → check distinction between stipend, workforce grants and benefits.
3. Guide → **Find support for household** → **Yes** → inspect optional links to Maria’s food area without any automatic eligibility claims.
4. Copilot → **I just lost my manufacturing job. Are there affordable training options?** → **Compare Tesla MDP and SSBA** → **Can a 45-year-old apply for Tesla MDP?** → **Does SSBA still have the $1,500 stipend?**.
5. Copilot → **Will my unemployment benefits continue if I attend training?** → check EDD California Training Benefits reference and no unconditional promises.
6. Homepage category **Education & Workforce** → ensure two new cards appear; open **Official program information** and **NextStep Insights** for each.
7. Regression: Sofia guided college search, original intake form, search filters, food, mental-health, community, and extension remain accessible.
8. Run npm install, npm run build, npm run dev in VS Code. Confirm the site renders in the browser. Full local build/browser verification has not been completed by ChatGPT.

## Relevant source code
- src/components/DanielTrainingGuide.tsx — optional step-by-step branching dialogue
- src/data/danielAssistant.ts — scripted Daniel FAQ responses and official links
- src/data/resources.ts — two new workforce demo records
- src/data/personas.ts — preserves Daniel at 45 and rewrites unsupported grant guarantees
- src/components/AILLMConsole.tsx — Daniel script routing before Sofia context routing
- src/App.tsx — new Daniel launch and Copilot handoff
- src/components/ResourceCard.tsx and src/components/NextStepInsightsModal.tsx — official source buttons and no artificial confidence percentage for these two records

## Note on language and completeness
The new Daniel step-by-step modal is English-first; the core workforce records include Spanish labels/descriptions. A fully translated guided experience and comprehensive resource-validation system are not yet implemented. Other preexisting demo data may still contain simulated details and requires team vetting.
