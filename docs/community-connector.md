# Sprout Community Connector

The community & social connection assistant added in this branch. It is a new view
(`Community` in the navigation) that sits alongside the existing WhatSack
resources, Civic-LLM Copilot, intake form, directory, personas and translations.
Nothing about those features was replaced.

## What it does

1. Recognizes natural-language requests for social groups, older-adult
   activities, cultural and language-specific groups, accessible events,
   volunteering, and contact questions.
2. Runs a seven-question conversational intake, one question at a time, with
   **Skip**, **Back**, **Edit** and **Restart**.
3. Reacts to what the user says (loneliness, "people my age", limited English,
   no car, nervous about attending alone, no known interests, affordability,
   trouble using websites) without re-asking information it already has.
4. Searches a local dataset and explains roughly 3–5 matching records, always
   with a real organization or a clearly labeled sample record. Missing details
   are shown as **"Not confirmed."**
5. Offers contact actions: official source, `Call` only when a verified phone
   exists, review details, and change preferences.

## Architecture

```
src/community/
  types.ts          Data model for preferences, programs, matches, intents
  intent.ts         Deterministic phrase-based intent recognition + signal detection
  intake.ts         Intake state machine and preference building (pure functions)
  match.ts          Filtering, scoring, warnings, missing-field detection
  assistant.ts      Localized assistant replies (EN/ES)
  copy.ts           UI strings, question definitions, option labels
  languages.ts      Language + regional-variety options and labels
  useSpeech.ts      Optional Web Speech input/output (text alternative always present)
src/data/
  communityPrograms.ts   Demonstration records + real directory organizations
src/components/community/
  CommunityConnector.tsx   View orchestration, storage, example flows
  ChatPanel.tsx            Reusable chat transcript, chips and text input
  IntakeWizard.tsx         One-question-at-a-time wizard with skip/back/edit/restart
  LanguageSelector.tsx     Language + explicit regional variety
  ProgramResults.tsx       Result list and no-result state
  ProgramCard.tsx          Verified-record card and "Not confirmed." handling
  ContactActions.tsx       Source, call, details and preference actions
src/community/__tests__/   Vitest suites for intent, intake, matching, replies
```

The domain layer is plain TypeScript with no React dependency, so the rules can be
tested without a browser. The UI only renders state and calls these functions.

### Request flow

```
chat text ──detectIntent──▶ recognized intent
                              │
                     seedPreferencesFromIntent (never overwrites known answers)
                              │
                     findMatchingPrograms ──▶ ranked ProgramMatch[]
                              │
                     composeAssistantReply / composeContactReply
```

The guided wizard writes to the same `ConnectorPreferences` object, so chat and
wizard never diverge. `nextUsefulQuestion()` skips anything already answered or
skipped, which is what prevents repetitive questions.

### Intake questions

| # | Question | Type |
|---|----------|------|
| 1 | What would you like help finding today? | single choice |
| 2 | What kinds of activities interest you? | multiple choice |
| 3 | Where should we look? city / ZIP / virtual | free text, no street address |
| 4 | What language would you like to use? + variety | language selector |
| 5 | Accessibility / transportation support | multiple choice |
| 6 | When works best for you? | single choice |
| 7 | Next step: show matches / speak with a person / change preferences | single choice |

All questions can be skipped. Answers are editable from the summary list.

### Matching rules

- **Hard filters:** inaccessible records (`verification: 'inaccessible'`) are
  never returned; a stated city/ZIP limits results to that city (or `virtual`
  limits to online programs); a stated language excludes programs that publish a
  different language; a stated need excludes programs that explicitly say "No";
  free-only excludes anything not confirmed free.
- **Soft rules / scoring:** language and regional variety, city, interests, time
  of day, wheelchair access, transit, transportation assistance, cost, contact
  availability and recency. Social goals favour social/arts/cultural/music
  programs over pure volunteering.
- **Missing information** never becomes a guess: the program is returned with a
  warning and the card shows "Not confirmed.".
- **Outdated records** are shown with a warning and a score penalty; records
  older than 18 months are treated as outdated.
- Results are capped at five (three to five when available).

## Data sources and honesty rules

`src/data/communityPrograms.ts` contains two kinds of record:

