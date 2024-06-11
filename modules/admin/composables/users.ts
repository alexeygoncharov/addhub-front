export const getUsers = async (
  currentPage: number,
): Promise<Ref<ApiListResponse<AdminProfile[]>> | undefined> => {
  const token = useCookie('authToken');
  if (!token.value) throw new Error('token is lost');

  const result = await apiFetch<ApiListResponse<AdminProfile[]>>(
    '/api/admin/users',
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
    return result.data as Ref<ApiListResponse<AdminProfile[]>>;
  }
};
