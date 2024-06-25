import { defineStore } from 'pinia';

export const useDisputesStore = defineStore('disputes', () => {
  interface Dispute {
    _id: string;
    order: Order;
    status: 'pending' | 'completed' | 'cancelled'; // Добавьте другие статусы, если есть
    files: string[];
    sides: string[];
    createdBy: User;
    updatedBy: string;
    chat: { _id: string };
    unseen_messages: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }
  const total = ref(0);
  const disputes = ref<Array<Dispute>>();

  async function createDispute(payload: CreateDispute) {
    const { data, error } = await apiFetch<ApiResponse<any>>(`/api/disputes/`, {
      needToken: true,
      options: {
        method: 'POST',
        body: payload,
      },
    });
    const value = data.value;
    if (value) {
      // addMessages(value.result);
    }
    if (error.value) {
      throw error.value;
    }
  }

  const updateDisputes = async () => {
    const { data } = await apiFetch<ApiListResponse<[]>>('/api/disputes/my', {
      needToken: true,
    });
    const value = data.value;
    if (value?.status === 200) {
      disputes.value = value.result;
      total.value = value.total;
    }
  };

  return { createDispute, updateDisputes, total, disputes };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDisputesStore, import.meta.hot));
}
