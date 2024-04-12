<template>
  <div v-if="message.sender === userStore.user?._id" class="message-item _own">
    <div class="message-user">
      <div class="avatar">
        <img src="" alt="" />
      </div>
      <div class="message-user__name">Вы</div>
      <div class="message-user__time">
        <span>35 мин</span>
      </div>
    </div>

    <div class="message-item__content">
      <div class="message-item__text">
        {{ message.message }}
      </div>
    </div>
  </div>
  <div v-else class="message-item">
    <div class="message-user">
      <div class="avatar">
        <img src="" alt="" />
      </div>
      <div class="message-user__name">{{ message._id }}</div>
      <div class="message-user__time">
        <span>35 мин</span>
      </div>
    </div>

    <div class="message-item__content">
      <div class="message-item__text">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const userStore = useUserStore();
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>
