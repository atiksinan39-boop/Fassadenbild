import { defineConfig } from 'astro/config';

// SITE_URL und BASE_PATH setzt nur der GitHub-Pages-Build (.github/workflows/pages.yml).
// Ohne sie (Netlify, eigene Domain) liegt die Seite wie bisher im Wurzelverzeichnis.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  build: { inlineStylesheets: 'auto' },
  devToolbar: { enabled: false },
});
