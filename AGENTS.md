# mdib-site
Public landing of MDIB (Machines Do It Better): productized personal AI agents. English at `/`, Spanish (Spain) at `/es/`. Live: https://mdib.technoir.cloud

## Commands
- Check (before every commit and deploy): `npm run check && npm run build` (build also scans the built HTML)
- Dev: `npm run dev`
- Deploy: `./scripts/deploy.sh`
- OG card (after changing headline or palette): `python3 scripts/build-og.py`

## Non-negotiables
1. Copy follows the private business repo `ponzgpt/machines-do-it-better` (`strategy/offer-v0.md`, `operations/support-boundaries.md`, `strategy/product-architecture.md`); when they disagree, the business repo wins.
2. One offer only: Founder Pilot / Piloto Fundador, one use case and up to two flows. Its price range lives only in `src/lib/currency.mjs` (GBP is the source; EUR/USD are rounded conversions, USD for unknown visitors); the binding price is the one in the proposal.
3. The only public support promise is the literal sentence in `support-boundaries.md`; `scripts/check-content.mjs` blocks forbidden promises and `[PLACEHOLDERS]`.
4. No analytics, cookies or third-party requests (fonts are self-hosted): that is what lets the site skip a cookie banner. Adding any of them means rewriting `/legal` first.
5. All copy lives in `src/i18n.ts`, in both languages; never add text to one language only.
6. No personal email on the site (spam). `EMAIL`/`ADDRESS` in `src/site.ts` stay null until Javier sets business ones; both are legally required before the first sale.
7. Hermes and Nous are named only under «Debajo del capó» and on `/legal`: we sell outcomes, not the stack.
8. No invented metrics, clients or testimonials; examples are labelled «Ejemplo ilustrativo».
9. Publishing changes needs Javier's explicit yes (rule 7 of the business repo).
