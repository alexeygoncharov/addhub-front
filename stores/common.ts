export interface Category {
  _id: string;
  slug: string;
  title: string;
  type: string;
  sub: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  icon: string;
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

export interface Country {
  _id: string;
  title: string;
}

export const useCommonStore = defineStore('common', () => {
  const cities = ref<City[]>();
  const countries = ref<Country[]>();
  const categories = ref<Category[]>();
  async function fetchCities() {
    const { data } = await apiFetch<ApiResponse<City[]>>('/api/cities/');
    const value = data.value;
    if (value) {
      cities.value = value.result;
    }
  }

  async function fetchCategories() {
    const { data } =
      await apiFetch<ApiResponse<Category[]>>('/api/categories/');
    const value = data.value;
    if (value) {
      categories.value = value.result;
    }
  }

  async function fetchCountries() {
    const { data } = await apiFetch<ApiResponse<Country[]>>('/api/countries/');
    const value = data.value;
    if (value) {
      countries.value = value.result;
    }
  }

  async function uploadFile(file: FormData) {
    const { data } = await apiFetch<ApiResponse<any>>('/api/files/single', {
      needToken: true,
      options: {
        method: 'POST',
        body: file,
      },
    });
    const value = data.value;
    return value?.result;
  }
  return {
    cities,
    categories,
    countries,
    fetchCities,
    fetchCategories,
    fetchCountries,
    uploadFile,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
}
