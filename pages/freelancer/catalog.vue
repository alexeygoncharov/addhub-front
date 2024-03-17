<template>
  <div>
    <UIVBreadcrumbs
      :items="[{ name: 'Главная', to: '/' }, { name: 'Каталог исполнителей' }]"
    />
    <UIPageTop />
    <ModulesCatalog :store="catalogStore">
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
    const catalogStore = useCatalogFreelancersStore()();
    return { catalogStore };
  },
};
</script>
