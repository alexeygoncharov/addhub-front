import { createCatalogStore } from './base.js';

export const useCatalogFreelancersStore = createCatalogStore(
  'freelancers',
  '/api/users/sellers',
);
