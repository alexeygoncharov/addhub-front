<template>
  <div class="filter-check m-check">
    <input v-model="vModel" type="checkbox" :value="value" />
    <div class="_check filter-check__wrap">
      <div class="filter-check__title">{{ title }}</div>
      <div v-if="num" class="m-count">
        <span>{{ num }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const vModel = defineModel<string[]>({ default: [] });

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  num: {
    type: Number,
    default: null,
  },
  value: {
    type: String,
    required: true,
  },
});
</script>
