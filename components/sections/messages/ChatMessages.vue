<template>
  <div
    v-infinite-scroll="[
      loadMessages,
      {
        direction: 'top',
        interval: 200,
        distance: 10,
        canLoadMore: () => {
          return (
            messagesStore.totalCountMessages > messagesStore.messages.length
          );
        },
      },
    ]"
    class="messages"
  >
    <SectionsMessagesChatMessage
      v-for="message in messagesStore.messages.filter(
        (item) => item.chat_id === messagesStore.activeChat?._id,
      )"
      :key="message._id"
      class="item"
      :message="message"
    ></SectionsMessagesChatMessage>
  </div>
</template>

<script setup lang="ts">
import { vInfiniteScroll } from '@vueuse/components';
const messagesStore = useMessagesStore();
async function loadMessages() {
  messagesStore.messagesListOffset += 1;
  await messagesStore.fetchChatMessagesList({
    chat_id: messagesStore.activeChat._id,
    offset: messagesStore.messagesListOffset,
  });
}
</script>
