<template>
  <div class="filter">
    <div class="filter__top">
      <div class="text20 medium-text">Фильтры</div>
      <button class="filter__close _toggle-filter">
        <NuxtImg src="/img/burger2.svg" alt="" />
      </button>
    </div>
    <div class="filter__items">
      <template v-for="(filterItem, key) in store.initialFilters">
        <ModulesCatalogFilterPrice v-if="key === 'price'" :store="store" />
        <ModulesCatalogFilterGroup
          v-else-if="key === 'category'"
          :filter="{
            ...filterItem,
            list: [{ title: 'Все' }, ...filterItem.list],
          }"
          :store="store"
        />
        <ModulesCatalogFilterGroup
          v-else-if="filterItem.list"
          :filter="filterItem"
          :store="store"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    store: {
      type: Object,
      required: true,
    },
  },
};
</script>
