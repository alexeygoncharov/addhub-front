<template>
  <div class="stat-card3">
    <div class="stat-card3__content">
      <div class="stat-card3__title">{{ title }}</div>
      <div class="stat-card3__num">{{ num }}</div>
      <div class="stat-card3__desc">
        <span>{{ desc }}</span> {{ desc2 }}
      </div>
    </div>
    <div class="stat-card3__img">
      <img :src="icon" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  num: string | number;
  desc: string;
  desc2?: string;
  icon: string;
}>();
</script>

<style scoped></style>
