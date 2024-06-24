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
        <tr
          v-for="item in disputes"
          :key="item._id"
          class="finance-row"
          @click="navigateToMessages(item.order._id)"
        >
          <td>
            <div class="finance-row__title">Дата</div>
            <div class="finance-row__desc light-text">
              {{ $dayjs(item.createdAt) }}
            </div>
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
                <img :src="baseUrl() + item.createdBy.avatar?.url" alt="" />
              </div>
              <div class="finance-row__desc light-text">
                {{ `${item.createdBy?.name} ${item.createdBy?.surname}` }}
              </div>
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
      :items-per-page="8"
      :total-items="totalItems"
      :total-pages="Math.ceil(totalItems / 8)"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Dispute {
  _id: string;
  order: Order;
  status: 'pending' | 'completed' | 'cancelled'; // Добавьте другие статусы, если есть
  files: string[];
  sides: string[];
  createdBy: User;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const totalItems = ref(0);
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
    totalItems.value = value.total;
  }
};

updateDisputes();

const router = useRouter();
const navigateToMessages = (id: string) => {
  if (!id) return;
  router.push(`/profile/messages?id=${id}&tab=orders`);
};
</script>

<style scoped></style>
