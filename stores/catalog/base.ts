import type { initialSort, initialFilters } from './catalog.type';
import { useCommonStore } from '~/stores/common';
export function createCatalogStore<T>(
  id: string,
  apiUrl: string,
  initialFiltersArg: initialFilters,
) {
  return defineStore(id, () => {
    const commonStore = useCommonStore();
    if (commonStore.categories && initialFiltersArg.categories) {
      initialFiltersArg.categories.list = commonStore.categories;
    }
    if (commonStore.cities && initialFiltersArg.city) {
      initialFiltersArg.city.list = commonStore.cities;
    }
    const initialFilters = ref(initialFiltersArg);
    const filters = ref<{
      price?: { $gte: number; $lte: number };
      'address.city'?: string;
    }>({});
    const initialSorting = ref([
      {
        type: 'desc',
        text: 'Стоимости (убыв)',
        value: {
          price: -1,
        },
      },
      {
        type: 'asc',
        text: 'Стоимости (возр)',
        value: {
          price: 1,
        },
      },
      {
        type: 'desc',
        text: 'Дате (убыв)',
        value: {
          createdAt: -1,
        },
      },
      {
        type: 'asc',
        text: 'Дате (возр)',
        value: {
          createdAt: 1,
        },
      },
    ]);
    const popularItems = ref<T[]>();
    const items = ref<T[] | []>();
    const empty = ref(false);
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
      const category = initialFilters.value.categories?.list.find(
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
      }
      if (query.city && !Array.isArray(query.city)) {
        filters.value['address.city'] = query.city;
      }
      if (query.sort && !Array.isArray(query.sort)) {
        console.log(query.sort);
      }

      currentPage.value =
        (Array.isArray(query.page)
          ? Number(query.page[0])
          : Number(query.page)) || 1;
      fetchItems();
    };

    const fetchItems = () => {
      empty.value = false;
      items.value = [];
      const route = useRoute();
      const categorySlug = Array.isArray(route.params.slug)
        ? route.params.slug[0]
        : route.params.slug;
      const category = initialFilters.value.categories?.list.find(
        (el) => el.slug === categorySlug,
      );

      apiFetch<ApiListResponse<T[]>>(apiUrl, {
        handler: (data) => {
          if (data) {
            items.value = data.result;
            items.value?.length || (empty.value = true);
            totalItems.value = data.total;
          }
        },
        options: {
          query: {
            offset: currentPage.value,
            limit: itemsPerPage.value,
            filter: { ...filters.value, category: category?._id },
            sort: sorting.value.value,
          },
        },
      });
    };
    const fetchPopular = () => {
      apiFetch<ApiListResponse<T[]>>(apiUrl, {
        handler: (data) => {
          if (data) popularItems.value = data.result;
        },
        options: {
          query: {
            offset: currentPage.value,
            limit: itemsPerPage.value,
          },
        },
      });
    };

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
        minPrice:
          filters.value.price?.$gte || initialFilters.value.price?.$gte || 0,
        maxPrice:
          filters.value.price?.$lte ||
          initialFilters.value.price?.$lte ||
          50000,
        ...(filters.value?.['address.city'] && {
          city: filters.value['address.city'],
        }),
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
      fetchPopular,
      empty,
      popularItems,
    };
  });
}
