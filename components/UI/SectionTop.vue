<template>
  <div class="m-section__top">
    <div class="m-section__text">
      <div class="text32 medium-text">
        {{ title }}
      </div>
      <div class="text15 light-text">
        {{ desc }}
      </div>
    </div>
    <UIVButton
      v-if="link"
      :path="link.path"
      class="m-section__link"
      color="blueOutline"
    >
      <template #default>{{ link.text }}</template>
      <template #right><NuxtImg src="arrow-right.svg" alt="" /></template>
    </UIVButton>
  </div>
</template>

<script>
export default {
  name: 'SectionComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    link: {
      type: Object,
      default: null,
    },
  },
};
</script>
