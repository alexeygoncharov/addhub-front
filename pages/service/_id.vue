<template>
  <div>
    <UIVBreadcrumbs
      :items="[{ name: 'Главная', to: '/' }, { name: 'Каталог услуг' }]"
    />
    <UIPageTop :has-search="true" :has-select="true" />
    <ModulesCatalog :store="catalogStore">
      <template #items>
        <div class="services-items grid-col3 grid-tablet2 grid-mob-full">
          <ModulesCardsService
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
import { useCatalogServicesStore } from '~/stores/catalog/services.js';

export default {
  setup() {
    const catalogStore = useCatalogServicesStore()();
    return { catalogStore };
  },
};
</script>
