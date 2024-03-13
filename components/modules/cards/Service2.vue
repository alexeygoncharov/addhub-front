<template>
  <div class="service-card2">
    <div class="service-card__img">
      <NuxtImg :src="'/img/' + img" alt="" />
    </div>
    <div class="service-card__content">
      <a href="" class="service-card__title text15 medium-text">
        {{ title }}
      </a>
      <div class="service-card__bottom _flex">
        <div class="service-card__reviews _flex">
          <NuxtImg src="/img/star.svg" alt="" />
          <div class="service-card__reviews-text">
            <span class="text15 medium-text">4.82 </span>
            <span class="text14 gray-text"> 94 отзыва</span>
          </div>
        </div>

        <div class="service-card__price">
          <span class="text14 gray-text">от </span>
          <span class="text17 medium-text"> 983 ₽</span>
        </div>
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
    img: {
      type: String,
      required: true,
    },
  },
};
</script>
