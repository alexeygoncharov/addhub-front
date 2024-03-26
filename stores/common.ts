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
  function fetchCities() {
    apiFetch<ApiResponse<City[]>>('/api/cities/', {
      handler: (data) => {
        if (data) cities.value = data.result;
      },
    });
  }

  function fetchCategories() {
    apiFetch<ApiResponse<Category[]>>('/api/categories/', {
      handler: (data) => {
        if (data) categories.value = data.result;
      },
    });
  }

  return { cities, categories, fetchCities, fetchCategories };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
}
