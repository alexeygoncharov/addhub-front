export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Array<any>>([]);
  const newMessage = ref();
  const activeChat = ref();
  const isLoadedMessages = ref();
  const isLoadedChats = ref();
  const limit = 10; // Вы можете выбрать любое значение для limit
  const messagesListOffset = ref(1);
  const chatListOffset = ref(1);
  const chats = ref<Array<any>>([]);
  const { user } = useUserStore();
  console.log('chats = ', chats);
  interface Message {
    text: string;
    recipient: string;
  }
  interface MessagesList {
    second_side: string;
    limit?: number;
    offset?: number;
  }
  interface ChatList {
    limit?: number;
    offset?: number;
  }
  async function fetchMessageList(payload: MessagesList) {
    const { data } = await apiFetch<ApiResponse<any>>(`/api/messages`, {
      needToken: true,
      options: {
        query: payload,
      },
    });
    const value = data.value;
    if (value) {
      addMessages(value.result);
    }
    return data.value?.result;
  }

  function addMessages(payload: any) {
    isLoadedMessages.value = payload;
    payload.forEach((element) => {
      messages.value.push(element);
    });
  }

  function getRespondent(chat: any) {
    return chat?.members.find((member) => member._id !== user?._id);
  }

  function addChats(payload: any) {
    // console.log('new chat ', payload);
    isLoadedChats.value = payload;
    payload.list.forEach((element) => {
      chats.value.push(element);
    });
    console.log('payload chats ', chats);
  }

  function resetMessages() {
    messages.value = [];
    messagesListOffset.value = 1;
  }

  async function fetchChats(payload: ChatList) {
    const { data } = await apiFetch<ApiResponse<any>>(
      `/api/messages/my_chats`,
      {
        needToken: true,
        options: {
          query: payload,
        },
      },
    );
    const value = data.value;
    if (value) {
      chats.value = value.result.list;
      // addChats(value.result);
    }
    return data.value?.result;
  }

  async function createMessage(msg: Message) {
    try {
      const { data } = await apiFetch<ApiResponse<any>>(`/api/messages/`, {
        needToken: true,
        options: {
          method: 'POST',
          body: { message: msg.text, recipient: msg.recipient },
        },
      });
      const value = data.value;
      if (value) {
        return value?.result;
      }
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }

  return {
    fetchMessageList,
    createMessage,
    fetchChats,
    resetMessages,
    getRespondent,
    messagesListOffset,
    chatListOffset,
    limit,
    messages,
    activeChat,
    newMessage,
    chats,
    isLoadedMessages,
    isLoadedChats,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMessagesStore, import.meta.hot));
}
