import { createCatalogStore } from './base.js';
import { useCommonStore } from '~/stores/common.js';

export const useCatalogFreelancersStore = () => {
  const commonStore = useCommonStore();

  return createCatalogStore('freelancers', '/api/users/sellers', {
    initialFilters: {
      category: {
        title: 'Категории',
        type: 'radio',
        list: commonStore.categories,
      },
      city: { title: 'Города', type: 'radio', list: commonStore.cities },
    },
    filters: {},
  });
};
