<template>
  <div class="m-page">
    <div v-if="commonStore.categories" class="wrapper">
      <SectionsCommonHeader />
      <main class="content">
        <slot></slot>
      </main>
      <SectionsCommonFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const userStore = useUserStore();
const { getFavorites } = useUserStore();
const commonStore = useCommonStore();
getFavorites();
commonStore.fetchCategories();
commonStore.fetchCities();
authStore.loadToken();
if (authStore.token) {
  await userStore.getMyUser();
}
</script>
