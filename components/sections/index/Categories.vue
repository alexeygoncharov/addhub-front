<template>
  <div class="categories m-section">
    <div class="container">
      <UISectionTop
        title="Поиск исполнителя по специальности"
        desc="Получите вдохновение от более чем 1800 навыков"
        link-text="Все категории"
      />

      <Swiper v-bind="swiperOptions" class="categories-slider slider">
        <SwiperSlide v-for="(card, idx) in cardList" :key="card.title">
          <a href="" class="category-card">
            <div class="category-card__icon">
              <img :src="card.icon" alt="" />
            </div>
            <div class="category-card__count">
              <span class="text15">1.853 предложений</span>
            </div>
            <div class="category-card__info">
              <div class="text20">{{ card.title }}</div>
              <div class="text14 light-text gray-text">
                Инженер-программист, веб-/мобильный разработчик и многое другое
              </div>
            </div>
          </a>
        </SwiperSlide>
        <div class="swiper-nav">
          <div class="swiper-button swiper-button-prev">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.56995 18.0699L3.49995 11.9999L9.56995 5.92995"
                stroke="#5E67FF"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.5 12L3.67 12"
                stroke="#5E67FF"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button swiper-button-next">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4301 5.93005L20.5001 12.0001L14.4301 18.0701"
                stroke="#5E67FF"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.5 12H20.33"
                stroke="#5E67FF"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </Swiper>
    </div>
  </div>
</template>

<script>
import IconCategory1 from '~/assets/img/category-icon.svg';
import IconCategory2 from '~/assets/img/category-icon2.svg';
import IconCategory3 from '~/assets/img/category-icon3.svg';
import IconCategory4 from '~/assets/img/category-icon4.svg';
import IconCategory5 from '~/assets/img/category-icon5.svg';
import IconCategory6 from '~/assets/img/category-icon6.svg';
import IconCategory7 from '~/assets/img/category-icon7.svg';
import IconCategory8 from '~/assets/img/category-icon8.svg';
import { useSwiper } from '~/composables/useSwiper.js';
export default {
  setup() {
    const { swiperOptions } = useSwiper();
    return {
      swiperOptions,
    };
  },
  data() {
    return {
      cardList: [
        {
          icon: IconCategory1,
          title: 'Разработка и ИТ',
        },
        {
          icon: IconCategory2,
          title: 'Дизайн и творчество',
        },
        {
          icon: IconCategory3,
          title: 'Цифровой маркетинг',
        },
        {
          icon: IconCategory4,
          title: 'Копирайтинг и перевод',
        },
        {
          icon: IconCategory5,
          title: 'Музыка и аудио',
        },
        {
          icon: IconCategory6,
          title: 'Видео и анимация',
        },
        {
          icon: IconCategory7,
          title: 'Инженерия и архитектура',
        },
        {
          icon: IconCategory8,
          title: 'Финансы и бухгалтерский учет',
        },
      ],
    };
  },
};
</script>
