<template>
  <div class="messages">
    <!--<div class="messages__split">
      <div class="messages__split-text text14">Андрей Ветров открыл диспут</div>
    </div> -->
    <SectionsMessagesChatMessage
      v-for="message in messagesStore.messages"
      :id="'message' + message._id"
      :key="message._id"
      class="item"
      :message="message"
    ></SectionsMessagesChatMessage>
  </div>
</template>
<script setup lang="ts">
const messagesStore = useMessagesStore();
console.log('messages tut = ', messagesStore.messages);
</script>
