<template>
  <div>
    <UIVBreadcrumbs
      :items="[
        { name: 'Главная', to: '/' },
        { name: 'Каталог услуг', to: '/services/all' },
      ]"
    />
    <UIPageTop
      v-model="bufSearch"
      title="Поиск услуг"
      description="Вам доступно более 500 000 предложений"
      :has-search="true"
      :has-select="true"
      @submit="setSearch()"
    />
    <!-- <ModulesCatalogPopular /> -->
    <ModulesCatalog :store="catalogStore">
      <template #items>
        <div
          v-if="!catalogStore.loading && !catalogStore.empty"
          class="services-items grid-col3 grid-tablet2 grid-mob-full"
        >
          <ModulesCardsService
            v-for="item of catalogStore.items"
            :key="item._id"
            :data="item"
          />
        </div>
        <div
          v-else-if="!catalogStore.empty"
          class="services-items grid-col3 grid-tablet2 grid-mob-full"
        >
          <ModulesCardsService v-for="i in 10" :key="i" />
        </div>
      </template>
      <template v-if="catalogStore.totalItems" #count>
        {{
          pluralize(catalogStore.totalItems, 'проект', 'проекта', 'проектов')
        }}</template
      >
    </ModulesCatalog>
  </div>
</template>

<script setup lang="ts">
import { useCatalogServicesStore } from '~/stores/catalog/services';
const catalogStore = useCatalogServicesStore();
const bufSearch = ref('');
if (catalogStore.searchQuery) {
  bufSearch.value = catalogStore.searchQuery;
}
const setSearch = () => {
  catalogStore.searchQuery = bufSearch.value;
};
useHead({
  title: 'Каталог услуг',
});
</script>
