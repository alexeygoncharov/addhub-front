import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export const useCommonStore = defineStore('common', {
  state: () => ({
    cities: null,
    categories: null,
  }),
  actions: {
    async fetchCities() {
      try {
        const data = await useNuxtApp().$fetch('/api/cities/');
        this.cities = data.result;
      } catch (error) {
        console.error('Ошибка при загрузке городов', error);
      }
    },
    async fetchCategories() {
      try {
        const data = await useNuxtApp().$fetch('/api/categories/');
        this.categories = data.result;
      } catch (error) {
        console.error('Ошибка при загрузке категорий', error);
      }
    },
  },
});
