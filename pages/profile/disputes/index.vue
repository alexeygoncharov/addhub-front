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
        <tr v-for="i in 10" :key="i" class="finance-row">
          <td>
            <div class="finance-row__title">Дата</div>
            <div class="finance-row__desc light-text">29.11.2023</div>
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
      :total-items="30"
      :total-pages="3"
    />
  </div>
</template>

<script setup lang="ts">
const currentPage = ref(1);
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
</script>

<style scoped></style>
