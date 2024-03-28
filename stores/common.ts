export interface Category {
  _id: string;
  slug: string;
  title: string;
  type: string;
  sub: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  projects_count: number;
  services_count: number;
}

export interface City {
  _id: string;
  country: string;
  title: string;
  projects_count: number;
  services_count: number;
}

export const useCommonStore = defineStore('common', () => {
  const cities = ref<City[]>();
  const categories = ref<Category[]>();
  async function fetchCities() {
    const data = await apiFetch<ApiResponse<City[]>>('/api/cities/');
    const value = data.value;
    if (value) {
      cities.value = value.result;
    }
  }

  async function fetchCategories() {
    const data = await apiFetch<ApiResponse<Category[]>>('/api/categories/');
    const value = data.value;
    if (value) {
      categories.value = value.result;
    }
  }

  return { cities, categories, fetchCities, fetchCategories };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
}
