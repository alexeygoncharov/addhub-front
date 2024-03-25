<template>
  <div v-show="!isLoading && !isAuthenticated" class="header-action">
    <button class="header-action__search _toggle-search" @click="toggleSearch">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.04606 0C3.16097 0 0 3.16097 0 7.04606C0 10.9314 3.16097 14.0921 7.04606 14.0921C10.9314 14.0921 14.0921 10.9314 14.0921 7.04606C14.0921 3.16097 10.9314 0 7.04606 0ZM7.04606 12.7913C3.87816 12.7913 1.30081 10.214 1.30081 7.04609C1.30081 3.87819 3.87816 1.30081 7.04606 1.30081C10.214 1.30081 12.7913 3.87816 12.7913 7.04606C12.7913 10.214 10.214 12.7913 7.04606 12.7913Z"
          fill="#222222"
        />
        <path
          d="M15.8094 14.8898L12.0804 11.1608C11.8263 10.9067 11.4148 10.9067 11.1607 11.1608C10.9066 11.4147 10.9066 11.8266 11.1607 12.0805L14.8897 15.8095C15.0168 15.9365 15.1831 16 15.3496 16C15.5158 16 15.6823 15.9365 15.8094 15.8095C16.0635 15.5556 16.0635 15.1437 15.8094 14.8898Z"
          fill="#222222"
        />
      </svg>
    </button>
    <UIVButton color="blueOutline" class="header-action__btn">
      Стать продавцом
    </UIVButton>
  </div>
  <div v-if="isAuthenticated && !isLoading" class="header-action2">
    <a href="" class="header-action2__btn">
      <NuxtImg src="/img/notification.svg" alt="" />
      <span class="header-action2__btn-pin"></span>
    </a>
    <a href="" class="header-action2__btn _mess">
      <NuxtImg src="/img/message.svg" alt="" />
      <span class="header-action2__btn-pin"></span>
    </a>
    <a href="" class="header-action2__user avatar">
      <NuxtImg src="/img/avatar10.webp" alt="" />
    </a>
    <button class="burger" @click="toggleMenu">
      <NuxtImg src="/img/burger.svg" alt="" class="_view1" />
      <NuxtImg src="/img/burger2.svg" alt="" class="_view2" />
    </button>
  </div>
  <div v-else class="header-action2">
    <NuxtLink to="/login" class="header-action__login">
      <span>Войти</span>
    </NuxtLink>
    <UIVButton path="/reg" color="blue" class="header-action__btn">
      Зарегистрироваться
    </UIVButton>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
const mobMenu = defineModel<boolean>({ required: true });
const toggleMenu = () => {
  mobMenu.value = !mobMenu.value;
};
const { isAuthenticated, isLoading } = storeToRefs(authStore);
const { logout } = authStore;
</script>
