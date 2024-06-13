interface TransactionOrder extends Omit<Order, 'seller' | 'buyer' | 'service'> {
  seller: string;
  buyer: string;
  service: string;
}
export interface Transaction {
  _id: string;
  type?: 'Income' | 'Outcome';
  description?: string;
  order?: TransactionOrder;
  seller: User;
  buyer?: User;
  amount1?: number;
  amount2: number;
  currency1?: string;
  currency2?: string;
  status: 'Frozen' | 'Active' | 'Withdrawed';
  coin_status?: string;
  ipn_id?: string;
  txn_id?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Withdraw {
  _id: string;
  address_to: string;
  user: User;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
