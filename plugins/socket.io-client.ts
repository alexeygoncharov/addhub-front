import { io } from 'socket.io-client';
import type { ChatListItem, MessageItem } from '~/types/messages.types';

export default defineNuxtPlugin((nuxtApp) => {
  const authToken = useCookie('authToken');
  const messagesStore = useMessagesStore();
  const disputesStore = useDisputesStore();
  const userStore = useUserStore();
  const socketOptions = {
    multiplex: false,
    autoConnect: false,
    transports: ['polling'],
    auth: {},
  };
  const socket = io(baseUrl(), socketOptions);

  if (authToken.value) {
    socketOptions.auth.authorization = `Bearer ${authToken.value}`;
  }

  socket.on('connect_error', (err) => {
    console.log(err.message);
  });

  interface UpdatedMessage {
    id: string;
    chat_id: string;
    seen: boolean;
    chatTotalUnseen: number;
    totalUnseen: number;
  }

  interface DeletedChat {
    id: string;
  }

  interface UnseenMessagesCounters {
    totalUnseen: number;
    chatTotalUnseen: number;
  }

  interface UseenMessagesInfo {
    chat_id: string;
    [key: string]: UnseenMessagesCounters | string;
  }

  interface UpdateStatusUser {
    id: string;
    online_status: 'online' | 'offline';
  }

  interface ChatData {
    chat: ChatListItem;
    newMessage: MessageItem;
    totalUnseen: number;
    chatTotalUnseen: number;
  }

  setupSocketListeners();
  const isConnected = ref(false);
  const transport = ref('N/A');

  function onConnect() {
    isConnected.value = true;
    transport.value = socket.io.engine.transport.name;
    socket.io.engine.on('upgrade', (rawTransport) => {
      transport.value = rawTransport.name;
    });
  }

  function onDisconnect() {
    console.log('disconnect');
    isConnected.value = false;
    transport.value = 'N/A';
    // teardownSocketListeners();
  }

  function setupSocketListeners() {
    socket.on('new_message', handleNewMessage);
    socket.on('delete_chat', handleDeleteChat);
    socket.on('update_user', handleUpdateUser);
    socket.on('update_message', handleUpdateMessage);
    socket.on('new_dispute', (data) => {
      messagesStore.chats.forEach((item) => {
        if (item._id === data.chat._id) {
          item = data.chat;
          if (messagesStore.activeChat?._id === data.chat._id)
            messagesStore.activeChat = data.chat;
        }
      });
    });
    socket.on('get_counters', handleUpdateUnseenMessages);
  }

  async function handleNewMessage(data: ChatData) {
    const { chat, newMessage } = data;
    // пофиксить на беке, чтобы unseen_messages всегда приходило 0
    chat.unseen_messages = 0;
    //
    if (!isFromExistingChat(chat._id)) {
      messagesStore.chats.unshift(chat);
    } else {
      updateExistingChat(chat);
    }
    messagesStore.messages.unshift(newMessage);
    messagesStore.lastMessages.forEach((item, index, array) => {
      if (item.chat_id === data.chat._id) {
        array[index] = {
          ...data.newMessage,
          sender: data.newMessage.sender._id,
        };
      }
    });
  }

  async function handleUpdateUnseenMessages(data: UseenMessagesInfo) {
    const { chat_id: chatId } = data;
    const userId = userStore.user?._id;

    if (!userId) return;

    const unseenMessagesInfo = data[userId] as UnseenMessagesCounters;

    if (unseenMessagesInfo) {
      messagesStore.totalUnseenMessages = unseenMessagesInfo.totalUnseen;

      messagesStore.chats.forEach((chat) => {
        if (chat._id === chatId) {
          chat.unseen_messages = unseenMessagesInfo.chatTotalUnseen;
        }
      });

      const dispute = disputesStore.disputes?.find(
        (dispute) => dispute.chat._id === chatId,
      );

      if (dispute) {
        dispute.unseen_messages = unseenMessagesInfo.chatTotalUnseen;
      }
    }
  }

  function isFromExistingChat(chatId: string) {
    return messagesStore.chats.some((chat) => chat._id === chatId);
  }

  function updateExistingChat(newChatData: ChatListItem) {
    messagesStore.chats = messagesStore.chats.filter(
      (chat) => chat._id !== newChatData._id,
    );
    messagesStore.chats.unshift(newChatData);
  }

  function handleDeleteChat(deletedChat: DeletedChat) {
    messagesStore.chats = messagesStore.chats.filter(
      (item) => item._id !== deletedChat.id,
    );
  }

  function handleUpdateUser(data: UpdateStatusUser) {
    const respondent =
      messagesStore.activeChat &&
      messagesStore.getRespondent(messagesStore.activeChat);
    if (respondent && respondent?._id === data?.id)
      respondent.online_status = data.online_status;
  }

  async function handleUpdateMessage(updatedMessage: UpdatedMessage) {
    messagesStore.messages = messagesStore.messages.map((item) => {
      if (item._id === updatedMessage.id) {
        item.seen = true;
      }
      return item;
    });
  }

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);

  const updateAuthToken = (newToken: string) => {
    if (newToken) {
      socketOptions.auth.authorization = `Bearer ${newToken}`;
    } else {
      delete socketOptions.auth.authorization;
    }
  };
  return {
    provide: {
      socket,
      updateAuthToken,
    },
  };
});
