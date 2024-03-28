import { createCatalogStore } from './base';
import type { projectsItem } from './catalog.type';
import { useProtectedApi } from '../../composables/useProtectedApi';

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
  const apiFetch = useProtectedApi();
  async function fetchProject(id: string) {
    const data = await apiFetch<{ result: projectsItem; status: number }>(
      `/api/projects/${id}`,
    );
    return data.result;
  }

  return { fetchProject };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectStore, import.meta.hot));
}
