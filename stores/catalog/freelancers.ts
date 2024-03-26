import { createCatalogStore } from './base';
import type { freelancersItem } from './catalog.type';
export const useCatalogFreelancersStore = createCatalogStore<freelancersItem>(
  'freelancers',
  '/api/users/sellers',
  '/freelancers',
  {
    categories: {
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

export type FreelancersStore = ReturnType<typeof useCatalogFreelancersStore>;
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCatalogFreelancersStore, import.meta.hot),
  );
}
