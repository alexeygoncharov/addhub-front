<template>
  <div class="projects-card">
    <div class="projects-card__img">
      <div class="avatar">
        <img
          :src="`${$config.public.apiBase}/${data.createdBy.avatar}`"
          alt=""
          crossorigin="anonymous"
        />
        <span
          v-if="data.createdBy.online_status === 'online'"
          class="services-card__user-online"
        ></span>
      </div>
    </div>
    <div class="projects-card__content">
      <div class="projects-card__title text20 medium-text">
        {{ data.title }}
      </div>
      <div class="projects-card__props">
        <div class="projects-card__prop">
          <NuxtImg src="/img/prop-icon.svg" alt="" />
          <span>{{ data.address.city.title }}</span>
        </div>
        <div class="projects-card__prop">
          <NuxtImg src="/img/prop-icon2.svg" alt="" />
          <span>{{ data.createdAt }}</span>
        </div>
        <div class="projects-card__prop">
          <NuxtImg src="/img/prop-icon3.svg" alt="" />
          <span>{{ data.bids.length }} отклик</span>
        </div>
      </div>
      <div class="projects-card__text">
        <div class="text15">
          {{ data.description }}
        </div>
      </div>
    </div>
    <div class="projects-card__action">
      <div class="projects-card__price">
        <div class="text20 medium-text">{{ data.price }} ₽</div>
      </div>
      <div>
        <button v-if="!isSendBid" class="projects-card__btn m-btn m-btn-blue3">
          <NuxtLink :to="`/bid/${data._id}`"
            ><span>Оставить отклик</span></NuxtLink
          >
        </button>
        <button v-else class="projects-card__btn m-btn m-btn-blue3">
          <NuxtLink :to="`/bid/${data._id}`"
            ><span>Уже откликнулись</span></NuxtLink
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { projectsItem } from '~/stores/catalog/catalog.type';
import { useUserStore } from '~/stores/user';
const userStore = useUserStore();
const props = defineProps({
  data: {
    type: Object as PropType<projectsItem>,
    required: true,
  },
});

// TODO доработать запрос на бэке
const isSendBid = props.data.bids.find((bid) => {
  return bid.user === userStore.user?._id;
});
</script>
