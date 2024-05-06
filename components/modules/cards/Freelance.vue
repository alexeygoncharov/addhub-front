<template>
  <div class="freelance-card">
    <div class="freelance-card__top">
      <div class="avatar">
        <img
          v-if="data.avatar"
          :src="baseUrl() + data.avatar"
          alt=""
          crossorigin="anonymous"
        />
        <div v-else>
          <Avatar :size="80" :name="data.name" />
        </div>
        <span
          v-if="data.online_status === 'online'"
          class="service-card__user-online"
        ></span>
      </div>
      <div class="freelance-card__info">
        <a href="" class="freelance-card__name">
          {{ `${data.name} ${data.surname}` }}
        </a>
        <div class="freelance-card__prof">{{ data.active_role }}</div>
        <div class="service-card__reviews _flex">
          <NuxtImg src="/img/star.svg" alt="" />
          <div class="service-card__reviews-text">
            <span class="text14">{{ data.rate }}</span>
            <span class="text14 gray-text light-text"> ({{}} отзывов) </span>
          </div>
        </div>
      </div>
    </div>
    <div class="freelance-card__stat">
      <div class="freelance-card__stat-group">
        <div class="freelance-card__stat-title">Город</div>
        <div class="freelance-card__stat-desc">{{}}</div>
      </div>
      <div class="freelance-card__stat-group">
        <div class="freelance-card__stat-title">Рейтинг</div>
        <div class="freelance-card__stat-desc">{{ data.rate }}</div>
      </div>
    </div>
    <span class="freelance-card__nav">
      <a href="" class="m-btn m-btn-blue3">
        <span>Посмотреть профиль</span>
      </a>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { freelancersItem } from '~/stores/catalog/catalog.type';
const props = defineProps({
  data: {
    type: Object as PropType<freelancersItem>,
    required: true,
  },
});
</script>
