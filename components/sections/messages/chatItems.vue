<template>
  <div class="chat-items">
    <div
      v-for="item in messagesStore.chats"
      :key="item._id"
      class="chat-item"
      @click="selectChat(item._id)"
    >
      <div class="avatar">
        <img
          crossorigin="anonymous"
          :src="getAvatarUrl(item.members[0].avatar)"
          alt=""
        />
      </div>
      <div class="chat-item__info">
        <div class="chat-item__name">{{ item.members[0].name }}</div>
      </div>
      <div class="chat-item__nums">
        <!-- <div class="chat-item__time">
          {{ $dayjs(item.latestMessage.createdAt).fromNow() }}
        </div>-->
        <div class="chat-item__count">
          <span>2</span>
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
  messagesStore.fetchMessageList({
    second_side: messagesStore.activeChat._id,
    offset: messagesStore.messagesListOffset,
  });
}

messagesStore.fetchChats({
  limit: messagesStore.limit,
  offset: messagesStore.chatListOffset,
});
console.log('chatitems component ', messagesStore.chats);
// async function loadMessages() {
//   messagesStore.chatListOffset += 1;
//   await messagesStore.fetchChats({
//     limit: messagesStore.limit,
//     offset: messagesStore.chatListOffset,
//   });
// }
</script>
