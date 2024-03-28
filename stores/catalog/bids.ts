import { useProtectedApi } from '../../composables/useProtectedApi';

export const useBidsStore = defineStore('bids', () => {
  const bids = ref();
  const apiFetch = useProtectedApi();
  // const categories = ref<Category[]>()
  async function fetchBidsList(id: string) {
    try {
      const data = await apiFetch<{ result: any; status: any }>(
        `/api/projects/${id}/bids`,
      );
      bids.value = data.result;
    } catch (error) {
      // console.error('Ошибка при загрузке городов', error);
    }
  }

  async function fetchBid(id: string, bidId: string) {
    try {
      const data = await apiFetch<{ result: any; status: any }>(
        `/api/projects/${id}/bids/${bidId}`,
      );
      return data.result;
    } catch (error) {
      // console.error('Ошибка при загрузке городов', error);
    }
  }

  async function createBid(id: string, price: number, term: number) {
    try {
      const { result } = await apiFetch<{ result: any; status: any }>(
        `/api/projects/${id}/bids`,
        {
          method: 'POST',
          body: {
            price,
            term,
          },
        },
      );
      return result;
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }

  async function updateBid(id: string, bidId: string, status: any) {
    try {
      const data = await apiFetch<{ result: any; status: any }>(
        `/api/projects/${id}/bids/${bidId}`,
        {
          method: 'PUT',
          body: {
            status,
          },
        },
      );
      return data.result;
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }

  async function deleteBid(id: string, bidId: string) {
    try {
      const data = await apiFetch<{ result: any; status: any }>(
        `/api/projects/${id}/bids/${bidId}`,
        {
          method: 'DELETE',
        },
      );
      return data.result;
    } catch (error) {
      // console.error('Ошибка при загрузке категорий', error);
    }
  }

  return { fetchBid, fetchBidsList, createBid, updateBid, deleteBid };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBidsStore, import.meta.hot));
}
