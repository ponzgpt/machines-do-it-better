export const OWNER = 'Javier Ponz';
export const BRAND = 'Machines Do It Better';
export const OWNER_SITE = 'https://javierponz.technoir.cloud';
export const REPO = 'https://github.com/ponzgpt/machines-do-it-better';
// The only call to action: a plain outbound link (no embed, no script), so a visit still makes no third-party request.
export const NEWSLETTER = 'https://machinesdoitbetter.beehiiv.com';
// Beehiiv's own subscribe page (checked 2026-11-14: it does not prefill an email from the URL, so we link, not post).
export const NEWSLETTER_SUBSCRIBE = `${NEWSLETTER}/subscribe`;
export const NEWSLETTER_ARCHIVE = `${NEWSLETTER}/archive`;
// Not published yet (spam). While null, nothing on the site may build a mailto: or show an address from them.
// BEFORE THE FIRST stripeLink IN src/catalog.mjs: set a business email and a business postal address here and
// review the legal pages for distance selling (terms, refunds for digital goods, VAT wording). The build fails
// (scripts/check-content.mjs) if anything is on sale while either is null.
export const EMAIL: string | null = null;
export const ADDRESS: string | null = null;
