export const useMessagesStore = defineStore('messages', () => {
  const messages = ref();
  const activeChat = ref(0);
  interface Message {
    text: string;
    recipient: string;
  }
  // const categories = ref<Category[]>()
  async function fetchMessageList() {
    try {
      const { data } = await apiFetch<ApiResponse<any>>(`/api/messages`, {
        needToken: true,
        options: {},
      });
      const value = data.value;
      if (value) {
        messages.value = data.value;
      }
      return data.value;
    } catch (error) {
      // console.error('Ошибка при загрузке городов', error);
    }
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

  return { fetchMessageList, createMessage, messages, activeChat };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBidsStore, import.meta.hot));
}
