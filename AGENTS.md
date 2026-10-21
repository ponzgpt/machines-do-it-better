# mdib-site
Public landing of MDIB (Machines Do It Better): productized personal AI agents, in Spanish (Spain). Live: https://mdib.technoir.cloud

## Commands
- Check (before every commit and deploy): `npm run check && npm run build`
- Dev: `npm run dev`
- Deploy: `./scripts/deploy.sh`
- OG card (after changing headline or palette): `python3 scripts/build-og.py`

## Non-negotiables
1. Copy follows the private business repo `ponzgpt/machines-do-it-better` (`strategy/offer-v0.md`, `operations/support-boundaries.md`, `strategy/product-architecture.md`); when they disagree, the business repo wins.
2. One offer only: Piloto Fundador, one use case and up to two flows, price set after the diagnosis. No public price until Javier picks amount and currency.
3. The only public support promise is the literal sentence in `support-boundaries.md`; `scripts/check-content.mjs` blocks forbidden promises and `[PLACEHOLDERS]`.
4. No analytics, cookies or third-party requests (fonts are self-hosted): that is what lets the site skip a cookie banner. Adding any of them means rewriting `/legal` first.
5. Hermes and Nous are named only under «Debajo del capó» and on `/legal`: we sell outcomes, not the stack.
6. No invented metrics, clients or testimonials; examples are labelled «Ejemplo ilustrativo».
7. Publishing changes needs Javier's explicit yes (rule 7 of the business repo).
