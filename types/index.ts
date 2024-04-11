import type { User } from '~/stores/catalog/catalog.type';
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
    project_id: string;
    price: number;
    term: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    description: string;
  }
  export interface Bid extends baseBid {
    user: User;
  }
  export interface BidList extends baseBid {
    user: string;
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

  export interface Profile {
    _id: string;
    user_name: string;
    name: string;
    surname: string;
    email: string;
    roles: string[];
    active_role: 'buyer' | 'seller';
    __v: number;
    avatar: string;
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
}
