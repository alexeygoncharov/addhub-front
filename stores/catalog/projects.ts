import { createCatalogStore } from './base';
import type { projectsItem } from './catalog.type';
export const useCatalogProjectsStore = createCatalogStore<projectsItem>(
  'projects',
  '/api/projects/',
  {
    price: {
      $gte: 0,
      $lte: 50000,
    },
    categories: {
      title: 'Категории',
      type: 'radio',
      list: [],
    },
    city: { title: 'Города', type: 'radio', list: [] },
  },
);
export type ProjectsStore = ReturnType<typeof useCatalogProjectsStore>;
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCatalogProjectsStore, import.meta.hot),
  );
}
