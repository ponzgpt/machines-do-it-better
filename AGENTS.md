# machines-do-it-better
Machines Do It Better (MDIB): the main site (ethos, manifesto, product family, newsletter) plus the free own-agent guide. Spanish (Spain) at `/`, English at `/en/`. Live: https://mdib.technoir.cloud

## Commands
- Check (before every commit and deploy): `npm run check && npm run build` (tests the catalog, selling guard, guide facts and PDF stamp; build scans the built HTML and .md)
- Dev: `npm run dev`
- Deploy: `./scripts/deploy.sh`
- PDF (after any edit to `src/guide/`, needs local Chrome; the check fails until you do): `npm run pdf`
- OG card (after changing the home headline or palette): `python3 scripts/build-og.py`

## Non-negotiables
1. Statuses live only in `src/catalog.mjs` (Disponible / En desarrollo / Previsto); badges read it and the build fails if a built badge disagrees. When evidence is unclear, the more modest status wins; "Previsto" is written as intent ("servirá para"), never as working.
2. Selling is Stripe Payment Links only: `stripeLink` per product, a plain link in a new tab, no Stripe script or embed. With `null` the button is disabled and no price shows. All are null today.
3. **Before the first `stripeLink`:** set a business `EMAIL` and `ADDRESS` in `src/site.ts` and have `/legal` reviewed for distance selling (terms, refunds for digital goods, VAT). `check-content.mjs` fails the build otherwise. Until then both stay null and nothing builds a `mailto:` (no personal email, phone or address anywhere).
4. No calls, sessions, diagnosis or anything that needs Javier's time; `scripts/check-content.mjs` blocks those words. No promise of support, results or security beyond `mdib-ops/operations/support-boundaries.md`.
5. No analytics, cookies or third-party requests on load (fonts and shader are bundled): that is what lets the site skip a cookie banner. The newsletter is a plain link to Beehiiv (its subscribe page does not accept a prefilled email, checked 2026-11-14). Adding any request means rewriting `/legal` first.
6. The pop-up uses one `localStorage` key, `mdib-newsletter-prompt`, named on `/legal`; never on legal or `/newsletter/`, never for visitors from the newsletter; no pop-up without JavaScript.
7. All copy lives in `src/i18n.ts`, both languages; URLs in `src/routes.mjs`. Layer names (Atlas, Forja, Guardia, Puente) stay Spanish in both.
8. The guide lives once per language in `src/guide/{es,en}.mjs`; page, .md and PDF are generated from it. Every price and requirement cites a source checked on the date in the file.
9. No invented proof: no clients, testimonials, metrics or partnerships; the site says plainly there are no paying clients. No claim of affiliation with Nous Research or any vendor; never mention the site that inspired the layout.
10. Old `/es/...` URLs 301 to `/...` in `nginx.conf`; keep them and the `expires -1` HTML rule.
11. Publishing changes needs Javier's explicit yes. Never modify `mdib-ops` from here.
