export const getProjects = async (
  currentPage: number,
  status?: string,
): Promise<Ref<ApiListResponse<projectsItem[]>> | undefined> => {
  const token = useCookie('authToken');
  if (!token.value) throw new Error('token is lost');

  const result = await apiFetch<ApiListResponse<projectsItem[]>>(
    '/api/projects',
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
    return result.data as Ref<ApiListResponse<projectsItem[]>>;
  }
};

export const getServices = async (
  currentPage: number,
  status?: string,
): Promise<Ref<ApiListResponse<servicesItem[]>> | undefined> => {
  const token = useCookie('authToken');
  if (!token.value) throw new Error('token is lost');

  const result = await apiFetch<ApiListResponse<servicesItem[]>>(
    '/api/services',
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
    return result.data as Ref<ApiListResponse<servicesItem[]>>;
  }
};

export const deleteItem = async (
  id: string,
  type: 'project' | 'service',
): Promise<
  Ref<ApiResponse<ProjectDeleteResponse | ServiceDeleteResponse>> | undefined
> => {
  const { data, error } = await apiFetch<
    ApiResponse<ProjectDeleteResponse | ServiceDeleteResponse>
  >(`/api/${type === 'project' ? 'projects' : 'services'}/${id}`, {
    options: { method: 'DELETE' },
    needToken: true,
  });
  if (error.value) {
    useToast({ message: 'Произошла ошибка при удалении', type: 'error' });
  } else {
    return data as Ref<
      ApiResponse<ProjectDeleteResponse | ServiceDeleteResponse>
    >;
  }
};
