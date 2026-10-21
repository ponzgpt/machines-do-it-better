import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detectCurrency, formatRange } from './currency.mjs';

test('time zone decides the currency', () => {
  assert.equal(detectCurrency('Europe/London', ['es-ES']), 'GBP');
  assert.equal(detectCurrency('Europe/Madrid', ['en-GB']), 'EUR');
  assert.equal(detectCurrency('America/Mexico_City', ['es-MX']), 'USD');
  assert.equal(detectCurrency('Europe/Belgrade', []), 'USD');
});

test('without a time zone, language region decides; unknown is USD', () => {
  assert.equal(detectCurrency('', ['en-GB']), 'GBP');
  assert.equal(detectCurrency('', ['es-ES', 'en']), 'EUR');
  assert.equal(detectCurrency('', ['es']), 'USD');
  assert.equal(detectCurrency(), 'USD');
});

test('ranges format in the right currency', () => {
  assert.equal(formatRange('GBP', 'es'), '£100–£250');
  assert.equal(formatRange('USD', 'es'), '$130–$330');
  assert.equal(formatRange('EUR', 'en'), '€120–€290');
  assert.match(formatRange('EUR', 'es'), /^120\s€–290\s€$/);
  assert.equal(formatRange('XYZ'), '$130–$330');
});
