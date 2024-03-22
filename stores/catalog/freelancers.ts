import { createCatalogStore } from './base';
import type { freelancersItem } from './catalog.type';
export const useCatalogFreelancersStore = createCatalogStore<freelancersItem[]>(
  'freelancers',
  '/api/users/sellers',
  {
    initialFilters: {
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

export type FreelancersStore = ReturnType<typeof useCatalogFreelancersStore>;
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCatalogFreelancersStore, import.meta.hot),
  );
}
