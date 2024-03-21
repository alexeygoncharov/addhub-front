import type { Category } from '../common';
import type { FreelancersStore } from './freelancers';
import type { ProjectsStore } from './projects';
import type { ServicesStore } from './services';
export interface initialConfig {
  initialFilters: {
    price?: {
      min: number;
      max: number;
    };
    city: { title: string; type: string; list: [] };
    category: { title: string; type: string; list: Category[] | [] };
  };
  filters: {
    price?: { $gte: number; $lte: number };
  };
}
export type CatalogStores = FreelancersStore | ProjectsStore | ServicesStore;

interface User {
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
  payment_method: []; // TODO
  reviews: []; // TODO
  languages: []; // TODO
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
interface City extends Country {
  country: string;
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
    city: City;
  };
  status: string;
  createdBy: User;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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

export interface initialSort {
  type: string;
  text: string;
  value: {
    [key: string]: number | undefined;
  };
}
