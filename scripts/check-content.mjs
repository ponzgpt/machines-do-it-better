// Runs after the build: fails if a built page shows a [PLACEHOLDER], a personal email, or a promise that
// operations/support-boundaries.md (machines-do-it-better) forbids, in either language.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const PLACEHOLDER = /\[[A-ZÁÉÍÓÚÑ0-9][^\]\n]{0,60}\]/;
const FORBIDDEN = [
  /soporte para siempre/i, /sin mantenimiento/i, /100\s*%\s*aut[oó]nomo/i, /nunca falla/i, /sustituye por completo/i,
  /support forever/i, /maintenance[- ]free/i, /100\s*%\s*autonomous/i, /never fails/i, /fully replaces/i,
  /\bSLA\b/, /soporte prioritario/i, /priority support/i, /\/\s*(mes|month)\b/i, /\bERP\b/, /a medida/i, /bespoke/i,
  /@gmail\.com/i,
];

/** Visible text of an HTML page: no scripts, styles or tags. */
export const visibleText = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');

export function problems(html) {
  const text = visibleText(html);
  const out = [];
  const ph = text.match(PLACEHOLDER);
  if (ph) out.push(`placeholder ${ph[0]}`);
  for (const re of FORBIDDEN) if (re.test(text) || (re.source.includes('gmail') && re.test(html))) out.push(`forbidden ${re}`);
  return out;
}

const pages = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? pages(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : []);

if (import.meta.url === `file://${process.argv[1]}`) {
  // Self-test: the check must catch what it exists to catch.
  if (!problems('<p>[EMAIL]</p>').length || !problems('<p>Never fails</p>').length
    || !problems('<a href="mailto:x@gmail.com">x</a>').length || problems('<p>ok</p><script>a[0]</script>').length) {
    console.error('check-content self-test failed'); process.exit(1);
  }
  const files = pages('dist');
  const bad = files.flatMap((f) => problems(readFileSync(f, 'utf8')).map((p) => `${f}: ${p}`));
  if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
  console.log(`check-content: ${files.length} built pages clean`);
}
