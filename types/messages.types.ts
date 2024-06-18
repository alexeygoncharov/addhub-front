interface MessagePayload {
  text: string;
  chat_id: string;
  service_id?: string;
  files?: Array<string>;
}
interface MessagesPayload {
  chat_id: string;
  limit?: number;
  offset?: number;
}
interface ChatPayload {
  limit?: number;
  offset?: number;
  search?: string;
}

interface ReadMessagePayload {
  id: string;
  seen: boolean;
}
