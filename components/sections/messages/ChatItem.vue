<template>
  <div class="chat-item">
    <div v-if="messagesStore.getRespondent(props.chat)" class="avatar">
      <img
        crossorigin="anonymous"
        :src="getAvatarUrl(messagesStore.getRespondent(props.chat)?.avatar.url)"
        alt=""
      />
    </div>
    <div class="chat-item__info">
      <div class="chat-item__name">
        {{ messagesStore.getRespondent(props.chat)?.name }}
      </div>
    </div>

    <div class="chat-item__nums">
      <!-- <div class="chat-item__time">
          {{ $dayjs(item.latestMessage.createdAt).fromNow() }}
        </div>-->
      <div
        v-if="props.chat.unseen_messages > 0 && isMyUnreadMessages"
        class="chat-item__count"
      >
        <span>{{ props.chat.unseen_messages }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});
const userStore = useUserStore();
const messagesStore = useMessagesStore();
const isMyUnreadMessages = computed(() => {
  return messagesStore.lastMessages.find((item) => {
    return (
      (item?.recipient === userStore.user?._id &&
        item.chat_id === props.chat._id) ||
      (item?.recipient?._id === userStore.user?._id &&
        item.chat_id === props.chat._id)
    );
  });
});

onMounted(() => {
  messagesStore.fetchLastMessage(props.chat?._id);
});
</script>

<style></style>
