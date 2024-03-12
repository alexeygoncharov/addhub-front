import { createCatalogStore } from './base.js';

export const useCatalogProjectsStore = createCatalogStore(
  'projects',
  '/api/services/',
);
