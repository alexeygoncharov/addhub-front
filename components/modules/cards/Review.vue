<template>
  <div class="review-card">
    <div class="review-card__text text28 medium-text">{{ text }}</div>
    <div class="review-card__info">
      <div class="review-card__name text15 medium-text">{{ name }}</div>
      <div class="review-card__co text15 gray-text light-text">
        Project менеджер, Группа компаний «ПИК»
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
</script>
