<template>
  <ModulesProfileTop>Финансы</ModulesProfileTop>

  <div v-if="user?.active_role === 'seller'" class="finance-stat grid-col4">
    <ModulesCardsStat3
      title="Заработано"
      num="11.928"
      desc="₽990"
      desc2="поступило"
      icon="/img/stat-icon6.svg"
    />

    <ModulesCardsStat3
      title="Выплачено"
      num="912"
      desc="80+"
      desc2="новых"
      icon="/img/stat-icon7.svg"
    />

    <ModulesCardsStat3
      title="Ожидание"
      num="820"
      desc="35+"
      desc2="новых"
      icon="/img/stat-icon8.svg"
    />

    <ModulesCardsStat3
      title="Доступно для вывода"
      num="8.000"
      desc="290+"
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
        <tr v-for="i in 8" :key="i" class="finance-row">
          <td>
            <div class="finance-row__title">Дата</div>
            <div class="finance-row__desc light-text">April 9, 2022</div>
          </td>
          <td>
            <div class="finance-row__title">Тип операции</div>
            <div class="finance-row__type" :class="{ _type2: i % 2 }">
              <span>{{ i % 2 ? 'Пополнение' : 'Покупка' }}</span>
            </div>
          </td>
          <td>
            <div class="finance-row__title">Описание</div>
            <div class="finance-row__desc light-text">
              Я разработаю пользовательский интерфейс веб-сайта в Adobe XD или
              Figma.
            </div>
          </td>
          <td>
            <div class="finance-row__title">Стоимость</div>
            <div class="finance-row__desc">₽829</div>
          </td>
          <td>
            <div class="finance-row__title">Сумма</div>
            <div class="finance-row__desc">₽829</div>
          </td>
        </tr>
      </tbody>
    </table>

    <UIVPagination
      v-model="currentPage"
      :items-per-page="8"
      :total-items="24"
      :total-pages="3"
    />
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const currentPage = ref(1);
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
</script>

<style scoped></style>
