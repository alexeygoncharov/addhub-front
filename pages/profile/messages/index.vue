<template>
  <ModulesProfileTop>Сообщения</ModulesProfileTop>

  <div class="chat _active">
    <button class="chat__back">
      <span>Назад</span>
    </button>
    <div class="chat__sidebar">
      <div class="chat-search fg">
        <input type="text" placeholder="Поиск" />
        <img src="/img/search2.svg" alt="" class="chat-search__icon" />
      </div>
      <SectionsMessagesChatItems></SectionsMessagesChatItems>
    </div>
    <SectionsMessagesChatContent></SectionsMessagesChatContent>
  </div>
</template>

<script setup lang="ts">
import { useMessagesStore } from '~/stores/messages';
const messagesStore = useMessagesStore();
await messagesStore.fetchChats();
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
</script>
