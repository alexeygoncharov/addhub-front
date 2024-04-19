<template>
  <div v-infinite-scroll="[loadChats, { distance: 10 }]" class="chat-items">
    <div
      v-for="item in messagesStore.chats"
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
        <div class="chat-item__count">
          <span>{{ item.unseen_messages }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const messagesStore = useMessagesStore();
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
  offset: messagesStore.chatListOffset,
});

async function loadChats() {
  messagesStore.chatListOffset += 1;
  await messagesStore.fetchChats({
    limit: messagesStore.limit,
    offset: messagesStore.chatListOffset,
  });
}
</script>
