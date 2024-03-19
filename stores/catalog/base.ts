import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';
import type { LocationQuery, Router } from 'vue-router';

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
  id: string,
  apiUrl: string,
  { initialFilters = {}, filters = {} },
) {
  return defineStore(id, {
    state: () => ({
      items: [],
      initialFilters,
      filters,
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
      initializeFromURL(router: Router) {
        const query = router.currentRoute.value.query;
        if (query.minPrice && query.maxPrice) {
          this.filters.price = {
            $gte: Number(query.minPrice),
            $lte: Number(query.maxPrice),
          };
        } else {
          this.filters.price = { $gte: 0, $lte: 50000 };
        }

        // Обработка параметров сортировки
        if (query.sort) {
          const sortFields = query.sort.split(',');
          for (const field of sortFields) {
            const [fieldName, direction] = field.split(':');
            this.sorting[fieldName] = direction === 'desc' ? -1 : 1;
          }
        }

        this.currentPage = query.page || this.currentPage;
        this.fetchItems();
      },

      async fetchItems() {
        try {
          const route = useRoute();
          const categorySlug = Array.isArray(route.params.slug)
            ? route.params.slug[0]
            : route.params.slug;
          const category = initialFilters.category.list.find(
            (el) => el.slug === categorySlug,
          );

          const data = await useNuxtApp().$fetch(apiUrl, {
            query: {
              offset: this.currentPage,
              limit: this.itemsPerPage,
              filter: { ...this.filters, category: category?._id },
              sort: this.sorting.value,
            },
          });
          this.items = data.result;
          this.totalItems = data.total;
        } catch (error) {
          console.error('Ошибка при загрузке категории', error);
        }
      },
      async setFilters({ action, key, value }, router: Router) {
        if (action === 'add') {
          this.filters[key] = value;
        } else if (action === 'remove') {
          delete this.filters[key];
        }

        this.updateURL(router);
        await this.fetchItems();
      },
      async setSorting(sorting, router: Router) {
        this.sorting = sorting;
        this.updateURL(router);
        await this.fetchItems();
      },
      async setPage(page, router: Router) {
        this.currentPage = page;
        this.updateURL(router);
        await this.fetchItems();
      },
      updateURL(router: Router) {
        const query = {
          ...router.currentRoute.value.query,
          page: this.currentPage,
          sort: this.sorting.value.price
            ? `price:${this.sorting.value.price}`
            : this.sorting.value.createdAt &&
              `createdAt:${this.sorting.value.createdAt}`,
          minPrice: this.filters.price.$gte,
          maxPrice: this.filters.price.$lte,
        };

        router.push({ query });
      },
    },
  });
}
