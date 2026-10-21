# mdib-site

Landing of **Machines Do It Better (MDIB)**: a productized service that sets up a personal AI agent for one concrete task, for individuals or small teams. Live at https://mdib.technoir.cloud.

Astro (static) + nginx in Docker. Spanish (Spain). No analytics, no cookies, self-hosted fonts.

```bash
npm install
npm run dev                       # http://localhost:4321
npm run check && npm run build    # what CI and the deploy run
./scripts/deploy.sh               # see DEPLOYMENT.md
```

- `src/pages/index.astro`: the landing. The hero selector («Para mí» / «Para mi negocio o equipo») toggles `body[data-mode]`; both variants are in the HTML. `?para=empresa` (or `?para=negocio`, `#empresa`) opens the business variant for campaign links.
- `src/pages/legal.astro`: provisional legal notice and privacy policy.
- `src/site.ts`: contact email and owner name, used everywhere.
- `scripts/check-content.mjs`: fails on `[PLACEHOLDERS]` or promises forbidden by the business repo.
- `docs/handoff/`: the original design handoff and reference files from the claude.ai design session (reference only).

## Pending (Javier's call)

- Pilot price and currency (£100–250 range in `offer-v0.md`; £ or € undecided). Today the page says «precio cerrado tras el diagnóstico».
- Final domain (today `mdib.technoir.cloud`).
- Legal texts: reviewed by a professional, a postal address for notices, and cancellation terms before the first paid pilot.
- Contact: a booking link (Cal.com or similar) instead of `mailto:`, and possibly a dedicated MDIB address instead of the personal one.
- Whether `/empresas` should become its own page if B2B traffic comes through a separate channel.
