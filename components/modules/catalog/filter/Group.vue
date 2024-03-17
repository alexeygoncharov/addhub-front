<template>
  <div class="filter-group spoiler" :class="{ _active: isExpanded }">
    <div class="filter-group__top spoiler__toggle" @click="toggleSpoiler">
      <div class="filter-group__title">{{ filter.title }}</div>
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
        <form v-if="filter.hasSearch" class="blog-field fg">
          <input type="text" placeholder="Поиск по публикациям" />
          <button class="blog-field__btn hover-fill-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.1163 1.60938C4.98403 1.60938 1.61792 4.97548 1.61792 9.10776C1.61792 13.24 4.98403 16.6127 9.1163 16.6127C10.8813 16.6127 12.5046 15.9941 13.7875 14.9671L16.9109 18.0889C17.0685 18.24 17.279 18.3233 17.4974 18.3211C17.7157 18.3189 17.9245 18.2312 18.079 18.0769C18.2335 17.9227 18.3214 17.714 18.3239 17.4957C18.3265 17.2774 18.2434 17.0667 18.0925 16.9089L14.9692 13.7856C15.997 12.5006 16.6163 10.8748 16.6163 9.10776C16.6163 4.97548 13.2486 1.60938 9.1163 1.60938ZM9.1163 3.27607C12.3478 3.27607 14.948 5.87623 14.948 9.10776C14.948 12.3393 12.3478 14.946 9.1163 14.946C5.88476 14.946 3.28459 12.3393 3.28459 9.10776C3.28459 5.87623 5.88476 3.27607 9.1163 3.27607Z"
                fill="#041E42"
              />
            </svg>
          </button>
        </form>

        <div class="filter-group__checks" :class="{ '_show-all': showAll }">
          <template v-for="item in shownItems">
            <ModulesCatalogFilterCheck
              v-if="filter.type === 'check'"
              :title="item.title"
              :num="item.num"
              @change="setFilters(item._id, $event.target.checked)"
            />
            <ModulesCatalogFilterRadio
              v-else-if="filter.type === 'radio'"
              :title="item.title"
              :num="item.num"
              @change="setFilters(item._id, $event.target.checked)"
            />
          </template>
          <button
            v-if="filter.list.length > 4"
            class="more-checks"
            @click="toggleShowAll"
          >
            <span v-if="!showAll">+{{ filter.list.length - 4 }} еще</span>
            <span v-else>Скрыть</span>
          </button>
        </div>
      </div>
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
    filter: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: true, // Управляет сворачиванием/разворачиванием всего блока
      showAll: false, // Управляет отображением всех фильтров
    };
  },
  computed: {
    shownItems() {
      return this.showAll ? this.filter.list : this.filter.list.slice(0, 4);
    },
  },
  methods: {
    toggleSpoiler() {
      this.isExpanded = !this.isExpanded;
    },
    toggleShowAll() {
      this.showAll = !this.showAll;
    },
    setFilters(id, isChecked) {
      const setting =
        isChecked && id
          ? { action: 'add', key: 'category', value: id }
          : { action: 'remove', key: 'category' };
      this.store.setFilters(setting, this.$router);
    },
  },
};
</script>
