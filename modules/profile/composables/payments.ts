import type { Withdraw } from '@/modules/profile/types/index';
export const getMyWithdrawal = async (
  currentPage: number,
): Promise<Ref<ApiListResponse<Withdraw[]>> | undefined> => {
  const token = useCookie('authToken');
  if (!token.value) throw new Error('token is lost');

  const result = await apiFetch<ApiListResponse<Withdraw[]>>(
    '/api/payments/withdraw/my',
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

export const createWithdrawal = async (
  amount: number,
  addressTo: string,
): Promise<Ref<ApiListResponse<Withdraw>> | undefined> => {
  const token = useCookie('authToken');
  if (!token.value) throw new Error('token is lost');

  const result = await apiFetch<ApiListResponse<Withdraw>>(
    '/api/payments/withdraw',
    {
      needToken: true,
      options: {
        body: {
          amount,
          address_to: addressTo,
        },
        method: 'POST',
      },
    },
  );
  if (result.error.value) {
    useToast({ message: result.error.value.data?.message, type: 'error' });
  } else if (result.data.value) {
    return result.data as Ref<ApiListResponse<Withdraw>>;
  }
};

// export const deletePaymentMethod = async (
//   id: string,
// ): Promise<Ref<ApiResponse<any[]>> | undefined> => {
//   const token = useCookie('authToken');
//   if (!token.value) throw new Error('token is lost');

//   const result = await apiFetch<ApiResponse<any[]>>(
//     `/api/payment_method/${id}`,
//     {
//       needToken: true,
//       options: {
//         method: 'DELETE',
//       },
//     },
//   );
//   if (result.error.value) {
//     useToast({ message: result.error.value.data.message, type: 'error' });
//   } else if (result.data.value) {
//     return result.data as Ref<ApiResponse<any[]>>;
//   }
// };

// export const addPaymentMethod = async (
//   address: string,
// ): Promise<Ref<ApiResponse<any[]>> | undefined> => {
//   const token = useCookie('authToken');
//   if (!token.value) throw new Error('token is lost');

//   const result = await apiFetch<ApiResponse<any[]>>('/api/payment_method/', {
//     needToken: true,
//     options: {
//       body: {},
//       method: 'POST',
//     },
//   });
//   if (result.error.value) {
//     useToast({ message: result.error.value.data.message, type: 'error' });
//   } else if (result.data.value) {
//     return result.data as Ref<ApiResponse<any[]>>;
//   }
// };
