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
          <NuxtImg :src="'/img/' + avatar" alt="" />
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
});
const cardList = ref([
  {
    text: '«Наша семья путешествовала на скоростном поезде между городами Японии с нашим багажом — расположение этого отеля облегчило эту задачу. Цена на Agora была фантастической».',
    name: 'Илья Иванов',
    avatar: 'avatar5.webp',
  },
  {
    text: '2 «Наша семья путешествовала на скоростном поезде между городами Японии с нашим багажом — расположение этого отеля облегчило эту задачу. Цена на Agora была фантастической».',
    name: '2 Илья Иванов',
    avatar: 'avatar6.webp',
  },
  {
    text: '3 «Наша семья путешествовала на скоростном поезде между городами Японии с нашим багажом — расположение этого отеля облегчило эту задачу. Цена на Agora была фантастической».',
    name: '3 Илья Иванов',
    avatar: 'avatar7.webp',
  },
  {
    text: '4 «Наша семья путешествовала на скоростном поезде между городами Японии с нашим багажом — расположение этого отеля облегчило эту задачу. Цена на Agora была фантастической».',
    name: '4 Илья Иванов',
    avatar: 'avatar8.webp',
  },
  {
    text: '5 «Наша семья путешествовала на скоростном поезде между городами Японии с нашим багажом — расположение этого отеля облегчило эту задачу. Цена на Agora была фантастической».',
    name: '5 Илья Иванов',
    avatar: 'avatar9.webp',
  },
]);
</script>
