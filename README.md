# Machines Do It Better

**MDIB** designs and sets up private AI agents, fitted to one professional's work, that the professional owns:
the account, the data and the choice of model in their name, on their own machine or their own cloud. This repo is
its public website.

- **Home**: "No puedes pegar los datos de tus clientes en ChatGPT." What you get, how a private agent goes from
  brief to running (each step with its status and who does it, agent or person), and two ways to start: done for
  you (the access list for a private pilot that is being prepared) or do it yourself (the free guide).
- **Inside** (`/productos/`, `/en/products/`): the technical sheet. Four layers, **Plano**, **Forja**, **Guardia**
  and **Puente**, each with what it is made of today, what it does not do and its status; one data-flow figure;
  the catalogue (nothing on sale, no prices).
- **Manifesto** (`/manifiesto/`, `/en/manifesto/`): machines first within limits, and what MDIB will not do.
- **Free guide** (`/guia/`, `/en/guide/`): "You don't need to code", on the web, as a PDF and as Markdown "for your agent".
- **Newsletter** (`/newsletter/`): also the access list; a plain link to Beehiiv. No pop-up.

**Live:** https://mdib.technoir.cloud · **Status:** pre-launch, no paying clients, no running pilot.

Astro (static) + nginx in Docker. Spanish at `/`, English at `/en/`. No analytics, no cookies, no third-party requests.

```bash
npm install
npm run dev                       # http://localhost:4321
npm run check && npm run build    # what CI and the deploy run
npm run pdf                       # re-print the PDFs after editing the guide (needs Chrome locally)
./scripts/deploy.sh               # see DEPLOYMENT.md
```

- `src/catalog.mjs`: the status table (layers, products and the home's how-it-works steps), each with its evidence,
  and the Stripe Payment Link per product (all `null` today). The selling guard refuses a link while the site has no business email and address.
- `src/i18n.ts`: every word of the site in both languages. `src/routes.mjs`: the URL of each page per language.
- `src/components/`: one component per page (`Home`, `Manifesto`, `Products`, `Guide`, `NewsletterPage`, `Legal`)
  and the small parts (`Badge`, `BuyButton`, `SubscribeLink`, `NewsletterBlock`), plus the blueprint figures
  (`HeroFigure`, `RoutingFigure`, `LayersFigure`, `OwnsDiagram`). Their lines draw on when seen (script at the end
  of `src/layouts/Layout.astro`); nothing else moves.
- `scripts/build-og.py`: the OG cards and `public/plate-machine.png`, the one dithered illustration.
- `src/guide/es.mjs`, `src/guide/en.mjs`: the guide, once per language, with its sources; `render.mjs` builds the
  facts line, the inline HTML and the Markdown. `scripts/build-pdf.mjs` prints the PDFs into `public/`.
- `scripts/check-content.mjs`: after the build, fails on placeholders, forbidden promises, the retired offer's words,
  "Atlas", a newsletter cadence, a running pilot, prices outside the guide, a `<dialog>`, broken `mailto:`, a badge
  that disagrees with the catalog, or anything on sale without a business contact.
- `nginx.conf`: 301s from the old `/es/` paths, HTML revalidation, `.md` served as UTF-8 text.

## How this was made

I'm a vibe coder. I decide what to build, write the spec and the rules it has to follow, and test the result until it
does what I said. AI coding agents write the code; I don't write code by hand. Commits under my name were made by an
agent working for me.

## Licence

Code: MIT, see [LICENSE](LICENSE). The guide's text, the name and the brand are not licensed for republication.
