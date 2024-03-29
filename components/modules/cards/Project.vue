<template>
  <div class="project-card">
    <div class="project-card__img">
      <div v-if="data" class="avatar">
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
      <div v-else class="avatar avatar--skeleton">
        <UISkeleton />
      </div>
    </div>
    <div v-if="data" class="project-card__content">
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
    <div v-else class="project-card__content">
      <UISkeleton class="project-card__title--skeleton" />
      <div class="project-card__props">
        <div class="project-card__prop project-card__prop--skeleton">
          <NuxtImg src="/img/prop-icon.svg" alt="" />
          <UISkeleton></UISkeleton>
        </div>
        <div class="project-card__prop project-card__prop--skeleton">
          <NuxtImg src="/img/prop-icon2.svg" alt="" />
          <UISkeleton></UISkeleton>
        </div>
        <div class="project-card__prop project-card__prop--skeleton">
          <NuxtImg src="/img/prop-icon3.svg" alt="" />
          <UISkeleton></UISkeleton>
        </div>
      </div>
      <div class="project-card__text project-card__text--skeleton">
        <UISkeleton> </UISkeleton>
        <UISkeleton> </UISkeleton>
      </div>
    </div>
    <div class="project-card__action">
      <div class="project-card__price">
        <div v-if="data" class="text20 medium-text">{{ data.price }} ₽</div>
        <UISkeleton v-else class="project-card__price--skeleton"></UISkeleton>
      </div>
      <button
        v-if="data && !isSendBid"
        class="project-card__btn m-btn m-btn-blue3"
      >
        <NuxtLink :to="`/bid/${data?._id}`"
          ><span>Оставить отклик</span></NuxtLink
        >
      </button>
      <button
        v-else-if="data && isSendBid"
        class="project-card__btn m-btn m-btn-blue3"
      >
        <NuxtLink :to="`/bid/${data?._id}`"
          ><span>Уже откликнулись</span></NuxtLink
        >
      </button>
      <UISkeleton
        v-else
        class="project-card__btn project-card__btn--skeleton"
      ></UISkeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { projectsItem } from '~/stores/catalog/catalog.type';

const userStore = useUserStore();
const props = defineProps({
  data: {
    type: Object as PropType<projectsItem | undefined>,
    default: undefined,
  },
});

// TODO доработать запрос на бэке
const isSendBid = computed(() => {
  return props.data?.bids.find((bid) => {
    return bid.user === userStore.user?._id;
  });
});
</script>
