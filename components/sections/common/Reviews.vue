<template>
  <div class="reviews m-section _tabs-parent">
    <div class="container">
      <div class="reviews__top">
        <div class="text32 medium-text">{{ title }}</div>
        <div class="text15 light-text">
          Тысячи довольных клиентов делятся своими впечатлениями
        </div>
      </div>

      <div
        v-for="(card, i) in cardList"
        :key="i"
        :class="['tab-content', `_tab${i + 1}`, { _active: i === 0 }]"
      >
        <ModulesCardsReview :text="card.text" :name="card.name" />
      </div>

      <div class="reviews__tabs">
        <div
          v-for="({ avatar }, i) in cardList"
          :key="i"
          :class="['reviews__tab _tab', { _active: i === 0 }]"
          :data-tab="`_tab${i + 1}`"
        >
          <img :src="avatar" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImgAvatar1 from '~/assets/img/avatar5.webp';
import ImgAvatar2 from '~/assets/img/avatar6.webp';
import ImgAvatar3 from '~/assets/img/avatar7.webp';
import ImgAvatar4 from '~/assets/img/avatar8.webp';
import ImgAvatar5 from '~/assets/img/avatar9.webp';
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cardList: [
        {
          text: '«Наша семья путешествовала на скоростном поезде между городами Японии с нашим багажом — расположение этого отеля облегчило эту задачу. Цена на Agoda была фантастической».',
          name: 'Илья Иванов',
          avatar: ImgAvatar1,
        },
        {
          text: '2 «Наша семья путешествовала на скоростном поезде между городами Японии с нашим багажом — расположение этого отеля облегчило эту задачу. Цена на Agoda была фантастической».',
          name: '2 Илья Иванов',
          avatar: ImgAvatar2,
        },
        {
          text: '3 «Наша семья путешествовала на скоростном поезде между городами Японии с нашим багажом — расположение этого отеля облегчило эту задачу. Цена на Agoda была фантастической».',
          name: '3 Илья Иванов',
          avatar: ImgAvatar3,
        },
        {
          text: '4 «Наша семья путешествовала на скоростном поезде между городами Японии с нашим багажом — расположение этого отеля облегчило эту задачу. Цена на Agoda была фантастической».',
          name: '4 Илья Иванов',
          avatar: ImgAvatar4,
        },
        {
          text: '5 «Наша семья путешествовала на скоростном поезде между городами Японии с нашим багажом — расположение этого отеля облегчило эту задачу. Цена на Agoda была фантастической».',
          name: '5 Илья Иванов',
          avatar: ImgAvatar5,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
