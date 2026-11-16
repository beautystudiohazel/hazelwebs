import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
const config = await readFile('src/data/config.ts', 'utf8');
const booksyUrl = config.match(/booksyUrl:\s*'([^']*)'/)?.[1];
const email = config.match(/email:\s*'([^']*)'/)?.[1];
const expectedBooking = booksyUrl || `mailto:${email}?subject=Appointment%20inquiry`;
const routes = ['/', '/services/', '/bridal-events/', '/about-contact/', '/404.html'];
const filename = route => join('dist', route.endsWith('/') ? `${route}index.html` : route);
for (const route of routes) {
  const html = await readFile(filename(route), 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one h1`);
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /name="description"/);
  assert.doesNotMatch(html, /<script\b/, `${route}: no runtime JavaScript`);
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(raw.replaceAll('&amp;', '&'), `https://local.test${route}`);
    if (url.origin !== 'https://local.test') continue;
    await access(filename(url.pathname));
    if (url.hash) {
      const target = await readFile(filename(url.pathname), 'utf8');
      assert.ok(target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: ${raw} target exists`);
    }
  }
  for (const tag of html.matchAll(/<a\b[^>]*data-appointment[^>]*>/g)) {
    assert.ok(tag[0].includes(`href="${expectedBooking.replaceAll('&', '&amp;')}"`), `${route}: shared booking destination`);
  }
}
const menu = await readFile(filename('/services/'), 'utf8');
assert.equal((menu.match(/class="price-row"/g) || []).length, 30, 'All supplied services appear');
assert.equal((menu.match(/<dd>Contact for pricing<\/dd>/g) || []).length, 7, 'All unpriced services');
for (const price of ['From $65', 'From $90', 'From $175', '$150', '$8']) assert.ok(menu.includes(price), `Missing ${price}`);
assert.ok(!menu.includes('HydraFacial') && !menu.includes('ABUSE'));
console.log('PASS: 5 pages, internal links/anchors/assets, 30 service rows, pricing, metadata, configured booking, and zero runtime JavaScript.');
