<template>
  <div class="advantages m-section">
    <div class="container">
      <div class="advantages__top">
        <div class="text32 medium-text">{{ title }}</div>
        <div class="text15 light-text">{{ desc }}</div>
      </div>
      <div class="advantages__grid grid-col4 grid-tablet2 grid-mob-full">
        <ModulesCardsAdvantage
          v-for="(card, i) in cardList"
          :key="i"
          :icon="card.icon"
          :title="card.title"
          :desc="card.desc"
        />
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
  desc: {
    type: String,
    required: true,
  },
});
const cardList = ref([
  {
    icon: '/img/advantage-icon3.svg',
    title: 'Опубликуйте проект',
    desc: 'Опубликовать проект бесплатно и легко. Просто заполните название, описание.',
  },
  {
    icon: '/img/advantage-icon4.svg',
    title: 'Выберите исполнителя',
    desc: 'Опубликовать вакансию бесплатно и легко. Просто заполните название, описание.',
  },
  {
    icon: '/img/advantage-icon5.svg',
    title: 'Оплачивайте безопасно',
    desc: 'Опубликовать вакансию бесплатно и легко. Просто заполните название, описание.',
  },
  {
    icon: '/img/advantage-icon6.svg',
    title: 'Мы на связи 24/7',
    desc: 'Опубликовать вакансию бесплатно и легко. Просто заполните название, описание.',
  },
]);
</script>
