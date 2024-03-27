<template>
  <div class="project-card">
    <div class="project-card__img">
      <div class="avatar">
        <img
          :src="`${$config.public.apiBase}/${data.createdBy.avatar}`"
          alt=""
          crossorigin="anonymous"
        />
        <span
          v-if="data.createdBy.online_status === 'online'"
          class="service-card__user-online"
        ></span>
      </div>
    </div>
    <div class="project-card__content">
      <div class="project-card__title text20 medium-text">{{ data.title }}</div>
      <div class="project-card__props">
        <div class="project-card__prop">
          <NuxtImg src="/img/prop-icon.svg" alt="" />
          <span>{{ data.address.city.title }}</span>
        </div>
        <div class="project-card__prop">
          <NuxtImg src="/img/prop-icon2.svg" alt="" />
          <span>{{ data.createdAt }}</span>
        </div>
        <div class="project-card__prop">
          <NuxtImg src="/img/prop-icon3.svg" alt="" />
          <span>{{ data.bids.length }} отклик</span>
        </div>
      </div>
      <div class="project-card__text">
        <div class="text15">
          {{ data.description }}
        </div>
      </div>
    </div>
    <div class="project-card__action">
      <div class="project-card__price">
        <div class="text20 medium-text">{{ data.price }} ₽</div>
      </div>
      <button class="project-card__btn m-btn m-btn-blue3">
        <span>Оставить отклик</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { projectsItem } from '~/stores/catalog/catalog.type';
const props = defineProps({
  data: {
    type: Object as PropType<projectsItem>,
    required: true,
  },
});
</script>
