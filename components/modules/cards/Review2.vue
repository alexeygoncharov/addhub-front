<template>
  <div class="review-card2">
    <div class="review-card2__top">
      <div class="avatar">
        <img
          v-if="data.recipient.avatar"
          :src="baseUrl() + data.recipient.avatar.url"
          alt=""
          crossorigin="anonymous"
        />
        <div v-else><Avatar :size="80" :name="data.recipient.name" /></div>
      </div>
      <div class="review-card2__content">
        <div class="review-card2__name text15 medium-text">
          {{ data.recipient.name }}
        </div>
        <div class="review-card2__info _flex">
          <div class="service-card__reviews _flex">
            <img src="/img/star.svg" alt="" />
            <div class="service-card__reviews-text">
              <span class="text15 medium-text">{{ data.rate }}</span>
            </div>
          </div>
          <!-- <div class="review-card2__time">
            <span class="_view1 text14 light-text gray-text">
              Опубликовано {{ $dayjs(data.created_at).fromNow() }}
            </span>
            <span class="_view2 text14 light-text gray-text"> 2 месяца </span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="review-card2__text">
      <div class="text15 light-text">
        {{ data.message }}
      </div>
    </div>
    <!-- <div class="review-card2__nav">
      <button class="m-btn m-btn-blue3">
        <span>Ответить</span>
      </button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { type Review } from '~/types/profile.type';
const props = defineProps<{ data: Review }>();
</script>

<style scoped></style>
