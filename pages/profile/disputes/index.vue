<template>
  <ModulesProfileTop>Диспуты</ModulesProfileTop>

  <div class="disputes-table m-table">
    <table>
      <thead>
        <tr>
          <th><span>Дата</span></th>
          <th><span>Сделка</span></th>
          <th><span>Заказчик</span></th>
          <th><span>Сообщения</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in disputes" :key="item._id" class="finance-row">
          <td>
            <div class="finance-row__title">Дата</div>
            <div class="finance-row__desc light-text">{{ item.createdAt }}</div>
          </td>
          <td>
            <div class="finance-row__title">Сделка</div>
            <div class="finance-row__desc light-text">
              Я разработаю пользовательский интерфейс веб-сайта в Adobe XD или
              Figma.
            </div>
          </td>
          <td>
            <div class="finance-row__user">
              <div class="avatar">
                <img src="/img/avatar7.webp" alt="" />
              </div>
              <div class="finance-row__desc light-text">Андрей Ветров</div>
            </div>
          </td>
          <td>
            <div class="finance-row__messages">
              <div class="finance-row__count">
                <span>2</span>
              </div>
              <div class="finance-row__desc light-text">Непрочитанных</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <UIVPagination
      v-model="currentPage"
      :items-per-page="10"
      :total-items="total"
      :total-pages="Math.ceil(total / 10)"
    />
  </div>
</template>

<script setup lang="ts">
interface Dispute {
  _id: string;
  order: string;
  status: 'pending' | 'completed' | 'cancelled'; // Добавьте другие статусы, если есть
  files: string[];
  sides: string[];
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
const total = ref(0);
const currentPage = ref(1);
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
const disputes = ref<Array<Dispute>>();
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
updateDisputes();
</script>

<style scoped></style>
