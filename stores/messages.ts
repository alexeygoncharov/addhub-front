export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Array<any>>([]);
  const newMessage = ref();
  const activeChat = ref();
  const totalCountMessages = ref<number>(0);
  const totalCountChats = ref<number>(0);
  const limit = 10; // Вы можете выбрать любое значение для limit
  const messagesListOffset = ref(1);
  const chatListOffset = ref(1);
  const totalUnseenMessages = ref<number>(0);
  const chats = ref<Array<any>>([]);
  const { user } = useUserStore();
  interface Message {
    text: string;
    recipient: string;
    service_id?: string;
    files?: Array<string>;
  }
  interface MessagesList {
    chat_id: string;
    limit?: number;
    offset?: number;
  }
  interface ChatList {
    limit?: number;
    offset?: number;
  }
  async function fetchChatMessagesList(payload: MessagesList) {
    const { data } = await apiFetch<ApiResponse<any>>(
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
    return data.value?.result;
  }

  function addMessages(payload: any) {
    totalCountMessages.value = payload.total;
    if (totalCountMessages.value > messages.value.length) {
      payload.list.forEach((element) => {
        messages.value.push(element);
      });
    }
  }

  function getRespondent(chat: any) {
    return chat?.members.find((member) => member._id !== user?._id);
  }

  function addChats(payload: any) {
    totalUnseenMessages.value = payload.totalUnSeen;
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

  async function fetchChats(payload: ChatList) {
    const { data } = await apiFetch<ApiResponse<any>>(`/api/chat/my`, {
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
    return data.value?.result;
  }

  async function deleteChat() {
    if (!activeChat.value?._id) return;
    await apiFetch<ApiResponse<any>>(`/api/chat/${activeChat.value?._id}`, {
      needToken: true,
      options: {
        method: 'DELETE',
      },
    });
    chats.value = chats.value.filter(
      (item) => item._id !== activeChat.value._id,
    );
    activeChat.value = null;
  }

  async function createMessage(msg: Message) {
    try {
      const { data } = await apiFetch<ApiResponse<any>>(`/api/messages/`, {
        needToken: true,
        options: {
          method: 'POST',
          body: {
            message: msg.text,
            recipient: msg.recipient,
            service_id: msg.service_id,
            files: msg.files,
          },
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

  async function readMessage(msg: any) {
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
    resetMessages,
    getRespondent,
    deleteChat,
    readMessage,
    messagesListOffset,
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
