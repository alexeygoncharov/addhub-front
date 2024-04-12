<template>
  <div class="chat-items">
    <div
      v-for="item in messageStore.chats"
      :key="item._id"
      class="chat-item"
      @click="selectChat(item.user)"
    >
      <div class="avatar">
        <img :src="getAvatarUrl(item.user.avatar)" alt="" />
      </div>
      <div class="chat-item__info">
        <div class="chat-item__name">{{ item.user.name }}</div>
        <div class="chat-item__prof">{{ item.latestMessage.message }}</div>
      </div>
      <div class="chat-item__nums">
        <div class="chat-item__time">
          {{ dayjs(item.latestMessage.createdAt).fromNow() }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const messageStore = useMessagesStore();
function selectChat(respondent: any) {
  messageStore.resetMessages();
  messageStore.activeChat = respondent;
  messageStore.fetchMessageList({
    second_side: respondent._id,
  });
}
</script>
