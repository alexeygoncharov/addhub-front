import { createCatalogStore } from './base';
import type { servicesItem } from './catalog.type';
export const useCatalogServicesStore = createCatalogStore<servicesItem>(
  'services',
  '/api/services/',
  {
    initialFilters: {
      price: {
        min: 0,
        max: 50000,
      },
      categories: {
        title: 'Категории',
        type: 'radio',
        list: [],
      },
      city: { title: 'Города', type: 'radio', list: [] },
    },
    filters: {},
  },
);
export type ServicesStore = ReturnType<typeof useCatalogServicesStore>;
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCatalogServicesStore, import.meta.hot),
  );
}
