# WhatSack — UX, Accessibility and Usability Review
**Branch:** `brand-color-green` · **Review date:** November 8, 2026 · **Target:** WCAG 2.2 Level AA (not a conformance claim)

## Assumptions and evidence limits
- The supplied Vercel URL is intended as a live reference, but automated access returned an error; **no visual or interactive live-page inspection was possible**. Findings marked **code confirmed** refer to the GitHub branch as inspected, not to real-device performance.
- "Organization listings" are links to named real organizations, **not externally verified program eligibility, addresses, hours or pricing**. "Sample programs" are classroom-only demonstration records.
- The project keeps the green visual system, five nav labels, four categories, header toolbar, conversational search, directory filters/cards, scripted Ask WhatSack, and the saved plan. Work is a refinement, not a redesign.
- The team-provided Taylor (2025), Pew (2026), Santa Clara County language figures, digital-divide and knowledge-gap framing are treated as **course context only**; this review does not independently establish those statistics. Plain-language copy targets approximately grade 8 or below, which also requires human readability testing.
- Code commits were made on **`brand-color-green` only**. Vercel reported a **build-rate-limit failure** for the latest branch; build, runtime, mobile, color-contrast and screen-reader outcomes remain unverified.

## 1. Short heuristic audit (initial implementation, before this refinement)

| Component | Supported finding / risk | Relevant principle or WCAG | Severity | Evidence and disposition |
|---|---|---|---|---|
| About nav | Opened prototype disclaimer rather than mission information | Nielsen #4 and #6; 2.4.4 | High | **Code confirmed**; separate About view added. Browser behavior needs retest |
| Home | Full organization directory directly followed four category choices | COGA 4.6.3; progressive disclosure | High | **Code confirmed**; full directory moved into Find Resources |
| Category tiles | Scrolled to large on-page list instead of an orienting destination | Nielsen #6; 2.4.3 | Medium | **Code confirmed**; tiles now open filtered directory, focus destination H1 |
| Organization links | Every card said "Visit website" | 2.4.4 Link Purpose; Nielsen #6 | High | **Code confirmed**; destination name and new-tab information now in each link |
| Directory count | Combined different inventories as "listings · demonstration resources found" | Nielsen #1/#4; 4.1.3 | Medium | **Code confirmed**; organization and sample counts now separately named |
| Mixed record types | Sample records used "Verified Demonstration Record"; organization rows had no type indicator | Nielsen #2; 1.4.1 | High | **Code confirmed**; each type is labeled in text, with a warning that samples are not live |
| Free / no-ID filtering | Directory's organization records lack fee and ID fields; filter toggles did not test those organizations | Nielsen #5; 3.3.2 | High | **Code confirmed**; scope now explained: those toggles apply to sample programs only. Verify user understanding |
| My Next Steps | Chatbot action saves, checklists and organization bookmarks did not create one coherent checklist | Nielsen #6; COGA clear steps | Medium | **Code confirmed**; saves and completion are now combined in drawer, but persistence across reload remains out of scope |
| Language | Original toggle relabeled UI but already-rendered scripted chat replies could remain in the previous language | 3.1.1, 3.1.2; USWDS selector | High | **Code confirmed**; scripted replies render in selected language; user-typed text remains in original language |
| Directory and chat updates | Results/count feedback wasn't consistently a distinct non-focus-changing status | 4.1.3 | Medium | **Code confirmed**; status regions added. Screen-reader announcement **needs testing** |
| Optional intake | Required name and preselected personal details created avoidable friction | COGA ask only what is needed; 3.3.1, 3.3.2 | Medium | **Code confirmed**; name optional, neutral defaults for several fields; deeper simplification needs research |
| Focus/contrast/reflow | CSS overrides and densely grouped controls may be hard at high zoom or 320px | 1.4.3, 1.4.4, 1.4.10, 2.4.7, 2.5.8 | High if failing | **Needs real-browser measurement and AT testing**. CSS focus/target/reflow improvements made; no pass claimed |

