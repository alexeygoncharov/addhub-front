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
          v-for="item in disputesStore.disputes"
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
              {{
                item?.order?.service?.title
                  ? item?.order?.service?.title
                  : item?.order?.project?.title
              }}
            </div>
          </td>
          <td>
            <div class="finance-row__user">
              <div class="avatar">
                <img
                  v-if="item.createdBy.avatar"
                  :src="baseUrl() + item.createdBy.avatar?.url"
                  alt=""
                />
                <div v-else>
                  <Avatar :size="80" :name="item.createdBy?.name" />
                </div>
              </div>
              <div class="finance-row__desc light-text">
                {{ `${item.createdBy?.name} ${item.createdBy?.surname}` }}
              </div>
            </div>
          </td>
          <td>
            <div v-if="item.unseen_messages > 0" class="finance-row__messages">
              <div class="finance-row__count">
                <span>{{ item.unseen_messages }}</span>
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
      :total-items="disputesStore.total"
      :total-pages="Math.ceil(disputesStore.total / 10)"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const disputesStore = useDisputesStore();

const currentPage = ref(1);
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});

disputesStore.updateDisputes();

const router = useRouter();
const navigateToMessages = (id: string) => {
  if (!id) return;
  router.push(`/profile/messages?id=${id}&tab=orders`);
};
</script>

<style scoped></style>
