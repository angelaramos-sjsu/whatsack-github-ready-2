# Repository notes (Base44 sandbox)

## Running the app
- Single Vite + React + TypeScript frontend; there is no backend or database.
- Start: `docker compose -f docker-compose.base44.yml up -d` (host port 3000 → Vite dev server).
- Dependencies are installed at container start (`npm ci`) into the named volume `node_modules`; edits to `src/` hot-reload, so no rebuild is needed after source changes. Use `docker compose -f docker-compose.base44.yml restart web` only if Vite wedges.
- `src/whatsack-refresh/` is an unused copy of the same app; the running app is the root project.

## Sandbox-only configuration
- `vite.config.ts` appends extra `server.allowedHosts` entries (`.<BASE44_SANDBOX_HOST_DOMAIN>` and `3000-<BASE44_PUBLIC_HOST_SUFFIX>`) when `BASE44_PREVIEW_MODE === "1"`. This stops Vite 5.4.12+ from answering `403 Blocked request` to the preview proxy. With the variable unset, `allowedHosts` is left at Vite's default behaviour.
- `docker-compose.base44.yml` passes `BASE44_PREVIEW_MODE`, `BASE44_SANDBOX_HOST_DOMAIN`, `BASE44_PUBLIC_HOST_SUFFIX` and `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` through from the platform environment; never hardcode resolved host values.

## Checks
- Health check in compose: `wget --spider http://127.0.0.1:3000/`.
- Type/build check (Vite config is outside `tsconfig`'s `include`): `docker compose -f docker-compose.base44.yml exec -T web npm run build`.
- Verify UI in the live preview: home route renders the hero heading "Find free and low-cost community support in Silicon Valley".
