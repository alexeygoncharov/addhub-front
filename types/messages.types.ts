export interface MessagePayload {
  text: string;
  chat_id?: string;
  service_id?: string;
  recipient?: string;
  files?: uploadFileResponse[];
}
export interface MessagesPayload {
  chat_id: string;
  limit?: number;
  offset?: number;
}
export interface ChatPayload {
  limit?: number;
  offset?: number;
  search?: string;
}

export interface ReadMessagePayload {
  id: string;
  seen: boolean;
}

export interface ChatMember {
  _id: string;
  user_name: string;
  name: string;
  surname: string;
  active_role: string;
  online_status: 'online' | 'offline'; // Assuming only these two statuses for simplicity
  rate: number;
  avatar?: {
    url: string;
  };
}
export interface DisputesCreatedBy {
  _id: string;
  name: string;
  surname: string;
}

interface OrderChatService {
  _id: string;
  title: string;
  service_volume: string;
  photos: uploadFileResponse[];
  status: string;
}

interface OrderChatInfo {
  _id: string;
  service: OrderChatService;
  order_number: number;
  disputes: {
    createdBy?: DisputesCreatedBy;
  };
}

export interface ChatListItem {
  _id: string;
  members: ChatMember[];
  createdAt: Date;
  updatedAt: Date;
  unseen_messages: number;
}

export interface OrderChatListItem extends ChatListItem {
  order: OrderChatInfo;
}
export interface ChatList {
  list: OrderChatListItem[] | ChatListItem[];
  totalUnSeen: number;
  total: number;
}

export interface MessageItem {
  _id: string;
  type: string;
  chat_id: string;
  message: string;
  files: uploadFileResponse[];
  sender: User;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  recipient?: string;
}

export type LastMessage = Omit<MessageItem, 'sender'> & {
  sender: string;
};

export interface Chat {
  list: MessageItem[];
  total: number;
  totalUnSeen: number;
}
