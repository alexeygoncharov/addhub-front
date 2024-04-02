<template>
  <div class="sort">
    <div class="sort__title text15"><span>Сортировать</span></div>
    <UIVSelect
      :options="store.initialSorting"
      :initial-current-text="store.sorting"
      @input="(sorting) => (store.sorting = sorting)"
    />
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
const store = props.store;
</script>
