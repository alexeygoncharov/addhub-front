<template>
  <div class="messages">
    <div class="messages__split">
      <div class="messages__split-text text14">Андрей Ветров открыл диспут</div>
    </div>

    <div class="message-item">
      <div class="message-user">
        <div class="avatar">
          <img src="" alt="" />
        </div>
        <div class="message-user__name">{{ 'sdasdasdsa' }}</div>
        <div class="message-user__time">
          <span>35 мин</span>
        </div>
      </div>

      <div class="message-item__content">
        <div class="message-item__text">
          {{ 'item.message' }}
        </div>
      </div>
    </div>

    <div class="message-item _own">
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
          Насколько вероятно, что вы порекомендуете нашу компанию своим друзьям
          и родственникам?
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const messagesStore = useMessagesStore();
</script>
