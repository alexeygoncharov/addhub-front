import type { Category, City } from '../common';
import type { FreelancersStore } from './freelancers';
import type { ProjectsStore } from './projects';
import type { ServicesStore } from './services';
export interface initialFilters {
  price?: {
    $gte: number;
    $lte: number;
    type: 'range';
  };
  'address.city'?: {
    title: string;
    type: 'check';
    list: City[];
    hasSearch: boolean;
  };
  category?: { title: string; type: 'radio'; list: Category[] | [] };
}
export type CatalogStores = FreelancersStore | ProjectsStore | ServicesStore;

export interface User {
  _id: string;
  user_name: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  roles: string[];
  active_role: string;
  balance: number;
  status: string;
  to_create_disputes: string;
  online_status: string;
  payment_method: string[];
  rate: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  avatar: string;
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

export interface catalogItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  photos: string[];
  delivery_time: number;
  address: {
    country: Country;
    city: ItemCity;
  };
  status: string;
  createdBy: User;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface serviceItem extends catalogItem {
  tools: [];
  category: string;
  delivery_time: number;
}

export interface servicesItem extends catalogItem {
  reviews: []; // TODO
  tools: []; // TODO
  category: Category;
}

export interface projectsItem extends catalogItem {
  category: string;
  skills: []; // TODO
  constructor: null; // TODO
  bids: {
    _id: string;
    project_id: string;
    user: string;
    price: number;
    term: number;
    status: string;
  }[];
}

export interface freelancersItem {
  _id: string;
  name: string;
  surname: string;
  user_name: string;
  email: string;
  avatar: string;
  online_status: string;
  status: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  active_role: string;
  payment_method: string[];
  roles: string[];
  to_create_disputes: string;
}
export interface initialSort {
  type: string;
  text: string;
  value: {
    [key: string]: number | undefined;
  };
}
