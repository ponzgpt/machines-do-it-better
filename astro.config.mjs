import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mdib.technoir.cloud',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !page.includes('/404'), i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } } })],
  build: { format: 'directory' }
});
