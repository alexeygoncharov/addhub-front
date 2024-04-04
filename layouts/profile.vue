<template>
  <div class="m-page admin-page">
    <div v-if="commonStore.categories" class="wrapper">
      <SectionsCommonHeaderProfile :user="userStore.user" />
      <main class="content">
        <slot></slot>
      </main>
      <SectionsCommonFooterProfile />
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
