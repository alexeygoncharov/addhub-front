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
import { useCommonStore } from '~/stores/common';
import { useUserStore } from '~/stores/user';

const commonStore = useCommonStore();
const userStore = useUserStore();
const authStore = useAuthStore();
commonStore.fetchCategories();
commonStore.fetchCities();
if (authStore.token) {
  userStore.getMyUser();
}
</script>
