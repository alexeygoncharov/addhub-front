import type { Withdraw } from '@/modules/profile/types/index';
export const getWithdrawals = async (
  currentPage: number,
): Promise<Ref<ApiListResponse<Withdraw[]>> | undefined> => {
  const token = useCookie('authToken');
  if (!token.value) throw new Error('token is lost');

  const result = await apiFetch<ApiListResponse<Withdraw[]>>(
    '/api/admin/payments/withdraw',
    {
      needToken: true,
      options: {
        query: {
          offset: currentPage,
          limit: 8,
        },
      },
    },
  );
  if (result.error.value) {
    throw showError;
  } else if (result.data.value) {
    return result.data as Ref<ApiListResponse<Withdraw[]>>;
  }
};