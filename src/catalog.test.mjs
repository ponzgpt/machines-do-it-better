// The status table is the single source for badges, and nothing is sold without a business email and address.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { STATUSES, layers, products, sellingGuard } from './catalog.mjs';
import { EMAIL, ADDRESS } from './site.ts';
import { badgeProblems } from '../scripts/check-content.mjs';

test('every layer and product has a known status and a cited evidence path', () => {
  for (const i of [...layers, ...products]) {
    assert.ok(STATUSES.includes(i.status), `${i.id}: ${i.status}`);
    assert.ok(i.evidence.length > 10, `${i.id} has no evidence`);
  }
  assert.deepEqual(layers.map((l) => l.name), ['Atlas', 'Forja', 'Guardia', 'Puente']);
});

test('a badge that disagrees with the catalog fails the content check', () => {
  const [l] = layers;
  const other = STATUSES.find((s) => s !== l.status);
  assert.equal(badgeProblems(`<span data-item="${l.id}" data-status="${l.status}">`).length, 0);
  assert.equal(badgeProblems(`<span data-item="${l.id}" data-status="${other}">`).length, 1);
});

test('selling guard: a Stripe link with no business email or address fails', () => {
  const p = [{ id: 'x', status: 'available', stripeLink: 'https://buy.stripe.com/test_1', price: '9 €' }];
  assert.equal(sellingGuard(p, { email: null, address: null }).length, 1);
  assert.equal(sellingGuard(p, { email: 'a@b.c', address: null }).length, 1);
  assert.equal(sellingGuard(p, { email: 'a@b.c', address: 'Street 1' }).length, 0);
  assert.ok(sellingGuard([{ ...p[0], status: 'building' }], { email: 'a@b.c', address: 'S' }).length);
  assert.ok(sellingGuard([{ ...p[0], stripeLink: null }], { email: null, address: null }).length, 'price without link');
});

test('today: nothing is on sale and the current catalog passes the guard', () => {
  assert.ok(products.every((p) => p.stripeLink === null && p.price === null));
  assert.deepEqual(sellingGuard(products, { email: EMAIL, address: ADDRESS }), []);
});
