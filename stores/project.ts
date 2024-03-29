import type { projectsItem } from './catalog/catalog.type';
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
