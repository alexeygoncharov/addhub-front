<template>
  <div class="catalog">
    <div class="container">
      <div class="catalog__grid">
        <div class="catalog__sidebar">
          <ModulesCatalogFilter
            v-model:show="showCatalogFilters"
            :store="store"
          />
        </div>
        <div class="catalog__content">
          <div class="catalog__top">
            <button
              class="filter-btn m-btn m-btn-blue3 _toggle-filter"
              @click="showCatalogFilters = !showCatalogFilters"
            >
              <span class="text15">Фильтры</span>
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.87504 5.53979L4.87498 14.3058L5.60229 13.5795L6.39779 14.375L4.31254 16.4603L2.22729 14.375L3.02279 13.5795L3.74998 14.3058L3.75004 5.53979H4.87504ZM9.93754 13.9773V15.1023H7.12504V13.9773H9.93754ZM11.625 11.1648V12.2898H7.12504V11.1648H11.625ZM13.3125 8.35229V9.47729H7.12504V8.35229H13.3125ZM15 5.53979V6.66479H7.12504V5.53979H15Z"
                  fill="#041E42"
                />
              </svg>
            </button>

            <div class="catalog__count">
              <div class="text15"><slot name="count"></slot></div>
            </div>

            <ModulesCatalogSort v-if="store.items?.length" :store="store" />
          </div>

          <slot name="items"></slot>
          <UIVPagination
            v-model="store.currentPage"
            :items-per-page="store.itemsPerPage"
            :total-items="store.totalItems"
            :total-pages="store.totalPages"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CatalogStores } from '~/stores/catalog/catalog.type';
const props = defineProps({
  store: {
    required: true,
    type: Object as PropType<CatalogStores>,
  },
});
const store = props.store;
const { showCatalogFilters } = storeToRefs(props.store);
props.store.initializeFromURL();
</script>
