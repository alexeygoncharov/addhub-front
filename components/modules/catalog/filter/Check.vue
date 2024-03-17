<template>
  <div class="filter-check m-check">
    <input type="checkbox" />
    <div class="_check filter-check__wrap">
      <div class="filter-check__title">{{ title }}</div>
      <div v-if="num" class="m-count">
        <span>{{ num }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    num: {
      type: Number,
      default: null,
    },
  },
};
</script>
