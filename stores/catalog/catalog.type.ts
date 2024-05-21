import type { Category, City, Country } from '../common';
import type { FreelancersStore } from './freelancers';
import type { ProjectsStore } from './projects';
import type { ServicesStore } from './services';
interface baseCheck {
  title: string;
  type: 'check';
  hasSearch: boolean;
}
export interface initialFilters {
  price?: {
    $gte: number;
    $lte: number;
    type: 'range';
  };
  'address.city'?: baseCheck & {
    list: City[];
  };
  'address.country'?: baseCheck & {
    list: Country[];
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
  roles: string[];
  active_role: 'buyer' | 'seller';
  status: string;
  to_create_disputes: string;
  online_status: string;
  payment_method: string[];
  rate: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  avatar?: uploadFileResponse;
}

export interface catalogItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  photos: uploadFileResponse[];
  delivery_time: number;
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
  views: number;
  orders: number;
  reviews: number;
  rate: number;
  service_volume: string;
  service_volume_desc: string;
  address: {
    country: Country;
    city: City;
  };
}

export interface servicesItem extends catalogItem {
  reviews: []; // TODO
  tools: []; // TODO
  category: Category;
  rate: number;
  service_volume: string;
  service_volume_desc: string;
  address: {
    country: Country;
    city: City;
  };
}

export interface projectsItem extends catalogItem {
  category: Category;
  constructor: null; // TODO
  bids: BidList[];
  files: uploadFileResponse[];
  address: {
    country: Country;
    city: City;
  };
}

export interface baseProject extends catalogItem {
  views: number;
  bids: Bid[] | BidList[];
  category: string;
  constructor: null; // TODO
  files: uploadFileResponse[];
}
export interface projectItem extends baseProject {
  address: {
    country: Country;
    city: City;
  };
}
export interface bidProject extends baseProject {
  address: {
    country: string;
    city: string;
  };
}

export interface freelancersItem {
  _id: string;
  name: string;
  surname: string;
  user_name: string;
  email: string;
  avatar: uploadFileResponse;
  online_status: string;
  status: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  active_role: 'buyer' | 'seller';
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
