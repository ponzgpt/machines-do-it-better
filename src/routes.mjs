// Every page of the site and its URL in each language. Plain JS so astro.config, the content check and the
// tests can import it. Spanish (Spain) is the default at /, English lives under /en/.
export const LANGS = /** @type {const} */ (['es', 'en']);

export const SLUGS = {
  es: { home: '', manifesto: 'manifiesto/', products: 'productos/', guide: 'guia/', newsletter: 'newsletter/', legal: 'legal/' },
  en: { home: '', manifesto: 'manifesto/', products: 'products/', guide: 'guide/', newsletter: 'newsletter/', legal: 'legal/' },
};

/** @param {'es'|'en'} lang @param {keyof typeof SLUGS.es} page */
export const pathFor = (lang, page) => (lang === 'es' ? '/' : '/en/') + SLUGS[lang][page];

/** The page and language a built path belongs to, or null. */
export function pageOf(path) {
  for (const lang of LANGS) for (const [page, slug] of Object.entries(SLUGS[lang]))
    if (pathFor(lang, /** @type {any} */ (page)) === path) return { lang, page };
  return null;
}
