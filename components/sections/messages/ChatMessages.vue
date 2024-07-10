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
    <div
      v-if="
        messagesStore.activeChat &&
        'order' in messagesStore.activeChat &&
        messagesStore.activeChat.order?.disputes?.createdBy
      "
      class="messages__split"
    >
      <div class="messages__split-text text14">
        {{
          `${messagesStore.activeChat?.order?.disputes?.createdBy?.name} ${messagesStore.activeChat?.order?.disputes?.createdBy?.surname} открыл диспут`
        }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { vInfiniteScroll } from '@vueuse/components';
const messagesStore = useMessagesStore();
async function loadMessages() {
  if (!messagesStore.activeChat) return;
  messagesStore.messagesListOffset += 1;
  await messagesStore.fetchChatMessagesList({
    chat_id: messagesStore.activeChat._id,
    offset: messagesStore.messagesListOffset,
  });
}
</script>
