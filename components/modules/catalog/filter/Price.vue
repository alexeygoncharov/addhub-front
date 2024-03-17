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
          v-model:price-min="priceMin"
          v-model:price-max="priceMax"
          :min="store.initialFilters.price.min"
          :max="store.initialFilters.price.max"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    store: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      isExpanded: true,
      priceMin:
        this.store.filters?.price?.$gte || this.store.initialFilters.price.min,
      priceMax:
        this.store.filters?.price?.$lte || this.store.initialFilters.price.max,
      filterTimeoutId: null,
    };
  },
  mounted() {},
  watch: {
    priceMin() {
      this.debouncedSetFilters();
    },
    priceMax() {
      this.debouncedSetFilters();
    },
  },
  methods: {
    toggleSpoiler() {
      this.isExpanded = !this.isExpanded;
    },
    debouncedSetFilters() {
      clearTimeout(this.filterTimeoutId);
      this.filterTimeoutId = setTimeout(() => {
        this.setFilters();
      }, 1000);
    },
    setFilters() {
      const priceValue = { $gte: this.priceMin, $lte: this.priceMax };
      this.store.setFilters(
        { action: 'add', key: 'price', value: priceValue },
        this.$router,
      );
    },
  },
};
</script>