1. **`recordType: 'directory'`** — real organizations copied from
   `src/data/directory.ts` (name, city, address, official website). Only those
   published fields are present. Activities, hours, cost, languages, accessibility
   and phone are `null` and render as "Not confirmed.".
2. **`recordType: 'demonstration'`** — fictional sample programs used to exercise
   the assistant. Every card says **"Sample record — fictional organization"**;
   phone numbers use the `555-01xx` reserved range, are marked **"Sample number —
   not a real phone line"**, and are never turned into `tel:` links. There is no
   official source link.

Fictional organizations or contacts are never presented as verified real-world
results. "Last verified" is shown only where a date exists in the dataset.

## Language personalization

- The interface is available in English and Spanish, matching the existing app
  language toggle.
- The assistant replies in Spanish when the user's preference is Spanish,
  including regional variety labels, e.g. "Español (Latinoamérica)".
- Other language preferences (Portuguese, Mandarin, Cantonese, Vietnamese,
  Tagalog, Korean, other) filter results by the languages a program publishes and
  explicitly tell the user that automated explanations are only available in
  English and Spanish for now, offering a person who speaks their language.
- Regional variety is only taken from an explicit statement or a selection in
  question 4. It is never inferred from a city, name or ethnicity.

## Privacy

- To browse, only an interest and a city/ZIP (or "virtual") are requested.
- The intake explicitly says not to enter a full name, date of birth, street
  address or contact details.
- Transcripts are **not stored by default**. Everything lives in React state for
  the current tab. An opt-in checkbox can save the conversation to
  `localStorage` under `whatsack.sprout-community-v1`; the same key is removed by
  "Clear everything" or by unchecking the box.
- No analytics, no network calls, no backend.

## Accessibility

- Mobile-first single-column layout; result cards use large (≥44–52 px) controls.
- Keyboard-operable wizard, selectable option buttons with `aria-pressed`,
  `role="progressbar"`, and focus moves to each new question heading.
- The chat transcript is a polite `role="log"` live region; results count is a
  live region; the assistant's text is always available as text.
- Voice input/output uses the Web Speech API only when the browser supports it;
  when it does not, the UI explains that typing still works.
- Existing high-contrast and text-size controls continue to apply because the view
  uses the same CSS variables and Tailwind tokens.

## Functional vs. simulated

| Area | Status |
|------|--------|
| Intent recognition, intake, adaptive follow-ups, matching, ranking, warnings | Functional (rule-based, deterministic) |
| Resource data | Simulated/demonstration plus real organizations with unconfirmed program details |
| Assistant "reasoning" | Simulated: no language model and no live RAG index; responses are composed from the dataset |
| Phone calls / source links | `tel:` links only for verified numbers; sample numbers are inert. Official links open the organization's real website |
| Voice input/output | Functional where the browser supports Web Speech; otherwise unavailable with a text alternative |
| Saving transcripts | Opt-in local browser storage only |
| Automated explanations in languages other than EN/ES | Not available; falls back to English plus a human-interpreter message |

## Rosa Martinez validation

"Try Rosa's situation" seeds a 72-year-old Spanish-speaking resident in San Jose
who chooses **Spanish (Latin America)** and writes:

> Me siento un poco sola durante la semana. Me gustaría encontrar actividades
> donde pueda conocer a otras personas que hablen español.

The flow picks up Spanish (no inferred variety), the meeting-people goal and the
loneliness signal, merges them with the chosen language and city, searches the
dataset, explains the options in Spanish, puts the Spanish-speaking senior circle
first, and offers contact actions plus a "speak with a person" summary. The
sample phone number is shown with its "not a real phone line" label.

## Tests

```bash
npm test
```

Vitest suites in `src/community/__tests__/` cover:

- **intent** — multiple phrasings per intent, explicit vs. inferred language
  variety, accessibility/transport, volunteering, contact questions, adaptive
  signals, Rosa's message, preference merging.
- **intake** — one question at a time, skip, back, edit, restart, completion,
  preference building, non-repetition.
- **match** — city/language/accessibility/time/interest/free filters, 3–5 result
  cap, Rosa ordering, missing fields, inaccessible exclusion, outdated warnings,
  honest labeling, no-result cases.
- **assistant** — Spanish personalization, variety labels, "Not confirmed."
  rendering, no fabricated results, non-dialable sample phones, organizer-first
  contact.

`npm run build` runs the TypeScript check and production build.
