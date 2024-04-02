<template>
  <div class="stat-card">
    <div class="stat-card__icon">
      <NuxtImg crossorigin="anonymous" :src="icon" alt="" />
    </div>
    <div class="stat-card__content">
      <div class="stat-card__title text17 medium-text">{{ title }}</div>
      <div class="stat-card__desc text15 light-text">
        <a href="">{{ value }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string;
  title: string;
  value: string;
}>();
</script>

<style scoped></style>
