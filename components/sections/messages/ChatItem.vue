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
      <div class="chat-item__about">
        {{ messagesStore.getRespondent(props.chat)?.user_name }}
        <div class="about-client__rating">
          <img src="/img/star.svg" alt="" />
          <div
            v-if="messagesStore.activeTab == 'chats'"
            class="about-client__rating-text"
          >
            <span>{{ messagesStore.getRespondent(props.chat)?.rate }}</span>
            <!-- (595 отзывов) -->
          </div>
          <div
            v-else-if="'order' in props.chat"
            class="about-client__rating-text"
          >
            <span>Заказ ({{ props.chat.order.service.title }})</span>
          </div>
        </div>
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
    type: Object as PropType<ChatItem | OrderChatItem>,
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

messagesStore.fetchLastMessage(props.chat?._id);
</script>

<style></style>
