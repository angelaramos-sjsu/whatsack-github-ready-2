# Community & Social Connection guide

A conversational guide that helps people of all ages find clubs, classes, senior programs,
volunteer teams and cultural groups — and end up talking to a real organization.

**AI is the bridge, not the destination.** Every result card ends with a phone number, an
official source link, or an explicit "Not confirmed." so nobody mistakes the guide for the
service itself.

---

## What it is built from

| Piece | Path |
| --- | --- |
| Types and profile model | `src/community/types.ts` |
| Intent recognition | `src/community/intent.ts` |
| Adaptive follow-ups | `src/community/adaptive.ts` |
| Matching, outdated + no-result logic | `src/community/matching.ts` |
| Bilingual UI copy | `src/community/i18n.ts` |
| Mock resource records | `src/community/data/communityResources.mock.ts` |
| Screen-level component | `src/community/components/CommunityConnector.tsx` |
| Conversation | `src/community/components/CommunityChat.tsx` |
| Seven-question intake | `src/community/components/IntakeWizard.tsx` |
| Language + regional variety | `src/community/components/LanguageSelector.tsx` |
| Results and cards | `src/community/components/CommunityResults.tsx`, `CommunityResultCard.tsx` |
| Tests | `src/community/__tests__/*.test.ts` |

The module is additive. It reuses the app's Tailwind tokens, EN/ES toggle, high-contrast and
text-size settings, and adds one view (`community`) to `App.tsx` and `Navbar.tsx`. No existing
WhatSack contract (resources, directory, copilot, intake, saved items) was changed.

## How the flow works

1. **Free text** — `detectCommunityIntent` normalises the text (case, accents, punctuation) and
   matches phrase sets in English, Spanish and Portuguese. It returns one or more intents plus
   hints (language, regional variety, city/ZIP, virtual, wheelchair, no car, free, caregiver).
2. **Hints are applied** only when the person said them. A language or regional variety is never
   inferred from a city, a surname or the language the message was written in.
3. **Adaptive follow-ups** — the eight situations in the brief (`I feel lonely`, `I want to meet
   people my age`, `I don't speak much English`, `I don't drive`, `I'm nervous about attending
   alone`, `I don't know what interests me`, `I can't afford activities`, `I have trouble using
   websites`) are recognized and applied. A follow-up question is only asked while the answer is
   still missing, so nothing already answered is asked twice.
4. **One question at a time** — `nextIntakeQuestion` returns the next unanswered question
   (what they want, what activities, where). The wizard shows all seven questions with back,
   skip, edit and restart.
5. **Matching** ranks listings and caps at five. Two constraints are hard: a virtual-only search,
   and a listing explicitly marked *not* wheelchair accessible. If fewer than three options pass,
   the language requirement is loosened — and every loosened card says what was not confirmed.
6. **Contact** — phone (when the source gave one), official source link, "Review details" and
   "Change preferences". Missing values render as "Not confirmed." / "No confirmado."

## Data sources — read this before using it for real

`mockCommunityResources` contains **13 fictional records**. Every one is labelled `mock` or
`outdated`, organization names are invented, phone numbers use the reserved `555-01xx` range, and
source links point at `example.org`. This is development data and must never be replaced with
unverified scraped listings.

To use real data, produce records with the `CommunityResource` shape and record, for each field,
where it came from and when a person last checked it (`lastVerified`). Keep `verification` honest:
a record whose review is older than a year must be marked `outdated`, and a field the source does
not state must be `null` — never a guess.

## Functional vs simulated

| Area | Status |
| --- | --- |
| Intent recognition, adaptive follow-ups, matching, language/region filtering, no-result guidance, outdated flags | **Functional**, covered by tests |
| Seven-question intake, back/skip/edit/restart, preferences bar, result cards, contact actions, optional transcript saving, reset | **Functional** in the browser |
| Voice input/output | Uses the browser's Web Speech APIs when present, with the text box always available. **Not available in every browser**, so the guide never depends on it |
| Resource records | **Simulated** mock data (see above) |
| Chat answers | The guide composes replies from rules and copy — there is no language model call and no backend |
| "Call" buttons | `tel:` links to the mock numbers, so they must not be used as real contact details |

Not stored: names, date of birth, exact address, contact details. Browsing needs only a city or
ZIP (or "virtual"). The conversation lives in React state; the optional "Save this conversation
on this device" checkbox is the only thing that writes to `localStorage`, and "Reset conversation
and answers" deletes it.

## Accessibility notes

- One clear `h1`/`h2` per region, a skip link target (`#main-content`), and focus moved to each
  new question.
- Every choice is a real `<button>` with `aria-pressed`; selects have visible labels.
- Result cards use definition lists so a screen reader announces each field with its label.
- Dynamic replies land in a `role="log"` region with `aria-live="polite"`; the results count is
  also announced.
- Touch targets are at least 48 px; the app-wide high-contrast and text-size settings apply.

## Rosa Martinez walkthrough (manual check)

1. Open **Community** in the navigation.
2. In *Your preferences*, choose **Español** and **Latinoamérica**, then type `San Jose`.
3. Write: `Me siento un poco sola durante la semana. Me gustaría encontrar actividades donde pueda
   conocer a otras personas que hablen español.`
4. Expected: the guide recognizes loneliness and the wish to meet people, keeps Spanish
   (Latin America), asks at most one more question, and shows Spanish-language San Jose options
   with a phone number, a "why this fits" line in Spanish, and "Antes de ir" guidance.

## Running the checks

```bash
# All community tests
docker compose -f docker-compose.base44.yml exec -T web npx vitest run src/community

# Type-check
docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit
```

Test coverage: intent recognition (39 cases across the phrasings in the brief), preference
filtering, missing information, language personalisation, no-result responses, inaccessible and
outdated listings, and the Rosa journey.
