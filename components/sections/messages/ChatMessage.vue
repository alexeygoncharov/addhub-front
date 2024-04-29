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
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1_2)">
            <mask
              id="mask0_1_2"
              style="mask-type: luminance"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="16"
              height="16"
            >
              <path d="M16 0H0V16H16V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_1_2)">
              <path
                d="M4 9L7 12L13.5 4.5M28.5 0L23.5 6.5V8.5L27 12.5L31 15.5"
                stroke="#5E67FF"
                stroke-width="1.6"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_1_2">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <svg
          v-else
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_0_9)">
            <mask
              id="mask0_0_9"
              style="mask-type: luminance"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="16"
              height="16"
            >
              <path d="M16 0H0V16H16V0Z" fill="white" />
            </mask>
            <g mask="url(#mask0_0_9)">
              <path
                d="M0.5 9L3.5 12L10 4.5M15 4.5L8.5 12L7 10.5"
                stroke="#04B70A"
                stroke-width="1.6"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_0_9">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
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
