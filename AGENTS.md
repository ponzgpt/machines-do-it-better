# machines-do-it-better
Machines Do It Better (MDIB): a free, self-serve guide to setting up your own AI agent, on the web, as PDF and as Markdown "for your agent". Spanish (Spain) at `/`, English at `/en/`. Live: https://mdib.technoir.cloud

## Commands
- Check (before every commit and deploy): `npm run check && npm run build` (tests the guide's facts and PDF stamp; build scans the built HTML and .md)
- Dev: `npm run dev`
- Deploy: `./scripts/deploy.sh`
- PDF (after any edit to `src/guide/`, needs local Chrome; the check fails until you do): `npm run pdf`
- OG card (after changing headline, palette or step count): `python3 scripts/build-og.py`

## Non-negotiables
1. The free guide is the only product (Javier, 2026-11-13). No calls, sessions, diagnosis or anything that needs his time; `scripts/check-content.mjs` blocks those words.
2. The one call to action is the Beehiiv newsletter as a plain outbound link (`NEWSLETTER` in `src/site.ts`): no embed, script or form. Downloads stay ungated.
3. Upsells exist only as the unpriced "what comes next" ladder (the kit; a fixed-scope written setup): no prices, checkout or dates, each pointing to the newsletter.
4. The guide lives once per language in `src/guide/{es,en}.mjs`; the page, the .md and the PDF are generated from it. Spanish is the original; English is a faithful version. Every price and requirement cites an official source checked on the date in the file; what could not be checked says "sin verificar"/"unverified".
5. Tools are named where the guide teaches them; above the fold the page sells the outcome, not the stack. No claim of affiliation with Nous Research or any tool.
6. Site chrome copy lives in `src/i18n.ts`, in both languages; never add text to one language only.
7. No analytics, cookies or third-party requests (fonts and the shader are bundled): that is what lets the site skip a cookie banner. Adding any means rewriting `/legal` first.
8. No invented proof: no clients, testimonials or metrics. The only example is the session labelled "Ejemplo ilustrativo, escrito a mano".
9. `EMAIL`/`ADDRESS` in `src/site.ts` stay null until Javier sets business ones; nothing may build a `mailto:` from them.
10. Old `/es/...` URLs 301 to `/...` in `nginx.conf`; keep those redirects.
11. Publishing changes needs Javier's explicit yes.
12. The business repo `mdib-ops` still describes the Founder Pilot: Javier decided the new offer on 2026-11-13 and will update it there. Until then, this file wins for the site.
