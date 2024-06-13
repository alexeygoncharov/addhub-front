<template>
  <div
    v-infinite-scroll="[
      loadMessages,
      {
        direction: 'top',
        distance: 1000,
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
    <div class="messages__split">
      <div
        v-if="messagesStore.activeChat?.order?.disputes"
        class="messages__split-text text14"
      >
        {{
          `${messagesStore.activeChat?.order?.disputes[0].createdBy} открыл диспут`
        }}
      </div>
    </div>
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
