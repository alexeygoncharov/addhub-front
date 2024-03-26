<template>
  <div class="filter-check m-radio">
    <input
      v-if="!checked"
      v-model="vModel"
      type="radio"
      :value="value"
      name="time"
    />
    <input v-else type="radio" :value="value" name="time" checked />
    <div class="_radio filter-check__wrap">
      <div class="filter-check__title">{{ title }}</div>
      <div v-if="num" class="m-count">
        <span>{{ num }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const vModel = defineModel<string | undefined>({ required: true });
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
  checked: {
    type: Boolean,
  },
});
</script>
