# Sofia Delgado — Guided College Search Prototype

This feature adds an optional, click-through education guidance demonstration to the **original WhatSack homepage**.

## Open the prototype
1. Start the **repository root** development server with `npm install` (if needed), then `npm run dev`.
2. Open the URL displayed by Vite (usually http://localhost:5173).
3. On the homepage, select **Start guided college search**.

## Demonstration pathways
- Find affordable colleges: location → pathway → interests → reviewed starting points.
- Understand financial aid: aid topic → optional family-income change → starting points and NextStep Insights.
- Compare pathways: route to compare → living arrangements → bachelor's-degree goal.
- Learn how to apply: intended starting term → institution type → requested application help.

Questions may be skipped; Back lets you change the last choice; **Explore another pathway** starts a different branch. The existing search, Copilot, four resource categories, intake form, and other modals are not replaced.

## Important limitations
- **Scripted interactive academic demonstration**, not a live generative model or connected knowledge-base search.
- The supplied links are official starting points; current dates, fees, eligibility, availability, and institution-specific details must be checked at their source.
- The new guided interface is in English at this stage. The existing application's Spanish option is unaffected.
- Answers are kept only in React component state; they are not saved to a database or sent to a server.

## Suggested test cases
1. Sofia: Affordable colleges → Near Fremont → Community college → I'm still exploring.
2. Sofia: Financial aid → FAFSA/CADAA → Yes, someone lost a job. Verify the special-circumstances explanation appears.
3. Sofia: Compare pathways → Community college transfer → Live at home → Yes to bachelor's.
4. Sofia: Apply → Fall 2027 → CSU → Application deadlines.
5. Use **Skip**, **Back**, **Explore another pathway**, and the X close control.
6. Confirm the original intake form, search filters, category cards, and Copilot still open.

## Development
Source: `src/components/SofiaCollegeGuide.tsx`
Integration: `src/App.tsx`

After local dependencies are available, run:
```bash
npm run build
npm run dev
```

Record actual test outcomes in the team log and correct the implementation before a class demonstration.
