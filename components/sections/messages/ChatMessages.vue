<template>
  <div class="messages">
    <!--<div class="messages__split">
      <div class="messages__split-text text14">Андрей Ветров открыл диспут</div>
    </div> -->
    <SectionsMessagesChatMessage
      v-for="message in messagesStore.messages"
      :id="'message' + message._id"
      :key="message._id"
      class="item"
      :message="message"
    ></SectionsMessagesChatMessage>
  </div>
</template>
<script setup lang="ts">
import type { Socket } from 'socket.io-client';

const messagesStore = useMessagesStore();
// const userStore = useUserStore();
const nuxtApp = useNuxtApp();
const socket = nuxtApp.$socket as Socket;
socket.on('new_message', (newMessage) => {
  messagesStore.messages.push(newMessage);
  messagesStore.fetchChats();
  // console.log('new message = ', data);
});
</script>
