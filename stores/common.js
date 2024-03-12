// stores/common.js
import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => ({
    cities: [],
    categories: [],
  }),
  actions: {
    async fetchCities() {
      try {
        const response = await fetch('URL_К_API_ГОРОДОВ');
        this.cities = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке городов', error);
      }
    },
    async fetchCategories() {
      try {
        // Здесь должен быть ваш запрос к API для получения категорий
        const response = await fetch('URL_К_API_КАТЕГОРИЙ');
        this.categories = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке категорий', error);
      }
    },
  },
});
