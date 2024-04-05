<template>
  <ModulesProfileTop>Отзывы</ModulesProfileTop>

  <div class="reviews-page _tabs-parent">
    <div class="tabs">
      <div
        class="m-tab _tab"
        data-tab="_tab1"
        :class="{ _active: fromMe }"
        @click="fromMe = true"
      >
        <span>{{
          user.active_role === 'buyer' ? 'Фрилансерам' : 'Клиентам'
        }}</span>
      </div>
      <div
        class="m-tab _tab"
        data-tab="_tab2"
        :class="{ _active: !fromMe }"
        @click="fromMe = false"
      >
        <span>{{
          user.active_role === 'buyer' ? 'От фрилансеров' : 'От клиентов'
        }}</span>
      </div>
    </div>

    <div class="tab-content _tab1" :class="{ _active: fromMe }">
      <div class="reviews-page__items">
        <ModulesCardsReview2 v-for="i in 3" :key="i" />
      </div>
    </div>
    <div class="tab-content _tab2" :class="{ _active: !fromMe }">
      <div class="reviews-page__items">
        <div class="review-card2">
          <div class="review-card2__top">
            <div class="avatar _blue">
              <span>АВ</span>
            </div>
            <div class="review-card2__content">
              <div class="review-card2__name text15 medium-text">
                Андрей Ветров
              </div>
              <div class="review-card2__info _flex">
                <div class="service-card__reviews _flex">
                  <img src="/img/star.svg" alt="" />
                  <div class="service-card__reviews-text">
                    <span class="text15 medium-text">4.82 </span>
                  </div>
                </div>
                <div class="review-card2__time">
                  <span class="_view1 text14 light-text gray-text">
                    Опубликовано 2 месяца назад
                  </span>
                  <span class="_view2 text14 light-text gray-text">
                    2 месяца
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="review-card2__text">
            <div class="text15 light-text">
              Существует множество вариаций отрывков Lorem Ipsum, но большинство
              из них претерпело изменения в той или иной форме из-за
              привнесенного юмора или случайных слов, которые не выглядят даже
              немного правдоподобно. Если вы собираетесь использовать отрывок из
              Lorem Ipsum, вам нужно быть уверенным, что в середине текста не
              спрятано ничего смущающего.
            </div>
          </div>
          <div class="review-card2__nav">
            <button class="m-btn m-btn-blue3">
              <span>Ответить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const fromMe = ref(true);
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
</script>

<style lang="scss" scoped></style>
