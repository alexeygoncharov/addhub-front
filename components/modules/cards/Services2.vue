<template>
  <div class="services-card2">
    <div class="services-card__img">
      <NuxtImg :src="'/img/' + img" alt="" />
    </div>
    <div class="services-card__content">
      <a href="" class="services-card__title text15 medium-text">
        {{ title }}
      </a>
      <div class="services-card__bottom _flex">
        <div class="services-card__reviews _flex">
          <NuxtImg src="/img/star.svg" alt="" />
          <div class="services-card__reviews-text">
            <span class="text15 medium-text">4.82 </span>
            <span class="text14 gray-text"> 94 отзыва</span>
          </div>
        </div>

        <div class="services-card__price">
          <span class="text14 gray-text">от </span>
          <span class="text17 medium-text"> 983 ₽</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});
</script>
