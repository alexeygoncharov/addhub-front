<template>
  <div class="admin-top">
    <div class="text32 medium-text">Сообщения</div>
  </div>

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
import { io } from 'socket.io-client';
import { useMessagesStore } from '~/stores/messages';
const socket = io('https://hub.rdcd.ru/');
const msg = ref({ recipient: '', message: '' });
const messagesStore = useMessagesStore();
const activeChat = ref(0);
definePageMeta({
  layout: 'profile',
});

function sendMessage() {
  messagesStore.createMessage(msg.value);
}
const isConnected = ref(false);
const transport = ref('N/A');

if (socket.connected) {
  onConnect();
}

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;

  socket.io.engine.on('upgrade', (rawTransport) => {
    transport.value = rawTransport.name;
  });
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = 'N/A';
}

socket.on('connect', onConnect);
socket.on('disconnect', onDisconnect);

onBeforeUnmount(() => {
  socket.off('connect', onConnect);
  socket.off('disconnect', onDisconnect);
});

onMounted(() => {
  messagesStore.fetchMessageList();
  // console.log('messages ', messagesStore.messages);
});
</script>
