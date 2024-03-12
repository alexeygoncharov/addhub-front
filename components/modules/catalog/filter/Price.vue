<template>
  <div class="filter-group spoiler _active">
    <div class="filter-group__top spoiler__toggle">
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
          v-model:start1="start1"
          v-model:start2="start2"
          v-model:min="min"
          v-model:max="max"
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
      start1: 0,
      start2: 70987,
      min: 0,
      max: 70987,
      filterTimeoutId: null, // Для хранения идентификатора таймера
    };
  },
  watch: {
    start1() {
      this.debouncedSetFilters();
    },
    start2() {
      this.debouncedSetFilters();
    },
  },
  methods: {
    debouncedSetFilters() {
      // Очистка предыдущего таймера
      clearTimeout(this.filterTimeoutId);

      // Установка нового таймера
      this.filterTimeoutId = setTimeout(() => {
        this.setFilters();
      }, 1000); // Задержка 1 секунда
    },
    setFilters() {
      const filterValue = { price: { $gte: this.start1, $lte: this.start2 } };

      this.store.setFilters(filterValue);
    },
  },
};
</script>
