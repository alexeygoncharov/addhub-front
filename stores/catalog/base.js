import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export function createCatalogStore(id, apiUrl) {
  return defineStore(id, {
    state: () => ({
      items: [],
      filters: {},
      sorting: {},
      totalItems: null,
      currentPage: 1,
      itemsPerPage: 12,
    }),
    getters: {
      filteredItems: (state) => state.items,
      totalPages: (state) => Math.ceil(state.totalItems / state.itemsPerPage),
    },
    actions: {
      async fetchItems() {
        const params = new URLSearchParams({
          filter: JSON.stringify(this.filters),
          limit: this.itemsPerPage,
          offset: this.currentPage,
        }).toString();

        try {
          const data = await useNuxtApp().$fetch(`${apiUrl}?${params}`);
          this.items = data.result;
          this.totalItems = data.total;
        } catch (error) {
          console.error('Ошибка при загрузке категории', error);
        }
      },
      setFilters(filters) {
        this.filters = filters;
        this.fetchItems();
      },
      setSorting(sorting) {
        this.sorting = sorting;
        this.fetchItems();
      },
      setPage(page) {
        this.currentPage = page;
        this.fetchItems();
      },
    },
  });
}
