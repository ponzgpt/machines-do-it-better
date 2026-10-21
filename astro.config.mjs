import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mdib.technoir.cloud',
  output: 'static',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  build: { format: 'directory' }
});
