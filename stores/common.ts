export interface Category {
  _id: string;
  slug: string;
  title: string;
  type: string;
  sub: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// export interface City {}

export const useCommonStore = defineStore('common', () => {
  const cities = ref<[]>();
  const categories = ref<Category[]>();

  async function fetchCities() {
    try {
      const data = await useNuxtApp().$fetch('/api/cities/');
      cities.value = data.result as [];
    } catch (error) {
      // console.error('Ошибка при загрузке городов', error);
    }
  }

  async function fetchCategories() {
    try {
      const data = await useNuxtApp().$fetch('/api/categories/');
      categories.value = data.result as Category[];
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }

  return { cities, categories, fetchCities, fetchCategories };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
}
