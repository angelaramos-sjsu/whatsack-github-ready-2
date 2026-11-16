# Agent notes — WhatSack

## What this repo is

A single-page React 18 + TypeScript + Vite + Tailwind prototype. There is **no backend, no database and no external API**: the "Civic-LLM" chat, RAG traces and document decoder are simulated in the client from `src/data/*`. No credentials or secrets are required to run it.

`src/whatsack-refresh/` is an older duplicate copy of the app with its own `package.json`; it is **not** the entry point and is not built or served.

## Running it (sandbox)

```bash
docker compose -f docker-compose.base44.yml up -d --build
docker compose -f docker-compose.base44.yml logs -f web
```

- `web` runs `node:22`, bind-mounts the repo at `/app`, installs dependencies with `npm ci` into a named volume (`web_node_modules`) on every start, then runs `vite` on container port 5173 mapped to host **3000**.
- Because dependencies live in a named volume, a newly added package is picked up automatically on the next `docker compose restart web` (the startup `npm ci` syncs it). Do not add a `node_modules` bind mount.
- Vite reports `ready` in the logs; the container healthcheck fetches `http://127.0.0.1:5173/` with Node's `fetch` (no curl in the image).

## Non-obvious setup quirk: host allowlist

The pinned Vite is **5.4.21**, which rejects unknown `Host` headers but does *not* understand the platform-injected `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` variable (that support arrived in Vite 6.1). `vite.config.ts` therefore reads `BASE44_PREVIEW_MODE` / `BASE44_SANDBOX_HOST_DOMAIN` itself and only when `BASE44_PREVIEW_MODE === "1"` sets `server.allowedHosts` to the sandbox domain wildcard plus `<host port>-<domain>`. With the flag unset the config behaves exactly like the original (`allowedHosts: undefined`).

Symptom if this breaks: the preview shows `Blocked request. This host ("3000-…") is not allowed.` with HTTP 403.

## Design standards

- `src/styles/design-system.css` (imported last in `src/main.tsx`) holds the shared tokens — brand green `#047857`, mint surfaces, ink/muted text, radii, shadows, and the Inter / Plus Jakarta display pairing — plus the homepage category cards, the navigation category menu, mobile category chips and the save confirmation toast.
- New UI should use those variables (`var(--qc-green)`, `var(--qc-radius-lg)`, …) and the existing `.qc-btn` / `.qc-card` shapes rather than inventing new colours. Font sizes must stay in `rem` so the text-size control still scales them.

## Categories, homepage and navigation

- The four categories are `food`, `workforce`, `community`, `mental-health` (`CategoryId`); short labels and tab order live in `src/components/CategoryTabs.tsx`.
- `openCategory()` in `App` is the single entry point: it clears intake needs, sets the category and opens the resources view. `HomeCategoryGrid` (homepage cards), the "Find Resources" menu in `Navbar`/`CategoryMenu`, the mobile menu chips and the extension sidebar all call it.
- Category counts on the homepage come from `directoryEntries` (one count per category per entry) and `demonstrationResources`, so they always match the directory tabs.

## Browser extension demo

- Reachable from the footer ("Browser extension demo") and the mobile menu; the view is `src/components/SimulatedExtensionSidebar.tsx`.
- The companion pane can be minimized (narrow rail with an expand button), expanded (wider pane) or closed (returns home); on phones the pane stacks above the simulated portal. Its category chips open the same directory via `onOpenCategory`.
- The header's read-aloud button stays in the navigation on every view, including the extension demo.

## Text size (accessibility)

- The four modes are `small | medium | large | xlarge` (`TextSize` in `src/types/index.ts`), picked in the header's Accessibility menu and applied as `text-small` / `text-large` / `text-xlarge` on `<html>` (`src/index.css`); medium is the unmodified default.
- **Every font size must stay relative.** A root `font-size` change only scales `rem`/`em` values, so `px` font sizes silently ignore the control. `src/styles/quiet-canvas.css` was converted from `px` to `rem`, and Tailwind arbitrary text utilities use `rem` (`text-[0.75rem]`, never `text-[12px]`). Add new text styles in `rem`/`em` only.
- The Accessibility panel is an absolutely positioned dropdown anchored to `.qc-nav` (`.qc-acc` is `position: static`); it stays on screen at every width instead of crowding the nav links.

## Read aloud (accessibility)

- `src/speech/SpeechProvider.tsx` owns the single `speechSynthesis` utterance: play, pause, resume, stop, restart. Starting any passage cancels the previous one, so two voices never talk over each other, and changing page/view/language stops speech (`resetKey` prop from `App`).
- `src/speech/ReadAloudButton.tsx` is the labelled "Read aloud" button placed next to content; mounting it registers the passage with the provider.
- `src/speech/ReadAloudLauncher.tsx` is the single, always-visible "Read aloud" control; `Navbar` mounts it with `variant="header"` directly beside the EN / Español buttons (the default `floating` variant keeps the older side-of-page placement). It opens `src/speech/ReadAloudPanel.tsx`, a compact panel that lists every registered passage grouped by kind, holds play/pause/resume/stop/restart, and repeats the spoken text as a visible transcript. Closing the panel (button or Escape) stops speech; a page or language change closes it too. Opened from the header, the panel is absolutely positioned below `.qc-nav` (`.qc-ral-panel--header`, 1080px and up); below that width it is a bottom sheet.
- **The headless preview browser has no installed voice engine** (`speechSynthesis.getVoices()` returns `[]`), so `speak()` fails immediately and the bar shows "Read aloud could not start in this browser". Audible playback and pause/resume can therefore only be checked in a real browser; the control states, passage registration and transcript are testable in the preview.

## Verifying

- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` → `200`, and the HTML must contain `/@vite/client` + `/src/main.tsx` (dev source, not a prebuilt bundle) — that is what proves the edit loop is live.
- Type-check/build (optional): `docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit`.
- Tests: `docker compose -f docker-compose.base44.yml exec -T web npx vitest run`.
- Text-size check in the preview: open Accessibility → pick a size, then read `getComputedStyle(document.querySelector('#hero-title')).fontSize` and confirm `document.documentElement.scrollWidth` still equals `clientWidth` at 375/768/desktop widths.
