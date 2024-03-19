<template>
  <div class="filter-group spoiler" :class="{ _active: isExpanded }">
    <div class="filter-group__top spoiler__toggle" @click="toggleSpoiler">
      <div class="filter-group__title">Бюджет</div>
      <svg
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.71056 1.35608H0.289413C0.0328762 1.35608 -0.0978122 1.66586 0.0861196 1.84979L2.79669 4.56036C2.90802 4.67169 3.09195 4.67169 3.20333 4.56036L5.9139 1.84979C6.09778 1.66586 5.9671 1.35608 5.71056 1.35608Z"
          fill="#222222"
        />
      </svg>
    </div>
    <div class="filter-group__bottom spoiler__hidden">
      <div class="spoiler__wrap">
        <ModulesCatalogFilterSlider
          v-if="filters.price.$lte"
          v-model:price-min="filters.price.$gte"
          v-model:price-max="filters.price.$lte"
          :min="store.initialFilters.price.min"
          :max="store.initialFilters.price.max"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  store: {
    required: true,
    type: Object,
  },
});

const isExpanded = ref(true);
const filters = props.store.filters;

const filterTimeoutId = ref<ReturnType<typeof setTimeout>>();

watch(filters, () => {
  debouncedSetFilters();
});

const toggleSpoiler = () => {
  isExpanded.value = !isExpanded.value;
};
const debouncedSetFilters = () => {
  clearTimeout(filterTimeoutId.value);
  filterTimeoutId.value = setTimeout(() => {
    setFilters();
  }, 1000);
};
const setFilters = () => {
  const priceValue = { $gte: filters.price.$gte, $lte: filters.price.$lte };
  props.store.setFilters(
    { action: 'add', key: 'price', value: priceValue },
    useRouter(),
  );
};
</script>
