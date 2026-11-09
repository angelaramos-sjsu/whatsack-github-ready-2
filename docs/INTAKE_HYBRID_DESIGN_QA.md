# WhatSack intake form QA checklist

This checklist covers the calm, four-step intake modal introduced for the brand-color-green branch. It is intended to validate the accessibility and usability requirements for the flow without changing the intake data contract used by App.tsx.

## Manual test checklist

### 1. Keyboard-only run
- Open the intake form from the homepage or the visible CTA.
- Confirm focus lands on the modal title when the dialog opens.
- Use Tab and Shift + Tab to move through the dialog in logical order.
- Confirm every interactive element is reachable, including:
  - close button
  - step actions
  - need cards
  - urgency options
  - city selector
  - optional field labels
  - skip actions
  - summary edit links
- Confirm the visible focus ring is at least 2px and brand green.
- Confirm pressing Escape closes the dialog.
- If the user has entered answers, confirm the leave confirmation reads: “Leave the form? Your answers are not saved.”
- Confirm that on each step change focus moves to the step heading and the step announcement is read aloud by assistive tech.

### 2. Screen reader run (VoiceOver or NVDA)
- Open the form and verify the dialog announces as a dialog with the correct title.
- Confirm the live region announces the current step in plain language, for example: “Step 2 of 4: Where are you looking?”
- Confirm the progress bar is exposed as a progressbar with correct values and text.
- Confirm each checkbox and radio group is announced with a label and selection state.
- Confirm optional labels include “(optional)” where applicable.
- Confirm the error state is announced when the user tries to continue without selecting a need.
- Confirm the external 211 referral text is announced as a link to an external referral.
- Confirm the summary screen reads in plain language and each edit link is announced correctly.

### 3. 320 px width run
- Resize the viewport to 320px wide.
- Confirm the modal becomes a full-height sheet and the content stacks in a single column.
- Confirm there is no horizontal scrolling.
- Confirm action buttons remain visible and easy to tap.
- Confirm the footer action bar stays fixed at the bottom without covering the form content.
- Confirm card choices stack cleanly and are fully readable.

### 4. 200% zoom run
- Zoom the page to 200%.
- Confirm the form remains usable without overlapping or clipped content.
- Confirm text remains readable and buttons are still operable.
- Confirm focus stays visible and the dialog still traps focus as expected.

### 5. Spanish toggle run
- Switch the app language to Spanish using the existing language control.
- Confirm the dialog title, helper text, labels, and options update to Spanish.
- Confirm progress text and step announcements use the Spanish wording.
- Confirm validation and confirmation text are also translated.
- Confirm the final review and summary content still reads clearly in Spanish.

### 6. Keyboard-only entry point checks
- Open the form from the hero link under the search field.
- Confirm focus lands on the dialog title and returns to the same link after closing.
- Open the form from the final "Not sure where to start?" card.
- Confirm focus lands on the dialog title and returns to the same card button after close.
- In Ask WhatSack, send a short or vague first message such as "help" or "I need support".
- Confirm the assistant responds normally and shows the suggested chip "Ask me a few quick questions instead".
- Press the chip and confirm the form opens, focus lands on the title, and focus returns to the chip after close.
- Open Find Resources and trigger the banner when more than 15 results appear.
- Confirm the banner reads "Narrow these with 4 quick questions" and the link opens the modal with focus returning to the banner link after close.
- Complete or close the form from each entry point and confirm focus returns to the exact opened control.

## Acceptance signals

The intake flow is acceptable when all of the following are true:
- The form is calm, easy to follow, and one question appears at a time.
- The user is not asked for SSN, immigration status, or any documents.
- The flow starts with urgent need selection and ends with optional details.
- Required selection logic works and shows the exact error message: “Choose at least one kind of help so we can show the right resources.”
- The 211 Bay Area referral appears inline only when the need is housing, bills, transportation, or the urgency is “Today.”
- The app preserves the existing intake output contract used by App.tsx and downstream filtering.
- Session progress is saved so a refresh or accidental close does not fully discard work.
- Choosing “I need options that do not require an ID or SSN” shows a reminder on the results page but does not hide organizations whose document policies are unknown.
- Choosing housing, bills, or transportation shows the 211 Bay Area referral; choosing “Today” also surfaces a 211 call option.
- Multiple supported needs remain selected together in Find Resources. Choosing a manual category there replaces the earlier intake category filter.
- “Anywhere in Silicon Valley” leaves the city filter open, and skipped household details are not filled with assumed values.

## Status

This checklist is for manual validation in the browser and is not a claim of a formal legal accessibility certification.
