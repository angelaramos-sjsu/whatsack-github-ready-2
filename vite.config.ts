import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sandbox-only host allowlist: the preview proxy forwards the sandbox host
// (e.g. 3000-<sandbox id>.<preview domain>) which Vite would otherwise reject
// with 403. Only active when BASE44_PREVIEW_MODE is exactly "1".
const previewHosts = [
  process.env.BASE44_SANDBOX_HOST_DOMAIN
    ? `.${process.env.BASE44_SANDBOX_HOST_DOMAIN}`
    : undefined,
  process.env.BASE44_PUBLIC_HOST_SUFFIX
    ? `3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`
    : undefined
].filter((host): host is string => Boolean(host))

const allowedHosts = process.env.BASE44_PREVIEW_MODE === '1' && previewHosts.length
  ? previewHosts
  : undefined

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    ...(allowedHosts ? { allowedHosts } : {})
  }
})
