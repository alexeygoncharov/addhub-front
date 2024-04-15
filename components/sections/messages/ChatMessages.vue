<template>
  <div
    v-infinite-scroll="[
      loadMessages,
      {
        direction: 'top',
        interval: 200,
        distance: 10,
        canLoadMore: () => {
          return messagesStore.isLoadedMessages.length;
        },
      },
    ]"
    class="messages"
  >
    <SectionsMessagesChatMessage
      v-for="message in messagesStore.messages"
      :key="message._id"
      class="item"
      :message="message"
    ></SectionsMessagesChatMessage>
  </div>
</template>

<script setup lang="ts">
import type { Socket } from 'socket.io-client';
import { vInfiniteScroll } from '@vueuse/components';
const messagesStore = useMessagesStore();
const nuxtApp = useNuxtApp();
const socket = nuxtApp.$socket as Socket;

async function loadMessages() {
  messagesStore.offset += 1;
  await messagesStore.fetchMessageList({
    second_side: messagesStore.activeChat._id,
    offset: messagesStore.offset,
  });
}

socket.on('new_message', (newMessage) => {
  messagesStore.messages.push(newMessage);
});
</script>
