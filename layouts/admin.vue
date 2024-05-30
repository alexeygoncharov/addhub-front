<template>
  <div class="m-page admin-page">
    <div
      v-if="commonStore.categories"
      class="wrapper"
      :class="{ wrapper__full: full }"
    >
      <SectionsCommonHeaderAdmin :user="userStore.user" />
      <main class="content" :class="{ content__chat: full }">
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
// const messagesStore = useMessagesStore();
// переместить в другое место потом
const userStore = useUserStore();
const commonStore = useCommonStore();
const full = computed(() => {
  return useRoute().path.includes('/messages');
});
</script>
