export type { ApiResponse, ApiListResponse };

declare global {
  interface ApiResponse<T> {
    status: number;
    result: T;
  }
  interface ApiListResponse<T> extends ApiResponse<T> {
    total: number;
  }

  export interface Bid {
    _id: string;
    project_id: string;
    user: string;
    price: number;
    term: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  }
}
