<template>
  <div
    v-if="
      message.sender._id === userStore.user?._id ||
      message.sender === userStore.user?._id
    "
    class="message-item _own"
  >
    <div class="message-user">
      <div class="avatar">
        <img :src="baseUrl() + message.sender?.avatar" alt="" />
      </div>
      <div class="message-user__name">{{ message.sender?.name }}</div>
      <div class="message-user__time">
        <span>{{ $dayjs(message.createdAt).fromNow() }}</span>
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
        <img :src="baseUrl() + message.recipient?.avatar" alt="" />
      </div>
      <div class="message-user__name">{{ message.recipient?.name }}</div>
      <div class="message-user__time">
        <span>{{ $dayjs(message.createdAt).fromNow() }}</span>
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
// console.log('message tutu = ', props.message);
</script>
