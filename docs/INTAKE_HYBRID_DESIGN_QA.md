# WhatSack — Hybrid "Find My Support" intake (research-informed class prototype)

**Branch:** `brand-color-green`  
**Scope:** This is a resource-navigation demonstration, not benefits eligibility screening. It does not certify program participation, intake document requirements, service availability, or appointments.

## Why this four-step order?
The WhatSack group proposal prioritizes city/ZIP, requested help, urgency and communication/access needs, with optional contextual data. It also states that names, exact addresses, birthdates, SSNs and detailed histories should not be required for exploration. The redesigned wizard keeps useful parts of the existing introduction assessment while starting with immediate needs instead of income and demographics.

1. **Your needs:** Multi-select Food, Mental Health, Education/Workforce, and Community; optionally Housing, Bills/Utilities, and Transportation as **211 referral-only** categories. Select urgency (today, soon, exploring, or not sure).
2. **Your area:** City/area for resource navigation; optional name/nickname and age range. No exact home address or ZIP-to-city geolocation is claimed.
3. **Access preferences:** Explicit **"I need options that do not require an ID or SSN"**, transit, online/phone access, evening/weekend hours, accessible locations, and support language. These are *user preferences*, not unverified eligibility filters.
4. **Optional household details:** Opt-in to household size, dependents, broad income range and work status. If not opted in, the profile omits household size/child/senior flags and treats income/employment as undisclosed.

A collapsed *Class demonstration scenarios* disclosure preserves fictional persona test presets but prevents them from overwhelming real visitors.

## Results behavior
- Finishing the wizard opens **Find Resources**.
- One or more selected supported categories filter organizations and simulated sample programs **together**, retaining multi-select intent.
- City selection narrows results; an unknown/other area leaves the city filter open.
- No ID/SSN preference is echoed in a visible explanatory panel with a reminder to check each organization's documentation rules. **It does not silently hide unknown-policy services.**
- Housing, utility and transportation selections prompt a clear 211 Bay Area referral, because those categories are not reviewed in the current WhatSack directory.
- "Today" urgency surfaces the **Call 211** route.
- Residents can clear their preferences; normal browsing and the Sprout chatbot remain available without completing intake.

## Manual acceptance tests (unverified until run)

- [ ] Open Home → "Find My Support · optional questions"; verify accessible modal, clear Close, Back/Next and progress.
- [ ] Select Food and Education/Workforce; finish without other data. Verify both categories appear in directory results rather than just one.
- [ ] Select **No ID / SSN required**, finish without sharing a name or household details. Verify the ID preference is visibly acknowledged, and no unverifiable organization matches are silently excluded.
- [ ] Choose Housing and Bills, with no supported categories; verify the 211 referral appears and is labeled separately from verified listings.
- [ ] Choose Today; verify visible 211 contact option without requiring personal details.
- [ ] Select Other Silicon Valley; verify the directory isn't inadvertently filtered to an impossible city.
- [ ] Select a location and later choose a manual category filter; verify the manual filter replaces the earlier intake category selection.
- [ ] Toggle optional household details on/off. Verify skipping does not populate fictitious household data.
- [ ] Switch the site to Español; verify the No ID/SSN, 211 referral, urgency, optional household and navigation texts.
- [ ] Navigate with keyboard only; verify visible focus and functionality at 320px, 375px, 768px, 200% zoom.
- [ ] Do not claim to have tested WCAG AA without real browser, assistive technology and contrast checks.

## Important limits
The prototype only demonstrates resource navigation. No eligibility decisions, appointments, direct referrals, external data sharing, or live service verification are performed. Choices currently live in React page state, not a database. No legal conclusion about the privacy requirements of a real deployment is implied.
