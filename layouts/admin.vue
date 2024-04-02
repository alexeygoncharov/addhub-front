<template>
  <div class="m-page admin-page">
    <div v-if="commonStore.categories" class="wrapper">
      <SectionsCommonHeaderAdmin :user="userStore.user" />
      <main class="content">
        <slot></slot>
      </main>
      <SectionsCommonFooterAdmin />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'authenticated',
});
const userStore = useUserStore();
const commonStore = useCommonStore();
</script>
