import { defineConfig } from 'astro/config';
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  server: { host: '0.0.0.0', port: 5000, allowedHosts: true },
  vite: { server: { allowedHosts: true } },
});
