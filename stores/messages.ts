export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Array<ChatMessage>>([]);
  const newMessage = ref();
  const activeChat = ref<ChatItem | OrderChatItem>();
  const totalCountMessages = ref<number>(0);
  const totalCountChats = ref<number>(0);
  const limit = 10;
  const lastMessages = ref<Array<ChatMessage>>([]);
  const messagesListOffset = ref(1);
  const searchQuery = ref('');
  const chatListOffset = ref(1);
  const totalUnseenMessages = ref<number>(0);
  const chats = ref<Array<ChatItem>>([]);
  const activeTab = ref<'chats' | 'orders'>('chats');
  const userStore = useUserStore();

  async function fetchChatMessagesList(payload: MessagesPayload) {
    const { data } = await apiFetch<ApiResponse<ChatMessagesList>>(
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
  function addMessages(payload: ChatMessagesList) {
    totalCountMessages.value = payload.total;
    if (totalCountMessages.value > messages.value.length) {
      payload.list.forEach((element) => {
        messages.value.push(element);
      });
    }
  }

  function getRespondent(chat: ChatItem): ChatMember | undefined {
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

  async function fetchUnseenCountByUser(chatId: string) {
    const { data } = await apiFetch<ApiResponse<number>>(
      `/api/messages/${chatId}/unseen/count`,
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

  async function deleteChat() {
    if (!activeChat.value?._id) return;
    await apiFetch<ApiResponse<ChatItem>>(
      `/api/chat/${activeChat.value?._id}`,
      {
        needToken: true,
        options: {
          method: 'DELETE',
        },
      },
    );
    chats.value = chats.value.filter(
      (item) => activeChat.value && item._id !== activeChat.value._id,
    );
    activeChat.value = undefined;
  }

  async function createMessage(msg: MessagePayload) {
    try {
      const { data } = await apiFetch<ApiResponse<ChatMessage>>(
        `/api/messages/`,
        {
          needToken: true,
          options: {
            method: 'POST',
            body: {
              message: msg.text,
              chat_id: msg.chat_id,
              service_id: msg.service_id,
              files: msg.files,
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

  async function fetchLastMessage(chatId: string) {
    try {
      const { data } = await apiFetch<ApiResponse<ChatMessage>>(
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
      const { data } = await apiFetch<ApiResponse<ChatMessage>>(
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
    fetchUnseenCountByUser,
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
