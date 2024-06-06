import { defineStore } from 'pinia';

export const useDisputesStore = defineStore('disputes', () => {
  interface CreateDispute {
    order: string;
    files?: string;
  }
  async function createDispute(payload: CreateDispute) {
    const { data } = await apiFetch<ApiResponse<any>>(`/api/disputes/`, {
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
  }

  return { createDispute };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDisputesStore, import.meta.hot));
}
