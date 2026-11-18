/**
 * EDIT THIS FILE to change public contact details, menu links, services, or prices.
 * Prices are US dollars. Use price: null for "Contact for pricing".
 * Add from: true only when a price is a starting price.
 * Featured services appear in the photo cards; homeHighlight appears on Home.
 * Changes become public after `npm run build` and redeploying dist/.
 */
export const site = {
  name: 'Hazel Beauty Studio',
  email: 'beautystudiohazel@gmail.com',
  phone: '+1 (847)630-1139', // Confirmed public phone number.
  address: '619 E Boughton Rd Ste 143-p, Bolingbrook, IL 60440',
  city: 'Bolingbrook',
  hours: 'Everyday 10am-7pm, By Appointment Only',
  instagramUrl: 'https://www.instagram.com/hazel.beauty.studio/',
  mapUrl: '',
  booksyUrl: 'https://hazelbeautystudio.booksy.com',
  showRealWork: false, // Set true only after client permission to publish IMG_7009.jpg is confirmed.
  logoPath: '', // original supplied logo, e.g. /images/hazels-logo.png
  siteUrl: '', // final HTTPS domain; enables canonical URLs
};
// Header and footer links. Use a path beginning with / for site pages.
export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/services/', label: 'Services & Pricing' },
  { href: '/bridal-events/', label: 'Bridal & Events' },
  { href: '/about-contact/', label: 'About & Contact' },
];

// Links above the service photos. Change labels or destinations here.
export const serviceBrowseLinks = [
  { href: '#full-menu', label: 'All Services' },
  { href: '#cuts', label: 'Hair' },
  { href: '#skin-care', label: 'Skin Care' },
  { href: '#waxing', label: 'Waxing' },
  { href: '#makeup-events', label: 'Makeup & Events' },
];

// All service categories and prices. Add, remove, or reorder items here.
export type Service = { name: string; price: number | null; from?: boolean; note?: string; homeHighlight?: boolean; featuredPhoto?: 'beauty' | 'haircut' | 'portrait' | 'makeup'; eventDescription?: string };
export type Category = { id: string; name: string; intro: string; services: Service[] };
export const categories: Category[] = [
  { id: 'skin-care', name: 'Skin Care', intro: 'A little time devoted to your skin.', services: [
    { name: 'Regular Full Facial', price: 75, homeHighlight: true, featuredPhoto: 'beauty' }, { name: 'Brightening Facial', price: 85 },
    { name: 'Korean Glass Skin Facial', price: 100 }, { name: 'Facial with Light Therapy', price: 150, note: 'Service name to be confirmed. Please inquire for details.' },
  ]},
  { id: 'cuts', name: 'Cuts', intro: 'From a simple trim to a new shape.', services: [
    { name: 'Regular Trim', price: 45 }, { name: 'Layer Cut', price: 55 }, { name: 'Cut & Style', price: 65, homeHighlight: true, featuredPhoto: 'haircut' },
    { name: 'Curtain Bangs', price: 20 }, { name: 'Men’s Cut', price: 30 }, { name: 'Kids’ Cut', price: 20 },
  ]},
  { id: 'styling', name: 'Styling', intro: 'Everyday styling and occasion-ready hair.', services: [
    { name: 'Blow Dry', price: 55 }, { name: 'Hair Curls', price: 60 }, { name: 'Wash & Blow Dry', price: 50 },
  ]},
  { id: 'color', name: 'Color', intro: 'Color and highlights, with clear starting prices.', services: [
    { name: 'Hair Color', price: 65, from: true, homeHighlight: true, featuredPhoto: 'portrait' }, { name: 'Full Hair Color', price: 90, from: true },
    { name: 'Partial Highlights', price: 100 }, { name: 'Full Highlights', price: 175, from: true },
  ]},
  { id: 'waxing', name: 'Waxing', intro: 'Face and body waxing.', services: [
    { name: 'Full Arms', price: 35 }, { name: 'Underarms', price: 15 }, { name: 'Full Legs', price: 50 },
    { name: 'Bikini', price: 35 }, { name: 'Brazilian', price: 65 }, { name: 'Eyebrows', price: 8, homeHighlight: true },
  ]},
  { id: 'specialty-treatments', name: 'Specialty Treatments', intro: 'Get in touch to discuss a treatment and pricing.', services: [
    { name: 'Brazilian Blowout', price: null }, { name: 'Hair Protein Treatment', price: null }, { name: 'Keratin Treatment', price: null },
  ]},
  { id: 'makeup-events', name: 'Makeup & Events', intro: 'Beauty for the dates you look forward to.', services: [
    { name: 'Bridal Makeup', price: null, featuredPhoto: 'makeup', eventDescription: 'Makeup for your wedding day. Tell us about the look you have in mind.' }, { name: 'Party Makeup', price: null, eventDescription: 'Makeup for celebrations and special occasions.' }, { name: 'Bridal Hairstyle', price: null, eventDescription: 'Styling for your bridal look. Get in touch to discuss your ideas.' }, { name: 'Henna Party Booking', price: null, eventDescription: 'Bring henna to your celebration. Contact us to discuss your party.' },
  ]},
];
