import { defineStore } from 'pinia';

export const useDisputesStore = defineStore('disputes', () => {
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
    if (error){
      throw error
    }
  }

  return { createDispute };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDisputesStore, import.meta.hot));
}
