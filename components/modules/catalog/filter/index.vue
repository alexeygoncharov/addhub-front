<template>
  <div class="filter">
    <div class="filter__top">
      <div class="text20 medium-text">Фильтры</div>
      <button class="filter__close _toggle-filter">
        <NuxtImg src="/img/burger2.svg" alt="" />
      </button>
    </div>
    <div class="filter__items">
      <template v-for="(filterItem, key) in store.initialFilters" :key="key">
        <ModulesCatalogFilterPrice v-if="key === 'price'" :store="store" />
        <ModulesCatalogFilterGroup
          v-else-if="key === 'category' && filterItem && 'list' in filterItem"
          :filter="{
            ...filterItem,
            list: [{ title: 'Все' }, ...filterItem.list],
          }"
          :store="store"
        />
        <ModulesCatalogFilterGroup
          v-else-if="filterItem && 'list' in filterItem"
          :filter="filterItem"
          :store="store"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CatalogStores } from '~/stores/catalog/catalog.type';
const props = defineProps({
  store: {
    type: Object as PropType<CatalogStores>,
    required: true,
  },
});
</script>
