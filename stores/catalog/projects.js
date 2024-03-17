import { createCatalogStore } from './base.js';
import { useCommonStore } from '~/stores/common.js';

export const useCatalogProjectsStore = () => {
  const commonStore = useCommonStore(); // Используем общий стор

  return createCatalogStore('projects', '/api/services/', {
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
      price: { $gte: 0, $lte: 50000 },
    },
  });
};
