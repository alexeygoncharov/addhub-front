import type { Withdraw } from '@/modules/profile/types/index';
export const getWithdrawals = async (
  currentPage: number,
  status: 'Canceled' | 'Approved' | 'Pending',
  searchQuery?: string,
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
          filter: { status },
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

export const changeWithdrawStatus = async (
  value: 'Canceled' | 'Approved' | 'Pending',
  id: string,
) => {
  const token = useCookie('authToken');
  if (!token.value) throw new Error('token is lost');
  const result = await apiFetch(`/api/admin/payments/withdraw/status/${id}`, {
    needToken: true,
    options: { method: 'PUT', body: { status: value } },
  });
  if (result.error.value) {
    useToast({ message: result.error.value.data.message, type: 'error' });
    return false;
  } else {
    return true;
  }
};
