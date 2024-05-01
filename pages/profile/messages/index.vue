<template>
  <div class="chat _active">
    <button class="chat__back">
      <span>Назад</span>
    </button>
    <div class="chat__sidebar">
      <div class="chat-search fg">
        <input
          v-model="messagesStore.searchQuery"
          type="text"
          placeholder="Поиск"
          @input="debouncedFn"
        />
        <img src="/img/search2.svg" alt="" class="chat-search__icon" />
      </div>
      <SectionsMessagesChatItems></SectionsMessagesChatItems>
    </div>
    <SectionsMessagesChatContent></SectionsMessagesChatContent>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
const messagesStore = useMessagesStore();
const debouncedFn = () => {
  messagesStore.resetСhats();
  messagesStore.fetchChats({
    limit: messagesStore.limit,
    offset: messagesStore.chatListOffset,
    search: messagesStore.searchQuery,
  });
};

definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});

onBeforeUnmount(() => {
  messagesStore.resetСhats();
  messagesStore.resetMessages();
  messagesStore.searchQuery = '';
});
</script>
