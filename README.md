# Hazel’s Hair & Skin

An Astro + CSS static website, prepared for Cloudflare Pages. Four content pages plus a custom 404. No server adapter, database, accounts, analytics, forms, or custom scheduling. Navigation works without JavaScript. Fonts and responsive WebP images are served locally.

## Local setup

Use Node 22.12+ (Node 24 LTS recommended) and npm.

```sh
npm ci
npm run dev
```

Open the local address printed by Astro (normally http://localhost:4321).

```sh
npm run check
npm run build
npm test
npm run preview
```

The production files are in `dist/`. Test the output with the preview server, not by opening HTML through a file URL. The lockfile pins the installed dependency versions. `npm test` validates generated pages, internal links, assets, service rows, and appointment links; run a build first.

## Cloudflare Pages

This project is prepared for Cloudflare Pages; it has not been deployed to a Cloudflare account.

1. Push this project to your Git repository and create a Cloudflare **Pages** project connected to it.
2. Framework preset: **Astro**.
3. Root directory: repository root (or the directory containing this package.json).
4. Build command: `npm run build`.
5. Build output directory: `dist`.
6. Set `NODE_VERSION` to `24` in the build environment. No runtime environment variables or bindings are required.
7. Select your production branch. Deploy, attach your domain, and update `siteUrl` in `src/data/config.ts` to the final HTTPS origin; rebuild.

Alternatively upload the built `dist` directory through Cloudflare Pages Direct Upload. No Cloudflare adapter, Workers code, or Functions directory is needed. `_headers` sets security headers and caching for hashed assets. The root `404.html` provides the missing-page response.

Official reference: https://docs.astro.build/en/guides/deploy/cloudflare/

## Updating the site

### Prices and services

Edit **`src/data/config.ts`**. All 30 services, their prices, featured photo cards, and home-page highlights come from this file. Mark any service with `homeHighlight: true` or `featuredPhoto: 'beauty'` (or another supported photo slot) to show it there. Numeric `price` values are USD. Set `from: true` only for a supplied starting price; set `price: null` for “Contact for pricing.” Rename or remove the light-therapy note only after the owner confirms the service name. Do not add the unclear “ABUSE” item without clarification. Service names can be changed without updating a separate highlight list. The service menu and photo cards draw from the same entries.

### Contact, menu links, logo, and domain

Edit **`src/data/config.ts`**. This is the single owner-editable file. It contains contact information, header/footer navigation, service category links, service names, descriptions, and prices. Unconfirmed details are deliberately empty and appear as “to be confirmed,” with no dead links.

- `email`: confirmed inbox, used everywhere.
- `phone`: confirmed number with country code; automatically becomes a telephone link.
- `address`, `city`, `hours`: confirmed studio details. Hours can contain `\n` line breaks. City automatically appears in page titles and descriptions once filled.
- `instagramUrl`, `mapUrl`: full HTTPS links. They appear only after being set.
- `siteUrl`: final full HTTPS domain, used for canonical URLs.
- `navigation`: header and footer links. `serviceBrowseLinks`: links above the service photos. `categories`: full service menu and category names. Keep each category `id` unique because links point to it.
- `logoPath`: copy the **original owner-supplied logo** into `public/images/`, then set e.g. `/images/hazels-logo.png`. It appears prominently in the Home introduction and About page. The About page can display this asset when configured. The current header uses a text wordmark for the renamed Hazel Beauty Studio. Set `logoPath` only after a matching original logo file is available.

### Booksy booking

The owner-provided Booksy booking URL is set in **`site.booksyUrl`** in `src/data/config.ts`. Every `data-appointment` button uses the shared `BookingLink.astro` component, links to Booksy, and says “Book on Booksy.” Change this one value to update the booking destination. Leave it blank to restore “Request an Appointment” by email. Event-specific inquiries continue to use email.

### Images and future portfolio

Replace files in **`src/assets/`**, or change their imports in `src/components/Photo.astro`. The named slots are `mockupHero` (home hero from the supplied mockup), `portrait` (hair/color), `beauty` (facial), `haircut` (hair), and `makeup` (events). Update their alt text and any captions at the same time. Use high-resolution licensed JPEG/PNG/WebP sources; Astro generates responsive WebP variants at build time. The hero loads eagerly; lower images load lazily. Crop positions and displayed heights live in `src/styles/global.css`.

Temporary editorial photos are not actual Hazel’s clients, premises, products used, or portfolio work. Source URLs and license are in `IMAGE-CREDITS.md`. The visible footer and experience captions make this distinction explicit. Retain editorial labels until those images are replaced. The small real-work section near the bottom is hidden by default with `site.showRealWork` in `src/data/config.ts`. After confirming client permission to publish `hair-work-2.jpg` (supplied as `IMG_7009.jpg`), set it to `true` to show one portrait photo. The owner introduction uses the supplied `owner.jpg`. Keep stock imagery labelled as editorial; add further portfolio work only with suitable client permissions and accurate service labels.

### Text and layout

Pages are in `src/pages/`; editable navigation data is in `src/data/config.ts`, and its display, metadata, and footer are in `src/layouts/Layout.astro`. Colors, spacing, responsive breakpoints, reduced-motion rules, and keyboard focus styles are in `src/styles/global.css`. The mobile menu uses native `<details>` and works without JavaScript.

## Owner checklist before launch

- [ ] Supply the separate original Hazel’s Hair & Skin logo file (SVG or high-resolution transparent PNG preferred) to replace the crop from the supplied mockup. Add it through `logoPath`.
- [ ] Provide the referenced Pinterest screenshots if their visual direction still needs review.
- [x] Confirm the public phone number, full studio address, city/state, postal code, and business hours.
- [ ] Provide the official Instagram URL and the correct map/directions link, or confirm they should stay unavailable.
- [ ] Confirm access to `beautystudiohazel@gmail.com` and test an appointment and event inquiry.
- [ ] Confirm all 30 service names and prices, especially “Facial with Light Therapy,” and whether listed starting prices are current.
- [ ] Clarify the omitted “ABUSE” item before adding any service for it.
- [ ] Provide genuine studio exterior/interior photographs and approved hair, skin care, makeup, bridal styling, and henna work photographs, with permission for all identifiable clients. Until available, approve the labeled temporary imagery; real portfolio photos are not a prerequisite for this editorial version.
- [x] Provide the Booksy booking URL.
- [ ] Choose the production domain and set `siteUrl`.
- [ ] Review the site on phone/tablet/desktop, verify phone/map/social links after filling them in, and test the Booksy destination when enabled.

The original logo and owner biography are outstanding inputs. The public phone number, address, and hours were confirmed by the owner. No founder biography, credentials, awards, testimonials, packages, durations, or guaranteed results are invented.
# hazelwebs
