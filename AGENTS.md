# machines-do-it-better
MDIB's site: private AI agents fitted to one professional's work, owned by them (private pilot in preparation, access list = newsletter), plus the free own-agent guide. Spanish at `/`, English at `/en/`. Live: https://mdib.technoir.cloud

## Commands
- Check (before every commit and deploy): `npm run check && npm run build` (catalog, selling guard, guide facts, PDF stamp; the build scans built HTML, .md and .txt)
- Dev: `npm run dev`
- Deploy: `./scripts/deploy.sh`
- PDF (after any edit to `src/guide/`, needs local Chrome; the check fails until you do): `npm run pdf`
- OG cards and the dithered plate (after changing the home headline or palette): `python3 scripts/build-og.py`

## Non-negotiables
1. Statuses live only in `src/catalog.mjs` (layers, products, the home's how-it-works steps); badges read it and the build fails if one disagrees. Modest status wins; "Previsto" is intent, never working.
2. True today, and only this (Javier, 2026-11-14): the site is built by agents to his spec and tests; first-line support is agent-first. Never state or imply running pilots, an intake agent, clients, counts or results.
3. Selling is Stripe Payment Links only (`stripeLink`, plain link, new tab); `null` disables the button and hides the price. All null. No prices anywhere except the third-party prices the guide cites.
4. **Before the first `stripeLink`:** set a business `EMAIL` and `ADDRESS` in `src/site.ts` and have `/legal` reviewed for distance selling. The build fails otherwise; until then nothing builds a `mailto:`.
5. No calls, sessions, diagnosis or anything that needs Javier's time; `scripts/check-content.mjs` blocks those words, plus "Atlas", a newsletter cadence ("lunes a viernes") and a running pilot.
6. No analytics, cookies, local storage, pop-up or third-party request on load; subscribing is a plain link to Beehiiv. Adding any request means rewriting `/legal` first.
7. Hero speaks problem first, no jargon (soberanía, ontología, arnés, stack) above the fold; jargon is explained on first use in the body. MDIB is the brand: Javier appears only in the footer byline and the manifesto's last paragraph.
8. Design is a black-on-white technical dossier. Only diagram lines move (draw-on, skipped under reduced motion, visible without JS); one static dithered plate.
9. All copy lives in `src/i18n.ts`, both languages; URLs in `src/routes.mjs`. Layer names (Plano, Forja, Guardia, Puente) stay Spanish in both. "Plano" also names an unrelated open-source agent proxy (Katanemo); kept by decision.
10. The guide lives once per language in `src/guide/{es,en}.mjs`; page, .md and PDF come from it; every price cites a dated source.
11. Old `/es/...` URLs 301 to `/...` in `nginx.conf`; keep them and `expires -1` for HTML.
12. Publishing changes needs Javier's explicit yes. Never modify `mdib-ops` from here.
