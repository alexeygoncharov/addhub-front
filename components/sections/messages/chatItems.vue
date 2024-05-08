<template>
  <div
    v-infinite-scroll="[
      loadChats,
      {
        distance: 10,
        canLoadMore: () => {
          return messagesStore.totalCountChats > messagesStore.chats.length;
        },
      },
    ]"
    class="chat-items"
  >
    <SectionsMessagesChatItem
      v-for="item in messagesStore.chats.filter((chat) =>
        chat.members.some((member) => member._id === userStore?.user?._id),
      )"
      :key="item._id"
      class="chat-item"
      :chat="item"
      @click="selectChat(item)"
    ></SectionsMessagesChatItem>
  </div>
</template>
<script setup lang="ts">
import { vInfiniteScroll } from '@vueuse/components';
const messagesStore = useMessagesStore();
const userStore = useUserStore();
function selectChat(respondent: ChatItem) {
  messagesStore.resetMessages();
  messagesStore.activeChat = respondent;
  messagesStore.fetchChatMessagesList({
    chat_id: messagesStore.activeChat?._id,
    offset: messagesStore.messagesListOffset,
  });
}

async function loadChats() {
  messagesStore.chatListOffset += 1;
  await messagesStore.fetchChats({
    limit: messagesStore.limit,
    offset: messagesStore.chatListOffset,
    search: messagesStore.searchQuery,
  });
}

onMounted(() => {
  messagesStore.fetchChats({
    limit: messagesStore.limit,
    offset: 1,
  });
});
</script>
