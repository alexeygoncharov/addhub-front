<template>
  <div class="messages">
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
const nuxtApp = useNuxtApp();
const socket = nuxtApp.$socket as Socket;

// messagesStore.fetchMessageList({
//   second_side: messagesStore.activeChat._id,
//   offset: messagesStore.offset,
// });

socket.on('new_message', (newMessage) => {
  console.log('new message = ', newMessage);
  messagesStore.messages.push(newMessage);
});
</script>
