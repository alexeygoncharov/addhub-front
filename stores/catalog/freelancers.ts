import { createCatalogStore } from './base';
import { useCommonStore } from '~/stores/common';

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
