<template>
  <div class="filter-check m-radio">
    <input type="radio" :checked="checked" name="time" />
    <div class="_radio filter-check__wrap">
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
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
