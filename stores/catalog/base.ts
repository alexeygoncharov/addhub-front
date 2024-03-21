import type { initialSort, initialConfig } from './catalog.type';
import { useCommonStore } from '~/stores/common';
export function createCatalogStore<T>(
  id: string,
  apiUrl: string,
  { initialFilters: initialFiltersArg, filters: filtersArg }: initialConfig,
) {
  return defineStore(id, () => {
    const commonStore = useCommonStore();
    if (commonStore.categories) {
      initialFiltersArg.category.list = commonStore.categories;
    }
    if (commonStore.cities) {
      initialFiltersArg.city.list = commonStore.cities;
    }
    const initialFilters = ref(initialFiltersArg);
    const filters = ref(filtersArg);
    const initialSorting = ref([
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
    ]);
    const items = ref<T>();
    const sorting = ref<initialSort>(initialSorting.value[0]);
    const currentPage = ref(1);
    const totalItems = ref(0);
    const itemsPerPage = ref(12);
    const totalPages = computed(() =>
      totalItems.value !== 0
        ? Math.ceil(totalItems.value / itemsPerPage.value)
        : 0,
    );

    const initializeFromURL = async () => {
      const route = useRoute();
      const categorySlug = Array.isArray(route.params.slug)
        ? route.params.slug[0]
        : route.params.slug;
      const category = initialFilters.value.category.list.find(
        (el) => el.slug === categorySlug,
      );

      if (!(category || categorySlug === 'all')) {
        await navigateTo(`/${id}/all`);
      }

      const query = route.query;
      if (
        query.minPrice &&
        query.maxPrice &&
        !Array.isArray(query.minPrice) &&
        !Array.isArray(query.maxPrice)
      ) {
        filters.value.price = {
          $gte: Number(query.minPrice),
          $lte: Number(query.maxPrice),
        };
      } else {
        filters.value.price = { $gte: 0, $lte: 50000 };
      }

      if (query.sort && !Array.isArray(query.sort)) {
        const sortFields = query.sort.split(',');
        for (const field of sortFields) {
          const [fieldName, direction] = field.split(':');
          if (fieldName in sorting.value.value) {
            sorting.value.value[fieldName as keyof typeof sorting.value.value] =
              direction === 'desc' ? -1 : 1;
          }
        }
      }

      currentPage.value =
        (Array.isArray(query.page)
          ? Number(query.page[0])
          : Number(query.page)) || 1;
      fetchItems();
    };

    const fetchItems = async () => {
      try {
        const route = useRoute();
        const categorySlug = Array.isArray(route.params.slug)
          ? route.params.slug[0]
          : route.params.slug;
        const category = initialFilters.value.category.list.find(
          (el) => el.slug === categorySlug,
        );
        if (category || categorySlug === 'all') {
          const data = await useNuxtApp().$fetch(apiUrl, {
            query: {
              offset: currentPage.value,
              limit: itemsPerPage.value,
              filter: { ...filters.value, category: category?._id },
              sort: sorting.value.value,
            },
          });
          items.value = data.result;
          totalItems.value = data.total;
        }
      } catch (error) {
        // console.error('Ошибка при загрузке категории', error);
      }
    };

    // const setFilters = async ({ action, key, value }: any, router: Router) => {
    //   if (action === 'add') {
    //     filters.value[key] = value;
    //   } else if (action === 'remove') {
    //     delete filters.value[key];
    //   }
    //   updateURL(router);
    //   await fetchItems();
    // };
    const updateFilter = () => {
      updateURL();
      fetchItems();
    };
    const setSorting = (sortingArg: typeof sorting.value) => {
      sorting.value = sortingArg;
      updateURL();
      fetchItems();
    };

    const setPage = (page: number) => {
      currentPage.value = page;
      updateURL();
      fetchItems();
    };

    const updateURL = () => {
      const router = useRouter();
      const query = {
        ...router.currentRoute.value.query,
        page: currentPage.value,
        sort: sorting.value.value.price
          ? `price:${sorting.value.value.price}`
          : sorting.value.value.createdAt &&
            `createdAt:${sorting.value.value.createdAt}`,
        minPrice: filters.value.price?.$gte || filtersArg.price?.$gte || 0,
        maxPrice: filters.value.price?.$lte || filtersArg.price?.$lte || 50000,
      };
      router.push({ query });
    };

    return {
      items,
      initialFilters,
      filters,
      initialSorting,
      sorting,
      currentPage,
      totalItems,
      itemsPerPage,
      totalPages,
      initializeFromURL,
      fetchItems,
      // setFilters,
      setSorting,
      setPage,
      updateURL,
      updateFilter,
    };
  });
}
