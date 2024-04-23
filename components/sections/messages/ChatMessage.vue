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
        <img
          crossorigin="anonymous"
          :src="getAvatarUrl(message.sender?.avatar)"
          alt=""
        />
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
      <div class="message-item__seen_icon">
        <svg
          v-if="!message.seen"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
          />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M342.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 178.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l80 80c12.5 12.5 32.8 12.5 45.3 0l160-160zm96 128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 402.7 54.6 297.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l256-256z"
          />
        </svg>
      </div>
    </div>
  </div>
  <div v-else class="message-item">
    <div class="message-user">
      <div class="avatar">
        <img
          crossorigin="anonymous"
          :src="getAvatarUrl(message.sender?.avatar)"
          alt=""
        />
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
</template>
<script setup lang="ts">
const userStore = useUserStore();
const messagesStore = useMessagesStore();
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  if (props.message.sender._id !== userStore.user?._id && !props.message.seen)
    messagesStore.readMessage({ id: props.message._id, seen: true });
});
</script>
