# WhatSack branch QA: Spanish community pathway and readable Sprout chat

Branch: `brand-color-green`  
Scope: Research-informed refinements based on the November 8, 2026 UX/accessibility paper.

## How to preview without Base44 AI message credits
Run the branch locally with `npm install` and `npm run dev`, or open the GitHub branch in StackBlitz. A GitHub commit alone is **not** evidence that the deployed preview has updated.

## Bilingual routing scenarios (manual acceptance checks)

1. Switch to **Español** using the header control (no Accessibility disclosure needed). Ask: **"Soy Rosa. Me siento sola y quiero conocer gente en Redwood City."**  
   Expected: older-adult sample journey, explicitly marked simulated; official links appear separately. No instruction to call a fictional number or attend a fabricated appointment.
2. Ask: **"Me siento sola y busco actividades para conocer personas."**  
   Expected: general **Conexión comunitaria** guidance, *not* an assumption about age; directions to **Buscar Recursos**, followed by an optional senior-specific example question.
3. Ask: **"Busco actividades comunitarias para hacer amistades."**  
   Expected: general community guidance.
4. Ask: **"Soy una adulta mayor y busco convivencias en español."**  
   Expected: older-adult example, identified as a class simulation.
5. Ask: **"Tengo ansiedad y necesito apoyo de salud mental."**  
   Expected: the mental-health scripted pathway, not the senior/community pathway.
6. Switch to **EN**. Ask: **"I feel lonely and want to meet people."**  
   Expected: general community guidance in English.
7. Ask a question not handled by the prototype.  
   Expected: an honest fallback, not an invented answer; functional follow-up choices.

## Readability and accessibility checks (must be run in a browser)

- At 320, 375, 768, and 1280 CSS-pixel viewport widths, inspect header language choices, chat, follow-up controls, resource cards and next-step actions. No unintended horizontal page scroll at 320px.
- Zoom the page to 200% and verify that labels, the reply input and buttons remain operable without overlapping.
- Verify chat-answer body text is at least 16 CSS pixels at default zoom. Resource/step descriptions use 16px; secondary text uses at least 14px.
- Keyboard-only: Tab through EN, Español, Accessibility, main menu, Ask WhatSack, suggested follow-ups, organization links, and My Next Steps. Check visible focus and logical order. Test Enter and Space where appropriate.
- Try switching language **before** and **during** a conversation. Confirm understandable translated headings, responses, actions, and labels.
- With a screen reader, verify: heading landmarks; each conversation reply's sender; status announcements on new answers; and labeled navigation, language, form, and save controls.
- Measure color contrast with a contrast checker against WCAG 2.2 AA (4.5:1 regular text, 3:1 qualifying large text).
- Verify the floating Sprout launcher and its dismiss button never block critical content at mobile sizes.
- Confirm real organization websites are labeled as such, while simulated resource data are explicitly labeled examples. Do not treat sample schedules/phone numbers as real.
- Test My Next Steps after saving an official resource and a scripted action, including checking and removing items.

**Status:** Code changes are implemented; these are acceptance tests, not a claim that browser, screen-reader, contrast, or WCAG certification testing has been completed.
