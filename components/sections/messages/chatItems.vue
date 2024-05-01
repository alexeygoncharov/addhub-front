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
    <div
      v-for="item in messagesStore.chats.filter((chat) =>
        chat.members.some((member: any) => member._id === userStore?.user?._id),
      )"
      :key="item._id"
      class="chat-item"
      @click="selectChat(item)"
    >
      <div v-if="messagesStore.getRespondent(item)" class="avatar">
        <img
          crossorigin="anonymous"
          :src="getAvatarUrl(messagesStore.getRespondent(item)?.avatar)"
          alt=""
        />
      </div>
      <div class="chat-item__info">
        <div class="chat-item__name">
          {{ messagesStore.getRespondent(item)?.name }}
        </div>
      </div>

      <div class="chat-item__nums">
        <!-- <div class="chat-item__time">
          {{ $dayjs(item.latestMessage.createdAt).fromNow() }}
        </div>-->
        <div
          v-if="
            item.unseen_messages > 0 &&
            item.members[0]?._id === userStore.user?._id
          "
          class="chat-item__count"
        >
          <span>{{ item.unseen_messages }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { vInfiniteScroll } from '@vueuse/components';
const messagesStore = useMessagesStore();
const userStore = useUserStore();
function selectChat(respondent: any) {
  messagesStore.resetMessages();
  messagesStore.activeChat = respondent;
  messagesStore.fetchChatMessagesList({
    chat_id: messagesStore.activeChat?._id,
    offset: messagesStore.messagesListOffset,
  });
}
messagesStore.fetchChats({
  limit: messagesStore.limit,
  offset: 1,
});

async function loadChats() {
  messagesStore.chatListOffset += 1;
  await messagesStore.fetchChats({
    limit: messagesStore.limit,
    offset: messagesStore.chatListOffset,
    search: messagesStore.searchQuery,
  });
}
</script>
