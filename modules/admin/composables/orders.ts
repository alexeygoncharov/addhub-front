export const getOrders = async (
  currentPage: number,
  status?: string,
): Promise<Ref<ApiListResponse<Order[]>> | undefined> => {
  const token = useCookie('authToken');
  if (!token.value) throw new Error('token is lost');

  const result = await apiFetch<ApiListResponse<Order[]>>('/api/admin/orders', {
    needToken: true,
    options: {
      query: {
        offset: currentPage,
        limit: 8,
        filter: { status },
      },
    },
  });
  if (result.error.value) {
    throw showError;
  } else if (result.data.value) {
    return result.data as Ref<ApiListResponse<Order[]>>;
  }
};
