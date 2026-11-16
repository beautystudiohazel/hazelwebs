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
  for (const href of ['/services/', '/bridal-events/', '/about-contact/']) {
    assert.ok(html.includes(`href="${href}"`), `${route}: main destinations remain reachable`);
  }
  assert.match(html, /<details class="mobile-nav">/, `${route}: native mobile menu`);
  assert.match(html, /<summary>/, `${route}: keyboard-operable mobile menu`);
  assert.match(html, /href="#main"/, `${route}: skip navigation link`);
  assert.match(html, /href="\/favicon.svg"/, `${route}: site icon`);
  assert.match(html, /class="header-logo"/, `${route}: shared studio logo in header`);
  assert.match(html, /class="header-brand-name"/, `${route}: readable studio name in header`);
  assert.match(html, /class="footer-logo"/, `${route}: shared studio logo in footer`);
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
assert.ok(menu.indexOf('data-appointment') < menu.indexOf('id="full-menu"'), 'Booking is reachable before the full menu');
const home = await readFile(filename('/'), 'utf8');
assert.equal((home.match(/class="services-overview-column"/g) || []).length, 3, 'Homepage categories do not repeat the bridal and events feature');
assert.ok(home.includes('class="header-logo"') && home.includes('class="footer-logo"'), 'Homepage carries the matching header and footer logo');
const events = await readFile(filename('/bridal-events/'), 'utf8');
assert.ok(events.includes(`mailto:${email}?subject=Bridal%20%26%20event%20inquiry`), 'Event inquiry keeps its email destination');
const contact = await readFile(filename('/about-contact/'), 'utf8');
assert.ok(contact.includes('id="contact"'), 'Existing contact deep links keep working');
assert.equal((menu.match(/class="price-row"/g) || []).length, 30, 'All supplied services appear');
assert.equal((menu.match(/<dd>Contact for pricing<\/dd>/g) || []).length, 7, 'All unpriced services');
for (const price of ['From $65', 'From $90', 'From $175', '$150', '$8']) assert.ok(menu.includes(price), `Missing ${price}`);
assert.ok(!menu.includes('HydraFacial') && !menu.includes('ABUSE'));
console.log('PASS: 5 pages, internal links/anchors/assets, 30 service rows, pricing, metadata, configured booking, and zero runtime JavaScript.');
