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
        <span v-if="user">{{
          user.active_role === 'buyer' ? 'Фрилансерам' : 'Клиентам'
        }}</span>
      </div>
      <div
        class="m-tab _tab"
        data-tab="_tab2"
        :class="{ _active: !fromMe }"
        @click="fromMe = false"
      >
        <span v-if="user">{{
          user.active_role === 'buyer' ? 'От фрилансеров' : 'От клиентов'
        }}</span>
      </div>
    </div>

    <div v-if="fromMe" class="tab-content _active">
      <div class="reviews-page__items">
        <ModulesCardsReview2
          v-for="review of myReviews"
          :key="review._id"
          :data="review"
        />
      </div>
    </div>
    <div v-else class="tab-content">
      <div class="reviews-page__items">
        <ModulesCardsReview2
          v-for="review of reviews"
          :key="review._id"
          :data="review"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '~/types/profile.type';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const fromMe = ref(true);
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
const reviews = ref<Review[]>();
const myReviews = ref<Review[]>();
const updateMyReviews = async () => {
  const { data } = await apiFetch<ApiListResponse<Review[]>>(
    '/api/reviews/my',
    {
      needToken: true,
    },
  );
  const value = data.value;
  if (value?.status === 200) {
    myReviews.value = value.result;
  }
};
const updateReviews = async () => {
  const { data } = await apiFetch<ApiListResponse<Review[]>>(
    `/api/reviews/me`,
    {
      needToken: true,
    },
  );
  const value = data.value;
  if (value?.status === 200) {
    reviews.value = value.result;
  }
};
updateMyReviews();
updateReviews();
</script>

<style lang="scss" scoped></style>
