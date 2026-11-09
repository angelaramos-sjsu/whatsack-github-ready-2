# Intake form accessibility changes

This update keeps the existing intake output contract intact while making the modal calmer, more readable, and easier to use with a keyboard or screen reader.

## What changed

- Light, low-visual-noise dialog shell with one title line and one supporting sentence.
  - WCAG: 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast, 2.4.3 Focus Order
- Removed the old step-title strip and replaced it with a single clear question per step.
  - WCAG: 1.3.1 Info and Relationships, 2.4.6 Headings and Labels
- Renamed the modal to “Find My Support” and removed the clipboard-style screening cue.
  - WCAG: 3.1.1 Language of Page, 3.1.2 Language of Parts
- Reworked the flow to a four-step needs-first structure, with name and household details moved to the optional final step.
  - WCAG: 3.3.2 Labels or Instructions, 3.3.3 Error Suggestion
- Kept developer demo scenarios hidden behind development mode or the `?demo=1` query flag.
  - WCAG: 1.4.1 Use of Color, 2.4.11 Focus Appearance
- Left only one close control inside the modal dialog.
  - WCAG: 2.1.2 No Keyboard Trap, 4.1.3 Status Messages
- Converted labels to sentence case and made optional fields explicitly labeled as optional.
  - WCAG: 3.3.2 Labels or Instructions, 1.3.1 Info and Relationships
- Added a visible progress indicator with text and a thin brand-green bar.
  - WCAG: 4.1.3 Status Messages, 1.4.11 Non-text Contrast
- Added a single-question-per-screen pattern with clear helper text and a bottom action bar.
  - WCAG: 2.4.7 Focus Visible, 2.5.8 Target Size
- Used accessible checkbox and radio patterns with a check icon, not color alone.
  - WCAG: 1.3.1 Info and Relationships, 1.4.1 Use of Color, 4.1.2 Name, Role, Value
- Added inline validation for required needs selection with error focus management.
  - WCAG: 3.3.1 Error Identification, 3.3.2 Labels or Instructions, 3.3.3 Error Suggestion
- Added focus movement to each step heading and an aria-live announcement of the current step.
  - WCAG: 4.1.3 Status Messages
- Added Escape-to-close behavior with confirmation if the user has started typing or selecting answers.
  - WCAG: 2.1.2 No Keyboard Trap, 2.4.3 Focus Order
- Added sessionStorage draft persistence so refresh or accidental close does not lose progress.
  - WCAG: 2.1.2 No Keyboard Trap, 3.3.3 Error Suggestion
- Kept the intake data format aligned with the existing App.tsx contract and downstream filtering logic.
  - WCAG: none; this preserves the product behavior and avoids a data contract regression.

## Notes

- The dialog language follows the EN/ES toggle.
- The form remains optional and does not ask for SSN, immigration status, or documents.
- The “Skip this step” and “Skip and see my results” actions remain available where fields are optional.
