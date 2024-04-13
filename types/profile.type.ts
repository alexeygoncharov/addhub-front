export interface Review {
  _id: string;
  rate: number;
  message: string;
  service_id: string;
  recipient: User;
}

export interface Notification {
  _id: string;
  type: string;
  description: string;
  status: 'read' | 'unread';
  recipient: string[];
  createdAt: string;
  updatedAt: string;
}
