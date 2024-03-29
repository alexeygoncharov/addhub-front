import type { projectsItem } from './catalog/catalog.type';
export const useProjectStore = defineStore('project', () => {
  async function fetchProject(id: string) {
    const { data } = await apiFetch<ApiResponse<projectsItem>>(
      `/api/projects/${id}`,
    );
    const value = data.value;
    return value?.result;
  }

  return { fetchProject };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectStore, import.meta.hot));
}
