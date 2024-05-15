import { defineStore } from 'pinia';

export const usePaymentsStore = defineStore('payments', () => {
  const rates = ref();
  async function fetchRates() {
    const { data } = await apiFetch<ApiResponse<any>>(`/api/payments/rates`, {
      needToken: true,
      options: {},
    });
    const value = data.value;
    if (value) {
      rates.value = Object.entries(value.result).map(([key, value]) => ({
        key,
        ...value,
      }));
      console.log('rates ', rates.value);
    }
  }

  async function createPayment(payload: any) {
    const { data } = await apiFetch<ApiResponse<any>>(`/api/payments/pay`, {
      needToken: true,
      options: { body: payload, method: 'POST' },
    });
    const value = data.value;
    if (value) {
      return value.result;
    }
  }
  return {
    fetchRates,
    createPayment,
    rates,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaymentsStore, import.meta.hot));
}
