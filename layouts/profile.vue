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
  return useRoute().path.includes('/messages');
});
socket.on('new_message', (data) => {
  if (!isFromExistingChat(data.chat._id)) {
    messagesStore.chats.unshift(data.chat);
  } else {
    updateExistingChat(data.chat);
  }
  /// отрефакторить на push
  messagesStore.messages.unshift(data.newMessage);
  messagesStore.lastMessages.forEach((item, index, array) => {
    if (item.chat_id === data.chat._id) {
      array[index] = data.newMessage;
    }
  });
  ///
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

socket.on('update_user', (data) => {
  const respondent = messagesStore.getRespondent(messagesStore.activeChat);
  if (respondent?._id === data.id) respondent.online = data.online_status;
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
      messagesStore.totalUnseenMessages--;
      return item.unseen_messages--;
    }
    return item;
  });
});

onUnmounted(() => {
  socket.off();
});
</script>
