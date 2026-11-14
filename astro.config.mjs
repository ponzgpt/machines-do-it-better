import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { LANGS, pageOf, pathFor } from './src/routes.mjs';

const site = 'https://mdib.technoir.cloud';

export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap({
    filter: (page) => !page.includes('/404'),
    // Slugs differ per language (/productos/ ↔ /en/products/), so the alternates come from src/routes.mjs.
    serialize(item) {
      const at = pageOf(new URL(item.url).pathname);
      if (at) item.links = [...LANGS.map((l) => ({ lang: l, url: new URL(pathFor(l, at.page), site).href })),
        { lang: 'x-default', url: new URL(pathFor('es', at.page), site).href }];
      return item;
    },
  })],
  build: { format: 'directory' }
});
