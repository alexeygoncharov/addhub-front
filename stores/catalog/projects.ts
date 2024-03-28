import { createCatalogStore } from './base';
import type { projectsItem } from './catalog.type';
import { useProtectedApi } from '../../composables/useProtectedApi';

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
