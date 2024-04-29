import type { initialSort, initialFilters } from './catalog.type';
import { useCommonStore } from '~/stores/common';
export function createCatalogStore<T>(
  id: string,
  apiUrl: string,
  catalogPathArg: string,
  initialFiltersArg: initialFilters,
) {
  return defineStore(id, () => {
    const commonStore = useCommonStore();
    if (commonStore.categories && initialFiltersArg.category) {
      initialFiltersArg.category.list = commonStore.categories;
    }
    if (commonStore.cities && initialFiltersArg['address.city']) {
      initialFiltersArg['address.city'].list = commonStore.cities;
    }
    const catalogPath = ref(catalogPathArg);
    const initialFilters = ref(initialFiltersArg);
    const filters = ref<{
      price?: { $gte: number; $lte: number };
      'address.city'?: string[];
      category?: string;
    }>({});
    const initialSorting = ref<
      {
        type: string;
        text: string;
        value: { [key: string]: number }; // Обобщенный тип для значения
      }[]
    >([
      {
        type: 'desc',
        text: 'Сначала дешевле',
        value: {
          price: 1,
        },
      },
      {
        type: 'asc',
        text: 'Сначала дороже',
        value: {
          price: -1,
        },
      },
    ]);
    const searchQuery = ref('');
    const showCatalogFilters = ref(false);
    const showAll = ref<number[]>([]);
    const popularItems = ref<T[]>();
    const items = ref<T[] | []>();
    const empty = ref(false);
    const loading = ref(false);
    const sorting = ref<initialSort>(initialSorting.value[0]);
    const currentPage = ref(1);
    const totalItems = ref(0);
    const itemsPerPage = ref(12);
    const totalPages = computed(() =>
      totalItems.value !== 0
        ? Math.ceil(totalItems.value / itemsPerPage.value)
        : 0,
    );
    const toggleShowAll = (index: number) => {
      const currentIndex = showAll.value.indexOf(index);
      if (currentIndex > -1) {
        showAll.value.splice(currentIndex, 1);
      } else {
        showAll.value.push(index);
      }
    };
    const resetFilters = async () => {
      filters.value = {
        ...(initialFilters.value.price && {
          price: {
            $gte: initialFilters.value.price?.$gte,
            $lte: initialFilters.value.price?.$lte,
          },
        }),
      };

      await navigateTo(`/${id}/all`);
      setTimeout(() => {
        initializeFromURL();
      }, 50);
    };
    const initializeFromURL = async () => {
      filters.value = {};
      const route = useRoute();
      const categorySlug = Array.isArray(route.params.slug)
        ? route.params.slug[0]
        : route.params.slug;
      const category = initialFilters.value.category?.list.find(
        (el) => el.slug === categorySlug,
      );

      if (!(category || categorySlug === 'all')) {
        await navigateTo(`/${id}/all`);
      }

      const query = route.query;
      if (query.search && !Array.isArray(query.search)) {
        searchQuery.value = query.search;
      }
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
      } else if (!filters.value.price && initialFilters.value.price) {
        filters.value.price = {
          $gte: initialFilters.value.price.$gte,
          $lte: initialFilters.value.price.$lte,
        };
      }
      if (query.cities) {
        filters.value['address.city'] = Array.isArray(query.cities)
          ? (query.cities as string[])
          : [query.cities];
      } else if (
        !filters.value['address.city'] &&
        initialFilters.value['address.city']
      ) {
        filters.value['address.city'] = [];
      }
      if (query.sort && !Array.isArray(query.sort)) {
        const [field, order] = query.sort.split(':');
        const sortOrder = parseInt(order);

        for (const option of initialSorting.value) {
          const value = option.value[field];
          if (value === sortOrder) {
            sorting.value = option;
          }
        }
      }

      currentPage.value =
        (Array.isArray(query.page)
          ? Number(query.page[0])
          : Number(query.page)) || 1;

      watch(
        [searchQuery, sorting, currentPage],
        () => {
          updateURL();
          fetchItems();
        },
        { deep: true, immediate: true },
      );
    };

    const fetchItems = async () => {
      empty.value = false;
      loading.value = true;
      items.value = [];
      const route = useRoute();
      const categorySlug = Array.isArray(route.params.slug)
        ? route.params.slug[0]
        : route.params.slug;
      const category = initialFilters.value.category?.list.find(
        (el) => el.slug === categorySlug,
      );
      const queryFilters = filters.value;
      for (const key in queryFilters) {
        const value = queryFilters[key as keyof typeof filters.value];
        if (!value || (Array.isArray(value) && value.length === 0)) {
          delete queryFilters[key as keyof typeof filters.value];
        }
      }
      const { data } = await apiFetch<ApiListResponse<T[]>>(apiUrl, {
        options: {
          query: {
            offset: currentPage.value,
            limit: itemsPerPage.value,
            filter: { ...queryFilters, category: category?._id },
            sort: sorting.value.value,
            ...(searchQuery.value && { search: searchQuery.value }),
          },
        },
      });
      const value = data.value;
      if (value) {
        items.value = value.result;
        items.value?.length || (empty.value = true);
        totalItems.value = value.total;
      }
      loading.value = false;
    };
    const fetchPopular = async () => {
      const { data } = await apiFetch<ApiListResponse<T[]>>(apiUrl, {
        options: {
          query: {
            offset: currentPage.value,
            limit: itemsPerPage.value,
          },
        },
      });
      const value = data.value;
      if (value) {
        popularItems.value = value.result;
      }
    };

    const updateURL = () => {
      const router = useRouter();
      const query = {
        ...(currentPage.value > 1 && { page: currentPage.value }),
        sort: sorting.value.value.price
          ? `price:${sorting.value.value.price}`
          : sorting.value.value.createdAt &&
            `createdAt:${sorting.value.value.createdAt}`,
        ...((filters.value.price?.$gte ||
          filters.value.price?.$lte !== initialFilters.value.price?.$lte) && {
          minPrice: filters.value.price?.$gte || 0,
          maxPrice:
            filters.value.price?.$lte || initialFilters.value.price?.$lte,
        }),

        ...(filters.value?.['address.city']?.length && {
          cities: filters.value['address.city'],
        }),
        ...(searchQuery.value && { search: searchQuery.value }),
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
      updateURL,
      fetchPopular,
      empty,
      loading,
      popularItems,
      catalogPath,
      showAll,
      showCatalogFilters,
      toggleShowAll,
      searchQuery,
      resetFilters,
    };
  });
}
