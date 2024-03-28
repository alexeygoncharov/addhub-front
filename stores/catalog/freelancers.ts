import { createCatalogStore } from './base';
export const useCatalogFreelancersStore = createCatalogStore(
  'freelancers',
  '/api/users/sellers',
  {
    initialFilters: {
      category: {
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
