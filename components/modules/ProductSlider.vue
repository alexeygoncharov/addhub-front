<template>
  <div class="product-slider">
    <Swiper
      :modules="[SwiperPagination, SwiperNavigation]"
      :slides-per-view="'auto'"
      :navigation="{
        prevEl: '.product-slider .product-slider__nav .swiper-button-prev',
        nextEl: '.product-slider .product-slider__nav .swiper-button-next',
      }"
      :pagination="{
        el: '.product-slider .product-slider__nav .swiper-pagination',
      }"
    >
      <SwiperSlide
        v-for="item in catalogStore.items"
        :key="item._id"
        class="product-slider__slide"
      >
        <ModulesCardsServices :data="item" />
      </SwiperSlide>
    </Swiper>
    <div v-if="showNav" class="product-slider__nav swiper-nav">
      <div class="swiper-button swiper-button-prev">
        <svg
          class="_view1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.56995 18.0699L3.49995 11.9999L9.56995 5.92995"
            stroke="#5E67FF"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20.5 12L3.67 12"
            stroke="#5E67FF"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          class="_view2"
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.98244 9.20279L11.6142 16.8134C11.8642 17.0626 12.269 17.0622 12.5187 16.8121C12.7681 16.5621 12.7675 16.157 12.5174 15.9076L5.33991 8.74998L12.5176 1.59236C12.7677 1.34293 12.7683 0.938134 12.5189 0.688057C12.3938 0.562696 12.2299 0.500015 12.0659 0.500015C11.9024 0.500015 11.7391 0.562277 11.6142 0.686768L3.98244 8.2972C3.86201 8.41701 3.79443 8.58008 3.79443 8.74998C3.79443 8.91987 3.8622 9.08275 3.98244 9.20279Z"
            fill="#222222"
          />
        </svg>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button swiper-button-next">
        <svg
          class="_view1"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.4301 5.93005L20.5001 12.0001L14.4301 18.0701"
            stroke="#5E67FF"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.5 12H20.33"
            stroke="#5E67FF"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          class="_view2"
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.0176 8.29721L5.38584 0.686587C5.13579 0.437381 4.73097 0.4378 4.48134 0.687877C4.23191 0.937921 4.23255 1.34298 4.48263 1.59238L11.6601 8.75002L4.48237 15.9076C4.23233 16.1571 4.23168 16.5619 4.48108 16.8119C4.60622 16.9373 4.77015 17 4.93409 17C5.09761 17 5.2609 16.9377 5.38581 16.8132L13.0176 9.2028C13.138 9.08299 13.2056 8.91992 13.2056 8.75002C13.2056 8.58013 13.1378 8.41725 13.0176 8.29721Z"
            fill="#222222"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalogServicesStore } from '~/stores/catalog/services';
const showNav = ref(true);
const catalogStore = useCatalogServicesStore();
</script>
