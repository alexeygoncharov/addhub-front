export type { ApiResponse, ApiListResponse };

declare global {
  interface ApiResponse<T> {
    status: number;
    result: T;
  }
  interface ApiListResponse<T> extends ApiResponse<T> {
    total: number;
  }
}
