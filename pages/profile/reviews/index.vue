<template>
  <ModulesProfileTop>Отзывы</ModulesProfileTop>

  <div class="reviews-page _tabs-parent">
    <UITabsSelect
      v-if="user"
      v-model="activeTab"
      full
      :initial-values="[
        {
          title:
            user.active_role === 'buyer' ? 'От фрилансеров' : 'От клиентов',
          value: 'toMe',
        },
        {
          title: user.active_role === 'buyer' ? 'Фрилансерам' : 'Клиентам',
          value: 'fromMe',
        },
      ]"
    />
    <div v-if="activeTab === 'fromMe'" class="tab-content _active">
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
const activeTab = ref('toMe');
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
