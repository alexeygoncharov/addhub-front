<template>
  <ModulesProfileTop
    >Выплаты

    <template #btn>
      <button
        class="admin-top__btn m-btn m-btn-blue m-btn-shadow"
        @click="showWithdrawModal = true"
      >
        <span>Запросить выплату</span>
      </button></template
    >
  </ModulesProfileTop>

  <div class="payments m-table">
    <table>
      <thead>
        <tr>
          <th><span>Сумма</span></th>
          <th><span>Дата</span></th>
          <th><span>Адрес вывода</span></th>
          <th><span>Статус</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="el in withdrawals" :key="el._id" class="pay-row">
          <td>
            <div class="pay-row__title">Сумма</div>
            <div class="pay-row__desc">{{ el.amount }} руб.</div>
          </td>
          <td>
            <div class="pay-row__title">Дата</div>
            <div class="pay-row__desc">{{ formatDate(el.createdAt) }}</div>
          </td>
          <td>
            <div class="pay-row__title">Адрес вывода</div>
            <div class="pay-row__desc">{{ el.address_to }}</div>
          </td>
          <td>
            <div class="pay-row__title">Статус</div>
            <div class="pay-row__badges">
              <div
                class="m-badge"
                :class="{
                  _yellow: el.status === 'Pending',
                  _red: el.status === 'Canceled',
                }"
              >
                <span>{{
                  statuses.find((item) => item.value === el.status)?.title
                }}</span>
              </div>
            </div>
          </td>

          <!-- <div class="m-badge _yellow">
            <span>В процессе</span>
          </div>

          <div class="m-badge _red">
            <span>Отмена</span>
          </div> -->
        </tr>
      </tbody>
    </table>

    <UIVPagination
      v-model="currentPage"
      :items-per-page="5"
      :total-items="total"
      :total-pages="Math.ceil(total / 5)"
    />
  </div>

  <!-- <form action="" class="pay-form">
    <div class="pay-form__top">
      <div class="text17 medium-text">Платежные способы</div>
    </div>
    <div class="pay-form__items">
      
      <fieldset class="fg">
        <label>Выберите способ оплаты</label>
        <div class="m-select">
          <input class="m-select__field" type="hidden" />
          <div class="m-select__toggle">
            <span class="m-select__current"> Популярности </span>
            <svg
              width="9"
              height="6"
              viewBox="0 0 9 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.07671 5.33928L8.86404 1.55188C8.9517 1.46428 9 1.34735 9 1.22266C9 1.09798 8.9517 0.981043 8.86404 0.893445L8.58519 0.614529C8.40349 0.433037 8.10818 0.433037 7.92675 0.614529L4.74638 3.7949L1.56248 0.611C1.47482 0.523402 1.35795 0.475036 1.23333 0.475036C1.10858 0.475036 0.991712 0.523402 0.903975 0.611L0.625198 0.889915C0.537531 0.977582 0.489235 1.09445 0.489235 1.21913C0.489235 1.34382 0.537531 1.46075 0.625198 1.54835L4.41599 5.33928C4.50393 5.42709 4.62135 5.47531 4.74617 5.47504C4.87148 5.47531 4.98883 5.42709 5.07671 5.33928Z"
                fill="#041E42"
              />
            </svg>
          </div>
          <div class="m-select__dropdown">
            <div class="m-select__option _active" data-value="USDT">
              <span>USDT</span>
            </div>
            <div class="m-select__option" data-value="Paypal">
              <span>Paypal</span>
            </div>
            <div class="m-select__option" data-value="Paypal">
              <span>Paypal</span>
            </div>
          </div>
        </div>
      </fieldset>
      <div class="pay-way">
        <div class="pay-way__title text17 medium-text">Способ платежа</div>
        <div class="pay-way__wrap">
          <div class="pay-way__items">
            <div class="pay-way__item">
              <input type="radio" checked name="payWay" />
              <label><span>USDT</span></label>
            </div>
            <div class="pay-way__item">
              <input type="radio" name="payWay" />
              <label><span>Банковский перевод</span></label>
            </div>
            <div class="pay-way__item">
              <input type="radio" name="payWay" />
              <label><span>Payoneer</span></label>
            </div>
          </div>
        </div>
      </div>
      <fieldset class="pay-form__address fg">
        <label>Адрес для выплат (USDT TRC-20)</label>
        <input type="text" />
      </fieldset>
    </div>
    <div class="pay-form__nav">
      <button class="pay-form__btn m-btn m-btn-blue m-btn-shadow">
        <span>Сохранить</span>
      </button>
    </div>
  </form> -->
  <UIModalWindow
    v-model:show="showWithdrawModal"
    @submit="
      () => {
        createWithdraw();
      }
    "
  >
    <template #title>Подтвердите действие</template>
    <template #data
      ><div>
        <input
          v-model="withdrawalAddress"
          type="text"
          placeholder="Адрес для вывода"
        />
        <input
          v-model="withdrawalAmount"
          type="text"
          placeholder="Сумма к выводу"
          style="margin-top: 1em"
        /></div
    ></template>
    <template #button-text>Создать вывод</template>
  </UIModalWindow>
</template>

<script setup lang="ts">
import type { Withdraw } from '@/modules/profile/types/index';
import {
  getMyWithdrawal,
  createWithdrawal,
} from '@/modules/profile/composables/payments';
const { user } = storeToRefs(useUserStore());
const currentPage = ref(1);
const showWithdrawModal = ref(false);
const withdrawals = ref<Withdraw[]>();
const withdrawalAmount = ref();
const withdrawalAddress = ref();
const total = ref(0);
getMyWithdrawal(currentPage.value).then((data) => {
  if (!data?.value.result) return;
  withdrawals.value = data?.value.result;
  total.value = data?.value.total;
});
const statuses = [
  { title: 'В ожидании', value: 'Pending' },
  { title: 'Выполнено', value: 'Approved' },
  { title: 'Отменено', value: 'Canceled' },
];
const createWithdraw = () => {
  createWithdrawal(withdrawalAmount.value, withdrawalAddress.value).then(
    (data) => {
      if (!data?.value.result) return;
      showWithdrawModal.value = false;
      withdrawals.value?.push(data?.value.result);
    },
  );
};
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
</script>

<style scoped></style>
