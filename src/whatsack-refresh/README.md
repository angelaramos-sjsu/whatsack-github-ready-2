# WhatSack — Simplified Interactive Prototype

A clean, search-first academic prototype for the WhatSack MCOM 284 group proposal. It is based on your existing **React + TypeScript + Vite + Tailwind CSS** configuration and designed to replace the cluttered old interface.

## Run it in Visual Studio Code

1. Download/unzip the project and open the **whatsack-refresh** folder in VS Code.
2. Ensure **Node.js LTS** is installed.
3. Open **Terminal → New Terminal** and run:

```bash
npm install
npm run dev
```

4. Open the address printed in the terminal (usually **http://localhost:5173**).
5. To check that the app builds, run `npm run build`.

> This ZIP is a separate, self-contained project because the original `src/` folder was not included in the files you supplied. It includes the provided setup files and a new `src/`. **Make a backup of your existing repository before replacing anything.** You can also copy the new `src/` and `index.html` into a separate Git branch and preview it there.

## Where are the persona buttons?

Personas are **not** shown on the normal homepage. Scroll to the **very bottom footer** and click the small **“Demo scenarios”** link to open a private-looking class demonstration panel. There you can launch Sofia, Daniel, Maria, Mateo, and Rosa. Or go to `http://localhost:5173/?demo=1`, or press **Alt/Option + Shift + D**. This panel is only visually tucked away; it is **not password-protected**.

## What works

- Search bar with local matching on a prepared list of 16 reference records
- Four browsable categories and filters
- Resource detail dialogs with why-it-may-fit explanations, source links and NextStep Insights
- A compact optional service-area filter (replaces the giant mandatory assessment)
- Bookmarks stored in React memory for the current page visit
- English/Spanish navigation; selected example resource summaries are translated
- Simulated text assistance using local matching (no model API)
- Simulated browser companion, switching between food aid and student aid samples
- Five fictional persona demonstration journeys in the footer-only demo panel
- Responsive layout, keyboard-accessible controls, and a clear prototype disclaimer

## What is **not** live

This is **not** a working LLM, real browser extension, live eligibility engine, constantly updated directory, benefits application, or medical advice provider. Links are for starting points; some example resource summaries need verification. The script does not collect or upload user information and does not include voice features. Do not represent mock functionality as live AI.

## Editing content

- **`src/data/resources.ts`** — Add/edit resources, category tags, next steps, and persona examples.
- **`src/App.tsx`** — UI components, navigation, demo panel, results, and interactions.
- **`src/index.css`** — Visual design and mobile layouts.

For real-world publication, a person must review the information, links, accessibility, translations, privacy practices, and safety. For the class presentation, this is a locally runnable high-fidelity prototype.
