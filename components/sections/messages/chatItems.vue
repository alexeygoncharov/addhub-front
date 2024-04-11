<template>
  <div class="chat-items">
    <div
      v-for="item in chats"
      :key="item"
      class="chat-item"
      @click="selectChat(item.user)"
    >
      <div class="avatar">
        <img :src="getAvatarUrl(item.user.avatar)" alt="" />
      </div>
      <div class="chat-item__info">
        <div class="chat-item__name">{{ item.user.name }}</div>
        <div class="chat-item__prof">Руководитель департамента</div>
      </div>
      <div class="chat-item__nums">
        <div class="chat-item__time">35 мин</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const messageStore = useMessagesStore();
const chats = await messageStore.fetchChats();

function selectChat(respondent: any) {
  messageStore.activeChat = respondent;
  messageStore.fetchMessageList(respondent._id);
}
</script>
