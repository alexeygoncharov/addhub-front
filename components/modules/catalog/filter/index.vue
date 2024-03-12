<template>
  <div class="filter">
    <div class="filter__top">
      <div class="text20 medium-text">Фильтры</div>
      <button class="filter__close _toggle-filter">
        <NuxtImg src="burger2.svg" alt="" />
      </button>
    </div>
    <div class="filter__items">
      <template v-for="(item, i) in filterList">
        <!--        <ModulesCatalogFilterGroup-->
        <!--          v-if="item.type === 'check' || item.type === 'radio'"-->
        <!--          :filter="item"-->
        <!--        />-->
        <ModulesCatalogFilterPrice
          v-if="item.type === 'price'"
          :store="store"
        />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterList: {
      type: Array,
      required: true,
    },
    store: {
      required: true,
      type: Object,
    },
  },
};
</script>
