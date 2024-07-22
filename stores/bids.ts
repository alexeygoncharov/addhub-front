export const useBidsStore = defineStore('bids', () => {
  const bids = ref<Bid[]>();
  const adminBids = ref<Bid[]>();

  async function fetchBid(id: string, bidId: string) {
    const { data } = await apiFetch<ApiResponse<Bid>>(`/api/bids/${bidId}`);
    const value = data.value;
    return value?.result;
  }

  async function createBid(
    id: string,
    price: number,
    term: number,
    description: string,
    serviceId?: string,
  ) {
    try {
      const { data } = await apiFetch<ApiResponse<BidList & Bid>>(`/api/bids`, {
        options: {
          method: 'POST',
          body: {
            project_id: id,
            price,
            term,
            description,
            service_id: serviceId,
          },
        },
        needToken: true,
      });
      const value = data.value;
      if (value) {
        return value?.result;
      }
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }
  async function updateBid(
    id: string,
    bidId: string,
    body: {
      price: number;
      term: number;
      description: string;
      service_id?: string;
      status?: string;
    },
  ) {
    const { data, error } = await apiFetch<ApiResponse<Bid>>(
      `/api/bids/${bidId}`,
      {
        options: {
          method: 'PUT',
          body,
        },
        needToken: true,
      },
    );
    if (error.value) {
      return useToast({ message: error.value.data.message, type: 'error' });
    }
    const value = data.value;
    if (value) {
      return value?.result;
    }
  }
  async function deleteBid(id: string, bidId: string) {
    const { data, error } = await apiFetch<ApiResponse<Bid>>(
      `/api/bids/${bidId}`,
      {
        needToken: true,
        options: {
          method: 'DELETE',
        },
      },
    );
    if (error.value) {
      return useToast({ message: error.value.data.message, type: 'error' });
    }

    const value = data.value;
    if (value) {
      return value.result;
    }
  }
  const getBids = async (
    currentPage: number,
    status?: string,
  ): Promise<Ref<ApiListResponse<Bid[]>> | undefined> => {
    const { user } = storeToRefs(useUserStore());
    if (!user.value) return;
    const { data, error } = await apiFetch<ApiListResponse<Bid[]>>(
      `/api/bids/${user.value?.active_role}/my`,
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
    if (data.value?.result) {
      return data as Ref<ApiListResponse<Bid[]>>;
    } else if (error.value) {
      useToast({ message: error.value?.message, type: 'error' });
    }
  };
  const changeStatus = async (value: string, id: string) => {
    const result = await apiFetch(`/api/bids/status/${id}`, {
      needToken: true,
      options: { method: 'PUT', body: { status: value } },
    });
    if (result.error.value) {
      useToast({ message: result.error.value.data.message, type: 'error' });
      return false;
    } else {
      useToast({ message: 'Статус успешно обновлен', type: 'success' });
      return true;
    }
  };

  return { fetchBid, getBids, createBid, updateBid, deleteBid, changeStatus };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBidsStore, import.meta.hot));
}
