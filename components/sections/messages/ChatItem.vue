<template>
  <div class="chat-item">
    <div class="avatar">
      <img
        v-if="messagesStore.getRespondent(props.chat)?.avatar"
        crossorigin="anonymous"
        :src="
          getAvatarUrl(messagesStore.getRespondent(props.chat)?.avatar?.url)
        "
        alt=""
      />

      <div v-else>
        <Avatar
          :size="80"
          :name="messagesStore.getRespondent(props.chat)?.name"
        />
      </div>
    </div>
    <div class="chat-item__info">
      <div class="chat-item__about">
        {{ messagesStore.getRespondent(props.chat)?.name }}
        <img
          v-if="messagesStore.getRespondent(props.chat)?.rate"
          src="/img/star.svg"
          alt=""
        />
        <div class="about-client__rating-text">
          <span>{{ messagesStore.getRespondent(props.chat)?.rate }}</span>
          <!-- (595 отзывов) -->
        </div>
      </div>
      <div class="chat-item__about">
        <!-- {{ messagesStore.getRespondent(props.chat) }} -->
        <div class="about-client__rating">
          <div v-if="'order' in props.chat" class="about-client__rating-text">
            <span>(Заказ №{{ props.chat.order.order_number }})</span>
          </div>
          <p
            v-else-if="'service' in props.chat"
            class="about-client__rating-text"
          >
            {{ props.chat.service.title }}
          </p>
        </div>
      </div>
    </div>

    <div class="chat-item__nums">
      <!-- <div class="chat-item__time">
          {{ $dayjs(item.latestMessage.createdAt).fromNow() }}
        </div>-->
      <div v-if="props.chat.unseen_messages > 0" class="chat-item__count">
        <span>{{ props.chat.unseen_messages }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ChatListItem, OrderChatListItem } from '~/types/messages.types';
const props = defineProps({
  chat: {
    type: Object as PropType<ChatListItem | OrderChatListItem>,
    required: true,
  },
});
const messagesStore = useMessagesStore();
messagesStore.fetchLastMessage(props.chat?._id);
</script>
<style></style>
