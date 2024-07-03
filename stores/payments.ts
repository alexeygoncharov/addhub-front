import { defineStore } from 'pinia';

export interface CoinParam {
  is_fiat: number;
  rate_btc: string;
  last_update: string;
  tx_fee: string;
  status: string;
  image: string;
  name: string;
  confirms: string;
  can_convert: number;
  capabilities: string[];
  explorer: string;
  accepted: number;
  chain?: string;
  contract?: string;
}

export const usePaymentsStore = defineStore('payments', () => {
  const rates = ref<Array<{ key: string } & CoinParam>>();
  async function fetchRates() {
    const { data } = await apiFetch<
      ApiResponse<ApiResponse<{ [key: string]: CoinParam }>>
    >(`/api/payments/rates`, {
      needToken: true,
      options: {},
    });
    const value = data.value;
    if (value) {
      rates.value = Object.entries(value.result).map(
        ([key, value]: [string, CoinParam]) => ({
          key,
          ...value,
        }),
      );
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
