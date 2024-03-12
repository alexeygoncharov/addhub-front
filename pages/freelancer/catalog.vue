<template>
  <div>
    <UIVBreadcrumbs
      :items="[{ name: 'Главная', to: '/' }, { name: 'Каталог исполнителей' }]"
    />
    <UIPageTop />
    <ModulesCatalog :store="catalogStore">
      <template #filter>
        <ModulesCatalogFilter :store="catalogStore" :filter-list="filterList" />
      </template>
      <template #items>
        <div class="freelancers-items">
          <ModulesCardsFreelance
            :data="item"
            v-for="item in catalogStore.items"
          />
        </div>
      </template>
      <template #count> {{ catalogStore.totalItems }} проектов</template>
    </ModulesCatalog>
  </div>
</template>

<script>
import { useCatalogFreelancersStore } from '~/stores/catalog/freelancers.js';

export default {
  setup() {
    const catalogStore = useCatalogFreelancersStore();
    return { catalogStore };
  },
  data() {
    return {
      filterList: [
        {
          type: 'check',
          title: 'Категория',
          list: [
            { title: 'UX дизайнер', num: 1945 },
            { title: 'Веб-разработчик', num: 945 },
            { title: 'Иллюстратор', num: 445 },
            { title: 'Копирайтер', num: 2145 },
            { title: 'Копирайтер', num: 2145 },
          ],
        },
        { type: 'price' },
        {
          type: 'check',
          title: 'Параметр фильтра',
          list: [
            { title: 'Adobe Photoshop', num: 1945 },
            { title: 'Figma', num: 945 },
            { title: 'Sketch', num: 445 },
            { title: 'Adobe XD', num: 2145 },
            { title: 'Balsamiq', num: 2145 },
          ],
        },
        {
          type: 'check',
          title: 'Город',
          hasSearch: true,
          list: [
            { title: 'Москва', num: 1945 },
            { title: 'Санкт-Петербург', num: 945 },
            { title: 'Ростов-на-Дону', num: 445 },
            { title: 'Калининград', num: 2145 },
            { title: 'Новокузнецк', num: 2145 },
          ],
        },
        {
          type: 'check',
          title: 'Коммуникация',
          list: [
            { title: 'Турецкий', num: 1945 },
            { title: 'Английский', num: 945 },
            { title: 'Итальянский', num: 445 },
            { title: 'Испанский', num: 2145 },
            { title: 'Испанский', num: 2145 },
          ],
        },
        {
          type: 'check',
          title: 'Уровень',
          list: [
            { title: 'ТОП-продавцы', num: 1945 },
            { title: 'Уровень II', num: 945 },
            { title: 'Уровень I', num: 445 },
            { title: 'Новые продавцы', num: 2145 },
          ],
        },
      ],
    };
  },
};
</script>
