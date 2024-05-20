<template>
  <div class="service-card2">
    <div class="service-card2__img">
      <div v-if="data" class="avatar">
        <img
          v-if="data.createdBy.avatar"
          :src="baseUrl() + data.createdBy.avatar.url"
          alt=""
          crossorigin="anonymous"
        />
        <div v-else><Avatar :size="80" :name="data.createdBy.name" /></div>
        <span
          v-if="data.createdBy.online_status === 'online'"
          class="service-card__user-online"
        ></span>
      </div>
      <div v-else class="avatar avatar--skeleton">
        <UISkeleton />
      </div>
    </div>
    <NuxtLink
      v-if="data"
      :to="`/projects/${data.category.slug}/${data?._id}`"
      class="service-card2__content"
    >
      <div class="service-card2__title text20 medium-text">
        {{ data.title }}
      </div>
      <div class="service-card2__props">
        <div class="service-card2__prop">
          <NuxtImg src="/img/prop-icon.svg" alt="" />
          <span>{{ data.address.city.title }}</span>
        </div>
        <div class="service-card2__prop">
          <NuxtImg src="/img/prop-icon2.svg" alt="" />
          <span>{{
            new Date(data.createdAt)
              .toISOString()
              .slice(0, 16)
              .replace('T', ' в ')
              .replace(/-/g, '.')
              .replace(/(\d{4})\.(\d{2})\.(\d{2})/, '$3.$2.$1')
          }}</span>
        </div>
        <div class="service-card2__prop">
          <NuxtImg src="/img/prop-icon3.svg" alt="" />
          <span
            >{{ pluralize(data.bids.length, 'отклик', 'отклика', 'откликов') }}
          </span>
        </div>
      </div>
      <div class="service-card2__text">
        <div class="text15">
          {{ data.description }}
        </div>
      </div>
    </NuxtLink>
    <div v-else class="service-card2__content">
      <UISkeleton class="service-card2__title--skeleton" />
      <div class="service-card2__props">
        <div class="service-card2__prop service-card2__prop--skeleton">
          <NuxtImg src="/img/prop-icon.svg" alt="" />
          <UISkeleton></UISkeleton>
        </div>
        <div class="service-card2__prop service-card2__prop--skeleton">
          <NuxtImg src="/img/prop-icon2.svg" alt="" />
          <UISkeleton></UISkeleton>
        </div>
        <div class="service-card2__prop service-card2__prop--skeleton">
          <NuxtImg src="/img/prop-icon3.svg" alt="" />
          <UISkeleton></UISkeleton>
        </div>
      </div>
      <div class="service-card2__text service-card2__text--skeleton">
        <UISkeleton> </UISkeleton>
        <UISkeleton> </UISkeleton>
      </div>
    </div>
    <div
      v-if="userStore.user?.active_role === 'seller'"
      class="service-card2__action"
    >
      <div class="service-card2__price">
        <div v-if="data" class="text20 medium-text">{{ data.price }} руб.</div>
        <UISkeleton v-else class="service-card2__price--skeleton"></UISkeleton>
      </div>
      <button
        v-if="data && !userBid"
        class="service-card2__btn m-btn m-btn-blue3"
        @click="openBidModal()"
      >
        <span>Оставить отклик</span>
      </button>
      <button
        v-else-if="data"
        class="service-card2__btn m-btn m-btn-blue-outline"
      >
        <span>Уже откликнулись</span>
      </button>
      <UISkeleton
        v-else
        class="service-card2__btn service-card2__btn--skeleton"
      ></UISkeleton>
    </div>
    <ModulesProductBidModal
      v-if="showBid && data"
      :id="data?._id"
      v-model="showBid"
      v-model:item="data"
    />
  </div>
</template>

<script setup lang="ts">
import type { projectsItem } from '~/stores/catalog/catalog.type';
const showBid = ref(false);
const commonStore = useCommonStore();
const userStore = useUserStore();
const data = defineModel<projectsItem>();
const openBidModal = () => {
  if (!userStore.user) {
    return navigateTo('/login');
  }
  showBid.value = true;
};
// TODO доработать запрос на бэке
const userBid = computed(() => {
  return data.value?.bids.find((bid) => {
    return bid.user === userStore.user?._id;
  });
});
</script>
