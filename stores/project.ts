import type { projectsItem } from './catalog/catalog.type';
export const useProjectStore = defineStore('project', () => {
  async function fetchProject(id: string) {
    const project = ref<projectsItem>();
    const { data } = await apiFetch<ApiResponse<projectsItem>>(
      `/api/projects/${id}`,
    );
    const value = data.value;
    if (value) {
      project.value = value.result;
    }
    return project.value;
  }

  return { fetchProject };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectStore, import.meta.hot));
}
