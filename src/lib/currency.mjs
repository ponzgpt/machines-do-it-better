// Pilot price in the visitor's currency. GBP is the source of truth (machines-do-it-better
// strategy/offer-v0.md); EUR and USD are rounded conversions.
// ponytail: fixed table, not live FX; revisit when GBP moves >5% or the final price is set.
export const PILOT = {
  GBP: [100, 250],
  EUR: [120, 290],
  USD: [130, 330],
};

const GBP_ZONES = ['Europe/London', 'Europe/Belfast', 'Europe/Guernsey', 'Europe/Jersey', 'Europe/Isle_of_Man', 'Europe/Gibraltar'];
const EUR_ZONES = [
  'Europe/Madrid', 'Atlantic/Canary', 'Africa/Ceuta', 'Europe/Lisbon', 'Atlantic/Madeira', 'Atlantic/Azores',
  'Europe/Paris', 'Europe/Monaco', 'Europe/Andorra', 'Europe/Berlin', 'Europe/Busingen', 'Europe/Rome', 'Europe/Vatican',
  'Europe/San_Marino', 'Europe/Malta', 'Europe/Amsterdam', 'Europe/Brussels', 'Europe/Luxembourg', 'Europe/Vienna',
  'Europe/Dublin', 'Europe/Helsinki', 'Europe/Mariehamn', 'Europe/Athens', 'Asia/Nicosia', 'Asia/Famagusta',
  'Europe/Bratislava', 'Europe/Ljubljana', 'Europe/Zagreb', 'Europe/Tallinn', 'Europe/Riga', 'Europe/Vilnius',
  'Europe/Podgorica',
];
const GBP_REGIONS = ['GB', 'GG', 'JE', 'IM', 'GI'];
const EUR_REGIONS = ['ES', 'PT', 'FR', 'MC', 'AD', 'DE', 'IT', 'VA', 'SM', 'MT', 'NL', 'BE', 'LU', 'AT', 'IE', 'FI', 'AX',
  'GR', 'CY', 'SK', 'SI', 'HR', 'EE', 'LV', 'LT', 'ME'];

/** Where the visitor is (time zone) beats what language they speak; unknown means USD. */
export function detectCurrency(timeZone = '', languages = []) {
  if (GBP_ZONES.includes(timeZone)) return 'GBP';
  if (EUR_ZONES.includes(timeZone)) return 'EUR';
  if (timeZone) return 'USD';
  const regions = languages.map((l) => l.split('-')[1]?.toUpperCase()).filter(Boolean);
  if (regions.some((r) => GBP_REGIONS.includes(r))) return 'GBP';
  if (regions.some((r) => EUR_REGIONS.includes(r))) return 'EUR';
  return 'USD';
}

// Each currency is written the way its own market writes it ("$130", "£100"); only euros follow the page language.
const LOCALE = { USD: 'en-US', GBP: 'en-GB', EUR: { en: 'en-IE', es: 'es-ES' } };

export function formatRange(currency, lang = 'en') {
  const cur = PILOT[currency] ? currency : 'USD';
  const [lo, hi] = PILOT[cur];
  const locale = typeof LOCALE[cur] === 'string' ? LOCALE[cur] : LOCALE[cur][lang] ?? 'en-IE';
  const f = new Intl.NumberFormat(locale, { style: 'currency', currency: cur, maximumFractionDigits: 0 });
  return `${f.format(lo)}–${f.format(hi)}`;
}
