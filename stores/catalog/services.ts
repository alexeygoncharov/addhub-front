import { createCatalogStore } from './base';
import type { servicesItem } from './catalog.type';
export const useCatalogServicesStore = createCatalogStore<servicesItem>(
  'services',
  '/api/services/',
  '/services',
  {
    price: {
      $gte: 0,
      $lte: 50000,
      type: 'range',
    },
    category: {
      title: 'Категории',
      type: 'radio',
      list: [],
    },
    'address.city': {
      title: 'Города',
      type: 'check',
      list: [],
      hasSearch: true,
    },
  },
);
export type ServicesStore = ReturnType<typeof useCatalogServicesStore>;
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCatalogServicesStore, import.meta.hot),
  );
}
