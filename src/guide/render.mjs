// Turns a guide object (es.mjs / en.mjs) into what the site ships: the facts line, inline HTML for the page,
// the Markdown "for your agent" and the HTML the PDF is printed from. Every number in the facts line is
// computed from the content, never typed by hand.
import es from './es.mjs';
import en from './en.mjs';

export const guides = { es, en };

const WPM = 200; // ponytail: one reading speed for both languages; good enough for a "minutes of reading" estimate.
const words = (s) => s.split(/\s+/).filter(Boolean).length;

/** Plain text of everything a reader reads (no agent brief, no URLs). */
function readable(g) {
  const parts = [g.title, g.subtitle, ...g.outcomes, ...g.numbers.flatMap((n) => [n.value, n.label, n.note ?? '']), ...g.howToUse,
    ...g.steps.flatMap((s) => [s.title, s.do, s.why, s.exercise.text, s.trap]),
    ...g.tools.flatMap((t) => [t.name, t.for, t.cost, t.trap]),
    g.next.intro, ...g.next.items.flatMap((i) => [i.title, i.text]), ...g.hood, ...g.notice];
  return parts.join(' ').replace(/\]\([^)]*\)/g, ']');
}

export function facts(g) {
  const handsOn = g.steps.reduce((sum, s) => sum + s.exercise.minutes, 0);
  return { steps: g.steps.length, tools: g.tools.length, handsOn, reading: Math.ceil(words(readable(g)) / WPM) };
}

export const duration = (min) => {
  const h = Math.floor(min / 60), m = min % 60;
  return h ? `${h} h${m ? ` ${m} min` : ''}` : `${m} min`;
};

export const editionLabel = (g) =>
  new Intl.DateTimeFormat(g.lang === 'es' ? 'es-ES' : 'en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${g.edition}-01T00:00:00Z`));

/** Replaces {steps}, {tools}, {reading}, {handsOn} and {edition} with the computed values. */
export function fill(s, g) {
  const f = facts(g);
  return s.replace(/\{steps\}/g, String(f.steps)).replace(/\{tools\}/g, String(f.tools))
    .replace(/\{reading\}/g, duration(f.reading)).replace(/\{handsOn\}/g, duration(f.handsOn))
    .replace(/\{edition\}/g, editionLabel(g));
}

export function factsLine(g) {
  const f = facts(g), L = g.labels;
  return [`${L.edition} ${editionLabel(g)}`, `${duration(f.reading)} ${L.reading}`, `${duration(f.handsOn)} ${L.handsOn}`,
    `${f.steps} ${L.steps}`, `${f.tools} ${L.tools}`];
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** The guide's only inline markup, `code` and [text](url), as HTML. Links leave the site in a new tab. */
export function inline(s, g) {
  return esc(fill(s, g))
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

export const sourceOf = (g, id) => g.sources.find((s) => s.id === id);

/** The whole guide as clean Markdown, opening with a brief addressed to the reader's AI assistant. */
export function toMarkdown(g, { newsletter } = {}) {
  const L = g.labels, t = (s) => fill(s, g);
  const src = (ids) => ids.map((id) => { const s = sourceOf(g, id); return `[${s.label}](${s.url})`; }).join(' · ');
  const out = [];
  out.push(g.lang === 'es' ? '> **Para el asistente de IA que lee esto**' : '> **For the AI assistant reading this**', '>');
  g.agentBrief.forEach((b, i) => out.push(`> ${i + 1}. ${t(b)}`));
  out.push('', `# ${g.title}`, '', t(g.subtitle), '', factsLine(g).join(' · '), '');
  out.push(`## ${L.outcomesTitle.replace(/:$/, '')}`, '', ...g.outcomes.map((o) => `- ${t(o)}`), '');
  out.push(...g.numbers.map((n) => `- **${t(n.value)}** ${t(n.label)}${n.note ? `. ${t(n.note)}` : ''}`), '');
  out.push(`## ${L.howTitle}`, '', ...g.howToUse.map((h, i) => `${i + 1}. ${t(h)}`), '');
  out.push(`## ${L.methodTitle}`, '');
  g.steps.forEach((s, i) => {
    out.push(`### ${L.step} ${i + 1}. ${s.title}`, '', `**${L.do}.** ${t(s.do)}`, '', `**${L.why}.** ${t(s.why)}`, '',
      `**${L.exercise} (${s.exercise.minutes} ${L.minutes}).** ${t(s.exercise.text)}`, '', `**${L.trap}.** ${t(s.trap)}`, '');
    if (s.sources.length) out.push(`${L.sourcesTitle}: ${src(s.sources)}`, '');
  });
  out.push(`## ${L.toolsTitle}`, '');
  g.tools.forEach((tool) => out.push(`### [${tool.name}](${tool.url})`, '', `- **${L.toolFor}:** ${t(tool.for)}`,
    `- **${L.toolCost}:** ${t(tool.cost)} (${L.source}: ${src([tool.source])})`, `- **${L.toolTrap}:** ${t(tool.trap)}`, ''));
  out.push(`## ${L.nextTitle}`, '', t(g.next.intro), '');
  g.next.items.forEach((it) => out.push(`- **${it.title}.** ${it.text}${newsletter ? ` [${g.next.cta}](${newsletter})` : ''}`));
  out.push('', `## ${L.hoodTitle}`, '', ...g.hood.flatMap((p) => [t(p), '']));
  out.push(`## ${L.noticeTitle}`, '', ...g.notice.flatMap((p) => [t(p), '']));
  out.push(`## ${L.sourcesTitle}`, '', L.sourcesNote, '', ...g.sources.map((s) => `- [${s.label}](${s.url})`), '');
  return out.join('\n');
}
