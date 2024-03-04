<template>
  <div class="advantages2 cut-section">
    <div class="container">
      <div class="advantages2__inner">
        <div class="advantages2__content">
          <div class="advantages2__top">
            <div class="text32 medium-text">
              Все фрилансеры мира на вашем рабочем столе
            </div>
          </div>
          <div class="advantages2__items">
            <ModulesCardsAdvantage
              v-for="(card, i) in cardList"
              :key="i"
              :icon="card.icon"
              :title="card.title"
              :desc="card.desc"
            />
          </div>
        </div>
        <div class="advantages2__img _scale-img">
          <img :src="img" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconAdvantage1 from '~/assets/img/advantage-icon2.svg';
import IconAdvantage2 from '~/assets/img/advantage-icon7.svg';
import IconAdvantage3 from '~/assets/img/advantage-icon.svg';
export default {
  props: {
    img: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cardList: [
        {
          icon: IconAdvantage1,
          title: 'Гарантия качества',
          desc: 'Проверьте портфолио любого исполнителя, отзывы <br> клиентов и подтверждение личности.',
        },
        {
          icon: IconAdvantage2,
          title: 'Бесплатно, пока не найдете исполнителя',
          desc: 'Проведите собеседование с потенциальным кандидатом, подходящим для вашей работы, договоритесь о стоимости и платите только за ту работу, которую вы одобрите.',
        },
        {
          icon: IconAdvantage3,
          title: 'Безопасно и надежно',
          desc: 'Сосредоточьтесь на своей работе, зная, что мы помогаем защитить ваши данные и конфиденциальность. Мы здесь с круглосуточной поддержкой, если вам это нужно.',
        },
      ],
    };
  },
};
</script>
