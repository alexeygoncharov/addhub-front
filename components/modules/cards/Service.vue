<template>
  <div class="service-card">
    <button
      class="favorite-btn"
      :class="{
        _added: data && favorites.map((el) => el.id).includes(data?._id),
      }"
      @click.prevent="data && toggleFavorite(data?._id, 'service')"
    >
      <svg
        width="26"
        height="23"
        viewBox="0 0 26 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.0775 12.2216L13.4334 21.5L3.78929 12.2216C3.15317 11.6203 2.65211 10.8976 2.31765 10.0989C1.9832 9.30027 1.82261 8.443 1.84598 7.58109C1.86935 6.71918 2.07619 5.87131 2.45346 5.09087C2.83073 4.31043 3.37026 3.61432 4.03809 3.04638C4.70591 2.47844 5.48756 2.05098 6.33381 1.7909C7.18006 1.53083 8.07257 1.44378 8.95515 1.53524C9.83774 1.62669 10.6913 1.89467 11.462 2.32231C12.2327 2.74994 12.9039 3.32796 13.4334 4.01996C13.9652 3.33298 14.6372 2.76001 15.4074 2.33692C16.1776 1.91382 17.0294 1.64971 17.9095 1.56112C18.7896 1.47252 19.6791 1.56134 20.5222 1.82202C21.3653 2.0827 22.144 2.50963 22.8095 3.07609C23.475 3.64255 24.0129 4.33634 24.3897 5.11405C24.7664 5.89175 24.9739 6.73663 24.999 7.5958C25.0242 8.45497 24.8665 9.30993 24.5359 10.1072C24.2053 10.9044 23.7088 11.6268 23.0775 12.2291"
          stroke="#222222"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    </button>
    <NuxtLink
      v-if="data"
      :to="
        data &&
        `/services/${typeof data.category === 'string' ? commonStore.categories?.find((el) => el._id === data?.category)?.slug : data.category.slug}/${data?._id}`
      "
      class="service-card__slider _nested-slider"
    >
      <Swiper
        :modules="[SwiperPagination, SwiperNavigation]"
        :slides-per-view="'auto'"
        :navigation="{
          prevEl: prevBtn,
          nextEl: nextBtn,
        }"
        :pagination="{
          el: pagination,
        }"
      >
        <SwiperSlide v-for="(path, index) in data.photos" :key="index">
          <div class="service-card__img">
            <img
              :src="`${$config.public.apiBase}/${path.url}`"
              alt=""
              crossorigin="anonymous"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <div v-if="data.photos?.length > 1" class="swiper-nav">
        <div ref="prevBtn" class="swiper-button swiper-button-prev">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.97495 15.0583L2.91661 10L7.97495 4.94168"
              stroke="white"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.0833 10L3.05834 10"
              stroke="white"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div ref="pagination" class="swiper-pagination"></div>
        <div ref="nextBtn" class="swiper-button swiper-button-next">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0251 4.94165L17.0834 9.99998L12.0251 15.0583"
              stroke="white"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.91666 10H16.9417"
              stroke="white"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </NuxtLink>
    <UISkeleton v-else class="service-card__slider--skeleton" />

    <div class="service-card__content">
      <div v-if="data" class="service-card__type">
        <span class="text14">{{ data.title }}</span>
      </div>
      <UISkeleton
        v-else
        class="service-card__type--skeleton service-card__type"
      />

      <NuxtLink
        v-if="data"
        :to="
          data &&
          `/services/${typeof data.category === 'string' ? commonStore.categories?.find((el) => el._id === data?.category)?.slug : data.category.slug}/${data?._id}`
        "
        class="service-card__title text17 medium-text"
      >
        {{ data.title }}
      </NuxtLink>
      <div v-else class="service-card__title--skeleton service-card__title">
        <UISkeleton />
        <UISkeleton />
      </div>

      <div v-if="data" class="service-card__reviews _flex">
        <NuxtImg src="/img/star.svg" alt="" />
        <div class="service-card__reviews-text">
          <span class="text15 medium-text">{{ data.rate }} </span>
          <span class="text14 gray-text">
            {{
              pluralize(
                !Array.isArray(data.reviews)
                  ? data.reviews
                  : data.reviews.length,
                'отзыв',
                'отзыва',
                'отзывов',
              )
            }}
          </span>
        </div>
      </div>
      <div v-else class="service-card__reviews _flex">
        <UISkeleton class="service-card__reviews--skeleton" />
      </div>

      <div v-if="data" class="service-card__bottom _flex">
        <NuxtLink class="service-card__user _flex" @click="redirectTo()">
          <div class="avatar">
            <img
              v-if="data.createdBy.avatar.url"
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
          <div class="service-card__user-name text14">
            {{ `${data.createdBy.name} ${data.createdBy.surname}` }}
          </div>
        </NuxtLink>

        <div class="service-card__price">
          <span class="text14 gray-text">от </span>
          <span class="text17 medium-text"> {{ data.price }} руб.</span>
        </div>
      </div>
      <div v-else class="service-card__bottom _flex">
        <div class="service-card__user _flex">
          <UISkeleton class="avatar--skeleton avatar" />
          <UISkeleton
            class="service-card__user-name--skeleton service-card__user-name"
          />
        </div>
        <UISkeleton class="service-card__price--skeleton service-card__price" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { servicesItem, serviceItem } from '~/stores/catalog/catalog.type';
const { favorites } = storeToRefs(useUserStore());
const commonStore = useCommonStore();
const { toggleFavorite } = useUserStore();
const prevBtn = ref<HTMLDivElement | null>(null);
const nextBtn = ref<HTMLDivElement | null>(null);
const pagination = ref<HTMLDivElement | null>(null);
const route = useRoute();
const props = defineProps({
  data: {
    type: Object as PropType<servicesItem | serviceItem | undefined>,
    default: undefined,
  },
  id: {
    type: String,
    default: undefined,
  },
  store: {
    type: Object as PropType<CatalogStores>,
    default: undefined,
  },
});
const store = props.store;
const redirectTo = () => {
  if (!props.store || !store) return;
  navigateTo({
    path: route.path,
    query: { ...route.query, createdBy: data.value?.createdBy._id || '' },
  });
  store.filters.createdBy = data.value?.createdBy._id || '';
};
const data = ref(props.data);
if (props.id) {
  const { data: res } = await apiFetch<ApiResponse<servicesItem>>(
    `/api/services/${props.id}`,
  );

  if (res.value) {
    data.value = res.value.result;
  }
}
</script>
