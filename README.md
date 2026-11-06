# Machines Do It Better

**MDIB** is my main project: I set up personal and business AI agents, built on open models and open agent
harnesses such as [Hermes Agent](https://github.com/NousResearch/hermes-agent), so that the person or team using
them owns them: their account, their data, their choice of model. Consulting plus semi-automated deployment, for
individuals (B2C) and small businesses (B2B). Open by default: nothing is locked to us, everything can be inspected,
moved or reshaped by whoever runs it.

**Live:** https://mdib.technoir.cloud · **Status:** pre-launch. The offer (one Founder Pilot) and the site are live;
the first pilots are friends and family, so there are no paying clients yet.

This repository is the public site. Pilots, sales, legal and the client-facing agent distribution live in a private
repository (`ponzgpt/mdib-ops`) because they hold people's names and use cases.

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
- Legal texts: professional review before the first paid pilot; open points in `mdib-ops/legal/web-legal-review.md`.
- Contact: a booking link (Cal.com or similar) once the email exists.
- Whether `/empresas` should become its own page if B2B traffic comes through a separate channel.

## How this was made

I'm a vibe coder. I decide what to build, write the spec and the rules it has to follow, and test the result until it
does what I said. AI coding agents write the code; I don't write code by hand. Commits under my name were made by an
agent working for me.

## Licence

Code: MIT, see [LICENSE](LICENSE). Copy, name and brand are not licensed for reuse.
