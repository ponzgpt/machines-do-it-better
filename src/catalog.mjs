// The status table: the single source for every status badge on the site (layers and products).
// Statuses are decided from evidence in the private repo ponzgpt/mdib-ops and in this repo; when the evidence
// is unclear the more modest one wins. Javier corrects them here, nowhere else. The words shown for each
// status, and every name and description, live in src/i18n.ts (both languages).
//
// available = exists and can be used or downloaded today · building = being built · planned = only intent.

/** @typedef {'available' | 'building' | 'planned'} Status */
export const STATUSES = /** @type {const} */ (['available', 'building', 'planned']);

/** The four layers. Names are Spanish in both languages (Javier, 2026-11-14). */
export const layers = [
  { id: 'atlas', name: 'Atlas', status: /** @type {Status} */ ('planned'),
    evidence: 'mdib-ops distribution/skills/mdib-core/SKILL.md (8-item setup list only); strategy/product-architecture.md ("esquema de configuración por cliente" is still a gate)' },
  { id: 'forja', name: 'Forja', status: /** @type {Status} */ ('building'),
    evidence: 'mdib-ops distribution/distribution.yaml (v0.1.0, maturity alpha), distribution/SOUL.md, distribution/skills/ (4 skills); STATUS.md (installed and verified on a test instance, then removed)' },
  { id: 'guardia', name: 'Guardia', status: /** @type {Status} */ ('planned'),
    evidence: 'mdib-ops distribution/SOUL.md (written rules only); operations/support-boundaries.md; this repo src/guide/es.mjs step 7 (backups "sin verificar")' },
  { id: 'puente', name: 'Puente', status: /** @type {Status} */ ('planned'),
    evidence: 'this repo src/guide/es.mjs step 3 (cloud vs local model); no MDIB software in mdib-ops' },
];

/**
 * What a visitor can take away. `stripeLink` is a Stripe Payment Link (hosted checkout, opened in a new tab):
 * null means not on sale, and the page shows "not available yet" and no price. Before the first non-null link,
 * EMAIL and ADDRESS in src/site.ts must be set and the legal pages reviewed for distance selling: the content
 * check (scripts/check-content.mjs) fails the build otherwise.
 * @type {{ id: 'guide' | 'skills' | 'setup', status: Status, free: boolean, stripeLink: string | null, price: string | null, evidence: string }[]}
 */
export const products = [
  { id: 'guide', status: 'available', free: true, stripeLink: null, price: null,
    evidence: 'this repo src/guide/{es,en}.mjs, public/*.pdf, built .md endpoints' },
  { id: 'skills', status: 'building', free: false, stripeLink: null, price: null,
    evidence: 'mdib-ops distribution/skills/ (4 skills, v0.1.0 alpha, proprietary, not packaged for sale); Javier, 2026-11-14' },
  { id: 'setup', status: 'planned', free: false, stripeLink: null, price: null,
    evidence: 'mdib-ops strategy/product-architecture.md ("Provisioning objetivo"), operations/support-boundaries.md; Javier, 2026-11-14' },
];

/** Problems that must stop the build: selling anything while the site has no business email or postal address. */
export function sellingGuard(items, { email, address }) {
  const selling = items.filter((p) => p.stripeLink !== null);
  const out = [];
  if (selling.length && (!email || !address))
    out.push(`stripeLink set for ${selling.map((p) => p.id).join(', ')} while ${[!email && 'EMAIL', !address && 'ADDRESS'].filter(Boolean).join(' and ')} is null in src/site.ts: set a business email and postal address and review the legal pages for distance selling first`);
  for (const p of items) {
    if (p.stripeLink !== null && !/^https:\/\/(buy\.stripe\.com|checkout\.stripe\.com)\//.test(p.stripeLink)) out.push(`${p.id}: stripeLink is not a Stripe Payment Link`);
    if (p.stripeLink !== null && p.status !== 'available') out.push(`${p.id}: on sale but status is ${p.status}`);
    if (p.stripeLink === null && p.price !== null) out.push(`${p.id}: shows a price but is not purchasable`);
  }
  return out;
}
