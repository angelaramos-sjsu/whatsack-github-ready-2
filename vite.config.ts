import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When running inside the Base44 sandbox preview, the dev server is reached
// through a proxy host such as `3000-<sandbox id>.$BASE44_SANDBOX_HOST_DOMAIN`.
// Vite blocks unknown hosts, so allow the sandbox domain (and its subdomains)
// only while BASE44_PREVIEW_MODE === '1'. Unset or any other value -> defaults.
const sandboxHostDomain =
  process.env.BASE44_PREVIEW_MODE === '1' ? process.env.BASE44_SANDBOX_HOST_DOMAIN : undefined

// The preview proxy reaches the dev server as `<host port>-<sandbox id>.<domain>`;
// when the sandbox id is empty that collapses to `<host port>-<domain>`.
const allowedHosts = sandboxHostDomain
  ? [`.${sandboxHostDomain}`, `3000-${sandboxHostDomain}`]
  : undefined

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    allowedHosts
  }
})
