# Machines Do It Better

**MDIB** is my main project: a free, written guide to setting up your own AI agent, on a machine you control,
with your account, your data and your choice of model, doing one real task for you. It is delivered three ways:
the web page, a PDF, and a Markdown file "for your agent" that you give to ChatGPT, Claude or any assistant so it
tutors you through it. The guide is free in exchange for interest: the only call to action is the newsletter.

**Live:** https://mdib.technoir.cloud · **Status:** pre-launch, no paying clients.

Astro (static) + nginx in Docker. Spanish at `/`, English at `/en/`. No analytics, no cookies, self-hosted fonts.

```bash
npm install
npm run dev                       # http://localhost:4321
npm run check && npm run build    # what CI and the deploy run
npm run pdf                       # re-print the PDFs after editing the guide (needs Chrome locally)
./scripts/deploy.sh               # see DEPLOYMENT.md
```

- `src/guide/es.mjs`, `src/guide/en.mjs`: the guide, once per language, with its sources.
- `src/guide/render.mjs`: facts line (computed from the content), inline HTML, the Markdown "for your agent".
- `src/pages/guia-agente-propio.md.ts`, `own-agent-guide.md.ts`: the .md downloads, generated at build time.
- `scripts/build-pdf.mjs`: the PDFs in `public/`, printed by headless Chrome and stamped in `src/guide/pdf-stamp.json`.
- `src/components/Home.astro`: the page. `src/scripts/`: the paper-dither hero and the illustrative session replay.
- `src/i18n.ts`: the page chrome in both languages. `src/components/Legal.astro`: provisional legal notice and privacy.
- `scripts/check-content.mjs`: after the build, fails on placeholders, forbidden promises, the retired offer's words and broken `mailto:`.
- `nginx.conf`: 301s from the old `/es/` paths, HTML revalidation, `.md` served as UTF-8 text.

## How this was made

I'm a vibe coder. I decide what to build, write the spec and the rules it has to follow, and test the result until it
does what I said. AI coding agents write the code; I don't write code by hand. Commits under my name were made by an
agent working for me.

## Licence

Code: MIT, see [LICENSE](LICENSE). The guide's text, the name and the brand are not licensed for republication.
