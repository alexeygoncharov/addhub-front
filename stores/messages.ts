import type {
  ChatListItem,
  OrderChatListItem,
  ChatList,
  Chat,
  MessageItem,
  LastMessage,
  MessagesPayload,
  ChatMember,
  ChatPayload,
  MessagePayload,
  ReadMessagePayload,
} from '~/types/messages.types';

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<MessageItem[]>([]);
  const newMessage = ref();
  const activeChat = ref<OrderChatListItem | ChatListItem>();
  const totalCountMessages = ref<number>(0);
  const totalCountChats = ref<number>(0);
  const limit = 20;
  const lastMessages = ref<LastMessage[]>([]);
  const messagesListOffset = ref(1);
  const searchQuery = ref('');
  const chatListOffset = ref(1);
  const totalUnseenMessages = ref<number>(0);
  const chats = ref<Array<OrderChatListItem | ChatListItem>>([]);
  const activeTab = ref<'chats' | 'orders'>('chats');
  const userStore = useUserStore();

  async function fetchChatMessagesList(payload: MessagesPayload) {
    const { data } = await apiFetch<ApiResponse<Chat>>(
      `/api/messages/chat/${payload.chat_id}`,
      {
        needToken: true,
        options: {
          query: payload,
        },
      },
    );
    const value = data.value;
    if (value) {
      addMessages(value.result);
    }
  }
  function addMessages(payload: Chat) {
    totalCountMessages.value = payload.total;
    if (totalCountMessages.value > messages.value.length) {
      payload.list.forEach((element) => {
        messages.value.push(element);
      });
    }
  }

  function getRespondent(chat: ChatListItem | OrderChatListItem) {
    return chat?.members.find(
      (member) =>
        member._id !== userStore.user?._id && member.active_role !== 'admin',
    );
  }

  function addChats(payload: ChatList) {
    totalCountChats.value = payload.total;
    if (totalCountChats.value > chats.value.length) {
      payload.list.forEach((element) => {
        const isExisting = chats.value.some((chat) => chat._id === element._id);
        if (!isExisting) {
          chats.value.push(element);
        }
      });
    }
  }

  function resetMessages() {
    messages.value = [];
    messagesListOffset.value = 1;
  }

  function resetChats() {
    chats.value = [];
    chatListOffset.value = 1;
  }

  async function fetchChats(payload: ChatPayload) {
    const { data } = await apiFetch<ApiResponse<ChatList>>(`/api/chat/my`, {
      needToken: true,
      options: {
        query: payload,
      },
    });
    const value = data.value;
    if (value) {
      // chats.value = value.result.list;
      addChats(value.result);
    }
  }
  async function fetchOrdersChats(payload: ChatPayload) {
    const { data } = await apiFetch<ApiResponse<ChatList>>(
      `/api/chat/my_by_order`,
      {
        needToken: true,
        options: {
          query: payload,
        },
      },
    );
    const value = data.value;
    if (value) {
      // chats.value = value.result.list;
      addChats(value.result);
    }
  }

  async function fetchTotalUnseenCount() {
    const { data } = await apiFetch<ApiResponse<number>>(
      `/api/messages/unseen/count`,
      {
        needToken: true,
        options: {},
      },
    );
    const value = data.value;
    if (value) {
      totalUnseenMessages.value = value.result;
    }
    return data.value?.result;
  }

  async function fetchUnseenCountByChatId(chatId: string): Promise<number> {
    const { data } = await apiFetch<ApiResponse<number>>(
      `/api/messages/${chatId}/unseen/count`,
      {
        needToken: true,
        options: {},
      },
    );
    const value = data.value;
    if (value) {
      return value.result;
    }
    return data.value?.result as number;
  }

  async function deleteChat() {
    if (!activeChat.value?._id) return;
    await apiFetch<
      ApiResponse<{ type: string } & (ChatListItem | OrderChatListItem)>
    >(`/api/chat/${activeChat.value?._id}`, {
      needToken: true,
      options: {
        method: 'DELETE',
      },
    });
    chats.value = chats.value.filter(
      (item) => activeChat.value && item._id !== activeChat.value._id,
    );
    activeChat.value = undefined;
  }

  async function createMessage(msg: MessagePayload) {
    try {
      const { data } = await apiFetch<ApiResponse<MessageItem>>(
        `/api/messages/`,
        {
          needToken: true,
          options: {
            method: 'POST',
            body: {
              message: msg.text,
              chat_id: msg.chat_id,
              service_id: msg.service_id,
              recipient: msg.recipient,
              files: msg.files,
            },
          },
        },
      );
      const value = data.value;
      if (value) {
        return value?.result;
      } else {
        useToast({ message: 'Не удалось создать сообщение', type: 'error' });
      }
    } catch (error) {}
  }

  async function fetchLastMessage(chatId: string) {
    try {
      const { data } = await apiFetch<ApiResponse<LastMessage>>(
        `/api/messages/last_message/${chatId}`,
        {
          needToken: true,
          options: {},
        },
      );
      const value = data.value;
      if (value) {
        lastMessages.value.push(value?.result);
        return value?.result;
      }
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }

  async function readMessage(msg: ReadMessagePayload) {
    try {
      const { data } = await apiFetch<ApiResponse<any>>(
        `/api/messages/${msg.id}`,
        {
          needToken: true,
          options: {
            method: 'PUT',
            body: {
              seen: msg.seen,
            },
          },
        },
      );
      const value = data.value;
      if (value) {
        return value?.result;
      }
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }

  return {
    fetchChatMessagesList,
    createMessage,
    fetchChats,
    fetchOrdersChats,
    resetMessages,
    getRespondent,
    deleteChat,
    readMessage,
    resetChats,
    fetchLastMessage,
    fetchTotalUnseenCount,
    fetchUnseenCountByChatId,
    searchQuery,
    lastMessages,
    messagesListOffset,
    activeTab,
    chatListOffset,
    limit,
    messages,
    activeChat,
    newMessage,
    chats,
    totalCountMessages,
    totalCountChats,
    totalUnseenMessages,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMessagesStore, import.meta.hot));
}
