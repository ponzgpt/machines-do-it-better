// Runs after the build: fails if a built page or the guide's .md shows a [PLACEHOLDER], a personal email,
// a broken mailto, a promise operations/support-boundaries.md (ponzgpt/mdib-ops) forbids, or anything of the
// retired offer (diagnosis calls, sessions, guarantees, testimonials), in either language.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { products, layers, sellingGuard } from '../src/catalog.mjs';
import { EMAIL, ADDRESS } from '../src/site.ts';

const PLACEHOLDER = /\[[A-ZÁÉÍÓÚÑ0-9][^\]\n]{0,60}\]/;
const FORBIDDEN = [
  // support-boundaries.md
  /soporte para siempre/i, /sin mantenimiento/i, /100\s*%\s*aut[oó]nomo/i, /nunca falla/i, /sustituye por completo/i,
  /support forever/i, /maintenance[- ]free/i, /100\s*%\s*autonomous/i, /never fails/i, /fully replaces/i,
  /\bSLA\b/, /soporte prioritario/i, /priority support/i, /\/\s*(mes|month)\b/i, /\bERP\b/, /a medida/i, /bespoke/i,
  // the retired Founder Pilot: no calls, sessions, guarantees or testimonials (decision of 2026-11-13)
  /diagn[oó]s/i, /llamada/i, /videollamada/i, /\bsesi[oó]n/i, /\bsesiones\b/i, /garantiz/i, /garant[ií]a/i,
  /\bdiagnos/i, /\bsessions?\b/i, /\bguarantee/i, /\b(book|discovery|video) a? ?call/i, /piloto fundador/i, /founder pilot/i,
  /testimoni/i, /rese[ñn]as? de clientes/i, /\bclient reviews?\b/i, /★/,
  /@gmail\.com/i,
];
// Checked against the raw file, not just the visible text.
const RAW = [/mailto:(null|undefined)\b/i, /mailto:["'?]/i, /@gmail\.com/i];

/** Visible text of an HTML page: no scripts, styles or tags. */
export const visibleText = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');

export function problems(file) {
  // In Markdown, a link's [text](url) is not a placeholder: keep only the text.
  const text = /<html/i.test(file) ? visibleText(file) : file.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
  const out = [];
  const ph = text.match(PLACEHOLDER);
  if (ph) out.push(`placeholder ${ph[0]}`);
  for (const re of FORBIDDEN) if (re.test(text)) out.push(`forbidden ${re}`);
  for (const re of RAW) if (re.test(file)) out.push(`forbidden in source ${re}`);
  return out;
}

// Every status badge in the built HTML must say what src/catalog.mjs says for its item.
const STATUS_OF = Object.fromEntries([...layers, ...products].map((i) => [i.id, i.status]));
export const badgeProblems = (html) => [...html.matchAll(/data-item="([^"]+)" data-status="([^"]+)"/g)]
  .filter(([, id, st]) => STATUS_OF[id] !== st).map(([, id, st]) => `badge for ${id} says ${st}, catalog says ${STATUS_OF[id]}`);

const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? files(join(dir, e.name)) : /\.(html|md)$/.test(e.name) ? [join(dir, e.name)] : []);

if (import.meta.url === `file://${process.argv[1]}`) {
  // Self-test: the check must catch what it exists to catch, and nothing it shouldn't.
  const must = ['<html><p>[EMAIL]</p></html>', '<html><p>Never fails</p></html>', '<html><a href="mailto:x@gmail.com">x</a></html>',
    '<html><a href="mailto:null?subject=x">Book</a></html>', '<html><p>Reserva tu diagnóstico</p></html>', '<html><p>una llamada</p></html>',
    '<html><p>Sesión de entrega</p></html>', '<html><p>Te lo garantizo</p></html>', '<html><p>Testimonios</p></html>'];
  const mustNot = ['<html><p>ok</p><script>a[0]</script></html>', '# Guía\n\n- [Fuente](https://example.com)\n'];
  if (must.some((h) => !problems(h).length) || mustNot.some((h) => problems(h).length)) {
    console.error('check-content self-test failed'); process.exit(1);
  }
  // Nothing may be sold while the site has no business email and postal address (decision of 2026-11-14).
  const guard = sellingGuard(products, { email: EMAIL, address: ADDRESS });
  if (sellingGuard([{ id: 't', status: 'available', stripeLink: 'https://buy.stripe.com/x', price: '1' }], { email: null, address: 'a' }).length === 0) {
    console.error('check-content self-test failed (selling guard)'); process.exit(1);
  }
  if (guard.length) { console.error(guard.join('\n')); process.exit(1); }
  const all = files('dist');
  const bad = all.flatMap((f) => {
    const src = readFileSync(f, 'utf8');
    return [...problems(src), ...badgeProblems(src)].map((p) => `${f}: ${p}`);
  });
  if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
  console.log(`check-content: ${all.length} built files clean (${all.filter((f) => f.endsWith('.md')).length} .md)`);
}
