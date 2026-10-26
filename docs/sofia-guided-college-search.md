# Sofia Delgado: guided college search and conversational Copilot

This academic prototype is integrated into the **original WhatSack** project (repository root, not the nested whatsack-refresh demo).

## Features

1. On the original homepage, click **Start guided college search**.
2. Choose one of four branches: affordable colleges, financial aid, comparing pathways, or applying.
3. Answer or skip optional questions. Use Back to revise.
4. Review official starting points and NextStep Insights.
5. Click **Ask the Copilot about these results** to open the conversational interface with a prepared question containing the selected topic and preferences.
6. Press **Send** in the Copilot. Questions about college, grants, FAFSA/CADAA, scholarship, transfer, applications, changes in family income, or college counselors receive context-aware responses and suggested follow-ups.

The existing food, mental-health, workforce, and community prototype components remain in place.

## Two modes

### Demo mode — works without an API key

Sofia questions are answered from the reviewed example response library in \`src/data/sofiaAssistant.ts\`. Follow-ups retain education context until a new subject is selected. The interface labels these answers **scripted college demo**.

### Optional live AI — local development only

If you configure an OpenAI API key, the **Vite development server** exposes the local-only \`POST /api/sofia-chat\` endpoint. It sends the student question and a short excerpt of prior chat to the OpenAI Responses API and returns a model-generated answer.

- A ChatGPT plan does **not** include API billing. API usage may incur charges.
- The browser does not contain your key; never use \`VITE_OPENAI_API_KEY\`, paste your key into a React component, or commit it.
- Copy \`.env.example\` to \`.env.local\` in the repository **root**. In \`.env.local\` set \`OPENAI_API_KEY=YOUR_REAL_API_KEY\` and optionally \`OPENAI_MODEL=gpt-6-luna\`. **Do not share or commit \`.env.local\`.**
- Restart \`npm run dev\` after changing environment settings.
- The local endpoint does not run with \`npm run preview\` or in production deployments. Any public deployment would require a properly secured server-side service, rate limits, privacy disclosures, and costs.
- Live AI questions are sent to the API provider. Use fictional student details only; do not enter sensitive information.

If the API key is absent or the request fails, the education conversation returns a clearly labeled demo response instead. This is intentional.

## Build and run in Visual Studio Code (Mac)

Open the **repository root** folder containing \`package.json\`, then:

\`\`\`bash
git fetch origin
git switch feature/sofia-guided-college-search-20261025
git pull --ff-only
npm install
npm run build
npm run dev
\`\`\`

Use the localhost URL Vite prints, usually \`http://localhost:5173/\`.

If switching branches reports local uncommitted changes, stop and preserve the changes before continuing. The nested untracked \`whatsack-github-ready-2/\` directory should not be added or deleted without inspection.

## Suggested test questions in the Copilot

- "I want to go to college but my family doesn't have much money. What are my options?"
- "How do I know whether to submit CADAA or FAFSA?"
- "My dad lost his job. What happens to my financial aid?"
- "What GPA is required for college?"
- "Could I transfer from Ohlone to a CSU?"
- "How much would my family actually pay?"
- "Are there first-generation scholarships?"
- "When should I apply for fall 2027?"
- "Where can I get one-on-one help?"

Test these with and without the optional API key. Also test selecting Daniel, food, or mental-health categories to verify they still use their original demonstration behavior.

## Scope and safeguards

This is not a verified public-service directory or live eligibility checker. Official links are starting points, not proof of up-to-date programs, aid amounts, deadlines, or acceptance. Sofia's hypothetical facts and intake answers are fictional. There are no guarantees of admission or financial aid, and the AI system is not qualified to make those determinations.

Do not claim the older scripted category replies have verified accuracy or an audited RAG system.

## Code locations

- \`src/components/SofiaCollegeGuide.tsx\` — four click-through guided branches and Copilot handoff
- \`src/components/AILLMConsole.tsx\` — conversational answers and follow-ups
- \`src/data/sofiaAssistant.ts\` — scripted education response library, official starting links and routing
- \`vite.config.ts\` — optional local AI server endpoint
- \`.env.example\` — example environment settings

## Verification notes

The education response library passed 11 local routing cases (college affordability, FAFSA/CADAA, parent job loss, GPA, net price, transfer, scholarships, applications, human support, and two non-college queries). These tests do not replace running the full Vite build and verifying the UI on your Mac; API calls were not tested against a live paid key.
