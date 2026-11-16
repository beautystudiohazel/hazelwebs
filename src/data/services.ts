import { categories, type Service } from './config';
export { categories, type Service, type Category } from './config';
export const priceLabel = (service: Service) => service.price === null ? 'Contact for pricing' : `${service.from ? 'From ' : ''}$${service.price}`;
export const highlights = categories.flatMap(category => category.services).filter(service => service.homeHighlight);
export const featured = categories.flatMap(category => category.services.filter(service => service.featuredPhoto).map(service => ({ service, category })));
