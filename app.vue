<template>
  <UILoader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <SectionsCommonConfirmLogout v-if="authStore.isAuthenticated" />
</template>

<script setup lang="ts">
import type { Socket } from 'socket.io-client';
const nuxtApp = useNuxtApp();
const socket = nuxtApp.$socket as Socket;
const authStore = useAuthStore();
const commonStore = useCommonStore();
const { getFavorites } = useUserStore();

definePageMeta({
  middleware: 'redirect-if-authenticated',
});

// Инициализация данных приложения
getFavorites();
commonStore.fetchCategories();
commonStore.fetchCountries();
commonStore.fetchCities();
if (!authStore.isAuthenticated) {
  authStore.loadToken();
} else {
  socket.connect();
}
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - AddHub.io` : 'AddHub.io';
  },
  meta: [{ name: 'description', content: 'Addhub - Биржа услуг' }],
});
</script>
