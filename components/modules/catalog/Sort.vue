<template>
  <div class="sort">
    <div class="sort__title text15"><span>Сортировать</span> по</div>
    <UIVSelect
      :options="store.initialSorting"
      :initial-current-text="store.sorting"
      @input="(sorting) => store.setSorting(sorting, $router)"
    />
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
