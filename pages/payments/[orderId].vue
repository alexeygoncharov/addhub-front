<template>
  <div class="payment">
    <div class="container">
      <div class="payment__inner">
        <h1
          class="payment__title text28 medium-text"
          style="margin-bottom: 20px"
        >
          Выберите способ оплаты
        </h1>
        <fieldset class="fg">
          <UIVSelect
            :rules="'required'"
            :initial-current-text="{
              value: payment.currency,
              text: paymentsStore.rates?.find((item) => {
                if (item.key === payment.currency) return item;
              })?.name,
            }"
            :options="
              paymentsStore.rates?.map((item) => {
                return { text: item.name, value: item.key };
              })
            "
            :placeholder="'Выберите валюту'"
            @input="
              (currency) => {
                console.log(currency);
                payment.currency = currency;
              }
            "
          />
        </fieldset>
        <div class="pay-table">
          <div class="pay-table__rows">
            <div class="pay-table__head">
              <div class="pay-table__col">
                <div class="pay-table__th">Итого</div>
              </div>
              <div class="pay-table__col">
                <div class="pay-table__th">Cтоимость</div>
              </div>
            </div>
          </div>
          <div class="pay-table__rows">
            <div class="pay-table__row">
              <div class="pay-table__td2">Итого</div>
              <div class="pay-table__td3">{{ price }} р</div>
            </div>
          </div>
          <div class="pay-table__nav">
            <button class="m-btn m-btn-blue-outline" @click="cancelOrder()">
              <span>Отменить</span>
            </button>
            <button class="m-btn m-btn-blue m-btn-shadow" @click="pay">
              <span>Оплатить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePaymentsStore } from '~/stores/payments';
const paymentsStore = usePaymentsStore();
const route = useRoute();
const payment = ref({
  orderId: '',
  currency: '',
});
const router = useRouter();
payment.value.orderId = route.params?.orderId as string;
const price = route.query?.price;

const cancelOrder = async () => {
  const { data, error } = await apiFetch<ApiResponse<any>>(
    `/api/orders/${payment.value.orderId}`,
    {
      options: {
        method: 'DELETE',
      },
      needToken: true,
    },
  );
  if (data?.value?.status) {
    router.back();
  }
  if (error.value) {
    router.back();
    return useToast({ message: error.value.data.message, type: 'error' });
  }
};

const pay = async () => {
  if (payment.value.currency.length) {
    if (!payment.value.orderId) {
      return;
    }

    const data = await paymentsStore.createPayment(payment.value);

    if (data) {
      useToast({ message: 'Заявка успешно отправлена', type: 'success' });
      window.location.href = data.checkout_url;
    }

    payment.value.orderId = '';
    payment.value.currency = '';
  }
};
</script>

<style></style>
