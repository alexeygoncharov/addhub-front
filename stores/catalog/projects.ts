import { createCatalogStore } from './base';
import type { projectsItem } from './catalog.type';
export const useCatalogProjectsStore = createCatalogStore<projectsItem>(
  'projects',
  '/api/projects/',
  '/projects',
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
    'address.country': {
      title: 'Страны',
      type: 'check',
      list: [],
      hasSearch: true,
    },
    'address.city': {
      title: 'Города',
      type: 'check',
      list: [],
      hasSearch: true,
    },
  },
);

export type ProjectsStore = ReturnType<typeof useCatalogProjectsStore>;
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCatalogProjectsStore, import.meta.hot),
  );
}
