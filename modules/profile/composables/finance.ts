import type { Transaction } from '@/modules/profile/types/index';
interface TransactionResponse extends ApiListResponse<Transaction[]> {
  finances: {
    totalActive: {
      [key: string]: number;
    };
    totalFrozen: {
      [key: string]: number;
    };
    totalWithdrawed: {
      [key: string]: number;
    };
  };
}
export const getMyTransactions = async (
  currentPage: number,
): Promise<Ref<TransactionResponse> | undefined> => {
  const token = useCookie('authToken');
  if (!token.value) throw new Error('token is lost');

  const result = await apiFetch<TransactionResponse>('/api/transactions/my', {
    needToken: true,
    options: {
      query: {
        offset: currentPage,
        limit: 8,
      },
    },
  });
  if (result.error.value) {
    throw showError;
  } else if (result.data.value) {
    return result.data as Ref<TransactionResponse>;
  }
};
