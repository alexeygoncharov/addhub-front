<template>
  <UILoader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const userStore = useUserStore();
const commonStore = useCommonStore();
const { getFavorites } = useUserStore();
getFavorites();
commonStore.fetchCategories();
commonStore.fetchCities();
authStore.loadToken();
if (authStore.token) {
  await userStore.getMyUser();
}
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - AddHub.io` : 'AddHub.io';
  },
  meta: [{ name: 'description', content: 'Addhub - Биржа услуг' }],
});
</script>