**Principle basis:** [Nielsen heuristics 4 and 6](https://www.nngroup.com/articles/ten-usability-heuristics/), [Nielsen's progressive disclosure (2006)](https://www.nngroup.com/articles/progressive-disclosure/), [W3C COGA Making Content Usable](https://www.w3.org/TR/coga-usable/), [USWDS language selector](https://designsystem.digital.gov/components/language-selector/), and [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## 2. Concrete design recommendations, states and criteria — A through G

### A. About versus disclaimer
**Implemented:** About is a separate page with mission, simple process and "What is real?" information. Safety Notice still opens the academic/research disclaimer. **Copy:** "About WhatSack" / "Acerca de WhatSack"; "Read the safety notice" / "Leer el aviso de seguridad."

| State | Behavior |
|---|---|
| Default | About opens its own page; Safety Notice opens a separate dialog |
| Hover | Green underline; do not rely on color alone |
| Focus | Visible 3px focus outline, 3px offset |
| Active | About navigation item uses `aria-current="page"` |
| Error | If a destination fails, show "Page not available. Return Home." / "Página no disponible. Volver al inicio." (proposed fallback, not implemented) |
| Empty | Not applicable: static About content |

**Basis:** Nielsen #4/#6; WCAG 2.4.3, 2.4.4, 2.4.7.

### B. Specific link purpose on 60+ cards
**Implemented pattern:** Construct link label from the item's **actual name** and URL path. Homepage links read "Visit [Name] homepage (opens new tab)"; links with a non-root path read "Visit [Name] page (opens new tab)". Spanish: "Visitar [Nombre] (inicio/información) (abre otra pestaña)." This is a scalable generic pattern; it does **not** pretend to know the linked site's actual page topic. A labeled special-case financial-aid guide remains available on Ohlone's card.

| State | Behavior |
|---|---|
| Default | Visible specific link text, name kept legible when wrapping |
| Hover | Underline text; preserve contrast |
| Focus | 3px outline, not underline alone |
| Active | Browser opens URL in a new tab |
| Error | If URL missing/broken, don't render a dead link; offer "Website link not available" / "Enlace no disponible" (rule for future content checks) |
| Empty | Never show a bare "Visit website" where name/URL is missing; flag incomplete record |

**Basis:** WCAG 2.4.4, 2.4.7, 3.1.2, 2.5.8; Nielsen #6.

### C. Real organizations versus sample records
**Implemented:** Every organization row has text "Organization website — check details" / "Sitio de organización — confirme los datos"; sample cards say "Sample program — not a live service" / "Programa de ejemplo — no es un servicio real." Results count reads, for example, "60 organization listings · 16 sample programs" and updates with filters. These are **inventory labels**, not external verification badges.

| State | Behavior |
|---|---|
| Default | Record type shown in text on each row/card and distinct counts |
| Hover/focus | No change to record type text; controls use visible focus |
| Active | Save state becomes "Saved" / "Guardado" plus `aria-pressed` |
| Error | Unverified field: "Check the organization's website" / "Consulte el sitio de la organización" |
| Empty | "No directory listings match these filters yet" / "Ningún registro del directorio coincide con estos filtros" plus Reset Filters |

**Basis:** Nielsen #2/#4/#5; WCAG 1.4.1, 3.3.2, 4.1.3. **Open issue:** An organization link can itself lead to outdated or English-only content; verify before asserting service availability.

### D. One coherent My Next Steps plan
**Implemented:** Save a reviewed action in Ask WhatSack using "Add step to My Next Steps" / "Agregar a Mis Próximos Pasos"; the saved drawer now contains scripted actions, saved sample program checklists, and saved organization website links. Sample action checkboxes are shared with NextStep Insights. Initial saved items were cleared so the plan starts empty.

| State | Behavior |
|---|---|
| Default | Saved actions, checkboxes and resource links have clear headings |
| Hover | Button/card border changes while visible text remains |
| Focus | Checkbox and buttons show outline; dialog focuses close control |
| Active | Checked steps get strike-through **and** a checked box; "Added to My Next Steps" confirms save |
| Error | If copying fails, show an accessible copy error (future improvement; browser clipboard errors not yet handled) |
| Empty | "No steps or resources saved yet…" / "Aún no hay pasos ni recursos guardados…" |

**Basis:** Nielsen #6; COGA 4.2.4 and 4.5.7; WCAG 1.4.1, 2.1.1, 2.4.3, 4.1.3. **Limit:** Current plan state exists for the browser session; the site does not promise an account or persistent storage across reloads.

### E. Language equivalence
**Implemented:** The toolbar displays explicit **EN** and **Español** buttons, with each label wrapped in a `span lang` and the selected choice indicated by `aria-pressed`; the document's HTML `lang` updates with language choice. The branch already includes bilingual static translations, sample content, answer records and many controls; prior chat replies are now rendered from the selected scripted-answer language.

| State | Behavior |
|---|---|
| Default | EN / Español both available in the same header position |
| Hover/focus | Visible underline/3px outline; no hover-only access |
| Active | Selected button has `aria-pressed="true"`; page language updates |
| Error | If equivalent translation is not supplied, label visibly rather than pretending full localization |
| Empty | No language should be exposed until content and all critical actions exist in that language |

**Copy examples:** "What do you need help with today?" / "¿En qué necesita ayuda hoy?"; "Saved" / "Guardado"; "No results found" / "No se encontraron resultados." **Verify** full equivalence in generated status, all chat actions, intake fields, footer, and actual linked external websites; user-entered messages remain as entered. For future Vietnamese and Chinese, ask the team: *Can we fund full translations and review by fluent speakers?* Then switch to the **USWDS 3+ language menu** with properly tagged language names (`lang="vi"`, `lang="zh"`), not four untested partial translations.

**Basis:** WCAG 3.1.1, 3.1.2, 3.3.2, 4.1.3; [USWDS language selector](https://designsystem.digital.gov/components/language-selector/).

### F. Nonintrusive live status
**Implemented:** The directory has a `role="status" aria-live="polite" aria-atomic="true"` region with the counts; chatbot has a polite response-count/loading region. Neither requires focus to move merely because a count changes.

| State | Behavior |
|---|---|
| Default | No duplicate long announcements on page load (must verify AT) |
| Hover/focus | Not applicable to noninteractive status text |
| Active | After filter or message update, announce concise count/state in selected language |
| Error | Use `role="alert"` for errors requiring immediate notice and inline visible error text |
| Empty | "0 organization listings and 0 sample programs found" / "Se encontraron 0 organizaciones y 0 programas de ejemplo" |

**Basis:** WCAG 4.1.3, 2.4.3, 3.1.2. **AT test required:** NVDA/Firefox, VoiceOver/Safari; confirm exactly one nonintrusive announcement per change.

### G. Optional, limited intake
**Implemented partial refinement:** Name is not required; city/age labels say "optional"; neutral defaults are supplied for age, city, income, employment, needs, ID preference and transit; untouched service priorities no longer fabricate a food need. The form states that the flow itself is optional. No SSN or immigration-status prompt was introduced.

**Recommended narrower intake, team decision:** Ask only when a specific recommendation needs it: **city** (to find nearby programs), **need** (to filter categories), **language** (to show instructions), and optionally **schedule** (only if hours can be sourced and matched). Do not require name, exact income, legal status or ID. Use "City (optional)" / "Ciudad (opcional)"; "What kind of help?" / "¿Qué tipo de ayuda busca?"; "When can you go? (optional)" / "¿Cuándo puede ir? (opcional)". Include "Skip for now" / "Omitir por ahora". The current four-step wizard still asks more than this: **question for team:** *May we reduce it to one optional screen or keep the longer wizard only in the advanced/research tools?*

| State | Behavior |
|---|---|
| Default | Visible labels; fields explicitly marked optional; do not imply prefills describe the user |
| Hover | Standard control affordances |
| Focus | Strong outline; label remains visible |
| Active | Chosen city/need/language; no hidden forced value |
| Error | "Choose a city from the list, or skip this field." / "Elija una ciudad de la lista u omita este campo." (proposed validation rule) |
| Empty | Allow no selections; no automatic fake need should be saved |

**Basis:** COGA ask only what is needed, COGA 4.5.6–4.5.7; WCAG 3.3.1, 3.3.2, 2.4.7.

### H. Directory relocation and focus behavior
**Implemented:** Home keeps the hero + four categories and a short "Start here" CTA. The full directory and sample-program card grid live under **Find Resources**. Each category tile opens the directory filtered to its category. On navigation the page's H1 receives programmatic focus. The directory has **H1 "Find Resources"**, **H2 "Community Resource Directory"**, organization **H3 names**, then a visible **H2 "Sample programs (class examples)"** for the sample cards. Show 10 organization rows at a time; "Show 10 more organizations" appends entries and focuses the first newly revealed row. Existing cards, filters and Save are retained. A 320px reflow rule is present in CSS but **needs browser testing**.

**Open question to team:** Do we prefer no homepage previews (current code) or a maximum of 3–4 featured organization links with a "See all resources" link? Either honors COGA's reduction in main choices; do not put 60+ items back on Home.

**Basis:** Nielsen progressive disclosure (2006), Nielsen #4/#6, COGA 4.6.3; WCAG 1.4.10, 2.4.3, 2.4.7, 2.5.8, 4.1.3.

## 3. One-page accessibility acceptance criteria (pass/fail)

Record **Pass / Fail / Not tested**, browser/device, and a short screenshot or AT transcript for each line. These are tests, **not statements of conformance**.

| Page | Pass/fail developer test | WCAG |
|---|---|---|
| **All pages** | At 320 CSS px (or 400% zoom from 1280px) all tasks reflow without horizontal page scroll, clipped links or inaccessible controls | 1.4.10 |
| **All pages** | All important text/background pairs measure at least **4.5:1**; large text at least **3:1**; controls/non-text indicators at least **3:1** | 1.4.3; 1.4.11 |
| **All pages** | Browser text size set to **200%** preserves content and function | 1.4.4 |
| **All pages** | Interactive targets are at least **24×24 CSS px** unless a valid exception applies; primary buttons target **44×44** (AAA aspiration) | 2.5.8; 2.5.5 AAA |
| **All pages** | Keyboard focus has a visible high-contrast indicator (design: **3px solid #047857, 3px offset**); no custom CSS suppresses it | 2.4.7; 2.4.11 |
| **All pages** | Keyboard Tab/Shift+Tab/Enter/Space complete all critical tasks; focus follows meaningful order; no keyboard trap | 2.1.1; 2.4.3 |
| **All pages** | Both languages display correct `html lang`, language-part markers and translated critical labels; no color-only signals | 3.1.1, 3.1.2; 1.4.1 |
| **Home** | Exactly one H1, one search field with accessible label, Ask WhatSack button, four category choices; no full directory | 2.4.6; COGA 4.6.3 |
| **Home** | Each category navigates to Find Resources with matching prefilter, visible H1 focus, and no focus loss | 2.4.3; 2.4.7 |
| **Ask WhatSack** | Suggested questions work with keyboard; a reply/loading status is announced **without moving focus** | 2.1.1; 4.1.3 |
| **Ask WhatSack** | Switching language translates approved answer copy and next-step controls; unsupported query does not invent a service | 3.1.2; accuracy UX |
| **Find Resources** | Organization links state a specific destination; opening a new tab is disclosed in text | 2.4.4 |
| **Find Resources** | Every card visibly identifies organization link or classroom-only sample; filters have visible labels and an honest scope note | 1.4.1; 3.3.2 |
| **Find Resources** | Filtering announces updated organization and sample counts; zero results gives explanation + Reset | 4.1.3 |
| **Find Resources** | Show more adds ten rows and keyboard focus moves to first new row without losing reading order | 2.4.3; 2.4.7 |
| **My Next Steps** | Add/save/unsave and completion changes appear consistently between chat, insights and drawer; checkbox status isn't color-only | 1.4.1; 4.1.3 |
| **My Next Steps** | Drawer can open, receive initial focus, close via Escape, and return focus to trigger; focus stays inside while modal | 2.1.1; 2.4.3 (**trap/return still needs implementation and test**) |
| **About** | About shows mission and how-to content; Safety Notice remains a distinct, keyboard-accessible dialog | 2.4.4; 2.4.3 |
| **All forms** | Labels are visible; required fields (if any) have clear instructions and text error messages associated with controls | 3.3.1; 3.3.2 |

**How to measure:** Chrome or Firefox responsive mode at 320px and browser zoom 200%; browser computed styles/color contrast checker; keyboard-only walkthrough; NVDA+Firefox (Windows), VoiceOver+Safari (Mac/iPhone); optional axe/WAVE scan supplemented by manual assessment.

## 4. Lightweight usability test plan (6 participants)

**Participants (purposive, not representative):** (1) Rosa-like **Spanish-dominant older adult** (60+); (2) **screen-reader user** using their normal AT; (3) **smartphone-only internet user** with a small phone and mobile data; (4) first-generation college applicant; (5) recently unemployed working adult; (6) caregiver managing household food/support needs. Groups may overlap; recruit based on real needs, not stereotypes.

**Format:** 30–40 minutes each, 5-minute introduction, 4 randomized tasks, short post-task interview. Obtain consent, avoid gathering sensitive eligibility data, let participants use their own assistive technologies, and remind them all sample services are *not live*. Moderators should avoid showing where to click.

| Scenario | Start → goal | Observe and likely fix if it fails |
|---|---|---|
| **T1 Rosa (Spanish)** | Set Español; ask "Busco actividades para adultos mayores en Redwood City"; follow suggested help / Find Resources to reach a **real organization's official website** with **no English instructions needed inside WhatSack** | If participant must translate navigation, complete missing Spanish UI; if no official link is visible from the answer, add an accurate official link with bilingual label. An external English-only site is recorded as external-language barrier, not mislabeled as internal success |
| **T2 first-generation applicant** | On Home ask about paying for college; use a scripted follow-up; save one useful action; find a community-college official website | If users mistake a sample financial-aid card for an actual grant, strengthen sample warning; if saves disappear, clarify My Next Steps entry |
| **T3 caregiver finding food** | Use Food Access tile; explore City/Region; try Free / No ID filters; identify an actual organization's website and save it | If they assume unverified organizations guarantee free/no-ID help, rewrite filter-scope note and redesign filtering rules using verified data |
| **T4 job seeker / AT** | Use Find Resources for Education & Workforce; open an organization link; Show more; save a resource; mark and unmark a checklist item | If focus vanishes on Show more, fix focus destination; if links sound identical in a screen reader, revise labels; if plan state confuses users, regroup it |

**Measures:** Task completion independent of moderator (**complete/partial/fail**); wrong turns or backtracks; number of assistance prompts; time to reach official site (directional, no rigid cutoff); whether users can correctly identify a sample record; focus-loss/AT-announcement incidents; participant-rated ease (1–5); language comprehension (ask participant to restate next action). Success bar for the *prototype* before demo: at least **5 of 6** complete each critical task without prompting, **all** participants recognize simulated content, and **zero** critical keyboard traps. These are planning goals, not reported results. Record quote/observation and prioritize fix by impact and frequency.

## 5. Directory data-quality issues (separate review list)

### Obvious code errors corrected in this branch
1. `Second Harvest of Silicon Valley - calfresh assistance` → `Second Harvest of Silicon Valley — CalFresh Assistance` (**capitalization**; do not infer current program availability).
2. `Sacramentio, CA 95814` → `Sacramento, CA 95814` (**spelling**).
3. `Oakland, CA 946112` → `Oakland, CA 94612` (**six-digit ZIP typo**, but confirm address and ZIP externally).

### Source checks required (not silently changed)
- `NOVAworks — San Mateo`: `1777 Borel Pl, Suite 500, San Mateo, CA` lacks ZIP.
- `work2future — San José Job Center`: `1608 Las Plumas Ave, San Jose, CA` lacks ZIP.
- `work2future — North San José Job Center`: `1901 Zanker Rd, San Jose, CA` lacks ZIP.
- `work2future — Gilroy Job Center`: `379 Tomkins Ct, Gilroy, CA` lacks ZIP.
- `Monterrey Health`: unusual spelling but possibly the organization's **actual brand**; confirm against official site before touching the name.
- `San Jose Mental Health`, `Santa Clara County Mental Health — Behavioral Health Services`, `West Valley Community Services`: confirm current names, whether category really fits listed service, and official links.
- Online/area-wide programs use `Online statewide`, `Statewide financial aid program`, `California community colleges`, or `Participating community colleges` in the address field. Standardize as **service area / online** instead of a physical street address once data schema supports it.
- `Statewide`, `Online`, `Multiple campuses` appear as `city` values, so City/Region behaves inconsistently; model geography versus online access explicitly in a later data pass.
- All organization websites/addresses need human review for current details. A URL existing in code is not proof the site is online, a named program remains open, or translation is provided.

### Source references (principles, not claims of audited conformance)
- [Nielsen: 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/); [Progressive Disclosure, 2006](https://www.nngroup.com/articles/progressive-disclosure/)
- [W3C COGA: Making Content Usable](https://www.w3.org/TR/coga-usable/)
- [USWDS: Language Selector](https://designsystem.digital.gov/components/language-selector/)
- [WCAG 2.2 standard](https://www.w3.org/TR/WCAG22/); [2.5.8 target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum); [1.4.10 reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow); [4.1.3 status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages)

**Implementation status:** Committed to `brand-color-green`, not merged into `main`. Next practical checks: successful build, manual keyboard navigation, 320px/200% zoom, contrast measurement, EN/ES walkthrough, and screen-reader status + dialog focus testing. **Do not state WCAG conformance until audited.**
