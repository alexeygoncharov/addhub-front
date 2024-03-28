<template>
  <div class="reviews m-section _tabs-parent">
    <div class="container">
      <div class="reviews__top">
        <div class="text32 medium-text">{{ title }}</div>
        <div class="text15 light-text">
          Тысячи довольных клиентов делятся своими впечатлениями
        </div>
      </div>

      <div :class="['tab-content', '_active']">
        <ModulesCardsReview :text="currentTab.text" :name="currentTab.name" />
      </div>

      <div class="reviews__tabs">
        <div
          v-for="({ avatar }, i) in cardList"
          :key="i"
          :class="[
            'reviews__tab _tab',
            { _active: cardList.indexOf(currentTab) === i },
          ]"
          @click="changeTab(i)"
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
const currentTab = ref(cardList.value[0]);
const changeTab = (i: number) => {
  currentTab.value = cardList.value[i];
};
</script>
