import { createCatalogStore } from './base.js';

export const useCatalogServicesStore = createCatalogStore(
  'services',
  '/api/services/',
);
