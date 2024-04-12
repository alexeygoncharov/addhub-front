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
// import { ref } from 'vue';
// import { useInfiniteScroll } from '@vueuse/core';

const messagesStore = useMessagesStore();
const userStore = useUserStore();
const nuxtApp = useNuxtApp();
const socket = nuxtApp.$socket as Socket;

// const el = ref<HTMLElement | null>(null);

socket.on('new_message', (newMessage) => {
  messagesStore.messages.push(newMessage);
});
</script>
