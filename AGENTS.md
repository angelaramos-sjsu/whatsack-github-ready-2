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

## Verifying

- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` → `200`, and the HTML must contain `/@vite/client` + `/src/main.tsx` (dev source, not a prebuilt bundle) — that is what proves the edit loop is live.
- Type-check/build (optional): `docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit`.
