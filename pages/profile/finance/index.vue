<template>
  <ModulesProfileTop>Финансы</ModulesProfileTop>

  <div v-if="user?.active_role === 'seller'" class="finance-stat grid-col4">
    <ModulesCardsStat3
      title="Заработано"
      :num="0"
      desc="0"
      desc2="поступило"
      icon="/img/stat-icon6.svg"
    />

    <ModulesCardsStat3
      title="Выплачено"
      :num="finances.totalWithdrawed"
      desc="0+"
      desc2="новых"
      icon="/img/stat-icon7.svg"
    />

    <ModulesCardsStat3
      title="Ожидание"
      :num="finances.totalFrozen"
      desc="0+"
      desc2="новых"
      icon="/img/stat-icon8.svg"
    />

    <ModulesCardsStat3
      title="Доступно для вывода"
      :num="finances.totalActive"
      desc="0+"
      desc2="новых"
      icon="/img/stat-icon9.svg"
    />
  </div>

  <div class="finance-table m-table">
    <table>
      <thead>
        <tr>
          <th><span>Дата</span></th>
          <th><span>Тип операции</span></th>
          <th><span>Описание</span></th>
          <th><span>Стоимость</span></th>
          <th><span>Сумма</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in transactions" :key="item._id" class="finance-row">
          <td>
            <div class="finance-row__title">Дата</div>
            <div class="finance-row__desc light-text">
              {{ formatDate(item.createdAt) }}
            </div>
          </td>
          <td>
            <div class="finance-row__title">Тип операции</div>
            <div
              class="finance-row__type"
              :class="{ _type2: item.type === 'Income' }"
            >
              <span>{{
                item.type === 'Income' ? 'Пополнение' : 'Покупка'
              }}</span>
            </div>
          </td>
          <td>
            <div class="finance-row__title">Описание</div>
            <div class="finance-row__desc light-text">
              {{ item.description || 'Нет описания' }}
            </div>
          </td>
          <td>
            <div class="finance-row__title">Стоимость</div>
            <div class="finance-row__desc">
              {{ item.amount1 ? item.amount1 : item.amount2 }} руб.
            </div>
          </td>
          <td>
            <div class="finance-row__title">Сумма</div>
            <div class="finance-row__desc">{{ item.amount2 }} руб.</div>
          </td>
        </tr>
      </tbody>
    </table>

    <UIVPagination
      v-model="currentPage"
      :items-per-page="8"
      :total-items="total"
      :total-pages="Math.ceil(total / 8)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from '@/modules/profile/types/index';
import { getMyTransactions } from '@/modules/profile/composables/finance';
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const currentPage = ref(1);
const transactions = ref<Transaction[]>();
const finances = ref({
  totalActive: 0,
  totalFrozen: 0,
  totalWithdrawed: 0,
});
const total = ref(0);
getMyTransactions(currentPage.value).then((data) => {
  if (!data?.value.result) return;
  transactions.value = data?.value.result;
  total.value = data?.value.total;
  const getNumberValue = (obj: { [key: string]: number }): number => {
    return Object.values(obj)[0]; // Предполагается, что объект содержит только одно значение
  };

  finances.value.totalActive = getNumberValue(
    data?.value.finances.totalActive || {},
  );
  finances.value.totalFrozen = getNumberValue(
    data?.value.finances.totalFrozen || {},
  );
  finances.value.totalWithdrawed = getNumberValue(
    data?.value.finances.totalWithdrawed || {},
  );
});

definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
</script>

<style scoped></style>
