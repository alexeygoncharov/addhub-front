<template>
  <div class="advantage-card">
    <div class="advantage-card__icon">
      <NuxtImg :src="'/img/' + icon" alt="" />
    </div>
    <div class="advantage-card__info">
      <div class="advantage-card__title text20 medium-text">{{ title }}</div>
      <div class="advantage-card__desc text15 light-text" v-html="desc"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});
</script>
