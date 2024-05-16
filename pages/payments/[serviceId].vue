<template>
  <div class="payment">
    <div class="container">
      <div class="payment__inner">
        <h1 class="payment__title text28 medium-text">
          Выберите способ оплаты
        </h1>
        <fieldset class="fg">
          <UIVSelect
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
            <NuxtLink :to="`/services/`">
              <button class="m-btn m-btn-blue-outline">
                <span>Отменить</span>
              </button>
            </NuxtLink>
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
const price = route.query?.price;
const serviceId = route.params?.serviceId;
const orderDetails = ref();

const createOrder = async () => {
  const { data, error } = await apiFetch<ApiResponse<any>>('/api/orders', {
    options: {
      method: 'POST',
      body: { service: serviceId, price },
    },
    needToken: true,
  });
  if (data?.value?.result) {
    const value = data?.value?.result;
    payment.value.orderId = value?._id;
    orderDetails.value = value;
  }
  if (error.value) {
    return useToast({ message: error.value.data.message, type: 'error' });
  }
};

const pay = async () => {
  await createOrder();

  if (!payment.value.orderId) {
    return;
  }

  const data = await paymentsStore.createPayment(payment.value);

  useToast({ message: 'Заявка успешно отправлена', type: 'success' });

  if (data) {
    window.open(data.checkout_url, '_blank');
  }

  payment.value.orderId = '';
  payment.value.currency = '';
};
</script>

<style></style>
