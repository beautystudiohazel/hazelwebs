import { site } from './config';
export { site } from './config';
export const appointment = {
  href: site.booksyUrl || `mailto:${site.email}?subject=${encodeURIComponent('Appointment inquiry')}`,
  label: site.booksyUrl ? 'Book on Booksy' : 'Request an Appointment',
};
export const eventInquiry = `mailto:${site.email}?subject=${encodeURIComponent('Bridal & event inquiry')}`;
