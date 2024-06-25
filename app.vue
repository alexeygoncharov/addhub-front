<template>
  <UILoader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <SectionsCommonConfirmLogout v-if="authStore.token" />
</template>

<script setup lang="ts">
import type { Socket } from 'socket.io-client';
const nuxtApp = useNuxtApp();
const socket = nuxtApp.$socket as Socket;
const authStore = useAuthStore();
const userStore = useUserStore();
const paymentsStore = usePaymentsStore();
const commonStore = useCommonStore();
const { getFavorites } = useUserStore();
const messagesStore = useMessagesStore();

interface UpdatedMessage {
  id: string;
  chat_id: string;
  seen: boolean;
}

interface DeletedChat {
  id: string;
}

interface UpdateStatusUser {
  id: string;
  online_status: 'online' | 'offline';
}

interface ChatData {
  chat: ChatItem;
  newMessage: ChatMessage;
  totalUnseen?: number;
}
// Инициализация данных приложения
getFavorites();
commonStore.fetchCategories();
commonStore.fetchCountries();
commonStore.fetchCities();
authStore.loadToken();

const isConnected = ref(false);
const transport = ref('N/A');

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;
  socket.io.engine.on('upgrade', (rawTransport) => {
    transport.value = rawTransport.name;
  });
}

setupSocketListeners();

function onDisconnect() {
  console.log('disconnect');
  isConnected.value = false;
  transport.value = 'N/A';
  // teardownSocketListeners();
}

function setupSocketListeners() {
  socket.on('new_message', handleNewMessage);
  socket.on('delete_chat', handleDeleteChat);
  socket.on('update_user', handleUpdateUser);
  socket.on('update_message', handleUpdateMessage);
  socket.on('new_dispute', (data) => {
    messagesStore.chats.forEach((item) => {
      if (item._id === data.chat._id) {
        item = data.chat;
        if (messagesStore.activeChat?._id === data.chat._id)
          messagesStore.activeChat = data.chat;
      }
    });
  });
}

async function handleNewMessage(data: ChatData) {
  data.chat.unseen_messages = await messagesStore.fetchUnseenCountByChatId(
    data.chat._id,
  );
  messagesStore.fetchTotalUnseenCount();
  if (!isFromExistingChat(data.chat._id)) {
    messagesStore.chats.unshift(data.chat);
  } else {
    updateExistingChat(data.chat);
  }
  messagesStore.messages.unshift(data.newMessage);
  messagesStore.lastMessages.forEach((item, index, array) => {
    if (item.chat_id === data.chat._id) {
      array[index] = data.newMessage;
    }
  });
}

function isFromExistingChat(chatId: string) {
  return messagesStore.chats.some((chat) => chat._id === chatId);
}

function updateExistingChat(newChatData: ChatItem) {
  messagesStore.chats = messagesStore.chats.filter(
    (chat) => chat._id !== newChatData._id,
  );
  messagesStore.chats.unshift(newChatData);
}

function handleDeleteChat(deletedChat: DeletedChat) {
  messagesStore.chats = messagesStore.chats.filter(
    (item) => item._id !== deletedChat.id,
  );
}

function handleUpdateUser(data: UpdateStatusUser) {
  const respondent = messagesStore.getRespondent(messagesStore.activeChat);
  if (respondent && respondent?._id === data?.id)
    respondent.online_status = data.online_status;
}

function handleUpdateMessage(updatedMessage: UpdatedMessage) {
  // отрефакторить
  messagesStore.messages = messagesStore.messages.map((item) => {
    if (item._id === updatedMessage.id) {
      item.seen = true;
    }
    return item;
  });
  // find in chat list chat_id
  messagesStore.fetchTotalUnseenCount();
  messagesStore.chats = messagesStore.chats.map((item) => {
    if (item._id === updatedMessage.chat_id) {
      item.unseen_messages = 0;
    }
    return item;
  });
}

if (authStore.token) {
  await userStore.getMyUser();
  await paymentsStore.fetchRates();
  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
}

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - AddHub.io` : 'AddHub.io';
  },
  meta: [{ name: 'description', content: 'Addhub - Биржа услуг' }],
});

onBeforeUnmount(() => {
  // teardownSocketListeners();
});
</script>
