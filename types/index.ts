import type { OrderChatListItem } from './messages.types';
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
    active_role: 'buyer' | 'seller' | 'admin' | 'moderator';
    __v: number;
    avatar?: uploadFileResponse;
    phone_number: string;
    status: string;
    about_me?: string;
    address: {
      country: Country;
      city?: ItemCity;
    };
    languages?: string;
  }

  interface AdminProfile extends Profile {
    createdAt: string;
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

  interface CreateDispute {
    order: string;
    files: uploadFileResponse[];
    message: string;
  }

  export interface Order {
    _id: string;
    buyer: User;
    seller: User;
    price: number;
    service: orderService;
    currency: string;
    status: string;
    createdAt: string;
    chat: OrderChatListItem;
    order_number: number;
    updatedAt: string;
    __v: number;
  }
}
