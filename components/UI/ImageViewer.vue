<template>
  <div class="fullScreen" @click="enabled = false">
    <div class="swiperContainer">
      <swiper
        :modules="[SwiperNavigation]"
        :slides-per-view="1"
        :navigation="{
          prevEl: prev,
          nextEl: next,
        }"
        :initial-slide="active"
      >
        <swiper-slide v-for="(item, key) in images" :key="key">
          <NuxtImg
            crossorigin="anonymous"
            :src="baseUrl() + item"
            @click.stop
          />
        </swiper-slide>
      </swiper>
    </div>
    <div ref="prev" class="swiper-button swiper-button-prev" @click.stop>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.98242 9.20279L11.6142 16.8134C11.8642 17.0626 12.269 17.0622 12.5187 16.8121C12.7681 16.5621 12.7674 16.157 12.5174 15.9076L5.3399 8.74998L12.5176 1.59236C12.7677 1.34293 12.7683 0.938134 12.5189 0.688057C12.3938 0.562696 12.2298 0.500015 12.0659 0.500015C11.9024 0.500015 11.7391 0.562277 11.6142 0.686768L3.98242 8.2972C3.86199 8.41701 3.79441 8.58008 3.79441 8.74998C3.79441 8.91987 3.86219 9.08275 3.98242 9.20279Z"
          fill="#051036"
        />
      </svg>
    </div>
    <div ref="next" class="swiper-button swiper-button-next" @click.stop>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.0176 8.29721L5.38582 0.686587C5.13578 0.437381 4.73095 0.4378 4.48132 0.687877C4.23189 0.937921 4.23254 1.34298 4.48261 1.59238L11.6601 8.75002L4.48236 15.9076C4.23231 16.1571 4.23167 16.5619 4.48107 16.8119C4.6062 16.9373 4.77014 17 4.93407 17C5.09759 17 5.26088 16.9377 5.38579 16.8132L13.0176 9.2028C13.138 9.08299 13.2056 8.91992 13.2056 8.75002C13.2056 8.58013 13.1378 8.41725 13.0176 8.29721Z"
          fill="#051036"
        />
      </svg>
    </div>
    <img
      src="/img/burger2.svg"
      class="fullScreen__close"
      alt="close"
      @click="enabled = false"
    />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ images: string[]; active: number }>();
const enabled = defineModel<boolean>({ required: true });
const next = ref<HTMLElement | null>(null);
const prev = ref<HTMLElement | null>(null);
</script>

<style lang="scss" scoped>
.fullScreen {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 101;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 52.4%);

  &__close {
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: 1;
    width: 3.75em;
    height: 3.75em;
    padding: 20px;
    cursor: pointer;
    background: rgb(237 237 237);
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0.625em 2.1875em rgb(5 16 54 / 10%);
  }

  .swiperContainer {
    width: 100%;

    .swiperBtn {
      position: absolute;
      top: 50%;
      z-index: 2;
      width: 50px;
      height: 50px;
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    @media (width <= 992px) {
      .swiperBtn {
        width: 30px;
        height: 30px;
      }
    }

    .swiperBtn.prev {
      left: 5vw;
      transform: translate(0, 50%);
      rotate: 180deg;
    }

    .swiperBtn.next {
      right: 5vw;
      transform: translate(0, -50%);
    }

    .swiper-slide {
      display: flex;
      justify-content: center;
      height: auto;

      img {
        width: 80%;
        max-height: 100%;
        object-fit: contain;

        @media screen and (width <= 992px) {
          width: 100%;
        }
      }
    }
  }
}
</style>
