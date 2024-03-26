import { createCatalogStore } from './base';
import type { projectsItem } from './catalog.type';
export const useCatalogProjectsStore = createCatalogStore<projectsItem[]>(
  'projects',
  '/api/projects/',
  {
    initialFilters: {
      price: {
        min: 0,
        max: 50000,
      },
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
export type ProjectsStore = ReturnType<typeof useCatalogProjectsStore>;
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useCatalogProjectsStore, import.meta.hot),
  );
}

export const useProjectStore = defineStore('project', () => {
  async function fetchProject(id: string) {
    try {
      const data = await useNuxtApp().$fetch(`/api/projects/${id}`);
      return data.result
    } catch (error) {
      // console.error('Ошибка при загрузке городов', error);
    }
  }

  return { fetchProject };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectStore, import.meta.hot));
}