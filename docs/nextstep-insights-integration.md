# WhatSack — Research-informed NextStep Insights

## Scope and research source

Source: WhatSack_103_NextStep_Insights.csv, companion to the team's Sofia and Daniel in-character questions and research-backed answers compiled in October 2026.

- 103 question-specific insights: 44 Sofia and 59 Daniel
- Every entry has a question, a "Things to Keep in Mind" insight, suggested action and one or more official starting links (163 source links total)
- Static, scripted content: no LLM, API key, paid service or live resource lookup is required
- Live eligibility, dates, training seats and benefits must be checked directly with each provider

## Where it appears

1. Sofia guided college search: maps answers about schools, financial aid, transfer, location and applying to up to three actionable, research-linked insights.
2. Daniel guided career search: employer training (Tesla MDP/SSBA), affordable training, funding/EDD, career interests, immediate job search and optional family food support.
3. WhatSack Copilot: a scripted question matcher attaches a relevant insight to the response. Collapsible "Try Sofia's researched questions" and "Try Daniel's researched questions" menus expose all 103 questions for demos.
4. Browser extension simulation: matching topic-specific insights for EDD, college aid and CalFresh appear below the mocked webpage.
5. Shared NextStepInsightCard: the research insight, action, sources, caution about data age and safe copy-checklist interaction.

## Key code

- src/data/nextStepInsights.ts — 103 imported records
- src/data/nextStepInsightsRouting.ts — exact and conservative phrase matching, guided-choice routing
- src/components/NextStepInsightCard.tsx — shared accessible card and source buttons
- src/components/SofiaCollegeGuide.tsx — Sofia guided integration
- src/components/DanielTrainingGuide.tsx — Daniel guided integration and immediate-work branch
- src/components/AILLMConsole.tsx — scripted Copilot integration, without API calls
- src/components/SimulatedExtensionSidebar.tsx — extension integration and safer benefit wording
- scripts/verify-nextstep.mjs — offline validation script

## Safety and interpretation

Tesla MDP describes an employment pathway under program conditions, but no offer or eligibility is guaranteed; Daniel must ask about mid-career applicants. Ohlone SSBA has previously advertised a $1,500 completion stipend, but current cohorts and conditions must be confirmed. WIOA support depends on assessment, program approval and funding. California Training Benefits (CTB) may allow unemployment benefits during qualifying training but does not pay tuition. CalFresh and FAFSA/CADAA decisions require provider review. Do not collect immigration status, Social Security numbers, precise household financial details or private documents in the demo.

This is not a live AI agent or real-time verification system. Links open official starting pages, not completed appointments or applications.

## Testing in VS Code (no API or network calls by the prototype)

Check and preserve local changes with git status before switching branches. On the branch feature/sofia-guided-college-search-20261025, run:

    git pull --ff-only
    npm run verify:insights
    npm run build
    npm run dev

If dependencies are not installed locally, run npm install first. Open the localhost address printed by Vite.

### Manual demonstration checks

- Sofia "Is Ohlone actually free? Like zero dollars?" — S1.1 total cost
- Sofia "My dad's hours got cut this year. The FAFSA uses 2025 taxes, so does that even count?" — S2.6 income change
- Sofia "My parents don't have Social Security numbers. Is it safe for me to do the FAFSA?" — S2.3 contributor guidance
- Sofia "What happens after I apply? When do I hear back?" — S4.9 post-application checklist
- Daniel "Does Tesla MDP lead to a job offer?" — D1.1 employment terms
- Daniel "Can a 45-year-old apply for Tesla MDP?" — D1.2 mid-career eligibility
- Daniel "Does SSBA still give the $1,500 stipend?" — D1.8 written stipend confirmation
- Daniel "Can I keep unemployment while training?" — D3.2 CTB guidance
- Daniel "I need a job right away. Where can I get résumé help?" — D5.1 workshops
- Daniel "Can I talk to a real person?" — D7.3 workforce adviser
- Extension: EDD/CTB, college financial aid, and CalFresh pathways.
- Try every Sofia and Daniel guided branch, Skip, Back, source buttons, and the privacy-safe copy interaction.

## Known limitations

Research was compiled in October 2026, so current details are not automatically verified. Matching supports all 103 original questions and selected paraphrases, not unrestricted free-form LLM understanding. The new research insight copy is English-first although the existing interface includes Spanish elements. Full TypeScript build and browser regression tests still need to be run on the user's Mac before merging.