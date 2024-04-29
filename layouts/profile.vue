<template>
  <div class="m-page admin-page">
    <div
      v-if="commonStore.categories"
      class="wrapper"
      :class="{ wrapper__full: full }"
    >
      <SectionsCommonHeaderProfile :user="userStore.user" />
      <main class="content">
        <slot></slot>
      </main>
      <SectionsCommonFooterProfile />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Socket } from 'socket.io-client';
definePageMeta({
  middleware: 'authenticated',
});
// переместить в другое место потом
const userStore = useUserStore();
const commonStore = useCommonStore();
const messagesStore = useMessagesStore();
const message = ref({ recipient: '', text: '' });
const nuxtApp = useNuxtApp();
const socket = nuxtApp.$socket as Socket;
const full = computed(() => {
  return useRoute().path.includes('/profile');
});

socket.on('new_message', (data) => {
  if (!isFromExistingChat(data.chat._id)) {
    messagesStore.chats.unshift(data.chat);
  } else {
    updateExistingChat(data.chat);
  }

  messagesStore.messages.unshift(data.newMessage);

  function isFromExistingChat(chatId: string) {
    return messagesStore.chats.some((chat) => chat._id === chatId);
  }

  function updateExistingChat(newChatData: any) {
    // Remove outdated chat data and add updated one
    messagesStore.chats = messagesStore.chats.filter(
      (chat) => chat._id !== newChatData._id,
    );
    messagesStore.chats.unshift(newChatData);
  }
});

socket.on('delete_chat', (deletedChat) => {
  messagesStore.chats.filter((item) => item._id !== deletedChat.id);
});

socket.on('update_message', (updatedMessage) => {
  messagesStore.messages.map((item) => {
    if (item._id === updatedMessage.id) {
      return (item.seen = true);
    }
    return item;
  });
  messagesStore.chats.map((item) => {
    if (item._id === updatedMessage.chat_id) {
      return item.unseen_messages--;
    }
    return item;
  });
});
onUnmounted(() => {
  socket.off();
});
</script>
