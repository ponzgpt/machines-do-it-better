#!/usr/bin/env node
/**
 * Prints public/guia-agente-propio.pdf and public/own-agent-guide.pdf from src/guide/<lang>.mjs with the
 * Chrome already on this Mac (headless, no new dependency; same approach as javier-ponz-site's CV PDF).
 * Writes src/guide/pdf-stamp.json with a hash of each guide, so `npm run check` fails when the guide
 * changes and the PDF has not been regenerated. Docker and CI have no Chrome: the PDFs are committed.
 *
 *   npm run pdf
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { guides, facts, factsLine, inline, fill, sourceOf, guideHash } from '../src/guide/render.mjs';
import { NEWSLETTER as NEWSLETTER_URL } from '../src/site.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const font = (p) => pathToFileURL(join(root, 'node_modules', p)).href;
const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].find((p) => existsSync(p));
if (!CHROME) { console.error('No Chrome or Chromium found: the PDF needs one. Ship web + .md and use the print stylesheet.'); process.exit(1); }

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function page(g) {
  const L = g.labels, h = (s) => inline(s, g), t = (s) => esc(fill(s, g)), f = facts(g);
  const srcLinks = (ids) => ids.map((id) => { const s = sourceOf(g, id); return `<a href="${s.url}">${esc(s.label)}</a>`; }).join(' · ');
  return `<!doctype html><html lang="${g.lang}"><head><meta charset="utf-8"><title>${esc(g.title)} · MDIB</title>
<style>
@font-face{font-family:Archivo;src:url(${font('@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2')}) format('woff2');font-weight:100 900;font-stretch:62% 125%}
@font-face{font-family:Plex;src:url(${font('@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2')}) format('woff2');font-weight:400}
@font-face{font-family:Plex;src:url(${font('@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2')}) format('woff2');font-weight:600}
@font-face{font-family:PlexMono;src:url(${font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2')}) format('woff2');font-weight:400}
@page{size:A4;margin:16mm 16mm 18mm}
*{box-sizing:border-box}
body{margin:0;font-family:Plex,Helvetica,Arial,sans-serif;font-size:10pt;line-height:1.5;color:#0b0b0b}
a{color:#0b0b0b}
h1{font-family:Archivo;font-weight:900;font-stretch:112%;font-size:40pt;line-height:.95;letter-spacing:-.03em;margin:4mm 0 0}
h2{font-family:Archivo;font-weight:850;font-stretch:106%;font-size:20pt;letter-spacing:-.02em;margin:9mm 0 3mm;break-after:avoid}
h3{font-family:Archivo;font-weight:800;font-size:13.5pt;margin:6mm 0 2mm;break-after:avoid}
.brand{font-family:PlexMono;font-size:8pt;letter-spacing:.1em;text-transform:uppercase;color:#5a5a55}
.rule{width:28mm;height:2.4mm;background:#d63a0a;margin:5mm 0}
.sub{font-size:13pt;line-height:1.4;margin:0 0 4mm;max-width:150mm}
.facts,.mono{font-family:PlexMono;font-size:8.5pt}
code{font-family:PlexMono;font-size:8.6pt;background:#f4f4f1;padding:0 2px}
.nums{display:flex;border-top:1.5pt solid #0b0b0b;margin:6mm 0}
.nums div{flex:1;padding:3mm 3mm 0 0}
.nums b{display:block;font-family:Archivo;font-weight:900;font-size:24pt;line-height:1}
.nums small{display:block;color:#5a5a55;font-size:7.8pt;margin-top:1.5mm}
.step{border-top:1.5pt solid #0b0b0b;padding-top:1mm;margin-top:5mm;break-inside:avoid-page}
.step p{margin:0 0 2mm}
.k{font-family:PlexMono;font-size:7.5pt;text-transform:uppercase;letter-spacing:.06em;color:#5a5a55}
.ex{border:1pt solid #0b0b0b;border-left:3mm solid #d63a0a;padding:2.5mm 3.5mm;margin:2mm 0}
.src{font-size:8pt;color:#5a5a55}.src a{color:#5a5a55}
.tool{border-bottom:.5pt solid #dcdcd6;padding:2mm 0;break-inside:avoid}
.tool p{margin:0 0 1mm}
ul,ol{padding-left:5mm;margin:0 0 3mm}li{margin:0 0 1mm}
.small{font-size:8.5pt;color:#333}
</style></head><body>
<p class="brand">MDIB · Machines Do It Better</p>
<h1>${esc(g.title)}</h1>
<div class="rule"></div>
<p class="sub">${t(g.subtitle)}</p>
<p class="facts">${factsLine(g).map(esc).join(' · ')}</p>
<p class="mono">mdib.technoir.cloud${g.lang === 'en' ? '/en/' : ''} · ${esc(NEWSLETTER_URL.replace('https://', ''))}</p>
<h2>${esc(L.outcomesTitle)}</h2>
<ol>${g.outcomes.map((o) => `<li>${h(o)}</li>`).join('')}</ol>
<div class="nums">${g.numbers.map((n) => `<div><b>${t(n.value)}</b>${t(n.label)}${n.note ? `<small>${h(n.note)}</small>` : ''}</div>`).join('')}</div>
<h2>${esc(L.howTitle)}</h2>
<ol>${g.howToUse.map((x) => `<li>${h(x)}</li>`).join('')}</ol>
<h2>${esc(L.methodTitle)} · ${f.steps} ${esc(L.steps)}</h2>
${g.steps.map((s, i) => `<section class="step"><h3>${esc(L.step)} ${i + 1}. ${esc(s.title)}</h3>
<p><span class="k">${esc(L.do)}</span><br>${h(s.do)}</p>
<p><span class="k">${esc(L.why)}</span><br>${h(s.why)}</p>
<div class="ex"><span class="k">${esc(L.exercise)} · ${s.exercise.minutes} ${esc(L.minutes)}</span><br>${h(s.exercise.text)}</div>
<p><b>${esc(L.trap)}.</b> ${h(s.trap)}</p>
${s.sources.length ? `<p class="src">${esc(L.sourcesTitle)}: ${srcLinks(s.sources)}</p>` : ''}</section>`).join('\n')}
<h2>${esc(L.toolsTitle)} · ${f.tools} ${esc(L.tools)}</h2>
${g.tools.map((x) => `<div class="tool"><h3 style="margin-top:1mm"><a href="${x.url}">${esc(x.name)}</a></h3>
<p><span class="k">${esc(L.toolFor)}</span> ${h(x.for)}</p>
<p><span class="k">${esc(L.toolCost)}</span> ${h(x.cost)} <span class="src">(${srcLinks([x.source])})</span></p>
<p><span class="k">${esc(L.toolTrap)}</span> ${h(x.trap)}</p></div>`).join('\n')}
<h2>${esc(L.nextTitle)}</h2>
<p>${h(g.next.intro)}</p>
<ul>${g.next.items.map((it) => `<li><b>${esc(it.title)}.</b> ${esc(it.text)} <a href="${NEWSLETTER_URL}">${esc(g.next.cta)}</a></li>`).join('')}</ul>
<h2>${esc(L.hoodTitle)}</h2>
${g.hood.map((p) => `<p>${h(p)}</p>`).join('')}
<h2>${esc(L.noticeTitle)}</h2>
${g.notice.map((p) => `<p>${h(p)}</p>`).join('')}
<h2>${esc(L.sourcesTitle)}</h2>
<p class="small">${esc(L.sourcesNote)}</p>
<ol class="small">${g.sources.map((s) => `<li><a href="${s.url}">${esc(s.label)}</a> · ${esc(s.url)}</li>`).join('')}</ol>
</body></html>`;
}

const tmp = mkdtempSync(join(tmpdir(), 'mdib-pdf-'));
const stamp = {};
try {
  for (const g of Object.values(guides)) {
    const src = join(tmp, `${g.lang}.html`);
    const out = join(root, 'public', g.files.pdf.slice(1));
    writeFileSync(src, page(g), 'utf8');
    execFileSync(CHROME, ['--headless', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files',
      `--print-to-pdf=${out}`, pathToFileURL(src).href], { stdio: 'pipe' });
    if (!existsSync(out)) throw new Error(`no PDF written at ${out}`);
    stamp[g.lang] = guideHash(g);
    console.log(`wrote ${out} (${(statSync(out).size / 1024).toFixed(0)} KB)`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
writeFileSync(join(root, 'src/guide/pdf-stamp.json'), JSON.stringify(stamp, null, 2) + '\n');
