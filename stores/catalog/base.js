import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

const initialSorting = [
  {
    type: 'desc',
    text: 'Стоимости desc',
    value: {
      price: -1,
    },
  },
  {
    type: 'asc',
    text: 'Стоимости asc',
    value: {
      price: 1,
    },
  },
  {
    type: 'desc',
    text: 'Дате desc',
    value: {
      createdAt: -1,
    },
  },
  {
    type: 'asc',
    text: 'Дате asc',
    value: {
      createdAt: 1,
    },
  },
];

export function createCatalogStore(
  id,
  apiUrl,
  { initialFilters = {}, filters = {} },
) {
  return defineStore(id, {
    state: () => ({
      items: [],
      initialFilters: initialFilters,
      filters: filters,
      initialSorting,
      sorting: initialSorting[0],
      currentPage: 1,
      totalItems: null,
      itemsPerPage: 12,
    }),
    getters: {
      totalPages: (state) => Math.ceil(state.totalItems / state.itemsPerPage),
    },
    actions: {
      initializeFromURL(router) {
        const query = router.currentRoute.value.query;
        this.currentPage = query.page || this.currentPage;
        this.sorting = query.sorting ? JSON.parse(query.sorting) : this.sorting;
        this.filters = query.filters ? JSON.parse(query.filters) : this.filters;
        this.fetchItems();
      },
      async fetchItems() {
        try {
          const data = await useNuxtApp().$fetch(apiUrl, {
            query: {
              offset: this.currentPage,
              limit: this.itemsPerPage,
              filter: this.filters,
              sort: this.sorting.value,
            },
          });
          this.items = data.result;
          this.totalItems = data.total;
        } catch (error) {
          console.error('Ошибка при загрузке категории', error);
        }
      },
      async setFilters({ action, key, value }, router) {
        if (action === 'add') {
          this.filters[key] = value;
        } else if (action === 'remove') {
          delete this.filters[key];
        }

        this.updateURL(router);
        await this.fetchItems();
      },
      async setSorting(sorting, router) {
        this.sorting = sorting;
        this.updateURL(router);
        await this.fetchItems();
      },
      async setPage(page, router) {
        this.currentPage = page;
        this.updateURL(router);
        await this.fetchItems();
      },
      updateURL(router) {
        const query = {
          ...router.currentRoute.value.query,
          page: this.currentPage,
          sorting: JSON.stringify(this.sorting.value),
          filters: JSON.stringify(this.filters),
        };
        router.push({ query });
      },
    },
  });
}
