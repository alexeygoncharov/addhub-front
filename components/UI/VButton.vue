<template>
  <NuxtLink v-if="path" :to="path" :class="buttonClasses">
    <slot name="left"></slot>
    <span><slot>Нажмите</slot></span>
    <slot name="right"></slot>
  </NuxtLink>
  <button v-else :class="buttonClasses">
    <slot name="left"></slot>
    <span><slot>Нажмите</slot></span>
    <slot name="right"></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  isShadow: {
    type: Boolean,
    default: false,
  },
  path: {
    type: String,
    default: '',
  },
});
const buttonClasses = computed(() => {
  return [
    'm-btn',
    {
      'm-btn-blue': props.color === 'blue',
      'm-btn-blue2': props.color === 'blue2',
      'm-btn-blue3': props.color === 'blue3',
      'm-btn-blue-outline': props.color === 'blueOutline',
      'm-btn-red': props.color === 'red',
      'm-btn-white': props.color === 'white',
      'm-btn-gray': props.color === 'gray',
      'm-btn-shadow': props.isShadow,
    },
  ];
});
</script>
