# Machines Do It Better

**MDIB** is my main project: AI that is yours. Tools and guides so individuals and small businesses can have an AI
agent of their own, with their account, their data and the model they choose, in the cloud when it makes sense and
on their own hardware when they want. This repo is its public website:

- **Home**: the ethos in five ideas (digital sovereignty, sovereign AI, agents that fit you, ownership, hybrid cloud + local).
- **Manifesto** (`/manifiesto/`, `/en/manifesto/`): what I believe and what MDIB will not do.
- **Products** (`/productos/`, `/en/products/`): four layers, each with an honest status: **Atlas** (your ontology),
  **Forja** (the kit), **Guardia** (permissions, backups, upkeep) and **Puente** (the hybrid route). What you can take
  away today is the free guide; nothing is on sale yet.
- **Free guide** (`/guia/`, `/en/guide/`): "You don't need to code", on the web, as a PDF and as Markdown "for your agent".
- **Newsletter** (`/newsletter/`): a plain link to Beehiiv, plus a once-only pop-up for first-time visitors.

**Live:** https://mdib.technoir.cloud · **Status:** pre-launch, no paying clients.

Astro (static) + nginx in Docker. Spanish at `/`, English at `/en/`. No analytics, no cookies, no third-party requests.

```bash
npm install
npm run dev                       # http://localhost:4321
npm run check && npm run build    # what CI and the deploy run
npm run pdf                       # re-print the PDFs after editing the guide (needs Chrome locally)
./scripts/deploy.sh               # see DEPLOYMENT.md
```

- `src/catalog.mjs`: the status table (layers and products), each with its evidence, and the Stripe Payment Link
  per product (all `null` today). The selling guard refuses a link while the site has no business email and address.
- `src/i18n.ts`: every word of the site in both languages. `src/routes.mjs`: the URL of each page per language.
- `src/components/`: one component per page (`Home`, `Manifesto`, `Products`, `Guide`, `NewsletterPage`, `Legal`)
  and the small parts (`Badge`, `BuyButton`, `SubscribeLink`, `NewsletterDialog`, `OwnsDiagram`).
- `src/scripts/newsletter-prompt.ts`: when the pop-up opens (25 s or half a page, once, one `localStorage` key).
- `src/guide/es.mjs`, `src/guide/en.mjs`: the guide, once per language, with its sources; `render.mjs` builds the
  facts line, the inline HTML and the Markdown. `scripts/build-pdf.mjs` prints the PDFs into `public/`.
- `scripts/check-content.mjs`: after the build, fails on placeholders, forbidden promises, the retired offer's words,
  broken `mailto:`, a badge that disagrees with the catalog, or anything on sale without a business contact.
- `nginx.conf`: 301s from the old `/es/` paths, HTML revalidation, `.md` served as UTF-8 text.

## How this was made

I'm a vibe coder. I decide what to build, write the spec and the rules it has to follow, and test the result until it
does what I said. AI coding agents write the code; I don't write code by hand. Commits under my name were made by an
agent working for me.

## Licence

Code: MIT, see [LICENSE](LICENSE). The guide's text, the name and the brand are not licensed for republication.
