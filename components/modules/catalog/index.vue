<template>
  <div class="catalog">
    <div class="container">
      <div class="catalog__grid">
        <div class="catalog__sidebar">
          <slot name="filter"></slot>
        </div>
        <div class="catalog__content">
          <div class="catalog__top">
            <button class="filter-btn m-btn m-btn-blue3 _toggle-filter">
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

            <ModulesCatalogSort />
          </div>

          <slot name="items"></slot>
          <UIVPagination
            :total-items="+store.totalItems"
            :items-per-page="+store.itemsPerPage"
          />
        </div>
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
  mounted() {
    this.store.fetchItems();
  },
};
</script>
