<template>
  <div class="chat-items">
    <div
      v-for="i in 10"
      :key="i"
      class="chat-item"
      @click="messageStore.activeChat = i"
    >
      <div class="avatar">
        <img src="/img/avatar17.webp" alt="" />
      </div>
      <div class="chat-item__info">
        <div class="chat-item__name">Андрей Ветров</div>
        <div class="chat-item__prof">Руководитель департамента</div>
      </div>
      <div class="chat-item__nums">
        <div class="chat-item__time">35 мин</div>
      </div>
    </div>
  </div>
  <SectionsMessagesChatContent></SectionsMessagesChatContent>
</template>
<script setup lang="ts">
const messageStore = useMessagesStore();
</script>
