<template>
  <div class="chat _active">
    <button class="chat__back">
      <span>Назад</span>
    </button>
    <div class="chat__sidebar">
      <div class="tabs-select">
        <div class="tabs-select__show">
          <div class="tabs-select__current"></div>
        </div>
        <div class="tabs-select__hidden">
          <div class="tabs">
            <div
              class="m-tab _tab"
              :class="{ _active: activeTab === 'chats' }"
              @click="
                async () => {
                  activeTab = 'chats';
                }
              "
            >
              <span>Чаты</span>
            </div>
            <div
              class="m-tab _tab"
              :class="{ _active: activeTab === 'orders' }"
              @click="
                async () => {
                  activeTab = 'orders';
                }
              "
            >
              <span>Заказы</span>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-search fg">
        <input
          v-model="messagesStore.searchQuery"
          type="text"
          placeholder="Поиск"
          @input="debouncedFn"
        />
        <img src="/img/search2.svg" alt="" class="chat-search__icon" />
      </div>
      <SectionsMessagesChatItems :chosen="activeTab" />
    </div>
    <SectionsMessagesChatContent></SectionsMessagesChatContent>
  </div>
</template>

<script setup lang="ts">
const messagesStore = useMessagesStore();
const { activeTab } = storeToRefs(messagesStore);
type TabValue = 'chats' | 'orders';

// Extract tab from the query parameters and ensure it's a string
const tab: string = useRoute().query.tab?.toString() || '';

// Type guard function to check if a string is a valid TabValue
function isValidTabValue(value: string): value is TabValue {
  return ['chats', 'orders'].includes(value);
}

// Check if tab is a valid TabValue before assigning
if (tab && isValidTabValue(tab)) {
  messagesStore.activeTab = tab;
} else if (tab && !isValidTabValue(tab)) {
  throw showError({
    statusCode: 404,
  });
}
const debouncedFn = () => {
  messagesStore.resetChats();
  const queryParams = {
    limit: messagesStore.limit,
    offset: messagesStore.chatListOffset,
    search: messagesStore.searchQuery,
  };
  if (activeTab.value === 'chats') messagesStore.fetchChats(queryParams);
  else if (activeTab.value === 'orders')
    messagesStore.fetchOrdersChats(queryParams);
};
watch(activeTab, () => {
  messagesStore.chats = [];
  if (activeTab.value === 'chats')
    messagesStore.fetchChats({ limit: messagesStore.limit, offset: 1 });
  else if (activeTab.value === 'orders')
    messagesStore.fetchOrdersChats({ limit: messagesStore.limit, offset: 1 });
});
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});

onBeforeUnmount(() => {
  messagesStore.resetChats();
  messagesStore.activeChat = undefined;
  messagesStore.searchQuery = '';
  messagesStore.lastMessages = [];
  messagesStore.activeTab = 'chats';
});
</script>
