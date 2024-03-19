import { createCatalogStore } from './base';
import { useCommonStore } from '~/stores/common';

export const useCatalogServicesStore = () => {
  const commonStore = useCommonStore();

  return createCatalogStore('services', '/api/services/', {
    initialFilters: {
      price: {
        min: 0,
        max: 50000,
      },
      category: {
        title: 'Категории',
        type: 'radio',
        list: commonStore.categories,
      },
      city: { title: 'Города', type: 'radio', list: commonStore.cities },
    },
    filters: {
      price: {},
    },
  });
};
