export interface userData {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: 'buyer' | 'seller';
}
