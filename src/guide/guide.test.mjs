// Fails if the facts line or any "N steps/tools" in the prose disagrees with the content, or if the two
// language versions drift apart in shape.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { guides, facts, factsLine, toMarkdown, fill, guideHash } from './render.mjs';

for (const [lang, g] of Object.entries(guides)) {
  test(`${lang}: facts line matches the content`, () => {
    const md = toMarkdown(g);
    const f = facts(g);
    const stepHeads = md.match(new RegExp(`^### ${g.labels.step} \\d+\\. `, 'gm')) ?? [];
    const toolHeads = md.match(/^### \[/gm) ?? [];
    assert.equal(stepHeads.length, f.steps);
    assert.equal(toolHeads.length, f.tools);
    const line = factsLine(g).join(' · ');
    assert.ok(line.includes(`${stepHeads.length} ${g.labels.steps}`), line);
    assert.ok(line.includes(`${toolHeads.length} ${g.labels.tools}`), line);
    // Any count written in the prose ("8 pasos", "in 8 steps") must be the real one.
    for (const [, n, what] of md.matchAll(new RegExp(`(\\d+) (${g.labels.steps}|${g.labels.tools})\\b`, 'g')))
      assert.equal(Number(n), what === g.labels.steps ? f.steps : f.tools, `"${n} ${what}"`);
    assert.ok(!/\{(steps|tools|reading|handsOn|edition)\}/.test(md), 'unfilled token');
  });

  test(`${lang}: every source id exists and every tool is taught in a step`, () => {
    const ids = new Set(g.sources.map((s) => s.id));
    for (const s of g.steps) for (const id of s.sources) assert.ok(ids.has(id), id);
    for (const t of g.tools) assert.ok(ids.has(t.source), t.source);
    const steps = g.steps.map((s) => fill(s.do, g)).join(' ');
    for (const t of g.tools) assert.ok(steps.includes(t.name.split(' ')[0]), `${t.name} is never taught`);
  });
}

test('es and en have the same shape', () => {
  const shape = (g) => [g.steps.map((s) => [s.exercise.minutes, s.sources.join()]), g.tools.map((t) => t.source), g.sources.map((s) => s.id + s.url), g.numbers.length, g.outcomes.length, g.edition];
  assert.deepEqual(shape(guides.es), shape(guides.en));
});

test('the committed PDFs were printed from the current guide (run `npm run pdf` after editing it)', () => {
  const stamp = JSON.parse(readFileSync(new URL('./pdf-stamp.json', import.meta.url), 'utf8'));
  for (const [lang, g] of Object.entries(guides)) assert.equal(stamp[lang], guideHash(g), `${lang} PDF is stale`);
});
