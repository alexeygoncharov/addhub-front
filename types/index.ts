import type {
  User,
  bidProject,
  catalogItem,
} from '~/stores/catalog/catalog.type';
export type { ApiResponse, ApiListResponse };

declare global {
  interface ApiResponse<T> {
    status: number;
    result: T;
  }
  interface ApiListResponse<T> extends ApiResponse<T> {
    total: number;
  }

  export interface baseBid {
    _id: string;
    price: number;
    term: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    description: string;
  }
  export interface Bid extends baseBid {
    user: User;
    project_id: bidProject;
  }
  export interface BidList extends baseBid {
    user: string;
    project_id: string;
  }
  interface Country {
    _id: string;
    title: string;
  }
  interface ItemCity extends Country {
    country: string;
    projects_count: number;
    services_count: number;
  }

  export interface uploadFileResponse {
    url: string;
    name: string;
    mimetype: string;
  }
  export interface Profile {
    _id: string;
    user_name: string;
    name: string;
    surname: string;
    email: string;
    roles: string[];
    active_role: 'buyer' | 'seller';
    __v: number;
    avatar?: uploadFileResponse;
    phone_number: string;
    profession: string;
    slogan: string;
    gender: string;
    about_me: string;
    address: {
      country: Country;
      city: ItemCity;
    };
    languages: string;
  }
  interface orderService extends catalogItem {
    tools: [];
    category: string;
    rate: number;
    service_volume: string;
    service_volume_desc: string;
    address: {
      country: string;
      city: string;
    };
  }
  export interface Order {
    _id: string;
    buyer: User;
    service: orderService;
    currency: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface ChatMember {
    _id: string;
    user_name: string;
    name: string;
    surname: string;
    online_status: 'online' | 'offline'; // Assuming only these two statuses for simplicity
    avatar: {
      url: string;
    };
  }

  interface ChatItem {
    _id: string;
    members: ChatMember[];
    unseen_messages: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface ChatList {
    list: ChatItem[];
    totalUnSeen: number;
    total: number;
  }

  interface ChatMessage {
    _id: string;
    chat_id: string;
    message: string;
    files: any[]; // Define further if you have file structure details.
    recipient?: User;
    sender?: User;
    seen: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  interface ChatMessagesList {
    list: ChatMessage[];
    total: number;
    totalUnSeen: number;
  }
}
