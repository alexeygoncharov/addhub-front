export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Array<any>>([]);
  const newMessage = ref();
  const activeChat = ref();
  const isLoadedMessages = ref();
  const limit = 10; // Вы можете выбрать любое значение для limit
  const offset = ref(1);
  const chats = ref();
  interface Message {
    text: string;
    recipient: string;
  }
  interface MessagesList {
    second_side: string;
    limit?: number;
    offset?: number;
  }
  // const categories = ref<Category[]>()
  async function fetchMessageList(list: MessagesList) {
    const { data } = await apiFetch<ApiResponse<any>>(`/api/messages`, {
      needToken: true,
      options: {
        query: list,
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
      messages.value.unshift(element);
    });
  }

  function resetMessages() {
    messages.value = [];
    offset.value = 1;
  }

  async function fetchChats() {
    const { data } = await apiFetch<ApiResponse<any>>(
      `/api/messages/my_chats`,
      {
        needToken: true,
        options: {},
      },
    );
    chats.value = data.value?.result;
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
    offset,
    limit,
    messages,
    activeChat,
    newMessage,
    chats,
    isLoadedMessages,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMessagesStore, import.meta.hot));
}
