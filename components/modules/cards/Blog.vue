<template>
  <div class="blog-card">
    <a href="" class="blog-card__img _scale-img">
      <NuxtImg :src="'/img/' + img" alt="" />
    </a>
    <div class="blog-card__content">
      <div class="blog-card__date text14 gray-text">Ноябрь 23, 2023</div>
      <div class="blog-card__info">
        <a href="" class="blog-card__title text20 medium-text">
          Начни онлайн-бизнес и работай из дома
        </a>
        <div class="blog-card__desc text15 light-text">
          Полное руководство по открытию малого бизнеса в Интернете
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  img: {
    type: String,
    required: true,
  },
});
</script>
