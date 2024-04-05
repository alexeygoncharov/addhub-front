export const useBidsStore = defineStore('bids', () => {
  const bids = ref();
  // const categories = ref<Category[]>()
  async function fetchBidsList(id: string) {
    try {
      const { data } = await apiFetch<ApiResponse<Bid[]>>(
        `/api/projects/${id}/bids`,
      );
      const value = data.value;
      bids.value = value?.result;
    } catch (error) {
      // console.error('Ошибка при загрузке городов', error);
    }
  }

  async function fetchBid(id: string, bidId: string) {
    try {
      const { data } = await apiFetch<ApiResponse<Bid>>(
        `/api/projects/${id}/bids/${bidId}`,
      );
      const value = data.value;
      return value?.result;
    } catch (error) {
      // console.error('Ошибка при загрузке городов', error);
    }
  }

  async function createBid(id: string, price: number, term: number) {
    try {
      const { data } = await apiFetch<ApiResponse<Bid>>(
        `/api/projects/${id}/bids`,
        {
          options: { method: 'POST', body: { price, term } },
        },
      );
      const value = data.value;
      if (value) {
        return value?.result;
      }
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }
  async function updateBid(id: string, bidId: string, status: any) {
    try {
      const { data } = await apiFetch<ApiResponse<Bid>>(
        `/api/projects/${id}/bids/${bidId}`,
        {
          options: {
            method: 'PUT',
            body: {
              status,
            },
          },
        },
      );
      const value = data.value;
      if (value) {
        return value?.result;
      }
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }
  async function deleteBid(id: string, bidId: string) {
    try {
      const { data } = await apiFetch<ApiResponse<Bid>>(
        `/api/projects/${id}/bids/${bidId}`,
        {
          options: {
            method: 'DELETE',
          },
        },
      );
      const value = data.value;
      if (value) {
        return value.result;
      }
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }

  return { fetchBid, fetchBidsList, createBid, updateBid, deleteBid };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBidsStore, import.meta.hot));
}
