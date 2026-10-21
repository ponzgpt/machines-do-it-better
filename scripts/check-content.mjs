// Fails the check if a page ships a [PLACEHOLDER] or a promise that operations/support-boundaries.md
// (machines-do-it-better) forbids. Scans the source so it can run before the build.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const PLACEHOLDER = /\[[A-ZÁÉÍÓÚÑ0-9][^\]\n]{0,60}\]/;
const FORBIDDEN = [
  /soporte para siempre/i, /sin mantenimiento/i, /100\s*%\s*aut[oó]nomo/i, /nunca falla/i,
  /sustituye por completo/i, /\bSLA\b/, /soporte prioritario/i, /€\s*\/\s*mes/i, /\bERP\b/, /a medida/i,
];

export function problems(text) {
  // Code ([...] in TS/JS) lives in frontmatter and <script>; only the markup is user-visible copy.
  const markup = text.replace(/^---[\s\S]*?---/, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
  const out = [];
  const ph = markup.match(PLACEHOLDER);
  if (ph) out.push(`placeholder ${ph[0]}`);
  for (const re of FORBIDDEN) if (re.test(markup)) out.push(`forbidden promise ${re}`);
  return out;
}

const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? files(join(dir, e.name)) : e.name.endsWith('.astro') ? [join(dir, e.name)] : []);

if (import.meta.url === `file://${process.argv[1]}`) {
  // Self-test: the check must catch what it exists to catch.
  if (!problems('<p>[EMAIL]</p>').length || !problems('<p>Nunca falla</p>').length || problems('<p>ok</p>').length) {
    console.error('check-content self-test failed'); process.exit(1);
  }
  const bad = files('src').flatMap((f) => problems(readFileSync(f, 'utf8')).map((p) => `${f}: ${p}`));
  if (bad.length) { console.error(bad.join('\n')); process.exit(1); }
  console.log(`check-content: ${files('src').length} pages clean`);
}
