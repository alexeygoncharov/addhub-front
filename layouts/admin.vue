<template>
  <div class="m-page admin-page">
    <div v-if="commonStore.categories" class="wrapper">
      <SectionsCommonHeaderAdmin />
      <main class="content">
        <slot></slot>
      </main>
      <SectionsCommonFooterAdmin />
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
</script>
