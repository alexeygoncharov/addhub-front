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

<script>
import IconCard1 from '~/assets/img/advantage-icon3.svg';
import IconCard2 from '~/assets/img/advantage-icon4.svg';
import IconCard3 from '~/assets/img/advantage-icon5.svg';
import IconCard4 from '~/assets/img/advantage-icon6.svg';
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cardList: [
        {
          icon: IconCard1,
          title: 'Опубликуйте проект',
          desc: 'Опубликовать проект бесплатно и легко. Просто заполните название, описание.',
        },
        {
          icon: IconCard2,
          title: 'Выберите исполнителя',
          desc: 'Опубликовать вакансию бесплатно и легко. Просто заполните название, описание.',
        },
        {
          icon: IconCard3,
          title: 'Оплачивайте безопасно',
          desc: 'Опубликовать вакансию бесплатно и легко. Просто заполните название, описание.',
        },
        {
          icon: IconCard4,
          title: 'Мы на связи 24/7',
          desc: 'Опубликовать вакансию бесплатно и легко. Просто заполните название, описание.',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
