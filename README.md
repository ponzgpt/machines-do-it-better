# mdib-site

Landing of **Machines Do It Better (MDIB)**: a productized service that sets up a personal AI agent for one concrete task, for individuals or small teams. Live at https://mdib.technoir.cloud.

Astro (static) + nginx in Docker. English at `/`, Spanish at `/es/` (toggle in the header). No analytics, no cookies, self-hosted fonts.

```bash
npm install
npm run dev                       # http://localhost:4321
npm run check && npm run build    # what CI and the deploy run
./scripts/deploy.sh               # see DEPLOYMENT.md
```

- `src/i18n.ts`: every visible string, in English and Spanish.
- `src/components/Home.astro`: the landing. The hero selector (for me / for my business or team) toggles `body[data-mode]`; both variants are in the HTML. `?for=business`, `?para=empresa`, `?para=negocio` or `#empresa` open the business variant for campaign links.
- `src/lib/currency.mjs`: pilot price range per currency and visitor detection (time zone, then browser language region, else USD). Visitors can switch currency by hand. Tested by `node --test`.
- `src/components/Legal.astro`: provisional legal notice, pilot terms and privacy policy (UK sole trader selling to the UK, EU and US).
- `src/site.ts`: owner, trading name, and the contact email and address (null until published).
- `scripts/check-content.mjs`: after the build, fails on visible `[PLACEHOLDERS]`, a gmail address, or promises forbidden by the business repo.
- `scripts/build-og.py`: link-preview cards `public/og-en.png` and `public/og-es.png`.
- `docs/handoff/`: the original design handoff and reference files from the claude.ai design session (reference only).

## Pending (Javier's call)

- Contact email and geographic address: required on the site before the first sale (UK E-Commerce Regulations 2002, reg. 6). Today the contact section says bookings open soon.
- Pilot price: today the provisional £100–250 range (≈ €120–290, $130–330, fixed rates in `src/lib/currency.mjs`).
- Final domain (today `mdib.technoir.cloud`).
- Legal texts: professional review before the first paid pilot; open points in `machines-do-it-better/legal/web-legal-review.md`.
- Contact: a booking link (Cal.com or similar) once the email exists.
- Whether `/empresas` should become its own page if B2B traffic comes through a separate channel.
